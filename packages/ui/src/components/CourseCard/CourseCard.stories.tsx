import type { Meta, StoryObj } from '@storybook/react';
import { CourseCard } from './CourseCard';
import { EducationIcons, AchievementIcons, DeveloperIcons, AnalyticsIcons } from '../../icons/AcademyIcons';

const meta: Meta<typeof CourseCard> = {
  title: 'Educational/CourseCard',
  component: CourseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Course Card Component

The CourseCard component displays course information in a modern, gamified card format inspired by industry leaders like Duolingo, Udemy, and top educational platforms. It features advanced progress tracking, gamification elements, and seamless Telegram WebApp integration.

## Key Features

- **6 Visual Variants**: Default, featured, compact, path, completed, locked layouts
- **Gamification System**: XP rewards, streak tracking, achievement badges, difficulty indicators
- **Advanced Progress Tracking**: Visual progress bars, time estimates, completion status
- **Rich Metadata**: Ratings, student count, instructor info, category tags
- **Telegram WebApp Integration**: Native theme support, haptic feedback, optimized for mini apps
- **Apple HIG Compliance**: Accessible design following iOS principles
- **Micro-interactions**: Smooth animations, hover effects, bookmark functionality

## Variants

- **Default**: Standard card with comprehensive information and balanced layout
- **Featured**: Premium highlighted card with enhanced visual prominence and gradient overlays
- **Compact**: Space-efficient layout optimized for dense lists and mobile displays
- **Path**: Duolingo-inspired connected learning path with progress visualization
- **Completed**: Success state with achievement celebration and review prompts
- **Locked**: Gated content with unlock requirements and progression hints

## Gamification Elements

- **XP Rewards**: Points earned for course completion
- **Streak Tracking**: Daily learning streaks with fire indicators
- **Achievement Badges**: Visual recognition for milestones
- **Difficulty Levels**: Clear indicators (Beginner, Intermediate, Advanced)
- **Progress Visualization**: Animated progress bars with percentage completion
- **Time Investment**: Realistic time estimates and study planning

## Course Categories

Each category features distinct visual styling and iconography:
- **Swift**: Language fundamentals with orange accent colors
- **UIKit**: Interface development with blue themes
- **Architecture**: Design patterns with purple styling
- **Testing**: Quality assurance with green indicators
- **Performance**: Optimization with red/performance themes

## Telegram WebApp Optimizations

- Auto-detection of Telegram environment
- Native theme color integration
- Haptic feedback for interactions
- Optimized touch targets for mobile
- Responsive design for various screen sizes

## Usage Scenarios

Perfect for course catalogs, learning dashboards, recommendation systems, progress tracking, gamified learning experiences, and any educational platform requiring engaging course presentation.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'featured', 'compact', 'path', 'completed', 'locked'],
      description: 'Visual variant of the card affecting layout and styling',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for different layout needs',
    },
    title: {
      control: { type: 'text' },
      description: 'Course title displayed prominently',
    },
    description: {
      control: { type: 'text' },
      description: 'Course description explaining content and objectives',
    },
    category: {
      control: { type: 'select' },
      options: ['swift', 'uikit', 'architecture', 'testing', 'performance'],
      description: 'Course category affecting visual theming and icons',
    },
    difficulty: {
      control: { type: 'select' },
      options: ['beginner', 'intermediate', 'advanced'],
      description: 'Course difficulty level with visual indicators',
    },
    duration: {
      control: { type: 'text' },
      description: 'Estimated course duration (e.g., "4 hours", "2 weeks")',
    },
    progress: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Completion progress percentage (0-100)',
    },
    isCompleted: {
      control: { type: 'boolean' },
      description: 'Whether the course is completed with success indicators',
    },
    isBookmarked: {
      control: { type: 'boolean' },
      description: 'Bookmark status for saving courses',
    },
    instructor: {
      control: { type: 'text' },
      description: 'Course instructor or author name',
    },
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      description: 'Course rating out of 5 stars',
    },
    studentCount: {
      control: { type: 'number', min: 0 },
      description: 'Number of enrolled students',
    },
    xpReward: {
      control: { type: 'number', min: 0 },
      description: 'XP points earned for completion',
    },
    streakDays: {
      control: { type: 'number', min: 0 },
      description: 'Current learning streak in days',
    },
    estimatedTime: {
      control: { type: 'text' },
      description: 'Estimated time to complete (e.g., "2h 30m left")',
    },
    tags: {
      control: { type: 'object' },
      description: 'Array of course tags/topics',
    },
    achievements: {
      control: { type: 'object' },
      description: 'Array of earned achievements',
    },
    unlockRequirement: {
      control: { type: 'text' },
      description: 'Requirement text for locked courses',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CourseCard>;

// Helper component for Storybook layout
const StoryWrapper: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="p-4 space-y-4">
    {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
    {children}
  </div>
);

// Default story - Modern course card with all basic features
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    title: 'SwiftUI Fundamentals',
    description: 'Master SwiftUI declarative syntax, state management, and modern iOS app development patterns with hands-on projects.',
    category: 'swift',
    difficulty: 'beginner',
    duration: '4 hours',
    progress: 15,
    isCompleted: false,
    isBookmarked: false,
    instructor: 'Apple Developer Academy',
    rating: 4.8,
    studentCount: 12847,
    xpReward: 250,
    streakDays: 3,
    estimatedTime: '3h 25m left',
    tags: ['SwiftUI', 'iOS', 'UI/UX', 'Beginner-Friendly'],
    imageUrl: 'https://via.placeholder.com/400x240?text=SwiftUI+Course&bg=ff6b35&color=fff',
  },
};

