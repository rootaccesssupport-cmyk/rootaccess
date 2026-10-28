import type {
  PlaywrightDay14Unit,
  PlaywrightDay14AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_14_DATA: PlaywrightDay14Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 14,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Git, Test Configuration and Cross-Browser Testing',
  subtitle:
    'Prepare your Playwright automation framework for enterprise team collaboration. Master Git pull request reviews, production playwright.config.js multi-browser matrixes, and targeted CLI execution.',
  level: 'Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–13 concepts (Locators, assertions, fixtures, POM, and API testing).',
  learningObjectives: [
    'Master Git workflows for QA engineers: branching, commits, pull requests, merge conflicts, and .gitignore hygiene.',
    'Configure playwright.config.js for enterprise environments: baseURL, timeouts, retries, workers, and reporters.',
    'Configure multi-browser test execution across Chromium, Firefox, and WebKit (Safari engine).',
    'Configure mobile viewport device emulation (e.g. Pixel 7, iPhone 14) using Playwright devices.',
    'Execute targeted CLI commands: filtering tests by title grep, targeting specific files, and selecting browser projects.',
    'Eliminate committed secrets and hardcoded credentials from configuration files.',
    'Review automation pull requests with an engineering checklist for reliability and maintainability.',
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
    { day: 10, title: 'Day 10: Debugging, Reporting & Failure Analysis', focus: 'Trace Viewer, Playwright Inspector, HTML Reports', isCompleted: true },
    { day: 11, title: 'Day 11: Authentication, Sessions & Test Isolation', focus: 'storageState, Session Reuse, Security', isCompleted: true },
    { day: 12, title: 'Day 12: Page Object Model (POM) Design', focus: 'Maintainable Classes, Clean Page Abstractions', isCompleted: true },
    { day: 13, title: 'Day 13: API Testing with Playwright', focus: 'REST APIs, request Fixture, Hybrid UI+API', isCompleted: true },
    { day: 14, title: 'Day 14: Git, Test Configuration & Cross-Browser', focus: 'playwright.config.js, WebKit, Firefox, Chromium', isCurrent: true },
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
      title: 'Topic 1: Git Fundamentals for Automation Engineers',
      durationMinutes: 25,
      explanation: `In modern engineering teams, automated tests live in Git version control alongside application source code.

### Core Git Workflow
1. **Branching:** Never push directly to \`main\`. Create feature branches: \`git checkout -b feature/cart-automation\`.
2. **Atomic Commits:** Make small, logical commits with conventional commit messages:
   - \`feat(checkout): add payment method validation tests\`
   - \`fix(auth): update login button locator for redesigned navbar\`
3. **Pull Requests (PRs):** Submit a PR for peer review before merging. CI runs your tests automatically on the PR branch!
4. **Merge Conflicts:** Occur when two teammates edit the same line of a Page Object or test file. Resolve by rebasing or merging \`main\`.

### What to Include in \`.gitignore\`
\`\`\`text
# Crucial ignore rules for Playwright projects:
node_modules/
.env
.env.local
playwright/.auth/
test-results/
playwright-report/
blob-report/
\`\`\``,
      keyTakeaways: [
        'Always work in dedicated feature branches and submit pull requests.',
        'Use conventional commit messages that explain the intent of the change.',
        'Keep test artifacts (reports, traces, node_modules, .env) strictly out of version control.',
      ],
      terminology: [
        { term: 'Pull Request (PR)', definition: 'A proposed set of code changes submitted by a developer for peer review and automated CI validation before merging into the main branch.' },
        { term: 'Conventional Commits', definition: 'A standardized specification for commit messages (e.g. feat:, fix:, test:, refactor:).' },
      ],
      examples: [
        {
          title: 'Git Branch & PR Review Flow',
          description: 'Standard team workflow for authoring automation scripts.',
          codeSnippet: `git checkout -b test/day-14-config
git add .
git commit -m "test(config): configure multi-browser matrix for chromium, firefox, webkit"
git push origin test/day-14-config`,
        },
      ],
      exercise: {
        id: 'checkpoint-git-1',
        title: 'Gitignore Best Practices',
        prompt: 'Why should test-results/ and playwright-report/ be added to .gitignore?',
        options: [
          'Because they contain gigabytes of transient binary artifacts (screenshots, videos, trace zips) generated during local runs that bloat the repository history',
          'Because Git does not allow HTML or ZIP files',
          'Because Playwright will delete the repository if they are committed',
          'Because Node.js cannot read ignored files',
        ],
        correctAnswerIndex: 0,
        explanation: 'Test output folders contain large, ephemeral test run outputs that should never be tracked in git repository history.',
      },
    },

    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Mastering playwright.config.js',
      durationMinutes: 35,
      explanation: `\`playwright.config.js\` is the control center for your entire automation framework.

### Key Configuration Properties
\`\`\`javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,               // Run tests across files in parallel
  forbidOnly: !!process.env.CI,      // Fail CI if test.only() was accidentally committed!
  retries: process.env.CI ? 2 : 0,   // Retries in CI, fail-fast locally
  workers: process.env.CI ? 2 : undefined, // Parallel workers
  timeout: 30000,                    // 30s max duration per test
  expect: {
    timeout: 5000,                   // 5s max duration for web-first assertions
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://staging.rootaccess.org',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
\`\`\`

### The \`forbidOnly\` Rule
If a developer leaves \`test.only()\` in a file, only that single test runs in CI, silently skipping the other 499 tests! \`forbidOnly: !!process.env.CI\` causes CI to immediately fail with a build error, preventing unverified code merges.`,
      keyTakeaways: [
        'Centralize timeouts, baseURL, retries, and reporters in playwright.config.js.',
        'Use forbidOnly: !!process.env.CI to prevent accidental test.only commits from skipping suites in CI.',
        'Set retries to 0 locally for fast debugging, and 1 or 2 in CI to absorb transient network hiccups.',
      ],
      terminology: [
        { term: 'forbidOnly', definition: 'A configuration setting that fails the test run if test.only is present, protecting CI from executing a single test while silently skipping the rest.' },
        { term: 'fullyParallel', definition: 'Runs individual tests within a file in parallel across multiple worker processes.' },
      ],
      examples: [
        {
          title: 'Configuring Environment-Specific baseURL',
          description: 'Dynamically selecting test environments.',
          codeSnippet: `const environments = {
  staging: 'https://staging.rootaccess.org',
  qa: 'https://qa.rootaccess.org',
  prod: 'https://rootaccess.org',
};

const baseURL = environments[process.env.ENV || 'staging'];`,
        },
      ],
      exercise: {
        id: 'checkpoint-git-2',
        title: 'Importance of forbidOnly',
        prompt: 'What disaster does forbidOnly: !!process.env.CI prevent in your CI/CD pipeline?',
        options: [
          'A developer committing test.only() which would cause CI to run only 1 test, skip the remaining 200 tests, and falsely mark the PR green!',
          'It prevents tests from using JavaScript',
          'It blocks pull requests created on weekends',
          'It stops CSS animations',
        ],
        correctAnswerIndex: 0,
        explanation: 'forbidOnly causes the test runner to exit with an error if test.only() is present in any test file, ensuring full regression coverage in CI.',
      },
    },

    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Cross-Browser & Mobile Emulation Testing',
      durationMinutes: 30,
      explanation: `Modern web applications must work seamlessly across diverse browser rendering engines and mobile viewports.

### The 3 Core Browser Engines in Playwright
Playwright bundles and executes tests against true browser rendering engines:
1. **Chromium:** Powers Google Chrome, Microsoft Edge, Brave, and Opera.
2. **Firefox (Gecko):** Powers Mozilla Firefox.
3. **WebKit:** Powers Apple Safari on macOS and all browsers on iOS (iPhones and iPads).

### Configuring Multi-Browser Projects
\`\`\`javascript
// playwright.config.js
const { devices } = require('@playwright/test');

module.exports = {
  projects: [
    // Desktop Browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Emulation
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 14'] },
    },
  ],
};
\`\`\`

### Why a Test Passing in Chromium Might Fail in WebKit
- CSS rendering differences (e.g. flexbox wrapping, date input pickers).
- Touch event requirements on mobile viewports.
- Cookie policy differences (WebKit has stricter third-party cookie blocking).`,
      keyTakeaways: [
        'Playwright supports Chromium, Firefox, and WebKit out of the box.',
        'Use devices presets (Desktop Chrome, Desktop Safari, Pixel 7, iPhone 14) to configure viewport and user agents.',
        'Cross-browser testing uncovers engine-specific rendering defects before release.',
      ],
      terminology: [
        { term: 'WebKit', definition: 'The open-source browser engine developed by Apple that powers Safari and all iOS web browsers.' },
        { term: 'Device Emulation', definition: 'Simulating mobile device viewports, touch capabilities, and user-agent strings on desktop engines.' },
      ],
      examples: [
        {
          title: 'Running Tests on a Specific Browser Engine',
          description: 'Executing tests exclusively on WebKit via CLI.',
          codeSnippet: `npx playwright test --project=webkit`,
        },
      ],
      exercise: {
        id: 'checkpoint-git-3',
        title: 'Cross-Browser Value',
        prompt: 'Why is testing in WebKit valuable even on Windows or Linux operating systems?',
        options: [
          'Because WebKit is the engine that powers Safari on Apple iOS (iPhones/iPads) and macOS, catching Safari-specific bugs on any OS without needing physical Mac hardware',
          'Because WebKit runs faster than Chromium',
          'Because WebKit ignores JavaScript errors',
          'Because WebKit is owned by Google',
        ],
        correctAnswerIndex: 0,
        explanation: 'Playwright compiles and runs the actual WebKit engine on Windows, Linux, and macOS, allowing cross-platform teams to test Safari behavior seamlessly.',
      },
    },

    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Targeted Test Selection & CLI Mastery',
      durationMinutes: 30,
      explanation: `During development, you should never wait for the entire 500-test suite to run just to verify a 1-line change.

### Essential CLI Commands
\`\`\`bash
# 1. Run a specific test file:
npx playwright test tests/auth/login.spec.js

# 2. Filter tests by title regex (-g or --grep):
npx playwright test -g "invalid password"

# 3. Inverse filter (--grep-invert):
npx playwright test --grep-invert "@slow"

# 4. Target a specific project:
npx playwright test --project=chromium

# 5. Run headed (watch in browser):
npx playwright test --headed

# 6. Interactive step-through debugging:
npx playwright test --debug

# 7. Modern visual UI Mode:
npx playwright test --ui

# 8. Specify number of parallel workers:
npx playwright test --workers=4
\`\`\`

### Tagging Tests with \`@smoke\`, \`@regression\`, \`@api\`
Incorporate tags into test titles:
\`\`\`javascript
test('fast login verification @smoke @auth', async ({ page }) => { ... });
\`\`\`
Now run only smoke tests:
\`\`\`bash
npx playwright test --grep "@smoke"
\`\`\``,
      keyTakeaways: [
        'Use targeted CLI flags (-g, file paths, --project) to run specific tests instantly.',
        'Use @tags in test titles (e.g. @smoke, @regression) for flexible suite execution in CI.',
        'Tune workers (--workers=N) according to machine CPU core capacity.',
      ],
      terminology: [
        { term: 'Test Tagging', definition: 'The convention of adding metadata strings (e.g. @smoke, @critical) to test titles to enable targeted grep filtering.' },
        { term: 'grep Filter', definition: 'A CLI parameter (-g or --grep) that matches regular expressions against test titles.' },
      ],
      examples: [
        {
          title: 'Running a Targeted Smoke Test Suite',
          description: 'Targeting smoke tests on Chromium in headed mode.',
          codeSnippet: `npx playwright test -g "@smoke" --project=chromium --headed`,
        },
      ],
      exercise: {
        id: 'checkpoint-git-4',
        title: 'Targeted CLI Execution',
        prompt: 'Which command runs only the tests tagged with @smoke on the Chromium project in headed mode?',
        options: [
          'npx playwright test -g "@smoke" --project=chromium --headed',
          'playwright run smoke chrome show',
          'npm test --all',
          'git run @smoke',
        ],
        correctAnswerIndex: 0,
        explanation: '-g "@smoke" filters tests containing the tag, --project=chromium selects the browser, and --headed opens visible browser windows.',
      },
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-day14-1',
      questionNumber: 1,
      question: 'What is the purpose of playwright.config.js, and what are the most critical settings for a production CI environment?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Configuration architecture and production stability.',
      modelAnswer:
        'playwright.config.js is the central configuration file defining how Playwright discovers, organizes, and executes tests. For production CI environments, the most critical settings include: `forbidOnly: !!process.env.CI` (to fail the build if test.only was committed), `retries: process.env.CI ? 2 : 0` (to absorb intermittent network hiccups while failing fast locally), `fullyParallel: true` (to maximize worker concurrency), `baseURL` (to decouple test scripts from environment domains), `reporter: [["html", { open: "never" }], ["list"]]`, and `trace: "on-first-retry"` or `"retain-on-failure"` to capture diagnostic artifacts on failure.',
      followUpQuestion: 'How does configuring workers: 2 in CI prevent resource exhaustion on limited virtual runners?',
    },
    {
      id: 'iq-day14-2',
      questionNumber: 2,
      question: 'How does Playwright support cross-browser testing across Chromium, Firefox, and WebKit?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Browser engine architecture and cross-browser coverage.',
      modelAnswer:
        'Playwright bundles binaries for the actual rendering engines: Chromium (Chrome, Edge), Firefox (Gecko), and WebKit (Safari). In `playwright.config.js`, we define separate projects inside the `projects` array for each engine using built-in presets from `@playwright/test` devices (e.g. `Desktop Chrome`, `Desktop Firefox`, `Desktop Safari`). When executed, Playwright runs the exact same test scripts against all configured projects in parallel, ensuring cross-browser rendering and behavior consistency without requiring third-party cloud grids.',
      followUpQuestion: 'Why is WebKit on Linux useful for teams that develop on Windows or Linux?',
    },
    {
      id: 'iq-day14-3',
      questionNumber: 3,
      question: 'How do you structure test tags in Playwright to run different suites (e.g. Smoke vs Regression)?',
      difficulty: 'Beginner',
      assessmentFocus: 'Test selection, naming conventions, and CLI filtering.',
      modelAnswer:
        'We add tag keywords like `@smoke`, `@regression`, or `@critical` directly into test titles (e.g. `test("user checkout flow @smoke @critical", async ({ page }) => { ... })`). In CI pipelines or terminal commands, we use the `--grep` (`-g`) flag to run specific subsets (e.g. `npx playwright test -g "@smoke"`). We can also use `--grep-invert` to exclude specific suites (e.g. `npx playwright test --grep-invert "@slow"`).',
      followUpQuestion: 'Can tags also be configured at the test.describe() level?',
    },
    {
      id: 'iq-day14-4',
      questionNumber: 4,
      question: 'What checklist do you use when reviewing an automation pull request submitted by a teammate?',
      difficulty: 'Advanced',
      assessmentFocus: 'Code review standards, quality gates, and maintainability.',
      modelAnswer:
        'My review checklist includes: 1) Are locators accessible and resilient (`getByRole`, `getByLabel`) rather than brittle XPaths or auto-generated CSS classes? 2) Are assertions web-first (`await expect(...)`) with no arbitrary sleeps (`page.waitForTimeout`)? 3) Are tests independent (no shared mutable state between tests)? 4) Are test credentials loaded securely via `process.env` with zero hardcoded passwords? 5) Does the test clean up database entities or use collision-free unique data? 6) Did they remove any `test.only` or `page.pause` debugging statements? 7) Is reusable logic encapsulated in Page Objects?',
      followUpQuestion: 'How would you handle a PR where a teammate increased a test timeout to 60 seconds to fix flakiness?',
    },
    {
      id: 'iq-day14-5',
      questionNumber: 5,
      question: 'How does mobile device emulation in Playwright work, and how does it differ from testing on real physical devices?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Emulation capabilities, viewports, and testing boundaries.',
      modelAnswer:
        'Playwright provides mobile device emulation using pre-configured presets in `devices` (e.g. `devices["Pixel 7"]` or `devices["iPhone 14"]`). These presets configure the browser context’s viewport dimensions, deviceScaleFactor (pixel ratio), isMobile flag, touch event support, and user-agent string. It runs on the desktop Chromium or WebKit engine. While this is fast, reliable, and catches 90% of responsive UI and touch event defects, it does not execute on real mobile hardware or native mobile OS kernels, so device-specific hardware bugs (camera, thermal throttling) still require real device testing.',
      followUpQuestion: 'Why is touch support emulation important when testing mobile viewports?',
    },
  ],

  quizQuestions: [
    {
      id: 'q-d14-1',
      questionNumber: 1,
      question: 'What does the forbidOnly: !!process.env.CI option do in playwright.config.js?',
      options: [
        'It causes the test runner to fail immediately with an error if test.only() was left in any test file when running in CI',
        'It forbids the use of JavaScript in CI',
        'It only allows one test to run per hour',
        'It blocks Chromium from launching',
      ],
      correctAnswerIndex: 0,
      explanation: 'forbidOnly fails the build if a developer accidentally committed test.only(), preventing accidental skips of the entire test suite in CI.',
    },
    {
      id: 'q-d14-2',
      questionNumber: 2,
      question: 'Which browser rendering engine is used by Playwright to simulate Apple Safari?',
      options: [
        'WebKit',
        'Chromium',
        'Gecko',
        'Blink',
      ],
      correctAnswerIndex: 0,
      explanation: 'WebKit is the open-source browser engine developed by Apple that powers Safari on macOS and all iOS browsers.',
    },
    {
      id: 'q-d14-3',
      questionNumber: 3,
      question: 'Which CLI flag filters tests by title using a regular expression?',
      options: [
        '-g or --grep',
        '-f or --filter',
        '-s or --select',
        '-t or --target',
      ],
      correctAnswerIndex: 0,
      explanation: '-g (or --grep) filters tests whose titles match the provided string or regular expression.',
    },
    {
      id: 'q-d14-4',
      questionNumber: 4,
      question: 'How do you target only the Firefox project when running Playwright from the command line?',
      options: [
        'npx playwright test --project=firefox',
        'npx playwright test --browser=ff',
        'npm test firefox',
        'playwright use firefox',
      ],
      correctAnswerIndex: 0,
      explanation: '--project=<name> restricts test execution to the specified project defined in playwright.config.js.',
    },
    {
      id: 'q-d14-5',
      questionNumber: 5,
      question: 'What does devices["iPhone 14"] provide when added to a project’s use configuration?',
      options: [
        'Predefined mobile viewport dimensions, deviceScaleFactor, user-agent string, and touch emulation',
        'A physical iPhone delivered by courier',
        'An iOS simulator running in Xcode',
        'A Bluetooth connection to an iPhone',
      ],
      correctAnswerIndex: 0,
      explanation: 'Playwright device descriptors bundle standard mobile parameters (viewport size, pixel ratio, touch support, user-agent) for responsive testing.',
    },
    {
      id: 'q-d14-6',
      questionNumber: 6,
      question: 'Why should retries be set to 0 during local development and 1 or 2 in CI?',
      options: [
        'Locally, engineers need to see failures immediately to debug them; in CI, retries absorb minor network hiccups while flagging flaky tests in reports',
        'Because local computers cannot execute retries',
        'Because retries are a paid feature in local development',
        'Because retries delete source code locally',
      ],
      correctAnswerIndex: 0,
      explanation: 'Failing fast locally speeds up debugging; in CI, 1–2 retries prevent intermittent external network blips from breaking deployment pipelines.',
    },
    {
      id: 'q-d14-7',
      questionNumber: 7,
      question: 'What is the recommended Git branching strategy for automation engineers working in an Agile team?',
      options: [
        'Create feature branches (e.g. test/checkout-flow), commit atomic changes, and submit Pull Requests for peer review',
        'Push directly to main branch without testing',
        'Never commit code to Git',
        'Email zip files of tests to team members',
      ],
      correctAnswerIndex: 0,
      explanation: 'Feature branches with atomic commits and Pull Request reviews ensure code quality, prevent regressions, and trigger automated CI test runs.',
    },
    {
      id: 'q-d14-8',
      questionNumber: 8,
      question: 'What is the purpose of the baseURL option in playwright.config.js?',
      options: [
        'It defines the default domain prefix so tests can use relative paths like page.goto("/login") without hardcoding domains',
        'It encrypts passwords in the browser',
        'It changes the operating system hostname',
        'It limits test execution to port 80',
      ],
      correctAnswerIndex: 0,
      explanation: 'baseURL prepends the target server URL to relative paths, enabling the exact same test suite to execute against Staging, QA, or Production.',
    },
    {
      id: 'q-d14-9',
      questionNumber: 9,
      question: 'Which file should be excluded from Git to prevent exposing credentials and environment secrets?',
      options: [
        '.env',
        'package.json',
        'playwright.config.js',
        'README.md',
      ],
      correctAnswerIndex: 0,
      explanation: '.env files containing sensitive passwords and API keys must be listed in .gitignore and never committed to version control.',
    },
    {
      id: 'q-d14-10',
      questionNumber: 10,
      question: 'How do you invert a grep filter in Playwright to run all tests EXCEPT those tagged with @slow?',
      options: [
        'npx playwright test --grep-invert "@slow"',
        'npx playwright test --not "@slow"',
        'npx playwright test --exclude "@slow"',
        'npx playwright test --skip-slow',
      ],
      correctAnswerIndex: 0,
      explanation: '--grep-invert excludes tests matching the specified pattern, allowing fast test execution by skipping long-running or quarantined tests.',
    },
  ],
};

