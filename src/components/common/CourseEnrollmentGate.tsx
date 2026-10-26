import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, AlertTriangle, Sparkles, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from '../layout/Navbar';
import { Footer } from '../layout/Footer';

interface CourseEnrollmentGateProps {
  courseTitle: string;
  courseSlug: string;
  description?: string;
  bulletPoints: string[];
  onEnroll: () => void;
  backLink?: string;
  backLinkText?: string;
  accentColor?: 'indigo' | 'purple' | 'emerald';
}

export const CourseEnrollmentGate: React.FC<CourseEnrollmentGateProps> = ({
  courseTitle,
  courseSlug: _courseSlug,
  description = 'Enrollment is required to access interactive lessons, code execution sandboxes, practical assignments, and certification. Course enrollment is 100% free during early access—click below to enroll instantly.',
  bulletPoints,
  onEnroll,
  backLink = '/app',
  backLinkText = 'Back to Syllabus',
  accentColor = 'indigo',
}) => {
  const { user } = useAuth();
  const colorStyles = {
    indigo: {
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    purple: {
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      btnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
  }[accentColor];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center max-w-xl space-y-6">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto border shadow-2xs ${colorStyles.iconBg}`}
          >
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Course Enrollment Required</span>
              </span>
              {user && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Account Active: {user.email}</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {courseTitle}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-left space-y-2.5 text-slate-700">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>What course enrollment unlocks:</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-5 text-slate-600">
              {bulletPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onEnroll}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer ${colorStyles.btnBg}`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Enroll in Course</span>
            </button>
            <Link
              to={backLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{backLinkText}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
