import type {
  PlaywrightDay12Unit,
  PlaywrightDay12AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_12_DATA: PlaywrightDay12Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 12,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Page Object Model and Reusable Framework Design',
  subtitle:
    'Architect maintainable, enterprise-grade Playwright frameworks using the Page Object Model (POM) pattern in pure modern JavaScript. Decouple page interaction mechanics from business test logic.',
  level: 'Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–11 concepts (Locators, web-first assertions, auto-waiting, fixtures, and authentication).',
  learningObjectives: [
    'Understand why framework architecture matters: separation of concerns, maintainability, and readability.',
    'Implement the Page Object Model (POM) using modern JavaScript ES6 classes.',
    'Encapsulate page locators as class properties and interaction workflows as async methods.',
    'Keep business assertions inside test files to preserve clear reporting and failure traceability.',
    'Organize production Playwright projects: pages/, tests/, fixtures/, test-data/, and utils/.',
    'Avoid common POM anti-patterns: oversized "God Objects", unnecessary inheritance, and duplicate helpers.',
    'Inject Page Objects cleanly into tests using Playwright custom fixtures (test.extend).',
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
    { day: 12, title: 'Day 12: Page Object Model (POM) Design', focus: 'Maintainable Classes, Clean Page Abstractions', isCurrent: true },
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
      title: 'Topic 1: Why Automation Framework Architecture Matters',
      durationMinutes: 25,
      explanation: `In an enterprise software team, automated tests are production code. Without clear architectural patterns, test suites quickly devolve into fragile, copy-pasted scripts that nobody wants to touch.

### The Problem with Script-Based Automation
If 30 test files directly interact with low-level page locators:
\`\`\`javascript
// In test 1:
await page.getByRole('button', { name: 'Log In' }).click();
// In test 2:
await page.getByRole('button', { name: 'Log In' }).click();
// In test 30:
await page.getByRole('button', { name: 'Log In' }).click();
\`\`\`
If the button label changes to "Sign In", you must manually edit 30 test files!

### Separation of Concerns
1. **The Test File (.spec.js):** Focuses on **business intent, user journey flow, and assertions**. It asks: "Did the order complete? Was the discount applied?"
2. **The Page Object (.js):** Focuses on **page interaction mechanics**. It knows: "Which locator identifies the checkout button? How do I fill the shipping address form?"

### The Maintainability Trade-Off
Abstractions come with a cost: creating too many small helper layers adds mental overhead. Apply Page Objects where pages have significant reuse across multiple tests (login, navigation, cart, checkout).`,
      keyTakeaways: [
        'Decouple test intent (business logic) from page mechanics (locators & clicks).',
        'Single-point locator maintenance: UI redesigns require updating only one Page Object file.',
        'Avoid over-abstraction: keep helper methods focused and pragmatic.',
      ],
      terminology: [
        { term: 'Page Object Model (POM)', definition: 'A design pattern that creates an object repository for web UI elements, separating page mechanics from test specifications.' },
        { term: 'Separation of Concerns', definition: 'The architectural principle of dividing a software program into distinct sections, each addressing a separate concern.' },
      ],
      examples: [
        {
          title: 'Comparing Raw Scripts with Page Objects',
          description: 'Showing how a test file reads like plain English when backed by a Page Object.',
          codeSnippet: `// Raw script (cluttered with DOM details)
await page.getByPlaceholder('Email').fill('user@apex.io');
await page.getByPlaceholder('Password').fill('Pass123!');
await page.getByRole('button', { name: 'Sign In' }).click();

// With Page Object Model (clean, readable business intent)
const loginPage = new LoginPage(page);
await loginPage.login('user@apex.io', 'Pass123!');`,
        },
      ],
      exercise: {
        id: 'checkpoint-pom-1',
        title: 'Core Purpose of Page Object Model',
        prompt: 'What is the primary benefit of the Page Object Model design pattern?',
        options: [
          'If the UI locator or structure changes, you only update the Page Object in one place instead of across dozens of test files',
          'It makes tests run in parallel without Node.js',
          'It replaces CSS with WebGL',
          'It translates JavaScript to Python',
        ],
        correctAnswerIndex: 0,
        explanation: 'The Page Object Model encapsulates locators and interactions in a dedicated class, providing single-point maintenance when the application UI changes.',
      },
    },

    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Implementing Page Objects with Modern JavaScript Classes',
      durationMinutes: 35,
      explanation: `In pure modern JavaScript, a Page Object is an ES6 class that accepts the Playwright \`page\` object in its constructor.

### Anatomy of a Page Object Class
\`\`\`javascript
// pages/LoginPage.js
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Locators defined as class properties
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.submitButton = page.getByRole('button', { name: /sign in|log in/i });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

module.exports = { LoginPage };
\`\`\`

### Rule: Keep Assertions in the Test File
A controversial debate in test automation is whether assertions belong inside Page Objects.
In modern Playwright engineering, **assertions belong in the test file (\`.spec.js\`), NOT in the Page Object!**

**Why?**
1. **Reporting Clarity:** When an assertion fails, the test runner points directly to the line in the test spec, making it immediately clear which business requirement failed.
2. **Reusability:** A method like \`login()\` can be used in both positive tests (expecting success) and negative tests (expecting failure). If \`login()\` asserts success internally, you cannot reuse it for negative tests!`,
      keyTakeaways: [
        'Page Objects are ES6 classes initialized with the Playwright page instance.',
        'Locators should be initialized in the constructor using page.getByRole/getByLabel.',
        'Methods encapsulate multi-step user actions (e.g. login, checkout, search).',
        'Keep assertions inside test files for maximum reusability and clear test failure reports.',
      ],
      terminology: [
        { term: 'ES6 Class Syntax', definition: 'The modern JavaScript class syntax (constructor, methods) used to author Page Objects.' },
        { term: 'Assertion Segregation', definition: 'The best practice of keeping assertions in the test spec while keeping interaction methods in the Page Object.' },
      ],
      examples: [
        {
          title: 'Using the Page Object in a Spec File',
          description: 'A clean spec file consuming LoginPage.',
          codeSnippet: `const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('successful student login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('student@rootaccess.org', 'ValidPass123!');

  // Assertion stays in the test spec!
  await expect(page).toHaveURL(/.*dashboard/);
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-pom-2',
        title: 'Assertions in Page Objects',
        prompt: 'Why is it considered a best practice to keep web-first assertions (expect()) inside the test spec rather than buried inside Page Object methods?',
        options: [
          'It preserves test reporting traceability and allows the Page Object action method to be reused for both positive and negative scenarios',
          'Because Playwright disables expect inside class methods',
          'Because assertions inside classes trigger JavaScript memory leaks',
          'Because page objects are only compatible with console.assert',
        ],
        correctAnswerIndex: 0,
        explanation: 'Keeping assertions in test files ensures error stack traces point to the business test step, while allowing action methods (like login) to be reused across positive and negative tests.',
      },
    },

    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Recommended Automation Project Structure',
      durationMinutes: 30,
      explanation: `A well-structured Playwright project scales gracefully from 5 tests to 500 tests.

### Recommended Directory Layout
\`\`\`text
rootaccess-automation/
├── playwright.config.js       # Central test runner configuration
├── package.json
├── pages/                     # Page Object classes
│   ├── BasePage.js            # Optional common navigation/header methods
│   ├── LoginPage.js
│   ├── CatalogPage.js
│   ├── CheckoutPage.js
│   └── DashboardPage.js
├── fixtures/                  # Custom fixtures injecting Page Objects
│   └── testFixtures.js        # test.extend() wiring page objects
├── test-data/                 # Test data sets & personas
│   ├── users.json
│   └── products.json
├── utils/                     # Generic utilities (formatting, date helpers)
│   └── dateUtils.js
└── tests/                     # Test specifications organized by feature
    ├── auth/
    │   ├── login.spec.js
    │   └── registration.spec.js
    ├── catalog/
    │   └── course_search.spec.js
    └── checkout/
        └── purchase_flow.spec.js
\`\`\`

### Clean Page Object Injection with \`test.extend\`
Instead of writing \`const loginPage = new LoginPage(page)\` in every single test, create a custom fixture:
\`\`\`javascript
// fixtures/testFixtures.js
const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { CatalogPage } = require('../pages/CatalogPage');

const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
});

module.exports = { test, expect: base.expect };
\`\`\`

Now in tests, simply destructure \`{ loginPage, catalogPage }\` directly from the test parameters!`,
      keyTakeaways: [
        'Organize files into pages/, tests/, fixtures/, test-data/, and utils/.',
        'Use test.extend() to inject Page Objects directly as test fixtures.',
        'Organize tests by feature domain rather than technical layers.',
      ],
      terminology: [
        { term: 'Fixture Injection', definition: 'Using Playwright’s test.extend() to instantiate and provide Page Objects directly into test arguments.' },
        { term: 'Feature-Based Directory', definition: 'Grouping test files by application domain (e.g. auth/, billing/, checkout/).' },
      ],
      examples: [
        {
          title: 'Writing Tests with Injected Page Object Fixtures',
          description: 'A test utilizing custom fixtures.',
          codeSnippet: `const { test, expect } = require('../fixtures/testFixtures');

test('search course catalog', async ({ catalogPage }) => {
  await catalogPage.goto();
  await catalogPage.search('Playwright');
  await expect(catalogPage.firstResultTitle).toContainText('Playwright Automation');
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-pom-3',
        title: 'Injecting Page Objects via Fixtures',
        prompt: 'What advantage does using test.extend() fixtures provide over manually instantiating new PageObject(page) in every test?',
        options: [
          'It eliminates repetitive boilerplate instantiation and automatically manages page lifecycle and teardown across tests',
          'It allows tests to run without an active browser',
          'It automatically converts HTML into JSON',
          'It replaces npm with yarn',
        ],
        correctAnswerIndex: 0,
        explanation: 'Custom fixtures inject pre-initialized Page Objects directly into tests, keeping test specs concise, uniform, and cleanly decoupled from setup boilerplate.',
      },
    },

    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Framework Design Choices & Avoiding Anti-Patterns',
      durationMinutes: 30,
      explanation: `Even when using Page Objects, poor design decisions can undermine framework maintainability.

### Anti-Pattern 1: The "God Object"
Creating a single \`App.js\` or \`MasterPage.js\` with 1,500 lines containing every locator in the application.
**Fix:** Keep Page Objects focused strictly on a single page or logical component (e.g. \`Navbar.js\`, \`CartDrawer.js\`, \`CheckoutPage.js\`).

### Anti-Pattern 2: Deep Inheritance Hierarchies
Creating \`BasePage\` extends \`CorePage\` extends \`AbstractComponent\` extends \`Root\`.
In modern JavaScript, deep inheritance creates brittle coupling where changes to base classes break unrelated pages.
**Fix:** Prefer **Composition over Inheritance**. For shared UI components (like a Header or Footer), create a separate \`HeaderComponent.js\` class and instantiate it inside relevant Page Objects.

### Anti-Pattern 3: Wrapper Methods for Basic Actions
Writing methods like \`clickButton(locator)\` or \`typeText(locator, text)\` that simply wrap Playwright's native methods.
Playwright's API is already high-level, auto-waiting, and expressive. Don't wrap \`await page.locator.click()\` in a custom function unless it adds meaningful domain logic!`,
      keyTakeaways: [
        'Avoid oversized God Objects; keep classes focused on one page or component.',
        'Prefer composition over deep inheritance hierarchies.',
        'Never write shallow wrapper methods around native Playwright actions like click() or fill().',
        'Expose locators or domain actions, not redundant boilerplate.',
      ],
      terminology: [
        { term: 'God Object', definition: 'An architectural anti-pattern where a single class accumulates excessive responsibilities, becoming difficult to maintain.' },
        { term: 'Composition over Inheritance', definition: 'The software design principle of composing small, focused components rather than creating deep inheritance hierarchies.' },
      ],
      examples: [
        {
          title: 'Component Composition Example',
          description: 'Embedding a reusable Header component inside multiple page objects.',
          codeSnippet: `// pages/components/HeaderComponent.js
class HeaderComponent {
  constructor(page) {
    this.page = page;
    this.userMenu = page.getByRole('button', { name: /user menu/i });
    this.cartBadge = page.getByTestId('cart-count');
  }
}

// pages/HomePage.js
class HomePage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.heroBanner = page.getByRole('banner');
  }
}`,
        },
      ],
      exercise: {
        id: 'checkpoint-pom-4',
        title: 'Avoiding Wrapper Anti-Patterns',
        prompt: 'Why is creating a custom helper method like async function myClick(locator) { await locator.click(); } considered an anti-pattern in Playwright?',
        options: [
          'Because Playwright’s native locator.click() already includes actionability checks, auto-waiting, and rich trace integration; shallow wrappers add indirection without adding value',
          'Because JavaScript classes prohibit function calls',
          'Because click() requires a C++ compiler',
          'Because wrappers crash Node.js',
        ],
        correctAnswerIndex: 0,
        explanation: 'Playwright locator methods already handle visibility, stability, scrolling, and auto-waiting out of the box. Wrapping them in generic passthroughs obscures stack traces with zero benefit.',
      },
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-day12-1',
      questionNumber: 1,
      question: 'What is the Page Object Model (POM), and why is it considered an industry standard in test automation?',
      difficulty: 'Beginner',
      assessmentFocus: 'Design pattern fundamentals and maintainability principles.',
      modelAnswer:
        'The Page Object Model (POM) is an architectural design pattern where web pages or components are represented by classes. The class properties store element locators, and class methods encapsulate user interactions (e.g. login, search, checkout). Tests interact with the page through this abstraction rather than directly manipulating HTML selectors. If the UI changes, we update the selector once in the Page Object class, and all referencing tests continue to pass without modification.',
      followUpQuestion: 'How does POM improve test readability for non-technical stakeholders?',
    },
    {
      id: 'iq-day12-2',
      questionNumber: 2,
      question: 'Should web-first assertions (expect) live inside Page Object methods or inside test specification files? Why?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Separation of concerns and test reporting clarity.',
      modelAnswer:
        'In modern Playwright frameworks, assertions should reside in the test specification files (`.spec.js`), not inside Page Objects. Page Objects should represent the state and behavior of the application, while test specs verify that the behavior matches business expectations. Keeping assertions in test specs enables clear failure reporting (the failure stack trace points to the exact test case requirement) and allows interaction methods—such as `login(user, pass)`—to be reused across both positive success tests and negative validation tests.',
      followUpQuestion: 'Is it ever acceptable to have an assertion inside a Page Object?',
    },
    {
      id: 'iq-day12-3',
      questionNumber: 3,
      question: 'How do you inject Page Objects into Playwright tests using custom fixtures instead of manual class instantiation?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Playwright test.extend architecture and dependency injection.',
      modelAnswer:
        'We use Playwright’s `test.extend()` API to create custom fixtures. In a `fixtures/testFixtures.js` file, we extend the base `test` by defining fixtures for each Page Object (e.g. `loginPage: async ({ page }, use) => { await use(new LoginPage(page)); }`). In our test files, we import `test` from our custom fixture module and destructure `{ loginPage }` directly in the test function arguments. Playwright handles instantiation and lifecycle automatically, keeping tests clean and free of `new Class(page)` boilerplate.',
      followUpQuestion: 'Can custom fixtures have dependencies on other fixtures like storageState?',
    },
    {
      id: 'iq-day12-4',
      questionNumber: 4,
      question: 'What is the "God Object" anti-pattern in Page Object design, and how do you prevent it?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Class design, modularity, and single responsibility principle.',
      modelAnswer:
        'A "God Object" occurs when a developer puts all locators and methods for an entire application (or a huge multi-section dashboard) into a single massive Page Object class exceeding hundreds or thousands of lines. This violates the Single Responsibility Principle and causes merge conflicts. We prevent this by breaking pages into smaller, logical page objects and extracting shared elements (like navigation bars, footers, modal dialogs, and search bars) into independent Component Objects that can be composed into pages.',
      followUpQuestion: 'How does composition over inheritance apply to component objects?',
    },
    {
      id: 'iq-day12-5',
      questionNumber: 5,
      question: 'How do you structure a production-grade Playwright automation repository for a team of 10 QA engineers?',
      difficulty: 'Scenario-Based',
      assessmentFocus: 'Repository layout, maintainability, scalability, and collaboration.',
      modelAnswer:
        'I structure the repository with clear separation of concerns: `playwright.config.js` at root; `pages/` for Page Object classes; `fixtures/` for `test.extend` fixtures and authenticated state setups; `test-data/` for JSON datasets and synthetic personas; `utils/` for generic helper libraries; and `tests/` organized by business domain feature folders (e.g. `tests/auth/`, `tests/checkout/`). We use linters, strict Git branching with pull request templates, and CI pipelines running headless execution with Trace Viewer artifacts on failure.',
      followUpQuestion: 'How do you prevent duplicate helper methods across different feature teams?',
    },
  ],

  quizQuestions: [
    {
      id: 'q-d12-1',
      questionNumber: 1,
      question: 'What is the primary architectural purpose of the Page Object Model (POM)?',
      options: [
        'To separate page interaction mechanics from business test logic, enabling single-point locator maintenance',
        'To speed up CPU clock cycles on the operating system',
        'To convert JavaScript test files into compiled binaries',
        'To eliminate the need for assertions in test suites',
      ],
      correctAnswerIndex: 0,
      explanation: 'POM encapsulates locators and interactions within dedicated classes, so UI changes only require updating the Page Object rather than modifying dozens of test files.',
    },
    {
      id: 'q-d12-2',
      questionNumber: 2,
      question: 'How are element locators typically defined in a modern JavaScript Page Object?',
      options: [
        'As class properties initialized in the constructor using this.page.getByRole() or getByLabel()',
        'As global variables in window.document',
        'In an XML schema file',
        'Inside an alert() popup',
      ],
      correctAnswerIndex: 0,
      explanation: 'Locators are defined in the constructor (e.g. this.submitButton = page.getByRole("button", ...)), keeping them centralized and ready for use in class methods.',
    },
    {
      id: 'q-d12-3',
      questionNumber: 3,
      question: 'Why should assertions like expect(locator).toHaveText() generally stay in the test spec rather than Page Object methods?',
      options: [
        'To keep failure stack traces pointing to the specific test expectation and allow action methods to be reused across positive and negative tests',
        'Because expect is illegal inside JavaScript classes',
        'Because assertions inside classes slow down the browser',
        'Because Playwright disables assertions in external files',
      ],
      correctAnswerIndex: 0,
      explanation: 'Keeping assertions in test files ensures that tests describe business requirements and allows Page Object methods to be reused across positive and negative scenarios.',
    },
    {
      id: 'q-d12-4',
      questionNumber: 4,
      question: 'Which Playwright feature allows you to inject Page Objects directly into tests without writing "new LoginPage(page)" repeatedly?',
      options: [
        'Custom fixtures using test.extend()',
        'The eval() function',
        'The document.querySelector() API',
        'The process.kill() command',
      ],
      correctAnswerIndex: 0,
      explanation: 'test.extend() enables dependency injection of Page Objects as fixtures, providing pre-instantiated pages directly in test function arguments.',
    },
    {
      id: 'q-d12-5',
      questionNumber: 5,
      question: 'What is a "God Object" in the context of Page Object design?',
      options: [
        'A bloated, monolithic class that tries to hold all locators and methods for the entire application in one place',
        'A test that never fails',
        'A browser context with admin rights',
        'A cloud testing server with infinite RAM',
      ],
      correctAnswerIndex: 0,
      explanation: 'A God Object is an anti-pattern where a single class accumulates too many responsibilities, becoming difficult to navigate, maintain, and review.',
    },
    {
      id: 'q-d12-6',
      questionNumber: 6,
      question: 'Why is "Composition over Inheritance" preferred when designing reusable components like Navigation Bars or Footers?',
      options: [
        'Because embedding a component instance inside page objects is cleaner, more flexible, and avoids rigid, fragile base class inheritance',
        'Because JavaScript classes do not support the extends keyword',
        'Because inheritance consumes double the memory in Chromium',
        'Because composition automatically disables CSS styles',
      ],
      correctAnswerIndex: 0,
      explanation: 'Composition allows pages to include only the components they actually contain (e.g. this.header = new HeaderComponent(page)), avoiding brittle inheritance trees.',
    },
    {
      id: 'q-d12-7',
      questionNumber: 7,
      question: 'In a recommended Playwright project layout, where do Page Object classes belong?',
      options: [
        'In a dedicated pages/ directory at the project root',
        'Scattered randomly inside node_modules/',
        'Inside the .git/ folder',
        'In the dist/ assets folder',
      ],
      correctAnswerIndex: 0,
      explanation: 'Keeping Page Objects in a dedicated pages/ directory ensures clean separation from test specifications located in tests/.',
    },
    {
      id: 'q-d12-8',
      questionNumber: 8,
      question: 'What is wrong with writing custom wrapper methods like async function clickEl(locator) { await locator.click(); }?',
      options: [
        'It is a redundant wrapper that adds indirection without value, because Playwright already provides auto-waiting, actionability checks, and trace visibility natively',
        'It causes Playwright to crash immediately',
        'It requires an external Python interpreter',
        'It only works in Firefox',
      ],
      correctAnswerIndex: 0,
      explanation: 'Playwright locators already embody auto-waiting, visibility checks, and retry mechanics. Shallow wrapper functions obscure stack traces without adding any functionality.',
    },
    {
      id: 'q-d12-9',
      questionNumber: 9,
      question: 'If an application redesigns its checkout button from "Place Order" to "Pay Now", how many files must you update in a properly implemented POM framework?',
      options: [
        'Exactly 1 file: the CheckoutPage.js class where the locator is defined',
        'Every single test file that references checkout',
        'package.json and playwright.config.js',
        'All files in the repository',
      ],
      correctAnswerIndex: 0,
      explanation: 'The greatest advantage of POM is single-point maintenance: updating the locator in the Page Object automatically updates all test cases that interact with that button.',
    },
    {
      id: 'q-d12-10',
      questionNumber: 10,
      question: 'How should a Page Object method handle navigation to its corresponding page?',
      options: [
        'Provide an async goto() method that calls this.page.goto("/route")',
        'Hardcode window.location.href in the browser console',
        'Force the user to manually type the URL in the terminal',
        'Navigation cannot be encapsulated in Page Objects',
      ],
      correctAnswerIndex: 0,
      explanation: 'Providing an async goto() method encapsulates the page URL within the Page Object, allowing tests to navigate with a simple await myPage.goto() call.',
    },
  ],
};

export const PLAYWRIGHT_DAY_12_STARTER_CODE = `// tests/shopping_pom_refactored.spec.js
const { test, expect } = require('@playwright/test');

// ============================================================================
// 1. PAGE OBJECT: LoginPage
// ============================================================================
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel(/email/i);
    this.passwordInput = page.getByLabel(/password/i);
    this.signInButton = page.getByRole('button', { name: /sign in|log in/i });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

// ============================================================================
// 2. PAGE OBJECT: InventoryPage
// ============================================================================
class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pageHeading = page.getByRole('heading', { name: /catalog|courses|products/i });
    this.searchInput = page.getByPlaceholder(/search courses|search catalog/i);
    this.cartCountBadge = page.getByTestId('cart-count');
  }

  async goto() {
    await this.page.goto('/courses');
  }

  async searchProduct(name) {
    await this.searchInput.fill(name);
    await this.searchInput.press('Enter');
  }

  getProductCard(title) {
    return this.page.locator('div').filter({ hasText: title }).first();
  }

  async addProductToCart(title) {
    const card = this.getProductCard(title);
    await card.getByRole('button', { name: /enroll|add to cart/i }).click();
  }
}

// ============================================================================
// 3. REFACTORED TEST SUITE USING PAGE OBJECTS
// ============================================================================
test.describe('E-Commerce Shopping - Page Object Model Suite', () => {

  test('TC-POM-01: successful user login using LoginPage POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act: clean high-level domain action
    await loginPage.login('student.automation@rootaccess.org', 'RootAccess@2026');

    // Assert: outcome in test file
    await expect(page).toHaveURL(/.*app|.*dashboard/);
    await expect(page.getByRole('heading', { name: /my enrolled courses|welcome/i })).toBeVisible();
  });

  test('TC-POM-02: search and inspect course catalog using InventoryPage POM', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();

    // Act
    await inventoryPage.searchProduct('Playwright');

    // Assert
    await expect(inventoryPage.pageHeading).toBeVisible();
    const resultCard = inventoryPage.getProductCard('Playwright Automation');
    await expect(resultCard).toBeVisible();
  });

  test('TC-POM-03: negative login displays validation error via LoginPage POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Act
    await loginPage.login('invalid.user@rootaccess.org', 'WrongPassword123!');

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(/invalid.*credentials|invalid.*email/i);
  });

});

// Export classes for multi-file reusability
module.exports = { LoginPage, InventoryPage };
`;

export const PLAYWRIGHT_DAY_12_STARTER_EXPLANATION = `Architecture & Design Decisions:
1. Separation of Concerns: Extracted page interactions into dedicated LoginPage and InventoryPage classes, removing all low-level DOM queries from the test specifications.
2. Locators as Class Properties: Defined elements (emailInput, passwordInput, searchInput) in constructors using accessible Playwright locators (getByRole, getByLabel).
3. Assertion Segregation: Maintained all assertions (expect(page).toHaveURL, expect(errorMessage).toBeVisible) inside the test spec, ensuring clear reporting and reusable action methods.
4. Clean Project Layout: Outlined multi-file export structure suitable for a pages/ directory.
5. Reusable Domain Actions: Encapsulated multi-step user workflows (login, searchProduct) as clean, readable methods.`;

export const PLAYWRIGHT_DAY_12_STARTER_OUTPUT = `Running 3 tests using 3 workers
  ✓ [chromium] › shopping_pom_refactored.spec.js:68:3 › TC-POM-01: successful user login using LoginPage POM (760ms)
  ✓ [chromium] › shopping_pom_refactored.spec.js:80:3 › TC-POM-02: search and inspect course catalog using InventoryPage POM (540ms)
  ✓ [chromium] › shopping_pom_refactored.spec.js:93:3 › TC-POM-03: negative login displays validation error via LoginPage POM (490ms)

  3 passed (2.1s)`;

export function evaluateDay12Assignment(
  code: string,
  _expectedOutput: string,
  explanation: string
): PlaywrightDay12AssignmentRubric {
  const criteria: PlaywrightDay12AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Creates Page Object class
  const createsPageObjectClass =
    /class\s+LoginPage/.test(code) &&
    /constructor\s*\(\s*page\s*\)/.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'Page Object Class Definition (ES6 class)',
    passed: createsPageObjectClass,
    feedback: createsPageObjectClass
      ? 'Implemented Page Object class with constructor(page).'
      : 'Define an ES6 class like class LoginPage { constructor(page) { ... } }.',
  });
  if (createsPageObjectClass) score += 1;

  // 2. Locators as properties
  const locatorsAsProperties =
    /this\.\w+\s*=\s*page\.getBy/i.test(code);
  criteria.push({
    id: 'crit-2',
    title: 'Locators as Class Properties',
    passed: locatorsAsProperties,
    feedback: locatorsAsProperties
      ? 'Stored locators as class instance properties using user-facing methods.'
      : 'Assign locators in constructor using this.elementName = page.getByRole(...).',
  });
  if (locatorsAsProperties) score += 1;

  // 3. Encapsulates page interactions
  const encapsulatesPageInteractions =
    /async\s+login\s*\(/.test(code);
  criteria.push({
    id: 'crit-3',
    title: 'Encapsulated Page Interaction Methods',
    passed: encapsulatesPageInteractions,
    feedback: encapsulatesPageInteractions
      ? 'Encapsulated user actions into reusable async class methods.'
      : 'Provide async action methods (like login()) on the Page Object.',
  });
  if (encapsulatesPageInteractions) score += 1;

  // 4. Keeps assertions in tests
  const keepsAssertionsInTests =
    /test\(.*expect\(/s.test(code) &&
    !/class\s+LoginPage[^{]*\{[^}]*expect\(/s.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Assertion Segregation in Test Specs',
    passed: keepsAssertionsInTests,
    feedback: keepsAssertionsInTests
      ? 'Maintained web-first assertions inside test files for traceability.'
      : 'Keep expect() assertions inside the test specs rather than Page Objects.',
  });
  if (keepsAssertionsInTests) score += 1;

  // 5. Refactors duplicated actions
  const refactorsDuplicatedActions =
    /loginPage\.login\(/.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'Refactored Reusable Actions',
    passed: refactorsDuplicatedActions,
    feedback: refactorsDuplicatedActions
      ? 'Replaced copy-pasted actions with Page Object method calls.'
      : 'Call page object methods (e.g. loginPage.login()) in your tests.',
  });
  if (refactorsDuplicatedActions) score += 1;

  // 6. Demonstrates multiple pages
  const demonstratesMultiplePages =
    /class\s+InventoryPage|class\s+CatalogPage/i.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Multiple Cohesive Page Objects',
    passed: demonstratesMultiplePages,
    feedback: demonstratesMultiplePages
      ? 'Created multiple cohesive Page Objects (LoginPage, InventoryPage).'
      : 'Create at least two distinct Page Objects to demonstrate separation.',
  });
  if (demonstratesMultiplePages) score += 1;

  // 7. Maintains clean project structure
  const maintainsCleanProjectStructure =
    /pages\//i.test(explanation) ||
    /module\.exports/i.test(code);
  criteria.push({
    id: 'crit-7',
    title: 'Modular Export & Directory Layout',
    passed: maintainsCleanProjectStructure,
    feedback: maintainsCleanProjectStructure
      ? 'Structured classes for export and multi-file project architecture.'
      : 'Include module exports and explain directory layout in explanation.',
  });
  if (maintainsCleanProjectStructure) score += 1;

  // 8. Avoids oversized god objects
  const avoidsOversizedGodObjects =
    createsPageObjectClass && demonstratesMultiplePages;
  criteria.push({
    id: 'crit-8',
    title: 'Single Responsibility (No God Objects)',
    passed: avoidsOversizedGodObjects,
    feedback: avoidsOversizedGodObjects
      ? 'Maintained focused classes dedicated to individual page responsibilities.'
      : 'Separate page responsibilities into individual classes.',
  });
  if (avoidsOversizedGodObjects) score += 1;

  // 9. Uses modern class syntax
  const usesModernClassSyntax =
    /class\s+\w+\s*\{/.test(code);
  criteria.push({
    id: 'crit-9',
    title: 'Modern ES6 Class Syntax',
    passed: usesModernClassSyntax,
    feedback: usesModernClassSyntax
      ? 'Utilized modern ES6 class syntax.'
      : 'Use ES6 class syntax instead of legacy prototypes.',
  });
  if (usesModernClassSyntax) score += 1;

  // 10. Syntactically valid JavaScript
  let syntacticallyValidJavaScript = true;
  try {
    new Function(code);
  } catch {
    syntacticallyValidJavaScript =
      code.includes('require(') || code.includes('class ');
  }
  criteria.push({
    id: 'crit-10',
    title: 'Pure JavaScript Syntax (.js)',
    passed: syntacticallyValidJavaScript,
    feedback: syntacticallyValidJavaScript
      ? 'Authored clean, valid JavaScript POM code.'
      : 'Ensure code is syntactically valid JavaScript.',
  });
  if (syntacticallyValidJavaScript) score += 1;

  const passed = score >= 8;
  const feedback = criteria.map((c) => `${c.passed ? '✓' : '✗'} ${c.title}: ${c.feedback}`);

  return {
    score,
    feedback,
    passed,
    criteria,
    createsPageObjectClass,
    locatorsAsProperties,
    encapsulatesPageInteractions,
    keepsAssertionsInTests,
    refactorsDuplicatedActions,
    demonstratesMultiplePages,
    maintainsCleanProjectStructure,
    avoidsOversizedGodObjects,
    usesModernClassSyntax,
    syntacticallyValidJavaScript,
  };
}
