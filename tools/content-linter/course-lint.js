#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { glob } = require('glob')
const { promisify } = require('util')
const globAsync = promisify(glob)

class CourseLinter {
  constructor() {
    this.errors = []
    this.warnings = []
    this.courseIds = new Set()
    this.allLessons = new Map() // ID -> lesson data
  }

  error(message, file = null) {
    this.errors.push(file ? `${file}: ${message}` : message)
  }

  warning(message, file = null) {
    this.warnings.push(file ? `${file}: ${message}` : message)
  }

  async lintCourses() {
    console.log('🔍 Linting course content...')
    
    // First, load all lessons to validate references
    await this.loadAllLessons()
    
    // Find all course files
    let courseFiles
    try {
      courseFiles = await globAsync('../../content/**/courses/**/*.json')
      // Ensure we have an array
      if (!Array.isArray(courseFiles)) {
        courseFiles = []
      }
    } catch (error) {
      console.warn(`Failed to search for course files: ${error.message}`)
      courseFiles = []
    }
    
    if (courseFiles.length === 0) {
      this.warning('No course files found in content/seed/courses/')
      return
    }

    console.log(`Found ${courseFiles.length} course files`)

    for (const file of courseFiles) {
      await this.lintCourseFile(file)
    }
  }

  async loadAllLessons() {
    let lessonFiles
    try {
      lessonFiles = await globAsync('../../content/seed/lessons/**/*.json')
      // Ensure we have an array
      if (!Array.isArray(lessonFiles)) {
        lessonFiles = []
      }
    } catch (error) {
      console.warn(`Failed to search for lesson files: ${error.message}`)
      lessonFiles = []
    }
    
    for (const file of lessonFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8')
        const lesson = JSON.parse(content)
        if (lesson.id) {
          this.allLessons.set(lesson.id, lesson)
        }
      } catch (error) {
        // Lessons will be validated by lesson-lint.js
      }
    }
  }

  async lintCourseFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const course = JSON.parse(content)

      this.validateCourseStructure(course, filePath)
      this.validateCourseLessons(course, filePath)
      this.validateCourseProgression(course, filePath)
      this.validatePrerequisites(course, filePath)

    } catch (error) {
      if (error instanceof SyntaxError) {
        this.error(`Invalid JSON: ${error.message}`, filePath)
      } else {
        this.error(`Failed to read course file: ${error.message}`, filePath)
      }
    }
  }

  validateCourseStructure(course, filePath) {
    const requiredFields = ['id', 'title', 'description', 'lessons', 'difficulty']
    
    for (const field of requiredFields) {
      if (!course[field]) {
        this.error(`Missing required field: ${field}`, filePath)
      }
    }

    // Check ID uniqueness
    if (course.id) {
      if (this.courseIds.has(course.id)) {
        this.error(`Duplicate course ID: ${course.id}`, filePath)
      } else {
        this.courseIds.add(course.id)
      }

      // Validate ID format
      if (!/^[a-z0-9-]+$/.test(course.id)) {
        this.error(`Invalid course ID format: ${course.id} (use lowercase, numbers, and hyphens only)`, filePath)
      }
    }

    // Validate difficulty level
    const validDifficulties = ['beginner', 'intermediate', 'advanced']
    if (course.difficulty && !validDifficulties.includes(course.difficulty)) {
      this.error(`Invalid difficulty level: ${course.difficulty}`, filePath)
    }

    // Validate title length
    if (course.title && course.title.length > 100) {
      this.warning(`Course title too long (${course.title.length} chars, max 100)`, filePath)
    }

    // Validate estimated hours
    if (course.estimatedHours && (typeof course.estimatedHours !== 'number' || course.estimatedHours <= 0)) {
      this.error('estimatedHours must be a positive number', filePath)
    }
  }

  validateCourseLessons(course, filePath) {
    if (!Array.isArray(course.lessons)) {
      this.error('Course lessons must be an array', filePath)
      return
    }

    if (course.lessons.length === 0) {
      this.error('Course must have at least one lesson', filePath)
    }

    const lessonOrders = new Set()
    let totalEstimatedTime = 0

    course.lessons.forEach((lesson, index) => {
      if (!lesson.lessonId) {
        this.error(`Lesson ${index} missing lessonId`, filePath)
        return
      }

      // Check if referenced lesson exists
      if (!this.allLessons.has(lesson.lessonId)) {
        this.error(`Referenced lesson not found: ${lesson.lessonId}`, filePath)
      }

      // Validate order uniqueness
      if (typeof lesson.order === 'number') {
        if (lessonOrders.has(lesson.order)) {
          this.error(`Duplicate lesson order: ${lesson.order}`, filePath)
        } else {
          lessonOrders.add(lesson.order)
        }
      } else {
        this.error(`Lesson ${lesson.lessonId} missing or invalid order`, filePath)
      }

      // Validate gating rules
      if (lesson.gating) {
        this.validateGatingRules(lesson.gating, lesson.lessonId, filePath)
      }

      // Calculate estimated time
      if (lesson.estimatedMinutes && typeof lesson.estimatedMinutes === 'number') {
        totalEstimatedTime += lesson.estimatedMinutes
      }
    })

    // Check if orders are sequential
    const orders = Array.from(lessonOrders).sort((a, b) => a - b)
    for (let i = 0; i < orders.length; i++) {
      if (orders[i] !== i + 1) {
        this.warning(`Lesson orders should be sequential starting from 1. Found gap at position ${i + 1}`, filePath)
        break
      }
    }

    // Validate total estimated time vs course estimate
    if (course.estimatedHours && totalEstimatedTime > 0) {
      const courseMinutes = course.estimatedHours * 60
      const difference = Math.abs(courseMinutes - totalEstimatedTime)
      const threshold = courseMinutes * 0.2 // 20% tolerance
      
      if (difference > threshold) {
        this.warning(`Course estimated time (${course.estimatedHours}h) differs significantly from sum of lesson times (${Math.round(totalEstimatedTime / 60)}h)`, filePath)
      }
    }
  }

  validateGatingRules(gating, lessonId, filePath) {
    if (typeof gating !== 'object') {
      this.error(`Invalid gating rules for lesson ${lessonId}`, filePath)
      return
    }

    // Validate requires array
    if (gating.requires && Array.isArray(gating.requires)) {
      gating.requires.forEach(requirement => {
        if (typeof requirement === 'string') {
          // Simple lesson ID requirement
          if (!this.allLessons.has(requirement)) {
            this.error(`Gating requirement references non-existent lesson: ${requirement}`, filePath)
          }
        } else if (typeof requirement === 'object') {
          // Complex requirement with conditions
          if (!requirement.lessonId) {
            this.error(`Gating requirement missing lessonId for lesson ${lessonId}`, filePath)
          } else if (!this.allLessons.has(requirement.lessonId)) {
            this.error(`Gating requirement references non-existent lesson: ${requirement.lessonId}`, filePath)
          }

          // Validate condition types
          if (requirement.condition) {
            const validConditions = ['completed', 'score_above', 'all_checkpoints']
            if (!validConditions.includes(requirement.condition)) {
              this.error(`Invalid gating condition: ${requirement.condition}`, filePath)
            }

            // Validate score threshold
            if (requirement.condition === 'score_above' && typeof requirement.threshold !== 'number') {
              this.error(`score_above condition requires numeric threshold`, filePath)
            }
          }
        }
      })
    }
  }

  validateCourseProgression(course, filePath) {
    if (!course.lessons || course.lessons.length < 2) {
      return // Cannot validate progression with less than 2 lessons
    }

    // Check difficulty progression
    const sortedLessons = course.lessons
      .filter(l => this.allLessons.has(l.lessonId))
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(l => this.allLessons.get(l.lessonId))

    let previousDifficulty = 0
    const difficultyMap = { beginner: 1, intermediate: 2, advanced: 3 }

    sortedLessons.forEach((lesson, index) => {
      if (lesson.difficulty) {
        const currentDifficulty = difficultyMap[lesson.difficulty] || 0
        
        // Allow same level or one level increase, but warn about jumps
        if (currentDifficulty > previousDifficulty + 1) {
          this.warning(`Lesson ${lesson.id} has difficulty jump from ${Object.keys(difficultyMap)[previousDifficulty - 1] || 'none'} to ${lesson.difficulty}`, filePath)
        }
        
        previousDifficulty = Math.max(previousDifficulty, currentDifficulty)
      }
    })
  }

  validatePrerequisites(course, filePath) {
    if (course.prerequisites && Array.isArray(course.prerequisites)) {
      course.prerequisites.forEach(prereq => {
        if (typeof prereq === 'string') {
          // Course ID prerequisite
          if (this.courseIds.has(prereq)) {
            // This is fine - referencing another course in this batch
          } else {
            this.warning(`Course prerequisite ${prereq} not found in current batch (may exist in other content)`, filePath)
          }
        } else if (typeof prereq === 'object' && prereq.courseId) {
          // Complex prerequisite
          if (this.courseIds.has(prereq.courseId)) {
            // Validate completion requirement
            if (prereq.completionRequired && typeof prereq.completionRequired !== 'number') {
              this.error(`Invalid completionRequired value for prerequisite ${prereq.courseId}`, filePath)
            }
          }
        }
      })
    }
  }

  report() {
    console.log('\n📊 Course Lint Results:')
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All course content is valid!')
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
  const linter = new CourseLinter()
  await linter.lintCourses()
  const success = linter.report()
  
  process.exit(success ? 0 : 1)
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}