import type { Meta, StoryObj } from '@storybook/react'
import { BottomNavigation } from './BottomNavigation'
import { Home, Search, Heart, User, Bell, Settings, BookOpen, Trophy } from 'lucide-react'
import { 
  EducationIcons, 
  DeveloperIcons, 
  AchievementIcons,
  PlatformIcons 
} from '../icons/AcademyIcons'

const meta = {
  title: 'Navigation/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Bottom Navigation Component

A modern, accessible bottom navigation component designed for iOS Academy and Telegram Mini Apps. Built with Apple Human Interface Guidelines principles and enhanced with Telegram WebApp integration.

## Features

- **Multiple Variants**: Default, filled, minimal, floating, and Telegram-optimized
- **SF Symbols Integration**: Native iOS icon styling with our custom icon set
- **Apple HIG Compliance**: Follows iOS design principles for familiar user experience
- **Telegram WebApp Support**: Auto-detects Telegram environment and adapts styling
- **Haptic Feedback**: Optional haptic feedback for enhanced interaction
- **Responsive Design**: Adapts to different screen sizes and safe areas
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized animations and smooth transitions

## Variants

- **Default**: Standard iOS-style navigation with subtle backgrounds
- **Filled**: Prominent active state with elevated, filled buttons
- **Minimal**: Clean design with minimal visual elements
- **Floating**: Modern floating design with rounded corners and shadows
- **Telegram**: Auto-applied in Telegram WebApp environment with theme integration

## Best Practices

- Use 3-5 navigation items for optimal usability
- Provide both icon and text labels for clarity
- Use consistent iconography throughout your app
- Consider badge notifications for important updates
- Test with different Telegram themes for consistent appearance
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'minimal', 'floating', 'telegram'],
      description: 'Visual style of the navigation'
    },
    size: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
      description: 'Size variant affecting spacing and icon size'
    },
    activeId: {
      control: 'text',
      description: 'ID of the currently active item'
    },
    hapticFeedback: {
      control: 'boolean',
      description: 'Enable haptic feedback for Telegram WebApp'
    },
    animateOnChange: {
      control: 'boolean',
      description: 'Enable animations when active item changes'
    }
  },
  decorators: [
    (Story) => (
      <div className="relative h-[500px] bg-background border border-border rounded-lg overflow-hidden">
        <div className="h-full bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-orange-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-orange-950/20 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-sm mx-auto px-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
              <EducationIcons.GraduationCap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">iOS Academy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional iOS development courses with hands-on projects and real-world experience
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <AchievementIcons.Star className="w-3 h-3" />
              <span>Bottom navigation demo</span>
            </div>
          </div>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BottomNavigation>

export default meta
type Story = StoryObj<typeof meta>

const basicItems = [
  {
    id: 'home',
    label: 'Home',
    icon: <EducationIcons.House className="w-5 h-5" />,
    activeIcon: <EducationIcons.HouseFill className="w-5 h-5" />,
  },
  {
    id: 'search',
    label: 'Search',
    icon: <EducationIcons.MagnifyingGlass className="w-5 h-5" />,
    activeIcon: <EducationIcons.MagnifyingGlass className="w-5 h-5" />,
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: <EducationIcons.Heart className="w-5 h-5" />,
    activeIcon: <EducationIcons.HeartFill className="w-5 h-5" />,
    badge: 3,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <EducationIcons.Person className="w-5 h-5" />,
    activeIcon: <EducationIcons.PersonFill className="w-5 h-5" />,
  },
]

const academyItems = [
  {
    id: 'courses',
    label: 'Courses',
    icon: <EducationIcons.Book className="w-5 h-5" />,
    activeIcon: <EducationIcons.BookFill className="w-5 h-5" />,
  },
  {
    id: 'practice',
    label: 'Practice',
    icon: <DeveloperIcons.Terminal className="w-5 h-5" />,
    activeIcon: <DeveloperIcons.TerminalFill className="w-5 h-5" />,
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: <AchievementIcons.Trophy className="w-5 h-5" />,
    activeIcon: <AchievementIcons.TrophyFill className="w-5 h-5" />,
    badge: 'New',
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: <EducationIcons.ChartBar className="w-5 h-5" />,
    activeIcon: <EducationIcons.ChartBarFill className="w-5 h-5" />,
    badge: 12,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <EducationIcons.Person className="w-5 h-5" />,
    activeIcon: <EducationIcons.PersonFill className="w-5 h-5" />,
  },
]

const itemsWithDisabled = [
  {
    id: 'home',
    label: 'Home',
    icon: <EducationIcons.House className="w-5 h-5" />,
    activeIcon: <EducationIcons.HouseFill className="w-5 h-5" />,
  },
  {
    id: 'search',
    label: 'Search',
    icon: <EducationIcons.MagnifyingGlass className="w-5 h-5" />,
    disabled: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <EducationIcons.Gear className="w-5 h-5" />,
    activeIcon: <EducationIcons.GearFill className="w-5 h-5" />,
  },
]

const iosDevItems = [
  {
    id: 'swift',
    label: 'Swift',
    icon: <PlatformIcons.Swift className="w-5 h-5" />,
    activeIcon: <PlatformIcons.Swift className="w-5 h-5" />,
  },
  {
    id: 'xcode',
    label: 'Xcode',
    icon: <PlatformIcons.Xcode className="w-5 h-5" />,
    activeIcon: <PlatformIcons.Xcode className="w-5 h-5" />,
  },
  {
    id: 'uikit',
    label: 'UIKit',
    icon: <PlatformIcons.UIKit className="w-5 h-5" />,
    activeIcon: <PlatformIcons.UIKit className="w-5 h-5" />,
  },
  {
    id: 'testing',
    label: 'Testing',
    icon: <DeveloperIcons.Bug className="w-5 h-5" />,
    activeIcon: <DeveloperIcons.BugFill className="w-5 h-5" />,
  },
]

export const Default: Story = {
  args: {
    items: basicItems,
    activeId: 'home',
    variant: 'default',
    size: 'comfortable',
    hapticFeedback: true,
    animateOnChange: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default iOS-style navigation with subtle active states and smooth transitions.',
      },
    },
  },
}

