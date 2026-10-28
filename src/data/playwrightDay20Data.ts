import type {
  PlaywrightDay20Unit,
  PlaywrightDay20AssignmentRubric,
  PlaywrightDayTopic,
  PlaywrightInterviewQuestion,
  PlaywrightQuizQuestion,
  PlaywrightFinalAssessmentQuestion,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_20_TOPICS: PlaywrightDayTopic[] = [
  {
    id: 'topic-1',
    topicNumber: 1,
    title: 'Topic 1: Capstone Framework Architecture & Requirements Decomposition',
    durationMinutes: 30,
    explanation: `Today, you synthesize everything you have mastered across 19 days into a complete, industry-standard E-Commerce Automation Framework (RootCart Enterprise Suite).

The 12 Capstone Engineering Milestones:
1. Modular Architecture: Clean separation between Page Objects, Test Specs, Fixtures, and Config.
2. Standardized Configuration: playwright.config.js with multi-project cross-browser definitions and trace retention.
3. Session Authentication & Isolation: Pre-authenticated storageState session caching with zero test-to-test leakage.
4. Clean Page Object Model: Reusable, atomic ES6 Page classes for Login, Inventory, Cart, and Checkout.
5. Accessible Locator Discipline: 100% semantic getByRole, getByLabel, and getByTestId locators.
6. Hybrid UI + API Verification: Direct REST API status verification paired with browser user actions.
7. Negative & Boundary Validation: Validating empty carts, payment card declines, and stock limits.
8. Synthetic Data Factories: Isolated test fixtures with unique timestamps and @example.com domains.
9. Web-First Auto-Waiting: Zero arbitrary waitForTimeout() calls; 100% event-driven synchronization.
10. CI/CD Pipeline Integration: Production-ready GitHub Actions YAML with browser installation and artifact upload.
11. AI Quality Defense & Audit: Documented rationale of AI-suggested patterns accepted vs rejected.
12. Definitive Execution Evidence: Deterministic passing test runs with structured HTML and trace reporting.`,
    keyTakeaways: [
      'The Capstone integrates all 19 preceding days into a single production-grade repository.',
      'Fulfill all 12 milestones to demonstrate professional Playwright mastery.',
      'Maintain pure modern JavaScript (.js) and strict semantic locator hygiene.',
    ],
    terminology: [
      {
        term: 'Capstone Architecture',
        definition: 'A comprehensive, production-grade test suite demonstrating end-to-end integration of POM, API, auth state, and CI/CD.',
      },
      {
        term: 'Enterprise Readiness',
        definition: 'Quality characteristics ensuring test suites scale across parallel workers with high determinism and low maintenance cost.',
      },
    ],
    examples: [
      {
        title: 'Capstone Repository Architecture',
        description: 'Complete directory layout of the RootCart Enterprise Suite.',
        codeSnippet: `/**
 * rootcart-playwright-framework/
 * ├── .github/workflows/playwright.yml
 * ├── config/playwright.config.js
 * ├── fixtures/authFixture.js
 * ├── pages/
 * │   ├── LoginPage.js
 * │   ├── InventoryPage.js
 * │   ├── CartPage.js
 * │   └── CheckoutPage.js
 * ├── test-data/orderFactory.js
 * └── tests/
 *     ├── e2e/checkout-flow.spec.js
 *     └── api/inventory-api.spec.js
 */`,
      },
    ],
    exercise: {
      id: 'ex-1',
      title: 'Authentication Strategy',
      prompt: 'In an enterprise e-commerce Playwright framework, what is the primary benefit of testing the checkout flow using pre-authenticated storageState rather than logging in via the UI in every test?',
      options: [
        'It reduces test execution time by 60-80% and eliminates repeated authentication flakiness across the suite',
        'It allows tests to run without an active internet connection',
        'It converts CSS selectors into XPath automatically',
        'It bypasses all credit card payment fees',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Reusing an authenticated browser state saves several seconds on every test, dramatically speeding up CI runs and removing login UI flakiness from checkout tests.',
    },
  },
  {
    id: 'topic-2',
    topicNumber: 2,
    title: 'Topic 2: Page Object Engineering & Data Flow in E-Commerce',
    durationMinutes: 30,
    explanation: `In complex user journeys (e.g. searching catalog -> adding to cart -> entering shipping address -> paying -> receiving order confirmation), naive scripts quickly become unreadable tangles of selectors.

By engineering interconnected Page Objects, each page exposes clean, high-level business methods:
1. Locators as Properties: Initialize all locators in the constructor. Never reconstruct locators repeatedly inside methods.
2. Single Responsibility: InventoryPage handles catalog operations; CheckoutPage handles addresses and payments.
3. Assertions in Specs: Page Objects should NOT contain hardcoded test assertions. Assertions belong in the .spec.js file so tests remain self-documenting.`,
    keyTakeaways: [
      'Page Objects should encapsulate element queries and user actions, leaving assertions in test specs.',
      'Initialize locators once in the class constructor as accessible locators.',
      'Pass structured data objects (e.g. shipping address) into page methods rather than long parameter lists.',
    ],
    terminology: [
      {
        term: 'Single Responsibility Principle (SRP)',
        definition: 'Each Page Object class is responsible solely for the interactions and locators of a single discrete page or component.',
      },
      {
        term: 'Declarative Test Spec',
        definition: 'A test script that clearly states what actions occur and what outcomes are asserted without low-level selector boilerplate.',
      },
    ],
    examples: [
      {
        title: 'Declarative Checkout Interaction',
        description: 'Executing clean multi-step checkout through coordinated Page Object methods.',
        codeSnippet: `const inventory = new InventoryPage(page);
const cart = new CartPage(page);
const checkout = new CheckoutPage(page);

await inventory.navigate();
await inventory.addProductToCart('Developer Keyboard');
await inventory.goToCart();
await cart.proceedToCheckout();
await checkout.completeCheckout(orderData);`,
      },
    ],
    exercise: {
      id: 'ex-2',
      title: 'Assertion Placement',
      prompt: 'Why should test assertions (await expect(...)) reside inside .spec.js test files rather than inside Page Object class methods?',
      options: [
        'Because JavaScript classes cannot access the @playwright/test package',
        'To keep test specifications readable, self-documenting, and adaptable to varying test scenarios without bloating Page Objects with custom assertion methods',
        'Because Playwright runs 5 times faster when assertions are in spec files',
        'To prevent GitHub Actions from failing during pull request validation',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Keeping assertions in test files ensures the test clearly declares what business outcomes it expects to verify, while Page Objects simply provide interaction abstractions.',
    },
  },
  {
    id: 'topic-3',
    topicNumber: 3,
    title: 'Topic 3: Hybrid UI + API Verification in E-Commerce',
    durationMinutes: 30,
    explanation: `UI-only tests have a major blind spot: just because a UI displays a green checkmark saying "Order Placed", it does not guarantee that the backend database record was correctly persisted or that warehouse inventory was decremented.

A Hybrid Test verifies both:
1. User Experience: The customer sees proper feedback, order numbers, and receipts in the browser.
2. Backend Integrity: Direct REST API calls verify that the order exists in the backend with status CONFIRMED and inventory is reduced by 1.

Use the native Playwright request fixture to perform HTTP GET requests against the backend using the order ID parsed from the UI badge.`,
    keyTakeaways: [
      'Hybrid testing validates customer-facing UI and backend API contract integrity together.',
      'Use Playwright native request fixture to query endpoints directly within browser test specs.',
      'Extract dynamic UI values (order IDs) to verify backend database records.',
    ],
    terminology: [
      {
        term: 'Hybrid Testing',
        definition: 'Architectural pattern combining browser UI interactions with direct backend HTTP requests within the same test spec.',
      },
      {
        term: 'State Verification',
        definition: 'Querying backend data stores via REST endpoints to guarantee data persistence after frontend interactions.',
      },
    ],
    examples: [
      {
        title: 'Hybrid Order Validation',
        description: 'Extracting order ID from DOM and querying REST endpoint directly.',
        codeSnippet: `const orderId = await checkout.orderIdBadge.innerText();
const apiResponse = await request.get(\`/api/v1/orders/\${orderId}\`);
expect(apiResponse.status()).toBe(200);
const orderData = await apiResponse.json();
expect(orderData.status).toBe('CONFIRMED');`,
      },
    ],
    exercise: {
      id: 'ex-3',
      title: 'Hybrid Testing Value',
      prompt: 'What is the primary advantage of validating an order via a backend API request in addition to verifying the UI confirmation page?',
      options: [
        'It tests backend database persistence, status codes, and payload integrity directly, catching silent data loss defects that the UI might not surface',
        'It allows the browser to run without a display server',
        'It prevents the application from consuming server memory',
        'It bypasses the need for GitHub Actions',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Hybrid validation ensures that backend state mutations (order creation, payment receipt, inventory reduction) truly occurred, rather than relying solely on cosmetic frontend UI banners.',
    },
  },
  {
    id: 'topic-4',
    topicNumber: 4,
    title: 'Topic 4: The AI Engineering Quality Audit & Final Defense',
    durationMinutes: 30,
    explanation: `A Senior Automation Architect must not only write code, but also defend architectural decisions during engineering reviews, interviews, and audits.

When defending your Capstone Framework, be prepared to answer:
1. Why did you choose getByRole over CSS class selectors?
   Accessible roles test software the way assistive technologies and users experience it, and survive design system refactors.
2. Why avoid global retries (retries: 5)?
   Excessive retries mask real race conditions, triple CI pipeline runtimes, and hide production bugs.
3. How do you ensure zero state pollution across parallel workers?
   Every test creates synthetic, timestamped test data with isolated credentials and independent browser contexts.
4. How did you leverage AI responsibly?
   Used AI for prompt-based edge case discovery and boilerplate extraction, but rigorously audited all code, rejecting arbitrary sleeps, weakened assertions, and hallucinated APIs.`,
    keyTakeaways: [
      'Be prepared to justify every locator, synchronization method, and architectural choice.',
      'Demonstrate that your framework is resilient, scalable, and independent across parallel workers.',
      'Document AI contributions and explain why specific AI recommendations were accepted or rejected.',
    ],
    terminology: [
      {
        term: 'Architectural Defense',
        definition: 'The ability to articulate engineering rationale, evaluate trade-offs, and justify framework design choices.',
      },
      {
        term: 'Defect Escape Rate',
        definition: 'The percentage of bugs discovered in production by end users versus caught by automated pre-release test suites.',
      },
    ],
    examples: [
      {
        title: 'Framework Defense Scorecard',
        description: 'Key architectural metrics presented during framework review.',
        codeSnippet: `// 1. Locators: 100% getByRole / getByLabel / getByTestId
// 2. Synchronization: 100% web-first auto-waiting
// 3. Modularity: Reusable Page Objects and custom fixtures
// 4. Traceability: Living tags linking tests to requirements
// 5. Reliability: Passes 20 repeat runs without intermittent failures`,
      },
    ],
    exercise: {
      id: 'ex-4',
      title: 'Defending Accessible Roles',
      prompt: 'During an architecture review, an engineer asks: "Why not use page.waitForSelector(\'.submit-btn\') instead of page.getByRole(\'button\', { name: \'Submit\' })?" What is the most accurate technical response?',
      options: [
        'CSS classes frequently change during UI redesigns and do not test user accessibility, whereas getByRole tests the semantic role and accessible name, providing resilient auto-waiting',
        'page.waitForSelector was permanently deleted from Playwright in version 1.0',
        'CSS selectors only work on Windows operating systems',
        'getByRole automatically writes unit tests in the background',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Accessible role locators reflect the real user experience, align with W3C accessibility guidelines, and do not break when CSS styling or class names are updated.',
    },
  },
];

export const PLAYWRIGHT_DAY_20_STARTER_CODE = `// ============================================================================
// ROOTACCESS PLAYWRIGHT AUTOMATION — DAY 20 CAPSTONE PROJECT
// RootCart Enterprise Automation Framework (Production-Grade E-Commerce)
// ============================================================================
// Milestones Satisfied in this Suite:
// 1. Modular Architecture (Page Objects for Inventory, Cart, Checkout)
// 2. Semantic Accessible Locators (getByRole, getByLabel, getByTestId)
// 3. Web-First Auto-Waiting Assertions (Zero arbitrary timeouts)
// 4. Hybrid UI + API State Verification
// 5. Negative & Boundary Error Validation (Empty cart, invalid payment)
// 6. Synthetic Test Data Factory
// 7. Test Isolation & Independent State
// ============================================================================

import { test, expect } from '@playwright/test';

export function generateCustomerOrder(overrides = {}) {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);

  return {
    fullName: \`Test Buyer \${randomSuffix}\`,
    email: \`buyer_\${timestamp}_\${randomSuffix}@example.com\`,
    address: '100 Innovation Way',
    city: 'San Francisco',
    zipCode: '94105',
    cardNumber: '4111222233334444',
    expiry: '12/28',
    cvv: '888',
    ...overrides,
  };
}

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Products Catalog' });
    this.cartLink = page.getByRole('link', { name: 'Shopping Cart' });
    this.cartBadge = page.getByTestId('cart-count-badge');
  }

  async navigate() {
    await this.page.goto('/shop/catalog');
    await expect(this.heading).toBeVisible();
  }

  async addProductToCart(productName) {
    const productCard = this.page.getByRole('article', { name: productName });
    await productCard.getByRole('button', { name: 'Add to Cart' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

export class CartPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Your Cart' });
    this.cartItems = page.getByTestId('cart-item-row');
    this.checkoutButton = page.getByRole('button', { name: 'Proceed to Checkout' });
    this.emptyCartMessage = page.getByRole('status', { name: 'Cart is empty' });
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByLabel('Full Name');
    this.emailInput = page.getByLabel('Email Address');
    this.addressInput = page.getByLabel('Shipping Address');
    this.cityInput = page.getByLabel('City');
    this.zipInput = page.getByLabel('Postal Code');
    this.cardNumberInput = page.getByLabel('Card Number');
    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.confirmationHeading = page.getByRole('heading', { name: 'Order Confirmed!' });
    this.orderIdBadge = page.getByTestId('confirmed-order-id');
    this.errorMessage = page.getByRole('alert');
  }

  async completeCheckout(customer) {
    await this.nameInput.fill(customer.fullName);
    await this.emailInput.fill(customer.email);
    await this.addressInput.fill(customer.address);
    await this.cityInput.fill(customer.city);
    await this.zipInput.fill(customer.zipCode);
    await this.cardNumberInput.fill(customer.cardNumber);
    await this.placeOrderButton.click();
  }
}

test.describe('RootCart Enterprise E-Commerce Automation Suite', () => {

  test('E2E-01: End-to-end checkout with hybrid API verification', async ({ page, request }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const orderData = generateCustomerOrder();

    await inventory.navigate();
    await inventory.addProductToCart('Developer Ergonomic Keyboard');
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.goToCart();
    await expect(cart.cartItems).toHaveCount(1);
    await cart.proceedToCheckout();

    await checkout.completeCheckout(orderData);

    await expect(checkout.confirmationHeading).toBeVisible();
    await expect(checkout.orderIdBadge).toBeVisible();
    const orderId = await checkout.orderIdBadge.innerText();
    expect(orderId).toMatch(/^ORD-[A-Z0-9]{6}$/);

    const apiResponse = await request.get(\`/api/v1/orders/\${orderId}\`, {
      headers: { Authorization: 'Bearer <REDACTED_TEST_TOKEN>' }
    });
    expect(apiResponse.status()).toBe(200);
    const responseBody = await apiResponse.json();
    expect(responseBody.status).toBe('CONFIRMED');
    expect(responseBody.customerEmail).toBe(orderData.email);
  });

  test('E2E-02: Negative validation on invalid payment card details', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const invalidOrder = generateCustomerOrder({ cardNumber: '0000000000000000' });

    await inventory.navigate();
    await inventory.addProductToCart('Developer Ergonomic Keyboard');
    await inventory.goToCart();
    await cart.proceedToCheckout();

    await checkout.completeCheckout(invalidOrder);

    await expect(checkout.errorMessage).toBeVisible();
    await expect(checkout.errorMessage).toContainText('Invalid card number or transaction declined');
  });

  test('E2E-03: Prevents checkout progression when cart is empty', async ({ page }) => {
    await page.goto('/shop/cart');
    const cart = new CartPage(page);

    await expect(cart.emptyCartMessage).toBeVisible();
    await expect(cart.checkoutButton).toBeDisabled();
  });
});
`;

export const PLAYWRIGHT_DAY_20_STARTER_EXPLANATION = `### Day 20 Capstone: RootCart Enterprise Automation Framework

#### 1. Architectural Overview & Milestones
- **Modular Page Objects**: Created InventoryPage, CartPage, and CheckoutPage encapsulating element queries and atomic interactions with 100% accessible locators (getByRole, getByLabel, getByTestId).
- **Hybrid UI + API Verification**: Extracted the generated orderId from the confirmed order UI badge and immediately validated the order contract state and customer email against the backend REST endpoint (GET /api/v1/orders/{orderId}).
- **Negative & Boundary Robustness**: Verified payment failure states with declined card numbers and validated that an empty cart properly disables the checkout button.
- **Isolated Synthetic Data**: Built generateCustomerOrder() leveraging timestamps and unique random suffixes, guaranteeing zero race conditions during parallel execution.

#### 2. AI Engineering Audit & Quality Defense
- **Accepted AI Suggestions**: Rapid generation of realistic credit card format templates and initial Page Object method stubs.
- **Rejected AI Suggestions**: Rejected an AI recommendation to add page.waitForTimeout(3000) after checkout submission, replacing it with native web-first assertion await expect(checkout.confirmationHeading).toBeVisible().
- **Rejected Assertion Weakening**: Rejected an AI suggestion to change the order ID regex check to a generic orderId.length > 0 check, maintaining strict format enforcement (^ORD-[A-Z0-9]{6}$).
`;

export const PLAYWRIGHT_DAY_20_STARTER_OUTPUT = `Running 3 tests using 2 workers
[chromium] › day20-capstone.spec.js:103:3 › RootCart Enterprise E-Commerce Automation Suite › E2E-01: End-to-end checkout with hybrid API verification
  ✓  [chromium] › E2E-01: End-to-end checkout with hybrid API verification (1.8s)
[chromium] › day20-capstone.spec.js:140:3 › RootCart Enterprise E-Commerce Automation Suite › E2E-02: Negative validation on invalid payment card details
  ✓  [chromium] › E2E-02: Negative validation on invalid payment card details (1.1s)
[chromium] › day20-capstone.spec.js:156:3 › RootCart Enterprise E-Commerce Automation Suite › E2E-03: Prevents checkout progression when cart is empty
  ✓  [chromium] › E2E-03: Prevents checkout progression when cart is empty (680ms)

  3 passed (3.6s)
`;

export function evaluateDay20Assignment(
  code: string,
  output: string,
  explanation: string
): PlaywrightDay20AssignmentRubric {
  const criteria: PlaywrightDay20AssignmentRubric['criteria'] = [];
  const feedback: string[] = [];

  const implementsEcommerceWorkflows =
    /addProductToCart|goToCart|completeCheckout|checkout/i.test(code);
  criteria.push({
    id: 'c1',
    title: 'Implements Core E-Commerce Workflows',
    passed: implementsEcommerceWorkflows,
    feedback: implementsEcommerceWorkflows
      ? 'Catalog browse, cart, and checkout workflows implemented.'
      : 'Implement e-commerce browse, cart, and checkout flows.',
  });

  const usesSemanticLocators =
    /getByRole|getByLabel|getByTestId/i.test(code) && !/xpath|css-selector/.test(code);
  criteria.push({
    id: 'c2',
    title: 'Uses Semantic Accessible Locators',
    passed: usesSemanticLocators,
    feedback: usesSemanticLocators
      ? 'Clean accessible locators used throughout Page Objects and tests.'
      : 'Use accessible role, label, and testid locators.',
  });

  const implementsPageObjectModel =
    /class InventoryPage.*class CartPage.*class CheckoutPage/s.test(code);
  criteria.push({
    id: 'c3',
    title: 'Implements Modular Page Object Model Classes',
    passed: implementsPageObjectModel,
    feedback: implementsPageObjectModel
      ? 'InventoryPage, CartPage, and CheckoutPage classes implemented.'
      : 'Implement separate Page Object classes for Inventory, Cart, and Checkout.',
  });

  const incorporatesApiVerification =
    /request\.get|apiResponse|status\(\)\)\.toBe\(200\)/.test(code);
  criteria.push({
    id: 'c4',
    title: 'Incorporates Hybrid UI + API State Verification',
    passed: incorporatesApiVerification,
    feedback: incorporatesApiVerification
      ? 'Backend API verification integrated using request fixture.'
      : 'Verify backend order state via request fixture in test spec.',
  });

  const maintainsStorageStateAuth =
    /auth|buyer|generateCustomerOrder|token|customerEmail/i.test(code + explanation);
  criteria.push({
    id: 'c5',
    title: 'Maintains Session Authentication & Test Isolation',
    passed: maintainsStorageStateAuth,
    feedback: maintainsStorageStateAuth
      ? 'Session authentication and test isolation documented/implemented.'
      : 'Demonstrate session management or isolated authenticated user workflows.',
  });

  const ensuresTestIndependence =
    /generateCustomerOrder|Date\.now\(\)|timestamp/i.test(code);
  criteria.push({
    id: 'c6',
    title: 'Ensures Test Independence with Synthetic Data',
    passed: ensuresTestIndependence,
    feedback: ensuresTestIndependence
      ? 'Synthetic data factory generates unique fixtures per test.'
      : 'Use dynamic synthetic data to ensure tests are completely independent.',
  });

  const configuresCiPipelineAndReports =
    /github actions|ci|pipeline|workflow|reporter|trace/i.test(explanation);
  criteria.push({
    id: 'c7',
    title: 'Documents CI Pipeline & Trace Reporting Integration',
    passed: configuresCiPipelineAndReports,
    feedback: configuresCiPipelineAndReports
      ? 'CI/CD pipeline and trace configuration documented.'
      : 'Document CI/CD pipeline integration and artifact reporting.',
  });

  const documentsAiAuditDecisions =
    /ai.*audit|rejected|accepted|anti-pattern|sleep/i.test(explanation);
  criteria.push({
    id: 'c8',
    title: 'Documents AI Quality Audit & Defense Decisions',
    passed: documentsAiAuditDecisions,
    feedback: documentsAiAuditDecisions
      ? 'Detailed rationale of accepted and rejected AI suggestions provided.'
      : 'Document accepted vs rejected AI recommendations and engineering rationale.',
  });

  const satisfiesTwelveMilestones =
    /milestone|e2e-01|e2e-02|e2e-03/i.test(code + explanation) && /3 passed/i.test(output);
  criteria.push({
    id: 'c9',
    title: 'Satisfies Capstone Milestones with Passing Output',
    passed: satisfiesTwelveMilestones,
    feedback: satisfiesTwelveMilestones
      ? 'Capstone milestones verified with clean passing test output.'
      : 'Include verified execution output demonstrating passing tests.',
  });

  const syntacticallyValidJavaScript =
    !code.includes(': string') && !code.includes(': number') && code.includes('export class');
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
    feedback.push(`Congratulations! You scored ${score}/10 on the Day 20 Capstone Project.`);
  } else {
    feedback.push(`Score: ${score}/10. Please address the failing criteria above to meet the 8/10 threshold.`);
  }

  return {
    score,
    feedback,
    passed,
    criteria,
    implementsEcommerceWorkflows,
    usesSemanticLocators,
    implementsPageObjectModel,
    incorporatesApiVerification,
    maintainsStorageStateAuth,
    ensuresTestIndependence,
    configuresCiPipelineAndReports,
    documentsAiAuditDecisions,
    satisfiesTwelveMilestones,
    syntacticallyValidJavaScript,
  };
}

export const PLAYWRIGHT_DAY_20_INTERVIEW_QUESTIONS: PlaywrightInterviewQuestion[] = [
  {
    id: 'iq-1',
    questionNumber: 1,
    question: 'How do you structure an enterprise-grade Playwright automation repository from scratch?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Architecture, modular directory design, and maintainability',
    modelAnswer:
      'I organize the repository into distinct architectural layers: config/ holds environment-specific playwright.config.js files; pages/ contains encapsulated Page Object classes with locators as constructor properties and user interaction methods; fixtures/ extends Playwright test with pre-authenticated storageState and API clients; test-data/ provides synthetic data factories with dynamic unique identifiers; tests/ organizes specs into e2e/, api/, and smoke/ directories; and .github/workflows/ defines the CI pipeline with Playwright installation and artifact uploading.',
    followUpQuestion: 'Where would you store global constants and environment URLs?',
  },
  {
    id: 'iq-2',
    questionNumber: 2,
    question: 'What is the difference between page.locator() and page.$(selector) in Playwright?',
    difficulty: 'Beginner',
    assessmentFocus: 'Playwright locator architecture vs legacy ElementHandle',
    modelAnswer:
      'page.$(selector) is an obsolete, legacy method that queries the DOM immediately and returns an ElementHandle or null. If the element is not yet rendered, it immediately fails without waiting. In contrast, page.locator() creates a lazy representation of the element that does not query the DOM until an action or assertion is invoked. When invoked, locators automatically perform auto-waiting and actionability checks, eliminating race conditions.',
    followUpQuestion: 'Why does the official Playwright documentation explicitly discourage using ElementHandle?',
  },
  {
    id: 'iq-3',
    questionNumber: 3,
    question: 'How does Playwright’s auto-waiting mechanism work under the hood during a click() action?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Actionability checks, auto-waiting, and internal engine operations',
    modelAnswer:
      'Before performing a click, Playwright performs an automated battery of actionability checks on the target element: 1) Attached (element is connected to the DOM), 2) Visible (element is non-empty and not hidden by CSS), 3) Stable (element has finished CSS transitions/animations), 4) Receives Events (element is not obscured by modals, overlays, or spinners), and 5) Enabled (element does not have the disabled attribute). If any check fails, Playwright retries continuously until timeout.',
    followUpQuestion: 'What happens if an element is perpetually covered by a sticky cookie banner?',
  },
  {
    id: 'iq-4',
    questionNumber: 4,
    question: 'Explain how Playwright manages browser contexts and why they make tests faster than Selenium Webdriver.',
    difficulty: 'Intermediate',
    assessmentFocus: 'Browser contexts, process management, and test isolation speed',
    modelAnswer:
      'In traditional tools like Selenium, isolating test state required launching a completely new browser instance (process) for every test, taking 3–5 seconds per test. Playwright launches a single Browser process once, and creates lightweight, isolated BrowserContext instances for each test in under 20 milliseconds. A BrowserContext is completely sandboxed with its own cookies, localStorage, session cache, and permissions—offering multi-tenant isolation with near-instantaneous creation speed.',
    followUpQuestion: 'Can multiple browser contexts communicate with each other?',
  },
  {
    id: 'iq-5',
    questionNumber: 5,
    question: 'How do you implement authentication reuse in Playwright using storageState?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Session reuse, storageState setup projects, and auth optimization',
    modelAnswer:
      'I configure a dedicated setup project (e.g. auth.setup.js) in playwright.config.js. This setup test navigates to the login page once, authenticates using environment secrets, and calls await page.context().storageState({ path: ".auth/user.json" }) to serialize cookies and localStorage to disk. All subsequent test projects configure use: { storageState: ".auth/user.json" }, starting each test already authenticated without repeating the UI login form in every single test.',
    followUpQuestion: 'How do you handle tests that specifically need to test invalid login credentials?',
  },
  {
    id: 'iq-6',
    questionNumber: 6,
    question: 'Why should you prefer getByRole over CSS classes or XPath locators?',
    difficulty: 'Beginner',
    assessmentFocus: 'Accessible locator strategy, W3C standards, and DOM resilience',
    modelAnswer:
      'getByRole locates elements based on their accessible semantic role (button, heading, combobox) and accessible name as perceived by assistive technologies. This makes tests resilient to CSS refactors, styling updates, and markup changes. Furthermore, using getByRole guarantees that your application is accessible to all users; if Playwright cannot find a button by its role, a screen reader user cannot find it either.',
    followUpQuestion: 'How does the Playwright strict mode interact with getByRole?',
  },
  {
    id: 'iq-7',
    questionNumber: 7,
    question: 'How do you handle and debug a flaky test in Playwright?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'Trace Viewer analysis, flakiness triage, and asynchronous race conditions',
    modelAnswer:
      'First, I reproduce the flakiness locally by running the test with npx playwright test --repeat-each=20 --trace=on. Next, I inspect the Playwright Trace Viewer to analyze the actionability logs, network waterfall, and DOM snapshots leading up to the failure. Common root causes include client-side hydration lags, missing await on assertions, or race conditions with animations. I resolve the root cause using web-first assertions or event listeners (page.waitForResponse), and strictly reject arbitrary sleeps.',
    followUpQuestion: 'What CLI flags would you pass to debug a test in headed mode with slow motion?',
  },
  {
    id: 'iq-8',
    questionNumber: 8,
    question: 'How does Playwright execute API testing, and what are the benefits of combining API and UI tests?',
    difficulty: 'Intermediate',
    assessmentFocus: 'APIRequestContext, hybrid testing, and state seeding',
    modelAnswer:
      'Playwright provides the native request fixture (APIRequestContext) to dispatch HTTP methods (get, post, put, delete) directly within tests. Combining UI and API testing enables Hybrid testing: you can use the API to quickly seed complex preconditions (creating users, loading shopping carts) in milliseconds, execute the critical UI interaction in the browser, and then verify the backend state mutation via API, maximizing speed and test coverage.',
    followUpQuestion: 'Can an APIRequestContext share the same cookies and session as a BrowserContext?',
  },
  {
    id: 'iq-9',
    questionNumber: 9,
    question: 'How do you configure Playwright tests to run in a continuous integration (CI) pipeline like GitHub Actions?',
    difficulty: 'Intermediate',
    assessmentFocus: 'CI/CD pipeline configuration, Linux headless dependencies, and artifacts',
    modelAnswer:
      'I create a workflow YAML file triggered on push and pull_request. The pipeline checks out the repository, sets up Node.js with dependency caching, installs dependencies via npm ci, and installs Playwright browser binaries with system dependencies via npx playwright install --with-deps. It then executes tests using npx playwright test, and uses actions/upload-artifact with if: always() to archive the HTML report and traces so developers can triage failures directly.',
    followUpQuestion: 'Why is the --with-deps flag essential on Linux CI runners?',
  },
  {
    id: 'iq-10',
    questionNumber: 10,
    question: 'How do you prevent state pollution when running tests in parallel across 4 or 8 workers?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'Parallelism, test isolation, and synthetic data uniqueness',
    modelAnswer:
      'By adhering to strict test independence: 1) Each test creates its own unique synthetic data fixtures using dynamic timestamps or UUIDs rather than relying on shared static accounts. 2) Tests never depend on the execution order or side effects of other tests. 3) If database records are created, they use unique tenant identifiers or are cleaned up via API/fixtures in teardown hooks.',
    followUpQuestion: 'What happens if two parallel tests attempt to modify the same user profile concurrently?',
  },
  {
    id: 'iq-11',
    questionNumber: 11,
    question: 'What is the purpose of test.describe.configure({ mode: "serial" }) and when should it be avoided?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Serial execution, worker allocation, and anti-pattern avoidance',
    modelAnswer:
      'serial mode forces tests within a test.describe block to run sequentially on the same worker, and if one test fails, all subsequent tests in the block are skipped. While useful for rare multi-step setup workflows, it should generally be avoided because it creates interdependent tests, prevents parallelization, and encourages bad architectural practices where tests rely on shared state.',
    followUpQuestion: 'How does serial mode differ from test.describe.parallel?',
  },
  {
    id: 'iq-12',
    questionNumber: 12,
    question: 'How do you intercept, mock, or modify network requests in Playwright?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Network route mocking, route.fulfill, and abort testing',
    modelAnswer:
      'Using page.route(urlPattern, routeHandler). Inside the route handler, you can call route.fulfill() to return mock JSON responses or status codes without hitting the real backend, route.abort() to simulate network failures, or route.continue() with modified headers or payloads. This enables fast, isolated UI testing against flaky or unbuilt third-party microservices.',
    followUpQuestion: 'How would you mock a 500 Internal Server Error for a specific payment endpoint?',
  },
  {
    id: 'iq-13',
    questionNumber: 13,
    question: 'What is the Model Context Protocol (MCP) and how does it interface with Playwright in AI-assisted engineering?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'Autonomous testing, Model Context Protocol, and agentic workflows',
    modelAnswer:
      'Model Context Protocol (MCP) is an open standard that allows AI agents and LLMs to interface with tools. In Playwright MCP, the browser exposes standardized tools (e.g. navigate_page, click_element, get_accessibility_tree) via JSON-RPC. AI agents use these tools to inspect page accessibility trees, reason about application state, and autonomously execute browser actions with built-in security guardrails.',
    followUpQuestion: 'What security boundaries must be enforced when an autonomous AI agent controls a browser?',
  },
  {
    id: 'iq-14',
    questionNumber: 14,
    question: 'What are the risks of blindly accepting AI-generated automation code, and how do you review it?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'AI code review, anti-pattern detection, and engineering rigor',
    modelAnswer:
      'Generative AI models often suggest deceptive anti-patterns to make tests pass: adding arbitrary sleeps (page.waitForTimeout), weakening assertions (expect(count).toBeGreaterThan(0)), swallowing errors with empty try/catch blocks, or hallucinating non-existent Playwright methods. I review AI code using a 4-step rubric: verify semantic role locators, confirm web-first auto-waiting assertions, check for proper async/await handling, and test against the real application.',
    followUpQuestion: 'Give an example of a hallucinated Playwright API that an LLM might generate.',
  },
  {
    id: 'iq-15',
    questionNumber: 15,
    question: 'How do you handle multi-tab workflows, iframes, and browser native dialogs in Playwright?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Complex browser interactions: popups, iframes, and JavaScript dialogs',
    modelAnswer:
      'For new tabs: use const [newPage] = await Promise.all([context.waitForEvent("page"), button.click()]). For iframes: use page.frameLocator(selector) to drill into nested DOMs with auto-waiting. For native browser dialogs (alert, confirm, prompt): register a listener before the triggering action: page.on("dialog", dialog => dialog.accept()).',
    followUpQuestion: 'What happens if you do not register a dialog listener and an alert appears in Playwright?',
  },
  {
    id: 'iq-16',
    questionNumber: 16,
    question: 'How do you handle file uploads and downloads cleanly in Playwright?',
    difficulty: 'Beginner',
    assessmentFocus: 'File system interaction, setInputFiles, and download event promises',
    modelAnswer:
      'For file uploads: use await page.getByLabel("Upload").setInputFiles("path/to/file.pdf") which works directly without opening native OS file picker dialogs. For downloads: register const [download] = await Promise.all([page.waitForEvent("download"), downloadButton.click()]), then save or verify the downloaded file using await download.saveAs("target/path").',
    followUpQuestion: 'How do you test an upload button that is hidden or styled as display: none?',
  },
  {
    id: 'iq-17',
    questionNumber: 17,
    question: 'How do you parameterize tests in Playwright JavaScript to achieve Data-Driven Testing?',
    difficulty: 'Beginner',
    assessmentFocus: 'Data-driven testing, iteration loops, and dynamic test naming',
    modelAnswer:
      'In JavaScript, I define an array of test data objects (or load from JSON) and iterate over them using for (const data of datasets) { test(\`tests \${data.title}\`, async ({ page }) => { ... }); }. This dynamically generates distinct, named test cases in the test runner, allowing each dataset to pass, fail, and retry independently with clear reporting.',
    followUpQuestion: 'How does Playwright report test titles when tests are parameterized in a loop?',
  },
  {
    id: 'iq-18',
    questionNumber: 18,
    question: 'What is the difference between toBeVisible() and toHaveCount(1) in Playwright assertions?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Web-first assertions, visibility geometry, and strict mode',
    modelAnswer:
      'toBeVisible() asserts that a single element is rendered in the DOM, has non-zero geometry, and is not hidden by CSS display: none, visibility: hidden, or opacity. If multiple elements match the locator, toBeVisible() throws a strict mode violation error. In contrast, toHaveCount(1) asserts that exactly one DOM node matches the locator, regardless of whether that element is currently visible on screen.',
    followUpQuestion: 'When would you use toBeAttached() instead of toBeVisible()?',
  },
  {
    id: 'iq-19',
    questionNumber: 19,
    question: 'How do you capture and inspect performance metrics or console errors during a Playwright test run?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Browser console telemetry, pageerror listeners, and performance API',
    modelAnswer:
      'To capture console errors: listen to page.on("console", msg => { if (msg.type() === "error") errors.push(msg.text()); }) and page.on("pageerror", err => pageErrors.push(err)), asserting that the array is empty at the end of the test. For performance, evaluate window.performance.timing or performance.getEntriesByType("navigation") via await page.evaluate() to check load times and Web Vitals.',
    followUpQuestion: 'How can unhandled JavaScript errors in the browser be asserted in automated tests?',
  },
  {
    id: 'iq-20',
    questionNumber: 20,
    question: 'As a Senior Automation Engineer, how do you measure and report the ROI of your automation framework to engineering leadership?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'Automation leadership, business value metrics, and executive communication',
    modelAnswer:
      'I measure ROI across four key dimensions: 1) Release Velocity (reducing regression cycle time from days to minutes in CI), 2) Defect Escape Rate (percentage of bugs caught in pre-production automation vs discovered by customers), 3) Pipeline Reliability (flakiness rate kept below 1%, high developer trust), and 4) Cost & Time Savings (engineering hours saved compared to manual regression passes). I communicate these metrics through living requirements traceability and CI/CD trend reports.',
    followUpQuestion: 'What steps do you take when developers start ignoring automated test failures in CI?',
  },
];

export const PLAYWRIGHT_DAY_20_QUIZ_QUESTIONS: PlaywrightQuizQuestion[] = [
  {
    id: 'q-1',
    questionNumber: 1,
    question: 'What is the primary role of a Page Object in an enterprise automation framework?',
    options: [
      'To execute SQL migrations on the production server',
      'To encapsulate element locators and user interaction workflows for a specific page or component, keeping test specs declarative',
      'To compile TypeScript into JavaScript',
      'To manage Docker container networking',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Page Objects abstract the UI structure away from tests, enabling modularity and maintainability.',
  },
  {
    id: 'q-2',
    questionNumber: 2,
    question: 'Why should test assertions stay inside test specs rather than inside Page Object methods?',
    options: [
      'Because Page Objects cannot import the expect library',
      'To keep tests readable and flexible, allowing different tests to assert different outcomes on the same page actions',
      'Because Playwright disables screenshots if assertions are inside classes',
      'To decrease the size of the node_modules folder',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Keeping assertions in test specs makes tests self-documenting and allows reusable Page Object methods to serve varied validation scenarios.',
  },
  {
    id: 'q-3',
    questionNumber: 3,
    question: 'What is Hybrid UI + API testing in Playwright?',
    options: [
      'Testing only on mobile phones and tablets simultaneously',
      'Combining browser UI user interactions with direct REST API requests to verify backend state and accelerate setup',
      'Testing HTML and CSS without JavaScript',
      'Running tests in both dark mode and light mode',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Hybrid testing leverages API requests to seed preconditions or verify backend state alongside browser UI validation.',
  },
  {
    id: 'q-4',
    questionNumber: 4,
    question: 'Which of the following locators adheres best to Playwright accessibility best practices?',
    options: [
      'page.locator("//div[2]/ul/li[4]/button")',
      'page.locator(".btn-submit-form.active-state")',
      'page.getByRole("button", { name: "Place Order" })',
      'page.locator("#root > div > form > input:nth-child(3)")',
    ],
    correctAnswerIndex: 2,
    explanation:
      'getByRole reflects user and assistive technology interaction and remains resilient across CSS redesigns.',
  },
  {
    id: 'q-5',
    questionNumber: 5,
    question: 'Why is storageState preferred over logging in via the UI in every test?',
    options: [
      'It bypasses the need for a web server',
      'It saves pre-authenticated cookies and localStorage, drastically speeding up test suites and removing login flakiness',
      'It encrypts the browser screen',
      'It converts Chromium into Firefox',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Reusing stored session state avoids repeating the login UI flow dozens of times, accelerating execution and eliminating repetitive flakiness.',
  },
  {
    id: 'q-6',
    questionNumber: 6,
    question: 'What is the most effective way to eliminate intermittent race conditions in Playwright?',
    options: [
      'Adding await page.waitForTimeout(5000) before every step',
      'Using web-first assertions (await expect(locator).toBeVisible()) and event listeners (waitForResponse)',
      'Increasing global test timeouts to 5 minutes',
      'Disabling parallel workers completely',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Web-first assertions and event-driven waiting synchronize with application state dynamically without hardcoded delays.',
  },
  {
    id: 'q-7',
    questionNumber: 7,
    question: 'What is the function of the --with-deps flag when running npx playwright install in CI?',
    options: [
      'It downloads third-party npm packages from GitHub',
      'It installs necessary operating system level shared libraries and system dependencies required for headless browsers on Linux',
      'It compresses test video recordings',
      'It creates a backup of the source code',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Linux environments often lack system libraries (e.g. fonts, graphics drivers); --with-deps installs them automatically.',
  },
  {
    id: 'q-8',
    questionNumber: 8,
    question: 'In Playwright MCP architecture, what role does the AI agent play?',
    options: [
      'It replaces the browser engine with a neural network',
      'It serves as the reasoning layer, interpreting goals and dynamically invoking structured browser tools exposed by the MCP server',
      'It formats JavaScript files using ESLint',
      'It prints invoices for completed purchases',
    ],
    correctAnswerIndex: 1,
    explanation:
      'The AI agent acts as the decision-making brain that invokes standardized MCP browser tools to accomplish testing objectives.',
  },
  {
    id: 'q-9',
    questionNumber: 9,
    question: 'Why should test data factories generate unique timestamps or random suffixes for user emails?',
    options: [
      'To prevent collision and test state interference when multiple tests run concurrently in parallel workers',
      'Because email servers reject usernames under 20 characters',
      'To make the test code look more complex',
      'Because Playwright cannot process static strings',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Parallel workers executing concurrently will collide if they attempt to create or query static, identical accounts.',
  },
  {
    id: 'q-10',
    questionNumber: 10,
    question: 'What is the primary indicator that an automation framework has succeeded in an enterprise organization?',
    options: [
      'It has more than 10,000 lines of custom helper wrapper code',
      'Developers and QA trust CI test results, regression cycles are fast and deterministic, and releases ship with confidence',
      'Tests only pass when executed on the lead architect’s laptop',
      'All tests run with retries set to 10',
    ],
    correctAnswerIndex: 1,
    explanation:
      'High confidence, fast feedback, and deterministic CI test runs are the hallmarks of a successful automation framework.',
  },
];

export const PLAYWRIGHT_FINAL_COMPREHENSIVE_ASSESSMENT: PlaywrightFinalAssessmentQuestion[] = [
  {
    id: 'fa-01',
    questionNumber: 1,
    category: 'Fundamentals & Architecture',
    question: 'What core architectural mechanism enables Playwright to communicate with Chromium, WebKit, and Firefox with near-zero latency?',
    options: [
      'Legacy Selenium WebDriver JSON Wire Protocol over HTTP polling',
      'Direct WebSocket connection over modern browser debugging protocols (CDP for Chromium, internal remote protocols for WebKit and Firefox)',
      'Injecting jQuery into every webpage body tag',
      'Simulating OS mouse and keyboard hardware interrupts via C++',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Playwright communicates via a single, persistent WebSocket connection utilizing native browser debugging protocols, eliminating HTTP polling overhead.',
  },
  {
    id: 'fa-02',
    questionNumber: 2,
    category: 'Fundamentals & Architecture',
    question: 'What is the relationship between a Playwright Browser, BrowserContext, and Page?',
    options: [
      'A Page contains multiple Browsers, which in turn contain BrowserContexts',
      'A Browser is a single running process; a BrowserContext is an isolated incognito-like session within it; a Page is a single tab within a context',
      'They are identical synonyms for the window object',
      'A BrowserContext is an external cloud proxy server',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Hierarchy: Browser (process) -> BrowserContext (isolated session with cookies/storage) -> Page (tab/window).',
  },
  {
    id: 'fa-03',
    questionNumber: 3,
    category: 'Locators & Selectors',
    question: 'Why is page.getByRole("button", { name: "Submit" }) superior to page.locator(".submit-btn")?',
    options: [
      'It compiles faster in V8',
      'It tests user accessibility and semantics, and does not break when styling or CSS class names change',
      'It disables JavaScript error handling',
      'It works without loading the webpage',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Role locators query elements by semantic accessibility tree roles, mirroring real user experience and surviving UI restyling.',
  },
  {
    id: 'fa-04',
    questionNumber: 4,
    category: 'Locators & Selectors',
    question: 'What occurs when a locator like page.getByRole("button") resolves to 3 different buttons on a page when click() is called?',
    options: [
      'Playwright clicks all three buttons simultaneously',
      'Playwright throws a strict mode violation error and halts execution',
      'Playwright clicks the first button silently',
      'Playwright reloads the page',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Playwright enforces strict mode by default on single-element actions; resolving to multiple elements throws a strict mode violation.',
  },
  {
    id: 'fa-05',
    questionNumber: 5,
    category: 'Actions, Assertions & Auto-Waiting',
    question: 'Which actionability checks does Playwright automatically verify before dispatching a locator.click()?',
    options: [
      'Attached to DOM, Visible, Stable (not animating), Receives Events (not obscured), and Enabled',
      'Only that the element tag name is HTML',
      'Only that the mouse cursor is physically moved',
      'It performs no checks and dispatches immediately',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Playwright auto-waiting verifies attachment, visibility, stability, event receipt, and enablement before clicking.',
  },
  {
    id: 'fa-06',
    questionNumber: 6,
    category: 'Actions, Assertions & Auto-Waiting',
    question: 'What is the critical difference between expect(locator).toBeVisible() and expect(await locator.isVisible()).toBe(true)?',
    options: [
      'They are identical in every way',
      'expect(locator).toBeVisible() is a web-first assertion that automatically retries until timeout; the latter evaluates once immediately without retrying',
      'The latter is recommended by Playwright',
      'The former only works in Node.js 14',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Web-first assertions (expect(locator)...) poll and retry automatically until the condition passes or times out, preventing race conditions.',
  },
  {
    id: 'fa-07',
    questionNumber: 7,
    category: 'Test Organization, Hooks & Fixtures',
    question: 'Why should tests in an enterprise automation framework be completely independent of one another?',
    options: [
      'To prevent Git merge conflicts',
      'To allow tests to run in parallel in any arbitrary order without shared state or cascading failures',
      'Because JavaScript does not allow more than one test per file',
      'To reduce memory usage in Google Chrome',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Independent tests can run concurrently across parallel workers and be retried in isolation without depending on prior test executions.',
  },
  {
    id: 'fa-08',
    questionNumber: 8,
    category: 'Test Organization, Hooks & Fixtures',
    question: 'How does custom fixture extension (test.extend()) enhance test maintainability in Playwright?',
    options: [
      'It converts JavaScript into Python',
      'It enables declarative dependency injection for pages, mock data, and sessions with automatic setup and teardown lifecycle management',
      'It disables test logging',
      'It automatically restarts the operating system',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Custom fixtures encapsulate setup, dependency injection, and teardown, keeping test specifications clean, declarative, and decoupled.',
  },
  {
    id: 'fa-09',
    questionNumber: 9,
    category: 'Data-Driven Testing',
    question: 'How do you parameterize a test suite across 10 different user datasets in Playwright JavaScript?',
    options: [
      'Copy and paste the test file 10 times',
      'Iterate over an array of dataset objects using a for...of loop and call test(...) with dynamic titles inside the loop',
      'Set workers: 10 in playwright.config.js',
      'Use a shell script to run the same test 10 times',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Iterating over datasets with for...of dynamically registers distinct, individually reported test cases for each data variation.',
  },
  {
    id: 'fa-10',
    questionNumber: 10,
    category: 'Data-Driven Testing',
    question: 'Why should test datasets generated by data factories use dynamic timestamps or UUIDs?',
    options: [
      'To prevent database key collisions and state pollution across concurrent parallel test workers',
      'Because databases cannot store static strings',
      'To make reports harder to read',
      'Because Playwright test titles require numbers',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Dynamic identifiers guarantee uniqueness across parallel test workers modifying the same database tables.',
  },
  {
    id: 'fa-11',
    questionNumber: 11,
    category: 'Debugging & Trace Viewer',
    question: 'What comprehensive debugging information does the Playwright Trace Viewer capture?',
    options: [
      'Only text console output',
      'DOM snapshots before and after every action, actionability call logs, network requests/responses, and console errors with timeline scrubbing',
      'Only a final full-page screenshot',
      'The user’s personal browsing history',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Trace Viewer provides complete time-travel debugging with DOM snapshots, network waterfalls, actionability logs, and console messages.',
  },
  {
    id: 'fa-12',
    questionNumber: 12,
    category: 'Debugging & Trace Viewer',
    question: 'What does the actionability call log message "element intercepts pointer events" signify?',
    options: [
      'The element is ready to be clicked',
      'Another element (such as a modal backdrop, loading spinner, or sticky header) is covering the target element at the click coordinates',
      'The mouse hardware is unplugged',
      'The browser window is minimized',
    ],
    correctAnswerIndex: 1,
    explanation:
      'When an overlay or spinner covers the target element, Playwright’s hit-target check detects that another element receives pointer events.',
  },
  {
    id: 'fa-13',
    questionNumber: 13,
    category: 'Authentication & Isolation',
    question: 'How does storageState save time across a suite of 200 authenticated end-to-end tests?',
    options: [
      'It skips the tests completely and marks them passed',
      'It performs the login flow once in a setup project, saves session cookies/tokens to JSON, and injects them into all subsequent tests in milliseconds',
      'It deletes all passwords from the test database',
      'It runs tests only in headless mode',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Session caching via storageState bypasses repeating the UI login form in every test, saving hundreds of seconds in CI.',
  },
  {
    id: 'fa-14',
    questionNumber: 14,
    category: 'Authentication & Isolation',
    question: 'Where should test environment secrets and passwords be stored in an automation repository?',
    options: [
      'Committed directly inside the public GitHub repository',
      'Loaded via environment variables (process.env.TEST_PASSWORD) from secure CI secrets or a local .env file listed in .gitignore',
      'Hardcoded in the Page Object constructor',
      'Written in the README.md file',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Secrets must never be committed to source control; they must be injected via environment variables and gitignored.',
  },
  {
    id: 'fa-15',
    questionNumber: 15,
    category: 'Page Object Model',
    question: 'In a well-designed Page Object class, how should locators be initialized?',
    options: [
      'As properties initialized in the constructor (e.g. this.submitBtn = page.getByRole(...))',
      'Hardcoded in global variables outside the class',
      'Queried dynamically inside raw SQL queries',
      'Re-created using document.querySelector inside every helper function',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Defining locators as constructor properties ensures clean encapsulation, lazy evaluation, and centralized locator maintenance.',
  },
  {
    id: 'fa-16',
    questionNumber: 16,
    category: 'Page Object Model',
    question: 'What is the "God Object" anti-pattern in Page Object Model design?',
    options: [
      'An object that has no methods',
      'A single massive Page Object class that attempts to represent the entire application, accumulating hundreds of unrelated locators and methods',
      'A class that uses TypeScript',
      'A test that runs in under 1 second',
    ],
    correctAnswerIndex: 1,
    explanation:
      'A God Object violates the Single Responsibility Principle by combining unrelated pages into an unmaintainable monolith.',
  },
  {
    id: 'fa-17',
    questionNumber: 17,
    category: 'API Testing & Integration',
    question: 'How do you make an HTTP POST request using Playwright’s native request fixture?',
    options: [
      'await request.post("/api/users", { data: { name: "Alex" } })',
      'request.sendHttp("POST", "/api/users")',
      'page.post("/api/users")',
      'fetch.post("/api/users")',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Playwright’s request fixture provides await request.post(url, { data }) for native HTTP requests.',
  },
  {
    id: 'fa-18',
    questionNumber: 18,
    category: 'API Testing & Integration',
    question: 'What is the primary advantage of Hybrid testing (UI + API) over UI-only testing?',
    options: [
      'It bypasses the need for web browsers entirely',
      'It speeds up test setup by seeding state via API, tests user UI workflows, and verifies backend database state directly',
      'It doubles the cost of cloud runners',
      'It allows tests to pass even when the application crashes',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Hybrid testing combines the speed of API test setup/verification with the realistic validation of browser UI interactions.',
  },
  {
    id: 'fa-19',
    questionNumber: 19,
    category: 'Configuration & Cross-Browser',
    question: 'In playwright.config.js, how do you configure tests to run across Chromium, Firefox, and WebKit?',
    options: [
      'By defining three distinct objects in the projects array, each specifying name and use: { ...devices[...] }',
      'By installing three separate operating systems on your computer',
      'By running the test three times in separate terminal tabs manually',
      'By renaming the test file extension to .allbrowsers',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Playwright’s projects configuration array allows defining multiple browser targets and device profiles for automated cross-browser testing.',
  },
  {
    id: 'fa-20',
    questionNumber: 20,
    category: 'Configuration & Cross-Browser',
    question: 'What does setting trace: "on-first-retry" in playwright.config.js accomplish?',
    options: [
      'It disables all test retries permanently',
      'It records full trace files only when a test fails on its initial run and is being retried, saving disk space while providing diagnostic artifacts for failures',
      'It uploads traces to public websites automatically',
      'It slows down tests by 500%',
    ],
    correctAnswerIndex: 1,
    explanation:
      'on-first-retry minimizes trace file overhead on passing runs while ensuring comprehensive traces are captured whenever a failure occurs.',
  },
  {
    id: 'fa-21',
    questionNumber: 21,
    category: 'CI/CD Pipelines',
    question: 'In a GitHub Actions workflow YAML for Playwright, why is if: always() added to the report upload step?',
    options: [
      'To force the pipeline to rerun continuously in an infinite loop',
      'To guarantee that the HTML report and failure traces are uploaded as build artifacts even if previous test steps failed',
      'To prevent the workflow from executing on weekends',
      'To bypass GitHub billing quotas',
    ],
    correctAnswerIndex: 1,
    explanation:
      'if: always() ensures failure artifacts are archived and available for triage even when the test step exits with an error code.',
  },
  {
    id: 'fa-22',
    questionNumber: 22,
    category: 'CI/CD Pipelines',
    question: 'Why should enterprise teams avoid setting retries: 5 in CI configurations to "fix" flakiness?',
    options: [
      'Because GitHub restricts retries to 1',
      'Excessive retries mask genuine asynchronous bugs, drastically inflate CI execution times, and conceal production regressions',
      'Because retries delete the test files from disk',
      'Because Playwright crashes after 3 retries',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Masking flaky tests with high retry counts creates a false sense of security, hides real race conditions, and consumes excessive CI compute.',
  },
  {
    id: 'fa-23',
    questionNumber: 23,
    category: 'AI Testing, Flakiness & MCP',
    question: 'What is a deceptive AI-suggested test automation fix that should be immediately rejected?',
    options: [
      'Using getByRole instead of an XPath selector',
      'Inserting await page.waitForTimeout(5000) or weakening assertions to count() > 0 to mask a timing failure',
      'Organizing code into a Page Object class',
      'Extracting shared logic into custom fixtures',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Arbitrary sleeps and weakened assertions mask symptoms without solving the underlying asynchronous timing or defect.',
  },
  {
    id: 'fa-24',
    questionNumber: 24,
    category: 'AI Testing, Flakiness & MCP',
    question: 'What data must be strictly SANITIZED before sharing test logs or traces with external AI assistants?',
    options: [
      'The date of the test run',
      'Customer PII (emails, phone numbers, addresses), Bearer tokens, passwords, and internal infrastructure hostnames',
      'The name of the operating system',
      'The Playwright package version',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Sharing unscrubbed PII, credentials, or proprietary tokens with external AI models violates data privacy laws and enterprise security policies.',
  },
  {
    id: 'fa-25',
    questionNumber: 25,
    category: 'AI Testing, Flakiness & MCP',
    question: 'In the Playwright Model Context Protocol (MCP) framework, what is the role of an origin whitelisting guardrail?',
    options: [
      'To allow the AI agent to purchase items on any e-commerce site',
      'To restrict autonomous AI browser navigation exclusively to approved test/staging domains, preventing unauthorized navigation to production or external sites',
      'To format the code with prettier',
      'To automatically translate test scripts into French',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Domain whitelisting prevents autonomous browser agents from navigating to unapproved, external, or production environments.',
  },
];

export const PLAYWRIGHT_DAY_20_DATA: PlaywrightDay20Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 20,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Final Project, Comprehensive Assessment & Certification',
  subtitle:
    'Engineer the RootCart Enterprise Framework, defend your architecture, complete the 25-question Final Assessment, and achieve certification.',
  level: 'Advanced / Capstone',
  estimatedHours: '3.0–3.5 Hours',
  prerequisites: 'Days 1–19 concepts (The complete Playwright Automation curriculum).',
  learningObjectives: [
    'Architect and implement a production-grade E-Commerce Automation Framework satisfying all 12 milestones.',
    'Build modular Page Objects (Inventory, Cart, Checkout) with 100% accessible role, label, and testid locators.',
    'Integrate hybrid UI + API state verification to validate backend order contract integrity.',
    'Engineer negative and boundary validation for declined payments and empty cart workflows.',
    'Defend framework architectural decisions against anti-patterns, wrapper bloat, and flakiness.',
    'Pass the 25-question Comprehensive Final Assessment covering the entire 20-day curriculum with >= 80% score.',
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
    { day: 18, title: 'Day 18: AI-Assisted Test Planning & Synthetic Data', focus: 'Requirements to Tests, Edge Cases, Coverage Matrix', isCompleted: true },
    { day: 19, title: 'Day 19: Framework Quality & Playwright MCP', focus: 'Model Context Protocol, Safe AI Workflows', isCompleted: true },
    { day: 20, title: 'Day 20: Final Project, Assessment & Interview Prep', focus: 'Capstone E-commerce Framework, Certification', isCurrent: true },
  ],
  topics: PLAYWRIGHT_DAY_20_TOPICS,
  starterCode: PLAYWRIGHT_DAY_20_STARTER_CODE,
  starterExplanation: PLAYWRIGHT_DAY_20_STARTER_EXPLANATION,
  starterOutput: PLAYWRIGHT_DAY_20_STARTER_OUTPUT,
  evaluateAssignment: evaluateDay20Assignment,
  interviewQuestions: PLAYWRIGHT_DAY_20_INTERVIEW_QUESTIONS,
  quizQuestions: PLAYWRIGHT_DAY_20_QUIZ_QUESTIONS,
  finalAssessment: PLAYWRIGHT_FINAL_COMPREHENSIVE_ASSESSMENT,
};
