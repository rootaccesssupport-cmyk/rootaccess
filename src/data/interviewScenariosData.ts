export interface InterviewDrill {
  title: string;
  question: string;
  modelResponse: string;
  badge: string;
  codeSnippet?: string;
}

export interface CourseInterviewScenario {
  courseSlug: string;
  courseTitle: string;
  category: string;
  featuredScenario: {
    scenarioNumber: number;
    title: string;
    description: string;
    rubricPoints: string[];
  };
  drills: InterviewDrill[];
}

export const COURSE_INTERVIEW_SCENARIOS: Record<string, CourseInterviewScenario> = {
  'manual-qa-fundamentals': {
    courseSlug: 'manual-qa-fundamentals',
    courseTitle: 'Manual QA in 5 Days: Industry-Based Interview Preparation',
    category: 'Manual QA & Testing',
    featuredScenario: {
      scenarioNumber: 14,
      title: 'During release testing 2 hours before production deployment, you discover a bug where the "Apply Coupon" button occasionally throws an unhandled error. What is your exact escalation and defect triage process?',
      description: 'Evaluates your risk assessment, stakeholder communication, reproducibility documentation, and defect triage decision-making under high-pressure release conditions.',
      rubricPoints: [
        'Reproducibility Check: Quickly verify whether the defect reproduces consistently or intermittently, capturing console logs, network payloads, and exact browser environment.',
        'Severity vs Business Impact Analysis: Determine if the defect blocks core purchase checkout (Blocker/Critical) or only an optional promotional discount (Major).',
        'Immediate Escalation: Post directly to the #release-war-room Slack channel tagging the Lead QA, Product Manager, and Release Engineer with the Jira ticket and video reproduction.',
        'Go/No-Go Recommendation: Propose actionable options: (a) hotfix patch if root cause is trivial, (b) disable coupon banner via feature flag without blocking release, or (c) abort deployment if checkout data corruption is risked.',
      ],
    },
    drills: [
      {
        title: 'Scenario #1: Severity vs Priority Trade-off',
        question: 'Give a real-world example from your testing experience of a defect that has Low Severity but High Priority, and one with High Severity but Low Priority.',
        modelResponse: 'Low Severity, High Priority: The company CEO\'s name or corporate logo on the homepage header is misspelled or misaligned. The app works flawlessly, but brand damage is extreme. High Severity, Low Priority: The mobile app crashes when an account is created using a rare 1990s phone OS with 0.005% user share. System crashes, but impact on revenue is virtually zero.',
        badge: 'Core Concept',
      },
      {
        title: 'Scenario #2: Defect Rejection Handling',
        question: 'A senior developer marks your defect ticket as "Works on My Machine" and closes it. How do you respond?',
        modelResponse: 'Never argue subjectively. Re-test on a clean incognito window and check local cache/cookies. Provide exact step-by-step reproduction steps, browser version, screen recording, network HAR export, and test account credentials. If still disputed, walk over or jump on a quick 3-minute huddle to reproduce it together on their local build.',
        badge: 'Behavioral QA',
      },
      {
        title: 'Scenario #3: Boundary Value Analysis (BVA)',
        question: 'An input field accepts an integer age between 18 and 65 inclusive. What exact test input values do you choose for Boundary Value Analysis (BVA)?',
        modelResponse: 'Minimum boundary: 17 (just below min, invalid), 18 (min, valid), 19 (just above min, valid). Maximum boundary: 64 (just below max, valid), 65 (max, valid), 66 (just above max, invalid). Plus non-integer/null checks.',
        badge: 'Test Design',
      },
    ],
  },

  'playwright-automation': {
    courseSlug: 'playwright-automation',
    courseTitle: 'Playwright Automation with JavaScript + AI',
    category: 'Test Automation',
    featuredScenario: {
      scenarioNumber: 22,
      title: 'Your Playwright CI/CD test suite passes 100% locally on headless Chromium, but fails intermittently with timeout errors in GitHub Actions. How do you diagnose and eliminate the flakiness?',
      description: 'Tests your deep understanding of CI container constraints, network virtualization, tracing artifacts, and deterministic auto-waiting vs race conditions.',
      rubricPoints: [
        'Inspect Playwright Trace Artifacts: Download the trace.zip artifact from GitHub Actions and inspect Playwright Trace Viewer (npx playwright show-trace) to see DOM snapshots, network requests, and console logs at the exact moment of failure.',
        'Identify CI Resource Constraints: CI runners usually have 2 vCPUs and slower I/O than local machines. Verify if race conditions occur because animations or API responses take longer than local defaults.',
        'Eliminate Brittle Locators: Replace arbitrary waitForTimeout() sleeps with Web-First Assertions (await expect(locator).toBeVisible()) that automatically retry until the expectation passes.',
        'Worker Isolation & Shared State: Check if tests are mutating shared database state when running parallel workers. Set fullyParallel: true with isolated test accounts or run worker-scoped fixtures.',
      ],
    },
    drills: [
      {
        title: 'Scenario #1: User-Facing Accessible Locators',
        question: 'Why does modern automation testing recommend page.getByRole() over complex XPath or CSS class selectors?',
        modelResponse: 'Accessible locators (getByRole, getByLabel, getByText) mirror how real users and assistive technologies interact with the page. They decouple test logic from volatile CSS class refactors (e.g. Tailwind or CSS modules), ensuring tests don\'t break when CSS styles are redesigned.',
        badge: 'Best Practices',
      },
      {
        title: 'Scenario #2: Authentication Storage State Reuse',
        question: 'How do you authenticate once in Playwright and reuse that session across 50 tests without logging in through the UI each time?',
        modelResponse: 'Use Playwright\'s storageState feature. In globalSetup or a setup project, log in once through the UI and save authentication cookies/localStorage using await page.context().storageState({ path: \'storageState.json\' }). In playwright.config.js, configure test projects to use this JSON file as the initial browser context state.',
        badge: 'Architecture',
      },
      {
        title: 'Scenario #3: Handling Dynamic Network Responses',
        question: 'How do you reliably wait for a backend API response before performing assertions in Playwright?',
        modelResponse: 'Use page.waitForResponse(). Wrap the triggering user action: await Promise.all([ page.waitForResponse(resp => resp.url().includes(\'/api/orders\') && resp.status() === 200), page.getByRole(\'button\', { name: \'Submit Order\' }).click() ]); This prevents race conditions where assertions run before the response arrives.',
        badge: 'Async Testing',
      },
    ],
  },

  'devops-engineering': {
    courseSlug: 'devops-engineering',
    courseTitle: 'DevOps Engineering: Fundamentals to Production Projects',
    category: 'DevOps & Cloud',
    featuredScenario: {
      scenarioNumber: 31,
      title: 'A production Linux server reports 100% CPU utilization and high load average. Walk me through the exact CLI commands and triage methodology you use to diagnose and resolve the incident.',
      description: 'Evaluates your system observability, Linux troubleshooting methodology, process triage, and production incident response discipline.',
      rubricPoints: [
        'Triage System State: Run uptime to check load averages (1, 5, 15 min) relative to CPU core count (nproc), and run top or htop to identify if the bottleneck is CPU (%us/%sy) or disk I/O wait (%wa).',
        'Identify Offending Process: Press P in top or execute ps aux --sort=-%cpu | head -n 10 to pinpoint the offending process PID, user, and command arguments.',
        'Correlate Memory and Disk I/O: Run vmstat 1 5 to inspect swapping (si/so) and run iostat -xz 1 to check disk saturation and queue length.',
        'Inspect Logs and Remediate: Check recent service logs with journalctl -u <service> -n 100 --no-pager. Attempt graceful restart systemctl reload or terminate rogue process kill -15 <PID>, followed by saving core dumps for root-cause analysis.',
      ],
    },
    drills: [
      {
        title: 'Scenario #1: Linux File Permissions Triage',
        question: 'A web server returns 403 Forbidden when serving static assets. What exact Linux command fixes directory and file permissions securely without granting 777?',
        modelResponse: 'Never grant 777. Directories need execute permissions to be entered, while files only need read. Run: find /var/www/html -type d -exec chmod 755 {} + and find /var/www/html -type f -exec chmod 644 {} +, and ensure the web server user owns the files (chown -R www-data:www-data /var/www/html).',
        badge: 'Linux Security',
      },
      {
        title: 'Scenario #2: Docker Container Crash Loop',
        question: 'A container exits with code 137 immediately after starting. What is the root cause and how do you verify it?',
        modelResponse: 'Exit code 137 is 128 + 9 (SIGKILL), which almost always means the Linux kernel Out-Of-Memory (OOM) killer terminated the container for exceeding its cgroup memory limit. Verify by running docker inspect <container_id> --format=\'{{.State.OOMKilled}}\' (returns true) or checking dmesg -T | grep -i oom.',
        badge: 'Container Triage',
      },
      {
        title: 'Scenario #3: Automated CI/CD Deployment Health Checks',
        question: 'How do you prevent a bad build from taking down production during a zero-downtime deployment?',
        modelResponse: 'Use Blue/Green or Rolling deployments with automated synthetic health checks. Deploy the new version to idle staging/green instances, execute automated integration smoke tests, verify HTTP 200 on /health/ready, and only shift load balancer traffic once all health probes pass. If failure is detected, traffic remains on the Blue cluster with zero customer disruption.',
        badge: 'CI/CD Pipelines',
      },
    ],
  },

  'sql-for-qa-engineers': {
    courseSlug: 'sql-for-qa-engineers',
    courseTitle: 'SQL & Backend Database Audits for QA',
    category: 'Database & SQL',
    featuredScenario: {
      scenarioNumber: 18,
      title: 'A financial app reports that the total transaction amount on the daily user dashboard does not match the sum of successful payments in the backend. Write a SQL query to audit the discrepancy and explain your approach.',
      description: 'Tests relational database querying, NULL handling, data reconciliation, and backend auditing skills.',
      rubricPoints: [
        'Identify Mismatched Aggregates: Compare user balance against transactions filtered strictly by status = \'COMPLETED\' and exclude pending/cancelled rows.',
        'Reconciliation Query: Write an aggregate query joining users and transactions using COALESCE(SUM(t.amount), 0) to handle users with zero transactions.',
        'Audit Orphaned/Duplicate Rows: Check for duplicate transaction references with HAVING count(*) > 1 and detect orphaned payment rows with LEFT JOIN ... WHERE u.id IS NULL.',
        'Timezone Consistency: Verify if the daily dashboard filters by UTC while payments were logged in local server timestamps.',
      ],
    },
    drills: [
      {
        title: 'Scenario #1: Unenrolled Students Verification',
        question: 'Write a SQL query to verify whether any student exists in the database without an active course enrollment record.',
        modelResponse: 'SELECT u.id, u.email FROM users u LEFT JOIN enrollments e ON u.id = e.user_id WHERE e.id IS NULL;',
        badge: 'Live SQL Drill',
        codeSnippet: 'SELECT u.id, u.email, e.course_id\nFROM users u\nLEFT JOIN enrollments e ON u.id = e.user_id\nWHERE e.id IS NULL;',
      },
      {
        title: 'Scenario #2: WHERE vs HAVING in QA Audits',
        question: 'Explain when to use WHERE vs HAVING when auditing QA database anomalies.',
        modelResponse: 'WHERE filters individual rows BEFORE aggregations are calculated (e.g. WHERE status = \'FAILED\'). HAVING filters aggregated groups AFTER GROUP BY has computed summary values (e.g. GROUP BY user_id HAVING count(*) > 3 to find accounts with repeated failures).',
        badge: 'SQL Fundamentals',
      },
    ],
  },

  'api-testing-postman': {
    courseSlug: 'api-testing-postman',
    courseTitle: 'Postman & REST API Testing Masterclass',
    category: 'API Testing',
    featuredScenario: {
      scenarioNumber: 19,
      title: 'You are assigned to automate testing for a checkout API that charges credit cards. What test cases do you automate in Postman to ensure security, idempotency, and data validation?',
      description: 'Tests API test design, idempotency keys, boundary status codes, auth headers, and response payload validation.',
      rubricPoints: [
        'Idempotency Testing: Send the exact same payment request with the same Idempotency-Key header twice. Verify the second request returns the existing charge result with 200 OK without double-charging the customer\'s card.',
        'Negative & Boundary Payloads: Send negative amounts, missing currency codes, invalid CVV lengths, and verify appropriate HTTP 400/422 responses with structured JSON error schemas.',
        'Authentication & Authorization: Send requests with missing Bearer token (401 Unauthorized), expired token (401), and a token belonging to another user tenant (403 Forbidden).',
        'Automated Chai Assertions: In Postman \'Tests\' tab, validate response time (pm.expect(pm.response.responseTime).to.be.below(800)), status code, and JSON schema.',
      ],
    },
    drills: [
      {
        title: 'Scenario #1: Dynamic Token Chaining',
        question: 'How do you extract a JWT token from a /auth/login response in Postman and automatically apply it to all subsequent requests in a collection?',
        modelResponse: 'In the Tests script of /auth/login: const data = pm.response.json(); pm.collectionVariables.set(\'authToken\', data.token);. Then in the collection Authorization tab, set Auth Type to \'Bearer Token\' with value {{authToken}}. All requests in the collection automatically inherit this token.',
        badge: 'Postman Automation',
      },
      {
        title: 'Scenario #2: HTTP 401 vs 403',
        question: 'What is the semantic difference between HTTP 401 Unauthorized and HTTP 403 Forbidden in API testing?',
        modelResponse: 'HTTP 401 Unauthorized means Unauthenticated: the client has not provided valid credentials (or token is missing/expired). HTTP 403 Forbidden means Authenticated but Unauthorized: the server knows who you are, but your role/permissions do not grant access to the requested resource.',
        badge: 'HTTP Semantics',
      },
    ],
  },

  'qa-interview-mastery': {
    courseSlug: 'qa-interview-mastery',
    courseTitle: 'QA Technical Interview Prep & Defect Portfolio',
    category: 'Career & Interview',
    featuredScenario: {
      scenarioNumber: 10,
      title: 'Tell me about a time you found a critical edge-case bug late in the release cycle that developers didn\'t consider. How did you advocate for the fix without delaying the release unnecessarily?',
      description: 'Evaluates your STAR storytelling methodology, engineering judgment, risk mitigation, and communication with leadership.',
      rubricPoints: [
        'Situation: Clearly state the business context (e.g. international checkout rollout) and the edge case (e.g. non-Latin character encoding in shipping address).',
        'Task: Quantify the potential user impact (e.g. delivery failures for 15% of European orders) and the release deadline constraint.',
        'Action: Demonstrated root cause with reproducible logs, proposed a targeted patch to the encoding utility rather than refactoring the whole flow, and ran quick automated regression smoke tests.',
        'Result: The patch was merged in 45 minutes, verified in staging, release deployed on schedule with zero customer address failures reported.',
      ],
    },
    drills: [
      {
        title: 'Scenario #1: Estimating QA in Agile Sprints',
        question: 'How do you calculate your QA estimation when developers give a story 5 points?',
        modelResponse: 'QA effort is not a direct percentage of dev points. Assess: (1) acceptance criteria complexity, (2) regression scope across affected modules, (3) test data setup and third-party dependencies, and (4) automation test script writing. If a 5-point story has 15 edge cases, QA might need more time than dev.',
        badge: 'Agile QA',
      },
      {
        title: 'Scenario #2: Handling Undocumented Requirements',
        question: 'What do you do if you are asked to test a feature that has no written requirements or acceptance criteria?',
        modelResponse: 'Use Exploratory Testing Charters. Schedule a 15-minute alignment sync with Product Manager and developer to document the core user persona, critical happy path, error states, and out-of-scope behaviors. Document these as acceptance criteria in the user story before testing begins.',
        badge: 'Quality Leadership',
      },
    ],
  },
};
