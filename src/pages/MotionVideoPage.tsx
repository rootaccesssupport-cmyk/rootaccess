import React, { useState } from 'react';
import { Download, Sparkles, Monitor, Film, Layers, ExternalLink, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MotionVideoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'mp4'>('interactive');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center font-mono font-bold text-lg text-white shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
              &gt;_
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                RootAccess
              </span>
              <span className="text-[11px] text-slate-400 font-mono tracking-widest uppercase">
                Motion Graphics Studio
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="/motion/index.html"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-medium text-slate-300 transition-colors"
            >
              <span>Fullscreen Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="/videos/rootaccess-motion-1080p.mp4"
              download="RootAccess-Motion-1080p.mp4"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-medium text-xs tracking-wide shadow-lg shadow-rose-900/40 transition-all hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              <span>Download 1080p MP4</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Built with NullMotion Motion Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            RootAccess Motion Graphics Reel
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            High-definition 1080p kinetic motion showcase crafted for <span className="text-slate-200 font-semibold">www.rootaccess.co.in</span>. Featuring real browser execution, 3D perspective cards, and terminal typography.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center">
          <div className="p-1 rounded-xl bg-slate-900/90 border border-slate-800 flex gap-1">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'interactive'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Interactive Motion Engine (GSAP)</span>
            </button>
            <button
              onClick={() => setActiveTab('mp4')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'mp4'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Rendered 1080p MP4 Video</span>
            </button>
          </div>
        </div>

        {/* Video Player Display Container */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/70 shadow-2xl aspect-video w-full max-w-5xl mx-auto group">
          {activeTab === 'interactive' ? (
            <iframe
              src="/motion/index.html"
              title="RootAccess Motion Graphics Reel"
              className="w-full h-full border-0"
              allow="autoplay; fullscreen"
            />
          ) : (
            <video
              src="/videos/rootaccess-motion-1080p.mp4"
              poster="/videos/rootaccess-motion-cover.png"
              controls
              playsInline
              className="w-full h-full object-contain bg-black"
            >
              Your browser does not support HTML5 video.
            </video>
          )}
        </div>

        {/* Video Specifications & Composition Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Full HD 1080p Specs</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              1920 &times; 1080 Full HD @ 30fps. High-profile H.264 broadcast encoding with 48kHz stereo synthetic soundtrack and sub-bass impacts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">NullMotion Architecture</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Built using NullMotion&apos;s HyperFrames GSAP timeline choreography, 3D card tilt fans, typewriter terminal prompts, and glass IDE windows.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">Dual Export Ready</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Export via client-side WebCodecs directly in browser with 1-click, or use headless Playwright + FFmpeg for zero-drop master encoding.
            </p>
          </div>
        </div>

        {/* Storyboard Timeline */}
        <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
          <h3 className="font-bold text-lg text-slate-200 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-rose-400" />
            <span>20-Second Motion Storyboard</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <div className="text-[11px] font-mono text-rose-400 font-bold">0.0s – 4.0s</div>
              <div className="font-semibold text-xs text-white">The Hook</div>
              <div className="text-[11px] text-slate-400">Stop watching tutorials. Real engineering is built by doing.</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <div className="text-[11px] font-mono text-emerald-400 font-bold">4.0s – 7.6s</div>
              <div className="font-semibold text-xs text-white">Terminal Launch</div>
              <div className="text-[11px] text-slate-400">Prompt bar typing &gt; RootAccess brand reveal &amp; mission.</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <div className="text-[11px] font-mono text-sky-400 font-bold">7.6s – 12.2s</div>
              <div className="font-semibold text-xs text-white">4 Academies</div>
              <div className="text-[11px] text-slate-400">3D cards: SQL, Manual &amp; API, Playwright, and AI Prompting.</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <div className="text-[11px] font-mono text-amber-400 font-bold">12.2s – 16.2s</div>
              <div className="font-semibold text-xs text-white">IDE Simulator</div>
              <div className="text-[11px] text-slate-400">Mac code window, green passing assertions, verified badge.</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
              <div className="text-[11px] font-mono text-purple-400 font-bold">16.2s – 20.0s</div>
              <div className="font-semibold text-xs text-white">High-Impact CTA</div>
              <div className="text-[11px] text-slate-400">Call to action &amp; URL: www.rootaccess.co.in</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
