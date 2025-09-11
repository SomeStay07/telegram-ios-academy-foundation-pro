# Storybook Guide & Component Development

## Setup and Configuration

### Storybook Integration with Telegram WebApp

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react'
import '../packages/ui/src/styles/globals.css'

// Mock Telegram WebApp for Storybook
const mockTelegram = {
  WebApp: {
    ready: () => console.log('Telegram WebApp ready'),
    expand: () => console.log('Telegram WebApp expanded'),
    close: () => console.log('Telegram WebApp closed'),
    BackButton: {
      show: () => console.log('BackButton shown'),
      hide: () => console.log('BackButton hidden'),
      onClick: (callback: () => void) => {
        console.log('BackButton onClick set')
        // Store callback for manual triggering
        ;(window as any).__telegramBackButtonCallback = callback
      },
      offClick: () => console.log('BackButton onClick removed'),
    },
    MainButton: {
      text: 'CONTINUE',
      color: '#2481cc',
      textColor: '#ffffff',
      isVisible: false,
      isActive: true,
      isProgressVisible: false,
      setText: (text: string) => {
        mockTelegram.WebApp.MainButton.text = text
        console.log('MainButton text set to:', text)
      },
      onClick: (callback: () => void) => {
        console.log('MainButton onClick set')
        ;(window as any).__telegramMainButtonCallback = callback
      },
      offClick: () => console.log('MainButton onClick removed'),
      show: () => {
        mockTelegram.WebApp.MainButton.isVisible = true
        console.log('MainButton shown')
      },
      hide: () => {
        mockTelegram.WebApp.MainButton.isVisible = false
        console.log('MainButton hidden')
      },
      enable: () => {
        mockTelegram.WebApp.MainButton.isActive = true
        console.log('MainButton enabled')
      },
      disable: () => {
        mockTelegram.WebApp.MainButton.isActive = false
        console.log('MainButton disabled')
      },
      showProgress: () => {
        mockTelegram.WebApp.MainButton.isProgressVisible = true
        console.log('MainButton progress shown')
      },
      hideProgress: () => {
        mockTelegram.WebApp.MainButton.isProgressVisible = false
        console.log('MainButton progress hidden')
      },
    },
    HapticFeedback: {
      impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') =>
        console.log('Haptic impact:', style),
      notificationOccurred: (type: 'error' | 'success' | 'warning') =>
        console.log('Haptic notification:', type),
      selectionChanged: () => console.log('Haptic selection changed'),
    },
    themeParams: {
      bg_color: '#ffffff',
      text_color: '#000000',
      hint_color: '#999999',
      link_color: '#2481cc',
      button_color: '#2481cc',
      button_text_color: '#ffffff',
      secondary_bg_color: '#f1f1f1',
      header_bg_color: '#527da3',
      accent_text_color: '#2481cc',
      section_bg_color: '#ffffff',
      section_header_text_color: '#6d6d71',
      subtitle_text_color: '#999999',
      destructive_text_color: '#cc2929',
    },
    colorScheme: 'light',
    initData: 'query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%7D&auth_date=1662771648&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2',
    initDataUnsafe: {
      query_id: 'AAHdF6IQAAAAAN0XohDhrOrc',
      user: {
        id: 279058397,
        first_name: 'Vladislav',
        last_name: 'Kibenko',
        username: 'vdkfrost',
        language_code: 'ru',
      },
      auth_date: 1662771648,
      hash: 'c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2',
    },
    version: '6.7',
    platform: 'android',
  },
}

// Apply mock to global window
;(window as any).Telegram = mockTelegram

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'telegram-light',
      values: [
        {
          name: 'telegram-light',
          value: '#ffffff',
        },
        {
          name: 'telegram-dark',
          value: '#17212b',
        },
        {
          name: 'ios-light',
          value: '#f2f2f7',
        },
        {
          name: 'ios-dark',
          value: '#000000',
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      // Apply theme based on background
      const theme = context.globals.backgrounds?.value === '#17212b' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', theme)
      
      // Update mock theme
      if (theme === 'dark') {
        mockTelegram.WebApp.themeParams = {
          bg_color: '#17212b',
          text_color: '#ffffff',
          hint_color: '#708499',
          link_color: '#6ab7ff',
          button_color: '#5288c1',
          button_text_color: '#ffffff',
          secondary_bg_color: '#232e3c',
          header_bg_color: '#17212b',
          accent_text_color: '#6ab7ff',
          section_bg_color: '#17212b',
          section_header_text_color: '#6ab7ff',
          subtitle_text_color: '#708499',
          destructive_text_color: '#ec3942',
        }
        mockTelegram.WebApp.colorScheme = 'dark'
      }
      
      return <Story />
    },
  ],
}

export default preview
```

### Storybook Main Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: [
    '../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../apps/miniapp/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      // Ensure proper path resolution for monorepo
      resolve: {
        alias: {
          '@': new URL('../apps/miniapp/src', import.meta.url).pathname,
          '@ui': new URL('../packages/ui/src', import.meta.url).pathname,
        },
      },
    })
  },
}

export default config
```

