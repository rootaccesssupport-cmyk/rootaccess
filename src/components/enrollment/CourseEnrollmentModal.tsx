import React, { useState, useEffect } from 'react';
import {
  X,
  MessageCircle,
  CheckCircle2,
  Lock,
  ExternalLink,
  Send,
  Loader2,
  Clock,
  Smartphone,
  Copy,
  Check,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ENROLLMENT_PAYMENT_CONFIG, getCoursePriceDetails } from '../../data/enrollmentPaymentConfig';
import { enrollmentService } from '../../services/enrollmentService';
import { campaignService, generateEnrollmentId, type CampaignStats } from '../../services/campaignService';
import { CoursePricingDisplay } from '../common/CoursePricingDisplay';

interface CourseEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseSlug: string;
  courseTitle: string;
  onSuccess?: () => void;
}

export const CourseEnrollmentModal: React.FC<CourseEnrollmentModalProps> = ({
  isOpen,
  onClose,
  courseSlug,
  courseTitle,
  onSuccess,
}) => {
  const { user, profile } = useAuth();
  const [step, setStep] = useState<'info' | 'submitted'>('info');
  const [upiRef, setUpiRef] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedEnrollmentId, setCopiedEnrollmentId] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [campaignStats, setCampaignStats] = useState<CampaignStats | null>(null);
  const [enrollmentId] = useState(() => generateEnrollmentId());

  const isPlaywright = courseSlug === 'playwright-automation';

  useEffect(() => {
    if (isPlaywright && isOpen) {
      campaignService.getFounding500Stats().then(setCampaignStats);
    }
  }, [isPlaywright, isOpen]);

  if (!isOpen) return null;

  const isFounding500Active = isPlaywright && !campaignStats?.isSoldOut;
  const priceDetails = getCoursePriceDetails(courseSlug, { isFounding500: isFounding500Active });

  const userName = profile?.full_name || user?.user_metadata?.full_name || 'Student';
  const userEmail = user?.email || '';

  const whatsAppUrl = isFounding500Active
    ? campaignService.getWhatsAppPaymentUrl({
        userName,
        userEmail,
        enrollmentId,
      })
    : ENROLLMENT_PAYMENT_CONFIG.getWhatsAppPaymentUrl(
        courseSlug,
        courseTitle,
        userEmail,
        userName
      );

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(ENROLLMENT_PAYMENT_CONFIG.whatsappNumber);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleCopyEnrollmentId = () => {
    navigator.clipboard.writeText(enrollmentId);
    setCopiedEnrollmentId(true);
    setTimeout(() => setCopiedEnrollmentId(false), 2000);
  };

  const handleNotifyAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await enrollmentService.submitRequest({
        userId: user.id,
        userEmail,
        userName,
        courseSlug,
        courseTitle,
        upiReference: upiRef,
        studentNotes: notes,
        campaignTag: isFounding500Active ? 'founding-500' : undefined,
        enrollmentId: isFounding500Active ? enrollmentId : undefined,
        amountPaid: isFounding500Active ? 149 : priceDetails.inr,
        accessDurationDays: isFounding500Active ? 30 : undefined,
      });

      if (res.success) {
        setStep('submitted');
        onSuccess?.();
      } else {
        setErrorMsg(res.error || 'Failed to record request. Please message via WhatsApp.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full shadow-2xl overflow-hidden relative">
        {/* Top Header */}
        <div
          className={`p-6 relative text-white ${
            isFounding500Active
              ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950'
              : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            {isFounding500Active ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-400 to-amber-300 text-slate-900 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                <span>FOUNDING 500 STUDENTS • 30 DAYS ACCESS</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-900">
                <Lock className="w-3 h-3" />
                <span>Course Enrollment</span>
              </span>
            )}

            {isPlaywright && campaignStats?.isSoldOut && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500 text-white">
                <ShieldAlert className="w-3 h-3" />
                <span>Founding 500 Sold Out</span>
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {courseTitle}
          </h2>
          <p className="text-xs text-indigo-200 mt-1 leading-relaxed">
            {isFounding500Active
              ? 'First 500 verified students introductory launch offer. Get 30 days of complete hands-on course access for ₹149!'
              : 'Complete your enrollment via UPI to get instant instructor verification and course access unlock.'}
          </p>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <CoursePricingDisplay courseSlug={courseSlug} variant="modal" />
            <div className="text-right text-[11px] text-slate-300">
              <span className="block font-semibold">Free Day 1 Preview</span>
              <span className="text-emerald-400 font-medium">Days 2+ Locked</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          {step === 'info' ? (
            <>
              {/* Unique Enrollment ID Banner for Founding 500 */}
              {isFounding500Active && (
                <div className="p-3.5 bg-purple-50/80 border border-purple-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider block">
                      Your Unique Enrollment ID
                    </span>
                    <span className="font-mono font-extrabold text-sm text-purple-950">
                      {enrollmentId}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEnrollmentId}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-white hover:bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-300 transition-colors cursor-pointer shadow-2xs"
                  >
                    {copiedEnrollmentId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEnrollmentId ? 'Copied' : 'Copy ID'}</span>
                  </button>
                </div>
              )}

              {/* Step 1: WhatsApp Payment Instruction */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>Step 1: Text on WhatsApp for UPI QR Code</span>
                  </div>
                  <button
                    onClick={handleCopyWhatsApp}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 cursor-pointer shadow-2xs"
                  >
                    {copiedNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedNumber ? 'Copied' : 'Copy Number'}</span>
                  </button>
                </div>

                <p className="text-xs text-emerald-900 leading-relaxed">
                  Click the button below to message our instructor directly on WhatsApp at{' '}
                  <strong className="text-emerald-950 font-mono">{ENROLLMENT_PAYMENT_CONFIG.whatsappNumber}</strong>. You will receive the direct UPI ID / QR code to pay <strong>{priceDetails.formattedInr}</strong>.
                  {isFounding500Active && (
                    <span className="block mt-1 font-medium text-purple-900">
                      Include Enrollment ID: <strong className="font-mono">{enrollmentId}</strong> in your message.
                    </span>
                  )}
                </p>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp to Pay {priceDetails.formattedInr} via UPI</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Step 2: Confirmation / Request form */}
              <form onSubmit={handleNotifyAdmin} className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>Step 2: Submit Your Payment Details for Instant Approval</span>
                </div>
                <p className="text-xs text-slate-500">
                  After sending payment or texting on WhatsApp, record your details here so the admin can verify your payment and activate your {isFounding500Active ? '30-day course access' : 'course'} immediately.
                </p>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    UPI Reference / UTR Number or Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={upiRef}
                    onChange={(e) => setUpiRef(e.target.value)}
                    placeholder="e.g. 412345678901 or Google Pay / PhonePe Ref"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notes for Admin (Phone number, payer name, or questions)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={`e.g. Sent ${priceDetails.formattedInr} via PhonePe (UTR: 4123...). Please verify.`}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Student Account:</span>
                    <strong className="text-slate-900">{userName}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Registered Email:</span>
                    <strong className="text-slate-900 font-mono">{userEmail}</strong>
                  </div>
                  {isFounding500Active && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Campaign &amp; Access:</span>
                      <strong className="text-purple-700 font-semibold">Founding 500 • 30 Days Full Access</strong>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Notify Admin &amp; Request Activation</span>
                </button>
              </form>
            </>
          ) : (
            /* Step: Submitted confirmation */
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isFounding500Active ? 'Founding 500 Enrollment Logged!' : 'Enrollment Request Received!'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your request to enroll in <strong>{courseTitle}</strong> has been logged. Admin will verify your WhatsApp / UPI payment and activate your access.
                </p>
                {isFounding500Active && (
                  <p className="text-xs font-mono font-bold text-purple-700 mt-2 bg-purple-50 inline-block px-3 py-1 rounded-lg border border-purple-200">
                    Enrollment ID: {enrollmentId}
                  </p>
                )}
              </div>

              <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-left space-y-2 text-indigo-950">
                <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>What happens next?</span>
                </div>
                <ul className="space-y-1.5 list-disc pl-4 text-indigo-800 text-[11px]">
                  <li>You can continue exploring <strong>Day 1 (Free Preview)</strong> immediately.</li>
                  <li>Once payment is verified, your 30-day course access begins immediately and Days 2+ will unlock automatically.</li>
                  <li>Need faster activation? Ping on WhatsApp with your Enrollment ID at <strong className="font-mono">{ENROLLMENT_PAYMENT_CONFIG.whatsappNumber}</strong>.</li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