export const PLAYWRIGHT_DAY_14_STARTER_CODE = `// playwright.config.js - Enterprise Production Configuration
const { defineConfig, devices } = require('@playwright/test');

/**
 * Clean, production-hardened Playwright configuration:
 * 1. Multi-browser support (Chromium, Firefox, WebKit) + Mobile Emulation
 * 2. Environment-based baseURL (Staging vs Production)
 * 3. Sensible timeout tiers and retries
 * 4. forbidOnly enabled in CI
 * 5. Diagnostic reporting with Trace Viewer on failure
 * 6. Zero hardcoded credentials or committed secrets
 */
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,

  // Fail CI builds immediately if test.only was accidentally committed!
  forbidOnly: !!process.env.CI,

  // Fail-fast locally (0 retries), absorb transient blips in CI (2 retries)
  retries: process.env.CI ? 2 : 0,

  // Scale worker count according to environment
  workers: process.env.CI ? 2 : undefined,

  // Global test execution timeout: 30 seconds
  timeout: 30000,

  // Web-first auto-retrying assertion timeout: 5 seconds
  expect: {
    timeout: 5000,
  },

  // Multi-reporter: list output in terminal + interactive HTML report
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  // Shared test options across all browser projects
  use: {
    // Relative URLs navigate against this base URL
    baseURL: process.env.BASE_URL || 'https://staging.rootaccess.org',

    // Diagnostic artifacts: capture traces and screenshots ONLY when tests fail
    trace: process.env.CI ? 'retain-on-failure' : 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Actionability timeout for clicks/fills: 10 seconds
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  // Cross-Browser Testing Project Matrix
  projects: [
    // 1. Desktop Chromium (Chrome / Edge)
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // 2. Desktop Firefox (Gecko)
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // 3. Desktop WebKit (Safari engine)
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // 4. Mobile Viewport Emulation (Pixel 7)
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
`;

