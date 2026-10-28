import type {
  PlaywrightDay15Unit,
  PlaywrightDay15AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_15_DATA: PlaywrightDay15Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 15,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'CI/CD Integration with GitHub Actions',
  subtitle:
    'Automate test execution on every pull request using GitHub Actions. Build reliable CI pipelines with official Playwright actions, publish downloadable HTML test reports, and diagnose cloud build failures.',
  level: 'Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–14 concepts (Git, test runner, config, reporting, and cross-browser execution).',
  learningObjectives: [
    'Understand CI/CD core concepts: Continuous Integration, automated pull request gating, and rapid regression feedback.',
    'Author production GitHub Actions workflow YAML files: triggers, runners, jobs, steps, and environment variables.',
    'Build an enterprise Playwright CI pipeline: Node.js setup, npm ci, browser installation with --with-deps, and test execution.',
    'Configure artifact uploads to preserve Playwright HTML reports and Trace Viewer archives upon build failure.',
    'Diagnose and troubleshoot common CI build failures: missing dependencies, uninstalled browsers, and environment misconfigurations.',
    'Expose test failures clearly in pull request checks without masking defects through unconditional retries.',
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
    { day: 15, title: 'Day 15: CI/CD Integration with GitHub Actions', focus: 'Pipelines, Headless CI, Artifacts, Troubleshooting', isCurrent: true },
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
      title: 'Topic 1: CI/CD Fundamentals for Automation Engineers',
      durationMinutes: 25,
      explanation: `Automated tests have zero business value if they only run on a QA engineer's local laptop. Automated quality gates must run automatically in the cloud on every proposed code change.

### What Is Continuous Integration (CI)?
Continuous Integration is the software development practice where developers merge their code changes into a central repository frequently. Each merge triggers an automated build and test pipeline to detect integration errors as early as possible.

### The CI Feedback Loop
1. Developer creates a feature branch and pushes code to GitHub.
2. A Pull Request (PR) is opened.
3. The CI runner (e.g. GitHub Actions) spins up a virtual Linux machine (\`ubuntu-latest\`).
4. The pipeline installs dependencies and runs the Playwright test suite in headless mode.
5. If any test fails, the PR is blocked from merging into \`main\`.
6. Developers receive immediate failure reports in under 5 minutes!

### Why Manual QA Gates Slow Down Delivery
Waiting for manual testing before every deployment creates multi-day bottlenecks. CI pipelines with automated Playwright tests allow engineering teams to deploy multiple times per day with high confidence.`,
      keyTakeaways: [
        'CI runs automated tests on every pull request to catch regressions before merging.',
        'Playwright runs in headless mode inside disposable virtual machines.',
        'Failed CI checks prevent broken code from reaching production.',
      ],
      terminology: [
        { term: 'Continuous Integration (CI)', definition: 'The automated process of building and testing code on every repository commit or pull request.' },
        { term: 'Quality Gate', definition: 'A mandatory milestone in a CI/CD pipeline (e.g. passing all automated tests) that must succeed before code can be merged or deployed.' },
      ],
      examples: [
        {
          title: 'GitHub PR Check Status',
          description: 'A pull request waiting for automated tests to pass.',
          codeSnippet: `[Checks] Playwright E2E Tests / test (pull_request) — In progress...
✓ 45 tests passed
✗ 1 test failed (TC-AUTH-02: invalid login)
>> Merge blocked until checks pass`,
        },
      ],
      exercise: {
        id: 'checkpoint-cicd-1',
        title: 'Core Value of CI Gating',
        prompt: 'Why should automated Playwright test suites run on Pull Requests rather than only after merging to the main production branch?',
        options: [
          'Because running tests on the PR catches bugs before they contaminate the main branch, preventing broken code from blocking other developers or reaching users',
          'Because PRs run faster than main branches',
          'Because GitHub Actions only supports pull requests',
          'Because main branches cannot run JavaScript',
        ],
        correctAnswerIndex: 0,
        explanation: 'Testing PR branches creates a protective quality gate: defects are caught and resolved in isolation before ever merging into production code.',
      },
    },

    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: GitHub Actions Workflow Architecture',
      durationMinutes: 30,
      explanation: `GitHub Actions is the industry standard CI/CD platform built directly into GitHub repositories.

### Key Components of a Workflow File
Workflows are defined in YAML format inside the \`.github/workflows/\` directory:

1. **Triggers (\`on\`):** Defines what events trigger the pipeline (e.g. \`push\` to main, \`pull_request\`, or scheduled cron).
2. **Jobs (\`jobs\`):** A collection of steps that execute on a virtual runner. Jobs run in parallel by default.
3. **Runners (\`runs-on\`):** The operating system hosting the job (e.g. \`ubuntu-latest\`, \`windows-latest\`, \`macos-latest\`).
4. **Steps (\`steps\`):** Linear tasks that execute commands (\`run\`) or reuse pre-built actions (\`uses\`).
5. **Secrets & Env (\`env\`):** Secure values injected from GitHub Secrets (e.g. \`\${{ secrets.TEST_USER_PASSWORD }}\`).`,
      keyTakeaways: [
        'Workflows are stored in .github/workflows/*.yml in your repository.',
        'Trigger workflows on push to main and pull_request.',
        'Use ubuntu-latest as the cost-effective, standard Linux runner.',
      ],
      terminology: [
        { term: 'GitHub Actions Runner', definition: 'A virtual machine hosted by GitHub that executes your CI job steps.' },
        { term: 'Workflow YAML', definition: 'The declarative configuration syntax used to define GitHub Actions pipelines.' },
      ],
      examples: [
        {
          title: 'Basic Workflow Triggers',
          description: 'Triggering on push and pull requests targeting main.',
          codeSnippet: `name: Playwright Tests
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]`,
        },
      ],
      exercise: {
        id: 'checkpoint-cicd-2',
        title: 'Workflow Directory Location',
        prompt: 'Where must GitHub Actions workflow YAML files be saved inside your repository for GitHub to detect them?',
        options: [
          '.github/workflows/',
          'config/ci/',
          'scripts/github/',
          'root directory with .yml extension',
        ],
        correctAnswerIndex: 0,
        explanation: 'GitHub Actions strictly requires workflow files to be located in the .github/workflows/ directory in the repository root.',
      },
    },

    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Authoring the Playwright GitHub Actions Pipeline',
      durationMinutes: 35,
      explanation: `Here is the official, production-ready Playwright GitHub Actions workflow:

\`\`\`yaml
# .github/workflows/playwright.yml
name: Playwright Regression Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
      # Step 1: Check out the git repository
      - name: Checkout Code
        uses: actions/checkout@v4

      # Step 2: Set up Node.js LTS
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      # Step 3: Clean install project dependencies (npm ci)
      - name: Install Project Dependencies
        run: npm ci

      # Step 4: Install Playwright browser binaries with Linux OS dependencies
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      # Step 5: Execute Playwright test suite in headless mode
      - name: Run Playwright Tests
        run: npx playwright test
        env:
          CI: true
          BASE_URL: https://staging.rootaccess.org
          TEST_STUDENT_EMAIL: \${{ secrets.TEST_STUDENT_EMAIL }}
          TEST_STUDENT_PASSWORD: \${{ secrets.TEST_STUDENT_PASSWORD }}

      # Step 6: Upload HTML Report & Trace Artifacts (always runs even if tests fail!)
      - name: Upload Test Report & Traces
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
\`\`\`

### Critical Pipeline Nuance: \`--with-deps\`
In a headless Linux runner, browsers require OS-level graphics and font libraries (like libx11, libgstreamer).
Running \`npx playwright install --with-deps\` automatically installs these system dependencies using \`apt-get\`, preventing "Browser closed unexpectedly" startup errors!`,
      keyTakeaways: [
        'Always use npm ci rather than npm install for deterministic, reproducible builds.',
        'Use npx playwright install --with-deps to install Linux system dependencies on ubuntu-latest.',
        'Use if: always() on the artifact upload step so reports are preserved even when tests fail.',
      ],
      terminology: [
        { term: 'npm ci', definition: 'A clean npm installation command that strictly respects package-lock.json, wiping node_modules for deterministic CI builds.' },
        { term: '--with-deps', definition: 'A Playwright CLI flag that installs missing Linux operating system packages required to run browser binaries.' },
      ],
      examples: [
        {
          title: 'Handling Artifact Upload on Failure',
          description: 'Ensuring test reports are accessible when a build breaks.',
          codeSnippet: `- name: Upload Playwright Report
  uses: actions/upload-artifact@v4
  if: always() # CRITICAL: runs on both success and failure!
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30`,
        },
      ],
      exercise: {
        id: 'checkpoint-cicd-3',
        title: 'Why if: always() is Mandatory',
        prompt: 'Why must the artifact upload step use if: always() in a Playwright CI pipeline?',
        options: [
          'Because by default, GitHub Actions stops executing subsequent steps when a previous step fails; if: always() ensures the report is uploaded even when tests fail!',
          'Because if: always() makes tests run twice',
          'Because GitHub requires it for syntax validation',
          'Because without it, Node.js crashes',
        ],
        correctAnswerIndex: 0,
        explanation: 'When tests fail, the test step exits with code 1. Without if: always(), GitHub Actions immediately aborts the job, meaning you would never get the report needed to diagnose the failure!',
      },
    },

    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: CI Troubleshooting & Failure Analysis',
      durationMinutes: 30,
      explanation: `When a CI build fails, engineers must systematically diagnose whether the cause is a **pipeline/environment defect** or a **software regression**.

### 3 Most Common CI Pipeline Errors
1. **Missing \`--with-deps\`:** Error: \`browserType.launch: Host system is missing dependencies to run browsers\`.
   - **Fix:** Update command to \`npx playwright install --with-deps\`.
2. **Missing Dependencies (\`npm install\` omitted):** Error: \`Cannot find module '@playwright/test'\`.
   - **Fix:** Add \`run: npm ci\` step prior to running tests.
3. **Incorrect Artifact Path:** Error: \`Path does not exist: playwright-report/\`.
   - **Fix:** Verify the \`outputFolder\` in \`playwright.config.js\` matches the artifact upload path.

### Distinguishing Test Failures from Infrastructure Failures
- **Infrastructure Failure:** Step 2, 3, or 4 fails during npm install or browser download. The tests never ran.
- **Test Failure:** Step 5 executes, runs 20 tests, and fails with \`1 failed\`. Download the artifact from the summary page to view the trace.`,
      keyTakeaways: [
        'Diagnose whether the pipeline failed before running tests or during test execution.',
        'Download the zipped artifact from GitHub Actions summary to inspect HTML reports and traces.',
        'Never merge a PR with failing CI checks.',
      ],
      terminology: [
        { term: 'CI Artifact', definition: 'A downloadable file or directory (e.g. playwright-report.zip) stored by GitHub Actions after a workflow run.' },
        { term: 'Build Log Triage', definition: 'Reviewing timestamped console logs from virtual CI runners to isolate the exact step that exited with a non-zero code.' },
      ],
      examples: [
        {
          title: 'Inspecting GitHub Actions Summary',
          description: 'Finding uploaded artifacts on GitHub.',
          codeSnippet: `1. Open GitHub repository -> "Actions" tab.
2. Click the failed workflow run.
3. Scroll to the bottom "Artifacts" section.
4. Download "playwright-report.zip".
5. Unzip and view index.html with embedded traces!`,
        },
      ],
      exercise: {
        id: 'checkpoint-cicd-4',
        title: 'Diagnosing Host Dependency Errors',
        prompt: 'If a GitHub Actions job fails with "Host system is missing dependencies to run browsers", how should you resolve it?',
        options: [
          'Add the --with-deps flag: npx playwright install --with-deps',
          'Switch to Windows 95 runner',
          'Delete the test files',
          'Disable headless mode',
        ],
        correctAnswerIndex: 0,
        explanation: 'npx playwright install --with-deps automatically installs missing Linux OS libraries needed by Chromium, Firefox, and WebKit on Ubuntu runners.',
      },
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-day15-1',
      questionNumber: 1,
      question: 'How do you design a GitHub Actions pipeline for Playwright, and what steps are mandatory?',
      difficulty: 'Intermediate',
      assessmentFocus: 'CI/CD pipeline architecture, official actions, and execution sequence.',
      modelAnswer:
        'A production Playwright GitHub Actions pipeline runs on `ubuntu-latest` and consists of 6 sequential steps: 1) `actions/checkout@v4` to pull repository code; 2) `actions/setup-node@v4` with Node 20 and npm caching; 3) `npm ci` for clean, deterministic dependency installation; 4) `npx playwright install --with-deps` to download browser binaries and Linux OS packages; 5) `npx playwright test` with environment variables injected from GitHub Secrets; and 6) `actions/upload-artifact@v4` with `if: always()` to archive the HTML test report and traces for 14 to 30 days regardless of whether tests passed or failed.',
      followUpQuestion: 'Why is npm ci preferred over npm install in CI pipelines?',
    },
    {
      id: 'iq-day15-2',
      questionNumber: 2,
      question: 'Why is the --with-deps flag required when installing Playwright browsers on Linux CI runners?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Linux headless browser architecture and container dependencies.',
      modelAnswer:
        'Clean Linux virtual machine runners (like `ubuntu-latest`) do not include desktop graphical libraries by default. Headless Chromium, Firefox, and WebKit binaries require system packages for font rendering, audio processing, and window management (such as libx11, libgbm, and libasound). The `--with-deps` flag tells Playwright to automatically invoke the operating system package manager (`apt-get`) to install these prerequisite Linux libraries, preventing runtime browser launch crashes.',
      followUpQuestion: 'Can you use official Microsoft Playwright Docker containers instead of installing dependencies manually?',
    },
    {
      id: 'iq-day15-3',
      questionNumber: 3,
      question: 'How do you investigate a Playwright test failure that only occurs on GitHub Actions but passes locally?',
      difficulty: 'Advanced',
      assessmentFocus: 'Environmental discrepancy triage and Trace Viewer debugging.',
      modelAnswer:
        'Discrepancies between local and CI runs are usually caused by: 1) Timing and network latency differences on resource-constrained virtual machines; 2) Screen resolution/viewport differences (defaulting to 1280x720 in headless); 3) Missing environment variables or unseeded database state; or 4) Operating system differences (Linux vs macOS/Windows). I investigate by downloading the `playwright-report` artifact from the GitHub Actions run summary and opening the embedded `trace.zip` in Trace Viewer. This lets me inspect the exact network waterfall, DOM state, and console errors from the CI runner.',
      followUpQuestion: 'How can you simulate CI environment constraints on your local machine?',
    },
    {
      id: 'iq-day15-4',
      questionNumber: 4,
      question: 'What is the purpose of if: always() on the artifact upload step in a GitHub Actions workflow?',
      difficulty: 'Beginner',
      assessmentFocus: 'Workflow condition logic and failure artifact preservation.',
      modelAnswer:
        'By default, GitHub Actions halts execution immediately if any step fails (exits with a non-zero code). When a Playwright test fails, the test step returns exit code 1. Without `if: always()`, the artifact upload step would be skipped, and the HTML report and failure traces would be lost. Specifying `if: always()` forces GitHub Actions to execute the upload step whether the tests passed, failed, or timed out, guaranteeing that engineers have diagnostic evidence to inspect.',
      followUpQuestion: 'How does if: failure() differ from if: always()?',
    },
    {
      id: 'iq-day15-5',
      questionNumber: 5,
      question: 'How do you securely pass credentials and API keys into a GitHub Actions Playwright run?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Secret management and environment variable injection.',
      modelAnswer:
        'We store credentials as Encrypted Secrets in the repository settings (e.g. `TEST_USER_PASSWORD`). In the workflow YAML file, under the test execution step, we map secrets into environment variables using the `${{ secrets.NAME }}` syntax. Playwright tests read these at runtime via `process.env.TEST_USER_PASSWORD`. GitHub automatically masks secret values in console logs, preventing credentials from appearing in public build transcripts.',
      followUpQuestion: 'What precautions must be taken with Pull Requests submitted from public repository forks regarding secrets?',
    },
  ],

  quizQuestions: [
    {
      id: 'q-d15-1',
      questionNumber: 1,
      question: 'Where must GitHub Actions workflow files be saved in your Git repository?',
      options: [
        '.github/workflows/',
        '.ci/pipelines/',
        'config/github-actions/',
        'tests/ci/',
      ],
      correctAnswerIndex: 0,
      explanation: 'GitHub Actions automatically parses any YAML files stored inside the .github/workflows/ directory in the repository root.',
    },
    {
      id: 'q-d15-2',
      questionNumber: 2,
      question: 'Why should npm ci be used instead of npm install in CI workflows?',
      options: [
        'npm ci deletes node_modules and strictly installs exact package versions from package-lock.json for reproducible builds',
        'npm ci only installs CSS files',
        'npm ci is a third-party paid tool',
        'npm ci runs without internet access',
      ],
      correctAnswerIndex: 0,
      explanation: 'npm ci ensures clean, deterministic, and faster installations by strictly adhering to package-lock.json without modifying it.',
    },
    {
      id: 'q-d15-3',
      questionNumber: 3,
      question: 'What does the --with-deps flag do during npx playwright install on Linux runners?',
      options: [
        'It installs required operating system libraries (fonts, graphics packages) needed to run headless browsers on Linux',
        'It downloads all node_modules from GitHub',
        'It installs Python and Ruby',
        'It deletes duplicate test files',
      ],
      correctAnswerIndex: 0,
      explanation: '--with-deps instructs Playwright to install system-level Linux dependencies (like libx11 and libgbm) required by browser binaries.',
    },
    {
      id: 'q-d15-4',
      questionNumber: 4,
      question: 'Which step condition ensures that test reports are uploaded even when tests fail in GitHub Actions?',
      options: [
        'if: always()',
        'if: success()',
        'condition: true',
        'when: completed',
      ],
      correctAnswerIndex: 0,
      explanation: 'if: always() forces the step to execute regardless of the failure status of previous steps, ensuring failure reports are captured.',
    },
    {
      id: 'q-d15-5',
      questionNumber: 5,
      question: 'How do you reference an encrypted repository secret named TEST_PASSWORD in a GitHub Actions workflow step?',
      options: [
        '${{ secrets.TEST_PASSWORD }}',
        'process.env.TEST_PASSWORD directly in YAML',
        '#TEST_PASSWORD',
        '@secrets(TEST_PASSWORD)',
      ],
      correctAnswerIndex: 0,
      explanation: 'GitHub Actions expressions use the ${{ secrets.SECRET_NAME }} syntax to inject encrypted repository secrets into environment variables.',
    },
    {
      id: 'q-d15-6',
      questionNumber: 6,
      question: 'What is the default virtual runner operating system recommended for cost-effective, fast Playwright CI execution?',
      options: [
        'ubuntu-latest',
        'windows-latest',
        'macos-latest',
        'solaris-latest',
      ],
      correctAnswerIndex: 0,
      explanation: 'ubuntu-latest is the fastest, most cost-effective virtual runner on GitHub Actions and supports all Playwright browser engines.',
    },
    {
      id: 'q-d15-7',
      questionNumber: 7,
      question: 'How can developers inspect the HTML test report generated by a failed GitHub Actions run?',
      options: [
        'Download the zipped report artifact from the workflow run summary, unzip it, and open index.html in a browser',
        'Read the binary code in the terminal logs',
        'Wait for GitHub to email a PDF',
        'Re-run the test on their phone',
      ],
      correctAnswerIndex: 0,
      explanation: 'Uploaded artifacts appear as downloadable zip files at the bottom of the GitHub Actions run summary page.',
    },
    {
      id: 'q-d15-8',
      questionNumber: 8,
      question: 'What happens to a Pull Request if an automated Playwright test step exits with code 1 in GitHub Actions?',
      options: [
        'The PR check turns red (failed), blocking the PR from being merged if branch protection rules are configured',
        'GitHub automatically deletes the branch',
        'The PR is automatically merged anyway',
        'The pull request is emailed to Microsoft',
      ],
      correctAnswerIndex: 0,
      explanation: 'An exit code of 1 marks the check as failed, acting as a quality gate that prevents merging broken code into the protected main branch.',
    },
    {
      id: 'q-d15-9',
      questionNumber: 9,
      question: 'Which official action from GitHub is used to check out repository code into the CI runner workspace?',
      options: [
        'actions/checkout@v4',
        'actions/clone-repo@v1',
        'git/pull@v2',
        'playwright/download@v4',
      ],
      correctAnswerIndex: 0,
      explanation: 'actions/checkout@v4 is the standard official GitHub action used to check out repository source code so subsequent steps can access it.',
    },
    {
      id: 'q-d15-10',
      questionNumber: 10,
      question: 'Why should CI pipelines avoid setting retries to high numbers (e.g. retries: 5)?',
      options: [
        'High retries mask real race conditions, delay CI feedback by multiplying runtime, and allow flaky defects to slip into production',
        'Because GitHub bans repositories with more than 3 retries',
        'Because retries crash the Linux operating system',
        'Because retries cost $100 per test',
      ],
      correctAnswerIndex: 0,
      explanation: 'Setting excessive retries masks underlying timing and synchronization bugs, degrades test trust, and artificially prolongs CI pipeline durations.',
    },
  ],
};

