import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import type {
  ManualQaOverallState,
  PracticalEvaluationResult,
} from '../types/manualQa';
import {
  createInitialLearnerState,
  loadLearnerProgress,
  recordContentRead,
  submitPracticalAssignment,
  submitDailyCheckpoint,
  submitSurpriseTest1,
  submitFinalSurpriseAssessment,
  saveLearnerProgress,
} from '../services/manualQaStorageService';

export interface AssessmentSubmissionResult {
  passed: boolean;
  score: number;
  percentage: number;
  feedbackDetails: Array<{
    questionId: string;
    isCorrect: boolean;
    marksAwarded: number;
    maxMarks: number;
    userAnswer: any;
    modelAnswer: string;
    explanation: string;
    commonMistakes: string[];
  }>;
}

export interface ManualQaContextType {
  state: ManualQaOverallState;
  loading: boolean;
  error: string | null;
  activeUserId: string;
  refreshProgress: () => Promise<void>;
  markContentRead: (dayNumber: number) => Promise<void>;
  submitAssignment: (
    dayNumber: number,
    submissionData: any
  ) => Promise<PracticalEvaluationResult>;
  submitCheckpoint: (
    dayNumber: number,
    questionIds: string[],
    answers: Record<string, any>
  ) => Promise<AssessmentSubmissionResult>;
  takeSurpriseTest1: (
    questionIds: string[],
    answers: Record<string, any>
  ) => Promise<AssessmentSubmissionResult>;
  takeFinalAssessment: (
    questionIds: string[],
    answers: Record<string, any>
  ) => Promise<AssessmentSubmissionResult>;
  resetProgressForTesting: () => Promise<void>;
}

const ManualQaContext = createContext<ManualQaContextType | undefined>(undefined);

export const ManualQaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const activeUserId = user?.id || 'guest_learner';

  const [state, setState] = useState<ManualQaOverallState>(createInitialLearnerState());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (uid: string) => {
    try {
      setLoading(true);
      setError(null);
      const loaded = await loadLearnerProgress(uid);
      setState(loaded);
    } catch (err: any) {
      console.error('Error loading Manual QA progress:', err);
      setError(err?.message || 'Failed to load progress');
      setState(createInitialLearnerState());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(activeUserId);
  }, [activeUserId, loadData]);

  const refreshProgress = useCallback(async () => {
    await loadData(activeUserId);
  }, [activeUserId, loadData]);

  const markContentReadHandler = useCallback(
    async (dayNumber: number) => {
      try {
        const nextState = await recordContentRead(activeUserId, dayNumber, state);
        setState(nextState);
      } catch (err: any) {
        setError(err?.message || 'Failed to update content status');
        throw err;
      }
    },
    [activeUserId, state]
  );

  const submitAssignmentHandler = useCallback(
    async (dayNumber: number, submissionData: any): Promise<PracticalEvaluationResult> => {
      try {
        const { updatedState, evaluation } = await submitPracticalAssignment(
          activeUserId,
          dayNumber,
          submissionData,
          state
        );
        setState(updatedState);
        return evaluation;
      } catch (err: any) {
        setError(err?.message || 'Failed to evaluate practical assignment');
        throw err;
      }
    },
    [activeUserId, state]
  );

  const submitCheckpointHandler = useCallback(
    async (
      dayNumber: number,
      questionIds: string[],
      answers: Record<string, any>
    ): Promise<AssessmentSubmissionResult> => {
      try {
        const { updatedState, attempt, feedbackDetails } = await submitDailyCheckpoint(
          activeUserId,
          dayNumber,
          questionIds,
          answers,
          state
        );
        setState(updatedState);
        return {
          passed: attempt.passed,
          score: attempt.score,
          percentage: attempt.percentage,
          feedbackDetails,
        };
      } catch (err: any) {
        setError(err?.message || 'Failed to submit daily checkpoint');
        throw err;
      }
    },
    [activeUserId, state]
  );

  const takeSurpriseTest1Handler = useCallback(
    async (
      questionIds: string[],
      answers: Record<string, any>
    ): Promise<AssessmentSubmissionResult> => {
      try {
        const { updatedState, attempt, feedbackDetails } = await submitSurpriseTest1(
          activeUserId,
          questionIds,
          answers,
          state
        );
        setState(updatedState);
        return {
          passed: attempt.passed,
          score: attempt.score,
          percentage: attempt.percentage,
          feedbackDetails,
        };
      } catch (err: any) {
        setError(err?.message || 'Failed to submit Surprise Test 1');
        throw err;
      }
    },
    [activeUserId, state]
  );

  const takeFinalAssessmentHandler = useCallback(
    async (
      questionIds: string[],
      answers: Record<string, any>
    ): Promise<AssessmentSubmissionResult> => {
      try {
        const { updatedState, attempt, feedbackDetails } = await submitFinalSurpriseAssessment(
          activeUserId,
          questionIds,
          answers,
          state
        );
        setState(updatedState);
        return {
          passed: attempt.passed,
          score: attempt.score,
          percentage: attempt.percentage,
          feedbackDetails,
        };
      } catch (err: any) {
        setError(err?.message || 'Failed to submit Final Assessment');
        throw err;
      }
    },
    [activeUserId, state]
  );

  const resetProgressForTesting = useCallback(async () => {
    const fresh = createInitialLearnerState();
    await saveLearnerProgress(activeUserId, fresh);
    setState(fresh);
  }, [activeUserId]);

  const value: ManualQaContextType = {
    state,
    loading,
    error,
    activeUserId,
    refreshProgress,
    markContentRead: markContentReadHandler,
    submitAssignment: submitAssignmentHandler,
    submitCheckpoint: submitCheckpointHandler,
    takeSurpriseTest1: takeSurpriseTest1Handler,
    takeFinalAssessment: takeFinalAssessmentHandler,
    resetProgressForTesting,
  };

  return <ManualQaContext.Provider value={value}>{children}</ManualQaContext.Provider>;
};

export const useManualQa = (): ManualQaContextType => {
  const context = useContext(ManualQaContext);
  if (!context) {
    const fallbackState = createInitialLearnerState();
    return {
      state: fallbackState,
      loading: false,
      error: null,
      activeUserId: 'guest_learner',
      refreshProgress: async () => {},
      markContentRead: async () => {},
      submitAssignment: async () => ({ score: 0, maxScore: 100, percentage: 0, passed: false, feedback: '', criteriaResults: [] }),
      submitCheckpoint: async () => ({ passed: false, score: 0, percentage: 0, feedbackDetails: [] }),
      takeSurpriseTest1: async () => ({ passed: false, score: 0, percentage: 0, feedbackDetails: [] }),
      takeFinalAssessment: async () => ({ passed: false, score: 0, percentage: 0, feedbackDetails: [] }),
      resetProgressForTesting: async () => {},
    };
  }
  return context;
};
