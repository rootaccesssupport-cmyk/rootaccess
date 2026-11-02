import {
  InstagramCategory,
} from '../types/instagramCreator';

export interface PreCuratedTopicTemplate {
  id: string;
  topicTitle: string;
  category: InstagramCategory;
  targetAudience: string;
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  learningObjective: string;
  whyUseful: string;
  recommendedFormat: 'Reel' | 'Carousel' | 'Single-image post' | 'Story';
  relevantCourseSlug?: string;

  reel: {
    hook: string;
    hookRationale: string;
    durationSeconds: number;
    script: string;
    visualDirections: string;
    onScreenText: string;
    codeSnippet?: string;
    transitions: string;
    closingCta: string;
    coverTitle: string;
  };

  carousel: {
    headline: string;
    slides: {
      slideNumber: number;
      slideType: 'hook' | 'content' | 'code' | 'summary' | 'cta';
      headline: string;
      bodyText: string;
      codeSnippet?: string;
      visualNote: string;
    }[];
    designGuidance: string;
  };

  caption: {
    captionText: string;
    hashtags: string[];
    engagementQuestion: string;
    searchKeywords: string[];
    callToAction: string;
  };

  research: {
    verifiedFacts: string[];
    officialDocSources: {
      title: string;
      url: string;
      dateChecked: string;
      versionContext?: string;
    }[];
    unverifiedClaimsNotice?: string;
    isEvergreen: boolean;
  };
}

