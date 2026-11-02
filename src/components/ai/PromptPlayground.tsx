import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Bookmark,
  Layers,
  Sliders,
  Info,
  Split,
  BookOpen,
} from 'lucide-react';
import {
  AI_DAYS_DATA,
  PromptPlaygroundScenario,
} from '../../data/aiPromptCurriculumData';
import { FormattedContent } from './FormattedContent';

export interface SavedPromptItem {
  id: string;
  title: string;
  category: string;
  promptText: string;
  outputFormat: string;
  savedAt: string;
}

interface PromptPlaygroundProps {
  initialScenarioId?: string;
  dayNumber?: number;
  onPromptEvaluated?: (score: number, promptText: string) => void;
}

// Built-in curated scenarios aggregated across all days + custom option
const ALL_PLAYGROUND_SCENARIOS: PromptPlaygroundScenario[] = [
  ...AI_DAYS_DATA.flatMap((d) => d.playgroundScenarios),
  {
    id: 'custom-scenario',
    title: 'Custom Prompt Experimentation',
    category: 'productivity',
    description: 'Design your own custom prompt from scratch using the 6-Part Framework and test its structure and quality.',
    sampleContext: 'Target topic: Customer Support / Code Explanation / Study Guide / Research Synthesis.',
    defaultFormat: 'Markdown Table',
    weakPrompt: 'Explain how to use AI tools for my job.',
    weakOutput: 'AI tools can help you write emails, generate code, summarize documents, and brainstorm ideas. You should try typing prompts into chatbots and seeing what works best for you.',
    weakCritique: [
      'Missing professional role and seniority level.',
      'No specific industry context or daily operational workflow.',
      'Zero formatting requirements or negative constraints.',
    ],
    improvedPrompt:
      'ROLE: Senior Workplace Productivity Consultant\nTASK: Generate a 3-step practical action plan for integrating AI assistants into daily engineering standups.\nCONTEXT: Distributed team of 8 software engineers working in 2-week sprints.\nCONSTRAINTS: Under 200 words. Focus exclusively on task extraction and blocker identification.\nOUTPUT FORMAT: Markdown table with columns: Stage, Action, Time Allocation, Tool.',
    improvedOutput:
      '| Stage | Action | Time Allocation | Tool |\n| :--- | :--- | :--- | :--- |\n| 1. Pre-Standup Extraction | Paste raw commit logs and pull requests into AI to generate 3 bullet points: Completed, In Progress, Blocked. | 3 mins per dev | Local AI Co-Pilot |\n| 2. Live Blocker Triage | Feed the team blocker list to extract immediate dependencies and cross-squad owners. | 5 mins (Scrum) | Shared Meeting Assistant |\n| 3. Automated Confluence Sync | Transform spoken notes into Jira ticket sub-tasks and publish directly to sprint Confluence dashboard. | 2 mins (Post-meeting) | Jira / Confluence Integration |',
    improvementHighlights: [
      'Clearly defines a senior consultant persona.',
      'Constrains response to concrete daily standup stages.',
      'Outputs a structured table ready for immediate team adoption.',
    ],
    evaluationCriteria: {
      roleDefined: true,
      taskClear: true,
      contextProvided: true,
      constraintsIncluded: true,
      formatSpecified: true,
    },
  },
];

