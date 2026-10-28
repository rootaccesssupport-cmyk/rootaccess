import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProgressProvider } from '../context/ProgressContext';

// Days 9 to 20 Data & Rubric Evaluators
import {
  PLAYWRIGHT_DAY_9_DATA,
  PLAYWRIGHT_DAY_9_STARTER_CODE,
  PLAYWRIGHT_DAY_9_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_9_STARTER_OUTPUT,
  evaluateDay9Assignment,
} from '../data/playwrightDay9Data';
import {
  PLAYWRIGHT_DAY_10_DATA,
  PLAYWRIGHT_DAY_10_STARTER_CODE,
  PLAYWRIGHT_DAY_10_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_10_STARTER_OUTPUT,
  evaluateDay10Assignment,
} from '../data/playwrightDay10Data';
import {
  PLAYWRIGHT_DAY_11_DATA,
  PLAYWRIGHT_DAY_11_STARTER_CODE,
  PLAYWRIGHT_DAY_11_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_11_STARTER_OUTPUT,
  evaluateDay11Assignment,
} from '../data/playwrightDay11Data';
import {
  PLAYWRIGHT_DAY_12_DATA,
  PLAYWRIGHT_DAY_12_STARTER_CODE,
  PLAYWRIGHT_DAY_12_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_12_STARTER_OUTPUT,
  evaluateDay12Assignment,
} from '../data/playwrightDay12Data';
import {
  PLAYWRIGHT_DAY_13_DATA,
  PLAYWRIGHT_DAY_13_STARTER_CODE,
  PLAYWRIGHT_DAY_13_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_13_STARTER_OUTPUT,
  evaluateDay13Assignment,
} from '../data/playwrightDay13Data';
import {
  PLAYWRIGHT_DAY_14_DATA,
  PLAYWRIGHT_DAY_14_STARTER_CODE,
  PLAYWRIGHT_DAY_14_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_14_STARTER_OUTPUT,
  evaluateDay14Assignment,
} from '../data/playwrightDay14Data';
import {
  PLAYWRIGHT_DAY_15_DATA,
  PLAYWRIGHT_DAY_15_STARTER_CODE,
  PLAYWRIGHT_DAY_15_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_15_STARTER_OUTPUT,
  evaluateDay15Assignment,
} from '../data/playwrightDay15Data';
import {
  PLAYWRIGHT_DAY_16_DATA,
  PLAYWRIGHT_DAY_16_STARTER_CODE,
  PLAYWRIGHT_DAY_16_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_16_STARTER_OUTPUT,
  evaluateDay16Assignment,
} from '../data/playwrightDay16Data';
import {
  PLAYWRIGHT_DAY_17_DATA,
  PLAYWRIGHT_DAY_17_STARTER_CODE,
  PLAYWRIGHT_DAY_17_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_17_STARTER_OUTPUT,
  evaluateDay17Assignment,
} from '../data/playwrightDay17Data';
import {
  PLAYWRIGHT_DAY_18_DATA,
  PLAYWRIGHT_DAY_18_STARTER_CODE,
  PLAYWRIGHT_DAY_18_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_18_STARTER_OUTPUT,
  evaluateDay18Assignment,
} from '../data/playwrightDay18Data';
import {
  PLAYWRIGHT_DAY_19_DATA,
  PLAYWRIGHT_DAY_19_STARTER_CODE,
  PLAYWRIGHT_DAY_19_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_19_STARTER_OUTPUT,
  evaluateDay19Assignment,
} from '../data/playwrightDay19Data';
import {
  PLAYWRIGHT_DAY_20_DATA,
  PLAYWRIGHT_DAY_20_STARTER_CODE,
  PLAYWRIGHT_DAY_20_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_20_STARTER_OUTPUT,
  evaluateDay20Assignment,
} from '../data/playwrightDay20Data';

// Pages
import { PlaywrightDay9LessonPage } from '../pages/playwright/PlaywrightDay9LessonPage';
import { PlaywrightDay14LessonPage } from '../pages/playwright/PlaywrightDay14LessonPage';
import { PlaywrightDay20LessonPage } from '../pages/playwright/PlaywrightDay20LessonPage';

