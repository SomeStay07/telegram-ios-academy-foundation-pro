import type { Meta, StoryObj } from '@storybook/react';
import { InterviewPrep } from './InterviewPrep';

const meta: Meta<typeof InterviewPrep> = {
  title: 'Educational/InterviewPrep',
  component: InterviewPrep,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Interview Prep Component

The InterviewPrep component helps iOS developers prepare for technical interviews by organizing questions into categories and difficulty levels. It provides personalized recommendations based on the user's experience level.

## Features

- **Categorized Questions**: Swift, UIKit, Architecture, Algorithms, and Behavioral questions
- **Difficulty Levels**: Junior, Middle, and Senior level questions
- **Progress Tracking**: Track answered questions and success rates
- **Level-based Recommendations**: Personalized suggestions based on user level
- **Apple HIG Design**: Clean, focused interface optimized for learning

## Categories

- **Swift**: Language-specific questions about syntax, features, and best practices
- **UIKit**: UI framework questions covering views, controllers, and interactions
- **Architecture**: Design patterns, MVVM, MVC, and app structure questions
- **Algorithms**: Data structures, algorithms, and problem-solving challenges
- **Behavioral**: Soft skills, teamwork, and career-related questions

## Usage

Use this component on preparation pages, study dashboards, or as part of a comprehensive learning platform to help developers prepare for iOS interviews.
        `,
      },
    },
  },
  argTypes: {
    userLevel: {
      control: { type: 'select' },
      options: ['junior', 'middle', 'senior'],
      description: 'User experience level for personalized recommendations',
    },
    selectedCategory: {
      control: { type: 'select' },
      options: ['swift', 'uikit', 'architecture', 'algorithms', 'behavioral'],
      description: 'Currently selected question category',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InterviewPrep>;

// Default story with realistic progress data
export const Default: Story = {
  args: {
    userLevel: 'middle',
    selectedCategory: 'swift',
    categoryProgress: {
      swift: { answered: 15, total: 25, successRate: 0.8 },
      uikit: { answered: 12, total: 30, successRate: 0.75 },
      architecture: { answered: 8, total: 20, successRate: 0.85 },
      algorithms: { answered: 20, total: 40, successRate: 0.7 },
      behavioral: { answered: 6, total: 15, successRate: 0.9 },
    },
  },
};

// Junior level developer
export const JuniorLevel: Story = {
  args: {
    userLevel: 'junior',
    selectedCategory: 'swift',
    categoryProgress: {
      swift: { answered: 8, total: 25, successRate: 0.65 },
      uikit: { answered: 5, total: 30, successRate: 0.6 },
      architecture: { answered: 2, total: 20, successRate: 0.5 },
      algorithms: { answered: 12, total: 40, successRate: 0.58 },
      behavioral: { answered: 4, total: 15, successRate: 0.75 },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interview preparation view for a junior developer with beginner-level progress and recommendations.',
      },
    },
  },
};

// Middle level developer
export const MiddleLevel: Story = {
  args: {
    userLevel: 'middle',
    selectedCategory: 'architecture',
    categoryProgress: {
      swift: { answered: 20, total: 25, successRate: 0.85 },
      uikit: { answered: 18, total: 30, successRate: 0.8 },
      architecture: { answered: 12, total: 20, successRate: 0.75 },
      algorithms: { answered: 25, total: 40, successRate: 0.72 },
      behavioral: { answered: 10, total: 15, successRate: 0.85 },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interview preparation view for a middle-level developer focusing on architecture questions.',
      },
    },
  },
};

// Senior level developer
export const SeniorLevel: Story = {
  args: {
    userLevel: 'senior',
    selectedCategory: 'algorithms',
    categoryProgress: {
      swift: { answered: 25, total: 25, successRate: 0.92 },
      uikit: { answered: 28, total: 30, successRate: 0.89 },
      architecture: { answered: 19, total: 20, successRate: 0.95 },
      algorithms: { answered: 35, total: 40, successRate: 0.85 },
      behavioral: { answered: 14, total: 15, successRate: 0.93 },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interview preparation view for a senior developer with advanced progress across all categories.',
      },
    },
  },
};

// Fresh start - no progress
export const FreshStart: Story = {
  args: {
    userLevel: 'junior',
    selectedCategory: 'swift',
    categoryProgress: {
      swift: { answered: 0, total: 25, successRate: 0 },
      uikit: { answered: 0, total: 30, successRate: 0 },
      architecture: { answered: 0, total: 20, successRate: 0 },
      algorithms: { answered: 0, total: 40, successRate: 0 },
      behavioral: { answered: 0, total: 15, successRate: 0 },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Initial state for a new user who hasn\'t started practicing interview questions yet.',
      },
    },
  },
};

// High performer
export const HighPerformer: Story = {
  args: {
    userLevel: 'senior',
    selectedCategory: 'swift',
    categoryProgress: {
      swift: { answered: 25, total: 25, successRate: 0.96 },
      uikit: { answered: 30, total: 30, successRate: 0.93 },
      architecture: { answered: 20, total: 20, successRate: 0.98 },
      algorithms: { answered: 40, total: 40, successRate: 0.9 },
      behavioral: { answered: 15, total: 15, successRate: 0.95 },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Exceptional performance display for a developer who has completed all categories with high success rates.',
      },
    },
  },
};

// UIKit focus
export const UIKitFocus: Story = {
  args: {
    userLevel: 'middle',
    selectedCategory: 'uikit',
    categoryProgress: {
      swift: { answered: 18, total: 25, successRate: 0.82 },
      uikit: { answered: 22, total: 30, successRate: 0.86 },
      architecture: { answered: 10, total: 20, successRate: 0.7 },
      algorithms: { answered: 15, total: 40, successRate: 0.68 },
      behavioral: { answered: 8, total: 15, successRate: 0.88 },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Focus on UIKit questions for developers specializing in iOS user interface development.',
      },
    },
  },
};

// Behavioral interview prep
export const BehavioralFocus: Story = {
  args: {
    userLevel: 'middle',
    selectedCategory: 'behavioral',
    categoryProgress: {
      swift: { answered: 12, total: 25, successRate: 0.75 },
      uikit: { answered: 14, total: 30, successRate: 0.78 },
      architecture: { answered: 6, total: 20, successRate: 0.67 },
      algorithms: { answered: 18, total: 40, successRate: 0.72 },
      behavioral: { answered: 12, total: 15, successRate: 0.92 },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Behavioral interview preparation showing strength in soft skills and communication.',
      },
    },
  },
};

// Interactive demo
export const InteractiveDemo: Story = {
  args: {
    userLevel: 'middle',
    selectedCategory: 'swift',
    categoryProgress: {
      swift: { answered: 15, total: 25, successRate: 0.8 },
      uikit: { answered: 12, total: 30, successRate: 0.75 },
      architecture: { answered: 8, total: 20, successRate: 0.85 },
      algorithms: { answered: 20, total: 40, successRate: 0.7 },
      behavioral: { answered: 6, total: 15, successRate: 0.9 },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo allowing you to explore different categories and see progress visualization. Use the controls to switch between categories and user levels.',
      },
    },
  },
};