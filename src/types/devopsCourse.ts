export interface DevOpsRoadmapDay {
  dayNumber: number;
  moduleNumber: number;
  title: string;
  subtitle: string;
  estimatedHours: string;
  status: 'implemented' | 'upcoming';
  keyTopics: string[];
}

export interface DevOpsModule {
  moduleNumber: number;
  title: string;
  description: string;
  days: DevOpsRoadmapDay[];
  badge?: string;
}

export interface DevOpsTopic {
  id: string;
  topicNumber: number;
  title: string;
  durationMinutes: number;
  explanation: string;
  keyTakeaways: string[];
  codeSnippets?: Array<{
    language: string;
    title?: string;
    code: string;
  }>;
  diagrams?: Array<{
    title: string;
    description: string;
    asciiArt?: string;
  }>;
  commonPitfalls?: string[];
}

export interface DevOpsCheckpointQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DevOpsQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  domain: string;
}

export interface DevOpsInterviewQuestion {
  id: string;
  question: string;
  targetRole: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Scenario';
  modelAnswer: string;
  keyPoints: string[];
  commonMistakes: string[];
}

export interface DevOpsDayUnit {
  dayNumber: number;
  moduleNumber: number;
  moduleTitle: string;
  lessonTitle: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate';
  estimatedHours: string;
  prerequisites: string;
  learningObjectives: string[];
  topics: DevOpsTopic[];
  checkpoints: DevOpsCheckpointQuestion[];
  quizQuestions: DevOpsQuizQuestion[];
  interviewQuestions: DevOpsInterviewQuestion[];
  pdfDownloadUrl: string;
  pdfFileName: string;
}

export interface DevOpsDayProgress {
  dayNumber: number;
  topicsRead: boolean[];
  activitiesCompleted: Record<string, boolean>;
  checkpointsPassed: boolean[];
  assignmentSubmitted: boolean;
  assignmentScore?: number;
  assignmentFeedback?: string;
  assignmentData?: any;
  interviewReviewed: boolean;
  quizSubmitted: boolean;
  quizScore: number;
  quizPassed: boolean;
  quizAttempts: Array<{
    score: number;
    total: number;
    passed: boolean;
    timestamp: string;
  }>;
  completedAt?: string;
  isCompleted?: boolean;
}

export interface DevOpsLearnerState {
  enrolled: boolean;
  enrolledAt?: string;
  days: Record<number, DevOpsDayProgress>;
}
