const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const OUTPUT_DIR = path.resolve(process.cwd(), 'downloads');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const PDF_PATH = path.join(OUTPUT_DIR, 'RootAccess_Playwright_Test_Plan_and_Format.pdf');

// Color Palette
const NAVY = '#0F172A';
const INDIGO = '#4F46E5';
const SKY = '#0284C7';
const DARK_SLATE = '#1E293B';
const MUTED_TEXT = '#475569';
const LIGHT_BG = '#F8FAFC';
const CARD_BG = '#F1F5F9';
const BORDER_COLOR = '#CBD5E1';
const GREEN = '#16A34A';
const RED = '#DC2626';

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 32, bottom: 40, left: 40, right: 40 },
  bufferPages: true,
  autoFirstPage: true,
});

const writeStream = fs.createWriteStream(PDF_PATH);
doc.pipe(writeStream);

function drawTopHeader() {
  doc.rect(0, 0, doc.page.width, 22).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold')
    .text('ROOTACCESS QA AUTOMATION  |  IEEE 829 TEST PLAN & TEST SPECIFICATION FORMAT', 40, 7, {
      width: doc.page.width - 80,
      align: 'left',
    });
  doc.y = 36;
}

function drawSectionHeading(number, title) {
  doc.moveDown(0.5);
  if (doc.y > 680) {
    doc.addPage();
    drawTopHeader();
  }
  
  const y = doc.y;
  doc.rect(40, y, 515, 20).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(9.5).font('Helvetica-Bold')
    .text(`${number}. ${title.toUpperCase()}`, 48, y + 5);
  doc.y = y + 26;
}

function drawSubHeading(title) {
  if (doc.y > 700) {
    doc.addPage();
    drawTopHeader();
  }
  doc.moveDown(0.25);
  doc.fillColor(INDIGO).fontSize(9.5).font('Helvetica-Bold').text(title, 40, doc.y);
  doc.moveDown(0.2);
}

function drawParagraph(text) {
  doc.fillColor(DARK_SLATE).fontSize(8.5).font('Helvetica').text(text, {
    width: 515,
    lineGap: 2.2,
  });
  doc.moveDown(0.25);
}

function drawBullet(title, desc) {
  if (doc.y > 715) {
    doc.addPage();
    drawTopHeader();
  }
  doc.fillColor(INDIGO).fontSize(8.5).font('Helvetica-Bold').text('• ', 45, doc.y, { continued: true });
  doc.fillColor(DARK_SLATE).font('Helvetica-Bold').text(`${title}: `, { continued: true });
  doc.font('Helvetica').text(desc, { width: 500, lineGap: 1.5 });
  doc.moveDown(0.2);
}

function drawTableRow(col1, col2, col3, col4, isHeader = false) {
  if (doc.y > 720) {
    doc.addPage();
    drawTopHeader();
  }
  const y = doc.y;
  const h = 17;
  const colWidths = [90, 120, 185, 120];

  if (isHeader) {
    doc.rect(40, y, 515, h).fill(INDIGO);
    doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold');
  } else {
    doc.rect(40, y, 515, h).fill(y % 34 === 0 ? LIGHT_BG : '#FFFFFF');
    doc.rect(40, y, 515, h).stroke(BORDER_COLOR);
    doc.fillColor(DARK_SLATE).fontSize(7.5).font('Helvetica');
  }

  doc.text(col1, 44, y + 4.5, { width: colWidths[0] - 6, truncate: true });
  doc.text(col2, 44 + colWidths[0], y + 4.5, { width: colWidths[1] - 6, truncate: true });
  doc.text(col3, 44 + colWidths[0] + colWidths[1], y + 4.5, { width: colWidths[2] - 6, truncate: true });
  doc.text(col4, 44 + colWidths[0] + colWidths[1] + colWidths[2], y + 4.5, { width: colWidths[3] - 6, truncate: true });
  doc.y = y + h;
}

function drawDetailRow(label, value, height = 16) {
  if (doc.y + height > 760) {
    doc.addPage();
    drawTopHeader();
  }
  const y = doc.y;
  doc.rect(40, y, 125, height).fill(LIGHT_BG);
  doc.rect(40, y, 125, height).stroke(BORDER_COLOR);
  doc.rect(165, y, 390, height).fill('#FFFFFF');
  doc.rect(165, y, 390, height).stroke(BORDER_COLOR);

  doc.fillColor(NAVY).fontSize(7.5).font('Helvetica-Bold').text(label, 45, y + 4);
  doc.fillColor(DARK_SLATE).fontSize(7.5).font('Helvetica').text(value, 171, y + 4, { width: 375, lineGap: 1.5 });
  doc.y = y + height;
}

