#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

class ContentValidator {
  constructor() {
    this.errors = []
    this.warnings = []
  }

  log(message) {
    console.log(`[Content Validator] ${message}`)
  }

  error(message) {
    this.errors.push(message)
    console.error(`❌ ${message}`)
  }

  warn(message) {
    this.warnings.push(message)
    console.warn(`⚠️  ${message}`)
  }

  success(message) {
    console.log(`✅ ${message}`)
  }

  validateJsonFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const data = JSON.parse(content)
      return data
    } catch (error) {
      this.error(`Invalid JSON in ${filePath}: ${error.message}`)
      return null
    }
  }

  validateLessonSchema(filePath, data) {
    if (!data) return

    // Basic lesson structure validation
    const required = ['meta', 'modules']
    for (const field of required) {
      if (!data[field]) {
        this.error(`Missing required field "${field}" in lesson ${filePath}`)
      }
    }

    // Meta validation
    if (data.meta) {
      const metaRequired = ['id', 'title', 'description']
      for (const field of metaRequired) {
        if (!data.meta[field]) {
          this.error(`Missing meta.${field} in lesson ${filePath}`)
        }
      }

      // ID uniqueness (basic check)
      if (data.meta.id && !data.meta.id.match(/^[a-z0-9-]+$/)) {
        this.error(`Invalid lesson ID format in ${filePath}: ${data.meta.id}`)
      }
    }

    // Modules validation
    if (Array.isArray(data.modules)) {
      data.modules.forEach((module, index) => {
        if (!module.id) {
          this.error(`Missing module ID at index ${index} in ${filePath}`)
        }
        if (!module.type) {
          this.error(`Missing module type at index ${index} in ${filePath}`)
        }
      })

      // Check for duplicate module IDs
      const moduleIds = data.modules.map(m => m.id).filter(Boolean)
      const duplicates = moduleIds.filter((id, i) => moduleIds.indexOf(id) !== i)
      if (duplicates.length > 0) {
        this.error(`Duplicate module IDs in ${filePath}: ${duplicates.join(', ')}`)
      }
    }
  }

  validateInterviewSchema(filePath, data) {
    if (!data) return

    // Basic interview structure validation
    const required = ['id', 'title', 'questions']
    for (const field of required) {
      if (!data[field]) {
        this.error(`Missing required field "${field}" in interview ${filePath}`)
      }
    }

    // Questions validation
    if (Array.isArray(data.questions)) {
      data.questions.forEach((question, index) => {
        const questionRequired = ['id', 'category', 'difficulty', 'prompt', 'modelAnswer']
        for (const field of questionRequired) {
          if (!question[field]) {
            this.error(`Missing question.${field} at index ${index} in ${filePath}`)
          }
        }

        // Validate enums
        if (question.difficulty && !['beginner', 'intermediate', 'advanced'].includes(question.difficulty)) {
          this.error(`Invalid difficulty level "${question.difficulty}" at question ${index} in ${filePath}`)
        }

        const validCategories = ['swift', 'ios-sdk', 'memory', 'patterns', 'best-practices', 'concurrency', 'architecture']
        if (question.category && !validCategories.includes(question.category)) {
          this.error(`Invalid category "${question.category}" at question ${index} in ${filePath}`)
        }
      })

      // Check for duplicate question IDs
      const questionIds = data.questions.map(q => q.id).filter(Boolean)
      const duplicates = questionIds.filter((id, i) => questionIds.indexOf(id) !== i)
      if (duplicates.length > 0) {
        this.error(`Duplicate question IDs in ${filePath}: ${duplicates.join(', ')}`)
      }
    } else {
      this.error(`Questions must be an array in ${filePath}`)
    }
  }

  validateCourseSchema(filePath, data) {
    if (!data) return

    const required = ['id', 'title', 'lessons']
    for (const field of required) {
      if (!data[field]) {
        this.error(`Missing required field "${field}" in course ${filePath}`)
      }
    }

    if (Array.isArray(data.lessons)) {
      data.lessons.forEach((lesson, index) => {
        if (!lesson.id) {
          this.error(`Missing lesson ID at index ${index} in course ${filePath}`)
        }
        if (!lesson.title) {
          this.error(`Missing lesson title at index ${index} in course ${filePath}`)
        }
      })
    }
  }

  checkBrokenLinks(content, filePath) {
    // Simple regex to find markdown links and relative file references
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const relativeFileRegex = /['"](\.\/[^'"]+|\/[^'"]+)['"]/g
    
    let match
    while ((match = linkRegex.exec(content)) !== null) {
      const linkUrl = match[2]
      if (linkUrl.startsWith('./') || linkUrl.startsWith('/')) {
        const fullPath = path.resolve(path.dirname(filePath), linkUrl)
        if (!fs.existsSync(fullPath)) {
          this.warn(`Broken link in ${filePath}: ${linkUrl}`)
        }
      }
    }
    
    while ((match = relativeFileRegex.exec(content)) !== null) {
      const filePath2 = match[1]
      if (filePath2.startsWith('./') || filePath2.startsWith('/')) {
        const fullPath = path.resolve(path.dirname(filePath), filePath2)
        if (!fs.existsSync(fullPath)) {
          this.warn(`Broken file reference in ${filePath}: ${filePath2}`)
        }
      }
    }
  }

  validateContentFiles() {
    this.log('Validating content files...')
    let fileCount = 0

    // Validate lessons
    const lessonsDir = path.join(process.cwd(), 'apps/miniapp/src/data/lessons')
    if (fs.existsSync(lessonsDir)) {
      const lessonFiles = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'))
      for (const file of lessonFiles) {
        const filePath = path.join(lessonsDir, file)
        const data = this.validateJsonFile(filePath)
        this.validateLessonSchema(filePath, data)
        fileCount++
      }
      this.success(`Validated ${lessonFiles.length} lesson files`)
    }

    // Validate interviews
    const interviewsDir = path.join(process.cwd(), 'apps/miniapp/src/data/interviews')
    if (fs.existsSync(interviewsDir)) {
      const interviewFiles = fs.readdirSync(interviewsDir).filter(f => f.endsWith('.json'))
      for (const file of interviewFiles) {
        const filePath = path.join(interviewsDir, file)
        const data = this.validateJsonFile(filePath)
        this.validateInterviewSchema(filePath, data)
        fileCount++
      }
      this.success(`Validated ${interviewFiles.length} interview files`)
    }

    // Validate courses
    const coursesDir = path.join(process.cwd(), 'apps/miniapp/src/data/courses')
    if (fs.existsSync(coursesDir)) {
      const courseFiles = fs.readdirSync(coursesDir).filter(f => f.endsWith('.json'))
      for (const file of courseFiles) {
        const filePath = path.join(coursesDir, file)
        const data = this.validateJsonFile(filePath)
        this.validateCourseSchema(filePath, data)
        fileCount++
      }
      this.success(`Validated ${courseFiles.length} course files`)
    }

    return fileCount
  }

  checkGlobalUniqueness() {
    this.log('Checking global ID uniqueness...')
    
    const allIds = new Map()
    
    // Collect all IDs from different content types
    const collectIds = (dir, type) => {
      if (!fs.existsSync(dir)) return
      
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'))
      files.forEach(file => {
        const filePath = path.join(dir, file)
        try {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
          if (data.id) {
            if (allIds.has(data.id)) {
              this.error(`Duplicate ID "${data.id}" found in ${filePath} and ${allIds.get(data.id)}`)
            } else {
              allIds.set(data.id, `${type}:${filePath}`)
            }
          }
        } catch (error) {
          // Already handled in validateJsonFile
        }
      })
    }

    collectIds(path.join(process.cwd(), 'apps/miniapp/src/data/lessons'), 'lesson')
    collectIds(path.join(process.cwd(), 'apps/miniapp/src/data/interviews'), 'interview')
    collectIds(path.join(process.cwd(), 'apps/miniapp/src/data/courses'), 'course')

    this.success(`Checked ${allIds.size} unique content IDs`)
  }

  run() {
    this.log('Starting content validation...')
    
    const fileCount = this.validateContentFiles()
    this.checkGlobalUniqueness()
    
    // Summary
    console.log('\n📊 Validation Summary:')
    console.log(`Files validated: ${fileCount}`)
    console.log(`Errors: ${this.errors.length}`)
    console.log(`Warnings: ${this.warnings.length}`)
    
    if (this.errors.length > 0) {
      console.log('\n❌ Validation failed with errors:')
      this.errors.forEach(error => console.log(`  • ${error}`))
      process.exit(1)
    }
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings (not blocking):')
      this.warnings.forEach(warning => console.log(`  • ${warning}`))
    }
    
    console.log('\n✅ Content validation passed!')
  }
}

if (require.main === module) {
  const validator = new ContentValidator()
  validator.run()
}

module.exports = ContentValidator