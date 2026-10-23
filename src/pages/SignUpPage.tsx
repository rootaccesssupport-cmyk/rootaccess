import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/common/Header';
import { Alert } from '../components/common/Alert';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const { signUp, isConfigured } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verificationRequired, setVerificationRequired] = useState(false);

  // Client-side validations
  const validateForm = (): string | null => {
    if (!fullName.trim()) {
      return 'Please enter your full name.';
    }
    if (!email.trim()) {
      return 'Please enter your email address.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address.';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must include at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must include at least one number.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    if (!agreeTerms) {
      return 'You must accept the terms of service and privacy policy to continue.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signUp({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
      });

      if (!result.success) {
        setErrorMessage(result.error || 'Failed to create account. Please try again.');
      } else if (result.requiresEmailConfirmation) {
        // Verification email was sent by Supabase
        setVerificationRequired(true);
      }
      // If result.success && !requiresEmailConfirmation, Auth state listener automatically updates user & triggers redirect
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verificationRequired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center animate-fadeIn">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Mail className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your inbox</h2>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            We have sent a verification link to <span className="font-semibold text-slate-800">{email}</span>.
            Please click the link in your email to verify your account before logging in.
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 text-left mb-6 space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Email verification required</span>
            </div>
            <p>Your account is not active until verified. If you do not see the email, check your spam folder.</p>
          </div>
          <Link
            to="/login"
            className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="w-full max-w-md">
        <Header subtitle="Create your account to start learning practical career skills." />

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          {!isConfigured && (
            <div className="mb-6">
              <Alert
                type="warning"
                message="Supabase credentials are not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable authentication."
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

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Morgan"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-60"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Min 8 chars, 1 uppercase, 1 number</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide confirm password text' : 'Show confirm password text'}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Acceptance */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 leading-normal">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={isSubmitting}
                  className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4 shrink-0 transition"
                />
                <span>
                  I accept the RootAccess Terms of Service and Privacy Policy.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
