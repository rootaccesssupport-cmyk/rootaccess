import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AI_DAYS_DATA, AI_CAPSTONE_PROJECT } from '../data/aiPromptCurriculumData';
import { COURSES } from '../data/curriculumData';
import { ENROLLMENT_PAYMENT_CONFIG } from '../data/enrollmentPaymentConfig';
import { COURSE_RATINGS_DATA } from '../data/courseRatingsData';
import { PromptPlayground } from '../components/ai/PromptPlayground';
import { AiDayLessonPage } from '../pages/ai/AiDayLessonPage';
import { AiCourseCertificatePage } from '../pages/ai/AiCourseCertificatePage';
import { AdminAiCourseManagerPage } from '../pages/admin/AdminAiCourseManagerPage';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';
import * as AuthContextModule from '../context/AuthContext';

describe('RootAccess — AI Fundamentals & Prompt Engineering Track', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('1. Curriculum Data & Content Completeness', () => {
    it('has full 7 days structured with comprehensive learning objectives and topics', () => {
      expect(AI_DAYS_DATA).toHaveLength(7);

      AI_DAYS_DATA.forEach((day, index) => {
        expect(day.dayNumber).toBe(index + 1);
        expect(day.title).toBeTruthy();
        expect(day.subtitle).toBeTruthy();
        expect(day.duration).toBeTruthy();
        expect(day.objectives.length).toBeGreaterThanOrEqual(3);
        expect(day.topics.length).toBeGreaterThanOrEqual(2);
        expect(day.topics.every((t) => t.title && t.explanation && t.realWorldExample)).toBe(true);
        expect(day.guidedExercise.title).toBeTruthy();
        expect(day.independentChallenge.title).toBeTruthy();
        expect(day.workplaceScenarios.length).toBeGreaterThanOrEqual(1);
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

    it('defines Day 3 with the complete 6-Part Framework', () => {
      const day3 = AI_DAYS_DATA.find((d) => d.dayNumber === 3);
      expect(day3).toBeDefined();
      const allText = JSON.stringify(day3);
      expect(allText).toContain('6-Part Framework');
      expect(allText).toContain('ROLE');
      expect(allText).toContain('TASK');
      expect(allText).toContain('CONTEXT');
      expect(allText).toContain('CONSTRAINTS');
      expect(allText).toContain('OUTPUT FORMAT');
      expect(allText).toContain('SUCCESS CRITERIA');
    });

    it('defines Day 4 with few-shot prompting, decomposition, and the Fallibility Principle', () => {
      const day4 = AI_DAYS_DATA.find((d) => d.dayNumber === 4);
      expect(day4).toBeDefined();
      expect(day4?.title).toContain('Advanced Prompting');
      const allText = JSON.stringify(day4);
      expect(allText).toContain('Few-Shot');
      expect(allText).toContain('Decomposition');
      expect(allText).toContain('Fallibility Principle');
    });

    it('defines Day 6 with hallucination mitigation, 4-point verification checklist, and data privacy', () => {
      const day6 = AI_DAYS_DATA.find((d) => d.dayNumber === 6);
      expect(day6).toBeDefined();
      const allText = JSON.stringify(day6);
      expect(allText).toContain('Hallucination');
      expect(allText).toContain('Verification Checklist');
      expect(allText).toContain('Data Privacy');
    });

    it('defines Day 7 Capstone Project with all 5 rubric criteria totaling 100 points', () => {
      expect(AI_CAPSTONE_PROJECT.title).toContain('Personal AI Productivity Workflow');
      expect(AI_CAPSTONE_PROJECT.rubric).toHaveLength(5);
      const totalPoints = AI_CAPSTONE_PROJECT.rubric.reduce((acc, r) => acc + r.maxPoints, 0);
      expect(totalPoints).toBe(100);
      expect(AI_CAPSTONE_PROJECT.passingScore).toBe(80);
    });

    it('integrates into main course catalog, enrollment pricing, and student ratings', () => {
      const aiCourse = COURSES.find((c) => c.id === 'course-ai-prompt-engineering');
      expect(aiCourse).toBeDefined();
      expect(aiCourse?.title).toBe('AI Fundamentals & Prompt Engineering');
      expect(aiCourse?.slug).toBe('ai-prompt-engineering');
      expect(aiCourse?.lessons).toHaveLength(7);

      // Pricing check
      const pricing = ENROLLMENT_PAYMENT_CONFIG.pricing['ai-prompt-engineering'];
      expect(pricing).toBeDefined();
      expect(pricing.inr).toBe(299);
      expect(pricing.originalInr).toBe(599);

      // Ratings check
      const ratings = COURSE_RATINGS_DATA['ai-prompt-engineering'];
      expect(ratings).toBeDefined();
      expect(ratings.reviews).toHaveLength(20);
      const allRatingsAbove3 = ratings.reviews.every((r) => r.rating >= 3);
      expect(allRatingsAbove3).toBe(true);
      expect(ratings.averageRating).toBeGreaterThanOrEqual(4.2);
    });
  });

  describe('2. Interactive Prompt Playground Component', () => {
    it('renders the playground with curated scenarios and evaluates framework components', () => {
      render(<PromptPlayground />);

      expect(screen.getByText(/Interactive Prompt Studio/i)).toBeInTheDocument();
      expect(screen.getByText(/Deterministic Simulator/i)).toBeInTheDocument();
      expect(screen.getByText(/Structure Score:/i)).toBeInTheDocument();

      // Run button
      expect(screen.getByRole('button', { name: /Run Practice \(Evaluate\)/i })).toBeInTheDocument();
    });

    it('allows running simulations and switching to Weak vs Improved comparison', () => {
      vi.useFakeTimers();
      render(<PromptPlayground />);

      const runButton = screen.getByRole('button', { name: /Run Practice \(Evaluate\)/i });
      fireEvent.click(runButton);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Output subtabs should appear
      const compTab = screen.getByRole('button', { name: /Weak vs Improved Comparison/i });
      expect(compTab).toBeInTheDocument();
      fireEvent.click(compTab);

      expect(screen.getByText(/Initial Vague Prompt Output/i)).toBeInTheDocument();
      expect(screen.getByText(/Framework-Optimized Output/i)).toBeInTheDocument();
    });

    it('saves customized prompts to local prompt library', () => {
      render(<PromptPlayground />);

      const saveButton = screen.getByRole('button', { name: /Save Prompt/i });
      fireEvent.click(saveButton);

      expect(screen.getByText(/Saved to Library!/i)).toBeInTheDocument();
      const savedStorage = localStorage.getItem('rootaccess_saved_prompt_library');
      expect(savedStorage).toBeTruthy();
    });
  });

  describe('3. AiDayLessonPage Preview & Access Gates', () => {
    const renderDay = (dayNumber: number) => {
      return render(
        <MemoryRouter initialEntries={[`/courses/ai-prompt-engineering/day-${dayNumber}`]}>
          <AuthProvider>
            <ProgressProvider>
              <Routes>
                <Route path="/courses/ai-prompt-engineering/:dayId" element={<AiDayLessonPage />} />
              </Routes>
            </ProgressProvider>
          </AuthProvider>
        </MemoryRouter>
      );
    };

    it('allows full access to Day 1 as Free Preview without requiring enrollment', () => {
      renderDay(1);

      expect(screen.getByText(/Day 1 of 7/i)).toBeInTheDocument();
      expect(screen.getByText(/Concepts & Worked Examples/i)).toBeInTheDocument();
      expect(screen.getByText(/Hands-on Practice & Playground/i)).toBeInTheDocument();
      expect(screen.getByText(/Workplace Scenarios/i)).toBeInTheDocument();
      expect(screen.getByText(/Knowledge Check/i)).toBeInTheDocument();
    });

    it('gates Day 2 when user is not enrolled, showing launch pricing and WhatsApp CTA', () => {
      renderDay(2);

      expect(screen.getByText(/Enrollment & Payment Required/i)).toBeInTheDocument();
      expect(screen.getByText(/Day 1 Free Preview Available/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Enroll & Pay via UPI \(WhatsApp\)/i })).toBeInTheDocument();
    });
  });

  describe('4. AiCourseCertificatePage Milestone Gating', () => {
    it('locks certificate when course requirements are incomplete and provides guidance', () => {
      render(
        <MemoryRouter initialEntries={['/courses/ai-prompt-engineering/certificate']}>
          <AuthProvider>
            <ProgressProvider>
              <AiCourseCertificatePage />
            </ProgressProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Certificate Locked/i)).toBeInTheDocument();
      expect(screen.getByText(/Missing Requirements/i)).toBeInTheDocument();
      expect(screen.getByText(/Day 7: Capstone Project \(Score ≥ 80%\)/i)).toBeInTheDocument();
    });
  });

  describe('5. Admin AI Course Manager Access Control', () => {
    it('restricts non-admin users and shows unauthorized access notice', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        user: { id: 'student-1', email: 'learner@example.com' } as any,
        profile: { id: 'student-1', full_name: 'Student Learner', email: 'learner@example.com', role: 'student' as any },
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
        <MemoryRouter initialEntries={['/admin/ai-course-manager']}>
          <AdminAiCourseManagerPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Admin Access Only/i)).toBeInTheDocument();
      expect(screen.getByText(/Return to Student Dashboard/i)).toBeInTheDocument();
    });

    it('allows admin users to view curriculum management editor and day selector', () => {
      vi.spyOn(AuthContextModule, 'useAuth').mockReturnValue({
        user: { id: 'admin-1', email: 'pavankalyan.d@gmail.com' } as any,
        profile: { id: 'admin-1', full_name: 'Lead Admin', email: 'pavankalyan.d@gmail.com', role: 'admin' as any },
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
        <MemoryRouter initialEntries={['/admin/ai-course-manager']}>
          <AdminAiCourseManagerPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/AI Fundamentals & Prompt Engineering Admin Manager/i)).toBeInTheDocument();
      expect(screen.getAllByRole('button', { name: /Day 1/i }).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByRole('button', { name: /Day 7/i }).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByRole('button', { name: /Save Day Changes/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reset Defaults/i })).toBeInTheDocument();
    });
  });
});
