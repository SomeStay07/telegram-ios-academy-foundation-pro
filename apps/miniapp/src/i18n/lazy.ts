// Import React for hooks
import React from 'react'

// Lazy i18n loading to reduce initial bundle
import { TFunction } from 'i18next'

let i18nInstance: any = null

// Lightweight translations for immediate use
const fallbackTranslations = {
  'lesson.continue': 'Continue',
  'lesson.complete': 'Complete Lesson',
  'lesson.quiz.correct': 'Correct!',
  'lesson.quiz.incorrect': 'Incorrect',
  'common.loading': 'Loading...',
  'common.error': 'Error'
}

export async function loadI18n(): Promise<TFunction> {
  if (!i18nInstance) {
    const i18n = await import('./index')
    i18nInstance = i18n.default
    await i18nInstance.loadResources() // Ensure resources are loaded
  }
  return i18nInstance.t
}

// Lightweight translation function that falls back to English
export function useTranslation(): { t: TFunction } {
  const [t, setT] = React.useState<TFunction>((key: string) => {
    return fallbackTranslations[key as keyof typeof fallbackTranslations] || key
  })

  React.useEffect(() => {
    let mounted = true
    
    // Load full i18n after initial render
    loadI18n().then(translationFn => {
      if (mounted) {
        setT(() => translationFn)
      }
    })

    return () => { mounted = false }
  }, [])

  return { t }
}