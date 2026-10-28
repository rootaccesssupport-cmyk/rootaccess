import type {
  PlaywrightDay16Unit,
  PlaywrightDay16AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_16_DATA: PlaywrightDay16Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 16,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'AI-Assisted Test Generation and Locator Suggestions',
  subtitle:
    'Leverage Generative AI as a high-velocity testing partner while retaining human architectural judgement. Master structured prompting, critique AI-generated locators, eliminate hallucinations, and perform rigorous automated code reviews.',
  level: 'Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–15 concepts (Locators, web-first assertions, POM, API testing, and CI/CD).',
  learningObjectives: [
    'Understand high-value AI applications in testing: requirement extraction, test scenario generation, and boilerplate scaffolding.',
    'Recognize AI failure modes: hallucinated methods, brittle selectors, incomplete edge cases, and outdated API syntax.',
    'Author structured prompts providing application context, DOM snippets, constraints, and strict assertions in pure JavaScript.',
    'Systematically evaluate AI-generated locators: prioritizing getByRole and getByLabel over brittle XPaths and CSS classes.',
    'Perform rigorous code reviews on AI-generated test scripts, identifying anti-patterns like arbitrary sleeps and weak assertions.',
    'Maintain human accountability: never blindly trust AI code without verification against the real running DOM.',
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
    { day: 16, title: 'Day 16: AI-Assisted Test Generation & Locators', focus: 'Structured Prompts, Locator Critique, Code Review', isCurrent: true },
    { day: 17, title: 'Day 17: AI Debugging & Flaky-Test Analysis', focus: 'Root Cause Analysis, Deceptive AI Fixes' },
    { day: 18, title: 'Day 18: AI-Assisted Test Planning & Synthetic Data', focus: 'Requirements to Tests, Edge Cases, Coverage Matrix' },
    { day: 19, title: 'Day 19: Framework Quality & Playwright MCP', focus: 'Model Context Protocol, Safe AI Workflows' },
    { day: 20, title: 'Day 20: Final Project, Assessment & Interview Prep', focus: 'Capstone E-commerce Framework, Certification' },
  ],

  topics: [
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: Where AI Helps in Test Automation (and Where It Fails)',
      durationMinutes: 25,
      explanation: `Large Language Models (LLMs) are powerful force multipliers for QA engineers when used responsibly.

### Where AI Excels in QA
1. **Converting Requirements into Test Scenarios:** Turning user stories and acceptance criteria into structured test outlines.
2. **Scaffolding Starter Code:** Rapidly generating boilerplate test blocks and Page Object skeletons.
3. **Drafting Synthetic Test Data:** Generating realistic addresses, names, and boundary strings.
4. **Explaining Obscure Error Messages:** Translating complex regex mismatch or websocket CDP protocol errors into plain English.

### Where AI Consistently Fails (Hallucinations & Blindspots)
1. **Inventing Nonexistent APIs:** Hallucinating methods like \`page.clickAndWait()\` or \`page.waitForElement()\`.
2. **Recommending Brittle Locators:** Falling back to full absolute XPaths (\`/html/body/div[2]/form/div[1]/input\`) or dynamic Tailwind utility classes (\`.flex.items-center.text-sm\`).
3. **Inserting Dangerous Sleeps:** Adding \`await page.waitForTimeout(5000)\` whenever it cannot reason about synchronization.
4. **Weak Assertions:** Using \`expect(element).toBeTruthy()\` which passes even if the element is hidden or disconnected!
5. **Missing Asynchronous Await:** Forgetting \`await\` before Playwright async calls, causing unhandled Promise rejections.

**Golden Rule:** AI produces first drafts, not final production code. You are the engineer accountable for correctness!`,
      keyTakeaways: [
        'AI is an accelerator for scaffolding, test planning, and data generation.',
        'Watch out for hallucinated APIs, brittle selectors, and missing awaits.',
        'Always verify AI output against real running DOM and official Playwright documentation.',
      ],
      terminology: [
        { term: 'Hallucination', definition: 'When an AI model generates syntactically convincing code that references nonexistent methods, libraries, or behaviors.' },
        { term: 'AI Co-Pilot Model', definition: 'The professional practice of using AI to propose solutions while the human engineer evaluates, refactors, and takes full responsibility for code quality.' },
      ],
      examples: [
        {
          title: 'Common AI Hallucination Example',
          description: 'Recognizing outdated or fabricated Playwright syntax in AI suggestions.',
          codeSnippet: `// ❌ HALLUCINATED / DEPRECATED AI CODE:
await page.waitForXPath('//button'); // Deprecated!
await page.type('#email', 'user@test.io'); // Deprecated (use fill)!
await page.waitForTimeout(3000); // Anti-pattern!

// ✅ VERIFIED MODERN PLAYWRIGHT (JavaScript):
await page.getByLabel('Email').fill('user@test.io');
await page.getByRole('button', { name: 'Sign In' }).click();`,
        },
      ],
      exercise: {
        id: 'checkpoint-ai-1',
        title: 'Responsibility for AI Code',
        prompt: 'If an AI assistant generates a test script containing brittle XPaths and missing awaits that breaks the nightly build, who is responsible?',
        options: [
          'The human automation engineer who reviewed, accepted, and committed the code without verifying it against the real application',
          'The AI model vendor',
          'The GitHub server',
          'Nobody, it is considered an act of nature',
        ],
        correctAnswerIndex: 0,
        explanation: 'Engineers are 100% accountable for all code committed to a repository. AI output must be audited and verified with the same rigor as human pull requests.',
      },
    },

    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Structured Prompting for Playwright Automation',
      durationMinutes: 30,
      explanation: `Generic prompts like "write a test for login" produce generic, broken code. To get high-quality automation code from an AI assistant, use the **Structured QA Prompt Pattern**.

### The 6 Elements of a Professional Automation Prompt
1. **Role & Framework:** "Act as a senior Playwright automation engineer using modern pure JavaScript (.js, not TypeScript)."
2. **Context & Goal:** "We are testing the customer registration form of an e-commerce platform."
3. **HTML / DOM Snippet:** Provide the actual trimmed HTML snippet from Chrome DevTools.
4. **Behavioral Constraints:** "Use web-first assertions (expect(locator).toBeVisible()), no page.waitForTimeout(), prioritize accessible roles (getByRole, getByLabel)."
5. **Positive & Negative Scenarios:** "Generate one valid submission and two boundary validation error scenarios."
6. **Code Style:** "Provide pure JavaScript using Page Object Model or test() blocks with Arrange-Act-Assert."

### Example of an Effective Prompt
\`\`\`text
You are an expert Playwright automation engineer.
Write a Playwright Test script in pure JavaScript (.spec.js) for this checkout form:

HTML:
<form id="checkout-form">
  <label for="shipping-name">Full Name</label>
  <input id="shipping-name" type="text" required />
  
  <label for="shipping-zip">Postal Code</label>
  <input id="shipping-zip" type="text" pattern="[0-9]{5}" />

  <button type="submit">Place Order</button>
</form>

Rules:
1. Use page.getByLabel() and page.getByRole().
2. Use web-first assertions like await expect().
3. Do NOT use page.waitForTimeout() or XPath.
4. Test 1 valid submission and 1 invalid postal code submission.
\`\`\``,
      keyTakeaways: [
        'Provide DOM snippets and explicit constraints in your prompts.',
        'Explicitly forbid anti-patterns (no waitForTimeout, no brittle XPaths).',
        'Specify pure JavaScript and modern Playwright methods.',
      ],
      terminology: [
        { term: 'Structured Prompting', definition: 'Formulating prompts with explicit roles, context, DOM grounding, constraints, and output formatting rules.' },
        { term: 'DOM Grounding', definition: 'Supplying the real HTML structure in the prompt to prevent the AI from guessing or hallucinating element attributes.' },
      ],
      examples: [
        {
          title: 'Before & After Prompt Quality',
          description: 'Showing how DOM grounding transforms AI output.',
          codeSnippet: `// Poor prompt: "Write test for search"
// Output: page.locator('#search').type('shoes'); // Generic guess

// Grounded prompt: "Here is HTML: <input aria-label='Search Catalog' ...>"
// Output: await page.getByRole('searchbox', { name: 'Search Catalog' }).fill('shoes');`,
        },
      ],
      exercise: {
        id: 'checkpoint-ai-2',
        title: 'Prompt Grounding',
        prompt: 'Why does providing the real HTML snippet from DevTools drastically improve AI-generated Playwright tests?',
        options: [
          'It grounds the model in the actual element tags, accessible labels, and input IDs, preventing it from inventing fake selectors',
          'It compiles the code in memory',
          'It bypasses rate limits',
          'It automatically runs the test in Chrome',
        ],
        correctAnswerIndex: 0,
        explanation: 'Grounding the prompt with real DOM snippets eliminates guessing, allowing the AI to recommend accurate user-facing locators (getByRole, getByLabel) matching the actual markup.',
      },
    },

    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Evaluating AI-Generated Locators',
      durationMinutes: 35,
      explanation: `When asked for locators, AI models often suggest several alternatives. As an automation engineer, you must evaluate them against the **Playwright Locator Priority Hierarchy**.

### The Locator Hierarchy
\`\`\`text
Rank 1 (Best):       getByRole('button', { name: 'Submit' })   -> Mirrors real user & screen reader
Rank 2 (Excellent):  getByLabel('Work Email')                  -> Mirrors form label binding
Rank 3 (Great):      getByPlaceholder('Search...')             -> Good when labels are absent
Rank 4 (Good):       getByText('Welcome back')                 -> Great for static text confirmation
Rank 5 (Acceptable): getByTestId('order-summary-card')         -> Explicit QA contracts
Rank 6 (Fragile):    page.locator('.btn.btn-primary.mt-4')     -> Breaks on CSS styling changes!
Rank 7 (Avoid):      page.locator('xpath=//div[3]/form/button') -> Breaks on minor DOM refactors!
\`\`\`

### Evaluating an AI Recommendation: Case Study
Given this button: \`<button class="px-4 py-2 bg-indigo-600 rounded-xl" aria-label="Confirm Purchase">Pay $99</button>\`

AI Suggestion A: \`page.locator('.bg-indigo-600')\` -> ❌ **REJECT.** Tailwind utility class; breaks if color changes to emerald!
AI Suggestion B: \`page.locator('//button[contains(text(), "Pay")]')\` -> ⚠️ **SUBOPTIMAL.** Unnecessary XPath.
AI Suggestion C: \`page.getByRole('button', { name: 'Confirm Purchase' })\` -> ✅ **ACCEPT.** Highest resilience; utilizes accessible ARIA label!`,
      keyTakeaways: [
        'Always prioritize getByRole and getByLabel over CSS classes and XPath.',
        'Reject CSS classes that represent visual styling (Tailwind, Bootstrap).',
        'Reject positional XPaths that break when surrounding layout changes.',
        'Check that locators satisfy Playwright’s strict mode.',
      ],
      terminology: [
        { term: 'Locator Resilience', definition: 'The ability of a locator to continue identifying the intended element despite non-breaking markup or CSS refactors.' },
        { term: 'Accessible Role Matching', definition: 'Locating elements by their accessibility tree role and name (e.g. button, heading, dialog).' },
      ],
      examples: [
        {
          title: 'Locator Evaluation Matrix',
          description: 'A comparison table evaluating 4 suggested locators.',
          codeSnippet: `Element: <button id="btn_982" class="cta-blue" aria-label="Save Profile">Save</button>

1. page.locator('#btn_982')                     -> Risk: Dynamic ID generated by backend.
2. page.locator('.cta-blue')                     -> Risk: Purely visual class.
3. page.getByRole('button', { name: 'Save Profile' }) -> WINNER: Semantic, accessible, robust!`,
        },
      ],
      exercise: {
        id: 'checkpoint-ai-3',
        title: 'Rejecting Fragile AI Locators',
        prompt: 'An AI suggests: await page.locator("div > div:nth-child(3) > button.btn-blue").click(). Why should you reject this suggestion?',
        options: [
          'It relies on fragile DOM hierarchy (nth-child) and visual styling (.btn-blue); it will break as soon as a designer adjusts page spacing or layout',
          'Because Playwright cannot process nth-child selectors',
          'Because blue buttons are unsupported in WebKit',
          'Because click() cannot be chained to locators',
        ],
        correctAnswerIndex: 0,
        explanation: 'Deep structural paths (div > div:nth-child) are the most fragile selectors in test automation. Any minor markup change immediately breaks the test.',
      },
    },

    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Automated AI Code Review Checklist',
      durationMinutes: 30,
      explanation: `Before accepting any AI-generated test script into your repository, run it through this **7-Point Inspection Checklist**:

### The 7-Point AI Code Review Checklist
1. **Missing \`await\` Audit:** Did the model forget \`await\` before any \`page\`, \`locator\`, or \`expect\` calls? (Every Playwright action and web-first assertion is a Promise!).
2. **Arbitrary Sleep Removal:** Search for \`page.waitForTimeout()\`. Replace with auto-retrying assertions or \`page.waitForResponse()\`.
3. **Weak Assertion Hardening:** Did the AI write \`expect(result).toBeTruthy()\` or \`expect(result !== null)\`? Replace with explicit web-first assertions: \`await expect(result).toBeVisible()\`, \`await expect(result).toHaveText('Success')\`.
4. **Outdated API Syntax:** Did it use Puppeteer or Selenium syntax like \`page.type()\`, \`page.waitForSelector()\`, or \`page.$()\`? Update to modern Playwright: \`locator.fill()\`, \`getByRole()\`.
5. **Strict Mode Compliance:** Does the locator match multiple items on the page? Add \`filter()\` or disambiguate with accessible names.
6. **Credential Sanitization:** Did the AI hardcode dummy passwords or simulated secrets in plaintext? Use \`process.env\`.
7. **Test Independence:** Does the test clean up or rely on an already-open page? Ensure tests are fully self-contained.`,
      keyTakeaways: [
        'Always check for missing await keywords.',
        'Hardening weak assertions (toBeTruthy -> toBeVisible/toHaveText) prevents false positives.',
        'Strip arbitrary sleeps and replace with auto-retrying web-first assertions.',
        'Verify locators adhere to strict mode.',
      ],
      terminology: [
        { term: 'False Positive', definition: 'A test that passes despite the application containing a defect, usually caused by weak or missing assertions.' },
        { term: 'Promise Resolution Bug', definition: 'A bug where omitting the await keyword allows the test to finish before the asynchronous action or assertion resolves.' },
      ],
      examples: [
        {
          title: 'Hardening a Weak AI Assertion',
          description: 'Transforming a false-positive assertion into a robust check.',
          codeSnippet: `// ❌ Weak AI assertion (passes even if element is hidden display:none!)
const banner = page.locator('.notification');
expect(banner).toBeTruthy(); // Just checks that the locator object exists!

// ✅ Hardened Web-First assertion (auto-retries and verifies visibility & text!)
await expect(page.getByRole('alert')).toBeVisible();
await expect(page.getByRole('alert')).toContainText('Order Placed Successfully');`,
        },
      ],
      exercise: {
        id: 'checkpoint-ai-4',
        title: 'Weak Assertion Danger',
        prompt: 'Why is expect(page.locator(".banner")).toBeTruthy() a dangerous assertion in automated testing?',
        options: [
          'Because page.locator() returns a Locator object immediately, which is ALWAYS truthy in JavaScript, even if the element does NOT exist in the DOM or is hidden!',
          'Because truthy is only supported in Python',
          'Because Playwright crashes on truthy',
          'Because it requires an external license',
        ],
        correctAnswerIndex: 0,
        explanation: 'In Playwright, page.locator() creates a reference object synchronously. An object reference is always truthy, so expect(locator).toBeTruthy() passes even when the element is completely absent!',
      },
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-day16-1',
      questionNumber: 1,
      question: 'How do you effectively use Generative AI in your Playwright automation workflow while ensuring code quality?',
      difficulty: 'Intermediate',
      assessmentFocus: 'AI workflow integration, prompt engineering, and human accountability.',
      modelAnswer:
        'I use Generative AI as an accelerator rather than an autonomous coder. I use structured prompts grounded with real HTML snippets from DevTools and explicit constraints (e.g. pure JavaScript, accessible locators like `getByRole`, web-first assertions, no `page.waitForTimeout()`). When the AI provides code, I audit it against a strict checklist: checking for missing `await` statements, eliminating arbitrary sleeps, verifying strict mode compliance, and hardening weak assertions. I verify every generated test against the running application in headed or UI mode before committing.',
      followUpQuestion: 'What are the main risks of developers copy-pasting AI-generated tests without review?',
    },
    {
      id: 'iq-day16-2',
      questionNumber: 2,
      question: 'Why do AI models often suggest brittle selectors like XPaths or Tailwind classes, and how do you correct them?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Locator strategy critique and accessibility alignment.',
      modelAnswer:
        'LLMs are trained on massive codebases spanning 15 years of legacy Selenium and Puppeteer tutorials, where long XPaths and CSS classes were common. When analyzing DOM markup without semantic constraints, AI models latch onto visual styling classes (e.g. `.text-sm.font-bold.text-indigo-600`) or positional XPaths. I correct this by instructing the AI to follow the W3C accessibility tree and Playwright best practices, and I manually refactor suggested locators to `page.getByRole()` with accessible names or `page.getByLabel()`.',
      followUpQuestion: 'When is using a data-testid attribute better than an accessible role?',
    },
    {
      id: 'iq-day16-3',
      questionNumber: 3,
      question: 'What is a "false positive" assertion in AI-generated Playwright tests, and how do you spot it?',
      difficulty: 'Advanced',
      assessmentFocus: 'Assertion rigor, JavaScript truthiness, and test reliability.',
      modelAnswer:
        'A false positive occurs when an automated test passes even though the application feature is broken or missing. AI models frequently write weak assertions such as `expect(page.locator(".modal")).toBeTruthy()` or `const text = await element.textContent(); expect(text !== null)`. In JavaScript, a locator object is always truthy, so that test passes even if the modal never appeared! I spot this by reviewing every assertion to ensure it uses Playwright’s auto-retrying web-first matchers: `await expect(page.getByRole("dialog")).toBeVisible()` and `await expect(page.getByRole("dialog")).toContainText("Expected")`.',
      followUpQuestion: 'Why does omitting await before an expect statement cause false positives?',
    },
    {
      id: 'iq-day16-4',
      questionNumber: 4,
      question: 'How do you design a structured prompt to generate a Page Object class for a complex web form?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Prompt engineering, Page Object Model, and modular design.',
      modelAnswer:
        'I provide: 1) The role: "Senior Playwright architect using pure modern JavaScript ES6 classes"; 2) The actual HTML markup of the form; 3) The required class structure: constructor initializing locators using `getByLabel` and `getByRole`, and async methods encapsulating user actions; 4) Strict constraints: "Do NOT place assertions inside the class methods; keep assertions in test specs. Do NOT use page.waitForTimeout()." This produces a clean, focused Page Object that integrates seamlessly into our framework.',
      followUpQuestion: 'How would you ask AI to generate synthetic edge-case data for that Page Object?',
    },
    {
      id: 'iq-day16-5',
      questionNumber: 5,
      question: 'What security precautions must automation engineers observe when using public cloud AI tools (like ChatGPT or Claude) for test authoring?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Data privacy, secrets management, and PII sanitization.',
      modelAnswer:
        'Engineers must never upload real production customer data, proprietary backend source code, customer PII (Personally Identifiable Information), or active credentials/API keys into external AI prompts. All test data provided to the AI must be sanitized and synthetic. Furthermore, organizations should use enterprise AI agreements that guarantee user prompts are not used for public model training.',
      followUpQuestion: 'How can you sanitize HTML snippets before pasting them into an AI prompt?',
    },
  ],

  quizQuestions: [
    {
      id: 'q-d16-1',
      questionNumber: 1,
      question: 'What is the most effective way to prevent AI from hallucinating incorrect selectors in Playwright tests?',
      options: [
        'Include the actual HTML snippet from DevTools in the prompt (DOM Grounding) and specify accessible locator rules',
        'Ask the AI to guess the selectors blindly',
        'Tell the AI that the website is built in Python',
        'Only use prompts with fewer than 5 words',
      ],
      correctAnswerIndex: 0,
      explanation: 'DOM Grounding provides the real markup, allowing the AI model to extract exact label text, ARIA attributes, and roles rather than guessing nonexistent element IDs.',
    },
    {
      id: 'q-d16-2',
      questionNumber: 2,
      question: 'Why should you reject an AI-suggested locator like page.locator(".flex.items-center.text-sm.bg-indigo-600")?',
      options: [
        'It relies on utility CSS styling classes (Tailwind) that will break whenever visual design or theme colors change',
        'Because Playwright does not support the color indigo',
        'Because flexbox is illegal in web automation',
        'Because CSS classes cannot be clicked',
      ],
      correctAnswerIndex: 0,
      explanation: 'Tailwind utility classes represent presentation, not semantic meaning. A minor redesign (changing padding or color) breaks the test even if functionality remains intact.',
    },
    {
      id: 'q-d16-3',
      questionNumber: 3,
      question: 'What subtle bug occurs if an AI writes expect(page.locator("h1")).toBeVisible() without the await keyword?',
      options: [
        'The assertion returns a pending Promise without waiting for it to resolve, which can allow the test to finish with a false positive before the check completes',
        'Playwright deletes the h1 element',
        'Chromium switches to dark mode',
        'The test runner freezes permanently',
      ],
      correctAnswerIndex: 0,
      explanation: 'In Playwright, web-first assertions are asynchronous Promises. Omitting await means the test moves forward without waiting for the assertion result, leading to false positives.',
    },
    {
      id: 'q-d16-4',
      questionNumber: 4,
      question: 'Which of the following locators best follows the Playwright accessibility-first recommendation?',
      options: [
        'page.getByRole("button", { name: "Submit Order" })',
        'page.locator("//div[3]/button[1]")',
        'page.locator(".btn-submit-order-final")',
        'page.locator("#btn_id_99182")',
      ],
      correctAnswerIndex: 0,
      explanation: 'getByRole("button", { name: ... }) mirrors how assistive technologies and real human users locate interactive elements, providing the highest resilience against markup refactors.',
    },
    {
      id: 'q-d16-5',
      questionNumber: 5,
      question: 'Why is expect(element).toBeTruthy() an anti-pattern for verifying that an element appeared on screen?',
      options: [
        'Because page.locator() returns an object reference that is always truthy, even if the element is completely absent from the DOM or hidden',
        'Because truthy is only supported in Jest',
        'Because truthy converts numbers to strings',
        'Because Playwright does not support truthy assertions',
      ],
      correctAnswerIndex: 0,
      explanation: 'Locator objects are JavaScript objects and evaluate to true in boolean checks regardless of DOM presence. You must use await expect(locator).toBeVisible() instead.',
    },
    {
      id: 'q-d16-6',
      questionNumber: 6,
      question: 'What dangerous anti-pattern do AI assistants frequently insert when struggling with asynchronous timing?',
      options: [
        'await page.waitForTimeout(5000) (arbitrary hardcoded sleep)',
        'console.log("hello")',
        'const x = 10',
        'page.goto("/")',
      ],
      correctAnswerIndex: 0,
      explanation: 'AI models often fallback to arbitrary sleep timers (waitForTimeout) when they do not understand modern auto-waiting or response synchronization.',
    },
    {
      id: 'q-d16-7',
      questionNumber: 7,
      question: 'What is a "strict mode violation" in Playwright, and how should an AI-suggested locator be fixed if it triggers one?',
      options: [
        'The locator resolved to multiple elements when an action expected one; fix by narrowing with accessible names or using locator.filter()',
        'The JavaScript file omitted "use strict"',
        'The test ran in Safari without a certificate',
        'The browser window was resized',
      ],
      correctAnswerIndex: 0,
      explanation: 'Playwright strict mode throws an error if an action locator matches multiple elements. Disambiguate by adding accessible names or filtering with hasText.',
    },
    {
      id: 'q-d16-8',
      questionNumber: 8,
      question: 'Why should automation engineers NEVER enter real production passwords into public AI prompts?',
      options: [
        'Prompts may be logged or processed by external AI servers, creating an immediate security and compliance credential breach',
        'Because AI cannot understand passwords',
        'Because passwords crash language models',
        'Because passwords must be written in hex code',
      ],
      correctAnswerIndex: 0,
      explanation: 'Pasting production credentials into AI tools exposes active systems to potential data breaches and violates corporate security and privacy policies.',
    },
    {
      id: 'q-d16-9',
      questionNumber: 9,
      question: 'When an AI assistant produces a test in TypeScript, what must you do if your project standard is pure JavaScript?',
      options: [
        'Strip the TypeScript type annotations (: Page, : string) and save the file with the .js extension',
        'Install TypeScript globally and rewrite the entire repository',
        'Delete the project',
        'Rename the file to .py',
      ],
      correctAnswerIndex: 0,
      explanation: 'Converting to pure JavaScript requires stripping interface definitions, generic types, and type annotations, keeping clean standard ES6 JavaScript.',
    },
    {
      id: 'q-d16-10',
      questionNumber: 10,
      question: 'What is the primary role of an automation QA engineer when working with AI coding assistants?',
      options: [
        'To act as the expert architect and auditor—designing prompts, evaluating suggestions, rejecting fragile code, and verifying correctness against real software',
        'To blindly paste AI code into production without reading it',
        'To replace all manual testers with chatbots',
        'To turn off test reporting',
      ],
      correctAnswerIndex: 0,
      explanation: 'The QA engineer is the critical decision-maker who steers the AI, audits the generated code, enforces architectural standards, and guarantees test reliability.',
    },
  ],
};

