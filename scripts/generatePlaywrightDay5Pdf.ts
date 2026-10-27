import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import {
  PLAYWRIGHT_DAY_5_DATA,
  PLAYWRIGHT_DAY_5_STARTER_CODE,
} from '../src/data/playwrightDay5Data';

const OUTPUT_DIR = path.resolve(process.cwd(), 'public/playwright-js');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Color Palette
const NAVY = '#0F172A';
const INDIGO = '#4F46E5';
const ACCENT = '#6366F1';
const DARK = '#1E293B';
const MUTED = '#475569';
const LIGHT_BG = '#F8FAFC';
const BORDER = '#CBD5E1';
const CODE_BG = '#1E293B';

function checkPageBudget(doc: any, requiredSpace = 80) {
  if (doc.y <= 60) return false;
  if (doc.y + requiredSpace > doc.page.height - 50) {
    doc.addPage();
    drawPageHeader(doc);
    return true;
  }
  return false;
}

function drawPageHeader(doc: any) {
  doc.rect(0, 0, doc.page.width, 18).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold')
    .text('ROOTACCESS  •  PLAYWRIGHT AUTOMATION WITH JAVASCRIPT + AI (DAY 5: ACTIONS & WEB-FIRST ASSERTIONS)', 40, 5, {
      width: doc.page.width - 80,
    });
  doc.y = 35;
}

function drawHeader(doc: any) {
  doc.rect(0, 0, doc.page.width, 24).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(8.5).font('Helvetica-Bold')
    .text('ROOTACCESS  |  CAREER-LEARNING PLATFORM  •  PLAYWRIGHT AUTOMATION WITH JAVASCRIPT + AI', 40, 7, {
      width: doc.page.width - 80,
      align: 'left',
    });

  doc.y = 40;

  // Day pill
  doc.rect(40, doc.y, 160, 18).fill(INDIGO);
  doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold')
    .text(`DAY 5 OF 20  •  ${PLAYWRIGHT_DAY_5_DATA.estimatedHours.toUpperCase()}`, 45, doc.y - 14, {
      width: 150,
      align: 'center',
    });

  doc.moveDown(0.8);

  // Day Title & Subtitle
  doc.fillColor(NAVY).fontSize(16).font('Helvetica-Bold').text(PLAYWRIGHT_DAY_5_DATA.lessonTitle, 40, doc.y);
  doc.moveDown(0.2);
  doc.fillColor(MUTED).fontSize(10).font('Helvetica').text(PLAYWRIGHT_DAY_5_DATA.subtitle, {
    lineGap: 2,
    width: 515,
  });

  doc.moveDown(0.6);
  doc.rect(40, doc.y, 515, 1.5).fill(INDIGO);
  doc.moveDown(0.8);
}

function renderCodeSnippet(doc: any, code: string, title?: string) {
  const lines = code.trim().split('\n');
  const height = Math.min(lines.length * 10 + 20, 220);
  checkPageBudget(doc, height + 15);

  if (title) {
    doc.fillColor(NAVY).fontSize(8.5).font('Helvetica-Bold').text(title, 40, doc.y);
    doc.moveDown(0.2);
  }

  const yBox = doc.y;
  doc.rect(40, yBox, 515, height).fill(CODE_BG);
  doc.font('Courier').fontSize(7).fillColor('#38BDF8');

  lines.forEach((line, idx) => {
    if (idx * 10 + 12 < height) {
      doc.text(line, 48, yBox + 8 + (idx * 10), { width: 500, lineBreak: false });
    }
  });

  doc.y = yBox + height + 8;
  doc.moveDown(0.4);
}

