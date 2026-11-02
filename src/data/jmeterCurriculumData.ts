/**
 * RootAccess — Apache JMeter: Performance Testing from Zero to Practical
 *
 * Course Title: Apache JMeter: Performance Testing from Zero to Practical
 * Brand: RootAccess
 * Tagline: Learn by Doing.
 * Duration: 10 Days
 * Level: Beginner to Intermediate
 * Reference: Apache JMeter 5.6.3 (Official User Manual: https://jmeter.apache.org/usermanual/)
 */

export interface JmeterDayTopic {
  title: string;
  summary: string;
  explanation: string;
  realWorldExample: string;
  jmeterElementMapping?: {
    elementName: string;
    category: 'Thread Group' | 'Sampler' | 'Listener' | 'Config' | 'Timer' | 'Assertion' | 'Post-Processor' | 'Pre-Processor';
    purpose: string;
    keySettings: string[];
    officialDocRef?: string;
  };
  commonMistakes: string[];
  keyTakeaways: string[];
}

export interface JmeterQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  wrongOptionExplanations?: Record<number, string>;
  hint?: string;
}

export interface JmeterInteractiveLabSpec {
  id: string;
  labType:
    | 'concurrency_simulator'
    | 'test_plan_builder'
    | 'http_request_studio'
    | 'assertion_validator'
    | 'csv_parameterizer'
    | 'json_extractor_correlator'
    | 'workload_designer'
    | 'metrics_dashboard'
    | 'command_line_builder'
    | 'capstone_project';
  title: string;
  subtitle: string;
  instructionSteps: string[];
  starterConfig: Record<string, any>;
  expectedSuccessCriteria: string[];
  hints: string[];
}

export interface JmeterIndependentChallenge {
  id: string;
  title: string;
  scenario: string;
  goal: string;
  brokenConfiguration?: Record<string, any>;
  solutionCriteria: string[];
  hints: string[];
  commonPitfalls: string[];
}

export interface JmeterCheckpointReview {
  id: string;
  title: string;
  coveredDays: string;
  scenarioDescription: string;
  practicalTasks: {
    taskNumber: number;
    description: string;
    actionRequired: string;
    validationCheck: string;
  }[];
  reviewQuestions: JmeterQuizQuestion[];
}

export interface JmeterDayData {
  dayNumber: number;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  beginnerFriendlyAnalogy?: {
    headline: string;
    concept: string;
    story: string;
    keyLesson: string;
    plainEnglishTerms?: { term: string; plainMeaning: string }[];
  };
  objectives: string[];
  introduction: string;
  visualExplanation: {
    title: string;
    diagramType: 'flow' | 'architecture' | 'timeline' | 'hierarchy' | 'curve';
    description: string;
    stepsOrStages: { name: string; detail: string; status?: string }[];
  };
  topics: JmeterDayTopic[];
  guidedDemonstration: {
    title: string;
    description: string;
    walkthroughSteps: {
      stepNumber: number;
      actionTitle: string;
      uiTarget: string;
      expectedBehavior: string;
      whyItMatters: string;
    }[];
  };
  practicalLab: JmeterInteractiveLabSpec;
  independentChallenge: JmeterIndependentChallenge;
  checkpointReview?: JmeterCheckpointReview;
  quiz: {
    passingScorePercent: number;
    questions: JmeterQuizQuestion[];
  };
  daySummary: string;
}

export const JMETER_COURSE_METADATA = {
  id: 'jmeter-performance-testing',
  slug: 'jmeter-performance-testing',
  title: 'Apache JMeter: Performance Testing from Zero to Practical',
  brand: 'RootAccess',
  tagline: 'Learn by Doing.',
  subtitle: 'Learn performance testing with Apache JMeter 5.6.3 through everyday real-life analogies, interactive browser labs, easy test plan builders, and real API testing.',
  description:
    'Learn performance testing with Apache JMeter in an easy, beginner-friendly way. No coding experience needed! Build test plans, simulate virtual users like customers in a coffee shop, configure HTTP requests, validate fast response times, parameterize test data with spreadsheets, and diagnose bottlenecks with confidence.',
  duration: '10 Days (15 Hours)',
  level: 'Beginner Friendly (Zero Coding Required)',
  regularPriceInr: 599,
  launchPriceInr: 299,
  learningOutcomes: [
    'Understand performance testing fundamentals and architectural trade-offs.',
    'Navigate Apache JMeter and master its test plan element hierarchy.',
    'Configure Thread Groups, samplers, timers, listeners, and assertions.',
    'Test HTTP endpoints and REST APIs with headers, parameters, and JSON payloads.',
    'Parameterize test requests using CSV Data Set Config to simulate realistic traffic.',
    'Extract and correlate dynamic response values using the JSON Extractor.',
    'Design load, stress, spike, and endurance test workload profiles.',
    'Analyze throughput, response time, latency percentiles (90th, 95th, 99th), and error rate.',
    'Execute tests in headless Non-GUI mode from the command line and generate HTML dashboards.',
    'Interpret test metrics and diagnose application and database bottlenecks without overstating evidence.',
    'Produce a professional performance testing project report and executive summary.',
  ],
};

