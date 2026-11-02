import React, { useState } from 'react';
import {
  Calendar,
  Image as ImageIcon,
  Layers,
  ExternalLink,
  Edit,
} from 'lucide-react';
import { InstagramPostDraft, PostStatus } from '../../../types/instagramCreator';

interface ContentCalendarViewProps {
  drafts: InstagramPostDraft[];
  onSelectDraft: (draft: InstagramPostDraft) => void;
}

export const ContentCalendarView: React.FC<ContentCalendarViewProps> = ({
  drafts,
  onSelectDraft,
}) => {
  const [filterStatus, setFilterStatus] = useState<PostStatus | 'all'>('all');

  // Sort by planned date or created date
  const sorted = [...drafts].sort((a, b) => {
    const dateA = a.plannedDate || a.createdAt;
    const dateB = b.plannedDate || b.createdAt;
    return new Date(dateA).getTime() - new Date(dateB).getTime();
  });

  const filtered = sorted.filter((d) => {
    if (filterStatus === 'all') return true;
    return d.status === filterStatus;
  });

  // Group by Date
  const groupedByDate: Record<string, InstagramPostDraft[]> = {};
  filtered.forEach((d) => {
    const key = d.plannedDate || d.createdAt.split('T')[0] || 'Unscheduled';
    if (!groupedByDate[key]) groupedByDate[key] = [];
    groupedByDate[key].push(d);
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-400" />
            <span>Content Publishing Calendar</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Track scheduled releases, ready-to-publish queue, and live published posts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
          {(['all', 'draft', 'ready', 'published'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors cursor-pointer ${
                filterStatus === st
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {Object.keys(groupedByDate).length === 0 ? (
        <div className="text-center py-12 bg-slate-950/60 rounded-2xl border border-slate-800/80">
          <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-300">No scheduled posts found</h4>
          <p className="text-xs text-slate-500 mt-1">
            Generate today's content or create a 7-day plan to schedule posts on the calendar.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByDate).map(([dateStr, items]) => (
            <div key={dateStr} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider bg-slate-800 px-2.5 py-1 rounded-lg">
                  {dateStr === 'Unscheduled'
                    ? 'Unscheduled Drafts'
                    : new Date(dateStr).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                </span>
                <div className="h-px bg-slate-800 flex-1" />
                <span className="text-[11px] text-slate-500">
                  {items.length} post{items.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectDraft(item)}
                    className="p-5 bg-slate-950/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-950 rounded-2xl transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            item.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : item.status === 'ready'
                              ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {item.status}
                        </span>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          {item.recommendedFormat === 'Carousel' ? (
                            <Layers className="w-3 h-3 text-indigo-400" />
                          ) : (
                            <ImageIcon className="w-3 h-3 text-rose-400" />
                          )}
                          <span>{item.recommendedFormat === 'Carousel' ? 'Carousel' : 'Image Post'}</span>
                        </div>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-2 leading-snug">
                        {item.topicTitle}
                      </h4>

                      <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                        {item.imagePost?.subtitle || item.learningObjective || item.whyUseful}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 truncate max-w-[150px]">
                        {item.category.split(' ')[0]}
                      </span>

                      <div className="flex items-center gap-2">
                        {item.postUrl && (
                          <a
                            href={item.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-rose-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        <span className="text-slate-400 group-hover:text-white flex items-center gap-1 font-semibold">
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
