import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { AssessmentStarted } from '../events/assessment-started.event';
import { AnswerSubmitted } from '../events/answer-submitted.event';
import { AssessmentCompleted } from '../events/assessment-completed.event';

export interface Question {
  id: string;
  type: 'multiple-choice' | 'code' | 'interview' | 'essay';
  content: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  timeLimit?: number; // seconds
}

export interface Answer {
  questionId: string;
  userAnswer: any;
  submittedAt: Date;
  timeSpent: number; // seconds
  isCorrect?: boolean;
  score: number;
}

export interface AssessmentMetadata {
  title: string;
  description: string;
  type: 'quiz' | 'interview' | 'final-exam';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalPoints: number;
  timeLimit: number; // minutes
  passingScore: number; // percentage
}

export class Assessment extends AggregateRoot {
  private _questions: Map<string, Question> = new Map();
  private _answers: Map<string, Answer> = new Map(); // questionId -> Answer
  private _startedAt?: Date;
  private _completedAt?: Date;
  private _isCompleted: boolean = false;

  private constructor(
    id: string,
    private _userId: string,
    private _metadata: AssessmentMetadata,
    questions: Map<string, Question> = new Map(),
    answers: Map<string, Answer> = new Map(),
    startedAt?: Date,
    completedAt?: Date,
    isCompleted: boolean = false,
    version: number = 0
  ) {
    super(id, version);
    this._questions = questions;
    this._answers = answers;
    this._startedAt = startedAt;
    this._completedAt = completedAt;
    this._isCompleted = isCompleted;
  }

  public static create(
    id: string,
    userId: string,
    metadata: AssessmentMetadata,
    questions: Question[]
  ): Assessment {
    const questionMap = new Map(questions.map(q => [q.id, q]));
    return new Assessment(id, userId, metadata, questionMap, new Map(), undefined, undefined, false, 0);
  }

  public static fromHistory(
    id: string,
    userId: string,
    metadata: AssessmentMetadata,
    questions: Map<string, Question>,
    answers: Map<string, Answer>,
    startedAt?: Date,
    completedAt?: Date,
    isCompleted: boolean = false,
    version: number = 0
  ): Assessment {
    return new Assessment(id, userId, metadata, questions, answers, startedAt, completedAt, isCompleted, version);
  }

  get userId(): string {
    return this._userId;
  }

  get metadata(): AssessmentMetadata {
    return { ...this._metadata };
  }

  get questions(): Question[] {
    return Array.from(this._questions.values());
  }

  get answers(): Answer[] {
    return Array.from(this._answers.values());
  }

  get isStarted(): boolean {
    return this._startedAt !== undefined;
  }

  get isCompleted(): boolean {
    return this._isCompleted;
  }

  get startedAt(): Date | undefined {
    return this._startedAt;
  }

  get completedAt(): Date | undefined {
    return this._completedAt;
  }

  public start(): void {
    if (this.isStarted) {
      throw new Error('Assessment already started');
    }

    this._startedAt = new Date();

    this.addDomainEvent(new AssessmentStarted(
      this.id,
      this._userId,
      this._metadata.type,
      this._startedAt,
      this.version + 1
    ));

    this.incrementVersion();
  }

  public submitAnswer(questionId: string, userAnswer: any, timeSpent: number): void {
    if (!this.isStarted) {
      throw new Error('Assessment not started');
    }

    if (this.isCompleted) {
      throw new Error('Assessment already completed');
    }

    const question = this._questions.get(questionId);
    if (!question) {
      throw new Error(`Question ${questionId} not found`);
    }

    // Check if already answered
    if (this._answers.has(questionId)) {
      throw new Error(`Question ${questionId} already answered`);
    }

    // Score the answer
    const { isCorrect, score } = this.scoreAnswer(question, userAnswer);

    const answer: Answer = {
      questionId,
      userAnswer,
      submittedAt: new Date(),
      timeSpent,
      isCorrect,
      score
    };

    this._answers.set(questionId, answer);

    this.addDomainEvent(new AnswerSubmitted(
      this.id,
      this._userId,
      questionId,
      userAnswer,
      score,
      isCorrect,
      this.version + 1
    ));

    this.incrementVersion();

    // Auto-complete if all questions answered
    if (this._answers.size === this._questions.size) {
      this.complete();
    }
  }

  public complete(): void {
    if (!this.isStarted) {
      throw new Error('Assessment not started');
    }

    if (this.isCompleted) {
      throw new Error('Assessment already completed');
    }

    this._completedAt = new Date();
    this._isCompleted = true;

    const totalScore = this.calculateTotalScore();
    const percentage = this.calculatePercentage();
    const passed = percentage >= this._metadata.passingScore;

    this.addDomainEvent(new AssessmentCompleted(
      this.id,
      this._userId,
      totalScore,
      percentage,
      passed,
      this._completedAt,
      this.version + 1
    ));

    this.incrementVersion();
  }

  public calculateTotalScore(): number {
    return Array.from(this._answers.values()).reduce((total, answer) => total + answer.score, 0);
  }

  public calculatePercentage(): number {
    const totalPossible = this._metadata.totalPoints;
    const totalEarned = this.calculateTotalScore();
    return totalPossible > 0 ? (totalEarned / totalPossible) * 100 : 0;
  }

  public getTimeElapsed(): number {
    if (!this.isStarted) return 0;
    const endTime = this.isCompleted ? this._completedAt! : new Date();
    return Math.floor((endTime.getTime() - this._startedAt!.getTime()) / 1000);
  }

  public isTimeExpired(): boolean {
    if (!this.isStarted) return false;
    const timeElapsed = this.getTimeElapsed();
    return timeElapsed > this._metadata.timeLimit * 60; // timeLimit is in minutes
  }

  private scoreAnswer(question: Question, userAnswer: any): { isCorrect: boolean; score: number } {
    switch (question.type) {
      case 'multiple-choice':
        const isCorrect = question.correctAnswer === userAnswer;
        return { isCorrect, score: isCorrect ? question.points : 0 };
        
      case 'code':
        // TODO: Implement code evaluation logic
        return { isCorrect: false, score: 0 };
        
      case 'interview':
        // Interview questions are scored manually
        return { isCorrect: false, score: 0 };
        
      case 'essay':
        // Essay questions are scored manually
        return { isCorrect: false, score: 0 };
        
      default:
        return { isCorrect: false, score: 0 };
    }
  }
}