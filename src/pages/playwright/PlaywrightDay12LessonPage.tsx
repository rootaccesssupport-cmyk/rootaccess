import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_12_DATA,
  PLAYWRIGHT_DAY_12_STARTER_CODE,
  PLAYWRIGHT_DAY_12_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_12_STARTER_OUTPUT,
  evaluateDay12Assignment,
} from '../../data/playwrightDay12Data';

export const PlaywrightDay12LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={12}
      data={PLAYWRIGHT_DAY_12_DATA}
      starterCode={PLAYWRIGHT_DAY_12_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_12_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_12_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay12Assignment}
      prevLessonId="lesson-playwright-day-11"
      currentLessonId="lesson-playwright-day-12"
      nextLessonId="lesson-playwright-day-13"
      nextLessonUrl="/courses/playwright-automation/day-13"
      pdfFileName="day-12-page-object-model-and-reusable-framework-design.pdf"
    />
  );
};
