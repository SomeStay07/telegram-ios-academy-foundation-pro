# Frontend Monitoring Alerts (Sentry)

## JavaScript Error Alerts

### High Priority

#### Chunk Load Failures
- **Alert**: `ChunkLoadError` rate > 5% of sessions
- **Threshold**: 5% of users experiencing chunk load failures
- **Window**: 10 minutes
- **On-call**: Frontend team
- **Action**: Check CDN status, verify asset deployment, rollback if needed
- **Sentry Filter**: `error.type:ChunkLoadError`

#### Critical JavaScript Errors
- **Alert**: Unhandled errors in core user flows (login, lesson, interview)
- **Threshold**: >10 errors/hour
- **Window**: 1 hour
- **On-call**: Frontend team (immediate)
- **Sentry Filter**: `level:error AND (transaction:"/login" OR transaction:"/lesson/*" OR transaction:"/interview/*")`

#### Bundle Size Regression
- **Alert**: Main bundle exceeds 220KB gzipped
- **Threshold**: Bundle size > 220KB
- **Trigger**: Build process
- **On-call**: Frontend team
- **Action**: Investigate bundle content, optimize imports, review recent changes

### Medium Priority

#### Performance Degradation
- **Alert**: Core Web Vitals regression
- **Metrics**:
  - LCP > 2.5s for >25% of sessions
  - FID > 100ms for >25% of sessions
  - CLS > 0.1 for >25% of sessions
- **Window**: 1 hour
- **On-call**: Frontend team
- **Sentry Filter**: `measurements.lcp:>2500 OR measurements.fid:>100 OR measurements.cls:>0.1`

#### High Error Rate
- **Alert**: Overall JavaScript error rate > 2%
- **Threshold**: 2% of sessions with errors
- **Window**: 30 minutes
- **On-call**: Frontend team
- **Sentry Filter**: `level:error`

#### Memory Leaks
- **Alert**: Memory usage increasing consistently
- **Metrics**: `performance.memory.usedJSHeapSize` growing >50MB/hour
- **Window**: 2 hours
- **On-call**: Frontend team
- **Action**: Check for memory leaks in SPA navigation, review component cleanup

### Low Priority

#### Console Warnings
- **Alert**: High volume of console warnings
- **Threshold**: >100 warnings/hour
- **Window**: 1 hour
- **On-call**: Frontend team
- **Sentry Filter**: `level:warning`

#### Slow Navigation
- **Alert**: Route transitions > 1s
- **Threshold**: >1 second average route transition time
- **Window**: 30 minutes
- **On-call**: Frontend team
- **Action**: Review lazy loading, check bundle splitting

## Browser Compatibility Alerts

#### Unsupported Browser Errors
- **Alert**: Errors from browsers with <1% usage
- **Threshold**: >5 errors/day from unsupported browsers
- **Window**: 24 hours
- **On-call**: Frontend team
- **Action**: Update browser support documentation

#### iOS/Android Specific Issues
- **Alert**: Platform-specific error rates
- **Threshold**: >3x higher error rate on specific platform
- **Window**: 1 hour
- **On-call**: Frontend team
- **Sentry Filter**: `os.name:iOS OR os.name:Android`

## Notification Channels

- **Critical**: Slack #frontend-critical + PagerDuty
- **High**: Slack #frontend-alerts  
- **Medium**: Slack #frontend-monitoring
- **Low**: Slack #frontend-noise (batched daily)

## Response Procedures

1. **Chunk Load Errors**: Verify CDN health, check deployment status, consider rollback
2. **Critical JS Errors**: Identify error source, hotfix if possible, deploy fix within 1 hour
3. **Performance Issues**: Profile affected pages, identify bottlenecks, optimize critical path
4. **Memory Leaks**: Use browser dev tools, identify leaking components, implement cleanup

## Alert Tuning

- **False Positive Reduction**: Exclude known bot traffic, filter development environments
- **Seasonality**: Adjust thresholds for high-traffic periods (course launches, exam periods)
- **Release Windows**: Increase error thresholds for 1 hour post-deployment