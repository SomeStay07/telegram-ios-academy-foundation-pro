#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { glob } = require('glob')
const { promisify } = require('util')
const globAsync = promisify(glob)

class LessonLinter {
  constructor() {
    this.errors = []
    this.warnings = []
    this.lessonIds = new Set()
  }

  error(message, file = null) {
    this.errors.push(file ? `${file}: ${message}` : message)
  }

  warning(message, file = null) {
    this.warnings.push(file ? `${file}: ${message}` : message)
  }

  async lintLessons() {
    console.log('🔍 Linting lesson content...')
    
    // Find all lesson files - look in the correct relative path
    let lessonFiles
    try {
      lessonFiles = await globAsync('../../content/seed/lessons/**/*.json')
      // Ensure we have an array
      if (!Array.isArray(lessonFiles)) {
        lessonFiles = []
      }
    } catch (error) {
      this.error(`Failed to search for lesson files: ${error.message}`)
      return
    }
    
    if (lessonFiles.length === 0) {
      this.warning('No lesson files found in content/seed/lessons/')
      return
    }

    console.log(`Found ${lessonFiles.length} lesson files`)

    for (const file of lessonFiles) {
      await this.lintLessonFile(file)
    }

    this.checkForDuplicateIds()
  }

  async lintLessonFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const lesson = JSON.parse(content)

      this.validateLessonStructure(lesson, filePath)
      this.validateLessonModules(lesson, filePath)
      this.validateBloomLevels(lesson, filePath)
      this.validateFadingExamples(lesson, filePath)

    } catch (error) {
      if (error instanceof SyntaxError) {
        this.error(`Invalid JSON: ${error.message}`, filePath)
      } else {
        this.error(`Failed to read lesson file: ${error.message}`, filePath)
      }
    }
  }

  validateLessonStructure(lesson, filePath) {
    const requiredFields = ['id', 'title', 'description', 'modules', 'objectives']
    
    for (const field of requiredFields) {
      if (!lesson[field]) {
        this.error(`Missing required field: ${field}`, filePath)
      }
    }

    // Check ID uniqueness
    if (lesson.id) {
      if (this.lessonIds.has(lesson.id)) {
        this.error(`Duplicate lesson ID: ${lesson.id}`, filePath)
      } else {
        this.lessonIds.add(lesson.id)
      }

      // Validate ID format
      if (!/^[a-z0-9-]+$/.test(lesson.id)) {
        this.error(`Invalid lesson ID format: ${lesson.id} (use lowercase, numbers, and hyphens only)`, filePath)
      }
    }

    // Validate title length
    if (lesson.title && lesson.title.length > 100) {
      this.warning(`Lesson title too long (${lesson.title.length} chars, max 100)`, filePath)
    }

    // Validate description length
    if (lesson.description && lesson.description.length > 500) {
      this.warning(`Lesson description too long (${lesson.description.length} chars, max 500)`, filePath)
    }
  }

  validateLessonModules(lesson, filePath) {
    if (!Array.isArray(lesson.modules)) {
      this.error('Modules must be an array', filePath)
      return
    }

    if (lesson.modules.length === 0) {
      this.error('Lesson must have at least one module', filePath)
    }

    const moduleIds = new Set()
    const validModuleTypes = ['hook', 'objectives', 'recall', 'concept', 'worked_example', 'quiz', 'checkpoint', 'summary', 'transfer']
    
    lesson.modules.forEach((module, index) => {
      if (!module.id) {
        this.error(`Module ${index} missing ID`, filePath)
        return
      }

      if (moduleIds.has(module.id)) {
        this.error(`Duplicate module ID: ${module.id}`, filePath)
      } else {
        moduleIds.add(module.id)
      }

      if (!module.kind) {
        this.error(`Module ${module.id} missing kind`, filePath)
      } else if (!validModuleTypes.includes(module.kind)) {
        this.error(`Invalid module kind: ${module.kind}`, filePath)
      }

      if (!module.content && !module.text && !module.question) {
        this.warning(`Module ${module.id} has no content`, filePath)
      }
    })

    // Check lesson flow pattern
    this.validateLessonFlow(lesson.modules, filePath)
  }

  validateLessonFlow(modules, filePath) {
    const moduleTypes = modules.map(m => m.kind).filter(Boolean)
    
    // Must start with hook or objectives
    if (moduleTypes.length > 0 && !['hook', 'objectives'].includes(moduleTypes[0])) {
      this.warning('Lesson should start with hook or objectives module', filePath)
    }

    // Should have at least one concept
    if (!moduleTypes.includes('concept')) {
      this.warning('Lesson should include at least one concept module', filePath)
    }

    // Should end with summary or transfer
    const lastType = moduleTypes[moduleTypes.length - 1]
    if (lastType && !['summary', 'transfer', 'checkpoint'].includes(lastType)) {
      this.warning('Lesson should end with summary, transfer, or checkpoint module', filePath)
    }

    // Quiz should come after concept
    moduleTypes.forEach((type, index) => {
      if (type === 'quiz' && index > 0) {
        const previousTypes = moduleTypes.slice(0, index)
        if (!previousTypes.includes('concept')) {
          this.warning('Quiz module should come after a concept module', filePath)
        }
      }
    })
  }

  validateBloomLevels(lesson, filePath) {
    if (!lesson.objectives || !Array.isArray(lesson.objectives)) {
      return
    }

    const validBloomLevels = ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']

    lesson.objectives.forEach((objective, index) => {
      if (typeof objective === 'object' && objective.bloomLevel) {
        if (!validBloomLevels.includes(objective.bloomLevel)) {
          this.error(`Invalid Bloom level "${objective.bloomLevel}" in objective ${index}`, filePath)
        }
      }
    })
  }

  validateFadingExamples(lesson, filePath) {
    const workedExamples = lesson.modules.filter(m => m.kind === 'worked_example')
    
    workedExamples.forEach(example => {
      if (example.fading && typeof example.fading === 'object') {
        const { steps, fadePattern } = example.fading
        
        if (!Array.isArray(steps)) {
          this.error(`Worked example ${example.id} fading.steps must be an array`, filePath)
          return
        }

        if (fadePattern && !['linear', 'exponential', 'custom'].includes(fadePattern)) {
          this.error(`Invalid fading pattern: ${fadePattern}`, filePath)
        }

        // Validate each step
        steps.forEach((step, index) => {
          if (!step.instruction) {
            this.warning(`Fading step ${index} in ${example.id} missing instruction`, filePath)
          }
          
          if (typeof step.scaffolding !== 'number' || step.scaffolding < 0 || step.scaffolding > 1) {
            this.error(`Fading step ${index} scaffolding must be a number between 0 and 1`, filePath)
          }
        })
      }
    })
  }

  checkForDuplicateIds() {
    // Additional validation can be added here for cross-lesson checks
  }

  report() {
    console.log('\n📊 Lesson Lint Results:')
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All lesson content is valid!')
      return true
    }

    if (this.errors.length > 0) {
      console.log(`\n❌ ${this.errors.length} Error(s):`)
      this.errors.forEach(error => console.log(`  ${error}`))
    }

    if (this.warnings.length > 0) {
      console.log(`\n⚠️  ${this.warnings.length} Warning(s):`)
      this.warnings.forEach(warning => console.log(`  ${warning}`))
    }

    return this.errors.length === 0
  }
}

async function main() {
  const linter = new LessonLinter()
  await linter.lintLessons()
  const success = linter.report()
  
  process.exit(success ? 0 : 1)
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}