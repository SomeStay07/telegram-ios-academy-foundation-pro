# Accessibility Guide

Comprehensive accessibility implementation for Telegram Mini App following WCAG 2.1 AA standards.

## Overview

This guide ensures the Telegram iOS Academy Foundation Mini App is accessible to all users, including those with disabilities. We implement keyboard navigation, screen reader support, high contrast themes, and semantic HTML patterns.

## Core Accessibility Principles

### 1. Keyboard Navigation

```typescript
// Keyboard navigation for lesson components
export const useKeyboardNavigation = () => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Tab':
          // Native tab handling
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 1, maxIndex));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleActivate();
          break;
        case 'Escape':
          handleEscape();
          break;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex, maxIndex]);
  
  return { focusedIndex, setFocusedIndex };
};
```

### 2. ARIA Labels and Roles

```typescript
// Semantic lesson structure
export const LessonContent = ({ lesson }: LessonContentProps) => {
  return (
    <main role="main" aria-label="Lesson content">
      <nav role="navigation" aria-label="Lesson navigation">
        <ol>
          {lesson.modules.map((module, index) => (
            <li key={module.id}>
              <button
                role="tab"
                aria-selected={currentModule === index}
                aria-controls={`module-${module.id}`}
                id={`tab-${module.id}`}
              >
                {module.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>
      
      <section
        role="tabpanel"
        id={`module-${currentModule.id}`}
        aria-labelledby={`tab-${currentModule.id}`}
        aria-live="polite"
      >
        <h1>{currentModule.title}</h1>
        <div aria-describedby="module-description">
          {currentModule.content}
        </div>
      </section>
    </main>
  );
};
```

### 3. Screen Reader Support

```typescript
// Screen reader announcements
export const useScreenReader = () => {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);
  
  return { announce };
};

// Usage in lesson progression
export const LessonProgressTracker = () => {
  const { announce } = useScreenReader();
  
  const handleLessonComplete = () => {
    announce('Lesson completed successfully. Moving to next module.', 'assertive');
    // Telegram haptic feedback for screen reader users
    window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
  };
  
  return (
    <div role="progressbar" 
         aria-valuenow={progress} 
         aria-valuemin={0} 
         aria-valuemax={100}
         aria-label={`Lesson progress: ${progress}% complete`}>
      <div className="progress-fill" style={{width: `${progress}%`}} />
    </div>
  );
};
```

## Telegram WebApp Accessibility

### 1. BackButton Integration

```typescript
// Accessible back navigation
export const useAccessibleBackButton = () => {
  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    if (!telegram) return;
    
    telegram.BackButton.onClick(() => {
      // Announce navigation change
      const announcement = 'Navigating back to previous lesson';
      document.querySelector('[aria-live="polite"]')?.setAttribute('aria-label', announcement);
      
      // Provide haptic feedback
      telegram.HapticFeedback?.impactOccurred('light');
    });
    
    telegram.BackButton.show();
    
    return () => {
      telegram.BackButton.hide();
    };
  }, []);
};
```

### 2. MainButton Accessibility

```typescript
// Accessible primary actions
export const useAccessibleMainButton = (text: string, action: () => void) => {
  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    if (!telegram) return;
    
    telegram.MainButton.setText(text);
    telegram.MainButton.show();
    
    // Add ARIA label for screen readers
    const mainButtonElement = document.querySelector('[data-telegram-main-button]');
    if (mainButtonElement) {
      mainButtonElement.setAttribute('aria-label', `Primary action: ${text}`);
      mainButtonElement.setAttribute('role', 'button');
    }
    
    telegram.MainButton.onClick(() => {
      telegram.HapticFeedback?.impactOccurred('medium');
      action();
    });
    
    return () => {
      telegram.MainButton.hide();
    };
  }, [text, action]);
};
```

## Theme and Color Accessibility

### 1. High Contrast Support

