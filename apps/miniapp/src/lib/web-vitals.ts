// Web Vitals с нулевым оверхедом
// Лениво загружается и отправляет метрики через beacon

import { track } from './analytics/index'

let webVitalsLoaded = false

// Инициализация Web Vitals при первой загрузке страницы
export async function initWebVitals(): Promise<void> {
  if (webVitalsLoaded || !import.meta.env.PROD) {
    return
  }

  try {
    // Ленивая загрузка web-vitals (~2KB)
    const { onCLS, onFID, onLCP, onFCP, onTTFB } = await import(/* @vite-ignore */ 'web-vitals')

    // Отправляем метрики через analytics adapter
    onCLS((metric) => {
      track('web_vitals_cls', {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        metric_type: 'CLS'
      })
    })

    onFID((metric) => {
      track('web_vitals_fid', {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        metric_type: 'FID'
      })
    })

    onLCP((metric) => {
      track('web_vitals_lcp', {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        metric_type: 'LCP'
      })
    })

    onFCP((metric) => {
      track('web_vitals_fcp', {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        metric_type: 'FCP'
      })
    })

    onTTFB((metric) => {
      track('web_vitals_ttfb', {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        metric_type: 'TTFB'
      })
    })

    webVitalsLoaded = true
    // Web Vitals initialized
  } catch (error) {
    console.error('Failed to load web-vitals:', error)
  }
}

// Автоматически инициализируем через requestIdleCallback
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => initWebVitals())
  } else {
    // Fallback для браузеров без requestIdleCallback
    setTimeout(() => initWebVitals(), 2000)
  }
}