# UX Guide: Learning Experience Patterns

## Lesson Flow Pattern

### Complete Learning Sequence
```
Hook → Objectives → Recall → Concept → WorkedExample(fading) → 
Formative Quiz → Checkpoint → Summary → Spaced Review → Transfer Task
```

### Implementation Example
```tsx
// apps/miniapp/src/components/LessonFlow.tsx
import { ModuleRenderer } from '@telegram-ios-academy/ui';
import { useTelegramMainButton, useTelegramHaptics } from '../hooks/telegram';

function LessonFlow({ lesson }: { lesson: Lesson }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const haptics = useTelegramHaptics();

  const modules = lesson.modules;
  const currentModule = modules[currentStep];
  const isLastModule = currentStep === modules.length - 1;

  useTelegramMainButton(
    currentModule?.kind === 'quiz' || currentModule?.kind === 'checkpoint'
      ? null // Quiz handles own submission
      : {
          text: isLastModule ? 'Завершить урок' : 'Продолжить',
          show: true,
          onClick: () => {
            haptics.impactOccurred('light');
            setCurrentStep(prev => prev + 1);
          },
        }
  );

  const handleModuleComplete = (moduleId: string, success: boolean) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
    
    if (success) {
      haptics.notificationOccurred('success');
    }

    // Auto-advance after quiz/checkpoint
    if (currentModule.kind === 'quiz' || currentModule.kind === 'checkpoint') {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500); // Show result for 1.5s
    }
  };

  return (
    <div className="lesson-flow">
      {/* Progress indicator */}
      <div className="flex items-center justify-between p-4 bg-telegram-secondary">
        <span className="text-sm text-telegram-subtitle">
          Шаг {currentStep + 1} из {modules.length}
        </span>
        <div className="flex space-x-2">
          {modules.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index < currentStep ? 'bg-green-500' :
                index === currentStep ? 'bg-telegram-accent' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current module */}
      <div className="p-4 animate-slide-up">
        <ModuleRenderer
          module={currentModule}
          onComplete={(success) => handleModuleComplete(currentModule.id, success)}
        />
      </div>
    </div>
  );
}
```

## Microinteractions & Animation Guidelines

### Animation Timing Standards
- **Instant feedback**: 0ms (touch response)
- **Quick transitions**: 150ms (page changes, button states)
- **Content animations**: 300ms (modals, drawers)
- **Loading states**: 500ms minimum (prevent flashing)

