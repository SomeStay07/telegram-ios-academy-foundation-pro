import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { CourseCreated } from '../events/course-created.event';
import { LessonAdded } from '../events/lesson-added.event';
import { CourseUnlocked } from '../events/course-unlocked.event';

export interface Lesson {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  prerequisites: string[];
  order: number;
}

export interface CourseMetadata {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  tags: string[];
  category: string;
}

export class Course extends AggregateRoot {
  private _lessons: Map<string, Lesson> = new Map();
  private _unlockedForUsers: Set<string> = new Set();

  private constructor(
    id: string,
    private _metadata: CourseMetadata,
    lessons: Map<string, Lesson> = new Map(),
    unlockedForUsers: Set<string> = new Set(),
    version: number = 0
  ) {
    super(id, version);
    this._lessons = lessons;
    this._unlockedForUsers = unlockedForUsers;
  }

  public static create(id: string, metadata: CourseMetadata): Course {
    const course = new Course(id, metadata, new Map(), new Set(), 0);
    
    course.addDomainEvent(new CourseCreated(
      id,
      metadata,
      0
    ));

    return course;
  }

  public static fromHistory(
    id: string,
    metadata: CourseMetadata,
    lessons: Map<string, Lesson>,
    unlockedForUsers: Set<string>,
    version: number
  ): Course {
    return new Course(id, metadata, lessons, unlockedForUsers, version);
  }

  get metadata(): CourseMetadata {
    return { ...this._metadata };
  }

  get lessons(): Lesson[] {
    return Array.from(this._lessons.values()).sort((a, b) => a.order - b.order);
  }

  get lessonCount(): number {
    return this._lessons.size;
  }

  public addLesson(lesson: Lesson): void {
    // Business rule: Lesson order must be sequential
    const maxOrder = Math.max(0, ...Array.from(this._lessons.values()).map(l => l.order));
    if (lesson.order <= maxOrder && this._lessons.size > 0) {
      throw new Error('Lesson order must be greater than existing lessons');
    }

    this._lessons.set(lesson.id, lesson);

    this.addDomainEvent(new LessonAdded(
      this.id,
      lesson,
      this.version + 1
    ));

    this.incrementVersion();
  }

  public unlockForUser(userId: string): void {
    if (this._unlockedForUsers.has(userId)) {
      throw new Error(`Course ${this.id} already unlocked for user ${userId}`);
    }

    this._unlockedForUsers.add(userId);

    this.addDomainEvent(new CourseUnlocked(
      this.id,
      userId,
      new Date(),
      this.version + 1
    ));

    this.incrementVersion();
  }

  public isUnlockedForUser(userId: string): boolean {
    return this._unlockedForUsers.has(userId);
  }

  public getLesson(lessonId: string): Lesson | undefined {
    return this._lessons.get(lessonId);
  }

  public getNextLesson(currentLessonId: string): Lesson | undefined {
    const currentLesson = this._lessons.get(currentLessonId);
    if (!currentLesson) return undefined;

    const sortedLessons = this.lessons;
    const currentIndex = sortedLessons.findIndex(l => l.id === currentLessonId);
    
    return currentIndex < sortedLessons.length - 1 
      ? sortedLessons[currentIndex + 1] 
      : undefined;
  }

  public validatePrerequisites(lessonId: string, completedLessons: string[]): boolean {
    const lesson = this._lessons.get(lessonId);
    if (!lesson) return false;

    return lesson.prerequisites.every(prereq => completedLessons.includes(prereq));
  }
}