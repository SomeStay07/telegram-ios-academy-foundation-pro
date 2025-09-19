-- Event Store Schema for Enterprise DDD Architecture
-- Based on BACKEND_ARCHITECTURE.md specifications

-- Event Store Table for Event Sourcing
CREATE TABLE IF NOT EXISTS event_store (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_id UUID NOT NULL,
    aggregate_type VARCHAR(100) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB NOT NULL,
    event_version INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure event versions are sequential per aggregate
    UNIQUE(aggregate_id, event_version),
    
    -- Index for efficient event retrieval
    INDEX idx_event_store_aggregate (aggregate_id, event_version),
    INDEX idx_event_store_type (aggregate_type, event_type),
    INDEX idx_event_store_created (created_at)
);

-- Snapshots Table for Performance Optimization
CREATE TABLE IF NOT EXISTS aggregate_snapshots (
    snapshot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_id UUID NOT NULL UNIQUE,
    aggregate_type VARCHAR(100) NOT NULL,
    aggregate_version INTEGER NOT NULL,
    snapshot_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    INDEX idx_snapshots_aggregate (aggregate_id),
    INDEX idx_snapshots_type (aggregate_type)
);

-- Read Model: User Progress Summary (Materialized View)
CREATE MATERIALIZED VIEW user_progress_summary AS
SELECT 
    user_id,
    COUNT(*) as total_lessons,
    COUNT(*) FILTER (WHERE completed = true) as completed_lessons,
    AVG(score) as average_score,
    SUM(time_spent_minutes) as total_time_spent,
    MAX(updated_at) as last_activity
FROM learning_progress 
GROUP BY user_id;

-- Read Model: Course Statistics
CREATE MATERIALIZED VIEW course_statistics AS
SELECT 
    course_id,
    COUNT(DISTINCT user_id) as enrolled_users,
    COUNT(*) as total_attempts,
    AVG(score) as average_score,
    COUNT(*) FILTER (WHERE completed = true) as completions
FROM learning_progress 
GROUP BY course_id;

-- Read Model: User Streaks (for dashboard performance)
CREATE TABLE user_streaks (
    user_id UUID PRIMARY KEY,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    streak_start_date DATE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for efficient querying
CREATE INDEX idx_user_streaks_current ON user_streaks(current_streak DESC);
CREATE INDEX idx_user_streaks_longest ON user_streaks(longest_streak DESC);

-- Event Projection Tables (for complex queries)
CREATE TABLE user_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    activity_data JSONB,
    occurred_at TIMESTAMPTZ NOT NULL,
    
    INDEX idx_user_activities_user (user_id, occurred_at DESC),
    INDEX idx_user_activities_type (activity_type)
);

CREATE TABLE assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL,
    user_id UUID NOT NULL,
    score INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    passed BOOLEAN NOT NULL,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    INDEX idx_assessment_results_user (user_id, completed_at DESC),
    INDEX idx_assessment_results_assessment (assessment_id)
);

-- Idempotency table for command deduplication
CREATE TABLE command_idempotency (
    idempotency_key VARCHAR(255) PRIMARY KEY,
    command_type VARCHAR(100) NOT NULL,
    command_data JSONB NOT NULL,
    result JSONB,
    processed_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_command_idempotency_expires ON command_idempotency(expires_at);

-- Function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_read_models() 
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_progress_summary;
    REFRESH MATERIALIZED VIEW CONCURRENTLY course_statistics;
END;
$$ LANGUAGE plpgsql;

-- Trigger function for automatic read model updates
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user streak based on activity
    INSERT INTO user_streaks (user_id, current_streak, last_activity_date, updated_at)
    VALUES (NEW.user_id, 1, CURRENT_DATE, NOW())
    ON CONFLICT (user_id) DO UPDATE SET
        current_streak = CASE 
            WHEN user_streaks.last_activity_date = CURRENT_DATE - INTERVAL '1 day' 
            THEN user_streaks.current_streak + 1
            WHEN user_streaks.last_activity_date < CURRENT_DATE - INTERVAL '1 day'
            THEN 1
            ELSE user_streaks.current_streak
        END,
        longest_streak = GREATEST(
            user_streaks.longest_streak,
            CASE 
                WHEN user_streaks.last_activity_date = CURRENT_DATE - INTERVAL '1 day' 
                THEN user_streaks.current_streak + 1
                ELSE 1
            END
        ),
        last_activity_date = CURRENT_DATE,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Event processing functions for projections
CREATE OR REPLACE FUNCTION process_domain_event()
RETURNS TRIGGER AS $$
BEGIN
    -- Process different event types
    CASE NEW.event_type
        WHEN 'LessonCompleted' THEN
            INSERT INTO user_activities (user_id, activity_type, activity_data, occurred_at)
            VALUES (
                (NEW.event_data->>'userId')::UUID,
                'lesson_completed',
                NEW.event_data,
                NEW.created_at
            );
            
        WHEN 'AssessmentCompleted' THEN
            INSERT INTO assessment_results (
                assessment_id, user_id, score, percentage, passed, 
                started_at, completed_at
            )
            VALUES (
                NEW.aggregate_id,
                (NEW.event_data->>'userId')::UUID,
                (NEW.event_data->>'totalScore')::INTEGER,
                (NEW.event_data->>'percentage')::DECIMAL,
                (NEW.event_data->>'passed')::BOOLEAN,
                (NEW.event_data->>'startedAt')::TIMESTAMPTZ,
                (NEW.event_data->>'completedAt')::TIMESTAMPTZ
            );
            
        WHEN 'UserActivityRecorded' THEN
            INSERT INTO user_activities (user_id, activity_type, activity_data, occurred_at)
            VALUES (
                (NEW.event_data->>'userId')::UUID,
                NEW.event_data->>'activityType',
                NEW.event_data,
                NEW.created_at
            );
            
            -- Update streak
            PERFORM update_user_streak();
    END CASE;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic event processing
CREATE TRIGGER trigger_process_domain_events
    AFTER INSERT ON event_store
    FOR EACH ROW
    EXECUTE FUNCTION process_domain_event();

-- Create trigger for streak updates on user activities
CREATE TRIGGER trigger_update_user_streaks
    AFTER INSERT ON user_activities
    FOR EACH ROW
    WHEN (NEW.activity_type IN ('lesson_completed', 'assessment_completed'))
    EXECUTE FUNCTION update_user_streak();

-- Cleanup old idempotency records
CREATE OR REPLACE FUNCTION cleanup_expired_idempotency()
RETURNS void AS $$
BEGIN
    DELETE FROM command_idempotency WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Schedule cleanup job (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-idempotency', '0 */6 * * *', 'SELECT cleanup_expired_idempotency();');

COMMENT ON TABLE event_store IS 'Primary event store for event sourcing architecture';
COMMENT ON TABLE aggregate_snapshots IS 'Snapshots for performance optimization of large aggregates';
COMMENT ON MATERIALIZED VIEW user_progress_summary IS 'Read model for user dashboard performance';
COMMENT ON TABLE user_streaks IS 'Real-time user streak tracking for gamification';
COMMENT ON TABLE user_activities IS 'Event projection for user activity analytics';
COMMENT ON TABLE assessment_results IS 'Event projection for assessment reporting';
COMMENT ON FUNCTION process_domain_event() IS 'Automatic event projection processor';