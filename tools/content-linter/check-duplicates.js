#!/usr/bin/env node

const fs = require('fs')
const { glob } = require('glob')

async function checkDuplicates() {
  console.log('🔍 Checking for duplicate content IDs...')
  
  const allIds = new Map() // id -> file path
  let duplicatesFound = false

  // Check all JSON content files
  const contentFiles = await glob('content/**/*.json')
  
  for (const file of contentFiles) {
    try {
      const content = fs.readFileSync(file, 'utf8')
      const data = JSON.parse(content)
      
      if (data.id) {
        if (allIds.has(data.id)) {
          console.error(`❌ Duplicate ID "${data.id}" found in:`)
          console.error(`   ${allIds.get(data.id)}`)
          console.error(`   ${file}`)
          duplicatesFound = true
        } else {
          allIds.set(data.id, file)
        }
      }
    } catch (error) {
      // Skip invalid files - they'll be caught by specific linters
    }
  }

  if (!duplicatesFound) {
    console.log('✅ No duplicate IDs found!')
  }

  process.exit(duplicatesFound ? 1 : 0)
}

checkDuplicates().catch(error => {
  console.error('Fatal error:', error)
  process.exit(1)
})