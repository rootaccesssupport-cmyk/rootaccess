import type {
  PlaywrightDay9Unit,
  PlaywrightDay9AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_9_DATA: PlaywrightDay9Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 9,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Data-Driven Testing and Test Parameterisation',
  subtitle:
    'Master scalable test parameterisation in Playwright using pure JavaScript arrays and objects. Run parameterized suites across positive, negative, and boundary datasets without copy-pasting test logic.',
  level: 'Intermediate',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–8 concepts (Locators, actions, web-first assertions, auto-waiting, hooks, and fixtures).',
  learningObjectives: [
    'Understand why data-driven testing is critical for regression coverage and maintainability.',
    'Structure test data using JavaScript arrays, objects, and arrays of objects.',
    'Iterate over datasets to dynamically generate individual, isolated Playwright test instances.',
    'Use template literals in test titles to ensure clear, descriptive test reports in CI.',
    'Differentiate between defining individual parameterized tests vs looping assertions inside a single test.',
    'Manage test data effectively: separating data from test logic, handling valid/invalid partitions, and generating unique records.',
    'Avoid combinatorial explosion and maintain focused, high-value test suites.',
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
    { day: 9, title: 'Day 9: Data-Driven Testing & Parameterisation', focus: 'Parameterised Suites, Arrays of Objects, Data Management', isCurrent: true },
    { day: 10, title: 'Day 10: Debugging, Reporting & Failure Analysis', focus: 'Trace Viewer, Playwright Inspector, HTML Reports' },
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
      title: 'Topic 1: Why Data-Driven Testing Matters',
      durationMinutes: 25,
      explanation: `In software testing, the same business workflow (such as logging in, filling a customer registration form, or calculating shipping taxes) must often be verified against dozens of distinct input variations.

### The Problem with Duplicated Test Logic
Without data-driven testing, junior engineers copy-paste the exact same 15-line test script 10 times, altering only the username or password. This leads to:
1. **Maintenance Nightmare:** If a button locator or URL changes, you must edit 10 different test files.
2. **Inconsistent Assertions:** Slight typos creep into different copies of the test.
3. **Bloated Test Suites:** Repositories become filled with thousands of lines of boilerplate.

### The Data-Driven Approach
Data-driven testing separates the **test logic** (the sequence of actions and assertions) from the **test data** (the inputs and expected results). A single parameterized test template is executed repeatedly against an array of datasets.

### Avoiding Combinatorial Explosion
A common mistake is testing every conceivable combination of 5 dropdowns with 10 options each (100,000 combinations!). Instead:
- Test the core happy path (valid combination).
- Apply **Equivalence Partitioning (EP)** to test one representative from each valid and invalid class.
- Apply **Boundary Value Analysis (BVA)** to test minimum, maximum, and boundary transitions.`,
      keyTakeaways: [
        'Data-driven testing decouples test execution steps from input datasets.',
        'Eliminates copy-paste test duplication and drastically reduces maintenance costs.',
        'Use Equivalence Partitioning and Boundary Value Analysis to avoid combinatorial explosion.',
      ],
      terminology: [
        { term: 'Data-Driven Testing (DDT)', definition: 'A testing methodology where test inputs and expected outputs are stored separately from test execution scripts.' },
        { term: 'Combinatorial Explosion', definition: 'The rapid, unmanageable growth in test cases when attempting to test all possible combinations of multiple inputs.' },
      ],
      examples: [
        {
          title: 'Copy-Paste Anti-Pattern vs Data-Driven Pattern',
          description: 'Comparing redundant duplicate tests with a clean parameterized array.',
          codeSnippet: `// BAD: 3 identical tests copy-pasted
test('login with user A', async ({ page }) => { ... });
test('login with user B', async ({ page }) => { ... });
test('login with user C', async ({ page }) => { ... });

// GOOD: Single parameterized loop
const testUsers = [
  { role: 'Admin', user: 'admin@apex.io', expectedHeader: 'Admin Console' },
  { role: 'Student', user: 'student@apex.io', expectedHeader: 'My Learning' },
  { role: 'Instructor', user: 'tutor@apex.io', expectedHeader: 'Course Builder' },
];`,
        },
      ],
      exercise: {
        id: 'checkpoint-ddt-1',
        title: 'Core Benefit of Data-Driven Testing',
        prompt: 'What is the primary benefit of separating test data from test execution logic?',
        options: [
          'If the application UI changes, you update the test logic once and all datasets benefit immediately',
          'It makes browsers execute tests in WebGL instead of JavaScript',
          'It forces Playwright to skip network requests',
          'It eliminates the need for Node.js',
        ],
        correctAnswerIndex: 0,
        explanation: 'Separating data from logic enables single-point maintenance: update the action/assertion logic once, and every dataset automatically runs through the updated logic.',
      },
    },

    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Using JavaScript Data Structures for Parameterisation',
      durationMinutes: 30,
      explanation: `Because Playwright tests are executed by Node.js, you have the full power of native JavaScript data structures.

### Arrays of Objects: The Gold Standard
The cleanest and most expressive format for test datasets is an **Array of Objects**:

\`\`\`javascript
const registrationScenarios = [
  {
    testName: 'TC-1: Valid Standard Registration',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    password: 'ValidPassword123!',
    expectedSuccess: true,
    expectedMessage: 'Welcome to RootAccess!',
  },
  {
    testName: 'TC-2: Missing Full Name Field',
    fullName: '',
    email: 'priya.sharma@example.com',
    password: 'ValidPassword123!',
    expectedSuccess: false,
    expectedError: 'Full name is required',
  },
  {
    testName: 'TC-3: Malformed Email Address (no @ symbol)',
    fullName: 'Priya Sharma',
    email: 'priyasharma.example.com',
    password: 'ValidPassword123!',
    expectedSuccess: false,
    expectedError: 'Please enter a valid email address',
  },
];
\`\`\`

### Key Design Rules for Test Datasets
1. **Include a Descriptive testName / title Property:** This will be passed to \`test()\` so your test runner output is crystal clear.
2. **Explicit Expected Outcomes:** Always include the expected error message or expected success indicator directly in each object.
3. **Type Safety & Consistency:** Keep all objects in the dataset array conforming to the exact same schema.`,
      keyTakeaways: [
        'Arrays of objects allow each test scenario to declare its inputs and expected outcomes explicitly.',
        'Always provide a descriptive title property for clear reporting in test runners.',
        'Keep dataset objects consistent in structure.',
      ],
      terminology: [
        { term: 'Test Scenario Object', definition: 'A JavaScript object containing all inputs, configuration flags, and expected results for a single test run.' },
        { term: 'Schema Consistency', definition: 'Ensuring every object in a test dataset array contains the same keys to avoid undefined property bugs.' },
      ],
      examples: [
        {
          title: 'Structured Parameterisation Schema',
          description: 'A clean object schema for testing discount coupon codes.',
          codeSnippet: `const couponScenarios = [
  { code: 'SAVE20', cartTotal: 100, expectedDiscount: 20, isValid: true },
  { code: 'SAVE50', cartTotal: 100, expectedDiscount: 50, isValid: true },
  { code: 'EXPIRED', cartTotal: 100, expectedDiscount: 0, isValid: false, error: 'Coupon has expired' },
  { code: 'INVALID', cartTotal: 100, expectedDiscount: 0, isValid: false, error: 'Promo code not recognized' },
];`,
        },
      ],
      exercise: {
        id: 'checkpoint-ddt-2',
        title: 'Dataset Property Design',
        prompt: 'Why should each test scenario object include expected outcomes (e.g. expectedError or expectedSuccess) rather than hardcoding assertions inside the test function?',
        options: [
          'Because different datasets have different expected results, allowing one test template to handle both positive and negative cases dynamically',
          'Because JavaScript cannot perform if-statements inside tests',
          'Because Playwright prohibits string assertions',
          'It is required by the browser DOM',
        ],
        correctAnswerIndex: 0,
        explanation: 'Declaring expected outcomes inside each scenario object allows the test template to assert positive outcomes for valid data and specific error messages for negative data dynamically.',
      },
    },

    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Authoring Data-Driven Playwright Tests',
      durationMinutes: 35,
      explanation: `In Playwright, you generate multiple individual tests by wrapping the \`test()\` call inside a JavaScript \`for...of\` loop or \`forEach()\` method.

### CRITICAL: Individual Tests vs Looping Inside One Test

\`\`\`javascript
// ❌ ANTI-PATTERN: Looping assertions inside a SINGLE test
test('validate registration scenarios', async ({ page }) => {
  for (const scenario of scenarios) {
    // If scenario #2 fails, the entire test terminates immediately!
    // Scenarios #3 to #10 NEVER EXECUTE!
    // The report only shows "1 failed test", masking whether other cases pass.
  }
});

// ✅ BEST PRACTICE: Defining INDIVIDUAL tests from the dataset
for (const scenario of scenarios) {
  test(\`Registration: \${scenario.testName}\`, async ({ page }) => {
    // Each scenario runs in complete isolation with its own BrowserContext and Page!
    // If scenario #2 fails, scenarios #1 and #3 still run and pass!
    // Reports show exactly which dataset failed.
    await page.goto('/register');
    // ...
  });
}
\`\`\`

### Dynamic Test Titles with Template Literals
Always use ES6 template literals (backticks \`\`) to embed scenario details into the test name:
\`test(\`Registration Validation - \${scenario.field}: \${scenario.description}\`, async ({ page }) => { ... });\`

### Ensuring Test Independence
Each iteration of the loop generates a distinct Playwright test instance. Playwright automatically provides a freshly isolated \`page\` and \`context\` for each test, ensuring zero state leakage between datasets!`,
      keyTakeaways: [
        'Always generate individual test() instances using for...of or forEach, never loop inside a single test.',
        'Generating separate tests ensures failures in one dataset do not halt subsequent datasets.',
        'Use template literals in test titles to clearly identify the scenario in test reports.',
        'Playwright provides isolated browser contexts for each generated test.',
      ],
      terminology: [
        { term: 'Test Parameterisation', definition: 'Generating distinct test cases programmatically from an input collection.' },
        { term: 'Test Independence', definition: 'The architectural principle that no test depends on the execution, state, or outcome of another test.' },
      ],
      examples: [
        {
          title: 'Clean Parameterized Playwright Test Suite',
          description: 'A parameterized test file verifying form input validations.',
          codeSnippet: `const { test, expect } = require('@playwright/test');

const loginCases = [
  { name: 'Locked Account', user: 'locked@apex.io', pass: 'Pass123!', error: 'Your account is locked' },
  { name: 'Invalid Password', user: 'valid@apex.io', pass: 'WrongPass', error: 'Invalid email or password' },
  { name: 'Nonexistent User', user: 'nobody@apex.io', pass: 'Pass123!', error: 'Invalid email or password' },
];

for (const data of loginCases) {
  test(\`Login Failure: \${data.name}\`, async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill(data.user);
    await page.getByLabel('Password').fill(data.pass);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByRole('alert')).toHaveText(data.error);
  });
}`,
        },
      ],
      exercise: {
        id: 'checkpoint-ddt-3',
        title: 'Individual Tests vs Loop Inside Test',
        prompt: 'Why is defining test() inside an outer loop better than putting a loop inside a single test() block?',
        options: [
          'Because each iteration becomes an independent test with its own report entry, isolated browser context, and failure isolation',
          'Because Playwright cannot execute loops inside async functions',
          'Because Chrome limits async functions to 5 operations',
          'Because loops inside tests consume double memory',
        ],
        correctAnswerIndex: 0,
        explanation: 'Wrapping test() inside an outer loop creates separate, isolated tests in Playwright. If one dataset fails, the others continue running and reporting independently.',
      },
    },

    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Test Data Management, Fixtures & Isolation',
      durationMinutes: 30,
      explanation: `Managing test data effectively is the difference between a resilient automation suite and an unstable, high-maintenance burden.

### 1. Separating Data into Dedicated Files
Keep large datasets out of your \`.spec.js\` test files. Place them in a \`test-data/\` or \`fixtures/\` directory:

\`\`\`text
my-project/
├── test-data/
│   ├── registrationData.json
│   └── searchQueries.js
└── tests/
    └── registration.spec.js
\`\`\`

### 2. Generating Unique Data for Database Records
When testing registration or entity creation, static emails like \`test@example.com\` will fail on the second run due to "Email already exists" duplicate constraints!
Always generate dynamic, collision-free identifiers:
\`\`\`javascript
const uniqueEmail = \`user_\${Date.now()}_\${Math.floor(Math.random() * 1000)}@apexcorp.io\`;
\`\`\`

### 3. Avoiding Hardcoded Secrets
Never commit passwords, API tokens, or production credentials in test data files:
- Use environment variables: \`process.env.TEST_USER_PASSWORD\`.
- Keep credentials out of version control with \`.gitignore\`.
- Use synthetic dummy passwords (\`DummyTestPass123!\`) for local input validation tests.`,
      keyTakeaways: [
        'Store large datasets in dedicated JSON or JS files inside test-data/ or fixtures/.',
        'Use dynamic timestamps (Date.now()) or UUIDs to avoid unique constraint collisions.',
        'Never store actual passwords or secrets in plain test data files.',
        'Use synthetic, realistic test personas for boundary and negative validation.',
      ],
      terminology: [
        { term: 'Synthetic Test Data', definition: 'Artificially generated, realistic data that mimics real user input without containing sensitive real-world PII.' },
        { term: 'Collision-Free Identifier', definition: 'A dynamically generated value (e.g. timestamp-based email) that guarantees uniqueness in database inserts.' },
      ],
      examples: [
        {
          title: 'Generating Collision-Free Registration Data',
          description: 'A helper function that builds unique user objects.',
          codeSnippet: `function createUniqueUser(overrides = {}) {
  const timestamp = Date.now();
  return {
    fullName: \`QA Tester \${timestamp}\`,
    email: \`qa_auto_\${timestamp}@testdomain.io\`,
    password: 'SecureTestPassword123!',
    ...overrides,
  };
}`,
        },
      ],
      exercise: {
        id: 'checkpoint-ddt-4',
        title: 'Collision-Free Test Data',
        prompt: 'Why will hardcoding email: "john@example.com" in a registration test cause intermittent or permanent test failures?',
        options: [
          'Because on the second test run, the backend database will reject the duplicate email with a 409 Conflict or validation error',
          'Because Playwright blocks the string "example.com"',
          'Because Chrome caches email fields permanently',
          'Because Node.js does not allow static strings in test files',
        ],
        correctAnswerIndex: 0,
        explanation: 'User registration forms enforce unique email constraints. Once created, subsequent test runs with the same email fail because the account already exists.',
      },
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-day9-1',
      questionNumber: 1,
      question: 'What is data-driven testing, and how do you implement it in Playwright with pure JavaScript?',
      difficulty: 'Beginner',
      assessmentFocus: 'Understanding of test parameterisation and ES6 iteration patterns.',
      modelAnswer:
        'Data-driven testing is the practice of separating test data from test logic. In Playwright with pure JavaScript, we define an array of test scenario objects containing inputs, flags, and expected results. We then iterate over the array using a for...of loop or forEach(), defining an individual test(`Scenario: ${data.name}`, async ({ page }) => { ... }) for each item. This provides isolated browser contexts, individual reporting, and prevents one failing dataset from aborting the rest.',
      followUpQuestion: 'Why should you avoid looping assertions inside a single test() block?',
    },
    {
      id: 'iq-day9-2',
      questionNumber: 2,
      question: 'How do you handle unique constraints (like unique email or username) in data-driven registration tests?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Practical test data management and collision avoidance.',
      modelAnswer:
        'For tests that write new records to a database, hardcoded static values will fail on subsequent runs due to duplicate key violations. We generate dynamic, collision-free identifiers using timestamps (e.g. `user_${Date.now()}@domain.io`) or UUIDs. For negative validation tests checking format rules (e.g. missing @ symbol or boundary length), static data is completely safe because no valid record is persisted.',
      followUpQuestion: 'When would you use API teardown after data-driven registration tests?',
    },
    {
      id: 'iq-day9-3',
      questionNumber: 3,
      question: 'What is combinatorial explosion, and how do you decide which datasets to automate?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Test optimization, Equivalence Partitioning, and Boundary Value Analysis.',
      modelAnswer:
        'Combinatorial explosion occurs when trying to test every possible combination of inputs, resulting in massive, unmaintainable test suites. We manage this by applying Equivalence Partitioning—testing one representative from each valid and invalid class—and Boundary Value Analysis for edge values (min, max, just below, just above). We prioritize high-risk, business-critical flows and common user mistakes over exhaustive combinations.',
      followUpQuestion: 'How does pairwise or orthogonal array testing help reduce test combinations?',
    },
    {
      id: 'iq-day9-4',
      questionNumber: 4,
      question: 'Where should test data be stored in a production Playwright automation project?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Framework directory layout and clean architecture.',
      modelAnswer:
        'Test data should be stored in dedicated JSON or JavaScript files within a `test-data/` or `fixtures/` directory, separate from test specs in `tests/`. For sensitive data like credentials, we use environment variables loaded via `.env` and `process.env`, never committing plaintext passwords to source control. Small scenario arrays directly relevant to a single feature can reside in dedicated test data modules imported into the spec.',
      followUpQuestion: 'What are the pros and cons of JSON files vs JavaScript (.js) files for test data?',
    },
    {
      id: 'iq-day9-5',
      questionNumber: 5,
      question: 'How do you parameterize tests across different environments (e.g., Staging vs Production)?',
      difficulty: 'Scenario-Based',
      assessmentFocus: 'Environment configuration and baseURL parameterisation.',
      modelAnswer:
        'In Playwright, environment parameterisation is handled via `playwright.config.js` and environment variables. We use `process.env.ENV` to dynamically set `baseURL` (e.g., `https://staging.app.io` vs `https://prod.app.io`) and load environment-specific test accounts. The test specs themselves use relative URLs like `await page.goto("/register")`, allowing the exact same test suite to run against any environment seamlessly.',
      followUpQuestion: 'How do you prevent destructive tests from running against a production environment?',
    },
  ],

  quizQuestions: [
    {
      id: 'q-d9-1',
      questionNumber: 1,
      question: 'What is the primary advantage of data-driven testing in modern test automation?',
      options: [
        'Separates test logic from test data, allowing one test script to run against many datasets without duplication',
        'Converts JavaScript tests into binary machine code for 10x faster execution',
        'Bypasses browser security controls and disables cross-origin restrictions',
        'Allows tests to execute without launching a web browser',
      ],
      correctAnswerIndex: 0,
      explanation: 'Data-driven testing decouples test logic from test inputs, enabling maintenance of the test workflow in one place while scaling test coverage across dozens of datasets.',
    },
    {
      id: 'q-d9-2',
      questionNumber: 2,
      question: 'How do you parameterize tests in Playwright using pure JavaScript?',
      options: [
        'Iterate over an array of scenario objects using for...of and call test() inside each iteration',
        'Use the @parameterized decorator from Java JUnit',
        'Create a separate Playwright installation for every test case',
        'Call page.parameterize() inside the test body',
      ],
      correctAnswerIndex: 0,
      explanation: 'In Playwright JavaScript, you iterate over an array of data objects using for...of or forEach, declaring an individual test() for each dataset.',
    },
    {
      id: 'q-d9-3',
      questionNumber: 3,
      question: 'What happens if you loop through assertions inside a single test() block and the 2nd dataset fails?',
      options: [
        'The test halts immediately; subsequent datasets in the loop are never evaluated, and the report shows only one failure',
        'Playwright catches the error and automatically skips to the next dataset',
        'The browser reloads the entire operating system',
        'The test passes with a warning banner',
      ],
      correctAnswerIndex: 0,
      explanation: 'In a single test, an unhandled assertion failure throws an error that terminates the test immediately, leaving all subsequent iterations unexecuted.',
    },
    {
      id: 'q-d9-4',
      questionNumber: 4,
      question: 'Why should test titles use ES6 template literals (backticks) in data-driven suites?',
      options: [
        'To interpolate scenario names (e.g. `Registration: ${data.scenarioName}`) so CI reports clearly show which dataset passed or failed',
        'Because Playwright test titles only support backticks and reject standard quotes',
        'To speed up string parsing in the V8 engine',
        'To prevent HTML tags from appearing in browser tabs',
      ],
      correctAnswerIndex: 0,
      explanation: 'Interpolating scenario attributes into the test title gives every generated test a unique, descriptive name in HTML reports, CLI summaries, and CI artifacts.',
    },
    {
      id: 'q-d9-5',
      questionNumber: 5,
      question: 'What technique prevents database duplicate-key errors when running registration tests repeatedly?',
      options: [
        'Appending a dynamic timestamp or random number (e.g. `user_${Date.now()}@test.io`) to generate collision-free emails',
        'Running tests in incognito mode',
        'Clearing the browser cookies between tests',
        'Setting headless: false in playwright.config.js',
      ],
      correctAnswerIndex: 0,
      explanation: 'Collision-free dynamic emails using timestamps or UUIDs ensure each test run registers a brand new account that does not conflict with existing database records.',
    },
    {
      id: 'q-d9-6',
      questionNumber: 6,
      question: 'Which testing design technique helps automation engineers select high-value test data without combinatorial explosion?',
      options: [
        'Equivalence Partitioning and Boundary Value Analysis',
        'Random Monkey Testing with infinite loops',
        'Testing every single ASCII character combination',
        'Duplicating test suites across 20 browser tabs',
      ],
      correctAnswerIndex: 0,
      explanation: 'Equivalence Partitioning and Boundary Value Analysis focus testing on representatives of valid/invalid classes and transition boundaries, maximizing defect detection with minimal tests.',
    },
    {
      id: 'q-d9-7',
      questionNumber: 7,
      question: 'Where should sensitive credentials (passwords, tokens) be stored in an automation framework?',
      options: [
        'In environment variables loaded from .env and accessed via process.env, never in committed code',
        'Hardcoded directly into the dataset array in plaintext',
        'In a public README.md file',
        'In browser localStorage comments',
      ],
      correctAnswerIndex: 0,
      explanation: 'Sensitive credentials must be stored in environment variables, excluded from version control via .gitignore, and accessed securely via process.env.',
    },
    {
      id: 'q-d9-8',
      questionNumber: 8,
      question: 'What is true about browser context isolation in Playwright data-driven tests?',
      options: [
        'Each test() instance generated by the loop receives a completely fresh, isolated browser context and page',
        'All tests in the loop share cookies and cache automatically',
        'Contexts must be manually closed with page.delete()',
        'Isolation only works on Windows operating systems',
      ],
      correctAnswerIndex: 0,
      explanation: 'Playwright Test provides clean test isolation by default: each individual test() receives an isolated BrowserContext with clean cookies, storage, and cache.',
    },
    {
      id: 'q-d9-9',
      questionNumber: 9,
      question: 'When should test data be stored in external JSON files rather than inline JavaScript arrays?',
      options: [
        'When datasets are large, complex, shared across multiple test files, or generated by external systems',
        'Only when the file size exceeds 500 megabytes',
        'JSON is deprecated in Playwright and should never be used',
        'Only when testing Internet Explorer',
      ],
      correctAnswerIndex: 0,
      explanation: 'External JSON files are ideal for large, complex datasets, multi-file reusability, and data generated by APIs, mock servers, or test-data generators.',
    },
    {
      id: 'q-d9-10',
      questionNumber: 10,
      question: 'In a registration test suite with 8 parameterized datasets, how many test results will Playwright report?',
      options: [
        '8 separate test results, each with its own pass/fail status and execution time',
        '1 combined test result regardless of how many datasets were tested',
        '16 results because tests always run twice',
        '0 results unless a console.log is added',
      ],
      correctAnswerIndex: 0,
      explanation: 'Because test() is invoked 8 times in the outer loop, Playwright registers and reports 8 distinct test executions, each with its own timing, traces, and pass/fail outcome.',
    },
  ],
};

