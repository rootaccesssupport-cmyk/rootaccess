import type {
  PlaywrightDay5Unit,
  PlaywrightDay5AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_5_DATA: PlaywrightDay5Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 5,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Actions, Assertions, Forms and Test Design',
  subtitle:
    'Master interactive browser commands (click, fill, select, check, upload), auto-retrying web-first assertions, comprehensive form testing patterns, and resilient Arrange-Act-Assert test design.',
  level: 'Beginner to Intermediate',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Day 1–4 concepts (JavaScript fundamentals, async/await, test setup, and user-facing locators).',
  learningObjectives: [
    'Execute core Playwright actions including click(), fill(), clear(), check(), uncheck(), selectOption(), press(), hover(), dblclick(), and setInputFiles().',
    'Understand Playwright actionability checks: visible, stable, enabled, editable, and receiving events before executing any interaction.',
    'Write auto-retrying web-first assertions (toBeVisible, toHaveText, toHaveValue, toBeChecked, toHaveURL, toHaveTitle) to prevent flaky timing bugs.',
    'Distinguish between browser actions and assertions, and explain why one-time state reads (such as page.url() === "...") fail in modern SPAs.',
    'Automate complex forms combining text fields, dropdowns, checkboxes, radio buttons, validation alerts, and successful submission states.',
    'Apply the Arrange-Act-Assert (AAA) pattern to structure clear, independent, and maintainable test cases.',
    'Design positive and negative test scenarios that verify genuine business outcomes rather than superficial button clicks.',
  ],

  roadmap: [
    { day: 1, title: 'Day 1: Automation Fundamentals & Playwright', focus: 'E2E Testing, Architecture, Roadmap', isCompleted: true },
    { day: 2, title: 'Day 2: JavaScript Essentials for Automation', focus: 'Variables, Logic, Functions, Async/Await', isCompleted: true },
    { day: 3, title: 'Day 3: Playwright Setup & First Script', focus: 'CLI, Config, Chromium, First Test', isCompleted: true },
    { day: 4, title: 'Day 4: Locators and Element Identification', focus: 'getByRole, getByLabel, CSS, XPath, Strictness, AI', isCompleted: true },
    { day: 5, title: 'Day 5: Actions, Assertions, Forms & Test Design', focus: 'User Actions, Web-First Assertions, AAA Pattern', isCurrent: true },
    { day: 6, title: 'Day 6: Auto-Waiting, Timeouts & Flakiness', focus: 'Actionability, Timeouts, Debugging Strategies' },
    { day: 7, title: 'Day 7: Navigation, Tabs, Frames & Dialogs', focus: 'Multi-Tab, Iframes, JavaScript Dialogs, Uploads' },
    { day: 8, title: 'Day 8: Hooks, Fixtures & Test Organisation', focus: 'beforeEach, test.extend, Test Suite Architecture' },
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
    // TOPIC 1: Understanding Playwright Actions
    // -----------------------------------------------------------------------
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: Understanding Playwright Actions',
      durationMinutes: 25,
      explanation: `In Day 4, you mastered locating elements with semantic, user-facing locators. Now, you will learn how to interact with those elements using Playwright actions.

### Core Playwright Actions Overview

Playwright provides dedicated action methods that simulate genuine human user interactions:

\`\`\`javascript
// 1. Text input
await page.getByLabel('Username').fill('alex.morgan');

// 2. Clear input (resets input value before typing)
await page.getByLabel('Search Query').clear();

// 3. Mouse clicking
await page.getByRole('button', { name: 'Submit' }).click();

// 4. Double clicking
await page.getByRole('button', { name: 'Expand Row' }).dblclick();

// 5. Checkboxes and radio buttons
await page.getByRole('checkbox', { name: 'Accept Terms' }).check();
await page.getByRole('checkbox', { name: 'Subscribe to Newsletter' }).uncheck();

// 6. Select dropdowns (by value, label, or index)
await page.getByLabel('Country').selectOption('US');
await page.getByLabel('Department').selectOption({ label: 'Quality Engineering' });

// 7. Keyboard keys
await page.getByLabel('Search').press('Enter');
await page.getByLabel('Quantity').press('ArrowUp');

// 8. Hovering (useful for dropdown menus and tooltips)
await page.getByRole('navigation').getByText('Solutions').hover();

// 9. File uploads
await page.getByLabel('Upload Resume').setInputFiles('tests/fixtures/sample_resume.pdf');
\`\`\`

### The Actionability Checklist

Before performing any action, Playwright automatically conducts **Actionability Checks**. Unlike legacy tools that throw immediate errors if an element is currently animating or obscured, Playwright pauses and auto-retries until the element satisfies all required criteria:

| Action | Visible? | Stable? | Enabled? | Editable? | Receives Events? |
| :--- | :---: | :---: | :---: | :---: | :---: |
| \`.click()\` | Yes | Yes | Yes | - | Yes |
| \`.fill()\` | Yes | - | Yes | Yes | - |
| \`.check()\` | Yes | Yes | Yes | - | Yes |
| \`.selectOption()\` | Yes | - | Yes | - | - |
| \`.hover()\` | Yes | Yes | - | - | Yes |

*Stable* means the element has stopped moving or animating (e.g. CSS transitions or slide-in drawers). If a button is disabled, \`.click()\` automatically waits up to the action timeout for it to become enabled.`,
      keyTakeaways: [
        'Playwright actions simulate realistic user events rather than synthetic JavaScript DOM injections.',
        'Every action automatically executes pre-interaction actionability checks (visible, stable, enabled).',
        'Use fill() for standard text inputs; it clears existing text and types the new string atomically.',
        'Use setInputFiles() to upload files without opening native operating system file picker dialogs.',
      ],
      terminology: [
        { term: 'Actionability Checks', definition: 'A suite of automatic pre-flight validations Playwright performs on an element before interacting with it.' },
        { term: 'fill()', definition: 'Playwright method that focuses an input, selects all existing text, and types replacement text.' },
        { term: 'selectOption()', definition: 'Playwright method to select options in native HTML <select> elements by value, label, or index.' },
      ],
      examples: [
        {
          title: 'Realistic Form Interaction Flow',
          description: 'A complete JavaScript snippet demonstrating standard form controls with accessible locators.',
          codeSnippet: `// tests/registration_actions.spec.js
const { test, expect } = require('@playwright/test');

test('completes user profile form using semantic actions', async ({ page }) => {
  await page.goto('https://practice.rootaccess.org/profile-setup');

  // Fill text fields
  await page.getByLabel('Full Name').fill('Sarah Connor');
  await page.getByLabel('Email Address').fill('sarah@cyberdyne.org');

  // Select dropdown option by visible text
  await page.getByLabel('Primary Role').selectOption({ label: 'Senior Automation QA' });

  // Toggle radio and checkboxes
  await page.getByRole('radio', { name: 'Full-Time Employment' }).check();
  await page.getByRole('checkbox', { name: 'Subscribe to Security Bulletins' }).check();

  // Upload portfolio avatar
  await page.getByLabel('Profile Avatar').setInputFiles('fixtures/avatar.png');

  // Submit
  await page.getByRole('button', { name: 'Save Profile' }).click();
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-actions-1',
        title: 'Actionability Checks in Practice',
        prompt: 'Why does Playwright check if an element is "stable" before executing a .click() action?',
        options: [
          'To ensure the element has completed any CSS transition or animation and will not move while the cursor clicks it',
          'To verify that the database transaction on the backend server has committed successfully',
          'To force the browser into headless mode before firing DOM events',
          'To confirm that the test script contains at least two assertion statements',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Element stability ensures the target DOM node has finished moving or animating. If a button slides in via CSS, clicking it while in motion could hit the wrong coordinates or miss entirely.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 2: Web-First Assertions
    // -----------------------------------------------------------------------
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Web-First Assertions',
      durationMinutes: 30,
      explanation: `Writing bulletproof test assertions is what separates an automation professional from an amateur. In Playwright, assertions are **web-first**.

### The Problem with One-Time Reads

In legacy frameworks or poorly written tests, engineers often write:
\`\`\`javascript
// BAD PRACTICE: One-time read!
const isVisible = await page.getByRole('alert').isVisible();
expect(isVisible).toBe(true); // Fails instantly if the alert takes 200ms to animate in!
\`\`\`

Why does this fail?
1. \`await page.getByRole('alert').isVisible()\` queries the DOM at that precise microsecond.
2. If your server is processing the request and the banner takes 300ms to appear, \`isVisible()\` returns \`false\` immediately.
3. The generic Jest/Chai assertion \`expect(false).toBe(true)\` throws an uninformative test failure.

### The Solution: Web-First Assertions

Playwright provides web-first assertions via the \`expect(locator)\` syntax. These assertions do **NOT** read once; they **smart-poll** the browser continuously until the condition passes or the assertion timeout (default 5,000ms) expires:

\`\`\`javascript
// GOOD PRACTICE: Web-first assertion with smart auto-retrying!
await expect(page.getByRole('alert')).toBeVisible();
\`\`\`

### Essential Web-First Assertions

| Assertion | Verifies |
| :--- | :--- |
| \`await expect(locator).toBeVisible()\` | Element is visible in the viewport and not display:none |
| \`await expect(locator).toBeHidden()\` | Element is removed from DOM or visually hidden |
| \`await expect(locator).toHaveText('Welcome')\` | Element text strictly matches expected string or RegExp |
| \`await expect(locator).toContainText('alex')\` | Element contains expected substring |
| \`await expect(locator).toHaveValue('qa-lead')\` | Input / select value attribute matches |
| \`await expect(locator).toBeEnabled()\` | Element is interactive and not disabled |
| \`await expect(locator).toBeDisabled()\` | Element has disabled attribute or aria-disabled |
| \`await expect(locator).toBeChecked()\` | Checkbox or radio button is checked |
| \`await expect(locator).toHaveCount(3)\` | Locator resolves to exactly 3 matching elements |
| \`await expect(page).toHaveURL(/.*dashboard/)\` | Browser URL matches string or regular expression |
| \`await expect(page).toHaveTitle(/.*RootAccess/)\` | Page document title matches expected pattern |

### Inverting Assertions (.not)
Every web-first assertion can be inverted with \`.not\`:
\`\`\`javascript
// Verify submit button is disabled while form is invalid:
await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

// Verify loader disappears once table data is populated:
await expect(page.getByTestId('loading-spinner')).not.toBeVisible();
\`\`\``,
      keyTakeaways: [
        'Always use await expect(locator).assertionMethod() for web-first assertions.',
        'Web-first assertions automatically retry until the condition passes or timeout is reached.',
        'Never read properties with one-time boolean getters (isVisible(), textContent()) followed by expect(val).toBe(true).',
        'Use .not to cleanly assert negative states (e.g. loaders disappearing, buttons disabling).',
      ],
      terminology: [
        { term: 'Web-First Assertion', definition: 'An assertion that accepts a locator and automatically polls the browser until the expected state is met or times out.' },
        { term: 'Smart Polling', definition: 'Repeatedly querying the DOM with exponential backoff rather than sleeping for arbitrary fixed milliseconds.' },
      ],
      examples: [
        {
          title: 'Comparing One-Time vs Web-First Assertions',
          description: 'A direct side-by-side comparison illustrating why web-first assertions eliminate test flakiness.',
          codeSnippet: `// ❌ Flaky: Will fail if API takes 150ms to return notification:
const text = await page.getByRole('alert').innerText();
expect(text).toContain('Account created');

// ✅ Bulletproof: Auto-retries every 50ms until banner arrives or 5s elapses:
await expect(page.getByRole('alert')).toContainText('Account created');`,
        },
      ],
      exercise: {
        id: 'checkpoint-assertions-1',
        title: 'Web-First vs Static Assertions',
        prompt: 'Which of the following lines utilizes Playwright\'s auto-retrying web-first assertion mechanism?',
        options: [
          'await expect(page.getByRole("status")).toHaveText("Payment Successful");',
          'const msg = await page.getByRole("status").textContent(); expect(msg === "Payment Successful").toBe(true);',
          'if (await page.getByRole("status").isVisible()) { console.log("passed"); }',
          'expect(page.url()).toBe("https://app.rootaccess.org/dashboard");',
        ],
        correctAnswerIndex: 0,
        explanation:
          'await expect(locator).toHaveText(...) passes a Locator to expect() and continuously re-checks the text in the browser until it matches or reaches the assertion timeout.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 3: Form Automation
    // -----------------------------------------------------------------------
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Form Automation',
      durationMinutes: 30,
      explanation: `Forms are the foundation of business web applications—from sign-up workflows and checkout carts to banking wire transfers.

### Structuring Form Test Cases

A robust form automation suite always exercises both **Happy Path** (positive) and **Boundary / Negative** validations:

1. **Required Field Validation (Negative):** Submitting with empty inputs must display required field error indicators.
2. **Format Validation (Negative):** Submitting invalid emails (e.g. \`plainaddress\`) or weak passwords triggers specific inline error messages.
3. **Valid Submission (Positive):** Filling all inputs correctly submits the form and displays a clear success banner or redirects to the dashboard.

### Best Practices for Form Elements

\`\`\`javascript
// 1. Text Inputs: Target by accessible label
await page.getByLabel('First Name').fill('Jessica');

// 2. Passwords: Target by label (keeps passwords out of selectors)
await page.getByLabel('Password', { exact: true }).fill('SuperSecret123!');

// 3. Dropdowns: Verify selection with toHaveValue()
const roleDropdown = page.getByLabel('Job Level');
await roleDropdown.selectOption('lead');
await expect(roleDropdown).toHaveValue('lead');

// 4. Radio Groups: Check the specific option
await page.getByRole('radio', { name: 'Annual Billing (Save 20%)' }).check();
await expect(page.getByRole('radio', { name: 'Annual Billing (Save 20%)' })).toBeChecked();

// 5. Submit Button: Verify disabled state, then click
const submitBtn = page.getByRole('button', { name: 'Create Workspace' });
await expect(submitBtn).toBeEnabled();
await submitBtn.click();
\`\`\`

### Asserting Form Validation States

When testing validation, verify:
1. That the specific error message is visible:
   \`await expect(page.getByText('Valid corporate email required')).toBeVisible();\`
2. That the form did NOT navigate away:
   \`await expect(page).toHaveURL(/.*register/);\`
3. That the submit button was not submitted multiple times.`,
      keyTakeaways: [
        'Test both positive (valid data) and negative (missing required, malformed input) scenarios.',
        'Use getByLabel for form controls; this ensures accessibility attributes (for / id) are correctly wired.',
        'Confirm dropdown selections with await expect(locator).toHaveValue(expectedValue).',
        'Verify validation messages appear and disappear dynamically in response to user actions.',
      ],
      terminology: [
        { term: 'Happy Path', definition: 'The default execution flow where valid inputs are provided and no errors occur.' },
        { term: 'Inline Validation', definition: 'Error messages rendered directly beside the offending input field in the UI.' },
      ],
      examples: [
        {
          title: 'Comprehensive Form Automation Test',
          description: 'Testing required field errors followed by valid submission.',
          codeSnippet: `test('validates required fields before allowing submission', async ({ page }) => {
  await page.goto('/register');

  // Attempt submitting empty form
  await page.getByRole('button', { name: 'Sign Up' }).click();

  // Verify inline validation errors
  await expect(page.getByText('Name is required')).toBeVisible();
  await expect(page.getByText('Email is required')).toBeVisible();

  // Now fill required inputs
  await page.getByLabel('Full Name').fill('David Miller');
  await page.getByLabel('Email Address').fill('david@rootaccess.org');
  await page.getByLabel('Password').fill('ValidPass123!');
  await page.getByRole('checkbox', { name: 'I agree to the terms' }).check();

  // Submit and verify success confirmation
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome to RootAccess!' })).toBeVisible();
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-forms-1',
        title: 'Verifying Form Dropdown Selection',
        prompt: 'After calling await page.getByLabel("Country").selectOption("CA"), what is the most robust web-first assertion to verify the selection?',
        options: [
          'await expect(page.getByLabel("Country")).toHaveValue("CA");',
          'expect(page.getByLabel("Country").value === "CA").toBe(true);',
          'await page.waitForTimeout(1000);',
          'await expect(page).toHaveTitle("CA");',
        ],
        correctAnswerIndex: 0,
        explanation:
          'await expect(page.getByLabel("Country")).toHaveValue("CA") polls the select element until its current value matches "CA", verifying the state change cleanly.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 4: Test Design (Arrange-Act-Assert)
    // -----------------------------------------------------------------------
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Test Design & The AAA Pattern',
      durationMinutes: 25,
      explanation: `Writing automated tests is software engineering. A test that is hard to read or reason about creates technical debt for the entire engineering team.

### The Arrange-Act-Assert (AAA) Pattern

Every test case should cleanly separate into three distinct phases:

1. **Arrange:** Set up preconditions, navigate to the target URL, configure mock data or seed states.
2. **Act:** Perform the user actions under test (type into fields, click buttons, select items).
3. **Assert:** Verify the expected outcomes using web-first assertions.

\`\`\`javascript
test('subscribes user to newsletter with valid email', async ({ page }) => {
  // 1. ARRANGE
  await page.goto('/newsletter');
  const emailInput = page.getByPlaceholder('Enter your email');
  const subscribeButton = page.getByRole('button', { name: 'Subscribe' });

  // 2. ACT
  await emailInput.fill('developer@rootaccess.org');
  await subscribeButton.click();

  // 3. ASSERT
  await expect(page.getByRole('alert')).toHaveText('Thank you for subscribing!');
  await expect(emailInput).toHaveValue(''); // input cleared after submit
});
\`\`\`

### Test Independence (No Shared State)
- Each test must run independently from every other test.
- Test B must **never** rely on Test A having logged in or created a database record.
- If tests share mutable state, running them in parallel (Playwright's default) causes intermittent, unexplained failures.

### Meaningful Test Names
- ❌ Bad: \`test('test 1', async ({ page }) => { ... });\`
- ❌ Bad: \`test('form works', async ({ page }) => { ... });\`
- ✅ Good: \`test('should show password mismatch error when passwords do not match', async ({ page }) => { ... });\`
- ✅ Good: \`test('should navigate to dashboard upon entering valid credentials', async ({ page }) => { ... });\`

### Asserting Outcomes vs Clicking Buttons
An automation script that clicks 10 buttons without asserting any outcome is not a test—it is merely an automated monkey. Always assert the observable business result (e.g. success banner, updated badge, modal closed, redirected URL).`,
      keyTakeaways: [
        'Organize every test case into Arrange, Act, and Assert phases for immediate readability.',
        'Ensure tests are strictly independent—never design tests that depend on execution order.',
        'Use descriptive test names that communicate the expected behavior and scenario.',
        'Assert business outcomes rather than just executing actions.',
      ],
      terminology: [
        { term: 'Arrange-Act-Assert', definition: 'A software testing design pattern that standardizes test structure into setup, execution, and verification phases.' },
        { term: 'Test Independence', definition: 'The property where each test case can execute in any order or in parallel without relying on other tests.' },
      ],
      examples: [
        {
          title: 'Clean AAA Test Structure',
          description: 'A well-structured test with distinct Arrange, Act, and Assert phases.',
          codeSnippet: `test('should display validation error when registration email is invalid', async ({ page }) => {
  // Arrange
  await page.goto('/signup');
  const emailInput = page.getByLabel('Email Address');
  const submitButton = page.getByRole('button', { name: 'Continue' });

  // Act
  await emailInput.fill('invalid-email-format');
  await submitButton.click();

  // Assert
  await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  await expect(submitButton).toBeEnabled();
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-testdesign-1',
        title: 'Identifying Test Independence',
        prompt: 'Why should Test B never depend on Test A having already executed in a Playwright test suite?',
        options: [
          'Because Playwright runs tests in parallel across worker processes, meaning execution order is non-deterministic',
          'Because JavaScript does not allow more than one test() block per file',
          'Because browsers close automatically after every click event',
          'Because npm requires all tests to be written inside a single function',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Playwright executes tests in parallel across multiple worker threads by default. Tests that depend on execution order will intermittently fail when run concurrently or individually.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 5: Hands-on Lab — Interactive Registration Form Challenge
    // -----------------------------------------------------------------------
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Topic 5: Hands-on Lab — Interactive Registration Form Challenge',
      durationMinutes: 35,
      explanation: `In this practical lab, you will design and implement a comprehensive test suite for a realistic user registration workflow.

### The Simulated Target Application

The application under test is a SaaS developer workspace registration form at \`/app/register\` with the following specification:

\`\`\`html
<!-- Registration Form DOM Structure -->
<form id="registration-form">
  <label for="name-input">Full Name *</label>
  <input id="name-input" type="text" placeholder="e.g. Alex Morgan" required />

  <label for="email-input">Work Email *</label>
  <input id="email-input" type="email" placeholder="alex@company.com" required />

  <label for="role-select">Primary Engineering Role *</label>
  <select id="role-select">
    <option value="">Select a role...</option>
    <option value="qa_lead">Lead QA Automation Engineer</option>
    <option value="sdet">Software Development Engineer in Test (SDET)</option>
    <option value="devops">DevOps / CI-CD Specialist</option>
  </select>

  <label>
    <input type="checkbox" name="terms" /> I agree to the RootAccess Terms of Service *
  </label>

  <button type="submit">Complete Registration</button>
</form>

<!-- Validation Alert -->
<div role="alert" class="error-banner" style="display:none;"></div>

<!-- Confirmation Screen -->
<div class="registration-success" style="display:none;">
  <h2>Registration Confirmed!</h2>
  <p>Welcome aboard, <span id="user-display"></span>.</p>
</div>
\`\`\`

### Lab Requirements (5 Test Cases):
1. **Test 1: Required Fields Validation:** Submitting an empty form shows the error alert "All required fields must be completed".
2. **Test 2: Invalid Email Validation:** Entering \`not-an-email\` triggers "Please enter a valid work email".
3. **Test 3: Terms Checkbox Enforcement:** Filling valid name and email but leaving terms unchecked blocks submission.
4. **Test 4: Dropdown Selection:** Selecting 'sdet' correctly updates the dropdown value.
5. **Test 5: Full Successful Registration (Happy Path):** Filling all fields, selecting role, checking terms, and clicking submit displays "Registration Confirmed!".`,
      keyTakeaways: [
        'Automate both positive and negative scenarios using accessible locators.',
        'Use Arrange-Act-Assert structure in every test block.',
        'Verify validation messages appear and disappear dynamically.',
        'Assert confirmation elements using auto-retrying web-first assertions.',
      ],
      terminology: [
        { term: 'Test Fixture', definition: 'Pre-arranged environment state, URL, or data used to execute a test under known conditions.' },
      ],
      examples: [
        {
          title: 'Reference Test Case Structure',
          description: 'A sample test case demonstrating the expected structure for the lab.',
          codeSnippet: `test('should show error when email is malformed', async ({ page }) => {
  // Arrange
  await page.goto('/app/register');

  // Act
  await page.getByLabel('Full Name').fill('Marcus Wright');
  await page.getByLabel('Work Email').fill('marcus-invalid-email');
  await page.getByLabel('Primary Engineering Role').selectOption('qa_lead');
  await page.getByRole('checkbox', { name: /Terms of Service/i }).check();
  await page.getByRole('button', { name: 'Complete Registration' }).click();

  // Assert
  await expect(page.getByRole('alert')).toContainText('Please enter a valid work email');
});`,
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      id: 'day5-iq-1',
      questionNumber: 1,
      difficulty: 'Beginner',
      question: 'What is the difference between an action and an assertion in Playwright?',
      assessmentFocus: 'Understanding core browser automation concepts and separation of concerns.',
      modelAnswer:
        'An action (e.g. click(), fill(), selectOption()) instructs Playwright to interact with an element and simulate human behavior. Playwright auto-waits for actionability checks before executing the action. An assertion (e.g. expect(locator).toBeVisible(), toHaveText()) verifies that the application is in an expected state. Web-first assertions smart-poll the browser continuously until the condition evaluates to true or times out.',
      followUpQuestion: 'What happens if an action fails its actionability checks versus when an assertion fails?',
    },
    {
      id: 'day5-iq-2',
      questionNumber: 2,
      difficulty: 'Intermediate',
      question: 'Why does Playwright recommend web-first assertions over reading a property and checking it with Jest/Chai assertions?',
      assessmentFocus: 'Flakiness prevention, asynchronous rendering, and smart polling.',
      modelAnswer:
        'Reading a property directly (e.g. const val = await page.getByRole("alert").textContent(); expect(val).toBe("Saved");) performs an immediate, one-time read of the DOM. If the application is asynchronous and renders the alert 100ms later, the one-time read immediately fails. Web-first assertions (await expect(locator).toHaveText("Saved")) continuously poll the element in the browser until it matches or reaches the assertion timeout, completely eliminating race conditions.',
      followUpQuestion: 'How can you configure the default timeout for web-first assertions globally?',
    },
    {
      id: 'day5-iq-3',
      questionNumber: 3,
      difficulty: 'Intermediate',
      question: 'How do you automate a file upload in Playwright, and why is setInputFiles() preferred over clicking the upload button?',
      assessmentFocus: 'Handling native operating system file dialogs without external tools.',
      modelAnswer:
        'Playwright uses locator.setInputFiles("path/to/file.pdf") to set files directly onto an <input type="file"> element. Clicking a file upload button would launch a native OS file picker window (Finder on macOS or Explorer on Windows), which browser automation protocols cannot interact with. setInputFiles() bypasses the native dialog safely and triggers appropriate change and input JavaScript events on the element.',
      followUpQuestion: 'How would you handle a custom drag-and-drop file upload zone that lacks a visible file input?',
    },
    {
      id: 'day5-iq-4',
      questionNumber: 4,
      difficulty: 'Scenario-Based',
      question: 'You have a submit button that remains disabled until all 4 form fields are valid. How would you test this behavior with Playwright?',
      assessmentFocus: 'Dynamic form state validation and negative testing.',
      modelAnswer:
        'First, navigate to the form and assert that the submit button is initially disabled using await expect(submitBtn).toBeDisabled(). Next, fill fields 1, 2, and 3 one by one, asserting after each that the button remains disabled. Finally, fill the 4th required field and assert await expect(submitBtn).toBeEnabled(). Then click the button and assert the successful form submission outcome.',
      followUpQuestion: 'What assertion would you use to verify that an input field border turned red indicating an error state?',
    },
    {
      id: 'day5-iq-5',
      questionNumber: 5,
      difficulty: 'Intermediate',
      question: 'Explain the Arrange-Act-Assert (AAA) pattern and why test independence is critical when executing Playwright in parallel.',
      assessmentFocus: 'Test architecture, maintainability, and parallel execution.',
      modelAnswer:
        'The Arrange-Act-Assert pattern standardizes test structure: Arrange prepares test data and navigation, Act performs user operations, and Assert validates the resulting state. Test independence means each test case is completely self-contained and creates its own preconditions. In Playwright, tests run in parallel across separate worker processes by default. If Test B depends on cookies or database entities created by Test A, parallel execution will cause intermittent failures due to non-deterministic test order.',
      followUpQuestion: 'What hooks or fixtures does Playwright offer to help with the Arrange phase?',
    },
  ],

  quizQuestions: [
    {
      id: 'day5-q1',
      questionNumber: 1,
      question: 'Which method should you use to enter text into an input field, automatically clearing any previous text first?',
      options: ['locator.fill("text")', 'locator.type("text")', 'locator.write("text")', 'locator.sendKeys("text")'],
      correctAnswerIndex: 0,
      explanation:
        'locator.fill() is the recommended Playwright action. It focuses the input, clears existing text, and fills the new string atomically.',
    },
    {
      id: 'day5-q2',
      questionNumber: 2,
      question: 'What is the key difference between page.getByRole("alert").isVisible() and expect(page.getByRole("alert")).toBeVisible()?',
      options: [
        'isVisible() is a one-time check that returns a boolean immediately, while expect().toBeVisible() auto-retries until visible or timed out',
        'isVisible() waits 30 seconds while toBeVisible() only waits 1 second',
        'isVisible() works only in Chromium while toBeVisible() works across all browsers',
        'There is no difference; they are exact aliases',
      ],
      correctAnswerIndex: 0,
      explanation:
        'isVisible() does not poll—it returns a boolean snapshot at that millisecond. expect().toBeVisible() is web-first and polls until the element appears.',
    },
    {
      id: 'day5-q3',
      questionNumber: 3,
      question: 'Which assertion correctly verifies that an input field currently contains the value "alex@rootaccess.org"?',
      options: [
        'await expect(emailInput).toHaveValue("alex@rootaccess.org");',
        'await expect(emailInput).toHaveText("alex@rootaccess.org");',
        'expect(emailInput.value).toBe("alex@rootaccess.org");',
        'await expect(emailInput).toBeValue("alex@rootaccess.org");',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Inputs hold their contents in the DOM "value" property, which is asserted with toHaveValue(). toHaveText() inspects inner text, which is empty for self-closing input elements.',
    },
    {
      id: 'day5-q4',
      questionNumber: 4,
      question: 'How do you select an option with visible text "Lead Automation QA" from a native HTML <select> dropdown?',
      options: [
        'await page.getByLabel("Role").selectOption({ label: "Lead Automation QA" });',
        'await page.getByLabel("Role").click("Lead Automation QA");',
        'await page.getByLabel("Role").choose("Lead Automation QA");',
        'await page.getByLabel("Role").fill("Lead Automation QA");',
      ],
      correctAnswerIndex: 0,
      explanation:
        'selectOption({ label: "..." }) selects options by their human-visible text in standard <select> dropdowns.',
    },
    {
      id: 'day5-q5',
      questionNumber: 5,
      question: 'How does Playwright handle file uploads for <input type="file"> elements?',
      options: [
        'By using locator.setInputFiles("path/to/file.ext") to set files directly onto the input',
        'By clicking the upload button and sending keystrokes to the operating system file explorer',
        'By copying the file into the browser cookies',
        'File uploads cannot be automated in Playwright',
      ],
      correctAnswerIndex: 0,
      explanation:
        'locator.setInputFiles() sets file references directly on the file input, avoiding native OS file dialogs completely.',
    },
    {
      id: 'day5-q6',
      questionNumber: 6,
      question: 'Which assertion confirms that a checkbox is currently selected?',
      options: [
        'await expect(checkboxLocator).toBeChecked();',
        'await expect(checkboxLocator).toHaveChecked(true);',
        'expect(checkboxLocator.isChecked).toBe(true);',
        'await expect(checkboxLocator).toBeSelected();',
      ],
      correctAnswerIndex: 0,
      explanation:
        'toBeChecked() is the web-first assertion to verify that checkboxes or radio buttons are in a checked state.',
    },
    {
      id: 'day5-q7',
      questionNumber: 7,
      question: 'In the Arrange-Act-Assert (AAA) pattern, what belongs in the "Arrange" phase?',
      options: [
        'Setting up test data, navigating to the page under test, and preparing preconditions',
        'Clicking submit buttons and typing passwords',
        'Asserting that the database record exists',
        'Writing the test report to disk',
      ],
      correctAnswerIndex: 0,
      explanation:
        'The Arrange phase sets up everything needed for the test to execute cleanly before any interaction occurs.',
    },
    {
      id: 'day5-q8',
      questionNumber: 8,
      question: 'What is the default timeout for web-first assertions in Playwright unless overridden?',
      options: ['5,000 milliseconds (5 seconds)', '30,000 milliseconds (30 seconds)', '500 milliseconds (0.5 seconds)', '0 milliseconds (no wait)'],
      correctAnswerIndex: 0,
      explanation:
        'Playwright web-first assertions have a default timeout of 5,000ms (5 seconds), whereas general test actions typically default to 30,000ms.',
    },
    {
      id: 'day5-q9',
      questionNumber: 9,
      question: 'How do you assert that a loading spinner has disappeared from the screen after an API call completes?',
      options: [
        'await expect(page.getByTestId("loading-spinner")).not.toBeVisible();',
        'await page.waitForTimeout(3000);',
        'expect(page.getByTestId("loading-spinner")).toBeHiddenSync();',
        'await expect(page.getByTestId("loading-spinner")).toBeVisible(false);',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Using .not.toBeVisible() or .toBeHidden() polls until the element is either removed from the DOM or hidden via CSS display/visibility.',
    },
    {
      id: 'day5-q10',
      questionNumber: 10,
      question: 'Why is it an anti-pattern to make tests dependent on the execution results of previous tests?',
      options: [
        'Because Playwright runs tests in parallel by default, making execution order unpredictable and causing cascading failures',
        'Because Playwright terminates after any single test passes',
        'Because JavaScript garbage collection deletes all variables between functions',
        'Because web-first assertions only work on the first test in a file',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Test independence ensures tests can execute concurrently across CPU cores and in any order without failing due to missing shared state.',
    },
  ],
};

// -----------------------------------------------------------------------------
// STARTER CODE & EVALUATION RUBRIC FOR DAY 5 PRACTICAL ASSIGNMENT
// -----------------------------------------------------------------------------

export const PLAYWRIGHT_DAY_5_STARTER_CODE = `// tests/registration_form.spec.js
// DAY 5 ASSIGNMENT: Actions, Assertions, Forms and Test Design
// Complete the test suite below following the Arrange-Act-Assert (AAA) pattern.

const { test, expect } = require('@playwright/test');

test.describe('User Registration Form Suite', () => {

  test('TC-1: should show required field validation when submitting empty form', async ({ page }) => {
    // 1. Arrange: Navigate to registration form
    await page.goto('/app/register');

    // 2. Act: Click submit without filling required fields
    await page.getByRole('button', { name: 'Complete Registration' }).click();

    // 3. Assert: Verify required fields error banner appears
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('All required fields must be completed');
  });

  test('TC-2: should show error when email format is invalid', async ({ page }) => {
    // 1. Arrange
    await page.goto('/app/register');

    // 2. Act: Fill valid name, invalid email, select role, check terms
    await page.getByLabel('Full Name').fill('Alex Morgan');
    await page.getByLabel('Work Email').fill('invalid-email-string');
    await page.getByLabel('Primary Engineering Role').selectOption('sdet');
    await page.getByRole('checkbox', { name: /Terms of Service/i }).check();
    await page.getByRole('button', { name: 'Complete Registration' }).click();

    // 3. Assert: Verify email format validation error
    await expect(page.getByRole('alert')).toContainText('Please enter a valid work email');
  });

  test('TC-3: should allow selecting an engineering role from dropdown', async ({ page }) => {
    // Arrange
    await page.goto('/app/register');

    // Act
    const roleDropdown = page.getByLabel('Primary Engineering Role');
    await roleDropdown.selectOption('qa_lead');

    // Assert
    await expect(roleDropdown).toHaveValue('qa_lead');
  });

  test('TC-4: should require terms and conditions checkbox to be checked', async ({ page }) => {
    // Arrange
    await page.goto('/app/register');

    // Act: Fill all inputs except terms checkbox
    await page.getByLabel('Full Name').fill('Sarah Connor');
    await page.getByLabel('Work Email').fill('sarah@cyberdyne.org');
    await page.getByLabel('Primary Engineering Role').selectOption('devops');
    await page.getByRole('button', { name: 'Complete Registration' }).click();

    // Assert: Verify terms agreement error
    await expect(page.getByRole('alert')).toContainText('You must agree to the Terms of Service');
  });

  test('TC-5: should successfully register new user with valid inputs (Happy Path)', async ({ page }) => {
    // Arrange
    await page.goto('/app/register');

    // Act: Complete full valid form
    await page.getByLabel('Full Name').fill('Jordan Lee');
    await page.getByLabel('Work Email').fill('jordan.lee@rootaccess.org');
    await page.getByLabel('Primary Engineering Role').selectOption('sdet');
    await page.getByRole('checkbox', { name: /Terms of Service/i }).check();
    await page.getByRole('button', { name: 'Complete Registration' }).click();

    // Assert: Verify confirmation screen and greeting
    await expect(page.getByRole('heading', { name: 'Registration Confirmed!' })).toBeVisible();
    await expect(page.locator('#user-display')).toHaveText('Jordan Lee');
  });

});
`;

export const PLAYWRIGHT_DAY_5_STARTER_EXPLANATION = `Test Design & Implementation Rationale:
1. Arrange-Act-Assert (AAA): Every test clearly separates URL preparation and locator queries from user action calls and assertions.
2. Web-First Assertions: Used await expect(locator).toBeVisible(), toContainText(), and toHaveValue() instead of static boolean getters, ensuring resilience against asynchronous rendering delays.
3. Form Actions: Exercised fill() for text inputs, selectOption() for the native dropdown, and check() for the terms agreement checkbox.
4. Positive & Negative Coverage: Covered 4 negative validation paths (empty form, malformed email, missing terms) and 1 complete happy-path submission.
5. Test Independence: Each test starts with its own page.goto('/app/register') navigation, ensuring tests can execute in parallel without cross-test state leakage.`;

export const PLAYWRIGHT_DAY_5_STARTER_OUTPUT = `Running 5 tests using 3 workers
  ✓ [chromium] › registration_form.spec.js:8:3 › TC-1: should show required field validation (640ms)
  ✓ [chromium] › registration_form.spec.js:18:3 › TC-2: should show error when email format is invalid (520ms)
  ✓ [chromium] › registration_form.spec.js:31:3 › TC-3: should allow selecting an engineering role from dropdown (410ms)
  ✓ [chromium] › registration_form.spec.js:42:3 › TC-4: should require terms and conditions checkbox (580ms)
  ✓ [chromium] › registration_form.spec.js:53:3 › TC-5: should successfully register new user with valid inputs (790ms)

  5 passed (2.9s)`;

export function evaluateDay5Assignment(
  code: string,
  explanation: string,
  expectedOutput: string
): PlaywrightDay5AssignmentRubric {
  const criteria: PlaywrightDay5AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Has form filling actions (.fill())
  const hasFormFillingActions = /\.fill\s*\(/.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'Text Field Input Automation (fill)',
    passed: hasFormFillingActions,
    feedback: hasFormFillingActions
      ? 'Successfully used .fill() to enter text into inputs.'
      : 'Missing .fill() calls for text fields.',
  });
  if (hasFormFillingActions) score += 1;

  // 2. Uses click and check actions (.click() and .check())
  const usesClickAndCheck = /\.click\s*\(/.test(code) && /\.check\s*\(/.test(code);
  criteria.push({
    id: 'crit-2',
    title: 'Click and Check Actions (.click and .check)',
    passed: usesClickAndCheck,
    feedback: usesClickAndCheck
      ? 'Correctly implemented button clicks and checkbox toggling.'
      : 'Ensure both .click() for buttons and .check() for checkboxes are utilized.',
  });
  if (usesClickAndCheck) score += 1;

  // 3. Uses selectOption() for dropdowns
  const usesSelectOption = /\.selectOption\s*\(/.test(code);
  criteria.push({
    id: 'crit-3',
    title: 'Dropdown Selection (.selectOption)',
    passed: usesSelectOption,
    feedback: usesSelectOption
      ? 'Implemented .selectOption() to handle native dropdowns.'
      : 'Missing .selectOption() call to automate the dropdown element.',
  });
  if (usesSelectOption) score += 1;

  // 4. Has web-first assertions (expect(locator).toBeVisible, etc.)
  const hasWebFirstAssertions =
    /expect\s*\([^)]+\)\s*\.(toBeVisible|toContainText|toHaveText|toHaveValue|toBeChecked|toBeEnabled|toBeDisabled)/.test(
      code
    );
  criteria.push({
    id: 'crit-4',
    title: 'Web-First Auto-Retrying Assertions',
    passed: hasWebFirstAssertions,
    feedback: hasWebFirstAssertions
      ? 'Used auto-retrying web-first assertions (toBeVisible, toHaveText, toHaveValue).'
      : 'Must use web-first assertions like await expect(locator).toBeVisible().',
  });
  if (hasWebFirstAssertions) score += 1;

  // 5. Validates form submission outcome
  const validatesFormSubmission =
    /Registration Confirmed|alert|Confirmed!/i.test(code) && /expect/.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'Submission Outcome Verification',
    passed: validatesFormSubmission,
    feedback: validatesFormSubmission
      ? 'Verified the observable post-submission state and confirmation messages.'
      : 'Add assertions verifying submission confirmation or error banners.',
  });
  if (validatesFormSubmission) score += 1;

  // 6. Tests positive scenario (happy path)
  const testsPositiveScenario =
    /TC-5|Happy Path|successfully register/i.test(code) && /\.click\s*\(/.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Positive Happy Path Scenario',
    passed: testsPositiveScenario,
    feedback: testsPositiveScenario
      ? 'Includes a complete positive happy path registration test.'
      : 'Provide a test verifying successful registration with all valid inputs.',
  });
  if (testsPositiveScenario) score += 1;

  // 7. Tests negative validation scenarios
  const testsNegativeValidation =
    /invalid|empty|required/i.test(code) && /toBeVisible|toContainText/i.test(code);
  criteria.push({
    id: 'crit-7',
    title: 'Negative / Validation Scenarios',
    passed: testsNegativeValidation,
    feedback: testsNegativeValidation
      ? 'Includes negative test cases verifying form validation messages.'
      : 'Include negative test cases checking validation error banners.',
  });
  if (testsNegativeValidation) score += 1;

  // 8. Uses Arrange-Act-Assert structure
  const usesArrangeActAssert =
    /Arrange|Act|Assert/i.test(code) ||
    /Arrange|Act|Assert/i.test(explanation);
  criteria.push({
    id: 'crit-8',
    title: 'Arrange-Act-Assert (AAA) Design Pattern',
    passed: usesArrangeActAssert,
    feedback: usesArrangeActAssert
      ? 'Structured test cases following the Arrange-Act-Assert design pattern.'
      : 'Organize test cases clearly using the Arrange, Act, Assert pattern.',
  });
  if (usesArrangeActAssert) score += 1;

  // 9. Has meaningful test names
  const testNameMatches = code.match(/test\s*\(\s*['"][^'"]+['"]/g) || [];
  const hasMeaningfulTestNames =
    testNameMatches.length >= 3 &&
    testNameMatches.every((m) => m.length > 25);
  criteria.push({
    id: 'crit-9',
    title: 'Meaningful, Descriptive Test Names',
    passed: hasMeaningfulTestNames,
    feedback: hasMeaningfulTestNames
      ? `Provided ${testNameMatches.length} clear, descriptive test names explaining the scenarios.`
      : 'Write descriptive test names explaining the scenario and expected outcome.',
  });
  if (hasMeaningfulTestNames) score += 1;

  // 10. Syntactically valid JavaScript & Playwright runner structure
  const syntacticallyValidJavaScript =
    /const\s*\{\s*test\s*,\s*expect\s*\}\s*=\s*require\('@playwright\/test'\)/.test(code) &&
    /test(\.describe)?\s*\(/.test(code) &&
    expectedOutput.length > 20;
  criteria.push({
    id: 'crit-10',
    title: 'Valid Playwright Runner Syntax & Terminal Output',
    passed: syntacticallyValidJavaScript,
    feedback: syntacticallyValidJavaScript
      ? 'Code imports @playwright/test correctly and terminal output demonstrates clean execution.'
      : 'Ensure code imports test and expect from @playwright/test and provides valid runner output.',
  });
  if (syntacticallyValidJavaScript) score += 1;

  const passed = score >= 8;
  const feedback = criteria.map((c) => `${c.passed ? '✓' : '✗'} ${c.title}: ${c.feedback}`);

  return {
    hasFormFillingActions,
    usesClickAndCheck,
    usesSelectOption,
    hasWebFirstAssertions,
    validatesFormSubmission,
    testsPositiveScenario,
    testsNegativeValidation,
    usesArrangeActAssert,
    hasMeaningfulTestNames,
    syntacticallyValidJavaScript,
    score,
    feedback,
    passed,
    criteria,
  };
}
