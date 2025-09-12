// Lazy analytics loader to reduce initial bundle size
export async function loadAnalytics() {
  // Dynamically import analytics to split into separate chunk
  const { analytics, initAnalytics } = await import('./index')
  
  // Initialize analytics
  initAnalytics()
  
  return analytics
}

// Lightweight analytics interface for immediate use
export interface AnalyticsInterface {
  lessonStarted: (data: any) => void
  quizAnswered: (data: any) => void
  checkpointPassed: (data: any) => void
  lessonCompleted: (data: any) => void
  interviewStarted: (data: any) => void
  questionRevealed: (data: any) => void
  answerSubmitted: (data: any) => void
  interviewCompleted: (data: any) => void
}

// Create a proxy that loads analytics on first use
let analyticsInstance: AnalyticsInterface | null = null

export const analytics: AnalyticsInterface = {
  async lessonStarted(data: any) {
    if (!analyticsInstance) {
      analyticsInstance = await loadAnalytics()
    }
    return analyticsInstance.lessonStarted(data)
  },
  
  async quizAnswered(data: any) {
    if (!analyticsInstance) {
      analyticsInstance = await loadAnalytics()
    }
    return analyticsInstance.quizAnswered(data)
  },
  
  async checkpointPassed(data: any) {
    if (!analyticsInstance) {
      analyticsInstance = await loadAnalytics()
    }
    return analyticsInstance.checkpointPassed(data)
  },
  
  async lessonCompleted(data: any) {
    if (!analyticsInstance) {
      analyticsInstance = await loadAnalytics()
    }
    return analyticsInstance.lessonCompleted(data)
  },

  async interviewStarted(data: any) {
    if (!analyticsInstance) {
      analyticsInstance = await loadAnalytics()
    }
    return analyticsInstance.interviewStarted(data)
  },
  
  async questionRevealed(data: any) {
    if (!analyticsInstance) {
      analyticsInstance = await loadAnalytics()
    }
    return analyticsInstance.questionRevealed(data)
  },
  
  async answerSubmitted(data: any) {
    if (!analyticsInstance) {
      analyticsInstance = await loadAnalytics()
    }
    return analyticsInstance.answerSubmitted(data)
  },
  
  async interviewCompleted(data: any) {
    if (!analyticsInstance) {
      analyticsInstance = await loadAnalytics()
    }
    return analyticsInstance.interviewCompleted(data)
  }
}