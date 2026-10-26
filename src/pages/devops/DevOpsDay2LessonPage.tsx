import React, { useState, useRef, useEffect } from 'react';
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
  ShieldCheck,
  Award,
  Folder,
  FolderOpen,
  FileText,
  Compass,
  CheckCircle,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { LessonContentRenderer } from '../../components/common/LessonContentRenderer';
import { useDevOps } from '../../context/DevOpsContext';
import { useProgress } from '../../context/ProgressContext';
import { CourseEnrollmentGate } from '../../components/common/CourseEnrollmentGate';
import { DEVOPS_DAY_2_DATA } from '../../data/devopsDay2Data';
import { DEVOPS_DAY_2_MISSION } from '../../data/devopsScenarioMissions';
import { InteractiveScenarioMissionStudio } from '../../components/devops/InteractiveScenarioMissionStudio';
import {
  FHS_DIRECTORIES,
  INITIAL_VFS,
  VFSNode,
} from '../../data/devopsDay2Activities';
import {
  executeTerminalCommand,
  cloneVfs,
  getNodeBySegments,
} from '../../services/devopsTerminalSimulator';

export const DevOpsDay2LessonPage: React.FC = () => {
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

  const progress = getDayProgress(2);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'topics' | 'activities' | 'checkpoints' | 'assignment' | 'interview' | 'quiz'>('topics');
  const [currentTopicIdx, setCurrentTopicIdx] = useState(0);

  // Activity sub-tabs: 'fhs-explorer' | 'simulated-terminal' | 'command-challenges'
  const [activeActivityTab, setActiveActivityTab] = useState<'fhs-explorer' | 'simulated-terminal' | 'command-challenges'>('fhs-explorer');

  // Activity A: FHS Explorer selected directory
  const [selectedFhsPath, setSelectedFhsPath] = useState<string>('/etc');

  // Activity B: Simulated Terminal State
  const [vfs, setVfs] = useState<VFSNode>(() => cloneVfs(INITIAL_VFS));
  const [cwd, setCwd] = useState<string>('/home/devops');
  const [commandHistory, setCommandHistory] = useState<Array<{ cmd: string; output: string; cwd: string; isError?: boolean }>>([
    {
      cmd: '',
      output: 'Welcome to RootAccess Linux Terminal Sandbox (Ubuntu 24.04 LTS)\nType "help" to see available commands or "man <cmd>" for manuals.',
      cwd: '/home/devops',
    },
  ]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Activity C: Command Challenges State
  const [challengeStep, setChallengeStep] = useState<number>(0);
  const challenges = [
    {
      id: 'step-1',
      title: 'Task 1: Verify Your Location',
      instruction: 'Print your current working directory to confirm where you are starting.',
      expectedCommand: 'pwd',
      validate: (currCwd: string, _currVfs: VFSNode) => currCwd === '/home/devops',
      hint: 'Type "pwd" and press Enter.',
    },
    {
      id: 'step-2',
      title: 'Task 2: Navigate to Project Directory',
      instruction: 'Change directory into the "workspace/ecommerce-api" folder.',
      expectedCommand: 'cd workspace/ecommerce-api',
      validate: (currCwd: string, _currVfs: VFSNode) => currCwd === '/home/devops/workspace/ecommerce-api',
      hint: 'Type "cd workspace/ecommerce-api" and press Enter.',
    },
    {
      id: 'step-3',
      title: 'Task 3: List All Files (Including Hidden .env.example)',
      instruction: 'List all files in the current folder, including hidden dotfiles.',
      expectedCommand: 'ls -a',
      validate: (currCwd: string, _currVfs: VFSNode) => currCwd.includes('ecommerce-api'),
      hint: 'Type "ls -a" or "ls -la" and press Enter.',
    },
    {
      id: 'step-4',
      title: 'Task 4: Read Project README',
      instruction: 'Inspect the README.md file using the cat command.',
      expectedCommand: 'cat README.md',
      validate: (_currCwd: string, _currVfs: VFSNode) => true,
      hint: 'Type "cat README.md" and press Enter.',
    },
    {
      id: 'step-5',
      title: 'Task 5: Create a Logs Directory',
      instruction: 'Create a new directory named "logs" inside the current project.',
      expectedCommand: 'mkdir logs',
      validate: (_currCwd: string, currVfs: VFSNode) => {
        const node = getNodeBySegments(currVfs, ['home', 'devops', 'workspace', 'ecommerce-api', 'logs']);
        return node !== null && node.type === 'dir';
      },
      hint: 'Type "mkdir logs" and press Enter.',
    },
    {
      id: 'step-6',
      title: 'Task 6: Copy Configuration Example',
      instruction: 'Copy ".env.example" to create a new live configuration file named ".env".',
      expectedCommand: 'cp .env.example .env',
      validate: (_currCwd: string, currVfs: VFSNode) => {
        const node = getNodeBySegments(currVfs, ['home', 'devops', 'workspace', 'ecommerce-api', '.env']);
        return node !== null && node.type === 'file';
      },
      hint: 'Type "cp .env.example .env" and press Enter.',
    },
  ];

  // Checkpoints State
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<string, number>>({});
  const [checkpointFeedback, setCheckpointFeedback] = useState<Record<string, { isCorrect: boolean; show: boolean }>>({});

  // Interview Questions Toggle
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState<number | null>(null);

  // Quiz State (One question at a time)
  const [quizActiveIndex, setQuizActiveIndex] = useState(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<any>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const raw = currentInput;
    setCurrentInput('');

    const res = executeTerminalCommand(raw, cwd, vfs);

    if (res.output === '__CLEAR__') {
      setCommandHistory([]);
      return;
    }

    const nextCwd = res.newCwd !== undefined ? res.newCwd : cwd;
    const nextVfs = res.newVfs !== undefined ? res.newVfs : vfs;

    setCwd(nextCwd);
    if (res.newVfs) {
      setVfs(nextVfs);
    }

    setCommandHistory((prev) => [
      ...prev,
      { cmd: raw, output: res.output, cwd, isError: res.isError },
    ]);

    // Check challenge validation if active
    if (activeActivityTab === 'command-challenges') {
      const activeChallenge = challenges[challengeStep];
      if (activeChallenge && activeChallenge.validate(nextCwd, nextVfs)) {
        if (challengeStep < challenges.length - 1) {
          setChallengeStep((prev) => prev + 1);
        } else {
          markActivityCompleted(2, 'challenges-complete');
        }
      }
    }

    markActivityCompleted(2, 'terminal-used');
  };

  const handleResetTerminal = () => {
    setVfs(cloneVfs(INITIAL_VFS));
    setCwd('/home/devops');
    setCommandHistory([
      {
        cmd: '',
        output: 'Simulated terminal filesystem reset to factory state.',
        cwd: '/home/devops',
      },
    ]);
  };

  const handleSelectCheckpointOption = (cpId: string, optIdx: number, correctIdx: number, idx: number) => {
    setCheckpointAnswers((prev) => ({ ...prev, [cpId]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    setCheckpointFeedback((prev) => ({
      ...prev,
      [cpId]: { isCorrect, show: true },
    }));
    submitCheckpoint(2, idx, isCorrect);
  };


  const handleSelectQuizAnswer = (questionId: string, optionIdx: number) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleNextQuizQuestion = () => {
    if (quizActiveIndex < DEVOPS_DAY_2_DATA.quizQuestions.length - 1) {
      setQuizActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuizQuestion = () => {
    if (quizActiveIndex > 0) {
      setQuizActiveIndex((prev) => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    const res = submitQuiz(2, selectedQuizAnswers);
    setQuizResult(res);
  };

  const handleRetryQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizResult(null);
    setQuizActiveIndex(0);
  };

  const currentTopic = DEVOPS_DAY_2_DATA.topics[currentTopicIdx];
  const selectedFhs = FHS_DIRECTORIES.find((d) => d.path === selectedFhsPath) || FHS_DIRECTORIES[0];

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
              <span className="text-indigo-400">Day 2</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-xs font-semibold text-emerald-300 mb-3">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Module 1 • Linux Core Systems</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {DEVOPS_DAY_2_DATA.lessonTitle}
                </h1>
                <p className="mt-2 text-sm text-slate-300 max-w-2xl">{DEVOPS_DAY_2_DATA.subtitle}</p>
              </div>

              {/* PDF Study Guide Download Button */}
              <div className="flex items-center gap-3">
                <a
                  href="/devops/day-2-linux-fundamentals.pdf"
                  download="RootAccess_DevOps_Day2_Study_Guide.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-all shadow-xs"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
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
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>1. Core Concepts ({progress.topicsRead.filter(Boolean).length}/7)</span>
              </button>

              <button
                onClick={() => setActiveTab('activities')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'activities'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>2. Terminal & Filesystem Lab (3)</span>
              </button>

              <button
                onClick={() => setActiveTab('checkpoints')}
                className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  activeTab === 'checkpoints'
                    ? 'bg-emerald-600 text-white shadow-md'
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
                    ? 'bg-emerald-600 text-white shadow-md'
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
                    ? 'bg-emerald-600 text-white shadow-md'
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
                    ? 'bg-emerald-600 text-white shadow-md'
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
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Day 2 Modules</h3>
                {DEVOPS_DAY_2_DATA.topics.map((t, idx) => {
                  const isRead = progress.topicsRead[idx];
                  const isCurrent = currentTopicIdx === idx;

                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setCurrentTopicIdx(idx);
                        markTopicRead(2, idx);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-xs'
                          : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          isRead
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-emerald-600 text-white'
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
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                      Topic {currentTopic.topicNumber} of 7
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
                  <div className="mt-8 bg-emerald-50/70 border border-emerald-100 rounded-xl p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>Key Takeaways</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-emerald-950">
                      {currentTopic.keyTakeaways.map((takeaway, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                      markTopicRead(2, currentTopicIdx);
                      if (currentTopicIdx < DEVOPS_DAY_2_DATA.topics.length - 1) {
                        setCurrentTopicIdx(currentTopicIdx + 1);
                      } else {
                        setActiveTab('activities');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>{currentTopicIdx === 6 ? 'Proceed to Terminal Lab' : 'Mark Read & Next Topic'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE ACTIVITIES (FHS & SIMULATED TERMINAL) */}
        {activeTab === 'activities' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {/* Sub-Tabs */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setActiveActivityTab('fhs-explorer')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeActivityTab === 'fhs-explorer'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Activity A: Filesystem Explorer (FHS)
              </button>
              <button
                onClick={() => setActiveActivityTab('simulated-terminal')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeActivityTab === 'simulated-terminal'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Activity B: Interactive Terminal Sandbox
              </button>
              <button
                onClick={() => setActiveActivityTab('command-challenges')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeActivityTab === 'command-challenges'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Activity C: Guided Command Challenges ({challengeStep}/6)
              </button>
            </div>

            {/* ACTIVITY A: FILESYSTEM EXPLORER */}
            {activeActivityTab === 'fhs-explorer' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                    <Folder className="w-3.5 h-3.5" />
                    <span>Filesystem Hierarchy Standard (FHS)</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Linux Directory Structure Explorer
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Select any standard directory below to inspect its operational role in web server hosting, typical contents, and practical DevOps use cases.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Directory Buttons List */}
                  <div className="space-y-2">
                    {FHS_DIRECTORIES.map((dir) => {
                      const isSelected = dir.path === selectedFhsPath;
                      return (
                        <button
                          key={dir.path}
                          onClick={() => setSelectedFhsPath(dir.path)}
                          className={`w-full text-left p-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isSelected ? <FolderOpen className="w-4 h-4" /> : <Folder className="w-4 h-4" />}
                            <span className="font-mono">{dir.path}</span>
                          </div>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-normal ${
                              isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {dir.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Directory Details Card */}
                  <div className="md:col-span-2 bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                        <div>
                          <span className="font-mono text-base font-bold text-slate-900">{selectedFhs.path}</span>
                          <h4 className="text-xs font-medium text-slate-500">{selectedFhs.name}</h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white text-slate-700 border border-slate-200">
                          {selectedFhs.category} Directory
                        </span>
                      </div>

                      <div className="space-y-4 text-xs text-slate-700">
                        <div>
                          <h5 className="font-bold uppercase tracking-wider text-slate-900 mb-1">Standard Purpose</h5>
                          <p className="leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                            {selectedFhs.purpose}
                          </p>
                        </div>

                        <div>
                          <h5 className="font-bold uppercase tracking-wider text-slate-900 mb-1">Practical DevOps Scenario</h5>
                          <p className="leading-relaxed bg-emerald-50 text-emerald-950 p-3 rounded-lg border border-emerald-200">
                            {selectedFhs.practicalExample}
                          </p>
                        </div>

                        <div>
                          <h5 className="font-bold uppercase tracking-wider text-slate-900 mb-1">Common Files & Subdirectories</h5>
                          <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono space-y-1">
                            {selectedFhs.commonFiles.map((f, i) => (
                              <div key={i} className="flex items-center gap-2 text-slate-600">
                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ACTIVITY B: INTERACTIVE TERMINAL SANDBOX */}
            {activeActivityTab === 'simulated-terminal' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Persistent Simulated Shell</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Linux Command-Line Terminal Sandbox
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Practise safe navigation, directory creation, file inspection, and copying. Your commands maintain simulated state across steps.
                    </p>
                  </div>

                  <button
                    onClick={handleResetTerminal}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer self-start sm:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Filesystem</span>
                  </button>
                </div>

                {/* Terminal Window Chrome */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
                  {/* Top Window Bar */}
                  <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-mono text-slate-400 ml-2">devops@rootaccess-vps: {cwd}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">bash 5.2.21</span>
                  </div>

                  {/* Terminal Screen Output */}
                  <div className="p-4 font-mono text-xs text-slate-200 h-80 overflow-y-auto space-y-2">
                    {commandHistory.map((item, idx) => (
                      <div key={idx}>
                        {item.cmd && (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <span className="text-slate-500">devops@rootaccess:{item.cwd}$</span>
                            <span className="text-white font-bold">{item.cmd}</span>
                          </div>
                        )}
                        {item.output && (
                          <div
                            className={`whitespace-pre-wrap mt-0.5 leading-relaxed ${
                              item.isError ? 'text-rose-400' : 'text-slate-300'
                            }`}
                          >
                            {item.output}
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Command Input Prompt */}
                  <form onSubmit={handleTerminalSubmit} className="bg-slate-900/90 border-t border-slate-800 p-3 flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-xs font-bold pl-1">devops@rootaccess:{cwd}$</span>
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      placeholder="e.g., pwd, ls -la, cd workspace/ecommerce-api, cat README.md..."
                      className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-500 focus:outline-hidden"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Run
                    </button>
                  </form>
                </div>

                {/* Quick Command Cheatsheet Strip */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <span className="font-sans font-bold text-slate-700">Quick Try:</span>
                  {['pwd', 'ls -lah', 'cd workspace/ecommerce-api', 'cat README.md', 'mkdir logs', 'cp .env.example .env'].map(
                    (cmd, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentInput(cmd)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                      >
                        {cmd}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ACTIVITY C: GUIDED COMMAND CHALLENGES */}
            {activeActivityTab === 'command-challenges' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <div className="max-w-3xl mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                    <Compass className="w-3.5 h-3.5" />
                    <span>State-Evaluated Interactive Drills</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Step-by-Step Linux Command Challenges
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Execute the required tasks in the terminal below. The system validates the resulting filesystem state, not just arbitrary string matches.
                  </p>
                </div>

                {/* Active Challenge Box */}
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-5 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Challenge {challengeStep + 1} of {challenges.length}
                    </span>
                    <span className="text-xs font-mono text-emerald-700">
                      Expected command: {challenges[challengeStep].expectedCommand}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">{challenges[challengeStep].title}</h4>
                  <p className="text-xs text-slate-700 mb-3">{challenges[challengeStep].instruction}</p>
                  <div className="text-[11px] text-emerald-800 bg-white/80 p-2.5 rounded-lg border border-emerald-200 font-mono">
                    <strong>Hint:</strong> {challenges[challengeStep].hint}
                  </div>
                </div>

                {/* Embedded Terminal Window for Challenges */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
                  <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                    <span className="text-xs font-mono text-slate-400">devops@rootaccess-vps: {cwd}</span>
                    <span className="text-[11px] font-mono text-slate-500">Task Active</span>
                  </div>
                  <div className="p-4 font-mono text-xs text-slate-200 h-64 overflow-y-auto space-y-2">
                    {commandHistory.slice(-8).map((item, idx) => (
                      <div key={idx}>
                        {item.cmd && (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <span className="text-slate-500">devops@rootaccess:{item.cwd}$</span>
                            <span className="text-white font-bold">{item.cmd}</span>
                          </div>
                        )}
                        {item.output && (
                          <div className={`whitespace-pre-wrap mt-0.5 ${item.isError ? 'text-rose-400' : 'text-slate-300'}`}>
                            {item.output}
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>
                  <form onSubmit={handleTerminalSubmit} className="bg-slate-900/90 border-t border-slate-800 p-3 flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-xs font-bold pl-1">devops@rootaccess:{cwd}$</span>
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      placeholder={`Type command here (e.g. ${challenges[challengeStep].expectedCommand})...`}
                      className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-500 focus:outline-hidden"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Execute
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CHECKPOINTS */}
        {activeTab === 'checkpoints' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Knowledge Checkpoints (Day 2)</h3>
              <p className="text-xs text-slate-500">
                Confirm your command-line navigation and filesystem knowledge across 5 practical scenarios.
              </p>
            </div>

            {DEVOPS_DAY_2_DATA.checkpoints.map((cp, idx) => {
              const selectedOpt = checkpointAnswers[cp.id];
              const feedback = checkpointFeedback[cp.id];

              return (
                <div key={cp.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
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
                              ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 font-semibold'
                              : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                              isChosen ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
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
              mission={DEVOPS_DAY_2_MISSION}
              onSubmit={(sub) => submitAssignment(2, sub)}
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
              <h3 className="text-lg font-extrabold text-slate-900 mb-1">Linux Systems Interview Preparation (Day 2)</h3>
              <p className="text-xs text-slate-500">
                Master 5 fundamental Linux technical questions commonly asked in DevOps, SRE, and Cloud Engineer technical screenings.
              </p>
            </div>

            {DEVOPS_DAY_2_DATA.interviewQuestions.map((iq, idx) => {
              const isExpanded = expandedInterviewIdx === idx;
              return (
                <div key={iq.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <button
                    onClick={() => {
                      setExpandedInterviewIdx(isExpanded ? null : idx);
                      markInterviewReviewed(2);
                    }}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{iq.question}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {iq.targetRole}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
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
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      Question {quizActiveIndex + 1} of {DEVOPS_DAY_2_DATA.quizQuestions.length}
                    </span>
                    <span className="ml-3 text-[11px] font-semibold text-slate-400">
                      Domain: {DEVOPS_DAY_2_DATA.quizQuestions[quizActiveIndex].domain}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Passing: 80% (8/10)</span>
                </div>

                {/* Question */}
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  {DEVOPS_DAY_2_DATA.quizQuestions[quizActiveIndex].question}
                </h3>

                {/* Options */}
                <div className="space-y-2.5 mb-8">
                  {DEVOPS_DAY_2_DATA.quizQuestions[quizActiveIndex].options.map((option, optIdx) => {
                    const qId = DEVOPS_DAY_2_DATA.quizQuestions[quizActiveIndex].id;
                    const isSelected = selectedQuizAnswers[qId] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizAnswer(qId, optIdx)}
                        className={`w-full text-left p-4 rounded-xl text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-950 font-semibold'
                            : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
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
                    Answered {Object.keys(selectedQuizAnswers).length} of {DEVOPS_DAY_2_DATA.quizQuestions.length}
                  </div>

                  {quizActiveIndex < DEVOPS_DAY_2_DATA.quizQuestions.length - 1 ? (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      disabled={Object.keys(selectedQuizAnswers).length < DEVOPS_DAY_2_DATA.quizQuestions.length}
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
                        to="/courses/devops-engineering/day-3"
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
                      >
                        <span>Proceed to Day 3: Permissions & Processes</span>
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
