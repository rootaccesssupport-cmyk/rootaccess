/**
 * Complete 5-Day Practical API Testing Course Curriculum
 *
 * Course Title: API Testing with Postman — Beginner to Practical QA
 * Duration: 5 Days
 * Approach: Learn by Doing
 */

export interface ApiExercise {
  id: string;
  title: string;
  description: string;
  instruction: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  headers?: Record<string, string>;
  initialBody?: string;
  initialTestScript?: string;
  expectedStatus: number;
  validate: (response: { status: number; data: any; testResults: Array<{ name: string; passed: boolean }> }) => {
    success: boolean;
    feedback: string;
  };
  hints: string[];
}

export interface ApiDayTopic {
  title: string;
  summary: string;
  explanation: string;
  codeSnippet: {
    language: string;
    code: string;
  };
  takeaways: string[];
  interviewTip?: string;
}

export interface ApiQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ApiInterviewQuestion {
  id: string;
  question: string;
  concept: string;
  modelAnswer: string;
  seniorTip: string;
}

export interface ApiDayData {
  dayNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  objectives: string[];
  topics: ApiDayTopic[];
  exercises: ApiExercise[];
  interviewQuestions: ApiInterviewQuestion[];
  quiz: {
    passingScorePercent: number;
    questions: ApiQuizQuestion[];
  };
  summaryTakeaway: string;
}

export const API_COURSE_METADATA = {
  id: 'course-api-testing',
  slug: 'api-testing-postman',
  title: 'API Testing with Postman — Beginner to Practical QA',
  regularPrice: 599,
  launchPrice: 299,
  durationDays: 5,
  estimatedHours: 12,
  level: 'Beginner to Intermediate QA Engineers & Testers',
  description:
    'A comprehensive 5-day hands-on course teaching REST API principles, request construction, status code verification, authentication handling, automated Postman test scripting, and end-to-end e-commerce defect audits.',
};

