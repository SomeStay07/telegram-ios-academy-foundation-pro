/**
 * 🚀 Unified API Client - Enterprise-grade API layer
 * 
 * Централизованный API клиент с полной Telegram интеграцией, 
 * автоматической аутентификацией и продвинутым кэшированием.
 */

import { getTelegramApi } from '../telegram/api'
import { VITE } from '../../env'

// Configuration
const API_BASE_URL = VITE.API_BASE_URL
const API_TIMEOUT = 15000 // 15 seconds for better UX
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

// Types for API responses
export interface ApiResponse<T = any> {
  data: T
  message?: string
  timestamp: string
  requestId: string
}

export interface ApiError {
  error: string
  message: string
  details?: Record<string, any>
  code?: string
  timestamp: string
  requestId: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Request configuration interface
export interface ApiRequestConfig extends Omit<RequestInit, 'body'> {
  timeout?: number
  retries?: number
  idempotencyKey?: string
  skipAuth?: boolean
  body?: any
}

/**
 * Enhanced API Client with Telegram integration
 */
class UnifiedApiClient {
  private requestId = 0

  /**
   * Get authentication headers from Telegram
   */
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Client-Version': '1.0.0',
      'X-Platform': 'telegram-miniapp'
    }

    try {
      const telegramApi = getTelegramApi()
      const webApp = telegramApi.getWebApp()
      
      // Only add init data if it exists and is valid
      if (webApp?.initData && webApp.initData.trim() && webApp.initData !== 'query_id=&user=&auth_date=&hash=') {
        headers['X-Telegram-Init-Data'] = webApp.initData
      }
      
      // Add user info if available
      const user = telegramApi.getUser()
      if (user.isAvailable && user.id > 0) {
        headers['X-Telegram-User-ID'] = user.id.toString()
        if (user.username) {
          headers['X-Telegram-Username'] = user.username
        }
      }

    } catch (error) {
      // Gracefully handle cases where Telegram API is not available
      console.warn('Telegram API not available for authentication')
    }

    return headers
  }

  /**
   * Generate unique request ID for tracing
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${++this.requestId}`
  }

  /**
   * Fetch with timeout and abort capability
   */
  private async fetchWithTimeout(
    url: string, 
    options: RequestInit, 
    timeout: number = API_TIMEOUT
  ): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  /**
   * Fetch with automatic retries
   */
  private async fetchWithRetry(
    url: string, 
    options: RequestInit, 
    retries: number = MAX_RETRIES
  ): Promise<Response> {
    try {
      const response = await this.fetchWithTimeout(url, options)
      
      // Log auth issues for debugging
      if (response.status === 400 || response.status === 401) {
        console.warn(`API authentication issue: ${response.status} ${response.statusText}`)
        console.warn('Headers sent:', options.headers)
      }
      
      // Don't retry on 4xx errors (client errors)
      if (response.status >= 400 && response.status < 500) {
        return response
      }
      
      // Don't retry on successful responses
      if (response.ok) {
        return response
      }
      
      // Retry on 5xx errors
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    } catch (error) {
      if (retries > 0 && !(error instanceof DOMException && error.name === 'AbortError')) {
        console.warn(`Retrying request (${retries} attempts left):`, error)
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
        return this.fetchWithRetry(url, options, retries - 1)
      }
      throw error
    }
  }

  /**
   * Process API response and handle errors
   */
  private async processResponse<T>(response: Response, requestId: string): Promise<T> {
    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')

    if (!response.ok) {
      let errorData: ApiError
      
      if (isJson) {
        errorData = await response.json()
      } else {
        errorData = {
          error: 'HTTP_ERROR',
          message: `HTTP ${response.status}: ${response.statusText}`,
          timestamp: new Date().toISOString(),
          requestId
        }
      }
      
      throw new ApiClientError(errorData, response.status)
    }

    if (isJson) {
      const data = await response.json()
      // Handle both wrapped and unwrapped responses
      return data.data !== undefined ? data.data : data
    }

    return response.text() as unknown as T
  }

  /**
   * Main request method
   */
  async request<T = any>(
    endpoint: string, 
    config: ApiRequestConfig = {}
  ): Promise<T> {
    const {
      timeout = API_TIMEOUT,
      retries = MAX_RETRIES,
      idempotencyKey,
      skipAuth = false,
      body,
      headers: configHeaders = {},
      ...restConfig
    } = config

    const requestId = this.generateRequestId()
    const url = `${API_BASE_URL}${endpoint}`

    // Build headers
    const headers: Record<string, string> = {
      'X-Request-ID': requestId,
      ...configHeaders
    }

    // Add authentication headers unless skipped
    if (!skipAuth) {
      Object.assign(headers, this.getAuthHeaders())
    }

    // Add idempotency key for POST/PUT/PATCH requests
    if (idempotencyKey) {
      headers['Idempotency-Key'] = idempotencyKey
    }

    // Prepare request options
    const requestOptions: RequestInit = {
      ...restConfig,
      headers,
      body: body ? JSON.stringify(body) : undefined
    }

    try {
      const response = await this.fetchWithRetry(url, requestOptions, retries)
      return await this.processResponse<T>(response, requestId)
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error
      }
      
      // Wrap network/other errors
      throw new ApiClientError({
        error: 'NETWORK_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
        requestId
      }, 0)
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body })
  }

  async put<T>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body })
  }

  async patch<T>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body })
  }

  async delete<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.get('/health', { skipAuth: true })
  }
}

/**
 * Custom API Error class
 */
export class ApiClientError extends Error {
  constructor(
    public readonly apiError: ApiError,
    public readonly statusCode: number
  ) {
    super(apiError.message)
    this.name = 'ApiClientError'
  }

  get isNetworkError(): boolean {
    return this.statusCode === 0
  }

  get isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500
  }

  get isServerError(): boolean {
    return this.statusCode >= 500
  }

  get isRetryable(): boolean {
    return this.isServerError || this.isNetworkError
  }
}

// Export singleton instance
export const apiClient = new UnifiedApiClient()

// Export for dependency injection in tests
export { UnifiedApiClient }