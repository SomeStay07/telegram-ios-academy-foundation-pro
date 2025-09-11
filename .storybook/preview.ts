import type { Preview } from '@storybook/react'
import '../packages/ui/src/styles/globals.css'

// Minimal mock Telegram API
;(window as any).Telegram = {
  WebApp: {
    ready(){}, expand(){}, close(){},
    MainButton: { setText(){}, show(){}, hide(){}, onClick(){}, offClick(){} },
    BackButton: { show(){}, hide(){}, onClick(){}, offClick(){} },
    HapticFeedback: { impactOccurred(){}, notificationOccurred(){}, selectionChanged(){} },
    themeParams: {}
  }
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'responsive' },
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#ffffff' }, { name: 'dark', value: '#0f1113' }]
    }
  }
}
export default preview