import React, { useState } from 'react';
import { RotateCcw, Activity, Zap, ShieldAlert, Clock } from 'lucide-react';

export const JmeterWorkloadDesigner: React.FC = () => {
  const [profileType, setProfileType] = useState<'load' | 'stress' | 'spike' | 'endurance'>('load');
  const [users, setUsers] = useState<number>(50);
  const [rampUp, setRampUp] = useState<number>(30);
  const [holdDuration, setHoldDuration] = useState<number>(90);
  const [rampDown, setRampDown] = useState<number>(15);
  const [thinkTime, setThinkTime] = useState<number>(1.5);

  // Switch presets
  const applyPreset = (type: 'load' | 'stress' | 'spike' | 'endurance') => {
    setProfileType(type);
    if (type === 'load') {
      setUsers(50);
      setRampUp(30);
      setHoldDuration(120);
      setRampDown(20);
      setThinkTime(1.5);
    } else if (type === 'stress') {
      setUsers(180);
      setRampUp(60);
      setHoldDuration(90);
      setRampDown(30);
      setThinkTime(0.8);
    } else if (type === 'spike') {
      setUsers(250);
      setRampUp(5);
      setHoldDuration(45);
      setRampDown(5);
      setThinkTime(0.3);
    } else if (type === 'endurance') {
      setUsers(40);
      setRampUp(60);
      setHoldDuration(360);
      setRampDown(30);
      setThinkTime(2.0);
    }
  };

  // Synthetic calculations based on profile characteristics
  const totalDuration = rampUp + holdDuration + rampDown;

  const avgLatency = profileType === 'spike' ? 1420 : profileType === 'stress' ? 890 : profileType === 'endurance' ? 165 : 210;
  const p95Latency = profileType === 'spike' ? 4250 : profileType === 'stress' ? 2450 : profileType === 'endurance' ? 290 : 380;
  const maxThroughput = profileType === 'spike' ? 290 : profileType === 'stress' ? 340 : profileType === 'endurance' ? 95 : 185;
  const errorRate = profileType === 'spike' ? 6.8 : profileType === 'stress' ? 3.4 : 0.0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Interactive Lab 7
            </span>
            <span className="text-xs text-slate-400">Workload Modelling</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Workload Profile Designer &amp; Scenario Simulator
          </h3>
          <p className="text-xs text-slate-400">
            Design trapezoidal, staircase, spike, and endurance workload models and inspect calculated percentiles.
          </p>
        </div>

        <button
          onClick={() => applyPreset('load')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => applyPreset('load')}
          className={`p-3 rounded-xl border text-left transition-all ${
            profileType === 'load'
              ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="font-bold text-xs flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Load Test</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Expected peak SLA</div>
        </button>

        <button
          onClick={() => applyPreset('stress')}
          className={`p-3 rounded-xl border text-left transition-all ${
            profileType === 'stress'
              ? 'border-amber-500 bg-amber-950/20 text-amber-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="font-bold text-xs flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Stress Test</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Find breaking limits</div>
        </button>

        <button
          onClick={() => applyPreset('spike')}
          className={`p-3 rounded-xl border text-left transition-all ${
            profileType === 'spike'
              ? 'border-rose-500 bg-rose-950/20 text-rose-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="font-bold text-xs flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Spike Test</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Surge recovery</div>
        </button>

        <button
          onClick={() => applyPreset('endurance')}
          className={`p-3 rounded-xl border text-left transition-all ${
            profileType === 'endurance'
              ? 'border-sky-500 bg-sky-950/20 text-sky-300'
              : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
          }`}
        >
          <div className="font-bold text-xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Endurance Test</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Soak for memory leaks</div>
        </button>
      </div>

      {/* Visual Timeline Profile Chart */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">
            Workload Timeline Graph (Total Duration: {totalDuration} seconds):
          </span>
          <span className="font-mono text-rose-400 text-xs">Peak: {users} Virtual Users</span>
        </div>

        {/* SVG Workload Curve */}
        <div className="relative h-32 w-full bg-slate-900/60 rounded-lg border border-slate-800 flex items-end p-2 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 600 100" preserveAspectRatio="none">
            {profileType === 'load' && (
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                points="0,100 80,20 520,20 600,100"
              />
            )}
            {profileType === 'stress' && (
              <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                points="0,100 100,75 100,75 200,50 200,50 300,25 300,25 450,10 600,100"
              />
            )}
            {profileType === 'spike' && (
              <polyline
                fill="none"
                stroke="#f43f5e"
                strokeWidth="3"
                points="0,100 150,90 180,5 240,5 270,90 600,90"
              />
            )}
            {profileType === 'endurance' && (
              <polyline
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                points="0,100 60,40 540,40 600,100"
              />
            )}
          </svg>

          {/* Markers */}
          <div className="absolute bottom-1 left-2 text-[10px] font-mono text-slate-500">0s</div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-400">
            Hold Period ({holdDuration}s @ {users} users)
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] font-mono text-slate-500">{totalDuration}s</div>
        </div>

        <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-1">
          <span>Ramp-Up: {rampUp}s</span>
          <span>Think Time: {thinkTime}s</span>
          <span>Ramp-Down: {rampDown}s</span>
        </div>
      </div>

      {/* Simulated Results Comparison */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Avg Response Time</div>
          <div className={`text-2xl font-bold font-mono ${avgLatency > 500 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {avgLatency} ms
          </div>
          <div className="text-[10px] text-slate-500">Average across samples</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase">95th Percentile</div>
          <div className={`text-2xl font-bold font-mono ${p95Latency > 1500 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {p95Latency} ms
          </div>
          <div className="text-[10px] text-slate-500">Tail latency metric</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Peak Throughput</div>
          <div className="text-2xl font-bold font-mono text-sky-400">
            {maxThroughput} <span className="text-xs font-normal text-slate-400">req/s</span>
          </div>
          <div className="text-[10px] text-slate-500">Max processed</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Error Rate</div>
          <div className={`text-2xl font-bold font-mono ${errorRate > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {errorRate}%
          </div>
          <div className="text-[10px] text-slate-500">Timeouts &amp; 5xx</div>
        </div>
      </div>
    </div>
  );
};
