import React, { useState } from 'react';
import { Send, RotateCcw } from 'lucide-react';

export const JmeterHttpRequestStudio: React.FC = () => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'>('POST');
  const [path, setPath] = useState('/api/v1/products');
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([
    { key: 'Content-Type', value: 'application/json' },
    { key: 'Accept', value: 'application/json' },
  ]);
  const [body, setBody] = useState('{\n  "name": "Wireless Noise-Cancelling Headphones",\n  "sku": "WNC-880",\n  "price": 149.99,\n  "category": "Electronics"\n}');
  const [activeTab, setActiveTab] = useState<'body' | 'headers' | 'params'>('body');

  const [response, setResponse] = useState<{
    status: number;
    statusText: string;
    latencyMs: number;
    headers: Record<string, string>;
    body: any;
    isValidJson: boolean;
  } | null>(null);

  const [isSending, setIsSending] = useState(false);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleRemoveHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...headers];
    updated[index][field] = val;
    setHeaders(updated);
  };

  const handleSend = () => {
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      const hasContentTypeJson = headers.some(
        (h) => h.key.trim().toLowerCase() === 'content-type' && h.value.includes('application/json')
      );

      // Check if body is valid JSON for POST/PUT
      let isValidJson = true;
      let parsedBody: any = null;
      if (['POST', 'PUT', 'PATCH'].includes(method)) {
        try {
          parsedBody = JSON.parse(body);
        } catch {
          isValidJson = false;
        }
      }

      if (['POST', 'PUT', 'PATCH'].includes(method) && !hasContentTypeJson) {
        setResponse({
          status: 415,
          statusText: 'Unsupported Media Type',
          latencyMs: 38,
          headers: { 'Content-Type': 'application/json', 'Server': 'Kestrel' },
          body: {
            error: 'Unsupported Media Type',
            message: 'Content-Type header must be application/json when sending a request payload body.',
            status: 415,
          },
          isValidJson: true,
        });
        return;
      }

      if (['POST', 'PUT', 'PATCH'].includes(method) && !isValidJson) {
        setResponse({
          status: 400,
          statusText: 'Bad Request',
          latencyMs: 44,
          headers: { 'Content-Type': 'application/json' },
          body: {
            error: 'Bad Request',
            message: 'Malformed JSON payload body. Verify closing quotes, commas, and curly braces.',
            status: 400,
          },
          isValidJson: false,
        });
        return;
      }

      // Valid mock response
      if (method === 'POST') {
        setResponse({
          status: 201,
          statusText: 'Created',
          latencyMs: 72,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Location': `/api/v1/products/prod_99812`,
            'X-Response-Time': '72ms',
          },
          body: {
            id: 'prod_99812',
            ...parsedBody,
            createdAt: '2026-11-02T16:00:00Z',
            status: 'ACTIVE',
          },
          isValidJson: true,
        });
      } else if (method === 'GET') {
        setResponse({
          status: 200,
          statusText: 'OK',
          latencyMs: 48,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-cache',
            'X-Response-Time': '48ms',
          },
          body: {
            items: [
              { id: 'prod_101', name: 'Ergonomic Mechanical Keyboard', price: 99.0 },
              { id: 'prod_102', name: 'Ultra-Wide 4K Monitor', price: 449.0 },
            ],
            total: 2,
            page: 1,
          },
          isValidJson: true,
        });
      } else if (method === 'DELETE') {
        setResponse({
          status: 204,
          statusText: 'No Content',
          latencyMs: 32,
          headers: { 'X-Response-Time': '32ms' },
          body: null,
          isValidJson: true,
        });
      } else {
        setResponse({
          status: 200,
          statusText: 'OK',
          latencyMs: 55,
          headers: { 'Content-Type': 'application/json' },
          body: { success: true, updated: parsedBody },
          isValidJson: true,
        });
      }
    }, 500);
  };

  const handleReset = () => {
    setMethod('POST');
    setPath('/api/v1/products');
    setHeaders([
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' },
    ]);
    setBody('{\n  "name": "Wireless Noise-Cancelling Headphones",\n  "sku": "WNC-880",\n  "price": 149.99,\n  "category": "Electronics"\n}');
    setResponse(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Interactive Lab 3
            </span>
            <span className="text-xs text-slate-400">REST API Studio</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">
            HTTP Request Sampler &amp; API Validation Studio
          </h3>
          <p className="text-xs text-slate-400">
            Configure HTTP methods, query paths, headers, and JSON body payloads against our deterministic mock API.
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
            onClick={handleSend}
            disabled={isSending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-xs tracking-wide shadow-lg shadow-rose-900/40 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${isSending ? 'animate-pulse' : ''}`} />
            <span>{isSending ? 'Sending Sample...' : 'Send HTTP Sample'}</span>
          </button>
        </div>
      </div>

      {/* URL & Method Bar */}
      <div className="flex flex-col sm:flex-row gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as any)}
          aria-label="HTTP Method"
          className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono font-bold text-rose-400 focus:outline-none focus:border-rose-500"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>

        <div className="flex-1 flex items-center px-3 bg-slate-900 border border-slate-700 rounded-lg">
          <span className="text-xs font-mono text-slate-500 mr-1 select-none">https://mock-api.rootaccess.co.in</span>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            aria-label="API Path"
            placeholder="/api/v1/products"
            className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('body')}
          className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'body'
              ? 'border-rose-500 text-rose-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Body Data (JSON)
        </button>
        <button
          onClick={() => setActiveTab('headers')}
          className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'headers'
              ? 'border-rose-500 text-rose-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Header Manager ({headers.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'body' && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Raw JSON Payload (HTTP Request Body Data):</span>
            <span className="text-[11px] font-mono text-slate-500">format: application/json</span>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            aria-label="Raw JSON Payload"
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-rose-500 leading-relaxed"
          />
        </div>
      )}

      {activeTab === 'headers' && (
        <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-semibold">HTTP Header Manager Elements:</span>
            <button
              onClick={handleAddHeader}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              + Add Header
            </button>
          </div>

          <div className="space-y-2">
            {headers.map((h, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Header Name"
                  aria-label="Header Name"
                  value={h.key}
                  onChange={(e) => handleHeaderChange(i, 'key', e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
                />
                <input
                  type="text"
                  placeholder="Header Value"
                  aria-label="Header Value"
                  value={h.value}
                  onChange={(e) => handleHeaderChange(i, 'value', e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-white"
                />
                <button
                  onClick={() => handleRemoveHeader(i)}
                  className="text-slate-500 hover:text-rose-400 text-xs px-2"
                  title="Remove Header"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response Inspector Panel */}
      {response && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span
                className={`font-mono font-bold text-xs px-2.5 py-1 rounded-md ${
                  response.status >= 200 && response.status < 300
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                HTTP {response.status} {response.statusText}
              </span>
              <span className="text-xs font-mono text-slate-400">Elapsed: {response.latencyMs}ms</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">View Results Tree</span>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Response Body:</div>
            <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto border border-slate-800">
              {response.body ? JSON.stringify(response.body, null, 2) : '(No response body)'}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
