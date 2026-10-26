import type { DevOpsDayUnit } from '../types/devopsCourse';

export const DEVOPS_DAY_1_DATA: DevOpsDayUnit = {
  dayNumber: 1,
  moduleNumber: 1,
  moduleTitle: 'Module 1 — DevOps Foundations',
  lessonTitle: 'Understanding DevOps and the Software Delivery Lifecycle',
  subtitle: 'Learn how modern engineering teams eliminate deployment friction, bridge the Dev-Ops divide, automate delivery, and measure reliability.',
  level: 'Beginner',
  estimatedHours: '2–3 Hours',
  prerequisites: 'No prior DevOps or programming experience required.',
  learningObjectives: [
    'Explain DevOps in your own words, distinguishing it from traditional siloed software delivery',
    'Identify common bottlenecks in legacy software engineering and how cross-functional collaboration resolves them',
    'Describe the end-to-end software delivery lifecycle from an initial code commit to a running production instance',
    'Clearly distinguish Continuous Integration (CI), Continuous Delivery (CD), and Continuous Deployment (CD)',
    'Explain why automation, telemetry, and fast feedback loops matter for operational stability and team velocity',
  ],

  topics: [
    {
      id: 'topic-1',
      topicNumber: 1,
      title: 'What Problem Does DevOps Solve?',
      durationMinutes: 20,
      explanation: `Imagine running a busy restaurant:
- **The Chefs (Developers):** They love inventing exciting new dishes and want to update the menu every single hour!
- **The Dining Room Managers (Operations):** They want peaceful, smooth service, spotless tables, and zero customer complaints!

In traditional software companies, these two groups worked in completely separate rooms with a locked door between them—a barrier engineers called the **"Wall of Confusion"**.

### The Old Way: The "Wall of Confusion"

> **The Problem:** Developers were rewarded for writing new features as fast as possible. Operations engineers were rewarded for keeping servers running 24/7 without crashes.

When a developer finished writing code on their personal laptop, they said:
- *"It works on my machine!"*
- Then they emailed a zip file to Operations and walked away.

When Operations tried to run that code on real servers, it often failed or crashed. Then the blame game began:
- **Developers argued:** *"Our code was fine! Your server must be broken."*
- **Operations argued:** *"Our servers are fine! Your code is full of bugs."*

### Enter DevOps: Working Together as One Team

**DevOps is simple:** It combines **Development** + **Operations**.

It is not just a software tool or an individual job title. It is a **team agreement to share ownership from start to finish**:
1. **Shared Goals:** Developers care about how their code runs in the real world, not just on their laptop.
2. **Early Collaboration:** Operations engineers help design systems early so releases are smooth and stress-free.
3. **Automated Bridges:** Instead of manual emails and handoffs, smart automated systems test and deploy code safely every day.`,
      keyTakeaways: [
        'DevOps brings software creators (Dev) and system caretakers (Ops) together as one unified team.',
        'Eliminates the painful "It works on my machine" problem by making environments identical.',
        'Focuses on frequent, safe, bite-sized updates instead of giant, risky releases.',
      ],
      commonPitfalls: [
        'Thinking DevOps is just downloading tools without improving team communication.',
        'Blaming individuals when a system fails instead of fixing the automated safeguards.',
      ],
    },
    {
      id: 'topic-2',
      topicNumber: 2,
      title: 'Development and Operations: Responsibilities and Collaboration',
      durationMinutes: 20,
      explanation: `In a modern DevOps team, engineers do not abandon their core skills. Instead, they collaborate openly so nobody is left alone in an emergency.

### Comparing the Old Siloed Way vs. Modern DevOps

| Key Area | The Old Siloed Way | The Modern DevOps Way |
| :--- | :--- | :--- |
| **Code Ownership** | Developers write code and hand off to others | Developers and Ops share ownership of live health |
| **Server Setup** | Done manually by memory or messy notes | Written as code in Git repositories (Infrastructure as Code) |
| **Release Schedule** | Once every 3 to 6 months (scary weekend marathons) | Small, smooth releases multiple times a day or week |
| **When Things Break** | People point fingers and assign blame | Blameless review: "How do we make the system safer?" |
| **Deployments** | Typing commands by hand under stress | Automated 1-click or fully automated deployment pipelines |

### The Power of a Blameless Culture

When something breaks in a traditional company, leaders ask: *"Who did this? Who typed that wrong command?"*
This makes engineers terrified of making changes or trying new ideas.

In a healthy DevOps culture, teams practice **Blameless Postmortems**. We know that humans are fallible. Instead of attacking a person, we ask:
- *"What safety check was missing that let this bug reach our users?"*
- *"How can our automated tests catch this next time within 30 seconds?"*
- *"Can we make rollbacks instant with a single click?"*`,
      keyTakeaways: [
        'Small, frequent updates carry 90% less risk than giant quarterly releases.',
        'Blameless postmortems fix the system guardrails instead of punishing team members.',
        'Server setups and configurations are stored in Git so anyone on the team can review them.',
      ],
      commonPitfalls: [
        'Holding a postmortem meeting but forgetting to automate the solution afterwards.',
        'Keeping developers isolated from seeing real user errors and crash reports.',
      ],
    },
    {
      id: 'topic-3',
      topicNumber: 3,
      title: 'From a Code Change to a Running Application',
      durationMinutes: 25,
      explanation: `How does an idea turn into a live feature used by millions of people? In DevOps, every change travels through a smooth continuous loop.

### The 9 Lifecycle Milestones

1. **Plan:** The team decides what to build next, breaking work into clear user stories.
2. **Code:** Developers write clean code and automated unit tests on their branch.
3. **Build:** When code is saved, automated servers compile it and bundle everything needed.
4. **Test:** Automated test robots run hundreds of checks to verify nothing is broken.
5. **Release:** The verified build is safely saved in a central storage locker (artifact registry).
6. **Deploy:** The code is rolled out to servers or cloud clusters with zero downtime for users.
7. **Operate:** Servers scale up automatically when traffic spikes (like during a flash sale).
8. **Monitor:** Dashboards track speed, page load times, error rates, and system health.
9. **Feedback:** Insights from live users flow right back into the next planning session.

> **Key Rule of DevOps:** Build once, deploy anywhere! We package code into one verified container and promote that exact same package to testing, staging, and live production.`,
      keyTakeaways: [
        'The delivery lifecycle is a continuous loop, not a one-time waterfall with a cliff.',
        'Never rebuild different code for production; test the exact package you plan to ship.',
        'Quick feedback loops allow teams to fix bugs when they are cheap and easy to resolve.',
      ],
      commonPitfalls: [
        'Rebuilding code on each server instead of promoting an immutable package.',
        'Skipping user feedback and flying blind after launching a new feature.',
      ],
    },
    {
      id: 'topic-4',
      topicNumber: 4,
      title: 'Automation and the Delivery Lifecycle',
      durationMinutes: 20,
      explanation: `Why do we automate? Because computers are fantastic at doing the exact same task thousands of times without getting tired, distracted, or making typos.

### What is "Toil"?
In engineering, **Toil** is repetitive, boring manual work that does not create lasting value and grows bigger as the company grows:
- Manually logging into 20 servers to paste a new file is toil.
- Manually running through a 50-step checklist before every release is toil.
- Manually rebooting a crashed service every morning is toil.

### How Automation Frees Engineers

When you write an automated script or pipeline:
- **It is Repeatable:** It runs identically every single time, whether at 2:00 PM or 3:00 AM.
- **It is Self-Documenting:** The script itself proves exactly how the system is configured.
- **It Scales Effortlessly:** Deploying to 5 servers or 500 servers takes the exact same script!

> **The Golden Rule:** If you find yourself doing a manual task more than twice, write a script or automated pipeline step to do it for you!`,
      keyTakeaways: [
        'Automation removes human error from critical server deployments.',
        'Eliminating toil gives engineers time to build valuable new product features.',
        'Automated workflows turn complex, scary operations into easy routine button clicks.',
      ],
      commonPitfalls: [
        'Trying to automate a messy, broken process before agreeing on how it should work.',
        'Writing mystery scripts that fail silently without telling the team what went wrong.',
      ],
    },
    {
      id: 'topic-5',
      topicNumber: 5,
      title: 'Continuous Integration, Continuous Delivery, and Continuous Deployment',
      durationMinutes: 25,
      explanation: `You will often hear three terms that sound very similar: **CI**, **CD**, and **CD**. Here is the simple, clear way to remember them:

### 1. Continuous Integration (CI) — Merging & Testing Often
- Developers share their code into the main project branch multiple times a day.
- Every time code is pushed, automated robots immediately build and test it.
- **Why it matters:** It prevents the nightmare of "Merge Conflict Hell" where team members spend days trying to combine weeks of separate work.

### 2. Continuous Delivery (CD) — Always Ready to Ship
- Every time code passes its tests, it is automatically packaged and tested in a realistic staging environment.
- The software is **always ready to release to real customers at any moment**.
- **The Key Detail:** A human (like a Product Manager or QA lead) clicks an "Approve Release" button to decide *when* it goes live.

### 3. Continuous Deployment (CD) — Hands-Free Automated Rollout
- This is the ultimate stage of automation: if all tests pass, the change is deployed to real users automatically!
- No human needs to click approve.
- If any test fails, the robot immediately stops everything and alerts the developer.

### Quick Cheat Sheet

| Level | What Happens Automatically? | Who Pushes to Production? |
| :--- | :--- | :--- |
| **CI (Continuous Integration)** | Code is compiled and tested | Nobody (just validates code) |
| **CD (Continuous Delivery)** | Packaged, tested, and staged | **A human clicks "Deploy"** |
| **CD (Continuous Deployment)** | Packaged, tested, and deployed | **100% Automatic Robot** |`,
      keyTakeaways: [
        'Continuous Integration (CI) catches bugs immediately when code is merged.',
        'Continuous Delivery keeps your code release-ready with a 1-click manual greenlight.',
        'Continuous Deployment automates the final rollout directly to users with zero manual steps.',
      ],
      commonPitfalls: [
        'Trying to do Continuous Deployment before having reliable, trustworthy automated tests.',
        'Confusing Continuous Delivery with Continuous Deployment in job interviews.',
      ],
    },
    {
      id: 'topic-6',
      topicNumber: 6,
      title: 'Feedback, Monitoring, and Continuous Improvement',
      durationMinutes: 20,
      explanation: `Deploying code to a server is only half the adventure. Once code is running live, how do we know our users are happy?

### The 4 DORA Metrics (How High-Performing Teams Measure Success)
Researchers studied thousands of engineering teams and found 4 simple numbers that separate top tech teams from struggling ones:

1. **Deployment Frequency:** How often do you ship?
   - *Top Teams:* Multiple times per day in small batches.
   - *Slow Teams:* Once every 3 to 6 months in terrifying mega-releases.
2. **Lead Time for Changes:** How long does it take from writing code to seeing it live?
   - *Top Teams:* Less than 1 hour.
   - *Slow Teams:* Months of waiting and paperwork.
3. **Change Failure Rate:** What percentage of releases cause an issue?
   - *Top Teams:* Under 15% (and usually caught immediately).
   - *Slow Teams:* Over 40% fail or require emergency hotfixes.
4. **Time to Restore Service (MTTR):** How fast can you recover from a crash?
   - *Top Teams:* Under 1 hour (often seconds via automatic rollback).
   - *Slow Teams:* Days of frantic debugging.

### "Shift Left": Catching Bugs Early
Imagine building a car. Is it cheaper to spot a loose bolt while the car is on the assembly line, or after the car has been sold and crashes on the highway?

**"Shifting Left"** means running safety tests, security checks, and code scans as early as possible—right on the developer's laptop!
- Finding a bug in your editor takes **2 minutes** to fix.
- Finding a bug in production takes **hours**, frustrates customers, and costs thousands of dollars!`,
      keyTakeaways: [
        'DORA metrics measure both speed (how fast you ship) and reliability (how stable the app is).',
        'Top engineering teams achieve high speed and high stability at the same time.',
        '"Shifting Left" tests security and quality as early as possible to save time and headaches.',
      ],
      commonPitfalls: [
        'Measuring vanity metrics like "lines of code written" instead of real customer reliability.',
        'Having monitoring dashboards that look pretty but nobody actually checks.',
      ],
    },
  ],

  checkpoints: [
    {
      id: 'cp-1',
      question: 'What is the primary operational conflict known as the traditional "Wall of Confusion"?',
      options: [
        'Developers using Windows while Operations engineers use macOS',
        'Developers being incentivized for rapid feature changes while Operations is incentivized for system uptime and stability',
        'Management refusing to pay for modern cloud computing tools',
        'QA engineers writing automated scripts in Python while developers code in Java',
      ],
      correctIndex: 1,
      explanation: 'The Wall of Confusion describes the fundamental clash where developers push for rapid changes while operations defends stability, leading to finger-pointing when deployments fail.',
    },
    {
      id: 'cp-2',
      question: 'What is the core distinction between Continuous Delivery and Continuous Deployment?',
      options: [
        'Continuous Delivery requires containers while Continuous Deployment does not',
        'Continuous Delivery requires a human approval gate before production deployment, whereas Continuous Deployment rolls out automatically once tests pass',
        'Continuous Delivery only applies to web applications; Continuous Deployment applies to mobile apps',
        'Continuous Delivery does not include automated testing in the pipeline',
      ],
      correctIndex: 1,
      explanation: 'In Continuous Delivery, every build is release-ready, but deployment to production is triggered manually by a human decision. In Continuous Deployment, production rollout is 100% automated upon passing all tests.',
    },
    {
      id: 'cp-3',
      question: 'What does "Shifting Left" mean in modern DevOps and DevSecOps engineering?',
      options: [
        'Moving operations staff into the development team office',
        'Performing testing, security evaluations, and quality validation as early as possible in the software lifecycle',
        'Reverting previous git commits when a production error occurs',
        'Shifting server infrastructure from eastern cloud regions to western cloud regions',
      ],
      correctIndex: 1,
      explanation: '"Shift-Left" means moving quality, security, and compliance verification earlier in the delivery timeline (during coding and initial CI) where defects are exponentially cheaper and faster to fix.',
    },
    {
      id: 'cp-4',
      question: 'Which of the following is considered "Toil" according to Google Site Reliability Engineering (SRE) principles?',
      options: [
        'Designing a fault-tolerant database replication architecture',
        'Writing an automated unit test suite for a payment calculation module',
        'Manually connecting to 15 servers via SSH every Tuesday to run a package update command',
        'Conducting a blameless postmortem to identify missing pipeline safeguards',
      ],
      correctIndex: 2,
      explanation: 'Toil is manual, repetitive, tactical work that scales linearly with system size and produces no enduring architectural value. Manually SSH-ing to update packages is classic toil that should be automated.',
    },
    {
      id: 'cp-5',
      question: 'Why are Blameless Postmortems critical to building a high-performing engineering culture?',
      options: [
        'They ensure that developers are never held accountable for broken code',
        'They replace automated testing with group discussion sessions',
        'They focus on discovering systemic and procedural weaknesses rather than punishing individuals, encouraging psychological safety and transparency',
        'They allow operations teams to delegate on-call duties to managers',
      ],
      correctIndex: 2,
      explanation: 'Blameless postmortems foster psychological safety so engineers openly share details of failures, allowing teams to harden pipeline guardrails rather than hiding mistakes out of fear of punishment.',
    },
  ],

  quizQuestions: [
    {
      id: 'q1',
      domain: 'DevOps Principles',
      question: 'Which of the following best defines the primary goal of DevOps?',
      options: [
        'Replacing all manual software testers with artificial intelligence tools',
        'Unifying software development and operations through shared ownership, automation, and continuous delivery',
        'Forcing all developers to manage their own physical server racks',
        'Ensuring that code is only released to production once per quarter',
      ],
      correctIndex: 1,
      explanation: 'DevOps is an organizational culture and methodology designed to break down silos between development and operations through shared ownership, automation, and fast feedback.',
    },
    {
      id: 'q2',
      domain: 'Silo Pathology',
      question: 'What is the classic symptom of the "It worked on my machine" syndrome?',
      options: [
        'The developer has a faster CPU than the production server',
        'Differences between local development environments and production servers cause software to fail upon deployment',
        'The operations team refused to grant the developer root access',
        'The application code was written without using object-oriented programming',
      ],
      correctIndex: 1,
      explanation: '"It worked on my machine" occurs when applications depend on uncommitted local libraries, environment variables, or configurations that are missing in production.',
    },
    {
      id: 'q3',
      domain: 'Delivery Lifecycle',
      question: 'What is the correct sequence of the standard software delivery lifecycle?',
      options: [
        'Deploy → Plan → Code → Monitor → Test → Build',
        'Plan → Code → Build → Test → Release → Deploy → Operate → Monitor',
        'Build → Test → Plan → Code → Deploy → Monitor',
        'Plan → Deploy → Test → Code → Operate → Release',
      ],
      correctIndex: 1,
      explanation: 'The logical software delivery lifecycle progresses from Plan to Code, Build, Test, Release, Deploy, Operate, and Monitor in a continuous loop.',
    },
    {
      id: 'q4',
      domain: 'CI/CD Concepts',
      question: 'What is the fundamental practice required for Continuous Integration (CI)?',
      options: [
        'Developers keeping local feature branches open for 3 months before merging',
        'Developers frequently merging code into a shared mainline branch with automated build and test verification',
        'Deploying untested code directly to customer-facing servers',
        'Having QA manually execute smoke test spreadsheets once every sprint',
      ],
      correctIndex: 1,
      explanation: 'Continuous Integration requires merging working code frequently into a shared mainline where an automated pipeline builds and validates the code immediately.',
    },
    {
      id: 'q5',
      domain: 'Artifact Management',
      question: 'Why should build artifacts be immutable across environments?',
      options: [
        'To make Docker images take up more storage space in the registry',
        'To ensure that the exact binary verified in staging is the identical binary running in production, preventing environment-induced regressions',
        'Because cloud providers charge fees if binaries are modified after compilation',
        'To prevent developers from using git commit messages',
      ],
      correctIndex: 1,
      explanation: 'An immutable artifact guarantees that what passed QA in staging is byte-for-byte identical to what runs in production, eliminating "rebuild discrepancy" bugs.',
    },
    {
      id: 'q6',
      domain: 'Release Strategy',
      question: 'In a Continuous Delivery pipeline, who or what triggers the production deployment?',
      options: [
        'A fully automated background cron script running at midnight',
        'A deliberate human decision or manual approval gate after automated testing succeeds',
        'The client browser making a REST API call',
        'An external payment gateway webhook',
      ],
      correctIndex: 1,
      explanation: 'In Continuous Delivery, code is always in a releaseable state, but the actual trigger to deploy to production remains a human business decision.',
    },
    {
      id: 'q7',
      domain: 'DORA Metrics',
      question: 'Which metric measures the time it takes for a committed code change to reach production?',
      options: [
        'Mean Time to Detect (MTTD)',
        'Lead Time for Changes',
        'Change Failure Rate',
        'Code Coverage Percentage',
      ],
      correctIndex: 1,
      explanation: 'Lead Time for Changes measures the elapsed time from a developer commit being authored to that commit successfully running in production.',
    },
    {
      id: 'q8',
      domain: 'Reliability Engineering',
      question: 'What does Mean Time to Restore (MTTR) measure?',
      options: [
        'The average time taken to compile an application from source code',
        'The time required to recover and restore normal service after an unplanned production outage or failure',
        'The time an employee takes to complete their annual security training',
        'The duration of a sprint planning meeting',
      ],
      correctIndex: 1,
      explanation: 'MTTR measures how quickly an engineering team can diagnose, mitigate, and restore service following a production failure.',
    },
    {
      id: 'q9',
      domain: 'Automation Best Practices',
      question: 'What is a major danger of automating a process that is poorly understood or broken?',
      options: [
        'It speeds up the creation of errors and propagates bad state at machine scale',
        'It makes the pipeline run too fast for servers to handle',
        'It causes the Git repository to exceed its size limit',
        'It prevents engineers from using terminal commands',
      ],
      correctIndex: 0,
      explanation: 'Bill Gates famously observed that automation applied to an efficient operation magnifies efficiency, but automation applied to an inefficient operation magnifies the inefficiency.',
    },
    {
      id: 'q10',
      domain: 'Culture & Collaboration',
      question: 'What should immediately follow an incident in a healthy DevOps team?',
      options: [
        'A formal disciplinary hearing to assign blame and revoke server access',
        'A blameless postmortem analyzing systemic causes and creating automated preventative action items',
        'Cancelling all future deployments for the remainder of the quarter',
        'Deleting all server logs to protect team privacy',
      ],
      correctIndex: 1,
      explanation: 'A healthy DevOps team conducts a blameless postmortem to understand systemic vulnerabilities and create actionable preventative measures to make recurrence impossible.',
    },
  ],

  interviewQuestions: [
    {
      id: 'iq-1',
      question: 'How do you explain the difference between Continuous Delivery and Continuous Deployment to a non-technical stakeholder?',
      targetRole: 'Junior to Mid DevOps / Cloud Engineer',
      difficulty: 'Beginner',
      modelAnswer:
        'Continuous Delivery is like a car that is fully fueled, washed, and parked at the curb—ready to drive whenever management turns the key (a human business decision). Continuous Deployment is like an autonomous vehicle that drives out onto the road automatically the second the green light illuminates (passing all automated tests with zero human intervention). In Continuous Delivery, humans retain the final release button; in Continuous Deployment, the pipeline handles release automatically.',
      keyPoints: [
        'Both ensure code is always release-ready.',
        'Continuous Delivery has a manual approval gate before production.',
        'Continuous Deployment is 100% automated to production.',
      ],
      commonMistakes: [
        'Claiming Continuous Delivery means code is never tested.',
        'Confusing Continuous Integration with Continuous Deployment.',
      ],
    },
    {
      id: 'iq-2',
      question: 'What are the 4 DORA metrics, and why are they considered the gold standard for measuring DevOps success?',
      targetRole: 'DevOps / Platform Engineer',
      difficulty: 'Intermediate',
      modelAnswer:
        'The four DORA metrics are Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Mean Time to Restore (MTTR). They are considered the gold standard because empirical research proved they capture both sides of engineering excellence: Velocity (how fast you deliver value) and Stability (how safely and reliably you operate). Low-performing teams sacrifice stability for speed or vice-versa, whereas elite teams optimize both simultaneously.',
      keyPoints: [
        'Deployment Frequency & Lead Time measure velocity.',
        'Change Failure Rate & MTTR measure stability and resilience.',
        'High performers score high on both dimensions.',
      ],
      commonMistakes: [
        'Listing vanity metrics like total commits or hours worked.',
        'Focusing only on speed and ignoring stability.',
      ],
    },
    {
      id: 'iq-3',
      question: 'A developer says: "My feature passed all tests locally on my Mac, but it crashes on the staging server." How do you investigate and prevent this?',
      targetRole: 'DevOps / Infrastructure Engineer',
      difficulty: 'Scenario',
      modelAnswer:
        'First, I would inspect the failure log on staging to identify the specific error (e.g. missing environment variables, architecture mismatch like ARM64 vs AMD64, or differing library versions). To permanently prevent this, we encapsulate the application in an immutable Docker container, ensuring the exact same runtime environment, base image, and dependencies run locally, in CI, and in production. We also enforce 12-Factor App config practices, injecting configuration via environment variables.',
      keyPoints: [
        'Check logs for environment differences (node version, env vars, architecture).',
        'Enforce containerization with Docker to eliminate environment drift.',
        'Store configuration separately from code.',
      ],
      commonMistakes: [
        'Blaming the developer without investigating root-cause parity differences.',
        'Manually patching the staging server without fixing the configuration in git.',
      ],
    },
    {
      id: 'iq-4',
      question: 'Why is a "Blameless Postmortem" essential for reliability, and what are its key components?',
      targetRole: 'Site Reliability Engineer / DevOps Lead',
      difficulty: 'Intermediate',
      modelAnswer:
        'A blameless postmortem operates on the assumption that engineers make decisions based on the best information available at the time, and failures are symptoms of flawed systems rather than bad people. If you punish individuals, engineers will hide incidents and avoid innovation. Key components of an effective postmortem include: an objective chronological timeline of the incident, root cause analysis (using the 5-Whys), detection and response evaluation (how quickly did monitoring alert us?), and concrete action items assigned to owners with deadlines to prevent recurrence.',
      keyPoints: [
        'Psychological safety encourages transparent failure reporting.',
        'Focuses on procedural and pipeline weaknesses, not human errors.',
        'Must result in concrete, trackable preventative action items.',
      ],
      commonMistakes: [
        'Naming and shaming individuals in the report.',
        'Writing a retrospective document that is filed away without actionable Jira tickets.',
      ],
    },
    {
      id: 'iq-5',
      question: 'What is the role of automated quality gates in a CI/CD pipeline, and what happens when one fails?',
      targetRole: 'DevOps / Automation Engineer',
      difficulty: 'Beginner',
      modelAnswer:
        'Quality gates are automated verification checkpoints placed between pipeline stages that evaluate criteria such as unit test pass rate, code linting standards, security vulnerability thresholds (SAST), and test coverage minimums. If any gate fails, the pipeline must immediately halt execution ("fail-fast"), prevent artifact promotion to downstream environments, and notify the author with actionable diagnostic logs so they can resolve the issue immediately.',
      keyPoints: [
        'Quality gates prevent flawed code from reaching downstream environments.',
        'Enforces the "fail-fast" principle.',
        'Provides immediate, actionable diagnostic feedback to developers.',
      ],
      commonMistakes: [
        'Allowing a pipeline to continue deploying even when a quality gate fails.',
        'Failing without providing clear, readable log output to the developer.',
      ],
    },
  ],

  pdfDownloadUrl: '/devops/day-1-understanding-devops.pdf',
  pdfFileName: 'day-1-understanding-devops.pdf',
};
