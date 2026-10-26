import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { PLAYWRIGHT_DAY_1_DATA, PLAYWRIGHT_DAY_1_STARTER_ROWS } from '../src/data/playwrightCurriculum';

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

function drawHeader(doc: typeof PDFDocument) {
  // Top brand banner
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
    .text(`DAY 1 OF 20  •  ${PLAYWRIGHT_DAY_1_DATA.estimatedHours.toUpperCase()}`, 45, doc.y - 14, {
      width: 150,
      align: 'center',
    });

  doc.moveDown(0.8);

  // Day Title & Subtitle
  doc.fillColor(NAVY).fontSize(16).font('Helvetica-Bold').text(PLAYWRIGHT_DAY_1_DATA.lessonTitle, 40, doc.y);
  doc.moveDown(0.2);
  doc.fillColor(MUTED).fontSize(10).font('Helvetica').text(PLAYWRIGHT_DAY_1_DATA.subtitle, {
    lineGap: 2,
    width: 515,
  });

  doc.moveDown(0.6);
  doc.rect(40, doc.y, 515, 1.5).fill(INDIGO);
  doc.moveDown(0.8);
}

function checkPageBudget(doc: typeof PDFDocument, requiredSpace = 80) {
  if (doc.y <= 60) return false;
  if (doc.y + requiredSpace > doc.page.height - 50) {
    doc.addPage();
    drawPageHeader(doc);
    return true;
  }
  return false;
}

function drawPageHeader(doc: typeof PDFDocument) {
  doc.rect(0, 0, doc.page.width, 18).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold')
    .text('ROOTACCESS  •  PLAYWRIGHT AUTOMATION WITH JAVASCRIPT + AI (DAY 1: FUNDAMENTALS)', 40, 5, {
      width: doc.page.width - 80,
    });
  doc.y = 35;
}

