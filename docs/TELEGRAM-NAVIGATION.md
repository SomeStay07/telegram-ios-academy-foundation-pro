# Telegram WebApp Navigation Integration

## BackButton Implementation

### Router History Integration

```typescript
// apps/miniapp/src/hooks/useTelegramBackButton.ts
import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';

export function useTelegramBackButton() {
  const router = useRouter();

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    // BackButton visibility based on history depth
    const updateBackButton = () => {
      const historyIndex = window.history.length;
      const canGoBack = historyIndex > 1;

      if (canGoBack) {
        tg.BackButton.show();
      } else {
        tg.BackButton.hide();
      }
    };

    // Handle back button clicks
    const handleBackButton = () => {
      router.history.back();
    };

    // Set up event listeners
    tg.BackButton.onClick(handleBackButton);
    
    // Update on navigation changes
    const unsubscribe = router.subscribe('routeChange', updateBackButton);
    
    // Initial setup
    updateBackButton();

    return () => {
      tg.BackButton.offClick(handleBackButton);
      unsubscribe();
    };
  }, [router]);
}
```

### App Integration

```tsx
// apps/miniapp/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useTelegramBackButton } from './hooks/useTelegramBackButton';

const router = createRouter({ routeTree });

function App() {
  useTelegramBackButton();
  
  return <RouterProvider router={router} />;
}

// Initialize Telegram WebApp
function initTelegram() {
  const tg = window.Telegram?.WebApp;
  if (!tg) {
    console.warn('Telegram WebApp not available - running in browser mode');
    return;
  }

  // Ready the app
  tg.ready();
  tg.expand();

  // Apply theme
  document.documentElement.style.setProperty('--tg-bg-color', tg.themeParams.bg_color || '#ffffff');
  document.documentElement.style.setProperty('--tg-text-color', tg.themeParams.text_color || '#000000');
}

initTelegram();
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

## MainButton Implementation

### Dynamic MainButton Hook

```typescript
// apps/miniapp/src/hooks/useTelegramMainButton.ts
import { useEffect, useCallback } from 'react';

interface MainButtonConfig {
  text: string;
  show?: boolean;
  enabled?: boolean;
  progress?: boolean;
  onClick?: () => void;
}

export function useTelegramMainButton(config: MainButtonConfig | null) {
  const { text, show = false, enabled = true, progress = false, onClick } = config || {};

  const handleClick = useCallback(() => {
    onClick?.();
  }, [onClick]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    if (config && show) {
      // Configure button
      tg.MainButton.setText(text);
      
      if (enabled && !progress) {
        tg.MainButton.enable();
      } else {
        tg.MainButton.disable();
      }
      
      if (progress) {
        tg.MainButton.showProgress();
      } else {
        tg.MainButton.hideProgress();
      }

      // Show and set up click handler
      tg.MainButton.show();
      tg.MainButton.onClick(handleClick);
    } else {
      // Hide button
      tg.MainButton.hide();
      tg.MainButton.offClick(handleClick);
    }

    return () => {
      tg.MainButton.offClick(handleClick);
    };
  }, [text, show, enabled, progress, handleClick, config]);
}
```

### Usage Examples

```tsx
// Lesson completion button
function LessonPage({ lessonId }: { lessonId: string }) {
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Complete lesson button
  useTelegramMainButton(
    isComplete
      ? {
          text: 'Продолжить обучение',
          show: true,
          onClick: () => router.navigate({ to: '/lessons' }),
        }
      : {
          text: 'Завершить урок',
          show: true,
          enabled: !isSubmitting,
          progress: isSubmitting,
          onClick: async () => {
            setIsSubmitting(true);
            await completeLesson(lessonId);
            setIsComplete(true);
            setIsSubmitting(false);
          },
        }
  );

  return (
    <div className="lesson-content">
      {/* Lesson modules render here */}
    </div>
  );
}

// Quiz submission button
function QuizComponent({ quiz }: { quiz: Quiz }) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useTelegramMainButton({
    text: isSubmitted ? 'Результат получен' : 'Отправить ответы',
    show: true,
    enabled: selectedAnswers.length === quiz.questions.length && !isSubmitted,
    onClick: async () => {
      await submitQuiz(quiz.id, selectedAnswers);
      setIsSubmitted(true);
    },
  });

  return <div>{/* Quiz UI */}</div>;
}
```

## HapticFeedback Integration

### Haptics Hook

```typescript
// apps/miniapp/src/hooks/useTelegramHaptics.ts
import { useCallback } from 'react';

type ImpactStyle = 'light' | 'medium' | 'heavy';
type NotificationType = 'error' | 'success' | 'warning';

