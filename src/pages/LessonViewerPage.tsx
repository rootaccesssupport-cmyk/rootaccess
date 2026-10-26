import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { COURSES } from '../data/curriculumData';
import { useProgress } from '../context/ProgressContext';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Circle,
  Clock,
  Copy,
  Check,
  Award,
  Bug,
  Menu,
  X,
  Lightbulb,
  AlertTriangle,
  Info,
  Briefcase,
  Lock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const LessonViewerPage: React.FC = () => {
  const { courseSlug, lessonSlug } = useParams<{ courseSlug: string; lessonSlug: string }>();
  const navigate = useNavigate();
  const { isLessonCompleted, markLessonComplete, isCourseEnrolled, enrollInCourse } = useProgress();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const course = COURSES.find((c) => c.slug === courseSlug);
  const currentLessonIndex = course?.lessons.findIndex((l) => l.slug === lessonSlug) ?? -1;
  const currentLesson = course?.lessons[currentLessonIndex];

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Lesson Not Found</h1>
        <p className="text-slate-600 mb-6">The requested lesson could not be located in this course track.</p>
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

  const isEnrolled = isCourseEnrolled(course.slug) || isCourseEnrolled(course.id);

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Course Syllabus</span>
            </Link>
          </div>
        </header>
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
                {course.title}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Free students can explore the course curriculum and syllabus. To access this lesson, code walkthroughs, hands-on tasks, and certification, please enroll in this course.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2 text-slate-700">
              <div className="font-bold text-slate-900">What full course enrollment unlocks:</div>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li>Access to all {course.lessons.length} core interactive lessons and technical guides</li>
                <li>Simulated workplace code walkthroughs and verification exercises</li>
                <li>Course certification assessment quiz and completion tracking</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => enrollInCourse(course.slug)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Course</span>
              </button>
              <Link
                to={`/courses/${course.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Full Curriculum</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const isCompleted = isLessonCompleted(currentLesson.id);
  const prevLesson = currentLessonIndex > 0 ? course.lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < course.lessons.length - 1
      ? course.lessons[currentLessonIndex + 1]
      : null;

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handleToggleChecklist = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleToggleCompletion = () => {
    markLessonComplete(currentLesson.id, !isCompleted);
  };

  const handleNext = () => {
    if (!isCompleted) {
      markLessonComplete(currentLesson.id, true);
    }
    if (nextLesson) {
      navigate(`/courses/${course.slug}/lessons/${nextLesson.slug}`);
    } else {
      navigate(`/courses/${course.slug}/quiz`);
    }
  };

  const renderCalloutIcon = (type: 'tip' | 'warning' | 'info' | 'interview') => {
    switch (type) {
      case 'tip':
        return <Lightbulb className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'interview':
        return <Briefcase className="w-5 h-5 text-purple-600" />;
      default:
        return <Info className="w-5 h-5 text-sky-600" />;
    }
  };

  const renderCalloutClasses = (type: 'tip' | 'warning' | 'info' | 'interview') => {
    switch (type) {
      case 'tip':
        return 'bg-emerald-50/70 border-emerald-200 text-emerald-950';
      case 'warning':
        return 'bg-amber-50/70 border-amber-200 text-amber-950';
      case 'interview':
        return 'bg-purple-50/70 border-purple-200 text-purple-950';
      default:
        return 'bg-sky-50/70 border-sky-200 text-sky-950';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Syllabus Sidebar"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Course Syllabus</span>
            </Link>

            <span className="text-slate-300">/</span>

            <span className="text-xs font-medium text-slate-700 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {course.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleCompletion}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`}
              />
              <span className="hidden sm:inline">
                {isCompleted ? 'Completed' : 'Mark as Done'}
              </span>
            </button>

            {currentLesson.interactiveLabId && (
              <Link
                to="/simulator"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
              >
                <Bug className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden md:inline">Open Defect Lab</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-8">
        {/* Course Syllabus Sidebar (Desktop + Drawer on mobile) */}
        <aside
          className={`fixed lg:static top-16 bottom-0 left-0 z-30 w-72 sm:w-80 bg-white lg:bg-transparent border-r lg:border-r-0 border-slate-200 p-4 lg:p-0 overflow-y-auto shrink-0 transition-transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0 shadow-xl lg:shadow-none' : '-translate-x-full'
          }`}
        >
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs">
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                Course Syllabus
              </span>
              <h2 className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">
                {course.title}
              </h2>
            </div>

            <div className="space-y-1.5">
              {course.lessons.map((lesson, idx) => {
                const isCurrent = lesson.slug === currentLesson.slug;
                const completed = isLessonCompleted(lesson.id);

                return (
                  <Link
                    key={lesson.id}
                    to={`/courses/${course.slug}/lessons/${lesson.slug}`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-start gap-3 p-3 rounded-xl text-xs transition-colors ${
                      isCurrent
                        ? 'bg-indigo-50/80 text-indigo-900 font-bold border border-indigo-200/80 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle
                          className={`w-4 h-4 ${isCurrent ? 'text-indigo-400' : 'text-slate-300'}`}
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate">
                        {idx + 1}. {lesson.title}
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {lesson.durationMinutes} mins
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quiz Link in Sidebar */}
            <div className="pt-2 border-t border-slate-100">
              <Link
                to={`/courses/${course.slug}/quiz`}
                className="flex items-center justify-between p-3 rounded-xl bg-purple-50 text-purple-900 hover:bg-purple-100 transition-colors text-xs font-bold"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Course Quiz</span>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-400" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Lesson Content Area */}
        <main className="flex-1 min-w-0 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          {/* Lesson Header Banner */}
          <div className="space-y-4 pb-6 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                Lesson {currentLessonIndex + 1} of {course.lessons.length}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {currentLesson.durationMinutes} Minutes Reading
              </span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-600">
                Difficulty: {currentLesson.difficulty}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {currentLesson.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
              {currentLesson.summary}
            </p>
          </div>

          {/* Interactive Simulation Lab Callout Banner (if applicable) */}
          {currentLesson.interactiveLabId && (
            <div className="p-5 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl border border-rose-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <Bug className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Hands-on Simulation: Defect Hunting Lab
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Apply this lesson immediately! Reproduce boundary value bugs in our mock checkout app and submit a Jira defect report.
                  </p>
                </div>
              </div>
              <Link
                to="/simulator"
                className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <span>Launch Defect Lab</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Lesson Main Sections */}
          <div className="space-y-8">
            {currentLesson.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {section.title}
                </h3>

                <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>

                {/* Callout Card (Tips, Warnings, Interview Insights) */}
                {section.callout && (
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 ${renderCalloutClasses(
                      section.callout.type
                    )}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {renderCalloutIcon(section.callout.type)}
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <h5 className="font-bold">{section.callout.title}</h5>
                      <p className="leading-relaxed opacity-90">{section.callout.text}</p>
                    </div>
                  </div>
                )}

                {/* Code Snippet Box with Copy Button */}
                {section.codeSnippet && (
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-sm text-xs sm:text-sm">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-slate-400">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                        {section.codeSnippet.language}
                      </span>
                      <button
                        onClick={() => handleCopyCode(section.codeSnippet!.code, idx)}
                        className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2 py-1 rounded-md hover:bg-slate-800 transition-colors"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-slate-200">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways Card */}
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 space-y-3">
            <h4 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Key Takeaways for QA Testers</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-indigo-900 font-medium">
              {currentLesson.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical QA Checklist (Interactive items) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Practical QA Execution Checklist
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Review these steps before signing off on test execution in your workplace.
              </p>
            </div>

            <div className="space-y-2">
              {currentLesson.practicalChecklist.map((item, idx) => {
                const isChecked = Boolean(checkedItems[idx]);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleChecklist(idx)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-colors cursor-pointer group"
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-50" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                      )}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium transition-colors ${
                        isChecked ? 'text-slate-400 line-through' : 'text-slate-700'
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Footer Controls */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevLesson ? (
              <Link
                to={`/courses/${course.slug}/lessons/${prevLesson.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous: {prevLesson.title.split(':')[0]}</span>
              </Link>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>{nextLesson ? 'Mark Done & Next Lesson' : 'Complete & Take Quiz'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
