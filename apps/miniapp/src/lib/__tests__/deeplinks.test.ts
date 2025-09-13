import { describe, it, expect, vi, beforeEach } from 'vitest'
import { 
  parseDeeplink, 
  createDeeplink, 
  handleTelegramDeeplink,
  isValidLessonId,
  isValidCourseId,
  isValidInterviewId,
  isValidInterviewMode
} from '../deeplinks'

describe('parseDeeplink', () => {
  it('parses lesson deeplinks correctly', () => {
    const result = parseDeeplink('lesson_ios-basics')
    expect(result).toEqual({
      type: 'lesson',
      id: 'ios-basics',
      path: '/lesson/ios-basics'
    })
  })

  it('parses course deeplinks correctly', () => {
    const result = parseDeeplink('course_swift-fundamentals')
    expect(result).toEqual({
      type: 'course',
      id: 'swift-fundamentals',
      path: '/course/swift-fundamentals'
    })
  })

  it('parses interview deeplinks correctly', () => {
    const result = parseDeeplink('interview_ios-senior_mock')
    expect(result).toEqual({
      type: 'interview',
      id: 'ios-senior',
      mode: 'mock',
      path: '/interview/ios-senior?mode=mock'
    })
  })

  it('handles case insensitive input', () => {
    const result = parseDeeplink('LESSON_IOS_BASICS')
    expect(result).toEqual({
      type: 'lesson',
      id: 'ios_basics',
      path: '/lesson/ios_basics'
    })
  })

  it('returns null for invalid formats', () => {
    expect(parseDeeplink('')).toBeNull()
    expect(parseDeeplink('invalid')).toBeNull()
    expect(parseDeeplink('lesson_')).toBeNull()
    expect(parseDeeplink('interview_id')).toBeNull() // missing mode
    expect(parseDeeplink('interview_id_invalid')).toBeNull() // invalid mode
    expect(parseDeeplink(null as any)).toBeNull()
    expect(parseDeeplink(undefined as any)).toBeNull()
  })

  it('handles whitespace correctly', () => {
    const result = parseDeeplink('  lesson_test  ')
    expect(result).toEqual({
      type: 'lesson',
      id: 'test',
      path: '/lesson/test'
    })
  })
})

describe('createDeeplink', () => {
  it('creates lesson deeplinks', () => {
    expect(createDeeplink('lesson', 'ios-basics')).toBe('lesson_ios-basics')
  })

  it('creates course deeplinks', () => {
    expect(createDeeplink('course', 'swift-fundamentals')).toBe('course_swift-fundamentals')
  })

  it('creates interview deeplinks', () => {
    expect(createDeeplink('interview', 'ios-senior', 'mock')).toBe('interview_ios-senior_mock')
    expect(createDeeplink('interview', 'ios-junior', 'drill')).toBe('interview_ios-junior_drill')
    expect(createDeeplink('interview', 'ios-mid', 'explain')).toBe('interview_ios-mid_explain')
  })

  it('throws error for interview without mode', () => {
    expect(() => createDeeplink('interview', 'test')).toThrow('Mode is required for interview deeplinks')
  })

  it('throws error for invalid type', () => {
    expect(() => createDeeplink('invalid' as any, 'test')).toThrow('Invalid deeplink type: invalid')
  })
})

describe('handleTelegramDeeplink', () => {
  beforeEach(() => {
    // Clear global Telegram mock
    delete (global as any).window
    vi.clearAllMocks()
  })

  it('handles valid Telegram deeplinks', () => {
    const mockNavigate = vi.fn()
    
    // Mock Telegram WebApp
    ;(global as any).window = {
      Telegram: {
        WebApp: {
          initDataUnsafe: {
            start_param: 'lesson_ios-basics'
          }
        }
      }
    }

    const result = handleTelegramDeeplink(mockNavigate)
    
    expect(result).toBe(true)
    expect(mockNavigate).toHaveBeenCalledWith('/lesson/ios-basics')
  })

  it('returns false when no Telegram WebApp', () => {
    const mockNavigate = vi.fn()
    
    ;(global as any).window = {}

    const result = handleTelegramDeeplink(mockNavigate)
    
    expect(result).toBe(false)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('returns false when no start_param', () => {
    const mockNavigate = vi.fn()
    
    ;(global as any).window = {
      Telegram: {
        WebApp: {
          initDataUnsafe: {}
        }
      }
    }

    const result = handleTelegramDeeplink(mockNavigate)
    
    expect(result).toBe(false)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('warns on invalid deeplink format', () => {
    const mockNavigate = vi.fn()
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    
    ;(global as any).window = {
      Telegram: {
        WebApp: {
          initDataUnsafe: {
            start_param: 'invalid_format'
          }
        }
      }
    }

    const result = handleTelegramDeeplink(mockNavigate)
    
    expect(result).toBe(false)
    expect(mockNavigate).not.toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith('Invalid deeplink format:', 'invalid_format')
    
    consoleSpy.mockRestore()
  })
})

describe('validation helpers', () => {
  describe('isValidLessonId', () => {
    it('validates correct lesson IDs', () => {
      expect(isValidLessonId('ios-basics')).toBe(true)
      expect(isValidLessonId('swift_fundamentals')).toBe(true)
      expect(isValidLessonId('lesson123')).toBe(true)
      expect(isValidLessonId('a')).toBe(true)
    })

    it('rejects invalid lesson IDs', () => {
      expect(isValidLessonId('')).toBe(false)
      expect(isValidLessonId('ios basics')).toBe(false) // spaces
      expect(isValidLessonId('ios@basics')).toBe(false) // special chars
      expect(isValidLessonId('a'.repeat(101))).toBe(false) // too long
    })
  })

  describe('isValidCourseId', () => {
    it('validates correct course IDs', () => {
      expect(isValidCourseId('swift-course')).toBe(true)
      expect(isValidCourseId('ios_development')).toBe(true)
    })

    it('rejects invalid course IDs', () => {
      expect(isValidCourseId('')).toBe(false)
      expect(isValidCourseId('course with spaces')).toBe(false)
    })
  })

  describe('isValidInterviewId', () => {
    it('validates correct interview IDs', () => {
      expect(isValidInterviewId('senior-ios')).toBe(true)
      expect(isValidInterviewId('junior_swift')).toBe(true)
    })

    it('rejects invalid interview IDs', () => {
      expect(isValidInterviewId('')).toBe(false)
      expect(isValidInterviewId('interview with spaces')).toBe(false)
    })
  })

  describe('isValidInterviewMode', () => {
    it('validates correct modes', () => {
      expect(isValidInterviewMode('drill')).toBe(true)
      expect(isValidInterviewMode('explain')).toBe(true)
      expect(isValidInterviewMode('mock')).toBe(true)
    })

    it('rejects invalid modes', () => {
      expect(isValidInterviewMode('invalid')).toBe(false)
      expect(isValidInterviewMode('DRILL')).toBe(false)
      expect(isValidInterviewMode('')).toBe(false)
    })
  })
})