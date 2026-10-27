import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DefectSimulatorPage } from '../pages/DefectSimulatorPage';
import { ProgressProvider } from '../context/ProgressContext';
import { AuthProvider } from '../context/AuthContext';

describe('DefectSimulatorPage Component (Phase 4)', () => {
  const renderSimulator = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <ProgressProvider>
            <DefectSimulatorPage />
          </ProgressProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  it('renders enrollment required gate when student is not enrolled in a QA track', () => {
    localStorage.clear();
    renderSimulator();

    expect(screen.getByText('QA Course Enrollment Required')).toBeInTheDocument();
    expect(screen.getByText('Workplace Defect Simulation Lab')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enroll in manual qa track/i })).toBeInTheDocument();
  });

  describe('When student is enrolled in QA track', () => {
    beforeEach(() => {
      localStorage.clear();
      localStorage.setItem(
        'rootaccess_progress_guest',
        JSON.stringify({
          enrolledCourses: ['manual-qa-fundamentals'],
          completedLessons: [],
          quizScores: {},
          reportedBugs: {},
        })
      );
    });

    it('renders live target application and QA Lead mission brief', () => {
      renderSimulator();

      expect(screen.getByText('Workplace Defect Simulation Lab')).toBeInTheDocument();
      expect(screen.getByText('RootShop Checkout')).toBeInTheDocument();
      expect(screen.getByText('QA Lead Mission Brief')).toBeInTheDocument();
      expect(screen.getByText(/Log Defect Ticket \(Jira Template\)/i)).toBeInTheDocument();
    });

    it('allows reproducing the negative balance coupon bug', () => {
      renderSimulator();

      // Type coupon SAVE50
      const couponInput = screen.getByPlaceholderText(/Enter coupon/i);
      fireEvent.change(couponInput, { target: { value: 'SAVE50' } });

      // Click apply
      fireEvent.click(screen.getByRole('button', { name: /apply code/i }));

      expect(screen.getByText(/Coupon SAVE50 applied! -\$50\.00 discount granted\./i)).toBeInTheDocument();
    });

    it('allows submitting a Jira defect report and receives instant QA lead review', () => {
      renderSimulator();

      // Fill out Jira defect report
      const titleInput = screen.getByPlaceholderText(/e\.g\. \[Checkout\] Negative quantity/i);
      fireEvent.change(titleInput, { target: { value: '[Checkout] Quantity field allows negative integer' } });

      const stepsInput = screen.getByPlaceholderText(/1\. Navigate to checkout/i);
      fireEvent.change(stepsInput, { target: { value: '1. Open cart\n2. Set qty to -2\n3. Check total' } });

      const expectedInput = screen.getByPlaceholderText(/Input should enforce min=1/i);
      fireEvent.change(expectedInput, { target: { value: 'Validation error should prevent values below 1' } });

      // Submit report
      const submitBtn = screen.getByRole('button', { name: /submit ticket for qa review/i });
      fireEvent.click(submitBtn);

      expect(
        screen.getByText(/Great catch! Bug "Cart Allows Zero or Negative Quantity" logged successfully\./i)
      ).toBeInTheDocument();
    });
  });
});
