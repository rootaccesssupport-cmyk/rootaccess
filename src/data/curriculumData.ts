import type { Course, SimulatedBug } from '../types/curriculum';

export const COURSES: Course[] = [
  {
    id: 'course-manual-qa',
    slug: 'manual-qa-fundamentals',
    trackId: 'track-manual-qa',
    trackName: 'Manual QA & Defect Life Cycle',
    title: 'Manual Testing & Defect Life Cycle Masterclass',
    description: 'Master practical test case design, Equivalence Partitioning, Boundary Value Analysis, and industry-standard Jira defect logging.',
    iconName: 'BookOpen',
    badge: 'Core Track',
    estimatedHours: 8,
    learningOutcomes: [
      'Write exhaustive, professional test cases using industry templates',
      'Apply Boundary Value Analysis (BVA) and Equivalence Partitioning (EP) to spot edge-case bugs',
      'Log clear, reproducible Jira bug reports with appropriate Severity and Priority levels',
      'Execute Smoke, Sanity, Regression, and Retesting verification cycles with confidence',
    ],
    lessons: [
      {
        id: 'lesson-stlc-fundamentals',
        slug: 'stlc-fundamentals',
        title: 'Software Testing Life Cycle (STLC) & Modern QA Workflows',
        durationMinutes: 25,
        difficulty: 'Beginner',
        summary: 'Understand the distinct phases of the STLC, from requirements analysis to test closure, and how QA fits into modern Agile/Scrum teams.',
        sections: [
          {
            title: '1. What is the Software Testing Life Cycle (STLC)?',
            content: 'The Software Testing Life Cycle (STLC) is a systematic sequence of phases executed during testing to guarantee software quality. Unlike the SDLC (Software Development Life Cycle) which encompasses system inception, architecture, and coding, STLC is dedicated exclusively to test preparation, test design, execution, defect management, and sign-off.',
            callout: {
              type: 'info',
              title: 'Industry Insight',
              text: 'In modern Sprint teams, QA begins during the Requirements Analysis phase before any code is written. Identifying ambiguities in user stories prevents 60% of costly downstream bugs.',
            },
          },
          {
            title: '2. The 6 Core Phases of STLC',
            content: 'Every standard QA cycle follows these 6 milestones:\n\n1. **Requirement Analysis:** QA reviews User Stories and Acceptance Criteria (AC). In sprint planning, ask clarifying questions (e.g. "What should happen if the user enters 0 or negative numbers?").\n2. **Test Planning:** The QA Lead defines the Test Strategy, scope, resources, tools (Jira, Postman, Playwright), and schedule.\n3. **Test Case Development:** Writing detailed test conditions, prerequisites, step-by-step procedures, and expected outcomes.\n4. **Test Environment Setup:** Configuring staging, test databases, and test user credentials.\n5. **Test Execution & Bug Reporting:** Running tests, comparing actual vs expected results, and filing defect tickets.\n6. **Test Closure & Retrospective:** Calculating defect density, pass rates, and producing the QA Sign-off report.',
          },
          {
            title: '3. Real-world Agile Scenario',
            content: 'During sprint grooming, Product presents this user story:\n\n"As a shopper, I want to apply a 20% discount coupon at checkout."\n\nAs a QA Engineer, you immediately challenge boundary cases:\n• Can the coupon be stacked with promotional sale items?\n• What happens if the coupon value exceeds the cart subtotal?\n• What if the user submits the coupon with leading/trailing spaces?\n• Can a coupon code be reused if the order fails payment processing?',
            codeSnippet: {
              language: 'gherkin',
              code: `Scenario: Apply valid discount coupon on cart
  Given a user has 3 items in the cart totaling $100.00
  When the user applies coupon code "SAVE20"
  Then a 20% discount of $20.00 is deducted
  And the updated order total reflects $80.00
  And a success badge "Coupon SAVE20 Applied (-$20.00)" appears`,
            },
          },
        ],
        keyTakeaways: [
          'STLC runs concurrently with SDLC to catch bugs before code reaches production.',
          'Early QA involvement during sprint grooming is 10x cheaper than fixing bugs in production.',
          'Always evaluate both Positive flows (happy path) and Negative flows (error paths).',
        ],
        practicalChecklist: [
          'Read acceptance criteria thoroughly before writing test steps',
          'Identify missing error states in design wireframes',
          'Prepare required test data in staging prior to execution',
          'Verify test environment connectivity and seed data',
        ],
      },
      {
        id: 'lesson-test-case-design',
        slug: 'test-case-design-bva-ep',
        title: 'Test Design Techniques: Boundary Value Analysis & Equivalence Partitioning',
        durationMinutes: 35,
        difficulty: 'Intermediate',
        summary: 'Learn the two most important mathematical test design techniques used by senior QA engineers to catch edge-case bugs with minimum test cases.',
        sections: [
          {
            title: '1. Equivalence Partitioning (EP)',
            content: 'Equivalence Partitioning divides the input domain into valid and invalid classes. The fundamental hypothesis is that if one value from a class fails or passes, all values in that same partition will behave identically. This eliminates redundant repetitive tests while ensuring full coverage.',
            callout: {
              type: 'tip',
              title: 'Best Practice',
              text: 'Always test at least ONE valid partition value and ONE value from EACH invalid partition.',
            },
          },
          {
            title: '2. Boundary Value Analysis (BVA)',
            content: 'Empirical research proves that majority of software errors occur at the boundaries of input ranges (e.g., using > instead of >= in source code). BVA focuses strictly on the boundaries:\n• Minimum value (Min)\n• Just below minimum (Min - 1)\n• Just above minimum (Min + 1)\n• Maximum value (Max)\n• Just below maximum (Max - 1)\n• Just above maximum (Max + 1)',
            codeSnippet: {
              language: 'text',
              code: `Specification: User Age field must accept 18 to 65 years.

Equivalence Partitions:
• Invalid Partition 1: Age < 18 (e.g. 10)
• Valid Partition:     18 <= Age <= 65 (e.g. 35)
• Invalid Partition 2: Age > 65 (e.g. 72)

Boundary Value Test Cases:
• 17  (Min - 1)  -> Invalid (Expect error: "Must be 18+")
• 18  (Min)      -> Valid
• 19  (Min + 1)  -> Valid
• 64  (Max - 1)  -> Valid
• 65  (Max)      -> Valid
• 66  (Max + 1)  -> Invalid (Expect error: "Must be 65 or younger")`,
            },
          },
          {
            title: '3. Common Real-world Boundary Bugs',
            content: 'Common bugs uncovered by BVA in web applications:\n1. **Shopping Cart Quantity:** Entering 0 or negative numbers in quantity input crashes the cart or generates credit refunds!\n2. **Text Field Limits:** A description field specified for max 255 characters throws an unhandled 500 SQL error when exactly 256 characters are pasted.\n3. **Password Length:** Password requiring 8 characters accepts 7 due to whitespace trimming flaws.',
            callout: {
              type: 'interview',
              title: 'Favorite Interview Question',
              text: '"Why is Boundary Value Analysis more effective than random ad-hoc testing?" Answer: Because developers most frequently make off-by-one errors (off-by-one comparisons in loop conditions and validation if-statements).',
            },
          },
        ],
        keyTakeaways: [
          'EP categorizes inputs into equivalence classes to reduce total test combinations.',
          'BVA focuses on the exact transition points where software logic flips from valid to invalid.',
          'Testing (Min - 1), Min, Max, and (Max + 1) catches 80% of input validation defects.',
        ],
        practicalChecklist: [
          'Identify the numerical or character boundaries for all form inputs',
          'Test empty string, single character, and maximum allowed length',
          'Include zero, negative numbers, and floating points in numeric inputs',
          'Document expected error message strings for all boundary failures',
        ],
        interactiveLabId: 'checkout-bug-hunt',
      },
      {
        id: 'lesson-jira-bug-reporting',
        slug: 'jira-bug-reporting',
        title: 'Workplace Defect Logging: Jira Bug Report Standards',
        durationMinutes: 30,
        difficulty: 'Intermediate',
        summary: 'Learn how to write crisp, irreproachable bug reports in Jira that developers love. Master Severity vs Priority distinctions.',
        sections: [
          {
            title: '1. What Makes a World-Class Bug Report?',
            content: 'A poorly written bug report leads to endless developer back-and-forth, rejection, or delays. A great bug report gives the developer everything they need to reproduce and fix the defect within minutes without asking questions.',
          },
          {
            title: '2. Standard Jira Bug Template',
            content: 'Every production defect should include these exact fields:\n\n• **Title / Summary:** Concise, specific, and stating WHAT, WHERE, and UNDER WHAT CONDITION.\n• **Environment:** OS, Browser version, Device, App Build / Git commit, Test Account role.\n• **Preconditions:** Necessary state before beginning reproduction steps.\n• **Steps to Reproduce (STR):** Numbered, crystal-clear steps from start to finish.\n• **Expected Result:** What the specification says should happen.\n• **Actual Result:** What actually occurred (including error codes or UI glitch).\n• **Attachments:** Screenshot with red markup, video recording (.mp4), console log, or network HAR file.',
            codeSnippet: {
              language: 'markdown',
              code: `### Bug Title
[Checkout] Applying coupon 'SAVE50' on order under $50 causes negative total

### Severity & Priority
Severity: Critical (Data & Financial calculation flaw)
Priority: High (Blocks checkout launch)

### Environment
OS: macOS Sonoma 14.5 | Browser: Chrome 125.0 | Staging Build: v2.4.1

### Preconditions
- User is logged in as standard customer
- Cart contains 1 item: "Wireless Mouse" ($35.00)

### Steps to Reproduce
1. Navigate to /cart and click "Proceed to Checkout"
2. In the "Discount Code" field, enter "SAVE50"
3. Click "Apply Coupon"
4. Observe the order summary table

### Expected Result
System displays error banner: "Coupon requires minimum purchase of $50.00"
Order subtotal remains $35.00.

### Actual Result
Coupon is accepted. Total calculation shows: $35.00 - $50.00 = -$15.00.
"Place Order" button enables, allowing customer to complete checkout for $0.00.`,
            },
          },
          {
            title: '3. Severity vs Priority: The Golden Rule',
            content: '• **Severity (Technical Impact):** How damaging the bug is to the system operation (Blocker, Critical, Major, Minor).\n• **Priority (Business Urgency):** How quickly the business needs the bug resolved (P0 - Immediate, P1 - High, P2 - Medium, P3 - Low).\n\nExamples:\n- **High Severity, Low Priority:** Application crashes when generating a legacy annual report that is only run on December 31st.\n- **Low Severity, High Priority:** Company logo is upside down on the home landing page during a major press release launch.',
          },
        ],
        keyTakeaways: [
          'Titles must follow: [Feature/Component] Specific failure description under condition.',
          'Steps to reproduce must be numbered, deterministic, and start from a clean state.',
          'Severity is determined by technical impact; Priority is determined by business urgency.',
        ],
        practicalChecklist: [
          'Verify the bug reproduces consistently on the latest staging build',
          'Attach browser console logs or network inspection payloads',
          'Double check that the bug is not a duplicate before submitting',
        ],
        interactiveLabId: 'checkout-bug-hunt',
      },
      {
        id: 'lesson-agile-qa-workflows',
        slug: 'agile-qa-workflows',
        title: 'Agile QA Workflows & Sprint Ceremonies',
        durationMinutes: 30,
        difficulty: 'Intermediate',
        summary: 'Navigate the QA engineer role inside Agile & Scrum sprints: User story analysis, acceptance criteria ambiguities, daily stand-ups, and sprint sign-off.',
        sections: [
          {
            title: '1. The QA Engineer in Agile & Scrum',
            content: 'In modern Agile software delivery, QA is embedded directly inside cross-functional squads rather than acting as a late-stage bottleneck. QA participates actively in Sprint Planning, Daily Stand-ups, Backlog Refinement, and Sprint Retrospectives.',
          },
          {
            title: '2. Challenging User Stories & Acceptance Criteria',
            content: 'A User Story follows the format: "As a [persona], I want [feature] so that [benefit]". QA critically analyzes the Acceptance Criteria (AC) for unstated boundary conditions, session timeouts, and exception handling before developers write a single line of code.',
          },
        ],
        keyTakeaways: [
          'Shift-left testing in Sprint Planning prevents up to 60% of downstream defects.',
          'Always clarify missing error flows and edge conditions in user stories.',
          'The Definition of Done (DoD) requires QA verification before story closure.',
        ],
        practicalChecklist: [
          'Review user story acceptance criteria during sprint backlog grooming',
          'Identify missing error states and fallback behaviors',
          'Document test charters for timeboxed exploratory testing',
        ],
      },
      {
        id: 'lesson-test-execution-regression',
        slug: 'test-execution-regression',
        title: 'Test Execution, Retesting & Final Certification Assessment',
        durationMinutes: 35,
        difficulty: 'Advanced',
        summary: 'Execute structured test cycles, distinguish Retesting from Regression Testing, perform Smoke & Sanity checks, and produce stakeholder Test Summary Reports.',
        sections: [
          {
            title: '1. Test Execution Cycles & Defect Verification',
            content: 'When a new software build arrives in staging, QA performs Smoke Testing to verify overall stability. After developers mark bug tickets as Fixed, QA performs Retesting on the specific defect and Regression Testing across unchanged modules.',
          },
          {
            title: '2. Test Closure & Sign-Off Reports',
            content: 'The Test Summary Report provides engineering leadership and product managers with actionable data to make informed Go / No-Go production release decisions.',
          },
        ],
        keyTakeaways: [
          'Retesting verifies the bug fix; Regression testing protects against unintended regressions.',
          'Smoke testing verifies build stability; Sanity testing verifies specific functionality post-fix.',
          'A formal Test Summary Report documents pass rates and residual release risks.',
        ],
        practicalChecklist: [
          'Execute smoke tests on new staging deployment',
          'Retest verified defect fixes using original steps to reproduce',
          'Run regression test suite before production release sign-off',
        ],
      },
    ],
    quiz: {
      id: 'quiz-manual-qa',
      title: 'Manual QA & Defect Life Cycle Certification Quiz',
      passingScorePercent: 75,
      questions: [
        {
          id: 'q1',
          question: 'If a text input accepts between 5 and 20 characters, which set of input lengths represents complete Boundary Value Analysis (BVA)?',
          options: [
            '5, 10, 15, 20',
            '4, 5, 6, 19, 20, 21',
            '1, 5, 20, 100',
            '0, 5, 20, 25',
          ],
          correctAnswerIndex: 1,
          explanation: 'BVA tests boundaries (Min and Max) along with values immediately adjacent to them: (Min - 1) = 4, Min = 5, (Min + 1) = 6, (Max - 1) = 19, Max = 20, and (Max + 1) = 21.',
        },
        {
          id: 'q2',
          question: 'Which of the following scenarios best illustrates high Severity but low Priority?',
          options: [
            'A spelling typo on the public homepage hero banner during a marketing launch',
            'The "Submit Payment" button crashes the entire browser tab for 100% of users',
            'A rare database dead-lock crash that only triggers during annual financial year-end archiving in December',
            'A minor color mismatch on a secondary button in the footer',
          ],
          correctAnswerIndex: 2,
          explanation: 'A system crash is high severity (destructive technical impact), but if it only affects an annual background job 8 months away, its immediate business priority is low compared to customer-facing checkout issues.',
        },
        {
          id: 'q3',
          question: 'In the Software Testing Life Cycle (STLC), when should test case preparation ideally begin?',
          options: [
            'After developers have finished 100% of the code and deployed to production',
            'During the Requirement Analysis and Test Design phases, before coding completes',
            'Only after user complaints are logged in production',
            'During system decommissioning',
          ],
          correctAnswerIndex: 1,
          explanation: 'In modern Agile STLC, test design begins as soon as requirements/user stories are groomed. This shifts testing left and allows QA to catch ambiguities early.',
        },
        {
          id: 'q4',
          question: 'What is the primary difference between Regression Testing and Retesting?',
          options: [
            'Retesting checks if a specific reported bug has been fixed; Regression testing ensures the bug fix did not break existing unchanged functionality.',
            'Retesting is performed by developers; Regression testing is performed by business analysts.',
            'Regression testing only runs on mobile devices; Retesting runs on desktop.',
            'There is no difference; they are identical terms.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Retesting verifies that the defect fix actually solved the defect. Regression testing runs a suite of existing test cases to confirm that recent code changes did not cause unintended side-effects.',
        },
      ],
    },
  },
  {
    id: 'course-sql-qa',
    slug: 'sql-for-qa-engineers',
    trackId: 'track-sql',
    trackName: 'SQL & Database Audits',
    title: 'SQL & Backend Database Audits for QA Engineers',
    description: 'Learn to verify backend data integrity, write multi-table JOINs, detect orphaned records, and validate database transactions during API and UI testing.',
    iconName: 'Database',
    badge: 'Backend Track',
    estimatedHours: 6,
    learningOutcomes: [
      'Write production-grade SQL queries to verify frontend transactions against database tables',
      'Use INNER, LEFT, and RIGHT JOINs to detect missing or orphaned foreign key records',
      'Identify NULL edge cases, duplicate entries, and timestamp inconsistencies in staging databases',
      'Audit user balances, inventory decrements, and status state changes using aggregate functions',
    ],
    lessons: [
      {
        id: 'lesson-sql-verification',
        slug: 'sql-data-verification',
        title: 'Verifying Frontend Transactions Against Relational Tables',
        durationMinutes: 30,
        difficulty: 'Beginner',
        summary: 'Learn how to inspect the database after submitting a UI form or calling a payment endpoint to confirm true persistence.',
        sections: [
          {
            title: '1. Why Frontend Verification is Not Enough',
            content: 'A common mistake rookie QA testers make is assuming that a green "Success!" banner on the UI means the operation succeeded. In reality, modern applications often have backend disconnects:\n• Frontend state updates optimistically, but the database write fails.\n• Foreign keys are inserted as NULL due to asynchronous race conditions.\n• Status columns remain "PENDING" instead of transitioning to "COMPLETED".',
          },
          {
            title: '2. Core Verification Queries',
            content: 'When testing a checkout flow, execute verification queries against the orders and order_items tables:',
            codeSnippet: {
              language: 'sql',
              code: `-- Verify that order was created with status 'PAID' and correct amount
SELECT 
    id, 
    customer_id, 
    total_amount, 
    discount_amount, 
    payment_status, 
    created_at
FROM orders
WHERE customer_id = 'cust_8492'
ORDER BY created_at DESC
LIMIT 1;

-- Verify line items decrement inventory
SELECT 
    p.id AS product_id,
    p.name,
    p.stock_quantity,
    oi.quantity AS ordered_qty
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE oi.order_id = 'ord_10293';`,
            },
          },
        ],
        keyTakeaways: [
          'Always verify both UI feedback and backend database state.',
          'Check that inventory, balance, and state flags reflect the transaction accurately.',
          'Confirm timestamps use UTC and are ordered properly.',
        ],
        practicalChecklist: [
          'Query newly created records by ID immediately after UI submission',
          'Check for unexpected NULL values in non-nullable business fields',
          'Verify related table rows via foreign key lookups',
        ],
      },
      {
        id: 'lesson-sql-joins-orphans',
        slug: 'sql-joins-and-orphaned-records',
        title: 'Multi-Table JOINs & Finding Orphaned Data Defects',
        durationMinutes: 35,
        difficulty: 'Intermediate',
        summary: 'Master SQL JOIN techniques to uncover referential integrity flaws and orphaned records in staging environments.',
        sections: [
          {
            title: '1. Finding Orphaned Records with LEFT JOIN',
            content: 'Orphaned records occur when a child table points to a non-existent parent row. For instance, an order_item referencing a deleted product_id. This causes silent crashes in production analytics.',
            codeSnippet: {
              language: 'sql',
              code: `-- Find all order items where the associated product no longer exists
SELECT 
    oi.id AS order_item_id,
    oi.order_id,
    oi.product_id
FROM order_items oi
LEFT JOIN products p ON oi.product_id = p.id
WHERE p.id IS NULL;`,
            },
          },
          {
            title: '2. Auditing Duplicates with GROUP BY & HAVING',
            content: 'Testing user registration or payment idempotency requires checking that duplicate records were not erroneously inserted:',
            codeSnippet: {
              language: 'sql',
              code: `-- Find duplicate transactions generated within the same second
SELECT 
    customer_id, 
    amount, 
    COUNT(*) AS duplicate_count
FROM transactions
GROUP BY customer_id, amount, DATE_TRUNC('second', created_at)
HAVING COUNT(*) > 1;`,
            },
          },
        ],
        keyTakeaways: [
          'LEFT JOIN with WHERE parent.id IS NULL reveals orphaned data.',
          'GROUP BY with HAVING COUNT(*) > 1 is essential for duplicate payment testing.',
          'Database audits reveal edge cases invisible to the browser UI.',
        ],
        practicalChecklist: [
          'Run foreign key orphan checks after deletion and refund test cases',
          'Inspect transaction tables for duplicate charges during network timeout simulations',
        ],
      },
    ],
    quiz: {
      id: 'quiz-sql-qa',
      title: 'SQL for QA Engineers Certification Quiz',
      passingScorePercent: 75,
      questions: [
        {
          id: 'q1',
          question: 'Which SQL statement will correctly identify orders that have NO matching payments in the payments table?',
          options: [
            'SELECT * FROM orders INNER JOIN payments ON orders.id = payments.order_id;',
            'SELECT * FROM orders LEFT JOIN payments ON orders.id = payments.order_id WHERE payments.id IS NULL;',
            'SELECT * FROM orders CROSS JOIN payments;',
            'SELECT COUNT(*) FROM orders WHERE status = "PAID";',
          ],
          correctAnswerIndex: 1,
          explanation: 'A LEFT JOIN includes all rows from orders. When combined with WHERE payments.id IS NULL, it filters down to only orders where no matching row was found in payments.',
        },
        {
          id: 'q2',
          question: 'When validating database transactions during test execution, what should you verify regarding NULL values?',
          options: [
            'Ensure every column in every table is NULL',
            'Verify that columns with required business logic (like customer_id or total_price) are NOT NULL',
            'Delete all rows that contain NULL',
            'Ignore NULL values completely',
          ],
          correctAnswerIndex: 1,
          explanation: 'Business-critical fields should never be silently populated with NULL values due to backend serialization or mapping glitches.',
        },
        {
          id: 'q3',
          question: 'What is the purpose of the HAVING clause in SQL queries used by QA testers?',
          options: [
            'To order the final result set alphabetically',
            'To filter aggregated groups created by GROUP BY (e.g. HAVING COUNT(*) > 1 to detect duplicates)',
            'To create new database indexes',
            'To drop corrupt database schemas',
          ],
          correctAnswerIndex: 1,
          explanation: 'HAVING filters aggregated grouped results, making it the standard tool for detecting duplicate records and audit anomalies.',
        },
      ],
    },
  },
  {
    id: 'course-api-testing',
    slug: 'api-testing-postman',
    trackId: 'track-api',
    trackName: 'API Testing & Postman',
    title: 'API Testing & Automation with Postman',
    description: 'Learn REST API architectures, request parameterization, Bearer token authentication, status codes, and writing automated Chai assertion scripts in Postman.',
    iconName: 'Send',
    badge: 'API Track',
    estimatedHours: 7,
    learningOutcomes: [
      'Understand HTTP methods (GET, POST, PUT, PATCH, DELETE) and HTTP status codes (2xx, 4xx, 5xx)',
      'Construct automated test scripts using Postman and Chai assertion library (pm.test, pm.expect)',
      'Extract dynamic response values (JWT tokens, resource IDs) and save them into environment variables',
      'Test edge cases: expired tokens, invalid payloads, SQL injection parameters, and rate limiting',
    ],
    lessons: [
      {
        id: 'lesson-rest-http-basics',
        slug: 'rest-http-status-codes',
        title: 'HTTP Methods, Status Codes & Request Payloads',
        durationMinutes: 25,
        difficulty: 'Beginner',
        summary: 'Deep dive into REST API architecture, request headers, query vs path parameters, and HTTP response codes.',
        sections: [
          {
            title: '1. The Anatomy of an HTTP Request',
            content: 'An API request consists of:\n1. **Method:** GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove).\n2. **Endpoint URL:** Base URL + Path (e.g. `https://api.rootaccess.org/v1/students/123`).\n3. **Headers:** Metadata like `Content-Type: application/json` and `Authorization: Bearer <token>`.\n4. **Parameters:** Query parameters (`?status=active&limit=10`) or Path parameters (`/students/{id}`).\n5. **Body (Payload):** JSON data payload sent with POST, PUT, or PATCH requests.',
          },
          {
            title: '2. HTTP Status Codes Every QA Engineer Must Know',
            content: '• **200 OK:** Request succeeded.\n• **201 Created:** New resource successfully created (standard for POST).\n• **204 No Content:** Operation succeeded, no body returned (common for DELETE).\n• **400 Bad Request:** Client sent invalid JSON schema or missing required fields.\n• **401 Unauthorized:** Missing or invalid authentication token.\n• **403 Forbidden:** Authenticated user lacks permission to access resource.\n• **404 Not Found:** Resource endpoint does not exist.\n• **422 Unprocessable Entity:** Payload syntactically valid JSON, but fails business rules.\n• **500 Internal Server Error:** Unhandled server exception (always a bug!).',
          },
        ],
        keyTakeaways: [
          'POST should return 201 Created with the new resource ID in the response body.',
          'Never accept a 200 OK status when the response body contains an error message (anti-pattern).',
          '500 Internal Server Error indicates an unhandled backend exception that requires a bug report.',
        ],
        practicalChecklist: [
          'Verify that sending empty body to POST returns 400 Bad Request',
          'Verify that requesting non-existent ID returns 404 Not Found',
          'Confirm sensitive information (passwords, tokens) is never exposed in error responses',
        ],
      },
      {
        id: 'lesson-postman-assertions',
        slug: 'postman-automated-assertions',
        title: 'Writing Automated Postman Assertions with Chai',
        durationMinutes: 35,
        difficulty: 'Intermediate',
        summary: 'Write test scripts in Postman to assert status codes, response time, JSON schema validation, and header security.',
        sections: [
          {
            title: '1. Writing Postman Tests using pm.test and pm.expect',
            content: 'In Postman, the "Tests" tab allows you to execute JavaScript assertions immediately after the response arrives.',
            codeSnippet: {
              language: 'javascript',
              code: `// Test 1: Validate Status Code is 200 OK
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

// Test 2: Verify Response Time is acceptable for SLAs
pm.test("Response time is under 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Test 3: Validate JSON Schema and Field Values
pm.test("User object contains expected fields", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("object");
    pm.expect(jsonData.id).to.be.a("string");
    pm.expect(jsonData.email).to.include("@");
    pm.expect(jsonData.isActive).to.eql(true);
});

// Test 4: Save JWT Token into Environment Variable
pm.test("Save auth token for chained requests", function () {
    const jsonData = pm.response.json();
    pm.environment.set("authToken", jsonData.access_token);
});`,
            },
          },
        ],
        keyTakeaways: [
          'Use pm.response.to.have.status() for response code verification.',
          'Validate response times against company performance SLAs.',
          'Chain API requests by saving response tokens into Postman environment variables.',
        ],
        practicalChecklist: [
          'Add status code test to all requests in the collection',
          'Assert exact data types (string, number, boolean, array)',
          'Verify negative tests return expected error messages',
        ],
      },
    ],
    quiz: {
      id: 'quiz-api-testing',
      title: 'API Testing & Postman Certification Quiz',
      passingScorePercent: 75,
      questions: [
        {
          id: 'q1',
          question: 'What is the appropriate HTTP status code when an authenticated user attempts to access an admin-only resource without admin rights?',
          options: [
            '401 Unauthorized',
            '403 Forbidden',
            '404 Not Found',
            '500 Server Error',
          ],
          correctAnswerIndex: 1,
          explanation: '401 means unauthenticated (missing or invalid credentials). 403 Forbidden means authenticated, but not authorized/allowed to perform the action.',
        },
        {
          id: 'q2',
          question: 'In Postman, how do you dynamically pass a value received in Request A to subsequent Request B?',
          options: [
            'Write it down on paper and type it manually each time',
            'Save it in an environment variable using pm.environment.set("key", value)',
            'You cannot pass values between requests in Postman',
            'Hardcode it in the global settings file',
          ],
          correctAnswerIndex: 1,
          explanation: 'Postman environment variables allow storing dynamic tokens and IDs from one response to use in {{variableName}} templates in subsequent requests.',
        },
        {
          id: 'q3',
          question: 'An API endpoint returns HTTP 200 OK, but the response body is {"status": "error", "message": "Database connection timeout"}. Is this correct REST API behavior?',
          options: [
            'Yes, any response received from a server should always be 200 OK',
            'No, this is an anti-pattern. If a server error occurred, the HTTP status code should be 5xx (e.g. 500 or 503).',
            'Yes, status codes are only for browser clients, not APIs',
            'It depends on whether it is daytime or nighttime',
          ],
          correctAnswerIndex: 1,
          explanation: 'Hiding server errors behind a 200 OK status confuses client libraries, monitoring systems, and automated test frameworks. Errors must emit appropriate 4xx or 5xx codes.',
        },
      ],
    },
  },
  {
    id: 'course-playwright',
    slug: 'playwright-automation',
    trackId: 'track-automation',
    trackName: 'Web Automation (Playwright)',
    title: 'Playwright Automation with JavaScript + AI',
    description: 'Master modern browser automation using pure JavaScript and AI-assisted engineering. Learn reliable locators, auto-waiting, Page Object Models, and flaky test mitigation across 20 daily milestones.',
    iconName: 'Code2',
    badge: '20-Day Masterclass',
    estimatedHours: 20,
    learningOutcomes: [
      'Write robust end-to-end tests using Playwright Test Runner and pure JavaScript',
      'Use user-facing locators (getByRole, getByLabel, getByText) recommended by W3C standards',
      'Leverage Playwright auto-waiting to eliminate arbitrary sleep timers and flaky test failures',
      'Structure test suites with the Page Object Model (POM) pattern for high maintainability',
      'Leverage AI tools for resilient locator generation, diagnostic analysis, and test optimization',
      'Understand Chrome DevTools Protocol (CDP) WebSocket architecture vs HTTP JSON Wire',
    ],
    lessons: [
      {
        id: 'lesson-playwright-day-1',
        slug: 'day-1-automation-fundamentals',
        title: 'Day 1: Automation Testing & Playwright Fundamentals',
        durationMinutes: 120,
        difficulty: 'Beginner',
        summary: 'Explore core automation concepts, manual vs automation trade-offs, Playwright architecture vs Selenium, and the 20-day course roadmap.',
        sections: [
          {
            title: '1. Why Automation Testing Matters',
            content: 'Automation testing executes repeatable test suites with speed and precision, protecting regression baselines and enabling rapid CI/CD releases.',
          },
          {
            title: '2. Playwright WebSocket Architecture',
            content: 'Playwright communicates directly with Chromium, Firefox, and WebKit browser engines over a single bidirectional WebSocket connection using Chrome DevTools Protocol (CDP).',
          },
        ],
        keyTakeaways: [
          'Automation provides fast regression feedback but does not eliminate exploratory testing.',
          'Playwright uses single WebSocket connection for blazing fast execution without external drivers.',
        ],
        practicalChecklist: [
          'Read all 5 core topics',
          'Complete candidate classification assignment',
          'Review interview question bank',
          'Pass Day 1 checkpoint quiz',
        ],
      },
      {
        id: 'lesson-playwright-day-2',
        slug: 'day-2-javascript-essentials',
        title: 'Day 2: JavaScript Essentials for Test Automation',
        durationMinutes: 150,
        difficulty: 'Beginner',
        summary: 'Master JavaScript variables (const/let), conditionals, loops, functions, array/object test fixtures, and asynchronous Promise / async-await handling.',
        sections: [
          {
            title: '1. JavaScript Essentials for QA Automation',
            content: 'Playwright tests are pure JavaScript. Understanding statements, block-scoping with const and let, strict equality (===), and async/await is mandatory.',
          },
          {
            title: '2. Test Data Fixtures and Asynchronous Utilities',
            content: 'Learn how to construct arrays of test scenarios, compute pass metrics, and handle async setups with try...catch error handling.',
          },
        ],
        keyTakeaways: [
          'Always use const and let; avoid var to eliminate hoisting bugs.',
          'Playwright actions are asynchronous Promises requiring await.',
          'Strict equality (===) prevents unintended type coercion bugs in assertions.',
        ],
        practicalChecklist: [
          'Study 6 topics and complete interactive exercises',
          'Create JavaScript Test Data Utility and satisfy 10-point rubric',
          'Review 10 interview preparation questions',
          'Score 80%+ on Day 2 Checkpoint Quiz',
        ],
      },
      {
        id: 'lesson-playwright-day-3',
        slug: 'day-3-environment-setup-and-first-test',
        title: 'Day 3: Environment Setup and Your First Playwright Test',
        durationMinutes: 150,
        difficulty: 'Beginner',
        summary: 'Set up Playwright locally with Node.js, create project structure, author your first test script in JavaScript, execute across Chromium/Firefox/WebKit, and diagnose common issues.',
        sections: [
          {
            title: '1. Node.js & Playwright CLI Initialization',
            content: 'Verify Node.js LTS, initialize a clean project directory with `npm init -y`, install `@playwright/test`, and download browser binaries with `npx playwright install`.',
          },
          {
            title: '2. Writing Your First Test Script (.spec.js)',
            content: 'Structure test suites using `test()` blocks and web-first assertions like `await expect(page).toHaveTitle()`. Understand CommonJS and ES Modules import syntax.',
          },
        ],
        keyTakeaways: [
          'Node.js LTS (v18+) is required for Playwright.',
          'Always use web-first assertions such as await expect(page).toHaveTitle() rather than page.title() === "..." to leverage auto-retrying.',
          'Playwright bundles isolated browser binaries for Chromium, Firefox, and WebKit.',
        ],
        practicalChecklist: [
          'Read all 6 core setup and test execution topics',
          'Complete interactive practice exercises',
          'Author and evaluate practical test script satisfying 10-point rubric',
          'Review 10 interview preparation questions',
          'Pass Day 3 Checkpoint Quiz with 80%+',
        ],
      },
      {
        id: 'lesson-playwright-day-4',
        slug: 'day-4-locators-and-element-identification',
        title: 'Day 4: Locators and Element Identification',
        durationMinutes: 180,
        difficulty: 'Intermediate',
        summary: 'Master Playwright user-facing locators (getByRole, getByLabel, getByText), CSS & XPath trade-offs, strict mode, locator filtering, chaining, debugging, and AI-assisted locator selection.',
        sections: [
          {
            title: '1. User-Facing Locators & Web-First Design',
            content: 'Learn why accessible locators (getByRole, getByLabel, getByPlaceholder, getByText, getByTestId) mirror real user behavior and make automation resilient to underlying HTML refactors.',
          },
          {
            title: '2. Strict Mode, Filtering & AI Locator Evaluation',
            content: 'Understand strict mode violations, disambiguate repeated buttons using filter() and chaining, and systematically evaluate AI-suggested locators.',
          },
        ],
        keyTakeaways: [
          'Prioritize getByRole and getByLabel over brittle XPath or auto-generated CSS classes.',
          'Playwright enforces strict mode: action methods fail if a locator matches more than one element.',
          'Use locator.filter({ hasText: ... }) to uniquely target buttons within repeating cards or containers.',
          'Always verify AI locator suggestions against the real DOM and back them with web-first assertions.',
        ],
        practicalChecklist: [
          'Read all 7 core topics and complete interactive exercises',
          'Author and evaluate practical locator test script satisfying 10-point rubric',
          'Review 10 interview preparation questions',
          'Pass Day 4 Checkpoint Quiz with 80%+',
        ],
      },
      {
        id: 'lesson-playwright-day-5',
        slug: 'day-5-actions-assertions-forms-test-design',
        title: 'Day 5: Actions, Assertions, Forms and Test Design',
        durationMinutes: 180,
        difficulty: 'Intermediate',
        summary: 'Master Playwright action methods (click, fill, selectOption, check), auto-retrying web-first assertions, positive/negative form testing, and Arrange-Act-Assert design.',
        sections: [
          {
            title: '1. Core Actions & Actionability Checks',
            content: 'Execute user interactions (fill, click, check, selectOption, setInputFiles) with automatic readiness verification.',
          },
          {
            title: '2. Web-First Assertions & AAA Test Design',
            content: 'Write auto-retrying assertions (toBeVisible, toHaveText, toHaveValue) structured cleanly with the Arrange-Act-Assert design pattern.',
          },
        ],
        keyTakeaways: [
          'Always use web-first assertions like await expect(locator).toBeVisible() rather than one-time reads.',
          'Playwright automatically verifies actionability checks (visible, stable, enabled) before clicking or filling.',
        ],
        practicalChecklist: [
          'Read all 5 core modules',
          'Complete interactive registration form lab',
          'Review 5 interview questions with explanations',
          'Score 80%+ on Day 5 Checkpoint Quiz',
        ],
      },
      {
        id: 'lesson-playwright-day-6',
        slug: 'day-6-auto-waiting-timeouts-flaky-test-prevention',
        title: 'Day 6: Auto-Waiting, Timeouts and Flaky-Test Prevention',
        durationMinutes: 180,
        difficulty: 'Intermediate',
        summary: 'Explore Playwright auto-waiting synchronization, timeout tiers, network response waiting, Trace Viewer debugging, and systematic flaky-test elimination.',
        sections: [
          {
            title: '1. Auto-Waiting & Actionability Lifecycle',
            content: 'Understand how Playwright smart-waits for elements and how timeout tiers (Test, Assertion, Action) prevent stalled builds.',
          },
          {
            title: '2. Waiting Strategies & Debugging with Trace Viewer',
            content: 'Eliminate arbitrary sleeps with page.waitForResponse and inspect full DOM snapshots and waterfalls in Trace Viewer.',
          },
        ],
        keyTakeaways: [
          'Never use arbitrary page.waitForTimeout() calls—they are the leading cause of flaky tests.',
          'Use page.waitForResponse() before triggering network actions to avoid race conditions.',
        ],
        practicalChecklist: [
          'Read all 6 core modules',
          'Refactor flaky shopping cart test suite',
          'Pass Day 6 Checkpoint Quiz (>= 80%)',
          'Complete Mid-Course Surprise Assessment (Days 4-6)',
        ],
      },
      {
        id: 'lesson-playwright-day-7',
        slug: 'day-7-navigation-tabs-frames-dialogs-file-handling',
        title: 'Day 7: Navigation, Tabs, Frames, Dialogs and File Handling',
        durationMinutes: 180,
        difficulty: 'Intermediate',
        summary: 'Automate multi-tab workflows, browser contexts, nested iframes with frameLocator(), native JavaScript dialogs, and file upload/download pipelines.',
        sections: [
          {
            title: '1. Multi-Tab & Frame Automation (frameLocator)',
            content: 'Automate links opening in new tabs with context.waitForEvent("page") and navigate nested iframes using frameLocator().',
          },
          {
            title: '2. Dialog Interception & File Pipelines',
            content: 'Handle native JavaScript dialogs (alert/confirm/prompt) with page.once("dialog") and automate file upload/download flows.',
          },
        ],
        keyTakeaways: [
          'Register context.waitForEvent("page") before clicking links that open in new tabs.',
          'Use frameLocator() to seamlessly target iframe elements without global context switching.',
        ],
        practicalChecklist: [
          'Read all 6 core modules',
          'Complete customer support multi-interaction lab',
          'Review 5 interview questions with explanations',
          'Pass Day 7 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-8',
        slug: 'day-8-hooks-fixtures-test-organisation',
        title: 'Day 8: Hooks, Fixtures and Test Organisation',
        durationMinutes: 180,
        difficulty: 'Advanced',
        summary: 'Structure scalable test suites using test.describe(), beforeEach lifecycle hooks, custom fixtures with test.extend(), reusable helper functions, and production configuration.',
        sections: [
          {
            title: '1. Test Organisation & Lifecycle Hooks',
            content: 'Group tests into logical describe blocks and execute clean per-test setup using test.beforeEach().',
          },
          {
            title: '2. Fixtures Architecture & Helper Functions',
            content: 'Author custom domain fixtures with test.extend() and extract modular helper functions that keep tests independent.',
          },
        ],
        keyTakeaways: [
          'Fixtures encapsulate setup and teardown into an on-demand dependency with test.extend().',
          'Avoid shared mutable state to ensure tests run reliably in parallel.',
        ],
        practicalChecklist: [
          'Read all 6 core modules',
          'Refactor customer management test suite with custom fixtures',
          'Review 5 interview questions with explanations',
          'Pass Day 8 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-9',
        slug: 'day-9-data-driven-testing',
        title: 'Day 9: Data-Driven Testing and Test Parameterisation',
        durationMinutes: 180,
        difficulty: 'Intermediate',
        summary: 'Parameterize suites across positive, negative, and boundary datasets using JavaScript arrays and objects without duplicating test logic.',
        sections: [
          {
            title: '1. Test Parameterisation',
            content: 'Execute dynamic data-driven suites using for...of loops and template literals.',
          },
          {
            title: '2. Boundary & Negative Partitioning',
            content: 'Design structured datasets covering edge cases, length boundaries, and invalid formats.',
          },
        ],
        keyTakeaways: [
          'Iterate over dataset arrays with for...of to dynamically generate isolated test instances.',
          'Use descriptive template literals in test titles for clear CI reports.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete registration data-driven lab',
          'Review 5 interview questions',
          'Pass Day 9 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-10',
        slug: 'day-10-debugging-reporting-failure-analysis',
        title: 'Day 10: Debugging, Reporting and Failure Analysis',
        durationMinutes: 180,
        difficulty: 'Intermediate',
        summary: 'Diagnose failures using Playwright Inspector, time-travel debugging in Trace Viewer, and configure rich HTML reports in CI.',
        sections: [
          {
            title: '1. Root Cause Analysis',
            content: 'Categorize failure signatures and inspect actionability call logs.',
          },
          {
            title: '2. Trace Viewer & Reporters',
            content: 'Analyze DOM snapshots, network waterfalls, and generate HTML reports.',
          },
        ],
        keyTakeaways: [
          'Trace Viewer provides complete time-travel debugging with DOM snapshots before and after every action.',
          'Never use arbitrary sleeps to mask timing failures.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete 6-defect diagnostic lab',
          'Review 5 interview questions',
          'Pass Day 10 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-11',
        slug: 'day-11-authentication-sessions-test-isolation',
        title: 'Day 11: Authentication, Sessions and Test Isolation',
        durationMinutes: 180,
        difficulty: 'Advanced',
        summary: 'Master storageState session caching, secure credential injection via environment variables, and zero test-to-test state bleed.',
        sections: [
          {
            title: '1. Session Caching with storageState',
            content: 'Authenticate once in a setup project and reuse cookies across tests.',
          },
          {
            title: '2. Security & Test Isolation',
            content: 'Keep credentials in environment variables and prevent test state leakage.',
          },
        ],
        keyTakeaways: [
          'storageState saves pre-authenticated sessions to JSON, saving hundreds of seconds in CI.',
          'Never commit real passwords to git repositories.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete customer portal auth lab',
          'Review 5 interview questions',
          'Pass Day 11 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-12',
        slug: 'day-12-page-object-model-pom-design',
        title: 'Day 12: Page Object Model and Reusable Framework Design',
        durationMinutes: 180,
        difficulty: 'Advanced',
        summary: 'Design clean, scalable Page Object classes where locators are constructor properties and assertions stay in test specifications.',
        sections: [
          {
            title: '1. Page Object Model Design',
            content: 'Encapsulate page interactions into ES6 classes following Single Responsibility.',
          },
          {
            title: '2. Avoiding Anti-Patterns',
            content: 'Prevent oversized God Objects and keep test assertions declarative in specs.',
          },
        ],
        keyTakeaways: [
          'Define locators as constructor properties for lazy evaluation and centralization.',
          'Keep assertions inside test files so tests remain declarative and self-documenting.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Refactor e-commerce suite into POM classes',
          'Review 5 interview questions',
          'Pass Day 12 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-13',
        slug: 'day-13-api-testing-with-playwright',
        title: 'Day 13: API Testing with Playwright',
        durationMinutes: 180,
        difficulty: 'Intermediate',
        summary: 'Utilize native request fixtures for REST API requests, schema validation, and combine UI with API verification in hybrid workflows.',
        sections: [
          {
            title: '1. Native request Fixture',
            content: 'Dispatch GET, POST, PUT, DELETE requests with built-in APIRequestContext.',
          },
          {
            title: '2. Hybrid UI + API Testing',
            content: 'Seed preconditions via API and verify backend database persistence.',
          },
        ],
        keyTakeaways: [
          'Playwright provides first-class HTTP testing via the request fixture.',
          'Hybrid testing accelerates test execution by skipping slow UI setup flows.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete task management API lab',
          'Review 5 interview questions',
          'Pass Day 13 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-14',
        slug: 'day-14-git-test-configuration-cross-browser',
        title: 'Day 14: Git, Test Configuration and Cross-Browser Testing',
        durationMinutes: 180,
        difficulty: 'Advanced',
        summary: 'Configure playwright.config.js for multi-browser projects (Chromium, Firefox, WebKit), timeouts, parallel workers, and targeted CLI execution.',
        sections: [
          {
            title: '1. Configuration & Projects',
            content: 'Define browser projects, base URLs, and retry rules in playwright.config.js.',
          },
          {
            title: '2. Cross-Browser & Targeted Runs',
            content: 'Execute tests across engines and use --grep filters for targeted execution.',
          },
        ],
        keyTakeaways: [
          'Projects allow running the same tests across desktop and mobile browser viewports.',
          'Use --grep to run specific feature suites from the command line.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete multi-browser config lab',
          'Review 5 interview questions',
          'Pass Day 14 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-15',
        slug: 'day-15-ci-cd-integration-github-actions',
        title: 'Day 15: CI/CD Integration with GitHub Actions',
        durationMinutes: 180,
        difficulty: 'Advanced',
        summary: 'Build production GitHub Actions pipelines with headless execution, browser caching, failure artifact uploading, and CI troubleshooting.',
        sections: [
          {
            title: '1. GitHub Actions Pipeline',
            content: 'Create automated CI workflows triggered on push and pull_request.',
          },
          {
            title: '2. Headless Linux & Artifacts',
            content: 'Install Linux system dependencies with --with-deps and upload reports using if: always().',
          },
        ],
        keyTakeaways: [
          'Always install browser dependencies on Linux runners using npx playwright install --with-deps.',
          'Upload HTML reports with if: always() to ensure triage artifacts are preserved.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete CI/CD workflow YAML lab',
          'Review 5 interview questions',
          'Pass Day 15 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-16',
        slug: 'day-16-ai-assisted-test-generation-locators',
        title: 'Day 16: AI-Assisted Test Generation and Locator Suggestions',
        durationMinutes: 180,
        difficulty: 'Advanced',
        summary: 'Leverage generative AI for prompt-based test scaffolding, critique AI locator suggestions, eliminate hallucinations, and perform rigorous code reviews.',
        sections: [
          {
            title: '1. Structured Prompting',
            content: 'Feed clean context, DOM snippets, and constraints into LLMs.',
          },
          {
            title: '2. AI Code Review',
            content: 'Identify anti-patterns: arbitrary sleeps, weak assertions, and hallucinated APIs.',
          },
        ],
        keyTakeaways: [
          'Prioritize getByRole and getByLabel over brittle AI-suggested XPaths.',
          'Always verify AI-generated tests against the real running application.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete AI code audit & refactor lab',
          'Review 5 interview questions',
          'Pass Day 16 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-17',
        slug: 'day-17-ai-debugging-flaky-test-analysis',
        title: 'Day 17: AI-Assisted Debugging and Flaky-Test Analysis',
        durationMinutes: 180,
        difficulty: 'Advanced',
        summary: 'Diagnose intermittent failures, sanitize failure logs, eliminate deceptive AI workarounds, and apply surgical event-driven synchronization.',
        sections: [
          {
            title: '1. Failure Evidence & Sanitization',
            content: 'Scrub Bearer tokens and PII before feeding context to AI models.',
          },
          {
            title: '2. Flakiness & Deceptive Fixes',
            content: 'Reject arbitrary sleeps and weakened assertions in favor of web-first sync.',
          },
        ],
        keyTakeaways: [
          'Never paste raw production credentials or customer PII into public AI tools.',
          'Flakiness is almost always caused by asynchronous timing gaps or state leakage.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete 4-scenario flakiness refactoring lab',
          'Review 5 interview questions',
          'Pass Day 17 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-18',
        slug: 'day-18-ai-assisted-test-planning-synthetic-data',
        title: 'Day 18: AI-Assisted Test Planning, Edge Cases and Test Data',
        durationMinutes: 180,
        difficulty: 'Advanced',
        summary: 'Deconstruct complex user stories, discover hidden edge cases with adversarial AI prompting, and engineer safe synthetic data factories.',
        sections: [
          {
            title: '1. Requirements to Test Matrix',
            content: 'Deconstruct user stories into P0/P1/P2 risk-weighted scenario matrices.',
          },
          {
            title: '2. Safe Synthetic Test Data',
            content: 'Build data factories using unique timestamps and the reserved @example.com domain.',
          },
        ],
        keyTakeaways: [
          'Use adversarial prompts to probe for edge cases, concurrency conflicts, and boundary extremes.',
          'Tag tests with requirement IDs for living requirements traceability.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete hotel booking test planning lab',
          'Review 5 interview questions',
          'Pass Day 18 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-19',
        slug: 'day-19-framework-quality-playwright-mcp',
        title: 'Day 19: AI-Assisted Framework Improvement and Playwright MCP',
        durationMinutes: 180,
        difficulty: 'Advanced',
        summary: 'Modernize legacy suites against the 6 Pillars, eliminate wrapper bloat, and engineer secure Model Context Protocol (MCP) agent guardrails.',
        sections: [
          {
            title: '1. The 6 Pillars of Architecture',
            content: 'Evaluate modularity, reliability, maintainability, observability, isolation, and parallelism.',
          },
          {
            title: '2. Playwright MCP & Guardrails',
            content: 'Implement domain whitelisting and human approval gates for autonomous browser agents.',
          },
        ],
        keyTakeaways: [
          'Model Context Protocol (MCP) allows AI agents to interact with browsers via standardized tools.',
          'Enforce strict domain whitelists to prevent autonomous agents from navigating unapproved origins.',
        ],
        practicalChecklist: [
          'Read all 4 core topics',
          'Complete framework modernization & MCP guardrail lab',
          'Review 5 interview questions',
          'Pass Day 19 Checkpoint Quiz (>= 80%)',
        ],
      },
      {
        id: 'lesson-playwright-day-20',
        slug: 'day-20-final-project-assessment-certification',
        title: 'Day 20: Final Project, Comprehensive Assessment & Certification',
        durationMinutes: 210,
        difficulty: 'Advanced',
        summary: 'Engineer the RootCart Enterprise Framework, defend your architecture, complete the 25-question Final Assessment, and achieve certification.',
        sections: [
          {
            title: '1. Capstone E-Commerce Framework',
            content: 'Satisfy all 12 engineering milestones combining POM, API, and auth state.',
          },
          {
            title: '2. Final Assessment & Defense',
            content: 'Pass the 25-question comprehensive exam and master 20 senior interview scenarios.',
          },
        ],
        keyTakeaways: [
          'The Capstone synthesizes all 19 preceding days into a single production-grade framework.',
          'Passing the 25-question Final Assessment awards the official course certificate.',
        ],
        practicalChecklist: [
          'Read all 4 capstone architecture topics',
          'Complete RootCart Capstone E-commerce Framework',
          'Review 20 senior interview questions',
          'Pass 25-Question Final Assessment (>= 80%)',
        ],
      },
    ],
    quiz: {
      id: 'quiz-playwright',
      title: 'Playwright Automation Certification Quiz',
      passingScorePercent: 75,
      questions: [
        {
          id: 'q1',
          question: 'Which Playwright locator method is the most resilient to UI redesigns and mirrors real user accessibility?',
          options: [
            'page.locator("//div[2]/table/tbody/tr[1]/td[3]/button")',
            'page.getByRole("button", { name: "Submit" })',
            'page.locator(".btn-primary-blue-submit")',
            'page.locator("#button_102")',
          ],
          correctAnswerIndex: 1,
          explanation: 'getByRole("button", { name: "Submit" }) aligns with accessibility tree standards and remains stable even if classes, IDs, or DOM hierarchies change.',
        },
        {
          id: 'q2',
          question: 'Why should automation engineers avoid arbitrary sleeps like await page.waitForTimeout(3000)?',
          options: [
            'Because sleep commands slow down test runs and still cause intermittent flaky failures if network latency exceeds the sleep duration.',
            'Because JavaScript forbids sleeping in functions',
            'Because tests run too fast if you do not add sleep',
            'Sleep functions consume too much battery power',
          ],
          correctAnswerIndex: 0,
          explanation: 'Hardcoded sleeps artificially inflate test suite runtime and remain prone to timing flakiness. Web-first assertions automatically wait for conditions with smart polling.',
        },
      ],
    },
  },
  {
    id: 'course-interview-prep',
    slug: 'qa-interview-mastery',
    trackId: 'track-interview',
    trackName: 'QA Interview Prep & Blueprint',
    title: 'QA Interview Mastery & Scenario Playbook',
    description: 'Prepare for behavioral, scenario-based, and technical QA interviews with the STAR technique, bug triage negotiation, and salary benchmarking.',
    iconName: 'Briefcase',
    badge: 'Career Track',
    estimatedHours: 5,
    learningOutcomes: [
      'Structure behavioral answers using the STAR method (Situation, Task, Action, Result)',
      'Handle classic interview traps: "How would you test a vending machine?" or "Developer says It works on my machine"',
      'Negotiate defect severity vs release deadlines with engineering managers and product owners',
      'Build a portfolio with GitHub automation repositories and demonstrable defect logs',
    ],
    lessons: [
      {
        id: 'lesson-star-method',
        slug: 'star-method-qa-interviews',
        title: 'Mastering the STAR Framework for QA Behavioral Questions',
        durationMinutes: 25,
        difficulty: 'Beginner',
        summary: 'Learn how to answer high-impact behavioral questions with real evidence and quantifiable achievements.',
        sections: [
          {
            title: '1. What is the STAR Framework?',
            content: '• **Situation:** Set the context (Company, product, sprint).\n• **Task:** What was your specific responsibility or challenge?\n• **Action:** Exactly what steps DID YOU take? (Avoid saying "we", focus on "I").\n• **Result:** Measurable outcome (e.g. "Prevented a critical P0 payment outage", "Reduced regression cycle from 4 hours to 35 minutes").',
          },
          {
            title: '2. The "Developer Says Not a Bug" Scenario',
            content: 'When an interviewer asks: *"What do you do if a developer rejects your bug saying \'it works on my machine\'?"*\n\n**The Model Answer Structure:**\n1. Do not argue or escalate immediately.\n2. Re-verify the bug on a clean environment or browser incognito tab.\n3. Compare the developer\'s local setup against the staging environment (OS, branch, seed data, caching).\n4. Pair with the developer: screenshare and walk through the exact steps together.\n5. If requirements are ambiguous, refer to the User Story Acceptance Criteria or consult Product Owner.',
          },
        ],
        keyTakeaways: [
          'Always quantify results in STAR answers (time saved, bugs prevented).',
          'Frame developer disagreements as collaborative debugging sessions, not confrontations.',
          'Product Acceptance Criteria is the ultimate source of truth.',
        ],
        practicalChecklist: [
          'Prepare 3 STAR stories: a challenging bug you found, a conflict resolution, and an automation improvement',
        ],
      },
    ],
    quiz: {
      id: 'quiz-interview-prep',
      title: 'QA Interview Mastery Certification Quiz',
      passingScorePercent: 75,
      questions: [
        {
          id: 'q1',
          question: 'What is the most effective approach when an interviewer asks you: "How would you test a pen?"',
          options: [
            'Immediately list 50 random things you can think of without asking any questions',
            'Ask clarifying questions first (Who is the target user? Does it write in space? What type of ink?) to demonstrate requirements-gathering competence before categorizing into Functional, Non-functional, Boundary, and Stress tests.',
            'Refuse to answer because pens are not software',
            'Say you would automate it with Selenium',
          ],
          correctAnswerIndex: 1,
          explanation: 'Interviewers ask product testing questions to assess your requirements discovery and systematic categorization skills, not just quick brainstorming.',
        },
      ],
    },
  },
];

export const SIMULATED_BUGS: SimulatedBug[] = [
  {
    id: 'bug-negative-quantity',
    name: 'Cart Allows Zero or Negative Quantity',
    targetArea: 'Shopping Cart Quantity Input',
    expectedSeverity: 'Critical',
    hint: 'Try changing the quantity input of an item in the cart to 0 or -1. Does the system recalculate the price or allow negative totals?',
    explanation: 'The quantity input fails to validate minimum value constraint (min="1"). Entering negative numbers decreases the order total and can generate fraudulent credits.',
  },
  {
    id: 'bug-coupon-overflow',
    name: 'Coupon SAVE50 Triggers Negative Balance',
    targetArea: 'Discount Coupon Code Box',
    expectedSeverity: 'Critical',
    hint: 'Apply coupon code "SAVE50" when the cart total is less than $50.00. Notice what happens to the Final Total.',
    explanation: 'The backend discount logic fails to check subtotal boundary or clamp minimum order total at $0.00. Customers can checkout with negative balances.',
  },
  {
    id: 'bug-silent-phone-validation',
    name: 'Phone Field Error Fails to Display Error Message',
    targetArea: 'Shipping Address Phone Number',
    expectedSeverity: 'Major',
    hint: 'Leave the Phone field blank or enter letters, then click "Complete Order". Is there any visible error message explaining why the button does nothing?',
    explanation: 'The form validation silently aborts the submission without highlighting the invalid phone field or displaying an accessible error toast to the user.',
  },
  {
    id: 'bug-delivery-notes-xss',
    name: 'Delivery Instructions Note Reflects Unescaped Text',
    targetArea: 'Delivery Notes Textarea',
    expectedSeverity: 'Major',
    hint: 'Type special characters or markup like <script>alert("QA")</script> into the Delivery Instructions box and observe the Order Summary preview.',
    explanation: 'The review panel injects user notes directly without HTML sanitization, exposing potential cross-site scripting (XSS) injection vulnerabilities.',
  },
];