function generateDay5Pdf() {
  const filePath = path.join(OUTPUT_DIR, 'day-5-actions-assertions-forms.pdf');
  const doc = new PDFDocument({
    margin: 40,
    size: 'A4',
    bufferPages: true,
  });

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // PAGE 1: COVER / OVERVIEW
  drawHeader(doc);

  // Course Metadata Box
  doc.rect(40, doc.y, 515, 60).fillAndStroke(LIGHT_BG, BORDER);
  doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold').text('COURSE SPECIFICATIONS', 50, doc.y - 52);
  doc.font('Helvetica').fontSize(8.5).fillColor(MUTED);
  doc.text(`• Track: Playwright Automation with JavaScript + AI   • Level: ${PLAYWRIGHT_DAY_5_DATA.level}`, 50, doc.y + 4);
  doc.text(`• Focus: Actions, Form Controls, Auto-Retrying Assertions • Prerequisites: Days 1–4`, 50, doc.y + 3);
  doc.text(`• Pattern: AAA (Arrange-Act-Assert)                     • Test Runner: @playwright/test (.js)`, 50, doc.y + 3);

  doc.y = 175;
  doc.moveDown(0.5);

  // Learning Objectives
  doc.fillColor(NAVY).fontSize(11).font('Helvetica-Bold').text('Day 5 Learning Objectives', 40, doc.y);
  doc.moveDown(0.3);

  PLAYWRIGHT_DAY_5_DATA.learningObjectives.forEach((obj) => {
    checkPageBudget(doc, 25);
    doc.fillColor(INDIGO).fontSize(9).font('Helvetica-Bold').text('✓ ', 45, doc.y, { continued: true });
    doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(obj, { lineGap: 2, width: 490 });
    doc.moveDown(0.2);
  });

  doc.moveDown(0.8);

  // RENDER TOPICS 1 TO 7
  PLAYWRIGHT_DAY_5_DATA.topics.forEach((topic, tIdx) => {
    checkPageBudget(doc, 90);
    doc.rect(40, doc.y, 515, 20).fill(INDIGO);
    doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(`TOPIC ${tIdx + 1}: ${topic.title.toUpperCase()}`, 48, doc.y - 15);
    doc.moveDown(0.8);

    const paragraphs = topic.explanation.split('\n\n');
    paragraphs.forEach((para) => {
      checkPageBudget(doc, 35);
      if (para.startsWith('### ')) {
        doc.moveDown(0.3);
        doc.fillColor(NAVY).fontSize(9.5).font('Helvetica-Bold').text(para.replace('### ', ''), 40, doc.y);
        doc.moveDown(0.2);
      } else {
        doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(para, { width: 515, lineGap: 2 });
        doc.moveDown(0.4);
      }
    });

    // Topic Examples
    if (topic.examples && topic.examples.length > 0) {
      topic.examples.forEach((example) => {
        if (example.codeSnippet) {
          renderCodeSnippet(doc, example.codeSnippet, `${example.title} (${example.description})`);
        }
        if (example.expectedOutput) {
          checkPageBudget(doc, 25);
          doc.fillColor(MUTED).fontSize(7.5).font('Helvetica-Oblique').text(`Expected Output: ${example.expectedOutput}`, 45, doc.y);
          doc.moveDown(0.3);
        }
      });
    }

    doc.moveDown(0.5);
  });

  // PRACTICAL ASSIGNMENT SPECIFICATION
  checkPageBudget(doc, 120);
  doc.rect(40, doc.y, 515, 20).fill(DARK);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text('PRACTICAL ASSIGNMENT: COMPLEX REGISTRATION FORM TEST SUITE', 48, doc.y - 15);
  doc.moveDown(0.8);

  doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(
    'Scenario: Automate an enterprise registration portal. Fill inputs with locator.fill(), choose select dropdown options, toggle radio buttons and checkboxes, apply at least 4 auto-retrying web-first assertions, configure a custom timeout, test negative error validations, and structure with the AAA pattern.\n\nTask: Submit tests/day5-registration-form.spec.js with complete terminal logs and technical actionability explanations.',
    { width: 515, lineGap: 2 }
  );
  doc.moveDown(0.5);

  // Starter Code
  renderCodeSnippet(doc, PLAYWRIGHT_DAY_5_STARTER_CODE, 'Assignment Starter Code (tests/day5-registration-form.spec.js)');

  // 10 Rubric Criteria
  checkPageBudget(doc, 100);
  doc.fillColor(NAVY).fontSize(9.5).font('Helvetica-Bold').text('10 Rubric Requirements for Day 5 Assignment:', 40, doc.y);
  doc.moveDown(0.3);

  const reqs = [
    '1. Pure JavaScript structure using test and expect from @playwright/test',
    '2. Fills multiple text inputs using locator.fill()',
    '3. Selects dropdown options via locator.selectOption()',
    '4. Selects radio buttons and checks/unchecks checkboxes using locator.check() / click()',
    '5. Uses at least 4 web-first assertions (toBeVisible, toHaveValue, toBeChecked, etc.)',
    '6. Includes custom assertion timeout { timeout: 8000 } for delayed feedback',
    '7. Validates negative state (.not.toBeVisible or error message banner)',
    '8. Cleanly structured following AAA (Arrange-Act-Assert) pattern',
    '9. Complete terminal test execution log showing passed status',
    '10. Comprehensive technical explanation of actionability checks and web-first design',
  ];

  reqs.forEach((r) => {
    checkPageBudget(doc, 18);
    doc.fillColor(DARK).fontSize(8).font('Helvetica').text(r, 45, doc.y, { width: 505 });
    doc.moveDown(0.15);
  });

  doc.moveDown(0.8);

  // INTERVIEW PREPARATION BANK
  checkPageBudget(doc, 100);
  doc.rect(40, doc.y, 515, 20).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text('DAY 5 INTERVIEW PREPARATION QUESTION BANK', 48, doc.y - 15);
  doc.moveDown(0.8);

  PLAYWRIGHT_DAY_5_DATA.interviewQuestions.forEach((q) => {
    checkPageBudget(doc, 65);
    doc.fillColor(INDIGO).fontSize(8.5).font('Helvetica-Bold').text(`Q${q.questionNumber}. ${q.question}`, 40, doc.y);
    doc.moveDown(0.2);
    doc.fillColor(MUTED).fontSize(7.5).font('Helvetica-Bold').text(`[Difficulty: ${q.difficulty}] Evaluation Focus: ${q.assessmentFocus}`, 40, doc.y);
    doc.moveDown(0.2);
    doc.fillColor(DARK).fontSize(8).font('Helvetica').text(`Suggested Answer: ${q.modelAnswer}`, { width: 515, lineGap: 2 });
    if (q.followUpQuestion) {
      doc.moveDown(0.15);
      doc.fillColor(ACCENT).fontSize(7.5).font('Helvetica-Oblique').text(`Follow-Up Question: "${q.followUpQuestion}"`, 40, doc.y);
    }
    doc.moveDown(0.5);
  });

  // QUIZ OVERVIEW
  checkPageBudget(doc, 90);
  doc.rect(40, doc.y, 515, 20).fill(INDIGO);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text('DAY 5 QUIZ TOPICS & KEY CONCEPTS SUMMARY', 48, doc.y - 15);
  doc.moveDown(0.8);

  PLAYWRIGHT_DAY_5_DATA.quizQuestions.forEach((q, qIdx) => {
    checkPageBudget(doc, 45);
    doc.fillColor(NAVY).fontSize(8).font('Helvetica-Bold').text(`${qIdx + 1}. ${q.question}`, 40, doc.y);
    doc.moveDown(0.15);
    doc.fillColor(MUTED).fontSize(7.5).font('Helvetica').text(`Key Concept: ${q.explanation}`, { width: 515, lineGap: 1.5 });
    doc.moveDown(0.35);
  });

  // Number all pages
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const oldBottom = doc.page.margins.bottom;
    const oldTop = doc.page.margins.top;
    doc.page.margins.bottom = 0;
    doc.page.margins.top = 0;

    doc.rect(40, doc.page.height - 30, doc.page.width - 80, 0.5).fill(BORDER);
    doc.fillColor(MUTED).fontSize(8).font('Helvetica')
      .text('RootAccess Platform • Playwright Automation with JavaScript + AI — Day 5 Notes', 40, doc.page.height - 22, {
        width: 320,
        align: 'left',
        lineBreak: false,
      });
    doc.text(`Page ${i + 1} of ${range.count}`, doc.page.width - 140, doc.page.height - 22, {
      width: 100,
      align: 'right',
      lineBreak: false,
    });

    doc.page.margins.bottom = oldBottom;
    doc.page.margins.top = oldTop;
  }

  doc.end();

  return new Promise<void>((resolve, reject) => {
    writeStream.on('finish', () => {
      console.log(`Generated: ${filePath} (${range.count} pages)`);
      resolve();
    });
    writeStream.on('error', reject);
  });
}

generateDay5Pdf().catch((err) => {
  console.error('Error generating Playwright Day 5 PDF:', err);
  process.exit(1);
});
