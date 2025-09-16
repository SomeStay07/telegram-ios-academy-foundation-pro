import type { Meta, StoryObj } from '@storybook/react';
import { CourseCard } from '../../../src/components/CourseCard/CourseCard';
import { EducationIcons, AchievementIcons, DeveloperIcons, AnalyticsIcons } from '../../../src/icons/AcademyIcons';

const meta: Meta<typeof CourseCard> = {
  title: '🎨 New Design System/02 Components/Enhanced CourseCard',
  component: CourseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# 🚀 Enhanced CourseCard Component

Полностью переработанный компонент курсовых карточек на основе competitive analysis топовых образовательных платформ.

## 🏆 Inspiration Sources

### Duolingo
- ✨ Gamification: XP system, streaks, achievements
- 🎯 Progress visualization with animated indicators
- 🏃 Path-based learning journey
- 🔥 Streak tracking с fire indicators

### Udemy/Coursera  
- ⭐ Rating system с звездами
- 👥 Student count и social proof
- 👨‍🏫 Instructor information
- 🏷 Category tags и filtering

### Apple HIG
- 📱 iOS-native animations и micro-interactions
- ♿ Accessibility compliance
- 🎨 SF Symbols integration
- 🌙 Dark mode support

### Telegram Design
- 📟 WebApp native integration
- 🎨 Theme synchronization
- 📳 Haptic feedback
- 📱 Touch-optimized interactions

## 🎨 Design Variants

### 6 Specialized Variants
1. **Default**: Balanced information density
2. **Featured**: Premium highlighting с gradient overlays
3. **Compact**: Space-efficient для lists
4. **Path**: Duolingo-inspired learning path
5. **Completed**: Success celebration state
6. **Locked**: Gated content с unlock hints

### 3 Size Options
- **Small**: Dense layouts, mobile lists
- **Medium**: Standard card size
- **Large**: Hero sections, featured content

## 🚀 Key Features

- **CVA-based variants**: Type-safe, maintainable
- **Gamification**: XP, streaks, achievements
- **Rich metadata**: Ratings, student count, tags
- **Telegram optimization**: Native feel
- **Accessibility**: WCAG AA+ compliance
- **Performance**: Optimized animations
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'featured', 'compact', 'path', 'completed', 'locked'],
      description: 'Card variant affecting layout and visual style',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant for different use cases',
    },
    category: {
      control: { type: 'select' },
      options: ['swift', 'uikit', 'architecture', 'testing', 'performance'],
      description: 'Course category with specialized theming',
    },
    difficulty: {
      control: { type: 'select' },
      options: ['beginner', 'intermediate', 'advanced'],
      description: 'Difficulty level with visual indicators',
    },
    progress: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Completion progress (0-100%)',
    },
    isBookmarked: {
      control: { type: 'boolean' },
      description: 'Bookmark status for user favorites',
    },
    rating: {
      control: { type: 'range', min: 0, max: 5, step: 0.1 },
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
  },
};

export default meta;
type Story = StoryObj<typeof CourseCard>;

