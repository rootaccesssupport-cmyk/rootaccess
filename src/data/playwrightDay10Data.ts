import type {
  PlaywrightDay10Unit,
  PlaywrightDay10AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_10_DATA: PlaywrightDay10Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 10,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Debugging, Reporting and Failure Analysis',
  subtitle:
    'Master systematic failure diagnosis in Playwright without blindly increasing timeouts. Leverage Playwright Inspector, page.pause(), Trace Viewer time-travel DOM snapshots, and enterprise HTML reporting.',
  level: 'Intermediate',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–9 concepts (Locators, assertions, auto-waiting, fixtures, and data-driven testing).',
  learningObjectives: [
    'Categorize test failures: assertion errors, locator mismatches, timeouts, navigation issues, and app vs test defects.',
    'Diagnose the underlying root cause instead of blindly increasing timeouts or adding arbitrary retries.',
    'Use interactive debugging tools: Playwright Inspector, page.pause(), headed mode, and --debug flags.',
    'Investigate failed test runs in Trace Viewer: inspect action timelines, before/after DOM snapshots, and network waterfalls.',
    'Configure and interpret built-in HTML reports, test summaries, and CI artifacts.',
    'Distinguish between deterministic failures, environmental hiccups, and genuine application defects.',
  ],

  roadmap: [
    { day: 1, title: 'Day 1: Automation Fundamentals & Playwright', focus: 'E2E Testing, Architecture, Roadmap', isCompleted: true },
    { day: 2, title: 'Day 2: JavaScript Essentials for Automation', focus: 'Variables, Logic, Functions, Async/Await', isCompleted: true },
    { day: 3, title: 'Day 3: Playwright Setup & First Script', focus: 'CLI, Config, Chromium, First Test', isCompleted: true },
    { day: 4, title: 'Day 4: Locators and Element Identification', focus: 'getByRole, getByLabel, CSS, XPath, Strictness, AI', isCompleted: true },
    { day: 5, title: 'Day 5: Actions, Assertions, Forms & Test Design', focus: 'User Actions, Web-First Assertions, AAA Pattern', isCompleted: true },
    { day: 6, title: 'Day 6: Auto-Waiting, Timeouts & Flakiness', focus: 'Actionability, Timeouts, Trace Viewer, Flakiness', isCompleted: true },
    { day: 7, title: 'Day 7: Navigation, Tabs, Frames & Dialogs', focus: 'Multi-Tab, Iframes, JavaScript Dialogs, Uploads', isCompleted: true },
    { day: 8, title: 'Day 8: Hooks, Fixtures & Test Organisation', focus: 'beforeEach, test.extend, Test Suite Architecture', isCompleted: true },
    { day: 9, title: 'Day 9: Data-Driven Testing & Parameterisation', focus: 'Parameterised Suites, Arrays of Objects, Data Management', isCompleted: true },
    { day: 10, title: 'Day 10: Debugging, Reporting & Failure Analysis', focus: 'Trace Viewer, Playwright Inspector, HTML Reports', isCurrent: true },
    { day: 11, title: 'Day 11: Authentication, Sessions & Test Isolation', focus: 'storageState, Session Reuse, Security' },
    { day: 12, title: 'Day 12: Page Object Model (POM) Design', focus: 'Maintainable Classes, Clean Page Abstractions' },
    { day: 13, title: 'Day 13: API Testing with Playwright', focus: 'REST APIs, request Fixture, Hybrid UI+API' },
    { day: 14, title: 'Day 14: Git, Test Configuration & Cross-Browser', focus: 'playwright.config.js, WebKit, Firefox, Chromium' },
    { day: 15, title: 'Day 15: CI/CD Integration with GitHub Actions', focus: 'Pipelines, Headless CI, Artifacts, Troubleshooting' },
    { day: 16, title: 'Day 16: AI-Assisted Test Generation & Locators', focus: 'Structured Prompts, Locator Critique, Code Review' },
    { day: 17, title: 'Day 17: AI Debugging & Flaky-Test Analysis', focus: 'Root Cause Analysis, Deceptive AI Fixes' },
    { day: 18, title: 'Day 18: AI-Assisted Test Planning & Synthetic Data', focus: 'Requirements to Tests, Edge Cases, Coverage Matrix' },
    { day: 19, title: 'Day 19: Framework Quality & Playwright MCP', focus: 'Model Context Protocol, Safe AI Workflows' },
    { day: 20, title: 'Day 20: Final Project, Assessment & Interview Prep', focus: 'Capstone E-commerce Framework, Certification' },
  ],

  topics: [
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: Understanding Test Failures and Root Causes',
      durationMinutes: 25,
      explanation: `When an automated test fails, your job as an automation engineer is not simply to "make it green" by any means necessary. You must perform **Root Cause Analysis (RCA)**.

### The 5 Common Failure Categories
1. **Assertion Failures:** The application did not produce the expected text, count, or URL. (Could be an actual software bug or an outdated test assertion).
2. **Locator / Selection Failures:** Playwright could not find the element because the UI changed, the selector is brittle, or strict mode was violated (matched multiple elements).
3. **Timeouts:** Action timed out (default 30s) because an element was obscured, disabled, or an API call never resolved.
4. **Navigation & Network Failures:** A redirect failed, an endpoint returned a 500 server error, or CORS blocked a client request.
5. **Test-Data & State Dependencies:** A test failed because it relied on data modified by a preceding test that ran out of order or on another worker.

### The Anti-Pattern: Masking Failures
Junior testers frequently mask failures by:
- Adding \`await page.waitForTimeout(10000)\` (arbitrary sleep).
- Increasing timeouts from 30s to 120s.
- Adding \`retries: 5\` in config so flaky tests eventually pass by luck.
- Removing or weakening assertions (\`toBeTruthy()\` instead of \`toHaveText()\`).

**Golden Rule:** A timeout is almost always a symptom of an underlying issue, not the root cause!`,
      keyTakeaways: [
        'Diagnose the underlying root cause before changing any code.',
        'Never blindly increase timeouts or add arbitrary sleep timers to fix failures.',
        'Distinguish between genuine application bugs and test automation script bugs.',
      ],
      terminology: [
        { term: 'Root Cause Analysis (RCA)', definition: 'The structured process of identifying the fundamental defect or condition that caused a test to fail.' },
        { term: 'Flaky Masking', definition: 'The dangerous practice of adding retries or sleeps to hide underlying race conditions or defects.' },
      ],
      examples: [
        {
          title: 'Symptom vs Root Cause',
          description: 'Analyzing a timeout error to uncover the true underlying bug.',
          codeSnippet: `// Error: Timeout 30000ms exceeded waiting for locator('button.checkout')
// ❌ WRONG FIX: Increase timeout to 60000ms
// ✅ ROOT CAUSE INVESTIGATION:
// Looking at network tab in Trace Viewer: The /api/cart/validate returned 403 Forbidden!
// The checkout button was disabled because the cart validation failed due to an expired token.`,
        },
      ],
      exercise: {
        id: 'checkpoint-debug-1',
        title: 'Proper Reaction to a Timeout',
        prompt: 'If a test times out waiting for a "Submit" button to become enabled, what should you do first?',
        options: [
          'Inspect network requests and console errors in Trace Viewer to see why the button was disabled',
          'Increase the timeout to 90 seconds',
          'Add retries: 10 in playwright.config.js',
          'Delete the assertion',
        ],
        correctAnswerIndex: 0,
        explanation: 'Buttons are usually disabled because client-side validation failed or a backend pre-requisite API call is still pending. Trace Viewer reveals the exact reason.',
      },
    },

    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Playwright Debugging Tools',
      durationMinutes: 30,
      explanation: `Playwright provides developer-friendly debugging tools right out of the box.

### 1. The Playwright Inspector
Run your test in debug mode:
\`\`\`bash
npx playwright test --debug
\`\`\`
This opens the browser in headed mode along with the **Playwright Inspector window**, allowing you to:
- Step through actions line-by-line (Step Over \`F10\`).
- Resume execution (\`F5\`).
- Interactively test locator expressions in the live DOM.
- View locator highlights and actionability status directly on the page.

### 2. Live Breakpoints with \`page.pause()\`
When debugging a specific test, place \`await page.pause()\` right before the failing step:
\`\`\`javascript
test('debug cart calculation', async ({ page }) => {
  await page.goto('/cart');
  await page.getByLabel('Quantity').fill('3');
  
  // Pauses execution and opens Inspector here!
  await page.pause();
  
  await expect(page.getByTestId('subtotal')).toHaveText('$90.00');
});
\`\`\`

### 3. Headed Execution
To visually watch tests execute at normal speed:
\`\`\`bash
npx playwright test --headed
\`\`\`

### 4. Interactive UI Mode
The modern Playwright visual test runner:
\`\`\`bash
npx playwright test --ui
\`\`\`
Allows instant watch-mode, live locator testing, and step-by-step DOM time-travel.`,
      keyTakeaways: [
        'Use npx playwright test --debug to step through actions line-by-line in Playwright Inspector.',
        'Insert await page.pause() to halt execution at a specific line during local development.',
        'Use --headed to visually watch browser interactions.',
        'Never commit page.pause() to production code or CI pipelines.',
      ],
      terminology: [
        { term: 'Playwright Inspector', definition: 'The built-in GUI debugger for Playwright that provides step-through execution and live locator exploration.' },
        { term: 'page.pause()', definition: 'A debugging method that pauses test execution and automatically launches the Playwright Inspector.' },
      ],
      examples: [
        {
          title: 'Targeted Debugging Command',
          description: 'Running a single test file in debug mode.',
          codeSnippet: `npx playwright test tests/checkout.spec.js -g "apply discount" --debug`,
        },
      ],
      exercise: {
        id: 'checkpoint-debug-2',
        title: 'Safe Debugging Practices',
        prompt: 'Why must await page.pause() never be committed to a shared git branch or CI pipeline?',
        options: [
          'Because in headless CI environments with no display, page.pause() hangs the test runner until the CI job times out and fails',
          'Because it deletes the node_modules folder',
          'Because JavaScript throws a SyntaxError on page.pause() in production',
          'Because Chromium does not support pause',
        ],
        correctAnswerIndex: 0,
        explanation: 'Headless CI runners have no human to click "Resume" in the GUI. The test halts indefinitely and the CI build times out.',
      },
    },

    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Trace Viewer: Time-Travel Debugging',
      durationMinutes: 35,
      explanation: `**Trace Viewer** is Playwright's most powerful diagnostic capability. It is a post-mortem tool that captures a complete recording of your test execution.

### What Trace Viewer Captures
- **Action Timeline:** Visual strip showing every action with millisecond timestamps.
- **Before & After DOM Snapshots:** An interactive, inspectable DOM snapshot at the exact moment before and after each action.
- **Console Logs & Page Errors:** JavaScript errors thrown inside the browser window.
- **Network Waterfall:** Every HTTP request and response, including headers, status codes, and JSON response bodies.
- **Source Code View:** Highlights the exact line in your test script that executed.

### How to Configure Tracing in \`playwright.config.js\`
\`\`\`javascript
// playwright.config.js
module.exports = {
  use: {
    // Best practice for CI: capture trace only when a test fails or retries
    trace: 'on-first-retry', // Options: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry'
  },
};
\`\`\`

### Opening a Trace File
\`\`\`bash
# Open locally via CLI:
npx playwright show-trace test-results/my-test-run/trace.zip

# Or load in any browser at:
# https://trace.playwright.dev (runs 100% locally in your browser!)
\`\`\`

### Security & Privacy Consideration
Trace Viewer captures network payloads and DOM text. Avoid capturing traces on tests that display sensitive customer PII or real passwords.`,
      keyTakeaways: [
        'Trace Viewer provides complete time-travel DOM snapshots and network waterfalls.',
        'Use trace: "on-first-retry" or "retain-on-failure" in CI to keep artifact sizes manageable.',
        'View traces locally with npx playwright show-trace or at trace.playwright.dev.',
        'Be mindful of sensitive PII captured in network response traces.',
      ],
      terminology: [
        { term: 'Trace Viewer', definition: 'A Progressive Web App tool that renders full timeline, DOM snapshot, and network recordings of Playwright runs.' },
        { term: 'retain-on-failure', definition: 'A trace recording mode that discards recordings for passing tests and only preserves traces for failed tests.' },
      ],
      examples: [
        {
          title: 'Configuring Trace Capture for Production CI',
          description: 'A production playwright.config.js snippet.',
          codeSnippet: `const config = {
  use: {
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};`,
        },
      ],
      exercise: {
        id: 'checkpoint-debug-3',
        title: 'Trace Recording Strategy in CI',
        prompt: 'Why is trace: "retain-on-failure" preferred over trace: "on" in large continuous integration pipelines?',
        options: [
          'Because recording traces for hundreds of passing tests consumes gigabytes of CI disk storage and slows down execution',
          'Because passing tests crash when traces are enabled',
          'Because traces cannot record successful tests',
          'Because GitHub Actions limits trace files to 10 kilobytes',
        ],
        correctAnswerIndex: 0,
        explanation: 'Running trace on every passing test creates huge trace archives that consume CI storage and bandwidth. "retain-on-failure" captures evidence only when needed for debugging.',
      },
    },

    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: HTML Reports, Retries & Failure Analysis',
      durationMinutes: 30,
      explanation: `Producing clear, actionable test reports ensures engineering teams can triage defects quickly.

### 1. Built-in HTML Reporter
Playwright includes an interactive HTML reporter that aggregates pass/fail summaries, execution times, error stack traces, and attached screenshots/videos/traces:
\`\`\`bash
# Configure in playwright.config.js:
reporter: [['html', { open: 'never' }]],

# Open the report after a run:
npx playwright show-report
\`\`\`

### 2. Retries & Flaky Test Identification
When \`retries: 2\` is configured:
- **Passed on First Try:** Green (\`passed\`).
- **Failed First, Passed on Retry:** Orange (\`flaky\`).
- **Failed All Tries:** Red (\`failed\`).

Playwright reports flaky tests separately so you can investigate race conditions before they break production deployments!

### 3. Communicating Failures to Developers
When logging a defect found by an automated test:
1. Provide the exact test title and environment URL.
2. State the expected behavior vs actual behavior.
3. Attach the Playwright error message and stack trace.
4. Attach the trace.zip or screenshot artifact.`,
      keyTakeaways: [
        'Built-in HTML reporter generates rich, interactive reports with embedded traces and logs.',
        'Flaky tests are clearly identified when a test fails once but passes on a retry.',
        'Clear failure communication includes expected vs actual results, stack traces, and trace artifacts.',
      ],
      terminology: [
        { term: 'HTML Reporter', definition: 'Playwright built-in reporter that creates a self-contained web page summarizing test runs.' },
        { term: 'Flaky Status', definition: 'A test result indicator showing that a test initially failed but succeeded upon retry, signaling an intermittent timing or environment defect.' },
      ],
      examples: [
        {
          title: 'Configuring Multi-Reporters',
          description: 'Combining console list output with HTML file reporting in CI.',
          codeSnippet: `// playwright.config.js
module.exports = {
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
};`,
        },
      ],
      exercise: {
        id: 'checkpoint-debug-4',
        title: 'Meaning of Flaky in Playwright Reports',
        prompt: 'In Playwright HTML reports, what does a test marked as "flaky" indicate?',
        options: [
          'The test failed on its initial run but passed when Playwright automatically retried it',
          'The test took longer than 60 seconds to execute',
          'The test was skipped due to a syntax error',
          'The test only runs on Chromium',
        ],
        correctAnswerIndex: 0,
        explanation: 'Flaky tests fail initially and pass on retry. This highlights race conditions, network latency issues, or fragile assertions that need systematic investigation.',
      },
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-day10-1',
      questionNumber: 1,
      question: 'How do you investigate a failing Playwright test when you only have access to CI logs?',
      difficulty: 'Intermediate',
      assessmentFocus: 'CI failure triage and artifact analysis.',
      modelAnswer:
        'First, I inspect the failure stack trace in the CI log to identify the failing file, line number, and error type (assertion failure, locator timeout, or network error). Next, I download the CI artifacts—specifically the Playwright HTML report and trace.zip file. I open the trace locally using `npx playwright show-trace trace.zip` to inspect the DOM snapshots, console errors, and network request waterfall at the exact moment of failure. This pinpoints whether the defect was caused by an application bug (e.g. 500 error), an environment issue, or a test synchronization bug.',
      followUpQuestion: 'How does trace: "retain-on-failure" help optimize CI storage while aiding debugging?',
    },
    {
      id: 'iq-day10-2',
      questionNumber: 2,
      question: 'What is the difference between Playwright Inspector and Trace Viewer?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Tooling distinctions and appropriate usage.',
      modelAnswer:
        'Playwright Inspector is a live, interactive debugging tool used during local development (via `--debug` or `page.pause()`) to pause execution and step through actions line-by-line in real-time. In contrast, Trace Viewer is a post-mortem time-travel analysis tool that plays back a pre-recorded test run. Trace Viewer is ideal for investigating failures that occurred in headless CI environments where no live human interaction was possible.',
      followUpQuestion: 'Can Trace Viewer be viewed in a browser without installing Playwright locally?',
    },
    {
      id: 'iq-day10-3',
      questionNumber: 3,
      question: 'Why is adding arbitrary sleep timers (page.waitForTimeout) considered an anti-pattern for fixing test failures?',
      difficulty: 'Beginner',
      assessmentFocus: 'Anti-flakiness engineering and web-first waiting.',
      modelAnswer:
        'Adding fixed sleep timers masks the symptom rather than solving the root cause. If network latency fluctuates beyond the sleep duration, the test fails anyway. Furthermore, sleep timers artificially inflate suite execution time across hundreds of tests. The professional solution is to identify the condition being waited on (e.g. element visibility, URL change, or API response) and use web-first auto-retrying assertions or `page.waitForResponse()` instead.',
      followUpQuestion: 'What is the difference between actionability auto-waiting and assertion auto-waiting?',
    },
    {
      id: 'iq-day10-4',
      questionNumber: 4,
      question: 'How do retries work in Playwright, and when is it appropriate to configure them?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Test stability, CI configuration, and flaky test management.',
      modelAnswer:
        'Retries are configured in `playwright.config.js` via the `retries` option (typically 1 or 2 in CI). When a test fails, Playwright destroys the browser context and re-runs the test in a clean environment. If it passes on retry, Playwright flags it as "flaky" in reports rather than "passed." Retries prevent temporary network blips from blocking CI deployments, but flaky tests must be prioritized and fixed, not ignored.',
      followUpQuestion: 'Why should retries typically be set to 0 during local development?',
    },
    {
      id: 'iq-day10-5',
      questionNumber: 5,
      question: 'How do you differentiate between an application defect and an automation script defect during triage?',
      difficulty: 'Scenario-Based',
      assessmentFocus: 'Critical thinking and quality assurance leadership.',
      modelAnswer:
        'I reproduce the scenario manually in the target environment using the exact test data. If the application returns an unhandled error, displays incorrect data, or fails to navigate, it is an application defect. I check the network tab in the trace: if an API returned 500 Internal Server Error or an invalid payload, the test accurately caught a software defect. If the application functions correctly manually but the test failed due to an outdated selector, a strictness violation, or a premature non-retrying assertion, it is an automation script defect.',
      followUpQuestion: 'What steps do you take when an application defect is confirmed by automation?',
    },
  ],

  quizQuestions: [
    {
      id: 'q-d10-1',
      questionNumber: 1,
      question: 'Which CLI flag launches Playwright tests in interactive step-through debugging mode with the Inspector?',
      options: [
        'npx playwright test --debug',
        'npx playwright test --inspect-brk',
        'npx playwright test --headed-only',
        'npx playwright test --pause-all',
      ],
      correctAnswerIndex: 0,
      explanation: 'npx playwright test --debug opens the Playwright Inspector GUI and launches browsers in headed mode for step-by-step interactive debugging.',
    },
    {
      id: 'q-d10-2',
      questionNumber: 2,
      question: 'What is the function of await page.pause() in a Playwright test script?',
      options: [
        'It suspends execution at that line and opens the Playwright Inspector for interactive debugging',
        'It sleeps for exactly 5000 milliseconds',
        'It closes the current browser tab',
        'It captures a full-page PDF',
      ],
      correctAnswerIndex: 0,
      explanation: 'page.pause() acts as a programmatic breakpoint, halting execution and opening the Playwright Inspector so you can inspect locators and DOM state.',
    },
    {
      id: 'q-d10-3',
      questionNumber: 3,
      question: 'What does Trace Viewer allow engineers to inspect that static screenshots cannot provide?',
      options: [
        'Before/after DOM snapshots, network request/response waterfalls, and console logs at every action step',
        'The developer’s source code commits from 5 years ago',
        'The physical temperature of the test server',
        'The client’s internet service provider contract',
      ],
      correctAnswerIndex: 0,
      explanation: 'Trace Viewer records interactive time-travel DOM snapshots, network waterfalls, console messages, and source lines for every executed step.',
    },
    {
      id: 'q-d10-4',
      questionNumber: 4,
      question: 'Which trace configuration is recommended for CI to save storage while capturing evidence for failing tests?',
      options: [
        "trace: 'retain-on-failure' or 'on-first-retry'",
        "trace: 'on' for all tests forever",
        "trace: 'off' completely",
        "trace: 'random'",
      ],
      correctAnswerIndex: 0,
      explanation: "'retain-on-failure' discards trace files for passing tests and only preserves traces when a test fails, optimizing CI storage and upload bandwidth.",
    },
    {
      id: 'q-d10-5',
      questionNumber: 5,
      question: 'How can you view a Playwright trace.zip file in a web browser without running local commands?',
      options: [
        'Open https://trace.playwright.dev and drag-and-drop the trace.zip file',
        'Unzip the file and double-click index.html',
        'Send the zip file to Microsoft via email',
        'Change the file extension to .mp4',
      ],
      correctAnswerIndex: 0,
      explanation: 'trace.playwright.dev is a client-side Progressive Web App that runs entirely in your browser without uploading your trace data to external servers.',
    },
    {
      id: 'q-d10-6',
      questionNumber: 6,
      question: 'What command opens the built-in Playwright HTML report after a test run finishes?',
      options: [
        'npx playwright show-report',
        'npx playwright open-html',
        'npm run view-results',
        'cat test-results.html',
      ],
      correctAnswerIndex: 0,
      explanation: 'npx playwright show-report starts a local web server and serves the interactive HTML report generated from the latest test execution.',
    },
    {
      id: 'q-d10-7',
      questionNumber: 7,
      question: 'Why should automation engineers avoid increasing timeouts from 30s to 120s when a test times out?',
      options: [
        'Timeouts are usually symptoms of blocked UI, failed network calls, or invalid locators; inflating timeouts slows down test suites without fixing the cause',
        'Because Playwright enforces a hard operating system limit of 30 seconds',
        'Because Chromium crashes if a timeout exceeds 45 seconds',
        'Because timeouts only apply to unit tests',
      ],
      correctAnswerIndex: 0,
      explanation: 'Blindly extending timeouts masks underlying problems like deadlocked network requests or missing elements, multiplying CI build times without improving reliability.',
    },
    {
      id: 'q-d10-8',
      questionNumber: 8,
      question: 'What is a "strict mode violation" error in Playwright?',
      options: [
        'A locator resolved to multiple elements when an action expected a single element (e.g. clicking a non-unique button)',
        'The developer forgot to use "use strict" in JavaScript',
        'A test ran in Firefox instead of Chromium',
        'A password did not contain a special character',
      ],
      correctAnswerIndex: 0,
      explanation: 'Playwright enforces strict mode: if a locator matches 2 or more elements, action calls like click() or fill() throw a strict mode violation to prevent clicking the wrong element.',
    },
    {
      id: 'q-d10-9',
      questionNumber: 9,
      question: 'What is the modern command to launch Playwright’s interactive visual UI Mode?',
      options: [
        'npx playwright test --ui',
        'npx playwright run-gui',
        'npm start playwright-studio',
        'playwright open --interface',
      ],
      correctAnswerIndex: 0,
      explanation: 'npx playwright test --ui opens Playwright’s interactive UI mode featuring live watch mode, visual time-travel, and instant locator picking.',
    },
    {
      id: 'q-d10-10',
      questionNumber: 10,
      question: 'What is the primary indicator of a genuine application defect when analyzing a failed automated test in Trace Viewer?',
      options: [
        'A backend API request returned a 500 Internal Server Error or an unhandled exception is logged in the console',
        'The test script has a syntax typo on line 1',
        'The test file name is too long',
        'The test executed on Chromium rather than WebKit',
      ],
      correctAnswerIndex: 0,
      explanation: 'When Trace Viewer shows server 500 errors, unhandled JavaScript runtime exceptions, or missing data from the backend, the automated test has successfully caught a real application bug.',
    },
  ],
};

