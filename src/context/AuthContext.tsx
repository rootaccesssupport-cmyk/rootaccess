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
        full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Student',
        email: currentUser.email || '',
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
          full_name: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Student',
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
      // Clean up any legacy dummy student accounts stored previously
      localStorage.removeItem('rootaccess_local_user');

      if (!isSupabaseConfigured) {
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
    localStorage.removeItem('rootaccess_local_user');

    if (!isSupabaseConfigured) {
      return {
        success: false,
        requiresEmailConfirmation: false,
        error: 'Authentication service is not configured. Please contact the administrator.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        return { success: false, requiresEmailConfirmation: false, error: error.message };
      }

      // If registered with direct session, ensure profile starts strictly with 0 enrolled courses
      if (data.session?.user) {
        try {
          await supabase
            .from('profiles')
            .update({ enrolled_courses: [] })
            .eq('id', data.session.user.id);
        } catch {
          // ignore if table lock or background sync
        }
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
    localStorage.removeItem('rootaccess_local_user');

    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Authentication service is not configured. Please contact the administrator.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data?.user) {
        setUser(data.user);
        setSession(data.session);
        const userProfile = await fetchProfile(data.user);
        setProfile(userProfile);
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
      return {
        success: false,
        error: 'Authentication service is not configured. Please contact the administrator.',
      };
    }

    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
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
      return {
        success: false,
        error: 'Authentication service is not configured. Please contact the administrator.',
      };
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
