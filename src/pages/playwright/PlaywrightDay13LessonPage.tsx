import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_13_DATA,
  PLAYWRIGHT_DAY_13_STARTER_CODE,
  PLAYWRIGHT_DAY_13_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_13_STARTER_OUTPUT,
  evaluateDay13Assignment,
} from '../../data/playwrightDay13Data';

export const PlaywrightDay13LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={13}
      data={PLAYWRIGHT_DAY_13_DATA}
      starterCode={PLAYWRIGHT_DAY_13_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_13_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_13_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay13Assignment}
      prevLessonId="lesson-playwright-day-12"
      currentLessonId="lesson-playwright-day-13"
      nextLessonId="lesson-playwright-day-14"
      nextLessonUrl="/courses/playwright-automation/day-14"
      pdfFileName="day-13-api-testing-with-playwright.pdf"
    />
  );
};