// -------------------------------------------------------------
// PAGE 1: TITLE & DOCUMENT CONTROL & SCOPE
// -------------------------------------------------------------
drawTopHeader();

doc.moveDown(0.8);
doc.rect(40, doc.y, 515, 52).fill(LIGHT_BG);
doc.rect(40, doc.y, 515, 52).stroke(INDIGO);
doc.fillColor(INDIGO).fontSize(14).font('Helvetica-Bold')
  .text('ROOTACCESS PLATFORM TEST PLAN & TEST SPECIFICATION', 50, doc.y - 44, { width: 495 });
doc.fillColor(MUTED_TEXT).fontSize(8.5).font('Helvetica')
  .text('Industry-Standard Automated E2E Framework & QA Artifact Formats (IEEE 829 / ISO 29119)', 50, doc.y - 26);

doc.y = 100;

// Metadata Card
doc.rect(40, doc.y, 515, 58).fill(CARD_BG);
doc.rect(40, doc.y, 515, 58).stroke(BORDER_COLOR);

const metaY = doc.y + 6;
doc.fillColor(DARK_SLATE).fontSize(8).font('Helvetica-Bold').text('Project Target: ', 48, metaY);
doc.font('Helvetica').text('RootAccess Live Platform (https://rootaccess.co.in)', 135, metaY);

doc.font('Helvetica-Bold').text('Test Framework: ', 48, metaY + 12);
doc.font('Helvetica').text('Playwright Test (JavaScript, Page Object Model, ES Modules)', 135, metaY + 12);

doc.font('Helvetica-Bold').text('Document Type: ', 48, metaY + 24);
doc.font('Helvetica').text('Master Test Plan (MTP) + Standard Test Case & Defect Formats', 135, metaY + 24);

doc.font('Helvetica-Bold').text('Version & Date: ', 48, metaY + 36);
doc.font('Helvetica').text('Version 1.0  |  October 2026  |  Status: APPROVED & ACTIVE', 135, metaY + 36);

doc.y = 170;

// SECTION 1: OBJECTIVES & EXECUTIVE SUMMARY
drawSectionHeading('1', 'Executive Summary & Test Objectives');
drawParagraph('The primary objective of this Test Plan is to define the testing strategy, architecture, scope, test case formats, defect lifecycle standards, and verification procedures for the RootAccess practical engineering learning platform.');
drawBullet('Defect Prevention', 'Identify regressions, UI defects, and broken user journeys early in the development lifecycle using automated smoke and regression test suites.');
drawBullet('Industry-Standard Design', 'Implement a clean, beginner-friendly but production-grade Page Object Model (POM) using modern Playwright APIs (web-first assertions, auto-waiting, accessible locators).');
drawBullet('Cross-Browser & CI/CD Readiness', 'Enable seamless test execution across local workstations and headless CI/CD pipelines (GitHub Actions), generating HTML reports, traces, and screenshots.');

// SECTION 2: SCOPE OF TESTING
drawSectionHeading('2', 'Test Scope: In-Scope vs Out-of-Scope');
drawSubHeading('2.1 In-Scope Modules & Features:');
drawBullet('Homepage (Public)', 'Brand hero, navigation links, course track catalog cards, interactive FAQ accordions, marketing callouts, and footer links.');
drawBullet('Authentication & Security', 'Sign-in form validation (empty fields, invalid credentials), password visibility toggles, and protected route access control guards.');
drawBullet('Course Curriculum Explorer', 'Course syllabus overview, milestone trackers, learning outcomes, and syllabus PDF download actions.');
drawBullet('Lesson Viewer & Interactions', 'Lesson content rendering, code snippets copy actions, practical QA execution checklist items, and previous/next navigation.');
drawBullet('Certification Quizzes', 'Assessment loading, question & option rendering, single-best answer selection, score calculation (75% passing threshold), and technical explanation reviews.');
drawBullet('Learner Progress & Persistence', 'Overall completion percentages, milestone counters, and local storage state persistence.');