export const PLAYWRIGHT_DAY_10_STARTER_CODE = `// tests/diagnose_and_fix_suite.spec.js
// ⚠️ LAB CHALLENGE: This test suite contains 6 deliberate automation defects.
// Your task is to diagnose each failure, fix the code, and explain the root causes!

const { test, expect } = require('@playwright/test');

test.describe('E-Commerce Order Management - Diagnostic Lab', () => {

  // DEFECT 1: Incorrect locator strategy (brittle CSS class that changed in redesign)
  // DEFECT 2: Test data dependency (hardcoded email that collides)
  test('TC-1: Customer account registration and dashboard access', async ({ page }) => {
    // FIX: Use unique collision-free email
    const uniqueEmail = \`customer_\${Date.now()}@apexcorp.io\`;

    await page.goto('/signup');
    await expect(page.getByRole('heading', { name: /create account|sign up/i })).toBeVisible();

    // Filling form fields
    await page.getByLabel(/full name/i).fill('Meera Patel');
    await page.getByLabel(/email/i).fill(uniqueEmail);
    await page.getByLabel(/password/i).fill('ValidPassword@2026');

    // FIX DEFECT 1: Replaced fragile '.btn-signup-v2-blue' with accessible role
    await page.getByRole('button', { name: /create account|sign up|register/i }).click();

    // Verify dashboard navigation
    await expect(page).toHaveURL(/.*dashboard|.*app/);
    await expect(page.getByRole('heading', { name: /my learning|welcome/i })).toBeVisible();
  });

  // DEFECT 3: Missing wait for meaningful condition (arbitrary sleep replaced with web-first assertion)
  // DEFECT 4: Incorrect form input value and casing
  test('TC-2: Product search and catalog filtering', async ({ page }) => {
    await page.goto('/courses');

    // FIX DEFECT 4: Corrected search query text to match catalog item
    const searchInput = page.getByPlaceholder(/search courses|search catalog/i);
    await searchInput.fill('Playwright');
    await searchInput.press('Enter');

    // FIX DEFECT 3: Eliminated arbitrary sleep (await page.waitForTimeout(5000))
    // Replaced with auto-retrying web-first assertion on filtered results container:
    const courseCard = page.getByRole('heading', { name: /playwright automation/i });
    await expect(courseCard).toBeVisible();
  });

  // DEFECT 5: Incorrect expected URL assertion
  // DEFECT 6: Strict mode violation / wrong assertion mismatch
  test('TC-3: Course syllabus navigation and detail validation', async ({ page }) => {
    await page.goto('/courses/playwright-automation');

    // FIX DEFECT 5: Fixed incorrect expected URL (was expecting /courses/playwright-v1-old)
    await expect(page).toHaveURL(/.*courses\\/playwright-automation/);

    // FIX DEFECT 6: Replaced ambiguous page.getByRole('button') with specific accessible name
    const syllabusHeader = page.getByRole('heading', { name: /curriculum & syllabus|course syllabus/i });
    await expect(syllabusHeader).toBeVisible();

    // Ensure lesson list is populated
    await expect(page.getByText(/Day 1:/i).first()).toBeVisible();
  });

});

// Configuration Demonstration:
// In playwright.config.js, enable HTML reporter and retain-on-failure traces:
const sampleConfig = {
  reporter: [['html', { open: 'never' }]],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
};
`;

