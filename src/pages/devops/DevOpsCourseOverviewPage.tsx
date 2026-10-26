import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Terminal,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useDevOps } from '../../context/DevOpsContext';
import { useProgress } from '../../context/ProgressContext';
import { DEVOPS_COURSE_METADATA, DEVOPS_MODULES } from '../../data/devopsCurriculumData';

export const DevOpsCourseOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, enrollInCourse, getOverallStats, getDayProgress } = useDevOps();
  const { isCourseEnrolled, enrollInCourse: enrollProgress } = useProgress();
  const stats = getOverallStats();

  const isEnrolled = state.enrolled || isCourseEnrolled('devops-engineering');

  const handleStartLearning = () => {
    if (!isEnrolled) {
      enrollInCourse();
      enrollProgress('devops-engineering');
    }
    // Determine the next uncompleted day (1, 2, or 3)
    let nextDay = 1;
    for (let d = 1; d <= 3; d++) {
      const p = getDayProgress(d);
      if (!p.quizPassed || !p.assignmentSubmitted) {
        nextDay = d;
        break;
      }
    }
    navigate(`/courses/devops-engineering/day-${nextDay}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* HEADER / HERO BANNER */}
        <div className="bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
              <Link to="/app" className="hover:text-white transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span className="text-indigo-400">DevOps Academy</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-xs font-semibold text-indigo-300 mb-4">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>36-Day Structured Career Track • Days 1–3 Live Now</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {DEVOPS_COURSE_METADATA.title}
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                  {DEVOPS_COURSE_METADATA.description}
                </p>

                {/* Quick Meta Pills */}
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>36 Days Total • 75+ Total Hours</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <Compass className="w-4 h-4 text-emerald-400" />
                    <span>Beginner to Advanced • No Prior DevOps Exp</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Hands-on Linux & CI/CD Simulations</span>
                  </div>
                </div>
              </div>

              {/* Action Card */}
              <div className="w-full lg:w-80 bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Curriculum Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Module 1 Active
                    </span>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                        <span>Foundation Progress</span>
                        <span>{stats.completionPercentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 rounded-full"
                          style={{ width: `${stats.completionPercentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 pt-1">
                      <span>Days Completed: {stats.completedDaysCount} / 3</span>
                      <span>Quizzes: {stats.quizzesPassedCount} passed</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartLearning}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 cursor-pointer"
                >
                  <span>{stats.completedDaysCount > 0 ? 'Continue Learning' : 'Start Learning — Day 1'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TARGET AUDIENCE & PREREQUISITES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>Who This Course Is For</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {DEVOPS_COURSE_METADATA.audience.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Prerequisites & Practical Outcomes</span>
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                <strong>Prerequisites:</strong> {DEVOPS_COURSE_METADATA.prerequisites}
              </p>
              <ul className="space-y-2 text-xs text-slate-600">
                {DEVOPS_COURSE_METADATA.outcomes.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* FULL 36-DAY CURRICULUM ROADMAP (12 MODULES) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Long-Term Learning Pathway</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Full 36-Day DevOps Curriculum Roadmap
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Explore the complete 12-module roadmap from Linux foundations to cloud Kubernetes architecture.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Days 1–3 Live (Implemented)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
                <Lock className="w-3 h-3 text-slate-400" />
                Days 4–36 Upcoming
              </span>
            </div>
          </div>

          {/* Module Cards Grid */}
          <div className="space-y-6">
            {DEVOPS_MODULES.map((module) => {
              const isModule1 = module.moduleNumber === 1;

              return (
                <div
                  key={module.moduleNumber}
                  className={`bg-white rounded-2xl border transition-all ${
                    isModule1
                      ? 'border-indigo-200 shadow-md ring-1 ring-indigo-500/10'
                      : 'border-slate-200/80 shadow-xs'
                  }`}
                >
                  {/* Module Header */}
                  <div
                    className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isModule1 ? 'bg-gradient-to-r from-indigo-50/50 to-transparent border-indigo-100' : 'bg-slate-50/50 border-slate-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                            isModule1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {module.moduleNumber}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">{module.title}</h3>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 ml-10">{module.description}</p>
                    </div>

                    <div className="ml-10 sm:ml-0">
                      {isModule1 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Interactive Lessons Available</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                          <Lock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Upcoming Curriculum</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Days List */}
                  <div className="divide-y divide-slate-100">
                    {module.days.map((day) => {
                      const isImplemented = day.status === 'implemented';
                      const dayProgress = getDayProgress(day.dayNumber);
                      const isDayPassed = dayProgress.quizPassed && dayProgress.assignmentSubmitted;

                      return (
                        <div
                          key={day.dayNumber}
                          className={`p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                            isImplemented ? 'hover:bg-slate-50/80' : 'bg-slate-50/30'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                                isDayPassed
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : isImplemented
                                  ? 'bg-indigo-100 text-indigo-700'
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              {isDayPassed ? <CheckCircle2 className="w-5 h-5" /> : `D${day.dayNumber}`}
                            </div>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4
                                  className={`text-sm font-bold ${
                                    isImplemented ? 'text-slate-900' : 'text-slate-600'
                                  }`}
                                >
                                  {day.title}
                                </h4>
                                {isImplemented && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                                    Interactive Lab
                                  </span>
                                )}
                                {isDayPassed && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                    Passed (80%+)
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 mt-1">{day.subtitle}</p>

                              {/* Key Topics Pills */}
                              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                                {day.keyTopics.map((topic, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-600 font-medium"
                                  >
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="sm:shrink-0 ml-13 sm:ml-0">
                            {isImplemented ? (
                              <Link
                                to={`/courses/devops-engineering/day-${day.dayNumber}`}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
                              >
                                <span>{isDayPassed ? 'Review Day' : 'Open Lesson'}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </Link>
                            ) : (
                              <div
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 bg-slate-100 cursor-not-allowed"
                                title="This day will be unlocked in an upcoming phase"
                              >
                                <Lock className="w-3.5 h-3.5" />
                                <span>Upcoming</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
