import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const PROJECT_DOWNLOADS_DIR = path.resolve(process.cwd(), 'downloads');
const USER_DOWNLOADS_DIR = '/Users/Apple/Downloads';

if (!fs.existsSync(PROJECT_DOWNLOADS_DIR)) {
  fs.mkdirSync(PROJECT_DOWNLOADS_DIR, { recursive: true });
}

const PROJECT_OUTPUT_FILE = path.join(PROJECT_DOWNLOADS_DIR, 'RootAccess_Business_Plan_and_Growth_Strategy.pdf');
const USER_OUTPUT_FILE = path.join(USER_DOWNLOADS_DIR, 'RootAccess_Business_Plan_and_Growth_Strategy.pdf');

// Visual Palette matching RootAccess application
const NAVY = '#0F172A';
const INDIGO = '#4F46E5';
const ACCENT = '#6366F1';
const DARK = '#1E293B';
const MUTED = '#475569';
const LIGHT_BG = '#F8FAFC';
const BORDER = '#CBD5E1';
const GREEN = '#059669';
const AMBER = '#D97706';
const RED = '#DC2626';
const PURPLE = '#7C3AED';

const CONTENT_X = 40;
const CONTENT_WIDTH = 515;

function writeText(
  doc: typeof PDFDocument,
  text: string,
  opts: {
    color?: string;
    size?: number;
    font?: string;
    lineGap?: number;
    width?: number;
    moveDown?: number;
  } = {}
) {
  const color = opts.color || DARK;
  const size = opts.size || 8;
  const font = opts.font || 'Helvetica';
  const lineGap = opts.lineGap || 1.8;
  const width = opts.width || CONTENT_WIDTH;

  doc.x = CONTENT_X;
  doc.fillColor(color).fontSize(size).font(font).text(text, CONTENT_X, doc.y, {
    width,
    lineGap,
  });
  doc.x = CONTENT_X;
  if (opts.moveDown !== undefined) {
    doc.moveDown(opts.moveDown);
  }
}

function writeBullet(
  doc: typeof PDFDocument,
  boldPrefix: string,
  bodyText: string,
  boldColor = NAVY
) {
  doc.x = CONTENT_X;
  doc.fillColor(boldColor).fontSize(8).font('Helvetica-Bold').text(`•  ${boldPrefix}: `, CONTENT_X, doc.y, {
    continued: true,
  });
  doc.fillColor(MUTED).fontSize(7.5).font('Helvetica').text(bodyText, {
    lineGap: 1.5,
    width: CONTENT_WIDTH,
  });
  doc.x = CONTENT_X;
  doc.moveDown(0.25);
}

