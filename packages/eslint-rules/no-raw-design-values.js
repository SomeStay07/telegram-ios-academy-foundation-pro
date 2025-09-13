/**
 * ESLint rule to prevent raw design values and enforce design tokens
 * Only allows values through CSS custom properties (var(--ds-*))
 */

const forbiddenPatterns = [
  // Color values
  {
    pattern: /#[0-9a-fA-F]{3,8}\b/g,
    message: 'Raw hex colors are not allowed. Use design tokens: var(--ds-*)',
    type: 'color'
  },
  {
    pattern: /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/gi,
    message: 'Raw RGB colors are not allowed. Use design tokens: var(--ds-*)',
    type: 'color'
  },
  {
    pattern: /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/gi,
    message: 'Raw RGBA colors are not allowed. Use design tokens: var(--ds-*)',
    type: 'color'
  },
  {
    pattern: /hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)/gi,
    message: 'Raw HSL colors are not allowed. Use design tokens: var(--ds-*)',
    type: 'color'
  },
  
  // Spacing values (pixels, rem, em)
  {
    pattern: /\b\d+px\b/g,
    message: 'Raw pixel values are not allowed. Use spacing tokens: var(--ds-spacing-*)',
    type: 'spacing'
  },
  {
    pattern: /\b\d+(\.\d+)?rem\b/g,
    message: 'Raw rem values are not allowed. Use spacing tokens: var(--ds-spacing-*)',
    type: 'spacing'
  },
  {
    pattern: /\b\d+(\.\d+)?em\b/g,
    message: 'Raw em values are not allowed. Use spacing tokens: var(--ds-spacing-*)',
    type: 'spacing'
  },
  
  // Shadow values
  {
    pattern: /box-shadow:\s*[^;]*\d+px/gi,
    message: 'Raw shadow values are not allowed. Use shadow tokens: var(--ds-shadow-*)',
    type: 'shadow'
  },
  
  // Border radius
  {
    pattern: /border-radius:\s*\d+px/gi,
    message: 'Raw border-radius values are not allowed. Use radius tokens: var(--ds-radius-*)',
    type: 'radius'
  },
  
  // Animation timings
  {
    pattern: /\b\d+ms\b/g,
    message: 'Raw timing values are not allowed. Use motion tokens: var(--ds-motion-duration-*)',
    type: 'timing'
  },
  {
    pattern: /\b\d+(\.\d+)?s\b/g,
    message: 'Raw timing values are not allowed. Use motion tokens: var(--ds-motion-duration-*)',
    type: 'timing'
  }
];

const allowedExceptions = [
  // Allow var(--ds-*) patterns
  /var\(--ds-[^)]+\)/g,
  // Allow calc() with design tokens
  /calc\([^)]*var\(--ds-[^)]+\)[^)]*\)/g,
  // Allow rgba/hsla with design token colors
  /rgba\([^)]*var\(--ds-[^)]+\)[^)]*\)/g,
  /hsla\([^)]*var\(--ds-[^)]+\)[^)]*\)/g,
  // Allow zero values
  /\b0(px|rem|em|%)?\b/g,
  // Allow percentage values
  /\b\d+%\b/g,
  // Allow common unitless values
  /\b(1|2|3|4|5|10|100)\b/g
];

function isValueAllowed(value) {
  // Check if the value matches any allowed exception
  return allowedExceptions.some(pattern => pattern.test(value));
}

function checkValue(context, node, value) {
  if (isValueAllowed(value)) {
    return;
  }

  forbiddenPatterns.forEach(({ pattern, message, type }) => {
    const matches = value.match(pattern);
    if (matches) {
      matches.forEach(match => {
        context.report({
          node,
          message: `${message} Found: "${match}"`,
          data: { value: match, type }
        });
      });
    }
  });
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow raw design values, enforce design tokens',
      category: 'Design System',
      recommended: true
    },
    schema: [],
    messages: {
      rawValue: 'Raw design value "{{value}}" is not allowed. Use design tokens: var(--ds-*)'
    }
  },

  create(context) {
    return {
      // Check string literals
      Literal(node) {
        if (typeof node.value === 'string') {
          checkValue(context, node, node.value);
        }
      },

      // Check template literals
      TemplateLiteral(node) {
        node.quasis.forEach(quasi => {
          if (quasi.value && quasi.value.raw) {
            checkValue(context, quasi, quasi.value.raw);
          }
        });
      },

      // Check JSX attribute values
      JSXAttribute(node) {
        if (node.value && node.value.type === 'Literal' && typeof node.value.value === 'string') {
          checkValue(context, node.value, node.value.value);
        }
        if (node.value && node.value.type === 'JSXExpressionContainer' && 
            node.value.expression.type === 'Literal' && 
            typeof node.value.expression.value === 'string') {
          checkValue(context, node.value.expression, node.value.expression.value);
        }
      },

      // Check object property values (for styled-components, emotion, etc.)
      Property(node) {
        if (node.value.type === 'Literal' && typeof node.value.value === 'string') {
          checkValue(context, node.value, node.value.value);
        }
      }
    };
  }
};