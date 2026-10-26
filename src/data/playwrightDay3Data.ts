import type {
  PlaywrightDay3Unit,
  PlaywrightDay3AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_3_DATA: PlaywrightDay3Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 3,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Environment Setup and Your First Playwright Test',
  subtitle:
    'Set up your local automation workstation with Node.js and npm, initialize a clean JavaScript Playwright project, write your first browser test, and execute it in both headless and headed modes.',
  level: 'Beginner',
  estimatedHours: '2–3 Hours',
  prerequisites: 'Day 1 & Day 2 concepts (Automation fundamentals, JavaScript syntax, async/await, and Promises).',
  learningObjectives: [
    'Explain the purpose of Node.js, npm, VS Code, and Playwright in modern automation testing.',
    'Create a local Playwright project directory and install Playwright Test via the interactive CLI wizard.',
    'Understand the structure of a Playwright project including tests/, playwright.config.js, package.json, and node_modules/.',
    'Write a test in pure JavaScript using test, expect, and the page fixture to navigate and verify elements.',
    'Execute tests from your terminal in both headless and headed browser modes.',
    'Understand passing vs failing test outcomes, assertions, and how to safely troubleshoot setup errors.',
  ],

  roadmap: [
    { day: 1, title: 'Day 1: Automation Fundamentals & Playwright', focus: 'E2E Testing, Architecture, Roadmap', isCompleted: true },
    { day: 2, title: 'Day 2: JavaScript Essentials for Automation', focus: 'Variables, Logic, Functions, Async/Await', isCompleted: true },
    { day: 3, title: 'Day 3: Playwright Setup & First Script', focus: 'CLI, Config, Chromium, First Test', isCurrent: true },
    { day: 4, title: 'Day 4: Locators and Element Identification', focus: 'getByRole, getByLabel, CSS, XPath, Strictness' },
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
    // TOPIC 1: Understanding the Development Tools
    // -----------------------------------------------------------------------
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: Understanding the Development Tools',
      durationMinutes: 15,
      explanation: `Before installing any software, let us understand the four core tools you will use as an automation QA engineer every single day.

### 1. Node.js (The JavaScript Runtime)
• **What it is:** Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser, directly on your computer's operating system.
• **Why Playwright projects use Node.js:** Browsers run JavaScript inside web pages. However, your test scripts live on your local machine and need to launch browsers, read configuration files, and access your terminal. Node.js makes that possible.
• **Browser JS vs Node.js:** In a browser, JavaScript has access to the \`window\` and \`document\` objects to interact with the webpage. In Node.js, JavaScript has access to file systems, network sockets, operating system processes, and terminal input/output.
• **Node.js Version Requirement:** Always use an Active LTS (Long Term Support) version of Node.js compatible with the current Playwright release. Check the official Playwright documentation (playwright.dev) for the latest minimum version requirements rather than hardcoding an outdated release number.

### 2. npm (Node Package Manager)
• **What it is:** npm is the default package manager distributed with Node.js. It is the world's largest software registry.
• **Its role:** npm downloads, installs, and manages external code libraries (packages) that your project depends on—such as \`@playwright/test\`.
• **package.json:** This is the manifest file located at the root of your project. It records project metadata, scripts, and lists the exact packages and versions your project needs.

### 3. Visual Studio Code (VS Code)
• **What it is:** A lightweight, free, and powerful code editor developed by Microsoft.
• **Why testers love it:** VS Code provides outstanding JavaScript syntax highlighting, autocompletion (IntelliSense), an integrated terminal, Git integration, and the official Playwright Test extension for one-click test execution and interactive debugging.

### 4. The Terminal (Command Line Interface)
• **What it is:** A text-based interface used to control your operating system by typing commands. (On macOS it is Terminal or iTerm2; on Windows it is PowerShell or Command Prompt).
• **How we use it:** You use the terminal to create project folders, install packages, run automated test suites, and view pass/fail logs.

### Core Automation Toolset Summary

| Tool | Primary Purpose | Why Playwright Needs It |
| :--- | :--- | :--- |
| **Node.js** | Executes JavaScript on your computer | Runs test runner processes, parses config files, and communicates with browser engines |
| **npm** | Package manager and registry | Installs @playwright/test and downloads bundled browser binaries (Chromium, Firefox, WebKit) |
| **VS Code** | Code editor and workspace | Provides a friendly environment to write, edit, format, and organize JavaScript test scripts |
| **Terminal** | Command line prompt | Triggers test execution commands (npx playwright test) and displays live test results |`,
      keyTakeaways: [
        'Node.js runs our JavaScript test scripts on our local computer outside the browser.',
        'npm installs and manages test libraries and creates our package.json manifest.',
        'VS Code is the recommended code editor for writing and maintaining JavaScript test files.',
        'The terminal is where we execute test commands and inspect pass/fail test runs.',
        'Check playwright.dev to ensure your installed Node.js version meets current LTS requirements.',
      ],
      terminology: [
        { term: 'Node.js', definition: 'A JavaScript runtime that executes JS code directly on your operating system.' },
        { term: 'npm', definition: 'Node Package Manager: downloads and manages reusable code libraries for your project.' },
        { term: 'package.json', definition: 'The project configuration file tracking metadata, scripts, and dependencies.' },
        { term: 'Terminal', definition: 'A text-based command interface used to run programs and scripts.' },
        { term: 'LTS', definition: 'Long Term Support: stable, actively maintained releases of software recommended for production.' },
      ],
      examples: [
        {
          title: 'Verifying Tool Installations',
          description: 'Commands to check if Node.js and npm are installed on your workstation.',
          codeSnippet: `node --version
npm --version`,
          expectedOutput: `v20.18.0
10.8.2`,
        },
      ],
      exercise: {
        id: 'ex-topic-1',
        title: 'Exercise 1: Development Tool Roles',
        prompt: 'Why does Playwright require Node.js installed on your computer even though web browsers already execute JavaScript internally?',
        options: [
          'Because Playwright converts all JavaScript code into C++ before running.',
          'Because our test script runs on the operating system to control browser processes, read files, and trigger commands.',
          'Because web browsers cannot run without an active npm subscription.',
          'Node.js is completely optional and only needed if using TypeScript.',
        ],
        correctAnswerIndex: 1,
        explanation: 'Browser automation scripts run locally on your operating system to launch browsers, manage network sockets, and run assertions. Node.js is the engine that executes that automation script outside the browser.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 2: Installing and Preparing Playwright
    // -----------------------------------------------------------------------
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Installing and Preparing Playwright',
      durationMinutes: 25,
      explanation: `Now that you understand the tools, let us walk through setting up a clean Playwright project from scratch.

### Prerequisites Before Starting
• A computer running macOS, Windows, or Linux.
• Node.js installed (LTS version).
• Visual Studio Code installed.
• An active internet connection (to download packages and browser binaries).

### Step 1: Verify Node.js and npm
Open your terminal and run:

\`\`\`bash
node --version
npm --version
\`\`\`

• What this does: Queries your system to ensure Node and npm are recognized in your PATH environment variable.
• Successful output: You will see version numbers printed (e.g. \`v20.x.x\` or higher, and npm \`10.x.x\`). If you see \`command not found\`, install Node.js from nodejs.org first.

### Step 2: Create a Dedicated Project Folder
Navigate to where you keep projects and create a new directory:

\`\`\`bash
mkdir playwright-js-practice
cd playwright-js-practice
\`\`\`

• \`mkdir\`: Creates a new folder named \`playwright-js-practice\`.
• \`cd\`: Changes your current working directory into the newly created folder. Everything we install will live inside this folder.

### Step 3: Initialize the Project
Inside your new folder, generate your \`package.json\` file:

\`\`\`bash
npm init -y
\`\`\`

• What this does: The \`-y\` flag stands for "yes to all defaults". It creates a basic \`package.json\` file with default project settings in one second.

### Step 4: Install Playwright Test via the Setup Wizard
Run the official Playwright initialization command:

\`\`\`bash
npm init playwright@latest
\`\`\`

The setup wizard will ask you a series of interactive prompts in your terminal:
1. **Do you want to use TypeScript or JavaScript?**
   👉 **Choose JavaScript.** (Use your arrow keys to select JavaScript and press Enter).
2. **Where to put your end-to-end tests?**
   👉 Press Enter to accept the default: **\`tests\`**.
3. **Add a GitHub Actions workflow?**
   👉 Choose **false** (or \`N\`) for now; we will build CI/CD on Day 12.
4. **Install Playwright browsers (can be done manually)?**
   👉 Choose **true** (or \`Y\`) so Playwright automatically downloads Chromium, Firefox, and WebKit binaries.

*Safe Setup Note: If you run this command inside an existing project that already has files, follow the prompts carefully so you do not overwrite custom files. Never run destructive cleanup commands like deleting your configuration.*

### Step 5: Manual Browser Installation (If Skipped)
If you ever need to download or refresh the browser binaries later, run:

\`\`\`bash
npx playwright install
\`\`\`

*Linux Users:* On Linux distributions, you may also need to install operating-system level dependencies by running:
\`npx playwright install --with-deps\``,
      keyTakeaways: [
        'Always verify node --version and npm --version before starting a new automation project.',
        'mkdir and cd keep your project cleanly isolated in its own folder.',
        'Run npm init playwright@latest to start the interactive setup wizard.',
        'Always select JavaScript (not TypeScript) for this course.',
        'Use npx playwright install to download browser binaries (Chromium, Firefox, WebKit) whenever needed.',
      ],
      terminology: [
        { term: 'mkdir', definition: 'Make Directory: terminal command that creates a new folder.' },
        { term: 'cd', definition: 'Change Directory: terminal command that navigates into a folder.' },
        { term: 'npx', definition: 'Node Package Execute: runs CLI binaries directly from packages without permanent global installs.' },
        { term: 'Browser Binaries', definition: 'Headless browser executables (Chromium, Firefox, WebKit) managed directly by Playwright.' },
      ],
      examples: [
        {
          title: 'Project Initialization Sequence',
          description: 'The step-by-step terminal commands to create and initialize a project.',
          codeSnippet: `mkdir playwright-js-practice
cd playwright-js-practice
npm init -y
npm init playwright@latest`,
          expectedOutput: `✔ Do you want to use TypeScript or JavaScript? · JavaScript
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? · false
✔ Install Playwright browsers? · true`,
        },
      ],
      exercise: {
        id: 'ex-topic-2',
        title: 'Exercise 2: Setup Wizard Language Selection',
        prompt: 'When running npm init playwright@latest for this course, which option must you select when prompted for programming language?',
        options: [
          'TypeScript, because Playwright cannot run JavaScript files.',
          'JavaScript, because all lessons, syntax, and exercises in this course use pure JavaScript (.js).',
          'Python, because Playwright only runs in Python.',
          'HTML, so tests can run directly inside the browser console.',
        ],
        correctAnswerIndex: 1,
        explanation: 'This course is built entirely around pure JavaScript. Selecting JavaScript creates a clean .js project without requiring TypeScript compiler configurations or type annotations.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 3: Understanding the Project Structure
    // -----------------------------------------------------------------------
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Understanding the Project Structure',
      durationMinutes: 20,
      explanation: `Once the setup wizard completes, open your project folder in VS Code (\`code .\`). You will see a clean, organized project structure.

### Representative Project Directory Layout
Here is what a standard JavaScript Playwright project looks like:

\`\`\`text
playwright-js-practice/
├── node_modules/
├── tests/
│   └── example.spec.js
├── package.json
├── package-lock.json
└── playwright.config.js
\`\`\`

*(Note: The exact files may vary slightly depending on your version and selected options, but these are the core components).*

### Detailed Breakdown of Each File and Folder

### 1. tests/ Folder
• **What it is:** The dedicated home for your automated test files.
• **How it works:** By default, Playwright searches inside this directory for test files. You will create your test files here (such as \`first-test.spec.js\` or \`login.spec.js\`).

### 2. example.spec.js
• **What it is:** A sample test file provided by the Playwright team to demonstrate common actions and assertions.
• **The .spec.js Convention:** In modern testing, "spec" stands for specification. Naming your files with the \`.spec.js\` or \`.test.js\` extension tells the test runner that this file contains executable test scenarios.

### 3. package.json
• **What it is:** The project manifest file.
• **What it contains:**
  - Project name and version.
  - Dependencies: shows \`@playwright/test\` listed under \`devDependencies\`.
  - Scripts: custom shortcuts you can run with \`npm test\`.

### 4. package-lock.json
• **What it is:** An automatically generated record of the exact versions of every library installed in \`node_modules\`.
• **Why it matters:** It ensures that every developer on your team and your CI/CD server install the exact identical package versions. You should never edit this file manually.

### 5. playwright.config.js
• **What it is:** The central control room for Playwright Test.
• **What it configures:**
  - Where test files are located (\`testDir\`).
  - How long tests can run before timing out (\`timeout\`).
  - Whether browsers run in headless or headed mode.
  - Which browsers to test on (Chromium, Firefox, WebKit).
  - Reporting formats (HTML report, list report).

### 6. node_modules/ Folder
• **What it is:** The storage folder containing all the code downloaded from npm.
• **Important rule:** This folder is huge and should **never** be committed to Git. A \`.gitignore\` file should always exclude \`node_modules/\`. Anyone who clones your project can recreate it instantly by running \`npm install\`.`,
      keyTakeaways: [
        'The tests/ directory is where all your automated test scripts live.',
        'Use the .spec.js naming convention so Playwright automatically discovers your test files.',
        'package.json tracks project dependencies; package-lock.json locks exact versions.',
        'playwright.config.js is the central configuration file controlling test timeouts and browser settings.',
        'Never commit the node_modules folder to Git; recreate it with npm install.',
      ],
      terminology: [
        { term: 'Specification (.spec.js)', definition: 'Naming convention identifying a file containing automated test specifications.' },
        { term: 'playwright.config.js', definition: 'The central configuration file that governs test execution, timeouts, and browsers.' },
        { term: 'node_modules', definition: 'The local folder storing third-party libraries downloaded by npm.' },
        { term: 'devDependencies', definition: 'Packages needed only during development and testing, not in production runtime.' },
      ],
      examples: [
        {
          title: 'Inspecting package.json Dependencies',
          description: 'A sample package.json showing Playwright installed as a devDependency.',
          codeSnippet: `{
  "name": "playwright-js-practice",
  "version": "1.0.0",
  "scripts": {
    "test": "playwright test"
  },
  "devDependencies": {
    "@playwright/test": "^1.48.0"
  }
}`,
        },
      ],
      exercise: {
        id: 'ex-topic-3',
        title: 'Exercise 3: Test File Naming Conventions',
        prompt: 'Why do we name our test files with .spec.js (for example, login.spec.js) instead of just login.js?',
        options: [
          'Because JavaScript files without .spec will not run in Node.js.',
          'Because Playwright automatically discovers and runs files matching the .spec.js naming convention.',
          'Because .spec files are automatically compiled to Python.',
          'It is a mandatory operating system requirement on macOS and Windows.',
        ],
        correctAnswerIndex: 1,
        explanation: 'By default, Playwright Test scans directories for files ending in .spec.js or .test.js. Using this convention allows the test runner to automatically discover and execute your tests.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 4: Write Your First Playwright Test
    // -----------------------------------------------------------------------
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Write Your First Playwright Test',
      durationMinutes: 30,
      explanation: `Now comes the exciting part: writing your first real automated browser test!

We will write a test that opens a browser, navigates to the public test website \`https://example.com\`, and verifies that the main heading *"Example Domain"* is visible on the screen.

*(Public Site Note: Public websites can occasionally experience network outages. If a test fails unexpectedly, always verify that the site is accessible before assuming your test code is wrong!)*

### Create the Test File
Inside your project's \`tests/\` folder, create a new file named:
\`tests/first-test.spec.js\`

### The CommonJS Test Example (Default for standard JS projects)
Add this code to \`tests/first-test.spec.js\`:

\`\`\`javascript
const { test, expect } = require('@playwright/test');

test('homepage displays the expected heading', async ({ page }) => {
  // 1. Navigate to the website
  await page.goto('https://example.com');

  // 2. Assert that the heading is visible on screen
  await expect(
    page.getByRole('heading', { name: 'Example Domain' })
  ).toBeVisible();
});
\`\`\`

---

### Step-by-Step Code Explanation

### 1. \`const { test, expect } = require('@playwright/test');\`
• **\`test\`:** The core function used to declare and structure test cases.
• **\`expect\`:** The assertion library used to verify actual conditions against expected outcomes.
• **Note on Module Systems:** If your project uses ES Modules (with \`"type": "module"\` in your \`package.json\`), you would use the \`import\` syntax instead:
  \`import { test, expect } from '@playwright/test';\`
  *Rule: Match your project's module system. Never mix require and import in the same file.*

### 2. \`test('homepage displays the expected heading', async ({ page }) => { ... });\`
• The first argument is a clear, human-readable description of what this test verifies.
• The second argument is an \`async\` arrow function containing the test steps.
• **\`{ page }\` fixture:** Playwright automatically creates a fresh, isolated browser page for this test and hands it to you as an argument. You do not have to manually launch or close the browser!

### 3. \`await page.goto('https://example.com');\`
• Tells the browser to navigate to the specified URL.
• Notice the **\`await\`** keyword: navigating across the web takes time. \`await\` tells JavaScript to pause until the web page finishes loading before moving to the next line.

### 4. \`page.getByRole('heading', { name: 'Example Domain' })\`
• This is a **locator**. It finds the element on the page with an accessible role of \`heading\` and the visible text \`Example Domain\`.
• On Day 4, we will dive deeply into locators!

### 5. \`await expect(...).toBeVisible();\`
• This is a **Web-First Assertion**.
• It verifies that the heading is not only present in the HTML, but physically visible to users on the screen.
• Playwright automatically waits up to 5 seconds for the element to appear before failing, eliminating flaky timing issues.`,
      keyTakeaways: [
        'Import test and expect from @playwright/test at the top of your test file.',
        'Use test("title", async ({ page }) => { ... }) to declare test cases.',
        'The { page } fixture is automatically created and isolated by Playwright for each test.',
        'await page.goto(url) navigates to your target web application.',
        'Web-first assertions like await expect(locator).toBeVisible() automatically wait for element readiness.',
      ],
      terminology: [
        { term: 'Fixture ({ page })', definition: 'A pre-configured environment object supplied to your test function by Playwright.' },
        { term: 'page.goto()', definition: 'Asynchronous method that instructs the browser page to navigate to a URL.' },
        { term: 'getByRole()', definition: 'An accessible Playwright locator that finds elements by their semantic ARIA role (e.g. button, heading).' },
        { term: 'toBeVisible()', definition: 'A web-first assertion confirming that an element is rendered and physically visible on screen.' },
      ],
      examples: [
        {
          title: 'First Playwright Test (CommonJS)',
          description: 'Complete example verifying page navigation and heading visibility on example.com.',
          codeSnippet: `const { test, expect } = require('@playwright/test');

test('homepage displays the expected heading', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(
    page.getByRole('heading', { name: 'Example Domain' })
  ).toBeVisible();
});`,
        },
        {
          title: 'First Playwright Test (ES Module Syntax)',
          description: 'Equivalent test using ES module import syntax for projects with "type": "module".',
          codeSnippet: `import { test, expect } from '@playwright/test';

test('homepage displays the expected heading', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(
    page.getByRole('heading', { name: 'Example Domain' })
  ).toBeVisible();
});`,
        },
      ],
      exercise: {
        id: 'ex-topic-4',
        title: 'Exercise 4: The { page } Fixture Role',
        prompt: 'In test("my test", async ({ page }) => { ... }), where does the { page } object come from?',
        options: [
          'It is a global variable automatically built into Windows and macOS.',
          'You must manually write const page = new Page() inside every test.',
          'Playwright automatically creates a fresh, isolated browser page fixture and provides it to your test function.',
          'It is downloaded from an external website each time the test starts.',
        ],
        correctAnswerIndex: 2,
        explanation: 'Playwright utilizes test fixtures. For each test, Playwright automatically spins up a clean browser context and page, passes it into your test function as { page }, and closes it when the test completes.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 5: Run and Understand Test Results
    // -----------------------------------------------------------------------
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Topic 5: Run and Understand Test Results',
      durationMinutes: 20,
      explanation: `Now that your test is written, it is time to run it from the terminal and understand what the test runner reports back.

### 1. Running the Full Test Suite (Headless Mode)
In your terminal, run:

\`\`\`bash
npx playwright test
\`\`\`

• By default, this runs all test files in your \`tests/\` directory.
• It runs in **Headless mode**—the browser executes silently in computer memory without opening a visible window. This is lightning fast!

### 2. Running a Specific Test File
If you have multiple files and only want to run your new test:

\`\`\`bash
npx playwright test tests/first-test.spec.js
\`\`\`

### 3. Running in Headed Mode (Watch the Browser Open!)
To visibly watch the browser open on your screen and see the page load in real time:

\`\`\`bash
npx playwright test --headed
\`\`\`

• A Chromium window will appear, navigate to \`https://example.com\`, check the heading, and close upon completion.

---

### What Does the Terminal Output Mean?

### Example: A Passing Test Run

\`\`\`text
Running 3 tests using 3 workers

  ✓ 1 [chromium] › tests/first-test.spec.js:3:1 › homepage displays the expected heading (1.2s)
  ✓ 2 [firefox] › tests/first-test.spec.js:3:1 › homepage displays the expected heading (1.5s)
  ✓ 3 [webkit] › tests/first-test.spec.js:3:1 › homepage displays the expected heading (1.1s)

  3 passed (2.3s)
\`\`\`

• **Workers:** Number of parallel threads running tests simultaneously.
• **Checkmark (\`✓\`):** The test completed all steps and all assertions passed.
• **Time (\`1.2s\`):** How many seconds the test took to run.

---

### Example: A Failing Test Run
What happens if the heading text does not match? Let us say the test expected *"Wrong Heading Text"*:

\`\`\`text
Running 1 test using 1 worker

  1) [chromium] › tests/first-test.spec.js:3:1 › homepage displays the expected heading ──

    Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

    Locator: getByRole('heading', { name: 'Wrong Heading Text' })
    Expected: visible
    Received: <element(s) not found>
    Call log:
      - waiting for getByRole('heading', { name: 'Wrong Heading Text' }) to be visible

       7 |   await expect(
    >  8 |     page.getByRole('heading', { name: 'Wrong Heading Text' })
         |                                ^
       9 |   ).toBeVisible();

  1 failed
    [chromium] › tests/first-test.spec.js:3:1 › homepage displays the expected heading
\`\`\`

### How to Read the Failure Log:
1. **The Error Type:** \`Timed out 5000ms waiting for expect(locator).toBeVisible()\`. Playwright waited 5 full seconds for the heading to show up, but it never appeared.
2. **The Exact Line:** Look at line 8 (\`>\`). Playwright pinpoints the exact line in your code where the test failed.
3. **Assertion Failure vs Syntax Error:**
   - **Assertion Failure:** The code ran fine and the browser opened, but the application state did not match what we expected (e.g. heading was missing or wrong text).
   - **Syntax Error:** Your JavaScript has a typo (like a missing parenthesis). The test fails immediately before any browser opens.
   - **Environment Error:** Node.js or browsers are missing.`,
      keyTakeaways: [
        'npx playwright test runs all tests in headless mode by default for maximum speed.',
        'Add the --headed flag to visibly watch the browser open on your monitor.',
        'Target a single test file by passing its path: npx playwright test tests/first-test.spec.js.',
        'A test is not successful just because the browser opened; every assertion must pass.',
        'Playwright error logs pinpoint the exact line, expected value, and actual outcome.',
      ],
      terminology: [
        { term: 'Headless Mode', definition: 'Executing tests silently in background memory without opening a physical GUI window.' },
        { term: 'Headed Mode (--headed)', definition: 'Launching a visible browser window on screen to observe test execution visually.' },
        { term: 'Worker Process', definition: 'An independent operating system process used by Playwright to run tests in parallel.' },
        { term: 'Assertion Failure', definition: 'A test failure occurring because the actual application state did not match the expected condition.' },
      ],
      examples: [
        {
          title: 'Common Terminal Execution Commands',
          description: 'The three essential terminal commands to execute Playwright tests.',
          codeSnippet: `# Run all tests headlessly
npx playwright test

# Run a specific test file
npx playwright test tests/first-test.spec.js

# Run tests with visible browser window
npx playwright test --headed`,
        },
      ],
      exercise: {
        id: 'ex-topic-5',
        title: 'Exercise 5: Headless vs Headed Execution',
        prompt: 'Which terminal command allows you to watch the Chromium browser physically open and navigate on your monitor while running tests?',
        options: [
          'npx playwright test --headed',
          'npx playwright test --silent',
          'npm start --gui',
          'node tests/first-test.spec.js',
        ],
        correctAnswerIndex: 0,
        explanation: 'Adding the --headed flag tells Playwright to launch a visible graphical browser window so you can watch clicks, typing, and navigation in real time.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 6: Basic Configuration and Troubleshooting
    // -----------------------------------------------------------------------
    {
      id: 'topic-6',
      topicNumber: 6,
      title: 'Topic 6: Basic Configuration and Troubleshooting',
      durationMinutes: 20,
      explanation: `Let us examine your project's configuration file and review the top troubleshooting scenarios you might encounter.

### The Purpose of playwright.config.js
The \`playwright.config.js\` file controls global settings for your entire test suite.

Here is a minimal, clean configuration example:

\`\`\`javascript
// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true
  }
});
\`\`\`

• **\`defineConfig()\`:** A helper function that validates configuration options and provides autocomplete in VS Code.
• **\`testDir\`:** Specifies the folder where Playwright looks for test files (\`./tests\`).
• **\`timeout: 30000\`:** Maximum time in milliseconds (30 seconds) a single test can run before being terminated.
• **\`use: { headless: true }\`:** Controls default browser visibility. Set to \`false\` if you always want headed browsers during local debugging.

*(Note: Your generated config file may have extra options for multiple browsers and reporting. Modify settings carefully rather than deleting the file).*

---

### Top 8 Troubleshooting Scenarios & Safe Diagnostics

### 1. \`node\` or \`npm\` command not found
• **Likely cause:** Node.js is not installed or not added to your system PATH variable.
• **Safe diagnostic:** Open a new terminal window. Run \`node -v\`. If unrecognized, download and install Node.js LTS from nodejs.org, then restart your terminal.

### 2. Node.js version is unsupported
• **Likely cause:** You have an old Node version (e.g. Node 14 or 16).
• **Safe diagnostic:** Run \`node -v\`. If your version is below the Playwright minimum requirement, update Node.js to the current LTS release.

### 3. \`@playwright/test\` package is missing
• **Likely cause:** Dependencies were not installed or \`node_modules\` is missing.
• **Safe diagnostic:** Run \`npm install\` inside your project folder to restore all packages listed in \`package.json\`.

### 4. Browser executable is missing
• **Error message:** \`Executable doesn't exist at /Users/.../Library/Caches/ms-playwright/...\`
• **Safe diagnostic:** Run \`npx playwright install\` to download the required browser binaries.

### 5. The test file is not discovered
• **Likely cause:** The file is located outside the \`tests/\` folder or does not end in \`.spec.js\`.
• **Safe diagnostic:** Verify that your file is inside the \`tests\` directory and ends with \`.spec.js\` (e.g. \`tests/first-test.spec.js\`).

### 6. Incompatible import vs require syntax
• **Error message:** \`Cannot use import statement outside a module\` OR \`require is not defined\`.
• **Safe diagnostic:** If your \`package.json\` has \`"type": "module"\`, use \`import { test } from '@playwright/test'\`. If not, use \`const { test } = require('@playwright/test')\`. Never mix them.

### 7. Public example website cannot be reached
• **Error message:** \`net::ERR_NAME_NOT_RESOLVED\` or \`net::ERR_CONNECTION_TIMED_OUT\`.
• **Safe diagnostic:** Open your regular web browser and check if \`https://example.com\` loads. Check your computer's internet connection or proxy settings before changing test code.

### 8. Assertion fails because content differs
• **Error message:** \`Timed out 5000ms waiting for expect(locator).toBeVisible()\`.
• **Safe diagnostic:** Inspect the exact text and element role on the target page. Make sure the heading text matches exactly (remember JavaScript is case-sensitive).`,
      keyTakeaways: [
        'playwright.config.js centralizes test directories, timeouts, and browser execution flags.',
        'Never delete project files as a first reaction to errors; follow systematic diagnostics.',
        'Missing browser errors are easily fixed by running npx playwright install.',
        'Match your test import syntax (require vs import) to your package.json type setting.',
        'Check network connectivity and exact casing when element assertions fail.',
      ],
      terminology: [
        { term: 'defineConfig', definition: 'Playwright configuration wrapper providing type checking and autocompletion.' },
        { term: 'Timeout', definition: 'The maximum allowable time a test or action can run before throwing a failure.' },
        { term: 'Diagnostic', definition: 'A systematic procedure to identify the root cause of an error before applying a fix.' },
        { term: 'PATH', definition: 'An operating system environment variable specifying directories where executable programs are located.' },
      ],
      examples: [
        {
          title: 'Checking Installed Playwright Version',
          description: 'Terminal command to verify the installed version of Playwright Test.',
          codeSnippet: `npx playwright --version`,
          expectedOutput: `Version 1.48.0`,
        },
      ],
      exercise: {
        id: 'ex-topic-6',
        title: 'Exercise 6: Troubleshooting Missing Browsers',
        prompt: 'If running a test gives the error "Executable doesn\'t exist at .../ms-playwright/chromium-...", which safe command resolves this issue?',
        options: [
          'rm -rf node_modules package.json',
          'npx playwright install',
          'format C: /q',
          'npm uninstall playwright',
        ],
        correctAnswerIndex: 1,
        explanation: 'The error indicates that the browser binaries have not been downloaded yet. Running npx playwright install downloads Chromium, Firefox, and WebKit binaries safely.',
      },
    },
  ],

  // -------------------------------------------------------------------------
  // INTERVIEW PREPARATION (10 Core Questions with Model Answers)
  // -------------------------------------------------------------------------
  interviewQuestions: [
    {
      id: 'pw-d3-iq-1',
      questionNumber: 1,
      question: 'What is Node.js, and why is it used in Playwright projects?',
      difficulty: 'Beginner',
      assessmentFocus: 'Understanding the execution environment and runtime architecture of modern automation tools.',
      modelAnswer:
        'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser on your computer. Playwright projects require Node.js because automated test scripts run on your operating system to launch and manage browser processes, communicate over WebSocket connections, read configuration files, and interact with the terminal.',
      followUpQuestion: 'How does JavaScript running in Node.js differ from JavaScript running inside Google Chrome?',
    },
    {
      id: 'pw-d3-iq-2',
      questionNumber: 2,
      question: 'What is npm?',
      difficulty: 'Beginner',
      assessmentFocus: 'Package management fundamentals and dependency handling in QA codebases.',
      modelAnswer:
        'npm stands for Node Package Manager. It is the default package manager for Node.js and the largest software registry in the world. In automated testing, we use npm to install and update testing libraries (like @playwright/test), manage project dependencies, and execute test scripts defined in package.json.',
      followUpQuestion: 'What is the difference between npm and npx?',
    },
    {
      id: 'pw-d3-iq-3',
      questionNumber: 3,
      question: 'What is the purpose of package.json?',
      difficulty: 'Beginner',
      assessmentFocus: 'Project structure knowledge and dependency tracking.',
      modelAnswer:
        'package.json is the core manifest file of a Node.js project. It stores project metadata (such as name and version), defines reusable terminal shortcut scripts (like "test": "playwright test"), and lists the exact packages and versions required to run the project under dependencies and devDependencies.',
      followUpQuestion: 'Why should package.json be committed to Git while node_modules is ignored?',
    },
    {
      id: 'pw-d3-iq-4',
      questionNumber: 4,
      question: 'What is Playwright Test?',
      difficulty: 'Beginner',
      assessmentFocus: 'Distinguishing Playwright the library from Playwright Test the test runner.',
      modelAnswer:
        'Playwright Test (@playwright/test) is Microsoft\'s complete, dedicated end-to-end test runner. It provides the test() declaration structure, web-first assertions with expect(), automatic browser isolation fixtures ({ page }, { context }), parallel execution across multiple workers, and built-in HTML reporting.',
      followUpQuestion: 'Can Playwright be used as a standalone automation library without Playwright Test?',
    },
    {
      id: 'pw-d3-iq-5',
      questionNumber: 5,
      question: 'What is the purpose of a .spec.js file?',
      difficulty: 'Beginner',
      assessmentFocus: 'Test discovery conventions and organizational standards.',
      modelAnswer:
        'In automated testing, "spec" stands for specification. Naming files with the .spec.js (or .test.js) convention signals to Playwright Test that the file contains executable test suites. By default, the Playwright test runner scans the tests directory and automatically discovers and runs files matching this naming pattern.',
      followUpQuestion: 'Can you customize which file extensions Playwright looks for in playwright.config.js?',
    },
    {
      id: 'pw-d3-iq-6',
      questionNumber: 6,
      question: 'What does page.goto() do?',
      difficulty: 'Beginner',
      assessmentFocus: 'Browser navigation mechanics and asynchronous handling.',
      modelAnswer:
        'page.goto(url) is an asynchronous Playwright method that instructs the browser page to navigate to a target web address. It returns a Promise and automatically waits for the web page to fire the load event before resolving, ensuring your test does not proceed before the document is ready.',
      followUpQuestion: 'What navigation wait states can you configure in page.goto (such as domcontentloaded or networkidle)?',
    },
    {
      id: 'pw-d3-iq-7',
      questionNumber: 7,
      question: 'What is the purpose of expect()?',
      difficulty: 'Beginner',
      assessmentFocus: 'Test assertions and web-first verification strategies.',
      modelAnswer:
        'expect() is Playwright\'s assertion function used to compare actual application state with expected outcomes. Playwright provides "web-first" assertions (such as expect(locator).toBeVisible() and expect(page).toHaveTitle()) that automatically poll and wait for the condition to be satisfied before timing out, eliminating flaky tests caused by slow rendering.',
      followUpQuestion: 'How do Playwright web-first assertions differ from generic Jest or Chai assertions?',
    },
    {
      id: 'pw-d3-iq-8',
      questionNumber: 8,
      question: 'Why do Playwright tests frequently use async and await?',
      difficulty: 'Beginner',
      assessmentFocus: 'Asynchronous JavaScript foundations and test execution order.',
      modelAnswer:
        'Browser automation actions—such as opening a page, clicking an element, or fetching text—take time because they communicate across WebSocket connections to the browser and wait for rendering pipelines. Because these Playwright methods return Promises, using await pauses execution until each action physically finishes, preventing race conditions and ensuring steps execute in strict sequence.',
      followUpQuestion: 'What happens if you omit the await keyword before page.goto()?',
    },
    {
      id: 'pw-d3-iq-9',
      questionNumber: 9,
      question: 'What is the difference between headless and headed execution?',
      difficulty: 'Beginner',
      assessmentFocus: 'Execution modes, performance considerations, and CI/CD pipelines.',
      modelAnswer:
        'In headless mode, browsers run silently in system memory without rendering a physical graphical user interface on your screen. This is significantly faster, uses fewer system resources, and is the standard mode for CI/CD pipelines. In headed mode (--headed), a visible browser window opens on your desktop, which is ideal for visually debugging clicks, form entries, and animations locally.',
      followUpQuestion: 'Why might a test pass in headed mode locally but fail in headless mode on a CI server?',
    },
    {
      id: 'pw-d3-iq-10',
      questionNumber: 10,
      question: 'What would you investigate if a Playwright test fails before reaching the assertion?',
      difficulty: 'Beginner',
      assessmentFocus: 'Systematic debugging and root cause analysis skills.',
      modelAnswer:
        'If a test fails before reaching an assertion, the failure is usually caused by navigation, environment, or syntax issues rather than an application defect. I would check: 1) Syntax errors or missing await statements in the script, 2) Whether the target URL is accessible or returning a 404/500 network error, 3) Whether browser binaries are installed, 4) Whether a previous action failed (like an element not interactable or obscured by a modal), and 5) Inspect terminal stack traces and Playwright Trace Viewer for exact error details.',
      followUpQuestion: 'How does Playwright Trace Viewer help diagnose failures that occur before assertions?',
    },
  ],

  // -------------------------------------------------------------------------
  // 10-QUESTION CHECKPOINT QUIZ (Passing threshold: 80% / 8 of 10)
  // -------------------------------------------------------------------------
  quizQuestions: [
    {
      id: 'pw-d3-q1',
      questionNumber: 1,
      question: 'What is Node.js in the context of Playwright test automation?',
      options: [
        'A web browser developed by Microsoft to replace Internet Explorer',
        'A JavaScript runtime that executes our automation test scripts on our local computer',
        'A database used exclusively for storing customer passwords',
        'A CSS framework for styling web buttons',
      ],
      correctAnswerIndex: 1,
      explanation: 'Node.js is the runtime environment that executes JavaScript code outside the browser, allowing test scripts to control browser processes and files.',
    },
    {
      id: 'pw-d3-q2',
      questionNumber: 2,
      question: 'Which terminal command initializes a new Playwright project with the interactive setup wizard?',
      options: [
        'npm init playwright@latest',
        'playwright create project --all',
        'node install playwright-now',
        'git clone playwright-official',
      ],
      correctAnswerIndex: 0,
      explanation: 'npm init playwright@latest launches the official interactive CLI setup wizard to configure your Playwright project.',
    },
    {
      id: 'pw-d3-q3',
      questionNumber: 3,
      question: 'When asked by the setup wizard whether to use TypeScript or JavaScript for this course, which should you choose?',
      options: [
        'TypeScript',
        'JavaScript',
        'Python',
        'Java',
      ],
      correctAnswerIndex: 1,
      explanation: 'This course uses pure JavaScript (.js) for all test scripts and exercises.',
    },
    {
      id: 'pw-d3-q4',
      questionNumber: 4,
      question: 'What is the purpose of the tests/ folder in a Playwright project?',
      options: [
        'It stores temporary internet cookies and browser cache',
        'It is the default directory where Playwright looks for automated test specification files',
        'It contains the operating system kernel files',
        'It is where npm installs third-party packages',
      ],
      correctAnswerIndex: 1,
      explanation: 'By default, Playwright searches the tests/ directory for test files ending in .spec.js or .test.js.',
    },
    {
      id: 'pw-d3-q5',
      questionNumber: 5,
      question: 'In the test signature test("user login", async ({ page }) => { ... }), what is { page }?',
      options: [
        'A text string containing the URL of the website',
        'A built-in Playwright test fixture providing an isolated browser tab for the test',
        'A number representing the total pages in the test suite',
        'A CSS stylesheet linked to the homepage',
      ],
      correctAnswerIndex: 1,
      explanation: '{ page } is an isolated browser page fixture provided automatically to each test by Playwright.',
    },
    {
      id: 'pw-d3-q6',
      questionNumber: 6,
      question: 'Which method instructs the browser page to navigate to a target web address?',
      options: [
        'page.openWebsite()',
        'page.goto(url)',
        'page.navigateUrl()',
        'browser.visit()',
      ],
      correctAnswerIndex: 1,
      explanation: 'page.goto(url) is the asynchronous method used in Playwright to navigate to a web address.',
    },
    {
      id: 'pw-d3-q7',
      questionNumber: 7,
      question: 'What does the assertion await expect(locator).toBeVisible(); do?',
      options: [
        'Instantly fails if the element does not appear in 0 milliseconds',
        'Checks if the element is present and visible, automatically polling and waiting for it to appear before timing out',
        'Changes the element background color to neon green',
        'Closes the browser window immediately',
      ],
      correctAnswerIndex: 1,
      explanation: 'toBeVisible() is a web-first assertion that automatically polls and waits for the element to become visible, eliminating timing flakiness.',
    },
    {
      id: 'pw-d3-q8',
      questionNumber: 8,
      question: 'How do you run your Playwright test suite so that the browser window visibly opens on your monitor?',
      options: [
        'npx playwright test --headed',
        'npx playwright test --headless',
        'npm run test:invisible',
        'node run browser:open',
      ],
      correctAnswerIndex: 0,
      explanation: 'The --headed flag opens a visible browser window, allowing you to watch the test run in real time.',
    },
    {
      id: 'pw-d3-q9',
      questionNumber: 9,
      question: 'Why should the node_modules folder be excluded from Git version control?',
      options: [
        'Because Git does not support folders containing the letter "n"',
        'Because it is very large and can be regenerated anytime by running npm install',
        'Because node_modules deletes itself after every test',
        'Because it only works on Windows computers',
      ],
      correctAnswerIndex: 1,
      explanation: 'node_modules contains downloaded dependencies and is huge. It is excluded via .gitignore and recreated on demand using npm install.',
    },
    {
      id: 'pw-d3-q10',
      questionNumber: 10,
      question: 'If running a test outputs "Executable doesn\'t exist at .../ms-playwright/...", what should you do?',
      options: [
        'Delete the entire project folder and start over',
        'Run npx playwright install to download the required browser binaries',
        'Reinstall your computer operating system',
        'Switch from JavaScript to Python immediately',
      ],
      correctAnswerIndex: 1,
      explanation: 'Running npx playwright install downloads the missing browser binaries safely without touching your project files.',
    },
  ],
};

// Starter code for Day 3 Practical Assignment
export const PLAYWRIGHT_DAY_3_STARTER_CODE = `// ============================================================================
// tests/first-test.spec.js - Your First Playwright Test
// ============================================================================

const { test, expect } = require('@playwright/test');

test('homepage displays the expected heading', async ({ page }) => {
  // 1. Navigate to the public practice website
  await page.goto('https://example.com');

  // 2. Locate the main heading and verify it is physically visible
  await expect(
    page.getByRole('heading', { name: 'Example Domain' })
  ).toBeVisible();
});
`;

export const PLAYWRIGHT_DAY_3_STARTER_OUTPUT = `Running 1 test using 1 worker

  ✓ 1 [chromium] › tests/first-test.spec.js:5:1 › homepage displays the expected heading (1.1s)

  1 passed (1.6s)`;

export const PLAYWRIGHT_DAY_3_STARTER_EXPLANATION = `In this test, 'test' declares the scenario and describes its purpose, while 'expect' provides web-first assertions. 

Playwright automatically creates and manages the '{ page }' fixture, giving us a fresh, isolated browser tab. 

The 'page.goto()' method navigates to the target URL asynchronously. 

Because browser actions take time to complete across the network and rendering pipelines, every operation uses 'await' to ensure sequential execution without race conditions. 

If the test failed before the assertion, I would verify network connectivity to example.com, confirm browser binaries are installed via 'npx playwright install', and check the terminal log for syntax or locator errors.`;

// Deterministic rubric evaluation function for Day 3 Practical Assignment
export function evaluateDay3Assignment(
  codeOrParams:
    | string
    | {
        code: string;
        explanation?: string;
        expectedOutput?: string;
        projectSetupConfirmed?: boolean;
        hasScreenshotNote?: boolean;
      },
  explanationParam?: string,
  expectedOutputParam?: string,
  projectSetupConfirmedParam?: boolean
): PlaywrightDay3AssignmentRubric {
  const code = typeof codeOrParams === 'string' ? codeOrParams : (codeOrParams?.code || '');
  const explanation = typeof codeOrParams === 'string'
    ? (explanationParam || '')
    : (codeOrParams?.explanation || explanationParam || '');
  const expectedOutput = typeof codeOrParams === 'string'
    ? (expectedOutputParam || '')
    : (codeOrParams?.expectedOutput || expectedOutputParam || '');
  const projectSetupConfirmed = typeof codeOrParams === 'string'
    ? (projectSetupConfirmedParam ?? true)
    : (codeOrParams?.projectSetupConfirmed ?? true);

  const feedback: string[] = [];
  let score = 0;

  // 1. Local project setup confirmation
  if (projectSetupConfirmed) {
    score += 1;
    feedback.push('✓ Local project setup and directory initialization confirmed.');
  } else {
    feedback.push('✗ Please confirm that you created and initialized your local Playwright project.');
  }

  // 2. Test import check (require or import from @playwright/test)
  const hasTestImport =
    /(require\s*\(\s*['"]@playwright\/test['"]\s*\)|from\s+['"]@playwright\/test['"])/.test(code) &&
    /\btest\b/.test(code) &&
    /\bexpect\b/.test(code);
  if (hasTestImport) {
    score += 1;
    feedback.push('✓ Imported test and expect from @playwright/test.');
  } else {
    feedback.push('✗ Must import test and expect from @playwright/test (using require or import).');
  }

  // 3. Test declaration with async ({ page })
  const hasTestDeclaration = /test\s*\(\s*['"`][\s\S]+?['"`]\s*,\s*async\s*\(\s*\{\s*page\s*\}\s*\)\s*=>/.test(code);
  if (hasTestDeclaration) {
    score += 1;
    feedback.push('✓ Correct test declaration structure using test("...", async ({ page }) => { ... }).');
  } else {
    feedback.push('✗ Missing standard test declaration structure with async ({ page }) fixture.');
  }

  // 4. Navigates to page using await page.goto()
  const navigatesToPage = /await\s+page\.goto\s*\(\s*['"`]https?:\/\/[^'"`]+['"`]\s*\)/.test(code);
  if (navigatesToPage) {
    score += 1;
    feedback.push('✓ Navigates to a webpage using await page.goto(url).');
  } else {
    feedback.push('✗ Must include await page.goto("https://...") to navigate to a target website.');
  }

  // 5. Uses accessible locator (getByRole or locator)
  const usesAccessibleLocator = /(page\.getByRole\s*\(|page\.locator\s*\(|page\.getByText\s*\()/i.test(code);
  if (usesAccessibleLocator) {
    score += 1;
    feedback.push('✓ Locates page element using accessible locator (e.g. getByRole).');
  } else {
    feedback.push('✗ Must locate an element using a Playwright locator like page.getByRole("heading", ...).');
  }

  // 6. Web-first assertion (toBeVisible, toHaveTitle, toHaveURL)
  const hasWebFirstAssertion = /await\s+expect\s*\([\s\S]+?\)\.(toBeVisible|toHaveTitle|toHaveURL|toContainText)\s*\(/i.test(code);
  if (hasWebFirstAssertion) {
    score += 1;
    feedback.push('✓ Uses web-first assertion (e.g. await expect(locator).toBeVisible()).');
  } else {
    feedback.push('✗ Must include a web-first assertion like await expect(locator).toBeVisible().');
  }

  // 7. Headless run output verified in terminal results
  const cleanOutput = expectedOutput.trim();
  const hasHeadlessRunOutput =
    cleanOutput.length >= 20 &&
    /(passed|chromium|running|tests?|worker)/i.test(cleanOutput);
  if (hasHeadlessRunOutput) {
    score += 1;
    feedback.push('✓ Headless test execution terminal output verified.');
  } else {
    feedback.push('✗ Please provide the terminal output showing your test execution (e.g. "1 passed").');
  }

  // 8. Headed execution understood or verified
  const hasHeadedRunOutput =
    /(--headed|headed|window|browser|visible|gui|desktop|opened)/i.test(cleanOutput) ||
    /(--headed|headed|window|browser|visible|gui|desktop|opened)/i.test(explanation);
  if (hasHeadedRunOutput) {
    score += 1;
    feedback.push('✓ Headed browser execution (--headed) noted or demonstrated.');
  } else {
    feedback.push('✗ Please reference or demonstrate headed browser execution (--headed).');
  }

  // 9. Explains Playwright core keywords (test, expect, page, goto, await)
  const cleanExplanation = explanation.trim();
  const explainsPlaywrightKeywords =
    cleanExplanation.length >= 50 &&
    /(test|expect|page|goto|await)/i.test(cleanExplanation) &&
    /(fixture|browser|assert|async|promis|wait)/i.test(cleanExplanation);
  if (explainsPlaywrightKeywords) {
    score += 1;
    feedback.push('✓ Clear explanation of Playwright keywords (test, expect, page, goto, await).');
  } else {
    feedback.push('✗ Written explanation must explain the roles of test, expect, page, goto, and await (at least 50 characters).');
  }

  // 10. Troubleshooting or failure investigation approach described
  const troubleshootingAddressed =
    cleanExplanation.length >= 40 &&
    /(troubleshoot|fail|investigat|network|install|trace|error|issue|element|log)/i.test(cleanExplanation);
  if (troubleshootingAddressed) {
    score += 1;
    feedback.push('✓ Diagnostic strategy for investigating failures or troubleshooting described.');
  } else {
    feedback.push('✗ Please describe one issue encountered or how you would investigate a failure.');
  }

  const criteria = [
    { id: 'c1', title: 'Local Project Setup Confirmation', passed: projectSetupConfirmed, feedback: feedback[0] || '' },
    { id: 'c2', title: 'Import test and expect', passed: hasTestImport, feedback: feedback[1] || '' },
    { id: 'c3', title: 'Test Declaration Structure (async ({ page }))', passed: hasTestDeclaration, feedback: feedback[2] || '' },
    { id: 'c4', title: 'Navigation (await page.goto)', passed: navigatesToPage, feedback: feedback[3] || '' },
    { id: 'c5', title: 'Accessible Locator (getByRole)', passed: usesAccessibleLocator, feedback: feedback[4] || '' },
    { id: 'c6', title: 'Web-First Assertion (toBeVisible)', passed: hasWebFirstAssertion, feedback: feedback[5] || '' },
    { id: 'c7', title: 'Terminal Execution Output', passed: hasHeadlessRunOutput, feedback: feedback[6] || '' },
    { id: 'c8', title: 'Headed Execution Demonstrated / Noted', passed: hasHeadedRunOutput, feedback: feedback[7] || '' },
    { id: 'c9', title: 'Explanation of Playwright Core Concepts', passed: explainsPlaywrightKeywords, feedback: feedback[8] || '' },
    { id: 'c10', title: 'Troubleshooting / Diagnostic Approach', passed: troubleshootingAddressed, feedback: feedback[9] || '' },
  ];

  return {
    projectSetupConfirmed,
    hasTestImport,
    hasTestDeclaration,
    navigatesToPage,
    usesAccessibleLocator,
    hasWebFirstAssertion,
    hasHeadlessRunOutput,
    hasHeadedRunOutput,
    explainsPlaywrightKeywords,
    troubleshootingAddressed,
    score,
    feedback,
    passed: score >= 8,
    criteria,
  };
}
