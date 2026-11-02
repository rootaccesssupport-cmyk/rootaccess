/**
 * RootAccess — AI Fundamentals & Prompt Engineering Curriculum
 *
 * Course Title: AI Fundamentals & Prompt Engineering
 * Duration: 7 Days
 * Philosophy: Learn by Doing
 * Prerequisites: None (Complete Beginners, Students, Professionals)
 */

export interface PromptPlaygroundScenario {
  id: string;
  title: string;
  category: 'learning' | 'writing' | 'productivity' | 'coding_explanation' | 'verification';
  description: string;
  sampleContext: string;
  defaultFormat: string;
  weakPrompt: string;
  weakOutput: string;
  weakCritique: string[];
  improvedPrompt: string;
  improvedOutput: string;
  improvementHighlights: string[];
  evaluationCriteria: {
    roleDefined: boolean;
    taskClear: boolean;
    contextProvided: boolean;
    constraintsIncluded: boolean;
    formatSpecified: boolean;
  };
}

export interface AiDayTopic {
  title: string;
  summary: string;
  explanation: string;
  realWorldExample: string;
  workedExample: {
    scenario: string;
    beforePrompt?: string;
    beforeOutput?: string;
    afterPrompt: string;
    afterOutput: string;
    explanation: string;
  };
  commonMistakes: string[];
  keyTakeaways: string[];
}

export interface AiQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface AiWorkplaceScenario {
  id: string;
  title: string;
  context: string;
  task: string;
  modelPrompt: string;
  modelOutput: string;
  verificationTip: string;
}

export interface AiDayData {
  dayNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  objectives: string[];
  introduction: string;
  topics: AiDayTopic[];
  playgroundScenarios: PromptPlaygroundScenario[];
  guidedExercise: {
    title: string;
    instructions: string;
    starterPrompt: string;
    taskContext: string;
    solutionPrompt: string;
    expectedOutputCriteria: string[];
    rubricPoints: string[];
  };
  independentChallenge: {
    title: string;
    promptGoal: string;
    scenario: string;
    constraints: string[];
    selfChecklist: string[];
  };
  workplaceScenarios: AiWorkplaceScenario[];
  quiz: {
    passingScorePercent: number;
    questions: AiQuizQuestion[];
  };
  daySummary: string;
}

export const AI_COURSE_METADATA = {
  id: 'ai-prompt-engineering',
  slug: 'ai-prompt-engineering',
  title: 'AI Fundamentals & Prompt Engineering',
  tagline: 'Learn by Doing',
  subtitle: 'Master practical AI concepts, structured prompt frameworks, and real-world workplace workflows without writing code.',
  description:
    'Learn how AI works, use AI tools effectively, write better prompts and apply AI to real-world tasks. Practise through guided exercises, knowledge checks and a final hands-on project. No coding experience required.',
  duration: '7 Days (10 Hours)',
  regularPriceInr: 599,
  launchPriceInr: 299,
  targetAudience: [
    'Complete beginners with no technical background',
    'Students wanting to accelerate study, research, and project planning',
    'Working professionals looking to automate repetitive writing and synthesis',
    'QA engineers, developers, and product teams wanting structured prompt frameworks',
  ],
  outcomes: [
    'Understand fundamental AI and generative AI concepts.',
    'Understand what large language models do and where they can fail.',
    'Write clear, structured and effective prompts.',
    'Improve prompts through iteration and evaluation.',
    'Apply AI to research, writing, learning and workplace productivity.',
    'Verify AI-generated answers and use AI responsibly.',
    'Build a reusable prompt library and complete a final project.',
  ],
  passingThresholdPercent: 80,
};

