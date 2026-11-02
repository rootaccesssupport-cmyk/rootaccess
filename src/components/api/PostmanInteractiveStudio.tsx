import React, { useState } from 'react';
import {
  Send,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Lightbulb,
  Code2,
  Sliders,
} from 'lucide-react';
import { apiSimulator, ApiResponse } from '../../services/apiSimulatorService';

interface PostmanInteractiveStudioProps {
  initialMethod?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  initialUrl?: string;
  initialHeaders?: Record<string, string>;
  initialBody?: string;
  initialTestScript?: string;
  onSuccess?: () => void;
  validator?: (response: ApiResponse) => { success: boolean; feedback: string };
  hints?: string[];
  exerciseTitle?: string;
  bugModeToggle?: boolean;
}

export const PostmanInteractiveStudio: React.FC<PostmanInteractiveStudioProps> = ({
  initialMethod = 'GET',
  initialUrl = 'https://api.rootaccess.org/v1/products',
  initialHeaders = {},
  initialBody = '',
  initialTestScript = '',
  onSuccess,
  validator,
  hints = [],
  exerciseTitle,
  bugModeToggle = false,
}) => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'>(initialMethod);
  const [url, setUrl] = useState(initialUrl);
  const [headersStr, setHeadersStr] = useState(
    Object.keys(initialHeaders).length > 0
      ? JSON.stringify(initialHeaders, null, 2)
      : '{\n  "Content-Type": "application/json"\n}'
  );
  const [body, setBody] = useState(initialBody);
  const [testScript, setTestScript] = useState(initialTestScript);

  const [activeReqTab, setActiveReqTab] = useState<'params' | 'body' | 'headers' | 'tests'>('body');
  const [activeResTab, setActiveResTab] = useState<'body' | 'headers' | 'tests'>('body');

  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [activeHintIndex, setActiveHintIndex] = useState(0);
  const [envDrawerOpen, setEnvDrawerOpen] = useState(false);
  const [bugMode, setBugMode] = useState(bugModeToggle);

  const handleSend = async () => {
    setIsSending(true);
    setVerificationFeedback(null);
    try {
      let parsedHeaders: Record<string, string> = {};
      try {
        if (headersStr.trim()) {
          parsedHeaders = JSON.parse(headersStr);
        }
      } catch (e) {
        setVerificationFeedback({
          success: false,
          message: 'Invalid Headers JSON format. Please check syntax.',
        });
        setIsSending(false);
        return;
      }

      apiSimulator.setBugMode(bugMode);

      const res = await apiSimulator.execute({
        method,
        url,
        headers: parsedHeaders,
        body: ['POST', 'PUT', 'PATCH'].includes(method) ? body : undefined,
        testScript,
      });

      setResponse(res);

      if (validator) {
        const valRes = validator(res);
        setVerificationFeedback({
          success: valRes.success,
          message: valRes.feedback,
        });
        if (valRes.success && onSuccess) {
          onSuccess();
        }
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    apiSimulator.reset();
    setMethod(initialMethod);
    setUrl(initialUrl);
    setBody(initialBody);
    setTestScript(initialTestScript);
    setResponse(null);
    setVerificationFeedback(null);
  };

  const methodColors = {
    GET: 'text-emerald-400 bg-emerald-950/80 border-emerald-800',
    POST: 'text-amber-400 bg-amber-950/80 border-amber-800',
    PUT: 'text-blue-400 bg-blue-950/80 border-blue-800',
    PATCH: 'text-purple-400 bg-purple-950/80 border-purple-800',
    DELETE: 'text-rose-400 bg-rose-950/80 border-rose-800',
  };

  const statusColor = (code: number) => {
    if (code >= 200 && code < 300) return 'bg-emerald-950 text-emerald-400 border-emerald-800';
    if (code >= 400 && code < 500) return 'bg-amber-950 text-amber-400 border-amber-800';
    return 'bg-rose-950 text-rose-400 border-rose-800';
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl text-slate-200 text-xs">
      {/* Studio Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-slate-100 font-mono">
            {exerciseTitle || 'Postman REST Studio'}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
            Deterministic Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          {bugModeToggle && (
            <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800/80 text-[11px] font-bold text-rose-300 cursor-pointer">
              <input
                type="checkbox"
                checked={bugMode}
                onChange={(e) => setBugMode(e.target.checked)}
                className="rounded border-rose-600 text-rose-500 focus:ring-0"
              />
              <span>Defect Mode Enabled</span>
            </label>
          )}

          <button
            onClick={() => setEnvDrawerOpen(!envDrawerOpen)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
            title="Inspect Environment Variables"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Variables</span>
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors cursor-pointer"
            title="Reset Studio"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSend}
            disabled={isSending}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>{isSending ? 'Sending...' : 'Send Request'}</span>
          </button>
        </div>
      </div>

      {/* Environment Drawer */}
      {envDrawerOpen && (
        <div className="bg-slate-950/90 p-4 border-b border-slate-800 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Active Environment Variables (Interpolated with &#123;&#123;variable&#125;&#125;)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {Object.entries(apiSimulator.getEnvironment()).map(([k, v]) => (
              <div key={k} className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono">
                <span className="text-amber-400 font-bold">&#123;&#123;{k}&#125;&#125;</span>:
                <div className="text-slate-300 truncate mt-0.5">{v || '<empty>'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* URL / Request Bar */}
      <div className="p-3 bg-slate-900 flex items-center gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as any)}
          className={`px-3 py-2 rounded-xl font-mono font-bold text-xs border focus:outline-none cursor-pointer ${methodColors[method]}`}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>

        <div className="relative flex-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Enter request URL (e.g. https://api.rootaccess.org/v1/products)"
            className="w-full bg-slate-950 text-slate-100 font-mono text-xs px-3.5 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Request Config Tabs */}
      <div className="bg-slate-950 border-t border-b border-slate-800 flex items-center px-4 text-xs">
        <button
          onClick={() => setActiveReqTab('body')}
          className={`py-2 px-3 font-semibold border-b-2 transition-colors cursor-pointer ${
            activeReqTab === 'body'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Body (JSON)
        </button>
        <button
          onClick={() => setActiveReqTab('headers')}
          className={`py-2 px-3 font-semibold border-b-2 transition-colors cursor-pointer ${
            activeReqTab === 'headers'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Headers
        </button>
        <button
          onClick={() => setActiveReqTab('tests')}
          className={`py-2 px-3 font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeReqTab === 'tests'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Tests (Chai pm.*)</span>
        </button>
      </div>

      {/* Request Tab Contents */}
      <div className="bg-slate-900 p-3">
        {activeReqTab === 'body' && (
          <div className="space-y-1">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={['GET', 'DELETE'].includes(method)}
              rows={4}
              placeholder={['GET', 'DELETE'].includes(method) ? 'GET and DELETE requests do not require a body payload.' : '{\n  "name": "Course Title",\n  "price": 299\n}'}
              className="w-full bg-slate-950 text-amber-300 font-mono text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500/50 resize-y leading-relaxed disabled:opacity-40"
            />
          </div>
        )}

        {activeReqTab === 'headers' && (
          <div className="space-y-1">
            <textarea
              value={headersStr}
              onChange={(e) => setHeadersStr(e.target.value)}
              rows={4}
              placeholder='{\n  "Authorization": "Bearer {{authToken}}"\n}'
              className="w-full bg-slate-950 text-indigo-300 font-mono text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500/50 resize-y leading-relaxed"
            />
            <div className="text-[11px] text-slate-500">Provide headers as valid JSON key-value pairs.</div>
          </div>
        )}

        {activeReqTab === 'tests' && (
          <div className="space-y-1">
            <textarea
              value={testScript}
              onChange={(e) => setTestScript(e.target.value)}
              rows={5}
              placeholder={`pm.test("Status is 200 OK", function () {\n    pm.response.to.have.status(200);\n});`}
              className="w-full bg-slate-950 text-purple-300 font-mono text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-purple-500/50 resize-y leading-relaxed"
            />
            <div className="text-[11px] text-slate-500">Supported: pm.test, pm.response.to.have.status, pm.expect, pm.environment.set</div>
          </div>
        )}
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
            <div className="text-xs opacity-90 mt-0.5">{verificationFeedback.message}</div>
          </div>
        </div>
      )}

      {/* Response Panel */}
      {response && (
        <div className="border-t border-slate-800 bg-slate-950">
          {/* Response Status Bar */}
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px]">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 rounded-full font-bold border ${statusColor(response.status)}`}>
                {response.status} {response.statusText}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>{response.responseTimeMs} ms</span>
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveResTab('body')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeResTab === 'body' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Body
              </button>
              <button
                onClick={() => setActiveResTab('headers')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeResTab === 'headers' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Headers
              </button>
              <button
                onClick={() => setActiveResTab('tests')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                  activeResTab === 'tests' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Test Results</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-700 text-[10px] text-white">
                  {response.testResults.filter((t) => t.passed).length}/{response.testResults.length}
                </span>
              </button>
            </div>
          </div>

          {/* Response Tab Content */}
          <div className="p-4 font-mono text-xs max-h-72 overflow-y-auto">
            {activeResTab === 'body' && (
              response.data === null ? (
                <div className="text-slate-500 italic">(Empty response body - 204 No Content)</div>
              ) : (
                <pre className="text-emerald-300 leading-relaxed whitespace-pre-wrap">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              )
            )}

            {activeResTab === 'headers' && (
              <div className="space-y-1">
                {Object.entries(response.headers).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2">
                    <span className="text-indigo-400 font-semibold">{k}:</span>
                    <span className="text-slate-300">{v}</span>
                  </div>
                ))}
              </div>
            )}

            {activeResTab === 'tests' && (
              <div className="space-y-2">
                {response.testResults.length === 0 ? (
                  <div className="text-slate-500">No test assertions written in the Tests tab.</div>
                ) : (
                  response.testResults.map((t, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                        t.passed
                          ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-800/80 text-rose-300'
                      }`}
                    >
                      {t.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-bold">{t.name}</div>
                        {t.error && <div className="text-[11px] text-rose-400 mt-0.5 font-mono">{t.error}</div>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
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
            <span>{hints[activeHintIndex]}</span>
          </div>
          {hints.length > 1 && (
            <button
              onClick={() => setActiveHintIndex((prev) => (prev + 1) % hints.length)}
              className="text-amber-400 hover:text-amber-300 text-[11px] font-semibold cursor-pointer"
            >
              Next Hint &rarr;
            </button>
          )}
        </div>
      )}
    </div>
  );
};
