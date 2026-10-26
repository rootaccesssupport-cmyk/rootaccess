import { describe, it, expect } from 'vitest';
import { DEVOPS_COURSE_METADATA, DEVOPS_MODULES, getRoadmapDay } from '../data/devopsCurriculumData';
import { DEVOPS_DAY_1_DATA } from '../data/devopsDay1Data';
import { DEVOPS_DAY_2_DATA } from '../data/devopsDay2Data';
import { DEVOPS_DAY_3_DATA } from '../data/devopsDay3Data';
import {
  evaluateDevOpsQuiz,
  evaluateDay1Assignment,
  evaluateDay2Assignment,
  evaluateDay3Assignment,
} from '../services/devopsEvaluationService';

describe('DevOps Curriculum Data and Roadmap Integrity', () => {
  it('has valid course metadata with 36 days and 12 modules', () => {
    expect(DEVOPS_COURSE_METADATA.slug).toBe('devops-engineering');
    expect(DEVOPS_COURSE_METADATA.totalDays).toBe(36);
    expect(DEVOPS_COURSE_METADATA.implementedDays).toBe(3);
    expect(DEVOPS_COURSE_METADATA.outcomes.length).toBeGreaterThanOrEqual(4);
  });

  it('contains exactly 12 modules and 36 roadmap days in total', () => {
    expect(DEVOPS_MODULES).toHaveLength(12);
    const totalDays = DEVOPS_MODULES.reduce((sum, mod) => sum + mod.days.length, 0);
    expect(totalDays).toBe(36);
  });

  it('marks Module 1 (Days 1–3) as implemented and Modules 2–12 as upcoming', () => {
    const mod1 = DEVOPS_MODULES[0];
    expect(mod1.moduleNumber).toBe(1);
    expect(mod1.days).toHaveLength(3);
    expect(mod1.days[0].status).toBe('implemented');
    expect(mod1.days[1].status).toBe('implemented');
    expect(mod1.days[2].status).toBe('implemented');

    for (let i = 1; i < DEVOPS_MODULES.length; i++) {
      const mod = DEVOPS_MODULES[i];
      for (const day of mod.days) {
        expect(day.status).toBe('upcoming');
      }
    }
  });

  it('retrieves correct day metadata using getRoadmapDay', () => {
    const day1 = getRoadmapDay(1);
    expect(day1).toBeDefined();
    expect(day1?.title).toContain('Understanding DevOps');
    expect(day1?.status).toBe('implemented');

    const day2 = getRoadmapDay(2);
    expect(day2).toBeDefined();
    expect(day2?.title).toContain('Linux Fundamentals');
    expect(day2?.status).toBe('implemented');

    const day3 = getRoadmapDay(3);
    expect(day3).toBeDefined();
    expect(day3?.title).toContain('Linux Files, Permissions');
    expect(day3?.status).toBe('implemented');

    const day36 = getRoadmapDay(36);
    expect(day36).toBeDefined();
    expect(day36?.status).toBe('upcoming');

    expect(getRoadmapDay(99)).toBeUndefined();
  });
});