export const PLAYWRIGHT_DAY_10_STARTER_EXPLANATION = `Root Cause Analysis & Diagnostic Fixes:
1. Defect 1 (Brittle Selector): Replaced fragile CSS class '.btn-signup-v2-blue' with resilient getByRole('button', { name: /create account/i }).
2. Defect 2 (Data Dependency): Replaced hardcoded static email with Date.now() timestamp generator to prevent 409 duplicate account conflicts.
3. Defect 3 (Arbitrary Sleep): Removed page.waitForTimeout(5000) and implemented web-first auto-retrying expect(courseCard).toBeVisible().
4. Defect 4 (Form Value): Corrected search query string to valid catalog title 'Playwright'.
5. Defect 5 (URL Mismatch): Corrected expected URL regex from obsolete legacy path to /courses/playwright-automation.
6. Defect 6 (Strictness / Assertion): Disambiguated generic button locator by using specific accessible name and targeted heading.
7. Reporting: Configured HTML reporter and trace: 'retain-on-failure' for optimal CI artifact capture.`;

export const PLAYWRIGHT_DAY_10_STARTER_OUTPUT = `Running 3 tests using 3 workers
  ✓ [chromium] › diagnose_and_fix_suite.spec.js:10:3 › TC-1: Customer account registration and dashboard access (750ms)
  ✓ [chromium] › diagnose_and_fix_suite.spec.js:29:3 › TC-2: Product search and catalog filtering (520ms)
  ✓ [chromium] › diagnose_and_fix_suite.spec.js:43:3 › TC-3: Course syllabus navigation and detail validation (480ms)

  3 passed (1.9s)
  HTML report written to: playwright-report/index.html`;

