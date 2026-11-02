import React from 'react';
import { Sparkles } from 'lucide-react';
import { getCoursePriceDetails } from '../../data/enrollmentPaymentConfig';

export interface CoursePricingDisplayProps {
  courseSlug: string;
  variant?: 'card' | 'detail' | 'modal' | 'gate' | 'compact';
  align?: 'left' | 'center' | 'right';
  className?: string;
  showLifetimeBadge?: boolean;
}

export const CoursePricingDisplay: React.FC<CoursePricingDisplayProps> = ({
  courseSlug,
  variant = 'card',
  align = 'left',
  className = '',
  showLifetimeBadge = false,
}) => {
  const details = getCoursePriceDetails(courseSlug);
  const alignClass =
    align === 'center'
      ? 'items-center text-center'
      : align === 'right'
      ? 'items-end text-right'
      : 'items-start text-left';

  // Variant: gate (for CourseEnrollmentGate.tsx)
  if (variant === 'gate') {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 pt-2 ${className}`}>
        {details.isLaunchOffer && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Launch Offer</span>
            <span className="text-rose-300">•</span>
            <span>Save {details.formattedSavings} ({details.discountPercent}% off)</span>
          </div>
        )}

        <div className="flex items-baseline justify-center gap-3">
          <span className="text-3xl font-extrabold text-slate-900">{details.formattedInr}</span>
          {details.originalInr > details.inr && (
            <span className="text-base text-slate-400 line-through font-medium">
              {details.formattedOriginalInr}
            </span>
          )}
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Lifetime Access
          </span>
        </div>

        {!details.isLaunchOffer && details.savings > 0 && (
          <p className="text-xs font-semibold text-emerald-700">
            Save {details.formattedSavings} ({details.discountPercent}% off)
          </p>
        )}
      </div>
    );
  }

  // Variant: modal (for CourseEnrollmentModal.tsx header)
  if (variant === 'modal') {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 uppercase font-semibold">Course Pricing</span>
          {details.isLaunchOffer && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>Launch Offer</span>
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2.5">
          <span className="text-2xl font-extrabold text-white">{details.formattedInr}</span>
          {details.originalInr > details.inr && (
            <span className="text-sm text-slate-400 line-through font-medium">
              {details.formattedOriginalInr}
            </span>
          )}
          {details.savings > 0 && (
            <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
              Save {details.formattedSavings} ({details.discountPercent}% off)
            </span>
          )}
        </div>
      </div>
    );
  }

  // Variant: detail (for CourseDetailPage.tsx sidebar / progress box)
  if (variant === 'detail') {
    return (
      <div className={`p-4 bg-white/80 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5 ${className}`}>
        <div className="flex items-center justify-between gap-2">
          {details.isLaunchOffer ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>Launch Offer</span>
            </span>
          ) : (
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Tuition Fee
            </span>
          )}

          {details.savings > 0 && (
            <span className="inline-flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Save {details.formattedSavings} ({details.discountPercent}% off)
            </span>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{details.formattedInr}</span>
            {details.originalInr > details.inr && (
              <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
                {details.formattedOriginalInr}
              </span>
            )}
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            Lifetime Access
          </span>
        </div>
      </div>
    );
  }

  // Variant: compact (inline or minimal layout)
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm font-extrabold text-slate-900">{details.formattedInr}</span>
        {details.originalInr > details.inr && (
          <span className="text-xs text-slate-400 line-through">{details.formattedOriginalInr}</span>
        )}
        {details.isLaunchOffer && (
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
            Launch Offer
          </span>
        )}
        {details.savings > 0 && (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            Save {details.formattedSavings} ({details.discountPercent}% off)
          </span>
        )}
      </div>
    );
  }

  // Variant: card (standard for Course Catalog & Track cards)
  return (
    <div className={`flex flex-col ${alignClass} gap-1.5 ${className}`}>
      <div className="flex flex-wrap items-center gap-1.5">
        {details.isLaunchOffer && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
            <Sparkles className="w-3 h-3 text-rose-500 shrink-0" />
            <span>Launch Offer</span>
          </span>
        )}
        {details.savings > 0 && (
          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Save {details.formattedSavings} ({details.discountPercent}% off)
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-lg sm:text-xl font-extrabold text-slate-900">
          {details.formattedInr}
        </span>
        {details.originalInr > details.inr && (
          <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
            {details.formattedOriginalInr}
          </span>
        )}
        {showLifetimeBadge && (
          <span className="text-[10px] font-semibold text-slate-500 ml-1">
            Lifetime Access
          </span>
        )}
      </div>
    </div>
  );
};
