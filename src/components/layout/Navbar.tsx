import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  LogOut,
  LayoutDashboard,
  Compass,
  Bug,
  Code2,
  CheckCircle2,
  Terminal,
  Database,
  Send,
  BookOpen,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Student';

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const pathname = location.pathname;

  // Detect whether the student is currently inside an active course / lesson / module
  const isInsideCourse =
    pathname.startsWith('/manual-qa') ||
    pathname.startsWith('/courses/') ||
    pathname.startsWith('/playwright');

  // Determine current active course context for classroom mode
  const getCourseClassroomInfo = () => {
    if (pathname.includes('playwright')) {
      return {
        title: 'Playwright Automation',
        icon: Code2,
        colorIcon: 'text-purple-600',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        syllabusUrl: '/courses/playwright-automation',
      };
    }
    if (pathname.includes('manual-qa') || pathname.includes('manual-testing')) {
      return {
        title: 'Manual QA in 5 Days',
        icon: CheckCircle2,
        colorIcon: 'text-indigo-600',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        syllabusUrl: '/manual-qa',
      };
    }
    if (pathname.includes('devops')) {
      return {
        title: 'DevOps Academy',
        icon: Terminal,
        colorIcon: 'text-sky-600',
        badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
        syllabusUrl: '/courses/devops-engineering',
      };
    }
    if (pathname.includes('sql')) {
      return {
        title: 'SQL Database Audits',
        icon: Database,
        colorIcon: 'text-emerald-600',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        syllabusUrl: '/courses/sql-for-qa-engineers',
      };
    }
    if (pathname.includes('api-testing')) {
      return {
        title: 'Postman API Testing',
        icon: Send,
        colorIcon: 'text-amber-600',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        syllabusUrl: '/courses/api-testing-postman',
      };
    }
    return {
      title: 'Course Classroom',
      icon: BookOpen,
      colorIcon: 'text-indigo-600',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      syllabusUrl: '/app',
    };
  };

  const classroomInfo = getCourseClassroomInfo();
  const ClassroomIcon = classroomInfo.icon;

  // General application navigation links (shown when on Dashboard, Home, Simulator)
  const globalNavLinks = [
    { label: 'Dashboard', href: '/app', icon: LayoutDashboard },
    { label: 'Explore Courses', href: '/app?tab=catalog', icon: Compass },
    { label: 'Defect Lab', href: '/simulator', icon: Bug },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to={user ? '/app' : '/'}
            className="flex items-center gap-2 group flex-shrink-0"
            title={user ? 'RootAccess Dashboard' : 'RootAccess Home'}
          >
            <img
              src="/logo.png"
              alt="RootAccess"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            />
            <span className="sr-only">RootAccess</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              isInsideCourse ? (
                // CLASSROOM MODE: When inside a course lesson, display clean back navigation and current course context
                <div className="flex items-center gap-3">
                  <Link
                    to="/app"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200/80 shadow-2xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                    <span>Back to Dashboard</span>
                  </Link>

                  <div className="h-4 w-px bg-slate-200" />

                  <div className="flex items-center gap-2">
                    <ClassroomIcon className={`w-4 h-4 ${classroomInfo.colorIcon}`} />
                    <span className="font-bold text-xs sm:text-sm text-slate-900">
                      {classroomInfo.title}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${classroomInfo.badgeColor}`}
                    >
                      Classroom
                    </span>
                  </div>

                  <div className="h-4 w-px bg-slate-200" />

                  <Link
                    to={classroomInfo.syllabusUrl}
                    className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    Syllabus Overview
                  </Link>
                </div>
              ) : (
                // GLOBAL APP MODE: Clean high-level destinations (NO hardcoded course names)
                <div className="flex items-center gap-1 sm:gap-2 text-xs font-semibold">
                  {globalNavLinks.map((link) => {
                    const Icon = link.icon;
                    const active =
                      link.href === '/app'
                        ? (pathname === '/app' || pathname === '/dashboard') && !location.search.includes('tab=catalog')
                        : link.href.includes('tab=catalog')
                        ? location.search.includes('tab=catalog')
                        : pathname.startsWith(link.href);

                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                          active
                            ? 'bg-indigo-50 text-indigo-700 font-bold shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                        }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 ${
                            active ? 'text-indigo-600' : 'text-slate-400'
                          }`}
                        />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )
            ) : (
              // PUBLIC MARKETING LINKS (Unauthenticated visitors)
              <div className="flex items-center gap-8 text-sm font-medium text-slate-600">
                <a href="/#tracks" className="hover:text-slate-900 transition-colors">
                  Career Tracks
                </a>
                <a href="/#methodology" className="hover:text-slate-900 transition-colors">
                  Practical Learning
                </a>
                <a href="/#how-it-works" className="hover:text-slate-900 transition-colors">
                  How It Works
                </a>
                <a href="/#faq" className="hover:text-slate-900 transition-colors">
                  FAQ
                </a>
              </div>
            )}
          </div>

          {/* Desktop Right Actions (Auth State Aware) */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {/* Student Profile Chip */}
                <Link
                  to="/app"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200/80"
                  title="View your dashboard"
                >
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-slate-800">{displayName}</span>
                </Link>

                {/* Explicit Sign Out Button */}
                <button
                  onClick={handleLogout}
                  title="Sign out"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  aria-label="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sign out</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-all hover:gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-fadeIn shadow-lg">
          {user ? (
            <>
              {/* Authenticated User Summary Header */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {displayName}
                  </div>
                  <div className="text-xs text-slate-500 truncate">{user.email}</div>
                </div>
              </div>

              {/* In-app navigation links */}
              <div className="flex flex-col space-y-1">
                {isInsideCourse ? (
                  <>
                    <Link
                      to="/app"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-indigo-700 bg-indigo-50"
                    >
                      <ArrowLeft className="w-4 h-4 text-indigo-600" />
                      <span>Back to Dashboard</span>
                    </Link>

                    <Link
                      to={classroomInfo.syllabusUrl}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span>{classroomInfo.title} Syllabus</span>
                    </Link>

                    <Link
                      to="/simulator"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Bug className="w-4 h-4 text-slate-400" />
                      <span>Defect Simulator Lab</span>
                    </Link>
                  </>
                ) : (
                  globalNavLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })
                )}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span>Sign out</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Public Marketing Links */}
              <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
                <a
                  href="/#tracks"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  Career Tracks
                </a>
                <a
                  href="/#methodology"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  Practical Learning
                </a>
                <a
                  href="/#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  How It Works
                </a>
                <a
                  href="/#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  FAQ
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
                >
                  Get Started
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
