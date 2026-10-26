import { describe, it, expect } from 'vitest';
import {
  createInitialLearnerState,
  recordContentRead,
  submitPracticalAssignment,
  submitDailyCheckpoint,
  submitSurpriseTest1,
  submitFinalSurpriseAssessment,
} from '../services/manualQaStorageService';

describe('Manual QA 5-Day Progression & Locking Engine', () => {
  const userId = 'test_learner_456';

  it('initializes with Day 1 available and Days 2 to 5 strictly locked with 0 fake progress', () => {
    const initialState = createInitialLearnerState();
    expect(initialState.days[1].status).toBe('available');
    expect(initialState.days[2].status).toBe('locked');
    expect(initialState.days[3].status).toBe('locked');
    expect(initialState.days[4].status).toBe('locked');
    expect(initialState.days[5].status).toBe('locked');

    expect(initialState.surpriseTest1Passed).toBe(false);
    expect(initialState.finalProjectPassed).toBe(false);
    expect(initialState.finalAssessmentPassed).toBe(false);
    expect(initialState.courseCompleted).toBe(false);
    expect(initialState.certificateId).toBeUndefined();
  });

  it('keeps Day 2 locked until Day 1 passes content, practical rubric, AND checkpoint score >= 80%', async () => {
    let state = createInitialLearnerState();

    // 1. Mark theory read only -> Day 2 still locked
    state = await recordContentRead(userId, 1, state);
    expect(state.days[1].contentCompleted).toBe(true);
    expect(state.days[2].status).toBe('locked');

    // 2. Submit practical assignment that fails rubric -> Day 2 still locked
    const failingSubmission = {
      scenarios: [
        { title: 'Only one scenario', type: 'positive', expectedResult: 'Login works' },
      ],
    };
    const { updatedState: stateAfterFailPractical } = await submitPracticalAssignment(
      userId,
      1,
      failingSubmission,
      state
    );
    expect(stateAfterFailPractical.days[1].practicalCompleted).toBe(false);
    expect(stateAfterFailPractical.days[2].status).toBe('locked');

    // 3. Submit practical assignment that passes rubric (>= 6 scenarios, positive + negative)
    const passingSubmission = {
      scenarios: [
        { title: 'Valid email and valid password', type: 'positive', expectedResult: 'Dashboard redirect' },
        { title: 'Remember me persist session token', type: 'positive', expectedResult: 'Token saved' },
        { title: 'Invalid password format', type: 'negative', expectedResult: 'Error banner' },
        { title: 'Unregistered email address', type: 'negative', expectedResult: 'Error banner' },
        { title: 'Consecutive 3 failed attempts lockout', type: 'negative', expectedResult: '15m lock' },
        { title: 'Empty password submission validation', type: 'negative', expectedResult: 'Validation error' },
      ],
    };
    const { updatedState: stateAfterPassPractical, evaluation } = await submitPracticalAssignment(
      userId,
      1,
      passingSubmission,
      stateAfterFailPractical
    );
    expect(evaluation.passed).toBe(true);
    expect(stateAfterPassPractical.days[1].practicalCompleted).toBe(true);
    // Still locked because checkpoint quiz is not yet passed!
    expect(stateAfterPassPractical.days[2].status).toBe('locked');

    // 4. Submit checkpoint with failing score (< 80%) -> Day 2 still locked
    const { updatedState: stateAfterFailQuiz } = await submitDailyCheckpoint(
      userId,
      1,
      ['d1-q1', 'd1-q2'],
      { 'd1-q1': 99, 'd1-q2': 99 }, // incorrect options
      stateAfterPassPractical
    );
    expect(stateAfterFailQuiz.days[1].checkpointPassed).toBe(false);
    expect(stateAfterFailQuiz.days[2].status).toBe('locked');

    // 5. Submit checkpoint with passing score (>= 80%) -> Day 1 completes and Day 2 UNLOCKS!
    const { updatedState: stateAfterPassQuiz, attempt } = await submitDailyCheckpoint(
      userId,
      1,
      ['d1-q1', 'd1-q2', 'd1-q4'],
      { 'd1-q1': 1, 'd1-q2': 0, 'd1-q4': 1 }, // correct options
      stateAfterFailQuiz
    );
    expect(attempt.passed).toBe(true);
    expect(stateAfterPassQuiz.days[1].status).toBe('completed');
    expect(stateAfterPassQuiz.days[2].status).toBe('available');
  });

  it('strictly locks Day 4 after Day 3 until Surprise Test 1 is PASSED with score >= 80%', async () => {
    let state = createInitialLearnerState();

    // Simulate completion of Day 1, Day 2, and Day 3
    state.days[1] = {
      dayNumber: 1,
      status: 'completed',
      contentCompleted: true,
      practicalCompleted: true,
      checkpointScore: 100,
      checkpointPassed: true,
    };
    state.days[2] = {
      dayNumber: 2,
      status: 'completed',
      contentCompleted: true,
      practicalCompleted: true,
      checkpointScore: 100,
      checkpointPassed: true,
    };
    state.days[3] = {
      dayNumber: 3,
      status: 'completed',
      contentCompleted: true,
      practicalCompleted: true,
      checkpointScore: 100,
      checkpointPassed: true,
    };

    // Day 4 MUST be locked before Surprise Test 1!
    expect(state.days[4].status).toBe('locked');
    expect(state.surpriseTest1Passed).toBe(false);

    // Fail Surprise Test 1 (score < 80%) -> Day 4 remains locked
    const { updatedState: stateAfterFailedTest } = await submitSurpriseTest1(
      userId,
      ['d1-q1', 'd2-q1'],
      { 'd1-q1': 99, 'd2-q1': 99 }, // wrong answers
      state
    );
    expect(stateAfterFailedTest.surpriseTest1Passed).toBe(false);
    expect(stateAfterFailedTest.days[4].status).toBe('locked');

    // Pass Surprise Test 1 (score >= 80%) -> Day 4 UNLOCKS!
    const { updatedState: stateAfterPassedTest, attempt } = await submitSurpriseTest1(
      userId,
      ['d1-q1', 'd2-q1', 'd3-q1', 'd3-q2'],
      { 'd1-q1': 1, 'd2-q1': 1, 'd3-q1': 2, 'd3-q2': 0 }, // correct answers
      stateAfterFailedTest
    );
    expect(attempt.passed).toBe(true);
    expect(stateAfterPassedTest.surpriseTest1Passed).toBe(true);
    expect(stateAfterPassedTest.days[4].status).toBe('available');
  });

  it('keeps certificate strictly locked until all 7 criteria are met', async () => {
    let state = createInitialLearnerState();
    expect(state.courseCompleted).toBe(false);
    expect(state.certificateId).toBeUndefined();

    // Mark Days 1 to 4 completed and Surprise Test 1 passed
    [1, 2, 3, 4].forEach((d) => {
      state.days[d] = {
        dayNumber: d,
        status: 'completed',
        contentCompleted: true,
        practicalCompleted: true,
        checkpointScore: 100,
        checkpointPassed: true,
      };
    });
    state.surpriseTest1Passed = true;
    state.days[5] = {
      dayNumber: 5,
      status: 'available',
      contentCompleted: true,
      practicalCompleted: false,
      checkpointScore: 0,
      checkpointPassed: false,
    };

    // Missing Final Project and Final Assessment
    expect(state.courseCompleted).toBe(false);

    // Pass Final Project rubric
    const validProject = {
      testCases: Array.from({ length: 15 }, (_, i) => ({
        id: `TC_${i + 1}`,
        title: `Test case ${i + 1} validation for module`,
        type: i < 9 ? 'positive' : 'negative',
        expected: 'Expected verification',
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
      summaryReport: 'TEST SUMMARY REPORT\nPlanned: 15 | Passed: 13 | Failed: 2\nVerdict: Sign-off approved.',
    };

    const { updatedState: stateAfterProject } = await submitPracticalAssignment(
      userId,
      5,
      validProject,
      state
    );
    expect(stateAfterProject.finalProjectPassed).toBe(true);
    // Still not completed because Final Assessment is pending!
    expect(stateAfterProject.courseCompleted).toBe(false);

    // Pass Final Assessment (score >= 80%)
    const { updatedState: completedState, attempt } = await submitFinalSurpriseAssessment(
      userId,
      ['d1-q1', 'd2-q1', 'd3-q1', 'd4-q1', 'd5-q1'],
      { 'd1-q1': 1, 'd2-q1': 1, 'd3-q1': 2, 'd4-q1': 1, 'd5-q1': 1 },
      stateAfterProject
    );
    expect(attempt.passed).toBe(true);
    expect(completedState.finalAssessmentPassed).toBe(true);
    expect(completedState.courseCompleted).toBe(true);
    expect(completedState.certificateId).toMatch(/^ROOT-MQA-/);
    expect(completedState.completedAt).toBeDefined();
  });
});
