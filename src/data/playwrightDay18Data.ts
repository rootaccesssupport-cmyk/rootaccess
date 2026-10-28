import type {
  PlaywrightDay18Unit,
  PlaywrightDay18AssignmentRubric,
  PlaywrightDayTopic,
  PlaywrightInterviewQuestion,
  PlaywrightQuizQuestion,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_18_TOPICS: PlaywrightDayTopic[] = [
  {
    id: 'topic-1',
    topicNumber: 1,
    title: 'Topic 1: Deconstructing Requirements into Test Scenarios with AI',
    durationMinutes: 25,
    explanation: `Software requirements are frequently delivered as brief Jira tickets or vague user stories: "As a traveler, I want to book a hotel room with discounts so that I can save money."

If an automation engineer writes tests directly from this single sentence, critical edge cases are guaranteed to be overlooked:
- What happens if the check-out date is before the check-in date?
- What happens if room inventory sells out between selection and payment?
- Can a promotional coupon discount exceed the room subtotal?
- What currency rounding rules apply to international taxes?

Using AI as a critical thinking partner, you can deconstruct ambiguous requirements into an exhaustive, risk-weighted test scenario matrix:
- P0 (Blocker / Critical): Core revenue workflows (Search, Select, Pay, Confirm). Total loss of revenue if broken.
- P1 (High): Validation rules, boundary dates, error notifications. User frustration if broken.
- P2 (Medium / Low): Obscure coupon combinations, extreme character inputs, localization.`,
    keyTakeaways: [
      'Deconstruct ambiguous user stories into explicit P0, P1, and P2 scenario tiers.',
      'Prompt AI assistants to probe for missing acceptance criteria before writing automation code.',
      'Group related test scenarios into logical test.describe() suites matching feature boundaries.',
    ],
    terminology: [
      {
        term: 'Risk-Based Prioritization',
        definition: 'Organizing test cases into tiers (P0, P1, P2) based on business impact and defect likelihood.',
      },
      {
        term: 'Scenario Matrix',
        definition: 'A structured table mapping features to inputs, preconditions, expected outputs, and priority.',
      },
    ],
    examples: [
      {
        title: 'Priority Tiered Describe Block',
        description: 'Organizing P0, P1, and P2 tests into descriptive Playwright test blocks.',
        codeSnippet: `test.describe('Hotel Reservation Suite', () => {
  test('P0: completes standard room booking for valid future dates', async ({ page }) => {
    // Core revenue flow
  });
  test('P1: prevents reservation when check-out precedes check-in', async ({ page }) => {
    // Validation rule
  });
});`,
      },
    ],
    exercise: {
      id: 'ex-1',
      title: 'Risk Prioritization',
      prompt: 'When prioritizing an automated test suite for an e-commerce checkout flow, which scenario should be designated as P0 (Blocker)?',
      options: [
        'Entering a 250-character special symbol coupon code',
        'Viewing product details on an uncommon Linux browser',
        'Completing an end-to-end checkout with a valid credit card and receiving confirmation',
        'Checking if the company logo has an updated 2026 copyright notice',
      ],
      correctAnswerIndex: 2,
      explanation:
        'The core revenue-generating transaction (selecting a product, completing payment, receiving confirmation) is the most critical workflow in e-commerce, making it a P0 scenario.',
    },
  },
  {
    id: 'topic-2',
    topicNumber: 2,
    title: 'Topic 2: Uncovering Blind Spots & Edge Cases with AI',
    durationMinutes: 25,
    explanation: `Human developers and QA engineers suffer from confirmation bias: we instinctively test the paths we expect users to follow.

AI models, when prompted with adversarial framing ("Act as an ethical hacker or rigorous QA architect trying to break this state machine"), excel at uncovering unconventional paths:
1. Boundary & Off-By-One Conditions: Leap years, Daylight Saving Time (DST) switches, timezone crossings, midnight reservations.
2. State Machine Violations: Double-clicking "Submit Payment", refreshing the page during credit card authorization, navigating backwards in browser history.
3. Concurrency Collisions: Two users simultaneously reserving the very last available hotel room or seat.
4. Data Extreme Boundaries: 0 items, 9999 items, zero-dollar transactions, strings containing SQL injection probes or multi-byte Unicode emojis.`,
    keyTakeaways: [
      'Use adversarial prompts to discover state machine, concurrency, and timezone edge cases.',
      'Test double-click prevention on critical transactional buttons to prevent duplicate orders.',
      'Validate system resilience against extreme boundaries (empty state, maximum limits, Unicode inputs).',
    ],
    terminology: [
      {
        term: 'Confirmation Bias',
        definition: 'The cognitive tendency to verify expected behaviors while neglecting negative edge cases.',
      },
      {
        term: 'Adversarial Prompting',
        definition: 'Instructing an LLM to adopt a hostile or breaker persona to identify system vulnerabilities.',
      },
    ],
    examples: [
      {
        title: 'Testing Rapid Multi-Click Prevention',
        description: 'Simulating rapid double clicks to verify single request dispatch.',
        codeSnippet: `const submitButton = page.getByRole('button', { name: 'Confirm Reservation' });
await submitButton.click({ clickCount: 2 });
// Verify single request dispatch via request event counter`,
      },
    ],
    exercise: {
      id: 'ex-2',
      title: 'Temporal Edge Cases',
      prompt: 'Which scenario represents a temporal boundary edge case in a hotel booking application?',
      options: [
        'Booking a hotel in Paris while the user’s device is set to New York timezone during the 2:00 AM Daylight Saving Time transition',
        'Entering an email address containing an uppercase letter',
        'Clicking the "About Us" link in the footer',
        'Viewing a room gallery containing 3 photos',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Timezone shifts combined with Daylight Saving Time transitions frequently cause date off-by-one errors (e.g. check-in date jumping forward or backward 24 hours), making it a classic high-risk boundary edge case.',
    },
  },
  {
    id: 'topic-3',
    topicNumber: 3,
    title: 'Topic 3: Generating Realistic Synthetic Test Data Safely',
    durationMinutes: 25,
    explanation: `Many enterprise teams make the dangerous mistake of copying real production database dumps into test environments. This introduces massive legal and operational vulnerabilities:
- GDPR / CCPA Violations: Exposing real customer names, phone numbers, and addresses.
- Accidental Customer Contact: Tests accidentally firing SMS notifications or real billing charges to genuine customers.
- Stale State: Customer data changes or is deleted, causing brittle tests to fail unpredictably.

Safe Synthetic Data Generation Strategies:
Modern Playwright frameworks generate fresh, isolated synthetic data for every test execution using dynamic timestamps, random suffixes, and the official RFC-reserved "@example.com" domain. This guarantees zero state collision during parallel test runs.`,
    keyTakeaways: [
      'Never copy raw production customer data into automated test suites.',
      'Use data factories with dynamic unique suffixes (Date.now(), Math.random()) to guarantee test isolation.',
      'Always use standardized non-routable email domains like @example.com to prevent spamming real users.',
    ],
    terminology: [
      {
        term: 'Test Data Factory',
        definition: 'A design pattern that programmatically instantiates isolated data objects with randomized attributes and easy overrides.',
      },
      {
        term: 'RFC 2606 Domain',
        definition: 'Reserved top-level domains (.example, example.com) designated specifically for documentation and automated testing.',
      },
    ],
    examples: [
      {
        title: 'Booking Data Factory Pattern',
        description: 'Generating isolated booking fixtures with dynamic future dates and unique emails.',
        codeSnippet: `export function generateBookingData(overrides = {}) {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 10000);
  return {
    guestName: \`Guest \${randomSuffix}\`,
    email: \`guest_\${timestamp}_\${randomSuffix}@example.com\`,
    ...overrides
  };
}`,
      },
    ],
    exercise: {
      id: 'ex-3',
      title: 'Safe Domain Convention',
      prompt: 'Why should test automation email addresses always use the @example.com domain rather than real domains like @gmail.com or @company.com?',
      options: [
        'The @example.com domain is reserved by IANA for documentation and testing, ensuring no real emails can ever be accidentally delivered to real people',
        'Playwright blocks all tests that do not end in @example.com',
        'Google Chrome renders @example.com 50% faster than other domains',
        'It is required by the JavaScript ECMAScript standard',
      ],
      correctAnswerIndex: 0,
      explanation:
        'RFC 2606 and RFC 6761 reserve example.com specifically for testing and documentation. Using it guarantees that no automated email will ever mistakenly reach a real human inbox.',
    },
  },
  {
    id: 'topic-4',
    topicNumber: 4,
    title: 'Topic 4: Requirements Traceability & Coverage Matrix',
    durationMinutes: 25,
    explanation: `Requirements Traceability is the architectural practice of linking every automated test directly back to the business requirement, user story, or acceptance criteria (AC) it verifies.

Without traceability:
- Teams cannot answer: "If we ship this release, what percentage of our PRD is verified by automation?"
- Refactoring requirements causes orphan tests to linger or critical features to lose coverage without anyone noticing.

Implementing Traceability in Playwright:
Playwright provides native test annotations and tag capabilities to embed requirement IDs directly into test executions and HTML reports:
test('AC-HOTEL-104: applies 20% loyalty discount', { tag: ['@req-104', '@loyalty'] }, async ({ page }) => { ... })
You can then run targeted tests using the CLI: npx playwright test --grep "@req-104".`,
    keyTakeaways: [
      'Tag tests with requirement identifiers (@req-104) to establish two-way traceability.',
      'Use test.info().annotations to link test results to PRD or Jira documentation in HTML reports.',
      'Traceability matrices ensure critical business flows are never dropped during framework refactoring.',
    ],
    terminology: [
      {
        term: 'Traceability Matrix',
        definition: 'A cross-reference grid correlating product requirements directly to test specifications and automated execution results.',
      },
      {
        term: 'Test Grep',
        definition: 'Playwright CLI capability to filter and execute tests based on regex matching against titles and tags.',
      },
    ],
    examples: [
      {
        title: 'Tagging Test with Requirement ID',
        description: 'Using the tag property to link test execution directly to Jira acceptance criteria.',
        codeSnippet: `test('REQ-HOTEL-02: enforces minimum 1-night stay', {
  tag: ['@req-02', '@boundary'],
}, async ({ page }) => {
  await page.goto('/reserve');
  // test logic
});`,
      },
    ],
    exercise: {
      id: 'ex-4',
      title: 'Targeted CLI Grep',
      prompt: 'How can you run only the Playwright tests that cover requirement @req-res-02 using the command line?',
      options: [
        'npx playwright test --filter="@req-res-02"',
        'npx playwright test --grep "@req-res-02"',
        'npx playwright run --tag="@req-res-02"',
        'npx playwright start --only="@req-res-02"',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Playwright CLI uses the --grep flag (or -g) with a regular expression or string to filter and execute tests whose titles or tags match.',
    },
  },
];

export const PLAYWRIGHT_DAY_18_STARTER_CODE = `// ============================================================================
// ROOTACCESS PLAYWRIGHT AUTOMATION — DAY 18 PRACTICAL LAB
// AI-Assisted Test Planning, Edge Cases & Synthetic Data
// ============================================================================
// Scenario: Hotel & Flight Booking Platform ("RootVoyage")
// Requirements:
// - REQ-BK-01: Valid booking requires future check-in and checkout > checkin.
// - REQ-BK-02: Maximum occupancy validation (Family Suite: max 4 guests).
// - REQ-BK-03: Promotional coupon code application (Code: "SAVE20" gives 20% off).
// - REQ-BK-04: Negative date boundary validation (checkout <= checkin rejected).
// ============================================================================

import { test, expect } from '@playwright/test';

export function generateSyntheticBookingData(overrides = {}) {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);

  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 10);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 3);

  return {
    guestName: \`Traveler Alex \${randomSuffix}\`,
    email: \`guest_\${timestamp}_\${randomSuffix}@example.com\`,
    phone: \`+1555\${randomSuffix}00\`,
    checkInDate: checkIn.toISOString().split('T')[0],
    checkOutDate: checkOut.toISOString().split('T')[0],
    guestsCount: 2,
    roomType: 'Family Suite',
    couponCode: 'SAVE20',
    ...overrides,
  };
}

test.describe('RootVoyage Booking Engine - Requirements Traceability', () => {

  test('REQ-BK-01: completes valid hotel reservation for future dates', {
    tag: ['@req-bk-01', '@smoke', '@p0'],
  }, async ({ page }) => {
    const booking = generateSyntheticBookingData();

    await page.goto('/hotels/reserve');
    await page.getByLabel('Primary Guest Name').fill(booking.guestName);
    await page.getByLabel('Guest Email').fill(booking.email);
    await page.getByLabel('Check-in Date').fill(booking.checkInDate);
    await page.getByLabel('Check-out Date').fill(booking.checkOutDate);
    await page.getByRole('combobox', { name: 'Room Type' }).selectOption(booking.roomType);
    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Reservation Confirmed');
    await expect(page.getByTestId('confirmed-guest')).toHaveText(booking.guestName);
  });

  test('REQ-BK-02: enforces maximum occupancy limits per room tier', {
    tag: ['@req-bk-02', '@validation', '@p1'],
  }, async ({ page }) => {
    const booking = generateSyntheticBookingData({ guestsCount: 6 });

    await page.goto('/hotels/reserve');
    await page.getByLabel('Primary Guest Name').fill(booking.guestName);
    await page.getByRole('combobox', { name: 'Room Type' }).selectOption(booking.roomType);
    await page.getByLabel('Number of Guests').fill(String(booking.guestsCount));
    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('Family Suite accommodates a maximum of 4 guests');
  });

  test('REQ-BK-03: applies 20% discount coupon code accurately to subtotal', {
    tag: ['@req-bk-03', '@pricing', '@p0'],
  }, async ({ page }) => {
    const booking = generateSyntheticBookingData();

    await page.goto('/hotels/reserve');
    await page.getByLabel('Check-in Date').fill(booking.checkInDate);
    await page.getByLabel('Check-out Date').fill(booking.checkOutDate);
    await page.getByLabel('Coupon Code').fill(booking.couponCode);
    await page.getByRole('button', { name: 'Apply Coupon' }).click();

    await expect(page.getByTestId('discount-badge')).toHaveText('20% OFF Applied');
    await expect(page.getByTestId('total-price')).toContainText('$');
  });

  test('REQ-BK-04: rejects reservation where checkout is on or before checkin', {
    tag: ['@req-bk-04', '@boundary', '@p1'],
  }, async ({ page }) => {
    const booking = generateSyntheticBookingData();

    await page.goto('/hotels/reserve');
    await page.getByLabel('Check-in Date').fill(booking.checkInDate);
    await page.getByLabel('Check-out Date').fill(booking.checkInDate);
    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    await expect(page.getByRole('alert')).toHaveText('Check-out date must be at least 1 day after check-in');
  });
});
`;

export const PLAYWRIGHT_DAY_18_STARTER_EXPLANATION = `### Day 18 Lab: Test Planning, Edge Cases & Synthetic Data Architecture

#### 1. Requirements Traceability Matrix
- **REQ-BK-01 (P0)**: Verified standard booking path using dynamically computed future dates (+10 to +13 days).
- **REQ-BK-02 (P1)**: Tested boundary exceeding maximum room occupancy limit (6 guests vs 4 limit) with explicit alert verification.
- **REQ-BK-03 (P0)**: Verified coupon application ("SAVE20") and UI badge feedback.
- **REQ-BK-04 (P1)**: Tested negative boundary condition where check-out equals check-in date.

#### 2. Synthetic Test Data Strategy
- Used dynamic timestamps and random numeric suffixes (Date.now(), Math.random()) to generate globally unique guest names and email addresses.
- Used the official IANA reserved @example.com domain, completely eliminating the danger of accidental email delivery to real people.
- Decoupled test fixtures from hardcoded values, ensuring zero state pollution across parallel test runners.
`;

export const PLAYWRIGHT_DAY_18_STARTER_OUTPUT = `Running 4 tests using 2 workers
[chromium] › day18-test-planning.spec.js:46:3 › RootVoyage Booking Engine › REQ-BK-01: completes valid hotel reservation for future dates [@req-bk-01]
  ✓  [chromium] › REQ-BK-01: completes valid hotel reservation for future dates (1.2s)
[chromium] › day18-test-planning.spec.js:63:3 › RootVoyage Booking Engine › REQ-BK-02: enforces maximum occupancy limits per room tier [@req-bk-02]
  ✓  [chromium] › REQ-BK-02: enforces maximum occupancy limits per room tier (780ms)
[chromium] › day18-test-planning.spec.js:77:3 › RootVoyage Booking Engine › REQ-BK-03: applies 20% discount coupon code accurately to subtotal [@req-bk-03]
  ✓  [chromium] › REQ-BK-03: applies 20% discount coupon code accurately to subtotal (850ms)
[chromium] › day18-test-planning.spec.js:92:3 › RootVoyage Booking Engine › REQ-BK-04: rejects reservation where checkout is on or before checkin [@req-bk-04]
  ✓  [chromium] › REQ-BK-04: rejects reservation where checkout is on or before checkin (690ms)

  4 passed (3.5s)
`;

export function evaluateDay18Assignment(
  code: string,
  output: string,
  explanation: string
): PlaywrightDay18AssignmentRubric {
  const criteria: PlaywrightDay18AssignmentRubric['criteria'] = [];
  const feedback: string[] = [];

  const extractsRequirementsToScenarioMatrix =
    /REQ-BK-01.*REQ-BK-02.*REQ-BK-03.*REQ-BK-04/s.test(code + explanation);
  criteria.push({
    id: 'c1',
    title: 'Deconstructs Requirements into Structured Scenarios',
    passed: extractsRequirementsToScenarioMatrix,
    feedback: extractsRequirementsToScenarioMatrix
      ? 'All 4 requirements (REQ-BK-01..04) mapped and deconstructed.'
      : 'Map all 4 requirements clearly in code and documentation.',
  });

  const discoversEdgeCasesAndBoundaries =
    /boundary|occupancy|checkout.*checkin|exceed/i.test(code + explanation);
  criteria.push({
    id: 'c2',
    title: 'Discovers Edge Cases & Boundary Conditions',
    passed: discoversEdgeCasesAndBoundaries,
    feedback: discoversEdgeCasesAndBoundaries
      ? 'Boundary and negative occupancy/date cases are thoroughly covered.'
      : 'Include boundary conditions such as 0-night stays and capacity limits.',
  });

  const createsSyntheticTestDataSets =
    /generateSyntheticBookingData|Date\.now\(\)|@example\.com/i.test(code);
  criteria.push({
    id: 'c3',
    title: 'Implements Safe Synthetic Test Data Factory',
    passed: createsSyntheticTestDataSets,
    feedback: createsSyntheticTestDataSets
      ? 'Synthetic data factory generates isolated, safe test fixtures.'
      : 'Create a synthetic data factory utilizing dynamic IDs and @example.com domain.',
  });

  const avoidsProductionPiiInAiPrompts =
    !/realuser@gmail\.com|4111111111111111/.test(code) &&
    /pii|synthetic|safe|redact|example\.com/i.test(code + explanation);
  criteria.push({
    id: 'c4',
    title: 'Avoids Production PII and Uses Safe Domains',
    passed: avoidsProductionPiiInAiPrompts,
    feedback: avoidsProductionPiiInAiPrompts
      ? 'Clean test fixtures with zero sensitive PII or real credentials.'
      : 'Ensure synthetic data uses safe dummy values and avoids production customer data.',
  });

  const prioritizesHighRiskWorkflows =
    /@p0|@p1|p0|p1|priority/i.test(code + explanation);
  criteria.push({
    id: 'c5',
    title: 'Prioritizes Scenarios by Risk (P0 / P1)',
    passed: prioritizesHighRiskWorkflows,
    feedback: prioritizesHighRiskWorkflows
      ? 'Risk tiers (P0/P1) designated across test scenarios.'
      : 'Designate priority tiers (e.g. @p0, @p1) in test tags or descriptions.',
  });

  const mapsRequirementsToTests =
    /tag:\s*\[.*@req-bk/i.test(code);
  criteria.push({
    id: 'c6',
    title: 'Tags Tests with Traceability Requirement IDs',
    passed: mapsRequirementsToTests,
    feedback: mapsRequirementsToTests
      ? 'Tests carry explicit requirement tags for traceability.'
      : 'Tag Playwright tests with requirement tags (e.g. tag: ["@req-bk-01"]).',
  });

  const authorsPlaywrightTestSkeletons =
    /test\.describe\(.*test\(.*test\(.*test\(.*test\(/s.test(code);
  criteria.push({
    id: 'c7',
    title: 'Authors Comprehensive Playwright Test Suite',
    passed: authorsPlaywrightTestSkeletons,
    feedback: authorsPlaywrightTestSkeletons
      ? 'Structured test suite with multiple test blocks implemented.'
      : 'Organize tests within test.describe with at least 4 individual tests.',
  });

  const validatesErrorHandlingExpectations =
    /getByRole\('alert'\)|toContainText|toHaveText/i.test(code);
  criteria.push({
    id: 'c8',
    title: 'Validates Explicit Negative Error Messages',
    passed: validatesErrorHandlingExpectations,
    feedback: validatesErrorHandlingExpectations
      ? 'Web-first assertions validate exact error messages.'
      : 'Assert specific error messages for invalid and boundary inputs.',
  });

  const demonstratesCoverageTraceability =
    /traceability|coverage|matrix/i.test(explanation) && /passed/i.test(output);
  criteria.push({
    id: 'c9',
    title: 'Demonstrates Living Traceability & Verified Execution',
    passed: demonstratesCoverageTraceability,
    feedback: demonstratesCoverageTraceability
      ? 'Documented traceability matrix and verified passing execution output.'
      : 'Provide traceability matrix documentation and verified test output.',
  });

  const syntacticallyValidJavaScript =
    !code.includes(': string') && !code.includes(': number') && code.includes('export function');
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
    feedback.push(`Outstanding! You scored ${score}/10 on Day 18 Test Planning, Edge Cases & Synthetic Data.`);
  } else {
    feedback.push(`Score: ${score}/10. Please address the failing criteria above to meet the 8/10 threshold.`);
  }

  return {
    score,
    feedback,
    passed,
    criteria,
    extractsRequirementsToScenarioMatrix,
    discoversEdgeCasesAndBoundaries,
    createsSyntheticTestDataSets,
    avoidsProductionPiiInAiPrompts,
    prioritizesHighRiskWorkflows,
    mapsRequirementsToTests,
    authorsPlaywrightTestSkeletons,
    validatesErrorHandlingExpectations,
    demonstratesCoverageTraceability,
    syntacticallyValidJavaScript,
  };
}

export const PLAYWRIGHT_DAY_18_INTERVIEW_QUESTIONS: PlaywrightInterviewQuestion[] = [
  {
    id: 'iq-1',
    questionNumber: 1,
    question: 'How do you design an automated test suite from an ambiguous product specification or user story?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Requirements analysis, risk categorization, and test scoping',
    modelAnswer:
      'I begin by deconstructing the user story into explicit acceptance criteria using a 3-tier risk matrix (P0 revenue-critical, P1 negative/boundary validation, P2 edge cases). I collaborate with product owners or use structured AI prompts to uncover missing constraints—such as off-by-one dates, concurrency conflicts, and boundary extremes. Each identified scenario is then given a unique requirement ID (e.g. @req-101), authored into an independent Playwright test using synthetic data factories, and tagged for living traceability in reports.',
    followUpQuestion:
      'What questions would you ask a Product Manager when a feature spec says "users can apply coupon codes"?',
  },
  {
    id: 'iq-2',
    questionNumber: 2,
    question: 'Why is using real production database data in automated testing considered an anti-pattern, and what is the alternative?',
    difficulty: 'Beginner',
    assessmentFocus: 'Data privacy, security compliance, and test data management',
    modelAnswer:
      'Using production data creates severe legal and regulatory liabilities under GDPR/CCPA due to customer PII exposure. Furthermore, test environments risk accidentally sending real SMS/emails or charging real cards. Operationally, production data is stateful and fragile—if a customer account changes, tests fail unpredictably. The industry standard alternative is the Test Data Factory pattern, which generates isolated, synthetic records with unique timestamps and standard reserved domains (@example.com) per test run.',
    followUpQuestion:
      'How do you handle tests that require existing catalog data (e.g. 5,000 products) without copying production?',
  },
  {
    id: 'iq-3',
    questionNumber: 3,
    question: 'What is Requirements Traceability, and how can Playwright natively support it?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Traceability, test reporting, and enterprise governance',
    modelAnswer:
      'Requirements Traceability connects automated test cases directly to the business requirements they validate, ensuring teams know their exact automated test coverage. Playwright natively supports traceability through test tagging (e.g. tag: ["@req-bk-01"]) and the annotations API (test.info().annotations.push({ type: "requirement", description: "REQ-01" })). These tags and annotations appear in the official HTML report and allow targeted execution via npx playwright test --grep "@req-bk-01".',
    followUpQuestion:
      'How does tagging help in a continuous delivery environment where only smoke tests run on PRs?',
  },
  {
    id: 'iq-4',
    questionNumber: 4,
    question: 'How do you test for race conditions like duplicate order submission when a user rapidly double-clicks a submit button?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'Concurrency testing, API event interception, and UI state debouncing',
    modelAnswer:
      'I simulate the rapid interaction using Playwright’s locator click options, such as await button.click({ clickCount: 2 }) or dispatching rapid successive clicks. Simultaneously, I monitor outgoing network requests using page.on("request") to verify that only a single POST request is dispatched to the backend, and assert that the button enters a disabled or loading state immediately upon the initial click.',
    followUpQuestion:
      'How should the frontend architecture guard against rapid multi-clicks?',
  },
  {
    id: 'iq-5',
    questionNumber: 5,
    question: 'How does an engineer prevent AI tools from creating unrealistic or overly simplistic test data?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'AI prompt design, data boundary testing, and schema constraints',
    modelAnswer:
      'By providing rigorous constraints in the prompt: specifying domain-valid regex patterns, realistic boundary conditions (e.g. international phone formats, Unicode characters in names, leap year dates), and explicit relational rules (e.g. child checkout date must exceed checkin date). Rather than accepting static JSON fixtures, I prompt AI to generate reusable factory functions that accept override parameters for targeted edge-case customization.',
    followUpQuestion:
      'What libraries in the JavaScript ecosystem complement AI-driven data generation?',
  },
];

export const PLAYWRIGHT_DAY_18_QUIZ_QUESTIONS: PlaywrightQuizQuestion[] = [
  {
    id: 'q-1',
    questionNumber: 1,
    question: 'In risk-based test planning, which scenario should be categorized as P0 (Blocker / Critical)?',
    options: [
      'A user changes their theme from dark mode to light mode',
      'A user searches for a product, completes checkout with payment, and receives an order confirmation',
      'A user inputs a 500-character string into the feedback textarea',
      'The privacy policy page has a missing footer hyperlink',
    ],
    correctAnswerIndex: 1,
    explanation:
      'P0 scenarios represent critical revenue-generating paths without which the business cannot function. End-to-end checkout is a quintessential P0 scenario.',
  },
  {
    id: 'q-2',
    questionNumber: 2,
    question: 'Why should automated test suites avoid using real customer production data?',
    options: [
      'Production data makes tests execute 10 times slower',
      'It violates data privacy regulations (GDPR/CCPA) and risks sending accidental notifications or charges to real people',
      'Modern web browsers refuse to render production customer names',
      'Playwright requires all test data to be written in binary',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Exposing real customer information violates privacy laws and introduces dangerous operational risks, such as accidental real-world communications or charges.',
  },
  {
    id: 'q-3',
    questionNumber: 3,
    question: 'What is the purpose of the Test Data Factory pattern in test automation?',
    options: [
      'To build physical hardware factories for running mobile tests',
      'To dynamically generate isolated, realistic, and unique test fixtures with default attributes and easy overrides',
      'To store hardcoded passwords in a public git repository',
      'To convert SQL databases into CSV files',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A Test Data Factory programmatically generates fresh, isolated, and valid data objects for every test, avoiding state conflicts between parallel test runs.',
  },
  {
    id: 'q-4',
    questionNumber: 4,
    question: 'Which domain name is formally reserved by RFC standards specifically for safe testing and documentation?',
    options: [
      '@testmail.com',
      '@fakeuser.org',
      '@example.com',
      '@tempdomain.net',
    ],
    correctAnswerIndex: 2,
    explanation:
      'RFC 2606 reserves example.com, example.net, and example.org for testing and documentation, guaranteeing no real emails will ever be routed to real people.',
  },
  {
    id: 'q-5',
    questionNumber: 5,
    question: 'How do you tag a Playwright test with a requirement identifier in Playwright test configuration?',
    options: [
      'test("my test", { tag: ["@req-101"] }, async ({ page }) => { ... })',
      'test("my test", { requirementId: 101 })',
      'test.tag("@req-101")',
      'test.setAnnotation("req-101")',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Playwright test options accept a tag array: test("title", { tag: ["@req-101"] }, async ({ page }) => { ... }).',
  },
  {
    id: 'q-6',
    questionNumber: 6,
    question: 'What is the benefit of living requirements traceability in CI/CD pipelines?',
    options: [
      'It automatically reduces the number of workers in Playwright',
      'It enables engineers and stakeholders to verify exactly which business requirements are covered by automated tests in test reports',
      'It disables git merge conflicts',
      'It compiles JavaScript into C++',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Requirements traceability provides visibility into automation coverage, proving that critical business requirements are verified on every commit.',
  },
  {
    id: 'q-7',
    questionNumber: 7,
    question: 'Which of the following is a classic temporal boundary edge case in date validation?',
    options: [
      'Selecting a checkout date that is exactly identical to the check-in date (0 nights)',
      'Clicking a button with the left mouse button',
      'Navigating to the home page',
      'Entering a password with 8 characters',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Same-day check-in and check-out is a classic boundary condition that many hotel systems reject, requiring explicit validation.',
  },
  {
    id: 'q-8',
    questionNumber: 8,
    question: 'How can you run only tests matching the tag @smoke from the terminal in Playwright?',
    options: [
      'npx playwright test --grep "@smoke"',
      'npx playwright test --only-tags "@smoke"',
      'npx playwright filter "@smoke"',
      'npx playwright execute --suite smoke',
    ],
    correctAnswerIndex: 0,
    explanation:
      'The --grep CLI option matches test titles and tags using string or regex filters.',
  },
  {
    id: 'q-9',
    questionNumber: 9,
    question: 'Why should test data generators include dynamic elements like Date.now() or random suffixes?',
    options: [
      'To prevent collision and state bleed when multiple tests run concurrently in parallel workers',
      'Because JavaScript numbers cannot exceed 100',
      'To prevent the browser from caching cookies',
      'Because Playwright fails if test usernames are shorter than 10 characters',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Parallel test workers executing concurrently will collide if they attempt to create users with the same static username or email. Dynamic suffixes ensure uniqueness.',
  },
  {
    id: 'q-10',
    questionNumber: 10,
    question: 'What is confirmation bias in the context of QA and test engineering?',
    options: [
      'The tendency to confirm code compilation before running tests',
      'The tendency of engineers to test only paths they expect to succeed, overlooking boundary flaws and edge cases',
      'The requirement for dual approval on pull requests',
      'Confirming test results with an email notification',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Confirmation bias leads engineers to test happy paths that confirm their mental model, blind to adversarial paths and edge-case failures.',
  },
];

export const PLAYWRIGHT_DAY_18_DATA: PlaywrightDay18Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 18,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'AI-Assisted Test Planning, Edge Cases and Test Data',
  subtitle:
    'Deconstruct complex user stories, discover hidden edge cases with adversarial AI prompting, and engineer safe synthetic data factories.',
  level: 'Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–17 concepts (Locators, web-first assertions, POM, API testing, and failure triage).',
  learningObjectives: [
    'Translate ambiguous PRDs and user stories into a structured, risk-weighted P0/P1/P2 scenario matrix.',
    'Overcome confirmation bias using adversarial AI prompts to discover concurrency, timezone, and boundary flaws.',
    'Design safe Test Data Factories generating dynamic, isolated synthetic fixtures using the RFC-reserved @example.com domain.',
    'Eliminate production PII and security compliance risks from test repositories.',
    'Implement living requirements traceability in Playwright using tags and annotations.',
    'Execute targeted requirement verification suites via Playwright CLI grep filtering.',
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
    { day: 17, title: 'Day 17: AI Debugging & Flaky-Test Analysis', focus: 'Root Cause Analysis, Deceptive AI Fixes', isCompleted: true },
    { day: 18, title: 'Day 18: AI-Assisted Test Planning & Synthetic Data', focus: 'Requirements to Tests, Edge Cases, Coverage Matrix', isCurrent: true },
    { day: 19, title: 'Day 19: Framework Quality & Playwright MCP', focus: 'Model Context Protocol, Safe AI Workflows' },
    { day: 20, title: 'Day 20: Final Project, Assessment & Interview Prep', focus: 'Capstone E-commerce Framework, Certification' },
  ],
  topics: PLAYWRIGHT_DAY_18_TOPICS,
  starterCode: PLAYWRIGHT_DAY_18_STARTER_CODE,
  starterExplanation: PLAYWRIGHT_DAY_18_STARTER_EXPLANATION,
  starterOutput: PLAYWRIGHT_DAY_18_STARTER_OUTPUT,
  evaluateAssignment: evaluateDay18Assignment,
  interviewQuestions: PLAYWRIGHT_DAY_18_INTERVIEW_QUESTIONS,
  quizQuestions: PLAYWRIGHT_DAY_18_QUIZ_QUESTIONS,
};
