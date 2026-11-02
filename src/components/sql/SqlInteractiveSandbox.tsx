import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Database,
  Table,
  Lightbulb,
  Copy,
  Check,
  Terminal,
} from 'lucide-react';
import { sqlSimulator, SqlQueryResult, SQL_SCHEMAS } from '../../services/sqlSimulatorService';
import { renderFormattedInline } from '../common/LessonContentRenderer';

interface SqlInteractiveSandboxProps {
  initialSql?: string;
  onSuccess?: () => void;
  validator?: (result: SqlQueryResult) => { success: boolean; feedback: string };
  hints?: string[];
  solutionSql?: string;
  exerciseTitle?: string;
}

export const SqlInteractiveSandbox: React.FC<SqlInteractiveSandboxProps> = ({
  initialSql = 'SELECT * FROM customers LIMIT 5;',
  onSuccess,
  validator,
  hints = [],
  solutionSql,
  exerciseTitle,
}) => {
  const [query, setQuery] = useState(initialSql);
  const [result, setResult] = useState<SqlQueryResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [showSchemas, setShowSchemas] = useState(false);
  const [activeHintIndex, setActiveHintIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setVerificationFeedback(null);
    try {
      const res = sqlSimulator.execute(query);
      setResult(res);

      if (validator && !res.error) {
        const valRes = validator(res);
        setVerificationFeedback({
          success: valRes.success,
          message: valRes.feedback,
        });
        if (valRes.success && onSuccess) {
          onSuccess();
        }
      } else if (res.error) {
        setVerificationFeedback({
          success: false,
          message: res.error,
        });
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleResetDb = () => {
    sqlSimulator.resetDatabase();
    handleRun();
  };

  const handleCopySolution = () => {
    if (solutionSql) {
      setQuery(solutionSql);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl text-slate-200 text-xs">
      {/* Editor Header Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-slate-100 font-mono">
            {exerciseTitle || 'SQL Practice Sandbox'}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
            In-Memory Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSchemas(!showSchemas)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
            title="Inspect table schemas"
          >
            <Table className="w-3.5 h-3.5 text-indigo-400" />
            <span>{showSchemas ? 'Hide Schemas' : 'Table Schemas'}</span>
          </button>

          <button
            onClick={handleResetDb}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
            title="Reset sandbox database"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset DB</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isRunning ? 'Running...' : 'Execute SQL'}</span>
          </button>
        </div>
      </div>

      {/* Schema Inspector Drawer */}
      {showSchemas && (
        <div className="bg-slate-950/80 p-4 border-b border-slate-800 max-h-60 overflow-y-auto space-y-3">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Table className="w-3.5 h-3.5 text-indigo-400" />
            <span>Available Sandbox Tables &amp; Columns</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SQL_SCHEMAS.map((schema) => (
              <div
                key={schema.tableName}
                className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between font-mono font-bold text-indigo-300">
                  <span>{schema.tableName}</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {schema.columns.length} cols
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-1">{schema.description}</div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {schema.columns.map((c) => (
                    <span
                      key={c.name}
                      className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700/50"
                      title={`${c.name} (${c.type})${c.isPrimary ? ' PK' : ''}`}
                    >
                      {c.name}
                      {c.isPrimary && <span className="text-amber-400 ml-0.5">*</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Query Codearea */}
      <div className="relative font-mono bg-slate-900 p-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
              e.preventDefault();
              handleRun();
            }
          }}
          rows={5}
          className="w-full bg-slate-950 text-emerald-300 p-3 rounded-xl border border-slate-800 font-mono text-xs focus:outline-none focus:border-emerald-500/50 resize-y leading-relaxed"
          placeholder="-- Write your SQL statement here..."
        />
        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
          <span>Shortcuts: Press <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-400">Ctrl+Enter</kbd> or <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-400">Cmd+Enter</kbd> to run</span>
          {solutionSql && (
            <button
              onClick={handleCopySolution}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied Solution' : 'Load Solution Code'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Validation Feedback Banner */}
      {verificationFeedback && (
        <div
          className={`px-4 py-3 border-t flex items-start gap-2.5 ${
            verificationFeedback.success
              ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
              : 'bg-rose-950/40 border-rose-800/80 text-rose-300'
          }`}
        >
          {verificationFeedback.success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="font-bold">
              {verificationFeedback.success ? 'Verification Passed!' : 'Verification Notice'}
            </div>
            <div className="text-xs opacity-90 mt-0.5">{renderFormattedInline(verificationFeedback.message, 'emerald')}</div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="border-t border-slate-800 bg-slate-950">
          <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <Terminal className="w-3 h-3" />
                <span>Result: {result.rowCount} {result.rowCount === 1 ? 'row' : 'rows'}</span>
              </span>
              <span>Execution Time: {result.executionTimeMs}ms</span>
            </div>
            {result.affectedRows !== undefined && (
              <span className="text-indigo-400">Affected: {result.affectedRows}</span>
            )}
          </div>

          {result.error ? (
            <div className="p-4 text-rose-400 font-mono text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{result.error}</span>
            </div>
          ) : result.rows.length === 0 ? (
            <div className="p-6 text-center text-slate-500 font-mono text-xs">
              Query executed successfully. (0 rows returned)
            </div>
          ) : (
            <div className="max-h-72 overflow-x-auto overflow-y-auto">
              <table className="w-full text-left font-mono border-collapse">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 text-[11px] border-b border-slate-800 sticky top-0">
                    <th className="py-2 px-3 text-slate-600 w-8">#</th>
                    {result.columns.map((col, idx) => (
                      <th key={idx} className="py-2 px-3 border-r border-slate-800/40">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {result.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-1.5 px-3 text-slate-600 text-[10px]">{rIdx + 1}</td>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-1.5 px-3 border-r border-slate-800/20 whitespace-nowrap ${
                            cell === null ? 'text-slate-600 italic' : 'text-slate-200'
                          }`}
                        >
                          {cell === null ? 'NULL' : String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Hints Accordion */}
      {hints && hints.length > 0 && (
        <div className="bg-slate-950 p-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-300">
              Hint ({activeHintIndex + 1}/{hints.length}):
            </span>
            <span>{renderFormattedInline(hints[activeHintIndex], 'emerald')}</span>
          </div>
          {hints.length > 1 && (
            <button
              onClick={() => setActiveHintIndex((prev) => (prev + 1) % hints.length)}
              className="text-indigo-400 hover:text-indigo-300 text-[11px] font-semibold cursor-pointer"
            >
              Next Hint &rarr;
            </button>
          )}
        </div>
      )}
    </div>
  );
};
