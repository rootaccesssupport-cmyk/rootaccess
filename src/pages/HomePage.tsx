import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  CheckCircle2,
  ArrowRight,
  Code2,
  Database,
  Send,
  Terminal,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Briefcase,
  HelpCircle,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const tracks = [
    {
      title: 'Manual QA & Test Design',
      tag: 'Core Foundation',
      icon: <FileText className="w-5 h-5 text-indigo-600" />,
      description: 'Master the end-to-end bug life cycle, write comprehensive test cases, perform boundary analysis, and log industry-standard Jira defect reports.',
      skills: ['Test Case Design', 'Defect Life Cycle', 'Jira Workflows', 'Boundary Value Analysis', 'Regression Testing'],
    },
    {
      title: 'SQL for Software Testers',
      tag: 'Database Verification',
      icon: <Database className="w-5 h-5 text-emerald-600" />,
      description: 'Learn database verification from scratch. Write real queries, multi-table joins, aggregations, and validate backend data integrity against frontend behaviors.',
      skills: ['SELECT & Filters', 'INNER & LEFT JOINs', 'Data Integrity Audits', 'Subqueries', 'CRUD Operations'],
    },
    {
      title: 'API Testing with Postman',
      tag: 'Backend Testing',
      icon: <Send className="w-5 h-5 text-amber-600" />,
      description: 'Inspect RESTful endpoints, validate JSON responses, write automated Postman test scripts, handle authentication tokens, and run collection tests.',
      skills: ['HTTP Methods & Status Codes', 'Postman Collections', 'JSON Assertions', 'Environment Variables', 'Auth Tokens'],
    },
    {
      title: 'Automation Testing Foundations',
      tag: 'Code & Automation',
      icon: <Code2 className="w-5 h-5 text-purple-600" />,
      description: 'Bridge manual QA to automated testing. Understand DOM locators, test runners, assertion frameworks, and writing clean, reliable test scripts.',
      skills: ['Locator Strategies', 'Assertions', 'Test Runners', 'CI/CD Concepts', 'Automation Best Practices'],
    },
    {
      title: 'Interview & Resume Strategy',
      tag: 'Career Launch',
      icon: <Briefcase className="w-5 h-5 text-rose-600" />,
      description: 'Tackle real behavioral and technical interview questions, build an authentic bug report portfolio, and learn how to present QA projects to recruiters.',
      skills: ['Mock QA Interviews', 'Scenario Questions', 'Resume Optimization', 'Bug Report Portfolio', 'Recruiter Outreach'],
    },
  ];

  const faqs = [
    {
      question: 'Do I need prior coding experience or a Computer Science degree?',
      answer: 'Not at all. RootAccess starts with fundamental Manual QA and test design principles that do not require programming experience. When we introduce SQL and API testing, every concept is taught from the ground up with interactive practical exercises.',
    },
    {
      question: 'How is RootAccess different from typical video courses?',
      answer: 'Most platforms offer passive video watching where students quickly forget what they saw. RootAccess focuses on simulated workplace tasks: writing real test cases, inspecting actual broken UI samples, writing live database queries, and debugging mock endpoints.',
    },
    {
      question: 'How does manual course enrollment and payment work?',
      answer: 'To keep our platform extremely affordable and free from high third-party payment processing overheads, full course enrollments are handled directly via email with UPI or bank transfer verification. Once verified, your account is granted full access.',
    },
    {
      question: 'What career paths does this initial track prepare me for?',
      answer: 'The initial track is specifically built for roles such as Quality Assurance (QA) Engineer, Software Tester, QA Analyst, and Technical Support Specialist.',
    },
    {
      question: 'When will the Jobs Portal feature be live?',
      answer: 'Job discovery is part of Phase 5. Once the core learning and assessment features are verified, we will launch our curated job board with verified openings and direct application links.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-white border-b border-slate-200">
          {/* Subtle background ambient blur */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-50/60 to-transparent pointer-events-none -z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Practical Tech Career Acceleration</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
              Practical tech skills. <br className="hidden sm:inline" />
              Real interview prep.{' '}
              <span className="text-indigo-600">Verified careers.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              RootAccess empowers students, fresh graduates, and career switchers to master in-demand Software Testing, SQL, and API engineering with hands-on exercises instead of passive video playlists.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#tracks"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Explore Learning Tracks
              </a>
            </div>

            {/* Trust Points */}
            <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-left">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100% Practical</h4>
                  <p className="text-[11px] text-slate-500">Real workplace tasks</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Zero Fluff</h4>
                  <p className="text-[11px] text-slate-500">Skills companies hire for</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Affordable</h4>
                  <p className="text-[11px] text-slate-500">No predatory pricing</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Interview Ready</h4>
                  <p className="text-[11px] text-slate-500">Real technical question banks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FLAGSHIP CAREER TRACK SECTION */}
        <section id="tracks" className="py-20 bg-slate-50 scroll-mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-3">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Featured Curriculum</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Software QA &amp; Testing Engineer Track
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                A structured, step-by-step pathway that takes you from complete beginner to job-ready QA professional.
              </p>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.map((track, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        {track.icon}
                      </div>
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {track.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {track.description}
                    </p>
                  </div>

                  <div>
                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Core Competencies:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {track.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upcoming Tracks Teaser Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-indigo-300 text-[11px] font-medium mb-4">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Future Expansion</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    More Tracks Under Development
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    RootAccess will expand into Full-Stack Web Development, Data Analytics, and Performance Engineering.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Register to get early access alerts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHODOLOGY: THE ROOTACCESS DIFFERENCE */}
        <section id="methodology" className="py-20 bg-white border-y border-slate-200 scroll-mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>The RootAccess Difference</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Why watching videos is not enough to pass technical interviews.
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Most candidates struggle during interviews because they know terms by heart but have never designed a real test plan or validated real database schemas under interview pressure.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded bg-indigo-50 text-indigo-600 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Simulated Workplace Tasks</h4>
                      <p className="text-xs text-slate-500">Practice writing defect reports in authentic formats matching what engineering teams expect.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded bg-indigo-50 text-indigo-600 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Hands-on SQL Verification</h4>
                      <p className="text-xs text-slate-500">Write real SELECT queries and JOINs to verify data across multiple database tables.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded bg-indigo-50 text-indigo-600 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Interview Simulation Questions</h4>
                      <p className="text-xs text-slate-500">Prepare for behavioral, situational, and technical testing questions asked by actual hiring managers.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Comparison Box */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800">
                <div className="flex items-center gap-2 mb-6">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span className="font-mono text-xs font-semibold text-slate-300">workplace_simulation.spec</span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
                    <div className="text-slate-400 mb-1">// Traditional Video Courses</div>
                    <div className="text-rose-400">❌ Watch 40 hours of passive video recordings</div>
                    <div className="text-rose-400">❌ Multiple-choice trivia with zero practical application</div>
                    <div className="text-rose-400">❌ Generic certificate that recruiters ignore</div>
                  </div>

                  <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-800/60">
                    <div className="text-indigo-300 mb-1">// The RootAccess Method</div>
                    <div className="text-emerald-400">✓ Write live test cases for real application flows</div>
                    <div className="text-emerald-400">✓ Execute SQL queries to audit database consistency</div>
                    <div className="text-emerald-400">✓ Build a tangible defect portfolio for interviews</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Structured for rapid career readiness</span>
                  <Link to="/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1">
                    <span>Try it free</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 bg-slate-50 scroll-mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                How RootAccess Works
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Four clear steps to turn practical skills into real career opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-mono font-bold flex items-center justify-center text-sm mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Create Account</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sign up in under 60 seconds. Access introductory modules and platform resources immediately.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-mono font-bold flex items-center justify-center text-sm mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Learn by Doing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete interactive exercises, write test suites, and solve simulated workplace tasks.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-mono font-bold flex items-center justify-center text-sm mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Interview Prep</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prepare for recruiter and technical interviews with scenario-based questions and solutions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-mono font-bold flex items-center justify-center text-sm mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Discover Jobs</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explore verified, curated job openings with direct application links to company career pages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSPARENT ENROLLMENT & PRICING PREVIEW */}
        <section className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Affordable &amp; Transparent</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Honest, student-first learning.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              We eliminate expensive platform middle-men. Enroll easily via manual UPI or bank transfer verification directly with RootAccess.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-slate-50/50">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Free Tier</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 mb-1">Free Forever</h3>
                <p className="text-xs text-slate-500 mb-6">For exploring the platform and testing your interest.</p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Access to introductory QA lessons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Basic quiz assessments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Public job board listings (Phase 5)</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Create Free Account
                </Link>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border-2 border-indigo-600 bg-indigo-50/20 relative shadow-sm">
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-indigo-600 text-white tracking-wider">
                    Full Cohort
                  </span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Comprehensive Track</span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2 mb-1">Affordable One-Time</h3>
                <p className="text-xs text-slate-500 mb-6">Verified manually via UPI or bank transfer.</p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complete QA, SQL, API &amp; Automation tracks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Workplace defect report reviews</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full interview question bank &amp; answers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct email mentor support</span>
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs"
                >
                  Join the Waitlist
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 bg-slate-50 scroll-mt-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 text-slate-800 text-xs font-semibold mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Got Questions?</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-6 py-4 flex items-center justify-between text-sm font-semibold text-slate-900 hover:text-indigo-600 transition-colors focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Start building practical tech skills today.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Join students and working professionals preparing for real career transitions. Free account creation in under a minute.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-sm"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                Sign In to Existing Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
