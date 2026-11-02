import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Info,
} from 'lucide-react';
import {
  AiSettings,
} from '../../../types/instagramCreator';
import {
  instagramAiService,
} from '../../../services/instagramAiService';

interface AiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsSaved: (updated: AiSettings) => void;
}

export const AiSettingsModal: React.FC<AiSettingsModalProps> = ({
  isOpen,
  onClose,
  onSettingsSaved,
}) => {
  const current = instagramAiService.getSettings();
  const [provider, setProvider] = useState<'none' | 'gemini' | 'openai'>(current.provider);
  const [apiKey, setApiKey] = useState(current.apiKey || '');
  const [modelName, setModelName] = useState(current.modelName || 'gemini-1.5-flash');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = instagramAiService.saveSettings({
      provider: apiKey.trim() ? provider : 'none',
      apiKey: apiKey.trim(),
      modelName: modelName.trim(),
    });
    setFeedback('Settings saved successfully!');
    onSettingsSaved(updated);
    setTimeout(() => {
      setFeedback(null);
      onClose();
    }, 1500);
  };

  const handleClear = () => {
    const updated = instagramAiService.saveSettings({
      provider: 'none',
      apiKey: '',
      modelName: '',
    });
    setApiKey('');
    setProvider('none');
    setFeedback('AI keys cleared. Using Curated Knowledge Engine.');
    onSettingsSaved(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-100">
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Provider Integration</h3>
              <p className="text-xs text-slate-400">Configure Google Gemini or OpenAI (Optional)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* Status Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <div className="font-bold text-white">
                {current.isConfigured ? '🟢 Live AI Provider Active' : '⚪ Curated Knowledge Engine Active'}
              </div>
              <p className="text-slate-400 leading-relaxed">
                If no AI key is entered, RootAccess seamlessly runs its Curated Engineering Knowledge Engine. All content packages remain 100% verified, educational, and ready to publish.
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              AI Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as any)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-rose-500"
            >
              <option value="none">None (Use RootAccess Curated Technical Engine)</option>
              <option value="gemini">Google Gemini API (Recommended)</option>
              <option value="openai">OpenAI API (GPT-4o)</option>
            </select>
          </div>

          {provider !== 'none' && (
            <>
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy... or sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Keys are stored exclusively in your local administrative session and are never broadcast to public visitors.
                </p>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  Model Identifier
                </label>
                <input
                  type="text"
                  placeholder={provider === 'gemini' ? 'gemini-1.5-flash' : 'gpt-4o-mini'}
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </>
          )}

          {feedback && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-400">
              {feedback}
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            >
              Clear Keys
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-xs font-bold text-white rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
