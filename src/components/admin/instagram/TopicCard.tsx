import React from 'react';
import {
  Sparkles,
  RefreshCw,
  Calendar,
  Layers,
  BookOpen,
  Target,
  Image as ImageIcon,
} from 'lucide-react';
import { PreCuratedTopicTemplate } from '../../../data/instagramTopicBank';

interface TopicCardProps {
  topic: PreCuratedTopicTemplate;
  onGenerate: () => void;
  onRegenerate: () => void;
  onOpenSevenDayPlanner: () => void;
  isGenerating?: boolean;
  isRegenerating?: boolean;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  onGenerate,
  onRegenerate,
  onOpenSevenDayPlanner,
  isGenerating = false,
  isRegenerating = false,
}) => {
  const getCategoryColor = (cat: string) => {
    if (cat.includes('SQL')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (cat.includes('Playwright')) return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
    if (cat.includes('API')) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    if (cat.includes('Manual')) return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
    if (cat.includes('Interview')) return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    return 'text-slate-300 bg-slate-800 border-slate-700';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl text-white">
      {/* Subtle background red glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          {/* Header Tag Strip */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Today's Recommended Topic</span>
            </span>

            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCategoryColor(
                topic.category
              )}`}
            >
              {topic.category}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {topic.recommendedFormat === 'Reel' || topic.recommendedFormat === 'Single-image post' ? (
                <ImageIcon className="w-3 h-3 text-rose-400" />
              ) : (
                <Layers className="w-3 h-3 text-indigo-400" />
              )}
              <span>{topic.recommendedFormat === 'Reel' ? 'Image Post' : topic.recommendedFormat}</span>
            </span>

            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400">
              {topic.difficultyLevel}
            </span>
          </div>

          {/* Main Title */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
              {topic.topicTitle}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {topic.whyUseful}
            </p>
          </div>

          {/* Educational Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-400">
            <div className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <Target className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200">Target Audience:</span>{' '}
                <span>{topic.targetAudience}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <BookOpen className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200">Learning Objective:</span>{' '}
                <span>{topic.learningObjective}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Column */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full lg:w-64">
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="w-full inline-flex flex-col items-center justify-center py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 active:scale-[0.99] text-white transition-all shadow-xl shadow-rose-600/30 cursor-pointer disabled:opacity-60 border border-rose-400/30 group"
            title="Generate ready-to-download Instagram Post Image"
          >
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold">
              {isGenerating ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <ImageIcon className="w-5 h-5 text-rose-200 group-hover:scale-110 transition-transform" />
              )}
              <span>Generate Instagram Post</span>
            </div>
            <span className="text-[11px] text-rose-100 font-medium opacity-90 mt-0.5">
              Instant 1080p Downloadable Graphic
            </span>
          </button>

          <div className="flex items-center gap-2 w-full">
            <button
              onClick={onRegenerate}
              disabled={isRegenerating || isGenerating}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors border border-slate-700 cursor-pointer disabled:opacity-60"
              title="Pick an alternative 30-day fresh topic"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate Topic</span>
            </button>

            <button
              onClick={onOpenSevenDayPlanner}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors border border-slate-700 cursor-pointer"
              title="Create a balanced weekly Instagram schedule"
            >
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>7-Day Plan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
