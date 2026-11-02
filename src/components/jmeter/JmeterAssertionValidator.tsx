import React, { useState } from 'react';
import { RotateCcw, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

export const JmeterAssertionValidator: React.FC = () => {
  const [expectedCode, setExpectedCode] = useState('200');
  const [expectedSubstring, setExpectedSubstring] = useState('"status":"CONFIRMED"');
  const [maxDurationMs, setMaxDurationMs] = useState(350);
  const [selectedScenario, setSelectedScenario] = useState<'valid' | 'body_error' | 'slow_breach'>('valid');

  // Three pre-configured test responses
  const scenarios = {
    valid: {
      name: 'Scenario A: Normal & Fast (Passes All)',
      statusCode: 200,
      durationMs: 140,
      body: '{\n  "orderId": "ORD-99120",\n  "status": "CONFIRMED",\n  "total": 129.50,\n  "itemsCount": 2\n}',
    },
    body_error: {
      name: 'Scenario B: Fast but Error JSON (Fails Body Assertion)',
      statusCode: 200,
      durationMs: 120,
      body: '{\n  "orderId": null,\n  "status": "OUT_OF_STOCK",\n  "error": "Inventory depleted during lock"\n}',
    },
    slow_breach: {
      name: 'Scenario C: Valid Body but Slow (Fails Duration Assertion)',
      statusCode: 200,
      durationMs: 620,
      body: '{\n  "orderId": "ORD-99121",\n  "status": "CONFIRMED",\n  "total": 89.00,\n  "itemsCount": 1\n}',
    },
  };

  const activeSample = scenarios[selectedScenario];

  // Evaluation logic
  const isCodePassed = String(activeSample.statusCode) === expectedCode.trim();
  const isBodyPassed = activeSample.body.includes(expectedSubstring.trim());
  const isDurationPassed = activeSample.durationMs <= maxDurationMs;
  const isOverallPassed = isCodePassed && isBodyPassed && isDurationPassed;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Interactive Lab 4
            </span>
            <span className="text-xs text-slate-400">Assertion Engine</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Response &amp; Duration Assertion Validator
          </h3>
          <p className="text-xs text-slate-400">
            Configure multi-point validation rules and test them against valid, malformed, and slow response samples.
          </p>
        </div>

        <button
          onClick={() => {
            setExpectedCode('200');
            setExpectedSubstring('"status":"CONFIRMED"');
            setMaxDurationMs(350);
            setSelectedScenario('valid');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Rules</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Assertion Rule Builder */}
        <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Configured Assertion Elements</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                1. Response Code Assertion (Equals):
              </label>
              <input
                type="text"
                value={expectedCode}
                onChange={(e) => setExpectedCode(e.target.value)}
                aria-label="Response Code Assertion (Equals)"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                2. Response Body Assertion (Substring / Contains):
              </label>
              <input
                type="text"
                value={expectedSubstring}
                onChange={(e) => setExpectedSubstring(e.target.value)}
                aria-label="Response Body Assertion (Substring / Contains)"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                3. Duration Assertion Threshold (Max Milliseconds):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="50"
                  max="5000"
                  step="50"
                  value={maxDurationMs}
                  onChange={(e) => setMaxDurationMs(Number(e.target.value))}
                  aria-label="Duration Assertion Threshold (Max Milliseconds)"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
                />
                <span className="text-xs font-mono text-slate-400">ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Scenario Tester */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">Select Test Response Sample:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedScenario('valid')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedScenario === 'valid'
                    ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Scenario A</div>
                <div className="text-[10px] text-slate-500">200 OK • 140ms</div>
              </button>

              <button
                onClick={() => setSelectedScenario('body_error')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedScenario === 'body_error'
                    ? 'border-amber-500/50 bg-amber-950/20 text-amber-300'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Scenario B</div>
                <div className="text-[10px] text-slate-500">200 OK • Out of Stock</div>
              </button>

              <button
                onClick={() => setSelectedScenario('slow_breach')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedScenario === 'slow_breach'
                    ? 'border-rose-500/50 bg-rose-950/20 text-rose-300'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold">Scenario C</div>
                <div className="text-[10px] text-slate-500">200 OK • 620ms (Slow)</div>
              </button>
            </div>
          </div>

          {/* Active Sample Inspector */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-300">
                HTTP {activeSample.statusCode} &bull; Latency: {activeSample.durationMs}ms
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                  isOverallPassed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {isOverallPassed ? 'SAMPLE PASSED' : 'SAMPLE FAILED'}
              </span>
            </div>

            <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800">
              {activeSample.body}
            </pre>

            {/* Assertion Checklist */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                {isCodePassed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>Response Code Assertion: {isCodePassed ? 'PASSED (200 == 200)' : `FAILED (Expected ${expectedCode})`}</span>
              </div>

              <div className="flex items-center gap-2">
                {isBodyPassed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>Body Content Assertion: {isBodyPassed ? 'PASSED (Contains substring)' : `FAILED (Missing ${expectedSubstring})`}</span>
              </div>

              <div className="flex items-center gap-2">
                {isDurationPassed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>Duration Assertion: {isDurationPassed ? `PASSED (${activeSample.durationMs}ms <= ${maxDurationMs}ms)` : `FAILED (${activeSample.durationMs}ms exceeded ${maxDurationMs}ms limit)`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
