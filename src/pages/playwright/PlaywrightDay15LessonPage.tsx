import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_15_DATA,
  PLAYWRIGHT_DAY_15_STARTER_CODE,
  PLAYWRIGHT_DAY_15_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_15_STARTER_OUTPUT,
  evaluateDay15Assignment,
} from '../../data/playwrightDay15Data';

export const PlaywrightDay15LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={15}
      data={PLAYWRIGHT_DAY_15_DATA}
      starterCode={PLAYWRIGHT_DAY_15_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_15_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_15_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay15Assignment}
      prevLessonId="lesson-playwright-day-14"
      currentLessonId="lesson-playwright-day-15"
      nextLessonId="lesson-playwright-day-16"
      nextLessonUrl="/courses/playwright-automation/day-16"
      pdfFileName="day-15-ci-cd-integration-with-github-actions.pdf"
    />
  );
};