// Featured variant - Premium highlighted course with enhanced visuals
export const Featured: Story = {
  args: {
    variant: 'featured',
    size: 'large',
    title: 'Advanced UIKit Architecture',
    description: 'Master complex UI patterns, custom components, performance optimization, and architectural design patterns for production-ready iOS applications.',
    category: 'uikit',
    difficulty: 'advanced',
    duration: '8 hours',
    progress: 0,
    isCompleted: false,
    isBookmarked: true,
    instructor: 'Senior iOS Engineer',
    rating: 4.9,
    studentCount: 3241,
    xpReward: 500,
    streakDays: 0,
    estimatedTime: '8h 0m',
    tags: ['UIKit', 'Architecture', 'Advanced', 'MVVM', 'Performance'],
    achievements: ['Expert Coder', 'Architecture Master'],
    imageUrl: 'https://via.placeholder.com/400x240?text=Advanced+UIKit&bg=007aff&color=fff',
  },
  parameters: {
    docs: {
      description: {
        story: 'Featured variant with enhanced visual prominence, gradient overlays, and premium styling for highlighting important or recommended courses.',
      },
    },
  },
};

// Compact variant - Space-efficient for lists and mobile
export const Compact: Story = {
  args: {
    variant: 'compact',
    size: 'small',
    title: 'iOS Testing Strategies',
    description: 'Comprehensive guide to unit testing, UI testing, and TDD practices in iOS development.',
    category: 'testing',
    difficulty: 'intermediate',
    duration: '3 hours',
    progress: 45,
    isCompleted: false,
    isBookmarked: false,
    instructor: 'Testing Expert',
    rating: 4.7,
    studentCount: 5672,
    xpReward: 180,
    streakDays: 1,
    estimatedTime: '1h 35m left',
    tags: ['Testing', 'TDD', 'Quality'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact variant optimized for dense layouts, course lists, and mobile displays with essential information.',
      },
    },
  },
};

// In progress course
export const InProgress: Story = {
  args: {
    variant: 'default',
    title: 'Core Data Mastery',
    description: 'Deep dive into Core Data for data persistence, relationships, and performance optimization in iOS apps.',
    category: 'architecture',
    difficulty: 'intermediate',
    duration: '6 hours',
    progress: 65,
    isCompleted: false,
    instructor: 'Database Specialist',
    imageUrl: 'https://via.placeholder.com/300x200?text=Core+Data',
  },
  parameters: {
    docs: {
      description: {
        story: 'Course card showing progress for a partially completed course.',
      },
    },
  },
};

