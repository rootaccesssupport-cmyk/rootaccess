import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_17_DATA,
  PLAYWRIGHT_DAY_17_STARTER_CODE,
  PLAYWRIGHT_DAY_17_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_17_STARTER_OUTPUT,
  evaluateDay17Assignment,
} from '../../data/playwrightDay17Data';

export const PlaywrightDay17LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={17}
      data={PLAYWRIGHT_DAY_17_DATA}
      starterCode={PLAYWRIGHT_DAY_17_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_17_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_17_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay17Assignment}
      prevLessonId="lesson-playwright-day-16"
      currentLessonId="lesson-playwright-day-17"
      nextLessonId="lesson-playwright-day-18"
      nextLessonUrl="/courses/playwright-automation/day-18"
      pdfFileName="day-17-ai-assisted-debugging-and-flaky-test-analysis.pdf"
    />
  );
};
