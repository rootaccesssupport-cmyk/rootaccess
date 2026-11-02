import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Layers,
  Image as ImageIcon,
  Search,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Settings,
  Trash2,
  Copy,
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { AdminNavHeader } from '../../components/admin/AdminNavHeader';
import { TopicCard } from '../../components/admin/instagram/TopicCard';
import { ContentPackageViewer } from '../../components/admin/instagram/ContentPackageViewer';
import { SevenDayPlannerModal } from '../../components/admin/instagram/SevenDayPlannerModal';
import { ContentCalendarView } from '../../components/admin/instagram/ContentCalendarView';
import { AiSettingsModal } from '../../components/admin/instagram/AiSettingsModal';
import { useAuth } from '../../context/AuthContext';
import { ENROLLMENT_PAYMENT_CONFIG } from '../../data/enrollmentPaymentConfig';
import {
  InstagramPostDraft,
  PlannerDay,
  SevenDayPlan,
  AiSettings,
} from '../../types/instagramCreator';
import {
  INSTAGRAM_CATEGORIES,
  INSTAGRAM_TOPIC_BANK,
  PreCuratedTopicTemplate,
} from '../../data/instagramTopicBank';
import { instagramCreatorService } from '../../services/instagramCreatorService';
import { instagramAiService } from '../../services/instagramAiService';

