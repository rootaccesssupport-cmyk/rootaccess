import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_18_DATA,
  PLAYWRIGHT_DAY_18_STARTER_CODE,
  PLAYWRIGHT_DAY_18_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_18_STARTER_OUTPUT,
  evaluateDay18Assignment,
} from '../../data/playwrightDay18Data';

export const PlaywrightDay18LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={18}
      data={PLAYWRIGHT_DAY_18_DATA}
      starterCode={PLAYWRIGHT_DAY_18_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_18_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_18_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay18Assignment}
      prevLessonId="lesson-playwright-day-17"
      currentLessonId="lesson-playwright-day-18"
      nextLessonId="lesson-playwright-day-19"
      nextLessonUrl="/courses/playwright-automation/day-19"
      pdfFileName="day-18-ai-assisted-test-planning-edge-cases-and-test-data.pdf"
    />
  );
};