export const PLAYWRIGHT_DAY_16_STARTER_CODE = `// tests/ai_code_review_refactored.spec.js
// ⚠️ LAB CHALLENGE: Review, audit, and refactor an imperfect AI-generated test suite!
// The AI provided brittle XPaths, arbitrary sleeps, missing awaits, and weak assertions.
// Below is the clean, verified, production-grade refactored implementation.

const { test, expect } = require('@playwright/test');

test.describe('E-Commerce Checkout - AI Audit & Refactored Suite', () => {

  test('TC-AI-01: Valid checkout flow with accessible locators & web-first assertions', async ({ page }) => {
    // Navigate to course detail
    await page.goto('/courses/playwright-automation');
    await expect(page).toHaveURL(/.*courses\\/playwright-automation/);

    // AI SUGGESTION REJECTED: page.locator('//button[contains(@class, "bg-purple-600")]')
    // AUDIT REASON: Fragile XPath targeting CSS color class.
    // REFACTORED TO ACCESSIBLE ROLE:
    const enrollButton = page.getByRole('button', { name: /enroll in course|start course/i });
    await expect(enrollButton).toBeVisible();
    await enrollButton.click();

    // Verify navigation to Day 1 lesson
    await expect(page).toHaveURL(/.*courses\\/playwright-automation\\/day-1/);

    // AI SUGGESTION REJECTED: await page.waitForTimeout(5000);
    // AUDIT REASON: Hardcoded arbitrary sleep causes flakiness and slows down suite.
    // REFACTORED TO WEB-FIRST AUTO-RETRYING ASSERTION:
    const lessonHeading = page.getByRole('heading', { level: 1, name: /day 1/i });
    await expect(lessonHeading).toBeVisible();
  });

  test('TC-AI-02: Form validation with strict mode compliance & error checks', async ({ page }) => {
    await page.goto('/signup');

    // AI SUGGESTION REJECTED: page.locator('input').nth(0).type('test')
    // AUDIT REASON: Positional index, deprecated type() method, and missing label.
    // REFACTORED TO USER-FACING LABELS:
    await page.getByLabel(/full name/i).fill('Test Learner');
    await page.getByLabel(/email/i).fill('invalid-email-format');
    await page.getByLabel(/password/i).fill('short');

    // Click submit button using accessible role
    await page.getByRole('button', { name: /create account|sign up|register/i }).click();

    // AI SUGGESTION REJECTED: expect(page.locator('.alert')).toBeTruthy();
    // AUDIT REASON: False positive! Locator object is ALWAYS truthy in JS, even if hidden!
    // REFACTORED TO AUTO-RETRYING ASSERTION:
    const errorAlert = page.getByRole('alert');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toContainText(/valid email|password/i);
  });

  test('TC-AI-03: Catalog search with filter disambiguation', async ({ page }) => {
    await page.goto('/courses');

    // AI SUGGESTION REJECTED: page.locator('#search').press('Enter') without fill await
    // AUDIT REASON: Missing await before fill causes Promise race condition.
    // REFACTORED WITH EXPLICIT AWAITS:
    const searchInput = page.getByPlaceholder(/search courses|search catalog/i);
    await searchInput.fill('Playwright');
    await searchInput.press('Enter');

    // Verify filtered course card exists
    const courseTitle = page.getByRole('heading', { name: /playwright automation/i });
    await expect(courseTitle).toBeVisible();
  });

});
`;

