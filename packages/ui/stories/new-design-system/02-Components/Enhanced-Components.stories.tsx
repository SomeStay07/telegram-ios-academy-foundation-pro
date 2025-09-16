import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Input, Button, Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../src/components/Enhanced';
import { 
  MagnifyingGlassIcon, 
  EnvelopeIcon, 
  LockClosedIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  UserIcon,
  PlayIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const meta = {
  title: 'Design System 3.0/02-Components/Enhanced Components',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Enhanced Components

Современные компоненты с продвинутыми возможностями и микроинтеракциями, основанные на лучших практиках дизайна.

## Ключевые особенности

- **Микроинтеракции**: Плавные анимации и переходы
- **Accessibility**: Полная поддержка ARIA и клавиатурной навигации
- **Telegram Integration**: Нативная интеграция с Telegram WebApp API
- **Advanced UX**: Floating labels, haptic feedback, ripple effects
- **Performance**: Оптимизированная производительность и рендеринг

## Компоненты

### Enhanced Input
Продвинутое поле ввода с floating labels, валидацией и состояниями.

### Enhanced Button  
Современная кнопка с ripple effects, haptic feedback и анимациями.

### Enhanced Card
Интерактивная карточка с различными стилями и эффектами.
        `
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const InputShowcase: StoryObj = {
  name: 'Enhanced Input - Showcase',
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');
    
    return (
      <div className="max-w-2xl mx-auto space-y-8 p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Enhanced Input Components</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                variant="default"
                placeholder="Default input"
                label="Default"
              />
              <Input
                variant="filled"
                placeholder="Filled input"
                label="Filled"
              />
              <Input
                variant="outlined"
                placeholder="Outlined input"
                label="Outlined"
              />
              <Input
                variant="telegram"
                placeholder="Telegram style"
                label="Telegram"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Floating Labels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                floating
                placeholder=" "
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                floating
                placeholder=" "
                label="Password"
                type="password"
                showPasswordToggle
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">With Icons & States</h3>
            <div className="space-y-4">
              <Input
                leftIcon={<MagnifyingGlassIcon className="h-4 w-4" />}
                placeholder="Search courses..."
                showClearButton
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              
              <Input
                leftIcon={<EnvelopeIcon className="h-4 w-4" />}
                placeholder="user@example.com"
                state="success"
                successMessage="Email format is correct"
              />
              
              <Input
                leftIcon={<LockClosedIcon className="h-4 w-4" />}
                type="password"
                placeholder="Password"
                state="error"
                errorMessage="Password must be at least 8 characters"
                showPasswordToggle
              />
              
              <Input
                leftIcon={<UserIcon className="h-4 w-4" />}
                placeholder="Loading..."
                loading={true}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sizes</h3>
            <div className="space-y-3">
              <Input size="sm" placeholder="Small input" />
              <Input size="md" placeholder="Medium input" />
              <Input size="lg" placeholder="Large input" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const ButtonShowcase: StoryObj = {
  name: 'Enhanced Button - Showcase',
  render: () => {
    const [liked, setLiked] = useState(false);
    
    return (
      <div className="max-w-4xl mx-auto space-y-8 p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Enhanced Button Components</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">Success</Button>
              <Button variant="gradient">Gradient</Button>
              <Button variant="telegram">Telegram</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Sizes</h3>
            <div className="flex flex-wrap items-end gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">With Icons</h3>
            <div className="flex flex-wrap gap-3">
              <Button leftIcon={<PlayIcon className="h-5 w-5" />}>
                Start Course
              </Button>
              <Button 
                variant="outline"
                rightIcon={<ShareIcon className="h-4 w-4" />}
              >
                Share
              </Button>
              <Button
                variant="ghost"
                leftIcon={liked ? <HeartSolidIcon className="h-5 w-5 text-red-500" /> : <HeartIcon className="h-5 w-5" />}
                onClick={() => setLiked(!liked)}
                rippleEffect
              >
                {liked ? 'Liked' : 'Like'}
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">States</h3>
            <div className="flex flex-wrap gap-3">
              <Button loading loadingText="Saving...">
                Save Progress
              </Button>
              <Button disabled>
                Disabled
              </Button>
              <Button fullWidth>
                Full Width Button
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Interactive Effects</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="gradient" 
                rippleEffect 
                animateOnHover
              >
                Ripple Effect
              </Button>
              <Button 
                variant="glassmorphism"
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20"
              >
                Glassmorphism
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const CardShowcase: StoryObj = {
  name: 'Enhanced Card - Showcase',
  render: () => {
    const [cardClicked, setCardClicked] = useState('');
    
    return (
      <div className="max-w-6xl mx-auto space-y-8 p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Enhanced Card Components</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Card Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card variant="default">
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Standard card with subtle shadow and border.
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Card with enhanced shadow for prominence.
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Outlined Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Card with prominent border and hover effects.
                </CardContent>
              </Card>

              <Card variant="filled">
                <CardHeader>
                  <CardTitle>Filled Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Card with filled background for distinction.
                </CardContent>
              </Card>

              <Card variant="glassmorphism">
                <CardHeader>
                  <CardTitle>Glassmorphism</CardTitle>
                </CardHeader>
                <CardContent>
                  Modern glass effect with blur and transparency.
                </CardContent>
              </Card>

              <Card variant="floating">
                <CardHeader>
                  <CardTitle>Floating Card</CardTitle>
                </CardHeader>
                <CardContent>
                  Card with floating animation on hover.
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Interactive Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                variant="elevated"
                interactive
                hapticFeedback
                onCardClick={() => setCardClicked('course')}
                className={cardClicked === 'course' ? 'ring-2 ring-blue-500' : ''}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BookOpenIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Swift Fundamentals</CardTitle>
                      <p className="text-sm text-gray-500">iOS Development</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Learn the basics of Swift programming language for iOS development.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">4.8 (124 reviews)</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg font-bold text-blue-600">$49</span>
                    <Button size="sm" variant="outline">
                      Enroll Now
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card 
                variant="gradient"
                interactive
                shimmer
                onCardClick={() => setCardClicked('premium')}
                className={cardClicked === 'premium' ? 'ring-2 ring-purple-500' : ''}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <StarIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Premium Course</CardTitle>
                      <p className="text-purple-100">Advanced iOS</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    Master advanced iOS development techniques and architecture patterns.
                  </p>
                  <div className="mt-3">
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                    <p className="text-sm text-white/80 mt-1">Progress: 75% complete</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="secondary" 
                    fullWidth
                    leftIcon={<PlayIcon className="h-4 w-4" />}
                  >
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Card Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card size="sm" variant="outlined">
                <CardContent size="sm">
                  <CardTitle>Small Card</CardTitle>
                  <p>Compact card for minimal content.</p>
                </CardContent>
              </Card>

              <Card size="md" variant="elevated">
                <CardContent size="md">
                  <CardTitle>Medium Card</CardTitle>
                  <p>Standard size for most use cases with balanced spacing.</p>
                </CardContent>
              </Card>

              <Card size="lg" variant="floating">
                <CardContent size="lg">
                  <CardTitle>Large Card</CardTitle>
                  <p>Spacious card for detailed content and prominent display.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {cardClicked && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-blue-800">
                <strong>Card clicked:</strong> {cardClicked} (with haptic feedback enabled)
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export const InteractiveDemo: StoryObj = {
  name: 'Complete Interactive Demo',
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      feedback: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', feedback: '' });
      }, 3000);
    };

    if (submitted) {
      return (
        <div className="max-w-md mx-auto">
          <Card variant="gradient" className="text-center">
            <CardContent>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <CardTitle className="text-white mb-2">Thank You!</CardTitle>
              <p className="text-white/90">Your feedback has been submitted successfully.</p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="max-w-md mx-auto">
        <Card variant="elevated">
          <CardHeader>
            <CardTitle>Course Feedback</CardTitle>
            <p className="text-gray-600">Help us improve your learning experience</p>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <Input
                floating
                label="Your Name"
                placeholder=" "
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                leftIcon={<UserIcon className="h-4 w-4" />}
              />
              
              <Input
                floating
                label="Email Address"
                type="email"
                placeholder=" "
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                leftIcon={<EnvelopeIcon className="h-4 w-4" />}
                state={formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'error' : 'default'}
                errorMessage={formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'Please enter a valid email' : undefined}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Feedback
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 resize-none"
                  rows={4}
                  placeholder="Share your thoughts about the course..."
                  value={formData.feedback}
                  onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter>
            <div className="flex gap-3 w-full">
              <Button 
                variant="outline" 
                fullWidth
                onClick={() => setFormData({ name: '', email: '', feedback: '' })}
              >
                Clear
              </Button>
              <Button
                variant="primary"
                fullWidth
                loading={isSubmitting}
                loadingText="Submitting..."
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || !formData.feedback || !/\S+@\S+\.\S+/.test(formData.email)}
                rippleEffect
                hapticFeedback
              >
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
};