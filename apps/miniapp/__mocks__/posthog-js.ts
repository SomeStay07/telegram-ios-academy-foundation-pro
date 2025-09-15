import { vi } from 'vitest'

export class PostHog {
  constructor(apiKey: string, config?: any) {
    this.apiKey = apiKey
    this.config = config
  }

  private apiKey: string
  private config?: any

  identify = vi.fn()
  capture = vi.fn()
  register = vi.fn()
  unregister = vi.fn()
  reset = vi.fn()
  set_config = vi.fn()
  get_config = vi.fn(() => this.config)
  
  // Feature flags
  isFeatureEnabled = vi.fn().mockReturnValue(false)
  getFeatureFlag = vi.fn().mockReturnValue(undefined)
  onFeatureFlags = vi.fn()
  reloadFeatureFlags = vi.fn()
  
  // Session recording
  startSessionRecording = vi.fn()
  stopSessionRecording = vi.fn()
  
  // Groups
  group = vi.fn()
  
  // Aliases
  alias = vi.fn()
  
  // Page views
  capture_pageview = vi.fn()
  
  // Properties
  register_once = vi.fn()
  people = {
    set: vi.fn(),
    set_once: vi.fn(),
    increment: vi.fn(),
    append: vi.fn(),
    union: vi.fn(),
    track_charge: vi.fn(),
    clear_charges: vi.fn(),
    delete_user: vi.fn()
  }
  
  // Cohorts
  getActiveCohorts = vi.fn().mockReturnValue([])
  
  // Utils
  get_distinct_id = vi.fn().mockReturnValue('test-distinct-id')
  get_session_id = vi.fn().mockReturnValue('test-session-id')
  
  // Lifecycle
  init = vi.fn()
  opt_out_capturing = vi.fn()
  opt_in_capturing = vi.fn()
  has_opted_out_capturing = vi.fn().mockReturnValue(false)
  has_opted_in_capturing = vi.fn().mockReturnValue(true)
}

// Default export for CommonJS compatibility
export default PostHog

// Named export for ES modules
export const posthog = new PostHog('test-api-key', {
  api_host: 'https://test.posthog.com',
  disable_session_recording: true,
  disable_persistence: true,
  loaded: vi.fn()
})

// Mock the entire module
vi.mock('posthog-js', () => ({
  default: PostHog,
  PostHog,
  posthog
}))