import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Code2,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Lightbulb,
  Briefcase,
  Bot,
  Copy,
  Check,
  CheckSquare,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useProgress } from '../../context/ProgressContext';
import { CourseEnrollmentGate } from '../../components/common/CourseEnrollmentGate';
import {
  AGENTIC_DAYS_DATA,
  AGENTIC_AI_COURSE_METADATA,
  AgenticDayData,
} from '../../data/agenticAiCurriculumData';
import { AgentExecutionStudio } from '../../components/agentic/AgentExecutionStudio';
import { AgentAiAssistantModal } from '../../components/agentic/AgentAiAssistantModal';

export const AgenticDayLessonPage: React.FC = () => {
  const { dayNumber: dayParam, dayNum } = useParams<{ dayNumber?: string; dayNum?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract day number from /day-1, /day/1, or params (1 to 7)
  const pathMatch = location.pathname.match(/day[/-]?([0-9]{1,2})/i);
  const parsedDayFromPath = pathMatch ? parseInt(pathMatch[1], 10) : NaN;
  const parsedDayFromParam = parseInt(dayParam || dayNum || '', 10);
  const dayNumber = !isNaN(parsedDayFromPath)
    ? parsedDayFromPath
    : !isNaN(parsedDayFromParam)
    ? parsedDayFromParam
    : 1;

  const { isCourseEnrolled, isLessonCompleted, markLessonComplete } = useProgress();
  const isEnrolled = isCourseEnrolled('ai-agent-development');

  const dayData: AgenticDayData =
    AGENTIC_DAYS_DATA.find((d) => d.dayNumber === dayNumber) || AGENTIC_DAYS_DATA[0];

  type TabType = 'concept' | 'studio' | 'challenge' | 'interview' | 'quiz';
  const [activeTab, setActiveTab] = useState<TabType>('concept');
  const [currentTopicIdx, setCurrentTopicIdx] = useState(0);

  // Roo AI Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Challenge state
  const [showChallengeHint, setShowChallengeHint] = useState(false);
  const [copiedChallenge, setCopiedChallenge] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<{ score: number; percentage: number; passed: boolean } | null>(null);

  // Interview state
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState<number | null>(null);

  // Day 7 Capstone state
  const [capstoneSubmitted, setCapstoneSubmitted] = useState(() => {
    return localStorage.getItem('rootaccess_agentic_capstone_submitted') === 'true';
  });

  const lessonId = `agentic-day-${dayNumber}`;
  const isDayCompleted = isLessonCompleted(lessonId);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('concept');
    setCurrentTopicIdx(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
    setShowChallengeHint(false);
    setExpandedInterviewIdx(null);
  }, [dayNumber]);

  // Day 1 is Free Preview. Days 2-7 require enrollment
  if (!isEnrolled && dayNumber > 1) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
          <div className="mb-6 flex items-center justify-between">
            <Link
              to="/courses/ai-agent-development"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Syllabus</span>
            </Link>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
              Day {dayNumber} of 7 (Enrolled Members Only)
            </span>
          </div>

          <CourseEnrollmentGate
            courseSlug="ai-agent-development"
            courseTitle={AGENTIC_AI_COURSE_METADATA.title}
            bulletPoints={AGENTIC_AI_COURSE_METADATA.outcomes.slice(0, 4)}
          />
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuizAnswer = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const submitQuiz = () => {
    const questions = dayData.quiz.questions;
    let correct = 0;
    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        correct += 1;
      }
    });
    const percentage = Math.round((correct / questions.length) * 100);
    const passed = percentage >= dayData.quiz.passingScorePercent;
    setQuizScore({ score: correct, percentage, passed });
    setQuizSubmitted(true);

    if (passed) {
      markLessonComplete(lessonId);
    }
  };

  const handleNextDay = () => {
    if (dayNumber < 7) {
      navigate(`/courses/ai-agent-development/day-${dayNumber + 1}`);
    } else {
      navigate('/courses/ai-agent-development/certificate');
    }
  };

  const handleCopyChallenge = () => {
    navigator.clipboard.writeText(dayData.challenge.starterCode);
    setCopiedChallenge(true);
    setTimeout(() => setCopiedChallenge(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar />

      {/* Course Context Header */}
      <header className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                to="/courses/ai-agent-development"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="View Course Syllabus"
              >
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200">
                    Day {dayNumber} of 7
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-slate-500">
                    {dayData.estimatedMinutes} mins
                  </span>
                  {isDayCompleted && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  )}
                </div>
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {dayData.title}
                </h1>
              </div>
            </div>

            {/* Quick Actions & AI Mentor Button */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Ask Roo AI Mentor</span>
              </button>

              <div className="h-5 w-px bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigate(`/courses/ai-agent-development/day-${Math.max(1, dayNumber - 1)}`)}
                  disabled={dayNumber === 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Previous Day"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold text-slate-600 px-2">
                  {dayNumber}/7
                </span>
                <button
                  onClick={() => navigate(`/courses/ai-agent-development/day-${Math.min(7, dayNumber + 1)}`)}
                  disabled={dayNumber === 7}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Next Day"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 mt-3 pt-2 border-t border-slate-100 overflow-x-auto scrollbar-none">
            {[
              { id: 'concept', label: '1. Concepts & Code', icon: BookOpen },
              { id: 'studio', label: '2. Agent Studio', icon: Bot, badge: 'Interactive' },
              { id: 'challenge', label: '3. Daily Challenge', icon: Code2 },
              { id: 'interview', label: '4. Interview Prep', icon: Briefcase },
              { id: 'quiz', label: '5. Knowledge Check', icon: HelpCircle, badge: 'Required' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-700' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-cyan-200/80 text-cyan-900'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* TAB 1: CONCEPTS & CODE */}
        {activeTab === 'concept' && (
          <div className="space-y-8">
            {/* Topic Navigation Sub-tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs flex items-center gap-1 overflow-x-auto scrollbar-none">
              {dayData.topics.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTopicIdx(idx)}
                  className={`flex-1 min-w-[200px] text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentTopicIdx === idx
                      ? 'bg-cyan-50 text-cyan-900 border border-cyan-200 shadow-2xs font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="block text-[10px] text-cyan-700 uppercase tracking-wider font-mono">
                    Topic {idx + 1}
                  </span>
                  <span className="line-clamp-1">{t.title}</span>
                </button>
              ))}
            </div>

            {/* Current Topic Body */}
            {dayData.topics[currentTopicIdx] && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
                    {dayData.topics[currentTopicIdx].title}
                  </h2>
                  <p className="text-sm text-cyan-800 font-medium bg-cyan-50/80 border border-cyan-100 p-3 rounded-xl">
                    {dayData.topics[currentTopicIdx].summary}
                  </p>
                </div>

                <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {dayData.topics[currentTopicIdx].explanation}
                </div>

                {/* Code Snippet if present */}
                {dayData.topics[currentTopicIdx].codeSnippet && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>{dayData.topics[currentTopicIdx].codeSnippet?.filename || 'code_example.py'}</span>
                      <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100">
                        {dayData.topics[currentTopicIdx].codeSnippet?.language}
                      </span>
                    </div>
                    <pre className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-5 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
                      <code>{dayData.topics[currentTopicIdx].codeSnippet?.code}</code>
                    </pre>
                    {dayData.topics[currentTopicIdx].codeSnippet?.explanation && (
                      <p className="text-xs text-slate-500 italic">
                        💡 {dayData.topics[currentTopicIdx].codeSnippet?.explanation}
                      </p>
                    )}
                  </div>
                )}

                {/* Real-World Scenario */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5 text-cyan-600" />
                    Real-World Production Scenario:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dayData.topics[currentTopicIdx].realWorldScenario}
                  </p>
                </div>

                {/* Common Mistakes & Key Takeaways Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
                    <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5 uppercase tracking-wider">
                      ⚠️ Common Pitfalls to Avoid:
                    </span>
                    <ul className="text-xs text-rose-900 space-y-1.5 list-disc pl-4">
                      {dayData.topics[currentTopicIdx].commonMistakes.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
                      ✨ Key Architectural Takeaways:
                    </span>
                    <ul className="text-xs text-emerald-900 space-y-1.5 list-disc pl-4">
                      {dayData.topics[currentTopicIdx].keyTakeaways.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Topic Stepper Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentTopicIdx((prev) => Math.max(0, prev - 1))}
                    disabled={currentTopicIdx === 0}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    Previous Topic
                  </button>

                  <div className="flex gap-1.5">
                    {dayData.topics.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          currentTopicIdx === i ? 'bg-cyan-600' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>

                  {currentTopicIdx < dayData.topics.length - 1 ? (
                    <button
                      onClick={() => setCurrentTopicIdx((prev) => Math.min(dayData.topics.length - 1, prev + 1))}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white transition-colors cursor-pointer"
                    >
                      Next Topic
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('studio')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Proceed to Studio</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: AGENT STUDIO */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Bot className="w-5 h-5 text-cyan-600" />
                <span>{dayData.lab.title}</span>
              </h2>
              <p className="text-xs text-slate-600 mb-4">{dayData.lab.description}</p>

              <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-100 text-xs text-cyan-900 space-y-1">
                <span className="font-bold uppercase tracking-wider text-[10px] text-cyan-700 block">
                  Studio Instructions:
                </span>
                <ul className="list-disc pl-4 space-y-0.5">
                  {dayData.lab.instructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ul>
              </div>
            </div>

            {dayNumber === 7 && capstoneSubmitted && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Capstone Project Verified &amp; Submitted!</span>
                </span>
                <Link
                  to="/courses/ai-agent-development/certificate"
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs transition-colors"
                >
                  View Certificate
                </Link>
              </div>
            )}

            <AgentExecutionStudio
              dayNumber={dayNumber}
              onProjectCompleted={() => {
                setCapstoneSubmitted(true);
                markLessonComplete(lessonId);
              }}
            />
          </div>
        )}

        {/* TAB 3: DAILY CHALLENGE */}
        {activeTab === 'challenge' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">
                <Code2 className="w-4 h-4" />
                <span>Hands-on Code Challenge</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{dayData.challenge.title}</h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {dayData.challenge.description}
              </p>
            </div>

            {/* Starter Code Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                  Python Starter Code:
                </span>
                <button
                  onClick={handleCopyChallenge}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:text-cyan-800 cursor-pointer"
                >
                  {copiedChallenge ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedChallenge ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="bg-slate-900 text-slate-100 rounded-2xl p-5 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{dayData.challenge.starterCode}</code>
              </pre>
            </div>

            {/* Verification Checklist */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-cyan-600" />
                Acceptance Criteria / Verification Checklist:
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5">
                {dayData.challenge.verificationCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hint Box */}
            <div className="pt-2">
              <button
                onClick={() => setShowChallengeHint(!showChallengeHint)}
                className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{showChallengeHint ? 'Hide Implementation Hint' : 'Need a Hint?'}</span>
              </button>
              {showChallengeHint && (
                <div className="mt-3 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-mono leading-relaxed">
                  💡 {dayData.challenge.solutionHint}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: INTERVIEW PREPARATION */}
        {activeTab === 'interview' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">
                <Briefcase className="w-4 h-4" />
                <span>Technical Interview Preparation</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Agentic AI Questions Asked at Modern AI Labs
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Study ideal answers and understand what hiring managers evaluate in agent design interviews.
              </p>
            </div>

            <div className="space-y-4">
              {dayData.interviewQuestions.map((iq, idx) => {
                const isExpanded = expandedInterviewIdx === idx;
                return (
                  <div
                    key={iq.id}
                    className="border border-slate-200 rounded-2xl p-5 hover:border-cyan-300 transition-colors bg-white shadow-2xs"
                  >
                    <div
                      onClick={() => setExpandedInterviewIdx(isExpanded ? null : idx)}
                      className="flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider">
                          {iq.category}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-1.5">
                          {idx + 1}. {iq.question}
                        </h3>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600 p-1">
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-200 text-xs">
                        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                            Ideal Interview Response:
                          </span>
                          <p className="text-slate-700 leading-relaxed">{iq.idealAnswer}</p>
                        </div>

                        <div className="space-y-1">
                          <span className="font-bold text-cyan-800 uppercase tracking-wider text-[10px] block">
                            Interviewer Evaluation Points:
                          </span>
                          <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                            {iq.interviewerEvaluationPoints.map((pt, i) => (
                              <li key={i}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: KNOWLEDGE CHECK (QUIZ) */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Day {dayNumber} Assessment</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{dayData.quiz.title}</h2>
              <p className="text-xs text-slate-500 mt-1">
                Score ≥ {dayData.quiz.passingScorePercent}% (4 of 5 correct) to mark Day {dayNumber} complete and unlock course progress.
              </p>
            </div>

            {/* Score Banner */}
            {quizScore && (
              <div
                className={`p-5 rounded-2xl border flex items-center justify-between flex-wrap gap-4 ${
                  quizScore.passed
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {quizScore.passed ? (
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                      <RotateCcw className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-sm">
                      {quizScore.passed
                        ? `Passed! You scored ${quizScore.score}/5 (${quizScore.percentage}%)`
                        : `Not yet passed: Scored ${quizScore.score}/5 (${quizScore.percentage}%)`}
                    </h3>
                    <p className="text-xs opacity-90">
                      {quizScore.passed
                        ? `Great work! Day ${dayNumber} has been verified and marked complete.`
                        : `Review the detailed explanations below and click 'Retake Assessment' to try again.`}
                    </p>
                  </div>
                </div>

                {!quizScore.passed && (
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                      setQuizScore(null);
                    }}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Retake Assessment
                  </button>
                )}
              </div>
            )}

            {/* Question List */}
            <div className="space-y-6">
              {dayData.quiz.questions.map((q, qIdx) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correctAnswerIndex;
                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0">
                        {qIdx + 1}
                      </span>
                      <p className="text-sm font-bold text-slate-900 pt-0.5">{q.question}</p>
                    </div>

                    <div className="space-y-2 pl-8">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        let optionStyle =
                          'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                        if (quizSubmitted) {
                          if (optIdx === q.correctAnswerIndex) {
                            optionStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-900 font-bold';
                          } else if (isChosen) {
                            optionStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                          } else {
                            optionStyle = 'border-slate-100 bg-white opacity-50 text-slate-400';
                          }
                        } else if (isChosen) {
                          optionStyle = 'border-cyan-600 bg-cyan-50/70 text-cyan-900 font-semibold shadow-2xs';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleQuizAnswer(q.id, optIdx)}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIdx === q.correctAnswerIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="pl-8 pt-1">
                        <div
                          className={`p-3 rounded-xl text-xs leading-relaxed ${
                            isCorrect
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-100'
                              : 'bg-amber-50 text-amber-900 border border-amber-100'
                          }`}
                        >
                          <span className="font-bold block mb-0.5">
                            {isCorrect ? '✓ Correct Explanation:' : '💡 Clarification:'}
                          </span>
                          {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit Button */}
            {!quizSubmitted && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length < dayData.quiz.questions.length}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit Knowledge Check</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom Progression Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/courses/ai-agent-development"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Course Overview</span>
          </Link>

          <div className="flex items-center gap-3">
            {dayNumber > 1 && (
              <button
                onClick={() => navigate(`/courses/ai-agent-development/day-${dayNumber - 1}`)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Previous Day
              </button>
            )}

            <button
              onClick={handleNextDay}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{dayNumber === 7 ? 'Proceed to Certificate' : `Continue to Day ${dayNumber + 1}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Roo AI Assistant Modal */}
      <AgentAiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        currentDay={dayNumber}
      />

      <Footer />
    </div>
  );
};