// Completed course
export const Completed: Story = {
  args: {
    variant: 'default',
    title: 'Swift Algorithms & Data Structures',
    description: 'Master essential algorithms and data structures using Swift for coding interviews and performance optimization.',
    category: 'swift',
    difficulty: 'advanced',
    duration: '10 hours',
    progress: 100,
    isCompleted: true,
    instructor: 'Algorithm Expert',
    imageUrl: 'https://via.placeholder.com/300x200?text=Swift+Algorithms',
  },
  parameters: {
    docs: {
      description: {
        story: 'Completed course with success indicators and full progress.',
      },
    },
  },
};

// Different categories showcase
export const SwiftCategory: Story = {
  args: {
    variant: 'default',
    title: 'Swift 5.9 New Features',
    description: 'Explore the latest Swift language features, improvements, and best practices for modern iOS development.',
    category: 'swift',
    difficulty: 'intermediate',
    duration: '2 hours',
    progress: 25,
    isCompleted: false,
    instructor: 'Swift Team',
  },
  parameters: {
    docs: {
      description: {
        story: 'Swift category styling with orange accent colors.',
      },
    },
  },
};

export const UIKitCategory: Story = {
  args: {
    variant: 'default',
    title: 'Custom UIKit Components',
    description: 'Build reusable, interactive UI components from scratch using UIKit and learn advanced customization techniques.',
    category: 'uikit',
    difficulty: 'advanced',
    duration: '7 hours',
    progress: 0,
    isCompleted: false,
    instructor: 'UI Specialist',
  },
  parameters: {
    docs: {
      description: {
        story: 'UIKit category styling with blue accent colors.',
      },
    },
  },
};

export const ArchitectureCategory: Story = {
  args: {
    variant: 'default',
    title: 'MVVM with Combine',
    description: 'Implement the MVVM pattern using Combine framework for reactive, testable iOS application architecture.',
    category: 'architecture',
    difficulty: 'advanced',
    duration: '5 hours',
    progress: 80,
    isCompleted: false,
    instructor: 'Architecture Lead',
  },
  parameters: {
    docs: {
      description: {
        story: 'Architecture category styling with purple accent colors.',
      },
    },
  },
};

export const TestingCategory: Story = {
  args: {
    variant: 'default',
    title: 'TDD for iOS Developers',
    description: 'Learn Test-Driven Development principles and apply them to iOS projects for better code quality.',
    category: 'testing',
    difficulty: 'intermediate',
    duration: '4 hours',
    progress: 0,
    isCompleted: false,
    instructor: 'QA Engineer',
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing category styling with green accent colors.',
      },
    },
  },
};

export const PerformanceCategory: Story = {
  args: {
    variant: 'default',
    title: 'iOS Performance Optimization',
    description: 'Profile and optimize iOS apps for memory usage, battery life, and smooth user experience.',
    category: 'performance',
    difficulty: 'advanced',
    duration: '6 hours',
    progress: 45,
    isCompleted: false,
    instructor: 'Performance Engineer',
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance category styling with red accent colors.',
      },
    },
  },
};

// Different difficulty levels
export const BeginnerLevel: Story = {
  args: {
    variant: 'default',
    title: 'iOS Development Basics',
    description: 'Start your iOS development journey with Xcode, basic Swift syntax, and your first app.',
    category: 'swift',
    difficulty: 'beginner',
    duration: '3 hours',
    progress: 0,
    isCompleted: false,
    instructor: 'Beginner Guide',
  },
  parameters: {
    docs: {
      description: {
        story: 'Beginner-level course with appropriate difficulty indicator.',
      },
    },
  },
};

export const IntermediateLevel: Story = {
  args: {
    variant: 'default',
    title: 'Networking with URLSession',
    description: 'Master API integration, JSON parsing, and network error handling in iOS applications.',
    category: 'swift',
    difficulty: 'intermediate',
    duration: '5 hours',
    progress: 30,
    isCompleted: false,
    instructor: 'Network Expert',
  },
  parameters: {
    docs: {
      description: {
        story: 'Intermediate-level course for developers with some experience.',
      },
    },
  },
};

export const AdvancedLevel: Story = {
  args: {
    variant: 'default',
    title: 'Concurrency with async/await',
    description: 'Master modern Swift concurrency, actors, and async/await patterns for scalable iOS apps.',
    category: 'swift',
    difficulty: 'advanced',
    duration: '8 hours',
    progress: 0,
    isCompleted: false,
    instructor: 'Concurrency Expert',
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced-level course for experienced developers.',
      },
    },
  },
};

