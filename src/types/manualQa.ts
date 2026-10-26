export type DayProgressStatus =
  | 'locked'
  | 'available'
  | 'in_progress'
  | 'awaiting_review'
  | 'failed'
  | 'completed';

export interface DayProgress {
  dayNumber: number; // 1 to 5
  status: DayProgressStatus;
  contentCompleted: boolean;
  practicalCompleted: boolean;
  checkpointScore: number;
  checkpointPassed: boolean;
  completedAt?: string;
  lastAttemptAt?: string;
}

export interface ConceptExplanation {
  title: string;
  explanation: string;
  examples: Array<{ project: string; description: string }>;
  terminology: Array<{ term: string; definition: string }>;
  commonMistakes: string[];
  workedExample?: {
    scenario: string;
    walkthrough: string;
    sampleTable?: Array<Record<string, string>>;
  };
}

export interface GuidedExercise {
  title: string;
  description: string;
  steps: string[];
  sampleSpecification: string;
}

export interface PracticalRubricCriterion {
  id: string;
  title: string;
  description: string;
  minCountRequired?: number;
  weight: number;
}

export interface PracticalAssignmentSpec {
  title: string;
  description: string;
  submissionType: 'test_scenarios' | 'test_cases' | 'defect_reports' | 'agile_workflow' | 'final_project';
  targetSystemBrief: string;
  instructions: string[];
  criteria: PracticalRubricCriterion[];
}

export interface InterviewQuestionItem {
  question: string;
  type: 'Theoretical' | 'Difference-Based' | 'Scenario' | 'Workplace Behavioral' | 'Foundational' | 'Terminology' | 'Process' | 'Practical Approach' | 'Scenario Investigation' | string;
  modelAnswer: string;
  followUp?: string;
  commonMistakes: string[];
}

export interface ManualQaDayUnit {
  dayNumber: number;
  title: string;
  subtitle: string;
  estimatedHours: string;
  learningObjectives: string[];
  concepts: ConceptExplanation[];
  guidedExercise: GuidedExercise;
  practicalAssignment: PracticalAssignmentSpec;
  interviewQuestions: InterviewQuestionItem[];
  keyTakeaways: string[];
  revisionNotes: string[];
  pdfDownloadUrl: string;
}

export type QuestionType = 'multiple_choice' | 'multiple_select' | 'scenario' | 'short_answer';

export interface InterviewBankQuestion {
  id: string;
  dayNumber: number; // 1 to 5
  questionText: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questionType: QuestionType;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswerIndices?: number[];
  expectedAnswerPoints: string[];
  modelAnswer: string;
  explanation: string;
  commonMistakes: string[];
  followUpQuestion?: string;
  marks: number;
}

export interface PracticalEvaluationResult {
  passed: boolean;
  score: number;
  maxScore: number;
  feedback: string;
  criteriaResults: Array<{
    criterionId: string;
    title: string;
    passed: boolean;
    feedback: string;
  }>;
}

export interface AssessmentAttempt {
  id: string;
  userId: string;
  assessmentType:
    | 'day_1_checkpoint'
    | 'day_2_checkpoint'
    | 'day_3_checkpoint'
    | 'surprise_test_1'
    | 'day_4_checkpoint'
    | 'final_surprise_assessment';
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  questionIds: string[];
  answers: Record<string, any>;
  attemptedAt: string;
}

export interface ManualQaOverallState {
  days: Record<number, DayProgress>;
  surpriseTest1Passed: boolean;
  surpriseTest1Score?: number;
  finalAssessmentPassed: boolean;
  finalAssessmentScore?: number;
  finalProjectPassed: boolean;
  courseCompleted: boolean;
  certificateId?: string;
  completedAt?: string;
  isCloudSynced: boolean;
  cloudMissingReason?: string;
}
