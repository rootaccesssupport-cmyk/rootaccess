import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_10_DATA,
  PLAYWRIGHT_DAY_10_STARTER_CODE,
  PLAYWRIGHT_DAY_10_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_10_STARTER_OUTPUT,
  evaluateDay10Assignment,
} from '../../data/playwrightDay10Data';

export const PlaywrightDay10LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={10}
      data={PLAYWRIGHT_DAY_10_DATA}
      starterCode={PLAYWRIGHT_DAY_10_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_10_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_10_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay10Assignment}
      prevLessonId="lesson-playwright-day-9"
      currentLessonId="lesson-playwright-day-10"
      nextLessonId="lesson-playwright-day-11"
      nextLessonUrl="/courses/playwright-automation/day-11"
      pdfFileName="day-10-debugging-reporting-and-failure-analysis.pdf"
    />
  );
};
