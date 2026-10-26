export interface ReleaseRoomDecision {
  id: string;
  stageName: string;
  scenario: string;
  question: string;
  options: Array<{
    id: string;
    label: string;
    riskLevel: 'low' | 'medium' | 'high';
    isOptimal: boolean;
    consequence: string;
    feedback: string;
  }>;
}

export const RELEASE_ROOM_SCENARIOS: ReleaseRoomDecision[] = [
  {
    id: 'step-1-testing',
    stageName: '1. Quality Verification Strategy',
    scenario:
      'Sprint 14 code freeze has arrived. Developers submitted 12 Pull Requests including a major database query optimization and a small cart checkout UI tweak. The release deadline is in 4 hours.',
    question: 'How should your team verify this release before packaging?',
    options: [
      {
        id: 'opt-1a',
        label: 'Rely solely on developer self-testing on laptops and ship immediately to save time.',
        riskLevel: 'high',
        isOptimal: false,
        consequence: 'Disaster! An uncommitted environment variable causes the checkout service to crash on startup in production.',
        feedback: 'Never skip automated pipeline verification. "It worked on my machine" guarantees production failures.',
      },
      {
        id: 'opt-1b',
        label: 'Run automated unit and integration tests in CI, supplemented by targeted exploratory testing on the checkout flow.',
        riskLevel: 'low',
        isOptimal: true,
        consequence: 'Optimal! Automated tests verify 450 regression cases in 4 minutes, and targeted checks catch a subtle cart rounding flaw.',
        feedback: 'Combining fast automated regression gates with human exploratory testing provides maximum safety and velocity.',
      },
      {
        id: 'opt-1c',
        label: 'Freeze all deployments for 2 weeks to execute a 100% manual test spreadsheet across all 600 legacy test cases.',
        riskLevel: 'medium',
        isOptimal: false,
        consequence: 'Business velocity stalls. Competitors ship first, and human fatigue leads to missed edge cases anyway.',
        feedback: 'Exhaustive manual testing is too slow for modern sprints and is highly vulnerable to human fatigue.',
      },
    ],
  },
  {
    id: 'step-2-failure',
    stageName: '2. Handling a CI Pipeline Failure',
    scenario:
      'During automated test execution in the CI runner, 449 tests pass, but 1 test fails: "TestCheckoutDiscounts: expected $80.00, received $100.00". The Product Manager urges you to ignore it because "it is just 1 test".',
    question: 'What is the appropriate DevOps action?',
    options: [
      {
        id: 'opt-2a',
        label: 'Disable the failing test in the pipeline script, comment it out, and proceed with the deployment.',
        riskLevel: 'high',
        isOptimal: false,
        consequence: 'Severe regression! Customers flood customer support because promo codes fail, causing $15,000 in lost orders.',
        feedback: 'Silencing failing tests destroys pipeline trust and allows critical business logic defects into production.',
      },
      {
        id: 'opt-2b',
        label: 'Halt the pipeline immediately (fail-fast), notify the PR author with test failure logs, and require a verified fix before promotion.',
        riskLevel: 'low',
        isOptimal: true,
        consequence: 'Saved the day! The developer finds an inverted boolean check in the discount calculation and pushes a clean fix within 15 minutes.',
        feedback: 'The fail-fast principle protects production integrity. A broken test is an alarm that must never be ignored.',
      },
      {
        id: 'opt-2c',
        label: 'Manually SSH into the staging server and hardcode the discount in the database table.',
        riskLevel: 'high',
        isOptimal: false,
        consequence: 'Environment drift! Staging passes because of your manual hack, but production has no such hack and fails immediately.',
        feedback: 'Never manually patch runtime environments; all changes must be codified and committed to version control.',
      },
    ],
  },
  {
    id: 'step-3-approval',
    stageName: '3. Release Approval and Governance',
    scenario:
      'All automated tests have passed. The Docker image is built and tagged. Your company operates in a regulated fintech domain requiring compliance documentation.',
    question: 'How should the team handle release approval into production?',
    options: [
      {
        id: 'opt-3a',
        label: 'Allow any junior developer to push to production at any time without code review or pipeline records.',
        riskLevel: 'high',
        isOptimal: false,
        consequence: 'Audit failure! Financial regulators flag unapproved changes, risking suspension of the payment gateway.',
        feedback: 'Regulated environments require auditable change tracking, peer reviews, and verified compliance gates.',
      },
      {
        id: 'opt-3b',
        label: 'Use Continuous Delivery with an automated release gate requiring 2 peer PR approvals and a formal sign-off in the pipeline.',
        riskLevel: 'low',
        isOptimal: true,
        consequence: 'Compliance and velocity aligned! Pipeline logs provide an auditable trail, and approval is granted in seconds via Slack/GitHub.',
        feedback: 'Continuous Delivery allows deliberate human approval while automating the packaging and verification mechanics.',
      },
      {
        id: 'opt-3c',
        label: 'Print out 40 pages of code diffs and submit them to a monthly Change Advisory Board (CAB) meeting.',
        riskLevel: 'medium',
        isOptimal: false,
        consequence: 'Releases queue up into massive, risky quarterly batches that frequently cause outages.',
        feedback: 'Bureaucratic manual CABs increase batch size and risk. Shift-left compliance automation is far safer.',
      },
    ],
  },
  {
    id: 'step-4-monitoring',
    stageName: '4. Post-Deployment Verification and Telemetry',
    scenario:
      'The new release has successfully rolled out to 100% of production traffic using a rolling update. The deployment pipeline marked "Success".',
    question: 'What is your responsibility immediately following deployment?',
    options: [
      {
        id: 'opt-4a',
        label: 'Immediately close your laptop and celebrate because the deployment script finished with exit code 0.',
        riskLevel: 'high',
        isOptimal: false,
        consequence: 'Silent outage! The service started cleanly, but 10 minutes later memory leaks cause HTTP 500 errors for 80% of users.',
        feedback: 'A successful deployment command only means containers started; real telemetry reveals whether the app is truly healthy.',
      },
      {
        id: 'opt-4b',
        label: 'Observe the 4 Golden Signals (latency, traffic, error rates, CPU/memory saturation) and run synthetic health checks for 30 minutes.',
        riskLevel: 'low',
        isOptimal: true,
        consequence: 'Total peace of mind! Error rate remains at 0.02%, p99 latency stays at 110ms, and memory usage is stable.',
        feedback: 'Observing production telemetry immediately post-release ensures any latent anomalies are spotted before customers complain.',
      },
      {
        id: 'opt-4c',
        label: 'Wait until angry users submit negative Twitter/X reviews before investigating system health.',
        riskLevel: 'high',
        isOptimal: false,
        consequence: 'Brand damage! Relying on customer complaints as your primary monitoring system destroys business trust.',
        feedback: 'Active telemetry and automated alert thresholds must always detect outages before customers notice them.',
      },
    ],
  },
];

