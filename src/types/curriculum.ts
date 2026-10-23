export type LessonDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface LessonSection {
  title: string;
  content: string; // Plain text or markdown-style text
  codeSnippet?: {
    language: string;
    code: string;
  };
  callout?: {
    type: 'tip' | 'warning' | 'info' | 'interview';
    title: string;
    text: string;
  };
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  durationMinutes: number;
  difficulty: LessonDifficulty;
  summary: string;
  sections: LessonSection[];
  keyTakeaways: string[];
  practicalChecklist: string[];
  interactiveLabId?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  passingScorePercent: number;
  questions: QuizQuestion[];
}

export interface Course {
  id: string;
  slug: string;
  trackId: string;
  trackName: string;
  title: string;
  description: string;
  iconName: string;
  badge: string;
  estimatedHours: number;
  learningOutcomes: string[];
  lessons: Lesson[];
  quiz: Quiz;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  iconName: string;
  courses: Course[];
}

export interface SimulatedBug {
  id: string;
  name: string;
  targetArea: string;
  expectedSeverity: 'Blocker' | 'Critical' | 'Major' | 'Minor';
  hint: string;
  explanation: string;
}

export interface BugReportSubmission {
  scenarioId: string;
  bugId: string;
  title: string;
  severity: 'Blocker' | 'Critical' | 'Major' | 'Minor';
  stepsToReproduce: string;
  expectedBehavior: string;
  actualBehavior: string;
  submittedAt: string;
}

export interface QuizScoreRecord {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
}

export interface ProgressState {
  completedLessons: string[]; // list of lesson IDs
  quizScores: Record<string, QuizScoreRecord>; // keyed by course slug
  reportedBugs: Record<string, BugReportSubmission>; // keyed by bugId
  lastVisitedPath?: string;
}