export const PLAYWRIGHT_DAY_9_STARTER_CODE = `// tests/registration_data_driven.spec.js
const { test, expect } = require('@playwright/test');

// 1. Comprehensive Test Dataset: 8 Distinct Registration Scenarios
const registrationDatasets = [
  {
    id: 'TC-REG-01',
    description: 'Valid standard registration with all required fields',
    fullName: 'Ananya Deshmukh',
    email: \`ananya_\${Date.now()}@apexcorp.io\`,
    phone: '+919876543210',
    password: 'ValidPassword@2026',
    expectedStatus: 'success',
    expectedMessage: 'Account created successfully! Welcome to RootAccess.',
  },
  {
    id: 'TC-REG-02',
    description: 'Negative: Missing required Full Name field',
    fullName: '',
    email: \`ananya_\${Date.now()}@apexcorp.io\`,
    phone: '+919876543210',
    password: 'ValidPassword@2026',
    expectedStatus: 'error',
    expectedMessage: 'Full name is required',
  },
  {
    id: 'TC-REG-03',
    description: 'Negative: Invalid email missing domain extension',
    fullName: 'Rohan Verma',
    email: 'rohan.verma@invalid-domain',
    phone: '+919876543210',
    password: 'ValidPassword@2026',
    expectedStatus: 'error',
    expectedMessage: 'Please enter a valid email address',
  },
  {
    id: 'TC-REG-04',
    description: 'Negative: Invalid email missing @ symbol',
    fullName: 'Rohan Verma',
    email: 'rohan.verma.apexcorp.io',
    phone: '+919876543210',
    password: 'ValidPassword@2026',
    expectedStatus: 'error',
    expectedMessage: 'Please enter a valid email address',
  },
  {
    id: 'TC-REG-05',
    description: 'Boundary: Minimum valid password length (exactly 8 characters)',
    fullName: 'Kavita Nair',
    email: \`kavita_\${Date.now()}@apexcorp.io\`,
    phone: '+919876543210',
    password: 'Abc@1234',
    expectedStatus: 'success',
    expectedMessage: 'Account created successfully! Welcome to RootAccess.',
  },
  {
    id: 'TC-REG-06',
    description: 'Negative Boundary: Password below minimum length (7 characters)',
    fullName: 'Kavita Nair',
    email: \`kavita_\${Date.now()}@apexcorp.io\`,
    phone: '+919876543210',
    password: 'Abc@123',
    expectedStatus: 'error',
    expectedMessage: 'Password must be at least 8 characters long',
  },
  {
    id: 'TC-REG-07',
    description: 'Negative: Invalid phone number with alphabetic characters',
    fullName: 'Suresh Menon',
    email: \`suresh_\${Date.now()}@apexcorp.io\`,
    phone: '98765-PHONE-INVALID',
    password: 'ValidPassword@2026',
    expectedStatus: 'error',
    expectedMessage: 'Phone number must contain valid digits',
  },
  {
    id: 'TC-REG-08',
    description: 'Negative: Duplicate email address registration collision',
    fullName: 'Duplicate User Test',
    email: 'existing.student@rootaccess.org',
    phone: '+919876543210',
    password: 'ValidPassword@2026',
    expectedStatus: 'error',
    expectedMessage: 'An account with this email address already exists',
  },
];

// 2. Parameterized Test Suite Execution
test.describe('Customer Registration - Data-Driven Validation Suite', () => {

  for (const scenario of registrationDatasets) {
    test(\`[\${scenario.id}] \${scenario.description}\`, async ({ page }) => {
      // Arrange: Navigate to registration portal
      await page.goto('/signup');
      await expect(page.getByRole('heading', { name: /create an account|sign up/i })).toBeVisible();

      // Act: Fill form inputs dynamically
      if (scenario.fullName) {
        await page.getByLabel(/full name/i).fill(scenario.fullName);
      }
      await page.getByLabel(/email/i).fill(scenario.email);
      if (scenario.phone) {
        await page.getByLabel(/phone/i).fill(scenario.phone);
      }
      await page.getByLabel(/password/i).fill(scenario.password);

      // Submit registration
      await page.getByRole('button', { name: /create account|sign up|register/i }).click();

      // Assert: Verify expected outcome based on scenario definition
      if (scenario.expectedStatus === 'success') {
        const successAlert = page.getByRole('alert');
        await expect(successAlert).toBeVisible();
        await expect(successAlert).toContainText(scenario.expectedMessage);
      } else {
        const errorElement = page.getByRole('alert');
        await expect(errorElement).toBeVisible();
        await expect(errorElement).toContainText(scenario.expectedMessage);
      }
    });
  }

});
`;

