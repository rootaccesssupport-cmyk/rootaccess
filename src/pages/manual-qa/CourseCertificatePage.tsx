import React from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  ArrowLeft,
  Printer,
  ShieldCheck,
  Calendar,
  Share2,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useManualQa } from '../../context/ManualQaContext';
import { useAuth } from '../../context/AuthContext';

export const CourseCertificatePage: React.FC = () => {
  const { state } = useManualQa();
  const { user } = useAuth();

  const isUnlocked = state.courseCompleted && !!state.certificateId;

  // Recipient name
  const studentName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    (user?.email ? user.email.split('@')[0] : 'RootAccess Certified Learner');

  // Format date in Indian Standard Time (IST)
  const issueDate = state.completedAt
    ? new Date(state.completedAt).toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  if (!isUnlocked) {
    const missing: string[] = [];
    if (state.days[1]?.status !== 'completed') missing.push('Day 1 (Fundamentals & Checkpoint)');
    if (state.days[2]?.status !== 'completed') missing.push('Day 2 (Test Cases & Checkpoint)');
    if (state.days[3]?.status !== 'completed') missing.push('Day 3 (Defect Logging & Checkpoint)');
    if (!state.surpriseTest1Passed) missing.push('Surprise Test 1 (Score ≥ 80%)');
    if (state.days[4]?.status !== 'completed') missing.push('Day 4 (Agile Workflow & Checkpoint)');
    if (!state.finalProjectPassed) missing.push('Day 5 Final Portfolio Project (Rubric Pass)');
    if (!state.finalAssessmentPassed) missing.push('Final Comprehensive Assessment (Score ≥ 80%)');

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 max-w-lg mx-auto px-4 py-16 flex items-center justify-center text-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Certificate of Completion Locked</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To earn your verified RootAccess Manual QA Certificate, you must satisfy all prerequisite course requirements:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Pending Milestones:
              </div>
              {missing.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-rose-700">
                  <span className="text-rose-500 font-bold">✗</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/manual-qa"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Course Roadmap</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-indigo-500 selection:text-white print:bg-white print:p-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 py-6 sm:py-10 print:p-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Actions (Hidden in Print) */}
          <div className="flex items-center justify-between print:hidden">
            <Link
              to="/manual-qa"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Course Roadmap</span>
            </Link>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Certificate link copied to clipboard!');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors border border-slate-200 shadow-2xs cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Link</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>

          {/* CERTIFICATE CANVAS */}
          <div className="bg-white border-2 border-indigo-100 rounded-3xl p-8 sm:p-14 shadow-sm relative overflow-hidden print:border print:border-slate-300 print:shadow-none print:p-8">
            <div className="border border-indigo-100/80 rounded-2xl p-6 sm:p-10 text-center space-y-6 print:border-slate-300">
              {/* Header / Brand */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-200/60 rounded-full text-indigo-700 text-xs font-bold uppercase tracking-widest print:text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>RootAccess Verified Credential</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold tracking-widest text-slate-900 uppercase">
                  Certificate of Completion
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest">
                This is to certify that
              </p>

              {/* Student Name */}
              <div className="py-2 border-b-2 border-slate-900 max-w-md mx-auto">
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
                  {studentName}
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                has successfully completed all coursework, deterministic workplace rubrics, and comprehensive scenario examinations for the
              </p>

              {/* Course Title */}
              <div className="space-y-1">
                <h2 className="text-lg sm:text-2xl font-bold text-indigo-700">
                  Manual QA in 5 Days: Industry-Based Interview Preparation
                </h2>
                <p className="text-xs text-slate-500">
                  Covering STLC, Test Case Design, Defect Lifecycle, Jira Standards &amp; Agile QA
                </p>
              </div>

              {/* Footer Details: Date & Certificate ID */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Issued on: <strong className="text-slate-800">{issueDate}</strong></span>
                </div>
                <div className="font-mono text-[11px] bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 text-slate-700">
                  Credential ID: {state.certificateId}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};
