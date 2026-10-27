import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
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
  enrolledCourses: string[];
  isCourseEnrolled: (courseSlug: string) => boolean;
  enrollInCourse: (courseSlug: string) => void;
  unenrollCourse: (courseSlug: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Initial default seed for student demo
const DEFAULT_INITIAL_STATE: ProgressState = {
  completedLessons: [],
  enrolledCourses: [],
  quizScores: {},
  reportedBugs: {},
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const storageKey = useMemo(() => {
    return user?.id ? `rootaccess_progress_${user.id}` : 'rootaccess_progress_guest';
  }, [user?.id]);

  const [state, setState] = useState<ProgressState>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_INITIAL_STATE,
          ...parsed,
          completedLessons: parsed.completedLessons || [],
          quizScores: parsed.quizScores || {},
          reportedBugs: parsed.reportedBugs || {},
          enrolledCourses: parsed.enrolledCourses || [],
        };
      }
    } catch (e) {
      console.warn('Failed to load stored progress:', e);
    }
    return DEFAULT_INITIAL_STATE;
  });

  // Reload when active user or profile changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const baseState = stored ? JSON.parse(stored) : null;

      let activeCourses: string[];
      if (profile && Array.isArray(profile.enrolled_courses)) {
        activeCourses = profile.enrolled_courses;
      } else {
        activeCourses = baseState?.enrolledCourses || [];
      }

      if (baseState) {
        setState({
          ...DEFAULT_INITIAL_STATE,
          ...baseState,
          completedLessons: baseState.completedLessons || [],
          quizScores: baseState.quizScores || {},
          reportedBugs: baseState.reportedBugs || {},
          enrolledCourses: activeCourses,
        });
      } else {
        setState({
          ...DEFAULT_INITIAL_STATE,
          enrolledCourses: activeCourses,
        });
      }
    } catch (e) {
      console.warn('Failed to load stored progress for user:', e);
    }
  }, [storageKey, profile, profile?.enrolled_courses]);

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

  const isCourseEnrolled = useCallback(
    (courseSlug: string): boolean => {
      const list = state.enrolledCourses || [];
      if (list.includes(courseSlug)) return true;
      if (courseSlug === 'manual-testing' && list.includes('manual-qa-fundamentals')) return true;
      if (courseSlug === 'manual-qa-fundamentals' && list.includes('manual-testing')) return true;
      return false;
    },
    [state.enrolledCourses]
  );

  const enrollInCourse = useCallback(
    (courseSlug: string) => {
      setState((prev) => {
        const current = prev.enrolledCourses || [];
        const normalized = courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : courseSlug;
        if (current.includes(normalized)) return prev;
        const updated = [...current, normalized];

        // Sync to Supabase profiles if logged in
        if (user && isSupabaseConfigured) {
          supabase
            .from('profiles')
            .update({
              enrolled_courses: updated,
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)
            .then(({ error }) => {
              if (error) {
                console.warn('Could not sync enrolled_courses to Supabase:', error.message);
              }
            });
        }

        return {
          ...prev,
          enrolledCourses: updated,
        };
      });
    },
    [user]
  );

  const unenrollCourse = useCallback(
    (courseSlug: string) => {
      setState((prev) => {
        const current = prev.enrolledCourses || [];
        const normalized = courseSlug === 'manual-testing' ? 'manual-qa-fundamentals' : courseSlug;
        const updated = current.filter((s) => s !== normalized && s !== courseSlug);

        // Sync to Supabase profiles if logged in
        if (user && isSupabaseConfigured) {
          supabase
            .from('profiles')
            .update({
              enrolled_courses: updated,
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)
            .then(({ error }) => {
              if (error) {
                console.warn('Could not sync enrolled_courses removal to Supabase:', error.message);
              }
            });
        }

        return {
          ...prev,
          enrolledCourses: updated,
        };
      });
    },
    [user]
  );

  const resetProgress = useCallback(() => {
    setState({
      completedLessons: [],
      quizScores: {},
      reportedBugs: {},
      enrolledCourses: [],
    });
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        completedLessons: state.completedLessons,
        quizScores: state.quizScores,
        reportedBugs: state.reportedBugs,
        enrolledCourses: state.enrolledCourses || [],
        isCourseEnrolled,
        enrollInCourse,
        unenrollCourse,
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
      completedLessons: [],
      enrolledCourses: [],
      isCourseEnrolled: () => false,
      enrollInCourse: () => {},
      unenrollCourse: () => {},
      quizScores: {},
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
