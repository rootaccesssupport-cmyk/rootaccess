import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

import { PLAYWRIGHT_DAY_9_DATA, PLAYWRIGHT_DAY_9_STARTER_CODE } from '../src/data/playwrightDay9Data';
import { PLAYWRIGHT_DAY_10_DATA, PLAYWRIGHT_DAY_10_STARTER_CODE } from '../src/data/playwrightDay10Data';
import { PLAYWRIGHT_DAY_11_DATA, PLAYWRIGHT_DAY_11_STARTER_CODE } from '../src/data/playwrightDay11Data';
import { PLAYWRIGHT_DAY_12_DATA, PLAYWRIGHT_DAY_12_STARTER_CODE } from '../src/data/playwrightDay12Data';
import { PLAYWRIGHT_DAY_13_DATA, PLAYWRIGHT_DAY_13_STARTER_CODE } from '../src/data/playwrightDay13Data';
import { PLAYWRIGHT_DAY_14_DATA, PLAYWRIGHT_DAY_14_STARTER_CODE } from '../src/data/playwrightDay14Data';
import { PLAYWRIGHT_DAY_15_DATA, PLAYWRIGHT_DAY_15_STARTER_CODE } from '../src/data/playwrightDay15Data';
import { PLAYWRIGHT_DAY_16_DATA, PLAYWRIGHT_DAY_16_STARTER_CODE } from '../src/data/playwrightDay16Data';
import { PLAYWRIGHT_DAY_17_DATA, PLAYWRIGHT_DAY_17_STARTER_CODE } from '../src/data/playwrightDay17Data';
import { PLAYWRIGHT_DAY_18_DATA, PLAYWRIGHT_DAY_18_STARTER_CODE } from '../src/data/playwrightDay18Data';
import { PLAYWRIGHT_DAY_19_DATA, PLAYWRIGHT_DAY_19_STARTER_CODE } from '../src/data/playwrightDay19Data';
import { PLAYWRIGHT_DAY_20_DATA, PLAYWRIGHT_DAY_20_STARTER_CODE } from '../src/data/playwrightDay20Data';
import type { PlaywrightDayUnit } from '../src/types/playwrightCourse';

const OUTPUT_DIR = path.resolve(process.cwd(), 'public/playwright-js');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Brand Colors
const NAVY = '#0F172A';
const INDIGO = '#4F46E5';
const ACCENT = '#6366F1';
const DARK = '#1E293B';
const MUTED = '#475569';
const LIGHT_BG = '#F8FAFC';
const BORDER = '#CBD5E1';
const CODE_BG = '#1E293B';

interface DayConfig {
  data: PlaywrightDayUnit;
  starterCode: string;
  pdfFileName: string;
}

const DAYS_CONFIG: DayConfig[] = [
  {
    data: PLAYWRIGHT_DAY_9_DATA,
    starterCode: PLAYWRIGHT_DAY_9_STARTER_CODE,
    pdfFileName: 'day-9-data-driven-testing-and-test-parameterisation.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_10_DATA,
    starterCode: PLAYWRIGHT_DAY_10_STARTER_CODE,
    pdfFileName: 'day-10-debugging-reporting-and-failure-analysis.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_11_DATA,
    starterCode: PLAYWRIGHT_DAY_11_STARTER_CODE,
    pdfFileName: 'day-11-authentication-sessions-and-test-isolation.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_12_DATA,
    starterCode: PLAYWRIGHT_DAY_12_STARTER_CODE,
    pdfFileName: 'day-12-page-object-model-and-reusable-framework-design.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_13_DATA,
    starterCode: PLAYWRIGHT_DAY_13_STARTER_CODE,
    pdfFileName: 'day-13-api-testing-with-playwright.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_14_DATA,
    starterCode: PLAYWRIGHT_DAY_14_STARTER_CODE,
    pdfFileName: 'day-14-git-test-configuration-and-cross-browser-testing.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_15_DATA,
    starterCode: PLAYWRIGHT_DAY_15_STARTER_CODE,
    pdfFileName: 'day-15-ci-cd-integration-with-github-actions.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_16_DATA,
    starterCode: PLAYWRIGHT_DAY_16_STARTER_CODE,
    pdfFileName: 'day-16-ai-assisted-test-generation-and-locator-suggestions.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_17_DATA,
    starterCode: PLAYWRIGHT_DAY_17_STARTER_CODE,
    pdfFileName: 'day-17-ai-assisted-debugging-and-flaky-test-analysis.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_18_DATA,
    starterCode: PLAYWRIGHT_DAY_18_STARTER_CODE,
    pdfFileName: 'day-18-ai-assisted-test-planning-edge-cases-and-test-data.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_19_DATA,
    starterCode: PLAYWRIGHT_DAY_19_STARTER_CODE,
    pdfFileName: 'day-19-ai-assisted-framework-improvement-and-playwright-mcp.pdf',
  },
  {
    data: PLAYWRIGHT_DAY_20_DATA,
    starterCode: PLAYWRIGHT_DAY_20_STARTER_CODE,
    pdfFileName: 'day-20-final-project-comprehensive-assessment-and-certification.pdf',
  },
];

