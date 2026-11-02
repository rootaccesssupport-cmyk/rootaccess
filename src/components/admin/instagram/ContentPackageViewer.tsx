import React, { useState } from 'react';
import {
  Video,
  Layers,
  FileText,
  ShieldCheck,
  Copy,
  Check,
  Save,
  RefreshCw,
  ExternalLink,
  Calendar,
  CopyCheck,
  CheckCircle2,
  Hash,
  MessageSquare,
} from 'lucide-react';
import {
  InstagramPostDraft,
  PostStatus,
} from '../../../types/instagramCreator';

interface ContentPackageViewerProps {
  draft: InstagramPostDraft;
  onUpdateDraft: (updated: InstagramPostDraft) => void;
  onSaveDraft: (draft: InstagramPostDraft) => Promise<void>;
  onDuplicateDraft?: (id: string) => Promise<void>;
  onRegenerateSection: (
    draft: InstagramPostDraft,
    section: 'hook' | 'script' | 'carousel' | 'caption' | 'engagement'
  ) => void;
}

export const ContentPackageViewer: React.FC<ContentPackageViewerProps> = ({
  draft,
  onUpdateDraft,
  onSaveDraft,
  onDuplicateDraft,
  onRegenerateSection,
}) => {
  const [activeTab, setActiveTab] = useState<'reel' | 'carousel' | 'caption' | 'research' | 'settings'>('reel');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveFeedback(null);
    try {
      await onSaveDraft(draft);
      setSaveFeedback('Draft saved successfully!');
      setTimeout(() => setSaveFeedback(null), 3000);
    } catch (err: any) {
      setSaveFeedback(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Format full package for copying
  const getFullPackageText = () => {
    return `========================================
ROOTACCESS INSTAGRAM CONTENT PACKAGE
========================================
Topic: ${draft.topicTitle}
Category: ${draft.category}
Format: ${draft.recommendedFormat}
Target Audience: ${draft.targetAudience}
Difficulty: ${draft.difficultyLevel}
Learning Objective: ${draft.learningObjective}

----------------------------------------
1. INSTAGRAM REEL SCRIPT & DIRECTIONS
----------------------------------------
Hook:
${draft.reel.hook}

Cover Title:
${draft.reel.coverTitle}

Spoken Script (${draft.reel.durationSeconds}s):
${draft.reel.script}

Visual Directions:
${draft.reel.visualDirections}

On-Screen Text:
${draft.reel.onScreenText}

Code Snippet:
${draft.reel.codeSnippet || 'N/A'}

Transitions:
${draft.reel.transitions}

Closing CTA:
${draft.reel.closingCta}

----------------------------------------
2. CAROUSEL SLIDES
----------------------------------------
Headline: ${draft.carousel.headline}
Design Guidance: ${draft.carousel.designGuidance}

${draft.carousel.slides
  .map(
    (s) => `[Slide ${s.slideNumber}: ${s.headline}]
${s.bodyText}
${s.codeSnippet ? `Code:\n${s.codeSnippet}\n` : ''}Visual Note: ${s.visualNote}\n`
  )
  .join('\n')}

----------------------------------------
3. READY-TO-COPY CAPTION & HASHTAGS
----------------------------------------
${draft.caption.captionText}

Engagement Question:
${draft.caption.engagementQuestion}

Hashtags:
${draft.caption.hashtags.join(' ')}

Search Keywords:
${draft.caption.searchKeywords.join(', ')}

----------------------------------------
4. TECHNICAL VERIFICATION & SOURCES
----------------------------------------
Verified Facts:
${draft.research.verifiedFacts.map((f) => `• ${f}`).join('\n')}

Official Sources:
${draft.research.officialDocSources.map((s) => `• ${s.title}: ${s.url} (Checked: ${s.dateChecked})`).join('\n')}
`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100 animate-fadeIn">
      {/* Top Header Bar */}
      <div className="p-6 bg-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                draft.status === 'published'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : draft.status === 'ready'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}
            >
              {draft.status === 'published' ? '● Published' : draft.status === 'ready' ? '● Ready to Publish' : '● Draft'}
            </span>

            <span className="text-xs text-slate-400">
              {draft.category}
            </span>

            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">
              Format: <strong className="text-white">{draft.recommendedFormat}</strong>
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            {draft.topicTitle}
          </h3>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {saveFeedback && (
            <span className="text-xs font-semibold text-emerald-400 animate-fadeIn mr-2">
              {saveFeedback}
            </span>
          )}

          <button
            onClick={() => copyToClipboard(getFullPackageText(), 'full_package')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Copy entire content package to clipboard"
          >
            {copiedItem === 'full_package' ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
            <span>{copiedItem === 'full_package' ? 'Copied Full!' : 'Copy Full Package'}</span>
          </button>

          {onDuplicateDraft && (
            <button
              onClick={() => onDuplicateDraft(draft.id)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Duplicate this draft"
            >
              <CopyCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Duplicate</span>
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white transition-all shadow-md shadow-rose-600/30 cursor-pointer disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 p-2 bg-slate-950/60 border-b border-slate-800 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('reel')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'reel'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Instagram Reel</span>
        </button>

        <button
          onClick={() => setActiveTab('carousel')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'carousel'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Carousel ({draft.carousel.slides.length} Slides)</span>
        </button>

        <button
          onClick={() => setActiveTab('caption')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'caption'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Caption &amp; Hashtags</span>
        </button>

        <button
          onClick={() => setActiveTab('research')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'research'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Technical Research &amp; Sources</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-rose-600 text-white shadow-sm font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Post Status &amp; Schedule</span>
        </button>
      </div>

      {/* TAB 1: INSTAGRAM REEL */}
      {activeTab === 'reel' && (
        <div className="p-6 space-y-6">
          {/* Reel Top Bar with Copy Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Reel Format Guide
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-300">
                Target Duration: <strong>{draft.reel.durationSeconds} seconds</strong> (Optimal 20–40s)
              </span>
            </div>

            <button
              onClick={() => copyToClipboard(draft.reel.script, 'reel_script')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              {copiedItem === 'reel_script' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>{copiedItem === 'reel_script' ? 'Copied Script!' : 'Copy Script'}</span>
            </button>
          </div>

          {/* Section 1: Opening Hook */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>1. Opening Hook (First 1–3 Seconds)</span>
              </div>
              <button
                onClick={() => onRegenerateSection(draft, 'hook')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate Hook</span>
              </button>
            </div>

            <textarea
              value={draft.reel.hook}
              onChange={(e) =>
                onUpdateDraft({
                  ...draft,
                  reel: { ...draft.reel, hook: e.target.value },
                })
              }
              rows={2}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-rose-500 transition-colors"
            />
            <p className="text-[11px] text-slate-400 italic">
              Hook Rationale: {draft.reel.hookRationale}
            </p>
          </div>

          {/* Section 2: Spoken Script */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>2. Complete Spoken Script (Timestamped)</span>
              </div>
              <button
                onClick={() => onRegenerateSection(draft, 'script')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate Script</span>
              </button>
            </div>

            <textarea
              value={draft.reel.script}
              onChange={(e) =>
                onUpdateDraft({
                  ...draft,
                  reel: { ...draft.reel, script: e.target.value },
                })
              }
              rows={6}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-slate-200 focus:outline-none focus:border-rose-500 transition-colors leading-relaxed"
            />
          </div>

          {/* Section 3: Visual & Camera Directions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Scene-by-Scene Visual Directions</span>
              </div>
              <textarea
                value={draft.reel.visualDirections}
                onChange={(e) =>
                  onUpdateDraft({
                    ...draft,
                    reel: { ...draft.reel, visualDirections: e.target.value },
                  })
                }
                rows={5}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-rose-500 transition-colors leading-relaxed"
              />
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>On-Screen Text Overlays &amp; Transitions</span>
              </div>
              <textarea
                value={draft.reel.onScreenText}
                onChange={(e) =>
                  onUpdateDraft({
                    ...draft,
                    reel: { ...draft.reel, onScreenText: e.target.value },
                  })
                }
                rows={2}
                placeholder="Text overlays appearing during video..."
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-rose-500 transition-colors"
              />
              <div className="pt-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Transitions:</span>{' '}
                {draft.reel.transitions}
              </div>
              <div className="text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Cover Title:</span>{' '}
                {draft.reel.coverTitle}
              </div>
            </div>
          </div>

          {/* Section 4: Code Snippet (if applicable) */}
          {draft.reel.codeSnippet && (
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Technical Code Example</span>
                </div>
                <button
                  onClick={() => copyToClipboard(draft.reel.codeSnippet || '', 'code_snippet')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedItem === 'code_snippet' ? 'Copied Code!' : 'Copy Code'}</span>
                </button>
              </div>

              <textarea
                value={draft.reel.codeSnippet}
                onChange={(e) =>
                  onUpdateDraft({
                    ...draft,
                    reel: { ...draft.reel, codeSnippet: e.target.value },
                  })
                }
                rows={5}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
          )}

          {/* Closing Brand CTA */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-rose-500/20 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-rose-400">RootAccess Closing CTA:</span>{' '}
              {draft.reel.closingCta}
            </div>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-rose-500/10 text-rose-400 border border-rose-500/30 shrink-0">
              Learn by Doing
            </span>
          </div>
        </div>
      )}

      {/* TAB 2: CAROUSEL SLIDES */}
      {activeTab === 'carousel' && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Carousel Layout
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Headline: <strong className="text-white">{draft.carousel.headline}</strong>
              </p>
            </div>

            <button
              onClick={() => {
                const slidesText = draft.carousel.slides
                  .map(
                    (s) =>
                      `--- SLIDE ${s.slideNumber} (${s.slideType.toUpperCase()}) ---\n${s.headline}\n\n${s.bodyText}${
                        s.codeSnippet ? `\n\nCode:\n${s.codeSnippet}` : ''
                      }`
                  )
                  .join('\n\n');
                copyToClipboard(slidesText, 'carousel_slides');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              {copiedItem === 'carousel_slides' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span>{copiedItem === 'carousel_slides' ? 'Copied All Slides!' : 'Copy Slides Text'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 italic">
            Design Guidance: {draft.carousel.designGuidance}
          </div>

          {/* Slides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {draft.carousel.slides.map((slide, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-3 relative group hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                      Slide {slide.slideNumber} • {slide.slideType}
                    </span>
                  </div>

                  <input
                    type="text"
                    value={slide.headline}
                    onChange={(e) => {
                      const updatedSlides = [...draft.carousel.slides];
                      updatedSlides[idx].headline = e.target.value;
                      onUpdateDraft({
                        ...draft,
                        carousel: { ...draft.carousel, slides: updatedSlides },
                      });
                    }}
                    className="w-full font-bold text-white text-sm bg-transparent border-b border-transparent hover:border-slate-700 focus:border-rose-500 focus:outline-none mb-2 pb-0.5"
                  />

                  <textarea
                    value={slide.bodyText}
                    onChange={(e) => {
                      const updatedSlides = [...draft.carousel.slides];
                      updatedSlides[idx].bodyText = e.target.value;
                      onUpdateDraft({
                        ...draft,
                        carousel: { ...draft.carousel, slides: updatedSlides },
                      });
                    }}
                    rows={4}
                    className="w-full text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-xl p-2.5 focus:outline-none focus:border-rose-500 leading-relaxed"
                  />

                  {slide.codeSnippet && (
                    <div className="mt-2 p-2 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                      {slide.codeSnippet}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 italic">
                  Visual Note: {slide.visualNote}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CAPTION & HASHTAGS */}
      {activeTab === 'caption' && (
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Caption &amp; Discovery Optimization
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Formatted with line breaks, natural engagement question, and curated hashtags.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => copyToClipboard(draft.caption.hashtags.join(' '), 'hashtags')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                {copiedItem === 'hashtags' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Hash className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>{copiedItem === 'hashtags' ? 'Copied Tags!' : 'Copy Hashtags'}</span>
              </button>

              <button
                onClick={() =>
                  copyToClipboard(
                    `${draft.caption.captionText}\n\n${draft.caption.hashtags.join(' ')}`,
                    'caption'
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
              >
                {copiedItem === 'caption' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>{copiedItem === 'caption' ? 'Copied Caption!' : 'Copy Full Caption'}</span>
              </button>
            </div>
          </div>

          {/* Caption Textarea */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Ready-to-Copy Instagram Caption
              </span>
              <button
                onClick={() => onRegenerateSection(draft, 'caption')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Regenerate Caption</span>
              </button>
            </div>

            <textarea
              value={draft.caption.captionText}
              onChange={(e) =>
                onUpdateDraft({
                  ...draft,
                  caption: { ...draft.caption, captionText: e.target.value },
                })
              }
              rows={8}
              className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-rose-500 transition-colors leading-relaxed"
            />
          </div>

          {/* Engagement Question & Search Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                  <span>Engagement Question</span>
                </span>
                <button
                  onClick={() => onRegenerateSection(draft, 'engagement')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Regenerate</span>
                </button>
              </div>

              <textarea
                value={draft.caption.engagementQuestion}
                onChange={(e) =>
                  onUpdateDraft({
                    ...draft,
                    caption: { ...draft.caption, engagementQuestion: e.target.value },
                  })
                }
                rows={3}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-indigo-400" />
                <span>Search Keywords &amp; Hashtags</span>
              </span>

              <div className="flex flex-wrap gap-1.5">
                {draft.caption.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] font-mono bg-slate-900 text-indigo-300 rounded-md border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Keywords:</span>{' '}
                {draft.caption.searchKeywords.join(', ')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TECHNICAL RESEARCH & SOURCES */}
      {activeTab === 'research' && (
        <div className="p-6 space-y-6">
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Technical Education Verification Guarantee
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every code snippet and technical concept is verified against official documentation (PostgreSQL, Postman, Playwright). Zero invented statistics or ungrounded claims.
              </p>
            </div>
          </div>

          {/* Verified Facts */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Verified Facts in this Content</span>
            </span>

            <ul className="space-y-2 text-xs text-slate-300">
              {draft.research.verifiedFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Sources */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Official Documentation &amp; Reference Sources
            </span>

            <div className="space-y-2">
              {draft.research.officialDocSources.map((source, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{source.title}</div>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 mt-0.5 truncate max-w-md"
                    >
                      <span>{source.url}</span>
                      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                    </a>
                  </div>
                  <div className="text-[10px] text-slate-500 shrink-0">
                    Checked: {source.dateChecked}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: POST STATUS & SCHEDULE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Publishing Workflow Status
              </span>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Status</label>
                <select
                  value={draft.status}
                  onChange={(e) =>
                    onUpdateDraft({
                      ...draft,
                      status: e.target.value as PostStatus,
                    })
                  }
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="draft">Draft (Work in progress)</option>
                  <option value="ready">Ready to Publish (Approved)</option>
                  <option value="published">Published (Live on Instagram)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Planned Publishing Date</label>
                <input
                  type="date"
                  value={draft.plannedDate || ''}
                  onChange={(e) =>
                    onUpdateDraft({
                      ...draft,
                      plannedDate: e.target.value,
                    })
                  }
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              {draft.status === 'published' && (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Actual Published Date</label>
                  <input
                    type="date"
                    value={draft.publishedDate || ''}
                    onChange={(e) =>
                      onUpdateDraft({
                        ...draft,
                        publishedDate: e.target.value,
                      })
                    }
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              )}

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Optional Instagram Post URL (e.g. https://instagram.com/p/...)
                </label>
                <input
                  type="url"
                  placeholder="https://instagram.com/p/..."
                  value={draft.postUrl || ''}
                  onChange={(e) =>
                    onUpdateDraft({
                      ...draft,
                      postUrl: e.target.value,
                    })
                  }
                  className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Admin Notes &amp; Provenance
              </span>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Admin Notes (Private)</label>
                <textarea
                  value={draft.adminNotes || ''}
                  onChange={(e) =>
                    onUpdateDraft({
                      ...draft,
                      adminNotes: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Notes on filming props, caption variations, or team approvals..."
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-xl text-[11px] text-slate-400 space-y-1">
                <div>
                  <span className="font-semibold text-slate-300">Generation Source:</span>{' '}
                  <span className="uppercase">{draft.generationSource.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-300">Created:</span>{' '}
                  {new Date(draft.createdAt).toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold text-slate-300">Last Modified:</span>{' '}
                  {new Date(draft.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
