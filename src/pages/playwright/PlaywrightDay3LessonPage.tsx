import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  FileCheck2,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Lock,
  Code,
  Copy,
  Terminal,
  X,
  Award,
  Target,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { LessonContentRenderer } from '../../components/common/LessonContentRenderer';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import {
  PLAYWRIGHT_DAY_3_DATA,
  PLAYWRIGHT_DAY_3_STARTER_CODE,
  PLAYWRIGHT_DAY_3_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_3_STARTER_OUTPUT,
  evaluateDay3Assignment,
} from '../../data/playwrightDay3Data';
import type { PlaywrightDay3AssignmentRubric } from '../../types/playwrightCourse';

export const PlaywrightDay3LessonPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isCourseEnrolled, enrollInCourse, markLessonComplete, isLessonCompleted } = useProgress();
  const isEnrolled = isCourseEnrolled('playwright-automation');
  const isDay2Completed = isLessonCompleted('lesson-playwright-day-2');

  // Navigation tab states
  const [activeTab, setActiveTab] = useState<'topics' | 'assignment' | 'interview' | 'quiz'>('topics');
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);

  // Milestone 1: Topics read (6 topics)
  const [topicsRead, setTopicsRead] = useState<boolean[]>([false, false, false, false, false, false]);

  // Milestone 2: Interactive exercises attempted (6 exercises)
  const [exerciseSelections, setExerciseSelections] = useState<Record<string, number>>({});
  const [exerciseSubmitted, setExerciseSubmitted] = useState<Record<string, boolean>>({});

  // Milestone 3: Practical Assignment
  const [projectSetupConfirmed, setProjectSetupConfirmed] = useState<boolean>(true);
  const [assignmentCode, setAssignmentCode] = useState<string>(PLAYWRIGHT_DAY_3_STARTER_CODE);
  const [assignmentExplanation, setAssignmentExplanation] = useState<string>(
    PLAYWRIGHT_DAY_3_STARTER_EXPLANATION
  );
  const [assignmentExpectedOutput, setAssignmentExpectedOutput] = useState<string>(
    PLAYWRIGHT_DAY_3_STARTER_OUTPUT
  );
  const [assignmentEvaluation, setAssignmentEvaluation] = useState<PlaywrightDay3AssignmentRubric | null>(null);
  const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState<boolean>(false);

  // Milestone 4: Interview Question Bank
  const [expandedInterviewIndex, setExpandedInterviewIndex] = useState<number | null>(null);
  const [isInterviewReviewed, setIsInterviewReviewed] = useState<boolean>(false);

  // Milestone 5: Checkpoint Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Final Completion & Feedback States
  const [isDay3Complete, setIsDay3Complete] = useState<boolean>(() => isLessonCompleted('lesson-playwright-day-3'));
  const [completionMessage, setCompletionMessage] = useState<{ text: string; type: 'success' | 'warning' } | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [showDay4Modal, setShowDay4Modal] = useState<boolean>(false);

  // Progress Calculations (5 criteria)
  const topicsReadCount = topicsRead.filter(Boolean).length;
  const isAllTopicsRead = topicsReadCount === 6;

  const totalExercises = PLAYWRIGHT_DAY_3_DATA.topics.filter((t) => t.exercise).length; // 6
  const exercisesAttemptedCount = Object.keys(exerciseSubmitted).filter((id) => exerciseSubmitted[id]).length;
  const isAllExercisesAttempted = exercisesAttemptedCount >= totalExercises;

  const isAssignmentPassed = isAssignmentSubmitted && (assignmentEvaluation ? assignmentEvaluation.passed : false);
  const isQuizPassed = isQuizSubmitted && quizScore >= 8; // 8 out of 10 is 80%

  const milestonesMetCount = [
    isAllTopicsRead,
    isAllExercisesAttempted,
    isAssignmentPassed,
    isInterviewReviewed,
    isQuizPassed,
  ].filter(Boolean).length;

  const progressPercent = Math.round((milestonesMetCount / 5) * 100);

  // Topic Navigation & Marking
  const handleMarkTopicRead = (idx: number) => {
    setTopicsRead((prev) => {
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });
    if (idx < 5) {
      setCurrentTopicIndex(idx + 1);
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        try {
          window.scrollTo({ top: 380, behavior: 'smooth' });
        } catch {
          // ignore in test env
        }
      }
    }
  };

  // Exercise Handlers
  const handleSelectExerciseOption = (exerciseId: string, optionIndex: number) => {
    setExerciseSelections((prev) => ({
      ...prev,
      [exerciseId]: optionIndex,
    }));
  };

  const handleSubmitExercise = (exerciseId: string) => {
    if (exerciseSelections[exerciseId] === undefined) return;
    setExerciseSubmitted((prev) => ({
      ...prev,
      [exerciseId]: true,
    }));
  };

  const handleRetryExercise = (exerciseId: string) => {
    setExerciseSubmitted((prev) => ({
      ...prev,
      [exerciseId]: false,
    }));
    setExerciseSelections((prev) => {
      const next = { ...prev };
      delete next[exerciseId];
      return next;
    });
  };

  // Assignment Handlers
  const handleResetStarterCode = () => {
    setAssignmentCode(PLAYWRIGHT_DAY_3_STARTER_CODE);
    setAssignmentExplanation(PLAYWRIGHT_DAY_3_STARTER_EXPLANATION);
    setAssignmentExpectedOutput(PLAYWRIGHT_DAY_3_STARTER_OUTPUT);
    setProjectSetupConfirmed(true);
    setAssignmentEvaluation(null);
    setIsAssignmentSubmitted(false);
  };

  const handleEvaluateAssignment = () => {
    const evaluation = evaluateDay3Assignment({
      code: assignmentCode,
      explanation: assignmentExplanation,
      expectedOutput: assignmentExpectedOutput,
      projectSetupConfirmed,
    });
    setAssignmentEvaluation(evaluation);
    setIsAssignmentSubmitted(true);
    if (evaluation.passed) {
      setCompletionMessage({
        text: '✅ Practical Assignment Passed! All 10 rubric requirements verified.',
        type: 'success',
      });
    } else {
      setCompletionMessage({
        text: `Assignment evaluated: ${evaluation.score}/10 criteria met. Review the feedback below to satisfy all requirements.`,
        type: 'warning',
      });
    }
  };

  // Interview Bank Handlers
  const handleToggleInterview = (idx: number) => {
    setExpandedInterviewIndex((prev) => (prev === idx ? null : idx));
  };

  const handleMarkInterviewReviewed = () => {
    setIsInterviewReviewed(true);
    setCompletionMessage({
      text: '✅ Interview Question Bank reviewed! You have completed Milestone 4.',
      type: 'success',
    });
  };

  // Quiz Handlers
  const handleSelectQuizAnswer = (questionId: string, optionIndex: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    PLAYWRIGHT_DAY_3_DATA.quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setIsQuizSubmitted(true);

    if (score >= 8) {
      setCompletionMessage({
        text: `🎉 Checkpoint Quiz Passed! Score: ${score}/10 (${score * 10}%). Passing threshold (80%) met.`,
        type: 'success',
      });
    } else {
      setCompletionMessage({
        text: `Quiz Score: ${score}/10. You need at least 8/10 (80%) to pass. Please review explanations and retry.`,
        type: 'warning',
      });
    }
  };

  const handleRetryQuiz = () => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
  };

  // Copy code helper
  const handleCopyCode = (code: string, idx: number) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(code);
      setCopiedCodeIndex(idx);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    }
  };

  // Sequence-Enforced Day 3 Completion
  const handleMarkDay3Complete = () => {
    if (!isAllTopicsRead) {
      setCompletionMessage({
        text: 'Action Required: Please read all 6 topics in "Core Concepts & Walkthrough" before completing Day 3.',
        type: 'warning',
      });
      setActiveTab('topics');
      return;
    }

    if (!isAllExercisesAttempted) {
      setCompletionMessage({
        text: 'Action Required: Please complete all 6 interactive practice exercises across the topics.',
        type: 'warning',
      });
      setActiveTab('topics');
      return;
    }

    if (!isAssignmentPassed) {
      setCompletionMessage({
        text: 'Action Required: Please complete and evaluate your Practical Assignment to satisfy all rubric requirements.',
        type: 'warning',
      });
      setActiveTab('assignment');
      return;
    }

    if (!isInterviewReviewed) {
      setCompletionMessage({
        text: 'Action Required: Please review the 10 Interview Questions and click "Mark Interview Prep Reviewed".',
        type: 'warning',
      });
      setActiveTab('interview');
      return;
    }

    if (!isQuizPassed) {
      setCompletionMessage({
        text: `Action Required: You must pass the Day 3 Checkpoint Quiz with at least 80% (8/10). Current score: ${quizScore}/10.`,
        type: 'warning',
      });
      setActiveTab('quiz');
      return;
    }

    markLessonComplete('lesson-playwright-day-3', true);
    setIsDay3Complete(true);
    setCompletionMessage({
      text: '🎉 Outstanding Work! You have successfully mastered Day 3: Environment Setup and Your First Playwright Test. You are now prepared for Day 4: Locators and Selectors in Depth.',
      type: 'success',
    });
  };

  // Course Enrollment Gate
  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                Enrollment Required
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Playwright Automation with JavaScript + AI
              </h1>
              <p className="text-sm text-slate-600">
                Enroll in the free 20-day course to access Day 3: Environment Setup, write your first script, and run browser automation.
              </p>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  navigate('/signup');
                } else {
                  enrollInCourse('playwright-automation');
                }
              }}
              className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{user ? 'Enroll in Course for Free' : 'Create Account to Enroll'}</span>
            </button>

            <div className="pt-2">
              <Link
                to="/courses/playwright-automation"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                ← View Full 20-Day Course Curriculum
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentTopic = PLAYWRIGHT_DAY_3_DATA.topics[currentTopicIndex];
  const currentExercise = currentTopic?.exercise;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/courses/playwright-automation" className="hover:text-indigo-600 transition-colors">
            Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 font-medium">Playwright Automation Testing</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-indigo-600 font-bold">Day 3</span>
        </nav>

        {/* Day 2 Prerequisite Notice if Day 2 is not yet completed */}
        {!isDay2Completed && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4 text-xs text-amber-800">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Prerequisite Recommendation:</strong> Day 2 (JavaScript Essentials for Test Automation) covers async/await and Promise handling used in Day 3 test scripts.
              </span>
            </div>
            <Link
              to="/courses/playwright-automation/day-2"
              className="shrink-0 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-bold transition-colors"
            >
              Review Day 2 →
            </Link>
          </div>
        )}

        {/* Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                Day 3 of 20
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Estimated: {PLAYWRIGHT_DAY_3_DATA.estimatedHours}
              </span>
              <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                Level: {PLAYWRIGHT_DAY_3_DATA.level}
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
                Pure JavaScript (.js)
              </span>
            </div>

            {/* Navigation links & Download PDF */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/courses/playwright-automation/day-2"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Day 2</span>
              </Link>

              <Link
                to="/courses/playwright-automation/day-4"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
                title="Navigate directly to Day 4"
              >
                <span>Day 4</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/courses/playwright-automation/locator-lab"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors shadow-2xs"
                title="Interactive Locator Sandbox"
              >
                <Target className="w-3.5 h-3.5 text-rose-600" />
                <span>Locator Lab</span>
              </Link>

              <a
                href="/playwright-js/day-3-environment-setup-and-your-first-playwright-test.pdf"
                download="day-3-environment-setup-and-your-first-playwright-test.pdf"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Download Day 3 Notes (PDF)</span>
              </a>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Day 3 — {PLAYWRIGHT_DAY_3_DATA.lessonTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-4xl leading-relaxed">
              {PLAYWRIGHT_DAY_3_DATA.subtitle}
            </p>
          </div>

          {/* Learning Objectives Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
              Day 3 Learning Objectives
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
              {PLAYWRIGHT_DAY_3_DATA.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicator (5 Milestones) */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Day 3 Learning Progress: {progressPercent}%
              </span>
              <span className="text-xs text-slate-600 font-semibold">
                {milestonesMetCount} of 5 milestones completed
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 5 Milestones Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
              <div
                className={`p-3 rounded-xl border text-xs ${
                  isAllTopicsRead
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2 className={`w-4 h-4 ${isAllTopicsRead ? 'text-emerald-600' : 'text-slate-400'}`} />
                  1. Six Topics
                </div>
                <div className="text-[11px] text-slate-500">{topicsReadCount}/6 Topics Read</div>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs ${
                  isAllExercisesAttempted
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2
                    className={`w-4 h-4 ${isAllExercisesAttempted ? 'text-emerald-600' : 'text-slate-400'}`}
                  />
                  2. Exercises
                </div>
                <div className="text-[11px] text-slate-500">{exercisesAttemptedCount}/6 Attempted</div>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs ${
                  isAssignmentPassed
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2
                    className={`w-4 h-4 ${isAssignmentPassed ? 'text-emerald-600' : 'text-slate-400'}`}
                  />
                  3. Assignment
                </div>
                <div className="text-[11px] text-slate-500">
                  {isAssignmentPassed ? 'Passed (10/10)' : isAssignmentSubmitted ? 'Needs Revision' : 'Pending'}
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs ${
                  isInterviewReviewed
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2
                    className={`w-4 h-4 ${isInterviewReviewed ? 'text-emerald-600' : 'text-slate-400'}`}
                  />
                  4. Interview Prep
                </div>
                <div className="text-[11px] text-slate-500">
                  {isInterviewReviewed ? '10 Qs Reviewed' : 'Pending Review'}
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs ${
                  isQuizPassed
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2 className={`w-4 h-4 ${isQuizPassed ? 'text-emerald-600' : 'text-slate-400'}`} />
                  5. Checkpoint Quiz
                </div>
                <div className="text-[11px] text-slate-500">
                  {isQuizPassed ? `Passed (${quizScore}/10)` : 'Pending (≥ 8/10 req.)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Message Banner */}
        {completionMessage && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 text-sm leading-relaxed ${
              completionMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            {completionMessage.type === 'success' ? (
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 font-medium">{completionMessage.text}</div>
          </div>
        )}

        {/* Primary Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-1">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Core Concepts & Walkthrough</span>
            {isAllTopicsRead && <Check className="w-3.5 h-3.5 text-white" />}
          </button>

          <button
            onClick={() => setActiveTab('assignment')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'assignment'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>2. Practical Assignment</span>
            {isAssignmentPassed && <Check className="w-3.5 h-3.5 text-white" />}
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'interview'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>3. Interview Question Bank</span>
            {isInterviewReviewed && <Check className="w-3.5 h-3.5 text-white" />}
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>4. Checkpoint Quiz</span>
            {isQuizPassed && <Check className="w-3.5 h-3.5 text-white" />}
          </button>
        </div>

        {/* TAB 1: CORE CONCEPTS & INTERACTIVE TOPICS */}
        {activeTab === 'topics' && (
          <div className="space-y-6">
            {/* Topic Stepper Bar (6 topics) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {PLAYWRIGHT_DAY_3_DATA.topics.map((t, idx) => {
                const isSelected = currentTopicIndex === idx;
                const isRead = topicsRead[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentTopicIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 shadow-xs ring-1 ring-indigo-500'
                        : isRead
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 hover:bg-emerald-50'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className={isSelected ? 'text-indigo-700' : isRead ? 'text-emerald-700' : 'text-slate-500'}>
                        Topic {idx + 1}
                      </span>
                      {isRead ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <span className="text-[10px] text-slate-400 font-normal">{t.durationMinutes}m</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold line-clamp-2 leading-tight">
                      {t.title.replace(`Topic ${idx + 1}: `, '')}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Topic Container */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Topic {currentTopicIndex + 1} of 6
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {currentTopic.durationMinutes} mins
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {currentTopic.title}
                  </h2>
                </div>

                <button
                  onClick={() => handleMarkTopicRead(currentTopicIndex)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                    topicsRead[currentTopicIndex]
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {topicsRead[currentTopicIndex] ? 'Completed ✓' : 'Mark as Read & Next'}
                  </span>
                </button>
              </div>

              {/* Formatted Explanation using LessonContentRenderer */}
              <div className="text-slate-700 text-sm leading-relaxed">
                <LessonContentRenderer content={currentTopic.explanation} />
              </div>

              {/* Key Takeaways & Core Terminology */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Key Automation Takeaways</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {currentTopic.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-indigo-50/40 border border-indigo-200/80 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Essential Terminology</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {currentTopic.terminology.map((t, idx) => (
                      <div key={idx} className="text-slate-800">
                        <strong className="text-indigo-950 font-semibold">{t.term}:</strong>{' '}
                        <span className="text-slate-600">{t.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code Examples */}
              {currentTopic.examples && currentTopic.examples.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-600" />
                    <span>Terminal Commands & Code Walkthroughs (Pure JavaScript)</span>
                  </h3>

                  <div className="space-y-4">
                    {currentTopic.examples.map((example, eIdx) => (
                      <div
                        key={eIdx}
                        className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-sm"
                      >
                        <div className="bg-slate-800/90 px-4 py-2.5 flex items-center justify-between border-b border-slate-700/80">
                          <div>
                            <span className="text-xs font-bold text-slate-200">{example.title}</span>
                            <span className="text-[11px] text-slate-400 ml-2">({example.description})</span>
                          </div>
                          {example.codeSnippet && (
                            <button
                              onClick={() => handleCopyCode(example.codeSnippet || '', eIdx)}
                              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {copiedCodeIndex === eIdx ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {example.codeSnippet && (
                          <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                            <code>{example.codeSnippet}</code>
                          </pre>
                        )}

                        {example.expectedOutput && (
                          <div className="bg-slate-950/80 px-4 py-2.5 border-t border-slate-800 flex items-start gap-2 text-xs font-mono text-slate-300">
                            <Terminal className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-slate-400 font-sans font-bold">Expected Output: </span>
                              <span className="text-sky-300 whitespace-pre-wrap">{example.expectedOutput}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Practice Exercise for this Topic */}
              {currentExercise && (
                <div className="bg-slate-50 border border-slate-300/80 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      Topic {currentTopicIndex + 1} Practice Exercise
                    </span>
                    {exerciseSubmitted[currentExercise.id] && (
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          exerciseSelections[currentExercise.id] === currentExercise.correctAnswerIndex
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {exerciseSelections[currentExercise.id] === currentExercise.correctAnswerIndex
                          ? 'Correct ✓'
                          : 'Needs Review'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">{currentExercise.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      {currentExercise.prompt}
                    </p>
                  </div>

                  {currentExercise.codeSnippet && (
                    <div className="bg-slate-900 rounded-xl p-3.5 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto">
                      <code>{currentExercise.codeSnippet}</code>
                    </div>
                  )}

                  <div className="space-y-2">
                    {currentExercise.options.map((opt, oIdx) => {
                      const isSelected = exerciseSelections[currentExercise.id] === oIdx;
                      const isSubmitted = exerciseSubmitted[currentExercise.id];
                      const isCorrect = oIdx === currentExercise.correctAnswerIndex;

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectExerciseOption(currentExercise.id, oIdx)}
                          className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center gap-3 cursor-pointer ${
                            isSubmitted
                              ? isCorrect
                                ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950 font-bold'
                                : isSelected
                                ? 'bg-rose-100/70 border-rose-300 text-rose-950'
                                : 'bg-white border-slate-200 text-slate-500 opacity-60'
                              : isSelected
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback & Explanation */}
                  {exerciseSubmitted[currentExercise.id] && (
                    <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs leading-relaxed text-slate-800">
                      <div className="font-bold text-slate-900">
                        {exerciseSelections[currentExercise.id] === currentExercise.correctAnswerIndex
                          ? '🎉 Well done!'
                          : '💡 Hint & Explanation:'}
                      </div>
                      <p>{currentExercise.explanation}</p>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Select the correct option to verify your understanding.
                    </span>

                    {!exerciseSubmitted[currentExercise.id] ? (
                      <div className="flex items-center gap-2">
                        {exerciseSelections[currentExercise.id] !== undefined && (
                           <button
                            type="button"
                            onClick={() => handleRetryExercise(currentExercise.id)}
                            className="px-3 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reset</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleSubmitExercise(currentExercise.id)}
                          disabled={exerciseSelections[currentExercise.id] === undefined}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Check Answer
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRetryExercise(currentExercise.id)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>
                          {exerciseSelections[currentExercise.id] === currentExercise.correctAnswerIndex
                            ? 'Reset & Practice Again'
                            : 'Reset & Try Again'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Topic Navigation */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  disabled={currentTopicIndex === 0}
                  onClick={() => setCurrentTopicIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Topic</span>
                </button>

                <div className="text-xs text-slate-500 font-medium">
                  Topic {currentTopicIndex + 1} of 6
                </div>

                {currentTopicIndex < 5 ? (
                  <button
                    onClick={() => handleMarkTopicRead(currentTopicIndex)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Mark Read & Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleMarkTopicRead(5);
                      setActiveTab('assignment');
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Assignment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRACTICAL ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Milestone 3 Practical Project
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">Local Setup & First Test Script</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    Build and Run Your First Playwright Test
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetStarterCode}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reset to Starter</span>
                  </button>
                </div>
              </div>

              {/* Real-World QA Context Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-600" />
                  <span>Real-World Automation QA Context:</span>
                </div>
                <p>
                  You are setting up a local Playwright regression project for your engineering team. You will create the local project folder, install Playwright Test via the interactive CLI wizard, configure the project, write your first pure JavaScript test script targeting <code>https://example.com</code>, and execute it in both headless and headed modes.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Security Reminder:</strong> Never upload <code>node_modules</code>, passwords, API secrets, or private corporate data in test submissions.
                  </span>
                </div>
              </div>

              {/* 10 Rubric Checklist */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center justify-between">
                  <span>Assignment Rubric Requirements (10 Criteria)</span>
                  {assignmentEvaluation && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        assignmentEvaluation.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {assignmentEvaluation.score} / 10 Criteria Met
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {[
                    '1. Local project setup confirmed (playwright-js-practice initialized)',
                    '2. Import test and expect from @playwright/test',
                    '3. Test declaration with async ({ page }) fixture',
                    '4. Asynchronous page navigation (await page.goto)',
                    '5. Accessible element locator (getByRole)',
                    '6. Web-first visibility assertion (toBeVisible)',
                    '7. Terminal output demonstrating headless test execution',
                    '8. Headed execution demonstrated or noted (--headed)',
                    '9. Written explanation defining test, expect, page, goto, await',
                    '10. Diagnostic troubleshooting approach for failures described',
                  ].map((req, rIdx) => {
                    const isChecked = assignmentEvaluation?.criteria[rIdx]?.passed;
                    return (
                      <div
                        key={rIdx}
                        className={`p-2 rounded-lg border flex items-start gap-2 ${
                          assignmentEvaluation
                            ? isChecked
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                              : 'bg-rose-50 border-rose-200 text-rose-900'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="shrink-0 mt-0.5">
                          {assignmentEvaluation ? (
                            isChecked ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <X className="w-3.5 h-3.5 text-rose-600" />
                            )
                          ) : (
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-300 block" />
                          )}
                        </span>
                        <span>{req}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Project Setup Confirmation Checkbox */}
              <div className="p-3.5 bg-indigo-50/50 border border-indigo-200 rounded-xl flex items-center gap-3">
                <input
                  type="checkbox"
                  id="setupConfirm"
                  checked={projectSetupConfirmed}
                  onChange={(e) => setProjectSetupConfirmed(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="setupConfirm" className="text-xs text-indigo-950 font-medium cursor-pointer">
                  I confirm that I created my local project folder (<code>playwright-js-practice</code>), verified Node.js and npm, and installed Playwright Test via <code>npm init playwright@latest</code> on my computer.
                </label>
              </div>

              {/* Code Workspace */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-indigo-600" />
                    <span>JavaScript Test Source Code (tests/first-test.spec.js)</span>
                  </label>
                  <span className="text-[11px] text-slate-500">Pure JavaScript (.spec.js)</span>
                </div>
                <textarea
                  value={assignmentCode}
                  onChange={(e) => setAssignmentCode(e.target.value)}
                  rows={12}
                  className="w-full p-4 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                  placeholder="// Paste your tests/first-test.spec.js code here..."
                />
              </div>

              {/* Terminal Execution Result */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-indigo-600" />
                  <span>Test Execution Terminal Output (npx playwright test)</span>
                </label>
                <textarea
                  value={assignmentExpectedOutput}
                  onChange={(e) => setAssignmentExpectedOutput(e.target.value)}
                  rows={5}
                  className="w-full p-3 font-mono text-xs text-slate-800 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                  placeholder="Paste your terminal test output (e.g., 1 passed)..."
                />
              </div>

              {/* Written Explanation Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Written Explanation: Roles of test, expect, page, goto, await & Troubleshooting Approach</span>
                </label>
                <textarea
                  value={assignmentExplanation}
                  onChange={(e) => setAssignmentExplanation(e.target.value)}
                  rows={5}
                  className="w-full p-3 text-xs text-slate-800 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                  placeholder="Explain the roles of test, expect, page, goto, await, and describe how you would investigate failures..."
                />
              </div>

              {/* Submission & Evaluation Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Click below to evaluate your assignment against all 10 rubric requirements with instant feedback.
                </div>

                <button
                  onClick={handleEvaluateAssignment}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Evaluate & Submit Assignment</span>
                </button>
              </div>

              {/* Evaluation Results Box */}
              {assignmentEvaluation && (
                <div
                  className={`p-5 rounded-2xl border space-y-4 ${
                    assignmentEvaluation.passed
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50/70 border-amber-300 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {assignmentEvaluation.passed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-amber-600" />
                      )}
                      <div>
                        <h4 className="text-base font-bold">
                          {assignmentEvaluation.passed
                            ? '🎉 Assignment Approved! All 10 Criteria Satisfied'
                            : '⚠️ Revision Required: Rubric Criteria Incomplete'}
                        </h4>
                        <p className="text-xs opacity-80 mt-0.5">
                          Score: {assignmentEvaluation.score}/10 ({assignmentEvaluation.score * 10}%)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200/50">
                    {assignmentEvaluation.criteria.map((c) => (
                      <div key={c.id} className="text-xs flex items-start gap-2">
                        <span className="shrink-0 mt-0.5">
                          {c.passed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-rose-600" />
                          )}
                        </span>
                        <div>
                          <strong className="font-semibold">{c.title}: </strong>
                          <span className="opacity-90">{c.feedback}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: INTERVIEW PREPARATION BANK */}
        {activeTab === 'interview' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Milestone 4 Career Readiness
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">10 Questions with Model Answers</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    Day 3 QA Interview Question Bank
                  </h2>
                </div>

                <button
                  onClick={handleMarkInterviewReviewed}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                    isInterviewReviewed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isInterviewReviewed ? 'Reviewed ✓' : 'Mark Interview Prep Reviewed'}</span>
                </button>
              </div>

              <div className="space-y-4">
                {PLAYWRIGHT_DAY_3_DATA.interviewQuestions.map((q, idx) => {
                  const isExpanded = expandedInterviewIndex === idx;
                  return (
                    <div
                      key={q.id}
                      className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-slate-300 transition-colors"
                    >
                      <button
                        onClick={() => handleToggleInterview(idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700">
                              Q{q.questionNumber}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                q.difficulty === 'Beginner'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : q.difficulty === 'Intermediate'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-purple-50 text-purple-700 border border-purple-200'
                              }`}
                            >
                              {q.difficulty}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900">{q.question}</h3>
                        </div>

                        <div className="shrink-0 text-slate-400 mt-1">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <div className="p-3 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs">
                            <strong className="text-indigo-900 font-bold">What the Interviewer Evaluates: </strong>
                            <span className="text-indigo-950">{q.assessmentFocus}</span>
                          </div>

                          <div>
                            <strong className="text-slate-900 font-bold block mb-1">Model Suggested Answer:</strong>
                            <p className="text-slate-700 leading-relaxed">{q.modelAnswer}</p>
                          </div>

                          {q.followUpQuestion && (
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                              <strong className="text-slate-900 font-bold">Likely Follow-Up Question: </strong>
                              <span className="text-slate-600 italic">"{q.followUpQuestion}"</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleMarkInterviewReviewed}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isInterviewReviewed ? 'Reviewed ✓' : 'Mark Interview Prep Reviewed'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CHECKPOINT QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Milestone 5 Checkpoint Quiz
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">10 Questions • 80% (8/10) to Pass</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    Day 3 Knowledge Verification Quiz
                  </h2>
                </div>

                {isQuizSubmitted && (
                  <div
                    className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                      isQuizPassed
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>Score: {quizScore} / 10 ({quizScore * 10}%) — {isQuizPassed ? 'Passed' : 'Needs Retake'}</span>
                  </div>
                )}
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {PLAYWRIGHT_DAY_3_DATA.quizQuestions.map((q, idx) => {
                  const selected = quizAnswers[q.id];
                  const isCorrect = selected === q.correctAnswerIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="text-xs font-bold text-indigo-700">Question {idx + 1} of 10</span>
                        {isQuizSubmitted && (
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? '+1 Mark' : '0 Marks'}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {q.question}
                      </h3>

                      <div className="grid grid-cols-1 gap-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          return (
                            <button
                              key={optIdx}
                              disabled={isQuizSubmitted}
                              onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                              className={`p-3 rounded-xl text-left text-xs font-medium transition-all flex items-center gap-3 border cursor-pointer ${
                                isQuizSubmitted
                                  ? optIdx === q.correctAnswerIndex
                                    ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950 font-bold'
                                    : isOptionSelected
                                    ? 'bg-rose-100/70 border-rose-300 text-rose-950'
                                    : 'bg-white/60 border-slate-200 text-slate-500 opacity-60'
                                  : isOptionSelected
                                  ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                                  isOptionSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Technical Explanation after submission */}
                      {isQuizSubmitted && (
                        <div className="pt-2 border-t border-slate-200/60 text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900">Technical Explanation: </span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!isQuizSubmitted ? (
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < 10}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    Submit Quiz for Scoring ({Object.keys(quizAnswers).length}/10 answered)
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    {isQuizPassed
                      ? '🎉 Checkpoint quiz passed! You have met all requirements for Milestone 5.'
                      : 'You scored below the 80% passing threshold. Please review explanations and retake the quiz.'}
                  </span>
                  <button
                    onClick={handleRetryQuiz}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Retry Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sequence-Enforced Day 3 Completion Button */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Ready to Complete Day 3?</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Requires: 6 Topics Read • 6 Exercises Attempted • Assignment Passed • Interview Bank Reviewed • Quiz Score ≥ 80%.
            </p>
          </div>

          <button
            onClick={handleMarkDay3Complete}
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
              isDay3Complete
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isDay3Complete ? 'Day 3 Completed ✓' : 'Mark Day 3 Complete'}
          </button>
        </div>

        {/* Day 4 Navigation Preview when Day 3 is completed */}
        {isDay3Complete && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                Next Up in Playwright Course
              </span>
              <h3 className="text-base font-bold text-indigo-950 mt-1">
                Day 4: Locators and Element Identification
              </h3>
              <p className="text-xs text-indigo-800 mt-0.5">
                Master Playwright user-facing locators, CSS & XPath trade-offs, strict mode, filtering, debugging, and AI-assisted locator selection.
              </p>
            </div>
            <Link
              to="/courses/playwright-automation/day-4"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Go to Day 4</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      {/* Day 4 Preview Modal */}
      {showDay4Modal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                Next Milestone
              </span>
              <button
                onClick={() => setShowDay4Modal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Day 4: Robust Locators & Actions
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Day 4 teaches resilient element selection strategies without fragile XPath or brittle CSS class names. You will master getByRole, getByLabel, getByPlaceholder, chaining, and auto-waiting actionability checks.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900">Status:</div>
              <div>
                {isDay3Complete ? (
                  <span className="text-emerald-700 font-bold">
                    ✓ Day 3 Complete. Day 4 curriculum is scheduled next.
                  </span>
                ) : (
                  <span className="text-amber-700 font-bold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    Locked until Day 3 completion requirements are satisfied.
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDay4Modal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