export const Filled: Story = {
  args: {
    items: basicItems,
    activeId: 'favorites',
    variant: 'filled',
    size: 'comfortable',
    hapticFeedback: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Filled variant with prominent active states, perfect for primary navigation.',
      },
    },
  },
}

export const Minimal: Story = {
  args: {
    items: basicItems,
    activeId: 'search',
    variant: 'minimal',
    size: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Clean minimal design with subtle indicators, ideal for content-focused apps.',
      },
    },
  },
}

export const Floating: Story = {
  args: {
    items: basicItems,
    activeId: 'home',
    variant: 'floating',
    size: 'comfortable',
    hapticFeedback: true,
    animateOnChange: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modern floating design with rounded corners and shadows, perfect for modern apps.',
      },
    },
  },
}

export const Telegram: Story = {
  args: {
    items: basicItems,
    activeId: 'favorites',
    variant: 'telegram',
    size: 'comfortable',
    hapticFeedback: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Telegram WebApp optimized variant that adapts to Telegram theme colors.',
      },
    },
  },
}

export const WithBadges: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <EducationIcons.House className="w-5 h-5" />,
        activeIcon: <EducationIcons.HouseFill className="w-5 h-5" />,
      },
      {
        id: 'messages',
        label: 'Messages',
        icon: <EducationIcons.Bell className="w-5 h-5" />,
        activeIcon: <EducationIcons.BellFill className="w-5 h-5" />,
        badge: 99,
      },
      {
        id: 'favorites',
        label: 'Favorites',
        icon: <EducationIcons.Heart className="w-5 h-5" />,
        activeIcon: <EducationIcons.HeartFill className="w-5 h-5" />,
        badge: 'New',
      },
      {
        id: 'profile',
        label: 'Profile', 
        icon: <EducationIcons.Person className="w-5 h-5" />,
        activeIcon: <EducationIcons.PersonFill className="w-5 h-5" />,
        badge: 150,
      },
    ],
    activeId: 'home',
    variant: 'default',
    size: 'comfortable',
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with various badge types including numbers and text labels.',
      },
    },
  },
}

export const IOSAcademyApp: Story = {
  args: {
    items: academyItems,
    activeId: 'courses',
    variant: 'filled',
    size: 'comfortable',
    hapticFeedback: true,
    animateOnChange: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'iOS Academy app navigation with educational icons and progress indicators.',
      },
    },
  },
}