// Showcase все 6 вариантов в одном grid
export const AllVariantsShowcase: Story = {
  render: () => (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🚀 Enhanced CourseCard Variants
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            6 специализированных вариантов, вдохновленных лучшими образовательными платформами
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Default Variant */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              📋 Default
            </h3>
            <CourseCard
              variant="default"
              size="medium"
              title="SwiftUI Fundamentals"
              description="Master SwiftUI declarative syntax and build beautiful iOS apps with modern design patterns."
              category="swift"
              difficulty="beginner"
              duration="4 hours"
              progress={25}
              isCompleted={false}
              isBookmarked={true}
              instructor="Apple Developer Academy"
              rating={4.8}
              studentCount={12847}
              xpReward={250}
              streakDays={3}
              estimatedTime="3h 0m left"
              tags={['SwiftUI', 'iOS', 'Beginner']}
              imageUrl="https://via.placeholder.com/400x240?text=SwiftUI&bg=ff6b35&color=fff"
            />
          </div>

          {/* Featured Variant */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              ⭐ Featured
            </h3>
            <CourseCard
              variant="featured"
              size="medium"
              title="Advanced iOS Architecture"
              description="Master MVVM, VIPER, and Clean Architecture patterns for scalable iOS applications."
              category="architecture"
              difficulty="advanced"
              duration="12 hours"
              progress={0}
              isCompleted={false}
              isBookmarked={true}
              instructor="Senior iOS Architect"
              rating={4.9}
              studentCount={3241}
              xpReward={600}
              streakDays={0}
              estimatedTime="12h 0m"
              tags={['Architecture', 'MVVM', 'Advanced']}
              achievements={['Expert Coder', 'Architecture Master']}
              imageUrl="https://via.placeholder.com/400x240?text=Architecture&bg=5856d6&color=fff"
            />
          </div>

          {/* Compact Variant */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              📱 Compact
            </h3>
            <CourseCard
              variant="compact"
              size="small"
              title="iOS Testing Strategies"
              description="Learn TDD, unit testing, and UI testing best practices."
              category="testing"
              difficulty="intermediate"
              duration="6 hours"
              progress={65}
              isCompleted={false}
              isBookmarked={false}
              instructor="Testing Expert"
              rating={4.7}
              studentCount={5672}
              xpReward={320}
              streakDays={2}
              estimatedTime="2h 10m left"
              tags={['Testing', 'TDD']}
            />
          </div>

          {/* Path Variant */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              🛤 Path (Duolingo-style)
            </h3>
            <CourseCard
              variant="path"
              size="medium"
              title="Swift Learning Path"
              description="Complete journey from basics to advanced Swift programming with connected lessons."
              category="swift"
              difficulty="beginner"
              duration="20 hours"
              progress={40}
              isCompleted={false}
              isBookmarked={true}
              instructor="Swift Learning Team"
              rating={4.9}
              studentCount={8432}
              xpReward={800}
              streakDays={7}
              estimatedTime="12h 0m left"
              tags={['Learning Path', 'Swift', 'Structured']}
              imageUrl="https://via.placeholder.com/400x240?text=Swift+Path&bg=ff6b35&color=fff"
            />
          </div>

          {/* Completed Variant */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              ✅ Completed
            </h3>
            <CourseCard
              variant="completed"
              size="medium"
              title="UIKit Mastery"
              description="Complete guide to UIKit development with hands-on projects and real-world examples."
              category="uikit"
              difficulty="intermediate"
              duration="8 hours"
              progress={100}
              isCompleted={true}
              isBookmarked={true}
              instructor="UI Expert"
              rating={4.8}
              studentCount={6543}
              xpReward={400}
              streakDays={15}
              estimatedTime="Completed!"
              tags={['UIKit', 'Complete', 'Projects']}
              achievements={['UIKit Master', 'Project Builder', 'Streak Champion']}
              imageUrl="https://via.placeholder.com/400x240?text=UIKit+Complete&bg=34c759&color=fff"
            />
          </div>

          {/* Locked Variant */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              🔒 Locked
            </h3>
            <CourseCard
              variant="locked"
              size="medium"
              title="Advanced Concurrency"
              description="Master async/await, actors, and complex concurrency patterns for high-performance apps."
              category="swift"
              difficulty="advanced"
              duration="10 hours"
              progress={0}
              isCompleted={false}
              isBookmarked={false}
              instructor="Concurrency Expert"
              rating={4.9}
              studentCount={1284}
              xpReward={500}
              streakDays={0}
              estimatedTime="Locked"
              tags={['Concurrency', 'Advanced', 'async/await']}
              unlockRequirement="Complete Swift Fundamentals and UIKit Basics"
              imageUrl="https://via.placeholder.com/400x240?text=Locked+Course&bg=8e8e93&color=fff"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">🎮</div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Gamification
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              XP система, стрики, достижения как в Duolingo
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">📊</div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Rich Metadata
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Рейтинги, количество студентов, теги
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">📱</div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Telegram Native
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              WebApp интеграция, haptic feedback
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">♿</div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Accessibility
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              WCAG AA+ соответствие, VoiceOver
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Showcase всех 6 вариантов Enhanced CourseCard с демонстрацией ключевых возможностей.',
      },
    },
  },
};

// Interactive Playground для экспериментов
export const InteractivePlayground: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    title: 'Interactive Course Demo',
    description: 'Experiment with different props and see how the Enhanced CourseCard adapts to various configurations.',
    category: 'swift',
    difficulty: 'intermediate',
    duration: '6 hours',
    progress: 50,
    isCompleted: false,
    isBookmarked: true,
    instructor: 'Demo Instructor',
    rating: 4.5,
    studentCount: 1500,
    xpReward: 300,
    streakDays: 5,
    estimatedTime: '3h 0m left',
    tags: ['Demo', 'Interactive', 'Playground'],
    achievements: ['Explorer', 'Learner'],
    imageUrl: 'https://via.placeholder.com/400x240?text=Demo+Course&bg=5856d6&color=fff',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground для экспериментов с Enhanced CourseCard. Используйте контролы для изменения props.',
      },
    },
  },
};

