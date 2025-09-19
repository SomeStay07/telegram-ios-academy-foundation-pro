import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { LessonStarted } from '../events/lesson-started.event';
import { LessonCompleted } from '../events/lesson-completed.event';
import { ProgressUpdated } from '../events/progress-updated.event';

export interface LessonProgress {
  lessonId: string;
  score: number;
  timeSpentSeconds: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
  attempts: number;
}

export class LearningPath extends AggregateRoot {
  private _progress: Map<string, LessonProgress> = new Map();

  private constructor(
    id: string,
    private _userId: string,
    private _courseId: string,
    progress: Map<string, LessonProgress> = new Map(),
    version: number = 0
  ) {
    super(id, version);
    this._progress = progress;
  }

  public static create(id: string, userId: string, courseId: string): LearningPath {
    return new LearningPath(id, userId, courseId, new Map(), 0);
  }

  public static fromHistory(
    id: string,
    userId: string,
    courseId: string,
    progress: Map<string, LessonProgress>,
    version: number
  ): LearningPath {
    return new LearningPath(id, userId, courseId, progress, version);
  }

  get userId(): string {
    return this._userId;
  }

  get courseId(): string {
    return this._courseId;
  }

  get progress(): Map<string, LessonProgress> {
    return new Map(this._progress);
  }

  public startLesson(lessonId: string): void {
    const existingProgress = this._progress.get(lessonId);
    
    if (!existingProgress) {
      const newProgress: LessonProgress = {
        lessonId,
        score: 0,
        timeSpentSeconds: 0,
        completed: false,
        startedAt: new Date(),
        attempts: 1
      };
      
      this._progress.set(lessonId, newProgress);
      
      this.addDomainEvent(new LessonStarted(
        this.id,
        this._userId,
        lessonId,
        new Date(),
        this.version + 1
      ));
      
      this.incrementVersion();
    }
  }

  public completeLesson(
    lessonId: string,
    score: number,
    timeSpentSeconds: number
  ): void {
    const existingProgress = this._progress.get(lessonId);
    
    if (!existingProgress) {
      throw new Error(`Lesson ${lessonId} not started`);
    }

    const completedProgress: LessonProgress = {
      ...existingProgress,
      score,
      timeSpentSeconds: existingProgress.timeSpentSeconds + timeSpentSeconds,
      completed: score >= 0.7, // 70% threshold
      completedAt: new Date(),
      attempts: existingProgress.attempts + (existingProgress.completed ? 0 : 1)
    };

    this._progress.set(lessonId, completedProgress);

    this.addDomainEvent(new LessonCompleted(
      this.id,
      this._userId,
      lessonId,
      score,
      timeSpentSeconds,
      this.version + 1
    ));

    this.addDomainEvent(new ProgressUpdated(
      this.id,
      this._userId,
      this._courseId,
      this.calculateOverallProgress(),
      this.version + 1
    ));

    this.incrementVersion();
  }

  public updateProgress(lessonId: string, score: number, timeSpent: number): void {
    const existingProgress = this._progress.get(lessonId);
    
    if (!existingProgress) {
      this.startLesson(lessonId);
    }

    const updatedProgress: LessonProgress = {
      ...existingProgress!,
      score,
      timeSpentSeconds: (existingProgress?.timeSpentSeconds || 0) + timeSpent,
      completed: score >= 0.7
    };

    this._progress.set(lessonId, updatedProgress);

    this.addDomainEvent(new ProgressUpdated(
      this.id,
      this._userId,
      this._courseId,
      this.calculateOverallProgress(),
      this.version + 1
    ));

    this.incrementVersion();
  }

  private calculateOverallProgress(): number {
    const completed = Array.from(this._progress.values()).filter(p => p.completed).length;
    const total = this._progress.size;
    return total > 0 ? completed / total : 0;
  }

  public getOverallProgress(): number {
    return this.calculateOverallProgress();
  }

  public getLessonProgress(lessonId: string): LessonProgress | undefined {
    return this._progress.get(lessonId);
  }
}