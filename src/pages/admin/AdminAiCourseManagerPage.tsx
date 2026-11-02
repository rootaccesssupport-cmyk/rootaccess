import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  HelpCircle,
  Edit3,
  Eye,
  Save,
  RotateCcw,
  CheckCircle2,
  Lock,
  Users,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { AdminNavHeader } from '../../components/admin/AdminNavHeader';
import { useAuth } from '../../context/AuthContext';
import { ENROLLMENT_PAYMENT_CONFIG } from '../../data/enrollmentPaymentConfig';
import {
  AI_DAYS_DATA,
  AiDayData,
} from '../../data/aiPromptCurriculumData';

export const AdminAiCourseManagerPage: React.FC = () => {
  const { user, profile } = useAuth();

  const isAdmin =
    ENROLLMENT_PAYMENT_CONFIG.isAdminEmail(user?.email) ||
    profile?.role === 'admin' ||
    user?.email === 'pavankalyan.d@gmail.com';

  // Load custom admin overrides if saved in localStorage
  const [curriculumDays, setCurriculumDays] = useState<AiDayData[]>(() => {
    try {
      const stored = localStorage.getItem('rootaccess_admin_ai_curriculum_overrides');
      return stored ? JSON.parse(stored) : AI_DAYS_DATA;
    } catch {
      return AI_DAYS_DATA;
    }
  });

  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz' | 'stats'>('content');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Active Day reference
  const activeDay = curriculumDays.find((d) => d.dayNumber === selectedDayNum) || curriculumDays[0];

  // Editable fields for Active Day
  const [editingTitle, setEditingTitle] = useState(activeDay.title);
  const [editingSubtitle, setEditingSubtitle] = useState(activeDay.subtitle);
  const [editingDuration, setEditingDuration] = useState(activeDay.duration);
  const [editingIntro, setEditingIntro] = useState(activeDay.introduction);

  // Update form fields when selected day changes
  useEffect(() => {
    const d = curriculumDays.find((item) => item.dayNumber === selectedDayNum) || curriculumDays[0];
    setEditingTitle(d.title);
    setEditingSubtitle(d.subtitle);
    setEditingDuration(d.duration);
    setEditingIntro(d.introduction);
  }, [selectedDayNum, curriculumDays]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Admin Access Only</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              This course management portal is restricted to authorized RootAccess platform administrators.
            </p>
            <div className="pt-2">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Return to Student Dashboard
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Save current day edits
  const handleSaveDayContent = () => {
    const updated = curriculumDays.map((d) => {
      if (d.dayNumber === selectedDayNum) {
        return {
          ...d,
          title: editingTitle,
          subtitle: editingSubtitle,
          duration: editingDuration,
          introduction: editingIntro,
        };
      }
      return d;
    });

    setCurriculumDays(updated);
    try {
      localStorage.setItem('rootaccess_admin_ai_curriculum_overrides', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not persist admin overrides:', e);
    }

    setSaveToast(`Day ${selectedDayNum} changes saved successfully!`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Reset to default curriculum
  const handleResetToDefault = () => {
    if (window.confirm('Reset all course edits to standard RootAccess default curriculum?')) {
      setCurriculumDays(AI_DAYS_DATA);
      localStorage.removeItem('rootaccess_admin_ai_curriculum_overrides');
      setSaveToast('Reset to default curriculum successfully.');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar />
      <AdminNavHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Course Management
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-800 rounded-md">
                  7-Day Masterclass
                </span>
              </div>
              <h1 className="text-xl font-extrabold text-slate-900">
                AI Fundamentals &amp; Prompt Engineering Admin Manager
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/courses/ai-prompt-engineering/day-${selectedDayNum}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Preview Learner Experience</span>
            </Link>

            <button
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-medium rounded-xl transition-colors cursor-pointer"
              title="Reset all days to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {saveToast && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* 7-Day Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {curriculumDays.map((d) => {
            const isSelected = d.dayNumber === selectedDayNum;
            return (
              <button
                key={d.dayNumber}
                onClick={() => setSelectedDayNum(d.dayNumber)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                    Day {d.dayNumber}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${isSelected ? 'bg-purple-700 text-purple-100' : 'bg-slate-100 text-slate-600'}`}>
                    {d.quiz.questions.length} Qs
                  </span>
                </div>
                <p className="text-xs font-bold line-clamp-1 mt-1">
                  {d.title.replace(/^Day \d+:\s*/, '')}
                </p>
              </button>
            );
          })}
        </div>

        {/* Tab Switcher for Active Day */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-1 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Day {selectedDayNum} Content &amp; Topics</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Day {selectedDayNum} Assessment Questions ({activeDay.quiz.questions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'stats'
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Course Completion Data</span>
          </button>
        </div>

        {/* TAB 1: DAY CONTENT & TOPICS EDITOR */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Editing Day {selectedDayNum} Curriculum
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Lesson Text, Topics &amp; Practice Exercises
                </h3>
              </div>

              <button
                onClick={handleSaveDayContent}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Day Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Day Title
                </label>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Estimated Duration
                </label>
                <input
                  type="text"
                  value={editingDuration}
                  onChange={(e) => setEditingDuration(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Subtitle / Summary
              </label>
              <input
                type="text"
                value={editingSubtitle}
                onChange={(e) => setEditingSubtitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Day Introduction
              </label>
              <textarea
                rows={3}
                value={editingIntro}
                onChange={(e) => setEditingIntro(e.target.value)}
                className="w-full p-3 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>

            {/* Topics Read-Only Overview */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Day {selectedDayNum} Core Topics ({activeDay.topics.length}):
              </span>
              <div className="space-y-3">
                {activeDay.topics.map((t, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-xs font-bold text-slate-900">{t.title}</span>
                    <p className="text-xs text-slate-600 line-clamp-2">{t.explanation}</p>
                    <div className="pt-1 flex items-center gap-3 text-[11px] text-slate-500">
                      <span>✓ Real-world example included</span>
                      <span>•</span>
                      <span>✓ Worked prompt included</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ASSESSMENT QUESTIONS & EXPLANATIONS */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Assessment Management
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Day {selectedDayNum} Questions &amp; Answer Explanations
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Passing Score: {activeDay.quiz.passingScorePercent}%
              </span>
            </div>

            <div className="space-y-5">
              {activeDay.quiz.questions.map((q, idx) => (
                <div key={q.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-800 text-[11px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{q.question}</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Correct: Option {String.fromCharCode(65 + q.correctAnswerIndex)}
                    </span>
                  </div>

                  <div className="space-y-1.5 pl-7">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-2.5 rounded-lg border text-xs flex items-center gap-2 ${
                          oIdx === q.correctAnswerIndex
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        <span className="font-mono text-[10px] font-bold">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pl-7 pt-2 text-xs text-slate-600 border-t border-slate-200/60">
                    <strong className="text-slate-800">Feedback Explanation:</strong> {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COURSE COMPLETION DATA */}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              AI Fundamentals Learner Activity &amp; Completion Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs text-slate-500 font-semibold uppercase">Pricing Setup</span>
                <p className="text-lg font-extrabold text-slate-900 mt-1">₹299 / ₹599</p>
                <p className="text-[11px] text-emerald-600 font-bold mt-0.5">50% Launch Discount Active</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs text-slate-500 font-semibold uppercase">Total Milestones</span>
                <p className="text-lg font-extrabold text-slate-900 mt-1">7 Days</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Includes Day 7 Capstone Project</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-xs text-slate-500 font-semibold uppercase">Certification Standard</span>
                <p className="text-lg font-extrabold text-slate-900 mt-1">≥ 80% Threshold</p>
                <p className="text-[11px] text-purple-600 font-bold mt-0.5">Deterministic 5-Dimension Rubric</p>
              </div>
            </div>

            <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-xl text-xs text-purple-950 space-y-1">
              <p className="font-bold">Admin Privileges Confirmation:</p>
              <p className="text-purple-900">
                Authorized administrators can approve student enrollments for this track via the <Link to="/admin/enrollments" className="underline font-bold text-purple-700">Enrollments &amp; UPI Portal</Link>. Enrolled learners gain immediate access to Days 2–7.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
