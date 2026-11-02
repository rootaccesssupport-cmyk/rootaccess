import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, CreditCard, Camera, Sparkles } from 'lucide-react';

export const AdminNavHeader: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const isEnrollments = pathname.includes('/admin/enrollments');
  const isInstagram = pathname.includes('/admin/instagram-creator');
  const isAiCourse = pathname.includes('/admin/ai-course-manager');

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  RootAccess Admin Center
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-slate-800 text-slate-300 rounded-md">
                  Privileged
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white">
                Platform Management &amp; Content Automation
              </h2>
            </div>
          </div>

          {/* Admin Sub-Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
            <Link
              to="/admin/enrollments"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isEnrollments
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Enrollments &amp; UPI</span>
            </Link>

            <Link
              to="/admin/instagram-creator"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isInstagram
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-rose-400" />
              <span>Instagram Creator</span>
              <span className="px-1.5 py-0.2 text-[9px] font-extrabold bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/30">
                AI + QA
              </span>
            </Link>

            <Link
              to="/admin/ai-course-manager"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isAiCourse
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Course Manager</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
