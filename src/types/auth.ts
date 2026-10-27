import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role?: 'student' | 'instructor' | 'admin';
  enrolled_courses?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface SignUpResult {
  success: boolean;
  requiresEmailConfirmation: boolean;
  error?: string;
}

export interface AuthActionResult {
  success: boolean;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signUp: (params: { email: string; password: string; fullName: string }) => Promise<SignUpResult>;
  signIn: (params: { email: string; password: string }) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
  resetPasswordForEmail: (email: string) => Promise<AuthActionResult>;
  updatePassword: (newPassword: string) => Promise<AuthActionResult>;
  refreshProfile: () => Promise<void>;
}
