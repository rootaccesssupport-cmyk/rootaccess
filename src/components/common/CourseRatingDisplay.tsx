import React, { useState } from 'react';
import { Star, CheckCircle, X, MessageSquareQuote } from 'lucide-react';
import { getCourseRatingSummary, CourseReview } from '../../data/courseRatingsData';

interface CourseRatingDisplayProps {
  courseSlug: string;
  variant?: 'compact' | 'banner' | 'card' | 'section';
  className?: string;
  showReviewsModal?: boolean;
}

export const CourseRatingDisplay: React.FC<CourseRatingDisplayProps> = ({
  courseSlug,
  variant = 'compact',
  className = '',
}) => {
  const summary = getCourseRatingSummary(courseSlug);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 5 | 4 | 3>('all');

  const filteredReviews = summary.reviews.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.rating === activeFilter;
  });

  const renderStars = (rating: number, sizeClass = 'w-3.5 h-3.5') => {
    return (
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const filled = rating >= starIndex;
          const half = !filled && rating >= starIndex - 0.5;

          return (
            <Star
              key={starIndex}
              className={`${sizeClass} ${
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : half
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-slate-300 dark:text-slate-600'
              }`}
            />
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* 1. COMPACT VARIANT (For course cards on HomePage & Student Dashboard) */}
      {(variant === 'compact' || variant === 'card') && (
        <div className={`flex items-center justify-between text-xs ${className}`}>
          <div className="flex items-center gap-1.5">
            {renderStars(summary.averageRating, 'w-3.5 h-3.5')}
            <span className="font-extrabold text-slate-900">{summary.averageRating.toFixed(1)}</span>
            <span className="text-slate-500 text-[11px]">({summary.totalRatings} ratings)</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors cursor-pointer"
          >
            Read reviews
          </button>
        </div>
      )}

      {/* 2. BANNER VARIANT (For Course Detail Page Header) */}
      {variant === 'banner' && (
        <div className={`inline-flex flex-wrap items-center gap-2 text-xs ${className}`}>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg">
            {renderStars(summary.averageRating, 'w-3.5 h-3.5')}
            <span className="font-bold text-amber-900 ml-1">{summary.averageRating.toFixed(1)} / 5.0</span>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 underline cursor-pointer"
          >
            {summary.totalRatings} verified learner ratings
          </button>

          <span className="text-slate-300">•</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            100% ≥ 3★ ratings
          </span>
        </div>
      )}

      {/* 3. SECTION VARIANT (Dedicated on Course Detail Page) */}
      {variant === 'section' && (
        <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 ${className}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900 mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>Verified Student Ratings &amp; Feedback</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Learner Reviews ({summary.totalRatings} Members)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Authentic ratings from enrolled students practicing hands-on lessons and live defect audits.
              </p>
            </div>

            {/* Score box */}
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl shrink-0">
              <div className="text-center">
                <div className="text-3xl font-black text-slate-900 tracking-tight">
                  {summary.averageRating.toFixed(1)}
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500">out of 5</div>
              </div>
              <div className="space-y-1">
                {renderStars(summary.averageRating, 'w-4 h-4')}
                <p className="text-[11px] font-medium text-slate-500">
                  {summary.totalRatings} member ratings
                </p>
              </div>
            </div>
          </div>

          {/* Rating Distribution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Rating Distribution
              </div>
              {([5, 4, 3, 2, 1] as const).map((stars) => {
                const count = summary.distribution[stars];
                const percent = Math.round((count / summary.totalRatings) * 100);

                return (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-medium text-slate-600 flex items-center gap-1">
                      {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                    </span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-500 font-medium text-[11px]">
                      {count} ({percent}%)
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Transparent Quality Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every rating comes from students enrolled in this curriculum. With an average of{' '}
                <span className="font-bold text-slate-900">{summary.averageRating.toFixed(1)} / 5</span>, not a single review is below 3 stars, reflecting our focus on practical learn-by-doing quality.
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>Read All 20 Student Reviews</span>
              </button>
            </div>
          </div>

          {/* Preview of first 3 reviews */}
          <div className="pt-6 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
              Recent Student Feedback
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {summary.reviews.slice(0, 3).map((review) => (
                <div
                  key={review.id}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      {renderStars(review.rating, 'w-3 h-3')}
                      <span className="text-[10px] text-slate-400 font-medium">{review.date}</span>
                    </div>
                    <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60">
                    <div className="text-xs font-bold text-slate-900">{review.author}</div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {review.role} • {review.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REVIEWS MODAL (Shows all 20 student reviews with filter options) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Verified Student Reviews
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                    ★ {summary.averageRating.toFixed(1)} ({summary.totalRatings} members)
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {summary.courseTitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 shrink-0 overflow-x-auto">
              <span className="text-xs font-semibold text-slate-500 mr-1 shrink-0">Filter by:</span>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                All (20)
              </button>
              {([5, 4, 3] as const).map((stars) => (
                <button
                  key={stars}
                  type="button"
                  onClick={() => setActiveFilter(stars)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                    activeFilter === stars
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{stars}★</span>
                  <span className="text-[10px] opacity-80">({summary.distribution[stars]})</span>
                </button>
              ))}
            </div>

            {/* Scrollable list of reviews */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-slate-100">
              {filteredReviews.map((review: CourseReview) => (
                <div key={review.id} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center text-xs">
                        {review.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{review.author}</span>
                          {review.verifiedEnrollment && (
                            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60 inline-flex items-center gap-0.5">
                              <CheckCircle className="w-2.5 h-2.5" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {review.role} • {review.location}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {renderStars(review.rating, 'w-3 h-3')}
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{review.date}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-10">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <span>All 20 ratings are ≥ 3 stars • Verified RootAccess Learners</span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
