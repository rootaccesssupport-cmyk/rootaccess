import React from 'react';
import { PlaywrightGenericLessonPage } from './PlaywrightGenericLessonPage';
import {
  PLAYWRIGHT_DAY_20_DATA,
  PLAYWRIGHT_DAY_20_STARTER_CODE,
  PLAYWRIGHT_DAY_20_STARTER_EXPLANATION,
  PLAYWRIGHT_DAY_20_STARTER_OUTPUT,
  evaluateDay20Assignment,
} from '../../data/playwrightDay20Data';

export const PlaywrightDay20LessonPage: React.FC = () => {
  return (
    <PlaywrightGenericLessonPage
      dayNumber={20}
      data={PLAYWRIGHT_DAY_20_DATA}
      starterCode={PLAYWRIGHT_DAY_20_STARTER_CODE}
      starterExplanation={PLAYWRIGHT_DAY_20_STARTER_EXPLANATION}
      starterOutput={PLAYWRIGHT_DAY_20_STARTER_OUTPUT}
      evaluateAssignment={evaluateDay20Assignment}
      prevLessonId="lesson-playwright-day-19"
      currentLessonId="lesson-playwright-day-20"
      nextLessonId={null}
      nextLessonUrl={null}
      pdfFileName="day-20-final-project-comprehensive-assessment-and-certification.pdf"
    />
  );
};
