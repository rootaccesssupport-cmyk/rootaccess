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
  FileCheck,
  ShieldAlert,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useProgress } from '../../context/ProgressContext';
import { CourseEnrollmentGate } from '../../components/common/CourseEnrollmentGate';
import {
  AI_DAYS_DATA,
  AI_COURSE_METADATA,
  AiDayData,
} from '../../data/aiPromptCurriculumData';
import { PromptPlayground } from '../../components/ai/PromptPlayground';

export const AiDayLessonPage: React.FC = () => {
  const { dayNumber: dayParam } = useParams<{ dayNumber?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract day number from /day-1, /day/1, or params
  const pathMatch = location.pathname.match(/day[/-]?([1-7])/i);
  const parsedDayFromPath = pathMatch ? parseInt(pathMatch[1], 10) : NaN;
  const parsedDayFromParam = parseInt(dayParam || '', 10);
  const dayNumber = !isNaN(parsedDayFromPath)
    ? parsedDayFromPath
    : !isNaN(parsedDayFromParam)
    ? parsedDayFromParam
    : 1;

  const { isCourseEnrolled, isLessonCompleted, markLessonComplete } = useProgress();
  const isEnrolled = isCourseEnrolled('ai-prompt-engineering');

  const dayData: AiDayData =
    AI_DAYS_DATA.find((d) => d.dayNumber === dayNumber) || AI_DAYS_DATA[0];

  // Active section tab: 'topics' | 'practice' | 'scenarios' | 'quiz' | 'project'
  const [activeTab, setActiveTab] = useState<'topics' | 'practice' | 'scenarios' | 'quiz' | 'project'>('topics');
  const [currentTopicIdx, setCurrentTopicIdx] = useState(0);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<{ score: number; percentage: number; passed: boolean } | null>(null);

  // Day 7 Project Submission State
  const [projectForm, setProjectForm] = useState({
    taskTitle: 'Automated Customer Defect Triage & Executive Escalation',
    taskCategory: 'Workplace Operations',
    successCriteria: 'Extracts severity, repro steps, and drafting a 1-page executive delay notice with 0 PII.',
    initialPrompt: 'Review this bug and tell the VP about it.',
    initialOutput: 'There is a bug in the system. The VP should be aware so they can talk to the team.',
    improvedPrompt:
      'ROLE: Principal QA Architect\nTASK: Transform raw user bug reports into a structured Jira ticket and executive status alert.\nCONTEXT: E-commerce checkout OTP failure during Diwali flash sale.\nCONSTRAINTS: Under 250 words, non-defensive tone, zero customer PII.\nOUTPUT FORMAT: Markdown table with Jira fields followed by a 3-bullet executive summary.\nSUCCESS CRITERIA: Clear root-cause hypothesis and immediate remediation timeline.',
    sampleOutput:
      '### Jira Ticket Specification\n| Field | Value |\n| :--- | :--- |\n| Issue Type | Incident - Blocker |\n| Component | Checkout & Payment Gateway |\n| Severity | Critical (Revenue Impacting) |\n\n### Executive Summary\n• **Incident:** 35-minute checkout timeout impacting 120 orders; SSL cert renewed.\n• **Financial Safety:** 0 duplicate charges; all customer payment data intact.\n• **Action:** Priority recovery discount code issued to affected patrons.',
    improvementNotes:
      'Applied the 6-Part Framework. Added explicit constraints forbidding customer PII exposure. Imposed a tabular Jira format followed by an executive briefing for non-technical leadership.',
    verificationChecklist:
      '1. Confirmed that zero customer names or credit card numbers were pasted into the prompt.\n2. Verified all timestamps against staging server access logs.\n3. Audited that suggested SSL certificate commands match modern OpenSSL 3.0 syntax.\n4. Tested output readability with our engineering team lead.',
    privacyConfirmed: true,
  });
  const [projectSubmitted, setProjectSubmitted] = useState(() => {
    return localStorage.getItem('rootaccess_ai_project_submitted') === 'true';
  });
  const [projectEvaluation, setProjectEvaluation] = useState<{
    score: number;
    passed: boolean;
    breakdown: {
      taskDefinition: number;
      promptArchitecture: number;
      outputQuality: number;
      verification: number;
      responsibleAi: number;
    };
  } | null>(() => {
    try {
      const stored = localStorage.getItem('rootaccess_ai_project_eval');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Reset tab on day change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab(dayNumber === 7 ? 'project' : 'topics');
    setCurrentTopicIdx(0);
    setQuizSubmitted(false);
    setQuizScore(null);
  }, [dayNumber]);

  // Day 1 is Free Preview. Days 2–7 require enrollment
  if (!isEnrolled && dayNumber > 1) {
    return (
      <CourseEnrollmentGate
        courseTitle={AI_COURSE_METADATA.title}
        courseSlug="ai-prompt-engineering"
        description={`Day 1 is completely free for all learners. To access "${dayData.title}", advanced prompt engineering techniques, and the Final Capstone Project, please enroll.`}
        bulletPoints={[
          'Full 7-day comprehensive masterclass (Foundations, 6-Part Framework, Advanced Few-Shot, Workplace Synthesis, Responsible AI)',
          'Interactive Prompt Playground with live deterministic educational evaluations',
          'Build Your Personal AI Productivity Workflow Capstone Project',
          'Official RootAccess AI Fundamentals & Prompt Engineering Certificate of Completion',
        ]}
        backLink="/courses/ai-prompt-engineering"
        backLinkText="Back to Course Syllabus"
        accentColor="purple"
      />
    );
  }

  const lessonId = `ai-day-${dayNumber}`;
  const isDayCompleted = isLessonCompleted(lessonId);

  // Handle Quiz Submission
  const handleQuizSubmit = () => {
    const questions = dayData.quiz.questions;
    let correctCount = 0;

    questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= dayData.quiz.passingScorePercent;

    setQuizScore({
      score: correctCount,
      percentage,
      passed,
    });
    setQuizSubmitted(true);

    if (passed) {
      markLessonComplete(lessonId, true);
    }
  };

  // Handle Day 7 Project Submission
  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Deterministic rubric scoring across the 5 dimensions
    let taskDefScore = 15;
    if (!projectForm.taskTitle.trim() || projectForm.taskTitle.length < 5) taskDefScore = 8;

    let promptArchScore = 25;
    const hasRole = /ROLE\s*:/i.test(projectForm.improvedPrompt);
    const hasConstraints = /CONSTRAINTS?\s*:/i.test(projectForm.improvedPrompt);
    const hasFormat = /OUTPUT\s+FORMAT\s*:/i.test(projectForm.improvedPrompt);
    if (!hasRole) promptArchScore -= 5;
    if (!hasConstraints) promptArchScore -= 5;
    if (!hasFormat) promptArchScore -= 5;

    let outputScore = 20;
    if (projectForm.sampleOutput.length < 50) outputScore = 12;

    let verifScore = 25;
    if (projectForm.verificationChecklist.split('\n').filter((l) => l.trim()).length < 3) {
      verifScore = 16;
    }

    let privacyScore = projectForm.privacyConfirmed ? 15 : 0;

    const total = taskDefScore + promptArchScore + outputScore + verifScore + privacyScore;
    const passed = total >= 80;

    const evalResult = {
      score: total,
      passed,
      breakdown: {
        taskDefinition: taskDefScore,
        promptArchitecture: promptArchScore,
        outputQuality: outputScore,
        verification: verifScore,
        responsibleAi: privacyScore,
      },
    };

    setProjectEvaluation(evalResult);
    setProjectSubmitted(true);
    localStorage.setItem('rootaccess_ai_project_submitted', 'true');
    localStorage.setItem('rootaccess_ai_project_eval', JSON.stringify(evalResult));

    if (passed) {
      markLessonComplete('ai-day-7', true);
    }
  };

  const handleMarkDayComplete = () => {
    markLessonComplete(lessonId, true);
    if (dayNumber < 7) {
      navigate(`/courses/ai-prompt-engineering/day-${dayNumber + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      {/* Course Context Header */}
      <div className="bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Breadcrumbs & Title */}
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5 flex-wrap">
                <Link
                  to="/courses/ai-prompt-engineering"
                  className="hover:text-white transition-colors"
                >
                  AI Fundamentals &amp; Prompt Engineering
                </Link>
                <span>/</span>
                <span className="text-purple-400 font-semibold">Day {dayNumber} of 7</span>
                <span>•</span>
                <span className="text-slate-400">{dayData.duration}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{dayData.title}</span>
                {isDayCompleted && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {dayData.subtitle}
              </p>
            </div>

            {/* Right: Quick Day Stepper */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 shrink-0">
              {AI_DAYS_DATA.map((d) => {
                const isCurrent = d.dayNumber === dayNumber;
                const isCompleted = isLessonCompleted(`ai-day-${d.dayNumber}`);
                return (
                  <Link
                    key={d.dayNumber}
                    to={`/courses/ai-prompt-engineering/day-${d.dayNumber}`}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-purple-600 text-white shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                    title={d.title}
                  >
                    {isCompleted ? '✓' : d.dayNumber}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs sm:text-sm">
          {dayNumber === 7 ? (
            <>
              <button
                onClick={() => setActiveTab('project')}
                className={`flex items-center gap-2 px-4 py-3 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'project'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Capstone Project &amp; Rubric</span>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className={`flex items-center gap-2 px-4 py-3 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'practice'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Prompt Playground</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 px-4 py-3 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'quiz'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Final Assessment Quiz</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('topics')}
                className={`flex items-center gap-2 px-4 py-3 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'topics'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Concepts &amp; Worked Examples</span>
              </button>

              <button
                onClick={() => setActiveTab('practice')}
                className={`flex items-center gap-2 px-4 py-3 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'practice'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Hands-on Practice &amp; Playground</span>
              </button>

              <button
                onClick={() => setActiveTab('scenarios')}
                className={`flex items-center gap-2 px-4 py-3 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'scenarios'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Workplace Scenarios</span>
              </button>

              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 px-4 py-3 font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'quiz'
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Knowledge Check ({dayData.quiz.questions.length} Qs)</span>
              </button>
            </>
          )}
        </div>

        {/* TAB 1: CONCEPTS & WORKED EXAMPLES */}
        {activeTab === 'topics' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left: Topic Selector list */}
            <div className="lg:col-span-1 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block px-1">
                Day {dayNumber} Topics
              </span>
              <div className="space-y-1">
                {dayData.topics.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTopicIdx(idx)}
                    className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      currentTopicIdx === idx
                        ? 'bg-purple-50 text-purple-900 border border-purple-200 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="line-clamp-2">{t.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>

              {/* Day Learning Objectives Box */}
              <div className="bg-purple-50/60 border border-purple-200/60 rounded-xl p-4 space-y-2.5 mt-4">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-purple-600" />
                  <span>Learning Objectives</span>
                </span>
                <ul className="text-xs text-purple-950 space-y-1.5">
                  {dayData.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Active Topic Content */}
            <div className="lg:col-span-3 space-y-6">
              {(() => {
                const topic = dayData.topics[currentTopicIdx] || dayData.topics[0];
                return (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                    {/* Header */}
                    <div className="space-y-1 border-b border-slate-100 pb-4">
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                        Topic {currentTopicIdx + 1} of {dayData.topics.length}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        {topic.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        {topic.summary}
                      </p>
                    </div>

                    {/* Deep Explanation */}
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line">
                      {topic.explanation}
                    </div>

                    {/* Real-World Analogy */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                        <span>Real-World Workplace Context</span>
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {topic.realWorldExample}
                      </p>
                    </div>

                    {/* Worked Example */}
                    <div className="bg-purple-50/40 border border-purple-200/80 rounded-xl p-5 space-y-4">
                      <span className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Worked Example: {topic.workedExample.scenario}</span>
                      </span>

                      {topic.workedExample.beforePrompt && (
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-rose-800">
                            Weak Initial Prompt:
                          </span>
                          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs font-mono text-rose-900">
                            {topic.workedExample.beforePrompt}
                          </div>
                          {topic.workedExample.beforeOutput && (
                            <p className="text-[11px] text-slate-500 italic pl-1">
                              Result: {topic.workedExample.beforeOutput}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-emerald-800">
                          Structured High-Yield Prompt:
                        </span>
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 leading-relaxed whitespace-pre-wrap">
                          {topic.workedExample.afterPrompt}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-700">
                          Resulting High-Quality Output:
                        </span>
                        <div className="p-3 bg-white border border-purple-200 rounded-lg text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                          {topic.workedExample.afterOutput}
                        </div>
                      </div>

                      <p className="text-xs text-purple-900 font-medium border-t border-purple-200/60 pt-2">
                        <strong>Why this works:</strong> {topic.workedExample.explanation}
                      </p>
                    </div>

                    {/* Common Mistakes & Key Takeaways Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-rose-50/50 border border-rose-200/60 rounded-xl space-y-2">
                        <span className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Common Mistakes to Avoid</span>
                        </span>
                        <ul className="text-xs text-rose-950 space-y-1">
                          {topic.commonMistakes.map((m, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-rose-500 font-bold">•</span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-emerald-50/50 border border-emerald-200/60 rounded-xl space-y-2">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Key Takeaways</span>
                        </span>
                        <ul className="text-xs text-emerald-950 space-y-1">
                          {topic.keyTakeaways.map((k, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold">•</span>
                              <span>{k}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Topic Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setCurrentTopicIdx(Math.max(0, currentTopicIdx - 1))}
                        disabled={currentTopicIdx === 0}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous Topic</span>
                      </button>

                      {currentTopicIdx < dayData.topics.length - 1 ? (
                        <button
                          onClick={() => setCurrentTopicIdx(currentTopicIdx + 1)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>Next Topic</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab('practice')}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors cursor-pointer"
                        >
                          <span>Go to Hands-on Practice</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB 2: HANDS-ON PRACTICE & PLAYGROUND */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Guided Exercise Section */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                    Guided Hands-on Activity
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {dayData.guidedExercise.title}
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800">
                  Step 1: Inspect &amp; Solve
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {dayData.guidedExercise.instructions}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Task Context:
                </span>
                <p className="text-xs text-slate-800 font-mono whitespace-pre-wrap">
                  {dayData.guidedExercise.taskContext}
                </p>
              </div>

              {/* Starter vs Model Solution accordion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-rose-800">
                    Unstructured Starter Prompt:
                  </span>
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-mono text-rose-950">
                    {dayData.guidedExercise.starterPrompt}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-800">
                    Recommended Model Solution:
                  </span>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono text-emerald-950 leading-relaxed whitespace-pre-wrap">
                    {dayData.guidedExercise.solutionPrompt}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Prompt Playground */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span>Interactive Practice Studio</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Run, test, score, and save your prompts in real-time.
                  </p>
                </div>
              </div>

              <PromptPlayground
                initialScenarioId={dayData.playgroundScenarios[0]?.id}
                dayNumber={dayNumber}
              />
            </div>

            {/* Independent Practice Challenge */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Independent Practice Challenge
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {dayData.independentChallenge.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {dayData.independentChallenge.scenario}
              </p>

              <div className="p-4 bg-purple-50/50 border border-purple-200/60 rounded-xl space-y-2">
                <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                  Challenge Constraints:
                </span>
                <ul className="text-xs text-purple-950 space-y-1">
                  {dayData.independentChallenge.constraints.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Ready for Knowledge Check</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WORKPLACE SCENARIOS */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Real-World Application
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Workplace Scenario Drills &amp; Model Outputs
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Inspect how senior practitioners apply structured prompting to high-pressure business tasks.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {dayData.workplaceScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4"
                  >
                    <div className="border-b border-slate-200/80 pb-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {scenario.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {scenario.context}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Engineered Prompt:
                      </span>
                      <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap">
                        {scenario.modelPrompt}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                        Model Output:
                      </span>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                        {scenario.modelOutput}
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50/80 border border-purple-200/60 rounded-xl text-xs text-purple-900 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>
                        <strong>Senior QA Verification Tip:</strong> {scenario.verificationTip}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KNOWLEDGE CHECK QUIZ */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Day {dayNumber} Knowledge Assessment
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Scenario-Based Knowledge Check
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Passing Threshold: {dayData.quiz.passingScorePercent}% • {dayData.quiz.questions.length} questions
                </p>
              </div>

              {quizScore && (
                <div
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    quizScore.passed
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  Score: {quizScore.score}/{dayData.quiz.questions.length} ({quizScore.percentage}%) — {quizScore.passed ? 'PASSED ✓' : 'RETRY NEEDED'}
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {dayData.quiz.questions.map((q, idx) => {
                const selectedOption = quizAnswers[q.id];
                const isAnswered = selectedOption !== undefined;
                const isCorrect = isAnswered && selectedOption === q.correctAnswerIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      quizSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50/30 border-emerald-200'
                          : 'bg-rose-50/30 border-rose-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 mb-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-900">
                        {q.question}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-2 pl-8">
                      {q.options.map((opt, oIdx) => {
                        const isOptionSelected = selectedOption === oIdx;
                        let optionStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700';

                        if (quizSubmitted) {
                          if (oIdx === q.correctAnswerIndex) {
                            optionStyle = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold';
                          } else if (isOptionSelected && !isCorrect) {
                            optionStyle = 'bg-rose-100 text-rose-900 border-rose-300 line-through';
                          } else {
                            optionStyle = 'bg-white/60 text-slate-400 border-slate-200';
                          }
                        } else if (isOptionSelected) {
                          optionStyle = 'bg-purple-50 text-purple-900 border-purple-400 ring-1 ring-purple-300 font-semibold';
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() => {
                              setQuizAnswers((prev) => ({
                                ...prev,
                                [q.id]: oIdx,
                              }));
                            }}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-3 ${optionStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-bold">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback & Explanation on Submit */}
                    {quizSubmitted && (
                      <div className="mt-4 pl-8 pt-3 border-t border-slate-200/80 text-xs text-slate-700">
                        <p className="font-bold mb-1 flex items-center gap-1.5">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-600" />
                          )}
                          <span>{isCorrect ? 'Correct Answer' : 'Explanation & Learning:'}</span>
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quiz Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {Object.keys(quizAnswers).length} of {dayData.quiz.questions.length} questions answered
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {quizSubmitted ? (
                  <>
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                        setQuizScore(null);
                      }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Retry Quiz
                    </button>

                    {quizScore?.passed && (
                      <button
                        onClick={handleMarkDayComplete}
                        className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{dayNumber === 7 ? 'Complete Course & View Certificate' : `Continue to Day ${dayNumber + 1}`}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < dayData.quiz.questions.length}
                    className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Submit Answers for Evaluation
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DAY 7: CAPSTONE PROJECT & RUBRIC */}
        {dayNumber === 7 && activeTab === 'project' && (
          <div className="space-y-6">
            {/* Project Overview Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                    Day 7 Final Milestone
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Capstone: Build Your Personal AI Productivity Workflow
                  </h2>
                </div>
                {projectSubmitted && projectEvaluation?.passed && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Project Evaluated ({projectEvaluation.score}/100) — Passed!</span>
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Apply everything you have learned across Days 1–6 to design, refine, and verify a real-world productivity workflow. Complete the submission template below. The deterministic RootAccess Rubric evaluates your work across 5 core dimensions (100 Points Total).
              </p>

              {/* 5-Dimension Rubric Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">1. Task Definition</span>
                  <p className="text-sm font-extrabold text-slate-800 mt-1">15 Points</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">2. 6-Part Framework</span>
                  <p className="text-sm font-extrabold text-slate-800 mt-1">25 Points</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">3. Output Quality</span>
                  <p className="text-sm font-extrabold text-slate-800 mt-1">20 Points</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">4. Verification Checklist</span>
                  <p className="text-sm font-extrabold text-slate-800 mt-1">25 Points</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">5. Responsible AI</span>
                  <p className="text-sm font-extrabold text-slate-800 mt-1">15 Points</p>
                </div>
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleProjectSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-purple-600" />
                <span>Capstone Submission Template</span>
              </h3>

              {/* 1. Task Definition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Project / Workflow Title
                  </label>
                  <input
                    type="text"
                    value={projectForm.taskTitle}
                    onChange={(e) => setProjectForm({ ...projectForm, taskTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    placeholder="e.g. Weekly Bug Retrospective Synthesizer"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Operational Domain
                  </label>
                  <select
                    value={projectForm.taskCategory}
                    onChange={(e) => setProjectForm({ ...projectForm, taskCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  >
                    <option value="Workplace Operations">Workplace Operations &amp; Management</option>
                    <option value="QA & Software Testing">QA &amp; Software Testing</option>
                    <option value="Study & Research">Study &amp; Research Synthesis</option>
                    <option value="Customer Support">Customer Support &amp; Retention</option>
                  </select>
                </div>
              </div>

              {/* 2. Success Criteria */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Success Criteria (What defines a winning answer?)
                </label>
                <input
                  type="text"
                  value={projectForm.successCriteria}
                  onChange={(e) => setProjectForm({ ...projectForm, successCriteria: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  placeholder="e.g. Clear separation of severity, actionable next steps, zero ambiguous complaints"
                  required
                />
              </div>

              {/* 3. Initial Prompt vs Improved 6-Part Prompt */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                    Initial Weak Prompt (Before Optimization)
                  </label>
                  <textarea
                    rows={4}
                    value={projectForm.initialPrompt}
                    onChange={(e) => setProjectForm({ ...projectForm, initialPrompt: e.target.value })}
                    className="w-full p-3 text-xs font-mono text-slate-800 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    6-Part Framework Optimized Prompt
                  </label>
                  <textarea
                    rows={4}
                    value={projectForm.improvedPrompt}
                    onChange={(e) => setProjectForm({ ...projectForm, improvedPrompt: e.target.value })}
                    className="w-full p-3 text-xs font-mono text-slate-100 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {/* 4. Sample Output */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Generated Sample Output (Formatted)
                </label>
                <textarea
                  rows={4}
                  value={projectForm.sampleOutput}
                  onChange={(e) => setProjectForm({ ...projectForm, sampleOutput: e.target.value })}
                  className="w-full p-3 text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  required
                />
              </div>

              {/* 5. Improvement Comparison Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Improvement Analysis Notes (Why is the improved output superior?)
                </label>
                <textarea
                  rows={2}
                  value={projectForm.improvementNotes}
                  onChange={(e) => setProjectForm({ ...projectForm, improvementNotes: e.target.value })}
                  className="w-full p-3 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  required
                />
              </div>

              {/* 6. Verification Checklist */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-purple-600" />
                  <span>4-Point Factual Verification Checklist &amp; Failure Modes</span>
                </label>
                <textarea
                  rows={3}
                  value={projectForm.verificationChecklist}
                  onChange={(e) => setProjectForm({ ...projectForm, verificationChecklist: e.target.value })}
                  className="w-full p-3 text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  placeholder="List at least 3 concrete checks: dates, mathematical totals, code method names, or citation lookups"
                  required
                />
              </div>

              {/* 7. Responsible AI & Privacy Affirmation */}
              <div className="p-4 bg-purple-50/60 border border-purple-200/80 rounded-xl flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacyConfirm"
                  checked={projectForm.privacyConfirmed}
                  onChange={(e) => setProjectForm({ ...projectForm, privacyConfirmed: e.target.checked })}
                  className="mt-0.5 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                  required
                />
                <label htmlFor="privacyConfirm" className="text-xs text-purple-950 font-medium cursor-pointer">
                  <strong>Responsible AI &amp; Privacy Confirmation:</strong> I confirm that this prompt contains zero real confidential passwords, customer credit card records, unredacted corporate PII, or trade secrets. I affirm that human verification is required before deploying this workflow to production.
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Passing Grade: ≥ 80% on the RootAccess 5-Dimension Rubric
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit Final Project for Evaluation</span>
                </button>
              </div>
            </form>

            {/* Evaluation Results Card */}
            {projectSubmitted && projectEvaluation && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Capstone Evaluation Result
                      </h4>
                      <p className="text-xs text-slate-500">
                        Score: {projectEvaluation.score}/100 — {projectEvaluation.passed ? 'PASSED (Distinction)' : 'REVISION NEEDED'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      projectEvaluation.passed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {projectEvaluation.passed ? 'PASSED' : 'BELOW 80%'}
                  </span>
                </div>

                {/* Score Breakdown Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>1. Task Definition &amp; Scope</span>
                      <span>{projectEvaluation.breakdown.taskDefinition} / 15</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(projectEvaluation.breakdown.taskDefinition / 15) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>2. 6-Part Framework &amp; Constraints</span>
                      <span>{projectEvaluation.breakdown.promptArchitecture} / 25</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(projectEvaluation.breakdown.promptArchitecture / 25) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>3. Output Quality &amp; Structure</span>
                      <span>{projectEvaluation.breakdown.outputQuality} / 20</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(projectEvaluation.breakdown.outputQuality / 20) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>4. Verification Checklist &amp; Failure Modes</span>
                      <span>{projectEvaluation.breakdown.verification} / 25</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(projectEvaluation.breakdown.verification / 25) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>5. Responsible AI &amp; Privacy Safeguards</span>
                      <span>{projectEvaluation.breakdown.responsibleAi} / 15</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(projectEvaluation.breakdown.responsibleAi / 15) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {projectEvaluation.passed && (
                  <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Congratulations! Course Completion Requirements Satisfied.</span>
                    </div>
                    <p className="text-xs text-emerald-950 leading-relaxed">
                      You have passed the Day 7 Capstone Project and satisfied all curriculum milestones. You are now officially certified in <strong>AI Fundamentals &amp; Prompt Engineering</strong>.
                    </p>
                    <div className="pt-2">
                      <Link
                        to="/courses/ai-prompt-engineering/certificate"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        <Award className="w-4 h-4 fill-white" />
                        <span>View &amp; Print Official Certificate</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
