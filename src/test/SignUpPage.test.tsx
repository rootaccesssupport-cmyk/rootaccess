import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SignUpPage } from '../pages/SignUpPage';
import * as AuthContextModule from '../context/AuthContext';

describe('SignUpPage Component', () => {
  const mockSignUp = vi.fn();

  const renderComponent = () => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user: null,
      profile: null,
      session: null,
      loading: false,
      isConfigured: true,
      signUp: mockSignUp,
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updatePassword: vi.fn(),
      refreshProfile: vi.fn(),
    });

    return render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
  };

  it('renders all required form elements and inputs', () => {
    renderComponent();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i accept the rootaccess terms/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
  });

  it('displays validation error if required fields are blank', async () => {
    renderComponent();

    const submitBtn = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/please enter your full name/i)).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('displays validation error if password is weak', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alex Morgan' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'weak' } });
    fireEvent.change(screen.getByLabelText(/^confirm password/i), { target: { value: 'weak' } });
    fireEvent.click(screen.getByLabelText(/i accept the rootaccess terms/i));

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('displays validation error if passwords do not match', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alex Morgan' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'StrongPass123' } });
    fireEvent.change(screen.getByLabelText(/^confirm password/i), { target: { value: 'DifferentPass123' } });
    fireEvent.click(screen.getByLabelText(/i accept the rootaccess terms/i));

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('displays validation error if terms are not accepted', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alex Morgan' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'StrongPass123' } });
    fireEvent.change(screen.getByLabelText(/^confirm password/i), { target: { value: 'StrongPass123' } });

    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByText(/you must accept the terms of service/i)).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('toggles password visibility with show/hide buttons', () => {
    renderComponent();

    const passwordInput = screen.getByLabelText(/^password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleBtn = screen.getByRole('button', { name: /show password/i });
    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('submits valid registration and prevents duplicate submissions while loading', async () => {
    mockSignUp.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ success: true, requiresEmailConfirmation: true }), 100)));
    renderComponent();

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alex Morgan' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alex@example.com' } });
    fireEvent.change(screen.getByLabelText(/^password/i), { target: { value: 'StrongPass123' } });
    fireEvent.change(screen.getByLabelText(/^confirm password/i), { target: { value: 'StrongPass123' } });
    fireEvent.click(screen.getByLabelText(/i accept the rootaccess terms/i));

    const submitBtn = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitBtn);

    // Verify submission state: button is disabled
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/creating account/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        fullName: 'Alex Morgan',
        email: 'alex@example.com',
        password: 'StrongPass123',
      });
    });

    // Check email verification required state
    expect(await screen.findByText(/check your inbox/i)).toBeInTheDocument();
    expect(screen.getByText(/email verification required/i)).toBeInTheDocument();
  });
});
