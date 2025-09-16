import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ModernNavigation, ModernModal, ModernToggle, ModernButton, ModernCard, ModernInput } from '../../../src/components/Modern';
import { 
  HomeIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const meta = {
  title: 'Design System 3.0/00-Modern/Advanced Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Ultra-Modern Advanced Components

Продвинутые компоненты с самыми современными эффектами и анимациями.

## 🧭 ModernNavigation
- iOS, Telegram, Discord стили
- Floating particles и magnetic effects
- Haptic feedback для Telegram WebApp
- Адаптивные индикаторы

## 🪟 ModernModal  
- Glassmorphism и премиум градиенты
- Particle effects и morphing background
- Shimmer анимации
- Keyboard navigation

## 🎛️ ModernToggle
- 8+ стилей включая neon и premium
- Sparkle effects при активации
- Магнитные и морфинг анимации
- Haptic feedback
        `
      }
    },
    backgrounds: {
      default: 'dark-gradient',
      values: [
        {
          name: 'dark-gradient',
          value: 'linear-gradient(135deg, #1e293b 0%, #3730a3 50%, #7c3aed 100%)'
        }
      ]
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModernNavigationShowcase: Story = {
  name: '🧭 Ultra-Modern Navigation',
  render: () => {
    const [activeItem, setActiveItem] = useState('home');
    const [showModal, setShowModal] = useState(false);
    
    const navigationItems = [
      { id: 'home', label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
      { id: 'courses', label: 'Courses', icon: <ChartBarIcon className="w-6 h-6" />, badge: '3' },
      { id: 'notifications', label: 'Alerts', icon: <BellIcon className="w-6 h-6" />, badge: '12' },
      { id: 'settings', label: 'Settings', icon: <CogIcon className="w-6 h-6" /> },
    ];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative">
        {/* Content */}
        <div className="p-8 pb-32">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ultra-Modern Navigation
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Навигация будущего с продвинутыми эффектами и анимациями
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <ModernCard key={i} variant="glass" className="h-48">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto">
                      <StarIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Content {i + 1}</h3>
                    <p className="text-white/70">Lorem ipsum dolor sit amet</p>
                  </div>
                </ModernCard>
              ))}
            </div>

            <div className="text-center">
              <ModernButton 
                variant="premium" 
                onClick={() => setShowModal(true)}
                sparkleEffect
              >
                Open Modal
              </ModernButton>
            </div>
          </div>
        </div>

        {/* iOS Style Navigation */}
        <ModernNavigation
          variant="ios"
          position="bottom"
          items={navigationItems}
          activeItem={activeItem}
          onItemClick={setActiveItem}
          showActiveIndicator
          hapticFeedback
          particleEffect
        />

        {/* Floating Navigation Alternative */}
        <ModernNavigation
          variant="glass"
          position="floating"
          items={navigationItems.slice(0, 3)}
          activeItem={activeItem}
          onItemClick={setActiveItem}
          showActiveIndicator
          magneticEffect
          glowEffect
          className="bottom-24"
        />

        {/* Modal */}
        <ModernModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          variant="glass"
          title="Ultra-Modern Modal"
          particleEffect
          morphingBackground
          glowEffect
        >
          <div className="space-y-4">
            <p className="text-white/80">
              Это пример модального окна с glassmorphism эффектами и продвинутыми анимациями.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <ModernToggle 
                variant="glass" 
                label="Notifications" 
                sparkleEffect 
                hapticFeedback 
              />
              <ModernToggle 
                variant="neon" 
                label="Dark Mode" 
                glowEffect 
                morphingAnimation 
              />
            </div>
          </div>
        </ModernModal>
      </div>
    );
  }
};

export const ModernModalShowcase: Story = {
  name: '🪟 Ultra-Modern Modals',
  render: () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    
    const modals = [
      { id: 'glass', variant: 'glass' as const, title: 'Glassmorphism Modal' },
      { id: 'premium', variant: 'premium' as const, title: 'Premium Modal' },
      { id: 'neon', variant: 'neon' as const, title: 'Neon Cyber Modal' },
      { id: 'ios', variant: 'ios' as const, title: 'iOS Style Modal' },
    ];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Ultra-Modern Modals
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Модальные окна будущего с glassmorphism и продвинутыми эффектами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modals.map((modal) => (
              <ModernCard 
                key={modal.id}
                variant="glass" 
                className="cursor-pointer"
                onCardClick={() => setActiveModal(modal.id)}
              >
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{modal.title}</h3>
                  <p className="text-white/70">Click to open modal</p>
                  <ModernButton variant="minimal" size="sm">
                    Open Modal
                  </ModernButton>
                </div>
              </ModernCard>
            ))}
          </div>
        </div>

        {/* Modals */}
        {modals.map((modal) => (
          <ModernModal
            key={modal.id}
            isOpen={activeModal === modal.id}
            onClose={() => setActiveModal(null)}
            variant={modal.variant}
            title={modal.title}
            particleEffect
            morphingBackground
            glowEffect
            shimmerEffect
          >
            <div className="space-y-6">
              <p className={`${modal.variant === 'dark' || modal.variant === 'neon' ? 'text-white/80' : 'text-gray-600'}`}>
                Это пример {modal.title.toLowerCase()} с продвинутыми эффектами и анимациями.
              </p>
              
              <div className="space-y-4">
                <ModernInput
                  variant={modal.variant === 'neon' ? 'neon' : 'glass'}
                  floatingLabel
                  label="Your Name"
                  glowEffect
                />
                
                <div className="flex items-center justify-between">
                  <ModernToggle 
                    variant={modal.variant === 'neon' ? 'neon' : modal.variant === 'premium' ? 'premium' : 'glass'}
                    label="Enable notifications" 
                    sparkleEffect 
                    hapticFeedback 
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <ModernButton 
                  variant="minimal" 
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </ModernButton>
                <ModernButton 
                  variant={modal.variant === 'neon' ? 'neon' : 'premium'}
                  sparkleEffect
                  hapticFeedback
                >
                  Confirm
                </ModernButton>
              </div>
            </div>
          </ModernModal>
        ))}
      </div>
    );
  }
};

export const ModernToggleShowcase: Story = {
  name: '🎛️ Ultra-Modern Toggles',
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      hapticFeedback: true,
      autoSave: false,
      premium: true,
      cybersecurity: false,
      glassmorphism: true,
      animations: true,
    });
    
    const updateSetting = (key: string, value: boolean) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Ultra-Modern Toggles
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Переключатели будущего с анимированными эффектами
            </p>
          </div>

          {/* Settings Panel */}
          <ModernCard variant="glass" size="lg">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white text-center">App Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModernToggle
                  variant="ios"
                  label="Push Notifications"
                  description="Receive updates about courses"
                  checked={settings.notifications}
                  onToggle={(checked) => updateSetting('notifications', checked)}
                  hapticFeedback
                  glowEffect
                  leftIcon={<BellIcon className="w-5 h-5 text-blue-400" />}
                />
                
                <ModernToggle
                  variant="telegram"
                  label="Dark Mode"
                  description="Use dark theme"
                  checked={settings.darkMode}
                  onToggle={(checked) => updateSetting('darkMode', checked)}
                  morphingAnimation
                  sparkleEffect
                />
                
                <ModernToggle
                  variant="premium"
                  label="Premium Features"
                  description="Access premium content"
                  checked={settings.premium}
                  onToggle={(checked) => updateSetting('premium', checked)}
                  sparkleEffect
                  hapticFeedback
                  rightIcon={<StarSolidIcon className="w-5 h-5 text-orange-400" />}
                />
                
                <ModernToggle
                  variant="neon"
                  label="Cybersecurity Mode"
                  description="Enhanced security features"
                  checked={settings.cybersecurity}
                  onToggle={(checked) => updateSetting('cybersecurity', checked)}
                  glowEffect
                  morphingAnimation
                />
                
                <ModernToggle
                  variant="glass"
                  label="Glassmorphism UI"
                  description="Use transparent effects"
                  checked={settings.glassmorphism}
                  onToggle={(checked) => updateSetting('glassmorphism', checked)}
                  magneticEffect
                  hapticFeedback
                />
                
                <ModernToggle
                  variant="minimal"
                  label="Smooth Animations"
                  description="Enable UI animations"
                  checked={settings.animations}
                  onToggle={(checked) => updateSetting('animations', checked)}
                  morphingAnimation
                />
                
                <ModernToggle
                  variant="floating"
                  label="Haptic Feedback"
                  description="Vibration on interactions"
                  checked={settings.hapticFeedback}
                  onToggle={(checked) => updateSetting('hapticFeedback', checked)}
                  hapticFeedback
                  sparkleEffect
                />
                
                <ModernToggle
                  variant="notion"
                  label="Auto Save"
                  description="Save changes automatically"
                  checked={settings.autoSave}
                  onToggle={(checked) => updateSetting('autoSave', checked)}
                  glowEffect
                />
              </div>
            </div>
          </ModernCard>

          {/* Size Variants */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Size Variants</h2>
            <ModernCard variant="dark" size="lg">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <ModernToggle variant="ios" size="sm" label="Small" />
                <ModernToggle variant="telegram" size="md" label="Medium" />
                <ModernToggle variant="premium" size="lg" label="Large" sparkleEffect />
                <ModernToggle variant="neon" size="xl" label="Extra Large" glowEffect />
              </div>
            </ModernCard>
          </div>

          {/* Interactive Demo */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Interactive Demo</h2>
            <ModernCard variant="premium" size="lg">
              <div className="text-center space-y-6">
                <h3 className="text-xl font-bold">iOS Academy Premium</h3>
                <p className="text-gray-600">Unlock all features with premium subscription</p>
                
                <div className="flex justify-center">
                  <ModernToggle
                    variant="premium"
                    size="lg"
                    label="Activate Premium"
                    description="$9.99/month - Cancel anytime"
                    checked={settings.premium}
                    onToggle={(checked) => updateSetting('premium', checked)}
                    sparkleEffect
                    morphingAnimation
                    hapticFeedback
                    rightIcon={<StarSolidIcon className="w-6 h-6 text-orange-400" />}
                  />
                </div>
                
                {settings.premium && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl">
                    <p className="text-orange-800 font-semibold">🎉 Premium activated! Welcome to iOS Academy Pro!</p>
                  </div>
                )}
              </div>
            </ModernCard>
          </div>
        </div>
      </div>
    );
  }
};