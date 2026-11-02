import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Eye,
  Save,
  RotateCcw,
  CheckCircle2,
  Lock,
  Layers,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { AdminNavHeader } from '../../components/admin/AdminNavHeader';
import { useAuth } from '../../context/AuthContext';
import { ENROLLMENT_PAYMENT_CONFIG } from '../../data/enrollmentPaymentConfig';
import {
  JMETER_DAYS_DATA,
  JMETER_COURSE_METADATA,
  JmeterDayData,
} from '../../data/jmeterCurriculumData';

export const AdminJmeterCourseManagerPage: React.FC = () => {
  const { user, profile } = useAuth();

  const isAdmin =
    ENROLLMENT_PAYMENT_CONFIG.isAdminEmail(user?.email) ||
    profile?.role === 'admin' ||
    user?.email === 'pavankalyan.d@gmail.com';

  // Load custom admin overrides if saved in localStorage
  const [curriculumDays, setCurriculumDays] = useState<JmeterDayData[]>(() => {
    try {
      const stored = localStorage.getItem('rootaccess_admin_jmeter_curriculum_overrides');
      return stored ? JSON.parse(stored) : JMETER_DAYS_DATA;
    } catch {
      return JMETER_DAYS_DATA;
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
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Access Only</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              This course management portal is restricted to authorized RootAccess platform administrators.
            </p>
            <div className="pt-2">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSaveDayChanges = () => {
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
    localStorage.setItem('rootaccess_admin_jmeter_curriculum_overrides', JSON.stringify(updated));
    setSaveToast(`Day ${selectedDayNum} changes saved successfully!`);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all curriculum content back to the default syllabus?')) {
      localStorage.removeItem('rootaccess_admin_jmeter_curriculum_overrides');
      setCurriculumDays(JMETER_DAYS_DATA);
      setSaveToast('Reset all days to factory curriculum data.');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <AdminNavHeader />

        {/* Header & Meta */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>Curriculum Management Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {JMETER_COURSE_METADATA.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              Manage day modules, visual models, lab specifications, quiz passing SLAs, and student enrollment metrics for the 10-day Apache JMeter program.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/courses/jmeter-performance-testing/day-${selectedDayNum}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Preview Day {selectedDayNum}</span>
            </Link>

            <button
              onClick={handleResetToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-rose-400 border border-slate-800 transition-colors cursor-pointer"
              title="Reset all content to original defaults"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Toast Alert */}
        {saveToast && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Day Selector Ribbon */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 overflow-x-auto scrollbar-none flex items-center gap-2">
          {curriculumDays.map((d) => (
            <button
              key={d.dayNumber}
              onClick={() => setSelectedDayNum(d.dayNumber)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedDayNum === d.dayNumber
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span className="font-mono font-bold">D{d.dayNumber}</span>
              <span className="truncate max-w-[130px]">{d.title.split(':')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content Tabs & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editing Card */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 font-mono text-xs font-bold border border-amber-500/20">
                  Day {activeDay.dayNumber} Config
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'content' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Content
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'quiz' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Quiz ({activeDay.quiz.questions.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('stats')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'stats' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Lab Specs
                  </button>
                </div>
              </div>

              <button
                onClick={handleSaveDayChanges}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Day {activeDay.dayNumber}</span>
              </button>
            </div>

            {/* TAB: CONTENT */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                    Subtitle / Catchphrase
                  </label>
                  <input
                    type="text"
                    value={editingSubtitle}
                    onChange={(e) => setEditingSubtitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                      Estimated Duration
                    </label>
                    <input
                      type="text"
                      value={editingDuration}
                      onChange={(e) => setEditingDuration(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                      Badge / Tag
                    </label>
                    <input
                      type="text"
                      value={activeDay.badge}
                      readOnly
                      className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">
                    Introduction Overview
                  </label>
                  <textarea
                    rows={4}
                    value={editingIntro}
                    onChange={(e) => setEditingIntro(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white leading-relaxed focus:outline-none focus:border-amber-500 transition-colors font-sans"
                  />
                </div>

                {/* Sub-Topics Readonly Listing */}
                <div className="pt-2">
                  <span className="block text-xs font-mono font-bold text-slate-400 uppercase mb-2">
                    Included Sub-Topics ({activeDay.topics.length}):
                  </span>
                  <div className="space-y-2">
                    {activeDay.topics.map((t, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                        <div className="font-semibold text-white flex items-center justify-between">
                          <span>{idx + 1}. {t.title}</span>
                          {t.jmeterElementMapping && (
                            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                              {t.jmeterElementMapping.elementName}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400">{t.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: QUIZ */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>Passing Score Required: <strong className="text-white">{activeDay.quiz.passingScorePercent}%</strong></span>
                  <span>Questions in Pool: <strong className="text-white">{activeDay.quiz.questions.length}</strong></span>
                </div>

                <div className="space-y-4">
                  {activeDay.quiz.questions.map((q, idx) => (
                    <div key={q.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <h4 className="text-xs font-semibold text-white">{q.question}</h4>
                      </div>
                      <div className="pl-7 space-y-1">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-2 rounded text-xs flex items-center justify-between ${
                              oIdx === q.correctAnswerIndex
                                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 font-medium'
                                : 'text-slate-400 bg-slate-900/50'
                            }`}
                          >
                            <span>{opt}</span>
                            {oIdx === q.correctAnswerIndex && <span className="text-[10px] text-emerald-400 font-bold uppercase">Correct</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: LAB SPECS */}
            {activeTab === 'stats' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Interactive Lab Type</span>
                  <h4 className="text-sm font-bold text-white">{activeDay.practicalLab.title}</h4>
                  <p className="text-xs text-slate-400">{activeDay.practicalLab.subtitle}</p>
                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 inline-block">
                      Component Identifier: {activeDay.practicalLab.labType}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Independent Challenge</span>
                  <h4 className="text-sm font-bold text-white">{activeDay.independentChallenge.title}</h4>
                  <p className="text-xs text-slate-400">{activeDay.independentChallenge.scenario}</p>
                </div>

                {activeDay.checkpointReview && (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Cumulative Checkpoint Active</span>
                    <h4 className="text-sm font-bold text-white">{activeDay.checkpointReview.title}</h4>
                    <p className="text-xs text-slate-300">{activeDay.checkpointReview.scenarioDescription}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Stats & Overview */}
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Course Performance & Pricing
              </h3>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Launch Pricing:</span>
                  <span className="text-emerald-400 font-bold">₹299</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Regular Pricing:</span>
                  <span className="text-slate-400 line-through">₹599</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Duration:</span>
                  <span className="text-slate-200 font-mono">10 Days</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Apache JMeter Spec:</span>
                  <span className="text-slate-200 font-mono">v5.6.3 LTS</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                Quick Navigation Links
              </h3>

              <div className="space-y-2">
                <Link
                  to="/courses/jmeter-performance-testing"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                >
                  <span>Public Course Landing Page</span>
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/courses/jmeter-performance-testing/day-1"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                >
                  <span>Day 1 Free Preview Classroom</span>
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  to="/courses/jmeter-performance-testing/certificate"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                >
                  <span>Course Certificate Portal</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
