# API Monitoring Alerts

## Alert Configurations

### High Priority Alerts

#### P95 Response Time Alert
- **Metric**: `http_request_duration_ms` 95th percentile > 2000ms
- **Threshold**: 2 seconds
- **Window**: 5 minutes
- **On-call**: Backend team (primary), DevOps (escalation)
- **Notification**: Slack #alerts + PagerDuty

#### 5xx Error Rate Alert  
- **Metric**: `http_requests_total{status=~"5.."}` rate > 5%
- **Threshold**: 5% error rate over 5 minutes
- **Window**: 5 minutes
- **On-call**: Backend team (immediate)
- **Notification**: Slack #critical-alerts + PagerDuty

#### Redis Connection Errors
- **Metric**: `redis_connection_errors_total` rate > 0
- **Threshold**: Any connection error
- **Window**: 1 minute
- **On-call**: Backend team + DevOps
- **Notification**: Slack #alerts

### Medium Priority Alerts

#### High Memory Usage
- **Metric**: `process_resident_memory_bytes` > 1GB
- **Threshold**: 1GB memory usage
- **Window**: 10 minutes
- **On-call**: Backend team
- **Notification**: Slack #monitoring

#### Database Connection Pool Exhaustion
- **Metric**: `db_connection_pool_active` / `db_connection_pool_max` > 0.9
- **Threshold**: 90% pool utilization
- **Window**: 5 minutes
- **On-call**: Backend team
- **Notification**: Slack #alerts

#### API Rate Limiting
- **Metric**: `http_requests_total{status="429"}` rate > 10/min
- **Threshold**: 10 rate limited requests per minute
- **Window**: 5 minutes
- **On-call**: Backend team
- **Notification**: Slack #monitoring

### Low Priority Alerts

#### Disk Space Warning
- **Metric**: `disk_free_bytes` / `disk_total_bytes` < 0.2
- **Threshold**: Less than 20% free disk space
- **Window**: 30 minutes
- **On-call**: DevOps team
- **Notification**: Slack #monitoring

## On-Call Rotation

### Primary On-Call (Backend Team)
- **Hours**: 24/7
- **Escalation**: 15 minutes
- **Contact**: PagerDuty + Slack DM

### Secondary On-Call (DevOps Team)
- **Hours**: Business hours (9AM-6PM UTC)
- **Escalation**: 30 minutes
- **Contact**: Slack #devops-alerts

## Alert Response Procedures

1. **5xx Errors**: Check application logs, database connectivity, external service status
2. **High P95**: Investigate slow queries, check database performance, review recent deployments
3. **Redis Errors**: Verify Redis cluster health, check network connectivity, review Redis logs
4. **Memory Issues**: Check for memory leaks, review application metrics, consider scaling

## Alert Suppression Rules

- **Deployment window**: Suppress non-critical alerts during scheduled deployments (30 min window)
- **Maintenance mode**: Suppress all alerts when maintenance flag is enabled
- **Test environments**: Route test environment alerts to #test-alerts channel only