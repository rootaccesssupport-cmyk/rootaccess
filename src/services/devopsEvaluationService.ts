import { DEVOPS_DAY_1_DATA } from '../data/devopsDay1Data';
import { DEVOPS_DAY_2_DATA } from '../data/devopsDay2Data';
import { DEVOPS_DAY_3_DATA } from '../data/devopsDay3Data';
import {
  PracticalMission,
  DEVOPS_DAY_1_MISSION,
  DEVOPS_DAY_2_MISSION,
  DEVOPS_DAY_3_MISSION,
} from '../data/devopsScenarioMissions';

export interface QuizEvaluationResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  questionResults: Array<{
    questionId: string;
    questionText: string;
    domain: string;
    userAnswerIndex: number;
    correctAnswerIndex: number;
    isCorrect: boolean;
    explanation: string;
  }>;
}

export function evaluateDevOpsQuiz(dayNumber: number, answers: Record<string, number>): QuizEvaluationResult {
  let questions = DEVOPS_DAY_1_DATA.quizQuestions;
  if (dayNumber === 2) questions = DEVOPS_DAY_2_DATA.quizQuestions;
  if (dayNumber === 3) questions = DEVOPS_DAY_3_DATA.quizQuestions;

  let score = 0;
  const questionResults = questions.map((q) => {
    const userAns = answers[q.id];
    const isCorrect = userAns !== undefined && userAns === q.correctIndex;
    if (isCorrect) score += 1;
    return {
      questionId: q.id,
      questionText: q.question,
      domain: q.domain,
      userAnswerIndex: userAns !== undefined ? userAns : -1,
      correctAnswerIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation,
    };
  });

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 80; // 80% passing threshold required by syllabus

  return {
    score,
    total,
    percentage,
    passed,
    questionResults,
  };
}

export interface AssignmentEvaluationResult {
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  feedback: string;
  criteriaScores: Array<{
    criterion: string;
    score: number;
    maxScore: number;
    comment: string;
  }>;
}