export interface LifecycleStageInfo {
  id: string;
  name: string;
  shortDesc: string;
  purpose: string;
  exampleActivities: string[];
  typicalOutputs: string[];
  nextConnection: string;
  commonFailures: string;
  detectionMethod: string;
}

export const LIFECYCLE_STAGES: LifecycleStageInfo[] = [
  {
    id: 'plan',
    name: '1. Plan',
    shortDesc: 'Requirements, architecture, sprint backlog',
    purpose: 'Define what to build, agree on acceptance criteria, identify technical dependencies, and evaluate security/operational constraints.',
    exampleActivities: ['Sprint backlog grooming', 'User story mapping', 'Threat modeling', 'API contract design'],
    typicalOutputs: ['Jira / Linear tickets', 'OpenAPI / Swagger specifications', 'Architecture Decision Records (ADRs)'],
    nextConnection: 'Provides clear functional and non-functional requirements to engineers before coding begins.',
    commonFailures: 'Ambiguous acceptance criteria, uncommunicated schema breaking changes.',
    detectionMethod: 'Early QA review during sprint grooming; cross-functional design reviews.',
  },
  {
    id: 'code',
    name: '2. Code',
    shortDesc: 'Local development, branch hygiene, peer review',
    purpose: 'Implement business logic and automated tests in short-lived feature branches using Git.',
    exampleActivities: ['Writing application logic', 'Authoring unit and integration tests', 'Pre-commit linter checks', 'Opening Pull Requests'],
    typicalOutputs: ['Git commits on feature branch', 'Pull Request with description and test evidence'],
    nextConnection: 'Submitting a Pull Request triggers the automated CI build and test pipeline.',
    commonFailures: 'Merge conflicts from long-lived branches, hardcoded secrets, lack of local unit tests.',
    detectionMethod: 'Pre-commit hooks (Husky, git-secrets), SonarQube static code analysis.',
  },
  {
    id: 'build',
    name: '3. Build',
    shortDesc: 'Compilation, dependencies, container image packaging',
    purpose: 'Transform raw source code into an immutable, executable artifact in a clean, reproducible runner.',
    exampleActivities: ['Resolving locked dependencies (npm ci / pip)', 'Compiling TypeScript/Go/Java', 'Building minimal Docker images'],
    typicalOutputs: ['Immutable Docker container image', 'Compiled binary or packaged zip archive', 'Build metadata (SHA, version)'],
    nextConnection: 'Passes the compiled, packaged artifact to the automated testing stage.',
    commonFailures: 'Broken dependency lockfiles, memory limits exceeded during compilation, floating package versions.',
    detectionMethod: 'CI runner exit codes, deterministic build logs.',
  },
  {
    id: 'test',
    name: '4. Test',
    shortDesc: 'Automated unit, integration, E2E, and security tests',
    purpose: 'Validate functional correctness, performance thresholds, and security compliance without human intervention.',
    exampleActivities: ['Executing Jest/Vitest unit tests', 'Running Playwright browser automation', 'Scanning container images with Trivy', 'Checking test coverage'],
    typicalOutputs: ['JUnit XML test reports', 'Code coverage reports (lcov)', 'Security vulnerability report'],
    nextConnection: 'Successful test results certify the build artifact as release-ready.',
    commonFailures: 'Flaky asynchronous tests, database seed race conditions, unhandled null exceptions.',
    detectionMethod: 'Pipeline test runners, coverage threshold gates (e.g. minimum 80% coverage).',
  },
  {
    id: 'release',
    name: '5. Release',
    shortDesc: 'Artifact versioning, registry tagging, release gates',
    purpose: 'Tag the verified artifact with a semantic version and store it securely in an immutable artifact repository.',
    exampleActivities: ['Tagging git release (v1.4.2)', 'Pushing Docker image to AWS ECR / GitHub Packages', 'Generating automated release changelogs'],
    typicalOutputs: ['Immutable tagged container in registry', 'Release changelog notes', 'Signed artifact checksum'],
    nextConnection: 'Signals target deployment runners that a certified artifact is ready for rollout.',
    commonFailures: 'Registry authentication timeout, duplicate version tag overwrite attempts.',
    detectionMethod: 'Artifact registry webhook validation, cryptographic image signing (Cosign).',
  },
  {
    id: 'deploy',
    name: '6. Deploy',
    shortDesc: 'Automated staging/production infrastructure rollout',
    purpose: 'Promote the verified artifact into target hosting environments using safe deployment strategies (Canary, Blue/Green).',
    exampleActivities: ['Applying Kubernetes Deployment manifests', 'Running Terraform apply', 'Executing database migrations', 'Updating load balancer traffic'],
    typicalOutputs: ['Running pods/containers in cluster', 'Updated routing table', 'Deployment audit log'],
    nextConnection: 'Transitions new code into the live runtime operational environment.',
    commonFailures: 'CrashLoopBackOff due to missing config, database connection pool exhaustion, migration lock timeouts.',
    detectionMethod: 'Kubernetes readiness and liveness probes, automated deployment health checks.',
  },
  {
    id: 'operate',
    name: '7. Operate',
    shortDesc: 'Runtime stability, autoscaling, configuration management',
    purpose: 'Maintain continuous availability, scale resources dynamically to handle traffic spikes, and manage secure configurations.',
    exampleActivities: ['Horizontal Pod Autoscaling (HPA)', 'TLS certificate renewal (Let’s Encrypt)', 'Secrets management (Vault)', 'Traffic shaping'],
    typicalOutputs: ['Healthy runtime processes', 'Load-balanced ingress endpoints', 'Uptime SLA maintenance'],
    nextConnection: 'Generates real-time runtime events, requests, and telemetry for monitoring.',
    commonFailures: 'Out Of Memory (OOMKilled) events, disk space exhaustion, DNS resolution throttling.',
    detectionMethod: 'CloudWatch / Prometheus node exporters, systemd service status.',
  },
  {
    id: 'monitor',
    name: '8. Monitor',
    shortDesc: 'Metrics, logs, traces, and alert triggers',
    purpose: 'Observe system behavior continuously using telemetry to detect anomalies before users report them.',
    exampleActivities: ['Collecting metrics via Prometheus', 'Streaming logs to Elasticsearch/Loki', 'Tracking distributed traces with OpenTelemetry', 'Firing PagerDuty alerts'],
    typicalOutputs: ['Grafana dashboards', 'Structured JSON log streams', 'SLI/SLO compliance reports'],
    nextConnection: 'Feeds operational telemetry and incident findings into the feedback loop.',
    commonFailures: 'Silent failures where HTTP 200 is returned with error payloads; alert fatigue from noisy thresholds.',
    detectionMethod: 'Multi-window multi-burn-rate alerting, APM error tracing.',
  },
  {
    id: 'feedback',
    name: '9. Feedback',
    shortDesc: 'Blameless postmortems, user analytics, sprint backlog',
    purpose: 'Translate real-world production performance, outages, and user behaviors into prioritized improvements for the next planning cycle.',
    exampleActivities: ['Conducting blameless postmortems', 'Reviewing DORA metrics monthly', 'Prioritizing tech debt in sprint backlog', 'Customer sentiment reviews'],
    typicalOutputs: ['Postmortem action items in Jira', 'Refined alerting thresholds', 'Prioritized user story improvements'],
    nextConnection: 'Loops directly into the Plan stage, completing the continuous delivery flywheel.',
    commonFailures: 'Treating postmortems as paperwork without implementing preventative action items.',
    detectionMethod: 'DORA metric trend tracking (MTTR, Change Failure Rate).',
  },
];
