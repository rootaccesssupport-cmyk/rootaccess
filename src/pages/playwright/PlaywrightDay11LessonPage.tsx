import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_11_DATA,
  PLAYWRIGHT_DAY_11_STARTER_CODE,
  PLAYWRIGHT_DAY_11_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_11_STARTER_OUTPUT,
  evaluateDay11Assignment,
} from '../../data/playwrightDay11Data';

export const PlaywrightDay11LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={11}
      data={PLAYWRIGHT_DAY_11_DATA}
      starterCode={PLAYWRIGHT_DAY_11_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_11_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_11_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay11Assignment}
      prevLessonId="lesson-playwright-day-10"
      currentLessonId="lesson-playwright-day-11"
      nextLessonId="lesson-playwright-day-12"
      nextLessonUrl="/courses/playwright-automation/day-12"
      pdfFileName="day-11-authentication-sessions-and-test-isolation.pdf"
    />
  );
};