// Helper: Detect keyboard mashing, repeated tokens, or spam strings lacking linguistic/technical coherence
export function isGibberishOrKeyboardMash(text: string): boolean {
  if (!text) return true;
  const trimmed = text.trim();
  if (trimmed.length < 15) return true;

  // Split into clean words
  const rawWords = trimmed.toLowerCase().split(/[\s,.;:!?()[\]{}<>"'/\\|`~*#&^%$@+=_-]+/).filter((w) => w.length > 0);
  if (rawWords.length < 4) return true;

  // Check unique word ratio (reject spam e.g. "unit unit unit unit unit unit" or repeating identical token)
  const uniqueWords = new Set(rawWords);
  if (rawWords.length >= 6 && uniqueWords.size / rawWords.length < 0.38) {
    return true;
  }

  // Known technical acronyms / CLI commands that lack standard English vowel distributions
  const technicalWhitelisted = new Set([
    'kubectl', 'systemctl', 'journalctl', 'chmod', 'chown', 'mkdir', 'crontab', 'nginx',
    'mysql', 'psql', 'rsync', 'gzip', 'bzip2', 'stdout', 'stderr', 'tmpfs', 'sysfs', 'procfs',
    'dockerfile', 'helm', 'k8s', 'ansible', 'terraform', 'trivy', 'sast', 'dast', 'grpc', 'http',
    'https', 'tcp', 'udp', 'dns', 'icmp', 'smtp', 'ssh', 'scp', 'curl', 'wget', 'grep', 'awk', 'sed'
  ]);

  // Consonant runs: 6+ consecutive consonants unless whitelisted
  const consonantRuns = trimmed.match(/[bcdfghjklmnpqrstvwxyz]{6,}/gi) || [];
  for (const run of consonantRuns) {
    if (!technicalWhitelisted.has(run.toLowerCase())) {
      return true;
    }
  }

  // Repeated identical character sequences e.g. "aaaaa", "zzzzz", "11111"
  if (/(.)\1{4,}/.test(trimmed)) {
    return true;
  }

  // Obvious keyboard mash tokens e.g. "asdf", "qwerty", "zxcv", "hjkl", "lkjh", "qwer", "asdfgh"
  const mashCount = rawWords.filter((w) =>
    /^(asdf|qwerty|zxcv|hjkl|lkjh|qwer|asdfgh|zxcvbn|poiuy|1234|test1|test2|randomtext|gibberish)/i.test(w)
  ).length;
  if (mashCount > 0 && mashCount / rawWords.length >= 0.35) {
    return true;
  }

  return false;
}

// Helper: Evaluates how many concept groups are matched in a submission field
export function matchConceptGroups(text: string, groups: string[][]): {
  matchedCount: number;
  matchedGroups: string[];
  missingCount: number;
} {
  const lower = text.toLowerCase();
  const matchedGroups: string[] = [];

  groups.forEach((group, idx) => {
    const hasMatch = group.some((keyword) => {
      // Escape for regex if needed or simple includes
      return lower.includes(keyword.toLowerCase());
    });
    if (hasMatch) {
      matchedGroups.push(`Group ${idx + 1}: [${group[0]}]`);
    }
  });

  return {
    matchedCount: matchedGroups.length,
    matchedGroups,
    missingCount: groups.length - matchedGroups.length,
  };
}

// Helper for Real-Time UI Concept Readiness & Live Gamification
export function getLiveDimensionReadiness(text: string, conceptGroups: string[][]): {
  wordCount: number;
  isSpam: boolean;
  isDraft: boolean;
  isSolid: boolean;
  conceptMatches: boolean[];
} {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  if (wordCount === 0) {
    return {
      wordCount: 0,
      isSpam: false,
      isDraft: false,
      isSolid: false,
      conceptMatches: conceptGroups.map(() => false),
    };
  }

  const isSpam = isGibberishOrKeyboardMash(text);
  const lower = text.toLowerCase();
  const conceptMatches = conceptGroups.map((group) =>
    group.some((keyword) => lower.includes(keyword.toLowerCase()))
  );
  const matchedCount = conceptMatches.filter(Boolean).length;
  const isSolid = !isSpam && matchedCount >= 2 && wordCount >= 12;
  const isDraft = !isSolid && !isSpam;

  return {
    wordCount,
    isSpam,
    isDraft,
    isSolid,
    conceptMatches,
  };
}

// Evaluate Interactive Scenario Mission
export function evaluateMissionSubmission(
  mission: PracticalMission,
  missionChoices: Record<string, string>
): AssignmentEvaluationResult {
  const criteriaScores: Array<{ criterion: string; score: number; maxScore: number; comment: string }> = [];
  let totalScore = 0;
  let optimalCount = 0;

  for (const stage of mission.stages) {
    const chosenId = missionChoices[stage.id];
    const choice = stage.choices.find((c) => c.id === chosenId);
    if (!choice) {
      criteriaScores.push({
        criterion: stage.title,
        score: 0,
        maxScore: 20,
        comment: 'Stage not completed. Please select an operational decision.',
      });
    } else {
      totalScore += choice.score;
      if (choice.isOptimal) optimalCount++;
      criteriaScores.push({
        criterion: stage.title,
        score: choice.score,
        maxScore: 20,
        comment: choice.isOptimal
          ? `Optimal Decision (+${choice.score}/20): ${choice.label}. ${choice.seniorStaffAnalysis}`
          : `${choice.outcomeTitle} (+${choice.score}/20): ${choice.label}. ${choice.seniorStaffAnalysis}`,
      });
    }
  }

  const maxScore = mission.stages.length * 20; // 100
  const percentage = Math.round((totalScore / maxScore) * 100);
  const passed = percentage >= 70;

  let feedback = '';
  if (percentage >= 90) {
    feedback = `Exceptional Engineering Leadership! You executed ${optimalCount}/${mission.stages.length} optimal architectural decisions. Your operational strategy upholds high availability, security least-privilege, and automated recovery.`;
  } else if (passed) {
    feedback = `Mission Passed! You achieved ${percentage}% (${optimalCount}/${mission.stages.length} optimal decisions). Review the stages where sub-optimal or risky choices were identified to reinforce enterprise operational standards.`;
  } else {
    feedback = `Mission Failed (${percentage}%). Several dangerous or sub-optimal decisions resulted in security audit failures or extended downtime. Review the Senior Staff analyses and retry the mission.`;
  }

  return {
    score: totalScore,
    maxScore,
    percentage,
    passed,
    feedback,
    criteriaScores,
  };
}

// Evaluate Day 1 Assignment: Web Application Delivery Workflow Design
export function evaluateDay1Assignment(submission: any): AssignmentEvaluationResult {
  if (submission?.missionChoices) {
    return evaluateMissionSubmission(DEVOPS_DAY_1_MISSION, submission.missionChoices);
  }

  const criteriaScores: Array<{ criterion: string; score: number; maxScore: number; comment: string }> = [];

  // 1. Code Change Process (Max: 15)
  // Groups: [Branching Model], [PR & Code Review], [Commit Hygiene & Hooks]
  const c1Groups = [
    ['branch', 'trunk', 'gitflow', 'main', 'master', 'feature branch', 'short-lived'],
    ['pr', 'pull request', 'peer review', 'code review', 'approv', 'reviewer'],
    ['pre-commit', 'husky', 'linter', 'lint', 'commit hook', 'status check', 'merge'],
  ];
  const c1Spam = isGibberishOrKeyboardMash(submission.codeChangeProcess);
  const c1Matches = matchConceptGroups(submission.codeChangeProcess, c1Groups);

  if (c1Spam || c1Matches.matchedCount === 0) {
    criteriaScores.push({
      criterion: 'Code-Change & Branching Strategy',
      score: 0,
      maxScore: 15,
      comment: 'Lacks required technical substance or appears to be random text. Senior engineers require a concrete branching model (Trunk-based or GitFlow), PR peer review rules, and automated pre-commit hooks.',
    });
  } else if (c1Matches.matchedCount >= 2 && submission.codeChangeProcess.trim().split(/\s+/).length >= 14) {
    criteriaScores.push({
      criterion: 'Code-Change & Branching Strategy',
      score: 15,
      maxScore: 15,
      comment: 'Thoroughly describes feature branching, PR peer reviews, and automated commit hooks.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Code-Change & Branching Strategy',
      score: 8,
      maxScore: 15,
      comment: 'Acceptable overview, but could specify branch protection rules, required peer approvals, and pre-commit linters.',
    });
  }

  // 2. Automated Tests (Max: 20)
  // Groups: [Test Layers: unit, integration, e2e], [Testing / Security Tools & Coverage], [CI Pipeline Gating]
  const c2Groups = [
    ['unit', 'integration', 'e2e', 'end-to-end', 'smoke', 'component test', 'api test'],
    ['jest', 'pytest', 'playwright', 'cypress', 'trivy', 'sast', 'sonarqube', 'security scan', 'coverage', 'testcontainer'],
    ['gate', 'ci', 'pipeline', 'fail-fast', 'threshold', 'automated', 'block', 'status check'],
  ];
  const c2Spam = isGibberishOrKeyboardMash(submission.automatedTests);
  const c2Matches = matchConceptGroups(submission.automatedTests, c2Groups);

  if (c2Spam || c2Matches.matchedCount === 0) {
    criteriaScores.push({
      criterion: 'Automated Testing Pyramid',
      score: 0,
      maxScore: 20,
      comment: 'Submission lacks automated testing substance. Mention specific testing tiers (unit, integration, e2e), code coverage thresholds, and CI fail-fast gates.',
    });
  } else if (c2Matches.matchedCount >= 2 && submission.automatedTests.trim().split(/\s+/).length >= 14) {
    criteriaScores.push({
      criterion: 'Automated Testing Pyramid',
      score: 20,
      maxScore: 20,
      comment: 'Clearly incorporates multi-tiered test gates (unit, integration, or end-to-end checks) and CI execution rules.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Automated Testing Pyramid',
      score: 10,
      maxScore: 20,
      comment: 'Testing strategy lacks mention of multi-tiered coverage gates, integration checks, or container security scanning.',
    });
  }

  // 3. Release Approval (Max: 15)
  // Groups: [Delivery vs Deployment Model], [Approval / Governance Gate], [Environment Promotion]
  const c3Groups = [
    ['continuous delivery', 'continuous deployment', 'cd model', 'delivery model', 'deployment model'],
    ['approval', 'sign-off', 'gate', 'manual gate', 'release manager', 'lead', 'product manager', 'authorized', 'promotion'],
    ['staging', 'production', 'prod', 'environment', 'promote', 'deploy'],
  ];
  const c3Spam = isGibberishOrKeyboardMash(submission.releaseApproval);
  const c3Matches = matchConceptGroups(submission.releaseApproval, c3Groups);

  if (c3Spam || c3Matches.matchedCount === 0) {
    criteriaScores.push({
      criterion: 'Release Approval & Governance',
      score: 0,
      maxScore: 15,
      comment: 'Submission lacks release governance details. Clarify whether Continuous Delivery or Continuous Deployment is practiced and who authorizes promotion.',
    });
  } else if (c3Matches.matchedCount >= 2 && submission.releaseApproval.trim().split(/\s+/).length >= 10) {
    criteriaScores.push({
      criterion: 'Release Approval & Governance',
      score: 15,
      maxScore: 15,
      comment: 'Distinguishes automated checks from deliberate promotion approval gates.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Release Approval & Governance',
      score: 7,
      maxScore: 15,
      comment: 'Clarify who or what authorizes promotion to staging vs production environments.',
    });
  }

  // 4. Deployment Steps (Max: 20)
  // Groups: [Rollout Strategy: canary, blue/green, rolling], [Artifact Packaging: docker, image, tag, immutable]
  const c4Groups = [
    ['rolling', 'canary', 'blue/green', 'blue-green', 'zero-downtime', 'progressive', 'recreate'],
    ['docker', 'container', 'image', 'artifact', 'sha', 'tag', 'registry', 'immutable', 'pod', 'kubernetes', 'k8s'],
  ];
  const c4Spam = isGibberishOrKeyboardMash(submission.deploymentSteps);
  const c4Matches = matchConceptGroups(submission.deploymentSteps, c4Groups);

  if (c4Spam || c4Matches.matchedCount === 0) {
    criteriaScores.push({
      criterion: 'Automated Deployment Mechanics',
      score: 0,
      maxScore: 20,
      comment: 'Submission lacks deployment mechanics. Describe immutable artifact packaging (Docker image tag/SHA) and a zero-downtime rollout strategy (Canary, Blue/Green, Rolling).',
    });
  } else if (c4Matches.matchedCount >= 2 && submission.deploymentSteps.trim().split(/\s+/).length >= 14) {
    criteriaScores.push({
      criterion: 'Automated Deployment Mechanics',
      score: 20,
      maxScore: 20,
      comment: 'Solid explanation of packaging immutable artifacts and automated zero-downtime deployment rollouts.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Automated Deployment Mechanics',
      score: 10,
      maxScore: 20,
      comment: 'Deployment steps should specify whether rolling, blue/green, or canary strategies are used with immutable container tags.',
    });
  }

  // 5. Monitoring & Feedback (Max: 30)
  // Split into Telemetry Signals (15) and Feedback / Rollback (15)
  const mGroups = [
    ['latency', 'error rate', '5xx', 'golden signals', 'p95', 'p99', 'cpu', 'memory', 'throughput', 'saturation', 'traffic'],
    ['prometheus', 'grafana', 'datadog', 'cloudwatch', 'alert', 'pagerduty', 'metrics', 'monitor', 'threshold'],
  ];
  const rGroups = [
    ['rollback', 'revert', 'previous image', 'previous tag', 'undo', 'circuit breaker', 'previous version', 'restore'],
    ['automated', 'threshold', 'trigger', 'automatic', 'instant', 'exceed', 'alert'],
  ];

  const mSpam = isGibberishOrKeyboardMash(submission.monitoringSignals);
  const rSpam = isGibberishOrKeyboardMash(submission.feedbackRecovery);
  const mMatches = matchConceptGroups(submission.monitoringSignals, mGroups);
  const rMatches = matchConceptGroups(submission.feedbackRecovery, rGroups);

  let telemetryScore = 0;
  if (!mSpam && mMatches.matchedCount >= 2) telemetryScore = 15;
  else if (!mSpam && mMatches.matchedCount >= 1) telemetryScore = 8;

  let rollbackScore = 0;
  if (!rSpam && rMatches.matchedCount >= 2) rollbackScore = 15;
  else if (!rSpam && rMatches.matchedCount >= 1) rollbackScore = 8;

  const combinedTelemetryScore = telemetryScore + rollbackScore;

  if (mSpam && rSpam) {
    criteriaScores.push({
      criterion: 'Telemetry, Alerts & Rollback Strategy',
      score: 0,
      maxScore: 30,
      comment: 'Lacks observability and recovery substance. Specify concrete golden signals (HTTP 5xx rate, p99 latency) and automated rollback triggers.',
    });
  } else if (combinedTelemetryScore >= 25) {
    criteriaScores.push({
      criterion: 'Telemetry, Alerts & Rollback Strategy',
      score: 30,
      maxScore: 30,
      comment: 'Excellent integration of observability signals (latency, errors) and fast automated rollback procedures.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Telemetry, Alerts & Rollback Strategy',
      score: Math.max(12, combinedTelemetryScore),
      maxScore: 30,
      comment: 'Monitoring or rollback criteria should be expanded with concrete thresholds (e.g. 5xx > 1% over 3 minutes triggers automated rollback).',
    });
  }

  const score = criteriaScores.reduce((acc, c) => acc + c.score, 0);
  const maxScore = 100;
  const percentage = Math.round((score / maxScore) * 100);
  const passed = percentage >= 70;

  return {
    score,
    maxScore,
    percentage,
    passed,
    feedback: passed
      ? 'Outstanding delivery workflow design! Your architecture demonstrates clear understanding of CI/CD, immutable artifacts, and telemetry-driven feedback.'
      : 'Submission needs revision. Ensure your workflow covers feature branching hygiene, multi-tier testing gates, immutable packaging, and concrete automated rollback thresholds.',
    criteriaScores,
  };
}

// Evaluate Day 2 Assignment: Project Directory Setup Task
export function evaluateDay2Assignment(submission: any): AssignmentEvaluationResult {
  if (submission?.missionChoices) {
    return evaluateMissionSubmission(DEVOPS_DAY_2_MISSION, submission.missionChoices);
  }

  const criteriaScores: Array<{ criterion: string; score: number; maxScore: number; comment: string }> = [];

  const rawCmds = submission.commandsUsed;
  const isCmdSpam = isGibberishOrKeyboardMash(rawCmds);

  // Validate actual shell commands with valid arguments
  const hasMkdir = /\bmkdir(\s+-[a-zA-Z]+)*\s+[a-zA-Z0-9_./\-]+/i.test(rawCmds);
  const hasTouchOrCat = /\b(touch|cat|echo)\b/i.test(rawCmds);
  const hasCpOrMv = /\b(cp|mv)(\s+-[a-zA-Z]+)*\s+[a-zA-Z0-9_./\-]+/i.test(rawCmds);
  const hasLs = /\bls(\s+-[a-zA-Z]+)*/i.test(rawCmds);
  const hasCdOrPwd = /\b(cd|pwd)\b/i.test(rawCmds);

  let cmdScore = 0;
  if (!isCmdSpam) {
    if (hasMkdir) cmdScore += 10;
    if (hasTouchOrCat) cmdScore += 10;
    if (hasCpOrMv) cmdScore += 10;
    if (hasLs || hasCdOrPwd) cmdScore += 10;
  }

  const recognizedCmds = [
    hasMkdir ? 'mkdir' : '',
    hasTouchOrCat ? 'touch/cat' : '',
    hasCpOrMv ? 'cp/mv' : '',
    hasLs ? 'ls' : '',
    hasCdOrPwd ? 'pwd/cd' : '',
  ].filter(Boolean);

  criteriaScores.push({
    criterion: 'Command Breadth & Correctness',
    score: cmdScore,
    maxScore: 40,
    comment: cmdScore === 0
      ? 'No valid shell command sequences identified. Please list actual Linux commands with paths and arguments (e.g., mkdir -p logs, cp .env.example .env, ls -la).'
      : `Utilized key Linux utilities: ${recognizedCmds.join(', ')}.`,
  });

  // Explanation
  const expSpam = isGibberishOrKeyboardMash(submission.explanation);
  const expGroups = [
    ['hidden', 'dotfile', 'dot file', '.env', 'hidden file'],
    ['mkdir -p', 'parent', 'nested', 'flag', 'reproducible', 'safe'],
    ['template', 'example', 'backup', 'duplicate', 'isolate', 'standard'],
  ];
  const expMatches = matchConceptGroups(submission.explanation, expGroups);

  if (expSpam || expMatches.matchedCount === 0) {
    criteriaScores.push({
      criterion: 'Command Justification & Safety',
      score: 0,
      maxScore: 30,
      comment: 'Submission lacks command rationale or appears to be random text. Explain why specific commands and flags (such as why ls -a is needed for dotfiles or mkdir -p) were chosen.',
    });
  } else if (expMatches.matchedCount >= 2 && submission.explanation.trim().split(/\s+/).length >= 14) {
    criteriaScores.push({
      criterion: 'Command Justification & Safety',
      score: 30,
      maxScore: 30,
      comment: 'Clearly explains rationale for directory organization, hidden dotfiles, and safe file operations.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Command Justification & Safety',
      score: 15,
      maxScore: 30,
      comment: 'Basic rationale provided, but explain why specific flags (such as ls -a for hidden dotfiles or mkdir -p) were chosen.',
    });
  }

  // Directory Structure Description
  const dirSpam = isGibberishOrKeyboardMash(submission.directoryStructureDescription);
  const dirDesc = submission.directoryStructureDescription.toLowerCase();
  const hasHierarchySymbols = /[/\\]|├──|└──|\|--/g.test(submission.directoryStructureDescription);
  const hasKeyFiles = (dirDesc.includes('log') || dirDesc.includes('logs')) &&
                      (dirDesc.includes('.env') || dirDesc.includes('env')) &&
                      (dirDesc.includes('src') || dirDesc.includes('server') || dirDesc.includes('config') || dirDesc.includes('scripts'));

  if (dirSpam || !hasHierarchySymbols) {
    criteriaScores.push({
      criterion: 'Final Filesystem Hierarchy Structure',
      score: 0,
      maxScore: 30,
      comment: 'Submission does not represent a valid directory tree structure. Provide a structured tree or path listing of your final directories and files (including logs/ and .env).',
    });
  } else if (hasKeyFiles && submission.directoryStructureDescription.trim().length >= 30) {
    criteriaScores.push({
      criterion: 'Final Filesystem Hierarchy Structure',
      score: 30,
      maxScore: 30,
      comment: 'Accurately documents the resulting project hierarchy and file locations (logs/, .env, and application folders).',
    });
  } else {
    criteriaScores.push({
      criterion: 'Final Filesystem Hierarchy Structure',
      score: 15,
      maxScore: 30,
      comment: 'Partially structured hierarchy, but ensure it clearly displays created logs/ folder and .env configuration file.',
    });
  }

  const score = criteriaScores.reduce((acc, c) => acc + c.score, 0);
  const maxScore = 100;
  const percentage = Math.round((score / maxScore) * 100);
  const passed = percentage >= 70;

  return {
    score,
    maxScore,
    percentage,
    passed,
    feedback: passed
      ? 'Great work! You demonstrated solid command-line fluency and organized a clean, standard Linux project structure.'
      : 'Good start. Ensure you demonstrate directory creation, file copying/renaming, and verification listing.',
    criteriaScores,
  };
}

// Evaluate Day 3 Assignment: Service Incident Diagnostic Report
export function evaluateDay3Assignment(submission: any): AssignmentEvaluationResult {
  if (submission?.missionChoices) {
    return evaluateMissionSubmission(DEVOPS_DAY_3_MISSION, submission.missionChoices);
  }

  const criteriaScores: Array<{ criterion: string; score: number; maxScore: number; comment: string }> = [];

  // Problem Summary & Evidence (Max: 25)
  const sumSpam = isGibberishOrKeyboardMash(submission.problemSummary);
  const eviSpam = isGibberishOrKeyboardMash(submission.relevantEvidence);

  const sumLower = submission.problemSummary.toLowerCase();
  const eviLower = submission.relevantEvidence.toLowerCase();

  const hasIncidentContext = sumLower.includes('502') || sumLower.includes('bad gateway') ||
                            sumLower.includes('bootstrap') || sumLower.includes('fail') ||
                            sumLower.includes('crash') || sumLower.includes('unreachable') || sumLower.includes('incident');

  const hasConcreteEvidence = eviLower.includes('eacces') || eviLower.includes('permission denied') ||
                             eviLower.includes('config') || eviLower.includes('nodeapp') ||
                             eviLower.includes('root') || eviLower.includes('1002') ||
                             eviLower.includes('1420') || eviLower.includes('log') || eviLower.includes('error');

  if (sumSpam || eviSpam || !hasIncidentContext) {
    criteriaScores.push({
      criterion: 'Symptom Definition & Evidence Gathering',
      score: 0,
      maxScore: 25,
      comment: 'Submission lacks incident context or contains random text. Cite the observed service failure (HTTP 502 / bootstrap failure) and specific log error traces (EACCES / permission denied).',
    });
  } else if (hasIncidentContext && hasConcreteEvidence && submission.problemSummary.trim().split(/\s+/).length >= 10 && submission.relevantEvidence.trim().split(/\s+/).length >= 10) {
    criteriaScores.push({
      criterion: 'Symptom Definition & Evidence Gathering',
      score: 25,
      maxScore: 25,
      comment: 'Cites specific log timestamps, error codes (EACCES / HTTP 502), and process statuses.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Symptom Definition & Evidence Gathering',
      score: 12,
      maxScore: 25,
      comment: 'Include exact log lines and evidence (such as EACCES permission denied on config) rather than general summaries.',
    });
  }

  // Root Cause (Max: 25)
  const rcSpam = isGibberishOrKeyboardMash(submission.likelyRootCause);
  const rc = submission.likelyRootCause.toLowerCase();
  const hasRootCauseConcepts =
    (rc.includes('permission') || rc.includes('ownership') || rc.includes('eacces') || rc.includes('access')) &&
    (rc.includes('root') || rc.includes('node') || rc.includes('user') || rc.includes('service account') || rc.includes('config') || rc.includes('read'));

  if (rcSpam || !hasRootCauseConcepts) {
    criteriaScores.push({
      criterion: 'Root-Cause Analysis (5-Whys)',
      score: 0,
      maxScore: 25,
      comment: 'Submission lacks root cause analysis. Identify the file permission / ownership mismatch between the root-created config file and the unprivileged node service user.',
    });
  } else if (submission.likelyRootCause.trim().split(/\s+/).length >= 12) {
    criteriaScores.push({
      criterion: 'Root-Cause Analysis (5-Whys)',
      score: 25,
      maxScore: 25,
      comment: 'Accurately identifies file permission/ownership restriction on the configuration file as the root cause.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Root-Cause Analysis (5-Whys)',
      score: 12,
      maxScore: 25,
      comment: 'Review the log output to determine why the bootstrap loader failed (e.g. unprivileged service user unable to read root-owned file).',
    });
  }

  // Proposed Correction & Least Privilege (Max: 25)
  const corrSpam = isGibberishOrKeyboardMash(submission.proposedCorrection);
  const corr = submission.proposedCorrection.toLowerCase();

  if (corr.includes('777')) {
    criteriaScores.push({
      criterion: 'Safe Remediation & Least Privilege',
      score: 5,
      maxScore: 25,
      comment: 'DANGER: Using chmod 777 is an unacceptable security anti-pattern! It grants universal write access to sensitive credentials. Use chown with chmod 644/640 instead.',
    });
  } else if (corrSpam) {
    criteriaScores.push({
      criterion: 'Safe Remediation & Least Privilege',
      score: 0,
      maxScore: 25,
      comment: 'Submission lacks safe remediation commands. Specify the exact Linux commands (such as chmod 644/640 or chown nodejs:nodejs) respecting the Principle of Least Privilege.',
    });
  } else if (corr.includes('chmod') || corr.includes('chown') || corr.includes('644') || corr.includes('640') || corr.includes('755')) {
    criteriaScores.push({
      criterion: 'Safe Remediation & Least Privilege',
      score: 25,
      maxScore: 25,
      comment: 'Applies safe permission correction (chmod 644/640 / chown) respecting the Principle of Least Privilege.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Safe Remediation & Least Privilege',
      score: 10,
      maxScore: 25,
      comment: 'Specify the exact Linux command to adjust file permissions safely (e.g. chmod 644 and chown nodeapp:nodeapp).',
    });
  }

  // Verification & Prevention (Max: 25)
  const verSpam = isGibberishOrKeyboardMash(submission.verificationStep);
  const prevSpam = isGibberishOrKeyboardMash(submission.preventionRecommendation);
  const verLower = submission.verificationStep.toLowerCase();
  const prevLower = submission.preventionRecommendation.toLowerCase();

  const hasVerification = verLower.includes('curl') || verLower.includes('systemctl') ||
                          verLower.includes('restart') || verLower.includes('status') ||
                          verLower.includes('active') || verLower.includes('health') || verLower.includes('test');

  const hasPrevention = prevLower.includes('pipeline') || prevLower.includes('ci') ||
                        prevLower.includes('ansible') || prevLower.includes('docker') ||
                        prevLower.includes('immutable') || prevLower.includes('lint') ||
                        prevLower.includes('permission') || prevLower.includes('automated') || prevLower.includes('iac');

  if (verSpam || prevSpam || (!hasVerification && !hasPrevention)) {
    criteriaScores.push({
      criterion: 'Verification Testing & Pipeline Prevention',
      score: 0,
      maxScore: 25,
      comment: 'Submission lacks verification and prevention steps. Detail how you verify service recovery (e.g. systemctl status, curl healthcheck) and prevent recurrence in CI/CD.',
    });
  } else if (hasVerification && hasPrevention && submission.verificationStep.trim().split(/\s+/).length >= 10 && submission.preventionRecommendation.trim().split(/\s+/).length >= 10) {
    criteriaScores.push({
      criterion: 'Verification Testing & Pipeline Prevention',
      score: 25,
      maxScore: 25,
      comment: 'Includes active endpoint verification (curl/systemctl) and preventative pipeline checks.',
    });
  } else {
    criteriaScores.push({
      criterion: 'Verification Testing & Pipeline Prevention',
      score: 12,
      maxScore: 25,
      comment: 'Ensure you specify both how to verify service recovery (curl/systemctl) and how to prevent recurrence in CI/CD.',
    });
  }

  const score = criteriaScores.reduce((acc, c) => acc + c.score, 0);
  const maxScore = 100;
  const percentage = Math.round((score / maxScore) * 100);
  const passed = percentage >= 70;

  return {
    score,
    maxScore,
    percentage,
    passed,
    feedback: passed
      ? 'Excellent incident report! You gathered concrete evidence, identified the permission root cause, avoided chmod 777, and established strong preventative safeguards.'
      : 'Review the incident logs. Make sure to ground your analysis in concrete error traces and apply least-privilege remediation.',
    criteriaScores,
  };
}
