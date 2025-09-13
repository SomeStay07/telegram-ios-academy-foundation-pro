import type { Meta, StoryObj } from '@storybook/react'
import { InterviewRenderer } from './InterviewRenderer'
import type { InterviewSet } from '@telegram-ios-academy/interview-spec'

const mockInterviewSet: InterviewSet = {
  id: 'swift-fundamentals',
  title: 'Swift Fundamentals Interview',
  questions: [
    {
      id: 'q1-variables',
      category: 'swift',
      difficulty: 'beginner',
      prompt: 'Explain the difference between var and let in Swift. When would you use each?',
      modelAnswer: 'var declares a mutable variable that can be changed after initialization, while let declares an immutable constant that cannot be changed once set. Use let for values that won\'t change (preferred for safety and performance), and var only when you need to modify the value later.',
      pitfalls: [
        'Thinking let variables can be changed later',
        'Using var when let would be more appropriate',
        'Not understanding compile-time vs runtime immutability'
      ],
      codeSample: `let name = "John" // Immutable
var age = 25     // Mutable
age += 1         // OK
// name = "Jane"  // Error: Cannot assign to value`,
      tags: ['variables', 'constants', 'mutability'],
      references: [
        'Swift Language Guide - Constants and Variables',
        'Apple Developer Documentation'
      ]
    },
    {
      id: 'q2-optionals',
      category: 'swift',
      difficulty: 'intermediate',
      prompt: 'What are optionals in Swift and why are they important? Show different ways to safely unwrap them.',
      modelAnswer: 'Optionals represent values that might be absent (nil). They prevent null pointer exceptions and make nil-handling explicit. Safe unwrapping methods include: optional binding (if let/guard let), nil coalescing operator (??), optional chaining (?.), and forced unwrapping (!) when certain the value exists.',
      pitfalls: [
        'Force unwrapping without checking for nil',
        'Not understanding the difference between nil and empty',
        'Pyramid of doom with nested optional binding'
      ],
      codeSample: `var name: String? = "John"

// Optional binding
if let unwrappedName = name {
    print(unwrappedName)
}

// Nil coalescing
let displayName = name ?? "Unknown"

// Optional chaining
let count = name?.count`,
      tags: ['optionals', 'safety', 'unwrapping'],
      references: [
        'Swift Language Guide - Optionals',
        'Swift Optional Chaining Documentation'
      ]
    },
    {
      id: 'q3-memory',
      category: 'memory',
      difficulty: 'advanced',
      prompt: 'Explain Automatic Reference Counting (ARC) in Swift. How do you prevent retain cycles?',
      modelAnswer: 'ARC automatically manages memory by tracking references to objects. When reference count reaches zero, the object is deallocated. Retain cycles occur when objects hold strong references to each other. Prevent them using weak references (for optional relationships) or unowned references (for non-optional relationships that won\'t outlive the referenced object).',
      pitfalls: [
        'Creating retain cycles with closures',
        'Using strong references in delegate patterns',
        'Not understanding weak vs unowned references'
      ],
      codeSample: `class Person {
    let name: String
    weak var apartment: Apartment? // Weak to prevent cycle
    
    init(name: String) { self.name = name }
}

class Apartment {
    let unit: String
    var tenant: Person?
    
    init(unit: String) { self.unit = unit }
}`,
      tags: ['memory', 'arc', 'retain-cycle', 'weak', 'unowned'],
      references: [
        'Swift Language Guide - Automatic Reference Counting',
        'Memory Management Best Practices'
      ]
    }
  ]
}

const mockAnalytics = {
  interviewStarted: (data: any) => console.log('Interview started:', data),
  questionRevealed: (data: any) => console.log('Question revealed:', data),
  answerSubmitted: (data: any) => console.log('Answer submitted:', data),
  interviewCompleted: (data: any) => console.log('Interview completed:', data)
}

const meta: Meta<typeof InterviewRenderer> = {
  title: 'Renderers/InterviewRenderer',
  component: InterviewRenderer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
InterviewRenderer provides three distinct interview modes:

- **Drill Mode**: Quick-fire practice questions for rapid skill building
- **Explain Mode**: In-depth learning with model answers and explanations  
- **Mock Mode**: Timed interview simulation with self-rating

Features:
- Timer and question counter
- Text and audio answer recording
- Progress restoration
- Analytics tracking
- Responsive design
        `
      }
    }
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['drill', 'explain', 'mock'],
      description: 'Interview mode determines behavior and features'
    }
  }
}

export default meta
type Story = StoryObj<typeof InterviewRenderer>

export const DrillMode: Story = {
  args: {
    interviewSet: mockInterviewSet,
    mode: 'drill',
    onAnalytics: mockAnalytics,
    onProgressUpdate: (progress) => console.log('Progress updated:', progress),
    onComplete: (progress) => console.log('Interview completed:', progress)
  }
}

export const ExplainMode: Story = {
  args: {
    interviewSet: mockInterviewSet,
    mode: 'explain',
    onAnalytics: mockAnalytics,
    onProgressUpdate: (progress) => console.log('Progress updated:', progress),
    onComplete: (progress) => console.log('Interview completed:', progress)
  }
}

export const MockMode: Story = {
  args: {
    interviewSet: mockInterviewSet,
    mode: 'mock',
    onAnalytics: mockAnalytics,
    onProgressUpdate: (progress) => console.log('Progress updated:', progress),
    onComplete: (progress) => console.log('Interview completed:', progress)
  }
}

export const WithProgress: Story = {
  args: {
    interviewSet: mockInterviewSet,
    mode: 'mock',
    onAnalytics: mockAnalytics,
    progress: {
      interview_id: 'swift-fundamentals',
      current_question_index: 1,
      answers: [
        {
          question_id: 'q1-variables',
          answer: 'var is mutable, let is immutable. Use let when the value won\'t change.',
          answer_type: 'text',
          time_spent_seconds: 45,
          self_rating: 4,
          timestamp: Date.now() - 60000
        }
      ],
      start_time: Date.now() - 60000,
      mode: 'mock'
    },
    onProgressUpdate: (progress) => console.log('Progress updated:', progress),
    onComplete: (progress) => console.log('Interview completed:', progress)
  }
}

export const SingleQuestion: Story = {
  args: {
    interviewSet: {
      id: 'single-test',
      title: 'Quick Test',
      questions: [mockInterviewSet.questions[0]]
    },
    mode: 'explain',
    onAnalytics: mockAnalytics,
    onProgressUpdate: (progress) => console.log('Progress updated:', progress),
    onComplete: (progress) => console.log('Interview completed:', progress)
  }
}