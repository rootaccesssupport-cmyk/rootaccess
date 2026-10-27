import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
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
  ChevronRight,
  Sparkles,
  Loader2,
  Edit2,
  Save,
  X,
  Bug,
  Terminal,
  Search,
  Compass,
  Check,
} from 'lucide-react';
import { Alert } from '../components/common/Alert';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useProgress } from '../context/ProgressContext';
import { useDevOps } from '../context/DevOpsContext';

interface CatalogCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  badge: string;
  duration: string;
  level: string;
  description: string;
  tags: string[];
  courseUrl: string;
  syllabusUrl: string;
  iconName: 'BookOpen' | 'Code2' | 'Terminal' | 'Database' | 'Send' | 'Briefcase' | 'Bug';
  colorTheme: 'indigo' | 'purple' | 'sky' | 'emerald' | 'amber' | 'rose';
}

const ALL_CATALOG_COURSES: CatalogCourse[] = [
  {
    id: 'manual-qa',
    slug: 'manual-qa-fundamentals',
    title: 'Manual QA in 5 Days: Interview Preparation',
    category: 'Manual QA & Testing',
    badge: 'Flagship Intensive',
    duration: '5 Days (8 Hours)',
    level: 'Beginner to Intermediate',
    description:
      'Master the Software Testing Life Cycle (STLC), test case design, Boundary Value Analysis, defect severity vs priority, and live Jira defect logging with instructor rubric review.',
    tags: ['STLC', 'Test Design', 'Jira Defects', 'BVA & EP', 'Bug Lifecycle', 'Interview Prep'],
    courseUrl: '/manual-qa',
    syllabusUrl: '/courses/manual-qa-fundamentals',
    iconName: 'BookOpen',
    colorTheme: 'indigo',
  },
  {
    id: 'playwright-js',
    slug: 'playwright-automation',
    title: 'Playwright Automation with JavaScript + AI',
    category: 'Test Automation',
    badge: '20-Day Automation Masterclass',
    duration: '20 Days (24 Hours)',
    level: 'Intermediate',
    description:
      'Master modern browser automation from scratch with pure JavaScript and AI tools. Zero TypeScript overhead. 20 structured daily milestones, DevTools architecture, locators, and Page Object Model frameworks.',
    tags: ['Playwright', 'JavaScript', '@playwright/test', 'Page Object Model', 'AI Testing', 'CI/CD'],
    courseUrl: '/courses/playwright-automation/day-1',
    syllabusUrl: '/courses/playwright-automation',
    iconName: 'Code2',
    colorTheme: 'purple',
  },
  {
    id: 'devops-academy',
    slug: 'devops-engineering',
    title: 'DevOps Engineering: Fundamentals to Production Projects',
    category: 'DevOps & Cloud',
    badge: 'Cloud & DevOps Academy',
    duration: '36 Days (48 Hours)',
    level: 'Beginner to Advanced',
    description:
      'Master the software delivery lifecycle, Linux internals, terminal commands, process triage, log analysis, and incident troubleshooting with live terminal simulations and virtual sandboxes.',
    tags: ['Linux Internals', 'Bash CLI', 'Filesystem & Permissions', 'Processes', 'CI/CD Pipelines', 'Incident Triage'],
    courseUrl: '/courses/devops-engineering/day-1',
    syllabusUrl: '/courses/devops-engineering',
    iconName: 'Terminal',
    colorTheme: 'sky',
  },
  {
    id: 'sql-qa',
    slug: 'sql-for-qa-engineers',
    title: 'SQL & Backend Database Audits for QA',
    category: 'Database & SQL',
    badge: 'Database Verification',
    duration: '6 Hours',
    level: 'Beginner to Intermediate',
    description:
      'Verify frontend transactions against database records, write multi-table JOINs, detect orphaned records, and validate balance updates across relational databases.',
    tags: ['SQL Queries', 'Relational DB', 'INNER & LEFT JOIN', 'Data Integrity', 'Backend Audits'],
    courseUrl: '/courses/sql-for-qa-engineers',
    syllabusUrl: '/courses/sql-for-qa-engineers',
    iconName: 'Database',
    colorTheme: 'emerald',
  },
  {
    id: 'api-postman',
    slug: 'api-testing-postman',
    title: 'API Testing with Postman & JavaScript Assertions',
    category: 'API Testing',
    badge: 'Backend API Track',
    duration: '7 Hours',
    level: 'Intermediate',
    description:
      'Inspect RESTful endpoints, validate JSON schema assertions, manage environment variables, write automated test scripts, and run automated collections.',
    tags: ['Postman', 'REST APIs', 'JSON Schema', 'Auth Headers', 'Automated Assertions'],
    courseUrl: '/courses/api-testing-postman',
    syllabusUrl: '/courses/api-testing-postman',
    iconName: 'Send',
    colorTheme: 'amber',
  },
  {
    id: 'interview-prep',
    slug: 'qa-interview-mastery',
    title: 'QA Technical Interview Prep & Defect Portfolio',
    category: 'Career & Interview',
    badge: 'Career Accelerator',
    duration: '5 Hours',
    level: 'All Levels',
    description:
      'Polish your QA portfolio, practice situational interview scenarios, and master technical question banks with verified senior QA evaluation rubrics.',
    tags: ['STAR Method', 'Bug Portfolio', 'Top 50 QA Questions', 'Mock Interviews', 'Evaluation Rubrics'],
    courseUrl: '/courses/qa-interview-mastery',
    syllabusUrl: '/courses/qa-interview-mastery',
    iconName: 'Briefcase',
    colorTheme: 'rose',
  },
  {
    id: 'defect-sim',
    slug: 'defect-simulator',
    title: 'Workplace Defect Simulation Lab',
    category: 'Manual QA & Testing',
    badge: 'Interactive Lab',
    duration: 'Practice Lab',
    level: 'Hands-on',
    description:
      'Put your testing skills to the test in an interactive staging environment. Uncover 4 real boundary bugs and calculation defects, and log Jira-standard defect tickets for senior QA lead evaluation.',
    tags: ['Interactive Lab', 'Boundary Bugs', 'Jira Defect Logging', 'Immediate Evaluation'],
    courseUrl: '/simulator',
    syllabusUrl: '/simulator',
    iconName: 'Bug',
    colorTheme: 'rose',
  },
];

