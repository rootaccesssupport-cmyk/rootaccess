import type {
  PlaywrightDay4Unit,
  PlaywrightDay4AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_4_DATA: PlaywrightDay4Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 4,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Locators and Element Identification',
  subtitle:
    'Master resilient element identification with user-facing locators, strict mode resolution, CSS & XPath trade-offs, web-first assertions, Playwright Inspector debugging, and AI-assisted locator engineering.',
  level: 'Beginner to Intermediate',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Day 1–3 concepts (Playwright architecture, JavaScript async/await, project setup, and test runner basics).',
  learningObjectives: [
    'Explain what a locator is in Playwright and how lazy evaluation and auto-waiting differ from traditional DOM element handles.',
    'Identify elements using Playwright user-facing locators (getByRole, getByLabel, getByPlaceholder, getByText, getByTestId).',
    'Understand when and how to fall back to CSS selectors and XPath, and recognize why absolute XPath is an anti-pattern.',
    'Handle multiple matching elements and strictness violations using locator chaining and .filter({ hasText }).',
    'Write resilient web-first assertions (toBeVisible, toHaveText, toBeEnabled, toHaveCount) that retry automatically.',
    'Debug locator issues using the Playwright Inspector (npx playwright test --debug), page.pause(), and codegen.',
    'Leverage AI tools to generate, evaluate, and refine robust locators from raw HTML snippets without introducing fragile dependencies.',
  ],

  roadmap: [
    { day: 1, title: 'Day 1: Automation Fundamentals & Playwright', focus: 'E2E Testing, Architecture, Roadmap', isCompleted: true },
    { day: 2, title: 'Day 2: JavaScript Essentials for Automation', focus: 'Variables, Logic, Functions, Async/Await', isCompleted: true },
    { day: 3, title: 'Day 3: Playwright Setup & First Script', focus: 'CLI, Config, Chromium, First Test', isCompleted: true },
    { day: 4, title: 'Day 4: Locators and Element Identification', focus: 'getByRole, getByLabel, CSS, XPath, Strictness, AI', isCurrent: true },
    { day: 5, title: 'Day 5: Web-First Assertions & Actions', focus: 'expect(locator), Smart Polling, Form Handling' },
    { day: 6, title: 'Day 6: Waiting Strategies & Flakiness', focus: 'Auto-Waiting, Explicit Waits, Timeouts' },
    { day: 7, title: 'Day 7: Pages, Tabs, Frames & Dialogs', focus: 'Multi-Tab Workflows, Iframes, Alerts' },
    { day: 8, title: 'Day 8: Page Object Model (POM) Architecture', focus: 'Clean Architecture, Reusable Page Components' },
    { day: 9, title: 'Day 9: API Testing & Network Interception', focus: 'REST APIs, Route Mocking, JSON Validation' },
    { day: 10, title: 'Day 10: Test Fixtures & Hooks', focus: 'beforeEach, afterEach, Custom Test Fixtures' },
    { day: 11, title: 'Day 11: Data-Driven Testing with JSON & CSV', focus: 'Parameterized Tests, External Test Data' },
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
    // TOPIC 1: What Is a Locator?
    // -----------------------------------------------------------------------
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: What Is a Locator?',
      durationMinutes: 20,
      explanation: `In browser automation, element identification is the single most critical factor determining whether your test suite is rock-solid or plagued by flakiness.

### What is a Locator in Playwright?
A **Locator** in Playwright is not a static reference to a DOM node in the browser's memory. Instead, a Locator is a **recipe or view** that describes *how* to find an element on the page at any given moment.

\`\`\`javascript
// This does NOT search the DOM immediately:
const submitButton = page.getByRole('button', { name: 'Submit Application' });

// The DOM search happens right here when the action or assertion is called:
await submitButton.click();
\`\`\`

### Locators vs Traditional Element Handles (Selenium / Puppeteer)
In legacy tools like Selenium or Puppeteer, finding an element was an eager operation:
1. In Selenium: \`const el = driver.findElement(By.id("btn"));\` immediately queried the browser DOM.
2. If the page was still loading or re-rendering a React component, Selenium immediately threw \`NoSuchElementException\` or later \`StaleElementReferenceException\`.
3. In Playwright, locators are **lazy**. Every time you perform an action (like \`.click()\` or \`.fill()\`), Playwright recalculates the locator, locates the element afresh, auto-waits for it to be visible, enabled, and stable, and executes the action safely.

### Why Positional Selectors Break
Many beginners copy selectors like \`div > div:nth-child(3) > button\` or full XPath \`/html/body/div[1]/section/div[2]/form/div[3]/button\`.
• These positional selectors are tightly coupled to the exact structural layout of the HTML tree.
• If a developer adds a notification banner, wraps an input in a new \`<div>\`, or changes the order of columns, your test immediately breaks even though the user functionality works fine!
• Resilient locators target what the user sees and interacts with, not the arbitrary internal hierarchy of CSS tags.

### Comparing Locator Resilience

| Strategy | Example | Flakiness Risk | Recommendation |
| :--- | :--- | :--- | :--- |
| **User-Facing Accessible Locator** | \`page.getByRole('button', { name: 'Log in' })\` | Extremely Low | **Gold Standard** (matches user perception) |
| **Visible Form Label** | \`page.getByLabel('Email Address')\` | Very Low | **Best for inputs and forms** |
| **Semantic Test ID** | \`page.getByTestId('checkout-pay-btn')\` | Low | Use when no unique visible label exists |
| **Scoped CSS Selector** | \`page.locator('form.login-card input[type="email"]')\` | Medium | Acceptable for complex custom components |
| **Positional CSS / Full XPath** | \`/html/body/div[2]/div/div[4]/button\` | Critical | **Anti-Pattern** (Breaks on minor redesigns) |`,
      keyTakeaways: [
        'A Playwright Locator is a lazy view of an element, recalculated every time an action or assertion executes.',
        'Playwright locators automatically wait for actionable conditions (visible, enabled, stable) before interacting.',
        'Never use absolute XPath or positional CSS selectors—they fail as soon as markup structure changes.',
        'Always favor user-facing accessible locators that align with how real humans identify UI elements.',
      ],
      terminology: [
        { term: 'Locator', definition: 'An object representing an element query that executes lazily upon action or assertion.' },
        { term: 'Lazy Evaluation', definition: 'Deferring computation until the result is explicitly needed.' },
        { term: 'Stale Element Reference', definition: 'A legacy automation error occurring when a cached DOM node is removed or replaced by React/Vue.' },
        { term: 'Actionability Checks', definition: 'Automatic checks Playwright performs (visibility, hit-test, stability, enabled) before clicking or typing.' },
      ],
      examples: [
        {
          title: 'Lazy Evaluation in Action',
          description: 'You can declare locators at the top of a test or in a Page Object constructor. Playwright will not query the DOM until you perform an action like await loginBtn.click(). If the page navigates or re-renders, the locator seamlessly resolves to the fresh element.',
          codeSnippet: `// tests/example.spec.js
const { test, expect } = require('@playwright/test');

test('demonstrates lazy locator evaluation', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  // Declared lazily - no DOM query happens here:
  const usernameInput = page.getByLabel('Username');
  const passwordInput = page.getByLabel('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });

  // DOM queries happen during action execution with auto-waiting:
  await usernameInput.fill('practice');
  await passwordInput.fill('SuperSecretPassword!');
  await loginButton.click();

  await expect(page.getByRole('alert')).toContainText('You logged into a secure area!');
});`,
        },
      ],
      exercise: {
        id: 'ex-1',
        title: 'Exercise A: Choose the Best Locator',
        prompt: `Given the following HTML markup for a primary login submission button:
\`\`\`html
<button type="submit" class="btn btn-primary px-4 py-2 dynamic-btn-88" data-testid="login-submit">
  Log In to Account
</button>
\`\`\`
Which locator is the most resilient and aligns best with Playwright best practices?`,
        options: [
          "page.locator('.dynamic-btn-88')",
          "page.getByRole('button', { name: 'Log In to Account' })",
          "page.locator('/html/body/div[1]/form/button')",
          "page.locator('button.btn.btn-primary')",
        ],
        correctAnswerIndex: 1,
        explanation:
          "page.getByRole('button', { name: 'Log In to Account' }) is the gold standard because it tests the button the way users and screen readers see it. The class '.dynamic-btn-88' contains auto-generated or volatile styling classes, full XPath is brittle, and 'button.btn.btn-primary' matches any primary button.",
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 2: Playwright's User-Facing Locators (The Gold Standard)
    // -----------------------------------------------------------------------
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Playwright User-Facing Locators (The Gold Standard)',
      durationMinutes: 30,
      explanation: `Playwright prioritizes user-facing locators that reflect how actual users and assistive technologies perceive the webpage.

### 1. page.getByRole(role, { name })
This is the recommended first-choice locator for almost every interactive element:
• **Common roles:** \`button\`, \`link\`, \`heading\`, \`textbox\`, \`checkbox\`, \`radio\`, \`combobox\`, \`dialog\`, \`tab\`.
• **The name option:** Refers to the accessible name (the visible text, \`aria-label\`, or linked label).

\`\`\`javascript
// Matches <button>Save Changes</button>
await page.getByRole('button', { name: 'Save Changes' }).click();

// Matches <h2>Account Settings</h2> with level matching
await expect(page.getByRole('heading', { name: 'Account Settings', level: 2 })).toBeVisible();

// Matches <input type="checkbox"> Agree to terms
await page.getByRole('checkbox', { name: 'Agree to terms' }).check();
\`\`\`

### 2. page.getByLabel(text)
The ideal locator for form inputs associated with a \`<label>\` tag or \`aria-labelledby\`:
\`\`\`html
<label for="user-email">Email Address</label>
<input id="user-email" type="email" />
\`\`\`
\`\`\`javascript
await page.getByLabel('Email Address').fill('alex.student@rootaccess.org');
\`\`\`

### 3. page.getByPlaceholder(text)
Use this when inputs do not have an explicit \`<label>\` tag, but have placeholder text:
\`\`\`html
<input type="text" placeholder="Search courses or topics..." />
\`\`\`
\`\`\`javascript
await page.getByPlaceholder('Search courses or topics...').fill('Playwright');
\`\`\`

### 4. page.getByText(text, { exact })
Best for non-interactive elements like paragraphs, status badges, banners, and confirmation text:
\`\`\`javascript
await expect(page.getByText('Order #10492 confirmed!')).toBeVisible();
// Exact substring match:
await expect(page.getByText('Pending Approval', { exact: true })).toBeVisible();
\`\`\`

### 5. page.getByTestId(id)
When an element lacks accessible text or semantic labels (such as an empty SVG icon button or complex canvas container), ask developers to add a \`data-testid\` attribute:
\`\`\`html
<button data-testid="cart-drawer-trigger"><svg .../></button>
\`\`\`
\`\`\`javascript
await page.getByTestId('cart-drawer-trigger').click();
\`\`\`

### The Playwright Locator Hierarchy Pyramid

\`\`\`
          ▲
         / \\    1. getByRole() - Buttons, links, headings, checkboxes
        /   \\   2. getByLabel() - Form input fields
       /     \\  3. getByPlaceholder() - Unlabeled search/input fields
      /       \\ 4. getByText() - Status badges, labels, alerts
     /         \\5. getByTestId() - Icon buttons & dynamic widgets
    /___________\\6. CSS / XPath - Fallback only for legacy markup
\`\`\``,
      keyTakeaways: [
        'getByRole is the gold standard because it validates both role and accessible name simultaneously.',
        'getByLabel is the best choice for form inputs, verifying that accessible labeling works correctly.',
        'getByPlaceholder is ideal for search bars and temporary input placeholders.',
        'getByText is best for verifying textual content in paragraphs, badges, and alerts.',
        'getByTestId is the preferred fallback when user-facing attributes are absent.',
      ],
      terminology: [
        { term: 'Accessible Role', definition: 'The semantic ARIA role of a web element (e.g. button, heading, textbox, link).' },
        { term: 'Accessible Name', definition: 'The human-readable label determined by text content, aria-label, or associated label element.' },
        { term: 'data-testid', definition: 'A custom HTML attribute dedicated to identifying elements in automated tests.' },
      ],
      examples: [
        {
          title: 'Complete Form Interaction with User-Facing Locators',
          description: 'A clean registration script using exclusively user-facing locators in standard JavaScript.',
          codeSnippet: `// tests/registration.spec.js
const { test, expect } = require('@playwright/test');

test('registers new user with accessible locators', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/register');

  await page.getByRole('heading', { name: 'Create Account', level: 1 }).waitFor();
  await page.getByLabel('Full Name').fill('Alex Student');
  await page.getByLabel('Email Address').fill('alex@rootaccess.org');
  await page.getByLabel('Password').fill('StrongPassw0rd!');
  await page.getByRole('checkbox', { name: 'I agree to the Terms of Service' }).check();
  await page.getByRole('button', { name: 'Register Now' }).click();

  await expect(page.getByRole('alert')).toContainText('Account created successfully');
});`,
        },
      ],
      exercise: {
        id: 'ex-2',
        title: 'Exercise B: Fix the Broken Brittle Locator',
        prompt: `A test failed after a frontend redesign because the developer refactored CSS classes:
\`\`\`javascript
// Broken test code:
await page.locator('button.submit-btn-v2.blue-gradient').click();
\`\`\`
The corresponding HTML looks like this:
\`\`\`html
<button type="submit" class="app-cta-submit shadow-lg">Confirm Enrollment</button>
\`\`\`
How should this locator be written in resilient Playwright JavaScript?`,
        options: [
          "await page.locator('button.app-cta-submit').click();",
          "await page.locator('//button[text()=\"Confirm Enrollment\"]').click();",
          "await page.getByRole('button', { name: 'Confirm Enrollment' }).click();",
          "await page.locator('button').first().click();",
        ],
        correctAnswerIndex: 2,
        explanation:
          "await page.getByRole('button', { name: 'Confirm Enrollment' }).click() is the most resilient approach. It does not depend on changing CSS classes (.app-cta-submit or .submit-btn-v2) and will continue passing even if developers re-style the button.",
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 3: CSS Selectors and XPath — When and How to Use Them
    // -----------------------------------------------------------------------
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: CSS Selectors and XPath — When and How to Use Them',
      durationMinutes: 25,
      explanation: `While user-facing locators are preferred, senior QA engineers must know when and how to safely use CSS selectors and XPath for legacy codebases or complex web widgets.

### CSS Selectors: Syntax and Best Practices
CSS selectors identify elements using HTML tag names, IDs, classes, and attributes:
• **ID selector:** \`page.locator('#user-profile')\` — Fast, but only reliable if the ID is static and unique (not dynamically generated like \`#input-19283\`).
• **Attribute selector:** \`page.locator('input[name="postal_code"]')\` — Great when name attributes are fixed.
• **Scoped selector:** \`page.locator('form#checkout-form input[type="text"]')\` — Targets inputs inside a specific form.

### Playwright-Enhanced CSS Selectors
Playwright extends standard CSS with powerful pseudo-classes:
• \`:has-text("...")\` — \`page.locator('.course-card:has-text("Playwright")')\`
• \`:visible\` — \`page.locator('.dropdown-menu:visible')\` (only matches currently rendered, non-hidden elements).

### XPath: The Good, the Bad, and the Dangerous
XPath (XML Path Language) navigates through elements and attributes in an XML/HTML document:
• **Relative XPath (Acceptable when necessary):**
  \`page.locator('//div[@data-sku="PLAYWRIGHT-01"]//button')\`
• **Absolute XPath (NEVER USE):**
  \`page.locator('/html/body/div[1]/div[2]/main/div/section[2]/div/article[3]/div/button')\`
  *Why absolute XPath is catastrophic:* Any tiny DOM change (adding a banner, wrapping a div, changing margins) completely breaks the test path.

### CSS vs XPath vs User-Facing Locators Comparison

| Feature | User-Facing Locators | CSS Selectors | XPath |
| :--- | :--- | :--- | :--- |
| **Readability** | Highest (\`getByRole('button')\`) | Good (\`button.primary\`) | Low (\`//button[contains(@class...)]\`) |
| **Resilience to Restyling** | Immune to CSS class renames | Breaks on class renames | Highly fragile if positional |
| **Accessibility Verification** | Enforces a11y standards | Ignores accessibility | Ignores accessibility |
| **Execution Performance** | Fast native CDP traversal | Fast native browser engine | Slightly slower XML evaluation |
| **Best Used For** | 90% of all UI tests | Custom styling, inputs by name | Deep sibling traversal in legacy tables |`,
      keyTakeaways: [
        'Use CSS attribute selectors (input[name="..."]) when user-facing attributes are unavailable.',
        'Playwright extends CSS with :has-text() and :visible pseudo-selectors.',
        'Never write full absolute XPath starting from /html/body/.',
        'Relative XPath should only be used when navigating backwards (parent/sibling axes) in legacy layouts.',
      ],
      terminology: [
        { term: 'CSS Selector', definition: 'A pattern used in CSS to target and select elements for styling or testing.' },
        { term: 'XPath', definition: 'XML Path Language used to query elements through the XML/HTML document hierarchy.' },
        { term: 'Absolute XPath', definition: 'A path starting from the root (/html/body) that breaks on the slightest DOM variation.' },
        { term: 'Relative XPath', definition: 'A path starting with // that locates elements anywhere in the document based on attributes.' },
      ],
      examples: [
        {
          title: 'Comparing Fragile XPath to Scoped Attribute Selector',
          description: 'Refactoring a brittle legacy XPath selector into a clean, resilient attribute locator.',
          codeSnippet: `// ❌ Brittle Absolute XPath:
await page.locator('/html/body/div[2]/section/form/div[2]/input').fill('admin');

// ❌ Fragile class-dependent CSS:
await page.locator('div.col-md-6 > div.form-group > input.form-control-lg').fill('admin');

// ✅ Resilient User-Facing or Attribute Locator:
await page.getByLabel('Username').fill('admin');
// Or if label is missing:
await page.locator('input[name="username"]').fill('admin');`,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // TOPIC 4: Handling Multiple Elements, Strictness, and Filtering
    // -----------------------------------------------------------------------
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Handling Multiple Elements, Strictness, and Filtering',
      durationMinutes: 30,
      explanation: `One of the most important concepts in modern Playwright is **Strict Mode**.

### What is Playwright's Strict Mode?
When you instruct Playwright to perform an action on a locator (like \`.click()\` or \`.fill()\`), Playwright requires that the locator resolves to **exactly one single element**.
• If 0 elements match: Playwright auto-waits until the timeout and throws a timeout error.
• If **2 or more elements match**: Playwright immediately throws a **Strictness Violation Error**:
\`\`\`
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Add to Cart' }) resolved to 5 elements:
  1) <button class="btn">Add to Cart</button> aka getByRole('button', { name: 'Add to Cart' }).first()
  2) <button class="btn">Add to Cart</button>
  3) <button class="btn">Add to Cart</button>
  ...
\`\`\`

### Why Strict Mode is a Superpower
In legacy tools like Selenium or Cypress, calling \`click()\` when 5 elements match might click the first one invisibly. If the page order changed, your test clicked the wrong item without failing, leading to mysterious bugs and silent test corruption. Playwright forces you to be explicit!

### How to Narrow Down Locators

#### 1. Locator Filtering with .filter({ hasText })
Filter a collection of container elements down to the specific one containing unique text:
\`\`\`javascript
// Find all product cards, filter by the specific course title, then find the button inside it:
const playwrightCard = page
  .locator('.product-card')
  .filter({ hasText: 'Playwright Automation with JavaScript' });

await playwrightCard.getByRole('button', { name: 'Enroll Now' }).click();
\`\`\`

#### 2. Locator Filtering with Child Elements (.filter({ has }))
Filter containers that contain a specific child locator:
\`\`\`javascript
// Find table rows that contain an active status badge:
const activeRow = page
  .getByRole('row')
  .filter({ has: page.getByText('Active', { exact: true }) });

await activeRow.getByRole('button', { name: 'Edit' }).click();
\`\`\`

#### 3. Locator Chaining
Chain locators from parent to child:
\`\`\`javascript
const checkoutModal = page.getByRole('dialog', { name: 'Review Order' });
await checkoutModal.getByRole('button', { name: 'Confirm Payment' }).click();
\`\`\`

#### 4. When to use .first(), .last(), and .nth()
• \`locator.first()\` / \`locator.last()\` / \`locator.nth(index)\` explicitly pick by position.
• **Caution:** Use positional indexers sparingly. If products or list items reorder dynamically, your test might target the wrong item. Always prefer text filtering where possible!

#### 5. Iterating and Counting Elements
\`\`\`javascript
const items = page.getByRole('listitem');
const count = await items.count();
console.log(\`Found \${count} items in the cart\`);

// Iterate through elements:
for (const item of await items.all()) {
  console.log(await item.textContent());
}
\`\`\``,
      keyTakeaways: [
        'Playwright strict mode throws an error if an action locator resolves to more than one element.',
        'Never silence strict mode by blindly appending .first() if a semantic filter is possible.',
        'Use .filter({ hasText: "..." }) to isolate the exact container card, table row, or list item.',
        'Use locator chaining (parent.getByRole(...)) to restrict searches within modals, forms, or cards.',
      ],
      terminology: [
        { term: 'Strict Mode', definition: 'Playwright feature ensuring actions only execute when a locator resolves to a single unique element.' },
        { term: 'Locator Chaining', definition: 'Nesting locator calls so the child locator is queried strictly inside the parent locator.' },
        { term: 'Locator Filtering', definition: 'Narrowing down an existing locator collection by text (.filter({ hasText })) or child locator.' },
      ],
      examples: [
        {
          title: 'Targeting a Specific Row in a Dynamic Table',
          description: 'Using filter and chaining to click Delete on a specific user without relying on row indices.',
          codeSnippet: `// tests/users-table.spec.js
const { test, expect } = require('@playwright/test');

test('deletes user by email without positional index', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/tables');

  // Filter table rows to the one containing the user's email:
  const userRow = page.getByRole('row').filter({ hasText: 'fbach@yahoo.com' });

  // Within that specific row, click the Delete action:
  await userRow.getByRole('link', { name: 'delete' }).click();

  // Verify the row is no longer visible:
  await expect(userRow).toBeHidden();
});`,
        },
      ],
      exercise: {
        id: 'ex-3',
        title: 'Exercise C: Resolve Strict Mode Violation',
        prompt: `You have an e-commerce page with 4 product cards. Each card has a button with the text "Add to Cart". Running \`await page.getByRole('button', { name: 'Add to Cart' }).click();\` throws a strict mode violation error.
What is the most robust way to click "Add to Cart" specifically for the "Wireless Noise Canceling Headphones"?`,
        options: [
          "await page.getByRole('button', { name: 'Add to Cart' }).first().click();",
          "await page.locator('.product-card').filter({ hasText: 'Wireless Noise Canceling Headphones' }).getByRole('button', { name: 'Add to Cart' }).click();",
          "await page.locator('//button[1]').click();",
          "await page.getByText('Add to Cart').click();",
        ],
        correctAnswerIndex: 1,
        explanation:
          "Chaining page.locator('.product-card').filter({ hasText: 'Wireless Noise Canceling Headphones' }).getByRole('button', { name: 'Add to Cart' }) narrows the locator down strictly to the specific product card, guaranteeing that your test clicks the intended item even if the order of products changes.",
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 5: Locator Assertions — Writing Resilient Expectations
    // -----------------------------------------------------------------------
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Topic 5: Locator Assertions — Writing Resilient Expectations',
      durationMinutes: 25,
      explanation: `Assertions are the verdict of your automated test. In Playwright, you should always use **Web-First Assertions**.

### Web-First Assertions vs Generic Assertions
Consider these two ways to verify an element is visible:

\`\`\`javascript
// ❌ Generic Assertion (Anti-Pattern - DO NOT USE):
const isVisible = await page.getByRole('button').isVisible();
expect(isVisible).toBe(true);

// ✅ Web-First Assertion (Gold Standard):
await expect(page.getByRole('button')).toBeVisible();
\`\`\`

### Why Generic Assertions Cause Flaky Tests
• When you run \`await page.getByRole('button').isVisible()\`, Playwright checks the element once at that microsecond. If an animation is fading in or an API call is finishing, \`isVisible()\` returns \`false\` immediately, and \`expect(false).toBe(true)\` fails the test!
• When you run \`await expect(locator).toBeVisible()\`, Playwright enters a smart retry loop. It polls the DOM every 100 milliseconds for up to 5 seconds until the condition becomes true. If it becomes visible after 350ms, your test passes seamlessly without arbitrary sleep delays!

### Core Playwright Web-First Assertions

| Assertion | Purpose | Example |
| :--- | :--- | :--- |
| \`toBeVisible()\` | Verifies element is rendered and visible | \`await expect(banner).toBeVisible();\` |
| \`toBeHidden()\` | Verifies element is detached or hidden | \`await expect(loadingSpinner).toBeHidden();\` |
| \`toHaveText()\` | Matches full or trimmed text | \`await expect(header).toHaveText('Welcome Alex');\` |
| \`toContainText()\` | Matches substring text | \`await expect(alert).toContainText('Success');\` |
| \`toHaveValue()\` | Checks form input value | \`await expect(emailInput).toHaveValue('alex@test.com');\` |
| \`toBeEnabled()\` | Confirms button/input is clickable | \`await expect(submitBtn).toBeEnabled();\` |
| \`toBeDisabled()\` | Confirms button is grayed out/disabled | \`await expect(submitBtn).toBeDisabled();\` |
| \`toHaveCount()\` | Verifies exact number of matching nodes | \`await expect(productCards).toHaveCount(6);\` |
| \`toHaveAttribute()\` | Checks HTML attribute value | \`await expect(link).toHaveAttribute('href', '/login');\` |

### Customizing Assertion Timeouts
By default, web-first assertions poll for 5000ms (5 seconds). You can adjust timeouts per assertion:
\`\`\`javascript
// Allow up to 10 seconds for a slow third-party payment iframe:
await expect(page.getByText('Payment Succeeded')).toBeVisible({ timeout: 10000 });
\`\`\``,
      keyTakeaways: [
        'Always use web-first assertions (await expect(locator).toBeVisible()) rather than generic checks.',
        'Web-first assertions automatically poll and retry until the condition passes or timeout expires.',
        'Use toBeHidden() to wait for spinners or modals to dismiss before proceeding to next steps.',
        'Use toHaveCount() to verify list lengths and search result counts reliably.',
      ],
      terminology: [
        { term: 'Web-First Assertion', definition: 'An assertion that accepts a Locator and automatically retries until the expected condition is met.' },
        { term: 'Smart Polling', definition: 'Repeatedly evaluating an element condition at micro-intervals without blocking the main event loop.' },
        { term: 'Flakiness', definition: 'Inconsistent test outcomes caused by timing races, animations, or premature assertion evaluation.' },
      ],
      examples: [
        {
          title: 'Testing a Search Filter with Web-First Assertions',
          description: 'Using toHaveCount and toContainText to verify live search filtering.',
          codeSnippet: `// tests/search.spec.js
const { test, expect } = require('@playwright/test');

test('filters search results dynamically', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/books');

  const cards = page.locator('.book-card');
  // Initially verify 8 books are displayed:
  await expect(cards).toHaveCount(8);

  // Type into search filter:
  await page.getByPlaceholder('Search books').fill('JavaScript');

  // Web-first assertion auto-waits until list filters down:
  await expect(cards).toHaveCount(2);
  await expect(cards.first()).toContainText('JavaScript');
});`,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // TOPIC 6: Debugging Locators and Playwright Tools
    // -----------------------------------------------------------------------
    {
      id: 'topic-6',
      topicNumber: 6,
      title: 'Topic 6: Debugging Locators and Playwright Tools',
      durationMinutes: 25,
      explanation: `When a locator fails or matches multiple elements, Playwright provides first-class debugging tools to inspect the live DOM without guessing.

### 1. Playwright Inspector (--debug)
Run your test in debug mode to open the interactive Playwright Inspector alongside a live browser:
\`\`\`bash
npx playwright test tests/day4-locators.spec.js --debug
\`\`\`
• **Step Over:** Advance through your test line by line.
• **Pick Locator Tool:** Click the crosshair icon in the Inspector, hover over any element in the browser, and Playwright immediately generates the optimal user-facing locator for you!
• **Live Locator Evaluation:** Type any locator into the Inspector search box to test how many elements it matches in real time.

### 2. Programmatic Pausing with page.pause()
Place \`await page.pause();\` directly in your JavaScript test code where an issue occurs:
\`\`\`javascript
test('diagnosing tricky locator', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com');
  // Script pauses here and opens Inspector:
  await page.pause();
  await page.getByRole('button', { name: 'Subscribe' }).click();
});
\`\`\`

### 3. Code Generator (npx playwright codegen)
Playwright can record your actions and generate JavaScript code on the fly:
\`\`\`bash
npx playwright codegen https://practice.expandtesting.com
\`\`\`
• **Golden Rule for Senior QA:** Codegen is an outstanding discovery tool, but do **not** accept generated code blindly. Review generated selectors, remove redundant clicks, and convert generic locators to accessible semantic roles if needed.

### 4. Reading Locator Error Messages
When an assertion or action fails, Playwright gives you crystal-clear diagnostic information:
1. **Timeout Error:**
   \`locator.click: Timeout 5000ms exceeded. waiting for getByRole('button', { name: 'Save' })\`
   *Diagnosis:* Element never appeared in the DOM, or remained \`display: none\` / obscured.
2. **Strictness Violation:**
   \`resolved to 3 elements\`
   *Diagnosis:* Locator is too broad; use \`.filter({ hasText })\` or locator chaining.`,
      keyTakeaways: [
        'Use npx playwright test --debug to step through tests and visually inspect locator matches.',
        'The Pick Locator tool in Playwright Inspector generates recommended accessible locators.',
        'Use page.pause() inside your script to halt execution and explore DOM states interactively.',
        'Inspect error logs carefully: distinguish between timeout (missing element) and strict mode (multiple elements).',
      ],
      terminology: [
        { term: 'Playwright Inspector', definition: 'A graphical GUI debugger bundled with Playwright for step-by-step test execution.' },
        { term: 'Codegen', definition: 'Playwright code generator tool that records user clicks and keystrokes into clean test scripts.' },
        { term: 'Pick Locator', definition: 'A tool in Playwright Inspector that inspects DOM elements and suggests resilient locators.' },
      ],
      examples: [
        {
          title: 'Quick Debugging with console.log and count()',
          description: 'Print locator counts in your test during development to debug element resolution.',
          codeSnippet: `const cards = page.locator('.course-item');
const count = await cards.count();
console.log('Detected course items:', count);

if (count > 1) {
  const targetCard = cards.filter({ hasText: 'Automation' });
  await targetCard.getByRole('button').click();
}`,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // TOPIC 7: AI-Assisted Locator Selection
    // -----------------------------------------------------------------------
    {
      id: 'topic-7',
      topicNumber: 7,
      title: 'Topic 7: AI-Assisted Locator Selection',
      durationMinutes: 25,
      explanation: `Generative AI tools (ChatGPT, Claude, GitHub Copilot) can accelerate test authoring, but naive AI prompts often generate brittle XPath or volatile CSS classes. Senior automation engineers know how to prompt AI effectively and rigorously verify suggestions.

### How to Write Effective AI Prompts for Locators
When asking an LLM to generate or fix locators, follow this 4-step prompt pattern:
1. **Provide the Exact HTML Snippet:** Copy the relevant DOM node and its parent container.
2. **State Target Action & Framework:** Specify Playwright Test with JavaScript (.js).
3. **Set Architecture Constraints:** Explicitly instruct the AI: *"Prefer getByRole, getByLabel, or getByPlaceholder. Avoid absolute XPath, array indices, and transient utility CSS classes."*
4. **Request Explanation & Resilience Rating:** Ask the AI to justify why the locator won't break if classes or layout change.

### Proven AI Locator Prompt Template
\`\`\`
I am writing an automated test in Playwright using standard JavaScript (.js).
Here is the HTML markup for the component:
[PASTE HTML SNIPPET HERE]

Task:
1. Provide the most resilient Playwright locator to interact with [SPECIFY ELEMENT, e.g. "the Add to Cart button for the Wireless Headphones"].
2. Follow Playwright best practices: prefer user-facing locators (getByRole, getByLabel, getByText) or .filter({ hasText }).
3. Strictly avoid absolute XPath, positional indices (.first()/.nth()), or dynamic CSS utility classes.
4. Provide the exact assertion using web-first expect(locator).toBeVisible().
\`\`\`

### Evaluating and Refining AI Suggestions
Always evaluate AI-generated locators against the **4-Question Checklist**:
1. *Is it user-facing?* Does it match what the human sees or accessibility roles?
2. *Is it unique?* Will it violate strict mode if 3 other items appear?
3. *Is it decoupled from design?* Will changing Tailwind classes (\`bg-blue-600 px-4\`) break it?
4. *Did you verify it in the real DOM?* Always test it in Playwright Inspector or terminal before committing!`,
      keyTakeaways: [
        'Never trust AI-generated locators blindly—LLMs frequently default to brittle full XPath or CSS classes.',
        'Provide the target HTML snippet and explicitly constrain the AI to Playwright user-facing locators.',
        'Use the 4-Question Checklist to audit AI suggestions before incorporating them into test suites.',
        'Verify every AI locator in the live browser using Playwright Inspector or await locator.count().',
      ],
      terminology: [
        { term: 'DOM Context Prompting', definition: 'Supplying raw component HTML markup in an LLM prompt to ground code generation.' },
        { term: 'Brittle Locator', definition: 'A selector vulnerable to failure whenever superficial design or CSS styling changes.' },
        { term: 'Verification Loop', definition: 'The engineering discipline of testing AI-generated locators against live running browsers.' },
      ],
      examples: [
        {
          title: 'Reviewing and Upgrading an AI-Generated Locator',
          description: 'How a senior engineer transforms a naive AI suggestion into production-grade code.',
          codeSnippet: `// ❌ Naive AI Suggestion:
await page.locator('//div[contains(@class,"card")][2]//button').click();

// 🔍 Engineer Review:
// Problem: Relies on XPath and [2] positional index. If items re-order, wrong item is clicked!

// ✅ Refined Production-Grade Locator:
const productCard = page.locator('.product-card').filter({ hasText: 'Professional Headset' });
await productCard.getByRole('button', { name: 'Add to Cart' }).click();`,
        },
      ],
      exercise: {
        id: 'ex-4',
        title: 'Exercise D: AI Locator Review & Refactoring',
        prompt: `You asked an AI tool to locate the checkout button in this markup:
\`\`\`html
<div class="cart-summary flex justify-between p-4">
  <span class="total">$129.00</span>
  <button type="button" class="btn-checkout bg-emerald-500 hover:bg-emerald-600 rounded-lg" data-testid="cart-checkout">
    Proceed to Checkout
  </button>
</div>
\`\`\`
The AI suggested: \`page.locator('button.bg-emerald-500.hover\\:bg-emerald-600')\`.
Why is this suggestion flawed, and what is the best replacement?`,
        options: [
          "It is correct; Tailwind CSS classes never change across app releases.",
          "It is flawed because CSS utility classes frequently change during UI styling updates. The best replacement is page.getByRole('button', { name: 'Proceed to Checkout' }).",
          "It is flawed because buttons cannot be clicked in Playwright. You must use XPath.",
          "It should be replaced by page.locator('button').first().",
        ],
        correctAnswerIndex: 1,
        explanation:
          "Targeting Tailwind styling classes (bg-emerald-500) creates fragile tests that break when a designer tweaks button colors. page.getByRole('button', { name: 'Proceed to Checkout' }) targets the semantic accessible role and visible label, making it immune to visual styling changes.",
      },
    },
  ],

  // -------------------------------------------------------------------------
  // INTERVIEW QUESTIONS (10 Standard + Technical QA Focus)
  // -------------------------------------------------------------------------
  interviewQuestions: [
    {
      id: 'pw-d4-int-1',
      questionNumber: 1,
      question: 'What is a Locator in Playwright, and how does it differ from a DOM element handle in Selenium?',
      difficulty: 'Beginner',
      assessmentFocus: 'Assesses understanding of lazy evaluation, auto-waiting, and how Playwright avoids stale element errors.',
      modelAnswer:
        'In Playwright, a Locator is a lazy description or view of how to find elements on the page. Unlike Selenium WebElement handles, which query the DOM eagerly and throw StaleElementReferenceException when the DOM re-renders, a Playwright Locator re-queries the DOM right before every action or assertion and auto-waits for actionability checks (visible, stable, enabled).',
      followUpQuestion: 'What happens under the hood when you call await page.getByRole("button").click()?',
    },
    {
      id: 'pw-d4-int-2',
      questionNumber: 2,
      question: 'Why does Playwright recommend user-facing locators like getByRole and getByLabel over CSS classes or XPath?',
      difficulty: 'Beginner',
      assessmentFocus: 'Tests appreciation for test resilience, accessibility standards, and maintainability.',
      modelAnswer:
        'User-facing locators emulate how human users and assistive technologies perceive the webpage. They verify that the element has the correct accessibility role and accessible text. Furthermore, CSS classes and DOM hierarchies frequently change during frontend redesigns, whereas user-facing roles and labels remain stable.',
      followUpQuestion: 'In what rare situations would you fall back to a data-testid or CSS selector?',
    },
    {
      id: 'pw-d4-int-3',
      questionNumber: 3,
      question: 'What is Playwright Strict Mode, and what happens when a locator matches multiple elements during an action?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Evaluates understanding of strict mode violations and how to resolve them safely.',
      modelAnswer:
        'Playwright Strict Mode ensures that any locator passed to an action (like click or fill) matches exactly one DOM element. If more than one element matches, Playwright immediately throws a Strict Mode Violation Error. This prevents tests from accidentally interacting with the wrong element when lists or layouts change.',
      followUpQuestion: 'Why is adding .first() to bypass a strict mode error considered a bad practice in regression testing?',
    },
    {
      id: 'pw-d4-int-4',
      questionNumber: 4,
      question: 'How do you target a specific button inside a card or table row when multiple cards have identical buttons?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Tests proficiency with locator filtering (.filter({ hasText })) and locator chaining.',
      modelAnswer:
        'You resolve this using locator filtering or chaining. With .filter({ hasText }), you first target the container (e.g. page.locator(".card").filter({ hasText: "Target Item" })) and then chain down to the button: card.getByRole("button", { name: "Add to Cart" }). This guarantees you interact with the exact card container regardless of page ordering.',
      followUpQuestion: 'How can you filter by another locator rather than plain text?',
    },
    {
      id: 'pw-d4-int-5',
      questionNumber: 5,
      question: 'What is the difference between expect(await locator.isVisible()).toBe(true) and await expect(locator).toBeVisible()?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Crucial test of understanding web-first assertions vs generic synchronous assertions.',
      modelAnswer:
        'expect(await locator.isVisible()).toBe(true) checks visibility once immediately at that instant. If the element is fading in or waiting for an API response, it returns false and fails the test. In contrast, await expect(locator).toBeVisible() is a web-first assertion that repeatedly polls the DOM for up to 5 seconds until the element becomes visible, eliminating flakiness.',
      followUpQuestion: 'What is the default timeout for Playwright web-first assertions, and how can you customize it?',
    },
    {
      id: 'pw-d4-int-6',
      questionNumber: 6,
      question: 'Why are absolute XPath selectors (/html/body/div[2]/...) considered an anti-pattern in modern test automation?',
      difficulty: 'Beginner',
      assessmentFocus: 'Tests selector hygiene and ability to prevent maintenance nightmares.',
      modelAnswer:
        'Absolute XPath selectors depend on the exact nested structure of every parent and sibling tag between <html> and the target element. Any minor change by developers—such as adding a banner, wrapping inputs in a new grid div, or reordering columns—instantly breaks the XPath, causing high test maintenance overhead.',
      followUpQuestion: 'When is relative XPath acceptable in modern frameworks?',
    },
    {
      id: 'pw-d4-int-7',
      questionNumber: 7,
      question: 'How do you debug an element locator that is timing out in a Playwright test?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Assesses practical troubleshooting methodology using Playwright Inspector and logging.',
      modelAnswer:
        'I run the test with npx playwright test --debug or insert await page.pause() before the failing step. This opens the Playwright Inspector and browser window. I use the Pick Locator tool or the Inspector search box to test selectors live against the DOM. I also check whether the element is inside an iframe, hidden by CSS, or waiting on a slow network request.',
      followUpQuestion: 'What CLI flag can you pass to launch tests with a visible browser without full debug mode?',
    },
    {
      id: 'pw-d4-int-8',
      questionNumber: 8,
      question: 'How does Playwright locate form inputs when using getByLabel vs getByPlaceholder?',
      difficulty: 'Beginner',
      assessmentFocus: 'Checks understanding of HTML form accessibility and locator mechanics.',
      modelAnswer:
        'getByLabel finds inputs associated with a <label> element (via the for/id attribute, aria-labelledby, or wrapping <label> tag). getByPlaceholder finds inputs by their HTML placeholder attribute. getByLabel is preferred for permanent form fields because labels are always visible, whereas placeholders disappear when the user begins typing.',
      followUpQuestion: 'What happens if a label has multiple matching form inputs?',
    },
    {
      id: 'pw-d4-int-9',
      questionNumber: 9,
      question: 'How should you prompt an AI coding assistant to generate reliable Playwright locators from HTML snippets?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Evaluates AI fluency, prompt engineering discipline, and adherence to QA standards.',
      modelAnswer:
        'I provide the exact component HTML snippet, specify Playwright JavaScript (.js), and instruct the AI to prioritize user-facing locators (getByRole, getByLabel). I explicitly forbid brittle absolute XPath, positional indices, or dynamic CSS utility classes. Finally, I ask for a web-first assertion and verify the generated selector against the live DOM.',
      followUpQuestion: 'How do you detect if an AI-generated locator is fragile before adding it to your repository?',
    },
    {
      id: 'pw-d4-int-10',
      questionNumber: 10,
      question: 'How can you verify that a dynamic list or table contains exactly 5 items in Playwright?',
      difficulty: 'Beginner',
      assessmentFocus: 'Tests knowledge of web-first count assertions.',
      modelAnswer:
        'You use the web-first assertion await expect(locator).toHaveCount(5). For example: await expect(page.getByRole("listitem")).toHaveCount(5). This assertion automatically retries until the list renders all 5 items or times out, avoiding premature length assertions.',
      followUpQuestion: 'How would you iterate through all matching elements to extract their text values?',
    },
  ],

  // -------------------------------------------------------------------------
  // 10-QUESTION CHECKPOINT QUIZ
  // -------------------------------------------------------------------------
  quizQuestions: [
    {
      id: 'quiz-d4-1',
      questionNumber: 1,
      question: 'What is the primary architectural difference between a Playwright Locator and a Selenium WebElement?',
      options: [
        'A Playwright Locator stores the element directly in memory, whereas Selenium reloads the page.',
        'A Playwright Locator is a lazy view that queries the DOM afresh on action and auto-waits, whereas Selenium executes an eager search.',
        'Selenium WebElements support automatic retry, while Playwright locators do not.',
        'Playwright locators only work with Chrome, while Selenium works with all browsers.',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Playwright locators are lazy: they do not query the DOM until an action or assertion executes. They re-evaluate the query automatically and perform actionability checks, avoiding stale element exceptions.',
    },
    {
      id: 'quiz-d4-2',
      questionNumber: 2,
      question: 'Which of the following is considered Playwright’s top-priority, gold standard locator method?',
      options: [
        'page.locator("//*[@id=...]")',
        'page.getByRole(role, { name })',
        'page.locator("button.btn-primary")',
        'page.getByTestId(id)',
      ],
      correctAnswerIndex: 1,
      explanation:
        'getByRole is the gold standard because it queries elements the way users and assistive technologies perceive them (by accessible role and accessible name), promoting resilient and accessible web applications.',
    },
    {
      id: 'quiz-d4-3',
      questionNumber: 3,
      question: 'What happens when you execute await page.getByRole("button").click() on a page containing 3 buttons?',
      options: [
        'Playwright clicks the first button automatically without warning.',
        'Playwright clicks all 3 buttons concurrently.',
        'Playwright throws a Strict Mode Violation error and fails the test.',
        'Playwright prompts the user in the terminal to select which button to click.',
      ],
      correctAnswerIndex: 2,
      explanation:
        'Playwright enforces Strict Mode on actions. If a locator resolves to more than one element, Playwright immediately throws a strict mode violation error so you can disambiguate the target.',
    },
    {
      id: 'quiz-d4-4',
      questionNumber: 4,
      question: 'What is the recommended method to target a specific button inside a card without using fragile positional indices?',
      options: [
        'page.getByRole("button").first()',
        'page.locator(".card").filter({ hasText: "Product Name" }).getByRole("button", { name: "Buy" })',
        'page.locator("//div[3]//button")',
        'page.locator("button:nth-child(2)")',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Using .filter({ hasText: "..." }) and locator chaining narrows the search strictly inside the matching card container, remaining resilient even if card ordering changes.',
    },
    {
      id: 'quiz-d4-5',
      questionNumber: 5,
      question: 'Why is await expect(locator).toBeVisible() preferred over expect(await locator.isVisible()).toBe(true)?',
      options: [
        'toBeVisible() is shorter to type.',
        'await expect(locator).toBeVisible() automatically polls and retries until the condition is met, whereas isVisible() checks only once.',
        'isVisible() throws a syntax error in JavaScript.',
        'toBeVisible() disables headless mode automatically.',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Web-first assertions like await expect(locator).toBeVisible() poll the DOM repeatedly for up to 5 seconds. In contrast, isVisible() evaluates instantaneously and fails if the element is mid-transition.',
    },
    {
      id: 'quiz-d4-6',
      questionNumber: 6,
      question: 'Which locator should be used for a text input that has a visible associated <label for="email">Email</label> tag?',
      options: [
        'page.getByPlaceholder("Email")',
        'page.getByLabel("Email")',
        'page.getByText("Email")',
        'page.locator("#email")',
      ],
      correctAnswerIndex: 1,
      explanation:
        'page.getByLabel("Email") is designed specifically for form controls associated with a <label> element, verifying both the input and its accessibility relationship.',
    },
    {
      id: 'quiz-d4-7',
      questionNumber: 7,
      question: 'What command launches the Playwright Inspector alongside your browser for interactive locator debugging?',
      options: [
        'npx playwright test --inspect',
        'npx playwright test --debug',
        'node run test --inspector',
        'playwright inspector open',
      ],
      correctAnswerIndex: 1,
      explanation:
        'npx playwright test --debug opens the Playwright Inspector, pausing at each step and enabling the Pick Locator tool and live selector evaluation.',
    },
    {
      id: 'quiz-d4-8',
      questionNumber: 8,
      question: 'Why should you avoid using CSS classes like page.locator("button.bg-blue-600.px-4") in tests?',
      options: [
        'Playwright cannot parse CSS classes with numbers.',
        'CSS utility classes represent visual design implementation and frequently change during restyling, causing test brittleness.',
        'CSS selectors are slower than full XPath.',
        'Browsers do not render CSS classes in headless mode.',
      ],
      correctAnswerIndex: 1,
      explanation:
        'Styling classes (especially Tailwind utility classes) change often during UI redesigns. Tying automated tests to utility classes makes tests brittle and maintenance-heavy.',
    },
    {
      id: 'quiz-d4-9',
      questionNumber: 9,
      question: 'What does the web-first assertion await expect(cards).toHaveCount(4) do?',
      options: [
        'Immediately asserts that an array in JavaScript has a length of 4.',
        'Counts the number of browser tabs open.',
        'Polls the DOM until exactly 4 elements matching the locator exist, or times out if count is not reached.',
        'Sets the number of worker threads to 4.',
      ],
      correctAnswerIndex: 2,
      explanation:
        'toHaveCount polls the DOM until the exact number of matching elements is present, allowing asynchronous lists to load without premature failure.',
    },
    {
      id: 'quiz-d4-10',
      questionNumber: 10,
      question: 'When an AI assistant suggests page.locator("/html/body/div[1]/form/div[2]/button"), what should you do?',
      options: [
        'Accept it because AI code is always optimized for production.',
        'Convert it to an even longer absolute XPath.',
        'Reject the absolute XPath and refactor it into an accessible locator like page.getByRole("button", { name: "Submit" }).',
        'Add a 5-second sleep before the line so the XPath has time to resolve.',
      ],
      correctAnswerIndex: 2,
      explanation:
        'Absolute XPath is an anti-pattern that breaks on any DOM modification. Senior engineers always refactor AI-suggested absolute XPaths into semantic, user-facing locators like getByRole.',
    },
  ],
};

// ---------------------------------------------------------------------------
// STARTER CODE FOR PRACTICAL ASSIGNMENT
// ---------------------------------------------------------------------------
export const PLAYWRIGHT_DAY_4_STARTER_CODE = `// tests/day4-locators.spec.js
// Playwright Automation with JavaScript + AI — Day 4
const { test, expect } = require('@playwright/test');

test.describe('E-Commerce Product Catalog — Locator Mastery', () => {
  test('accurately locates elements using resilient user-facing strategies', async ({ page }) => {
    // 1. Navigate to target application
    await page.goto('https://practice.expandtesting.com/books');

    // 2. Target Element 1: Accessible heading via getByRole
    // Strategy: getByRole('heading', { level: 1 }) is resilient to DOM reorganization and styling changes
    const pageHeader = page.getByRole('heading', { name: 'Book Store', level: 1 });
    await expect(pageHeader).toBeVisible();

    // 3. Target Element 2: Search input via getByPlaceholder or getByLabel
    // Strategy: getByPlaceholder provides clear human-facing intent without relying on dynamic input IDs
    const searchInput = page.getByPlaceholder('Type to search...');
    await searchInput.fill('Playwright');
    await expect(searchInput).toHaveValue('Playwright');

    // 4. Target Element 3 & Narrowing Multiple Matches: Filter specific product card
    // Strategy: Avoid positional indexes (.nth(0)) or fragile XPath (/html/body/div[2]/...).
    // Instead, use .filter({ hasText }) to chain down to the exact product container.
    const productCard = page
      .locator('.product-card, [data-testid="product-item"]')
      .filter({ hasText: 'Automated Testing with Playwright' });

    // Strict mode check: Target the "Add to Cart" button within THIS specific card container
    const addToCartButton = productCard.getByRole('button', { name: 'Add to Cart' });
    await expect(addToCartButton).toBeVisible();
    await expect(addToCartButton).toBeEnabled();

    // 5. Assert total matching verified cards
    await expect(productCard).toHaveCount(1);
  });
});`;

export const PLAYWRIGHT_DAY_4_STARTER_OUTPUT = `$ npx playwright test tests/day4-locators.spec.js --headed

Running 1 test using 1 worker
[chromium] › tests/day4-locators.spec.js:5:3 › E-Commerce Product Catalog — Locator Mastery › accurately locates elements using resilient user-facing strategies
  ✓ 1 [chromium] › tests/day4-locators.spec.js:5:3 › E-Commerce Product Catalog (1.4s)

  1 passed (2.1s)`;

export const PLAYWRIGHT_DAY_4_STARTER_EXPLANATION = `### Locator Engineering & AI Review Summary:
1. **Target Elements & Strategy:** We targeted the page heading, search input, and dynamic product card. Rather than using brittle XPath or auto-generated classes like .css-19f8z, we utilized accessible user-facing locators (getByRole, getByPlaceholder).
2. **Handling Strictness & Multiple Elements:** An e-commerce catalog contains dozens of identical "Add to Cart" buttons. To prevent Playwright's strict mode violation error without resorting to fragile array indices (.first()), we chained the locator using .filter({ hasText: 'Automated Testing with Playwright' }).
3. **AI Prompt & Evaluation:** We prompted our AI assistant: "Given this product grid HTML snippet, generate a resilient Playwright JavaScript locator for the Add to Cart button inside the Automated Testing with Playwright card. Prefer getByRole and locator filtering over XPath."
4. **DOM Verification Method:** The AI initially proposed page.locator('//button[contains(text(),"Add to Cart")]'). We reviewed and refined this fragile XPath into page.locator('.product-card').filter({ hasText: '...' }).getByRole('button') and verified uniqueness using the Playwright Inspector (npx playwright test --debug) and checking await locator.count() === 1.`;

// ---------------------------------------------------------------------------
// DETERMINISTIC 10-POINT EVALUATOR FOR PRACTICAL ASSIGNMENT
// ---------------------------------------------------------------------------
export function evaluateDay4Assignment(
  code: string,
  expectedOutput: string,
  explanation: string
): PlaywrightDay4AssignmentRubric {
  let score = 0;
  const feedback: string[] = [];

  // 1. Target elements identified (at least 3 distinct element types or target references)
  const targetElementsIdentified =
    /(heading|input|button|card|search|item|row|field)/i.test(code) &&
    (code.match(/(getByRole|getByLabel|getByPlaceholder|getByText|getByTestId|locator)/g) || []).length >= 3;
  if (targetElementsIdentified) {
    score += 1;
    feedback.push('✓ At least 3 distinct target elements identified and targeted.');
  } else {
    feedback.push('✗ Must locate and interact with at least 3 distinct elements on the page.');
  }

  // 2. Uses accessible locators (getByRole, getByLabel, getByPlaceholder, getByText, or getByTestId)
  const usesAccessibleLocators =
    /(getByRole|getByLabel|getByPlaceholder|getByText|getByTestId)/i.test(code);
  if (usesAccessibleLocators) {
    score += 1;
    feedback.push('✓ Uses user-facing accessible locators (getByRole, getByLabel, etc.).');
  } else {
    feedback.push('✗ Must use Playwright user-facing locators like getByRole or getByLabel instead of brittle CSS.');
  }

  // 3. Has at least three web-first assertions
  const assertionMatches =
    code.match(/await\s+expect\s*\([\s\S]+?\)\.(toBeVisible|toBeHidden|toHaveText|toContainText|toHaveValue|toBeEnabled|toBeDisabled|toHaveCount|toHaveAttribute)/g) || [];
  const hasThreeAssertions = assertionMatches.length >= 3;
  if (hasThreeAssertions) {
    score += 1;
    feedback.push(`✓ Contains ${assertionMatches.length} web-first assertions with auto-retrying.`);
  } else {
    feedback.push('✗ Must include at least 3 web-first assertions (e.g. toBeVisible, toHaveText, toBeEnabled, toHaveCount).');
  }

  // 4. Narrows multiple matches (uses .filter({ hasText }) or locator chaining)
  const narrowsMultipleMatches =
    /(\.filter\s*\(\s*\{|\.locator\s*\([^)]+\)\.(getByRole|getByLabel|getByText|locator))/i.test(code);
  if (narrowsMultipleMatches) {
    score += 1;
    feedback.push('✓ Narrows down multiple matching elements using .filter() or locator chaining.');
  } else {
    feedback.push('✗ Must demonstrate resolving multiple elements using .filter({ hasText: ... }) or locator chaining.');
  }

  // 5. AI suggestion or prompt template documented in explanation or code comments
  const cleanExplanation = explanation.trim();
  const aiSuggestionDocumented =
    /(ai|prompt|chatgpt|claude|copilot|llm|suggest|refin|generat)/i.test(cleanExplanation) ||
    /(ai|prompt|chatgpt|claude|copilot|llm)/i.test(code);
  if (aiSuggestionDocumented) {
    score += 1;
    feedback.push('✓ AI prompt, suggestion, or review workflow documented.');
  } else {
    feedback.push('✗ Written explanation or code comments must document the AI prompt or locator evaluation process.');
  }

  // 6. Has terminal output showing test execution
  const cleanOutput = expectedOutput.trim();
  const hasTerminalOutput =
    cleanOutput.length >= 20 &&
    /(passed|chromium|running|test|worker|playwright)/i.test(cleanOutput);
  if (hasTerminalOutput) {
    score += 1;
    feedback.push('✓ Realistic terminal test execution output provided.');
  } else {
    feedback.push('✗ Must provide terminal execution output demonstrating test execution (e.g. "1 passed").');
  }

  // 7. Locator strategy explained in code comments or explanation
  const locatorStrategyExplained =
    cleanExplanation.length >= 60 &&
    /(strategy|locator|accessible|resilient|brittle|xpath|css|role)/i.test(cleanExplanation);
  if (locatorStrategyExplained) {
    score += 1;
    feedback.push('✓ Locator selection rationale clearly explained.');
  } else {
    feedback.push('✗ Please write a detailed explanation (at least 60 characters) explaining why specific locators were chosen.');
  }

  // 8. Strictness addressed (explains or demonstrates handling strict mode without brittle indices)
  const strictnessAddressed =
    /(strict|multiple|disambiguat|filter|chain|unique|single element)/i.test(cleanExplanation) ||
    /(filter\s*\(|locator\([^)]+\)\.getByRole)/i.test(code);
  if (strictnessAddressed) {
    score += 1;
    feedback.push('✓ Addressed Playwright strict mode and resolved ambiguous matches cleanly.');
  } else {
    feedback.push('✗ Must explain or demonstrate how strict mode was addressed without relying on fragile positional indices.');
  }

  // 9. AI verification method explained (how AI locator was verified in real DOM)
  const aiVerificationMethodExplained =
    /(inspector|debug|codegen|verify|verif|count|real dom|browser|tested)/i.test(cleanExplanation);
  if (aiVerificationMethodExplained) {
    score += 1;
    feedback.push('✓ Real DOM verification methodology explained.');
  } else {
    feedback.push('✗ Explanation must describe how the locator was verified against the real DOM (e.g. via Inspector, count, or test run).');
  }

  // 10. Syntactically valid JavaScript with test/expect and async/await
  const syntacticallyValidJavaScript =
    /(const|let|var)\s+\{\s*test,\s*expect\s*\}\s*=\s*require\s*\(['"]@playwright\/test['"]\)|import\s+\{\s*test,\s*expect\s*\}\s+from\s+['"]@playwright\/test['"]/i.test(code) &&
    /test\s*\(/i.test(code) &&
    /async\s*\(\s*\{\s*page\s*\}\s*\)/i.test(code) &&
    /await\s+page\./i.test(code);
  if (syntacticallyValidJavaScript) {
    score += 1;
    feedback.push('✓ Clean, syntactically valid JavaScript test structure using async/await and Playwright fixtures.');
  } else {
    feedback.push('✗ Test code must be valid JavaScript importing test/expect from @playwright/test and using async ({ page }).');
  }

  const criteria = [
    { id: 'c1', title: 'Target Elements Identified (≥ 3)', passed: targetElementsIdentified, feedback: feedback[0] || '' },
    { id: 'c2', title: 'User-Facing Accessible Locators', passed: usesAccessibleLocators, feedback: feedback[1] || '' },
    { id: 'c3', title: 'Web-First Assertions (≥ 3)', passed: hasThreeAssertions, feedback: feedback[2] || '' },
    { id: 'c4', title: 'Multiple Matches Narrowing (.filter / chaining)', passed: narrowsMultipleMatches, feedback: feedback[3] || '' },
    { id: 'c5', title: 'AI Prompt / Suggestion Documented', passed: aiSuggestionDocumented, feedback: feedback[4] || '' },
    { id: 'c6', title: 'Terminal Execution Output', passed: hasTerminalOutput, feedback: feedback[5] || '' },
    { id: 'c7', title: 'Locator Selection Rationale Explained', passed: locatorStrategyExplained, feedback: feedback[6] || '' },
    { id: 'c8', title: 'Strict Mode Resolution Addressed', passed: strictnessAddressed, feedback: feedback[7] || '' },
    { id: 'c9', title: 'AI Verification Methodology Explained', passed: aiVerificationMethodExplained, feedback: feedback[8] || '' },
    { id: 'c10', title: 'Valid JavaScript Test Structure', passed: syntacticallyValidJavaScript, feedback: feedback[9] || '' },
  ];

  return {
    targetElementsIdentified,
    usesAccessibleLocators,
    hasThreeAssertions,
    narrowsMultipleMatches,
    aiSuggestionDocumented,
    hasTerminalOutput,
    locatorStrategyExplained,
    strictnessAddressed,
    aiVerificationMethodExplained,
    syntacticallyValidJavaScript,
    score,
    feedback,
    passed: score >= 8,
    criteria,
  };
}
