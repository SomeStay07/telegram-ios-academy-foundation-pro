#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUNDLE_SIZE_LIMIT_KB = 220;
const DIST_DIR = path.join(__dirname, '..', 'dist');

/**
 * Calculate gzipped size of a file
 */
function getGzippedSize(filePath) {
  const content = fs.readFileSync(filePath);
  return zlib.gzipSync(content).length;
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  return Math.round(bytes / 1024);
}

/**
 * Analyze bundle sizes
 */
function analyzeBundleSize() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Dist directory not found. Run `pnpm build` first.');
    process.exit(1);
  }

  const files = fs.readdirSync(DIST_DIR, { recursive: true })
    .filter(file => typeof file === 'string' && (file.endsWith('.js') || file.endsWith('.css')))
    .map(file => path.join(DIST_DIR, file));

  let totalSize = 0;
  let totalGzippedSize = 0;
  const fileAnalysis = [];

  console.log('📦 Bundle Size Analysis:');
  console.log('========================');

  for (const file of files) {
    if (fs.statSync(file).isFile()) {
      const size = fs.statSync(file).size;
      const gzippedSize = getGzippedSize(file);
      
      totalSize += size;
      totalGzippedSize += gzippedSize;

      const relativePath = path.relative(DIST_DIR, file);
      fileAnalysis.push({
        file: relativePath,
        size: formatBytes(size),
        gzipped: formatBytes(gzippedSize)
      });
    }
  }

  // Sort by gzipped size descending
  fileAnalysis.sort((a, b) => b.gzipped - a.gzipped);

  // Print file-by-file analysis
  fileAnalysis.forEach(item => {
    console.log(`  ${item.file.padEnd(30)} ${item.size.toString().padStart(6)}KB  ${item.gzipped.toString().padStart(6)}KB (gzip)`);
  });

  console.log('========================');
  console.log(`Total size: ${formatBytes(totalSize)}KB`);
  console.log(`Total gzipped: ${formatBytes(totalGzippedSize)}KB`);
  console.log(`Limit: ${BUNDLE_SIZE_LIMIT_KB}KB`);

  const overLimit = formatBytes(totalGzippedSize) > BUNDLE_SIZE_LIMIT_KB;
  
  if (overLimit) {
    console.log('❌ Bundle size exceeds limit!');
    console.log(`Over by: ${formatBytes(totalGzippedSize) - BUNDLE_SIZE_LIMIT_KB}KB`);
    
    console.log('\n💡 Optimization suggestions:');
    console.log('  • Check for unused dependencies');
    console.log('  • Implement code splitting for large libraries');  
    console.log('  • Use dynamic imports for non-critical code');
    console.log('  • Analyze with `npx webpack-bundle-analyzer`');
    
    process.exit(1);
  } else {
    console.log('✅ Bundle size within limit!');
    console.log(`Remaining budget: ${BUNDLE_SIZE_LIMIT_KB - formatBytes(totalGzippedSize)}KB`);
  }
}

// Environment check
if (process.env.NODE_ENV !== 'production' && !process.env.FORCE_BUNDLE_CHECK) {
  console.log('ℹ️ Bundle size check skipped in development mode.');
  console.log('   Run with FORCE_BUNDLE_CHECK=1 to force in development.');
  process.exit(0);
}

analyzeBundleSize();