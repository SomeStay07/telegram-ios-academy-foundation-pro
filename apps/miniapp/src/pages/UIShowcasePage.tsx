import React, { useState } from 'react';
import { 
  Text, 
  Heading, 
  Button, 
  Input, 
  Card, 
  Stack, 
  Link, 
  Icon, 
  Divider,
  CodeBlock,
  Markdown
} from '@telegram-ios-academy/ui';

const UIShowcasePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');

  const codeExample = `function greetUser(name: string) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to Telegram iOS Academy!\`;
}

greetUser('Developer');`;

  const markdownExample = `# Design System Showcase

This is a **comprehensive showcase** of our UI components built with:

- Design tokens for consistent theming
- Accessibility features (RTL, A11y)
- Security (sanitized HTML, XSS protection)
- Tree-shaking for optimal bundle size

## Features

1. **Typography** - Text and Heading components
2. **Interactive** - Buttons and Inputs  
3. **Layout** - Cards, Stacks, and Dividers
4. **Content** - Code blocks and Markdown rendering

> All components use design tokens and follow Telegram's design system.`;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Stack direction="column" spacing="lg">
        {/* Header */}
        <Stack direction="column" spacing="md">
          <Heading level={1} size="2xl">
            UI Component Showcase
          </Heading>
          <Text size="lg" color="secondary">
            Comprehensive demo of the Telegram iOS Academy Design System components
          </Text>
        </Stack>

        <Divider />

        {/* Typography Section */}
        <Stack direction="column" spacing="md">
          <Heading level={2} size="xl">Typography</Heading>
          <Card>
            <Stack direction="column" spacing="md">
              <Heading level={3} size="lg">Headings</Heading>
              <Heading level={1} size="2xl">Heading Level 1 (2xl)</Heading>
              <Heading level={2} size="xl">Heading Level 2 (xl)</Heading>
              <Heading level={3} size="lg">Heading Level 3 (lg)</Heading>
              <Heading level={4} size="md">Heading Level 4 (md)</Heading>
              
              <Divider />
              
              <Heading level={3} size="lg">Text Variants</Heading>
              <Text size="xl">Extra large text (xl)</Text>
              <Text size="lg">Large text (lg)</Text>
              <Text size="md">Medium text (md)</Text>
              <Text size="sm">Small text (sm)</Text>
              <Text size="xs">Extra small text (xs)</Text>
              
              <Text color="secondary">Secondary colored text</Text>
              <Text color="error">Error colored text</Text>
              <Text weight="bold">Bold weighted text</Text>
              <Text weight="semibold">Semibold weighted text</Text>
            </Stack>
          </Card>
        </Stack>

        {/* Interactive Components */}
        <Stack direction="column" spacing="md">
          <Heading level={2} size="xl">Interactive Components</Heading>
          <Card>
            <Stack direction="column" spacing="md">
              <Heading level={3} size="lg">Buttons</Heading>
              <Stack direction="row" spacing="md" wrap>
                <Button variant="primary" size={selectedSize}>
                  Primary Button
                </Button>
                <Button variant="secondary" size={selectedSize}>
                  Secondary Button
                </Button>
                <Button variant="outline" size={selectedSize}>
                  Outline Button
                </Button>
                <Button variant="ghost" size={selectedSize}>
                  Ghost Button
                </Button>
                <Button variant="primary" size={selectedSize} disabled>
                  Disabled Button
                </Button>
              </Stack>

              <Stack direction="row" spacing="sm">
                <Text size="sm">Button Size:</Text>
                <Button 
                  variant={selectedSize === 'sm' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedSize('sm')}
                >
                  SM
                </Button>
                <Button 
                  variant={selectedSize === 'md' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedSize('md')}
                >
                  MD
                </Button>
                <Button 
                  variant={selectedSize === 'lg' ? 'primary' : 'ghost'} 
                  size="sm"
                  onClick={() => setSelectedSize('lg')}
                >
                  LG
                </Button>
              </Stack>

              <Divider />

              <Heading level={3} size="lg">Input Fields</Heading>
              <Stack direction="column" spacing="sm">
                <Input
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Input
                  placeholder="Disabled input"
                  disabled
                />
                <Input
                  placeholder="Error state input"
                  value="invalid@"
                  error="Please enter a valid email"
                />
              </Stack>

              <Divider />

              <Heading level={3} size="lg">Links and Icons</Heading>
              <Stack direction="column" spacing="sm">
                <Link href="https://telegram.org" external>
                  External Link to Telegram
                </Link>
                <Link href="/lesson/1">
                  Internal Link (to lesson)
                </Link>
                <Stack direction="row" spacing="sm" align="center">
                  <Icon name="info" size="sm" />
                  <Text size="sm">Icon with text</Text>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Stack>

        {/* Layout Components */}
        <Stack direction="column" spacing="md">
          <Heading level={2} size="xl">Layout Components</Heading>
          
          <Stack direction="row" spacing="md" wrap>
            <Card style={{ flex: 1, minWidth: '200px' }}>
              <Stack direction="column" spacing="sm">
                <Heading level={4} size="md">Card 1</Heading>
                <Text size="sm">This is a card component with some content inside.</Text>
                <Button variant="outline" size="sm">Action</Button>
              </Stack>
            </Card>
            
            <Card style={{ flex: 1, minWidth: '200px' }}>
              <Stack direction="column" spacing="sm">
                <Heading level={4} size="md">Card 2</Heading>
                <Text size="sm">Cards can contain any content and are flexible containers.</Text>
                <Button variant="primary" size="sm">Primary Action</Button>
              </Stack>
            </Card>
            
            <Card style={{ flex: 1, minWidth: '200px' }}>
              <Stack direction="column" spacing="sm">
                <Heading level={4} size="md">Card 3</Heading>
                <Text size="sm">They help organize content in a clean, structured way.</Text>
                <Button variant="ghost" size="sm">Learn More</Button>
              </Stack>
            </Card>
          </Stack>
        </Stack>

        {/* Content Components */}
        <Stack direction="column" spacing="md">
          <Heading level={2} size="xl">Content Components</Heading>
          
          <Card>
            <Stack direction="column" spacing="md">
              <Heading level={3} size="lg">Code Block</Heading>
              <Text size="sm" color="secondary">
                Syntax-highlighted code with security features:
              </Text>
              <CodeBlock 
                code={codeExample}
                language="typescript"
              />
            </Stack>
          </Card>

          <Card>
            <Stack direction="column" spacing="md">
              <Heading level={3} size="lg">Markdown Rendering</Heading>
              <Text size="sm" color="secondary">
                Secure markdown parsing with sanitization:
              </Text>
              <Markdown content={markdownExample} />
            </Stack>
          </Card>
        </Stack>

        {/* Design System Info */}
        <Card>
          <Stack direction="column" spacing="md">
            <Heading level={2} size="xl">Design System Features</Heading>
            <Stack direction="column" spacing="sm">
              <Text>✅ <strong>Design Tokens:</strong> Consistent colors, spacing, typography</Text>
              <Text>✅ <strong>Accessibility:</strong> ARIA labels, keyboard navigation, screen reader support</Text>
              <Text>✅ <strong>RTL Support:</strong> Right-to-left language support</Text>
              <Text>✅ <strong>Security:</strong> XSS protection, HTML sanitization</Text>
              <Text>✅ <strong>Tree Shaking:</strong> Only imported components are bundled</Text>
              <Text>✅ <strong>Bundle Size:</strong> Optimized for ≤220KB gzipped</Text>
              <Text>✅ <strong>TypeScript:</strong> Full type safety and IntelliSense</Text>
            </Stack>
            
            <Divider />
            
            <Stack direction="row" spacing="md" wrap>
              <Button variant="primary" size="md">
                View Storybook
              </Button>
              <Button variant="outline" size="md">
                Component Docs
              </Button>
              <Button variant="ghost" size="md">
                GitHub Repository
              </Button>
            </Stack>
          </Stack>
        </Card>

        {/* Footer */}
        <Stack direction="column" spacing="sm" align="center">
          <Divider />
          <Text size="sm" color="secondary">
            Built with ❤️ for Telegram iOS Academy
          </Text>
          <Text size="xs" color="secondary">
            Current input: "{inputValue}" | Selected size: {selectedSize}
          </Text>
        </Stack>
      </Stack>
    </div>
  );
};

export default UIShowcasePage;