drawSubHeading('2.2 Out-of-Scope:');
drawBullet('Destructive Operations', 'Dropping backend database tables or modifying production student records.');
drawBullet('Third-Party Email Handshake', 'Direct verification of external email delivery services (handled via mock tokens/stubs in staging).');

// -------------------------------------------------------------
// PAGE 2: TEST STRATEGY & POM ARCHITECTURE
// -------------------------------------------------------------
doc.addPage();
drawTopHeader();

drawSectionHeading('3', 'Test Strategy & Framework Architecture');
drawParagraph('RootAccess employs a lightweight, professional Page Object Model (POM) architecture using pure JavaScript (ES Modules). Tests are strictly decoupled from DOM locators to maximize maintainability.');

// Structure Box
doc.rect(40, doc.y, 515, 78).fill(LIGHT_BG);
doc.rect(40, doc.y, 515, 78).stroke(BORDER_COLOR);
const codeY = doc.y + 6;
doc.fillColor(INDIGO).fontSize(7.5).font('Courier-Bold');
doc.text('PROJECT TEST REPOSITORY STRUCTURE:', 50, codeY);
doc.fillColor(DARK_SLATE).font('Courier');
doc.text('|-- pages/                 # Reusable Page Objects (HomePage.js, LoginPage.js, CoursesPage.js)', 50, codeY + 12);
doc.text('|-- tests/                 # Feature Test Suites (home.spec.js, login.spec.js, courses.spec.js, ...)', 50, codeY + 24);
doc.text('|-- test-data/             # Reusable non-sensitive fixtures & data (testData.js)', 50, codeY + 36);
doc.text('|-- playwright.config.js   # Central Playwright runner & browser configuration', 50, codeY + 48);
doc.text('|-- playwright-report/     # Self-contained interactive HTML test reports', 50, codeY + 60);
doc.y = codeY + 76;

drawSubHeading('3.1 Playwright Locator Precedence (User-Centric & Accessible):');
drawBullet('Priority 1', 'getByRole() - Tests interactive accessibility semantics (e.g. button, heading, link, alert)');
drawBullet('Priority 2', 'getByLabel() - Binds to form controls through visible labels');
drawBullet('Priority 3', 'getByPlaceholder() - Targets input fields with explicit placeholders');
drawBullet('Priority 4', 'getByText() - Asserts visible copy, headings, and descriptions');
drawBullet('Anti-Pattern', 'Avoid fragile XPaths, deep CSS chains (#app > div > div:nth-child(3)), or arbitrary timeouts.');

drawSubHeading('3.2 Auto-Waiting & Web-First Assertions:');
drawParagraph('All tests leverage web-first assertions (e.g. `await expect(locator).toBeVisible()`). Playwright automatically polls the DOM until elements become visible, attached, and stable, completely eliminating hardcoded `page.waitForTimeout()` flakiness.');

// SECTION 4: TEST ENVIRONMENT & CONFIGURATION
drawSectionHeading('4', 'Test Environment & Run Configuration');
drawTableRow('Parameter', 'Local Development', 'CI / GitHub Actions', 'Notes', true);
drawTableRow('Target Base URL', 'http://localhost:5173', 'https://www.rootaccess.co.in', 'Configured via BASE_URL');
drawTableRow('Browser Engine', 'Chromium (Desktop)', 'Headless Chromium', 'Expandable to WebKit/Firefox');
drawTableRow('Parallel Workers', '4 Local Workers', '1-2 CI Workers', 'Safe parallel execution');
drawTableRow('Default Timeout', '30,000 ms', '30,000 ms', 'Global test execution timeout');
drawTableRow('Expect Timeout', '5,000 ms', '5,000 ms', 'Assertion auto-wait timeout');
drawTableRow('Failure Artifacts', 'Trace + Screenshot', 'Full Trace + Screenshot + Video', 'Retained on failure');

// -------------------------------------------------------------
// PAGE 3: STANDARD TEST CASE FORMAT & EXAMPLES
// -------------------------------------------------------------
doc.addPage();
drawTopHeader();

drawSectionHeading('5', 'Industry-Standard Test Case Format & Specification');
drawParagraph('Below is the standard test case specification format adopted for RootAccess quality assurance, aligned with IEEE 829 and enterprise ALM tools (e.g., Jira, TestRail, Zephyr).');