export const INSTAGRAM_TOPIC_BANK: PreCuratedTopicTemplate[] = [
  // 1. SQL for beginners and QA testers
  {
    id: 'sql-qa-count-vs-count-distinct',
    topicTitle: 'COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column) in Database Testing',
    category: 'SQL for beginners and QA testers',
    targetAudience: 'Software Testers, QA Engineers, and Data Analysts validating database integrity',
    difficultyLevel: 'Beginner',
    learningObjective: 'Understand how NULL values impact COUNT queries to prevent missing critical database data defects during test runs.',
    whyUseful: '90% of junior QA testers use COUNT(*) everywhere and miss silent database bugs where nullable foreign keys or user phone numbers are silently NULL.',
    recommendedFormat: 'Reel',
    relevantCourseSlug: 'sql-for-qa-engineers',
    reel: {
      hook: 'Stop using COUNT(*) for everything in your QA database tests! Here is why.',
      hookRationale: 'Pattern-interrupt hook addressing a common habit testers make every day in database verification.',
      durationSeconds: 28,
      script: `[0:00 - 0:03] Stop using COUNT(*) for every database audit in your QA testing!
[0:03 - 0:09] COUNT(*) counts every single row in your table, including rows where values are completely NULL.
[0:09 - 0:17] But if you run COUNT(phone_number), SQL automatically ignores NULLs! If your table has 1,000 rows and 200 users have missing phones, COUNT(*) gives 1,000, while COUNT(phone_number) gives 800!
[0:17 - 0:23] And COUNT(DISTINCT email) catches duplicate account creations before they break production payments!
[0:23 - 0:28] Learn practical database testing by doing on RootAccess. Link in bio!`,
      visualDirections: `[0:00 - 0:03] Close-up speaking to camera, pointing directly forward with a warning icon on screen.
[0:03 - 0:09] Screen recording showing a terminal / DBeaver with a database table containing NULL phone_numbers.
[0:09 - 0:17] Split screen: Left query COUNT(*) returning 1000, Right query COUNT(phone_number) returning 800 highlighted in red.
[0:17 - 0:23] Zoom into code editor showing COUNT(DISTINCT email) with duplicate detection explanation.
[0:23 - 0:28] Clean RootAccess logo animation with text: 'Learn by Doing • RootAccess'.`,
      onScreenText: `COUNT(*) = All rows (including NULL)
COUNT(col) = Ignores NULL values
COUNT(DISTINCT col) = Catches duplicates!`,
      codeSnippet: `-- 1. Count all rows
SELECT COUNT(*) FROM users; -- 1000

-- 2. Count non-null phone numbers
SELECT COUNT(phone_number) FROM users; -- 800 (200 are NULL!)

-- 3. Detect duplicate emails
SELECT email, COUNT(*) 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;`,
      transitions: 'Quick whip pan transition to code editor at 0:03, subtle zoom-in on the 800 vs 1000 result at 0:14.',
      closingCta: 'Practice real database audits with live SQL sandboxes on RootAccess — Learn by Doing. Link in bio!',
      coverTitle: 'The SQL Mistake 90% of QA Testers Make',
    },
    carousel: {
      headline: 'COUNT(*) vs COUNT(column): Why Your SQL Tests Are Missing Bugs',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'COUNT(*) vs COUNT(column)',
          bodyText: 'Why relying on COUNT(*) alone in your QA database audits lets silent data loss slip into production.',
          visualNote: 'Dark obsidian background with neon cyan SQL keyword styling and a red defect tag.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: '1. What COUNT(*) Actually Does',
          bodyText: 'COUNT(*) counts every physical row returned by your query. It does NOT care if any column is NULL, empty, or uninitialized.',
          codeSnippet: 'SELECT COUNT(*) FROM orders;\n-- Returns: 5,420 (every row)',
          visualNote: 'Card highlighting total row volume.',
        },
        {
          slideNumber: 3,
          slideType: 'code',
          headline: '2. What COUNT(column_name) Does',
          bodyText: 'When you supply a column name, SQL excludes every row where that specific column is NULL! Perfect for verifying data migration completeness.',
          codeSnippet: 'SELECT COUNT(payment_gateway_ref) FROM orders;\n-- Returns: 5,120 (300 orders failed payment sync!)',
          visualNote: 'Red callout highlighting the 300 missing values.',
        },
        {
          slideNumber: 4,
          slideType: 'code',
          headline: '3. Spotting Duplicates with COUNT(DISTINCT)',
          bodyText: 'Use COUNT(DISTINCT) or GROUP BY ... HAVING COUNT(*) > 1 to detect race conditions in signup or transaction flows.',
          codeSnippet: 'SELECT COUNT(DISTINCT user_id) AS unique_users,\n       COUNT(*) AS total_records\nFROM active_subscriptions;',
          visualNote: 'Two column comparison of unique vs total.',
        },
        {
          slideNumber: 5,
          slideType: 'summary',
          headline: 'QA Rule of Thumb',
          bodyText: '• Use COUNT(*) to verify total batch size.\n• Use COUNT(column) to verify mandatory data was populated.\n• Use COUNT(DISTINCT) to catch duplicate record creation.',
          visualNote: 'Bullet checklist with emerald checkmarks.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Master SQL Database Testing',
          bodyText: 'RootAccess teaches hands-on SQL for testers with interactive browser sandboxes and 7-defect capstones.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess logo, minimal dark card with red accent.',
        },
      ],
      designGuidance: 'Black background (#0f172a), crisp white typography, red/rose highlight for bugs, code in JetBrains Mono.',
    },
    caption: {
      captionText: `Are your database verification queries actually checking data integrity, or just counting rows? 📊

When running QA audits or migration sign-offs, COUNT(*) and COUNT(column) are NOT the same:

1️⃣ COUNT(*) counts every single row in the table, even if every column value is NULL.
2️⃣ COUNT(column) evaluates the specific column and silently ignores all NULL entries.
3️⃣ COUNT(DISTINCT column) isolates unique values to expose duplicate IDs or duplicate transactions.

If a data pipeline dropped 300 phone numbers during an ETL sync, COUNT(*) will show 100% green ✅, while COUNT(phone_number) will immediately expose the defect 🚨.

Save this post for your next database test plan! 🔖

👉 Build verified SQL testing skills with hands-on practice at RootAccess. Link in bio!`,
      hashtags: [
        '#SQLTesting',
        '#SoftwareTesting',
        '#DatabaseTesting',
        '#QAEチケット',
        '#DataQuality',
        '#SQLTips',
        '#ManualQA',
        '#RootAccess',
        '#SoftwareEngineering',
        '#TestAutomation',
      ],
      engagementQuestion: 'Which SQL command do you use most often in your test queries? Tell us in the comments! 👇',
      searchKeywords: ['SQL testing for QA', 'COUNT vs COUNT DISTINCT', 'database validation QA', 'SQL null handling'],
      callToAction: 'Save this guide for your next database audit and check the link in bio for RootAccess interactive SQL practice.',
    },
    research: {
      verifiedFacts: [
        'ANSI SQL standard specifies that COUNT(expression) excludes all rows where expression evaluates to NULL.',
        'COUNT(*) is defined by the SQL standard to return the cardinality of the table or group, counting NULL rows identically to non-NULL rows.',
        'PostgreSQL and MySQL both optimize COUNT(*) over full tables without expression evaluation overhead.',
      ],
      officialDocSources: [
        {
          title: 'PostgreSQL Aggregate Functions Documentation',
          url: 'https://www.postgresql.org/docs/current/functions-aggregate.html',
          dateChecked: '2026-11-01',
          versionContext: 'PostgreSQL 16/17',
        },
      ],
      isEvergreen: true,
    },
  },

  // 2. Manual Testing and test case design
  {
    id: 'manual-qa-boundary-value-analysis',
    topicTitle: 'Boundary Value Analysis (BVA): Why Bugs Always Hide at the Edges',
    category: 'Manual Testing and test case design',
    targetAudience: 'Manual Testers, Aspiring QA Engineers, QA Interview Candidates',
    difficultyLevel: 'Beginner',
    learningObjective: 'Master 2-point and 3-point Boundary Value Analysis to write 80% fewer test cases while catching 3x more edge-case bugs.',
    whyUseful: 'Input boundary validation is where developers make 70% of off-by-one errors (using `<` instead of `<=`). Interviewers test this in almost every QA technical round.',
    recommendedFormat: 'Carousel',
    relevantCourseSlug: 'manual-qa-fundamentals',
    reel: {
      hook: 'Why do software bugs ALWAYS hide at the edges? Here is how senior QAs catch them in seconds.',
      hookRationale: 'Curiosity-inducing question that explains a universal software engineering phenomenon.',
      durationSeconds: 32,
      script: `[0:00 - 0:03] Why do software bugs ALWAYS hide at the edges?
[0:03 - 0:10] Imagine a password field that accepts between 8 and 20 characters. Testing 12 characters is easy—it almost always passes.
[0:10 - 0:18] But developers write code with comparison operators like <, >, or <=. And they constantly make off-by-one mistakes!
[0:18 - 0:25] That is why senior testers use Boundary Value Analysis. You test 7 (just below), 8 (minimum), 20 (maximum), and 21 (just above).
[0:25 - 0:32] Four targeted test cases catch what 50 random inputs would miss. Learn practical testing on RootAccess!`,
      visualDirections: `[0:00 - 0:03] Presenter holding up hands showing two boundaries (min and max).
[0:03 - 0:10] Animation of an input field: password length rule [8 - 20 chars].
[0:10 - 0:18] Close up of buggy code: 'if (password.length < 8 || password.length > 20)' vs off-by-one bugs.
[0:18 - 0:25] Graphic showing 4 boundary points: 7, 8, 20, 21 with Pass/Fail badges.
[0:25 - 0:32] RootAccess dashboard with bug simulation challenge.`,
      onScreenText: `Boundary Value Analysis (BVA)
Rule: 8 to 20 chars
Test 7 (Reject)
Test 8 (Accept)
Test 20 (Accept)
Test 21 (Reject)`,
      codeSnippet: `// Developer off-by-one mistake:
if (password.length > 20) { // Should be >= 21 or > 20 depending on requirements
  throw new Error("Password too long");
}`,
      transitions: 'Snap cut between visual input line and code snippet at 0:10.',
      closingCta: 'Practice real defect discovery on RootAccess — Learn by Doing. Link in bio!',
      coverTitle: 'Why Bugs Hide at the Edges (BVA Explained)',
    },
    carousel: {
      headline: 'Boundary Value Analysis: How Senior Testers Find Bugs with 4 Test Cases',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'Boundary Value Analysis (BVA)',
          bodyText: 'How senior QA engineers write fewer test cases but uncover 3x more critical defect tickets.',
          visualNote: 'Minimalist diagram showing an input scale from 0 to 100 with boundary markers.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: 'The Psychology of Off-by-One Bugs',
          bodyText: 'Software engineers write conditions using `<, <=, >, >=`. A single missed equals sign breaks application logic for edge values.',
          visualNote: 'Split graphic showing `< 18` vs `<= 18`.',
        },
        {
          slideNumber: 3,
          slideType: 'content',
          headline: 'The Real-World Scenario',
          bodyText: 'Requirement: An e-commerce discount code is valid for cart values between ₹500 and ₹5,000.\n\nDon\'t waste time testing ₹1,200 or ₹3,500 first!',
          visualNote: 'Cart value widget diagram.',
        },
        {
          slideNumber: 4,
          slideType: 'code',
          headline: 'The 4 Crucial Boundary Values',
          bodyText: '1. ₹499 (Just below min → Should reject)\n2. ₹500 (Minimum edge → Must accept)\n3. ₹5,000 (Maximum edge → Must accept)\n4. ₹5,001 (Just above max → Should reject)',
          visualNote: 'Table mapping input values to Expected Results.',
        },
        {
          slideNumber: 5,
          slideType: 'summary',
          headline: 'When to Use 2-Point vs 3-Point BVA',
          bodyText: '• 2-Point BVA: Test Boundary & Immediate Invalid neighbor (Faster, standard QA).\n• 3-Point BVA: Test Boundary - 1, Boundary, Boundary + 1 (High risk, medical / banking).',
          visualNote: 'Summary comparison cards.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Learn by Doing on RootAccess',
          bodyText: 'Log real defects against our interactive defect simulator and master test case design.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess brand card with red accent.',
        },
      ],
      designGuidance: 'High-contrast black & white layout, red accent for invalid values, green accent for valid boundaries.',
    },
    caption: {
      captionText: `Why do software defects always concentrate right at the boundaries? 🎯

Because humans write code. And when developers write boundary conditions (\`<\` vs \`<=\`, or \`>\` vs \`>=\`), off-by-one errors are the single most common logical bug in production software.

That’s where Boundary Value Analysis (BVA) comes in:

Instead of testing dozens of random inputs in the middle of a valid range, test the exact edge values:
🔹 Just below minimum (Invalid)
🔹 Minimum value (Valid)
🔹 Maximum value (Valid)
🔹 Just above maximum (Invalid)

With just 4 test cases, you test 100% of the highest risk transition points!

Save this carousel for your next sprint planning or QA interview! 📌

Learn practical manual QA and defect reporting by doing on RootAccess. Link in bio!`,
      hashtags: [
        '#ManualTesting',
        '#SoftwareTesting',
        '#QATesting',
        '#TestCaseDesign',
        '#BoundaryValueAnalysis',
        '#ISTQB',
        '#QualityAssurance',
        '#QAEngineer',
        '#RootAccess',
      ],
      engagementQuestion: 'What is the most subtle boundary defect you have ever caught in your testing career? Let us know below! 💬',
      searchKeywords: ['Boundary Value Analysis QA', 'test case design techniques', 'BVA vs Equivalence Partitioning', 'ISTQB boundary values'],
      callToAction: 'Save this post and explore RootAccess Manual QA interactive labs in bio!',
    },
    research: {
      verifiedFacts: [
        'ISTQB Foundation Level syllabus defines Boundary Value Analysis as a black-box test technique based on testing boundaries between equivalence partitions.',
        'Studies in software engineering consistently show off-by-one defects rank among the most frequent logic errors across C, Java, JavaScript, and Python.',
      ],
      officialDocSources: [
        {
          title: 'ISTQB Certified Tester Foundation Level Syllabus v4.0',
          url: 'https://www.istqb.org/certifications/certified-tester-foundation-level',
          dateChecked: '2026-11-01',
          versionContext: 'ISTQB CTFL v4.0',
        },
      ],
      isEvergreen: true,
    },
  },

  // 3. API Testing with Postman
  {
    id: 'api-testing-put-vs-patch',
    topicTitle: 'PUT vs PATCH: The Critical REST API Difference Every QA Must Test',
    category: 'API Testing with Postman',
    targetAudience: 'API Testers, Backend QA Engineers, Developers writing automated tests',
    difficultyLevel: 'Intermediate',
    learningObjective: 'Understand full replacement (PUT) vs partial update (PATCH) and write automated Postman Chai assertions to prevent destructive data overwrites.',
    whyUseful: 'Developers frequently implement PUT as PATCH or vice-versa, causing silent data erasure when partial JSON payloads overwrite missing fields with NULL.',
    recommendedFormat: 'Reel',
    relevantCourseSlug: 'api-testing-postman',
    reel: {
      hook: 'Is PUT just another word for PATCH? If your API testing team thinks so, you are leaking data loss bugs!',
      hookRationale: 'Addresses a ubiquitous REST misunderstanding that leads to real production data loss incidents.',
      durationSeconds: 30,
      script: `[0:00 - 0:03] Is PUT just another word for PATCH? Absolutely not!
[0:03 - 0:10] In REST standards, PUT means: REPLACE the entire resource. If a user has a name, email, and bio, and you send a PUT with ONLY name...
[0:10 - 0:17] A proper PUT will overwrite email and bio with NULL! The whole record is replaced.
[0:17 - 0:24] But PATCH means: MODIFY only the fields sent in the request. Name updates, while email and bio remain completely untouched.
[0:24 - 0:30] Test both in Postman using automated assertions. Learn by doing on RootAccess—link in bio!`,
      visualDirections: `[0:00 - 0:03] Face to camera, shaking head with bold text: PUT ≠ PATCH.
[0:03 - 0:10] Postman interface screenshot showing HTTP PUT request with JSON payload.
[0:10 - 0:17] Animated visual showing User object: email and bio turning red and disappearing into null.
[0:17 - 0:24] Switching HTTP method to PATCH: showing only name updated and bio preserved.
[0:24 - 0:30] RootAccess API testing lesson interface showing automated Chai assertions.`,
      onScreenText: `PUT = Full Replacement (Missing fields become NULL)
PATCH = Partial Modification (Only sent fields update)`,
      codeSnippet: `// Postman automated test tab assertion
pm.test("Status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Only intended field updated", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.name).to.eql("Pavan");
    pm.expect(jsonData.email).to.not.be.null; // Verifies PATCH didn't erase email!
});`,
      transitions: 'Quick slide left to Postman UI at 0:03, zoom in on response JSON at 0:14.',
      closingCta: 'Master API Testing with Postman on RootAccess — Learn by Doing. Practice in bio!',
      coverTitle: 'PUT vs PATCH in API Testing (Watch Before You Test)',
    },
    carousel: {
      headline: 'PUT vs PATCH: Why Mixing Them Up Destroys Production Data',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'PUT vs PATCH',
          bodyText: 'Why treating these two HTTP methods as interchangeable leads to severe silent data loss in REST APIs.',
          visualNote: 'HTTP method badges (PUT in blue, PATCH in purple) with comparison indicator.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: '1. What HTTP PUT Means by Spec (RFC 9110)',
          bodyText: 'PUT replaces the current target resource with the enclosed payload. If you omit fields, the server should replace them with defaults or null.',
          codeSnippet: '// Original: { id: 10, name: "Alice", role: "Admin" }\nPUT /api/users/10\n{ "name": "Alice Cooper" }\n\n// Result:\n{ "id": 10, "name": "Alice Cooper", "role": null }',
          visualNote: 'JSON diff highlighting role becoming null.',
        },
        {
          slideNumber: 3,
          slideType: 'content',
          headline: '2. What HTTP PATCH Means by Spec (RFC 5789)',
          bodyText: 'PATCH applies a delta (partial update). Only the properties provided in the body are modified.',
          codeSnippet: '// Original: { id: 10, name: "Alice", role: "Admin" }\nPATCH /api/users/10\n{ "name": "Alice Cooper" }\n\n// Result:\n{ "id": 10, "name": "Alice Cooper", "role": "Admin" }',
          visualNote: 'JSON diff showing role preserved.',
        },
        {
          slideNumber: 4,
          slideType: 'code',
          headline: '3. How to Test This in Postman',
          bodyText: 'Always write tests in Postman to ensure a PATCH does not reset untouched properties!',
          codeSnippet: 'pm.test("Verify existing properties preserved", () => {\n  const res = pm.response.json();\n  pm.expect(res.role).to.eql("Admin");\n  pm.expect(res.name).to.eql("Alice Cooper");\n});',
          visualNote: 'Postman script editor card.',
        },
        {
          slideNumber: 5,
          slideType: 'summary',
          headline: 'QA Checklist for API Updates',
          bodyText: '✅ Test sending empty payload to PUT (should error or wipe).\n✅ Test sending 1 field to PATCH (should keep all other fields).\n✅ Verify Idempotency: Multiple identical PUTs produce same state.',
          visualNote: 'Clean checklist with green indicators.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Become an API Testing Pro',
          bodyText: 'RootAccess offers a hands-on 5-day Postman API Testing track with automated Chai scripts and mock API sandboxes.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess brand card with link callout.',
        },
      ],
      designGuidance: 'Dark theme, distinct color badges for HTTP methods, monospace syntax highlighting.',
    },
    caption: {
      captionText: `Are your automated API tests distinguishing between HTTP PUT and HTTP PATCH? ⚡

According to the official IETF HTTP specifications:
🔹 PUT (RFC 9110): Replaces the ENTIRE resource. If you send a partial payload, omitted fields can be overwritten or set to null.
🔹 PATCH (RFC 5789): Applies partial modifications. Only the specified attributes change, while all existing properties are preserved.

Common bug caught in QA audits:
A developer implements an endpoint as PUT, but an engineer only sends the user's updated phone number in the mobile app. Suddenly, the user's saved addresses and preferences disappear! 💥

How to test in Postman:
1. GET the resource to capture baseline attributes.
2. Send your PATCH or PUT request.
3. Validate not only the changed field, but assert that untouched fields weren't wiped!

Save this cheat sheet for your next API testing sprint! 🔖

Learn API Testing with Postman by doing at RootAccess. Link in bio!`,
      hashtags: [
        '#APITesting',
        '#Postman',
        '#RESTAPI',
        '#SoftwareQA',
        '#QAEngineer',
        '#PostmanTips',
        '#BackendTesting',
        '#QualityAssurance',
        '#RootAccess',
      ],
      engagementQuestion: 'Have you ever found a backend bug where a PUT request wiped out existing database fields? Drop a comment! 💬',
      searchKeywords: ['PUT vs PATCH API testing', 'Postman tests for PUT and PATCH', 'REST API testing best practices', 'HTTP status codes QA'],
      callToAction: 'Save this post and enroll in our 5-day API Testing track in bio!',
    },
    research: {
      verifiedFacts: [
        'RFC 9110 Section 9.3.4 explicitly defines PUT as creating or replacing the state of the target resource.',
        'RFC 5789 defines PATCH for applying partial modifications to a resource.',
        'PUT is defined as idempotent (multiple identical requests result in same resource state), whereas PATCH is not guaranteed to be idempotent.',
      ],
      officialDocSources: [
        {
          title: 'RFC 9110: HTTP Semantics (PUT)',
          url: 'https://www.rfc-editor.org/rfc/rfc9110.html#section-9.3.4',
          dateChecked: '2026-11-01',
          versionContext: 'IETF HTTP Standard',
        },
        {
          title: 'Postman Test Scripts Documentation',
          url: 'https://learning.postman.com/docs/writing-scripts/test-scripts/',
          dateChecked: '2026-11-01',
          versionContext: 'Postman v11',
        },
      ],
      isEvergreen: true,
    },
  },

  // 4. Playwright Automation with JavaScript
  {
    id: 'playwright-locators-getbyrole',
    topicTitle: 'Why Playwright page.getByRole() Beats XPath and CSS Selectors Every Single Time',
    category: 'Playwright Automation with JavaScript',
    targetAudience: 'Automation Engineers, SDETs, Manual testers learning Playwright',
    difficultyLevel: 'Intermediate',
    learningObjective: 'Learn to use Playwright user-facing locators (getByRole, getByText) to create flaky-free, resilient automation suites that mimic real users.',
    whyUseful: 'XPath and brittle CSS classes break every time UI libraries update styles or DOM structures. getByRole tests accessibility and remains resilient across redesigns.',
    recommendedFormat: 'Reel',
    relevantCourseSlug: 'playwright-automation',
    reel: {
      hook: 'If your automated Playwright tests are still using XPath like this, you need to stop right now!',
      hookRationale: 'Direct visual comparison calling out brittle automation code that causes test flakiness.',
      durationSeconds: 34,
      script: `[0:00 - 0:03] If your Playwright tests are still using XPath like this... stop right now!
[0:03 - 0:11] Brittle XPaths like //div[2]/form/button break the moment a frontend developer changes a CSS class or adds a banner.
[0:11 - 0:18] Instead, Playwright official best practice recommends user-facing locators: page.getByRole!
[0:18 - 0:26] Writing page.getByRole('button', { name: 'Submit Payment' }) finds the exact button real users click, works with accessibility trees, and survives UI redesigns!
[0:26 - 0:34] Plus auto-waiting prevents flaky timeouts. Master 20 days of practical Playwright on RootAccess! Link in bio!`,
      visualDirections: `[0:00 - 0:03] Screen recording showing a long, ugly XPath highlighted in bright red with a big ❌.
[0:03 - 0:11] Fast animation of a DOM tree shifting, causing the XPath locator to time out and fail.
[0:11 - 0:18] Replacing with clean green code: page.getByRole('button', { name: 'Submit Payment' }) with a big ✅.
[0:18 - 0:26] Playwright Inspector highlighting the interactive element in real-time.
[0:26 - 0:34] RootAccess Playwright automation terminal showing green test runner checkmarks.`,
      onScreenText: `❌ Avoid: page.locator('//button[@class="btn-primary-2"]')
✅ Prefer: page.getByRole('button', { name: 'Submit Payment' })
Resilient • Accessible • Flaky-Free`,
      codeSnippet: `// ❌ Brittle XPath (Breaks on CSS change)
await page.locator('//div[1]/button[contains(@class, "pay-btn")]').click();

// ✅ Playwright Recommended Best Practice
await page.getByRole('button', { name: 'Submit Payment' }).click();

// ✅ Assert with Web-First Assertions
await expect(page.getByRole('alert')).toHaveText('Payment successful!');`,
      transitions: 'Glitch transition when showing brittle XPath, smooth slide when revealing getByRole.',
      closingCta: 'Build real Playwright test suites in 20 days on RootAccess — Learn by Doing. Link in bio!',
      coverTitle: 'Stop Using XPath in Playwright (Use This Instead)',
    },
    carousel: {
      headline: 'Stop Using XPath in Playwright: Master Resilient User-Facing Locators',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'Playwright Locator Hierarchy',
          bodyText: 'Why XPath and brittle CSS are costing your QA team hours of maintenance—and what Playwright recommends instead.',
          visualNote: 'Ugly XPath with a strike-through vs clean getByRole.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: '1. Why XPath Causes Flaky Tests',
          bodyText: 'DOM structures change frequently with React, Tailwind, and component libraries. Hardcoded paths like //div[3]/button break on every UI release.',
          codeSnippet: '// Brittle & hard to read:\nawait page.locator("xpath=//div[@id=\'app\']/div[2]/button").click();',
          visualNote: 'Red warning border card.',
        },
        {
          slideNumber: 3,
          slideType: 'code',
          headline: '2. The Gold Standard: getByRole()',
          bodyText: 'getByRole mirrors how users and assistive technologies locate controls on screen: by semantic role and accessible name.',
          codeSnippet: '// Clear, resilient & accessible:\nawait page.getByRole("button", { name: "Sign In" }).click();\nawait page.getByRole("textbox", { name: "Email" }).fill("test@test.com");',
          visualNote: 'Emerald highlight with clean code formatting.',
        },
        {
          slideNumber: 4,
          slideType: 'content',
          headline: '3. The Playwright Locator Priority Order',
          bodyText: '1. page.getByRole() (Highest priority)\n2. page.getByLabel() (Forms & inputs)\n3. page.getByPlaceholder() (Inputs without label)\n4. page.getByText() (Static content)\n5. page.getByTestId() (Last resort when no role exists)',
          visualNote: 'Ranked list with medal badges.',
        },
        {
          slideNumber: 5,
          slideType: 'summary',
          headline: 'Automatic Benefits',
          bodyText: '• Auto-waits for elements to become visible, enabled, and stable.\n• Guarantees accessibility compliance for free.\n• Survives styling updates and class renaming.',
          visualNote: 'Feature benefits card.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Master Playwright Automation',
          bodyText: 'Learn Playwright with JavaScript + AI across 20 days of practical real-world exercises on RootAccess.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess brand card.',
        },
      ],
      designGuidance: 'Dark developer aesthetic, monospace font, clear visual contrast between bad locators (red) and recommended locators (emerald).',
    },
    caption: {
      captionText: `Are your automated Playwright test suites breaking every time developers update a CSS class? 🎭

Playwright's official documentation explicitly warns against using implementation-dependent selectors like XPaths or fragile CSS classes.

Instead, prioritize User-Facing Locators:
1️⃣ \`page.getByRole('button', { name: 'Submit' })\`: Matches the Accessibility Tree exactly like a real user or screen reader.
2️⃣ \`page.getByLabel('Password')\`: Targets form inputs via their linked label.
3️⃣ \`page.getByText('Order Placed')\`: Verifies visible user-facing text.
4️⃣ \`page.getByTestId('data-order-card')\`: Use only when text or role isn't distinct.

Why it matters:
When your frontend team switches from Bootstrap to Tailwind or refactors their DOM, \`page.getByRole\` keeps passing because the button is still a button! 🛡️

Save this post for your next test framework refactor! 📌

Learn Playwright test automation with JavaScript + AI on RootAccess. Link in bio!`,
      hashtags: [
        '#Playwright',
        '#TestAutomation',
        '#SDET',
        '#JavaScriptTesting',
        '#QAEngineer',
        '#SoftwareTesting',
        '#CodingTips',
        '#RootAccess',
      ],
      engagementQuestion: 'Do you still use XPath in your automation framework or have you transitioned to getByRole? Let us know below! 👇',
      searchKeywords: ['Playwright getByRole vs XPath', 'Playwright locators best practices', 'prevent flaky automation tests', 'Playwright JavaScript tutorial'],
      callToAction: 'Save this post and explore RootAccess 20-Day Playwright Automation Course in bio!',
    },
    research: {
      verifiedFacts: [
        'Official Playwright documentation states: "We recommend using role locators when available. They are the closest to how users interact with the page and ensure accessibility."',
        'Playwright locators automatically execute actionability checks (visible, stable, enabled, editable) before performing actions.',
      ],
      officialDocSources: [
        {
          title: 'Playwright Locators Documentation',
          url: 'https://playwright.dev/docs/locators',
          dateChecked: '2026-11-01',
          versionContext: 'Playwright v1.48+',
        },
        {
          title: 'Playwright Best Practices Guide',
          url: 'https://playwright.dev/docs/best-practices',
          dateChecked: '2026-11-01',
          versionContext: 'Playwright v1.48+',
        },
      ],
      isEvergreen: true,
    },
  },

  // 5. Software Testing interview questions
  {
    id: 'interview-severity-vs-priority',
    topicTitle: 'Defect Severity vs Priority: The #1 QA Interview Question with Real Examples',
    category: 'Software Testing interview questions',
    targetAudience: 'Job seekers, QA interview candidates, career switchers',
    difficultyLevel: 'Beginner',
    learningObjective: 'Master the distinction between Defect Severity (technical impact) and Priority (business urgency) with 4 classic real-world quadrant examples.',
    whyUseful: 'Asked in virtually 100% of software testing interviews. Most candidates give textbook definitions but fail to provide compelling practical quadrant examples.',
    recommendedFormat: 'Carousel',
    relevantCourseSlug: 'qa-interview-mastery',
    reel: {
      hook: 'If an interviewer asks you the difference between Severity and Priority, DO NOT just give the textbook definition!',
      hookRationale: 'Warns interview candidates against generic answers and promises the exact formula senior interviewers look for.',
      durationSeconds: 35,
      script: `[0:00 - 0:03] Interviewer asks: 'What is the difference between Defect Severity and Priority?'
[0:03 - 0:10] Do NOT just say 'Severity is technical impact and Priority is business urgency'. Everyone says that!
[0:10 - 0:18] Stand out by giving the 4-Quadrant Framework with real examples:
[0:18 - 0:27] Example 1: High Severity, Low Priority: The app crashes, but only when printing a report in Russian on Internet Explorer 11. Huge technical crash, zero business impact!
[0:27 - 0:35] Example 2: Low Severity, High Priority: Company logo on the login page is misspelled as 'RoootAccess'. Zero technical crash, massive brand damage!
[0:35 - 0:40] Master technical QA interviews with RootAccess. Link in bio!`,
      visualDirections: `[0:00 - 0:03] Roleplay: Presenter wearing glasses as interviewer asking the question.
[0:03 - 0:10] Cut to candidate smiling with a ❌ on basic definition.
[0:10 - 0:18] 2x2 Matrix graphic appearing on screen with 4 quadrants.
[0:18 - 0:27] Quadrant 1 highlight: High Severity / Low Priority with crash icon and IE11 badge.
[0:27 - 0:35] Quadrant 2 highlight: Low Severity / High Priority with company logo misspelling.
[0:35 - 0:40] RootAccess QA Interview Mastery course banner.`,
      onScreenText: `Interviewer: Severity vs Priority?
Don't just give definitions. Give the 4 Quadrants:
1. High Sev / Low Pri: Crash in rare legacy scenario
2. Low Sev / High Pri: Logo typo on home page`,
      transitions: 'Quick snap zoom into the 2x2 matrix at 0:12.',
      closingCta: 'Ace your next tech interview with RootAccess — Learn by Doing. Link in bio!',
      coverTitle: 'Ace "Severity vs Priority" in QA Interviews',
    },
    carousel: {
      headline: 'Severity vs Priority: The 4 Quadrants Every QA Interviewer Expects',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'Severity vs Priority in QA',
          bodyText: 'The #1 interview question that separates junior candidates from high-performing senior QA engineers.',
          visualNote: '2x2 Matrix graphic with contrasting color blocks.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: 'The Core Difference',
          bodyText: '• Severity (QA/Technical): How badly does the defect break system functionality?\n• Priority (Product/Business): How urgently does the business need this fixed in the next release?',
          visualNote: 'Two column comparison card.',
        },
        {
          slideNumber: 3,
          slideType: 'content',
          headline: 'Quadrant 1: High Severity + High Priority',
          bodyText: 'The payment gateway throws a 500 error on the checkout page for all users.\n\nResult: Complete functional breakdown + massive immediate revenue loss. Fix immediately (P0 Hotfix).',
          visualNote: 'Red emergency badge.',
        },
        {
          slideNumber: 4,
          slideType: 'content',
          headline: 'Quadrant 2: High Severity + Low Priority',
          bodyText: 'Application crashes completely, but ONLY on Windows 7 running Arabic language mode with a 10-year-old printer driver.\n\nResult: Fatal crash (High Sev), but 0.001% of users affected (Low Pri).',
          visualNote: 'Amber badge with warning icon.',
        },
        {
          slideNumber: 5,
          slideType: 'content',
          headline: 'Quadrant 3: Low Severity + High Priority',
          bodyText: 'The company logo on the homepage has a typo or the founder\'s name is spelled wrong on the investor press release.\n\nResult: No functional crash (Low Sev), but embarrassing public brand reputation risk (High Pri).',
          visualNote: 'Blue business priority badge.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Practice Mock QA Interviews',
          bodyText: 'RootAccess QA Technical Interview Mastery gives you 50+ scenario breakdowns and senior evaluation rubrics.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess logo with clean red accent.',
        },
      ],
      designGuidance: 'High contrast black and slate aesthetic, clean 2x2 matrix diagrams, legible typography.',
    },
    caption: {
      captionText: `Why do QA interviewers ask "What's the difference between Severity and Priority?" in almost every interview? 🎙️

Because junior testers memorize definitions, while senior testers understand business trade-offs!

Here is the 4-Quadrant Framework to blow away your interviewer:

1️⃣ High Severity, High Priority:
The checkout button throws a 500 internal server error. Core feature broken + revenue lost. Needs an immediate P0 hotfix.

2️⃣ High Severity, Low Priority:
The app crashes completely, but ONLY when exporting a 100,000-row PDF on an unsupported browser like IE11. Technical crash is critical, but user impact is near zero.

3️⃣ Low Severity, High Priority:
The CEO's name or company logo is misspelled on the landing page. Zero functionality broken, but huge brand and credibility risk. Must fix before launch!

4️⃣ Low Severity, Low Priority:
A slight 2px padding misalignment on the footer copyright notice on mobile. Minor cosmetic issue with zero business urgency.

Save this framework for your upcoming QA interviews! 📌

👉 Master technical QA interviews with RootAccess Interview Mastery. Link in bio!`,
      hashtags: [
        '#QAInterview',
        '#SoftwareTesting',
        '#QAEngineer',
        '#ManualTesting',
        '#TestLead',
        '#InterviewPrep',
        '#TechCareers',
        '#RootAccess',
      ],
      engagementQuestion: 'What is the trickiest interview question you have ever faced in a QA interview? Share it below! 👇',
      searchKeywords: ['Severity vs Priority QA interview', 'defect severity examples', 'bug priority vs severity matrix', 'QA interview questions and answers'],
      callToAction: 'Save this post for your interview prep and check out RootAccess interview courses in bio!',
    },
    research: {
      verifiedFacts: [
        'ISTQB defines defect severity as the degree of impact that a defect has on the development or operation of a component or system.',
        'ISTQB defines priority as the level of business importance assigned to an item (e.g. defect) to determine the order in which it should be addressed.',
      ],
      officialDocSources: [
        {
          title: 'ISTQB Standard Glossary of Software Testing Terms',
          url: 'https://glossary.istqb.org/',
          dateChecked: '2026-11-01',
          versionContext: 'ISTQB Standard Glossary',
        },
      ],
      isEvergreen: true,
    },
  },

  // 6. Real-world QA scenarios and debugging
  {
    id: 'real-world-qa-intermittent-race-condition',
    topicTitle: 'How to Triage and Log an Intermittent Bug That Only Happens Sometimes',
    category: 'Real-world QA scenarios and debugging',
    targetAudience: 'Software Testers, QA Engineers, Scrum Team Members',
    difficultyLevel: 'Intermediate',
    learningObjective: 'Learn the 5-step triage framework to reproduce, isolate, and document race conditions and flaky bugs so developers can actually fix them.',
    whyUseful: 'Nothing damages a QA tester\'s credibility faster than logging "Cannot Reproduce" tickets that developers immediately close. This framework turns phantom bugs into reproducible fixes.',
    recommendedFormat: 'Carousel',
    relevantCourseSlug: 'manual-qa-fundamentals',
    reel: {
      hook: 'Ever found a critical bug, showed it to the developer, and they said: \'Works on my machine\'? Here is what to do.',
      hookRationale: 'Empathizes with the universal frustration every QA engineer experiences.',
      durationSeconds: 33,
      script: `[0:00 - 0:03] Ever found a critical bug and the developer said: 'Works on my machine'?
[0:03 - 0:10] Intermittent bugs aren't random. They are usually network latency, race conditions, or state caching.
[0:10 - 0:18] Next time a bug won't reproduce on demand, follow these 3 steps:
[0:18 - 0:25] First, check your browser Network tab with Fast 3G throttling. Race conditions almost always happen when one API call finishes before another!
[0:25 - 0:33] Second, inspect localStorage and cookie state. Third, record your screen with console logs visible!
[0:33 - 0:38] Learn real workplace bug triaging on RootAccess. Link in bio!`,
      visualDirections: `[0:00 - 0:03] Frustrated QA reaction shot with developer saying 'Works on my machine'.
[0:03 - 0:10] Diagram showing two asynchronous API responses racing to update state.
[0:10 - 0:18] Browser DevTools Network tab showing 3G throttling enabled.
[0:18 - 0:25] Chrome DevTools Console showing unhandled promise rejection error.
[0:25 - 0:33] Jira bug ticket template with reproducible steps and HAR network log attached.
[0:33 - 0:38] RootAccess Defect Simulator Lab showing student hunting real seeded bugs.`,
      onScreenText: `'Works on My Machine' Survival Guide:
1. Throttle Network to 3G (Simulate latency)
2. Check for race conditions in API responses
3. Attach HAR file & Console logs to Jira`,
      transitions: 'Quick zoom onto Network throttling dropdown in Chrome DevTools at 0:18.',
      closingCta: 'Hunt real workplace defects with RootAccess — Learn by Doing. Link in bio!',
      coverTitle: 'How to Fix "Works on My Machine" Forever',
    },
    carousel: {
      headline: 'How to Triage Intermittent Bugs (and Kill "Works on My Machine")',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'How to Triage Intermittent Bugs',
          bodyText: 'The 5-step framework to turn elusive phantom bugs into reproducible Jira tickets developers love.',
          visualNote: 'Bug with a magnifying glass in dark obsidian theme.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: 'Bugs are Never "Random"',
          bodyText: 'Software is deterministic. When a bug appears intermittent, it is usually caused by:\n• Asynchronous race conditions\n• Network timing variations\n• Dirty local cache or session state\n• Database connection pool exhaustion',
          visualNote: 'Bullet points with technical root causes.',
        },
        {
          slideNumber: 3,
          slideType: 'content',
          headline: 'Step 1: Throttle Your Network Speed',
          bodyText: 'Developers usually test on ultra-fast local localhost (0ms latency). Open DevTools → Network → Throttle to "Slow 3G". Watch what happens when API #1 returns after API #2!',
          visualNote: 'DevTools Network throttling mockup.',
        },
        {
          slideNumber: 4,
          slideType: 'content',
          headline: 'Step 2: Inspect Local Storage & Session State',
          bodyText: 'Does the bug only happen on the first login after cache clear? Or only when an existing token has expired? Check Application → Storage in DevTools.',
          visualNote: 'Storage inspector graphic.',
        },
        {
          slideNumber: 5,
          slideType: 'summary',
          headline: 'Step 3: What to Put in the Jira Ticket',
          bodyText: '✅ Reproduction rate (e.g. 3 out of 10 attempts)\n✅ Exact system timestamp (to correlate backend server logs)\n✅ Exported .HAR network file\n✅ Screen recording showing DevTools Console open',
          visualNote: 'Jira ticket layout checklist.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Practice Real Defect Triage',
          bodyText: 'RootAccess features a built-in Defect Simulator where you discover, isolate, and log real production-grade bugs.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess platform brand card.',
        },
      ],
      designGuidance: 'Crisp black & slate surfaces, red accents for defects, clean terminal/DevTools UI callouts.',
    },
    caption: {
      captionText: `Nothing is more frustrating than finding a bug that disappears the moment you try to show it to a developer! 👻

Here's a secret: Software bugs are NEVER truly random. 

When a bug is intermittent, it almost always boils down to one of three things:
1️⃣ Asynchronous Race Conditions: Two API requests finish in an unexpected order because of network jitter.
2️⃣ Session & State Pollution: Stale tokens in localStorage or unexpected cookies causing logic branches to fail.
3️⃣ Data Dependencies: The bug only triggers for specific user configurations, like users with zero orders.

How to become a 10x bug reporter:
🔹 Throttle your network in Chrome DevTools to Slow 3G to recreate timing lag.
🔹 Always export a .HAR file so developers can replay the exact network traffic.
🔹 Document the reproduction rate (e.g., "Occurred in 4 out of 10 attempts under 3G throttling").

Save this guide for your next debugging session! 🔖

👉 Practice real defect triaging inside RootAccess Defect Simulator Lab. Link in bio!`,
      hashtags: [
        '#SoftwareTesting',
        '#Debugging',
        '#QAEngineer',
        '#WebDevelopment',
        '#Jira',
        '#ManualTesting',
        '#TechTips',
        '#RootAccess',
      ],
      engagementQuestion: 'What was the hardest bug you ever had to reproduce? Tell us in the comments! 👇',
      searchKeywords: ['how to reproduce intermittent bugs', 'race condition testing QA', 'export HAR file DevTools', 'Jira bug report best practices'],
      callToAction: 'Save this post and practice defect simulation on RootAccess in bio!',
    },
    research: {
      verifiedFacts: [
        'A HAR (HTTP Archive) file records all HTTP requests, headers, query parameters, timing, and response payloads.',
        'Chrome DevTools Network Throttling simulates packet latency and bandwidth constraints to reproduce race conditions.',
      ],
      officialDocSources: [
        {
          title: 'Chrome DevTools Network Analysis Guide',
          url: 'https://developer.chrome.com/docs/devtools/network',
          dateChecked: '2026-11-01',
          versionContext: 'Chrome DevTools 2024+',
        },
      ],
      isEvergreen: true,
    },
  },

  // 7. Common mistakes made by beginners
  {
    id: 'common-mistakes-hardcoded-waits',
    topicTitle: 'Stop Using page.waitForTimeout() / Thread.sleep() in Automated Tests',
    category: 'Common mistakes made by beginners',
    targetAudience: 'Beginner automation engineers, testers writing slow scripts',
    difficultyLevel: 'Beginner',
    learningObjective: 'Eliminate hardcoded sleep delays in favor of dynamic web-first assertions and auto-waiting to speed up test execution by 500%.',
    whyUseful: 'Hardcoded sleeps make CI/CD pipelines excruciatingly slow and fail randomly on slower runners. Playwright has auto-waiting built into its core.',
    recommendedFormat: 'Reel',
    relevantCourseSlug: 'playwright-automation',
    reel: {
      hook: 'If you have page.waitForTimeout(5000) sprinkled throughout your automation scripts... we need to talk.',
      hookRationale: 'Addresses a ubiquitous rookie automation habit that ruins test suite performance in CI/CD.',
      durationSeconds: 27,
      script: `[0:00 - 0:03] If your automation script has page.waitForTimeout(5000) everywhere... stop!
[0:03 - 0:10] Hardcoded sleeps slow down your CI/CD pipelines and still fail randomly on slower cloud runners.
[0:10 - 0:18] Playwright has auto-waiting built into every action. It automatically waits for elements to be visible, stable, and enabled before clicking!
[0:18 - 0:24] And for dynamic state, use web-first assertions like await expect(locator).toBeVisible()!
[0:24 - 0:28] Learn clean, professional automation on RootAccess. Link in bio!`,
      visualDirections: `[0:00 - 0:03] Close up on code: page.waitForTimeout(5000) with a giant red 'NO' stamp.
[0:03 - 0:10] Animated clock spinning endlessly showing a 25-minute slow pipeline execution.
[0:10 - 0:18] Side-by-side code comparison showing auto-waiting action: await page.getByRole('button').click().
[0:18 - 0:24] Highlighting web-first assertion: await expect(page.locator('.toast')).toBeVisible().
[0:24 - 0:28] Fast 1-minute Playwright runner passing all 20 tests.`,
      onScreenText: `❌ Avoid: await page.waitForTimeout(5000);
✅ Prefer: await expect(locator).toBeVisible();
Auto-waiting makes test suites 5x faster!`,
      codeSnippet: `// ❌ Rookie Mistake: Blind 5-second pause
await page.waitForTimeout(5000); 

// ✅ Senior Automation Engineer: Web-First Assertion
await expect(page.getByText('Order Confirmation')).toBeVisible({ timeout: 10000 });`,
      transitions: 'Snap cut from slow clock to fast green terminal run at 0:18.',
      closingCta: 'Write professional Playwright test frameworks on RootAccess — Learn by Doing. Link in bio!',
      coverTitle: 'Stop Using Sleep in Test Automation',
    },
    carousel: {
      headline: 'Why Hardcoded Sleeps Ruin Automated Testing (And What to Do Instead)',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'The Danger of Sleep()',
          bodyText: 'Why hardcoded timeouts are the #1 cause of slow, flaky automation suites in CI/CD pipelines.',
          visualNote: 'Clock graphic with error badges.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: 'The Problem with Blind Waits',
          bodyText: 'If you sleep for 5 seconds:\n• If the element appears in 200ms, you wasted 4.8 seconds.\n• If the server takes 5.1 seconds under heavy load, your test fails anyway!',
          visualNote: 'Two column timeline comparison.',
        },
        {
          slideNumber: 3,
          slideType: 'code',
          headline: 'Playwright Built-in Actionability',
          bodyText: 'Playwright checks actionability before every action (clicks, fills, checks):\n• Attached to DOM\n• Visible\n• Stable (not animating)\n• Receives Events',
          codeSnippet: '// Auto-waits up to default 30s automatically:\nawait page.getByRole("button", { name: "Save" }).click();',
          visualNote: 'Code editor card with checkmarks.',
        },
        {
          slideNumber: 4,
          slideType: 'code',
          headline: 'Web-First Assertions',
          bodyText: 'Use expect() with web-first matchers. They poll continuously until the condition is met or the timeout expires.',
          codeSnippet: '// Polls until condition is satisfied (or times out):\nawait expect(page.getByRole("alert")).toHaveText("Saved!");',
          visualNote: 'Terminal execution diagram.',
        },
        {
          slideNumber: 5,
          slideType: 'summary',
          headline: 'Immediate Benefits',
          bodyText: '🚀 Test suites run up to 5x faster in GitHub Actions.\n🛡️ Eliminates random false-positive failures.\n🧹 Cleaner, more maintainable test code.',
          visualNote: 'Performance metrics badge.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Master Playwright Automation',
          bodyText: 'Build robust automation frameworks across 20 structured days on RootAccess.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess brand card.',
        },
      ],
      designGuidance: 'Modern dark theme, crisp red/green comparison highlights, clean code font.',
    },
    caption: {
      captionText: `Are you still writing \`await page.waitForTimeout(5000)\` or \`Thread.sleep(5000)\` in your automation test suites? 🛑

Here is why every senior SDET removes them immediately:

1️⃣ They make tests excruciatingly slow: If you have 50 tests with 2 sleeps each, your test suite wastes over 8 minutes doing literally nothing!
2️⃣ They STILL fail in CI: If a cloud runner experiences network lag and takes 5.1 seconds, your test fails with a false positive.

The modern solution:
Playwright includes built-in auto-waiting! Before performing actions like \`.click()\`, Playwright automatically waits for:
✅ Element to be attached to DOM
✅ Element to be visible
✅ Element to stop moving/animating
✅ Element to be enabled

For conditional visibility, use Web-First Assertions:
\`await expect(page.getByRole('alert')).toBeVisible();\`
This polls the DOM and resolves the instant the element is ready!

Save this post to clean up your automation framework! 📌

👉 Master Playwright automation with JavaScript + AI on RootAccess. Link in bio!`,
      hashtags: [
        '#TestAutomation',
        '#Playwright',
        '#Selenium',
        '#SoftwareEngineering',
        '#SDET',
        '#CleanCode',
        '#QAEngineer',
        '#RootAccess',
      ],
      engagementQuestion: 'How long does your company\'s automated test suite take to run in CI? Drop your times below! ⏱️',
      searchKeywords: ['waitForTimeout Playwright alternative', 'auto waiting in Playwright', 'speed up automation tests in CI/CD', 'web first assertions'],
      callToAction: 'Save this post and check out the RootAccess 20-Day Playwright track in bio!',
    },
    research: {
      verifiedFacts: [
        'Playwright documentation states: "Discouraged: page.waitForTimeout(). Never use this method in production tests; use web-first assertions instead."',
        'Playwright auto-waits for elements to pass actionability checks before actions are executed.',
      ],
      officialDocSources: [
        {
          title: 'Playwright Auto-waiting Documentation',
          url: 'https://playwright.dev/docs/actionability',
          dateChecked: '2026-11-01',
          versionContext: 'Playwright v1.48+',
        },
      ],
      isEvergreen: true,
    },
  },

  // 8. JavaScript fundamentals for testers
  {
    id: 'js-truthy-falsy-strict-equality',
    topicTitle: '== vs === and Truthy/Falsy Pitfalls in Test Automation',
    category: 'JavaScript fundamentals for testers',
    targetAudience: 'QA Testers transitioning into automation, JavaScript learners',
    difficultyLevel: 'Beginner',
    learningObjective: 'Understand JavaScript type coercion in assertions so your automated test validations never pass falsely on \'0\' vs false.',
    whyUseful: 'Using loose equality (==) in test scripts often makes test assertions report false positives (passing when the backend data is actually corrupt).',
    recommendedFormat: 'Reel',
    relevantCourseSlug: 'playwright-automation',
    reel: {
      hook: 'Why did this automated test PASS when the backend data was completely wrong? JavaScript type coercion!',
      hookRationale: 'Demonstrates a shocking bug where an assertion passes falsely because of loose equality.',
      durationSeconds: 29,
      script: `[0:00 - 0:03] Why did this automated test pass when the backend data was completely broken?
[0:03 - 0:10] In JavaScript, loose equality == coerces types automatically. So 0 == '' is TRUE, and false == '0' is TRUE!
[0:10 - 0:18] If your test checks if user balance is zero using loose equality, an empty string '' passes as valid payment balance!
[0:18 - 0:24] Always use strict equality === and expect().toBe() in your automation suites to compare both value AND type.
[0:24 - 0:29] Master JavaScript for automation testers on RootAccess. Link in bio!`,
      visualDirections: `[0:00 - 0:03] Surprised tester reaction with a green checkmark next to a broken cart total.
[0:03 - 0:10] Terminal showing Node.js REPL: typing '0 == false' returning 'true' in red.
[0:10 - 0:18] Diagram showing API payload returning "" (empty string) passing assertion: if (balance == 0).
[0:18 - 0:24] Refactoring to strict equality: expect(balance).toBe(0) catching the defect.
[0:24 - 0:29] RootAccess Playwright & JS coding lab banner.`,
      onScreenText: `JavaScript Coercion Traps:
0 == '' -> TRUE!
false == '0' -> TRUE!
null == undefined -> TRUE!
Always use === and expect().toBe()`,
      codeSnippet: `// ❌ Dangerous loose equality:
if (accountBalance == 0) { // Passes if balance is "" or false!
  allowFreeAccess();
}

// ✅ Strict verification for QA automation:
expect(accountBalance).toBe(0); // Checks both number type and exact 0 value`,
      transitions: 'Quick whip pan into the code editor comparison at 0:10.',
      closingCta: 'Learn JavaScript specifically for test automation on RootAccess — Learn by Doing. Link in bio!',
      coverTitle: 'The JavaScript Trap That Fakes Passing Tests',
    },
    carousel: {
      headline: '== vs ===: The JavaScript Coercion Trap Every Tester Must Know',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'JavaScript Coercion for Testers',
          bodyText: 'Why loose equality in test scripts lets broken backend responses pass validation undetected.',
          visualNote: 'Comparison card between == and ===.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: '1. The 7 Falsy Values in JavaScript',
          bodyText: 'Only 7 values evaluate to false in boolean contexts:\n• false\n• 0 and -0\n• "" (empty string)\n• null\n• undefined\n• NaN\n• 0n (BigInt zero)',
          visualNote: 'Pill tags with the 7 falsy values.',
        },
        {
          slideNumber: 3,
          slideType: 'code',
          headline: '2. Why == Breaks Test Logic',
          bodyText: 'Loose equality (==) tries to force types to match before comparing. This creates bizarre logic failures:',
          codeSnippet: '0 == false;       // true\n"" == 0;          // true\n"0" == false;     // true\nnull == undefined;// true',
          visualNote: 'Red syntax block with unexpected true results.',
        },
        {
          slideNumber: 4,
          slideType: 'code',
          headline: '3. Why === Saves Your Test Suite',
          bodyText: 'Strict equality (===) checks that BOTH the data type and the underlying value match with zero conversion.',
          codeSnippet: '0 === false;       // false (number !== boolean)\n"" === 0;          // false (string !== number)\n"0" === false;     // false\nnull === undefined;// false',
          visualNote: 'Green syntax block with correct false results.',
        },
        {
          slideNumber: 5,
          slideType: 'summary',
          headline: 'Automation Assertion Rule',
          bodyText: 'In Playwright, Jest, or Vitest:\n• Use expect(val).toBe(expected) for primitive values (strict equality).\n• Use expect(obj).toEqual(expected) for deep object comparison.\n• Avoid loose custom JS comparisons.',
          visualNote: 'Assertion cheat sheet.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Learn JavaScript for Automation',
          bodyText: 'RootAccess teaches hands-on JavaScript from scratch designed specifically for QA engineers.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess brand card.',
        },
      ],
      designGuidance: 'Minimal dark theme, high contrast red for coercion gotchas, emerald for strict equality.',
    },
    caption: {
      captionText: `Did you know that in JavaScript, \`0 == ''\` evaluates to TRUE? 🤯

When writing automated assertions in Playwright or Cypress, understanding type coercion is essential:

🔹 Loose Equality (\`==\`): Converts both operands to a common type before comparing. This means:
\`0 == false\` -> true
\`"" == 0\` -> true
\`null == undefined\` -> true

If an API response returns an empty string \`""\` instead of \`0\`, a loose check will say "All good! ✅", completely masking a backend data bug!

🔹 Strict Equality (\`===\`): Checks both data type AND value without conversion.
\`"" === 0\` -> false 🚨
\`0 === false\` -> false 🚨

Best practice in modern test automation:
Always use strict matchers like \`expect(res.status).toBe(200)\` or \`expect(user.isAdmin).toBe(true)\`.

Save this post to avoid flaky assertions! 📌

👉 Master JavaScript test automation with RootAccess. Link in bio!`,
      hashtags: [
        '#JavaScript',
        '#SoftwareTesting',
        '#TestAutomation',
        '#SDET',
        '#Playwright',
        '#WebDevelopment',
        '#CodingTips',
        '#RootAccess',
      ],
      engagementQuestion: 'What is the weirdest JavaScript behavior you have ever encountered in your code? Tell us below! 😂',
      searchKeywords: ['JavaScript equality for QA', 'double equals vs triple equals', 'falsy values in JavaScript test automation', 'Playwright assertions best practices'],
      callToAction: 'Save this post and check our 20-Day Playwright track in bio!',
    },
    research: {
      verifiedFacts: [
        'ECMAScript specification defines Abstract Equality Comparison (==) with type coercion steps, and Strict Equality Comparison (===) requiring identical types.',
        'Playwright and Jest expect().toBe() matcher uses Object.is() for strict equality comparison.',
      ],
      officialDocSources: [
        {
          title: 'MDN Web Docs: Equality comparisons and sameness',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness',
          dateChecked: '2026-11-01',
          versionContext: 'ECMAScript 2024',
        },
      ],
      isEvergreen: true,
    },
  },

  // 9. Automation framework best practices
  {
    id: 'framework-page-object-model',
    topicTitle: 'Page Object Model (POM): The Architecture That Saves 100+ Hours of Maintenance',
    category: 'Automation framework best practices',
    targetAudience: 'Automation testers, QA leads, test framework architects',
    difficultyLevel: 'Intermediate',
    learningObjective: 'Structure test automation using the Page Object Model design pattern to decouple UI locators from test logic for maximum maintainability.',
    whyUseful: 'When login button locators change across 40 test files, procedural scripts require 40 manual edits. In POM, you update exactly 1 line of code.',
    recommendedFormat: 'Carousel',
    relevantCourseSlug: 'playwright-automation',
    reel: {
      hook: 'If a single UI button change forces you to edit 30 different test files... your automation framework is broken!',
      hookRationale: 'Highlights the real maintenance pain of procedural scripts vs clean architectural design.',
      durationSeconds: 31,
      script: `[0:00 - 0:03] If a button change forces you to edit 30 test files... your framework is broken!
[0:03 - 0:10] Procedural automation mixes locators, clicks, and assertions in every test file. When the UI changes, everything breaks at once.
[0:10 - 0:18] The industry standard solution is the Page Object Model.
[0:18 - 0:26] You create a LoginPage class that owns all login locators and actions. Your test files simply call: await loginPage.login(email, pass).
[0:26 - 0:31] Button changes? Update 1 line in the Page Object. All 30 tests stay green! Master POM on RootAccess—link in bio!`,
      visualDirections: `[0:00 - 0:03] Frustrated engineer staring at 30 red failed tests in VS Code.
[0:03 - 0:10] Procedural script spaghetti code highlighted with red arrows pointing everywhere.
[0:10 - 0:18] Clean diagram showing Page Object Model architecture: Test File -> Page Object -> Web Page.
[0:18 - 0:26] Split screen showing clean LoginPage.ts on left, and readable test file on right.
[0:26 - 0:31] RootAccess Day 8 Playwright Page Object Model lesson preview.`,
      onScreenText: `Procedural Scripting: 30 broken files
Page Object Model (POM): 1 line update!
Decouple locators from test assertions.`,
      codeSnippet: `// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}
  readonly emailInput = this.page.getByLabel('Email');
  readonly submitButton = this.page.getByRole('button', { name: 'Sign In' });

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}`,
      transitions: 'Whip pan from messy procedural script to clean POM class at 0:12.',
      closingCta: 'Learn professional Page Object Model architectures on RootAccess — Learn by Doing. Link in bio!',
      coverTitle: 'Why Senior SDETs Always Use Page Object Model',
    },
    carousel: {
      headline: 'The Page Object Model (POM): The Architecture Every Senior SDET Uses',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'Page Object Model (POM)',
          bodyText: 'Why top tech engineering teams refuse to write procedural automation scripts.',
          visualNote: 'Architectural diagram comparing Spaghetti vs Modular POM.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: '1. The Procedural Anti-Pattern',
          bodyText: 'Every test file contains direct locators:\nawait page.locator(".btn-login").click();\n\nWhen developers rename the class, you have to find and replace across 50 files. Flaky, slow, and unmaintainable.',
          visualNote: 'Messy code illustration.',
        },
        {
          slideNumber: 3,
          slideType: 'code',
          headline: '2. The Page Object Class',
          bodyText: 'Encapsulate locators and business user workflows into dedicated classes:',
          codeSnippet: 'export class CheckoutPage {\n  constructor(readonly page: Page) {}\n  readonly payBtn = this.page.getByRole("button", { name: "Pay Now" });\n\n  async completePayment() {\n    await this.payBtn.click();\n  }\n}',
          visualNote: 'Class architecture card.',
        },
        {
          slideNumber: 4,
          slideType: 'code',
          headline: '3. Clean, Human-Readable Test Files',
          bodyText: 'Your test files read like plain English user stories, containing zero raw locators:',
          codeSnippet: 'test("user completes checkout", async ({ page }) => {\n  const checkout = new CheckoutPage(page);\n  await checkout.completePayment();\n  await expect(page.getByText("Success")).toBeVisible();\n});',
          visualNote: 'Clean test file snippet.',
        },
        {
          slideNumber: 5,
          slideType: 'summary',
          headline: 'The 3 Golden Rules of POM',
          bodyText: '1. Page Objects should NEVER contain assertions (leave expect in test files).\n2. Methods return new Page Objects or void.\n3. One Page Object per logical UI screen or reusable component.',
          visualNote: 'Checklist card.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Build Industry-Grade Frameworks',
          bodyText: 'RootAccess Day 8-12 walks you through constructing a complete Page Object Model framework step-by-step.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess brand card.',
        },
      ],
      designGuidance: 'High-contrast dark layout, architectural block diagrams, clean code syntax.',
    },
    caption: {
      captionText: `Have you ever had to fix 40 different test files because the frontend team changed the ID of a single button? 😩

That happens when test scripts are written procedurally without architectural separation.

The industry-standard solution is the Page Object Model (POM):
1️⃣ Encapsulation: Each page or component has its own TypeScript class that holds its locators and actions.
2️⃣ Readability: Test files read like business specifications (e.g. \`await checkoutPage.applyDiscount('ROOT2026')\`).
3️⃣ Single Point of Maintenance: When UI changes, you update exactly ONE line in the page class—and every test referencing it is instantly fixed!

The #1 rule most people get wrong:
Don't put test assertions (\`expect\`) inside your Page Objects! Keep assertions in the test spec so failures show the exact test step that failed.

Save this architecture blueprint! 📌

👉 Learn real Page Object Model frameworks in our 20-Day Playwright track. Link in bio!`,
      hashtags: [
        '#TestAutomation',
        '#SDET',
        '#Playwright',
        '#SoftwareArchitecture',
        '#PageObjectModel',
        '#SoftwareEngineering',
        '#CodingTips',
        '#RootAccess',
      ],
      engagementQuestion: 'Does your company use Page Object Model, Screenplay pattern, or plain scripts? Share your stack below! 💻',
      searchKeywords: ['Page Object Model Playwright', 'POM architecture test automation', 'clean test code practices', 'SDET framework design'],
      callToAction: 'Save this post and explore RootAccess Playwright masterclass in bio!',
    },
    research: {
      verifiedFacts: [
        'Playwright official documentation explicitly recommends Page Object Models to simplify test code and structure web pages.',
        'Martin Fowler defines the Page Object pattern as representing an abstraction of the UI that enables tests to operate on the page through a clean API.',
      ],
      officialDocSources: [
        {
          title: 'Playwright Page Object Models Documentation',
          url: 'https://playwright.dev/docs/pom',
          dateChecked: '2026-11-01',
          versionContext: 'Playwright v1.48+',
        },
      ],
      isEvergreen: true,
    },
  },

  // 10. AI-assisted software testing
  {
    id: 'ai-assisted-testing-edge-case-matrices',
    topicTitle: 'How Senior QAs Actually Use AI to Generate Bulletproof Test Matrices',
    category: 'AI-assisted software testing',
    targetAudience: 'Manual testers, QA engineers, tech leads exploring AI productivity',
    difficultyLevel: 'Intermediate',
    learningObjective: 'Use AI prompting effectively to generate comprehensive boundary and equivalence test matrices, without trusting hallucinated assertions.',
    whyUseful: 'Most testers write weak prompts like "Write test cases for login" and get generic garbage. Prompting with domain constraints and state transitions unlocks 10x defect coverage.',
    recommendedFormat: 'Reel',
    relevantCourseSlug: 'playwright-automation',
    reel: {
      hook: 'Most testers use AI completely wrong! They ask: \'Write test cases for checkout\' and get generic garbage. Here is how senior QAs do it.',
      hookRationale: 'Addresses poor AI prompting habits and promises the exact prompt template used by senior engineers.',
      durationSeconds: 32,
      script: `[0:00 - 0:03] Most testers use AI completely wrong!
[0:03 - 0:10] Asking ChatGPT: 'Write test cases for checkout' gives you 10 generic textbook bullets that find zero real defects.
[0:10 - 0:18] Senior QAs provide constraints, state transitions, and boundary values!
[0:18 - 0:26] Prompt with: 'Here is the JSON payload and state machine. Generate a 2D equivalence matrix covering network timeouts, coupon concurrency, and currency rounding.'
[0:26 - 0:32] AI generates the edge cases; you verify the technical accuracy. Learn AI-augmented testing on RootAccess—link in bio!`,
      visualDirections: `[0:00 - 0:03] Face to camera with text overlay: 'AI in QA: Doing It Wrong vs Doing It Right'.
[0:03 - 0:10] Showing a generic AI response with boring bullet points: 'Test valid card, test invalid card'.
[0:10 - 0:18] Cut to structured Prompt Engineering template with input boundaries and state machine.
[0:18 - 0:26] AI outputting a high-value markdown test matrix covering concurrency and race conditions.
[0:26 - 0:32] RootAccess logo and practical automation track preview.`,
      onScreenText: `❌ Weak Prompt: 'Write test cases for login'
✅ Senior Prompt: 'Generate edge-case state matrix for concurrent auth token refreshes'
AI suggests • Human verifies`,
      codeSnippet: `// Senior QA AI Prompt Template:
"Act as a Principal QA Engineer.
Analyze this API endpoint: POST /api/v1/payments
Payload schema: { amount: number, currency: string, idempotency_key: string }
Generate a pairwise test matrix covering:
1. Idempotency race conditions (2 concurrent identical keys)
2. Negative currency rounding
3. Expired payment gateway webhooks"`,
      transitions: 'Fast slide from weak prompt to structured prompt template at 0:12.',
      closingCta: 'Learn practical AI-assisted testing on RootAccess — Learn by Doing. Link in bio!',
      coverTitle: 'How Senior QAs Actually Use AI',
    },
    carousel: {
      headline: 'How Senior QAs Use AI (Without Getting Hallucinated Garbage)',
      slides: [
        {
          slideNumber: 1,
          slideType: 'hook',
          headline: 'AI-Assisted Software Testing',
          bodyText: 'The prompt framework that turns AI from a generic toy into a 10x edge-case discovery assistant.',
          visualNote: 'AI chip graphic with QA magnifying glass.',
        },
        {
          slideNumber: 2,
          slideType: 'content',
          headline: 'The Golden Rule of AI in QA',
          bodyText: 'AI is a brainstorming generator, NOT a test oracle. Never blindly copy AI-generated assertions into production test suites without technical verification.',
          visualNote: 'Shield icon with verification warning.',
        },
        {
          slideNumber: 3,
          slideType: 'content',
          headline: 'Step 1: Feed It Real Constraints',
          bodyText: 'Don\'t ask for "test cases for login". Feed it:\n• Database column lengths & data types\n• HTTP Status code specifications\n• Edge boundaries (min, max, null, special characters)',
          visualNote: 'Input constraint diagram.',
        },
        {
          slideNumber: 4,
          slideType: 'code',
          headline: 'Step 2: Request Pairwise / 2D Matrices',
          bodyText: 'Ask for combinatorial coverage to test interactions between multiple input dropdowns:',
          codeSnippet: '"Generate a pairwise test matrix combining:\n- User role: [Admin, Guest, Banned]\n- Device: [iOS, Android, Desktop]\n- Payment: [UPI, Card, NetBanking]\nHighlight highest risk combinatorial bugs."',
          visualNote: 'Pairwise testing prompt card.',
        },
        {
          slideNumber: 5,
          slideType: 'summary',
          headline: 'Where AI Excels in QA',
          bodyText: '✅ Generating synthetic test data (realistic Indian names, addresses, edge UUIDs)\n✅ Finding boundary combinations you forgot to consider\n✅ Drafting regular expressions for test validators',
          visualNote: 'Green checklist card.',
        },
        {
          slideNumber: 6,
          slideType: 'cta',
          headline: 'Master AI-Assisted QA',
          bodyText: 'RootAccess integrates AI tool workflows into Playwright and API testing tracks so you learn practical, verified techniques.\n\nRootAccess — Learn by Doing.',
          visualNote: 'RootAccess brand card.',
        },
      ],
      designGuidance: 'High-tech dark theme, purple and cyan AI accents, crisp typography.',
    },
    caption: {
      captionText: `Is AI going to replace QA engineers? No. But QA engineers who know how to prompt AI effectively are already 5x faster than those who don't! 🤖⚡

Most testers ask AI: "Write test cases for an e-commerce checkout page."
The result? 10 generic, superficial test cases you could have written in 30 seconds.

How senior QAs prompt AI for high-impact edge cases:
1️⃣ Provide Architecture Context: Share API schemas, database constraints, and state transitions.
2️⃣ Request Combinatorial Matrices: Ask for Pairwise (All-Pairs) matrices to test combinations of browser, payment gateway, and user permissions.
3️⃣ Ask for Failure Modes: "What are 5 subtle race conditions or timeout scenarios that could cause this endpoint to return 500?"

Remember: AI suggests edge cases; the QA engineer verifies technical validity! Never put unverified AI code into production pipelines.

Save this prompt blueprint for your next sprint! 📌

👉 Master Playwright + AI-assisted testing on RootAccess. Link in bio!`,
      hashtags: [
        '#AITesting',
        '#ArtificialIntelligence',
        '#SoftwareTesting',
        '#QAEngineer',
        '#PromptEngineering',
        '#TestAutomation',
        '#TechTrends',
        '#RootAccess',
      ],
      engagementQuestion: 'Do you currently use AI tools (ChatGPT, Claude, Copilot) in your daily testing workflows? How has it helped? 💭',
      searchKeywords: ['AI in software testing', 'prompt engineering for QA engineers', 'pairwise test matrix AI', 'AI assisted test case design'],
      callToAction: 'Save this post and explore RootAccess courses in bio!',
    },
    research: {
      verifiedFacts: [
        'Pairwise (all-pairs) testing mathematically reduces exponential test combinations while maintaining coverage of all two-way input faults.',
        'Industry empirical studies (NIST) show that most software faults are triggered by interactions between 1 or 2 parameters.',
      ],
      officialDocSources: [
        {
          title: 'NIST Practical Combinatorial Testing',
          url: 'https://csrc.nist.gov/publications/detail/sp/800-142/final',
          dateChecked: '2026-11-01',
          versionContext: 'NIST SP 800-142',
        },
      ],
      isEvergreen: true,
    },
  },
];

export const INSTAGRAM_CATEGORIES: InstagramCategory[] = [
  'SQL for beginners and QA testers',
  'Manual Testing and test case design',
  'API Testing with Postman',
  'Playwright Automation with JavaScript',
  'JavaScript fundamentals for testers',
  'Software Testing interview questions',
  'Real-world QA scenarios and debugging',
  'Common mistakes made by beginners',
  'Automation framework best practices',
  'AI-assisted software testing',
];

