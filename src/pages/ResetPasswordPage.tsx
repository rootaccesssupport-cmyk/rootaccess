import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/common/Header';
import { Alert } from '../components/common/Alert';
import { Eye, EyeOff, Lock, CheckCircle2, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const { updatePassword, session, loading, isConfigured } = useAuth();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isValidRecoverySession, setIsValidRecoverySession] = useState<boolean | null>(null);

  useEffect(() => {
    // Determine whether the user arrived with a valid recovery session
    if (loading) return;

    const hash = window.location.hash;
    const hasRecoveryHash = hash.includes('type=recovery') || hash.includes('access_token');
    const inRecoveryFlag = sessionStorage.getItem('rootaccess_in_password_recovery') === 'true';

    // A valid recovery session exists if there's an active session with recovery flag or token
    if (session || hasRecoveryHash || inRecoveryFlag) {
      setIsValidRecoverySession(true);
    } else {
      setIsValidRecoverySession(false);
    }
  }, [loading, session]);

  const validatePassword = (): string | null => {
    if (newPassword.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(newPassword)) {
      return 'Password must include at least one uppercase letter.';
    }
    if (!/[a-z]/.test(newPassword)) {
      return 'Password must include at least one lowercase letter.';
    }
    if (!/[0-9]/.test(newPassword)) {
      return 'Password must include at least one number.';
    }
    if (newPassword !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);

    const validationError = validatePassword();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updatePassword(newPassword);

      if (!result.success) {
        setErrorMessage(result.error || 'Failed to update password. Your recovery link may have expired.');
      } else {
        setSuccess(true);
        // Automatically redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', {
            state: { message: 'Your password has been successfully updated. Please sign in.' },
            replace: true,
          });
        }, 3000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while updating your password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-600">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
        <p className="text-sm font-medium">Verifying reset session...</p>
      </div>
    );
  }

  // Gracefully handle invalid or expired recovery links
  if (isValidRecoverySession === false && isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center animate-fadeIn">
          <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Invalid or Expired Link</h2>
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            This password reset link is invalid, already used, or has expired. For security reasons, reset links are single-use and expire quickly.
          </p>
          <Link
            to="/forgot-password"
            className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Request New Reset Link
          </Link>
          <div className="mt-4">
            <Link to="/login" className="text-xs text-slate-500 hover:text-slate-800">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50">
      <div className="w-full max-w-md">
        <Header subtitle="Set a new password for your RootAccess account." />

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          {!isConfigured && (
            <div className="mb-6">
              <Alert
                type="warning"
                message="Supabase credentials are not configured in your .env file."
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

          {success ? (
            <div className="text-center py-4 animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Password Updated</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Your password has been changed successfully. Redirecting you to login...
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
              >
                <span>Go to Login</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* New Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="newPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                    New Password
                  </label>
                  <span className="text-[11px] text-slate-400">Min 8 chars, 1 uppercase, 1 number</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

              {/* Confirm New Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Confirm New Password
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 active:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <span>Update Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link
              to="/login"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500 rounded"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