export const PLAYWRIGHT_DAY_16_STARTER_EXPLANATION = `AI Code Audit & Refactoring Record:
1. Flaw 1 (Brittle Selector): Rejected page.locator('//button[contains(@class, "bg-purple-600")]'). Replaced with accessible getByRole('button', { name: /enroll/i }).
2. Flaw 2 (Arbitrary Sleep): Rejected await page.waitForTimeout(5000). Replaced with auto-retrying web-first expect(lessonHeading).toBeVisible().
3. Flaw 3 (Deprecated API & Positional Index): Rejected page.locator('input').nth(0).type(). Replaced with accessible getByLabel(/full name/i).fill().
4. Flaw 4 (False Positive Weak Assertion): Rejected expect(page.locator('.alert')).toBeTruthy(). Replaced with await expect(page.getByRole('alert')).toBeVisible() and toContainText().
5. Flaw 5 (Missing await): Audited and fixed missing await keywords before asynchronous Playwright locator and fill actions.
6. Structured Prompting Documentation: Formulated prompt with DOM snippets, constraints, and pure JavaScript requirements.`;

export const PLAYWRIGHT_DAY_16_STARTER_OUTPUT = `Running 3 tests using 3 workers
  ✓ [chromium] › ai_code_review_refactored.spec.js:10:3 › TC-AI-01: Valid checkout flow with accessible locators & web-first assertions (720ms)
  ✓ [chromium] › ai_code_review_refactored.spec.js:28:3 › TC-AI-02: Form validation with strict mode compliance & error checks (510ms)
  ✓ [chromium] › ai_code_review_refactored.spec.js:46:3 › TC-AI-03: Catalog search with filter disambiguation (460ms)

  3 passed (1.8s)`;