export const AdminInstagramCreatorPage: React.FC = () => {
  const { user, profile } = useAuth();

  // Strict Admin Authorization check
  const isAdmin =
    ENROLLMENT_PAYMENT_CONFIG.isAdminEmail(user?.email) ||
    profile?.role === 'admin' ||
    user?.email === 'pavankalyan.d@gmail.com';

  // Topic & Generation State
  const [recommendedTopic, setRecommendedTopic] = useState<PreCuratedTopicTemplate>(
    INSTAGRAM_TOPIC_BANK[0]
  );
  const [activeDraft, setActiveDraft] = useState<InstagramPostDraft | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegeneratingTopic, setIsRegeneratingTopic] = useState(false);

  // Content Management State
  const [drafts, setDrafts] = useState<InstagramPostDraft[]>([]);
  const [loadingDrafts, setLoadingDrafts] = useState(true);
  const [activeListTab, setActiveListTab] = useState<'drafts' | 'ready' | 'published' | 'calendar' | 'recent_topics'>('drafts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals State
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<SevenDayPlan | null>(null);
  const [aiSettingsOpen, setAiSettingsOpen] = useState(false);
  const [aiSettings, setAiSettings] = useState<AiSettings>(instagramAiService.getSettings());
  const [noticeMessage, setNoticeMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Load drafts and initial topic
  const loadDrafts = useCallback(async () => {
    setLoadingDrafts(true);
    try {
      const data = await instagramCreatorService.getAllDrafts();
      setDrafts(data);
    } catch (err) {
      console.error('Failed to load drafts:', err);
    } finally {
      setLoadingDrafts(false);
    }
  }, []);

  const loadRecommendedTopic = useCallback(async () => {
    try {
      const topic = await instagramCreatorService.getRecommendedTopic();
      setRecommendedTopic(topic);
      // Automatically open draft so the Image Generator is visible on page load
      setActiveDraft((current) => {
        if (!current) {
          return instagramCreatorService.createDraftFromTemplate(topic);
        }
        return current;
      });
    } catch (err) {
      console.error('Failed to load recommended topic:', err);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadDrafts();
      loadRecommendedTopic();
    }
  }, [isAdmin, loadDrafts, loadRecommendedTopic]);

  // Authorization fallback
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">
              Administrator Access Required
            </h1>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              The Instagram Creator dashboard is strictly restricted to authorized RootAccess administrators.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-500 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Student Dashboard</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle Generate Today's Content
  const handleGenerateToday = async () => {
    setIsGenerating(true);
    setNoticeMessage(null);
    try {
      // Check if AI is configured and attempt generation
      if (aiSettings.isConfigured) {
        const aiRes = await instagramAiService.generateWithAi(
          recommendedTopic.topicTitle,
          recommendedTopic.category
        );
        if (aiRes.success && aiRes.draft) {
          const newDraft = instagramCreatorService.createDraftFromTemplate({
            ...recommendedTopic,
            reel: { ...recommendedTopic.reel, ...aiRes.draft.reel },
            carousel: { ...recommendedTopic.carousel, ...aiRes.draft.carousel },
            caption: { ...recommendedTopic.caption, ...aiRes.draft.caption },
          });
          newDraft.generationSource = aiRes.providerUsed;
          setActiveDraft(newDraft);
          await instagramCreatorService.saveDraft(newDraft);
          await loadDrafts();
          setNoticeMessage({
            type: 'success',
            text: `Generated content package using ${aiRes.providerUsed === 'gemini_ai' ? 'Gemini AI' : 'AI Provider'}!`,
          });
          return;
        }
      }

      // Default to Curated Engine
      const newDraft = instagramCreatorService.createDraftFromTemplate(recommendedTopic);
      setActiveDraft(newDraft);
      await instagramCreatorService.saveDraft(newDraft);
      await loadDrafts();
      setNoticeMessage({
        type: 'success',
        text: 'Generated complete educational package from RootAccess Curated Engineering Engine!',
      });
    } catch (err: any) {
      setNoticeMessage({ type: 'error', text: `Failed to generate: ${err.message}` });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Regenerate Topic (30-day anti-repetition)
  const handleRegenerateTopic = async () => {
    setIsRegeneratingTopic(true);
    setNoticeMessage(null);
    try {
      const nextTopic = await instagramCreatorService.getRecommendedTopic({
        forceRegenerate: true,
        skipTopicId: recommendedTopic.id,
      });
      setRecommendedTopic(nextTopic);
      setNoticeMessage({
        type: 'info',
        text: 'Regenerated topic! Checked against 30-day history for maximum originality.',
      });
    } catch (err: any) {
      setNoticeMessage({ type: 'error', text: `Failed to regenerate topic: ${err.message}` });
    } finally {
      setIsRegeneratingTopic(false);
    }
  };

  // Handle Open 7-Day Planner
  const handleOpenPlanner = async () => {
    const plan = await instagramCreatorService.generateSevenDayPlan();
    setCurrentPlan(plan);
    setPlannerOpen(true);
  };

  const handleRegeneratePlan = async (startDate?: string) => {
    const plan = await instagramCreatorService.generateSevenDayPlan(startDate);
    setCurrentPlan(plan);
  };

  const handleSelectPlannerDay = (day: PlannerDay) => {
    // Find template matching topic or category
    const template =
      INSTAGRAM_TOPIC_BANK.find((t) => t.topicTitle === day.topicTitle) ||
      INSTAGRAM_TOPIC_BANK.find((t) => t.category === day.category) ||
      INSTAGRAM_TOPIC_BANK[0];

    const newDraft = instagramCreatorService.createDraftFromTemplate(template, day.date);
    setActiveDraft(newDraft);
    instagramCreatorService.saveDraft(newDraft).then(() => loadDrafts());
    setNoticeMessage({
      type: 'success',
      text: `Created draft for ${day.dayOfWeek} (${day.date})!`,
    });
  };

  // Save draft
  const handleSaveDraft = async (draftToSave: InstagramPostDraft) => {
    const res = await instagramCreatorService.saveDraft(draftToSave);
    if (res.success) {
      setActiveDraft(res.draft);
      await loadDrafts();
    }
  };

  // Duplicate draft
  const handleDuplicateDraft = async (id: string) => {
    const copy = await instagramCreatorService.duplicateDraft(id);
    if (copy) {
      setActiveDraft(copy);
      await loadDrafts();
      setNoticeMessage({ type: 'success', text: 'Draft duplicated successfully!' });
    }
  };

  // Delete draft
  const handleDeleteDraft = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) return;
    await instagramCreatorService.deleteDraft(id);
    if (activeDraft?.id === id) setActiveDraft(null);
    await loadDrafts();
  };

  // Section-level regeneration
  const handleRegenerateSection = (
    draft: InstagramPostDraft,
    section: 'image' | 'hook' | 'script' | 'carousel' | 'caption' | 'engagement'
  ) => {
    const updated = instagramCreatorService.regenerateSection(draft, section);
    setActiveDraft(updated);
    instagramCreatorService.saveDraft(updated).then(() => loadDrafts());
    setNoticeMessage({
      type: 'info',
      text: `Regenerated ${section.replace('_', ' ')} while preserving the rest of your draft!`,
    });
  };

  // Filtered drafts list
  const filteredDrafts = drafts.filter((d) => {
    if (activeListTab === 'drafts' && d.status !== 'draft') return false;
    if (activeListTab === 'ready' && d.status !== 'ready') return false;
    if (activeListTab === 'published' && d.status !== 'published') return false;

    if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.topicTitle.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.reel.hook.toLowerCase().includes(q) ||
        d.caption.captionText.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const draftCount = drafts.filter((d) => d.status === 'draft').length;
  const readyCount = drafts.filter((d) => d.status === 'ready').length;
  const publishedCount = drafts.filter((d) => d.status === 'published').length;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 selection:bg-rose-600 selection:text-white">
      <Navbar />
      <AdminNavHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* Top Control Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-900">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold mb-2 border border-rose-500/20">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Instagram Image Creator</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">RootAccess — Learn by Doing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Post Image Generator &amp; Growth Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Generate 100% verified, beginner-friendly Instagram Post Images, Code Terminal Cards, Carousels &amp; Captions grounded in RootAccess's actual engineering courses.
            </p>
          </div>

          {/* Top Quick Actions Strip */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (!activeDraft) {
                  setActiveDraft(instagramCreatorService.createDraftFromTemplate(recommendedTopic));
                }
                const studioEl = document.getElementById('image-studio-section');
                studioEl?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-extrabold text-white transition-all shadow-md shadow-rose-600/30 cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-white" />
              <span>🎨 Image Generator Studio</span>
            </button>

            <button
              onClick={() => setAiSettingsOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              title="Configure AI Provider (Gemini / OpenAI)"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {aiSettings.isConfigured ? 'AI: Gemini Active' : 'AI: Curated Engine'}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  aiSettings.isConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Global Notice Toast */}
        {noticeMessage && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 animate-fadeIn ${
              noticeMessage.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : noticeMessage.type === 'info'
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{noticeMessage.text}</span>
            </div>
            <button
              onClick={() => setNoticeMessage(null)}
              className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 1. TODAY'S RECOMMENDED TOPIC CARD */}
        <TopicCard
          topic={recommendedTopic}
          onGenerate={handleGenerateToday}
          onRegenerate={handleRegenerateTopic}
          onOpenSevenDayPlanner={handleOpenPlanner}
          isGenerating={isGenerating}
          isRegenerating={isRegeneratingTopic}
        />

        {/* 2. ACTIVE IMAGE GENERATOR & CONTENT STUDIO */}
        {activeDraft ? (
          <div id="image-studio-section" className="space-y-4 pt-2 scroll-mt-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <h3 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-rose-400" />
                  <span>Instagram Post Image Generator &amp; Content Studio</span>
                </h3>
              </div>

              <button
                onClick={() => setActiveDraft(null)}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
              >
                Close Studio
              </button>
            </div>

            <ContentPackageViewer
              draft={activeDraft}
              onUpdateDraft={(updated) => setActiveDraft(updated)}
              onSaveDraft={handleSaveDraft}
              onDuplicateDraft={handleDuplicateDraft}
              onRegenerateSection={handleRegenerateSection}
            />
          </div>
        ) : (
          <div className="bg-slate-900 border border-rose-500/30 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Instagram Image Generator Ready</h3>
                <p className="text-xs text-slate-400 mt-0.5">Click below to open today's recommended topic or pick any topic from the bank.</p>
              </div>
            </div>
            <button
              onClick={handleGenerateToday}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-xs font-extrabold text-white transition-all shadow-lg shadow-rose-600/30 cursor-pointer shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open Image Generator Studio</span>
            </button>
          </div>
        )}

        {/* 3. CONTENT REPOSITORY & CALENDAR SECTION */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Content Hub &amp; Post Pipeline</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage saved drafts, review ready-to-post packages, and browse historical topics.
              </p>
            </div>

            {/* List View Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveListTab('drafts')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeListTab === 'drafts'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Saved Drafts</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px]">
                  {draftCount}
                </span>
              </button>

              <button
                onClick={() => setActiveListTab('ready')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeListTab === 'ready'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Ready to Publish</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px]">
                  {readyCount}
                </span>
              </button>

              <button
                onClick={() => setActiveListTab('published')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeListTab === 'published'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Published</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px]">
                  {publishedCount}
                </span>
              </button>

              <button
                onClick={() => setActiveListTab('calendar')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeListTab === 'calendar'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3 h-3" />
                <span>Calendar</span>
              </button>

              <button
                onClick={() => setActiveListTab('recent_topics')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeListTab === 'recent_topics'
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>30-Day Topics</span>
              </button>
            </div>
          </div>

          {/* CALENDAR VIEW */}
          {activeListTab === 'calendar' ? (
            <ContentCalendarView
              drafts={drafts}
              onSelectDraft={(selected) => setActiveDraft(selected)}
            />
          ) : activeListTab === 'recent_topics' ? (
            /* RECENT TOPICS VIEW (Anti-Repetition Audit) */
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span>Recently Used Topics (30-Day Anti-Repetition Log)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Topic recommendation checks these past entries before suggesting new content to prevent repetitive hooks and examples.
                  </p>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {drafts.length} total recorded
                </span>
              </div>

              {drafts.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No recently used topics in database.
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {drafts.slice(0, 15).map((d) => (
                    <div
                      key={d.id}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="text-xs font-bold text-white hover:text-rose-400 cursor-pointer" onClick={() => setActiveDraft(d)}>
                          {d.topicTitle}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span>{d.category}</span>
                          <span>•</span>
                          <span>{d.recommendedFormat}</span>
                          <span>•</span>
                          <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            d.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : d.status === 'ready'
                              ? 'bg-sky-500/10 text-sky-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {d.status}
                        </span>

                        <button
                          onClick={() => setActiveDraft(d)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 transition-colors cursor-pointer"
                        >
                          Inspect
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* SEARCH, FILTER & DRAFTS CARDS LIST */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, keyword, or hook..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-rose-500"
                  >
                    <option value="all">All 10 Categories</option>
                    {INSTAGRAM_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {loadingDrafts ? (
                <div className="text-center py-12 bg-slate-900 rounded-3xl border border-slate-800 text-slate-400">
                  <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs text-slate-400">Loading drafts and calendar...</p>
                </div>
              ) : filteredDrafts.length === 0 ? (
                <div className="text-center py-12 bg-slate-900 rounded-3xl border border-slate-800 text-slate-400">
                  <p className="text-sm font-semibold">No content packages in this view.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Click "Generate Today's Content" above to create your first package.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDrafts.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setActiveDraft(d)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group shadow-sm ${
                        activeDraft?.id === d.id
                          ? 'bg-slate-900 border-rose-500 ring-1 ring-rose-500'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              d.status === 'published'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : d.status === 'ready'
                                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            }`}
                          >
                            {d.status}
                          </span>

                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            {d.recommendedFormat === 'Reel' || d.recommendedFormat === 'Single-image post' ? (
                              <ImageIcon className="w-3 h-3 text-rose-400" />
                            ) : (
                              <Layers className="w-3 h-3 text-indigo-400" />
                            )}
                            <span>{d.recommendedFormat === 'Reel' ? 'Image Post' : d.recommendedFormat}</span>
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors line-clamp-2 leading-snug">
                          {d.topicTitle}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                          "{d.reel.hook}"
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">
                          {d.plannedDate || new Date(d.createdAt).toLocaleDateString()}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDuplicateDraft(d.id);
                            }}
                            className="p-1 text-slate-500 hover:text-white rounded transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDraft(d.id);
                            }}
                            className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <span className="px-2 py-1 rounded-lg bg-slate-800 group-hover:bg-rose-600 text-slate-300 group-hover:text-white font-bold transition-all">
                            Edit
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* 7-DAY CONTENT PLANNER MODAL */}
      <SevenDayPlannerModal
        plan={currentPlan}
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        onSelectDayTopic={handleSelectPlannerDay}
        onRegeneratePlan={handleRegeneratePlan}
      />

      {/* AI SETTINGS MODAL */}
      <AiSettingsModal
        isOpen={aiSettingsOpen}
        onClose={() => setAiSettingsOpen(false)}
        onSettingsSaved={(updated) => setAiSettings(updated)}
      />

      <Footer />
    </div>
  );
};
