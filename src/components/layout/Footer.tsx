import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo-white.png"
                alt="RootAccess"
                className="h-9 sm:h-10 w-auto object-contain"
              />
              <span className="sr-only">RootAccess</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              A practical tech career platform for everyone—developers, QA engineers, test automation developers, and career switchers. Master real-world engineering skills, solve incident simulations, and build verifiable workplace expertise.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Enrollment &amp; Support: <a href="mailto:rootaccess.support@gmail.com" className="text-slate-200 font-mono hover:text-white transition-colors">rootaccess.support@gmail.com</a></span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Learning Tracks
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/courses/playwright-automation" className="hover:text-white transition-colors text-purple-400 font-medium">
                  Playwright Automation (JS + AI)
                </Link>
              </li>
              <li>
                <Link to="/courses/manual-qa-fundamentals" className="hover:text-white transition-colors">
                  Manual QA in 5 Days
                </Link>
              </li>
              <li>
                <Link to="/courses/sql-for-qa-engineers" className="hover:text-white transition-colors">
                  SQL &amp; Database Audits
                </Link>
              </li>
              <li>
                <Link to="/courses/api-testing-postman" className="hover:text-white transition-colors">
                  API Testing with Postman
                </Link>
              </li>
              <li>
                <Link to="/courses/qa-interview-mastery" className="hover:text-white transition-colors">
                  QA Technical Interview Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Account */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Platform
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Student Sign In
                </Link>
              </li>
              <li>
                <a href="#methodology" className="hover:text-white transition-colors">
                  The Practical Method
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium pt-1">
                  <Shield className="w-3 h-3" />
                  <span>Affordable UPI/Bank Enrollment</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} RootAccess. Built for practical career advancement.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Practical QA &amp; Test Engineering</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
