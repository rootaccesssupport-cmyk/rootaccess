import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import * as AuthContextModule from '../context/AuthContext';

describe('ResetPasswordPage Component', () => {
  const mockUpdatePassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  const renderComponent = (session: any = null, inRecoveryFlag = false) => {
    if (inRecoveryFlag) {
      sessionStorage.setItem('rootaccess_in_password_recovery', 'true');
    }

    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: session?.user || null,
      profile: null,
      session,
      loading: false,
      isConfigured: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updatePassword: mockUpdatePassword,
      refreshProfile: vi.fn(),
    });

    return render(
      <BrowserRouter>
        <ResetPasswordPage />
      </BrowserRouter>
    );
  };

  it('displays invalid/expired message when no recovery session exists', () => {
    renderComponent(null, false);

    expect(screen.getByText(/invalid or expired link/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /request new reset link/i })).toBeInTheDocument();
  });

  it('renders password reset form when valid recovery session is active', () => {
    renderComponent({ user: { id: 'test-user-id' } }, true);

    expect(screen.getByLabelText(/^new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm new password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update password/i })).toBeInTheDocument();
  });

  it('validates password mismatch on reset form', async () => {
    renderComponent({ user: { id: 'test-user-id' } }, true);

    fireEvent.change(screen.getByLabelText(/^new password/i), { target: { value: 'NewPassword123' } });
    fireEvent.change(screen.getByLabelText(/confirm new password/i), { target: { value: 'DifferentPassword123' } });

    fireEvent.click(screen.getByRole('button', { name: /update password/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it('updates password successfully on valid input', async () => {
    mockUpdatePassword.mockResolvedValueOnce({ success: true });
    renderComponent({ user: { id: 'test-user-id' } }, true);

    fireEvent.change(screen.getByLabelText(/^new password/i), { target: { value: 'BrandNewPassword123' } });
    fireEvent.change(screen.getByLabelText(/confirm new password/i), { target: { value: 'BrandNewPassword123' } });

    fireEvent.click(screen.getByRole('button', { name: /update password/i }));

    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith('BrandNewPassword123');
    });

    expect(await screen.findByText(/password updated/i)).toBeInTheDocument();
  });
});
