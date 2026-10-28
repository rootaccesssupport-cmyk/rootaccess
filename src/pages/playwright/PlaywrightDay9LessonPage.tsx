import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_9_DATA,
  PLAYWRIGHT_DAY_9_STARTER_CODE,
  PLAYWRIGHT_DAY_9_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_9_STARTER_OUTPUT,
  evaluateDay9Assignment,
} from '../../data/playwrightDay9Data';

export const PlaywrightDay9LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={9}
      data={PLAYWRIGHT_DAY_9_DATA}
      starterCode={PLAYWRIGHT_DAY_9_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_9_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_9_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay9Assignment}
      prevLessonId="lesson-playwright-day-8"
      currentLessonId="lesson-playwright-day-9"
      nextLessonId="lesson-playwright-day-10"
      nextLessonUrl="/courses/playwright-automation/day-10"
      pdfFileName="day-9-data-driven-testing-and-test-parameterisation.pdf"
    />
  );
};
