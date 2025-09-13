import fs from 'node:fs'
import path from 'node:path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const root = path.resolve(__dirname, '../../../..') // корень монорепо
const lessonsDir = path.join(root, 'content/seed/lessons')
const coursesFile = path.join(root, 'content/seed/courses.json') // опционально

// Simple validation function since we don't have lesson-spec
function validateLesson(raw: any) {
  if (!raw.meta?.id || !raw.content) {
    throw new Error(`Invalid lesson structure: ${JSON.stringify(raw)}`)
  }
  return raw
}

async function main() {
  console.log('Starting database seeding...')

  // Уроки
  if (fs.existsSync(lessonsDir)) {
    const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'))
    console.log(`Found ${files.length} lesson files`)
    
    for (const f of files) {
      const raw = JSON.parse(fs.readFileSync(path.join(lessonsDir, f), 'utf-8'))
      const lesson = validateLesson(raw)
      
      await prisma.lesson.upsert({
        where: { id: lesson.meta.id },
        update: { content: lesson as any },
        create: { id: lesson.meta.id, content: lesson as any },
      })
      console.log(`✓ Seeded lesson: ${lesson.meta.id}`)
    }
  }

  // Курсы (если есть)
  if (fs.existsSync(coursesFile)) {
    const courses = JSON.parse(fs.readFileSync(coursesFile, 'utf-8')) as Array<{
      id: string; title: string; lessons: { id: string; order: number }[]
    }>
    
    console.log(`Found ${courses.length} courses`)
    
    for (const c of courses) {
      await prisma.course.upsert({
        where: { id: c.id },
        update: { title: c.title },
        create: { id: c.id, title: c.title },
      })
      console.log(`✓ Seeded course: ${c.id}`)
      
      // связываем порядок уроков
      for (const l of c.lessons) {
        await prisma.courseLesson.upsert({
          where: { courseId_lessonId: { courseId: c.id, lessonId: l.id } },
          update: { order: l.order },
          create: { courseId: c.id, lessonId: l.id, order: l.order },
        })
        console.log(`  ✓ Linked lesson ${l.id} to course ${c.id} (order: ${l.order})`)
      }
    }
  }

  console.log('Database seeding completed successfully!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })