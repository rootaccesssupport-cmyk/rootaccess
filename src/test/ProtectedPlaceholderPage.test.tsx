import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedPlaceholderPage } from '../pages/ProtectedPlaceholderPage';
import * as AuthContextModule from '../context/AuthContext';

describe('ProtectedPlaceholderPage Component', () => {
  const mockSignOut = vi.fn();

  it('renders required elements: wordmark, welcome message, learning text, and logout button', () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: {
        id: 'user-xyz-456',
        email: 'alex.student@example.com',
        user_metadata: { full_name: 'Alex Student' },
      } as any,
      profile: {
        id: 'user-xyz-456',
        full_name: 'Alex Student',
        email: 'alex.student@example.com',
      },
      session: { access_token: 'token-abc' } as any,
      loading: false,
      isConfigured: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: mockSignOut,
      resetPasswordForEmail: vi.fn(),
      updatePassword: vi.fn(),
      refreshProfile: vi.fn(),
    });

    render(
      <BrowserRouter>
        <ProtectedPlaceholderPage />
      </BrowserRouter>
    );

    // RootAccess wordmark
    expect(screen.getAllByText('RootAccess').length).toBeGreaterThanOrEqual(1);

    // Welcome message
    expect(screen.getByText(/welcome, alex student!/i)).toBeInTheDocument();

    // Required text
    expect(screen.getByText('Your learning journey starts here.')).toBeInTheDocument();

    // Working logout button
    const logoutButtons = screen.getAllByRole('button', { name: /log out/i });
    expect(logoutButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('calls signOut and ends the session when Logout button is clicked', async () => {
    mockSignOut.mockResolvedValueOnce({ success: true });

    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: {
        id: 'user-xyz-456',
        email: 'alex.student@example.com',
      } as any,
      profile: {
        id: 'user-xyz-456',
        full_name: 'Alex Student',
        email: 'alex.student@example.com',
      },
      session: { access_token: 'token-abc' } as any,
      loading: false,
      isConfigured: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: mockSignOut,
      resetPasswordForEmail: vi.fn(),
      updatePassword: vi.fn(),
      refreshProfile: vi.fn(),
    });

    render(
      <BrowserRouter>
        <ProtectedPlaceholderPage />
      </BrowserRouter>
    );

    const logoutBtn = screen.getAllByRole('button', { name: /log out/i })[0];
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
  });
});
