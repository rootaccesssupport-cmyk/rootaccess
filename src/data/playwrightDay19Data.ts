import type {
  PlaywrightDay19Unit,
  PlaywrightDay19AssignmentRubric,
  PlaywrightDayTopic,
  PlaywrightInterviewQuestion,
  PlaywrightQuizQuestion,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_19_TOPICS: PlaywrightDayTopic[] = [
  {
    id: 'topic-1',
    topicNumber: 1,
    title: 'Topic 1: The 6 Pillars of Enterprise Test Framework Architecture',
    durationMinutes: 25,
    explanation: `Many test automation initiatives start enthusiastically with 10 fast tests, but within 6–12 months degrade into an unmaintainable swamp of flaky runs, cryptic errors, and endless maintenance tickets.

Enterprise test frameworks succeed when they are engineered around the 6 Architectural Pillars:
1. Modularity: Separation of concerns. Tests contain intent and business assertions; Page Objects contain locators and atomic interactions; Fixtures manage lifecycle setup/teardown.
2. Reliability (Determinism): Zero arbitrary waitForTimeout() calls. 100% adherence to web-first assertions and actionability auto-waiting.
3. Maintainability: Resilient, accessible locators (getByRole, getByLabel). If the DOM changes markup or CSS classes, tests do not break.
4. Observability: Rich tracing (trace: 'on-first-retry'), video on failure, DOM snapshots, and structured failure artifacts in CI.
5. Isolation: Every test operates in an independent BrowserContext. Zero shared test state.
6. Parallelism & Scalability: Suite designed to run across multiple CPU workers with zero database locking or resource collisions.`,
    keyTakeaways: [
      'The 6 pillars: Modularity, Reliability, Maintainability, Observability, Isolation, and Parallelism.',
      'Separate test intent from implementation details using Page Object classes and custom fixtures.',
      'Never allow tests to depend on the execution order or shared state of previous tests.',
    ],
    terminology: [
      {
        term: 'Separation of Concerns',
        definition: 'Architectural principle dividing software into distinct sections: tests declare intent, POM encapsulates interactions, fixtures manage state.',
      },
      {
        term: 'Test Isolation',
        definition: 'Ensuring tests execute with independent browser contexts, distinct credentials, and zero shared mutable data.',
      },
    ],
    examples: [
      {
        title: 'Enterprise Directory Layout',
        description: 'Standard multi-layer project structure separating config, fixtures, pages, and tests.',
        codeSnippet: `/**
 * my-playwright-framework/
 * ├── config/playwright.config.js
 * ├── fixtures/baseFixture.js
 * ├── pages/LoginPage.js
 * ├── test-data/orderFactory.js
 * └── tests/e2e/checkout.spec.js
 */`,
      },
    ],
    exercise: {
      id: 'ex-1',
      title: 'Pillars of Architecture',
      prompt: 'A test suite runs cleanly with 1 worker (--workers=1), but exhibits random failures and database collisions when executed with 4 workers. Which architectural pillar was violated?',
      options: [
        'Observability',
        'Test Isolation & Independent State',
        'TypeScript Compilation',
        'CSS Minification',
      ],
      correctAnswerIndex: 1,
      explanation:
        'When tests pass sequentially but fail concurrently, they are sharing mutable state (e.g. modifying the exact same user account or database record), violating the Test Isolation pillar.',
    },
  },
  {
    id: 'topic-2',
    topicNumber: 2,
    title: 'Topic 2: AI-Assisted Framework Refactoring & Modernization',
    durationMinutes: 25,
    explanation: `Many organizations maintain suites written 3–5 years ago using legacy Protractor, Selenium, or early Playwright idioms:
- Bloated helper files with 40 utility wrappers (clickElement, typeText, waitForVisible).
- Brittle CSS class selectors (.btn-primary-2x.active) and long XPath strings.
- Repetitive boilerplate across 80 test files.

AI is an extraordinary accelerator for mechanical framework modernization, provided you guide it with explicit architectural constraints:
1. Eradicate "Helper Wrapper" Anti-Patterns: Playwright locators automatically perform comprehensive actionability checks (visible, stable, enabled, pointer events). Custom wrapper functions hide traces, strip auto-waiting logs, and bloat the codebase without adding value.
2. Refactor to Semantic Roles: Convert fragile CSS and XPath selectors to getByRole and getByLabel.
3. Extract Declarative Page Objects: Encapsulate UI interactions into ES6 classes where locators are constructor properties.`,
    keyTakeaways: [
      'Eliminate legacy Selenium wrapper functions—Playwright native methods already auto-wait.',
      'Refactor brittle CSS and XPath selectors to accessible role and label locators.',
      'Always verify refactored tests against real application runs to ensure zero regression.',
    ],
    terminology: [
      {
        term: 'Wrapper Bloat',
        definition: 'Redundant custom functions wrapping native framework APIs, which degrade autocomplete and hide trace logs.',
      },
      {
        term: 'Strangler Fig Migration',
        definition: 'Incrementally replacing legacy tests module-by-module until the modern framework completely replaces the old suite.',
      },
    ],
    examples: [
      {
        title: 'Modernizing a Brittle Test',
        description: 'Converting brittle XPath and hardcoded wait into semantic role locator with auto-waiting.',
        codeSnippet: `// BEFORE:
await page.waitForTimeout(2000);
await page.locator('//button[@class="btn-sub"]').click();

// AFTER:
await page.getByRole('button', { name: 'Submit Order' }).click();`,
      },
    ],
    exercise: {
      id: 'ex-2',
      title: 'Native Auto-Waiting vs Wrappers',
      prompt: 'Why should you avoid creating a custom safeClick(page, selector) wrapper function in a modern Playwright framework?',
      options: [
        'Because JavaScript functions cannot accept more than one argument',
        'Because Playwright’s native locator.click() already includes comprehensive auto-waiting and actionability checks, and custom wrappers obscure diagnostic logs and traces',
        'Because custom wrappers are blocked by browser security sandboxes',
        'Because Playwright requires all code to be written inline without functions',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Playwright built-in locators perform automated checks (visible, stable, enabled, receiving pointer events). Wrapping them in legacy custom functions adds boilerplate, hides actionability logs in trace viewer, and prevents web-first retry mechanisms.',
    },
  },
  {
    id: 'topic-3',
    topicNumber: 3,
    title: 'Topic 3: Playwright MCP (Model Context Protocol) Fundamentals',
    durationMinutes: 25,
    explanation: `The Model Context Protocol (MCP) is an open standard that allows Large Language Models (LLMs) and autonomous AI coding agents to securely discover and invoke external tools and resources in real time.

In test automation, Playwright MCP transforms Playwright from a passive script runner into an interactive environment for autonomous agents:
- navigate_page: Navigates to a target URL and waits for page readiness.
- take_snapshot / get_accessibility_tree: Returns the semantic ARIA tree of the page, allowing the agent to "see" interactable elements cleanly without parsing messy raw HTML.
- click_element: Dispatches an accessible click on a specific element identified by role and name.
- fill_element: Types text into form inputs.
- evaluate_script: Safely inspects runtime DOM properties or console errors.`,
    keyTakeaways: [
      'MCP (Model Context Protocol) is an open standard enabling AI agents to invoke browser automation tools directly.',
      'Playwright MCP provides agents with accessible ARIA snapshots and structured interaction primitives.',
      'MCP separates the reasoning layer (LLM) from the browser execution layer (Playwright runner).',
    ],
    terminology: [
      {
        term: 'Model Context Protocol (MCP)',
        definition: 'An open protocol standardizing how AI models exchange context, inspect resources, and call tools across client applications.',
      },
      {
        term: 'Accessibility Tree Snapshot',
        definition: 'A token-efficient tree representing semantic roles, names, and states of DOM elements for AI consumption.',
      },
    ],
    examples: [
      {
        title: 'Conceptual MCP Tool Handler',
        description: 'Implementing an MCP tool handler in Node.js for browser navigation.',
        codeSnippet: `async function handleNavigate({ url }) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  return { status: 'success', currentUrl: page.url() };
}`,
      },
    ],
    exercise: {
      id: 'ex-3',
      title: 'ARIA Snapshot Utility',
      prompt: 'What data structure does Playwright MCP provide to AI agents to allow them to "see" and locate page elements without parsing thousands of lines of raw HTML?',
      options: [
        'A binary PNG screenshot only',
        'The Semantic Accessibility (ARIA) tree snapshot',
        'A minified JavaScript bundle',
        'The git commit diff of the frontend repository',
      ],
      correctAnswerIndex: 1,
      explanation:
        'The accessibility tree snapshot contains the semantic roles, names, and states of elements without extraneous styling or div tags, giving LLMs the cleanest, most token-efficient representation of interactable elements.',
    },
  },
  {
    id: 'topic-4',
    topicNumber: 4,
    title: 'Topic 4: Security Boundaries & Guardrails for Autonomous Testing',
    durationMinutes: 25,
    explanation: `When an AI agent is empowered to execute browser actions autonomously, it possesses the same capabilities as a human user. Without strict guardrails, an autonomous agent can:
- Accidentally navigate to external domains and submit live forms.
- Execute destructive actions (clicking "Delete Production Database" or "Purge All Users").
- Trigger expensive third-party operations (Stripe live charges, AWS resource provisioning).
- Leak confidential internal tokens across unapproved origins.

The 4 Security Guardrails for AI Browser Agents:
1. Domain Whitelisting (URL Origin Restriction): Agent can ONLY navigate to staging/test domains.
2. Human-in-the-Loop Approval for Destructive Actions: Requires explicit human approval for DELETE / PAY actions.
3. Isolated Ephemeral Sandbox: Disposable browser profiles; cookies wiped on exit.
4. Read-Only Mode for Production Environments: Clicks on mutate buttons disabled; inspection only.`,
    keyTakeaways: [
      'Autonomous browser agents must be constrained by strict URL whitelists.',
      'Destructive operations (delete, financial checkout) require Human-in-the-Loop authorization.',
      'Use ephemeral, sandboxed browser contexts to ensure zero credential or session leakage.',
    ],
    terminology: [
      {
        term: 'Domain Whitelisting',
        definition: 'Security policy restricting browser navigation strictly to approved domain origins.',
      },
      {
        term: 'Human-in-the-Loop (HITL)',
        definition: 'A mandatory human approval gate that halts autonomous execution before critical or destructive actions.',
      },
    ],
    examples: [
      {
        title: 'URL Whitelisting Guardrail',
        description: 'Validating destination URLs against an authorized array before allowing navigation.',
        codeSnippet: `function validateUrl(url, allowedOrigins) {
  const parsed = new URL(url);
  if (!allowedOrigins.includes(parsed.hostname)) {
    throw new Error(\`[GUARDRAIL] Domain \${parsed.hostname} is unauthorized\`);
  }
}`,
      },
    ],
    exercise: {
      id: 'ex-4',
      title: 'Human-in-the-Loop Guardrail',
      prompt: 'An autonomous test agent encounters an element with accessible name "Permanently Delete Organization". What should the MCP guardrail enforce?',
      options: [
        'Click the button immediately to maximize test velocity',
        'Trigger a Human-in-the-Loop confirmation request and pause execution until explicit human authorization is granted',
        'Refresh the page 5 times',
        'Convert the browser window to full screen',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Irreversible or destructive actions must trigger a Human-in-the-Loop approval gate to prevent accidental data destruction by autonomous agents.',
    },
  },
];

export const PLAYWRIGHT_DAY_19_STARTER_CODE = `// ============================================================================
// ROOTACCESS PLAYWRIGHT AUTOMATION — DAY 19 PRACTICAL LAB
// Framework Architecture Refactoring & Playwright MCP Guardrails
// ============================================================================
// Your Tasks:
// 1. Refactor the Legacy User Management test below using the 6 Pillars:
//    - Eliminate arbitrary sleeps and XPath/CSS selectors.
//    - Encapsulate page interactions in an ES6 Page Object Class (UserAdminPage).
//    - Implement web-first assertions with auto-waiting.
// 2. Implement the SafeAgentGuardrail class to enforce security boundaries
//    for autonomous Playwright MCP browser agents (whitelisting & confirmation).
// ============================================================================

import { test, expect } from '@playwright/test';

// ----------------------------------------------------------------------------
// PART 1: PAGE OBJECT MODEL REFACTORING (6 PILLARS)
// ----------------------------------------------------------------------------
export class UserAdminPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: 'User Management' });
    this.inviteUserButton = page.getByRole('button', { name: 'Invite User' });
    this.emailInput = page.getByLabel('User Email Address');
    this.roleDropdown = page.getByRole('combobox', { name: 'Account Role' });
    this.submitInviteButton = page.getByRole('button', { name: 'Send Invitation' });
    this.toastNotification = page.getByRole('alert');
    this.usersTable = page.getByRole('table', { name: 'Active Users' });
  }

  async navigate() {
    await this.page.goto('/admin/users');
    await expect(this.pageHeading).toBeVisible();
  }

  async inviteUser(email, role = 'Member') {
    await this.inviteUserButton.click();
    await this.emailInput.fill(email);
    await this.roleDropdown.selectOption(role);
    await this.submitInviteButton.click();
  }
}

// ----------------------------------------------------------------------------
// PART 2: MCP AUTONOMOUS AGENT SECURITY GUARDRAIL
// ----------------------------------------------------------------------------
export class SafeAgentGuardrail {
  constructor(allowedHostnames = ['staging.rootaccess.org', 'localhost']) {
    this.allowedHostnames = allowedHostnames;
    this.destructiveTerms = ['delete', 'purge', 'drop', 'remove', 'revoke', 'pay'];
  }

  validateUrl(url) {
    try {
      const parsed = new URL(url);
      const isAllowed = this.allowedHostnames.includes(parsed.hostname);
      if (!isAllowed) {
        throw new Error(\`[GUARDRAIL VIOLATION] Domain '\${parsed.hostname}' is not authorized.\`);
      }
      return true;
    } catch (err) {
      if (err.message.includes('GUARDRAIL VIOLATION')) throw err;
      throw new Error(\`[INVALID URL] Unable to parse URL: \${url}\`);
    }
  }

  isActionDestructive(role, name) {
    const text = \`\${role} \${name}\`.toLowerCase();
    return this.destructiveTerms.some(term => text.includes(term));
  }
}

// ----------------------------------------------------------------------------
// PART 3: MODERNIZED PLAYWRIGHT TEST SPEC
// ----------------------------------------------------------------------------
test.describe('Enterprise User Administration Suite', () => {
  test('invites new team member with resilient Page Object and assertions', async ({ page }) => {
    const userAdmin = new UserAdminPage(page);
    const uniqueEmail = \`developer_\${Date.now()}@example.com\`;

    await userAdmin.navigate();
    await userAdmin.inviteUser(uniqueEmail, 'Administrator');

    await expect(userAdmin.toastNotification).toBeVisible();
    await expect(userAdmin.toastNotification).toContainText('Invitation sent successfully');
  });

  test('validates MCP guardrail prevents unauthorized agent navigation', async () => {
    const guardrail = new SafeAgentGuardrail(['staging.rootaccess.org']);
    
    expect(guardrail.validateUrl('https://staging.rootaccess.org/dashboard')).toBe(true);

    expect(() => guardrail.validateUrl('https://malicious-external-site.com/steal-session'))
      .toThrow(/GUARDRAIL VIOLATION/);

    expect(guardrail.isActionDestructive('button', 'Delete All Workspaces')).toBe(true);
    expect(guardrail.isActionDestructive('button', 'Save Draft')).toBe(false);
  });
});
`;

export const PLAYWRIGHT_DAY_19_STARTER_EXPLANATION = `### Day 19 Lab: Framework Architecture Refactoring & Playwright MCP

#### 1. Modernization & 6 Pillars Evaluation
- **Modularity & Maintainability**: Extracted UserAdminPage containing locators initialized in constructor properties. Decoupled test intent from DOM selectors.
- **Reliability**: Completely eliminated arbitrary waitForTimeout() calls in favor of auto-waiting expect(toastNotification).toBeVisible().
- **Isolation**: Used dynamic timestamped synthetic user fixtures (developer_\${Date.now()}@example.com) preventing race conditions during parallel execution.

#### 2. Playwright MCP & Autonomous Agent Safety
- Implemented SafeAgentGuardrail establishing strict security boundaries:
  - **Hostname Whitelisting**: Blocks autonomous agents from navigating to unapproved external domains or production origins.
  - **Destructive Action Interception**: Detects keywords like delete, purge, and revoke, flagging them for Human-in-the-Loop review before execution.
`;

export const PLAYWRIGHT_DAY_19_STARTER_OUTPUT = `Running 2 tests using 2 workers
[chromium] › day19-framework-mcp.spec.js:77:3 › Enterprise User Administration Suite › invites new team member with resilient Page Object and assertions
  ✓  [chromium] › invites new team member with resilient Page Object and assertions (920ms)
[chromium] › day19-framework-mcp.spec.js:89:3 › Enterprise User Administration Suite › validates MCP guardrail prevents unauthorized agent navigation
  ✓  [chromium] › validates MCP guardrail prevents unauthorized agent navigation (45ms)

  2 passed (1.2s)
`;

export function evaluateDay19Assignment(
  code: string,
  output: string,
  explanation: string
): PlaywrightDay19AssignmentRubric {
  const criteria: PlaywrightDay19AssignmentRubric['criteria'] = [];
  const feedback: string[] = [];

  const evaluatesFrameworkOnSixPillars =
    /6 pillars|modularity|reliability|maintainability|observability|isolation|parallel/i.test(explanation);
  criteria.push({
    id: 'c1',
    title: 'Evaluates Framework on Six Architectural Pillars',
    passed: evaluatesFrameworkOnSixPillars,
    feedback: evaluatesFrameworkOnSixPillars
      ? 'Framework evaluated against core architectural pillars.'
      : 'Document the 6 architectural pillars in your explanation.',
  });

  const auditsLocatorResilience =
    /getByRole|getByLabel|getByText/i.test(code) && !/xpath|css-class-selector/.test(code);
  criteria.push({
    id: 'c2',
    title: 'Audits Locator Resilience (No Brittle Selectors)',
    passed: auditsLocatorResilience,
    feedback: auditsLocatorResilience
      ? 'Resilient accessible role and label locators used throughout.'
      : 'Refactor brittle selectors to getByRole and getByLabel.',
  });

  const evaluatesAiModernizationPlan =
    /moderniz|refactor|legacy|audit/i.test(explanation);
  criteria.push({
    id: 'c3',
    title: 'Documents Structured AI Modernization Strategy',
    passed: evaluatesAiModernizationPlan,
    feedback: evaluatesAiModernizationPlan
      ? 'Structured modernization plan documented clearly.'
      : 'Explain the modernization and refactoring strategy.',
  });

  const refactorsSharedHelpersAndFixtures =
    /class UserAdminPage/.test(code) && /constructor\s*\(\s*page\s*\)/.test(code);
  criteria.push({
    id: 'c4',
    title: 'Extracts Page Object Model Class Cleanly',
    passed: refactorsSharedHelpersAndFixtures,
    feedback: refactorsSharedHelpersAndFixtures
      ? 'UserAdminPage class encapsulates locators and interactions.'
      : 'Create a clean ES6 UserAdminPage class with page constructor.',
  });

  const understandsPlaywrightMcpProtocol =
    /mcp|model context protocol|agent/i.test(code + explanation);
  criteria.push({
    id: 'c5',
    title: 'Understands Playwright Model Context Protocol (MCP)',
    passed: understandsPlaywrightMcpProtocol,
    feedback: understandsPlaywrightMcpProtocol
      ? 'Playwright MCP protocol concepts accurately referenced.'
      : 'Explain the Model Context Protocol role in browser automation.',
  });

  const explainsAiAgentToolInterfaces =
    /tool|schema|interface|guardrail/i.test(code + explanation);
  criteria.push({
    id: 'c6',
    title: 'Explains Autonomous Agent Tool Interfaces',
    passed: explainsAiAgentToolInterfaces,
    feedback: explainsAiAgentToolInterfaces
      ? 'Agent tool interface design and interactions documented.'
      : 'Document how autonomous agents interact with browser tools.',
  });

  const definesSecurityBoundariesForMcp =
    /SafeAgentGuardrail|validateUrl|allowedHostnames/i.test(code);
  criteria.push({
    id: 'c7',
    title: 'Defines Domain Whitelisting Security Boundaries',
    passed: definesSecurityBoundariesForMcp,
    feedback: definesSecurityBoundariesForMcp
      ? 'SafeAgentGuardrail enforces domain whitelist verification.'
      : 'Implement hostname whitelisting in SafeAgentGuardrail.',
  });

  const avoidsUncontrolledBrowserActions =
    /isActionDestructive|destructive|delete/i.test(code);
  criteria.push({
    id: 'c8',
    title: 'Guards Against Uncontrolled Destructive Browser Actions',
    passed: avoidsUncontrolledBrowserActions,
    feedback: avoidsUncontrolledBrowserActions
      ? 'Destructive action detection implemented with human approval gate.'
      : 'Implement destructive action detection for dangerous operations.',
  });

  const verifiesZeroBehavioralRegressions =
    /2 passed|passed/i.test(output);
  criteria.push({
    id: 'c9',
    title: 'Verifies Test Execution & Passing Output',
    passed: verifiesZeroBehavioralRegressions,
    feedback: verifiesZeroBehavioralRegressions
      ? 'Terminal output verifies successful test execution.'
      : 'Include terminal output showing successful passing runs.',
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
    feedback.push(`Superb! You scored ${score}/10 on Day 19 Framework Refactoring & Playwright MCP.`);
  } else {
    feedback.push(`Score: ${score}/10. Please address the failing criteria above to meet the 8/10 threshold.`);
  }

  return {
    score,
    feedback,
    passed,
    criteria,
    evaluatesFrameworkOnSixPillars,
    auditsLocatorResilience,
    evaluatesAiModernizationPlan,
    refactorsSharedHelpersAndFixtures,
    understandsPlaywrightMcpProtocol,
    explainsAiAgentToolInterfaces,
    definesSecurityBoundariesForMcp,
    avoidsUncontrolledBrowserActions,
    verifiesZeroBehavioralRegressions,
    syntacticallyValidJavaScript,
  };
}

export const PLAYWRIGHT_DAY_19_INTERVIEW_QUESTIONS: PlaywrightInterviewQuestion[] = [
  {
    id: 'iq-1',
    questionNumber: 1,
    question: 'What are the 6 architectural pillars of a scalable enterprise test automation framework?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Framework architecture, scalability, and design trade-offs',
    modelAnswer:
      'The 6 pillars are: 1) Modularity (separation of POMs, fixtures, and tests), 2) Reliability (zero arbitrary sleeps, web-first auto-waiting), 3) Maintainability (accessible, semantic locators that survive markup refactors), 4) Observability (deep traces, network logs, and failure artifacts), 5) Test Isolation (independent browser contexts and fresh synthetic data), and 6) Parallelism & Scalability (stateless execution across multi-core workers without collision).',
    followUpQuestion:
      'Which pillar is most frequently compromised when teams rush to meet deadlines?',
  },
  {
    id: 'iq-2',
    questionNumber: 2,
    question: 'What is Playwright MCP (Model Context Protocol), and how does it change test automation?',
    difficulty: 'Intermediate',
    assessmentFocus: 'Autonomous testing protocols, MCP tooling, and LLM orchestration',
    modelAnswer:
      'Model Context Protocol (MCP) is an open standard that allows AI agents and LLMs to interface with tools. In Playwright MCP, the browser automation engine exposes standardized tools (e.g. navigate_page, click_element, get_accessibility_tree) that autonomous agents can invoke via JSON-RPC. This shifts automation from static, pre-scripted tests to adaptive, agentic test exploratory workflows where the AI observes page state, reasons about requirements, and executes actions dynamically.',
    followUpQuestion:
      'Why is the Accessibility tree preferred over raw HTML snapshots in MCP tool interfaces?',
  },
  {
    id: 'iq-3',
    questionNumber: 3,
    question: 'What security guardrails must be in place before granting an AI agent control of a browser in testing?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'Security boundaries, domain whitelisting, and human approval gates',
    modelAnswer:
      'Key guardrails include: 1) Strict Domain Whitelisting (restricting navigation to staging/local hostnames only), 2) Human-in-the-Loop approval gates for irreversible actions (e.g. deleting databases, purchasing subscriptions), 3) Sandboxed, ephemeral browser environments with scrubbed test credentials, and 4) Network monitoring to block external telemetry leaks or unapproved outbound traffic.',
    followUpQuestion:
      'How would you prevent an autonomous agent from accidentally placing an order with a live production credit card?',
  },
  {
    id: 'iq-4',
    questionNumber: 4,
    question: 'Why are custom Selenium-style helper wrappers (e.g. myClick(selector)) discouraged in modern Playwright?',
    difficulty: 'Beginner',
    assessmentFocus: 'API design, Playwright native auto-waiting, and diagnostic logging',
    modelAnswer:
      'In legacy tools like Selenium, custom wrappers were necessary to poll for visibility and avoid StaleElementReferenceException. In Playwright, locators are lazy and native methods (locator.click(), locator.fill()) automatically perform comprehensive actionability checks (visible, stable, enabled, not obscured). Writing custom wrappers adds unnecessary maintenance bloat, degrades TypeScript/IDE autocomplete, and conceals detailed actionability steps from the Playwright Trace Viewer.',
    followUpQuestion:
      'When IS it appropriate to create custom helper functions in Playwright?',
  },
  {
    id: 'iq-5',
    questionNumber: 5,
    question: 'How do you plan and execute a refactoring migration of a 500-test legacy suite without breaking CI?',
    difficulty: 'Scenario-Based',
    assessmentFocus: 'Migration planning, risk mitigation, and zero-downtime test refactoring',
    modelAnswer:
      'I use an incremental, strangler-fig pattern: 1) Establish a baseline CI pass rate and benchmark suite execution time. 2) Modernize foundational configuration (projects, base URL, HTML reporter, trace on first retry). 3) Extract reusable Page Objects and synthetic data factories. 4) Migrate tests module-by-module, refactoring brittle locators to role-based queries and replacing arbitrary waits with web-first assertions. 5) Run both legacy and modernized suites in parallel in CI until the modernized suite demonstrates equal or superior stability.',
    followUpQuestion:
      'How can AI models be used safely during large-scale test migrations?',
  },
];

export const PLAYWRIGHT_DAY_19_QUIZ_QUESTIONS: PlaywrightQuizQuestion[] = [
  {
    id: 'q-1',
    questionNumber: 1,
    question: 'Which of the following is NOT one of the 6 core architectural pillars of test automation?',
    options: [
      'Modularity',
      'Test Isolation',
      'Observability',
      'Mandatory Daily Code Rewrites',
    ],
    correctAnswerIndex: 3,
    explanation:
      'The 6 pillars are Modularity, Reliability, Maintainability, Observability, Isolation, and Parallelism. Rewriting code daily is an anti-pattern, not an architectural pillar.',
  },
  {
    id: 'q-2',
    questionNumber: 2,
    question: 'What does the Model Context Protocol (MCP) enable in the context of browser testing?',
    options: [
      'It compiles JavaScript into native Android APKs',
      'It provides a standardized protocol for autonomous AI models to discover and invoke browser tools in real-time',
      'It encrypts hard drives during test execution',
      'It replaces the Chromium rendering engine with a spreadsheet',
    ],
    correctAnswerIndex: 1,
    explanation:
      'MCP is an open standard that allows LLMs to interact seamlessly with tools, such as interacting with a live browser via Playwright.',
  },
  {
    id: 'q-3',
    questionNumber: 3,
    question: 'Why is an Accessibility (ARIA) snapshot superior to raw HTML when providing context to an AI agent?',
    options: [
      'It is 100 times larger in byte size',
      'It provides a clean, token-efficient semantic hierarchy of interactable controls without noisy CSS styles and div containers',
      'It is only readable by screen readers',
      'It disables JavaScript execution in the browser',
    ],
    correctAnswerIndex: 1,
    explanation:
      'The accessibility tree highlights functional roles, labels, and states without thousands of extraneous styling tags, preserving LLM context tokens.',
  },
  {
    id: 'q-4',
    questionNumber: 4,
    question: 'Why are legacy helper wrappers like customClick(page, selector) considered an anti-pattern in Playwright?',
    options: [
      'They cause the computer CPU to overheat',
      'Playwright’s native locators already include auto-waiting and actionability checks, so wrappers obscure traces and add unnecessary maintenance burden',
      'Browsers block functions named customClick',
      'They are forbidden by the W3C standards',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Playwright native locator methods already perform auto-waiting, visibility, and pointer-event checks; wrappers strip away detailed diagnostic logging.',
  },
  {
    id: 'q-5',
    questionNumber: 5,
    question: 'What security guardrail ensures an autonomous browser agent cannot navigate to external phishing or live production sites?',
    options: [
      'Origin / Hostname Whitelisting',
      'Increasing the browser zoom level',
      'Using dark mode in the browser',
      'Setting --workers=1 in the configuration',
    ],
    correctAnswerIndex: 0,
    explanation:
      'Hostname and URL whitelisting restricts browser navigation to explicitly verified staging and test domains, blocking unapproved destinations.',
  },
  {
    id: 'q-6',
    questionNumber: 6,
    question: 'What is the role of a Human-in-the-Loop guardrail in autonomous test agents?',
    options: [
      'To type the code manually for the agent',
      'To pause autonomous execution and require human confirmation before performing destructive or high-risk operations (e.g. DELETE, payments)',
      'To turn on the computer monitor',
      'To translate JavaScript to Python',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Human-in-the-Loop guardrails halt execution on high-consequence operations until a human verifies and approves the action.',
  },
  {
    id: 'q-7',
    questionNumber: 7,
    question: 'In a well-designed Page Object Model, where should assertions ideally reside?',
    options: [
      'Deep inside the Page Object class helper methods',
      'In a separate SQL database',
      'Directly inside the test specifications (.spec.js), with Page Objects providing locators and action methods',
      'In the package.json file',
    ],
    correctAnswerIndex: 2,
    explanation:
      'Keeping assertions inside test files makes test specifications declarative and self-documenting, while Page Objects encapsulate navigation and element interactions.',
  },
  {
    id: 'q-8',
    questionNumber: 8,
    question: 'What symptom indicates a violation of the Test Isolation architectural pillar?',
    options: [
      'Tests run too quickly on local laptops',
      'Tests pass when run individually in isolation, but fail intermittently when run in parallel with other tests',
      'The HTML report is generated in color',
      'Playwright CLI outputs test timings in milliseconds',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Tests that fail only in parallel runs suffer from shared mutable state or database contention, proving a lack of test isolation.',
  },
  {
    id: 'q-9',
    questionNumber: 9,
    question: 'How does Playwright Trace Viewer support the Observability architectural pillar?',
    options: [
      'By live-streaming tests to YouTube',
      'By capturing DOM snapshots, action logs, console messages, and network waterfalls for every action with time-travel debugging',
      'By sending automated SMS messages to developers',
      'By reformatting code with prettier',
    ],
    correctAnswerIndex: 1,
    explanation:
      'The Trace Viewer provides full time-travel debugging with DOM snapshots before and after every step, actionability logs, and network telemetry.',
  },
  {
    id: 'q-10',
    questionNumber: 10,
    question: 'What is the safest strategy when using AI models to modernize a legacy test suite?',
    options: [
      'Accept all AI suggestions automatically and push directly to the main branch without running tests',
      'Apply an incremental modernization plan, verify refactored tests against real application runs, and audit for deceptive anti-patterns',
      'Delete all tests and rewrite the application from scratch',
      'Disable test retries and increase test timeouts to 60 seconds',
    ],
    correctAnswerIndex: 1,
    explanation:
      'Refactoring requires disciplined verification against real application runs to ensure zero regression and reject deceptive anti-patterns.',
  },
];

export const PLAYWRIGHT_DAY_19_DATA: PlaywrightDay19Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 19,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'AI-Assisted Framework Improvement and Playwright MCP',
  subtitle:
    'Modernize legacy suites against the 6 Pillars, eliminate wrapper bloat, and engineer secure Model Context Protocol (MCP) agent guardrails.',
  level: 'Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–18 concepts (Page Object Model, test isolation, fixtures, and failure triage).',
  learningObjectives: [
    'Evaluate frameworks against the 6 Pillars: Modularity, Reliability, Maintainability, Observability, Isolation, and Parallelism.',
    'Execute systematic AI modernization plans to eliminate brittle CSS/XPath selectors and legacy helper bloat.',
    'Understand Playwright Model Context Protocol (MCP) architecture and tool schemas (navigate, click, snapshot).',
    'Evaluate token-efficient ARIA accessibility tree snapshots for AI agent visual reasoning.',
    'Design and enforce security boundaries: origin domain whitelisting and Human-in-the-Loop confirmation gates.',
    'Safeguard enterprise test systems against uncontrolled destructive agent behaviors.',
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
    { day: 19, title: 'Day 19: Framework Quality & Playwright MCP', focus: 'Model Context Protocol, Safe AI Workflows', isCurrent: true },
    { day: 20, title: 'Day 20: Final Project, Assessment & Interview Prep', focus: 'Capstone E-commerce Framework, Certification' },
  ],
  topics: PLAYWRIGHT_DAY_19_TOPICS,
  starterCode: PLAYWRIGHT_DAY_19_STARTER_CODE,
  starterExplanation: PLAYWRIGHT_DAY_19_STARTER_EXPLANATION,
  starterOutput: PLAYWRIGHT_DAY_19_STARTER_OUTPUT,
  evaluateAssignment: evaluateDay19Assignment,
  interviewQuestions: PLAYWRIGHT_DAY_19_INTERVIEW_QUESTIONS,
  quizQuestions: PLAYWRIGHT_DAY_19_QUIZ_QUESTIONS,
};
