import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Clock,
  RotateCcw,
  ShieldCheck,
  Lock,
  ChevronRight,
  Target,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useProgress } from '../../context/ProgressContext';
import {
  PLAYWRIGHT_SURPRISE_TEST_1_METADATA,
  PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS,
} from '../../data/playwrightSurpriseTest1Data';

export const PlaywrightSurpriseTest1Page: React.FC = () => {
  const { isCourseEnrolled, enrollInCourse, isLessonCompleted, markLessonComplete } = useProgress();
  const isEnrolled = isCourseEnrolled('playwright-automation');
  const isDay6Completed = isLessonCompleted('lesson-playwright-day-6');

  // User responses
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Check enrollment
  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 max-w-lg mx-auto px-4 py-16 flex items-center justify-center text-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Course Enrollment Required</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Surprise tests and certification assessments require enrollment in the Playwright Automation course.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => enrollInCourse('playwright-automation')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors text-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Course</span>
              </button>
              <Link
                to="/courses/playwright-automation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-xs"
              >
                <span>View Curriculum</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Check prerequisite completion
  if (!isDay6Completed) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 max-w-lg mx-auto px-4 py-16 flex items-center justify-center text-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Assessment Locked</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              You must complete Day 4 (Locators), Day 5 (Actions & Assertions), and Day 6 (Auto-Waiting & Timeouts) before taking Surprise Assessment 1.
            </p>
            <div className="pt-2">
              <Link
                to="/courses/playwright-automation/day-6"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Day 6</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitAssessment = () => {
    let currentScore = 0;
    PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setIsSubmitted(true);

    if (currentScore >= 8) {
      markLessonComplete('lesson-playwright-surprise-test-1', true);
    }

    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 150, behavior: 'smooth' });
      } catch {
        // test env fallback
      }
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 150, behavior: 'smooth' });
      } catch {
        // test env fallback
      }
    }
  };

  const isPassed = isSubmitted && score >= 8;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/courses/playwright-automation" className="hover:text-indigo-600 transition-colors font-medium">
            Playwright Automation Testing
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Surprise Assessment 1</span>
        </nav>

        {/* Assessment Header Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 border border-purple-200">
                Mid-Track Examination
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-full">
                <Clock className="w-3 h-3 text-slate-400" />
                {PLAYWRIGHT_SURPRISE_TEST_1_METADATA.durationMinutes} Minutes
              </span>
              <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
                {PLAYWRIGHT_SURPRISE_TEST_1_METADATA.totalQuestions} Questions
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Passing Grade: {PLAYWRIGHT_SURPRISE_TEST_1_METADATA.passingPercentage}% (8/10)
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Target className="w-7 h-7 text-indigo-600 shrink-0" />
              <span>{PLAYWRIGHT_SURPRISE_TEST_1_METADATA.title}</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              {PLAYWRIGHT_SURPRISE_TEST_1_METADATA.subtitle}
            </p>
          </div>

          {/* Topics Covered Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-slate-500">Coverage:</span>
            {PLAYWRIGHT_SURPRISE_TEST_1_METADATA.topicsCovered.map((topic, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Submission Feedback Banner if submitted */}
          {isSubmitted && (
            <div
              className={`p-6 rounded-2xl border transition-all mt-4 ${
                isPassed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                  : 'bg-rose-50 border-rose-300 text-rose-950 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {isPassed ? (
                    <Award className="w-8 h-8 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <h3 className="text-lg font-bold">
                      {isPassed
                        ? '🎉 Assessment Passed with High Competency!'
                        : 'Assessment Incomplete: Score Below 80%'}
                    </h3>
                    <p className="text-xs sm:text-sm mt-0.5 opacity-90">
                      Your Score: <span className="font-bold">{score} / 10 ({score * 10}%)</span>.
                      {isPassed
                        ? ' You have successfully unlocked Day 7: Multi-Page, Dialogs & Frames.'
                        : ' Review the explanations below and retake the test to achieve 80% or higher.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {!isPassed && (
                    <button
                      onClick={handleRetake}
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Assessment</span>
                    </button>
                  )}
                  {isPassed && (
                    <Link
                      to="/courses/playwright-automation/day-7"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <span>Proceed to Day 7</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS.map((q, idx) => {
            const selectedIdx = answers[q.id];
            const isAnswerCorrect = selectedIdx === q.correctAnswerIndex;

            return (
              <div
                key={q.id}
                className={`bg-white border rounded-2xl p-6 shadow-xs space-y-4 transition-all ${
                  isSubmitted
                    ? isAnswerCorrect
                      ? 'border-emerald-300 ring-1 ring-emerald-200'
                      : 'border-rose-300 ring-1 ring-rose-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {q.topicTag}
                    </span>
                  </div>
                  {isSubmitted && (
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isAnswerCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isAnswerCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                    </span>
                  )}
                </div>

                <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {q.question}
                </div>

                {/* Question Options */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isChosen = selectedIdx === oIdx;
                    const isTheCorrectOne = oIdx === q.correctAnswerIndex;

                    return (
                      <button
                        key={oIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`w-full p-3.5 text-left rounded-xl text-xs sm:text-sm font-medium border-2 transition-all flex items-start gap-3 cursor-pointer ${
                          isSubmitted
                            ? isTheCorrectOne
                              ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold'
                              : isChosen
                              ? 'border-rose-400 bg-rose-50 text-rose-950'
                              : 'border-slate-200 bg-white text-slate-400 opacity-60'
                            : isChosen
                            ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-200'
                            : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs shrink-0 font-bold border transition-colors ${
                            isSubmitted && isTheCorrectOne
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : isChosen
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-100 border-slate-300 text-slate-700'
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="font-mono text-xs sm:text-sm leading-relaxed">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box shown after submission */}
                {isSubmitted && (
                  <div
                    className={`p-4 rounded-xl text-xs space-y-1.5 border ${
                      isAnswerCorrect
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50/80 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Technical Explanation:</span>
                    </div>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Submission Action Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            {isSubmitted ? (
              <span>
                Assessment completed. Score: <strong>{score} / 10</strong> ({score * 10}%). Passing mark is 80%.
              </span>
            ) : (
              <span>
                Answered: <strong>{answeredCount}</strong> of {PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS.length} questions.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAssessment}
                disabled={!allAnswered}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Submit Assessment for Grading</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleRetake}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
                {isPassed && (
                  <Link
                    to="/courses/playwright-automation/day-7"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>Proceed to Day 7</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