function generateDay1Pdf() {
  const filePath = path.join(OUTPUT_DIR, 'day-1-automation-testing-and-playwright-fundamentals.pdf');
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
  doc.text(`• Track: Modern Browser Automation (JavaScript)       • Level: ${PLAYWRIGHT_DAY_1_DATA.level}`, 50, doc.y + 4);
  doc.text(`• Target Audience: Beginners, Manual QA, Developers      • Prerequisites: ${PLAYWRIGHT_DAY_1_DATA.prerequisites}`, 50, doc.y + 3);
  doc.text(`• Core Tooling: Node.js, npm, VS Code, Playwright Test   • Language: JavaScript (Pure JS examples)`, 50, doc.y + 3);

  doc.y = 175;
  doc.moveDown(0.5);

  // Learning Objectives
  doc.fillColor(NAVY).fontSize(11).font('Helvetica-Bold').text('Day 1 Learning Objectives', 40, doc.y);
  doc.moveDown(0.3);

  PLAYWRIGHT_DAY_1_DATA.learningObjectives.forEach((obj) => {
    checkPageBudget(doc, 25);
    doc.fillColor(INDIGO).fontSize(9).font('Helvetica-Bold').text('✓ ', 45, doc.y, { continued: true });
    doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(obj, { lineGap: 2, width: 490 });
    doc.moveDown(0.2);
  });

  doc.moveDown(0.8);

  // TOPIC 1: INTRODUCTION TO AUTOMATION TESTING
  checkPageBudget(doc, 100);
  const topic1 = PLAYWRIGHT_DAY_1_DATA.topics[0];
  doc.rect(40, doc.y, 515, 20).fill(INDIGO);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(topic1.title.toUpperCase(), 48, doc.y - 15);
  doc.moveDown(0.8);

  const t1Lines = topic1.explanation.split('\n\n');
  t1Lines.forEach((para) => {
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

  // Manual vs Automated Comparison Table
  checkPageBudget(doc, 110);
  doc.fillColor(NAVY).fontSize(9.5).font('Helvetica-Bold').text('Manual Testing vs Automation Testing Comparison', 40, doc.y);
  doc.moveDown(0.4);

  const compData = [
    ['Dimension', 'Manual Testing', 'Automation Testing (Playwright)'],
    ['Speed & Execution', 'Human speed; minutes to hours per test', 'Machine speed; seconds per test suite'],
    ['Repetition Cost', 'High continuous human cost per run', 'Near-zero cost per run after script setup'],
    ['Regression Feasibility', 'Difficult to execute exhaustively each sprint', 'Runs hundreds of tests overnight or on git push'],
    ['Best Suited For', 'UX, visual appeal, exploratory tests', 'Repetitive flows, calculations, cross-browser'],
    ['Defect Detection', 'Finds unexpected edge cases & design flaws', 'Finds regressions and deviations from specs'],
  ];

  compData.forEach((row, rIdx) => {
    checkPageBudget(doc, 20);
    const yPos = doc.y;
    const isHead = rIdx === 0;
    doc.rect(40, yPos, 515, 18).fillAndStroke(isHead ? DARK : (rIdx % 2 === 0 ? LIGHT_BG : '#FFFFFF'), BORDER);
    doc.font(isHead ? 'Helvetica-Bold' : 'Helvetica').fontSize(isHead ? 8 : 7.5);
    doc.fillColor(isHead ? '#FFFFFF' : DARK);
    doc.text(row[0], 45, yPos + 4, { width: 120 });
    doc.text(row[1], 170, yPos + 4, { width: 170 });
    doc.text(row[2], 345, yPos + 4, { width: 200 });
    doc.y = yPos + 18;
  });
  doc.moveDown(0.8);

  // TOPIC 2: WHAT IS PLAYWRIGHT?
  checkPageBudget(doc, 100);
  const topic2 = PLAYWRIGHT_DAY_1_DATA.topics[1];
  doc.rect(40, doc.y, 515, 20).fill(INDIGO);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(topic2.title.toUpperCase(), 48, doc.y - 15);
  doc.moveDown(0.8);

  topic2.explanation.split('\n\n').forEach((para) => {
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

  // Playwright Architecture Diagram Box
  checkPageBudget(doc, 85);
  doc.rect(40, doc.y, 515, 75).fillAndStroke(LIGHT_BG, BORDER);
  doc.fillColor(NAVY).fontSize(9).font('Helvetica-Bold').text('PLAYWRIGHT END-TO-END AUTOMATION FLOW', 50, doc.y - 65);
  doc.font('Courier').fontSize(8).fillColor(DARK);
  doc.text('┌─────────────────┐       ┌──────────────────────┐       ┌─────────────────┐', 50, doc.y + 4);
  doc.text('│ Test Code (.js) │ ────> │ Playwright Runner    │ ────> │ Browser Engines │', 50, doc.y + 2);
  doc.text('└─────────────────┘       └──────────────────────┘       │ Chromium/FF/WebK│', 50, doc.y + 2);
  doc.text('                                                         └────────┬────────┘', 50, doc.y + 2);
  doc.text('                                                                  ▼', 50, doc.y + 2);
  doc.text('Results & Reports  <───── Assertions Verified   <───────  Web Application  ', 50, doc.y + 2);
  doc.y = doc.y + 15;
  doc.moveDown(0.8);

  // TOPIC 3: PLAYWRIGHT VS SELENIUM
  checkPageBudget(doc, 100);
  const topic3 = PLAYWRIGHT_DAY_1_DATA.topics[2];
  doc.rect(40, doc.y, 515, 20).fill(INDIGO);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(topic3.title.toUpperCase(), 48, doc.y - 15);
  doc.moveDown(0.8);

  topic3.explanation.split('\n\n').forEach((para) => {
    checkPageBudget(doc, 35);
    if (para.startsWith('### ')) {
      doc.moveDown(0.3);
      doc.fillColor(NAVY).fontSize(9.5).font('Helvetica-Bold').text(para.replace('### ', ''), 40, doc.y);
      doc.moveDown(0.2);
    } else if (!para.includes('| Feature / Dimension |')) {
      doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(para, { width: 515, lineGap: 2 });
      doc.moveDown(0.4);
    }
  });

  // Playwright vs Selenium Table
  checkPageBudget(doc, 120);
  const pvsData = [
    ['Dimension', 'Playwright', 'Selenium WebDriver'],
    ['Architecture', 'Direct WebSocket via Chrome DevTools Protocol', 'HTTP REST via intermediary drivers (ChromeDriver)'],
    ['Speed & Overhead', 'Fast; persistent single socket connection', 'Moderate; HTTP request/response for each command'],
    ['Waiting Strategy', 'Native auto-waiting on all actions', 'Requires manual WebDriverWait / ExpectedConditions'],
    ['Browser Engines', 'Bundled Chromium, Firefox, WebKit', 'External driver binaries for Chrome, Gecko, Safari'],
    ['Test Runner', 'Integrated @playwright/test runner', 'Requires 3rd-party runners (Mocha, Jest, JUnit)'],
    ['Ecosystem / Age', 'Modern, rapid adoption by Microsoft', '15+ years maturity, W3C official standard'],
  ];

  pvsData.forEach((row, rIdx) => {
    checkPageBudget(doc, 20);
    const yPos = doc.y;
    const isHead = rIdx === 0;
    doc.rect(40, yPos, 515, 18).fillAndStroke(isHead ? DARK : (rIdx % 2 === 0 ? LIGHT_BG : '#FFFFFF'), BORDER);
    doc.font(isHead ? 'Helvetica-Bold' : 'Helvetica').fontSize(isHead ? 8 : 7.5);
    doc.fillColor(isHead ? '#FFFFFF' : DARK);
    doc.text(row[0], 45, yPos + 4, { width: 110 });
    doc.text(row[1], 160, yPos + 4, { width: 175 });
    doc.text(row[2], 340, yPos + 4, { width: 210 });
    doc.y = yPos + 18;
  });
  doc.moveDown(0.8);

  // TOPIC 4: UNDERSTANDING AUTOMATION WORKFLOW
  checkPageBudget(doc, 100);
  const topic4 = PLAYWRIGHT_DAY_1_DATA.topics[3];
  doc.rect(40, doc.y, 515, 20).fill(INDIGO);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(topic4.title.toUpperCase(), 48, doc.y - 15);
  doc.moveDown(0.8);

  topic4.explanation.split('\n\n').forEach((para) => {
    checkPageBudget(doc, 35);
    if (para.startsWith('### ')) {
      doc.moveDown(0.3);
      doc.fillColor(NAVY).fontSize(9.5).font('Helvetica-Bold').text(para.replace('### ', ''), 40, doc.y);
      doc.moveDown(0.2);
    } else if (para.includes('```javascript')) {
      // Code snippet rendering
      checkPageBudget(doc, 140);
      const codeLines = [
        "// tests/login.spec.js (Pure JavaScript example)",
        "const { test, expect } = require('@playwright/test');",
        "",
        "test('User successfully logs in and views dashboard', async ({ page }) => {",
        "  await page.goto('http://localhost:5173/login');",
        "  await page.getByLabel('Email address').fill('alex.student@rootaccess.org');",
        "  await page.getByLabel('Password').fill('SecurePassword123!');",
        "  await page.getByRole('button', { name: 'Sign in' }).click();",
        "  await expect(page).toHaveURL(/.*app/);",
        "  await expect(page.getByRole('heading', { name: 'Student Dashboard' })).toBeVisible();",
        "});",
      ];
      doc.rect(40, doc.y, 515, 120).fill(CODE_BG);
      doc.font('Courier').fontSize(7.5).fillColor('#38BDF8');
      codeLines.forEach((l, idx) => {
        doc.text(l, 50, doc.y - 110 + (idx * 10));
      });
      doc.y = doc.y + 15;
      doc.moveDown(0.5);
    } else if (!para.includes('┌───────')) {
      doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(para, { width: 515, lineGap: 2 });
      doc.moveDown(0.4);
    }
  });

  // TOPIC 5: TOOLS & 15-DAY ROADMAP
  checkPageBudget(doc, 100);
  const topic5 = PLAYWRIGHT_DAY_1_DATA.topics[4];
  doc.rect(40, doc.y, 515, 20).fill(INDIGO);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text(topic5.title.toUpperCase(), 48, doc.y - 15);
  doc.moveDown(0.8);

  topic5.explanation.split('\n\n').forEach((para) => {
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

  // Compact 15-Day Roadmap Table
  checkPageBudget(doc, 160);
  doc.fillColor(NAVY).fontSize(9.5).font('Helvetica-Bold').text('15-Day Playwright Automation Course Roadmap', 40, doc.y);
  doc.moveDown(0.4);

  PLAYWRIGHT_DAY_1_DATA.roadmap.forEach((r, idx) => {
    checkPageBudget(doc, 16);
    const yPos = doc.y;
    doc.rect(40, yPos, 515, 14).fillAndStroke(r.isCurrent ? '#EEF2FF' : (idx % 2 === 0 ? LIGHT_BG : '#FFFFFF'), BORDER);
    doc.font(r.isCurrent ? 'Helvetica-Bold' : 'Helvetica').fontSize(7.5);
    doc.fillColor(r.isCurrent ? INDIGO : DARK);
    doc.text(`Day ${r.day}`, 45, yPos + 3, { width: 40 });
    doc.text(r.title, 90, yPos + 3, { width: 230 });
    doc.fillColor(MUTED).text(r.focus, 325, yPos + 3, { width: 225 });
    doc.y = yPos + 14;
  });
  doc.moveDown(0.8);

  // PRACTICAL ASSIGNMENT SPECIFICATION
  checkPageBudget(doc, 120);
  doc.rect(40, doc.y, 515, 20).fill(DARK);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text('PRACTICAL ASSIGNMENT: IDENTIFY AUTOMATION OPPORTUNITIES', 48, doc.y - 15);
  doc.moveDown(0.8);

  doc.fillColor(DARK).fontSize(8.5).font('Helvetica').text(
    'Scenario: You are a QA engineer testing an e-commerce website with Login, Product Search, Shopping Cart, Checkout, and Order Confirmation.\n\nTask: Populate at least 10 scenarios in your interactive workspace table, classify each as Automation Candidate or Manual/Exploratory, assign priority, state your rationale, identify 3 high-priority regression scenarios, and explain 1 risk of unreliable automated tests.',
    { width: 515, lineGap: 2 }
  );
  doc.moveDown(0.5);

  // Sample Starter Rows Table
  checkPageBudget(doc, 60);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(NAVY).text('Starter Example Scenarios (From Course Assignment Table):', 40, doc.y);
  doc.moveDown(0.3);

  PLAYWRIGHT_DAY_1_STARTER_ROWS.forEach((row, idx) => {
    checkPageBudget(doc, 26);
    const yPos = doc.y;
    doc.rect(40, yPos, 515, 24).fillAndStroke(idx % 2 === 0 ? LIGHT_BG : '#FFFFFF', BORDER);
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(INDIGO).text(row.scenarioId, 45, yPos + 3, { width: 65 });
    doc.font('Helvetica').fontSize(7.5).fillColor(DARK).text(`[${row.candidateType} - ${row.priority}] ${row.scenario}`, 115, yPos + 3, { width: 430 });
    doc.fillColor(MUTED).fontSize(7).text(`Reason: ${row.reason}`, 115, yPos + 13, { width: 430 });
    doc.y = yPos + 24;
  });
  doc.moveDown(0.8);

  // INTERVIEW PREPARATION BANK
  checkPageBudget(doc, 100);
  doc.rect(40, doc.y, 515, 20).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(10).font('Helvetica-Bold').text('DAY 1 INTERVIEW PREPARATION QUESTION BANK', 48, doc.y - 15);
  doc.moveDown(0.8);

  PLAYWRIGHT_DAY_1_DATA.interviewQuestions.forEach((q) => {
    checkPageBudget(doc, 60);
    doc.fillColor(INDIGO).fontSize(8.5).font('Helvetica-Bold').text(`Q${q.questionNumber}. ${q.question}`, 40, doc.y);
    doc.moveDown(0.2);
    doc.fillColor(MUTED).fontSize(7.5).font('Helvetica-Bold').text(`[Difficulty: ${q.difficulty}] What Interviewer Evaluates: ${q.assessmentFocus}`, 40, doc.y);
    doc.moveDown(0.2);
    doc.fillColor(DARK).fontSize(8).font('Helvetica').text(`Suggested Answer: ${q.modelAnswer}`, { width: 515, lineGap: 2 });
    if (q.followUpQuestion) {
      doc.moveDown(0.15);
      doc.fillColor(ACCENT).fontSize(7.5).font('Helvetica-Oblique').text(`Follow-Up Question: "${q.followUpQuestion}"`, 40, doc.y);
    }
    doc.moveDown(0.5);
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
      .text('RootAccess Platform • Playwright Automation with JavaScript + AI — Day 1 Notes', 40, doc.page.height - 22, {
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

generateDay1Pdf().catch((err) => {
  console.error('Error generating Playwright Day 1 PDF:', err);
  process.exit(1);
});
