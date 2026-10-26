import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import type { DevOpsLearnerState, DevOpsDayProgress } from '../types/devopsCourse';
import {
  createDefaultDayProgress,
  createInitialDevOpsState,
  loadDevOpsProgress,
  saveDevOpsProgress,
} from '../services/devopsStorageService';
import {
  evaluateDevOpsQuiz,
  evaluateDay1Assignment,
  evaluateDay2Assignment,
  evaluateDay3Assignment,
  QuizEvaluationResult,
  AssignmentEvaluationResult,
} from '../services/devopsEvaluationService';

interface DevOpsContextType {
  state: DevOpsLearnerState;
  loading: boolean;
  enrollInCourse: () => void;
  getDayProgress: (dayNumber: number) => DevOpsDayProgress;
  markTopicRead: (dayNumber: number, topicIndex: number) => void;
  markActivityCompleted: (dayNumber: number, activityId: string) => void;
  submitCheckpoint: (dayNumber: number, checkpointIndex: number, isCorrect: boolean) => void;
  submitAssignment: (dayNumber: number, submissionData: any) => AssignmentEvaluationResult;
  markInterviewReviewed: (dayNumber: number) => void;
  submitQuiz: (dayNumber: number, answers: Record<string, number>) => QuizEvaluationResult;
  getOverallStats: () => {
    completedDaysCount: number;
    totalImplementedDays: number;
    completionPercentage: number;
    quizzesPassedCount: number;
    assignmentsCompletedCount: number;
  };
  resetDevOpsProgress: () => void;
}

const DevOpsContext = createContext<DevOpsContextType | undefined>(undefined);

