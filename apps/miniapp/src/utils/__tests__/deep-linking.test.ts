import { parseStartParam } from '../deep-linking'

describe('Deep linking parser', () => {
  test('should parse lesson start param', () => {
    const result = parseStartParam('lesson_swift-variables')
    expect(result).toEqual({
      type: 'lesson',
      id: 'swift-variables'
    })
  })

  test('should parse course start param', () => {
    const result = parseStartParam('course_ios-fundamentals')
    expect(result).toEqual({
      type: 'course',
      id: 'ios-fundamentals'
    })
  })

  test('should parse interview start param with mode', () => {
    const result = parseStartParam('interview_swift-fundamentals_drill')
    expect(result).toEqual({
      type: 'interview',
      id: 'swift-fundamentals',
      mode: 'drill'
    })
  })

  test('should parse interview start param with metadata', () => {
    const result = parseStartParam('interview_swift-fundamentals_explain_source=bot')
    expect(result).toEqual({
      type: 'interview',
      id: 'swift-fundamentals',
      mode: 'explain',
      metadata: {
        source: 'bot'
      }
    })
  })

  test('should return null for invalid format', () => {
    expect(parseStartParam('invalid')).toBeNull()
    expect(parseStartParam('')).toBeNull()
    expect(parseStartParam('unknown_type')).toBeNull()
  })

  test('should handle missing mode gracefully', () => {
    const result = parseStartParam('interview_swift-fundamentals')
    expect(result).toEqual({
      type: 'interview',
      id: 'swift-fundamentals'
    })
  })
})