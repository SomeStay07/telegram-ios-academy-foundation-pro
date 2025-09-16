import type { Meta, StoryObj } from '@storybook/react'
import { BottomNavigation } from './BottomNavigation'
import { Home, Search, Heart, User, Bell, Settings, BookOpen, Trophy } from 'lucide-react'

const meta = {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A bottom navigation component designed for mobile apps and Telegram Mini Apps.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'minimal'],
      description: 'Visual style of the navigation'
    },
    activeId: {
      control: 'text',
      description: 'ID of the currently active item'
    }
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] bg-background border border-border rounded-lg overflow-hidden">
        <div className="h-full bg-gradient-to-b from-muted/20 to-muted/40 flex items-center justify-center">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">App Content</h3>
            <p className="text-sm text-muted-foreground">Bottom navigation appears at the bottom</p>
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
    icon: <Home className="w-5 h-5" />,
    activeIcon: <Home className="w-5 h-5 fill-current" />,
  },
  {
    id: 'search',
    label: 'Search',
    icon: <Search className="w-5 h-5" />,
    activeIcon: <Search className="w-5 h-5 fill-current" />,
  },
  {
    id: 'favorites',
    label: 'Favorites',
    icon: <Heart className="w-5 h-5" />,
    activeIcon: <Heart className="w-5 h-5 fill-current" />,
    badge: 3,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="w-5 h-5" />,
    activeIcon: <User className="w-5 h-5 fill-current" />,
  },
]

const academyItems = [
  {
    id: 'courses',
    label: 'Courses',
    icon: <BookOpen className="w-5 h-5" />,
    activeIcon: <BookOpen className="w-5 h-5 fill-current" />,
  },
  {
    id: 'search',
    label: 'Search',
    icon: <Search className="w-5 h-5" />,
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: <Trophy className="w-5 h-5" />,
    activeIcon: <Trophy className="w-5 h-5 fill-current" />,
    badge: 'New',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell className="w-5 h-5" />,
    badge: 12,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="w-5 h-5" />,
    activeIcon: <User className="w-5 h-5 fill-current" />,
  },
]

const itemsWithDisabled = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
  },
  {
    id: 'search',
    label: 'Search',
    icon: <Search className="w-5 h-5" />,
    disabled: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
  },
]

export const Default: Story = {
  args: {
    items: basicItems,
    activeId: 'home',
    variant: 'default',
  },
}

export const Filled: Story = {
  args: {
    items: basicItems,
    activeId: 'favorites',
    variant: 'filled',
  },
}

export const Minimal: Story = {
  args: {
    items: basicItems,
    activeId: 'search',
    variant: 'minimal',
  },
}

export const WithBadges: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <Home className="w-5 h-5" />,
      },
      {
        id: 'messages',
        label: 'Messages',
        icon: <Bell className="w-5 h-5" />,
        badge: 99,
      },
      {
        id: 'favorites',
        label: 'Favorites',
        icon: <Heart className="w-5 h-5" />,
        badge: 'New',
      },
      {
        id: 'profile',
        label: 'Profile', 
        icon: <User className="w-5 h-5" />,
        badge: 150,
      },
    ],
    activeId: 'home',
    variant: 'default',
  },
}

export const AcademyApp: Story = {
  args: {
    items: academyItems,
    activeId: 'courses',
    variant: 'default',
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
        icon: <BookOpen className="w-5 h-5" />,
        activeIcon: <BookOpen className="w-5 h-5 fill-current" />,
      },
      {
        id: 'profile',
        label: 'Profile',
        icon: <User className="w-5 h-5" />,
        activeIcon: <User className="w-5 h-5 fill-current" />,
      },
    ],
    activeId: 'learn',
    variant: 'filled',
  },
}

export const Interactive: Story = {
  args: {
    items: basicItems,
    activeId: 'home',
    variant: 'default',
    onItemClick: (item) => {
      console.log('Clicked:', item.label)
    },
  },
}