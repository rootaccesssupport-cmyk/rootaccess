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
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { LessonContentRenderer } from '../../components/common/LessonContentRenderer';
import { useProgress } from '../../context/ProgressContext';
import {
  PLAYWRIGHT_DAY_4_DATA,
  PLAYWRIGHT_DAY_4_STARTER_CODE,
  PLAYWRIGHT_DAY_4_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_4_STARTER_OUTPUT,
  evaluateDay4Assignment,
} from '../../data/playwrightDay4Data';
import type { PlaywrightDay4AssignmentRubric } from '../../types/playwrightCourse';

export const PlaywrightDay4LessonPage: React.FC = () => {
  const { isCourseEnrolled, enrollInCourse, markLessonComplete, isLessonCompleted } = useProgress();
  const isEnrolled = isCourseEnrolled('playwright-automation');
  const isDay3Completed = isLessonCompleted('lesson-playwright-day-3');

  // Navigation tab states
  const [activeTab, setActiveTab] = useState<'topics' | 'assignment' | 'interview' | 'quiz'>('topics');
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);

  // Milestone 1: Topics read (7 topics)
  const [topicsRead, setTopicsRead] = useState<boolean[]>([false, false, false, false, false, false, false]);

  // Milestone 2: Interactive exercises attempted (4 exercises across topics 1, 2, 4, 7)
  const [exerciseSelections, setExerciseSelections] = useState<Record<string, number>>({});
  const [exerciseSubmitted, setExerciseSubmitted] = useState<Record<string, boolean>>({});

  // Milestone 3: Practical Assignment
  const [assignmentCode, setAssignmentCode] = useState<string>(PLAYWRIGHT_DAY_4_STARTER_CODE);
  const [assignmentExplanation, setAssignmentExplanation] = useState<string>(
    PLAYWRIGHT_DAY_4_STARTER_EXPLANATION
  );
  const [assignmentExpectedOutput, setAssignmentExpectedOutput] = useState<string>(
    PLAYWRIGHT_DAY_4_STARTER_OUTPUT
  );
  const [assignmentEvaluation, setAssignmentEvaluation] = useState<PlaywrightDay4AssignmentRubric | null>(null);
  const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState<boolean>(false);

  // Milestone 4: Interview Question Bank
  const [expandedInterviewIndex, setExpandedInterviewIndex] = useState<number | null>(null);
  const [isInterviewReviewed, setIsInterviewReviewed] = useState<boolean>(false);

  // Milestone 5: Checkpoint Quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Final Completion & Feedback States
  const [isDay4Complete, setIsDay4Complete] = useState<boolean>(() => isLessonCompleted('lesson-playwright-day-4'));
  const [completionMessage, setCompletionMessage] = useState<{ text: string; type: 'success' | 'warning' } | null>(null);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [showDay5Modal, setShowDay5Modal] = useState<boolean>(false);

  // Progress Calculations (5 criteria)
  const topicsReadCount = topicsRead.filter(Boolean).length;
  const isAllTopicsRead = topicsReadCount === 7;

  const totalExercises = PLAYWRIGHT_DAY_4_DATA.topics.filter((t) => t.exercise).length; // 4
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
    if (idx < 6) {
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

  // Interactive Exercises
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

  // Practical Assignment Evaluation
  const handleEvaluateAssignment = () => {
    const evaluation = evaluateDay4Assignment(
      assignmentCode,
      assignmentExpectedOutput,
      assignmentExplanation
    );
    setAssignmentEvaluation(evaluation);
    setIsAssignmentSubmitted(true);
  };

  // Checkpoint Quiz Handlers
  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    PLAYWRIGHT_DAY_4_DATA.quizQuestions.forEach((q) => {
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

  // Sequence-Enforced Day 4 Completion
  const handleMarkDay4Complete = () => {
    if (!isAllTopicsRead) {
      setCompletionMessage({
        text: 'Action Required: Please read all 7 topics in "Core Concepts & Walkthrough" before completing Day 4.',
        type: 'warning',
      });
      setActiveTab('topics');
      return;
    }

    if (!isAllExercisesAttempted) {
      setCompletionMessage({
        text: 'Action Required: Please complete all 4 interactive practice exercises across the topics.',
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
        text: `Action Required: You must pass the Day 4 Checkpoint Quiz with at least 80% (8/10). Current score: ${quizScore}/10.`,
        type: 'warning',
      });
      setActiveTab('quiz');
      return;
    }

    // All 5 milestones met!
    markLessonComplete('lesson-playwright-day-4', true);
    setIsDay4Complete(true);
    setCompletionMessage({
      text: '🎉 Outstanding Work! You have completed Day 4: Locators and Element Identification with full competency.',
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

  // Enrollment Required Screen
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
              Enroll in this comprehensive 20-day course to access Day 4: Locators and Element Identification, code sandboxes, interview banks, and real PDF lesson guides.
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

  const currentTopic = PLAYWRIGHT_DAY_4_DATA.topics[currentTopicIndex];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 space-y-6">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/courses/playwright-automation" className="hover:text-indigo-600 transition-colors font-medium">
            Playwright Automation Testing
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Day 4: Locators</span>
        </nav>

        {/* Advisory Prerequisite Banner (Non-blocking for testing) */}
        {!isDay3Completed && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Prerequisite Recommendation:</strong> You have not completed Day 3 yet. We recommend setting up Playwright before mastering locators.
                </span>
              </div>
              <Link
                to="/courses/playwright-automation/day-3"
                className="font-bold underline text-amber-800 hover:text-amber-950 shrink-0"
              >
                Review Day 3 →
              </Link>
            </div>
          </div>
        )}

        {/* Header & Course Navigation Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                Day 4 of 20
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3 text-slate-400" />
                Estimated: {PLAYWRIGHT_DAY_4_DATA.estimatedHours}
              </span>
              <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                Level: {PLAYWRIGHT_DAY_4_DATA.level}
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full">
                Pure JavaScript (.js)
              </span>
            </div>

            {/* Navigation links & Download PDF */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/courses/playwright-automation/day-3"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Day 3</span>
              </Link>

              <Link
                to="/courses/playwright-automation/day-5"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
                title="Navigate to Day 5"
              >
                <span>Day 5</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="/playwright-js/day-4-locators-and-element-identification.pdf"
                download="day-4-locators-and-element-identification.pdf"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Download Day 4 Notes (PDF)</span>
              </a>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Day 4 — {PLAYWRIGHT_DAY_4_DATA.lessonTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-4xl leading-relaxed">
              {PLAYWRIGHT_DAY_4_DATA.subtitle}
            </p>
          </div>

          {/* Learning Objectives Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
              Day 4 Learning Objectives
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
              {PLAYWRIGHT_DAY_4_DATA.learningObjectives.map((obj, i) => (
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
                Day 4 Learning Progress: {progressPercent}%
              </span>
              <span className="text-xs text-slate-600 font-semibold">
                {milestonesMetCount} of 5 milestones completed
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 4 Navigation Tabs */}
          <div className="flex items-center gap-2 pt-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('topics')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'topics'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/60'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Core Concepts & Walkthrough</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700 ml-1">
                {topicsReadCount}/7
              </span>
            </button>

            <button
              onClick={() => setActiveTab('assignment')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'assignment'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/60'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Practical Assignment</span>
              {isAssignmentPassed && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'interview'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/60'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Interview Questions</span>
              {isInterviewReviewed && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50/60'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Checkpoint Quiz</span>
              {isQuizPassed && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1" />
              )}
            </button>
          </div>
        </div>
        {/* Completion Notice Banner */}
        {completionMessage && (
          <div
            className={`p-4 rounded-xl text-sm flex items-start gap-3 border ${
              completionMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            {completionMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 font-medium">{completionMessage.text}</div>
            <button
              onClick={() => setCompletionMessage(null)}
              className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* TAB 1: CORE CONCEPTS & WALKTHROUGH */}
        {activeTab === 'topics' && (
          <div className="space-y-6">
            {/* Topic Stepper */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                7 Lesson Modules
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {PLAYWRIGHT_DAY_4_DATA.topics.map((t, idx) => {
                  const isRead = topicsRead[idx];
                  const isActive = currentTopicIndex === idx;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setCurrentTopicIndex(idx)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-xs'
                          : isRead
                          ? 'border-emerald-200 bg-emerald-50/40 text-slate-700'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                          Topic {idx + 1}
                        </span>
                        {isRead && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <span className="text-xs font-semibold text-slate-800 line-clamp-1 mt-1">
                        {t.title.replace(`Topic ${idx + 1}: `, '')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Topic Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                      Module {currentTopicIndex + 1} of 7
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {currentTopic.durationMinutes} mins
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                    {currentTopic.title}
                  </h2>
                </div>
                <button
                  onClick={() => handleMarkTopicRead(currentTopicIndex)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    topicsRead[currentTopicIndex]
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>
                    {topicsRead[currentTopicIndex]
                      ? 'Marked as Read (Continue)'
                      : 'Mark as Read & Continue'}
                  </span>
                </button>
              </div>

              {/* Rendered Markdown Explanation */}
              <div className="text-slate-700 text-sm leading-relaxed">
                <LessonContentRenderer content={currentTopic.explanation} />
              </div>

              {/* Code Examples */}
              {currentTopic.examples && currentTopic.examples.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-600" />
                    <span>Real-World Code Demonstration (.js)</span>
                  </div>
                  {currentTopic.examples.map((ex, eIdx) => (
                    <div key={eIdx} className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-indigo-400 font-semibold">{ex.title}</span>
                        {ex.codeSnippet && (
                          <button
                            onClick={() => handleCopyCode(ex.codeSnippet!, eIdx)}
                            className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedCodeIndex === eIdx ? 'Copied!' : 'Copy Code'}</span>
                          </button>
                        )}
                      </div>
                      <p className="text-slate-400 text-[11px] font-sans">{ex.description}</p>
                      {ex.codeSnippet && (
                        <pre className="overflow-x-auto text-emerald-400 leading-relaxed font-mono">
                          <code>{ex.codeSnippet}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Key Takeaways & Terminology */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentTopic.keyTakeaways.map((k, kidx) => (
                      <li key={kidx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Technical Terminology
                  </h3>
                  <div className="space-y-2 text-xs">
                    {currentTopic.terminology.map((term, tidx) => (
                      <div key={tidx}>
                        <span className="font-bold text-slate-900">{term.term}: </span>
                        <span className="text-slate-600">{term.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Practice Exercise for this Topic */}
              {currentTopic.exercise && (
                <div className="mt-8 bg-slate-50/90 border-2 border-indigo-300 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5 ring-2 ring-indigo-100/80">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-100 pb-3">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      Interactive Practice Exercise • Topic {currentTopicIndex + 1}
                    </span>
                    {exerciseSubmitted[currentTopic.exercise.id] && (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border shadow-2xs ${
                          exerciseSelections[currentTopic.exercise.id] === currentTopic.exercise.correctAnswerIndex
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                            : 'bg-rose-100 border-rose-300 text-rose-900'
                        }`}
                      >
                        {exerciseSelections[currentTopic.exercise.id] === currentTopic.exercise.correctAnswerIndex
                          ? 'Correct Answer ✓'
                          : 'Review Recommended'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {currentTopic.exercise.title}
                    </h3>
                  </div>

                  {/* High Contrast Rendered Prompt with Code Highlighting */}
                  <div className="text-slate-800 text-sm leading-relaxed bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
                    <LessonContentRenderer content={currentTopic.exercise.prompt} />
                  </div>

                  {/* Selectable Options */}
                  <div className="space-y-2.5">
                    {currentTopic.exercise.options.map((opt, oIdx) => {
                      const isSelected = exerciseSelections[currentTopic.exercise!.id] === oIdx;
                      const isSubmitted = exerciseSubmitted[currentTopic.exercise!.id];
                      const isCorrect = oIdx === currentTopic.exercise!.correctAnswerIndex;

                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(currentTopic.exercise!.id, oIdx)}
                          className={`w-full p-3.5 text-left rounded-xl text-xs sm:text-sm font-semibold border-2 transition-all flex items-start gap-3.5 cursor-pointer shadow-2xs ${
                            isSubmitted
                              ? isCorrect
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200'
                                : isSelected
                                ? 'border-rose-400 bg-rose-50 text-rose-950'
                                : 'border-slate-200 bg-white text-slate-400 opacity-60'
                              : isSelected
                              ? 'border-indigo-600 bg-indigo-50/90 text-indigo-950 font-bold ring-2 ring-indigo-200 shadow-xs'
                              : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 text-slate-900'
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 font-bold border transition-colors ${
                              isSubmitted && isCorrect
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : isSelected
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-slate-100 border-slate-300 text-slate-800'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="font-mono text-xs sm:text-sm leading-relaxed break-all">
                            {opt}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2">
                    {!exerciseSubmitted[currentTopic.exercise.id] ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleSubmitExercise(currentTopic.exercise!.id)}
                          disabled={exerciseSelections[currentTopic.exercise.id] === undefined}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
                        >
                          Check Answer
                        </button>
                        {exerciseSelections[currentTopic.exercise.id] !== undefined && (
                          <button
                            type="button"
                            onClick={() => handleResetExercise(currentTopic.exercise!.id)}
                            className="px-4 py-3 border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reset</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="w-full bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 shadow-md space-y-4">
                        <div className="space-y-2">
                          <div className="font-bold flex items-center gap-2 text-amber-300 text-xs sm:text-sm uppercase tracking-wider">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Detailed Technical Explanation:</span>
                          </div>
                          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                            {currentTopic.exercise.explanation}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                          <span className="text-xs text-slate-400">
                            {exerciseSelections[currentTopic.exercise.id] === currentTopic.exercise.correctAnswerIndex
                              ? '✓ Correct answer selected! You can reset anytime to practice again.'
                              : '✕ Incorrect selection. Reset this question to select another option.'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleResetExercise(currentTopic.exercise!.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-amber-300 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>
                              {exerciseSelections[currentTopic.exercise.id] === currentTopic.exercise.correctAnswerIndex
                                ? 'Reset & Practice Again'
                                : 'Reset & Try Again'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Stepper Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  disabled={currentTopicIndex === 0}
                  onClick={() => setCurrentTopicIndex(currentTopicIndex - 1)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  ← Previous Module
                </button>
                <button
                  onClick={() => handleMarkTopicRead(currentTopicIndex)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <span>
                    {currentTopicIndex === 6
                      ? 'Mark Module 7 Complete'
                      : `Continue to Module ${currentTopicIndex + 2} →`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRACTICAL ASSIGNMENT */}
        {activeTab === 'assignment' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                Milestone 3 of 5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                Practical Assignment: Build a Resilient Locator Practice Test Suite
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Demonstrate proficiency with Playwright element selection strategies in pure JavaScript (.js). Your script must use accessible user-facing locators, handle strict mode violations using .filter() or chaining, write at least 3 auto-retrying web-first assertions, document an AI prompt & review workflow, and verify execution in the live DOM.
              </p>
            </div>

            {/* Rubric Criteria Overview */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                10-Point Deterministic Assessment Rubric:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
                <div>• Identifies at least 3 distinct target elements</div>
                <div>• Uses user-facing locators (getByRole, getByPlaceholder)</div>
                <div>• Contains at least 3 web-first assertions</div>
                <div>• Narrows multiple matches with .filter() or chaining</div>
                <div>• Documents AI prompt and locator review workflow</div>
                <div>• Includes realistic terminal execution output</div>
                <div>• Clear explanation of locator selection rationale</div>
                <div>• Addressed strict mode disambiguation</div>
                <div>• Explains real DOM verification method (--debug/count)</div>
                <div>• Syntactically valid JavaScript test structure</div>
              </div>
            </div>

            {/* Code Editor Area */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  1. Playwright Test Script (tests/day4-locators.spec.js):
                </label>
                <textarea
                  value={assignmentCode}
                  onChange={(e) => setAssignmentCode(e.target.value)}
                  rows={16}
                  className="w-full font-mono text-xs p-4 bg-slate-950 text-emerald-400 rounded-xl border border-slate-800 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  2. Terminal Execution Log:
                </label>
                <textarea
                  value={assignmentExpectedOutput}
                  onChange={(e) => setAssignmentExpectedOutput(e.target.value)}
                  rows={6}
                  placeholder="Paste terminal log showing test execution (e.g. 1 passed)..."
                  className="w-full font-mono text-xs p-4 bg-slate-900 text-sky-300 rounded-xl border border-slate-800 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  3. Technical Explanation & AI Verification Rationale:
                </label>
                <textarea
                  value={assignmentExplanation}
                  onChange={(e) => setAssignmentExplanation(e.target.value)}
                  rows={6}
                  placeholder="Explain why specific locators were chosen, how strict mode was avoided, and how the AI suggestion was verified against the real DOM..."
                  className="w-full text-xs p-4 bg-white text-slate-800 rounded-xl border border-slate-300 focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleEvaluateAssignment}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Evaluate Assignment Submission</span>
                </button>
              </div>

              {/* Evaluation Results Card */}
              {assignmentEvaluation && (
                <div
                  className={`mt-6 p-6 rounded-2xl border ${
                    assignmentEvaluation.passed
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-amber-50/70 border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {assignmentEvaluation.passed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                      )}
                      <span className="text-sm font-bold text-slate-900">
                        {assignmentEvaluation.passed
                          ? 'Assignment Rubric Passed!'
                          : 'Assignment Needs Additional Work'}
                      </span>
                    </div>
                    <span className="text-sm font-black text-slate-900">
                      Score: {assignmentEvaluation.score} / 10
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {assignmentEvaluation.criteria.map((crit) => (
                      <div
                        key={crit.id}
                        className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                          crit.passed
                            ? 'bg-white/80 border-emerald-200 text-emerald-950'
                            : 'bg-white/80 border-amber-200 text-amber-950'
                        }`}
                      >
                        {crit.passed ? (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="font-bold">{crit.title}: </span>
                          <span>{crit.feedback}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: INTERVIEW QUESTIONS */}
        {activeTab === 'interview' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                  Milestone 4 of 5
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  Day 4 Interview Question Bank
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  10 comprehensive questions on Playwright locators, strict mode, auto-waiting, CSS/XPath trade-offs, and AI prompt engineering asked by top tech interviewers.
                </p>
              </div>
              <button
                onClick={() => setIsInterviewReviewed(true)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isInterviewReviewed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                <span>
                  {isInterviewReviewed
                    ? 'Interview Prep Reviewed ✓'
                    : 'Mark Interview Prep Reviewed'}
                </span>
              </button>
            </div>

            <div className="space-y-3">
              {PLAYWRIGHT_DAY_4_DATA.interviewQuestions.map((q, idx) => {
                const isExpanded = expandedInterviewIndex === idx;
                return (
                  <div
                    key={q.id}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() =>
                        setExpandedInterviewIndex(isExpanded ? null : idx)
                      }
                      className="w-full p-4 text-left bg-slate-50/70 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {q.questionNumber}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {q.question}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Difficulty: {q.difficulty} • Evaluation Focus: {q.assessmentFocus}
                          </div>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-4 bg-white border-t border-slate-100 space-y-3 text-xs leading-relaxed">
                        <div>
                          <div className="font-bold text-slate-900 mb-1">
                            Suggested Professional Model Answer:
                          </div>
                          <p className="text-slate-700">{q.modelAnswer}</p>
                        </div>
                        {q.followUpQuestion && (
                          <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-lg text-indigo-950 font-medium">
                            <span className="font-bold text-indigo-700">
                              Likely Follow-up Question:{' '}
                            </span>
                            "{q.followUpQuestion}"
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

        {/* TAB 4: CHECKPOINT QUIZ */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                Milestone 5 of 5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                Day 4 Checkpoint Quiz
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Test your knowledge of Playwright locators, strict mode, auto-waiting assertions, and AI evaluation. You must achieve at least 80% (8/10) to satisfy this milestone.
              </p>
            </div>

            <div className="space-y-6">
              {PLAYWRIGHT_DAY_4_DATA.quizQuestions.map((q) => {
                const selectedOption = quizAnswers[q.id];
                const isCorrect = selectedOption === q.correctAnswerIndex;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {q.questionNumber}
                      </span>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {q.question}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selectedOption === oIdx;
                        const isTheCorrectOne = oIdx === q.correctAnswerIndex;

                        return (
                          <button
                            key={oIdx}
                            disabled={isQuizSubmitted}
                            onClick={() => handleSelectQuizOption(q.id, oIdx)}
                            className={`p-3 text-left rounded-xl text-xs font-medium border transition-all flex items-start gap-3 cursor-pointer ${
                              isQuizSubmitted
                                ? isTheCorrectOne
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                                  : isChosen
                                  ? 'border-rose-300 bg-rose-50 text-rose-950'
                                  : 'border-slate-200 bg-white text-slate-500'
                                : isChosen
                                ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-semibold'
                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                                isChosen
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isQuizSubmitted && (
                      <div
                        className={`p-3 rounded-lg text-xs border ${
                          isCorrect
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                            : 'bg-amber-50/60 border-amber-200 text-amber-900'
                        }`}
                      >
                        <span className="font-bold">
                          {isCorrect ? '✓ Correct! ' : '✗ Incorrect. '}
                        </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit & Results */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!isQuizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={
                    Object.keys(quizAnswers).length <
                    PLAYWRIGHT_DAY_4_DATA.quizQuestions.length
                  }
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  Submit Quiz for Scoring
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">
                      Score: {quizScore} / {PLAYWRIGHT_DAY_4_DATA.quizQuestions.length} ({Math.round((quizScore / 10) * 100)}%)
                    </span>
                    {isQuizPassed ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        Checkpoint quiz passed! (≥ 80%)
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                        Passing score is 80% (8/10). Please retake.
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Global Sequence-Enforced Day 4 Completion Footer */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Ready to Complete Day 4?
            </h3>
            <p className="text-xs text-slate-500 max-w-xl">
              Completion requires: all 7 topics read, all 4 practice exercises attempted, practical assignment evaluated and passed, interview question bank reviewed, and checkpoint quiz passed (≥ 80%).
            </p>
          </div>

          <button
            onClick={handleMarkDay4Complete}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2 shrink-0 ${
              isDay4Complete
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>
              {isDay4Complete ? 'Day 4 Completed ✓' : 'Mark Day 4 Complete'}
            </span>
          </button>
        </div>

        {/* Day 5 Navigation Preview when Day 4 is completed */}
        {isDay4Complete && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                Next Up in Playwright Course
              </span>
              <h3 className="text-base font-bold text-indigo-950 mt-1">
                Day 5: Web-First Assertions & Actions
              </h3>
              <p className="text-xs text-indigo-800 mt-0.5">
                Master actions (clicking, typing, radio buttons, checkboxes, dropdowns) and auto-waiting assertions for complex forms.
              </p>
            </div>
            <Link
              to="/courses/playwright-automation/day-5"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue to Day 5</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      {/* Day 5 Preview Modal */}
      {showDay5Modal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700">
                Next Milestone
              </span>
              <button
                onClick={() => setShowDay5Modal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Day 5: Web-First Assertions & Actions
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Day 5 dives into actionable form automation: clicking, typing, selecting dropdowns, uploading files, and verifying reactive web states with smart polling.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900">Status:</div>
              <div>
                {isDay4Complete ? (
                  <span className="text-emerald-700 font-bold">
                    ✓ Day 4 Complete. Day 5 is unlocked and ready to start!
                  </span>
                ) : (
                  <span className="text-amber-700 font-bold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    Locked until Day 4 completion requirements are satisfied.
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => setShowDay5Modal(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Preview
              </button>
              {isDay4Complete && (
                <Link
                  to="/courses/playwright-automation/day-5"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <span>Start Day 5</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
