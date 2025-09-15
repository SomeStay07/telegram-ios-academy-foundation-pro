import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'
import { User, Settings, Bell, Home, Search, Heart } from 'lucide-react'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible tabs component with multiple variants and sizes, designed for Telegram Mini Apps.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
      description: 'Visual style of the tabs'
    },
    size: {
      control: 'select', 
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tabs'
    },
    defaultId: {
      control: 'text',
      description: 'ID of the tab that should be active by default'
    }
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const sampleTabs = [
  {
    id: 'home',
    label: 'Home',
    content: (
      <div className="p-4 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Home Content</h3>
        <p className="text-muted-foreground">
          Welcome to the home tab! This is where you'll find the main content and overview.
        </p>
      </div>
    ),
  },
  {
    id: 'profile', 
    label: 'Profile',
    content: (
      <div className="p-4 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
        <p className="text-muted-foreground">
          Manage your profile information, preferences, and account settings here.
        </p>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings', 
    content: (
      <div className="p-4 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Application Settings</h3>
        <p className="text-muted-foreground">
          Configure app preferences, notifications, and other system settings.
        </p>
      </div>
    ),
  },
]

const tabsWithIcons = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="w-4 h-4" />,
    content: (
      <div className="p-4 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Home className="w-5 h-5" />
          Home Dashboard
        </h3>
        <p className="text-muted-foreground">
          Your main dashboard with overview and quick actions.
        </p>
      </div>
    ),
  },
  {
    id: 'search',
    label: 'Search',
    icon: <Search className="w-4 h-4" />,
    content: (
      <div className="p-4 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search & Discovery
        </h3>
        <p className="text-muted-foreground">
          Find content, users, and resources across the platform.
        </p>
      </div>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User className="w-4 h-4" />,
    content: (
      <div className="p-4 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <User className="w-5 h-5" />
          User Profile
        </h3>
        <p className="text-muted-foreground">
          Manage your personal information and preferences.
        </p>
      </div>
    ),
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell className="w-4 h-4" />,
    disabled: true,
    content: (
      <div className="p-4 bg-muted/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <p className="text-muted-foreground">This tab is disabled.</p>
      </div>
    ),
  },
]

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    defaultId: 'home',
    variant: 'default',
    size: 'md',
  },
}

export const Pills: Story = {
  args: {
    tabs: sampleTabs,
    defaultId: 'profile',
    variant: 'pills',
    size: 'md',
  },
}

export const Underline: Story = {
  args: {
    tabs: sampleTabs,
    defaultId: 'settings',
    variant: 'underline', 
    size: 'md',
  },
}

export const WithIcons: Story = {
  args: {
    tabs: tabsWithIcons,
    defaultId: 'home',
    variant: 'pills',
    size: 'md',
  },
}

export const SmallSize: Story = {
  args: {
    tabs: sampleTabs,
    defaultId: 'home',
    variant: 'pills',
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    tabs: sampleTabs,
    defaultId: 'home', 
    variant: 'default',
    size: 'lg',
  },
}

export const MobileFriendly: Story = {
  args: {
    tabs: [
      {
        id: 'feed',
        label: 'Feed',
        icon: <Home className="w-4 h-4" />,
        content: (
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Latest Updates</h4>
              <p className="text-sm text-muted-foreground">Stay up to date with the latest news and updates.</p>
            </div>
            <div className="p-4 bg-card border border-border rounded-lg">
              <h4 className="font-semibold mb-2">Trending Topics</h4>
              <p className="text-sm text-muted-foreground">Discover what's trending in your community.</p>
            </div>
          </div>
        ),
      },
      {
        id: 'favorites',
        label: 'Saved',
        icon: <Heart className="w-4 h-4" />,
        content: (
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <Heart className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <h4 className="font-semibold mb-1">No saved items</h4>
            <p className="text-sm text-muted-foreground">Items you save will appear here.</p>
          </div>
        ),
      },
      {
        id: 'profile',
        label: 'You',
        icon: <User className="w-4 h-4" />,
        content: (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <p className="text-sm text-muted-foreground">@johndoe</p>
              </div>
            </div>
          </div>
        ),
      },
    ],
    defaultId: 'feed',
    variant: 'underline',
    size: 'sm',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}