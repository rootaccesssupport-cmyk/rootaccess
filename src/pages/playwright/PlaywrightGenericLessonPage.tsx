import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  X,
  Award,
  Terminal,
  Play,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { LessonContentRenderer } from '../../components/common/LessonContentRenderer';
import { PlaywrightRealLifeLocatorLab } from '../../components/playwright/PlaywrightRealLifeLocatorLab';
import { useProgress } from '../../context/ProgressContext';
import type { PlaywrightDayUnit } from '../../types/playwrightCourse';

export interface PlaywrightGenericLessonPageProps {
  dayNumber: number;
  data: PlaywrightDayUnit;
  starterCode: string;
  starterExplanation: string;
  starterOutput: string;
  evaluateAssignment: (code: string, output: string, explanation: string) => any;
  prevLessonId: string;
  currentLessonId: string;
  nextLessonId: string | null;
  nextLessonUrl: string | null;
  pdfFileName: string;
}

export const PlaywrightGenericLessonPage: React.FC<PlaywrightGenericLessonPageProps> = ({
  dayNumber,
  data,
  starterCode,
  starterExplanation,
  starterOutput,
  evaluateAssignment,
  prevLessonId,
  currentLessonId,
  nextLessonId: _nextLessonId,
  nextLessonUrl,
  pdfFileName,
}) => {
  const { isCourseEnrolled, enrollInCourse, markLessonComplete, isLessonCompleted } = useProgress();
  const isEnrolled = isCourseEnrolled('playwright-automation');
  const isPrevCompleted = isLessonCompleted(prevLessonId);

  // Tabs state
  const isDay20 = dayNumber === 20;
  type TabType = 'topics' | 'locator-lab' | 'assignment' | 'interview' | 'quiz' | 'final-exam';
  const [activeTab, setActiveTab] = useState<TabType>('topics');
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);

  // Milestone 1: Topics read
  const [topicsRead, setTopicsRead] = useState<boolean[]>(() =>
    new Array(data.topics.length).fill(false)
  );

  // Milestone 2: Interactive exercises attempted
  const [exerciseSelections, setExerciseSelections] = useState<Record<string, number>>({});
  const [exerciseSubmitted, setExerciseSubmitted] = useState<Record<string, boolean>>({});

  // Milestone 3: Practical Assignment
  const [assignmentCode, setAssignmentCode] = useState<string>(starterCode);
  const [assignmentExplanation, setAssignmentExplanation] = useState<string>(starterExplanation);
  const [assignmentExpectedOutput, setAssignmentExpectedOutput] = useState<string>(starterOutput);
  const [assignmentEvaluation, setAssignmentEvaluation] = useState<any | null>(null);
  const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState<boolean>(false);

  // Milestone 4: Interview Question Bank
  const [expandedInterviewIndex, setExpandedInterviewIndex] = useState<number | null>(null);
  const [isInterviewReviewed, setIsInterviewReviewed] = useState<boolean>(false);

  // Milestone 5: Checkpoint Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Day 20: Comprehensive Final Assessment (25 Questions)
  const [finalExamAnswers, setFinalExamAnswers] = useState<Record<string, number>>({});
  const [isFinalExamSubmitted, setIsFinalExamSubmitted] = useState<boolean>(false);
  const [finalExamScore, setFinalExamScore] = useState<number>(0);

  // Completion & Feedback States
  const [isDayComplete, setIsDayComplete] = useState<boolean>(() =>
    isLessonCompleted(currentLessonId)
  );
  const [completionMessage, setCompletionMessage] = useState<{
    text: string;
    type: 'success' | 'warning';
  } | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Progress Calculations
  const topicsReadCount = topicsRead.filter(Boolean).length;
  const isAllTopicsRead = topicsReadCount === data.topics.length;

  const totalExercises = data.topics.filter((t) => t.exercise).length;
  const exercisesAttemptedCount = Object.keys(exerciseSubmitted).filter(
    (id) => exerciseSubmitted[id]
  ).length;
  const isAllExercisesAttempted = exercisesAttemptedCount >= totalExercises;

  const isAssignmentPassed =
    isAssignmentSubmitted && (assignmentEvaluation ? assignmentEvaluation.passed : false);
  const isQuizPassed = isQuizSubmitted && quizScore >= Math.ceil(data.quizQuestions.length * 0.8);

  const isFinalExamPassed =
    !isDay20 || (isFinalExamSubmitted && finalExamScore >= 20); // 20/25 is 80%

  const totalMilestones = isDay20 ? 6 : 5;
  const milestonesMetCount = [
    isAllTopicsRead,
    isAllExercisesAttempted,
    isAssignmentPassed,
    isInterviewReviewed,
    isQuizPassed,
    ...(isDay20 ? [isFinalExamPassed] : []),
  ].filter(Boolean).length;

  const progressPercent = Math.round((milestonesMetCount / totalMilestones) * 100);

  // Handlers
  const handleMarkTopicRead = (idx: number) => {
    setTopicsRead((prev) => {
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });
    if (idx < data.topics.length - 1) {
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

  const handleSelectOption = (exerciseId: string, optionIndex: number) => {
    setExerciseSelections((prev) => ({ ...prev, [exerciseId]: optionIndex }));
  };

  const handleSubmitExercise = (exerciseId: string) => {
    if (exerciseSelections[exerciseId] === undefined) return;
    setExerciseSubmitted((prev) => ({ ...prev, [exerciseId]: true }));
  };

  const handleResetExercise = (exerciseId: string) => {
    setExerciseSubmitted((prev) => ({ ...prev, [exerciseId]: false }));
    setExerciseSelections((prev) => {
      const next = { ...prev };
      delete next[exerciseId];
      return next;
    });
  };

  const handleEvaluateAssignment = () => {
    const evaluation = evaluateAssignment(
      assignmentCode,
      assignmentExpectedOutput,
      assignmentExplanation
    );
    setAssignmentEvaluation(evaluation);
    setIsAssignmentSubmitted(true);
  };

  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    data.quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setIsQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
  };

  const handleSelectFinalExamOption = (questionId: string, optionIdx: number) => {
    if (isFinalExamSubmitted) return;
    setFinalExamAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitFinalExam = () => {
    if (!data.finalAssessment) return;
    let score = 0;
    data.finalAssessment.forEach((q) => {
      if (finalExamAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });
    setFinalExamScore(score);
    setIsFinalExamSubmitted(true);
  };

  const handleRetakeFinalExam = () => {
    setFinalExamAnswers({});
    setIsFinalExamSubmitted(false);
    setFinalExamScore(0);
  };

  const handleMarkDayComplete = () => {
    if (!isAllTopicsRead) {
      setCompletionMessage({
        text: `Action Required: Please read all ${data.topics.length} topics in "Core Concepts & Walkthrough" before completing Day ${dayNumber}.`,
        type: 'warning',
      });
      setActiveTab('topics');
      return;
    }

    if (!isAllExercisesAttempted) {
      setCompletionMessage({
        text: `Action Required: Please complete all ${totalExercises} interactive practice exercises across the topics.`,
        type: 'warning',
      });
      setActiveTab('topics');
      return;
    }

    if (!isAssignmentPassed) {
      setCompletionMessage({
        text: `Action Required: Please complete and evaluate your Practical Assignment to satisfy all rubric requirements.`,
        type: 'warning',
      });
      setActiveTab('assignment');
      return;
    }

    if (!isInterviewReviewed) {
      setCompletionMessage({
        text: `Action Required: Please review the Interview Questions and click "Mark Interview Prep Reviewed".`,
        type: 'warning',
      });
      setActiveTab('interview');
      return;
    }

    if (!isQuizPassed) {
      const requiredScore = Math.ceil(data.quizQuestions.length * 0.8);
      setCompletionMessage({
        text: `Action Required: You must pass the Day ${dayNumber} Checkpoint Quiz with at least 80% (${requiredScore}/${data.quizQuestions.length}). Current score: ${quizScore}/${data.quizQuestions.length}.`,
        type: 'warning',
      });
      setActiveTab('quiz');
      return;
    }

    if (isDay20 && !isFinalExamPassed) {
      setCompletionMessage({
        text: `Action Required: You must pass the 25-Question Comprehensive Final Assessment with at least 80% (20/25). Current score: ${finalExamScore}/25.`,
        type: 'warning',
      });
      setActiveTab('final-exam');
      return;
    }

    // All milestones met!
    markLessonComplete(currentLessonId, true);
    setIsDayComplete(true);
    setCompletionMessage({
      text: isDay20
        ? `🏆 CONGRATULATIONS! You have completed the entire 20-Day Playwright Automation with JavaScript + AI Masterclass and earned your certification!`
        : `🎉 Outstanding Work! You have completed Day ${dayNumber}: ${data.lessonTitle} with full competency.`,
      type: 'success',
    });
  };

  const handleCopyCode = (codeText: string, index: number) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(codeText);
      setCopiedCodeIndex(index);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    }
  };

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center">
            <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
              <Lock className="w-7 h-7" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
              Enrollment Required
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-3">
              Playwright Automation with JavaScript + AI
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Enroll in this comprehensive 20-day course to access Day {dayNumber}: {data.lessonTitle}.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  enrollInCourse('playwright-automation');
                }}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Enroll in Course for Free
              </button>
              <Link
                to="/courses/playwright-automation"
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                View Full 20-Day Curriculum
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentTopic = data.topics[currentTopicIndex];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 space-y-6">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/courses/playwright-automation" className="hover:text-indigo-600 transition-colors font-medium">
            Playwright Automation Testing
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Day {dayNumber}: {data.lessonTitle}</span>
        </nav>

        {/* Advisory Prerequisite Banner */}
        {!isPrevCompleted && dayNumber > 1 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Prerequisite Recommendation:</strong> You have not completed Day {dayNumber - 1} yet. We recommend completing Day {dayNumber - 1} first for sequential mastery.
                </span>
              </div>
              <Link
                to={`/courses/playwright-automation/day-${dayNumber - 1}`}
                className="font-bold underline text-amber-800 hover:text-amber-950 shrink-0"
              >
                Review Day {dayNumber - 1} →
              </Link>
            </div>
          </div>
        )}

        {/* Header & Course Navigation Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                Day {dayNumber} of 20
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3 text-slate-400" />
                Estimated: {data.estimatedHours}
              </span>
              <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                Level: {data.level}
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
                Pure JavaScript (.js)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {dayNumber > 1 && (
                <Link
                  to={`/courses/playwright-automation/day-${dayNumber - 1}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Day {dayNumber - 1}</span>
                </Link>
              )}

              <a
                href={`/playwright-js/${pdfFileName}`}
                download={pdfFileName}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Study Notes PDF</span>
              </a>

              {nextLessonUrl && (
                <Link
                  to={nextLessonUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <span>Day {dayNumber + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Day {dayNumber}: {data.lessonTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed max-w-4xl">
              {data.subtitle}
            </p>
          </div>

          {/* Learning Objectives */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Day {dayNumber} Learning Objectives & Core Competencies
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
              {data.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Milestones Progress Bar */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-600">
                Milestones Completed: <strong>{milestonesMetCount} of {totalMilestones}</strong>
              </span>
              <span className="text-indigo-600 font-bold">{progressPercent}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Feedback message banner */}
        {completionMessage && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between text-sm ${
              completionMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2">
              {completionMessage.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <span className="font-medium">{completionMessage.text}</span>
            </div>
            <button
              onClick={() => setCompletionMessage(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('topics')}
            className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'topics'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Core Concepts ({topicsReadCount}/{data.topics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('locator-lab')}
            className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'locator-lab'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Terminal className="w-4 h-4 text-indigo-500" />
            <span>Live Automation Sandbox</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {dayNumber === 11
                ? 'Auth Sessions'
                : dayNumber === 13
                ? 'Network Mocking'
                : dayNumber === 17 || dayNumber === 5
                ? 'Auto-Wait & Flakiness'
                : dayNumber === 4
                ? 'Locators'
                : 'Interactive Runner'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('assignment')}
            className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'assignment'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>2. Practical Lab {isAssignmentPassed && '✓'}</span>
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'interview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>3. Interview Prep ({data.interviewQuestions.length} Qs) {isInterviewReviewed && '✓'}</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'quiz'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>4. Checkpoint Quiz {isQuizPassed && `(${quizScore}/${data.quizQuestions.length})`}</span>
          </button>

          {isDay20 && (
            <button
              onClick={() => setActiveTab('final-exam')}
              className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'final-exam'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>5. Final Assessment (25 Qs) {isFinalExamPassed && `(${finalExamScore}/25)`}</span>
            </button>
          )}
        </div>

        {/* Tab 1: Core Concepts & Walkthrough */}
        {activeTab === 'topics' && (
          <div className="space-y-6">
            {/* Real-Life Automation Simulator Callout */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 border border-indigo-900/60">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Real-Life Automation Sandbox Included</span>
                  </span>
                  <span className="text-xs text-indigo-200">
                    {dayNumber === 11
                      ? 'StorageState Auth • Multi-Context Sessions'
                      : dayNumber === 13
                      ? 'page.route() Interception • HTTP 500 Mocking'
                      : dayNumber === 17 || dayNumber === 5
                      ? 'Auto-Waiting • Flaky Test Diagnostics'
                      : 'Playwright Test Runner • Live Browser Actions'}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Simulate Real-World Automation on RootCart Live Application
                </h3>
                <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Run authentic Playwright test scripts, intercept and mock API routes (<code>page.route</code>), inject <code>storageState</code> authentication sessions, evaluate auto-waiting, and inspect resilient locators.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('locator-lab')}
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
              >
                <Play className="w-4 h-4 text-indigo-600 fill-current" />
                <span>Launch Automation Sandbox</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Topic Sidebar */}
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2">
                Day {dayNumber} Topics
              </h3>
              <div className="space-y-1">
                {data.topics.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentTopicIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      currentTopicIndex === idx
                        ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/80'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">{t.title}</span>
                    {topicsRead[idx] && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Topic Content Card */}
            <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Topic {currentTopicIndex + 1} of {data.topics.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {currentTopic.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  {topicsRead[currentTopicIndex] ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Check className="w-3.5 h-3.5" /> Read
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMarkTopicRead(currentTopicIndex)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Mark Topic as Read
                    </button>
                  )}
                </div>
              </div>

              {/* Topic Markdown / Content */}
              <div className="prose prose-slate max-w-none text-sm leading-relaxed">
                <LessonContentRenderer content={currentTopic.explanation} />
              </div>

              {/* Code Examples */}
              {currentTopic.examples && currentTopic.examples.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-600" />
                    JavaScript Implementation Examples
                  </h3>
                  {currentTopic.examples.map((ex, eIdx) => (
                    <div key={eIdx} className="bg-slate-900 rounded-xl overflow-hidden text-xs">
                      <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                        <span className="font-mono text-slate-300 font-semibold">{ex.title}</span>
                        {ex.codeSnippet && (
                          <button
                            onClick={() => handleCopyCode(ex.codeSnippet || '', eIdx)}
                            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedCodeIndex === eIdx ? 'Copied!' : 'Copy'}</span>
                          </button>
                        )}
                      </div>
                      <div className="p-4 text-slate-300 space-y-2">
                        <p className="text-slate-400">{ex.description}</p>
                        {ex.codeSnippet && (
                          <pre className="font-mono overflow-x-auto p-2 bg-slate-950/60 rounded-lg text-emerald-400">
                            <code>{ex.codeSnippet}</code>
                          </pre>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Takeaways */}
              {currentTopic.keyTakeaways && currentTopic.keyTakeaways.length > 0 && (
                <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                    Key Architectural Takeaways:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-indigo-950">
                    {currentTopic.keyTakeaways.map((k, kidx) => (
                      <li key={kidx} className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Terminology */}
              {currentTopic.terminology && currentTopic.terminology.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Technical Terminology & Definitions:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {currentTopic.terminology.map((term, tidx) => (
                      <div key={tidx} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                        <strong className="text-slate-900">{term.term}:</strong>{' '}
                        <span className="text-slate-600">{term.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Exercise */}
              {currentTopic.exercise && (
                <div className="bg-white border-2 border-indigo-100 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">
                      Checkpoint Exercise: {currentTopic.exercise.title || currentTopic.exercise.prompt}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentTopic.exercise.prompt}
                  </p>

                  <div className="space-y-2">
                    {currentTopic.exercise.options.map((opt, oIdx) => {
                      const isSelected = exerciseSelections[currentTopic.exercise!.id] === oIdx;
                      const isSubmitted = exerciseSubmitted[currentTopic.exercise!.id];
                      const isCorrect = oIdx === currentTopic.exercise!.correctAnswerIndex;

                      let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
                      if (isSelected) {
                        btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900';
                      }
                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                        } else if (isSelected) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(currentTopic.exercise!.id, oIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {!exerciseSubmitted[currentTopic.exercise.id] ? (
                      <button
                        onClick={() => handleSubmitExercise(currentTopic.exercise!.id)}
                        disabled={exerciseSelections[currentTopic.exercise.id] === undefined}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Check Answer
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResetExercise(currentTopic.exercise!.id)}
                        className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Try Again</span>
                      </button>
                    )}
                  </div>

                  {exerciseSubmitted[currentTopic.exercise.id] && (
                    <div className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700">
                      <strong>Explanation:</strong> {currentTopic.exercise.explanation}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Pagination */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  disabled={currentTopicIndex === 0}
                  onClick={() => setCurrentTopicIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  ← Previous Topic
                </button>
                {currentTopicIndex < data.topics.length - 1 ? (
                  <button
                    onClick={() => handleMarkTopicRead(currentTopicIndex)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Next Topic →
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleMarkTopicRead(currentTopicIndex);
                      setActiveTab('assignment');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Proceed to Practical Lab →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

        {/* Tab: Interactive Automation Sandbox */}
        {activeTab === 'locator-lab' && (
          <div className="space-y-6">
            <PlaywrightRealLifeLocatorLab dayNumber={dayNumber} />
          </div>
        )}

        {/* Tab 2: Practical Assignment */}
        {activeTab === 'assignment' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Hands-On Evaluation Lab
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Day {dayNumber} Practical Engineering Lab
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Write, inspect, and evaluate your JavaScript automation solution. Click "Evaluate Assignment" to test your implementation against the 10-point rubric.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Code Editor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-indigo-600" />
                    Test Implementation Code (Pure JavaScript .js)
                  </label>
                  <button
                    onClick={() => setAssignmentCode(starterCode)}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset Starter Code
                  </button>
                </div>
                <textarea
                  value={assignmentCode}
                  onChange={(e) => setAssignmentCode(e.target.value)}
                  rows={20}
                  className="w-full font-mono text-xs p-3.5 bg-slate-900 text-emerald-400 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Engineering Architecture Explanation:
                  </label>
                  <textarea
                    value={assignmentExplanation}
                    onChange={(e) => setAssignmentExplanation(e.target.value)}
                    rows={6}
                    className="w-full text-xs p-3 bg-white text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Right Column: Execution Output & Rubric */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Simulated Playwright Terminal Output:
                    </label>
                    <textarea
                      value={assignmentExpectedOutput}
                      onChange={(e) => setAssignmentExpectedOutput(e.target.value)}
                      rows={6}
                      className="w-full font-mono text-xs p-3 bg-slate-950 text-slate-300 rounded-xl border border-slate-800 mt-1"
                    />
                  </div>

                  <button
                    onClick={handleEvaluateAssignment}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    Evaluate Assignment (10-Point Rubric)
                  </button>

                  {/* Rubric Evaluation Results */}
                  {assignmentEvaluation && (
                    <div
                      className={`p-5 rounded-xl border ${
                        assignmentEvaluation.passed
                          ? 'bg-emerald-50/60 border-emerald-200'
                          : 'bg-amber-50/60 border-amber-200'
                      } space-y-4`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Rubric Evaluation Score:
                        </span>
                        <span
                          className={`text-base font-extrabold px-3 py-1 rounded-full ${
                            assignmentEvaluation.passed
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {assignmentEvaluation.score} / 10 Points ({assignmentEvaluation.passed ? 'PASSED' : 'NEEDS WORK'})
                        </span>
                      </div>

                      <div className="space-y-2">
                        {assignmentEvaluation.criteria.map((c: any) => (
                          <div
                            key={c.id}
                            className="flex items-start justify-between gap-3 text-xs p-2 rounded bg-white border border-slate-200/80"
                          >
                            <div>
                              <span className="font-semibold text-slate-800">{c.title}</span>
                              <p className="text-slate-500 text-[11px] mt-0.5">{c.feedback}</p>
                            </div>
                            {c.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            )}
                          </div>
                        ))}
                      </div>

                      <p className="text-xs text-slate-600 font-medium pt-2">
                        {assignmentEvaluation.feedback.join(' ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Interview Question Bank */}
        {activeTab === 'interview' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Technical Interview Mastery
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Day {dayNumber} Senior QA Interview Question Bank
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Review these {data.interviewQuestions.length} real-world scenario questions and model architectural answers.
                </p>
              </div>
              <button
                onClick={() => setIsInterviewReviewed(true)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isInterviewReviewed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isInterviewReviewed ? '✓ Interview Prep Reviewed' : 'Mark Interview Prep Reviewed'}
              </button>
            </div>

            <div className="space-y-4">
              {data.interviewQuestions.map((q, qIdx) => {
                const isExpanded = expandedInterviewIndex === qIdx;
                return (
                  <div
                    key={q.id}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedInterviewIndex(isExpanded ? null : qIdx)}
                      className="w-full text-left p-4.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                          {qIdx + 1}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">{q.question}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {q.difficulty && (
                          <span className="text-[11px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                            {q.difficulty}
                          </span>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-5 bg-white border-t border-slate-200 space-y-4 text-xs leading-relaxed text-slate-700">
                        {q.assessmentFocus && (
                          <p className="text-slate-500">
                            <strong>Assessment Focus:</strong> {q.assessmentFocus}
                          </p>
                        )}
                        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
                          <strong className="text-emerald-900 block mb-1">Model Senior Answer:</strong>
                          <p className="text-emerald-950">{q.modelAnswer}</p>
                        </div>
                        {q.followUpQuestion && (
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-600">
                            <strong>Expected Follow-Up Question:</strong> {q.followUpQuestion}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Checkpoint Quiz */}
        {activeTab === 'quiz' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Knowledge Verification
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Day {dayNumber} Checkpoint Quiz
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  10 comprehensive questions. Pass threshold: 80% ({Math.ceil(data.quizQuestions.length * 0.8)}/{data.quizQuestions.length}).
                </p>
              </div>

              {isQuizSubmitted && (
                <div
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${
                    isQuizPassed
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  Score: {quizScore} / {data.quizQuestions.length} ({Math.round((quizScore / data.quizQuestions.length) * 100)}%) —{' '}
                  {isQuizPassed ? 'PASSED' : 'NEEDS RETAKE'}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {data.quizQuestions.map((q, qIdx) => (
                <div key={q.id} className="p-5 border border-slate-200 rounded-xl space-y-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = quizAnswers[q.id] === oIdx;
                      const isCorrect = oIdx === q.correctAnswerIndex;

                      let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
                      if (isSelected) {
                        btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold';
                      }
                      if (isQuizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isQuizSubmitted}
                          onClick={() => handleSelectQuizOption(q.id, oIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isQuizSubmitted && isCorrect && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isQuizSubmitted && (
                    <div className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700 mt-2">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {!isQuizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length < data.quizQuestions.length}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleRetakeQuiz}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Day 20 Comprehensive Final Assessment (25 Questions) */}
        {isDay20 && activeTab === 'final-exam' && data.finalAssessment && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Comprehensive Final Examination
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Playwright Masterclass Final Assessment
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  25 rigorous architectural questions covering all 20 days. Passing threshold: 80% (20/25).
                </p>
              </div>

              {isFinalExamSubmitted && (
                <div
                  className={`px-4 py-2 rounded-xl text-xs font-bold ${
                    isFinalExamPassed
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  Final Score: {finalExamScore} / 25 ({Math.round((finalExamScore / 25) * 100)}%) —{' '}
                  {isFinalExamPassed ? 'PASSED & CERTIFIED' : 'NEEDS RETAKE'}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {data.finalAssessment.map((q, qIdx) => (
                <div key={q.id} className="p-5 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-indigo-600">
                      Question {qIdx + 1} of 25
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {q.category}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = finalExamAnswers[q.id] === oIdx;
                      const isCorrect = oIdx === q.correctAnswerIndex;

                      let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
                      if (isSelected) {
                        btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold';
                      }
                      if (isFinalExamSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isFinalExamSubmitted}
                          onClick={() => handleSelectFinalExamOption(q.id, oIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isFinalExamSubmitted && isCorrect && (
                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isFinalExamSubmitted && (
                    <div className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700 mt-2">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {!isFinalExamSubmitted ? (
                <button
                  onClick={handleSubmitFinalExam}
                  disabled={Object.keys(finalExamAnswers).length < 25}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Submit Final Assessment
                </button>
              ) : (
                <button
                  onClick={handleRetakeFinalExam}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Final Assessment
                </button>
              )}
            </div>
          </div>
        )}

        {/* Bottom Milestone Completion CTA */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Ready to Complete Day {dayNumber}?
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Ensure all milestones are satisfied: Topics read ({topicsReadCount}/{data.topics.length}), Practice exercises ({exercisesAttemptedCount}/{totalExercises}), Practical lab passed, Interview reviewed, and Quiz passed.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isDayComplete ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" /> Day {dayNumber} Completed
                </span>
                {nextLessonUrl && (
                  <Link
                    to={nextLessonUrl}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Continue to Day {dayNumber + 1} →
                  </Link>
                )}
              </div>
            ) : (
              <button
                onClick={handleMarkDayComplete}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs cursor-pointer"
              >
                {isDay20 ? 'Claim Final Certificate 🏆' : `Complete Day ${dayNumber} & Unlock Next →`}
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
