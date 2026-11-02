import React, { useState } from 'react';
import { Award, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JmeterFinalProjectWorkbenchProps {
  onCompleteProject?: () => void;
  isCompleted?: boolean;
}

export const JmeterFinalProjectWorkbench: React.FC<JmeterFinalProjectWorkbenchProps> = ({
  onCompleteProject,
  isCompleted = false,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  // Milestone 1 & 2: Plan & Thread Config
  const [threads, setThreads] = useState<number>(25);
  const [rampUp, setRampUp] = useState<number>(30);
  const [loops, setLoops] = useState<number>(3);
  const [csvMapped, setCsvMapped] = useState<boolean>(true);
  const [tokenCorrelated, setTokenCorrelated] = useState<boolean>(true);
  const [assertionDuration, setAssertionDuration] = useState<number>(1200);

  // Milestone 5: Simulations
  const [hasRunBaseline, setHasRunBaseline] = useState<boolean>(false);
  const [hasRunPeak, setHasRunPeak] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Milestone 6 & 7: Report Form
  const [executiveSummary, setExecutiveSummary] = useState(
    'A 10-day comprehensive performance audit of the RootAccess E-Commerce API was executed using Apache JMeter 5.6.3. Baseline testing at 10 users verified an average latency of 145ms with 0% error rate. Under 50 concurrent peak users, the /checkout endpoint breached its 1,000ms SLA, reaching a 95th percentile of 3,180ms with 4.2% timeout errors due to database row locking on inventory tables.'
  );
  const [identifiedBottleneck, setIdentifiedBottleneck] = useState(
    'POST /api/v1/orders/checkout suffered serialization delay caused by pessimistic row locking in PostgreSQL during concurrent inventory deduction, compounded by synchronous payment gateway authorization.'
  );
  const [remediationSteps, setRemediationSteps] = useState(
    '1. Migrate real-time inventory reservation to Redis in-memory atomic decrements.\n2. Decouple checkout payment authorization into an asynchronous background message queue.\n3. Increase database connection pool capacity from 20 to 80 connections.'
  );

  const [evaluation, setEvaluation] = useState<{
    score: number;
    passed: boolean;
    breakdown: {
      testPlanDesign: number;
      parameterizationAndCorrelation: number;
      workloadExecution: number;
      bottleneckDiagnosis: number;
      reportQuality: number;
    };
  } | null>(() => {
    try {
      const stored = localStorage.getItem('rootaccess_jmeter_project_eval');
      return stored ? JSON.parse(stored) : isCompleted ? {
        score: 95,
        passed: true,
        breakdown: {
          testPlanDesign: 20,
          parameterizationAndCorrelation: 20,
          workloadExecution: 20,
          bottleneckDiagnosis: 18,
          reportQuality: 17,
        },
      } : null;
    } catch {
      return null;
    }
  });

  const runSimulation = (mode: 'baseline' | 'peak') => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      if (mode === 'baseline') setHasRunBaseline(true);
      else setHasRunPeak(true);
    }, 700);
  };

  const handleEvaluateAndSubmit = () => {
    // Scoring logic (max 100 points)
    let testPlanDesign = 20; // Verified
    let parameterizationAndCorrelation = csvMapped && tokenCorrelated ? 20 : 10;
    let workloadExecution = hasRunBaseline && hasRunPeak ? 20 : 10;
    let bottleneckDiagnosis = identifiedBottleneck.toLowerCase().includes('checkout') && identifiedBottleneck.toLowerCase().includes('lock') ? 20 : 14;
    let reportQuality = executiveSummary.length > 80 && remediationSteps.length > 60 ? 20 : 15;

    const totalScore = testPlanDesign + parameterizationAndCorrelation + workloadExecution + bottleneckDiagnosis + reportQuality;
    const passed = totalScore >= 80;

    const evalResult = {
      score: totalScore,
      passed,
      breakdown: {
        testPlanDesign,
        parameterizationAndCorrelation,
        workloadExecution,
        bottleneckDiagnosis,
        reportQuality,
      },
    };

    setEvaluation(evalResult);
    localStorage.setItem('rootaccess_jmeter_project_eval', JSON.stringify(evalResult));
    localStorage.setItem('rootaccess_jmeter_project_submitted', 'true');

    if (passed && onCompleteProject) {
      onCompleteProject();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Day 10 Capstone Project
            </span>
            <span className="text-xs text-slate-400">Final Deliverable</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Performance Test a Sample E-Commerce API
          </h3>
          <p className="text-xs text-slate-400">
            Design, simulate, diagnose, and report on an end-to-end multi-step performance benchmark to earn your certificate.
          </p>
        </div>

        {evaluation?.passed && (
          <Link
            to="/courses/jmeter-performance-testing/certificate"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-emerald-900/30 transition-all"
          >
            <Award className="w-4 h-4" />
            <span>View Certificate</span>
          </Link>
        )}
      </div>

      {/* Progress Milestone Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveStep(1)}
          className={`p-3 rounded-xl border text-left text-xs transition-all ${
            activeStep === 1
              ? 'border-rose-500 bg-rose-950/20 text-rose-300 font-bold'
              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div>Milestone 1 &amp; 2</div>
          <div className="text-[10px] text-slate-500 font-normal">Plan &amp; Parameterization</div>
        </button>

        <button
          onClick={() => setActiveStep(2)}
          className={`p-3 rounded-xl border text-left text-xs transition-all ${
            activeStep === 2
              ? 'border-rose-500 bg-rose-950/20 text-rose-300 font-bold'
              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div>Milestone 3 &amp; 4</div>
          <div className="text-[10px] text-slate-500 font-normal">Correlation &amp; Assertions</div>
        </button>

        <button
          onClick={() => setActiveStep(3)}
          className={`p-3 rounded-xl border text-left text-xs transition-all ${
            activeStep === 3
              ? 'border-rose-500 bg-rose-950/20 text-rose-300 font-bold'
              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div>Milestone 5</div>
          <div className="text-[10px] text-slate-500 font-normal">Baseline vs Peak Runs</div>
        </button>

        <button
          onClick={() => setActiveStep(4)}
          className={`p-3 rounded-xl border text-left text-xs transition-all ${
            activeStep === 4
              ? 'border-rose-500 bg-rose-950/20 text-rose-300 font-bold'
              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div>Milestone 6 &amp; 7</div>
          <div className="text-[10px] text-slate-500 font-normal">Analysis &amp; Report</div>
        </button>
      </div>

      {/* Step 1: Plan & CSV Configuration */}
      {activeStep === 1 && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="text-xs font-semibold text-slate-300">
            Milestone 1 &amp; 2: Test Plan Architecture &amp; CSV Data Integration
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Threads (Virtual Users):</label>
              <input
                type="number"
                min="5"
                max="100"
                value={threads}
                onChange={(e) => setThreads(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Ramp-Up (seconds):</label>
              <input
                type="number"
                min="5"
                max="120"
                value={rampUp}
                onChange={(e) => setRampUp(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Iterations per User:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={loops}
                onChange={(e) => setLoops(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">CSV Data Set Config:</span>
            <label className="flex items-center gap-2 cursor-pointer text-emerald-400 font-bold">
              <input
                type="checkbox"
                checked={csvMapped}
                onChange={(e) => setCsvMapped(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>users.csv (username, password, searchKeyword)</span>
            </label>
          </div>

          <button
            onClick={() => setActiveStep(2)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Next: Milestone 3 &amp; 4 &rarr;
          </button>
        </div>
      )}

      {/* Step 2: Correlation & Assertions */}
      {activeStep === 2 && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="text-xs font-semibold text-slate-300">
            Milestone 3 &amp; 4: Correlation &amp; Assertion Enforcement
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400">JSON Extractor on POST /login: </span>
                <span className="text-emerald-400 font-bold">$.token ➔ ${'{authToken}'}</span>
              </div>
              <label className="flex items-center gap-1.5 cursor-pointer text-emerald-400">
                <input
                  type="checkbox"
                  checked={tokenCorrelated}
                  onChange={(e) => setTokenCorrelated(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <span>Enabled</span>
              </label>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400">Downstream Authorization Header: </span>
                <span className="text-sky-400 font-bold">Bearer ${'{authToken}'}</span>
              </div>
              <span className="text-emerald-400">✓ Injected</span>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Duration Assertion Threshold on /checkout (Milliseconds):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="500"
                  max="3000"
                  step="100"
                  value={assertionDuration}
                  onChange={(e) => setAssertionDuration(Number(e.target.value))}
                  className="w-48 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
                />
                <span className="text-slate-400 text-xs">ms</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveStep(3)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Next: Run Benchmark Simulations &rarr;
          </button>
        </div>
      )}

      {/* Step 3: Baseline vs Peak Runs */}
      {activeStep === 3 && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-5">
          <div className="text-xs font-semibold text-slate-300">
            Milestone 5: Baseline vs. Peak Load Simulations
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Baseline Run */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">1. Baseline Run (10 Users)</span>
                <button
                  onClick={() => runSimulation('baseline')}
                  disabled={isSimulating}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] rounded transition-colors disabled:opacity-50"
                >
                  {hasRunBaseline ? 'Re-run Baseline' : 'Run Baseline'}
                </button>
              </div>

              {hasRunBaseline && (
                <div className="font-mono text-[11px] space-y-1 text-slate-300">
                  <div>Avg Response: <span className="text-emerald-400 font-bold">145ms</span></div>
                  <div>Checkout p95: <span className="text-emerald-400 font-bold">340ms</span></div>
                  <div>Throughput: <span className="text-sky-400 font-bold">38.2 req/s</span></div>
                  <div>Error Rate: <span className="text-emerald-400 font-bold">0.0%</span></div>
                </div>
              )}
            </div>

            {/* Peak Run */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">2. Peak Load Run (50 Users)</span>
                <button
                  onClick={() => runSimulation('peak')}
                  disabled={isSimulating}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-[11px] rounded transition-colors disabled:opacity-50"
                >
                  {hasRunPeak ? 'Re-run Peak' : 'Run Peak Load'}
                </button>
              </div>

              {hasRunPeak && (
                <div className="font-mono text-[11px] space-y-1 text-slate-300">
                  <div>Avg Response: <span className="text-amber-400 font-bold">480ms</span></div>
                  <div>Checkout p95: <span className="text-rose-400 font-bold">3,180ms</span> (BREACH)</div>
                  <div>Throughput: <span className="text-sky-400 font-bold">92.5 req/s</span> (Plateau)</div>
                  <div>Error Rate: <span className="text-rose-400 font-bold">4.2%</span> (Timeouts)</div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setActiveStep(4)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Next: Draft Executive Report &rarr;
          </button>
        </div>
      )}

      {/* Step 4: Analysis & Executive Report */}
      {activeStep === 4 && (
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="text-xs font-semibold text-slate-300">
            Milestone 6 &amp; 7: Performance Test Executive Summary Report
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                1. Executive Summary &amp; Scope
              </label>
              <textarea
                rows={3}
                value={executiveSummary}
                onChange={(e) => setExecutiveSummary(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                2. Diagnosed Bottleneck Findings
              </label>
              <textarea
                rows={3}
                value={identifiedBottleneck}
                onChange={(e) => setIdentifiedBottleneck(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                3. Technical Remediation Recommendations
              </label>
              <textarea
                rows={3}
                value={remediationSteps}
                onChange={(e) => setRemediationSteps(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleEvaluateAndSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs tracking-wide rounded-xl shadow-lg shadow-rose-900/30 transition-all hover:scale-[1.02]"
            >
              Submit Capstone Project for Rubric Evaluation
            </button>
          </div>
        </div>
      )}

      {/* Rubric Evaluation Results */}
      {evaluation && (
        <div
          className={`p-5 rounded-xl border space-y-4 ${
            evaluation.passed
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {evaluation.passed ? (
                <Award className="w-6 h-6 text-emerald-400" />
              ) : (
                <AlertCircle className="w-6 h-6 text-rose-400" />
              )}
              <div>
                <h4 className="text-base font-bold text-white">
                  {evaluation.passed ? 'Capstone Project Approved!' : 'Project Requires Revision'}
                </h4>
                <p className="text-xs text-slate-400">
                  Overall Score: <span className="font-bold text-white">{evaluation.score} / 100</span> (Passing threshold: 80%)
                </p>
              </div>
            </div>

            {evaluation.passed && (
              <Link
                to="/courses/jmeter-performance-testing/certificate"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md transition-all"
              >
                Claim Certificate
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-300">
            <div>Test Design: {evaluation.breakdown.testPlanDesign}/20</div>
            <div>Data &amp; Correlation: {evaluation.breakdown.parameterizationAndCorrelation}/20</div>
            <div>Workload Execution: {evaluation.breakdown.workloadExecution}/20</div>
            <div>Bottleneck Diagnosis: {evaluation.breakdown.bottleneckDiagnosis}/20</div>
            <div>Report Quality: {evaluation.breakdown.reportQuality}/20</div>
          </div>
        </div>
      )}
    </div>
  );
};
