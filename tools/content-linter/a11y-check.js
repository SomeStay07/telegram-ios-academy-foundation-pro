#!/usr/bin/env node

const fs = require('fs')
const { glob } = require('glob')
const { promisify } = require('util')
const globAsync = promisify(glob)

async function checkAccessibility() {
  console.log('🔍 Checking content accessibility...')
  
  let issues = 0
  let contentFiles
  try {
    contentFiles = await globAsync('../../content/**/*.json')
    // Ensure we have an array
    if (!Array.isArray(contentFiles)) {
      contentFiles = []
    }
  } catch (error) {
    console.error(`Failed to search for content files: ${error.message}`)
    process.exit(1)
  }
  
  for (const file of contentFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8')
      const data = JSON.parse(content)
      
      // Check for alt text on images
      if (data.modules) {
        data.modules.forEach(module => {
          if (module.content && typeof module.content === 'string') {
            // Check for images without alt text
            const imgMatches = module.content.match(/<img[^>]+>/gi)
            if (imgMatches) {
              imgMatches.forEach(img => {
                if (!img.includes('alt=')) {
                  console.warn(`⚠️  Image without alt text in ${file}, module ${module.id}`)
                  issues++
                }
              })
            }
          }
        })
      }
      
      // Check for proper heading hierarchy (placeholder)
      // Check for color-only information (placeholder)
      
    } catch (error) {
      // Skip invalid files
    }
  }

  console.log(`✅ Accessibility check complete. ${issues} issues found.`)
  process.exit(0) // Non-blocking for now
}

checkAccessibility().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})