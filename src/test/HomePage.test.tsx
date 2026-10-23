import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import * as AuthContextModule from '../context/AuthContext';

describe('HomePage Component (Phase 2)', () => {
  const renderComponent = (user: any = null) => {
    vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
      user,
      profile: user ? { id: user.id, full_name: 'Test Student', email: user.email } : null,
      session: user ? ({ access_token: 'valid' } as any) : null,
      loading: false,
      isConfigured: true,
      signUp: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updatePassword: vi.fn(),
      refreshProfile: vi.fn(),
    });

    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  };

  it('renders the brand wordmark and hero headline', () => {
    renderComponent(null);

    expect(screen.getAllByText('RootAccess').length).toBeGreaterThanOrEqual(2);
    expect(
      screen.getByRole('heading', { level: 1, name: /practical tech skills/i })
    ).toBeInTheDocument();
  });

  it('displays all core QA curriculum modules', () => {
    renderComponent(null);

    expect(screen.getAllByText('Manual QA & Test Design').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('SQL for Software Testers').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('API Testing with Postman').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Automation Testing Foundations').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Interview & Resume Strategy').length).toBeGreaterThanOrEqual(1);
  });

  it('provides accessible call-to-actions linking to /signup and /login', () => {
    renderComponent(null);

    const signupLinks = screen.getAllByRole('link', { name: /create free account|get started/i });
    expect(signupLinks.length).toBeGreaterThanOrEqual(1);
    expect(signupLinks[0]).toHaveAttribute('href', '/signup');

    const loginLinks = screen.getAllByRole('link', { name: /log in|sign in/i });
    expect(loginLinks.length).toBeGreaterThanOrEqual(1);
    expect(loginLinks[0]).toHaveAttribute('href', '/login');
  });

  it('toggles FAQ questions open and closed on click', () => {
    renderComponent(null);

    const firstFaqButton = screen.getByText(/do i need prior coding experience/i);
    expect(firstFaqButton).toBeInTheDocument();

    // First FAQ is open by default
    expect(screen.getByText(/not at all\. rootaccess starts with fundamental manual qa/i)).toBeInTheDocument();

    // Click to toggle close
    fireEvent.click(firstFaqButton);
    expect(screen.queryByText(/not at all\. rootaccess starts with fundamental manual qa/i)).not.toBeInTheDocument();

    // Click to toggle open again
    fireEvent.click(firstFaqButton);
    expect(screen.getByText(/not at all\. rootaccess starts with fundamental manual qa/i)).toBeInTheDocument();
  });

  it('adapts Navbar when user is logged in', () => {
    renderComponent({ id: 'student-123', email: 'alex@example.com' });

    // Should show "Go to App" button with user's name
    expect(screen.getAllByText(/go to app/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });
});
