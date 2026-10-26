import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Clock,
  FileText,
  AlertTriangle,
  HelpCircle,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  Send,
  Plus,
  Trash2,
  BookOpen,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useManualQa } from '../../context/ManualQaContext';
import { useProgress } from '../../context/ProgressContext';
import { MANUAL_QA_DAYS } from '../../data/manualQaCurriculum';
import { QUESTION_BANK } from '../../data/manualQaQuestionBank';

interface Day1ScenarioRow {
  id: string;
  testScenario: string;
  scenarioType: 'Positive' | 'Negative' | 'Input Validation';
  purpose: string;
  priority: 'P1' | 'P2' | 'P3';
}

export const ManualQaDayLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const { dayNumber: dayParam } = useParams<{ dayNumber: string }>();
  const dayNumber = parseInt(dayParam || '1', 10);

  const { isCourseEnrolled, enrollInCourse } = useProgress();
  const isEnrolled = isCourseEnrolled('manual-qa-fundamentals');

  const {
    state,
    markContentRead,
    submitAssignment,
    submitCheckpoint,
  } = useManualQa();

  // Find day data
  const dayUnit = MANUAL_QA_DAYS.find((d) => d.dayNumber === dayNumber);
  const dayProgress = state.days[dayNumber];

  // Active section tab: 'topics' | 'assignment' | 'interview' | 'quiz'
  const [activeTab, setActiveTab] = useState<'topics' | 'assignment' | 'interview' | 'quiz'>('topics');

  // Topic navigation (0 to 4 for the 5 topics)
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number>(0);
  const [readTopics, setReadTopics] = useState<number[]>([0]);

  // Day 1: 5-column Practical Scenarios Table
  const [scenarios, setScenarios] = useState<Day1ScenarioRow[]>([
    {
      id: 'TS_LOGIN_001',
      testScenario: 'Valid registered email and correct password authentication',
      scenarioType: 'Positive',
      purpose: 'Verify successful user sign-in and redirection to dashboard within 2 seconds',
      priority: 'P1',
    },
    {
      id: 'TS_LOGIN_002',
      testScenario: 'Registered email with incorrect password',
      scenarioType: 'Negative',
      purpose: 'Verify generic security error message displayed and access denied',
      priority: 'P1',
    },
    {
      id: 'TS_LOGIN_003',
      testScenario: 'Empty email and empty password fields on submission',
      scenarioType: 'Input Validation',
      purpose: 'Verify client-side validation prompts without triggering unnecessary server request',
      priority: 'P2',
    },
  ]);

  // Day 1 BA Questions and Priority Justification
  const [baQuestion1, setBaQuestion1] = useState(
    'What is the specific account lockout policy after consecutive failed login attempts (e.g., number of attempts and lockout duration)?'
  );
  const [baQuestion2, setBaQuestion2] = useState(
    'What is the session inactivity timeout window, and does "Remember Me" persist credentials across browser restarts?'
  );
  const [priorityExplanation, setPriorityExplanation] = useState(
    '1. TS_LOGIN_001 (Valid login - P1): Primary revenue and user capability; system is unusable if registered users cannot access their accounts.\n2. TS_LOGIN_002 (Invalid password - P1): Essential authentication gatekeeper to prevent unauthorized account takeover.\n3. TS_LOGIN_003 (Empty fields - P2): High-frequency beginner interaction to ensure friendly input guidance and prevent unnecessary server traffic.'
  );

  // Assignment submission feedback state
  const [assignmentSubmitting, setAssignmentSubmitting] = useState(false);
  const [assignmentResult, setAssignmentResult] = useState<any>(null);

  // Interview Questions collapsible states
  const [openAnswers, setOpenAnswers] = useState<Record<number, boolean>>({});
  const [interviewReviewed, setInterviewReviewed] = useState(false);

  // Day 1 Checkpoint Quiz State (10 questions)
  const dayQuestions = QUESTION_BANK.filter((q) => q.dayNumber === dayNumber);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  // Day 1 Completion Status and alert
  const [completionMessage, setCompletionMessage] = useState<{
    type: 'success' | 'warning' | 'info';
    text: string;
  } | null>(null);

  // Track topic read
  const handleMarkTopicRead = async (index: number) => {
    if (!readTopics.includes(index)) {
      const updated = [...readTopics, index];
      setReadTopics(updated);
      if (updated.length >= 5) {
        await markContentRead(dayNumber);
      }
    }
    if (index < 4) {
      setCurrentTopicIndex(index + 1);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  // Toggle interview suggested answer
  const toggleAnswer = (idx: number) => {
    setOpenAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Handle Practical Assignment Submission
  const handleSubmitAssignment = async () => {
    setAssignmentSubmitting(true);
    setCompletionMessage(null);
    try {
      // Map to payload format accepted by rubric evaluator
      const payload = {
        scenarios: scenarios.map((s) => ({
          id: s.id,
          title: s.testScenario,
          scenarioType: s.scenarioType,
          type: s.scenarioType.toLowerCase().includes('pos') ? 'positive' : 'negative',
          purpose: s.purpose,
          expectedResult: s.purpose,
          priority: s.priority,
        })),
        baQuestions: [baQuestion1, baQuestion2],
        priorityExplanation,
      };

      const res = await submitAssignment(dayNumber, payload);
      setAssignmentResult(res);
    } catch (e: any) {
      alert(e?.message || 'Error submitting assignment');
    } finally {
      setAssignmentSubmitting(false);
    }
  };

  // Handle Quiz Submission
  const handleQuizSubmit = async () => {
    setQuizSubmitting(true);
    setCompletionMessage(null);
    try {
      const qIds = dayQuestions.map((q) => q.id);
      const res = await submitCheckpoint(dayNumber, qIds, quizAnswers);
      setQuizResult(res);
    } catch (e: any) {
      alert(e?.message || 'Error submitting quiz');
    } finally {
      setQuizSubmitting(false);
    }
  };

  // Handle Quiz Retry
  const handleQuizRetry = () => {
    setQuizAnswers({});
    setQuizResult(null);
    setCompletionMessage(null);
  };

  // Handle Explicit "Mark Day 1 Complete"
  const handleMarkDayComplete = async () => {
    // Condition 1: Read all five topics
    const allTopicsRead = readTopics.length >= 5 || dayProgress?.contentCompleted;
    // Condition 2: Complete quiz with >= 80%
    const quizPassed = (quizResult?.passed ?? dayProgress?.checkpointPassed) && ((quizResult?.percentage ?? dayProgress?.checkpointScore) >= 80);
    // Condition 3: Practical assignment submitted and passed
    const assignmentPassed = assignmentResult?.passed || dayProgress?.practicalCompleted;
    // Condition 4: Interview reviewed
    const interviewDone = interviewReviewed || (Object.keys(openAnswers).length >= 3);

    const pending: string[] = [];
    if (!allTopicsRead) pending.push(`Read all 5 lesson topics (${readTopics.length}/5 read)`);
    if (!quizPassed) pending.push('Score at least 80% on the 10-question Checkpoint Quiz');
    if (!assignmentPassed) pending.push('Submit and pass the Practical Login Test Scenarios assignment');
    if (!interviewDone) pending.push('Review the Interview Preparation questions');

    if (pending.length > 0) {
      setCompletionMessage({
        type: 'warning',
        text: `Cannot complete Day 1 yet. Remaining requirements: ${pending.join(' • ')}`,
      });
      return;
    }

    try {
      // Mark content read and finalize
      await markContentRead(dayNumber);
      setCompletionMessage({
        type: 'success',
        text: '🎉 Congratulations! You have fully satisfied all Day 1 requirements (Topics, 80%+ Quiz, Practical Assignment, and Interview Prep). Day 1 is marked Complete! Proceeding to Day 2...',
      });
      setTimeout(() => {
        navigate(`/manual-qa/day/${dayNumber + 1}`);
      }, 700);
    } catch (err: any) {
      setCompletionMessage({
        type: 'warning',
        text: err?.message || 'Unable to update completion state.',
      });
    }
  };

  if (!dayUnit) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Day Not Found</h2>
          <p className="text-slate-600 mb-6">The requested course day does not exist.</p>
          <Link to="/manual-qa" className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium">
            Back to Course Roadmap
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Gate all days if user has not enrolled in the course
  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center max-w-xl space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Course Enrollment Required</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Manual QA in 5 Days: Interview Preparation
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Free students can explore the course curriculum and syllabus. To access Day {dayNumber} interactive lessons, scenario design tables, Jira defect simulator, and verified certification, please enroll in this course.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2 text-slate-700">
              <div className="font-bold text-slate-900">What full course enrollment unlocks:</div>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li>Complete 5-day daily lessons (Theory, Practical Scenarios, Interview Prep, Checkpoint Quizzes)</li>
                <li>Interactive Jira defect simulator and deterministic rubric evaluations</li>
                <li>Surprise Test 1 and Final Comprehensive Certification Assessment</li>
                <li>RootAccess Official Manual QA Certificate of Completion with unique ID</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => enrollInCourse('manual-qa-fundamentals')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Course</span>
              </button>
              <Link
                to="/courses/manual-qa-fundamentals"
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

  // Check locking for other days
  const isLocked = dayProgress?.status === 'locked' && dayNumber > 1;
  if (isLocked) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 border border-amber-200">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Day {dayNumber} is Locked</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            To unlock Day {dayNumber}, you must complete the prior daily units, pass the practical workplace assignment, and score ≥ 80% on the checkpoint.
          </p>
          <Link
            to="/manual-qa/day/1"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go to Day 1
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Progress Calculation
  const topicsReadCount = Math.min(5, Math.max(readTopics.length, dayProgress?.contentCompleted ? 5 : 0));
  const isQuizPassed = (quizResult?.passed ?? dayProgress?.checkpointPassed) && ((quizResult?.percentage ?? dayProgress?.checkpointScore) >= 80);
  const isAssignmentPassed = assignmentResult?.passed || dayProgress?.practicalCompleted;
  const isInterviewDone = interviewReviewed || Object.keys(openAnswers).length >= 3;

  const totalStepsMet =
    (topicsReadCount === 5 ? 1 : 0) +
    (isQuizPassed ? 1 : 0) +
    (isAssignmentPassed ? 1 : 0) +
    (isInterviewDone ? 1 : 0);
  const progressPercent = Math.round((totalStepsMet / 4) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* 1. Existing RootAccess Navbar */}
      <Navbar />

      {/* 2. Breadcrumb: Home → Courses → Manual Testing → Day 1 */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-slate-500 gap-2">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link to="/courses/manual-testing" className="hover:text-slate-900 transition-colors">
              Courses
            </Link>
            <span className="text-slate-400">/</span>
            <Link to="/manual-qa" className="hover:text-slate-900 transition-colors">
              Manual Testing
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-semibold">Day 1</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* 3 & 4. Page Title, Introduction & Estimated Learning Time */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Day 1 of 5
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                Level: Beginner
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Estimated Time: 3 Hours
              </span>
            </div>

            {/* 9. Downloadable Learning Material */}
            <a
              href="/manual-qa/day-1-software-testing-fundamentals.pdf"
              download="day-1-software-testing-fundamentals.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              Download Day 1 Notes (PDF)
            </a>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Day 1: Software Testing Fundamentals
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed">
              Build a solid foundation in manual QA. Understand why software testing is economically critical, distinguish Quality Assurance from Quality Control, master the V-Model of verification and validation, compare SDLC and STLC phases, and develop the investigative mindset required to think like a professional software tester.
            </p>
          </div>

          {/* Section 1: Learning Objectives */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
              1. Day Learning Objectives
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
              {dayUnit.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Simple Progress Indicator showing Day 1 progress */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Day 1 Learning Progress: {progressPercent}%
              </span>
              <span className="text-xs text-slate-600">
                {totalStepsMet} of 4 milestones completed
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Milestone Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className={`p-3 rounded-xl border text-xs ${topicsReadCount === 5 ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2 className={`w-4 h-4 ${topicsReadCount === 5 ? 'text-emerald-600' : 'text-slate-400'}`} />
                  1. Five Topics
                </div>
                <div className="text-[11px] text-slate-500">{topicsReadCount}/5 Topics Read</div>
              </div>

              <div className={`p-3 rounded-xl border text-xs ${isQuizPassed ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2 className={`w-4 h-4 ${isQuizPassed ? 'text-emerald-600' : 'text-slate-400'}`} />
                  2. Checkpoint Quiz
                </div>
                <div className="text-[11px] text-slate-500">{isQuizPassed ? 'Passed (≥ 80%)' : 'Pending (≥ 80% req.)'}</div>
              </div>

              <div className={`p-3 rounded-xl border text-xs ${isAssignmentPassed ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2 className={`w-4 h-4 ${isAssignmentPassed ? 'text-emerald-600' : 'text-slate-400'}`} />
                  3. Assignment
                </div>
                <div className="text-[11px] text-slate-500">{isAssignmentPassed ? 'Submitted & Passed' : 'Pending Submission'}</div>
              </div>

              <div className={`p-3 rounded-xl border text-xs ${isInterviewDone ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2 className={`w-4 h-4 ${isInterviewDone ? 'text-emerald-600' : 'text-slate-400'}`} />
                  4. Interview Prep
                </div>
                <div className="text-[11px] text-slate-500">{isInterviewDone ? 'Reviewed' : 'Pending Review'}</div>
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

        {/* 6. Lesson Navigation Section: Primary Tabs */}
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
            <FileText className="w-4 h-4" />
            Practical Assignment
            {isAssignmentPassed && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
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
            {isInterviewDone && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-lg transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'quiz'
                ? 'border-indigo-600 text-indigo-700 bg-white shadow-xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            Daily Checkpoint Quiz
            {isQuizPassed && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
          </button>
        </div>

        {/* =========================================================================
            7. READABLE LESSON CONTENT AREA (5 TOPICS)
            ========================================================================= */}
        {activeTab === 'topics' && (
          <div className="space-y-6">
            {/* Topic Navigation Selector */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
                Select Lesson Topic:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {[
                  { title: '1. Introduction to Testing', time: '25 min' },
                  { title: '2. Essential QA Terminology', time: '30 min' },
                  { title: '3. SDLC and STLC', time: '30 min' },
                  { title: '4. Testing Levels & Types', time: '25 min' },
                  { title: '5. Think Like a Tester', time: '25 min' },
                ].map((item, idx) => {
                  const isActive = currentTopicIndex === idx;
                  const isRead = readTopics.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentTopicIndex(idx)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isActive
                          ? 'bg-indigo-50/80 border-indigo-400 text-indigo-900 shadow-xs'
                          : isRead
                          ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold text-slate-500">{item.time}</span>
                        {isRead && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <div className="text-xs font-bold line-clamp-2">{item.title}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TOPIC 1: INTRODUCTION TO SOFTWARE TESTING */}
            {currentTopicIndex === 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Topic 1 • Estimated Time: 25 minutes
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Introduction to Software Testing
                  </h2>
                </div>

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    Software testing is the systematic process of evaluating and verifying that a software application or system does what it is designed to do, satisfies business requirements, and identifies defects before releasing to end customers.
                  </p>

                  <h3 className="text-lg font-bold text-slate-900">Why is Software Testing Critical?</h3>
                  <p>
                    Software bugs in production can cause catastrophic financial losses, expose sensitive patient or banking data, and permanently damage business reputation. Economically, identifying an ambiguous requirement or bug during planning costs up to <strong>100x less</strong> than fixing an emergency outage in production.
                  </p>

                  <h3 className="text-lg font-bold text-slate-900">What Does a Manual QA Engineer Do?</h3>
                  <p>
                    A manual QA engineer does not just &quot;click buttons.&quot; A QA engineer acts as the quality gatekeeper and the user&apos;s primary advocate. Their responsibilities include:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
                    <li>Reviewing requirements and user stories to identify missing edge conditions and ambiguities.</li>
                    <li>Designing detailed test scenarios and test cases with positive, negative, and boundary test data.</li>
                    <li>Executing tests manually across diverse browsers, operating systems, and viewport sizes.</li>
                    <li>Investigating and logging reproducible bug reports with clear steps and technical evidence in Jira.</li>
                    <li>Retesting fixed bugs and executing regression tests to ensure unchanged features remain stable.</li>
                  </ul>

                  {/* Core Principle Alert */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                    <div className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Core Testing Principle: Exhaustive Testing is Impossible
                    </div>
                    <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                      Testing all combinations of inputs, preconditions, timings, and environmental states would require infinite time and money. Therefore, testing shows the <em>presence of defects, never their total absence</em>. Software cannot be proven 100% bug-free; QA prioritizes testing based on business risk and frequency of use.
                    </p>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">Real-World Examples Suitable for Beginners</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="font-bold text-xs uppercase tracking-wider text-slate-900">
                        Fintech Mobile Banking App
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        A missing rounding check in an international wire transfer module causes transfers of $10.005 to round up to $1,000, risking severe financial non-compliance and regulatory fines.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="font-bold text-xs uppercase tracking-wider text-slate-900">
                        Healthcare Patient Portal
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        An unvalidated session token allows Patient B to view Patient A&apos;s confidential blood test results by simply changing a URL patient ID query parameter in the browser.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleMarkTopicRead(0)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    Mark as Read & Continue to Topic 2
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TOPIC 2: ESSENTIAL QA TERMINOLOGY */}
            {currentTopicIndex === 1 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Topic 2 • Estimated Time: 30 minutes
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Essential QA Terminology
                  </h2>
                </div>

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
                  <p>
                    Precise communication distinguishes amateur testers from software QA professionals. Below is the essential terminology used daily in engineering scrums:
                  </p>

                  {/* QA vs QC Comparison Table */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      Comparison Table: Quality Assurance (QA) vs Quality Control (QC)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="p-3.5">Comparison Parameter</th>
                            <th className="p-3.5 text-indigo-700">Quality Assurance (QA)</th>
                            <th className="p-3.5 text-sky-700">Quality Control (QC)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                          <tr>
                            <td className="p-3.5 font-semibold text-slate-900">Core Focus</td>
                            <td className="p-3.5">Process-oriented (defects prevention)</td>
                            <td className="p-3.5">Product-oriented (defects detection)</td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="p-3.5 font-semibold text-slate-900">Approach</td>
                            <td className="p-3.5">Proactive (before code is written)</td>
                            <td className="p-3.5">Reactive (after code build is ready)</td>
                          </tr>
                          <tr>
                            <td className="p-3.5 font-semibold text-slate-900">Objective</td>
                            <td className="p-3.5">Establish quality standards, processes, and guidelines</td>
                            <td className="p-3.5">Verify that the build satisfies requirements via testing</td>
                          </tr>
                          <tr className="bg-slate-50/50">
                            <td className="p-3.5 font-semibold text-slate-900">When Performed</td>
                            <td className="p-3.5">Throughout the entire SDLC cycle</td>
                            <td className="p-3.5">During test execution and verification phases</td>
                          </tr>
                          <tr>
                            <td className="p-3.5 font-semibold text-slate-900">Example Activity</td>
                            <td className="p-3.5">Sprint story grooming, process audits, peer reviews</td>
                            <td className="p-3.5">Executing test cases in staging, logging Jira bugs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Verification vs Validation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="font-bold text-xs uppercase tracking-wider text-indigo-700">
                        Verification (&quot;Building the product right?&quot;)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Static testing of documents, wireframes, and code without running the program (e.g., reviewing acceptance criteria in user stories).
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="font-bold text-xs uppercase tracking-wider text-sky-700">
                        Validation (&quot;Building the right product?&quot;)
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Dynamic testing of executable software in a live environment to confirm it meets real customer needs and operational goals.
                      </p>
                    </div>
                  </div>

                  {/* Error vs Defect vs Failure */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Error vs Defect (Bug) vs Failure
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                        <div className="text-xs font-bold text-rose-600 uppercase">1. Error (Mistake)</div>
                        <p className="text-xs text-slate-600">
                          A human mistake made by a software engineer (e.g. typing `&gt;` instead of `&gt;=` in code).
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                        <div className="text-xs font-bold text-amber-600 uppercase">2. Defect (Bug / Fault)</div>
                        <p className="text-xs text-slate-600">
                          The flaw or incorrect logic residing in the source code or specification document.
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                        <div className="text-xs font-bold text-purple-600 uppercase">3. Failure</div>
                        <p className="text-xs text-slate-600">
                          The observable runtime event where software deviates from required behavior during execution.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Formal Login Test Case (6 Attributes) */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Formal Login Test Case Example (6 Standard Attributes)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          <tr>
                            <td className="p-3 bg-slate-50 font-bold w-1/4">1. Test Case ID</td>
                            <td className="p-3 font-mono text-indigo-700 font-semibold">TC_AUTH_01</td>
                          </tr>
                          <tr>
                            <td className="p-3 bg-slate-50 font-bold">2. Test Scenario</td>
                            <td className="p-3">Verify user can log in with valid registered credentials</td>
                          </tr>
                          <tr>
                            <td className="p-3 bg-slate-50 font-bold">3. Preconditions</td>
                            <td className="p-3">User account is registered, active, and unblocked in the database</td>
                          </tr>
                          <tr>
                            <td className="p-3 bg-slate-50 font-bold align-top">4. Test Steps</td>
                            <td className="p-3 space-y-1">
                              <div>1. Navigate to `/login` page</div>
                              <div>2. Enter valid registered email address</div>
                              <div>3. Enter correct password</div>
                              <div>4. Click the &quot;Login&quot; button</div>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 bg-slate-50 font-bold">5. Test Data</td>
                            <td className="p-3 font-mono text-slate-600">
                              Email: learner@rootaccess.org | Password: ValidPass@2026
                            </td>
                          </tr>
                          <tr>
                            <td className="p-3 bg-slate-50 font-bold">6. Expected Result</td>
                            <td className="p-3 font-semibold text-emerald-700">
                              User is successfully authenticated and redirected to `/dashboard` within 2 seconds with welcome message displayed.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleMarkTopicRead(1)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    Mark as Read & Continue to Topic 3
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TOPIC 3: SDLC AND STLC */}
            {currentTopicIndex === 2 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Topic 3 • Estimated Time: 30 minutes
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    SDLC and STLC (Software Development & Testing Life Cycles)
                  </h2>
                </div>

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
                  <p>
                    Software delivery requires structured lifecycles. SDLC governs the entire product delivery, while STLC is the dedicated testing workflow running concurrently.
                  </p>

                  {/* SDLC 6 Phases Visual Flow */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      The 6 Phases of SDLC (Software Development Life Cycle)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                      {[
                        { step: '1. Requirements', desc: 'Gather business goals and specifications' },
                        { step: '2. Design', desc: 'System architecture, database schema, UI wireframes' },
                        { step: '3. Development', desc: 'Engineers write source code satisfying specs' },
                        { step: '4. Testing', desc: 'QA executes tests to identify and track defects' },
                        { step: '5. Deployment', desc: 'Release software build to staging and production' },
                        { step: '6. Maintenance', desc: 'Ongoing patches, upgrades, and support' },
                      ].map((p, i) => (
                        <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <div className="font-bold text-indigo-700">{p.step}</div>
                          <div className="text-[11px] text-slate-500">{p.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* STLC 7 Phases Visual Flow */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      The 7 Phases of STLC (Software Testing Life Cycle)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2 text-xs">
                      {[
                        { num: 'Phase 1', title: 'Requirement Analysis', desc: 'Review user stories to identify testable criteria' },
                        { num: 'Phase 2', title: 'Test Planning', desc: 'Define strategy, scope, schedule, and test environment' },
                        { num: 'Phase 3', title: 'Test Case Design', desc: 'Author detailed test scenarios, cases, and test data' },
                        { num: 'Phase 4', title: 'Environment Setup', desc: 'Configure test servers, databases, and client apps' },
                        { num: 'Phase 5', title: 'Test Execution', desc: 'Execute test cases, log defects in Jira' },
                        { num: 'Phase 6', title: 'Defect Retest & Regression', desc: 'Verify fixes and retest unchanged features' },
                        { num: 'Phase 7', title: 'Test Closure', desc: 'Test summary report and lessons learned' },
                      ].map((s, i) => (
                        <div key={i} className="p-3 bg-indigo-50/40 border border-indigo-200 rounded-xl space-y-1">
                          <span className="text-[10px] font-bold text-indigo-600 uppercase">{s.num}</span>
                          <div className="font-bold text-slate-900 text-xs">{s.title}</div>
                          <div className="text-[11px] text-slate-600">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agile Overlap and Shift-Left Callout */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      Agile Overlap & Shift-Left Testing
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      In modern Agile teams, testing is not an isolated final step. STLC phases overlap iteratively across 2-week sprints.
                      <strong>&quot;Shift-Left&quot;</strong> means involving QA as early as possible—participating in sprint grooming and requirement reviews. Catching an ambiguity in requirements before code is written costs up to 100x less than patching an emergency outage in production.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleMarkTopicRead(2)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    Mark as Read & Continue to Topic 4
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TOPIC 4: TESTING LEVELS AND TESTING TYPES */}
            {currentTopicIndex === 3 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Topic 4 • Estimated Time: 25 minutes
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Testing Levels and Testing Types
                  </h2>
                </div>

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
                  <p>
                    A clear mental model separates <strong>Testing Levels</strong> (<em>where</em> in the architectural stack testing occurs) from <strong>Testing Types</strong> (<em>what</em> software characteristics are evaluated).
                  </p>

                  {/* Four Testing Levels */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      The Four Testing Levels (With Practical Examples)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">1. Unit Testing</span>
                          <span className="text-[11px] font-semibold text-indigo-600">Developer Level</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Tests individual methods or functions in isolation from external databases.
                        </p>
                        <div className="text-[11px] text-slate-500 font-mono bg-white p-2 rounded border border-slate-200">
                          Example: Verifying that `calculateSubtotal(100, 0.10)` returns exactly $110.00.
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">2. Integration Testing</span>
                          <span className="text-[11px] font-semibold text-indigo-600">Interface Level</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Tests communication interfaces and data exchange between combined modules.
                        </p>
                        <div className="text-[11px] text-slate-500 font-mono bg-white p-2 rounded border border-slate-200">
                          Example: Verifying that frontend login form POST request properly talks to authentication API.
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">3. System Testing</span>
                          <span className="text-[11px] font-semibold text-indigo-600">End-to-End QA Level</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Complete end-to-end evaluation of the integrated product in a production-like staging environment.
                        </p>
                        <div className="text-[11px] text-slate-500 font-mono bg-white p-2 rounded border border-slate-200">
                          Example: Tester opens web portal, logs in, adds items to cart, pays, and checks confirmation email.
                        </div>
                      </div>

                      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">4. Acceptance Testing (UAT)</span>
                          <span className="text-[11px] font-semibold text-indigo-600">Business / Client Level</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Conducted by business stakeholders or actual end-users to confirm commercial fitness.
                        </p>
                        <div className="text-[11px] text-slate-500 font-mono bg-white p-2 rounded border border-slate-200">
                          Example: Client finance director validates invoice format and GST tax reports before contract sign-off.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Functional vs Non-Functional */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      Functional vs Non-Functional Testing
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                        <div className="font-bold text-sm text-indigo-700">Functional Testing (What the system does)</div>
                        <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                          <li>Successful login with valid credentials</li>
                          <li>Handling incorrect passwords with friendly error banners</li>
                          <li>Shopping cart total calculations with sales tax and discounts</li>
                          <li>Resetting password via email verification token</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                        <div className="font-bold text-sm text-sky-700">Non-Functional Testing (How the system performs)</div>
                        <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                          <li>Performance & Load: Page renders within 2 seconds under 5,000 concurrent users</li>
                          <li>Security: Passwords masked, tokens encrypted, SQL injection blocked</li>
                          <li>Usability: Responsive layouts adapting to mobile screens</li>
                          <li>Reliability: Graceful recovery if network drops mid-transaction</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Change-Related Testing Types (Smoke, Sanity, Retesting, Regression) */}
                  <div className="p-5 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-indigo-950 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-indigo-600" />
                        Testing Triggered by Code Changes (Smoke, Sanity, Retesting, Regression)
                      </h3>
                      <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-100/70 px-2.5 py-0.5 rounded-full">
                        Full Practice in Day 3
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Whenever developers push new commits, fix defects, or modify database models, QA runs specific change-related test suites to prevent outages:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-lg bg-white border border-indigo-100/80 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">Smoke Testing (Build Verification)</span>
                          <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Fast / Broad</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Shallow, high-level test suite executed on fresh builds to verify critical workflows (e.g. login, homepage, checkout) before accepting the build for deep QA testing.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-white border border-indigo-100/80 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">Sanity Testing</span>
                          <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Quick / Narrow</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Focused verification performed after minor bug fixes or small code tweaks to confirm that the specific sub-module works as intended without running a full suite.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-white border border-indigo-100/80 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">Retesting (Defect Verification)</span>
                          <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Specific Fix</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Executing the exact failed test cases to verify that a reported bug has been properly fixed and no longer reproduces in the new build.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-white border border-indigo-100/80 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">Regression Testing</span>
                          <span className="text-[10px] uppercase font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Side-Effects Guard</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Testing untouched, existing features across the application to ensure that bug fixes, configuration tweaks, or new features did <em>not</em> break existing functionality.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-white/80 border border-indigo-100 text-xs text-slate-700 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Real-World Example:</strong> A developer fixes a bug where discount coupon <code className="bg-slate-100 px-1 rounded">SAVE20</code> was not deducting 20%. QA first runs <strong>Retesting</strong> (entering <code className="bg-slate-100 px-1 rounded">SAVE20</code> to verify the discount). Then, QA runs <strong>Regression Testing</strong> on credit card payments, PayPal, and gift cards to guarantee the coupon fix didn't accidentally break regular checkout!
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleMarkTopicRead(3)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    Mark as Read & Continue to Topic 5
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TOPIC 5: THINK LIKE A TESTER */}
            {currentTopicIndex === 4 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Topic 5 • Estimated Time: 25 minutes
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Think Like a Tester (Scenario Discovery for Login)
                  </h2>
                </div>

                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
                  <p>
                    Thinking like a tester means approaching software with curiosity, skepticism, and methodical coverage. A QA engineer balances <strong>positive testing</strong> (confirming valid user journeys) with <strong>negative testing</strong> (verifying graceful error handling and security boundaries).
                  </p>

                  {/* 10 Login Scenarios Checklist */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      10 Practical Login Scenarios Every QA Must Consider
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {[
                        { num: '1', title: 'Valid Login', type: 'Positive', desc: 'Valid registered email + correct password redirects to dashboard within 2 seconds.' },
                        { num: '2', title: 'Incorrect Password', type: 'Negative', desc: 'Registered email + wrong password displays generic security error message.' },
                        { num: '3', title: 'Unknown Email', type: 'Negative', desc: 'Unregistered email displays generic error without revealing whether email exists.' },
                        { num: '4', title: 'Empty Fields', type: 'Validation', desc: 'Submitting with empty email, empty password, or both shows inline validation.' },
                        { num: '5', title: 'Invalid Email Format', type: 'Validation', desc: 'Inputs like user@, user.com, or spaces trigger formatting warning.' },
                        { num: '6', title: 'Password Masking', type: 'Security', desc: 'Characters masked as dots/asterisks by default with show/hide toggle.' },
                        { num: '7', title: 'Rate Limiting / Lockout', type: 'Security', desc: '3-5 consecutive failed attempts temporarily locks account for 15 minutes.' },
                        { num: '8', title: 'Network Drop Interruption', type: 'Reliability', desc: 'Submitting while offline displays friendly retry banner without freezing UI.' },
                        { num: '9', title: 'Appropriate Error Messages', type: 'Security', desc: 'Never leak database stack traces or specify which field was wrong.' },
                        { num: '10', title: 'Session Logout Behavior', type: 'Security', desc: 'Logging out invalidates auth token so browser back button cannot re-enter.' },
                      ].map((item) => (
                        <div key={item.num} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{item.num}. {item.title}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">{item.type}</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 text-indigo-900 space-y-1 text-xs sm:text-sm">
                    <div className="font-bold uppercase tracking-wider text-xs text-indigo-700">
                      Tester Mindset Rule
                    </div>
                    <p className="text-indigo-800">
                      Requirements determine expected behavior. Not every application enforces rate limiting or password masking identically. Always check the Product Requirements Document (PRD) and clarify ambiguous rules with the Business Analyst!
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Completed 5 of 5 Topics
                  </span>
                  <button
                    onClick={() => {
                      handleMarkTopicRead(4);
                      setActiveTab('assignment');
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    Proceed to Practical Assignment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            8. PRACTICAL ASSIGNMENT SECTION
            ========================================================================= */}
        {activeTab === 'assignment' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Workplace Practical Deliverable
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                Day 1 Assignment: Test Scenario Discovery for Login System
              </h2>
              <div className="p-3.5 mt-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                <div className="font-bold text-slate-900">Assignment Requirement Brief:</div>
                <p className="italic text-slate-600">
                  &quot;A web application has email and password fields and a Login button. Registered users should be able to sign in.&quot;
                </p>
                <div className="text-slate-500 text-xs pt-1">
                  Deliverable: Document at least 10 distinct test scenarios with designated positive/negative/input-validation classification, explain the purpose of each, ask 2 clarification questions for the BA, and prioritize your top 3.
                </div>
              </div>
            </div>

            {/* Editable 5-Column Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Test Scenarios Workbench (Current Count: {scenarios.length} • Target: ≥ 10)
                </h3>
                <button
                  onClick={() =>
                    setScenarios([
                      ...scenarios,
                      {
                        id: `TS_LOGIN_${String(scenarios.length + 1).padStart(3, '0')}`,
                        testScenario: '',
                        scenarioType: 'Negative',
                        purpose: '',
                        priority: 'P2',
                      },
                    ])
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  Add Scenario Row
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-3 w-28">Scenario ID</th>
                      <th className="p-3">Test Scenario</th>
                      <th className="p-3 w-36">Scenario Type</th>
                      <th className="p-3">Purpose / Expected Outcome</th>
                      <th className="p-3 w-24">Priority</th>
                      <th className="p-3 w-12 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scenarios.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={row.id}
                            onChange={(e) => {
                              const next = [...scenarios];
                              next[idx].id = e.target.value;
                              setScenarios(next);
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono text-[11px] font-semibold text-slate-800 focus:outline-none focus:border-indigo-500"
                          />
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={row.testScenario}
                            onChange={(e) => {
                              const next = [...scenarios];
                              next[idx].testScenario = e.target.value;
                              setScenarios(next);
                            }}
                            placeholder="e.g. Verify login with valid registered email and correct password"
                            className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-800 focus:outline-none focus:border-indigo-500"
                          />
                        </td>
                        <td className="p-2.5">
                          <select
                            value={row.scenarioType}
                            onChange={(e) => {
                              const next = [...scenarios];
                              next[idx].scenarioType = e.target.value as any;
                              setScenarios(next);
                            }}
                            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-800 focus:outline-none focus:border-indigo-500 font-medium"
                          >
                            <option value="Positive">Positive</option>
                            <option value="Negative">Negative</option>
                            <option value="Input Validation">Input Validation</option>
                          </select>
                        </td>
                        <td className="p-2.5">
                          <input
                            type="text"
                            value={row.purpose}
                            onChange={(e) => {
                              const next = [...scenarios];
                              next[idx].purpose = e.target.value;
                              setScenarios(next);
                            }}
                            placeholder="e.g. Verify user is redirected to dashboard within 2s"
                            className="w-full bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-800 focus:outline-none focus:border-indigo-500"
                          />
                        </td>
                        <td className="p-2.5">
                          <select
                            value={row.priority}
                            onChange={(e) => {
                              const next = [...scenarios];
                              next[idx].priority = e.target.value as any;
                              setScenarios(next);
                            }}
                            className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-slate-800 focus:outline-none font-bold text-center"
                          >
                            <option value="P1">P1</option>
                            <option value="P2">P2</option>
                            <option value="P3">P3</option>
                          </select>
                        </td>
                        <td className="p-2.5 text-center">
                          {scenarios.length > 3 ? (
                            <button
                              onClick={() => setScenarios(scenarios.filter((_, i) => i !== idx))}
                              className="text-rose-600 hover:text-rose-800 transition-colors"
                              title="Delete Row"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-slate-300 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BA Clarification Questions */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-slate-900">
                Two Clarification Questions for Business Analyst (BA)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Clarification Question #1:</label>
                  <textarea
                    rows={2}
                    value={baQuestion1}
                    onChange={(e) => setBaQuestion1(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Clarification Question #2:</label>
                  <textarea
                    rows={2}
                    value={baQuestion2}
                    onChange={(e) => setBaQuestion2(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Top 3 Priority Scenarios Justification */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-slate-900">
                Top 3 Highest-Priority Scenarios & Justification
              </h3>
              <textarea
                rows={3}
                value={priorityExplanation}
                onChange={(e) => setPriorityExplanation(e.target.value)}
                placeholder="Explain why your 3 selected P1 scenarios come first..."
                className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            {/* Submission Feedback Result Banner */}
            {assignmentResult && (
              <div
                className={`p-4 rounded-xl border ${
                  assignmentResult.passed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold flex items-center gap-2">
                    {assignmentResult.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    )}
                    <span>
                      {assignmentResult.passed ? 'Assignment Passed!' : 'Revision Needed'}
                    </span>
                  </div>
                  <span className="text-xs font-semibold">
                    Score: {assignmentResult.score}%
                  </span>
                </div>
                <p className="text-xs leading-relaxed">{assignmentResult.feedback}</p>
                {assignmentResult.criteriaResults && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-200/60 text-xs">
                    {assignmentResult.criteriaResults.map((c: any) => (
                      <div key={c.criterionId} className="flex items-start gap-1.5">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${c.passed ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <div>
                          <div className="font-semibold">{c.title}</div>
                          <div className="text-[11px] text-slate-600">{c.feedback}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Validated against standard QA scenario rubrics.
              </span>
              <button
                onClick={handleSubmitAssignment}
                disabled={assignmentSubmitting}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-xs"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                {assignmentSubmitting ? 'Evaluating Submission...' : 'Submit Assignment'}
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            9. INTERVIEW PREPARATION SECTION
            ========================================================================= */}
        {activeTab === 'interview' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Industry Interview Readiness
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  10 Core Interview Questions & Payment Scenario Investigation
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Study model answers, follow-up probes from hiring managers, and common traps to avoid. Answers are hidden by default to test your recall.
                </p>
              </div>

              <button
                onClick={() => setInterviewReviewed(true)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  interviewReviewed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {interviewReviewed ? 'Marked as Reviewed ✓' : 'Mark Interview Prep Reviewed'}
              </button>
            </div>

            <div className="space-y-4">
              {dayUnit.interviewQuestions.map((q, idx) => {
                const isOpen = !!openAnswers[idx];
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                    <div className="p-4 flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {q.type}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {q.question}
                        </h4>
                      </div>

                      {/* Explicit "View suggested answer" Control */}
                      <button
                        onClick={() => toggleAnswer(idx)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-colors"
                      >
                        {isOpen ? 'Hide suggested answer' : 'View suggested answer'}
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50/60 space-y-3 text-xs leading-relaxed">
                        <div className="space-y-1">
                          <div className="font-bold text-emerald-700 uppercase tracking-wider text-[11px]">
                            Model Suggested Answer:
                          </div>
                          <p className="text-slate-800 whitespace-pre-line bg-white p-3 rounded-lg border border-slate-200">
                            {q.modelAnswer}
                          </p>
                        </div>

                        {q.followUp && (
                          <div className="p-3 rounded-lg bg-sky-50 border border-sky-200 text-sky-900 space-y-1">
                            <div className="font-bold uppercase tracking-wider text-[10px]">
                              Interviewer Follow-Up Question:
                            </div>
                            <p className="text-sky-800">{q.followUp}</p>
                          </div>
                        )}

                        {q.commonMistakes && q.commonMistakes.length > 0 && (
                          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                            <div className="font-bold uppercase tracking-wider text-[10px]">
                              Common Beginner Traps to Avoid:
                            </div>
                            <ul className="list-disc list-inside space-y-0.5 text-rose-800">
                              {q.commonMistakes.map((m, mIdx) => (
                                <li key={mIdx}>{m}</li>
                              ))}
                            </ul>
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

        {/* =========================================================================
            10. DAY 1 CHECKPOINT QUIZ (10 QUESTIONS, 80% THRESHOLD)
            ========================================================================= */}
        {activeTab === 'quiz' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Knowledge Evaluation Checkpoint
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Day 1 Checkpoint Quiz (10 Questions)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  10 multiple-choice questions covering all five topics. 1 mark per question. 80% passing threshold (8 out of 10) required.
                </p>
              </div>

              {quizResult && (
                <button
                  onClick={handleQuizRetry}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                  Retry Quiz
                </button>
              )}
            </div>

            {/* Quiz Questions List */}
            <div className="space-y-6">
              {dayQuestions.map((q, qIndex) => {
                const currentAnswer = quizAnswers[q.id];
                const feedbackItem = quizResult?.feedbackDetails?.find(
                  (f: any) => f.questionId === q.id
                );

                return (
                  <div key={q.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                          {qIndex + 1}
                        </span>
                        <span className="text-xs font-semibold text-indigo-600 uppercase">
                          [{q.topic}]
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-500">1 Mark</span>
                    </div>

                    <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                      {q.questionText}
                    </h4>

                    {/* 4 Options Radio Selector */}
                    {q.options && (
                      <div className="space-y-2 pt-1">
                        {q.options.map((option, optIdx) => {
                          const isSelected = currentAnswer === optIdx;
                          return (
                            <label
                              key={optIdx}
                              onClick={() => {
                                if (!quizResult) {
                                  setQuizAnswers({
                                    ...quizAnswers,
                                    [q.id]: optIdx,
                                  });
                                }
                              }}
                              className={`w-full p-3 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-50/80 border-indigo-400 text-indigo-900 font-medium'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              } ${quizResult ? 'cursor-default' : ''}`}
                            >
                              <span className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                                {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                              </span>
                              <span className="leading-relaxed">{option}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {/* Explanations shown only AFTER submission */}
                    {feedbackItem && (
                      <div
                        className={`p-3.5 rounded-lg border text-xs space-y-1.5 mt-2 ${
                          feedbackItem.isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-rose-50 border-rose-300 text-rose-900'
                        }`}
                      >
                        <div className="font-bold flex items-center gap-1.5">
                          {feedbackItem.isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Correct (+1 Mark)
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4 h-4 text-rose-600" />
                              Incorrect (0 Marks)
                            </>
                          )}
                        </div>
                        <div className="text-slate-800">
                          <strong>Technical Explanation:</strong> {feedbackItem.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Result Banner */}
            {quizResult && (
              <div
                className={`p-5 rounded-xl border ${
                  quizResult.passed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-base">
                    {quizResult.passed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-rose-600" />
                    )}
                    <span>
                      Result: {quizResult.score} / 10 ({quizResult.percentage}%) — {quizResult.passed ? 'PASSED (≥ 80%)' : 'RETRY REQUIRED'}
                    </span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed">
                  {quizResult.passed
                    ? 'Congratulations! You have satisfied the Day 1 quiz requirement.'
                    : 'You scored below 80%. Review the technical explanations above and click Retry Quiz to attempt again.'}
                </p>
              </div>
            )}

            {/* Submit Quiz Action Button */}
            {!quizResult && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {Object.keys(quizAnswers).length} of 10 questions answered
                </span>
                <button
                  onClick={handleQuizSubmit}
                  disabled={quizSubmitting || Object.keys(quizAnswers).length < 10}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4 text-emerald-400" />
                  {quizSubmitting ? 'Grading Quiz...' : 'Submit Day 1 Quiz'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            DAY 1 COMPLETION ACTION SECTION
            ========================================================================= */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Final Day 1 Verification
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Confirm all 4 milestones (5 topics read, 80%+ on quiz, assignment submitted, interview questions reviewed) to finalize Day 1.
              </p>
            </div>

            {dayProgress?.contentCompleted ? (
              <button
                onClick={() => navigate(`/manual-qa/day/${dayNumber + 1}`)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Proceed to Day 2</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleMarkDayComplete}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                Mark Day 1 Complete &amp; Proceed
              </button>
            )}
          </div>

          {/* Next Day Progression Banner */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Next: Day 2
                </span>
                <span className="text-xs text-slate-500">Test Design Techniques: EP &amp; BVA</span>
              </div>
              <p className="text-xs text-slate-600">
                {!isEnrolled
                  ? 'Day 1 is free for all students. Enroll in the full course to unlock Day 2, Jira bug logging, and certification.'
                  : 'Great job! Continue to Day 2 to master Boundary Value Analysis and Equivalence Partitioning.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {!isEnrolled ? (
                <button
                  onClick={() => enrollInCourse('manual-qa-fundamentals')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enroll to Unlock Day 2</span>
                </button>
              ) : (
                <Link
                  to="/manual-qa/day/2"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <span>Continue to Day 2</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              <Link
                to="/courses/manual-qa-fundamentals"
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Curriculum</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* 11. Simple RootAccess Footer */}
      <Footer />
    </div>
  );
};
