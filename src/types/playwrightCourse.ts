export const PLAYWRIGHT_COURSE_TITLE = 'Playwright Automation with JavaScript + AI';
export const PLAYWRIGHT_TOTAL_DAYS = 20;

export interface PlaywrightTopic {
  id: string;
  topicNumber: number;
  title: string;
  durationMinutes: number;
  explanation: string;
  keyTakeaways: string[];
  terminology: Array<{ term: string; definition: string }>;
  examples: Array<{ title: string; description: string }>;
}

export interface PlaywrightScenarioRow {
  id: string;
  scenarioId: string;
  feature: string;
  scenario: string;
  candidateType: 'Automation' | 'Manual / Exploratory';
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
}

export interface PlaywrightInterviewQuestion {
  id: string;
  questionNumber: number;
  question: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Scenario-Based';
  assessmentFocus: string;
  modelAnswer: string;
  followUpQuestion?: string;
}

export interface PlaywrightQuizQuestion {
  id: string;
  questionNumber: number;
  question: string;
  options: [string, string, string, string];
  correctAnswerIndex: number;
  explanation: string;
}

export interface PlaywrightTopicExample {
  title: string;
  description: string;
  codeSnippet?: string;
  expectedOutput?: string;
}

export interface PlaywrightInteractiveExercise {
  id: string;
  title: string;
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface PlaywrightDayUnit {
  courseTitle: string;
  dayNumber: number;
  totalDays: number;
  lessonTitle: string;
  subtitle: string;
  level: string;
  estimatedHours: string;
  prerequisites: string;
  learningObjectives: string[];
  topics: Array<{
    id: string;
    topicNumber: number;
    title: string;
    durationMinutes: number;
    explanation: string;
    keyTakeaways: string[];
    terminology: Array<{ term: string; definition: string }>;
    examples: PlaywrightTopicExample[];
    exercise?: PlaywrightInteractiveExercise;
  }>;
  roadmap: Array<{
    day: number;
    title: string;
    focus: string;
    isCurrent?: boolean;
    isCompleted?: boolean;
  }>;
  interviewQuestions: PlaywrightInterviewQuestion[];
  quizQuestions: PlaywrightQuizQuestion[];
}

export type PlaywrightDay1Unit = PlaywrightDayUnit;
export type PlaywrightDay2Unit = PlaywrightDayUnit;
export type PlaywrightDay3Unit = PlaywrightDayUnit;
export type PlaywrightDay4Unit = PlaywrightDayUnit;

export interface PlaywrightDay2AssignmentRubric {
  syntaxCorrect: boolean;
  hasScenarioArray: boolean;
  scenarioCountValid: boolean;
  hasRequiredFields: boolean;
  hasSummaryFunction: boolean;
  hasLoop: boolean;
  hasCondition: boolean;
  hasAsyncAwait: boolean;
  hasAsyncExplanation: boolean;
  hasExpectedOutput: boolean;
  score: number;
  feedback: string[];
  passed: boolean;
  criteria: Array<{
    id: string;
    title: string;
    passed: boolean;
    feedback: string;
  }>;
}

export interface PlaywrightDay3AssignmentRubric {
  projectSetupConfirmed: boolean;
  hasTestImport: boolean;
  hasTestDeclaration: boolean;
  navigatesToPage: boolean;
  usesAccessibleLocator: boolean;
  hasWebFirstAssertion: boolean;
  hasHeadlessRunOutput: boolean;
  hasHeadedRunOutput: boolean;
  explainsPlaywrightKeywords: boolean;
  troubleshootingAddressed: boolean;
  score: number;
  feedback: string[];
  passed: boolean;
  criteria: Array<{
    id: string;
    title: string;
    passed: boolean;
    feedback: string;
  }>;
}

export interface PlaywrightDay4AssignmentRubric {
  targetElementsIdentified: boolean;
  usesAccessibleLocators: boolean;
  hasThreeAssertions: boolean;
  narrowsMultipleMatches: boolean;
  aiSuggestionDocumented: boolean;
  hasTerminalOutput: boolean;
  locatorStrategyExplained: boolean;
  strictnessAddressed: boolean;
  aiVerificationMethodExplained: boolean;
  syntacticallyValidJavaScript: boolean;
  score: number;
  feedback: string[];
  passed: boolean;
  criteria: Array<{
    id: string;
    title: string;
    passed: boolean;
    feedback: string;
  }>;
}
