#!/usr/bin/env node

const fs = require('fs')
const { glob } = require('glob')

class InterviewLinter {
  constructor() {
    this.errors = []
    this.warnings = []
    this.interviewIds = new Set()
  }

  error(message, file = null) {
    this.errors.push(file ? `${file}: ${message}` : message)
  }

  warning(message, file = null) {
    this.warnings.push(file ? `${file}: ${message}` : message)
  }

  async lintInterviews() {
    console.log('🔍 Linting interview content...')
    
    const interviewFiles = await glob('content/interviews/**/*.json')
    
    if (interviewFiles.length === 0) {
      this.warning('No interview files found in content/interviews/')
      return
    }

    console.log(`Found ${interviewFiles.length} interview files`)

    for (const file of interviewFiles) {
      await this.lintInterviewFile(file)
    }
  }

  async lintInterviewFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const interview = JSON.parse(content)

      this.validateInterviewStructure(interview, filePath)
      this.validateQuestions(interview, filePath)

    } catch (error) {
      if (error instanceof SyntaxError) {
        this.error(`Invalid JSON: ${error.message}`, filePath)
      } else {
        this.error(`Failed to read interview file: ${error.message}`, filePath)
      }
    }
  }

  validateInterviewStructure(interview, filePath) {
    const requiredFields = ['id', 'title', 'description', 'questions']
    
    for (const field of requiredFields) {
      if (!interview[field]) {
        this.error(`Missing required field: ${field}`, filePath)
      }
    }

    if (interview.id) {
      if (this.interviewIds.has(interview.id)) {
        this.error(`Duplicate interview ID: ${interview.id}`, filePath)
      } else {
        this.interviewIds.add(interview.id)
      }

      if (!/^[a-z0-9-]+$/.test(interview.id)) {
        this.error(`Invalid interview ID format: ${interview.id}`, filePath)
      }
    }
  }

  validateQuestions(interview, filePath) {
    if (!Array.isArray(interview.questions)) {
      this.error('Questions must be an array', filePath)
      return
    }

    if (interview.questions.length === 0) {
      this.error('Interview must have at least one question', filePath)
    }

    const questionIds = new Set()
    
    interview.questions.forEach((question, index) => {
      if (!question.id) {
        this.error(`Question ${index} missing ID`, filePath)
        return
      }

      if (questionIds.has(question.id)) {
        this.error(`Duplicate question ID: ${question.id}`, filePath)
      } else {
        questionIds.add(question.id)
      }

      if (!question.prompt) {
        this.error(`Question ${question.id} missing prompt`, filePath)
      }

      if (!question.modelAnswer) {
        this.warning(`Question ${question.id} missing model answer`, filePath)
      }

      const validDifficulties = ['beginner', 'intermediate', 'advanced']
      if (question.difficulty && !validDifficulties.includes(question.difficulty)) {
        this.error(`Invalid difficulty level: ${question.difficulty} for question ${question.id}`, filePath)
      }
    })
  }

  report() {
    console.log('\n📊 Interview Lint Results:')
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All interview content is valid!')
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
  const linter = new InterviewLinter()
  await linter.lintInterviews()
  const success = linter.report()
  
  process.exit(success ? 0 : 1)
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}