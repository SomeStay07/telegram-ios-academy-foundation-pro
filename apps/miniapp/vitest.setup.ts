import { vi } from 'vitest'

// Telegram WebApp API Mock
const mockTelegramWebApp = {
  initData: 'query_id=test&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%2C%22last_name%22%3A%22User%22%2C%22username%22%3A%22testuser%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1234567890&hash=test_hash',
  initDataUnsafe: {
    query_id: 'test',
    user: {
      id: 123456789,
      first_name: 'Test',
      last_name: 'User',
      username: 'testuser',
      language_code: 'en'
    },
    auth_date: 1234567890,
    hash: 'test_hash'
  },
  version: '6.0',
  platform: 'tdesktop',
  colorScheme: 'light' as const,
  themeParams: {
    bg_color: '#ffffff',
    text_color: '#000000',
    hint_color: '#999999',
    link_color: '#0088cc',
    button_color: '#0088cc',
    button_text_color: '#ffffff'
  },
  isExpanded: true,
  viewportHeight: 600,
  viewportStableHeight: 600,
  headerColor: '#ffffff',
  backgroundColor: '#ffffff',
  isClosingConfirmationEnabled: false,
  ready: vi.fn(),
  expand: vi.fn(),
  close: vi.fn(),
  MainButton: {
    text: '',
    color: '#0088cc',
    textColor: '#ffffff',
    isVisible: false,
    isActive: true,
    isProgressVisible: false,
    setText: vi.fn(),
    onClick: vi.fn(),
    onClicked: vi.fn(),
    show: vi.fn(),
    hide: vi.fn(),
    enable: vi.fn(),
    disable: vi.fn(),
    showProgress: vi.fn(),
    hideProgress: vi.fn(),
    setParams: vi.fn()
  },
  BackButton: {
    isVisible: false,
    onClick: vi.fn(),
    onClicked: vi.fn(),
    show: vi.fn(),
    hide: vi.fn()
  },
  HapticFeedback: {
    impactOccurred: vi.fn(),
    notificationOccurred: vi.fn(),
    selectionChanged: vi.fn()
  },
  showPopup: vi.fn(),
  showAlert: vi.fn(),
  showConfirm: vi.fn(),
  showScanQrPopup: vi.fn(),
  closeScanQrPopup: vi.fn(),
  readTextFromClipboard: vi.fn(),
  requestWriteAccess: vi.fn(),
  requestContact: vi.fn(),
  openLink: vi.fn(),
  openTelegramLink: vi.fn(),
  openInvoice: vi.fn(),
  setHeaderColor: vi.fn(),
  setBackgroundColor: vi.fn(),
  enableClosingConfirmation: vi.fn(),
  disableClosingConfirmation: vi.fn(),
  onEvent: vi.fn(),
  offEvent: vi.fn(),
  sendData: vi.fn(),
  switchInlineQuery: vi.fn()
}

// Global window mocks
Object.defineProperty(window, 'Telegram', {
  value: { WebApp: mockTelegramWebApp },
  writable: true,
  configurable: true
})

Object.defineProperty(global, 'window', {
  value: {
    ...global.window,
    Telegram: { WebApp: mockTelegramWebApp }
  },
  writable: true,
  configurable: true
})

// matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// ResizeObserver mock
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Navigator sendBeacon mock
Object.defineProperty(navigator, 'sendBeacon', {
  writable: true,
  value: vi.fn().mockReturnValue(true)
})

// Crypto mock
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => 'test-uuid-1234-5678-9012'),
    getRandomValues: vi.fn((array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256)
      }
      return array
    }),
    subtle: {
      digest: vi.fn().mockResolvedValue(new ArrayBuffer(32))
    }
  }
})

// TextEncoder/TextDecoder mocks
global.TextEncoder = class TextEncoder {
  encode(input: string) {
    return new Uint8Array(Buffer.from(input, 'utf8'))
  }
}

global.TextDecoder = class TextDecoder {
  decode(input: Uint8Array) {
    return Buffer.from(input).toString('utf8')
  }
}

// localStorage mock
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = String(value)
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
    get length() {
      return Object.keys(store).length
    },
    key: vi.fn((index: number) => Object.keys(store)[index] || null)
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock
})

// URL.createObjectURL mock
global.URL.createObjectURL = vi.fn(() => 'blob:test-url')
global.URL.revokeObjectURL = vi.fn()

// IntersectionObserver mock
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// MutationObserver mock
global.MutationObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  takeRecords: vi.fn()
}))

// Request/Response mocks for fetch
global.Request = class Request {
  constructor(public url: string, public init?: RequestInit) {}
}

global.Response = class Response {
  constructor(public body?: BodyInit, public init?: ResponseInit) {}
  
  static json(object: any) {
    return new Response(JSON.stringify(object), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  json() {
    return Promise.resolve(JSON.parse(this.body as string))
  }
  
  text() {
    return Promise.resolve(this.body as string)
  }
}

// Analytics mocks
vi.mock('posthog-js', () => ({
  default: vi.fn(),
  PostHog: vi.fn()
}))

// Create analytics mock object
const analyticsMock = {
  track: vi.fn(),
  identify: vi.fn(),
  lessonStarted: vi.fn(),
  lessonCompleted: vi.fn(),
  quizAnswered: vi.fn(),
  interviewStarted: vi.fn(),
  interviewAnswerSubmitted: vi.fn(),
  interviewCompleted: vi.fn(),
  deepLinkOpened: vi.fn(),
  pageLoad: vi.fn(),
  error: vi.fn()
}

// Mock the analytics modules  
vi.mock('src/lib/analytics', () => ({
  track: vi.fn(),
  identify: vi.fn(),
  trackInterviewStarted: vi.fn(),
  trackInterviewAnswerSubmitted: vi.fn(),
  trackInterviewCompleted: vi.fn(),
  analytics: analyticsMock
}))

vi.mock('src/analytics/lazy', () => ({
  analytics: analyticsMock
}))

// Console mocks to reduce noise in tests
vi.spyOn(console, 'warn').mockImplementation(() => {})
vi.spyOn(console, 'error').mockImplementation(() => {})

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
    getEntriesByName: vi.fn(() => [])
  }
})

// Mock HTMLElement.prototype methods to fix React Dom issues
HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON: vi.fn()
}))

HTMLElement.prototype.getClientRects = vi.fn(() => ({
  length: 0,
  item: () => null,
  [Symbol.iterator]: vi.fn()
}))

// Fix Selection API issues in JSDOM
Object.defineProperty(window, 'Selection', {
  value: class Selection {
    constructor() {}
    addRange() {}
    removeAllRanges() {}
    getRangeAt() { return new Range() }
    get rangeCount() { return 0 }
    toString() { return '' }
  },
  writable: true
})

Object.defineProperty(document, 'getSelection', {
  value: () => new window.Selection(),
  writable: true
})

// Fix Document methods
if (!document.createRange) {
  document.createRange = () => new Range()
}

// Fix jsdom issues with selection/range
global.Range = class Range {
  constructor() {}
  
  getBoundingClientRect() {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
      toJSON: vi.fn()
    }
  }
  
  getClientRects() {
    return {
      length: 0,
      item: () => null,
      [Symbol.iterator]: vi.fn()
    }
  }
  
  setStart() {}
  setEnd() {}
  selectNodeContents() {}
  selectNode() {}
  cloneRange() { return new Range() }
  collapse() {}
  deleteContents() {}
  extractContents() { return document.createDocumentFragment() }
  insertNode() {}
  surroundContents() {}
  compareBoundaryPoints() { return 0 }
  toString() { return '' }
  detach() {}
}