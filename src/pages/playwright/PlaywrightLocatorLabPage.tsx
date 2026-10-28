import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Target,
  BookOpen,
  Download,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { PlaywrightRealLifeLocatorLab } from '../../components/playwright/PlaywrightRealLifeLocatorLab';

export const PlaywrightLocatorLabPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/courses" className="hover:text-indigo-600 transition-colors">
            Courses
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to="/courses/playwright-automation"
            className="hover:text-indigo-600 transition-colors font-medium"
          >
            Playwright Automation Testing
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 font-semibold">Live Locator Lab</span>
        </nav>

        {/* Header Hero */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-rose-600" />
                  <span>Real-World Simulator</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  Pure JavaScript Playwright Engine
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                  Strict Mode Disambiguation
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Playwright Live Application Locator Lab
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Experience real-world test automation workflows against a live rendered web application (RootCart Store &amp; Customer Portal). Execute multi-step Playwright scripts, mock API routes via <code>page.route</code>, inject <code>storageState</code> authentication sessions, evaluate auto-waiting, and inspect resilient locators.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <Link
                to="/courses/playwright-automation/day-4"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Go to Day 4: Locators</span>
              </Link>
              <a
                href="/playwright-js/day-4-locators-and-element-identification.pdf"
                download="day-4-locators-and-element-identification.pdf"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Day 4 PDF Notes</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Reference Automation Engineering Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-bold text-slate-900">Role Locator (Priority 1)</span>
            </div>
            <code className="block font-mono text-[11px] bg-slate-900 text-emerald-300 p-2 rounded-lg break-all">
              page.getByRole('button', &#123; name: 'Save Profile' &#125;)
            </code>
            <p className="text-[11px] text-slate-500">
              Locates interactive elements by accessible role and user-facing name.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <span className="text-xs font-bold text-slate-900">Label Locator (Form Inputs)</span>
            </div>
            <code className="block font-mono text-[11px] bg-slate-900 text-indigo-300 p-2 rounded-lg break-all">
              page.getByLabel('Email Address')
            </code>
            <p className="text-[11px] text-slate-500">
              Targets form controls matching their associated <code>&lt;label&gt;</code> element.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <span className="text-xs font-bold text-slate-900">Network Mocking (page.route)</span>
            </div>
            <code className="block font-mono text-[11px] bg-slate-900 text-purple-300 p-2 rounded-lg break-all">
              route.fulfill(&#123; status: 500 &#125;)
            </code>
            <p className="text-[11px] text-slate-500">
              Intercept API calls to mock payment 500 errors, promos, or latency.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">
                4
              </span>
              <span className="text-xs font-bold text-slate-900">StorageState Auth</span>
            </div>
            <code className="block font-mono text-[11px] bg-slate-900 text-amber-300 p-2 rounded-lg break-all">
              use: &#123; storageState: 'auth.json' &#125;
            </code>
            <p className="text-[11px] text-slate-500">
              Inject pre-authenticated cookies &amp; localStorage without UI login.
            </p>
          </div>
        </div>

        {/* Main Interactive Live Application Simulator */}
        <PlaywrightRealLifeLocatorLab />
      </main>

      <Footer />
    </div>
  );
};
export default PlaywrightLocatorLabPage;