export const PLAYWRIGHT_DAY_14_STARTER_EXPLANATION = `Configuration & Cross-Browser Architecture:
1. Multi-Browser Matrix: Configured desktop Chromium, Firefox, WebKit, and mobile viewport emulation (Pixel 7) using official Playwright device descriptors.
2. Production CI Guardrails: Implemented forbidOnly: !!process.env.CI to prevent unverified merges if test.only is committed.
3. Tiered Retries: Configured 0 retries locally for rapid feedback and 2 retries in CI to absorb intermittent network latency while tagging flaky tests.
4. BaseURL Decoupling: Set process.env.BASE_URL with a safe default, allowing the exact same test files to run against Staging or QA.
5. Storage-Efficient Tracing: Configured retain-on-failure to record Trace Viewer artifacts only when tests fail, saving CI storage and bandwidth.
6. Secret Safety: Excluded all credentials and sensitive tokens from the configuration file.
7. Targeted CLI Execution: Targeted runs via --project=chromium or --grep=@smoke.
8. Git Hygiene: Ignored test-results/ and .env secrets in .gitignore.`;

export const PLAYWRIGHT_DAY_14_STARTER_OUTPUT = `Loaded configuration from: playwright.config.js
Running 12 tests across 4 projects (chromium, firefox, webkit, mobile-chrome)
  ✓ [chromium] › auth/login.spec.js:10:3 › TC-1: standard login (710ms)
  ✓ [firefox] › auth/login.spec.js:10:3 › TC-1: standard login (890ms)
  ✓ [webkit] › auth/login.spec.js:10:3 › TC-1: standard login (920ms)
  ✓ [mobile-chrome] › auth/login.spec.js:10:3 › TC-1: standard login (740ms)

  12 passed (3.4s)
  HTML report written to: playwright-report/index.html`;