function drawPageHeader(doc: any, dayData: PlaywrightDayUnit) {
  doc.rect(0, 0, doc.page.width, 18).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold')
    .text(`ROOTACCESS  •  PLAYWRIGHT AUTOMATION WITH JAVASCRIPT + AI (DAY ${dayData.dayNumber}: ${dayData.lessonTitle.toUpperCase()})`, 40, 5, {
      width: doc.page.width - 80,
    });
  doc.y = 35;
}

function checkPageBudget(doc: any, requiredSpace = 80, dayData?: PlaywrightDayUnit) {
  if (doc.y <= 60) return false;
  if (doc.y + requiredSpace > doc.page.height - 50) {
    doc.addPage();
    if (dayData) {
      drawPageHeader(doc, dayData);
    }
    return true;
  }
  return false;
}

function drawHeader(doc: any, dayData: PlaywrightDayUnit) {
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
    .text(`DAY ${dayData.dayNumber} OF 20  •  ${dayData.estimatedHours.toUpperCase()}`, 45, doc.y - 14, {
      width: 150,
      align: 'center',
    });

  doc.moveDown(0.8);

  // Day Title & Subtitle
  doc.fillColor(NAVY).fontSize(16).font('Helvetica-Bold').text(dayData.lessonTitle, 40, doc.y);
  doc.moveDown(0.2);
  doc.fillColor(MUTED).fontSize(10).font('Helvetica').text(dayData.subtitle, {
    lineGap: 2,
    width: 515,
  });

  doc.moveDown(0.6);
  doc.rect(40, doc.y, 515, 1.5).fill(INDIGO);
  doc.moveDown(0.8);
}

