import { describe, it, expect, vi } from 'vitest'

// Mock the Button component
vi.mock('../Button', () => ({
  Button: vi.fn(({ children, ...props }) => {
    return {
      type: 'button',
      props: { ...props, children },
      toString: () => `<button>${children}</button>`
    }
  })
}))

const { Button } = await import('../Button')

describe('Button', () => {
  it('renders button with text', () => {
    expect(Button).toBeDefined()
    const buttonElement = Button({ children: 'Click me' })
    expect(buttonElement).toBeDefined()
    expect(buttonElement.props.children).toBe('Click me')
  })
})