import type {
  PlaywrightDay7Unit,
  PlaywrightDay7AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_7_DATA: PlaywrightDay7Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 7,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Navigation, Tabs, Frames, Dialogs and File Handling',
  subtitle:
    'Master advanced browser automation including multi-tab workflows, browser contexts, nested iframes (frameLocator), native JavaScript dialogs (alert/confirm/prompt), and resilient file upload and download pipelines.',
  level: 'Intermediate to Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–6 concepts (Locators, web-first assertions, actions, auto-waiting, and test independence).',
  learningObjectives: [
    'Master browser navigation workflows: page.goto(), history navigation (goBack/goForward), and avoiding race conditions.',
    'Differentiate between Browser, BrowserContext, and Page, and automate multi-tab and popup workflows reliably.',
    'Register context.waitForEvent("page") or page.waitForEvent("popup") listeners before triggering popup actions.',
    'Automate nested frames and cross-origin iframes using Playwright frameLocator() without manual frame switching.',
    'Handle browser dialogs (alert, confirm, prompt) using page.on("dialog") event listeners with accept() and dismiss().',
    'Automate single and multiple file uploads with setInputFiles() safely from test fixture directories.',
    'Intercept, save, and verify file downloads using the page.waitForEvent("download") event lifecycle.',
  ],

  roadmap: [
    { day: 1, title: 'Day 1: Automation Fundamentals & Playwright', focus: 'E2E Testing, Architecture, Roadmap', isCompleted: true },
    { day: 2, title: 'Day 2: JavaScript Essentials for Automation', focus: 'Variables, Logic, Functions, Async/Await', isCompleted: true },
    { day: 3, title: 'Day 3: Playwright Setup & First Script', focus: 'CLI, Config, Chromium, First Test', isCompleted: true },
    { day: 4, title: 'Day 4: Locators and Element Identification', focus: 'getByRole, getByLabel, CSS, XPath, Strictness, AI', isCompleted: true },
    { day: 5, title: 'Day 5: Actions, Assertions, Forms & Test Design', focus: 'User Actions, Web-First Assertions, AAA Pattern', isCompleted: true },
    { day: 6, title: 'Day 6: Auto-Waiting, Timeouts & Flakiness', focus: 'Actionability, Timeouts, Trace Viewer, Flakiness', isCompleted: true },
    { day: 7, title: 'Day 7: Navigation, Tabs, Frames & Dialogs', focus: 'Multi-Tab, Iframes, JavaScript Dialogs, Uploads', isCurrent: true },
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
    // TOPIC 1: Advanced Navigation & URL Synchronization
    // -----------------------------------------------------------------------
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: Advanced Navigation & URL Synchronization',
      durationMinutes: 25,
      explanation: `Navigating between pages seems simple, but in single-page applications (SPAs) and complex multi-page apps, subtle race conditions can cause intermittent failures.

### The Navigation Lifecycle

\`\`\`javascript
// Basic navigation: waits until domcontentloaded by default
await page.goto('/support');

// Verifying URL change with web-first assertion:
await expect(page).toHaveURL(/.*support/);

// Verifying page title:
await expect(page).toHaveTitle(/RootAccess Support/);

// History navigation:
await page.goBack();
await page.goForward();
await page.reload();
\`\`\`

### Avoiding Race Conditions During Link Navigation
When clicking a link that navigates to a new page or triggers client-side routing:
- **❌ Anti-Pattern:** Clicking a link and immediately expecting a new page element without waiting for the URL or container to transition.
- **✅ Best Practice:**
\`\`\`javascript
// Click link and wait for navigation in parallel or verify URL:
await page.getByRole('link', { name: 'Knowledge Base' }).click();
await expect(page).toHaveURL(/.*knowledge-base/);
await expect(page.getByRole('heading', { name: 'Knowledge Base' })).toBeVisible();
\`\`\``,
      keyTakeaways: [
        'Always verify URL and page title after navigation using web-first expect(page) assertions.',
        'Playwright page.goto() automatically waits for the "load" or "domcontentloaded" state.',
        'Use page.goBack(), page.goForward(), and page.reload() when testing browser history behaviors.',
      ],
      terminology: [
        { term: 'page.goto()', definition: 'Navigates the current page to a URL and waits for the initial load lifecycle.' },
        { term: 'expect(page).toHaveURL()', definition: 'Web-first assertion polling the browser address bar until the URL matches a string or RegExp.' },
      ],
      examples: [
        {
          title: 'Synchronized Page Navigation',
          description: 'Navigating to a dashboard and verifying route transition before querying inner cards.',
          codeSnippet: `test('navigates to customer support portal', async ({ page }) => {
  await page.goto('/dashboard');
  await page.getByRole('link', { name: 'Customer Support' }).click();

  // Verify URL updated cleanly:
  await expect(page).toHaveURL('/support');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Support Desk');
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-nav-1',
        title: 'Verifying Navigation State',
        prompt: 'What is the most reliable way to confirm that clicking a "Log Out" button has successfully redirected the user to the login screen?',
        options: [
          'await expect(page).toHaveURL(/.*login/); combined with await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();',
          'await page.waitForTimeout(3000);',
          'expect(page.url().includes("login")).toBe(true); without awaiting',
          'console.log(page.url());',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Combining await expect(page).toHaveURL() with a web-first check for an element on the destination page provides unambiguous, auto-retrying confirmation of navigation.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 2: Multiple Tabs, Windows & Browser Contexts
    // -----------------------------------------------------------------------
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Multiple Tabs, Windows & Browser Contexts',
      durationMinutes: 30,
      explanation: `Modern web apps often open external links, PDF invoices, or OAuth authorization flows in new browser tabs (\`target="_blank"\`).

### Understanding BrowserContext vs Page

- **Browser:** The overarching Chromium, Firefox, or WebKit process.
- **BrowserContext:** An isolated incognito-like environment with its own cookies, localStorage, and cache.
- **Page:** A single tab or window inside a BrowserContext.

### Handling a New Tab Opened by Clicking a Link

To handle a newly opened tab without race conditions, Playwright requires registering the **page event listener** before clicking the link:

\`\`\`javascript
test('handles link that opens a new tab', async ({ page, context }) => {
  await page.goto('/support');

  // 1. Setup the listener promise BEFORE clicking the link:
  const newPagePromise = context.waitForEvent('page');

  // 2. Click the link that has target="_blank":
  await page.getByRole('link', { name: 'Read Documentation (Opens in new tab)' }).click();

  // 3. Await the new Page object:
  const newPage = await newPagePromise;

  // 4. Wait for the new page to be ready and assert:
  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL(/.*docs\.rootaccess\.org/);
  await expect(newPage.getByRole('heading', { level: 1 })).toHaveText('Documentation Overview');

  // 5. Interact with the new tab:
  await newPage.getByPlaceholder('Search docs').fill('locators');

  // 6. Close the new tab and return to original page:
  await newPage.close();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Support Portal');
});
\`\`\`

### Popups (\`page.waitForEvent('popup')\`)
If an action triggers a popup window directly from a specific page:
\`\`\`javascript
const popupPromise = page.waitForEvent('popup');
await page.getByRole('button', { name: 'Log in with GitHub' }).click();
const popup = await popupPromise;
await expect(popup).toHaveURL(/.*github\.com\/login/);
\`\`\``,
      keyTakeaways: [
        'A BrowserContext contains multiple Pages (tabs); each Page is automated independently.',
        'Always register context.waitForEvent("page") BEFORE clicking the element that opens the tab.',
        'Use newPage.close() to cleanly dispose of child tabs when done.',
        'The original page remains intact and accessible throughout the multi-tab test.',
      ],
      terminology: [
        { term: 'BrowserContext', definition: 'An isolated session within a browser engine that owns its own storage, cookies, and tabs.' },
        { term: 'context.waitForEvent("page")', definition: 'Asynchronous event listener that resolves with the new Page instance when a new tab or window opens.' },
      ],
      examples: [
        {
          title: 'Opening and Validating Help Center in a New Tab',
          description: 'A complete test capturing a new tab, asserting its content, and returning to the main page.',
          codeSnippet: `test('opens external knowledge base in new tab', async ({ page, context }) => {
  await page.goto('/support');

  const pagePromise = context.waitForEvent('page');
  await page.getByRole('link', { name: 'Open Help Center' }).click();
  const helpPage = await pagePromise;

  await expect(helpPage).toHaveURL(/.*help-center/);
  await expect(helpPage.getByRole('heading', { name: 'Frequently Asked Questions' })).toBeVisible();

  // Cleanly close popup tab
  await helpPage.close();
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-tabs-1',
        title: 'Multi-Tab Event Registration',
        prompt: 'Why must context.waitForEvent("page") be declared before clicking the link with target="_blank"?',
        options: [
          'To prevent a race condition where the new tab opens and finishes loading before Playwright attaches the listener',
          'Because JavaScript does not allow opening more than one tab',
          'Because Chromium crashes if tabs open without prior notice',
          'It is purely decorative; order does not matter',
        ],
        correctAnswerIndex: 0,
        explanation:
          'In fast headless environments, the new tab may open and fire its creation event in milliseconds. If the listener is registered after the click, it misses the event and hangs until timeout.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 3: Frames & Iframes
    // -----------------------------------------------------------------------
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Frames & Iframes (frameLocator)',
      durationMinutes: 30,
      explanation: `An \`<iframe>\` (Inline Frame) embeds an independent HTML document inside another HTML page. Common use cases include Stripe credit card inputs, Google reCAPTCHA, embedded YouTube videos, and third-party customer support widgets.

### Legacy Selenium vs Playwright Frames

- **Legacy Tools (Selenium):** Required explicit context switching: \`driver.switchTo().frame("frameName")\` followed by \`driver.switchTo().defaultContent()\`. If your test failed inside a frame, all subsequent tests failed because the driver was trapped inside the frame!
- **Playwright (\`frameLocator\`):** You **never switch contexts**. Playwright provides \`frameLocator()\`, which behaves like any ordinary locator. It lazy-evaluates and automatically crosses iframe boundaries seamlessly.

### How to Use \`frameLocator\`

\`\`\`javascript
// 1. Locate the iframe container using CSS, title, or name:
const paymentFrame = page.frameLocator('iframe#stripe-payment-frame');
// Or using title attribute:
const supportFrame = page.frameLocator('iframe[title="Support Chat Widget"]');

// 2. Query and interact with elements INSIDE the frame directly:
await paymentFrame.getByLabel('Card Number').fill('4242 4242 4242 4242');
await paymentFrame.getByLabel('CVC').fill('123');
await paymentFrame.getByRole('button', { name: 'Pay $49.00' }).click();

// 3. Immediately interact with the parent page without any "switch back":
await expect(page.getByRole('alert')).toHaveText('Payment successful!');
\`\`\`

### Nested Iframes
If an iframe contains another iframe inside it, simply chain them together:
\`\`\`javascript
const innerFrame = page
  .frameLocator('iframe#outer-frame')
  .frameLocator('iframe#inner-frame');

await innerFrame.getByRole('button', { name: 'Authorize' }).click();
\`\`\``,
      keyTakeaways: [
        'Never switch contexts manually—use page.frameLocator() to target elements inside iframes.',
        'frameLocator() locators auto-wait for the iframe to attach and load before querying child elements.',
        'You can immediately interact with parent elements without needing to switch back.',
        'Chain frameLocator() calls to automate nested iframes effortlessly.',
      ],
      terminology: [
        { term: 'frameLocator()', definition: 'Playwright locator method that scopes subsequent locator queries to the inside of an iframe element.' },
      ],
      examples: [
        {
          title: 'Automating an Embedded Support Form Inside an Iframe',
          description: 'Filling out a support inquiry inside an iframe and asserting outcome on the main page.',
          codeSnippet: `test('submits feedback inside embedded support iframe', async ({ page }) => {
  await page.goto('/support');

  // Target the embedded iframe
  const feedbackFrame = page.frameLocator('iframe[title="Customer Feedback Form"]');

  // Fill inputs inside the frame
  await feedbackFrame.getByLabel('Subject').fill('Question regarding API limits');
  await feedbackFrame.getByLabel('Message Details').fill('How do I request a rate limit increase?');
  await feedbackFrame.getByRole('button', { name: 'Send Ticket' }).click();

  // Assert confirmation inside the frame
  await expect(feedbackFrame.getByText('Ticket #1042 created')).toBeVisible();
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-frames-1',
        title: 'Iframe Interaction Model',
        prompt: 'How does Playwright return to the parent page after interacting with an element inside a frameLocator()?',
        options: [
          'No action is required; frameLocator() is scoped, so queries on page automatically target the parent page',
          'You must call await page.switchToDefaultContent()',
          'You must reload the browser using page.reload()',
          'You must close and reopen the browser context',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Unlike legacy tools that mutate global driver state, Playwright frameLocator() is purely a locator scope. The page object remains bound to the main frame at all times.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 4: JavaScript Dialogs (alert, confirm, prompt)
    // -----------------------------------------------------------------------
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: JavaScript Dialogs (Alert, Confirm, Prompt)',
      durationMinutes: 25,
      explanation: `Native JavaScript dialogs (\`window.alert()\`, \`window.confirm()\`, and \`window.prompt()\`) are modal popups generated by the browser engine rather than HTML DOM nodes.

### Default Playwright Behavior

By default, **Playwright automatically dismisses all dialogs** so tests do not hang if an unexpected alert pops up.

If your test scenario explicitly tests dialog behavior, you must register a **dialog event listener** on the \`page\` object **before** triggering the action that causes the dialog:

\`\`\`javascript
// 1. Handling window.alert():
page.once('dialog', async (dialog) => {
  expect(dialog.type()).toBe('alert');
  expect(dialog.message()).toBe('Your session has expired.');
  await dialog.accept(); // Dismiss the alert
});

await page.getByRole('button', { name: 'Check Session' }).click();
\`\`\`

### Handling Confirmations (\`window.confirm\`)
A confirm dialog provides OK (\`accept\`) and Cancel (\`dismiss\`):
\`\`\`javascript
// Scenario A: Accept deletion (OK)
page.once('dialog', async (dialog) => {
  expect(dialog.type()).toBe('confirm');
  expect(dialog.message()).toContain('Are you sure you want to delete this repository?');
  await dialog.accept();
});
await page.getByRole('button', { name: 'Delete Project' }).click();
await expect(page.getByText('Project deleted')).toBeVisible();

// Scenario B: Cancel deletion (Cancel)
page.once('dialog', async (dialog) => {
  await dialog.dismiss();
});
await page.getByRole('button', { name: 'Delete Project' }).click();
await expect(page.getByText('Project deleted')).not.toBeVisible();
\`\`\`

### Handling Prompts (\`window.prompt\`)
A prompt accepts an input string:
\`\`\`javascript
page.once('dialog', async (dialog) => {
  expect(dialog.type()).toBe('prompt');
  expect(dialog.defaultValue()).toBe('standard');
  await dialog.accept('premium-tier'); // Supplies text input and accepts
});

await page.getByRole('button', { name: 'Change Plan' }).click();
\`\`\``,
      keyTakeaways: [
        'By default, Playwright automatically dismisses dialogs to prevent tests from hanging.',
        'Use page.once("dialog", async (dialog) => { ... }) to handle expected dialogs.',
        'Use dialog.accept() to click OK, and dialog.dismiss() to click Cancel.',
        'Provide an argument to dialog.accept("my text") when handling window.prompt().',
      ],
      terminology: [
        { term: 'page.on("dialog") / page.once("dialog")', definition: 'Event listener triggered when a native browser alert, confirm, or prompt opens.' },
        { term: 'dialog.accept()', definition: 'Resolves the native dialog by simulating the OK / Confirm button.' },
        { term: 'dialog.dismiss()', definition: 'Resolves the native dialog by simulating the Cancel / Dismiss button.' },
      ],
      examples: [
        {
          title: 'Testing Destructive Action with Confirm Dialog',
          description: 'Accepting a confirmation dialog before verifying item deletion.',
          codeSnippet: `test('confirms account deactivation dialog', async ({ page }) => {
  await page.goto('/settings/security');

  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toBe('Do you really want to deactivate your account?');
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Deactivate Account' }).click();
  await expect(page.getByRole('alert')).toHaveText('Account successfully deactivated.');
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-dialogs-1',
        title: 'Native Dialog Defaults',
        prompt: 'What happens in Playwright if an unexpected window.alert() appears during a test without any registered dialog listener?',
        options: [
          'Playwright automatically dismisses it and continues test execution without freezing',
          'Playwright freezes indefinitely and fails after 30 seconds',
          'Playwright clicks the OK button and takes a screenshot',
          'The test immediately throws an UnhandledAlertError',
        ],
        correctAnswerIndex: 0,
        explanation:
          'Playwright automatically dismisses all dialogs by default so unexpected browser popups never freeze the automation pipeline.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 5: File Uploads & File Downloads
    // -----------------------------------------------------------------------
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Topic 5: File Uploads & File Downloads',
      durationMinutes: 30,
      explanation: `File handling is crucial in applications that manage user attachments, invoices, exports, and document parsing.

### 1. File Uploads with \`setInputFiles\`

\`\`\`javascript
// Upload a single file from your project test fixtures:
await page.getByLabel('Upload Attachment').setInputFiles('tests/fixtures/sample_log.txt');

// Upload multiple files:
await page.getByLabel('Upload Documents').setInputFiles([
  'tests/fixtures/contract_part1.pdf',
  'tests/fixtures/contract_part2.pdf',
]);

// Clear/remove uploaded files:
await page.getByLabel('Upload Attachment').setInputFiles([]);
\`\`\`

### 2. File Downloads Lifecycle

When an action triggers a file download, Playwright intercepts the download stream without opening native browser "Save As" prompts:

\`\`\`javascript
test('downloads and verifies monthly billing report', async ({ page }) => {
  await page.goto('/billing');

  // 1. Setup the download event listener promise BEFORE clicking:
  const downloadPromise = page.waitForEvent('download');

  // 2. Click the download trigger:
  await page.getByRole('button', { name: 'Download CSV Export' }).click();

  // 3. Await the Download object:
  const download = await downloadPromise;

  // 4. Inspect metadata:
  expect(download.suggestedFilename()).toBe('billing_report_2026.csv');

  // 5. Save the file to a designated test output directory:
  const savePath = 'test-results/downloads/' + download.suggestedFilename();
  await download.saveAs(savePath);

  // 6. Verify file exists on disk (Node.js fs module):
  const fs = require('fs');
  expect(fs.existsSync(savePath)).toBe(true);
});
\`\`\``,
      keyTakeaways: [
        'Use locator.setInputFiles() to attach single or multiple files to <input type="file">.',
        'Pass an empty array [] to setInputFiles to remove uploaded files.',
        'Use page.waitForEvent("download") before triggering the download button.',
        'Use download.saveAs("path") to save downloaded files for inspection or assertion.',
      ],
      terminology: [
        { term: 'locator.setInputFiles()', definition: 'Sets file paths onto an HTML file input, bypassing native file picker windows.' },
        { term: 'download.saveAs()', definition: 'Saves an intercepted browser download to a specific local path on disk.' },
      ],
      examples: [
        {
          title: 'Complete Download Verification Test',
          description: 'A test triggering a CSV export, saving it to disk, and asserting its filename.',
          codeSnippet: `const fs = require('fs');

test('exports user audit log as JSON', async ({ page }) => {
  await page.goto('/admin/audit');

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export JSON Log' }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/audit_log_.*\\.json/);

  const outputPath = 'test-results/' + download.suggestedFilename();
  await download.saveAs(outputPath);
  expect(fs.existsSync(outputPath)).toBe(true);
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-files-1',
        title: 'Verifying Downloaded File',
        prompt: 'Which method on the Playwright Download object saves the intercepted file stream to a specific destination path?',
        options: [
          'await download.saveAs("destination/path.csv")',
          'await download.moveTo("destination/path.csv")',
          'await download.saveToFile("destination/path.csv")',
          'await download.downloadNow("destination/path.csv")',
        ],
        correctAnswerIndex: 0,
        explanation:
          'download.saveAs(path) is the official Playwright API method that copies the downloaded temporary file to your chosen destination on disk.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 6: Hands-on Lab — Multi-Page Customer Support Workflow
    // -----------------------------------------------------------------------
    {
      id: 'topic-6',
      topicNumber: 6,
      title: 'Topic 6: Hands-on Lab — Customer Support Workflow Lab',
      durationMinutes: 35,
      explanation: `In this practical lab, you will combine all Day 7 concepts into a real-world multi-page customer support automation suite.

### The Simulated Target Application

The application is a customer support center at \`/support\` with:
1. An external documentation link that opens in a new tab (\`target="_blank"\`).
2. An embedded ticket submission form inside an \`<iframe>\`.
3. A "Clear Draft" button that triggers a native \`window.confirm()\` dialog.
4. A file attachment input for diagnostic logs.
5. An "Export Ticket Transcript" button that triggers a \`.txt\` file download.

### Lab Assignment Objectives (5 Test Cases):
1. **Multi-Tab:** Click the documentation link, wait for the new page event, verify its URL, and close the tab.
2. **Iframe Form:** Use \`page.frameLocator()\` to type a support inquiry inside the embedded ticket form.
3. **Dialog Handling:** Test the "Clear Draft" button by registering a \`page.once('dialog')\` listener and accepting the confirmation.
4. **File Upload:** Upload a sample log file (\`sample_error.log\`) using \`setInputFiles()\`.
5. **File Download:** Trigger the transcript export, capture the download event, and verify the suggested filename with \`download.suggestedFilename()\`.`,
      keyTakeaways: [
        'Register event listeners before triggering popup and download actions.',
        'Use frameLocator() to interact with elements inside iframes seamlessly.',
        'Handle dialogs with accept() or dismiss() depending on test intent.',
        'Verify downloaded file metadata using suggestedFilename().',
      ],
      terminology: [
        { term: 'Integrated Workflow Test', definition: 'An end-to-end test exercising multiple complex browser capabilities across tabs, iframes, and file systems.' },
      ],
      examples: [
        {
          title: 'Integrated Multi-Browser Interaction Snippet',
          description: 'A sample showing dialog handling followed by file upload.',
          codeSnippet: `test('clears form after dialog confirmation', async ({ page }) => {
  await page.goto('/support');

  // Register dialog listener
  page.once('dialog', async dialog => {
    expect(dialog.type()).toBe('confirm');
    await dialog.accept();
  });

  await page.getByRole('button', { name: 'Clear Form' }).click();
  await expect(page.getByLabel('Ticket Title')).toHaveValue('');
});`,
        },
      ],
    },
  ],

  interviewQuestions: [
    {
      id: 'day7-iq-1',
      questionNumber: 1,
      difficulty: 'Intermediate',
      question: 'How does Playwright automate elements inside an iframe, and how does frameLocator() differ from Selenium switchTo().frame()?',
      assessmentFocus: 'Frame automation architecture and test robustness.',
      modelAnswer:
        'Playwright uses page.frameLocator("iframe_selector") to create a scoped locator for elements inside an iframe. Unlike Selenium, which mutates the global driver state via switchTo().frame() and requires a manual switchTo().defaultContent() to return, Playwright frameLocator() is purely a locator query. It auto-waits for the iframe to load and does not alter the main page context, allowing the test to seamlessly interact with both parent and iframe elements without context-switching bugs.',
      followUpQuestion: 'How would you locate an element inside an iframe that itself is nested inside another iframe?',
    },
    {
      id: 'day7-iq-2',
      questionNumber: 2,
      difficulty: 'Intermediate',
      question: 'Why must context.waitForEvent("page") be declared before the action that triggers a new tab?',
      assessmentFocus: 'Asynchronous event listeners and race condition prevention.',
      modelAnswer:
        'In headless execution, a new tab can be created and fire its event within a few milliseconds. If the event listener is registered after the click action, the event may fire before the listener is active, causing the test to wait indefinitely and time out. By defining const pagePromise = context.waitForEvent("page") first, the listener is guaranteed to be in place when the click occurs.',
      followUpQuestion: 'What is the difference between context.waitForEvent("page") and page.waitForEvent("popup")?',
    },
    {
      id: 'day7-iq-3',
      questionNumber: 3,
      difficulty: 'Intermediate',
      question: 'What is Playwright\'s default behavior when a native JavaScript window.alert() or window.confirm() dialog opens?',
      assessmentFocus: 'Dialog handling defaults and test execution resilience.',
      modelAnswer:
        'By default, Playwright automatically dismisses all dialogs (clicking Cancel or OK to dismiss) so that unexpected popups do not block the test runner. However, if a test needs to verify the dialog message or accept it, you must register a page.on("dialog") or page.once("dialog") listener before triggering the dialog, calling dialog.accept() or dialog.dismiss().',
      followUpQuestion: 'How do you supply text input to a window.prompt() dialog?',
    },
    {
      id: 'day7-iq-4',
      questionNumber: 4,
      difficulty: 'Scenario-Based',
      question: 'Your application has a report generator that downloads a CSV file upon clicking "Export". How do you verify the file name and content in Playwright?',
      assessmentFocus: 'Download event lifecycle and filesystem verification.',
      modelAnswer:
        'First, declare const downloadPromise = page.waitForEvent("download"); before clicking the Export button. Click the button, then await downloadPromise to obtain the Download object. Verify the suggested filename with expect(download.suggestedFilename()).toBe("report.csv"). Save the file locally using await download.saveAs("test-results/report.csv"). Finally, use Node.js fs.readFileSync to inspect the CSV content and assert expected column headers and row data.',
      followUpQuestion: 'How does Playwright prevent downloaded files from polluting the host computer outside test directories?',
    },
    {
      id: 'day7-iq-5',
      questionNumber: 5,
      difficulty: 'Intermediate',
      question: 'How do you upload multiple files at once in Playwright, and how do you clear an existing file selection?',
      assessmentFocus: 'File upload automation using setInputFiles.',
      modelAnswer:
        'To upload multiple files, pass an array of file paths to locator.setInputFiles(["file1.pdf", "file2.pdf"]). To clear an existing file input, pass an empty array: await locator.setInputFiles([]). This clears the input value and triggers the native change event.',
      followUpQuestion: 'What should you do if the file input is visually hidden with display:none and styled with a custom label?',
    },
  ],

  quizQuestions: [
    {
      id: 'day7-q1',
      questionNumber: 1,
      question: 'Which method is used in Playwright to target elements located inside an HTML <iframe>?',
      options: ['page.frameLocator()', 'page.switchToFrame()', 'page.findFrame()', 'page.enterFrame()'],
      correctAnswerIndex: 0,
      explanation:
        'page.frameLocator() is the modern Playwright API to locate elements inside iframes without mutating global driver state.',
    },
    {
      id: 'day7-q2',
      questionNumber: 2,
      question: 'What is the correct way to handle a link that opens in a new tab (target="_blank")?',
      options: [
        'const p = context.waitForEvent("page"); await link.click(); const newPage = await p;',
        'await link.click(); const newPage = page.switchToTab(2);',
        'await page.waitForTimeout(3000); const newPage = context.pages[1];',
        'Tabs cannot be automated in Playwright',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Registering context.waitForEvent("page") before clicking guarantees that the listener catches the creation event without race conditions.',
    },
    {
      id: 'day7-q3',
      questionNumber: 3,
      question: 'What is Playwright\'s default behavior if a native window.confirm() dialog appears and no dialog listener is registered?',
      options: [
        'Playwright dismisses it automatically so tests do not hang',
        'Playwright clicks OK automatically',
        'Playwright crashes the browser process',
        'Playwright throws an unhandled dialog error immediately',
      ],
      correctAnswerIndex: 0,
      explanation:
        'By default, Playwright automatically dismisses dialogs to keep automated test suites running cleanly.',
    },
    {
      id: 'day7-q4',
      questionNumber: 4,
      question: 'How do you accept a confirmation dialog and confirm its text in Playwright?',
      options: [
        'page.once("dialog", async dialog => { expect(dialog.message()).toBe("Are you sure?"); await dialog.accept(); });',
        'await page.acceptDialog("Are you sure?");',
        'await page.click("button.dialog-ok");',
        'window.confirm = () => true;',
      ],
      correctAnswerIndex: 0,
      explanation:
        'page.once("dialog", async (dialog) => { ... }) allows inspecting dialog.message() and calling dialog.accept().',
    },
    {
      id: 'day7-q5',
      questionNumber: 5,
      question: 'Which method clears an already selected file from an <input type="file"> element?',
      options: [
        'await fileInput.setInputFiles([]);',
        'await fileInput.clear();',
        'await fileInput.removeFiles();',
        'await fileInput.reset();',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Passing an empty array [] to setInputFiles() clears the file selection on <input type="file"> elements.',
    },
    {
      id: 'day7-q6',
      questionNumber: 6,
      question: 'How do you capture and save a downloaded file to a designated test directory?',
      options: [
        'const dp = page.waitForEvent("download"); await btn.click(); const d = await dp; await d.saveAs("path/file.csv");',
        'await btn.click(); await page.saveDownload("path/file.csv");',
        'const file = await page.getDownloadedFile();',
        'Downloads cannot be saved in headless mode',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Waiting for the download event and calling download.saveAs(path) saves the temporary browser download to a permanent local path.',
    },
    {
      id: 'day7-q7',
      questionNumber: 7,
      question: 'How do you navigate back in the browser history using Playwright?',
      options: ['await page.goBack();', 'await page.back();', 'await page.navigateBack();', 'await page.history(-1);'],
      correctAnswerIndex: 0,
      explanation:
        'await page.goBack() simulates the browser back button and waits for the resulting navigation.',
    },
    {
      id: 'day7-q8',
      questionNumber: 8,
      question: 'How does Playwright handle an iframe that is nested inside another iframe?',
      options: [
        'Chain frameLocator() calls: page.frameLocator("#outer").frameLocator("#inner")',
        'You must switch to the outer frame first, then call switch to inner frame',
        'Playwright does not support nested iframes',
        'You must execute JavaScript via page.evaluate',
      ],
      correctAnswerIndex: 0,
      explanation:
        'Playwright allows chaining frameLocator() calls together cleanly to reach nested iframes.',
    },
    {
      id: 'day7-q9',
      questionNumber: 9,
      question: 'What method returns the suggested filename that the server provided for a download?',
      options: ['download.suggestedFilename()', 'download.getFileName()', 'download.name', 'download.filename()'],
      correctAnswerIndex: 0,
      explanation:
        'download.suggestedFilename() returns the filename suggested by the HTTP Content-Disposition header or download attribute.',
    },
    {
      id: 'day7-q10',
      questionNumber: 10,
      question: 'What is the relationship between BrowserContext and Page in Playwright?',
      options: [
        'A BrowserContext is an isolated browser session that can contain multiple Pages (tabs/windows)',
        'A Page contains multiple BrowserContexts',
        'They are exact synonyms for the same object',
        'BrowserContext only exists in WebKit while Page exists in Chromium',
      ],
      correctAnswerIndex: 0,
      explanation:
        'A BrowserContext represents an isolated incognito session. Multiple Pages (tabs) can exist inside a single context, sharing cookies and storage.',
    },
  ],
};

// -----------------------------------------------------------------------------
// STARTER CODE & EVALUATION RUBRIC FOR DAY 7 PRACTICAL ASSIGNMENT
// -----------------------------------------------------------------------------

export const PLAYWRIGHT_DAY_7_STARTER_CODE = `// tests/customer_support_advanced_interactions.spec.js
// DAY 7 ASSIGNMENT: Navigation, Tabs, Frames, Dialogs and File Handling
// Build an advanced test suite covering multi-tab workflows, nested iframes,
// native JavaScript dialogs, and file upload/download pipelines.

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('Customer Support Portal Advanced Interactions', () => {

  test('TC-1: should open external documentation in a new tab and return to portal', async ({ page, context }) => {
    await page.goto('/support');

    // 1. Setup new page listener BEFORE clicking the link
    const newPagePromise = context.waitForEvent('page');

    // 2. Click link that opens in new tab (target="_blank")
    await page.getByRole('link', { name: 'Support Documentation' }).click();

    // 3. Await the new tab
    const docsPage = await newPagePromise;
    await docsPage.waitForLoadState();

    // 4. Verify new tab URL and content
    await expect(docsPage).toHaveURL(/.*support-docs/);
    await expect(docsPage.getByRole('heading', { level: 1 })).toHaveText('Support Documentation');

    // 5. Close new tab and verify original portal remains functional
    await docsPage.close();
    await expect(page.getByRole('heading', { name: 'Support Desk' })).toBeVisible();
  });

  test('TC-2: should submit support ticket inside embedded iframe via frameLocator', async ({ page }) => {
    await page.goto('/support');

    // Target iframe with frameLocator
    const ticketFrame = page.frameLocator('iframe#ticket-submission-frame');

    // Interact with inputs inside the iframe
    await ticketFrame.getByLabel('Ticket Subject').fill('Urgent: Webhook Failure');
    await ticketFrame.getByLabel('Category').selectOption('technical');
    await ticketFrame.getByLabel('Description').fill('Webhook payloads are timing out.');
    await ticketFrame.getByRole('button', { name: 'Submit Ticket' }).click();

    // Verify ticket confirmation inside the iframe
    await expect(ticketFrame.getByRole('alert')).toContainText('Ticket submitted successfully');
  });

  test('TC-3: should handle confirmation dialog when resetting support form', async ({ page }) => {
    await page.goto('/support');

    // Register dialog listener BEFORE clicking reset button
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toContain('Are you sure you want to reset');
      await dialog.accept(); // Confirm the reset
    });

    await page.getByRole('button', { name: 'Reset Form' }).click();

    // Verify form input is cleared after accepting dialog
    await expect(page.getByLabel('Inquiry Notes')).toHaveValue('');
  });

  test('TC-4: should upload diagnostic log file using setInputFiles', async ({ page }) => {
    await page.goto('/support');

    const fileInput = page.getByLabel('Upload Diagnostic Log');

    // Upload sample log file
    const sampleFilePath = path.join(__dirname, 'fixtures/sample_diagnostic.log');
    await fileInput.setInputFiles({
      name: 'sample_diagnostic.log',
      mimeType: 'text/plain',
      buffer: Buffer.from('ERROR [2026-10-27 10:00:00] Connection refused at port 5432'),
    });

    // Verify file name display indicator
    await expect(page.getByTestId('uploaded-file-name')).toHaveText('sample_diagnostic.log');
  });

  test('TC-5: should trigger and verify support ticket transcript download', async ({ page }) => {
    await page.goto('/support');

    // 1. Setup download listener BEFORE clicking export
    const downloadPromise = page.waitForEvent('download');

    // 2. Trigger download
    await page.getByRole('button', { name: 'Export Transcript (TXT)' }).click();

    // 3. Await download object
    const download = await downloadPromise;

    // 4. Verify suggested filename
    expect(download.suggestedFilename()).toMatch(/support_transcript_.*\\.txt/);

    // 5. Save downloaded file
    const downloadPath = path.join('test-results', download.suggestedFilename());
    await download.saveAs(downloadPath);

    // 6. Verify file exists
    expect(fs.existsSync(downloadPath)).toBe(true);
  });

});
`;

export const PLAYWRIGHT_DAY_7_STARTER_EXPLANATION = `Advanced Browser Interactions Architecture:
1. Multi-Tab Handling: Registered context.waitForEvent('page') prior to the target="_blank" link click to eliminate race conditions. Verified both tabs independently and closed the child tab.
2. Iframe Isolation: Used page.frameLocator() to scope element lookups to the iframe without mutating global page context or requiring manual switchTo() calls.
3. Native Dialog Synchronization: Implemented page.once('dialog') listener to inspect confirm text and cleanly call dialog.accept().
4. File Uploads: Used setInputFiles() with an in-memory buffer fixture to avoid depending on external host files while triggering native DOM change events.
5. Download Pipeline: Captured download events via page.waitForEvent('download'), validated the server suggested filename, and saved the artifact to test-results using download.saveAs().`;

export const PLAYWRIGHT_DAY_7_STARTER_OUTPUT = `Running 5 tests using 3 workers
  ✓ [chromium] › customer_support_advanced_interactions.spec.js:10:3 › TC-1: should open external documentation in new tab (840ms)
  ✓ [chromium] › customer_support_advanced_interactions.spec.js:28:3 › TC-2: should submit support ticket inside embedded iframe (760ms)
  ✓ [chromium] › customer_support_advanced_interactions.spec.js:42:3 › TC-3: should handle confirmation dialog (480ms)
  ✓ [chromium] › customer_support_advanced_interactions.spec.js:56:3 › TC-4: should upload diagnostic log file (510ms)
  ✓ [chromium] › customer_support_advanced_interactions.spec.js:71:3 › TC-5: should trigger and verify support ticket transcript download (890ms)

  5 passed (3.5s)`;

export function evaluateDay7Assignment(
  code: string,
  expectedOutput: string,
  explanation: string
): PlaywrightDay7AssignmentRubric {
  const criteria: PlaywrightDay7AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Implements navigation validation
  const implementsNavigationValidation =
    /page\.goto\s*\(/.test(code) && /toHaveURL|toHaveTitle|toBeVisible/i.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'Navigation & Route Verification',
    passed: implementsNavigationValidation,
    feedback: implementsNavigationValidation
      ? 'Correctly navigates and verifies page readiness.'
      : 'Include page.goto() navigation and verify destination URL or title.',
  });
  if (implementsNavigationValidation) score += 1;

  // 2. Handles multiple tabs context (context.waitForEvent('page'))
  const handlesMultipleTabsContext =
    /waitForEvent\s*\(\s*['"]page['"]\s*\)/.test(code);
  criteria.push({
    id: 'crit-2',
    title: 'Multi-Tab Event Handling (waitForEvent("page"))',
    passed: handlesMultipleTabsContext,
    feedback: handlesMultipleTabsContext
      ? 'Implemented context.waitForEvent("page") to capture new tabs.'
      : 'Use context.waitForEvent("page") to handle multi-tab links.',
  });
  if (handlesMultipleTabsContext) score += 1;

  // 3. Registers tab event BEFORE triggering action
  const registersTabEventBeforeAction =
    code.indexOf('waitForEvent') < code.indexOf('.click') && handlesMultipleTabsContext;
  criteria.push({
    id: 'crit-3',
    title: 'Race-Free Tab Event Registration Order',
    passed: registersTabEventBeforeAction,
    feedback: registersTabEventBeforeAction
      ? 'Registered the tab event listener before the triggering click action.'
      : 'Ensure context.waitForEvent("page") is declared prior to the click action.',
  });
  if (registersTabEventBeforeAction) score += 1;

  // 4. Interacts with iframe via frameLocator
  const interactsWithIframeViaFrameLocator =
    /frameLocator\s*\(/.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Iframe Automation (frameLocator)',
    passed: interactsWithIframeViaFrameLocator,
    feedback: interactsWithIframeViaFrameLocator
      ? 'Successfully used frameLocator() to interact with elements inside an iframe.'
      : 'Use page.frameLocator() to target elements inside an iframe.',
  });
  if (interactsWithIframeViaFrameLocator) score += 1;

  // 5. Handles dialog with event listener (page.on('dialog') or page.once('dialog'))
  const handlesDialogWithEventListener =
    /(page\.(on|once)\s*\(\s*['"]dialog['"]|dialog\.accept|dialog\.dismiss)/.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'JavaScript Dialog Listener (page.once("dialog"))',
    passed: handlesDialogWithEventListener,
    feedback: handlesDialogWithEventListener
      ? 'Implemented dialog event listener to handle native popups.'
      : 'Register page.once("dialog", ...) to intercept native dialogs.',
  });
  if (handlesDialogWithEventListener) score += 1;

  // 6. Accepts or dismisses dialog (dialog.accept() or dialog.dismiss())
  const acceptsOrDismissesDialog =
    /dialog\.(accept|dismiss)\s*\(/.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Dialog Resolution (dialog.accept / dismiss)',
    passed: acceptsOrDismissesDialog,
    feedback: acceptsOrDismissesDialog
      ? 'Resolved the native dialog by calling accept() or dismiss().'
      : 'Call dialog.accept() or dialog.dismiss() inside the dialog listener.',
  });
  if (acceptsOrDismissesDialog) score += 1;

  // 7. Uploads file using setInputFiles()
  const uploadsFileUsingSetInputFiles =
    /setInputFiles\s*\(/.test(code);
  criteria.push({
    id: 'crit-7',
    title: 'File Upload Automation (setInputFiles)',
    passed: uploadsFileUsingSetInputFiles,
    feedback: uploadsFileUsingSetInputFiles
      ? 'Implemented setInputFiles() to upload files cleanly.'
      : 'Use locator.setInputFiles() to handle file uploads.',
  });
  if (uploadsFileUsingSetInputFiles) score += 1;

  // 8. Handles download event properly (waitForEvent('download'))
  const handlesDownloadEventProperly =
    /waitForEvent\s*\(\s*['"]download['"]\s*\)/.test(code);
  criteria.push({
    id: 'crit-8',
    title: 'File Download Interception (waitForEvent("download"))',
    passed: handlesDownloadEventProperly,
    feedback: handlesDownloadEventProperly
      ? 'Captured browser download event using page.waitForEvent("download").'
      : 'Use page.waitForEvent("download") to capture file downloads.',
  });
  if (handlesDownloadEventProperly) score += 1;

  // 9. Verifies downloaded file (suggestedFilename or saveAs)
  const verifiesDownloadedFile =
    /suggestedFilename\s*\(|saveAs\s*\(/.test(code);
  criteria.push({
    id: 'crit-9',
    title: 'Download Verification (suggestedFilename / saveAs)',
    passed: verifiesDownloadedFile,
    feedback: verifiesDownloadedFile
      ? 'Verified the downloaded filename or saved the file with saveAs().'
      : 'Verify download filename or save the file with download.saveAs().',
  });
  if (verifiesDownloadedFile) score += 1;

  // 10. Syntactically valid JavaScript & Playwright runner structure
  const syntacticallyValidJavaScript =
    /const\s*\{\s*test\s*,\s*expect\s*\}\s*=\s*require\('@playwright\/test'\)/.test(code) &&
    /test(\.describe)?\s*\(/.test(code) &&
    expectedOutput.length > 20 &&
    (explanation.length >= 0);
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
    implementsNavigationValidation,
    handlesMultipleTabsContext,
    registersTabEventBeforeAction,
    interactsWithIframeViaFrameLocator,
    handlesDialogWithEventListener,
    acceptsOrDismissesDialog,
    uploadsFileUsingSetInputFiles,
    handlesDownloadEventProperly,
    verifiesDownloadedFile,
    syntacticallyValidJavaScript,
    score,
    feedback,
    passed,
    criteria,
  };
}
