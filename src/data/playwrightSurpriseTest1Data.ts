import type { PlaywrightSurpriseAssessmentQuestion } from '../types/playwrightCourse';

export const PLAYWRIGHT_SURPRISE_TEST_1_METADATA = {
  id: 'playwright-surprise-test-1',
  title: 'Mid-Track Assessment: Locators, Actions, Assertions & Auto-Waiting',
  subtitle:
    'A rigorous 10-question gatekeeper assessment covering Days 4 through 6. Score ≥ 80% (8/10) to validate core automation competency and unlock Day 7.',
  passingScorePercent: 80,
  passingPercentage: 80,
  totalQuestions: 10,
  timeLimitMinutes: 20,
  durationMinutes: 20,
  topicsCovered: [
    'Locators & Strict Mode',
    'Actions & Web-First Assertions',
    'Auto-Waiting & Timeouts',
    'Flaky Test Remediation',
  ],
};

export const PLAYWRIGHT_SURPRISE_TEST_1_QUESTIONS: PlaywrightSurpriseAssessmentQuestion[] = [
  {
    id: 'st1-q1',
    questionNumber: 1,
    topicTag: 'Locators',
    scenario: 'Element Identification & Semantic Locators',
    question:
      'Consider the following markup for an account dashboard navigation bar:\n\n<nav>\n  <button class="btn btn-primary" data-testid="settings-nav-btn">\n    <span>Account Settings</span>\n  </button>\n</nav>\n\nAccording to Playwright user-facing locator priorities, which locator is the most resilient and recommended?',
    codeSnippet: `// Option A: page.locator('nav > button > span')
// Option B: page.getByRole('button', { name: 'Account Settings' })
// Option C: page.locator('//button[@class="btn btn-primary"]')
// Option D: page.locator('.btn-primary')`,
    options: [
      'page.getByRole("button", { name: "Account Settings" })',
      'page.locator("nav > button > span")',
      'page.locator("//button[@class=\'btn btn-primary\']")',
      'page.locator(".btn-primary")',
    ],
    correctAnswerIndex: 0,
    explanation:
      'page.getByRole("button", { name: "Account Settings" }) is the gold standard user-facing locator. It reflects how real human users and assistive screen readers perceive the interface, and remains resilient if CSS classes or internal HTML spans are refactored.',
  },
  {
    id: 'st1-q2',
    questionNumber: 2,
    topicTag: 'Locators',
    scenario: 'Strict Mode Disambiguation',
    question:
      'Your page renders a table of team members where each row contains a button with the text "Revoke Access". Calling `await page.getByRole("button", { name: "Revoke Access" }).click();` throws a Strict Mode error: "resolved to 4 elements". What is the correct Playwright pattern to target the button for user "Darth Vader"?',
    codeSnippet: `// Which approach cleanly scopes the locator to the desired row?`,
    options: [
      'await page.getByRole("row").filter({ hasText: "Darth Vader" }).getByRole("button", { name: "Revoke Access" }).click();',
      'await page.getByRole("button", { name: "Revoke Access" }).first().click();',
      'await page.locator("//tr[3]//button").click();',
      'await page.getByRole("button", { name: "Revoke Access" }).nth(0).click();',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Using locator.filter({ hasText: "Darth Vader" }) scopes the table row locator to the specific entity card/row and then queries the child button within that row, guaranteeing strictness without brittle positional indexing like .first() or .nth(0).',
  },
  {
    id: 'st1-q3',
    questionNumber: 3,
    topicTag: 'Actions & Assertions',
    scenario: 'Web-First vs Static DOM Reads',
    question:
      'An engineer wrote the following test assertion for an asynchronous notification banner:\n\nconst isAlertVisible = await page.getByRole("alert").isVisible();\nexpect(isAlertVisible).toBe(true);\n\nWhy does this test intermittently fail in CI environments?',
    codeSnippet: `// Flaky test line:
const isAlertVisible = await page.getByRole("alert").isVisible();
expect(isAlertVisible).toBe(true);`,
    options: [
      'isVisible() is a one-time snapshot check that does not retry; if the alert takes 100ms to animate in, isVisible() returns false immediately',
      'isVisible() only supports Chromium and fails on Firefox',
      'Playwright requires all assertions to be wrapped in setTimeout',
      'expect().toBe() is deprecated in Playwright Test',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Calling locator.isVisible() evaluates the DOM state at that exact instant without polling. If the banner takes even 50ms to mount or animate, it returns false. The fix is to use web-first: await expect(page.getByRole("alert")).toBeVisible(); which polls up to the assertion timeout.',
  },
  {
    id: 'st1-q4',
    questionNumber: 4,
    topicTag: 'Actions & Assertions',
    scenario: 'Form Input Value Verification',
    question:
      'You are testing an account settings form. You fill the "Display Name" input and want to verify the text inside the input box before saving. Which assertion is correct?',
    codeSnippet: `const nameInput = page.getByLabel('Display Name');
await nameInput.fill('Sarah Connor');
// Which assertion correctly verifies the typed value?`,
    options: [
      'await expect(nameInput).toHaveValue("Sarah Connor");',
      'await expect(nameInput).toHaveText("Sarah Connor");',
      'await expect(nameInput).toContainText("Sarah Connor");',
      'expect(nameInput.innerText).toBe("Sarah Connor");',
    ],
    correctAnswerIndex: 0,
    explanation:
      'HTML <input> elements store their content in the DOM value attribute/property, which is asserted using toHaveValue(). toHaveText() and toContainText() inspect innerText, which is empty on input elements.',
  },
  {
    id: 'st1-q5',
    questionNumber: 5,
    topicTag: 'Auto-Waiting & Flakiness',
    scenario: 'Actionability Check Failures',
    question:
      'A test fails with the error:\n"waiting for getByRole(\'button\', { name: \'Deploy Service\' })\n  element is not enabled - waiting..."\nWhat is the exact reason for this failure?',
    codeSnippet: `// Playwright Log:
waiting for getByRole('button', { name: 'Deploy Service' })
  locator resolved to <button disabled id="deploy-btn">Deploy Service</button>
  element is not enabled - waiting... (timed out after 30000ms)`,
    options: [
      'The button possessed the HTML disabled attribute or aria-disabled="true" for the entire action timeout duration',
      'The button was offscreen and could not be scrolled into view',
      'Playwright failed to locate the Chromium browser binary',
      'The button had no click event listener attached',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Playwright auto-waiting actionability checks require that an element be enabled before clicking. Because the button remained disabled throughout the action timeout window, Playwright aborted the action.',
  },
  {
    id: 'st1-q6',
    questionNumber: 6,
    topicTag: 'Auto-Waiting & Flakiness',
    scenario: 'Arbitrary Sleep Delays Anti-Pattern',
    question:
      'Why is calling `await page.waitForTimeout(3000);` considered a major anti-pattern in production test automation?',
    codeSnippet: `// Anti-pattern:
await page.getByRole('button', { name: 'Filter Orders' }).click();
await page.waitForTimeout(3000); // Wait for orders table
await expect(page.getByRole('table')).toBeVisible();`,
    options: [
      'It creates artificial delays on fast machines while still failing intermittently on slower CI runners whenever latency exceeds 3 seconds',
      'It stops JavaScript event loops and cancels ongoing network fetch requests',
      'Playwright throws a compiler error if waitForTimeout is present in a test file',
      'It causes browsers to reload the initial page',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Fixed sleep delays are both wasteful (adding minutes to suite runtimes) and brittle (failing whenever external services or CI load cause operations to exceed the arbitrary fixed duration). Web-first assertions should be used instead.',
  },
  {
    id: 'st1-q7',
    questionNumber: 7,
    topicTag: 'Actions & Assertions',
    scenario: 'Form Select Dropdown Handling',
    question:
      'Given the following HTML dropdown:\n<select id="currency-select" aria-label="Preferred Currency">\n  <option value="usd">US Dollar ($)</option>\n  <option value="eur">Euro (€)</option>\n  <option value="inr">Indian Rupee (₹)</option>\n</select>\n\nWhich code snippet selects Euro and asserts the selection properly?',
    codeSnippet: `// Select and verify Euro:`,
    options: [
      'const dropdown = page.getByLabel("Preferred Currency");\nawait dropdown.selectOption("eur");\nawait expect(dropdown).toHaveValue("eur");',
      'const dropdown = page.getByLabel("Preferred Currency");\nawait dropdown.click();\nawait page.keyboard.press("ArrowDown");',
      'await page.getByLabel("Preferred Currency").fill("eur");',
      'await page.getByLabel("Preferred Currency").selectOption({ text: "eur" });',
    ],
    correctAnswerIndex: 0,
    explanation:
      'selectOption("eur") selects the option by its value attribute, and await expect(dropdown).toHaveValue("eur") cleanly validates the updated state.',
  },
  {
    id: 'st1-q8',
    questionNumber: 8,
    topicTag: 'Auto-Waiting & Flakiness',
    scenario: 'Asynchronous Network Synchronization',
    question:
      'You are testing a bank transfer form. Clicking "Transfer Funds" sends a POST request to `/api/transfers`. You need to ensure the request finishes before verifying the updated account balance. What is the correct sequence?',
    codeSnippet: `// Which sequence avoids race conditions?`,
    options: [
      'const responsePromise = page.waitForResponse(resp => resp.url().includes("/api/transfers") && resp.status() === 200);\nawait page.getByRole("button", { name: "Transfer Funds" }).click();\nawait responsePromise;\nawait expect(page.getByTestId("balance")).toHaveText("$5,000");',
      'await page.getByRole("button", { name: "Transfer Funds" }).click();\nconst resp = await page.waitForResponse("/api/transfers");\nawait expect(page.getByTestId("balance")).toHaveText("$5,000");',
      'await page.getByRole("button", { name: "Transfer Funds" }).click();\nawait page.waitForTimeout(5000);\nawait expect(page.getByTestId("balance")).toHaveText("$5,000");',
      'await page.waitForLoadState("networkidle");\nawait page.getByRole("button", { name: "Transfer Funds" }).click();',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Creating the responsePromise before executing the click action avoids race conditions where fast API calls return before the listener has been mounted.',
  },
  {
    id: 'st1-q9',
    questionNumber: 9,
    topicTag: 'Auto-Waiting & Flakiness',
    scenario: 'Debugging Diagnostic Tools',
    question:
      'A test fails in CI only. You have configured `trace: "on-first-retry"` in `playwright.config.js`. Which CLI command allows you to open and inspect the resulting trace zip file with full DOM snapshots and network waterfalls?',
    codeSnippet: `// CLI command:`,
    options: [
      'npx playwright show-trace test-results/trace.zip',
      'npx playwright view-trace trace.zip',
      'npx playwright inspect trace.zip',
      'unzip test-results/trace.zip && open index.html',
    ],
    correctAnswerIndex: 0,
    explanation:
      'npx playwright show-trace launches the standalone Playwright Trace Viewer web app, letting you inspect step-by-step visual snapshots, action logs, and network traffic.',
  },
  {
    id: 'st1-q10',
    questionNumber: 10,
    topicTag: 'Actions & Assertions',
    scenario: 'Arrange-Act-Assert Pattern and Test Independence',
    question:
      'Why is it considered bad practice to have Test 2 rely on user login or data created during Test 1?',
    codeSnippet: `// Anti-pattern:\ntest('Test 1: create new customer', ...);\ntest('Test 2: edit the customer created in Test 1', ...);`,
    options: [
      'Because Playwright runs tests in parallel by default, so Test 2 may execute before or concurrently with Test 1, causing unpredictable failures',
      'Because Playwright cleans the hard drive between each test() function',
      'Because variables declared in JavaScript cannot be read by more than one file',
      'Because browsers only support a single click per session',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Playwright runs tests across multiple isolated worker processes in parallel. Shared state between tests violates test independence and causes non-deterministic failures in parallel runs.',
  },
];
