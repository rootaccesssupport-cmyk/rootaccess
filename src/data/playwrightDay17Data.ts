import type {
  PlaywrightDay17Unit,
  PlaywrightDay17AssignmentRubric,
  PlaywrightDayTopic,
  PlaywrightInterviewQuestion,
  PlaywrightQuizQuestion,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_17_TOPICS: PlaywrightDayTopic[] = [
  {
    id: 'topic-1',
    topicNumber: 1,
    title: 'Topic 1: Failure Evidence Collection & AI Prompt Sanitization',
    durationMinutes: 25,
    explanation: `When an automated test fails, inexperienced engineers often copy a generic error message like "Error: Timed out 5000ms waiting for locator" and paste it into an AI assistant, asking "Why did my test fail?"

Without surrounding context, the AI is forced to hallucinate possible causes. To obtain accurate, actionable diagnostics, you must provide structured, relevant failure evidence:
1. The Exact Failure Signature: The error message and full stack trace showing the exact line of failure.
2. Playwright Actionability Log: The internal log of actions Playwright attempted (waiting for element to be visible, enabled, stable).
3. Surrounding Test Code: The 10–15 lines preceding the failure and the assertions that followed.
4. Relevant DOM / Accessibility Snapshot: The actual HTML or ARIA tree at the moment of failure.
5. Network Telemetry: Whether key API calls succeeded (HTTP 200), failed (HTTP 4xx/5xx), or were still pending.

Sanitization: What NEVER Goes Into an AI Prompt:
Prompt engineering in enterprise automation carries severe data leakage risks. You must NEVER include raw authentication tokens (Bearer tokens, JWTs, API keys), customer PII (emails, credit card numbers, phone numbers), or internal infrastructure hostnames into public AI models. Always scrub these artifacts using synthetic placeholders.`,
    keyTakeaways: [
      'Playwright actionability logs provide vital clues (element disabled, covered, navigating).',
      'Never paste unscrubbed production logs, customer emails, or bearer tokens into external AI tools.',
      'A structured failure context enables LLMs to pinpoint timing, locator, or API root causes without guessing.',
    ],
    terminology: [
      {
        term: 'Actionability Log',
        definition: 'Playwright internal diagnostic log recording readiness checks (visible, stable, enabled, receiving pointer events) before an action is dispatched.',
      },
      {
        term: 'Prompt Sanitization',
        definition: 'The security practice of scrubbing sensitive credentials, tokens, and PII from error logs prior to feeding them to LLMs.',
      },
    ],
    examples: [
      {
        title: 'Structured Sanitized AI Prompt Context',
        description: 'Sanitizing tokens and customer PII before sending failure dumps to an AI assistant.',
        codeSnippet: `// Sanitization utility for failure context
function sanitizeFailureLog(rawLog) {
  return rawLog
    .replace(/Bearer\\s+[A-Za-z0-9-_=.]+/gi, 'Bearer <REDACTED_TOKEN>')
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/gi, '<REDACTED_EMAIL>')
    .replace(/\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})\\b/g, '<REDACTED_CC>');
}`,
      },
    ],
    exercise: {
      id: 'ex-1',
      title: 'Actionability Log Identification',
      prompt: 'Which piece of failure information explains that a button was present in the DOM but could not be clicked because a payment processing spinner was covering it?',
      options: [
        'The Node.js stack trace line number',
        'The Playwright actionability call log stating "element intercepts pointer events"',
        'The package.json playwright version string',
        'The Git commit hash of the test repository',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Playwright actionability call logs record exact readiness checks. If an element is intercepted by an overlay/spinner, the action log explicitly reports that another element intercepts pointer events.',
    },
  },
  {
    id: 'topic-2',
    topicNumber: 2,
    title: 'Topic 2: Structured AI Debugging Workflow: Triaging Defect Categories',
    durationMinutes: 25,
    explanation: `When an automated test fails, you must quickly distinguish between three root causes:
1. Application Bug (Product Defect): The test was written correctly according to specifications, but the software behaved unexpectedly or violated acceptance criteria (e.g. backend returns 500 Internal Server Error). Action: File a bug report; do NOT alter the test to accommodate a crash.
2. Test Automation Bug (Script Defect): The application functions as expected, but the automation script is broken (e.g. brittle CSS selector, missing await, uncoordinated async timing). Action: Refactor the test using resilient role locators and auto-waiting.
3. Environmental Issue: The staging server was down, rate-limited, or database seeds were stale. Action: Fix CI provisioning and health checks.

Structure your AI debugging prompts into Context, Failure Signature, and Explicit Ranked Hypotheses.`,
    keyTakeaways: [
      'Never change a test assertion just to make a red test green without verifying if the application is genuinely broken.',
      'Structure AI debugging requests into Context, Logs, and Explicit Ranked Hypotheses.',
      'Missing await on Playwright assertions or locators is a top cause of false passes and silent failures.',
    ],
    terminology: [
      {
        term: 'Product Defect',
        definition: 'A failure where the system under test violates documented business rules or acceptance criteria.',
      },
      {
        term: 'Script Defect',
        definition: 'A failure caused by flawed automation code (e.g. brittle locator, race condition) while the application behaves correctly.',
      },
    ],
    examples: [
      {
        title: 'Fixing Missing Await on Assertion',
        description: 'Adding await to web-first assertion so the test runner waits for element visibility.',
        codeSnippet: `// BUGGY: Missing await on expect
expect(page.getByText('Email Sent!')).toBeVisible();

// FIXED: Web-first assertion with await
await expect(page.getByText('Email Sent!')).toBeVisible({ timeout: 7000 });`,
      },
    ],
    exercise: {
      id: 'ex-2',
      title: 'Defect Classification',
      prompt: 'A Playwright test fails because POST /api/v1/auth/login returned HTTP 500 Internal Server Error during the test run. How should you classify and handle this failure?',
      options: [
        'Classify as an Automation Bug and delete the assertion checking the status code',
        'Classify as an Application Bug (or Staging Backend Bug), report it with API logs, and do NOT weaken the test',
        'Add await page.waitForTimeout(10000) before clicking the login button',
        'Replace expect(response.status()).toBe(200) with expect(response.status()).toBe(500)',
      ],
      correctAnswerIndex: 1,
      explanation:
        'An unexpected HTTP 500 indicates a backend crash or server defect. Modifying the test to accommodate a crash masks a real defect.',
    },
  },
  {
    id: 'topic-3',
    topicNumber: 3,
    title: 'Topic 3: Flaky-Test Analysis & Asynchronous Race Conditions',
    durationMinutes: 30,
    explanation: `A flaky test exhibits both passing and failing states across runs without any code changes. In modern web frameworks (React, Next.js, Vue), flakiness stems from:
1. Client-Side Hydration Lags: Server-rendered HTML is visible in the DOM, so Playwright sees the button as enabled and clicks it before client JavaScript event listeners have attached.
2. Uncoordinated Asynchronous Events: Clicking before state finishes fetching from backend APIs.
3. Animation Transitions: The element moves or fades while click coordinates are calculated.

Use Promise.all([page.waitForResponse(...), element.click()]) to set up network listeners before initiating user actions, eliminating race conditions.`,
    keyTakeaways: [
      'Flakiness is rarely random; it is almost always caused by asynchronous timing gaps or state leakage.',
      'Hydration lags happen when HTML is visible before client JavaScript event listeners are attached.',
      'Use page.waitForResponse() or web-first assertions on resulting state rather than blind sleeps.',
    ],
    terminology: [
      {
        term: 'Hydration Lag',
        definition: 'The time window in SSR web apps between initial HTML rendering and client JavaScript event listener attachment.',
      },
      {
        term: 'Race Condition',
        definition: 'A concurrency defect where system outcome depends on unpredictable order or timing of asynchronous operations.',
      },
    ],
    examples: [
      {
        title: 'Synchronizing Click with API Response',
        description: 'Using Promise.all to register response listener before dispatching click.',
        codeSnippet: `await Promise.all([
  page.waitForResponse(resp => resp.url().includes('/api/cart') && resp.status() === 200),
  page.getByRole('button', { name: 'Add to Cart' }).click()
]);
await expect(page.getByTestId('cart-count')).toHaveText('1');`,
      },
    ],
    exercise: {
      id: 'ex-3',
      title: 'Promise.all vs Sequential Wait',
      prompt: 'Why is await Promise.all([page.waitForResponse(...), page.click(...)]) superior to calling await page.click(...) followed by await page.waitForResponse(...)?',
      options: [
        'It speeds up JavaScript execution by compiling to WebAssembly',
        'It sets up the network response listener BEFORE initiating the click, avoiding race conditions where fast responses arrive before listeners start',
        'It automatically disables all Playwright timeouts',
        'It is required by GitHub Actions runners to pass YAML linting',
      ],
      correctAnswerIndex: 1,
      explanation:
        'If the API response returns quickly, registering waitForResponse AFTER the click may happen too late, causing tests to wait indefinitely and time out.',
    },
  },
  {
    id: 'topic-4',
    topicNumber: 4,
    title: 'Topic 4: Detecting & Rejecting Deceptive AI Fixes',
    durationMinutes: 25,
    explanation: `When asked to "Make this failing test pass", AI assistants frequently resort to deceptive anti-patterns:
1. Arbitrary page.waitForTimeout(): Adding hardcoded 3-5 second sleeps. This wastes time on fast runs and still fails under heavy network latency.
2. Weakened Assertions: Changing toHaveText('Paid $150.00') to page.locator('div').count() > 0, which passes even if the page says "Payment Failed".
3. Empty try...catch Blocks: Swallowing errors silently, creating false passes.
4. Global Retries (retries: 5): Masking race conditions and tripling CI execution times.

Apply the 4-point verification checklist before accepting any AI suggestion: check for arbitrary sleeps, verify assertion strength, confirm error handling, and test against the real DOM.`,
    keyTakeaways: [
      'Reject any AI recommendation that relies on page.waitForTimeout() or weakens assertion criteria.',
      'Empty try...catch blocks create false confidence by hiding legitimate product defects.',
      'A true engineering fix targets the asynchronous root cause (DOM event, hydration, network response).',
    ],
    terminology: [
      {
        term: 'Deceptive Fix',
        definition: 'A code alteration that masks failure symptoms (via sleeps or diluted assertions) without fixing the root cause.',
      },
      {
        term: 'Web-First Assertion',
        definition: 'Playwright assertions (expect(locator).toBeVisible()) that automatically poll and retry until state conditions are met.',
      },
    ],
    examples: [
      {
        title: 'Rejecting Sleep in Favor of Web-First Assertion',
        description: 'Replacing page.waitForTimeout with resilient locator assertion.',
        codeSnippet: `// ❌ DECEPTIVE AI FIX:
await page.waitForTimeout(4000);
expect(await page.locator('.total').count()).toBeGreaterThan(0);

// ✅ ROBUST FIX:
await expect(page.getByTestId('order-total')).toHaveText('$250.00');`,
      },
    ],
    exercise: {
      id: 'ex-4',
      title: 'Evaluating AI Suggestions',
      prompt: 'An AI assistant suggests fixing a flaky test by replacing await expect(page.getByRole("alert")).toHaveText("Account Updated") with await page.waitForTimeout(3000); expect(await page.locator("body").innerText()).toBeTruthy(). What should you do?',
      options: [
        'Accept the fix because it passes 100% of the time in local runs',
        'Reject the fix because it introduces an arbitrary 3s delay and weakens the assertion to checking if any text exists on the entire page',
        'Accept the fix and increase the timeout to 10 seconds for safety',
        'Commit the code and disable trace collection to save disk space',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Checking if body innerText is truthy proves nothing about whether the account was updated. Hardcoded sleeps slow down suites without providing deterministic guarantees.',
    },
  },
];

export const PLAYWRIGHT_DAY_17_STARTER_CODE = `// ============================================================================
// ROOTACCESS PLAYWRIGHT AUTOMATION — DAY 17 PRACTICAL LAB
// AI-Assisted Debugging & Flaky-Test Analysis
// ============================================================================
// Task: Review the 4 buggy/flaky test cases below.
// Each was previously "fixed" by an AI assistant using deceptive anti-patterns
// (arbitrary sleeps, weak assertions, swallowed errors, missing awaits).
//
// Refactor all 4 test scenarios to be deterministic, robust, and clean:
// 1. Scenario 1 (Hydration & Race Condition): Replace sleep with network/state sync.
// 2. Scenario 2 (Deceptive Assertion Weakening): Restore strong business assertion.
// 3. Scenario 3 (Swallowed Error in Try/Catch): Replace empty catch with proper locator handling.
// 4. Scenario 4 (Missing Await & Timing): Correct promise handling on web-first assertions.
// ============================================================================

import { test, expect } from '@playwright/test';

// SCENARIO 1: E-commerce Product Filter
// Defect: The AI previously inserted page.waitForTimeout(4000) to wait for products to reload.
test('Scenario 1: filters catalog products by category deterministically', async ({ page }) => {
  await page.goto('/catalog');

  const filterResponsePromise = page.waitForResponse(
    resp => resp.url().includes('/api/products') && resp.status() === 200
  );
  await page.getByRole('combobox', { name: 'Category' }).selectOption('electronics');
  await filterResponsePromise;

  await expect(page.getByRole('list', { name: 'Product Grid' })).toBeVisible();
  await expect(page.getByTestId('product-item')).toHaveCount(4);
});

// SCENARIO 2: Bank Transfer Confirmation
// Defect: The AI weakened the assertion from checking the transaction ID and amount to page.locator('div').count() > 0
test('Scenario 2: confirms bank wire transfer with rigorous assertions', async ({ page }) => {
  await page.goto('/transfers/new');

  await page.getByLabel('Recipient Account').fill('ACCT-99281-US');
  await page.getByLabel('Amount').fill('250.00');
  await page.getByRole('button', { name: 'Submit Transfer' }).click();

  const confirmationModal = page.getByRole('dialog', { name: 'Transfer Confirmed' });
  await expect(confirmationModal).toBeVisible();
  await expect(confirmationModal.getByTestId('transfer-amount')).toHaveText('$250.00');
  await expect(confirmationModal.getByTestId('transfer-status')).toHaveText('COMPLETED');
});

// SCENARIO 3: Cookie Banner & Modal Dismissal
// Defect: The AI wrapped a critical banner close in an empty try/catch that swallowed page crashes
test('Scenario 3: handles optional consent dialog cleanly without empty catch', async ({ page }) => {
  await page.goto('/dashboard');

  const cookieBanner = page.getByRole('region', { name: 'Cookie Preferences' });
  if (await cookieBanner.isVisible()) {
    await cookieBanner.getByRole('button', { name: 'Accept All' }).click();
    await expect(cookieBanner).toBeHidden();
  }

  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
});

// SCENARIO 4: Asynchronous Notification Toast
// Defect: Missing await on locator and assertion, causing race condition passes/fails
test('Scenario 4: verifies async success toast with proper await and timeout', async ({ page }) => {
  await page.goto('/profile');

  await page.getByLabel('Display Name').fill('Alex Automation');
  await page.getByRole('button', { name: 'Save Changes' }).click();

  const alertToast = page.getByRole('alert');
  await expect(alertToast).toBeVisible({ timeout: 5000 });
  await expect(alertToast).toHaveText('Profile updated successfully');
});
`;

export const PLAYWRIGHT_DAY_17_STARTER_EXPLANATION = `### Day 17 Lab: AI Debugging & Flaky-Test Refactoring Report

#### Root Cause Analysis of 4 Deceptive AI Anti-Patterns:
1. **Scenario 1 (Arbitrary Sleep)**:
   - *AI Mistake*: Inserted await page.waitForTimeout(4000) because the product grid took ~1.5s to re-render.
   - *Engineering Fix*: Synchronized with page.waitForResponse('/api/products') and asserted element count on the resolved product grid. Eliminated 4000ms of dead wait time while guaranteeing resilience across slow CI environments.

2. **Scenario 2 (Weakened Assertion)**:
   - *AI Mistake*: Diluted assertion to expect(await page.locator('div').count()).toBeGreaterThan(0) after an assertion failed due to a typo in the amount formatting.
   - *Engineering Fix*: Restored strict business verification targeting the Transfer Confirmed dialog, validating both amount $250.00 and status COMPLETED.

3. **Scenario 3 (Swallowed Error in Try/Catch)**:
   - *AI Mistake*: Used try { await page.getByRole('button', { name: 'Accept' }).click() } catch(e) {} which masked actual timeout errors and unhandled rejections.
   - *Engineering Fix*: Cleanly inspected await cookieBanner.isVisible() and asserted toBeHidden() upon acceptance.

4. **Scenario 4 (Missing Await)**:
   - *AI Mistake*: Omitted await before expect(alertToast).toBeVisible(), causing the test to complete synchronously before the alert was rendered.
   - *Engineering Fix*: Added await to web-first assertions with explicit timeout bounds.

#### Data Sanitization & Defect Classification:
- **Sensitive Data Scrubbing**: Sanitized all auth tokens, API secrets, passwords, and PII before passing execution traces to AI debugging prompts.
- **Defect Distinction**: Differentiated genuine application bug from test automation script defect and transient CI environment latency.
`;

export const PLAYWRIGHT_DAY_17_STARTER_OUTPUT = `Running 4 tests using 2 workers
[chromium] › day17-debugging.spec.js:19:1 › Scenario 1: filters catalog products by category deterministically
  ✓  [chromium] › Scenario 1: filters catalog products by category deterministically (1.1s)
[chromium] › day17-debugging.spec.js:35:1 › Scenario 2: confirms bank wire transfer with rigorous assertions
  ✓  [chromium] › Scenario 2: confirms bank wire transfer with rigorous assertions (820ms)
[chromium] › day17-debugging.spec.js:49:1 › Scenario 3: handles optional consent dialog cleanly without empty catch
  ✓  [chromium] › Scenario 3: handles optional consent dialog cleanly without empty catch (740ms)
[chromium] › day17-debugging.spec.js:62:1 › Scenario 4: verifies async success toast with proper await and timeout
  ✓  [chromium] › Scenario 4: verifies async success toast with proper await and timeout (650ms)

  4 passed (3.3s)
`;

export function evaluateDay17Assignment(
  code: string,
  output: string,
  explanation: string
): PlaywrightDay17AssignmentRubric {
  const criteria: PlaywrightDay17AssignmentRubric['criteria'] = [];
  const feedback: string[] = [];

  const activeCode = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

  const gathersSystematicFailureEvidence =
    /waitForResponse|actionability|trace|evidence|failure context/i.test(code + explanation);
  criteria.push({
    id: 'c1',
    title: 'Gathers Systematic Failure Evidence',
    passed: gathersSystematicFailureEvidence,
    feedback: gathersSystematicFailureEvidence
      ? 'Appropriate failure evidence and actionability synchronization applied.'
      : 'Include clear failure context and event synchronization.',
  });

  const sanitizesSensitiveDataForAi =
    /sanitiz|redact|token|secret|pii|password|dummy/i.test(code + explanation);
  criteria.push({
    id: 'c2',
    title: 'Sanitizes Sensitive Data for AI Workflows',
    passed: sanitizesSensitiveDataForAi,
    feedback: sanitizesSensitiveDataForAi
      ? 'Documented or demonstrated sanitization of sensitive data.'
      : 'Detail how sensitive tokens, passwords, and PII are scrubbed prior to AI analysis.',
  });

  const evaluatesRankedAiHypotheses =
    /hypothesis|root cause|ranked|scenario 1|scenario 2/i.test(explanation);
  criteria.push({
    id: 'c3',
    title: 'Evaluates Ranked AI Hypotheses',
    passed: evaluatesRankedAiHypotheses,
    feedback: evaluatesRankedAiHypotheses
      ? 'Provided structured analysis of defect hypotheses.'
      : 'Provide clear hypothesis evaluation across test scenarios.',
  });

  const distinguishesAppVsAutomationDefects =
    /application bug|automation bug|environment|defect/i.test(explanation);
  criteria.push({
    id: 'c4',
    title: 'Distinguishes Application vs Automation Defects',
    passed: distinguishesAppVsAutomationDefects,
    feedback: distinguishesAppVsAutomationDefects
      ? 'Clearly differentiated between product defects and automation script issues.'
      : 'Explain the distinction between application defects and script automation defects.',
  });

  const rejectsDeceptiveAiFixes =
    !/page\.waitForTimeout\s*\(\s*[3-9]\d{3}\s*\)/.test(activeCode) &&
    /deceptive|anti-pattern|sleep|weak|swallowed/i.test(explanation);
  criteria.push({
    id: 'c5',
    title: 'Rejects Deceptive AI Fixes (No Hardcoded Sleeps)',
    passed: rejectsDeceptiveAiFixes,
    feedback: rejectsDeceptiveAiFixes
      ? 'Successfully removed arbitrary sleeps and deceptive workarounds.'
      : 'Ensure arbitrary page.waitForTimeout() calls are removed and replaced with event-driven synchronization.',
  });

  const fixesTimingAndRaceConditions =
    /waitForResponse|Promise\.all/i.test(code);
  criteria.push({
    id: 'c6',
    title: 'Fixes Timing & Asynchronous Race Conditions',
    passed: fixesTimingAndRaceConditions,
    feedback: fixesTimingAndRaceConditions
      ? 'Implemented event-driven synchronization via waitForResponse or Promise.all.'
      : 'Use waitForResponse or Promise.all to synchronize asynchronous actions reliably.',
  });

  const resolvesAmbiguousLocators =
    /getByRole|getByLabel|getByTestId/i.test(code);
  criteria.push({
    id: 'c7',
    title: 'Uses Semantic, Unambiguous Locators',
    passed: resolvesAmbiguousLocators,
    feedback: resolvesAmbiguousLocators
      ? 'Used accessible semantic locators (getByRole, getByLabel).'
      : 'Ensure locators target distinct roles, labels, or test IDs.',
  });

  const appliesMinimalSurgicalFix =
    /Scenario 1.*Scenario 2.*Scenario 3.*Scenario 4/s.test(code);
  criteria.push({
    id: 'c8',
    title: 'Applies Minimal Surgical Fixes Across All Scenarios',
    passed: appliesMinimalSurgicalFix,
    feedback: appliesMinimalSurgicalFix
      ? 'Refactored all 4 scenarios surgically.'
      : 'Provide complete implementations for all 4 test scenarios.',
  });

  const verifiesNoRegressions =
    /4 passed|passed/i.test(output) && /expect\(/i.test(code);
  criteria.push({
    id: 'c9',
    title: 'Verifies Test Execution & Passing Output',
    passed: verifiesNoRegressions,
    feedback: verifiesNoRegressions
      ? 'Terminal output verifies successful test execution.'
      : 'Include terminal execution output demonstrating passed tests.',
  });

  const syntacticallyValidJavaScript =
    !code.includes(': string') && !code.includes(': number') && code.includes('test(');
  criteria.push({
    id: 'c10',
    title: 'Syntactically Valid Modern JavaScript',
    passed: syntacticallyValidJavaScript,
    feedback: syntacticallyValidJavaScript
      ? 'Code is valid modern JavaScript with no TypeScript annotations.'
      : 'Ensure pure JavaScript syntax with no TypeScript annotations.',
  });

  const passedCount = criteria.filter((c) => c.passed).length;
  const score = passedCount;
  const passed = score >= 8;

  if (passed) {
    feedback.push(`Excellent! You scored ${score}/10 on Day 17 AI Debugging & Flaky-Test Analysis.`);
  } else {
    feedback.push(`Score: ${score}/10. Please address the failing criteria above to meet the 8/10 threshold.`);
  }

  return {
    score,
    feedback,
    passed,
    criteria,
    gathersSystematicFailureEvidence,
    sanitizesSensitiveDataForAi,
    evaluatesRankedAiHypotheses,
    distinguishesAppVsAutomationDefects,
    rejectsDeceptiveAiFixes,
    fixesTimingAndRaceConditions,
    resolvesAmbiguousLocators,
    appliesMinimalSurgicalFix,
    verifiesNoRegressions,
    syntacticallyValidJavaScript,
  };
}

export const PLAYWRIGHT_DAY_17_INTERVIEW_QUESTIONS: PlaywrightInterviewQuestion[] = [
  {
    id: 'iq-1',
    questionNumber: 1,
    question: 'How do you differentiate between an application bug and a test automation bug when an automated test fails in CI?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Defect triage, failure investigation, and root cause analysis',
    modelAnswer:
      'I investigate the failure through a structured triage process: First, I inspect the Playwright actionability log, trace, and network tab. If the application returned an unexpected HTTP 500/400 or failed to render a documented UI element that matches acceptance criteria, it is an Application Bug. In that case, I immediately report the defect with network logs and reproduction steps without modifying the test. If the application works manually and meets requirements, but the test failed due to a changed locator, missing await, or race condition, it is an Automation Bug that requires surgical refactoring using web-first assertions or resilient role locators.',
    followUpQuestion:
      'What danger arises when teams pressure QA engineers to keep CI green at all costs?',
  },
  {
    id: 'iq-2',
    questionNumber: 2,
    question: 'Why is page.waitForTimeout(5000) considered an anti-pattern, and what should you use instead?',
    difficulty: 'Beginner',
    assessmentFocus: 'Synchronization, auto-waiting, and test flakiness prevention',
    modelAnswer:
      'page.waitForTimeout() forces an arbitrary, hardcoded sleep that slows down test execution when the application is fast, and fails anyway when network latency exceeds the arbitrary threshold. It hides race conditions and leads to bloated, brittle test suites. Instead, you should always use web-first assertions (e.g. await expect(locator).toBeVisible()) which automatically retry up to the configured timeout, or coordinate network requests using await page.waitForResponse(urlPredicate) alongside the initiating user action.',
    followUpQuestion:
      'Is there ever an acceptable production scenario for page.waitForTimeout() in Playwright?',
  },
  {
    id: 'iq-3',
    questionNumber: 3,
    question: 'What is client-side hydration lag in React/Next.js apps, and how does it cause flakiness in Playwright tests?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'Modern SPA/SSR framework mechanics and asynchronous timing',
    modelAnswer:
      'In server-side rendered (SSR) applications like Next.js, the browser receives pre-rendered HTML before the client JavaScript bundle finishes downloading and executing. The element appears fully visible in the DOM, so Playwright passes visibility checks and clicks it. However, because the React onClick listener has not yet hydrated (attached), the user event is dropped silently, and nothing happens. To prevent this, tests should synchronize with a signal of client readiness, such as waiting for a state change, a network call, or an active interactive indicator.',
    followUpQuestion:
      'How can developers make components easier to test for hydration readiness?',
  },
  {
    id: 'iq-4',
    questionNumber: 4,
    question: 'What precautions must you take before pasting test execution logs or traces into external AI tools like ChatGPT or Claude?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Security compliance, prompt sanitization, and data privacy',
    modelAnswer:
      'You must strictly sanitize all sensitive data before sharing context with external AI models. This includes: stripping Bearer tokens and session cookies from HTTP headers, replacing customer PII (emails, phone numbers, addresses, SSNs) with synthetic placeholders, scrubbing internal hostnames or VPN IPs, and ensuring no proprietary business keys or credentials are exposed. Many organizations deploy internal proxy scrubbers or require self-hosted models for this reason.',
    followUpQuestion:
      'What automated tools or pre-commit hooks can assist in scrubbing logs before prompt submission?',
  },
  {
    id: 'iq-5',
    questionNumber: 5,
    question: 'How do you evaluate and verify an AI-generated code fix for a failing Playwright test before committing it?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'AI code review, automated verification, and regression prevention',
    modelAnswer:
      'I apply a 4-step verification rubric: 1) Anti-pattern check: Verify the AI did not add arbitrary sleeps (waitForTimeout), weaken assertions (count() > 0), or swallow errors in empty catch blocks. 2) Real DOM verification: Confirm the suggested locators match actual accessibility roles and labels in the application. 3) Flakiness testing: Run the test with --repeat-each=20 to verify determinism under repeated execution. 4) Code review: Ensure modern JavaScript idioms (async/await) are maintained and no unused imports or hallucinated Playwright APIs were introduced.',
    followUpQuestion:
      'How does Playwright Trace Viewer help you assess whether an AI fix resolved the real problem?',
  },
];

export const PLAYWRIGHT_DAY_17_QUIZ_QUESTIONS: PlaywrightQuizQuestion[] = [
  {
    id: 'q-1',
    questionNumber: 1,
    question: 'What is the primary indicator of an Application Bug vs an Automation Bug in a test failure?',
    options: [
      'The test took longer than 3 seconds to execute',
      'The backend API returned an unhandled HTTP 500 error or UI violated verified requirements',
      'The test file has more than 50 lines of code',
      'The test was executed on Firefox instead of Chromium',
    ],
    correctAnswerIndex: 1,
    explanation:
      'An Application Bug occurs when the software under test misbehaves (e.g. backend 500 error, broken calculation, UI regression) even though the test accurately reflects business requirements.',
  },
  {
    id: 'q-2',
    questionNumber: 2,
    question: 'Why should you avoid using await page.waitForTimeout(3000) to fix a timing issue?',
    options: [
      'Playwright crashes whenever waitForTimeout is called',
      'It creates slow, non-deterministic tests that fail if latency exceeds 3s and waste time if the action takes only 50ms',
      'It converts JavaScript code into TypeScript automatically',
      'It cannot be run inside a Docker container',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Hardcoded timeouts waste execution time on fast runs and cause false failures on slower CI runners. Playwright web-first assertions and event listeners should be used instead.',
  },
  {
    id: 'q-3',
    questionNumber: 3,
    question: 'Which artifact must be SCRUBBED from logs before sharing with external AI assistants?',
    options: [
      'Playwright version number',
      'Operating system name',
      'Authorization Bearer tokens and Customer PII',
      'The name of the test file',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Authentication headers, session tokens, passwords, and personally identifiable customer information (PII) present severe security and compliance liabilities if pasted into AI models.',
  },
  {
    id: 'q-4',
    questionNumber: 4,
    question: 'What happens when a learner omits await on a Playwright assertion like expect(locator).toBeVisible()?',
    options: [
      'Playwright throws a compiler error immediately',
      'The assertion returns a pending Promise without waiting, allowing the test to exit prematurely with false passes or silent failures',
      'The browser opens in fullscreen mode',
      'The test runs in headed mode automatically',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Playwright web-first assertions are asynchronous. Forgetting await means the test runner does not wait for the assertion to resolve, causing race conditions and false passes.',
  },
  {
    id: 'q-5',
    questionNumber: 5,
    question: 'Why is wrapping an action in try { ... } catch (e) {} with an empty catch block dangerous in automated tests?',
    options: [
      'It slows down Node.js garbage collection',
      'It silently swallows legitimate bugs, browser crashes, and timeout errors, giving a false impression that the test passed',
      'It prevents Playwright from generating screenshots',
      'It invalidates the git commit signature',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Empty catch blocks swallow exceptions indiscriminately, hiding real defects and creating brittle, deceptive test suites.',
  },
  {
    id: 'q-6',
    questionNumber: 6,
    question: 'How does client-side hydration cause intermittent click failures?',
    options: [
      'The browser clears the cache while downloading CSS',
      'Pre-rendered HTML is visible in the DOM, but JavaScript click listeners have not yet been attached by the framework',
      'The database has too many open connections',
      'The operating system audio driver is disabled',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Hydration lag occurs when pre-rendered markup is visible and clickable in appearance, but the framework (React/Vue) has not yet bound event listeners.',
  },
  {
    id: 'q-7',
    questionNumber: 7,
    question: 'Which CLI flag allows you to test a flaky test for determinism by running it 25 times continuously?',
    options: [
      '--flaky-detect=25',
      '--repeat-each=25',
      '--run-times=25',
      '--retry-suite=25',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Playwright CLI provides --repeat-each=<N> to run specified tests N times in succession to expose race conditions and intermittent flakiness.',
  },
  {
    id: 'q-8',
    questionNumber: 8,
    question: 'Why is expect(await page.locator("div").count()).toBeGreaterThan(0) a deceptive AI recommendation?',
    options: [
      'Modern web pages never contain div elements',
      'It dilutes the assertion to verify that ANY generic div exists, passing even if the critical business output is completely wrong or empty',
      'It takes 30 seconds to evaluate',
      'Playwright does not support the count() method',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Checking that a generic element count is greater than zero proves nothing about the correctness of the business data or message being tested.',
  },
  {
    id: 'q-9',
    questionNumber: 9,
    question: 'What is the role of Playwright Actionability Logs during failure analysis?',
    options: [
      'They list git commit authors who modified the file',
      'They document the exact series of readiness checks Playwright performed (visibility, stability, enablement, pointer events)',
      'They generate CSS stylesheets automatically',
      'They calculate the financial cost of running the test',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Actionability logs detail exactly why an action stalled or timed out—for example, if the element was obscured by a modal backdrop or disabled.',
  },
  {
    id: 'q-10',
    questionNumber: 10,
    question: 'What is the recommended approach to coordinate a user click with a resulting API call in Playwright?',
    options: [
      'Call await page.waitForTimeout(2000) before clicking',
      'Use await Promise.all([page.waitForResponse(...), locator.click()]) to set up the response listener before triggering the event',
      'Disable network inspection in playwright.config.js',
      'Poll the database directly with a raw SQL query',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Using Promise.all ensures the network listener is active before the click action is dispatched, preventing race conditions where fast responses arrive before listeners are registered.',
  },
];

export const PLAYWRIGHT_DAY_17_DATA: PlaywrightDay17Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 17,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'AI-Assisted Debugging and Flaky-Test Analysis',
  subtitle:
    'Diagnose intermittent failures, sanitize failure logs, eliminate deceptive AI workarounds, and apply surgical event-driven synchronization.',
  level: 'Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–16 concepts (Locators, web-first assertions, POM, API testing, CI/CD, and prompt engineering).',
  learningObjectives: [
    'Systematically collect failure artifacts: error stacks, actionability call logs, and network telemetry.',
    'Sanitize failure logs, scrubbing Bearer tokens, secrets, and customer PII before sending prompts to AI models.',
    'Execute a 4-phase structured AI debugging workflow to classify failures into product bugs vs script defects.',
    'Understand client-side hydration lags and eliminate asynchronous race conditions without hardcoded sleeps.',
    'Detect and reject 4 deceptive AI anti-patterns: arbitrary timeouts, weakened assertions, empty try/catches, and excessive retries.',
    'Apply surgical, minimal fixes to failing suites and verify determinism with repeat runs.',
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
    { day: 14, title: 'Day 14: Git, Test Configuration & Cross-Browser', focus: 'playwright.config.js, WebKit, Firefox, Chromium', isCompleted: true },
    { day: 15, title: 'Day 15: CI/CD Integration with GitHub Actions', focus: 'Pipelines, Headless CI, Artifacts, Troubleshooting', isCompleted: true },
    { day: 16, title: 'Day 16: AI-Assisted Test Generation & Locators', focus: 'Structured Prompts, Locator Critique, Code Review', isCompleted: true },
    { day: 17, title: 'Day 17: AI Debugging & Flaky-Test Analysis', focus: 'Root Cause Analysis, Deceptive AI Fixes', isCurrent: true },
    { day: 18, title: 'Day 18: AI-Assisted Test Planning & Synthetic Data', focus: 'Requirements to Tests, Edge Cases, Coverage Matrix' },
    { day: 19, title: 'Day 19: Framework Quality & Playwright MCP', focus: 'Model Context Protocol, Safe AI Workflows' },
    { day: 20, title: 'Day 20: Final Project, Assessment & Interview Prep', focus: 'Capstone E-commerce Framework, Certification' },
  ],
  topics: PLAYWRIGHT_DAY_17_TOPICS,
  starterCode: PLAYWRIGHT_DAY_17_STARTER_CODE,
  starterExplanation: PLAYWRIGHT_DAY_17_STARTER_EXPLANATION,
  starterOutput: PLAYWRIGHT_DAY_17_STARTER_OUTPUT,
  evaluateAssignment: evaluateDay17Assignment,
  interviewQuestions: PLAYWRIGHT_DAY_17_INTERVIEW_QUESTIONS,
  quizQuestions: PLAYWRIGHT_DAY_17_QUIZ_QUESTIONS,
};
