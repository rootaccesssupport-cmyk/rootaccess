import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  FileCheck2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Award,
  Sliders,
  Activity,
  FileSearch,
  Wrench,
  CheckCircle,
  ShieldAlert,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { LessonContentRenderer } from '../../components/common/LessonContentRenderer';
import { useDevOps } from '../../context/DevOpsContext';
import { useProgress } from '../../context/ProgressContext';
import { CourseEnrollmentGate } from '../../components/common/CourseEnrollmentGate';
import { DEVOPS_DAY_3_DATA } from '../../data/devopsDay3Data';
import { DEVOPS_DAY_3_MISSION } from '../../data/devopsScenarioMissions';
import { InteractiveScenarioMissionStudio } from '../../components/devops/InteractiveScenarioMissionStudio';
import {
  SIMULATED_PROCESSES,
  SIMULATED_INCIDENT_LOGS,
} from '../../data/devopsDay3Activities';

export const DevOpsDay3LessonPage: React.FC = () => {
  const {
    state: devopsState,
    enrollInCourse: enrollDevOps,
    getDayProgress,
    markTopicRead,
    markActivityCompleted,
    submitCheckpoint,
    submitAssignment,
    markInterviewReviewed,
    submitQuiz,
  } = useDevOps();
  const { isCourseEnrolled, enrollInCourse } = useProgress();

  const isEnrolled = isCourseEnrolled('devops-engineering') || devopsState.enrolled;

  const handleEnroll = () => {
    enrollDevOps();
    enrollInCourse('devops-engineering');
  };

  const progress = getDayProgress(3);

  // Tab navigation: 'topics' | 'activities' | 'checkpoints' | 'assignment' | 'interview' | 'quiz'
  const [activeTab, setActiveTab] = useState<'topics' | 'activities' | 'checkpoints' | 'assignment' | 'interview' | 'quiz'>('topics');
  const [currentTopicIdx, setCurrentTopicIdx] = useState(0);

  // Activity sub-tabs: 'permission-builder' | 'process-investigation' | 'log-detective' | 'incident-diagnosis'
  const [activeActivityTab, setActiveActivityTab] = useState<'permission-builder' | 'process-investigation' | 'log-detective' | 'incident-diagnosis'>('permission-builder');

  // Activity A: Permission Builder State
  // Owner (u), Group (g), Others (o)
  const [permOwner, setPermOwner] = useState<{ r: boolean; w: boolean; x: boolean }>({ r: true, w: true, x: true }); // 7
  const [permGroup, setPermGroup] = useState<{ r: boolean; w: boolean; x: boolean }>({ r: true, w: false, x: true }); // 5
  const [permOther, setPermOther] = useState<{ r: boolean; w: boolean; x: boolean }>({ r: true, w: false, x: false }); // 4

  // Activity B: Process Investigation State
  const [selectedPid, setSelectedPid] = useState<number | null>(null);
  const [investigationAction, setInvestigationAction] = useState<string>('');
  const [investigationFeedback, setInvestigationFeedback] = useState<string | null>(null);

  // Activity C: Log Detective State
  const [logFilterLevel, setLogFilterLevel] = useState<'ALL' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'>('ALL');
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [logDetectiveVerdict, setLogDetectiveVerdict] = useState<string | null>(null);

  // Activity D: Incident Diagnosis Workflow State
  // Steps: 'inspect_files' -> 'inspect_logs' -> 'formulate_hypothesis' -> 'apply_fix' -> 'verified'
  const [incidentStep, setIncidentStep] = useState<'inspect_files' | 'inspect_logs' | 'formulate_hypothesis' | 'apply_fix' | 'verified'>('inspect_files');
  const [incidentFeedback, setIncidentFeedback] = useState<string | null>(null);

  // Checkpoints State
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<string, number>>({});
  const [checkpointFeedback, setCheckpointFeedback] = useState<Record<string, { isCorrect: boolean; show: boolean }>>({});

  // Interview Questions Toggle
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState<number | null>(null);

  // Quiz State (One question at a time)
  const [quizActiveIndex, setQuizActiveIndex] = useState(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<any>(null);

  // Calculate Octal and Symbolic mode from Permission Builder
  const calcOctalDigit = (p: { r: boolean; w: boolean; x: boolean }) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
  const calcSymbolicTriplet = (p: { r: boolean; w: boolean; x: boolean }) => `${p.r ? 'r' : '-'}${p.w ? 'w' : '-'}${p.x ? 'x' : '-'}`;

  const octalMode = `${calcOctalDigit(permOwner)}${calcOctalDigit(permGroup)}${calcOctalDigit(permOther)}`;
  const symbolicMode = `-${calcSymbolicTriplet(permOwner)}${calcSymbolicTriplet(permGroup)}${calcSymbolicTriplet(permOther)}`;

  const isUnsafe777 = octalMode === '777';
  const isWritableByOthers = permOther.w;

  // Process investigation handler
  const handleEvaluateProcessAction = () => {
    if (selectedPid === 1840) {
      if (investigationAction === 'sigterm') {
        setInvestigationFeedback('Correct! PID 1840 is consuming 98.4% CPU in an infinite loop. Sending SIGTERM (kill -15) requests graceful shutdown, freeing CPU cycles without kernel crashes.');
        markActivityCompleted(3, 'process-investigation');
      } else if (investigationAction === 'sigkill') {
        setInvestigationFeedback('Effective, but abrupt! SIGKILL (kill -9) halted the runaway process immediately. Remember: best practice is always to attempt graceful SIGTERM first.');
        markActivityCompleted(3, 'process-investigation');
      } else {
        setInvestigationFeedback('Caution: Restarting the whole server or terminating Nginx will cause a complete outage for other innocent services.');
      }
    } else {
      setInvestigationFeedback('PID ' + selectedPid + ' is a standard system daemon behaving normally (low CPU/RAM). Terminating it might disrupt server networking or logging.');
    }
  };

  // Incident diagnosis handler
  const handleTestHypothesis = (hypo: string) => {
    if (hypo === 'permission_eacces') {
      setIncidentStep('apply_fix');
      setIncidentFeedback('Hypothesis Validated! The logs explicitly state EACCES on /etc/ecommerce/config.json because nodeapp user only had --- (no read permissions).');
    } else {
      setIncidentFeedback('Hypothesis Disproven: Memory and disk limits are well within thresholds, and Nginx is actively listening. Re-inspect the application logs.');
    }
  };

  const handleApplyIncidentFix = (cmd: string) => {
    if (cmd === 'chmod 644') {
      setIncidentStep('verified');
      setIncidentFeedback('SUCCESS: Running "sudo chmod 644 /etc/ecommerce/config.json" granted the nodeapp user read access while keeping write access restricted to owner. Service started cleanly (HTTP 200 OK)!');
      markActivityCompleted(3, 'incident-diagnosed');
    } else if (cmd === 'chmod 777') {
      setIncidentFeedback('WARNING: While chmod 777 allowed the service to read the file, it violated the Principle of Least Privilege and exposed database credentials to all local users. Production audit rejected.');
    }
  };

  const handleSelectCheckpointOption = (cpId: string, optIdx: number, correctIdx: number, idx: number) => {
    setCheckpointAnswers((prev) => ({ ...prev, [cpId]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    setCheckpointFeedback((prev) => ({
      ...prev,
      [cpId]: { isCorrect, show: true },
    }));
    submitCheckpoint(3, idx, isCorrect);
  };


  const handleSelectQuizAnswer = (questionId: string, optionIdx: number) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleNextQuizQuestion = () => {
    if (quizActiveIndex < DEVOPS_DAY_3_DATA.quizQuestions.length - 1) {
      setQuizActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuizQuestion = () => {
    if (quizActiveIndex > 0) {
      setQuizActiveIndex((prev) => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    const res = submitQuiz(3, selectedQuizAnswers);
    setQuizResult(res);
  };

  const handleRetryQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizResult(null);
    setQuizActiveIndex(0);
  };

  const currentTopic = DEVOPS_DAY_3_DATA.topics[currentTopicIdx];
  const filteredLogs = SIMULATED_INCIDENT_LOGS.filter((l) => (logFilterLevel === 'ALL' ? true : l.level === logFilterLevel));

  if (!isEnrolled) {
    return (
      <CourseEnrollmentGate
        courseTitle="DevOps Engineering Academy"
        courseSlug="devops-engineering"
        description="Course enrollment is required to access interactive lessons, simulated Linux terminals, scenario missions, and interview prep. Enrollment is 100% free during early access—click below to enroll instantly."
        bulletPoints={[
          "36-Day structured DevOps roadmap with Days 1–3 interactive modules live",
          "Simulated Linux Terminal Sandbox with Ubuntu 24.04 FHS navigation",
          "Production CI/CD Release Room and Incident Diagnostic Studios",
          "Real-world DevOps interview preparation and senior-engineer model answers",
        ]}
        onEnroll={handleEnroll}
        backLink="/courses/devops-engineering"
        backLinkText="View DevOps Roadmap"
        accentColor="indigo"
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* DAY HEADER */}
        <div className="bg-slate-900 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-4">
              <Link to="/courses/devops-engineering" className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>DevOps Academy Overview</span>
              </Link>
              <span>/</span>
              <span className="text-indigo-400">Day 3</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-xs font-semibold text-amber-300 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Module 1 • Systems Security & Operations</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {DEVOPS_DAY_3_DATA.lessonTitle}
                </h1>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl">{DEVOPS_DAY_3_DATA.subtitle}</p>
              </div>

              {/* PDF Study Guide Download Button */}
              <div className="flex items-center gap-3">
                <a
                  href="/devops/day-3-linux-permissions-processes-logs.pdf"
                  download="RootAccess_DevOps_Day3_Study_Guide.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-all shadow-xs"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Study Guide (PDF)</span>
                </a>
              </div>
            </div>

            {/* TAB NAVIGATION BAR */}
            <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none text-xs font-semibold">
              <button
                onClick={() => setActiveTab('topics')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'topics'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>1. Core Concepts ({progress.topicsRead.filter(Boolean).length}/8)</span>
              </button>

              <button
                onClick={() => setActiveTab('activities')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'activities'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>2. Diagnostic & Permission Labs (4)</span>
              </button>

              <button
                onClick={() => setActiveTab('checkpoints')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'checkpoints'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>3. Checkpoints ({progress.checkpointsPassed.filter(Boolean).length}/5)</span>
              </button>

              <button
                onClick={() => setActiveTab('assignment')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'assignment'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                <span>4. Incident Diagnosis Task {progress.assignmentSubmitted && '✓'}</span>
              </button>

              <button
                onClick={() => setActiveTab('interview')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'interview'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>5. Interview Vault (5)</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'quiz'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>6. Day Quiz {progress.quizPassed ? '(Passed 80%+)' : `(${progress.quizScore}/10)`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: TOPICS & LESSONS */}
        {activeTab === 'topics' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left Topic Sidebar */}
              <div className="lg:col-span-1 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Day 3 Modules</h3>
                {DEVOPS_DAY_3_DATA.topics.map((t, idx) => {
                  const isRead = progress.topicsRead[idx];
                  const isCurrent = currentTopicIdx === idx;

                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setCurrentTopicIdx(idx);
                        markTopicRead(3, idx);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-50 border border-amber-200 text-amber-900 shadow-xs'
                          : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          isRead
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isRead ? '✓' : idx + 1}
                      </div>
                      <div>
                        <div className="font-bold leading-tight">{t.title}</div>
                        <div className="text-[11px] text-slate-400 mt-1">{t.durationMinutes} mins</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Main Topic Reader */}
              <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                      Topic {currentTopic.topicNumber} of 8
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">{currentTopic.title}</h2>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{currentTopic.durationMinutes} minutes</span>
                  </div>
                </div>

                {/* Explanation Body */}
                <div className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  <LessonContentRenderer content={currentTopic.explanation} />
                </div>

                {/* Key Takeaways Box */}
                {currentTopic.keyTakeaways && currentTopic.keyTakeaways.length > 0 && (
                  <div className="mt-8 bg-amber-50/70 border border-amber-100 rounded-xl p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Key Takeaways</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-amber-950">
                      {currentTopic.keyTakeaways.map((takeaway, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Next Topic Navigation Button */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <button
                    disabled={currentTopicIdx === 0}
                    onClick={() => {
                      if (currentTopicIdx > 0) {
                        setCurrentTopicIdx(currentTopicIdx - 1);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Topic</span>
                  </button>

                  <button
                    onClick={() => {
                      markTopicRead(3, currentTopicIdx);
                      if (currentTopicIdx < DEVOPS_DAY_3_DATA.topics.length - 1) {
                        setCurrentTopicIdx(currentTopicIdx + 1);
                      } else {
                        setActiveTab('activities');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>{currentTopicIdx === 7 ? 'Proceed to Diagnostic Labs' : 'Mark Read & Next Topic'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE ACTIVITIES */}
        {activeTab === 'activities' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {/* Sub-Tabs */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveActivityTab('permission-builder')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeActivityTab === 'permission-builder'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Lab A: Interactive Permission Builder
              </button>
              <button
                onClick={() => setActiveActivityTab('process-investigation')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeActivityTab === 'process-investigation'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Lab B: Process & Resource Investigation
              </button>
              <button
                onClick={() => setActiveActivityTab('log-detective')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeActivityTab === 'log-detective'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Lab C: Log Detective & Root Cause
              </button>
              <button
                onClick={() => setActiveActivityTab('incident-diagnosis')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeActivityTab === 'incident-diagnosis'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Lab D: Live Incident Remediation
              </button>
            </div>

            {/* ACTIVITY A: PERMISSION BUILDER */}
            {activeActivityTab === 'permission-builder' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Visual Bitmask Calculator</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Linux Permission Builder & Octal Calculator
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Toggle read, write, and execute permissions across Owner, Group, and Others. Observe how symbolic notation and octal numeric modes update in real time.
                  </p>
                </div>

                {/* Display Output Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Octal Numeric Mode</span>
                    <div className="text-4xl font-extrabold text-emerald-400 font-mono my-2">{octalMode}</div>
                    <span className="text-xs font-mono text-slate-400">chmod {octalMode} filename</span>
                  </div>

                  <div className="bg-slate-950 text-white p-5 rounded-2xl border border-slate-800 text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Symbolic String (ls -l)</span>
                    <div className="text-4xl font-extrabold text-indigo-400 font-mono my-2">{symbolicMode}</div>
                    <span className="text-xs font-mono text-slate-400">Owner | Group | Other</span>
                  </div>
                </div>

                {/* Security Warning Banner if 777 or world-writable */}
                {isUnsafe777 ? (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">CRITICAL SECURITY RISK: chmod 777 Active</div>
                      <p className="mt-0.5 leading-relaxed opacity-90">
                        This grants every user and compromised web process unrestricted write and execute permissions. An attacker can overwrite binaries or inject webshells.
                      </p>
                    </div>
                  </div>
                ) : isWritableByOthers ? (
                  <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold">Caution: World-Writable Permission</div>
                      <p className="mt-0.5 leading-relaxed opacity-90">
                        "Others" have write permission (w). Any local system account can modify or delete this file.
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* Interactive Checkbox Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Owner */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Owner (User)</h4>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-200">
                        {calcOctalDigit(permOwner)}
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permOwner.r}
                          onChange={(e) => setPermOwner((prev) => ({ ...prev, r: e.target.checked }))}
                          className="rounded text-indigo-600"
                        />
                        <span>Read (r = 4)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permOwner.w}
                          onChange={(e) => setPermOwner((prev) => ({ ...prev, w: e.target.checked }))}
                          className="rounded text-indigo-600"
                        />
                        <span>Write (w = 2)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permOwner.x}
                          onChange={(e) => setPermOwner((prev) => ({ ...prev, x: e.target.checked }))}
                          className="rounded text-indigo-600"
                        />
                        <span>Execute (x = 1)</span>
                      </label>
                    </div>
                  </div>

                  {/* Group */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Group</h4>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-200">
                        {calcOctalDigit(permGroup)}
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permGroup.r}
                          onChange={(e) => setPermGroup((prev) => ({ ...prev, r: e.target.checked }))}
                          className="rounded text-indigo-600"
                        />
                        <span>Read (r = 4)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permGroup.w}
                          onChange={(e) => setPermGroup((prev) => ({ ...prev, w: e.target.checked }))}
                          className="rounded text-indigo-600"
                        />
                        <span>Write (w = 2)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permGroup.x}
                          onChange={(e) => setPermGroup((prev) => ({ ...prev, x: e.target.checked }))}
                          className="rounded text-indigo-600"
                        />
                        <span>Execute (x = 1)</span>
                      </label>
                    </div>
                  </div>

                  {/* Others */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Others (World)</h4>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-200">
                        {calcOctalDigit(permOther)}
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permOther.r}
                          onChange={(e) => setPermOther((prev) => ({ ...prev, r: e.target.checked }))}
                          className="rounded text-indigo-600"
                        />
                        <span>Read (r = 4)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permOther.w}
                          onChange={(e) => setPermOther((prev) => ({ ...prev, w: e.target.checked }))}
                          className="rounded text-indigo-600"
                        />
                        <span>Write (w = 2)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={permOther.x}
                          onChange={(e) => setPermOther((prev) => ({ ...prev, x: e.target.checked }))}
                          className="rounded text-indigo-600"
                        />
                        <span>Execute (x = 1)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Preset Templates */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-700">Standard Templates:</span>
                  <button
                    onClick={() => {
                      setPermOwner({ r: true, w: true, x: false });
                      setPermGroup({ r: true, w: false, x: false });
                      setPermOther({ r: true, w: false, x: false });
                    }}
                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono cursor-pointer"
                  >
                    644 (Standard File)
                  </button>
                  <button
                    onClick={() => {
                      setPermOwner({ r: true, w: true, x: true });
                      setPermGroup({ r: true, w: false, x: true });
                      setPermOther({ r: true, w: false, x: true });
                    }}
                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono cursor-pointer"
                  >
                    755 (Executable Script / Dir)
                  </button>
                  <button
                    onClick={() => {
                      setPermOwner({ r: true, w: true, x: false });
                      setPermGroup({ r: false, w: false, x: false });
                      setPermOther({ r: false, w: false, x: false });
                    }}
                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono cursor-pointer"
                  >
                    600 (SSH Private Key)
                  </button>
                </div>
              </div>
            )}

            {/* ACTIVITY B: PROCESS INVESTIGATION */}
            {activeActivityTab === 'process-investigation' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>ps aux & Resource Triage</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Process Investigation & Runaway Resource Triage
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    An alert triggered on production: CPU usage reached 99.2%. Inspect the simulated process table below, identify the anomaly, and select the safe operational response.
                  </p>
                </div>

                {/* Simulated Process Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-slate-900 text-slate-300">
                      <tr>
                        <th className="p-3">USER</th>
                        <th className="p-3">PID</th>
                        <th className="p-3">%CPU</th>
                        <th className="p-3">%MEM</th>
                        <th className="p-3">STAT</th>
                        <th className="p-3">COMMAND</th>
                        <th className="p-3">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {SIMULATED_PROCESSES.map((proc) => {
                        const isSelected = selectedPid === proc.pid;
                        const isHighCpu = proc.cpu > 50;

                        return (
                          <tr
                            key={proc.pid}
                            className={`transition-colors ${
                              isSelected
                                ? 'bg-amber-50 font-bold'
                                : isHighCpu
                                ? 'bg-rose-50/60'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            <td className="p-3">{proc.user}</td>
                            <td className="p-3">{proc.pid}</td>
                            <td className={`p-3 ${isHighCpu ? 'text-rose-600 font-bold' : ''}`}>{proc.cpu.toFixed(1)}</td>
                            <td className="p-3">{proc.mem.toFixed(1)}</td>
                            <td className="p-3">{proc.stat}</td>
                            <td className="p-3 text-slate-800">{proc.command}</td>
                            <td className="p-3">
                              <button
                                onClick={() => setSelectedPid(proc.pid)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                }`}
                              >
                                {isSelected ? 'Selected' : 'Inspect'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Action Control Panel */}
                {selectedPid && (
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        Selected Target: PID {selectedPid} (
                        {SIMULATED_PROCESSES.find((p) => p.pid === selectedPid)?.command})
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          setInvestigationAction('sigterm');
                          handleEvaluateProcessAction();
                        }}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Send SIGTERM (kill -15 {selectedPid})
                      </button>
                      <button
                        onClick={() => {
                          setInvestigationAction('sigkill');
                          handleEvaluateProcessAction();
                        }}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Send SIGKILL (kill -9 {selectedPid})
                      </button>
                    </div>

                    {investigationFeedback && (
                      <div className="p-4 rounded-xl text-xs bg-white border border-slate-200 text-slate-800 leading-relaxed">
                        {investigationFeedback}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ACTIVITY C: LOG DETECTIVE */}
            {activeActivityTab === 'log-detective' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
                    <FileSearch className="w-3.5 h-3.5" />
                    <span>Application Log Forensics</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Log Detective — Identify the First Point of Failure
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    The web server returned HTTP 502 Bad Gateway to users. Filter and inspect the application startup log below to pinpoint the exact root-cause failure line.
                  </p>
                </div>

                {/* Filter Bar */}
                <div className="flex items-center gap-2 mb-4">
                  {(['ALL', 'INFO', 'WARN', 'ERROR', 'FATAL'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setLogFilterLevel(level)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        logFilterLevel === level
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                {/* Log Stream Viewer */}
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs h-72 overflow-y-auto space-y-1.5 mb-6">
                  {filteredLogs.map((log) => {
                    const isSelected = selectedLogId === log.id;
                    return (
                      <div
                        key={log.id}
                        onClick={() => setSelectedLogId(log.id)}
                        className={`p-2 rounded cursor-pointer transition-colors flex items-start gap-3 ${
                          isSelected
                            ? 'bg-slate-800 ring-1 ring-amber-400'
                            : 'hover:bg-slate-900'
                        }`}
                      >
                        <span className="text-slate-500 shrink-0">{log.timestamp}</span>
                        <span
                          className={`font-bold shrink-0 ${
                            log.level === 'FATAL'
                              ? 'text-rose-400'
                              : log.level === 'ERROR'
                              ? 'text-rose-400'
                              : log.level === 'WARN'
                              ? 'text-amber-400'
                              : 'text-indigo-400'
                          }`}
                        >
                          [{log.level}]
                        </span>
                        <span className="text-slate-400 shrink-0">[{log.component}]</span>
                        <span className="text-slate-200 break-all">{log.message}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Evaluation Action */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Selected Line: {selectedLogId ? `Log ID: ${selectedLogId}` : 'None'}
                  </span>
                  <button
                    disabled={!selectedLogId}
                    onClick={() => {
                      if (selectedLogId === 'log-4') {
                        setLogDetectiveVerdict('BULLSEYE! Log 4 contains "EACCES: permission denied, open /etc/ecommerce/config.json". This is the first critical failure that triggered all downstream crash events.');
                        markActivityCompleted(3, 'log-detective');
                      } else {
                        setLogDetectiveVerdict('Not quite. This line is a downstream consequence (like Nginx 502 or systemd unit failure). Look earlier in the log for the root cause exception.');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <span>Verify Root Cause Line</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {logDetectiveVerdict && (
                  <div className="mt-4 p-4 rounded-xl text-xs bg-amber-50 text-amber-950 border border-amber-200 leading-relaxed">
                    {logDetectiveVerdict}
                  </div>
                )}
              </div>
            )}

            {/* ACTIVITY D: INCIDENT REMEDIATION */}
            {activeActivityTab === 'incident-diagnosis' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Structured 5-Step Incident Workflow</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Live Incident Remediation: E-Commerce API Failure
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Follow the disciplined 5-step operational troubleshooting methodology. Gather evidence, isolate the component, formulate a hypothesis, apply a safe fix, and verify recovery.
                  </p>
                </div>

                {/* Workflow Stepper */}
                <div className="grid grid-cols-4 gap-2 mb-6 text-center text-xs font-bold">
                  <div className={`p-2.5 rounded-xl border ${incidentStep === 'inspect_files' ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-slate-100 text-slate-500'}`}>
                    1. Gather Evidence
                  </div>
                  <div className={`p-2.5 rounded-xl border ${incidentStep === 'formulate_hypothesis' ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-slate-100 text-slate-500'}`}>
                    2. Test Hypothesis
                  </div>
                  <div className={`p-2.5 rounded-xl border ${incidentStep === 'apply_fix' ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-slate-100 text-slate-500'}`}>
                    3. Safe Remediation
                  </div>
                  <div className={`p-2.5 rounded-xl border ${incidentStep === 'verified' ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-slate-100 text-slate-500'}`}>
                    4. Verified Recovery
                  </div>
                </div>

                {/* Step 1: Evidence Inspection */}
                {incidentStep === 'inspect_files' && (
                  <div className="space-y-4">
                    <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-1">
                      <div className="text-amber-400 font-bold">$ ls -l /etc/ecommerce/config.json</div>
                      <div>-rw------- 1 root root 240 Oct 26 10:00 /etc/ecommerce/config.json</div>
                      <div className="text-slate-400 mt-2"># Notice: Only root has read permissions (rw-------).</div>
                      <div className="text-slate-400"># The API runs as unprivileged user: nodeapp (UID: 1002).</div>
                    </div>

                    <button
                      onClick={() => setIncidentStep('formulate_hypothesis')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors cursor-pointer"
                    >
                      <span>Proceed to Formulate Hypothesis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Step 2: Formulate Hypothesis */}
                {incidentStep === 'formulate_hypothesis' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Select the Most Plausible Hypothesis
                    </h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleTestHypothesis('permission_eacces')}
                        className="w-full text-left p-3.5 rounded-xl border border-slate-200 text-xs font-medium hover:bg-slate-50 cursor-pointer"
                      >
                        <strong>Hypothesis A:</strong> The service crashed with EACCES because user "nodeapp" cannot read "/etc/ecommerce/config.json" due to 600 root-only permissions.
                      </button>
                      <button
                        onClick={() => handleTestHypothesis('ram_leak')}
                        className="w-full text-left p-3.5 rounded-xl border border-slate-200 text-xs font-medium hover:bg-slate-50 cursor-pointer"
                      >
                        <strong>Hypothesis B:</strong> The server ran out of memory, causing the Linux OOM killer to terminate Node.js.
                      </button>
                    </div>

                    {incidentFeedback && (
                      <div className="p-3.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800">
                        {incidentFeedback}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Apply Fix */}
                {incidentStep === 'apply_fix' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Choose Your Remediation Command
                    </h4>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleApplyIncidentFix('chmod 644')}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-semibold cursor-pointer"
                      >
                        sudo chmod 644 /etc/ecommerce/config.json
                      </button>
                      <button
                        onClick={() => handleApplyIncidentFix('chmod 777')}
                        className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-semibold cursor-pointer"
                      >
                        sudo chmod 777 /etc/ecommerce/config.json (Anti-Pattern)
                      </button>
                    </div>

                    {incidentFeedback && (
                      <div className="p-3.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800">
                        {incidentFeedback}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Verified */}
                {incidentStep === 'verified' && (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-bold text-sm">Incident Resolved with Principle of Least Privilege!</h4>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">
                      {incidentFeedback}
                    </p>
                    <div className="pt-2 font-mono text-xs bg-white/80 p-3 rounded-lg border border-emerald-200 text-emerald-900">
                      $ curl -I http://localhost:3000/health<br />
                      HTTP/1.1 200 OK<br />
                      Content-Type: application/json<br />
                      {"{ \"status\": \"healthy\", \"database\": \"connected\" }"}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CHECKPOINTS */}
        {activeTab === 'checkpoints' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Knowledge Checkpoints (Day 3)</h3>
              <p className="text-xs text-slate-500">
                Validate your grasp of permissions, signals, telemetry metrics, and root-cause analysis.
              </p>
            </div>

            {DEVOPS_DAY_3_DATA.checkpoints.map((cp, idx) => {
              const selectedOpt = checkpointAnswers[cp.id];
              const feedback = checkpointFeedback[cp.id];

              return (
                <div key={cp.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                    <span>Checkpoint {idx + 1} of 5</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-4">{cp.question}</h4>

                  <div className="space-y-2">
                    {cp.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectCheckpointOption(cp.id, oIdx, cp.correctIndex, idx)}
                          className={`w-full text-left p-3.5 rounded-xl text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                            isChosen
                              ? 'bg-amber-50 border-2 border-amber-600 text-amber-950 font-semibold'
                              : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                              isChosen ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'
                            }`}
                          >
                            {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {feedback?.show && (
                    <div
                      className={`mt-4 p-4 rounded-xl text-xs border ${
                        feedback.isCorrect
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                          : 'bg-rose-50 text-rose-950 border-rose-200'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        {feedback.isCorrect ? (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                        )}
                        <span>{feedback.isCorrect ? 'Correct!' : 'Incorrect'}</span>
                      </div>
                      <p className="mt-1 leading-relaxed opacity-90">{cp.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: PRACTICAL ASSIGNMENT (INTERACTIVE SCENARIO MISSION) */}
        {activeTab === "assignment" && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <InteractiveScenarioMissionStudio
              mission={DEVOPS_DAY_3_MISSION}
              onSubmit={(sub) => submitAssignment(3, sub)}
              initialResult={
                progress.assignmentSubmitted
                  ? {
                      score: progress.assignmentScore ?? 0,
                      maxScore: 100,
                      percentage: progress.assignmentScore ?? 0,
                      passed: (progress.assignmentScore ?? 0) >= 70,
                      feedback: progress.assignmentFeedback ?? "",
                      criteriaScores: progress.assignmentData?.criteriaScores ?? [],
                    }
                  : null
              }
            />
          </div>
        )}

        {/* TAB 5: INTERVIEW VAULT */}
        {activeTab === 'interview' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-6">
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Linux Troubleshooting Interview Preparation (Day 3)</h3>
              <p className="text-xs text-slate-500">
                Master 5 critical interview scenarios covering port collisions, least privilege, process states, and live incident triage.
              </p>
            </div>

            {DEVOPS_DAY_3_DATA.interviewQuestions.map((iq, idx) => {
              const isExpanded = expandedInterviewIdx === idx;
              return (
                <div key={iq.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <button
                    onClick={() => {
                      setExpandedInterviewIdx(isExpanded ? null : idx);
                      markInterviewReviewed(3);
                    }}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{iq.question}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {iq.targetRole}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">
                            {iq.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs">
                      <div>
                        <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5 text-[11px]">
                          Model Answer
                        </h5>
                        <p className="text-slate-700 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                          {iq.modelAnswer}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-emerald-50 text-emerald-950 p-4 rounded-xl border border-emerald-200">
                          <h6 className="font-bold uppercase tracking-wider mb-1.5 text-[11px] text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Key Evaluation Points</span>
                          </h6>
                          <ul className="space-y-1 list-disc list-inside opacity-90">
                            {iq.keyPoints.map((kp, k) => (
                              <li key={k}>{kp}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-rose-50 text-rose-950 p-4 rounded-xl border border-rose-200">
                          <h6 className="font-bold uppercase tracking-wider mb-1.5 text-[11px] text-rose-900 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Common Candidate Mistakes</span>
                          </h6>
                          <ul className="space-y-1 list-disc list-inside opacity-90">
                            {iq.commonMistakes.map((cm, c) => (
                              <li key={c}>{cm}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 6: 10-QUESTION END-OF-DAY QUIZ (ONE QUESTION AT A TIME) */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {!quizResult ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                {/* Quiz Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      Question {quizActiveIndex + 1} of {DEVOPS_DAY_3_DATA.quizQuestions.length}
                    </span>
                    <span className="ml-3 text-[11px] font-semibold text-slate-400">
                      Domain: {DEVOPS_DAY_3_DATA.quizQuestions[quizActiveIndex].domain}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Passing: 80% (8/10)</span>
                </div>

                {/* Question */}
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  {DEVOPS_DAY_3_DATA.quizQuestions[quizActiveIndex].question}
                </h3>

                {/* Options */}
                <div className="space-y-2.5 mb-8">
                  {DEVOPS_DAY_3_DATA.quizQuestions[quizActiveIndex].options.map((option, optIdx) => {
                    const qId = DEVOPS_DAY_3_DATA.quizQuestions[quizActiveIndex].id;
                    const isSelected = selectedQuizAnswers[qId] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizAnswer(qId, optIdx)}
                        className={`w-full text-left p-4 rounded-xl text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50 border-2 border-amber-600 text-amber-950 font-semibold'
                            : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={quizActiveIndex === 0}
                    onClick={handlePrevQuizQuestion}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="text-xs text-slate-400">
                    Answered {Object.keys(selectedQuizAnswers).length} of {DEVOPS_DAY_3_DATA.quizQuestions.length}
                  </div>

                  {quizActiveIndex < DEVOPS_DAY_3_DATA.quizQuestions.length - 1 ? (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled={Object.keys(selectedQuizAnswers).length < DEVOPS_DAY_3_DATA.quizQuestions.length}
                      onClick={handleFinishQuiz}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Submit Quiz</span>
                      <Award className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Result Summary */
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div
                  className={`p-6 rounded-2xl border text-center ${
                    quizResult.passed
                      ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                      : 'bg-rose-50 text-rose-950 border-rose-200'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3 bg-white shadow-xs">
                    {quizResult.passed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-rose-600" />
                    )}
                  </div>
                  <h3 className="text-xl font-extrabold mb-1">
                    {quizResult.passed ? 'Quiz Passed!' : 'Pass Threshold Not Met (80% Required)'}
                  </h3>
                  <p className="text-xs opacity-90">
                    You scored {quizResult.score} out of {quizResult.total} ({quizResult.percentage}%).
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={handleRetryQuiz}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Quiz</span>
                    </button>
                    {quizResult.passed && (
                      <Link
                        to="/courses/devops-engineering"
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
                      >
                        <span>Back to DevOps Academy Hub</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Detailed Explanations for Every Question */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Detailed Explanations & Answer Analysis
                  </h4>
                  {quizResult.questionResults.map((qr: any, idx: number) => (
                    <div
                      key={qr.questionId}
                      className={`p-4 rounded-xl border text-xs ${
                        qr.isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                        <span>
                          Q{idx + 1}: {qr.questionText}
                        </span>
                        <span className={qr.isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                          {qr.isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-2 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                        <strong>Explanation:</strong> {qr.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
