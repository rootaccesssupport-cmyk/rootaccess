import React, { useState } from 'react';
import {
  GitBranch,
  ShieldCheck,
  Cpu,
  Activity,
  RotateCcw,
  FolderTree,
  Terminal,
  Lock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  RefreshCw,
  Play,
  Check,
  Building,
} from 'lucide-react';
import {
  PracticalMission,
  MissionStage,
  MissionStageChoice,
} from '../../data/devopsScenarioMissions';
import { AssignmentEvaluationResult } from '../../services/devopsEvaluationService';

interface Props {
  mission: PracticalMission;
  onSubmit: (submissionData: { missionChoices: Record<string, string> }) => AssignmentEvaluationResult;
  initialResult?: AssignmentEvaluationResult | null;
}

export const InteractiveScenarioMissionStudio: React.FC<Props> = ({
  mission,
  onSubmit,
  initialResult = null,
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [activeStageFeedback, setActiveStageFeedback] = useState<Record<string, MissionStageChoice | null>>({});
  const [evaluationResult, setEvaluationResult] = useState<AssignmentEvaluationResult | null>(initialResult);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStage: MissionStage = mission.stages[currentStageIdx];
  const totalStages = mission.stages.length;

  // Calculate current score preview
  const currentTotalScore = Object.entries(selectedChoices).reduce((sum, [stageId, choiceId]) => {
    const stage = mission.stages.find((s) => s.id === stageId);
    const choice = stage?.choices.find((c) => c.id === choiceId);
    return sum + (choice?.score || 0);
  }, 0);

  const completedCount = Object.keys(selectedChoices).length;
  const isAllStagesDecided = completedCount === totalStages;

  const handleSelectChoice = (stage: MissionStage, choice: MissionStageChoice) => {
    setSelectedChoices((prev) => ({ ...prev, [stage.id]: choice.id }));
    setActiveStageFeedback((prev) => ({ ...prev, [stage.id]: choice }));
  };

  const handleNextStage = () => {
    if (currentStageIdx < totalStages - 1) {
      setCurrentStageIdx((prev) => prev + 1);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIdx > 0) {
      setCurrentStageIdx((prev) => prev - 1);
    }
  };

  const handleSubmitMission = () => {
    setIsSubmitting(true);
    try {
      const result = onSubmit({ missionChoices: selectedChoices });
      setEvaluationResult(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetMission = () => {
    setSelectedChoices({});
    setActiveStageFeedback({});
    setEvaluationResult(null);
    setCurrentStageIdx(0);
  };

  // Helper icon render
  const renderStageIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'GitBranch':
        return <GitBranch className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'RotateCcw':
        return <RotateCcw className={className} />;
      case 'FolderTree':
        return <FolderTree className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'Lock':
        return <Lock className={className} />;
      default:
        return <AlertTriangle className={className} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* MISSION BRIEFING BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 md:p-8 text-white shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Interactive Production Scenario Mission
              </span>
              <span className="text-xs text-slate-400 font-mono">{mission.missionCode}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-2 text-xs">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">Live Readiness:</span>
                <span className="font-extrabold text-amber-400 font-mono">
                  {currentTotalScore} / 100 PTS
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
            {mission.title}
          </h2>
          <p className="text-sm text-indigo-200/90 max-w-3xl mb-5 leading-relaxed">
            {mission.subtitle}
          </p>

          {/* Corporate Context Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-indigo-900/40 text-xs">
            <div className="flex items-start gap-2.5 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
              <Building className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-300 block mb-0.5">Corporate Context</span>
                <span className="text-slate-400">{mission.companyContext}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-300 block mb-0.5">Target Business Impact</span>
                <span className="text-slate-400">{mission.businessImpact}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STAGE STEPPER BAR */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Operational Decision Stages ({completedCount} of {totalStages} Decided)
          </span>
          <span className="text-xs font-mono font-bold text-indigo-600">
            Stage {currentStageIdx + 1} of {totalStages}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {mission.stages.map((stage, idx) => {
            const isChosen = !!selectedChoices[stage.id];
            const choice = stage.choices.find((c) => c.id === selectedChoices[stage.id]);
            const isOptimal = choice?.isOptimal;
            const isCurrent = idx === currentStageIdx;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setCurrentStageIdx(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  isCurrent
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                    : isChosen
                    ? isOptimal
                      ? 'border-emerald-300 bg-emerald-50/60 hover:bg-emerald-50'
                      : 'border-amber-300 bg-amber-50/60 hover:bg-amber-50'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Stage {stage.stageNumber}
                  </span>
                  {isChosen ? (
                    isOptimal ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    )
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                  )}
                </div>
                <div className="text-xs font-bold text-slate-800 truncate">
                  {stage.phaseCategory}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE STAGE DECISION ARENA */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Stage Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 flex items-center gap-1.5">
              {renderStageIcon(currentStage.iconName, 'w-3.5 h-3.5')}
              {currentStage.phaseCategory}
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">
              Stage {currentStage.stageNumber} • 20 Points
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2">
            {currentStage.title}
          </h3>

          {/* Operational Context Card */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 text-xs leading-relaxed flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 block mb-1">Production Situation Briefing:</span>
              <p className="text-slate-300">{currentStage.situationContext}</p>
            </div>
          </div>

          <div className="mt-4 text-sm font-bold text-slate-800 flex items-center gap-2">
            <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            {currentStage.question}
          </div>
        </div>

        {/* DECISION CHOICES (4 OPTIONS) */}
        <div className="p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 gap-3.5">
            {currentStage.choices.map((choice, cIdx) => {
              const isSelected = selectedChoices[currentStage.id] === choice.id;

              return (
                <div
                  key={choice.id}
                  onClick={() => handleSelectChoice(currentStage, choice)}
                  className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? choice.isOptimal
                        ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-xs'
                        : choice.outcomeType === 'danger'
                        ? 'border-rose-500 bg-rose-50/40 ring-2 ring-rose-500/20 shadow-xs'
                        : 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 ${
                        isSelected
                          ? choice.isOptimal
                            ? 'bg-emerald-600 text-white'
                            : choice.outcomeType === 'danger'
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + cIdx)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-slate-900">{choice.label}</h4>
                        {isSelected && (
                          <span
                            className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                              choice.isOptimal
                                ? 'bg-emerald-100 text-emerald-800'
                                : choice.outcomeType === 'danger'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            +{choice.score} / 20 PTS
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                        {choice.description}
                      </p>

                      {choice.commandSnippet && (
                        <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-[11px] text-emerald-400 overflow-x-auto flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{choice.commandSnippet}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* LIVE SIMULATION FEEDBACK DRAWER */}
          {activeStageFeedback[currentStage.id] && (
            <div className="mt-6 rounded-2xl border overflow-hidden transition-all duration-300">
              {(() => {
                const feedback = activeStageFeedback[currentStage.id]!;
                const isOptimal = feedback.isOptimal;
                const isDanger = feedback.outcomeType === 'danger';

                return (
                  <div
                    className={`${
                      isOptimal
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : isDanger
                        ? 'border-rose-200 bg-rose-50/50'
                        : 'border-amber-200 bg-amber-50/50'
                    } p-5`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {isOptimal ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : isDanger ? (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600" />
                      )}
                      <h4
                        className={`text-sm font-extrabold ${
                          isOptimal
                            ? 'text-emerald-900'
                            : isDanger
                            ? 'text-rose-900'
                            : 'text-amber-900'
                        }`}
                      >
                        {feedback.outcomeTitle}
                      </h4>
                    </div>

                    {/* Simulated Server/Runner Console */}
                    {feedback.terminalLogs && feedback.terminalLogs.length > 0 && (
                      <div className="mb-4 rounded-xl bg-slate-950 p-4 border border-slate-800 font-mono text-[11px] text-slate-200 space-y-1 shadow-inner">
                        <div className="flex items-center gap-2 pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-500 uppercase tracking-wider">
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <span>Simulated Server / Runner Reaction Console</span>
                        </div>
                        {feedback.terminalLogs.map((log, lIdx) => (
                          <div
                            key={lIdx}
                            className={`${
                              log.startsWith('✔')
                                ? 'text-emerald-400'
                                : log.startsWith('🚨') || log.includes('Violation') || log.includes('failed')
                                ? 'text-rose-400 font-bold'
                                : log.startsWith('📊')
                                ? 'text-sky-300'
                                : 'text-slate-300'
                            }`}
                          >
                            {log}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Senior Staff Technical Insight */}
                    <div className="bg-white/80 rounded-xl p-3.5 border border-slate-200/80 text-xs">
                      <span className="font-extrabold text-slate-900 block mb-1">
                        Senior DevOps Staff Architecture Rationale:
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {feedback.seniorStaffAnalysis}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* STAGE NAVIGATION CONTROLS */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={handlePrevStage}
              disabled={currentStageIdx === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Stage
            </button>

            {currentStageIdx < totalStages - 1 ? (
              <button
                type="button"
                onClick={handleNextStage}
                disabled={!selectedChoices[currentStage.id]}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
              >
                Next Decision Stage <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitMission}
                disabled={!isAllStagesDecided || isSubmitting}
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <Check className="w-4 h-4" />
                {isSubmitting ? 'Evaluating Scenario...' : 'Complete & Sign-Off Mission'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FINAL EXECUTIVE MISSION REVIEW CARD */}
      {evaluationResult && (
        <div className="bg-white rounded-3xl border-2 border-indigo-200 p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl shadow-inner ${
                  evaluationResult.passed
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                    : 'bg-rose-100 text-rose-700 border border-rose-300'
                }`}
              >
                {evaluationResult.percentage}%
              </div>
              <div>
                <span
                  className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    evaluationResult.passed
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {evaluationResult.passed ? 'Mission Passed • Certified' : 'Mission Failed • Revision Needed'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  Executive Scenario Evaluation Report
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Final Operational Score: {evaluationResult.score} / {evaluationResult.maxScore} Points
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetMission}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-attempt Mission
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-950 leading-relaxed">
            <span className="font-extrabold block mb-1">Executive Summary:</span>
            {evaluationResult.feedback}
          </div>

          {/* Breakdown by stage */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Dimension-by-Dimension Breakdown
            </h4>
            <div className="space-y-2.5">
              {evaluationResult.criteriaScores.map((c, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex-1">
                    <span className="font-bold text-slate-900 block mb-0.5">{c.criterion}</span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{c.comment}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-24 bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          c.score >= c.maxScore * 0.8
                            ? 'bg-emerald-500'
                            : c.score > 0
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${(c.score / c.maxScore) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono font-bold text-slate-800 w-14 text-right">
                      {c.score}/{c.maxScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