export const PLAYWRIGHT_DAY_9_STARTER_EXPLANATION = `Architecture & Design Highlights:
1. Reusable Parameterised Suite: Iterates over an array of 8 distinct registration scenarios using a for...of loop, generating 8 independent Playwright tests.
2. Positive, Negative & Boundary Partitions: Covers valid registration, missing required fields, malformed emails (no domain, no @), boundary password length (8 chars vs 7 chars), invalid phone formats, and duplicate user collisions.
3. Descriptive Test Names: Uses template literals [\${scenario.id}] \${scenario.description} so test reports immediately communicate the scenario purpose.
4. Dynamic Collision-Free Identifiers: Uses Date.now() timestamps for valid users to guarantee tests can run repeatedly against real databases without primary key collisions.
5. Isolated Contexts: Each dataset runs with Playwright's automatic isolated browser context, ensuring complete independence.`;

export const PLAYWRIGHT_DAY_9_STARTER_OUTPUT = `Running 8 tests using 4 workers
  ✓ [chromium] › registration_data_driven.spec.js:68:3 › [TC-REG-01] Valid standard registration with all required fields (780ms)
  ✓ [chromium] › registration_data_driven.spec.js:68:3 › [TC-REG-02] Negative: Missing required Full Name field (410ms)
  ✓ [chromium] › registration_data_driven.spec.js:68:3 › [TC-REG-03] Negative: Invalid email missing domain extension (420ms)
  ✓ [chromium] › registration_data_driven.spec.js:68:3 › [TC-REG-04] Negative: Invalid email missing @ symbol (390ms)
  ✓ [chromium] › registration_data_driven.spec.js:68:3 › [TC-REG-05] Boundary: Minimum valid password length (exactly 8 characters) (720ms)
  ✓ [chromium] › registration_data_driven.spec.js:68:3 › [TC-REG-06] Negative Boundary: Password below minimum length (7 characters) (400ms)
  ✓ [chromium] › registration_data_driven.spec.js:68:3 › [TC-REG-07] Negative: Invalid phone number with alphabetic characters (430ms)
  ✓ [chromium] › registration_data_driven.spec.js:68:3 › [TC-REG-08] Negative: Duplicate email address registration collision (450ms)

  8 passed (2.3s)`;

