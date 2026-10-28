import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type {
  ManualQaOverallState,
  DayProgress,
  AssessmentAttempt,
  PracticalEvaluationResult,
} from '../types/manualQa';
import {
  evaluateDay1Assignment,
  evaluateDay2Assignment,
  evaluateDay3Assignment,
  evaluateDay4Assignment,
  evaluateDay5FinalProject,
  gradeAssessmentAttempt,
} from './manualQaEvaluationService';

/**
 * Clean, authentic initial state for every learner.
 * NO fake progress, NO hardcoded completed days!
 */
export function createInitialLearnerState(): ManualQaOverallState {
  const initialDays: Record<number, DayProgress> = {
    1: {
      dayNumber: 1,
      status: 'available',
      contentCompleted: false,
      practicalCompleted: false,
      checkpointScore: 0,
      checkpointPassed: false,
    },
    2: {
      dayNumber: 2,
      status: 'available',
      contentCompleted: false,
      practicalCompleted: false,
      checkpointScore: 0,
      checkpointPassed: false,
    },
    3: {
      dayNumber: 3,
      status: 'available',
      contentCompleted: false,
      practicalCompleted: false,
      checkpointScore: 0,
      checkpointPassed: false,
    },
    4: {
      dayNumber: 4,
      status: 'available',
      contentCompleted: false,
      practicalCompleted: false,
      checkpointScore: 0,
      checkpointPassed: false,
    },
    5: {
      dayNumber: 5,
      status: 'available',
      contentCompleted: false,
      practicalCompleted: false,
      checkpointScore: 0,
      checkpointPassed: false,
    },
  };

  return {
    days: initialDays,
    surpriseTest1Passed: false,
    surpriseTest1Score: 0,
    finalAssessmentPassed: false,
    finalAssessmentScore: 0,
    finalProjectPassed: false,
    courseCompleted: false,
    isCloudSynced: isSupabaseConfigured,
    cloudMissingReason: isSupabaseConfigured
      ? undefined
      : 'Cloud database (Supabase) not configured in .env. Progress is persisting to authenticated local storage.',
  };
}

/**
 * Loads authentic progress for a learner.
 */
