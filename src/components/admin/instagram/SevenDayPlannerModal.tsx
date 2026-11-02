import React, { useState } from 'react';
import {
  Calendar,
  X,
  RefreshCw,
  Image as ImageIcon,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SevenDayPlan, PlannerDay } from '../../../types/instagramCreator';

interface SevenDayPlannerModalProps {
  plan: SevenDayPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectDayTopic: (day: PlannerDay) => void;
  onRegeneratePlan: (startDate?: string) => Promise<void>;
}

export const SevenDayPlannerModal: React.FC<SevenDayPlannerModalProps> = ({
  plan,
  isOpen,
  onClose,
  onSelectDayTopic,
  onRegeneratePlan,
}) => {
  const [startDate, setStartDate] = useState(
    plan?.startDate || new Date().toISOString().split('T')[0]
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isOpen || !plan) return null;

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRegeneratePlan(startDate);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-slate-100">
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">
                  7-Day Instagram Content Plan
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Balanced Schedule
                </span>
              </div>
              <p className="text-xs text-slate-400">
                A varied weekly mix covering SQL, Manual QA, API testing, Playwright, interview prep &amp; scenarios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-slate-400">Start Date:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
              />
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors border border-slate-700 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Days Grid */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
            {plan.days.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-rose-400">Day {day.dayNumber}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <div className="text-[11px] font-semibold text-slate-300 truncate mb-1">
                    {day.dayOfWeek}
                  </div>

                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-900 text-slate-300 border border-slate-800 mb-2">
                    {day.recommendedFormat === 'Carousel' ? (
                      <Layers className="w-2.5 h-2.5 text-indigo-400" />
                    ) : (
                      <ImageIcon className="w-2.5 h-2.5 text-rose-400" />
                    )}
                    <span>{day.recommendedFormat === 'Carousel' ? 'Carousel' : 'Image Post'}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug mb-2 group-hover:text-rose-300 transition-colors">
                    {day.topicTitle}
                  </h4>

                  <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed mb-3">
                    {day.learningObjective || day.topicTitle}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => {
                      onSelectDayTopic(day);
                      onClose();
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-rose-600 active:bg-rose-700 text-xs font-bold text-white transition-all cursor-pointer"
                  >
                    <span>Generate Post Image</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Click "Generate Post" on any day to instantly draft and customize the complete package.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
