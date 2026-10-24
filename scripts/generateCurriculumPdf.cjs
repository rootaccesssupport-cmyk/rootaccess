const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Curriculum data structure extracted from curriculumData.ts
const CURRICULUM = [
  {
    trackId: 'track-manual-qa',
    trackName: 'Track 1: Manual QA & Defect Life Cycle Masterclass',
    badge: 'Core Foundation Track',
    estimatedHours: '8 Hours',
    description: 'Master practical test case design, Equivalence Partitioning, Boundary Value Analysis, Jira defect reporting, and regression test suites.',
    learningOutcomes: [
      'Write exhaustive, professional test cases using industry templates',
      'Apply Boundary Value Analysis (BVA) and Equivalence Partitioning (EP) to spot edge-case bugs',
      'Log clear, reproducible Jira bug reports with appropriate Severity and Priority levels',
      'Execute Smoke, Sanity, Regression, and Retesting verification cycles with confidence',
    ],
    lessons: [
      {
        title: 'Lesson 1: Software Testing Life Cycle (STLC) & Modern QA Workflows',
        duration: '25 Minutes',
        difficulty: 'Beginner',
        summary: 'Understand the distinct phases of the STLC, from requirements analysis to test closure, and how QA fits into modern Agile/Scrum teams.',
        keyTopics: [
          'The 6 Core Phases: Requirement Analysis, Test Planning, Test Design, Environment Setup, Execution, and Sign-off',
          'Shifting Testing Left: Involving QA during sprint grooming to prevent 60% of requirement ambiguities',
          'Evaluating Positive (happy path) vs Negative (error & edge) test scenarios',
          'Gherkin BDD syntax and test requirement decomposition',
        ],
        takeaways: [
          'STLC runs concurrently with SDLC to catch bugs before code reaches production.',
          'Early QA involvement during sprint grooming is 10x cheaper than fixing bugs in production.',
          'Always evaluate both Positive flows and Negative edge condition flows.',
        ],
      },
      {
        title: 'Lesson 2: Test Design Techniques: Boundary Value Analysis (BVA) & Equivalence Partitioning (EP)',
        duration: '35 Minutes',
        difficulty: 'Intermediate',
        summary: 'Learn the two most important mathematical test design techniques used by senior QA engineers to catch edge-case bugs with minimum test cases.',
        keyTopics: [
          'Equivalence Partitioning: Dividing input domains into valid and invalid classes to eliminate redundancy',
          'Boundary Value Analysis: Testing Min, Min-1, Min+1, Max, Max-1, Max+1 boundaries',
          'Why BVA is critical: Developers most frequently commit off-by-one errors (>= vs >)',
          'Real-world boundary bugs: Cart quantity validation, character limit overflows, password boundaries',
        ],
        takeaways: [
          'EP categorizes inputs into equivalence classes to reduce total test combinations.',
          'BVA focuses on the exact transition points where software logic flips from valid to invalid.',
          'Testing (Min - 1), Min, Max, and (Max + 1) catches 80% of input validation defects.',
        ],
      },
      {
        title: 'Lesson 3: Workplace Defect Logging: Jira Bug Report Standards',
        duration: '30 Minutes',
        difficulty: 'Intermediate',
        summary: 'Learn how to write crisp, irreproachable bug reports in Jira that developers love. Master Severity vs Priority distinctions.',
        keyTopics: [
          'Standard Jira Fields: Title ([Module] What happens under condition), Environment, Preconditions, Steps to Reproduce (numbered), Expected vs Actual, Attachments',
          'Severity vs Priority: Technical Impact (Blocker/Critical/Major/Minor) vs Business Urgency (P0/P1/P2/P3)',
          'Defect Life Cycle states: Open, In Progress, Ready for QA, Retested & Verified, Closed, Deferred',
        ],
        takeaways: [
          'Titles must follow: [Feature/Component] Specific failure description under condition.',
          'Steps to reproduce must be numbered, deterministic, and start from a clean state.',
          'Severity is determined by technical impact; Priority is determined by business urgency.',
        ],
      },
    ],
    quizTitle: 'Manual QA & Defect Life Cycle Certification Quiz (4 Questions, 75% Passing)',
    labTitle: 'Workplace Defect Simulation Lab: E-Commerce Checkout Defect Hunt (4 Real Bugs)',
  },
  {
    trackId: 'track-sql',
    trackName: 'Track 2: SQL & Backend Database Audits for QA Engineers',
    badge: 'Backend Integrity Track',
    estimatedHours: '6 Hours',
    description: 'Learn to verify backend data integrity, write multi-table JOINs, detect orphaned records, and validate database transactions during API and UI testing.',
    learningOutcomes: [
      'Write production-grade SQL queries to verify frontend transactions against database tables',
      'Use INNER, LEFT, and RIGHT JOINs to detect missing or orphaned foreign key records',
      'Identify NULL edge cases, duplicate entries, and timestamp inconsistencies in staging databases',
      'Audit user balances, inventory decrements, and status state changes using aggregate functions',
    ],
    lessons: [
      {
        title: 'Lesson 1: Verifying Frontend Transactions Against Relational Tables',
        duration: '30 Minutes',
        difficulty: 'Beginner',
        summary: 'Learn how to inspect the database after submitting a UI form or calling a payment endpoint to confirm true persistence.',
        keyTopics: [
          'Why UI success banners can deceive: asynchronous write failures and uncommitted transactions',
          'Writing SELECT queries with WHERE filters to audit orders, payment_status, and created_at timestamps',
          'Auditing inventory decrements and transactional line items in child tables',
        ],
        takeaways: [
          'Always verify both UI feedback and backend database state.',
          'Check that inventory, balance, and state flags reflect the transaction accurately.',
          'Confirm timestamps use UTC and are ordered properly.',
        ],
      },
      {
        title: 'Lesson 2: Multi-Table JOINs & Finding Orphaned Data Defects',
        duration: '35 Minutes',
        difficulty: 'Intermediate',
        summary: 'Master SQL JOIN techniques to uncover referential integrity flaws and orphaned records in staging environments.',
        keyTopics: [
          'LEFT JOIN with WHERE parent.id IS NULL to isolate orphaned child records',
          'Auditing duplicate transactions and race conditions with GROUP BY and HAVING COUNT(*) > 1',
          'Data migration audits: ensuring foreign keys and data types remain intact',
        ],
        takeaways: [
          'LEFT JOIN with WHERE parent.id IS NULL reveals orphaned data.',
          'GROUP BY with HAVING COUNT(*) > 1 is essential for duplicate payment testing.',
          'Database audits reveal edge cases invisible to the browser UI.',
        ],
      },
    ],
    quizTitle: 'SQL for QA Engineers Certification Quiz (3 Questions, 75% Passing)',
    labTitle: 'SQL Database Verification Queries in Test Environments',
  },
  {
    trackId: 'track-api',
    trackName: 'Track 3: API Testing & Automation with Postman',
    badge: 'API & Microservices Track',
    estimatedHours: '7 Hours',
    description: 'Learn REST API architectures, request parameterization, Bearer token authentication, status codes, and writing automated Chai assertion scripts in Postman.',
    learningOutcomes: [
      'Understand HTTP methods (GET, POST, PUT, PATCH, DELETE) and HTTP status codes (2xx, 4xx, 5xx)',
      'Construct automated test scripts using Postman and Chai assertion library (pm.test, pm.expect)',
      'Extract dynamic response values (JWT tokens, resource IDs) and save them into environment variables',
      'Test edge cases: expired tokens, invalid payloads, SQL injection parameters, and rate limiting',
    ],
    lessons: [
      {
        title: 'Lesson 1: HTTP Methods, Status Codes & Request Payloads',
        duration: '25 Minutes',
        difficulty: 'Beginner',
        summary: 'Deep dive into REST API architecture, request headers, query vs path parameters, and HTTP response codes.',
        keyTopics: [
          'Anatomy of an HTTP Request: Method, Endpoint URL, Headers, Query vs Path Params, Request Body',
          'Status Codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable, 500 Server Error',
          'Common API Anti-Pattern: Returning 200 OK with an error payload inside the body',
        ],
        takeaways: [
          'POST should return 201 Created with the new resource ID in the response body.',
          'Never accept a 200 OK status when the response body contains an error message (anti-pattern).',
          '500 Internal Server Error indicates an unhandled backend exception that requires a bug report.',
        ],
      },
      {
        title: 'Lesson 2: Writing Automated Postman Assertions with Chai',
        duration: '35 Minutes',
        difficulty: 'Intermediate',
        summary: 'Write test scripts in Postman to assert status codes, response time, JSON schema validation, and header security.',
        keyTopics: [
          'Using pm.test and pm.expect for status code, SLA latency (<500ms), and schema checks',
          'Chaining requests: Capturing JWT access_token from login and saving to pm.environment.set()',
          'Negative testing: Sending malformed JSON, empty bodies, and expired authentication headers',
        ],
        takeaways: [
          'Use pm.response.to.have.status() for response code verification.',
          'Validate response times against company performance SLAs.',
          'Chain API requests by saving response tokens into Postman environment variables.',
        ],
      },
    ],
    quizTitle: 'API Testing & Postman Certification Quiz (3 Questions, 75% Passing)',
    labTitle: 'Postman Collection Runner & Environment Token Chaining Lab',
  },
  {
    trackId: 'track-automation',
    trackName: 'Track 4: Modern Web Automation with Playwright & TypeScript',
    badge: 'Automation Engineering Track',
    estimatedHours: '9 Hours',
    description: 'Learn modern browser automation using Playwright. Master reliable locator strategies, auto-waiting, Page Object Models, and flaky test mitigation.',
    learningOutcomes: [
      'Write robust end-to-end tests using Playwright Test Runner and TypeScript',
      'Use user-facing locators (getByRole, getByLabel, getByText) recommended by W3C standards',
      'Leverage Playwright auto-waiting to eliminate arbitrary sleep timers and flaky test failures',
      'Structure test suites with the Page Object Model (POM) pattern for high maintainability',
    ],
    lessons: [
      {
        title: 'Lesson 1: Robust Locators, Actions & Web-First Assertions',
        duration: '30 Minutes',
        difficulty: 'Intermediate',
        summary: 'Learn why XPath and brittle CSS selectors cause test flakiness, and how to use Playwright accessibility-based locators.',
        keyTopics: [
          'Recommended locator hierarchy: getByRole, getByLabel, getByPlaceholder, getByText, getByTestId',
          'Why brittle selectors like xpath=//div[3]/form/button[2] break on redesigns',
          'Web-First Assertions: Automatic polling with expect(locator).toBeVisible() without hardcoded sleeps',
          'Writing an End-to-End User Login and Dashboard Verification test script in TypeScript',
        ],
        takeaways: [
          'Prioritize getByRole and getByLabel over raw CSS selectors or XPath.',
          'Playwright auto-waits before executing clicks, fills, and assertions.',
          'Never use arbitrary page.waitForTimeout(5000); let web-first assertions handle timing.',
        ],
      },
    ],
    quizTitle: 'Playwright Automation Certification Quiz (2 Questions, 75% Passing)',
    labTitle: 'Playwright E2E Test Suite Execution against Local Staging App',
  },
  {
    trackId: 'track-interview',
    trackName: 'Track 5: QA Interview Mastery & Career Blueprint',
    badge: 'Career & Placement Track',
    estimatedHours: '5 Hours',
    description: 'Prepare for behavioral, scenario-based, and technical QA interviews with the STAR technique, bug triage negotiation, and salary benchmarking.',
    learningOutcomes: [
      'Structure behavioral answers using the STAR method (Situation, Task, Action, Result)',
      'Handle classic interview traps: "How would you test a vending machine?" or "Developer says It works on my machine"',
      'Negotiate defect severity vs release deadlines with engineering managers and product owners',
      'Build a portfolio with GitHub automation repositories and demonstrable defect logs',
    ],
    lessons: [
      {
        title: 'Lesson 1: Mastering the STAR Framework for QA Behavioral Questions',
        duration: '25 Minutes',
        difficulty: 'Beginner',
        summary: 'Learn how to answer high-impact behavioral questions with real evidence and quantifiable achievements.',
        keyTopics: [
          'The STAR Framework breakdown: Situation, Task, Action (what YOU did), and Measurable Result',
          'Deconstructing: "What do you do if a developer rejects your bug saying it works on my machine?"',
          'Step-by-step resolution: clean cache, verify environment alignment, pair-debug, refer to Acceptance Criteria',
          'How to test physical/abstract objects in interviews (clarifying questions, functional, non-functional, boundary, stress)',
        ],
        takeaways: [
          'Always quantify results in STAR answers (time saved, bugs prevented).',
          'Frame developer disagreements as collaborative debugging sessions, not confrontations.',
          'Product Acceptance Criteria is the ultimate source of truth.',
        ],
      },
    ],
    quizTitle: 'QA Interview Mastery Certification Quiz (1 Comprehensive Scenario, 75% Passing)',
    labTitle: 'Daily Technical Interview Scenario & Live Rubric Evaluation',
  },
];

