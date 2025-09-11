import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enCommon from '../locales/en/common.json'
import ruCommon from '../locales/ru/common.json'

// Detect language from Telegram WebApp
function detectLanguage(): string {
  const tg = (window as any).Telegram?.WebApp
  if (tg?.initDataUnsafe?.user?.language_code) {
    const lang = tg.initDataUnsafe.user.language_code
    // Support only ru/en, fallback to en
    return ['ru', 'en'].includes(lang) ? lang : 'en'
  }
  
  // Fallback to browser language
  const browserLang = navigator.language.split('-')[0]
  return ['ru', 'en'].includes(browserLang) ? browserLang : 'en'
}

i18n
  .use(initReactI18next)
  .init({
    lng: detectLanguage(),
    fallbackLng: 'en',
    
    resources: {
      en: {
        common: enCommon,
      },
      ru: {
        common: ruCommon,
      },
    },
    
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    react: {
      useSuspense: false, // Avoid suspense for now
    },
  })

export default i18n