import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Printer,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

export const JmeterCourseCertificatePage: React.FC = () => {
  const { user, profile } = useAuth();
  const { isLessonCompleted } = useProgress();

  // Check required completion milestones (Days 1 to 10)
  const isDay1Done = isLessonCompleted('jmeter-day-1');
  const isDay2Done = isLessonCompleted('jmeter-day-2');
  const isDay3Done = isLessonCompleted('jmeter-day-3');
  const isDay4Done = isLessonCompleted('jmeter-day-4');
  const isDay5Done = isLessonCompleted('jmeter-day-5');
  const isDay6Done = isLessonCompleted('jmeter-day-6');
  const isDay7Done = isLessonCompleted('jmeter-day-7');
  const isDay8Done = isLessonCompleted('jmeter-day-8');
  const isDay9Done = isLessonCompleted('jmeter-day-9');
  const isDay10Done = isLessonCompleted('jmeter-day-10');
  const isProjectSubmitted = localStorage.getItem('rootaccess_jmeter_project_submitted') === 'true';

  const isUnlocked =
    isDay1Done &&
    isDay2Done &&
    isDay3Done &&
    isDay4Done &&
    isDay5Done &&
    isDay6Done &&
    isDay7Done &&
    isDay8Done &&
    isDay9Done &&
    (isDay10Done || isProjectSubmitted);

  const studentName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Performance Engineer';

  const certId = `RA-JMETER-${(user?.id || 'demo').slice(0, 8).toUpperCase()}-2026`;
  const issueDate = new Date().toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  if (!isUnlocked) {
    const missing: string[] = [];
    if (!isDay1Done) missing.push('Day 1: Concurrency, Latency & Load Fundamentals');
    if (!isDay2Done) missing.push('Day 2: Test Plan Architecture & Thread Hierarchy');
    if (!isDay3Done) missing.push('Day 3: HTTP Samplers, Headers & REST APIs');
    if (!isDay4Done) missing.push('Day 4: Response Assertions & Validation SLAs');
    if (!isDay5Done) missing.push('Day 5: CSV Data Parameterization');
    if (!isDay6Done) missing.push('Day 6: Dynamic Correlation & JSONPath Extractor');
    if (!isDay7Done) missing.push('Day 7: Realistic Workload Modeling & Timers');
    if (!isDay8Done) missing.push('Day 8: Performance Metrics & Aggregate Analysis');
    if (!isDay9Done) missing.push('Day 9: Non-GUI Command-Line CLI Execution');
    if (!isDay10Done && !isProjectSubmitted) missing.push('Day 10: Capstone E-Commerce Performance Project');

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100">
        <Navbar />
        <div className="flex-1 max-w-lg mx-auto px-4 py-16 flex items-center justify-center text-center">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 sm:p-10 shadow-2xl space-y-5">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-500/20 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-xl font-bold text-white tracking-tight">Verified Credential Locked</h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                You must complete all 10 days of the Apache JMeter course and submit the Day 10 Capstone Performance Project to unlock this industry-recognized certificate.
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-left space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Pending Requirements ({missing.length}):
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {missing.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/courses/jmeter-performance-testing/day-1"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <span>Continue Learning (Day 1)</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Certificate Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <Link
            to="/courses/jmeter-performance-testing/day-10"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Day 10 Workbench</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print or Save PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Official Certificate */}
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-4 border-amber-500/40 rounded-3xl p-8 sm:p-14 shadow-2xl overflow-hidden print:border-amber-600 print:m-0 print:p-8">
          {/* Watermark / Background Accent */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-8 text-center">
            {/* Header / Brand */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-amber-400">
                <Activity className="w-6 h-6" />
                <span className="text-sm font-mono font-bold uppercase tracking-widest">
                  RootAccess • Learn by Doing
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                Certificate of Completion
              </h1>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Performance Engineering & Load Testing Specification
              </p>
            </div>

            {/* Recipient */}
            <div className="py-4 space-y-2">
              <p className="text-xs text-slate-400 uppercase tracking-widest">
                This is proudly presented to
              </p>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-serif tracking-wide border-b-2 border-amber-500/30 inline-block px-8 pb-2">
                {studentName}
              </div>
            </div>

            {/* Credential Statement */}
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              for successfully completing the comprehensive 10-day hands-on curriculum in{' '}
              <strong className="text-white">Apache JMeter: Performance Testing from Zero to Practical</strong>,
              demonstrating industry-standard competencies in distributed test architecture, dynamic REST API correlation,
              CSV data parameterization, Non-GUI CLI pipelines, and full-scale bottleneck root-cause analysis.
            </p>

            {/* Verified Skills Grid */}
            <div className="pt-4 max-w-3xl mx-auto">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                Verified Technical Competencies
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left">
                {[
                  'Test Plan & Scoping Tree',
                  'REST HTTP Samplers',
                  'Response Code & SLA Assertions',
                  'CSV Dataset Parameterization',
                  'JSONPath Correlation',
                  'Pacing & Constant Throughput',
                  'Aggregate Report Metrics',
                  'Non-GUI CLI Headless Runs',
                  'Root Cause Bottleneck RCA',
                ].map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signatures & Issue Metadata */}
            <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
              <div className="text-left space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Officially Verified Credential</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  ID: <span className="text-slate-200">{certId}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Issued: <span className="text-slate-200">{issueDate}</span>
                </div>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <div className="text-sm font-bold text-white tracking-wide">
                  RootAccess Academic Board
                </div>
                <p className="text-[11px] text-slate-400">
                  Platform Verification & Quality Engineering
                </p>
                <div className="text-[10px] font-mono text-amber-400/80">
                  verify.rootaccess.co.in/{certId}
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
