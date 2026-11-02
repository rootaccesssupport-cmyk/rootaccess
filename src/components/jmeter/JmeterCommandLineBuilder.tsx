import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check } from 'lucide-react';

export const JmeterCommandLineBuilder: React.FC = () => {
  const [testPlanPath, setTestPlanPath] = useState('tests/ecommerce_load_v1.jmx');
  const [resultsLogPath, setResultsLogPath] = useState('logs/run_results.jtl');
  const [reportDir, setReportDir] = useState('reports/run_2026/');
  const [isNonGui, setIsNonGui] = useState(true);
  const [generateReport, setGenerateReport] = useState(true);
  const [customThreads, setCustomThreads] = useState(50);
  const [hasCopied, setHasCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[] | null>(null);

  // Construct CLI string
  let commandParts = ['jmeter'];
  if (isNonGui) commandParts.push('-n');
  commandParts.push('-t', testPlanPath);
  commandParts.push('-l', resultsLogPath);
  if (generateReport) {
    commandParts.push('-e');
    commandParts.push('-o', reportDir);
  }
  if (customThreads > 0) {
    commandParts.push(`-Jthreads=${customThreads}`);
  }

  const fullCommand = commandParts.join(' ');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCommand);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTerminalOutput([
      'Executing: ' + fullCommand,
      'Creating summariser <summary>',
      'Created the tree successfully using tests/ecommerce_load_v1.jmx',
      'Starting standalone test @ Mon Nov 02 21:40:00 IST 2026',
      'Waiting for possible Shutdown/StopTestNow/HeapDump/DumpJavaThreads threshold on port 4445',
      `summary +     150 in 00:00:05 =   30.0/s Avg:   180 Min:    45 Max:   620 Err:     0 (0.00%)`,
      `summary +     420 in 00:00:15 =   28.0/s Avg:   240 Min:    52 Max:  1420 Err:     2 (0.48%)`,
      `summary =     570 in 00:00:20 =   28.5/s Avg:   224 Min:    45 Max:  1420 Err:     2 (0.35%)`,
      'Tidying up ...    @ Mon Nov 02 21:40:20 IST 2026',
      '... end of run',
      'Generating Dashboard in reports/run_2026/',
      'Dashboard generated successfully! Open reports/run_2026/index.html to view interactive report.',
    ]);
    setTimeout(() => {
      setIsExecuting(false);
    }, 800);
  };

  const handleReset = () => {
    setTestPlanPath('tests/ecommerce_load_v1.jmx');
    setResultsLogPath('logs/run_results.jtl');
    setReportDir('reports/run_2026/');
    setIsNonGui(true);
    setGenerateReport(true);
    setCustomThreads(50);
    setTerminalOutput(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Interactive Lab 9
            </span>
            <span className="text-xs text-slate-400">Headless Execution</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Production JMeter CLI Command Constructor
          </h3>
          <p className="text-xs text-slate-400">
            Construct, validate, and simulate headless JMeter execution and HTML dashboard generation.
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
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-rose-900/40 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-white ${isExecuting ? 'animate-pulse' : ''}`} />
            <span>{isExecuting ? 'Running Headless...' : 'Simulate CLI Execution'}</span>
          </button>
        </div>
      </div>

      {/* Generated Command Box */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-2 font-mono">
            <Terminal className="w-4 h-4 text-rose-400" />
            <span>Generated Command:</span>
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            {hasCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-xs">Copy Command</span>
              </>
            )}
          </button>
        </div>

        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto select-all">
          {fullCommand}
        </div>
      </div>

      {/* Parameter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <label className="font-semibold text-slate-300 block">
            -t (Test Plan File .jmx)
          </label>
          <input
            type="text"
            value={testPlanPath}
            onChange={(e) => setTestPlanPath(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
          />
          <p className="text-[10px] text-slate-500">Path to your input test plan file.</p>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <label className="font-semibold text-slate-300 block">
            -l (Results JTL File)
          </label>
          <input
            type="text"
            value={resultsLogPath}
            onChange={(e) => setResultsLogPath(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
          />
          <p className="text-[10px] text-slate-500">Stores raw metrics without GUI overhead.</p>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <label className="font-semibold text-slate-300 block">
            -o (HTML Report Folder)
          </label>
          <input
            type="text"
            value={reportDir}
            onChange={(e) => setReportDir(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
          />
          <p className="text-[10px] text-slate-500">Must be empty or non-existent!</p>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <label className="font-semibold text-slate-300 block">
            -J (Dynamic Thread Override)
          </label>
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400">-Jthreads=</span>
            <input
              type="number"
              min="1"
              max="500"
              value={customThreads}
              onChange={(e) => setCustomThreads(Number(e.target.value))}
              className="w-24 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg font-mono text-white"
            />
          </div>
          <p className="text-[10px] text-slate-500">Overrides `${'{__P(threads)}'}` in plan.</p>
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="font-semibold text-slate-300">-n (Non-GUI Mode)</div>
            <div className="text-[10px] text-slate-500">Essential for zero GUI overhead</div>
          </div>
          <input
            type="checkbox"
            checked={isNonGui}
            onChange={(e) => setIsNonGui(e.target.checked)}
            className="w-4 h-4 accent-rose-500 rounded"
          />
        </div>

        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="font-semibold text-slate-300">-e (Generate Report)</div>
            <div className="text-[10px] text-slate-500">Auto-builds HTML dashboard</div>
          </div>
          <input
            type="checkbox"
            checked={generateReport}
            onChange={(e) => setGenerateReport(e.target.checked)}
            className="w-4 h-4 accent-rose-500 rounded"
          />
        </div>
      </div>

      {/* Simulated Terminal Output */}
      {terminalOutput && (
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>Simulated Non-GUI Execution Terminal</span>
            </span>
            <span>JMeter 5.6.3 Engine</span>
          </div>

          <div className="p-3 bg-black rounded-lg font-mono text-xs text-slate-300 space-y-1 overflow-x-auto max-h-56 overflow-y-auto">
            {terminalOutput.map((line, i) => (
              <div key={i} className={line.includes('Err:     0') ? 'text-emerald-400' : line.includes('Dashboard generated') ? 'text-sky-300 font-bold' : ''}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
