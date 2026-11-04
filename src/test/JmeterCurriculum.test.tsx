import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import {
  JMETER_DAYS_DATA,
} from '../data/jmeterCurriculumData';
import { COURSES } from '../data/curriculumData';
import { ENROLLMENT_PAYMENT_CONFIG } from '../data/enrollmentPaymentConfig';
import { COURSE_RATINGS_DATA } from '../data/courseRatingsData';
import { JmeterDayLessonPage } from '../pages/jmeter/JmeterDayLessonPage';
import { JmeterCourseCertificatePage } from '../pages/jmeter/JmeterCourseCertificatePage';
import { AdminJmeterCourseManagerPage } from '../pages/admin/AdminJmeterCourseManagerPage';
import { JmeterConcurrencySimulator } from '../components/jmeter/JmeterConcurrencySimulator';
import { JmeterTestPlanBuilder } from '../components/jmeter/JmeterTestPlanBuilder';
import { JmeterHttpRequestStudio } from '../components/jmeter/JmeterHttpRequestStudio';
import { JmeterAssertionValidator } from '../components/jmeter/JmeterAssertionValidator';
import { JmeterCsvParameterizer } from '../components/jmeter/JmeterCsvParameterizer';
import { JmeterJsonExtractorCorrelator } from '../components/jmeter/JmeterJsonExtractorCorrelator';
import { JmeterWorkloadDesigner } from '../components/jmeter/JmeterWorkloadDesigner';
import { JmeterMetricsDashboard } from '../components/jmeter/JmeterMetricsDashboard';
import { JmeterCommandLineBuilder } from '../components/jmeter/JmeterCommandLineBuilder';
import { JmeterFinalProjectWorkbench } from '../components/jmeter/JmeterFinalProjectWorkbench';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import * as AuthContextModule from '../context/AuthContext';