function renderCodeSnippet(doc: any, code: string, title?: string, dayData?: PlaywrightDayUnit) {
  const lines = code.trim().split('\n');
  const height = Math.min(lines.length * 10 + 20, 220);
  checkPageBudget(doc, height + 15, dayData);

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

function generateSingleDayPdf(config: DayConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    const { data, starterCode, pdfFileName } = config;
    const filePath = path.join(OUTPUT_DIR, pdfFileName);
    const doc = new PDFDocument({
      margin: 40,
      size: 'A4',
      bufferPages: true,
    });

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    writeStream.on('finish', () => {
      console.log(`Generated: ${pdfFileName}`);
      resolve();
    });

    writeStream.on('error', (err) => {
      reject(err);
    });

    // PAGE 1: COVER / OVERVIEW
    drawHeader(doc, data);

    // Course Metadata Box
    doc.rect(40, doc.y, 515, 60).fillAndStroke(LIGHT_BG, BORDER);
    doc.fillColor(DARK).fontSize(9).font('Helvetica-Bold').text('LESSON SPECIFICATIONS & ROADMAP', 50, doc.y - 52);
    doc.font('Helvetica').fontSize(8.5).fillColor(MUTED);
    const prereqText = Array.isArray(data.prerequisites)
      ? (data.prerequisites as string[]).slice(0, 2).join('; ')
      : String(data.prerequisites || 'None');
    doc.text(`• Track: Playwright Automation with JavaScript + AI   • Level: ${data.level}`, 50, doc.y + 4);
    doc.text(`• Estimated Effort: ${data.estimatedHours}   • Prerequisites: ${prereqText.slice(0, 75)}`, 50, doc.y + 3);
    doc.text(`• Runtime: Pure Modern JavaScript (.js)   • Runner: @playwright/test`, 50, doc.y + 3);

    doc.y = 175;
    doc.moveDown(0.5);

    // Learning Objectives
    doc.fillColor(NAVY).fontSize(11).font('Helvetica-Bold').text(`Day ${data.dayNumber} Learning Objectives`, 40, doc.y);
    doc.moveDown(0.3);

    data.learningObjectives.forEach((obj) => {
      checkPageBudget(doc, 25, data);
      doc.fillColor(INDIGO).fontSize(9).font('Helvetica-Bold').text('✓ ', 45, doc.y, { continued: true });
      doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(obj, { lineGap: 2, width: 490 });
      doc.moveDown(0.2);
    });

    doc.moveDown(0.8);

    // TOPICS
    data.topics.forEach((topic, tIdx) => {
      checkPageBudget(doc, 90, data);
      doc.rect(40, doc.y, 515, 20).fill(INDIGO);
      doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(`TOPIC ${tIdx + 1}: ${topic.title.toUpperCase()}`, 48, doc.y - 15);
      doc.moveDown(0.8);

      const paragraphs = topic.explanation.split('\n\n');
      paragraphs.forEach((para) => {
        checkPageBudget(doc, 35, data);
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
            renderCodeSnippet(doc, example.codeSnippet, `${example.title} (${example.description})`, data);
          }
          if (example.expectedOutput) {
            checkPageBudget(doc, 25, data);
            doc.fillColor(MUTED).fontSize(7.5).font('Helvetica-Oblique').text(`Expected Output: ${example.expectedOutput}`, 45, doc.y);
            doc.moveDown(0.3);
          }
        });
      }

      doc.moveDown(0.5);
    });

    // PRACTICAL ASSIGNMENT
    checkPageBudget(doc, 120, data);
    doc.rect(40, doc.y, 515, 20).fill(DARK);
    doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(`PRACTICAL ASSIGNMENT & RUBRIC (DAY ${data.dayNumber})`, 48, doc.y - 15);
    doc.moveDown(0.8);

    doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(
      `Scenario & Objective: Implement end-to-end practical solution for Day ${data.dayNumber}. Deliver pure JavaScript (.js) tests satisfying all 10 rubric requirements.`,
      { width: 515, lineGap: 2 }
    );
    doc.moveDown(0.5);

    // Starter Code
    if (starterCode) {
      renderCodeSnippet(doc, starterCode, `Assignment Starter Code (Day ${data.dayNumber})`, data);
    }

    // INTERVIEW QUESTIONS
    checkPageBudget(doc, 100, data);
    doc.rect(40, doc.y, 515, 20).fill(NAVY);
    doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(`DAY ${data.dayNumber} INTERVIEW PREPARATION QUESTION BANK`, 48, doc.y - 15);
    doc.moveDown(0.8);

    data.interviewQuestions.forEach((q) => {
      checkPageBudget(doc, 65, data);
      doc.fillColor(INDIGO).fontSize(8.5).font('Helvetica-Bold').text(`Q${q.questionNumber}. ${q.question}`, 40, doc.y);
      doc.moveDown(0.2);
      doc.fillColor(MUTED).fontSize(7.5).font('Helvetica-Bold').text(`[Difficulty: ${q.difficulty}] Evaluation Focus: ${q.assessmentFocus}`, 40, doc.y);
      doc.moveDown(0.2);
      doc.fillColor(DARK).fontSize(8).font('Helvetica').text(`Model Answer: ${q.modelAnswer}`, { width: 515, lineGap: 2 });
      if (q.followUpQuestion) {
        doc.moveDown(0.15);
        doc.fillColor(ACCENT).fontSize(7.5).font('Helvetica-Oblique').text(`Follow-Up Question: "${q.followUpQuestion}"`, 40, doc.y);
      }
      doc.moveDown(0.5);
    });

    // QUIZ OVERVIEW
    checkPageBudget(doc, 90, data);
    doc.rect(40, doc.y, 515, 20).fill(INDIGO);
    doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(`DAY ${data.dayNumber} CHECKPOINT QUIZ & KEY CONCEPTS`, 48, doc.y - 15);
    doc.moveDown(0.8);

    data.quizQuestions.forEach((q, qIdx) => {
      checkPageBudget(doc, 45, data);
      doc.fillColor(NAVY).fontSize(8).font('Helvetica-Bold').text(`${qIdx + 1}. ${q.question}`, 40, doc.y);
      doc.moveDown(0.15);
      doc.fillColor(MUTED).fontSize(7.5).font('Helvetica').text(`Key Concept: ${q.explanation}`, { width: 515, lineGap: 1.5 });
      doc.moveDown(0.35);
    });

    // Footer on all pages
    const pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
      doc.switchToPage(i);
      doc.rect(0, doc.page.height - 20, doc.page.width, 20).fill(LIGHT_BG);
      doc.fillColor(MUTED).fontSize(7).font('Helvetica')
        .text(`RootAccess © 2026 • Playwright Automation with JavaScript + AI • Day ${data.dayNumber} Study Notes • Page ${i + 1} of ${pages.count}`, 40, doc.page.height - 14, {
          width: doc.page.width - 80,
          align: 'center',
        });
    }

    doc.end();
  });
}

async function run() {
  console.log(`Starting generation of Days 9–20 Playwright Study Notes PDFs...`);
  for (const dayConfig of DAYS_CONFIG) {
    await generateSingleDayPdf(dayConfig);
  }
  console.log(`Successfully generated all 12 PDFs for Days 9 to 20!`);
}

run().catch((err) => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
