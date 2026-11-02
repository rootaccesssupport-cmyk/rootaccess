import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import {
  Briefcase,
  ExternalLink,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Search,
  Building2,
  TrendingUp,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Careers & Tech Jobs Across India — RootAccess & GrossNumber.com';
  }, []);

  const topLocations = [
    { name: 'Bengaluru', tag: 'Silicon Valley of India', count: 'High Demand' },
    { name: 'Hyderabad', tag: 'Cyberabad Tech Corridor', count: 'Active Hiring' },
    { name: 'Pune', tag: 'IT & Product Hub', count: 'Growing Fast' },
    { name: 'Delhi NCR', tag: 'Gurugram & Noida Tech', count: 'Top MNCs' },
    { name: 'Mumbai', tag: 'FinTech & BFSI Tech', count: 'Top Salaries' },
    { name: 'Chennai', tag: 'SaaS Capital of India', count: 'Expanding' },
    { name: 'Remote / Work From Home', tag: 'Pan-India Remote Roles', count: 'Flexible' },
  ];

  const inDemandRoles = [
    {
      title: 'Manual QA / Test Engineer',
      description: 'Functional testing, test case design, defect triage, regression, and Jira bug tracking.',
      tags: ['Test Design', 'STLC', 'Jira', 'Agile'],
      url: 'https://grossnumber.com',
    },
    {
      title: 'Automation Test Engineer (SDET)',
      description: 'Browser & UI test automation with Playwright, JavaScript/TypeScript, and CI/CD pipelines.',
      tags: ['Playwright', 'TypeScript', 'GitHub Actions', 'Page Objects'],
      url: 'https://grossnumber.com',
    },
    {
      title: 'SQL & Database QA / Analyst',
      description: 'Database verification, complex SQL queries, multi-table joins, and migration reconciliation.',
      tags: ['PostgreSQL', 'MySQL', 'Aggregates', 'Data Audits'],
      url: 'https://grossnumber.com',
    },
    {
      title: 'API & Backend Test Engineer',
      description: 'REST API validation, Postman collection automation, JWT auth checks, and SLA audits.',
      tags: ['Postman', 'REST', 'Bearer Tokens', 'Chai pm.*'],
      url: 'https://grossnumber.com',
    },
    {
      title: 'QA Lead & Test Strategist',
      description: 'Test planning, risk-based testing, sprint governance, and quality metrics reporting.',
      tags: ['Test Strategy', 'RTM', 'Team Leadership', 'Release Audits'],
      url: 'https://grossnumber.com',
    },
    {
      title: 'Junior Software Engineer & Intern',
      description: 'Entry-level engineering roles for fresh graduates, boot campers, and career switchers.',
      tags: ['Freshers', 'Graduates', 'Career Switchers', 'Mentorship'],
      url: 'https://grossnumber.com',
    },
  ];

  const platformAdvantages = [
    {
      icon: <Building2 className="w-5 h-5 text-indigo-600" />,
      title: 'Verified Companies Across India',
      description: 'Discover openings at fast-growing startups, established tech firms, and top Indian product companies.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      title: 'Up-to-Date Hiring Trends',
      description: 'Access real-time job listings tailored to the current Indian tech hiring market and salary benchmarks.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      title: 'Direct Application Channels',
      description: 'Skip redundant aggregators—reach direct company portals and recruiters ready to evaluate your portfolio.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      title: 'Perfect Match for RootAccess Skills',
      description: 'Apply the practical skills you built in RootAccess Playwright, SQL, Manual QA, and API labs.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
          {/* Subtle background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            {/* Top Partnership Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-slate-300 mb-6 backdrop-blur-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>RootAccess Career Network</span>
              <span className="text-slate-500">•</span>
              <span className="text-indigo-400 font-bold">GrossNumber.com</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Find Tech &amp; QA Jobs <br className="hidden sm:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
                All Over India
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              RootAccess gives you the hands-on engineering skills. Now explore thousands of verified job openings for Software QA, Test Automation, SQL, API, and Developer roles on <strong className="text-white">GrossNumber.com</strong>.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://grossnumber.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-600/25 group cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-indigo-200 group-hover:scale-110 transition-transform" />
                <span>Explore Jobs on GrossNumber.com</span>
                <ExternalLink className="w-4 h-4 text-indigo-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <Link
                to="/app"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
              >
                <Compass className="w-4 h-4 text-slate-400" />
                <span>Back to RootAccess Dashboard</span>
              </Link>
            </div>

            {/* Micro value props */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pan-India Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Freshers &amp; Experienced Roles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Direct Recruiter Links</span>
              </div>
            </div>
          </div>
        </section>

        {/* PAN-INDIA LOCATIONS STRIP */}
        <section className="py-12 bg-slate-950/60 border-b border-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Hiring Locations</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Active Tech Hubs Across India
                </h2>
              </div>
              <a
                href="https://grossnumber.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>View all cities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {topLocations.map((loc) => (
                <a
                  key={loc.name}
                  href="https://grossnumber.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all text-left group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {loc.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {loc.tag}
                  </div>
                  <div className="mt-2 text-[9px] font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{loc.count}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* IN-DEMAND ROLES SECTION */}
        <section className="py-16 bg-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
                <Search className="w-3.5 h-3.5" />
                <span>Curated Job Categories</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Roles Matching Your RootAccess Skills
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                Click any role to browse live openings and requirements on GrossNumber.com.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {inDemandRoles.map((role, idx) => (
                <a
                  key={idx}
                  href={role.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500 hover:bg-slate-900/90 transition-all flex flex-col justify-between group shadow-lg shadow-black/20"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                        {role.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {role.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80 mb-3">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] font-medium bg-slate-800 text-slate-300 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      <span>View Openings on GrossNumber</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* WHY GROSSNUMBER SECTION */}
        <section className="py-16 bg-slate-950/80 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why We Recommend GrossNumber.com
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                Finding a tech job shouldn't mean scrolling through dead job boards or misleading listings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {platformAdvantages.map((adv, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800/80 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                    {adv.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-STEP JOURNEY */}
        <section className="py-16 bg-slate-900 border-t border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                From Practical Learning to Job Offer
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                How RootAccess and GrossNumber combine to accelerate your career.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 relative">
                <div className="text-3xl font-black text-indigo-500/30 mb-2">01</div>
                <h3 className="font-bold text-white text-sm mb-1.5">Master Real Skills</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Learn through live browser automation, PostgreSQL audits, API collections, and simulated defect triaging.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 relative">
                <div className="text-3xl font-black text-indigo-500/30 mb-2">02</div>
                <h3 className="font-bold text-white text-sm mb-1.5">Discover Jobs in India</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Navigate to GrossNumber.com to search verified openings in Bengaluru, Pune, Hyderabad, or Remote.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 relative">
                <div className="text-3xl font-black text-indigo-500/30 mb-2">03</div>
                <h3 className="font-bold text-white text-sm mb-1.5">Apply with Proof</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Present your RootAccess capstone projects and certifications to stand out from candidates with theoretical knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="py-16 bg-gradient-to-b from-indigo-950/40 to-slate-950 border-t border-indigo-900/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Ready to find your next tech role?
            </h2>
            <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
              Start browsing opportunities on GrossNumber.com today, or continue building your portfolio on RootAccess.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://grossnumber.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/30"
              >
                <span>Browse GrossNumber.com Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                to="/app?tab=catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                <span>Browse Courses &amp; Certifications</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