const COURSE_CATEGORIES = [
  'All Courses',
  'Manual QA & Testing',
  'Test Automation',
  'DevOps & Cloud',
  'Database & SQL',
  'API Testing',
  'Career & Interview',
];

export const StudentDashboardPage: React.FC = () => {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { overallStats, getCourseProgress, isCourseEnrolled, enrollInCourse } = useProgress();
  const { state: devOpsState, getOverallStats: getDevOpsStats, enrollInCourse: enrollInDevOpsCourse } = useDevOps();
  const devopsStats = getDevOpsStats();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab State: 'enrolled' (My Learning), 'catalog' (All Courses & Search), 'interview'
  const tabParam = searchParams.get('tab');
  const initialTab =
    tabParam === 'catalog' || tabParam === 'interview'
      ? tabParam
      : 'enrolled';
  const [activeTab, setActiveTab] = useState<'enrolled' | 'catalog' | 'interview'>(initialTab);

  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (
      currentTab === 'catalog' ||
      currentTab === 'interview' ||
      currentTab === 'enrolled'
    ) {
      setActiveTab(currentTab as any);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'enrolled' | 'catalog' | 'interview') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  // Search and Category Filter State for Course Catalog
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Courses');
  const [enrollmentFeedback, setEnrollmentFeedback] = useState<string | null>(null);

  // Daily interview scenario reveal state
  const [scenarioRevealed, setScenarioRevealed] = useState(false);

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFullName, setEditFullName] = useState(profile?.full_name || user?.user_metadata?.full_name || '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState<string | null>(null);
  const [profileSaveError, setProfileSaveError] = useState<string | null>(null);

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
  const email = user?.email || '';

  const checkCourseEnrolled = (slug: string) => {
    if (slug === 'devops-engineering') {
      return devOpsState.enrolled || isCourseEnrolled('devops-engineering');
    }
    if (slug === 'defect-simulator') {
      return true; // Workplace simulation is open to all students
    }
    return isCourseEnrolled(slug);
  };

  const handleEnrollCourse = (courseSlug: string, courseTitle: string) => {
    enrollInCourse(courseSlug);
    if (courseSlug === 'devops-engineering') {
      enrollInDevOpsCourse();
    }
    setEnrollmentFeedback(`Successfully enrolled in "${courseTitle}"! You can now start learning.`);
    setTimeout(() => {
      setEnrollmentFeedback(null);
    }, 4500);
  };

  const enrolledCoursesList = useMemo(() => {
    return ALL_CATALOG_COURSES.filter((course) => checkCourseEnrolled(course.slug));
  }, [devOpsState.enrolled, isCourseEnrolled]);

  const filteredCatalogCourses = useMemo(() => {
    return ALL_CATALOG_COURSES.filter((course) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.tags.some((t) => t.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === 'All Courses' || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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

  const renderCourseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-purple-600" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-sky-600" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-600" />;
      case 'Send':
        return <Send className="w-5 h-5 text-amber-600" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-rose-600" />;
      case 'Bug':
        return <Bug className="w-5 h-5 text-rose-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* TOP DASHBOARD HEADER */}
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
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
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
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all disabled:opacity-60 focus:outline-none cursor-pointer"
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

        {/* MODERN STUDENT NAVIGATION MENU BAR */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t border-slate-100 text-xs font-semibold">
          <button
            onClick={() => handleTabChange('enrolled')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'enrolled'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Enrolled Courses</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-50 text-indigo-700 font-bold">
              {enrolledCoursesList.length}
            </span>
          </button>

          <button
            onClick={() => handleTabChange('catalog')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Explore All Courses</span>
          </button>

          <button
            onClick={() => handleTabChange('interview')}
            className={`py-3 px-3.5 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'interview'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Daily Interview Scenario</span>
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
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
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
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs disabled:opacity-60 cursor-pointer"
                  >
                    {isSavingProfile ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 1: ENROLLED COURSES */}
        {activeTab === 'enrolled' && (
          <div className="space-y-8 animate-fadeIn">
            {/* WELCOME HERO */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -z-0" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active Student Account</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Welcome back, {displayName}!
                  </h1>
                  <p className="text-sm sm:text-base text-indigo-600 font-semibold mt-1">
                    Your learning journey starts here.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                    Explore our hands-on engineering academies—from <strong>DevOps &amp; Cloud Infrastructure</strong> to <strong>Test Automation &amp; Software Quality</strong>. Practical workplace simulations built for everyone in tech.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 shrink-0 text-center sm:text-left">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Overall Track Progress
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {Math.round((overallStats.totalLessonsCompleted / Math.max(1, overallStats.totalLessonsAvailable)) * 100)}%
                    </span>
                    <span className="text-xs text-slate-500">completed</span>
                  </div>
                  <div className="w-full sm:w-48 bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round(
                          (overallStats.totalLessonsCompleted /
                            Math.max(1, overallStats.totalLessonsAvailable)) *
                            100
                        )}%`,
                      }}
                    />
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
                  <div className="text-xl font-extrabold text-slate-900">
                    {overallStats.totalLessonsCompleted} / {overallStats.totalLessonsAvailable}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Lessons Completed</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">
                    {overallStats.bugsFoundCount}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Defect Logged</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">
                    {overallStats.quizAveragePercent}%
                  </div>
                  <div className="text-xs text-slate-500 font-medium">Quizzes Answered</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900">
                    {overallStats.totalLessonsCompleted > 5 ? 'Intermediate' : 'Beginner'}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">QA Readiness Level</div>
                </div>
              </div>
            </div>

            {/* ENROLLED COURSES SECTION */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    My Enrolled Courses ({enrolledCoursesList.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Courses you have actively enrolled in. Track your progress and resume daily milestones.
                  </p>
                </div>

                <button
                  onClick={() => handleTabChange('catalog')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors border border-indigo-200 self-start sm:self-auto cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Browse More Courses</span>
                </button>
              </div>

              {enrolledCoursesList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {enrolledCoursesList.map((course) => {
                    let progressPercent = 0;
                    if (course.slug === 'devops-engineering') {
                      progressPercent = devopsStats.completionPercentage;
                    } else if (course.slug === 'manual-qa-fundamentals') {
                      progressPercent = getCourseProgress('manual-qa-fundamentals').percent || 40;
                    } else if (course.slug === 'playwright-automation') {
                      progressPercent = getCourseProgress('playwright-automation').percent || 0;
                    } else {
                      progressPercent = getCourseProgress(course.slug).percent || 0;
                    }

                    return (
                      <div
                        key={course.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {course.category}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Enrolled</span>
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                              {course.badge}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-0.5">
                              {course.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                              {course.description}
                            </p>
                          </div>

                          <div className="space-y-1.5 pt-2">
                            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                              <span>Progress</span>
                              <span className="font-bold text-slate-900">{progressPercent}%</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <Link
                            to={course.syllabusUrl}
                            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                          >
                            Syllabus
                          </Link>
                          <Link
                            to={course.courseUrl}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Continue Learning</span>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 shadow-2xs">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100">
                    <Compass className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">No Enrolled Courses Yet</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                      Explore our course catalog to find hands-on tracks in Manual QA, Playwright Automation, DevOps Engineering, and SQL.
                    </p>
                  </div>
                  <button
                    onClick={() => handleTabChange('catalog')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Explore Course Catalog</span>
                  </button>
                </div>
              )}
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
                &ldquo;A user&apos;s UPI payment succeeds in their banking app, but course enrollment is not unlocked. How do you troubleshoot this defect?&rdquo;
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
                    <li><strong>Audit Webhook Logs:</strong> Inspect server logs to verify if the payment gateway&apos;s webhook HTTP POST request reached the RootAccess backend (`200 OK` vs `500 Server Error`).</li>
                    <li><strong>Database Query:</strong> Query the database to check if a row was created in the transactions table and if the user&apos;s enrollment status was flagged.</li>
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

        {/* TAB 2: ALL COURSES & CATALOG (WITH SEARCH AND CATEGORIES) */}
        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fadeIn">
            {/* CATALOG HERO & SEARCH BAR */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Choose &amp; Enroll in Courses</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Course Catalog &amp; Active Enrollments
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Select a course track to enroll and unlock career-focused engineering skills. Search by keyword or filter by domain.
                  </p>
                </div>

                {/* SEARCH INPUT */}
                <div className="w-full md:w-80 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses, skills, or topics..."
                    className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* CATEGORY FILTER PILLS */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-slate-100">
                {COURSE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* ENROLLMENT SUCCESS TOAST */}
            {enrollmentFeedback && (
              <div className="animate-fadeIn">
                <Alert type="success" message={enrollmentFeedback} onClose={() => setEnrollmentFeedback(null)} />
              </div>
            )}

            {/* RESULTS COUNTER */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Showing <strong>{filteredCatalogCourses.length}</strong> of {ALL_CATALOG_COURSES.length} courses
                {selectedCategory !== 'All Courses' && ` in ${selectedCategory}`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
              {(searchQuery || selectedCategory !== 'All Courses') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Courses');
                  }}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* COURSES CATALOG GRID */}
            {filteredCatalogCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCatalogCourses.map((course) => {
                  const enrolled = checkCourseEnrolled(course.slug);

                  return (
                    <div
                      key={course.id}
                      className={`rounded-2xl border p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xs transition-all ${
                        enrolled
                          ? 'border-indigo-200 bg-white'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            {renderCourseIcon(course.iconName)}
                          </div>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                              enrolled
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                            }`}
                          >
                            {enrolled ? 'Enrolled (Active)' : 'Available to Enroll'}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                              {course.badge}
                            </span>
                            <span className="text-[10px] text-slate-400">&bull;</span>
                            <span className="text-[10px] text-slate-500 font-medium">{course.duration}</span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                            {course.description}
                          </p>
                        </div>

                        {/* TAGS */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {course.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* ACTION BAR */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-slate-500">
                          {enrolled ? 'Track Active' : 'Open Access'}
                        </span>

                        <div className="flex items-center gap-2">
                          <Link
                            to={course.syllabusUrl}
                            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                          >
                            Syllabus
                          </Link>

                          {enrolled ? (
                            <Link
                              to={course.courseUrl}
                              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs"
                            >
                              <Play className="w-3.5 h-3.5 fill-white" />
                              <span>Open Course</span>
                            </Link>
                          ) : (
                            <button
                              onClick={() => handleEnrollCourse(course.slug, course.title)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-xs cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Enroll in Course</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">No matching courses found</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    No results for &ldquo;{searchQuery}&rdquo; in {selectedCategory}. Try another keyword like &ldquo;Linux&rdquo;, &ldquo;Playwright&rdquo;, or &ldquo;Jira&rdquo;.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Courses');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DAILY INTERVIEW SCENARIO & VAULT */}
        {activeTab === 'interview' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Technical &amp; Behavioral Interview Vault</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Live QA Interview Scenarios &amp; Evaluation Rubrics
                  </h2>
                </div>
              </div>

              {/* DAILY FEATURED SCENARIO */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-emerald-400 uppercase tracking-wider">Today&apos;s Featured Question</span>
                  <span>Scenario #14</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  &ldquo;A user&apos;s UPI payment succeeds in their banking app, but course enrollment is not unlocked. How do you troubleshoot this defect?&rdquo;
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluates your end-to-end root-cause analysis skills across client states, gateway webhooks, backend server logs, and transactional databases.
                </p>

                {scenarioRevealed ? (
                  <div className="p-5 bg-slate-800/90 border border-slate-700 rounded-2xl text-xs sm:text-sm space-y-3 animate-fadeIn">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Model Technical Answer Rubric:</span>
                    </div>
                    <ol className="list-decimal pl-5 space-y-1.5 text-slate-300">
                      <li><strong>Verify Transaction ID:</strong> Check if the payment gateway (e.g., Razorpay/Stripe) logged the payment status as <em>Captured</em> or <em>Pending</em>.</li>
                      <li><strong>Audit Webhook Logs:</strong> Inspect server logs to verify if the payment gateway&apos;s webhook HTTP POST request reached the RootAccess backend (`200 OK` vs `500 Server Error`).</li>
                      <li><strong>Database Query:</strong> Query the database to check if a row was created in the transactions table and if the user&apos;s enrollment status was flagged.</li>
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

              {/* PRACTICE DRILLS */}
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Technical Drill Scenarios
                </h4>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Scenario #1: Boundary Value Analysis</span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Live Drill</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    &ldquo;An input field accepts an integer age between 18 and 65 inclusive. What exact test input values do you choose for Boundary Value Analysis (BVA)?&rdquo;
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
                    &ldquo;Write a SQL query to verify whether any student exists in the system without an active course enrollment record.&rdquo;
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
      </main>

      {/* DASHBOARD FOOTER */}
      <footer className="w-full text-center py-6 text-xs text-slate-400 border-t border-slate-200 bg-white">
        RootAccess &copy; {new Date().getFullYear()} &mdash; Career Learning &amp; Job Discovery Platform
      </footer>
    </div>
  );
};
