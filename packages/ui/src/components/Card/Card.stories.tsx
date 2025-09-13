import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <h3 className="font-semibold text-lg mb-2">Card Title</h3>
        <p className="text-sm opacity-70">
          This is a default card with some content inside. It has a border and background.
        </p>
      </>
    ),
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <h3 className="font-semibold text-lg mb-2">Outlined Card</h3>
        <p className="text-sm opacity-70">
          This is an outlined card with a thicker border for more emphasis.
        </p>
      </>
    ),
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <h3 className="font-semibold text-lg mb-2">Elevated Card</h3>
        <p className="text-sm opacity-70">
          This is an elevated card with a shadow to make it appear raised.
        </p>
      </>
    ),
  },
}

export const PaddingVariations: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <Card padding="none">
        <div className="p-2 bg-blue-100 rounded">
          <h4 className="font-medium">No Padding</h4>
          <p className="text-xs">Custom content padding</p>
        </div>
      </Card>
      
      <Card padding="sm">
        <h4 className="font-medium">Small Padding</h4>
        <p className="text-xs">Compact layout</p>
      </Card>
      
      <Card padding="md">
        <h4 className="font-medium">Medium Padding</h4>
        <p className="text-xs">Default spacing</p>
      </Card>
      
      <Card padding="lg">
        <h4 className="font-medium">Large Padding</h4>
        <p className="text-xs">Spacious layout</p>
      </Card>
    </div>
  ),
}

export const Interactive: Story = {
  args: {
    className: 'cursor-pointer hover:shadow-md transition-shadow',
    children: (
      <>
        <h3 className="font-semibold text-lg mb-2">Interactive Card</h3>
        <p className="text-sm opacity-70">
          This card has hover effects and can be clicked.
        </p>
        <div className="mt-4 flex gap-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
            Action
          </button>
          <button className="px-3 py-1 border rounded text-sm">
            Cancel
          </button>
        </div>
      </>
    ),
  },
}

export const WithImage: Story = {
  args: {
    padding: 'none',
    children: (
      <>
        <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-lg"></div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">Card with Image</h3>
          <p className="text-sm opacity-70">
            This card contains an image header and content below.
          </p>
        </div>
      </>
    ),
  },
}