export function useTelegramHaptics() {
  const impactOccurred = useCallback((style: ImpactStyle) => {
    const tg = window.Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred(style);
    }
  }, []);

  const notificationOccurred = useCallback((type: NotificationType) => {
    const tg = window.Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.notificationOccurred(type);
    }
  }, []);

  const selectionChanged = useCallback(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.HapticFeedback) {
      tg.HapticFeedback.selectionChanged();
    }
  }, []);

  return {
    impactOccurred,
    notificationOccurred,
    selectionChanged,
  };
}
```

### Haptics Event Matrix

```tsx
// apps/miniapp/src/components/InteractiveComponents.tsx
import React from 'react';
import { useTelegramHaptics } from '../hooks/useTelegramHaptics';

// Quiz answer selection
function QuizOption({ option, isSelected, isCorrect, onSelect }) {
  const haptics = useTelegramHaptics();

  const handleSelect = () => {
    haptics.selectionChanged(); // Light feedback for selection
    onSelect();
  };

  const handleResult = (correct: boolean) => {
    if (correct) {
      haptics.notificationOccurred('success'); // Success vibration
    } else {
      haptics.notificationOccurred('error'); // Error vibration
    }
  };

  return (
    <button 
      onClick={handleSelect}
      className={`quiz-option ${isSelected ? 'selected' : ''}`}
    >
      {option.text}
    </button>
  );
}

// Progress step completion
function ProgressStep({ isComplete, onClick }) {
  const haptics = useTelegramHaptics();

  const handleClick = () => {
    haptics.impactOccurred('medium'); // Medium impact for progress
    onClick();
  };

  return (
    <div 
      onClick={handleClick}
      className={`progress-step ${isComplete ? 'complete' : ''}`}
    >
      {isComplete && '✓'}
    </div>
  );
}

// Lesson completion
function LessonComplete() {
  const haptics = useTelegramHaptics();

  useEffect(() => {
    // Heavy celebration haptic on lesson completion
    haptics.impactOccurred('heavy');
    haptics.notificationOccurred('success');
  }, []);

  return <div>🎉 Урок завершен!</div>;
}

// Error states
function ErrorMessage({ message }) {
  const haptics = useTelegramHaptics();

  useEffect(() => {
    haptics.notificationOccurred('error');
  }, [message]);

  return <div className="error">{message}</div>;
}
```

## Deep Links & Start Parameters

### URL Structure & Routing

```typescript
// apps/miniapp/src/router/deeplinks.ts
export interface DeepLinkParams {
  action: 'lesson' | 'course' | 'review' | 'interview';
  id: string;
  context?: string;
}

export function parseStartParam(startParam: string | undefined): DeepLinkParams | null {
  if (!startParam) return null;

  // Format: action_id_context
  // Examples:
  // - lesson_swift-variables
  // - course_ios-fundamentals
  // - review_swift-variables_D7
  // - interview_ios-core_mock

  const parts = startParam.split('_');
  if (parts.length < 2) return null;

  const [action, id, context] = parts;

  if (!['lesson', 'course', 'review', 'interview'].includes(action)) {
    return null;
  }

  return {
    action: action as DeepLinkParams['action'],
    id,
    context,
  };
}

export function createStartParam(params: DeepLinkParams): string {
  const { action, id, context } = params;
  return context ? `${action}_${id}_${context}` : `${action}_${id}`;
}
```

### Router Integration

```tsx
// apps/miniapp/src/main.tsx - updated with deep link routing
function initTelegramRouting() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;

  // Parse start parameter for deep linking
  const startParam = tg.initDataUnsafe?.start_param;
  const deepLink = parseStartParam(startParam);

  if (deepLink) {
    // Route based on deep link
    switch (deepLink.action) {
      case 'lesson':
        router.navigate({ to: `/lesson/${deepLink.id}` });
        break;
      case 'course':
        router.navigate({ to: `/course/${deepLink.id}` });
        break;
      case 'review':
        router.navigate({ 
          to: `/lesson/${deepLink.id}`,
          search: { mode: 'review', schedule: deepLink.context }
        });
        break;
      case 'interview':
        router.navigate({ 
          to: `/interview/${deepLink.id}`,
          search: { mode: deepLink.context || 'practice' }
        });
        break;
    }
  }
}
```

### Bot Deep Link Generation

```typescript
// apps/bot/src/deeplinks.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeepLinksService {
  private readonly webAppUrl = process.env.WEBAPP_URL || 'https://your-app.railway.app';

  createLessonLink(lessonId: string): string {
    const startParam = createStartParam({ action: 'lesson', id: lessonId });
    return `https://t.me/${process.env.BOT_USERNAME}?startapp=${startParam}`;
  }

  createReviewLink(lessonId: string, schedule: 'D1' | 'D7' | 'D30'): string {
    const startParam = createStartParam({ 
      action: 'review', 
      id: lessonId, 
      context: schedule 
    });
    return `https://t.me/${process.env.BOT_USERNAME}?startapp=${startParam}`;
  }

  createCourseLink(courseId: string): string {
    const startParam = createStartParam({ action: 'course', id: courseId });
    return `https://t.me/${process.env.BOT_USERNAME}?startapp=${startParam}`;
  }

  createInterviewLink(interviewId: string, mode: 'practice' | 'mock' | 'drill' = 'practice'): string {
    const startParam = createStartParam({ 
      action: 'interview', 
      id: interviewId, 
      context: mode 
    });
    return `https://t.me/${process.env.BOT_USERNAME}?startapp=${startParam}`;
  }
}
```

### Bot Usage Examples

```typescript
// apps/bot/src/bot.service.ts - grammY implementation
import { Bot, InlineKeyboard } from 'grammy';