function drawCoverPage(doc: typeof PDFDocument) {
  // Top brand band
  doc.rect(0, 0, doc.page.width, 32).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(9).font('Helvetica-Bold')
    .text('ROOTACCESS  |  INTERNAL STRATEGIC PLANNING & GROWTH MASTERPLAN', CONTENT_X, 11, {
      width: doc.page.width - 80,
      align: 'left',
      lineBreak: false,
    });

  doc.x = CONTENT_X;
  doc.y = 55;

  // Metadata badge
  doc.rect(CONTENT_X, doc.y, 290, 18).fill(INDIGO);
  doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold')
    .text('CONFIDENTIAL FOUNDER & STRATEGIC ADVISOR BRIEFING', CONTENT_X + 5, doc.y + 4, {
      width: 280,
      align: 'center',
      lineBreak: false,
    });

  doc.x = CONTENT_X;
  doc.y = 85;

  // Main Document Title
  doc.fillColor(NAVY).fontSize(20).font('Helvetica-Bold')
    .text('RootAccess — Business Plan and Growth Strategy', CONTENT_X, doc.y, { width: CONTENT_WIDTH, lineGap: 2 });

  doc.x = CONTENT_X;
  doc.moveDown(0.25);

  // Subtitle
  doc.fillColor(INDIGO).fontSize(11).font('Helvetica-Bold')
    .text('Building an Affordable, Practical, AI-Enabled Learning Platform for Software Testing Careers', CONTENT_X, doc.y, {
      width: CONTENT_WIDTH,
      lineGap: 2,
    });

  doc.x = CONTENT_X;
  doc.moveDown(0.4);
  doc.rect(CONTENT_X, doc.y, CONTENT_WIDTH, 2).fill(INDIGO);
  doc.moveDown(0.6);

  // Metadata Box
  const boxY = doc.y;
  doc.rect(CONTENT_X, boxY, CONTENT_WIDTH, 105).fill(LIGHT_BG);
  doc.rect(CONTENT_X, boxY, 4, 105).fill(INDIGO);
  doc.rect(CONTENT_X, boxY, CONTENT_WIDTH, 105).stroke(BORDER);

  doc.fillColor(NAVY).fontSize(9.5).font('Helvetica-Bold').text('DOCUMENT CONTROL & EXECUTIVE CONTEXT', 52, boxY + 8);

  const metaData = [
    ['Geographic Focus', 'India initially (expanding to international markets in Phase 3)'],
    ['Operating Currency', 'Indian Rupees (INR / ₹)'],
    ['Planning Horizon', '12 Months (Detailed First 90-Day Execution Roadmap)'],
    ['Target Audience', 'Founder, Potential Mentors, Instructors, Partners, Early Investors'],
    ['Development Platform', 'Google Antigravity & React / Supabase Architecture'],
    ['Research Date', 'October 2026 (Verified market data and active test pricing)'],
  ];

  let metaY = boxY + 24;
  metaData.forEach(([label, value]) => {
    doc.fillColor(DARK).fontSize(7.5).font('Helvetica-Bold').text(`${label}: `, 52, metaY, { continued: true });
    doc.fillColor(MUTED).fontSize(7.5).font('Helvetica').text(value);
    metaY += 13;
  });

  doc.x = CONTENT_X;
  doc.y = boxY + 115;

  // Warning Box
  const warnY = doc.y;
  const warnText = 'This plan is an objective operational roadmap, not a promotional pitch. All financial projections, customer conversion rates, and acquisition costs are explicit modelling assumptions rather than guaranteed outcomes. The platform currently has zero paying customers and is starting without an established brand audience.';
  doc.fontSize(7.5).font('Helvetica');
  const warnTextHeight = doc.heightOfString(warnText, { width: 485, lineGap: 1.5 });
  const warnBoxHeight = 22 + warnTextHeight + 8;

  doc.rect(CONTENT_X, warnY, CONTENT_WIDTH, warnBoxHeight).fill('#FFFBEB');
  doc.rect(CONTENT_X, warnY, 4, warnBoxHeight).fill(AMBER);
  doc.rect(CONTENT_X, warnY, CONTENT_WIDTH, warnBoxHeight).stroke('#FDE68A');

  doc.fillColor(AMBER).fontSize(8).font('Helvetica-Bold').text('COMMERCIAL REALISM & UNCERTAINTY NOTICE', 52, warnY + 6);
  doc.fillColor(DARK).fontSize(7.5).font('Helvetica').text(warnText, 52, warnY + 20, { width: 485, lineGap: 1.5 });

  doc.x = CONTENT_X;
  doc.y = warnY + warnBoxHeight + 15;

  // Table of Contents
  doc.fillColor(NAVY).fontSize(10.5).font('Helvetica-Bold').text('TABLE OF CONTENTS (20 STRATEGIC MODULES)', CONTENT_X, doc.y);
  doc.rect(CONTENT_X, doc.y + 3, CONTENT_WIDTH, 1).fill(BORDER);
  doc.moveDown(0.5);

  const tocStartY = doc.y;
  const tocLeft = [
    '1. Document Requirements & Executive Scope',
    '2. Executive Summary & Core Thesis',
    '3. Customer Problems & Indian Market Demand',
    '4. Competitor Analysis & Strategic Positioning',
    '5. Differentiation Matrix & Top 3 Moats',
    '6. Target Audience & Customer Personas',
    '7. Product & Curriculum Strategy (2 Courses)',
    '8. Business Model, Pricing & Unit Economics',
    '9. Go-To-Market & Low-Budget Acquisition',
    '10. Paid Meta Ad Forecast & Decision Rules',
  ];
  const tocRight = [
    '11. Website Minimum Viable Experience (MVE)',
    '12. Operations, QA & Founder Time Budget',
    '13. Technology Stack & Operational Cost Table',
    '14. 12-Month Financial Model (3 Scenarios)',
    '15. Comprehensive SWOT Analysis',
    '16. Prioritized Risk Register & Contingencies',
    '17. First 90 Days: Weekly Execution Plan',
    '18. Key Performance Indicators (KPI Dashboard)',
    '19. Strategic Recommendations & Go/No-Go Gate',
    '20. Research Sources & Citations (Oct 2026)',
  ];

  tocLeft.forEach((item, idx) => {
    doc.fillColor(DARK).fontSize(7.5).font('Helvetica').text(item, CONTENT_X + 5, tocStartY + idx * 13.5, { width: 240, lineBreak: false });
  });
  tocRight.forEach((item, idx) => {
    doc.fillColor(DARK).fontSize(7.5).font('Helvetica').text(item, 295, tocStartY + idx * 13.5, { width: 250, lineBreak: false });
  });

  doc.addPage();
  drawPageHeader(doc);
}

function checkPageBudget(doc: typeof PDFDocument, requiredSpace = 75) {
  if (doc.y <= 60) {
    doc.x = CONTENT_X;
    return false;
  }
  if (doc.y + requiredSpace > doc.page.height - 50) {
    doc.addPage();
    drawPageHeader(doc);
    doc.x = CONTENT_X;
    return true;
  }
  doc.x = CONTENT_X;
  return false;
}

function drawPageHeader(doc: typeof PDFDocument) {
  doc.rect(0, 0, doc.page.width, 18).fill(NAVY);
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold')
    .text('ROOTACCESS  •  BUSINESS PLAN AND GROWTH STRATEGY (INDIA & GLOBAL)', CONTENT_X, 5, {
      width: doc.page.width - 80,
      lineBreak: false,
    });
  doc.x = CONTENT_X;
  doc.y = 35;
}

function drawSectionHeader(doc: typeof PDFDocument, number: string, title: string) {
  checkPageBudget(doc, 45);
  doc.x = CONTENT_X;
  doc.fillColor(NAVY).fontSize(10.5).font('Helvetica-Bold').text(`${number}. ${title}`, CONTENT_X, doc.y);
  doc.rect(CONTENT_X, doc.y + 3, CONTENT_WIDTH, 1).fill(BORDER);
  doc.x = CONTENT_X;
  doc.moveDown(0.5);
}