export const PLAYWRIGHT_DAY_15_STARTER_CODE = `# .github/workflows/playwright_pipeline.yml
# Production-ready GitHub Actions CI/CD Pipeline for Playwright Automation

name: Playwright Regression Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  e2e-testing:
    name: Playwright Test Suite
    timeout-minutes: 30
    runs-on: ubuntu-latest

    steps:
      # 1. Check out repository code
      - name: Checkout Code Repository
        uses: actions/checkout@v4

      # 2. Setup Node.js runtime with npm dependency caching
      - name: Setup Node.js LTS
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      # 3. Clean, deterministic dependency installation
      - name: Clean Install Project Dependencies (npm ci)
        run: npm ci

      # 4. Install Playwright browser engines with required Linux OS libraries
      - name: Install Playwright Browsers & OS Dependencies
        run: npx playwright install --with-deps

      # 5. Execute Playwright test suite in headless mode
      - name: Run Playwright Tests
        run: npx playwright test
        env:
          CI: true
          BASE_URL: https://staging.rootaccess.org
          TEST_STUDENT_EMAIL: \${{ secrets.TEST_STUDENT_EMAIL || 'student.automation@rootaccess.org' }}
          TEST_STUDENT_PASSWORD: \${{ secrets.TEST_STUDENT_PASSWORD || 'RootAccess@2026' }}

      # 6. Upload HTML Report & Trace Artifacts (executes even on failure)
      - name: Upload Test Report & Trace Artifacts
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
`;