export const IOSDeveloperTools: Story = {
  args: {
    items: iosDevItems,
    activeId: 'swift',
    variant: 'floating',
    size: 'comfortable',
    hapticFeedback: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'iOS development tools navigation with platform-specific icons.',
      },
    },
  },
}

export const WithDisabledItems: Story = {
  args: {
    items: itemsWithDisabled,
    activeId: 'home',
    variant: 'default',
  },
}

export const TwoItems: Story = {
  args: {
    items: [
      {
        id: 'learn',
        label: 'Learn',
        icon: <EducationIcons.Book className="w-5 h-5" />,
        activeIcon: <EducationIcons.BookFill className="w-5 h-5" />,
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: <EducationIcons.Person className="w-5 h-5" />,
        activeIcon: <EducationIcons.PersonFill className="w-5 h-5" />,
      },
    ],
    activeId: 'learn',
    variant: 'filled',
    size: 'spacious',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplified two-item navigation, perfect for focused app experiences.',
      },
    },
  },
}

export const CompactSize: Story = {
  args: {
    items: basicItems,
    activeId: 'home',
    variant: 'default',
    size: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact size variant for space-constrained interfaces.',
      },
    },
  },
}

export const SpaciousSize: Story = {
  args: {
    items: basicItems,
    activeId: 'search',
    variant: 'floating',
    size: 'spacious',
    animateOnChange: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Spacious size variant with larger touch targets and generous spacing.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    items: basicItems,
    activeId: 'home',
    variant: 'default',
    size: 'comfortable',
    hapticFeedback: true,
    animateOnChange: true,
    onItemClick: (item) => {
      console.log('Navigation clicked:', item.label)
      // In a real app, this would handle routing
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with click handlers and console logging. Open browser dev tools to see click events.',
      },
    },
  },
}

// Accessibility demo
export const AccessibilityDemo: Story = {
  args: {
    items: [
      {
        id: 'courses',
        label: 'Courses',
        icon: <EducationIcons.Book className="w-5 h-5" />,
        activeIcon: <EducationIcons.BookFill className="w-5 h-5" />,
      },
      {
        id: 'practice',
        label: 'Practice',
        icon: <DeveloperIcons.Code className="w-5 h-5" />,
        activeIcon: <DeveloperIcons.CodeFill className="w-5 h-5" />,
        badge: 5,
      },
      {
        id: 'achievements',
        label: 'Achievements',
        icon: <AchievementIcons.Trophy className="w-5 h-5" />,
        activeIcon: <AchievementIcons.TrophyFill className="w-5 h-5" />,
        disabled: true, // Show disabled state
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: <EducationIcons.Person className="w-5 h-5" />,
        activeIcon: <EducationIcons.PersonFill className="w-5 h-5" />,
      },
    ],
    activeId: 'practice',
    variant: 'default',
    size: 'comfortable',
  },
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features demo: keyboard navigation, screen reader support, disabled states, and proper ARIA attributes. Try navigating with Tab key.',
      },
    },
  },
}

// Performance demo with many items
export const PerformanceDemo: Story = {
  args: {
    items: [
      {
        id: 'swift',
        label: 'Swift',
        icon: <PlatformIcons.Swift className="w-4 h-4" />,
        activeIcon: <PlatformIcons.Swift className="w-4 h-4" />,
      },
      {
        id: 'uikit',
        label: 'UIKit',
        icon: <PlatformIcons.UIKit className="w-4 h-4" />,
        activeIcon: <PlatformIcons.UIKit className="w-4 h-4" />,
      },
      {
        id: 'xcode',
        label: 'Xcode',
        icon: <PlatformIcons.Xcode className="w-4 h-4" />,
        activeIcon: <PlatformIcons.Xcode className="w-4 h-4" />,
      },
      {
        id: 'testing',
        label: 'Testing',
        icon: <DeveloperIcons.Bug className="w-4 h-4" />,
        activeIcon: <DeveloperIcons.BugFill className="w-4 h-4" />,
      },
      {
        id: 'tools',
        label: 'Tools',
        icon: <EducationIcons.Gear className="w-4 h-4" />,
        activeIcon: <EducationIcons.GearFill className="w-4 h-4" />,
      },
    ],
    activeId: 'swift',
    variant: 'minimal',
    size: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance optimized layout with 5 items using compact sizing and minimal animations.',
      },
    },
  },
}