// Gamification Focus
export const GamificationShowcase: Story = {
  render: () => (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          🎮 Gamification Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Элементы геймификации, вдохновленные Duolingo и топовыми образовательными платформами
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* High Streak */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            🔥 High Streak (30 days)
          </h3>
          <CourseCard
            variant="featured"
            size="medium"
            title="Streak Master Course"
            description="Maintain your learning momentum with daily Swift practice."
            category="swift"
            difficulty="intermediate"
            duration="5 hours"
            progress={85}
            isCompleted={false}
            isBookmarked={true}
            instructor="Streak Expert"
            rating={4.9}
            studentCount={2341}
            xpReward={500}
            streakDays={30}
            estimatedTime="45m left"
            tags={['Streak', 'Daily Practice']}
            achievements={['Streak Master', 'Consistency Champion', 'Daily Learner']}
          />
        </div>

        {/* High XP */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            ⭐ High XP Reward
          </h3>
          <CourseCard
            variant="featured"
            size="medium"
            title="Advanced iOS Bootcamp"
            description="Intensive course with maximum XP rewards for dedicated learners."
            category="architecture"
            difficulty="advanced"
            duration="15 hours"
            progress={0}
            isCompleted={false}
            isBookmarked={true}
            instructor="Bootcamp Instructor"
            rating={4.8}
            studentCount={892}
            xpReward={1500}
            streakDays={0}
            estimatedTime="15h 0m"
            tags={['Bootcamp', 'Intensive', 'High XP']}
          />
        </div>

        {/* Multiple Achievements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            🏆 Multiple Achievements
          </h3>
          <CourseCard
            variant="completed"
            size="medium"
            title="Achievement Hunter Course"
            description="Unlock multiple achievements by completing comprehensive challenges."
            category="testing"
            difficulty="intermediate"
            duration="8 hours"
            progress={100}
            isCompleted={true}
            isBookmarked={true}
            instructor="Achievement Master"
            rating={4.7}
            studentCount={1234}
            xpReward={600}
            streakDays={20}
            estimatedTime="Completed!"
            tags={['Achievements', 'Challenges']}
            achievements={['Test Master', 'Bug Hunter', 'Quality Guardian', 'Perfect Score', 'Completionist']}
          />
        </div>

        {/* Learning Path */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            🛤 Learning Path
          </h3>
          <CourseCard
            variant="path"
            size="medium"
            title="iOS Developer Journey"
            description="Complete learning path from beginner to advanced iOS developer."
            category="swift"
            difficulty="beginner"
            duration="40 hours"
            progress={60}
            isCompleted={false}
            isBookmarked={true}
            instructor="Path Guide"
            rating={4.9}
            studentCount={5678}
            xpReward={2000}
            streakDays={12}
            estimatedTime="16h 0m left"
            tags={['Learning Path', 'Complete Journey']}
            achievements={['Path Walker', 'Milestone Achiever']}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase геймификационных элементов: высокие стрики, XP rewards, достижения и learning paths.',
      },
    },
  },
};

// Mobile Optimization
export const MobileOptimized: Story = {
  render: () => (
    <div className="p-4 max-w-sm mx-auto space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          📱 Mobile Optimized
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Compact variants для мобильных списков
        </p>
      </div>

      <div className="space-y-4">
        <CourseCard
          variant="compact"
          size="small"
          title="Swift Basics"
          description="Learn Swift programming fundamentals."
          category="swift"
          difficulty="beginner"
          duration="3h"
          progress={75}
          isCompleted={false}
          instructor="Swift Teacher"
          rating={4.8}
          studentCount={12000}
          xpReward={150}
          streakDays={3}
          tags={['Swift', 'Basics']}
        />

        <CourseCard
          variant="compact"
          size="small"
          title="UIKit Essentials"
          description="Master UIKit interface development."
          category="uikit"
          difficulty="intermediate"
          duration="5h"
          progress={30}
          isCompleted={false}
          instructor="UI Expert"
          rating={4.7}
          studentCount={8500}
          xpReward={200}
          streakDays={1}
          tags={['UIKit', 'Interface']}
        />

        <CourseCard
          variant="compact"
          size="small"
          title="Testing Best Practices"
          description="Learn iOS testing strategies and TDD."
          category="testing"
          difficulty="intermediate"
          duration="4h"
          progress={0}
          isCompleted={false}
          instructor="Test Expert"
          rating={4.6}
          studentCount={3200}
          xpReward={180}
          streakDays={0}
          tags={['Testing', 'TDD']}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized compact variants для списков курсов на мобильных устройствах.',
      },
    },
  },
};