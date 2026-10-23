import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LogOut,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Database,
  Send,
  Code2,
  Briefcase,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Mail,
  Loader2,
  Edit2,
  Save,
  X
} from 'lucide-react';
import { Alert } from '../components/common/Alert';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const StudentDashboardPage: React.FC = () => {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'interview' | 'enrollment'>('overview');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  // Daily interview scenario reveal state
  const [scenarioRevealed, setScenarioRevealed] = useState(false);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFullName, setEditFullName] = useState(profile?.full_name || user?.user_metadata?.full_name || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState<string | null>(null);
  const [profileSaveError, setProfileSaveError] = useState<string | null>(null);

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
  const email = user?.email || 'student@rootaccess.org';

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      const result = await signOut();
      if (!result.success) {
        setLogoutError(result.error || 'Failed to sign out. Please try again.');
        setIsLoggingOut(false);
      } else {
        navigate('/login', {
          state: { message: 'You have been safely logged out.' },
          replace: true,
        });
      }
    } catch (err: any) {
      setLogoutError(err.message || 'An unexpected error occurred during logout.');
      setIsLoggingOut(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFullName.trim()) {
      setProfileSaveError('Full name cannot be empty.');
      return;
    }

    setIsSavingProfile(true);
    setProfileSaveError(null);
    setProfileSaveSuccess(null);

    try {
      if (isSupabaseConfigured && user) {
        // 1. Update public.profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: editFullName.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        if (profileError) {
          console.warn('Could not update profiles table directly, updating auth metadata:', profileError.message);
        }

        // 2. Also update auth metadata
        const { error: authError } = await supabase.auth.updateUser({
          data: { full_name: editFullName.trim() },
        });

        if (authError) {
          throw authError;
        }

        await refreshProfile();
      }

      setProfileSaveSuccess('Profile name updated successfully.');
      setTimeout(() => {
        setIsEditingProfile(false);
        setProfileSaveSuccess(null);
      }, 1500);
    } catch (err: any) {
      setProfileSaveError(err.message || 'Failed to update profile name.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const modules = [
    {
      id: 1,
      title: 'Module 1: Manual QA & Defect Life Cycle',
      description: 'Master test case writing, bug reporting with Jira templates, boundary value analysis, and regression testing.',
      status: 'In Progress',
      progress: 40,
      totalLessons: 8,
      completedLessons: 3,
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      topics: [
        { name: 'Introduction to Software Testing Life Cycle (STLC)', completed: true },
        { name: 'Designing Test Cases with Edge Conditions', completed: true },
        { name: 'Equivalence Partitioning & Boundary Value Analysis', completed: true },
        { name: 'Workplace Defect Logging: Jira Bug Report Standards', completed: false },
        { name: 'Regression Testing & Retesting Workflows', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Module 2: SQL & Backend Database Audits',
      description: 'Validate data integrity across backend tables. Write real SELECT queries, multi-table JOINs, and data audits.',
      status: 'Up Next',
      progress: 0,
      totalLessons: 6,
      completedLessons: 0,
      icon: <Database className="w-5 h-5 text-emerald-600" />,
      topics: [
        { name: 'Relational Database Concepts for QA Testers', completed: false },
        { name: 'Filtering Data with WHERE, IN, LIKE, and BETWEEN', completed: false },
        { name: 'Multi-table Verification with INNER & LEFT JOINs', completed: false },
        { name: 'Auditing Data Mismatches Between UI and Database', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Module 3: API Testing & Postman',
      description: 'Inspect RESTful endpoints, validate JSON payloads, automate assertion scripts, and inspect auth headers.',
      status: 'Locked',
      progress: 0,
      totalLessons: 6,
      completedLessons: 0,
      icon: <Send className="w-5 h-5 text-amber-600" />,
      topics: [
        { name: 'HTTP Protocol: Methods, Headers & Status Codes', completed: false },
        { name: 'Creating Postman Collections & Environment Variables', completed: false },
        { name: 'Writing Automated JavaScript Assertions in Postman', completed: false },
        { name: 'Testing Token-Based Authentication Flows', completed: false },
      ],
    },
    {
      id: 4,
      title: 'Module 4: Automation Testing Foundations',
      description: 'Understand test automation architecture, DOM locators, assertion runners, and reliable script design.',
      status: 'Locked',
      progress: 0,
      totalLessons: 6,
      completedLessons: 0,
      icon: <Code2 className="w-5 h-5 text-purple-600" />,
      topics: [
        { name: 'When to Automate vs Keep Manual', completed: false },
        { name: 'Robust Element Locators (CSS & XPath)', completed: false },
        { name: 'Writing Your First Automated E2E Test Script', completed: false },
      ],
    },
    {
      id: 5,
      title: 'Module 5: Interview Prep & Bug Portfolio',
      description: 'Polish your QA portfolio, practice situational interview scenarios, and master technical question banks.',
      status: 'Locked',
      progress: 0,
      totalLessons: 5,
      completedLessons: 0,
      icon: <Briefcase className="w-5 h-5 text-rose-600" />,
      topics: [
        { name: 'Building a Recruiter-Ready Defect Portfolio', completed: false },
        { name: 'Top 50 Real-World QA Interview Questions', completed: false },
        { name: 'Live Mock Interview Scenarios & Rubrics', completed: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* TOP NAVIGATION */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Track Badge */}
            <div className="flex items-center gap-3 sm:gap-6">
              <Link to="/app" className="flex items-center gap-2 group">
                <img
                  src="/logo.png"
                  alt="RootAccess"
                  className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                />
                <span className="sr-only">RootAccess</span>
              </Link>

              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Track: QA &amp; Software Testing Engineer</span>
              </div>
            </div>

            {/* Profile & Logout Action */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
                title="Edit profile"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-medium">{displayName}</span>
                <Edit2 className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              </button>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                aria-label="Log out"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all disabled:opacity-60 focus:outline-none"
              >
                {isLoggingOut ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <LogOut className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          </div>
        </div>

        {/* DASHBOARD TAB BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t border-slate-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'curriculum'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Curriculum &amp; Modules
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'interview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Daily Interview Scenario
          </button>
          <button
            onClick={() => setActiveTab('enrollment')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'enrollment'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Cohort Enrollment Status
          </button>
        </div>
      </header>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {logoutError && (
          <div className="mb-6">
            <Alert type="error" message={logoutError} onClose={() => setLogoutError(null)} />
          </div>
        )}

        {/* PROFILE EDIT MODAL */}
        {isEditingProfile && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">Student Profile</h3>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {profileSaveSuccess && (
                <div className="mb-4">
                  <Alert type="success" message={profileSaveSuccess} />
                </div>
              )}
              {profileSaveError && (
                <div className="mb-4">
                  <Alert type="error" message={profileSaveError} onClose={() => setProfileSaveError(null)} />
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label htmlFor="editFullName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    id="editFullName"
                    type="text"
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl text-sm cursor-not-allowed"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Managed via Supabase Authentication.</p>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs disabled:opacity-60"
                  >
                    {isSavingProfile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* WELCOME HERO */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-0" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Free Tier Student</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Welcome back, {displayName}!
                  </h1>
                  <p className="text-sm sm:text-base text-indigo-600 font-semibold mt-1">
                    Your learning journey starts here.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                    You are currently studying the <strong>QA &amp; Software Testing Engineer</strong> curriculum. Complete today's defect analysis task to advance your readiness score.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shrink-0 text-center sm:text-left">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Overall Track Progress
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900">15%</span>
                    <span className="text-xs text-slate-500">completed</span>
                  </div>
                  <div className="w-full sm:w-48 bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* METRICS COUNTERS STRIP */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">3 / 31</div>
                  <div className="text-xs text-slate-500 font-medium">Lessons Completed</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">1</div>
                  <div className="text-xs text-slate-500 font-medium">Defect Logged</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">12</div>
                  <div className="text-xs text-slate-500 font-medium">Quizzes Answered</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">Beginner</div>
                  <div className="text-xs text-slate-500 font-medium">QA Readiness Level</div>
                </div>
              </div>
            </div>

            {/* CONTINUE LEARNING ACTIVE MODULE CARD */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Current Module</span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      Module 1: Manual QA &amp; Defect Life Cycle
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('curriculum')}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shrink-0 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Resume Learning</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700">Next lesson: <strong>Workplace Defect Logging: Jira Bug Report Standards</strong></span>
                  <span className="text-slate-500">Estimated: 25 mins</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>

            {/* DAILY INTERVIEW SCENARIO TEASER WIDGET */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-xs font-semibold">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Daily Technical Interview Scenario</span>
                </div>
                <span className="text-xs text-slate-400">Updated Daily</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                "A user's UPI payment succeeds in their banking app, but course enrollment is not unlocked. How do you troubleshoot this defect?"
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                A common real-world QA engineering interview scenario. Tests whether you know how to isolate frontend status, payment gateway webhooks, server logs, and database consistency.
              </p>

              {scenarioRevealed ? (
                <div className="p-5 bg-slate-800/90 border border-slate-700 rounded-2xl text-xs sm:text-sm space-y-3 animate-fadeIn">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Model Technical Answer Rubric:</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                    <li><strong>Verify Transaction ID:</strong> Check if the payment gateway (e.g., Razorpay/Stripe) logged the payment status as <em>Captured</em> or <em>Pending</em>.</li>
                    <li><strong>Audit Webhook Logs:</strong> Inspect server logs to verify if the payment gateway's webhook HTTP POST request reached the RootAccess backend (`200 OK` vs `500 Server Error`).</li>
                    <li><strong>Database Query:</strong> Query the database to check if a row was created in the transactions table and if the user's enrollment status was flagged.</li>
                    <li><strong>Frontend Refresh:</strong> Check if the client application is polling or using WebSocket to detect completion, or if a manual page refresh is needed.</li>
                  </ol>
                  <button
                    onClick={() => setScenarioRevealed(false)}
                    className="text-xs text-slate-400 hover:text-white underline pt-2 cursor-pointer"
                  >
                    Hide model answer
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setScenarioRevealed(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  <span>Reveal Model Answer &amp; Analysis</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CURRICULUM */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Curriculum &amp; Module Progression</h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Step-by-step roadmap for the QA &amp; Software Testing Engineer track.
              </p>
            </div>

            <div className="space-y-4">
              {modules.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:border-slate-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        {m.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              m.status === 'In Progress'
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                : m.status === 'Up Next'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{m.description}</p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 font-medium shrink-0">
                      {m.completedLessons} / {m.totalLessons} Lessons
                    </div>
                  </div>

                  {/* Topics list */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {m.topics.map((t, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-slate-700">
                        {t.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-300 shrink-0 inline-block" />
                        )}
                        <span className={t.completed ? 'line-through text-slate-400' : ''}>{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INTERVIEW PRACTICE */}
        {activeTab === 'interview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Technical &amp; Behavioral Interview Vault</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Real interview scenarios gathered from QA Engineer, Software Tester, and QA Analyst hiring processes.
              </p>

              <div className="space-y-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Scenario #1: Boundary Testing</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Common Interview Question</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    "An input field accepts an integer age between 18 and 65 inclusive. What exact test input values do you choose for Boundary Value Analysis (BVA)?"
                  </h3>
                  <p className="text-xs text-slate-600">
                    <strong>Model Response:</strong> Minimum boundary: 17 (just below min, invalid), 18 (min, valid), 19 (just above min, valid). Maximum boundary: 64 (just below max, valid), 65 (max, valid), 66 (just above max, invalid). Plus non-integer/null checks.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Scenario #2: Database Verification</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Live SQL Test</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    "Write a SQL query to verify whether any student exists in the system without an active course enrollment record."
                  </h3>
                  <div className="bg-slate-900 text-emerald-400 font-mono text-xs p-3 rounded-xl overflow-x-auto">
                    SELECT u.id, u.email, e.course_id<br/>
                    FROM users u<br/>
                    LEFT JOIN enrollments e ON u.id = e.user_id<br/>
                    WHERE e.id IS NULL;
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COHORT ENROLLMENT */}
        {activeTab === 'enrollment' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Full Cohort Enrollment &amp; Verification
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                RootAccess keeps training accessible and affordable by verifying enrollments directly via manual UPI or bank transfer, avoiding expensive payment gateway overheads.
              </p>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3 mb-6 text-xs text-slate-700">
                <div className="font-bold text-slate-900">What full cohort enrollment unlocks:</div>
                <ul className="space-y-2 list-disc pl-4 text-slate-600">
                  <li>Direct feedback on your Jira defect reports from experienced QA leads.</li>
                  <li>Full access to all 5 modules (SQL, Postman API collections, Playwright automation).</li>
                  <li>1-on-1 resume review optimized for technical recruiter screening.</li>
                  <li>Mock interview sessions with live problem-solving drills.</li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl text-xs space-y-2 text-indigo-950 mb-6">
                <div className="font-semibold flex items-center gap-1.5 text-indigo-900">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <span>How to enroll:</span>
                </div>
                <p>
                  Send an email to <span className="font-mono font-bold text-indigo-700">support@rootaccess.org</span> with your registered email (<code>{email}</code>). We will share UPI payment details and manually verify and grant full cohort access within 2 hours.
                </p>
              </div>

              <a
                href={`mailto:support@rootaccess.org?subject=Enrollment Request for RootAccess QA Track - ${email}`}
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-xs"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Support to Enroll via UPI / Bank Transfer</span>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* DASHBOARD FOOTER */}
      <footer className="w-full text-center py-6 text-xs text-slate-400 border-t border-slate-200 bg-white">
        RootAccess &copy; {new Date().getFullYear()} &mdash; Career Learning &amp; Job Discovery Platform
      </footer>
    </div>
  );
};