```css
/* High contrast themes */
@media (prefers-contrast: high) {
  :root {
    --tg-text-color: #000000;
    --tg-bg-color: #ffffff;
    --tg-section-bg-color: #f0f0f0;
    --tg-button-color: #0066cc;
    --tg-button-text-color: #ffffff;
    --tg-secondary-bg-color: #e0e0e0;
  }
  
  .dark-theme {
    --tg-text-color: #ffffff;
    --tg-bg-color: #000000;
    --tg-section-bg-color: #1a1a1a;
    --tg-button-color: #4d9fff;
    --tg-button-text-color: #000000;
    --tg-secondary-bg-color: #333333;
  }
}

/* Focus indicators */
*:focus-visible {
  outline: 2px solid var(--tg-button-color);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### 2. Color Contrast Validation

```typescript
// Color contrast checking utility
export const validateContrast = (foreground: string, background: string): boolean => {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  
  return ratio >= 4.5; // WCAG AA standard
};

// Theme validation hook
export const useAccessibleTheme = () => {
  const telegram = window.Telegram?.WebApp;
  
  useEffect(() => {
    if (!telegram) return;
    
    const theme = telegram.themeParams;
    const isValid = validateContrast(
      theme.text_color || '#000000',
      theme.bg_color || '#ffffff'
    );
    
    if (!isValid) {
      console.warn('Theme colors do not meet WCAG AA contrast requirements');
      // Fallback to high contrast theme
      document.body.classList.add('high-contrast-fallback');
    }
  }, [telegram]);
};
```

## Form Accessibility

### 1. Accessible Quiz Components

```typescript
// Accessible quiz question
export const QuizQuestion = ({ question, options, onAnswer }: QuizProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [announced, setAnnounced] = useState(false);
  const { announce } = useScreenReader();
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    if (!announced) {
      announce(`Selected option: ${options.find(o => o.id === optionId)?.text}`);
      setAnnounced(true);
    }
  };
  
  return (
    <fieldset>
      <legend>{question.text}</legend>
      <div role="radiogroup" aria-required="true" aria-describedby="quiz-instructions">
        {options.map((option, index) => (
          <label key={option.id} className="quiz-option">
            <input
              type="radio"
              name="quiz-answer"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionSelect(option.id)}
              aria-describedby={`option-${index}-description`}
            />
            <span className="option-text">{option.text}</span>
            {option.explanation && (
              <span id={`option-${index}-description`} className="sr-only">
                {option.explanation}
              </span>
            )}
          </label>
        ))}
      </div>
      <div id="quiz-instructions" className="sr-only">
        Use arrow keys to navigate between options, space to select
      </div>
    </fieldset>
  );
};
```

### 2. Error Handling and Validation

```typescript
// Accessible form validation
export const useAccessibleValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { announce } = useScreenReader();
  
  const validateField = (fieldName: string, value: string, rules: ValidationRule[]) => {
    const fieldErrors: string[] = [];
    
    rules.forEach(rule => {
      if (!rule.validator(value)) {
        fieldErrors.push(rule.message);
      }
    });
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: fieldErrors.join(', ')
    }));
    
    // Announce validation errors
    if (fieldErrors.length > 0) {
      announce(`Error in ${fieldName}: ${fieldErrors.join(', ')}`, 'assertive');
    }
    
    return fieldErrors.length === 0;
  };
  
  return { errors, validateField };
};
```

## Internationalization Accessibility

### 1. RTL Support

```css
/* RTL language support */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="rtl"] .lesson-content {
  transform: scaleX(-1);
}

[dir="rtl"] .lesson-content * {
  transform: scaleX(-1);
}

/* Language-specific font stacks */
:root {
  --font-family-latin: system-ui, -apple-system, sans-serif;
  --font-family-cyrillic: system-ui, -apple-system, sans-serif;
  --font-family-arabic: Tahoma, Arial, sans-serif;
}

[lang="ar"] {
  font-family: var(--font-family-arabic);
}

