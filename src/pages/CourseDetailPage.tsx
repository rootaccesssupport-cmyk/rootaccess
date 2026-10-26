import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSES } from '../data/curriculumData';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen,
  Database,
  Send,
  Code2,
  Briefcase,
  Clock,
  CheckCircle2,
  Circle,
  Award,
  Play,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Bug,
  HelpCircle,
  Download,
  Lock,
  Sparkles,
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isLessonCompleted, getCourseProgress, isCourseEnrolled, enrollInCourse } = useProgress();

  const course = COURSES.find((c) => c.slug === courseSlug);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Course Not Found</h1>
        <p className="text-slate-600 mb-6">The requested curriculum track does not exist or has been moved.</p>
        <Link
          to="/app"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  const progress = getCourseProgress(course.slug);

  // Find next uncompleted lesson, or first lesson
  const firstUnfinishedLesson =
    course.lessons.find((l) => !isLessonCompleted(l.id)) || course.lessons[0];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-indigo-600" />;
      case 'Database':
        return <Database className="w-6 h-6 text-emerald-600" />;
      case 'Send':
        return <Send className="w-6 h-6 text-sky-600" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-amber-600" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-purple-600" />;
      default:
        return <BookOpen className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/app"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-500 truncate max-w-[200px] sm:max-w-none">
              {course.trackName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/RootAccess_QA_Curriculum_Syllabus.pdf"
              download="RootAccess_QA_Curriculum_Syllabus.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Syllabus PDF</span>
            </a>

            <Link
              to="/simulator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Bug className="w-3.5 h-3.5 text-rose-600" />
              <span>Defect Lab</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Course Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200/80 shadow-xs">
                  {renderIcon(course.iconName)}
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    {course.badge}
                  </span>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{course.trackName}</p>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>~{course.estimatedHours} Hours of Training</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>{course.lessons.length} Core Lessons</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span>Certification Quiz Included</span>
                </div>
              </div>
            </div>

            {/* Quick Action & Progress Box */}
            <div className="w-full md:w-72 bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 shrink-0">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>Track Completion</span>
                  <span>{progress.percent}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  {progress.completedCount} of {progress.totalCount} lessons completed
                </p>
              </div>

              {!isCourseEnrolled(course.slug) ? (
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Curriculum &amp; Syllabus</p>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Free students can explore the curriculum and syllabus below. Enroll to access all interactive lessons and practical labs.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (!user) {
                        navigate('/signup');
                      } else {
                        enrollInCourse(course.slug);
                        if (course.slug === 'playwright-automation') {
                          navigate('/courses/playwright-automation/day-1');
                        } else if (course.slug === 'manual-qa-fundamentals' || course.slug === 'manual-testing') {
                          navigate('/manual-qa/day/1');
                        } else if (firstUnfinishedLesson) {
                          navigate(`/courses/${course.slug}/lessons/${firstUnfinishedLesson.slug}`);
                        }
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{user ? 'Enroll in Course' : 'Create Free Account to Enroll'}</span>
                  </button>
                </div>
              ) : firstUnfinishedLesson ? (
                <button
                  onClick={() => {
                    if (course.slug === 'playwright-automation') {
                      navigate('/courses/playwright-automation/day-1');
                    } else if (course.slug === 'manual-qa-fundamentals' || course.slug === 'manual-testing') {
                      navigate('/manual-qa');
                    } else {
                      navigate(`/courses/${course.slug}/lessons/${firstUnfinishedLesson.slug}`);
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>
                    {progress.completedCount > 0
                      ? 'Continue Learning'
                      : 'Start Course'}
                  </span>
                </button>
              ) : (
                <Link
                  to={`/courses/${course.slug}/quiz`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>Take Course Quiz</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Learning Outcomes Grid */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>What You Will Master in This Track</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {course.learningOutcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium"
              >
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Syllabus & Lessons Checklist */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Curriculum Syllabus</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Step-by-step practical modules with interactive exercises and interview checklists.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              {course.lessons.length} Lessons
            </span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
            {course.lessons.map((lesson, idx) => {
              const isCompleted = isLessonCompleted(lesson.id);
              return (
                <div
                  key={lesson.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-slate-400">
                          Lesson {idx + 1}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            lesson.difficulty === 'Beginner'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                          }`}
                        >
                          {lesson.difficulty}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {lesson.durationMinutes} mins
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {lesson.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-1">
                        {lesson.summary}
                      </p>
                    </div>
                  </div>

                  {/* Syllabus Action: Enrolled vs Unlocked */}
                  {!isCourseEnrolled(course.slug) ? (
                    <button
                      onClick={() => {
                        if (!user) navigate('/signup');
                        else {
                          enrollInCourse(course.slug);
                          if (course.slug === 'playwright-automation') {
                            navigate(`/courses/playwright-automation/day-${idx + 1}`);
                          } else if (course.slug === 'manual-qa-fundamentals' || course.slug === 'manual-testing') {
                            navigate(`/manual-qa/day/${idx + 1}`);
                          } else {
                            navigate(`/courses/${course.slug}/lessons/${lesson.slug}`);
                          }
                        }
                      }}
                      className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-500 transition-all cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Enroll to Unlock</span>
                    </button>
                  ) : (
                    <Link
                      to={
                        course.slug === 'playwright-automation'
                          ? `/courses/playwright-automation/day-${idx + 1}`
                          : course.slug === 'manual-qa-fundamentals' || course.slug === 'manual-testing'
                          ? `/manual-qa/day/${idx + 1}`
                          : `/courses/${course.slug}/lessons/${lesson.slug}`
                      }
                      className="shrink-0 inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-700 transition-all shadow-2xs"
                    >
                      <span>{isCompleted ? 'Review' : 'Open'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Quiz & Defect Simulator Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quiz Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                <Award className="w-5 h-5" />
              </div>
              {progress.isPassedQuiz ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Passed ({progress.quizScore?.percentage}%)</span>
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  Passing: {course.quiz.passingScorePercent}%
                </span>
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{course.quiz.title}</h3>
              <p className="text-xs text-slate-500 mt-1">
                {course.quiz.questions.length} scenario-based multiple choice questions to test your real-world readiness.
              </p>
            </div>

            <Link
              to={`/courses/${course.slug}/quiz`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{progress.isPassedQuiz ? 'Retake Quiz' : 'Start Certification Quiz'}</span>
            </Link>
          </div>

          {/* Hands-on Defect Simulator Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xs space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-rose-400 flex items-center justify-center border border-white/10">
                <Bug className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-1 rounded-full">
                Interactive Lab
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Workplace Defect Simulation Lab</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Step into a live QA environment. Hunt down 4 hidden defects in our interactive checkout simulator and submit Jira-grade bug reports.
              </p>
            </div>

            <Link
              to="/simulator"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              <Bug className="w-4 h-4 text-rose-600" />
              <span>Launch Defect Simulator</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
