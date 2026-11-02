/**
 * Complete 5-Day Practical SQL Course Curriculum
 *
 * Course Title: SQL Fundamentals to Practical Database Testing
 * Duration: 5 Days
 * Approach: Learn by Doing
 */

export interface SqlExercise {
  id: string;
  title: string;
  description: string;
  instruction: string;
  starterSql: string;
  solutionSql: string;
  expectedMinRows?: number;
  expectedColumns?: string[];
  validate: (result: { columns: string[]; rows: any[][]; rowCount: number; error?: string; affectedRows?: number }) => {
    success: boolean;
    feedback: string;
  };
  hints: string[];
}

export interface SqlDayTopic {
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

export interface SqlQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface SqlInterviewQuestion {
  id: string;
  question: string;
  concept: string;
  modelAnswer: string;
  seniorTip: string;
}

export interface SqlDayData {
  dayNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  objectives: string[];
  topics: SqlDayTopic[];
  exercises: SqlExercise[];
  interviewQuestions: SqlInterviewQuestion[];
  quiz: {
    passingScorePercent: number;
    questions: SqlQuizQuestion[];
  };
  summaryTakeaway: string;
}

export const SQL_COURSE_METADATA = {
  id: 'course-sql-qa',
  slug: 'sql-for-qa-engineers',
  title: 'SQL Fundamentals to Practical Database Testing',
  regularPrice: 599,
  launchPrice: 299,
  durationDays: 5,
  estimatedHours: 12,
  level: 'Beginner to Intermediate QA & Data Analysts',
  description:
    'A structured, hands-on 5-day course teaching learners to write queries, analyze business data, investigate defects, detect orphaned records, and validate database migrations.',
};

export const SQL_DAYS_DATA: SqlDayData[] = [
  // ================= DAY 1 =================
  {
    dayNumber: 1,
    title: 'SQL Foundations and Basic Queries',
    subtitle: 'Relational database architecture, data extraction, conditional filtering & sorting',
    badge: 'Day 1 • Core Foundations',
    duration: '2.5 Hours',
    objectives: [
      'Understand relational databases, tables, rows, columns, and primary keys',
      'Master SELECT, column projections, and DISTINCT for deduplication',
      'Filter records using WHERE with comparison (=, !=, <, >, <=, >=) and logical operators (AND, OR, NOT)',
      'Perform range filtering with BETWEEN, membership tests with IN, and wildcard pattern matching with LIKE',
      'Sort outputs using ORDER BY (ASC/DESC) and constrain record counts using LIMIT',
    ],
    topics: [
      {
        title: '1. Relational Database Concepts & The SELECT Statement',
        summary: 'How relational databases organize business data in tables, columns, rows, and primary keys.',
        explanation: `A relational database organizes business information into structured tables.
• **Table:** A named dataset (e.g. \`customers\`, \`orders\`).
• **Column (Field):** A specific attribute with an assigned data type (e.g. \`name\`, \`email\`, \`price\`).
• **Row (Record):** A single distinct instance of data.
• **Primary Key (PK):** A column (or group of columns) that uniquely identifies each row (e.g. \`id\`).

The fundamental SQL statement for data extraction is \`SELECT\`:
\`SELECT column1, column2 FROM table_name;\`
To extract every column, use the asterisk wildcard: \`SELECT * FROM table_name;\`.`,
        codeSnippet: {
          language: 'sql',
          code: `-- Select specific columns from the customers table
SELECT id, name, email, country, tier
FROM customers;

-- Extract unique countries represented in our customer base
SELECT DISTINCT country
FROM customers;`,
        },
        takeaways: [
          'In production environments, avoid SELECT * in automated tests to prevent brittle tests caused by schema additions.',
          'DISTINCT eliminates duplicate rows across the selected column tuple.',
          'Primary keys guarantee uniqueness and non-null values across records.',
        ],
        interviewTip: 'When asked: "Why should we avoid SELECT * in production?", answer that it increases unnecessary network bandwidth, prevents database index-only scans, and breaks client code when column orders change.',
      },
      {
        title: '2. Filtering with WHERE and Comparison Operators',
        summary: 'Select only the rows that satisfy specific logical criteria.',
        explanation: `The \`WHERE\` clause acts as a filter applied to every record in the table before results are returned.
Supported comparison operators:
• \`=\` Equal to
• \`!=\` or \`<>\` Not equal to
• \`>\` Greater than, \`>=\` Greater than or equal to
• \`<\` Less than, \`<=\` Less than or equal to

Combining conditions:
• \`AND\` Requires BOTH conditions to evaluate to true.
• \`OR\` Requires AT LEAST ONE condition to evaluate to true.
• \`NOT\` Inverts the logical condition.
Always use parentheses \`()\` to enforce operator precedence when combining \`AND\` with \`OR\`.`,
        codeSnippet: {
          language: 'sql',
          code: `-- Find all completed orders with a total amount greater than ₹500
SELECT id, customer_id, total_amount, status
FROM orders
WHERE status = 'COMPLETED' AND total_amount > 500;

-- Find customers from India or the US who belong to the 'Gold' tier
SELECT id, name, country, tier
FROM customers
WHERE (country = 'India' OR country = 'United States') AND tier = 'Gold';`,
        },
        takeaways: [
          'Text string literals in SQL must always be wrapped in single quotes (e.g. \'COMPLETED\').',
          'AND takes precedence over OR; always wrap OR conditions in parentheses.',
          'Filtering in the database is orders of magnitude faster than filtering in frontend test code.',
        ],
        interviewTip: 'Interviewers often ask what happens when comparing NULL with `=`. In standard SQL, `column = NULL` always returns UNKNOWN (false). You must use `IS NULL`.',
      },
      {
        title: '3. Range, Membership & Pattern Matching (IN, BETWEEN, LIKE)',
        summary: 'Concise expressions for checking sets, continuous intervals, and text patterns.',
        explanation: `SQL provides dedicated operators for common test filtering patterns:
• **IN (\'val1\', \'val2\'):** Replaces multiple \`OR\` chains when checking membership in a discrete list.
• **BETWEEN min AND max:** Inclusive range check (\`val >= min AND val <= max\`). Works on numbers, dates, and timestamps.
• **LIKE \'pattern\':** Pattern matching for text strings:
  - \`%\` represents zero, one, or multiple characters.
  - \`_\` represents exactly one character.`,
        codeSnippet: {
          language: 'sql',
          code: `-- Find orders with status either PENDING or CANCELLED
SELECT id, customer_id, status, total_amount
FROM orders
WHERE status IN ('PENDING', 'CANCELLED');

-- Find products priced between ₹200 and ₹700 inclusive
SELECT id, name, price, stock_qty
FROM products
WHERE price BETWEEN 200 AND 700;

-- Find all customers whose email address belongs to example.com
SELECT id, name, email
FROM customers
WHERE email LIKE '%@example.com';`,
        },
        takeaways: [
          'IN is cleaner and less error-prone than writing 5 separate OR conditions.',
          'BETWEEN is inclusive of both endpoints (min and max).',
          'Leading wildcards like \`%search\` prevent database indexes from being used in large production tables.',
        ],
      },
      {
        title: '4. Sorting (ORDER BY) and Constraining Rows (LIMIT)',
        summary: 'Controlling presentation order and fetching top-N records.',
        explanation: `Relational tables have no inherent order. Unless you specify \`ORDER BY\`, rows are returned in non-deterministic order.
• \`ORDER BY column_name ASC\` Sorts ascending (default: lowest to highest, A to Z).
• \`ORDER BY column_name DESC\` Sorts descending (highest to lowest, Z to A).
• Multiple columns: \`ORDER BY country ASC, name ASC\`.

• \`LIMIT n\` Constrains the result set to the first \`n\` rows (PostgreSQL, MySQL, SQLite).
In SQL Server use \`TOP (n)\`, and in Oracle use \`FETCH FIRST n ROWS ONLY\`.`,
        codeSnippet: {
          language: 'sql',
          code: `-- Top 3 most expensive orders sorted by total_amount descending
SELECT id, customer_id, total_amount, order_date, status
FROM orders
ORDER BY total_amount DESC
LIMIT 3;

-- Customers ordered by country ascending, then name ascending
SELECT id, name, country, tier
FROM customers
ORDER BY country ASC, name ASC;`,
        },
        takeaways: [
          'Always use ORDER BY when using LIMIT, otherwise the returned rows are arbitrary.',
          'ORDER BY executes near the end of query evaluation, after WHERE filtering.',
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-day1-1',
        title: 'Exercise 1: Retrieve All Customers from India',
        description: 'Practice basic column selection and equality filtering.',
        instruction: 'Write a SQL query to retrieve the id, name, email, and tier for all customers residing in "India".',
        starterSql: 'SELECT id, name, email, tier\nFROM customers\nWHERE country = \'India\';',
        solutionSql: 'SELECT id, name, email, tier FROM customers WHERE country = \'India\';',
        expectedMinRows: 3,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 3) return { success: false, feedback: `Expected 3 customers from India, got ${res.rowCount}. Check your WHERE country filter.` };
          return { success: true, feedback: 'Correct! You successfully retrieved all 3 Indian customers.' };
        },
        hints: ['Use: WHERE country = \'India\'', 'Make sure to select: id, name, email, tier'],
      },
      {
        id: 'ex-day1-2',
        title: 'Exercise 2: Filter Orders by Status and Amount',
        description: 'Combine multiple filter conditions using the AND logical operator.',
        instruction: 'Write a query to retrieve all orders with status "COMPLETED" and total_amount greater than or equal to 500.',
        starterSql: 'SELECT id, customer_id, total_amount, status\nFROM orders\nWHERE status = \'COMPLETED\' AND total_amount >= 500;',
        solutionSql: 'SELECT id, customer_id, total_amount, status FROM orders WHERE status = \'COMPLETED\' AND total_amount >= 500;',
        expectedMinRows: 3,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount < 3) return { success: false, feedback: `Expected at least 3 qualifying orders, received ${res.rowCount}.` };
          return { success: true, feedback: 'Perfect! You filtered completed orders with amount >= 500.' };
        },
        hints: ['Use: WHERE status = \'COMPLETED\' AND total_amount >= 500'],
      },
      {
        id: 'ex-day1-3',
        title: 'Exercise 3: Find Products Within Price Range Using BETWEEN',
        description: 'Verify catalog price ranges using the BETWEEN keyword.',
        instruction: 'Write a query to select name, category, and price from products where price is between 250 and 700, ordered by price ASC.',
        starterSql: 'SELECT name, category, price\nFROM products\nWHERE price BETWEEN 250 AND 700\nORDER BY price ASC;',
        solutionSql: 'SELECT name, category, price FROM products WHERE price BETWEEN 250 AND 700 ORDER BY price ASC;',
        expectedMinRows: 4,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 4) return { success: false, feedback: `Expected 4 products between ₹250 and ₹700, got ${res.rowCount}.` };
          return { success: true, feedback: 'Great job! BETWEEN cleanly captured the ₹250 - ₹700 product range.' };
        },
        hints: ['Use: WHERE price BETWEEN 250 AND 700', 'Add: ORDER BY price ASC'],
      },
      {
        id: 'ex-day1-4',
        title: 'Exercise 4: Pattern Match Customer Names Starting with "A" or "C"',
        description: 'Perform text pattern matching using LIKE and OR.',
        instruction: 'Write a query to select id, name, and country from customers whose name begins with \'A\' OR \'C\'.',
        starterSql: 'SELECT id, name, country\nFROM customers\nWHERE name LIKE \'A%\' OR name LIKE \'C%\';',
        solutionSql: 'SELECT id, name, country FROM customers WHERE name LIKE \'A%\' OR name LIKE \'C%\';',
        expectedMinRows: 2,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 2) return { success: false, feedback: `Expected 2 customers (Alice, Carol), got ${res.rowCount}.` };
          return { success: true, feedback: 'Excellent! Pattern matching with LIKE \'A%\' OR \'C%\' succeeded.' };
        },
        hints: ['Use: WHERE name LIKE \'A%\' OR name LIKE \'C%\''],
      },
      {
        id: 'ex-day1-5',
        title: 'Exercise 5: Identify the Top 2 Highest Value Orders',
        description: 'Sort and limit records to find peak transactional amounts.',
        instruction: 'Select id, total_amount, order_date, and payment_method for the top 2 highest value orders, ordered by total_amount descending.',
        starterSql: 'SELECT id, total_amount, order_date, payment_method\nFROM orders\nORDER BY total_amount DESC\nLIMIT 2;',
        solutionSql: 'SELECT id, total_amount, order_date, payment_method FROM orders ORDER BY total_amount DESC LIMIT 2;',
        expectedMinRows: 2,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 2) return { success: false, feedback: `Expected exactly 2 rows from LIMIT 2, got ${res.rowCount}.` };
          const highest = Number(res.rows[0]?.[1]);
          if (highest < 3000) return { success: false, feedback: 'Make sure your query sorts by total_amount DESC.' };
          return { success: true, feedback: 'Success! You found the top 2 highest value orders (₹3499.00 and ₹1499.00).' };
        },
        hints: ['Add: ORDER BY total_amount DESC', 'Add: LIMIT 2'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-day1-1',
        question: 'What is the logical order of query execution in SQL vs written syntax order?',
        concept: 'SQL Query Processing Lifecycle',
        modelAnswer: 'Although written starting with SELECT, a SQL query executes in the following logical sequence: 1. FROM & JOINs (gather data sources), 2. WHERE (filter individual rows), 3. GROUP BY (aggregate rows), 4. HAVING (filter groups), 5. SELECT (project and evaluate expressions), 6. DISTINCT (remove duplicate tuples), 7. ORDER BY (sort output), 8. LIMIT / OFFSET (truncate rows).',
        seniorTip: 'Explaining why you cannot use a SELECT alias inside a WHERE clause (because WHERE evaluates before SELECT!) immediately signals senior-level SQL mastery to interviewers.',
      },
      {
        id: 'iq-day1-2',
        question: 'How do you check for missing/null values in SQL, and why does column = NULL fail?',
        concept: 'Three-Valued Logic (3VL)',
        modelAnswer: 'In SQL, NULL represents an unknown value, not zero or an empty string. Under Three-Valued Logic (TRUE, FALSE, UNKNOWN), any equality comparison with NULL (e.g. `col = NULL` or `NULL = NULL`) evaluates to UNKNOWN, which evaluates as false in WHERE filters. You must always use the dedicated operators `IS NULL` or `IS NOT NULL`.',
        seniorTip: 'Always cite Three-Valued Logic when answering this question.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q1-1',
          question: 'Which SQL keyword ensures that identical duplicate rows are removed from the query output?',
          options: ['UNIQUE', 'DISTINCT', 'DEDUPLICATE', 'SINGLE'],
          correctAnswerIndex: 1,
          explanation: 'DISTINCT filters duplicate rows from the final result set across all selected columns.',
        },
        {
          id: 'q1-2',
          question: 'Given the query: `SELECT * FROM orders WHERE status = \'PAID\' OR status = \'PENDING\' AND amount > 500;`, which condition executes first without parentheses?',
          options: [
            '`status = \'PAID\' OR status = \'PENDING\'` because it appears first',
            '`status = \'PENDING\' AND amount > 500` because AND has higher operator precedence than OR',
            'Both execute in parallel simultaneously',
            'SQL throws a syntax error if parentheses are omitted',
          ],
          correctAnswerIndex: 1,
          explanation: 'In SQL, AND operator has higher precedence than OR. It evaluates `(status = \'PENDING\' AND amount > 500)` first, which often causes logical defects unless parentheses are used explicitly.',
        },
        {
          id: 'q1-3',
          question: 'What does the wildcard `_` (underscore) represent in a SQL LIKE pattern?',
          options: [
            'Zero or more characters',
            'Exactly one character',
            'Any digit between 0 and 9',
            'A literal whitespace character',
          ],
          correctAnswerIndex: 1,
          explanation: 'In SQL LIKE patterns, `%` matches zero or more characters, while `_` matches exactly one character.',
        },
        {
          id: 'q1-4',
          question: 'Which statement is true regarding the BETWEEN operator in SQL?',
          options: [
            'BETWEEN is exclusive of both the lower and upper bounds',
            'BETWEEN is inclusive of both the lower and upper bounds (val >= min AND val <= max)',
            'BETWEEN only works on integer numeric values, never dates',
            'BETWEEN requires values to be sorted descending',
          ],
          correctAnswerIndex: 1,
          explanation: 'BETWEEN is always inclusive of both endpoint values.',
        },
        {
          id: 'q1-5',
          question: 'Why is it critical to pair a LIMIT clause with an ORDER BY clause?',
          options: [
            'LIMIT syntax fails to compile without ORDER BY',
            'Without ORDER BY, the database returns rows in non-deterministic order, making tests flaky',
            'ORDER BY reduces memory consumption',
            'LIMIT automatically changes ascending order to descending',
          ],
          correctAnswerIndex: 1,
          explanation: 'Relational databases store and retrieve rows set-wise with no guaranteed physical order. Without ORDER BY, LIMIT will yield non-deterministic rows across different test executions.',
        },
      ],
    },
    summaryTakeaway: 'You have mastered core relational data modeling, column projections, conditional filtering with WHERE, compound logic with AND/OR/NOT, membership checking with IN/BETWEEN, pattern matching with LIKE, and deterministic sorting with ORDER BY and LIMIT.',
  },

  // ================= DAY 2 =================
  {
    dayNumber: 2,
    title: 'Aggregations, Grouping, and Joins',
    subtitle: 'Aggregate math functions, GROUP BY, HAVING, multi-table joins, and duplicate row detection',
    badge: 'Day 2 • Relational Analysis',
    duration: '2.5 Hours',
    objectives: [
      'Calculate summary metrics using aggregate functions: COUNT, SUM, AVG, MIN, and MAX',
      'Partition datasets into summary buckets using GROUP BY and filter aggregates with HAVING',
      'Combine disparate tables using INNER JOIN, LEFT JOIN, and RIGHT JOIN',
      'Differentiate 1-to-many relationships and diagnose accidental row duplication caused by improper join conditions',
      'Identify orphaned records where foreign keys point to missing parent rows',
    ],
    topics: [
      {
        title: '1. Aggregate Functions (COUNT, SUM, AVG, MIN, MAX)',
        summary: 'Summarizing thousands of transactional rows into singular business insights.',
        explanation: `Aggregate functions compute a single summary value from a set of numbers or rows:
• **COUNT(\*):** Counts total rows in the table or group, including rows with NULLs.
• **COUNT(column):** Counts non-null values in that specific column.
• **COUNT(DISTINCT column):** Counts unique non-null values.
• **SUM(column):** Calculates the total arithmetic sum of numeric values.
• **AVG(column):** Calculates the mathematical average (arithmetic mean).
• **MIN(column) / MAX(column):** Finds the lowest and highest values.`,
        codeSnippet: {
          language: 'sql',
          code: `-- High-level business KPI metrics
SELECT 
    COUNT(*) AS total_orders,
    SUM(total_amount) AS gross_revenue,
    AVG(total_amount) AS average_order_value,
    MIN(total_amount) AS lowest_order,
    MAX(total_amount) AS peak_order
FROM orders
WHERE status = 'COMPLETED';`,
        },
        takeaways: [
          'COUNT(*) counts rows; COUNT(column_name) ignores NULL rows.',
          'AVG automatically ignores NULL values, which can skew test calculations if not handled with COALESCE.',
        ],
      },
      {
        title: '2. GROUP BY and HAVING Clauses',
        summary: 'Segmenting data into categories and filtering aggregated results.',
        explanation: `\`GROUP BY\` groups rows that have matching values in specified columns into summary rows.
Rule: Any non-aggregated column in your \`SELECT\` list MUST appear in the \`GROUP BY\` clause!

**HAVING vs WHERE:**
• \`WHERE\` filters individual rows BEFORE aggregation happens.
• \`HAVING\` filters aggregated groups AFTER \`GROUP BY\` runs.
For example, to find customers with more than 1 order: \`HAVING COUNT(*) > 1\`.`,
        codeSnippet: {
          language: 'sql',
          code: `-- Calculate total revenue and order volume per order status
SELECT 
    status,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_revenue
FROM orders
GROUP BY status
HAVING COUNT(*) >= 2
ORDER BY total_revenue DESC;`,
        },
        takeaways: [
          'You cannot use WHERE to filter aggregate functions (e.g. WHERE COUNT(*) > 1 is a syntax error). Use HAVING!',
          'HAVING is essential for QA testers to detect duplicate primary keys or idempotent transaction spam.',
        ],
        interviewTip: 'When asked "What is the difference between WHERE and HAVING?", emphasize that WHERE filters individual records before grouping, whereas HAVING filters the grouped aggregates.',
      },
      {
        title: '3. Relational Table Joins (INNER, LEFT, RIGHT)',
        summary: 'Combining data across primary key and foreign key relationships.',
        explanation: `Relational tables connect via primary keys (PK) and foreign keys (FK).
• **INNER JOIN:** Returns ONLY rows where there is a matching value in BOTH tables. If a customer has no orders, they are excluded.
• **LEFT JOIN (or LEFT OUTER JOIN):** Returns ALL rows from the left table, plus matched rows from the right table. If no match exists, the right table columns are filled with \`NULL\`.
• **RIGHT JOIN:** Returns ALL rows from the right table, plus matched rows from the left.
• **Table Aliases:** Concise shorthand identifiers (e.g. \`FROM customers c JOIN orders o ON c.id = o.customer_id\`).`,
        codeSnippet: {
          language: 'sql',
          code: `-- INNER JOIN: Only customers who have placed at least one order
SELECT 
    c.id AS customer_id,
    c.name,
    o.id AS order_id,
    o.total_amount,
    o.status
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;

-- LEFT JOIN: ALL customers, showing NULL for those who haven't ordered yet
SELECT 
    c.id AS customer_id,
    c.name,
    c.country,
    o.id AS order_id,
    o.total_amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;`,
        },
        takeaways: [
          'Use LEFT JOIN when you want to audit for missing data or inactive users.',
          'Always prefix joined columns with their table alias to avoid "ambiguous column name" errors.',
        ],
      },
      {
        title: '4. Detecting Orphaned Records and Join Duplication Bugs',
        summary: 'How QA engineers use joins to uncover referential integrity flaws.',
        explanation: `Two of the most dangerous database bugs uncovered by QA engineers are:
1. **Orphaned Records:** A child record referencing a non-existent parent foreign key.
   Uncovered using:
   \`SELECT o.* FROM orders o LEFT JOIN customers c ON o.customer_id = c.id WHERE c.id IS NULL;\`
2. **Accidental Cartesian Fan-Out:** Joining two 1-to-many child tables (e.g. orders with shipments AND order_items) causes row multiplication, distorting calculated revenue totals.`,
        codeSnippet: {
          language: 'sql',
          code: `-- QA Audit: Find orphaned orders that point to deleted or non-existent customers
SELECT 
    o.id AS orphaned_order_id,
    o.customer_id AS invalid_customer_id,
    o.total_amount,
    o.status
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
WHERE c.id IS NULL;`,
        },
        takeaways: [
          'Orphaned records violate referential integrity and cause runtime crashes in backend microservices.',
          'A LEFT JOIN followed by `WHERE right_table.pk IS NULL` is the golden pattern for finding missing foreign keys.',
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-day2-1',
        title: 'Exercise 1: Calculate Total Orders and Revenue by Status',
        description: 'Aggregate order volumes and financial totals using GROUP BY.',
        instruction: 'Write a query that groups orders by status and calculates the COUNT(*) as total_orders and SUM(total_amount) as total_revenue, ordered by total_revenue DESC.',
        starterSql: 'SELECT \n    status, \n    COUNT(*) AS total_orders, \n    SUM(total_amount) AS total_revenue\nFROM orders\nGROUP BY status\nORDER BY total_revenue DESC;',
        solutionSql: 'SELECT status, COUNT(*) AS total_orders, SUM(total_amount) AS total_revenue FROM orders GROUP BY status ORDER BY total_revenue DESC;',
        expectedMinRows: 4,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount < 3) return { success: false, feedback: `Expected at least 3 distinct status groups, received ${res.rowCount}.` };
          return { success: true, feedback: 'Correct! You aggregated orders by status with total counts and revenues.' };
        },
        hints: ['Use: GROUP BY status', 'Compute: COUNT(*) AS total_orders, SUM(total_amount) AS total_revenue'],
      },
      {
        id: 'ex-day2-2',
        title: 'Exercise 2: Identify Customers Without Any Orders (Orphan Audit)',
        description: 'Use a LEFT JOIN and IS NULL check to identify inactive or zero-order users.',
        instruction: 'Write a query using a LEFT JOIN between customers and orders to find all customers who have never placed an order.',
        starterSql: 'SELECT \n    c.id AS customer_id, \n    c.name, \n    c.email\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nWHERE o.id IS NULL;',
        solutionSql: 'SELECT c.id AS customer_id, c.name, c.email FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL;',
        expectedMinRows: 2,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 2) return { success: false, feedback: `Expected 2 customers without orders (Frank Castle, Hank Pym), got ${res.rowCount}.` };
          return { success: true, feedback: 'Spot on! The LEFT JOIN + WHERE o.id IS NULL correctly isolated zero-order customers.' };
        },
        hints: ['Use: FROM customers c LEFT JOIN orders o ON c.id = o.customer_id', 'Filter: WHERE o.id IS NULL'],
      },
      {
        id: 'ex-day2-3',
        title: 'Exercise 3: Combine Customers, Orders, and Order Items (3-Table JOIN)',
        description: 'Join across 3 relational tables to inspect customer item purchases.',
        instruction: 'Write a query that joins customers, orders, and order_items to list customer name, order id, product_id, and quantity for COMPLETED orders.',
        starterSql: 'SELECT \n    c.name AS customer_name,\n    o.id AS order_id,\n    oi.product_id,\n    oi.quantity\nFROM customers c\nINNER JOIN orders o ON c.id = o.customer_id\nINNER JOIN order_items oi ON o.id = oi.order_id\nWHERE o.status = \'COMPLETED\';',
        solutionSql: 'SELECT c.name AS customer_name, o.id AS order_id, oi.product_id, oi.quantity FROM customers c INNER JOIN orders o ON c.id = o.customer_id INNER JOIN order_items oi ON o.id = oi.order_id WHERE o.status = \'COMPLETED\';',
        expectedMinRows: 5,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount < 4) return { success: false, feedback: `Expected at least 5 purchased items across completed orders, got ${res.rowCount}.` };
          return { success: true, feedback: 'Awesome! 3-table multi-join executed cleanly across customer, order, and line items.' };
        },
        hints: ['Join customers -> orders -> order_items', 'Filter WHERE o.status = \'COMPLETED\''],
      },
      {
        id: 'ex-day2-4',
        title: 'Exercise 4: Detect Orphaned Orders Lacking Valid Customers',
        description: 'Audit orders for broken foreign keys referencing non-existent customers.',
        instruction: 'Write a query using LEFT JOIN to find any order whose customer_id does not exist in the customers table.',
        starterSql: 'SELECT \n    o.id AS order_id,\n    o.customer_id,\n    o.total_amount,\n    o.status\nFROM orders o\nLEFT JOIN customers c ON o.customer_id = c.id\nWHERE c.id IS NULL;',
        solutionSql: 'SELECT o.id AS order_id, o.customer_id, o.total_amount, o.status FROM orders o LEFT JOIN customers c ON o.customer_id = c.id WHERE c.id IS NULL;',
        expectedMinRows: 1,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 1) return { success: false, feedback: `Expected 1 orphaned order (Order 5009 with customer 999), got ${res.rowCount}.` };
          return { success: true, feedback: 'Defect identified! Order 5009 references non-existent customer 999.' };
        },
        hints: ['Query FROM orders o LEFT JOIN customers c ON o.customer_id = c.id', 'Check WHERE c.id IS NULL'],
      },
      {
        id: 'ex-day2-5',
        title: 'Exercise 5: Find High-Volume Customers Using HAVING',
        description: 'Filter grouped records using the HAVING clause.',
        instruction: 'Write a query to find all customer_ids that have placed MORE THAN 1 order, showing customer_id and total order count.',
        starterSql: 'SELECT \n    customer_id,\n    COUNT(*) AS order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) > 1;',
        solutionSql: 'SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;',
        expectedMinRows: 1,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 1) return { success: false, feedback: `Expected 1 customer (customer_id 101 with 3 orders), got ${res.rowCount}.` };
          return { success: true, feedback: 'Correct! HAVING COUNT(*) > 1 successfully isolated customer 101.' };
        },
        hints: ['Use: GROUP BY customer_id', 'Filter: HAVING COUNT(*) > 1'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-day2-1',
        question: 'What happens when two tables with duplicate join keys are joined together?',
        concept: 'Cartesian Product / Join Fan-Out Bug',
        modelAnswer: 'When tables are joined on columns that contain duplicate keys, the relational engine creates a Cartesian product (M × N row multiplication) for those matching keys. For example, if Table A has 3 rows with key=1 and Table B has 4 rows with key=1, the join produces 12 rows! This causes severe silent bugs where financial SUM calculations are wildly inflated.',
        seniorTip: 'Always mention that in QA testing, verifying pre-join row counts against post-join row counts is the primary defense against join explosion defects.',
      },
      {
        id: 'iq-day2-2',
        question: 'How do LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN differ in database compatibility?',
        concept: 'Relational Join Semantics and Portability',
        modelAnswer: 'LEFT JOIN returns all left rows + matching right rows. RIGHT JOIN does the reverse (all right rows + matching left rows). A FULL OUTER JOIN returns all rows from both tables, filling unmatched columns on either side with NULL. Note that SQLite and older MySQL versions do not natively support FULL OUTER JOIN syntax; in those databases, engineers emulate FULL OUTER JOIN by executing a LEFT JOIN UNION ALL a RIGHT JOIN.',
        seniorTip: 'Mentioning SQLite/MySQL dialect limitations displays deep practical experience.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q2-1',
          question: 'What is the key difference between COUNT(*) and COUNT(email)?',
          options: [
            'COUNT(*) only counts primary keys; COUNT(email) counts all rows',
            'COUNT(*) counts every row in the table; COUNT(email) ignores rows where email IS NULL',
            'COUNT(*) is slower in all databases',
            'COUNT(email) throws an error if email has duplicate entries',
          ],
          correctAnswerIndex: 1,
          explanation: 'COUNT(*) counts every row in the result set regardless of contents, whereas COUNT(column_name) counts only rows where that specific column is non-NULL.',
        },
        {
          id: 'q2-2',
          question: 'Why does the query `SELECT status, SUM(total_amount) FROM orders WHERE SUM(total_amount) > 1000 GROUP BY status;` fail?',
          options: [
            'SUM is not a valid SQL function',
            'WHERE cannot evaluate aggregate functions; you must use HAVING SUM(total_amount) > 1000',
            'GROUP BY must be placed before WHERE',
            'You cannot sum decimal numbers',
          ],
          correctAnswerIndex: 1,
          explanation: 'Aggregate functions cannot be evaluated in the WHERE clause because WHERE filters rows before aggregation occurs. The HAVING clause must be used.',
        },
        {
          id: 'q2-3',
          question: 'Which join will preserve ALL customer records even if a customer has never made an order?',
          options: [
            'orders INNER JOIN customers',
            'customers LEFT JOIN orders ON customers.id = orders.customer_id',
            'orders CROSS JOIN customers',
            'customers NATURAL JOIN orders',
          ],
          correctAnswerIndex: 1,
          explanation: 'A LEFT JOIN keeps every row from the left table (customers), filling right-table order columns with NULL when no matching order exists.',
        },
        {
          id: 'q2-4',
          question: 'How do you detect orphaned records in a child table (orders) whose foreign key (customer_id) is missing in the parent table (customers)?',
          options: [
            'orders INNER JOIN customers ON orders.customer_id = customers.id',
            'orders LEFT JOIN customers ON orders.customer_id = customers.id WHERE customers.id IS NULL',
            'SELECT * FROM orders WHERE customer_id = 0',
            'SELECT * FROM customers WHERE orders IS NULL',
          ],
          correctAnswerIndex: 1,
          explanation: 'A LEFT JOIN from child to parent followed by `WHERE parent.id IS NULL` precisely isolates child records that have no corresponding parent.',
        },
        {
          id: 'q2-5',
          question: 'If Table A has 3 matching rows and Table B has 2 matching rows for the same join key, how many rows will an INNER JOIN produce for that key?',
          options: ['3 rows', '2 rows', '5 rows', '6 rows (3 × 2)'],
          correctAnswerIndex: 3,
          explanation: 'Relational joins create an M × N combination for non-unique keys, producing 6 rows (3 × 2).',
        },
      ],
    },
    summaryTakeaway: 'You have mastered aggregate metrics, group partitioning with GROUP BY, group filtering with HAVING, multi-table joins, and techniques for uncovering orphaned records and join fan-out bugs.',
  },

  // ================= DAY 3 =================
  {
    dayNumber: 3,
    title: 'Intermediate SQL and Data Modification',
    subtitle: 'Subqueries, CTEs, CASE conditional logic, UNION operations, and safe transactional DML',
    badge: 'Day 3 • Intermediate & DML',
    duration: '2.5 Hours',
    objectives: [
      'Write scalar and correlated subqueries to compare row values against dynamically computed metrics',
      'Construct readable Common Table Expressions (CTEs) using the WITH clause',
      'Apply conditional branching logic in queries using CASE WHEN ... THEN ... ELSE ... END',
      'Combine multiple query result sets using UNION and UNION ALL',
      'Handle NULL values gracefully with IS NULL, IS NOT NULL, and COALESCE',
      'Execute safe INSERT, UPDATE, and DELETE modifications inside isolated, resettable sandboxes with COMMIT/ROLLBACK concepts',
    ],
    topics: [
      {
        title: '1. Subqueries & Common Table Expressions (CTEs)',
        summary: 'Nesting queries and creating temporary named result sets for complex logic.',
        explanation: `A **Subquery** (inner query) is a query nested inside another SQL statement.
• **Scalar Subquery:** Returns a single value (1 row, 1 column), e.g. finding orders above average:
  \`WHERE total_amount > (SELECT AVG(total_amount) FROM orders)\`
• **Common Table Expression (CTE):** A temporary named result set defined using the \`WITH\` clause. CTEs dramatically improve readability over deeply nested subqueries.`,
        codeSnippet: {
          language: 'sql',
          code: `-- Subquery: Find orders that exceed the platform average order value
SELECT id, customer_id, total_amount, status
FROM orders
WHERE total_amount > (SELECT AVG(total_amount) FROM orders);

-- CTE (Common Table Expression): Clean, readable multi-step analysis
WITH HighValueCustomers AS (
    SELECT customer_id, SUM(total_amount) AS total_spent
    FROM orders
    WHERE status = 'COMPLETED'
    GROUP BY customer_id
    HAVING SUM(total_amount) >= 1000
)
SELECT c.name, c.email, hvc.total_spent
FROM HighValueCustomers hvc
JOIN customers c ON hvc.customer_id = c.id;`,
        },
        takeaways: [
          'CTEs make complex analytical queries modular and maintainable.',
          'Subqueries in WHERE clauses must return a single scalar value if used with operators like >, <, or =.',
        ],
      },
      {
        title: '2. Conditional Logic with CASE WHEN and NULL Handling with COALESCE',
        summary: 'If-else business branching and fallback handling for missing values.',
        explanation: `The \`CASE\` expression provides IF-THEN-ELSE conditional logic directly inside SQL queries:
\`CASE WHEN condition THEN result ELSE fallback END\`

**COALESCE(val1, val2, ...):** Returns the first non-null argument in the list.
Essential for QA testing when replacing missing null values with clear fallback labels (e.g. \`COALESCE(email, \'NO_EMAIL_PROVIDED\')\`).`,
        codeSnippet: {
          language: 'sql',
          code: `-- Categorize order values into business tiers using CASE
SELECT 
    id,
    customer_id,
    total_amount,
    CASE 
        WHEN total_amount >= 1500 THEN 'High Value'
        WHEN total_amount >= 500 THEN 'Mid Value'
        ELSE 'Standard'
    END AS order_tier
FROM orders;

-- Replace NULL emails with fallback text
SELECT 
    id, 
    name, 
    COALESCE(email, 'UNREGISTERED_EMAIL') AS contact_email
FROM customers;`,
        },
        takeaways: [
          'Every CASE expression must be closed with END.',
          'COALESCE prevents arithmetic errors when calculating averages or concatenating strings containing NULLs.',
        ],
      },
      {
        title: '3. Combining Datasets with UNION and UNION ALL',
        summary: 'Stacking rows from multiple queries with matching column structures.',
        explanation: `\`UNION\` combines the results of two or more SELECT statements into a single result set.
Rules:
1. Every SELECT statement must have the SAME number of columns.
2. Columns must have compatible data types in matching order.

• **UNION:** Merges rows and removes duplicate tuples (requires internal sort/hash deduplication).
• **UNION ALL:** Merges rows and PRESERVES all duplicates (much faster because no sorting is required!).`,
        codeSnippet: {
          language: 'sql',
          code: `-- Combine Indian and US customer lists into a single consolidated view
SELECT id, name, country, 'Primary Market' AS market_status
FROM customers
WHERE country = 'India'

UNION ALL

SELECT id, name, country, 'International Market' AS market_status
FROM customers
WHERE country = 'United States';`,
        },
        takeaways: [
          'Always default to UNION ALL unless you specifically require duplicate removal, as UNION ALL is significantly faster.',
          'JOIN combines columns horizontally; UNION stacks rows vertically.',
        ],
      },
      {
        title: '4. Safe Data Modification (INSERT, UPDATE, DELETE) & Transactions',
        summary: 'Modifying data safely in isolated training sandboxes without risking production.',
        explanation: `**Data Modification Language (DML):**
• \`INSERT INTO table (cols) VALUES (vals);\` Adds new rows.
• \`UPDATE table SET col = val WHERE condition;\` Modifies existing rows.
  **CRITICAL:** Always write your WHERE condition first! An UPDATE without a WHERE modifies EVERY row in the table!
• \`DELETE FROM table WHERE condition;\` Removes rows.
  **CRITICAL:** A DELETE without a WHERE purges the entire table!

**Transactions (ACID):**
A transaction bundles multiple SQL statements into a single atomic unit.
• \`BEGIN TRANSACTION\` Starts atomic session.
• \`COMMIT\` Persists all changes permanently.
• \`ROLLBACK\` Reverts all modifications made during the transaction.`,
        codeSnippet: {
          language: 'sql',
          code: `-- Safe practice in disposable sandbox:
INSERT INTO products (name, category, price, stock_qty)
VALUES ('Mobile Automation Masterclass', 'Testing', 499.00, 60);

-- Update product price for a specific product ID
UPDATE products
SET price = 349.00
WHERE id = 2;

-- Delete orphaned test records
DELETE FROM order_items
WHERE order_id = 5009;`,
        },
        takeaways: [
          'Safety Rule: Never run UPDATE or DELETE without verifying the target row count using a SELECT with the same WHERE clause first!',
          'Transactional isolation ensures that QA testing scripts do not leave dirty state in staging databases.',
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-day3-1',
        title: 'Exercise 1: Find Orders Above Average Amount Using Subquery',
        description: 'Compare individual order values against a scalar aggregate subquery.',
        instruction: 'Write a query to select id, customer_id, and total_amount for all orders whose total_amount is strictly greater than the overall average total_amount of all orders.',
        starterSql: 'SELECT id, customer_id, total_amount\nFROM orders\nWHERE total_amount > (SELECT AVG(total_amount) FROM orders);',
        solutionSql: 'SELECT id, customer_id, total_amount FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders);',
        expectedMinRows: 3,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount < 2) return { success: false, feedback: `Expected at least 3 orders above average, got ${res.rowCount}.` };
          return { success: true, feedback: 'Great job! Subquery computed the average order value and filtered correctly.' };
        },
        hints: ['Use: WHERE total_amount > (SELECT AVG(total_amount) FROM orders)'],
      },
      {
        id: 'ex-day3-2',
        title: 'Exercise 2: Classify Order Values with CASE WHEN',
        description: 'Categorize transactional rows into business classification labels.',
        instruction: 'Write a query to select id, total_amount, and a new column order_category that returns "High Value" if total_amount >= 1000, "Medium Value" if total_amount >= 500, and "Low Value" otherwise.',
        starterSql: 'SELECT \n    id, \n    total_amount,\n    CASE \n        WHEN total_amount >= 1000 THEN \'High Value\'\n        WHEN total_amount >= 500 THEN \'Medium Value\'\n        ELSE \'Low Value\'\n    END AS order_category\nFROM orders;',
        solutionSql: 'SELECT id, total_amount, CASE WHEN total_amount >= 1000 THEN \'High Value\' WHEN total_amount >= 500 THEN \'Medium Value\' ELSE \'Low Value\' END AS order_category FROM orders;',
        expectedMinRows: 5,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.columns.length < 3) return { success: false, feedback: 'Make sure your query outputs id, total_amount, and order_category.' };
          return { success: true, feedback: 'Perfect! CASE expression applied business logic to order values.' };
        },
        hints: ['Use CASE WHEN total_amount >= 1000 THEN \'High Value\' ... END AS order_category'],
      },
      {
        id: 'ex-day3-3',
        title: 'Exercise 3: Replace NULL Emails with COALESCE',
        description: 'Clean data displays by providing fallback values for NULL attributes.',
        instruction: 'Select id, name, and COALESCE(email, \'NO_EMAIL_ON_FILE\') AS clean_email from the customers table.',
        starterSql: 'SELECT \n    id, \n    name, \n    COALESCE(email, \'NO_EMAIL_ON_FILE\') AS clean_email\nFROM customers;',
        solutionSql: 'SELECT id, name, COALESCE(email, \'NO_EMAIL_ON_FILE\') AS clean_email FROM customers;',
        expectedMinRows: 8,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          const hasFallback = res.rows.some((r) => r.includes('NO_EMAIL_ON_FILE'));
          if (!hasFallback) return { success: false, feedback: 'Expected Hank Pym\'s NULL email to be converted to "NO_EMAIL_ON_FILE".' };
          return { success: true, feedback: 'Well done! COALESCE replaced NULL values with the designated fallback.' };
        },
        hints: ['Use: COALESCE(email, \'NO_EMAIL_ON_FILE\') AS clean_email'],
      },
      {
        id: 'ex-day3-4',
        title: 'Exercise 4: Combine Datasets Using UNION ALL',
        description: 'Stack records from two queries into a single unified output.',
        instruction: 'Write a UNION query to combine customers from "India" and customers from "United States", selecting id, name, and country.',
        starterSql: 'SELECT id, name, country\nFROM customers\nWHERE country = \'India\'\nUNION ALL\nSELECT id, name, country\nFROM customers\nWHERE country = \'United States\';',
        solutionSql: 'SELECT id, name, country FROM customers WHERE country = \'India\' UNION ALL SELECT id, name, country FROM customers WHERE country = \'United States\';',
        expectedMinRows: 5,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 5) return { success: false, feedback: `Expected 5 combined customers (3 India + 2 US), got ${res.rowCount}.` };
          return { success: true, feedback: 'Success! UNION ALL combined both subsets seamlessly.' };
        },
        hints: ['Write first SELECT with WHERE country = \'India\'', 'Add UNION ALL', 'Write second SELECT with WHERE country = \'United States\''],
      },
      {
        id: 'ex-day3-5',
        title: 'Exercise 5: Safe DML Practice — Insert and Update in Sandbox',
        description: 'Perform data modification operations in the disposable training environment.',
        instruction: 'Insert a new product: name="Cypress Testing Bootcamp", category="Testing", price=399.00, stock_qty=50.',
        starterSql: 'INSERT INTO products (name, category, price, stock_qty)\nVALUES (\'Cypress Testing Bootcamp\', \'Testing\', 399.00, 50);',
        solutionSql: 'INSERT INTO products (name, category, price, stock_qty) VALUES (\'Cypress Testing Bootcamp\', \'Testing\', 399.00, 50);',
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (!res.affectedRows || res.affectedRows < 1) return { success: false, feedback: 'No row was inserted. Check your INSERT INTO syntax.' };
          return { success: true, feedback: '1 row inserted into sandbox! Remember you can reset the sandbox database at any time.' };
        },
        hints: ['Use: INSERT INTO products (name, category, price, stock_qty) VALUES (...)'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-day3-1',
        question: 'What is the performance difference between UNION and UNION ALL?',
        concept: 'Set Operations and Sorting Overhead',
        modelAnswer: 'UNION performs an implicit DISTINCT operation over the combined dataset to remove duplicate rows. To do this, the database engine must spill data to temporary disk storage or execute an expensive sort/hash algorithm. UNION ALL simply concatenates the two result streams without checking for duplicates, making it substantially faster and less memory-intensive.',
        seniorTip: 'Always recommend UNION ALL by default unless duplicate deduplication is a verified functional requirement.',
      },
      {
        id: 'iq-day3-2',
        question: 'What are ACID properties in database transactions and why do QA testers care?',
        concept: 'Database Transaction Integrity (ACID)',
        modelAnswer: 'ACID stands for: Atomicity (all operations succeed or all roll back), Consistency (data must satisfy all schema constraints and foreign keys), Isolation (concurrent transactions do not corrupt each other), and Durability (committed transactions survive system crashes). QA testers verify ACID compliance during payment failures, network timeouts, and concurrency tests.',
        seniorTip: 'Connect Atomicity to real QA bug reproduction: e.g. "If an order fails at step 2, the inventory decrement from step 1 must roll back atomically."',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q3-1',
          question: 'What is a Common Table Expression (CTE) in SQL?',
          options: [
            'A permanent table stored on disk',
            'A temporary, named result set defined using the WITH clause that exists only during query execution',
            'A database backup file',
            'An index created for full-text search',
          ],
          correctAnswerIndex: 1,
          explanation: 'A CTE is a temporary named result set created with the WITH keyword that improves query modularity and readability.',
        },
        {
          id: 'q3-2',
          question: 'What does the function `COALESCE(phone, mobile, \'N/A\')` return if `phone` is NULL and `mobile` is \'9876543210\'?',
          options: ['NULL', '\'N/A\'', '\'9876543210\'', 'A boolean true'],
          correctAnswerIndex: 2,
          explanation: 'COALESCE evaluates its arguments in order and returns the first non-null value encountered.',
        },
        {
          id: 'q3-3',
          question: 'What happens if you execute `UPDATE customers SET tier = \'Gold\';` without a WHERE clause?',
          options: [
            'Only the first customer is updated',
            'The database throws a required-where syntax error in standard ANSI SQL',
            'EVERY single customer record in the table has its tier changed to \'Gold\'',
            'Nothing changes until you commit',
          ],
          correctAnswerIndex: 2,
          explanation: 'In SQL, omitting the WHERE clause in an UPDATE or DELETE applies the modification indiscriminately across every row in the table.',
        },
        {
          id: 'q3-4',
          question: 'Which statement accurately describes UNION ALL?',
          options: [
            'It combines rows horizontally like an INNER JOIN',
            'It stacks rows vertically from multiple SELECTs and preserves all duplicate records',
            'It automatically removes duplicate records by sorting',
            'It requires all queries to query the same table name',
          ],
          correctAnswerIndex: 1,
          explanation: 'UNION ALL stacks result rows vertically and retains duplicates without performing a deduplicating sort.',
        },
        {
          id: 'q3-5',
          question: 'What does the ROLLBACK command do during a database transaction?',
          options: [
            'Saves changes to disk permanently',
            'Reverts all modifications made during the current uncommitted transaction',
            'Deletes the database schema',
            'Restarts the database server',
          ],
          correctAnswerIndex: 1,
          explanation: 'ROLLBACK cancels and undoes all changes made in the active transaction, restoring the database to its pre-transaction state.',
        },
      ],
    },
    summaryTakeaway: 'You have mastered subqueries, CTEs, conditional CASE logic, COALESCE fallbacks, vertical set unioning, and safe transactional data modification principles.',
  },

  // ================= DAY 4 =================
  {
    dayNumber: 4,
    title: 'Advanced SQL for Real Work',
    subtitle: 'Window analytical functions, deduplication strategies, indexing fundamentals & query plans',
    badge: 'Day 4 • Advanced Analytics',
    duration: '2.5 Hours',
    objectives: [
      'Master SQL window functions: ROW_NUMBER(), RANK(), and DENSE_RANK()',
      'Partition datasets using PARTITION BY and establish independent window ordering',
      'Identify and deduplicate redundant customer and transaction records',
      'Compare datasets to locate unmatched records existing in one table but not another',
      'Understand indexing fundamentals (B-Tree) and interpret basic query execution plan concepts (EXPLAIN)',
    ],
    topics: [
      {
        title: '1. Window Functions (ROW_NUMBER, RANK, DENSE_RANK)',
        summary: 'Performing analytical calculations across subsets of rows without collapsing them.',
        explanation: `Unlike \`GROUP BY\` which collapses rows into a single summary row, **Window Functions** compute values over a window of rows while preserving each individual row\'s identity!
Syntax: \`FUNCTION() OVER (PARTITION BY col ORDER BY col [ASC|DESC])\`

• **ROW_NUMBER():** Assigns a unique sequential integer (1, 2, 3...) to each row within its partition.
• **RANK():** Assigns rankings, but leaves gaps in rank numbers if there are ties (e.g. 1, 2, 2, 4).
• **DENSE_RANK():** Assigns rankings without gaps (e.g. 1, 2, 2, 3).`,
        codeSnippet: {
          language: 'sql',
          code: `-- Find the latest order for each customer using ROW_NUMBER()
WITH RankedOrders AS (
    SELECT 
        id AS order_id,
        customer_id,
        order_date,
        total_amount,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id 
            ORDER BY order_date DESC
        ) AS order_rank
    FROM orders
)
SELECT order_id, customer_id, order_date, total_amount
FROM RankedOrders
WHERE order_rank = 1;`,
        },
        takeaways: [
          'Window functions execute in the SELECT phase, after WHERE and HAVING.',
          'To filter by a window function result (like `WHERE row_num = 1`), you must wrap it in a CTE or subquery.',
        ],
        interviewTip: 'The "Top N per category" question (e.g. latest order per customer, top 3 highest salaries per department) is the #1 most frequently asked advanced SQL interview question.',
      },
      {
        title: '2. Duplicate Detection and Deduplication Strategies',
        summary: 'Techniques for auditing redundant records and preparing cleanup scripts.',
        explanation: `Duplicate records in production databases cause distorted billing, duplicate emails, and broken primary key migrations.
**Deduplication Strategy:**
1. Group by the candidate unique columns (e.g. \`email\` or \`customer_id\`).
2. Filter for groups where \`COUNT(*) > 1\`.
3. Use \`ROW_NUMBER() OVER (PARTITION BY ... ORDER BY id ASC)\` to identify which specific duplicate row to keep (rank = 1) and which to purge (rank > 1).`,
        codeSnippet: {
          language: 'sql',
          code: `-- Step 1: Detect duplicate emails in target database
SELECT email, COUNT(*) AS occurrences
FROM tgt_customers
GROUP BY email
HAVING COUNT(*) > 1;

-- Step 2: Use ROW_NUMBER() to identify rows to delete
WITH DuplicateRanks AS (
    SELECT 
        customer_id, 
        email,
        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY email ASC) AS rn
    FROM tgt_customers
)
SELECT * FROM DuplicateRanks WHERE rn > 1;`,
        },
        takeaways: [
          'Auditing duplicates requires verifying both exact duplicates and business-key duplicates (same email, different ID).',
        ],
      },
      {
        title: '3. Comparing Datasets (Source vs Target Record Differences)',
        summary: 'Locating records that exist in Dataset A but are missing in Dataset B.',
        explanation: `When auditing data pipelines, test engineers must determine whether records successfully transferred from source to target.
Two primary techniques:
1. **LEFT JOIN + NULL Check:**
   \`FROM src_table s LEFT JOIN tgt_table t ON s.id = t.id WHERE t.id IS NULL\`
2. **EXCEPT (or MINUS in Oracle):**
   \`SELECT id FROM src_table EXCEPT SELECT id FROM tgt_table;\``,
        codeSnippet: {
          language: 'sql',
          code: `-- Find source customers who were dropped during migration
SELECT 
    s.customer_id, 
    s.full_name, 
    s.email
FROM src_customers s
LEFT JOIN tgt_customers t ON s.customer_id = t.customer_id
WHERE t.customer_id IS NULL;`,
        },
        takeaways: [
          'LEFT JOIN + WHERE IS NULL works across all SQL dialects without compatibility issues.',
        ],
      },
      {
        title: '4. Indexing Fundamentals and Query Execution Plans',
        summary: 'Why query performance matters and how indexes prevent full table scans.',
        explanation: `Without an index, the database must perform a **Full Table Scan (FTS)**, inspecting every row on disk sequentially.
• **B-Tree Index:** A balanced tree data structure that allows finding a row in logarithmic time \`O(log N)\`.
• **When to index:** Columns frequently used in \`WHERE\` filters, \`JOIN ON\` conditions, and \`ORDER BY\`.
• **Trade-off:** Indexes speed up SELECT queries, but slow down INSERT/UPDATE/DELETE operations because the index tree must be updated on every write.
• **EXPLAIN:** Prepended to a query (\`EXPLAIN SELECT ...\`) to display the database engine\'s execution plan, showing whether it used an index scan or full table scan.`,
        codeSnippet: {
          language: 'sql',
          code: `-- Create an index on customer email for instant lookups
CREATE INDEX idx_customers_email ON customers(email);

-- Composite index for multi-column filtering
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);`,
        },
        takeaways: [
          'Foreign key columns should almost always be indexed to ensure fast JOIN performance.',
          'Never index low-cardinality columns (e.g. a boolean flag with only 2 values).',
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-day4-1',
        title: 'Exercise 1: Rank Employees by Salary within Department',
        description: 'Use the ROW_NUMBER() window function partitioned by department.',
        instruction: 'Write a query to display id, name, department, salary, and a window function ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank from employees.',
        starterSql: 'SELECT \n    id, \n    name, \n    department, \n    salary,\n    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank\nFROM employees;',
        solutionSql: 'SELECT id, name, department, salary, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank FROM employees;',
        expectedMinRows: 7,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.columns.length < 5) return { success: false, feedback: 'Make sure your query outputs salary_rank as the 5th column.' };
          return { success: true, feedback: 'Excellent! You ranked employees by salary partitioned by department.' };
        },
        hints: ['Use: ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS salary_rank'],
      },
      {
        id: 'ex-day4-2',
        title: 'Exercise 2: Identify Duplicate Keys in Target Customer Table',
        description: 'Audit the tgt_customers table to find duplicate customer_id occurrences.',
        instruction: 'Write a query grouping tgt_customers by customer_id and select customer_id and COUNT(*) as count_id HAVING COUNT(*) > 1.',
        starterSql: 'SELECT \n    customer_id, \n    COUNT(*) AS count_id\nFROM tgt_customers\nGROUP BY customer_id\nHAVING COUNT(*) > 1;',
        solutionSql: 'SELECT customer_id, COUNT(*) AS count_id FROM tgt_customers GROUP BY customer_id HAVING COUNT(*) > 1;',
        expectedMinRows: 1,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 1) return { success: false, feedback: `Expected 1 duplicate customer_id (1004), got ${res.rowCount}.` };
          return { success: true, feedback: 'Defect discovered! Customer ID 1004 has duplicate rows in tgt_customers.' };
        },
        hints: ['Group by customer_id', 'Filter HAVING COUNT(*) > 1'],
      },
      {
        id: 'ex-day4-3',
        title: 'Exercise 3: Detect Missing Source Records in Target (Source-to-Target Audit)',
        description: 'Find source customer records that were dropped during the migration.',
        instruction: 'Write a LEFT JOIN query between src_customers and tgt_customers to find any customer_id present in src_customers that does not exist in tgt_customers.',
        starterSql: 'SELECT \n    s.customer_id, \n    s.full_name, \n    s.email\nFROM src_customers s\nLEFT JOIN tgt_customers t ON s.customer_id = t.customer_id\nWHERE t.customer_id IS NULL;',
        solutionSql: 'SELECT s.customer_id, s.full_name, s.email FROM src_customers s LEFT JOIN tgt_customers t ON s.customer_id = t.customer_id WHERE t.customer_id IS NULL;',
        expectedMinRows: 1,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 1) return { success: false, feedback: `Expected 1 missing record (customer_id 1005 Eshwar S), got ${res.rowCount}.` };
          return { success: true, feedback: 'Critical defect uncovered! Customer 1005 was lost in the ETL pipeline.' };
        },
        hints: ['Use: FROM src_customers s LEFT JOIN tgt_customers t ON s.customer_id = t.customer_id', 'Filter WHERE t.customer_id IS NULL'],
      },
      {
        id: 'ex-day4-4',
        title: 'Exercise 4: Detect Unaccounted "Ghost" Extra Records in Target',
        description: 'Find records that exist in the target table but never existed in the source.',
        instruction: 'Write a query to find any record in tgt_customers whose customer_id does not exist in src_customers.',
        starterSql: 'SELECT \n    t.customer_id, \n    t.full_name, \n    t.email\nFROM tgt_customers t\nLEFT JOIN src_customers s ON t.customer_id = s.customer_id\nWHERE s.customer_id IS NULL;',
        solutionSql: 'SELECT t.customer_id, t.full_name, t.email FROM tgt_customers t LEFT JOIN src_customers s ON t.customer_id = s.customer_id WHERE s.customer_id IS NULL;',
        expectedMinRows: 1,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 1) return { success: false, feedback: `Expected 1 ghost record (customer 9999), got ${res.rowCount}.` };
          return { success: true, feedback: 'Ghost record detected! Target customer 9999 was erroneously injected.' };
        },
        hints: ['Query FROM tgt_customers t LEFT JOIN src_customers s ... WHERE s.customer_id IS NULL'],
      },
      {
        id: 'ex-day4-5',
        title: 'Exercise 5: Latest Order per Customer Using CTE and Window Ranking',
        description: 'Construct a complete CTE to isolate the latest order per customer.',
        instruction: 'Write a CTE query to return order_id, customer_id, and order_date for the single latest order for each customer.',
        starterSql: 'WITH RankedOrders AS (\n    SELECT \n        id AS order_id, \n        customer_id, \n        order_date,\n        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn\n    FROM orders\n)\nSELECT order_id, customer_id, order_date\nFROM RankedOrders\nWHERE rn = 1;',
        solutionSql: 'WITH RankedOrders AS (SELECT id AS order_id, customer_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders) SELECT order_id, customer_id, order_date FROM RankedOrders WHERE rn = 1;',
        expectedMinRows: 6,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount < 5) return { success: false, feedback: `Expected at least 6 unique latest orders, got ${res.rowCount}.` };
          return { success: true, feedback: 'Mastery verified! You isolated the latest order per customer using a window CTE.' };
        },
        hints: ['Use: WITH RankedOrders AS (...) SELECT ... WHERE rn = 1'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-day4-1',
        question: 'How do ROW_NUMBER(), RANK(), and DENSE_RANK() handle identical tied values?',
        concept: 'Ranking Window Function Semantics',
        modelAnswer: 'Given values [100, 90, 90, 80]: ROW_NUMBER() assigns distinct sequential integers regardless of ties: [1, 2, 3, 4]. RANK() assigns tied values the same rank and leaves gaps: [1, 2, 2, 4] (skipping rank 3). DENSE_RANK() assigns tied values the same rank without leaving gaps: [1, 2, 2, 3].',
        seniorTip: 'Drawing out or typing the [1, 2, 2, 4] vs [1, 2, 2, 3] comparison immediately clarifies that you understand the mathematical mechanics.',
      },
      {
        id: 'iq-day4-2',
        question: 'What is a Full Table Scan (FTS) versus an Index Scan in query optimization?',
        concept: 'Query Execution Optimization',
        modelAnswer: 'A Full Table Scan reads every physical block of a table from disk sequentially. While efficient for very small tables, on a 50-million row table it takes minutes and saturates I/O. An Index Scan traverses a B-Tree structure in O(log N) time to pinpoint exact row pointers directly. QA engineers check EXPLAIN plans to ensure critical queries hit indexes rather than performing expensive table scans.',
        seniorTip: 'Emphasize that adding indexes is not free: every write (INSERT/UPDATE/DELETE) must maintain the index, so unneeded indexes degrade write throughput.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q4-1',
          question: 'In a window function, what does the PARTITION BY clause accomplish?',
          options: [
            'It physically splits the table across multiple hard drives',
            'It divides query result rows into separate groups/subsets over which the window function calculates independently',
            'It permanently deletes duplicate rows',
            'It converts SQL to NoSQL JSON',
          ],
          correctAnswerIndex: 1,
          explanation: 'PARTITION BY subdivides rows into logical groups where window function calculations (like rankings or running totals) restart independently.',
        },
        {
          id: 'q4-2',
          question: 'Why can you not write `SELECT name FROM employees WHERE ROW_NUMBER() OVER (...) = 1;` directly in the WHERE clause?',
          options: [
            'ROW_NUMBER is only allowed in DELETE queries',
            'Window functions evaluate in the SELECT phase, which executes AFTER the WHERE clause in the SQL lifecycle',
            'Syntax only permits RANK in WHERE clauses',
            'Window functions cannot be evaluated on employees',
          ],
          correctAnswerIndex: 1,
          explanation: 'In the SQL execution lifecycle, WHERE evaluates before SELECT. Because window functions run during SELECT, they are not yet computed when WHERE executes, requiring a subquery or CTE wrapper.',
        },
        {
          id: 'q4-3',
          question: 'What is the primary drawback of adding too many indexes to a relational database table?',
          options: [
            'Indexes break primary key constraints',
            'Indexes degrade INSERT, UPDATE, and DELETE write performance because the index trees must be modified on every write',
            'Indexes prevent SELECT queries from using JOINs',
            'Indexes alter column data types',
          ],
          correctAnswerIndex: 1,
          explanation: 'Every index requires overhead: every insert, update, or delete must update all associated index trees on disk, slowing down write transactions.',
        },
        {
          id: 'q4-4',
          question: 'Which query pattern is the standard way to find records in Table A that are missing in Table B?',
          options: [
            'Table A INNER JOIN Table B ON A.id = B.id',
            'Table A LEFT JOIN Table B ON A.id = B.id WHERE B.id IS NULL',
            'Table A CROSS JOIN Table B',
            'SELECT * FROM Table A WHERE id = 0',
          ],
          correctAnswerIndex: 1,
          explanation: 'A LEFT JOIN from Table A to Table B followed by `WHERE B.id IS NULL` captures all records in Table A that lack a match in Table B.',
        },
        {
          id: 'q4-5',
          question: 'What is the command used to inspect the database optimizer\'s execution plan for a SQL query?',
          options: ['DESCRIBE', 'EXPLAIN', 'INSPECT', 'ANALYZE_PLAN'],
          correctAnswerIndex: 1,
          explanation: 'The EXPLAIN keyword displays the optimizer\'s query execution plan, showing whether scans or indexes will be utilized.',
        },
      ],
    },
    summaryTakeaway: 'You have mastered advanced analytical SQL: window functions (ROW_NUMBER/RANK/DENSE_RANK), deduplication strategies, dataset reconciliation techniques, and indexing principles.',
  },

  // ================= DAY 5 =================
  {
    dayNumber: 5,
    title: 'SQL for QA, Database Validation, and Final Project',
    subtitle: 'Source-to-target data migration audits, financial reconciliation, and capstone project',
    badge: 'Day 5 • Capstone Project',
    duration: '3.0 Hours',
    objectives: [
      'Conduct source-to-target record count reconciliation and completeness checks',
      'Audit primary key uniqueness, foreign key integrity, and mandatory non-null rules',
      'Reconcile aggregated financial balances across payment transactions to detect precision truncation bugs',
      'Identify status mapping discrepancies and corrupted timestamp default values',
      'Execute the Capstone Project: Customer and Order Data Migration Validation with 7 seeded defects',
      'Generate a verified QA Test Execution and Defect Audit Report with reproducible SQL evidence',
    ],
    topics: [
      {
        title: '1. The QA Database Validation Framework',
        summary: 'The 7-point audit checklist every QA engineer executes during data migrations.',
        explanation: `Whenever backend systems undergo cloud migrations, microservice splits, or ETL batch transformations, QA engineers validate data integrity using the 7-Point Framework:
1. **Record Count Reconciliation:** Does source count equal target count?
2. **Key Uniqueness & Deduplication:** Are there duplicate IDs in the target?
3. **Completeness & Null Checks:** Did required columns get silently populated with NULL?
4. **Data Transformation & Mapping:** Were enum/status strings correctly mapped (e.g. INACTIVE not UNKNOWN)?
5. **Referential Integrity:** Do all foreign keys in target tables point to valid parents?
6. **Financial Aggregation:** Does the SUM of revenue in source equal the SUM in target down to the exact cent?
7. **Date & Timestamp Fidelity:** Were timezone offsets preserved or defaulted to Unix epoch (1970)?`,
        codeSnippet: {
          language: 'sql',
          code: `-- Check 1: Record count comparison between source and target
SELECT 
    'src_customers' AS table_name, COUNT(*) AS total_records FROM src_customers
UNION ALL
SELECT 
    'tgt_customers' AS table_name, COUNT(*) AS total_records FROM tgt_customers;`,
        },
        takeaways: [
          'Never rely solely on total record counts: count parity can mask equal numbers of dropped records and spurious duplicate records!',
          'Always reconcile both aggregate financial values and record counts.',
        ],
      },
      {
        title: '2. Financial Balance Reconciliation & Truncation Bugs',
        summary: 'Detecting floating-point inaccuracies and currency formatting truncation defects.',
        explanation: `A common ETL defect occurs when numeric data types are mapped incorrectly (e.g. \`DECIMAL(10,2)\` mapped to an integer or float).
To audit financial balances, write a reconciliation query that calculates:
• Source Total
• Target Total
• Variance (Difference)
Any variance greater than 0.00 is a critical financial defect!`,
        codeSnippet: {
          language: 'sql',
          code: `-- Reconcile source orders total vs target orders total
SELECT 
    (SELECT SUM(amount) FROM src_orders) AS src_total,
    (SELECT SUM(amount) FROM tgt_orders) AS tgt_total,
    (SELECT SUM(amount) FROM src_orders) - (SELECT SUM(amount) FROM tgt_orders) AS variance;`,
        },
        takeaways: [
          'A variance of even ₹0.01 in financial batch reconciliation halts production releases.',
        ],
      },
      {
        title: '3. Capstone Project: Customer & Order Data Migration Validation',
        summary: 'Comprehensive audit of legacy source tables against migrated target tables.',
        explanation: `**Scenario:**
Our e-commerce company completed a migration from a legacy database (\`src_customers\`, \`src_orders\`) to a modern cloud data warehouse (\`tgt_customers\`, \`tgt_orders\`).
The ETL team claims the migration was 100% successful.
As the Lead QA Test Engineer, your objective is to write SQL validation queries to uncover all 7 seeded data quality defects:
• **Defect 1 (Missing Target Record):** Customer 1005 was dropped.
• **Defect 2 (Ghost Record):** Customer 9999 was inserted into target despite never existing in source.
• **Defect 3 (Duplicate Key):** Customer 1004 appears twice in target.
• **Defect 4 (Null in Mandatory Field):** Customer 1002 has a NULL email in target.
• **Defect 5 (Status Mapping Glitch):** Customer 1003 has status \'UNKNOWN\' instead of \'INACTIVE\'.
• **Defect 6 (Financial Truncation):** Order 802 had amount ₹649.00 truncated to ₹64.90.
• **Defect 7 (Date Epoch Glitch):** Order 803 had order_date defaulted to \'1970-01-01\'.`,
        codeSnippet: {
          language: 'sql',
          code: `-- Example Audit Query: Compare customer status mapping between source and target
SELECT 
    s.customer_id, 
    s.status AS src_status, 
    t.status AS tgt_status
FROM src_customers s
JOIN tgt_customers t ON s.customer_id = t.customer_id
WHERE s.status != t.status;`,
        },
        takeaways: [
          'Write each validation query, review the discrepancy, and record your bug findings in the test evidence summary.',
        ],
      },
    ],
    exercises: [
      {
        id: 'ex-day5-1',
        title: 'Capstone Task 1: Reconcile Customer Record Counts',
        description: 'Verify record counts between src_customers and tgt_customers.',
        instruction: 'Write a UNION query to display the table_name and count(*) for src_customers and tgt_customers.',
        starterSql: 'SELECT \'src_customers\' AS table_name, COUNT(*) AS record_count FROM src_customers\nUNION ALL\nSELECT \'tgt_customers\' AS table_name, COUNT(*) AS record_count FROM tgt_customers;',
        solutionSql: 'SELECT \'src_customers\' AS table_name, COUNT(*) AS record_count FROM src_customers UNION ALL SELECT \'tgt_customers\' AS table_name, COUNT(*) AS record_count FROM tgt_customers;',
        expectedMinRows: 2,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 2) return { success: false, feedback: 'Expected 2 rows comparing src and tgt.' };
          return { success: true, feedback: 'Discrepancy identified: Source has 5 records, target has 6 records (due to duplicate and ghost records)!' };
        },
        hints: ['Use UNION ALL between two SELECT count(*) queries'],
      },
      {
        id: 'ex-day5-2',
        title: 'Capstone Task 2: Find the Missing Customer Dropped in Target',
        description: 'Locate source records that failed to migrate.',
        instruction: 'Write a query using LEFT JOIN to identify the customer_id present in src_customers that is absent in tgt_customers.',
        starterSql: 'SELECT s.customer_id, s.full_name, s.email\nFROM src_customers s\nLEFT JOIN tgt_customers t ON s.customer_id = t.customer_id\nWHERE t.customer_id IS NULL;',
        solutionSql: 'SELECT s.customer_id, s.full_name, s.email FROM src_customers s LEFT JOIN tgt_customers t ON s.customer_id = t.customer_id WHERE t.customer_id IS NULL;',
        expectedMinRows: 1,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 1) return { success: false, feedback: 'Expected 1 dropped record.' };
          return { success: true, feedback: 'Defect 1 Verified: Customer 1005 (Eshwar S) was dropped during migration!' };
        },
        hints: ['Join src_customers s LEFT JOIN tgt_customers t ... WHERE t.customer_id IS NULL'],
      },
      {
        id: 'ex-day5-3',
        title: 'Capstone Task 3: Identify Null Mandatory Fields in Target',
        description: 'Find target customers where required email addresses were corrupted to NULL.',
        instruction: 'Write a query on tgt_customers to find records where email IS NULL.',
        starterSql: 'SELECT customer_id, full_name, email, status\nFROM tgt_customers\nWHERE email IS NULL;',
        solutionSql: 'SELECT customer_id, full_name, email, status FROM tgt_customers WHERE email IS NULL;',
        expectedMinRows: 1,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 1) return { success: false, feedback: 'Expected 1 customer with NULL email.' };
          return { success: true, feedback: 'Defect 4 Verified: Customer 1002 (Bhavna K) has a NULL email in target warehouse!' };
        },
        hints: ['Filter WHERE email IS NULL'],
      },
      {
        id: 'ex-day5-4',
        title: 'Capstone Task 4: Reconcile Financial Order Totals & Variance',
        description: 'Compute total order revenue between src_orders and tgt_orders and calculate the variance.',
        instruction: 'Write a query to calculate src_total, tgt_total, and the variance (src_total - tgt_total).',
        starterSql: 'SELECT \n    (SELECT SUM(amount) FROM src_orders) AS src_total,\n    (SELECT SUM(amount) FROM tgt_orders) AS tgt_total,\n    (SELECT SUM(amount) FROM src_orders) - (SELECT SUM(amount) FROM tgt_orders) AS variance;',
        solutionSql: 'SELECT (SELECT SUM(amount) FROM src_orders) AS src_total, (SELECT SUM(amount) FROM tgt_orders) AS tgt_total, (SELECT SUM(amount) FROM src_orders) - (SELECT SUM(amount) FROM tgt_orders) AS variance;',
        expectedMinRows: 1,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          const variance = Number(res.rows[0]?.[2]);
          if (Math.abs(variance - 584.1) > 0.1) return { success: false, feedback: `Expected variance around ₹584.10, got ${variance}.` };
          return { success: true, feedback: 'Critical Defect 6 Verified: Financial variance of ₹584.10 detected due to amount truncation on order 802!' };
        },
        hints: ['Use scalar subqueries: (SELECT SUM(amount) FROM src_orders)'],
      },
      {
        id: 'ex-day5-5',
        title: 'Capstone Task 5: Detect Status and Date Corruption',
        description: 'Compare order records to detect date corruption and status glitches.',
        instruction: 'Write an INNER JOIN query between src_orders and tgt_orders to list any orders where order_date differs between source and target.',
        starterSql: 'SELECT \n    s.order_id,\n    s.order_date AS src_date,\n    t.order_date AS tgt_date,\n    s.amount\nFROM src_orders s\nINNER JOIN tgt_orders t ON s.order_id = t.order_id\nWHERE s.order_date != t.order_date;',
        solutionSql: 'SELECT s.order_id, s.order_date AS src_date, t.order_date AS tgt_date, s.amount FROM src_orders s INNER JOIN tgt_orders t ON s.order_id = t.order_id WHERE s.order_date != t.order_date;',
        expectedMinRows: 1,
        validate: (res) => {
          if (res.error) return { success: false, feedback: res.error };
          if (res.rowCount !== 1) return { success: false, feedback: 'Expected 1 date mismatch order.' };
          return { success: true, feedback: 'Defect 7 Verified: Order 803 date was corrupted to 1970-01-01 (Unix Epoch bug)!' };
        },
        hints: ['Join on order_id and filter WHERE s.order_date != t.order_date'],
      },
    ],
    interviewQuestions: [
      {
        id: 'iq-day5-1',
        question: 'Explain the end-to-end strategy you use to validate a large database migration.',
        concept: 'ETL / Database Migration QA Methodology',
        modelAnswer: 'My 5-phase validation strategy: 1. Pre-Migration Baseline: Take row counts, primary key checksums, and aggregate financial totals on source tables. 2. Schema Validation: Confirm column data types, constraints, nullability, and default values in the target schema. 3. Completeness Checks: Use LEFT JOIN and EXCEPT queries to verify 100% row migration without dropped or injected ghost records. 4. Transformation & Integrity Checks: Audit business rules, status mappings, foreign keys, and precision truncation. 5. Financial Reconciliation: Verify zero variance in aggregated currency totals.',
        seniorTip: 'Using terms like "Zero-variance reconciliation", "Row parity", and "Checksum validation" positions you at the top tier of QA candidates.',
      },
      {
        id: 'iq-day5-2',
        question: 'What is a referential integrity violation, and how do you write a test query to find it?',
        concept: 'Foreign Key Constraint Verification',
        modelAnswer: 'A referential integrity violation occurs when a foreign key in a child table points to a non-existent primary key in the parent table (orphaned record). To detect this, I perform a LEFT JOIN from child to parent and assert that the parent primary key IS NULL. For example: `SELECT c.* FROM order_items c LEFT JOIN products p ON c.product_id = p.id WHERE p.id IS NULL;`',
        seniorTip: 'Provide the exact SQL query syntax proactively during the interview without being asked.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q5-1',
          question: 'Why is matching record counts alone insufficient to certify a successful data migration?',
          options: [
            'Record counts are never accurate in relational databases',
            'A table could have dropped 5 legitimate source records while simultaneously introducing 5 duplicate or ghost records, giving an identical total count',
            'Databases do not support COUNT(*) on migrated tables',
            'Target tables always have double the records',
          ],
          correctAnswerIndex: 1,
          explanation: 'Matching row counts can easily hide data loss if dropped records are offset by unintended duplicates or ghost records. Field-level reconciliation and difference joins are essential.',
        },
        {
          id: 'q5-2',
          question: 'Which query correctly tests that the email column in target_customers has no forbidden NULL values?',
          options: [
            'SELECT * FROM target_customers WHERE email = NULL;',
            'SELECT * FROM target_customers WHERE email IS NULL;',
            'SELECT COUNT(*) FROM target_customers WHERE email != \'\';',
            'SELECT * FROM target_customers GROUP BY email;',
          ],
          correctAnswerIndex: 1,
          explanation: '`WHERE email IS NULL` correctly isolates any records with missing email values.',
        },
        {
          id: 'q5-3',
          question: 'In financial balance reconciliation, what is the acceptable variance between source and target totals?',
          options: ['₹100.00', '1% variance', '₹0.00 (Zero variance)', 'Any variance under 5%'],
          correctAnswerIndex: 2,
          explanation: 'In financial transactions and banking audits, zero variance (₹0.00) is the only acceptable outcome.',
        },
        {
          id: 'q5-4',
          question: 'If a date column displays "1970-01-01" after an ETL migration, what is the most probable root cause?',
          options: [
            'The customer registered in 1970',
            'A timestamp serialization bug occurred where null or empty dates were defaulted to Unix Epoch timestamp 0',
            'The database was created in 1970',
            'The query ran in UTC timezone',
          ],
          correctAnswerIndex: 1,
          explanation: '1970-01-01 corresponds to Unix Epoch time 0. When dates fail parsing or default to 0, this characteristic bug appears.',
        },
        {
          id: 'q5-5',
          question: 'How do you check for duplicate primary keys in a newly migrated target table?',
          options: [
            'SELECT * FROM table ORDER BY id;',
            'SELECT id, COUNT(*) FROM table GROUP BY id HAVING COUNT(*) > 1;',
            'SELECT DISTINCT * FROM table;',
            'SELECT id FROM table WHERE id = id;',
          ],
          correctAnswerIndex: 1,
          explanation: 'Grouping by the primary key and filtering for `HAVING COUNT(*) > 1` immediately returns any keys that appear more than once.',
        },
      ],
    },
    summaryTakeaway: 'Congratulations on completing the 5-Day SQL Course! You have demonstrated practical fluency in SQL extraction, aggregations, joins, subqueries, CTEs, window functions, and real-world database migration quality assurance.',
  },
];