export const AI_DAYS_DATA: AiDayData[] = [
  // =========================================================================
  // DAY 1: AI Fundamentals
  // =========================================================================
  {
    dayNumber: 1,
    title: 'Day 1: AI Fundamentals',
    subtitle: 'Core concepts, Generative AI vs Traditional AI, LLM mechanics, and knowing when to use AI.',
    badge: 'Day 1 of 7 • Free Preview',
    duration: '35–45 mins',
    objectives: [
      'Define Artificial Intelligence, Machine Learning, Deep Learning, and Generative AI.',
      'Understand how Large Language Models (LLMs) generate text using token prediction.',
      'Differentiate AI assistants from search engines and traditional rule-based software.',
      'Recognize core AI limitations, including hallucinations, knowledge cutoffs, and context windows.',
      'Classify everyday tasks by AI suitability, verification necessity, and privacy boundaries.',
    ],
    introduction:
      'Artificial Intelligence is transforming how we learn, analyze information, and communicate. However, using AI effectively requires understanding what models actually do under the hood: predicting likely sequences of text rather than thinking or knowing facts with certainty.',
    topics: [
      {
        title: '1. Demystifying the AI Hierarchy (AI vs ML vs DL vs GenAI)',
        summary: 'Understanding the layers of modern computing from broad automated systems down to generative models.',
        explanation:
          'Artificial Intelligence (AI) is the overarching umbrella term for machines performing tasks that typically require human cognition. Within AI sits Machine Learning (ML), where algorithms identify patterns in historical data to make predictions. Inside ML is Deep Learning (DL), utilizing multi-layered neural networks inspired by biological brains. Generative AI (GenAI) is a breakthrough sub-branch of Deep Learning trained on vast amounts of multimodal data to generate entirely new text, code, images, and audio rather than simply categorizing existing files.',
        realWorldExample:
          'A bank filter flagging a credit card charge as fraudulent is traditional Machine Learning (classification). A conversational assistant drafting an explanatory email to the customer explaining why the charge was flagged is Generative AI (synthesis & generation).',
        workedExample: {
          scenario: 'Comparing traditional search engines vs AI assistants',
          beforePrompt: 'Search Query: best way to test rest api headers',
          beforeOutput: 'Returns 10 blue web links to documentation, blog posts, and forum threads that the user must read and synthesize manually.',
          afterPrompt: 'AI Prompt: Compare Authorization Bearer vs API-Key headers for a beginner mobile app with code examples and security pros/cons in a markdown table.',
          afterOutput: 'Synthesizes knowledge across standards into an immediate structured comparison table with actionable trade-offs.',
          explanation: 'Search retrieves documents; generative AI synthesizes concepts into custom explanations tailored to your exact constraints.',
        },
        commonMistakes: [
          'Assuming AI "understands" or "thinks" like a human — it computes probabilistic token sequences.',
          'Confusing generative text assistants with search engines; AI can state falsehoods with absolute confidence.',
          'Believing bigger models are always 100% correct without checking critical figures or dates.',
        ],
        keyTakeaways: [
          'Generative AI creates new content rather than just filtering or classifying existing inputs.',
          'LLMs generate answers one word-piece (token) at a time based on mathematical probability.',
          'Always treat an AI assistant as a tireless junior intern who writes well but needs oversight.',
        ],
      },
      {
        title: '2. How Large Language Models Work (Tokens & Attention)',
        summary: 'Text prediction, tokens, context windows, and why plausible text can still be factually wrong.',
        explanation:
          'Large Language Models do not store pre-written answers in a database. Instead, text is broken down into small units called "tokens" (roughly 3–4 letters of English text). The model calculates the mathematical probability of what the most logical next token should be based on its prompt and previous tokens. A mechanism called "Self-Attention" allows the model to weigh the importance of different words in your prompt, connecting context across long sentences. However, because it optimizes for fluency and likelihood rather than ground truth, it can generate confident-sounding falsehoods called "hallucinations".',
        realWorldExample:
          'If you prompt: "The capital of France is...", the model calculates that " Paris" has the highest statistical probability. But if you ask: "Summarize the 2029 World Cup final", the model may fabricate scores and scorers because it predicts plausible football terms even when no real event exists.',
        workedExample: {
          scenario: 'Understanding Hallucination Triggers',
          afterPrompt: 'Explain how token prediction leads to hallucinations when asked about obscure or nonexistent facts.',
          afterOutput: 'When asked about obscure topics with sparse training data, the model prioritizes linguistic coherence over factual accuracy. It strings together plausible names, dates, and technical jargon that sound correct to an untrained reader but have no basis in reality.',
          explanation: 'Knowing this mechanic helps you formulate prompts that require models to cite supplied source material or explicitly say "I do not know".',
        },
        commonMistakes: [
          'Trusting mathematical calculations or obscure historical dates without independent verification.',
          'Pasting huge documents that exceed the model context window, causing early sections to be ignored.',
        ],
        keyTakeaways: [
          'AI predicts probable next tokens; it does not "browse its memory" like a human.',
          'Hallucination is a natural consequence of probabilistic generation, not a deliberate lie.',
          'Grounding prompts with explicit reference material drastically reduces hallucination.',
        ],
      },
      {
        title: '3. The Three Task Tiers: Safe, Verification-Needed, and Unsafe',
        summary: 'A decision framework for when to use AI, when to inspect closely, and when never to use AI.',
        explanation:
          'To use AI responsibly, categorize every task into one of three operational tiers: Tier 1 (Low-Risk/Generative) includes brainstorming, formatting, summarizing non-critical articles, and draft editing. Tier 2 (Verification Required) involves code logic, legal summaries, medical explanations, financial spreadsheets, and academic citations where a human must review every claim. Tier 3 (Never Delegate to Public AI) involves confidential company passwords, patient health records, trade secrets, sensitive customer PII, or high-stakes unreviewed medical/legal decisions.',
        realWorldExample:
          'Using AI to turn rough bullet notes into a polite thank-you email is Tier 1. Using AI to generate a regex for credit card validation is Tier 2 (must be tested with unit tests). Pasting an unannounced company financial statement into a public AI tool is Tier 3 (strictly prohibited).',
        workedExample: {
          scenario: 'Evaluating a team request',
          afterPrompt: 'Review the following task: "Paste customer passport scans into AI to extract date of birth."',
          afterOutput: 'Assessment: Tier 3 (Prohibited). Reason: Customer passport images contain sensitive Personally Identifiable Information (PII) and government identifiers. Uploading these to public multi-tenant models violates GDPR/DPDP regulations. Use an on-premise, HIPAA/SOC-2 certified OCR pipeline instead.',
          explanation: 'Clear risk boundaries protect both your career and your company.',
        },
        commonMistakes: [
          'Uploading proprietary company source code or production customer databases to public web chatbots.',
          'Publishing AI-generated blog posts or reports without fact-checking cited studies.',
        ],
        keyTakeaways: [
          'Tier 1 (Safe): Brainstorming, drafting, stylistic editing, rewording.',
          'Tier 2 (Verify): Calculations, references, factual claims, production code.',
          'Tier 3 (Avoid): Confidential credentials, proprietary IP, sensitive personal records.',
        ],
      },
    ],
    playgroundScenarios: [
      {
        id: 'day1-task-suitability',
        title: 'Task Suitability Assessment',
        category: 'learning',
        description: 'Examine how an AI assistant evaluates whether a workplace task should be automated or restricted.',
        sampleContext: 'A fintech startup wants to use AI to draft marketing tweets, explain SQL errors to interns, and auto-review loan applicants.',
        defaultFormat: 'Structured Table',
        weakPrompt: 'Can AI do our fintech tasks?',
        weakOutput: 'Yes, AI is very capable and can help fintech companies automate many operations including marketing, database troubleshooting, and customer lending.',
        weakCritique: [
          'Vague prompt gives no specific risk framework or guidelines.',
          'Output dangerously glosses over high-risk loan approvals without warning about bias and regulatory compliance.',
          'Fails to distinguish between safe creative tasks and strictly regulated financial decisions.',
        ],
        improvedPrompt:
          'ROLE: Senior FinTech Risk & AI Ethics Consultant\nTASK: Evaluate 3 planned tasks for AI suitability: (1) Drafting marketing social posts, (2) Explaining SQL syntax errors to junior QA, (3) Making automated loan approval decisions.\nCONTEXT: Mid-sized lending firm subject to privacy and fair-credit regulations.\nCONSTRAINTS: Categorize each task as [Safe to Automate], [Human Verification Required], or [High Risk / Do Not Fully Delegate]. Provide reasons and safeguards.\nOUTPUT FORMAT: Markdown table with columns: Task, Risk Tier, Rationale, Required Safeguards.',
        improvedOutput:
          '| Task | Risk Tier | Rationale | Required Safeguards |\n| :--- | :--- | :--- | :--- |\n| **1. Marketing Social Posts** | Safe to Automate | Low-risk creative content generation with no customer data exposure. | Final quick human scan for tone and brand voice before scheduling. |\n| **2. Explaining SQL Syntax Errors** | Human Verification Required | Highly educational and productive, but generated SQL fixes might have subtle performance flaws. | Intern runs queries only in sandbox environments; never test directly on production databases. |\n| **3. Automated Loan Decisions** | High Risk / Do Not Fully Delegate | Regulated credit decisions subject to algorithmic bias and financial compliance laws. | AI may only assist with data compilation; final credit approval MUST remain with human underwriters. |',
        improvementHighlights: [
          'Assigned a domain expert role (FinTech Risk Consultant).',
          'Supplied explicit operational categories and risk tiers.',
          'Demanded practical safeguards rather than theoretical advice.',
        ],
        evaluationCriteria: {
          roleDefined: true,
          taskClear: true,
          contextProvided: true,
          constraintsIncluded: true,
          formatSpecified: true,
        },
      },
    ],
    guidedExercise: {
      title: 'Classifying Everyday Tasks by AI Risk Tier',
      instructions:
        'Read the 4 everyday scenarios below and construct a prompt asking an AI to evaluate their suitability, identifying which are Tier 1 (Safe), Tier 2 (Needs Human Verification), or Tier 3 (Prohibited without explicit authorization).',
      taskContext:
        'Scenarios to evaluate:\nA) Rewording a messy project status update into 3 clear bullets for Slack.\nB) Summarizing a clinical research paper on vaccine efficacy.\nC) Pasting customer billing addresses and credit card records into a public chatbot to find anomalies.\nD) Generating unit test scenarios for an e-commerce checkout page.',
      starterPrompt: 'Analyze these tasks and tell me if AI is okay.',
      solutionPrompt:
        'ROLE: IT Security and Productivity Specialist\nTASK: Classify each of the 4 provided workplace scenarios into Tier 1 (Safe to Automate), Tier 2 (Requires Human Verification), or Tier 3 (Prohibited / Privacy Violation).\nCONTEXT: Standard enterprise security policy.\nOUTPUT FORMAT: Numbered list with Scenario Name, Classification, and a 1-sentence Justification.',
      expectedOutputCriteria: [
        'A classified as Tier 1 (Safe formatting).',
        'B classified as Tier 2 (Medical claims require verification against original source).',
        'C classified as Tier 3 (Severe privacy & regulatory violation).',
        'D classified as Tier 2 (Test cases are great to generate, but must be reviewed for edge case coverage).',
      ],
      rubricPoints: [
        'Prompt defines clear role and task definition.',
        'Explicit output categories provided to avoid generic responses.',
        'Accurately identifies privacy breaches (scenario C).',
      ],
    },
    independentChallenge: {
      title: 'Analyze Your Own Weekly Workflow',
      promptGoal: 'Create an AI suitability audit of your personal weekly tasks.',
      scenario: 'You spend 15 hours a week reading articles, writing email replies, debugging code, and updating team spreadsheets.',
      constraints: [
        'List at least 3 tasks from your daily routine.',
        'Assign each task a risk level (Low, Medium, High).',
        'Specify the exact human verification step needed for the medium-risk task.',
      ],
      selfChecklist: [
        'Did I exclude all personal passwords, keys, and private data?',
        'Did I specify the format (table or bullet list)?',
        'Did I include instructions to describe the failure mode if AI makes a mistake?',
      ],
    },
    workplaceScenarios: [
      {
        id: 'ws-1-1',
        title: 'Explaining AI Limitations to Non-Technical Stakeholders',
        context: 'A company executive wants to fire customer support agents and replace them entirely with an unmonitored LLM chatbot next Monday.',
        task: 'Draft a polite, data-driven briefing note explaining why human-in-the-loop oversight is vital.',
        modelPrompt:
          'ROLE: Principal Customer Experience Architect\nTASK: Write a 3-paragraph executive briefing advising against completely removing human support agents in favor of an unmonitored AI chatbot.\nCONTEXT: E-commerce company with 50,000 monthly orders.\nCONSTRAINTS: Professional tone, cite hallucination risks, return policy edge-cases, and brand reputation risks. Suggest a hybrid rollout instead.\nOUTPUT FORMAT: 3 structured paragraphs with bold headers.',
        modelOutput:
          '**1. Hallucination Risk in Policy Enforcement**\nWhile modern LLMs handle standard FAQ inquiries effectively, unmonitored models inevitably hallucinate when faced with ambiguous return claims, shipping disputes, or promotional coupon abuses. A customer asking about refunding an opened cosmetic item might be promised a full refund by an ungrounded model, leaving the business contractually bound to costly concessions.\n\n**2. Brand Reputation and Emotional De-escalation**\nHigh-value customer disputes require empathy and nuanced judgment. Automated bots cannot detect subtle frustration or de-escalate angry patrons with discretionary credits without strict guardrails. Complete delegation without human review frequently results in viral social media complaints.\n\n**3. Recommended Strategy: The Hybrid Co-Pilot Model**\nInstead of full replacement, deploy AI as an internal agent co-pilot. The AI drafts instant, high-quality response templates based on company SOPs, but human agents review and approve each message before dispatch. This reduces response latency by 60% while maintaining 100% policy accuracy.',
        verificationTip: 'Always verify if your AI tool provides audit logs and deterministic guardrails before deploying customer-facing automation.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q1-1',
          question: 'What is the fundamental mechanism by which Large Language Models (LLMs) generate responses?',
          options: [
            'They search a secret internal encyclopedia and copy pre-written paragraphs.',
            'They calculate statistical probabilities to predict the most likely next token (word-piece).',
            'They possess human-like consciousness and reason through logical deduction.',
            'They run SQL database queries against live Internet servers for every question.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'LLMs are probabilistic token predictors trained on massive datasets. They do not have pre-written answers or consciousness; they compute the likelihood of the next token based on learned mathematical weights.',
        },
        {
          id: 'q1-2',
          question: 'What does the term "AI Hallucination" refer to in generative models?',
          options: [
            'When the AI server overheats and shuts down unexpectedly.',
            'When an AI generates an image with surrealistic artistic style.',
            'When an AI generates plausible-sounding statements that are factually incorrect or completely fabricated.',
            'When an AI translates text between two foreign languages incorrectly.',
          ],
          correctAnswerIndex: 2,
          explanation:
            'Hallucination occurs when an AI produces an answer that sounds fluent, confident, and grammatically perfect, but is factually untrue, non-existent, or based on incorrect associations.',
        },
        {
          id: 'q1-3',
          question: 'Which of the following tasks is classified as Tier 3 (Prohibited / Never Delegate to Public AI)?',
          options: [
            'Brainstorming 5 creative YouTube video titles about web development.',
            'Summarizing a publicly accessible blog post on software testing.',
            'Pasting employee Aadhaar / Social Security numbers and unredacted salary records into a public web chatbot.',
            'Asking for an explanation of the difference between HTTP GET and POST requests.',
          ],
          correctAnswerIndex: 2,
          explanation:
            'Uploading sensitive personally identifiable information (PII) or confidential compensation records to multi-tenant public AI tools violates enterprise security, GDPR, and data protection legislation.',
        },
        {
          id: 'q1-4',
          question: 'How does an AI conversational assistant fundamentally differ from a search engine like Google?',
          options: [
            'AI assistants only operate when connected to printers.',
            'Search engines index and retrieve existing web documents; AI assistants synthesize and generate custom text tailored to your constraints.',
            'Search engines are always free while AI assistants always cost money.',
            'AI assistants are always 100% accurate while search engines are never accurate.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Search engines crawl, rank, and present links to original sources. AI assistants process your prompt and synthesize an original answer directly, which saves reading time but requires independent verification.',
        },
        {
          id: 'q1-5',
          question: 'Why is it important to ground an AI prompt with reference source material?',
          options: [
            'Because AI models cannot generate any text without source material.',
            'Because grounding forces the model to synthesize answers strictly from the provided text, drastically reducing hallucinations.',
            'Because source material makes the AI model run 10 times faster.',
            'Because grounding prevents the AI from using English grammar.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Providing reference context (e.g. "Answer strictly based on this product manual") gives the model explicit facts to draw from, preventing it from inventing details out of thin air.',
        },
        {
          id: 'q1-6',
          question: 'What is a "Token" in the context of Large Language Models?',
          options: [
            'A cryptocurrency used to pay for computer hardware.',
            'A security badge worn by data center employees.',
            'A basic chunk of text (typically 3 to 4 characters or parts of a word) processed by the model.',
            'A password required to login to an email account.',
          ],
          correctAnswerIndex: 2,
          explanation:
            'Tokens are the fundamental building blocks of LLM text processing. Words are converted into numerical token IDs before mathematical attention calculations occur.',
        },
      ],
    },
    daySummary:
      'Day 1 established the foundation: AI is a powerful tool for text synthesis and acceleration, but it operates through probabilistic token prediction rather than human understanding. By understanding hallucinations and categorizing tasks into clear risk tiers, you can leverage AI with confidence while safeguarding data privacy.',
  },

  // =========================================================================
  // DAY 2: Getting Started with AI Tools
  // =========================================================================
  {
    dayNumber: 2,
    title: 'Day 2: Getting Started with AI Tools',
    subtitle: 'Conversational interaction, context setting, step-by-step follow-ups, and structured outputs.',
    badge: 'Day 2 of 7 • Interactive Practice',
    duration: '35–45 mins',
    objectives: [
      'Learn how to guide conversational AI through clear instructions and background context.',
      'Master the art of multi-turn follow-up prompting to refine initial answers.',
      'Request specific outputs: summaries, comparative tables, checklists, and step-by-step plans.',
      'Break overwhelming, complex requests into structured sequential steps.',
      'Identify when an initial AI response is too shallow or generic and apply corrective prompts.',
    ],
    introduction:
      'Most people interact with AI as if it were a Google search bar, typing short 3-word keywords and receiving disappointing, generic answers. In Day 2, you will learn how to treat an AI assistant as a collaborative partner: providing background, establishing expectations, and refining outputs through targeted follow-up iterations.',
    topics: [
      {
        title: '1. The Anatomy of an Effective Conversation',
        summary: 'Why single-keyword queries fail and how context transforms response quality.',
        explanation:
          'When you supply a short query like "learn javascript", the model has no idea whether you are a 10-year-old child, a seasoned Python developer, or someone studying for an interview tomorrow. Consequently, it generates an encyclopedic, generic overview that helps no one. An effective conversation begins with 3 essential anchors: (1) Who you are, (2) What specific objective you want to achieve, and (3) What constraints or prior knowledge you possess.',
        realWorldExample:
          'Instead of asking "how to study for QA interview", prompt: "I am a manual tester with 6 months of bug logging experience. I have an interview at an e-commerce firm in 4 days focusing on boundary testing and Jira bug lifecycles. Create a focused 4-day revision schedule with 2 hours of study per day."',
        workedExample: {
          scenario: 'Vague query vs Context-Rich Interaction',
          beforePrompt: 'Tell me how to make a budget.',
          beforeOutput: 'Making a budget involves tracking your income, calculating your fixed and variable expenses, saving 20% of your earnings, and reviewing your spending monthly using pen and paper or an app.',
          afterPrompt:
            'I am a 22-year-old college graduate starting my first IT job in Pune earning ₹35,000/month after tax. My rent is ₹10,000 and food is ₹6,000. Create a realistic monthly budget following the 50/30/20 rule, with specific savings targets for an emergency fund. Present it in a clear markdown table.',
          afterOutput:
            '| Category | Allocation (%) | Monthly Amount (₹) | Specific Items Included |\n| :--- | :--- | :--- | :--- |\n| **Needs (50%)** | 50% | ₹17,500 | Rent (₹10,000), Food & Groceries (₹6,000), Commute & Utilities (₹1,500) |\n| **Wants (30%)** | 30% | ₹10,500 | Weekend outings, mobile recharge, personal shopping, hobbies |\n| **Savings & Investments (20%)** | 20% | ₹7,000 | **Emergency Fund (₹5,000)** until 3 months expenses (₹50,000) reached, **PPF / Index Fund (₹2,000)** |',
          explanation: 'Specific personal numbers, location, and framework (50/30/20) transformed generic platitudes into an immediately actionable financial roadmap.',
        },
        commonMistakes: [
          'Expecting the model to read your mind without stating your background or constraints.',
          'Starting a brand new chat window for every single follow-up question, wiping out the accumulated context.',
        ],
        keyTakeaways: [
          'Context is the steering wheel of generative models; without it, the model drifts into generalities.',
          'State your background, your goal, your timeline, and your formatting requirements upfront.',
        ],
      },
      {
        title: '2. Multi-Turn Iteration (The Art of the Follow-Up)',
        summary: 'How to sculpt and refine AI outputs across multiple conversational turns.',
        explanation:
          'Rarely will an initial AI response be 100% finished. The secret to professional AI productivity is iterative refinement. Instead of starting over when a response is imperfect, use targeted conversational turns: (1) "Shorten this by 50% and focus exclusively on the action items", (2) "Change the tone from academic to encouraging for high school students", (3) "Turn Section 2 into a step-by-step checklist with checkboxes", or (4) "Identify 3 potential risks or edge cases you missed in this plan."',
        realWorldExample:
          'Drafting a workplace report: Turn 1 generates the initial outline. Turn 2 fleshes out the key section with bullet points. Turn 3 demands counter-arguments. Turn 4 formats the final consensus into a 1-page executive summary.',
        workedExample: {
          scenario: 'Refining a rough draft through 2 follow-up turns',
          afterPrompt:
            'Turn 1: "Draft a 100-word explanation of what a REST API is for a non-technical sales representative."\nTurn 2 (Follow-up): "Great. Now give me a real-world restaurant analogy comparing the waiter, kitchen, and menu to API components in a table."',
          afterOutput:
            '| Restaurant Component | API Component | Real-World Digital Equivalent |\n| :--- | :--- | :--- |\n| **The Menu** | API Documentation | List of available endpoints and acceptable requests |\n| **The Waiter** | REST API Request / Response | Carries your order from the table to the kitchen and brings back your food |\n| **The Kitchen** | Backend Server & Database | Prepares data, authenticates credentials, and computes the result |',
          explanation: 'Iterative follow-up allowed the user to explore the concept and then instantly ground it in a memorable physical analogy.',
        },
        commonMistakes: [
          'Accepting the first response as final even when it lacks punch, structure, or depth.',
          'Pasting huge contradictory revisions that confuse the active chat history.',
        ],
        keyTakeaways: [
          'Use follow-ups to adjust tone, length, format, and depth.',
          'Ask the model to critique its own previous output before finalizing.',
        ],
      },
      {
        title: '3. Requesting Structured Output Formats',
        summary: 'Moving beyond walls of text: Markdown tables, JSON, step-by-step checklists, and comparison matrices.',
        explanation:
          'LLMs default to narrative paragraphs, which are tiring to read and difficult to scan. You can drastically improve readability by explicitly declaring your desired output format in all-caps: "OUTPUT FORMAT: Markdown Table", "OUTPUT FORMAT: Numbered step-by-step action checklist", "OUTPUT FORMAT: Pros vs Cons matrix", or "OUTPUT FORMAT: Key-Value pairs". When formats are specified, models organize their thoughts far more logically.',
        realWorldExample:
          'Requesting comparison between Jira and Trello: Asking for paragraphs results in unstructured essays. Asking for a Markdown table with columns [Tool, Best For, Pricing Tier, Key Limitation] yields instant clarity.',
        workedExample: {
          scenario: 'Formatting test scenarios',
          afterPrompt: 'Generate 3 smoke test scenarios for an OTP login screen. Format as a table with columns: ID, Test Scenario, Test Steps, Expected Result.',
          afterOutput:
            '| ID | Test Scenario | Test Steps | Expected Result |\n| :--- | :--- | :--- | :--- |\n| **TC-01** | Valid 6-digit OTP submission | 1. Enter valid registered phone number\n2. Receive SMS OTP\n3. Input OTP and click Verify | User successfully redirected to dashboard; auth token saved |\n| **TC-02** | Expired OTP entry | 1. Wait 120 seconds after OTP delivery\n2. Enter expired OTP and submit | Error message "OTP has expired. Request a new one" is displayed |\n| **TC-03** | Alphabetic character injection | 1. Attempt typing letters "ABCDEF" into numeric OTP field | Field restricts keystrokes; only numeric 0–9 accepted |',
          explanation: 'Structure enforces completeness and professional rigor.',
        },
        commonMistakes: [
          'Leaving output format undefined, resulting in disorganized paragraphs.',
          'Failing to specify column headers when asking for tables.',
        ],
        keyTakeaways: [
          'Always state how you want information packaged (table, list, steps, JSON).',
          'Explicit structures make comparing alternatives effortless.',
        ],
      },
    ],
    playgroundScenarios: [
      {
        id: 'day2-study-schedule',
        title: 'Beginner Study Schedule Planner',
        category: 'productivity',
        description: 'See how adding constraints, available hours, and formatting transforms a vague study request into a concrete timetable.',
        sampleContext: 'A working professional has 1 hour each weekday and 3 hours on Saturday to learn Manual Testing fundamentals over 2 weeks.',
        defaultFormat: 'Daily Schedule Table',
        weakPrompt: 'Give me a study plan for testing.',
        weakOutput:
          'Here is a study plan for software testing:\nWeek 1: Learn testing fundamentals, SDLC, STLC, and test case writing.\nWeek 2: Learn bug reporting, Jira, regression testing, and prepare for interviews.\nMake sure to practice every day and read online tutorials!',
        weakCritique: [
          'Zero practical timeline: does not specify what to do on Monday vs Tuesday.',
          'Ignores the learner’s available time limits (1 hour/day).',
          'Provides no actionable exercises, checkpoints, or resources.',
        ],
        improvedPrompt:
          'ROLE: Senior QA Mentor and Agile Coach\nTASK: Create a structured 14-day study plan for learning Manual QA from scratch.\nCONTEXT: Student can commit exactly 60 minutes on weekdays (Mon–Fri) and 180 minutes on Saturday. Sunday is rest/revision.\nCONSTRAINTS: Break each day into: (1) Core Topic, (2) 30-min Reading/Concept, (3) 30-min Hands-on Exercise. Include weekly milestones.\nOUTPUT FORMAT: Markdown table with columns: Day, Focus Topic, Hands-on Practice Task, Daily Output Deliverable.',
        improvedOutput:
          '| Day | Focus Topic | Hands-on Practice Task | Daily Output Deliverable |\n| :--- | :--- | :--- | :--- |\n| **Day 1 (Mon)** | STLC vs SDLC & QA vs QC | Draw the 6 STLC stages on paper for an e-commerce cart. | 1-page diagram comparing SDLC vs STLC |\n| **Day 2 (Tue)** | Requirement Analysis & User Stories | Review a sample user story: "User logs in with Google". Find 3 ambiguities. | 3 written clarification questions for Product Owner |\n| **Day 3 (Wed)** | Positive vs Negative Test Scenarios | Write 5 positive and 5 negative test scenarios for an ATM withdrawal. | 10 documented test scenario bullet points |\n| **Day 4 (Thu)** | Equivalence Partitioning (EP) | Design input partitions for an age verification field (18–60). | Partition table showing Valid & Invalid classes |\n| **Day 5 (Fri)** | Boundary Value Analysis (BVA) | Calculate exact boundary values: Min-1, Min, Min+1, Max-1, Max, Max+1 for a password length (8–16 chars). | 6 boundary test values with expected pass/fail status |\n| **Day 6 (Sat - 3h)** | End-to-End Test Case Authoring | Write 5 complete test cases using a standard Excel/Jira template (Preconditions, Steps, Expected Results). | Complete Test Suite artifact for E-Commerce Checkout |\n| **Day 7 (Sun)** | Weekly Review | Rest & review notes from Days 1–6. | Self-assessment score on Day 1–5 quiz |',
        improvementHighlights: [
          'Directly honors time availability (60 mins weekdays, 180 mins weekends).',
          'Replaced vague ideas with concrete daily deliverables.',
          'Structured output makes tracking daily progress trivial.',
        ],
        evaluationCriteria: {
          roleDefined: true,
          taskClear: true,
          contextProvided: true,
          constraintsIncluded: true,
          formatSpecified: true,
        },
      },
    ],
    guidedExercise: {
      title: 'Constructing an Actionable Study Plan Prompt',
      instructions:
        'Improve the weak prompt: "Help me study AI" into a high-impact prompt specifying your background, time limits, preferred learning style, and requesting a structured markdown table with practical deliverables.',
      taskContext:
        'Target goal: Learn Prompt Engineering basics in 7 days, spending 45 minutes every evening after work. Desired outcome is building a reusable prompt library.',
      starterPrompt: 'Help me study prompt engineering fast.',
      solutionPrompt:
        'ROLE: AI Literacy & Prompt Engineering Instructor\nTASK: Build a 7-day evening study schedule for a complete beginner.\nCONTEXT: Learner has 45 minutes per evening (7:00 PM – 7:45 PM). Goal is mastering prompt frameworks and building a personal prompt library.\nCONSTRAINTS: Every day must feature 20 mins of reading followed by 25 mins of interactive prompt experimentation. Include a tangible daily deliverable.\nOUTPUT FORMAT: Markdown table with columns: Day, Concept, Practice Prompt Exercise, Saved Prompt Deliverable.',
      expectedOutputCriteria: [
        'Includes explicit role (AI Instructor).',
        'Specifies exact 45-minute daily time allocation.',
        'Requires a practical daily deliverable to enforce "Learn by Doing".',
        'Requests structured table format.',
      ],
      rubricPoints: [
        'Time constraints clearly stated.',
        'Active practice prioritized over passive reading.',
        'Clear deliverable specified for each day.',
      ],
    },
    independentChallenge: {
      title: 'Two-Turn Follow-Up Refinement Challenge',
      promptGoal: 'Practice multi-turn prompting to turn a high-level explanation into an interactive quiz.',
      scenario: 'You want to understand the difference between Machine Learning and Traditional Programming.',
      constraints: [
        'Turn 1: Ask for a clear comparison with a physical analogy.',
        'Turn 2: Follow up by asking the AI to generate a 3-question self-test to check your understanding, hiding the answers at the bottom.',
      ],
      selfChecklist: [
        'Did Turn 2 reference the concepts introduced in Turn 1?',
        'Did you ask for answers to be formatted cleanly or hidden until the end?',
        'Is the tone conversational yet rigorous?',
      ],
    },
    workplaceScenarios: [
      {
        id: 'ws-2-1',
        title: 'Iterative Email Refinement for Project Delay',
        context: 'A critical software release is delayed by 48 hours due to a blocking database migration bug.',
        task: 'Draft an internal update to the VP of Engineering that is transparent, calm, and actionable.',
        modelPrompt:
          'ROLE: Senior Engineering Release Manager\nTASK: Draft an urgent status update email to the VP of Engineering informing them of a 48-hour release delay.\nCONTEXT: Staging database migration script corrupted foreign keys on customer orders. Team has rolled back safely. Fix is identified, testing takes 36 hours.\nCONSTRAINTS: Do not sound defensive. State: (1) Current status, (2) Root cause summary, (3) Safe rollback confirmation, (4) Next update checkpoint time.\nOUTPUT FORMAT: Formal workplace email with Subject line and bulleted action plan.',
        modelOutput:
          'Subject: [RELEASE UPDATE] Checkout v2.4 Deployment Rescheduled (+48h) — System Stable\n\nHi Sarah,\n\nI am writing to share an update regarding the planned Checkout v2.4 production deployment scheduled for tonight. We have rescheduled the release by 48 hours to Thursday at 10:00 PM IST to guarantee customer data integrity.\n\n**Current Status & Safety:**\n• Production remains completely untouched and 100% operational on v2.3.\n• Staging was safely rolled back within 8 minutes of defect detection; no data was compromised.\n\n**Root Cause Summary:**\nDuring staging smoke tests, migration script `V4_2__orders_foreign_keys.sql` produced an index lock timeout under concurrent cart writes, causing orphaned order rows.\n\n**Action Plan & Timeline:**\n1. Database Lead has patched the migration lock logic (Completed 16:30 IST).\n2. QA team is executing full data integrity regression suite on Staging (Estimated: 24–36 hours).\n3. Go/No-Go final staging checkpoint: Tomorrow (Wednesday) at 17:00 IST.\n\nI will send our next status report tomorrow at 12:00 PM IST. Please let me know if you would like a 10-minute briefing call before then.\n\nBest regards,\nPavan Kalyan | Release Engineering Lead',
        verificationTip: 'Verify all timestamps, version numbers, and stakeholder names before dispatching production delay notices.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q2-1',
          question: 'Why do short, single-keyword queries (e.g. "python tutorial") often produce disappointing AI answers?',
          options: [
            'Because AI models refuse to answer queries shorter than 50 words.',
            'Because without context, audience, and constraints, the model defaults to broad, encyclopedic generalities.',
            'Because short queries cause token memory leaks in the browser.',
            'Because search engines disable AI capabilities on short queries.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Without knowing your current experience level, specific goal, or time limits, the model must make broad statistical guesses, yielding generic overviews instead of tailored advice.',
        },
        {
          id: 'q2-2',
          question: 'What is the primary advantage of multi-turn conversational follow-up prompting?',
          options: [
            'It forces the model to reboot its training weights.',
            'It allows you to iteratively sculpt, correct, shorten, and format the output without re-typing your original context.',
            'It bypasses all AI usage billing.',
            'It ensures the AI never hallucinates any information.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Multi-turn prompting maintains active context in memory, allowing you to give targeted adjustment instructions (e.g. "convert Section 2 into a table", "simplify for an intern") with minimal typing.',
        },
        {
          id: 'q2-3',
          question: 'Which prompt instruction best prevents an AI assistant from generating overwhelming walls of dense text?',
          options: [
            '"Please think hard before you type."',
            '"OUTPUT FORMAT: Markdown table with columns [Category, Action Item, Owner, Due Date]."',
            '"Write as much as you possibly can."',
            '"Make sure this is 100% true and verified."',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Explicitly declaring structured output formats (Markdown tables, numbered checklists, key-value pairs) constrains the generative output into scannable, logical containers.',
        },
        {
          id: 'q2-4',
          question: 'When an initial AI response is too generic or superficial, what should your first action be?',
          options: [
            'Close the browser and give up on AI tools entirely.',
            'Issue a targeted follow-up prompt clarifying constraints, requesting real-world examples, or demanding step-by-step breakdown.',
            'Copy-paste the exact same prompt 10 times in a row.',
            'Reboot your computer.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'AI iteration is conversational. Providing corrective guidance ("Focus deeper on edge cases in step 2; provide concrete numbers") directly improves depth.',
        },
        {
          id: 'q2-5',
          question: 'If an AI response provides a complex financial or medical calculation, what is your responsibility?',
          options: [
            'Publish it immediately because AI does not make mathematical errors.',
            'Independently calculate or verify the figures against authoritative reference sources before making decisions.',
            'Assume the calculation is correct if it is formatted inside a pretty table.',
            'Delete the response immediately.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'LLMs are linguistic pattern engines, not deterministic calculation engines. High-stakes numbers must always be verified by humans or validated with dedicated calculation tools.',
        },
      ],
    },
    daySummary:
      'Day 2 taught active conversational collaboration: anchoring prompts with your background and constraints, steering the model through iterative follow-ups, and demanding structured formats like tables and checklists to make AI outputs immediately usable.',
  },

  // =========================================================================
  // DAY 3: Prompt Engineering Fundamentals
  // =========================================================================
  {
    dayNumber: 3,
    title: 'Day 3: Prompt Engineering Fundamentals',
    subtitle: 'The 6-Part Framework, eliminating ambiguity, persona assignment, and constraints.',
    badge: 'Day 3 of 7 • Framework Mastery',
    duration: '35–45 mins',
    objectives: [
      'Define prompt engineering as systematic communication with generative models.',
      'Master the 6-Part Prompt Architecture: Role, Task, Context, Constraints, Format, Success Criteria.',
      'Understand how persona/perspective assignment primes the model’s internal attention space.',
      'Identify and eliminate hidden ambiguities in prompt instructions.',
      'Transform weak, open-ended prompts into airtight, reproducible instructions.',
    ],
    introduction:
      'Prompt engineering is not about finding "magic words" or secret tricks. It is the practice of structured, unambiguous communication that guides an AI model to produce relevant, accurate, and properly formatted results on the first attempt.',
    topics: [
      {
        title: '1. The 6-Part Reusable Prompt Framework',
        summary: 'A modular, battle-tested mental model for drafting high-performance prompts.',
        explanation:
          'Whenever you need a high-stakes, professional result from an AI, organize your prompt around 6 key elements:\n\n1. **ROLE / PERSPECTIVE:** Who is the AI pretending to be? (e.g. Senior QA Architect, Friendly Biology Teacher, FinTech Compliance Officer).\n2. **TASK:** What is the primary verb and objective? (e.g. Draft, Critique, Summarize, Compare, Debug).\n3. **CONTEXT:** What background details, user data, or source text does the model need to know?\n4. **CONSTRAINTS:** What must the model NOT do? (e.g. Under 200 words, no technical jargon, use Indian Rupees, do not invent external facts).\n5. **OUTPUT FORMAT:** How should the response look? (e.g. Markdown table, bullet checklist, JSON object, 3-paragraph memo).\n6. **SUCCESS CRITERIA:** What makes this answer a win? (e.g. Actionable for an entry-level intern, immediately printable, covers 3 edge cases).\n\n*Note:* This is a practical framework, not a mandatory rigid formula. For simple quick questions, 2–3 elements suffice; for workplace deliverables, using all 6 guarantees excellence.',
        realWorldExample:
          'Compare: "Write an email about a bug" vs "ROLE: QA Lead. TASK: Write defect escalation email. CONTEXT: Payment gateway timeout. CONSTRAINTS: Under 150 words, non-accusatory. FORMAT: Formal email. SUCCESS CRITERIA: Clear repro steps and next war-room call time."',
        workedExample: {
          scenario: 'Applying the 6-Part Framework to a Test Plan Review',
          beforePrompt: 'Review my test plan and tell me if it is good.',
          beforeOutput: 'Your test plan looks fine. Make sure to cover positive and negative scenarios, test on multiple browsers, and log bugs in Jira.',
          afterPrompt:
            'ROLE: Lead Software Test Architect with 15 years experience in enterprise banking.\nTASK: Critically review the following 3 user authentication acceptance criteria.\nCONTEXT: High-volume retail banking portal with 10M active daily logins.\nCONSTRAINTS: Point out at least 2 security edge cases and 1 performance bottleneck. Keep tone objective and direct.\nOUTPUT FORMAT: 3-part critique: (1) Strengths, (2) Critical Omissions / Risks, (3) Revised Acceptance Criteria.\nSUCCESS CRITERIA: Criteria must be unambiguous and pass a SOC-2 security audit.',
          afterOutput:
            '**1. Strengths**\n• Basic credential validation and password complexity rules are clearly defined.\n• Lockout after 5 failed attempts is included.\n\n**2. Critical Omissions & Security Risks**\n• **Risk 1 (Rate Limiting & Credential Stuffing):** Lockout is tied only to the username; an attacker can rotate through 10,000 distinct usernames from the same IP address, causing distributed server exhaustion.\n• **Risk 2 (Session Concurrency):** No rule specifies whether the same user account can hold simultaneous active sessions across 3 different mobile devices and 2 browsers.\n• **Risk 3 (Timing Attacks):** The response time when an email exists vs when it does not must be identical to prevent user enumeration.\n\n**3. Revised Acceptance Criteria (Audit-Ready)**\n1. System shall enforce global IP-based rate limiting (maximum 15 authentication attempts per IP per minute).\n2. System shall terminate any prior active web session upon successful biometric login from a registered mobile device.\n3. Failed login errors shall return a uniform message: "Invalid credentials. Please check your username or password" with standardized 120ms artificial response padding.',
          explanation: 'The 6-part framework transformed a generic reassurance into an enterprise-grade security audit.',
        },
        commonMistakes: [
          'Skipping CONSTRAINTS: Leaving out word limits or negative boundaries leads to rambling essays.',
          'Vague TASK verbs: Using "talk about" or "look at" instead of "critique", "extract", or "benchmark".',
        ],
        keyTakeaways: [
          'Role + Task + Context + Constraints + Format + Success Criteria = Predictable Quality.',
          'Constraints are often more important than instructions because they eliminate unwanted outputs.',
        ],
      },
      {
        title: '2. The Power of Persona & Role Priming',
        summary: 'How assigning perspectives activates domain-specific vocabulary and reasoning pathways.',
        explanation:
          'In deep learning models, billions of parameters represent diverse topics, styles, and disciplines. When you start with "ROLE: Senior Pediatrician", the model\'s attention weights mathematically gravitate toward empathetic, medically responsible, and child-safe vocabulary. When you say "ROLE: Adversarial Security Penetration Tester", the attention shifts toward attack vectors, privilege escalation, and input sanitization. Assigning a role primes the model to adopt the exact mental model your task requires.',
        realWorldExample:
          'Prompting an AI to explain "Docker containers":\n• As a 5-year-old teacher: "Imagine your toys are packed in separate lunchboxes..."\n• As a Senior DevOps Engineer: "Containers are user-space isolated operating system environments leveraging Linux cgroups and namespaces..."',
        workedExample: {
          scenario: 'Comparing Persona Shifts',
          afterPrompt: 'Explain why database indexes speed up SELECT queries. First as a Chef in a busy kitchen, second as a Database Administrator.',
          afterOutput:
            '**As a Chef in a Kitchen:**\nImagine a spice pantry with 500 unmarked glass jars. To find cumin, you must sniff every single jar from left to right (Full Table Scan). An index is like labeling the pantry shelves alphabetically from A to Z: you walk straight to shelf "C", spot jar 4, and grab cumin in 3 seconds.\n\n**As a Database Administrator:**\nA B-tree index creates a balanced hierarchical tree structure pointing to row identifiers (RIDs) on disk. Instead of an O(N) sequential page read across millions of blocks, the engine executes an O(log N) tree traversal to fetch matching pointers, reducing I/O operations from 10,000 disk blocks to 3 block reads.',
          explanation: 'Different personas yield completely different levels of depth and analogy tailored to specific listeners.',
        },
        commonMistakes: [
          'Using generic personas like "helpful assistant" instead of specific domain roles like "Senior Payroll Compliance Specialist".',
        ],
        keyTakeaways: [
          'Be specific with personas: industry + role seniority + organizational context.',
          'Personas drastically reduce the need for lengthy style explanations.',
        ],
      },
      {
        title: '3. Identifying and Eliminating Ambiguity',
        summary: 'Spotting assumptions, missing units, vague pronouns, and open-ended phrasing.',
        explanation:
          'Ambiguity is the #1 killer of prompt performance. Words like "fast", "good", "brief", "recently", or "several" mean completely different things to different readers. To an AI, "Write a short summary" could mean 1 sentence or 4 paragraphs. "Analyze recent trends" could mean the year 2024 or the last 30 minutes. Always replace subjective adjectives with concrete metrics: instead of "brief", say "between 80 and 120 words"; instead of "recently", specify "between January 2023 and December 2024".',
        realWorldExample:
          'Ambiguous: "Give me some good interview questions for testing."\nUnambiguous: "Provide exactly 5 scenario-based interview questions assessing a candidate\'s knowledge of Boundary Value Analysis and Equivalence Partitioning in manual QA, with a 3-point scoring rubric for each."',
        workedExample: {
          scenario: 'De-bugging an Ambiguous Prompt',
          beforePrompt: 'Make this customer email sound nicer.',
          beforeOutput: 'Dear customer, we are very sorry for the issue. We will do our best to help you soon. Thank you for your patience!',
          afterPrompt:
            'ROLE: Luxury E-commerce Concierge Specialist\nTASK: Rewrite the following email to de-escalate an upset customer whose delivery is 3 days late.\nCONTEXT: Customer ordered a wedding anniversary gift. Order was delayed by courier weather disruptions.\nCONSTRAINTS: Acknowledge the emotional impact, do not make empty promises, offer a ₹1,000 store credit and express courier re-routing. Maximum 150 words.\nOUTPUT FORMAT: Customer-ready email with subject line.',
          afterOutput:
            'Subject: Update regarding your anniversary gift (Order #84920) — Personal message from RootAccess\n\nDear Priya,\n\nI understand how important your wedding anniversary this Thursday is, and I want to sincerely apologize that your order #84920 has been delayed due to severe weather disruptions across our northern courier hub.\n\nI know that apologies cannot replace having your gift in hand on your special day. To help make this right, I have personally upgraded your delivery to our Priority Express Courier at our expense and credited ₹1,000 to your RootAccess account for future use.\n\nYour revised tracking link shows delivery scheduled for Wednesday by 2:00 PM IST. I will be monitoring your package personally until it arrives at your doorstep.\n\nWarmest regards,\nAnanya Roy | Concierge Lead',
          explanation: 'Concrete constraints and clear situational context completely transformed the tone and usefulness of the output.',
        },
        commonMistakes: [
          'Using ambiguous words like "make it pop", "do it quickly", "give some options".',
          'Not specifying units of measure (INR vs USD, meters vs feet, minutes vs days).',
        ],
        keyTakeaways: [
          'If a human intern would ask clarifying questions about your prompt, an AI will guess the answers.',
          'Quantify everything: counts, word limits, tone descriptors, and constraints.',
        ],
      },
    ],
    playgroundScenarios: [
      {
        id: 'day3-vague-to-clear',
        title: 'Vague vs 6-Part Framework Transformer',
        category: 'writing',
        description: 'Watch how taking an ambiguous prompt and structuring it through the 6-Part Framework transforms output quality.',
        sampleContext: 'A team needs to write test cases for a new password reset page that sends an SMS link.',
        defaultFormat: 'Airtight Test Suite',
        weakPrompt: 'Write test cases for password reset.',
        weakOutput:
          '1. Test with valid email\n2. Test with invalid email\n3. Test with empty field\n4. Test clicking the reset link\n5. Test entering new password\n6. Test password confirmation mismatch',
        weakCritique: [
          'Extremely basic; misses SMS vs Email delivery mechanism mentioned in context.',
          'No preconditions, test data, or boundary validation.',
          'No edge cases (token expiration, multiple clicks, brute forcing).',
        ],
        improvedPrompt:
          'ROLE: Senior QA Test Lead\nTASK: Generate an exhaustive manual test suite for an SMS-based Password Reset workflow.\nCONTEXT: User enters 10-digit mobile number, receives an SMS with a 6-digit numeric OTP valid for 5 minutes, and sets a new password (8–20 chars, 1 uppercase, 1 special character).\nCONSTRAINTS: Include both Positive flows and critical Security / Boundary edge cases (expired OTP, rate limiting, SQL injection in phone field). Maximum 5 test cases.\nOUTPUT FORMAT: Markdown table with columns: Case ID, Scenario, Test Steps, Test Data, Expected Result, Severity.',
        improvedOutput:
          '| Case ID | Scenario | Test Steps | Test Data | Expected Result | Severity |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **TC-PR-01** | Happy Path: Valid SMS OTP & Password Reset | 1. Enter registered mobile\n2. Submit valid 6-digit OTP\n3. Enter valid new password\n4. Click Submit | Mobile: `9876543210`\nOTP: `549210`\nPWD: `RootAccess@2026` | Password updated in DB; user redirected to Login with success toast notification; all prior sessions invalidated | **Critical** |\n| **TC-PR-02** | Security: Expired OTP Submission (>5 mins) | 1. Generate OTP\n2. Wait 305 seconds\n3. Enter OTP and submit | Mobile: `9876543210`\nExpired OTP | Submission blocked; error message: "OTP has expired. Please request a new one"; no password input allowed | **High** |\n| **TC-PR-03** | Security: Brute Force OTP Rate Limiting | 1. Enter incorrect OTP 3 consecutive times | Mobile: `9876543210`\nIncorrect OTPs: `000000`, `111111`, `222222` | Account OTP requests temporarily locked for 15 minutes; warning SMS sent to owner | **High** |\n| **TC-PR-04** | Boundary: Password Character Constraints | 1. Attempt submitting 7-character password (below min 8) | PWD: `Root@12` (7 chars) | Inline validation error: "Password must be at least 8 characters long"; Submit button disabled | **Medium** |\n| **TC-PR-05** | Negative: Unregistered Mobile Number | 1. Enter valid 10-digit number not present in database | Mobile: `9999999999` | Generic message: "If this number is registered, an OTP has been sent" (prevents phone enumeration) | **Medium** |',
        improvementHighlights: [
          'Assigned Senior Test Lead role.',
          'Supplied exact functional constraints (5-minute expiration, 8–20 char password complexity).',
          'Enforced standard QA test documentation schema.',
        ],
        evaluationCriteria: {
          roleDefined: true,
          taskClear: true,
          contextProvided: true,
          constraintsIncluded: true,
          formatSpecified: true,
        },
      },
    ],
    guidedExercise: {
      title: 'Fixing 3 Weak Prompts using the 6-Part Framework',
      instructions:
        'Select one of the three weak prompts below and rewrite it using all 6 components of the framework (Role, Task, Context, Constraints, Format, Success Criteria).',
      taskContext:
        'Weak Prompt 1: "Help me write code."\nWeak Prompt 2: "Explain why bugs happen in software."\nWeak Prompt 3: "Make a marketing plan for my coaching class."',
      starterPrompt: 'Rewrite Weak Prompt 2 using the 6-part framework.',
      solutionPrompt:
        'ROLE: Principal Software Quality Consultant\nTASK: Explain the top 5 root causes of defects in commercial software systems.\nCONTEXT: Presentation to junior QA engineers and non-technical product managers.\nCONSTRAINTS: Avoid overly academic theory. Use everyday physical workplace examples. Under 300 words total.\nOUTPUT FORMAT: Numbered list with Root Cause Name, Real-World Example, and Preventative QA Action.\nSUCCESS CRITERIA: A junior engineer can immediately apply the preventative actions in their next sprint.',
      expectedOutputCriteria: [
        'Clear persona (Principal Software Quality Consultant).',
        'Specific count (top 5 root causes).',
        'Audience defined (junior QA & product managers).',
        'Concrete formatting with real-world examples.',
      ],
      rubricPoints: [
        'All 6 framework components present or clearly addressed.',
        'No ambiguous descriptors like "tell me a lot" or "be good".',
        'Direct connection between cause and preventative action.',
      ],
    },
    independentChallenge: {
      title: 'Prompt De-Ambiguity Audit',
      promptGoal: 'Find and fix 4 hidden ambiguities in a colleague’s prompt.',
      scenario: 'Your colleague drafted: "Write a short blog post about good QA tools soon."',
      constraints: [
        'Identify 4 distinct ambiguities in their prompt.',
        'Rewrite the prompt into an airtight 6-part instruction.',
      ],
      selfChecklist: [
        'Did I eliminate "short" by specifying exact word count?',
        'Did I eliminate "good" by specifying tool evaluation criteria (cost, learning curve, open-source)?',
        'Did I eliminate "soon" and "QA tools" by naming specific categories (e.g. Playwright, Postman, Jira)?',
      ],
    },
    workplaceScenarios: [
      {
        id: 'ws-3-1',
        title: 'Drafting Bug Reproduction Steps from Messy Slack Chats',
        context: 'A developer complains on Slack: "Users are reporting that the checkout button is broken on Safari when they try to use discounts."',
        task: 'Transform the messy chatter into a structured Jira bug report template.',
        modelPrompt:
          'ROLE: Senior QA Automation Engineer\nTASK: Convert the unstructured Slack complaint into a professional Jira bug ticket.\nCONTEXT: "Users reporting checkout button broken on Safari when trying to use discounts. Error in console says null pointer on coupon_code."\nCONSTRAINTS: Follow standard QA ticket schema. Include Title, Severity/Priority, Environment, Preconditions, Steps to Reproduce, Expected vs Actual Results, and Suggested Root Cause.\nOUTPUT FORMAT: Standard Jira ticket markdown format.',
        modelOutput:
          '**Issue Type:** Bug\n**Summary:** [Checkout] "Apply Coupon" button throws unhandled TypeError on Safari iOS & Desktop\n**Severity:** Major | **Priority:** High\n**Component:** Billing & Checkout / Web Frontend\n\n**Environment:**\n• Browser: Apple Safari v17.2+ (macOS & iOS)\n• Screen Resolution: Mobile & Desktop\n\n**Preconditions:**\n1. User has an active session with at least 1 item in cart.\n2. Cart subtotal is greater than ₹0.\n\n**Steps to Reproduce:**\n1. Navigate to `/checkout` on Safari browser.\n2. Click into the "Enter Promo Code" input field.\n3. Type coupon code `SAVE20`.\n4. Click the "Apply Coupon" button.\n5. Observe button behavior and inspect Safari Web Inspector Console.\n\n**Expected Result:**\nCoupon discount is applied, subtotal recalculates, and a green success banner appears.\n\n**Actual Result:**\nButton remains in loading state indefinitely. Safari console throws: `TypeError: null is not an object (evaluating \'coupon_code.trim\')`.\n\n**Suggested Root Cause:**\nSafari WebKit does not auto-populate default empty string for optional form parameters, causing null-pointer exception during `.trim()` invocation.',
        verificationTip: 'Always verify the exact browser version and console error stack trace before closing the bug ticket.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q3-1',
          question: 'In the 6-Part Prompt Framework, why is defining CONSTRAINTS often considered the most crucial step?',
          options: [
            'Because constraints make the model process tokens twice as fast.',
            'Because constraints eliminate the wide probability space of unwanted styles, excessive lengths, and hallucinated external facts.',
            'Because AI models refuse to respond if constraints are omitted.',
            'Because constraints allow you to bypass login authentication.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Without negative boundaries and constraints, the model generates whatever is statistically common, which often includes lengthy essays, inappropriate tones, or invented figures. Constraints anchor quality.',
        },
        {
          id: 'q3-2',
          question: 'What is the main benefit of specifying a detailed persona (e.g. "Senior Database Administrator") in your prompt?',
          options: [
            'It prevents the model from consuming your monthly tokens.',
            'It mathematically primes the attention mechanism to activate domain-specific vocabulary, technical depth, and industry perspective.',
            'It enables audio output from your computer speakers.',
            'It connects the AI to the live database server.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Personas focus the model’s internal attention on specialized vocabulary, common practices, and expert reasoning patterns associated with that profession.',
        },
        {
          id: 'q3-3',
          question: 'Which of the following phrases represents an ambiguous instruction that should be eliminated from a prompt?',
          options: [
            '"Between 150 and 200 words"',
            '"Format as a markdown table with 3 columns"',
            '"Make it sound really good and brief"',
            '"Include 2 positive test cases and 2 negative boundary cases"',
          ],
          correctAnswerIndex: 2,
          explanation:
            '"Good" and "brief" are subjective words with no universal definition. One person considers brief to be 10 words, another 500 words. Always use quantifiable numbers.',
        },
        {
          id: 'q3-4',
          question: 'What is the purpose of the SUCCESS CRITERIA element in a prompt?',
          options: [
            'To promise the AI a monetary bonus if it answers well.',
            'To explicitly define what standard or benchmark the answer must satisfy to be considered complete and ready to use.',
            'To tell the AI to print "Success!" at the bottom of the page.',
            'To automatically run a spell check in Google Docs.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Success criteria inform the model of the evaluation standard (e.g. "Must be understandable to a 10-year old", "Must be audit-compliant for SOC-2"), helping it tailor its depth and vocabulary.',
        },
        {
          id: 'q3-5',
          question: 'Is the 6-Part Framework mandatory for every single prompt you ever type to an AI?',
          options: [
            'Yes, if you omit a single part, the AI will throw an unhandled error.',
            'No; it is an organized mental model for high-stakes, professional tasks. Everyday quick questions can use 2 or 3 elements.',
            'Yes, international copyright law requires all 6 parts.',
            'No, because frameworks make AI answers worse.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'The framework is a mental scaffold. For asking "What is the capital of Peru?", you don\'t need 6 parts. For generating an enterprise test plan or executive delay notice, using all 6 guarantees excellence.',
        },
      ],
    },
    daySummary:
      'Day 3 established professional prompt architecture: Role, Task, Context, Constraints, Format, and Success Criteria. By eliminating ambiguity and applying explicit constraints, you turn unpredictable AI output into reliable, high-yield deliverables.',
  },

  // =========================================================================
  // DAY 4: Advanced Prompting Techniques
  // =========================================================================
  {
    dayNumber: 4,
    title: 'Day 4: Advanced Prompting Techniques',
    subtitle: 'Zero-shot vs Few-shot, Step-by-Step decomposition, Grounding with references, and Structured Data.',
    badge: 'Day 4 of 7 • Advanced Techniques',
    duration: '35–45 mins',
    objectives: [
      'Understand the difference between Zero-Shot prompting and Few-Shot prompting.',
      'Provide curated input/output examples to steer complex formatting and tone without lengthy rules.',
      'Apply Step-by-Step decomposition (Chain-of-Thought guidance) to prevent reasoning leaps.',
      'Ground AI answers strictly inside supplied reference material to minimize hallucinations.',
      'Understand the critical reality: No prompting technique can guarantee 100% elimination of hallucinations.',
    ],
    introduction:
      'When prompts require nuanced categorization, specialized formatting, or multi-step logic, telling the model what to do is often less effective than showing it. In Day 4, you will master Few-Shot prompting, step-by-step reasoning decomposition, and reference grounding.',
    topics: [
      {
        title: '1. Zero-Shot vs Few-Shot Prompting (Learning by Example)',
        summary: 'How supplying 2–3 exemplar pairs achieves 10x better consistency than paragraphs of rules.',
        explanation:
          'Zero-Shot prompting is asking the model to perform a task without giving it any prior examples (e.g. "Classify this bug severity: The app crashed on launch"). Few-Shot prompting is providing 2 or 3 completed examples of (Input -> Output) before supplying your actual target input. LLMs are pattern-matching engines; when they see the exact structure, tone, and logic of your examples, they mirror the pattern with uncanny accuracy. Few-shot is especially powerful for classification, custom tagging, and structured JSON output.',
        realWorldExample:
          'Classifying user feedback: Instead of explaining: "Be helpful, categorize into Bug, Feature, or Question, and assign a priority from P1 to P3", provide 3 short pairs:\nExample 1: "I forgot my password" -> Category: Question | Priority: P3\nExample 2: "Checkout button charged me twice" -> Category: Bug | Priority: P1\nNow process: "Can you add dark mode?" -> Model immediately outputs: Category: Feature | Priority: P3.',
        workedExample: {
          scenario: 'Few-Shot Defect Classification',
          afterPrompt:
            'TASK: Classify incoming bug reports into [Blocker, Major, Minor] based on business impact.\n\n--- EXAMPLES ---\nInput: "User cannot complete credit card purchase on cart screen."\nOutput: Classification: Blocker | Reason: Directly halts revenue generation.\n\nInput: "Footer copyright year shows 2023 instead of 2026."\nOutput: Classification: Minor | Reason: Visual discrepancy with zero functional impact.\n\n--- ACTUAL TASK ---\nInput: "Export to CSV button downloads an empty file on the Analytics page."',
          afterOutput:
            'Output: Classification: Major | Reason: Core data extraction feature is non-functional, but users can still view metrics on-screen without crashing the portal.',
          explanation: 'The model mimicked the exact classification structure and concise business justification without any ambiguity.',
        },
        commonMistakes: [
          'Providing inconsistent or contradictory examples in your few-shot prompt.',
          'Supplying 20 examples when 2 or 3 clear exemplars are sufficient, wasting token budget.',
        ],
        keyTakeaways: [
          'Show, don\'t just tell: 2 high-quality examples beat 500 words of instructions.',
          'Few-shot prompting enforces identical formatting across repetitive data processing.',
        ],
      },
      {
        title: '2. Step-by-Step Decomposition (Guiding the Reasoning Chain)',
        summary: 'Breaking complex logic into sequential phases to prevent the model from jumping to false conclusions.',
        explanation:
          'When faced with complex analysis, an AI model that attempts to write the final conclusion in its first sentence frequently hallucinates. By prompting the model to: "Think through this step-by-step: First list the facts, Second identify the conflicts, Third formulate your recommendation", you force the model to generate intermediate reasoning tokens. Because future token predictions depend on past tokens, generating the intermediate steps guides the model to a much more accurate conclusion.',
        realWorldExample:
          'Reviewing a 5-page legal contract: Instead of asking "Is this contract safe?", prompt: "Step 1: Extract all penalty clauses. Step 2: Identify payment terms exceeding 30 days. Step 3: Flag any unilateral indemnity liabilities. Step 4: Summarize overall risk score."',
        workedExample: {
          scenario: 'Step-by-step logic puzzle & validation',
          afterPrompt:
            'A QA team has 3 testers. Tester A tests 4 user stories per day. Tester B tests 6 stories per day. Tester C tests 5 stories per day. A sprint has 45 user stories total. Work step-by-step to calculate how many full working days the team needs to complete testing, and show all work.',
          afterOutput:
            '**Step 1: Calculate Total Team Velocity per Day**\n• Tester A = 4 stories/day\n• Tester B = 6 stories/day\n• Tester C = 5 stories/day\n• Total Team Daily Capacity = 4 + 6 + 5 = **15 user stories per day**.\n\n**Step 2: Calculate Required Days**\n• Total User Stories to test = 45 stories.\n• Days required = Total Stories / Daily Capacity = 45 / 15 = **3.0 days**.\n\n**Step 3: Verification & Conclusion**\n• Day 1: 15 stories tested (30 remaining)\n• Day 2: 15 stories tested (15 remaining)\n• Day 3: 15 stories tested (0 remaining)\n• **Final Answer:** The team requires exactly **3 full working days**.',
          explanation: 'Decomposing the problem into intermediate calculations guarantees mathematical transparency and prevents calculation errors.',
        },
        commonMistakes: [
          'Assuming step-by-step prompting eliminates all errors: always verify calculations with a calculator or spreadsheet.',
        ],
        keyTakeaways: [
          'Instruct the model to "Work step-by-step before stating the final answer".',
          'Intermediate reasoning tokens serve as the AI\'s working memory.',
        ],
      },
      {
        title: '3. Grounding with Reference Material & The Fallibility Principle',
        summary: 'Restricting answers strictly to supplied context and accepting that no prompt eliminates hallucinations completely.',
        explanation:
          'To prevent an AI from hallucinating, "ground" it by supplying the reference text directly in your prompt and instructing: "Answer the question strictly using the provided text below. If the answer is not contained in the text, respond: \'The supplied document does not contain this information.\' Do not use external knowledge."\n\n**The Golden Rule of Prompting:** No prompting technique, framework, or model architecture can guarantee 100% elimination of hallucinations. Anyone claiming a "prompt that eliminates all errors" does not understand how probabilistic language models work. Always design human verification checkpoints for high-stakes work.',
        realWorldExample:
          'Customer support bots answering return policy questions: Ground the prompt with the exact PDF text of your company return policy so the model does not invent a 60-day refund window when your policy allows only 14 days.',
        workedExample: {
          scenario: 'Grounding prompt against a product specification',
          afterPrompt:
            'CONTEXT: "RootAccess Pro Plan includes: 20 Playwright automation lessons, 5 SQL sandboxes, and 3 mock interviews. Access duration is 12 months. Certificate awarded at 80% passing grade."\n\nTASK: Does the Pro Plan include 1-on-1 live resume reviews?\n\nCONSTRAINTS: Answer strictly from the CONTEXT. If not mentioned, state that it is not covered.',
          afterOutput: 'The supplied document does not contain information about 1-on-1 live resume reviews.',
          explanation: 'Because the prompt explicitly instructed the model not to invent external facts, it safely declined to guess.',
        },
        commonMistakes: [
          'Believing that advanced prompting techniques make independent human verification unnecessary.',
          'Pasting unverified marketing claims into AI and asking it if they are true without supplying source studies.',
        ],
        keyTakeaways: [
          'Grounding answers in supplied text is the single most effective hallucination defense.',
          'Always provide an explicit "escape hatch": tell the model it is allowed to say "I don\'t know".',
        ],
      },
    ],
    playgroundScenarios: [
      {
        id: 'day4-notes-to-action-items',
        title: 'Unstructured Notes to Structured Action Items',
        category: 'productivity',
        description: 'Demonstrate how step-by-step decomposition converts messy, chaotic meeting notes into a clean tabular action plan with owners and deadlines.',
        sampleContext:
          'Meeting transcript excerpt: "Rohan mentioned that the checkout page is throwing errors on mobile Safari. Priya said she can patch the CSS by Wednesday if design gives her the Figma file. Amit will talk to the payment gateway team today because OTPs are taking 2 minutes to arrive. We need to tell the VP by Friday."',
        defaultFormat: 'Categorized Action Table',
        weakPrompt: 'Summarize the meeting notes.',
        weakOutput:
          'The meeting discussed issues with mobile Safari checkout errors. Priya will fix the CSS by Wednesday after receiving Figma files. Amit will check the payment gateway OTP delay today, and someone needs to update the VP by Friday.',
        weakCritique: [
          'Paragraph format makes tracking tasks difficult for team members.',
          'Does not separate immediate blockers from scheduled tasks.',
          'Misses explicit status tracking (Not Started, In Progress, Blocked).',
        ],
        improvedPrompt:
          'ROLE: Technical Scrum Master\nTASK: Transform the provided unstructured meeting notes into an actionable sprint task board.\nCONTEXT: Provided meeting transcript snippet.\nCONSTRAINTS: Step 1: Extract all identified issues. Step 2: Assign an explicit owner and deadline to every item. If an owner is unassigned, flag as [Needs Assignment].\nOUTPUT FORMAT: Markdown table with columns: Task ID, Action Item, Owner, Deadline, Priority, Dependency/Blocker.',
        improvedOutput:
          '| Task ID | Action Item | Owner | Deadline | Priority | Dependency / Blocker |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| **ACT-01** | Investigate & resolve payment gateway OTP 2-minute latency | Amit | Today (COB) | **P1 - Blocker** | Payment Gateway Vendor API status |\n| **ACT-02** | Patch mobile Safari checkout CSS layout defect | Priya | Wednesday | **P2 - High** | Blocked on Design team providing Figma link |\n| **ACT-03** | Compile executive delay briefing and send status update | **[Needs Assignment - Assign PM]** | Friday (12:00 PM) | **P2 - High** | Resolution of ACT-01 and ACT-02 |\n\n**Immediate Scrum Blocker:** Figma link must be shared with Priya today to prevent downstream Friday delay.',
        improvementHighlights: [
          'Decomposed the task into extraction, assignment, and dependency analysis.',
          'Flagged missing ownership ("Needs Assignment") rather than guessing.',
          'Highlighted the critical path blocker at the bottom.',
        ],
        evaluationCriteria: {
          roleDefined: true,
          taskClear: true,
          contextProvided: true,
          constraintsIncluded: true,
          formatSpecified: true,
        },
      },
    ],
    guidedExercise: {
      title: 'Few-Shot Prompt Construction for Bug Triaging',
      instructions:
        'Create a Few-Shot prompt that provides 2 sample defect classifications (Input -> Output) and then asks the model to classify a 3rd new bug report.',
      taskContext:
        'Target: Categorize bugs into UI, Backend, or Database, with an assigned Severity (Critical, Major, Minor).',
      starterPrompt: 'Classify this bug: "User search query times out after 30 seconds."',
      solutionPrompt:
        'ROLE: QA Triage Specialist\nTASK: Categorize incoming defect descriptions by Category [UI, Backend, Database] and Severity [Critical, Major, Minor].\n\n--- EXAMPLE 1 ---\nInput: "Login button text is misaligned by 5px on iPhone 13."\nOutput: Category: UI | Severity: Minor | Action: Log in backlog\n\n--- EXAMPLE 2 ---\nInput: "Checkout transaction completes but order table shows NULL customer_id."\nOutput: Category: Database | Severity: Critical | Action: Hotfix immediately\n\n--- TASK TO EVALUATE ---\nInput: "User product search query times out after 30 seconds when filtering by price."',
      expectedOutputCriteria: [
        'Model outputs: Category: Backend / Database | Severity: Major or Critical.',
        'Follows the identical single-line output schema established in the two examples.',
      ],
      rubricPoints: [
        'Includes at least 2 complete, high-quality few-shot examples.',
        'Maintains uniform schema between examples and final task.',
        'Demonstrates clear differentiation of severity levels.',
      ],
    },
    independentChallenge: {
      title: 'Grounded Fact-Checking Challenge',
      promptGoal: 'Force an AI model to decline answering when source text lacks information.',
      scenario: 'You are supplying a 100-word paragraph about a software update and asking what the price of the software is.',
      constraints: [
        'Explicitly state that the model must NOT use external knowledge.',
        'Provide the exact refusal phrase it must use if the information is absent.',
      ],
      selfChecklist: [
        'Did I include the explicit refusal instruction ("State: Information not provided")?',
        'Did I test with a question whose answer is truly missing from the text?',
      ],
    },
    workplaceScenarios: [
      {
        id: 'ws-4-1',
        title: 'Step-by-Step Security Threat Modeling',
        context: 'A junior engineer designed a public file upload form for user profile pictures.',
        task: 'Conduct a step-by-step threat modeling review identifying 4 attack vectors.',
        modelPrompt:
          'ROLE: Application Security Architect\nTASK: Conduct a step-by-step threat modeling analysis of an unauthenticated file upload endpoint for user avatars.\nCONTEXT: Endpoint accepts `.jpg`, `.png`, and `.gif`. Files are saved directly to local `/var/www/uploads` folder and served publicly.\nCONSTRAINTS: Step 1: Identify 4 concrete attack vectors. Step 2: Rate each risk (CVSS style). Step 3: Provide exact remediation code pattern.\nOUTPUT FORMAT: 3-part security advisory report.',
        modelOutput:
          '**1. Attack Vector Identification**\n• **Vector 1: Malicious Executable Upload (Remote Code Execution):** Attacker uploads a PHP script disguised as `avatar.php.jpg` or exploits double extensions to execute arbitrary commands on the web server.\n• **Vector 2: Denial of Service via Storage Exhaustion:** Unauthenticated endpoint allows infinite 50MB file uploads in a script loop, filling server disk partition and crashing production.\n• **Vector 3: Stored Cross-Site Scripting (XSS) via SVG/HTML:** Attacker uploads an SVG file containing `<script>alert(document.cookie)</script>` that executes in victim browsers when viewing the avatar link.\n• **Vector 4: Path Traversal:** File name like `../../etc/cron.d/malicious` overwrites critical system files.\n\n**2. Risk Assessment**\nOverall Risk Rating: **CRITICAL (CVSS 9.8)**. Direct public upload into server local storage allows immediate server compromise.\n\n**3. Required Architecture Remediation**\n1. Move storage off-server into private AWS S3 / Google Cloud Storage with zero public execute permissions.\n2. Re-encode and sanitize every image server-side using a trusted image processor (e.g. Sharp / ImageMagick) to strip all metadata and embedded scripts.\n3. Discard client-supplied filenames: generate random UUIDs (`photo-9b1deb4d.jpg`).\n4. Enforce strict server-side file signature (magic byte) verification; never trust the `Content-Type` header alone.',
        verificationTip: 'Always verify file upload protections using automated security scanners (OWASP ZAP) in staging before deployment.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q4-1',
          question: 'What is the key difference between Zero-Shot and Few-Shot prompting?',
          options: [
            'Zero-shot uses zero tokens, while few-shot costs money.',
            'Zero-shot provides no prior examples; few-shot supplies 2 or 3 completed exemplar pairs (Input -> Output) to guide the pattern.',
            'Zero-shot is only for programming code; few-shot is only for creative writing.',
            'Few-shot runs faster on mobile phones.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Few-shot prompting shows the model concrete examples of desired input/output pairs, priming it to mirror the exact format, style, and categorization logic without complex rule descriptions.',
        },
        {
          id: 'q4-2',
          question: 'Why does instructing a model to "Think step-by-step before answering" improve reasoning accuracy?',
          options: [
            'Because it slows down the computer processor to prevent overheating.',
            'Because generating intermediate reasoning steps provides contextual tokens that mathematically steer the final conclusion toward truth.',
            'Because AI models cannot execute arithmetic without being told to think.',
            'Because it forces the AI to check the live Wikipedia database.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'LLMs predict one token at a time. When forced to write out their intermediate logic, the generated intermediate tokens become part of the active context, preventing the model from jumping to false conclusions.',
        },
        {
          id: 'q4-3',
          question: 'Can any advanced prompting technique (such as Few-Shot or Chain-of-Thought) guarantee 100% elimination of hallucinations?',
          options: [
            'Yes, if you use all 6 framework steps, hallucinations are mathematically impossible.',
            'No. Generative language models are inherently probabilistic; no prompting technique can guarantee 100% factual accuracy.',
            'Yes, prompt engineering is an exact science that guarantees perfection.',
            'Yes, if you write the prompt in ALL-CAPS.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Crucial principle: Language models operate on probabilities, not deterministic truth. While grounding and step-by-step techniques reduce hallucinations significantly, human verification remains essential for high-stakes work.',
        },
        {
          id: 'q4-4',
          question: 'What is "Reference Grounding" in prompt engineering?',
          options: [
            'Plugging your computer into an electrical grounding outlet.',
            'Restricting the AI’s answer strictly to a supplied excerpt of text, instructing it to decline answering if the text does not contain the answer.',
            'Providing links to Google searches inside your prompt.',
            'Asking the AI to write a bibliography of 100 books.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Grounding confines the model to synthesize answers solely from provided reference text, preventing it from inventing external facts or making speculative leaps.',
        },
        {
          id: 'q4-5',
          question: 'When creating a Few-Shot prompt, what is a common mistake that degrades output quality?',
          options: [
            'Providing 2 clear, mutually consistent examples.',
            'Using inconsistent formats or contradictory answers between the provided examples.',
            'Specifying clear category labels.',
            'Testing the prompt in an interactive playground.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'If your few-shot examples contradict each other (e.g. Example 1 calls something "P1" and Example 2 calls the identical issue "P3"), the model receives conflicting pattern signals and produces unpredictable results.',
        },
      ],
    },
    daySummary:
      'Day 4 unlocked advanced techniques: Few-Shot prompting teaches through concrete examples, Step-by-Step decomposition guides complex reasoning, and Reference Grounding tethers output to authoritative source text while respecting the fundamental rule that human verification is always necessary.',
  },

  // =========================================================================
  // DAY 5: AI for Work and Productivity
  // =========================================================================
  {
    dayNumber: 5,
    title: 'Day 5: AI for Work and Productivity',
    subtitle: 'Research synthesis, professional email drafting, spreadsheet assistance, and code explanations.',
    badge: 'Day 5 of 7 • Workplace Applications',
    duration: '35–45 mins',
    objectives: [
      'Summarize long, dense documents without losing critical numerical details or caveats.',
      'Draft and polish high-stakes professional emails, status updates, and meeting notes.',
      'Use AI for spreadsheet formula generation and tabular data restructuring.',
      'Use AI to explain unfamiliar code and technical errors without blindly copy-pasting solutions.',
      'Understand enterprise security: Never upload confidential IP, customer PII, or credentials.',
    ],
    introduction:
      'In Day 5, we transition from theoretical prompt engineering to high-impact workplace productivity. You will learn how to turn AI into a tireless executive assistant that summarizes dense reports, drafts sensitive client communications, writes complex spreadsheet formulas, and demystifies technical code.',
    topics: [
      {
        title: '1. Executive Document Summarization & Caveat Preservation',
        summary: 'How to distill 20-page documents into 1-page summaries while preserving critical conditions.',
        explanation:
          'Naive summaries ("Summarize this document") lose 90% of what matters: quantitative figures, deadlines, edge-case conditions, and risks. High-value workplace summarization requires an extraction-oriented prompt: "ROLE: Executive Chief of Staff. TASK: Extract (1) Core Strategic Decision, (2) Key Financial Projections with exact numbers, (3) Top 3 Operational Risks, and (4) Next Milestone Deadlines. CONSTRAINTS: Do not omit conditional words like \'if\', \'subject to\', or \'pending regulatory review\'."',
        realWorldExample:
          'Summarizing a 15-page vendor contract: Generic summary says "Vendor provides cloud hosting". Rigorous extraction reveals "Vendor uptime SLA is 99.5%, excluding unannounced maintenance windows on Sunday mornings, with maximum liability capped at 1 month fee."',
        workedExample: {
          scenario: 'Summarizing a quarterly quality report',
          afterPrompt:
            'ROLE: Lead Quality Director\nTASK: Summarize the following Q3 defect report for the Chief Technology Officer.\nCONTEXT: "Q3 saw 142 total bugs logged, down 12% from Q2. However, P1 production incidents rose from 2 to 6, primarily due to the October database migration. Average Time to Detect (MTTD) was 14 minutes, but Time to Resolve (MTTR) worsened from 45 mins to 3.2 hours due to lack of rollback scripts."\nCONSTRAINTS: Highlight the contrast between total volume vs high-severity incidents. Include exact MTTR metric.\nOUTPUT FORMAT: 3 bullet points with bold metrics.',
          afterOutput:
            '• **Incident Volume vs Severity Divergence:** While overall defect volume decreased by 12% (142 bugs in Q3), critical P1 production outages tripled from 2 to 6 incidents, driven by the October database migration.\n• **Resolution Bottleneck (MTTR Alert):** While detection remained rapid (MTTD: 14 minutes), Mean Time to Resolve deteriorated drastically by 326% (from 45 minutes to 3.2 hours) due to missing automated rollback scripts.\n• **Immediate Executive Recommendation:** Freeze un-scripted schema migrations and mandate automated 1-click rollback verification before Q4 deployment approvals.',
          explanation: 'The summary captured both the positive macro trend and the dangerous operational bottleneck with exact metrics.',
        },
        commonMistakes: [
          'Allowing the AI to smooth over alarming metrics with generic positive language.',
          'Pasting documents with confidential customer names without redacting them first.',
        ],
        keyTakeaways: [
          'Direct the model to look for risks, numbers, and conditional requirements.',
          'Always preserve caveats: "subject to approval", "conditional upon", "excluding holidays".',
        ],
      },
      {
        title: '2. Spreadsheet & Formula Assistance (Excel & Google Sheets)',
        summary: 'Writing complex VLOOKUP, INDEX/MATCH, REGEX, and nested IF formulas without syntax headaches.',
        explanation:
          'Spreadsheets power business operations, but remembering complex nested formulas (`INDEX/MATCH`, `XLOOKUP`, `SUMIFS`, conditional formatting formulas) slows teams down. An AI model acts as a 24/7 spreadsheet expert. When asking for formulas, specify: (1) The application (Excel vs Google Sheets), (2) Exact column letters and headers (e.g. Column A is "Order Date", Column D is "Status"), and (3) The exact edge case (e.g. "What should happen if the customer ID is not found? Return \'Not Enrolled\' instead of #N/A").',
        realWorldExample:
          'Reconciling payments: "Write a Google Sheets formula in cell F2 to lookup the payment status in sheet \'Transactions\' Column C matching the Order ID in cell A2. If missing, display \'Payment Pending\'."',
        workedExample: {
          scenario: 'Writing an XLOOKUP with error handling',
          afterPrompt:
            'I am using modern Microsoft Excel. In Column A, I have "Student Email". In Sheet2 Column A, I have "Registered Email", and Sheet2 Column C has "Course Pass Status" (Pass/Fail).\nWrite an Excel formula for cell B2 in Sheet1 that looks up the student\'s status. If the email is not found in Sheet2, return "Not Registered". Explain how it works in 1 sentence.',
          afterOutput:
            '**Formula for Cell B2:**\n`=XLOOKUP(A2, Sheet2!A:A, Sheet2!C:C, "Not Registered", 0)`\n\n**How It Works:**\n`XLOOKUP` searches for the email in cell A2 within Sheet2 Column A, returns the matching status from Sheet2 Column C, and if no match is found, safely displays "Not Registered" instead of an ugly `#N/A` error.',
          explanation: 'Providing exact sheet names and column letters generated a copy-paste formula with built-in error handling.',
        },
        commonMistakes: [
          'Not specifying whether you are using Google Sheets or Excel (certain functions like `ARRAYFORMULA` or `QUERY` behave differently).',
        ],
        keyTakeaways: [
          'Supply exact column letters, row numbers, and sample values.',
          'Always specify the fallback error value for missing matches.',
        ],
      },
      {
        title: '3. Technical Explanations & The Anti-Blind-Trust Rule',
        summary: 'Using AI to demystify complex code, SQL queries, and error logs without blindly executing generated code.',
        explanation:
          'AI is an exceptional technical tutor. If you encounter an intimidating SQL query with 4 `JOINs` or a Playwright error log spanning 50 lines, ask the AI: "ROLE: Senior Software Engineer. TASK: Explain this error in plain English for a beginner. Identify which exact line failed and what caused it."\n\n**CRITICAL WORKPLACE WARNING:** Never blindly copy-paste AI-generated code or terminal commands directly into a production system. An AI can easily suggest a destructive command (`rm -rf`, `DROP TABLE`, misconfigured AWS policies) that deletes data. Always inspect, understand, and test generated code in a local sandbox first.',
        realWorldExample:
          'A junior tester pastes a 100-line terminal crash log into AI: AI immediately highlights line 42: "ECONNREFUSED 127.0.0.1:5432" and explains: "Your local PostgreSQL database server is not running; start it with `brew services start postgresql`."',
        workedExample: {
          scenario: 'Explaining a complex SQL Window Function',
          afterPrompt:
            'Explain this SQL query to a beginner tester:\n`SELECT student_id, score, DENSE_RANK() OVER (PARTITION BY course_id ORDER BY score DESC) as rank FROM submissions;`',
          afterOutput:
            '**Plain English Explanation:**\nThis query ranks students by their test scores within each distinct course:\n1. `PARTITION BY course_id`: Groups the students into separate virtual buckets, one bucket for each course.\n2. `ORDER BY score DESC`: Inside each course bucket, sorts students from highest score to lowest score.\n3. `DENSE_RANK()`: Assigns rank numbers (1, 2, 3...) to students based on score. If two students tie for 1st place, both get rank 1, and the next student receives rank 2 (no numbers are skipped).\n4. **Tester Tip:** In your test cases, create a tie score (e.g. two students with 95 points) to verify that `DENSE_RANK()` does not produce a ranking gap.',
          explanation: 'The AI broke down each clause and provided a direct, practical testing tip for validating edge-case ties.',
        },
        commonMistakes: [
          'Executing database migration scripts or shell commands without reviewing them.',
          'Uploading private corporate database schemas with confidential customer column names.',
        ],
        keyTakeaways: [
          'AI is brilliant at translating cryptic logs into plain English.',
          'Never execute AI code on production systems without line-by-line review.',
        ],
      },
    ],
    playgroundScenarios: [
      {
        id: 'day5-workplace-synthesis',
        title: 'Comprehensive Workplace Scenario Synthesis',
        category: 'productivity',
        description: 'Take a messy customer incident and generate: (1) Executive Summary, (2) Action Items, (3) Customer Email, (4) Verification Checklist.',
        sampleContext:
          'Incident Note: At 2:15 PM, our mobile app payment gateway crashed for 35 minutes due to an expired SSL certificate on the payment vendor\'s server. 120 customer orders failed at checkout. The SSL cert was renewed at 2:50 PM. Customer accounts were not charged, but their carts were emptied.',
        defaultFormat: '4-Part Incident Resolution Package',
        weakPrompt: 'Write an email to customers and a summary for the team.',
        weakOutput:
          'Dear customer, we had a payment outage today for 35 minutes because of an SSL issue. Your cart was emptied but you were not charged. Please try again.\n\nTeam summary: The gateway was down from 2:15 to 2:50 PM. SSL certificate expired. 120 orders failed. Fixed now.',
        weakCritique: [
          'Lacks empathy and brand professionalism in the customer communication.',
          'Does not offer any incentive or discount to recover the 120 lost sales.',
          'Team summary has zero preventative action items or monitoring alerts.',
        ],
        improvedPrompt:
          'ROLE: Incident Commander & Customer Retention Lead\nTASK: Create a 4-part incident resolution package from the provided payment outage notes:\n1. Concise Executive Summary with impact metrics.\n2. Prioritized Team Action Items with owners.\n3. Empathic, professional email to the 120 affected customers offering a 15% recovery discount.\n4. Verification Checklist for post-incident review.\nCONSTRAINTS: Do not blame external vendors defensively in the customer email. Tone must be accountable, calm, and customer-first.\nOUTPUT FORMAT: 4 distinct labeled sections with markdown formatting.',
        improvedOutput:
          '### 1. Executive Incident Summary\n• **Incident Window:** 14:15 – 14:50 IST (Duration: 35 minutes).\n• **Root Cause:** Third-party payment gateway endpoint SSL certificate expiration.\n• **Business Impact:** 120 customer checkout transactions failed; estimated immediate GMV at risk: ₹2,40,000.\n• **Financial Safety:** Confirmed 0 duplicate charges or unauthorized debits; all customer banking data remained 100% secure.\n\n### 2. Prioritized Team Action Items\n| Action Item | Owner | Target Completion | Status |\n| :--- | :--- | :--- | :--- |\n| Automated SSL certificate expiry monitoring (alert 30 days prior) | DevOps (Vikram) | Tomorrow (12:00 PM) | In Progress |\n| Cart restoration script: Restore emptied carts for the 120 affected users | Backend (Amit) | Today (17:00 IST) | Urgent |\n| Post-mortem RCA meeting with Payment Gateway account executive | Lead Architect (Pavan) | Thursday (14:00 IST) | Scheduled |\n\n### 3. Customer Recovery Email\n**Subject:** An apology and update regarding your RootAccess order\n\nDear [Customer Name],\n\nEarlier today between 2:15 PM and 2:50 PM, our checkout system experienced a temporary technical interruption that prevented your order from completing.\n\nWe want to reassure you that **your bank account was not charged**, and your financial details remained completely secure throughout. We know how frustrating it is to have your shopping interrupted, and we sincerely apologize for the inconvenience.\n\nWe have automatically restored your selected items to your cart. To thank you for your patience, please use the promo code **MAKEITRIGHT15** for **15% off your entire order** when you complete your purchase over the next 48 hours:\n\n[Button: Return to Your Saved Cart]\n\nIf you have any questions or need assistance, simply reply directly to this email.\n\nWarm regards,\nThe RootAccess Care Team\n\n### 4. Verification Checklist for Sign-Off\n- [ ] Verified that 0 customer bank accounts were debited during the 35-minute failure window.\n- [ ] Confirmed payment gateway SSL certificate validity is now extended through November 2027.\n- [ ] Successfully executed 3 test checkout transactions on iOS, Android, and Desktop web.\n- [ ] Automated SSL expiry alert configured in Datadog/PagerDuty.',
        improvementHighlights: [
          'Delivered all 4 required components with professional polish.',
          'Transformed a brand crisis into a customer recovery opportunity with discount promo.',
          'Included an actionable verification checklist ensuring zero unresolved edge cases.',
        ],
        evaluationCriteria: {
          roleDefined: true,
          taskClear: true,
          contextProvided: true,
          constraintsIncluded: true,
          formatSpecified: true,
        },
      },
    ],
    guidedExercise: {
      title: 'Drafting an Incident Resolution Package',
      instructions:
        'Using the provided workplace notes regarding a 20-minute server downtime during month-end payroll, draft a prompt asking an AI for: (1) Executive Summary, (2) Action Items, (3) Employee Announcement, and (4) Verification Checklist.',
      taskContext:
        'Incident: Payroll server ran out of disk space at 11:30 AM due to unrotated log files. System was restarted at 11:50 AM after clearing logs. 400 employees experienced delay accessing payslips. Salaries were credited to bank accounts normally.',
      starterPrompt: 'Write a summary and email about payroll downtime.',
      solutionPrompt:
        'ROLE: IT Operations Lead\nTASK: Generate a 4-part workplace resolution package for a 20-minute payroll portal downtime.\nCONTEXT: Disk filled by unrotated logs at 11:30 AM. Resolved at 11:50 AM by log purge and disk expansion. Direct deposit salaries were NOT impacted; only web payslip downloads were delayed.\nCONSTRAINTS: Employee email must be reassuring and emphasize that salary payments were completed on time. Technical summary must detail log rotation fix.\nOUTPUT FORMAT: 4 labeled sections: (1) Executive Summary, (2) Action Items Table, (3) Employee Broadcast Email, (4) Verification Checklist.',
      expectedOutputCriteria: [
        'Reassures employees that bank salary deposits were completely unaffected.',
        'Technical action item mandates automated log rotation (logrotate / S3 archive).',
        'Verification checklist confirms disk space utilization is below safe threshold (<60%).',
      ],
      rubricPoints: [
        'Accurately separates salary payment status from payslip portal access.',
        'Professional, reassuring communication tone.',
        'Root cause prevention addressed.',
      ],
    },
    independentChallenge: {
      title: 'Spreadsheet Formula Design Challenge',
      promptGoal: 'Use AI to generate a multi-condition Google Sheets formula with error handling.',
      scenario: 'You have a sheet with student marks. If score is >= 80, "Distinction"; if >= 50, "Pass"; otherwise "Needs Review". If score cell is blank, return "Not Attempted".',
      constraints: [
        'Ask for both Google Sheets and Excel syntax.',
        'Ask the AI to explain what happens if someone types text like "Absent" into the score cell.',
      ],
      selfChecklist: [
        'Did I specify the target cell (e.g. A2)?',
        'Did the AI handle the empty/blank cell condition first?',
        'Did I test the formula in a real spreadsheet?',
      ],
    },
    workplaceScenarios: [
      {
        id: 'ws-5-1',
        title: 'Explaining a Flaky Playwright Automation Test Failure',
        context: 'A Playwright test failed intermittently with: `TimeoutError: locator.click: Timeout 30000ms exceeded while waiting for element to be visible`.',
        task: 'Ask AI to diagnose the top 3 causes of auto-waiting timeouts in modern web applications.',
        modelPrompt:
          'ROLE: Principal SDET & Playwright Specialist\nTASK: Diagnose why `page.getByRole(\'button\', { name: \'Submit\' }).click()` timed out after 30 seconds.\nCONTEXT: Test passes in local headed mode, but fails in headless CI on GitHub Actions 20% of the time.\nCONSTRAINTS: Focus on auto-waiting mechanics, animation locks, and network latency. Provide concrete Playwright code remediation.\nOUTPUT FORMAT: 3 Root Causes + Revised Robust Code Snippet.',
        modelOutput:
          '**Top 3 Root Causes for Flaky Click Timeouts in Headless CI:**\n\n1. **CSS Animation / Opacity Transition Lock:**\nPlaywright auto-waits for elements to become "stable" (not moving or transitioning). In headless CI running with constrained CPU, a fade-in animation or sliding modal might stutter, causing Playwright to wait indefinitely for the button coordinates to stabilize.\n\n2. **Network Idle & API Latency:**\nThe "Submit" button may be disabled by frontend state (`disabled={isLoading}`) while a background API request fetches user profile data. If GitHub Actions experiences network throttling, the 30s timeout expires before the button enables.\n\n3. **Viewport Size Discrepancy:**\nHeadless CI defaults to 1280x720. If the submit button falls below the fold or is obscured by a floating cookie consent banner on that resolution, click actionability checks fail.\n\n**Remediation Code (Web-First Assertions):**\n```javascript\n// 1. Explicitly assert element is enabled and attached before clicking\nconst submitBtn = page.getByRole(\'button\', { name: \'Submit\' });\nawait expect(submitBtn).toBeVisible({ timeout: 10000 });\nawait expect(submitBtn).toBeEnabled();\n\n// 2. Click with scrollIntoView guarantee\nawait submitBtn.click();\n\n// 3. Assert on the expected post-condition rather than arbitrary sleep\nawait expect(page).toHaveURL(/.*dashboard/);\n```',
        verificationTip: 'Never use arbitrary `page.waitForTimeout(5000)` to fix flakiness; always assert on web-first state changes.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q5-1',
          question: 'What is the "Anti-Blind-Trust Rule" when using AI for code and spreadsheet formulas?',
          options: [
            'Never pay for AI software with a credit card.',
            'Never execute AI-generated code, SQL, or shell commands directly in production without human review and sandbox verification.',
            'Never use formulas with more than 3 letters.',
            'Never allow AI to format tables in markdown.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'AI models produce syntactically valid code that may have subtle security flaws, catastrophic table drops, or logic errors. All code and formulas must be reviewed and tested in safe environments before touching live systems.',
        },
        {
          id: 'q5-2',
          question: 'What is the most critical instruction to include when asking an AI to summarize a long legal contract or technical SLA?',
          options: [
            '"Make it sound very friendly and brief."',
            '"Preserve all exact numerical metrics, deadlines, and conditional caveats (e.g. \'subject to\', \'excluding\')."',
            '"Translate the entire contract into Spanish."',
            '"Delete all references to money."',
          ],
          correctAnswerIndex: 1,
          explanation:
            'The risk in summarization is the loss of critical conditions and quantitative metrics. Instructing the model to preserve exact caveats prevents costly misunderstandings.',
        },
        {
          id: 'q5-3',
          question: 'Why should you specify whether you are using Google Sheets or Microsoft Excel when asking for spreadsheet formulas?',
          options: [
            'Because Microsoft owns all AI language models.',
            'Because certain functions (such as QUERY, ARRAYFORMULA, or XLOOKUP) have different syntax, availability, or behavior across the two platforms.',
            'Because Google Sheets does not support math.',
            'Because Excel does not support columns.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'While core functions overlap, specific functions like Google Sheets `QUERY()` or modern Excel `XLOOKUP` require distinct syntax and version considerations.',
        },
        {
          id: 'q5-4',
          question: 'When drafting a customer-facing communication about a technical service interruption, what tone should you constrain the AI to maintain?',
          options: [
            'Defensive and blaming external suppliers for the failure.',
            'Calm, accountable, empathetic, and customer-first, with clear recovery steps.',
            'Completely silent about the cause of the problem.',
            'Aggressive and humorous.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Professional workplace communications require transparency, emotional intelligence, and reassurance without shifting blame to third-party vendors.',
        },
        {
          id: 'q5-5',
          question: 'Which of the following data points is strictly prohibited from being pasted into public, multi-tenant AI chatbots?',
          options: [
            'A sample sentence from a publicly available Shakespeare play.',
            'The official documentation page for Playwright test locators.',
            'Unencrypted customer credit card numbers, passwords, and trade-secret source code.',
            'The dictionary definition of the word "algorithm".',
          ],
          correctAnswerIndex: 2,
          explanation:
            'Uploading private credentials, personal financial data, or proprietary intellectual property to public AI models violates compliance, privacy laws, and corporate confidentiality.',
        },
      ],
    },
    daySummary:
      'Day 5 demonstrated real-world workplace application: synthesizing dense reports while protecting caveats, generating error-handled spreadsheet formulas, and demystifying technical code under the firm rule of never executing AI-generated commands without independent review.',
  },

  // =========================================================================
  // DAY 6: Accuracy, Limitations and Responsible AI
  // =========================================================================
  {
    dayNumber: 6,
    title: 'Day 6: Accuracy, Limitations and Responsible AI',
    subtitle: 'Hallucination triage, factual verification, intellectual property, and privacy ethics.',
    badge: 'Day 6 of 7 • Ethics & Verification',
    duration: '35–45 mins',
    objectives: [
      'Understand why LLMs generate convincing, highly articulate falsehoods.',
      'Master the 4-Point Factual Verification Checklist (Dates, Calculations, Code, Citations).',
      'Spot common planted errors in AI outputs: fabricated books, non-existent API parameters, false statistics.',
      'Understand copyright, licensing, and intellectual property boundaries when using generated text and code.',
      'Recognize high-stakes domains (legal, medical, critical infrastructure) where expert human sign-off is non-negotiable.',
    ],
    introduction:
      'Because AI assistants write with effortless fluency and authoritative confidence, human beings suffer from an automation bias: the subconscious urge to trust whatever the machine prints. Day 6 teaches you how to break this bias, develop an investigator\'s mindset, spot planted factual errors, and use AI ethically and responsibly.',
    topics: [
      {
        title: '1. The Anatomy of an AI Hallucination',
        summary: 'Why fluent grammar is not proof of truth and how models invent plausible falsehoods.',
        explanation:
          'Language models possess no internal database of validated facts; they possess statistical associations between words. When you ask about an obscure topic, the model generates words that *sound* like they belong in that sentence. For example, if you ask for "3 academic papers proving that eating lemons cures headaches", the model will invent realistic-sounding paper titles, complete with fake authors (e.g. "Dr. Robert Smith, Journal of Neurology 2021") and fake DOIs. The grammar is flawless, the scientific tone is persuasive, but the citations are 100% fabricated.',
        realWorldExample:
          'In a widely publicized 2023 legal case, two lawyers submitted a legal brief drafted by an AI. The brief cited 6 previous court decisions that sounded entirely genuine (complete with case numbers and judicial quotes). The judge discovered that none of the cases existed: the AI had hallucinated every single precedent, resulting in judicial sanctions and fines for the attorneys.',
        workedExample: {
          scenario: 'Detecting Fabricated Software API Methods',
          beforePrompt: 'How do I automatically bypass cloudflare bot detection using playwright?',
          beforeOutput: 'You can use the built-in method `page.setBypassCloudflare(true)` which was added in Playwright v1.38.',
          afterPrompt: 'Verification Step: Check official Playwright documentation (playwright.dev) for `page.setBypassCloudflare`.',
          afterOutput: 'Result: `setBypassCloudflare` DOES NOT EXIST. The model hallucinated a plausible-sounding method name that does not exist in the official API.',
          explanation: 'Never assume a code library function exists just because an AI named it with convincing syntax.',
        },
        commonMistakes: [
          'Submitting academic papers, legal briefs, or technical specs with AI-generated citations without verifying each URL and DOI.',
          'Assuming that if an AI quotes a statistic (e.g. "78.4% of users..."), the statistic is grounded in a real study.',
        ],
        keyTakeaways: [
          'Fluency is not accuracy: articulate prose is often the cloak of a hallucination.',
          'Always verify citations, mathematical totals, and software library method names.',
        ],
      },
      {
        title: '2. The 4-Point Factual Verification Checklist',
        summary: 'A rapid verification rubric to run against every AI-generated deliverable.',
        explanation:
          'Before you copy, send, or publish any AI output, run it through the 4-Point Checklist:\n\n1. **DATES & TIMELINES:** Are mentioned dates real? Did the event occur on that day? Is the timeline chronological?\n2. **CALCULATIONS & SUMS:** Did the model add the numbers correctly? (Never trust multi-step arithmetic without checking on a calculator).\n3. **CODE & SYNTAX:** Do the imported packages, method names, and command-line flags actually exist in the current version of the software?\n4. **CITATIONS & ATTRIBUTION:** Does the cited author, book, research paper, or court case exist? Can you find the exact original primary source on Google or PubMed?',
        realWorldExample:
          'A travel itinerary generated by AI lists visiting a famous museum in Paris on a Tuesday. Checklist item 1 (Dates/Schedules) prompts the traveler to check the museum website: the museum is closed to the public every Tuesday! The AI hallucinated opening hours.',
        workedExample: {
          scenario: 'Auditing an AI-generated technical article',
          afterPrompt: 'Audit the following claim: "In Python 3.12, the keyword `async` was deprecated in favor of `threadspawn`."',
          afterOutput: 'Verification Audit: **FALSE.** Python 3.12 continues to use `async` and `await` as core language keywords. `threadspawn` is a hallucinated keyword with no existence in the Python standard library.',
          explanation: 'Running the verification checklist catches fatal technical inaccuracies before they mislead readers.',
        },
        commonMistakes: [
          'Trusting dates of public holidays or venue opening times without checking official websites.',
          'Assuming mathematical column totals in an AI table equal the sum of their rows.',
        ],
        keyTakeaways: [
          'Check: (1) Dates, (2) Calculations, (3) Code/Flags, (4) Citations.',
          'The human is always the ultimate editor and owner of the published artifact.',
        ],
      },
      {
        title: '3. Data Privacy, Copyright, and Responsible Ethics',
        summary: 'Understanding data retention policies, copyright boundaries, and bias.',
        explanation:
          'When you interact with a public AI model, your prompts may be logged, stored, and used to train future foundation models unless your organization has an explicit enterprise Zero Data Retention (ZDR) agreement. Furthermore, AI models were trained on billions of public internet texts and images, occasionally memorizing copyrighted code or writing style. Finally, models can perpetuate societal biases (gender stereotypes in occupations, geographic prejudices) based on training data imbalances. Responsible AI means treating tools with ethical awareness.',
        realWorldExample:
          'An engineer uploads proprietary source code containing API private keys to an online chatbot. Months later, another user prompts the chatbot asking for examples of that company\'s architecture, and the model regurgitates snippets of the leaked proprietary code.',
        workedExample: {
          scenario: 'Data Sanitization before Prompting',
          beforePrompt: 'Unsafe: "Here is our customer list from HDFC Bank: Rajesh Sharma, account 49201938, balance ₹4,50,000. Write a loan offer."',
          afterPrompt: 'Safe Sanitized: "ROLE: Retail Banking Product Manager. TASK: Draft a personalized pre-approved home loan offer email template for an existing customer with strong credit history. Use placeholders: [Customer Name], [Account Number], [Pre-approved Amount]."',
          afterOutput: 'Generates a pristine, professional email template with clean brackets for runtime merge without exposing a single real customer record to the model.',
          explanation: 'Using placeholders protects customer confidentiality while getting 100% of the AI\'s drafting power.',
        },
        commonMistakes: [
          'Pasting real customer names, phone numbers, or account balances into chatbots.',
          'Relying on AI for unmonitored medical diagnostics or legal criminal defense advice.',
        ],
        keyTakeaways: [
          'Sanitize all prompts using generic placeholders ([Customer_Name], [Order_ID]).',
          'High-stakes domains (legal, medical, aviation) require licensed human professional sign-off.',
        ],
      },
    ],
    playgroundScenarios: [
      {
        id: 'day6-planted-error-spotter',
        title: 'Planted Error Spotter Exercise',
        category: 'verification',
        description: 'Examine a deliberately flawed, simulated AI response containing 3 planted errors. Identify the errors and see the verified correction.',
        sampleContext:
          'Exercise Context: The response below was generated by an AI assistant summarizing modern software development history. It contains 3 subtle, planted factual errors for practice.',
        defaultFormat: 'Verification Audit Table',
        weakPrompt: 'Tell me the history of Git and GitHub.',
        weakOutput:
          '*(Simulated AI response containing 3 planted factual errors for educational practice)*\n\nGit was created in 1995 by Linus Torvalds during the development of the Linux kernel. It is a centralized version control system where all developers must connect to a single central server to commit changes. Later in 2008, GitHub was founded by Chris Wanstrath, PJ Hyett, and Tom Preston-Werner. In 2018, GitHub was acquired by Google for $7.5 billion.',
        weakCritique: [
          'PLANTED ERROR 1: Git was created in 2005 (not 1995).',
          'PLANTED ERROR 2: Git is a Distributed Version Control System (DVCS), not centralized (unlike SVN/CVS).',
          'PLANTED ERROR 3: GitHub was acquired by Microsoft in 2018 for $7.5 billion (not Google).',
        ],
        improvedPrompt:
          'ROLE: Software History Fact-Checker\nTASK: Audit the provided passage about Git history, identify all planted factual errors, provide authoritative citations, and output the corrected text.\nOUTPUT FORMAT: Markdown table showing [Claimed Statement, Factual Status, Correction, Primary Source], followed by the corrected paragraph.',
        improvedOutput:
          '### Factual Verification Audit Table\n| Claimed Statement | Factual Status | Verified Correction | Authoritative Primary Source |\n| :--- | :--- | :--- | :--- |\n| "Git was created in 1995..." | **FALSE** | Git was created in **April 2005** by Linus Torvalds following the BitKeeper licensing dispute. | Linux Foundation Git History Archives |\n| "...centralized version control system..." | **FALSE** | Git is a **Distributed Version Control System (DVCS)**; every clone has full commit history locally. | Pro Git Book (Scott Chacon) |\n| "GitHub acquired by Google..." | **FALSE** | GitHub was acquired by **Microsoft** for $7.5B in stock in June 2018. | Microsoft Official Press Release (June 4, 2018) |\n\n### Corrected, Verified Text:\nGit was created in **2005** by Linus Torvalds during the development of the Linux kernel. It is a **distributed version control system** where every developer maintains a complete repository clone with full history locally. In 2008, GitHub was founded by Chris Wanstrath, PJ Hyett, and Tom Preston-Werner. In June 2018, GitHub was acquired by **Microsoft** for $7.5 billion.',
        improvementHighlights: [
          'Explicitly audited dates, technical taxonomy, and corporate acquisitions.',
          'Supplied authoritative primary source references.',
          'Replaced planted errors with verified historical ground truth.',
        ],
        evaluationCriteria: {
          roleDefined: true,
          taskClear: true,
          contextProvided: true,
          constraintsIncluded: true,
          formatSpecified: true,
        },
      },
    ],
    guidedExercise: {
      title: 'Auditing Planted Errors in an AI Travel Guide',
      instructions:
        'Read the following simulated AI excerpt about visiting Bengaluru, India. It contains 2 planted factual errors. Construct a prompt that asks an AI to audit the claims against geographic reality.',
      taskContext:
        'Simulated Excerpt with 2 Planted Errors: "Bengaluru, known as the Silicon Valley of India, is located on the coastal shores of the Arabian Sea. Visitors can take a direct 10-minute beachfront stroll from Kempegowda International Airport to the historic Lalbagh Botanical Garden."',
      starterPrompt: 'Check if this paragraph about Bangalore is correct.',
      solutionPrompt:
        'ROLE: Geographic Fact-Checking Specialist\nTASK: Identify all factual errors in the provided paragraph about Bengaluru, India.\nCONTEXT: Provided travel excerpt.\nCONSTRAINTS: Highlight geographic inaccuracies and transit distance errors with exact physical distances.\nOUTPUT FORMAT: Table with columns: Error Statement, Ground Truth, Real Distance/Geography.',
      expectedOutputCriteria: [
        'Identifies that Bengaluru is a landlocked plateau city (Deccan Plateau, ~900m altitude), NOT on the Arabian Sea coast.',
        'Identifies that Kempegowda Airport is ~35–40 km north of Lalbagh, taking 1–2 hours by road with no beach.',
      ],
      rubricPoints: [
        'Correctly spots landlocked geography vs coastal claim.',
        'Correctly spots 35km transit reality vs 10-minute beachfront stroll.',
        'Produces clear verification table.',
      ],
    },
    independentChallenge: {
      title: 'Create Your Personal Verification Protocol',
      promptGoal: 'Draft an explicit 5-step checklist you will follow before submitting any AI-assisted workplace deliverable.',
      scenario: 'You are submitting an AI-assisted market research report to your company executive.',
      constraints: [
        'Include at least 1 step for checking numerical sums.',
        'Include 1 step for checking external citations.',
        'Include 1 step for ensuring zero company PII or credentials leaked.',
      ],
      selfChecklist: [
        'Did I include checking URLs and author names?',
        'Did I include testing code or formulas in a sandbox?',
        'Is the protocol printable as a quick reference sheet?',
      ],
    },
    workplaceScenarios: [
      {
        id: 'ws-6-1',
        title: 'Responding to Plagiarism & Copyright Inquiries',
        context: 'A client asks whether code generated by an AI assistant can be safely incorporated into their commercial software without copyright infringement.',
        task: 'Draft a balanced, objective legal risk summary explaining open-source licensing risks in AI code.',
        modelPrompt:
          'ROLE: Intellectual Property & Open Source Compliance Counsel\nTASK: Explain the copyright and licensing risks of using AI-generated code in commercial proprietary software.\nCONTEXT: Client is building a proprietary FinTech payment gateway.\nCONSTRAINTS: Cover: (1) Training data memorization risks (GPL contamination), (2) Copyrightability of AI outputs, (3) Recommended corporate safeguards.\nOUTPUT FORMAT: 3 structured sections with practical corporate policy recommendations.',
        modelOutput:
          '**1. Training Data Memorization & License Contamination Risks**\nAI models are trained on billions of lines of public code, including code governed by copyleft licenses like the GNU General Public License (GPL v2/v3). While models usually synthesize novel combinations, they can occasionally regurgitate verbatim snippets of licensed code when prompted with common algorithms. Incorporating verbatim GPL-licensed code into proprietary software can trigger legal demands to open-source your entire proprietary codebase under copyleft terms.\n\n**2. Copyrightability of Pure AI Outputs**\nUnder current United States Copyright Office (USCO) and global jurisprudence, works generated purely by artificial intelligence without substantial human creative input are not eligible for copyright protection. To secure intellectual property ownership over your software, the creative architecture, modification, and integration must remain human-directed and documented.\n\n**3. Recommended Corporate Safeguards**\n1. **Enable Attribution Filters:** In enterprise AI tools (GitHub Copilot, Gemini Code Assist), enable the "Block suggestions matching public code" setting.\n2. **Code Scanning (SCA):** Run automated Software Composition Analysis tools (e.g. Snyk, Black Duck) on every pull request to verify that no GPL-licensed snippets enter the main branch.\n3. **Human Ownership Documentation:** Ensure developers review, refactor, write unit tests for, and take documented personal responsibility for every approved line of code.',
        verificationTip: 'Always enable "Block public code suggestions" in your team’s IDE AI extension settings.',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q6-1',
          question: 'What psychological phenomenon causes people to uncritically trust AI outputs simply because they appear articulate and confident?',
          options: [
            'Algorithm Fatigue',
            'Automation Bias',
            'Token Saturation',
            'Prompt Amnesia',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Automation Bias is the human tendency to favor suggestions from automated decision systems and accept them without verification, assuming the computer knows better than a human.',
        },
        {
          id: 'q6-2',
          question: 'If an AI cites an academic research paper with a title, author, year, and DOI, what should you do before including it in a professional report?',
          options: [
            'Assume it is correct because fake DOIs cannot be typed by computers.',
            'Search for the exact DOI or title on Google Scholar, PubMed, or official journal archives to confirm the paper actually exists.',
            'Change the author’s name to your own.',
            'Delete the title and keep only the date.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'LLMs routinely fabricate plausible-sounding academic citations, complete with realistic journal names and non-existent DOIs. Primary source verification is mandatory.',
        },
        {
          id: 'q6-3',
          question: 'What is the "Sanitization Pattern" for safely using AI with real customer or employee records?',
          options: [
            'Washing your keyboard with disinfectant.',
            'Replacing all real names, account numbers, and sensitive credentials with generic placeholders (e.g. [Customer_A], [Account_123]) before submitting the prompt.',
            'Typing all customer data backwards.',
            'Running the prompt at night when data centers are quiet.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'Sanitization removes identifying PII and proprietary numbers from the prompt, replacing them with generic placeholders so the model can generate the template without ever seeing private records.',
        },
        {
          id: 'q6-4',
          question: 'Why is it dangerous to ask an AI for high-stakes medical diagnosis or emergency legal defense without professional consultation?',
          options: [
            'Because AI computers are physically heavy.',
            'Because models lack clinical judgment, cannot examine physical patients, and can state fatal inaccuracies with absolute linguistic confidence.',
            'Because lawyers and doctors do not use computers.',
            'Because hospitals do not have internet connections.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'In life-critical and legal domains, nuances, physical examinations, and legal jurisdictions vary drastically. AI is not a licensed professional and must never replace expert human consultation.',
        },
        {
          id: 'q6-5',
          question: 'What does enabling the "Block suggestions matching public code" setting do in developer AI tools?',
          options: [
            'It shuts off your internet connection.',
            'It prevents the AI from outputting verbatim copies of copyrighted open-source code from public GitHub repositories, reducing licensing contamination risks.',
            'It automatically deletes your project files.',
            'It prevents anyone from seeing your screen.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'This setting compares generated code against a database of public open-source repositories and blocks exact verbatim matches, protecting companies from accidental copyleft (GPL) license contamination.',
        },
      ],
    },
    daySummary:
      'Day 6 tackled the truth about AI: fluency is not accuracy. By practicing the 4-Point Verification Checklist, spotting planted hallucinations, and maintaining ethical data sanitization standards, you become a responsible, trusted AI practitioner.',
  },

  // =========================================================================
  // DAY 7: Final Practical Project
  // =========================================================================
  {
    dayNumber: 7,
    title: 'Day 7: Final Practical Project',
    subtitle: 'Build Your Personal AI Productivity Workflow & Complete Certification.',
    badge: 'Day 7 of 7 • Capstone Project',
    duration: '45–60 mins',
    objectives: [
      'Select a realistic, high-impact task from study, career preparation, or workplace operations.',
      'Define clear task objectives, operational constraints, and explicit success criteria.',
      'Draft an initial prompt, test it in the Prompt Playground, and document the weak points.',
      'Refine the prompt using the 6-Part Framework and advanced prompting techniques.',
      'Execute a side-by-side comparison between initial and improved outputs.',
      'Formulate a 4-point verification checklist and save the result into a Reusable Prompt Library.',
      'Submit the capstone project for deterministic rubric evaluation and unlock your RootAccess Certificate.',
    ],
    introduction:
      'Congratulations on reaching Day 7! Today you synthesize everything you have learned across the course into a comprehensive, practical capstone project: **Build Your Personal AI Productivity Workflow**. You will choose a real task from your life or work, craft an airtight prompt, refine it through active testing, build a verification checklist, and save it into your permanent prompt library.',
    topics: [
      {
        title: '1. Capstone Project Architecture & Instructions',
        summary: 'Understanding the 6 milestones of your final project submission.',
        explanation:
          'Your Day 7 Capstone Project consists of 6 structured milestones:\n\n1. **Task Selection & Objective:** Choose a real workplace, study, or career task (e.g. Automated Bug Triage, Interview Scenario Simulator, Executive Meeting Synthesizer, Study Guide Creator).\n2. **Desired Result & Success Criteria:** Define exactly what a successful output looks like (format, tone, metrics, audience).\n3. **Initial Draft Prompt & Output:** Write your raw, un-optimized prompt and inspect its initial output in the playground.\n4. **Framework-Optimized Prompt:** Apply Role, Task, Context, Constraints, Format, and Success Criteria. Add Few-Shot examples or Step-by-Step decomposition if needed.\n5. **Comparative Analysis & Improvement Notes:** Document why the improved prompt produces dramatically superior results.\n6. **Verification Checklist & Responsible AI Safeguards:** Identify at least 3 failure modes or hallucination risks and write your verification plan.',
        realWorldExample:
          'A QA Engineer builds an "Automated Jira Test Case Generator from User Stories": Initial prompt yielded 3 basic bullets. Optimized prompt yields a 6-column markdown table with preconditions, boundary test data, expected outcomes, and edge-case negative flows.',
        workedExample: {
          scenario: 'Sample Completed Capstone Project Walkthrough',
          afterPrompt:
            'PROJECT TITLE: Weekly Sprint Retrospective Synthesizer\nTASK: Convert raw anonymous team feedback into categorized sprint improvements.\nROLE: Agile Scrum Master & Continuous Improvement Coach.\nSUCCESS CRITERIA: Clear separation of What Went Well, What Impeded Us, and Top 3 Actionable Commitments for next sprint with assigned owners.',
          afterOutput:
            'Produces a beautifully structured retrospective board ready for Jira / Confluence with zero ambiguous complaints.',
          explanation: 'A reusable workflow you can execute every single Friday in 2 minutes for the rest of your career.',
        },
        commonMistakes: [
          'Submitting a toy prompt ("Write a poem about dogs") instead of a real-world productivity workflow.',
          'Skipping the verification checklist: high-scoring submissions always document how they check for hallucinations.',
        ],
        keyTakeaways: [
          'Build a tool you will actually use tomorrow at work or school.',
          'The prompt library you build today will save you dozens of hours every month.',
        ],
      },
      {
        title: '2. The 5-Dimension Capstone Scoring Rubric',
        summary: 'How your project is evaluated across 100 points.',
        explanation:
          'Your final project is evaluated across 5 core dimensions:\n\n• **1. Task Definition & Scope (15 Points):** Is the business/study objective clear, realistic, and well-defined?\n• **2. Prompt Architecture & Constraints (25 Points):** Does the prompt effectively employ Role, Task, Context, Constraints, and Format? Are ambiguities eliminated?\n• **3. Output Quality & Usability (20 Points):** Is the generated output structured, professional, scannable, and directly usable?\n• **4. Verification & Failure-Mode Analysis (25 Points):** Did you identify realistic hallucination risks and provide concrete verification steps?\n• **5. Responsible AI & Data Privacy (15 Points):** Did you avoid exposing confidential data and include privacy safeguards?\n\n**Passing Threshold:** Score ≥ 80% to earn your official RootAccess Verified Credential.',
        realWorldExample:
          'Submissions that score 95+ points always feature explicit negative constraints (e.g. "Do not exceed 250 words", "Do not invent external packages") and an airtight 4-point verification checklist.',
        workedExample: {
          scenario: 'Self-Reviewing Against the Rubric',
          afterPrompt: 'Check if your prompt specifies an output format (table, checklist, JSON). If missing, you lose 5 points on Dimension 2.',
          afterOutput: 'Add: "OUTPUT FORMAT: Markdown table with columns [Category, Action Item, Owner, Target Date]".',
          explanation: 'A 10-second prompt tweak elevates your score from 75% to 90%.',
        },
        commonMistakes: [
          'Submitting an initial prompt without doing the improved version comparison.',
        ],
        keyTakeaways: [
          'Review the rubric checklist before clicking "Submit Final Project".',
          'Aim for clarity, structure, and reproducibility.',
        ],
      },
    ],
    playgroundScenarios: [
      {
        id: 'day7-capstone-sandbox',
        title: 'Capstone Interactive Sandbox',
        category: 'productivity',
        description: 'Test, refine, and compare your personal productivity prompt before submitting it for final evaluation.',
        sampleContext:
          'Choose your track:\nTrack A: Study & Exam Preparation Planner\nTrack B: QA Test Case & Bug Extraction Engine\nTrack C: Workplace Incident & Executive Briefing\nTrack D: Custom Professional Workflow',
        defaultFormat: 'Comprehensive Workflow Deliverable',
        weakPrompt: 'Help me plan my weekly sprint tasks.',
        weakOutput:
          'Here are your sprint tasks:\n1. Finish coding the feature\n2. Run some tests\n3. Deploy to staging\n4. Update documentation\nHave a great sprint!',
        weakCritique: [
          'Completely lacks role, context, dependencies, and priorities.',
          'No time estimations or ownership.',
          'Not formatted for easy tracking or import into Jira.',
        ],
        improvedPrompt:
          'ROLE: Senior Technical Project Manager\nTASK: Create a prioritized 5-day Sprint Action Plan for a software engineering squad.\nCONTEXT: Squad consists of 1 Tech Lead, 2 Fullstack Devs, and 1 QA Engineer. Sprint Goal: Deliver the revised User Profile & Avatar Upload feature.\nCONSTRAINTS: Explicitly identify cross-functional dependencies between frontend, backend, and QA. Include contingency buffers for code review.\nOUTPUT FORMAT: Markdown table with columns: Day, Team Member, Primary Milestone, Deliverable, Dependency.',
        improvedOutput:
          '| Day | Team Member | Primary Milestone | Deliverable | Dependency |\n| :--- | :--- | :--- | :--- | :--- |\n| **Mon** | Backend Dev | Implement S3 pre-signed URL upload endpoint | API route `/api/avatar/upload` active in dev | AWS S3 IAM bucket permissions |\n| **Mon** | Frontend Dev | Build client-side image cropping & preview UI | Reusable `<AvatarPicker />` React component | Design team Figma spec |\n| **Tue** | Fullstack Dev | Connect frontend component to backend S3 API | End-to-end upload working in dev environment | Mon backend API route |\n| **Wed** | QA Engineer | Author test matrix (BVA, file signatures, size limits) | Documented test suite in Jira (10 scenarios) | Staging build deployment |\n| **Thu** | Squad | Bug triage & cross-browser testing (Safari/Chrome/Firefox) | Zero P1/P2 defects remaining in triage board | Wed QA test execution |\n| **Fri** | Tech Lead & QA | Final regression verification & staging sign-off | Signed-off Release Candidate tagged in Git | Zero blocker defects |',
        improvementHighlights: [
          'Mapped out daily milestones across all 4 squad roles.',
          'Clear dependency tracking prevents mid-sprint bottlenecks.',
          'Production-ready schema for Agile team standups.',
        ],
        evaluationCriteria: {
          roleDefined: true,
          taskClear: true,
          contextProvided: true,
          constraintsIncluded: true,
          formatSpecified: true,
        },
      },
    ],
    guidedExercise: {
      title: 'Capstone Prompt Self-Assessment Check',
      instructions:
        'Before completing your project submission form below, verify your prompt against the 5 rubric dimensions and ensure your verification checklist contains at least 3 concrete checks.',
      taskContext: 'Final Project Submission Preparation',
      starterPrompt: 'Verify my prompt quality.',
      solutionPrompt:
        'Checklist:\n1. Role Defined? Yes.\n2. Task Specific? Yes.\n3. Context & Background Included? Yes.\n4. Constraints Explicit? Yes.\n5. Output Format Declared? Yes.\n6. 3-Point Verification Checklist Added? Yes.',
      expectedOutputCriteria: [
        'Satisfies all 5 dimensions of the RootAccess Capstone Rubric.',
        'Score ≥ 80% to earn official Verified Certificate.',
      ],
      rubricPoints: [
        'Clear problem statement.',
        'High-quality prompt architecture.',
        'Rigorous verification plan.',
      ],
    },
    independentChallenge: {
      title: 'Export to Your Reusable Prompt Library',
      promptGoal: 'Save your completed prompt into your personal browser prompt library.',
      scenario: 'You can export your saved prompt library as a Markdown or JSON file for immediate use in ChatGPT, Claude, Gemini, or workplace tools.',
      constraints: [
        'Save at least 1 verified prompt to your library.',
        'Test re-loading it from the library in the playground.',
      ],
      selfChecklist: [
        'Did I click "Save to Prompt Library"?',
        'Did the saved badge appear?',
      ],
    },
    workplaceScenarios: [
      {
        id: 'ws-7-1',
        title: 'Building a Team Prompt Library Repository',
        context: 'A company wants to standardize how all 50 employees use AI assistants for customer support, coding, and marketing.',
        task: 'Draft an internal Prompt Engineering Governance Standard & Reusable Library Guidelines.',
        modelPrompt:
          'ROLE: Director of Enterprise AI Governance\nTASK: Draft a 1-page internal standard operating procedure (SOP) for team prompt libraries.\nCONTEXT: 50-person tech company adopting generative AI tools.\nCONSTRAINTS: Cover: (1) Mandatory prompt structure, (2) Prohibited data categories, (3) Verification workflow before sending to clients.\nOUTPUT FORMAT: Clean corporate SOP markdown memo.',
        modelOutput:
          '# RootAccess Enterprise SOP: Generative AI Usage & Prompt Library Standards\n\n**Effective Date:** November 2026 | **Policy Owner:** Information Security & AI Governance\n\n### 1. Mandatory 6-Part Prompt Architecture\nEvery prompt added to our internal Shared Prompt Library must define:\n• **Role:** Specific functional domain and seniority.\n• **Task:** Action verb and targeted outcome.\n• **Context:** Background necessary for synthesis.\n• **Constraints:** Mandatory negative boundaries and word/character limits.\n• **Format:** Required data container (Table, Checklist, JSON).\n• **Success Criteria:** Definition of a complete, acceptable answer.\n\n### 2. Prohibited Data Classifications (Zero-Tolerance Tier 3)\nEmployees are strictly prohibited from submitting the following to any third-party AI assistant:\n• Production customer passwords, private encryption keys, or API tokens.\n• Personally Identifiable Information (customer Aadhaar numbers, phone numbers, home addresses).\n• Unannounced financial earnings or proprietary source code under NDA.\n*Rule of Thumb: If a document is marked [CONFIDENTIAL], sanitize with placeholders before prompting.*\n\n### 3. The 4-Eye Verification Protocol\nNo AI-generated deliverable may be dispatched directly to a client, deployed to production, or published publicly without completing the 4-Point Verification Checklist:\n1. All dates and calendar schedules verified against primary company systems.\n2. All financial calculations recalculated independently in spreadsheets.\n3. All software method names verified against current official documentation.\n4. Document reviewed and signed off by a human team member.',
        verificationTip: 'Store verified prompt templates in a central version-controlled repository (Git or Notion).',
      },
    ],
    quiz: {
      passingScorePercent: 80,
      questions: [
        {
          id: 'q7-1',
          question: 'What is the primary benefit of maintaining a structured, reusable personal Prompt Library?',
          options: [
            'It makes your computer run faster.',
            'It saves dozens of hours by providing proven, tested, high-yield prompt architectures that deliver consistent results without re-inventing instructions from scratch.',
            'It allows you to bypass AI subscription fees.',
            'It guarantees that you never have to verify AI answers.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'A prompt library turns ad-hoc AI usage into a repeatable, high-efficiency personal workflow. Proven prompts deliver reliable results every time.',
        },
        {
          id: 'q7-2',
          question: 'According to the RootAccess Capstone Rubric, what is the required passing threshold to earn the official Verified Certificate?',
          options: [
            '50%',
            '60%',
            '80%',
            '100% on the first try with no retries',
          ],
          correctAnswerIndex: 2,
          explanation:
            'In alignment with RootAccess’s rigorous standards across all tracks (Playwright, SQL, Manual QA), an 80% passing threshold guarantees genuine competence.',
        },
        {
          id: 'q7-3',
          question: 'When comparing an initial weak prompt to an improved prompt, what is the most significant difference typically observed in the output?',
          options: [
            'The improved output uses more colorful fonts.',
            'The improved output is structured, actionable, strictly constrained, tailored to the audience, and eliminates generic fluff.',
            'The improved output is always exactly 10,000 words long.',
            'There is no noticeable difference between weak and strong prompts.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'High-quality prompts constrain the generative probability space, transforming vague encyclopedic generalities into immediate, scannable, workplace-ready deliverables.',
        },
        {
          id: 'q7-4',
          question: 'Which of the following is an essential step in completing your Day 7 Capstone Project submission?',
          options: [
            'Paying an external tutor to write your prompt.',
            'Documenting potential hallucination risks and detailing your explicit verification process.',
            'Pasting confidential company passwords into the submission box.',
            'Disabling the Prompt Playground simulator.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'A true AI professional understands that verification is inseparable from prompting. High-scoring projects always analyze potential failure modes and state verification safeguards.',
        },
        {
          id: 'q7-5',
          question: 'What is the core philosophy of RootAccess across all courses, including AI Fundamentals & Prompt Engineering?',
          options: [
            'Memorize slides and take multiple-choice tests.',
            'Learn by Doing — through active hands-on practice, deterministic feedback, and real-world workplace simulation.',
            'Wait for AI to replace all human jobs.',
            'Read 500-page textbooks without touching a keyboard.',
          ],
          correctAnswerIndex: 1,
          explanation:
            'RootAccess: Learn by Doing. We believe practical, hands-on muscle memory in interactive environments builds true technical competence.',
        },
      ],
    },
    daySummary:
      'Congratulations! You have completed the 7-Day AI Fundamentals & Prompt Engineering Masterclass. You now possess a permanent mental framework for structured communication with AI, rigorous verification habits, and a reusable prompt workflow that accelerates your daily productivity.',
  },
];

export const AI_CAPSTONE_PROJECT = {
  title: 'Build Your Personal AI Productivity Workflow',
  description:
    'Synthesize your learning across the 7-day track into an airtight, production-ready prompt workflow evaluated across 5 professional dimensions.',
  passingScore: 80,
  rubric: [
    {
      dimension: 'Task Definition & Scope',
      maxPoints: 15,
      description: 'Clear, realistic, well-scoped workplace, academic, or study objective with explicit success criteria.',
    },
    {
      dimension: 'Prompt Architecture & Constraints',
      maxPoints: 25,
      description: 'Systematic application of the 6-Part Framework (Role, Task, Context, Constraints, Format, Success Criteria) with negative constraints.',
    },
    {
      dimension: 'Output Quality & Usability',
      maxPoints: 20,
      description: 'Scannable, immediately actionable, professional output adhering strictly to requested format.',
    },
    {
      dimension: 'Verification & Failure-Mode Analysis',
      maxPoints: 25,
      description: 'Identification of potential hallucinations or model edge cases with an actionable 4-point verification checklist.',
    },
    {
      dimension: 'Responsible AI & Data Privacy',
      maxPoints: 15,
      description: 'Complete omission of private credentials, PII sanitization, and copyright adherence.',
    },
  ],
};
