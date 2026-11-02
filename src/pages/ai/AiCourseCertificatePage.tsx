import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Printer,
  Calendar,
  Lock,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

export const AiCourseCertificatePage: React.FC = () => {
  const { user, profile } = useAuth();
  const { isLessonCompleted } = useProgress();

  // Check required completion milestones (Days 1 to 7)
  const isDay1Done = isLessonCompleted('ai-day-1');
  const isDay2Done = isLessonCompleted('ai-day-2');
  const isDay3Done = isLessonCompleted('ai-day-3');
  const isDay4Done = isLessonCompleted('ai-day-4');
  const isDay5Done = isLessonCompleted('ai-day-5');
  const isDay6Done = isLessonCompleted('ai-day-6');
  const isDay7Done = isLessonCompleted('ai-day-7');
  const isProjectSubmitted = localStorage.getItem('rootaccess_ai_project_submitted') === 'true';

  const isUnlocked =
    isDay1Done &&
    isDay2Done &&
    isDay3Done &&
    isDay4Done &&
    isDay5Done &&
    isDay6Done &&
    isDay7Done &&
    isProjectSubmitted;

  const studentName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Student';

  const certId = `RA-AI-${(user?.id || 'demo').slice(0, 8).toUpperCase()}-2026`;
  const issueDate = new Date().toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!isUnlocked) {
    const missing: string[] = [];
    if (!isDay1Done) missing.push('Day 1: AI Fundamentals (Knowledge Check)');
    if (!isDay2Done) missing.push('Day 2: Getting Started with AI Tools');
    if (!isDay3Done) missing.push('Day 3: Prompt Engineering Fundamentals');
    if (!isDay4Done) missing.push('Day 4: Advanced Prompting Techniques');
    if (!isDay5Done) missing.push('Day 5: AI for Work & Productivity');
    if (!isDay6Done) missing.push('Day 6: Accuracy & Responsible AI');
    if (!isDay7Done || !isProjectSubmitted) missing.push('Day 7: Capstone Project (Score ≥ 80%)');

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 max-w-lg mx-auto px-4 py-16 flex items-center justify-center text-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h1 className="text-xl font-bold text-slate-900">Certificate Locked</h1>
              <p className="text-xs text-slate-500">
                You must complete all 7 days of coursework, daily knowledge checks, and the final Capstone Project with ≥ 80% to unlock this verified credential.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Missing Requirements ({missing.length}):
              </span>
              <ul className="text-xs text-slate-700 space-y-1.5">
                {missing.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/courses/ai-prompt-engineering/day-1"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs cursor-pointer"
            >
              <span>Continue Learning (Day 1)</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 selection:bg-purple-500 selection:text-white print:bg-white print:p-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 py-6 sm:py-10 print:p-0">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Top Actions (Hidden in Print) */}
          <div className="flex items-center justify-between print:hidden">
            <Link
              to="/courses/ai-prompt-engineering"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Course Syllabus</span>
            </Link>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>

          {/* CERTIFICATE CANVAS */}
          <div className="bg-white border-2 border-purple-100 rounded-3xl p-8 sm:p-14 shadow-sm relative overflow-hidden print:border print:border-slate-300 print:shadow-none print:p-8">
            <div className="border border-purple-100/80 rounded-2xl p-6 sm:p-10 text-center space-y-6 print:border-slate-300">
              {/* Header / Brand */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-purple-50 border border-purple-200/60 rounded-full text-purple-700 text-xs font-bold uppercase tracking-widest print:text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
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
                has successfully completed all coursework, deterministic prompt architecture evaluations, and the Capstone Project for
              </p>

              {/* Course Title */}
              <div className="space-y-1">
                <h2 className="text-lg sm:text-2xl font-bold text-purple-700">
                  AI Fundamentals &amp; Prompt Engineering
                </h2>
                <p className="text-xs text-slate-500">
                  Covering Generative AI Foundations, the 6-Part Framework, Advanced Few-Shot Prompting, Workplace Workflows &amp; Responsible AI
                </p>
              </div>

              {/* Verified Competencies */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-800">Prompt Design</span>
                  <p className="text-[10px] text-slate-400">6-Part Framework</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-800">Techniques</span>
                  <p className="text-[10px] text-slate-400">Few-Shot &amp; Grounding</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-800">Verification</span>
                  <p className="text-[10px] text-slate-400">Hallucination Audits</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg">
                  <span className="font-bold text-slate-800">Capstone</span>
                  <p className="text-[10px] text-slate-400">Productivity Workflow</p>
                </div>
              </div>

              {/* Footer Details: Date & Certificate ID */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Issued on: <strong className="text-slate-800">{issueDate}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <span>Credential ID:</span>
                  <strong className="text-slate-800">{certId}</strong>
                </div>

                <div className="flex items-center gap-1 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified by RootAccess</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
