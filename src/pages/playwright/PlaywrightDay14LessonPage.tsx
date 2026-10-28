import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_14_DATA,
  PLAYWRIGHT_DAY_14_STARTER_CODE,
  PLAYWRIGHT_DAY_14_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_14_STARTER_OUTPUT,
  evaluateDay14Assignment,
} from '../../data/playwrightDay14Data';

export const PlaywrightDay14LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={14}
      data={PLAYWRIGHT_DAY_14_DATA}
      starterCode={PLAYWRIGHT_DAY_14_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_14_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_14_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay14Assignment}
      prevLessonId="lesson-playwright-day-13"
      currentLessonId="lesson-playwright-day-14"
      nextLessonId="lesson-playwright-day-15"
      nextLessonUrl="/courses/playwright-automation/day-15"
      pdfFileName="day-14-git-test-configuration-and-cross-browser-testing.pdf"
    />
  );
};
