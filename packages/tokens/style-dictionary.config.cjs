// Simple token processor for demonstration
const fs = require('fs');
const path = require('path');

// Helper to resolve token aliases
function resolveAlias(value, allTokens) {
  if (typeof value !== 'string' || !value.includes('{')) {
    return value;
  }
  
  const aliasRegex = /\{([^}]+)\}/g;
  return value.replace(aliasRegex, (match, path) => {
    const pathParts = path.split('.');
    let current = allTokens;
    
    for (const part of pathParts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        // Alias not found, return original
        return match;
      }
    }
    
    if (current && current.value) {
      // Recursively resolve nested aliases
      return resolveAlias(current.value, allTokens);
    }
    
    return match;
  });
}

// Helper to recursively process tokens
function processTokens(obj, prefix = '', cssVars = {}, jsTokens = {}, allTokens = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}-${key}` : key;
    
    if (value && typeof value === 'object' && value.value !== undefined) {
      // This is a token - resolve aliases
      const cssVar = `--ds-${currentPath}`;
      const resolvedValue = resolveAlias(value.value, allTokens);
      cssVars[cssVar] = resolvedValue;
      
      // Build JS object structure
      const pathParts = currentPath.split('-');
      let current = jsTokens;
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) current[pathParts[i]] = {};
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = {
        value: resolvedValue,
        variable: cssVar
      };
    } else if (value && typeof value === 'object') {
      // Recurse deeper
      processTokens(value, currentPath, cssVars, jsTokens, allTokens);
    }
  }
}

// Helper to deep merge objects
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Load all token files
const tokenFiles = [
  'src/tokens.raw.json',
  'src/tokens.semantic.json', 
  'src/tokens.component.json'
];

let allTokens = {};

tokenFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    allTokens = deepMerge(allTokens, content);
  }
});

// Process tokens
const cssVars = {};
const jsTokens = {};
processTokens(allTokens, '', cssVars, jsTokens, allTokens);

// Ensure output directories exist
fs.mkdirSync('dist/css', { recursive: true });
fs.mkdirSync('dist/ts', { recursive: true });

// Generate CSS file
const cssContent = `:root {
${Object.entries(cssVars)
  .map(([variable, value]) => `  ${variable}: ${value};`)
  .join('\n')}
}
`;

fs.writeFileSync('dist/css/tokens.css', cssContent);

// Generate TypeScript file
const tsContent = `export const tokens = ${JSON.stringify(jsTokens, null, 2)};

export type TokenValue = {
  value: string;
  variable: string;
};

export default tokens;
`;

fs.writeFileSync('dist/ts/index.ts', tsContent);
fs.writeFileSync('dist/ts/index.d.ts', tsContent);

console.log('✅ Design tokens built successfully!');
console.log('📁 Output files:');
console.log('   - dist/css/tokens.css');
console.log('   - dist/ts/index.ts');
console.log(`📊 Generated ${Object.keys(cssVars).length} CSS variables`);