// Test Case 1 Table
doc.moveDown(0.2);
doc.rect(40, doc.y, 515, 15).fill(INDIGO);
doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold').text('TEST CASE SPECIFICATION: TC-HOME-001 (HOMEPAGE HERO & NAVIGATION)', 48, doc.y + 3.5);
doc.y += 16;

drawDetailRow('Test Case ID', 'TC-HOME-001');
drawDetailRow('Module / Feature', 'Homepage  |  Marketing & Navigation');
drawDetailRow('Test Priority', 'P1 - High  |  Type: Functional / Smoke');
drawDetailRow('Pre-conditions', 'Browser is launched; base URL is accessible and responsive.');
drawDetailRow('Test Data', 'N/A (Public marketing landing page)');
drawDetailRow('Execution Steps', '1. Navigate to "/"  -> Verify RootAccess logo is visible\n2. Verify H1 headline renders with brand text\n3. Verify navigation links: Career Tracks, FAQ, Log in, Get Started', 24);
drawDetailRow('Expected Result', 'Homepage renders in under 2s; all navbar links are clickable; hero headline matches brand message.');
drawDetailRow('Actual Result', 'Verified Passed via tests/home.spec.js (Automated Playwright test execution).');
drawDetailRow('Automated Status', 'PASS  (Execution duration: 7.6s, automated)');

// Test Case 2 Table
doc.moveDown(0.4);
doc.rect(40, doc.y, 515, 15).fill(INDIGO);
doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold').text('TEST CASE SPECIFICATION: TC-AUTH-001 (REQUIRED FIELD VALIDATION)', 48, doc.y + 3.5);
doc.y += 16;

drawDetailRow('Test Case ID', 'TC-AUTH-001');
drawDetailRow('Module / Feature', 'Authentication  |  Sign In Page');
drawDetailRow('Test Priority', 'P1 - High  |  Type: Negative / Boundary');
drawDetailRow('Pre-conditions', 'User is logged out; session storage has no active auth token.');
drawDetailRow('Test Data', 'Empty email (""), empty password ("")');
drawDetailRow('Execution Steps', '1. Navigate to "/login"\n2. Leave email and password empty\n3. Click "Sign In" button\n4. Verify validation alert message appears', 26);
drawDetailRow('Expected Result', 'Alert displays "Please enter your email address." with role="alert"; no network call sent.');
drawDetailRow('Actual Result', 'Form prevents submission and displays accessible error banner.');
drawDetailRow('Automated Status', 'Automated in login.spec.js');

// Test Case 3 Table
doc.moveDown(0.4);
doc.rect(40, doc.y, 515, 15).fill(INDIGO);
doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold').text('TEST CASE SPECIFICATION: TC-QUIZ-001 (ASSESSMENT SCORING & THRESHOLD)', 48, doc.y + 3.5);
doc.y += 16;

drawDetailRow('Test Case ID', 'TC-QUIZ-001');
drawDetailRow('Module / Feature', 'Assessment Engine  |  Certification Quiz');
drawDetailRow('Test Priority', 'P2 - Medium  |  Type: Functional / Business Logic');
drawDetailRow('Pre-conditions', 'User is enrolled; navigated to "/courses/manual-qa-fundamentals/quiz".');
drawDetailRow('Test Data', 'Questions 1–4 correct answers: [1, 2, 1, 0]');
drawDetailRow('Execution Steps', '1. Select option B for Q1, option C for Q2, option B for Q3, option A for Q4\n2. Click "Submit & View Results"\n3. Verify score banner shows 4/4 (100%)\n4. Verify "Congratulations! You Passed!" banner renders', 28);
drawDetailRow('Expected Result', 'Score calculated as 100%; >= 75% benchmark triggers passing banner and unlocks certificate.');
drawDetailRow('Actual Result', 'Score calculated deterministically; results saved in progress context.');
drawDetailRow('Automated Status', 'Automated in quiz.spec.js');

// -------------------------------------------------------------
// PAGE 4: STANDARD DEFECT REPORT FORMAT & CRITERIA
// -------------------------------------------------------------
doc.addPage();
drawTopHeader();

drawSectionHeading('6', 'Industry-Standard Defect / Bug Report Format (Jira Standard)');
drawParagraph('When an automated or exploratory test detects unexpected application behavior, defect reports must follow this standardized template to ensure rapid triage, reproducibility, and resolution.');

