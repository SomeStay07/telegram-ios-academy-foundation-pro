// Legacy analytics helper functions - use lib/analytics/ instead
// Re-export from the new analytics adapter
export { 
  trackInterviewStarted, 
  trackInterviewAnswerSubmitted,
  trackInterviewCompleted,
  analytics
} from './analytics/index'