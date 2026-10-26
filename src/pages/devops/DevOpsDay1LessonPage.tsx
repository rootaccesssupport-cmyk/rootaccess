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
  Terminal,
  Play,
  ShieldCheck,
  Award,
  RefreshCw,
  Compass,
  Zap,
  Activity,
  CheckCircle,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { LessonContentRenderer } from '../../components/common/LessonContentRenderer';
import { useDevOps } from '../../context/DevOpsContext';
import { useProgress } from '../../context/ProgressContext';
import { CourseEnrollmentGate } from '../../components/common/CourseEnrollmentGate';
import { DEVOPS_DAY_1_DATA } from '../../data/devopsDay1Data';
import {
  RELEASE_ROOM_SCENARIOS,
  LIFECYCLE_STAGES,
} from '../../data/devopsDay1Activities';
import { DEVOPS_DAY_1_MISSION } from '../../data/devopsScenarioMissions';
import { InteractiveScenarioMissionStudio } from '../../components/devops/InteractiveScenarioMissionStudio';

export const DevOpsDay1LessonPage: React.FC = () => {
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

  const progress = getDayProgress(1);

  // Tab navigation: 'topics' | 'activities' | 'checkpoints' | 'assignment' | 'interview' | 'quiz'
  const [activeTab, setActiveTab] = useState<'topics' | 'activities' | 'checkpoints' | 'assignment' | 'interview' | 'quiz'>('topics');
  const [currentTopicIdx, setCurrentTopicIdx] = useState(0);

  // Activity sub-tabs: 'release-room' | 'lifecycle' | 'pipeline'
  const [activeActivityTab, setActiveActivityTab] = useState<'release-room' | 'lifecycle' | 'pipeline'>('release-room');

  // Release Room State
  const [releaseRoomAnswers, setReleaseRoomAnswers] = useState<Record<string, string>>({});
  const [releaseRoomSubmitted, setReleaseRoomSubmitted] = useState(false);

  // Lifecycle Explorer State
  const [selectedStageId, setSelectedStageId] = useState<string>('plan');

  // Pipeline Simulation State: 'idle' | 'running_build' | 'running_test' | 'failed' | 'inspecting' | 'fixed' | 'rerunning' | 'success'
  const [pipelineState, setPipelineState] = useState<'idle' | 'running_build' | 'running_test' | 'failed' | 'inspecting' | 'fixed' | 'rerunning' | 'success'>('idle');
  const [pipelineLog, setPipelineLog] = useState<string[]>([]);

  // Checkpoints State
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<string, number>>({});
  const [checkpointFeedback, setCheckpointFeedback] = useState<Record<string, { isCorrect: boolean; show: boolean }>>({});

  // Interview Questions Toggle
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState<number | null>(null);

  // Quiz State (One question at a time)
  const [quizActiveIndex, setQuizActiveIndex] = useState(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<any>(null);

  // Handlers for Release Room
  const handleSelectReleaseOption = (scenarioId: string, optionId: string) => {
    setReleaseRoomAnswers((prev) => ({ ...prev, [scenarioId]: optionId }));
  };

  const handleEvaluateReleaseRoom = () => {
    setReleaseRoomSubmitted(true);
    markActivityCompleted(1, 'release-room');
  };

  // Pipeline Simulation Handlers
  const handleStartPipeline = () => {
    setPipelineState('running_build');
    setPipelineLog(['[CI Runner] Initializing build environment...', '[CI Runner] Pulling docker base image: node:20-alpine...', '[CI Runner] Running npm ci (148 packages installed)...', '[CI Runner] Build SUCCESS! Artifact created: rootshop-web:commit-a4f9']);
    setTimeout(() => {
      setPipelineState('running_test');
      setPipelineLog((prev) => [
        ...prev,
        '[CI Runner] Starting automated test suites...',
        '[CI Runner] Running Jest unit tests (128 passed)...',
        '[CI Runner] Running integration tests...',
        '[FAIL] TestCheckoutCalculation: Expected cart total to equal $80.00 with promo SAVE20, but received $100.00',
        '[CI Runner] Error: Process exited with status code 1. Pipeline execution halted!',
      ]);
      setPipelineState('failed');
    }, 1500);
  };

  const handleApplyPipelineFix = () => {
    setPipelineState('fixed');
    setPipelineLog((prev) => [
      ...prev,
      '',
      '[Developer Fix Applied] Modified src/services/cartService.js: corrected operator to apply discount before calculating tax.',
      '[Developer Action] Pushed commit e7b1c3: "fix(cart): apply promo discount prior to subtotal aggregation"',
    ]);
  };

  const handleRerunPipeline = () => {
    setPipelineState('rerunning');
    setPipelineLog((prev) => [
      ...prev,
      '[CI Runner] Rerunning pipeline on commit e7b1c3...',
      '[CI Runner] Running Jest unit tests (128 passed)...',
      '[CI Runner] Running integration tests (48 passed)...',
      '[PASS] TestCheckoutCalculation: Cart total correctly reflects $80.00 (-$20.00 SAVE20 discount)',
      '[CI Runner] Security scan (Trivy): 0 Critical vulnerabilities detected.',
      '[CI Runner] Artifact promoted to Amazon ECR registry: rootshop-web:v1.4.2',
      '[CD Runner] Staging deployment successful! Health probe HTTP 200 OK.',
      '[SUCCESS] All quality gates passed! Deployment pipeline finished cleanly in 42s.',
    ]);
    setTimeout(() => {
      setPipelineState('success');
      markActivityCompleted(1, 'pipeline-sim');
    }, 1500);
  };

  const handleResetPipeline = () => {
    setPipelineState('idle');
    setPipelineLog([]);
  };

  // Checkpoint handlers
  const handleSelectCheckpointOption = (cpId: string, optIdx: number, correctIdx: number, idx: number) => {
    setCheckpointAnswers((prev) => ({ ...prev, [cpId]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    setCheckpointFeedback((prev) => ({
      ...prev,
      [cpId]: { isCorrect, show: true },
    }));
    submitCheckpoint(1, idx, isCorrect);
  };

  // Quiz submission handler
  const handleSelectQuizAnswer = (questionId: string, optionIdx: number) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleNextQuizQuestion = () => {
    if (quizActiveIndex < DEVOPS_DAY_1_DATA.quizQuestions.length - 1) {
      setQuizActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuizQuestion = () => {
    if (quizActiveIndex > 0) {
      setQuizActiveIndex((prev) => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    const res = submitQuiz(1, selectedQuizAnswers);
    setQuizResult(res);
  };

  const handleRetryQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizResult(null);
    setQuizActiveIndex(0);
  };

  const currentTopic = DEVOPS_DAY_1_DATA.topics[currentTopicIdx];
  const selectedStage = LIFECYCLE_STAGES.find((s) => s.id === selectedStageId) || LIFECYCLE_STAGES[0];

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
              <span className="text-indigo-400">Day 1</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-xs font-semibold text-indigo-300 mb-3">
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Module 1 • Foundation Milestone</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {DEVOPS_DAY_1_DATA.lessonTitle}
                </h1>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl">{DEVOPS_DAY_1_DATA.subtitle}</p>
              </div>

              {/* PDF Study Guide Download Button */}
              <div className="flex items-center gap-3">
                <a
                  href="/devops/day-1-understanding-devops.pdf"
                  download="RootAccess_DevOps_Day1_Study_Guide.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-all shadow-xs"
                >
                  <Download className="w-4 h-4 text-indigo-400" />
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
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>1. Core Concepts ({progress.topicsRead.filter(Boolean).length}/6)</span>
              </button>

              <button
                onClick={() => setActiveTab('activities')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'activities'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>2. Interactive Simulations (3)</span>
              </button>

              <button
                onClick={() => setActiveTab('checkpoints')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'checkpoints'
                    ? 'bg-indigo-600 text-white shadow-md'
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
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                <span>4. Practical Assignment {progress.assignmentSubmitted && '✓'}</span>
              </button>

              <button
                onClick={() => setActiveTab('interview')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'interview'
                    ? 'bg-indigo-600 text-white shadow-md'
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
                    ? 'bg-indigo-600 text-white shadow-md'
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
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Day 1 Modules</h3>
                {DEVOPS_DAY_1_DATA.topics.map((t, idx) => {
                  const isRead = progress.topicsRead[idx];
                  const isCurrent = currentTopicIdx === idx;

                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setCurrentTopicIdx(idx);
                        markTopicRead(1, idx);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-50 border border-indigo-200 text-indigo-900 shadow-xs'
                          : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          isRead
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-indigo-600 text-white'
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
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Topic {currentTopic.topicNumber} of 6
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
                  <div className="mt-8 bg-indigo-50/70 border border-indigo-100 rounded-xl p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Key Takeaways</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-indigo-950">
                      {currentTopic.keyTakeaways.map((takeaway, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
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
                      markTopicRead(1, currentTopicIdx);
                      if (currentTopicIdx < DEVOPS_DAY_1_DATA.topics.length - 1) {
                        setCurrentTopicIdx(currentTopicIdx + 1);
                      } else {
                        setActiveTab('activities');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>{currentTopicIdx === 5 ? 'Proceed to Simulations' : 'Mark Read & Next Topic'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE SIMULATIONS */}
        {activeTab === 'activities' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {/* Sub-Tabs */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setActiveActivityTab('release-room')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeActivityTab === 'release-room'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Simulation A: Release Room
              </button>
              <button
                onClick={() => setActiveActivityTab('lifecycle')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeActivityTab === 'lifecycle'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Simulation B: Delivery Lifecycle Explorer
              </button>
              <button
                onClick={() => setActiveActivityTab('pipeline')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeActivityTab === 'pipeline'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Simulation C: Deterministic CI/CD Pipeline
              </button>
            </div>

            {/* ACTIVITY A: RELEASE ROOM */}
            {activeActivityTab === 'release-room' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Realistic Release Engineering Scenario</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    The Release Room — Application Delivery Decision Simulator
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    You are the Release Engineer responsible for guiding the team’s latest feature into production.
                    Select your operational action at each decision gate and observe the consequence on deployment safety.
                  </p>
                </div>

                <div className="space-y-6">
                  {RELEASE_ROOM_SCENARIOS.map((step) => {
                    const selectedOptId = releaseRoomAnswers[step.id];
                    const selectedOpt = step.options.find((o) => o.id === selectedOptId);

                    return (
                      <div key={step.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                        <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                          {step.stageName}
                        </div>
                        <div className="text-xs text-slate-600 mb-2">{step.scenario}</div>
                        <div className="text-sm font-bold text-slate-900 mb-3">{step.question}</div>

                        <div className="space-y-2">
                          {step.options.map((opt) => {
                            const isChosen = selectedOptId === opt.id;
                            return (
                              <button
                                key={opt.id}
                                onClick={() => handleSelectReleaseOption(step.id, opt.id)}
                                className={`w-full text-left p-3 rounded-lg text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                                  isChosen
                                    ? 'bg-indigo-50 border-2 border-indigo-600 text-indigo-950 font-semibold'
                                    : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                                    isChosen ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                                  }`}
                                >
                                  {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                                <span>{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Consequence feedback box after submission */}
                        {releaseRoomSubmitted && selectedOpt && (
                          <div
                            className={`mt-4 p-4 rounded-xl text-xs border ${
                              selectedOpt.isOptimal
                                ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                                : selectedOpt.riskLevel === 'high'
                                ? 'bg-rose-50 text-rose-950 border-rose-200'
                                : 'bg-amber-50 text-amber-950 border-amber-200'
                            }`}
                          >
                            <div className="font-bold flex items-center gap-1.5 mb-1">
                              {selectedOpt.isOptimal ? (
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-amber-600" />
                              )}
                              <span>Simulated Outcome: {selectedOpt.consequence}</span>
                            </div>
                            <p className="mt-1 leading-relaxed opacity-90">{selectedOpt.feedback}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Decisions made: {Object.keys(releaseRoomAnswers).length} / 4
                  </div>
                  <button
                    disabled={Object.keys(releaseRoomAnswers).length < 4}
                    onClick={handleEvaluateReleaseRoom}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                  >
                    <span>Evaluate Release Decisions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ACTIVITY B: LIFECYCLE EXPLORER */}
            {activeActivityTab === 'lifecycle' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Interactive 9-Stage Diagram</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Delivery Lifecycle Explorer
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Click each stage in the software delivery loop to inspect its purpose, typical outputs, common failure modes, and automated detection signals.
                  </p>
                </div>

                {/* Stage Tabs Strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
                  {LIFECYCLE_STAGES.map((s) => {
                    const isSelected = s.id === selectedStageId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStageId(s.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {s.name}
                      </button>
                    );
                  })}
                </div>

                {/* Selected Stage Detail Card */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{selectedStage.name}</h4>
                      <p className="text-xs text-slate-500">{selectedStage.shortDesc}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
                    <div>
                      <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5">Primary Purpose</h5>
                      <p className="leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                        {selectedStage.purpose}
                      </p>

                      <h5 className="font-bold text-slate-900 uppercase tracking-wider mt-4 mb-1.5">Typical Outputs</h5>
                      <ul className="space-y-1 bg-white p-3 rounded-lg border border-slate-200">
                        {selectedStage.typicalOutputs.map((out, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-1.5">Common Failure Modes</h5>
                      <p className="leading-relaxed bg-rose-50 text-rose-950 p-3 rounded-lg border border-rose-200">
                        {selectedStage.commonFailures}
                      </p>

                      <h5 className="font-bold text-slate-900 uppercase tracking-wider mt-4 mb-1.5">Automated Detection Signals</h5>
                      <p className="leading-relaxed bg-emerald-50 text-emerald-950 p-3 rounded-lg border border-emerald-200">
                        {selectedStage.detectionMethod}
                      </p>

                      <h5 className="font-bold text-slate-900 uppercase tracking-wider mt-4 mb-1.5">Connection to Next Stage</h5>
                      <p className="leading-relaxed bg-white p-3 rounded-lg border border-slate-200 text-slate-600">
                        {selectedStage.nextConnection}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACTIVITY C: DETERMINISTIC PIPELINE SIMULATION */}
            {activeActivityTab === 'pipeline' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Deterministic CI/CD Sandbox</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Continuous Delivery Pipeline Simulator
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Experience a real CI/CD pipeline lifecycle. Start the pipeline, observe build stages, encounter a failing unit test, inspect failure logs, apply a simulated fix, and re-run to verify promotion.
                  </p>
                </div>

                {/* Pipeline Stages Visual Indicator */}
                <div className="grid grid-cols-4 gap-2 mb-6 text-center text-xs font-bold">
                  <div
                    className={`p-3 rounded-xl border ${
                      pipelineState === 'running_build'
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 animate-pulse'
                        : pipelineState === 'idle'
                        ? 'bg-slate-50 border-slate-200 text-slate-400'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    }`}
                  >
                    1. Build & Package
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      pipelineState === 'running_test' || pipelineState === 'rerunning'
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 animate-pulse'
                        : pipelineState === 'failed' || pipelineState === 'inspecting' || pipelineState === 'fixed'
                        ? 'bg-rose-50 border-rose-300 text-rose-700'
                        : pipelineState === 'success'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    2. Automated Tests
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      pipelineState === 'success'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    3. Registry Release
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      pipelineState === 'success'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    4. Staging Deploy
                  </div>
                </div>

                {/* Simulated Terminal Log Output */}
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs h-64 overflow-y-auto mb-6 shadow-inner space-y-1">
                  {pipelineLog.length === 0 ? (
                    <div className="text-slate-500 italic">
                      [Pipeline idle] Click "Trigger CI Pipeline" below to launch automated build runner...
                    </div>
                  ) : (
                    pipelineLog.map((line, idx) => (
                      <div
                        key={idx}
                        className={
                          line.includes('[FAIL]')
                            ? 'text-rose-400 font-bold'
                            : line.includes('[SUCCESS]')
                            ? 'text-emerald-400 font-bold'
                            : line.includes('[Developer')
                            ? 'text-amber-300'
                            : 'text-slate-300'
                        }
                      >
                        {line}
                      </div>
                    ))
                  )}
                </div>

                {/* Pipeline Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  {pipelineState === 'idle' && (
                    <button
                      onClick={handleStartPipeline}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Trigger CI Pipeline</span>
                    </button>
                  )}

                  {(pipelineState === 'failed' || pipelineState === 'inspecting') && (
                    <button
                      onClick={handleApplyPipelineFix}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Apply Fix: Correct Discount Calculation</span>
                    </button>
                  )}

                  {pipelineState === 'fixed' && (
                    <button
                      onClick={handleRerunPipeline}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Rerun Pipeline Verification</span>
                    </button>
                  )}

                  {pipelineState === 'success' && (
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Pipeline Succeeded & Promoted to Staging!</span>
                      </span>
                      <button
                        onClick={handleResetPipeline}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Simulation</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CHECKPOINTS */}
        {activeTab === 'checkpoints' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Knowledge Checkpoints (Day 1)</h3>
              <p className="text-xs text-slate-500">
                Test your conceptual understanding across the 5 core milestones of software delivery.
              </p>
            </div>

            {DEVOPS_DAY_1_DATA.checkpoints.map((cp, idx) => {
              const selectedOpt = checkpointAnswers[cp.id];
              const feedback = checkpointFeedback[cp.id];

              return (
                <div key={cp.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
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
                              ? 'bg-indigo-50 border-2 border-indigo-600 text-indigo-950 font-semibold'
                              : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                              isChosen ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
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
              mission={DEVOPS_DAY_1_MISSION}
              onSubmit={(sub) => submitAssignment(1, sub)}
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
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">DevOps Interview Preparation (Day 1)</h3>
              <p className="text-xs text-slate-500">
                Master 5 authentic interview questions asked by senior engineering managers, complete with model answers and common mistakes to avoid.
              </p>
            </div>

            {DEVOPS_DAY_1_DATA.interviewQuestions.map((iq, idx) => {
              const isExpanded = expandedInterviewIdx === idx;
              return (
                <div key={iq.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <button
                    onClick={() => {
                      setExpandedInterviewIdx(isExpanded ? null : idx);
                      markInterviewReviewed(1);
                    }}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{iq.question}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {iq.targetRole}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
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
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      Question {quizActiveIndex + 1} of {DEVOPS_DAY_1_DATA.quizQuestions.length}
                    </span>
                    <span className="ml-3 text-[11px] font-semibold text-slate-400">
                      Domain: {DEVOPS_DAY_1_DATA.quizQuestions[quizActiveIndex].domain}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Passing: 80% (8/10)</span>
                </div>

                {/* Question */}
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  {DEVOPS_DAY_1_DATA.quizQuestions[quizActiveIndex].question}
                </h3>

                {/* Options */}
                <div className="space-y-2.5 mb-8">
                  {DEVOPS_DAY_1_DATA.quizQuestions[quizActiveIndex].options.map((option, optIdx) => {
                    const qId = DEVOPS_DAY_1_DATA.quizQuestions[quizActiveIndex].id;
                    const isSelected = selectedQuizAnswers[qId] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizAnswer(qId, optIdx)}
                        className={`w-full text-left p-4 rounded-xl text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 border-2 border-indigo-600 text-indigo-950 font-semibold'
                            : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
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
                    Answered {Object.keys(selectedQuizAnswers).length} of {DEVOPS_DAY_1_DATA.quizQuestions.length}
                  </div>

                  {quizActiveIndex < DEVOPS_DAY_1_DATA.quizQuestions.length - 1 ? (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled={Object.keys(selectedQuizAnswers).length < DEVOPS_DAY_1_DATA.quizQuestions.length}
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
                        to="/courses/devops-engineering/day-2"
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
                      >
                        <span>Proceed to Day 2: Linux</span>
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
