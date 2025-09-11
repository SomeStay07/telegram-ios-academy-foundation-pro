#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { parseLessonStrict } from '@telegram-ios-academy/lesson-spec';
import { parseCourseStrict } from '@telegram-ios-academy/course-spec';
import { parseInterviewStrict } from '@telegram-ios-academy/interview-spec';

const cmd = process.argv[2];
const arg = process.argv[3];

const read = (p: string) => JSON.parse(readFileSync(p, 'utf-8'));
const write = (p: string, d: any) => writeFileSync(p, JSON.stringify(d, null, 2));

if (!cmd) {
  console.log(`Usage:
  academy-builder lesson:new <id>
  academy-builder lesson:lint <file.json>
  academy-builder course:new <id>
  academy-builder course:lint <file.json>
  academy-builder interview:new-set <id>
  academy-builder interview:lint <file.json>
  `);
  process.exit(0);
}

if (cmd === 'lesson:new') {
  if (!arg) throw new Error('Provide lesson id');
  const tpl = {
    meta: { id: arg, title: 'New Lesson', description: '', duration: 20, level: 'beginner', order: 1, tags: [] },
    outcomes: [{ id: 'o1', text: 'Определить X', bloom: 'understand', verifiedBy: [] }],
    modules: [{ kind: 'hook', id: 'h1', title: 'Почему это важно?', body: '...' }],
    assessment: { formativeQuizIds: [], checkpoint: { id: 'cp1', quizIds: [], passThreshold: 0.8 } },
    spacedReview: { schedule: ['D1', 'D7', 'D30'] }
  };
  write(`${arg}.json`, tpl);
  console.log(`Created ${arg}.json`);
}

if (cmd === 'lesson:lint') {
  if (!arg) throw new Error('Provide path to lesson json');
  const data = read(arg);
  try {
    parseLessonStrict(data);
    console.log('✔ Lesson valid');
  } catch (e: any) {
    console.error('❌', e.message);
    process.exit(1);
  }
}

if (cmd === 'course:new') {
  if (!arg) throw new Error('Provide course id');
  const tpl = {
    meta: { id: arg, title: 'New Course', description: '', slug: arg, difficulty: 'beginner', estimatedHours: 10, tags: [], authors: [], version: '1.0.0' },
    lessons: [],
    defaultGatePolicy: { type: 'sequential', requirePrevious: true }
  };
  write(`${arg}.course.json`, tpl);
  console.log(`Created ${arg}.course.json`);
}

if (cmd === 'course:lint') {
  if (!arg) throw new Error('Provide path');
  const data = read(arg);
  try {
    parseCourseStrict(data);
    console.log('✔ Course valid');
  } catch (e: any) {
    console.error('❌', e.message);
    process.exit(1);
  }
}

if (cmd === 'interview:new-set') {
  if (!arg) throw new Error('Provide set id');
  const tpl = {
    meta: { id: arg, title: 'Interview Set', description: '', level: 'junior', position: 'Developer', tags: [], totalDuration: 60 },
    questions: [],
    rounds: [],
    evaluationRubric: {
      categories: [{ name: 'Technical Knowledge', weight: 1.0, criteria: [] }],
      passingScore: 70
    }
  };
  write(`${arg}.interview.json`, tpl);
  console.log(`Created ${arg}.interview.json`);
}

if (cmd === 'interview:lint') {
  if (!arg) throw new Error('Provide path');
  const data = read(arg);
  try {
    parseInterviewStrict(data);
    console.log('✔ Interview set valid');
  } catch (e: any) {
    console.error('❌', e.message);
    process.exit(1);
  }
}