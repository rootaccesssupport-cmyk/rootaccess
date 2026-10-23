import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { AuthContextType, UserProfile, SignUpResult, AuthActionResult } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch or sync the user's profile from the public.profiles table
  const fetchProfile = useCallback(async (currentUser: User): Promise<UserProfile | null> => {
    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem('rootaccess_local_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.profile || null;
        } catch {
          // ignore parsing error
        }
      }
      return {
        id: currentUser.id,
        full_name: currentUser.user_metadata?.full_name || 'Alex Student',
        email: currentUser.email || 'student@rootaccess.org',
      };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (error) {
        console.warn('Could not fetch from profiles table, using auth metadata:', error.message);
        return {
          id: currentUser.id,
          full_name: currentUser.user_metadata?.full_name || 'RootAccess Student',
          email: currentUser.email || '',
        };
      }

      if (data) {
        return data as UserProfile;
      }

      return {
        id: currentUser.id,
        full_name: currentUser.user_metadata?.full_name || 'RootAccess Student',
        email: currentUser.email || '',
      };
    } catch (err) {
      console.error('Error fetching user profile:', err);
      return {
        id: currentUser.id,
        full_name: currentUser.user_metadata?.full_name || 'RootAccess Student',
        email: currentUser.email || '',
      };
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      const prof = await fetchProfile(user);
      setProfile(prof);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      // Local development mode when Supabase is not configured
      if (!isSupabaseConfigured) {
        let stored = localStorage.getItem('rootaccess_local_user');
        const hasExplicitlyLoggedOut = sessionStorage.getItem('rootaccess_explicit_logout');

        // Pre-authenticate demo student account by default if not explicitly logged out
        if (!stored && !hasExplicitlyLoggedOut) {
          const demoUser: User = {
            id: 'local-dev-student-1',
            email: 'alex.student@rootaccess.org',
            user_metadata: { full_name: 'Alex Student' },
            app_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString(),
          } as any;

          const demoProfile: UserProfile = {
            id: demoUser.id,
            full_name: 'Alex Student',
            email: 'alex.student@rootaccess.org',
          };

          stored = JSON.stringify({ user: demoUser, profile: demoProfile });
          localStorage.setItem('rootaccess_local_user', stored);
        }

        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (isMounted && parsed.user) {
              setUser(parsed.user);
              setSession({ access_token: 'local-dev-token' } as any);
              setProfile(parsed.profile);
            }
          } catch (e) {
            console.error('Failed to parse local user:', e);
          }
        }
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error fetching initial auth session:', error.message);
        }

        if (isMounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          if (initialSession?.user) {
            const userProfile = await fetchProfile(initialSession.user);
            if (isMounted) setProfile(userProfile);
          }
        }
      } catch (err) {
        console.error('Unexpected auth initialization error:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    // Listen to real Supabase auth events if configured
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
          if (!isMounted) return;

          setSession(currentSession);
          setUser(currentSession?.user ?? null);

          if (currentSession?.user) {
            const userProfile = await fetchProfile(currentSession.user);
            if (isMounted) setProfile(userProfile);
          } else {
            setProfile(null);
          }

          if (event === 'PASSWORD_RECOVERY') {
            sessionStorage.setItem('rootaccess_in_password_recovery', 'true');
          }

          setLoading(false);
        }
      );

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }
  }, [fetchProfile]);

  const signUp = async ({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<SignUpResult> => {
    // Seamless Local Dev fallback if Supabase credentials are not in .env
    if (!isSupabaseConfigured) {
      const localUser: User = {
        id: `local-dev-${Date.now()}`,
        email: email.trim(),
        user_metadata: { full_name: fullName.trim() },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as any;

      const localProfile: UserProfile = {
        id: localUser.id,
        full_name: fullName.trim(),
        email: localUser.email || '',
      };

      localStorage.setItem('rootaccess_local_user', JSON.stringify({ user: localUser, profile: localProfile }));
      setUser(localUser);
      setSession({ access_token: 'local-dev-token' } as any);
      setProfile(localProfile);

      return {
        success: true,
        requiresEmailConfirmation: false,
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        return { success: false, requiresEmailConfirmation: false, error: error.message };
      }

      const requiresEmailConfirmation = Boolean(data.user && !data.session);

      return {
        success: true,
        requiresEmailConfirmation,
      };
    } catch (err: any) {
      return {
        success: false,
        requiresEmailConfirmation: false,
        error: err.message || 'An unexpected error occurred during registration.',
      };
    }
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AuthActionResult> => {
    sessionStorage.removeItem('rootaccess_explicit_logout');
    // Seamless Local Dev fallback if Supabase credentials are not in .env
    if (!isSupabaseConfigured) {
      const fallbackName = email.includes('@') ? email.split('@')[0].replace('.', ' ') : 'Student';
      const cleanName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);

      const localUser: User = {
        id: 'local-dev-student-1',
        email: email.trim(),
        user_metadata: { full_name: cleanName },
        app_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as any;

      const localProfile: UserProfile = {
        id: localUser.id,
        full_name: cleanName,
        email: localUser.email || '',
      };

      localStorage.setItem('rootaccess_local_user', JSON.stringify({ user: localUser, profile: localProfile }));
      setUser(localUser);
      setSession({ access_token: 'local-dev-token' } as any);
      setProfile(localProfile);

      return { success: true };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'An unexpected error occurred during sign in.',
      };
    }
  };

  const signOut = async (): Promise<AuthActionResult> => {
    sessionStorage.setItem('rootaccess_explicit_logout', 'true');
    localStorage.removeItem('rootaccess_local_user');
    sessionStorage.removeItem('rootaccess_in_password_recovery');
    setUser(null);
    setSession(null);
    setProfile(null);

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          return { success: false, error: error.message };
        }
      } catch (err: any) {
        return {
          success: false,
          error: err.message || 'An unexpected error occurred during sign out.',
        };
      }
    }

    return { success: true };
  };

  const resetPasswordForEmail = async (email: string): Promise<AuthActionResult> => {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'An error occurred while requesting password reset.',
      };
    }
  };

  const updatePassword = async (newPassword: string): Promise<AuthActionResult> => {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      sessionStorage.removeItem('rootaccess_in_password_recovery');
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'An error occurred while updating your password.',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isConfigured: isSupabaseConfigured,
        signUp,
        signIn,
        signOut,
        resetPasswordForEmail,
        updatePassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
