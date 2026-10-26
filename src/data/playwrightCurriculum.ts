import type { PlaywrightDay1Unit, PlaywrightScenarioRow } from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_1_DATA: PlaywrightDay1Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 1,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Automation Testing and Playwright Fundamentals',
  subtitle: 'A foundational introduction to browser automation, Playwright architecture, comparison with Selenium, and the 20-day learning roadmap.',
  level: 'Beginner',
  estimatedHours: '2–3 Hours',
  prerequisites: 'Basic computer knowledge. No previous Playwright experience required.',
  learningObjectives: [
    'Understand software test automation and identify when and why teams automate tests',
    'Evaluate trade-offs between manual testing and automated test execution',
    'Identify high-ROI test scenarios for automation vs tests best suited for manual exploration',
    'Explain Playwright fundamentals: browser engines (Chromium, Firefox, WebKit), headless execution, and auto-waiting',
    'Compare Playwright with Selenium objectively across architecture, synchronization, and ecosystem',
    'Understand the 9-stage automation testing workflow and the distinction between Browser, Context, and Page',
    'Familiarize with the core developer tooling (Node.js, npm, VS Code, JavaScript, Git) and the 20-day course roadmap',
  ],

  topics: [
    // -----------------------------------------------------------------------
    // TOPIC 1: Introduction to Automation Testing
    // -----------------------------------------------------------------------
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: Introduction to Automation Testing',
      durationMinutes: 25,
      explanation: `Software testing is the systematic process of verifying that an application functions according to business specifications, protects user security, and delivers a reliable user experience.

### What Test Automation Means
Test automation is the practice of using software tools and scripts to execute predefined test cases, simulate human user interactions, compare actual outcomes with expected outcomes, and report pass/fail verdicts automatically without manual human intervention.

### Why Companies Automate Tests
1. **Speed & Rapid Feedback:** Automated test suites can run in minutes during Continuous Integration (CI), giving developers immediate feedback on whether new code broke existing features.
2. **Reliability & Consistency:** Machines execute the exact steps and test data with mathematical precision, eliminating human fatigue and accidental oversights during repetitive checks.
3. **High Regression Coverage:** As an application grows from 10 to 500 features, executing all regression tests manually becomes impossible within a 2-week sprint. Automation runs hundreds of regression tests overnight or on every git commit.
4. **Cost Efficiency Over Time:** While automation has an upfront cost (script writing and environment setup), it drastically reduces cost-per-execution over months of releases.

### Automation Does Not Replace All Manual Testing
A common industry misconception is that automation eliminates the need for manual testers. In reality, **automated tests only verify what you explicitly instruct them to verify**. They cannot notice visual awkwardness, judge intuitive user experience, or explore unexpected edge cases.

### What to Automate vs What to Test Manually
• **Prime Candidates for Automation:**
  - Repetitive regression tests executed on every release build.
  - Smoke / Sanity tests verifying critical paths (e.g. user login, checkout payment).
  - Data-driven tests requiring hundreds of diverse input combinations.
  - Complex multi-step mathematical calculations (e.g. taxes, discounts, shipping fees).
  - Cross-browser compatibility tests across Chromium, Firefox, and WebKit.

• **Best Suited for Manual or Exploratory Testing:**
  - Newly built features with unstable, frequently changing UI designs.
  - One-time or ad-hoc validation tests.
  - User experience (UX), visual appeal, font clarity, and subjective usability.
  - Exploratory testing where human curiosity uncovers unexpected boundary conditions.

### The Role of an Automation QA Engineer
An automation QA engineer is not merely a "coder." You analyze requirements, design reliable test scenarios, architect maintainable test frameworks, investigate intermittent test failures, and collaborate with developers to uphold software quality gates.`,
      keyTakeaways: [
        'Test automation uses scripts to execute tests and verify expected results without manual intervention.',
        'Automation shines at repetitive regression, multi-browser tests, and data-driven calculations.',
        'Manual and exploratory testing remain essential for UX, usability, and brand-new features.',
        'Automation is a multiplier for human QA teams, not a complete replacement.',
      ],
      terminology: [
        { term: 'Software Testing', definition: 'Evaluating an application to verify compliance with requirements and detect defects.' },
        { term: 'Test Automation', definition: 'Using software tools to execute tests and compare outcomes automatically.' },
        { term: 'Regression Testing', definition: 'Testing unchanged areas of an application after code changes to ensure nothing broke.' },
        { term: 'Exploratory Testing', definition: 'Simultaneous learning, test design, and test execution driven by human curiosity.' },
      ],
      examples: [
        {
          title: 'Repeated Login Regression Checks',
          description: 'A website has 4 user roles (Admin, Student, Instructor, Guest). Running login tests manually across 3 browsers takes 40 minutes every day. An automated Playwright script verifies all roles across 3 browsers in 12 seconds.',
        },
        {
          title: 'Exploratory Testing on a New Feature',
          description: 'A new voice-search feature is launched. A human tester notices that background ambient noise or fast speech triggers misleading search results—a subtle nuance automated scripts would not easily catch without human intuition.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // TOPIC 2: What Is Playwright?
    // -----------------------------------------------------------------------
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: What Is Playwright?',
      durationMinutes: 30,
      explanation: `Playwright is an open-source, modern browser automation framework developed and maintained by Microsoft. It enables reliable end-to-end (E2E) testing, component testing, and API testing for modern web applications.

### Understanding Browser Automation
Browser automation means controlling a real web browser programmatically via code. Your script tells the browser: "Navigate to localhost:5173", "Type an email", "Click the Sign In button", and "Verify that the dashboard URL loads."

### What Is Playwright Test?
Playwright comes with **Playwright Test**, a comprehensive, enterprise-grade test runner specifically built for end-to-end automation. It provides:
• Native test runner with parallel execution out of the box.
• Built-in Web-First Assertions with smart polling.
• Automatic browser driver management (Chromium, Firefox, WebKit).
• Rich debugging tools: Playwright UI mode, VS Code extension, and Trace Viewer.
• HTML reporting with video recordings, screenshots, and DOM snapshots.

### Supported Browser Engines
Unlike older tools that relied on third-party browser drivers, Playwright natively supports the three core rendering engines powering over 99% of web traffic:
1. **Chromium:** Powers Google Chrome, Microsoft Edge, Brave, and Opera.
2. **Firefox:** Powers Mozilla Firefox.
3. **WebKit:** Powers Apple Safari (iOS and macOS).

*Cross-Browser Testing:* You write your test script once in JavaScript, and Playwright can execute it across Chromium, Firefox, and WebKit simultaneously on Linux, macOS, and Windows.

### Headless vs Headed Execution
• **Headed Mode:** The browser opens visibly with a graphical user interface window on your monitor. You can see the clicks, navigation, and typing in real time. Great for local debugging!
• **Headless Mode:** The browser runs silently in memory without opening a physical graphical window. This is significantly faster, uses fewer system resources, and is the standard mode used in CI/CD build servers (like GitHub Actions).

### Auto-Waiting: Why Playwright Tests Are Resilient
In legacy frameworks, scripts frequently failed because the script tried to click a button before the JavaScript on the page finished loading. 

Playwright solves this fundamentally through **Auto-Waiting**: before performing an action (such as \`click()\` or \`fill()\`), Playwright automatically performs actionability checks to verify that the element is:
1. Attached to the DOM.
2. Visible (not hidden by CSS or opacity 0).
3. Stable (not animating or sliding across the screen).
4. Enabled (not disabled).
5. Ready to receive pointer events (not blocked by a loading overlay).

### Playwright vs The Application Under Test
It is vital to distinguish between:
• **The Application Under Test (AUT):** The website you are testing (e.g. RootAccess web portal built with React).
• **The Automation Tooling (Playwright):** The independent test framework written in JavaScript running in Node.js that drives the browser and assesses the AUT.

*Note on API Testing:* While Playwright is famous for browser UI automation, it also natively provides an HTTP client (\`request\`) for lightning-fast API testing, which we will explore later in the course!`,
      keyTakeaways: [
        'Playwright is Microsoft\'s open-source framework for reliable modern browser automation.',
        'It natively supports Chromium, Firefox, and WebKit with zero external driver installations.',
        'Headless mode executes in background memory for CI/CD speed; headed mode opens a visible browser.',
        'Auto-waiting eliminates arbitrary sleep timers and resolves flaky tests by waiting for element readiness.',
      ],
      terminology: [
        { term: 'Browser Engine', definition: 'The core software component (Chromium, Firefox, WebKit) that renders HTML/CSS and runs JavaScript.' },
        { term: 'Headless Mode', definition: 'Running a browser without a visible graphical user interface for faster automated execution.' },
        { term: 'Auto-Waiting', definition: 'Playwright\'s built-in mechanism that checks element actionability before performing actions.' },
        { term: 'Application Under Test (AUT)', definition: 'The target web application being evaluated by automated test scripts.' },
      ],
      examples: [
        {
          title: 'Cross-Engine Compatibility in Action',
          description: 'A CSS flexbox layout renders correctly on Chrome (Chromium) but clips the submit button on Safari (WebKit). Running the Playwright test across both engines catches this defect in seconds before customer deployment.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // TOPIC 3: Playwright vs Selenium
    // -----------------------------------------------------------------------
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Playwright vs Selenium',
      durationMinutes: 25,
      explanation: `When entering test automation, one of the first questions engineers ask is: *"How does Playwright compare to Selenium?"*

Selenium has been the undisputed industry standard for over 15 years. It is an open-source, W3C-standardized tool maintained by a massive global community. Playwright was introduced more recently to solve specific modern architectural challenges of Single-Page Applications (SPAs) and dynamic JavaScript frameworks.

### Balanced Comparison Matrix
Neither tool is "always better." The right choice depends on the project's technology stack, legacy investments, and organizational goals.

| Feature / Dimension | Playwright | Selenium WebDriver |
| :--- | :--- | :--- |
| **Architecture & Protocol** | Communicates directly with browser rendering engines via single WebSocket connection (Chrome DevTools Protocol / CDP). | Uses HTTP REST requests through intermediary browser drivers (ChromeDriver, geckodriver) following W3C WebDriver spec. |
| **Speed & Efficiency** | Extremely fast. Single WebSocket connection keeps overhead minimal. | Moderate. Every single command requires an HTTP request/response cycle through an external driver executable. |
| **Waiting & Synchronization** | Automatic, built-in actionability checks on all actions and web-first assertions. Almost eliminates flaky timeouts. | Manual synchronization required. Developers must explicitly configure \`WebDriverWait\` and ExpectedConditions. |
| **Browser Engines** | Bundles and manages Chromium, Firefox, and WebKit out of the box with zero external driver downloads. | Automates Chrome, Firefox, Safari, Edge, and older legacy browsers (IE11) using separate driver binaries. |
| **Test Runner & Reports** | Includes built-in \`@playwright/test\` runner, parallel execution, HTML reports, and interactive Trace Viewer. | Requires third-party runners (Mocha, Jest, JUnit, TestNG) and third-party reporters (Allure, ExtentReports). |
| **Language Support** | JavaScript, TypeScript, Python, Java, and C# (.NET). | Java, Python, C#, JavaScript, Ruby, PHP. |
| **Maturity & Community** | Newer, backed heavily by Microsoft with rapid release cycles and surging modern adoption. | 15+ years of production maturity, vast legacy codebase footprint, and enormous global StackOverflow support. |

### Why Selenium Remains Widely Used
Selenium is not "dead" or obsolete. Thousands of enterprise banking, healthcare, and telecom systems have mature test suites with millions of lines of Selenium Java code running in production. Furthermore, Selenium WebDriver is an official W3C web standard.

However, for modern dynamic web applications (React, Vue, Angular, Next.js), Playwright offers faster test execution, zero-configuration setup, native auto-waiting, and far fewer flaky test failures.`,
      keyTakeaways: [
        'Selenium communicates via HTTP through external drivers; Playwright connects via a high-speed direct WebSocket connection.',
        'Playwright includes native auto-waiting; Selenium requires explicit wait declarations.',
        'Selenium supports legacy browsers and has 15+ years of enterprise adoption.',
        'Playwright delivers an all-in-one developer experience with built-in runners, reporters, and trace tools.',
      ],
      terminology: [
        { term: 'Selenium WebDriver', definition: 'A browser automation framework that sends HTTP commands to browser drivers according to W3C standards.' },
        { term: 'Chrome DevTools Protocol (CDP)', definition: 'A low-level direct protocol used by modern tools like Playwright to inspect and control browser internals.' },
        { term: 'Flaky Test', definition: 'A test that produces inconsistent pass and fail results when executed repeatedly without code changes.' },
      ],
      examples: [
        {
          title: 'Handling a Dynamic Dropdown',
          description: 'In Selenium, selecting an option from an animated dropdown often requires 4 lines of `WebDriverWait` for visibility. In Playwright, `await page.locator("select").selectOption("Student")` auto-waits for the dropdown to be visible, stable, and populated.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // TOPIC 4: Understanding the Automation Testing Workflow
    // -----------------------------------------------------------------------
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Understanding the Automation Testing Workflow',
      durationMinutes: 30,
      explanation: `Writing automated tests is not about jumping straight into code. Professional QA follows a disciplined 9-stage engineering workflow:

### The 9-Stage Automation Testing Workflow
1. **Understand Application Requirements:** Thoroughly read user stories, acceptance criteria, and business logic.
2. **Identify Test Scenarios:** Determine the complete set of positive, negative, and edge-case user journeys.
3. **Decide Automation Candidates:** Select high-value, repetitive regression paths; leave one-off UX checks for manual exploration.
4. **Prepare Test Environment & Test Data:** Ensure staging databases have clean user accounts, test products, and API credentials.
5. **Write Automated Test Scripts:** Use clean JavaScript, maintainable locators, and clear assertions.
6. **Execute Tests:** Run tests locally in headed mode or against headless CI/CD test grids.
7. **Review Assertions, Failures & Reports:** Inspect HTML reports, screenshots, and logs to assess test outcomes.
8. **Investigate Failures:** Distinguish true application bugs from script locator defects or environment network glitches.
9. **Maintain Test Suites:** Update selectors and assertions as product design evolves over sprints.

---

### Core Concepts: Browser vs Browser Context vs Page
Understanding this 3-tier hierarchy is the foundation of Playwright architecture:

\`\`\`
┌────────────────────────────────────────────────────────┐
│  1. BROWSER (Chromium instance in memory)              │
│     ├── 2. BROWSER CONTEXT A (Incognito Profile 1)     │
│     │      ├── 3. PAGE (Tab 1: http://.../login)       │
│     │      └── PAGE (Tab 2: Checkout popup)            │
│     └── 2. BROWSER CONTEXT B (Incognito Profile 2)     │
│            └── PAGE (Tab 1: Admin dashboard)           │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Browser:** An instance of Chromium, Firefox, or WebKit. Launching a browser takes 1–2 seconds, so Playwright launches it once per worker thread.
2. **Browser Context:** A lightweight, completely isolated incognito browser session. Each context has its own cookies, localStorage, and cache. Creating a context takes only 2 milliseconds! This allows you to test two different users (e.g. Student vs Admin) in the same test without interference.
3. **Page:** A single tab or window inside a Browser Context where your script navigates, clicks, and asserts elements.

---

### Conceptual Example: Automating a Login Regression Scenario
On Day 1, you do not need to write working code yet. But here is what a clean, modern Playwright test written in **JavaScript** looks like conceptually:

\`\`\`javascript
// tests/login.spec.js (Pure JavaScript example)
const { test, expect } = require('@playwright/test');

test('User successfully logs in and views dashboard', async ({ page }) => {
  // 1. Navigate to the web application under test
  await page.goto('http://localhost:5173/login');

  // 2. Identify elements using user-facing accessible locators & fill data
  await page.getByLabel('Email address').fill('alex.student@rootaccess.org');
  await page.getByLabel('Password').fill('SecurePassword123!');

  // 3. Perform action: click the submit button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // 4. Assert expected result: verify redirection and heading visibility
  await expect(page).toHaveURL(/.*app/);
  await expect(page.getByRole('heading', { name: 'Student Dashboard' })).toBeVisible();
});
\`\`\`

Notice how intuitive the code reads:
• \`page.goto()\` navigates to the URL.
• \`page.getByLabel()\` finds form fields by their visible human label.
• \`expect(page).toHaveURL()\` automatically waits until the navigation completes.`,
      keyTakeaways: [
        'Automation follows a 9-stage engineering cycle from requirement review to ongoing suite maintenance.',
        'Browser represents the engine; Browser Context is an isolated incognito profile; Page is an individual tab.',
        'Playwright tests in this course are written in clean, modern JavaScript using .js files.',
        'Web-first assertions like expect(page).toHaveURL() poll automatically until the expectation succeeds.',
      ],
      terminology: [
        { term: 'Test Scenario', definition: 'A high-level description of what user flow or condition to test.' },
        { term: 'Test Script', definition: 'The automated program code (e.g. in JavaScript) that executes the test scenario.' },
        { term: 'Browser Context', definition: 'An isolated in-memory session with independent cookies and cache.' },
        { term: 'Page', definition: 'A single browser tab or window within a Browser Context.' },
        { term: 'Locator', definition: 'A view to an element on the page used to find and interact with DOM nodes.' },
        { term: 'Assertion', definition: 'A verification statement that confirms actual application state matches expected state.' },
      ],
      examples: [
        {
          title: 'Distinguishing Bug from Test Script Defect',
          description: 'A test fails because a developer changed the button label from "Submit" to "Confirm Order". The application works perfectly for users, but the test failed because the locator was outdated. This is a script maintenance issue, not an application bug.',
        },
      ],
    },

    // -----------------------------------------------------------------------
    // TOPIC 5: Tools and Course Roadmap
    // -----------------------------------------------------------------------
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Topic 5: Tools and Course Roadmap',
      durationMinutes: 20,
      explanation: `To build real-world test automation frameworks, engineers use an integrated developer toolkit. Here is the toolset we will use throughout this 20-day course:

### The Automation Engineering Toolkit
1. **Node.js:** The JavaScript runtime environment that executes JavaScript code outside a web browser on your computer. Playwright runs on Node.js.
2. **npm (Node Package Manager):** The default package manager for Node.js used to install libraries and tools (like \`@playwright/test\`).
3. **Visual Studio Code (VS Code):** The most popular modern code editor with outstanding Playwright extensions, syntax highlighting, and integrated terminal.
4. **JavaScript (ES6+):** The programming language of the web. This course teaches test automation using standard JavaScript, without requiring complex TypeScript configuration.
5. **Playwright Test Runner:** Microsoft's specialized test runner that discovers test files, manages browsers, runs assertions, and creates HTML reports.
6. **Git & GitHub:** Version control system used to track code revisions, collaborate on teams, and trigger automated tests in CI/CD pipelines.

*Note for Day 1:* You do **not** need to install software today. Day 2 will cover JavaScript essentials for testing, and Day 3 will guide you through hands-on Node.js and Playwright installation step by step!

---

### The 20-Day Course Curriculum Roadmap
Here is your journey from automation beginner to professional framework developer:`,
      keyTakeaways: [
        'Node.js runs our JavaScript test scripts; npm manages packages and dependencies.',
        'VS Code is the recommended code editor for writing and debugging tests.',
        'We use standard JavaScript throughout this course for simplicity and focus.',
        'Environment installation and your first executable test script happen on Day 3.',
      ],
      terminology: [
        { term: 'Node.js', definition: 'A cross-platform JavaScript runtime environment that executes JavaScript on machines.' },
        { term: 'npm', definition: 'Node Package Manager: downloads and manages third-party software packages and CLI tools.' },
        { term: 'Version Control (Git)', definition: 'A system that records changes to code over time so you can track history and collaborate.' },
      ],
      examples: [
        {
          title: 'How the Tools Connect Together',
          description: 'You write a test in VS Code using JavaScript → Node.js executes the script → npm manages the Playwright library → Playwright controls Chromium → Git tracks your changes.',
        },
      ],
    },
  ],

  // -------------------------------------------------------------------------
  // 20-DAY ROADMAP
  // -------------------------------------------------------------------------
  roadmap: [
    { day: 1, title: 'Day 1 — Automation Testing and Playwright Fundamentals', focus: 'What is automation, Playwright architecture, comparison with Selenium, and workflow.', isCurrent: true },
    { day: 2, title: 'Day 2 — JavaScript Essentials for Test Automation', focus: 'Variables, arrow functions, async/await, promises, arrays, and objects for testing.' },
    { day: 3, title: 'Day 3 — Environment Setup and First Playwright Test', focus: 'Installing Node.js, initializing Playwright in a project, and executing your first headed test.' },
    { day: 4, title: 'Day 4 — Locators and Element Identification', focus: 'Accessible locators (getByRole, getByLabel, getByText), CSS selectors, and filtering.' },
    { day: 5, title: 'Day 5 — Actions, Assertions and Web Forms', focus: 'Clicking, typing, radio buttons, checkboxes, dropdowns, and web-first assertions.' },
    { day: 6, title: 'Day 6 — Waiting Strategies and Reliable Tests', focus: 'Understanding auto-waiting, explicit waiting, eliminating flakiness, and timeouts.' },
    { day: 7, title: 'Day 7 — Navigation, Tabs, Frames and Dialogs', focus: 'Handling multiple tabs, iframe elements, JavaScript alerts, popups, and downloads.' },
    { day: 8, title: 'Day 8 — Page Object Model (POM) Architecture', focus: 'Structuring enterprise-grade test suites using clean Page Object Model architecture.' },
    { day: 9, title: 'Day 9 — API Testing and Network Interception', focus: 'Testing REST APIs using Playwright request context, validating status codes and JSON payloads.' },
    { day: 10, title: 'Day 10 — Test Fixtures, Hooks & Organisation', focus: 'beforeEach, afterEach, describe blocks, custom fixtures, and test structuring.' },
    { day: 11, title: 'Day 11 — Data-Driven Testing with JSON & CSV', focus: 'Reading JSON test fixtures, parameterized tests, and environmental variables.' },
    { day: 12, title: 'Day 12 — Authentication and Storage State Reuse', focus: 'Saving and reusing authentication state (storageState) to skip repeated logins.' },
    { day: 13, title: 'Day 13 — Visual Regression Testing & Screenshots', focus: 'Pixel diffing, toHaveScreenshot, snapshot baselines, and layout verification.' },
    { day: 14, title: 'Day 14 — CI/CD Pipeline Integration with GitHub Actions', focus: 'Configuring workers, cross-browser matrices, and automating tests via GitHub Actions.' },
    { day: 15, title: 'Day 15 — Debugging, Trace Viewer & Video', focus: 'Playwright UI mode, step-by-step inspector, Trace Viewer, screenshots, and HTML reports.' },
    { day: 16, title: 'Day 16 — AI-Assisted Test Automation & Prompting', focus: 'Prompting LLMs with DOM context, generating assertions, and evaluating test reliability.' },
    { day: 17, title: 'Day 17 — AI Self-Healing Locators & Root Cause Analysis', focus: 'Detecting UI mutations, fallback locator strategies, and AI failure diagnostics.' },
    { day: 18, title: 'Day 18 — Synthetic Test Data & Edge Case Generation', focus: 'Leveraging AI for diverse boundary data, schema fuzzing, and security edge cases.' },
    { day: 19, title: 'Day 19 — Capstone E-Commerce End-to-End Pipeline', focus: 'Production-ready e-commerce checkout regression pipeline with multi-browser coverage.' },
    { day: 20, title: 'Day 20 — Real-World Portfolio & Certification Exam', focus: 'Portfolio defense, comprehensive practical exam, and industry certification.' },
  ],

  // -------------------------------------------------------------------------
  // INTERVIEW QUESTIONS (10 Standard + 1 Scenario-Based)
  // -------------------------------------------------------------------------
  interviewQuestions: [
    {
      id: 'pw-int-1',
      questionNumber: 1,
      question: 'What is software test automation?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses foundational knowledge of automation principles and business benefits.',
      modelAnswer: 'Software test automation is the practice of using specialized software tools and code scripts to execute test cases, simulate user actions, compare actual outcomes with expected outcomes, and report defects automatically without manual intervention. It increases release velocity, improves regression coverage, and provides rapid feedback to engineering teams.',
      followUpQuestion: 'Does automating a test make it inherently better than executing it manually?',
    },
    {
      id: 'pw-int-2',
      questionNumber: 2,
      question: 'What is the difference between manual testing and automation testing?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses balanced understanding of when human testing is required vs when automation is optimal.',
      modelAnswer: 'Manual testing is conducted by human testers who interact directly with the application to evaluate usability, design aesthetics, and exploratory edge cases. Automation testing uses scripts to execute repetitive, predefined steps at high speed. Manual testing is best for new, exploratory, and UX testing; automation is best for repetitive regression suites, smoke tests, and data-driven calculations.',
      followUpQuestion: 'Can an automation test suite catch visual misalignment or poor UX navigation on its own?',
    },
    {
      id: 'pw-int-3',
      questionNumber: 3,
      question: 'What is Playwright?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses clarity on Playwright architecture, developer, and core capabilities.',
      modelAnswer: 'Playwright is an open-source browser automation framework developed by Microsoft for reliable end-to-end web testing. It controls modern browser engines (Chromium, Firefox, WebKit) via direct browser protocol connections, features native auto-waiting to eliminate flakiness, supports cross-browser and mobile-viewport emulation, and includes built-in test runners and trace debugging tools.',
      followUpQuestion: 'Which programming languages does Playwright officially support?',
    },
    {
      id: 'pw-int-4',
      questionNumber: 4,
      question: 'Which browser engines does Playwright support?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses technical accuracy regarding rendering engines vs commercial browser brands.',
      modelAnswer: 'Playwright supports three major browser rendering engines: 1. Chromium (powers Google Chrome, Microsoft Edge, Opera), 2. Firefox (powers Mozilla Firefox), and 3. WebKit (powers Apple Safari on iOS and macOS). Playwright bundles and manages these engines directly without requiring external driver binaries.',
      followUpQuestion: 'How does testing on WebKit in Playwright differ from testing on actual macOS Safari?',
    },
    {
      id: 'pw-int-5',
      questionNumber: 5,
      question: 'What is Playwright Test?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses understanding of Playwright\'s built-in test runner vs standalone automation library.',
      modelAnswer: 'Playwright Test (@playwright/test) is Playwright\'s comprehensive, dedicated test runner. It provides native test declarations (`test()`), describe blocks, web-first assertions (`expect()`), parallel execution across multiple worker processes, test fixtures, screenshot/video capture on failure, and rich HTML reporting.',
      followUpQuestion: 'Can Playwright be used with external runners like Jest or Mocha if an enterprise already uses them?',
    },
    {
      id: 'pw-int-6',
      questionNumber: 6,
      question: 'What is the difference between headed and headless execution?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses execution environment understanding and performance optimization.',
      modelAnswer: 'In headed mode, the browser opens a visible graphical user interface window on screen, allowing the engineer to visually observe clicks, page loads, and text input in real time. In headless mode, the browser executes silently in system memory without a GUI. Headless mode runs significantly faster, uses less CPU/memory, and is the standard mode used in CI/CD pipeline automation.',
      followUpQuestion: 'Why might a test pass in headed mode on your laptop but fail in headless mode on a Linux CI server?',
    },
    {
      id: 'pw-int-7',
      questionNumber: 7,
      question: 'What is regression testing?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses understanding of software change impact and test suite selection.',
      modelAnswer: 'Regression testing is the selective execution of test cases to verify that recent code changes, bug fixes, or enhancements have not introduced new defects or broken existing, unchanged functionality. Because regression suites must be executed repeatedly before every release, they are the primary candidate for automation.',
      followUpQuestion: 'How do QA teams choose between executing a full regression suite vs a smoke test suite?',
    },
    {
      id: 'pw-int-8',
      questionNumber: 8,
      question: 'What is the difference between Playwright and Selenium?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Evaluates architectural knowledge and objective comparison of automation tools.',
      modelAnswer: 'Selenium communicates with browser drivers (ChromeDriver, geckodriver) using HTTP REST commands over the W3C WebDriver specification, requiring external drivers and explicit wait logic. Playwright connects directly to browser engines over a single fast WebSocket connection via Chrome DevTools Protocol, features built-in auto-waiting, bundles Chromium/Firefox/WebKit out of the box, and includes an all-in-one test runner and trace viewer. Selenium has greater 15+ year legacy maturity, while Playwright offers faster execution and lower flakiness for modern SPAs.',
      followUpQuestion: 'What is an advantage of Selenium over Playwright in enterprise environments?',
    },
    {
      id: 'pw-int-9',
      questionNumber: 9,
      question: 'Which test cases should be considered for automation?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses ROI analysis and practical test case automation selection.',
      modelAnswer: 'Good candidates for automation include: 1. Repetitive regression tests executed on every release, 2. Critical user journey smoke tests (e.g. login, payment checkout), 3. Data-driven tests requiring hundreds of permutations, 4. Multi-browser compatibility checks, and 5. Complex mathematical calculation validations. Scenarios that should remain manual include brand-new unstable features, one-off checks, and visual UX/usability evaluations.',
      followUpQuestion: 'What happens if a team tries to automate 100% of all manual test cases?',
    },
    {
      id: 'pw-int-10',
      questionNumber: 10,
      question: 'Does automation testing replace manual testing?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses professional maturity and holistic QA philosophy.',
      modelAnswer: 'No, automation testing does not replace manual testing. Automated tests only verify the specific conditions coded by the engineer; they cannot judge human user experience, notice visual oddities, or conduct exploratory testing to uncover subtle domain bugs. High-performing engineering teams combine automated tests for fast regression feedback with skilled manual testers for exploratory, usability, and edge-case discovery.',
      followUpQuestion: 'How does automation change the day-to-day responsibilities of a manual QA engineer?',
    },
    {
      id: 'pw-int-11',
      questionNumber: 11,
      question: 'Scenario Investigation: You have automated a login test. It passes locally but fails intermittently in the test environment. What would you investigate?',
      difficulty: 'Scenario-Based',
      assessmentFocus: 'Evaluates systematic debugging methodology, root-cause analysis, and practical troubleshooting ability without jumping to quick assumptions.',
      modelAnswer: 'To investigate an intermittent ("flaky") test failure, I would systematically check 6 key areas:\n\n1. **Test Data State:** Is the test account being modified, locked out, or shared concurrently by other parallel test runs?\n2. **Environment & Network Stability:** Is the test staging server slower or experiencing API latency / 504 gateway timeouts compared to localhost?\n3. **Locator Reliability:** Does the locator rely on dynamic CSS classes (e.g. hashed class names) or position indices that change when other UI elements render?\n4. **Timing & Asynchronous Operations:** Is an animation, modal banner, or third-party script temporarily overlaying the login button?\n5. **Session & Cookie Interference:** Are residual cookies or auth tokens from previous test runs polluting the browser context?\n6. **Artifact Inspection:** I would inspect Playwright Trace Viewer, failure screenshots, video recordings, and network console logs to observe the exact DOM state at the millisecond of failure.',
      followUpQuestion: 'Why is adding arbitrary sleep timeouts like `page.waitForTimeout(5000)` a bad fix for this problem?',
    },
  ],

  // -------------------------------------------------------------------------
  // 10-QUESTION CHECKPOINT QUIZ
  // -------------------------------------------------------------------------
  quizQuestions: [
    {
      id: 'pw-d1-q1',
      questionNumber: 1,
      question: 'What is the primary purpose of software test automation?',
      options: [
        'To completely eliminate the need for human QA engineers in the company',
        'To use scripts and tools to execute repetitive tests rapidly and compare outcomes automatically',
        'To automatically write application source code without software developers',
        'To inspect and repair computer hardware components in test servers',
      ],
      correctAnswerIndex: 1,
      explanation: 'Test automation uses software tools and scripts to execute predefined tests and verify expected results rapidly, freeing human testers for exploratory testing.',
    },
    {
      id: 'pw-d1-q2',
      questionNumber: 2,
      question: 'Which of the following scenarios is the BEST candidate for automated testing?',
      options: [
        'Evaluating whether a brand-new website homepage color scheme feels emotionally welcoming',
        'A one-time ad-hoc check of an experimental prototype feature that will be rewritten next week',
        'A checkout payment calculation test with 50 tax and coupon combinations executed on every release',
        'Reviewing marketing copywriting for grammatical tone and spelling nuances',
      ],
      correctAnswerIndex: 2,
      explanation: 'Repetitive, high-value, data-driven calculation tests executed on every build are ideal for automation because machines execute them rapidly and error-free.',
    },
    {
      id: 'pw-d1-q3',
      questionNumber: 3,
      question: 'Which company created and actively maintains the open-source Playwright framework?',
      options: [
        'Google',
        'Apple',
        'Microsoft',
        'Mozilla',
      ],
      correctAnswerIndex: 2,
      explanation: 'Playwright is developed and actively maintained as an open-source project by Microsoft.',
    },
    {
      id: 'pw-d1-q4',
      questionNumber: 4,
      question: 'Which three core browser rendering engines are natively supported by Playwright?',
      options: [
        'Chromium, Firefox, and WebKit',
        'Chrome, Internet Explorer 6, and Opera Mini',
        'Safari, EdgeHTML, and Gecko',
        'Blink, Trident, and Presto',
      ],
      correctAnswerIndex: 0,
      explanation: 'Playwright natively supports Chromium (powers Chrome/Edge), Firefox, and WebKit (powers Safari).',
    },
    {
      id: 'pw-d1-q5',
      questionNumber: 5,
      question: 'What is the primary difference between headed and headless browser execution?',
      options: [
        'Headed execution runs on Windows, while headless execution only runs on macOS',
        'Headed mode opens a visible browser UI window, while headless runs silently in system memory',
        'Headless execution cannot run assertions or report failures',
        'Headed mode is 10x faster than headless mode in CI/CD pipelines',
      ],
      correctAnswerIndex: 1,
      explanation: 'Headed mode launches a visible browser window on screen for local viewing/debugging; headless mode runs in background memory for speed and CI/CD efficiency.',
    },
    {
      id: 'pw-d1-q6',
      questionNumber: 6,
      question: 'How does Playwright\'s built-in "Auto-Waiting" help prevent flaky tests?',
      options: [
        'It pauses the test for a mandatory 10 seconds before every mouse click',
        'It automatically checks element actionability (attached, visible, stable, enabled) before performing actions',
        'It asks the user to press Enter on the keyboard before proceeding',
        'It restarts the computer whenever a network request takes longer than 2 seconds',
      ],
      correctAnswerIndex: 1,
      explanation: 'Auto-waiting automatically verifies that an element is attached, visible, stable, enabled, and ready for pointer events before clicking or typing, eliminating arbitrary sleep timers.',
    },
    {
      id: 'pw-d1-q7',
      questionNumber: 7,
      question: 'How does Playwright communicate with browser engines differently from Selenium WebDriver?',
      options: [
        'Playwright sends commands via postal mail to browser headquarters',
        'Selenium uses a direct WebSocket connection, while Playwright uses legacy HTTP REST proxies',
        'Playwright connects directly to browser engines over a high-speed WebSocket connection, whereas Selenium communicates via HTTP through intermediary drivers',
        'There is no architectural difference between Playwright and Selenium',
      ],
      correctAnswerIndex: 2,
      explanation: 'Playwright uses a fast direct WebSocket connection to the browser (CDP/browser protocol), whereas Selenium traditionally routes HTTP requests through external driver executables.',
    },
    {
      id: 'pw-d1-q8',
      questionNumber: 8,
      question: 'In Playwright\'s architecture, what is a "Browser Context"?',
      options: [
        'The physical monitor where the browser window is displayed',
        'A lightweight, isolated incognito browser session with independent cookies and cache',
        'A JavaScript file that contains database passwords',
        'The operating system user account running the terminal',
      ],
      correctAnswerIndex: 1,
      explanation: 'A Browser Context is an isolated in-memory browser session (similar to an incognito profile) with its own cookies, localStorage, and cache, created in milliseconds.',
    },
    {
      id: 'pw-d1-q9',
      questionNumber: 9,
      question: 'In the 9-stage automation testing workflow, what should an engineer do BEFORE writing automated test code?',
      options: [
        'Deploy the untested code immediately to production customers',
        'Understand requirements, identify test scenarios, and select appropriate automation candidates',
        'Delete all existing manual test cases to save hard drive space',
        'Purchase 10 dedicated server racks from a hardware vendor',
      ],
      correctAnswerIndex: 1,
      explanation: 'Professional automation begins by analyzing requirements, designing clear test scenarios, and identifying which paths provide high automation ROI.',
    },
    {
      id: 'pw-d1-q10',
      questionNumber: 10,
      question: 'When an automated test fails in a staging environment, what is the FIRST thing the QA engineer should do?',
      options: [
        'Immediately delete the test script so the build turns green',
        'Blame the developers in a public Slack channel without investigating',
        'Investigate logs, traces, and screenshots to distinguish whether the failure is an application bug, environment glitch, or locator issue',
        'Rewrite the entire web application from scratch',
      ],
      correctAnswerIndex: 2,
      explanation: 'A professional QA engineer analyzes traces, screenshots, network requests, and DOM state to identify the root cause before taking corrective action.',
    },
  ],
};

// ---------------------------------------------------------------------------
// PRACTICAL ASSIGNMENT STARTER DATA
// ---------------------------------------------------------------------------
export const PLAYWRIGHT_DAY_1_STARTER_ROWS: PlaywrightScenarioRow[] = [
  {
    id: 'row-1',
    scenarioId: 'TC-ECOMM-01',
    feature: 'User Authentication',
    scenario: 'Verify registered user logs in successfully with valid email and password and redirects to account dashboard',
    candidateType: 'Automation',
    priority: 'High',
    reason: 'Critical path executed on every regression cycle; predictable inputs and outputs with high repetition value.',
  },
  {
    id: 'row-2',
    scenarioId: 'TC-ECOMM-02',
    feature: 'Product Search',
    scenario: 'Evaluate usability and relevance of search auto-suggestions when typing ambiguous keywords or partial brand names',
    candidateType: 'Manual / Exploratory',
    priority: 'Medium',
    reason: 'Subjective human evaluation of relevance and search layout; better evaluated through human exploratory testing.',
  },
];
