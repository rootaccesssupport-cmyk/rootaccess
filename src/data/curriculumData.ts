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
    title: 'SQL Fundamentals to Practical Database Testing',
    description: 'Master SQL from relational foundations to practical database migration testing and source-to-target reconciliation. Learn SELECT, WHERE, JOINs, aggregations, window functions, and live defect audits with an in-browser deterministic SQL sandbox.',
    iconName: 'Database',
    badge: '5-Day Practical Course',
    estimatedHours: 12,
    learningOutcomes: [
      'Day 1: Master relational foundations, tables, datatypes, SELECT, WHERE operators, LIKE, BETWEEN, IN, ORDER BY, and LIMIT',
      'Day 2: Audit database integrity using COUNT/SUM/AVG, GROUP BY, HAVING, and INNER, LEFT, and RIGHT multi-table JOINs',
      'Day 3: Write subqueries, CTEs, CASE WHEN conditional logic, UNION/UNION ALL, and safe transaction scripts (BEGIN/COMMIT/ROLLBACK)',
      'Day 4: Implement window functions (ROW_NUMBER, RANK, DENSE_RANK, PARTITION BY), deduplication logic, and EXPLAIN query plan analysis',
      'Day 5: Execute source-to-target ETL database migration testing, financial balance reconciliation, and the 7-Defect Capstone Audit',
    ],
    lessons: [
      {
        id: 'sql-day-1',
        slug: 'day-1',
        title: 'Day 1: Relational Foundations, SELECT & Filtering Syntax',
        durationMinutes: 45,
        difficulty: 'Beginner',
        summary: 'Understand database tables, primary keys, SELECT queries, WHERE filters, logical operators, LIKE, BETWEEN, IN, ORDER BY, and LIMIT.',
        sections: [
          {
            title: '1. Relational Database Concepts & Schema Inspection',
            content: 'Relational databases store structured business entities in tables with typed columns, primary keys, and foreign keys. QA engineers inspect schemas to verify that primary keys guarantee uniqueness and foreign keys enforce referential integrity across transactional tables.',
          },
          {
            title: '2. Querying with SELECT, WHERE & Filtering Operators',
            content: 'Filter production rows precisely using equality (=, !=), numeric boundaries (<, <=, >, >=), range checks (BETWEEN ... AND ...), list matching (IN (...)), and wildcard text matching (LIKE "test%").',
          },
        ],
        keyTakeaways: [
          'SELECT retrieves specific columns instead of dumping all fields with SELECT * in production.',
          'WHERE filters rows before aggregation or sorting.',
          'ORDER BY and LIMIT allow deterministic pagination and audit inspection.',
        ],
        practicalChecklist: [
          'Inspect table schema and primary key definitions',
          'Execute targeted WHERE clauses to filter test accounts',
          'Verify pagination using LIMIT and OFFSET',
        ],
      },
      {
        id: 'sql-day-2',
        slug: 'day-2',
        title: 'Day 2: Aggregations, GROUP BY & Multi-Table Relational JOINs',
        durationMinutes: 50,
        difficulty: 'Beginner',
        summary: 'Calculate business metrics using COUNT, SUM, AVG, MIN, MAX; group records with GROUP BY and HAVING; and join related tables using INNER, LEFT, and RIGHT JOINs.',
        sections: [
          {
            title: '1. Aggregate Functions & GROUP BY / HAVING',
            content: 'Aggregate functions compute summaries across sets of rows. Use GROUP BY to bucket records by customer or category, and use HAVING to filter aggregated groups (such as finding duplicate transactions where COUNT(*) > 1).',
          },
          {
            title: '2. Multi-Table Relational JOINs',
            content: 'INNER JOIN returns only matching rows across tables. LEFT JOIN retains all records from the parent table, exposing orphaned child records when parent.id IS NULL.',
          },
        ],
        keyTakeaways: [
          'HAVING filters groups post-aggregation; WHERE filters individual rows pre-aggregation.',
          'LEFT JOIN with WHERE right.id IS NULL is the primary pattern for detecting orphaned data.',
          'Always use clear table aliases (e.g. c for customers, o for orders) in multi-table queries.',
        ],
        practicalChecklist: [
          'Check for orphaned order items using LEFT JOIN and IS NULL',
          'Identify duplicate customer email registrations using GROUP BY ... HAVING COUNT(*) > 1',
          'Reconcile total order revenue per customer against financial ledger balances',
        ],
      },
      {
        id: 'sql-day-3',
        slug: 'day-3',
        title: 'Day 3: Subqueries, CTEs, Conditional Logic & Safe Transactions',
        durationMinutes: 55,
        difficulty: 'Intermediate',
        summary: 'Build complex queries with scalar and correlated subqueries, readable Common Table Expressions (WITH cte AS), conditional CASE WHEN expressions, and safe DML transactions.',
        sections: [
          {
            title: '1. Subqueries and Common Table Expressions (CTEs)',
            content: 'Subqueries nest SELECT statements inside WHERE or FROM clauses. CTEs (WITH query_name AS (...)) structure multi-step transformations into readable, maintainable building blocks.',
          },
          {
            title: '2. CASE WHEN, COALESCE & Safe DML Transactions',
            content: 'Transform raw data into human-readable business tiers using CASE WHEN. Safeguard data modifications using explicit transactions: BEGIN, UPDATE/INSERT/DELETE, verification SELECT, and COMMIT or ROLLBACK.',
          },
        ],
        keyTakeaways: [
          'CTEs improve query readability and test maintainability compared to nested subqueries.',
          'COALESCE(column, fallback) replaces NULL values with deterministic defaults.',
          'Always execute DML inside a transaction block in test environments to facilitate clean rollbacks.',
        ],
        practicalChecklist: [
          'Categorize customer order volumes using CASE WHEN expressions',
          'Use CTEs to compute customer lifetime value before filtering high-value tiers',
          'Test transactional rollback by simulating mid-flight constraint violations',
        ],
      },
      {
        id: 'sql-day-4',
        slug: 'day-4',
        title: 'Day 4: Window Functions, Deduplication & Execution Plans',
        durationMinutes: 60,
        difficulty: 'Intermediate',
        summary: 'Master advanced SQL analytical functions: ROW_NUMBER, RANK, DENSE_RANK, PARTITION BY, deduplication workflows, dataset comparison, and EXPLAIN query plan optimization.',
        sections: [
          {
            title: '1. Window Functions: ROW_NUMBER(), RANK(), and PARTITION BY',
            content: 'Window functions calculate values across a set of table rows related to the current row without collapsing rows into a single summary. Use PARTITION BY to group calculations per customer or category.',
          },
          {
            title: '2. Deduplication & Query Execution Optimization',
            content: 'Identify and prune duplicate rows using ROW_NUMBER() OVER (PARTITION BY unique_key ORDER BY created_at DESC). Analyze performance bottlenecks using EXPLAIN query plans to verify index usage.',
          },
        ],
        keyTakeaways: [
          'ROW_NUMBER() assigns consecutive integers; RANK() leaves gaps on ties; DENSE_RANK() does not leave gaps.',
          'Window functions execute after WHERE, GROUP BY, and HAVING clauses.',
          'EXPLAIN output reveals sequential table scans versus fast index scans.',
        ],
        practicalChecklist: [
          'Deduplicate payment event logs retaining only the latest timestamp per order',
          'Rank top customers by spend within each geographical region',
          'Inspect query plans for missing indexes on foreign key columns',
        ],
      },
      {
        id: 'sql-day-5',
        slug: 'day-5',
        title: 'Day 5: Database Migration Reconciliation & Capstone Audit',
        durationMinutes: 75,
        difficulty: 'Advanced',
        summary: 'End-to-end source-to-target database migration testing: record counts, primary key checks, financial balance reconciliation, and the 7-Point Customer & Order Migration Capstone.',
        sections: [
          {
            title: '1. Source-to-Target Data Migration Verification Methodology',
            content: 'When legacy databases migrate to modern architectures (PostgreSQL/MySQL), QA validates four pillars: Volume (row counts), Structure (schema datatypes), Integrity (foreign keys), and Value (column-by-column checksums and balances).',
          },
          {
            title: '2. The 7-Point Migration Defect Audit Capstone',
            content: 'Execute systematic SQL audits on seeded migration tables (src_customers vs tgt_customers, src_orders vs tgt_orders) to detect missing rows, balance truncations, status corruptions, and duplicate keys.',
          },
        ],
        keyTakeaways: [
          'Never sign off on a data migration based solely on matching table row counts.',
          'Perform source-minus-target and target-minus-source difference audits using FULL OUTER JOIN or EXCEPT.',
          'Verify that financial sums match down to the exact decimal point between source and target.',
        ],
        practicalChecklist: [
          'Compare source and target total record counts by status',
          'Detect orphaned target records missing from the source system',
          'Reconcile total transaction amounts between source and target databases',
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
    title: 'API Testing with Postman — Beginner to Practical QA',
    description: 'Master RESTful API testing, HTTP protocols, status codes, Bearer JWT authentication, Postman automation, environment variables, Chai test assertions, and hands-on e-commerce defect hunting.',
    iconName: 'Send',
    badge: '5-Day Practical Course',
    estimatedHours: 12,
    learningOutcomes: [
      'Day 1: Understand client-server architecture, REST principles, HTTP methods, headers, parameters, JSON structure, and status codes 2xx-5xx',
      'Day 2: Validate request payloads, response structures, PUT vs PATCH differences, data types, and response time SLAs',
      'Day 3: Test authentication vs authorization, API keys, Bearer JWT tokens, role-based access control (RBAC), and negative edge cases',
      'Day 4: Automate Postman collections, chain requests using environment variables, and write robust assertions using pm.test and pm.expect',
      'Day 5: Execute the E-Commerce REST API Defect Audit Capstone (4 seeded bugs) and master Top 10 QA interview scenarios',
    ],
    lessons: [
      {
        id: 'api-day-1',
        slug: 'day-1',
        title: 'Day 1: API Foundations, Client-Server Architecture & HTTP Methods',
        durationMinutes: 45,
        difficulty: 'Beginner',
        summary: 'Understand REST API architecture, HTTP request-response lifecycle, methods (GET, POST, PUT, DELETE), headers, URL query/path parameters, and HTTP status codes (2xx, 4xx, 5xx).',
        sections: [
          {
            title: '1. The Client-Server Architecture & REST Principles',
            content: 'Modern web and mobile applications communicate with backend services via stateless HTTP REST APIs. Clients dispatch requests with methods, headers, and payloads; servers validate requests and return structured JSON responses with standard HTTP status codes.',
          },
          {
            title: '2. HTTP Status Code Taxonomy for QA Engineers',
            content: '2xx indicates success (200 OK, 201 Created). 4xx indicates client faults (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity). 5xx indicates server-side crashes (500 Internal Server Error) which require immediate defect filing.',
          },
        ],
        keyTakeaways: [
          'REST APIs use HTTP verbs deterministically: GET reads, POST creates, PUT replaces, PATCH updates, DELETE removes.',
          'Never accept HTTP 200 OK when the response body contains an error message (REST anti-pattern).',
          'HTTP headers carry critical metadata such as Content-Type and Authorization tokens.',
        ],
        practicalChecklist: [
          'Verify GET endpoints return 200 OK with valid JSON payloads',
          'Confirm POST endpoints return 201 Created with the generated resource ID',
          'Test invalid endpoint paths return 404 Not Found rather than 500 crashes',
        ],
      },
      {
        id: 'api-day-2',
        slug: 'day-2',
        title: 'Day 2: Request & Response Validation, JSON Schema & Response Times',
        durationMinutes: 50,
        difficulty: 'Beginner',
        summary: 'Validate response schemas, verify required fields and data types, test PUT versus PATCH update semantics, and evaluate performance against response time SLAs.',
        sections: [
          {
            title: '1. Response Schema & Field Validation',
            content: 'Beyond status codes, QA must verify that every JSON response adheres to its contract: property types (string, number, boolean, array), non-null requirements, and value bounds.',
          },
          {
            title: '2. PUT vs PATCH Semantics & SLA Timing',
            content: 'PUT idempotently replaces the entire resource; omitting fields resets them. PATCH partially updates specified fields without disturbing unchanged properties. Response times must comply with API performance SLAs (e.g. < 500ms).',
          },
        ],
        keyTakeaways: [
          'PUT replaces the full entity; PATCH modifies only the specified attributes.',
          'Validate nested object structures and arrays for empty list handling.',
          'Monitor response time metrics to detect backend query degradation before production.',
        ],
        practicalChecklist: [
          'Assert data types of all response fields using Chai assertions',
          'Verify PUT replaces full entity while PATCH preserves omitted fields',
          'Confirm response time is within acceptable SLA limits (< 500ms)',
        ],
      },
      {
        id: 'api-day-3',
        slug: 'day-3',
        title: 'Day 3: Authentication, Bearer Tokens, RBAC & Negative Testing',
        durationMinutes: 55,
        difficulty: 'Intermediate',
        summary: 'Differentiate authentication from authorization; test Bearer JWT tokens, API keys, and Role-Based Access Control (RBAC); and audit malformed JSON, SQL injection, and rate limiting.',
        sections: [
          {
            title: '1. Authentication vs Authorization (401 vs 403)',
            content: 'Authentication (401 Unauthorized) verifies WHO the user is (e.g. valid Bearer JWT). Authorization (403 Forbidden) verifies WHAT an authenticated user is permitted to do. QA audits ensure normal users cannot access admin endpoints.',
          },
          {
            title: '2. Negative Testing & Security Audits',
            content: 'Test endpoints against edge cases: malformed JSON bodies (400), expired JWT tokens (401), privilege escalation attempts (403), rapid burst requests (429 Too Many Requests), and sensitive data leakage (passwords/PII).',
          },
        ],
        keyTakeaways: [
          '401 Unauthorized = Missing or invalid credentials; 403 Forbidden = Authenticated but insufficient permissions.',
          'Tokens must never be hardcoded into source code; store them in environment variables.',
          'Verify that sensitive attributes (e.g. password_hash, salt) are never leaked in user responses.',
        ],
        practicalChecklist: [
          'Verify missing Bearer token returns 401 Unauthorized',
          'Confirm standard student token calling admin endpoints returns 403 Forbidden',
          'Test malformed JSON payload returns 400 Bad Request with helpful error message',
        ],
      },
      {
        id: 'api-day-4',
        slug: 'day-4',
        title: 'Day 4: Postman Test Automation, Collections & Environment Chaining',
        durationMinutes: 60,
        difficulty: 'Intermediate',
        summary: 'Structure Postman collections, manage environment variables, chain dynamic values between dependent API requests, and write comprehensive Chai test scripts.',
        sections: [
          {
            title: '1. Postman Test Scripts & the pm.* Sandbox',
            content: 'Postman executes JavaScript test assertions in the Tests tab using pm.test and pm.expect. Assert status codes, headers, response times, and JSON body properties in real time.',
          },
          {
            title: '2. Request Chaining with Environment Variables',
            content: 'Extract dynamic response values (such as an auth token or new order ID) using pm.environment.set() and pass them into subsequent requests using {{variableName}} syntax.',
          },
        ],
        keyTakeaways: [
          'Dynamic chaining eliminates manual copy-pasting of IDs and tokens across test runs.',
          'Collections group requests into repeatable, automated test suites.',
          'Chai assertions (to.be.an, to.have.property, to.eql) provide declarative, readable test criteria.',
        ],
        practicalChecklist: [
          'Create login request that dynamically saves JWT token to pm.environment',
          'Chain auth token into subsequent authenticated requests using {{authToken}}',
          'Write automated status code, schema, and response time assertions for every request',
        ],
      },
      {
        id: 'api-day-5',
        slug: 'day-5',
        title: 'Day 5: E-Commerce REST API Defect Audit Capstone & Senior QA Interview',
        durationMinutes: 75,
        difficulty: 'Advanced',
        summary: 'Execute the full E-Commerce REST API Capstone Project (audit /auth, /products, /cart, /orders for 4 seeded defects) and master Top 10 API QA interview questions with model answers.',
        sections: [
          {
            title: '1. The E-Commerce REST API Defect Audit Capstone',
            content: 'Simulate end-to-end QA verification on a realistic e-commerce API. Inspect and document 4 seeded critical defects: negative quantity handling, price tampering vulnerabilities, checkout crash on empty carts, and IDOR order access flaws.',
          },
          {
            title: '2. Top 10 API Testing Interview Scenarios & Senior Answers',
            content: 'Master senior QA interview questions covering idempotent HTTP methods, difference between PUT and PATCH, handling 401 vs 403, testing rate limits (429), API mocking strategies, and microservices contract testing.',
          },
        ],
        keyTakeaways: [
          'IDOR (Insecure Direct Object Reference) vulnerabilities occur when endpoints lack user ownership checks.',
          'Input validation must reject negative quantities and invalid currency formats before database writes.',
          'Senior QA engineers articulate technical root causes and business risks, not just test step failures.',
        ],
        practicalChecklist: [
          'Audit cart items endpoint for negative quantity validation defects',
          'Test order placement endpoint for server crash on empty cart (500 vs 400)',
          'Review and practice the Top 10 API testing interview questions and senior-level answers',
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
        {
          id: 'q4',
          question: 'What is the primary difference between HTTP PUT and HTTP PATCH methods?',
          options: [
            'PUT is only used for images, while PATCH is used for text',
            'PUT is idempotent and replaces the entire resource; PATCH applies a partial update modifying only specified fields',
            'PATCH is not an official HTTP method',
            'PUT can only be sent once per day',
          ],
          correctAnswerIndex: 1,
          explanation: 'PUT completely replaces the resource state, resetting omitted fields. PATCH updates only the supplied properties without overwriting unspecified attributes.',
        },
        {
          id: 'q5',
          question: 'What is an Insecure Direct Object Reference (IDOR) vulnerability in REST API testing?',
          options: [
            'A broken database table index',
            'When an API endpoint allows a user to access or modify another user\'s private record simply by changing the ID in the URL parameter without authorization checks',
            'A timeout error caused by slow network connections',
            'When an API returns XML instead of JSON',
          ],
          correctAnswerIndex: 1,
          explanation: 'IDOR occurs when an application exposes a reference to an internal object (e.g. /v1/orders/102) and fails to verify that the logged-in user actually owns that resource.',
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
