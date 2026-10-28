import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  BookOpen,
  Award,
  AlertCircle,
  FileText,
  Clock,
  Layers,
  Sparkles,
  RefreshCw,
  FileCode2,
  ChevronRight,
  Bug,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useManualQa } from '../../context/ManualQaContext';
import { useProgress } from '../../context/ProgressContext';
import { MANUAL_QA_DAYS, COURSE_METADATA } from '../../data/manualQaCurriculum';

export const ManualQaCourseHubPage: React.FC = () => {
  const { state, loading, resetProgressForTesting } = useManualQa();
  const { isCourseEnrolled, enrollInCourse } = useProgress();
  const isEnrolled = isCourseEnrolled('manual-qa-fundamentals');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6 text-slate-600">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
            <span className="text-sm font-medium">Loading your course roadmap...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const completedDaysCount = [1, 2, 3, 4, 5].filter(
    (d) => state.days[d]?.status === 'completed'
  ).length;

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
        <Navbar />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center max-w-xl space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Course Enrollment Required</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {COURSE_METADATA.title}
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Free students can explore the course curriculum and syllabus. To access the 5-day daily learning pathway, interactive scenario tables, Jira defect simulator, and verified certification, please enroll in this course.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2 text-slate-700">
              <div className="font-bold text-slate-900">What full course enrollment unlocks:</div>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                <li>Complete 5-day intensive curriculum (Fundamentals, EP &amp; BVA, Jira, Agile, Retesting)</li>
                <li>Interactive scenario design tables and deterministic rubric evaluations</li>
                <li>Mid-course surprise gatekeeper test and final portfolio assessment</li>
                <li>RootAccess Official Manual QA Certificate of Completion with unique ID</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => enrollInCourse('manual-qa-fundamentals')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enroll in Course</span>
              </button>
              <Link
                to="/courses/manual-qa-fundamentals"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Full Curriculum</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const progressPercent = Math.round(
    (completedDaysCount / 5) * 60 +
      (state.surpriseTest1Passed ? 15 : 0) +
      (state.finalProjectPassed ? 15 : 0) +
      (state.finalAssessmentPassed ? 10 : 0)
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link to="/courses/manual-qa-fundamentals" className="hover:text-indigo-600 transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600 font-bold">Manual QA 5-Day Roadmap</span>
          </nav>

          {/* Quick link to Manual QA Curriculum Page */}
          <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-indigo-950">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                Looking for the full syllabus, learning outcomes, and course structure?
              </span>
            </div>
            <Link
              to="/courses/manual-qa-fundamentals"
              className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Explore Manual QA Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Banner for Cloud Sync */}
          {!state.isCloudSynced && (
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-xs">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-amber-900">Local Authenticated Mode: </span>
                <span className="text-amber-800">
                  {state.cloudMissingReason ||
                    'Cloud database not connected in .env. Your submissions and quiz scores are actively saving to browser persistent storage.'}
                </span>
              </div>
            </div>
          )}

          {/* Hero Header Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-full text-xs font-bold tracking-wide uppercase">
                  Flagship Career Track
                </span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-xs font-semibold">
                  Industry Manual QA Standard
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                  100% Practical &amp; Deterministic Rubrics
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                  {COURSE_METADATA.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                  {COURSE_METADATA.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-slate-100 text-xs">
                <div>
                  <div className="text-slate-500 font-medium">Total Commitment</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">2–3 hrs/day (10–15 hrs)</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Passing Threshold</div>
                  <div className="text-sm font-bold text-emerald-600 mt-0.5">≥ 80% per Checkpoint</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Surprise Assessments</div>
                  <div className="text-sm font-bold text-amber-600 mt-0.5">2 Tests (Mid &amp; Final)</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Outcome</div>
                  <div className="text-sm font-bold text-indigo-600 mt-0.5">Verified QA Certificate</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="/manual-qa/day-1-software-testing-fundamentals.pdf"
                    download="day-1-software-testing-fundamentals.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download Day 1 PDF</span>
                  </a>
                  <a
                    href="/RootAccess_QA_Curriculum_Syllabus.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Full QA Syllabus</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    if (confirm('Reset your progress back to Day 1? (Useful for testing)')) {
                      resetProgressForTesting();
                    }
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Reset progress to pristine initial state"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Course Progress</span>
                </button>
              </div>
            </div>
          </div>

          {/* Overall Progress Tracker Bar Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">Your Progress to Certification</h2>
                  <p className="text-xs text-slate-500">Track all 5 day checkpoints, surprise tests, and final portfolio deliverables.</p>
                </div>
              </div>
              <div className="text-sm font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
                {progressPercent}% Completed
              </div>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2 text-slate-600">
                <span className={`w-2 h-2 rounded-full ${completedDaysCount >= 3 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <span>Days 1–3: <strong className="text-slate-900">{Math.min(completedDaysCount, 3)}/3</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className={`w-2 h-2 rounded-full ${state.surpriseTest1Passed ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <span>Surprise Test 1: <strong className="text-slate-900">{state.surpriseTest1Passed ? 'Passed' : 'Pending'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className={`w-2 h-2 rounded-full ${state.finalProjectPassed ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <span>Final Project: <strong className="text-slate-900">{state.finalProjectPassed ? 'Passed' : 'Pending'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className={`w-2 h-2 rounded-full ${state.courseCompleted ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <span>Certificate: <strong className="text-slate-900">{state.courseCompleted ? 'Unlocked' : 'Locked'}</strong></span>
              </div>
            </div>
          </div>

          {/* 5-Day Roadmap Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>The 5-Day Daily Learning Pathway</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">Strict prerequisite progression enforced</span>
            </div>

            <div className="space-y-3.5">
              {/* DAY 1 */}
              <DayCard
                day={MANUAL_QA_DAYS[0]}
                status={state.days[1]?.status || 'available'}
                checkpointScore={state.days[1]?.checkpointScore}
                practicalPassed={state.days[1]?.practicalCompleted}
                linkTo="/manual-qa/day/1"
                actionText="Start Day 1"
              />

              {/* DAY 2 */}
              <DayCard
                day={MANUAL_QA_DAYS[1]}
                status={state.days[2]?.status || 'available'}
                checkpointScore={state.days[2]?.checkpointScore}
                practicalPassed={state.days[2]?.practicalCompleted}
                linkTo="/manual-qa/day/2"
                actionText="Start Day 2"
              />

              {/* DAY 3 */}
              <DayCard
                day={MANUAL_QA_DAYS[2]}
                status={state.days[3]?.status || 'available'}
                checkpointScore={state.days[3]?.checkpointScore}
                practicalPassed={state.days[3]?.practicalCompleted}
                linkTo="/manual-qa/day/3"
                actionText="Start Day 3"
              />

              {/* SURPRISE TEST 1 GATEKEEPER */}
              <div
                className={`p-6 rounded-2xl border transition-all ${
                  state.surpriseTest1Passed
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200 uppercase">
                        Mid-Programme Gatekeeper
                      </span>
                      <span className="text-xs text-slate-500">Covers Days 1 to 3</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Surprise Test 1: Core Testing &amp; Defect Management Mastery
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      10-question randomized scenario assessment. Score ≥ 80% to demonstrate mid-programme mastery.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {state.surpriseTest1Passed ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Passed ({state.surpriseTest1Score}%)</span>
                      </div>
                    ) : (
                      <Link
                        to="/manual-qa/surprise-test-1"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-colors shadow-xs text-xs"
                      >
                        <span>Take Surprise Test 1</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* DAY 4 */}
              <DayCard
                day={MANUAL_QA_DAYS[3]}
                status={state.days[4]?.status || 'available'}
                checkpointScore={state.days[4]?.checkpointScore}
                practicalPassed={state.days[4]?.practicalCompleted}
                linkTo="/manual-qa/day/4"
                actionText="Start Day 4"
              />

              {/* DAY 5 */}
              <DayCard
                day={MANUAL_QA_DAYS[4]}
                status={state.days[5]?.status || 'available'}
                checkpointScore={state.days[5]?.checkpointScore}
                practicalPassed={state.days[5]?.practicalCompleted}
                linkTo="/manual-qa/day/5"
                actionText="Start Day 5"
              />

              {/* DAY 5 FINAL PORTFOLIO PROJECT */}
              <div
                className={`p-6 rounded-2xl border transition-all ${
                  state.finalProjectPassed
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : state.days[5]?.status !== 'locked'
                    ? 'bg-indigo-50/60 border-indigo-200 ring-1 ring-indigo-200'
                    : 'bg-white border-slate-200 opacity-75'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 uppercase">
                        Capstone Deliverable
                      </span>
                      <span className="text-xs text-slate-500">Portfolio Ready</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-indigo-600" />
                      Day 5 Final Project: E-Commerce Checkout Test Suite &amp; Defect Report
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Design ≥15 structured test cases, discover and document ≥2 high-severity defect reports, and author an executive Test Summary Report.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {state.finalProjectPassed ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Passed Rubric</span>
                      </div>
                    ) : (
                      <Link
                        to="/manual-qa/final-project"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-xs text-xs"
                      >
                        <span>Open Final Project</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* FINAL SURPRISE ASSESSMENT */}
              <div
                className={`p-6 rounded-2xl border transition-all ${
                  state.finalAssessmentPassed
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-rose-50/50 border-rose-200 ring-1 ring-rose-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-800 border border-rose-200 uppercase">
                        Final Certification Exam
                      </span>
                      <span className="text-xs text-slate-500">15 Comprehensive Questions</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-rose-600" />
                      Final Comprehensive Assessment: Manual QA Mastery
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Exhaustive scenario exam covering Days 1–5. Score ≥ 80% to earn your RootAccess Manual QA Certificate.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {state.finalAssessmentPassed ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Passed ({state.finalAssessmentScore}%)</span>
                      </div>
                    ) : (
                      <Link
                        to="/manual-qa/final-assessment"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-xs text-xs"
                      >
                        <span>Start Final Assessment</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* INCLUDED PRACTICAL LAB: DEFECT SIMULATOR */}
              <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
                <div className="space-y-1.5 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    <Bug className="w-3.5 h-3.5 text-rose-400" />
                    <span>Included Practical Lab</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Workplace Defect Simulation Lab
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Practice defect hunting on our live e-commerce staging application. Uncover 4 real boundary bugs, cart calculation defects, and silent form failures, and log Jira-standard defect tickets for senior QA evaluation.
                  </p>
                </div>

                <Link
                  to="/simulator"
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
                >
                  <Bug className="w-4 h-4 text-rose-600" />
                  <span>Launch Defect Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* OFFICIAL COMPLETION CERTIFICATE CARD */}
              <div
                className={`p-6 sm:p-7 rounded-3xl border transition-all ${
                  state.courseCompleted
                    ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border-emerald-300 shadow-sm'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                        Official Credential
                      </span>
                      {state.courseCompleted && (
                        <span className="text-xs text-emerald-700 font-mono font-bold">
                          ID: {state.certificateId}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-500" />
                      RootAccess Manual QA Certificate of Completion
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                      Verifiable credential highlighting your mastery in Manual QA, Defect Life Cycle, BVA/EP Test Case Design, and Agile Quality Workflows.
                    </p>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto">
                    {state.courseCompleted ? (
                      <Link
                        to="/manual-qa/certificate"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-xs text-xs w-full sm:w-auto"
                      >
                        <span>View &amp; Print Certificate</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-500 rounded-xl text-xs font-medium">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Locked (Complete all 5 Days + Both Assessments)</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface DayCardProps {
  day: (typeof MANUAL_QA_DAYS)[0];
  status: 'locked' | 'available' | 'in_progress' | 'awaiting_review' | 'failed' | 'completed';
  checkpointScore?: number;
  practicalPassed?: boolean;
  lockedReason?: string;
  linkTo: string;
  actionText?: string;
  onEnrollClick?: () => void;
}

const DayCard: React.FC<DayCardProps> = ({
  day,
  status,
  checkpointScore,
  practicalPassed,
  lockedReason,
  linkTo,
  actionText,
  onEnrollClick,
}) => {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  return (
    <div
      className={`p-6 rounded-2xl border transition-all ${
        isCompleted
          ? 'bg-white border-emerald-200 ring-1 ring-emerald-100 shadow-2xs'
          : isLocked
          ? 'bg-slate-50 border-slate-200 opacity-75'
          : 'bg-white border-slate-200 hover:border-indigo-300 shadow-2xs hover:shadow-xs'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`px-2.5 py-0.5 rounded-full font-bold ${
                isCompleted
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : isLocked
                  ? 'bg-slate-100 text-slate-600'
                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              }`}
            >
              DAY {day.dayNumber}
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {day.estimatedHours}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{day.learningObjectives.length} Learning Objectives</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900">{day.title}</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{day.subtitle}</p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${practicalPassed ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span>Practical: {practicalPassed ? <strong className="text-emerald-700">Passed</strong> : 'Pending'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${checkpointScore && checkpointScore >= 80 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span>Quiz: {checkpointScore ? <strong className="text-slate-900">{checkpointScore}%</strong> : 'Not taken'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0">
          {isCompleted ? (
            <Link
              to={linkTo}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Review Day {day.dayNumber}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : isLocked ? (
            <div className="flex flex-col items-end gap-1.5">
              {onEnrollClick ? (
                <button
                  onClick={onEnrollClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Enroll to Unlock</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 justify-end">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Locked</span>
                </div>
              )}
              {lockedReason && (
                <div className="text-[11px] text-slate-500 mt-0.5 max-w-xs text-right">{lockedReason}</div>
              )}
            </div>
          ) : (
            <Link
              to={linkTo}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
            >
              <span>{actionText || `Start Day ${day.dayNumber}`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