describe('RootAccess — Apache JMeter: Performance Testing from Zero to Practical', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('1. Curriculum Data & Content Completeness', () => {
    it('has all 10 days structured with comprehensive learning objectives and topics', () => {
      expect(JMETER_DAYS_DATA).toHaveLength(10);

      JMETER_DAYS_DATA.forEach((day, index) => {
        expect(day.dayNumber).toBe(index + 1);
        expect(day.title).toBeTruthy();
        expect(day.subtitle).toBeTruthy();
        expect(day.duration).toBeTruthy();
        expect(day.objectives.length).toBeGreaterThanOrEqual(3);
        expect(day.topics.length).toBeGreaterThanOrEqual(1);
        expect(day.topics.every((t) => t.title && t.explanation && t.realWorldExample)).toBe(true);
        expect(day.guidedDemonstration.title).toBeTruthy();
        expect(day.practicalLab.title).toBeTruthy();
        expect(day.independentChallenge.title).toBeTruthy();
        expect(day.quiz.questions.length).toBeGreaterThanOrEqual(5);

        // Every quiz question must have options, correct index, and clear explanation
        day.quiz.questions.forEach((q) => {
          expect(q.question).toBeTruthy();
          expect(q.options.length).toBeGreaterThanOrEqual(3);
          expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
          expect(q.correctAnswerIndex).toBeLessThan(q.options.length);
          expect(q.explanation).toBeTruthy();
        });
      });
    });

    it('defines Cumulative Milestones Checkpoint Reviews after Days 3, 6, and 9', () => {
      const day3 = JMETER_DAYS_DATA.find((d) => d.dayNumber === 3);
      const day6 = JMETER_DAYS_DATA.find((d) => d.dayNumber === 6);
      const day9 = JMETER_DAYS_DATA.find((d) => d.dayNumber === 9);

      expect(day3?.checkpointReview).toBeDefined();
      expect(day3?.checkpointReview?.title).toContain('Checkpoint 1');
      expect(day3?.checkpointReview?.practicalTasks.length).toBeGreaterThanOrEqual(2);

      expect(day6?.checkpointReview).toBeDefined();
      expect(day6?.checkpointReview?.title).toContain('Checkpoint 2');
      expect(day6?.checkpointReview?.practicalTasks.length).toBeGreaterThanOrEqual(2);

      expect(day9?.checkpointReview).toBeDefined();
      expect(day9?.checkpointReview?.title).toContain('Checkpoint 3');
      expect(day9?.checkpointReview?.practicalTasks.length).toBeGreaterThanOrEqual(2);
    });

    it('defines Day 10 Capstone Project with realistic E-Commerce specification and rubric', () => {
      const day10 = JMETER_DAYS_DATA.find((d) => d.dayNumber === 10);
      expect(day10).toBeDefined();
      expect(day10?.practicalLab.labType).toBe('capstone_project');
      expect(day10?.practicalLab.instructionSteps).toHaveLength(7);
      expect(day10?.practicalLab.expectedSuccessCriteria.length).toBeGreaterThanOrEqual(3);
      expect(day10?.independentChallenge.solutionCriteria.length).toBeGreaterThanOrEqual(3);
      expect(day10?.quiz.passingScorePercent).toBe(80);
    });

    it('verifies Little’s Law and Concurrency model concepts in Day 1', () => {
      const day1 = JMETER_DAYS_DATA.find((d) => d.dayNumber === 1);
      const text = JSON.stringify(day1);
      expect(text).toMatch(/Little['’]s Law/);
      expect(text).toContain('Saturation');
      expect(text).toContain('Latency');
    });

    it('verifies non-GUI CLI and headless execution requirements in Day 9', () => {
      const day9 = JMETER_DAYS_DATA.find((d) => d.dayNumber === 9);
      const text = JSON.stringify(day9);
      expect(text).toContain('-n');
      expect(text).toContain('-t');
      expect(text).toContain('-l');
      expect(text).toContain('-e');
      expect(text).toContain('-o');
    });
  });

  describe('2. Pricing & Enrollment Configuration', () => {
    it('registers JMeter course pricing as ₹399 launch offer and ₹799 regular', () => {
      const pricing = ENROLLMENT_PAYMENT_CONFIG.pricing['jmeter-performance-testing'];
      expect(pricing).toBeDefined();
      expect(pricing.inr).toBe(399);
      expect(pricing.originalInr).toBe(799);
      expect(pricing.isLaunchOffer).toBe(true);
      expect(pricing.label).toContain('Apache JMeter');
    });

    it('registers authentic ratings data with 24 reviews and average rating 4.8', () => {
      const rating = COURSE_RATINGS_DATA['jmeter-performance-testing'];
      expect(rating).toBeDefined();
      expect(rating.totalRatings).toBe(24);
      expect(rating.averageRating).toBe(4.8);
      expect(rating.distribution[5]).toBe(19);
      expect(rating.distribution[4]).toBe(4);
      expect(rating.distribution[3]).toBe(1);
      expect(rating.distribution[2]).toBe(0);
      expect(rating.distribution[1]).toBe(0);
      expect(rating.reviews.length).toBeGreaterThanOrEqual(4);
    });

    it('registers JMeter course in the global curriculum catalogue COURSES', () => {
      const course = COURSES.find((c) => c.slug === 'jmeter-performance-testing');
      expect(course).toBeDefined();
      expect(course?.title).toContain('Apache JMeter');
      expect(course?.lessons).toHaveLength(10);
      expect(course?.badge).toBe('Performance Track');
      expect(course?.quiz.questions.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('3. Interactive Lab Components', () => {
    it('renders Day 1 Concurrency Simulator with Little’s Law model', () => {
      render(<JmeterConcurrencySimulator />);
      expect(screen.getByText(/Virtual User Concurrency/i)).toBeInTheDocument();
      expect(screen.getByText(/Linear Scaling/i)).toBeInTheDocument();
    });

    it('renders Day 2 Test Plan Builder with execution hierarchy', () => {
      render(<JmeterTestPlanBuilder />);
      expect(screen.getByText(/Test Plan Tree Builder/i)).toBeInTheDocument();
      expect(screen.getByText(/RootAccess_ECommerce_Plan/i)).toBeInTheDocument();
      expect(screen.getByText(/GET_Product_Health/i)).toBeInTheDocument();
    });

    it('renders Day 3 HTTP Request Studio with REST methods', () => {
      render(<JmeterHttpRequestStudio />);
      expect(screen.getByText(/HTTP Request Sampler/i)).toBeInTheDocument();
      expect(screen.getByText(/Send HTTP Sample/i)).toBeInTheDocument();
    });

    it('renders Day 4 Assertion Validator with status and duration SLAs', () => {
      render(<JmeterAssertionValidator />);
      expect(screen.getByText(/Assertion Validator/i)).toBeInTheDocument();
      expect(screen.getByText(/Scenario A/i)).toBeInTheDocument();
    });

    it('renders Day 5 CSV Parameterizer with multi-thread dispatch', () => {
      render(<JmeterCsvParameterizer />);
      expect(screen.getByText(/CSV Parameterization/i)).toBeInTheDocument();
      expect(screen.getByText(/Thread #1/i)).toBeInTheDocument();
    });

    it('renders Day 6 JSON Extractor & Correlation Engine', () => {
      render(<JmeterJsonExtractorCorrelator />);
      expect(screen.getAllByText(/JSON Extractor/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Test Chained Call/i)).toBeInTheDocument();
    });

    it('renders Day 7 Workload Timeline Designer', () => {
      render(<JmeterWorkloadDesigner />);
      expect(screen.getByText(/Workload Profile Designer/i)).toBeInTheDocument();
      expect(screen.getByText(/Load Test/i)).toBeInTheDocument();
    });

    it('renders Day 8 Metrics Dashboard with Aggregate Reports', () => {
      render(<JmeterMetricsDashboard />);
      expect(screen.getAllByText(/Aggregate Report/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/checkout/i).length).toBeGreaterThanOrEqual(1);
    });

    it('renders Day 9 Command Line Builder with Non-GUI flags', () => {
      render(<JmeterCommandLineBuilder />);
      expect(screen.getByText(/Production JMeter CLI Command Constructor/i)).toBeInTheDocument();
      expect(screen.getByText(/Simulate CLI Execution/i)).toBeInTheDocument();
    });

    it('renders Day 10 Capstone Final Project Workbench', () => {
      render(
        <MemoryRouter>
          <JmeterFinalProjectWorkbench />
        </MemoryRouter>
      );
      expect(screen.getByText(/Performance Test a Sample E-Commerce API/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Milestone 1 & 2/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('4. Classroom Lesson Page & Navigation', () => {
    const renderDay = (dayNumber: number) => {
      return render(
        <MemoryRouter initialEntries={[`/courses/jmeter-performance-testing/day-${dayNumber}`]}>
          <AuthProvider>
            <ProgressProvider>
              <Routes>
                <Route
                  path="/courses/jmeter-performance-testing/:dayId"
                  element={<JmeterDayLessonPage />}
                />
              </Routes>
            </ProgressProvider>
          </AuthProvider>
        </MemoryRouter>
      );
    };

    it('renders Day 1 Free Preview without blocking non-enrolled students', () => {
      renderDay(1);

      expect(screen.getByText(/Day 1: Performance Testing Fundamentals/i)).toBeInTheDocument();
      expect(screen.getByText(/1. Concept & Visuals/i)).toBeInTheDocument();
      expect(screen.getByText(/3. Practical Lab/i)).toBeInTheDocument();
    });

    it('gates Day 2 when student is not enrolled', () => {
      renderDay(2);

      expect(screen.getByText(/Enrollment & Payment Required/i)).toBeInTheDocument();
      expect(screen.getByText(/Apache JMeter: Performance Testing from Zero to Practical/i)).toBeInTheDocument();
    });

    it('allows navigating between Concept, Demo, Lab, Challenge, and Quiz tabs', () => {
      renderDay(1);

      // Switch to Guided Demo
      fireEvent.click(screen.getByText(/2. Guided Demo/i));
      expect(screen.getByText(/Instructor Walkthrough/i)).toBeInTheDocument();

      // Switch to Practical Lab
      fireEvent.click(screen.getByText(/3. Practical Lab/i));
      expect(screen.getByText(/Hands-On Interactive Simulation Environment/i)).toBeInTheDocument();

      // Switch to Challenge
      fireEvent.click(screen.getByText(/4. Challenge/i));
      expect(screen.getByText(/Independent Performance Engineering Challenge/i)).toBeInTheDocument();

      // Switch to Knowledge Check
      fireEvent.click(screen.getByText(/5. Knowledge Check/i));
      expect(screen.getByText(/Verify Your Mastery of Day 1/i)).toBeInTheDocument();
    });
  });

  describe('5. Verified Certificate Page', () => {
    it('shows locked state when 10 days of coursework are incomplete', () => {
      render(
        <MemoryRouter initialEntries={['/courses/jmeter-performance-testing/certificate']}>
          <AuthProvider>
            <ProgressProvider>
              <JmeterCourseCertificatePage />
            </ProgressProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Verified Credential Locked/i)).toBeInTheDocument();
      expect(screen.getByText(/Pending Requirements/i)).toBeInTheDocument();
    });

    it('unlocks certificate when all 10 days are completed', () => {
      const mockUserId = 'usr-jmeter-test';
      localStorage.setItem(`rootaccess_progress_${mockUserId}`, JSON.stringify({
        completedLessons: [
          'jmeter-day-1', 'jmeter-day-2', 'jmeter-day-3', 'jmeter-day-4', 'jmeter-day-5',
          'jmeter-day-6', 'jmeter-day-7', 'jmeter-day-8', 'jmeter-day-9', 'jmeter-day-10',
        ],
        enrolledCourses: ['jmeter-performance-testing'],
        quizScores: {},
        reportedBugs: {},
      }));
      localStorage.setItem('rootaccess_jmeter_project_submitted', 'true');

      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        user: { id: mockUserId, email: 'tester@rootaccess.co.in', user_metadata: { full_name: 'Pavan Kalyan' } } as any,
        profile: { id: mockUserId, full_name: 'Pavan Kalyan', email: 'tester@rootaccess.co.in', role: 'student' as any },
        session: null,
        loading: false,
        isConfigured: true,
        signIn: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
        resetPasswordForEmail: vi.fn(),
        updatePassword: vi.fn(),
        refreshProfile: vi.fn(),
      });

      render(
        <MemoryRouter initialEntries={['/courses/jmeter-performance-testing/certificate']}>
          <AuthProvider>
            <ProgressProvider>
              <JmeterCourseCertificatePage />
            </ProgressProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Certificate of Completion/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Pavan Kalyan/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Officially Verified Credential/i)).toBeInTheDocument();
    });
  });

  describe('6. Admin Course Manager Portal', () => {
    it('restricts non-admin users from managing curriculum', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        user: { id: 'usr-student', email: 'regular@gmail.com' } as any,
        profile: { id: 'usr-student', full_name: 'Regular Student', email: 'regular@gmail.com', role: 'student' as any },
        session: null,
        loading: false,
        isConfigured: true,
        signIn: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
        resetPasswordForEmail: vi.fn(),
        updatePassword: vi.fn(),
        refreshProfile: vi.fn(),
      });

      render(
        <MemoryRouter initialEntries={['/admin/jmeter-course']}>
          <AuthProvider>
            <AdminJmeterCourseManagerPage />
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Admin Access Only/i)).toBeInTheDocument();
    });

    it('allows admin users to view and edit day curriculum content', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        user: { id: 'usr-admin', email: 'pavankalyan.d@gmail.com' } as any,
        profile: { id: 'usr-admin', full_name: 'Admin Pavan', email: 'pavankalyan.d@gmail.com', role: 'admin' as any },
        session: null,
        loading: false,
        isConfigured: true,
        signIn: vi.fn(),
        signUp: vi.fn(),
        signOut: vi.fn(),
        resetPasswordForEmail: vi.fn(),
        updatePassword: vi.fn(),
        refreshProfile: vi.fn(),
      });

      render(
        <MemoryRouter initialEntries={['/admin/jmeter-course']}>
          <AuthProvider>
            <AdminJmeterCourseManagerPage />
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Curriculum Management Hub/i)).toBeInTheDocument();
      expect(screen.getByText(/Day 1 Config/i)).toBeInTheDocument();
      expect(screen.getByText(/Save Day 1/i)).toBeInTheDocument();
    });
  });
});
