import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, FileText } from 'lucide-react';

export const JmeterCsvParameterizer: React.FC = () => {
  const [variableNames, setVariableNames] = useState('customerId,searchKeyword,device');
  const [urlPath, setUrlPath] = useState('/api/v1/search?q=${searchKeyword}&device=${device}');

  // Sample CSV Dataset (fictional search queries)
  const csvRows = [
    { customerId: 'CUST-1001', searchKeyword: 'mechanical keyboard', device: 'desktop' },
    { customerId: 'CUST-1002', searchKeyword: 'wireless mouse', device: 'mobile' },
    { customerId: 'CUST-1003', searchKeyword: '4k gaming monitor', device: 'desktop' },
    { customerId: 'CUST-1004', searchKeyword: 'usb-c hub 10gbps', device: 'tablet' },
    { customerId: 'CUST-1005', searchKeyword: 'ergonomic chair', device: 'mobile' },
  ];

  const [hasRun, setHasRun] = useState(false);

  const parsedVars = variableNames.split(',').map((v) => v.trim());

  // Check if variables are properly bound
  const hasCustVar = parsedVars.includes('customerId');
  const hasKeywordVar = parsedVars.includes('searchKeyword');
  const hasDeviceVar = parsedVars.includes('device');
  const isValidMapping = hasCustVar && hasKeywordVar && hasDeviceVar;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Interactive Lab 5
            </span>
            <span className="text-xs text-slate-400">CSV Data Set Config</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Data-Driven CSV Parameterization Lab
          </h3>
          <p className="text-xs text-slate-400">
            Map external CSV data into JMeter variables and inject unique parameters into every virtual user request.
          </p>
        </div>

        <button
          onClick={() => {
            setVariableNames('customerId,searchKeyword,device');
            setUrlPath('/api/v1/search?q=${searchKeyword}&device=${device}');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* CSV Dataset View */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-400" />
            <span>data/customer_searches.csv (Sample Input File)</span>
          </span>
          <span className="text-[11px] font-mono text-slate-500">5 rows • Comma-delimited</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-3">Row #</th>
                <th className="py-2 px-3">Column 1 (customerId)</th>
                <th className="py-2 px-3">Column 2 (searchKeyword)</th>
                <th className="py-2 px-3">Column 3 (device)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              {csvRows.map((r, i) => (
                <tr key={i} className="hover:bg-slate-900/40">
                  <td className="py-2 px-3 text-slate-500">#{i + 1}</td>
                  <td className="py-2 px-3 text-rose-400">{r.customerId}</td>
                  <td className="py-2 px-3 text-sky-400">&quot;{r.searchKeyword}&quot;</td>
                  <td className="py-2 px-3 text-emerald-400">{r.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            CSV Data Set Config: Variable Names (comma-delimited)
          </label>
          <input
            type="text"
            value={variableNames}
            onChange={(e) => setVariableNames(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
          />
          <p className="text-[11px] text-slate-500">
            Maps column 1, 2, and 3 into JMeter variables: ${'{customerId}'}, ${'{searchKeyword}'}, ${'{device}'}.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            HTTP Request Sampler Path
          </label>
          <input
            type="text"
            value={urlPath}
            onChange={(e) => setUrlPath(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
          />
          <p className="text-[11px] text-slate-500">
            Use ${'{varName}'} syntax to inject the active row&apos;s data into the query string.
          </p>
        </div>
      </div>

      {/* Live Simulation Execution */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-300">
            Multi-Thread Execution Preview (How Threads Consume Data):
          </div>
          <button
            onClick={() => setHasRun(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide shadow-md transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Simulate 3 Concurrent Threads</span>
          </button>
        </div>

        <div className="space-y-2">
          {[0, 1, 2].map((idx) => {
            const row = csvRows[idx];
            // Resolve path template
            let resolvedPath = urlPath;
            if (hasCustVar) resolvedPath = resolvedPath.split('${customerId}').join(row.customerId);
            if (hasKeywordVar) resolvedPath = resolvedPath.split('${searchKeyword}').join(encodeURIComponent(row.searchKeyword));
            if (hasDeviceVar) resolvedPath = resolvedPath.split('${device}').join(row.device);

            return (
              <div
                key={idx}
                className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-bold">
                    Thread #{idx + 1}
                  </span>
                  <span className="text-slate-400">Row {idx + 1}:</span>
                  <span className="text-slate-200">{resolvedPath}</span>
                </div>

                <div className="text-[11px] text-slate-500">
                  Header: X-Customer-ID: <span className="text-rose-400">{hasCustVar ? row.customerId : '${customerId}'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {hasRun && isValidMapping && (
          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              ✓ Excellent! All 3 virtual users consumed distinct customer IDs and search queries without cache or primary key conflicts.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