export const API_DAYS_DATA: ApiDayData[] = [
  // ================= DAY 1 =================
  {
    dayNumber: 1,
    title: 'API Fundamentals and HTTP',
    subtitle: 'Client-server communications, REST architecture, HTTP methods, headers, parameters, and status codes',
    badge: 'Day 1 • HTTP & REST Basics',
    duration: '2.5 Hours',
    objectives: [
      'Understand Application Programming Interfaces (APIs) and the client-server architecture model',
      'Learn core REST principles, endpoints, and stateless resource representations',
      'Master the 5 core HTTP methods: GET, POST, PUT, PATCH, and DELETE',
      'Differentiate query parameters (?key=val) from path parameters (/resources/:id)',
      'Interpret HTTP status codes across the 2xx, 3xx, 4xx, and 5xx families',
      'Construct and send valid HTTP requests using the Postman interactive studio',
    ],
    topics: [
      {
        title: '1. What Are APIs & The Client-Server Model?',
        summary: 'How modern frontend applications communicate with backend microservices over HTTP.',
        explanation: `An **API (Application Programming Interface)** is a structured contract that allows two software systems to exchange data.
In modern web and mobile architecture:
• **Client (Frontend):** React app, iOS/Android mobile app, or browser.
• **Server (Backend):** Node.js, Python, or Java service backed by a database.
• **Transport Protocol:** Hypertext Transfer Protocol (HTTP/HTTPS).

When you tap "Checkout" on an e-commerce site, the client doesn't talk directly to the database. Instead, it sends an HTTP request to an API endpoint like \`POST /v1/orders\`. The API validates business rules, debits inventory, and returns a JSON response.`,
        codeSnippet: {
          language: 'http',
          code: `POST /v1/auth/login HTTP/1.1
Host: api.rootaccess.org
Content-Type: application/json
Accept: application/json

{
  "email": "student@rootaccess.org",
  "password": "RootAccess@2026"
}`,
        },
        takeaways: [
          'APIs decouple user interfaces from database implementations, allowing apps to scale independently.',
          'HTTP is stateless: each request must contain all necessary authentication headers and context.',
        ],
        interviewTip: 'When asked: "What is an API in simple terms?", describe it as a restaurant waiter: you (the client) give your order to the waiter (the API), who brings it to the kitchen (the server/database) and returns with your food (the JSON response).',
      },
      {
        title: '2. REST Architecture & HTTP Methods (GET, POST, PUT, PATCH, DELETE)',
        summary: 'Resource-oriented design principles and standard action verbs.',
        explanation: `**REST (Representational State Transfer)** treats every entity as a unique resource addressed by a Uniform Resource Identifier (URI).
The 5 standard HTTP Methods:
• **GET:** Retrieves a resource without modifying server state (Safe and Idempotent).
• **POST:** Creates a new subordinate resource. Usually returns \`201 Created\` with the new ID.
• **PUT:** Completely replaces an existing resource. (Idempotent).
• **PATCH:** Partially updates specific fields on an existing resource without altering unmentioned fields.
• **DELETE:** Removes the resource from the system. (Idempotent).`,
        codeSnippet: {
          language: 'javascript',
          code: `// RESTful Endpoint Design Conventions:
// GET    /v1/products         -> List products (with optional filtering)
// GET    /v1/products/101     -> Retrieve product #101
// POST   /v1/products         -> Create a brand new product
// PUT    /v1/products/101     -> Replace product #101 completely
// PATCH  /v1/products/101     -> Update just the price or stock of #101
// DELETE /v1/products/101     -> Remove product #101`,
        },
        takeaways: [
          'PUT replaces the entire entity; PATCH updates only the supplied properties.',
          'An operation is "Idempotent" if executing it multiple times produces the identical server state as executing it once.',
        ],
        interviewTip: 'PUT vs PATCH is the single most tested question in API QA interviews. Make sure you clearly state: PUT is full replacement; PATCH is partial modification.',
      },
      {
        title: '3. Anatomy of a Request: Headers, Query Params vs Path Params',
        summary: 'How to supply configuration, filters, and identity data to endpoints.',
        explanation: `Every HTTP request carries three main components:
1. **Headers (Metadata):**
   - \`Content-Type: application/json\` (tells server what format the body is in)
   - \`Authorization: Bearer <token>\` (proves user identity)
   - \`Accept: application/json\` (tells server what format client expects)
2. **Path Parameters:** Part of the URL path used to identify a specific entity.
   - Example: \`/v1/products/102\` (102 is the path parameter)
3. **Query Parameters:** Key-value pairs appended after a \`?\` to filter, sort, or paginate collections.
   - Example: \`/v1/products?category=Testing&min_price=200&limit=5\``,
        codeSnippet: {
          language: 'http',
          code: `GET /v1/products?category=Testing&min_price=200 HTTP/1.1
Host: api.rootaccess.org
Authorization: Bearer eyJhbGciOi...
Accept: application/json`,
        },
        takeaways: [
          'Use path parameters to locate a specific resource by ID.',
          'Use query parameters to filter, sort, search, or paginate a list of resources.',
        ],
      },
      {
        title: '4. HTTP Response Status Codes Every QA Engineer Must Master',
        summary: 'Standardized three-digit numeric indicators of request outcomes.',
        explanation: `Status codes are categorized into five distinct classes:
• **2xx Success:**
  - \`200 OK:\` Request succeeded.
  - \`201 Created:\` Resource successfully created (standard for POST).
  - \`204 No Content:\` Action succeeded, body is intentionally empty (standard for DELETE).
• **3xx Redirection:** Resource moved or cached (301, 304).
• **4xx Client Error:** The client made a mistake:
  - \`400 Bad Request:\` Malformed JSON or invalid parameters.
  - \`401 Unauthorized:\` Missing or invalid credentials (AuthN).
  - \`403 Forbidden:\` Authenticated, but lacking permission (AuthZ).
  - \`404 Not Found:\` Endpoint or resource ID does not exist.
  - \`422 Unprocessable Entity:\` Syntactically valid JSON that violates business logic.
• **5xx Server Error:** Backend crash or bug:
  - \`500 Internal Server Error:\` Unhandled exception (Always log a QA bug!).
  - \`503 Service Unavailable:\` Database or upstream service offline.`,
        codeSnippet: {
          language: 'javascript',
          code: `// The "Golden QA Anti-Pattern":
// Returning 200 OK with {"status": "error", "message": "Failed"} in the body!
// If an operation fails, the server MUST return an appropriate 4xx or 5xx code.`,
        },
        takeaways: [
          'A 200 OK containing an error message in the payload is a severe REST anti-pattern.',
          '500 errors must always be logged as defect reports with reproducible payloads.',
        ],
      },
    ],
    exercises: [
      {
        id: 'api-ex-1-1',
        title: 'Exercise 1: Retrieve Product Catalog (GET)',
        description: 'Send a standard GET request to fetch the list of active training courses.',
        instruction: 'Configure a GET request to https://api.rootaccess.org/v1/products and verify a 200 OK response arrives.',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/products',
        expectedStatus: 200,
        initialTestScript: `pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Product list contains items", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.products).to.be.an("array");
    pm.expect(jsonData.total).to.be.above(0);
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: `Expected status 200 OK, got ${res.status}.` };
          if (!res.data?.products) return { success: false, feedback: 'Response did not contain a products array.' };
          return { success: true, feedback: '200 OK! Catalog retrieved with full product list.' };
        },
        hints: ['Set method to GET', 'URL: https://api.rootaccess.org/v1/products'],
      },
      {
        id: 'api-ex-1-2',
        title: 'Exercise 2: Filter with Query Parameters (?category=Testing)',
        description: 'Use URL query parameters to retrieve only courses in the Testing category.',
        instruction: 'Send a GET request to https://api.rootaccess.org/v1/products?category=Testing and verify only Testing courses return.',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/products?category=Testing',
        expectedStatus: 200,
        initialTestScript: `pm.test("All returned products belong to Testing category", function () {
    var jsonData = pm.response.json();
    jsonData.products.forEach(function(item) {
        pm.expect(item.category).to.eql("Testing");
    });
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: `Expected 200 OK, got ${res.status}.` };
          const allTesting = res.data?.products?.every((p: any) => p.category === 'Testing');
          if (!allTesting) return { success: false, feedback: 'Some products did not match category=Testing.' };
          return { success: true, feedback: 'Great job! Query parameter successfully filtered results to Testing courses only.' };
        },
        hints: ['Append ?category=Testing to the product endpoint URL'],
      },
      {
        id: 'api-ex-1-3',
        title: 'Exercise 3: Retrieve Specific Product by Path Parameter (/products/101)',
        description: 'Fetch single product details using a path identifier.',
        instruction: 'Send a GET request to https://api.rootaccess.org/v1/products/101 and assert product name is "Playwright Automation Masterclass".',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/products/101',
        expectedStatus: 200,
        initialTestScript: `pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Product ID is 101", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.id).to.eql(101);
    pm.expect(jsonData.price).to.eql(649);
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: `Expected 200 OK, got ${res.status}.` };
          if (res.data?.id !== 101) return { success: false, feedback: 'Expected product ID 101 in response body.' };
          return { success: true, feedback: 'Success! Product #101 details verified.' };
        },
        hints: ['Use path: https://api.rootaccess.org/v1/products/101'],
      },
      {
        id: 'api-ex-1-4',
        title: 'Exercise 4: Verify 404 Not Found on Unknown Resource',
        description: 'Verify error handling when a client requests an entity ID that does not exist.',
        instruction: 'Send a GET request to an unknown product ID (https://api.rootaccess.org/v1/products/99999) and assert a 404 Not Found error returns.',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/products/99999',
        expectedStatus: 404,
        initialTestScript: `pm.test("Status code is 404 Not Found", function () {
    pm.response.to.have.status(404);
});

pm.test("Error message explains resource was not found", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.eql("Not Found");
});`,
        validate: (res) => {
          if (res.status !== 404) return { success: false, feedback: `Expected status 404 Not Found, received ${res.status}.` };
          return { success: true, feedback: 'Correct negative testing! 404 Not Found received as expected.' };
        },
        hints: ['Target https://api.rootaccess.org/v1/products/99999'],
      },
      {
        id: 'api-ex-1-5',
        title: 'Exercise 5: Authenticate & Generate Bearer Token (POST /auth/login)',
        description: 'Send a JSON credentials payload to authenticate and receive an access token.',
        instruction: 'Send a POST request to https://api.rootaccess.org/v1/auth/login with valid student JSON credentials.',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/auth/login',
        initialBody: JSON.stringify({
          email: 'student@rootaccess.org',
          password: 'RootAccess@2026',
        }, null, 2),
        expectedStatus: 200,
        initialTestScript: `pm.test("Status is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Returns valid JWT Bearer access token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.access_token).to.be.a("string");
    pm.expect(jsonData.token_type).to.eql("Bearer");
    // Save into environment variable for subsequent chained calls
    pm.environment.set("authToken", jsonData.access_token);
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: `Expected status 200 OK, got ${res.status}. Check credentials.` };
          if (!res.data?.access_token) return { success: false, feedback: 'access_token was not present in response.' };
          return { success: true, feedback: 'Authentication successful! Bearer token saved to environment variable.' };
        },
        hints: ['Method: POST', 'Body email: student@rootaccess.org, password: RootAccess@2026'],
      },
    ],
    interviewQuestions: [
      {
        id: 'api-iq-1-1',
        question: 'What is the difference between an Idempotent and a Safe HTTP method?',
        concept: 'HTTP Method Specifications',
        modelAnswer: 'A Safe HTTP method (like GET or HEAD) does not alter server state or produce side effects; it is read-only. An Idempotent HTTP method (like PUT or DELETE) can alter server state, but executing it multiple times produces the identical server state as executing it once (e.g. deleting resource #101 ten times still leaves it deleted). POST is neither safe nor idempotent because each invocation creates a brand new record.',
        seniorTip: 'Categorizing methods clearly: GET is Safe & Idempotent; PUT/DELETE are Not Safe but Idempotent; POST is Neither Safe nor Idempotent.',
      },
      {
        id: 'api-iq-1-2',
        question: 'Explain the difference between HTTP Status Code 401 Unauthorized and 403 Forbidden.',
        concept: 'Authentication vs Authorisation',
        modelAnswer: 'HTTP 401 Unauthorized strictly means "Unauthenticated": the client did not provide credentials, or the token is expired/invalid. The solution is to provide valid credentials. HTTP 403 Forbidden means "Unauthorized": the server knows who the client is, but that user lacks the necessary permissions/role to perform the requested action (e.g. a regular student trying to access `/admin/audit-logs`). Re-authenticating with the same user will not fix a 403.',
        seniorTip: 'Mentioning that 401 should technically have been named "401 Unauthenticated" shows exceptional depth.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q-api-1-1',
          question: 'Which HTTP method should be used when creating a new resource where the server assigns the ID?',
          options: ['GET', 'POST', 'PUT', 'PATCH'],
          correctAnswerIndex: 1,
          explanation: 'POST is standard for creating new subordinate entities where the URI is determined by the server.',
        },
        {
          id: 'q-api-1-2',
          question: 'What is the appropriate status code when a resource is successfully created via POST?',
          options: ['200 OK', '201 Created', '204 No Content', '202 Accepted'],
          correctAnswerIndex: 1,
          explanation: '201 Created indicates the request succeeded and led to the creation of a new resource.',
        },
        {
          id: 'q-api-1-3',
          question: 'What is the difference between a Path parameter and a Query parameter?',
          options: [
            'Path parameters appear in request headers; Query parameters appear in cookies',
            'Path parameters locate a specific resource by ID (e.g. /products/101); Query parameters filter or sort collections (e.g. /products?min_price=100)',
            'Query parameters are encrypted; Path parameters are not',
            'Path parameters only work on DELETE requests',
          ],
          correctAnswerIndex: 1,
          explanation: 'Path parameters specify which specific resource to act upon, while query parameters modify the representation (filtering, sorting, pagination).',
        },
        {
          id: 'q-api-1-4',
          question: 'If an API returns status code 200 OK but the JSON response body contains `{"error": "Invalid password"}`, what is this called in QA testing?',
          options: [
            'Best practice error handling',
            'A REST API anti-pattern (Soft 200 error)',
            'A database deadlock',
            'An SSL handshake failure',
          ],
          correctAnswerIndex: 1,
          explanation: 'Returning 200 OK for an operation that actually failed is a known anti-pattern. The server should return 401 Unauthorized or 400 Bad Request.',
        },
        {
          id: 'q-api-1-5',
          question: 'Which status code family represents client errors (e.g. invalid inputs or unauthorized access)?',
          options: ['2xx', '3xx', '4xx', '5xx'],
          correctAnswerIndex: 2,
          explanation: '4xx status codes indicate client-side errors (such as bad syntax, invalid payload, or lack of authentication).',
        },
      ],
    },
    summaryTakeaway: 'You have mastered REST fundamentals: client-server communication, HTTP methods, headers, parameters, and status code verification.',
  },

  // ================= DAY 2 =================
  {
    dayNumber: 2,
    title: 'Testing API Requests and Responses',
    subtitle: 'Payload validation, PUT vs PATCH, schema assertions, headers, response SLAs & positive/negative test design',
    badge: 'Day 2 • Request & Response QA',
    duration: '2.5 Hours',
    objectives: [
      'Write automated response assertions for status codes, headers, and payload structures',
      'Validate JSON data types (string, number, boolean, array, object) using Chai assertions',
      'Test full replacement (PUT) versus partial updates (PATCH)',
      'Assert response times against performance Service Level Agreements (SLAs)',
      'Apply Boundary Value Analysis (BVA) and Equivalence Partitioning (EP) to API request parameters',
    ],
    topics: [
      {
        title: '1. JSON Schema & Field Type Assertions',
        summary: 'Verifying that response bodies conform to strict contracts and expected types.',
        explanation: `In automated API testing, never verify only the HTTP status code! A broken endpoint can return 200 OK with empty or corrupted JSON.
Always assert:
1. **Status code:** \`pm.response.to.have.status(200)\`
2. **Content-Type header:** \`pm.response.to.have.header("content-type")\`
3. **Data types:** Ensure numbers are not returned as strings (e.g. \`"price": "649"\` is a bug!).
4. **Mandatory properties:** Ensure non-nullable business fields are present.`,
        codeSnippet: {
          language: 'javascript',
          code: `// Comprehensive Postman Test Assertions
pm.test("Status is 200 OK and response is JSON", function () {
    pm.response.to.have.status(200);
    pm.expect(pm.response.headers.get("content-type")).to.include("application/json");
});

pm.test("Product object structure and types", function () {
    const data = pm.response.json();
    pm.expect(data.id).to.be.a("number");
    pm.expect(data.name).to.be.a("string");
    pm.expect(data.price).to.be.a("number");
    pm.expect(data.price).to.be.above(0);
});`,
        },
        takeaways: [
          'Verify both the existence of fields and their specific primitive data types.',
          'Asserting numerical constraints (e.g. price > 0, stock >= 0) catches backend calculation errors early.',
        ],
      },
      {
        title: '2. PUT vs PATCH: Full Replacement vs Partial Modification',
        summary: 'How each update verb handles missing fields and idempotency.',
        explanation: `• **PUT:** Expects the complete resource representation. If a client sends \`PUT /v1/products/101\` with only \`{"price": 499}\` without providing \`name\` or \`category\`, a strict REST API will either wipe the missing fields or reject with \`400 Bad Request\`.
• **PATCH:** Specifically designed for delta updates. Sending \`PATCH /v1/products/101\` with \`{"price": 499}\` updates only the price while preserving existing name, category, and metadata intact.`,
        codeSnippet: {
          language: 'http',
          code: `PATCH /v1/products/101 HTTP/1.1
Host: api.rootaccess.org
Content-Type: application/json

{
  "price": 599.00
}`,
        },
        takeaways: [
          'Use PATCH when updating 1 or 2 fields to conserve network bandwidth and avoid overwriting concurrent updates.',
        ],
      },
      {
        title: '3. Response Times, SLA Budgets & Performance Checks',
        summary: 'Asserting that API endpoints respond within acceptable latency thresholds.',
        explanation: `Slow APIs directly degrade frontend UX and cause timeout cascades in microservices.
In Postman, \`pm.response.responseTime\` measures the round-trip latency in milliseconds.
Standard QA SLA thresholds:
• Read operations (GET): Under 200ms
• Write operations (POST/PUT): Under 500ms
• Complex analytical operations: Under 1500ms`,
        codeSnippet: {
          language: 'javascript',
          code: `pm.test("Response time satisfies SLA (< 500ms)", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});`,
        },
        takeaways: [
          'Flaky response time tests in CI/CD should have reasonable headroom to account for network variances.',
        ],
      },
      {
        title: '4. Applying BVA and Equivalence Partitioning to API Inputs',
        summary: 'Techniques for designing exhaustive positive and negative test cases.',
        explanation: `Just as in Manual QA, API parameters have valid and invalid equivalence classes:
• **Positive Cases:** Valid input inside expected boundary.
• **Negative Boundary Cases:**
  - Price = 0 or negative numbers (Expect \`422 Unprocessable Entity\`)
  - String length exceeds maximum column limit (Expect \`400 Bad Request\`)
  - Sending non-numeric string into an integer parameter (Expect \`400 Bad Request\`)
  - Empty body \`{}\` on POST requests (Expect \`400 Bad Request\` with specific validation errors)`,
        codeSnippet: {
          language: 'json',
          code: `// Negative Test Payload: Missing required fields
// Expected: 400 Bad Request with field-level diagnostic messages
{
  "price": -100
}`,
        },
        takeaways: [
          'Negative testing verifies that the API fails gracefully with helpful error messages rather than unhandled 500 crashes.',
        ],
      },
    ],
    exercises: [
      {
        id: 'api-ex-2-1',
        title: 'Exercise 1: Create a Product with Valid JSON (POST)',
        description: 'Create a new course asset and verify 201 Created response.',
        instruction: 'Send a POST request to https://api.rootaccess.org/v1/products with name, price, and category. Assert status is 201.',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/products',
        initialBody: JSON.stringify({
          name: 'Kubernetes for QA Engineers',
          category: 'DevOps',
          price: 799,
          stock: 60,
        }, null, 2),
        expectedStatus: 201,
        initialTestScript: `pm.test("Status is 201 Created", function () {
    pm.response.to.have.status(201);
});

pm.test("Created product has valid ID and correct price", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.product.id).to.be.a("number");
    pm.expect(jsonData.product.price).to.eql(799);
    // Save created ID for next exercise
    pm.environment.set("productId", jsonData.product.id);
});`,
        validate: (res) => {
          if (res.status !== 201) return { success: false, feedback: `Expected 201 Created, got ${res.status}.` };
          if (!res.data?.product?.id) return { success: false, feedback: 'Created product did not return an ID.' };
          return { success: true, feedback: '201 Created! Product added to catalog with generated ID.' };
        },
        hints: ['Method: POST', 'Body must include name, price, category'],
      },
      {
        id: 'api-ex-2-2',
        title: 'Exercise 2: Negative Test — Missing Required Fields (POST)',
        description: 'Verify 400 Bad Request error when mandatory fields are omitted.',
        instruction: 'Send a POST to https://api.rootaccess.org/v1/products with an invalid payload missing "name" and "category".',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/products',
        initialBody: JSON.stringify({
          price: 299,
        }, null, 2),
        expectedStatus: 400,
        initialTestScript: `pm.test("Status code is 400 Bad Request", function () {
    pm.response.to.have.status(400);
});

pm.test("Response includes validation error messages", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.validationErrors).to.be.an("array");
});`,
        validate: (res) => {
          if (res.status !== 400) return { success: false, feedback: `Expected 400 Bad Request, got ${res.status}.` };
          return { success: true, feedback: 'Negative test passed! Server correctly rejected missing required fields with 400.' };
        },
        hints: ['Send payload without name or category'],
      },
      {
        id: 'api-ex-2-3',
        title: 'Exercise 3: Partial Modification with PATCH',
        description: 'Update only the price on product #101 using PATCH.',
        instruction: 'Send a PATCH request to https://api.rootaccess.org/v1/products/101 updating price to 699.',
        method: 'PATCH',
        endpoint: 'https://api.rootaccess.org/v1/products/101',
        initialBody: JSON.stringify({
          price: 699,
        }, null, 2),
        expectedStatus: 200,
        initialTestScript: `pm.test("Status is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Price updated without changing name", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.product.price).to.eql(699);
    pm.expect(jsonData.product.name).to.include("Playwright");
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: `Expected 200 OK, got ${res.status}.` };
          if (res.data?.product?.price !== 699) return { success: false, feedback: 'Price was not updated to 699.' };
          return { success: true, feedback: 'PATCH succeeded! Field updated while preserving other product attributes.' };
        },
        hints: ['Method: PATCH', 'Body: {"price": 699}'],
      },
      {
        id: 'api-ex-2-4',
        title: 'Exercise 4: Delete a Resource with DELETE (204 No Content)',
        description: 'Send a DELETE request and verify 204 No Content.',
        instruction: 'Send a DELETE request to https://api.rootaccess.org/v1/products/106 and verify 204 No Content.',
        method: 'DELETE',
        endpoint: 'https://api.rootaccess.org/v1/products/106',
        expectedStatus: 204,
        initialTestScript: `pm.test("Status code is 204 No Content", function () {
    pm.response.to.have.status(204);
});`,
        validate: (res) => {
          if (res.status !== 204) return { success: false, feedback: `Expected 204 No Content, got ${res.status}.` };
          return { success: true, feedback: '204 No Content! Resource deleted successfully.' };
        },
        hints: ['Method: DELETE', 'Target: https://api.rootaccess.org/v1/products/106'],
      },
      {
        id: 'api-ex-2-5',
        title: 'Exercise 5: Assert Response Time SLA Threshold',
        description: 'Verify endpoint performance meets production SLA requirements.',
        instruction: 'Send a GET to https://api.rootaccess.org/v1/products and assert response time is below 500ms.',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/products',
        expectedStatus: 200,
        initialTestScript: `pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is acceptable (< 500ms)", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: 'Expected 200 OK.' };
          return { success: true, feedback: 'Performance SLA passed! Response arrived in under 500ms.' };
        },
        hints: ['Use pm.expect(pm.response.responseTime).to.be.below(500)'],
      },
    ],
    interviewQuestions: [
      {
        id: 'api-iq-2-1',
        question: 'How do you design automated tests for an API endpoint that has complex JSON schemas?',
        concept: 'Contract & Schema Validation',
        modelAnswer: 'I validate endpoints across 4 distinct layers: 1. Status Code & Header Verification: Confirm expected HTTP code and Content-Type. 2. Schema Structure Verification: Assert that all mandatory keys are present and data types match specifications (string, number, boolean). 3. Value Range & Boundary Checks: Ensure numerical ranges (price > 0) and enumerated strings are valid. 4. Negative Error Scenarios: Send missing or malformed fields to ensure the API responds with 400 Bad Request and descriptive validation arrays.',
        seniorTip: 'Mentioning tools like Ajv or JSON Schema validator shows mature automation experience.',
      },
      {
        id: 'api-iq-2-2',
        question: 'Why should a DELETE request return 204 No Content instead of 200 OK?',
        concept: 'RESTful Response Standards',
        modelAnswer: 'HTTP 204 No Content indicates that the action was successfully performed and there is no entity body to return. Because the resource was deleted, returning a body is redundant and wastes bandwidth. Returning 204 signals to client apps and browser caches that the resource is gone without requiring the parser to unpack an empty JSON object.',
        seniorTip: 'Note that some APIs return 200 OK with a confirmation message or deleted entity copy, but 204 is the canonical REST standard.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q-api-2-1',
          question: 'What is the primary technical difference between PUT and PATCH?',
          options: [
            'PUT is used for read operations; PATCH is used for delete operations',
            'PUT completely replaces the entire resource; PATCH applies partial modifications to specific fields',
            'PUT only works on integers',
            'PATCH requires XML instead of JSON',
          ],
          correctAnswerIndex: 1,
          explanation: 'PUT replaces the entire entity with the supplied payload, while PATCH updates only the specific fields provided in the request.',
        },
        {
          id: 'q-api-2-2',
          question: 'What HTTP status code should be returned when a client submits a negative price for a product?',
          options: ['200 OK', '404 Not Found', '422 Unprocessable Entity or 400 Bad Request', '500 Server Crash'],
          correctAnswerIndex: 2,
          explanation: 'When a payload is valid JSON syntax but violates business validation rules (like price > 0), 422 Unprocessable Entity or 400 Bad Request is appropriate.',
        },
        {
          id: 'q-api-2-3',
          question: 'Which Chai assertion correctly verifies that `jsonData.total` is a positive number greater than zero?',
          options: [
            'pm.expect(jsonData.total).to.be.above(0);',
            'pm.expect(jsonData.total).isZero();',
            'pm.expect(jsonData.total).to.have.string("0");',
            'pm.response.to.have.status(0);',
          ],
          correctAnswerIndex: 0,
          explanation: '`pm.expect(val).to.be.above(0)` asserts that a numeric value is strictly greater than 0.',
        },
        {
          id: 'q-api-2-4',
          question: 'What does HTTP status code 204 No Content signify?',
          options: [
            'The server could not find the requested webpage',
            'The request succeeded, but the response body is intentionally empty',
            'The client sent no headers',
            'The database connection was closed',
          ],
          correctAnswerIndex: 1,
          explanation: '204 indicates the server fulfilled the request successfully and did not return any response payload.',
        },
        {
          id: 'q-api-2-5',
          question: 'Why is testing response times in automated API suites important?',
          options: [
            'It prevents compilers from failing',
            'Slow API response times cause timeouts in microservices and degrade user experience',
            'Postman fails if response time is under 100ms',
            'It changes HTTP methods automatically',
          ],
          correctAnswerIndex: 1,
          explanation: 'Verifying response latency guarantees compliance with SLAs and alerts developers to database query bottlenecks before production deployment.',
        },
      ],
    },
    summaryTakeaway: 'You have mastered request construction, JSON payload validation, PUT vs PATCH semantics, 204 DELETE behavior, performance SLAs, and boundary test design.',
  },

  // ================= DAY 3 =================
  {
    dayNumber: 3,
    title: 'Authentication, Authorisation, and Negative Testing',
    subtitle: 'AuthN vs AuthZ, API keys, Bearer tokens, RBAC, 401/403 status codes, 429 rate limiting & security leak audits',
    badge: 'Day 3 • Security & Negative QA',
    duration: '2.5 Hours',
    objectives: [
      'Differentiate Authentication (who you are) from Authorisation (what you can do)',
      'Understand API keys, Basic Auth, Bearer JWT tokens, and OAuth 2.0 principles',
      'Test Role-Based Access Control (RBAC) and verify 401 Unauthorized vs 403 Forbidden',
      'Audit API responses for sensitive data exposure (passwords, stack traces, private keys)',
      'Test rate limiting and understand HTTP 429 Too Many Requests response handling',
    ],
    topics: [
      {
        title: '1. Authentication vs Authorisation (AuthN vs AuthZ)',
        summary: 'Proving identity versus granting permissions.',
        explanation: `Security testing begins with the distinction between two concepts:
• **Authentication (AuthN):** "Who are you?"
  Verifying credentials (username/password, biometric, OTP) to prove identity.
  If invalid: Return \`401 Unauthorized\`.
• **Authorisation (AuthZ):** "What are you allowed to do?"
  Verifying whether an authenticated user has the necessary role or permissions to perform an action.
  If denied: Return \`403 Forbidden\`.`,
        codeSnippet: {
          language: 'http',
          code: `// Authentication Header Format:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Missing or invalid token -> 401 Unauthorized
// Valid token, but non-admin user accessing admin audit logs -> 403 Forbidden`,
        },
        takeaways: [
          '401 means login is required or credentials are bad.',
          '403 means the user is logged in, but not permitted to touch that resource.',
        ],
      },
      {
        title: '2. Bearer Tokens, API Keys, and JWT Architecture',
        summary: 'How stateless authentication tokens operate in modern REST APIs.',
        explanation: `• **API Key:** A static secret token passed in headers (e.g. \`X-API-Key: secret123\`). Common for service-to-service communication.
• **Bearer Token (JWT - JSON Web Token):** A cryptographically signed token passed in the \`Authorization\` header.
A JWT consists of 3 Base64-encoded segments separated by dots:
1. **Header:** Algorithm used (e.g. HS256).
2. **Payload:** Claims and user data (e.g. \`sub\`, \`role\`, \`exp\`).
3. **Signature:** Cryptographic signature verified using the server\'s secret key.`,
        codeSnippet: {
          language: 'javascript',
          code: `// Decoded JWT Payload Example:
{
  "sub": "USR-101",
  "name": "Priya Sharma",
  "role": "student",
  "exp": 1713000000
}`,
        },
        takeaways: [
          'JWT payloads are Base64 encoded, NOT encrypted! Anyone can read the payload; never store raw passwords or SSNs inside a JWT!',
        ],
      },
      {
        title: '3. Role-Based Access Control (RBAC) Testing',
        summary: 'Verifying privilege boundaries across different user tiers.',
        explanation: `In enterprise apps, users have different roles (e.g. Student, Instructor, Admin).
As a QA tester, you must verify:
1. An unauthenticated request to protected endpoints returns \`401\`.
2. A student attempting to delete a product or view \`/admin/audit-logs\` receives \`403 Forbidden\`.
3. An admin receives \`200 OK\` for the same endpoint.`,
        codeSnippet: {
          language: 'javascript',
          code: `pm.test("Non-admin user is rejected with 403 Forbidden", function () {
    pm.response.to.have.status(403);
    pm.expect(pm.response.json().error).to.eql("Forbidden");
});`,
        },
        takeaways: [
          'Horizontal privilege escalation: User A accessing User B\'s private orders.',
          'Vertical privilege escalation: Regular user performing Admin operations.',
        ],
      },
      {
        title: '4. Rate Limiting (429) & Preventing Sensitive Data Exposure',
        summary: 'Protecting backend infrastructure and auditing for data leaks in error responses.',
        explanation: `• **Rate Limiting:** Prevents denial-of-service and brute force attacks by limiting requests per IP/user (e.g. 100 requests per minute). When exceeded, the API returns \`429 Too Many Requests\` with a \`Retry-After\` header.
• **Data Exposure Audits:** QA testers inspect responses to confirm:
  - Password hashes are never returned in user profile responses.
  - Internal database stack traces or SQL strings are never exposed in 500 error bodies.`,
        codeSnippet: {
          language: 'http',
          code: `HTTP/1.1 429 Too Many Requests
Retry-After: 60
Content-Type: application/json

{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please wait 60 seconds."
}`,
        },
        takeaways: [
          'Detailed stack traces in production error responses represent high-severity security vulnerabilities.',
        ],
      },
    ],
    exercises: [
      {
        id: 'api-ex-3-1',
        title: 'Exercise 1: Test Endpoint Without Credentials (Verify 401)',
        description: 'Verify protected checkout endpoints reject unauthenticated requests.',
        instruction: 'Send a POST request to https://api.rootaccess.org/v1/orders WITHOUT an Authorization header and assert a 401 Unauthorized response.',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/orders',
        expectedStatus: 401,
        initialTestScript: `pm.test("Status code is 401 Unauthorized", function () {
    pm.response.to.have.status(401);
});

pm.test("Error message explains token is missing", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.eql("Unauthorized");
});`,
        validate: (res) => {
          if (res.status !== 401) return { success: false, feedback: `Expected 401 Unauthorized, got ${res.status}.` };
          return { success: true, feedback: '401 Unauthorized verified! Unauthenticated request correctly rejected.' };
        },
        hints: ['Do not include an Authorization header in the request'],
      },
      {
        id: 'api-ex-3-2',
        title: 'Exercise 2: Authenticate and Obtain Student Token',
        description: 'Log in as a student to acquire a valid Bearer token.',
        instruction: 'POST credentials to https://api.rootaccess.org/v1/auth/login and save token into environment.',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/auth/login',
        initialBody: JSON.stringify({
          email: 'student@rootaccess.org',
          password: 'RootAccess@2026',
        }, null, 2),
        expectedStatus: 200,
        initialTestScript: `pm.test("Login successful and token generated", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.environment.set("authToken", jsonData.access_token);
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: 'Expected 200 OK login.' };
          return { success: true, feedback: 'Token acquired and stored in environment variable {{authToken}}.' };
        },
        hints: ['Send valid student credentials'],
      },
      {
        id: 'api-ex-3-3',
        title: 'Exercise 3: Test Role Access — Student Denied Admin Resource (403)',
        description: 'Verify vertical privilege escalation is blocked for non-admin accounts.',
        instruction: 'Send a GET to https://api.rootaccess.org/v1/admin/audit-logs with the student Bearer token. Assert 403 Forbidden.',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/admin/audit-logs',
        headers: {
          Authorization: 'Bearer {{authToken}}',
        },
        expectedStatus: 403,
        initialTestScript: `pm.test("Student user is rejected with 403 Forbidden", function () {
    pm.response.to.have.status(403);
});

pm.test("Error message cites missing admin role", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.eql("Forbidden");
});`,
        validate: (res) => {
          if (res.status !== 403) return { success: false, feedback: `Expected 403 Forbidden, got ${res.status}.` };
          return { success: true, feedback: 'Security check passed! Student account was blocked with 403 Forbidden from accessing admin audit logs.' };
        },
        hints: ['Set Authorization header to: Bearer {{authToken}}', 'Target: https://api.rootaccess.org/v1/admin/audit-logs'],
      },
      {
        id: 'api-ex-3-4',
        title: 'Exercise 4: Test Malformed JSON Input (400 Bad Request)',
        description: 'Verify server gracefully rejects corrupt, non-parseable JSON payloads.',
        instruction: 'Send a POST to https://api.rootaccess.org/v1/auth/login with broken, malformed JSON (missing closing brace). Assert 400 Bad Request.',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/auth/login',
        initialBody: '{\n  "email": "student@rootaccess.org",\n  "password": "wrong',
        expectedStatus: 400,
        initialTestScript: `pm.test("Status code is 400 Bad Request", function () {
    pm.response.to.have.status(400);
});

pm.test("Error explains JSON syntax issue", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.error).to.eql("Bad Request");
});`,
        validate: (res) => {
          if (res.status !== 400) return { success: false, feedback: `Expected 400 Bad Request, got ${res.status}.` };
          return { success: true, feedback: 'Graceful error handling verified! Malformed JSON produced clean 400 Bad Request.' };
        },
        hints: ['Send incomplete JSON text without closing braces'],
      },
      {
        id: 'api-ex-3-5',
        title: 'Exercise 5: Admin Login & Successful Audit Log Inspection (200 OK)',
        description: 'Authenticate as an Administrator and verify authorized access.',
        instruction: 'Log in as admin@rootaccess.org (password: AdminMaster@2026), then GET https://api.rootaccess.org/v1/admin/audit-logs with the admin token.',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/auth/login',
        initialBody: JSON.stringify({
          email: 'admin@rootaccess.org',
          password: 'AdminMaster@2026',
        }, null, 2),
        expectedStatus: 200,
        initialTestScript: `pm.test("Admin authentication successful", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.expect(jsonData.user.role).to.eql("admin");
    pm.environment.set("authToken", jsonData.access_token);
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: 'Expected 200 OK admin login.' };
          return { success: true, feedback: 'Admin token generated! Authorization permissions verified.' };
        },
        hints: ['Use email: admin@rootaccess.org, password: AdminMaster@2026'],
      },
    ],
    interviewQuestions: [
      {
        id: 'api-iq-3-1',
        question: 'What is an Insecure Direct Object Reference (IDOR) vulnerability in API testing?',
        concept: 'API Security Testing & IDOR',
        modelAnswer: 'An IDOR vulnerability occurs when an API accepts an object identifier directly from a client without validating whether the authenticated user has permission to access that specific object. For example, if User A is logged in and requests `GET /v1/orders/ORD-7001` (belonging to User B), and the API returns User B\'s private data instead of rejecting with 403/404, that is a critical IDOR defect.',
        seniorTip: 'Always recommend testing IDOR by logging in as User A, attempting to view or delete User B\'s resource ID, and asserting a 403 or 404 response.',
      },
      {
        id: 'api-iq-3-2',
        question: 'How do you handle API Rate Limiting in automated regression test suites?',
        concept: 'Rate Limiting and Test Suite Resiliency',
        modelAnswer: 'In automated suites, hitting rate limits (HTTP 429) causes false negative test failures. Strategies to manage this: 1. Whitelist test runner IP addresses in lower environments. 2. Configure exponential backoff and retry logic in test scripts when a 429 with `Retry-After` is encountered. 3. Distribute test execution across multiple mock tenant accounts rather than hammering a single API key.',
        seniorTip: 'Mentioning Exponential Backoff and Jitter signals deep practical engineering experience.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q-api-3-1',
          question: 'What is the key difference between Authentication (AuthN) and Authorisation (AuthZ)?',
          options: [
            'Authentication is for databases; Authorisation is for frontends',
            'Authentication verifies who you are; Authorisation determines what permissions you have',
            'Authorisation happens before Authentication',
            'Authentication uses status code 403; Authorisation uses 401',
          ],
          correctAnswerIndex: 1,
          explanation: 'Authentication verifies identity (identity check), whereas Authorisation determines access permissions for that verified identity.',
        },
        {
          id: 'q-api-3-2',
          question: 'Which status code indicates an authenticated user does NOT have permission to access a resource?',
          options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '502 Bad Gateway'],
          correctAnswerIndex: 1,
          explanation: '403 Forbidden indicates that the client\'s identity is known, but access is refused due to insufficient permissions.',
        },
        {
          id: 'q-api-3-3',
          question: 'What HTTP status code is returned when a client exceeds the allowed request rate limit?',
          options: ['400 Bad Request', '429 Too Many Requests', '503 Service Unavailable', '408 Request Timeout'],
          correctAnswerIndex: 1,
          explanation: '429 Too Many Requests indicates that the user has sent too many requests in a given amount of time.',
        },
        {
          id: 'q-api-3-4',
          question: 'Why is it dangerous for a production API to return an internal Java or SQL stack trace in a 500 error response?',
          options: [
            'It slows down JSON parsing by 5 milliseconds',
            'It exposes internal database table names, library versions, and server architecture to potential attackers',
            'Postman cannot display text longer than 100 characters',
            'It automatically invalidates all JWT tokens',
          ],
          correctAnswerIndex: 1,
          explanation: 'Stack traces reveal sensitive internal architecture, file paths, database structures, and third-party dependency versions that attackers exploit.',
        },
        {
          id: 'q-api-3-5',
          question: 'In a JWT token, is the payload section encrypted?',
          options: [
            'Yes, it is encrypted with military-grade AES-256 encryption',
            'No, it is merely Base64-encoded and can be decoded and read by anyone',
            'It is only readable by Google',
            'It cannot be decoded without the private database key',
          ],
          correctAnswerIndex: 1,
          explanation: 'JWT payloads are only Base64URL encoded, not encrypted. Sensitive secrets should never be placed in a JWT payload.',
        },
      ],
    },
    summaryTakeaway: 'You have mastered security testing: AuthN vs AuthZ, Bearer token handling, Role-Based Access Control, rate limiting, and sensitive data leak detection.',
  },

  // ================= DAY 4 =================
  {
    dayNumber: 4,
    title: 'Postman Automation and API Test Design',
    subtitle: 'Collections, environment variables, dynamic request chaining, data-driven tests & test suite repeatability',
    badge: 'Day 4 • Automation & Chaining',
    duration: '2.5 Hours',
    objectives: [
      'Organize requests into logical collections with shared pre-request and test scripts',
      'Manage environment variables ({{baseUrl}}, {{authToken}}, {{orderId}})',
      'Extract dynamic data from Response A and pass it into subsequent Request B (Request Chaining)',
      'Construct automated end-to-end multi-step workflow test suites',
      'Ensure test repeatability and state cleanup to prevent pollution in regression test runs',
    ],
    topics: [
      {
        title: '1. Postman Collections and Folder Hierarchies',
        summary: 'Structuring large regression test suites into maintainable modules.',
        explanation: `In production QA, tests are not executed as isolated one-off requests. They are organized into **Postman Collections**.
A well-structured collection reflects the application\'s feature domains:
• \`Auth/\` (Login, Token Refresh, Password Reset)
• \`Products/\` (Catalog, Details, Search, Admin CRUD)
• \`Cart/\` (Add to Cart, Update Quantity, Remove)
• \`Orders/\` (Checkout, Payment Verification, Order Status)

Collections support **Collection Variables** and **Inherited Authorization**, so every request in the folder automatically inherits the active Bearer token.`,
        codeSnippet: {
          language: 'javascript',
          code: `// Collection-Level Pre-Request Script:
// Automatically attach timestamp header to every request in collection
pm.request.headers.add({
    key: "X-Request-Timestamp",
    value: new Date().toISOString()
});`,
        },
        takeaways: [
          'Group requests by feature domain or business workflow.',
          'Define base URLs as variables (e.g. {{baseUrl}}) so switching from Staging to QA requires changing only one variable.',
        ],
      },
      {
        title: '2. Dynamic Request Chaining (Passing Data Between Requests)',
        summary: 'The foundation of automated API workflow testing.',
        explanation: `Real user journeys require chained requests where the output of one step becomes the input of the next:
**Example User Journey:**
1. \`POST /auth/login\` -> Extract \`access_token\` -> Save to \`pm.environment.set("authToken", ...)\`
2. \`GET /products\` -> Extract first \`product.id\` -> Save to \`pm.environment.set("productId", ...)\`
3. \`POST /cart/items\` -> Send \`{"productId": {{productId}}, "quantity": 1}\`
4. \`POST /orders\` -> Checkout cart with \`Authorization: Bearer {{authToken}}\` -> Extract \`orderId\`
5. \`GET /orders/{{orderId}}\` -> Verify order status is \`PAID\``,
        codeSnippet: {
          language: 'javascript',
          code: `// In "Tests" tab of Step 1 (Login):
const jsonData = pm.response.json();
pm.environment.set("authToken", jsonData.access_token);

// In "Tests" tab of Step 4 (Checkout):
const orderData = pm.response.json();
pm.environment.set("orderId", orderData.order.orderId);`,
        },
        takeaways: [
          'Request chaining allows testing full business lifecycles rather than isolated endpoints in a vacuum.',
        ],
        interviewTip: 'Interviewers love asking: "How do you automate a flow where Order ID is generated dynamically?" Explain request chaining with `pm.environment.set` and template syntax `{{orderId}}`.',
      },
      {
        title: '3. Data-Driven Testing and Collection Runners',
        summary: 'Executing a single test request with multiple data sets.',
        explanation: `**Data-Driven Testing (DDT):**
Instead of writing 10 identical tests for 10 different input scenarios, you supply a CSV or JSON data file containing test cases to the Postman Collection Runner.
Postman iterates through the collection, injecting row values from the data file into \`{{variables}}\`.
Example test iterations:
• Row 1: Valid input (expect 200)
• Row 2: Empty name (expect 400)
• Row 3: Negative price (expect 422)`,
        codeSnippet: {
          language: 'json',
          code: `[
  { "scenario": "Valid product", "name": "QA Guide", "price": 299, "expectedStatus": 201 },
  { "scenario": "Negative price", "name": "Invalid", "price": -50, "expectedStatus": 422 },
  { "scenario": "Missing name", "name": "", "price": 299, "expectedStatus": 400 }
]`,
        },
        takeaways: [
          'DDT reduces test code duplication and allows non-technical team members to expand test coverage via CSV spreadsheets.',
        ],
      },
      {
        title: '4. Test Repeatability and Environment Teardown',
        summary: 'Ensuring tests leave the system in a clean, reproducible state.',
        explanation: `A common QA pitfall is tests that pass on the first run but fail on the second run because test data was left behind (e.g. "Email already exists" error).
Best practices for repeatability:
1. Generate dynamic test data using timestamps:
   \`const testEmail = "qa.test." + Date.now() + "@example.com";\`
2. Include a **Teardown Step**: If a test creates a temporary product, the final request in the suite should send \`DELETE /v1/products/{{productId}}\` to clean up.`,
        codeSnippet: {
          language: 'javascript',
          code: `// Pre-Request Script: Generate unique dynamic email
const uniqueEmail = "student_" + Date.now() + "@rootaccess.org";
pm.environment.set("newUserEmail", uniqueEmail);`,
        },
        takeaways: [
          'Independent, self-contained tests that clean up their own state can run reliably in automated CI/CD pipelines.',
        ],
      },
    ],
    exercises: [
      {
        id: 'api-ex-4-1',
        title: 'Exercise 1: Step 1 of Workflow — Login & Extract Token',
        description: 'Authenticate and save access token dynamically into environment.',
        instruction: 'POST credentials to https://api.rootaccess.org/v1/auth/login and verify access_token is saved into {{authToken}}.',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/auth/login',
        initialBody: JSON.stringify({
          email: 'student@rootaccess.org',
          password: 'RootAccess@2026',
        }, null, 2),
        expectedStatus: 200,
        initialTestScript: `pm.test("Status is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Token extracted and saved to environment", function () {
    var data = pm.response.json();
    pm.expect(data.access_token).to.be.a("string");
    pm.environment.set("authToken", data.access_token);
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: 'Expected 200 OK login.' };
          return { success: true, feedback: 'Workflow Step 1 Complete: Auth token extracted and saved to {{authToken}}.' };
        },
        hints: ['Send student credentials to /v1/auth/login'],
      },
      {
        id: 'api-ex-4-2',
        title: 'Exercise 2: Step 2 of Workflow — Add Item to Shopping Cart',
        description: 'Post an item to cart using product ID 101.',
        instruction: 'Send a POST to https://api.rootaccess.org/v1/cart/items with productId 101 and quantity 1.',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/cart/items',
        initialBody: JSON.stringify({
          productId: 101,
          quantity: 1,
        }, null, 2),
        expectedStatus: 201,
        initialTestScript: `pm.test("Status is 201 Created", function () {
    pm.response.to.have.status(201);
});

pm.test("Item successfully added to cart", function () {
    var data = pm.response.json();
    pm.expect(data.cartItem.productId).to.eql(101);
});`,
        validate: (res) => {
          if (res.status !== 201) return { success: false, feedback: `Expected 201 Created, got ${res.status}.` };
          return { success: true, feedback: 'Workflow Step 2 Complete: Product 101 placed in shopping cart.' };
        },
        hints: ['Method: POST', 'Body: {"productId": 101, "quantity": 1}'],
      },
      {
        id: 'api-ex-4-3',
        title: 'Exercise 3: Step 3 of Workflow — Inspect Cart Total',
        description: 'Verify shopping cart contents and calculated order subtotal.',
        instruction: 'Send a GET request to https://api.rootaccess.org/v1/cart and assert cart totalAmount is 649.',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/cart',
        expectedStatus: 200,
        initialTestScript: `pm.test("Status is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Cart total is calculated accurately", function () {
    var data = pm.response.json();
    pm.expect(data.itemCount).to.be.above(0);
    pm.expect(data.totalAmount).to.be.above(0);
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: `Expected 200 OK, got ${res.status}.` };
          if (!res.data?.items?.length) return { success: false, feedback: 'Cart appears empty.' };
          return { success: true, feedback: 'Workflow Step 3 Complete: Cart item count and total verified.' };
        },
        hints: ['Target GET https://api.rootaccess.org/v1/cart'],
      },
      {
        id: 'api-ex-4-4',
        title: 'Exercise 4: Step 4 of Workflow — Checkout Order & Extract Order ID',
        description: 'Submit order with Bearer token and extract dynamic orderId.',
        instruction: 'Send a POST to https://api.rootaccess.org/v1/orders with header "Authorization: Bearer {{authToken}}". Extract order.orderId into {{orderId}}.',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/orders',
        headers: {
          Authorization: 'Bearer {{authToken}}',
        },
        expectedStatus: 201,
        initialTestScript: `pm.test("Order created with status 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Save dynamic orderId for step 5", function () {
    var data = pm.response.json();
    pm.expect(data.order.orderId).to.be.a("string");
    pm.expect(data.order.status).to.eql("PAID");
    pm.environment.set("orderId", data.order.orderId);
});`,
        validate: (res) => {
          if (res.status !== 201) return { success: false, feedback: `Expected 201 Created, got ${res.status}.` };
          if (!res.data?.order?.orderId) return { success: false, feedback: 'Missing orderId in response.' };
          return { success: true, feedback: 'Workflow Step 4 Complete: Order created! Order ID saved to {{orderId}}.' };
        },
        hints: ['Ensure Authorization: Bearer {{authToken}} header is set'],
      },
      {
        id: 'api-ex-4-5',
        title: 'Exercise 5: Step 5 of Workflow — Retrieve Order by Dynamic ID',
        description: 'Verify order persistence using the dynamically extracted {{orderId}}.',
        instruction: 'Send a GET request to https://api.rootaccess.org/v1/orders/{{orderId}} with your Bearer token and assert status is "PAID".',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/orders/{{orderId}}',
        headers: {
          Authorization: 'Bearer {{authToken}}',
        },
        expectedStatus: 200,
        initialTestScript: `pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Order details verify customer and payment status", function () {
    var data = pm.response.json();
    pm.expect(data.status).to.eql("PAID");
    pm.expect(data.totalAmount).to.be.above(0);
});`,
        validate: (res) => {
          if (res.status !== 200) return { success: false, feedback: `Expected 200 OK, got ${res.status}.` };
          if (res.data?.status !== 'PAID') return { success: false, feedback: 'Order status was not PAID.' };
          return { success: true, feedback: 'End-to-End Workflow Automated! Login -> Cart -> Checkout -> Order Verification passed with 100% assertions.' };
        },
        hints: ['Target URL: https://api.rootaccess.org/v1/orders/{{orderId}}'],
      },
    ],
    interviewQuestions: [
      {
        id: 'api-iq-4-1',
        question: 'How do you handle authentication tokens across dozens of requests in a Postman collection?',
        concept: 'Postman Collection Architecture',
        modelAnswer: 'Rather than manually pasting tokens into every single request: 1. I create an Auth request at the root of the collection with a test script that extracts `access_token` and saves it to `pm.environment.set("authToken", token)`. 2. In the Collection Settings, I configure Type: "Bearer Token" with Token: `{{authToken}}`. 3. All child requests in folders inherit authorization from parent, ensuring they automatically use the fresh token without manual intervention.',
        seniorTip: 'Mentioning Collection-Level Authorization Inheritance highlights that you write clean, scalable test suites.',
      },
      {
        id: 'api-iq-4-2',
        question: 'How do you prevent automated API test suites from leaving garbage records in staging databases?',
        concept: 'Test Data Management & Teardown',
        modelAnswer: 'I follow a 3-tier hygiene strategy: 1. Dynamic Data Generation: Generate unique keys using `Date.now()` or UUIDs to avoid colliding with existing records. 2. Automated Teardown Requests: Include a concluding DELETE request in the collection that runs after test assertions pass. 3. Database Sandbox Refresh: In CI/CD pipelines, execute automated seed and teardown migration scripts before and after test execution runs.',
        seniorTip: 'Cite both script-level teardowns (DELETE calls) and infrastructure-level teardowns (Docker DB wipe).',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q-api-4-1',
          question: 'What Postman syntax extracts a response property and stores it in an environment variable?',
          options: [
            'localStorage.setItem("key", value)',
            'pm.environment.set("key", value)',
            'pm.save("key", value)',
            'response.setVariable("key", value)',
          ],
          correctAnswerIndex: 1,
          explanation: '`pm.environment.set("key", value)` is the official Postman JavaScript API for persisting environment variables.',
        },
        {
          id: 'q-api-4-2',
          question: 'How do you reference an environment variable inside a Postman request URL or JSON body?',
          options: [
            '$variableName',
            '{{variableName}}',
            '[[variableName]]',
            '#variableName#',
          ],
          correctAnswerIndex: 1,
          explanation: 'Postman uses double curly braces `{{variableName}}` to interpolate variables in URLs, headers, and body payloads.',
        },
        {
          id: 'q-api-4-3',
          question: 'What is Request Chaining in automated API testing?',
          options: [
            'Encrypting HTTP requests using blockchain',
            'Extracting dynamic data from the response of Request 1 and passing it as input into Request 2',
            'Running 10 requests at the exact same millisecond',
            'Linking two servers with a physical Ethernet cable',
          ],
          correctAnswerIndex: 1,
          explanation: 'Request chaining passes dynamic output values (like auth tokens or generated IDs) from one request to subsequent requests in a test sequence.',
        },
        {
          id: 'q-api-4-4',
          question: 'What is the purpose of Pre-Request Scripts in Postman?',
          options: [
            'They run after the server sends a response',
            'They execute JavaScript logic BEFORE the request is dispatched over the network (e.g. generating dynamic timestamps or hashing signatures)',
            'They install new browsers',
            'They compress images',
          ],
          correctAnswerIndex: 1,
          explanation: 'Pre-request scripts run prior to request dispatch, making them ideal for setting up dynamic timestamps, generating random data, or computing signatures.',
        },
        {
          id: 'q-api-4-5',
          question: 'In Data-Driven Testing (DDT), what format is typically used to supply multiple test iterations?',
          options: ['MP4 or AVI', 'CSV or JSON file', 'PDF document', 'PNG screenshot'],
          correctAnswerIndex: 1,
          explanation: 'Postman Collection Runner accepts CSV or JSON data files to iterate test executions over multiple data rows.',
        },
      ],
    },
    summaryTakeaway: 'You have mastered collection organization, environment variable management, dynamic request chaining, data-driven execution, and test suite repeatability.',
  },

  // ================= DAY 5 =================
  {
    dayNumber: 5,
    title: 'Real-World QA Project and Interview Preparation',
    subtitle: 'Capstone e-commerce REST API test audit, seeded defect triage & technical interview preparation',
    badge: 'Day 5 • Capstone & Interview Mastery',
    duration: '3.0 Hours',
    objectives: [
      'Execute the Capstone Project: End-to-end e-commerce REST API defect audit across /auth, /products, /cart, and /orders',
      'Uncover 5 intentionally seeded QA defects using systematic positive and negative testing',
      'Identify business rule violations: negative cart quantities, price tampering, missing authorization, and unhandled 500 exceptions',
      'Generate a professional QA Test Summary and Defect Evidence Report',
      'Master the Top 10 Core API Testing Technical Interview Questions with model answers and evaluation rubrics',
    ],
    topics: [
      {
        title: '1. The Capstone Scenario: E-Commerce REST API Test Audit',
        summary: 'Auditing a pre-release e-commerce platform API for production-blocking bugs.',
        explanation: `**Project Context:**
Our platform team has built a staging version of the E-Commerce REST API with endpoints:
• \`POST /v1/auth/login\`
• \`GET, POST, PATCH, DELETE /v1/products\`
• \`GET /v1/cart\`, \`POST /v1/cart/items\`
• \`POST /v1/orders\`, \`GET /v1/orders/:id\`

The development team claims the API is ready for release.
However, QA has enabled **Defect Simulation Mode**. There are 5 critical defects hidden in the implementation:
1. **Defect 1 (Negative Cart Quantity):** \`POST /v1/cart/items\` allows adding negative quantities (\`quantity: -5\`) without validation!
2. **Defect 2 (Price Tampering Exploit):** \`POST /v1/cart/items\` blindly accepts client-supplied prices (\`price: 1\`) instead of looking up the catalog price!
3. **Defect 3 (Unhandled 500 on Empty Cart Checkout):** Submitting \`POST /v1/orders\` with an empty cart crashes with \`500 Internal Server Error\` instead of returning a clean \`400 Bad Request\`!
4. **Defect 4 (Broken Object-Level Authorization - IDOR):** \`GET /v1/orders/ORD-7001\` returns another customer's order without checking the user's Bearer token!
5. **Defect 5 (Spurious 200 OK on Delete):** \`DELETE /v1/products/99999\` returns \`200 OK\` on non-existent IDs instead of \`404 Not Found\`!`,
        codeSnippet: {
          language: 'json',
          code: `// Bug Reproduction Payload: Negative Quantity Exploit
// POST /v1/cart/items
{
  "productId": 101,
  "quantity": -5
}
// Expected: 422 Unprocessable Entity
// Actual Bug: 201 Created with negative item in cart!`,
        },
        takeaways: [
          'Systematic boundary testing and input tampering are essential to uncover security and business rule bypasses.',
        ],
      },
      {
        title: '2. Professional Defect Reporting for APIs',
        summary: 'Writing high-clarity Jira defect reports with reproducible cURL and JSON evidence.',
        explanation: `A high-quality API defect report must contain:
1. **Title:** Concise, specific issue description with HTTP method & endpoint.
   - Example: \`[API] POST /v1/cart/items accepts negative quantity resulting in credit balance\`
2. **Severity:** Critical (Blocks payments / Security exploit).
3. **Endpoint:** \`POST https://api.rootaccess.org/v1/cart/items\`
4. **Headers & Payload:** Exact JSON sent.
5. **Expected Result:** \`422 Unprocessable Entity\` with error message "Quantity must be >= 1".
6. **Actual Result:** \`201 Created\` with \`"quantity": -5\`.`,
        codeSnippet: {
          language: 'markdown',
          code: `### Defect Report Example:
**Issue:** Unhandled 500 Internal Server Error on Empty Checkout
**Endpoint:** POST /v1/orders
**Headers:** Authorization: Bearer <valid_token>
**Payload:** {}
**Expected:** 400 Bad Request ("Cart is empty")
**Actual:** 500 Internal Server Error ("NullPointerException at CheckoutService.java:142")`,
        },
        takeaways: [
          'Always attach the exact request body, headers, and response code to defect tickets.',
        ],
      },
    ],
    exercises: [
      {
        id: 'api-ex-5-1',
        title: 'Capstone Bug 1: Detect Negative Quantity Cart Exploit',
        description: 'Test whether the cart endpoint accepts invalid negative item quantities.',
        instruction: 'Enable Bug Mode and POST {"productId": 101, "quantity": -3} to https://api.rootaccess.org/v1/cart/items. Observe that the API erroneously accepts it!',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/cart/items',
        initialBody: JSON.stringify({
          productId: 101,
          quantity: -3,
        }, null, 2),
        expectedStatus: 201,
        initialTestScript: `// In a properly working API, this should return 422.
// In our bug audit, we assert that the bug exists (returns 201):
pm.test("BUG DETECTED: API accepted negative quantity!", function () {
    pm.response.to.have.status(201);
    var data = pm.response.json();
    pm.expect(data.cartItem.quantity).to.be.below(0);
});`,
        validate: (res) => {
          if (res.status === 201 && res.data?.cartItem?.quantity < 0) {
            return { success: true, feedback: 'Bug 1 Verified & Documented! API allows negative item quantities (-3), violating business validation rules.' };
          }
          return { success: false, feedback: 'Send quantity: -3 to reproduce the bug.' };
        },
        hints: ['Send {"productId": 101, "quantity": -3} to /v1/cart/items'],
      },
      {
        id: 'api-ex-5-2',
        title: 'Capstone Bug 2: Detect Price Tampering Exploit',
        description: 'Test whether the API allows the client to overwrite the server product price.',
        instruction: 'POST {"productId": 101, "quantity": 1, "price": 1} to https://api.rootaccess.org/v1/cart/items. Observe that the server accepts the tampered price of ₹1 instead of ₹649!',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/cart/items',
        initialBody: JSON.stringify({
          productId: 101,
          quantity: 1,
          price: 1,
        }, null, 2),
        expectedStatus: 201,
        initialTestScript: `pm.test("BUG DETECTED: API accepted client price tampering!", function () {
    pm.response.to.have.status(201);
    var data = pm.response.json();
    pm.expect(data.cartItem.price).to.eql(1);
});`,
        validate: (res) => {
          if (res.status === 201 && res.data?.cartItem?.price === 1) {
            return { success: true, feedback: 'Bug 2 Verified & Documented! Critical Security Defect: Client can tamper with item price and buy courses for ₹1!' };
          }
          return { success: false, feedback: 'Send {"productId": 101, "quantity": 1, "price": 1} to /v1/cart/items.' };
        },
        hints: ['Send {"productId": 101, "quantity": 1, "price": 1}'],
      },
      {
        id: 'api-ex-5-3',
        title: 'Capstone Bug 3: Detect Unhandled 500 on Empty Cart Checkout',
        description: 'Verify server crash when checkout is submitted with an empty shopping cart.',
        instruction: 'With an empty cart, send POST to https://api.rootaccess.org/v1/orders with Authorization: Bearer {{authToken}}. Observe the 500 Internal Server Error crash!',
        method: 'POST',
        endpoint: 'https://api.rootaccess.org/v1/orders',
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        expectedStatus: 500,
        initialTestScript: `pm.test("BUG DETECTED: 500 Internal Server Error thrown instead of 400 Bad Request", function () {
    pm.response.to.have.status(500);
    var data = pm.response.json();
    pm.expect(data.error).to.eql("Internal Server Error");
    pm.expect(data.exception).to.include("NullPointerException");
});`,
        validate: (res) => {
          if (res.status === 500) {
            return { success: true, feedback: 'Bug 3 Verified & Documented! Server threw unhandled 500 NullPointerException instead of clean 400 Bad Request.' };
          }
          return { success: false, feedback: 'Send POST /v1/orders with empty cart to reproduce the 500 crash.' };
        },
        hints: ['Send POST /v1/orders with Bearer header and empty cart'],
      },
      {
        id: 'api-ex-5-4',
        title: 'Capstone Bug 4: Detect IDOR Flaw on Orders Endpoint',
        description: 'Verify unauthorized access to another customer\'s order record.',
        instruction: 'Send GET to https://api.rootaccess.org/v1/orders/ORD-7001 WITHOUT an Authorization header. Observe that private customer data is leaked without authentication!',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/orders/ORD-7001',
        expectedStatus: 200,
        initialTestScript: `pm.test("BUG DETECTED: IDOR allows unauthorized access to private order", function () {
    pm.response.to.have.status(200);
    var data = pm.response.json();
    pm.expect(data.orderId).to.eql("ORD-7001");
    pm.expect(data.customerName).to.be.a("string");
});`,
        validate: (res) => {
          if (res.status === 200 && res.data?.orderId === 'ORD-7001') {
            return { success: true, feedback: 'Bug 4 Verified & Documented! High Severity IDOR vulnerability: Order ORD-7001 exposed to unauthenticated callers!' };
          }
          return { success: false, feedback: 'Send GET /v1/orders/ORD-7001 without authorization header.' };
        },
        hints: ['GET /v1/orders/ORD-7001 with no Auth header'],
      },
      {
        id: 'api-ex-5-5',
        title: 'Capstone Bug 5: Generate QA Test Summary Report',
        description: 'Compile findings into an official QA Test Execution and Defect Audit Summary.',
        instruction: 'Review the 4 verified defects and submit your final certification assessment for Day 5.',
        method: 'GET',
        endpoint: 'https://api.rootaccess.org/v1/products',
        expectedStatus: 200,
        initialTestScript: `pm.test("Final QA audit test suite complete", function () {
    pm.response.to.have.status(200);
});`,
        validate: (_res) => {
          return { success: true, feedback: 'Capstone Complete! All 4 critical defects verified with reproducible test evidence.' };
        },
        hints: ['Execute the final audit check'],
      },
    ],
    interviewQuestions: [
      {
        id: 'api-iq-5-1',
        question: 'What is API Testing, and why is it performed earlier than UI testing?',
        concept: 'The Test Pyramid & Shift-Left Testing',
        modelAnswer: 'API testing validates application logic, data contracts, and security directly at the API layer without relying on graphical user interfaces. It is performed earlier because of the Test Pyramid: API tests execute 10x to 100x faster than browser UI tests, are not brittle to frontend DOM changes, and enable "Shift-Left" testing where backend business logic is verified weeks before user interfaces are even built.',
        seniorTip: 'Always reference the Test Automation Pyramid (Unit -> API/Integration -> UI) and Shift-Left principles.',
      },
      {
        id: 'api-iq-5-2',
        question: 'What are the key differences between REST and SOAP architectures?',
        concept: 'REST vs SOAP Architecture',
        modelAnswer: 'REST is an architectural style based on HTTP, utilizing standard verbs (GET, POST, PUT, DELETE) and lightweight data formats like JSON. It is stateless and highly scalable. SOAP is a strict protocol based on XML messages wrapped in envelopes, typically relying on WSDL definitions for contract enforcement and WS-Security for enterprise compliance. REST is preferred for web and mobile APIs due to speed and simplicity, while SOAP is found in legacy banking and telecommunications.',
        seniorTip: 'Highlight that REST is an architectural style whereas SOAP is a formal protocol.',
      },
      {
        id: 'api-iq-5-3',
        question: 'How do you test a POST endpoint from scratch when receiving new API documentation?',
        concept: 'End-to-End POST Testing Strategy',
        modelAnswer: 'My 5-step strategy: 1. Positive Test: Send a complete, valid JSON payload with required and optional fields; assert `201 Created`, verify response structure and new resource ID. 2. Mandatory Field Validation: Omit each required field one-by-one; assert `400 Bad Request` with field-specific errors. 3. Data Type & Boundary Tests: Send negative numbers for amounts, strings for integers, and boundary lengths; assert `400` or `422`. 4. Authentication Check: Omit the auth token; assert `401 Unauthorized`. 5. Database / Persistence Check: Send a follow-up GET request using the created ID to confirm data was genuinely persisted.',
        seniorTip: 'Concluding with the follow-up GET verification proves you think end-to-end.',
      },
      {
        id: 'api-iq-5-4',
        question: 'How do you validate a dynamic response that changes every time (e.g. timestamps and random IDs)?',
        concept: 'Dynamic Value Assertions',
        modelAnswer: 'For dynamic fields where the exact value cannot be hardcoded: 1. Type and format assertions: Check that ID is a string or number (`pm.expect(data.id).to.be.a("string")`). 2. Pattern matching with RegEx: Verify UUID format (`pm.expect(data.id).to.match(/^[0-9a-f]{8}-.../i)`). 3. Timestamp recency check: Assert that the returned timestamp is within 5 seconds of the current system time (`Date.now()`).',
        seniorTip: 'Citing regular expression matching and recency deltas shows real automation experience.',
      },
      {
        id: 'api-iq-5-5',
        question: 'How do you structure a maintainable Postman collection for continuous CI/CD integration?',
        concept: 'CI/CD Automation with Newman',
        modelAnswer: 'I organize requests into modular folders by feature domain, configure shared authentication at the collection root, and parameterize environments using `{{baseUrl}}` and `{{authToken}}`. For CI/CD pipelines, I execute the collection headless using Newman (`newman run collection.json -e env.json -r cli,junit`), allowing tests to gate pull requests automatically before code is merged.',
        seniorTip: 'Mentioning Newman (the CLI runner for Postman) and JUnit XML reporting for CI/CD pipelines demonstrates full production capability.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q-api-5-1',
          question: 'According to the Test Automation Pyramid, why should there be more API tests than UI tests?',
          options: [
            'API tests are harder to write',
            'API tests execute substantially faster, are less brittle to UI styling changes, and catch business logic defects earlier',
            'UI tests are illegal in enterprise environments',
            'Postman requires more tests than Playwright',
          ],
          correctAnswerIndex: 1,
          explanation: 'API tests run in milliseconds without browser overhead, are resilient to visual changes, and validate core business logic early in development.',
        },
        {
          id: 'q-api-5-2',
          question: 'What is an Insecure Direct Object Reference (IDOR) bug in an API?',
          options: [
            'A broken Wi-Fi router',
            'A flaw where an endpoint returns another user\'s private record without verifying that the requesting user owns that object',
            'A syntax error in a JSON comma',
            'An unencrypted database password',
          ],
          correctAnswerIndex: 1,
          explanation: 'IDOR occurs when an API fails to enforce authorization checks between the authenticated caller and the requested resource identifier.',
        },
        {
          id: 'q-api-5-3',
          question: 'If an API accepts `quantity: -5` in a shopping cart request and succeeds with 201 Created, what type of defect is this?',
          options: [
            'A network timeout',
            'A business rule validation flaw (Negative Input Vulnerability)',
            'An invalid SSL certificate',
            'A hardware failure',
          ],
          correctAnswerIndex: 1,
          explanation: 'Accepting negative quantities is a business logic flaw that can result in negative billing balances or unauthorized credits.',
        },
        {
          id: 'q-api-5-4',
          question: 'Which tool allows running Postman collections headlessly directly inside GitHub Actions CI/CD pipelines?',
          options: ['Selenium', 'Newman', 'Docker Compose', 'Swagger Editor'],
          correctAnswerIndex: 1,
          explanation: 'Newman is the official command-line collection runner for Postman that integrates into continuous integration pipelines.',
        },
        {
          id: 'q-api-5-5',
          question: 'What is the recommended assertion to verify that a created user object contains an email property with an "@" symbol?',
          options: [
            'pm.expect(data.email).to.include("@");',
            'pm.response.to.have.email("@");',
            'pm.expect("@").to.be.email;',
            'pm.status("@");',
          ],
          correctAnswerIndex: 0,
          explanation: '`pm.expect(data.email).to.include("@")` verifies that the string property contains the requisite character.',
        },
      ],
    },
    summaryTakeaway: 'Congratulations on completing the 5-Day Practical API Testing Course! You have demonstrated practical competence in HTTP protocols, JSON validation, Postman test scripting, security audits, request chaining, and end-to-end e-commerce QA defect triage.',
  },
];
