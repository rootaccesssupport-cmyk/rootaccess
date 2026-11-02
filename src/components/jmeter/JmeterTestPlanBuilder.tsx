import React, { useState } from 'react';
import { Play, RotateCcw, Plus, Trash2, FolderTree, Cpu, Globe, BarChart2, CheckCircle2, AlertCircle } from 'lucide-react';

export const JmeterTestPlanBuilder: React.FC = () => {
  const [testPlanName, setTestPlanName] = useState('RootAccess_ECommerce_Plan');
  const [hasThreadGroup, setHasThreadGroup] = useState(true);
  const [threads, setThreads] = useState<number>(10);
  const [rampUp, setRampUp] = useState<number>(20);
  const [loops, setLoops] = useState<number>(2);

  const [hasHttpSampler, setHasHttpSampler] = useState(true);
  const [samplerName, setSamplerName] = useState('GET_Product_Health');
  const [samplerPath, setSamplerPath] = useState('/api/v1/health');
  const [hasListener, setHasListener] = useState(true);

  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    messages: string[];
    totalIterations: number;
    threadIntervalSec: number;
  } | null>(null);

  const handleValidate = () => {
    const messages: string[] = [];
    let valid = true;

    if (!hasThreadGroup) {
      valid = false;
      messages.push('Missing Thread Group: A Test Plan must contain at least one Thread Group to simulate users.');
    }
    if (threads <= 0) {
      valid = false;
      messages.push('Invalid Thread Count: Must have at least 1 virtual user.');
    }
    if (rampUp < 0) {
      valid = false;
      messages.push('Invalid Ramp-Up: Ramp-up period cannot be negative.');
    }
    if (loops <= 0) {
      valid = false;
      messages.push('Invalid Loop Count: Loop iterations must be 1 or greater.');
    }
    if (!hasHttpSampler) {
      valid = false;
      messages.push('Missing Sampler: The Thread Group has no work to perform. Add an HTTP Request sampler.');
    }
    if (!samplerPath.startsWith('/')) {
      valid = false;
      messages.push('Invalid Sampler Path: Path must begin with a forward slash (e.g. /api/v1/health).');
    }
    if (!hasListener) {
      messages.push('Warning: No listener attached. Test will execute headlessly without rendering results.');
    }

    const totalIterations = threads * loops;
    const threadIntervalSec = threads > 0 ? Number((rampUp / threads).toFixed(2)) : 0;

    if (valid) {
      messages.push('✓ Test Plan structure is valid and ready for execution.');
    }

    setValidationResult({ valid, messages, totalIterations, threadIntervalSec });
  };

  const handleReset = () => {
    setTestPlanName('RootAccess_ECommerce_Plan');
    setHasThreadGroup(true);
    setThreads(10);
    setRampUp(20);
    setLoops(2);
    setHasHttpSampler(true);
    setSamplerName('GET_Product_Health');
    setSamplerPath('/api/v1/health');
    setHasListener(true);
    setValidationResult(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Interactive Lab 2
            </span>
            <span className="text-xs text-slate-400">JMeter Tree Architect</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Visual JMeter Test Plan Tree Builder
          </h3>
          <p className="text-xs text-slate-400">
            Configure the hierarchical element tree, set virtual user ramp-up schedules, and validate execution flow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleValidate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-rose-900/40 transition-all hover:scale-[1.02]"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Validate &amp; Inspect Plan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Tree View */}
        <div className="lg:col-span-5 bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-rose-400" />
            <span>JMeter Test Plan Tree</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {/* Root Node */}
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="text-rose-400 font-bold">📋</span>
                <span className="font-bold">{testPlanName}</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase">Test Plan</span>
            </div>

            {/* Thread Group Node */}
            {hasThreadGroup ? (
              <div className="ml-5 pl-3 border-l-2 border-slate-800 space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-900/90 border border-indigo-500/30 flex items-center justify-between group">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <span>Thread Group ({threads} users)</span>
                  </div>
                  <button
                    onClick={() => setHasThreadGroup(false)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                    title="Remove Thread Group"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* HTTP Sampler Node */}
                {hasHttpSampler ? (
                  <div className="ml-5 pl-3 border-l-2 border-slate-800">
                    <div className="p-2 rounded-lg bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between group">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{samplerName}</span>
                      </div>
                      <button
                        onClick={() => setHasHttpSampler(false)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                        title="Remove Sampler"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="ml-5 pl-3">
                    <button
                      onClick={() => setHasHttpSampler(true)}
                      className="w-full py-1.5 px-2 rounded border border-dashed border-slate-700 hover:border-emerald-500/50 text-[11px] text-slate-400 hover:text-emerald-400 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add HTTP Sampler</span>
                    </button>
                  </div>
                )}

                {/* Listener Node */}
                {hasListener ? (
                  <div className="ml-5 pl-3 border-l-2 border-slate-800">
                    <div className="p-2 rounded-lg bg-slate-900/80 border border-sky-500/30 flex items-center justify-between group">
                      <div className="flex items-center gap-2 text-sky-300">
                        <BarChart2 className="w-3.5 h-3.5 text-sky-400" />
                        <span>View Results Tree (Listener)</span>
                      </div>
                      <button
                        onClick={() => setHasListener(false)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
                        title="Remove Listener"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="ml-5 pl-3">
                    <button
                      onClick={() => setHasListener(true)}
                      className="w-full py-1.5 px-2 rounded border border-dashed border-slate-700 hover:border-sky-500/50 text-[11px] text-slate-400 hover:text-sky-400 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Results Listener</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="ml-5">
                <button
                  onClick={() => setHasThreadGroup(true)}
                  className="w-full py-2 px-3 rounded-lg border border-dashed border-slate-700 hover:border-indigo-500/50 text-xs text-slate-400 hover:text-indigo-400 flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Thread Group</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Configuration Inspector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-4">
            <div className="text-xs font-semibold text-slate-300">Thread Group Properties</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Number of Threads (Users)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={threads}
                  onChange={(e) => setThreads(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Ramp-Up Period (seconds)</label>
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={rampUp}
                  onChange={(e) => setRampUp(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Loop Count (Iterations)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={loops}
                  onChange={(e) => setLoops(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Thread Launch Interval:</span>
              <span className="text-indigo-400 font-bold">
                {threads > 0 ? (rampUp / threads).toFixed(2) : 0} seconds / thread
              </span>
            </div>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-300">HTTP Request Sampler Settings</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Sampler Name</label>
                <input
                  type="text"
                  value={samplerName}
                  onChange={(e) => setSamplerName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Resource Path</label>
                <input
                  type="text"
                  value={samplerPath}
                  onChange={(e) => setSamplerPath(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Validation Feedback */}
          {validationResult && (
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                validationResult.valid
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                {validationResult.valid ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Plan Verification Passed</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>Plan Verification Failed</span>
                  </>
                )}
              </div>

              <ul className="text-xs space-y-1 list-disc list-inside">
                {validationResult.messages.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>

              {validationResult.valid && (
                <div className="pt-2 border-t border-emerald-500/20 grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div>Total Requests: <span className="font-bold text-white">{validationResult.totalIterations}</span></div>
                  <div>Startup Cadence: <span className="font-bold text-white">{validationResult.threadIntervalSec}s</span></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
