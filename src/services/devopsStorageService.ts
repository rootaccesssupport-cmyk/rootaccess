import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { DevOpsLearnerState, DevOpsDayProgress } from '../types/devopsCourse';

export function createDefaultDayProgress(dayNumber: number): DevOpsDayProgress {
  return {
    dayNumber,
    topicsRead: [false, false, false, false, false, false, false, false],
    activitiesCompleted: {},
    checkpointsPassed: [false, false, false, false, false],
    assignmentSubmitted: false,
    interviewReviewed: false,
    quizSubmitted: false,
    quizScore: 0,
    quizPassed: false,
    quizAttempts: [],
  };
}

export function createInitialDevOpsState(): DevOpsLearnerState {
  return {
    enrolled: false,
    days: {
      1: createDefaultDayProgress(1),
      2: createDefaultDayProgress(2),
      3: createDefaultDayProgress(3),
    },
  };
}

export async function loadDevOpsProgress(userId: string): Promise<DevOpsLearnerState> {
  const key = `rootaccess_devops_progress_${userId}`;
  const initial = createInitialDevOpsState();

  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...initial,
        ...parsed,
        days: {
          1: { ...initial.days[1], ...(parsed.days?.[1] || {}) },
          2: { ...initial.days[2], ...(parsed.days?.[2] || {}) },
          3: { ...initial.days[3], ...(parsed.days?.[3] || {}) },
        },
      };
    }
  } catch (err) {
    console.warn('Failed to parse local DevOps progress:', err);
  }

  // Attempt Supabase fetch if configured
  if (isSupabaseConfigured && userId && userId !== 'guest_learner') {
    try {
      const { data, error } = await supabase
        .from('devops_day_progress')
        .select('*')
        .eq('user_id', userId);

      if (!error && data && data.length > 0) {
        const nextState = { ...initial, enrolled: true };
        data.forEach((row: any) => {
          if (row.day_number && nextState.days[row.day_number]) {
            nextState.days[row.day_number] = {
              ...nextState.days[row.day_number],
              topicsRead: row.topics_read || initial.days[row.day_number].topicsRead,
              activitiesCompleted: row.activities_completed || {},
              checkpointsPassed: row.checkpoints_passed || initial.days[row.day_number].checkpointsPassed,
              assignmentSubmitted: row.assignment_submitted || false,
              assignmentScore: row.assignment_score,
              quizSubmitted: row.quiz_submitted || false,
              quizScore: row.quiz_score || 0,
              quizPassed: row.quiz_passed || false,
              completedAt: row.completed_at,
            };
          }
        });
        return nextState;
      }
    } catch (dbErr) {
      console.warn('Could not query Supabase devops progress, falling back to local state:', dbErr);
    }
  }

  return initial;
}

export async function saveDevOpsProgress(userId: string, state: DevOpsLearnerState): Promise<void> {
  const key = `rootaccess_devops_progress_${userId}`;
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save DevOps progress to localStorage:', err);
  }

  // Sync to Supabase if configured and authenticated
  if (isSupabaseConfigured && userId && userId !== 'guest_learner') {
    try {
      const upsertRows = Object.values(state.days).map((day) => ({
        user_id: userId,
        day_number: day.dayNumber,
        topics_read: day.topicsRead,
        activities_completed: day.activitiesCompleted,
        checkpoints_passed: day.checkpointsPassed,
        assignment_submitted: day.assignmentSubmitted,
        assignment_score: day.assignmentScore || 0,
        quiz_submitted: day.quizSubmitted,
        quiz_score: day.quizScore,
        quiz_passed: day.quizPassed,
        completed_at: day.completedAt || null,
        updated_at: new Date().toISOString(),
      }));

      await supabase.from('devops_day_progress').upsert(upsertRows, {
        onConflict: 'user_id,day_number',
      });
    } catch (e) {
      // Non-blocking warning so frontend remains responsive
      console.warn('Supabase devops sync deferred or failed:', e);
    }
  }
}
