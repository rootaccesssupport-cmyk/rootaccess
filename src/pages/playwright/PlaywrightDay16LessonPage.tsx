import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_16_DATA,
  PLAYWRIGHT_DAY_16_STARTER_CODE,
  PLAYWRIGHT_DAY_16_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_16_STARTER_OUTPUT,
  evaluateDay16Assignment,
} from '../../data/playwrightDay16Data';

export const PlaywrightDay16LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={16}
      data={PLAYWRIGHT_DAY_16_DATA}
      starterCode={PLAYWRIGHT_DAY_16_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_16_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_16_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay16Assignment}
      prevLessonId="lesson-playwright-day-15"
      currentLessonId="lesson-playwright-day-16"
      nextLessonId="lesson-playwright-day-17"
      nextLessonUrl="/courses/playwright-automation/day-17"
      pdfFileName="day-16-ai-assisted-test-generation-and-locator-suggestions.pdf"
    />
  );
};
