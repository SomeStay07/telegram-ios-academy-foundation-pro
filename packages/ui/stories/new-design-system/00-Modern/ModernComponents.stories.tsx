import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ModernButton, ModernCard, ModernInput, ModernNavigation, ModernModal, ModernToggle } from '../../../src/components/Modern';
import { 
  PlayIcon, 
  StarIcon, 
  HeartIcon,
  RocketLaunchIcon,
  SparklesIcon,
  FireIcon,
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const meta = {
  title: 'Design System 3.0/00-Modern/Ultra-Modern Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Ultra-Modern Components

Самые современные компоненты, вдохновленные топовыми mini apps и мобильными приложениями. Включают продвинутые эффекты, анимации и интерактивности.

## 🎨 Вдохновение от лучших приложений

- **Duolingo** - премиум градиенты и геймификация
- **Notion** - элегантный минимализм
- **Linear** - темные темы с неоновыми акцентами  
- **Discord** - floating карточки и glassmorphism
- **iOS Apps** - нативные эффекты и анимации
- **Telegram Mini Apps** - современная интерактивность

## ✨ Современные фичи

- Sparkle effects при клике
- Floating particles
- Magnetic effects
- Tilt interactions
- Glassmorphism
- Neon glows
- Premium gradients
- Haptic feedback
        `
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

export const ModernButtonShowcase: StoryObj = {
  name: '🚀 Ultra-Modern Buttons',
  render: () => {
    const [liked, setLiked] = useState(false);
    const [starred, setStarred] = useState(false);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Ultra-Modern Buttons
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Кнопки будущего с продвинутыми эффектами и анимациями
            </p>
          </div>

          {/* Premium Gradients */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">🎨 Premium Gradients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ModernButton 
                variant="primary" 
                sparkleEffect 
                hapticFeedback
                leftIcon={<RocketLaunchIcon className="w-5 h-5" />}
              >
                Launch App
              </ModernButton>
              
              <ModernButton 
                variant="success" 
                sparkleEffect 
                leftIcon={<StarIcon className="w-5 h-5" />}
              >
                Complete
              </ModernButton>
              
              <ModernButton 
                variant="premium" 
                sparkleEffect 
                pulseOnHover
                leftIcon={<SparklesIcon className="w-5 h-5" />}
              >
                Go Premium
              </ModernButton>
              
              <ModernButton 
                variant="neon" 
                sparkleEffect
                leftIcon={<FireIcon className="w-5 h-5" />}
              >
                Activate
              </ModernButton>
            </div>
          </div>

          {/* Interactive Effects */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">⚡ Interactive Effects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ModernButton 
                variant="dark" 
                size="lg"
                sparkleEffect
                hapticFeedback
                leftIcon={liked ? <HeartSolidIcon className="w-6 h-6 text-red-500" /> : <HeartIcon className="w-6 h-6" />}
                onClick={() => setLiked(!liked)}
              >
                {liked ? 'Liked!' : 'Like'}
              </ModernButton>
              
              <ModernButton 
                variant="glass" 
                size="lg"
                sparkleEffect
                leftIcon={starred ? <StarSolidIcon className="w-6 h-6 text-yellow-500" /> : <StarIcon className="w-6 h-6" />}
                onClick={() => setStarred(!starred)}
              >
                {starred ? 'Starred!' : 'Star'}
              </ModernButton>
              
              <ModernButton 
                variant="destructive" 
                size="lg"
                sparkleEffect
                hapticFeedback
                leftIcon={<PlayIcon className="w-6 h-6" />}
              >
                Play Now
              </ModernButton>
            </div>
          </div>

          {/* Loading States */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">⏳ Loading States</h2>
            <div className="flex flex-wrap gap-4">
              <ModernButton variant="primary" loading loadingText="Processing...">
                Submit Form
              </ModernButton>
              
              <ModernButton variant="success" loading loadingText="Saving...">
                Save Changes
              </ModernButton>
              
              <ModernButton variant="premium" loading loadingText="Upgrading...">
                Upgrade Account
              </ModernButton>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">📐 All Sizes</h2>
            <div className="flex flex-wrap items-end gap-4">
              <ModernButton variant="primary" size="xs" sparkleEffect>Extra Small</ModernButton>
              <ModernButton variant="primary" size="sm" sparkleEffect>Small</ModernButton>
              <ModernButton variant="primary" size="md" sparkleEffect>Medium</ModernButton>
              <ModernButton variant="primary" size="lg" sparkleEffect>Large</ModernButton>
              <ModernButton variant="primary" size="xl" sparkleEffect>Extra Large</ModernButton>
            </div>
          </div>

          {/* Full Width */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">📱 Full Width</h2>
            <ModernButton 
              variant="premium" 
              size="lg" 
              fullWidth 
              sparkleEffect 
              hapticFeedback
              leftIcon={<SparklesIcon className="w-6 h-6" />}
            >
              Unlock Premium Features
            </ModernButton>
          </div>
        </div>
      </div>
    );
  }
};

export const ModernCardShowcase: StoryObj = {
  name: '🎴 Ultra-Modern Cards',
  render: () => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              Ultra-Modern Cards
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Интерактивные карточки с продвинутыми эффектами
            </p>
          </div>

          {/* Premium Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">💎 Premium Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModernCard 
                variant="premium" 
                shimmerEffect 
                hapticFeedback
                tiltEffect
                onCardClick={() => setSelectedCard('premium')}
                className={selectedCard === 'premium' ? 'ring-4 ring-yellow-400' : ''}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Premium Plan</h3>
                  <p className="text-yellow-100">Unlock all features and premium content</p>
                  <div className="text-3xl font-bold text-white">$9.99/mo</div>
                </div>
              </ModernCard>

              <ModernCard 
                variant="neon" 
                shimmerEffect 
                floatingParticles
                hapticFeedback
                onCardClick={() => setSelectedCard('neon')}
                className={selectedCard === 'neon' ? 'ring-4 ring-cyan-400' : ''}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto">
                    <FireIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-100">Cyber Course</h3>
                  <p className="text-cyan-200">Advanced iOS development with SwiftUI</p>
                  <div className="text-2xl font-bold text-cyan-100">Level 15</div>
                </div>
              </ModernCard>

              <ModernCard 
                variant="glass" 
                shimmerEffect 
                magneticEffect
                hapticFeedback
                onCardClick={() => setSelectedCard('glass')}
                className={selectedCard === 'glass' ? 'ring-4 ring-white/50' : ''}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto">
                    <RocketLaunchIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Swift Basics</h3>
                  <p className="text-white/80">Start your iOS development journey</p>
                  <div className="text-lg font-semibold text-white">Free</div>
                </div>
              </ModernCard>
            </div>
          </div>

          {/* Interactive Cards */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">🎮 Interactive Effects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ModernCard 
                variant="floating" 
                floatingParticles 
                tiltEffect 
                hapticFeedback
                size="lg"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Floating Card</h3>
                  <p className="text-gray-600">Наведите мышь для 3D эффекта и floating particles</p>
                  <div className="flex gap-2">
                    <ModernButton variant="primary" size="sm">Explore</ModernButton>
                    <ModernButton variant="minimal" size="sm">Learn More</ModernButton>
                  </div>
                </div>
              </ModernCard>

              <ModernCard 
                variant="elegant" 
                magneticEffect 
                shimmerEffect 
                hapticFeedback
                size="lg"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Magnetic Card</h3>
                  <p className="text-gray-600">Карточка следует за курсором с магнитным эффектом</p>
                  <div className="flex gap-2">
                    <ModernButton variant="success" size="sm">Try It</ModernButton>
                    <ModernButton variant="minimal" size="sm">Details</ModernButton>
                  </div>
                </div>
              </ModernCard>
            </div>
          </div>

          {selectedCard && (
            <div className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-white">
              <p className="font-semibold">Selected: {selectedCard} card</p>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export const ModernInputShowcase: StoryObj = {
  name: '📝 Ultra-Modern Inputs',
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');
    const [username, setUsername] = useState('');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Ultra-Modern Inputs
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Поля ввода будущего с крутыми эффектами и анимациями
            </p>
          </div>

          {/* Glassmorphism */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">✨ Glassmorphism Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernInput
                variant="glass"
                floatingLabel
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<EnvelopeIcon className="w-5 h-5" />}
                glowEffect
              />
              
              <ModernInput
                variant="glass"
                floatingLabel
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<LockClosedIcon className="w-5 h-5" />}
                animatedBorder
              />
            </div>
          </div>

          {/* Premium Effects */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">💎 Premium Effects</h2>
            <div className="space-y-4">
              <ModernInput
                variant="premium"
                floatingLabel
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                leftIcon={<UserIcon className="w-5 h-5" />}
                particleEffect
                magneticLabel
              />
              
              <ModernInput
                variant="neon"
                floatingLabel
                label="Search Courses"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<MagnifyingGlassIcon className="w-5 h-5" />}
                glowEffect
                animatedBorder
              />
            </div>
          </div>

          {/* Modern Variants */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">🎨 Modern Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernInput
                variant="clean"
                floatingLabel
                label="Clean Style"
                placeholder="Type something..."
                glowEffect
              />
              
              <ModernInput
                variant="floating"
                floatingLabel
                label="Floating Underline"
                placeholder="Minimalist design"
                animatedBorder
              />
              
              <ModernInput
                variant="soft"
                floatingLabel
                label="Soft Modern"
                placeholder="Gentle colors"
              />
              
              <ModernInput
                variant="minimal"
                floatingLabel
                label="Minimal Design"
                placeholder="Clean and simple"
              />
            </div>
          </div>

          {/* States */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">🎯 Input States</h2>
            <div className="space-y-4">
              <ModernInput
                variant="clean"
                label="Success State"
                value="valid@example.com"
                state="success"
                successMessage="Email format is correct!"
                leftIcon={<EnvelopeIcon className="w-5 h-5" />}
              />
              
              <ModernInput
                variant="clean"
                label="Error State"
                value="invalid-email"
                state="error"
                errorMessage="Please enter a valid email address"
                leftIcon={<EnvelopeIcon className="w-5 h-5" />}
              />
              
              <ModernInput
                variant="clean"
                label="Loading State"
                placeholder="Checking availability..."
                loading
                leftIcon={<UserIcon className="w-5 h-5" />}
              />
            </div>
          </div>

          {/* Complete Form Example */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">📋 Complete Form</h2>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white text-center">Join iOS Academy</h3>
              
              <div className="space-y-4">
                <ModernInput
                  variant="glass"
                  floatingLabel
                  label="Full Name"
                  leftIcon={<UserIcon className="w-5 h-5" />}
                  glowEffect
                />
                
                <ModernInput
                  variant="glass"
                  floatingLabel
                  label="Email Address"
                  type="email"
                  leftIcon={<EnvelopeIcon className="w-5 h-5" />}
                  particleEffect
                />
                
                <ModernInput
                  variant="glass"
                  floatingLabel
                  label="Password"
                  type="password"
                  leftIcon={<LockClosedIcon className="w-5 h-5" />}
                  animatedBorder
                />
              </div>
              
              <ModernButton 
                variant="premium" 
                size="lg" 
                fullWidth 
                sparkleEffect 
                hapticFeedback
              >
                Create Account
              </ModernButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
};