## Component Stories Examples

### Button Component Story

```typescript
// packages/ui/src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive button component with Telegram theme integration and haptic feedback support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: { 
    onClick: fn(),
    children: 'Button',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Account',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary">Hover me</Button>
        <Button variant="ghost">Focus me</Button>
      </div>
    </div>
  ),
}

export const WithHaptics: Story = {
  args: {
    children: 'Haptic Button',
    onClick: () => {
      // Trigger haptic feedback
      ;(window as any).Telegram.WebApp.HapticFeedback.impactOccurred('medium')
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with haptic feedback. Check browser console for haptic events.',
      },
    },
  },
}
```

### ModuleRenderer Story (Complex Component)

```typescript
// packages/ui/src/renderer/ModuleRenderer.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ModuleRenderer } from './ModuleRenderer'
import lessonData from '../../../content/seed/lessons/swift-variables.json'

const meta: Meta<typeof ModuleRenderer> = {
  title: 'Renderer/ModuleRenderer',
  component: ModuleRenderer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Renders different types of learning modules (hook, concept, quiz, etc.) with appropriate styling and interactions.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Extract sample modules from seed data
const sampleModules = lessonData.modules

export const HookModule: Story = {
  args: {
    module: sampleModules.find(m => m.kind === 'hook') || sampleModules[0],
    onQuizAnswer: (questionId: string, isCorrect: boolean) => {
      console.log('Quiz answered:', { questionId, isCorrect })
    },
  },
}

export const ConceptModule: Story = {
  args: {
    module: sampleModules.find(m => m.kind === 'concept') || sampleModules[1],
  },
}

export const WorkedExampleModule: Story = {
  args: {
    module: sampleModules.find(m => m.kind === 'workedExample') || sampleModules[2],
  },
  parameters: {
    docs: {
      description: {
        story: 'Worked example with step-by-step revelation and fading scaffolds.',
      },
    },
  },
}

export const QuizModule: Story = {
  args: {
    module: sampleModules.find(m => m.kind === 'quiz') || sampleModules[3],
    onQuizAnswer: (questionId: string, isCorrect: boolean) => {
      console.log('Quiz answered:', { questionId, isCorrect })
      // Mock haptic feedback
      if (isCorrect) {
        ;(window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('success')
      } else {
        ;(window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('error')
      }
    },
  },
}

export const CheckpointModule: Story = {
  args: {
    module: sampleModules.find(m => m.kind === 'checkpoint') || {
      kind: 'checkpoint',
      id: 'cp1',
      title: 'Контрольная точка',
      quizIds: ['q1', 'q2'],
      passThreshold: 0.8,
    },
  },
}

export const AllModuleTypes: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      {sampleModules.slice(0, 5).map((module) => (
        <div key={module.id} className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            {module.kind.charAt(0).toUpperCase() + module.kind.slice(1)}
          </h3>
          <ModuleRenderer
            module={module}
            onQuizAnswer={(questionId: string, isCorrect: boolean) => {
              console.log('Quiz answered:', { questionId, isCorrect, moduleId: module.id })
            }}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase of all module types in a lesson flow.',
      },
    },
  },
}

export const CompleteLessonFlow: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(0)
    const [completedModules, setCompletedModules] = React.useState<Set<string>>(new Set())
    
    const currentModule = sampleModules[currentStep]
    const isLastModule = currentStep === sampleModules.length - 1

    const handleModuleComplete = (moduleId: string, success: boolean) => {
      setCompletedModules(prev => new Set([...prev, moduleId]))
      
      if (success) {
        ;(window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('success')
      }

      // Auto-advance after quiz/checkpoint
      if (currentModule.kind === 'quiz' || currentModule.kind === 'checkpoint') {
        setTimeout(() => {
          if (!isLastModule) {
            setCurrentStep(prev => prev + 1)
          }
        }, 1500)
      }
    }

    return (
      <div className="max-w-2xl mx-auto p-4 space-y-4">
        {/* Progress indicator */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">
            Шаг {currentStep + 1} из {sampleModules.length}
          </span>
          <div className="flex space-x-1">
            {sampleModules.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < currentStep ? 'bg-green-500' :
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current module */}
        <div className="p-4 border rounded-lg">
          <ModuleRenderer
            module={currentModule}
            onComplete={(success) => handleModuleComplete(currentModule.id, success)}
            onQuizAnswer={(questionId, isCorrect) => {
              console.log('Quiz answered:', { questionId, isCorrect })
              if (isCorrect) {
                ;(window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('success')
              } else {
                ;(window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('error')
              }
            }}
          />
        </div>

        {/* Navigation */}
        {currentModule.kind !== 'quiz' && currentModule.kind !== 'checkpoint' && (
          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => {
                ;(window as any).Telegram.WebApp.HapticFeedback.impactOccurred('light')
                if (!isLastModule) {
                  setCurrentStep(prev => prev + 1)
                } else {
                  console.log('Lesson completed!')
                  ;(window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('success')
                }
              }}
            >
              {isLastModule ? 'Завершить урок' : 'Продолжить'}
            </button>
          </div>
        )}
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete interactive lesson flow with progress tracking and Telegram WebApp integration.',
      },
    },
  },
}
```