export function evaluateDay14Assignment(
  code: string,
  expectedOutput: string,
  explanation: string
): PlaywrightDay14AssignmentRubric {
  const criteria: PlaywrightDay14AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Configures playwright.config.js file structure
  const configuresPlaywrightConfigFile =
    /defineConfig|module\.exports\s*=/i.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'Playwright Config File Structure',
    passed: configuresPlaywrightConfigFile,
    feedback: configuresPlaywrightConfigFile
      ? 'Exported standard Playwright configuration object.'
      : 'Use defineConfig or module.exports to export configuration.',
  });
  if (configuresPlaywrightConfigFile) score += 1;

  // 2. Defines baseURL
  const definesBaseUrl =
    /baseURL:\s*process\.env\.BASE_URL|baseURL:\s*['"]http/i.test(code);
  criteria.push({
    id: 'crit-2',
    title: 'Base URL Configuration',
    passed: definesBaseUrl,
    feedback: definesBaseUrl
      ? 'Configured environment-aware baseURL property.'
      : 'Define baseURL in the use configuration block.',
  });
  if (definesBaseUrl) score += 1;

  // 3. Configures multi-browser projects
  const configuresMultiBrowserProjects =
    /name:\s*['"]chromium['"]/i.test(code) &&
    /name:\s*['"]firefox['"]/i.test(code) &&
    /name:\s*['"]webkit['"]/i.test(code);
  criteria.push({
    id: 'crit-3',
    title: 'Multi-Browser Matrix (Chromium, Firefox, WebKit)',
    passed: configuresMultiBrowserProjects,
    feedback: configuresMultiBrowserProjects
      ? 'Configured projects array covering Chromium, Firefox, and WebKit.'
      : 'Include chromium, firefox, and webkit in the projects array.',
  });
  if (configuresMultiBrowserProjects) score += 1;

  // 4. Sets sensible timeouts and retries
  const setsSensibleTimeoutsAndRetries =
    /timeout:\s*\d{4,}/.test(code) &&
    /retries:\s*process\.env\.CI/i.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Sensible Timeouts and Retries Strategy',
    passed: setsSensibleTimeoutsAndRetries,
    feedback: setsSensibleTimeoutsAndRetries
      ? 'Configured timeouts and conditional CI retries.'
      : 'Configure global timeout and conditional CI retries.',
  });
  if (setsSensibleTimeoutsAndRetries) score += 1;

  // 5. Removes committed secrets
  const removesCommittedSecrets =
    !/password:\s*['"][^'"]{5,}['"]/i.test(code) &&
    !/apiKey:\s*['"][^'"]{10,}['"]/i.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'Zero Hardcoded Secrets in Config',
    passed: removesCommittedSecrets,
    feedback: removesCommittedSecrets
      ? 'Maintained strict secret hygiene with zero embedded credentials.'
      : 'Remove any hardcoded passwords or API keys from config.',
  });
  if (removesCommittedSecrets) score += 1;

  // 6. Configures workers and parallelism
  const configuresWorkersAndParallelism =
    /fullyParallel:\s*true/i.test(code) &&
    /workers:/i.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Parallelism & Worker Allocation',
    passed: configuresWorkersAndParallelism,
    feedback: configuresWorkersAndParallelism
      ? 'Enabled fullyParallel and tuned worker concurrency.'
      : 'Configure fullyParallel: true and worker settings.',
  });
  if (configuresWorkersAndParallelism) score += 1;

  // 7. Demonstrates targeted CLI execution understanding
  const demonstratesTargetedCliExecution =
    /--project|--grep|-g/i.test(explanation) ||
    /--project|--grep|-g/i.test(expectedOutput);
  criteria.push({
    id: 'crit-7',
    title: 'Targeted CLI Execution Understanding',
    passed: demonstratesTargetedCliExecution,
    feedback: demonstratesTargetedCliExecution
      ? 'Demonstrated CLI flags (--project, --grep) for targeted runs.'
      : 'Explain targeted CLI execution in explanation or output.',
  });
  if (demonstratesTargetedCliExecution) score += 1;

  // 8. Includes gitignore best practices
  const includesGitignoreBestPractices =
    /\.gitignore/i.test(explanation) ||
    /playwright\/\.auth|\.env|test-results/i.test(explanation);
  criteria.push({
    id: 'crit-8',
    title: '.gitignore Hygiene & Artifact Filtering',
    passed: includesGitignoreBestPractices,
    feedback: includesGitignoreBestPractices
      ? 'Documented .gitignore hygiene for test artifacts and secrets.'
      : 'Reference .gitignore best practices in your explanation.',
  });
  if (includesGitignoreBestPractices) score += 1;

  // 9. Explains cross-browser differences
  const explainsCrossBrowserDifferences =
    /webkit|firefox|engine|safari/i.test(explanation);
  criteria.push({
    id: 'crit-9',
    title: 'Cross-Browser Engine Differences',
    passed: explainsCrossBrowserDifferences,
    feedback: explainsCrossBrowserDifferences
      ? 'Explained browser engine differences between Chromium, Firefox, and WebKit.'
      : 'Discuss browser engine trade-offs in your explanation.',
  });
  if (explainsCrossBrowserDifferences) score += 1;

  // 10. Syntactically valid JavaScript
  let syntacticallyValidJavaScript = true;
  try {
    new Function(code);
  } catch {
    syntacticallyValidJavaScript =
      code.includes('require(') || code.includes('defineConfig');
  }
  criteria.push({
    id: 'crit-10',
    title: 'Pure JavaScript Syntax (.js)',
    passed: syntacticallyValidJavaScript,
    feedback: syntacticallyValidJavaScript
      ? 'Authored clean, valid JavaScript configuration code.'
      : 'Ensure configuration is syntactically valid JavaScript.',
  });
  if (syntacticallyValidJavaScript) score += 1;

  const passed = score >= 8;
  const feedback = criteria.map((c) => `${c.passed ? '✓' : '✗'} ${c.title}: ${c.feedback}`);

  return {
    score,
    feedback,
    passed,
    criteria,
    configuresPlaywrightConfigFile,
    definesBaseUrl,
    configuresMultiBrowserProjects,
    setsSensibleTimeoutsAndRetries,
    removesCommittedSecrets,
    configuresWorkersAndParallelism,
    demonstratesTargetedCliExecution,
    includesGitignoreBestPractices,
    explainsCrossBrowserDifferences,
    syntacticallyValidJavaScript,
  };
}
