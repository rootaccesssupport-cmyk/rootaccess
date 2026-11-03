import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Code2,
  HelpCircle,
  Award,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Lightbulb,
  Briefcase,
  Terminal,
  Smartphone,
  ExternalLink,
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
  APPIUM_DAYS_DATA,
  APPIUM_COURSE_METADATA,
  AppiumDayData,
} from '../../data/appiumCurriculumData';
import { AppiumInteractiveStudio } from '../../components/appium/AppiumInteractiveStudio';
import { AppiumAiAssistantModal } from '../../components/appium/AppiumAiAssistantModal';

export const AppiumDayLessonPage: React.FC = () => {
  const { dayNumber: dayParam, dayNum } = useParams<{ dayNumber?: string; dayNum?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract day number from /day-1, /day/1, or params (1 to 14)
  const pathMatch = location.pathname.match(/day[/-]?([0-9]{1,2})/i);
  const parsedDayFromPath = pathMatch ? parseInt(pathMatch[1], 10) : NaN;
  const parsedDayFromParam = parseInt(dayParam || dayNum || '', 10);
  const dayNumber = !isNaN(parsedDayFromPath)
    ? parsedDayFromPath
    : !isNaN(parsedDayFromParam)
    ? parsedDayFromParam
    : 1;

  const { isCourseEnrolled, isLessonCompleted, markLessonComplete } = useProgress();
  const isEnrolled = isCourseEnrolled('appium-mobile-automation');

  const dayData: AppiumDayData =
    APPIUM_DAYS_DATA.find((d) => d.dayNumber === dayNumber) || APPIUM_DAYS_DATA[0];

  // Active section tab
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

  // Expanded interview questions
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState<number | null>(null);

  // Capstone project form state (Day 14)
  const [capstoneRepoUrl, setCapstoneRepoUrl] = useState('');
  const [capstoneNotes, setCapstoneNotes] = useState('');
  const [capstoneSubmitted, setCapstoneSubmitted] = useState(() => {
    return localStorage.getItem('rootaccess_appium_capstone_submitted') === 'true';
  });

  const lessonId = `appium-day-${dayNumber}`;
  const isDayCompleted = isLessonCompleted(lessonId);

  // Scroll to top and reset tab on day change
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

  // Day 1 is Free Preview. Days 2-14 require enrollment
  if (!isEnrolled && dayNumber > 1) {
    return (
      <CourseEnrollmentGate
        courseTitle={APPIUM_COURSE_METADATA.title}
        courseSlug="appium-mobile-automation"
        description={`Day 1 is a free preview for all learners. To unlock "${dayData.title}", all 14 interactive mobile testing studios, and the Capstone Project, please enroll.`}
        bulletPoints={[
          'Full access to all 14 daily hands-on modules (UiAutomator2, W3C Gestures, Hybrid Contexts, TestNG, POM)',
          '14 Interactive browser mobile studios simulating Android devices, UiAutomator2, and W3C Touch gestures',
          'Production-grade E-Commerce Mobile Capstone Project on SauceLabs SwagLabs APK',
          'Official RootAccess Appium Mobile Automation with Java Certificate of Completion',
        ]}
        backLink="/courses/appium-mobile-automation"
        backLinkText="Back to Course Syllabus"
        accentColor="indigo"
      />
    );
  }

  const handleQuizOptionSelect = (qId: string, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    dayData.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const percentage = Math.round((correct / dayData.quiz.length) * 100);
    const passed = percentage >= 80;
    setQuizScore({ score: correct, percentage, passed });
    setQuizSubmitted(true);

    if (passed) {
      markLessonComplete(lessonId, true);
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleCopySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedChallenge(true);
    setTimeout(() => setCopiedChallenge(false), 2000);
  };

  const handleCapstoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capstoneRepoUrl.trim()) return;
    localStorage.setItem('rootaccess_appium_capstone_submitted', 'true');
    setCapstoneSubmitted(true);
    markLessonComplete(lessonId, true);
  };

  const currentTopic = dayData.topics[currentTopicIdx] || dayData.topics[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* Course Hero & Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <Link
                  to="/courses/appium-mobile-automation"
                  className="hover:underline flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Appium Mobile Automation</span>
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-emerald-400">Day {dayNumber} of 14</span>
                {dayNumber === 1 && (
                  <span className="ml-2 px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                    Free Preview
                  </span>
                )}
                {isDayCompleted && (
                  <span className="ml-2 px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-500 text-white rounded-full flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Completed</span>
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Day {dayNumber}: {dayData.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {dayData.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/40 border border-emerald-400/30 transition transform hover:-translate-y-0.5"
              >
                <Bot className="w-4 h-4 text-emerald-200" />
                <span>Ask Roo AI</span>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              </button>

              {dayNumber < 14 ? (
                <button
                  onClick={() => navigate(`/courses/appium-mobile-automation/day-${dayNumber + 1}`)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition"
                >
                  <span>Next Day</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to="/courses/appium-mobile-automation/certificate"
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md transition"
                >
                  <Award className="w-4 h-4" />
                  <span>Certificate</span>
                </Link>
              )}
            </div>
          </div>

          {/* Module Quick Selector */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {APPIUM_DAYS_DATA.map((d) => {
              const active = d.dayNumber === dayNumber;
              const completed = isLessonCompleted(`appium-day-${d.dayNumber}`);
              return (
                <Link
                  key={d.dayNumber}
                  to={`/courses/appium-mobile-automation/day-${d.dayNumber}`}
                  className={`shrink-0 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition ${
                    active
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : completed
                      ? 'bg-slate-800/90 text-emerald-400 hover:bg-slate-800'
                      : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  ) : (
                    <span>D{d.dayNumber}</span>
                  )}
                  <span className="hidden sm:inline truncate max-w-[120px]">
                    {d.title.split(':')[0]}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-1 sm:gap-2 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('concept')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition shrink-0 ${
              activeTab === 'concept'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Concepts &amp; Theory ({dayData.topics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition shrink-0 ${
              activeTab === 'studio'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Interactive Mobile Studio</span>
            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
              Live
            </span>
          </button>

          <button
            onClick={() => setActiveTab('challenge')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition shrink-0 ${
              activeTab === 'challenge'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Hands-on Challenge</span>
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition shrink-0 ${
              activeTab === 'interview'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Interview Prep ({dayData.interviewQuestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition shrink-0 ${
              activeTab === 'quiz'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Checkpoint Quiz ({dayData.quiz.length} Qs)</span>
            {quizScore?.passed && (
              <span className="px-1.5 py-0.2 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                Passed
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Concepts & Theory */}
        {activeTab === 'concept' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Topic Navigation Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Day {dayNumber} Topics
                </h3>
                <div className="space-y-1">
                  {dayData.topics.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTopicIdx(idx)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                        currentTopicIdx === idx
                          ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className="truncate">{topic.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Day Learning Objectives Box */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <span>Day Objectives</span>
                </div>
                <ul className="text-xs text-emerald-800 space-y-1.5 list-disc list-inside">
                  {dayData.objectives.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Active Topic Content */}
            <div className="lg:col-span-3 space-y-6">
              {currentTopic && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                      Topic {currentTopicIdx + 1} of {dayData.topics.length}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {currentTopic.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      {currentTopic.summary}
                    </p>
                  </div>

                  {/* Topic Detailed Content */}
                  <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line space-y-4">
                    {currentTopic.explanation}
                  </div>

                  {/* Code Snippet Box */}
                  {currentTopic.codeSnippet && (
                    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 text-xs shadow-md">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                        <div className="flex items-center gap-2 font-mono text-emerald-400 text-xs">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>{currentTopic.codeSnippet.filename || 'Java 17+ Modern Mobile Automation Code'}</span>
                        </div>
                        <button
                          onClick={() =>
                            handleCopySnippet(currentTopic.codeSnippet!.code)
                          }
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition"
                        >
                          {copiedChallenge ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 sm:p-5 font-mono overflow-x-auto text-xs leading-relaxed text-emerald-300">
                        <code>{currentTopic.codeSnippet.code}</code>
                      </pre>
                      {currentTopic.codeSnippet.explanation && (
                        <div className="p-3 bg-slate-900/90 text-slate-300 text-xs border-t border-slate-800 italic">
                          💡 {currentTopic.codeSnippet.explanation}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Real World Scenario */}
                  {currentTopic.realWorldScenario && (
                    <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-950 space-y-1">
                      <span className="font-bold block text-blue-900">
                        🏢 Real-World Production Scenario:
                      </span>
                      <p className="text-blue-800 leading-relaxed">
                        {currentTopic.realWorldScenario}
                      </p>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {currentTopic.commonMistakes && currentTopic.commonMistakes.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                      <span className="font-bold block text-amber-900">
                        ⚠️ Common Mistakes to Avoid:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-amber-900">
                        {currentTopic.commonMistakes.map((mistake, mi) => (
                          <li key={mi}>{mistake}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Topic Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button
                      onClick={() => setCurrentTopicIdx((prev) => Math.max(0, prev - 1))}
                      disabled={currentTopicIdx === 0}
                      className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Topic</span>
                    </button>

                    {currentTopicIdx < dayData.topics.length - 1 ? (
                      <button
                        onClick={() => setCurrentTopicIdx((prev) => prev + 1)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs transition"
                      >
                        <span>Next Topic</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveTab('studio')}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1.5 shadow-xs transition"
                      >
                        <span>Launch Lab Studio</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Mobile Studio */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            <AppiumInteractiveStudio
              dayNumber={dayNumber}
              labSpec={dayData.lab}
              onComplete={() => {
                if (quizScore?.passed) {
                  markLessonComplete(lessonId, true);
                }
              }}
            />
          </div>
        )}

        {/* Tab 3: Hands-on Challenge */}
        {activeTab === 'challenge' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                    Independent Challenge
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {dayData.challenge.title}
                  </h2>
                </div>
                <div className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hands-On Mastery</span>
                </div>
              </div>

              {/* Scenario & Task */}
              <div className="space-y-3">
                <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Scenario:</span>
                  {dayData.challenge.scenario}
                </div>

                <div className="text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-emerald-50/40 p-4 sm:p-5 rounded-2xl border border-emerald-100">
                  <span className="font-bold text-emerald-950 block mb-1">Your Mission Task:</span>
                  {dayData.challenge.task}
                </div>
              </div>

              {/* Starter Snippet */}
              {dayData.challenge.starterSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>Starter Code Specification:</span>
                    <button
                      onClick={() => handleCopySnippet(dayData.challenge.starterSnippet!)}
                      className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
                    >
                      {copiedChallenge ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Starter Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                    <code>{dayData.challenge.starterSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Verification Checklist */}
              {dayData.challenge.verificationCriteria && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Verification Checklist
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1.5">
                    {dayData.challenge.verificationCriteria.map((crit, ci) => (
                      <li key={ci} className="flex items-start gap-2">
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hints Accordion */}
              {dayData.challenge.hints && dayData.challenge.hints.length > 0 && (
                <div className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setShowChallengeHint(!showChallengeHint)}
                    className="w-full px-5 py-3.5 bg-slate-50 hover:bg-slate-100 text-left text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between transition"
                  >
                    <span className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>Need hints to get started? ({dayData.challenge.hints.length} available)</span>
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${showChallengeHint ? 'rotate-90' : ''}`}
                    />
                  </button>
                  {showChallengeHint && (
                    <div className="p-5 text-xs sm:text-sm text-slate-700 bg-white border-t border-slate-200 space-y-2">
                      {dayData.challenge.hints.map((hint, hi) => (
                        <div key={hi} className="flex items-start gap-2">
                          <span className="font-bold text-amber-600 shrink-0">Hint {hi + 1}:</span>
                          <span>{hint}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Interview Prep */}
        {activeTab === 'interview' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Mobile QA Technical Interview Focus
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Day {dayNumber} Real-World Interview Questions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  These questions are frequently asked in tier-1 product and tech services interviews for SDET &amp; Mobile QA roles.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {dayData.interviewQuestions.map((iq, idx) => {
                  const isExpanded = expandedInterviewIdx === idx;
                  return (
                    <div
                      key={iq.id}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition"
                    >
                      <button
                        onClick={() => setExpandedInterviewIdx(isExpanded ? null : idx)}
                        className="w-full p-4 sm:p-5 bg-slate-50 hover:bg-slate-100/80 text-left flex items-start justify-between gap-4 transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                              Q{idx + 1}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              {iq.category}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {iq.question}
                          </h4>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="p-5 bg-white border-t border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <div className="whitespace-pre-line bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                            <span className="font-bold text-emerald-900 block mb-1">
                              Model Answer (SDET Level):
                            </span>
                            {iq.idealAnswer}
                          </div>

                          {iq.interviewerEvaluationPoints && iq.interviewerEvaluationPoints.length > 0 && (
                            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                              <span className="font-bold text-slate-800 block">
                                🎯 What Interviewers Look For:
                              </span>
                              <ul className="list-disc list-inside space-y-1 text-slate-600">
                                {iq.interviewerEvaluationPoints.map((ep, ei) => (
                                  <li key={ei}>{ep}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {iq.followUpQuestions && iq.followUpQuestions.length > 0 && (
                            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 space-y-1 text-xs">
                              <span className="font-bold text-blue-900 block">
                                💬 Common Follow-Up Questions:
                              </span>
                              <ul className="list-disc list-inside space-y-1 text-blue-800">
                                {iq.followUpQuestions.map((fq, fi) => (
                                  <li key={fi}>{fq}</li>
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
          </div>
        )}

        {/* Tab 5: Checkpoint Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Day 14 Capstone Project Workbench if Day 14 */}
            {dayNumber === 14 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 mb-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        Day 14 Capstone Project Submission
                      </h2>
                      <p className="text-xs text-slate-500">
                        E-Commerce Mobile Regression Suite on SauceLabs SwagLabs APK
                      </p>
                    </div>
                  </div>
                  {capstoneSubmitted && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Submitted</span>
                    </span>
                  )}
                </div>

                <form onSubmit={handleCapstoneSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      GitHub Repository URL (Public or Unlisted):
                    </label>
                    <input
                      type="url"
                      required
                      value={capstoneRepoUrl}
                      onChange={(e) => setCapstoneRepoUrl(e.target.value)}
                      placeholder="https://github.com/your-username/appium-ecommerce-framework"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Architecture Notes &amp; Framework Highlights:
                    </label>
                    <textarea
                      rows={3}
                      value={capstoneNotes}
                      onChange={(e) => setCapstoneNotes(e.target.value)}
                      placeholder="Mention your POM structure, TestNG parallel thread setup, Allure reporting, and CI workflow..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition"
                    >
                      {capstoneSubmitted ? 'Update Submission' : 'Submit Capstone Project'}
                    </button>
                    {capstoneSubmitted && (
                      <Link
                        to="/courses/appium-mobile-automation/certificate"
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 hover:underline"
                      >
                        <span>View Verified Certificate</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Assessment
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Day {dayNumber} Knowledge Check
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Answer all 5 questions. Achieve 80% (4/5) to mark Day {dayNumber} complete and unlock course progress.
                </p>
              </div>

              {/* Quiz Questions (Zero Pre-filled Answers) */}
              <div className="space-y-6">
                {dayData.quiz.map((q, qIdx) => {
                  const selected = quizAnswers[q.id];
                  const isAnswered = selected !== undefined;
                  const isCorrect = isAnswered && selected === q.correctAnswerIndex;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                    >
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {qIdx + 1}. {q.question}
                      </h4>

                      <div className="space-y-2">
                        {q.options.map((option, optIdx) => {
                          const isOptionSelected = selected === optIdx;
                          let btnStyle = 'border-slate-200 hover:bg-slate-100/80 bg-white text-slate-700';

                          if (quizSubmitted) {
                            if (optIdx === q.correctAnswerIndex) {
                              btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                            } else if (isOptionSelected && !isCorrect) {
                              btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                            } else {
                              btnStyle = 'border-slate-200 bg-white text-slate-400 opacity-60';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-2xs';
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleQuizOptionSelect(q.id, optIdx)}
                              disabled={quizSubmitted}
                              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center gap-3 ${btnStyle}`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-bold ${
                                  isOptionSelected
                                    ? 'border-emerald-600 bg-emerald-600 text-white'
                                    : 'border-slate-300 text-slate-500'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </div>
                              <span className="leading-snug">{option}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Reveal */}
                      {quizSubmitted && (
                        <div
                          className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                            isCorrect
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                              : 'bg-rose-50/60 border-rose-200 text-rose-900'
                          }`}
                        >
                          <span className="font-bold block mb-1">
                            {isCorrect ? '✅ Correct!' : '❌ Explanation:'}
                          </span>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Reset Actions */}
              <div className="pt-4 border-t border-slate-100">
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < dayData.quiz.length}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition"
                  >
                    Submit Answers ({Object.keys(quizAnswers).length}/{dayData.quiz.length} Answered)
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div
                      className={`p-4 rounded-2xl border text-center space-y-1 ${
                        quizScore?.passed
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : 'bg-rose-50 border-rose-300 text-rose-900'
                      }`}
                    >
                      <div className="text-xl font-bold">
                        {quizScore?.passed ? '🎉 Day Complete!' : 'Keep Practicing'}
                      </div>
                      <div className="text-xs sm:text-sm">
                        You scored {quizScore?.score} / {dayData.quiz.length} ({quizScore?.percentage}
                        %). Minimum required to pass: 80%.
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleResetQuiz}
                        className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-xs sm:text-sm text-slate-700 flex items-center justify-center gap-1.5 transition"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Retake Quiz</span>
                      </button>

                      {quizScore?.passed && dayNumber < 14 && (
                        <button
                          onClick={() => navigate(`/courses/appium-mobile-automation/day-${dayNumber + 1}`)}
                          className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition"
                        >
                          <span>Proceed to Day {dayNumber + 1}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}

                      {quizScore?.passed && dayNumber === 14 && (
                        <Link
                          to="/courses/appium-mobile-automation/certificate"
                          className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition text-center"
                        >
                          <Award className="w-4 h-4" />
                          <span>View Official Certificate</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Roo AI Modal */}
      <AppiumAiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        currentDay={dayNumber}
      />
    </div>
  );
};