export const PromptPlayground: React.FC<PromptPlaygroundProps> = ({
  initialScenarioId,
  dayNumber,
  onPromptEvaluated,
}) => {
  // Find initial scenario or default based on dayNumber
  const defaultScenario =
    ALL_PLAYGROUND_SCENARIOS.find((s) => s.id === initialScenarioId) ||
    (dayNumber ? AI_DAYS_DATA.find((d) => d.dayNumber === dayNumber)?.playgroundScenarios[0] : null) ||
    ALL_PLAYGROUND_SCENARIOS[0];

  const [selectedScenario, setSelectedScenario] = useState<PromptPlaygroundScenario>(defaultScenario);
  const [promptText, setPromptText] = useState(defaultScenario.improvedPrompt);
  const [contextText, setContextText] = useState(defaultScenario.sampleContext);
  const [outputFormat, setOutputFormat] = useState(defaultScenario.defaultFormat);

  // Execution state
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState<'result' | 'comparison' | 'critique'>('result');
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Prompt Library state
  const [showLibrary, setShowLibrary] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPromptItem[]>(() => {
    try {
      const stored = localStorage.getItem('rootaccess_saved_prompt_library');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Update when initial scenario or day changes
  useEffect(() => {
    if (initialScenarioId) {
      const found = ALL_PLAYGROUND_SCENARIOS.find((s) => s.id === initialScenarioId);
      if (found) {
        setSelectedScenario(found);
        setPromptText(found.improvedPrompt);
        setContextText(found.sampleContext);
        setOutputFormat(found.defaultFormat);
        setHasExecuted(false);
      }
    }
  }, [initialScenarioId]);

  // Handle Scenario Switch
  const handleScenarioChange = (scenarioId: string) => {
    const next = ALL_PLAYGROUND_SCENARIOS.find((s) => s.id === scenarioId) || ALL_PLAYGROUND_SCENARIOS[0];
    setSelectedScenario(next);
    setPromptText(next.improvedPrompt);
    setContextText(next.sampleContext);
    setOutputFormat(next.defaultFormat);
    setHasExecuted(false);
    setActiveOutputTab('result');
  };

  // Evaluate structure of current prompt
  const calculatePromptMetrics = (text: string) => {
    const hasRole = /ROLE\s*:/i.test(text) || /as\s+a\s+(senior|lead|engineer|specialist|teacher|consultant)/i.test(text);
    const hasTask = /TASK\s*:/i.test(text) || /(create|draft|generate|summarize|critique|extract|explain)/i.test(text);
    const hasContext = /CONTEXT\s*:/i.test(text) || /background|given\s+that|situation|scenario/i.test(text) || contextText.length > 15;
    const hasConstraints = /CONSTRAINTS?\s*:/i.test(text) || /(under\s+\d+|do\s+not|limit|maximum|strictly|never)/i.test(text);
    const hasFormat = /OUTPUT\s+FORMAT\s*:/i.test(text) || /(table|markdown|bullet|checklist|json|step-by-step)/i.test(text);

    let score = 0;
    if (hasRole) score += 20;
    if (hasTask) score += 20;
    if (hasContext) score += 20;
    if (hasConstraints) score += 20;
    if (hasFormat) score += 20;

    return {
      score,
      hasRole,
      hasTask,
      hasContext,
      hasConstraints,
      hasFormat,
    };
  };

  const metrics = calculatePromptMetrics(promptText);

  // Insert framework token snippet helper
  const insertSnippet = (snippet: string) => {
    setPromptText((prev) => (prev ? `${prev}\n${snippet}` : snippet));
  };

  // Run Practice
  const handleRunPractice = () => {
    setIsExecuting(true);
    setHasExecuted(false);

    // Realistic educational execution delay (350ms)
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
      if (onPromptEvaluated) {
        onPromptEvaluated(metrics.score, promptText);
      }
    }, 350);
  };

  // Reset to default
  const handleReset = () => {
    setPromptText(selectedScenario.improvedPrompt);
    setContextText(selectedScenario.sampleContext);
    setOutputFormat(selectedScenario.defaultFormat);
    setHasExecuted(false);
    setActiveOutputTab('result');
  };

  // Copy to clipboard
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save to prompt library
  const handleSaveToLibrary = () => {
    const newItem: SavedPromptItem = {
      id: `saved-prompt-${Date.now()}`,
      title: `${selectedScenario.title} (${outputFormat})`,
      category: selectedScenario.category,
      promptText,
      outputFormat,
      savedAt: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    const updated = [newItem, ...savedPrompts];
    setSavedPrompts(updated);
    try {
      localStorage.setItem('rootaccess_saved_prompt_library', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save prompt to library:', e);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Delete from library
  const handleDeleteSavedPrompt = (id: string) => {
    const filtered = savedPrompts.filter((p) => p.id !== id);
    setSavedPrompts(filtered);
    try {
      localStorage.setItem('rootaccess_saved_prompt_library', JSON.stringify(filtered));
    } catch (e) {
      console.warn('Could not update prompt library:', e);
    }
  };

  // Load saved prompt
  const handleLoadSavedPrompt = (item: SavedPromptItem) => {
    setPromptText(item.promptText);
    setOutputFormat(item.outputFormat);
    setShowLibrary(false);
    setHasExecuted(false);
  };

  // Determine which simulated output to display
  // If the user's prompt is very weak (< 40 points) or matches the weak prompt, show weakOutput; otherwise show improvedOutput
  const displayedOutput =
    metrics.score < 40
      ? selectedScenario.weakOutput
      : selectedScenario.improvedOutput;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all font-sans text-slate-800">
      {/* Top Header / Mode Banner */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Interactive Prompt Studio
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 border border-slate-700 text-slate-300 rounded-md">
                Deterministic Simulator
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              RootAccess Prompt Playground &amp; Evaluation Sandbox
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLibrary(!showLibrary)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-purple-400" />
            <span>Prompt Library ({savedPrompts.length})</span>
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium rounded-xl transition-colors cursor-pointer"
            title="Reset prompt and context to default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Mode Transparency Banner */}
      <div className="bg-purple-50/70 border-b border-purple-100 px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs text-purple-900">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-purple-600 shrink-0" />
          <span>
            <strong>Practice Environment:</strong> Running in Deterministic Educational Simulator mode. Curated responses model exact output differences without requiring paid API keys.
          </span>
        </div>
        <span className="hidden md:inline text-[11px] text-purple-700 font-medium">
          Models vary by provider (Gemini, Claude, GPT)
        </span>
      </div>

      {/* Main Studio Body */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Controls Row: Scenario Selector & Output Format */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Scenario Selector */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Select Practice Task / Scenario</span>
            </label>
            <select
              value={selectedScenario.id}
              onChange={(e) => handleScenarioChange(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
            >
              {ALL_PLAYGROUND_SCENARIOS.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.title} ({scenario.category.toUpperCase()})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              {selectedScenario.description}
            </p>
          </div>

          {/* Desired Output Format */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Desired Output Format</span>
            </label>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
            >
              <option value="Markdown Table">Markdown Table</option>
              <option value="Bulleted Action Checklist">Bulleted Action Checklist</option>
              <option value="Step-by-Step Implementation Guide">Step-by-Step Implementation Guide</option>
              <option value="Executive Email with Action Plan">Executive Email with Action Plan</option>
              <option value="Airtight Test Suite Schema">Airtight Test Suite Schema</option>
              <option value="JSON Data Object">JSON Data Object</option>
              <option value="Pros vs Cons Comparative Matrix">Pros vs Cons Comparative Matrix</option>
            </select>
          </div>
        </div>

        {/* Sample Context Field (Collapsible) */}
        <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Reference Context / Background Data</span>
            </span>
            <span className="text-[11px] font-normal text-slate-500 lowercase">
              (Model grounds its answer in this text)
            </span>
          </label>
          <textarea
            value={contextText}
            onChange={(e) => setContextText(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 text-xs font-mono text-slate-700 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
            placeholder="Provide relevant facts, background notes, user data, or source material here..."
          />
        </div>

        {/* Prompt Input & Framework Quick Chips */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>Your Prompt Architecture</span>
              <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60">
                Structure Score: {metrics.score}%
              </span>
            </label>

            {/* Framework Snippet Helper Chips */}
            <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
              <span className="text-slate-400 font-medium">Add block:</span>
              <button
                type="button"
                onClick={() => insertSnippet('ROLE: Senior Domain Specialist')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 border border-slate-200 rounded-md font-mono transition-colors"
              >
                + ROLE:
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('TASK: Explicit primary objective')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 border border-slate-200 rounded-md font-mono transition-colors"
              >
                + TASK:
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('CONSTRAINTS: Under 200 words, no jargon, Indian Rupees')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 border border-slate-200 rounded-md font-mono transition-colors"
              >
                + CONSTRAINTS:
              </button>
              <button
                type="button"
                onClick={() => insertSnippet(`OUTPUT FORMAT: ${outputFormat}`)}
                className="px-2 py-0.5 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 border border-slate-200 rounded-md font-mono transition-colors"
              >
                + FORMAT:
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('SUCCESS CRITERIA: Immediately actionable for entry-level team')}
                className="px-2 py-0.5 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 border border-slate-200 rounded-md font-mono transition-colors"
              >
                + SUCCESS:
              </button>
            </div>
          </div>

          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            rows={7}
            className="w-full p-3.5 text-xs sm:text-sm font-mono text-slate-800 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all leading-relaxed"
            placeholder="Type your prompt here... Use the 6-Part Framework (Role, Task, Context, Constraints, Format, Success Criteria) for best results."
          />

          {/* Real-Time Quality Breakdown Indicator */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-[11px]">
            <div
              className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                metrics.hasRole
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  metrics.hasRole ? 'text-emerald-600' : 'text-slate-300'
                }`}
              />
              <span className="font-semibold">Role Defined</span>
            </div>

            <div
              className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                metrics.hasTask
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  metrics.hasTask ? 'text-emerald-600' : 'text-slate-300'
                }`}
              />
              <span className="font-semibold">Task Clear</span>
            </div>

            <div
              className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                metrics.hasContext
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  metrics.hasContext ? 'text-emerald-600' : 'text-slate-300'
                }`}
              />
              <span className="font-semibold">Context Provided</span>
            </div>

            <div
              className={`p-2 rounded-lg border flex items-center gap-1.5 ${
                metrics.hasConstraints
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  metrics.hasConstraints ? 'text-emerald-600' : 'text-slate-300'
                }`}
              />
              <span className="font-semibold">Constraints Set</span>
            </div>

            <div
              className={`p-2 rounded-lg border flex items-center gap-1.5 col-span-2 sm:col-span-1 ${
                metrics.hasFormat
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  metrics.hasFormat ? 'text-emerald-600' : 'text-slate-300'
                }`}
              />
              <span className="font-semibold">Format Declared</span>
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleRunPractice}
              disabled={isExecuting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isExecuting ? 'Synthesizing...' : 'Run Practice (Evaluate)'}</span>
            </button>

            <button
              onClick={handleSaveToLibrary}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              title="Save current prompt to personal library"
            >
              <Bookmark className="w-4 h-4 text-purple-600" />
              <span>{saveSuccess ? 'Saved to Library!' : 'Save Prompt'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Targeting format:</span>
            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-md">
              {outputFormat}
            </span>
          </div>
        </div>

        {/* Results Area */}
        {hasExecuted && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            {/* Output Sub-Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveOutputTab('result')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeOutputTab === 'result'
                      ? 'bg-purple-100 text-purple-800'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  Model Output Result
                </button>

                <button
                  onClick={() => setActiveOutputTab('comparison')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeOutputTab === 'comparison'
                      ? 'bg-purple-100 text-purple-800'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <Split className="w-3.5 h-3.5" />
                  <span>Weak vs Improved Comparison</span>
                </button>

                <button
                  onClick={() => setActiveOutputTab('critique')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeOutputTab === 'critique'
                      ? 'bg-purple-100 text-purple-800'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  Improvement Critique
                </button>
              </div>

              <button
                onClick={() => handleCopy(displayedOutput)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors p-1 rounded-md hover:bg-slate-100 cursor-pointer"
                title="Copy output to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Tab 1: Direct Output Result */}
            {activeOutputTab === 'result' && (
              <div className="space-y-3">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm text-slate-800 font-sans leading-relaxed">
                  <FormattedContent content={displayedOutput} />
                </div>

                {metrics.score < 60 && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Prompt Architecture Advisory:</p>
                      <p className="mt-0.5 text-amber-800">
                        Your prompt scored {metrics.score}%. Notice how missing constraints and output formatting leads to generic output. Try inserting <code>ROLE:</code>, <code>CONSTRAINTS:</code>, and <code>OUTPUT FORMAT:</code> blocks above to unlock professional structure.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Side-by-Side Comparison */}
            {activeOutputTab === 'comparison' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Weak Initial Output */}
                <div className="space-y-2 border border-rose-200 bg-rose-50/40 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                      Initial Vague Prompt Output
                    </span>
                    <span className="text-[10px] font-semibold bg-rose-100 text-rose-700 px-2 py-0.5 rounded">
                      Unstructured
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 font-sans leading-relaxed whitespace-pre-wrap bg-white p-3 rounded-lg border border-rose-100">
                    {selectedScenario.weakOutput}
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-rose-900">Why it underperforms:</span>
                    <ul className="list-disc list-inside text-[11px] text-rose-800 space-y-0.5">
                      {selectedScenario.weakCritique.map((critique, idx) => (
                        <li key={idx}>{critique}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Improved Output */}
                <div className="space-y-2 border border-emerald-200 bg-emerald-50/40 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Framework-Optimized Output
                    </span>
                    <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                      Structured &amp; Actionable
                    </span>
                  </div>
                  <div className="text-xs text-slate-800 font-sans leading-relaxed bg-white p-3 rounded-lg border border-emerald-100 overflow-x-auto">
                    <FormattedContent content={selectedScenario.improvedOutput} />
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-emerald-900">Why it excels:</span>
                    <ul className="list-disc list-inside text-[11px] text-emerald-800 space-y-0.5">
                      {selectedScenario.improvementHighlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Detailed Critique */}
            {activeOutputTab === 'critique' && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Engineering Critique for: "{selectedScenario.title}"
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Weak Prompt Flaws</span>
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedScenario.weakCritique.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Framework Enhancements</span>
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedScenario.improvementHighlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Slide-Out Prompt Library Modal / Panel */}
      {showLibrary && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-purple-400" />
                <h4 className="text-sm font-bold">Your Saved Reusable Prompt Library</h4>
              </div>
              <button
                onClick={() => setShowLibrary(false)}
                className="text-slate-400 hover:text-white transition-colors text-xs font-semibold px-2 py-1"
              >
                Close (ESC)
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {savedPrompts.length === 0 ? (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <Bookmark className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-sm font-medium">Your prompt library is empty.</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    When you craft an effective prompt in the playground, click "Save Prompt" to store it here for permanent reuse across projects.
                  </p>
                </div>
              ) : (
                savedPrompts.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      <span className="text-[10px] text-slate-400">{item.savedAt}</span>
                    </div>
                    <pre className="text-[11px] font-mono text-slate-700 bg-white p-2 rounded border border-slate-200 overflow-x-auto whitespace-pre-wrap max-h-24">
                      {item.promptText}
                    </pre>
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => handleLoadSavedPrompt(item)}
                        className="text-purple-600 hover:text-purple-800 font-bold inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-purple-600" />
                        <span>Load into Playground</span>
                      </button>

                      <button
                        onClick={() => handleDeleteSavedPrompt(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors text-[11px] cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-slate-50 p-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowLibrary(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
