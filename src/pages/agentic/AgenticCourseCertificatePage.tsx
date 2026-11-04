import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Printer,
  Calendar,
  Lock,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

export const AgenticCourseCertificatePage: React.FC = () => {
  const { user, profile } = useAuth();
  const { isLessonCompleted } = useProgress();

  // Check required completion milestones (Days 1 to 7)
  const isDay1Done = isLessonCompleted('agentic-day-1');
  const isDay2Done = isLessonCompleted('agentic-day-2');
  const isDay3Done = isLessonCompleted('agentic-day-3');
  const isDay4Done = isLessonCompleted('agentic-day-4');
  const isDay5Done = isLessonCompleted('agentic-day-5');
  const isDay6Done = isLessonCompleted('agentic-day-6');
  const isDay7Done = isLessonCompleted('agentic-day-7');
  const isProjectSubmitted =
    localStorage.getItem('rootaccess_agentic_capstone_submitted') === 'true';

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
    'Learner';

  const certId = `RA-AGENTIC-${(user?.id || 'demo').slice(0, 8).toUpperCase()}-2026`;
  const issueDate = new Date().toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!isUnlocked) {
    const missing: string[] = [];
    if (!isDay1Done) missing.push('Day 1: Introduction to Agentic AI (Knowledge Check ≥ 80%)');
    if (!isDay2Done) missing.push('Day 2: Instructions & Structured Outputs');
    if (!isDay3Done) missing.push('Day 3: Tools and Function Calling');
    if (!isDay4Done) missing.push('Day 4: Build a Working AI Agent');
    if (!isDay5Done) missing.push('Day 5: APIs, Knowledge and Memory');
    if (!isDay6Done) missing.push('Day 6: Agent Workflows, Safety and Evaluation');
    if (!isDay7Done) missing.push('Day 7: Final Assessment Quiz (Score ≥ 80%)');
    if (!isProjectSubmitted) missing.push('Day 7: QA AI Assistant Capstone Project Submission');

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
                You must complete all 7 days of agentic AI coursework, daily knowledge checks, and the QA AI Assistant Capstone to unlock this verified credential.
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
              to="/courses/ai-agent-development/day-1"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs cursor-pointer"
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

  const handlePrint = () => {
    window.print();
  };

  const handleShareLinkedIn = () => {
    const text = `I just earned my verified Certificate of Completion in AI Agent Development from RootAccess! Learned by doing: autonomous loops, function calling, RAG, and built an autonomous QA AI Assistant agent.`;
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 print:bg-white print:p-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/courses/ai-agent-development"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Syllabus</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareLinkedIn}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share to LinkedIn</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-white rounded-3xl border-4 border-double border-slate-300 p-8 sm:p-12 shadow-xl relative overflow-hidden text-center space-y-8 print:border-2 print:shadow-none print:p-8">
          {/* Subtle Watermark Badge */}
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-cyan-50 rounded-full blur-2xl opacity-60 pointer-events-none" />

          {/* Header Logos */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="RootAccess" className="h-8 w-auto object-contain" />
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                ACADEMY OF ENGINEERING
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIAL VERIFIED CREDENTIAL</span>
            </div>
          </div>

          {/* Certificate Statement */}
          <div className="space-y-3 pt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-600">
              CERTIFICATE OF COMPLETION
            </span>
            <p className="text-xs text-slate-500 font-serif italic">This is to certify that</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-serif">
              {studentName}
            </h2>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              has successfully completed all 7 days of intensive coursework, rigorous hands-on coding laboratories, daily assessments, and the Capstone Project in:
            </p>
            <div className="text-lg sm:text-2xl font-bold text-cyan-900 pt-1">
              AI Agent Development for Beginners
            </div>
            <p className="text-xs font-medium text-slate-500">
              Autonomous Loops • Tool Function Calling • Structured Outputs • RAG Memory • Guardrails & HITL
            </p>
          </div>

          {/* Verified Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[10px] font-mono text-slate-700">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              ReAct Autonomous Loops
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              Strict JSON Schemas
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              Function Calling & Tools
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              QA AI Assistant Capstone
            </div>
          </div>

          {/* Verification Footer */}
          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="space-y-1 text-xs">
              <div className="text-slate-400 font-mono">Credential ID:</div>
              <div className="font-mono font-bold text-slate-900">{certId}</div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Issued: {issueDate}</span>
              </div>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="font-serif italic text-sm font-bold text-slate-900">
                Pavan Kalyan
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                Head of Instruction & Curriculum, RootAccess
              </div>
              <div className="text-[10px] text-cyan-700 font-mono font-semibold">
                rootaccess.co.in/verify
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};
