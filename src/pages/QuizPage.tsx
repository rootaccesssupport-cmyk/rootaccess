import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { COURSES } from '../data/curriculumData';
import { useProgress } from '../context/ProgressContext';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  Check,
  BookOpen,
  Lock,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

export const QuizPage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { saveQuizResult, isCourseEnrolled, enrollInCourse } = useProgress();

  const course = COURSES.find((c) => c.slug === courseSlug);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
  } | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Quiz Not Found</h1>
        <p className="text-slate-600 mb-6">The requested course quiz could not be located.</p>
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
                {course.title} — Certification Quiz
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Free students can explore the course curriculum and syllabus. To attempt this certification checkpoint quiz, please enroll in this course.
              </p>
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

  const { quiz } = course;
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (answeredCount < totalQuestions) {
      alert(`Please answer all ${totalQuestions} questions before submitting.`);
      return;
    }

    let calculatedScore = 0;
    quiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        calculatedScore += 1;
      }
    });

    const result = saveQuizResult(course.slug, calculatedScore, totalQuestions);
    setSubmissionResult(result);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setSubmissionResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Course</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-700 truncate">
              {quiz.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isSubmitted && (
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                {answeredCount} of {totalQuestions} Answered
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Result Banner when submitted */}
        {isSubmitted && submissionResult && (
          <div
            className={`rounded-3xl p-6 sm:p-8 border shadow-xs text-center space-y-4 ${
              submissionResult.passed
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}
          >
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-xs">
              {submissionResult.passed ? (
                <Award className="w-8 h-8 text-emerald-600" />
              ) : (
                <RotateCcw className="w-8 h-8 text-amber-600" />
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {submissionResult.passed
                  ? 'Congratulations! You Passed!'
                  : 'Review & Try Again'}
              </h2>
              <p className="text-sm font-medium opacity-80">
                You scored {submissionResult.score} out of {submissionResult.total} ({submissionResult.percentage}%).
                Passing benchmark is {quiz.passingScorePercent}%.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={handleRetake}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>

              <Link
                to={`/courses/${course.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Return to Course Syllabus</span>
              </Link>
            </div>
          </div>
        )}

        {/* Quiz Info Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Interactive Assessment</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {quiz.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Test your knowledge across test case boundaries, defect severity matrices, and real QA interview scenarios. Select the single best answer for each question.
          </p>
        </div>

        {/* Questions Form */}
        <form onSubmit={handleSubmitQuiz} className="space-y-6">
          {quiz.questions.map((question, qIdx) => {
            const selectedOpt = selectedAnswers[question.id];
            const isCorrect = isSubmitted && selectedOpt === question.correctAnswerIndex;
            const isWrong = isSubmitted && selectedOpt !== undefined && selectedOpt !== question.correctAnswerIndex;

            return (
              <div
                key={question.id}
                className={`bg-white rounded-2xl p-6 sm:p-8 border transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'border-emerald-300 ring-1 ring-emerald-200'
                      : isWrong
                      ? 'border-rose-300 ring-1 ring-rose-200'
                      : 'border-slate-200'
                    : 'border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      Q{qIdx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {question.question}
                    </h3>
                  </div>

                  {isSubmitted && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2.5 pl-0 sm:pl-10">
                  {question.options.map((option, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isTheCorrectAnswer = question.correctAnswerIndex === optIdx;

                    let optionBorderClass = 'border-slate-200 hover:border-indigo-300 bg-white';
                    let optionTextClass = 'text-slate-700';

                    if (isSubmitted) {
                      if (isTheCorrectAnswer) {
                        optionBorderClass = 'border-emerald-500 bg-emerald-50/70 font-semibold';
                        optionTextClass = 'text-emerald-950';
                      } else if (isSelected && !isTheCorrectAnswer) {
                        optionBorderClass = 'border-rose-400 bg-rose-50/70';
                        optionTextClass = 'text-rose-950 line-through';
                      } else {
                        optionBorderClass = 'border-slate-100 bg-slate-50/50 opacity-60';
                      }
                    } else if (isSelected) {
                      optionBorderClass = 'border-indigo-600 bg-indigo-50/70 shadow-2xs';
                      optionTextClass = 'text-indigo-950 font-bold';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(question.id, optIdx)}
                        disabled={isSubmitted}
                        className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${optionBorderClass}`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : 'border-slate-300 text-slate-500'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>

                        <span className={`text-xs sm:text-sm leading-relaxed ${optionTextClass}`}>
                          {option}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card when submitted */}
                {isSubmitted && (
                  <div className="mt-5 pl-0 sm:pl-10 pt-4 border-t border-slate-100 text-xs sm:text-sm space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <HelpCircle className="w-4 h-4 text-indigo-600" />
                      <span>Technical Explanation:</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit Action Bar */}
          {!isSubmitted && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                {answeredCount < totalQuestions ? (
                  <span>
                    Answer remaining <strong className="text-slate-800">{totalQuestions - answeredCount}</strong> questions to submit.
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 justify-center sm:justify-start">
                    <Check className="w-4 h-4" />
                    All questions completed and ready for evaluation.
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={answeredCount < totalQuestions}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  answeredCount < totalQuestions
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                }`}
              >
                <span>Submit & View Results</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
};