[lang="ru"] {
  font-family: var(--font-family-cyrillic);
}
```

### 2. Language Announcements

```typescript
// Language-aware screen reader announcements
export const useLocalizedAnnouncements = () => {
  const { i18n } = useTranslation();
  const { announce } = useScreenReader();
  
  const announceLocalized = useCallback((key: string, options?: any) => {
    const message = i18n.t(key, options);
    announce(message);
    
    // Set document language for screen readers
    document.documentElement.lang = i18n.language;
  }, [i18n, announce]);
  
  return { announceLocalized };
};
```

## Testing Accessibility

### 1. Automated Testing

```typescript
// Jest + @testing-library accessibility tests
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('LessonRenderer Accessibility', () => {
  test('has no accessibility violations', async () => {
    const { container } = render(
      <LessonRenderer lesson={mockLesson} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('supports keyboard navigation', async () => {
    render(<LessonRenderer lesson={mockLesson} />);
    
    const firstTab = screen.getByRole('tab', { name: /module 1/i });
    firstTab.focus();
    
    fireEvent.keyDown(firstTab, { key: 'ArrowDown' });
    
    const secondTab = screen.getByRole('tab', { name: /module 2/i });
    expect(secondTab).toHaveFocus();
  });
  
  test('announces state changes to screen readers', async () => {
    const mockAnnounce = jest.fn();
    jest.spyOn(require('../hooks/useScreenReader'), 'useScreenReader')
      .mockReturnValue({ announce: mockAnnounce });
    
    render(<LessonRenderer lesson={mockLesson} />);
    
    const completeButton = screen.getByRole('button', { name: /complete lesson/i });
    fireEvent.click(completeButton);
    
    expect(mockAnnounce).toHaveBeenCalledWith(
      'Lesson completed successfully. Moving to next module.',
      'assertive'
    );
  });
});
```

### 2. Manual Testing Checklist

```markdown
## Accessibility Testing Checklist

### Keyboard Navigation
- [ ] All interactive elements accessible via Tab
- [ ] Arrow keys work for grouped elements (radio buttons, tabs)
- [ ] Enter/Space activate buttons and links
- [ ] Escape closes modals and cancels actions
- [ ] Focus indicators visible and clear
- [ ] Focus order logical and predictable

### Screen Reader Testing
- [ ] VoiceOver (iOS/macOS) reads content correctly
- [ ] Content structure conveyed properly
- [ ] Form labels and instructions clear
- [ ] Error messages announced
- [ ] State changes announced
- [ ] Progress updates communicated

### Visual Testing
- [ ] Text readable at 200% zoom
- [ ] High contrast mode supported
- [ ] Color not sole indicator of meaning
- [ ] Minimum 4.5:1 contrast ratio maintained
- [ ] Focus indicators visible in all themes

### Motor Accessibility
- [ ] Touch targets minimum 44x44px
- [ ] Drag and drop has keyboard alternative
- [ ] No time-based interactions (auto-advancing content)
- [ ] Actions reversible or confirmable

### Cognitive Accessibility
- [ ] Clear, simple language
- [ ] Consistent navigation patterns
- [ ] Error prevention and clear recovery
- [ ] Help and instructions available
- [ ] Content structure logical and predictable
```

## Implementation Guidelines

### 1. Component Development

```typescript
// Accessible component template
export const AccessibleComponent = ({ 
  children, 
  ariaLabel, 
  role = 'button',
  ...props 
}: AccessibleComponentProps) => {
  const [focused, setFocused] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      props.onClick?.(e as any);
    }
  };
  
  return (
    <div
      ref={elementRef}
      role={role}
      aria-label={ariaLabel}
      tabIndex={0}
      className={`accessible-component ${focused ? 'focused' : ''}`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
};
```

### 2. Accessibility Hooks

```typescript
// Central accessibility context
export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [screenReaderMode, setScreenReaderMode] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    // Detect accessibility preferences
    setScreenReaderMode(window.navigator.userAgent.includes('VoiceOver'));
    setHighContrastMode(window.matchMedia('(prefers-contrast: high)').matches);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  
  const value = {
    screenReaderMode,
    highContrastMode,
    reducedMotion,
    announceToScreenReader: useScreenReader().announce
  };
  
  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Telegram WebApp Accessibility Best Practices](https://core.telegram.org/bots/webapps#accessibility)
- [React Accessibility Documentation](https://reactjs.org/docs/accessibility.html)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)