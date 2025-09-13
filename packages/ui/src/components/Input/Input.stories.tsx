import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'url'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter some text...',
  },
}

export const WithValue: Story = {
  args: {
    value: 'Hello world',
    placeholder: 'Enter some text...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email...',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Input size="xs" placeholder="Extra Small" />
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
      <Input size="xl" placeholder="Extra Large" />
    </div>
  ),
}

export const WithError: Story = {
  args: {
    error: true,
    placeholder: 'This input has an error',
    value: 'Invalid value',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'This input is disabled',
  },
}

export const WithLeftAddon: Story = {
  args: {
    placeholder: 'Search...',
    leftAddon: <span>🔍</span>,
  },
}

export const WithRightAddon: Story = {
  args: {
    placeholder: 'Enter amount',
    rightAddon: <span>USD</span>,
  },
}

export const WithBothAddons: Story = {
  args: {
    placeholder: 'Enter URL',
    leftAddon: <span>https://</span>,
    rightAddon: <span>.com</span>,
  },
}