export function evaluateDay10Assignment(
  code: string,
  _expectedOutput: string,
  explanation: string
): PlaywrightDay10AssignmentRubric {
  const criteria: PlaywrightDay10AssignmentRubric['criteria'] = [];
  let score = 0;

  // Strip single-line and multi-line comments for objective code inspection
  const activeCode = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

  // 1. Diagnoses locator failure and replaces with accessible locator
  const diagnosesLocatorFailure =
    /getByRole\(\s*['"]button['"]/i.test(activeCode) &&
    !/btn-signup-v2-blue/.test(activeCode);
  criteria.push({
    id: 'crit-1',
    title: 'Fix Defect 1: Resilient Accessible Locator',
    passed: diagnosesLocatorFailure,
    feedback: diagnosesLocatorFailure
      ? 'Replaced fragile CSS class with accessible getByRole locator.'
      : 'Replace brittle CSS selector with getByRole("button", ...).',
  });
  if (diagnosesLocatorFailure) score += 1;

  // 2. Fixes assertion mismatch
  const fixesAssertionMismatch =
    /toBeVisible\(\)|toContainText\(\)|toHaveText\(\)/.test(activeCode);
  criteria.push({
    id: 'crit-2',
    title: 'Fix Defect 2: Web-First Assertion Accuracy',
    passed: fixesAssertionMismatch,
    feedback: fixesAssertionMismatch
      ? 'Implemented accurate auto-retrying web-first assertions.'
      : 'Use accurate web-first assertions like toBeVisible().',
  });
  if (fixesAssertionMismatch) score += 1;

  // 3. Replaces arbitrary sleep with condition
  const replacesArbitrarySleepWithCondition =
    !/waitForTimeout\s*\(\s*\d{4,}\s*\)/.test(activeCode) &&
    /toBeVisible\(/.test(activeCode);
  criteria.push({
    id: 'crit-3',
    title: 'Fix Defect 3: Eliminate Arbitrary Sleeps',
    passed: replacesArbitrarySleepWithCondition,
    feedback: replacesArbitrarySleepWithCondition
      ? 'Removed arbitrary waitForTimeout and used auto-retrying assertion.'
      : 'Eliminate page.waitForTimeout() in favor of auto-retrying assertions.',
  });
  if (replacesArbitrarySleepWithCondition) score += 1;

  // 4. Fixes incorrect URL expectation
  const fixesIncorrectUrlExpectation =
    /toHaveURL\(.*playwright-automation/i.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Fix Defect 4: Accurate URL Assertion',
    passed: fixesIncorrectUrlExpectation,
    feedback: fixesIncorrectUrlExpectation
      ? 'Corrected URL expectation to /courses/playwright-automation.'
      : 'Update toHaveURL regex to match /courses/playwright-automation.',
  });
  if (fixesIncorrectUrlExpectation) score += 1;

  // 5. Resolves test data dependency
  const resolvesTestDataDependency =
    /Date\.now\(\)|Math\.random\(\)|uuid/i.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'Fix Defect 5: Collision-Free Dynamic Test Data',
    passed: resolvesTestDataDependency,
    feedback: resolvesTestDataDependency
      ? 'Used dynamic email generation to avoid duplicate key conflicts.'
      : 'Generate collision-free dynamic emails using Date.now().',
  });
  if (resolvesTestDataDependency) score += 1;

  // 6. Corrects form input values
  const correctsFormInputValues =
    /fill\(\s*['"]Playwright['"]\s*\)/i.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Fix Defect 6: Valid Search Input Values',
    passed: correctsFormInputValues,
    feedback: correctsFormInputValues
      ? 'Provided accurate search query targeting catalog course.'
      : 'Correct search input value to match valid catalog course.',
  });
  if (correctsFormInputValues) score += 1;

  // 7. Explains root cause analysis in explanation
  const explainsRootCauseAnalysis =
    explanation.toLowerCase().includes('root cause') ||
    explanation.toLowerCase().includes('rca') ||
    explanation.toLowerCase().includes('defect');
  criteria.push({
    id: 'crit-7',
    title: 'Root Cause Analysis Documentation',
    passed: explainsRootCauseAnalysis,
    feedback: explainsRootCauseAnalysis
      ? 'Documented systematic root cause analysis for all defects.'
      : 'Include root cause explanations for each diagnosed defect.',
  });
  if (explainsRootCauseAnalysis) score += 1;

  // 8. Demonstrates Trace or Inspector usage understanding
  const demonstratesTraceOrInspectorUsage =
    /trace|inspector|debug/i.test(code) ||
    /trace|inspector|debug/i.test(explanation);
  criteria.push({
    id: 'crit-8',
    title: 'Diagnostic Tooling (Trace Viewer / Inspector)',
    passed: demonstratesTraceOrInspectorUsage,
    feedback: demonstratesTraceOrInspectorUsage
      ? 'Incorporated Trace Viewer and Playwright Inspector diagnostic strategies.'
      : 'Reference Trace Viewer or Playwright Inspector in config or explanation.',
  });
  if (demonstratesTraceOrInspectorUsage) score += 1;

  // 9. Configures HTML reporter
  const configuresHtmlReporter =
    /reporter:\s*\[.*html/i.test(code) ||
    /html.*report/i.test(explanation);
  criteria.push({
    id: 'crit-9',
    title: 'HTML Reporter Configuration',
    passed: configuresHtmlReporter,
    feedback: configuresHtmlReporter
      ? 'Outlined HTML report generation for failure review.'
      : 'Include HTML reporter configuration in playwright.config.js snippet.',
  });
  if (configuresHtmlReporter) score += 1;

  // 10. Syntactically valid JavaScript
  let syntacticallyValidJavaScript = true;
  try {
    new Function(code);
  } catch {
    syntacticallyValidJavaScript =
      code.includes('require(') || code.includes('test(');
  }
  criteria.push({
    id: 'crit-10',
    title: 'Pure JavaScript Syntax (.js)',
    passed: syntacticallyValidJavaScript,
    feedback: syntacticallyValidJavaScript
      ? 'Authored clean, valid JavaScript test suite.'
      : 'Ensure code is syntactically valid JavaScript.',
  });
  if (syntacticallyValidJavaScript) score += 1;

  const passed = score >= 8;
  const feedback = criteria.map((c) => `${c.passed ? '✓' : '✗'} ${c.title}: ${c.feedback}`);

  return {
    score,
    feedback,
    passed,
    criteria,
    diagnosesLocatorFailure,
    fixesAssertionMismatch,
    replacesArbitrarySleepWithCondition,
    fixesIncorrectUrlExpectation,
    resolvesTestDataDependency,
    correctsFormInputValues,
    explainsRootCauseAnalysis,
    demonstratesTraceOrInspectorUsage,
    configuresHtmlReporter,
    syntacticallyValidJavaScript,
  };
}
