import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import * as AuthContextModule from '../context/AuthContext';

describe('ProtectedRoute Component', () => {
  it('redirects unauthenticated users to /login', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: null,
      profile: null,
      session: null,
      loading: false,
      isConfigured: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updatePassword: vi.fn(),
      refreshProfile: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/app']}>
        <Routes>
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <div>Secret Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page Redirected</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Secret Protected Content')).not.toBeInTheDocument();
    expect(screen.getByText('Login Page Redirected')).toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: { id: 'auth-user-123', email: 'test@example.com' } as any,
      profile: { id: 'auth-user-123', full_name: 'Test Student', email: 'test@example.com' },
      session: { access_token: 'valid-token' } as any,
      loading: false,
      isConfigured: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updatePassword: vi.fn(),
      refreshProfile: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/app']}>
        <Routes>
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <div>Secret Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Secret Protected Content')).toBeInTheDocument();
  });
});
