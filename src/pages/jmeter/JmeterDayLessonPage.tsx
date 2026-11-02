import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Sparkles,
  HelpCircle,
  Award,
  ArrowRight,
  AlertCircle,
  Lightbulb,
  Briefcase,
  Play,
  RotateCcw,
  Target,
  Layers,
  Activity,
  Terminal,
  FileCheck,
  Zap,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useProgress } from '../../context/ProgressContext';
import { CourseEnrollmentGate } from '../../components/common/CourseEnrollmentGate';
import {
  JMETER_DAYS_DATA,
  JMETER_COURSE_METADATA,
  JmeterDayData,
} from '../../data/jmeterCurriculumData';

// Interactive Lab Components
import { JmeterConcurrencySimulator } from '../../components/jmeter/JmeterConcurrencySimulator';
import { JmeterTestPlanBuilder } from '../../components/jmeter/JmeterTestPlanBuilder';
import { JmeterHttpRequestStudio } from '../../components/jmeter/JmeterHttpRequestStudio';
import { JmeterAssertionValidator } from '../../components/jmeter/JmeterAssertionValidator';
import { JmeterCsvParameterizer } from '../../components/jmeter/JmeterCsvParameterizer';
import { JmeterJsonExtractorCorrelator } from '../../components/jmeter/JmeterJsonExtractorCorrelator';
import { JmeterWorkloadDesigner } from '../../components/jmeter/JmeterWorkloadDesigner';
import { JmeterMetricsDashboard } from '../../components/jmeter/JmeterMetricsDashboard';
import { JmeterCommandLineBuilder } from '../../components/jmeter/JmeterCommandLineBuilder';
import { JmeterFinalProjectWorkbench } from '../../components/jmeter/JmeterFinalProjectWorkbench';

