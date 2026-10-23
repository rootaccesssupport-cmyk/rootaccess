import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { COURSES, SIMULATED_BUGS } from '../data/curriculumData';
import type { ProgressState, QuizScoreRecord, BugReportSubmission } from '../types/curriculum';

interface ProgressContextType {
  completedLessons: string[];
  quizScores: Record<string, QuizScoreRecord>;
  reportedBugs: Record<string, BugReportSubmission>;
  isLessonCompleted: (lessonId: string) => boolean;
  markLessonComplete: (lessonId: string, completed?: boolean) => void;
  saveQuizResult: (courseSlug: string, score: number, total: number) => QuizScoreRecord;
  submitBugReport: (report: BugReportSubmission) => { success: boolean; feedback: string; matchedSeverity: boolean };
  getCourseProgress: (courseSlug: string) => {
    completedCount: number;
    totalCount: number;
    percent: number;
    isPassedQuiz: boolean;
    quizScore?: QuizScoreRecord;
  };
  overallStats: {
    totalLessonsCompleted: number;
    totalLessonsAvailable: number;
    totalQuizzesPassed: number;
    totalQuizzesAvailable: number;
    quizAveragePercent: number;
    bugsFoundCount: number;
    totalBugsAvailable: number;
  };
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Initial default seed for student demo
const DEFAULT_INITIAL_STATE: ProgressState = {
  completedLessons: [
    'lesson-stlc-fundamentals',
    'lesson-test-case-design',
  ],
  quizScores: {
    'manual-qa-fundamentals': {
      score: 4,
      total: 4,
      percentage: 100,
      passed: true,
      completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  },
  reportedBugs: {
    'bug-negative-quantity': {
      scenarioId: 'checkout-bug-hunt',
      bugId: 'bug-negative-quantity',
      title: 'Cart allows negative quantity calculation resulting in fraudulent credit',
      severity: 'Critical',
      stepsToReproduce: '1. Add item to cart\n2. Change quantity to -1\n3. Click Update Cart',
      expectedBehavior: 'Input should enforce min="1" and reject negative quantities',
      actualBehavior: 'Total price decreases to negative value',
      submittedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  },
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const storageKey = useMemo(() => {
    return user?.id ? `rootaccess_progress_${user.id}` : 'rootaccess_progress_guest';
  }, [user?.id]);

  const [state, setState] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load stored progress:', e);
    }
    return DEFAULT_INITIAL_STATE;
  });