// Interactive demo
export const InteractiveDemo: Story = {
  args: {
    variant: 'default',
    title: 'Interactive Course Demo',
    description: 'Use the controls below to explore different course configurations and see how the card adapts to various states.',
    category: 'swift',
    difficulty: 'intermediate',
    duration: '4 hours',
    progress: 50,
    isCompleted: false,
    instructor: 'Demo Instructor',
    imageUrl: 'https://via.placeholder.com/300x200?text=Demo+Course',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with full feature set allowing experimentation with all variants, gamification elements, and configuration options.',
      },
    },
  },
};

// Additional showcase stories
export const HighStreakGamified: Story = {
  args: {
    variant: 'featured',
    size: 'large',
    title: 'Master iOS Developer Path',
    description: 'Complete certification path covering everything from Swift basics to advanced app architecture and deployment.',
    category: 'swift',
    difficulty: 'advanced',
    duration: '40 hours',
    progress: 75,
    isCompleted: false,
    isBookmarked: true,
    instructor: 'Apple Certified Team',
    rating: 4.9,
    studentCount: 892,
    xpReward: 2000,
    streakDays: 30,
    estimatedTime: '10h 0m left',
    tags: ['Certification', 'Master Path', 'Complete Course'],
    achievements: ['Swift Expert', 'Streak Master', 'Dedication Champion'],
    imageUrl: 'https://via.placeholder.com/400x240?text=Master+Path&bg=ff2d92&color=fff',
  },
  parameters: {
    docs: {
      description: {
        story: 'Featured course showcasing maximum gamification with high streaks, multiple achievements, and premium certification path.',
      },
    },
  },
};

// Size variants showcase
export const SmallSize: Story = {
  args: {
    variant: 'compact',
    size: 'small',
    title: 'Swift Basics',
    description: 'Learn Swift fundamentals.',
    category: 'swift',
    difficulty: 'beginner',
    duration: '2h',
    progress: 25,
    isCompleted: false,
    instructor: 'Swift Team',
    rating: 4.7,
    studentCount: 12000,
    xpReward: 100,
    tags: ['Swift', 'Basics'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant optimized for very dense layouts and mobile lists.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'featured',
    size: 'large',
    title: 'Advanced iOS Architecture Masterclass',
    description: 'Comprehensive deep-dive into scalable iOS application architecture patterns, design principles, and real-world implementation strategies used by top tech companies.',
    category: 'architecture',
    difficulty: 'advanced',
    duration: '15 hours',
    progress: 40,
    isCompleted: false,
    isBookmarked: true,
    instructor: 'Senior Architect',
    rating: 4.9,
    studentCount: 1234,
    xpReward: 750,
    streakDays: 12,
    estimatedTime: '9h 0m left',
    tags: ['Architecture', 'Advanced', 'Masterclass', 'Enterprise'],
    achievements: ['Architecture Expert', 'Deep Learner'],
    imageUrl: 'https://via.placeholder.com/400x240?text=Architecture+Master&bg=5856d6&color=fff',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large size variant for hero sections and prominent course displays with maximum information density.',
      },
    },
  },
};

// Telegram WebApp optimized story
export const TelegramOptimized: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    title: 'Build Telegram Mini Apps',
    description: 'Learn to create engaging Telegram Mini Apps using modern web technologies and Telegram WebApp API.',
    category: 'swift', // This would be 'telegram' if we had that category
    difficulty: 'intermediate',
    duration: '6 hours',
    progress: 30,
    isCompleted: false,
    isBookmarked: true,
    instructor: 'Telegram Team',
    rating: 4.8,
    studentCount: 5432,
    xpReward: 300,
    streakDays: 5,
    estimatedTime: '4h 10m left',
    tags: ['Telegram', 'Mini Apps', 'WebApp API'],
    imageUrl: 'https://via.placeholder.com/400x240?text=Telegram+Apps&bg=0088cc&color=fff',
  },
  parameters: {
    docs: {
      description: {
        story: 'Course card optimized for Telegram WebApp environment with native theme integration.',
      },
    },
  },
};