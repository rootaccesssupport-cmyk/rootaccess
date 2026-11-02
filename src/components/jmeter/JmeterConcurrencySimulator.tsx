import React, { useState } from 'react';
import { Play, RotateCcw, Info } from 'lucide-react';

export const JmeterConcurrencySimulator: React.FC = () => {
  const [users, setUsers] = useState<number>(20);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Deterministic calculation of synthetic performance metrics based on concurrency
  // Capacity saturation threshold is 95 users
  const calculateMetrics = (u: number) => {
    let avgLatency: number;
    let p95Latency: number;
    let throughput: number;
    let errorRate: number;

    if (u <= 50) {
      // Linear scaling zone
      avgLatency = Math.round(110 + u * 1.8);
      p95Latency = Math.round(avgLatency * 1.35);
      throughput = Math.round(u * 3.8);
      errorRate = 0.0;
    } else if (u <= 95) {
      // Saturation knee zone
      avgLatency = Math.round(200 + (u - 50) * 4.5);
      p95Latency = Math.round(avgLatency * 1.6);
      throughput = Math.round(190 + (u - 50) * 1.5);
      errorRate = 0.0;
    } else if (u <= 140) {
      // Queueing & contention zone
      avgLatency = Math.round(400 + Math.pow(u - 95, 1.8) * 4.2);
      p95Latency = Math.round(avgLatency * 2.1);
      throughput = Math.round(255 - (u - 95) * 0.4);
      errorRate = Number(((u - 95) * 0.12).toFixed(1));
    } else {
      // Severe degradation & timeout zone
      avgLatency = Math.round(1400 + (u - 140) * 28);
      p95Latency = Math.round(avgLatency * 2.8);
      throughput = Math.round(230 - (u - 140) * 0.8);
      errorRate = Number((5.4 + (u - 140) * 0.25).toFixed(1));
    }

    return { avgLatency, p95Latency, throughput, errorRate };
  };

  const metrics = calculateMetrics(users);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 700);
  };

  const handleReset = () => {
    setUsers(20);
    setIsRunning(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Interactive Lab 1
            </span>
            <span className="text-xs text-slate-400">JMeter 5.6.3 Engine</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Virtual User Concurrency &amp; Latency Explorer
          </h3>
          <p className="text-xs text-slate-400">
            Simulate how increasing thread concurrency influences response time, throughput, and error rates.
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
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-rose-900/40 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-white ${isRunning ? 'animate-pulse' : ''}`} />
            <span>{isRunning ? 'Simulating Traffic...' : 'Run Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Simulator Slider Controls */}
      <div className="space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
        <div className="flex items-center justify-between">
          <label htmlFor="concurrency-slider" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <span>Simulated Virtual Users (Threads):</span>
            <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-mono font-bold text-sm">
              {users} Concurrent Users
            </span>
          </label>
          <span className="text-xs text-slate-400">SLA Target: &lt; 500ms</span>
        </div>

        <input
          id="concurrency-slider"
          aria-label="Simulated Virtual Users (Threads)"
          type="range"
          min="5"
          max="200"
          step="5"
          value={users}
          onChange={(e) => {
            setUsers(Number(e.target.value));
          }}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />

        <div className="flex justify-between text-[11px] font-mono text-slate-500">
          <span>5 Users (Baseline)</span>
          <span>50 Users (Normal Peak)</span>
          <span>100 Users (Knee Threshold)</span>
          <span>150 Users (Saturation)</span>
          <span>200 Users (Stress)</span>
        </div>
      </div>

      {/* Metric Cards Output */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Avg Response Time</div>
          <div className={`text-2xl font-bold font-mono ${metrics.avgLatency > 500 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {metrics.avgLatency} ms
          </div>
          <div className="text-[10px] text-slate-500">Target: &lt; 500ms</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase">95th Percentile (p95)</div>
          <div className={`text-2xl font-bold font-mono ${metrics.p95Latency > 1200 ? 'text-rose-400' : metrics.p95Latency > 600 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {metrics.p95Latency} ms
          </div>
          <div className="text-[10px] text-slate-500">SLA threshold line</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Throughput</div>
          <div className="text-2xl font-bold font-mono text-sky-400">
            {metrics.throughput} <span className="text-xs font-normal text-slate-400">req/s</span>
          </div>
          <div className="text-[10px] text-slate-500">Processed per sec</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Error Rate</div>
          <div className={`text-2xl font-bold font-mono ${metrics.errorRate > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {metrics.errorRate}%
          </div>
          <div className="text-[10px] text-slate-500">HTTP 5xx / Timeouts</div>
        </div>
      </div>

      {/* Visual Saturation Zone Indicator */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Server Health &amp; Operational Zone:</span>
          <span
            className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
              users <= 50
                ? 'bg-emerald-500/20 text-emerald-300'
                : users <= 95
                ? 'bg-sky-500/20 text-sky-300'
                : users <= 140
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-rose-500/20 text-rose-300'
            }`}
          >
            {users <= 50
              ? 'Zone 1: Linear Scaling'
              : users <= 95
              ? 'Zone 2: Optimal Saturation Knee'
              : users <= 140
              ? 'Zone 3: Queue Contention'
              : 'Zone 4: System Overload & Failures'}
          </span>
        </div>

        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
          <div className="bg-emerald-500 h-full" style={{ width: '25%' }} title="Linear Scaling" />
          <div className="bg-sky-500 h-full" style={{ width: '23%' }} title="Optimal Knee" />
          <div className="bg-amber-500 h-full" style={{ width: '22%' }} title="Queue Contention" />
          <div className="bg-rose-500 h-full" style={{ width: '30%' }} title="System Overload" />
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {users <= 50 &&
            'Normal operation: Server threads and connection pools handle incoming requests with low queueing delay. Response time remains fast and predictable.'}
          {users > 50 &&
            users <= 95 &&
            'Approaching capacity limit: CPU utilization reaches ~75%. Throughput continues to rise, but response times begin their upward transition.'}
          {users > 95 &&
            users <= 140 &&
            'Queue saturation: The database connection pool has exhausted available handles. Incoming requests are waiting in TCP socket queues, causing exponential latency increases.'}
          {users > 140 &&
            'Severe degradation: Upstream microservices are timing out. HTTP 504 and 500 errors appear as connections drop.'}
        </p>
      </div>

      {/* Synthetic Disclaimer Badge */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 text-[11px] text-slate-400">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-300">Educational Simulation Note: </span>
          This lab uses a deterministic mathematical simulation model based on Little&apos;s Law and queueing theory. No live external network traffic is generated.
        </div>
      </div>
    </div>
  );
};
