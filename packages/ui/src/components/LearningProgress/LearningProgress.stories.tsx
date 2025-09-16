import type { Meta, StoryObj } from '@storybook/react';
import { LearningProgress } from './LearningProgress';

const meta: Meta<typeof LearningProgress> = {
  title: 'Educational/LearningProgress',
  component: LearningProgress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Learning Progress Component

The LearningProgress component provides a comprehensive view of a user's learning journey in iOS development. It includes progress tracking, achievements, and recent activity visualization.

## Features

- **Course Progress**: Visual progress indicators for completed vs total courses
- **Activity Tracking**: Weekly activity heatmap similar to GitHub contributions
- **Achievements**: Recent learning milestones and badges
- **Statistics**: Key learning metrics (streak, hours, level)
- **Apple HIG Design**: Follows iOS design principles with clean, readable layouts

## Usage

Use this component on profile pages, dashboards, or progress tracking screens to motivate learners and show their educational achievements.
        `,
      },
    },
  },
  argTypes: {
    coursesCompleted: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Number of courses completed',
    },
    totalCourses: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of courses available',
    },
    currentStreak: {
      control: { type: 'number', min: 0, max: 365 },
      description: 'Current learning streak in days',
    },
    totalHours: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'Total hours spent learning',
    },
    level: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Current learning level',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LearningProgress>;

// Default story with realistic data
export const Default: Story = {
  args: {
    coursesCompleted: 12,
    totalCourses: 24,
    currentStreak: 15,
    totalHours: 147,
    level: 8,
    recentAchievements: [
      {
        id: '1',
        title: 'SwiftUI Master',
        description: 'Completed advanced SwiftUI course',
        icon: '🏆',
        earnedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Consistent Learner',
        description: '15-day learning streak',
        icon: '🔥',
        earnedAt: new Date('2024-01-10'),
      },
      {
        id: '3',
        title: 'Architecture Expert',
        description: 'Mastered MVVM pattern',
        icon: '🏗️',
        earnedAt: new Date('2024-01-05'),
      },
    ],
    weeklyProgress: [2, 1, 3, 0, 2, 4, 3, 1, 2, 0, 1, 3, 2, 4],
  },
};

// Beginner learner
export const BeginnerLearner: Story = {
  args: {
    coursesCompleted: 2,
    totalCourses: 24,
    currentStreak: 3,
    totalHours: 18,
    level: 2,
    recentAchievements: [
      {
        id: '1',
        title: 'First Steps',
        description: 'Completed your first iOS course',
        icon: '🎯',
        earnedAt: new Date('2024-01-15'),
      },
    ],
    weeklyProgress: [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress display for a beginner learner just starting their iOS development journey.',
      },
    },
  },
};

// Advanced learner
export const AdvancedLearner: Story = {
  args: {
    coursesCompleted: 21,
    totalCourses: 24,
    currentStreak: 45,
    totalHours: 324,
    level: 15,
    recentAchievements: [
      {
        id: '1',
        title: 'iOS Expert',
        description: 'Completed 20+ courses',
        icon: '👑',
        earnedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Dedication Master',
        description: '45-day learning streak',
        icon: '🚀',
        earnedAt: new Date('2024-01-12'),
      },
      {
        id: '3',
        title: 'Core Data Pro',
        description: 'Mastered Core Data',
        icon: '💾',
        earnedAt: new Date('2024-01-08'),
      },
      {
        id: '4',
        title: 'UIKit Specialist',
        description: 'Advanced UIKit knowledge',
        icon: '🎨',
        earnedAt: new Date('2024-01-03'),
      },
    ],
    weeklyProgress: [4, 3, 4, 2, 3, 4, 4, 3, 4, 2, 4, 3, 4, 4],
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress display for an advanced learner with consistent high activity and multiple achievements.',
      },
    },
  },
};

// No activity state
export const NoRecentActivity: Story = {
  args: {
    coursesCompleted: 5,
    totalCourses: 24,
    currentStreak: 0,
    totalHours: 42,
    level: 4,
    recentAchievements: [],
    weeklyProgress: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  parameters: {
    docs: {
      description: {
        story: 'Display when a user has not been active recently - useful for re-engagement scenarios.',
      },
    },
  },
};

// High achiever
export const HighAchiever: Story = {
  args: {
    coursesCompleted: 24,
    totalCourses: 24,
    currentStreak: 100,
    totalHours: 500,
    level: 25,
    recentAchievements: [
      {
        id: '1',
        title: 'Course Completionist',
        description: 'Completed all available courses',
        icon: '🎓',
        earnedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        title: 'Century Streak',
        description: '100-day learning streak',
        icon: '💯',
        earnedAt: new Date('2024-01-12'),
      },
      {
        id: '3',
        title: '500 Hour Club',
        description: 'Dedicated 500+ hours to learning',
        icon: '⏰',
        earnedAt: new Date('2024-01-10'),
      },
      {
        id: '4',
        title: 'Master Level',
        description: 'Reached level 25',
        icon: '🏆',
        earnedAt: new Date('2024-01-08'),
      },
    ],
    weeklyProgress: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  },
  parameters: {
    docs: {
      description: {
        story: 'Maximum achievement display for users who have completed all content and maintained exceptional consistency.',
      },
    },
  },
};

// Interactive demo
export const InteractiveDemo: Story = {
  args: {
    coursesCompleted: 8,
    totalCourses: 20,
    currentStreak: 12,
    totalHours: 89,
    level: 6,
    recentAchievements: [
      {
        id: '1',
        title: 'SwiftUI Basics',
        description: 'Learned the fundamentals',
        icon: '📱',
        earnedAt: new Date('2024-01-14'),
      },
      {
        id: '2',
        title: 'Consistent Progress',
        description: '12-day learning streak',
        icon: '🔥',
        earnedAt: new Date('2024-01-11'),
      },
    ],
    weeklyProgress: [1, 2, 1, 3, 1, 0, 2, 1, 2, 1, 1, 2, 1, 3],
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing typical progress for an engaged learner. Try adjusting the controls to see how the component adapts to different progress levels.',
      },
    },
  },
};