describe('DevOps Days 1–3 Content Specifications', () => {
  it('Day 1 contains 6 deep topics, 5 checkpoints, 10 quiz questions, and 5 interview questions', () => {
    expect(DEVOPS_DAY_1_DATA.topics.length).toBe(6);
    expect(DEVOPS_DAY_1_DATA.checkpoints.length).toBe(5);
    expect(DEVOPS_DAY_1_DATA.quizQuestions.length).toBe(10);
    expect(DEVOPS_DAY_1_DATA.interviewQuestions.length).toBe(5);

    DEVOPS_DAY_1_DATA.quizQuestions.forEach((q) => {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation).toBeTruthy();
    });

    DEVOPS_DAY_1_DATA.interviewQuestions.forEach((iq) => {
      expect(iq.question).toBeTruthy();
      expect(iq.modelAnswer).toBeTruthy();
      expect(iq.commonMistakes.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('Day 2 contains 7 deep topics, 5 checkpoints, 10 quiz questions, and 5 interview questions', () => {
    expect(DEVOPS_DAY_2_DATA.topics.length).toBe(7);
    expect(DEVOPS_DAY_2_DATA.checkpoints.length).toBe(5);
    expect(DEVOPS_DAY_2_DATA.quizQuestions.length).toBe(10);
    expect(DEVOPS_DAY_2_DATA.interviewQuestions.length).toBe(5);

    DEVOPS_DAY_2_DATA.quizQuestions.forEach((q) => {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation).toBeTruthy();
    });
  });

  it('Day 3 contains 8 deep topics, 5 checkpoints, 10 quiz questions, and 5 interview questions', () => {
    expect(DEVOPS_DAY_3_DATA.topics.length).toBe(8);
    expect(DEVOPS_DAY_3_DATA.checkpoints.length).toBe(5);
    expect(DEVOPS_DAY_3_DATA.quizQuestions.length).toBe(10);
    expect(DEVOPS_DAY_3_DATA.interviewQuestions.length).toBe(5);

    DEVOPS_DAY_3_DATA.quizQuestions.forEach((q) => {
      expect(q.options.length).toBe(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThan(4);
      expect(q.explanation).toBeTruthy();
    });
  });
});

describe('DevOps Deterministic Evaluation Service', () => {
  it('evaluates quiz with 80% passing threshold (8 out of 10 required)', () => {
    // 10 out of 10 -> 100% -> Pass
    const perfectAnswers: Record<string, number> = {};
    DEVOPS_DAY_1_DATA.quizQuestions.forEach((q) => {
      perfectAnswers[q.id] = q.correctIndex;
    });
    const result10 = evaluateDevOpsQuiz(1, perfectAnswers);
    expect(result10.score).toBe(10);
    expect(result10.percentage).toBe(100);
    expect(result10.passed).toBe(true);

    // 8 out of 10 -> 80% -> Pass
    const eightAnswers: Record<string, number> = { ...perfectAnswers };
    eightAnswers[DEVOPS_DAY_1_DATA.quizQuestions[0].id] = (DEVOPS_DAY_1_DATA.quizQuestions[0].correctIndex + 1) % 4;
    eightAnswers[DEVOPS_DAY_1_DATA.quizQuestions[1].id] = (DEVOPS_DAY_1_DATA.quizQuestions[1].correctIndex + 1) % 4;
    const result8 = evaluateDevOpsQuiz(1, eightAnswers);
    expect(result8.score).toBe(8);
    expect(result8.percentage).toBe(80);
    expect(result8.passed).toBe(true);

    // 7 out of 10 -> 70% -> Fail
    const sevenAnswers: Record<string, number> = { ...eightAnswers };
    sevenAnswers[DEVOPS_DAY_1_DATA.quizQuestions[2].id] = (DEVOPS_DAY_1_DATA.quizQuestions[2].correctIndex + 1) % 4;
    const result7 = evaluateDevOpsQuiz(1, sevenAnswers);
    expect(result7.score).toBe(7);
    expect(result7.percentage).toBe(70);
    expect(result7.passed).toBe(false);
  });

  it('evaluates Day 1 practical assignment based on rubric criteria', () => {
    const strongSubmission = {
      codeChangeProcess: 'Developers work in small feature branches created from main. Every commit triggers local pre-commit linters and tests. Pull requests require two senior peer approvals and passing CI status checks.',
      automatedTests: 'The automated test pipeline runs fast unit tests in 60 seconds, followed by integration tests with testcontainers and security scans with Trivy before packaging Docker images.',
      releaseApproval: 'Staging environment deployments are automatic. Releases to production require approval from the on-call release manager through Slack interactive buttons integrated with GitHub Actions.',
      deploymentSteps: 'Deployments utilize a canary release strategy where 5% of traffic is routed to the new version. Metrics are evaluated for 10 minutes before progressing to 25%, 50%, and 100%.',
      monitoringSignals: 'Observability monitors HTTP 5xx error rate, p95 and p99 response latencies, CPU saturation, and database connection pool exhaustion via Prometheus and Grafana dashboards.',
      feedbackRecovery: 'If error rate exceeds 1% during canary rollout, automated rollback triggers instantly via Kubernetes deployment undo, restoring the prior stable release and alerting on-call via PagerDuty.',
    };
    const passRes = evaluateDay1Assignment(strongSubmission);
    expect(passRes.passed).toBe(true);
    expect(passRes.score).toBeGreaterThanOrEqual(70);
    expect(passRes.criteriaScores.length).toBeGreaterThanOrEqual(4);
  });

  it('evaluates Day 2 Linux practical assignment', () => {
    const strongSubmission = {
      commandsUsed: 'mkdir -p src config logs scripts\ntouch src/server.js config/default.env scripts/deploy.sh\ncp config/default.env config/production.env\nls -la src',
      explanation: 'Organized directory structure adhering to Filesystem Hierarchy Standard. Used mkdir -p to safely construct nested folders and cp to create environment configurations with proper naming.',
      directoryStructureDescription: 'The final hierarchy contains /workspace/ecommerce-api with src/ (application source), config/ (environment settings), scripts/ (maintenance bash scripts), and logs/ (runtime application traces).',
    };
    const passRes = evaluateDay2Assignment(strongSubmission);
    expect(passRes.passed).toBe(true);
    expect(passRes.score).toBeGreaterThanOrEqual(70);
  });

  it('evaluates Day 3 Linux incident diagnostic assignment', () => {
    const strongSubmission = {
      problemSummary: 'Checkout microservice failing with HTTP 502 Bad Gateway following production deployment. Bootstrap loader halted immediately upon reading configuration.',
      relevantEvidence: 'Logs at /var/log/checkout/error.log show: [FATAL] EACCES: permission denied, open /etc/checkout/config.env. Node worker PID 1420 terminated with exit code 1.',
      likelyRootCause: 'Incorrect file ownership and permission bits on config.env preventing the non-root nodejs service user from reading environment credentials.',
      proposedCorrection: 'Run chown nodejs:nodejs /etc/checkout/config.env and chmod 640 /etc/checkout/config.env to grant read access only to the service account and group.',
      verificationStep: 'Test read access as nodejs user with sudo -u nodejs cat /etc/checkout/config.env, restart systemd service with systemctl restart checkout-api, and verify active status.',
      preventionRecommendation: 'Update deployment pipeline to validate file permissions prior to restarting services, and adopt immutable container images where permissions are verified in CI.',
    };
    const passRes = evaluateDay3Assignment(strongSubmission);
    expect(passRes.passed).toBe(true);
    expect(passRes.score).toBeGreaterThanOrEqual(70);
  });

  it('penalizes unsafe chmod 777 in Day 3 diagnostic assignment', () => {
    const dangerousSubmission = {
      problemSummary: 'Checkout microservice failing with HTTP 502 Bad Gateway after deployment.',
      relevantEvidence: 'Log showed EACCES: permission denied reading config file.',
      likelyRootCause: 'Permission denied on config file.',
      proposedCorrection: 'I fixed it by running chmod 777 on the entire directory so anyone can read and write.',
      verificationStep: 'Restarted the server and it worked.',
      preventionRecommendation: 'Leave chmod 777 in place.',
    };
    const failRes = evaluateDay3Assignment(dangerousSubmission);
    expect(failRes.criteriaScores.some((c) => c.comment.includes('chmod 777'))).toBe(true);
  });

  it('rejects random keywords, keyboard mash, and spam in Day 1 assignment with 0 or failing score', () => {
    const gibberishSubmission = {
      codeChangeProcess: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      automatedTests: 'unit asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      releaseApproval: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      deploymentSteps: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      monitoringSignals: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      feedbackRecovery: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
    };
    const failRes = evaluateDay1Assignment(gibberishSubmission);
    expect(failRes.passed).toBe(false);
    expect(failRes.score).toBeLessThan(30);
    // Code change should be 0 because it's pure mash
    const codeCriterion = failRes.criteriaScores.find((c) => c.criterion.includes('Branching'));
    expect(codeCriterion?.score).toBe(0);
    expect(codeCriterion?.comment).toContain('Lacks required technical substance');
  });

  it('rejects random text in Day 2 Linux assignment', () => {
    const spamSubmission = {
      commandsUsed: 'ls mkdir asdf asdf asdf asdf asdf asdf asdf asdf',
      explanation: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      directoryStructureDescription: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
    };
    const failRes = evaluateDay2Assignment(spamSubmission);
    expect(failRes.passed).toBe(false);
    expect(failRes.score).toBeLessThan(30);
  });

  it('rejects random text in Day 3 incident assignment', () => {
    const spamSubmission = {
      problemSummary: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      relevantEvidence: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      likelyRootCause: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      proposedCorrection: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      verificationStep: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
      preventionRecommendation: 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf',
    };
    const failRes = evaluateDay3Assignment(spamSubmission);
    expect(failRes.passed).toBe(false);
    expect(failRes.score).toBe(0);
  });

  it('evaluates optimal Day 1 scenario mission choices with 100% score', () => {
    const optimalMission = {
      missionChoices: {
        'd1-s1': 'd1-s1-c1',
        'd1-s2': 'd1-s2-c1',
        'd1-s3': 'd1-s3-c1',
        'd1-s4': 'd1-s4-c1',
        'd1-s5': 'd1-s5-c1',
      },
    };
    const res = evaluateDay1Assignment(optimalMission);
    expect(res.passed).toBe(true);
    expect(res.percentage).toBe(100);
    expect(res.feedback).toContain('Exceptional Engineering Leadership');
  });

  it('evaluates Day 3 scenario mission and penalizes dangerous chmod 777 choices', () => {
    const dangerousMission = {
      missionChoices: {
        'd3-s1': 'd3-s1-c1',
        'd3-s2': 'd3-s2-c1',
        'd3-s3': 'd3-s3-c2', // chmod 777 anti-pattern
        'd3-s4': 'd3-s4-c1',
        'd3-s5': 'd3-s5-c1',
      },
    };
    const res = evaluateDay3Assignment(dangerousMission);
    expect(res.percentage).toBe(80); // 4 optimal stages * 20 + 0 for chmod 777
    const chmodCriterion = res.criteriaScores.find((c) => c.criterion.includes('Remediation'));
    expect(chmodCriterion?.score).toBe(0);
    expect(chmodCriterion?.comment).toContain('CRITICAL SECURITY VIOLATION');
  });
});

