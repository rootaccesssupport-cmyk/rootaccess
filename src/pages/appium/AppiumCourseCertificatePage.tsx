import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Printer,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Smartphone,
  Award,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';

export const AppiumCourseCertificatePage: React.FC = () => {
  const { user, profile } = useAuth();
  const { isLessonCompleted } = useProgress();

  // Check required completion milestones (Days 1 to 14)
  const isDay1Done = isLessonCompleted('appium-day-1');
  const isDay2Done = isLessonCompleted('appium-day-2');
  const isDay3Done = isLessonCompleted('appium-day-3');
  const isDay4Done = isLessonCompleted('appium-day-4');
  const isDay5Done = isLessonCompleted('appium-day-5');
  const isDay6Done = isLessonCompleted('appium-day-6');
  const isDay7Done = isLessonCompleted('appium-day-7');
  const isDay8Done = isLessonCompleted('appium-day-8');
  const isDay9Done = isLessonCompleted('appium-day-9');
  const isDay10Done = isLessonCompleted('appium-day-10');
  const isDay11Done = isLessonCompleted('appium-day-11');
  const isDay12Done = isLessonCompleted('appium-day-12');
  const isDay13Done = isLessonCompleted('appium-day-13');
  const isDay14Done = isLessonCompleted('appium-day-14');
  const isCapstoneSubmitted = localStorage.getItem('rootaccess_appium_capstone_submitted') === 'true';

  const isUnlocked =
    isDay1Done &&
    isDay2Done &&
    isDay3Done &&
    isDay4Done &&
    isDay5Done &&
    isDay6Done &&
    isDay7Done &&
    isDay8Done &&
    isDay9Done &&
    isDay10Done &&
    isDay11Done &&
    isDay12Done &&
    isDay13Done &&
    (isDay14Done || isCapstoneSubmitted);

  const studentName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Mobile Automation Engineer';

  const certId = `RA-APPIUM-${(user?.id || 'demo').slice(0, 8).toUpperCase()}-2026`;
  const issueDate = new Date().toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  if (!isUnlocked) {
    const missing: { title: string; day: number }[] = [];
    if (!isDay1Done) missing.push({ title: 'Day 1: Mobile Testing & Appium Architecture', day: 1 });
    if (!isDay2Done) missing.push({ title: 'Day 2: Android SDK, ADB & Appium Server 2.x', day: 2 });
    if (!isDay3Done) missing.push({ title: 'Day 3: UiAutomator2Options & First Automation Script', day: 3 });
    if (!isDay4Done) missing.push({ title: 'Day 4: Appium Inspector & Mobile Locator Strategies', day: 4 });
    if (!isDay5Done) missing.push({ title: 'Day 5: Mobile Element Interactions & Form Testing', day: 5 });
    if (!isDay6Done) missing.push({ title: 'Day 6: Mobile Synchronisation & Explicit Waits', day: 6 });
    if (!isDay7Done) missing.push({ title: 'Day 7: Mobile Gestures with Modern W3C Actions API', day: 7 });
    if (!isDay8Done) missing.push({ title: 'Day 8: Native, Hybrid WebViews & System Dialogs', day: 8 });
    if (!isDay9Done) missing.push({ title: 'Day 9: TestNG Suite Architecture for Mobile QA', day: 9 });
    if (!isDay10Done) missing.push({ title: 'Day 10: Page Object Model (POM) Design Pattern', day: 10 });
    if (!isDay11Done) missing.push({ title: 'Day 11: Data-Driven Mobile Automation', day: 11 });
    if (!isDay12Done) missing.push({ title: 'Day 12: Mobile Flakiness & Failure Diagnostics', day: 12 });
    if (!isDay13Done) missing.push({ title: 'Day 13: Enterprise Mobile Automation Frameworks', day: 13 });
    if (!isDay14Done && !isCapstoneSubmitted) missing.push({ title: 'Day 14: Capstone E-Commerce Mobile Project', day: 14 });

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <Navbar />
        <div className="flex-1 max-w-lg mx-auto px-4 py-16 flex items-center justify-center text-center">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto border border-amber-100 shadow-2xs">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h1 className="text-xl font-bold text-slate-900">Verified Credential Locked</h1>
              <p className="text-xs text-slate-500 leading-relaxed">
                You must complete all 14 days of the Appium Mobile Automation course and submit the Day 14 Capstone Project to unlock this verified certificate.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Pending Requirements ({missing.length}):
              </span>
              <ul className="text-xs text-slate-700 space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {missing.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <Link
                      to={`/courses/appium-mobile-automation/day-${req.day}`}
                      className="hover:underline text-slate-800 hover:text-emerald-700"
                    >
                      {req.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/courses/appium-mobile-automation"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Course Syllabus</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 print:bg-white print:p-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/courses/appium-mobile-automation"
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Appium Course</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print or Save PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="w-full bg-white rounded-3xl border-8 border-slate-200/80 p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center print:border-4 print:shadow-none print:m-0">
          {/* Subtle Watermark Logo Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Smartphone className="w-96 h-96" />
          </div>

          {/* Certificate Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                RootAccess<span className="text-emerald-600">.</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest block">
                Certificate of Competency &amp; Mastery
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
                Appium Mobile Automation with Java
              </h1>
              <p className="text-xs text-slate-400 font-mono tracking-wider">
                RootAccess SDET &amp; Mobile QA Engineering Track
              </p>
            </div>
          </div>

          {/* Recipient */}
          <div className="my-8 sm:my-10 space-y-2">
            <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
              This is proudly presented to
            </p>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight underline decoration-emerald-500/40 decoration-4 underline-offset-8">
              {studentName}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-3">
              for successfully completing all 14 intensive modules, hands-on mobile device simulation labs, W3C touch gesture workflows, enterprise Page Object Model architectures, and demonstrating proficiency by submitting the production-grade E-Commerce Mobile Capstone Suite.
            </p>
          </div>

          {/* Core Competencies Badges */}
          <div className="my-8 pt-6 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
              Verified Technical Competencies
            </span>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto">
              {[
                'Appium 2.x Architecture',
                'UiAutomator2Options',
                'Android ADB Commands',
                'Modern W3C Actions API',
                'Android Locator Strategies',
                'WebDriverWait Synchronization',
                'Hybrid & WebView Automation',
                'TestNG Parallel Suites',
                'Mobile Page Object Model',
                'Data-Driven Apache POI',
                'SauceLabs SwagLabs Capstone',
              ].map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-medium rounded-lg flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Certificate Footer / Sign-off */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">Verified by RootAccess Academy</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Credential ID: <span className="text-slate-700 font-semibold">{certId}</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Issued on: <span className="text-slate-700 font-medium">{issueDate}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 text-center sm:text-right">
              <div className="space-y-1">
                <div className="font-serif italic text-base text-slate-800 border-b border-slate-300 pb-1 px-4">
                  RootAccess Technical Review Board
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Senior Mobile QA Architect
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-emerald-500/40 bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px] shadow-2xs">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};