export function evaluateDay16Assignment(
  code: string,
  _expectedOutput: string,
  explanation: string
): PlaywrightDay16AssignmentRubric {
  const criteria: PlaywrightDay16AssignmentRubric['criteria'] = [];
  let score = 0;

  // Strip comments so explanation comments of rejected AI patterns do not trigger negative checks
  const activeCode = code.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');

  // 1. Applies structured prompt pattern understanding
  const appliesStructuredPromptPattern =
    /prompt/i.test(explanation) ||
    /prompt/i.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'Structured Prompting Understanding',
    passed: appliesStructuredPromptPattern,
    feedback: appliesStructuredPromptPattern
      ? 'Incorporated structured prompt engineering principles.'
      : 'Explain structured prompting with DOM grounding in your explanation.',
  });
  if (appliesStructuredPromptPattern) score += 1;

  // 2. Reviews AI generated locators
  const reviewsAiGeneratedLocators =
    /getByRole|getByLabel/i.test(activeCode);
  criteria.push({
    id: 'crit-2',
    title: 'Locator Review & Replacement',
    passed: reviewsAiGeneratedLocators,
    feedback: reviewsAiGeneratedLocators
      ? 'Audited and replaced brittle selectors with resilient locators.'
      : 'Replace brittle AI selectors with getByRole or getByLabel.',
  });
  if (reviewsAiGeneratedLocators) score += 1;

  // 3. Prioritizes accessible roles
  const prioritizesAccessibleRoles =
    /getByRole\(\s*['"]button['"]/i.test(activeCode) &&
    /getByRole\(\s*['"]heading['"]/i.test(activeCode);
  criteria.push({
    id: 'crit-3',
    title: 'Accessible Role Prioritization (getByRole)',
    passed: prioritizesAccessibleRoles,
    feedback: prioritizesAccessibleRoles
      ? 'Prioritized accessible roles for buttons and headings.'
      : 'Use getByRole for buttons and headings instead of class names.',
  });
  if (prioritizesAccessibleRoles) score += 1;

  // 4. Identifies five flaws in AI code
  const identifiesFiveFlawsInAiCode =
    /flaw 1|flaw 2|flaw 3|flaw 4|flaw 5|rejected/i.test(explanation) ||
    /rejected/i.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Identified ≥ 5 AI Anti-Patterns',
    passed: identifiesFiveFlawsInAiCode,
    feedback: identifiesFiveFlawsInAiCode
      ? 'Identified and documented flaws in the starter AI code.'
      : 'Document at least 5 flaws identified in the AI starter code.',
  });
  if (identifiesFiveFlawsInAiCode) score += 1;

  // 5. Eliminates hardcoded sleeps
  const eliminatesHardcodedSleeps =
    !/waitForTimeout\s*\(\s*\d{4,}\s*\)/.test(activeCode);
  criteria.push({
    id: 'crit-5',
    title: 'Elimination of Arbitrary Sleep Timers',
    passed: eliminatesHardcodedSleeps,
    feedback: eliminatesHardcodedSleeps
      ? 'Eliminated arbitrary page.waitForTimeout() calls.'
      : 'Remove hardcoded waitForTimeout sleeps from code.',
  });
  if (eliminatesHardcodedSleeps) score += 1;

  // 6. Strengthens weak assertions
  const strengthensWeakAssertions =
    !/expect\(.*\)\.toBeTruthy\(\)/.test(activeCode) &&
    /toBeVisible\(\)|toContainText\(\)/.test(activeCode);
  criteria.push({
    id: 'crit-6',
    title: 'Hardened Web-First Assertions',
    passed: strengthensWeakAssertions,
    feedback: strengthensWeakAssertions
      ? 'Replaced weak truthy assertions with web-first auto-retrying matchers.'
      : 'Replace expect().toBeTruthy() with toBeVisible() or toContainText().',
  });
  if (strengthensWeakAssertions) score += 1;

  // 7. Avoids hallucinated methods
  const avoidsHallucinatedMethods =
    !/waitForXPath|clickAndWait|waitForElement/.test(activeCode);
  criteria.push({
    id: 'crit-7',
    title: 'Zero Hallucinated / Deprecated APIs',
    passed: avoidsHallucinatedMethods,
    feedback: avoidsHallucinatedMethods
      ? 'Used only official, supported Playwright API methods.'
      : 'Remove hallucinated or deprecated methods like waitForXPath.',
  });
  if (avoidsHallucinatedMethods) score += 1;

  // 8. Documents accepted and rejected suggestions
  const documentsAcceptedAndRejectedSuggestions =
    /rejected|accepted/i.test(explanation) ||
    /rejected|accepted/i.test(code);
  criteria.push({
    id: 'crit-8',
    title: 'Accepted vs Rejected Suggestions Record',
    passed: documentsAcceptedAndRejectedSuggestions,
    feedback: documentsAcceptedAndRejectedSuggestions
      ? 'Documented rationales for accepted and rejected AI suggestions.'
      : 'Explain which AI suggestions were rejected and why.',
  });
  if (documentsAcceptedAndRejectedSuggestions) score += 1;

  // 9. Verifies against real DOM
  const verifiesAgainstRealDom =
    /courses\/playwright-automation|signup/i.test(code);
  criteria.push({
    id: 'crit-9',
    title: 'DOM Grounding & Real Application Routes',
    passed: verifiesAgainstRealDom,
    feedback: verifiesAgainstRealDom
      ? 'Verified tests against actual application routes and forms.'
      : 'Ground tests against real application routes (/signup, /courses).',
  });
  if (verifiesAgainstRealDom) score += 1;

  // 10. Syntactically valid JavaScript
  let syntacticallyValidJavaScript = true;
  try {
    new Function(code);
  } catch {
    syntacticallyValidJavaScript =
      code.includes('require(') || code.includes('test(');
  }
  criteria.push({
    id: 'crit-10',
    title: 'Pure JavaScript Syntax (.js)',
    passed: syntacticallyValidJavaScript,
    feedback: syntacticallyValidJavaScript
      ? 'Authored clean, valid JavaScript test suite.'
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
    appliesStructuredPromptPattern,
    reviewsAiGeneratedLocators,
    prioritizesAccessibleRoles,
    identifiesFiveFlawsInAiCode,
    eliminatesHardcodedSleeps,
    strengthensWeakAssertions,
    avoidsHallucinatedMethods,
    documentsAcceptedAndRejectedSuggestions,
    verifiesAgainstRealDom,
    syntacticallyValidJavaScript,
  };
}
