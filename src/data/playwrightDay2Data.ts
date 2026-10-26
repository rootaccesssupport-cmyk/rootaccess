import type {
  PlaywrightDay2Unit,
  PlaywrightDay2AssignmentRubric,
} from '../types/playwrightCourse';
import { PLAYWRIGHT_COURSE_TITLE, PLAYWRIGHT_TOTAL_DAYS } from '../types/playwrightCourse';

export const PLAYWRIGHT_DAY_2_DATA: PlaywrightDay2Unit = {
  courseTitle: PLAYWRIGHT_COURSE_TITLE,
  dayNumber: 2,
  totalDays: PLAYWRIGHT_TOTAL_DAYS,
  lessonTitle: 'JavaScript Essentials for Test Automation',
  subtitle:
    'Learn the essential JavaScript you need for Playwright test automation: variables, conditions, loops, functions, arrays, objects, and async/await—explained step by step with practical QA examples.',
  level: 'Beginner',
  estimatedHours: '2–3 Hours',
  prerequisites: 'Day 1 concepts (Automation fundamentals and Playwright architecture). No prior coding experience required.',
  learningObjectives: [
    'Understand JavaScript syntax, variables (let vs const), and core data types (strings, numbers, booleans, null, undefined).',
    'Use if/else conditions and strict equality (===) to verify test outcomes accurately.',
    'Write clean for and for...of loops to repeat test steps across multiple data inputs safely.',
    'Build reusable helper functions and arrow functions to keep your test code clean and maintainable.',
    'Organize test data with arrays and objects to prepare for data-driven testing.',
    'Master asynchronous programming with Promises, async/await, and error handling with try...catch.',
  ],

  roadmap: [
    { day: 1, title: 'Day 1: Automation Fundamentals & Playwright', focus: 'E2E Testing, Architecture, Roadmap', isCompleted: true },
    { day: 2, title: 'Day 2: JavaScript Essentials for Automation', focus: 'Variables, Logic, Functions, Async/Await', isCurrent: true },
    { day: 3, title: 'Day 3: Playwright Setup & First Script', focus: 'CLI, Config, Chromium, First Test' },
    { day: 4, title: 'Day 4: Locators and Element Identification', focus: 'getByRole, getByLabel, CSS, XPath, Strictness' },
    { day: 5, title: 'Day 5: Web-First Assertions & Actions', focus: 'expect(locator), Smart Polling, Form Handling' },
    { day: 6, title: 'Day 6: Waiting Strategies & Flakiness', focus: 'Auto-Waiting, Explicit Waits, Timeouts' },
    { day: 7, title: 'Day 7: Pages, Tabs, Frames & Dialogs', focus: 'Multi-Tab Workflows, Iframes, Alerts' },
    { day: 8, title: 'Day 8: Page Object Model (POM) Architecture', focus: 'Clean Architecture, Reusable Page Components' },
    { day: 9, title: 'Day 9: API Testing & Network Interception', focus: 'REST APIs, Route Mocking, JSON Validation' },
    { day: 10, title: 'Day 10: Test Fixtures & Hooks', focus: 'beforeEach, afterEach, Custom Test Fixtures' },
    { day: 11, title: 'Day 11: Data-Driven Testing with JSON & CSV', focus: 'Parameterized Tests, External Test Data' },
    { day: 12, title: 'Day 12: Authentication & Storage State', focus: 'Session Reuse, Bypass Login, Cookies' },
    { day: 13, title: 'Day 13: Visual Regression & Screenshots', focus: 'Pixel Diffing, toHaveScreenshot Baselines' },
    { day: 14, title: 'Day 14: CI/CD Pipeline Integration', focus: 'GitHub Actions, Headless Runs, Artifacts' },
    { day: 15, title: 'Day 15: Debugging, Trace Viewer & Video', focus: 'playwright.dev/trace, Step Timeline' },
    { day: 16, title: 'Day 16: AI-Assisted Test Automation', focus: 'LLM Prompt Engineering, DOM Grounding' },
    { day: 17, title: 'Day 17: AI Self-Healing Locators', focus: 'DOM Mutation Detection, Resilient Selectors' },
    { day: 18, title: 'Day 18: Synthetic Data & Edge Cases', focus: 'AI-Generated Fixtures, Boundary Fuzzing' },
    { day: 19, title: 'Day 19: Capstone E2E Test Suite', focus: 'Production Regression Pipeline' },
    { day: 20, title: 'Day 20: Interview Mastery & Certification', focus: 'Portfolio Defense, Comprehensive Exam' },
  ],

  topics: [
    // -----------------------------------------------------------------------
    // TOPIC 1: JavaScript Fundamentals
    // -----------------------------------------------------------------------
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'Topic 1: JavaScript Fundamentals',
      durationMinutes: 20,
      explanation: `JavaScript is the programming language that powers the web. Every time you click a button, open a popup modal, or submit a form on a website, JavaScript is running behind the scenes.

### Why JavaScript Matters for Automation
When you write tests, your instructions are written in standard JavaScript. Your code tells the browser what to do—such as navigating to a URL, typing into an email field, clicking a submit button, and verifying that the correct dashboard loads.

### How JavaScript Compares to HTML and CSS
Think of a web page like a house:
• **HTML (Structure):** The walls and doors. HTML defines elements like headings, text inputs, buttons, and tables.
• **CSS (Style):** The paint, furniture, and decorations. CSS controls colors, fonts, spacing, and layouts.
• **JavaScript (Action):** The electricity, plumbing, and smart locks. JavaScript brings the page to life. In test automation, JavaScript drives user actions and checks test results.

### Basic Rules of JavaScript Syntax
• **Statements:** A statement is a single instruction telling the computer to do something. In JavaScript, each statement usually ends with a semicolon (\`;\`).
• **Expressions:** An expression is any piece of code that produces a value. For example, \`5 + 3\` evaluates to \`8\`.
• **Comments:** Use comments to leave helpful notes for humans. JavaScript completely ignores them:
  - Single-line comment: \`// This is a note\`
  - Multi-line comment: \`/* This is a longer explanation */\`
• **Case Sensitivity:** JavaScript cares about uppercase and lowercase letters. The variables \`userEmail\`, \`UserEmail\`, and \`USEREMAIL\` are treated as three completely different variables.

### The 5 Core Data Types for Testers
Every piece of data you handle in automated testing falls into one of these basic types:
1. **String (Text):** Written inside quotes (\`"text"\`, \`'text'\`, or backticks \`\`text\`\`). Used for URLs, usernames, page titles, and button labels. Example: \`"RootAccess"\`
2. **Number:** Numbers without quotes (both whole numbers and decimals). Used for counters, prices, and HTTP status codes. Example: \`200\`, \`49.99\`
3. **Boolean (True or False):** Only two possible values: \`true\` or \`false\`. Used for flags and checks. Example: \`const isTestPassed = true;\`
4. **Null:** Represents an intentional empty value. Example: \`let errorMessage = null;\` (meaning no error has occurred yet).
5. **Undefined:** Means a variable has been declared, but no value has been assigned to it yet.

### How to Declare Variables: const vs let vs var
A variable is a labeled container that stores data for later use. Modern JavaScript gives us two main keywords to create variables:
• **const (Constant — Recommended by Default):**
  Use \`const\` for any value that should never be reassigned. In test automation, 95% of your variables should be \`const\` (such as URLs, element locators, and expected test results). If you accidentally try to change a \`const\` variable, JavaScript immediately gives you an error, preventing accidental bugs.
• **let (Reassignable):**
  Use \`let\` only when you know the value needs to change over time, such as a loop counter or a retry counter (\`let attempts = 0;\`).
• **Why You Should Avoid var:**
  Before 2015, JavaScript used \`var\`. However, \`var\` has confusing scoping rules that can cause subtle bugs. Modern QA engineering codebases avoid \`var\` entirely. Always use \`const\` by default, and use \`let\` when you need to change a value.`,
      keyTakeaways: [
        'JavaScript provides the instructions that tell Playwright how to interact with web pages.',
        'Always use const by default; use let only when a value needs to be reassigned.',
        'Avoid the legacy var keyword to prevent tricky scoping bugs in your tests.',
        'The five core data types you will use most are: string, number, boolean, null, and undefined.',
      ],
      terminology: [
        { term: 'Statement', definition: 'A complete line of code that performs an action (usually ending in a semicolon).' },
        { term: 'Expression', definition: 'A snippet of code that evaluates to a specific value.' },
        { term: 'const', definition: 'A variable declaration for values that cannot be reassigned.' },
        { term: 'let', definition: 'A variable declaration for values that can change over time.' },
        { term: 'Data Type', definition: 'The classification of a value, such as text (string), number, or true/false (boolean).' },
      ],
      examples: [
        {
          title: 'Declaring Variables and Printing Values',
          description: 'Declaring test variables with const and let, then logging them to the console.',
          codeSnippet: `const applicationName = "RootAccess";
let retryCount = 2;
const isTestPassed = true;

console.log(applicationName);
console.log(retryCount);
console.log(isTestPassed);`,
          expectedOutput: `RootAccess
2
true`,
        },
      ],
      exercise: {
        id: 'ex-topic-1',
        title: 'Exercise 1: Identify Data Types & Mutability',
        prompt: 'Look at this line of code: const timeoutMs = 30000; What is the data type of timeoutMs, and what happens if you try to run timeoutMs = 60000; later in your test script?',
        options: [
          'It is a Number; reassigning it works normally and changes timeout to 60000.',
          'It is a String; reassigning it throws a ReferenceError.',
          'It is a Number; attempting to reassign a const throws a TypeError at runtime.',
          'It is a Boolean; reassigning it sets it to undefined.',
        ],
        correctAnswerIndex: 2,
        explanation: '30000 is a Number. Because it was declared using const, attempting to reassign it triggers a TypeError: "Assignment to constant variable". If you need to reassign a variable, declare it with let instead.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 2: Conditions and Comparison Operators
    // -----------------------------------------------------------------------
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Topic 2: Conditions and Comparison Operators',
      durationMinutes: 20,
      explanation: `Every automated test boils down to one fundamental question:
**Does what actually happened match what we expected to happen?**

For example:
- Did the user get redirected to the dashboard after logging in?
- Did the API return an HTTP status code of 200?
- Is the error message displayed on the screen?

To check these questions in JavaScript, we use **conditions** and **comparisons**.

### Conditional Statements: if, else if, else
Conditional statements allow your code to take different actions depending on whether a condition is true or false:

\`\`\`javascript
if (actualStatus === 200) {
  console.log("Test Passed: Server returned success status.");
} else if (actualStatus === 404) {
  console.log("Test Failed: Page not found.");
} else {
  console.log("Test Failed: Unexpected status code received.");
}
\`\`\`

### Strict Equality (===) vs Loose Equality (==)
This is one of the most common interview questions for QA automation roles:
• **Strict Equality (\`===\`) — The Right Way:**
  Compares both the **value** and the **data type** without any automatic conversion.
  - \`200 === 200\` -> \`true\` (both are numbers with value 200)
  - \`200 === "200"\` -> \`false\` (one is a number, the other is a string)
• **Loose Equality (\`==\`) — The Risky Way:**
  Tries to automatically convert the types before comparing them.
  - \`200 == "200"\` -> \`true\` (JavaScript automatically converts the string to a number)
• **Why Testers Must Always Use Strict Equality (\`===\`):**
  If an API response sends back the status code as text (\`"200"\`) instead of a number (\`200\`), that is a real backend bug! If you use \`==\`, your test will pass and hide the bug. Always use \`===\` (strict equal) and \`!==\` (strict not equal) in your automated test scripts.

### Common Comparison Operators
• Greater than / Less than: \`>\`, \`<\`
• Greater than or equal / Less than or equal: \`>=\`, \`<=\`
• Strict inequality: \`!==\` (checks that value or type is different)

### Logical Operators
• **AND (\`&&\`):** Both sides must be true.
  Example: \`statusCode === 200 && responseTimeMs < 500\`
• **OR (\`||\`):** At least one side must be true.
  Example: \`role === "admin" || role === "instructor"\`
• **NOT (\`!\`):** Inverts a boolean value (turns true to false, and false to true).
  Example: \`!isButtonDisabled\` (meaning the button is enabled).

### Truthy and Falsy Values
In JavaScript, any value can be evaluated inside an \`if\` condition.
There are only **6 Falsy values** in all of JavaScript (they count as false):
1. \`false\`
2. \`0\`
3. \`""\` (empty string)
4. \`null\`
5. \`undefined\`
6. \`NaN\` (Not-a-Number)

Every other value in JavaScript is **Truthy** (evaluates to true). This includes numbers like \`1\`, non-empty strings like \`"hello"\`, empty arrays \`[]\`, and empty objects \`{}\`.`,
      keyTakeaways: [
        'Always use strict equality (===) and strict inequality (!==) in automated tests to prevent type bugs.',
        'Use if, else if, and else statements to guide test flow based on conditions.',
        'Logical operators (&&, ||, !) let you combine multiple test checks into a single statement.',
        'Remember the 6 falsy values: false, 0, "", null, undefined, and NaN. All other values are truthy.',
      ],
      terminology: [
        { term: 'Strict Equality (===)', definition: 'Compares both value and data type without automatic type conversion.' },
        { term: 'Loose Equality (==)', definition: 'Compares values after attempting automatic type conversion (coercion).' },
        { term: 'Logical AND (&&)', definition: 'Returns true only if both conditions evaluate to true.' },
        { term: 'Falsy', definition: 'A value that evaluates to false when checked in a boolean condition.' },
      ],
      examples: [
        {
          title: 'Verifying an HTTP Status Code',
          description: 'Comparing an actual HTTP response status code to the expected value using strict equality.',
          codeSnippet: `const actualStatus = 200;
const expectedStatus = 200;

if (actualStatus === expectedStatus) {
  console.log("Status matches");
} else {
  console.log("Status does not match");
}`,
          expectedOutput: `Status matches`,
        },
      ],
      exercise: {
        id: 'ex-topic-2',
        title: 'Exercise 2: Strict vs Loose Comparison',
        prompt: 'An API response returns the body: const receivedCount = "0"; In your test script, what is the result of (receivedCount === 0) versus (receivedCount == 0)?',
        options: [
          'Both evaluate to true because 0 and "0" have identical numeric value.',
          'Strict (===) is false (string vs number); Loose (==) is true due to type coercion.',
          'Both evaluate to false because "0" is undefined.',
          'Strict (===) is true; Loose (==) throws a SyntaxError.',
        ],
        correctAnswerIndex: 1,
        explanation: 'receivedCount === 0 is false because "0" is a string and 0 is a number (strict equality prevents automatic conversion). receivedCount == 0 is true because loose equality converts the string "0" to the number 0 before checking.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 3: Loops and Reusable Logic
    // -----------------------------------------------------------------------
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'Topic 3: Loops and Reusable Logic',
      durationMinutes: 20,
      explanation: `In test automation, you often need to repeat the same check across a list of items.

For example:
- Verifying that every product card on an e-commerce page displays an "Add to Cart" button.
- Running a search test with several different keywords ("laptop", "headphones", "keyboard").
- Checking that all options in a country dropdown menu are present.

Instead of writing the same code 10 times, you use a **loop** to run the check automatically for each item.

### The for...of Loop (The Easiest & Most Readable)
The modern \`for...of\` loop is the cleanest way to iterate through an array of items:

\`\`\`javascript
const searchTerms = ["laptop", "headphones", "keyboard"];

for (const term of searchTerms) {
  console.log(\`Testing search term: \${term}\`);
}
\`\`\`

In plain English, this reads: *"For each term inside the searchTerms list, run this block of code."* On each cycle, the variable \`term\` receives the next item in the list.

### Traditional for Loop (When You Need the Item Number)
If you need to know the index position of each item (for example, to print "Step 1", "Step 2", "Step 3"), use the standard index-based \`for\` loop:

\`\`\`javascript
const testSteps = ["Open URL", "Enter Username", "Click Submit"];

for (let i = 0; i < testSteps.length; i++) {
  console.log(\`Step \${i + 1}: \${testSteps[i]}\`);
}
\`\`\`

Key points to remember:
• Arrays start counting from index \`0\` (so \`testSteps[0]\` is \`"Open URL"\`).
• We declare \`let i = 0\` because the counter \`i\` increments (\`i++\`) on every turn.
• \`testSteps.length\` gives the total number of items in the array.

### While Loops and Infinite Loop Warnings
A \`while\` loop keeps running as long as its condition remains true:

\`\`\`javascript
let retryAttempts = 0;
while (retryAttempts < 3) {
  console.log(\`Attempt \${retryAttempts + 1}\`);
  retryAttempts++; // Don't forget this!
}
\`\`\`

### Avoiding Common Loop Pitfalls in Automation
• **Infinite Loops:** If your loop's condition never becomes false (for example, if you forget \`retryAttempts++\`), your test runner will freeze and hang forever until the build server times out.
• **Overloading a Single Test:** Putting 50 test scenarios inside a single test loop means that if scenario #2 fails, scenarios #3 through #50 will never run! On Day 9, we will learn how to use Playwright's parameterized tests so that each data item runs as an independent, isolated test case.`,
      keyTakeaways: [
        'The for...of loop is the cleanest, most readable way to iterate over an array of test data.',
        'Use an index-based for loop when you need to know the position number of an item.',
        'Always ensure every loop has a clear exit condition so your test does not hang indefinitely.',
        'Keep tests modular so that a failure in one item does not block remaining checks from running.',
      ],
      terminology: [
        { term: 'for...of Loop', definition: 'A modern loop syntax that iterates over the values of an array or list.' },
        { term: 'Iteration', definition: 'A single complete pass through a loop code block.' },
        { term: 'Index', definition: 'The numerical position of an item in an array, starting at zero (0).' },
        { term: 'Infinite Loop', definition: 'A loop that never ends because its exit condition is never satisfied, causing tests to freeze.' },
      ],
      examples: [
        {
          title: 'Iterating Through Search Terms',
          description: 'Looping through an array of search queries and printing each term.',
          codeSnippet: `const searchTerms = ["laptop", "headphones", "keyboard"];

for (const term of searchTerms) {
  console.log(\`Testing search term: \${term}\`);
}`,
          expectedOutput: `Testing search term: laptop
Testing search term: headphones
Testing search term: keyboard`,
        },
      ],
      exercise: {
        id: 'ex-topic-3',
        title: 'Exercise 3: Predict for...of Loop Output',
        prompt: 'Given: const roles = ["admin", "editor"]; let log = ""; for (const role of roles) { log += role + " "; } What is the final value of log?',
        options: [
          '"roles roles "',
          '"admin editor "',
          '"admin, editor"',
          '"0 1 "',
        ],
        correctAnswerIndex: 1,
        explanation: 'In a for...of loop, the iteration variable holds each item value ("admin" on the first pass, "editor" on the second pass). Appending each item with a space produces "admin editor ".',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 4: Functions and Reusability
    // -----------------------------------------------------------------------
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Topic 4: Functions and Reusability',
      durationMinutes: 25,
      explanation: `When writing automated tests, you will often perform the exact same tasks over and over:
- Logging in with an admin or student account
- Generating a unique, random email address
- Formatting a date or currency value
- Waiting for a modal dialog to close

If you copy-paste the same 10 lines of code across 30 different test files, what happens when the login button changes? You have to manually edit all 30 files!

Instead, you write a **function** once, and reuse it everywhere.

### What Is a Function?
A function is a reusable block of code designed to do a specific job. You define the function once, and then call (invoke) it whenever you need it.

### Standard Function Declarations
A standard function uses the \`function\` keyword, has a name, accepts optional **parameters**, and returns a value using \`return\`:

\`\`\`javascript
function createTestMessage(testName) {
  return \`Running test: \${testName}\`;
}

console.log(createTestMessage("Login"));
\`\`\`

### Parameters vs Arguments (Interview Question)
This is a standard question in QA interviews:
• **Parameter:** The placeholder variable name listed in the function definition (like \`testName\` in \`function createTestMessage(testName)\`).
• **Argument:** The actual, real value you supply when you call the function (like \`"Login"\` in \`createTestMessage("Login")\`).

### Return Values
The \`return\` statement sends a value back to whoever called the function and immediately ends the function. If a function has no \`return\` statement, it returns \`undefined\` by default.

### Arrow Functions (ES6)
Arrow functions provide a clean, modern shorthand for writing functions using the \`=>\` ("fat arrow") syntax:

\`\`\`javascript
// Multi-line arrow function
const createTestMessage = (testName) => {
  return \`Running test: \${testName}\`;
};

// Single-line arrow function with automatic (implicit) return
const add = (first, second) => first + second;

console.log(add(2, 3)); // Outputs: 5
\`\`\`

In Playwright, you will write arrow functions constantly, especially inside test definitions:
\`test('User can check out', async ({ page }) => { ... });\`

### Variable Scope: Where Can Variables Be Accessed?
• **Block Scope:** Variables declared with \`const\` and \`let\` inside curly braces \`{ ... }\` (such as inside an \`if\` statement or loop) only exist inside those braces.
• **Function Scope:** Variables declared inside a function cannot be accessed from outside that function.
• **Global Scope:** Variables declared outside any function or block can be accessed anywhere in the file.`,
      keyTakeaways: [
        'Functions bundle reusable logic so you do not repeat boilerplate code across tests.',
        'Parameters are the placeholder variables in a function; arguments are the real values passed in.',
        'Arrow functions ((params) => { ... }) provide concise syntax used heavily in Playwright tests.',
        'Variables declared with const and let are block-scoped to the enclosing { ... } braces.',
      ],
      terminology: [
        { term: 'Function Declaration', definition: 'A statement that defines reusable logic using the function keyword.' },
        { term: 'Arrow Function', definition: 'A concise syntax for defining functions using the => operator.' },
        { term: 'Parameter', definition: 'A named placeholder variable defined in a function signature.' },
        { term: 'Argument', definition: 'The concrete value passed to a function when it is called.' },
        { term: 'Scope', definition: 'The area of code where a declared variable is visible and accessible.' },
      ],
      examples: [
        {
          title: 'Named Function Declaration',
          description: 'Defining and calling a helper function that generates formatted test messages.',
          codeSnippet: `function createTestMessage(testName) {
  return \`Running test: \${testName}\`;
}

console.log(createTestMessage("Login"));`,
          expectedOutput: `Running test: Login`,
        },
        {
          title: 'Concise Arrow Function',
          description: 'Using an arrow function with implicit return to calculate a sum.',
          codeSnippet: `const add = (first, second) => first + second;

console.log(add(2, 3));`,
          expectedOutput: `5`,
        },
      ],
      exercise: {
        id: 'ex-topic-4',
        title: 'Exercise 4: Function Arguments & Return Values',
        prompt: 'Given: const formatLocator = (prefix, name) => `${prefix}[data-test="${name}"]`; What is the return value of formatLocator("button", "submit-btn")?',
        options: [
          '"button[data-test=submit-btn]"',
          '"button[data-test=\\"submit-btn\\"]"',
          '"button data-test submit-btn"',
          'undefined',
        ],
        correctAnswerIndex: 1,
        explanation: 'The arrow function replaces prefix with "button" and name with "submit-btn", returning the string: "button[data-test=\\"submit-btn\\"]".',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 5: Arrays, Objects, and Test Data
    // -----------------------------------------------------------------------
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Topic 5: Arrays, Objects, and Test Data',
      durationMinutes: 25,
      explanation: `Automated tests need structured data to work with. You need to model realistic entities such as user accounts, shopping cart items, address forms, and API payloads.

In JavaScript, **arrays** and **objects** are the two primary tools for organizing test data.

### Arrays: Ordered Lists of Items
An array is an ordered list of values enclosed in square brackets \`[ ... ]\`:

\`\`\`javascript
const browserEngines = ["chromium", "firefox", "webkit"];

console.log(browserEngines[0]); // "chromium" (first item)
console.log(browserEngines.length); // 3 (total items)

// Adding an item to the end of the array
browserEngines.push("edge");
\`\`\`

Key array rules:
• **Zero-Based Indexing:** The first item is at index \`0\`, the second item is at index \`1\`, and so on.
• **.length property:** Tells you how many items are in the array.
• **.push(item):** Adds a new item to the end of the array.

### Objects: Structured Key-Value Pairs
An object represents a single entity with named properties. It is written using curly braces \`{ ... }\` containing comma-separated \`key: value\` pairs:

\`\`\`javascript
const loginData = {
  username: "tester@example.com",
  password: "ExamplePassword123",
  expectedResult: "success"
};
\`\`\`

Accessing object properties:
• **Dot Notation (Recommended):** \`loginData.username\` -> \`"tester@example.com"\`
• **Bracket Notation:** \`loginData["password"]\` -> \`"ExamplePassword123"\` (useful when property names contain hyphens or are stored in variables).

*Security Best Practice: Always use fictional dummy credentials in your test exercises and code repositories. Never put real production passwords in test files.*

### Arrays of Objects: The Foundation of Data-Driven Testing
In professional QA, you test features against multiple user types and scenarios (valid logins, wrong passwords, locked accounts, and empty fields).

You represent these scenarios as an array of objects:

\`\`\`javascript
const loginScenarios = [
  { username: "valid@example.com", expectedResult: "success" },
  { username: "invalid@example.com", expectedResult: "failure" }
];

for (const scenario of loginScenarios) {
  console.log(scenario.username, scenario.expectedResult);
}
\`\`\`

This pattern is the foundation for **Day 9 (Data-Driven Testing)**, where we load external test datasets from JSON files and automatically generate tests for each scenario!`,
      keyTakeaways: [
        'Arrays store ordered lists accessed by numerical indexes: array[0].',
        'Objects store structured key-value pairs accessed by dot notation: object.property.',
        'Arrays of objects are the industry standard for modeling scenarios in data-driven tests.',
        'Always use fictional dummy data for test scenarios—never real customer credentials.',
      ],
      terminology: [
        { term: 'Array', definition: 'An ordered list of values accessed by a zero-based numerical index.' },
        { term: 'Object', definition: 'A collection of named key-value pairs representing an entity.' },
        { term: 'Dot Notation', definition: 'Accessing an object property using a period (e.g. user.name).' },
        { term: 'Bracket Notation', definition: 'Accessing an object property using square brackets (e.g. user["name"]).' },
      ],
      examples: [
        {
          title: 'Single Test Data Object',
          description: 'Declaring a login credentials object and accessing properties with dot notation.',
          codeSnippet: `const loginData = {
  username: "tester@example.com",
  password: "ExamplePassword123",
  expectedResult: "success"
};

console.log(loginData.username);
console.log(loginData.expectedResult);`,
          expectedOutput: `tester@example.com
success`,
        },
        {
          title: 'Array of Test Scenario Objects',
          description: 'Looping through multiple test scenarios and logging their parameters.',
          codeSnippet: `const loginScenarios = [
  { username: "valid@example.com", expectedResult: "success" },
  { username: "invalid@example.com", expectedResult: "failure" }
];

for (const scenario of loginScenarios) {
  console.log(scenario.username, scenario.expectedResult);
}`,
          expectedOutput: `valid@example.com success
invalid@example.com failure`,
        },
      ],
      exercise: {
        id: 'ex-topic-5',
        title: 'Exercise 5: Array of Objects Property Lookup',
        prompt: 'Given: const users = [{ id: 1, role: "admin" }, { id: 2, role: "guest" }]; How do you access the role of the second user?',
        options: [
          'users[2].role',
          'users.1.role',
          'users[1].role',
          'users.role[1]',
        ],
        correctAnswerIndex: 2,
        explanation: 'Arrays are zero-indexed. The first item is at index 0 and the second item is at index 1. Accessing users[1] retrieves the second object, and .role accesses its "guest" string.',
      },
    },

    // -----------------------------------------------------------------------
    // TOPIC 6: Asynchronous JavaScript, Promises, and Modules
    // -----------------------------------------------------------------------
    {
      id: 'topic-6',
      topicNumber: 6,
      title: 'Topic 6: Asynchronous JavaScript, Promises, and Modules',
      durationMinutes: 30,
      explanation: `Browser automation is naturally asynchronous. When your test script clicks a button, the browser sends a network request to a server, waits for the response, downloads data, and draws elements onto the screen.

None of this happens in zero milliseconds!

### Synchronous vs Asynchronous Execution
• **Synchronous (Blocking):** Code runs strictly line by line. Each line must completely finish before the next line can start. If an operation takes 5 seconds, the entire program freezes and waits.
• **Asynchronous (Non-Blocking):** The program starts a task that takes time (such as loading a webpage or fetching API data) and continues running other code without freezing. When the task finishes, JavaScript receives a signal that the result is ready.

### What Is a Promise?
A **Promise** is a JavaScript object that represents a future result. Think of it like a restaurant buzzer:
1. You order food at the counter. The cashier hands you a buzzer. That buzzer is a **Promise**.
2. **Pending:** The kitchen is currently preparing your meal.
3. **Fulfilled (Resolved):** The buzzer rings! Your food is ready and handed to you.
4. **Rejected:** The kitchen ran out of ingredients and tells you they cannot make your order.

In Playwright, almost every browser action—such as \`page.goto()\`, \`locator.click()\`, and \`locator.fill()\`—returns a Promise because the browser needs time to complete the action.

### The async and await Superpowers
In modern JavaScript, \`async\` and \`await\` make working with Promises simple and readable:
• **async keyword:** Placed before a function declaration (\`async function runTest() { ... }\`). An async function always returns a Promise.
• **await keyword:** Placed before an operation that returns a Promise (\`await page.click('button');\`). It tells JavaScript:
  *"Pause right here. Wait until the browser finishes this action before moving to the next line."*
• **Golden Rule:** You can only use \`await\` inside an \`async\` function.

\`\`\`javascript
function getTestResult() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Test data loaded");
    }, 500);
  });
}

async function runExample() {
  try {
    const result = await getTestResult();
    console.log(result);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

runExample();
\`\`\`

*(Note: setTimeout is used here only as an educational example. In real Playwright tests, you will not use arbitrary sleep timeouts; Playwright's auto-waiting handles timing automatically!)*

### Handling Errors with try...catch
Asynchronous actions can sometimes fail (for example, if a network connection drops or an element is not found). Wrapping your code in a \`try...catch\` block lets you handle errors gracefully without crashing the whole test run:

\`\`\`javascript
try {
  const result = await executeDangerousStep();
} catch (error) {
  console.error("Step failed gracefully:", error.message);
}
\`\`\`

### ES Modules: import and export
In modern JavaScript, you split your code into organized files and share functions between them:

\`\`\`javascript
// helpers.js
export function formatCurrency(amount) {
  return \`$\${amount.toFixed(2)}\`;
}

// testScript.js
import { formatCurrency } from './helpers.js';
console.log(formatCurrency(49.9)); // "$49.90"
\`\`\`

Starting on Day 3, every Playwright test file you write will import Playwright fixtures using this clean module syntax!`,
      keyTakeaways: [
        'Browser automation is asynchronous because web navigation, network calls, and page rendering take time.',
        'A Promise represents an operation that will complete or fail in the future.',
        'Use await before asynchronous Playwright calls to pause execution until the action finishes.',
        'Use try...catch blocks to catch errors gracefully and log clear diagnostic messages.',
        'ES modules (export / import) allow you to share reusable test helpers and locators across your project.',
      ],
      terminology: [
        { term: 'Synchronous', definition: 'Code execution where each task runs sequentially, blocking until it finishes.' },
        { term: 'Asynchronous', definition: 'Code execution where operations run in the background without freezing the program.' },
        { term: 'Promise', definition: 'An object representing the future completion or failure of an asynchronous task.' },
        { term: 'async / await', definition: 'Keywords that allow asynchronous Promise code to be written with clean, step-by-step syntax.' },
        { term: 'try...catch', definition: 'A code block used to intercept and handle runtime errors safely.' },
      ],
      examples: [
        {
          title: 'Asynchronous Promise with async/await',
          description: 'Awaiting a Promise that resolves after a simulated background delay.',
          codeSnippet: `function getTestResult() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Test data loaded");
    }, 500);
  });
}

async function runExample() {
  try {
    const result = await getTestResult();
    console.log(result);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

runExample();`,
          expectedOutput: `Test data loaded`,
        },
      ],
      exercise: {
        id: 'ex-topic-6',
        title: 'Exercise 6: Why await Is Required',
        prompt: 'In Playwright, page.goto(url) returns a Promise. What happens if you call const pageTitle = page.title(); without the await keyword?',
        options: [
          'pageTitle immediately contains the string title of the web page.',
          'pageTitle contains a pending Promise object instead of the actual title string.',
          'JavaScript throws a compilation error because await is required for all function calls.',
          'The browser automatically waits 10 seconds before continuing.',
        ],
        correctAnswerIndex: 1,
        explanation: 'Because page.title() is asynchronous, calling it without await assigns the Promise object itself (<Promise { <pending> }>) to pageTitle rather than the resolved string title.',
      },
    },
  ],

  // -------------------------------------------------------------------------
  // INTERVIEW PREPARATION (10 Questions with Model Answers)
  // -------------------------------------------------------------------------
  interviewQuestions: [
    {
      id: 'pw-d2-iq-1',
      questionNumber: 1,
      question: 'What is the difference between let and const in JavaScript?',
      difficulty: 'Beginner',
      assessmentFocus: 'Variable mutability, scoping, and modern ES6 best practices in automation.',
      modelAnswer:
        'Both let and const are block-scoped declarations introduced in ES6. const creates an immutable binding that cannot be reassigned after initialization, making it ideal for locator references, test configs, and expected outcomes. let allows variable reassignment, which is necessary for loop counters and retry accumulators. In modern automation codebases, we default to const to avoid accidental state mutations, using let only when reassignment is strictly required.',
      followUpQuestion: 'Can properties inside an object declared with const still be modified?',
    },
    {
      id: 'pw-d2-iq-2',
      questionNumber: 2,
      question: 'What is the difference between == and ===?',
      difficulty: 'Beginner',
      assessmentFocus: 'Understanding type conversion and preventing false-positive test results.',
      modelAnswer:
        '=== is strict equality, which compares both the value and the data type without conversion. == is loose equality, which attempts to convert operands to a matching type before comparing (for example, 200 == "200" is true). In test automation, we always use === because receiving a string "200" when expecting a numeric 200 is an API contract bug that loose equality would dangerously hide.',
      followUpQuestion: 'What are the 6 falsy values in JavaScript?',
    },
    {
      id: 'pw-d2-iq-3',
      questionNumber: 3,
      question: 'What is the difference between an array and an object?',
      difficulty: 'Beginner',
      assessmentFocus: 'Data structures for organizing test entities and scenario datasets.',
      modelAnswer:
        'An array is an ordered, zero-indexed collection of items (such as [1, 2, 3]), accessed by numerical position (array[0]). An object is an unordered collection of named key-value pairs (such as { username: "user@test.com", role: "admin" }), accessed by property keys using dot notation (user.role) or bracket notation (user["role"]). In automated testing, we frequently use arrays of scenario objects to power data-driven test suites.',
      followUpQuestion: 'When would you use bracket notation instead of dot notation?',
    },
    {
      id: 'pw-d2-iq-4',
      questionNumber: 4,
      question: 'What is a function, and why is it useful in test automation?',
      difficulty: 'Beginner',
      assessmentFocus: 'Code reusability, modularity, and reducing test maintenance overhead.',
      modelAnswer:
        'A function is a reusable block of code that performs a specific task when called. In test automation, functions encapsulate repetitive actions—such as logging in, generating random test emails, or formatting currency strings. Centralizing logic in functions keeps test files clean and readable. When an application workflow changes, you only update the helper function in one place instead of editing dozens of test files.',
      followUpQuestion: 'What does a JavaScript function return if there is no return statement?',
    },
    {
      id: 'pw-d2-iq-5',
      questionNumber: 5,
      question: 'What is the difference between a parameter and an argument?',
      difficulty: 'Beginner',
      assessmentFocus: 'Core programming vocabulary and function signature understanding.',
      modelAnswer:
        'A parameter is the placeholder variable name defined in the function declaration (for example, username in function login(username)). An argument is the actual value passed to that parameter when the function is called (for example, "alex@rootaccess.org" in login("alex@rootaccess.org")).',
      followUpQuestion: 'Can you specify default values for function parameters in JavaScript?',
    },
    {
      id: 'pw-d2-iq-6',
      questionNumber: 6,
      question: 'What is an arrow function?',
      difficulty: 'Beginner',
      assessmentFocus: 'ES6 syntax familiarity and Playwright test block conventions.',
      modelAnswer:
        'An arrow function is a concise syntax for defining functions introduced in ES6, using the => operator (for example: const sum = (a, b) => a + b;). Arrow functions do not bind their own this context and support implicit return on single-line expressions. In Playwright, arrow functions are the standard format for test blocks: test("User can login", async ({ page }) => { ... }).',
      followUpQuestion: 'How does the "this" keyword behave differently in arrow functions compared to standard functions?',
    },
    {
      id: 'pw-d2-iq-7',
      questionNumber: 7,
      question: 'What is a Promise in JavaScript?',
      difficulty: 'Beginner',
      assessmentFocus: 'Asynchronous architecture foundations required for modern browser testing.',
      modelAnswer:
        'A Promise is an object representing the future completion or failure of an asynchronous operation and its resulting value. A Promise exists in one of three states: pending (in progress), fulfilled (resolved with a result), or rejected (failed with an error). Almost all Playwright browser interactions—such as page.goto(), locator.click(), and page.textContent()—return Promises.',
      followUpQuestion: 'How did developers handle asynchronous operations in JavaScript before Promises existed?',
    },
    {
      id: 'pw-d2-iq-8',
      questionNumber: 8,
      question: 'What do async and await do in JavaScript?',
      difficulty: 'Beginner',
      assessmentFocus: 'Writing clean, readable asynchronous automation scripts.',
      modelAnswer:
        'async marks a function as asynchronous, ensuring it always returns a Promise. await can only be used inside an async function; it pauses execution until the Promise resolves, then yields its resolved value. This avoids messy nested callbacks and Promise .then() chains, allowing Playwright tests to read like clear, step-by-step instructions.',
      followUpQuestion: 'What happens if you use await outside an async function in a non-module file?',
    },
    {
      id: 'pw-d2-iq-9',
      questionNumber: 9,
      question: 'What is the purpose of try...catch in JavaScript?',
      difficulty: 'Beginner',
      assessmentFocus: 'Error handling, test diagnostics, and graceful recovery.',
      modelAnswer:
        'try...catch is a control flow structure that handles runtime errors without crashing the entire program. Code inside the try block runs normally; if an error occurs, control moves to the catch block where the error can be inspected, logged, or recovered from. In automation, we use try...catch for optional steps (like dismissing promotional popups) or capturing diagnostic screenshots before re-throwing.',
      followUpQuestion: 'What is the purpose of the optional finally block in a try...catch statement?',
    },
    {
      id: 'pw-d2-iq-10',
      questionNumber: 10,
      question: 'Why is asynchronous JavaScript important in Playwright?',
      difficulty: 'Beginner',
      assessmentFocus: 'Practical connection between JavaScript runtime and browser automation mechanics.',
      modelAnswer:
        'Browser automation involves network requests, browser rendering pipelines, and server responses, none of which happen instantly. Playwright commands communicate over an asynchronous WebSocket connection to browser engines (Chromium, Firefox, WebKit). Because Playwright APIs return Promises, using async/await ensures your test pauses at each step until the browser actually finishes loading the page, clicking the button, or evaluating an assertion.',
      followUpQuestion: 'Why is a hardcoded sleep or setTimeout considered an anti-pattern in Playwright?',
    },
  ],

  // -------------------------------------------------------------------------
  // 10-QUESTION CHECKPOINT QUIZ (Passing threshold: 80% / 8 of 10)
  // -------------------------------------------------------------------------
  quizQuestions: [
    {
      id: 'pw-d2-q1',
      questionNumber: 1,
      question: 'Which JavaScript keyword should you use by default when declaring variables that will not be reassigned?',
      options: ['let', 'var', 'const', 'static'],
      correctAnswerIndex: 2,
      explanation: 'const should be your default choice in modern JavaScript to ensure variables cannot be accidentally reassigned.',
    },
    {
      id: 'pw-d2-q2',
      questionNumber: 2,
      question: 'What is the result of the expression: 404 === "404"?',
      options: [
        'true, because the numeric values are identical',
        'false, because strict equality does not coerce data types (Number vs String)',
        'undefined',
        'TypeError',
      ],
      correctAnswerIndex: 1,
      explanation: 'Strict equality (===) checks both value and type without coercion. 404 is a number and "404" is a string, so the result is false.',
    },
    {
      id: 'pw-d2-q3',
      questionNumber: 3,
      question: 'Which of the following is considered a "falsy" value in JavaScript?',
      options: ['"false"', '[]', '0', '{}'],
      correctAnswerIndex: 2,
      explanation: '0 is one of JavaScript\'s 6 falsy values. "false" is a non-empty string and [] and {} are objects, all of which are truthy.',
    },
    {
      id: 'pw-d2-q4',
      questionNumber: 4,
      question: 'Which loop syntax is the cleanest and most readable for iterating through an array of test strings in modern JavaScript?',
      options: [
        'for (const item of items) { ... }',
        'while (true) { ... }',
        'for (item in items) { ... }',
        'loop (items) { ... }',
      ],
      correctAnswerIndex: 0,
      explanation: 'for...of is the recommended modern syntax for iterating over the values of arrays and iterable collections.',
    },
    {
      id: 'pw-d2-q5',
      questionNumber: 5,
      question: 'In the function definition function login(username, password) { ... }, what are username and password called?',
      options: ['Arguments', 'Parameters', 'Return values', 'Methods'],
      correctAnswerIndex: 1,
      explanation: 'Variables specified in the function signature are called parameters. The concrete values passed when calling the function are arguments.',
    },
    {
      id: 'pw-d2-q6',
      questionNumber: 6,
      question: 'What does an arrow function with no curly braces return: const multiply = (a, b) => a * b;?',
      options: [
        'undefined',
        'The product of a and b via implicit return',
        'A Promise object',
        'A syntax error',
      ],
      correctAnswerIndex: 1,
      explanation: 'Single-line arrow functions without curly braces have an implicit return, returning the evaluated expression directly.',
    },
    {
      id: 'pw-d2-q7',
      questionNumber: 7,
      question: 'How do you determine the total number of elements in an array named testScenarios?',
      options: [
        'testScenarios.count()',
        'testScenarios.size',
        'testScenarios.length',
        'testScenarios.total()',
      ],
      correctAnswerIndex: 2,
      explanation: 'The .length property of an array returns the total number of items stored in that array.',
    },
    {
      id: 'pw-d2-q8',
      questionNumber: 8,
      question: 'Given const testUser = { name: "Alex", role: "admin" };, how do you access the role property using dot notation?',
      options: [
        'testUser->role',
        'testUser.role',
        'testUser::role',
        'testUser["admin"]',
      ],
      correctAnswerIndex: 1,
      explanation: 'Dot notation (object.property) is the standard, readable way to access object properties in JavaScript.',
    },
    {
      id: 'pw-d2-q9',
      questionNumber: 9,
      question: 'What is a Promise in JavaScript?',
      options: [
        'A synchronous lock that prevents memory leaks',
        'An object representing the eventual completion or failure of an asynchronous operation',
        'A browser cookie used for user authentication',
        'A compiler flag in Node.js',
      ],
      correctAnswerIndex: 1,
      explanation: 'A Promise represents an asynchronous value that may not be available immediately but will resolve or reject in the future.',
    },
    {
      id: 'pw-d2-q10',
      questionNumber: 10,
      question: 'Why do we place the await keyword before Playwright commands like await page.click("button")?',
      options: [
        'Because JavaScript requires await on all function calls regardless of type',
        'To tell JavaScript to pause the async function until the browser completes the asynchronous click action',
        'To speed up browser execution by 200%',
        'To convert JavaScript code into TypeScript automatically',
      ],
      correctAnswerIndex: 1,
      explanation: 'page.click() returns a Promise. Placing await before it pauses execution until the browser physically executes the click and verifies completion.',
    },
  ],
};

// Starter code for the Day 2 Practical Assignment
export const PLAYWRIGHT_DAY_2_STARTER_CODE = `// ============================================================================
// RootAccess Day 2 Practical Assignment: JavaScript Test Data Utility
// ============================================================================

// 1. Declare an array with at least 5 login test scenario objects
const loginScenarios = [
  {
    id: "TC-LOGIN-001",
    username: "student.valid@example.com",
    scenarioType: "positive",
    expectedResult: "dashboard_redirect"
  },
  {
    id: "TC-LOGIN-002",
    username: "wrong.password@example.com",
    scenarioType: "negative",
    expectedResult: "invalid_credentials_error"
  },
  {
    id: "TC-LOGIN-003",
    username: "unregistered.user@example.com",
    scenarioType: "negative",
    expectedResult: "user_not_found_alert"
  },
  {
    id: "TC-LOGIN-004",
    username: "",
    scenarioType: "negative",
    expectedResult: "required_field_validation"
  },
  {
    id: "TC-LOGIN-005",
    username: "locked.account@example.com",
    scenarioType: "negative",
    expectedResult: "account_locked_message"
  }
];

// 2. Summary function that formats each scenario's details
function getScenarioSummary(scenario) {
  // Use a condition to distinguish positive from negative flows
  const typeLabel = scenario.scenarioType === "positive" 
    ? "[POSITIVE FLOW]" 
    : "[NEGATIVE FLOW]";

  return \`\${scenario.id} \${typeLabel} -> User: "\${scenario.username || "(empty)"}" | Expected: \${scenario.expectedResult}\`;
}

// 3. Loop through all scenarios and print their summaries
console.log("=== EXECUTING TEST SCENARIO SUMMARY ===");
for (const scenario of loginScenarios) {
  console.log(getScenarioSummary(scenario));
}

// 4. Asynchronous helper function that awaits a simulated Promise
function loadScenarioDataAsync() {
  return new Promise((resolve) => {
    resolve("All 5 login scenarios successfully loaded from data utility.");
  });
}

async function runDataUtility() {
  try {
    const status = await loadScenarioDataAsync();
    console.log("Async Status:", status);
  } catch (error) {
    console.error("Failed to load scenario data:", error.message);
  }
}

runDataUtility();
`;

export const PLAYWRIGHT_DAY_2_STARTER_OUTPUT = `=== EXECUTING TEST SCENARIO SUMMARY ===
TC-LOGIN-001 [POSITIVE FLOW] -> User: "student.valid@example.com" | Expected: dashboard_redirect
TC-LOGIN-002 [NEGATIVE FLOW] -> User: "wrong.password@example.com" | Expected: invalid_credentials_error
TC-LOGIN-003 [NEGATIVE FLOW] -> User: "unregistered.user@example.com" | Expected: user_not_found_alert
TC-LOGIN-004 [NEGATIVE FLOW] -> User: "(empty)" | Expected: required_field_validation
TC-LOGIN-005 [NEGATIVE FLOW] -> User: "locked.account@example.com" | Expected: account_locked_message
Async Status: All 5 login scenarios successfully loaded from data utility.`;

export const PLAYWRIGHT_DAY_2_STARTER_EXPLANATION = `In Playwright, almost every interaction with a browser—such as navigating to a page (page.goto), finding elements, clicking buttons, typing in text, and evaluating assertions—is asynchronous and returns a Promise. 

Because web browsers run in separate processes that involve network requests and page rendering, tasks require time to complete. Using async and await pauses the test script at each line until the browser physically finishes the operation. Without await, Playwright commands would execute out of order before elements finish loading, causing immediate test failures.`;

// Deterministic rubric evaluation function for Day 2 Practical Assignment
export function evaluateDay2Assignment(
  codeOrParams: string | { code: string; explanation?: string; asyncExplanation?: string; expectedOutput?: string },
  asyncExplanationParam?: string,
  expectedOutputParam?: string
): PlaywrightDay2AssignmentRubric {
  const code = typeof codeOrParams === 'string' ? codeOrParams : (codeOrParams?.code || '');
  const asyncExplanation = typeof codeOrParams === 'string'
    ? (asyncExplanationParam || '')
    : (codeOrParams?.explanation || codeOrParams?.asyncExplanation || asyncExplanationParam || '');
  const expectedOutput = typeof codeOrParams === 'string'
    ? (expectedOutputParam || '')
    : (codeOrParams?.expectedOutput || expectedOutputParam || '');

  const feedback: string[] = [];
  let score = 0;

  // 1. Syntax check & variable declarations
  const hasConstOrLet = /\b(const|let)\b/.test(code);
  const syntaxCorrect = hasConstOrLet && !/\bvar\b/.test(code);
  if (syntaxCorrect) {
    score += 1;
    feedback.push('✓ Proper variable declarations using modern const and let (no var).');
  } else if (!hasConstOrLet) {
    feedback.push('✗ Missing modern variable declarations (const or let).');
  } else {
    score += 0.5;
    feedback.push('⚠ Replace legacy var with modern const or let.');
  }

  // 2. Scenario array detection
  const hasScenarioArray = /\[\s*\{[\s\S]*\}\s*\]/.test(code);
  if (hasScenarioArray) {
    score += 1;
    feedback.push('✓ Contains an array of scenario objects.');
  } else {
    feedback.push('✗ Must define an array containing scenario objects ([ { ... }, ... ]).');
  }

  // 3. Scenario count (at least 5 objects)
  const objectMatches = code.match(/\{\s*(?:[a-zA-Z0-9_'"]+\s*:[\s\S]*?)\}/g);
  const scenarioCount = objectMatches ? objectMatches.length : 0;
  const scenarioCountValid = scenarioCount >= 5;
  if (scenarioCountValid) {
    score += 1;
    feedback.push(`✓ Contains at least 5 test scenarios (found ${scenarioCount} objects).`);
  } else {
    feedback.push(`✗ Found ${scenarioCount} scenario objects; requirement is at least 5.`);
  }

  // 4. Required fields: username, scenarioType, expectedResult
  const hasUsername = /\busername\b/.test(code);
  const hasScenarioType = /\bscenarioType\b/.test(code);
  const hasExpectedResult = /\bexpectedResult\b/.test(code);
  const hasRequiredFields = hasUsername && hasScenarioType && hasExpectedResult;
  if (hasRequiredFields) {
    score += 1;
    feedback.push('✓ Scenario objects contain username, scenarioType, and expectedResult.');
  } else {
    feedback.push(
      `✗ Scenario objects missing required fields (Found username: ${hasUsername}, scenarioType: ${hasScenarioType}, expectedResult: ${hasExpectedResult}).`
    );
  }

  // 5. Summary function
  const hasSummaryFunction = /function\s+[a-zA-Z0-9_]+\s*\(/i.test(code) || /const\s+[a-zA-Z0-9_]+\s*=\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>/i.test(code);
  if (hasSummaryFunction) {
    score += 1;
    feedback.push('✓ Declared a function that processes a scenario and produces a summary.');
  } else {
    feedback.push('✗ Missing a summary function declaration (function name() or arrow function).');
  }

  // 6. Loop iteration
  const hasLoop = /\b(for\s*\(|for\s+const\s+|while\s*\()/i.test(code);
  if (hasLoop) {
    score += 1;
    feedback.push('✓ Iterates over scenarios using a loop (for / for...of / while).');
  } else {
    feedback.push('✗ Missing a loop to iterate through the scenario records.');
  }

  // 7. Conditional logic
  const hasCondition = (/\b(if|switch)\b/.test(code) || /===|!==/.test(code) || /\?[\s\S]*?:/.test(code));
  if (hasCondition) {
    score += 1;
    feedback.push('✓ Uses conditions (if/else or ternary with ===) to distinguish positive vs negative flows.');
  } else {
    feedback.push('✗ Missing conditional logic to classify positive vs negative test scenarios.');
  }

  // 8. Async / await function with Promise
  const hasAsync = /\basync\b/.test(code);
  const hasAwait = /\bawait\b/.test(code);
  const hasPromise = /\bPromise\b/.test(code);
  const hasAsyncAwait = hasAsync && hasAwait && hasPromise;
  if (hasAsyncAwait) {
    score += 1;
    feedback.push('✓ Implements an async function awaiting a Promise.');
  } else {
    feedback.push('✗ Must include an async function that awaits a Promise.');
  }

  // 9. Explanation of async/await for Playwright
  const cleanExplanation = asyncExplanation.trim();
  const hasAsyncExplanation =
    cleanExplanation.length >= 40 &&
    /(playwright|browser|promise|wait|asynchron|race|load)/i.test(cleanExplanation);
  if (hasAsyncExplanation) {
    score += 1;
    feedback.push('✓ Clear written explanation of why async/await is essential in Playwright browser testing.');
  } else {
    feedback.push('✗ Explanation must be at least 40 characters explaining why async/await matters in Playwright.');
  }

  // 10. Expected output provided
  const cleanOutput = expectedOutput.trim();
  const hasExpectedOutput = cleanOutput.length >= 20;
  if (hasExpectedOutput) {
    score += 1;
    feedback.push('✓ Expected console output verified.');
  } else {
    feedback.push('✗ Please provide the expected console output of your test data utility.');
  }

  const criteria = [
    { id: 'c1', title: 'Modern Declarations (const/let, no var)', passed: syntaxCorrect, feedback: feedback[0] || '' },
    { id: 'c2', title: 'Scenario Array Structure', passed: hasScenarioArray, feedback: feedback[1] || '' },
    { id: 'c3', title: 'At Least 5 Scenarios', passed: scenarioCountValid, feedback: feedback[2] || '' },
    { id: 'c4', title: 'Required Scenario Fields', passed: hasRequiredFields, feedback: feedback[3] || '' },
    { id: 'c5', title: 'Summary Calculation Function', passed: hasSummaryFunction, feedback: feedback[4] || '' },
    { id: 'c6', title: 'Iteration Loop (for...of or for)', passed: hasLoop, feedback: feedback[5] || '' },
    { id: 'c7', title: 'Conditionals & Strict Equality (===)', passed: hasCondition, feedback: feedback[6] || '' },
    { id: 'c8', title: 'Async Function with Promise', passed: hasAsyncAwait, feedback: feedback[7] || '' },
    { id: 'c9', title: 'Written Explanation of Playwright Async', passed: hasAsyncExplanation, feedback: feedback[8] || '' },
    { id: 'c10', title: 'Expected Console Output', passed: hasExpectedOutput, feedback: feedback[9] || '' },
  ];

  return {
    syntaxCorrect,
    hasScenarioArray,
    scenarioCountValid,
    hasRequiredFields,
    hasSummaryFunction,
    hasLoop,
    hasCondition,
    hasAsyncAwait,
    hasAsyncExplanation,
    hasExpectedOutput,
    score,
    feedback,
    passed: score >= 8,
    criteria,
  };
}