export const JmeterDayLessonPage: React.FC = () => {
  const { dayNum, dayNumber: dayParam } = useParams<{ dayNum?: string; dayNumber?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract day number from /day-1, /day/1, or route params
  const pathMatch = location.pathname.match(/day[/-]?([0-9]{1,2})/i);
  const parsedDayFromPath = pathMatch ? parseInt(pathMatch[1], 10) : NaN;
  const parsedDayFromParam = parseInt(dayNum || dayParam || '', 10);
  const dayNumber = !isNaN(parsedDayFromPath)
    ? parsedDayFromPath
    : !isNaN(parsedDayFromParam)
    ? parsedDayFromParam
    : 1;

  const { isCourseEnrolled, isLessonCompleted, markLessonComplete } = useProgress();
  const isEnrolled = isCourseEnrolled('jmeter-performance-testing');

  const dayData: JmeterDayData =
    JMETER_DAYS_DATA.find((d) => d.dayNumber === dayNumber) || JMETER_DAYS_DATA[0];

  // Active section tab
  type TabType = 'concept' | 'demo' | 'lab' | 'challenge' | 'checkpoint' | 'quiz';
  const [activeTab, setActiveTab] = useState<TabType>('concept');
  const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);

  // Challenge state
  const [showChallengeHint, setShowChallengeHint] = useState(false);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(() => {
    return localStorage.getItem(`rootaccess_jmeter_challenge_d${dayNumber}`) === 'true';
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<{ score: number; percentage: number; passed: boolean } | null>(null);
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  // Checkpoint review state (for Days 3, 6, 9)
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<string, number>>({});
  const [checkpointSubmitted, setCheckpointSubmitted] = useState(false);

  // Lesson completion tracking
  const lessonKey = `jmeter-day-${dayNumber}`;
  const isCompleted = isLessonCompleted(lessonKey);

  // Reset tab and scroll when day changes
  useEffect(() => {
    setActiveTab('concept');
    setSelectedTopicIdx(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setShowChallengeHint(false);
    setRevealedHints({});
    setCheckpointAnswers({});
    setCheckpointSubmitted(false);
    setChallengeCompleted(localStorage.getItem(`rootaccess_jmeter_challenge_d${dayNumber}`) === 'true');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dayNumber]);

  const handleSelectQuizOption = (qId: string, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    const questions = dayData.quiz.questions;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= dayData.quiz.passingScorePercent;
    const res = { score: correctCount, percentage, passed };
    setQuizScore(res);
    setQuizSubmitted(true);

    if (passed) {
      markLessonComplete(lessonKey);
    }
  };

  const handleRetryQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleToggleChallengeDone = () => {
    const nextVal = !challengeCompleted;
    setChallengeCompleted(nextVal);
    localStorage.setItem(`rootaccess_jmeter_challenge_d${dayNumber}`, String(nextVal));
    if (nextVal && !isCompleted && quizScore?.passed) {
      markLessonComplete(lessonKey);
    }
  };

  const renderLabComponent = () => {
    switch (dayData.practicalLab.labType) {
      case 'concurrency_simulator':
        return <JmeterConcurrencySimulator />;
      case 'test_plan_builder':
        return <JmeterTestPlanBuilder />;
      case 'http_request_studio':
        return <JmeterHttpRequestStudio />;
      case 'assertion_validator':
        return <JmeterAssertionValidator />;
      case 'csv_parameterizer':
        return <JmeterCsvParameterizer />;
      case 'json_extractor_correlator':
        return <JmeterJsonExtractorCorrelator />;
      case 'workload_designer':
        return <JmeterWorkloadDesigner />;
      case 'metrics_dashboard':
        return <JmeterMetricsDashboard />;
      case 'command_line_builder':
        return <JmeterCommandLineBuilder />;
      case 'capstone_project':
        return (
          <JmeterFinalProjectWorkbench
            onCompleteProject={() => markLessonComplete(lessonKey)}
            isCompleted={isCompleted}
          />
        );
      default:
        return <JmeterConcurrencySimulator />;
    }
  };

  const content = (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      {/* Top Banner Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Breadcrumbs & Title */}
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Link to="/courses" className="hover:text-amber-400 transition-colors">Courses</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link to="/courses/jmeter-performance-testing" className="hover:text-amber-400 transition-colors">Apache JMeter</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-amber-400 font-semibold">Day {dayNumber} of 10</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {dayData.badge}
              </span>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Day {dayNumber}: {dayData.title}
              </h1>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>Day Completed</span>
              </span>
            ) : (
              <button
                onClick={() => markLessonComplete(lessonKey)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-500" />
                <span>Mark Completed</span>
              </button>
            )}

            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
              <button
                onClick={() => dayNumber > 1 && navigate(`/courses/jmeter-performance-testing/day-${dayNumber - 1}`)}
                disabled={dayNumber <= 1}
                className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800 transition-colors"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-medium px-2 text-slate-400">
                {dayNumber}/10
              </span>
              <button
                onClick={() => dayNumber < 10 && navigate(`/courses/jmeter-performance-testing/day-${dayNumber + 1}`)}
                disabled={dayNumber >= 10}
                className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-800 transition-colors"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Day Pills Bar */}
        <div className="border-t border-slate-800/60 bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5">
            {JMETER_DAYS_DATA.map((d) => {
              const dActive = d.dayNumber === dayNumber;
              const dDone = isLessonCompleted(`jmeter-day-${d.dayNumber}`);
              return (
                <Link
                  key={d.dayNumber}
                  to={`/courses/jmeter-performance-testing/day-${d.dayNumber}`}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    dActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : dDone
                      ? 'bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/40 border border-emerald-800/40'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/60'
                  }`}
                >
                  {dDone ? <CheckCircle2 className="w-3 h-3" /> : <span>Day {d.dayNumber}</span>}
                  <span className="truncate max-w-[120px]">{d.title.split(':')[0]}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 mb-6 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => setActiveTab('concept')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all border-b-2 -mb-[2px] cursor-pointer ${
              activeTab === 'concept'
                ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Concept & Visuals</span>
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all border-b-2 -mb-[2px] cursor-pointer ${
              activeTab === 'demo'
                ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>2. Guided Demo</span>
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all border-b-2 -mb-[2px] cursor-pointer ${
              activeTab === 'lab'
                ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>3. Practical Lab</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab('challenge')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all border-b-2 -mb-[2px] cursor-pointer ${
              activeTab === 'challenge'
                ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>4. Challenge</span>
            {challengeCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          {dayData.checkpointReview && (
            <button
              onClick={() => setActiveTab('checkpoint')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all border-b-2 -mb-[2px] cursor-pointer ${
                activeTab === 'checkpoint'
                  ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                  : 'border-transparent text-amber-400/80 hover:text-amber-300 hover:bg-slate-900/60'
              }`}
            >
              <FileCheck className="w-4 h-4 text-amber-400" />
              <span>Checkpoint Review</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all border-b-2 -mb-[2px] cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-amber-400 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>5. Knowledge Check</span>
            {quizScore?.passed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>

        {/* TAB 1: CONCEPT & VISUALS */}
        {activeTab === 'concept' && (
          <div className="space-y-8">
            {/* Intro & Objectives Card */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    Overview • Duration: {dayData.duration}
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {dayData.subtitle}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                    {dayData.introduction}
                  </p>
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  What You Will Learn & Build Today:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dayData.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-xs text-slate-300 leading-relaxed font-medium">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Explanation Diagram Card */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-950 border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-amber-400 font-bold">
                      Interactive Visual Architecture
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {dayData.visualExplanation.title}
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  Model: {dayData.visualExplanation.diagramType.toUpperCase()}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                {dayData.visualExplanation.description}
              </p>

              {/* Stages / Diagram Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dayData.visualExplanation.stepsOrStages.map((stage, idx) => (
                  <div
                    key={idx}
                    className="relative bg-slate-950/80 border border-slate-800 rounded-xl p-5 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          Stage {idx + 1}
                        </span>
                        {stage.status && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                            {stage.status}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white">{stage.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{stage.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In-Depth Core Topics */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  Core Theoretical & Practical Modules
                </h3>
                <span className="text-xs text-slate-400">
                  {dayData.topics.length} Modules Detailed
                </span>
              </div>

              {/* Topic Selector Tabs */}
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2">
                {dayData.topics.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTopicIdx(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedTopicIdx === idx
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {idx + 1}. {t.title}
                  </button>
                ))}
              </div>

              {/* Active Topic Details */}
              {dayData.topics[selectedTopicIdx] && (() => {
                const topic = dayData.topics[selectedTopicIdx];
                return (
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div>
                      <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                        Topic {selectedTopicIdx + 1} of {dayData.topics.length}
                      </span>
                      <h4 className="text-xl font-bold text-white mt-1">{topic.title}</h4>
                      <p className="text-sm text-slate-300 mt-2 font-medium bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                        {topic.summary}
                      </p>
                    </div>

                    {/* Detailed Explanation */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Technical Deep Dive:
                      </h5>
                      <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 font-sans">
                        {topic.explanation}
                      </div>
                    </div>

                    {/* Real World Example */}
                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                        <Briefcase className="w-4 h-4" />
                        <span>Production Engineering Example:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {topic.realWorldExample}
                      </p>
                    </div>

                    {/* JMeter Element Mapping (if present) */}
                    {topic.jmeterElementMapping && (
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                            Apache JMeter 5.6.3 Element Mapping
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            Category: {topic.jmeterElementMapping.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 font-mono text-xs font-bold">
                            {topic.jmeterElementMapping.elementName}
                          </div>
                          <p className="text-xs text-slate-300">{topic.jmeterElementMapping.purpose}</p>
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                            Key Config Parameters:
                          </span>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">
                            {topic.jmeterElementMapping.keySettings.map((setting, sIdx) => (
                              <li key={sIdx} className="text-xs font-mono text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800/60 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                <span>{setting}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Common Mistakes & Key Takeaways Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                          <AlertCircle className="w-4 h-4" />
                          <span>Common Rookie Mistakes:</span>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1.5">
                          {topic.commonMistakes.map((m, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-2">
                              <span className="text-rose-400 font-bold">•</span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Key Architectural Takeaways:</span>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1.5">
                          {topic.keyTakeaways.map((k, kIdx) => (
                            <li key={kIdx} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{k}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400">Finished reviewing concepts?</span>
              <button
                onClick={() => setActiveTab('demo')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs cursor-pointer"
              >
                <span>Proceed to Guided Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: GUIDED DEMONSTRATION */}
        {activeTab === 'demo' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Play className="w-4 h-4" />
                <span>Instructor Walkthrough</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                {dayData.guidedDemonstration.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {dayData.guidedDemonstration.description}
              </p>
            </div>

            {/* Walkthrough Steps */}
            <div className="space-y-4">
              {dayData.guidedDemonstration.walkthroughSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-xs font-bold">
                        {step.stepNumber}
                      </div>
                      <h4 className="text-sm font-bold text-white">{step.actionTitle}</h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 flex-shrink-0">
                      Target: {step.uiTarget}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Expected JMeter Behavior:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{step.expectedBehavior}</p>
                    </div>
                    <div className="bg-amber-500/5 p-3 rounded-lg border border-amber-500/20">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        Why It Matters:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{step.whyItMatters}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('concept')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Concepts</span>
              </button>
              <button
                onClick={() => setActiveTab('lab')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs cursor-pointer"
              >
                <span>Launch Practical Lab</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: STEP-BY-STEP PRACTICAL LAB */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Header */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Hands-On Interactive Simulation Environment
                </span>
                <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                  Tool: Apache JMeter 5.6.3 Simulation Engine
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">{dayData.practicalLab.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {dayData.practicalLab.subtitle}
              </p>

              {/* Instruction Steps */}
              <div className="pt-4 border-t border-slate-800/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Lab Objectives & Step-by-Step Instructions:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dayData.practicalLab.instructionSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                      <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Embedded Interactive Lab Component */}
            <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/40 p-4 sm:p-6">
              {renderLabComponent()}
            </div>

            {/* Success Criteria & Hints */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Expected Success Criteria:
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {dayData.practicalLab.expectedSuccessCriteria.map((crit, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Helpful Lab Hints:
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {dayData.practicalLab.hints.map((hint, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('demo')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Demo</span>
              </button>
              <button
                onClick={() => setActiveTab('challenge')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs cursor-pointer"
              >
                <span>Take the Independent Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: INDEPENDENT CHALLENGE */}
        {activeTab === 'challenge' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Independent Performance Engineering Challenge
                </span>
                <span className="text-[11px] font-mono bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded border border-rose-500/20">
                  Defect Resolution & Optimization
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                {dayData.independentChallenge.title}
              </h2>
            </div>

            {/* Scenario & Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  The Problem Scenario:
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {dayData.independentChallenge.scenario}
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Your Engineering Goal:
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {dayData.independentChallenge.goal}
                </p>
              </div>
            </div>

            {/* Broken Configuration / Code Inspection */}
            {dayData.independentChallenge.brokenConfiguration && (
              <div className="bg-slate-950 border border-rose-500/20 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-rose-400 font-bold uppercase flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    Broken Test Plan Configuration (JMX State)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Inspect & diagnose errors</span>
                </div>
                <pre className="text-xs font-mono text-slate-300 bg-slate-900 p-4 rounded-lg overflow-x-auto border border-slate-800">
                  {JSON.stringify(dayData.independentChallenge.brokenConfiguration, null, 2)}
                </pre>
              </div>
            )}

            {/* Solution Criteria & Common Pitfalls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Acceptance / Solution Criteria:
                </h3>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {dayData.independentChallenge.solutionCriteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-5 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Common Traps to Avoid:
                </h3>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  {dayData.independentChallenge.commonPitfalls.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hint Drawer */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-300">Stuck or Need a Hint?</span>
                </div>
                <button
                  onClick={() => setShowChallengeHint(!showChallengeHint)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                >
                  {showChallengeHint ? 'Hide Hints' : 'Reveal Hints'}
                </button>
              </div>

              {showChallengeHint && (
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  {dayData.independentChallenge.hints.map((hint, idx) => (
                    <div key={idx} className="text-xs text-slate-300 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Challenge Completion Checkbox */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Challenge Completion Verification</h4>
                <p className="text-xs text-slate-400">
                  Have you tested the scenario and validated your configuration against all criteria?
                </p>
              </div>

              <button
                onClick={handleToggleChallengeDone}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  challengeCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{challengeCompleted ? 'Challenge Solved ✓' : 'Mark Challenge Completed'}</span>
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('lab')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Lab</span>
              </button>
              <button
                onClick={() => setActiveTab(dayData.checkpointReview ? 'checkpoint' : 'quiz')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs cursor-pointer"
              >
                <span>{dayData.checkpointReview ? 'Go to Checkpoint Review' : 'Take Knowledge Check'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* CHECKPOINT REVIEW TAB (Days 3, 6, 9) */}
        {activeTab === 'checkpoint' && dayData.checkpointReview && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Cumulative Milestones Checkpoint
                </span>
                <span className="text-[11px] font-mono bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 font-bold">
                  Covering {dayData.checkpointReview.coveredDays}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">{dayData.checkpointReview.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {dayData.checkpointReview.scenarioDescription}
              </p>
            </div>

            {/* Practical Cumulative Tasks */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                Required Cumulative Audit Tasks:
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {dayData.checkpointReview.practicalTasks.map((t) => (
                  <div key={t.taskNumber} className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-xs font-bold">
                        {t.taskNumber}
                      </span>
                      <h4 className="text-sm font-bold text-white">{t.description}</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Action Required:
                        </span>
                        <p className="text-slate-300">{t.actionRequired}</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                          Validation Check:
                        </span>
                        <p className="text-slate-300">{t.validationCheck}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkpoint Multi-Concept Questions */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Checkpoint Integration Assessment:
              </h3>

              <div className="space-y-6">
                {dayData.checkpointReview.reviewQuestions.map((q, qIndex) => {
                  const selectedIdx = checkpointAnswers[q.id];
                  const isSubmitted = checkpointSubmitted;
                  const isCorrect = selectedIdx === q.correctAnswerIndex;

                  return (
                    <div key={q.id} className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold mt-0.5">
                          {qIndex + 1}
                        </span>
                        <h4 className="text-sm font-medium text-white">{q.question}</h4>
                      </div>

                      <div className="space-y-2 pl-8">
                        {q.options.map((opt, optIdx) => {
                          let optStyle = 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300';
                          if (isSubmitted) {
                            if (optIdx === q.correctAnswerIndex) {
                              optStyle = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 font-semibold';
                            } else if (selectedIdx === optIdx) {
                              optStyle = 'border-rose-500/60 bg-rose-950/40 text-rose-300';
                            }
                          } else if (selectedIdx === optIdx) {
                            optStyle = 'border-amber-500 bg-amber-500/10 text-white font-semibold';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => !checkpointSubmitted && setCheckpointAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between cursor-pointer ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {isSubmitted && optIdx === q.correctAnswerIndex && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {isSubmitted && (
                        <div className={`mt-2 p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                        }`}>
                          <span className="font-bold block mb-1">
                            {isCorrect ? '✓ Correct Analysis' : '✕ Needs Revision:'}
                          </span>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!checkpointSubmitted ? (
                <button
                  onClick={() => setCheckpointSubmitted(true)}
                  disabled={Object.keys(checkpointAnswers).length < dayData.checkpointReview.reviewQuestions.length}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Submit Checkpoint Review Answers
                </button>
              ) : (
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setCheckpointAnswers({});
                      setCheckpointSubmitted(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Checkpoint Quiz</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Daily Knowledge Check</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: KNOWLEDGE CHECK QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Day {dayNumber} Knowledge Check
                </span>
                <span className="text-[11px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
                  Passing SLA: {dayData.quiz.passingScorePercent}% (
                  {Math.ceil((dayData.quiz.questions.length * dayData.quiz.passingScorePercent) / 100)} / {dayData.quiz.questions.length})
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Verify Your Mastery of Day {dayNumber}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Test your conceptual and practical comprehension of today's JMeter concepts. Each question includes in-depth explanations for correct answers and critiques of common misconceptions.
              </p>
            </div>

            {/* Quiz Results Card (if submitted) */}
            {quizScore && (
              <div
                className={`p-6 rounded-2xl border transition-all ${
                  quizScore.passed
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {quizScore.passed ? (
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {quizScore.passed ? 'Assessment Passed! Day Unlocked ✓' : 'Passing Threshold Not Met'}
                      </h3>
                      <p className="text-xs text-slate-300">
                        You scored {quizScore.score} / {dayData.quiz.questions.length} ({quizScore.percentage}%).
                        {quizScore.passed ? ' Great job! Progress has been saved to your transcript.' : ' Review the detailed explanations below and retry the quiz.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRetryQuiz}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Quiz</span>
                    </button>
                    {quizScore.passed && dayNumber < 10 && (
                      <button
                        onClick={() => navigate(`/courses/jmeter-performance-testing/day-${dayNumber + 1}`)}
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <span>Next: Day {dayNumber + 1}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {quizScore.passed && dayNumber === 10 && (
                      <Link
                        to="/courses/jmeter-performance-testing/certificate"
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <Award className="w-4 h-4" />
                        <span>View Verified Certificate</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
              {dayData.quiz.questions.map((q, qIdx) => {
                const selectedIdx = quizAnswers[q.id];
                const isSelected = selectedIdx !== undefined;
                const isCorrect = selectedIdx === q.correctAnswerIndex;
                const showHint = revealedHints[q.id];

                return (
                  <div
                    key={q.id}
                    className={`bg-slate-900/60 border rounded-2xl p-6 transition-all ${
                      quizSubmitted
                        ? isCorrect
                          ? 'border-emerald-500/40 bg-emerald-950/10'
                          : 'border-rose-500/40 bg-rose-950/10'
                        : isSelected
                        ? 'border-amber-500/30'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center text-xs font-bold mt-0.5">
                          {qIdx + 1}
                        </span>
                        <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                          {q.question}
                        </h3>
                      </div>

                      {q.hint && !quizSubmitted && (
                        <button
                          onClick={() => setRevealedHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                          className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 cursor-pointer flex-shrink-0"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
                        </button>
                      )}
                    </div>

                    {showHint && !quizSubmitted && (
                      <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{q.hint}</span>
                      </div>
                    )}

                    {/* Options */}
                    <div className="space-y-2.5 pl-0 sm:pl-9">
                      {q.options.map((opt, optIdx) => {
                        let optStyle = 'border-slate-800/80 bg-slate-950/60 hover:bg-slate-950 hover:border-slate-700 text-slate-300';
                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswerIndex) {
                            optStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold shadow-xs';
                          } else if (selectedIdx === optIdx) {
                            optStyle = 'border-rose-500 bg-rose-950/40 text-rose-300';
                          } else {
                            optStyle = 'border-slate-900 bg-slate-950/30 text-slate-500 opacity-60';
                          }
                        } else if (selectedIdx === optIdx) {
                          optStyle = 'border-amber-500 bg-amber-500/10 text-white font-semibold ring-1 ring-amber-500/50';
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={quizSubmitted}
                            onClick={() => handleSelectQuizOption(q.id, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${optStyle}`}
                          >
                            <span className="leading-relaxed">{opt}</span>
                            {quizSubmitted && optIdx === q.correctAnswerIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback & Wrong Option Explanations */}
                    {quizSubmitted && (
                      <div className="mt-4 pl-0 sm:pl-9 space-y-2 pt-3 border-t border-slate-800/80">
                        <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                          isCorrect
                            ? 'bg-emerald-500/10 text-emerald-200 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-200 border border-rose-500/20'
                        }`}>
                          <div className="font-bold mb-1 flex items-center gap-1.5">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span>Correct Answer!</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 text-rose-400" />
                                <span>Why this answer is incorrect:</span>
                              </>
                            )}
                          </div>
                          <p className="font-sans text-xs text-slate-300">{q.explanation}</p>
                        </div>

                        {/* Critique of the selected wrong option (if available) */}
                        {!isCorrect && selectedIdx !== undefined && q.wrongOptionExplanations && q.wrongOptionExplanations[selectedIdx] && (
                          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                            <span className="font-semibold text-rose-400 block mb-0.5">Misconception Note:</span>
                            {q.wrongOptionExplanations[selectedIdx]}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Bar */}
            {!quizSubmitted ? (
              <div className="sticky bottom-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Answered: <strong className="text-white">{Object.keys(quizAnswers).length}</strong> of{' '}
                  <strong className="text-white">{dayData.quiz.questions.length}</strong> questions
                </div>

                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length < dayData.quiz.questions.length}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit Knowledge Check & Check Score</span>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {quizScore?.passed ? 'Completed Day ' + dayNumber : 'Try again to achieve ≥ ' + dayData.quiz.passingScorePercent + '%'}
                </span>
                <button
                  onClick={handleRetryQuiz}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Answers & Retry</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Day Summary & Next Day Transition Footer */}
        <div className="mt-12 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>Day {dayNumber} Summary</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {dayData.daySummary}
          </p>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Course: <span className="text-white font-medium">{JMETER_COURSE_METADATA.title}</span> • {JMETER_COURSE_METADATA.brand}
            </div>

            <div className="flex items-center gap-3">
              {dayNumber > 1 && (
                <Link
                  to={`/courses/jmeter-performance-testing/day-${dayNumber - 1}`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  ← Day {dayNumber - 1}
                </Link>
              )}
              {dayNumber < 10 ? (
                <Link
                  to={`/courses/jmeter-performance-testing/day-${dayNumber + 1}`}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs"
                >
                  Continue to Day {dayNumber + 1} →
                </Link>
              ) : (
                <Link
                  to="/courses/jmeter-performance-testing/certificate"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Generate Course Certificate</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );

  // Day 1 is free preview; Days 2–10 require enrollment
  if (dayNumber > 1 && !isEnrolled) {
    return (
      <CourseEnrollmentGate
        courseTitle="Apache JMeter: Performance Testing from Zero to Practical"
        courseSlug="jmeter-performance-testing"
        bulletPoints={[
          '10 Days of hands-on Apache JMeter 5.6.3 practical curriculum',
          'Interactive Concurrency, Test Plan Builder, and REST API studios',
          'Dynamic CSV Parameterization & JSONPath correlation engines',
          'Non-GUI CLI execution command builder and HTML dashboards',
          'Capstone project with RootAccess performance certification',
        ]}
        backLink="/courses/jmeter-performance-testing"
        backLinkText="Back to Course Details"
      />
    );
  }

  return content;
};
