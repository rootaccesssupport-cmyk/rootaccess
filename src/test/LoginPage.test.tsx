import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import * as AuthContextModule from '../context/AuthContext';

describe('LoginPage Component', () => {
  const mockSignIn = vi.fn();

  const renderComponent = () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: null,
      profile: null,
      session: null,
      loading: false,
      isConfigured: true,
      signUp: vi.fn(),
      signIn: mockSignIn,
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updatePassword: vi.fn(),
      refreshProfile: vi.fn(),
    });

    return render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  };

  it('renders login form with all elements', () => {
    renderComponent();

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /forgot password\?/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /create an account/i })).toBeInTheDocument();
  });

  it('validates empty email and password submission', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/please enter your email address/i)).toBeInTheDocument();
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it('handles invalid login credentials cleanly', async () => {
    mockSignIn.mockResolvedValueOnce({
      success: false,
      error: 'Invalid login credentials',
    });

    renderComponent();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'WrongPassword123' } });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
  });

  it('prevents duplicate submission while logging in', async () => {
    mockSignIn.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ success: true }), 100)));

    renderComponent();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'CorrectPass123' } });

    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitBtn);

    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/signing in.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'CorrectPass123',
      });
    });
  });
});