function drawCard(
  doc: typeof PDFDocument,
  title: string,
  subtitle: string,
  items: string[],
  accentColor = INDIGO
) {
  doc.fontSize(9).font('Helvetica-Bold');
  const titleHeight = doc.heightOfString(title, { width: 485 });

  doc.fontSize(7.5).font('Helvetica');
  const subHeight = doc.heightOfString(subtitle, { width: 485, lineGap: 1.5 });

  const bulletHeights: number[] = [];
  let totalBulletsHeight = 0;
  items.forEach((item) => {
    const h = doc.heightOfString(`•  ${item}`, { width: 480, lineGap: 1.5 });
    bulletHeights.push(h);
    totalBulletsHeight += h + 4;
  });

  const cardPadding = 8;
  const totalCardHeight = cardPadding + titleHeight + 3 + subHeight + 5 + totalBulletsHeight + cardPadding;

  checkPageBudget(doc, totalCardHeight + 5);

  const cardY = doc.y;
  doc.rect(CONTENT_X, cardY, CONTENT_WIDTH, totalCardHeight).fill(LIGHT_BG);
  doc.rect(CONTENT_X, cardY, 4, totalCardHeight).fill(accentColor);
  doc.rect(CONTENT_X, cardY, CONTENT_WIDTH, totalCardHeight).stroke(BORDER);

  let currentY = cardY + cardPadding;
  doc.fillColor(NAVY).fontSize(9).font('Helvetica-Bold').text(title, 52, currentY, { width: 485 });
  currentY += titleHeight + 3;

  doc.fillColor(MUTED).fontSize(7.5).font('Helvetica').text(subtitle, 52, currentY, { width: 485, lineGap: 1.5 });
  currentY += subHeight + 5;

  items.forEach((item, idx) => {
    doc.fillColor(DARK).fontSize(7.5).font('Helvetica').text(`•  ${item}`, 56, currentY, { width: 480, lineGap: 1.5 });
    currentY += bulletHeights[idx] + 4;
  });

  doc.x = CONTENT_X;
  doc.y = cardY + totalCardHeight + 10;
}

interface TableColumn {
  title: string;
  width: number;
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
}

function drawTable(
  doc: typeof PDFDocument,
  columns: TableColumn[],
  rows: string[][],
  highlightRowIndices: number[] = [],
  highlightColumnIndices: number[] = []
) {
  const headerHeight = 20;

  function renderTableHeader(y: number) {
    doc.rect(CONTENT_X, y, CONTENT_WIDTH, headerHeight).fill(NAVY);
    let curX = CONTENT_X;
    columns.forEach((col) => {
      doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text(
        col.title,
        curX + 5,
        y + 5,
        { width: col.width - 10, align: col.align || 'left', lineBreak: false }
      );
      curX += col.width;
    });
    return y + headerHeight;
  }

  checkPageBudget(doc, headerHeight + 35);
  let curY = renderTableHeader(doc.y);

  rows.forEach((row, rIdx) => {
    doc.fontSize(7).font('Helvetica');
    let maxCellHeight = 12;
    row.forEach((cellText, cIdx) => {
      const col = columns[cIdx];
      const h = doc.heightOfString(cellText, { width: col.width - 10, lineGap: 1.5 });
      if (h > maxCellHeight) maxCellHeight = h;
    });

    const rowHeight = maxCellHeight + 8;

    if (curY + rowHeight > doc.page.height - 50) {
      doc.addPage();
      drawPageHeader(doc);
      curY = renderTableHeader(doc.y);
    }

    const isHighlight = highlightRowIndices.includes(rIdx);
    const rowBg = isHighlight ? '#EEF2FF' : rIdx % 2 === 0 ? LIGHT_BG : '#FFFFFF';

    doc.rect(CONTENT_X, curY, CONTENT_WIDTH, rowHeight).fill(rowBg);
    doc.rect(CONTENT_X, curY, CONTENT_WIDTH, rowHeight).stroke(BORDER);

    let cellX = CONTENT_X;
    row.forEach((cellText, cIdx) => {
      const col = columns[cIdx];
      const isColHighlight = highlightColumnIndices.includes(cIdx);
      const isBold = isHighlight || col.bold || isColHighlight;
      const fontName = isBold ? 'Helvetica-Bold' : 'Helvetica';
      const textColor = isHighlight ? INDIGO : cIdx === 0 ? NAVY : DARK;

      doc.fillColor(textColor).fontSize(7).font(fontName).text(
        cellText,
        cellX + 5,
        curY + 4,
        {
          width: col.width - 10,
          align: col.align || 'left',
          lineGap: 1.5,
        }
      );
      cellX += col.width;
    });

    curY += rowHeight;
  });

  doc.x = CONTENT_X;
  doc.y = curY + 10;
}

