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
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Scenario-Based';
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

export interface PlaywrightDayTopic {
  id: string;
  topicNumber: number;
  title: string;
  durationMinutes: number;
  explanation: string;
  keyTakeaways: string[];
  terminology: Array<{ term: string; definition: string }>;
  examples: PlaywrightTopicExample[];
  exercise?: PlaywrightInteractiveExercise;
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
  topics: PlaywrightDayTopic[];
  roadmap: Array<{
    day: number;
    title: string;
    focus: string;
    isCurrent?: boolean;
    isCompleted?: boolean;
  }>;
  interviewQuestions: PlaywrightInterviewQuestion[];
  quizQuestions: PlaywrightQuizQuestion[];
  starterCode?: string;
  starterExplanation?: string;
  starterOutput?: string;
  evaluateAssignment?: (code: string, output: string, explanation: string) => any;
  finalAssessment?: PlaywrightFinalAssessmentQuestion[];
}

export type PlaywrightDay1Unit = PlaywrightDayUnit;
export type PlaywrightDay2Unit = PlaywrightDayUnit;
export type PlaywrightDay3Unit = PlaywrightDayUnit;
export type PlaywrightDay4Unit = PlaywrightDayUnit;
export type PlaywrightDay5Unit = PlaywrightDayUnit;
export type PlaywrightDay6Unit = PlaywrightDayUnit;
export type PlaywrightDay7Unit = PlaywrightDayUnit;
export type PlaywrightDay8Unit = PlaywrightDayUnit;
export type PlaywrightDay9Unit = PlaywrightDayUnit;
export type PlaywrightDay10Unit = PlaywrightDayUnit;
export type PlaywrightDay11Unit = PlaywrightDayUnit;
export type PlaywrightDay12Unit = PlaywrightDayUnit;
export type PlaywrightDay13Unit = PlaywrightDayUnit;
export type PlaywrightDay14Unit = PlaywrightDayUnit;
export type PlaywrightDay15Unit = PlaywrightDayUnit;
export type PlaywrightDay16Unit = PlaywrightDayUnit;
export type PlaywrightDay17Unit = PlaywrightDayUnit;
export type PlaywrightDay18Unit = PlaywrightDayUnit;
export type PlaywrightDay19Unit = PlaywrightDayUnit;
export type PlaywrightDay20Unit = PlaywrightDayUnit;

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