### Telegram Controls Story

```typescript
// apps/miniapp/src/components/TelegramControls.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const TelegramControls = () => {
  return (
    <div className="space-y-6 p-6 max-w-md mx-auto">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Telegram WebApp Controls</h2>
        <p className="text-gray-600">Test Telegram WebApp integration in Storybook</p>
      </div>

      <div className="space-y-3">
        <button
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => {
            ;(window as any).Telegram.WebApp.BackButton.show()
            console.log('BackButton shown')
          }}
        >
          Show Back Button
        </button>

        <button
          className="w-full p-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          onClick={() => {
            ;(window as any).Telegram.WebApp.BackButton.hide()
            console.log('BackButton hidden')
          }}
        >
          Hide Back Button
        </button>
      </div>

      <div className="space-y-3">
        <button
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => {
            const mainButton = (window as any).Telegram.WebApp.MainButton
            mainButton.setText('Continue Learning')
            mainButton.show()
            console.log('MainButton shown with text: Continue Learning')
          }}
        >
          Show Main Button
        </button>

        <button
          className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => {
            ;(window as any).Telegram.WebApp.MainButton.hide()
            console.log('MainButton hidden')
          }}
        >
          Hide Main Button
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Haptic Feedback</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            onClick={() => {
              ;(window as any).Telegram.WebApp.HapticFeedback.impactOccurred('light')
            }}
          >
            Light Impact
          </button>
          <button
            className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            onClick={() => {
              ;(window as any).Telegram.WebApp.HapticFeedback.impactOccurred('medium')
            }}
          >
            Medium Impact
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={() => {
              ;(window as any).Telegram.WebApp.HapticFeedback.impactOccurred('heavy')
            }}
          >
            Heavy Impact
          </button>
          <button
            className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            onClick={() => {
              ;(window as any).Telegram.WebApp.HapticFeedback.selectionChanged()
            }}
          >
            Selection Changed
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            onClick={() => {
              ;(window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('success')
            }}
          >
            Success
          </button>
          <button
            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
            onClick={() => {
              ;(window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('warning')
            }}
          >
            Warning
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={() => {
              ;(window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('error')
            }}
          >
            Error
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <h4 className="font-medium mb-2">Theme Info</h4>
        <pre className="text-xs overflow-auto">
          {JSON.stringify((window as any).Telegram.WebApp.themeParams, null, 2)}
        </pre>
      </div>
    </div>
  )
}

const meta: Meta<typeof TelegramControls> = {
  title: 'Telegram/Controls',
  component: TelegramControls,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Test interface for Telegram WebApp controls and haptic feedback. Check browser console for events.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DarkTheme: Story = {
  parameters: {
    backgrounds: {
      default: 'telegram-dark',
    },
  },
}
```

## Development Workflow

### Adding New Component Stories

```bash
# 1. Create component with proper TypeScript types
touch packages/ui/src/components/NewComponent.tsx
touch packages/ui/src/components/NewComponent.stories.tsx

# 2. Run Storybook in development
pnpm storybook

# 3. Test component in isolation
# - Verify all props work
# - Test different states
# - Check responsive design
# - Validate accessibility

# 4. Create comprehensive stories
# - Default story
# - All variant combinations  
# - Interactive examples
# - Edge cases
```

### Storybook Build & Deploy

```bash
# Build static Storybook
pnpm build-storybook

# Deploy to GitHub Pages (example)
pnpm deploy-storybook --ci

# Or serve locally for testing
npx http-server storybook-static
```

## Acceptance Criteria

### Storybook Implementation ✅
- [ ] **Mock Integration**: Telegram WebApp API fully mocked for development
- [ ] **Theme Support**: Light/dark themes working with background switcher
- [ ] **Component Coverage**: All UI components have comprehensive stories
- [ ] **Interactive Examples**: Complex flows like lesson completion demonstrated
- [ ] **Haptic Testing**: All haptic feedback types testable in Storybook
- [ ] **Documentation**: Auto-generated docs with proper descriptions
- [ ] **Accessibility**: A11y addon integrated and testing enabled
- [ ] **Mobile Viewport**: Mobile-first testing with viewport addon
- [ ] **Build Pipeline**: Storybook builds successfully in CI
- [ ] **Live Examples**: "Complete Lesson Flow" story showcases full UX

**Verification Commands:**
```bash
# Start Storybook
pnpm storybook

# Build for production  
pnpm build-storybook

# Test stories
pnpm test-storybook

# Check accessibility
# Visit http://localhost:6006 and enable A11y addon
```

**Done = Comprehensive component library with interactive Telegram WebApp integration demos**