@Injectable()
export class BotService {
  constructor(private deepLinks: DeepLinksService) {}

  async sendLessonReminder(userId: string, lessonId: string, schedule: 'D1' | 'D7' | 'D30') {
    const keyboard = new InlineKeyboard()
      .webApp('📖 Повторить урок', this.deepLinks.createReviewLink(lessonId, schedule))
      .row()
      .webApp('📚 Все уроки', this.deepLinks.createCourseLink('ios-fundamentals'));

    await this.bot.api.sendMessage(userId, 
      `🔔 Время повторить урок "${lessonTitle}"!\n\nПовторение через ${schedule} поможет закрепить материал.`,
      { reply_markup: keyboard }
    );
  }

  async sendInterviewInvite(userId: string, interviewId: string) {
    const keyboard = new InlineKeyboard()
      .webApp('🎯 Тренировка', this.deepLinks.createInterviewLink(interviewId, 'drill'))
      .webApp('📝 Мок интервью', this.deepLinks.createInterviewLink(interviewId, 'mock'))
      .row()
      .webApp('📖 Изучить теорию', this.deepLinks.createInterviewLink(interviewId, 'practice'));

    await this.bot.api.sendMessage(userId,
      `🚀 Готов к техническому интервью?\n\nВыбери режим подготовки:`,
      { reply_markup: keyboard }
    );
  }
}
```

## ThemeParams CSS Integration

### CSS Variables Mapping

```css
/* packages/ui/src/styles/telegram-theme.css */
:root {
  /* Telegram theme to CSS custom properties */
  --tg-bg: var(--tg-theme-bg-color, #ffffff);
  --tg-text: var(--tg-theme-text-color, #000000);
  --tg-hint: var(--tg-theme-hint-color, #999999);
  --tg-link: var(--tg-theme-link-color, #2481cc);
  --tg-button: var(--tg-theme-button-color, #2481cc);
  --tg-button-text: var(--tg-theme-button-text-color, #ffffff);
  --tg-secondary-bg: var(--tg-theme-secondary-bg-color, #f4f4f4);
  --tg-header-bg: var(--tg-theme-header-bg-color, #2481cc);
  --tg-accent: var(--tg-theme-accent-text-color, #2481cc);
  --tg-section-bg: var(--tg-theme-section-bg-color, #ffffff);
  --tg-section-header-text: var(--tg-theme-section-header-text-color, #2481cc);
  --tg-subtitle: var(--tg-theme-subtitle-text-color, #999999);
  --tg-destructive: var(--tg-theme-destructive-text-color, #cc2929);
}
```

### Theme Injection Script

```typescript
// apps/miniapp/src/utils/telegram-theme.ts
export function applyTelegramTheme() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;

  const params = tg.themeParams;
  const root = document.documentElement;

  // Map Telegram theme parameters to CSS variables
  const mapping = {
    '--tg-theme-bg-color': params.bg_color,
    '--tg-theme-text-color': params.text_color,
    '--tg-theme-hint-color': params.hint_color,
    '--tg-theme-link-color': params.link_color,
    '--tg-theme-button-color': params.button_color,
    '--tg-theme-button-text-color': params.button_text_color,
    '--tg-theme-secondary-bg-color': params.secondary_bg_color,
    '--tg-theme-header-bg-color': params.header_bg_color,
    '--tg-theme-accent-text-color': params.accent_text_color,
    '--tg-theme-section-bg-color': params.section_bg_color,
    '--tg-theme-section-header-text-color': params.section_header_text_color,
    '--tg-theme-subtitle-text-color': params.subtitle_text_color,
    '--tg-theme-destructive-text-color': params.destructive_text_color,
  };

  Object.entries(mapping).forEach(([property, value]) => {
    if (value) {
      root.style.setProperty(property, value);
    }
  });

  // Set color scheme for system components
  if (params.bg_color) {
    const bgColor = params.bg_color;
    const isDark = parseInt(bgColor.replace('#', ''), 16) < 0x808080;
    root.style.colorScheme = isDark ? 'dark' : 'light';
  }
}
```

### Component Usage

```tsx
// Use Telegram theme variables in components
function LessonCard({ lesson }) {
  return (
    <div 
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: 'var(--tg-section-bg)',
        borderColor: 'var(--tg-secondary-bg)',
        color: 'var(--tg-text)',
      }}
    >
      <h3 style={{ color: 'var(--tg-section-header-text)' }}>
        {lesson.title}
      </h3>
      <p style={{ color: 'var(--tg-subtitle)' }}>
        {lesson.description}
      </p>
      <button 
        style={{
          backgroundColor: 'var(--tg-button)',
          color: 'var(--tg-button-text)',
        }}
        className="px-4 py-2 rounded"
      >
        Начать урок
      </button>
    </div>
  );
}
```

## Platform Differences

### Web vs Mobile App Detection

```typescript
// apps/miniapp/src/utils/platform-detection.ts
export function getPlatform() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return 'browser';

  // Check platform from user agent or Telegram data
  const platform = tg.platform || 'unknown';
  const isWebVersion = window.location.hostname === 'web.telegram.org';
  
  return {
    platform,
    isWeb: isWebVersion,
    isIOS: platform === 'ios',
    isAndroid: platform === 'android',
    isMobile: platform === 'ios' || platform === 'android',
    hasHaptics: tg.HapticFeedback !== undefined,
    version: tg.version,
  };
}

export function adaptForPlatform() {
  const info = getPlatform();
  
  if (info.isWeb) {
    // Web version - limited features
    console.info('Running in Telegram Web');
    document.body.classList.add('platform-web');
  } else if (info.isIOS) {
    // iOS app - full features
    document.body.classList.add('platform-ios');
  } else if (info.isAndroid) {
    // Android app - full features
    document.body.classList.add('platform-android');
  }
  
  return info;
}
```

### Feature Availability Matrix

| Feature | Web | iOS | Android |
|---------|-----|-----|---------|
| BackButton | ✅ | ✅ | ✅ |
| MainButton | ✅ | ✅ | ✅ |
| HapticFeedback | ❌ | ✅ | ✅ |
| CloudStorage | ✅ | ✅ | ✅ |
| BiometricAuth | ❌ | ✅ | ✅ |
| LocationSharing | ❌ | ✅ | ✅ |

## References

- [Telegram WebApp API](https://core.telegram.org/bots/webapps) - Official WebApp interface documentation
- [Telegram Bot API](https://core.telegram.org/bots/api#inline-keyboard-markup) - Bot inline keyboards and deep links
- [WebApp Examples](https://github.com/telegram-web-apps) - Official examples repository
- [Telegram Mini Apps Guidelines](https://core.telegram.org/bots/webapps#design-guidelines) - Design and UX guidelines

## Acceptance Criteria

### Navigation Integration ✅
- [ ] **BackButton**: Shows/hides based on router history depth
- [ ] **BackButton**: Navigates back in router history on click  
- [ ] **MainButton**: Updates text and state per route
- [ ] **MainButton**: Handles async actions with progress state
- [ ] **Deep Links**: All start parameters route correctly
- [ ] **Haptics**: Appropriate feedback for user actions
- [ ] **Theme**: Telegram colors applied to all components
- [ ] **Platform**: Graceful degradation for web vs mobile
- [ ] **Responsive**: Works in both portrait and landscape
- [ ] **Performance**: Navigation feels instant (<100ms)

**Verification Commands:**
```bash
# Test deep links
https://t.me/your_bot?startapp=lesson_swift-variables
https://t.me/your_bot?startapp=course_ios-fundamentals  
https://t.me/your_bot?startapp=review_swift-variables_D7

# Test in Telegram
1. Open link in Telegram
2. Navigate through app
3. Verify BackButton shows/hides correctly
4. Verify MainButton updates per screen
5. Test haptic feedback on iOS/Android
```

**Done = Seamless navigation experience matching native Telegram apps**