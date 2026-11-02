import React, { useState } from 'react';
import { KeyRound, Play, RotateCcw, ArrowDown, CheckCircle2, AlertCircle } from 'lucide-react';

export const JmeterJsonExtractorCorrelator: React.FC = () => {
  const [jsonPath, setJsonPath] = useState('$.data.jwt');
  const [variableName, setVariableName] = useState('authToken');
  const [defaultValue, setDefaultValue] = useState('AUTH_NOT_FOUND');

  // Simulated Login Response
  const loginResponse = {
    code: 200,
    body: {
      success: true,
      data: {
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c3JfODkwMTIifQ.9aXbQ',
        expiresIn: 3600,
        role: 'CUSTOMER',
      },
    },
  };

  const [hasExecuted, setHasExecuted] = useState(false);

  // Evaluate JSONPath safely on mock object
  let extractedToken = defaultValue;
  let isExtractionValid = false;

  if (jsonPath.trim() === '$.data.jwt') {
    extractedToken = loginResponse.body.data.jwt;
    isExtractionValid = true;
  } else if (jsonPath.trim() === '$.jwt') {
    extractedToken = defaultValue; // Not at root level!
  } else if (jsonPath.trim() === '$.data.token') {
    extractedToken = defaultValue; // Property is 'jwt', not 'token'!
  }

  // Downstream Profile Request evaluation
  const downstreamAuthHeader = `Bearer \${${variableName}}`;
  const resolvedAuthHeader = `Bearer ${extractedToken}`;
  const isDownstreamAuthorized = isExtractionValid && variableName.trim() === 'authToken';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Interactive Lab 6
            </span>
            <span className="text-xs text-slate-400">Correlation Engine</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            Dynamic Token Correlation &amp; JSON Extractor Lab
          </h3>
          <p className="text-xs text-slate-400">
            Extract dynamic session tokens from authentication responses and chain them into downstream requests.
          </p>
        </div>

        <button
          onClick={() => {
            setJsonPath('$.data.jwt');
            setVariableName('authToken');
            setDefaultValue('AUTH_NOT_FOUND');
            setHasExecuted(false);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Step 1: Upstream Login Response */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">
              Step 1: POST /api/v1/auth/login Response Body (HTTP 200 OK)
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Server generated JWT token</span>
          </div>

          <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800">
            {JSON.stringify(loginResponse.body, null, 2)}
          </pre>
        </div>

        {/* Arrow Divider */}
        <div className="flex items-center justify-center text-slate-500 gap-2 font-mono text-xs">
          <ArrowDown className="w-4 h-4 text-rose-400 animate-bounce" />
          <span>JSON Extractor Post-Processor Executes</span>
          <ArrowDown className="w-4 h-4 text-rose-400 animate-bounce" />
        </div>

        {/* Step 2: Extractor Config Form */}
        <div className="p-4 bg-slate-950/80 rounded-xl border border-rose-500/30 space-y-4">
          <div className="text-xs font-semibold text-rose-300 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-rose-400" />
            <span>JSON Extractor Configuration Properties</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">JSONPath Expression:</label>
              <input
                type="text"
                value={jsonPath}
                onChange={(e) => setJsonPath(e.target.value)}
                placeholder="$.data.jwt"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Target Variable Name:</label>
              <input
                type="text"
                value={variableName}
                onChange={(e) => setVariableName(e.target.value)}
                placeholder="authToken"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Default Fallback Value:</label>
              <input
                type="text"
                value={defaultValue}
                onChange={(e) => setDefaultValue(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Extracted Runtime Value:</span>
            <span className={`font-bold truncate max-w-md ${isExtractionValid ? 'text-emerald-400' : 'text-rose-400'}`}>
              ${'{' + variableName + '}'} = &quot;{extractedToken}&quot;
            </span>
          </div>
        </div>

        {/* Step 3: Downstream Request Verification */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">
              Step 2: GET /api/v1/user/profile Request (Downstream Authorization)
            </span>
            <button
              onClick={() => setHasExecuted(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Test Chained Call</span>
            </button>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 text-xs font-mono">
            <div className="text-slate-400">Request Header Sent Over Wire ({downstreamAuthHeader}):</div>
            <div className="text-slate-200">
              Authorization: <span className="text-sky-400 font-bold">{resolvedAuthHeader}</span>
            </div>
          </div>

          {hasExecuted && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                isDownstreamAuthorized
                  ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
              }`}
            >
              {isDownstreamAuthorized ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    ✓ HTTP 200 OK: Downstream profile request authenticated successfully with the dynamic token!
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    ✗ HTTP 401 Unauthorized: Extractor failed to find token. Sent fallback value &quot;{extractedToken}&quot;.
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
