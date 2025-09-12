// Deep linking utilities for parsing start_param and generating Telegram links

export interface ParsedStartParam {
  type: 'lesson' | 'course' | 'interview'
  id: string
  mode?: 'drill' | 'explain' | 'mock'
  metadata?: Record<string, string>
}

// Parse Telegram start_param into structured data
export function parseStartParam(startParam: string): ParsedStartParam | null {
  if (!startParam) return null

  try {
    // Format: lesson_swift-variables or course_ios-fundamentals or interview_swift-fundamentals_drill
    const parts = startParam.split('_')
    
    if (parts.length < 2) {
      console.warn('Invalid start_param format:', startParam)
      return null
    }

    const [type, id, ...rest] = parts

    if (!['lesson', 'course', 'interview'].includes(type)) {
      console.warn('Unknown start_param type:', type)
      return null
    }

    const parsed: ParsedStartParam = {
      type: type as 'lesson' | 'course' | 'interview',
      id
    }

    // Handle interview mode
    if (type === 'interview' && rest.length > 0) {
      const mode = rest[0]
      if (['drill', 'explain', 'mock'].includes(mode)) {
        parsed.mode = mode as 'drill' | 'explain' | 'mock'
      }
    }

    // Parse additional metadata from remaining parts
    if (rest.length > 1 || (type !== 'interview' && rest.length > 0)) {
      parsed.metadata = {}
      const metadataParts = type === 'interview' ? rest.slice(1) : rest
      
      metadataParts.forEach(part => {
        const [key, value] = part.split('=')
        if (key && value) {
          parsed.metadata![key] = decodeURIComponent(value)
        }
      })
    }

    return parsed
  } catch (error) {
    console.error('Failed to parse start_param:', startParam, error)
    return null
  }
}

// Generate start_param string from structured data
export function generateStartParam(data: ParsedStartParam): string {
  const parts = [data.type, data.id]
  
  // Add mode for interviews
  if (data.type === 'interview' && data.mode) {
    parts.push(data.mode)
  }
  
  // Add metadata
  if (data.metadata) {
    Object.entries(data.metadata).forEach(([key, value]) => {
      parts.push(`${key}=${encodeURIComponent(value)}`)
    })
  }
  
  return parts.join('_')
}

// Generate Telegram deep link
export function generateTelegramLink(botUsername: string, startParam: string): string {
  const encodedParam = encodeURIComponent(startParam)
  return `https://t.me/${botUsername}?start=${encodedParam}`
}

// Generate Telegram Web App link  
export function generateTelegramWebAppLink(botUsername: string, startParam?: string): string {
  const baseUrl = `https://t.me/${botUsername}/app`
  if (startParam) {
    return `${baseUrl}?startapp=${encodeURIComponent(startParam)}`
  }
  return baseUrl
}

// Get internal app route from parsed start_param
export function getRouteFromStartParam(parsed: ParsedStartParam): string {
  switch (parsed.type) {
    case 'lesson':
      return `/lesson/${parsed.id}`
    
    case 'course':
      return `/course/${parsed.id}`
    
    case 'interview':
      const mode = parsed.mode || 'drill'
      return `/interview/${parsed.id}/${mode}`
    
    default:
      return '/'
  }
}

// Extract start param from Telegram WebApp
export function extractTelegramStartParam(): string | null {
  try {
    const tg = (window as any).Telegram?.WebApp
    if (!tg?.initDataUnsafe) return null
    
    // Check for start_param in initDataUnsafe
    return tg.initDataUnsafe.start_param || null
  } catch (error) {
    console.error('Failed to extract Telegram start param:', error)
    return null
  }
}

// Extract startapp param from URL (for Web App links)
export function extractStartAppParam(): string | null {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('startapp')
  } catch (error) {
    console.error('Failed to extract startapp param:', error)
    return null
  }
}

// Process any available start parameters
export function processDeepLink(): { route: string; parsed: ParsedStartParam } | null {
  // Try Telegram start_param first
  const telegramStartParam = extractTelegramStartParam()
  if (telegramStartParam) {
    const parsed = parseStartParam(telegramStartParam)
    if (parsed) {
      return {
        route: getRouteFromStartParam(parsed),
        parsed
      }
    }
  }
  
  // Try URL startapp param
  const startAppParam = extractStartAppParam()
  if (startAppParam) {
    const parsed = parseStartParam(startAppParam)
    if (parsed) {
      return {
        route: getRouteFromStartParam(parsed),
        parsed
      }
    }
  }
  
  return null
}

// Analytics tracking for deep link usage
export function trackDeepLink(parsed: ParsedStartParam, source: 'telegram' | 'url' = 'telegram') {
  try {
    // Import analytics lazily to avoid bundle bloat
    import('../analytics/lazy').then(({ analytics }) => {
      analytics.deepLinkOpened?.({
        link_type: parsed.type,
        content_id: parsed.id,
        mode: parsed.mode,
        metadata: parsed.metadata,
        source,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    }).catch(console.warn)
  } catch (error) {
    console.warn('Failed to track deep link:', error)
  }
}

// Example usage:
//
// // Parse start_param
// const parsed = parseStartParam('lesson_swift-variables')
// // -> { type: 'lesson', id: 'swift-variables' }
//
// const parsed2 = parseStartParam('interview_swift-fundamentals_drill_source=course')
// // -> { type: 'interview', id: 'swift-fundamentals', mode: 'drill', metadata: { source: 'course' } }
//
// // Generate links
// const startParam = generateStartParam({ type: 'course', id: 'ios-fundamentals' })
// // -> 'course_ios-fundamentals'
//
// const tgLink = generateTelegramLink('ios_academy_bot', startParam)
// // -> 'https://t.me/ios_academy_bot?start=course_ios-fundamentals'
//
// const webAppLink = generateTelegramWebAppLink('ios_academy_bot', startParam)
// // -> 'https://t.me/ios_academy_bot/app?startapp=course_ios-fundamentals'