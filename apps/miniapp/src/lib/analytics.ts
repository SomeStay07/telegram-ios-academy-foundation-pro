// Legacy analytics helper functions - use lib/analytics/ instead
// Re-export from the new analytics adapter
export { 
  trackInterviewStarted, 
  trackAnswerSubmitted as trackInterviewAnswerSubmitted,
  trackInterviewCompleted 
} from './analytics'