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
    if (!isSupabaseConfigured) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (error) {
        // If the table doesn't exist yet or query fails, fall back to user_metadata
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

      // If no row exists, construct a fallback from auth metadata
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
      if (!isSupabaseConfigured) {
        if (isMounted) {
          setLoading(false);
        }
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

    // Listen to Supabase auth events (signed in, signed out, token refreshed, password recovery)
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
          // Flag recovery event in sessionStorage so ResetPasswordPage can identify valid recovery mode
          sessionStorage.setItem('rootaccess_in_password_recovery', 'true');
        }

        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
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
    if (!isSupabaseConfigured) {
      return {
        success: false,
        requiresEmailConfirmation: false,
        error: 'Supabase credentials are not configured in your .env file.',
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

      // If data.user exists but data.session is null, Supabase requires email verification
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
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Supabase credentials are not configured in your .env file.',
      };
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
    if (!isSupabaseConfigured) {
      setUser(null);
      setSession(null);
      setProfile(null);
      return { success: true };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { success: false, error: error.message };
      }

      setUser(null);
      setSession(null);
      setProfile(null);
      sessionStorage.removeItem('rootaccess_in_password_recovery');
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'An unexpected error occurred during sign out.',
      };
    }
  };

  const resetPasswordForEmail = async (email: string): Promise<AuthActionResult> => {
    if (!isSupabaseConfigured) {
      return {
        success: false,
        error: 'Supabase credentials are not configured in your .env file.',
      };
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
      return {
        success: false,
        error: 'Supabase credentials are not configured in your .env file.',
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