  // Reload when active user changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setState(JSON.parse(stored));
      } else {
        setState(DEFAULT_INITIAL_STATE);
      }
    } catch (e) {
      console.warn('Failed to load stored progress for user:', e);
    }
  }, [storageKey]);

  // Persist on state change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist progress:', e);
    }
  }, [state, storageKey]);

  const isLessonCompleted = useCallback(
    (lessonId: string) => state.completedLessons.includes(lessonId),
    [state.completedLessons]
  );

  const markLessonComplete = useCallback((lessonId: string, completed = true) => {
    setState((prev) => {
      const alreadyHas = prev.completedLessons.includes(lessonId);
      if (completed && !alreadyHas) {
        return {
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId],
        };
      } else if (!completed && alreadyHas) {
        return {
          ...prev,
          completedLessons: prev.completedLessons.filter((id) => id !== lessonId),
        };
      }
      return prev;
    });
  }, []);

  const saveQuizResult = useCallback(
    (courseSlug: string, score: number, total: number) => {
      const percentage = Math.round((score / total) * 100);
      const course = COURSES.find((c) => c.slug === courseSlug);
      const passingPercent = course?.quiz.passingScorePercent || 75;
      const passed = percentage >= passingPercent;

      const record: QuizScoreRecord = {
        score,
        total,
        percentage,
        passed,
        completedAt: new Date().toISOString(),
      };

      setState((prev) => ({
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [courseSlug]: record,
        },
      }));

      return record;
    },
    []
  );

  const submitBugReport = useCallback(
    (report: BugReportSubmission) => {
      const targetBug = SIMULATED_BUGS.find((b) => b.id === report.bugId);
      if (!targetBug) {
        return {
          success: false,
          feedback: 'Unknown bug target scenario. Please select a valid defect.',
          matchedSeverity: false,
        };
      }

      const matchedSeverity = targetBug.expectedSeverity === report.severity;

      let feedback = `Great catch! Bug "${targetBug.name}" logged successfully.`;
      if (!matchedSeverity) {
        feedback += ` Note on Severity: You marked this as '${report.severity}', but industry QA leads classify this as '${targetBug.expectedSeverity}' because: ${targetBug.explanation}`;
      } else {
        feedback += ` Excellent severity evaluation ('${report.severity}') aligned with QA lead criteria.`;
      }

      setState((prev) => ({
        ...prev,
        reportedBugs: {
          ...prev.reportedBugs,
          [report.bugId]: {
            ...report,
            submittedAt: new Date().toISOString(),
          },
        },
      }));

      return {
        success: true,
        feedback,
        matchedSeverity,
      };
    },
    []
  );

  const getCourseProgress = useCallback(
    (courseSlug: string) => {
      const course = COURSES.find((c) => c.slug === courseSlug);
      if (!course) {
        return { completedCount: 0, totalCount: 0, percent: 0, isPassedQuiz: false };
      }

      const totalCount = course.lessons.length;
      const completedCount = course.lessons.filter((l) =>
        state.completedLessons.includes(l.id)
      ).length;

      const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
      const quizScore = state.quizScores[courseSlug];
      const isPassedQuiz = Boolean(quizScore?.passed);

      return {
        completedCount,
        totalCount,
        percent,
        isPassedQuiz,
        quizScore,
      };
    },
    [state.completedLessons, state.quizScores]
  );

  const overallStats = useMemo(() => {
    let totalLessons = 0;
    COURSES.forEach((c) => {
      totalLessons += c.lessons.length;
    });

    const totalLessonsCompleted = state.completedLessons.length;
    const quizEntries = Object.values(state.quizScores);
    const totalQuizzesPassed = quizEntries.filter((q) => q.passed).length;
    const totalQuizzesAvailable = COURSES.length;

    const quizAveragePercent =
      quizEntries.length > 0
        ? Math.round(
            quizEntries.reduce((acc, curr) => acc + curr.percentage, 0) /
              quizEntries.length
          )
        : 0;

    const bugsFoundCount = Object.keys(state.reportedBugs).length;
    const totalBugsAvailable = SIMULATED_BUGS.length;

    return {
      totalLessonsCompleted,
      totalLessonsAvailable: totalLessons,
      totalQuizzesPassed,
      totalQuizzesAvailable,
      quizAveragePercent,
      bugsFoundCount,
      totalBugsAvailable,
    };
  }, [state.completedLessons, state.quizScores, state.reportedBugs]);

  const resetProgress = useCallback(() => {
    setState({
      completedLessons: [],
      quizScores: {},
      reportedBugs: {},
    });
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        completedLessons: state.completedLessons,
        quizScores: state.quizScores,
        reportedBugs: state.reportedBugs,
        isLessonCompleted,
        markLessonComplete,
        saveQuizResult,
        submitBugReport,
        getCourseProgress,
        overallStats,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    return {
      completedLessons: ['lesson-stlc-fundamentals', 'lesson-test-case-design'],
      quizScores: {
        'manual-qa-fundamentals': {
          score: 4,
          total: 4,
          percentage: 100,
          passed: true,
          completedAt: new Date().toISOString(),
        },
      },
      reportedBugs: {
        'bug-negative-quantity': {
          scenarioId: 'checkout-bug-hunt',
          bugId: 'bug-negative-quantity',
          title: 'Cart allows negative quantity',
          severity: 'Critical',
          stepsToReproduce: '1. Add item\n2. Set qty to -1',
          expectedBehavior: 'Min value 1 enforced',
          actualBehavior: 'Total decreases negatively',
          submittedAt: new Date().toISOString(),
        },
      },
      isLessonCompleted: (id: string) =>
        ['lesson-stlc-fundamentals', 'lesson-test-case-design'].includes(id),
      markLessonComplete: () => {},
      saveQuizResult: () => ({
        score: 4,
        total: 4,
        percentage: 100,
        passed: true,
        completedAt: new Date().toISOString(),
      }),
      submitBugReport: () => ({
        success: true,
        feedback: 'Bug logged successfully',
        matchedSeverity: true,
      }),
      getCourseProgress: () => ({
        completedCount: 2,
        totalCount: 3,
        percent: 67,
        isPassedQuiz: true,
      }),
      overallStats: {
        totalLessonsCompleted: 3,
        totalLessonsAvailable: 31,
        totalQuizzesPassed: 1,
        totalQuizzesAvailable: 5,
        quizAveragePercent: 88,
        bugsFoundCount: 1,
        totalBugsAvailable: 4,
      },
      resetProgress: () => {},
    };
  }
  return context;
};
