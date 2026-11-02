import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Code2,
  HelpCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  AlertCircle,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useProgress } from '../../context/ProgressContext';
import { CourseEnrollmentGate } from '../../components/common/CourseEnrollmentGate';
import { API_DAYS_DATA, API_COURSE_METADATA } from '../../data/apiCurriculumData';
import { PostmanInteractiveStudio } from '../../components/api/PostmanInteractiveStudio';

export const ApiDayLessonPage: React.FC = () => {
  const { dayNumber: dayParam } = useParams<{ dayNumber: string }>();
  const navigate = useNavigate();
  const dayNumber = parseInt(dayParam || '1', 10);

  const { isCourseEnrolled, isLessonCompleted, markLessonComplete } = useProgress();
  const isEnrolled = isCourseEnrolled('api-testing-postman');

  const dayData = API_DAYS_DATA.find((d) => d.dayNumber === dayNumber) || API_DAYS_DATA[0];

  // Active section tab: 'topics' | 'practice' | 'interview' | 'quiz'
  const [activeTab, setActiveTab] = useState<'topics' | 'practice' | 'interview' | 'quiz'>('topics');
  const [currentTopicIdx, setCurrentTopicIdx] = useState(0);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0);

  // Exercise completion state
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`rootaccess_api_exercises_day_${dayNumber}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<{ score: number; passed: boolean } | null>(null);

  // Expanded interview questions
  const [expandedInterviewIdx, setExpandedInterviewIdx] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('topics');
    setCurrentTopicIdx(0);
    setCurrentExerciseIdx(0);
    setQuizSubmitted(false);
    setQuizScore(null);
  }, [dayNumber]);

  // Day 1 is Free Preview. Days 2-5 require enrollment
  if (!isEnrolled && dayNumber > 1) {
    return (
      <CourseEnrollmentGate
        courseTitle={API_COURSE_METADATA.title}
        courseSlug="api-testing-postman"
        description={`Day 1 is free for all students. To access "${dayData.title}", interactive Postman testing studios, and Capstone Project, please enroll.`}
        bulletPoints={[
          'Full access to all 5 intensive daily modules (HTTP verbs, Chai assertions, JWT Auth, Automation, Capstone)',
          'Interactive Postman studio simulator with Chai assertion runtime',
          'E-Commerce REST API Capstone Project with 4 seeded defects to uncover',
          'Official RootAccess API Testing with Postman Certificate of Completion',
        ]}
        backLink="/courses/api-testing-postman"
        backLinkText="Back to Course Syllabus"
        accentColor="indigo"
      />
    );
  }

  const lessonId = `api-day-${dayNumber}`;
  const isDayCompleted = isLessonCompleted(lessonId);

  const handleExerciseSuccess = (exId: string) => {
    const updated = { ...completedExercises, [exId]: true };
    setCompletedExercises(updated);
    try {
      localStorage.setItem(`rootaccess_api_exercises_day_${dayNumber}`, JSON.stringify(updated));
    } catch {}

    const allExPassed = dayData.exercises.every((ex) => updated[ex.id]);
    if (allExPassed && (quizScore?.passed || isDayCompleted)) {
      markLessonComplete(lessonId, true);
    }
  };

  const handleQuizSubmit = () => {
    let correct = 0;
    dayData.quiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const percent = Math.round((correct / dayData.quiz.questions.length) * 100);
    const passed = percent >= dayData.quiz.passingScorePercent;
    setQuizScore({ score: percent, passed });
    setQuizSubmitted(true);

    if (passed) {
      markLessonComplete(lessonId, true);
    }
  };

  const currentExercise = dayData.exercises[currentExerciseIdx] || dayData.exercises[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-amber-500 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <Link
                  to="/courses/api-testing-postman"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>API Course Roadmap</span>
                </Link>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-amber-400 font-bold font-mono">
                  Day {dayNumber} of 5
                </span>
                {!isEnrolled && dayNumber === 1 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 font-bold uppercase tracking-wider">
                    Free Preview
                  </span>
                )}
                {isDayCompleted && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Day Completed</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {dayData.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {dayData.subtitle}
              </p>
            </div>

            {/* Quick Day Selector */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-2 rounded-2xl border border-slate-800 shrink-0 self-start md:self-auto">
              {[1, 2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => navigate(`/courses/api-testing-postman/day-${d}`)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                    d === dayNumber
                      ? 'bg-amber-600 text-white shadow-xs'
                      : !isEnrolled && d > 1
                      ? 'text-slate-600 hover:text-slate-400'
                      : isLessonCompleted(`api-day-${d}`)
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={`Day ${d}`}
                >
                  {!isEnrolled && d > 1 ? <Lock className="w-3.5 h-3.5" /> : `D${d}` }
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 border-b border-slate-800 overflow-x-auto no-scrollbar text-xs font-semibold">
            <button
              onClick={() => setActiveTab('topics')}
              className={`pb-3 px-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'topics'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Concept Modules ({dayData.topics.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`pb-3 px-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'practice'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>
                2. Hands-on Postman Studio (
                {dayData.exercises.filter((e) => completedExercises[e.id]).length}/
                {dayData.exercises.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className={`pb-3 px-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'interview'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>3. QA Interview Scenarios</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`pb-3 px-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>4. Day Checkpoint Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* TAB 1: TOPICS */}
        {activeTab === 'topics' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Topics Index */}
            <div className="space-y-2 lg:col-span-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Day {dayNumber} Topics
              </div>
              {dayData.topics.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTopicIdx(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer text-xs ${
                    idx === currentTopicIdx
                      ? 'bg-amber-50 border border-amber-200 text-amber-950 font-bold shadow-2xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                    idx === currentTopicIdx ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="line-clamp-2 leading-relaxed">{t.title}</span>
                </button>
              ))}

              <div className="pt-4">
                <button
                  onClick={() => setActiveTab('practice')}
                  className="w-full inline-flex items-center justify-center gap-2 p-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <span>Go to Hands-On Exercises</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Topic Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-mono">
                    Topic {currentTopicIdx + 1} of {dayData.topics.length}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                    {dayData.topics[currentTopicIdx].title}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {dayData.topics[currentTopicIdx].summary}
                  </p>
                </div>

                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {dayData.topics[currentTopicIdx].explanation}
                </div>

                {/* Code Snippet */}
                {dayData.topics[currentTopicIdx].codeSnippet && (
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] flex items-center justify-between">
                      <span className="uppercase text-amber-400 font-bold">Request / Assertion Example</span>
                      <span>Run in Day {dayNumber} Postman Studio</span>
                    </div>
                    <pre className="p-4 text-amber-300 font-mono text-xs overflow-x-auto leading-relaxed">
                      {dayData.topics[currentTopicIdx].codeSnippet.code}
                    </pre>
                  </div>
                )}

                {/* Key Takeaways */}
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-2">
                  <div className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>QA Practitioner Key Takeaways</span>
                  </div>
                  <ul className="space-y-1 list-disc pl-4 text-xs text-amber-900">
                    {dayData.topics[currentTopicIdx].takeaways.map((takeaway, tIdx) => (
                      <li key={tIdx}>{takeaway}</li>
                    ))}
                  </ul>
                </div>

                {/* Topic Navigation footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    disabled={currentTopicIdx === 0}
                    onClick={() => setCurrentTopicIdx((p) => p - 1)}
                    className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Topic</span>
                  </button>

                  {currentTopicIdx < dayData.topics.length - 1 ? (
                    <button
                      onClick={() => setCurrentTopicIdx((p) => p + 1)}
                      className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Next Topic</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('practice')}
                      className="inline-flex items-center gap-1 px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Start Exercises</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POSTMAN INTERACTIVE STUDIO */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Exercise Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {dayData.exercises.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => setCurrentExerciseIdx(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    idx === currentExerciseIdx
                      ? 'bg-amber-600 text-white shadow-xs'
                      : completedExercises[ex.id]
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {completedExercises[ex.id] && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  <span>Ex {idx + 1}: {ex.title.split(':')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Exercise Prompt */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-mono">
                  Exercise {currentExerciseIdx + 1} of {dayData.exercises.length}
                </span>
                {completedExercises[currentExercise.id] && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completed</span>
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-slate-900">{currentExercise.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentExercise.description}
              </p>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800">
                <strong>Task:</strong> {currentExercise.instruction}
              </div>
            </div>

            {/* Postman Studio Component */}
            <PostmanInteractiveStudio
              key={currentExercise.id}
              initialMethod={currentExercise.method}
              initialUrl={currentExercise.endpoint}
              initialHeaders={currentExercise.headers}
              initialBody={currentExercise.initialBody}
              initialTestScript={currentExercise.initialTestScript}
              exerciseTitle={currentExercise.title}
              validator={currentExercise.validate}
              hints={currentExercise.hints}
              bugModeToggle={dayNumber === 5}
              onSuccess={() => handleExerciseSuccess(currentExercise.id)}
            />
          </div>
        )}

        {/* TAB 3: QA INTERVIEW SCENARIOS */}
        {activeTab === 'interview' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>Day {dayNumber} API QA Interview Preparation</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Technical interviewers look for candidates who understand HTTP status codes, security boundaries, authentication strategies, and collection maintenance.
              </p>
            </div>

            <div className="space-y-4">
              {dayData.interviewQuestions.map((iq, idx) => {
                const isExpanded = expandedInterviewIdx === idx;
                return (
                  <div
                    key={iq.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setExpandedInterviewIdx(isExpanded ? null : idx)}
                      className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider font-mono">
                          {iq.concept}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {iq.question}
                        </h3>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-5 pt-0 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed space-y-1.5">
                          <div className="font-bold text-xs uppercase tracking-wider text-amber-700">
                            Model Senior QA Answer:
                          </div>
                          <div>{iq.modelAnswer}</div>
                        </div>

                        <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong>Staff QA Interview Rationale:</strong> {iq.seniorTip}
                          </div>
                        </div>
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
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-mono">
                  Day {dayNumber} Checkpoint Assessment
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Passing Score: {dayData.quiz.passingScorePercent}%
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Knowledge Check &amp; Certification Gate
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Complete this 5-question checkpoint evaluation to solidify your understanding and unlock your Day {dayNumber} completion credential.
              </p>
            </div>

            {/* Score Banner */}
            {quizSubmitted && quizScore && (
              <div
                className={`p-6 rounded-3xl border flex items-start gap-4 ${
                  quizScore.passed
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                {quizScore.passed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                )}
                <div className="space-y-1">
                  <div className="font-bold text-base">
                    {quizScore.passed
                      ? `Passed with ${quizScore.score}%!`
                      : `Score: ${quizScore.score}% (Requires ${dayData.quiz.passingScorePercent}%)`}
                  </div>
                  <p className="text-xs leading-relaxed">
                    {quizScore.passed
                      ? 'Congratulations! You demonstrated technical competence on Day ' + dayNumber + ' concepts.'
                      : 'Please review the explanations below and re-attempt to satisfy the passing threshold.'}
                  </p>
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-4">
              {dayData.quiz.questions.map((q, qIdx) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {qIdx + 1}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="space-y-2 pl-9">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.id] === optIdx;
                      let optionStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                      if (quizSubmitted) {
                        if (optIdx === q.correctAnswerIndex) {
                          optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                        } else if (isSelected) {
                          optionStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-amber-600 bg-amber-50 text-amber-950 font-semibold';
                      }

                      return (
                        <label
                          key={optIdx}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${optionStyle}`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            checked={isSelected}
                            disabled={quizSubmitted && quizScore?.passed}
                            onChange={() => setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                            className="mt-0.5 text-amber-600 focus:ring-0"
                          />
                          <span className="leading-relaxed">{opt}</span>
                        </label>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="pl-9 pt-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quiz Submit button */}
            <div className="pt-4 flex items-center justify-between">
              {quizSubmitted && !quizScore?.passed ? (
                <button
                  onClick={() => setQuizSubmitted(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Re-Attempt Quiz</span>
                </button>
              ) : !quizSubmitted ? (
                <button
                  disabled={Object.keys(quizAnswers).length < dayData.quiz.questions.length}
                  onClick={handleQuizSubmit}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-xs disabled:opacity-40 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 fill-white" />
                  <span>Submit &amp; Grade Checkpoint</span>
                </button>
              ) : dayNumber < 5 ? (
                <button
                  onClick={() => navigate(`/courses/api-testing-postman/day-${dayNumber + 1}`)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer ml-auto"
                >
                  <span>Proceed to Day {dayNumber + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs ml-auto"
                >
                  <Award className="w-4 h-4" />
                  <span>View Certification on Dashboard</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
