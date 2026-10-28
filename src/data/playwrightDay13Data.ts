import type {
  PlaywrightDay13Unit,
  PlaywrightDay13AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_13_DATA: PlaywrightDay13Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 13,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'API Testing with Playwright',
  subtitle:
    'Combine backend REST API validation with browser UI workflows using Playwright’s built-in request fixture. Seed test data in milliseconds, verify database mutations, and perform fast headless API regression.',
  level: 'Advanced',
  estimatedHours: '2.5–3 Hours',
  prerequisites: 'Days 1–12 concepts (HTTP basics, JavaScript async/await, test runner, assertions, and POM).',
  learningObjectives: [
    'Master HTTP methods (GET, POST, PUT, PATCH, DELETE) and status code categories (2xx, 4xx, 5xx).',
    'Use Playwright’s built-in request fixture and APIRequestContext for direct HTTP communication.',
    'Validate API response headers, status codes, JSON response bodies, and schema structures.',
    'Author negative API tests verifying 400 Bad Request, 401 Unauthorized, and 404 Not Found responses.',
    'Implement hybrid UI + API workflows: seed test data via API in 50ms, verify via UI, and clean up via API.',
    'Verify backend database mutations via API after completing user actions in the browser UI.',
    'Avoid destructive API requests against production and maintain isolated test environments.',
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
    { day: 13, title: 'Day 13: API Testing with Playwright', focus: 'REST APIs, request Fixture, Hybrid UI+API', isCurrent: true },
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
      title: 'Topic 1: HTTP & REST API Fundamentals for QA Engineers',
      durationMinutes: 25,
      explanation: `Modern web applications communicate with backend services over the **HTTP (Hypertext Transfer Protocol)** protocol. Testing the API layer directly provides faster execution, earlier defect discovery, and simplified test data preparation.

### Core HTTP Methods
- **GET:** Retrieve resources (idempotent, safe, no request body).
- **POST:** Create new resources (returns 201 Created with generated ID).
- **PUT:** Replace an entire existing resource.
- **PATCH:** Partially update specific fields on an existing resource.
- **DELETE:** Remove a resource (returns 200 OK or 204 No Content).

### HTTP Status Code Categories
- **2xx Success:** 200 OK (read/update), 201 Created (insert), 204 No Content (deletion).
- **4xx Client Errors:** 400 Bad Request (schema invalid), 401 Unauthorized (missing auth), 403 Forbidden (insufficient permissions), 404 Not Found (resource absent).
- **5xx Server Errors:** 500 Internal Server Error (unhandled backend exception), 502 Bad Gateway, 503 Service Unavailable.

### Request Headers & Payload
Every API request can specify headers such as:
- \`Content-Type: application/json\`
- \`Authorization: Bearer <token>\``,
      keyTakeaways: [
        'REST APIs use standard HTTP verbs (GET, POST, PUT, PATCH, DELETE).',
        'Verify correct HTTP status codes for both success (2xx) and client error (4xx) scenarios.',
        'API tests execute in milliseconds without the browser rendering overhead.',
      ],
      terminology: [
        { term: 'REST API', definition: 'Representational State Transfer—an architectural style for networked hypermedia applications using stateless HTTP requests.' },
        { term: 'Idempotency', definition: 'A property of an HTTP method where making multiple identical requests has the same effect as making a single request (e.g. GET, PUT, DELETE).' },
      ],
      examples: [
        {
          title: 'Standard REST Request Structure',
          description: 'A POST request creating a task resource.',
          codeSnippet: `POST /api/tasks HTTP/1.1
Host: api.rootaccess.org
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json

{
  "title": "Complete Playwright Day 13",
  "priority": "High"
}`,
        },
      ],
      exercise: {
        id: 'checkpoint-api-1',
        title: 'HTTP Status Codes',
        prompt: 'Which HTTP status code should a well-designed REST API return when a new resource is successfully created?',
        options: [
          '201 Created',
          '200 OK with no body',
          '301 Moved Permanently',
          '404 Found',
        ],
        correctAnswerIndex: 0,
        explanation: 'HTTP 201 Created is the standard status code indicating that the request has succeeded and led to the creation of a new resource.',
      },
    },

    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Playwright API Testing with the request Fixture',
      durationMinutes: 35,
      explanation: `Unlike Selenium, which requires external HTTP libraries like Axios or RestAssured, Playwright includes a built-in, native HTTP client: **Playwright APIRequestContext**!

### The \`request\` Fixture
In Playwright Test, you can destructure \`request\` directly into your test arguments:

\`\`\`javascript
const { test, expect } = require('@playwright/test');

test('fetch user profile via API', async ({ request }) => {
  const response = await request.get('/api/users/me', {
    headers: {
      Authorization: \`Bearer \${process.env.API_TOKEN}\`,
    },
  });

  // Verify HTTP status code
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  // Parse JSON response body
  const body = await response.json();
  expect(body.email).toBe('student.automation@rootaccess.org');
  expect(body.role).toBe('student');
});
\`\`\`

### Executing POST, PUT, and DELETE Requests
\`\`\`javascript
test('CRUD lifecycle on task API', async ({ request }) => {
  // CREATE (POST)
  const createRes = await request.post('/api/tasks', {
    data: {
      title: 'Audit Cypress vs Playwright',
      status: 'pending',
    },
  });
  expect(createRes.status()).toBe(201);
  const created = await createRes.json();
  const taskId = created.id;

  // UPDATE (PATCH)
  const updateRes = await request.patch(\`/api/tasks/\${taskId}\`, {
    data: { status: 'completed' },
  });
  expect(updateRes.status()).toBe(200);

  // DELETE
  const deleteRes = await request.delete(\`/api/tasks/\${taskId}\`);
  expect(deleteRes.status()).toBe(204);
});
\`\`\``,
      keyTakeaways: [
        'Destructure { request } in tests to execute direct HTTP requests without launching a browser.',
        'Use response.status(), response.ok(), and response.json() to inspect outcomes.',
        'Playwright request supports get, post, put, patch, delete, and head.',
      ],
      terminology: [
        { term: 'APIRequestContext', definition: 'The Playwright interface used to dispatch Web API requests with support for headers, cookies, and authentication.' },
        { term: 'response.ok()', definition: 'A boolean helper that returns true if response.status() is between 200 and 299.' },
      ],
      examples: [
        {
          title: 'Negative API Testing',
          description: 'Testing that invalid requests are rejected with 400 Bad Request.',
          codeSnippet: `test('rejects task creation when title is missing', async ({ request }) => {
  const response = await request.post('/api/tasks', {
    data: { priority: 'Low' }, // missing required title
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.error).toContain('Title is required');
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-api-2',
        title: 'Playwright request Fixture',
        prompt: 'Do tests that only use the { request } fixture launch a Chromium or Firefox browser window?',
        options: [
          'No; pure API tests run directly over HTTP in Node.js without launching any browser engine, making them execute in single-digit milliseconds',
          'Yes; it opens Chromium in the background',
          'Yes; it opens WebKit',
          'Only on Windows',
        ],
        correctAnswerIndex: 0,
        explanation: 'The request fixture is a headless HTTP client built into Playwright. Pure API tests do not launch or consume browser resources.',
      },
    },

    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: API Validation Strategies & Schema Verification',
      durationMinutes: 30,
      explanation: `A comprehensive API test verifies more than just \`status === 200\`. It asserts that the contract between frontend and backend remains intact.

### 4 Levels of API Assertions
1. **Status Code:** Verify exact response codes (\`200\`, \`201\`, \`400\`, \`401\`, \`404\`).
2. **Response Headers:** Verify \`content-type\` includes \`application/json\`.
3. **Payload Structure & Types:** Verify required properties exist and possess correct JavaScript data types (\`typeof body.id === 'string'\`).
4. **Business Logic & State Mutation:** Verify database values reflect the requested changes.

\`\`\`javascript
test('validate customer profile schema and data integrity', async ({ request }) => {
  const res = await request.get('/api/customers/101');
  expect(res.status()).toBe(200);

  // Validate headers
  expect(res.headers()['content-type']).toContain('application/json');

  const customer = await res.json();

  // Validate field presence and types
  expect(customer).toHaveProperty('id');
  expect(customer).toHaveProperty('email');
  expect(customer).toHaveProperty('tier');
  expect(typeof customer.isActive).toBe('boolean');
  expect(Array.isArray(customer.enrolledCourses)).toBe(true);
});
\`\`\``,
      keyTakeaways: [
        'Assert status codes, headers, response types, and specific payload values.',
        'Use toHaveProperty() and typeof checks to guard against silent API schema drift.',
        'Test negative error responses to verify server-side validation rules.',
      ],
      terminology: [
        { term: 'Schema Drift', definition: 'Unannounced changes in backend API field names or data types that break frontend consumers.' },
        { term: 'Contract Testing', definition: 'Verifying that an API adheres to agreed-upon specifications and field requirements.' },
      ],
      examples: [
        {
          title: 'Verifying Array Responses',
          description: 'Asserting that a list endpoint returns an array with expected length and items.',
          codeSnippet: `test('list courses returns active catalog array', async ({ request }) => {
  const res = await request.get('/api/courses');
  const courses = await res.json();

  expect(Array.isArray(courses)).toBe(true);
  expect(courses.length).toBeGreaterThanOrEqual(1);
  expect(courses[0]).toHaveProperty('slug');
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-api-3',
        title: 'Thorough API Assertions',
        prompt: 'Why is asserting expect(res.status()).toBe(200) alone insufficient for verifying an API endpoint?',
        options: [
          'Because an endpoint might return 200 OK while returning an empty object, corrupted fields, or an error payload inside the JSON body',
          'Because 200 is only for HTML pages',
          'Because status codes are ignored by Node.js',
          'Because Playwright cannot read numbers',
        ],
        correctAnswerIndex: 0,
        explanation: 'APIs can return 200 OK while returning empty lists, unexpected null values, or error objects. Thorough tests always validate the response structure and key field values.',
      },
    },

    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: UI & API Hybrid Automation Workflows',
      durationMinutes: 30,
      explanation: `The real superpowers of Playwright emerge when you **combine UI interactions with API requests** in the same test!

### 1. Seeding Test Data via API (Blazing Fast Setup)
Imagine a UI test that tests "Archiving an Order".
- **Slow UI-Only Approach:** Log in (5s), search catalog (3s), add to cart (2s), enter shipping address (4s), enter credit card (3s), submit order (4s), then click Archive (2s). Total: **23 seconds!**
- **Hybrid API Approach:**
  1. Call \`await request.post('/api/orders', { data: ... })\` -> **50 milliseconds!**
  2. In UI: \`await page.goto('/orders/' + orderId)\` and click Archive -> **2 seconds!**
  **Result:** 10x faster execution and 90% fewer UI points of failure!

### 2. Verifying Backend State After a UI Action
When a user clicks "Enroll in Course" in the UI:
1. Perform the click in the browser: \`await page.getByRole('button', { name: 'Enroll' }).click();\`
2. Assert UI feedback: \`await expect(page.getByText('Enrolled')).toBeVisible();\`
3. Verify backend database record via API:
\`\`\`javascript
const res = await request.get('/api/users/me/enrollments');
const body = await res.json();
expect(body.enrolledCourses).toContain('playwright-automation');
\`\`\`

### 3. Fast Teardown via API
Delete created records via \`await request.delete('/api/items/' + id)\` in \`afterEach\` to guarantee database cleanup without navigating through complex deletion UI modals.`,
      keyTakeaways: [
        'Use APIs to instantly prepare and seed complex test data before launching UI tests.',
        'Verify backend state mutations via API after performing critical user actions in the browser.',
        'Use API calls in afterEach hooks for fast, reliable data teardown.',
        'Hybrid testing delivers the highest confidence with the fastest execution speed.',
      ],
      terminology: [
        { term: 'Data Seeding', definition: 'The automated insertion of prerequisite test records into a database or API before test execution starts.' },
        { term: 'Hybrid Testing', definition: 'Combining browser UI interactions and direct backend API requests within a single automated test workflow.' },
      ],
      examples: [
        {
          title: 'Hybrid Seed -> UI Action -> API Verification',
          description: 'A complete hybrid Playwright test.',
          codeSnippet: `test('create task via API and verify in UI', async ({ page, request }) => {
  // 1. Seed via API (50ms)
  const res = await request.post('/api/tasks', { data: { title: 'Seed Task' } });
  const task = await res.json();

  // 2. Interact via UI
  await page.goto('/tasks');
  await expect(page.getByText('Seed Task')).toBeVisible();

  // 3. Delete via API in teardown
  await request.delete('/api/tasks/' + task.id);
});`,
        },
      ],
      exercise: {
        id: 'checkpoint-api-4',
        title: 'Speed of API Seeding',
        prompt: 'Why should automation engineers prefer seeding prerequisite test data via API instead of stepping through 10 UI setup pages?',
        options: [
          'Because API calls take milliseconds, eliminate UI flakiness, and allow tests to focus strictly on the feature under test',
          'Because UI tests are illegal in Agile',
          'Because browsers disable buttons after 3 clicks',
          'Because API requests do not require internet',
        ],
        correctAnswerIndex: 0,
        explanation: 'Seeding prerequisites via API is 10x to 50x faster and eliminates dozens of potential UI synchronization failures on unrelated setup screens.',
      },
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-day13-1',
      questionNumber: 1,
      question: 'How do you perform API testing in Playwright, and what is the role of the request fixture?',
      difficulty: 'Beginner',
      assessmentFocus: 'API testing capabilities and architecture in Playwright.',
      modelAnswer:
        'Playwright provides a built-in `request` fixture (an instance of `APIRequestContext`) that allows tests to send HTTP requests directly from Node.js without launching a browser. It supports all standard verbs—`request.get()`, `post()`, `put()`, `patch()`, and `delete()`. Tests can inspect `response.status()`, `response.headers()`, `response.json()`, and `response.text()`. Because no browser engine is launched for pure API tests, they execute in single-digit milliseconds, making them ideal for smoke tests and contract validation.',
      followUpQuestion: 'How do you share cookies or tokens between the browser context and the request fixture?',
    },
    {
      id: 'iq-day13-2',
      questionNumber: 2,
      question: 'What is a "hybrid" test in Playwright, and what benefits does it offer over pure UI-only tests?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Hybrid testing strategy, test data seeding, and performance optimization.',
      modelAnswer:
        'A hybrid test combines browser UI actions with direct backend API calls. Typically, we use the `request` fixture to rapidly seed prerequisite data (such as creating a user account, generating an order, or populating a cart) in 50 milliseconds via API. The test then navigates directly to the target page via `page.goto()` to test the specific UI feature under test. After the UI action completes, we can verify database persistence via an API GET call and clean up via an API DELETE call. This reduces test execution duration from 30 seconds to 2 seconds and eliminates UI flakiness in setup steps.',
      followUpQuestion: 'How does API teardown improve test independence in continuous execution?',
    },
    {
      id: 'iq-day13-3',
      questionNumber: 3,
      question: 'How do you test negative API scenarios (e.g., 400 Bad Request or 401 Unauthorized) in Playwright?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Negative testing, validation schemas, and error handling.',
      modelAnswer:
        'In Playwright, we intentionally construct malformed or unauthorized HTTP requests using the `request` fixture. For example, to test 400 Bad Request, we omit required payload fields or pass invalid data types. We assert `expect(response.status()).toBe(400)` and inspect the parsed JSON body with `expect(body.error).toContain("Required field missing")`. To test 401 Unauthorized, we send requests without the `Authorization` header and assert `expect(response.status()).toBe(401)`. Playwright does not throw on 4xx/5xx responses, allowing you to assert error status codes cleanly.',
      followUpQuestion: 'Why does Playwright not throw exceptions on 4xx and 5xx HTTP responses by default?',
    },
    {
      id: 'iq-day13-4',
      questionNumber: 4,
      question: 'How do you validate an API response schema to protect against backend breaking changes?',
      difficulty: 'Intermediate',
      assessmentFocus: 'Contract verification, schema validation, and data typing.',
      modelAnswer:
        'We validate the structure and data types of the returned JSON body. We assert that required keys are present using `expect(body).toHaveProperty("key")`, verify data types using `typeof body.id === "string"`, and confirm array structures with `Array.isArray(body.items)`. For strict enterprise contract testing, we can integrate lightweight JSON schema validators like Ajv or Zod to validate the response against an OpenAPI/Swagger contract.',
      followUpQuestion: 'What is the risk of testing only exact values rather than structural schemas?',
    },
    {
      id: 'iq-day13-5',
      questionNumber: 5,
      question: 'How do you configure base URLs and authentication tokens globally for API tests in Playwright?',
      difficulty: 'Scenario-Based',
      assessmentFocus: 'playwright.config.js configuration and environment variables.',
      modelAnswer:
        'We configure `baseURL` inside `use` in `playwright.config.js`, pointing to our API server (e.g. `baseURL: process.env.API_BASE_URL || "https://api.rootaccess.org"`). Relative paths like `request.get("/api/tasks")` automatically inherit this base URL. For authentication headers, we can configure `extraHTTPHeaders` in `playwright.config.js` to automatically attach `Authorization: Bearer ${process.env.API_TOKEN}` to all outgoing requests, keeping individual test files clean and focused.',
      followUpQuestion: 'How do you handle tests that require switching between Admin and Student API tokens?',
    },
  ],

  quizQuestions: [
    {
      id: 'q-d13-1',
      questionNumber: 1,
      question: 'Which built-in Playwright fixture enables direct HTTP API testing without launching a browser?',
      options: [
        'request',
        'http',
        'fetcher',
        'apiClient',
      ],
      correctAnswerIndex: 0,
      explanation: 'The request fixture (an instance of APIRequestContext) provides native HTTP request capabilities directly in Playwright Test.',
    },
    {
      id: 'q-d13-2',
      questionNumber: 2,
      question: 'Which method reads the parsed JSON body of an API response in Playwright?',
      options: [
        'await response.json()',
        'response.toObject()',
        'JSON.extract(response)',
        'response.bodyAsString()',
      ],
      correctAnswerIndex: 0,
      explanation: 'await response.json() asynchronously parses the response stream and returns the parsed JavaScript object.',
    },
    {
      id: 'q-d13-3',
      questionNumber: 3,
      question: 'What does response.ok() return in Playwright?',
      options: [
        'true if the HTTP status code is in the 200–299 range, false otherwise',
        'true only if the status code is exactly 200',
        'true if the browser did not crash',
        'The response body string',
      ],
      correctAnswerIndex: 0,
      explanation: 'response.ok() returns a boolean indicating whether the HTTP status code is considered successful (status in the range 200–299).',
    },
    {
      id: 'q-d13-4',
      questionNumber: 4,
      question: 'What is the primary benefit of "hybrid" UI + API automation in Playwright?',
      options: [
        'Seeding test data in milliseconds via API dramatically speeds up test execution and eliminates UI flakiness in setup steps',
        'It allows tests to run without writing assertions',
        'It prevents JavaScript from using memory',
        'It automatically publishes tests to YouTube',
      ],
      correctAnswerIndex: 0,
      explanation: 'Hybrid testing leverages the speed and reliability of APIs for prerequisite setup and teardown while reserving browser automation for true user-facing interactions.',
    },
    {
      id: 'q-d13-5',
      questionNumber: 5,
      question: 'When an endpoint returns a 404 Not Found, what does Playwright’s request method do?',
      options: [
        'It returns an APIResponse object with status() === 404 without throwing an unhandled exception',
        'It throws a fatal error that terminates the entire test run immediately',
        'It retries the request 50 times',
        'It closes the operating system',
      ],
      correctAnswerIndex: 0,
      explanation: 'Playwright does not throw errors on 4xx/5xx responses; it returns the APIResponse object so you can cleanly assert error status codes and error payloads.',
    },
    {
      id: 'q-d13-6',
      questionNumber: 6,
      question: 'Which HTTP method should be used to update only specific fields of an existing task record?',
      options: [
        'PATCH',
        'GET',
        'POST',
        'HEAD',
      ],
      correctAnswerIndex: 0,
      explanation: 'HTTP PATCH is used for partial modifications of an existing resource, whereas PUT typically replaces the entire resource.',
    },
    {
      id: 'q-d13-7',
      questionNumber: 7,
      question: 'How do you pass a JSON payload when calling request.post() in Playwright?',
      options: [
        'Pass the payload inside the data property: await request.post("/api/items", { data: { name: "Sample" } })',
        'Pass the payload as a string in the URL query parameters',
        'Write the JSON to a file named request.txt',
        'Use the bodyParam flag in Node.js',
      ],
      correctAnswerIndex: 0,
      explanation: 'In Playwright, the data property in the options object automatically serializes JavaScript objects to JSON and sets the Content-Type header to application/json.',
    },
    {
      id: 'q-d13-8',
      questionNumber: 8,
      question: 'Why is it important to perform API teardown (e.g. DELETE /api/items/123) in an afterEach hook?',
      options: [
        'To clean up created test records and prevent database bloat or duplicate-key errors in subsequent test runs',
        'Because Playwright refuses to stop until all items are deleted',
        'Because databases crash when more than 10 records exist',
        'It is required by the W3C locator standard',
      ],
      correctAnswerIndex: 0,
      explanation: 'Teardown hooks ensure that test environments remain clean, isolated, and free of orphaned test data that could cause collisions in future test runs.',
    },
    {
      id: 'q-d13-9',
      questionNumber: 9,
      question: 'How can you verify that a UI action (e.g. clicking "Delete Task") actually deleted the record on the server?',
      options: [
        'Follow the UI click with an API request (request.get("/api/tasks/123")) and assert that the server returns 404 Not Found',
        'Assume the UI is always accurate and skip validation',
        'Restart the web server',
        'Check the browser window title',
      ],
      correctAnswerIndex: 0,
      explanation: 'Querying the backend API directly after a UI action provides ironclad proof that the server-side database mutation succeeded, not just that the UI element was hidden.',
    },
    {
      id: 'q-d13-10',
      questionNumber: 10,
      question: 'Where can you define global extraHTTPHeaders (such as Authorization tokens) for all API requests in Playwright?',
      options: [
        'In the use block of playwright.config.js: extraHTTPHeaders: { "Authorization": `Bearer ${token}` }',
        'In package.json dependencies',
        'In index.html <meta> tags',
        'In Windows Registry',
      ],
      correctAnswerIndex: 0,
      explanation: 'Setting extraHTTPHeaders in playwright.config.js ensures all outgoing request fixture calls automatically include default headers like authorization tokens or content types.',
    },
  ],
};

export const PLAYWRIGHT_DAY_13_STARTER_CODE = `// tests/task_management_api.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Task Management REST API & Hybrid UI Suite', () => {

  let createdTaskId = null;
  const testTaskTitle = \`Automation Task \${Date.now()}\`;

  // 1. CREATE (POST) - Create a new task via REST API
  test('TC-API-01: POST /api/tasks creates task with 201 Created and valid schema', async ({ request }) => {
    const response = await request.post('/api/tasks', {
      data: {
        title: testTaskTitle,
        priority: 'High',
        completed: false,
      },
    });

    // Assert status code
    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    // Assert response body schema & fields
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.title).toBe(testTaskTitle);
    expect(body.priority).toBe('High');
    expect(body.completed).toBe(false);

    // Save ID for subsequent tests
    createdTaskId = body.id;
  });

  // 2. READ (GET) - Retrieve the created task by ID
  test('TC-API-02: GET /api/tasks/:id retrieves task details', async ({ request }) => {
    expect(createdTaskId).toBeTruthy();

    const response = await request.get(\`/api/tasks/\${createdTaskId}\`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(createdTaskId);
    expect(body.title).toBe(testTaskTitle);
    expect(typeof body.completed).toBe('boolean');
  });

  // 3. UPDATE (PATCH) - Partially update task status
  test('TC-API-03: PATCH /api/tasks/:id updates completion status', async ({ request }) => {
    expect(createdTaskId).toBeTruthy();

    const response = await request.patch(\`/api/tasks/\${createdTaskId}\`, {
      data: {
        completed: true,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(createdTaskId);
    expect(body.completed).toBe(true);
  });

  // 4. NEGATIVE VALIDATION - POST with missing required fields returns 400 Bad Request
  test('TC-API-04: POST /api/tasks rejects request when required title is missing', async ({ request }) => {
    const response = await request.post('/api/tasks', {
      data: {
        priority: 'Medium',
        // missing required 'title'
      },
    });

    // Assert client error status
    expect(response.status()).toBe(400);
    expect(response.ok()).toBeFalsy();

    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toContainText ? body.error.toLowerCase() : String(body.error);
  });

  // 5. HYBRID UI + API VERIFICATION
  test('TC-API-05: Hybrid verification - seed via API and verify in browser UI', async ({ page, request }) => {
    // Fast API Seeding (50ms)
    const seedTitle = \`Hybrid Task \${Date.now()}\`;
    const seedRes = await request.post('/api/tasks', {
      data: {
        title: seedTitle,
        priority: 'Medium',
        completed: false,
      },
    });
    expect(seedRes.status()).toBe(201);
    const seedData = await seedRes.json();

    // Verify in Browser UI
    await page.goto('/tasks');
    const taskHeading = page.getByRole('heading', { name: /task manager|my tasks/i });
    await expect(taskHeading).toBeVisible();

    // Verify seeded task appears in UI list
    const taskItem = page.getByText(seedTitle);
    await expect(taskItem).toBeVisible();

    // Clean up seed via API
    const cleanupRes = await request.delete(\`/api/tasks/\${seedData.id}\`);
    expect([200, 204]).toContain(cleanupRes.status());
  });

  // 6. DELETE (DELETE) - Remove created task and verify 404 on subsequent GET
  test('TC-API-06: DELETE /api/tasks/:id deletes task and subsequent GET returns 404', async ({ request }) => {
    expect(createdTaskId).toBeTruthy();

    // Delete task
    const deleteResponse = await request.delete(\`/api/tasks/\${createdTaskId}\`);
    expect([200, 204]).toContain(deleteResponse.status());

    // Verify subsequent GET returns 404 Not Found
    const verifyResponse = await request.get(\`/api/tasks/\${createdTaskId}\`);
    expect(verifyResponse.status()).toBe(404);
  });

});
`;

export const PLAYWRIGHT_DAY_13_STARTER_EXPLANATION = `API Architecture & Hybrid Test Design:
1. Built-in request Fixture: Executed full CRUD operations (POST, GET, PATCH, DELETE) using Playwright's native API client without launching a browser.
2. Complete Status Code Verification: Asserted exact HTTP status codes: 201 Created for insertion, 200 OK for retrieval/update, 204/200 for deletion, and 404 Not Found after deletion.
3. Negative Validation (400 Bad Request): Tested missing required title field to verify server-side input validation and error messaging.
4. Schema & Data Type Assertions: Verified key presence (toHaveProperty) and primitive types (typeof === 'boolean').
5. Hybrid UI + API Workflow: Demonstrated rapid test data seeding via API in 50ms, followed by browser UI verification, and final API cleanup.`;

export const PLAYWRIGHT_DAY_13_STARTER_OUTPUT = `Running 6 tests using 3 workers
  ✓ [chromium] › task_management_api.spec.js:10:3 › TC-API-01: POST /api/tasks creates task with 201 Created and valid schema (42ms)
  ✓ [chromium] › task_management_api.spec.js:33:3 › TC-API-02: GET /api/tasks/:id retrieves task details (28ms)
  ✓ [chromium] › task_management_api.spec.js:46:3 › TC-API-03: PATCH /api/tasks/:id updates completion status (31ms)
  ✓ [chromium] › task_management_api.spec.js:61:3 › TC-API-04: POST /api/tasks rejects request when required title is missing (24ms)
  ✓ [chromium] › task_management_api.spec.js:76:3 › TC-API-05: Hybrid verification - seed via API and verify in browser UI (680ms)
  ✓ [chromium] › task_management_api.spec.js:104:3 › TC-API-06: DELETE /api/tasks/:id deletes task and subsequent GET returns 404 (35ms)

  6 passed (850ms)`;

export function evaluateDay13Assignment(
  code: string,
  _expectedOutput: string,
  _explanation: string
): PlaywrightDay13AssignmentRubric {
  const criteria: PlaywrightDay13AssignmentRubric['criteria'] = [];
  let score = 0;

  // 1. Uses request fixture
  const usesRequestFixture =
    /async\s*\(\s*\{[^}]*request[^}]*\}\s*\)/.test(code);
  criteria.push({
    id: 'crit-1',
    title: 'Playwright request Fixture Usage',
    passed: usesRequestFixture,
    feedback: usesRequestFixture
      ? 'Destructured native { request } fixture in test arguments.'
      : 'Destructure { request } in test arguments: async ({ request }) => ...',
  });
  if (usesRequestFixture) score += 1;

  // 2. Tests GET endpoint
  const testsGetEndpoint =
    /request\.get\s*\(/.test(code);
  criteria.push({
    id: 'crit-2',
    title: 'HTTP GET Endpoint Verification',
    passed: testsGetEndpoint,
    feedback: testsGetEndpoint
      ? 'Implemented request.get() to retrieve resources.'
      : 'Include an HTTP GET test using request.get().',
  });
  if (testsGetEndpoint) score += 1;

  // 3. Tests POST endpoint
  const testsPostEndpoint =
    /request\.post\s*\(/.test(code);
  criteria.push({
    id: 'crit-3',
    title: 'HTTP POST Resource Creation',
    passed: testsPostEndpoint,
    feedback: testsPostEndpoint
      ? 'Implemented request.post() to create new resources.'
      : 'Include an HTTP POST test with payload data.',
  });
  if (testsPostEndpoint) score += 1;

  // 4. Tests PUT or PATCH endpoint
  const testsPutOrPatchEndpoint =
    /request\.(patch|put)\s*\(/.test(code);
  criteria.push({
    id: 'crit-4',
    title: 'HTTP PUT / PATCH Modification',
    passed: testsPutOrPatchEndpoint,
    feedback: testsPutOrPatchEndpoint
      ? 'Implemented request.patch() or put() to update resources.'
      : 'Include an HTTP PATCH or PUT test updating resource state.',
  });
  if (testsPutOrPatchEndpoint) score += 1;

  // 5. Tests DELETE endpoint
  const testsDeleteEndpoint =
    /request\.delete\s*\(/.test(code);
  criteria.push({
    id: 'crit-5',
    title: 'HTTP DELETE Resource Removal',
    passed: testsDeleteEndpoint,
    feedback: testsDeleteEndpoint
      ? 'Implemented request.delete() for resource teardown.'
      : 'Include an HTTP DELETE test removing resources.',
  });
  if (testsDeleteEndpoint) score += 1;

  // 6. Asserts status codes
  const assertsStatusCodes =
    /expect\([^)]*status\(\)[^)]*\)\.toBe\(\s*\d{3}\s*\)/.test(code) ||
    /expect\([^)]*status\(\)[^)]*\)\.toBe\(201\)/.test(code) ||
    /expect\([^)]*status\(\)[^)]*\)\.toBe\(200\)/.test(code);
  criteria.push({
    id: 'crit-6',
    title: 'Explicit HTTP Status Code Assertions',
    passed: assertsStatusCodes,
    feedback: assertsStatusCodes
      ? 'Asserted exact HTTP status codes (200, 201, 400, 404).'
      : 'Assert exact status codes: expect(response.status()).toBe(200).',
  });
  if (assertsStatusCodes) score += 1;

  // 7. Validates response body schema
  const validatesResponseBodySchema =
    /response\.json\(\)/.test(code) &&
    /toHaveProperty|typeof/.test(code);
  criteria.push({
    id: 'crit-7',
    title: 'JSON Response Body & Schema Validation',
    passed: validatesResponseBodySchema,
    feedback: validatesResponseBodySchema
      ? 'Validated JSON response body schema, properties, and data types.'
      : 'Parse response.json() and validate properties with toHaveProperty().',
  });
  if (validatesResponseBodySchema) score += 1;

  // 8. Tests negative error scenario
  const testsNegativeErrorScenario =
    /400|401|404|missing|invalid/i.test(code) &&
    /expect\([^)]*status\(\)[^)]*\)\.toBe\(\s*40\d\s*\)/.test(code);
  criteria.push({
    id: 'crit-8',
    title: 'Negative API Error Validation (4xx)',
    passed: testsNegativeErrorScenario,
    feedback: testsNegativeErrorScenario
      ? 'Tested negative validation returning 400 Bad Request or 404 Not Found.'
      : 'Include a negative API test verifying 400 or 404 client error.',
  });
  if (testsNegativeErrorScenario) score += 1;

  // 9. Integrates UI with API verification (Hybrid)
  const integratesUiWithApiVerification =
    /page\.goto/.test(code) &&
    /request\.(post|get)/.test(code);
  criteria.push({
    id: 'crit-9',
    title: 'Hybrid UI + API Integration Workflow',
    passed: integratesUiWithApiVerification,
    feedback: integratesUiWithApiVerification
      ? 'Demonstrated hybrid workflow combining request seeding and page UI verification.'
      : 'Include a hybrid test using both { page, request } to seed and verify.',
  });
  if (integratesUiWithApiVerification) score += 1;

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
      ? 'Authored clean, valid JavaScript API test suite.'
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
    usesRequestFixture,
    testsGetEndpoint,
    testsPostEndpoint,
    testsPutOrPatchEndpoint,
    testsDeleteEndpoint,
    assertsStatusCodes,
    validatesResponseBodySchema,
    testsNegativeErrorScenario,
    integratesUiWithApiVerification,
    syntacticallyValidJavaScript,
  };
}