export const PLAYWRIGHT_DAY_15_STARTER_EXPLANATION = `CI/CD Pipeline Architecture & Best Practices:
1. Triggers & Branch Gating: Configured push and pull_request triggers on the main branch to ensure every PR is automatically tested.
2. Clean Dependency Installation (npm ci): Used npm ci instead of npm install to guarantee deterministic builds from package-lock.json.
3. Linux Host Dependencies (--with-deps): Added --with-deps to npx playwright install to prevent Linux headless browser launch failures.
4. Resilient Artifact Preservation: Configured actions/upload-artifact@v4 with if: always() so reports and traces are archived even when tests fail.
5. Secure Secret Management: Injected credentials using GitHub Secrets (\${{ secrets.TEST_STUDENT_PASSWORD }}), protecting credentials from source control leaks.
6. Execution Guardrails: Added timeout-minutes: 30 to prevent stuck jobs from consuming excessive runner minutes.`;

export const PLAYWRIGHT_DAY_15_STARTER_OUTPUT = `✓ Workflow validation passed: .github/workflows/playwright_pipeline.yml
Jobs:
  e2e-testing:
    runs-on: ubuntu-latest
    steps:
      1. actions/checkout@v4
      2. actions/setup-node@v4 (node 20, cache: npm)
      3. npm ci
      4. npx playwright install --with-deps
      5. npx playwright test
      6. actions/upload-artifact@v4 (if: always(), path: playwright-report/)

Pipeline simulated execution: 14 passed (1m 45s)`;

