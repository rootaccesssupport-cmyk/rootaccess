import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import { CareersPage } from '../pages/CareersPage';

describe('CareersPage Component & GrossNumber Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderCareersPage = () => {
    return render(
      <MemoryRouter initialEntries={['/careers']}>
        <AuthProvider>
          <ProgressProvider>
            <CareersPage />
          </ProgressProvider>
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('renders the careers headline and GrossNumber partnership information', () => {
    renderCareersPage();

    expect(
      screen.getByRole('heading', { level: 1, name: /find tech & qa jobs all over india/i })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/GrossNumber\.com/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bengaluru/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Hyderabad/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Pune/i).length).toBeGreaterThan(0);
  });

  it('contains valid outgoing links to GrossNumber.com with secure attributes', () => {
    renderCareersPage();

    const grossNumberLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href') === 'https://grossnumber.com');

    expect(grossNumberLinks.length).toBeGreaterThan(0);

    grossNumberLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('displays in-demand roles matching RootAccess skills', () => {
    renderCareersPage();

    expect(screen.getByText(/Manual QA \/ Test Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Automation Test Engineer \(SDET\)/i)).toBeInTheDocument();
    expect(screen.getByText(/SQL & Database QA \/ Analyst/i)).toBeInTheDocument();
    expect(screen.getByText(/API & Backend Test Engineer/i)).toBeInTheDocument();
  });
});
