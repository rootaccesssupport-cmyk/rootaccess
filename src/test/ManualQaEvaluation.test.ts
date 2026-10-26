import { describe, it, expect } from 'vitest';
import {
  evaluateDay1Assignment,
  evaluateDay2Assignment,
  evaluateDay3Assignment,
  evaluateDay4Assignment,
  evaluateDay5FinalProject,
  gradeAssessmentAttempt,
  getSanitizedQuestions,
} from '../services/manualQaEvaluationService';

describe('Manual QA Deterministic Evaluation Engine', () => {
  describe('Answer Key Sanitization (Anti-Cheat)', () => {
    it('strips correctAnswerIndex and correctAnswerIndices from client delivery', () => {
      const sanitized = getSanitizedQuestions(1);
      expect(sanitized.length).toBeGreaterThan(0);
      sanitized.forEach((q) => {
        expect((q as any).correctAnswerIndex).toBeUndefined();
        expect((q as any).correctAnswerIndices).toBeUndefined();
        expect(q.id).toBeDefined();
        expect(q.questionText).toBeDefined();
      });
    });
  });

  describe('Assessment Scoring Engine', () => {
    it('accurately scores multiple-choice attempts and enforces 80% passing threshold', () => {
      const questionIds = ['d1-q1', 'd1-q2', 'd1-q3', 'd1-q4', 'd1-q6'];
      // Answer 4 correctly out of 5 (80% marks)
      const passingAnswers = {
        'd1-q1': 1, // correct
        'd1-q2': 0, // correct
        'd1-q3': 1, // correct
        'd1-q4': 1, // correct
        'd1-q6': 99, // wrong
      };

      const result = gradeAssessmentAttempt('u1', 'day_1_checkpoint', questionIds, passingAnswers, 80);
      expect(result.attempt.passed).toBe(true);
      expect(result.attempt.percentage).toBeGreaterThanOrEqual(80);
    });

    it('fails attempts with score below 80%', () => {
      const questionIds = ['d1-q1', 'd1-q2', 'd1-q4', 'd1-q5'];
      // Answer only 1 correctly (25%)
      const failingAnswers = {
        'd1-q1': 1, // correct
        'd1-q2': 99, // wrong
        'd1-q4': 99, // wrong
        'd1-q5': 99, // wrong
      };

      const result = gradeAssessmentAttempt('u1', 'day_1_checkpoint', questionIds, failingAnswers, 80);
      expect(result.attempt.passed).toBe(false);
      expect(result.attempt.percentage).toBeLessThan(80);
    });
  });

  describe('Day 1 Rubric: Test Scenario Discovery', () => {
    it('rejects submissions with fewer than 6 scenarios', () => {
      const res = evaluateDay1Assignment({
        scenarios: [
          { title: 'Scenario 1', type: 'positive', expectedResult: 'OK' },
          { title: 'Scenario 2', type: 'negative', expectedResult: 'Error' },
        ],
      });
      expect(res.passed).toBe(false);
      expect(res.feedback).toContain('Minimum 6 required');
    });

    it('rejects submissions missing negative scenarios', () => {
      const res = evaluateDay1Assignment({
        scenarios: Array.from({ length: 6 }, (_, i) => ({
          title: `Scenario ${i + 1} valid input`,
          type: 'positive',
          expectedResult: 'Success',
        })),
      });
      expect(res.passed).toBe(false);
      expect(res.feedback).toContain('negative/edge');
    });

    it('approves complete scenario sets with >= 6 and both positive & negative coverage', () => {
      const res = evaluateDay1Assignment({
        scenarios: [
          { title: 'Valid email and valid password', type: 'positive', expectedResult: 'Redirects to /dashboard' },
          { title: 'Valid login with Remember Me checked', type: 'positive', expectedResult: 'Persists auth token' },
          { title: 'Valid email with incorrect password', type: 'negative', expectedResult: 'Shows invalid credentials banner' },
          { title: 'Unregistered email address', type: 'negative', expectedResult: 'Shows invalid credentials banner' },
          { title: 'Three consecutive failed logins', type: 'negative', expectedResult: 'Locks account for 15 minutes' },
          { title: 'Empty password field submission', type: 'negative', expectedResult: 'Shows password is required error' },
        ],
      });
      expect(res.passed).toBe(true);
      expect(res.score).toBe(100);
    });

    it('rejects gibberish and random keywords in scenarios', () => {
      const res = evaluateDay1Assignment({
        scenarios: [
          { title: 'asdf asdf asdf asdf', type: 'positive', expectedResult: 'asdf asdf asdf' },
          { title: 'asdf asdf asdf asdf', type: 'positive', expectedResult: 'asdf asdf asdf' },
          { title: 'asdf asdf asdf asdf', type: 'negative', expectedResult: 'asdf asdf asdf' },
          { title: 'asdf asdf asdf asdf', type: 'negative', expectedResult: 'asdf asdf asdf' },
          { title: 'asdf asdf asdf asdf', type: 'negative', expectedResult: 'asdf asdf asdf' },
          { title: 'asdf asdf asdf asdf', type: 'negative', expectedResult: 'asdf asdf asdf' },
        ],
      });
      expect(res.passed).toBe(false);
      expect(res.score).toBeLessThan(70);
    });
  });

  describe('Day 2 Rubric: Boundary Value Analysis (BVA) & EP Test Cases', () => {
    it('rejects submissions with fewer than 8 test cases', () => {
      const res = evaluateDay2Assignment({
        testCases: [{ id: 'TC_1', title: 'Boundary min', bvaValue: '$100', expected: '10%' }],
      });
      expect(res.passed).toBe(false);
    });

    it('approves >= 8 test cases with explicit boundary values', () => {
      const validCases = [
        { id: 'TC_1', title: 'Lower boundary exact min', bvaValue: '$100.00', expected: '10% discount' },
        { id: 'TC_2', title: 'Just below lower boundary', bvaValue: '$99.99', expected: '0% discount' },
        { id: 'TC_3', title: 'Just above lower boundary', bvaValue: '$100.01', expected: '10% discount' },
        { id: 'TC_4', title: 'Upper boundary exact max', bvaValue: '$500.00', expected: '10% discount' },
        { id: 'TC_5', title: 'Just above upper boundary', bvaValue: '$500.01', expected: '20% discount' },
        { id: 'TC_6', title: 'Zero dollar order boundary', bvaValue: '$0.00', expected: 'Rejected' },
        { id: 'TC_7', title: 'Negative value boundary test', bvaValue: '-$1.00', expected: 'Input rejected' },
        { id: 'TC_8', title: 'Maximum cart cap boundary', bvaValue: '$10,000.00', expected: 'Cap enforced' },
      ];
      const res = evaluateDay2Assignment({ testCases: validCases });
      expect(res.passed).toBe(true);
      expect(res.score).toBe(100);
    });
  });

  describe('Day 3 Rubric: Jira Defect Reports', () => {
    it('rejects submissions missing required Jira fields (e.g. steps or expected)', () => {
      const res = evaluateDay3Assignment({
        bugReports: [
          { title: 'Bug 1', severity: 'Critical', priority: 'P1', steps: '', actual: 'fail', expected: '' },
        ],
      });
      expect(res.passed).toBe(false);
    });

    it('approves >= 3 bug reports with complete Jira attributes', () => {
      const validReports = [
        {
          title: '[Cart] Quantity input accepts negative integer and decrements total',
          severity: 'Critical',
          priority: 'P1',
          steps: '1. Open cart\n2. Type -2\n3. Click proceed',
          actual: 'Cart subtotal negative',
          expected: 'Quantity validation error',
        },
        {
          title: '[Payment] Expired credit card submission generates raw 500 error',
          severity: 'Major',
          priority: 'P2',
          steps: '1. Go to payment\n2. Enter past expiry\n3. Click pay',
          actual: 'Raw 500 crash',
          expected: 'Inline user alert "Card expired"',
        },
        {
          title: '[Checkout] Shipping dropdown fails to populate state for Canada',
          severity: 'Minor',
          priority: 'P3',
          steps: '1. Select Canada country\n2. Click State/Province',
          actual: 'Dropdown empty',
          expected: 'Lists Canadian provinces',
        },
      ];
      const res = evaluateDay3Assignment({ bugReports: validReports });
      expect(res.passed).toBe(true);
      expect(res.score).toBe(100);
    });
  });

  describe('Day 4 Rubric: Agile Workflow & AC Ambiguities', () => {
    it('evaluates ambiguity notes, exploratory scenarios, and summary report', () => {
      const res = evaluateDay4Assignment({
        ambiguityNotes: '1. Missing timeout rule\n2. Missing currency decimal rule',
        scenarios: '1. Scenario A\n2. Scenario B\n3. Scenario C\n4. Scenario D',
        summaryReport: 'TEST SUMMARY REPORT: Total planned: 20 | Executed: 20 | Passed: 18 | Sign-off: Approved',
      });
      expect(res.passed).toBe(true);
      expect(res.score).toBe(100);
    });
  });

  describe('Day 5 Rubric: Final Portfolio Project', () => {
    it('evaluates comprehensive suite of 15+ test cases, 2+ bugs, and executive report', () => {
      const res = evaluateDay5FinalProject({
        testCases: Array.from({ length: 15 }, (_, i) => ({
          id: `TC_${i + 1}`,
          title: `Test case ${i + 1} validation`,
          type: i < 9 ? 'positive' : 'negative',
          expected: 'Verification pass',
        })),
        bugReports: [
          {
            title: '[Cart] Negative quantity generates negative subtotal',
            severity: 'Critical',
            priority: 'P1',
            steps: '1. Step 1\n2. Step 2',
            actual: 'Negative price',
            expected: 'Rejected',
          },
          {
            title: '[Payment] Expired card causes crash 500',
            severity: 'Major',
            priority: 'P2',
            steps: '1. Step 1\n2. Step 2',
            actual: 'Crash',
            expected: 'Friendly alert',
          },
        ],
        summaryReport: 'TEST SUMMARY REPORT: Planned: 15 | Passed: 13 | Failed: 2 | Sign-off approved with hotfix.',
      });
      expect(res.passed).toBe(true);
      expect(res.score).toBe(100);
    });
  });
});
