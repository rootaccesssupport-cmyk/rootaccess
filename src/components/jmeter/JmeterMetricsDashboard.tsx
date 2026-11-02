import React, { useState } from 'react';
import { Filter, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const JmeterMetricsDashboard: React.FC = () => {
  const [filterThreshold, setFilterThreshold] = useState<number>(0);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>('POST /api/v1/orders/checkout');

  // Benchmark dataset across 4 endpoints (1,000 total requests)
  const reportData = [
    {
      label: 'GET /api/v1/home',
      samples: 300,
      average: 85,
      median: 75,
      p90: 120,
      p95: 140,
      p99: 190,
      min: 42,
      max: 240,
      errorPct: 0.0,
      throughput: 84.5,
      kbPerSec: 142.0,
    },
    {
      label: 'GET /api/v1/catalog/search',
      samples: 350,
      average: 165,
      median: 140,
      p90: 240,
      p95: 290,
      p99: 410,
      min: 88,
      max: 520,
      errorPct: 0.0,
      throughput: 68.2,
      kbPerSec: 210.5,
    },
    {
      label: 'POST /api/v1/cart/items',
      samples: 200,
      average: 195,
      median: 180,
      p90: 290,
      p95: 340,
      p99: 490,
      min: 110,
      max: 680,
      errorPct: 0.5,
      throughput: 42.1,
      kbPerSec: 54.2,
    },
    {
      label: 'POST /api/v1/orders/checkout',
      samples: 150,
      average: 420,
      median: 210,
      p90: 1850,
      p95: 3850,
      p99: 5200,
      min: 135,
      max: 6100,
      errorPct: 2.8,
      throughput: 18.4,
      kbPerSec: 24.8,
    },
  ];

  const filteredData = reportData.filter((r) => r.p95 >= filterThreshold);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Interactive Lab 8
            </span>
            <span className="text-xs text-slate-400">JMeter Aggregate Report</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Aggregate Report &amp; Bottleneck Inspector
          </h3>
          <p className="text-xs text-slate-400">
            Analyze tabular benchmark percentiles, filter outlier latencies, and isolate performance bottlenecks.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">Filter p95 &gt;:</span>
          <select
            value={filterThreshold}
            onChange={(e) => setFilterThreshold(Number(e.target.value))}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none"
          >
            <option value={0}>All Endpoints (0ms)</option>
            <option value={300}>p95 &gt; 300ms</option>
            <option value={1000}>p95 &gt; 1,000ms (SLA Breach)</option>
          </select>
        </div>
      </div>

      {/* Aggregate Report Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400">
              <th className="py-3 px-3">Sampler Label</th>
              <th className="py-3 px-2 text-right"># Samples</th>
              <th className="py-3 px-2 text-right">Average</th>
              <th className="py-3 px-2 text-right">Median</th>
              <th className="py-3 px-2 text-right">90% Line</th>
              <th className="py-3 px-2 text-right font-bold text-rose-400">95% Line</th>
              <th className="py-3 px-2 text-right">99% Line</th>
              <th className="py-3 px-2 text-right">Error %</th>
              <th className="py-3 px-3 text-right">Throughput</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredData.map((row, i) => {
              const isBottleneck = row.p95 > 1500;
              const isSelected = selectedEndpoint === row.label;

              return (
                <tr
                  key={i}
                  onClick={() => setSelectedEndpoint(row.label)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-rose-500/10'
                      : 'hover:bg-slate-900/50'
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                    {isBottleneck && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    <span>{row.label}</span>
                  </td>
                  <td className="py-3 px-2 text-right text-slate-400">{row.samples}</td>
                  <td className="py-3 px-2 text-right">{row.average} ms</td>
                  <td className="py-3 px-2 text-right">{row.median} ms</td>
                  <td className="py-3 px-2 text-right">{row.p90} ms</td>
                  <td className={`py-3 px-2 text-right font-bold ${row.p95 > 1000 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {row.p95} ms
                  </td>
                  <td className="py-3 px-2 text-right">{row.p99} ms</td>
                  <td className={`py-3 px-2 text-right font-bold ${row.errorPct > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {row.errorPct}%
                  </td>
                  <td className="py-3 px-3 text-right text-sky-400">{row.throughput} /s</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottleneck Diagnostic Card */}
      {selectedEndpoint === 'POST /api/v1/orders/checkout' ? (
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-rose-300 font-bold">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Bottleneck Detected: POST /api/v1/orders/checkout</span>
          </div>

          <div className="text-slate-300 space-y-1.5 leading-relaxed">
            <p>
              <strong className="text-white">Why Average (420ms) is Deceptive:</strong> While the arithmetic average looks reasonable, the <strong>95th percentile spikes to 3,850ms</strong> and maximum latency hits 6,100ms with a 2.8% error rate.
            </p>
            <p>
              <strong className="text-white">Diagnosed Root Cause:</strong> Database row locks on the inventory table coupled with synchronous payment gateway calls serialize incoming checkout transactions, causing thread backlogs in the connection pool.
            </p>
          </div>

          <div className="pt-2 border-t border-rose-500/20 flex flex-wrap gap-2 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
              SLA Threshold: 1,000ms (BREACHED)
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
              Affected Users: 5% of all buyers
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
              Error Type: HTTP 504 Gateway Timeout
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {selectedEndpoint} is healthy: 95th percentile latency is under SLA limits with 0% error rate.
          </span>
        </div>
      )}
    </div>
  );
};