doc.rect(40, doc.y, 515, 15).fill(RED);
doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold').text('DEFECT REPORT TEMPLATE (JIRA / BUGZILLA COMPATIBLE)', 48, doc.y + 3.5);
doc.y += 16;

drawDetailRow('Defect ID', 'BUG-ROOT-[ID] (e.g. BUG-ROOT-042)');
drawDetailRow('Defect Title', '[Module] Short summary of behavior under specific condition');
drawDetailRow('Severity vs Priority', 'Severity: Critical | Major | Moderate | Minor\nPriority: P1 (Blocker) | P2 (High) | P3 (Medium) | P4 (Low)', 22);
drawDetailRow('Environment', 'OS: macOS Sonoma 14.x  |  Browser: Chromium 133.0  |  URL: http://localhost:5173');
drawDetailRow('Pre-conditions', 'Exact account state, local storage keys, or prerequisites needed');
drawDetailRow('Steps to Reproduce', '1. Step one (Action)\n2. Step two (Input/Navigation)\n3. Step three (Trigger action)', 22);
drawDetailRow('Expected Result', 'What the application should have done according to specifications');
drawDetailRow('Actual Result', 'What actually occurred (including error codes, blank screens, or UI bugs)');
drawDetailRow('Evidence / Artifacts', 'Playwright Trace (.zip), Failure Screenshot (.png), Video (.webm), Console Logs');
drawDetailRow('Root Cause Analysis', 'Identified component / hook / route causing the defect (filled by dev/QA)');

// SECTION 7: ENTRY, EXIT & SUSPENSION CRITERIA
drawSectionHeading('7', 'Entry, Exit & Suspension Criteria');
drawSubHeading('7.1 Test Entry Criteria:');
drawBullet('Code Freeze & Build', 'Vite build compiles cleanly (`npm run build` exits 0 with zero TypeScript errors).');
drawBullet('Environment Health', 'Target URL responds with HTTP 200; database connectivity verified via `npm run db:verify`.');

drawSubHeading('7.2 Test Exit Criteria:');
drawBullet('100% Smoke Pass Rate', 'All core P1 smoke tests (home, login, course exploration) pass without failure.');
drawBullet('Zero Blocker Defects', 'No open Critical/P1 defects blocking main student user journeys.');
drawBullet('Report Publication', 'HTML test execution report archived with timestamped test execution summary.');

drawSubHeading('7.3 Test Suspension & Resumption Criteria:');
drawBullet('Suspension', 'Triggered if local dev server fails to launch or database authentication service is unreachable.');
drawBullet('Resumption', 'Testing resumes once service is restored and database health check passes.');

// SECTION 8: CLI EXECUTION COMMANDS
drawSectionHeading('8', 'QA Engineer Command Reference');
drawBullet('Run Full Suite', '`npm test`  (Executes all Playwright tests headlessly)');
drawBullet('Run Headed Mode', '`npm run test:headed`  (Executes tests with visible Chromium browser)');
drawBullet('Interactive UI Mode', '`npm run test:ui`  (Opens time-travel debugging & locator picker)');
drawBullet('View HTML Report', '`npm run test:report`  (Opens self-contained HTML test report in browser)');
drawBullet('Inspect Unit Tests', '`npm run test:unit`  (Runs isolated Vitest unit test suite)');

// -------------------------------------------------------------
// FOOTER ON ALL PAGES
// -------------------------------------------------------------
const totalPages = doc.bufferedPageRange().count;
for (let i = 0; i < totalPages; i++) {
  doc.switchToPage(i);
  const oldBottom = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;

  doc.rect(0, doc.page.height - 22, doc.page.width, 22).fill(NAVY);
  doc.fillColor('#94A3B8').fontSize(7.5).font('Helvetica')
    .text(`RootAccess E2E Test Plan & Specification  •  Page ${i + 1} of ${totalPages}`, 40, doc.page.height - 15, {
      width: doc.page.width - 80,
      align: 'center',
      lineBreak: false,
    });

  doc.page.margins.bottom = oldBottom;
}

doc.end();

writeStream.on('finish', () => {
  console.log(`✅ Test Plan PDF successfully generated at: ${PDF_PATH} (${totalPages} pages)`);
});