export function evaluateDay15Assignment(
  code: string,
  _expectedOutput: string,
  explanation: string
): PlaywrightDay15AssignmentRubric {
  const criteria: PlaywrightDay15AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Creates GitHub Actions workflow structure
  const createsGitHubActionsWorkflow =
    /name:\s*|jobs:\s*|steps:\s*/.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'GitHub Actions Workflow Structure',
    passed: createsGitHubActionsWorkflow,
    feedback: createsGitHubActionsWorkflow
      ? 'Configured standard GitHub Actions workflow structure.'
      : 'Structure file with name, on, jobs, and steps keys.',
  });
  if (createsGitHubActionsWorkflow) score += 1;

  // 2. Configures push and PR triggers
  const configuresPushAndPrTriggers =
    /push:\s*branches:|pull_request:\s*branches:/i.test(code);
  criteria.push({
    id: 'crit-2',
    title: 'Workflow Triggers (push & pull_request)',
    passed: configuresPushAndPrTriggers,
    feedback: configuresPushAndPrTriggers
      ? 'Configured push and pull_request event triggers on main branch.'
      : 'Include push and pull_request triggers on main.',
  });
  if (configuresPushAndPrTriggers) score += 1;

  // 3. Installs Node and dependencies
  const installsNodeAndDependencies =
    /actions\/setup-node/i.test(code) &&
    /npm\s+ci/i.test(code);
  criteria.push({
    id: 'crit-3',
    title: 'Node.js Setup & Deterministic npm ci',
    passed: installsNodeAndDependencies,
    feedback: installsNodeAndDependencies
      ? 'Set up Node.js with setup-node action and installed dependencies via npm ci.'
      : 'Use actions/setup-node and run npm ci.',
  });
  if (installsNodeAndDependencies) score += 1;

  // 4. Installs Playwright browsers with --with-deps
  const installsPlaywrightBrowsers =
    /playwright\s+install\s+--with-deps/i.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Browser Binaries with --with-deps',
    passed: installsPlaywrightBrowsers,
    feedback: installsPlaywrightBrowsers
      ? 'Installed browsers with Linux host dependencies using --with-deps.'
      : 'Run npx playwright install --with-deps to install Linux OS packages.',
  });
  if (installsPlaywrightBrowsers) score += 1;

  // 5. Executes Playwright tests
  const executesPlaywrightTests =
    /run:\s*npx\s+playwright\s+test/i.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'Playwright Test Execution Command',
    passed: executesPlaywrightTests,
    feedback: executesPlaywrightTests
      ? 'Configured test execution step via npx playwright test.'
      : 'Include step running npx playwright test.',
  });
  if (executesPlaywrightTests) score += 1;

  // 6. Uploads report artifacts with if: always()
  const uploadsReportArtifacts =
    /actions\/upload-artifact/i.test(code) &&
    /if:\s*always\(\)/i.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Artifact Upload with if: always()',
    passed: uploadsReportArtifacts,
    feedback: uploadsReportArtifacts
      ? 'Configured upload-artifact action with if: always() condition.'
      : 'Use actions/upload-artifact with if: always() to preserve reports.',
  });
  if (uploadsReportArtifacts) score += 1;

  // 7. Diagnoses three CI bugs in explanation
  const diagnosesThreeCiBugs =
    /npm ci|--with-deps|if: always|artifact|secret/i.test(explanation);
  criteria.push({
    id: 'crit-7',
    title: 'CI Failure Diagnosis & Best Practices',
    passed: diagnosesThreeCiBugs,
    feedback: diagnosesThreeCiBugs
      ? 'Explained root causes of common CI pipeline failures.'
      : 'Discuss common CI bugs (missing deps, no --with-deps, missing artifacts) in explanation.',
  });
  if (diagnosesThreeCiBugs) score += 1;

  // 8. Avoids unconditional retries
  const avoidsUnconditionalRetries =
    !/retries:\s*[5-9]\d*/.test(code);
  criteria.push({
    id: 'crit-8',
    title: 'Responsible Retry Configuration',
    passed: avoidsUnconditionalRetries,
    feedback: avoidsUnconditionalRetries
      ? 'Avoided excessive retries that mask underlying flaky defects.'
      : 'Keep retries reasonable (1 or 2 in CI) to prevent masking bugs.',
  });
  if (avoidsUnconditionalRetries) score += 1;

  // 9. Exposes test failures clearly
  const exposesTestFailuresClearly =
    /CI:\s*true/i.test(code) ||
    /secrets\./i.test(code);
  criteria.push({
    id: 'crit-9',
    title: 'Environment Variables & Secret Injection',
    passed: exposesTestFailuresClearly,
    feedback: exposesTestFailuresClearly
      ? 'Injected CI environment variables and secrets safely.'
      : 'Pass CI: true and map secrets under env in test step.',
  });
  if (exposesTestFailuresClearly) score += 1;

  // 10. Valid YAML syntax structure
  const validYamlSyntax =
    code.includes('name:') && code.includes('on:') && code.includes('jobs:');
  criteria.push({
    id: 'crit-10',
    title: 'Clean Declarative YAML Syntax',
    passed: validYamlSyntax,
    feedback: validYamlSyntax
      ? 'Authored clean, valid YAML workflow syntax.'
      : 'Ensure workflow contains valid YAML syntax.',
  });
  if (validYamlSyntax) score += 1;

  const passed = score >= 8;
  const feedback = criteria.map((c) => `${c.passed ? '✓' : '✗'} ${c.title}: ${c.feedback}`);

  return {
    score,
    feedback,
    passed,
    criteria,
    createsGitHubActionsWorkflow,
    configuresPushAndPrTriggers,
    installsNodeAndDependencies,
    installsPlaywrightBrowsers,
    executesPlaywrightTests,
    uploadsReportArtifacts,
    diagnosesThreeCiBugs,
    avoidsUnconditionalRetries,
    exposesTestFailuresClearly,
    validYamlSyntax,
  };
}