export interface PlaywrightDay5AssignmentRubric {
  hasFormFillingActions: boolean;
  usesClickAndCheck: boolean;
  usesSelectOption: boolean;
  hasWebFirstAssertions: boolean;
  validatesFormSubmission: boolean;
  testsPositiveScenario: boolean;
  testsNegativeValidation: boolean;
  usesArrangeActAssert: boolean;
  hasMeaningfulTestNames: boolean;
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

export interface PlaywrightDay6AssignmentRubric {
  eliminatesArbitraryWaits: boolean;
  usesWebFirstAssertions: boolean;
  implementsWaitForURL: boolean;
  implementsResponseWaiting: boolean;
  replacesBrittleSelectors: boolean;
  configuresTimeoutsSensibly: boolean;
  avoidsSharedTestState: boolean;
  demonstratesDebuggingTechnique: boolean;
  explainsFlakinessRootCause: boolean;
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

export interface PlaywrightDay7AssignmentRubric {
  implementsNavigationValidation: boolean;
  handlesMultipleTabsContext: boolean;
  registersTabEventBeforeAction: boolean;
  interactsWithIframeViaFrameLocator: boolean;
  handlesDialogWithEventListener: boolean;
  acceptsOrDismissesDialog: boolean;
  uploadsFileUsingSetInputFiles: boolean;
  handlesDownloadEventProperly: boolean;
  verifiesDownloadedFile: boolean;
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

export interface PlaywrightDay8AssignmentRubric {
  organizesWithDescribeBlocks: boolean;
  implementsBeforeEachHook: boolean;
  ensuresTestIndependence: boolean;
  createsCustomFixtureWithExtend: boolean;
  extractsReusableHelperFunction: boolean;
  passesLocatorsToHelpers: boolean;
  providesPlaywrightConfigFile: boolean;
  demonstratesCliRunCommands: boolean;
  maintainsCleanDirectoryStructure: boolean;
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

export interface PlaywrightSurpriseAssessmentQuestion {
  id: string;
  questionNumber: number;
  question: string;
  codeSnippet?: string;
  scenario: string;
  options: [string, string, string, string];
  correctAnswerIndex: number;
  explanation: string;
  topicTag: 'Locators' | 'Actions & Assertions' | 'Auto-Waiting & Flakiness';
}

export interface PlaywrightAssignmentRubricBase {
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

export interface PlaywrightDay9AssignmentRubric extends PlaywrightAssignmentRubricBase {
  hasParameterizedSuite: boolean;
  hasEightOrMoreDatasets: boolean;
  testsValidRegistration: boolean;
  testsMissingFields: boolean;
  testsInvalidEmail: boolean;
  testsBoundaryLength: boolean;
  testsInvalidFormats: boolean;
  ensuresTestIndependence: boolean;
  usesDescriptiveTestTitles: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay10AssignmentRubric extends PlaywrightAssignmentRubricBase {
  diagnosesLocatorFailure: boolean;
  fixesAssertionMismatch: boolean;
  replacesArbitrarySleepWithCondition: boolean;
  fixesIncorrectUrlExpectation: boolean;
  resolvesTestDataDependency: boolean;
  correctsFormInputValues: boolean;
  explainsRootCauseAnalysis: boolean;
  demonstratesTraceOrInspectorUsage: boolean;
  configuresHtmlReporter: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay11AssignmentRubric extends PlaywrightAssignmentRubricBase {
  implementsStorageState: boolean;
  testsSuccessfulLogin: boolean;
  testsInvalidCredentials: boolean;
  testsProtectedRoutes: boolean;
  testsUnauthorizedRedirect: boolean;
  testsLogoutFlow: boolean;
  ensuresTestIsolation: boolean;
  usesEnvironmentVariables: boolean;
  avoidsHardcodedPasswords: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay12AssignmentRubric extends PlaywrightAssignmentRubricBase {
  createsPageObjectClass: boolean;
  locatorsAsProperties: boolean;
  encapsulatesPageInteractions: boolean;
  keepsAssertionsInTests: boolean;
  refactorsDuplicatedActions: boolean;
  demonstratesMultiplePages: boolean;
  maintainsCleanProjectStructure: boolean;
  avoidsOversizedGodObjects: boolean;
  usesModernClassSyntax: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay13AssignmentRubric extends PlaywrightAssignmentRubricBase {
  usesRequestFixture: boolean;
  testsGetEndpoint: boolean;
  testsPostEndpoint: boolean;
  testsPutOrPatchEndpoint: boolean;
  testsDeleteEndpoint: boolean;
  assertsStatusCodes: boolean;
  validatesResponseBodySchema: boolean;
  testsNegativeErrorScenario: boolean;
  integratesUiWithApiVerification: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay14AssignmentRubric extends PlaywrightAssignmentRubricBase {
  configuresPlaywrightConfigFile: boolean;
  definesBaseUrl: boolean;
  configuresMultiBrowserProjects: boolean;
  setsSensibleTimeoutsAndRetries: boolean;
  removesCommittedSecrets: boolean;
  configuresWorkersAndParallelism: boolean;
  demonstratesTargetedCliExecution: boolean;
  includesGitignoreBestPractices: boolean;
  explainsCrossBrowserDifferences: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay15AssignmentRubric extends PlaywrightAssignmentRubricBase {
  createsGitHubActionsWorkflow: boolean;
  configuresPushAndPrTriggers: boolean;
  installsNodeAndDependencies: boolean;
  installsPlaywrightBrowsers: boolean;
  executesPlaywrightTests: boolean;
  uploadsReportArtifacts: boolean;
  diagnosesThreeCiBugs: boolean;
  avoidsUnconditionalRetries: boolean;
  exposesTestFailuresClearly: boolean;
  validYamlSyntax: boolean;
}

export interface PlaywrightDay16AssignmentRubric extends PlaywrightAssignmentRubricBase {
  appliesStructuredPromptPattern: boolean;
  reviewsAiGeneratedLocators: boolean;
  prioritizesAccessibleRoles: boolean;
  identifiesFiveFlawsInAiCode: boolean;
  eliminatesHardcodedSleeps: boolean;
  strengthensWeakAssertions: boolean;
  avoidsHallucinatedMethods: boolean;
  documentsAcceptedAndRejectedSuggestions: boolean;
  verifiesAgainstRealDom: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay17AssignmentRubric extends PlaywrightAssignmentRubricBase {
  gathersSystematicFailureEvidence: boolean;
  sanitizesSensitiveDataForAi: boolean;
  evaluatesRankedAiHypotheses: boolean;
  distinguishesAppVsAutomationDefects: boolean;
  rejectsDeceptiveAiFixes: boolean;
  fixesTimingAndRaceConditions: boolean;
  resolvesAmbiguousLocators: boolean;
  appliesMinimalSurgicalFix: boolean;
  verifiesNoRegressions: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay18AssignmentRubric extends PlaywrightAssignmentRubricBase {
  extractsRequirementsToScenarioMatrix: boolean;
  discoversEdgeCasesAndBoundaries: boolean;
  createsSyntheticTestDataSets: boolean;
  avoidsProductionPiiInAiPrompts: boolean;
  prioritizesHighRiskWorkflows: boolean;
  mapsRequirementsToTests: boolean;
  authorsPlaywrightTestSkeletons: boolean;
  validatesErrorHandlingExpectations: boolean;
  demonstratesCoverageTraceability: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay19AssignmentRubric extends PlaywrightAssignmentRubricBase {
  evaluatesFrameworkOnSixPillars: boolean;
  auditsLocatorResilience: boolean;
  evaluatesAiModernizationPlan: boolean;
  refactorsSharedHelpersAndFixtures: boolean;
  understandsPlaywrightMcpProtocol: boolean;
  explainsAiAgentToolInterfaces: boolean;
  definesSecurityBoundariesForMcp: boolean;
  avoidsUncontrolledBrowserActions: boolean;
  verifiesZeroBehavioralRegressions: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightDay20AssignmentRubric extends PlaywrightAssignmentRubricBase {
  implementsEcommerceWorkflows: boolean;
  usesSemanticLocators: boolean;
  implementsPageObjectModel: boolean;
  incorporatesApiVerification: boolean;
  maintainsStorageStateAuth: boolean;
  ensuresTestIndependence: boolean;
  configuresCiPipelineAndReports: boolean;
  documentsAiAuditDecisions: boolean;
  satisfiesTwelveMilestones: boolean;
  syntacticallyValidJavaScript: boolean;
}

export interface PlaywrightFinalAssessmentQuestion {
  id: string;
  questionNumber: number;
  question: string;
  codeSnippet?: string;
  options: [string, string, string, string];
  correctAnswerIndex: number;
  explanation: string;
  category:
    | 'Fundamentals & Architecture'
    | 'Locators & Selectors'
    | 'Actions, Assertions & Auto-Waiting'
    | 'Test Organization, Hooks & Fixtures'
    | 'Data-Driven Testing'
    | 'Debugging & Trace Viewer'
    | 'Authentication & Isolation'
    | 'Page Object Model'
    | 'API Testing & Integration'
    | 'Configuration & Cross-Browser'
    | 'CI/CD Pipelines'
    | 'AI Testing, Flakiness & MCP';
}