export const DevOpsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id || 'guest_learner';

  const [state, setState] = useState<DevOpsLearnerState>(createInitialDevOpsState());
  const [loading, setLoading] = useState(true);

  // Load progress when user changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    loadDevOpsProgress(userId).then((loaded) => {
      if (isMounted) {
        setState(loaded);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  // Save progress helper
  const updateAndPersist = useCallback(
    (updater: (prev: DevOpsLearnerState) => DevOpsLearnerState) => {
      setState((prev) => {
        const next = updater(prev);
        saveDevOpsProgress(userId, next);
        return next;
      });
    },
    [userId]
  );

  const enrollInCourse = useCallback(() => {
    updateAndPersist((prev) => ({
      ...prev,
      enrolled: true,
      enrolledAt: prev.enrolledAt || new Date().toISOString(),
    }));
  }, [updateAndPersist]);

  const getDayProgress = useCallback(
    (dayNumber: number): DevOpsDayProgress => {
      return state.days[dayNumber] || {
        dayNumber,
        topicsRead: [],
        activitiesCompleted: {},
        checkpointsPassed: [],
        assignmentSubmitted: false,
        interviewReviewed: false,
        quizSubmitted: false,
        quizScore: 0,
        quizPassed: false,
        quizAttempts: [],
      };
    },
    [state.days]
  );

  const markTopicRead = useCallback(
    (dayNumber: number, topicIndex: number) => {
      updateAndPersist((prev) => {
        const day = prev.days[dayNumber];
        if (!day) return prev;
        const newTopicsRead = [...day.topicsRead];
        newTopicsRead[topicIndex] = true;
        return {
          ...prev,
          days: {
            ...prev.days,
            [dayNumber]: {
              ...day,
              topicsRead: newTopicsRead,
            },
          },
        };
      });
    },
    [updateAndPersist]
  );

  const markActivityCompleted = useCallback(
    (dayNumber: number, activityId: string) => {
      updateAndPersist((prev) => {
        const day = prev.days[dayNumber];
        if (!day) return prev;
        return {
          ...prev,
          days: {
            ...prev.days,
            [dayNumber]: {
              ...day,
              activitiesCompleted: {
                ...day.activitiesCompleted,
                [activityId]: true,
              },
            },
          },
        };
      });
    },
    [updateAndPersist]
  );

  const submitCheckpoint = useCallback(
    (dayNumber: number, checkpointIndex: number, isCorrect: boolean) => {
      updateAndPersist((prev) => {
        const day = prev.days[dayNumber];
        if (!day) return prev;
        const newCheckpoints = [...day.checkpointsPassed];
        newCheckpoints[checkpointIndex] = isCorrect;
        return {
          ...prev,
          days: {
            ...prev.days,
            [dayNumber]: {
              ...day,
              checkpointsPassed: newCheckpoints,
            },
          },
        };
      });
    },
    [updateAndPersist]
  );

  const submitAssignment = useCallback(
    (dayNumber: number, submissionData: any): AssignmentEvaluationResult => {
      let result: AssignmentEvaluationResult;
      if (dayNumber === 1) {
        result = evaluateDay1Assignment(submissionData);
      } else if (dayNumber === 2) {
        result = evaluateDay2Assignment(submissionData);
      } else {
        result = evaluateDay3Assignment(submissionData);
      }

      updateAndPersist((prev) => {
        const day = prev.days[dayNumber];
        if (!day) return prev;
        return {
          ...prev,
          days: {
            ...prev.days,
            [dayNumber]: {
              ...day,
              assignmentSubmitted: true,
              assignmentScore: result.percentage,
              assignmentFeedback: result.feedback,
              assignmentData: submissionData,
            },
          },
        };
      });

      return result;
    },
    [updateAndPersist]
  );

  const markInterviewReviewed = useCallback(
    (dayNumber: number) => {
      updateAndPersist((prev) => {
        const day = prev.days[dayNumber];
        if (!day) return prev;
        return {
          ...prev,
          days: {
            ...prev.days,
            [dayNumber]: {
              ...day,
              interviewReviewed: true,
            },
          },
        };
      });
    },
    [updateAndPersist]
  );

  const submitQuiz = useCallback(
    (dayNumber: number, answers: Record<string, number>): QuizEvaluationResult => {
      const result = evaluateDevOpsQuiz(dayNumber, answers);

      updateAndPersist((prev) => {
        const day = prev.days[dayNumber];
        if (!day) return prev;
        const attempts = day.quizAttempts || [];
        const attempt = {
          score: result.score,
          total: result.total,
          passed: result.passed,
          timestamp: new Date().toISOString(),
        };

        const isFullyCompleted =
          result.passed &&
          day.assignmentSubmitted &&
          day.topicsRead.filter(Boolean).length >= (dayNumber === 1 ? 6 : dayNumber === 2 ? 7 : 8);

        return {
          ...prev,
          days: {
            ...prev.days,
            [dayNumber]: {
              ...day,
              quizSubmitted: true,
              quizScore: result.score,
              quizPassed: result.passed || day.quizPassed,
              quizAttempts: [...attempts, attempt],
              completedAt: isFullyCompleted ? (day.completedAt || new Date().toISOString()) : day.completedAt,
            },
          },
        };
      });

      return result;
    },
    [updateAndPersist]
  );

  const getOverallStats = useCallback(() => {
    let completedDays = 0;
    let passedQuizzes = 0;
    let submittedAssignments = 0;

    [1, 2, 3].forEach((dayNum) => {
      const day = state.days[dayNum];
      if (day) {
        if (day.quizPassed) passedQuizzes += 1;
        if (day.assignmentSubmitted) submittedAssignments += 1;
        // Day considered complete if quiz passed and assignment submitted
        if (day.quizPassed && day.assignmentSubmitted) {
          completedDays += 1;
        }
      }
    });

    const totalImplementedDays = 3;
    const completionPercentage = Math.round((completedDays / totalImplementedDays) * 100);

    return {
      completedDaysCount: completedDays,
      totalImplementedDays,
      completionPercentage,
      quizzesPassedCount: passedQuizzes,
      assignmentsCompletedCount: submittedAssignments,
    };
  }, [state.days]);

  const resetDevOpsProgress = useCallback(() => {
    const initial = createInitialDevOpsState();
    setState(initial);
    saveDevOpsProgress(userId, initial);
  }, [userId]);

  return (
    <DevOpsContext.Provider
      value={{
        state,
        loading,
        enrollInCourse,
        getDayProgress,
        markTopicRead,
        markActivityCompleted,
        submitCheckpoint,
        submitAssignment,
        markInterviewReviewed,
        submitQuiz,
        getOverallStats,
        resetDevOpsProgress,
      }}
    >
      {children}
    </DevOpsContext.Provider>
  );
};

export const useDevOps = (): DevOpsContextType => {
  const context = useContext(DevOpsContext);
  if (!context) {
    const fallbackState = createInitialDevOpsState();
    return {
      state: fallbackState,
      loading: false,
      enrollInCourse: () => {},
      getDayProgress: (dayNumber: number) => fallbackState.days[dayNumber] || createDefaultDayProgress(dayNumber),
      markTopicRead: () => {},
      markActivityCompleted: () => {},
      submitCheckpoint: () => {},
      submitAssignment: () => ({ score: 0, maxScore: 100, percentage: 0, passed: false, feedback: '', criteriaScores: [] }),
      markInterviewReviewed: () => {},
      submitQuiz: () => ({ score: 0, total: 10, percentage: 0, passed: false, questionResults: [] }),
      getOverallStats: () => ({
        completedDaysCount: 0,
        totalImplementedDays: 3,
        completionPercentage: 0,
        quizzesPassedCount: 0,
        assignmentsCompletedCount: 0,
      }),
      resetDevOpsProgress: () => {},
    };
  }
  return context;
};
