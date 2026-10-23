import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Terminal, LogOut, ShieldCheck, User, Mail, Calendar, KeyRound, Loader2, Sparkles } from 'lucide-react';
import { Alert } from '../components/common/Alert';

export const ProtectedPlaceholderPage: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
  const email = user?.email || 'No email available';

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      const result = await signOut();
      if (!result.success) {
        setLogoutError(result.error || 'Failed to sign out. Please try again.');
        setIsLoggingOut(false);
      } else {
        navigate('/login', {
          state: { message: 'You have been safely logged out.' },
          replace: true,
        });
      }
    } catch (err: any) {
      setLogoutError(err.message || 'An unexpected error occurred during logout.');
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <nav className="w-full bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="RootAccess"
            className="h-8 sm:h-9 w-auto object-contain"
          />
          <span className="sr-only">RootAccess</span>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Phase 1 Authenticated
          </span>
        </div>

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-slate-400 cursor-pointer"
        >
          {isLoggingOut ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
              <span>Logging out...</span>
            </>
          ) : (
            <>
              <LogOut className="w-4 h-4 text-slate-500" />
              <span>Log out</span>
            </>
          )}
        </button>
      </nav>

      {/* Main Verification Body */}
      <main className="max-w-3xl w-full mx-auto px-4 py-12 flex-1 flex flex-col justify-center">
        {logoutError && (
          <div className="mb-6">
            <Alert type="error" message={logoutError} onClose={() => setLogoutError(null)} />
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-50 rounded-full blur-3xl pointer-events-none -z-0 opacity-70" />

          <div className="relative z-10">
            {/* Status chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Authentication Successful</span>
            </div>

            {/* Welcome message */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Welcome, {displayName}!
            </h1>
            <p className="text-lg text-indigo-600 font-medium mb-6">
              Your learning journey starts here.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed mb-8 max-w-xl">
              This is a temporary protected verification page for <strong>RootAccess Phase 1</strong>.
              Your authentication session is active, protected routes are functioning, and your credentials are securely managed by Supabase Auth with Row Level Security.
            </p>

            {/* Diagnostic Session Details Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                <KeyRound className="w-3.5 h-3.5" />
                Session Verification Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">Name:</span>
                  <span className="truncate">{displayName}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">Email:</span>
                  <span className="truncate">{email}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <KeyRound className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">User ID:</span>
                  <span className="font-mono text-[11px] truncate">{user?.id || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">Last Sign-in:</span>
                  <span className="truncate">
                    {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Just now'}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps Note */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Phase 1 complete. Phase 2 (Public Homepage) will be implemented after your approval.
              </p>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 shrink-0 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out session</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-slate-400">
        RootAccess &copy; {new Date().getFullYear()} &mdash; Career Learning &amp; Job Discovery Platform
      </footer>
    </div>
  );
};
