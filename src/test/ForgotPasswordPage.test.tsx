import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import * as AuthContextModule from '../context/AuthContext';

describe('ForgotPasswordPage Component', () => {
  const mockResetPassword = vi.fn();

  const renderComponent = () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: null,
      profile: null,
      session: null,
      loading: false,
      isConfigured: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: mockResetPassword,
      updatePassword: vi.fn(),
      refreshProfile: vi.fn(),
    });

    return render(
      <BrowserRouter>
        <ForgotPasswordPage />
      </BrowserRouter>
    );
  };

  it('renders email input and submit button', () => {
    renderComponent();

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to login/i })).toBeInTheDocument();
  });

  it('validates invalid email format', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('displays confirmation screen without revealing whether email is registered', async () => {
    mockResetPassword.mockResolvedValueOnce({ success: true });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'student@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /send reset link/i }));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith('student@example.com');
    });

    expect(await screen.findByText(/check your email/i)).toBeInTheDocument();
    expect(screen.getByText(/if an account exists with/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to login/i })).toBeInTheDocument();
  });
});
