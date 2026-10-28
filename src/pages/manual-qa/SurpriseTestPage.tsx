import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
  RotateCcw,
  ShieldCheck,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useManualQa } from '../../context/ManualQaContext';
import { useProgress } from '../../context/ProgressContext';
import { QUESTION_BANK } from '../../data/manualQaQuestionBank';

export const SurpriseTestPage: React.FC = () => {
  const location = useLocation();
  const isFinalAssessment = location.pathname.includes('final-assessment');

  const { state, takeSurpriseTest1, takeFinalAssessment } = useManualQa();
  const { isCourseEnrolled, enrollInCourse } = useProgress();
  const isEnrolled = isCourseEnrolled('manual-qa-fundamentals');

  // Test metadata
  const testTitle = isFinalAssessment
    ? 'Final Comprehensive Assessment: Manual QA Mastery'
    : 'Surprise Test 1: Core Testing & Defect Life Cycle Gatekeeper';

  const testSubtitle = isFinalAssessment
    ? 'Cumulative 15-question examination covering Days 1 through 5. Score ≥ 80% to earn your official completion credential.'
    : 'Mid-programme gatekeeper covering Days 1 through 3. You must score ≥ 80% to prove mastery and unlock Day 4.';

  // Questions selection
  const pool = QUESTION_BANK.filter((q) =>
    isFinalAssessment ? true : [1, 2, 3].includes(q.dayNumber)
  );

  const testQuestions = pool.slice(0, isFinalAssessment ? 15 : 10);

  // User responses
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

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
              Surprise tests and certification assessments require enrollment in the Manual QA course. Day 1 is completely free to start!
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => enrollInCourse('manual-qa-fundamentals')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors text-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Course</span>
              </button>
              <Link
                to="/courses/manual-qa-fundamentals"
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

  // Non-blocking prerequisite advisory check
  const isPrerequisiteMet = isFinalAssessment
    ? state.days[5]?.status === 'completed'
    : state.days[3]?.status === 'completed';

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const qIds = testQuestions.map((q) => q.id);
      let res;
      if (isFinalAssessment) {
        res = await takeFinalAssessment(qIds, answers);
      } else {
        res = await takeSurpriseTest1(qIds, answers);
      }
      setResult(res);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert(err?.message || 'Error evaluating assessment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/manual-qa" className="hover:text-indigo-600 transition-colors">
              Manual QA Roadmap
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600 font-bold">
              {isFinalAssessment ? 'Final Assessment' : 'Surprise Test 1'}
            </span>
          </nav>

          {/* Advisory Prerequisite Banner */}
          {!isPrerequisiteMet && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Advisory:</strong> All course assessments are unlocked for flexible learning. For best results, we recommend completing prior lesson modules and practical exercises first.
                </span>
              </div>
              <Link
                to="/manual-qa"
                className="font-bold underline text-amber-800 hover:text-amber-950 shrink-0 cursor-pointer"
              >
                View Roadmap →
              </Link>
            </div>
          )}

          {/* Hero Header Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isFinalAssessment
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {isFinalAssessment ? 'Final Certification Examination' : 'Surprise Test 1'}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{isFinalAssessment ? '30–45 Mins' : '20–30 Mins'}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Passing Threshold: ≥ 80%</span>
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
                {isFinalAssessment ? (
                  <Award className="w-7 h-7 text-rose-600 shrink-0" />
                ) : (
                  <Sparkles className="w-7 h-7 text-amber-500 shrink-0" />
                )}
                <span>{testTitle}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {testSubtitle}
              </p>
            </div>
          </div>

          {/* Result Banner if already submitted */}
          {result && (
            <div
              className={`p-6 sm:p-7 rounded-3xl border space-y-4 shadow-xs ${
                result.passed
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50/70 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {result.passed ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {result.passed ? 'Assessment Passed!' : 'Assessment Not Passed (Score < 80%)'}
                    </h3>
                    <div className="text-xs sm:text-sm text-slate-700 mt-0.5">
                      Final Score: <strong className="text-slate-900">{result.percentage}%</strong>{' '}
                      ({result.score} Marks)
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!result.passed && (
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Assessment</span>
                    </button>
                  )}

                  {result.passed && (
                    <Link
                      to={isFinalAssessment ? '/manual-qa/certificate' : '/manual-qa/day/4'}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-2xs"
                    >
                      <span>{isFinalAssessment ? 'Claim Your Certificate' : 'Proceed to Day 4'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {result.passed
                  ? isFinalAssessment
                    ? 'Congratulations! You have satisfied all comprehensive assessment benchmarks for the RootAccess Manual QA programme.'
                    : 'Great job! Surprise Test 1 is officially completed and Day 4 has been unlocked in your roadmap.'
                  : 'A minimum passing threshold of 80% is strictly enforced to ensure industry readiness. Review the question explanations below and take the assessment again.'}
              </p>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {testQuestions.map((q, qIdx) => {
              const currentAnswer = answers[q.id];
              const feedbackItem = result?.feedbackDetails?.find((f: any) => f.questionId === q.id);

              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs font-bold border border-indigo-100">
                        {qIdx + 1}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        [Day {q.dayNumber} • {q.topic}]
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {q.marks} Marks
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                    {q.questionText}
                  </h3>

                  {/* Multiple choice options */}
                  {q.options && q.options.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected =
                          q.questionType === 'multiple_select'
                            ? Array.isArray(currentAnswer) && currentAnswer.includes(optIdx)
                            : currentAnswer === optIdx;

                        return (
                          <button
                            key={optIdx}
                            disabled={!!result}
                            onClick={() => {
                              if (q.questionType === 'multiple_select') {
                                const existing = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
                                if (existing.includes(optIdx)) {
                                  setAnswers({
                                    ...answers,
                                    [q.id]: existing.filter((i) => i !== optIdx),
                                  });
                                } else {
                                  setAnswers({
                                    ...answers,
                                    [q.id]: [...existing, optIdx],
                                  });
                                }
                              } else {
                                setAnswers({
                                  ...answers,
                                  [q.id]: optIdx,
                                });
                              }
                            }}
                            className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-50/70 border-indigo-300 text-indigo-900 ring-1 ring-indigo-200 font-medium'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center shrink-0 mt-0.5 bg-white">
                              {isSelected && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Textarea for short answer / scenario */}
                  {(!q.options || q.options.length === 0) && (
                    <div className="pt-1">
                      <textarea
                        rows={3}
                        disabled={!!result}
                        value={currentAnswer || ''}
                        onChange={(e) =>
                          setAnswers({
                            ...answers,
                            [q.id]: e.target.value,
                          })
                        }
                        placeholder="Type your scenario response or explanation here..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  )}

                  {/* Post-submission feedback details */}
                  {feedbackItem && (
                    <div
                      className={`p-4 rounded-xl border text-xs space-y-2 mt-3 ${
                        feedbackItem.isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {feedbackItem.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-600" />
                        )}
                        <span>
                          {feedbackItem.isCorrect
                            ? `Correct (+${feedbackItem.marksAwarded} Marks)`
                            : 'Incorrect (0 Marks)'}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">Model Answer: </span>
                        <span>{feedbackItem.modelAnswer}</span>
                      </div>
                      <div className="text-slate-600 italic">
                        Explanation: {feedbackItem.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          {!result && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
              <div className="text-xs text-slate-600 font-medium">
                Answered: <strong className="text-slate-900">{Object.keys(answers).length}</strong> of {testQuestions.length} Questions
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || Object.keys(answers).length === 0}
                className="w-full sm:w-auto px-7 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-xs text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? 'Grading Assessment against Model Key...' : 'Submit Assessment'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
