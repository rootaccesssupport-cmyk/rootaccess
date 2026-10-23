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
              A practical career learning and job discovery platform for students, fresh graduates, and career switchers. Master real-world tech skills, prepare for rigorous interviews, and discover verified roles.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Enrollment & Support: <span className="text-slate-200 font-mono">support@rootaccess.org</span></span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Learning Tracks
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#tracks" className="hover:text-white transition-colors">
                  Manual QA &amp; Test Design
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-white transition-colors">
                  SQL for Software Testers
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-white transition-colors">
                  API Testing with Postman
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-white transition-colors">
                  Automation Testing
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <span>Full-Stack QA</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-indigo-400 font-mono">Coming Soon</span>
                </span>
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
              <span>Phase 2: Homepage Ready</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
