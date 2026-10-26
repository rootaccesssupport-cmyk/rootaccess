import type { ManualQaDayUnit } from '../types/manualQa';

export const COURSE_METADATA = {
  id: 'manual-qa-5-days',
  title: 'Manual QA in 5 Days',
  subtitle: 'Learn Software Testing Through Practical Exercises and Industry-Based Interview Preparation.',
  commitment: '2–3 hours per day, approximately 10–15 hours total.',
  targetAudience: [
    'Beginners with no prior QA experience',
    'Students and fresh engineering graduates',
    'Learners preparing for entry-level manual testing interviews',
    'Professionals transitioning into software QA and testing',
  ],
  passingThresholdPercent: 80,
};

export const MANUAL_QA_DAYS: ManualQaDayUnit[] = [
  // =========================================================================
  // DAY 1: Software Testing Fundamentals
  // =========================================================================
  {
    dayNumber: 1,
    title: 'Day 1: Software Testing Fundamentals',
    subtitle: 'Core concepts, QA vs QC, STLC vs SDLC, testing levels, and practical scenario design.',
    estimatedHours: '3 Hours',
    learningObjectives: [
      'Articulate why software testing is economically and operationally necessary',
      'Distinguish clearly between QA (process-oriented) and QC (product-oriented)',
      'Differentiate Verification (building it right) and Validation (building the right thing)',
      'Compare SDLC and STLC phases and explain why QA must shift left',
      'Classify human mistakes (error) vs code defects (bug) vs runtime failures',
      'Distinguish the four testing levels (Unit, Integration, System, Acceptance) and testing types',
      'Think like a tester by identifying positive, negative, boundary, and security test scenarios for a login module',
    ],
    concepts: [
      {
        title: 'Topic 1: Introduction to Software Testing',
        explanation:
          'Software testing is the systematic process of evaluating and verifying that a software application or system does what it is supposed to do, satisfies specified business requirements, and identifies defects before releasing to end customers.\n\nTesting prevents catastrophic financial losses, security breaches, and reputational damage. Catching a defect in requirements or test planning costs 10x to 100x less than resolving an emergency outage in production.\n\nWhat a Manual QA Engineer Does:\nA manual QA engineer acts as the customer\'s advocate and the product\'s quality gatekeeper. Rather than just "clicking buttons," a QA engineer analyzes user stories, identifies hidden ambiguities, designs systematic test scenarios, executes tests with diverse data, logs clear and reproducible bug reports, and collaborates with developers and product managers to ensure software reliability.\n\nExhaustive Testing is Mathematically Impossible:\nTesting all combinations of inputs, preconditions, timings, and environmental states would require infinite time and resources. Therefore, testing demonstrates the presence of defects, but cannot prove that software is completely defect-free. Professional QA relies on risk-based testing, equivalence partitioning, and boundary value analysis to maximize coverage within finite project constraints.',
        examples: [
          {
            project: 'Fintech Mobile Banking App',
            description:
              'A missing decimal rounding check in an international wire transfer module causes transfers of $10.005 to round up to $1,000, risking severe financial non-compliance and regulatory fines.',
          },
          {
            project: 'Healthcare Patient Portal',
            description:
              'An unvalidated session token allows Patient B to view Patient A’s confidential blood test results by simply changing a URL patient ID query parameter.',
          },
        ],
        terminology: [
          { term: 'Software Testing', definition: 'The process of executing an application with the intent of finding defects and evaluating quality against requirements.' },
          { term: 'Manual QA Engineer', definition: 'A quality professional who manually executes test cases without automated scripts to evaluate software usability and functionality.' },
          { term: 'Exhaustive Testing Principle', definition: 'The principle that testing everything is impossible; testing must be prioritized based on risk.' },
        ],
        commonMistakes: [
          'Believing that testing can prove software is 100% bug-free.',
          'Waiting until developers finish all coding before beginning test planning.',
          'Assuming that if code compiles without crash errors, it functions correctly according to business rules.',
        ],
      },
      {
        title: 'Topic 2: Essential QA Terminology',
        explanation:
          'Clear technical communication is the trademark of a professional QA engineer. Here are the core definitions every tester must master:\n\n• Quality Assurance (QA): Proactive, process-oriented activities focused on defect prevention through standards, reviews, and continuous process improvements.\n• Quality Control (QC): Reactive, product-oriented activities focused on defect detection through test execution on built software.\n• Verification: Static evaluation of work products (requirements, design, code) without execution to answer: "Are we building the product right?"\n• Validation: Dynamic evaluation of executed software to answer: "Are we building the right product?"\n• Error (Mistake): A human action made by an engineer (e.g. developer writes `>` instead of `>=`).\n• Defect (Bug / Fault): The resulting flaw in code or documentation.\n• Failure: The observable deviation during runtime execution when the defect is triggered.\n• Test Scenario: A high-level description of what to test (e.g., "Verify user can log in with valid credentials").\n• Test Case: A formal step-by-step document detailing how to test, including preconditions, test data, steps, and expected results.\n• Expected Result vs Actual Result: The expected result is the required system behavior; the actual result is what the system did when tested. A discrepancy indicates a defect.',
        examples: [
          {
            project: 'Error vs Defect vs Failure Concrete Example',
            description:
              '1. Developer Error: A programmer forgets that leap years have 29 days in February.\n2. Code Defect: The calendar algorithm sets `febDays = 28` unconditionally.\n3. Runtime Failure: On Feb 29, 2028, users cannot book flight tickets because the date is rejected.',
          },
        ],
        terminology: [
          { term: 'Test Scenario', definition: 'A high-level "what to test" statement covering an end-to-end user goal or feature.' },
          { term: 'Test Case', definition: 'A formal set of conditions, steps, and expected outcomes to determine whether a feature satisfies requirements.' },
          { term: 'Actual Result', definition: 'The observable behavior or output of software during test execution.' },
        ],
        commonMistakes: [
          'Using "bug", "error", and "failure" interchangeably during technical interviews.',
          'Confusing test scenarios (broad scope) with test cases (detailed steps and test data).',
        ],
      },
      {
        title: 'Topic 3: SDLC and STLC',
        explanation:
          'Software Development Life Cycle (SDLC) defines the overall engineering stages:\n1. Requirements Analysis: Gathering customer needs and defining functional specifications.\n2. Design: Architecting system components, database schemas, and UI wireframes.\n3. Development (Coding): Engineers write source code satisfying specifications.\n4. Testing: QA executes test plans to detect defects and verify compliance.\n5. Deployment: Release of software to staging and production environments.\n6. Maintenance: Ongoing bug fixes, enhancements, and OS compatibility patches.\n\nSoftware Testing Life Cycle (STLC) defines testing activities in detail:\n1. Requirement Analysis: QA reviews user stories to identify testable requirements and ambiguities.\n2. Test Planning: QA lead defines scope, schedule, resources, and test strategy.\n3. Test Case Design: Testers write test scenarios, detailed test cases, and test data.\n4. Test Environment Setup: Configuring servers, databases, and test client builds.\n5. Test Execution: Running test cases, logging bugs in Jira, and tracking fixes.\n6. Defect Reporting, Retesting & Regression: Verifying resolved bugs and checking unchanged areas.\n7. Test Closure: Test summary report, metrics evaluation, and lessons learned.\n\nAgile Overlap & Shift-Left Testing:\nIn traditional Waterfall, testing happened exclusively at the end. In modern Agile (Scrum/Kanban), SDLC and STLC phases overlap continuously in 2-week sprints. "Shift-Left" means moving testing activities as early as possible. When QA participates in Day 1 user story grooming, requirement bugs are caught before coding, saving up to 100x the cost of production fixes.',
        examples: [
          {
            project: 'Shift-Left Example in Sprint Grooming',
            description:
              'During user story grooming for a new discount coupon, QA asks: "Can a user apply both a 10% coupon and an employee discount simultaneously?" The Product Owner realizes they forgot to define this rule. Ambiguity is resolved in 5 minutes without writing buggy code.',
          },
        ],
        terminology: [
          { term: 'SDLC', definition: 'Software Development Life Cycle: the overall software delivery process from inception to maintenance.' },
          { term: 'STLC', definition: 'Software Testing Life Cycle: the structured sequence of testing activities within the SDLC.' },
          { term: 'Shift-Left Testing', definition: 'Involving QA in early development phases (grooming, requirements) to prevent defects.' },
        ],
        commonMistakes: [
          'Thinking testing only begins after developers hand over compiled code.',
          'Viewing STLC as a linear, rigid waterfall process rather than iterative sprint cycles.',
        ],
      },
      {
        title: 'Topic 4: Testing Levels and Testing Types',
        explanation:
          'Testing Levels represent WHERE in the software stack testing occurs:\n1. Unit Testing: Testing individual functions, methods, or classes in isolation. Primarily conducted by developers using frameworks like Jest, JUnit, or PyTest.\n   • Example: Testing that a `calculateSalesTax(price, rate)` function returns 10.00 for inputs 100 and 0.10.\n2. Integration Testing: Testing data communication and interfaces between combined modules or services.\n   • Example: Verifying that the frontend checkout form correctly sends JSON data to the backend payment microservice.\n3. System Testing: End-to-end testing of the complete, integrated software build in an environment matching production.\n   • Example: A tester opens the web portal, logs in, adds items to the cart, completes payment, and checks that a receipt email arrives.\n4. Acceptance Testing (UAT): Testing by business stakeholders or actual end-users to confirm fitness for commercial release.\n   • Example: Beta testers or client accounting teams verify monthly financial reports match business ledger expectations.\n\nTesting Types represent WHAT aspect or PURPOSE of the software is evaluated:\n• Functional Testing: Evaluates what the system does against functional specifications (e.g., successful login, invalid password handling, shopping cart tax computation).\n• Non-Functional Testing: Evaluates how the system performs operational characteristics (e.g., Performance/Load testing under 10,000 concurrent users, Usability on mobile screens, Security penetration testing, Reliability during database failovers).\n\nChange-Related Testing Types (Smoke, Sanity, Retesting, and Regression):\nWhen software code changes (due to new feature additions, bug fixes, or dependency upgrades), QA runs targeted testing types:\n• Smoke Testing (Build Verification): A fast, high-level test suite executed on every new build to verify that primary, critical functions work before QA accepts the build for deep testing. If the smoke test fails, the build is rejected.\n• Sanity Testing: A focused, quick check performed after a minor bug fix or small code change to verify that the specific sub-module works without full end-to-end execution.\n• Retesting: Testing specifically to verify that a previously reported defect has indeed been resolved and the exact bug no longer reproduces.\n• Regression Testing: Testing unchanged parts of the software to ensure that new code changes, bug fixes, or enhancements have NOT introduced new bugs or broken existing functionality.\n\nNote: A complete hands-on simulation of managing Regression Test Suites and Defect Triage is practiced in Day 3.',
        examples: [
          {
            project: 'Functional vs Non-Functional in E-Commerce',
            description:
              'Functional: User clicks "Place Order" and an order ID is generated in the database.\nNon-Functional: 5,000 users click "Place Order" simultaneously during Black Friday, and the page response time remains under 2 seconds without crashing.',
          },
          {
            project: 'Retesting vs Regression Testing in Production',
            description:
              'Developer resolves Bug #104: "Coupon code SUMMER20 does not apply discount."\n1. Retesting: QA enters SUMMER20 and verifies the 20% discount is applied.\n2. Regression Testing: QA places orders with other payment methods (Credit Card, PayPal, Gift Cards) and checks that regular prices and existing coupons still work without side-effects.',
          },
        ],
        terminology: [
          { term: 'Testing Levels', definition: 'Hierarchy of test stages: Unit → Integration → System → Acceptance (UAT).' },
          { term: 'Functional Testing', definition: 'Verifying that system features work according to business specifications.' },
          { term: 'Non-Functional Testing', definition: 'Evaluating performance, security, usability, and stability attributes.' },
          { term: 'Smoke Testing', definition: 'Shallow test suite executed on a fresh build to verify critical paths before deeper testing.' },
          { term: 'Sanity Testing', definition: 'Focused test subset executed on a stable build to verify a specific bug fix or module update.' },
          { term: 'Retesting', definition: 'Executing the exact test cases that previously failed to verify that the defect has been corrected.' },
          { term: 'Regression Testing', definition: 'Testing unchanged areas of the application to guarantee that code changes did not break existing features.' },
        ],
        commonMistakes: [
          'Confusing testing levels (e.g. System testing) with testing types (e.g. Regression or Functional testing).',
          'Thinking Retesting and Regression Testing are synonyms; retesting checks the bug fix, while regression checks untouched features.',
          'Believing non-functional testing is only for specialists; manual testers regularly test usability, responsiveness, and error recovery.',
        ],
      },
      {
        title: 'Topic 5: Think Like a Tester',
        explanation:
          'Thinking like a tester means viewing software not just with the optimistic perspective of how it is supposed to work, but with the investigative curiosity of how it could fail under real-world conditions.\n\nKey Mindsets:\n• Positive Testing: Verifying that the system behaves correctly with valid inputs and normal user flows (Happy Path).\n• Negative Testing: Verifying that the system gracefully handles invalid inputs, unauthorized actions, and boundary extremes without crashing or leaking sensitive data.\n• Boundary & Edge Cases: Inspecting boundaries where logic transitions (e.g. passwords exactly at minimum 8 characters, or 7 characters, or 128 characters).\n• Risk-Based Thinking: Prioritizing testing where failure causes the greatest business or security damage (e.g. financial transactions vs footer copyright text).\n\n10 Common Login Scenarios to Consider:\n1. Valid Login: Correct email + correct password redirects to dashboard.\n2. Incorrect Password: Valid email + incorrect password shows generic error.\n3. Unknown Email: Unregistered email shows generic error (never leak user existence).\n4. Empty Fields: Submitting with empty email, empty password, or both.\n5. Invalid Email Format: Inputs like `user@`, `user.com`, or spaces.\n6. Password Masking: Characters are masked as dots/asterisks with toggle visibility option.\n7. Rate Limiting / Lockout: 3-5 consecutive failed logins temporarily locks account.\n8. Network Interruption: Submitting login while Wi-Fi drops or API is slow.\n9. Appropriate Error Messages: Clear, secure error feedback without technical stack traces.\n10. Session Expiry & Logout: Logging out invalidates session token so back button cannot re-enter.',
        examples: [
          {
            project: 'Security Best Practice for Login Error Messages',
            description:
              'Bad message: "Email not found" or "Password incorrect for user". (Allows hackers to enumerate valid email addresses).\nGood message: "Invalid email or password. Please try again." (Protects user privacy).',
          },
        ],
        terminology: [
          { term: 'Positive Testing', definition: 'Testing software with valid inputs to confirm expected outcomes.' },
          { term: 'Negative Testing', definition: 'Testing software with invalid or unexpected data to verify error handling.' },
          { term: 'Risk-Based Testing', definition: 'Prioritizing test cases based on the probability and business impact of failure.' },
        ],
        commonMistakes: [
          'Assuming every application requires identical rules; requirements and security specs must dictate behavior.',
          'Only testing the happy path and neglecting error messages, rate limiting, and network drop recovery.',
        ],
      },
    ],
    guidedExercise: {
      title: 'Guided Exercise: Deconstructing a Real-World Login Module',
      description: 'Analyze an enterprise login specification and systematically derive test scenarios for both valid and invalid pathways.',
      sampleSpecification:
        'SPECIFICATION: Enterprise Authentication Module\n1. Input fields: Email address (text) and Password (masked text).\n2. Login button triggers authentication against identity database.\n3. Valid credentials redirect user to /dashboard within 2 seconds.\n4. Invalid credentials display: "Invalid email or password." (Never state whether email or password specifically was wrong for security).\n5. Three consecutive failed attempts lock the account for 15 minutes and send an email alert.\n6. "Remember Me" checkbox persists session token for 30 days.\n7. Password reset link navigates to /forgot-password.',
      steps: [
        'Step 1: Identify Functional Capabilities (Happy path, error handling, security lockout, session persistence).',
        'Step 2: Define Positive Test Scenarios (Valid email + valid password, remember me checked, redirect verification).',
        'Step 3: Define Negative Test Scenarios (Wrong password, non-existent email, empty fields, SQL injection characters, 3-attempt lockout trigger).',
        'Step 4: Formulate Expected Behaviors for each scenario against security best practices.',
      ],
    },
    practicalAssignment: {
      title: 'Day 1 Practical Assignment: Comprehensive Test Scenario Discovery for Login System',
      description:
        'Requirement: "A web application has email and password fields and a Login button. Registered users should be able to sign in."\n\nAnalyze the requirement and complete the test scenario workbook with at least 10 distinct scenarios across positive, negative, and input-validation categories. Include 2 clarification questions for the Business Analyst and identify your top 3 priority scenarios.',
      submissionType: 'test_scenarios',
      targetSystemBrief:
        'System Under Test: Web Application Login Module. Input fields: Email address, Password. Action: Login button. Target: Authenticate registered users and redirect to dashboard.',
      instructions: [
        'Identify at least 10 distinct test scenarios covering positive, negative, and input-validation cases.',
        'Document Scenario ID, Test Scenario description, Scenario Type, Purpose, and Priority (P1/P2/P3).',
        'Write two clarification questions you would ask a Business Analyst (BA) before finalizing test cases.',
        'Select the three highest-priority scenarios and provide a concise justification for why they come first.',
        'Click "Submit Assignment" to run the evaluation engine.',
      ],
      criteria: [
        { id: 'crit-min-scenarios', title: 'Minimum 10 Test Scenarios', description: 'Learner documents at least 10 meaningful, distinct test scenarios.', minCountRequired: 10, weight: 30 },
        { id: 'crit-pos-neg', title: 'Positive, Negative & Validation Coverage', description: 'Includes valid flows, negative authentication flows, and field validation.', weight: 35 },
        { id: 'crit-expected-spec', title: 'Clear Purpose & Priority Justification', description: 'Detailed purpose for each scenario and valid BA clarification questions.', weight: 35 },
      ],
    },
    interviewQuestions: [
      {
        question: '1. What is software testing?',
        type: 'Foundational',
        modelAnswer:
          'Software testing is the systematic process of executing an application or system to verify that it satisfies specified business requirements, identify defects before release, and evaluate overall software quality and operational reliability.',
        followUp: 'Can software testing prove that a system is 100% bug-free?',
        commonMistakes: ['Defining testing merely as "clicking around to see if it breaks".'],
      },
      {
        question: '2. Why is software testing necessary?',
        type: 'Foundational',
        modelAnswer:
          'Software testing is essential because software defects can cause catastrophic financial losses, data leaks, security vulnerabilities, and brand damage. Economically, catching a bug during requirement grooming or testing costs 10x to 100x less than resolving an outage in production.',
        commonMistakes: ['Focusing only on cosmetic bugs rather than business risk and economics.'],
      },
      {
        question: '3. What is the difference between QA and QC?',
        type: 'Difference-Based',
        modelAnswer:
          'Quality Assurance (QA) is proactive and process-oriented; it focuses on defect prevention through sprint grooming, standardizing test processes, and code review criteria. Quality Control (QC) is reactive and product-oriented; it focuses on defect detection by executing test cases on actual software builds to inspect results.',
        followUp: 'Name a QA activity you perform before code is written.',
        commonMistakes: ['Saying QA is manual testing and QC is automated testing.'],
      },
      {
        question: '4. What is the difference between verification and validation?',
        type: 'Difference-Based',
        modelAnswer:
          'Verification evaluates documents, plans, and code statically without execution to answer: "Are we building the product right?" (e.g. reviewing user story acceptance criteria). Validation evaluates the executed software dynamically to answer: "Are we building the right product?" (e.g. submitting a payment transaction in staging to verify money is deducted and an order is created).',
        commonMistakes: ['Reversing the questions "building it right" vs "building the right product".'],
      },
      {
        question: '5. Explain error, defect, and failure with a clear example.',
        type: 'Terminology',
        modelAnswer:
          'An Error is a human mistake made by an engineer (e.g. typing > instead of >= in code). A Defect (bug) is the manifestation of that mistake in the software code or specification. A Failure is the observable runtime deviation from expected behavior when the software executes that flawed code (e.g. an account with exactly $100 is blocked from purchasing a $100 item).',
        commonMistakes: ['Calling the code flaw a failure before the program is executed.'],
      },
      {
        question: '6. What are SDLC and STLC?',
        type: 'Process',
        modelAnswer:
          'SDLC (Software Development Life Cycle) encompasses the complete engineering journey: Requirements, Design, Development, Testing, Deployment, and Maintenance. STLC (Software Testing Life Cycle) is the specialized subset of activities focused on quality: Requirement Analysis, Test Planning, Test Case Design, Environment Setup, Test Execution, Defect Reporting, and Test Closure.',
        commonMistakes: ['Thinking STLC only begins after the development phase is completely finished.'],
      },
      {
        question: '7. At what stage should QA become involved in a project?',
        type: 'Process',
        modelAnswer:
          'QA should become involved as early as possible—specifically during the Requirements Analysis phase (known as "Shift-Left"). Involving QA early allows testers to identify ambiguous requirements, missing edge cases, and architectural constraints before code is written, which is the most cost-effective stage to resolve flaws.',
        commonMistakes: ['Saying QA should wait until developers deploy code to the test server.'],
      },
      {
        question: '8. What is the difference between functional and non-functional testing?',
        type: 'Difference-Based',
        modelAnswer:
          'Functional testing evaluates WHAT the system does against functional requirements (e.g. successful login, payment calculation, password reset). Non-functional testing evaluates HOW the system performs operational characteristics (e.g. performance under high load, security vulnerabilities, usability, and reliability during network drops).',
        commonMistakes: ['Thinking security testing is functional just because it involves passwords.'],
      },
      {
        question: '9. Explain the four testing levels.',
        type: 'Concept',
        modelAnswer:
          'The four testing levels are: 1. Unit Testing (testing individual functions or methods in isolation, usually by developers), 2. Integration Testing (testing communication interfaces and data exchange between combined modules or APIs), 3. System Testing (end-to-end testing of the complete integrated application), and 4. Acceptance Testing (UAT - verifying that the product meets business expectations and user workflows).',
        commonMistakes: ['Confusing testing levels (Unit, Integration, System, UAT) with testing types (Smoke, Regression, Functional).'],
      },
      {
        question: '10. How would you start testing a login page?',
        type: 'Practical Approach',
        modelAnswer:
          'I start by analyzing the requirements to understand expected behaviors (session timeouts, lockout policies). Then I formulate a test plan covering: 1. Positive scenarios (valid login, remember me, redirection), 2. Negative scenarios (wrong password, unknown email, empty inputs, bad email formats), 3. Boundary scenarios (minimum and maximum password lengths), 4. Security scenarios (password masking, SQL injection attempts, rate limiting after 3-5 failed attempts), and 5. Non-functional checks (load time, responsive UI on mobile, and network drop recovery).',
        commonMistakes: ['Only listing 1 or 2 happy-path scenarios and forgetting security and error handling.'],
      },
      {
        question: 'Scenario Investigation: "A customer makes a payment. The money is deducted, but no order confirmation appears. How would you investigate this issue as a QA engineer?"',
        type: 'Scenario Investigation',
        modelAnswer:
          'Investigation Approach:\n1. Check Expected Behavior: Review payment gateway flow specs to confirm if order confirmation is created before or after gateway callback webhook.\n2. Reproduce in Test Environment: Attempt to reproduce using staging payment sandbox credentials with network logging open.\n3. Gather Evidence & Inspect Logs: Inspect browser DevTools (Network tab for failed POST requests or HTTP 500), backend API logs, and database tables (`payments` vs `orders`) to check if the payment record was captured without order creation.\n4. Check Third-Party Payment Gateway Dashboard: Verify transaction status in the gateway (Stripe/Razorpay) to confirm if the payment succeeded, is pending, or failed on the bank\'s end.\n5. Document Clear Bug Report: Log a Critical defect with full evidence: transaction ID, timestamp, user ID, API response payloads, screenshots, and steps to reproduce, without assuming the root cause before developers inspect the webhook listener.',
        commonMistakes: ['Blaming the bank or user without checking backend API logs and webhook listeners.'],
      },
    ],
    keyTakeaways: [
      'Testing demonstrates the presence of defects, never their total absence.',
      'QA prevents bugs early; QC detects bugs in executed software.',
      'Verification is static inspection; Validation is dynamic execution.',
      'Human error leads to code defects, which produce observable runtime failures.',
      'Early QA involvement (Shift-Left) saves up to 100x the cost of production defect resolution.',
    ],
    revisionNotes: [
      '7 Testing Principles: 1. Testing shows presence of defects, 2. Exhaustive testing impossible, 3. Early testing, 4. Defect clustering, 5. Pesticide paradox, 6. Testing is context dependent, 7. Absence-of-errors fallacy.',
      'Test Levels: Unit (dev), Integration (interfaces), System (end-to-end), Acceptance (UAT).',
      'Test Types: Functional (what system does) vs Non-functional (performance, security, usability).',
      'Login Checklist: Valid credentials, invalid password, unregistered email, empty inputs, invalid format, password masking, lockout/rate limiting, network timeout, generic security error messages.',
    ],
    pdfDownloadUrl: '/manual-qa/day-1-software-testing-fundamentals.pdf',
  },

  // =========================================================================
  // DAY 2
  // =========================================================================
  {
    dayNumber: 2,
    title: 'Day 2: Test Scenarios and Test Case Design',
    subtitle: 'Requirements breakdown, test case anatomy, Boundary Value Analysis, Equivalence Partitioning, and RTM.',
    estimatedHours: '3.0 Hours',
    learningObjectives: [
      'Transform business requirements into detailed, unambiguous test scenarios',
      'Structure professional test cases with standard fields (ID, preconditions, test data, steps, expected vs actual)',
      'Apply Equivalence Partitioning (EP) to mathematically reduce redundant test combinations',
      'Apply Boundary Value Analysis (BVA) using 2-point and 3-point boundary techniques',
      'Construct a Decision Table for complex multi-condition business logic',
      'Maintain a Requirements Traceability Matrix (RTM) to ensure 100% test coverage',
    ],
    concepts: [
      {
        title: '1. Requirements Analysis & Test Scenarios vs Test Cases',
        explanation:
          'Requirements Analysis is the process of reviewing user stories, acceptance criteria, and wireframes to discover ambiguities, missing edge conditions, and technical constraints.\n\n• Test Scenario: A high-level description of what to test (one-line scope, e.g., "Verify user can log in with valid credentials").\n• Test Case: A low-level, step-by-step procedure detailing how to test, including specific test data, preconditions, explicit steps, and exact expected outcomes.',
        examples: [
          {
            project: 'Ride-Hailing Application',
            description:
              'Test Scenario: Verify passenger can apply promo coupon.\nTest Case: Navigate to payment screen, enter code "SAVE20", verify 20% deduction appears, confirm order total decreases from $50.00 to $40.00.',
          },
        ],
        terminology: [
          { term: 'Acceptance Criteria (AC)', definition: 'Conditions that a software product must satisfy to be accepted by a user or product owner.' },
          { term: 'Test Scenario', definition: 'A generalized test condition representing a functional flow or user journey.' },
          { term: 'Test Case', definition: 'A formal artifact specifying inputs, execution conditions, testing procedure, and expected results.' },
        ],
        commonMistakes: [
          'Writing vague expected results such as "It should work properly" instead of explicit criteria like "Displays green banner \'Password updated\'".',
          'Omitting necessary preconditions (e.g. failing to mention user must have $0 balance before testing low-balance alert).',
        ],
      },
      {
        title: '2. Equivalence Partitioning (EP) & Boundary Value Analysis (BVA)',
        explanation:
          '• Equivalence Partitioning (EP): Divides input data into valid and invalid partitions. Testing one representative value from each partition gives the same defect detection confidence as testing every value in that partition.\n\n• Boundary Value Analysis (BVA): Software faults cluster heavily around boundaries of input ranges (due to developer off-by-one errors like using > instead of >=). Test the exact boundary edges:\n  - Minimum value (Min)\n  - Just below minimum (Min - 1)\n  - Just above minimum (Min + 1)\n  - Maximum value (Max)\n  - Just below maximum (Max - 1)\n  - Just above maximum (Max + 1)',
        examples: [
          {
            project: 'Car Rental Age Eligibility: 21 to 70 years',
            description:
              'Valid Partition: 21 to 70 (e.g., 35)\nInvalid Partition 1: < 21 (e.g., 15)\nInvalid Partition 2: > 70 (e.g., 85)\nBoundaries: 20 (invalid), 21 (valid), 22 (valid), 69 (valid), 70 (valid), 71 (invalid).',
          },
        ],
        terminology: [
          { term: 'Equivalence Partition', definition: 'A portion of an input domain where all values are expected to be processed similarly by the software.' },
          { term: 'Boundary Value', definition: 'A minimum or maximum value at the edge of an equivalence partition.' },
        ],
        commonMistakes: [
          'Testing only middle values (e.g., age 30 and 45) and skipping the exact edges 20, 21, 70, and 71.',
          'Assuming numeric fields will always receive clean integer inputs without testing decimals or negative signs.',
        ],
        workedExample: {
          scenario: 'Discount Coupon: Cart amount must be between $50.00 and $500.00 to apply coupon.',
          walkthrough:
            'Test values: $49.99 (Min-1, error banner), $50.00 (Min, success), $50.01 (Min+1, success), $499.99 (Max-1, success), $500.00 (Max, success), $500.01 (Max+1, error banner).',
        },
      },
      {
        title: '3. Decision Table Testing & Requirements Traceability Matrix (RTM)',
        explanation:
          '• Decision Table Testing: Used for complex business rules where multiple input conditions combine to produce specific system actions. Constructing a truth table reveals missing business logic.\n\n• Requirements Traceability Matrix (RTM): A document linking user requirements (BRD/User Stories) to corresponding test cases and identified defects. Ensures 100% requirement coverage and helps assess impact during requirement changes.',
        examples: [
          {
            project: 'E-commerce Free Shipping Decision Table',
            description:
              'Condition 1: Order > $100? Condition 2: Prime Member? Action: Free Shipping.\nRule 1: T / T -> Yes | Rule 2: T / F -> Yes | Rule 3: F / T -> Yes | Rule 4: F / F -> No ($5.99 shipping charged).',
          },
        ],
        terminology: [
          { term: 'Decision Table', definition: 'A tabular representation of logic that maps combinations of inputs to corresponding outputs.' },
          { term: 'RTM', definition: 'A grid that maps requirements to test cases to verify complete testing coverage from start to finish.' },
        ],
        commonMistakes: [
          'Failing to update the RTM when product requirements change mid-sprint.',
          'Creating test cases without tracing them back to any business requirement.',
        ],
      },
    ],
    guidedExercise: {
      title: 'Guided Exercise: Crafting Structured Test Cases with BVA',
      description: 'Step-by-step conversion of an e-commerce registration form specification into formal test cases.',
      sampleSpecification:
        'SPECIFICATION: Customer Registration Form\n1. Full Name: 3 to 50 characters, letters only.\n2. Email: Valid format (name@domain.com), must be unique in database.\n3. Password: 8 to 20 characters, minimum 1 uppercase letter, 1 number, and 1 symbol.\n4. Age: Must be between 18 and 65 years old inclusive.\n5. Terms & Conditions checkbox: Mandatory check to submit.',
      steps: [
        'Step 1: Identify Equivalence Partitions for each field.',
        'Step 2: Calculate BVA test data values for Name length (2, 3, 4, 49, 50, 51) and Age (17, 18, 19, 64, 65, 66).',
        'Step 3: Document formal test cases using standard template fields: Test ID, Preconditions, Test Data, Steps, Expected Result.',
        'Step 4: Tag each test case as Positive (Happy path) or Negative (Validation failure).',
      ],
    },
    practicalAssignment: {
      title: 'Day 2 Assignment: Structured Test Case Worksheet for Registration & Checkout',
      description:
        'Write and submit a structured test-case worksheet containing at least 8 detailed test cases covering User Registration and Discount Validation. Must include boundary value data points and negative tests.',
      submissionType: 'test_cases',
      targetSystemBrief:
        'Target System: Retail Store Registration & Coupon Validation. Rules: Age 18-65 inclusive, Password 8-20 chars, Discount code SAVE20 requires minimum $50.00 order subtotal.',
      instructions: [
        'Write at least 8 formal test cases.',
        'Include standard fields: Test Case ID, Title, Preconditions, Test Data, Step-by-Step Procedure, Expected Result, Type (Positive/Negative).',
        'Explicitly include Boundary Value Analysis test cases for Age (testing 17, 18, 65, 66) and Password length (testing 7 and 8 chars).',
        'Include negative validation test cases for uncheck terms checkbox and empty fields.',
      ],
      criteria: [
        { id: 'crit-min-test-cases', title: 'Minimum 8 Structured Test Cases', description: 'Learner documents at least 8 distinct, well-structured test cases.', minCountRequired: 8, weight: 30 },
        { id: 'crit-bva-values', title: 'Boundary Value Analysis Inclusion', description: 'Includes explicit boundary testing values for numerical/length boundaries.', weight: 35 },
        { id: 'crit-template-rigor', title: 'Standard Test Case Structure', description: 'All test cases contain clear steps, preconditions, test data, and deterministic expected outcomes.', weight: 35 },
      ],
    },
    interviewQuestions: [
      {
        question: 'What is Boundary Value Analysis (BVA), and why is it preferred over random ad-hoc testing?',
        type: 'Theoretical',
        modelAnswer:
          'Boundary Value Analysis is a black-box test design technique that tests values at the boundaries of equivalence partitions (Min, Min-1, Min+1, Max, Max-1, Max+1). It is preferred because empirical defect data proves developers make most mistakes at boundary conditions—such as off-by-one comparison errors (e.g. using > instead of >=)—rather than in the middle of valid ranges.',
        commonMistakes: ['Only testing the boundary numbers themselves without testing adjacent values (Min-1 and Max+1).'],
      },
      {
        question: 'What is the purpose of a Requirements Traceability Matrix (RTM)?',
        type: 'Theoretical',
        modelAnswer:
          'An RTM is a document that maps and traces user requirements with corresponding test cases and logged defects. It ensures 100% test coverage, guarantees no requirements are missed during testing, and enables accurate impact analysis when requirements change.',
        followUp: 'What are Forward Traceability and Backward Traceability?',
        commonMistakes: ['Thinking RTM is only used to store test execution pass/fail logs.'],
      },
    ],
    keyTakeaways: [
      'Test Scenarios define WHAT to test; Test Cases define HOW to test step-by-step.',
      'Equivalence Partitioning reduces redundant tests by grouping inputs into valid/invalid partitions.',
      'Boundary Value Analysis targets the fragile edges of input domains where bugs cluster.',
      'RTM links requirements to test cases to guarantee full test coverage.',
    ],
    revisionNotes: [
      'Standard Test Case Fields: ID, Module, Title, Priority, Preconditions, Test Data, Steps, Expected Result, Actual Result, Status.',
      '2-point BVA: Min, Max. 3-point BVA: Min-1, Min, Min+1, Max-1, Max, Max+1.',
      'Decision Table structure: Conditions (inputs) + Actions (outputs) = Business Rules.',
    ],
    pdfDownloadUrl: '/manual-qa/day-2-test-scenarios-and-test-case-design.pdf',
  },

  // =========================================================================
  // DAY 3
  // =========================================================================
  {
    dayNumber: 3,
    title: 'Day 3: Test Execution and Defect Management',
    subtitle: 'Execution statuses, defect life cycle, Jira bug standards, severity vs priority, and regression testing.',
    estimatedHours: '3.0 Hours',
    learningObjectives: [
      'Execute manual test cases and record accurate statuses (Pass, Fail, Blocked, Not-Run)',
      'Trace the complete Defect Life Cycle from creation to closure',
      'Author world-class, reproducible Jira bug reports developers can fix immediately',
      'Accurately classify Defect Severity (technical impact) vs Priority (business urgency)',
      'Differentiate Retesting (verifying bug fix) vs Regression Testing (preventing side-effects)',
      'Distinguish Smoke Testing (build stability) vs Sanity Testing (focused functional check)',
      'Gather and communicate defect evidence (logs, screenshots, HAR files) professionally',
    ],
    concepts: [
      {
        title: '1. Test Execution & Result Categorization',
        explanation:
          'During test execution, each test case is executed against the application build and assigned one of four standard statuses:\n• Pass: Actual outcome matches expected outcome 100%.\n• Fail: Actual outcome differs from expected outcome; a defect ticket must be logged.\n• Blocked: A prerequisite bug or environment issue prevents executing the test steps.\n• Not-Run: Scheduled test case that has not yet been executed in the current test cycle.',
        examples: [
          {
            project: 'Payment Gateway Integration',
            description:
              'Test case "Verify receipt email after credit card payment": The credit card checkout button crashes with 500 error. Test status is FAIL for checkout, and receipt test is BLOCKED because checkout cannot complete.',
          },
        ],
        terminology: [
          { term: 'Actual Result', definition: 'The observed behavior produced by the software under test during execution.' },
          { term: 'Blocked Test', definition: 'A test case that cannot be executed due to an upstream blocking defect or missing environment dependency.' },
        ],
        commonMistakes: [
          'Marking a test as "Pass" when a minor error was observed that the tester assumed was unimportant.',
          'Marking a test as "Fail" when the failure was caused by tester misconfiguration rather than software defect.',
        ],
      },
      {
        title: '2. The Defect Life Cycle & Jira Standards',
        explanation:
          'The Defect Life Cycle represents the states a bug passes through:\nNew -> Assigned -> Open -> Fixed -> Retest -> Closed.\nAlternative paths: Rejected (not a bug), Duplicate (already logged), Deferred (postponed to future release), Reopened (bug reproduced upon retest).\n\nA professional bug report contains:\n1. Title: [Component/Module] Summary under condition\n2. Environment: OS, Browser, App Build version\n3. Preconditions: Required state prior to reproduction\n4. Steps to Reproduce: Numbered, deterministic, minimal steps\n5. Expected Result: What requirements state should happen\n6. Actual Result: What system actually did (including error text)\n7. Severity & Priority: Technical impact & business urgency\n8. Evidence: Annotated screenshot, video recording, console logs',
        examples: [
          {
            project: 'Shopping Cart Calculation Defect',
            description:
              'Title: [Cart] Applying coupon "SAVE50" on subtotal under $50 causes negative order total balance.\nSteps: 1. Add item ($35.00) to cart. 2. Enter promo "SAVE50". 3. Observe total shows -$15.00.\nExpected: Displays error "Order must be at least $50.00". Actual: Total is -$15.00 and allows checkout.',
          },
        ],
        terminology: [
          { term: 'Defect Life Cycle', definition: 'The sequence of states that a defect goes through from discovery to resolution.' },
          { term: 'Reproducibility', definition: 'The ability to consistently recreate a defect following documented steps.' },
        ],
        commonMistakes: [
          'Writing vague titles like "Checkout broken" without component or condition.',
          'Missing step numbers or combining multiple actions into a single confusing paragraph.',
        ],
      },
      {
        title: '3. Severity vs Priority Matrix',
        explanation:
          '• Severity (Technical Impact): The extent to which the defect impacts software operation, data integrity, or infrastructure (Blocker, Critical, Major, Minor).\n• Priority (Business Urgency): How quickly the business needs the defect resolved based on release timeline and customer visibility (P0 - Immediate, P1 - High, P2 - Medium, P3 - Low).\n\nClassic Matrices:\n- High Severity, Low Priority: Rare crash in an annual tax report module executed only on December 31st.\n- Low Severity, High Priority: Company CEO name or logo is misspelled on the public homepage hero banner on IPO launch day.',
        examples: [
          { project: 'Crash on Logout', description: 'Application throws unhandled 500 error when clicking Logout, but user session is invalidated. High Severity (crash), Medium Priority.' },
          { project: 'Typo in Legal Disclaimer', description: 'Spelling mistake in terms of service. Low Severity, High Priority (compliance deadline).' },
        ],
        terminology: [
          { term: 'Severity', definition: 'The degree of impact that a defect has on the development or operation of a system.' },
          { term: 'Priority', definition: 'The business importance and urgency assigned to fixing a defect.' },
        ],
        commonMistakes: [
          'Confusing Severity and Priority in client meetings or job interviews.',
          'Assuming all crashes must automatically be assigned P0 immediate priority regardless of business context.',
        ],
      },
      {
        title: '4. Retesting vs Regression Testing & Smoke vs Sanity',
        explanation:
          '• Retesting: Testing specifically to verify that a reported bug has been fixed and no longer reproduces.\n• Regression Testing: Testing unchanged parts of the application to ensure that bug fixes or code changes have not introduced unintended side effects.\n\n• Smoke Testing (Build Verification): Broad, shallow test suite run on fresh builds to verify core stability before full QA execution starts.\n• Sanity Testing: Narrow, deep test suite run after minor bug fixes to verify specific functionality works as expected.',
        examples: [
          { project: 'Post-Bug-Fix Cycle', description: 'Developer fixes login lockout bug. QA performs Retesting on login lockout, then performs Regression Testing on password reset and registration.' },
        ],
        terminology: [
          { term: 'Retesting', definition: 'Executing test cases that previously failed to verify the defect was corrected.' },
          { term: 'Regression Testing', definition: 'Testing of a previously tested program to ensure that defects have not been introduced as a result of modifications.' },
          { term: 'Smoke Testing', definition: 'A subset of test cases covering primary functions to determine if a build is stable enough for deeper testing.' },
        ],
        commonMistakes: [
          'Performing only retesting after a bug fix and skipping regression testing.',
          'Running a 6-hour regression suite when a 15-minute sanity test was appropriate for a minor CSS fix.',
        ],
      },
    ],
    guidedExercise: {
      title: 'Guided Exercise: Writing a Production-Grade Jira Bug Report',
      description: 'Observe a real application crash during payment submission and construct a Jira ticket following FAANG QA standards.',
      sampleSpecification:
        'APPLICATION UNDER TEST: Shopping Cart Payment Flow\nScenario: User with valid cart items enters credit card details. When user clicks "Pay $99.00", the network request returns HTTP 500 Internal Server Error, button becomes disabled, and browser console displays: "Uncaught TypeError: Cannot read property \'currency\' of undefined".',
      steps: [
        'Step 1: Write an unambiguous Title: [Checkout] Clicking Pay button throws 500 Internal Server Error on currency parameter.',
        'Step 2: Document Environment (Chrome 125, macOS Sonoma, Staging Build v2.4.1).',
        'Step 3: Number deterministic Steps to Reproduce.',
        'Step 4: Explicitly define Expected Result vs Actual Result.',
        'Step 5: Assign Severity (Critical) and Priority (High).',
      ],
    },
    practicalAssignment: {
      title: 'Day 3 Assignment: Execute Tests and Write 3 Professional Defect Reports',
      description:
        'Review the provided test execution evidence and author at least 3 comprehensive, professional Jira defect reports covering 3 distinct defect scenarios (Calculation Overflow, Boundary Rejection, and Silent Validation Failure).',
      submissionType: 'defect_reports',
      targetSystemBrief:
        'Target System: Retail Store Web Application. Defect 1: Coupon SAVE50 allows negative order total. Defect 2: Registration form rejects 18-year-old users. Defect 3: Phone number validation failure freezes form without error feedback.',
      instructions: [
        'Author at least 3 complete defect reports.',
        'Each defect report must contain all 9 required fields: Defect Title, Environment, Preconditions, Steps to Reproduce (numbered), Expected Result, Actual Result, Severity, Priority, and Evidence description.',
        'Demonstrate correct Severity vs Priority assignment for each defect.',
      ],
      criteria: [
        { id: 'crit-three-defects', title: 'At Least 3 Defect Reports', description: 'Learner documents at least 3 distinct defect reports.', minCountRequired: 3, weight: 30 },
        { id: 'crit-all-jira-fields', title: 'Complete Jira Standard Fields', description: 'Reports include title, environment, preconditions, steps, expected, actual, severity, priority, evidence.', weight: 40 },
        { id: 'crit-severity-priority', title: 'Accurate Severity & Priority Classification', description: 'Demonstrates professional distinction between technical impact and business urgency.', weight: 30 },
      ],
    },
    interviewQuestions: [
      {
        question: 'What is the difference between Retesting and Regression Testing?',
        type: 'Difference-Based',
        modelAnswer:
          'Retesting verifies that a specific defect has been fixed by executing the exact test cases that previously failed. Regression testing verifies that the new bug fix or code change did not break existing, unchanged features elsewhere in the application.',
        commonMistakes: ['Saying retesting and regression testing are the same thing.'],
      },
      {
        question: 'Can you describe a scenario where a defect has High Severity but Low Priority?',
        type: 'Scenario',
        modelAnswer:
          'A classic example is an application crash that occurs in an annual tax archiving module executed only on December 31st. Because it crashes the system, its Severity is High (Critical technical impact), but because the event is 8 months away and does not block daily users, its Priority is Low compared to urgent checkout issues.',
        commonMistakes: ['Assuming all high severity bugs must be fixed immediately within 1 hour.'],
      },
      {
        question: 'What makes a bug report "good" from a developer perspective?',
        type: 'Workplace Behavioral',
        modelAnswer:
          'A good bug report allows the developer to reproduce the issue without asking questions. It features a clear title ([Component] Summary under condition), exact environment details, numbered step-by-step reproduction instructions, expected vs actual behavior, and concrete evidence such as screenshots, console errors, or network payloads.',
        commonMistakes: ['Omitting reproduction steps and just submitting a screenshot.'],
      },
    ],
    keyTakeaways: [
      'Pass, Fail, Blocked, and Not-Run represent the four primary test execution outcomes.',
      'A defect moves through a structured life cycle from New to Closed.',
      'Severity measures technical impact; Priority measures business urgency.',
      'Always follow a bug fix with both Retesting (defect fix) and Regression Testing (side-effects).',
    ],
    revisionNotes: [
      'Defect States: New -> Assigned -> Open -> Fixed -> Pending Retest -> Closed / Reopened.',
      'Severity Levels: Blocker (system down), Critical (core function broken/data loss), Major (feature impaired with workaround), Minor (cosmetic/typo).',
      'Smoke = broad & shallow (stability); Sanity = narrow & deep (post-fix verification).',
    ],
    pdfDownloadUrl: '/manual-qa/day-3-test-execution-and-defect-management.pdf',
  },

  // =========================================================================
  // DAY 4
  // =========================================================================
  {
    dayNumber: 4,
    title: 'Day 4: Real-World QA Workflow',
    subtitle: 'Agile & Scrum ceremonies, User Stories, Acceptance Criteria, Jira boards, exploratory testing, and test summary reports.',
    estimatedHours: '2.5 Hours',
    learningObjectives: [
      'Navigate the QA role within Agile & Scrum workflows (Sprints, Stand-ups, Refinements, Retrospectives)',
      'Analyze User Stories and Acceptance Criteria to uncover hidden ambiguities and gaps',
      'Execute structured Exploratory Testing using timeboxed test charters',
      'Apply Risk-Based Testing to prioritize test execution under tight release deadlines',
      'Formulate objective Entry and Exit criteria for testing phases',
      'Draft an executive Test Summary Report with data-backed Go / No-Go recommendations',
    ],
    concepts: [
      {
        title: '1. Agile & Scrum Ceremonies for QA Engineers',
        explanation:
          'In Agile development, teams deliver working software in short iterations (Sprints, usually 2 weeks). QA is embedded in the team:\n• Sprint Planning: QA estimates test effort and reviews acceptance criteria.\n• Daily Stand-up: QA answers: 1. What did I test yesterday? 2. What will I test today? 3. Are there any blockers?\n• Sprint Review / Demo: Working software is demonstrated to stakeholders.\n• Sprint Retrospective: Team discusses what went well, what failed, and action items for improvement.',
        examples: [
          {
            project: 'Stand-up Communication',
            description:
              '"Yesterday I completed test case execution for user profile updates. Today I am testing password reset flows and verifying bug #104. I am currently blocked on staging API database connectivity."',
          },
        ],
        terminology: [
          { term: 'Sprint', definition: 'A timeboxed iteration (typically 1–4 weeks) during which a specific set of work is completed.' },
          { term: 'Blocker', definition: 'An obstacle that halts test execution or development progress.' },
          { term: 'Definition of Done (DoD)', definition: 'Agreed-upon criteria that must be satisfied before a user story is marked complete (including QA sign-off).' },
        ],
        commonMistakes: [
          'Waiting until day 8 of a 10-day sprint to begin testing.',
          'Not speaking up during sprint planning when acceptance criteria are ambiguous.',
        ],
      },
      {
        title: '2. User Stories & Acceptance Criteria Analysis',
        explanation:
          'A User Story follows the template:\n"As a [user persona], I want [capability] so that [benefit]."\n\nAcceptance Criteria (AC) define boundaries of acceptance (often written in Given-When-Then Gherkin format or clear bullet points).\nQA’s primary duty is finding ambiguities in AC before development begins:\n• What happens on network timeout?\n• Can a coupon be used multiple times?\n• What is the maximum character limit?',
        examples: [
          {
            project: 'Gift Card Checkout Story',
            description:
              'Story: "As a shopper, I want to apply a gift card during checkout so my total payment decreases."\nAmbiguities QA catches: What if gift card balance exceeds order total? Is remainder saved or forfeited? Can multiple gift cards be combined?',
          },
        ],
        terminology: [
          { term: 'User Story', definition: 'A short, simple description of a feature told from the perspective of the user.' },
          { term: 'Acceptance Criteria', definition: 'The explicit conditions that software must fulfill to be accepted by the product owner.' },
        ],
        commonMistakes: [
          'Assuming developer knows unstated requirements without clarifying them.',
          'Treating acceptance criteria as a rigid ceiling rather than a baseline for testing.',
        ],
      },
      {
        title: '3. Exploratory Testing & Risk-Based Testing',
        explanation:
          '• Exploratory Testing: Simultaneous learning, test design, and test execution without pre-written scripted test cases. Governed by a timeboxed Test Charter (e.g., 45 minutes targeting checkout error handling).\n\n• Risk-Based Testing: Prioritizing test cases based on Risk = Probability of Failure × Impact of Failure. High-risk modules (Payments, Auth, Data retention) receive 80% of test effort, while low-risk features (Footer links) receive basic sanity checks.',
        examples: [
          {
            project: 'Test Charter Example',
            description:
              'Charter: Explore the shopping cart coupon input with special characters and rapid clicking to discover UI freezing or duplicate discount bugs. Timebox: 30 minutes.',
          },
        ],
        terminology: [
          { term: 'Exploratory Testing', definition: 'An approach to testing where testers dynamically design and execute tests based on system discovery.' },
          { term: 'Risk-Based Testing', definition: 'Organizing and prioritizing test execution based on calculated failure risk.' },
        ],
        commonMistakes: [
          'Confusing exploratory testing with random chaotic "ad-hoc monkey testing". Exploratory testing requires a defined charter and documented findings.',
        ],
      },
      {
        title: '4. Entry/Exit Criteria & The Test Summary Report',
        explanation:
          '• Entry Criteria: Prerequisites before testing can start (e.g. build deployed to staging, unit tests pass at 85%, test data seeded).\n• Exit Criteria: Conditions before testing can stop (e.g. 100% test cases executed, 0 Blocker/Critical defects open, 95% pass rate).\n\n• Test Summary Report: Formal executive document delivered before release:\n1. Scope of testing\n2. Metrics: Total executed, Passed, Failed, Blocked\n3. Outstanding open defects & risk assessment\n4. Formal Recommendation: Go, No-Go, or Go with Conditions',
        examples: [
          {
            project: 'Release Sign-Off Meeting',
            description:
              'QA Lead presents: 45 test cases executed, 43 passed, 2 minor cosmetic defects open (workaround available). 0 Blocker/Critical bugs. Recommendation: GO for v2.4 production deployment.',
          },
        ],
        terminology: [
          { term: 'Exit Criteria', definition: 'The set of conditions that permit a testing phase to be declared complete.' },
          { term: 'Test Summary Report', definition: 'An executive artifact summarizing testing activities, results, and release recommendations.' },
        ],
        commonMistakes: [
          'Recommending "Go" when critical payment bugs remain open without management sign-off.',
        ],
      },
    ],
    guidedExercise: {
      title: 'Guided Exercise: Reviewing a Simulated User Story for Gaps',
      description: 'Analyze a user story for a loyalty points redemption feature and document 4 critical edge questions.',
      sampleSpecification:
        'USER STORY:\nAs a frequent shopper, I want to redeem my store points at checkout to receive a cash discount.\n\nACCEPTANCE CRITERIA:\n1. 100 points = $1.00 discount.\n2. User selects number of points to redeem.\n3. Discount applies to cart total.',
      steps: [
        'Step 1: Check minimum/maximum constraints: Can user redeem 1 point ($0.01)? Is there a maximum redemption cap?',
        'Step 2: Check balance boundary: What happens if user inputs more points than they possess?',
        'Step 3: Check order cancellation: If an order paid with points is cancelled or refunded, are points restored immediately or forfeited?',
        'Step 4: Check concurrent sessions: What happens if user logs in on 2 devices simultaneously and redeems the same points twice?',
      ],
    },
    practicalAssignment: {
      title: 'Day 4 Assignment: User Story Analysis, Scenario Design & Test Summary',
      description:
        'Analyze a simulated Agile user story, identify at least 2 ambiguities, document 4 test scenarios, record execution results, and write an executive Test Summary Report with a release recommendation.',
      submissionType: 'agile_workflow',
      targetSystemBrief:
        'User Story: Gift Card Redemption at Checkout. Acceptance criteria states customer can apply gift card code to reduce balance. System has 2 subtle gaps: behavior when gift card balance exceeds order total, and behavior on cancelled orders.',
      instructions: [
        'Identify and write down at least 2 clear requirement ambiguities or clarifying questions for the Product Owner.',
        'Design at least 4 test scenarios covering full balance, partial balance, expired gift card, and cancelled order refund.',
        'Document test results and author a concise Test Summary Report including: Total Executed, Pass Rate, Open Defects, and an executive Go / No-Go release recommendation.',
      ],
      criteria: [
        { id: 'crit-ambiguities', title: 'Ambiguities Identified', description: 'Learner identifies at least 2 genuine requirement gaps or open questions.', minCountRequired: 2, weight: 30 },
        { id: 'crit-scenarios-covered', title: 'Test Scenarios Formulated', description: 'Formulates at least 4 practical test scenarios covering edge states.', minCountRequired: 4, weight: 35 },
        { id: 'crit-summary-report', title: 'Executive Test Summary Report', description: 'Includes test metrics, open defect summary, and clear Go/No-Go release recommendation.', weight: 35 },
      ],
    },
    interviewQuestions: [
      {
        question: 'What do you do if you find a critical defect two hours before a scheduled production release?',
        type: 'Workplace Behavioral',
        modelAnswer:
          '1. Immediately verify the bug on a clean environment to ensure reproducibility and gather evidence (logs, screenshots).\n2. Alert the QA Lead, Engineering Lead, and Product Owner immediately without waiting for stand-up.\n3. Log an urgent Blocker defect ticket in Jira with complete steps.\n4. Participate in defect triage: assess whether a hotfix is feasible or if the release must be aborted (No-Go decision).\n5. Never silently ignore or sign off on a known critical defect without formal executive approval.',
        commonMistakes: ['Panicking, trying to fix the code yourself, or hiding the defect to meet the deadline.'],
      },
      {
        question: 'How do you handle a situation where a developer rejects your bug as "Working as Designed"?',
        type: 'Scenario',
        modelAnswer:
          '1. Do not argue confrontationally.\n2. Review the User Story and Acceptance Criteria to verify if the specification supports your expected result.\n3. Re-test on a clean browser or staging environment to ensure environment parity.\n4. Pair with the developer: demonstrate the exact reproduction steps on screenshare.\n5. If the requirement is ambiguous or silent, involve the Product Owner to provide final business clarification.',
        commonMistakes: ['Escalating immediately to executive management without discussing with the developer first.'],
      },
    ],
    keyTakeaways: [
      'QA actively participates in sprint ceremonies to prevent defects early.',
      'Acceptance Criteria must be challenged for edge cases before coding begins.',
      'Exploratory testing is structured learning guided by timeboxed charters.',
      'The Test Summary Report provides stakeholders with objective data to make Go / No-Go decisions.',
    ],
    revisionNotes: [
      'Scrum Ceremonies: Sprint Planning, Daily Stand-up, Sprint Review, Sprint Retrospective.',
      'Risk-Based Testing = Likelihood of Failure × Impact of Failure.',
      'Test Summary Report contents: Scope, Metrics, Open Defects, Residual Risks, Recommendation.',
    ],
    pdfDownloadUrl: '/manual-qa/day-4-real-world-qa-workflow.pdf',
  },

  // =========================================================================
  // DAY 5
  // =========================================================================
  {
    dayNumber: 5,
    title: 'Day 5: Industry Interview Preparation and Final Assessment',
    subtitle: 'Scenario-based interview mastery, defect triage negotiation, and comprehensive final project.',
    estimatedHours: '3.5 Hours',
    learningObjectives: [
      'Master top industry-standard technical and behavioral QA interview questions',
      'Solve scenario-based whiteboard challenges (ATM, Vending Machine, Elevator testing)',
      'Apply the STAR technique to showcase personal testing achievements with quantifiable outcomes',
      'Navigate difficult workplace negotiations (defect priority disputes, developer disagreements)',
      'Execute and deliver a comprehensive final mini-project containing 15+ test cases, bug reports, and a test summary',
      'Pass the Final Cumulative Surprise Assessment covering Days 1 through 5 with >= 80%',
    ],
    concepts: [
      {
        title: '1. Deconstructing Classic Interview Testing Scenarios',
        explanation:
          'Interviewers often ask: "How would you test a Pen?", "How would you test an ATM?", or "How would you test a Vending Machine?"\nThey are NOT testing your imagination; they are assessing whether you possess a structured testing methodology:\n1. Clarify Requirements & Scope: Who is the user? What environment? What currencies?\n2. Functional Testing: Core features (dispense money, eject card, calculate balance).\n3. Non-Functional Testing: Performance (speed), Security (PIN masking), Usability (screen readability).\n4. Boundary & Edge Testing: Minimum withdrawal ($10), Maximum ATM limit ($1000), Zero balance.\n5. Stress & Negative Testing: Power failure mid-dispense, damaged magnetic stripe, 3 wrong PINs.',
        examples: [
          {
            project: 'ATM Cash Withdrawal Interview Prompt',
            description:
              'Clarify: Does ATM support multi-currency? Test Positive: Account has $500, withdraw $100 -> dispense $100, balance $400, print receipt. Test Negative: Account has $50, attempt $100 -> error "Insufficient Funds". Test Boundary: Exact balance withdrawal. Test Stress: Network disconnects right after cash is dispensed before account debit.',
          },
        ],
        terminology: [
          { term: 'Functional Test', definition: 'Testing that validates software actions against functional specifications.' },
          { term: 'Stress Test', definition: 'Testing that evaluates system stability under extreme load or adverse environmental conditions.' },
        ],
        commonMistakes: [
          'Jumping immediately into random ideas without asking clarifying questions first.',
          'Forgetting non-functional criteria such as security, accessibility, and error handling.',
        ],
      },
      {
        title: '2. The STAR Framework for QA Behavioral Questions',
        explanation:
          'When an interviewer asks: "Tell me about a challenging bug you found" or "Tell me about a time you had a conflict with a developer":\n• Situation: Set the context (company, project, sprint goal).\n• Task: What was your specific responsibility or challenge?\n• Action: Exactly what steps DID YOU take? (Use "I", describe testing techniques, evidence gathered, communication).\n• Result: What was the measurable, positive outcome? (e.g., prevented P0 production outage, saved $50,000, reduced regression cycle time).',
        examples: [
          {
            project: 'STAR Example: Disagreeing with Dev Lead',
            description:
              'Situation: 2 days before release, found payment retry bug. Task: Convince team it was Critical despite Dev Lead claiming it was minor. Action: Created 2-minute video reproduction, queried staging DB to show duplicate charges occurred in 4/10 attempts, presented evidence calmly in triage. Result: Product Owner agreed to postpone release 4 hours for hotfix; prevented 2,000 potential duplicate charges on launch.',
          },
        ],
        terminology: [
          { term: 'STAR Technique', definition: 'Situation, Task, Action, Result structured storytelling framework for interviews.' },
          { term: 'Defect Triage', definition: 'A meeting where developers, testers, and product managers evaluate open bugs to prioritize fixes.' },
        ],
        commonMistakes: [
          'Using "We" instead of explaining your personal individual contribution ("I analyzed...", "I logged...").',
          'Failing to state a clear, quantifiable result at the end of the story.',
        ],
      },
      {
        title: '3. Communicating QA Value to Recruiters & Engineering Leads',
        explanation:
          'In modern engineering teams, manual QA engineers are not "gatekeepers who say no"; they are quality champions who provide transparent visibility into release risks.\nKey interview signals recruiters look for:\n1. Analytical rigor: You consider edge cases, boundaries, and security without being told.\n2. Empathy for users: You advocate for clean user experiences, accessibility, and clear error messaging.\n3. Collaborative mindset: You work with developers to debug issues rather than throwing blame.\n4. Business acumen: You understand how bugs impact company revenue and brand reputation.',
        examples: [
          {
            project: 'Interview Communication',
            description:
              'Instead of saying: "I just verify what developers give me", say: "I partner with product during story grooming to eliminate requirement ambiguities, design comprehensive boundary test cases, and provide engineering leads with actionable defect metrics to support release decisions."',
          },
        ],
        terminology: [
          { term: 'Quality Champion', definition: 'A team member who fosters engineering quality standards across the entire delivery pipeline.' },
        ],
        commonMistakes: [
          'Apologizing for finding bugs or acting defensive when questioned by interviewers.',
          'Memorizing textbook definitions without being able to apply them to real project examples.',
        ],
      },
    ],
    guidedExercise: {
      title: 'Guided Exercise: Mock Interview Triage Simulation',
      description: 'Step-by-step walkthrough of handling a difficult triage dispute in an interview setting.',
      sampleSpecification:
        'SCENARIO: Release is scheduled in 3 hours. You found a bug where password reset emails take 45 minutes to arrive instead of 30 seconds. Developer claims: "Email server is outside our control, let\'s ship anyway." Product Manager looks to you for the decision.',
      steps: [
        'Step 1: Acknowledge the business deadline pressure without becoming emotional.',
        'Step 2: Quantify the impact: If existing users forget passwords on launch day, they cannot log in for 45 minutes and will flood customer support with complaints.',
        'Step 3: Investigate root cause with dev: Is it an email queue rate limit or a misconfigured third-party API key?',
        'Step 4: Formulate recommendation: If queue can be increased in 20 minutes, fix and retest. If not, evaluate holding release or deploying with proactive in-app customer banner.',
      ],
    },
    practicalAssignment: {
      title: 'Day 5 Final Practical Project: Comprehensive Web Application Testing Portfolio',
      description:
        'Deliver a complete, production-ready QA testing portfolio for a Web-based Registration and Login Workflow. Must contain: 1. Requirement Summary, 2. Test Scenarios, 3. At least 15 structured test cases with positive/negative coverage, 4. Test execution results, 5. At least 2 professional Jira defect reports, 6. An Executive Test Summary Report.',
      submissionType: 'final_project',
      targetSystemBrief:
        'Target Application: User Registration & Authentication System. Functional specs: Registration (Name, Email, Password, Age 18-65, Terms), Login (Email, Password, Remember Me, 3-attempt lockout), Password Reset. Defect evidence provided for: Negative age validation failure and Session token leak in query parameters.',
      instructions: [
        'Write a concise Requirement Summary defining scope, in-scope, and out-of-scope items.',
        'Document Test Scenarios covering all core functional user journeys.',
        'Document AT LEAST 15 structured test cases with explicit Test IDs, preconditions, test data, numbered steps, expected results, and Positive/Negative designations.',
        'Record test execution results for all 15 cases.',
        'Author AT LEAST 2 complete professional Jira defect reports based on supplied evidence with all standard fields (title, environment, steps, expected, actual, severity, priority, evidence).',
        'Author an Executive Test Summary Report with test metrics and release recommendation.',
      ],
      criteria: [
        { id: 'crit-req-scenarios', title: 'Requirement Summary & Scenarios', description: 'Clear scope definition and structured test scenarios covering full workflow.', weight: 15 },
        { id: 'crit-fifteen-cases', title: 'At Least 15 Structured Test Cases', description: 'Must contain at least 15 valid, structured test cases with explicit steps and expected results.', minCountRequired: 15, weight: 35 },
        { id: 'crit-pos-neg-balance', title: 'Positive & Negative Coverage', description: 'Includes balanced positive happy paths and negative edge/boundary cases.', weight: 15 },
        { id: 'crit-two-bug-reports', title: 'At Least 2 Professional Defect Reports', description: 'Must contain at least 2 full Jira bug reports with all required fields.', minCountRequired: 2, weight: 20 },
        { id: 'crit-test-summary', title: 'Executive Test Summary Report', description: 'Includes test metrics, open defect review, and clear Go / No-Go recommendation.', weight: 15 },
      ],
    },
    interviewQuestions: [
      {
        question: 'How would you test a web-based search functionality (e.g. Google or Amazon search)?',
        type: 'Scenario',
        modelAnswer:
          '1. Clarify: Target language? Auto-complete supported? Search filters?\n2. Functional Positive: Exact match keywords, partial matches, category filtering, pagination of results.\n3. Functional Negative: Empty search input, single character search, special characters (<>, %, SQL characters), extremely long string (1000+ chars).\n4. Non-Functional: Response time under 200ms, mobile responsiveness, accessibility.\n5. Zero-result handling: Verify friendly "No results found for X. Did you mean Y?" message appears instead of blank white page.',
        commonMistakes: ['Only listing 2 or 3 basic search terms without testing boundaries or security characters.'],
      },
      {
        question: 'What are the most important qualities of an outstanding manual QA engineer?',
        type: 'Workplace Behavioral',
        modelAnswer:
          'An outstanding manual QA engineer combines deep attention to detail with strong empathy for the end user. They possess strong critical thinking to anticipate edge cases that developers overlook, communicate defects clearly and constructively without hostility, and understand the business context of software releases.',
        commonMistakes: ['Saying "my job is to break developer code". QA does not break code; QA discovers where code is already broken.'],
      },
    ],
    keyTakeaways: [
      'Scenario interview questions test your systematic requirements breakdown and test categorization.',
      'Use the STAR method to demonstrate quantifiable personal achievements.',
      'Defect triage requires professional data-backed negotiation, not emotional confrontation.',
      'A complete testing portfolio with test cases, bug reports, and test summaries is your strongest interview credential.',
    ],
    revisionNotes: [
      'Whiteboard Interview Checklist: Clarify -> Functional Positive -> Functional Negative -> Boundary Values -> Non-Functional (Security, Performance) -> Error States.',
      'STAR = Situation, Task, Action, Result.',
      'Course Completion Criteria: Days 1–4 Completed + Surprise Test 1 (>=80%) + Final Project Passed + Final Surprise Assessment (>=80%).',
    ],
    pdfDownloadUrl: '/manual-qa/day-5-industry-interview-preparation-and-final-assessment.pdf',
  },
];