export const JMETER_DAYS_DATA: JmeterDayData[] = [
  // -------------------------------------------------------------------------
  // DAY 1
  // -------------------------------------------------------------------------
  {
    dayNumber: 1,
    slug: 'day-1',
    title: 'Performance Testing Fundamentals & JMeter Setup',
    subtitle: 'Core concepts, test types, response curves, and JMeter component architecture',
    badge: 'Day 1 • Free Preview',
    duration: '45 mins',
    beginnerFriendlyAnalogy: {
      headline: 'The Coffee Shop Rush',
      concept: 'Why Websites Slow Down & What "Virtual Users" Really Mean',
      story: 'Imagine a cozy coffee shop with 1 barista behind the counter. When 1 customer walks in, they get their warm cappuccino in 60 seconds flat. If 5 customers walk in, each waits 2 to 3 minutes—still totally fine. But what happens on a rainy Monday morning when 150 people barge through the doors all at once? The barista physically cannot brew any faster. A huge line spills onto the sidewalk, wait times skyrocket to 45 minutes, and frustrated customers give up and walk away. That is exactly what happens to a web server when too many users visit simultaneously. In performance testing, we simulate those 150 customers (called "Threads" or "Virtual Users") in a safe environment to find out when the line gets too long before real customers ever experience it.',
      keyLesson: 'Performance testing isn\'t about checking if a button works. It\'s about checking how many customers your digital coffee shop can serve before the wait time becomes unacceptable.',
      plainEnglishTerms: [
        { term: 'Thread / Virtual User', plainMeaning: 'A simulated digital customer who visits your website and clicks around.' },
        { term: 'Response Time (Latency)', plainMeaning: 'The stopwatch time between when you click a button and when the page finishes loading.' },
        { term: 'Throughput', plainMeaning: 'The speedometer of your server: how many requests the server finishes per second.' },
        { term: 'Saturation Point (Knee)', plainMeaning: 'The moment the server reaches full capacity and begins making people wait in line.' },
      ],
    },
    objectives: [
      'Distinguish performance testing from functional QA testing.',
      'Define load, stress, spike, endurance/soak, and volume testing.',
      'Understand the mathematical relationship between Concurrency, Throughput, and Latency (Little’s Law).',
      'Learn the core element architecture of Apache JMeter 5.6.3.',
      'Understand why non-GUI execution is mandatory for real load generation.',
    ],
    introduction:
      'Performance testing evaluates how a software system behaves under varying workloads—focusing on speed, scalability, stability, and resource consumption rather than functional correctness alone. An application can pass every single functional test case with flying colors but still fail catastrophically in production when 1,000 concurrent users attempt to check out simultaneously.',
    visualExplanation: {
      title: 'Performance Degradation Under Load (The Saturation Curve)',
      diagramType: 'curve',
      description: 'As concurrent virtual users increase, throughput rises linearly until system resources (CPU, DB connection pool) saturate. Beyond this threshold, queueing begins and response time degrades exponentially.',
      stepsOrStages: [
        { name: 'Zone 1: Linear Scaling', detail: 'Throughput increases proportionally with concurrency; response times remain stable and low.' },
        { name: 'Zone 2: Saturation Point (Knee)', detail: 'System reaches maximum capacity. Throughput plateaus as server threads or DB connections are fully utilized.' },
        { name: 'Zone 3: Queueing & Contention', detail: 'Additional requests enter wait queues; response time degrades sharply; latency spikes.' },
        { name: 'Zone 4: Degradation & Errors', detail: 'Timeouts occur (HTTP 504), connection pool exhausts (HTTP 500), and error rate surges.' },
      ],
    },
    topics: [
      {
        title: 'Performance Testing vs. Functional Testing',
        summary: 'Functional testing verifies "what" the system does; performance testing verifies "how fast and reliably" it does it under load.',
        explanation:
          'Functional testing answers: "Does logging in with valid credentials grant access?" Performance testing answers: "When 500 users log in concurrently within 10 seconds, does the 95th percentile response time remain under 1.5 seconds without server errors?" Both disciplines are critical, but performance testing requires statistical sampling, workload modelling, and system resource monitoring.',
        realWorldExample: 'A ticketing portal works perfectly in staging when tested by 3 QA engineers, but crashes on launch day when 20,000 fans load the payment page simultaneously.',
        commonMistakes: [
          'Assuming a fast response for 1 user means the system will remain fast for 500 users.',
          'Relying on averages instead of percentiles (an average of 500ms can hide a 10-second delay for 5% of your highest-value users).',
        ],
        keyTakeaways: [
          'Performance testing measures speed, scalability, and stability under defined stress conditions.',
          'Always establish measurable Service Level Agreements (SLAs) or Service Level Objectives (SLOs) before testing.',
        ],
      },
      {
        title: 'Key Performance Testing Types',
        summary: 'Load, Stress, Spike, Endurance, and Volume tests serve distinct architectural objectives.',
        explanation:
          '1. Load Testing: Validates system behavior under expected normal and peak business usage.\n2. Stress Testing: Pushes load past the breaking point to determine capacity limits and graceful degradation.\n3. Spike Testing: Subjects the system to sudden, dramatic surges in traffic (e.g., flash sales, breaking news alerts) followed by immediate drop-off.\n4. Endurance (Soak) Testing: Runs a moderate load for an extended duration (hours or days) to detect memory leaks, unclosed database connections, or buffer accumulation.\n5. Volume Testing: Floods the database with massive data volumes to evaluate query indexing and disk I/O performance.',
        realWorldExample: 'Running an e-commerce platform at 100 users for 12 hours straight is an Endurance Test to uncover memory leaks; blasting 2,000 users in 5 seconds is a Spike Test.',
        commonMistakes: [
          'Running a stress test without knowing baseline performance metrics.',
          'Terminating soak tests after 15 minutes—memory leaks typically require hours of sustained garbage collection cycles to become apparent.',
        ],
        keyTakeaways: [
          'Different test types target distinct failure modes: capacity limits, memory leaks, or sudden concurrency spikes.',
        ],
      },
      {
        title: 'JMeter Architecture & Element Hierarchy',
        summary: 'Apache JMeter organizes tests into a tree hierarchy executed in a strictly scoped sequence.',
        explanation:
          'JMeter test plans (.jmx files) are XML-based trees with a root Test Plan containing:\n- Thread Groups: Represent virtual users, ramp-up schedules, and iteration counts.\n- Samplers: Execute the work (HTTP Request, JDBC Request, GraphQL, JMS).\n- Config Elements: Supply configurations or data (HTTP Header Manager, CSV Data Set Config).\n- Pre-Processors: Modify requests prior to execution.\n- Post-Processors: Extract data from responses (JSON Extractor, RegEx Extractor).\n- Assertions: Validate response codes, headers, bodies, or execution time.\n- Timers: Introduce delays between requests (think time).\n- Listeners: Collect, display, and export test results (View Results Tree, Aggregate Report).',
        realWorldExample: 'In an HTTP API test, an HTTP Header Manager scoped to the Thread Group automatically attaches "Content-Type: application/json" to all samplers underneath it.',
        jmeterElementMapping: {
          elementName: 'Test Plan Tree',
          category: 'Thread Group',
          purpose: 'Top-level container encapsulating execution flow, user simulation, and scoping.',
          keySettings: ['Functional Test Mode (disabled for load tests)', 'Run Thread Groups consecutively', 'User Defined Variables'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/test_plan.html',
        },
        commonMistakes: [
          'Placing Listeners like "View Results Tree" inside production load tests (they consume extreme client memory).',
          'Misunderstanding scoping—elements placed at the Test Plan level affect every Thread Group.',
        ],
        keyTakeaways: [
          'JMeter executes elements hierarchically: Config -> Pre-Processor -> Timer -> Sampler -> Post-Processor -> Assertion -> Listener.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Simulating Concurrency vs. Response Time',
      description: 'Observe how increasing virtual user concurrency affects latency, throughput, and error rates in a controlled educational simulator.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Inspect Baseline at Low Concurrency (5 Users)',
          uiTarget: 'Virtual Users Slider',
          expectedBehavior: 'Low response time (~120ms), 0% error rate, throughput matches request rate (~40 req/sec).',
          whyItMatters: 'Establishes the reference baseline when server resources are fully available.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Scale to Moderate Concurrency (50 Users)',
          uiTarget: 'Virtual Users Slider',
          expectedBehavior: 'Throughput increases to ~180 req/sec; average response time nudges to ~220ms. Server resources remain healthy.',
          whyItMatters: 'Demonstrates the linear scaling zone where capacity meets demand.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Push Concurrency Past Saturation (150 Users)',
          uiTarget: 'Virtual Users Slider',
          expectedBehavior: 'Throughput plateaus at ~210 req/sec; response time jumps to 1,850ms; connection timeout errors appear (4.2%).',
          whyItMatters: 'Demonstrates resource saturation and queue contention.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-1-concurrency',
      labType: 'concurrency_simulator',
      title: 'Lab 1: Virtual User Concurrency & Latency Explorer',
      subtitle: 'Simulate server traffic, identify the saturation threshold, and observe the latency elbow curve',
      instructionSteps: [
        'Select the target application endpoint (Product Catalog Service).',
        'Use the slider to test with 10, 50, 100, and 160 Virtual Users.',
        'Click "Run Simulation" at each concurrency level to observe throughput, response time, and error rate.',
        'Record the concurrency level where average response time exceeds 500ms SLA.',
      ],
      starterConfig: {
        endpoint: '/api/v1/catalog',
        virtualUsers: 10,
        rampUpSeconds: 5,
        testDurationSeconds: 15,
        serverCapacityLimit: 95,
      },
      expectedSuccessCriteria: [
        'Run simulation across at least 3 distinct concurrency tiers.',
        'Identify the saturation point where response times spike past 500ms.',
      ],
      hints: [
        'Notice that before 90 users, throughput rises smoothly with user count.',
        'Beyond 100 users, response time increases sharply because requests are waiting in the server socket queue.',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-1-scenario-matching',
      title: 'Challenge: Match Performance Test Types to Real Business Scenarios',
      scenario: 'You are hired as a performance testing consultant for a fast-growing fintech and retail portal. Management asks for testing ahead of three upcoming milestones.',
      goal: 'Match each business problem to the correct performance testing methodology and explain your reasoning.',
      solutionCriteria: [
        'Match "Friday evening payday transactions" to Load Testing.',
        'Match "Black Friday 12:00 AM doorbuster launch" to Spike Testing.',
        'Match "Finding max transactions before payment gateway drops packets" to Stress Testing.',
        'Match "48-hour continuous run to verify memory leak in order processing microservice" to Endurance Testing.',
      ],
      hints: [
        'Payday load is expected and regular -> Load test against defined SLA.',
        'Sudden jump within seconds -> Spike test.',
        'Extended duration over many hours -> Endurance / Soak test.',
      ],
      commonPitfalls: [
        'Confusing Stress testing (pushing to failure) with Load testing (verifying normal/peak SLA).',
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q1-1',
          question: 'What is the primary difference between functional testing and performance testing?',
          options: [
            'Functional testing checks correctness of output; performance testing measures speed, scalability, and stability under load.',
            'Functional testing is automated; performance testing is always executed manually.',
            'Functional testing is conducted only on frontend UIs; performance testing only targets databases.',
            'Performance testing guarantees there are zero functional bugs in the application.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Functional testing validates whether features meet functional requirements; performance testing measures responsiveness, throughput, and resource utilization under workload.',
        },
        {
          id: 'q1-2',
          question: 'A retail website operates normally for 2 hours, but after 8 hours of moderate traffic, response times gradually increase until the server runs out of heap memory. Which test type would have caught this?',
          options: [
            'Spike Testing',
            'Endurance (Soak) Testing',
            'Unit Testing',
            'Smoke Testing',
          ],
          correctAnswerIndex: 1,
          explanation: 'Endurance (Soak) testing runs sustained moderate load over extended periods (6–24 hours) to expose slow memory leaks, thread pool exhaustion, or unclosed database connections.',
        },
        {
          id: 'q1-3',
          question: 'Why are 90th and 95th percentiles preferred over the arithmetic mean (average) response time?',
          options: [
            'Percentiles are easier to compute than averages.',
            'Averages obscure latency outliers and mask poor performance experienced by a segment of users.',
            'Percentiles only include successful requests, whereas averages include errors.',
            'Industry standards require using percentiles exclusively for GUI testing.',
          ],
          correctAnswerIndex: 1,
          explanation: 'Arithmetic averages hide extreme latency outliers. If 95% of users receive 100ms responses but 5% wait 20 seconds, the average might still look deceptively low (~1.1s).',
        },
        {
          id: 'q1-4',
          question: 'In Apache JMeter, which element is the root container responsible for defining virtual users, ramp-up time, and iterations?',
          options: [
            'HTTP Header Manager',
            'Thread Group',
            'View Results Tree',
            'Uniform Random Timer',
          ],
          correctAnswerIndex: 1,
          explanation: 'The Thread Group is the core JMeter element where you configure the number of threads (virtual users), ramp-up period, and loop iterations.',
        },
        {
          id: 'q1-5',
          question: 'Why should listeners like "View Results Tree" be disabled or removed during real, heavy load testing?',
          options: [
            'View Results Tree prevents HTTP requests from reaching the server.',
            'Storing and rendering complete response data for thousands of requests in memory causes JMeter itself to run out of memory (OOM).',
            'View Results Tree is deprecated in JMeter 5.6.3.',
            'View Results Tree automatically aborts any test that encounters an HTTP 500 error.',
          ],
          correctAnswerIndex: 1,
          explanation: 'Listeners that record every request and response body consume massive amounts of client JVM heap memory, causing JMeter itself to crash or introduce false client-side latency.',
        },
        {
          id: 'q1-6',
          question: 'According to Little’s Law, what is the relationship between Concurrency (N), Throughput (X), and Response Time (R)?',
          options: [
            'Concurrency = Throughput × (Response Time + Think Time)',
            'Concurrency = Throughput / Response Time',
            'Response Time = Concurrency × Throughput',
            'Throughput is independent of Response Time and Concurrency.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Little’s Law states that N = X × R (Average Users = Throughput × Total Transaction Time, including think time). If response time increases and user count remains fixed, throughput must drop.',
        },
      ],
    },
    daySummary:
      'You have mastered performance testing core definitions, distinguished load from stress and endurance testing, explored the saturation curve, and learned the element hierarchy of Apache JMeter 5.6.3.',
  },

  // -------------------------------------------------------------------------
  // DAY 2
  // -------------------------------------------------------------------------
  {
    dayNumber: 2,
    slug: 'day-2',
    title: 'Create Your First JMeter Test Plan',
    subtitle: 'Thread Groups, ramp-up mathematics, HTTP samplers, and result scoping',
    badge: 'Day 2 • Practical Lab',
    duration: '50 mins',
    beginnerFriendlyAnalogy: {
      headline: 'The Restaurant Kitchen Order Slip',
      concept: 'How JMeter Organizes Tests in a Simple Family Tree',
      story: 'Think of JMeter like running a restaurant. The top-level "Test Plan" is the manager\'s kitchen handbook. Inside that handbook, you have a "Thread Group"—which is a table of 10 hungry guests who just walked in. The "Ramp-Up" is how gently they arrive: instead of all 10 falling through the doorway at the exact same millisecond, 1 guest walks in every 2 seconds. The "Sampler" is the waiter writing down their order ("Bring me the pasta!"). The "Timer" is the 5 minutes guests spend reading the menu before ordering. And the "Listener" is the cash register printing the bill showing how fast the kitchen cooked the meals.',
      keyLesson: 'JMeter is just a tree of instructions. The parent element controls who is visiting (Thread Group), and the children inside tell them what to click (Samplers).',
      plainEnglishTerms: [
        { term: 'Test Plan', plainMeaning: 'The master folder containing all the steps and settings for your test.' },
        { term: 'Thread Group', plainMeaning: 'The group of users you want to simulate (e.g., 20 users repeating 3 times).' },
        { term: 'Ramp-Up Period', plainMeaning: 'How many seconds JMeter takes to start all your users so they trickle in smoothly.' },
        { term: 'Loop Count', plainMeaning: 'How many times each user repeats their journey before leaving.' },
      ],
    },
    objectives: [
      'Create and configure a valid JMeter Test Plan from scratch.',
      'Configure Thread Group parameters: Number of Threads, Ramp-Up, and Loop Count.',
      'Calculate total iterations and understand why ramp-up is not equal to test duration.',
      'Add an HTTP Request sampler and understand basic server configuration.',
      'Attach listeners with proper scoping to view and debug sample execution.',
    ],
    introduction:
      'In Apache JMeter, every performance test begins with a Test Plan. A Test Plan acts as the blueprint describing what endpoints to call, how many virtual users to simulate, how fast they should arrive, and how their results should be captured.',
    visualExplanation: {
      title: 'JMeter Execution Tree Flow',
      diagramType: 'hierarchy',
      description: 'The hierarchical flow of elements inside a test plan dictates scope and order of execution.',
      stepsOrStages: [
        { name: '1. Test Plan Root', detail: 'Defines global variables and thread group execution mode.' },
        { name: '2. Thread Group', detail: 'Simulates virtual users. Launches threads according to ramp-up schedule.' },
        { name: '3. Config Elements', detail: 'Pre-configures headers, cookies, cache, or default server hostname.' },
        { name: '4. Sampler (HTTP Request)', detail: 'Executes the network request (GET/POST) and measures elapsed time.' },
        { name: '5. Assertion', detail: 'Validates status code, response headers, body, or duration threshold.' },
        { name: '6. Listener', detail: 'Captures metrics (status, latency, bytes) and displays or logs results.' },
      ],
    },
    topics: [
      {
        title: 'Thread Group Parameters: Threads, Ramp-Up, and Loops',
        summary: 'Understanding the mathematical interaction between threads, ramp-up time, and iterations.',
        explanation:
          'A standard Thread Group requires three primary parameters:\n1. Number of Threads (Users): The total number of concurrent virtual users to simulate.\n2. Ramp-Up Period (seconds): The total time taken to start all threads. If threads = 10 and ramp-up = 20s, JMeter starts 1 new thread every 2 seconds (20 / 10 = 2s).\n3. Loop Count: How many times each thread executes the test plan. If loop count = 2 and threads = 10, total requests generated = 10 × 2 = 20.\n\nCrucial: Ramp-up is the startup time for threads, NOT the total duration of the test! If loop count is 1, a thread terminates as soon as its request completes.',
        realWorldExample: 'If you want to test 50 users arriving smoothly over 5 minutes, configure 50 threads with a 300-second ramp-up.',
        jmeterElementMapping: {
          elementName: 'Thread Group',
          category: 'Thread Group',
          purpose: 'Controls the virtual user threads that execute samplers.',
          keySettings: ['Number of Threads (users)', 'Ramp-Up Period (in seconds)', 'Loop Count (or Infinite)', 'Same user on each iteration'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#Thread_Group',
        },
        commonMistakes: [
          'Setting ramp-up to 0 for 500 threads, hitting the server with a sudden hammer strike that crashes the test before it begins.',
          'Assuming a 60-second ramp-up means the test will run for 60 seconds (threads with 1 loop may finish in 5 seconds).',
        ],
        keyTakeaways: [
          'Ramp-up interval between thread starts = Ramp-up seconds / Number of threads.',
          'Total requests = Number of Threads × Loop Count × Number of Samplers in loop.',
        ],
      },
      {
        title: 'Configuring the HTTP Request Sampler',
        summary: 'Directing virtual users to specific web servers and endpoints.',
        explanation:
          'The HTTP Request sampler tells JMeter how to construct the HTTP message:\n- Protocol: http or https (defaults to http if blank).\n- Server Name or IP: e.g., api.rootaccess.co.in (do NOT include http:// or slashes here!).\n- Port Number: 80 for HTTP, 443 for HTTPS (or custom ports like 8080).\n- HTTP Method: GET, POST, PUT, DELETE.\n- Path: The resource path, e.g., /api/v1/health or /products?id=101.\n- Content Encoding: Typically utf-8.',
        realWorldExample: 'Testing an API endpoint GET https://api.rootaccess.co.in/v1/users requires Server Name = api.rootaccess.co.in, Protocol = https, Method = GET, Path = /v1/users.',
        jmeterElementMapping: {
          elementName: 'HTTP Request',
          category: 'Sampler',
          purpose: 'Sends an HTTP/HTTPS request to a web server.',
          keySettings: ['Protocol [http/https]', 'Server Name or IP', 'Port Number', 'HTTP Method', 'Path', 'Redirect Automatically vs Follow Redirects'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#HTTP_Request',
        },
        commonMistakes: [
          'Typing "https://api.example.com" inside the Server Name field instead of putting "https" in Protocol and "api.example.com" in Server Name.',
          'Omitting the leading slash in Path (e.g. typing "api/users" instead of "/api/users").',
        ],
        keyTakeaways: [
          'Keep Server Name clean of protocol prefixes and trailing slashes.',
        ],
      },
      {
        title: 'Listeners and Scoping Rules',
        summary: 'Capturing metrics and placing listeners appropriately in the test plan hierarchy.',
        explanation:
          'Listeners record data from samplers that fall within their scope:\n- A listener placed as a child of a specific HTTP Request records only that sampler.\n- A listener placed at the Thread Group level records all samplers within that thread group.\n- A listener placed at the root Test Plan level records all samplers across all thread groups.\n\nTwo essential debugging listeners:\n1. View Results Tree: Displays detailed request and response data (headers, body, cookies) for each sample. (Debugging only!)\n2. Summary Report: Provides aggregate numbers (sample count, average, min, max, error rate, throughput) in an easy tabular format.',
        realWorldExample: 'During test design, use View Results Tree to confirm your request body and response are valid. Before running a load test, disable it.',
        commonMistakes: [
          'Leaving View Results Tree active during tests with >50 users.',
        ],
        keyTakeaways: [
          'Listeners inherit the scope of their parent container.',
          'Always use aggregate listeners or non-GUI logs for real benchmarks.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Building a 3-Step Test Plan in the Visual Builder',
      description: 'Assemble a Test Plan with 1 Thread Group, 1 HTTP Sampler, and 1 Listener.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Add Thread Group',
          uiTarget: 'Test Plan Tree -> Add Thread Group',
          expectedBehavior: 'Thread Group node appears under Test Plan.',
          whyItMatters: 'Every sampler requires a Thread Group to define the virtual user lifecycle.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Set Concurrency Parameters',
          uiTarget: 'Thread Group Form',
          expectedBehavior: 'Set Threads: 10, Ramp-up: 20, Loops: 2.',
          whyItMatters: 'Configures 10 users ramping up every 2 seconds for 2 iterations.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Add HTTP Request Sampler',
          uiTarget: 'Thread Group -> Add Sampler -> HTTP Request',
          expectedBehavior: 'HTTP Request configured for GET /api/v1/health on mock host.',
          whyItMatters: 'Defines the action each virtual user will execute.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-2-test-plan-builder',
      labType: 'test_plan_builder',
      title: 'Lab 2: Interactive JMeter Test Plan Assembler',
      subtitle: 'Construct a complete JMeter Test Plan tree with proper thread properties and sampler scoping',
      instructionSteps: [
        'Add a Thread Group to the Test Plan.',
        'Configure the Thread Group with exactly 10 virtual users, a 20-second ramp-up, and 2 loop iterations.',
        'Add an HTTP Request Sampler targeting method GET and path /api/v1/health.',
        'Add a View Results Tree listener under the Thread Group.',
        'Click "Validate & Run Plan" to inspect the generated test plan structure and simulated thread startup timeline.',
      ],
      starterConfig: {
        testPlanName: 'RootAccess_Basic_TestPlan',
        threads: 0,
        rampUpSeconds: 0,
        loopCount: 0,
        samplerConfigured: false,
        listenerAdded: false,
      },
      expectedSuccessCriteria: [
        'Thread count set to 10.',
        'Ramp-up set to 20 seconds.',
        'Loop count set to 2.',
        'HTTP Request sampler added with valid path.',
        'Results listener attached.',
      ],
      hints: [
        'Click "+ Add Element" to add Thread Group and HTTP Sampler to the tree.',
        'Check the calculated thread interval: 20 seconds / 10 threads = 1 thread started every 2.0s.',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-2-math-and-scoping',
      title: 'Challenge: Fix the Broken Thread Ramp-Up & Scoping Configuration',
      scenario: 'A junior QA engineer built a test plan with 50 threads, ramp-up = 0s, loop count = 10, and placed a View Results Tree inside a loop. The staging server crashed instantly with 503 errors and JMeter ran out of memory.',
      goal: 'Reconfigure the plan to safely ramp up 50 threads over 100 seconds with 5 iterations, and correct the listener placement.',
      brokenConfiguration: {
        threads: 50,
        rampUpSeconds: 0,
        loopCount: 10,
        hasUncontrolledListener: true,
      },
      solutionCriteria: [
        'Update ramp-up from 0s to 100s (threads will start every 2 seconds).',
        'Set loop count to 5.',
        'Explain why ramp-up = 0s acts as a denial of service attack on staging.',
      ],
      hints: [
        'Ramp-up of 0 causes all 50 threads to fire in the same millisecond.',
        'A 100-second ramp-up allows connection pools and CPU threads to initialize smoothly.',
      ],
      commonPitfalls: [
        'Thinking ramp-up means total test time—threads continue running their loops after ramp-up finishes.',
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q2-1',
          question: 'In a Thread Group configured with 20 Threads, a 40-second Ramp-Up, and Loop Count = 3, how frequently does JMeter launch a new thread?',
          options: [
            '1 new thread every 2 seconds',
            '1 new thread every 20 seconds',
            'All 20 threads launch at 0 seconds',
            '1 new thread every 6 seconds',
          ],
          correctAnswerIndex: 0,
          explanation: 'Thread start rate = Ramp-up / Threads = 40 seconds / 20 threads = 2 seconds per thread.',
        },
        {
          id: 'q2-2',
          question: 'In the same configuration (20 Threads, 40s Ramp-Up, Loop Count = 3, 1 HTTP Sampler), what is the total number of requests executed?',
          options: [
            '20 requests',
            '60 requests',
            '120 requests',
            '40 requests',
          ],
          correctAnswerIndex: 1,
          explanation: 'Total requests = Threads (20) × Loop Count (3) × Samplers (1) = 60 requests.',
        },
        {
          id: 'q2-3',
          question: 'Which of the following values is INVALID inside the "Server Name or IP" field of an HTTP Request sampler?',
          options: [
            'api.rootaccess.co.in',
            '192.168.1.100',
            'https://api.rootaccess.co.in/',
            'staging-auth.internal',
          ],
          correctAnswerIndex: 2,
          explanation: 'The Server Name field must NOT contain the protocol prefix ("https://") or trailing slashes ("/"). The protocol belongs in the "Protocol [http/https]" field, and slashes belong in "Path".',
        },
        {
          id: 'q2-4',
          question: 'Does the Ramp-Up Period represent the total duration of the performance test?',
          options: [
            'Yes, JMeter forcibly terminates all threads as soon as ramp-up seconds elapse.',
            'No, ramp-up only specifies the time window over which threads start. The test continues until all threads finish their loop iterations or reach their duration limit.',
            'Yes, unless an Assertion fails.',
            'Only when loop count is set to Infinite.',
          ],
          correctAnswerIndex: 1,
          explanation: 'Ramp-up only controls when threads are initiated. The test continues until all threads complete their configured loop counts (or until a scheduler duration stops them).',
        },
        {
          id: 'q2-5',
          question: 'If an HTTP Header Manager is placed directly under the Test Plan (at the root level), which samplers receive its headers?',
          options: [
            'Only the first HTTP Request sampler in the first Thread Group.',
            'All HTTP Request samplers across all Thread Groups in the test plan.',
            'None; Header Managers must always be child elements of a specific Sampler.',
            'Only samplers that explicitly reference the header name.',
          ],
          correctAnswerIndex: 1,
          explanation: 'In JMeter scoping rules, configuration elements placed at the root Test Plan level apply globally to all matching samplers in all Thread Groups.',
        },
        {
          id: 'q2-6',
          question: 'What is the purpose of the "Same user on each iteration" checkbox in a JMeter Thread Group?',
          options: [
            'It forces all virtual users to share a single browser thread.',
            'When checked, it retains HTTP cookies and session state across subsequent loops for that thread; when unchecked, it clears cookies and SSL state on each loop to simulate a new visitor.',
            'It prevents multiple threads from calling the same API endpoint.',
            'It disables cache management entirely.',
          ],
          correctAnswerIndex: 1,
          explanation: 'When checked, each thread maintains its existing cookies and SSL context across loops. When unchecked, each loop starts with cleared state, simulating a brand-new user.',
        },
      ],
    },
    daySummary:
      'You have learned how to create a JMeter test plan, configure thread groups and ramp-up timing with mathematical precision, set up HTTP Request samplers, and scope listeners correctly.',
  },

  // -------------------------------------------------------------------------
  // DAY 3
  // -------------------------------------------------------------------------
  {
    dayNumber: 3,
    slug: 'day-3',
    title: 'HTTP Requests & REST API Testing',
    subtitle: 'Methods, headers, query parameters, JSON payloads, and response inspection',
    badge: 'Day 3 • Checkpoint 1',
    duration: '55 mins',
    beginnerFriendlyAnalogy: {
      headline: 'Sending a Letter in the Post',
      concept: 'HTTP Requests, Headers & Payloads Made Simple',
      story: 'When you mail a parcel to a friend, you write the street address on the outside (the URL path like /api/v1/products). You choose the delivery type (the HTTP Method: GET means "send me information", POST means "here is a new package to store"). On the outside of the box, you stick a customs label that says "Contains Books" (the HTTP Header: Content-Type: application/json). Inside the box, you pack the actual gift (the JSON Body Payload). When the post office delivers it, the recipient sends you back a signed delivery card (the Status Code: 200 OK means received safely, 404 means wrong address, 500 means the sorting machine broke).',
      keyLesson: 'Every click on any website or mobile app is just your device sending one of these digital parcels across the internet.',
      plainEnglishTerms: [
        { term: 'GET Method', plainMeaning: 'Asking the server to read and return information (like viewing a catalog).' },
        { term: 'POST Method', plainMeaning: 'Sending new data to the server (like submitting a login form or placing an order).' },
        { term: 'HTTP Header', plainMeaning: 'Postage stickers that tell the server what format your data is in and who you are.' },
        { term: 'HTTP 200 OK', plainMeaning: 'Success! The server understood and finished your request without issues.' },
      ],
    },
    objectives: [
      'Master the five core HTTP methods: GET, POST, PUT, PATCH, and DELETE in JMeter.',
      'Configure query parameters, path variables, and URL encoding.',
      'Attach and configure the HTTP Header Manager for JSON APIs.',
      'Construct and format valid JSON request bodies in HTTP Request samplers.',
      'Inspect status codes, response headers, latency, and body payloads.',
      'Complete Cumulative Practical Checkpoint 1 (Days 1–3).',
    ],
    introduction:
      'Modern web applications rely heavily on RESTful APIs communicating via JSON payloads. Performance testing APIs requires constructing precise HTTP messages with appropriate headers, query parameters, and payload bodies, and validating the returned status codes and response structures.',
    visualExplanation: {
      title: 'REST API Request-Response Cycle in JMeter',
      diagramType: 'flow',
      description: 'Mapping JMeter GUI elements to the raw HTTP/1.1 message transmitted over the wire.',
      stepsOrStages: [
        { name: '1. Request Line', detail: 'Method (POST) + Path (/api/v1/products) + Protocol (HTTP/1.1)' },
        { name: '2. HTTP Header Manager', detail: 'Content-Type: application/json, Accept: application/json, Authorization' },
        { name: '3. Body Data Tab', detail: 'Raw JSON payload: {"name": "Test Item", "price": 499, "stock": 50}' },
        { name: '4. Server Processing', detail: 'Simulated API controller processes request and returns status code + body.' },
        { name: '5. Response Inspection', detail: 'HTTP Status 201 Created, Response Headers, Latency: 48ms, Body: {"id": "prod_101"}' },
      ],
    },
    topics: [
      {
        title: 'HTTP Methods and API Endpoints in JMeter',
        summary: 'Selecting appropriate verbs and parameter mechanisms.',
        explanation:
          '- GET: Used to retrieve resources. Parameters are passed in the URL query string (e.g. /products?category=electronics&limit=10) or in the Parameters table.\n- POST: Used to create resources. Data is passed in the "Body Data" tab (for JSON/XML) or the Parameters table (for form-encoded data).\n- PUT: Used to replace an entire resource.\n- PATCH: Used to apply partial modifications to a resource.\n- DELETE: Used to remove a resource.\n\nIn JMeter, when sending JSON payloads, always switch to the "Body Data" tab inside the HTTP Request sampler. The "Parameters" tab is reserved for query parameters or `application/x-www-form-urlencoded` form data.',
        realWorldExample: 'Testing an order placement API requires POST /api/v1/checkout with a raw JSON payload describing cart items.',
        jmeterElementMapping: {
          elementName: 'HTTP Request (Body Data)',
          category: 'Sampler',
          purpose: 'Transmits raw JSON or XML request payloads.',
          keySettings: ['Method: POST', 'Path: /api/v1/orders', 'Body Data text area'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#HTTP_Request',
        },
        commonMistakes: [
          'Putting JSON into the Parameters table instead of the Body Data tab.',
          'Leaving URL query parameters encoded directly inside the Server Name field.',
        ],
        keyTakeaways: [
          'Use the Parameters tab for GET query strings; use Body Data for JSON payloads.',
        ],
      },
      {
        title: 'The HTTP Header Manager: Why Content-Type is Mandatory',
        summary: 'Supplying necessary metadata for modern REST APIs.',
        explanation:
          'When an API server receives a POST or PUT request, it relies on the `Content-Type` header to determine how to parse the request body. If JMeter sends a JSON payload without `Content-Type: application/json`, the server typically rejects it with:\n- HTTP 415 Unsupported Media Type\n- HTTP 400 Bad Request\n- Or silently treats the body as empty text.\n\nThe HTTP Header Manager element allows you to define headers once and automatically attach them to all child or sibling requests in scope.',
        realWorldExample: 'Adding `Content-Type: application/json` and `Accept: application/json` inside an HTTP Header Manager ensures all API calls communicate in valid JSON format.',
        jmeterElementMapping: {
          elementName: 'HTTP Header Manager',
          category: 'Config',
          purpose: 'Manages HTTP headers attached to requests.',
          keySettings: ['Name: Content-Type, Value: application/json', 'Name: Accept, Value: application/json'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#HTTP_Header_Manager',
        },
        commonMistakes: [
          'Forgetting the Header Manager, causing the server to respond with 415 or 400 errors.',
          'Misspelling "Content-Type" (e.g. "ContentType" or "content_type").',
        ],
        keyTakeaways: [
          'Always attach an HTTP Header Manager with `Content-Type: application/json` when testing REST APIs.',
        ],
      },
      {
        title: 'Interpreting HTTP Status Codes in Performance Tests',
        summary: 'Understanding standard status families and their performance implications.',
        explanation:
          '- 2xx (Success): 200 OK, 201 Created, 204 No Content. Expected behavior under normal load.\n- 3xx (Redirection): 301 Moved Permanently, 304 Not Modified. If redirections are not handled, JMeter might measure the redirect time rather than the final response.\n- 4xx (Client Errors): 400 Bad Request (malformed JSON), 401 Unauthorized (missing/bad token), 403 Forbidden, 404 Not Found, 429 Too Many Requests (Rate limit reached!).\n- 5xx (Server Errors): 500 Internal Server Error (unhandled exception / DB crash), 502 Bad Gateway (upstream crashed), 503 Service Unavailable (overloaded queue), 504 Gateway Timeout (request took too long to process).',
        realWorldExample: 'During a stress test, seeing HTTP 429 indicates rate-limiting is functioning; seeing HTTP 504 indicates upstream services or database queries are timing out.',
        commonMistakes: [
          'Treating 429 Too Many Requests as an application crash instead of a configured API gateway rate limiter.',
        ],
        keyTakeaways: [
          '5xx errors under load indicate server-side failure; 429 indicates throttling.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Building and Executing a POST API Request',
      description: 'Configure an HTTP POST request with headers and a JSON body against our simulated API service.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Configure Sampler Method & Path',
          uiTarget: 'Method dropdown -> POST, Path -> /api/v1/products',
          expectedBehavior: 'Sampler updates to POST request.',
          whyItMatters: 'Directs the sampler to the resource creation endpoint.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Attach Content-Type Header',
          uiTarget: 'Header Manager -> Add Content-Type: application/json',
          expectedBehavior: 'Header added to request preview.',
          whyItMatters: 'Informs the server that the payload is JSON.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Input JSON Payload Body',
          uiTarget: 'Body Data textarea',
          expectedBehavior: '{"name": "Performance Pro Mouse", "sku": "PPM-101", "price": 49.99}',
          whyItMatters: 'Provides the entity data required by the POST endpoint.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-3-http-api-studio',
      labType: 'http_request_studio',
      title: 'Lab 3: REST API Request & Inspection Studio',
      subtitle: 'Construct GET, POST, and PUT API requests and inspect real-time simulated server responses',
      instructionSteps: [
        'Select HTTP Method POST.',
        'Enter Path /api/v1/products.',
        'Add the header "Content-Type: application/json" in the Header Manager table.',
        'In the Body Data tab, write a valid JSON object with fields "name", "price", and "category".',
        'Click "Send Request" to inspect the simulated HTTP response status, response headers, and latency.',
      ],
      starterConfig: {
        method: 'GET',
        path: '/api/v1/products',
        headers: {},
        body: '',
      },
      expectedSuccessCriteria: [
        'Method set to POST.',
        'Header Content-Type set to application/json.',
        'Valid JSON body provided.',
        'Simulated server returns HTTP 201 Created with generated product ID.',
      ],
      hints: [
        'If you receive HTTP 415, check that Content-Type is exactly "application/json".',
        'Ensure your JSON has valid double quotes around property names: {"name": "Item"}',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-3-diagnose-api-failure',
      title: 'Challenge: Diagnose & Fix a Malformed API Request',
      scenario: 'A test sampler intended to create a user account is failing on the server with HTTP 400 Bad Request. The server log complains: "Unexpected token \' in JSON at position 12".',
      goal: 'Identify the formatting error in the payload body, correct it to valid JSON, and achieve an HTTP 201 Created response.',
      brokenConfiguration: {
        method: 'POST',
        path: '/api/v1/users',
        headers: { 'Content-Type': 'application/json' },
        body: "{ 'username': 'tester_101', 'email': 'test@example.com' }",
      },
      solutionCriteria: [
        'Replace single quotes with valid JSON double quotes: {"username": "tester_101", "email": "test@example.com"}.',
        'Verify response returns HTTP 201 Created.',
      ],
      hints: [
        'Standard JSON strictly requires double quotes (") for both keys and string values.',
      ],
      commonPitfalls: [
        'Using JavaScript object literal syntax with single quotes instead of RFC 8259 JSON syntax.',
      ],
    },
    checkpointReview: {
      id: 'checkpoint-1',
      title: 'Cumulative Practical Checkpoint 1 (Days 1–3)',
      coveredDays: 'Days 1, 2, and 3',
      scenarioDescription: 'Consolidate your knowledge of performance testing fundamentals, test plan assembly, ramp-up schedules, and API request configuration.',
      practicalTasks: [
        {
          taskNumber: 1,
          description: 'Calculate Thread Ramp-up: For 25 virtual users and 50s ramp-up, how many seconds between each thread?',
          actionRequired: 'Calculate 50 / 25 = 2.0s per thread.',
          validationCheck: 'User arrives at 2.0s intervals.',
        },
        {
          taskNumber: 2,
          description: 'Identify Scoping: If a Header Manager is placed inside Thread Group A, does Thread Group B receive its headers?',
          actionRequired: 'No, elements scoped inside a Thread Group only apply to child elements of that Thread Group.',
          validationCheck: 'Understands Thread Group scoping boundaries.',
        },
        {
          taskNumber: 3,
          description: 'Fix API Error: What header is missing if the server returns HTTP 415 Unsupported Media Type for a JSON POST?',
          actionRequired: 'Add "Content-Type: application/json".',
          validationCheck: 'Applies Content-Type header in Header Manager.',
        },
      ],
      reviewQuestions: [
        {
          id: 'cp1-q1',
          question: 'If 30 threads run with loop count = 4 against a plan with 2 HTTP samplers, how many total HTTP requests are sent to the server?',
          options: ['240 requests', '120 requests', '60 requests', '24 requests'],
          correctAnswerIndex: 0,
          explanation: '30 threads × 4 loops × 2 samplers = 240 total requests.',
        },
        {
          id: 'cp1-q2',
          question: 'Why does an HTTP 504 Gateway Timeout indicate a server-side performance bottleneck rather than a test script bug?',
          options: [
            '504 means the reverse proxy or load balancer waited for an upstream response from the app/database server, but timed out because the upstream was overwhelmed.',
            '504 indicates that the client computer running JMeter has insufficient RAM.',
            '504 is returned when the user types an invalid password.',
            '504 means the URL does not exist.',
          ],
          correctAnswerIndex: 0,
          explanation: 'HTTP 504 Gateway Timeout means an intermediary proxy/gateway timed out waiting for the backend application or database to complete processing.',
        },
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q3-1',
          question: 'Where should a JSON payload be placed inside a JMeter HTTP Request sampler?',
          options: [
            'In the "Body Data" tab',
            'In the "Parameters" tab',
            'In the "Path" field',
            'In the "Server Name or IP" field',
          ],
          correctAnswerIndex: 0,
          explanation: 'JSON and XML payloads must be placed in the "Body Data" tab. The "Parameters" tab is intended for URL query string parameters or form data.',
        },
        {
          id: 'q3-2',
          question: 'If a server returns "HTTP 415 Unsupported Media Type" on a POST request, what is the most likely cause?',
          options: [
            'The server is down.',
            'The request is missing the "Content-Type: application/json" header in the HTTP Header Manager.',
            'The virtual user ramp-up was too fast.',
            'The port number was set to 443 instead of 80.',
          ],
          correctAnswerIndex: 1,
          explanation: 'HTTP 415 occurs when the client sends a payload without specifying its format, or specifies a format the server cannot parse.',
        },
        {
          id: 'q3-3',
          question: 'What happens if you include query parameters in the "Path" field (e.g. `/api/v1/search?category=books&page=1`) instead of the Parameters table?',
          options: [
            'JMeter throws an error and refuses to execute.',
            'JMeter will still execute the request correctly, but managing dynamic variables in the Parameters table is much cleaner and less error-prone.',
            'The query parameters are stripped automatically.',
            'JMeter converts the request to a POST.',
          ],
          correctAnswerIndex: 1,
          explanation: 'JMeter can transmit inline query strings in the Path field, but using the Parameters table offers clearer visibility, automated URL-encoding, and simpler variable parameterization.',
        },
        {
          id: 'q3-4',
          question: 'Which HTTP status code signifies that a client has sent too many requests in a given amount of time (rate limited)?',
          options: [
            '401 Unauthorized',
            '404 Not Found',
            '429 Too Many Requests',
            '502 Bad Gateway',
          ],
          correctAnswerIndex: 2,
          explanation: 'HTTP 429 Too Many Requests is the standard response from API gateways or servers indicating rate limiting or throttling has been triggered.',
        },
        {
          id: 'q3-5',
          question: 'What is the function of the "Follow Redirects" option in an HTTP Request sampler?',
          options: [
            'JMeter automatically follows HTTP 3xx redirect responses and reports the final destination sample result.',
            'JMeter ignores all redirections and records an error.',
            'JMeter redirects the virtual user to Google.',
            'JMeter converts all GET requests into POST requests.',
          ],
          correctAnswerIndex: 0,
          explanation: '"Follow Redirects" automatically issues subsequent requests when a 301/302/307 redirect status is returned, treating the chain as a single overall sample result.',
        },
        {
          id: 'q3-6',
          question: 'If you want all HTTP samplers in a Thread Group to default to HTTPS and connect to "api.rootaccess.co.in", which element avoids typing this in every sampler?',
          options: [
            'HTTP Request Defaults',
            'HTTP Cookie Manager',
            'User Defined Variables',
            'View Results Tree',
          ],
          correctAnswerIndex: 0,
          explanation: 'The "HTTP Request Defaults" config element sets default protocol, server name, and port for all HTTP samplers within its scope.',
        },
      ],
    },
    daySummary:
      'You have mastered REST API request construction in JMeter, attached HTTP Header Managers, inspected response status codes, and completed Practical Checkpoint 1.',
  },

  // -------------------------------------------------------------------------
  // DAY 4
  // -------------------------------------------------------------------------
  {
    dayNumber: 4,
    slug: 'day-4',
    title: 'Assertions, Timers & Validation',
    subtitle: 'Response assertions, duration thresholds, realistic think time, and data validation',
    badge: 'Day 4 • Practical Lab',
    duration: '50 mins',
    beginnerFriendlyAnalogy: {
      headline: 'The Drive-Thru Quality Inspector',
      concept: 'Assertions & Timers: Checking Quality, Speed & Human Pauses',
      story: 'When you pull up to a fast-food drive-thru window, you don\'t just blindly accept whatever paper bag the cashier hands you and drive away. You check 3 things: 1) Did the cashier say "Here is your order"? (Status Code check), 2) When you open the bag, is your hot burger actually inside, or is it an empty wrapper? (Response Body Text Assertion), and 3) Did they serve you in 2 minutes, or did you wait 40 minutes in line? (Duration Assertion). And what about Timers? Real humans take 10 seconds to read the menu and count their coins before placing an order (Think Time); they don\'t machine-gun 500 orders every microsecond!',
      keyLesson: 'An Assertion is your automatic quality inspector. It makes sure the server didn\'t just reply, but replied with the right data within an acceptable number of seconds.',
      plainEnglishTerms: [
        { term: 'Assertion', plainMeaning: 'A pass/fail test condition (e.g. "Response time must be under 500ms").' },
        { term: 'Duration Assertion', plainMeaning: 'A stopwatch check: if the server took longer than allowed, fail the test.' },
        { term: 'Think Time (Timer)', plainMeaning: 'Adding realistic pauses between clicks so your virtual users behave like humans, not robots.' },
        { term: 'False Positive', plainMeaning: 'A test that says "Pass" (because it got 200 OK) even though the page showed "System Down".' },
      ],
    },
    objectives: [
      'Understand why HTTP 200 OK does not guarantee application correctness under load.',
      'Configure Response Assertions to validate status codes, response headers, and body text.',
      'Configure Duration Assertions to enforce response time thresholds (SLAs).',
      'Learn how Constant and Uniform Random Timers simulate realistic human think time.',
      'Differentiate between client-side think time and server processing duration.',
    ],
    introduction:
      'In load testing, simply receiving an HTTP 200 status code is not enough. Under heavy load, applications frequently return an HTTP 200 page containing an error message like "Database connection failed" or an empty JSON list. Assertions ensure the response content is genuinely correct and meets performance duration thresholds.',
    visualExplanation: {
      title: 'Sampler Validation Pipeline with Assertions',
      diagramType: 'flow',
      description: 'How JMeter validates a sample result before recording it as a pass or fail.',
      stepsOrStages: [
        { name: '1. Execute Sampler', detail: 'Sends HTTP request, measures elapsed response time (e.g. 310ms).' },
        { name: '2. Duration Assertion Check', detail: 'Is elapsed time <= 400ms threshold? YES -> Continue. NO -> Mark FAIL.' },
        { name: '3. Response Code Assertion', detail: 'Does response code equal 200? YES -> Continue. NO -> Mark FAIL.' },
        { name: '4. Response Body Assertion', detail: 'Does body contain \'"status":"SUCCESS"\'? YES -> Mark PASS. NO -> Mark FAIL.' },
        { name: '5. Timer (Think Time)', detail: 'Pauses thread for 1,500ms before starting next sampler iteration.' },
      ],
    },
    topics: [
      {
        title: 'Response Assertions: Verifying Content Under Load',
        summary: 'Verifying that response bodies, codes, and headers contain expected data.',
        explanation:
          'The Response Assertion is JMeter’s primary validation element:\n- Field to Test: Response Code, Response Message, Response Headers, Text Response (body), URL Sampled.\n- Pattern Matching Rules:\n  - Contains: Checks if the pattern appears anywhere in the target string.\n  - Matches: Checks if the entire target string matches a regular expression.\n  - Equals: Strict exact string equality.\n  - Substring: Fast, plain-text substring search (case-sensitive unless checked).\n\nIf any assertion fails, JMeter immediately flags the sample as failed in listeners and calculates error percentages accordingly.',
        realWorldExample: 'A search API returns HTTP 200 with an empty body `{ "items": [] }` when the search index times out. A Response Assertion checking that `"total":` is greater than 0 catches this silent failure.',
        jmeterElementMapping: {
          elementName: 'Response Assertion',
          category: 'Assertion',
          purpose: 'Validates that response code, headers, or body text match expected patterns.',
          keySettings: ['Field to Test: Text Response', 'Pattern Matching Rules: Substring', 'Patterns to Test: "status":"CONFIRMED"'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#Response_Assertion',
        },
        commonMistakes: [
          'Selecting "Matches" instead of "Contains" or "Substring" without providing a full regular expression matching the entire text.',
          'Asserting overly dynamic text (like current timestamps) that changes on every request.',
        ],
        keyTakeaways: [
          'Always validate critical business data in the response body, not just the HTTP status code.',
        ],
      },
      {
        title: 'Duration Assertions: Enforcing Response Time SLAs',
        summary: 'Flagging requests that breach maximum acceptable response time thresholds.',
        explanation:
          'A Duration Assertion fails any sample whose elapsed response time exceeds a specified number of milliseconds.\nFor example, if your Service Level Agreement specifies that product search must respond in under 500ms, setting a Duration Assertion of 500ms will automatically mark any search taking 501ms or longer as a failure.\n\nImportant nuance: A Duration Assertion marks the request as an error in test reports. Distinguish between hard SLA failures (where slow responses are unacceptable) and exploratory stress tests where high latency is an expected observation rather than a binary script failure.',
        realWorldExample: 'An SLA requires payment processing to complete within 3,000ms. A Duration Assertion set to 3000ms flags any transaction that breaches this agreement.',
        jmeterElementMapping: {
          elementName: 'Duration Assertion',
          category: 'Assertion',
          purpose: 'Validates that the response time does not exceed a maximum millisecond threshold.',
          keySettings: ['Duration in milliseconds: 500'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#Duration_Assertion',
        },
        commonMistakes: [
          'Setting the duration threshold so low that normal network latency causes 100% false failures.',
        ],
        keyTakeaways: [
          'Duration assertions automatically fail requests that exceed contractual SLA limits.',
        ],
      },
      {
        title: 'Timers: Simulating Realistic Think Time',
        summary: 'Pacing virtual users to reflect human behavior and avoid artificial denial-of-service traffic.',
        explanation:
          'Real humans do not click a button, receive a page in 100ms, and instantly click the next button 0.001 seconds later. They read text, move their mouse, and think for 2–5 seconds. This pause is called "Think Time".\n\nWithout timers, 50 virtual users executing in a tight loop can generate as much traffic as 2,500 real users, creating an unrealistic, unnatural request spike.\n\nKey JMeter Timers:\n1. Constant Timer: Pauses for an exact fixed duration (e.g. 2,000ms).\n2. Uniform Random Timer: Pauses for a random duration between (Constant Delay) and (Constant Delay + Random Delay Offset).\n   Example: Constant Delay = 1000ms, Random Delay Offset = 2000ms -> delay varies randomly between 1.0s and 3.0s.\n3. Gaussian Random Timer: Uses a normal bell-curve distribution centered around an average think time.\n\nCrucial Rule: Timers in JMeter execute BEFORE each sampler in scope!',
        realWorldExample: 'A shopper views a product page, pauses for 3 seconds to review specifications, and then adds it to the cart. A Uniform Random Timer models this realistic interval.',
        jmeterElementMapping: {
          elementName: 'Uniform Random Timer',
          category: 'Timer',
          purpose: 'Introduces variable human-like delays before sampler execution.',
          keySettings: ['Random Delay Maximum: 2000', 'Constant Delay Offset: 1000'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#Uniform_Random_Timer',
        },
        commonMistakes: [
          'Thinking timers execute AFTER a sampler—in JMeter, timers pause BEFORE the sampler fires.',
          'Placing a timer at the root of a Thread Group and being surprised that it delays EVERY sampler in that group.',
        ],
        keyTakeaways: [
          'Timers prevent unrealistically high request frequencies by simulating human pause times.',
          'Timers execute before the sampler they apply to.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Configuring Assertions and Validating Failures',
      description: 'Add a Response Assertion and Duration Assertion to an API test and observe how JMeter evaluates pass and fail states.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Add Response Assertion',
          uiTarget: 'Sampler -> Add Assertion -> Response Assertion',
          expectedBehavior: 'Assertion added; set Field to "Text Response", Pattern to "order_id".',
          whyItMatters: 'Ensures the response contains a generated order ID.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Add Duration Assertion',
          uiTarget: 'Sampler -> Add Assertion -> Duration Assertion',
          expectedBehavior: 'Assertion added; set Duration threshold to 400ms.',
          whyItMatters: 'Enforces that requests exceeding 400ms are marked as SLA failures.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Test with Slow Response Simulation',
          uiTarget: 'Simulate Response button',
          expectedBehavior: 'Response took 620ms; Duration Assertion fails with "The test took too long to finish".',
          whyItMatters: 'Demonstrates automated SLA enforcement.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-4-assertion-lab',
      labType: 'assertion_validator',
      title: 'Lab 4: Response & Duration Assertion Validator',
      subtitle: 'Configure multi-condition assertions and validate simulated normal, malformed, and slow API responses',
      instructionSteps: [
        'Select the target checkout API endpoint: POST /api/v1/orders/checkout.',
        'Add a Response Code assertion checking for "200".',
        'Add a Response Body assertion checking for the substring \'"status":"CONFIRMED"\'.',
        'Add a Duration Assertion with a maximum threshold of 350 milliseconds.',
        'Execute test runs against 3 simulated responses: (A) Fast & Valid, (B) Fast but Error JSON, (C) Valid but Slow (520ms).',
        'Observe how each response is classified and read the assertion failure reasons.',
      ],
      starterConfig: {
        expectedStatus: '200',
        bodySubstring: '"status":"CONFIRMED"',
        maxDurationMs: 350,
      },
      expectedSuccessCriteria: [
        'Response code assertion configured.',
        'Body substring assertion configured.',
        'Duration assertion set to 350ms.',
        'Correctly identifies Response B as failing body assertion and Response C as failing duration assertion.',
      ],
      hints: [
        'Notice that Response B returns HTTP 200, but its body has "status":"OUT_OF_STOCK". Your body assertion will correctly catch it!',
        'Response C returns valid data, but exceeds the 350ms threshold, failing the duration assertion.',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-4-flaky-assertion',
      title: 'Challenge: Resolve an Overly Strict Regex Assertion',
      scenario: 'A tester used a Response Assertion with pattern rule "Matches" and string "SUCCESS". The test fails 100% of the time, even though the server returns `{"status":"SUCCESS","id":901}`.',
      goal: 'Identify why "Matches" fails and change the pattern matching rule to "Substring" or "Contains" to achieve reliable validation.',
      brokenConfiguration: {
        fieldToTest: 'Text Response',
        matchingRule: 'Matches',
        pattern: 'SUCCESS',
      },
      solutionCriteria: [
        'Explain that "Matches" in JMeter requires the pattern to match the ENTIRE response body from the first character to the last.',
        'Change matching rule to "Substring" or "Contains".',
        'Verify assertion passes on the JSON body.',
      ],
      hints: [
        'In JMeter, "Matches" is equivalent to Java regex `^pattern$`. If there are any characters before or after, it fails.',
      ],
      commonPitfalls: [
        'Selecting "Matches" when you only want to check if a word is present.',
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q4-1',
          question: 'Why is checking for HTTP status 200 alone insufficient in enterprise load testing?',
          options: [
            'HTTP 200 is only supported in HTTP/1.0, not HTTP/2.',
            'Applications under load often return HTTP 200 status with an HTML or JSON error message inside the body (e.g. "Database pool exhausted").',
            'JMeter automatically converts all 200 responses to 500 under heavy load.',
            'Status 200 means the server refused to process the transaction.',
          ],
          correctAnswerIndex: 1,
          explanation: 'Many application frameworks return HTTP 200 with an error object or empty payload when downstream microservices fail. Validating body content confirms actual business transaction success.',
        },
        {
          id: 'q4-2',
          question: 'In Apache JMeter, when does a Timer execute relative to its associated Sampler?',
          options: [
            'Immediately AFTER the sampler finishes receiving the response.',
            'BEFORE the sampler executes its request.',
            'Concurrently while the sampler is waiting for bytes.',
            'Only if an assertion fails.',
          ],
          correctAnswerIndex: 1,
          explanation: 'In JMeter’s element execution order, Timers always execute BEFORE the Sampler. They delay the launch of the request to model user think time.',
        },
        {
          id: 'q4-3',
          question: 'If a Uniform Random Timer has "Constant Delay Offset = 1000" and "Random Delay Maximum = 3000", what is the range of delay introduced?',
          options: [
            'Between 1,000ms and 4,000ms',
            'Between 0ms and 3,000ms',
            'Exactly 1,000ms every time',
            'Between 1,000ms and 3,000ms',
          ],
          correctAnswerIndex: 0,
          explanation: 'Uniform Random Timer delay = Constant Delay Offset (1,000ms) + random value between 0 and Random Delay Maximum (3,000ms) = 1,000ms to 4,000ms (1.0s to 4.0s).',
        },
        {
          id: 'q4-4',
          question: 'What is the consequence of selecting the "Matches" rule in a Response Assertion when testing text inside a JSON response?',
          options: [
            'It checks if the word appears anywhere in the body.',
            'It checks if the ENTIRE response body matches the pattern from start to finish, failing unless a full regular expression matching all text is provided.',
            'It ignores case sensitivity automatically.',
            'It only tests the first 10 characters.',
          ],
          correctAnswerIndex: 1,
          explanation: '"Matches" requires the regular expression to match the entire text string. To search for a word anywhere in the body, use "Contains" or "Substring".',
        },
        {
          id: 'q4-5',
          question: 'Does a Duration Assertion measure network latency alone or total round-trip elapsed time?',
          options: [
            'Network latency only (time to first byte).',
            'Total round-trip elapsed time from the moment the request is sent until the complete response body has been received.',
            'Only server-side database execution time.',
            'Client-side rendering time in the browser.',
          ],
          correctAnswerIndex: 1,
          explanation: 'JMeter samplers measure total elapsed time: socket connect + SSL handshake + sending request + server processing + downloading the entire response body.',
        },
        {
          id: 'q4-6',
          question: 'If an assertion fails for an HTTP Request, how does JMeter report the sample in test results?',
          options: [
            'The sample is discarded from the test results entirely.',
            'The sample is marked as an error (failed), and its failure message is recorded in listener reports.',
            'JMeter halts the entire test immediately.',
            'The response time is set to 0ms.',
          ],
          correctAnswerIndex: 1,
          explanation: 'Assertion failures mark the sample as an error, increasing the error percentage and logging the assertion failure message.',
        },
      ],
    },
    daySummary:
      'You have mastered Response Assertions, Duration Assertions for SLA enforcement, and configured realistic think time using Uniform Random Timers.',
  },

  // -------------------------------------------------------------------------
  // DAY 5
  // -------------------------------------------------------------------------
  {
    dayNumber: 5,
    slug: 'day-5',
    title: 'CSV Data, Variables & Parameterization',
    subtitle: 'Data-driven testing, CSV Data Set Config, variables syntax, and thread isolation',
    badge: 'Day 5 • Practical Lab',
    duration: '50 mins',
    beginnerFriendlyAnalogy: {
      headline: 'The Airline Boarding Gate',
      concept: 'CSV Parameterization: Giving Every User Their Own Ticket',
      story: 'Imagine 100 passengers lining up to board an airplane. What happens if every single passenger hands the gate agent a boarding pass printed with the exact same name: "Pavan Kalyan, Seat 12A"? The scanner will beep red on passenger #2 and throw an error: "Seat 12A is already occupied!" To simulate a real airplane boarding, every passenger must have their own unique name, passport number, and seat number. In JMeter, if 100 virtual users all try to log in as "demo_user" at the same time, the server will block them with account lockouts or fake cached responses. We use a CSV spreadsheet to hand each virtual user their own unique username, password, and search terms.',
      keyLesson: 'Parameterization turns robotic copy-cat tests into realistic human traffic by giving every simulated user their own unique row of data.',
      plainEnglishTerms: [
        { term: 'Parameterization', plainMeaning: 'Replacing hardcoded text (like "john") with dynamic variables (like "${username}").' },
        { term: 'CSV Data Set Config', plainMeaning: 'JMeter\'s tool for reading a spreadsheet and handing row 1 to user 1, row 2 to user 2, etc.' },
        { term: '${variable_name}', plainMeaning: 'The dollar-bracket syntax JMeter uses to say "insert the value of this column here".' },
        { term: 'Recycle on EOF', plainMeaning: 'When JMeter reaches the bottom of your CSV file, should it start over from line 1? (Usually True).' },
      ],
    },
    objectives: [
      'Understand the purpose of test data parameterization in load testing.',
      'Configure the CSV Data Set Config element in Apache JMeter.',
      'Reference JMeter variables using the ${variable_name} syntax.',
      'Control data allocation across virtual users and loop iterations.',
      'Prevent duplicate key collisions and avoid shared-data race conditions.',
    ],
    introduction:
      'If 100 virtual users execute a performance test using the exact same username "testuser_01", the server may return caching hits, race conditions, or duplicate key errors. Real-world users use different accounts, search for different products, and submit unique data. Parameterization feeds unique test data from external files into each virtual user.',
    visualExplanation: {
      title: 'CSV Data Set Row Allocation Across Threads',
      diagramType: 'timeline',
      description: 'How JMeter threads consume rows from an external CSV file across multiple iterations.',
      stepsOrStages: [
        { name: 'Row 1 (user_101, laptops)', detail: 'Consumed by Thread 1 on Iteration 1' },
        { name: 'Row 2 (user_102, monitors)', detail: 'Consumed by Thread 2 on Iteration 1' },
        { name: 'Row 3 (user_103, keyboards)', detail: 'Consumed by Thread 3 on Iteration 1' },
        { name: 'Row 4 (user_104, headphones)', detail: 'Consumed by Thread 1 on Iteration 2 (after loop repeats)' },
        { name: 'Row 5 (user_105, cameras)', detail: 'Consumed by Thread 2 on Iteration 2' },
      ],
    },
    topics: [
      {
        title: 'Why Parameterization is Critical for Valid Load Testing',
        summary: 'Preventing artificial caching and realistic server load simulation.',
        explanation:
          'When testing without parameterization, all virtual users request the identical URL (e.g. `/product?id=99`). The database or web proxy caches the query result in RAM, delivering blazing fast responses (10ms). In production, however, 1,000 users query 1,000 distinct product IDs, forcing real disk reads and cache misses, resulting in high latency.\n\nParameterization achieves:\n1. Cache bypassing to measure true backend database performance.\n2. Unique transaction IDs preventing duplicate key database constraints.\n3. Realistic test volume matching diverse real-world usage patterns.',
        realWorldExample: 'A search engine load test with 500 users searching for the word "apple" tests cache memory. Testing with a CSV of 10,000 distinct search terms tests real database indexing.',
        commonMistakes: [
          'Reusing a single user account for 200 concurrent threads, causing the auth service to reject logins with "Session already active".',
        ],
        keyTakeaways: [
          'Parameterization ensures realistic cache behavior and avoids database conflict locks.',
        ],
      },
      {
        title: 'Configuring the CSV Data Set Config Element',
        summary: 'Mapping external CSV columns into JMeter variables.',
        explanation:
          'Key settings in `CSV Data Set Config`:\n- Filename: Path to the CSV file (relative paths like `data/users.csv` are best for portability).\n- File Encoding: Typically `UTF-8`.\n- Variable Names (comma-delimited): The variable names mapped to each column, e.g. `userId,userRole,searchQuery`. If left empty, JMeter uses the first line of the CSV as variable names.\n- Delimiter: Default is `,` (comma).\n- Recycle on EOF (End of File)?: `True` means JMeter restarts reading from the top of the file when rows run out. `False` stops reading.\n- Stop Thread on EOF?: `True` terminates the thread when no more data exists.\n- Sharing Mode:\n  - All Threads: All virtual users share a single file reader pointer (each row is consumed once across all threads).\n  - Current Thread Group: Independent reader per thread group.\n  - Current Thread: Each virtual user reads from the beginning of the file independently.',
        realWorldExample: 'A CSV containing `admin_user,Admin123!` and `standard_user,User123!` maps to variables `${username}` and `${password}`.',
        jmeterElementMapping: {
          elementName: 'CSV Data Set Config',
          category: 'Config',
          purpose: 'Reads lines from a CSV file and stores values in JMeter variables.',
          keySettings: ['Filename: data/products.csv', 'Variable Names: prodId,prodName,category', 'Delimiter: ,', 'Recycle on EOF: True'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#CSV_Data_Set_Config',
        },
        commonMistakes: [
          'Hardcoding absolute local paths like `C:\\Users\\John\\Documents\\test.csv` which break on CI/CD servers or teammate laptops.',
          'Using variable names with spaces (e.g. `user id` instead of `userId`).',
        ],
        keyTakeaways: [
          'Use relative paths for CSV files to guarantee portability across test runners.',
        ],
      },
      {
        title: 'Referencing JMeter Variables in Samplers',
        summary: 'Using the ${variable_name} syntax across URLs, headers, and request bodies.',
        explanation:
          'Once a variable is populated (by CSV Data Set Config, User Defined Variables, or an Extractor), you reference it anywhere in JMeter using:\n`${variable_name}`\n\nExamples:\n- In URL Path: `/api/v1/products/${prodId}`\n- In Query Parameter: `q=${searchQuery}`\n- In Request Headers: `Authorization: Bearer ${authToken}`\n- In JSON Body:\n```json\n{\n  "userId": "${userId}",\n  "quantity": ${qty},\n  "action": "ADD_TO_CART"\n}\n```\n\nIf JMeter cannot find a variable named `prodId`, it sends the literal string `"${prodId}"` to the server!',
        realWorldExample: 'If the server receives `/api/v1/products/${prodId}` literally, it returns HTTP 404 Not Found because no product has the ID "${prodId}".',
        commonMistakes: [
          'Misspelling variable names (case-sensitive: `${userId}` vs `${userid}`).',
          'Forgetting the closing brace or dollar sign: `{userId}` or `$userId`.',
        ],
        keyTakeaways: [
          'JMeter variables are referenced using `${VAR_NAME}` and are case-sensitive.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Connecting a CSV File to an HTTP Sampler',
      description: 'Map CSV columns to variables and observe unique data consumed per thread in the live preview.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Inspect CSV Table',
          uiTarget: 'CSV Data Table',
          expectedBehavior: 'Displays 5 rows with columns: username, role, category.',
          whyItMatters: 'Confirms column order and available test data.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Map Variable Names',
          uiTarget: 'Variable Names input field',
          expectedBehavior: 'Enter "username,role,category".',
          whyItMatters: 'Creates the JMeter variables for each row.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Parameterize Sampler URL & Body',
          uiTarget: 'Sampler Path: /api/v1/search?category=${category}&user=${username}',
          expectedBehavior: 'Sampler updates with variable placeholders.',
          whyItMatters: 'Each thread will dynamically substitute its assigned row.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-5-csv-parameterizer',
      labType: 'csv_parameterizer',
      title: 'Lab 5: Data-Driven CSV Parameterization Lab',
      subtitle: 'Map CSV columns, inject variables into query strings and JSON bodies, and run a multi-user simulation',
      instructionSteps: [
        'Inspect the sample CSV dataset containing fictional customer search data.',
        'Define the variable names: "customer_id,search_query,device_type".',
        'Parameterize the HTTP Request path: /api/v1/search?q=${search_query}&device=${device_type}.',
        'Add a custom header in the Header Manager: "X-Customer-ID: ${customer_id}".',
        'Run the simulated 3-thread test and verify that each thread receives a distinct search query and customer ID.',
      ],
      starterConfig: {
        csvFilename: 'data/customer_searches.csv',
        variableNames: '',
        pathTemplate: '/api/v1/search',
        headersTemplate: {},
      },
      expectedSuccessCriteria: [
        'Variable names mapped: customer_id,search_query,device_type.',
        'Path correctly references ${search_query} and ${device_type}.',
        'Header correctly references ${customer_id}.',
        'Simulation confirms 3 distinct queries processed without duplicate data collisions.',
      ],
      hints: [
        'Variable names in CSV Data Set Config must match the placeholders: customer_id matches ${customer_id}.',
        'Ensure variable names are separated by commas without spaces.',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-5-fix-mismatched-columns',
      title: 'Challenge: Fix Variable Name Mismatches in an E-Commerce Test',
      scenario: 'A test plan is sending literal string `/api/v1/items/${item_code}` to the server, resulting in 100% 404 errors. The CSV file header has `itemCode,price,stock`.',
      goal: 'Identify the naming discrepancy and update the sampler path to use the matching variable name `${itemCode}`.',
      brokenConfiguration: {
        csvColumns: ['itemCode', 'price', 'stock'],
        samplerPath: '/api/v1/items/${item_code}',
      },
      solutionCriteria: [
        'Identify that JMeter variables are case-sensitive and literal.',
        'Update the path to `/api/v1/items/${itemCode}`.',
        'Confirm requests resolve to valid item codes like `/api/v1/items/ITM-204`.',
      ],
      hints: [
        'Notice the difference between snake_case `item_code` and camelCase `itemCode`.',
      ],
      commonPitfalls: [
        'Assuming JMeter ignores case in variable names.',
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q5-1',
          question: 'What syntax is used in Apache JMeter to reference a variable named "sessionId"?',
          options: [
            '${sessionId}',
            '$sessionId',
            '#{sessionId}',
            '%sessionId%',
          ],
          correctAnswerIndex: 0,
          explanation: 'JMeter uses the `${variable_name}` syntax to reference variables in any field, URL, header, or body text area.',
        },
        {
          id: 'q5-2',
          question: 'What happens if an HTTP Request sampler references `${user_name}`, but that variable was never defined in CSV or Test Plan?',
          options: [
            'JMeter throws a compilation error before starting the test.',
            'JMeter replaces the variable with an empty string ("").',
            'JMeter sends the literal text "${user_name}" in the request.',
            'JMeter automatically assigns a random 8-character string.',
          ],
          correctAnswerIndex: 2,
          explanation: 'When an undefined variable is referenced, JMeter sends the literal string `"${variable_name}"` over the wire, frequently causing 404 or 400 errors.',
        },
        {
          id: 'q5-3',
          question: 'In a CSV Data Set Config, what does "Recycle on EOF = True" mean?',
          options: [
            'The CSV file is deleted after the test finishes.',
            'When threads reach the end of the CSV file, JMeter starts reading again from the first row of data.',
            'JMeter automatically stops the thread group.',
            'JMeter generates synthetic fake data when the file ends.',
          ],
          correctAnswerIndex: 1,
          explanation: '"Recycle on EOF = True" causes the file reader to wrap around to the first line when the end of the file is reached, allowing longer tests to reuse available data.',
        },
        {
          id: 'q5-4',
          question: 'Why should absolute file paths like `C:\\Users\\Alice\\test.csv` be avoided in CSV Data Set Config?',
          options: [
            'Absolute paths are illegal in JMeter.',
            'Absolute paths fail when the test plan is executed on other machines, CI/CD runners, or Linux servers where the path does not exist.',
            'Absolute paths limit JMeter to 1 virtual user.',
            'JMeter only reads files stored in the /bin directory.',
          ],
          correctAnswerIndex: 1,
          explanation: 'Hardcoded absolute paths break portability across different operating systems and CI/CD automated test runners. Relative paths (relative to the `.jmx` file or JMeter launch directory) ensure cross-platform execution.',
        },
        {
          id: 'q5-5',
          question: 'In a test with 10 threads and 1 loop, with a CSV file containing 10 rows and "Sharing Mode = All Threads", how many times is each row consumed?',
          options: [
            'Each row is consumed exactly once across the 10 threads.',
            'Each thread reads all 10 rows.',
            'Only the first row is read 10 times.',
            'Rows are read in random order with duplicates.',
          ],
          correctAnswerIndex: 0,
          explanation: 'When Sharing Mode is "All Threads", all virtual users share a single sequential file pointer. Thread 1 gets row 1, Thread 2 gets row 2, and so on.',
        },
        {
          id: 'q5-6',
          question: 'Why does testing a search endpoint with a single repeated keyword give artificially optimistic response times?',
          options: [
            'The JMeter client stops measuring response times after the first request.',
            'The server and database cache the query result in RAM, avoiding disk I/O and query re-computation.',
            'HTTP GET requests cannot be measured accurately in JMeter.',
            'The browser caches the response locally.',
          ],
          correctAnswerIndex: 1,
          explanation: 'Repeated identical requests hit internal server caches (Redis, query cache, database buffer pool), resulting in deceptively fast response times that do not reflect production reality.',
        },
      ],
    },
    daySummary:
      'You have mastered test data parameterization using CSV Data Set Config, variable syntax (${var}), row allocation policies across threads, and avoiding cache illusions.',
  },

  // -------------------------------------------------------------------------
  // DAY 6
  // -------------------------------------------------------------------------
  {
    dayNumber: 6,
    slug: 'day-6',
    title: 'Correlation & Dynamic Values',
    subtitle: 'Extracting dynamic tokens, JSON Extractor, Regular Expression Extractor, and session chaining',
    badge: 'Day 6 • Checkpoint 2',
    duration: '55 mins',
    beginnerFriendlyAnalogy: {
      headline: 'The Hotel Room Keycard',
      concept: 'Correlation & JSON Extractor: Handing Keys from Step 1 to Step 2',
      story: 'When you check into a hotel, you first walk up to the front desk and show your ID (Step 1: Login). The receptionist doesn\'t give you a room key yesterday; they give you a freshly programmed magnetic keycard right then and there (the secret session token). When you take the elevator up to Room 304 (Step 2: View Profile or Add to Cart), you must swipe that exact keycard to unlock the door. If you try to guess a random keycard code, or use an expired keycard from your last vacation 3 weeks ago, the door flashes red and stays locked! In JMeter, "Correlation" simply means: when the server hands you a secret token in Step 1, you automatically catch it and swipe it into Step 2 and Step 3.',
      keyLesson: 'Never hardcode temporary codes or tokens. Use a JSON Extractor to catch the server\'s secret keycard and reuse it automatically in your next request.',
      plainEnglishTerms: [
        { term: 'Correlation', plainMeaning: 'Saving a secret code or ID from an earlier response and using it in later requests.' },
        { term: 'JSON Extractor', plainMeaning: 'A post-processor that reads a JSON response, grabs a specific field, and saves it into a variable.' },
        { term: 'JSONPath ($.data.jwt)', plainMeaning: 'A search pointer that says: "Go inside data, then find the field named jwt".' },
        { term: 'Downstream Request', plainMeaning: 'Any request that runs after the current step (like clicking checkout after adding to cart).' },
      ],
    },
    objectives: [
      'Understand what dynamic values are and why hardcoded values fail in multi-step user journeys.',
      'Configure the JSON Extractor to capture dynamic tokens, IDs, and session keys.',
      'Understand JSONPath syntax (e.g. $.data.token, $.items[0].id).',
      'Pass extracted variables into downstream authorization headers and payloads.',
      'Debug missing or null extracted values using default fallback values.',
      'Complete Cumulative Practical Checkpoint 2 (Days 4–6).',
    ],
    introduction:
      'In modern web applications, the server generates dynamic values at runtime—such as session tokens, OAuth JWT access tokens, CSRF tokens, order numbers, and cart IDs. If you record or write a script with a hardcoded token, it will expire or be rejected by the server on subsequent requests. Correlation is the process of capturing a dynamic value from a response and feeding it into downstream requests.',
    visualExplanation: {
      title: 'Dynamic Value Correlation Architecture',
      diagramType: 'flow',
      description: 'Chaining requests together by extracting dynamic server-generated data at runtime.',
      stepsOrStages: [
        { name: 'Step 1: POST /api/auth/login', detail: 'User submits credentials. Server responds with HTTP 200 and JSON containing {"token": "jwt_live_98a7x"}.' },
        { name: 'Step 2: JSON Extractor', detail: 'Executes JSONPath expression `$.token` on Response Body and saves value to variable `${bearerToken}`.' },
        { name: 'Step 3: GET /api/user/orders', detail: 'Attaches header `Authorization: Bearer ${bearerToken}` using the extracted runtime token.' },
        { name: 'Step 4: Server Verification', detail: 'Server validates dynamic token, confirms session identity, and responds with HTTP 200 OK.' },
      ],
    },
    topics: [
      {
        title: 'What is Correlation and Why is it Necessary?',
        summary: 'Handling runtime server-generated state that cannot be predetermined.',
        explanation:
          'Unlike test data (like a list of cities or passwords) which you know in advance and store in a CSV, dynamic values are generated by the server during test execution:\n- Session IDs & Cookies\n- OAuth Access & Refresh Tokens (JWTs)\n- CSRF / Anti-Forgery security tokens\n- Newly created Database IDs (e.g. creating an order returns `order_id: 88412`, which is immediately required by the payment step).\n\nIf you hardcode a token from yesterday’s test, today’s server will reject it with `HTTP 401 Unauthorized` or `HTTP 403 Forbidden`.\nCorrelation captures this dynamic value from response A and injects it into request B.',
        realWorldExample: 'Logging into an banking portal generates a one-time session token valid for 15 minutes. The fund transfer API rejects any transaction missing this exact token.',
        commonMistakes: [
          'Attempting to put dynamic tokens into a CSV file—they must be captured dynamically from the live login response.',
        ],
        keyTakeaways: [
          'Correlation captures dynamic runtime server values and chains requests together.',
        ],
      },
      {
        title: 'The JSON Extractor in JMeter',
        summary: 'Using JSONPath expressions to extract fields from JSON responses.',
        explanation:
          'The JSON Extractor is a Post-Processor element placed as a child of the sampler that returns the JSON response.\n\nKey configuration properties:\n- Names of created variables: Variable to store the extracted data, e.g. `authToken`.\n- JSON Path expressions: The expression to locate the target data:\n  - `$.token` -> Top-level field named "token".\n  - `$.data.user.id` -> Nested field.\n  - `$.items[0].id` -> ID of the first element in an array.\n  - `$.items[*].id` -> All IDs in the array.\n- Match No. (0 for Random): `1` for the first match, `0` for random match, `-1` for all matches (creates indexed variables like `id_1`, `id_2`).\n- Default Values: Value assigned if the JSONPath expression finds nothing, e.g. `TOKEN_NOT_FOUND`.\n\nAlways specify a clear Default Value! If the extractor fails, this prevents downstream requests from sending an unpopulated variable.',
        realWorldExample: 'Extracting `$.data.accessToken` from an authentication response and reusing it in downstream API calls.',
        jmeterElementMapping: {
          elementName: 'JSON Extractor',
          category: 'Post-Processor',
          purpose: 'Extracts data from JSON response bodies using JSONPath expressions.',
          keySettings: ['Names of created variables: sessionToken', 'JSON Path expressions: $.session.token', 'Match No.: 1', 'Default Values: NOT_FOUND'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#JSON_Extractor',
        },
        commonMistakes: [
          'Leaving Default Values blank, making it difficult to detect when an extractor fails.',
          'Using incorrect case in the JSONPath (e.g. `$.Token` when the JSON key is `$.token`).',
        ],
        keyTakeaways: [
          'JSON Extractor parses JSON responses quickly using standard JSONPath syntax.',
          'Always supply a default value for transparent debugging.',
        ],
      },
      {
        title: 'The Regular Expression Extractor',
        summary: 'Extracting dynamic values from HTML, XML, or response headers.',
        explanation:
          'When dealing with HTML pages, raw text, or custom response headers where JSONPath cannot be used, the Regular Expression Extractor is the tool of choice.\n\nKey properties:\n- Reference Name: Name of the variable, e.g. `csrfToken`.\n- Regular Expression: Regex with capturing parentheses `()`. For example:\n  `name="csrf_token" value="([^"]+)"`\n- Template: `$1$` specifies that the value captured in the first pair of parentheses should be used.\n- Match No.: `1` for first match.\n- Default Value: e.g. `CSRF_NOT_FOUND`.',
        realWorldExample: 'Extracting an anti-CSRF token hidden inside an HTML form: `<input type="hidden" name="__RequestVerificationToken" value="xyz123"/>`.',
        jmeterElementMapping: {
          elementName: 'Regular Expression Extractor',
          category: 'Post-Processor',
          purpose: 'Extracts values from text or headers using regular expressions.',
          keySettings: ['Reference Name: csrf_token', 'Regular Expression: name="csrf" value="(.*?)"', 'Template: $1$', 'Match No.: 1'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#Regular_Expression_Extractor',
        },
        commonMistakes: [
          'Using greedy `(.*)` instead of non-greedy `(.*?)` or `([^"]+)`, causing the regex to capture half the HTML page.',
        ],
        keyTakeaways: [
          'Use Regular Expression Extractor when extracting from HTML, XML, or response headers.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Configuring a JSON Extractor and Passing Tokens',
      description: 'Step-by-step extraction of an auth token from a login response and injecting it into a secure profile request.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Send Login Request',
          uiTarget: 'POST /api/v1/auth/login',
          expectedBehavior: 'Server returns JSON: {"status":"SUCCESS","session":{"token":"rt_sec_99341a","expiresIn":3600}}.',
          whyItMatters: 'Provides the source response containing the dynamic token.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Attach JSON Extractor to Login Request',
          uiTarget: 'Login Sampler -> Add Post-Processor -> JSON Extractor',
          expectedBehavior: 'Set Variable: "authToken", JSONPath: "$.session.token", Default: "TOKEN_MISSING".',
          whyItMatters: 'Extracts the token into ${authToken}.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Configure Secure Request Header',
          uiTarget: 'Secure Sampler -> Header Manager -> Authorization',
          expectedBehavior: 'Enter "Bearer ${authToken}".',
          whyItMatters: 'Downstream request uses the dynamic token; server validates and returns 200 OK.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-6-json-extractor-correlator',
      labType: 'json_extractor_correlator',
      title: 'Lab 6: End-to-End Dynamic Token Correlation Lab',
      subtitle: 'Extract authentication tokens and order identifiers to complete a multi-step e-commerce journey',
      instructionSteps: [
        'Review the 2-step test flow: (1) Login API, (2) User Profile API.',
        'Attach a JSON Extractor to the Login Sampler.',
        'Configure the variable name as "authToken" and write the correct JSONPath expression to extract the token from `$.data.jwt`.',
        'Set Default Value to "AUTH_EXTRACT_FAILED".',
        'Update the Profile Sampler’s Header Manager to pass "Authorization: Bearer ${authToken}".',
        'Execute the 2-step simulation and verify that the Profile API returns HTTP 200 OK with authorized user data.',
      ],
      starterConfig: {
        loginResponse: {
          code: 200,
          body: {
            success: true,
            data: {
              jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfMTAxIn0',
              role: 'CUSTOMER',
            },
          },
        },
        jsonPathExpression: '',
        targetVariableName: '',
      },
      expectedSuccessCriteria: [
        'JSONPath expression set to `$.data.jwt`.',
        'Variable name set to `authToken`.',
        'Downstream sampler references `${authToken}` in Authorization header.',
        'Profile request succeeds with HTTP 200 OK.',
      ],
      hints: [
        'Notice the nesting: the root has "data", which contains "jwt". The JSONPath is `$.data.jwt`.',
        'If downstream returns 401 Unauthorized, check if the variable name matches exactly.',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-6-broken-jsonpath',
      title: 'Challenge: Repair a Broken Extractor in a Checkout Flow',
      scenario: 'The checkout test fails at Step 3 with `HTTP 400: Missing Cart ID`. Step 2 creates a cart and returns `{"cart":{"cartId":"crt_8912"},"items":[]}`, but the extractor has JSONPath `$.cart_id`.',
      goal: 'Diagnose the JSONPath mismatch, fix the expression to `$.cart.cartId`, and verify that Step 3 receives the valid cart ID.',
      brokenConfiguration: {
        jsonPath: '$.cart_id',
        responseSample: '{"cart":{"cartId":"crt_8912"},"items":[]}',
      },
      solutionCriteria: [
        'Identify that `$.cart_id` looks for a top-level property that does not exist.',
        'Update JSONPath to `$.cart.cartId`.',
        'Verify downstream request uses `/api/v1/checkout?cartId=crt_8912`.',
      ],
      hints: [
        'The property "cartId" is nested inside the "cart" object: `$.cart.cartId`.',
      ],
      commonPitfalls: [
        'Forgetting dot notation for nested JSON objects.',
      ],
    },
    checkpointReview: {
      id: 'checkpoint-2',
      title: 'Cumulative Practical Checkpoint 2 (Days 4–6)',
      coveredDays: 'Days 4, 5, and 6',
      scenarioDescription: 'Consolidate assertions, CSV parameterization, and dynamic correlation into a cohesive performance test flow.',
      practicalTasks: [
        {
          taskNumber: 1,
          description: 'Distinguish CSV vs Extractor: When should you use CSV Data Set Config vs a JSON Extractor?',
          actionRequired: 'CSV is for pre-known input data (usernames, search keywords). Extractor is for server-generated runtime data (session tokens, order IDs).',
          validationCheck: 'Correctly classifies test data vs runtime state.',
        },
        {
          taskNumber: 2,
          description: 'Assertion vs Post-Processor Execution: Which element executes first after a sampler receives a response?',
          actionRequired: 'Post-Processors execute before Assertions (allowing assertions to check extracted values if desired).',
          validationCheck: 'Understands JMeter execution order.',
        },
      ],
      reviewQuestions: [
        {
          id: 'cp2-q1',
          question: 'In a response containing `{"orders": [{"id": "ORD-1"}, {"id": "ORD-2"}]}`, what JSONPath expression extracts the ID of the first order?',
          options: ['$.orders[0].id', '$.orders.id[0]', '$.orders[1].id', '$orders->first->id'],
          correctAnswerIndex: 0,
          explanation: 'In JSONPath array syntax, `[0]` accesses the first element: `$.orders[0].id` evaluates to "ORD-1".',
        },
        {
          id: 'cp2-q2',
          question: 'If a downstream request sends `Authorization: Bearer AUTH_NOT_FOUND`, what does this indicate?',
          options: [
            'The JSON Extractor failed to match the token in the previous response and fell back to its configured Default Value.',
            'The client computer has no internet access.',
            'The server requires Basic Authentication instead of Bearer.',
            'The CSV Data Set Config has reached the end of the file.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Seeing the default fallback string in downstream requests proves that the JSONPath expression failed to find the target field in the upstream response.',
        },
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q6-1',
          question: 'What is the fundamental difference between data parameterization (CSV) and correlation (Extractors)?',
          options: [
            'Parameterization uses external pre-known input data; correlation extracts dynamic server-generated data at runtime.',
            'Parameterization only works with GET requests; correlation only works with POST.',
            'Correlation is executed manually; parameterization is automated.',
            'There is no difference; they are interchangeable terms.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Parameterization feeds known test inputs (e.g. CSV credentials) into requests. Correlation captures runtime values generated dynamically by the server (e.g. session tokens, order IDs).',
        },
        {
          id: 'q6-2',
          question: 'In a JMeter JSON Extractor, what does `Match No. = 1` mean?',
          options: [
            'Extract the first match found by the JSONPath expression.',
            'Extract only matches that contain the number 1.',
            'Repeat extraction 1 time.',
            'Extract all matches into an array.',
          ],
          correctAnswerIndex: 0,
          explanation: '`Match No. = 1` directs JMeter to extract the first matching value. `0` selects a random match, and `-1` extracts all matches.',
        },
        {
          id: 'q6-3',
          question: 'Why is it considered a best practice to always provide a "Default Value" in a JSON or Regular Expression Extractor?',
          options: [
            'Without a default value, JMeter crashes immediately.',
            'If extraction fails, the default value makes the failure immediately obvious in request logs rather than silently sending unexpanded variable strings.',
            'Default values speed up JSONPath execution.',
            'Default values bypass server authentication.',
          ],
          correctAnswerIndex: 1,
          explanation: 'A descriptive default value (e.g. `TOKEN_EXTRACTION_FAILED`) makes failures visible immediately in request headers and assertion logs, making debugging straightforward.',
        },
        {
          id: 'q6-4',
          question: 'Which of the following JSONPath expressions extracts the "token" field nested inside `{"session": {"auth": {"token": "xyz"}}}`?',
          options: [
            '$.session.auth.token',
            '$.token',
            '$.session.token',
            '$[session][auth]->token',
          ],
          correctAnswerIndex: 0,
          explanation: 'JSONPath uses dot notation to traverse nested objects: `$.session.auth.token`.',
        },
        {
          id: 'q6-5',
          question: 'If you need to extract a CSRF token embedded inside an HTML `<meta>` tag, which JMeter element is most appropriate?',
          options: [
            'Regular Expression Extractor or Boundary Extractor',
            'JSON Extractor',
            'CSV Data Set Config',
            'Duration Assertion',
          ],
          correctAnswerIndex: 0,
          explanation: 'HTML and raw text responses are not valid JSON documents; they require a Regular Expression Extractor or Boundary Extractor to extract data.',
        },
        {
          id: 'q6-6',
          question: 'Where should a JSON Extractor be placed in the Test Plan tree to extract data from a specific HTTP Request sampler?',
          options: [
            'Directly as a child element of that specific HTTP Request sampler.',
            'At the root of the Test Plan.',
            'Inside the CSV Data Set Config.',
            'After the Thread Group completes.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Post-Processors placed as child elements of a sampler execute only on that specific sampler’s response, ensuring clean isolation and preventing unintended overrides.',
        },
      ],
    },
    daySummary:
      'You have mastered dynamic value correlation using JSON and Regular Expression Extractors, handled token chaining, debugged extraction failures, and completed Practical Checkpoint 2.',
  },

  // -------------------------------------------------------------------------
  // DAY 7
  // -------------------------------------------------------------------------
  {
    dayNumber: 7,
    slug: 'day-7',
    title: 'Load, Stress, Spike & Endurance Testing',
    subtitle: 'Workload modelling, concurrency curves, ramp-down, and capacity limits',
    badge: 'Day 7 • Workload Design',
    duration: '50 mins',
    beginnerFriendlyAnalogy: {
      headline: 'Traffic on a Four-Lane Highway',
      concept: 'The 4 Types of Tests: Load, Stress, Spike & Soak Explained Simply',
      story: 'Think of a city highway under 4 different driving conditions: 1) Normal Rush Hour (Load Test): Cars enter the highway steadily, cruise at the 60 mph speed limit, and exit normally. You test if traffic flows smoothly. 2) The Traffic Jam Test (Stress Test): You keep letting more and more cars onto the highway until it completely gridlocks. You discover the exact maximum number of cars the highway can physically hold before stopping. 3) The Stadium Flash Mob (Spike Test): A massive football stadium ends its game and 10,000 cars dump onto the highway ramp in 60 seconds. Does the road completely seize up, or does it recover within 5 minutes? 4) The 24-Hour Truck Convoy (Endurance / Soak Test): Heavy trucks drive smoothly for 24 hours straight without stopping to see if the asphalt melts or bridges crack over time.',
      keyLesson: 'You choose your test type based on what question you need to answer: Are we ready for regular daily traffic (Load), our breaking point (Stress), a flash sale (Spike), or memory leaks (Endurance)?',
      plainEnglishTerms: [
        { term: 'Load Test', plainMeaning: 'Testing normal expected daily traffic to make sure response times are fast.' },
        { term: 'Stress Test', plainMeaning: 'Pushing traffic higher and higher until the website breaks to find its maximum limit.' },
        { term: 'Spike Test', plainMeaning: 'Sudden instant surge in traffic (like concert ticket drops) followed by an immediate drop.' },
        { term: 'Endurance (Soak) Test', plainMeaning: 'Running moderate traffic for hours or days to check if the server runs out of memory.' },
      ],
    },
    objectives: [
      'Design realistic workload profiles for Load, Stress, Spike, and Endurance scenarios.',
      'Configure ramp-up, steady-state hold duration, and ramp-down phases.',
      'Understand how think time directly governs system throughput and concurrency.',
      'Model baseline vs. peak traffic scenarios and compare statistical measurements.',
      'Identify the architectural breaking point of an application under stress.',
    ],
    introduction:
      'A performance test is only as good as its workload model. Running 100 users for 10 seconds without think time produces completely misleading data. In Day 7, you will design realistic workload profiles with ramp-up, sustained steady-state holding periods, and graceful ramp-down, and explore how systems behave under stress and spike conditions.',
    visualExplanation: {
      title: 'The Four Workload Profiles Compared',
      diagramType: 'timeline',
      description: 'Visual comparison of virtual user concurrency over time across the 4 major performance testing types.',
      stepsOrStages: [
        { name: '1. Load Test (Trapezoid)', detail: 'Ramp-up (5m) ➔ Hold at expected peak (30m) ➔ Ramp-down (5m). Verifies SLA compliance.' },
        { name: '2. Stress Test (Staircase)', detail: 'Step up 20 users every 5m until server errors spike or crash occurs. Identifies max capacity.' },
        { name: '3. Spike Test (Sharp Peak)', detail: 'Baseline (10 users) ➔ Instant surge to 500 users in 10s ➔ Immediate drop. Tests recovery.' },
        { name: '4. Endurance/Soak (Plateau)', detail: 'Hold steady at 60% capacity for 8 to 24 hours. Tests memory leaks and connection pools.' },
      ],
    },
    topics: [
      {
        title: 'Workload Modelling & Concurrency Profiles',
        summary: 'Translating business requirements into precise virtual user schedules.',
        explanation:
          'A production-ready workload model defines three phases:\n1. Ramp-Up: Virtual users start incrementally. This warms up database connection pools, JIT compilers, and cache layers smoothly.\n2. Steady State (Hold Duration): Concurrency remains constant at peak level for a sufficient duration (e.g. 15–60 minutes) to gather statistically valid latency distributions.\n3. Ramp-Down: Users exit gradually, allowing remaining transactions and background queues to drain cleanly.\n\nWithout a steady-state hold, metrics only reflect warmup chaos rather than sustained operational performance.',
        realWorldExample: 'For an enterprise payroll app processing month-end salaries, model 200 users ramping over 10m, holding for 45m, and ramping down over 5m.',
        commonMistakes: [
          'Ramping up for 60 seconds and immediately stopping the test (0s hold duration), resulting in zero steady-state data.',
        ],
        keyTakeaways: [
          'Every valid load test requires a sustained steady-state holding duration.',
        ],
      },
      {
        title: 'Stress vs. Spike Testing Mechanics',
        summary: 'Pushing systems past their design limits.',
        explanation:
          '- Stress Testing: Gradually steps up concurrency (e.g. 50 -> 100 -> 150 -> 200 -> 250) until response times exceed acceptable limits or error rates rise above 5%. The goal is to determine the maximum breaking point and observe whether the system recovers gracefully when load is reduced.\n- Spike Testing: Simulates an abrupt, near-vertical surge in traffic (e.g. from 20 users to 400 users in 15 seconds) followed by an immediate return to baseline. The goal is to determine if load balancers, auto-scalers, and socket queues survive the shock without crashing.',
        realWorldExample: 'A breaking news website experiences a Spike Test scenario when a major world event occurs and millions of users load the front page within 60 seconds.',
        commonMistakes: [
          'Running a stress test without monitoring server-side metrics (CPU, memory, database connection pool).',
        ],
        keyTakeaways: [
          'Stress tests find capacity limits; spike tests evaluate shock resilience and recovery.',
        ],
      },
      {
        title: 'Endurance (Soak) Testing Best Practices',
        summary: 'Uncovering memory leaks, resource exhaustion, and gradual degradation over time.',
        explanation:
          'Endurance testing runs a sustained load (typically 60–80% of normal capacity) over an extended period (6, 12, 24, or 48 hours).\nWhat it detects:\n1. Memory Leaks: In Java, C#, or Node.js applications, objects lingering in heap memory cause garbage collection pauses to grow longer until an OutOfMemoryError crashes the process.\n2. Database Connection Leaks: Connections opened but not returned to the pool eventually exhaust the connection limit (`Too many connections`).\n3. Log File & Disk Saturation: Excessive debug logging consuming all available disk space.',
        realWorldExample: 'An IoT telemetry backend performs fine in 30-minute tests, but after 14 hours runs out of database connections because an error handler forgets to close its database session.',
        commonMistakes: [
          'Attempting an endurance test at 100% stress capacity—endurance tests should use realistic sustainable load.',
        ],
        keyTakeaways: [
          'Endurance testing requires sustained hours of execution to expose resource leakage.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Configuring a Workload Profile in the Designer',
      description: 'Configure a trapezoidal load test profile and compare its response metrics against a sudden spike profile.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Configure Ramp-Up, Hold, and Ramp-Down',
          uiTarget: 'Workload Designer Form',
          expectedBehavior: 'Set Users: 50, Ramp-up: 30s, Hold: 120s, Ramp-down: 20s.',
          whyItMatters: 'Creates a clean trapezoidal workload profile.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Configure Think Time',
          uiTarget: 'Think Time input',
          expectedBehavior: 'Set average think time: 1.5 seconds.',
          whyItMatters: 'Governs realistic transaction throughput per user.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Execute Synthetic Workload Simulation',
          uiTarget: 'Run Workload Simulation',
          expectedBehavior: 'Generates response time, throughput, and error graphs over the 170-second timeline.',
          whyItMatters: 'Allows comparing performance across different stages of the profile.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-7-workload-designer',
      labType: 'workload_designer',
      title: 'Lab 7: Workload Profile Designer & Multi-Scenario Simulator',
      subtitle: 'Design, simulate, and compare Load, Stress, and Spike workload models with realistic percentile calculations',
      instructionSteps: [
        'Select Scenario A: Standard Load Test (50 Users, 30s ramp-up, 90s hold, 15s ramp-down, 1.5s think time).',
        'Run Scenario A simulation and record: Average Latency, 95th Percentile, Max Throughput, and Error Rate.',
        'Switch to Scenario B: Extreme Spike Test (150 Users, 5s ramp-up, 40s hold, 5s ramp-down, 0.5s think time).',
        'Run Scenario B simulation and observe the impact of sudden concurrency on socket queues and error spikes.',
        'Compare the two scenarios in the Side-by-Side Comparison Matrix.',
      ],
      starterConfig: {
        profileType: 'load',
        users: 50,
        rampUpSeconds: 30,
        holdDurationSeconds: 90,
        rampDownSeconds: 15,
        thinkTimeSeconds: 1.5,
      },
      expectedSuccessCriteria: [
        'Successfully executes both Scenario A (Load) and Scenario B (Spike).',
        'Records 95th percentile comparison between steady load and traffic spike.',
        'Explains why Scenario B induces server queue contention.',
      ],
      hints: [
        'Notice how the 95th percentile in Scenario B escalates dramatically even though average latency increases more modestly.',
        'Spike testing highlights connection pool saturation before auto-scaling has time to trigger.',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-7-workload-selection',
      title: 'Challenge: Recommend the Optimal Workload Model for a Flash Sale',
      scenario: 'A luxury brand is launching a limited-edition sneaker drop at 10:00:00 AM on Saturday. 10,000 users are expected to hit the product and checkout endpoints within the first 60 seconds.',
      goal: 'Select and configure the correct test profile, specify the ramp-up and hold times, and justify why a standard trapezoid load test is insufficient.',
      solutionCriteria: [
        'Select Spike Testing as the primary test type.',
        'Configure a steep ramp-up (10–30 seconds) to mirror sudden user arrival.',
        'Explain that a gradual 10-minute ramp-up would completely mask the concurrency bottleneck.',
      ],
      hints: [
        'A flash sale is an extreme spike—virtual users do not arrive gradually over 30 minutes.',
      ],
      commonPitfalls: [
        'Using a gentle 20-minute ramp-up for a flash sale scenario.',
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q7-1',
          question: 'What is the purpose of the "Steady State" (Hold Duration) phase in a load test?',
          options: [
            'To allow server components, caches, and connection pools to reach stable equilibrium and gather statistically valid measurements.',
            'To give the QA engineer time to take a break.',
            'To ensure all database records are deleted.',
            'To verify that the JMeter client CPU stays at 100%.',
          ],
          correctAnswerIndex: 0,
          explanation: 'The steady-state hold phase provides a stable operational window where transient startup fluctuations have settled, allowing accurate measurement of sustainable throughput and latency.',
        },
        {
          id: 'q7-2',
          question: 'If 100 virtual users have 0 seconds think time versus 2 seconds think time, what happens to the request rate hitting the server?',
          options: [
            'With 0 seconds think time, the request rate is dramatically higher because threads immediately fire new requests as soon as the previous response arrives.',
            'Think time has zero impact on request rate.',
            'With 2 seconds think time, the request rate increases.',
            'JMeter automatically ignores think time under load.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Zero think time means threads execute in a tight loop as fast as the network allows. Adding think time paces threads to reflect human behavior, lowering total request frequency to realistic levels.',
        },
        {
          id: 'q7-3',
          question: 'Which test type is specifically designed to uncover slow memory leaks and database connection pool exhaustion?',
          options: [
            'Spike Testing',
            'Endurance (Soak) Testing',
            'Smoke Testing',
            'Component Testing',
          ],
          correctAnswerIndex: 1,
          explanation: 'Endurance (Soak) testing runs continuous moderate load over many hours (6 to 24+ hours) specifically to detect slow memory leaks, resource exhaustion, and file handle leaks.',
        },
        {
          id: 'q7-4',
          question: 'What is a "Staircase" workload profile typically used for?',
          options: [
            'Stress testing to incrementally increase load in steps and pinpoint the exact breaking capacity of the system.',
            'Verifying that the website works on mobile devices.',
            'Testing network cable integrity.',
            'Running automated regression test cases.',
          ],
          correctAnswerIndex: 0,
          explanation: 'A staircase workload profile adds blocks of virtual users step-by-step (e.g. 50 -> 100 -> 150 -> 200) to observe how metrics degrade at each tier and identify the exact saturation threshold.',
        },
        {
          id: 'q7-5',
          question: 'Why should a load test incorporate a gradual "Ramp-Down" phase instead of abruptly aborting all threads?',
          options: [
            'To allow in-flight transactions and asynchronous queues to complete gracefully without corrupting test data or leaving half-finished records.',
            'Because JMeter cannot be stopped abruptly.',
            'To double the throughput metric.',
            'Ramp-down is only required for Java applications.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Gradual ramp-down prevents abrupt socket aborts, allowing pending transactions, payment callbacks, and message queues to complete naturally.',
        },
        {
          id: 'q7-6',
          question: 'In a Spike Test, if the server response time jumps to 8 seconds during the spike and remains at 8 seconds even 10 minutes after traffic drops back to baseline, what does this indicate?',
          options: [
            'The system failed to self-heal and entered a persistent degraded or deadlocked state.',
            'The test was 100% successful.',
            'The client computer running JMeter ran out of disk space.',
            'The network speed increased.',
          ],
          correctAnswerIndex: 0,
          explanation: 'If response times do not recover after load returns to baseline, the system has suffered thread lock, connection pool exhaustion, or severe GC thrashing and cannot self-heal.',
        },
      ],
    },
    daySummary:
      'You have mastered workload modelling, configured ramp-up, steady-state, and ramp-down phases, and evaluated the distinct operational goals of load, stress, spike, and endurance tests.',
  },

  // -------------------------------------------------------------------------
  // DAY 8
  // -------------------------------------------------------------------------
  {
    dayNumber: 8,
    slug: 'day-8',
    title: 'Results, Metrics & Bottleneck Analysis',
    subtitle: 'Aggregate Reports, percentiles, throughput, error rates, and diagnosing bottlenecks',
    badge: 'Day 8 • Metric Mastery',
    duration: '55 mins',
    beginnerFriendlyAnalogy: {
      headline: 'The Doctor\'s Warning: Why Averages Lie',
      concept: 'Metrics & The 95th Percentile: Finding the Hidden Pain Points',
      story: 'Imagine visiting a doctor who checks your heart monitor and smiles: "Good news! Over the last 24 hours, your average heart rate was an athletic 72 beats per minute!" But when you look closely at the chart, you notice your heart was beating at 220 bpm for 20 minutes while you were fainting. The arithmetic average completely hid your heart attack! In software, if 95 users load a simple page in 0.2 seconds, but 5 high-paying customers wait 25 seconds for their checkout page and give up, the average response time is 1.4 seconds (which looks great on paper), but 5% of your customers suffered a terrible outage. That is why professional performance engineers look at the 90th and 95th percentiles: it shows you the worst experience real users endured.',
      keyLesson: 'Never celebrate a good average. Always look at the 95th percentile to protect your slowest, most vulnerable users.',
      plainEnglishTerms: [
        { term: 'Average (Mean)', plainMeaning: 'Sum of all response times divided by total requests (often masks big spikes).' },
        { term: '95th Percentile (p95)', plainMeaning: '95% of users were faster than this number; only the slowest 5% took longer.' },
        { term: 'Bottleneck', plainMeaning: 'The narrowest funnel or slowest component that chokes the entire system (like a slow database query).' },
        { term: 'Error Rate', plainMeaning: 'The percentage of requests that failed with HTTP 500 server crashes or timeouts.' },
      ],
    },
    objectives: [
      'Interpret JMeter Aggregate Reports and Summary Reports.',
      'Analyze 90th, 95th, and 99th percentile response times, throughput, and error rates.',
      'Understand why arithmetic averages conceal critical performance bottlenecks.',
      'Differentiate between application CPU bottlenecks, database locks, and network latency.',
      'Distinguish correlation from proven root cause without making ungrounded assumptions.',
    ],
    introduction:
      'Running a performance test is only half the battle; the real value lies in correctly analyzing the results. Numbers like "Average response time: 280ms" often hide severe architectural issues. In Day 8, you will master percentiles, throughput calculations, error rates, and diagnostic techniques to identify genuine performance bottlenecks.',
    visualExplanation: {
      title: 'Response Time Distribution & The Percentile Breakdown',
      diagramType: 'curve',
      description: 'Why the 95th percentile tells the true user story that the average obscures.',
      stepsOrStages: [
        { name: 'Average (Mean): 240ms', detail: 'Deceptively fast. Pulls the center of gravity down due to the large volume of quick requests.' },
        { name: 'Median (50th): 180ms', detail: '50% of all requests completed faster than 180ms.' },
        { name: '90th Percentile: 450ms', detail: '90% of requests completed under 450ms.' },
        { name: '95th Percentile: 2,800ms', detail: 'The slowest 5% of users experienced severe 2.8-second delays due to database locking!' },
        { name: '99th Percentile: 5,400ms', detail: 'The top 1% suffered extreme latency or gateway timeouts.' },
      ],
    },
    topics: [
      {
        title: 'Deconstructing the JMeter Aggregate Report',
        summary: 'Understanding every column in JMeter’s standard tabular benchmark report.',
        explanation:
          'The Aggregate Report provides key statistical metrics for each sampler:\n- Samples: Total number of requests executed for this label.\n- Average: Arithmetic mean elapsed time (in ms).\n- Median: The 50th percentile—exactly half the requests were faster, half slower.\n- 90% Line (90th Percentile): 90% of requests completed in this time or faster.\n- 95% Line (95th Percentile): 95% of requests completed in this time or faster.\n- 99% Line (99th Percentile): 99% of requests completed in this time or faster.\n- Min / Max: Absolute fastest and slowest recorded sample.\n- Error %: Percentage of requests that resulted in an error (HTTP status failure or assertion failure).\n- Throughput: Requests processed per second (req/sec or transactions/sec).\n- Received / Sent KB/sec: Network bandwidth consumed.',
        realWorldExample: 'A payment endpoint with 1,000 samples has an Average of 310ms, but its 95th percentile is 4,100ms and Error is 2.5%. This indicates intermittent database connection timeouts.',
        jmeterElementMapping: {
          elementName: 'Aggregate Report',
          category: 'Listener',
          purpose: 'Displays comprehensive summary statistics and percentiles per sampler label.',
          keySettings: ['Include group name in label', 'Save table data to CSV'],
          officialDocRef: 'https://jmeter.apache.org/usermanual/component_reference.html#Aggregate_Report',
        },
        commonMistakes: [
          'Looking only at the Average column and declaring the test a success when the 95th percentile is unacceptable.',
        ],
        keyTakeaways: [
          'Always evaluate 90th and 95th percentiles alongside throughput and error percentage.',
        ],
      },
      {
        title: 'Common Bottleneck Patterns',
        summary: 'Identifying whether a bottleneck originates in CPU, memory, database, or network.',
        explanation:
          '1. Database Query / Index Bottleneck:\n- Symptoms: Response times increase dramatically as concurrency rises, while app server CPU remains low (e.g. 20%). Database server CPU or disk I/O is at 100%, or DB connection pool reaches max limit.\n2. Application CPU Saturation:\n- Symptoms: Response times increase linearly; app server CPU stays pinned at 90–100%. Throughput hits an absolute ceiling.\n3. Memory Leak / GC Pauses:\n- Symptoms: Periodic spikes in response time every few minutes where ALL requests pause for 3–5 seconds (Stop-The-World garbage collection), followed by eventual OutOfMemoryError.\n4. Network Bandwidth Saturation:\n- Symptoms: Response times grow for large payloads (e.g. downloading images/reports) while CPU remains low; network interface utilization reaches 95%+.',
        realWorldExample: 'If a catalog search endpoint averages 150ms with 10 users, but jumps to 3,500ms with 50 users while server CPU is only 15%, the bottleneck is almost certainly slow database queries or connection pool exhaustion.',
        commonMistakes: [
          'Assuming high response time is automatically a code bug without inspecting database queries or server CPU/memory.',
        ],
        keyTakeaways: [
          'Correlate JMeter client-side metrics with server-side infrastructure metrics (CPU, RAM, DB connections).',
        ],
      },
      {
        title: 'Correlation vs. Proven Root Cause',
        summary: 'Reporting performance findings responsibly without guessing.',
        explanation:
          'A performance test report must distinguish between what is OBSERVED and what is PROVEN:\n- Observed Evidence: "At 100 concurrent users, the 95th percentile response time of POST /checkout increased from 320ms to 4,200ms with a 3.5% error rate."\n- Hypothesis: "This latency spike correlates with database connection pool limits observed in monitoring."\n- Proven Root Cause: Only claimed when database profiling logs (e.g. slow query log, connection wait events) confirm that threads spent 3,800ms waiting for an available connection from HikariCP.\n\nNever state an unverified guess as a fact in executive reports.',
        realWorldExample: 'Reporting "The backend code is poorly written" is unprofessional and unproven. Reporting "The /checkout endpoint breached the 1,500ms SLA at 80 concurrent users, and APM traces show 85% of time was spent in database lock contention" is rigorous and actionable.',
        commonMistakes: [
          'Claiming a specific microservice is broken without reviewing server-side logs or APM traces.',
        ],
        keyTakeaways: [
          'Report concrete metrics objectively; separate observed data from hypotheses until proven.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Exploring an Aggregate Report & Filtering Outliers',
      description: 'Analyze sample performance test results across 4 endpoints to locate a hidden latency outlier.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Inspect Endpoint Comparison Table',
          uiTarget: 'Aggregate Report Table',
          expectedBehavior: 'Observe 4 endpoints: /home, /search, /cart, /checkout.',
          whyItMatters: 'Identifies which endpoint is dragging down overall system performance.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Compare Average vs. 95th Percentile',
          uiTarget: 'Column Sort -> 95th Percentile',
          expectedBehavior: 'Notice /checkout has an average of 420ms, but a 95th percentile of 3,850ms!',
          whyItMatters: 'Demonstrates how the average disguises severe degradation for 5% of users.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Inspect Slow Sample Outliers',
          uiTarget: 'Outlier Inspector Drawer',
          expectedBehavior: 'Examine raw request logs where checkout exceeded 3,000ms; note database lock wait times.',
          whyItMatters: 'Provides evidence to substantiate performance findings.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-8-results-dashboard',
      labType: 'metrics_dashboard',
      title: 'Lab 8: Interactive Results Explorer & Bottleneck Analyzer',
      subtitle: 'Analyze simulated multi-endpoint performance datasets, calculate percentiles, and diagnose bottlenecks',
      instructionSteps: [
        'Load the sample benchmark dataset containing 1,000 requests across 4 endpoints.',
        'Review the Aggregate Report table: compare Samples, Average, Median, 90th%, 95th%, and Error %.',
        'Use the filter toggle to isolate endpoints with an error rate > 0% or 95th percentile > 1,500ms.',
        'Inspect the Slowest Request Samples panel to observe error messages and status codes.',
        'Draft an objective 2-sentence diagnostic summary identifying the primary bottleneck endpoint.',
      ],
      starterConfig: {
        totalSamples: 1000,
        endpoints: ['GET /api/v1/home', 'GET /api/v1/search', 'POST /api/v1/cart', 'POST /api/v1/checkout'],
        filterThresholdMs: 1500,
      },
      expectedSuccessCriteria: [
        'Correctly identifies POST /api/v1/checkout as the bottleneck endpoint.',
        'Identifies that while average response is 420ms, 95th percentile is 3,850ms.',
        'Identifies the 2.8% error rate on checkout caused by payment gateway connection timeouts.',
      ],
      hints: [
        'Sort by the "95% Line" column in the table.',
        'Check the error distribution: notice that errors are concentrated exclusively in the checkout endpoint.',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-8-diagnose-misleading-average',
      title: 'Challenge: Defend Your SLA Finding Against an Executive Query',
      scenario: 'The Product Manager says: "Our monitoring tool says average response time across the entire site is 250ms, well below our 500ms SLA. Why is your performance report claiming the site failed the SLA?"',
      goal: 'Write a professional, metric-backed response explaining why the average is misleading and how the 95th percentile of checkout breached the contractual SLA.',
      solutionCriteria: [
        'Explain that high-volume lightweight endpoints (like /home at 80ms) pull down the aggregate site average.',
        'Point out that the critical revenue-generating transaction (POST /checkout) has a 95th percentile of 3,850ms, meaning 1 in 20 buyers waits nearly 4 seconds.',
        'Cite Little’s Law and user retention statistics demonstrating why tail latency directly impacts conversion.',
      ],
      hints: [
        'Averages weight all requests equally—ten fast 50ms requests cancel out one disastrous 2,500ms checkout in an average.',
      ],
      commonPitfalls: [
        'Arguing emotionally rather than citing concrete percentile metrics and specific endpoint distributions.',
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q8-1',
          question: 'In an Aggregate Report, what does the "95% Line" value of 1,200ms indicate?',
          options: [
            '95% of all requests completed in 1,200 milliseconds or faster; the remaining 5% took longer than 1,200ms.',
            'The test ran for 95 minutes.',
            '95 requests out of 100 failed with an error.',
            'The server CPU utilization was 95%.',
          ],
          correctAnswerIndex: 0,
          explanation: 'The 95th percentile means that 95% of measured samples completed within 1,200ms or less, while the slowest 5% experienced latencies exceeding 1,200ms.',
        },
        {
          id: 'q8-2',
          question: 'If application server CPU is only 18%, but response times spike to 4,000ms under load, which of the following is the most probable bottleneck?',
          options: [
            'Database connection pool exhaustion or unindexed slow database queries causing app threads to wait.',
            'Application server CPU overheating.',
            'JMeter client computer running out of battery.',
            'The HTTP method is set to GET instead of POST.',
          ],
          correctAnswerIndex: 0,
          explanation: 'When app server CPU is low while latency is high, app server worker threads are blocked waiting on an external dependency—most commonly database query execution or an exhausted connection pool.',
        },
        {
          id: 'q8-3',
          question: 'What is the primary danger of relying on arithmetic average (mean) response time as the sole performance metric?',
          options: [
            'Averages conceal long-tail latency outliers experienced by high-value users.',
            'Averages cannot be calculated for more than 100 requests.',
            'Averages are only supported in non-GUI mode.',
            'Averages automatically exclude failed requests.',
          ],
          correctAnswerIndex: 0,
          explanation: 'A large volume of fast, simple requests pulls the arithmetic average down, masking severe delays experienced by users on complex, mission-critical transactions.',
        },
        {
          id: 'q8-4',
          question: 'What is Throughput in a JMeter report typically measured in?',
          options: [
            'Requests per second (req/sec) or transactions per second (TPS)',
            'Gigabytes per hour',
            'Number of threads running',
            'Milliseconds per request',
          ],
          correctAnswerIndex: 0,
          explanation: 'Throughput represents the rate of transactions or requests successfully processed by the server per unit of time, standardly expressed as requests/second or transactions/minute.',
        },
        {
          id: 'q8-5',
          question: 'What constitutes a "proven root cause" versus an "observed correlation" in performance engineering?',
          options: [
            'An observed correlation is an association in time (e.g. latency rose when DB CPU rose); a proven root cause requires definitive diagnostic evidence (e.g. thread dumps, lock wait profiles) confirming that the DB lock caused the thread blockage.',
            'An observed correlation is written by junior QA; a proven root cause is written by a manager.',
            'A proven root cause only applies to hardware crashes.',
            'They mean the exact same thing.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Observing two metrics rise simultaneously is correlation. Proving root cause requires forensic traces (thread dumps, query execution plans, connection pool telemetry) demonstrating the exact mechanism of failure.',
        },
        {
          id: 'q8-6',
          question: 'During a load test, the error rate suddenly spikes to 100% with `Connection Refused` on all endpoints. What does this indicate?',
          options: [
            'The target web server or load balancer has crashed, stopped listening on the port, or closed the connection queue.',
            'The virtual users successfully completed their shopping flow.',
            'The test data in the CSV file was formatted as JSON.',
            'JMeter has finished the steady-state hold duration.',
          ],
          correctAnswerIndex: 0,
          explanation: '`Connection Refused` means the target host is reachable at the network layer, but no active process is listening on the target port—the web server process has crashed or its socket backlog is full.',
        },
      ],
    },
    daySummary:
      'You have mastered Aggregate Report interpretation, percentiles (90th, 95th, 99th), throughput, error rates, and diagnosing bottlenecks responsibly.',
  },

  // -------------------------------------------------------------------------
  // DAY 9
  // -------------------------------------------------------------------------
  {
    dayNumber: 9,
    slug: 'day-9',
    title: 'Non-GUI Execution, Reports & Test Strategy',
    subtitle: 'Command-line execution, HTML dashboard generation, dynamic properties, and CI/CD integration',
    badge: 'Day 9 • Checkpoint 3',
    duration: '50 mins',
    beginnerFriendlyAnalogy: {
      headline: 'Stripping Out the Car Seats for a Race',
      concept: 'Running JMeter Headless: Why the Terminal Command-Line is Your Best Friend',
      story: 'When race car drivers prepare a car for the track, they don\'t keep the heavy leather passenger seats, the air conditioning unit, or the stereo system. They strip all that extra weight out so every ounce of engine horsepower goes straight to the wheels. The JMeter graphical app (with all its buttons, menus, and trees) is very heavy on your computer\'s memory and CPU. If your laptop is sweating just trying to paint buttons and charts on your screen, it won\'t have enough power left to generate real user traffic! Running JMeter from the command line in "Non-GUI mode" strips away the heavy screen graphics so 100% of your computer\'s energy goes directly into testing your website.',
      keyLesson: 'Use the friendly graphical app to design your test plan, but always use the terminal command line to run the actual test.',
      plainEnglishTerms: [
        { term: 'Non-GUI (Headless) Mode', plainMeaning: 'Running JMeter from the black terminal window without opening the heavy desktop app.' },
        { term: '-n flag', plainMeaning: 'Tells JMeter: "Run non-GUI mode (no graphics window)".' },
        { term: '-t flag', plainMeaning: 'Specifies which Test Plan file (.jmx) you want to run.' },
        { term: '-l flag', plainMeaning: 'Specifies the results log file (.jtl) where raw times are recorded.' },
        { term: '-e -o flags', plainMeaning: 'Tells JMeter to automatically generate a beautiful HTML dashboard report.' },
      ],
    },
    objectives: [
      'Understand why GUI mode is strictly for test authoring and Non-GUI mode is mandatory for execution.',
      'Construct complete, valid JMeter CLI commands with all required parameters.',
      'Generate automated HTML dashboard reports containing APDEX, over-time graphs, and latency percentiles.',
      'Override test plan parameters dynamically using JMeter properties (-Jthreads=50).',
      'Integrate JMeter execution into automated CI/CD pipelines (Jenkins, GitHub Actions).',
      'Complete Cumulative Practical Checkpoint 3 (Days 7–9).',
    ],
    introduction:
      'The Apache JMeter graphical user interface (GUI) is designed exclusively for building, configuring, and debugging test plans. When generating real load, running JMeter in GUI mode consumes massive memory and CPU to render graphics, corrupting timing measurements and causing client-side crashes. Serious load testing is always executed via the command line (CLI / Non-GUI mode).',
    visualExplanation: {
      title: 'JMeter CLI Execution & HTML Dashboard Generation Pipeline',
      diagramType: 'flow',
      description: 'The end-to-end command-line workflow from test plan to interactive HTML dashboard.',
      stepsOrStages: [
        { name: '1. Test Plan (.jmx)', detail: 'Developed and debugged in GUI; saved cleanly without active graphical listeners.' },
        { name: '2. CLI Execution', detail: '`jmeter -n -t test.jmx -l results.jtl -e -o ./report`' },
        { name: '3. Raw Results (.jtl)', detail: 'Streamed to disk in lightweight CSV/XML format; zero GUI rendering overhead.' },
        { name: '4. HTML Dashboard Generator', detail: 'JMeter processes .jtl into an interactive web dashboard with APDEX, charts, and tables.' },
        { name: '5. Stakeholder Review', detail: 'Reports shared with engineering teams or published as CI/CD artifacts.' },
      ],
    },
    topics: [
      {
        title: 'Why Non-GUI (CLI) Mode is Mandatory for Load Testing',
        summary: 'GUI resource consumption versus lightweight headless execution.',
        explanation:
          'When JMeter runs in GUI mode, every single HTTP response requires the Java Swing engine to allocate memory, paint pixels, update trees, and manage UI state. Under high concurrency, this causes:\n1. False Client-Side Latency: JMeter spends time rendering instead of sending packets, reporting artificially high response times.\n2. Java Virtual Machine (JVM) OutOfMemoryError crashes.\n3. CPU Throttling on the load generator.\n\nNon-GUI mode runs headless with minimal CPU and memory, writing sample results directly to a lightweight `.jtl` file on disk.',
        realWorldExample: 'A laptop running JMeter GUI might crash at 150 threads. The same laptop in non-GUI mode can easily generate 1,500+ threads cleanly.',
        commonMistakes: [
          'Running a benchmark in GUI mode and presenting the results to engineering leadership.',
        ],
        keyTakeaways: [
          'GUI is for test creation and debugging; CLI is for real load generation.',
        ],
      },
      {
        title: 'Anatomy of the JMeter CLI Command',
        summary: 'Deconstructing every essential flag and option in jmeter -n.',
        explanation:
          'Standard command syntax:\n`jmeter -n -t /path/to/test.jmx -l /path/to/results.jtl -e -o /path/to/dashboard_folder/`\n\nFlags explained:\n- `-n`: Mandatory. Tells JMeter to run in Non-GUI mode.\n- `-t`: Path to the input `.jmx` test plan file.\n- `-l`: Path to the raw results log file (`.jtl` or `.csv`). This file must NOT already exist, or JMeter will append to it.\n- `-e`: Instructs JMeter to generate an HTML dashboard report after the test completes.\n- `-o`: Output directory for the HTML dashboard. Crucial rule: This folder must either be EMPTY or NOT exist! JMeter refuses to overwrite an existing folder to protect historical data.\n\nDynamic Properties with `-J`:\n`-Jthreads=100 -Jrampup=60 -Jhost=staging.api.com`\nIn your test plan, reference them using `${__P(threads, 10)}`. This allows running 10 users in staging and 500 in performance without modifying the `.jmx` file!',
        realWorldExample: '`jmeter -n -t tests/ecom.jmx -l logs/run1.jtl -e -o ./reports/run1/ -Jthreads=50` executes 50 threads and produces an HTML dashboard.',
        commonMistakes: [
          'Specifying an existing, non-empty directory for `-o`, causing JMeter to immediately abort execution with an error.',
          'Omitting the `-n` flag, which accidentally launches the full GUI.',
        ],
        keyTakeaways: [
          'Always use `-n`, `-t`, `-l`, `-e`, and `-o`. Ensure the output folder is empty.',
          'Use `-J` properties to parameterize tests across environments.',
        ],
      },
      {
        title: 'JMeter HTML Dashboard & CI/CD Pipelines',
        summary: 'Automating performance verification in GitHub Actions and Jenkins.',
        explanation:
          'The JMeter HTML Dashboard generates a comprehensive reporting portal:\n- APDEX (Application Performance Index): Scores user satisfaction from 0 to 1 based on defined target thresholds.\n- Response Times Over Time & Percentiles Over Time.\n- Throughput (Transactions Per Second) vs Concurrency.\n- Detailed Error Breakdown table.\n\nCI/CD Integration:\nIn GitHub Actions or Jenkins, JMeter runs headlessly on every pull request or nightly build. A post-build script checks if Error % > 1% or 95th Percentile > 1,500ms; if so, it fails the build, preventing performance regressions from reaching production.',
        realWorldExample: 'A nightly GitHub Actions workflow runs JMeter against the staging environment, publishes the HTML report as a workflow artifact, and posts a summary comment to Slack.',
        commonMistakes: [
          'Failing to preserve the generated `.jtl` and HTML report artifacts in the CI/CD pipeline.',
        ],
        keyTakeaways: [
          'JMeter HTML dashboards provide executive-ready metrics including APDEX and time-series charts.',
          'Automated CI/CD performance gates prevent latency regressions.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Building a Production Non-GUI Command',
      description: 'Use the interactive command constructor to configure a complete CLI command and simulate terminal execution.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Select Test Plan & Results Log',
          uiTarget: 'Test Plan file selector',
          expectedBehavior: 'Selects "ecommerce_load.jmx"; sets log to "results_run_01.jtl".',
          whyItMatters: 'Specifies input script and raw metrics destination.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Configure HTML Report Directory',
          uiTarget: 'Report Directory input',
          expectedBehavior: 'Sets directory to "./html_report_run_01/".',
          whyItMatters: 'Enables automatic HTML dashboard compilation.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Add Dynamic JVM Properties',
          uiTarget: 'Properties Builder',
          expectedBehavior: 'Adds -Jthreads=75 -Jduration=180.',
          whyItMatters: 'Overrides test plan variables dynamically from the command line.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-9-command-line-builder',
      labType: 'command_line_builder',
      title: 'Lab 9: Production JMeter CLI Command Constructor',
      subtitle: 'Construct, validate, and simulate headless JMeter execution and HTML dashboard generation',
      instructionSteps: [
        'Select the target test plan: "tests/api_checkout_v2.jmx".',
        'Enable Non-GUI mode (-n).',
        'Specify the results log file: "logs/baseline_results.jtl".',
        'Enable the HTML dashboard generator (-e) and set output directory to "reports/run_2026/".',
        'Add a dynamic property overriding thread count: "-Jusers=100".',
        'Click "Execute Simulated Command" to view the simulated terminal output, live thread progress, and final HTML dashboard summary.',
      ],
      starterConfig: {
        testPlan: 'tests/api_checkout_v2.jmx',
        isNonGui: true,
        logFile: 'logs/baseline_results.jtl',
        generateDashboard: true,
        outputDir: 'reports/run_2026/',
        properties: { users: 100 },
      },
      expectedSuccessCriteria: [
        'All required flags (-n, -t, -l, -e, -o) included in the generated command string.',
        'Output directory formatted cleanly without illegal characters.',
        'Dynamic property -Jusers=100 formatted correctly.',
        'Simulated terminal logs show successful execution without JVM errors.',
      ],
      hints: [
        'Remember that the output folder for `-o` must be empty or new.',
        'Use `-Jname=value` for JMeter properties (e.g. `-Jusers=100`).',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-9-fix-broken-cli-command',
      title: 'Challenge: Fix 3 Critical Mistakes in a Broken CLI Command',
      scenario: 'A DevOps engineer set up a nightly CI job with the command: `jmeter -t test.jmx -o existing_reports/ -J threads=50`. The build failed with three distinct errors.',
      goal: 'Identify the 3 mistakes (missing -n, space in -J, and non-empty output directory without -l or -e) and construct the correct command.',
      brokenConfiguration: {
        rawCommand: 'jmeter -t test.jmx -o existing_reports/ -J threads=50',
        errors: [
          'Error: Missing -n flag (GUI tried to open in headless Linux server)',
          'Error: Missing -l results log file required for -e report generation',
          'Error: Directory existing_reports is not empty',
        ],
      },
      solutionCriteria: [
        'Add `-n` flag.',
        'Add `-l results.jtl` and `-e` flags.',
        'Specify a new, empty directory for `-o` (e.g. `./new_report/`).',
        'Remove the space in `-Jthreads=50`.',
      ],
      hints: [
        'JMeter properties cannot have spaces between `-J` and the property name.',
        'The `-e` flag requires `-l` to read raw data from.',
      ],
      commonPitfalls: [
        'Forgetting that `-e` cannot generate a report without `-l` providing the source log.',
      ],
    },
    checkpointReview: {
      id: 'checkpoint-3',
      title: 'Cumulative Practical Checkpoint 3 (Days 7–9)',
      coveredDays: 'Days 7, 8, and 9',
      scenarioDescription: 'Consolidate workload modelling, statistical metric interpretation, and CLI execution strategy before embarking on the Final Capstone Project.',
      practicalTasks: [
        {
          taskNumber: 1,
          description: 'Explain why running JMeter GUI inside a Jenkins Docker container fails.',
          actionRequired: 'Headless Linux containers have no X11 display server and limited memory; Non-GUI mode (-n) is required.',
          validationCheck: 'Explains headless server requirements.',
        },
        {
          taskNumber: 2,
          description: 'Given an Aggregate Report where Throughput = 150 req/sec and Average = 200ms, calculate active concurrency using Little’s Law.',
          actionRequired: 'Concurrency = Throughput × Response Time = 150 × 0.200s = 30 concurrent users.',
          validationCheck: 'Applies Little’s Law correctly.',
        },
      ],
      reviewQuestions: [
        {
          id: 'cp3-q1',
          question: 'What does the `-J` flag do when executing JMeter from the command line?',
          options: [
            'Defines a JMeter property accessible in test plans via the `${__P(name)}` function.',
            'Forces JMeter to run with Java 8.',
            'Deletes the JTL file after test completion.',
            'Starts a Java remote server.',
          ],
          correctAnswerIndex: 0,
          explanation: '`-Jproperty_name=value` defines a local JMeter property that can be dynamically read inside the test plan using the `${__P(property_name)}` function.',
        },
        {
          id: 'cp3-q2',
          question: 'What error does JMeter display if the directory specified by the `-o` flag already contains files from a previous run?',
          options: [
            '"Results directory is not empty, aborting execution"',
            '"File not found"',
            '"404 Not Found"',
            '"Invalid test plan"',
          ],
          correctAnswerIndex: 0,
          explanation: 'To prevent accidental data loss of historical benchmarks, JMeter strictly refuses to generate an HTML report into an existing non-empty directory.',
        },
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q9-1',
          question: 'Why does the official Apache JMeter documentation strictly state: "Don’t use GUI mode for load testing!"?',
          options: [
            'GUI mode consumes excessive CPU and heap memory to paint graphic elements, introducing client-side delays and causing false latency measurements.',
            'GUI mode is deprecated in JMeter 5.6.3.',
            'GUI mode only supports 1 HTTP sampler.',
            'GUI mode does not support assertions.',
          ],
          correctAnswerIndex: 0,
          explanation: 'The graphical interface consumes substantial memory and CPU cycles to render trees and graphs, resulting in client-side bottlenecks that distort real test measurements.',
        },
        {
          id: 'q9-2',
          question: 'In the command `jmeter -n -t plan.jmx -l log.jtl -e -o ./report/`, what does the `-e` flag accomplish?',
          options: [
            'Generates an interactive HTML dashboard report automatically after the test finishes.',
            'Encrypts the results file with AES-256.',
            'Emails the test results to the administrator.',
            'Ends the test after 10 errors.',
          ],
          correctAnswerIndex: 0,
          explanation: 'The `-e` flag instructs JMeter to process the raw `.jtl` results file and compile a full HTML dashboard report in the directory specified by `-o`.',
        },
        {
          id: 'q9-3',
          question: 'What requirement must the directory specified by the `-o` flag satisfy?',
          options: [
            'It must either be completely empty or not exist prior to running the command.',
            'It must contain at least one `.html` file.',
            'It must be named "jmeter_reports".',
            'It must be located on an external USB drive.',
          ],
          correctAnswerIndex: 0,
          explanation: 'JMeter strictly refuses to overwrite existing files in the report directory to safeguard past test history. The directory must be empty or will be created if it does not exist.',
        },
        {
          id: 'q9-4',
          question: 'How do you read a command-line property passed via `-Jusers=50` inside a JMeter Test Plan?',
          options: [
            '${__P(users, 1)}',
            '${users}',
            '#users',
            'env.users',
          ],
          correctAnswerIndex: 0,
          explanation: 'JMeter properties passed via `-J` are accessed using the `${__P(property_name, default_value)}` function.',
        },
        {
          id: 'q9-5',
          question: 'What is APDEX in the JMeter HTML dashboard?',
          options: [
            'Application Performance Index: A standard metric (0 to 1) representing user satisfaction based on target and tolerated response time thresholds.',
            'Apache Development Index: Measures code quality.',
            'A plugin required to run JMeter in Docker.',
            'The total number of HTTP requests sent.',
          ],
          correctAnswerIndex: 0,
          explanation: 'APDEX (Application Performance Index) measures user satisfaction by categorizing response times into Satisfied (T), Tolerating (4T), and Frustrated (>4T), returning a standardized ratio between 0 and 1.',
        },
        {
          id: 'q9-6',
          question: 'In a modern CI/CD pipeline (e.g. GitHub Actions), what is a "Performance Gate"?',
          options: [
            'An automated check that fails the build if error rate or 95th percentile latency exceeds defined SLA thresholds.',
            'A firewall blocking external IP addresses.',
            'A manual sign-off required by the QA lead.',
            'A paid license required to execute JMeter in the cloud.',
          ],
          correctAnswerIndex: 0,
          explanation: 'A performance gate is an automated threshold rule in a CI/CD pipeline that blocks deployment if latency percentiles or error rates breach acceptable limits.',
        },
      ],
    },
    daySummary:
      'You have mastered Non-GUI command-line execution, dynamic property overrides (-J), HTML dashboard generation, CI/CD integration, and completed Practical Checkpoint 3.',
  },

  // -------------------------------------------------------------------------
  // DAY 10
  // -------------------------------------------------------------------------
  {
    dayNumber: 10,
    slug: 'day-10',
    title: 'Final Project: Performance Test an E-Commerce API',
    subtitle: 'End-to-end performance test planning, execution, metric analysis, bottleneck diagnosis, and executive reporting',
    badge: 'Day 10 • Capstone Project',
    duration: '60 mins',
    beginnerFriendlyAnalogy: {
      headline: 'The Grand Opening Dress Rehearsal',
      concept: 'The Capstone Project: Putting Everything You Learned Together Step-by-Step',
      story: 'Before a world-famous restaurant opens its doors to the public, the head chef runs a full dress rehearsal. Friends and family are invited to sit at every table, order appetizers, drinks, main courses, and pay the bill, all at the same time. During the rehearsal, the chef discovers that while the pasta station is lighting fast, the dessert oven is too small and is causing a 25-minute delay! Because they found this out during the practice run, they fixed the oven before real paying customers arrived. That is exactly what you are doing in Day 10: running a complete dress rehearsal of an online store to spot the bottlenecks and save the company from a disastrous launch day crash!',
      keyLesson: 'You are now ready to think like a professional Performance Engineer who solves real problems before they impact real users.',
      plainEnglishTerms: [
        { term: 'Capstone Deliverable', plainMeaning: 'Your final portfolio project showing you can run an end-to-end performance test from start to finish.' },
        { term: 'Baseline vs Peak', plainMeaning: 'Comparing how the website behaves on a quiet Tuesday morning (baseline) vs a busy Friday evening (peak).' },
        { term: 'Executive Report', plainMeaning: 'A 1-page plain English summary for company managers explaining whether the site is ready for launch.' },
        { term: 'Performance Certificate', plainMeaning: 'Your officially verified RootAccess credential certifying your hands-on mastery.' },
      ],
    },
    objectives: [
      'Synthesize all 9 days of JMeter skills into an end-to-end performance testing deliverable.',
      'Construct a complete multi-step test plan: Auth, Search, Cart, and Checkout.',
      'Apply CSV parameterization and dynamic JSON correlation.',
      'Enforce Response and Duration assertions.',
      'Execute Baseline (10 Users) vs. Peak Load (50 Users) simulations.',
      'Identify the database lock bottleneck in the checkout service.',
      'Produce an executive-ready Performance Test Report evaluated against an automated rubric.',
      'Earn the official RootAccess Apache JMeter Performance Testing Certificate.',
    ],
    introduction:
      'Welcome to the Day 10 Capstone Project! In this comprehensive hands-on challenge, you will act as a Lead Performance Test Engineer tasked with validating an enterprise E-Commerce REST API ahead of a major product launch. You will define test objectives, build a multi-step test plan, parameterize customer data, correlate dynamic session tokens, run baseline and peak simulations, calculate percentiles, diagnose a critical checkout bottleneck, and compile an executive performance report.',
    visualExplanation: {
      title: 'Capstone E-Commerce User Journey Flow',
      diagramType: 'flow',
      description: 'The 4-step transaction workflow you will test under concurrent virtual user load.',
      stepsOrStages: [
        { name: '1. POST /api/v1/auth/login', detail: 'CSV credentials -> Extract dynamic JWT token (${authToken}).' },
        { name: '2. GET /api/v1/catalog/search', detail: 'CSV search keyword -> Assert HTTP 200 & product items present.' },
        { name: '3. POST /api/v1/cart/items', detail: 'Correlate token & product ID -> Assert item added to cart.' },
        { name: '4. POST /api/v1/orders/checkout', detail: 'Submit order -> Duration Assertion (<= 1,200ms) & Response Assertion.' },
      ],
    },
    topics: [
      {
        title: 'Capstone Project Structure and Requirements',
        summary: 'Seven required milestones to complete and pass the final evaluation.',
        explanation:
          'To earn your RootAccess Apache JMeter Performance Testing Certificate, you must complete the following 7 milestones in the Capstone Workbench:\n1. Test Plan Configuration: Configure 25 virtual users, 30s ramp-up, and 3 iterations.\n2. CSV Data Integration: Connect `users.csv` (`username,password,searchKeyword`).\n3. Header & Token Correlation: Extract `$.token` from login and pass `Authorization: Bearer ${token}` to subsequent calls.\n4. Assertion Enforcement: Validate HTTP 200 and set a 1,200ms duration threshold on checkout.\n5. Baseline vs. Peak Load Simulation: Execute both runs and compare 95th percentiles and throughput.\n6. Bottleneck Diagnosis: Analyze why the checkout endpoint degrades under peak load.\n7. Performance Test Report: Complete all sections of the executive report (Summary, Environment, Findings, Recommendations) and submit for rubric evaluation.',
        realWorldExample: 'This matches the exact deliverable expected by engineering VPs when hiring an SDET or Senior Performance Test Engineer.',
        commonMistakes: [
          'Skipping baseline testing and jumping straight into peak load without comparison data.',
          'Claiming the server is fine based on an average response time of 340ms while checkout 95th percentile is 3,200ms.',
        ],
        keyTakeaways: [
          'A professional performance test deliverable combines test design, metric analysis, and actionable engineering recommendations.',
        ],
      },
    ],
    guidedDemonstration: {
      title: 'Capstone Project Walkthrough',
      description: 'Review the 7-milestone capstone workflow inside the interactive workbench.',
      walkthroughSteps: [
        {
          stepNumber: 1,
          actionTitle: 'Configure Multi-Step Test Plan',
          uiTarget: 'Test Plan Tab',
          expectedBehavior: 'Verify 4 samplers are configured in sequence.',
          whyItMatters: 'Models a realistic multi-step customer journey.',
        },
        {
          stepNumber: 2,
          actionTitle: 'Run Baseline Simulation',
          uiTarget: 'Execution Tab -> Run Baseline',
          expectedBehavior: '10 users, 0% error rate, checkout avg: 210ms, 95th%: 340ms.',
          whyItMatters: 'Establishes healthy baseline SLA performance.',
        },
        {
          stepNumber: 3,
          actionTitle: 'Run Peak Load Simulation',
          uiTarget: 'Execution Tab -> Run Peak Load',
          expectedBehavior: '50 users, throughput plateaus, checkout 95th% spikes to 3,180ms with 4.2% timeout errors.',
          whyItMatters: 'Demonstrates the checkout bottleneck under concurrent load.',
        },
      ],
    },
    practicalLab: {
      id: 'lab-day-10-capstone-workbench',
      labType: 'capstone_project',
      title: 'Lab 10: Capstone Project Workbench',
      subtitle: 'Build, execute, analyze, and report on the E-Commerce API performance benchmark',
      instructionSteps: [
        'Complete Milestone 1: Configure Thread Group (25 Threads, 30s Ramp-Up, 3 Iterations).',
        'Complete Milestone 2: Configure CSV Data Set Config with columns "username,password,searchKeyword".',
        'Complete Milestone 3: Configure JSON Extractor on Login (`$.token`) and wire into Cart and Checkout headers.',
        'Complete Milestone 4: Add Duration Assertion (1,200ms) on Checkout.',
        'Complete Milestone 5: Run Baseline (10 users) and Peak Load (50 users) simulations.',
        'Complete Milestone 6: Analyze the Metric Comparison Table and identify the Checkout payment lock bottleneck.',
        'Complete Milestone 7: Fill out the Performance Test Executive Summary Report and click "Submit Project for Evaluation".',
      ],
      starterConfig: {
        threads: 25,
        rampUpSeconds: 30,
        loopCount: 3,
        baselineDone: false,
        peakDone: false,
        reportSubmitted: false,
      },
      expectedSuccessCriteria: [
        'All 7 milestones completed.',
        'Checkout bottleneck correctly identified and documented.',
        'Executive report satisfies rubric evaluation criteria with score >= 80%.',
        'Official Certificate unlocked.',
      ],
      hints: [
        'Notice how the Search endpoint handles 50 users with ease (~140ms), while Checkout degrades to 3,180ms. The bottleneck is isolated to checkout!',
        'Review the rubric criteria before submitting your executive report.',
      ],
    },
    independentChallenge: {
      id: 'challenge-day-10-executive-presentation',
      title: 'Challenge: Propose Architectural Remediation for the Checkout Bottleneck',
      scenario: 'The VP of Engineering asks: "We saw your report showing Checkout fails under 50 concurrent users due to database row locking on inventory tables. What 3 concrete technical steps should our backend team take to fix this before launch?"',
      goal: 'Provide 3 actionable engineering solutions to resolve database lock contention on inventory tables.',
      solutionCriteria: [
        '1. Implement Redis distributed caching / atomic decrements for real-time inventory reservation rather than pessimistic table row locks in PostgreSQL.',
        '2. Transition checkout payment authorization into an asynchronous background message queue (e.g. RabbitMQ / Kafka) with immediate 202 Accepted status.',
        '3. Increase the database connection pool limit (e.g. HikariCP max-pool-size from 20 to 100) and optimize the unindexed foreign key queries.',
      ],
      hints: [
        'Think about asynchronous processing, in-memory caching, and database connection pool tuning.',
      ],
      commonPitfalls: [
        'Suggesting vague solutions like "buy a bigger server" without architectural remediation.',
      ],
    },
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q10-1',
          question: 'In your Day 10 Capstone analysis, why did the Search endpoint remain fast under 50 users while the Checkout endpoint suffered severe latency spikes?',
          options: [
            'Search is a read-heavy operation easily served from cache; Checkout requires transactional writes, payment gateway communication, and row locks on inventory tables.',
            'JMeter was configured to skip the Search endpoint.',
            'Search endpoints do not consume server bandwidth.',
            'The test was executed in GUI mode.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Read queries can be cached in RAM and scale horizontally. Write transactions requiring strict ACID compliance, payment gateway round-trips, and row locks on inventory create serialization bottlenecks.',
        },
        {
          id: 'q10-2',
          question: 'What is the most effective architectural pattern to decouple synchronous payment processing from the user-facing checkout response?',
          options: [
            'Asynchronous message queueing (e.g. Kafka/RabbitMQ) returning HTTP 202 Accepted, processing payment out-of-band.',
            'Increasing the JMeter ramp-up period to 1 hour.',
            'Removing assertions from the test plan.',
            'Disabling database indexes.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Decoupling checkout via an asynchronous queue allows the user to receive immediate confirmation while the heavy payment and fulfillment processing executes out-of-band.',
        },
        {
          id: 'q10-3',
          question: 'If 95% of users complete checkout in 320ms, but 5% wait 4,200ms and 2% time out, has the system met an SLA of "All checkout transactions under 1,000ms"?',
          options: [
            'No, the system has clearly breached the SLA because the 95th and 99th percentiles exceed 1,000ms.',
            'Yes, because the average is under 1,000ms.',
            'Yes, as long as error rate is under 5%.',
            'SLA compliance is only measured at 50% median.',
          ],
          correctAnswerIndex: 0,
          explanation: 'An SLA of "All transactions under 1,000ms" means 100% of samples must satisfy the threshold. A 95th percentile of 4,200ms represents a severe breach.',
        },
        {
          id: 'q10-4',
          question: 'Which of the following is an example of an actionable recommendation in a performance test report?',
          options: [
            '"Increase HikariCP database pool size from 15 to 80 connections and add an index on orders(user_id, status) to eliminate the 3.8s lock contention observed at 50 users."',
            '"Make the website faster."',
            '"Rewrite the whole application in Rust."',
            '"Test with fewer users next time."',
          ],
          correctAnswerIndex: 0,
          explanation: 'Actionable recommendations state specific technical components, precise parameters, and the expected metric improvement.',
        },
        {
          id: 'q10-5',
          question: 'What document should be maintained in Git alongside JMeter `.jmx` files to ensure test reproducibility?',
          options: [
            'A Test Environment & Data Strategy specification detailing server specs, baseline assumptions, CSV formats, and test parameters.',
            'A screenshot of the desktop.',
            'A list of personal passwords.',
            'An MP4 video file.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Reproducibility requires documenting the exact server environment, database seeding procedures, test parameters, and network assumptions.',
        },
        {
          id: 'q10-6',
          question: 'What is the final step in a professional performance testing engagement after delivering the test report?',
          options: [
            'Conducting a results walkthrough with development and operations teams to review bottlenecks and schedule re-testing after optimizations are deployed.',
            'Deleting all test plans and logs immediately.',
            'Closing all Jira tickets without re-testing.',
            'Declaring that no further testing is ever needed.',
          ],
          correctAnswerIndex: 0,
          explanation: 'Performance testing is iterative: test -> analyze -> remediate -> re-test to verify that architectural optimizations resolved the bottleneck without introducing regressions.',
        },
      ],
    },
    daySummary:
      'Congratulations! You have completed the Day 10 Capstone Project, constructed an end-to-end performance test suite in Apache JMeter, diagnosed a real-world checkout bottleneck, and produced an executive report.',
  },
];