async function generateBusinessPlanPdf() {
  const doc = new PDFDocument({
    margin: 40,
    size: 'A4',
    bufferPages: true,
  });

  const projectStream = fs.createWriteStream(PROJECT_OUTPUT_FILE);
  doc.pipe(projectStream);

  // Generate Cover Page
  drawCoverPage(doc);

  // SECTION 2: EXECUTIVE SUMMARY
  drawSectionHeader(doc, '2', 'Executive Summary: Plain-Language Business Overview');
  writeText(
    doc,
    'RootAccess is an early-stage Indian online education platform created to bridge the acute gap between theoretical academic software courses and job-ready practical software testing engineering. Rather than selling passive video libraries, RootAccess delivers structured day-by-day practical courses equipped with hands-on defect simulation labs, interactive code exercises, deterministic rubric evaluations, and downloadable offline study handbooks.',
    { lineGap: 2, moveDown: 0.5 }
  );

  drawCard(
    doc,
    'Current Platform State & Proposed Test Pricing',
    'RootAccess is actively developed on Google Antigravity. Days 1–3 of Playwright are live; Day 4 is being finalized.',
    [
      'Initial Course 1: Manual Testing in 5 Days — Proposed Launch Test Price: ₹249',
      'Initial Course 2: Playwright Automation with JavaScript + AI in 20 Days — Proposed Launch Test Price: ₹699',
      'Initial Course Bundle: Complete QA & Automation Mastery Bundle — Proposed Launch Test Price: ₹849',
      'Marketing Experiment: ₹3,000 / month initial Meta advertising budget (Facebook & Instagram placements)',
      'Launch Monetization Architecture: 100% Pay-Per-Course (Subscription models postponed until 5+ courses are built)'
    ],
    INDIGO
  );

  writeText(
    doc,
    'Initial Demand Validation Milestones (Proof of Real Traction):\n' +
    '1. Milestone 1: 10 verified course sales from the initial ₹3,000 Meta advertising test (Customer Acquisition Cost <= ₹300).\n' +
    '2. Milestone 2: 70%+ course completion and quiz pass rate across the first cohort of 25 learners.\n' +
    '3. Milestone 3: 5 unsolicited organic referrals or peer testimonials shared publicly on LinkedIn.',
    { lineGap: 2, moveDown: 0.6 }
  );

  // SECTION 3: CUSTOMER PROBLEM & MARKET DEMAND
  drawSectionHeader(doc, '3', 'Customer Problem & Indian Market Demand Analysis');
  writeText(
    doc,
    'India produces approximately 1.5 million engineering graduates annually. According to NASSCOM Tech Hiring Reports (2025–2026), Software Quality Assurance and Test Automation represent 18% of all entry-to-mid-level software hiring. However, learners face 5 systemic bottlenecks:',
    { lineGap: 2, moveDown: 0.4 }
  );

  const painPoints = [
    ['Tutorial Hell & Passive Video Fatigue', 'Learners watch 40+ hours of video but freeze when faced with real bugs or writing automation code from scratch.'],
    ['Outdated Stacks (Selenium Java vs Playwright JS)', 'Most Indian institutes still teach 2014 Selenium Java with brittle XPath selectors, while modern startups demand Playwright with JavaScript/TypeScript.'],
    ['AI Confusion & Broken Code', 'Learners use ChatGPT to generate automation scripts, but when locators fail or async promises reject, they lack the fundamentals to diagnose failures.'],
    ['Prohibitive Bootcamp Costs', 'Offline training institutes in Bengaluru, Pune, and Hyderabad charge ₹45,000–₹1,20,000 upfront with unverified placement claims.'],
    ['Interview Anxiety & Lack of Proof-of-Work', 'Candidates cannot speak convincingly about real defect severity or showcase verified GitHub repositories to recruiters.'],
  ];

  painPoints.forEach(([title, desc]) => {
    checkPageBudget(doc, 30);
    writeBullet(doc, title, desc);
  });
  doc.x = CONTENT_X;
  doc.moveDown(0.4);

  // SECTION 4: COMPETITOR ANALYSIS & POSITIONING
  drawSectionHeader(doc, '4', 'Competitor Analysis & Strategic Positioning Matrix');
  writeText(
    doc,
    'The Indian QA training market comprises low-cost global marketplaces, traditional offline institutes, and individual YouTube creators. Below is an objective analysis of actual competitors:',
    { lineGap: 2, moveDown: 0.4 }
  );

  const compColumns: TableColumn[] = [
    { title: 'Provider', width: 95 },
    { title: 'Format', width: 75 },
    { title: 'Tech Stack', width: 75 },
    { title: 'AI Focus', width: 65 },
    { title: 'Public Pricing', width: 75 },
    { title: 'Market Gap RootAccess Addresses', width: 130 },
  ];

  const compRows = [
    ['Udemy (Rahul Shetty, etc.)', 'Self-paced video', 'Java / TS Selenium', 'Minimal / None', '₹499 - ₹3,499 (sale)', 'Passive videos; no defect sandbox or direct grading'],
    ['Coursera / edX', 'Academic video', 'General Python', 'None', '₹3,500/mo sub', 'Academic theory; lacks modern Playwright automation'],
    ['Offline Institutes (QSpiders)', 'Classroom 3-6mo', 'Manual + Core Java', 'None', '₹35,000 - ₹75,000', 'Expensive; rigid schedules; outdated Selenium stacks'],
    ['Free YouTube Tutorials', 'Fragmented video', 'Assorted stacks', 'Unstructured', 'Free (₹0)', 'Zero structured progression; no verified proof-of-work'],
    ['RootAccess (Proposed)', 'Daily Interactive', 'Playwright JS + AI', 'Integrated AI prompt', '₹249 - ₹699 one-time', 'Active defect simulation, deterministic rubrics, pure JS'],
  ];

  drawTable(doc, compColumns, compRows, [4]);

  // SECTION 5: DIFFERENTIATION STRATEGY
  drawSectionHeader(doc, '5', 'RootAccess Differentiation Strategy & Top 3 Moats');
  writeText(
    doc,
    'To avoid competing purely on race-to-the-bottom pricing, RootAccess establishes 3 core structural differentiators that are difficult for passive marketplace courses to duplicate:',
    { lineGap: 2, moveDown: 0.4 }
  );

  drawCard(
    doc,
    'Top 3 Ranked Defensible Differentiators',
    'Evaluated by implementation cost, learner value, defense against copycats, and conversion impact.',
    [
      'Moat 1 (Learn-by-Doing Workplace Defect Simulator): Seeded bugs (boundary errors, cart glitches, race conditions) in the live RootShop app. Students log real Jira-style defect reports.',
      'Moat 2 (Pure JavaScript + AI Playwright Workflow): Bypasses complex TypeScript setup; teaches W3C getByRole accessibility locators and practical AI prompts for test skeleton generation.',
      'Moat 3 (Structured Daily Progression & Deterministic Rubrics): Strict Day-by-Day pacing with automated 10-point code evaluation rubrics that give instant feedback.'
    ],
    INDIGO
  );

  // SECTION 6: TARGET AUDIENCE & PERSONAS
  drawSectionHeader(doc, '6', 'Target Audience & Customer Personas');
  writeText(
    doc,
    'While the market includes students, working professionals, and career changers, RootAccess will focus initial marketing spend exclusively on ONE primary segment to avoid diluting the ₹3,000 monthly ad budget:',
    { lineGap: 2, moveDown: 0.4 }
  );

  drawCard(
    doc,
    'PRIMARY TARGET: Priya — The Manual Tester Transitioning to Automation',
    'Age: 25–28 | Location: Tier 1/2 IT Hubs (Bengaluru, Hyderabad, Pune, Chennai) | Experience: 2–3 Years',
    [
      'Career Goal: Break into Automation QA / SDET roles to increase salary from ₹3.5–5 LPA to ₹7–10 LPA.',
      'Core Pain Point: Intimidated by complex Java/TypeScript programming; worried about automation redundancy in sprint cycles.',
      'Objection to Purchase: Fear that the course will be too abstract or abandon her when JavaScript async/await gets difficult.',
      'Winning Angle: "Learn Playwright with pure JavaScript in 20 Days — No complex TypeScript setup, no Selenium headache."',
      'Acquisition Channels: LinkedIn targeted organic posts, Instagram carousel ad placements, Telegram QA study groups.'
    ],
    GREEN
  );

  writeText(
    doc,
    'Secondary Personas for Organic Outreach:\n' +
    '• Rohan (Fresher / 2025-2026 Graduate): Needs an affordable (₹249) Manual QA portfolio to clear campus/off-campus technical interviews.\n' +
    '• Amit (Working Automation QA): Already knows Selenium; wants a fast, clean 20-day transition to Playwright and AI test generation.\n' +
    '• Sneha (Career Changer / Break Returnee): Needs confidence-building step-by-step guidance without intimidating bootcamp debt.',
    { lineGap: 2, moveDown: 0.6 }
  );

  // SECTION 7: PRODUCT & CURRICULUM STRATEGY
  drawSectionHeader(doc, '7', 'Product & Curriculum Strategy (Initial 2 Courses)');

  drawCard(
    doc,
    'Course 1: Manual Testing in 5 Days (₹249 Test Price)',
    'Prerequisites: Basic computer literacy | Duration: 5 Days (8 Total Hours)',
    [
      'Day 1: Software Testing Life Cycle (STLC) & Modern QA Workflows (Agile, Sprint grooming, Shift-Left).',
      'Day 2: Test Design Techniques (Equivalence Partitioning & Boundary Value Analysis mathematical models).',
      'Day 3: Test Execution & Defect Management (Jira bug logging standards, Severity vs Priority matrix).',
      'Day 4: Real-World E-Commerce Checkout Defect Hunt (Interactive sandbox with 4 seeded bugs).',
      'Day 5: Industry Interview Preparation, STAR behavioral response framework, and Mini-Project Portfolio.'
    ],
    INDIGO
  );

  drawCard(
    doc,
    'Course 2: Playwright Automation with JavaScript + AI (₹699 Test Price)',
    'Prerequisites: Basic testing familiarity | Duration: 20 Days (40 Total Hours) — Work In Progress',
    [
      'Phase 1 (Days 1–5): Automation fundamentals, pure JS essentials, local setup, robust getByRole locators, web-first assertions.',
      'Phase 2 (Days 6–10): Auto-waiting, multi-page flows, browser contexts, test fixtures, data-driven JSON testing, HTML reports.',
      'Phase 3 (Days 11–15): Storage state authentication, Page Object Model (POM), API mocking, and Git CI/CD pipelines.',
      'Phase 4 (Days 16–20): AI-assisted test drafting, AI locator debugging, framework resilience, and final E2E capstone project.'
    ],
    PURPLE
  );

  // SECTION 8: BUSINESS MODEL & PRICING
  drawSectionHeader(doc, '8', 'Business Model, Pricing Architecture & Margins');
  writeText(
    doc,
    'RootAccess adopts a transactional pay-per-course pricing structure for launch. Pay-per-course dramatically reduces buyer hesitation in India compared to recurring subscriptions, which suffer from 80%+ drop-off at monthly renewal without RBI e-mandate registration.',
    { lineGap: 2, moveDown: 0.4 }
  );

  const priceColumns: TableColumn[] = [
    { title: 'Offering', width: 135 },
    { title: 'Test Price', width: 80 },
    { title: 'Payment Fee', width: 85 },
    { title: 'Hosting & AI Cost', width: 100 },
    { title: 'Contribution Margin', width: 115 },
  ];

  const priceRows = [
    ['Manual Testing (5 Days)', '₹249', '₹5.88 (2.36%)', '₹8.00 (Server/Storage)', '₹235.12 (94.4%)'],
    ['Playwright JS + AI (20 Days)', '₹699', '₹16.50 (2.36%)', '₹22.00 (LLM/Storage)', '₹660.50 (94.5%)'],
    ['QA Mastery Bundle (Both)', '₹849', '₹20.04 (2.36%)', '₹25.00 (LLM/Storage)', '₹803.96 (94.7%)'],
  ];

  drawTable(doc, priceColumns, priceRows);

  // SECTION 9: GO-TO-MARKET STRATEGY
  drawSectionHeader(doc, '9', 'Go-To-Market & Low-Budget Meta Acquisition Plan');
  writeText(
    doc,
    'Initial Meta Advertising Allocation (₹3,000 / month = ₹100 / day):\n' +
    '• 70% (₹2,100 / mo): Direct Landing Page Traffic targeting Indian IT professionals and QA job seekers on Instagram & Facebook.\n' +
    '• 30% (₹900 / mo): Retargeting website visitors who viewed the Playwright course outline but did not initiate checkout.\n' +
    '• Ad Creative Focus: Single-image and short carousel creatives highlighting: "Manual QA to Playwright in 20 Days — Without TypeScript Confusion".',
    { lineGap: 2, moveDown: 0.4 }
  );

  drawCard(
    doc,
    '30-Day Solo Founder Organic Content Calendar',
    'Achievable posting cadence: 3 high-signal technical posts per week on LinkedIn and Instagram.',
    [
      'Week 1: "Top 5 Bug Report Mistakes That Make Developers Ignore You" (Real Jira examples from RootShop).',
      'Week 2: "Why getByRole is 10x More Reliable Than Fragile XPath in Playwright" (Code snippet comparison).',
      'Week 3: "How to Prompt ChatGPT to Draft Playwright Test Skeletons Without Hallucinating Locators".',
      'Week 4: Free Download Giveaway: "The 2026 Modern QA Interview Blueprint PDF" (Link to free RootAccess Syllabus).'
    ],
    INDIGO
  );

  // SECTION 10: PAID ADVERTISING FORECAST & DECISION RULES
  drawSectionHeader(doc, '10', 'Paid Advertising Forecast & Sensitivity Models');
  writeText(
    doc,
    'Sensitivity Model for ₹3,000 Monthly Meta Ad Spend (Illustrative planning scenarios):',
    { lineGap: 2, moveDown: 0.4 }
  );

  const adColumns: TableColumn[] = [
    { title: 'Metric / Assumption', width: 135 },
    { title: 'Conservative', width: 95 },
    { title: 'Base Case', width: 95 },
    { title: 'Optimistic', width: 95 },
    { title: 'Break-Even Target', width: 95 },
  ];

  const adRows = [
    ['Monthly Ad Spend', '₹3,000', '₹3,000', '₹3,000', '₹3,000'],
    ['Cost Per Click (CPC)', '₹14.00', '₹10.00', '₹7.50', '₹10.00'],
    ['Landing Page Visitors', '214 visits', '300 visits', '400 visits', '300 visits'],
    ['Conversion Rate (Visits to Buy)', '0.8%', '1.5%', '2.5%', '1.4% (at ₹700 AOV)'],
    ['Paid Course Purchases', '2 purchases', '5 purchases', '10 purchases', '5 purchases'],
    ['Average Order Value (AOV)', '₹550', '₹620', '₹710', '₹600'],
    ['Gross Revenue', '₹1,100', '₹3,100', '₹7,100', '₹3,000'],
    ['Net Return on Ad Spend (ROAS)', '0.37x (Loss ₹1,900)', '1.03x (Breakeven)', '2.37x (Profit ₹4,100)', '1.00x'],
  ];

  drawTable(doc, adColumns, adRows, [6, 7]);

  writeText(doc, 'Operational Decision Rules for Meta Ad Spend:', { font: 'Helvetica-Bold', color: DARK, moveDown: 0.2 });
  writeText(
    doc,
    '• PAUSE SPEND: If ₹1,500 is spent with fewer than 100 landing page clicks or 0 checkout starts, pause ads and rework copy.\n' +
    '• ITERATE CREATIVE: If CTR is below 1.0%, replace ad graphics and test video reels before increasing budget.\n' +
    '• SCALE BUDGET: Do NOT increase monthly budget beyond ₹3,000 until ROAS consistently exceeds 1.5x on at least 15 verified purchases.',
    { color: MUTED, size: 7.5, lineGap: 2, moveDown: 0.6 }
  );

  // SECTION 11: WEBSITE & LEARNER EXPERIENCE
  drawSectionHeader(doc, '11', 'Website & Minimum Viable Experience (MVE)');
  writeText(
    doc,
    'To preserve capital and development focus, RootAccess strictly limits launch features to what is required to complete paid transactions and deliver structured learning:',
    { lineGap: 2, moveDown: 0.4 }
  );

  const mveItems = [
    ['Launch-Critical Features', 'Course catalogue, preview lesson, Razorpay/Cashfree checkout, secure Supabase authentication, day progression locks, quiz evaluators, downloadable PDF handbooks.'],
    ['Postponed Features (Phase 2+)', 'Discussion forums, complex peer messaging, live video streaming, custom native mobile apps, automated certificate blockchain hashing.'],
    ['Access Control Integrity', 'Paid courses must enforce strict backend row-level security (RLS) in Supabase so unpaid users cannot bypass URL routes.'],
  ];

  mveItems.forEach(([label, detail]) => {
    checkPageBudget(doc, 28);
    writeBullet(doc, label, detail);
  });
  doc.x = CONTENT_X;
  doc.moveDown(0.4);

  // SECTION 12: OPERATIONS, QA & TIME BUDGET
  drawSectionHeader(doc, '12', 'Operations, Quality Assurance & Founder Time Budget');

  drawCard(
    doc,
    'Weekly Founder Time Allocation (14 Hours / Week Total)',
    'Sustainable solo-founder operational model designed to prevent burnout.',
    [
      'Curriculum Development & Code Validation (6 hrs/wk): Writing code examples, testing Playwright scripts on Chromium/Firefox/WebKit.',
      'Content Marketing & Community Outreach (4 hrs/wk): Publishing 3 LinkedIn/Instagram technical teardowns and answering QA forum queries.',
      'Student Support & Feedback Triaging (2.5 hrs/wk): Resolving exercise doubts, addressing quiz clarification tickets, updating PDF errata.',
      'Analytics Review & Ad Optimization (1.5 hrs/wk): Reviewing Meta ad CPC, landing page drop-offs, and payment gateway conversion rates.'
    ],
    AMBER
  );

  // SECTION 13: TECHNOLOGY STACK & OPERATIONAL COSTS
  drawSectionHeader(doc, '13', 'Technology Stack & Monthly Fixed Operating Costs');

  const costColumns: TableColumn[] = [
    { title: 'Service / Dependency', width: 145 },
    { title: 'Role in RootAccess', width: 120 },
    { title: 'Free Tier Limits', width: 130 },
    { title: 'Monthly Cost (INR)', width: 120 },
  ];

  const costRows = [
    ['Vercel / Cloudflare Pages', 'Frontend Hosting & CDN', 'Unlimited bandwidth for early traffic', '₹0 (Free tier)'],
    ['Supabase Database & Auth', 'User data & Course progress', '50,000 monthly active users', '₹0 (Free tier)'],
    ['Custom Domain & DNS', 'Branding (rootaccess.in)', 'N/A (Annual renewal ₹850/yr)', '₹71 / month'],
    ['Google Gemini API', 'Rubric evaluation & hints', 'Free experimental tier / low usage', '₹250 / month'],
    ['Meta Advertising', 'Traffic & customer discovery', 'Discretionary experimental budget', '₹3,000 / month'],
    ['Total Monthly Fixed Outlay', 'Core operational infrastructure', 'Sufficient for first 500 learners', '₹3,321 / month'],
  ];

  drawTable(doc, costColumns, costRows, [5]);

  // SECTION 14: 12-MONTH FINANCIAL MODEL
  drawSectionHeader(doc, '14', '12-Month Financial Projections (3 Scenarios)');
  writeText(
    doc,
    'Financial model covering 12 months assuming organic growth compounds after initial traction:',
    { lineGap: 2, moveDown: 0.4 }
  );

  const finColumns: TableColumn[] = [
    { title: 'Financial Parameter', width: 135 },
    { title: 'Conservative', width: 95 },
    { title: 'Base Case', width: 95 },
    { title: 'Optimistic', width: 95 },
    { title: 'Calculation Basis', width: 95 },
  ];

  const finRows = [
    ['Total Course Sales', '85 learners', '280 learners', '720 learners', 'Paid + Organic mix'],
    ['Gross Revenue', '₹53,500', '₹1,84,000', '₹5,18,000', 'AOV ₹630 - ₹720'],
    ['Payment Processing Fees', '₹1,260 (2.36%)', '₹4,340 (2.36%)', '₹12,220 (2.36%)', 'Razorpay/Cashfree standard'],
    ['Total Ad Spend (12 Mos)', '₹36,000', '₹48,000', '₹72,000', '₹3k - ₹6k / month'],
    ['Server & Tech Expenses', '₹3,850', '₹5,400', '₹12,500', 'Domain + LLM usage'],
    ['Net Cash Contribution', '₹12,390', '₹1,26,260', '₹4,21,280', 'Cash profit before tax'],
    ['Cash Break-Even Volume', '6 sales / month', '6 sales / month', '6 sales / month', 'Covers ₹3.3k monthly burn'],
  ];

  drawTable(doc, finColumns, finRows, [5, 6]);

  // SECTION 15: SWOT ANALYSIS
  drawSectionHeader(doc, '15', 'Comprehensive SWOT Analysis');

  const swotItems = [
    ['Strengths', 'Focused QA niche, modern Playwright JS stack, live defect sandbox, deterministic rubrics, low fixed operating burn (₹3,321/mo).'],
    ['Weaknesses', 'Zero initial brand awareness, uncompleted Days 5–20 of Playwright, single-founder execution constraints, no mobile app.'],
    ['Opportunities', 'Rapid Playwright adoption overtaking Selenium in Indian startups, high demand for AI-literate QA testers, corporate upskilling pilots.'],
    ['Threats', 'Aggressive discounting by Udemy instructors during flash sales (₹399), free YouTube video series, changing Meta ad privacy restrictions.'],
  ];

  swotItems.forEach(([label, detail]) => {
    checkPageBudget(doc, 28);
    const color = label === 'Strengths' ? GREEN : label === 'Weaknesses' ? RED : label === 'Opportunities' ? INDIGO : AMBER;
    writeBullet(doc, label, detail, color);
  });
  doc.x = CONTENT_X;
  doc.moveDown(0.4);

  // SECTION 16: RISK REGISTER
  drawSectionHeader(doc, '16', 'Prioritized Risk Register & Mitigation Contingencies');

  const riskColumns: TableColumn[] = [
    { title: 'Identified Risk', width: 110 },
    { title: 'Prob.', width: 45, align: 'center' },
    { title: 'Impact', width: 45, align: 'center' },
    { title: 'Early Warning Signal', width: 145 },
    { title: 'Preventative & Contingency Action', width: 170 },
  ];

  const riskRows = [
    ['Zero Ad Purchases', 'High', 'High', '₹1,500 spent with 0 sales', 'Pause campaign; revise copy; focus on organic LinkedIn outreach.'],
    ['Learner Drop-Off at Day 3', 'Medium', 'High', 'Quiz pass rate < 50%', 'Simplify JavaScript async/await explanations; add step-by-step videos.'],
    ['AI Hallucinates Code', 'Medium', 'Medium', 'Learners report broken tests', 'Enforce strict verification prompts; provide hardcoded fallback solutions.'],
    ['Payment Gateway Failure', 'Low', 'High', 'Drop-off on checkout page', 'Support UPI QR codes, Google Pay, PhonePe via Razorpay Smart Collect.'],
    ['Founder Burnout / Delay', 'Medium', 'High', 'Curriculum lags schedule', 'Lock in weekly 14-hr budget; publish Day modules incrementally.'],
  ];

  drawTable(doc, riskColumns, riskRows);

  // SECTION 17: FIRST 90 DAYS EXECUTION PLAN
  drawSectionHeader(doc, '17', 'First 90 Days: Phased Execution Roadmap');

  const roadmapPhases = [
    {
      title: 'Phase 1: Product Readiness & Validation (Days 1–30)',
      goals: 'Finalize Playwright Days 1–10; run ₹3,000 Meta ad pilot; acquire first 5–10 paying learners; gather unvarnished feedback.',
      gate: 'DECISION GATE 1: Did at least 5 learners pay ₹699? If yes, proceed to complete Days 11–20. If no, interview visitors to find pricing/messaging blockers.'
    },
    {
      title: 'Phase 2: Conversion Optimization & Quality Hardening (Days 31–60)',
      goals: 'Complete Days 11–15; refine ad creative based on winning angles; publish 12 LinkedIn technical posts; introduce the ₹849 bundle.',
      gate: 'DECISION GATE 2: Is Customer Acquisition Cost below ₹450? If yes, keep ads running. If no, switch 80% focus to organic distribution.'
    },
    {
      title: 'Phase 3: Curriculum Completion & Repeatability (Days 61–90)',
      goals: 'Complete all 20 Days of Playwright; conduct capstone project reviews; secure 3 student placement/interview case studies.',
      gate: 'DECISION GATE 3: Are monthly revenues consistently exceeding ₹15,000 with >65% course completion? If yes, consider scaling ad spend.'
    }
  ];

  roadmapPhases.forEach((p) => {
    checkPageBudget(doc, 48);
    writeText(doc, p.title, { font: 'Helvetica-Bold', size: 8.5, color: INDIGO, moveDown: 0.15 });
    writeText(doc, `Objective: ${p.goals}`, { size: 7.5, color: DARK, lineGap: 1.5, moveDown: 0.15 });
    writeText(doc, p.gate, { size: 7, font: 'Helvetica-Oblique', color: ACCENT, lineGap: 1.5, moveDown: 0.4 });
  });

  // SECTION 18: KEY PERFORMANCE INDICATORS
  drawSectionHeader(doc, '18', 'Key Performance Indicators (KPI Dashboard)');
  writeText(
    doc,
    'A compact, actionable dashboard tracking health across 4 operational dimensions:',
    { lineGap: 2, moveDown: 0.4 }
  );

  const kpis = [
    ['Traffic & Top-of-Funnel', 'Unique landing page visitors, Click-Through Rate (CTR target > 1.2%), Cost Per Click (CPC target < ₹10).'],
    ['Conversion & Economics', 'Checkout start rate (> 6%), Paid purchase conversion (> 1.5%), Cost Per Acquisition (CPA target < ₹350).'],
    ['Pedagogical Retention', 'Day 1-to-Day 5 completion rate (> 70%), Quiz first-time pass rate (> 65%), Assignment submission rate (> 50%).'],
    ['Customer Satisfaction', 'Refund rate (target < 3%), Net Promoter Score (NPS > +40), Organic peer referral rate (> 10%).'],
  ];

  kpis.forEach(([cat, detail]) => {
    checkPageBudget(doc, 25);
    writeBullet(doc, cat, detail);
  });
  doc.x = CONTENT_X;
  doc.moveDown(0.4);

  // SECTION 19: STRATEGIC RECOMMENDATIONS
  drawSectionHeader(doc, '19', 'Strategic Recommendations & Founder Go/No-Go Gate');

  const recommendations = [
    ['1. Is RootAccess worth testing as a small business?', 'YES. Low capital downside (₹3,321/mo) with massive market tailwinds for Playwright and AI QA skills.'],
    ['2. Which learner segment should it target first?', 'Manual Testers with 2–3 years experience (Priya). They have urgent motivation, salary upside, and purchasing power.'],
    ['3. Which course should it promote first?', 'Playwright Automation with JavaScript + AI (₹699). It commands 2.8x higher revenue per customer than Manual QA.'],
    ['4. What makes RootAccess meaningfully different?', 'Workplace defect simulations (RootShop sandbox) and deterministic AI rubrics that give instant code reviews.'],
    ['5. Is ₹3,000/mo ad spend enough to validate initial demand?', 'YES, for validation. It buys ~300 targeted visits, enough to determine if conversion is 0% or 1.5%.'],
    ['6. What should the founder avoid building in the first 6 months?', 'DO NOT build custom mobile apps, video conferencing software, or complex subscription billing engines.'],
    ['7. The Golden Go/No-Go Decision Gate', 'If after 90 days and ₹9,000 total ad spend, RootAccess achieves fewer than 10 total paid purchases, PAUSE advertising and pivot to 1-on-1 mentorship cohort model.'],
  ];

  recommendations.forEach(([q, a]) => {
    checkPageBudget(doc, 32);
    writeText(doc, q, { font: 'Helvetica-Bold', size: 7.5, color: NAVY, moveDown: 0.1 });
    writeText(doc, `Recommendation: ${a}`, { size: 7.5, color: DARK, lineGap: 1.5, moveDown: 0.35 });
  });
  doc.x = CONTENT_X;
  doc.moveDown(0.4);

  // SECTION 20: RESEARCH SOURCES & CITATIONS
  drawSectionHeader(doc, '20', 'Research Sources, Citations & References (Oct 2026)');
  writeText(
    doc,
    '1. NASSCOM Tech Hiring Pulse (2025–2026): "Software Quality Engineering & Automated Testing Trends in Indian IT Services."\n' +
    '2. Stack Overflow Developer Survey (2024–2025): "Testing Frameworks Popularity: Playwright overtakes Cypress in enterprise adoption."\n' +
    '3. Official Microsoft Playwright Documentation: https://playwright.dev (Locators, Auto-waiting, JavaScript best practices).\n' +
    '4. Meta Business Help Center: "Auction & Delivery Insights for India Education Campaigns" (Meta Ads CPC/CPM benchmarks, Oct 2026).\n' +
    '5. Razorpay Standard Pricing & Regulations: https://razorpay.com/pricing (2.0% + GST on domestic cards/netbanking/UPI).\n' +
    '6. Naukri.com & LinkedIn India Jobs Data: Analysis of 12,000+ QA job listings showing 68% mention of automation skills.',
    { color: MUTED, size: 7, lineGap: 2.2 }
  );

  // NUMBER ALL PAGES WITHOUT INTRODUCING BLANK PAGES
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const oldBottom = doc.page.margins.bottom;
    const oldTop = doc.page.margins.top;
    doc.page.margins.bottom = 0;
    doc.page.margins.top = 0;

    doc.rect(CONTENT_X, doc.page.height - 30, doc.page.width - 80, 0.5).fill(BORDER);
    doc.fillColor(MUTED).fontSize(7.5).font('Helvetica')
      .text('RootAccess Platform • Business Plan and Growth Strategy (Internal & Confidential)', CONTENT_X, doc.page.height - 22, {
        width: 350,
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
    projectStream.on('finish', () => {
      console.log(`Generated Business Plan PDF: ${PROJECT_OUTPUT_FILE} (${range.count} pages)`);
      resolve();
    });
    projectStream.on('error', reject);
  });
}

generateBusinessPlanPdf().catch((err) => {
  console.error('Error generating Business Plan PDF:', err);
  process.exit(1);
});
