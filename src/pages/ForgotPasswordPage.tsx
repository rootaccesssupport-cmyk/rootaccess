import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/common/Header';
import { Alert } from '../components/common/Alert';
import { Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPasswordForEmail, isConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPasswordForEmail(email.trim());

      // Security requirement: We do not reveal whether the email exists in the system or not.
      // Even if Supabase returns rate limits or errors, we only surface technical setup issues,
      // displaying a neutral confirmation to protect user privacy.
      if (!result.success) {
        if (!isConfigured) {
          setErrorMessage(result.error || 'Supabase is not configured.');
        } else {
          // If Supabase returned an error like rate limit, show it, otherwise show neutral confirmation
          if (result.error?.toLowerCase().includes('rate limit')) {
            setErrorMessage('Too many requests. Please wait a moment before trying again.');
          } else {
            // Display friendly success message to prevent email enumeration
            setSubmitted(true);
          }
        }
      } else {
        setSubmitted(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while sending the recovery link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="w-full max-w-md">
        <Header subtitle="Reset your password to regain access to your account." />

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          {!isConfigured && (
            <div className="mb-6">
              <Alert
                type="warning"
                message="Supabase credentials are not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file."
              />
            </div>
          )}

          {errorMessage && (
            <div className="mb-6">
              <Alert
                type="error"
                message={errorMessage}
                onClose={() => setErrorMessage(null)}
              />
            </div>
          )}

          {submitted ? (
            <div className="text-center py-2 animate-fadeIn">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Check your email</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                If an account exists with <span className="font-semibold text-slate-800">{email}</span>,
                we have sent instructions to reset your password.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-left mb-6 space-y-1.5">
                <p className="font-medium text-slate-700">Didn't receive the email?</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Check your spam or junk folder.</li>
                  <li>Ensure the recovery redirect URL is whitelisted in your Supabase Auth settings.</li>
                </ul>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Login</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Enter your registered email address below, and we'll send you a secure link to reset your password.
              </p>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    disabled={isSubmitting}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {!submitted && (
            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500 rounded"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
