import type {
  PlaywrightDay8Unit,
  PlaywrightDay8AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_8_DATA: PlaywrightDay8Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 8,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Hooks, Fixtures and Test Organisation',
  subtitle:
    'Architect maintainable, scalable test suites using test lifecycle hooks (beforeEach/afterEach), built-in and custom fixtures (test.extend), modular helper utilities, and production playwright.config.js configurations.',
  level: 'Intermediate to Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–7 concepts (Actions, web-first assertions, auto-waiting, multi-tab and iframe handling).',
  learningObjectives: [
    'Structure clean, readable test suites using test.describe() grouping blocks and feature-based directory layouts.',
    'Implement test lifecycle hooks: test.beforeEach(), test.afterEach(), test.beforeAll(), and test.afterAll().',
    'Differentiate between per-test setup and shared setup, and avoid shared mutable state anti-patterns in parallel runs.',
    'Understand Playwright fixtures architecture (built-in page, context, browser) and fixture lifecycle management.',
    'Author custom domain fixtures using test.extend() to inject pre-authenticated sessions or mock test data.',
    'Design reusable helper functions that pass locators and test data without creating rigid, brittle abstractions.',
    'Configure playwright.config.js (testDir, fullyParallel, workers, retries, reporters, use) and execute targeted CLI commands.',
  ],

  roadmap: [
    { day: 1, title: 'Day 1: Automation Fundamentals & Playwright', focus: 'E2E Testing, Architecture, Roadmap', isCompleted: true },
    { day: 2, title: 'Day 2: JavaScript Essentials for Automation', focus: 'Variables, Logic, Functions, Async/Await', isCompleted: true },
    { day: 3, title: 'Day 3: Playwright Setup & First Script', focus: 'CLI, Config, Chromium, First Test', isCompleted: true },
    { day: 4, title: 'Day 4: Locators and Element Identification', focus: 'getByRole, getByLabel, CSS, XPath, Strictness, AI', isCompleted: true },
    { day: 5, title: 'Day 5: Actions, Assertions, Forms & Test Design', focus: 'User Actions, Web-First Assertions, AAA Pattern', isCompleted: true },
    { day: 6, title: 'Day 6: Auto-Waiting, Timeouts & Flakiness', focus: 'Actionability, Timeouts, Trace Viewer, Flakiness', isCompleted: true },
    { day: 7, title: 'Day 7: Navigation, Tabs, Frames & Dialogs', focus: 'Multi-Tab, Iframes, JavaScript Dialogs, Uploads', isCompleted: true },
    { day: 8, title: 'Day 8: Hooks, Fixtures & Test Organisation', focus: 'beforeEach, test.extend, Test Suite Architecture', isCurrent: true },
    { day: 9, title: 'Day 9: API Testing & Network Interception', focus: 'REST APIs, Route Mocking, JSON Validation' },
    { day: 10, title: 'Day 10: Page Object Model (POM) Design', focus: 'Maintainable Classes, Clean Page Abstractions' },
    { day: 11, title: 'Day 11: Data-Driven Testing with JSON & CSV', focus: 'Parameterized Suites, Dynamic Data Fixtures' },
    { day: 12, title: 'Day 12: Authentication & Storage State', focus: 'Session Reuse, Bypass Login, Cookies' },
    { day: 13, title: 'Day 13: Visual Regression & Screenshots', focus: 'Pixel Diffing, toHaveScreenshot Baselines' },
    { day: 14, title: 'Day 14: CI/CD Pipeline Integration', focus: 'GitHub Actions, Headless Runs, Artifacts' },
    { day: 15, title: 'Day 15: Debugging, Trace Viewer & Video', focus: 'playwright.dev/trace, Step Timeline' },
    { day: 16, title: 'Day 16: AI-Assisted Test Automation', focus: 'LLM Prompt Engineering, DOM Grounding' },
    { day: 17, title: 'Day 17: AI Self-Healing Locators', focus: 'DOM Mutation Detection, Resilient Selectors' },
    { day: 18, title: 'Day 18: Synthetic Data & Edge Cases', focus: 'AI-Generated Fixtures, Boundary Fuzzing' },
    { day: 19, title: 'Day 19: Capstone E2E Test Suite', focus: 'Production Regression Pipeline' },
    { day: 20, title: 'Day 20: Interview Mastery & Certification', focus: 'Portfolio Defense, Comprehensive Exam' },
  ],

  topics: [
    // -----------------------------------------------------------------------
    // TOPIC 1: Test Organisation & Suite Structure
    // -----------------------------------------------------------------------
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: Test Organisation & Suite Structure',
      durationMinutes: 25,
      explanation: `As your test automation repository scales from 5 tests to 500 tests, organizing files by business capability rather than technical arbitrary layers is essential.

### Grouping Tests with \`test.describe\`

\`test.describe()\` groups related tests together into logical blocks. It clarifies reports and allows sharing setup hooks across specific subsets of tests:

\`\`\`javascript
// tests/customer/customer_management.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Customer Management Module', () => {

  test.describe('Customer Creation Flow', () => {
    test('creates a standard enterprise customer profile', async ({ page }) => {
      // ...
    });

    test('validates tax identifier format', async ({ page }) => {
      // ...
    });
  });

  test.describe('Customer Search & Filtering', () => {
    test('filters customers by subscription status', async ({ page }) => {
      // ...
    });
  });

});
\`\`\`

### Recommended Project Directory Structure

\`\`\`text
my-playwright-project/
├── playwright.config.js          # Central configuration
├── package.json
├── fixtures/                     # Test data (JSON, CSV, PDF attachments)
│   ├── sample_customer.json
│   └── test_upload.pdf
├── helpers/                      # Small reusable helper utilities
│   ├── authHelper.js
│   └── customerHelper.js
└── tests/                        # Feature-organized test files
    ├── auth/
    │   ├── login.spec.js
    │   └── password_reset.spec.js
    ├── customer/
    │   ├── customer_creation.spec.js
    │   └── customer_search.spec.js
    └── billing/
        └── invoice_download.spec.js
\`\`\`

### When to Split Large Test Files
- **Rule of Thumb:** If a test file exceeds 200 lines or covers multiple distinct business user journeys, split it into separate \`.spec.js\` files.
- Separate files run concurrently across worker threads, drastically reducing overall CI execution duration!`,
      keyTakeaways: [
        'Use test.describe() to group tests by feature or user journey.',
        'Organize test files by business domain (e.g. tests/customer/, tests/billing/).',
        'Keep files under 200 lines so tests can parallelize across multiple workers.',
        'Use meaningful, narrative test titles that describe the business behavior.',
      ],
      terminology: [
        { term: 'test.describe()', definition: 'Playwright grouping block used to organize related tests and scope lifecycle hooks.' },
        { term: 'Domain-Driven Directory Structure', definition: 'Organizing automation folders by application feature rather than technical categorization.' },
      ],
      examples: [
        {
          title: 'Clean Describe Grouping Pattern',
          description: 'A structured file with nested describe blocks demonstrating clear test hierarchy.',
          codeSnippet: `test.describe('Workspace Settings', () => {
  test.describe('Member Invitations', () => {
    test('sends invitation email with admin privileges', async ({ page }) => {
      // ...
    });
    test('blocks invitations with invalid domain', async ({ page }) => {
      // ...
    });
  });
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-org-1',
        title: 'Parallelism & File Organization',
        prompt: 'Why does splitting a 50-test monolithic file into 5 separate test files improve CI test run speed in Playwright?',
        options: [
          'Because Playwright parallelizes execution at the file level across worker processes, allowing 5 files to run concurrently',
          'Because JavaScript can only parse 10 tests per file',
          'Because Chromium crashes when a file has more than 15 tests',
          'It does not change speed; it only changes font color',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Playwright distributes test files across available CPU workers. Multiple smaller files can execute simultaneously on multiple workers, whereas a single file runs tests on one worker by default.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 2: Test Lifecycle Hooks (beforeEach, afterEach, beforeAll)
    // -----------------------------------------------------------------------
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Test Lifecycle Hooks',
      durationMinutes: 30,
      explanation: `Lifecycle hooks allow you to execute setup and teardown code before and after tests run.

### The 4 Playwright Lifecycle Hooks

1. **\`test.beforeEach(async ({ page }) => { ... })\`**
   - Runs **once before each individual test** in the file or describe block.
   - Ideal for: Navigating to the starting page, resetting form state, or setting up test-specific preconditions.
2. **\`test.afterEach(async ({ page }) => { ... })\`**
   - Runs **once after each individual test**.
   - Ideal for: Cleaning up temporary test records, clearing local storage, or capturing custom logs.
3. **\`test.beforeAll(async () => { ... })\`**
   - Runs **once before all tests** in the file start.
   - Ideal for: Heavy one-time setup (e.g. creating a test database schema, seeding master data via API).
   - *Note:* Does not receive the \`page\` fixture by default because pages are isolated per test!
4. **\`test.afterAll(async () => { ... })\`**
   - Runs **once after all tests** in the file complete.
   - Ideal for: Teardown (e.g. purging database test accounts, closing database connections).

### Critical Warning: Shared Mutable State Anti-Pattern!

\`\`\`javascript
// ❌ DANGEROUS ANTI-PATTERN: Shared mutable state across tests!
let customerId;

test.beforeAll(async () => {
  // Creating shared mutable variable
  customerId = 'CUST-1001';
});

test('edits customer name', async ({ page }) => {
  // Modifies shared customer
});

test('deletes customer', async ({ page }) => {
  // If this runs before 'edits customer', the other test fails!
});
\`\`\`

**Rule:** Tests must be **independent**. Use \`beforeEach\` for isolated test-level setup, and generate unique IDs for each test (e.g. \`customer-\${Date.now()}\`).`,
      keyTakeaways: [
        'Use test.beforeEach() for isolated per-test navigation and setup.',
        'Use test.afterEach() for per-test cleanup.',
        'Reserve beforeAll and afterAll strictly for global data setup or API seeding.',
        'Never share mutable state between tests—parallel execution will cause cascading failures.',
      ],
      terminology: [
        { term: 'beforeEach', definition: 'Hook executed prior to every test block within its current scope.' },
        { term: 'Shared Mutable State', definition: 'Variables modified across tests that create uncoordinated interdependencies and flakiness.' },
      ],
      examples: [
        {
          title: 'Standard beforeEach Pattern',
          description: 'Navigating and verifying landing page before every test in a suite.',
          codeSnippet: `test.describe('Customer Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Isolated setup for every test:
    await page.goto('/customers');
    await expect(page.getByRole('heading', { name: 'Customer Directory' })).toBeVisible();
  });

  test('searches by email address', async ({ page }) => {
    await page.getByPlaceholder('Search customers').fill('alex@rootaccess.org');
    await expect(page.getByRole('row')).toHaveCount(2); // header + 1 result
  });

  test('filters by active status', async ({ page }) => {
    await page.getByLabel('Status Filter').selectOption('active');
    await expect(page.getByTestId('badge-active')).toBeVisible();
  });
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-hooks-1',
        title: 'beforeEach vs beforeAll',
        prompt: 'Why does test.beforeEach() receive the { page } fixture while test.beforeAll() does not receive it by default?',
        options: [
          'Because each test receives an isolated fresh BrowserContext and Page, so a single page cannot span across all tests',
          'Because beforeAll is only written in Python',
          'Because beforeEach runs after the test completes',
          'Because Playwright forbids using browsers in beforeAll',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Playwright isolates each test with its own clean BrowserContext and Page. Therefore, a page cannot be shared across multiple tests in beforeAll.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 3: Fixtures Architecture & Custom Fixtures
    // -----------------------------------------------------------------------
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Fixtures Architecture & Custom Fixtures (test.extend)',
      durationMinutes: 30,
      explanation: `Fixtures are one of Playwright's most powerful architectural features. If you have ever wondered where \`{ page }\` or \`{ context }\` in your test parameters comes from, they are **built-in fixtures**!

### What Is a Fixture?
A fixture is an isolated environment component that is prepared before your test runs and cleaned up automatically after your test finishes.

Key advantages of fixtures over \`beforeEach\` / \`afterEach\`:
1. **On-Demand:** Fixtures only run if your test explicitly requests them in its arguments.
2. **Encapsulation:** Setup and teardown live together in a single function using the \`use()\` callback.
3. **Composability:** Fixtures can depend on other fixtures.

### How a Fixture Works Under the Hood

\`\`\`javascript
// Simplified mental model of the built-in { page } fixture:
async function pageFixture({ context }, use) {
  // 1. SETUP: Create a new page
  const page = await context.newPage();

  // 2. RUN TEST: Hand the page over to the test
  await use(page);

  // 3. TEARDOWN: Automatically closes page when test finishes!
  await page.close();
}
\`\`\`

### Creating a Custom Fixture with \`test.extend()\`

You can define your own domain fixtures (such as an authenticated admin page or pre-seeded customer data):

\`\`\`javascript
// fixtures/customerFixture.js
const base = require('@playwright/test');

// Extend base test with custom fixture
const test = base.test.extend({
  // Define custom fixture:
  customerData: async ({}, use) => {
    // Setup: Generate unique customer object
    const customer = {
      name: \`Test Client \${Date.now()}\`,
      email: \`client_\${Date.now()}@rootaccess.org\`,
      plan: 'Enterprise',
    };

    // Provide to test:
    await use(customer);

    // Teardown (if needed, e.g. API cleanup):
    console.log(\`Finished test for \${customer.email}\`);
  },
});

module.exports = { test, expect: base.expect };
\`\`\`

Using the custom fixture in a test:
\`\`\`javascript
const { test, expect } = require('./fixtures/customerFixture');

test('creates customer using custom fixture', async ({ page, customerData }) => {
  await page.goto('/customers/new');
  await page.getByLabel('Client Name').fill(customerData.name);
  await page.getByLabel('Email').fill(customerData.email);
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByRole('alert')).toContainText(customerData.name);
});
\`\`\``,
      keyTakeaways: [
        'Fixtures encapsulate setup and teardown into a single function using the use() callback.',
        'Fixtures only initialize if a test explicitly asks for them in its parameter destructuring.',
        'Use test.extend() to create domain fixtures for test data, logged-in states, or custom tools.',
        'Fixtures promote test independence and clean modular code.',
      ],
      terminology: [
        { term: 'Fixture', definition: 'An on-demand test dependency with an encapsulated setup, execution yield (use), and teardown cycle.' },
        { term: 'test.extend()', definition: 'Playwright API used to create custom test runners with user-defined fixtures.' },
      ],
      examples: [
        {
          title: 'Custom Authenticated Page Fixture',
          description: 'A custom fixture that automatically logs in before yielding the page.',
          codeSnippet: `const base = require('@playwright/test');

const test = base.test.extend({
  authenticatedPage: async ({ page }, use) => {
    // 1. Setup login
    await page.goto('/login');
    await page.getByLabel('Email').fill('admin@rootaccess.org');
    await page.getByLabel('Password').fill('AdminPass123!');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await base.expect(page).toHaveURL(/.*dashboard/);

    // 2. Yield to test
    await use(page);
  },
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-fixtures-1',
        title: 'Fixture Lifecycle Mechanics',
        prompt: 'In a custom Playwright fixture, what is the role of the await use(fixtureValue) statement?',
        options: [
          'It hands control over to the test function with the fixture value, pausing fixture execution until the test completes',
          'It imports an external npm package into memory',
          'It reboots the browser engine',
          'It deletes the test database',
        ],
        correctAnswerIndex: 0,
        explanation:
          'await use(value) yields execution to the test body. Code before use() is setup; code after use() runs as teardown once the test finishes.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 4: Reusable Helpers
    // -----------------------------------------------------------------------
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Reusable Helpers',
      durationMinutes: 25,
      explanation: `While fixtures manage environment state, **helper functions** encapsulate repeated UI workflows into concise, reusable utility functions.

### When to Use a Helper Function
If you find yourself copy-pasting the same 4 lines of form inputs across 10 tests, extract them into a clean helper:

\`\`\`javascript
// helpers/customerHelpers.js

/**
 * Fills out and submits the customer creation form.
 * @param {import('@playwright/test').Page} page
 * @param {Object} customer
 */
async function createCustomer(page, customer) {
  await page.getByLabel('Customer Name').fill(customer.name);
  await page.getByLabel('Contact Email').fill(customer.email);
  await page.getByLabel('Subscription Plan').selectOption(customer.plan);
  await page.getByRole('button', { name: 'Save Customer' }).click();
}

module.exports = { createCustomer };
\`\`\`

### Rules for Writing Clean Helpers
1. **Pass the \`page\` object explicitly:** Helpers should be pure functions that accept \`page\` as their first argument.
2. **Avoid Global State:** Helpers must not store internal variables or state across calls.
3. **Keep Assertions Close to the Test:** Helpers should execute the steps; the test itself should assert the expected business outcome. This keeps test failures readable and points directly to the failed test assertion.`,
      keyTakeaways: [
        'Extract repeated UI interaction sequences into pure helper functions.',
        'Always pass the page object as an argument to helper functions.',
        'Keep assertions inside test files so test reports clearly indicate what failed.',
        'Avoid over-abstracting; keep helpers focused on a single responsibility.',
      ],
      terminology: [
        { term: 'Helper Function', definition: 'A utility function encapsulating repeated test steps, accepting the page object and test parameters.' },
      ],
      examples: [
        {
          title: 'Using Helpers in a Clean Spec File',
          description: 'A test utilizing a reusable helper function for repetitive data entry.',
          codeSnippet: `const { test, expect } = require('@playwright/test');
const { createCustomer } = require('../../helpers/customerHelpers');

test('creates a standard enterprise customer', async ({ page }) => {
  await page.goto('/customers/new');

  // Use helper
  await createCustomer(page, {
    name: 'Acme Corporation',
    email: 'billing@acme.com',
    plan: 'enterprise',
  });

  // Assert outcome in the test
  await expect(page.getByRole('alert')).toHaveText('Customer created successfully');
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-helpers-1',
        title: 'Helper Design Principles',
        prompt: 'Why is it generally recommended to keep business assertions inside the test() file rather than burying them inside a generic helper function?',
        options: [
          'Because when an assertion fails, the test report and stack trace immediately show the failing line in the test spec, clarifying the expected behavior',
          'Because JavaScript does not allow expect() inside helper files',
          'Because helpers run in a different browser process',
          'Because assertions make helper functions run slower',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Keeping assertions in the test spec ensures that test reports clearly document what failed and why, rather than pointing to a line in an obscure utility file.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 5: Configuration & Test Execution (playwright.config.js)
    // -----------------------------------------------------------------------
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Topic 5: Configuration & Test Execution (playwright.config.js)',
      durationMinutes: 25,
      explanation: `\`playwright.config.js\` is the control room of your automation framework.

### Production Configuration Anatomy

\`\`\`javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Directory where Playwright searches for test files
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail build on CI if test.only is accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI if server resources are limited
  workers: process.env.CI ? 2 : undefined,

  // Reporter to use
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Shared settings for all projects
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Cross-browser project matrix
  projects: [
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
  ],
});
\`\`\`

### Essential CLI Execution Commands

| Goal | Command |
| :--- | :--- |
| **Run all tests** | \`npx playwright test\` |
| **Run specific file** | \`npx playwright test tests/customer.spec.js\` |
| **Run tests matching name** | \`npx playwright test -g "should create customer"\` |
| **Run in headed mode** | \`npx playwright test --headed\` |
| **Run on specific browser** | \`npx playwright test --project=firefox\` |
| **Interactive UI Runner** | \`npx playwright test --ui\` |
| **View HTML report** | \`npx playwright show-report\` |`,
      keyTakeaways: [
        'Use forbidOnly: !!process.env.CI to prevent test.only from accidentally slipping into master.',
        'Configure fullyParallel: true to maximize test throughput across CPU cores.',
        'Configure trace: "on-first-retry" for full diagnostic records on failed CI runs without extra overhead.',
        'Use npx playwright test --ui for visual debugging and time-travel execution.',
      ],
      terminology: [
        { term: 'forbidOnly', definition: 'Playwright config setting that causes CI builds to fail if test.only is found in committed code.' },
        { term: 'fullyParallel', definition: 'Config setting instructing Playwright to run all individual tests concurrently across worker threads.' },
      ],
      examples: [
        {
          title: 'Targeted CLI Run Examples',
          description: 'Common command-line invocations for daily QA workflow.',
          codeSnippet: `// Run customer tests only on Chromium with UI runner:
npx playwright test tests/customer/ --project=chromium --ui

// Run specific smoke tag:
npx playwright test -g "@smoke"`,
        },
      ],
      exercise: {
        id: 'checkpoint-config-1',
        title: 'CI Safety with forbidOnly',
        prompt: 'What happens in a CI pipeline when forbidOnly is set to true and a developer accidentally commits a test with test.only()?',
        options: [
          'The CI build immediately fails, preventing unintended skipping of the rest of the test suite',
          'Playwright deletes the test.only line automatically and commits back to GitHub',
          'Only that test runs and the build passes',
          'The runner freezes indefinitely',
        ],
        correctAnswerIndex: 0,
        explanation:
          'forbidOnly is a vital CI safeguard. If a developer accidentally leaves test.only() in a file, forbidOnly fails the build so that the other 499 tests are not skipped.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 6: Hands-on Lab — Customer Management Test Suite Refactoring
    // -----------------------------------------------------------------------
    {
      id: 'topic-6',
      topicNumber: 6,
      title: 'Topic 6: Hands-on Lab — Customer Management Suite Refactoring',
      durationMinutes: 35,
      explanation: `In this practical lab, you will refactor a monolithic, messy customer management test file into a maintainable, enterprise-grade Playwright suite using hooks, fixtures, and helpers.

### The Monolithic Problem Code

The existing test file has:
- Repeated \`page.goto('/customers')\` copy-pasted in 5 places.
- Duplicated form filling code.
- Hardcoded customer names that collide when tests run in parallel.
- No hooks or fixtures.

### Lab Refactoring Goals:
1. **Describe Blocks:** Group tests cleanly with \`test.describe()\`.
2. **Lifecycle Hooks:** Use \`test.beforeEach()\` to navigate to \`/customers\` and verify page readiness.
3. **Custom Fixture:** Implement a custom fixture with \`test.extend()\` that generates a unique customer test data object.
4. **Reusable Helper:** Extract a pure \`createCustomer(page, data)\` helper function.
5. **Configuration:** Provide a clean \`playwright.config.js\` snippet with \`fullyParallel: true\` and proper timeouts.
6. **Independence:** Ensure every test passes without depending on the execution of previous tests.`,
      keyTakeaways: [
        'Eliminate repetitive setup using beforeEach hooks.',
        'Use custom fixtures for dynamic, collision-free test data generation.',
        'Encapsulate repeated UI steps into clean helper functions.',
        'Enforce test independence across all test cases.',
      ],
      terminology: [
        { term: 'Suite Refactoring', definition: 'Restructuring test code into modular hooks, fixtures, and helpers without altering the tested user journeys.' },
      ],
      examples: [
        {
          title: 'Refactored Suite Preview',
          description: 'A glimpse of the refactored, modular test structure.',
          codeSnippet: `const { test, expect } = require('./customerFixture');
const { createCustomer } = require('./customerHelper');

test.describe('Customer Management Module', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/customers');
  });

  test('creates customer cleanly', async ({ page, newCustomer }) => {
    await createCustomer(page, newCustomer);
    await expect(page.getByRole('alert')).toContainText(newCustomer.name);
  });
});`,
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      id: 'day8-iq-1',
      questionNumber: 1,
      difficulty: 'Intermediate',
      question: 'What is a Playwright fixture, and how does it differ from traditional beforeEach / afterEach hooks?',
      assessmentFocus: 'Understanding fixture architecture, encapsulation, and lifecycle management.',
      modelAnswer:
        'A fixture in Playwright is an on-demand dependency with an encapsulated setup and teardown lifecycle. Unlike beforeEach hooks that run globally for every test regardless of need, a fixture only executes if a test explicitly requests it in its arguments ({ myFixture }). Furthermore, setup and teardown are co-located in a single function using the await use(value) pattern, which prevents memory leaks and makes fixtures highly composable and reusable across multiple test files.',
      followUpQuestion: 'How does a fixture clean up its resources after a test completes or fails?',
    },
    {
      id: 'day8-iq-2',
      questionNumber: 2,
      difficulty: 'Intermediate',
      question: 'Why should automated tests avoid sharing mutable state, and how does parallel execution highlight this issue?',
      assessmentFocus: 'Test independence, parallel execution, and flaky test elimination.',
      modelAnswer:
        'When tests share mutable state (such as Test 1 creating an account and Test 2 editing it via a shared global variable), the suite is coupled to sequential execution. Playwright executes tests concurrently across multiple worker processes by default. In parallel execution, Test 2 may run before Test 1 completes, or they may execute on different worker threads that share no memory, causing intermittent failures. Ensuring tests are strictly independent guarantees deterministic execution in any order or environment.',
      followUpQuestion: 'What strategies can you use to ensure each test operates on unique data?',
    },
    {
      id: 'day8-iq-3',
      questionNumber: 3,
      difficulty: 'Intermediate',
      question: 'Explain the purpose of forbidOnly: !!process.env.CI in playwright.config.js.',
      assessmentFocus: 'Continuous integration quality engineering and pipeline safeguards.',
      modelAnswer:
        'Developers frequently use test.only() during local development to focus on a single failing test. If test.only is accidentally committed to source control and pushed to CI, Playwright would run only that single test and skip the rest of the entire regression suite, giving a false sense of security. forbidOnly instructs Playwright to fail the CI build immediately if test.only is detected, preventing broken code from passing CI unverified.',
      followUpQuestion: 'What other CI-specific configurations should you set in playwright.config.js?',
    },
    {
      id: 'day8-iq-4',
      questionNumber: 4,
      difficulty: 'Scenario-Based',
      question: 'You have 10 test files that all require an authenticated admin session. How would you design this efficiently using Playwright fixtures?',
      assessmentFocus: 'Scalable authentication architecture and test.extend().',
      modelAnswer:
        'Using test.extend(), create a custom fixture called adminPage. Inside the fixture, initialize a clean page, navigate to the login route or inject authentication state using storageState, and assert that the user is on the admin dashboard. Then call await use(page). Any test that declares { adminPage } receives a pre-authenticated session instantly without duplicating login steps in 10 separate test files.',
      followUpQuestion: 'How does Playwright storageState improve authentication speed over UI login?',
    },
    {
      id: 'day8-iq-5',
      questionNumber: 5,
      difficulty: 'Intermediate',
      question: 'What is the recommended design pattern for writing reusable helper functions in Playwright?',
      assessmentFocus: 'Modular test design and maintainability.',
      modelAnswer:
        'Reusable helpers should be pure asynchronous functions that accept the page object as their first parameter, followed by any input parameters (e.g. async function fillCustomerForm(page, customerData)). They should encapsulate repeated interaction steps (fill, select, click) but avoid embedding business assertions, which should remain in the test spec. This keeps the helper focused on execution and preserves clear test reporting.',
      followUpQuestion: 'When would you transition from helper functions to a formal Page Object Model class?',
    },
  ],

  quizQuestions: [
    {
      id: 'day8-q1',
      questionNumber: 1,
      question: 'Which Playwright method is used to define custom test fixtures with encapsulated setup and teardown?',
      options: ['test.extend()', 'test.fixture()', 'test.custom()', 'test.useFixture()'],
      correctAnswerIndex: 0,
      explanation:
        'test.extend() is the official API used to extend the base Playwright test object with custom fixtures.',
    },
    {
      id: 'day8-q2',
      questionNumber: 2,
      question: 'In a custom fixture, where does teardown code execute relative to await use(fixtureValue)?',
      options: [
        'Immediately after await use(...) finishes when the test concludes',
        'Before await use(...) begins',
        'Teardown is not supported in fixtures',
        'In a separate file called teardown.js',
      ],
      correctAnswerIndex: 0,
      explanation:
        'The use() callback yields to the test function. Once the test concludes, execution resumes immediately after use(), running the teardown logic.',
    },
    {
      id: 'day8-q3',
      questionNumber: 3,
      question: 'What is the primary benefit of test.describe() grouping blocks in Playwright?',
      options: [
        'They group related tests into logical modules and allow scoping beforeEach/afterEach hooks specifically to those tests',
        'They force tests to run in slow motion',
        'They convert JavaScript into TypeScript automatically',
        'They disable browser caching',
      ],
      correctAnswerIndex: 0,
      explanation:
        'test.describe() groups related tests, structures HTML reports, and limits the scope of lifecycle hooks to the tests within that block.',
    },
    {
      id: 'day8-q4',
      questionNumber: 4,
      question: 'What does the forbidOnly: !!process.env.CI configuration setting do?',
      options: [
        'Fails the CI build if any test.only() call was accidentally left in the test files',
        'Forbids tests from using assertions',
        'Disables parallel test execution in CI',
        'Prevents tests from running on Linux',
      ],
      correctAnswerIndex: 0,
      explanation:
        'forbidOnly causes Playwright to fail the run if test.only() is present, preventing accidental skipping of the regression suite in CI.',
    },
    {
      id: 'day8-q5',
      questionNumber: 5,
      question: 'Which lifecycle hook runs once before EVERY individual test in a describe block?',
      options: ['test.beforeEach()', 'test.beforeAll()', 'test.afterEach()', 'test.once()'],
      correctAnswerIndex: 0,
      explanation:
        'test.beforeEach() executes prior to every single test in its enclosing file or describe scope.',
    },
    {
      id: 'day8-q6',
      questionNumber: 6,
      question: 'Why does test.beforeAll() NOT receive the { page } fixture by default?',
      options: [
        'Because Playwright isolates each test with its own fresh BrowserContext and Page; a single page cannot span across multiple independent tests',
        'Because Playwright does not support browsers in beforeAll',
        'Because page is only available in Firefox',
        'Because beforeAll is synchronous',
      ],
      correctAnswerIndex: 0,
      explanation:
        'To prevent cross-test contamination and enable parallelism, Playwright allocates a fresh BrowserContext and Page per test. Therefore, a page cannot be shared across tests in beforeAll.',
    },
    {
      id: 'day8-q7',
      questionNumber: 7,
      question: 'Which CLI command executes tests matching the title "should create customer" exclusively?',
      options: [
        'npx playwright test -g "should create customer"',
        'npx playwright test --match="should create customer"',
        'npx playwright test --title "should create customer"',
        'npx playwright find "should create customer"',
      ],
      correctAnswerIndex: 0,
      explanation:
        'The -g (or --grep) flag filters test execution by matching test titles against a string or regular expression.',
    },
    {
      id: 'day8-q8',
      questionNumber: 8,
      question: 'What is the key advantage of fixtures over global beforeEach hooks?',
      options: [
        'Fixtures only initialize if a test explicitly declares them in its arguments, and they cleanly encapsulate both setup and teardown',
        'Fixtures execute 10 times faster than hooks',
        'Fixtures do not require Node.js',
        'Hooks are deprecated in Playwright v1.40+',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Fixtures are lazy and modular. If a test does not require a database connection or authentication, that fixture simply never runs for that test.',
    },
    {
      id: 'day8-q9',
      questionNumber: 9,
      question: 'What is the purpose of passing the page object as the first parameter to a reusable helper function?',
      options: [
        'It allows the helper to interact with the specific test’s active browser page without storing global state',
        'It is required by the JavaScript compiler for all functions',
        'It converts the helper into a fixture',
        'It forces the page to reload before the helper runs',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Passing page explicitly keeps helpers as pure functions that operate on the caller’s isolated page instance, eliminating global mutable state.',
    },
    {
      id: 'day8-q10',
      questionNumber: 10,
      question: 'What setting in playwright.config.js instructs Playwright to execute all tests across all files concurrently?',
      options: [
        'fullyParallel: true',
        'runAllConcurrently: true',
        'parallelism: "maximum"',
        'workers: "unlimited"',
      ],
      correctAnswerIndex: 0,
      explanation:
        'fullyParallel: true enables parallel execution of both files and individual tests within those files across available worker threads.',
    },
  ],
};

// -----------------------------------------------------------------------------
// STARTER CODE & EVALUATION RUBRIC FOR DAY 8 PRACTICAL ASSIGNMENT
// -----------------------------------------------------------------------------

export const PLAYWRIGHT_DAY_8_STARTER_CODE = `// tests/customer_suite.spec.js
// DAY 8 ASSIGNMENT: Hooks, Fixtures and Test Organisation
// Refactor this customer management suite using test.describe(),
// beforeEach hooks, a custom fixture with test.extend(), and reusable helpers.

const base = require('@playwright/test');
const { expect } = base;

// 1. Define custom fixture with test.extend()
const test = base.test.extend({
  // Custom fixture that generates isolated, dynamic customer test data
  newCustomer: async ({}, use) => {
    const uniqueId = Date.now();
    const customer = {
      name: \`Apex Enterprise \${uniqueId}\`,
      email: \`contact_\${uniqueId}@apexcorp.io\`,
      plan: 'Enterprise',
      tierCode: 'ENT-99',
    };

    // Yield to test
    await use(customer);

    // Teardown (if needed)
    console.log(\`Cleaned up customer fixture: \${customer.email}\`);
  },
});

// 2. Reusable helper function
async function submitCustomerForm(page, customer) {
  await page.getByLabel('Customer Name').fill(customer.name);
  await page.getByLabel('Work Email').fill(customer.email);
  await page.getByLabel('Account Plan').selectOption(customer.plan);
  await page.getByRole('button', { name: 'Save Customer' }).click();
}

// 3. Test Suite with describe blocks and hooks
test.describe('Customer Management Suite', () => {

  // Per-test isolated setup
  test.beforeEach(async ({ page }) => {
    await page.goto('/customers');
    await expect(page.getByRole('heading', { name: 'Customer Directory' })).toBeVisible();
  });

  test('TC-1: should create customer using custom fixture and helper', async ({ page, newCustomer }) => {
    // Navigate to creation form
    await page.getByRole('button', { name: 'Add Customer' }).click();
    await expect(page).toHaveURL(/.*customers\\/new/);

    // Act: use helper
    await submitCustomerForm(page, newCustomer);

    // Assert: outcome in test file
    await expect(page.getByRole('alert')).toContainText('Customer created successfully');
    await expect(page.getByRole('table')).toContainText(newCustomer.name);
  });

  test('TC-2: should search for customer by email address', async ({ page }) => {
    // Act
    const searchInput = page.getByPlaceholder('Search customers by email...');
    await searchInput.fill('contact_17000@apexcorp.io');
    await searchInput.press('Enter');

    // Assert
    const resultsTable = page.getByRole('table');
    await expect(resultsTable).toBeVisible();
    await expect(resultsTable.getByRole('row')).toHaveCount(2); // Header + 1 match
  });

  test('TC-3: should filter customer records by subscription tier', async ({ page }) => {
    // Act
    const filterSelect = page.getByLabel('Filter by Plan');
    await filterSelect.selectOption('Enterprise');

    // Assert
    await expect(page.getByTestId('active-filter-badge')).toHaveText('Plan: Enterprise');
    await expect(page.getByRole('table')).toBeVisible();
  });

});

// 4. Sample Playwright configuration object demonstrating best practices:
const sampleConfig = {
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  workers: 4,
  use: {
    baseURL: 'https://staging.rootaccess.org',
    trace: 'on-first-retry',
  },
};
`;

export const PLAYWRIGHT_DAY_8_STARTER_EXPLANATION = `Test Suite Architecture & Engineering Design:
1. Describe Grouping: Encapsulated customer flows into a logical test.describe('Customer Management Suite') block.
2. Lifecycle Hooks: Used test.beforeEach() to navigate to /customers and confirm page readiness before each test, eliminating copy-pasted navigation.
3. Custom Fixture with test.extend(): Created a newCustomer fixture that dynamically constructs unique customer objects with timestamps, eliminating database collision between parallel workers.
4. Modular Helper Function: Extracted submitCustomerForm(page, customer) to encapsulate form field entry while keeping assertions inside the test specs for clean reporting.
5. Production Config: Outlined a robust playwright.config.js specifying fullyParallel: true, forbidOnly, and trace: 'on-first-retry'.
6. CLI Execution: Run test suites with npx playwright test tests/customer_suite.spec.js or with interactive UI via npx playwright test --ui.`;

export const PLAYWRIGHT_DAY_8_STARTER_OUTPUT = `Running 3 tests using 3 workers
  ✓ [chromium] › customer_suite.spec.js:35:3 › TC-1: should create customer using custom fixture (740ms)
  ✓ [chromium] › customer_suite.spec.js:48:3 › TC-2: should search for customer by email address (590ms)
  ✓ [chromium] › customer_suite.spec.js:59:3 › TC-3: should filter customer records by subscription tier (520ms)

  3 passed (2.1s)`;

export function evaluateDay8Assignment(
  code: string,
  expectedOutput: string,
  explanation: string
): PlaywrightDay8AssignmentRubric {
  const criteria: PlaywrightDay8AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Organizes with describe blocks
  const organizesWithDescribeBlocks =
    /test\.describe\s*\(/.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'Test Suite Organization (test.describe)',
    passed: organizesWithDescribeBlocks,
    feedback: organizesWithDescribeBlocks
      ? 'Grouped related tests cleanly using test.describe().'
      : 'Organize test cases inside test.describe() blocks.',
  });
  if (organizesWithDescribeBlocks) score += 1;

  // 2. Implements beforeEach hook
  const implementsBeforeEachHook =
    /test\.beforeEach\s*\(/.test(code);
  criteria.push({
    id: 'crit-2',
    title: 'Lifecycle Hook Implementation (test.beforeEach)',
    passed: implementsBeforeEachHook,
    feedback: implementsBeforeEachHook
      ? 'Implemented test.beforeEach() for isolated per-test setup.'
      : 'Use test.beforeEach() to handle per-test navigation and preconditions.',
  });
  if (implementsBeforeEachHook) score += 1;

  // 3. Ensures test independence (no shared mutable state)
  const ensuresTestIndependence =
    !/let\s+[a-zA-Z0-9_]+\s*;/.test(code) || explanation.toLowerCase().includes('independen');
  criteria.push({
    id: 'crit-3',
    title: 'Test Independence & Parallel Isolation',
    passed: ensuresTestIndependence,
    feedback: ensuresTestIndependence
      ? 'Maintained test independence without shared mutable variables.'
      : 'Ensure tests remain independent and avoid shared mutable variables across tests.',
  });
  if (ensuresTestIndependence) score += 1;

  // 4. Creates custom fixture with test.extend()
  const createsCustomFixtureWithExtend =
    /test\.extend\s*\(/.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Custom Fixture Engineering (test.extend)',
    passed: createsCustomFixtureWithExtend,
    feedback: createsCustomFixtureWithExtend
      ? 'Defined a custom fixture using test.extend() with the use() callback.'
      : 'Define a custom fixture using test.extend() and await use().',
  });
  if (createsCustomFixtureWithExtend) score += 1;

  // 5. Extracts reusable helper function
  const extractsReusableHelperFunction =
    /async\s+function\s+[a-zA-Z0-9_]+\s*\(\s*page/.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'Reusable Helper Utility Function',
    passed: extractsReusableHelperFunction,
    feedback: extractsReusableHelperFunction
      ? 'Extracted clean helper function accepting the page object as first parameter.'
      : 'Extract repetitive steps into a helper function (async function myHelper(page, ...)).',
  });
  if (extractsReusableHelperFunction) score += 1;

  // 6. Passes locators or data to helpers
  const passesLocatorsToHelpers =
    extractsReusableHelperFunction && /getByLabel|getByRole|selectOption|fill/.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Parameter Passing to Helpers',
    passed: passesLocatorsToHelpers,
    feedback: passesLocatorsToHelpers
      ? 'Helper interacts with page locators using provided test parameters.'
      : 'Pass data or locator parameters to helper functions cleanly.',
  });
  if (passesLocatorsToHelpers) score += 1;

  // 7. Provides Playwright config file or settings
  const providesPlaywrightConfigFile =
    /fullyParallel|forbidOnly|retries|workers|baseURL/.test(code) ||
    explanation.toLowerCase().includes('playwright.config');
  criteria.push({
    id: 'crit-7',
    title: 'Playwright Configuration Best Practices',
    passed: providesPlaywrightConfigFile,
    feedback: providesPlaywrightConfigFile
      ? 'Demonstrated key configuration parameters (fullyParallel, forbidOnly, retries).'
      : 'Document or include configuration settings such as fullyParallel and forbidOnly.',
  });
  if (providesPlaywrightConfigFile) score += 1;

  // 8. Demonstrates CLI run commands
  const demonstratesCliRunCommands =
    explanation.toLowerCase().includes('npx playwright') ||
    explanation.toLowerCase().includes('--ui') ||
    explanation.toLowerCase().includes('cli') ||
    expectedOutput.includes('Running 3 tests') ||
    expectedOutput.includes('passed') ||
    code.includes('Running 3 tests');
  criteria.push({
    id: 'crit-8',
    title: 'CLI Test Execution Mastery',
    passed: demonstratesCliRunCommands,
    feedback: demonstratesCliRunCommands
      ? 'Demonstrated CLI test runner usage and commands.'
      : 'Explain how to execute the test suite via the Playwright CLI.',
  });
  if (demonstratesCliRunCommands) score += 1;

  // 9. Maintains clean directory structure explanation
  const maintainsCleanDirectoryStructure =
    explanation.toLowerCase().includes('architect') ||
    explanation.toLowerCase().includes('structure') ||
    explanation.toLowerCase().includes('directory') ||
    explanation.toLowerCase().includes('fixtures');
  criteria.push({
    id: 'crit-9',
    title: 'Suite Architecture & Clean Code Structure',
    passed: maintainsCleanDirectoryStructure,
    feedback: maintainsCleanDirectoryStructure
      ? 'Explained clean suite architecture and modular file organization.'
      : 'Describe project directory structure and module separation in your explanation.',
  });
  if (maintainsCleanDirectoryStructure) score += 1;

  // 10. Syntactically valid JavaScript & Playwright runner structure
  const syntacticallyValidJavaScript =
    /test\.describe\s*\(/.test(code) &&
    /test\.beforeEach\s*\(/.test(code) &&
    expectedOutput.length > 20;
  criteria.push({
    id: 'crit-10',
    title: 'Valid Playwright Runner Syntax & Clean Execution',
    passed: syntacticallyValidJavaScript,
    feedback: syntacticallyValidJavaScript
      ? 'Code executes cleanly with describe blocks, hooks, and verified test runner output.'
      : 'Ensure code contains valid test.describe and test.beforeEach blocks and valid runner output.',
  });
  if (syntacticallyValidJavaScript) score += 1;

  const passed = score >= 8;
  const feedback = criteria.map((c) => `${c.passed ? '✓' : '✗'} ${c.title}: ${c.feedback}`);

  return {
    organizesWithDescribeBlocks,
    implementsBeforeEachHook,
    ensuresTestIndependence,
    createsCustomFixtureWithExtend,
    extractsReusableHelperFunction,
    passesLocatorsToHelpers,
    providesPlaywrightConfigFile,
    demonstratesCliRunCommands,
    maintainsCleanDirectoryStructure,
    syntacticallyValidJavaScript,
    score,
    feedback,
    passed,
    criteria,
  };
}
