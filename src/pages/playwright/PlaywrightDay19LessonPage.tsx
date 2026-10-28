import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_19_DATA,
  PLAYWRIGHT_DAY_19_STARTER_CODE,
  PLAYWRIGHT_DAY_19_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_19_STARTER_OUTPUT,
  evaluateDay19Assignment,
} from '../../data/playwrightDay19Data';

export const PlaywrightDay19LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={19}
      data={PLAYWRIGHT_DAY_19_DATA}
      starterCode={PLAYWRIGHT_DAY_19_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_19_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_19_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay19Assignment}
      prevLessonId="lesson-playwright-day-18"
      currentLessonId="lesson-playwright-day-19"
      nextLessonId="lesson-playwright-day-20"
      nextLessonUrl="/courses/playwright-automation/day-20"
      pdfFileName="day-19-ai-assisted-framework-improvement-and-playwright-mcp.pdf"
    />
  );
};