export function evaluateDay9Assignment(
  code: string,
  _expectedOutput?: string,
  _explanation?: string
): PlaywrightDay9AssignmentRubric {
  const criteria: PlaywrightDay9AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Has parameterized suite with loop
  const hasParameterizedSuite =
    /for\s*\(\s*const\s+\w+\s+of\s+\w+\s*\)/.test(code) ||
    /\.forEach\s*\(\s*\(?\w+\)?\s*=>/.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'Parameterized Suite Architecture (for...of / forEach)',
    passed: hasParameterizedSuite,
    feedback: hasParameterizedSuite
      ? 'Generated tests programmatically using an outer iteration loop.'
      : 'Use for...of or forEach to iterate over your dataset array.',
  });
  if (hasParameterizedSuite) score += 1;

  // 2. Has 8 or more datasets
  const datasetMatches = (code.match(/id:\s*['"]TC-/g) || []).length;
  const hasEightOrMoreDatasets = datasetMatches >= 8;
  criteria.push({
    id: 'crit-2',
    title: 'Comprehensive Dataset (≥ 8 distinct scenarios)',
    passed: hasEightOrMoreDatasets,
    feedback: hasEightOrMoreDatasets
      ? `Defined ${datasetMatches} distinct registration test scenarios.`
      : `Provide at least 8 test datasets (found ${datasetMatches}).`,
  });
  if (hasEightOrMoreDatasets) score += 1;

  // 3. Tests valid registration
  const testsValidRegistration =
    /expectedStatus:\s*['"]success['"]|valid standard/i.test(code);
  criteria.push({
    id: 'crit-3',
    title: 'Valid Registration Happy Path',
    passed: testsValidRegistration,
    feedback: testsValidRegistration
      ? 'Verified standard successful registration.'
      : 'Include a valid registration test scenario.',
  });
  if (testsValidRegistration) score += 1;

  // 4. Tests missing fields
  const testsMissingFields =
    /missing.*name|fullName:\s*['"]['"]/i.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Missing Required Fields Validation',
    passed: testsMissingFields,
    feedback: testsMissingFields
      ? 'Tested missing required input fields.'
      : 'Include a scenario testing missing required fields.',
  });
  if (testsMissingFields) score += 1;

  // 5. Tests invalid email
  const testsInvalidEmail =
    /invalid.*email|email.*missing/i.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'Invalid Email Format Validation',
    passed: testsInvalidEmail,
    feedback: testsInvalidEmail
      ? 'Tested malformed and invalid email inputs.'
      : 'Include scenarios testing invalid email structures.',
  });
  if (testsInvalidEmail) score += 1;

  // 6. Tests boundary length values
  const testsBoundaryLength =
    /boundary|password.*length|minimum.*password/i.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Boundary Value Testing (e.g. Password length)',
    passed: testsBoundaryLength,
    feedback: testsBoundaryLength
      ? 'Tested boundary values for field constraints.'
      : 'Include boundary test cases (e.g. min password length).',
  });
  if (testsBoundaryLength) score += 1;

  // 7. Tests invalid formats or duplicate
  const testsInvalidFormats =
    /phone|duplicate|already exists/i.test(code);
  criteria.push({
    id: 'crit-7',
    title: 'Format Validation & Duplicate Registration',
    passed: testsInvalidFormats,
    feedback: testsInvalidFormats
      ? 'Included format validation (phone/duplicate accounts).'
      : 'Include format validation or duplicate registration testing.',
  });
  if (testsInvalidFormats) score += 1;

  // 8. Ensures test independence with dynamic data
  const ensuresTestIndependence =
    /Date\.now\(\)|Math\.random\(\)|uuid/i.test(code);
  criteria.push({
    id: 'crit-8',
    title: 'Collision-Free Dynamic Data Generation',
    passed: ensuresTestIndependence,
    feedback: ensuresTestIndependence
      ? 'Used dynamic timestamps or random numbers to prevent collision.'
      : 'Use Date.now() or dynamic identifiers for unique database values.',
  });
  if (ensuresTestIndependence) score += 1;

  // 9. Uses descriptive test titles
  const usesDescriptiveTestTitles =
    /test\s*\(\s*`[^`]+\$\{/i.test(code);
  criteria.push({
    id: 'crit-9',
    title: 'Descriptive Test Titles with Template Literals',
    passed: usesDescriptiveTestTitles,
    feedback: usesDescriptiveTestTitles
      ? 'Used template literals to dynamically name each test case.'
      : 'Use template literals in test titles: test(`... ${scenario.description}`, ...).',
  });
  if (usesDescriptiveTestTitles) score += 1;

  // 10. Syntactically valid JavaScript
  let syntacticallyValidJavaScript = true;
  try {
    new Function(code);
  } catch {
    // Tolerant if exports or imports present
    syntacticallyValidJavaScript =
      code.includes('require(') || code.includes('test(');
  }
  criteria.push({
    id: 'crit-10',
    title: 'Pure JavaScript Syntax (.js)',
    passed: syntacticallyValidJavaScript,
    feedback: syntacticallyValidJavaScript
      ? 'Authored clean, valid JavaScript test code.'
      : 'Ensure test code contains valid JavaScript syntax.',
  });
  if (syntacticallyValidJavaScript) score += 1;

  const passed = score >= 8;
  const feedback = criteria.map((c) => `${c.passed ? '✓' : '✗'} ${c.title}: ${c.feedback}`);

  return {
    score,
    feedback,
    passed,
    criteria,
    hasParameterizedSuite,
    hasEightOrMoreDatasets,
    testsValidRegistration,
    testsMissingFields,
    testsInvalidEmail,
    testsBoundaryLength,
    testsInvalidFormats,
    ensuresTestIndependence,
    usesDescriptiveTestTitles,
    syntacticallyValidJavaScript,
  };
}