### Implementation
```css
/* packages/ui/src/styles/animations.css */
.animate-slide-up {
  animation: slideUp 150ms ease-out;
}

.animate-fade-in {
  animation: fadeIn 300ms ease-in-out;
}

.animate-bounce-in {
  animation: bounceIn 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes slideUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounceIn {
  from {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

### Haptic Feedback Matrix
```tsx
// Event → Haptic Pattern
const HAPTIC_EVENTS = {
  // Selection & Navigation
  'quiz-option-select': () => haptics.selectionChanged(),
  'tab-switch': () => haptics.selectionChanged(),
  'page-navigation': () => haptics.impactOccurred('light'),
  
  // Progress & Success
  'step-complete': () => haptics.impactOccurred('medium'),
  'lesson-complete': () => {
    haptics.impactOccurred('heavy');
    setTimeout(() => haptics.notificationOccurred('success'), 100);
  },
  'checkpoint-passed': () => haptics.notificationOccurred('success'),
  
  // Errors & Warnings
  'quiz-incorrect': () => haptics.notificationOccurred('error'),
  'form-validation-error': () => haptics.notificationOccurred('warning'),
  'network-error': () => haptics.notificationOccurred('error'),
  
  // Interactions
  'button-press': () => haptics.impactOccurred('light'),
  'swipe-action': () => haptics.selectionChanged(),
  'long-press': () => haptics.impactOccurred('medium'),
};
```

### Confirmation Patterns
```tsx
// Critical action confirmation
function DeleteProgressDialog({ onConfirm, onCancel }) {
  const haptics = useTelegramHaptics();
  
  const handleConfirm = () => {
    haptics.notificationOccurred('warning');
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full animate-bounce-in">
        <h3 className="text-lg font-semibold mb-4">Удалить прогресс?</h3>
        <p className="text-gray-600 mb-6">
          Это действие нельзя отменить. Весь прогресс по курсу будет потерян.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          >
            Отмена
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Telegram WebApp Container Constraints

### Viewport & Layout
```css
/* Telegram WebApp specific styles */
.telegram-webapp-container {
  /* Telegram provides fixed viewport */
  height: 100vh;
  height: -webkit-fill-available; /* iOS Safari fix */
  
  /* No horizontal scroll */
  overflow-x: hidden;
  
  /* Safe areas for mobile */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

/* MainButton area - reserve space */
.main-content {
  padding-bottom: 80px; /* Reserve space for MainButton */
}

/* BackButton consideration - add top margin if needed */
.page-header {
  margin-top: 10px; /* Space for BackButton visual harmony */
}
```

### Color Scheme Adaptation
```tsx
// Automatic theme detection and adaptation
function useThemeColors() {
  const [colors, setColors] = useState({
    background: '#ffffff',
    text: '#000000',
    accent: '#2481cc',
  });

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.themeParams) {
      setColors({
        background: tg.themeParams.bg_color || '#ffffff',
        text: tg.themeParams.text_color || '#000000',
        accent: tg.themeParams.accent_text_color || '#2481cc',
      });
    }

    // Listen for theme changes (dark/light mode switch)
    const handleThemeChange = () => {
      if (tg?.themeParams) {
        setColors({
          background: tg.themeParams.bg_color || '#ffffff',
          text: tg.themeParams.text_color || '#000000',
          accent: tg.themeParams.accent_text_color || '#2481cc',
        });
      }
    };

    tg?.onEvent('themeChanged', handleThemeChange);
    return () => tg?.offEvent('themeChanged', handleThemeChange);
  }, []);

  return colors;
}
```

### Keyboard Accessibility
```tsx
// No physical keyboard in mobile - optimize for touch
function AccessibleQuiz({ questions }) {
  return (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <div key={q.id} className="space-y-3">
          <h3 className="text-lg font-medium">{q.question}</h3>
          <div className="grid gap-2">
            {q.options.map((option, optIndex) => (
              <button
                key={optIndex}
                className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 active:bg-gray-100 
                          min-h-[48px] /* WCAG touch target size */
                          transition-colors duration-150"
                onClick={() => selectAnswer(q.id, optIndex)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Content Guidelines

### Text Optimization
- **Paragraphs**: Max 3 sentences, 150 characters
- **Code blocks**: Max 10 lines visible, scroll for more
- **Quiz questions**: Max 100 characters
- **Module titles**: Max 50 characters

### Content Structure
```tsx
// Optimal content chunking
function ConceptModule({ concept }) {
  return (
    <div className="concept-module space-y-4">
      {/* Title - clear and concise */}
      <h2 className="text-xl font-semibold text-telegram-primary">
        {concept.title}
      </h2>
      
      {/* Key point - one main idea */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="font-medium text-blue-900">
          {concept.keyPoint}
        </p>
      </div>
      
      {/* Explanation - digestible chunks */}
      <div className="space-y-3">
        {concept.explanation.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-telegram-primary leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      
      {/* Code example - syntax highlighted */}
      {concept.codeExample && (
        <CodeBlock
          code={concept.codeExample}
          language="swift"
          maxLines={8}
        />
      )}
    </div>
  );
}
```

### Loading States & Skeletons
```tsx
// Prevent layout shift with skeleton screens
function LessonSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  );
}

function useOptimisticLoading<T>(asyncFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const result = await asyncFn();
      setData(result);
    } finally {
      // Minimum loading time to prevent flashing
      setTimeout(() => setLoading(false), 500);
    }
  }, [asyncFn]);

  return { data, loading, execute };
}
```

## Design System Component Examples

### Module Type Styling
```tsx
// Visual hierarchy for different module types
const MODULE_STYLES = {
  hook: {
    className: 'bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg',
    icon: '🎯',
    label: 'Мотивация',
  },
  concept: {
    className: 'bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg',
    icon: '💡',
    label: 'Концепция',
  },
  workedExample: {
    className: 'bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg',
    icon: '👨‍💻',
    label: 'Пример',
  },
  quiz: {
    className: 'bg-purple-50 border border-purple-200 p-4 rounded-lg',
    icon: '❓',
    label: 'Вопрос',
  },
  checkpoint: {
    className: 'bg-orange-50 border border-orange-200 p-4 rounded-lg',
    icon: '🏁',
    label: 'Контрольная точка',
  },
  callout: {
    warning: 'bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg',
    error: 'bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg',
    info: 'bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg',
    success: 'bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg',
  },
};

