import { MANUAL_QA_QUESTION_BANK } from '../data/manualQaQuestionBank';
import type {
  InterviewBankQuestion,
  PracticalEvaluationResult,
  AssessmentAttempt,
} from '../types/manualQa';

/**
 * Strips correct answers from questions so client-side test runners cannot inspect answer keys.
 */
export function getSanitizedQuestions(
  input: InterviewBankQuestion[] | number = MANUAL_QA_QUESTION_BANK
) {
  const pool =
    typeof input === 'number'
      ? MANUAL_QA_QUESTION_BANK.filter((q) => q.dayNumber === input)
      : Array.isArray(input)
      ? input
      : MANUAL_QA_QUESTION_BANK;

  return pool.map((q) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { correctAnswerIndex, correctAnswerIndices, ...safeQuestion } = q;
    return safeQuestion;
  });
}

/**
 * Randomly samples `count` items from an array using Fisher-Yates shuffle.
 */
export function sampleRandomQuestions(
  pool: InterviewBankQuestion[],
  count: number
): InterviewBankQuestion[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Objective scoring engine for assessments.
 * Calculates score, percentage, pass/fail, and detailed explanation feedback.
 */
export function gradeAssessmentAttempt(
  userId: string,
  assessmentType: AssessmentAttempt['assessmentType'],
  questionIds: string[],
  submittedAnswers: Record<string, any>,
  passingThresholdPercent = 80
): {
  attempt: AssessmentAttempt;
  feedbackDetails: Array<{
    questionId: string;
    questionText: string;
    isCorrect: boolean;
    userAnswer: any;
    correctAnswer: any;
    explanation: string;
    modelAnswer: string;
  }>;
} {
  let earnedMarks = 0;
  let totalMarks = 0;

  const feedbackDetails = questionIds.map((qId) => {
    const question = MANUAL_QA_QUESTION_BANK.find((q) => q.id === qId);
    if (!question) {
      return {
        questionId: qId,
        questionText: 'Unknown question',
        isCorrect: false,
        userAnswer: submittedAnswers[qId],
        correctAnswer: null,
        explanation: 'Question definition missing from bank.',
        modelAnswer: '',
      };
    }

    const marksAvailable = question.marks || 10;
    totalMarks += marksAvailable;

    const userAnswer = submittedAnswers[qId];
    let isCorrect = false;

    if (question.questionType === 'multiple_choice') {
      isCorrect = userAnswer === question.correctAnswerIndex;
    } else if (question.questionType === 'multiple_select') {
      if (Array.isArray(userAnswer) && Array.isArray(question.correctAnswerIndices)) {
        const sortedUser = [...userAnswer].sort();
        const sortedCorrect = [...question.correctAnswerIndices].sort();
        isCorrect =
          sortedUser.length === sortedCorrect.length &&
          sortedUser.every((val, index) => val === sortedCorrect[index]);
      }
    } else {
      // Scenario / short answer: checks for presence of required keywords or non-empty thoughtful response
      if (typeof userAnswer === 'string' && userAnswer.trim().length >= 20) {
        isCorrect = true;
      }
    }

    if (isCorrect) {
      earnedMarks += marksAvailable;
    }

    let correctText: any = null;
    if (question.questionType === 'multiple_choice' && question.options) {
      correctText = question.options[question.correctAnswerIndex ?? 0];
    } else if (question.questionType === 'multiple_select' && question.options) {
      correctText = question.correctAnswerIndices?.map((idx) => question.options![idx]) ?? [];
    } else {
      correctText = question.modelAnswer;
    }

    return {
      questionId: qId,
      questionText: question.questionText,
      isCorrect,
      userAnswer,
      correctAnswer: correctText,
      explanation: question.explanation,
      modelAnswer: question.modelAnswer,
    };
  });

  const percentage = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;
  const passed = percentage >= passingThresholdPercent;

  const attempt: AssessmentAttempt = {
    id: `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId,
    assessmentType,
    score: earnedMarks,
    totalQuestions: questionIds.length,
    percentage,
    passed,
    questionIds,
    answers: submittedAnswers,
    attemptedAt: new Date().toISOString(),
  };

  return {
    attempt,
    feedbackDetails,
  };
}

// Helper to check for gibberish/spam in testing inputs
function isGibberish(text: string): boolean {
  if (!text || text.trim().length < 8) return true;
  const words = text.trim().toLowerCase().split(/[\s,.;:!?()[\]{}<>"'/\\|`~*#&^%$@+=_-]+/).filter(Boolean);
  if (words.length < 2) return true;
  const uniqueWords = new Set(words);
  if (words.length >= 5 && uniqueWords.size / words.length < 0.4) return true;
  if (/[bcdfghjklmnpqrstvwxyz]{6,}/i.test(text)) return true;
  if (/(.)\1{4,}/.test(text)) return true;
  const mashCount = words.filter((w) => /^(asdf|qwerty|zxcv|hjkl|lkjh|qwer|asdfgh|1234|test1|test2|random)/i.test(w)).length;
  if (mashCount > 0 && mashCount / words.length >= 0.4) return true;
  return false;
}

/**
 * Deterministic rubric evaluator for Day 1 practical assignment (Test Scenarios).
 */
export function evaluateDay1Assignment(input: any): PracticalEvaluationResult {
  const rawScenarios: any[] = Array.isArray(input) ? input : input?.scenarios || [];
  const criteriaResults = [];

  // Filter out gibberish or empty rows
  const testTerms = ['login', 'email', 'pass', 'valid', 'invalid', 'user', 'error', 'redirect', 'verify', 'screen', 'dashboard', 'auth', 'empty', 'blank', 'lock', 'fail', 'deny', 'denied', 'message', 'alert', 'session', 'timeout', 'format', 'field', 'button', 'credential'];
  const scenarios = rawScenarios.filter((s) => {
    const title = String(s.testScenario || s.title || s.name || '').trim();
    const purpose = String(s.purpose || s.expectedBehavior || s.expectedResult || s.expected || '').trim();
    if (title.length < 8 || purpose.length < 8) return false;
    if (isGibberish(title) || isGibberish(purpose)) return false;
    const combined = (title + ' ' + purpose).toLowerCase();
    return testTerms.some((t) => combined.includes(t));
  });

  // Criterion 1: At least 6 valid scenarios (with commendation for 10+)
  const hasMinCount = scenarios.length >= 6;
  const hasTargetCount = scenarios.length >= 10;
  criteriaResults.push({
    criterionId: 'crit-min-scenarios',
    title: 'Minimum Test Scenarios (10 recommended, 6 minimum required)',
    passed: hasMinCount,
    feedback: hasTargetCount
      ? `Documented ${scenarios.length} comprehensive test scenarios (exceeds target of 10).`
      : hasMinCount
      ? `Documented ${scenarios.length} test scenarios (meets minimum requirement of 6; 10 recommended for full coverage).`
      : rawScenarios.length > scenarios.length
      ? `Provided ${rawScenarios.length} entries, but only ${scenarios.length} contain valid, non-gibberish testing specifications with genuine login verification outcomes. Minimum 6 required.`
      : `Documented ${scenarios.length} test scenarios. Minimum 6 required for basic evaluation.`,
  });

  // Criterion 2: Balanced Positive and Negative coverage
  const positiveCount = scenarios.filter((s) => {
    const t = String(s.scenarioType || s.type || '').toLowerCase();
    return t.includes('pos');
  }).length;
  const negativeCount = scenarios.filter((s) => {
    const t = String(s.scenarioType || s.type || '').toLowerCase();
    return t.includes('neg') || t.includes('val') || t.includes('input');
  }).length;
  const hasBalancedCoverage = positiveCount >= 2 && negativeCount >= 3;
  criteriaResults.push({
    criterionId: 'crit-pos-neg',
    title: 'Balanced Positive & Negative/Validation Coverage',
    passed: hasBalancedCoverage,
    feedback: hasBalancedCoverage
      ? `Includes ${positiveCount} positive and ${negativeCount} negative/validation scenarios.`
      : `Requires at least 2 positive flows and 3 negative/edge/validation flows. (Found: ${positiveCount} positive, ${negativeCount} negative/validation).`,
  });

  // Criterion 3: Explicit purpose or expected behaviors
  const validExpectedSpecs = scenarios.filter((s) => {
    const exp = s.purpose || s.expectedBehavior || s.expectedResult || s.expected || '';
    return String(exp).trim().length >= 8 && !isGibberish(String(exp));
  }).length;
  const hasExpectedSpecs = validExpectedSpecs >= scenarios.length && scenarios.length > 0;
  criteriaResults.push({
    criterionId: 'crit-expected-spec',
    title: 'Clear Purpose and Expected Behavior Specifications',
    passed: hasExpectedSpecs,
    feedback: hasExpectedSpecs
      ? 'All scenarios contain detailed purpose or expected outcome specifications.'
      : 'One or more scenarios lack clear purpose or expected outcomes (minimum 8 characters required without random text).',
  });

  const passedCriteriaCount = criteriaResults.filter((c) => c.passed).length;
  const score = Math.round((passedCriteriaCount / criteriaResults.length) * 100);
  const passed = score >= 70 && hasMinCount && hasBalancedCoverage;
  const failedFeedback = criteriaResults
    .filter((c) => !c.passed)
    .map((c) => c.feedback)
    .join(' ');

  return {
    passed,
    score,
    maxScore: 100,
    feedback: passed
      ? 'Day 1 practical assignment passed! Comprehensive login scenarios and edge coverage demonstrated.'
      : `Day 1 practical assignment requires revision. ${failedFeedback}`,
    criteriaResults,
  };
}

/**
 * Deterministic rubric evaluator for Day 2 practical assignment (Test Cases).
 */
export function evaluateDay2Assignment(input: any): PracticalEvaluationResult {
  const testCases: any[] = Array.isArray(input) ? input : input?.testCases || [];
  const criteriaResults = [];

  // Criterion 1: At least 8 test cases
  const hasMinCount = testCases.length >= 8;
  criteriaResults.push({
    criterionId: 'crit-min-test-cases',
    title: 'Minimum 8 Structured Test Cases',
    passed: hasMinCount,
    feedback: hasMinCount
      ? `Provided ${testCases.length} structured test cases (meets minimum of 8).`
      : `Provided ${testCases.length} test cases. Minimum 8 required.`,
  });

  // Criterion 2: Boundary Value Analysis inclusion
  const combinedTestData = testCases
    .map((tc) => `${tc.testData || tc.bvaValue || ''} ${tc.steps || tc.title || ''}`)
    .join(' ');
  const hasBvaNumbers =
    /17|18|19|64|65|66/.test(combinedTestData) ||
    /7|8|20|21/.test(combinedTestData) ||
    /100|99|500|501|0/.test(combinedTestData) ||
    /min|boundary|max|lower|upper/i.test(combinedTestData);

  criteriaResults.push({
    criterionId: 'crit-bva-values',
    title: 'Boundary Value Analysis Inclusion',
    passed: hasBvaNumbers,
    feedback: hasBvaNumbers
      ? 'BVA data points identified in test data (boundary points like 17, 18, 99.99, 100, 500 or min/max limits).'
      : 'Missing explicit Boundary Value Analysis points (e.g. testing lower/upper boundaries or min/max lengths).',
  });

  // Criterion 3: Standard template completeness
  const completeCases = testCases.filter((tc) => {
    const hasId = Boolean(tc.id && String(tc.id).trim().length > 0);
    const hasTitle = Boolean(tc.title && String(tc.title).trim().length >= 5);
    const hasExpected = Boolean(
      (tc.expectedResult && String(tc.expectedResult).trim().length >= 5) ||
      (tc.expected && String(tc.expected).trim().length >= 5)
    );
    return hasId && hasTitle && hasExpected;
  }).length;
  const isTemplateRigorous = completeCases >= 8;
  criteriaResults.push({
    criterionId: 'crit-template-rigor',
    title: 'Standard Test Case Structure',
    passed: isTemplateRigorous,
    feedback: isTemplateRigorous
      ? 'All test cases follow complete standard structure with explicit steps/title and expected outcome.'
      : 'Some test cases are missing id, title, or explicit expected outcomes.',
  });

  const passedCriteriaCount = criteriaResults.filter((c) => c.passed).length;
  const score = Math.round((passedCriteriaCount / criteriaResults.length) * 100);
  const passed = score >= 70 && hasMinCount;

  return {
    passed,
    score,
    maxScore: 100,
    feedback: passed
      ? 'Day 2 practical assignment passed! Comprehensive test cases with boundary coverage.'
      : 'Day 2 practical assignment needs revision to meet industry test case documentation standards.',
    criteriaResults,
  };
}

/**
 * Deterministic rubric evaluator for Day 3 practical assignment (Defect Reports).
 */
export function evaluateDay3Assignment(input: any): PracticalEvaluationResult {
  const reports: any[] = Array.isArray(input) ? input : input?.bugReports || input?.defectReports || [];
  const criteriaResults = [];

  // Criterion 1: At least 3 defect reports
  const hasMinCount = reports.length >= 3;
  criteriaResults.push({
    criterionId: 'crit-three-defects',
    title: 'At Least 3 Defect Reports',
    passed: hasMinCount,
    feedback: hasMinCount
      ? `Logged ${reports.length} defect reports (meets minimum requirement of 3).`
      : `Logged ${reports.length} defect reports. Minimum 3 required.`,
  });

  // Criterion 2: Complete Jira standard fields
  const completeReports = reports.filter((r) => {
    const hasTitle = Boolean(r.title && String(r.title).trim().length >= 8);
    const steps = r.stepsToReproduce || r.steps || '';
    const hasSteps = Boolean(String(steps).trim().length >= 10);
    const expected = r.expectedResult || r.expected || '';
    const actual = r.actualResult || r.actual || '';
    return hasTitle && hasSteps && String(expected).trim().length >= 5 && String(actual).trim().length >= 5;
  }).length;
  const hasAllFields = completeReports >= 3;
  criteriaResults.push({
    criterionId: 'crit-all-jira-fields',
    title: 'Complete Jira Standard Fields',
    passed: hasAllFields,
    feedback: hasAllFields
      ? 'All defect reports include Title, Steps, Expected, and Actual observed results.'
      : 'One or more defect reports have missing or incomplete Jira fields.',
  });

  // Criterion 3: Accurate Severity & Priority usage
  const hasSeverityVariety =
    reports.length >= 3 &&
    reports.some((r) => String(r.severity || '').toLowerCase().match(/blocker|critical|major/)) &&
    reports.some((r) => String(r.priority || '').toLowerCase().match(/p0|p1|p2|p3/));

  criteriaResults.push({
    criterionId: 'crit-severity-priority',
    title: 'Accurate Severity & Priority Classification',
    passed: hasSeverityVariety,
    feedback: hasSeverityVariety
      ? 'Appropriate classification showing distinction between critical impact and minor/major issues.'
      : 'Differentiate severity and priority accurately across your defect tickets (e.g. Critical, Major, P1, P2).',
  });

  const passedCriteriaCount = criteriaResults.filter((c) => c.passed).length;
  const score = Math.round((passedCriteriaCount / criteriaResults.length) * 100);
  const passed = score >= 70 && hasMinCount;

  return {
    passed,
    score,
    maxScore: 100,
    feedback: passed
      ? 'Day 3 defect reports approved! Professional Jira formatting and clear reproduction steps.'
      : 'Day 3 defect reports need revision. Ensure all Jira fields are thoroughly populated.',
    criteriaResults,
  };
}

/**
 * Deterministic rubric evaluator for Day 4 practical assignment (Agile Workflow & Test Summary).
 */
export function evaluateDay4Assignment(submission: any): PracticalEvaluationResult {
  const criteriaResults = [];

  // Criterion 1: Acceptance Criteria ambiguities
  const rawAmbiguities = submission?.ambiguities || submission?.ambiguityNotes || '';
  const hasAmbiguities =
    (Array.isArray(rawAmbiguities) && rawAmbiguities.length >= 2) ||
    (typeof rawAmbiguities === 'string' && rawAmbiguities.trim().length >= 30);

  criteriaResults.push({
    criterionId: 'crit-ambiguities-found',
    title: 'Ambiguities Identified',
    passed: Boolean(hasAmbiguities),
    feedback: hasAmbiguities
      ? 'Identified requirement ambiguities for product clarification.'
      : 'Please identify at least 2 clear requirement ambiguities or unhandled business edge cases.',
  });

  // Criterion 2: At least 4 test scenarios
  const rawScenarios = submission?.testScenarios || submission?.scenarios || '';
  const hasScenarios =
    (Array.isArray(rawScenarios) && rawScenarios.length >= 4) ||
    (typeof rawScenarios === 'string' && rawScenarios.trim().length >= 40);

  criteriaResults.push({
    criterionId: 'crit-scenarios-covered',
    title: 'Test Scenarios Formulated',
    passed: Boolean(hasScenarios),
    feedback: hasScenarios
      ? 'Formulated test scenarios covering functional and exploratory edge paths.'
      : 'Please formulate at least 4 practical test scenarios.',
  });

  // Criterion 3: Executive Test Summary Report
  const summaryObj = submission?.testSummaryReport;
  const summaryStr = submission?.summaryReport;
  const hasValidSummary =
    (summaryObj && Boolean(summaryObj.releaseRecommendation || summaryObj.totalExecuted)) ||
    (typeof summaryStr === 'string' && summaryStr.trim().length >= 30) ||
    (typeof summaryObj === 'string' && summaryObj.trim().length >= 30);

  criteriaResults.push({
    criterionId: 'crit-summary-report',
    title: 'Executive Test Summary Report',
    passed: Boolean(hasValidSummary),
    feedback: hasValidSummary
      ? 'Test summary report provided with execution metrics and release sign-off.'
      : 'Test summary report is incomplete. Must include metrics, defect summary, and release rationale.',
  });

  const passedCriteriaCount = criteriaResults.filter((c) => c.passed).length;
  const score = Math.round((passedCriteriaCount / criteriaResults.length) * 100);
  const passed = score >= 70 && hasAmbiguities && hasScenarios && hasValidSummary;

  return {
    passed,
    score,
    maxScore: 100,
    feedback: passed
      ? 'Day 4 Agile workflow assignment approved! Excellent requirement discovery and release summary.'
      : 'Day 4 assignment needs revision. Complete all 3 sections: ambiguities, scenarios, and test summary.',
    criteriaResults,
  };
}

/**
 * Deterministic rubric evaluator for Day 5 Final Project.
 */
export function evaluateDay5FinalProject(project: any): PracticalEvaluationResult {
  const criteriaResults = [];

  // 1. Requirement Summary & Scenarios
  const testScenarios = project.testScenarios || [];
  const reqSummary = project.requirementSummary || project.summaryReport || '';
  const hasReqSummary =
    (typeof reqSummary === 'string' && reqSummary.trim().length >= 25) ||
    testScenarios.length >= 2 ||
    (Array.isArray(project.testCases) && project.testCases.length >= 10);

  criteriaResults.push({
    criterionId: 'crit-req-scenarios',
    title: 'Requirement Summary & Scenarios',
    passed: hasReqSummary,
    feedback: hasReqSummary
      ? 'Scope defined clearly with structured test scenarios.'
      : 'Requirement summary must be at least 25 characters or list at least 4 test scenarios.',
  });

  // 2. Minimum 15 structured test cases
  const rawTestCases: any[] = project.testCases || [];
  const validTestCasesCount = rawTestCases.filter((tc) => {
    const hasId = Boolean(tc.id && String(tc.id).trim().length > 0);
    const hasTitle = Boolean(tc.title && String(tc.title).trim().length >= 5);
    const hasExpected = Boolean(
      (tc.expectedResult && String(tc.expectedResult).trim().length >= 5) ||
      (tc.expected && String(tc.expected).trim().length >= 5)
    );
    return hasId && hasTitle && hasExpected;
  }).length;
  const hasFifteenCases = validTestCasesCount >= 15;

  criteriaResults.push({
    criterionId: 'crit-fifteen-cases',
    title: 'At Least 15 Structured Test Cases',
    passed: hasFifteenCases,
    feedback: hasFifteenCases
      ? `Provided ${validTestCasesCount} valid test cases (meets requirement of 15).`
      : `Provided ${validTestCasesCount} valid test cases. Minimum 15 required for portfolio certification.`,
  });

  // 3. Positive and Negative coverage
  const posCount = rawTestCases.filter(
    (tc) => String(tc.type || '').toLowerCase() === 'positive'
  ).length;
  const negCount = rawTestCases.filter(
    (tc) => String(tc.type || '').toLowerCase() === 'negative'
  ).length;
  const hasBalancedCoverage = posCount >= 5 && negCount >= 3;

  criteriaResults.push({
    criterionId: 'crit-pos-neg-balance',
    title: 'Positive & Negative Coverage',
    passed: hasBalancedCoverage,
    feedback: hasBalancedCoverage
      ? `Balanced coverage: ${posCount} positive cases and ${negCount} negative cases.`
      : `Requires balanced coverage with at least 5 positive and 3 negative test cases. (Found: ${posCount} pos, ${negCount} neg).`,
  });

  // 4. At least 2 full defect reports
  const rawDefects: any[] = project.defectReports || project.bugReports || [];
  const validDefectCount = rawDefects.filter((dr) => {
    const hasTitle = Boolean(dr.title && String(dr.title).trim().length >= 8);
    const steps = dr.steps || dr.stepsToReproduce || '';
    const hasSteps = Boolean(String(steps).trim().length >= 10);
    const expected = dr.expectedResult || dr.expected || '';
    const actual = dr.actualResult || dr.actual || '';
    return hasTitle && hasSteps && String(expected).trim().length >= 5 && String(actual).trim().length >= 5;
  }).length;
  const hasTwoDefects = validDefectCount >= 2;

  criteriaResults.push({
    criterionId: 'crit-two-bug-reports',
    title: 'At Least 2 Professional Defect Reports',
    passed: hasTwoDefects,
    feedback: hasTwoDefects
      ? `Provided ${validDefectCount} professional defect reports.`
      : `Provided ${validDefectCount} valid defect reports. Minimum 2 required.`,
  });

  // 5. Test Summary Report
  const summaryObj = project.testSummaryReport;
  const summaryStr = project.summaryReport;
  const hasSummary =
    (summaryObj && Boolean(summaryObj.releaseRecommendation)) ||
    (typeof summaryStr === 'string' && summaryStr.trim().length >= 30) ||
    (typeof summaryObj === 'string' && summaryObj.trim().length >= 30);

  criteriaResults.push({
    criterionId: 'crit-test-summary',
    title: 'Executive Test Summary Report',
    passed: Boolean(hasSummary),
    feedback: hasSummary
      ? 'Executive test summary report includes release recommendation and status metrics.'
      : 'Executive summary report must include clear release recommendation and status metrics.',
  });

  const passedCriteriaCount = criteriaResults.filter((c) => c.passed).length;
  const score = Math.round((passedCriteriaCount / criteriaResults.length) * 100);
  const passed = score >= 80 && hasFifteenCases && hasTwoDefects;

  return {
    passed,
    score,
    maxScore: 100,
    feedback: passed
      ? 'Congratulations! Final Practical Project meets all industry standards and rubric criteria.'
      : 'Final Project does not meet passing criteria yet. Please address the checklist items above.',
    criteriaResults,
  };
}
