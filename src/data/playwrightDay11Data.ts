import type {
  PlaywrightDay11Unit,
  PlaywrightDay11AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_11_DATA: PlaywrightDay11Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 11,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'Authentication, Sessions and Test Isolation',
  subtitle:
    'Master production authentication testing in Playwright. Bypass repetitive login UI clicks using storageState session caching, enforce strict test isolation, and protect credentials with environment variables.',
  level: 'Intermediate to Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–10 concepts (Locators, web-first assertions, auto-waiting, fixtures, and debugging).',
  learningObjectives: [
    'Understand authentication mechanisms: sessions, cookies, JWTs, localStorage, and role-based access control (RBAC).',
    'Test core authentication workflows: successful login, invalid credentials, logout, and session persistence.',
    'Test authorization boundaries: verifying redirects or 403 Forbidden when unauthenticated users access protected routes.',
    'Implement Playwright storageState to log in once and reuse authenticated browser state across hundreds of tests.',
    'Configure authentication setup projects in playwright.config.js.',
    'Maintain strict test isolation and avoid shared mutable state anti-patterns across concurrent worker threads.',
    'Manage secrets securely using environment variables and ensure authentication state files are gitignored.',
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
    { day: 11, title: 'Day 11: Authentication, Sessions & Test Isolation', focus: 'storageState, Session Reuse, Security', isCurrent: true },
    { day: 12, title: 'Day 12: Page Object Model (POM) Design', focus: 'Maintainable Classes, Clean Page Abstractions' },
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
      title: 'Topic 1: Authentication & Authorization Fundamentals',
      durationMinutes: 25,
      explanation: `Modern web applications protect sensitive data and features behind authentication and authorization layers.

### Authentication vs Authorization
- **Authentication (AuthN):** Who are you? (e.g. Logging in with username and password, verifying MFA tokens).
- **Authorization (AuthZ):** What are you allowed to do? (e.g. Can a Student delete a course? Can an Admin approve a refund?).

### How Browsers Store Session State
After a successful login, web servers establish an authenticated session using:
1. **HTTP-only Cookies:** Secure tokens stored by the browser that are automatically attached to outgoing HTTP requests.
2. **Local Storage / Session Storage:** Client-side storage storing JWT (JSON Web Tokens) or session IDs.

### Role-Based Access Control (RBAC)
Enterprises define roles such as:
- **Admin:** Full access to user management, billing, and system configuration.
- **Instructor / Manager:** Access to content creation and student grading.
- **Student / Customer:** Read-only access to enrolled content and personal profile.
- **Guest (Unauthenticated):** Access restricted to landing page and login portal.`,
      keyTakeaways: [
        'Authentication verifies identity; authorization verifies permissions.',
        'Sessions are maintained via cookies or localStorage tokens.',
        'Always test role-based boundaries (RBAC) to ensure low-privilege roles cannot access admin actions.',
      ],
      terminology: [
        { term: 'Authentication (AuthN)', definition: 'The process of validating that a user is who they claim to be.' },
        { term: 'Authorization (AuthZ)', definition: 'The process of granting or denying specific actions based on the user’s role.' },
        { term: 'Role-Based Access Control (RBAC)', definition: 'A security design where permissions are assigned to roles rather than individual users.' },
      ],
      examples: [
        {
          title: 'Protected Route Redirection Logic',
          description: 'A typical web app redirecting unauthenticated visitors.',
          codeSnippet: `// If an unauthenticated user navigates directly to /settings
// Expect redirect: /login?redirectTo=/settings`,
        },
      ],
      exercise: {
        id: 'checkpoint-auth-1',
        title: 'AuthN vs AuthZ',
        prompt: 'A student logs in with valid credentials, but is blocked from visiting the /admin/users URL. What security layer is functioning?',
        options: [
          'Authorization (AuthZ) correctly preventing access based on user role',
          'Authentication (AuthN) has failed',
          'Browser context crashed',
          'Playwright timed out',
        ],
        correctAnswerIndex: 0,
        explanation: 'The user successfully authenticated (identity confirmed), but authorization rules restricted them from accessing an administrative route.',
      },
    },

    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Testing Core Authentication Workflows',
      durationMinutes: 30,
      explanation: `Every robust test suite must verify the core authentication lifecycle:

### 1. Successful Login Happy Path
Verify that valid credentials result in navigation to the dashboard and display user profile details.

### 2. Negative Authentication Scenarios
Verify that the application properly displays user-friendly, secure error messages:
- Invalid password: \`Invalid email or password\` (never specify which one failed, preventing user enumeration!).
- Nonexistent email.
- Empty fields (client-side form validation).

### 3. Logout Workflow
Verify that clicking Logout:
1. Invalidates the session on the server.
2. Clears browser cookies and localStorage.
3. Redirects to the public login or landing page.
4. Prevents navigating back via the browser Back button!

### 4. Protected Route Guarding
Attempting to navigate directly to \`/app\` or \`/settings\` while unauthenticated must redirect to \`/login\`.`,
      keyTakeaways: [
        'Verify both positive login and negative validation scenarios.',
        'Ensure error messages do not reveal whether an email exists (prevents user enumeration).',
        'Verify logout clears tokens and blocks Back button access to cached pages.',
        'Verify unauthenticated access to protected routes forces a redirect to /login.',
      ],
      terminology: [
        { term: 'User Enumeration', definition: 'A security vulnerability where distinct error messages allow attackers to determine whether a username or email exists in the database.' },
        { term: 'Route Guard', definition: 'Client-side or server-side logic that intercepts navigation to protected routes and verifies authentication status.' },
      ],
      examples: [
        {
          title: 'Testing Protected Route Redirection',
          description: 'Playwright test verifying that guest users are blocked from dashboard.',
          codeSnippet: `test('unauthenticated visitor is redirected from dashboard to login', async ({ page }) => {
  await page.goto('/app');
  await expect(page).toHaveURL(/.*login/);
  await expect(page.getByRole('heading', { name: /sign in|log in/i })).toBeVisible();
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-auth-2',
        title: 'Secure Error Messaging',
        prompt: 'Why should a failed login return "Invalid email or password" rather than "Password incorrect for this email"?',
        options: [
          'To prevent attackers from using the login form to discover which email addresses exist in your database (User Enumeration)',
          'Because JavaScript cannot detect password errors',
          'Because browsers prohibit specific error strings',
          'To speed up database indexing',
        ],
        correctAnswerIndex: 0,
        explanation: 'Generic error messages prevent attackers from harvesting valid user accounts through trial-and-error.',
      },
    },

    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Playwright storageState & Session Reuse',
      durationMinutes: 35,
      explanation: `In an enterprise test suite with 200 tests, logging in via the UI before every single test wastes 15–20 minutes of CI time!

### What Is \`storageState\`?
Playwright can snapshot the authenticated state (cookies and localStorage) of a browser context and save it to a local JSON file:
\`\`\`javascript
// auth.setup.js
const { test: setup, expect } = require('@playwright/test');

setup('authenticate as test student', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(process.env.TEST_STUDENT_EMAIL);
  await page.getByLabel('Password').fill(process.env.TEST_STUDENT_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByRole('heading', { name: /dashboard|my learning/i })).toBeVisible();

  // Save session cookies & localStorage to disk!
  await page.context().storageState({ path: 'playwright/.auth/student.json' });
});
\`\`\`

### Reusing \`storageState\` in \`playwright.config.js\`
\`\`\`javascript
// playwright.config.js
module.exports = {
  projects: [
    // 1. Setup project runs first to authenticate once
    { name: 'setup', testMatch: /.*\\.setup\\.js/ },

    // 2. Main tests reuse the saved authentication state
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        storageState: 'playwright/.auth/student.json',
      },
    },
  ],
};
\`\`\`

### Avoiding Shared Mutable State
If a test modifies the user account (e.g. changes the password, updates the profile name, or deletes account data), do NOT use a shared \`storageState\`!
Use dedicated test users or create fresh isolated accounts for destructive tests.`,
      keyTakeaways: [
        'storageState snapshots cookies and localStorage to bypass repetitive UI logins.',
        'Use setup projects in playwright.config.js to run authentication once before test suites.',
        'Always gitignore the .auth/ directory to prevent leaking session tokens into version control.',
        'Never use shared sessions for destructive tests that mutate account data.',
      ],
      terminology: [
        { term: 'storageState', definition: 'A Playwright API that extracts and re-injects cookies and localStorage into browser contexts.' },
        { term: 'Setup Project', definition: 'A Playwright project dependency configured to execute preparation tasks (like authentication) before main test suites run.' },
      ],
      examples: [
        {
          title: 'Direct Test with Injected Storage State',
          description: 'A test that opens directly to an authenticated dashboard.',
          codeSnippet: `test('authenticated user sees enrolled courses', async ({ page }) => {
  // Page opens pre-authenticated! Zero login steps required!
  await page.goto('/app');
  await expect(page.getByText('My Enrolled Courses')).toBeVisible();
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-auth-3',
        title: 'Benefits of storageState',
        prompt: 'How does storageState improve automated test suites containing 100 authenticated tests?',
        options: [
          'It logs in once via a setup project, saving minutes of CI runtime and reducing login endpoint load by 99%',
          'It encrypts browser memory with quantum keys',
          'It bypasses the need for web servers',
          'It replaces Chromium with WebKit',
        ],
        correctAnswerIndex: 0,
        explanation: 'storageState saves session cookies and localStorage to disk once, allowing subsequent tests to start in an already-authenticated state instantly.',
      },
    },

    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Secrets, Security & Test Isolation',
      durationMinutes: 30,
      explanation: `Security and test isolation are non-negotiable standards in automated testing.

### 1. Zero Plaintext Passwords in Code
Never commit passwords, API keys, or access tokens to GitHub or GitLab:
\`\`\`javascript
// ❌ DANGEROUS SECURITY VULNERABILITY:
await page.getByLabel('Password').fill('SuperSecretP@ssword2026!');

// ✅ SECURE BEST PRACTICE:
await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD || '');
\`\`\`

### 2. Managing \`.env\` and \`.gitignore\`
Always maintain a \`.env.example\` for documentation, but keep \`.env\` and \`playwright/.auth/\` in \`.gitignore\`:
\`\`\`text
# .gitignore
.env
.env.local
playwright/.auth/
test-results/
playwright-report/
\`\`\`

### 3. Test Isolation Principles
1. **No Test Order Dependence:** Test B must pass whether it runs before Test A, after Test A, or simultaneously on a different worker.
2. **Dedicated Test Accounts:** Never use real customer accounts or shared production credentials.
3. **Data Teardown / Sandbox Data:** Ensure tests clean up records or operate in disposable sandbox tenants.`,
      keyTakeaways: [
        'Never hardcode passwords or secrets in automation scripts or test data.',
        'Use process.env to load credentials from environment variables.',
        'Add .env and playwright/.auth/ to .gitignore.',
        'Maintain complete test independence so tests can execute concurrently without interference.',
      ],
      terminology: [
        { term: 'Environment Variables', definition: 'Dynamic values loaded into process.env from the operating system or .env files at runtime.' },
        { term: 'Session Leakage', definition: 'An isolation defect where cookies or state from one test unexpectedly affect a subsequent test.' },
      ],
      examples: [
        {
          title: 'Safe Credential Loading Pattern',
          description: 'Loading credentials with verification.',
          codeSnippet: `const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

if (!email || !password) {
  throw new Error('Missing required test credentials: TEST_USER_EMAIL and TEST_USER_PASSWORD must be defined.');
}`,
        },
      ],
      exercise: {
        id: 'checkpoint-auth-4',
        title: 'Credential Safety in Version Control',
        prompt: 'Why should the playwright/.auth/ directory containing storageState JSON files always be added to .gitignore?',
        options: [
          'Because storageState JSON files contain active authentication cookies and JWT tokens that would compromise account security if committed to a public or team repository',
          'Because git cannot track JSON files',
          'Because Playwright crashes if .auth is in git',
          'Because JSON files corrupt git branches',
        ],
        correctAnswerIndex: 0,
        explanation: 'storageState files contain valid session cookies and authorization tokens. Committing them exposes active sessions to anyone with repository read access.',
      },
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-day11-1',
      questionNumber: 1,
      question: 'How does Playwright’s storageState mechanism work, and what are its advantages over logging in before every test?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Authentication architecture and execution performance.',
      modelAnswer:
        'Playwright’s `storageState` captures the authenticated state—specifically HTTP cookies, origin local storage, and session storage—from a browser context and persists it to a JSON file. Using Playwright’s setup project feature, we perform the UI login flow once before the suite runs, save the session to `playwright/.auth/user.json`, and configure subsequent projects to launch with this storageState pre-loaded. This eliminates hundreds of redundant UI logins, reduces test suite duration by up to 80%, and prevents rate-limiting on login endpoints.',
      followUpQuestion: 'When would you deliberately NOT use storageState?',
    },
    {
      id: 'iq-day11-2',
      questionNumber: 2,
      question: 'How do you test that an unauthenticated user cannot access protected application routes?',
      difficulty: 'Beginner',
      assessmentFocus: 'Route guarding, authorization testing, and web-first assertions.',
      modelAnswer:
        'In an isolated, unauthenticated test (a browser context with empty storageState), I call `await page.goto("/protected-dashboard")`. I assert that the application intercepts the request and redirects the user to the login route using `await expect(page).toHaveURL(/.*login/)`. I also verify that the login form heading is visible and that no sensitive dashboard data or account details are rendered in the DOM.',
      followUpQuestion: 'How do you verify role-based access control (RBAC) where a Student tries to visit /admin?',
    },
    {
      id: 'iq-day11-3',
      questionNumber: 3,
      question: 'How do you manage passwords and API secrets safely in an enterprise Playwright CI/CD pipeline?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Security posture, environment variables, and credential hygiene.',
      modelAnswer:
        'Credentials must never be committed to source code or plain test data files. In CI/CD (such as GitHub Actions), credentials are stored as encrypted repository secrets and injected into the test container as environment variables. In test scripts, we access them via `process.env.TEST_PASSWORD`. Additionally, we maintain `.env` and `playwright/.auth/` entries in `.gitignore` to prevent accidental credential leakage in pull requests.',
      followUpQuestion: 'What precautions should you take regarding Playwright Trace Viewer and screenshots when dealing with credentials?',
    },
    {
      id: 'iq-day11-4',
      questionNumber: 4,
      question: 'What is test isolation, and why is shared mutable state dangerous in parallel Playwright execution?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Test independence, concurrency, and parallelism.',
      modelAnswer:
        'Test isolation means that each test runs independently without relying on the state created by other tests. When Playwright executes tests in parallel across multiple worker processes, tests run concurrently in non-deterministic order. If tests share the same mutable account (e.g. Test A updates the profile name or password while Test B asserts the original profile), race conditions occur and tests fail intermittently. We prevent this by ensuring tests either use read-only shared states or generate isolated, dedicated user accounts.',
      followUpQuestion: 'How does Playwright BrowserContext provide built-in isolation between tests?',
    },
    {
      id: 'iq-day11-5',
      questionNumber: 5,
      question: 'How would you test session expiration or logout handling in Playwright?',
      difficulty: 'Scenario-Based',
      assessmentFocus: 'Cookie manipulation, API session invalidation, and logout flow.',
      modelAnswer:
        'For logout, I click the user avatar, click "Sign Out", and assert that the user is redirected to `/login`. To verify true session destruction, I attempt to navigate back to `/app` using `page.goto()` and assert that the application denies entry and re-redirects to `/login`. For session expiration, I either programmatically clear the authentication cookie using `await page.context().clearCookies()` or use Playwright’s `request` API to invalidate the session token on the backend, then perform a page action to assert that an "Expired session - please log in" modal or redirect is triggered.',
      followUpQuestion: 'How does page.context().clearCookies() differ from clearing browser cache?',
    },
  ],

  quizQuestions: [
    {
      id: 'q-d11-1',
      questionNumber: 1,
      question: 'What does Playwright storageState store when saved from a browser context?',
      options: [
        'Browser cookies and localStorage values associated with origins',
        'The complete HTML source code of the webpage',
        'Operating system passwords',
        'Video recordings of the test execution',
      ],
      correctAnswerIndex: 0,
      explanation: 'storageState extracts all active cookies and origin-specific localStorage key-value pairs, enabling subsequent contexts to instantiate in an already-logged-in state.',
    },
    {
      id: 'q-d11-2',
      questionNumber: 2,
      question: 'Where should credentials like TEST_USER_PASSWORD be accessed in a production Playwright test?',
      options: [
        'Via process.env.TEST_USER_PASSWORD from environment variables',
        'Hardcoded as a plaintext string in the test file',
        'Stored in a public README file',
        'Read from a comment in the HTML header',
      ],
      correctAnswerIndex: 0,
      explanation: 'Using process.env keeps sensitive credentials out of version control and allows secure injection via CI/CD secret managers.',
    },
    {
      id: 'q-d11-3',
      questionNumber: 3,
      question: 'Which file must include playwright/.auth/ to prevent committing cached session tokens?',
      options: [
        '.gitignore',
        'package.json',
        'playwright.config.js',
        'index.html',
      ],
      correctAnswerIndex: 0,
      explanation: '.gitignore instructs Git to ignore the playwright/.auth/ directory so active authentication tokens are never pushed to remote repositories.',
    },
    {
      id: 'q-d11-4',
      questionNumber: 4,
      question: 'What is the purpose of an authentication "setup project" in playwright.config.js?',
      options: [
        'To execute the login workflow once before any dependent test projects run, saving the authenticated state to disk',
        'To install Chromium and Firefox browser binaries',
        'To compile TypeScript to JavaScript',
        'To clean up temporary files after all tests finish',
      ],
      correctAnswerIndex: 0,
      explanation: 'A setup project runs before other projects, logs in, and produces a storageState file that subsequent test projects declare as a dependency and reuse.',
    },
    {
      id: 'q-d11-5',
      questionNumber: 5,
      question: 'How do you verify that an unauthenticated user is blocked from viewing a dashboard?',
      options: [
        'Navigate directly to /dashboard without auth state and assert page redirect to /login with expect(page).toHaveURL(/.*login/)',
        'Log in with an admin account and check the logout button',
        'Delete the dashboard route from source code',
        'Set headless: true in config',
      ],
      correctAnswerIndex: 0,
      explanation: 'Testing route protection requires an unauthenticated context attempting to visit a protected URL and verifying that route guards redirect to the login page.',
    },
    {
      id: 'q-d11-6',
      questionNumber: 6,
      question: 'Why is using a shared authenticated user dangerous for tests that change passwords or update user profile data?',
      options: [
        'Because concurrent worker tests will experience race conditions and fail when the credentials or user state change unpredictably',
        'Because Playwright does not support password changes',
        'Because Chromium crashes when user names change',
        'Because Node.js locks objects that are modified',
      ],
      correctAnswerIndex: 0,
      explanation: 'Shared mutable state causes race conditions when tests run in parallel. Destructive or state-mutating tests must use dedicated, isolated user accounts.',
    },
    {
      id: 'q-d11-7',
      questionNumber: 7,
      question: 'Which method clears all cookies from the current Playwright BrowserContext?',
      options: [
        'await context.clearCookies()',
        'await page.deleteCookies()',
        'context.removeAllCookies()',
        'page.cookie("clear")',
      ],
      correctAnswerIndex: 0,
      explanation: 'context.clearCookies() clears all stored cookies from the browser context, which is useful for testing immediate session invalidation or logout behavior.',
    },
    {
      id: 'q-d11-8',
      questionNumber: 8,
      question: 'What is the difference between Authentication (AuthN) and Authorization (AuthZ)?',
      options: [
        'Authentication verifies who you are; Authorization verifies what permissions and actions you are permitted to perform',
        'Authentication is for databases; Authorization is for CSS',
        'Authentication is only used on mobile phones',
        'They are identical terms with no technical distinction',
      ],
      correctAnswerIndex: 0,
      explanation: 'AuthN establishes user identity (login), while AuthZ enforces security policies and role permissions on protected resources.',
    },
    {
      id: 'q-d11-9',
      questionNumber: 9,
      question: 'How do you configure a specific test to bypass the global storageState and run as an unauthenticated guest?',
      options: [
        'Specify test.use({ storageState: { cookies: [], origins: [] } }) inside the test file or describe block',
        'Add // unauthenticated comment above the test',
        'Turn off WiFi before the test runs',
        'Use page.unauthenticate()',
      ],
      correctAnswerIndex: 0,
      explanation: 'test.use({ storageState: { cookies: [], origins: [] } }) overrides project-level auth configuration, providing a clean unauthenticated context for guest tests.',
    },
    {
      id: 'q-d11-10',
      questionNumber: 10,
      question: 'What is the most secure way to handle test user credentials for local test runs?',
      options: [
        'Create a local .env file (listed in .gitignore) and load it with dotenv in playwright.config.js',
        'Post credentials in a public Slack channel',
        'Hardcode passwords into git commits',
        'Save passwords in browser bookmarks',
      ],
      correctAnswerIndex: 0,
      explanation: 'Storing local secrets in a gitignored .env file and loading them into process.env keeps secrets secure on developer machines without risking repo leaks.',
    },
  ],
};

export const PLAYWRIGHT_DAY_11_STARTER_CODE = `// tests/authentication_and_session_suite.spec.js
const { test, expect } = require('@playwright/test');

// Dedicated, safe fictional credentials for automated testing
const TEST_CREDENTIALS = {
  validUser: {
    email: process.env.TEST_STUDENT_EMAIL || 'student.automation@rootaccess.org',
    password: process.env.TEST_STUDENT_PASSWORD || 'RootAccess@2026',
    fullName: 'Automated Student',
  },
  invalidUser: {
    email: 'unregistered.user@rootaccess.org',
    password: 'WrongPassword123!',
  },
};

test.describe('Authentication, Session Lifecycle & Route Guards', () => {

  // 1. Unauthenticated Route Guard Testing
  // Explicitly ensure this test starts with zero stored cookies or tokens!
  test.describe('Unauthenticated Guest Tests', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('TC-AUTH-01: unauthenticated user navigating to /app is redirected to /login', async ({ page }) => {
      // Act: Attempt to directly access protected student dashboard
      await page.goto('/app');

      // Assert: Verify redirect to login and presence of auth form
      await expect(page).toHaveURL(/.*login/);
      await expect(page.getByRole('heading', { name: /sign in|log in/i })).toBeVisible();
      await expect(page.getByLabel(/email/i)).toBeVisible();
    });

    test('TC-AUTH-02: invalid credentials display secure generic error message', async ({ page }) => {
      await page.goto('/login');

      await page.getByLabel(/email/i).fill(TEST_CREDENTIALS.invalidUser.email);
      await page.getByLabel(/password/i).fill(TEST_CREDENTIALS.invalidUser.password);
      await page.getByRole('button', { name: /sign in|log in/i }).click();

      // Assert: Verify user enumeration protection (generic error)
      const alert = page.getByRole('alert');
      await expect(alert).toBeVisible();
      await expect(alert).toContainText(/invalid.*credentials|invalid.*email.*password/i);
    });
  });

  // 2. Full Login & Session Persistence Lifecycle
  test.describe('Authenticated User Lifecycle', () => {

    test('TC-AUTH-03: successful login authenticates user and lands on dashboard', async ({ page }) => {
      await page.goto('/login');

      // Fill valid credentials securely
      await page.getByLabel(/email/i).fill(TEST_CREDENTIALS.validUser.email);
      await page.getByLabel(/password/i).fill(TEST_CREDENTIALS.validUser.password);
      await page.getByRole('button', { name: /sign in|log in/i }).click();

      // Assert successful entry to dashboard
      await expect(page).toHaveURL(/.*app|.*dashboard/);
      await expect(page.getByRole('heading', { name: /my enrolled courses|welcome/i })).toBeVisible();
    });

    test('TC-AUTH-04: session persists across page reloads', async ({ page }) => {
      // Login first
      await page.goto('/login');
      await page.getByLabel(/email/i).fill(TEST_CREDENTIALS.validUser.email);
      await page.getByLabel(/password/i).fill(TEST_CREDENTIALS.validUser.password);
      await page.getByRole('button', { name: /sign in|log in/i }).click();

      await expect(page).toHaveURL(/.*app|.*dashboard/);

      // Act: Reload the page
      await page.reload();

      // Assert: User is STILL logged in without needing to re-enter credentials
      await expect(page).toHaveURL(/.*app|.*dashboard/);
      await expect(page.getByRole('heading', { name: /my enrolled courses|welcome/i })).toBeVisible();
    });

    test('TC-AUTH-05: logout invalidates session and clears protected access', async ({ page }) => {
      await page.goto('/login');
      await page.getByLabel(/email/i).fill(TEST_CREDENTIALS.validUser.email);
      await page.getByLabel(/password/i).fill(TEST_CREDENTIALS.validUser.password);
      await page.getByRole('button', { name: /sign in|log in/i }).click();

      await expect(page).toHaveURL(/.*app|.*dashboard/);

      // Act: Perform logout action
      const signOutButton = page.getByRole('button', { name: /sign out|log out/i });
      await signOutButton.click();

      // Assert: Redirected to login or landing page
      await expect(page).toHaveURL(/.*login|.*$/);

      // Act: Try navigating back to /app
      await page.goto('/app');

      // Assert: Access is denied and re-redirected to /login
      await expect(page).toHaveURL(/.*login/);
    });

  });

});

// 3. Playwright storageState Setup Blueprint for playwright.config.js:
const storageStateSetupBlueprint = {
  // Save state after login in auth.setup.js:
  // await page.context().storageState({ path: 'playwright/.auth/student.json' });

  // Use in playwright.config.js:
  projects: [
    { name: 'setup', testMatch: /.*\\.setup\\.js/ },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        storageState: 'playwright/.auth/student.json',
      },
    },
  ],
};
`;

export const PLAYWRIGHT_DAY_11_STARTER_EXPLANATION = `Authentication Architecture & Test Design:
1. Route Guarding Verification: Tested that guests accessing /app are intercepted and redirected to /login.
2. User Enumeration Protection: Verified that failed logins return generic credentials error messages.
3. Test Isolation (test.use): Overrode global storageState with { cookies: [], origins: [] } for unauthenticated tests to ensure zero credential leakage.
4. Session Persistence: Tested that active sessions survive page.reload() without kicking the user out.
5. Logout & Invalidation: Tested that clicking Sign Out destroys the session and subsequent direct visits to /app are blocked.
6. Environment Variable Security: Used process.env for credentials with safe local defaults.
7. storageState Architecture: Outlined auth setup project dependencies in playwright.config.js with gitignored session paths.`;

export const PLAYWRIGHT_DAY_11_STARTER_OUTPUT = `Running 5 tests using 3 workers
  ✓ [chromium] › authentication_and_session_suite.spec.js:25:5 › TC-AUTH-01: unauthenticated user navigating to /app is redirected to /login (520ms)
  ✓ [chromium] › authentication_and_session_suite.spec.js:35:5 › TC-AUTH-02: invalid credentials display secure generic error message (480ms)
  ✓ [chromium] › authentication_and_session_suite.spec.js:47:5 › TC-AUTH-03: successful login authenticates user and lands on dashboard (810ms)
  ✓ [chromium] › authentication_and_session_suite.spec.js:58:5 › TC-AUTH-04: session persists across page reloads (760ms)
  ✓ [chromium] › authentication_and_session_suite.spec.js:73:5 › TC-AUTH-05: logout invalidates session and clears protected access (890ms)

  5 passed (2.4s)`;

export function evaluateDay11Assignment(
  code: string,
  _expectedOutput: string,
  explanation: string
): PlaywrightDay11AssignmentRubric {
  const criteria: PlaywrightDay11AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Implements storageState understanding
  const implementsStorageState =
    /storageState/i.test(code) ||
    /storageState/i.test(explanation);
  criteria.push({
    id: 'crit-1',
    title: 'storageState Session Architecture',
    passed: implementsStorageState,
    feedback: implementsStorageState
      ? 'Incorporated storageState for session caching and isolation.'
      : 'Include storageState configuration in code or explanation.',
  });
  if (implementsStorageState) score += 1;

  // 2. Tests successful login
  const testsSuccessfulLogin =
    /successful login|valid.*login/i.test(code) &&
    /getByLabel\(.*password/i.test(code);
  criteria.push({
    id: 'crit-2',
    title: 'Successful Authentication Happy Path',
    passed: testsSuccessfulLogin,
    feedback: testsSuccessfulLogin
      ? 'Tested complete valid login flow with credentials.'
      : 'Include a test verifying successful user login.',
  });
  if (testsSuccessfulLogin) score += 1;

  // 3. Tests invalid credentials
  const testsInvalidCredentials =
    /invalid.*credentials|wrong.*password/i.test(code);
  criteria.push({
    id: 'crit-3',
    title: 'Negative Authentication Validation',
    passed: testsInvalidCredentials,
    feedback: testsInvalidCredentials
      ? 'Tested invalid credentials and verified error message.'
      : 'Include a test scenario with invalid credentials.',
  });
  if (testsInvalidCredentials) score += 1;

  // 4. Tests protected routes
  const testsProtectedRoutes =
    /goto\(.*\/app|goto\(.*\/dashboard/i.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'Protected Route Access Verification',
    passed: testsProtectedRoutes,
    feedback: testsProtectedRoutes
      ? 'Tested access to protected routes like /app or /dashboard.'
      : 'Include a test navigating directly to a protected route.',
  });
  if (testsProtectedRoutes) score += 1;

  // 5. Tests unauthorized redirect
  const testsUnauthorizedRedirect =
    /toHaveURL\(.*login/i.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'Unauthorized Redirection Guard',
    passed: testsUnauthorizedRedirect,
    feedback: testsUnauthorizedRedirect
      ? 'Verified unauthorized requests redirect to /login.'
      : 'Assert toHaveURL(/login/) when visiting protected pages without auth.',
  });
  if (testsUnauthorizedRedirect) score += 1;

  // 6. Tests logout flow
  const testsLogoutFlow =
    /sign out|log out/i.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Logout & Session Destruction',
    passed: testsLogoutFlow,
    feedback: testsLogoutFlow
      ? 'Tested user sign out and session invalidation.'
      : 'Include a test verifying the logout workflow.',
  });
  if (testsLogoutFlow) score += 1;

  // 7. Ensures test isolation
  const ensuresTestIsolation =
    /test\.use\(\s*\{\s*storageState/i.test(code) ||
    /clearCookies\(\)/.test(code);
  criteria.push({
    id: 'crit-7',
    title: 'Test Isolation (Clean Contexts)',
    passed: ensuresTestIsolation,
    feedback: ensuresTestIsolation
      ? 'Enforced clean context isolation using test.use or clearCookies.'
      : 'Use test.use({ storageState: ... }) to enforce unauthenticated state.',
  });
  if (ensuresTestIsolation) score += 1;

  // 8. Uses environment variables
  const usesEnvironmentVariables =
    /process\.env/i.test(code) ||
    /process\.env/i.test(explanation);
  criteria.push({
    id: 'crit-8',
    title: 'Environment Variables (process.env)',
    passed: usesEnvironmentVariables,
    feedback: usesEnvironmentVariables
      ? 'Loaded credentials safely via process.env.'
      : 'Reference process.env for credential loading.',
  });
  if (usesEnvironmentVariables) score += 1;

  // 9. Avoids hardcoded passwords
  const avoidsHardcodedPasswords =
    !/password:\s*['"](?!Valid|RootAccess|Wrong|Dummy)[^'"]{6,}['"]/i.test(code);
  criteria.push({
    id: 'crit-9',
    title: 'Credential Hygiene & Security',
    passed: avoidsHardcodedPasswords,
    feedback: avoidsHardcodedPasswords
      ? 'Protected real credentials from source code exposure.'
      : 'Avoid embedding real production passwords in test code.',
  });
  if (avoidsHardcodedPasswords) score += 1;

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
      : 'Ensure test code contains valid JavaScript syntax.',
  });
  if (syntacticallyValidJavaScript) score += 1;

  const passed = score >= 8;
  const feedback = criteria.map((c) => `${c.passed ? '✓' : '✗'} ${c.title}: ${c.feedback}`);

  return {
    score,
    feedback,
    passed,
    criteria,
    implementsStorageState,
    testsSuccessfulLogin,
    testsInvalidCredentials,
    testsProtectedRoutes,
    testsUnauthorizedRedirect,
    testsLogoutFlow,
    ensuresTestIsolation,
    usesEnvironmentVariables,
    avoidsHardcodedPasswords,
    syntacticallyValidJavaScript,
  };
}