function ModuleCard({ module, children }) {
  const style = MODULE_STYLES[module.kind];
  const isCallout = module.kind === 'callout';
  
  return (
    <div className={isCallout ? style[module.tone] : style.className}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{style.icon}</span>
        <div>
          <span className="text-xs uppercase tracking-wide text-gray-500 font-medium">
            {style.label}
          </span>
          {module.title && (
            <h3 className="text-lg font-semibold text-telegram-primary">
              {module.title}
            </h3>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
```

### Progressive Enhancement
```tsx
// Enhance experience based on platform capabilities
function EnhancedLessonExperience({ lesson }) {
  const platform = useTelegramPlatform();
  const haptics = useTelegramHaptics();
  
  return (
    <div className={`lesson-container ${platform.isMobile ? 'mobile' : 'web'}`}>
      {/* Enhanced for mobile with haptics */}
      {platform.hasHaptics && (
        <ProgressIndicator 
          onStepComplete={() => haptics.impactOccurred('medium')}
        />
      )}
      
      {/* Fallback for web */}
      {!platform.hasHaptics && (
        <ProgressIndicator 
          onStepComplete={() => console.log('Step completed')}
        />
      )}
    </div>
  );
}
```

## References

- [Material Design Motion](https://m3.material.io/styles/motion/overview) - Animation principles and timing
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/patterns/feedback) - Haptic feedback patterns
- [WCAG 2.2 Success Criteria](https://www.w3.org/WAI/WCAG22/Understanding/) - Accessibility requirements  
- [Telegram Design Guidelines](https://core.telegram.org/bots/webapps#design-guidelines) - Platform-specific UI patterns

## Acceptance Criteria

### UX Implementation ✅
- [ ] **Lesson Flow**: Complete hook→concept→quiz→checkpoint sequence
- [ ] **Microinteractions**: All animations ≤150ms, appropriate haptics
- [ ] **Loading States**: Skeleton screens, 500ms minimum loading time
- [ ] **Confirmations**: Critical actions require explicit confirmation
- [ ] **Progressive Enhancement**: Graceful degradation for web vs mobile
- [ ] **Content Guidelines**: Text within character limits, proper chunking
- [ ] **Theme Integration**: All components adapt to Telegram theme
- [ ] **Touch Targets**: Minimum 48px height for interactive elements
- [ ] **Keyboard Navigation**: Tab order logical, focus visible
- [ ] **Error Handling**: Clear error messages with recovery actions

**Verification Process:**
1. Complete full lesson flow on mobile and web
2. Test all interactive elements for haptic feedback
3. Verify loading states appear consistently
4. Check theme switching (light/dark mode)
5. Test with screen reader for accessibility
6. Measure animation timing with DevTools
7. Verify touch targets meet 48px minimum

**Done = Smooth, delightful learning experience matching native app quality**