function setupEnrolledProgress(currentDay: number) {
  const completedLessons: string[] = [];
  for (let i = 1; i < currentDay; i++) {
    completedLessons.push(`lesson-playwright-day-${i}`);
  }

  const progressData = JSON.stringify({
    completedLessons,
    lessonNotes: {},
    quizScores: {},
    enrolledCourses: ['playwright-automation'],
  });
  localStorage.setItem('rootaccess_progress_guest', progressData);
  localStorage.setItem('rootaccess_progress_local-dev-student-1', progressData);
}

describe('Playwright Automation with JavaScript + AI — Days 9 to 20 Curriculum & Engine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const allDaysData = [
    PLAYWRIGHT_DAY_9_DATA,
    PLAYWRIGHT_DAY_10_DATA,
    PLAYWRIGHT_DAY_11_DATA,
    PLAYWRIGHT_DAY_12_DATA,
    PLAYWRIGHT_DAY_13_DATA,
    PLAYWRIGHT_DAY_14_DATA,
    PLAYWRIGHT_DAY_15_DATA,
    PLAYWRIGHT_DAY_16_DATA,
    PLAYWRIGHT_DAY_17_DATA,
    PLAYWRIGHT_DAY_18_DATA,
    PLAYWRIGHT_DAY_19_DATA,
    PLAYWRIGHT_DAY_20_DATA,
  ];

  it('validates all 12 curriculum datasets have comprehensive structure and topics', () => {
    allDaysData.forEach((dayData, index) => {
      const expectedDay = index + 9;
      expect(dayData.dayNumber).toBe(expectedDay);
      expect(dayData.totalDays).toBe(20);
      expect(dayData.courseTitle).toBe('Playwright Automation with JavaScript + AI');
      expect(dayData.lessonTitle.length).toBeGreaterThan(5);
      expect(dayData.subtitle.length).toBeGreaterThan(10);
      expect(dayData.learningObjectives.length).toBeGreaterThanOrEqual(4);
      expect(dayData.topics.length).toBeGreaterThanOrEqual(4);
      expect(dayData.quizQuestions.length).toBe(10);

      // Verify no TypeScript types leak in code snippets
      dayData.topics.forEach((topic) => {
        expect(topic.title.length).toBeGreaterThan(3);
        expect(topic.explanation.length).toBeGreaterThan(50);
        if (topic.examples) {
          topic.examples.forEach((ex) => {
            expect(ex.codeSnippet).not.toContain(': Page');
            expect(ex.codeSnippet).not.toContain(': Locator');
            expect(ex.codeSnippet).not.toContain(': boolean');
            expect(ex.codeSnippet).not.toContain(': string');
            expect(ex.codeSnippet).not.toContain(': number');
          });
        }
      });
    });
  });

  it('validates interview questions across Days 9–19 (≥5 each) and Day 20 (20 questions)', () => {
    allDaysData.forEach((dayData) => {
      if (dayData.dayNumber === 20) {
        expect(dayData.interviewQuestions.length).toBe(20);
      } else {
        expect(dayData.interviewQuestions.length).toBeGreaterThanOrEqual(5);
      }

      dayData.interviewQuestions.forEach((q) => {
        expect(q.question.length).toBeGreaterThan(10);
        expect(q.modelAnswer.length).toBeGreaterThan(30);
        expect(q.assessmentFocus.length).toBeGreaterThan(5);
        expect(['Beginner', 'Intermediate', 'Advanced', 'Scenario-Based']).toContain(q.difficulty);
      });
    });
  });

  it('validates Day 20 Capstone contains 25 final assessment questions', () => {
    expect(PLAYWRIGHT_DAY_20_DATA.finalAssessment).toBeDefined();
    expect(PLAYWRIGHT_DAY_20_DATA.finalAssessment?.length).toBe(25);

    PLAYWRIGHT_DAY_20_DATA.finalAssessment?.forEach((q) => {
      expect(q.id).toBeDefined();
      expect(q.question.length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswerIndex).toBeLessThanOrEqual(3);
      expect(q.explanation.length).toBeGreaterThan(15);
    });
  });

  describe('Deterministic 10-Point Rubric Evaluators', () => {
    const evaluators = [
      { day: 9, evalFn: evaluateDay9Assignment, code: PLAYWRIGHT_DAY_9_STARTER_CODE, out: PLAYWRIGHT_DAY_9_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_9_STARTER_EXPLANATION },
      { day: 10, evalFn: evaluateDay10Assignment, code: PLAYWRIGHT_DAY_10_STARTER_CODE, out: PLAYWRIGHT_DAY_10_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_10_STARTER_EXPLANATION },
      { day: 11, evalFn: evaluateDay11Assignment, code: PLAYWRIGHT_DAY_11_STARTER_CODE, out: PLAYWRIGHT_DAY_11_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_11_STARTER_EXPLANATION },
      { day: 12, evalFn: evaluateDay12Assignment, code: PLAYWRIGHT_DAY_12_STARTER_CODE, out: PLAYWRIGHT_DAY_12_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_12_STARTER_EXPLANATION },
      { day: 13, evalFn: evaluateDay13Assignment, code: PLAYWRIGHT_DAY_13_STARTER_CODE, out: PLAYWRIGHT_DAY_13_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_13_STARTER_EXPLANATION },
      { day: 14, evalFn: evaluateDay14Assignment, code: PLAYWRIGHT_DAY_14_STARTER_CODE, out: PLAYWRIGHT_DAY_14_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_14_STARTER_EXPLANATION },
      { day: 15, evalFn: evaluateDay15Assignment, code: PLAYWRIGHT_DAY_15_STARTER_CODE, out: PLAYWRIGHT_DAY_15_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_15_STARTER_EXPLANATION },
      { day: 16, evalFn: evaluateDay16Assignment, code: PLAYWRIGHT_DAY_16_STARTER_CODE, out: PLAYWRIGHT_DAY_16_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_16_STARTER_EXPLANATION },
      { day: 17, evalFn: evaluateDay17Assignment, code: PLAYWRIGHT_DAY_17_STARTER_CODE, out: PLAYWRIGHT_DAY_17_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_17_STARTER_EXPLANATION },
      { day: 18, evalFn: evaluateDay18Assignment, code: PLAYWRIGHT_DAY_18_STARTER_CODE, out: PLAYWRIGHT_DAY_18_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_18_STARTER_EXPLANATION },
      { day: 19, evalFn: evaluateDay19Assignment, code: PLAYWRIGHT_DAY_19_STARTER_CODE, out: PLAYWRIGHT_DAY_19_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_19_STARTER_EXPLANATION },
      { day: 20, evalFn: evaluateDay20Assignment, code: PLAYWRIGHT_DAY_20_STARTER_CODE, out: PLAYWRIGHT_DAY_20_STARTER_OUTPUT, exp: PLAYWRIGHT_DAY_20_STARTER_EXPLANATION },
    ];

    it('passes starter code for all 12 days with full score (10/10) and 10 passed criteria', () => {
      evaluators.forEach(({ day, evalFn, code, out, exp }) => {
        const result = evalFn(code, out, exp);
        expect(result.score, `Day ${day} score`).toBe(10);
        expect(result.passed, `Day ${day} passed`).toBe(true);
        expect(result.criteria.length, `Day ${day} criteria length`).toBe(10);
        expect(result.criteria.every((c: any) => c.passed), `Day ${day} all criteria passed`).toBe(true);
      });
    });

    it('fails when empty or irrelevant code is submitted', () => {
      evaluators.forEach(({ day, evalFn, out, exp }) => {
        const result = evalFn('// empty code', out, exp);
        expect(result.score, `Day ${day} score on empty`).toBeLessThan(10);
        expect(result.passed, `Day ${day} passed on empty`).toBe(false);
      });
    });
  });

  describe('Component Rendering and User Flows', () => {
    it('renders enrollment required screen when unenrolled on Day 9', () => {
      render(
        <MemoryRouter initialEntries={['/courses/playwright-automation/day-9']}>
          <AuthProvider>
            <ProgressProvider>
              <Routes>
                <Route path="/courses/playwright-automation/day-9" element={<PlaywrightDay9LessonPage />} />
                <Route path="/courses/playwright-automation" element={<div>Course Syllabus</div>} />
              </Routes>
            </ProgressProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByText(/Enrollment Required/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Enroll in Course for Free/i })).toBeInTheDocument();
    });

    it('renders Day 9 page with PDF link and pure JavaScript badge when enrolled', () => {
      setupEnrolledProgress(9);

      render(
        <MemoryRouter initialEntries={['/courses/playwright-automation/day-9']}>
          <AuthProvider>
            <ProgressProvider>
              <Routes>
                <Route path="/courses/playwright-automation/day-9" element={<PlaywrightDay9LessonPage />} />
                <Route path="/courses/playwright-automation/day-8" element={<div>Day 8</div>} />
                <Route path="/courses/playwright-automation/day-10" element={<div>Day 10</div>} />
              </Routes>
            </ProgressProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 1, name: new RegExp(PLAYWRIGHT_DAY_9_DATA.lessonTitle, 'i') })).toBeInTheDocument();
      expect(screen.getByText(/Day 9 of 20/i)).toBeInTheDocument();
      expect(screen.getByText(/Pure JavaScript \(\.js\)/i)).toBeInTheDocument();

      const pdfLink = screen.getByRole('link', { name: /Study Notes PDF/i });
      expect(pdfLink).toHaveAttribute('href', '/playwright-js/day-9-data-driven-testing-and-test-parameterisation.pdf');
    });

    it('renders Day 14 and allows evaluating practical assignment rubric', () => {
      setupEnrolledProgress(14);

      render(
        <MemoryRouter initialEntries={['/courses/playwright-automation/day-14']}>
          <AuthProvider>
            <ProgressProvider>
              <Routes>
                <Route path="/courses/playwright-automation/day-14" element={<PlaywrightDay14LessonPage />} />
              </Routes>
            </ProgressProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { level: 1, name: new RegExp(PLAYWRIGHT_DAY_14_DATA.lessonTitle, 'i') })).toBeInTheDocument();

      // Switch to Assignment tab
      const assignmentTab = screen.getByRole('button', { name: /Practical Lab/i });
      fireEvent.click(assignmentTab);

      expect(screen.getByRole('heading', { level: 2, name: /Day 14 Practical Engineering Lab/i })).toBeInTheDocument();

      const evalBtn = screen.getByRole('button', { name: /Evaluate Assignment/i });
      fireEvent.click(evalBtn);

      expect(screen.getByText(/Rubric Evaluation Score:/i)).toBeInTheDocument();
      expect(screen.getByText(/10 \/ 10 Points \(PASSED\)/i)).toBeInTheDocument();
    });

    it('renders Day 20 Capstone, showing Final Assessment tab and 20 Interview Questions', () => {
      setupEnrolledProgress(20);

      render(
        <MemoryRouter initialEntries={['/courses/playwright-automation/day-20']}>
          <AuthProvider>
            <ProgressProvider>
              <Routes>
                <Route path="/courses/playwright-automation/day-20" element={<PlaywrightDay20LessonPage />} />
              </Routes>
            </ProgressProvider>
          </AuthProvider>
        </MemoryRouter>
      );

      // Verify Day 20 header
      expect(screen.getByRole('heading', { level: 1, name: new RegExp(PLAYWRIGHT_DAY_20_DATA.lessonTitle, 'i') })).toBeInTheDocument();
      expect(screen.getByText(/Day 20 of 20/i)).toBeInTheDocument();

      // Verify tabs including Final Assessment tab
      expect(screen.getByRole('button', { name: /Final Assessment/i })).toBeInTheDocument();

      // Switch to Interview tab and verify 20 questions
      const interviewTab = screen.getByRole('button', { name: /Interview Prep/i });
      fireEvent.click(interviewTab);

      expect(screen.getByRole('heading', { level: 2, name: /Day 20 Senior QA Interview Question Bank/i })).toBeInTheDocument();
      expect(screen.getByText(/Review these 20 real-world scenario questions/i)).toBeInTheDocument();

      // Click first question
      const q1 = PLAYWRIGHT_DAY_20_DATA.interviewQuestions[0];
      const q1Btn = screen.getByText(q1.question);
      fireEvent.click(q1Btn);

      expect(screen.getByText(/Model Senior Answer:/i)).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes(q1.modelAnswer.slice(0, 30)))).toBeInTheDocument();

      // Switch to Final Assessment tab
      const finalExamTab = screen.getByRole('button', { name: /Final Assessment/i });
      fireEvent.click(finalExamTab);

      expect(screen.getByRole('heading', { level: 2, name: /Playwright Masterclass Final Assessment/i })).toBeInTheDocument();
    });
  });
});