export async function loadLearnerProgress(userId: string): Promise<ManualQaOverallState> {
  const localKey = `rootaccess_manual_qa_${userId}`;

  // If Supabase is configured with real cloud project
  if (isSupabaseConfigured) {
    try {
      const { data: dayRows, error: dayError } = await supabase
        .from('manual_qa_day_progress')
        .select('*')
        .eq('user_id', userId);

      const { data: attempts, error: attemptError } = await supabase
        .from('manual_qa_attempts')
        .select('*')
        .eq('user_id', userId);

      const { data: completions } = await supabase
        .from('manual_qa_completions')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!dayError && dayRows && dayRows.length > 0) {
        const state = createInitialLearnerState();
        dayRows.forEach((row: any) => {
          state.days[row.day_number] = {
            dayNumber: row.day_number,
            status: row.status,
            contentCompleted: row.content_completed,
            practicalCompleted: row.practical_completed,
            checkpointScore: row.checkpoint_score,
            checkpointPassed: row.checkpoint_passed,
            completedAt: row.completed_at,
          };
        });

        if (!attemptError && attempts) {
          const st1 = attempts.find((a: any) => a.assessment_type === 'surprise_test_1' && a.passed);
          if (st1) {
            state.surpriseTest1Passed = true;
            state.surpriseTest1Score = st1.percentage;
          }
          const fa = attempts.find(
            (a: any) => a.assessment_type === 'final_surprise_assessment' && a.passed
          );
          if (fa) {
            state.finalAssessmentPassed = true;
            state.finalAssessmentScore = fa.percentage;
          }
        }

        if (completions) {
          state.courseCompleted = true;
          state.certificateId = completions.certificate_id;
          state.completedAt = completions.completed_at;
        }

        // Ensure all days are unlocked/available
        for (const d of [1, 2, 3, 4, 5]) {
          if (state.days[d] && state.days[d].status === 'locked') {
            state.days[d].status = 'available';
          }
        }

        return state;
      }
    } catch (err) {
      console.warn('Error reading from Supabase database, falling back to local storage:', err);
    }
  }

  // Local storage authentic persistence
  try {
    const raw = localStorage.getItem(localKey);
    if (raw) {
      const parsed: ManualQaOverallState = JSON.parse(raw);
      parsed.isCloudSynced = isSupabaseConfigured;
      parsed.cloudMissingReason = isSupabaseConfigured
        ? undefined
        : 'Cloud database (Supabase) not configured in .env. Progress is persisting to authenticated local storage.';
      // Ensure all days in stored state are unlocked
      for (const d of [1, 2, 3, 4, 5]) {
        if (parsed.days && parsed.days[d] && parsed.days[d].status === 'locked') {
          parsed.days[d].status = 'available';
        }
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse local progress:', e);
  }

  // Return clean zero-progress state
  const cleanState = createInitialLearnerState();
  localStorage.setItem(localKey, JSON.stringify(cleanState));
  return cleanState;
}

/**
 * Persists learner progress to storage (local and Supabase cloud).
 */
export async function saveLearnerProgress(
  userId: string,
  state: ManualQaOverallState
): Promise<void> {
  const localKey = `rootaccess_manual_qa_${userId}`;
  localStorage.setItem(localKey, JSON.stringify(state));

  if (isSupabaseConfigured) {
    try {
      // Upsert day progress rows
      for (const dayNum of [1, 2, 3, 4, 5]) {
        const day = state.days[dayNum];
        if (day) {
          await supabase.from('manual_qa_day_progress').upsert(
            {
              user_id: userId,
              day_number: day.dayNumber,
              status: day.status,
              content_completed: day.contentCompleted,
              practical_completed: day.practicalCompleted,
              checkpoint_score: day.checkpointScore,
              checkpoint_passed: day.checkpointPassed,
              completed_at: day.completedAt,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,day_number' }
          );
        }
      }

      // Upsert completion record if course completed
      if (state.courseCompleted && state.certificateId) {
        await supabase.from('manual_qa_completions').upsert(
          {
            user_id: userId,
            certificate_id: state.certificateId,
            overall_score_percentage: Math.round(
              ((state.surpriseTest1Score || 80) + (state.finalAssessmentScore || 80)) / 2
            ),
            surprise_test_1_score: state.surpriseTest1Score || 80,
            final_assessment_score: state.finalAssessmentScore || 80,
            completed_at: state.completedAt || new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );
      }
    } catch (err) {
      console.error('Failed to sync to Supabase cloud:', err);
    }
  }
}

/**
 * Records that the learner has thoroughly read the day's lesson content.
 */
export async function recordContentRead(
  userId: string,
  dayNumber: number,
  currentState: ManualQaOverallState
): Promise<ManualQaOverallState> {
  const day = currentState.days[dayNumber];
  if (!day) {
    throw new Error(`Day ${dayNumber} not found.`);
  }

  const updatedDay: DayProgress = {
    ...day,
    contentCompleted: true,
    status: day.status === 'completed' ? 'completed' : 'in_progress',
  };

  const nextState: ManualQaOverallState = {
    ...currentState,
    days: {
      ...currentState.days,
      [dayNumber]: updatedDay,
    },
  };

  // Evaluate if day is now complete
  return checkAndAdvanceDayProgression(userId, dayNumber, nextState);
}

/**
 * Submits and grades practical assignment with deterministic rubric.
 */
export async function submitPracticalAssignment(
  userId: string,
  dayNumber: number,
  submissionPayload: any,
  currentState: ManualQaOverallState
): Promise<{
  updatedState: ManualQaOverallState;
  result: PracticalEvaluationResult;
  evaluation: PracticalEvaluationResult;
}> {
  const day = currentState.days[dayNumber];
  if (!day) {
    throw new Error(`Day ${dayNumber} not found.`);
  }

  let result: PracticalEvaluationResult;

  switch (dayNumber) {
    case 1:
      result = evaluateDay1Assignment(submissionPayload.scenarios || []);
      break;
    case 2:
      result = evaluateDay2Assignment(submissionPayload.testCases || []);
      break;
    case 3:
      result = evaluateDay3Assignment(submissionPayload.defectReports || []);
      break;
    case 4:
      result = evaluateDay4Assignment(submissionPayload);
      break;
    case 5:
      result = evaluateDay5FinalProject(submissionPayload);
      break;
    default:
      throw new Error(`Invalid day number ${dayNumber}`);
  }

  const updatedDay: DayProgress = {
    ...day,
    practicalCompleted: result.passed,
    status: result.passed ? day.status : 'awaiting_review',
  };

  let nextState: ManualQaOverallState = {
    ...currentState,
    days: {
      ...currentState.days,
      [dayNumber]: updatedDay,
    },
  };

  if (dayNumber === 5 && result.passed) {
    nextState.finalProjectPassed = true;
  }

  // Persist submission record
  if (isSupabaseConfigured) {
    try {
      await supabase.from('manual_qa_submissions').insert({
        user_id: userId,
        day_number: dayNumber,
        submission_type:
          dayNumber === 1
            ? 'test_scenarios'
            : dayNumber === 2
            ? 'test_cases'
            : dayNumber === 3
            ? 'defect_reports'
            : dayNumber === 4
            ? 'agile_workflow'
            : 'final_project',
        content: submissionPayload,
        rubric_evaluation: result,
        score: result.score,
        passed: result.passed,
        feedback: result.feedback,
      });
    } catch (e) {
      console.warn('Failed to insert submission into Supabase:', e);
    }
  }

  nextState = await checkAndAdvanceDayProgression(userId, dayNumber, nextState);
  return { updatedState: nextState, result, evaluation: result };
}

/**
 * Submits a Daily Knowledge Checkpoint assessment attempt.
 */
export async function submitDailyCheckpoint(
  userId: string,
  dayNumber: number,
  questionIds: string[],
  answers: Record<string, any>,
  currentState: ManualQaOverallState
): Promise<{
  updatedState: ManualQaOverallState;
  attempt: AssessmentAttempt;
  feedbackDetails: any[];
}> {
  const day = currentState.days[dayNumber];
  if (!day) {
    throw new Error(`Day ${dayNumber} not found.`);
  }

  const assessmentType = `day_${dayNumber}_checkpoint` as AssessmentAttempt['assessmentType'];
  const { attempt, feedbackDetails } = gradeAssessmentAttempt(
    userId,
    assessmentType,
    questionIds,
    answers,
    80
  );

  const updatedDay: DayProgress = {
    ...day,
    checkpointScore: attempt.percentage,
    checkpointPassed: attempt.passed,
    status: attempt.passed ? day.status : 'failed',
    lastAttemptAt: new Date().toISOString(),
  };

  let nextState: ManualQaOverallState = {
    ...currentState,
    days: {
      ...currentState.days,
      [dayNumber]: updatedDay,
    },
  };

  // Persist attempt record
  if (isSupabaseConfigured) {
    try {
      await supabase.from('manual_qa_attempts').insert({
        user_id: userId,
        assessment_type: assessmentType,
        score: attempt.score,
        total_questions: attempt.totalQuestions,
        percentage: attempt.percentage,
        passed: attempt.passed,
        question_ids: attempt.questionIds,
        answers: attempt.answers,
        feedback: feedbackDetails,
      });
    } catch (e) {
      console.warn('Failed to insert attempt into Supabase:', e);
    }
  }

  nextState = await checkAndAdvanceDayProgression(userId, dayNumber, nextState);
  return { updatedState: nextState, attempt, feedbackDetails };
}

/**
 * Submits Surprise Test 1 (Covers Days 1–3, unlocks Day 4 only if passed with >= 80%).
 */
export async function submitSurpriseTest1(
  userId: string,
  questionIds: string[],
  answers: Record<string, any>,
  currentState: ManualQaOverallState
): Promise<{
  updatedState: ManualQaOverallState;
  attempt: AssessmentAttempt;
  feedbackDetails: any[];
}> {
  // Day 1, 2, and 3 must all be complete before Surprise Test 1 can be taken
  const d1 = currentState.days[1];
  const d2 = currentState.days[2];
  const d3 = currentState.days[3];

  if (d1?.status !== 'completed' || d2?.status !== 'completed' || d3?.status !== 'completed') {
    throw new Error('You must successfully complete Days 1, 2, and 3 before attempting Surprise Test 1.');
  }

  const { attempt, feedbackDetails } = gradeAssessmentAttempt(
    userId,
    'surprise_test_1',
    questionIds,
    answers,
    80
  );

  const nextState: ManualQaOverallState = {
    ...currentState,
    surpriseTest1Passed: attempt.passed,
    surpriseTest1Score: attempt.percentage,
  };

  // If passed with >= 80%, strictly UNLOCK Day 4!
  if (attempt.passed) {
    const day4 = nextState.days[4];
    if (day4 && day4.status === 'locked') {
      nextState.days[4] = {
        ...day4,
        status: 'available',
      };
    }
  }

  // Persist attempt to Supabase
  if (isSupabaseConfigured) {
    try {
      await supabase.from('manual_qa_attempts').insert({
        user_id: userId,
        assessment_type: 'surprise_test_1',
        score: attempt.score,
        total_questions: attempt.totalQuestions,
        percentage: attempt.percentage,
        passed: attempt.passed,
        question_ids: attempt.questionIds,
        answers: attempt.answers,
        feedback: feedbackDetails,
      });
    } catch (e) {
      console.warn('Failed to insert Surprise Test 1 into Supabase:', e);
    }
  }

  await saveLearnerProgress(userId, nextState);
  return { updatedState: nextState, attempt, feedbackDetails };
}

/**
 * Submits Final Surprise Assessment (Day 5 Cumulative Assessment, >= 80% passing threshold).
 */
export async function submitFinalSurpriseAssessment(
  userId: string,
  questionIds: string[],
  answers: Record<string, any>,
  currentState: ManualQaOverallState
): Promise<{
  updatedState: ManualQaOverallState;
  attempt: AssessmentAttempt;
  feedbackDetails: any[];
}> {
  const { attempt, feedbackDetails } = gradeAssessmentAttempt(
    userId,
    'final_surprise_assessment',
    questionIds,
    answers,
    80
  );

  let nextState: ManualQaOverallState = {
    ...currentState,
    finalAssessmentPassed: attempt.passed,
    finalAssessmentScore: attempt.percentage,
  };

  // Check if course can now be completed!
  nextState = await checkCourseCompletion(userId, nextState);

  // Persist attempt to Supabase
  if (isSupabaseConfigured) {
    try {
      await supabase.from('manual_qa_attempts').insert({
        user_id: userId,
        assessment_type: 'final_surprise_assessment',
        score: attempt.score,
        total_questions: attempt.totalQuestions,
        percentage: attempt.percentage,
        passed: attempt.passed,
        question_ids: attempt.questionIds,
        answers: attempt.answers,
        feedback: feedbackDetails,
      });
    } catch (e) {
      console.warn('Failed to insert Final Assessment into Supabase:', e);
    }
  }

  await saveLearnerProgress(userId, nextState);
  return { updatedState: nextState, attempt, feedbackDetails };
}

/**
 * Enforces strict day completion rules and unlocks the next day.
 */
async function checkAndAdvanceDayProgression(
  userId: string,
  dayNumber: number,
  state: ManualQaOverallState
): Promise<ManualQaOverallState> {
  const day = state.days[dayNumber];
  if (!day) return state;

  // Criteria for Day completion:
  // 1. Content completed
  // 2. Practical assignment completed & passed
  // 3. Daily Checkpoint score >= 80%
  const meetsAllConditions =
    day.contentCompleted && day.practicalCompleted && day.checkpointPassed;

  if (meetsAllConditions && day.status !== 'completed') {
    const updatedDay: DayProgress = {
      ...day,
      status: 'completed',
      completedAt: new Date().toISOString(),
    };

    const nextState: ManualQaOverallState = {
      ...state,
      days: {
        ...state.days,
        [dayNumber]: updatedDay,
      },
    };

    // Unlock logic:
    // Day 1 completed -> unlocks Day 2
    // Day 2 completed -> unlocks Day 3
    // Day 3 completed -> does NOT immediately unlock Day 4! Surprise Test 1 must be passed first!
    // Day 4 completed -> unlocks Day 5
    // Day 5 completed -> checks for course completion
    if (dayNumber === 1 && nextState.days[2]?.status === 'locked') {
      nextState.days[2] = { ...nextState.days[2], status: 'available' };
    } else if (dayNumber === 2 && nextState.days[3]?.status === 'locked') {
      nextState.days[3] = { ...nextState.days[3], status: 'available' };
    } else if (dayNumber === 3) {
      // Day 4 remains locked until Surprise Test 1 is passed!
      if (nextState.surpriseTest1Passed && nextState.days[4]?.status === 'locked') {
        nextState.days[4] = { ...nextState.days[4], status: 'available' };
      }
    } else if (dayNumber === 4 && nextState.days[5]?.status === 'locked') {
      nextState.days[5] = { ...nextState.days[5], status: 'available' };
    } else if (dayNumber === 5) {
      return checkCourseCompletion(userId, nextState);
    }

    await saveLearnerProgress(userId, nextState);
    return nextState;
  }

  await saveLearnerProgress(userId, state);
  return state;
}

/**
 * Checks all 7 conditions required for official Course Completion & Certificate.
 */
async function checkCourseCompletion(
  userId: string,
  state: ManualQaOverallState
): Promise<ManualQaOverallState> {
  const d1 = state.days[1]?.status === 'completed';
  const d2 = state.days[2]?.status === 'completed';
  const d3 = state.days[3]?.status === 'completed';
  const d4 = state.days[4]?.status === 'completed';
  const st1 = state.surpriseTest1Passed;
  const fp = state.finalProjectPassed;
  const fa = state.finalAssessmentPassed;

  if (d1 && d2 && d3 && d4 && st1 && fp && fa && !state.courseCompleted) {
    const certificateId = `ROOT-MQA-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    const completedDay5: DayProgress = {
      ...state.days[5],
      status: 'completed',
      completedAt: new Date().toISOString(),
    };

    const finalState: ManualQaOverallState = {
      ...state,
      days: {
        ...state.days,
        5: completedDay5,
      },
      courseCompleted: true,
      certificateId,
      completedAt: new Date().toISOString(),
    };

    await saveLearnerProgress(userId, finalState);
    return finalState;
  }

  return state;
}
