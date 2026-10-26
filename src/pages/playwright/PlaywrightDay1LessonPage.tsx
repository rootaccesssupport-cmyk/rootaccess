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
  Plus,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
  Cpu,
  Lock,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { LessonContentRenderer } from '../../components/common/LessonContentRenderer';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import {
  PLAYWRIGHT_DAY_1_DATA,
  PLAYWRIGHT_DAY_1_STARTER_ROWS,
} from '../../data/playwrightCurriculum';
import type { PlaywrightScenarioRow } from '../../types/playwrightCourse';

export const PlaywrightDay1LessonPage: React.FC = () => {
  const { user } = useAuth();
  const { isCourseEnrolled, enrollInCourse, markLessonComplete } = useProgress();
  const isEnrolled = isCourseEnrolled('playwright-automation');

  // Navigation tab states
  const [activeTab, setActiveTab] = useState<'topics' | 'assignment' | 'interview' | 'quiz'>('topics');
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);

  // Milestone Progress State
  const [topicsRead, setTopicsRead] = useState<boolean[]>([false, false, false, false, false]);
  const [isAssignmentSubmitted, setIsAssignmentSubmitted] = useState<boolean>(false);
  const [assignmentFeedback, setAssignmentFeedback] = useState<string | null>(null);
  const [isInterviewReviewed, setIsInterviewReviewed] = useState<boolean>(false);
  const [isDay1Complete, setIsDay1Complete] = useState<boolean>(false);
  const [completionMessage, setCompletionMessage] = useState<{ text: string; type: 'success' | 'warning' } | null>(null);

  // Assignment Form State: 2 guidance example rows + 1 blank row for the learner to fill
  const [scenarioRows, setScenarioRows] = useState<PlaywrightScenarioRow[]>([
    ...PLAYWRIGHT_DAY_1_STARTER_ROWS,
    {
      id: 'row-3',
      scenarioId: 'TC-ECOMM-03',
      feature: '',
      scenario: '',
      candidateType: 'Automation',
      priority: 'High',
      reason: '',
    },
  ]);
  const [top3Priorities, setTop3Priorities] = useState<string>('');
  const [unreliableTestRisk, setUnreliableTestRisk] = useState<string>('');

  // Interview Questions Toggle State
  const [expandedInterviewIndex, setExpandedInterviewIndex] = useState<number | null>(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Progress Calculations
  const topicsReadCount = topicsRead.filter(Boolean).length;
  const isAllTopicsRead = topicsReadCount === 5;
  const isQuizPassed = isQuizSubmitted && quizScore >= 8; // 8 out of 10 is 80%

  const milestonesMetCount = [
    isAllTopicsRead,
    isAssignmentSubmitted,
    isInterviewReviewed,
    isQuizPassed,
  ].filter(Boolean).length;
  const progressPercent = Math.round((milestonesMetCount / 4) * 100);

  // Handlers
  const handleMarkTopicRead = (idx: number) => {
    setTopicsRead((prev) => {
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });
    if (idx < 4) {
      setCurrentTopicIndex(idx + 1);
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        try {
          window.scrollTo({ top: 380, behavior: 'smooth' });
        } catch {
          // ignore in test environments
        }
      }
    }
  };

  const handleAddScenarioRow = () => {
    const nextNum = scenarioRows.length + 1;
    const newId = `TC-ECOMM-${nextNum < 10 ? '0' + nextNum : nextNum}`;
    setScenarioRows((prev) => [
      ...prev,
      {
        id: `row-${Date.now()}`,
        scenarioId: newId,
        feature: '',
        scenario: '',
        candidateType: 'Automation',
        priority: 'Medium',
        reason: '',
      },
    ]);
  };

  const handleRemoveScenarioRow = (id: string) => {
    if (scenarioRows.length <= 2) {
      alert('You must maintain at least 2 scenario rows in your practical assignment.');
      return;
    }
    setScenarioRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateScenarioRow = (id: string, field: keyof PlaywrightScenarioRow, value: string) => {
    setScenarioRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!top3Priorities.trim()) {
      setAssignmentFeedback('Please identify your 3 high-priority regression scenarios before submitting.');
      return;
    }

    if (!unreliableTestRisk.trim()) {
      setAssignmentFeedback('Please explain at least one critical risk of maintaining unreliable (flaky) automated tests.');
      return;
    }

    const emptyFields = scenarioRows.some(
      (r) => !r.feature.trim() || !r.scenario.trim() || !r.reason.trim()
    );

    if (emptyFields) {
      setAssignmentFeedback('Please complete all fields (Feature, Scenario, and Reason) for every row before submitting.');
      return;
    }

    setIsAssignmentSubmitted(true);
    setAssignmentFeedback(
      `✓ Practical Assignment successfully evaluated! You submitted ${scenarioRows.length} scenarios (${scenarioRows.filter((r) => r.candidateType === 'Automation').length} Automation, ${scenarioRows.filter((r) => r.candidateType.includes('Manual')).length} Manual). Your regression priorities and flaky test risk analysis demonstrate strong QA judgment.`
    );
  };

  const handleSelectQuizAnswer = (qId: string, optIndex: number) => {
    if (isQuizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    const questions = PLAYWRIGHT_DAY_1_DATA.quizQuestions;
    if (Object.keys(quizAnswers).length < questions.length) {
      alert(`Please answer all ${questions.length} questions before submitting.`);
      return;
    }

    let score = 0;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        score += 1;
      }
    });

    setQuizScore(score);
    setIsQuizSubmitted(true);
  };

  const handleRetryQuiz = () => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setQuizScore(0);
  };

  const handleMarkDay1Complete = () => {
    if (!isAllTopicsRead) {
      setCompletionMessage({
        text: 'Action Required: Please read all 5 topics in "Core Concepts & Walkthrough" before marking Day 1 complete.',
        type: 'warning',
      });
      setActiveTab('topics');
      return;
    }

    if (!isAssignmentSubmitted) {
      setCompletionMessage({
        text: 'Action Required: Please complete and submit your Practical Assignment before marking Day 1 complete.',
        type: 'warning',
      });
      setActiveTab('assignment');
      return;
    }

    if (!isInterviewReviewed) {
      setCompletionMessage({
        text: 'Action Required: Please review the Interview Question Bank and click "Mark Interview Prep Reviewed".',
        type: 'warning',
      });
      setActiveTab('interview');
      return;
    }

    if (!isQuizPassed) {
      setCompletionMessage({
        text: `Action Required: You must pass the Day 1 Checkpoint Quiz with at least 80% (8/10). Current score: ${quizScore}/10.`,
        type: 'warning',
      });
      setActiveTab('quiz');
      return;
    }

    markLessonComplete('lesson-playwright-day-1', true);
    setIsDay1Complete(true);
    setCompletionMessage({
      text: '🎉 Congratulations! You have successfully completed Day 1 of Playwright Automation with JavaScript + AI. You have mastered test automation principles, Playwright architecture, and the 20-day roadmap.',
      type: 'success',
    });
  };

  const currentTopic = PLAYWRIGHT_DAY_1_DATA.topics[currentTopicIndex];

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center max-w-xl space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border border-purple-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Course Enrollment Required</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Playwright Automation with JavaScript + AI
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Free students can explore the course curriculum and syllabus. To access Day 1 interactive lessons, code execution, practical assignments, and the interview question bank, please enroll in this course.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2 text-slate-700">
              <div className="font-bold text-slate-900">What full course enrollment unlocks:</div>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li>Complete 20-day hands-on browser automation curriculum</li>
                <li>Pure JavaScript code exercises and DevTools WebSocket architecture</li>
                <li>Interactive scenario assessment tables and instant rubric validation</li>
                <li>Comprehensive QA interview question bank with model answers</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => enrollInCourse('playwright-automation')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Course</span>
              </button>
              <Link
                to="/courses/playwright-automation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Full Curriculum</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
            <span className="text-indigo-600 font-bold">Day 1</span>
          </nav>

          {/* Header Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Day 1 of 20
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Estimated: {PLAYWRIGHT_DAY_1_DATA.estimatedHours}
                </span>
                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                  Level: {PLAYWRIGHT_DAY_1_DATA.level}
                </span>
                <span className="text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full">
                  Language: JavaScript (.js)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/courses/playwright-automation/day-2"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
                  title="Navigate directly to Day 2"
                >
                  <span>Day 2</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Download Real PDF Button */}
                <a
                  href="/playwright-js/day-1-automation-testing-and-playwright-fundamentals.pdf"
                  download="day-1-automation-testing-and-playwright-fundamentals.pdf"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shadow-2xs"
                >
                  <Download className="w-4 h-4 text-indigo-600" />
                  <span>Download Day 1 Notes (PDF)</span>
                </a>
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {PLAYWRIGHT_DAY_1_DATA.lessonTitle}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-4xl leading-relaxed">
                {PLAYWRIGHT_DAY_1_DATA.subtitle}
              </p>
            </div>

            {/* Learning Objectives Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
                Day 1 Learning Objectives
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                {PLAYWRIGHT_DAY_1_DATA.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Day 1 Learning Progress: {progressPercent}%
                </span>
                <span className="text-xs text-slate-600">
                  {milestonesMetCount} of 4 milestones completed
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* 4 Milestones Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    isAllTopicsRead
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <CheckCircle2
                      className={`w-4 h-4 ${isAllTopicsRead ? 'text-emerald-600' : 'text-slate-400'}`}
                    />
                    1. Five Topics
                  </div>
                  <div className="text-[11px] text-slate-500">{topicsReadCount}/5 Topics Read</div>
                </div>

                <div
                  className={`p-3 rounded-xl border text-xs ${
                    isQuizPassed
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <CheckCircle2
                      className={`w-4 h-4 ${isQuizPassed ? 'text-emerald-600' : 'text-slate-400'}`}
                    />
                    2. Checkpoint Quiz
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isQuizPassed ? `Passed (${quizScore}/10)` : 'Pending (≥ 8/10 req.)'}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border text-xs ${
                    isAssignmentSubmitted
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <CheckCircle2
                      className={`w-4 h-4 ${isAssignmentSubmitted ? 'text-emerald-600' : 'text-slate-400'}`}
                    />
                    3. Assignment
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {isAssignmentSubmitted ? 'Submitted' : 'Pending Submission'}
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
                    {isInterviewReviewed ? 'Reviewed' : 'Pending Review'}
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
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === 'topics'
                  ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Core Concepts & Walkthrough
            </button>

            <button
              onClick={() => setActiveTab('assignment')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === 'assignment'
                  ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              Practical Assignment
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === 'interview'
                  ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Interview Question Bank
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
                activeTab === 'quiz'
                  ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Daily Checkpoint Quiz
            </button>
          </div>

          {/* TAB 1: CORE CONCEPTS & WALKTHROUGH */}
          {activeTab === 'topics' && (
            <div className="space-y-6">
              {/* Topic Pills Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {PLAYWRIGHT_DAY_1_DATA.topics.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setCurrentTopicIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      currentTopicIndex === idx
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : topicsRead[idx]
                        ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
                      <span className={currentTopicIndex === idx ? 'text-indigo-100' : 'text-slate-500'}>
                        Topic {t.topicNumber}
                      </span>
                      {topicsRead[idx] && (
                        <Check className={`w-3.5 h-3.5 ${currentTopicIndex === idx ? 'text-white' : 'text-emerald-600'}`} />
                      )}
                    </div>
                    <div className="text-xs font-bold line-clamp-2">
                      {t.title.replace(`Topic ${t.topicNumber}: `, '')}
                    </div>
                  </button>
                ))}
              </div>

              {/* Topic Content Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Topic {currentTopic.topicNumber} of 5 • {currentTopic.durationMinutes} Minutes
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {currentTopic.title}
                    </h2>
                  </div>
                  {topicsRead[currentTopicIndex] && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Read
                    </span>
                  )}
                </div>

                {/* Main Topic Prose */}
                <div className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <LessonContentRenderer content={currentTopic.explanation} />
                </div>

                {/* Special View for Topic 2: Visual Workflow Diagram */}
                {currentTopicIndex === 1 && (
                  <div className="p-5 rounded-xl border border-indigo-100 bg-indigo-50/50 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-600" />
                      Visual Workflow: How Playwright Interacts with a Web App
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center text-xs">
                      <div className="p-3 rounded-lg bg-white border border-indigo-200 shadow-2xs">
                        <div className="font-bold text-slate-900">1. Test Code</div>
                        <div className="text-[11px] text-slate-500 mt-1 font-mono">login.spec.js</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-indigo-200 shadow-2xs">
                        <div className="font-bold text-indigo-700">2. Test Runner</div>
                        <div className="text-[11px] text-slate-500 mt-1">@playwright/test</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-indigo-200 shadow-2xs">
                        <div className="font-bold text-slate-900">3. Browser Engine</div>
                        <div className="text-[11px] text-slate-500 mt-1">Chromium / FF / WebKit</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-indigo-200 shadow-2xs">
                        <div className="font-bold text-indigo-700">4. Web Application</div>
                        <div className="text-[11px] text-slate-500 mt-1">localhost:5173</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white border border-indigo-200 shadow-2xs">
                        <div className="font-bold text-emerald-700">5. Report & Traces</div>
                        <div className="text-[11px] text-slate-500 mt-1">HTML report / Pass / Fail</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Special View for Topic 5: 20-Day Roadmap Timeline */}
                {currentTopicIndex === 4 && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      20-Day Playwright Automation Course Roadmap
                    </h3>
                    <div className="space-y-2">
                      {PLAYWRIGHT_DAY_1_DATA.roadmap.map((item) => (
                        <div
                          key={item.day}
                          className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                            item.isCurrent
                              ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-500/20'
                              : 'bg-white border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                item.isCurrent
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {item.day}
                            </span>
                            <div>
                              <div className="font-bold text-slate-900">{item.title}</div>
                              <div className="text-slate-500 text-[11px]">{item.focus}</div>
                            </div>
                          </div>
                          {item.isCurrent ? (
                            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-1 rounded-full uppercase tracking-wider self-start sm:self-center">
                              Active Day
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400 self-start sm:self-center">
                              Day {item.day} Roadmap
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Takeaways & Terminology */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-xs uppercase tracking-wider text-slate-700">
                      Key Takeaways
                    </div>
                    <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                      {currentTopic.keyTakeaways.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-bold text-xs uppercase tracking-wider text-slate-700">
                      Core Terminology
                    </div>
                    <div className="space-y-2 text-xs">
                      {currentTopic.terminology.map((term, i) => (
                        <div key={i}>
                          <span className="font-bold text-slate-800">{term.term}: </span>
                          <span className="text-slate-600">{term.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Topic Navigation Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    disabled={currentTopicIndex === 0}
                    onClick={() => setCurrentTopicIndex((prev) => Math.max(0, prev - 1))}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      currentTopicIndex === 0
                        ? 'opacity-40 cursor-not-allowed text-slate-400'
                        : 'text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous Topic
                  </button>

                  <button
                    onClick={() => handleMarkTopicRead(currentTopicIndex)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    {currentTopicIndex < 4 ? 'Mark as Read & Continue' : 'Mark Topic as Read'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRACTICAL ASSIGNMENT */}
          {activeTab === 'assignment' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Day 1 Practical Assignment
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Identify Automation Opportunities
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  <strong>Scenario:</strong> You are a QA engineer testing an e-commerce website. The platform includes user login, product search, cart operations, checkout payment, and order confirmation.
                </p>
              </div>

              {/* Assignment Notice */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-900">Assignment Objectives:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  <li>List e-commerce scenarios and identify which are ideal for automation vs manual/exploratory testing.</li>
                  <li>Provide a concise technical or business reason for each classification.</li>
                  <li>Specify the top 3 high-priority regression scenarios that must run before release.</li>
                  <li>Analyze the critical risk of maintaining unreliable (flaky) automated test suites.</li>
                </ul>
              </div>

              {/* Interactive Editable Table */}
              <form onSubmit={handleSubmitAssignment} className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Test Scenario Classification Table ({scenarioRows.length} Rows)
                    </label>
                    <button
                      type="button"
                      onClick={handleAddScenarioRow}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Scenario Row
                    </button>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="min-w-full text-xs text-left divide-y divide-slate-200">
                      <thead className="bg-slate-100 text-slate-900 font-bold">
                        <tr>
                          <th className="p-3 w-28">Scenario ID</th>
                          <th className="p-3 w-36">Feature</th>
                          <th className="p-3 min-w-64">Test Scenario</th>
                          <th className="p-3 w-40">Candidate Type</th>
                          <th className="p-3 w-28">Priority</th>
                          <th className="p-3 min-w-60">Reason</th>
                          <th className="p-3 w-16 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {scenarioRows.map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50/60">
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={row.scenarioId}
                                onChange={(e) => handleUpdateScenarioRow(row.id, 'scenarioId', e.target.value)}
                                className="w-full p-1.5 text-xs font-mono rounded border border-slate-200 bg-white focus:outline-indigo-500"
                              />
                            </td>
                            <td className="p-2.5">
                              <input
                                type="text"
                                placeholder="e.g. Checkout"
                                value={row.feature}
                                onChange={(e) => handleUpdateScenarioRow(row.id, 'feature', e.target.value)}
                                className="w-full p-1.5 text-xs rounded border border-slate-200 bg-white focus:outline-indigo-500"
                              />
                            </td>
                            <td className="p-2.5">
                              <textarea
                                rows={2}
                                placeholder="Describe the user action and verification..."
                                value={row.scenario}
                                onChange={(e) => handleUpdateScenarioRow(row.id, 'scenario', e.target.value)}
                                className="w-full p-1.5 text-xs rounded border border-slate-200 bg-white focus:outline-indigo-500"
                              />
                            </td>
                            <td className="p-2.5">
                              <select
                                value={row.candidateType}
                                onChange={(e) => handleUpdateScenarioRow(row.id, 'candidateType', e.target.value)}
                                className="w-full p-1.5 text-xs rounded border border-slate-200 bg-white focus:outline-indigo-500"
                              >
                                <option value="Automation">Automation Candidate</option>
                                <option value="Manual / Exploratory">Manual / Exploratory</option>
                              </select>
                            </td>
                            <td className="p-2.5">
                              <select
                                value={row.priority}
                                onChange={(e) => handleUpdateScenarioRow(row.id, 'priority', e.target.value)}
                                className="w-full p-1.5 text-xs rounded border border-slate-200 bg-white focus:outline-indigo-500"
                              >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                              </select>
                            </td>
                            <td className="p-2.5">
                              <textarea
                                rows={2}
                                placeholder="Why automate or keep manual?"
                                value={row.reason}
                                onChange={(e) => handleUpdateScenarioRow(row.id, 'reason', e.target.value)}
                                className="w-full p-1.5 text-xs rounded border border-slate-200 bg-white focus:outline-indigo-500"
                              />
                            </td>
                            <td className="p-2.5 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveScenarioRow(row.id)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                                title="Remove row"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Additional Text Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">
                      Three High-Priority Regression Scenarios (Must Automate):
                    </label>
                    <textarea
                      rows={4}
                      value={top3Priorities}
                      onChange={(e) => setTop3Priorities(e.target.value)}
                      className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-indigo-500 leading-relaxed"
                      placeholder="1. Scenario A...&#10;2. Scenario B...&#10;3. Scenario C..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">
                      Critical Risk of Maintaining Unreliable (Flaky) Tests:
                    </label>
                    <textarea
                      rows={4}
                      value={unreliableTestRisk}
                      onChange={(e) => setUnreliableTestRisk(e.target.value)}
                      className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-indigo-500 leading-relaxed"
                      placeholder="Explain how test flakiness erodes team confidence and causes real defects to slip through..."
                    />
                  </div>
                </div>

                {/* Submission Feedback */}
                {assignmentFeedback && (
                  <div
                    className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                      isAssignmentSubmitted
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-amber-50 border-amber-300 text-amber-900'
                    }`}
                  >
                    {assignmentFeedback}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    {user
                      ? `Authenticated as ${user.email}. Submissions validated locally and logged in session.`
                      : 'Note: Unauthenticated session. Progress validated in browser memory.'}
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                  >
                    {isAssignmentSubmitted ? 'Update Assignment Submission' : 'Submit Assignment'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: INTERVIEW QUESTION BANK */}
          {activeTab === 'interview' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Interview Preparation
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Playwright Fundamentals Interview Bank
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    10 Essential Conceptual Questions + 1 Scenario-Based Root Cause Investigation.
                  </p>
                </div>

                <button
                  onClick={() => setIsInterviewReviewed(true)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isInterviewReviewed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  {isInterviewReviewed ? 'Marked as Reviewed' : 'Mark Interview Prep Reviewed'}
                </button>
              </div>

              {/* Questions Accordion */}
              <div className="space-y-3">
                {PLAYWRIGHT_DAY_1_DATA.interviewQuestions.map((q, idx) => {
                  const isExpanded = expandedInterviewIndex === idx;
                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl border transition-all ${
                        isExpanded
                          ? 'border-indigo-300 bg-white shadow-xs ring-1 ring-indigo-500/10'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedInterviewIndex(isExpanded ? null : idx)}
                        className="w-full p-4 text-left flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-indigo-600">
                              Question {q.questionNumber}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                q.difficulty === 'Scenario-Based'
                                  ? 'bg-amber-100 text-amber-800'
                                  : q.difficulty === 'Intermediate'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {q.difficulty}
                            </span>
                          </div>
                          <div className="text-sm font-bold text-slate-900">{q.question}</div>
                          <div className="text-xs text-slate-500">
                            <strong>What Interviewer Assesses:</strong> {q.assessmentFocus}
                          </div>
                        </div>

                        <div className="p-1 rounded bg-slate-100 text-slate-600 shrink-0">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-3 text-xs leading-relaxed">
                          <div className="p-3.5 rounded-lg bg-indigo-50/50 border border-indigo-100 space-y-1.5">
                            <div className="font-bold text-indigo-950 uppercase tracking-wider text-[11px]">
                              Suggested Model Answer:
                            </div>
                            <p className="text-slate-700 whitespace-pre-line">{q.modelAnswer}</p>
                          </div>

                          {q.followUpQuestion && (
                            <div className="text-[11px] text-slate-600 italic bg-slate-50 p-2.5 rounded border border-slate-200">
                              <strong>Expected Follow-Up:</strong> "{q.followUpQuestion}"
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
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Daily Assessment
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Day 1 Checkpoint Quiz
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    10 Questions • 1 mark each • 80% (8/10) required to pass
                  </p>
                </div>

                {isQuizSubmitted && (
                  <div className="flex items-center gap-3">
                    <div
                      className={`px-4 py-2 rounded-xl border font-bold text-sm ${
                        isQuizPassed
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-rose-50 border-rose-300 text-rose-800'
                      }`}
                    >
                      Score: {quizScore} / 10 ({quizScore * 10}%) {isQuizPassed ? '• PASSED' : '• NEEDS RETRY'}
                    </div>

                    <button
                      onClick={handleRetryQuiz}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Retry Quiz
                    </button>
                  </div>
                )}
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {PLAYWRIGHT_DAY_1_DATA.quizQuestions.map((q) => {
                  const selected = quizAnswers[q.id];
                  const isCorrect = isQuizSubmitted && selected === q.correctAnswerIndex;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-xl border space-y-3 transition-colors ${
                        isQuizSubmitted
                          ? isCorrect
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : 'bg-rose-50/40 border-rose-200'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-bold text-sm text-slate-900">
                          {q.questionNumber}. {q.question}
                        </div>
                        {isQuizSubmitted && (
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? '+1 Mark' : '0 Marks'}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          return (
                            <button
                              key={optIdx}
                              disabled={isQuizSubmitted}
                              onClick={() => handleSelectQuizAnswer(q.id, optIdx)}
                              className={`p-3 rounded-lg text-left text-xs font-medium transition-all flex items-center gap-2.5 border ${
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
                                  isOptionSelected
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
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
                          <span className="font-bold text-slate-900">Explanation: </span>
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
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                  >
                    Submit Quiz for Scoring
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {isQuizPassed
                      ? 'Quiz milestone completed! You may now proceed with Day 1 completion.'
                      : 'You scored below 80%. Please review the explanations and retry.'}
                  </span>
                  <button
                    onClick={handleRetryQuiz}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Retry Quiz
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Sequence-Enforced Day 1 Completion Button */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Ready to Complete Day 1?
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Requires: 5 Topics Read • Assignment Submitted • Interview Bank Reviewed • Quiz Score ≥ 80%.
              </p>
            </div>

            <button
              onClick={handleMarkDay1Complete}
              className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                isDay1Complete
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              {isDay1Complete ? 'Day 1 Completed ✓' : 'Mark Day 1 Complete'}
            </button>
          </div>

          {/* Proceed to Day 2 Action Card (Accessible for Testing) */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800">
                  Next Up in Playwright Course
                </span>
                {!isDay1Complete && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    Direct Testing Access
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-indigo-950 mt-1">
                Day 2: JavaScript Essentials for Test Automation
              </h3>
              <p className="text-xs text-indigo-800 mt-0.5">
                Master statements, operators, loops, functions, objects, and async/await for Playwright.
              </p>
            </div>
            <Link
              to="/courses/playwright-automation/day-2"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <span>{isDay1Complete ? 'Proceed to Day 2' : 'Navigate to Day 2 →'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
