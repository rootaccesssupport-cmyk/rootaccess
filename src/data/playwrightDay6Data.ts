import type {
  PlaywrightDay6Unit,
  PlaywrightDay6AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_6_DATA: PlaywrightDay6Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 6,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Auto-Waiting, Timeouts and Flaky-Test Prevention',
  subtitle:
    'Master Playwright automatic synchronization, actionability checks, timeout architectures, web-first waiting strategies, debugging tools (Trace Viewer & Inspector), and systematic flaky-test elimination.',
  level: 'Intermediate',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Day 1–5 concepts (JavaScript async/await, user-facing locators, actions, and web-first assertions).',
  learningObjectives: [
    'Explain how Playwright auto-waiting operates behind the scenes during locator resolution and action execution.',
    'Understand the distinct timeout tiers in Playwright: Test Timeout, Assertion Timeout, Action Timeout, and Navigation Timeout.',
    'Configure timeouts properly in playwright.config.js and understand when to adjust a timeout versus when to fix the underlying test.',
    'Diagnose the primary root causes of test flakiness: arbitrary sleep timers, brittle CSS, shared mutable state, and race conditions.',
    'Apply precision waiting strategies: web-first assertions, page.waitForURL(), page.waitForResponse(), and targeted load states.',
    'Explain why networkidle is an anti-pattern for polling or streaming web applications and why fixed delays are banned.',
    'Debug broken and intermittent tests using error stack traces, Playwright Inspector, Trace Viewer, and execution artifact analysis.',
  ],

  roadmap: [
    { day: 1, title: 'Day 1: Automation Fundamentals & Playwright', focus: 'E2E Testing, Architecture, Roadmap', isCompleted: true },
    { day: 2, title: 'Day 2: JavaScript Essentials for Automation', focus: 'Variables, Logic, Functions, Async/Await', isCompleted: true },
    { day: 3, title: 'Day 3: Playwright Setup & First Script', focus: 'CLI, Config, Chromium, First Test', isCompleted: true },
    { day: 4, title: 'Day 4: Locators and Element Identification', focus: 'getByRole, getByLabel, CSS, XPath, Strictness, AI', isCompleted: true },
    { day: 5, title: 'Day 5: Actions, Assertions, Forms & Test Design', focus: 'User Actions, Web-First Assertions, AAA Pattern', isCompleted: true },
    { day: 6, title: 'Day 6: Auto-Waiting, Timeouts & Flakiness', focus: 'Actionability, Timeouts, Trace Viewer, Flakiness', isCurrent: true },
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
    // TOPIC 1: How Playwright Waits
    // -----------------------------------------------------------------------
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: How Playwright Waits',
      durationMinutes: 25,
      explanation: `In older automation tools like Selenium WebDriver, synchronization was the engineer's worst nightmare. Tests were littered with \`Thread.sleep(5000)\` or \`WebDriverWait\` boilerplates that either slowed suites to a crawl or failed randomly under network latency.

### The Auto-Waiting Engine

Playwright eliminates manual synchronization by building auto-waiting directly into every action and locator:

\`\`\`javascript
// When you call:
await page.getByRole('button', { name: 'Confirm Purchase' }).click();
\`\`\`

Playwright does not simply dispatch a click event. It executes a comprehensive **Actionability Check Lifecycle**:
1. **Attached:** Verifies that the locator resolves to an element currently attached to the DOM.
2. **Visible:** Verifies that the element has non-empty bounding box dimensions and is not \`display: none\` or \`visibility: hidden\`.
3. **Stable:** Verifies that the element has finished any ongoing CSS transform, transition, or position animation.
4. **Receives Events:** Verifies that the element is the topmost hit-target and is not covered or obscured by an active modal backdrop, loading overlay, or sticky banner.
5. **Enabled:** Verifies that the element does not possess the \`disabled\` HTML attribute or \`aria-disabled="true"\`.

### Waiting for an Element vs Waiting for a Condition

A crucial architectural distinction:
- **Waiting for an Element:** Merely confirms that HTML exists in the DOM. An element might exist in HTML while still hidden, animated off-screen, or disabled by client-side JavaScript.
- **Waiting for a Condition (Playwright Standard):** Confirms that the element is ready for user interaction or has reached the desired functional state.`,
      keyTakeaways: [
        'Playwright auto-waits before executing actions until the target element satisfies all actionability checks.',
        'Actionability checks verify that elements are attached, visible, stable, receiving events, and enabled.',
        'Never wrap actions in manual sleep delays—let Playwright smart-wait automatically.',
        'Distinguish between DOM presence and user actionability.',
      ],
      terminology: [
        { term: 'Auto-Waiting', definition: 'Playwright feature where action and assertion methods automatically poll until target elements satisfy required readiness criteria.' },
        { term: 'Receives Events', definition: 'Actionability check verifying the target element is at the top of the z-index stack at the action coordinates.' },
      ],
      examples: [
        {
          title: 'Actionability in Asynchronous UIs',
          description: 'How Playwright seamlessly handles a button enabled after an asynchronous validation.',
          codeSnippet: `// The button starts with disabled="true" while backend checks coupon code:
const applyBtn = page.getByRole('button', { name: 'Apply Coupon' });
await page.getByPlaceholder('Promo Code').fill('ROOTACCESS20');

// Playwright automatically waits up to the action timeout for disabled to be removed!
await applyBtn.click();`,
        },
      ],
      exercise: {
        id: 'checkpoint-waiting-1',
        title: 'Actionability Check Lifecycle',
        prompt: 'What happens if a button has a semi-transparent loading spinner overlay covering it when Playwright attempts to click it?',
        options: [
          'Playwright pauses and retries until the loading overlay is removed from the DOM or disappears, satisfying "Receives Events"',
          'Playwright throws an immediate StaleElementReferenceException',
          'Playwright forces the click through the overlay using direct JavaScript dispatch',
          'The browser tab crashes automatically',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Because of the "Receives Events" actionability check, Playwright detects that the click would hit the overlay instead of the button, and auto-retries until the overlay disappears.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 2: Timeouts Architecture & Configuration
    // -----------------------------------------------------------------------
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Timeouts Architecture & Configuration',
      durationMinutes: 25,
      explanation: `To prevent broken tests from hanging indefinitely in CI pipelines, Playwright implements a multi-tiered timeout hierarchy.

### The 4 Timeout Tiers

1. **Test Timeout (Default: 30,000ms / 30s):** The maximum total time allowed for an entire \`test('...', async ({ page }) => { ... })\` block, including all hooks (\`beforeEach\`, \`afterEach\`).
2. **Assertion Timeout (Default: 5,000ms / 5s):** The maximum time a web-first assertion (e.g. \`await expect(locator).toBeVisible()\`) will poll for the expected condition.
3. **Action Timeout (Default: 0 / No separate limit, bounded by Test Timeout):** The maximum time an action (like \`.click()\` or \`.fill()\`) waits for actionability checks.
4. **Navigation Timeout (Default: 0 / Bounded by Test Timeout):** The maximum time \`page.goto()\` waits for the page to navigate.

### Configuring Timeouts in playwright.config.js

\`\`\`javascript
// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Global test timeout for each test
  timeout: 30 * 1000, // 30 seconds

  expect: {
    // Timeout for web-first expect() assertions
    timeout: 5 * 1000, // 5 seconds
  },

  use: {
    // Base URL to simplify page.goto('/')
    baseURL: 'https://staging.rootaccess.org',

    // Specific timeout for actions like click, fill
    actionTimeout: 10 * 1000, // 10 seconds

    // Specific timeout for page navigation
    navigationTimeout: 15 * 1000, // 15 seconds
  },
});
\`\`\`

### When to Adjust Timeouts vs Fixing the Test
- **Anti-Pattern:** Increasing timeouts from 30s to 120s because a test is flaky. This masks performance regressions and wastes expensive CI minutes.
- **Valid Reasons to Increase:** Heavy end-to-end report generation, complex database seeding, or executing tests in resource-constrained CI environments.
- **Per-Test Override:**
  \`\`\`javascript
  test('generates large annual compliance audit export', async ({ page }) => {
    test.setTimeout(120000); // 2 minutes for this specific heavy test
    // ...
  });
  \`\`\``,
      keyTakeaways: [
        'Understand the 4 timeout tiers: Test (30s), Assertion (5s), Action, and Navigation.',
        'Configure timeouts centrally in playwright.config.js rather than scattering arbitrary numbers across tests.',
        'Never increase timeouts to hide race conditions or application bugs.',
        'Use test.setTimeout() sparingly on specific heavy data-processing scenarios.',
      ],
      terminology: [
        { term: 'Test Timeout', definition: 'The hard ceiling on total runtime for a single test block and its associated lifecycle hooks.' },
        { term: 'Assertion Timeout', definition: 'The duration expect(locator) assertions will continuously poll the browser before throwing an assertion error.' },
      ],
      examples: [
        {
          title: 'Configuring Timeout Overrides Safely',
          description: 'Overriding timeout for an individual assertion without affecting the entire suite.',
          codeSnippet: `// Increase assertion timeout specifically for a slow asynchronous report generator:
await expect(page.getByRole('status')).toHaveText('Export Ready', { timeout: 15000 });`,
        },
      ],
      exercise: {
        id: 'checkpoint-timeouts-1',
        title: 'Identifying Timeout Types',
        prompt: 'If await expect(page.getByRole("alert")).toBeVisible() fails after 5 seconds while the test itself has a 30-second limit, which timeout triggered the failure?',
        options: [
          'Assertion Timeout (default 5,000ms)',
          'Test Timeout (default 30,000ms)',
          'Navigation Timeout',
          'Operating System Socket Timeout',
        ],
        correctAnswerIndex: 0,
        explanation:
          'expect(locator) uses the Assertion Timeout, which defaults to 5,000ms (5s). It fails independently of the overarching 30s test timeout.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 3: Avoiding Flaky Tests
    // -----------------------------------------------------------------------
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Avoiding Flaky Tests',
      durationMinutes: 30,
      explanation: `A **flaky test** is a test that fails intermittently without any changes to the underlying application code. Flaky tests erode team confidence in CI/CD and delay deployments.

### Top 5 Causes of Flaky Tests & How to Fix Them

#### 1. Using Arbitrary Sleep Delays (The #1 Culprit)
- **❌ Bad:** \`await page.waitForTimeout(4000);\`
  - Why it fails: On a fast developer machine, 4 seconds is wasted. In a busy CI runner with heavy CPU load, the action takes 4.1 seconds and the test fails!
- **✅ Fixed:** Use web-first assertions or explicit response waiting:
  \`await expect(page.getByRole('table')).toBeVisible();\`

#### 2. Fragile CSS / Positional Selectors
- **❌ Bad:** \`page.locator('div > div:nth-child(2) > button')\`
  - Breaks whenever an element moves or a banner is injected.
- **✅ Fixed:** Use semantic user-facing locators:
  \`page.getByRole('button', { name: 'Delete Item' })\`

#### 3. Ambiguous Locators (Strictness Violations)
- **❌ Bad:** \`page.getByRole('button')\` matches 5 buttons on the page.
- **✅ Fixed:** Scope by container or filter by text:
  \`page.getByRole('dialog').getByRole('button', { name: 'Confirm' })\`

#### 4. Shared Test State & Execution Order
- **❌ Bad:** Test 1 logs in and updates user email; Test 2 assumes email is already updated.
- **✅ Fixed:** Ensure every test starts with clean, isolated state or uses unique test fixtures.

#### 5. Race Conditions in UI Animations & Asynchronous Data
- **❌ Bad:** Clicking a tab and immediately querying a child element before the tab content finishes fetching.
- **✅ Fixed:** Assert the tab panel is active before interacting:
  \`await expect(page.getByRole('tabpanel', { name: 'Billing' })).toBeVisible();\``,
      keyTakeaways: [
        'Never use page.waitForTimeout() in production tests—it is the leading source of flakiness.',
        'Eliminate shared mutable state between tests to guarantee reliability in parallel runs.',
        'Use semantic, scoped locators to prevent strict mode violations and structural fragility.',
        'Always verify container readiness before querying child elements.',
      ],
      terminology: [
        { term: 'Flaky Test', definition: 'A test that yields both passing and failing results across multiple runs with identical code.' },
        { term: 'Race Condition', definition: 'An uncoordinated timing dependency where the test and browser race to complete asynchronous operations.' },
      ],
      examples: [
        {
          title: 'Refactoring a Flaky Script',
          description: 'A before-and-after demonstration of removing arbitrary sleeps in favor of smart waiting.',
          codeSnippet: `// ❌ Flaky implementation with arbitrary sleeps:
await page.getByPlaceholder('Search').fill('playwright');
await page.keyboard.press('Enter');
await page.waitForTimeout(3000); // Hope the search results arrive in 3s
expect(await page.locator('.result-item').count()).toBeGreaterThan(0);

// ✅ Robust implementation with web-first assertions:
await page.getByPlaceholder('Search').fill('playwright');
await page.keyboard.press('Enter');
const resultsList = page.getByRole('list', { name: 'Search Results' });
await expect(resultsList).toBeVisible();
await expect(resultsList.getByRole('listitem')).not.toHaveCount(0);`,
        },
      ],
      exercise: {
        id: 'checkpoint-flakiness-1',
        title: 'Root Cause of Flaky Tests',
        prompt: 'Why is page.waitForTimeout(3000) strongly discouraged in production test automation suites?',
        options: [
          'Because it introduces arbitrary delays that either waste time on fast machines or fail on slower CI runners under CPU pressure',
          'Because JavaScript does not support numbers greater than 1000 in timeout functions',
          'Because Playwright disables network logging during waitForTimeout calls',
          'Because it forces tests to run in headed mode only',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Fixed sleeps are brittle: they make test suites unnecessarily slow when tasks finish quickly, and fail unpredictably when network or CI delays exceed the arbitrary sleep window.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 4: Waiting Strategies
    // -----------------------------------------------------------------------
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Waiting Strategies',
      durationMinutes: 30,
      explanation: `When web-first assertions alone are not sufficient, Playwright provides specialized, precise waiting APIs.

### 1. Waiting for URL Navigation (\`page.waitForURL\`)
When an action triggers a multi-page redirect or Single Page App route transition:
\`\`\`javascript
await page.getByRole('button', { name: 'Sign In' }).click();

// Waits until URL matches the pattern:
await page.waitForURL('**/dashboard');
// Or using web-first assertion:
await expect(page).toHaveURL(/.*dashboard/);
\`\`\`

### 2. Waiting for API Responses (\`page.waitForResponse\`)
When you submit a form and need to ensure the backend API has completed processing before asserting UI changes:
\`\`\`javascript
// Register the promise BEFORE triggering the action:
const responsePromise = page.waitForResponse(
  (resp) => resp.url().includes('/api/v1/orders') && resp.status() === 201
);

await page.getByRole('button', { name: 'Place Order' }).click();

// Await the response object:
const response = await responsePromise;
const data = await response.json();
expect(data.orderId).toBeDefined();
\`\`\`

### 3. Page Load States (\`page.waitForLoadState\`)
Playwright defines three load states:
- \`'load'\`: The \`window.onload\` event has fired.
- \`'domcontentloaded'\`: The initial HTML document has been parsed.
- \`'networkidle'\`: There are no network connections for at least 500ms.

#### Why 'networkidle' is NOT a Universal Solution!
Many engineers mistakenly add \`await page.waitForLoadState('networkidle')\` everywhere.
- In modern applications with WebSocket streams, analytics tracking, long polling, or background metrics, the network is **never idle**!
- Using \`networkidle\` on these apps causes tests to hang until they time out.
- **Rule:** Only use \`networkidle\` on static pages or when you know no background requests exist. Favor web-first UI assertions!`,
      keyTakeaways: [
        'Always register page.waitForResponse() listeners BEFORE triggering the user action to avoid missing the event.',
        'Use page.waitForURL() or expect(page).toHaveURL() to synchronize with route transitions.',
        'Avoid networkidle on modern SPAs with analytics, polling, or WebSockets.',
        'Target explicit visual elements (cards, alerts, tables) instead of relying on generic document load states.',
      ],
      terminology: [
        { term: 'page.waitForResponse()', definition: 'Playwright method that waits for a network response matching a URL predicate or regex.' },
        { term: 'networkidle', definition: 'A load state condition met when zero network requests occur for 500 consecutive milliseconds.' },
      ],
      examples: [
        {
          title: 'Synchronizing with Network Response',
          description: 'A robust pattern for waiting for a critical API response during test execution.',
          codeSnippet: `// 1. Setup response listener
const savePromise = page.waitForResponse(response =>
  response.url().includes('/api/settings') && response.status() === 200
);

// 2. Trigger action
await page.getByRole('button', { name: 'Save Changes' }).click();

// 3. Await network resolution
await savePromise;

// 4. Assert UI feedback
await expect(page.getByRole('alert')).toHaveText('Settings successfully updated');`,
        },
      ],
      exercise: {
        id: 'checkpoint-strategies-1',
        title: 'Proper Usage of waitForResponse',
        prompt: 'Why must page.waitForResponse() be declared BEFORE clicking the button that triggers the API call?',
        options: [
          'To avoid a race condition where the fast network response arrives before the listener is registered, causing the test to wait forever',
          'Because JavaScript requires all promises to be declared at the top of the file',
          'Because Playwright disables the network tab after any button click',
          'It does not matter; either order produces the exact same result',
        ],
        correctAnswerIndex: 0,
        explanation:
          'If the response arrives before the listener is created, waitForResponse will miss the event and wait until timeout. Declaring the promise first eliminates the race condition.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 5: Debugging Failures & Diagnostics
    // -----------------------------------------------------------------------
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Topic 5: Debugging Failures & Diagnostics',
      durationMinutes: 25,
      explanation: `When a test fails in Playwright, you are never left guessing. The platform provides world-class diagnostic tools.

### 1. Reading Error Messages and Action Logs

Playwright error logs are exceptionally descriptive:
\`\`\`text
Error: locator.click: Target closed
=========================== logs ===========================
waiting for getByRole('button', { name: 'Submit' })
  locator resolved to <button disabled id="submit-btn">Submit</button>
  attempting click action
    waiting for element to be visible, enabled and stable
    element is not enabled - waiting...
============================================================
\`\`\`
Notice how the log explicitly tells you:
- What locator was evaluated
- What HTML node it resolved to
- Exactly which actionability check failed (\`element is not enabled\`)

### 2. Playwright Inspector (\`--debug\`)
Run any test with the Inspector UI:
\`\`\`bash
npx playwright test tests/login.spec.js --debug
\`\`\`
- Stepping toolbar allows executing tests line by line.
- Highlights target locators on the live browser canvas.
- Includes the **Console** and **Explore** locator picker.

### 3. Playwright Trace Viewer (The Ultimate Diagnostic Tool)
The Trace Viewer records everything during test execution:
- DOM snapshots before and after every single action.
- Action timeline with execution durations.
- Network requests and responses with status codes and payloads.
- Console logs and source code lines.

View a saved trace archive:
\`\`\`bash
npx playwright show-trace test-results/trace.zip
\`\`\`

### 4. Retries vs Root Causes
Playwright supports automatic retries in CI:
\`\`\`javascript
// playwright.config.js
module.exports = {
  retries: process.env.CI ? 2 : 0,
};
\`\`\`
**Crucial Warning:** Retries can help you identify which tests are flaky (e.g. "Passed on 2nd attempt"), but **retries do not fix the bug**. Every flaky test must be investigated, root-caused, and refactored with web-first synchronization.`,
      keyTakeaways: [
        'Read the Actionability Check logs in Playwright error traces to immediately spot why an action timed out.',
        'Use npx playwright test --debug to step through execution interactively.',
        'Use the Trace Viewer (show-trace) to inspect full DOM snapshots, network traffic, and console logs post-mortem.',
        'Retries flag flaky tests for remediation—they do not replace proper synchronization.',
      ],
      terminology: [
        { term: 'Playwright Inspector', definition: 'A graphical debugging tool allowing developers to step through tests, inspect locators, and view action logs in real time.' },
        { term: 'Trace Viewer', definition: 'A GUI tool for exploring recorded Playwright traces with DOM snapshots, timeline scrubbers, and network waterfall diagrams.' },
      ],
      examples: [
        {
          title: 'Configuring Traces for Failed Tests in CI',
          description: 'Recording trace files only on test failures to save disk space and CI execution overhead.',
          codeSnippet: `// playwright.config.js
module.exports = {
  use: {
    // Record traces on first retry so you have full diagnostics for failures
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};`,
        },
      ],
      exercise: {
        id: 'checkpoint-debugging-1',
        title: 'Diagnosing Actionability Errors',
        prompt: 'If Playwright\'s log says "waiting for element to be visible, enabled and stable - element is not enabled", what is the immediate root cause?',
        options: [
          'The target element currently possesses the disabled attribute or is aria-disabled',
          'The Chromium browser engine ran out of memory',
          'The test script has a syntax error on line 1',
          'Playwright cannot connect to the internet',
        ],
        correctAnswerIndex: 0,
        explanation:
          'The action log explicitly states that the element failed the "enabled" check, meaning the HTML element is disabled and cannot receive clicks.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 6: Hands-on Lab — Flaky E-Commerce Search & Cart Debugging Lab
    // -----------------------------------------------------------------------
    {
      id: 'topic-6',
      topicNumber: 6,
      title: 'Topic 6: Hands-on Lab — Flaky Test Refactoring Lab',
      durationMinutes: 35,
      explanation: `In this hands-on lab, you will diagnose and refactor an unreliable, flaky test suite for an e-commerce search and checkout cart.

### The Problematic Test Suite

Here is the existing, broken test file written by an engineer who used anti-patterns:

\`\`\`javascript
// ❌ UNRELIABLE TEST SUITE WITH 5 FLAKINESS DEFECTS:
test('user searches for headphones and adds to cart', async ({ page }) => {
  await page.goto('/shop');

  // Defect 1: Fragile positional CSS selector
  await page.locator('div > div:nth-child(2) > input').fill('wireless headphones');

  // Defect 2: Arbitrary sleep delay instead of waiting for results
  await page.keyboard.press('Enter');
  await page.waitForTimeout(4000);

  // Defect 3: Clicking before element is ready & one-time count assertion
  const count = await page.locator('.product-card').count();
  expect(count > 0).toBe(true);

  // Defect 4: Ambiguous locator that matches multiple "Add to Cart" buttons
  await page.locator('button:has-text("Add to Cart")').click();

  // Defect 5: Failing to verify final cart badge update using web-first assertion
  await page.waitForTimeout(2000);
  expect(await page.locator('#cart-badge').innerText()).toBe('1');
});
\`\`\`

### Lab Assignment Instructions:
Refactor this test into a rock-solid, professional Playwright test:
1. Replace the positional selector with a semantic locator (\`getByPlaceholder('Search products...')\` or \`getByRole('searchbox')\`).
2. Eliminate all \`page.waitForTimeout()\` calls completely.
3. Use web-first assertions (\`toBeVisible()\`, \`toHaveCount()\`, \`toHaveText()\`).
4. Disambiguate the "Add to Cart" button by filtering to the specific product card.
5. Assert the updated cart counter badge using \`await expect(cartBadge).toHaveText('1')\`.`,
      keyTakeaways: [
        'Identify and eliminate arbitrary sleep delays.',
        'Use semantic locators that survive DOM restyling.',
        'Disambiguate multiple element matches using locator filtering.',
        'Replace one-time static assertions with web-first auto-retrying assertions.',
      ],
      terminology: [
        { term: 'Flakiness Refactoring', definition: 'The process of removing arbitrary delays and brittle selectors to convert intermittent tests into deterministic baselines.' },
      ],
      examples: [
        {
          title: 'Refactored Solution Preview',
          description: 'A glimpse of the reliable, refactored implementation.',
          codeSnippet: `test('user searches for headphones and adds to cart', async ({ page }) => {
  await page.goto('/shop');

  // 1. Semantic search
  const searchInput = page.getByPlaceholder('Search products...');
  await searchInput.fill('wireless headphones');
  await searchInput.press('Enter');

  // 2. Web-first assertion on results list
  const resultsContainer = page.getByRole('region', { name: 'Search Results' });
  await expect(resultsContainer).toBeVisible();

  // 3. Target specific product card and add to cart
  const targetProduct = resultsContainer
    .getByRole('article')
    .filter({ hasText: 'Sony WH-1000XM5' });
  await expect(targetProduct).toBeVisible();
  await targetProduct.getByRole('button', { name: 'Add to Cart' }).click();

  // 4. Web-first assertion on cart badge
  const cartBadge = page.getByTestId('cart-count-badge');
  await expect(cartBadge).toHaveText('1');
});`,
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      id: 'day6-iq-1',
      questionNumber: 1,
      difficulty: 'Intermediate',
      question: 'What are Playwright actionability checks, and which checks are performed before locator.click() executes?',
      assessmentFocus: 'Core architecture and automated synchronization mechanisms.',
      modelAnswer:
        'Actionability checks are pre-interaction validations Playwright automatically performs on target elements before executing actions. For locator.click(), Playwright confirms that the element is: 1) Attached to the DOM, 2) Visible with non-zero dimensions, 3) Stable (not moving or transitioning), 4) Receives Events (not obscured by overlays or modals), and 5) Enabled (not disabled). If any check fails, Playwright retries continuously until the check passes or the action timeout expires.',
      followUpQuestion: 'How does this differ from the checks performed before locator.fill()?',
    },
    {
      id: 'day6-iq-2',
      questionNumber: 2,
      difficulty: 'Intermediate',
      question: 'Explain the difference between Assertion Timeout, Action Timeout, and Test Timeout in Playwright.',
      assessmentFocus: 'Timeout tiers and configuration best practices.',
      modelAnswer:
        'Test Timeout (default 30s) is the total maximum runtime allowed for the entire test function and its before/after hooks. Assertion Timeout (default 5s) is the window within which expect(locator) assertions continuously poll the browser for the expected condition. Action Timeout governs the maximum duration individual actions like click() or fill() will wait for actionability checks. These can be customized globally in playwright.config.js or per test.',
      followUpQuestion: 'What is the danger of setting a very large Test Timeout (e.g. 180 seconds)?',
    },
    {
      id: 'day6-iq-3',
      questionNumber: 3,
      difficulty: 'Intermediate',
      question: 'Why is page.waitForLoadState("networkidle") discouraged for modern web applications with WebSockets or analytics?',
      assessmentFocus: 'Modern SPA architecture and synchronization strategies.',
      modelAnswer:
        'networkidle considers a page loaded only when zero network connections are active for at least 500ms. In modern web applications utilizing WebSockets, periodic polling, streaming APIs, or background telemetry, there are virtually never 500ms of complete network silence. Using networkidle on such applications causes tests to hang until they reach timeout. The recommended alternative is to wait for specific UI elements or targeted API responses instead.',
      followUpQuestion: 'When IS networkidle acceptable to use?',
    },
    {
      id: 'day6-iq-4',
      questionNumber: 4,
      difficulty: 'Scenario-Based',
      question: 'A test is intermittently failing in CI with "element is not receiving pointer events". How would you diagnose and fix this flakiness?',
      assessmentFocus: 'Debugging race conditions and modal/backdrop overlays.',
      modelAnswer:
        'This error indicates that when Playwright attempted to click the element, another DOM node (like a fade-in modal backdrop, loading spinner, or sticky cookie banner) was sitting on top of it at the click coordinates. To fix this, inspect the application to identify the overlay element and add an explicit web-first assertion ensuring the overlay has disappeared before clicking: await expect(page.getByTestId("loading-overlay")).not.toBeVisible();. Alternatively, open the trace in Trace Viewer to inspect the visual snapshot at the moment of failure.',
      followUpQuestion: 'How can you capture Trace Viewer files only for failed tests in CI?',
    },
    {
      id: 'day6-iq-5',
      questionNumber: 5,
      difficulty: 'Intermediate',
      question: 'How do Playwright retries work, and why should retries never be considered a substitute for fixing flaky tests?',
      assessmentFocus: 'Test stability, CI/CD quality engineering, and technical debt.',
      modelAnswer:
        'In playwright.config.js, retries: 2 will automatically re-run any failed test up to 2 times. If it passes on a retry, Playwright flags it as "flaky". While retries prevent broken builds from blocking urgent deployments, they do not resolve the underlying flaw (race conditions, bad selectors, or server timing issues). Allowing flaky tests to persist bloats CI execution duration, masks real bugs, and breeds distrust in the automation suite.',
      followUpQuestion: 'How does Playwright report flaky tests in HTML reports and CI summaries?',
    },
  ],

  quizQuestions: [
    {
      id: 'day6-q1',
      questionNumber: 1,
      question: 'Which actionability check ensures an element is not currently covered by a sticky cookie banner or loading overlay?',
      options: ['Receives Events', 'Stable', 'Attached', 'Editable'],
      correctAnswerIndex: 0,
      explanation:
        'The "Receives Events" check verifies that the target element is the topmost hit-test node at the interaction coordinates, ensuring events are not intercepted by overlays.',
    },
    {
      id: 'day6-q2',
      questionNumber: 2,
      question: 'What is the default Assertion Timeout in Playwright for web-first assertions?',
      options: ['5,000 milliseconds (5 seconds)', '30,000 milliseconds (30 seconds)', '10,000 milliseconds (10 seconds)', '1,000 milliseconds (1 second)'],
      correctAnswerIndex: 0,
      explanation:
        'Playwright web-first assertions (expect(locator)) default to a 5,000ms (5s) timeout, polling repeatedly during this window.',
    },
    {
      id: 'day6-q3',
      questionNumber: 3,
      question: 'Why does page.waitForLoadState("networkidle") frequently cause tests to time out on modern applications?',
      options: [
        'Because background analytics, WebSockets, or polling requests prevent the required 500ms of zero-network silence',
        'Because Chromium blocks all network requests when networkidle is called',
        'Because networkidle is deprecated in all Playwright versions',
        'Because networkidle only works with HTTP/1.0 protocols',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Modern SPAs continuously stream analytics, WebSockets, or polling queries, meaning 500ms of zero network traffic is rarely achieved.',
    },
    {
      id: 'day6-q4',
      questionNumber: 4,
      question: 'What command opens the interactive Playwright Inspector for step-by-step test execution?',
      options: ['npx playwright test --debug', 'npx playwright test --inspect', 'npx playwright step', 'npx playwright devtools'],
      correctAnswerIndex: 0,
      explanation:
        'npx playwright test --debug opens the Playwright Inspector, launching headed browsers and pausing execution for manual stepping.',
    },
    {
      id: 'day6-q5',
      questionNumber: 5,
      question: 'Which tool allows you to examine DOM snapshots, action logs, network traffic, and console messages recorded during a test run?',
      options: ['Playwright Trace Viewer', 'Chrome Task Manager', 'Selenium Grid Hub', 'Postman Runner'],
      correctAnswerIndex: 0,
      explanation:
        'The Playwright Trace Viewer provides a full post-mortem UI with DOM snapshots before and after every action, network waterfalls, and console logs.',
    },
    {
      id: 'day6-q6',
      questionNumber: 6,
      question: 'What is the proper method to synchronize with an asynchronous REST API response triggered by a button click?',
      options: [
        'Declare const p = page.waitForResponse(...) BEFORE clicking the button, then await p after clicking',
        'Call await page.waitForTimeout(5000) after clicking the button',
        'Call page.waitForResponse() after the button click without assigning a variable',
        'Network responses cannot be synchronized in Playwright',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Declaring the response listener promise before clicking avoids race conditions where fast responses complete before the listener is registered.',
    },
    {
      id: 'day6-q7',
      questionNumber: 7,
      question: 'How should an automation engineer view a recorded trace file (trace.zip)?',
      options: ['npx playwright show-trace path/to/trace.zip', 'Unzip and open in Microsoft Word', 'npx playwright view-log trace.zip', 'Import into Postman'],
      correctAnswerIndex: 0,
      explanation:
        'npx playwright show-trace path/to/trace.zip launches the Trace Viewer browser application to inspect the recorded session.',
    },
    {
      id: 'day6-q8',
      questionNumber: 8,
      question: 'What does Playwright do when a locator.click() targets a button that is currently animating into view with a CSS slide-in transition?',
      options: [
        'It waits for the animation to finish because of the "Stable" actionability check',
        'It throws an instant ElementClickInterceptedException',
        'It immediately clicks at the 0,0 coordinates',
        'It cancels the CSS animation automatically',
      ],
      correctAnswerIndex: 0,
      explanation:
        'The "Stable" check verifies that an element has stopped moving across consecutive animation frames before computing click coordinates.',
    },
    {
      id: 'day6-q9',
      questionNumber: 9,
      question: 'If a test is passing locally on your high-end laptop but failing intermittently on a 2-core CI runner, what is the most likely root cause?',
      options: [
        'The test relies on arbitrary fixed sleep timers (waitForTimeout) or non-web-first assertions that break under slower CPU execution',
        'Playwright does not support Linux operating systems',
        'Node.js cannot run on 2-core processors',
        'Chromium is disabled in CI environments',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Fixed sleep delays and one-time property reads break when CI servers take slightly longer to render or process requests than fast developer workstations.',
    },
    {
      id: 'day6-q10',
      questionNumber: 10,
      question: 'What is the recommended attitude toward test retries in a high-performing QA automation engineering culture?',
      options: [
        'Retries alert the team to flaky tests that must be root-caused and fixed; they are not a permanent solution for poor synchronization',
        'Retries should be set to 10 to ensure every test passes regardless of bugs',
        'Retries should only be enabled on production databases',
        'Retries are a replacement for writing assertions',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Retries keep CI pipelines green while surfacing flaky tests for immediate investigation and refactoring. Flaky tests left unaddressed accumulate technical debt.',
    },
  ],
};

// -----------------------------------------------------------------------------
// STARTER CODE & EVALUATION RUBRIC FOR DAY 6 PRACTICAL ASSIGNMENT
// -----------------------------------------------------------------------------

export const PLAYWRIGHT_DAY_6_STARTER_CODE = `// tests/shopping_cart_flaky_refactor.spec.js
// DAY 6 ASSIGNMENT: Auto-Waiting, Timeouts and Flaky-Test Prevention
// Refactor this unreliable test suite by eliminating arbitrary sleeps,
// replacing brittle selectors, and applying web-first synchronization.

const { test, expect } = require('@playwright/test');

test.describe('E-Commerce Search & Cart Suite (Refactored)', () => {

  test('TC-1: should reliably search for products without arbitrary sleep timers', async ({ page }) => {
    // 1. Navigate to store catalog
    await page.goto('/shop');

    // 2. Use semantic search input locator instead of positional CSS
    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('noise cancelling headphones');
    await searchInput.press('Enter');

    // 3. Web-first assertion: wait for search results container to be visible
    const resultsContainer = page.getByRole('region', { name: 'Search Results' });
    await expect(resultsContainer).toBeVisible();

    // 4. Assert non-empty search results dynamically without hardcoded delays
    const resultItems = resultsContainer.getByRole('article');
    await expect(resultItems).not.toHaveCount(0);
  });

  test('TC-2: should add specific product to cart using locator filtering', async ({ page }) => {
    await page.goto('/shop');

    const searchInput = page.getByPlaceholder('Search products...');
    await searchInput.fill('headphones');
    await searchInput.press('Enter');

    // Filter to the exact product card to avoid strictness violations
    const targetProduct = page
      .getByRole('article')
      .filter({ hasText: 'Sony WH-1000XM5' });

    await expect(targetProduct).toBeVisible();

    // Click Add to Cart inside the targeted product card
    const addToCartBtn = targetProduct.getByRole('button', { name: 'Add to Cart' });
    await expect(addToCartBtn).toBeEnabled();
    await addToCartBtn.click();

    // Verify cart count badge updates to 1 with web-first assertion
    const cartBadge = page.getByTestId('cart-count-badge');
    await expect(cartBadge).toHaveText('1');
  });

  test('TC-3: should synchronize with checkout API response before asserting order summary', async ({ page }) => {
    await page.goto('/cart');

    // Setup response listener BEFORE triggering checkout submission
    const checkoutPromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/checkout') && resp.status() === 200
    );

    // Proceed to checkout
    await page.getByRole('button', { name: 'Proceed to Checkout' }).click();

    // Await network response resolution
    await checkoutPromise;

    // Verify order review modal appears
    await expect(page.getByRole('dialog', { name: 'Order Summary' })).toBeVisible();
  });

  test('TC-4: should handle asynchronous coupon code validation and banner display', async ({ page }) => {
    await page.goto('/cart');

    const couponInput = page.getByPlaceholder('Discount Code');
    await couponInput.fill('ROOTACCESS20');

    // Apply coupon
    await page.getByRole('button', { name: 'Apply' }).click();

    // Web-first assertion auto-retries while server validates coupon
    const successBanner = page.getByRole('alert');
    await expect(successBanner).toBeVisible();
    await expect(successBanner).toContainText('20% Discount Applied');
  });

  test('TC-5: should navigate to order confirmation and verify URL transition', async ({ page }) => {
    await page.goto('/cart');

    // Complete order
    await page.getByRole('button', { name: 'Place Order' }).click();

    // Synchronize route navigation with waitForURL / toHaveURL
    await expect(page).toHaveURL(/.*order-confirmation/);
    await expect(page.getByRole('heading', { name: 'Thank You for Your Order!' })).toBeVisible();
  });

});
`;

export const PLAYWRIGHT_DAY_6_STARTER_EXPLANATION = `Flakiness Elimination & Refactoring Strategy:
1. Eliminated Fixed Sleep Delays: Removed all instances of page.waitForTimeout(). In their place, leveraged Playwright auto-waiting actionability checks and web-first expect(locator) assertions.
2. Semantic Locators & Filtering: Replaced positional selectors like 'div > div:nth-child(2) > input' with getByPlaceholder() and getByRole(). Used locator.filter({ hasText: ... }) to uniquely identify buttons within repeating product cards.
3. Network Synchronization: Implemented page.waitForResponse() declared prior to the action to reliably wait for /api/checkout without race conditions.
4. Route Navigation: Used expect(page).toHaveURL(/.*order-confirmation/) to synchronize with client-side SPA routing.
5. Meaningful Test Cases: Covered 5 critical e-commerce flows with independent Arrange-Act-Assert structures.
6. Trace Viewer & Inspector Debugging: Configured trace retention on failure with action snapshots to diagnose intermittent network delays and visual element states.`;

export const PLAYWRIGHT_DAY_6_STARTER_OUTPUT = `Running 5 tests using 3 workers
  ✓ [chromium] › shopping_cart_flaky_refactor.spec.js:8:3 › TC-1: should reliably search for products (580ms)
  ✓ [chromium] › shopping_cart_flaky_refactor.spec.js:23:3 › TC-2: should add specific product to cart (710ms)
  ✓ [chromium] › shopping_cart_flaky_refactor.spec.js:43:3 › TC-3: should synchronize with checkout API response (820ms)
  ✓ [chromium] › shopping_cart_flaky_refactor.spec.js:58:3 › TC-4: should handle asynchronous coupon code validation (490ms)
  ✓ [chromium] › shopping_cart_flaky_refactor.spec.js:71:3 › TC-5: should navigate to order confirmation (640ms)

  5 passed (3.2s)`;

export function evaluateDay6Assignment(
  code: string,
  expectedOutput: string,
  explanation: string
): PlaywrightDay6AssignmentRubric {
  const criteria: PlaywrightDay6AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Eliminates arbitrary sleep timers (no waitForTimeout)
  const eliminatesArbitraryWaits = !/waitForTimeout\s*\(/.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'Zero Arbitrary Sleep Delays (No waitForTimeout)',
    passed: eliminatesArbitraryWaits,
    feedback: eliminatesArbitraryWaits
      ? 'Successfully removed all arbitrary page.waitForTimeout() calls.'
      : 'Remove all page.waitForTimeout() calls; use web-first assertions instead.',
  });
  if (eliminatesArbitraryWaits) score += 1;

  // 2. Uses web-first auto-retrying assertions
  const usesWebFirstAssertions =
    /expect\s*\([^)]+\)\s*\.(toBeVisible|toContainText|toHaveText|toHaveCount|toBeEnabled|toHaveURL)/.test(
      code
    );
  criteria.push({
    id: 'crit-2',
    title: 'Web-First Auto-Retrying Assertions',
    passed: usesWebFirstAssertions,
    feedback: usesWebFirstAssertions
      ? 'Applied auto-retrying web-first assertions (toBeVisible, toHaveText, etc.).'
      : 'Use web-first assertions like await expect(locator).toBeVisible().',
  });
  if (usesWebFirstAssertions) score += 1;

  // 3. Implements waitForURL or toHaveURL for route transitions
  const implementsWaitForURL =
    /waitForURL\s*\(|toHaveURL\s*\(/.test(code);
  criteria.push({
    id: 'crit-3',
    title: 'Route Navigation Synchronization (waitForURL / toHaveURL)',
    passed: implementsWaitForURL,
    feedback: implementsWaitForURL
      ? 'Correctly synchronized with route transitions using toHaveURL or waitForURL.'
      : 'Synchronize route changes with await expect(page).toHaveURL() or page.waitForURL().',
  });
  if (implementsWaitForURL) score += 1;

  // 4. Implements network response waiting (waitForResponse)
  const implementsResponseWaiting =
    /waitForResponse\s*\(/.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Network Synchronization (page.waitForResponse)',
    passed: implementsResponseWaiting,
    feedback: implementsResponseWaiting
      ? 'Implemented page.waitForResponse() to wait for critical backend API calls.'
      : 'Implement page.waitForResponse() before triggering network-bound actions.',
  });
  if (implementsResponseWaiting) score += 1;

  // 5. Replaces brittle selectors with semantic locators and filtering
  const replacesBrittleSelectors =
    (code.includes('getByRole') || code.includes('getByPlaceholder') || code.includes('getByTestId')) &&
    !/div\s*>\s*div:nth-child/.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'Semantic Locators & Disambiguation',
    passed: replacesBrittleSelectors,
    feedback: replacesBrittleSelectors
      ? 'Used accessible user-facing locators and eliminated brittle nth-child selectors.'
      : 'Replace positional CSS selectors with getByRole, getByPlaceholder, or getByTestId.',
  });
  if (replacesBrittleSelectors) score += 1;

  // 6. Configures or explains timeout considerations
  const configuresTimeoutsSensibly =
    explanation.toLowerCase().includes('timeout') ||
    code.includes('timeout') ||
    explanation.toLowerCase().includes('actionability');
  criteria.push({
    id: 'crit-6',
    title: 'Timeout Architecture Awareness',
    passed: configuresTimeoutsSensibly,
    feedback: configuresTimeoutsSensibly
      ? 'Demonstrated understanding of timeout tiers and actionability checks.'
      : 'Explain timeout architecture or actionability checks in your rationale.',
  });
  if (configuresTimeoutsSensibly) score += 1;

  // 7. Avoids shared test state (each test navigates independently)
  const gotoMatches = code.match(/page\.goto\s*\(/g) || [];
  const avoidsSharedTestState = gotoMatches.length >= 3;
  criteria.push({
    id: 'crit-7',
    title: 'Test Independence & Clean State',
    passed: avoidsSharedTestState,
    feedback: avoidsSharedTestState
      ? `Maintains test independence with ${gotoMatches.length} isolated navigation points.`
      : 'Ensure each test initializes its own state independently via page.goto().',
  });
  if (avoidsSharedTestState) score += 1;

  // 8. Demonstrates debugging technique or trace usage explanation
  const demonstratesDebuggingTechnique =
    explanation.toLowerCase().includes('trace') ||
    explanation.toLowerCase().includes('inspector') ||
    explanation.toLowerCase().includes('snapshot');
  criteria.push({
    id: 'crit-8',
    title: 'Debugging Tools Knowledge (Trace Viewer / Inspector)',
    passed: demonstratesDebuggingTechnique,
    feedback: demonstratesDebuggingTechnique
      ? 'Documented diagnostic approaches using Trace Viewer or Inspector.'
      : 'Explain how you would use Trace Viewer or Inspector to diagnose intermittent issues.',
  });
  if (demonstratesDebuggingTechnique) score += 1;

  // 9. Explains root cause of flakiness clearly
  const explainsFlakinessRootCause =
    explanation.toLowerCase().includes('flak') ||
    explanation.toLowerCase().includes('race condition') ||
    explanation.toLowerCase().includes('synchroniz');
  criteria.push({
    id: 'crit-9',
    title: 'Flakiness Root Cause Analysis',
    passed: explainsFlakinessRootCause,
    feedback: explainsFlakinessRootCause
      ? 'Clearly explained root causes of flakiness and synchronization solutions.'
      : 'Provide a clear explanation of what causes flakiness and how to prevent it.',
  });
  if (explainsFlakinessRootCause) score += 1;

  // 10. Syntactically valid JavaScript & Playwright runner structure
  const syntacticallyValidJavaScript =
    /const\s*\{\s*test\s*,\s*expect\s*\}\s*=\s*require\('@playwright\/test'\)/.test(code) &&
    /test(\.describe)?\s*\(/.test(code) &&
    expectedOutput.length > 20;
  criteria.push({
    id: 'crit-10',
    title: 'Valid Playwright Runner Syntax & Clean Execution',
    passed: syntacticallyValidJavaScript,
    feedback: syntacticallyValidJavaScript
      ? 'Code imports @playwright/test properly and terminal output verifies 5 passing tests.'
      : 'Ensure code imports test and expect from @playwright/test and provides valid runner output.',
  });
  if (syntacticallyValidJavaScript) score += 1;

  const passed = score >= 8;
  const feedback = criteria.map((c) => `${c.passed ? '✓' : '✗'} ${c.title}: ${c.feedback}`);

  return {
    eliminatesArbitraryWaits,
    usesWebFirstAssertions,
    implementsWaitForURL,
    implementsResponseWaiting,
    replacesBrittleSelectors,
    configuresTimeoutsSensibly,
    avoidsSharedTestState,
    demonstratesDebuggingTechnique,
    explainsFlakinessRootCause,
    syntacticallyValidJavaScript,
    score,
    feedback,
    passed,
    criteria,
  };
}