const DEFECT_SIMULATION_LABS = [
  {
    id: 'bug-1',
    name: 'Cart Allows Zero or Negative Quantity',
    area: 'Shopping Cart Quantity Input',
    severity: 'Critical',
    description: 'Input fails to enforce min=1. Entering negative integers recalculates total to negative, generating fraudulent credits.',
  },
  {
    id: 'bug-2',
    name: 'Coupon SAVE50 Triggers Negative Balance',
    area: 'Discount Coupon Box',
    severity: 'Critical',
    description: 'Applying $50 discount on orders under $50 fails to clamp minimum total at $0.00, allowing zero/negative checkout.',
  },
  {
    id: 'bug-3',
    name: 'Phone Field Error Fails to Display Error Message',
    area: 'Shipping Address Phone Number',
    severity: 'Major',
    description: 'Form submission silently aborts on empty or invalid phone without focusing or presenting an accessible error message.',
  },
  {
    id: 'bug-4',
    name: 'Delivery Instructions Note Reflects Unescaped Text',
    area: 'Delivery Notes Preview',
    severity: 'Major',
    description: 'Courier preview card renders customer instructions without HTML sanitization, leaving system vulnerable to script injection.',
  },
];

function generatePDF(outputPath) {
  const doc = new PDFDocument({
    margin: 40,
    size: 'A4',
    bufferPages: true,
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Palette
  const PRIMARY = '#312E81'; // Deep Indigo
  const ACCENT = '#4F46E5';  // Brand Indigo
  const DARK = '#0F172A';    // Slate 900
  const MUTED = '#475569';   // Slate 600
  const LIGHT_BG = '#F8FAFC';// Slate 50
  const BORDER = '#E2E8F0';  // Slate 200
  const GREEN = '#059669';   // Emerald 600

  // --- COVER / HEADER ---
  doc.rect(40, 40, 515, 115).fill('#EEF2FF');
  doc.rect(40, 40, 6, 115).fill(ACCENT);

  doc.fillColor(PRIMARY).fontSize(22).font('Helvetica-Bold').text('RootAccess', 56, 55);
  doc.fillColor(DARK).fontSize(14).font('Helvetica-Bold').text('QA & Software Testing Engineer Curriculum', 56, 82);
  doc.fillColor(MUTED).fontSize(9).font('Helvetica').text('Comprehensive Course Syllabus, Tracks, Lesson Outcomes, Quizzes & Defect Labs', 56, 102);
  doc.fillColor(ACCENT).fontSize(8).font('Helvetica-Bold').text('VERSION: 2026.1 • REVISION DOCUMENT FOR CURRICULUM UPDATES', 56, 122);

  doc.moveDown(4.5);

  // Executive Summary Card
  doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('1. Program Executive Overview');
  doc.rect(40, doc.y + 4, 515, 1).fill(BORDER);
  doc.moveDown(0.8);

  doc.fillColor(MUTED).fontSize(9).font('Helvetica').text(
    'RootAccess is an industry-grade career learning platform designed to bridge the gap between textbook testing theory and real-world workplace execution. This curriculum document outlines the 5 core tracks, detailed lesson topics, practical checklists, certification quizzes, and workplace simulation labs present in the current release. Use this document to audit coverage, adjust lesson durations, add new technical tracks, or refine interview scenarios.',
    { lineGap: 3 }
  );

  doc.moveDown(1.2);

  // Stats Grid
  const startY = doc.y;
  const colWidth = 120;
  const stats = [
    { label: 'Career Tracks', val: '5 Active Tracks' },
    { label: 'Total Training', val: '~35 Est. Hours' },
    { label: 'Core Lessons', val: '9 In-Depth Lessons' },
    { label: 'Defect Simulator', val: '4 Live Bug Scenarios' },
  ];

  stats.forEach((s, idx) => {
    const x = 40 + idx * 130;
    doc.rect(x, startY, 120, 45).fillAndStroke(LIGHT_BG, BORDER);
    doc.fillColor(ACCENT).fontSize(12).font('Helvetica-Bold').text(s.val, x + 8, startY + 10, { width: 104, align: 'center' });
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(s.label, x + 8, startY + 28, { width: 104, align: 'center' });
  });

  doc.y = startY + 60;

  // --- TRACKS BREAKDOWN ---
  doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('2. Complete Track & Lesson Breakdown');
  doc.rect(40, doc.y + 4, 515, 1).fill(BORDER);
  doc.moveDown(0.8);

  CURRICULUM.forEach((track, tIdx) => {
    // Check page budget
    if (doc.y > 680) {
      doc.addPage();
    }

    // Track Header
    doc.fillColor(PRIMARY).fontSize(11).font('Helvetica-Bold').text(track.trackName);
    doc.fillColor(ACCENT).fontSize(8).font('Helvetica-Bold').text(`${track.badge}  •  Estimated: ${track.estimatedHours}`);
    doc.fillColor(MUTED).fontSize(8.5).font('Helvetica').text(track.description, { lineGap: 2 });
    doc.moveDown(0.5);

    // Learning Outcomes
    doc.fillColor(DARK).fontSize(8.5).font('Helvetica-Bold').text('Target Learning Outcomes:');
    track.learningOutcomes.forEach((outcome) => {
      doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(`  •  ${outcome}`, { lineGap: 1.5 });
    });
    doc.moveDown(0.5);

    // Lessons
    doc.fillColor(DARK).fontSize(8.5).font('Helvetica-Bold').text('Lesson Modules:');
    track.lessons.forEach((lesson, lIdx) => {
      if (doc.y > 700) doc.addPage();

      doc.fillColor(ACCENT).fontSize(8).font('Helvetica-Bold').text(`    [${lesson.difficulty.toUpperCase()} • ${lesson.duration}] ${lesson.title}`);
      doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(`    Summary: ${lesson.summary}`, { lineGap: 1 });
      
      doc.fillColor(DARK).fontSize(7.5).font('Helvetica-Bold').text('    Key Detailed Topics:');
      lesson.keyTopics.forEach((top) => {
        doc.fillColor(MUTED).fontSize(7.5).font('Helvetica').text(`      - ${top}`);
      });
      doc.moveDown(0.4);
    });

    // Quiz & Lab
    doc.fillColor(GREEN).fontSize(8).font('Helvetica-Bold').text(`  ✓ ${track.quizTitle}`);
    if (track.labTitle) {
      doc.fillColor('#9333EA').fontSize(8).font('Helvetica-Bold').text(`  ⚡ ${track.labTitle}`);
    }

    doc.moveDown(0.8);
    doc.rect(40, doc.y, 515, 0.5).fill(BORDER);
    doc.moveDown(0.8);
  });

  // --- DEFECT SIMULATOR APPENDIX ---
  if (doc.y > 620) doc.addPage();

  doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('3. Workplace Defect Simulation Lab Scenarios');
  doc.rect(40, doc.y + 4, 515, 1).fill(BORDER);
  doc.moveDown(0.8);

  doc.fillColor(MUTED).fontSize(8.5).font('Helvetica').text(
    'Students practice in a live sandbox e-commerce application (RootShop Checkout) with 4 real defects seeded for discovery and Jira bug logging:',
    { lineGap: 2 }
  );
  doc.moveDown(0.5);

  DEFECT_SIMULATION_LABS.forEach((bug) => {
    if (doc.y > 720) doc.addPage();
    doc.fillColor('#DC2626').fontSize(8.5).font('Helvetica-Bold').text(`• Defect: ${bug.name} [Severity: ${bug.severity}]`);
    doc.fillColor(DARK).fontSize(8).font('Helvetica-Bold').text(`  Target Area: ${bug.area}`);
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(`  Technical Root Cause: ${bug.description}`, { lineGap: 1 });
    doc.moveDown(0.4);
  });

  doc.moveDown(1);
  doc.fillColor(DARK).fontSize(13).font('Helvetica-Bold').text('4. Curriculum Revision & Customization Guide');
  doc.rect(40, doc.y + 4, 515, 1).fill(BORDER);
  doc.moveDown(0.8);

  doc.fillColor(MUTED).fontSize(8.5).font('Helvetica').text(
    'To update or expand this curriculum, edit the primary data store at src/data/curriculumData.ts. You can add:\n1. New Courses/Tracks: Cypress, Selenium Java, CI/CD with GitHub Actions, Performance testing with k6/JMeter.\n2. More Lessons & Code Snippets: Gherkin syntax, Playwright fixtures, SQL window functions, JWT security tests.\n3. Custom Certification Quizzes: Add scenario questions, multi-select questions, and pass thresholds.\n4. Additional Defect Simulation Scenarios: API mocking bugs, slow network latency simulations, SQL injection flaws.',
    { lineGap: 2.5 }
  );

  // --- FOOTER & PAGE NUMBERING ---
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.rect(40, 800, 515, 0.5).fill(BORDER);
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(
      'RootAccess QA Engineering Curriculum Syllabus  •  Confidential & Proprietary',
      40,
      810
    );
    doc.fillColor(MUTED).fontSize(8).font('Helvetica').text(
      `Page ${i + 1} of ${range.count}`,
      480,
      810,
      { width: 75, align: 'right' }
    );
  }

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
}

// Generate to project root and public folder
const rootPdfPath = path.join(__dirname, '..', 'RootAccess_QA_Curriculum_Syllabus.pdf');
const publicPdfPath = path.join(__dirname, '..', 'public', 'RootAccess_QA_Curriculum_Syllabus.pdf');

generatePDF(rootPdfPath)
  .then(() => {
    fs.copyFileSync(rootPdfPath, publicPdfPath);
    console.log('PDF successfully generated at:');
    console.log('1. Project Root: ' + rootPdfPath);
    console.log('2. Public Web:   ' + publicPdfPath);
  })
  .catch((err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
