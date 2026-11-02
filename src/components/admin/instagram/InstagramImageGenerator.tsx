import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Download,
  RefreshCw,
  Sliders,
  Layers,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Code2,
  HelpCircle,
  AlertTriangle,
  ListOrdered,
  Type,
} from 'lucide-react';
import {
  InstagramPostDraft,
  InstagramImagePostPackage,
  ImageTemplateStyle,
  ImageAspectRatio,
  ImageTheme,
} from '../../../types/instagramCreator';

interface InstagramImageGeneratorProps {
  draft: InstagramPostDraft;
  onUpdateDraft: (updated: InstagramPostDraft) => void;
  onRegenerateSection?: (
    draft: InstagramPostDraft,
    section: 'image' | 'hook' | 'script' | 'carousel' | 'caption' | 'engagement'
  ) => void;
}

export const InstagramImageGenerator: React.FC<InstagramImageGeneratorProps> = ({
  draft,
  onUpdateDraft,
  onRegenerateSection,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize image package data
  const initialPackage = draft.imagePost || {
    headline: draft.topicTitle,
    subtitle: draft.learningObjective,
    categoryTag: draft.category,
    templateStyle: (draft.category.includes('mistakes')
      ? 'mistake_vs_fix'
      : draft.category.includes('interview')
      ? 'interview_quiz'
      : draft.reel.codeSnippet
      ? 'code_terminal'
      : 'bold_hook') as ImageTemplateStyle,
    aspectRatio: '1:1' as ImageAspectRatio,
    theme: 'rootaccess_dark' as ImageTheme,
    codeSnippet:
      draft.reel.codeSnippet ||
      draft.carousel.slides.find((s) => s.codeSnippet)?.codeSnippet ||
      '-- RootAccess SQL Verification\nSELECT order_id, customer_name, total_amount\nFROM orders\nWHERE status IS NOT NULL\nORDER BY created_at DESC\nLIMIT 5;',
    badSnippet: '// ❌ Common Mistake\nSELECT * FROM orders WHERE status = NULL;',
    goodSnippet: '// ✅ RootAccess Fix\nSELECT * FROM orders WHERE status IS NULL;',
    bulletPoints: draft.research.verifiedFacts.slice(0, 3),
    explanation: draft.whyUseful,
    quizQuestion: draft.topicTitle,
    quizOptions: [
      { label: 'A', text: 'Option A: Leaves null handling unspecified' },
      { label: 'B', text: 'Option B: Correct industry practice', isCorrect: true },
      { label: 'C', text: 'Option C: Causes flaky timeout during CI test' },
      { label: 'D', text: 'Option D: Deprecated syntax in modern engines' },
    ],
    callToAction: 'Follow @RootAccess.tech • Learn by Doing',
  };

  const [activeMode, setActiveMode] = useState<'post' | 'carousel'>('post');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Configuration state
  const [templateStyle, setTemplateStyle] = useState<ImageTemplateStyle>(initialPackage.templateStyle);
  const [aspectRatio, setAspectRatio] = useState<ImageAspectRatio>(initialPackage.aspectRatio || '1:1');
  const [theme, setTheme] = useState<ImageTheme>(initialPackage.theme || 'rootaccess_dark');

  // Editable content state
  const [headline, setHeadline] = useState(initialPackage.headline);
  const [subtitle, setSubtitle] = useState(initialPackage.subtitle);
  const [categoryTag, setCategoryTag] = useState(initialPackage.categoryTag);
  const [codeSnippet, setCodeSnippet] = useState(initialPackage.codeSnippet || '');
  const [badSnippet, setBadSnippet] = useState(initialPackage.badSnippet || '// ❌ Common Mistake\nSELECT * FROM orders WHERE status = NULL;');
  const [goodSnippet, setGoodSnippet] = useState(initialPackage.goodSnippet || '// ✅ RootAccess Fix\nSELECT * FROM orders WHERE status IS NULL;');
  const [bullet1, setBullet1] = useState(initialPackage.bulletPoints?.[0] || 'Understand the underlying mechanism step-by-step');
  const [bullet2, setBullet2] = useState(initialPackage.bulletPoints?.[1] || 'Avoid silent regression and assertion false-positives');
  const [bullet3, setBullet3] = useState(initialPackage.bulletPoints?.[2] || 'Practice hands-on test engineering on RootAccess');
  const [callToAction, setCallToAction] = useState(initialPackage.callToAction || 'Follow @RootAccess.tech • Learn by Doing');

  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  // Update parent draft when state changes
  const syncToDraft = useCallback(() => {
    const updatedPackage: InstagramImagePostPackage = {
      headline,
      subtitle,
      categoryTag,
      templateStyle,
      aspectRatio,
      theme,
      codeSnippet,
      badSnippet,
      goodSnippet,
      bulletPoints: [bullet1, bullet2, bullet3],
      explanation: subtitle,
      quizQuestion: headline,
      quizOptions: initialPackage.quizOptions,
      callToAction,
    };

    onUpdateDraft({
      ...draft,
      imagePost: updatedPackage,
      updatedAt: new Date().toISOString(),
    });
  }, [
    headline,
    subtitle,
    categoryTag,
    templateStyle,
    aspectRatio,
    theme,
    codeSnippet,
    badSnippet,
    goodSnippet,
    bullet1,
    bullet2,
    bullet3,
    callToAction,
    draft,
    onUpdateDraft,
    initialPackage.quizOptions,
  ]);

  // Dimension mapping
  const getDimensions = (ratio: ImageAspectRatio): { width: number; height: number } => {
    switch (ratio) {
      case '4:5':
        return { width: 1080, height: 1350 };
      case '9:16':
        return { width: 1080, height: 1920 };
      case '1:1':
      default:
        return { width: 1080, height: 1080 };
    }
  };

  // Helper to wrap text onto canvas
  const drawWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines: number = 6
  ): number => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    let linesDrawn = 0;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
        linesDrawn++;
        if (linesDrawn >= maxLines) {
          ctx.fillText(line.trim() + '...', x, currentY);
          return currentY + lineHeight;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, currentY);
    return currentY + lineHeight;
  };

  // Helper to draw rounded rectangle
  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fillStyle?: string,
    strokeStyle?: string,
    lineWidth: number = 1
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    if (fillStyle) {
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  };

  // Main canvas render function
  const renderCanvasToTarget = useCallback(
    (
      canvas: HTMLCanvasElement,
      targetRatio: ImageAspectRatio,
      targetStyle: ImageTemplateStyle,
      targetTheme: ImageTheme,
      isCarousel: boolean,
      slideIdx: number
    ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height } = getDimensions(targetRatio);
      canvas.width = width;
      canvas.height = height;

      // Theme Colors
      const isLight = targetTheme === 'clean_light';
      const isCyber = targetTheme === 'cyber_terminal';
      const isObsidian = targetTheme === 'obsidian';

      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      if (isLight) {
        bgGradient.addColorStop(0, '#ffffff');
        bgGradient.addColorStop(1, '#f1f5f9');
      } else if (isCyber) {
        bgGradient.addColorStop(0, '#090e17');
        bgGradient.addColorStop(1, '#030712');
      } else if (isObsidian) {
        bgGradient.addColorStop(0, '#050508');
        bgGradient.addColorStop(1, '#020204');
      } else {
        // RootAccess Dark default
        bgGradient.addColorStop(0, '#0a0d14');
        bgGradient.addColorStop(1, '#04060a');
      }

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle Background Glow Accents
      if (!isLight) {
        // Red neon glow top right
        const topGlow = ctx.createRadialGradient(width - 80, 100, 10, width - 80, 100, 480);
        topGlow.addColorStop(0, 'rgba(225, 29, 72, 0.16)');
        topGlow.addColorStop(1, 'rgba(225, 29, 72, 0)');
        ctx.fillStyle = topGlow;
        ctx.fillRect(0, 0, width, height);

        // Cyber Cyan or Slate bottom left glow
        const bottomGlow = ctx.createRadialGradient(80, height - 100, 10, 80, height - 100, 420);
        bottomGlow.addColorStop(0, isCyber ? 'rgba(56, 189, 248, 0.12)' : 'rgba(244, 63, 94, 0.08)');
        bottomGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = bottomGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Decorative Grid Dots / Tech Grid Lines
      ctx.strokeStyle = isLight ? 'rgba(203, 213, 225, 0.35)' : 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = gridSize; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Outer Frame Accent Border
      ctx.strokeStyle = isLight
        ? 'rgba(226, 232, 240, 0.9)'
        : isCyber
        ? 'rgba(56, 189, 248, 0.25)'
        : 'rgba(225, 29, 72, 0.28)';
      ctx.lineWidth = 2;
      ctx.strokeRect(36, 36, width - 72, height - 72);

      // Top Corner Bracket Accents
      const bracketLen = 28;
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 4;
      // Top-Left
      ctx.beginPath();
      ctx.moveTo(34, 34 + bracketLen);
      ctx.lineTo(34, 34);
      ctx.lineTo(34 + bracketLen, 34);
      ctx.stroke();
      // Top-Right
      ctx.beginPath();
      ctx.moveTo(width - 34 - bracketLen, 34);
      ctx.lineTo(width - 34, 34);
      ctx.lineTo(width - 34, 34 + bracketLen);
      ctx.stroke();
      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(34, height - 34 - bracketLen);
      ctx.lineTo(34, height - 34);
      ctx.lineTo(34 + bracketLen, height - 34);
      ctx.stroke();
      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(width - 34 - bracketLen, height - 34);
      ctx.lineTo(width - 34, height - 34);
      ctx.lineTo(width - 34, height - 34 - bracketLen);
      ctx.stroke();

      // ==========================================
      // HEADER BAR: ROOTACCESS BRANDING + TAG
      // ==========================================
      const headerY = 96;

      // Brand Logo square
      drawRoundedRect(ctx, 74, headerY - 26, 32, 32, 6, '#e11d48');
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('>', 83, headerY - 3);

      // Brand Title
      ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
      ctx.font = '900 24px "Inter", -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('ROOTACCESS', 120, headerY - 2);

      // Tagline
      ctx.fillStyle = '#e11d48';
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.fillText('// LEARN BY DOING.', 295, headerY - 3);

      // Right Side Tag (Category or Slide Number)
      const tagText = isCarousel
        ? `SLIDE ${slideIdx + 1} OF ${draft.carousel.slides.length || 5}`
        : categoryTag.toUpperCase();

      ctx.font = 'bold 13px "Inter", sans-serif';
      const tagMetrics = ctx.measureText(tagText);
      const tagWidth = tagMetrics.width + 32;
      const tagX = width - 74 - tagWidth;

      drawRoundedRect(
        ctx,
        tagX,
        headerY - 28,
        tagWidth,
        34,
        17,
        isLight ? '#f1f5f9' : 'rgba(225, 29, 72, 0.12)',
        isLight ? '#cbd5e1' : 'rgba(225, 29, 72, 0.4)',
        1.5
      );

      ctx.fillStyle = isLight ? '#e11d48' : '#fda4af';
      ctx.fillText(tagText, tagX + 16, headerY - 6);

      // Horizontal separator line
      ctx.strokeStyle = isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(74, headerY + 28);
      ctx.lineTo(width - 74, headerY + 28);
      ctx.stroke();

      // ==========================================
      // CONTENT RENDERING
      // ==========================================
      let contentStartY = headerY + 70;

      if (isCarousel) {
        // CAROUSEL SLIDE MODE
        const slides = draft.carousel.slides;
        const currentSlide = slides[slideIdx] || {
          slideNumber: slideIdx + 1,
          slideType: 'content',
          headline: headline,
          bodyText: subtitle,
          visualNote: 'Key practical concept',
        };

        // Slide Type Pill
        const typeBadge = currentSlide.slideType ? currentSlide.slideType.toUpperCase() : 'STEP';
        drawRoundedRect(
          ctx,
          74,
          contentStartY,
          160,
          32,
          8,
          '#e11d48',
          undefined
        );
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px "Inter", monospace';
        ctx.fillText(`● ${typeBadge}`, 90, contentStartY + 21);

        contentStartY += 65;

        // Slide Headline
        ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
        ctx.font = '900 44px "Inter", sans-serif';
        contentStartY = drawWrappedText(ctx, currentSlide.headline, 74, contentStartY, width - 148, 56, 3);
        contentStartY += 20;

        // Slide Body Text
        ctx.fillStyle = isLight ? '#475569' : '#cbd5e1';
        ctx.font = '400 24px "Inter", sans-serif';
        contentStartY = drawWrappedText(ctx, currentSlide.bodyText, 74, contentStartY, width - 148, 38, 4);
        contentStartY += 30;

        // Code block if present on this slide
        if (currentSlide.codeSnippet) {
          const terminalHeight = height > 1200 ? 340 : 260;
          drawRoundedRect(
            ctx,
            74,
            contentStartY,
            width - 148,
            terminalHeight,
            18,
            isLight ? '#0f172a' : '#020408',
            'rgba(225, 29, 72, 0.35)',
            2
          );

          // Terminal Header
          ctx.fillStyle = isLight ? '#1e293b' : '#080c14';
          ctx.fillRect(74, contentStartY, width - 148, 44);

          // Traffic Dots
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(104, contentStartY + 22, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.arc(126, contentStartY + 22, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#22c55e';
          ctx.beginPath();
          ctx.arc(148, contentStartY + 22, 6, 0, Math.PI * 2);
          ctx.fill();

          // Filename
          ctx.fillStyle = '#94a3b8';
          ctx.font = 'bold 14px monospace';
          ctx.fillText('rootaccess_exercise.ts', 180, contentStartY + 27);

          // Code lines
          ctx.fillStyle = '#38bdf8';
          ctx.font = '20px "JetBrains Mono", "Fira Code", monospace';
          const codeLines = currentSlide.codeSnippet.split('\n');
          let codeY = contentStartY + 80;
          codeLines.slice(0, 7).forEach((line, i) => {
            // Line numbers
            ctx.fillStyle = '#64748b';
            ctx.fillText(`${(i + 1).toString().padStart(2, '0')}`, 104, codeY);

            // Syntax coloring
            if (line.trim().startsWith('//') || line.trim().startsWith('--')) {
              ctx.fillStyle = '#94a3b8';
            } else if (
              line.includes('SELECT') ||
              line.includes('FROM') ||
              line.includes('WHERE') ||
              line.includes('const') ||
              line.includes('test(') ||
              line.includes('await')
            ) {
              ctx.fillStyle = '#f43f5e';
            } else {
              ctx.fillStyle = '#e2e8f0';
            }
            ctx.fillText(line, 146, codeY);
            codeY += 32;
          });
        }

        // Slide Progress Dots at bottom
        const dotsY = height - 120;
        const totalSlides = draft.carousel.slides.length || 5;
        const totalDotsWidth = totalSlides * 24;
        const startDotX = width / 2 - totalDotsWidth / 2;

        for (let d = 0; d < totalSlides; d++) {
          ctx.fillStyle = d === slideIdx ? '#e11d48' : isLight ? '#cbd5e1' : '#334155';
          ctx.beginPath();
          ctx.arc(startDotX + d * 24, dotsY, d === slideIdx ? 7 : 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Swipe CTA
        ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
        ctx.font = 'bold 15px "Inter", sans-serif';
        ctx.fillText('SWIPE FOR NEXT ➔', width - 230, dotsY + 5);
      } else {
        // SINGLE POST IMAGE MODE (5 Templates)
        if (targetStyle === 'code_terminal') {
          // 1. CODE TERMINAL TEMPLATE
          // Headline
          ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
          ctx.font = '900 42px "Inter", sans-serif';
          contentStartY = drawWrappedText(ctx, headline, 74, contentStartY, width - 148, 52, 2);
          contentStartY += 10;

          // Subtitle
          ctx.fillStyle = isLight ? '#475569' : '#94a3b8';
          ctx.font = '500 22px "Inter", sans-serif';
          contentStartY = drawWrappedText(ctx, subtitle, 74, contentStartY, width - 148, 34, 2);
          contentStartY += 24;

          // Terminal Window
          const termHeight = height - contentStartY - 160;
          drawRoundedRect(
            ctx,
            74,
            contentStartY,
            width - 148,
            termHeight,
            20,
            isLight ? '#0f172a' : '#020408',
            'rgba(225, 29, 72, 0.4)',
            2
          );

          // Terminal Header
          ctx.fillStyle = isLight ? '#1e293b' : '#080c14';
          ctx.fillRect(74, contentStartY, width - 148, 48);

          // Traffic Dots
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(104, contentStartY + 24, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#eab308';
          ctx.beginPath();
          ctx.arc(128, contentStartY + 24, 7, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#22c55e';
          ctx.beginPath();
          ctx.arc(152, contentStartY + 24, 7, 0, Math.PI * 2);
          ctx.fill();

          // Tab Title
          ctx.fillStyle = '#94a3b8';
          ctx.font = 'bold 15px monospace';
          ctx.fillText('solution_test.sql', 190, contentStartY + 30);

          // Lines of code
          ctx.font = '22px "JetBrains Mono", monospace';
          const lines = (codeSnippet || '-- Test Code').split('\n');
          let codeLineY = contentStartY + 95;
          const maxVisibleLines = Math.floor((termHeight - 110) / 36);

          lines.slice(0, maxVisibleLines).forEach((line, index) => {
            // Line number
            ctx.fillStyle = '#475569';
            ctx.fillText(`${(index + 1).toString().padStart(2, '0')}`, 104, codeLineY);

            // Syntax coloring
            if (line.trim().startsWith('--') || line.trim().startsWith('//')) {
              ctx.fillStyle = '#94a3b8';
            } else if (
              line.includes('SELECT') ||
              line.includes('FROM') ||
              line.includes('WHERE') ||
              line.includes('test(') ||
              line.includes('const') ||
              line.includes('expect')
            ) {
              ctx.fillStyle = '#f43f5e';
            } else if (line.includes('NULL') || line.includes('true') || line.includes('false')) {
              ctx.fillStyle = '#38bdf8';
            } else {
              ctx.fillStyle = '#f8fafc';
            }
            ctx.fillText(line, 150, codeLineY);
            codeLineY += 36;
          });
        } else if (targetStyle === 'mistake_vs_fix') {
          // 2. MISTAKE VS FIX TEMPLATE
          ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
          ctx.font = '900 42px "Inter", sans-serif';
          contentStartY = drawWrappedText(ctx, headline, 74, contentStartY, width - 148, 52, 2);
          contentStartY += 20;

          const cardHeight = Math.min(260, (height - contentStartY - 200) / 2);

          // Card 1: Common Mistake (Red Border)
          drawRoundedRect(
            ctx,
            74,
            contentStartY,
            width - 148,
            cardHeight,
            18,
            isLight ? '#fff1f2' : 'rgba(225, 29, 72, 0.08)',
            'rgba(225, 29, 72, 0.6)',
            2
          );

          // Label
          drawRoundedRect(ctx, 98, contentStartY + 20, 200, 32, 8, '#e11d48');
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px "Inter", sans-serif';
          ctx.fillText('❌ COMMON MISTAKE', 110, contentStartY + 41);

          // Bad snippet
          ctx.fillStyle = isLight ? '#991b1b' : '#fca5a5';
          ctx.font = '22px monospace';
          const badLines = badSnippet.split('\n');
          badLines.slice(0, 3).forEach((line, i) => {
            ctx.fillText(line, 98, contentStartY + 95 + i * 34);
          });

          contentStartY += cardHeight + 28;

          // Card 2: RootAccess Fix (Green Border)
          drawRoundedRect(
            ctx,
            74,
            contentStartY,
            width - 148,
            cardHeight,
            18,
            isLight ? '#f0fdf4' : 'rgba(16, 185, 129, 0.08)',
            'rgba(16, 185, 129, 0.6)',
            2
          );

          // Label
          drawRoundedRect(ctx, 98, contentStartY + 20, 200, 32, 8, '#10b981');
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px "Inter", sans-serif';
          ctx.fillText('✅ ROOTACCESS FIX', 115, contentStartY + 41);

          // Good snippet
          ctx.fillStyle = isLight ? '#166534' : '#86efac';
          ctx.font = '22px monospace';
          const goodLines = goodSnippet.split('\n');
          goodLines.slice(0, 3).forEach((line, i) => {
            ctx.fillText(line, 98, contentStartY + 95 + i * 34);
          });
        } else if (targetStyle === 'cheat_sheet') {
          // 3. CHEAT SHEET TEMPLATE
          ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
          ctx.font = '900 44px "Inter", sans-serif';
          contentStartY = drawWrappedText(ctx, headline, 74, contentStartY, width - 148, 54, 2);
          contentStartY += 24;

          const bullets = [bullet1, bullet2, bullet3];
          const itemHeight = Math.min(150, (height - contentStartY - 200) / 3);

          bullets.forEach((bullet, index) => {
            const itemY = contentStartY + index * (itemHeight + 20);

            drawRoundedRect(
              ctx,
              74,
              itemY,
              width - 148,
              itemHeight,
              18,
              isLight ? '#f8fafc' : 'rgba(255, 255, 255, 0.03)',
              isLight ? '#e2e8f0' : 'rgba(225, 29, 72, 0.3)',
              1.5
            );

            // Number badge circle
            ctx.fillStyle = '#e11d48';
            ctx.beginPath();
            ctx.arc(130, itemY + itemHeight / 2, 26, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px "Inter", sans-serif';
            ctx.fillText(`0${index + 1}`, 118, itemY + itemHeight / 2 + 7);

            // Text
            ctx.fillStyle = isLight ? '#0f172a' : '#f8fafc';
            ctx.font = '600 24px "Inter", sans-serif';
            drawWrappedText(ctx, bullet, 180, itemY + 45, width - 290, 34, 2);
          });
        } else if (targetStyle === 'interview_quiz') {
          // 4. INTERVIEW QUIZ CHALLENGE
          drawRoundedRect(ctx, 74, contentStartY, 260, 36, 18, '#e11d48');
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px "Inter", sans-serif';
          ctx.fillText('⚡ QA INTERVIEW CHALLENGE', 92, contentStartY + 23);
          contentStartY += 60;

          // Question headline
          ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
          ctx.font = '900 38px "Inter", sans-serif';
          contentStartY = drawWrappedText(ctx, headline, 74, contentStartY, width - 148, 50, 3);
          contentStartY += 30;

          // Options A, B, C, D
          const options = initialPackage.quizOptions || [
            { label: 'A', text: 'Leaves null assertions unchecked' },
            { label: 'B', text: 'Correct industry standard solution', isCorrect: true },
            { label: 'C', text: 'Causes timeout flaky tests in CI' },
            { label: 'D', text: 'Deprecated in modern environments' },
          ];

          const optHeight = 72;
          options.forEach((opt, idx) => {
            const optY = contentStartY + idx * (optHeight + 16);

            drawRoundedRect(
              ctx,
              74,
              optY,
              width - 148,
              optHeight,
              14,
              isLight ? '#f8fafc' : 'rgba(255, 255, 255, 0.04)',
              opt.isCorrect && !isLight ? 'rgba(16, 185, 129, 0.6)' : isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.1)',
              1.5
            );

            // Option Letter Box
            drawRoundedRect(ctx, 94, optY + 16, 40, 40, 8, opt.isCorrect ? '#10b981' : '#e11d48');
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px "Inter", sans-serif';
            ctx.fillText(opt.label, 107, optY + 42);

            // Option Text
            ctx.fillStyle = isLight ? '#0f172a' : '#f8fafc';
            ctx.font = '500 21px "Inter", sans-serif';
            ctx.fillText(opt.text, 154, optY + 43);
          });
        } else {
          // 5. BOLD HOOK POSTER
          contentStartY += 40;

          // Category Pill
          drawRoundedRect(
            ctx,
            74,
            contentStartY,
            300,
            38,
            19,
            'rgba(225, 29, 72, 0.15)',
            '#e11d48',
            2
          );
          ctx.fillStyle = '#fda4af';
          ctx.font = 'bold 14px "Inter", sans-serif';
          ctx.fillText(`● ${categoryTag.toUpperCase()}`, 96, contentStartY + 24);

          contentStartY += 80;

          // Giant Bold Title
          ctx.fillStyle = isLight ? '#0f172a' : '#ffffff';
          ctx.font = '900 64px "Inter", sans-serif';
          contentStartY = drawWrappedText(ctx, headline, 74, contentStartY, width - 148, 76, 4);
          contentStartY += 36;

          // Accent Takeaway Card
          drawRoundedRect(
            ctx,
            74,
            contentStartY,
            width - 148,
            160,
            20,
            isLight ? '#f1f5f9' : 'rgba(255, 255, 255, 0.04)',
            'rgba(225, 29, 72, 0.4)',
            2
          );

          ctx.fillStyle = '#e11d48';
          ctx.font = 'bold 16px "Inter", sans-serif';
          ctx.fillText('WHY THIS MATTERS:', 104, contentStartY + 45);

          ctx.fillStyle = isLight ? '#334155' : '#cbd5e1';
          ctx.font = '400 22px "Inter", sans-serif';
          drawWrappedText(ctx, subtitle, 104, contentStartY + 85, width - 208, 34, 2);
        }
      }

      // ==========================================
      // FOOTER BAR: CALL TO ACTION
      // ==========================================
      const footerY = height - 74;

      ctx.fillStyle = isLight ? '#64748b' : '#94a3b8';
      ctx.font = 'bold 15px "Inter", sans-serif';
      ctx.fillText(callToAction, 74, footerY);

      ctx.fillStyle = '#e11d48';
      ctx.font = 'bold 15px "Inter", sans-serif';
      ctx.fillText('rootaccess.tech', width - 210, footerY);
    },
    [
      headline,
      subtitle,
      categoryTag,
      codeSnippet,
      badSnippet,
      goodSnippet,
      bullet1,
      bullet2,
      bullet3,
      callToAction,
      draft,
      initialPackage.quizOptions,
    ]
  );

  // Redraw canvas whenever parameters change
  useEffect(() => {
    if (canvasRef.current) {
      renderCanvasToTarget(
        canvasRef.current,
        aspectRatio,
        templateStyle,
        theme,
        activeMode === 'carousel',
        activeSlideIndex
      );
    }
  }, [
    renderCanvasToTarget,
    aspectRatio,
    templateStyle,
    theme,
    activeMode,
    activeSlideIndex,
  ]);

  // Sync back to parent
  useEffect(() => {
    syncToDraft();
  }, [syncToDraft]);

  // 1-Click PNG Download
  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');

    const cleanTitle = headline
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 30);

    const filename =
      activeMode === 'carousel'
        ? `RootAccess-Slide-${activeSlideIndex + 1}-${cleanTitle}.png`
        : `RootAccess-Post-${cleanTitle}.png`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadSuccess(`Downloaded ${filename}!`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  // Download All Carousel Slides sequentially
  const handleDownloadAllSlides = async () => {
    setIsDownloadingAll(true);
    setDownloadSuccess('Rendering and downloading all slides...');

    const slides = draft.carousel.slides;
    const offscreen = document.createElement('canvas');

    for (let i = 0; i < slides.length; i++) {
      renderCanvasToTarget(offscreen, aspectRatio, templateStyle, theme, true, i);

      const url = offscreen.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `RootAccess-Carousel-Slide-${i + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Short delay between triggers for clean browser queue
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    setIsDownloadingAll(false);
    setDownloadSuccess(`Downloaded all ${slides.length} slides as PNGs!`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Top Controls Strip */}
      <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Mode Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveMode('post')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'post'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Single Post Image</span>
          </button>

          <button
            onClick={() => setActiveMode('carousel')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'carousel'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Multi-Slide Carousel ({draft.carousel.slides.length} Slides)</span>
          </button>
        </div>

        {/* Global Action Download Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {downloadSuccess && (
            <span className="text-xs font-semibold text-emerald-400 animate-fadeIn mr-2">
              ✓ {downloadSuccess}
            </span>
          )}

          {activeMode === 'carousel' && (
            <button
              onClick={handleDownloadAllSlides}
              disabled={isDownloadingAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer disabled:opacity-60"
            >
              <Layers className="w-3.5 h-3.5 text-rose-400" />
              <span>{isDownloadingAll ? 'Exporting...' : 'Download All Slides (PNG)'}</span>
            </button>
          )}

          <button
            onClick={handleDownloadPNG}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white transition-all shadow-md shadow-rose-600/30 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>
              {activeMode === 'carousel'
                ? `Download Slide ${activeSlideIndex + 1} (PNG)`
                : 'Download Post Image (PNG)'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls on Left, Live Canvas on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Controls & Content Editor (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. Format & Theme Controls */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-rose-400" />
              <span>Canvas Styling &amp; Dimensions</span>
            </h4>

            {/* Aspect Ratio */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['1:1', '4:5', '9:16'] as ImageAspectRatio[]).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      aspectRatio === ratio
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <div>{ratio}</div>
                    <div className="text-[10px] font-normal text-slate-400">
                      {ratio === '1:1' ? 'Square (1080p)' : ratio === '4:5' ? 'Portrait (Feed)' : 'Story / 9:16'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Template Layout (Only in single post mode) */}
            {activeMode === 'post' && (
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Card Layout Template
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'code_terminal', label: 'Code Terminal', icon: Code2, desc: 'macOS terminal window' },
                    { id: 'mistake_vs_fix', label: 'Mistake vs Fix', icon: AlertTriangle, desc: 'Common error vs RootAccess' },
                    { id: 'cheat_sheet', label: 'Cheat Sheet', icon: ListOrdered, desc: 'Numbered 01-03 key points' },
                    { id: 'interview_quiz', label: 'Interview Quiz', icon: HelpCircle, desc: 'Multiple choice challenge' },
                    { id: 'bold_hook', label: 'Bold Typographic', icon: Type, desc: 'High-contrast text poster' },
                  ].map((tpl) => {
                    const Icon = tpl.icon;
                    return (
                      <button
                        key={tpl.id}
                        onClick={() => setTemplateStyle(tpl.id as ImageTemplateStyle)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          templateStyle === tpl.id
                            ? 'bg-rose-500/20 text-rose-200 border-rose-500/50'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                          <Icon className="w-3.5 h-3.5 text-rose-400" />
                          <span>{tpl.label}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{tpl.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Theme */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Color Palette Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'rootaccess_dark', name: 'Dark Red', bg: '#0a0d14', border: '#e11d48' },
                  { id: 'obsidian', name: 'Obsidian', bg: '#050508', border: '#475569' },
                  { id: 'cyber_terminal', name: 'Cyber', bg: '#0a0e17', border: '#38bdf8' },
                  { id: 'clean_light', name: 'Clean Light', bg: '#ffffff', border: '#e11d48' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setTheme(th.id as ImageTheme)}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                      theme === th.id
                        ? 'bg-rose-500/20 text-white border-rose-500/60'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border"
                      style={{ backgroundColor: th.bg, borderColor: th.border }}
                    />
                    <span className="truncate">{th.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Content Text Editor */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Text &amp; Snippet Content</span>
              {onRegenerateSection && (
                <button
                  onClick={() => onRegenerateSection(draft, 'image')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Cycle Style</span>
                </button>
              )}
            </h4>

            {activeMode === 'carousel' ? (
              /* Carousel Slide Stepper */
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeSlideIndex === 0}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-bold text-rose-400">
                    Slide {activeSlideIndex + 1} of {draft.carousel.slides.length}
                  </span>

                  <button
                    onClick={() =>
                      setActiveSlideIndex((prev) =>
                        Math.min(draft.carousel.slides.length - 1, prev + 1)
                      )
                    }
                    disabled={activeSlideIndex === draft.carousel.slides.length - 1}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Slide Headline
                  </label>
                  <input
                    type="text"
                    value={draft.carousel.slides[activeSlideIndex]?.headline || ''}
                    onChange={(e) => {
                      const updatedSlides = [...draft.carousel.slides];
                      if (updatedSlides[activeSlideIndex]) {
                        updatedSlides[activeSlideIndex] = {
                          ...updatedSlides[activeSlideIndex],
                          headline: e.target.value,
                        };
                        onUpdateDraft({
                          ...draft,
                          carousel: { ...draft.carousel, slides: updatedSlides },
                        });
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Slide Explanation Body
                  </label>
                  <textarea
                    rows={3}
                    value={draft.carousel.slides[activeSlideIndex]?.bodyText || ''}
                    onChange={(e) => {
                      const updatedSlides = [...draft.carousel.slides];
                      if (updatedSlides[activeSlideIndex]) {
                        updatedSlides[activeSlideIndex] = {
                          ...updatedSlides[activeSlideIndex],
                          bodyText: e.target.value,
                        };
                        onUpdateDraft({
                          ...draft,
                          carousel: { ...draft.carousel, slides: updatedSlides },
                        });
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            ) : (
              /* Single Post Fields */
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Subtitle / Context
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={categoryTag}
                    onChange={(e) => setCategoryTag(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-rose-300 font-semibold focus:outline-none focus:border-rose-500"
                  />
                </div>

                {templateStyle === 'code_terminal' && (
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Code Snippet
                    </label>
                    <textarea
                      rows={6}
                      value={codeSnippet}
                      onChange={(e) => setCodeSnippet(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-sky-300 font-mono focus:outline-none focus:border-rose-500"
                    />
                  </div>
                )}

                {templateStyle === 'mistake_vs_fix' && (
                  <>
                    <div>
                      <label className="text-[11px] font-semibold text-rose-400 block mb-1">
                        ❌ Common Mistake (Red Card)
                      </label>
                      <textarea
                        rows={3}
                        value={badSnippet}
                        onChange={(e) => setBadSnippet(e.target.value)}
                        className="w-full bg-slate-900 border border-rose-500/40 rounded-xl p-3 text-xs text-rose-300 font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-emerald-400 block mb-1">
                        ✅ RootAccess Fix (Green Card)
                      </label>
                      <textarea
                        rows={3}
                        value={goodSnippet}
                        onChange={(e) => setGoodSnippet(e.target.value)}
                        className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-300 font-mono focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {templateStyle === 'cheat_sheet' && (
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-slate-400 block">
                      3 Key Bullet Rules
                    </label>
                    <input
                      type="text"
                      value={bullet1}
                      onChange={(e) => setBullet1(e.target.value)}
                      placeholder="01. Key rule"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={bullet2}
                      onChange={(e) => setBullet2(e.target.value)}
                      placeholder="02. Key rule"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={bullet3}
                      onChange={(e) => setBullet3(e.target.value)}
                      placeholder="03. Key rule"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Footer Call To Action
                  </label>
                  <input
                    type="text"
                    value={callToAction}
                    onChange={(e) => setCallToAction(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive Canvas Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center">
            {/* Resolution Header Indicator */}
            <div className="w-full flex items-center justify-between mb-4 px-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Retina Canvas ({aspectRatio === '1:1' ? '1080 × 1080' : aspectRatio === '4:5' ? '1080 × 1350' : '1080 × 1920'})
              </span>
              <span className="text-[11px] bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                100% Vector &amp; Pixel-Perfect PNG
              </span>
            </div>

            {/* The Canvas Frame */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 transition-all flex items-center justify-center bg-black max-w-full"
              style={{
                width: aspectRatio === '9:16' ? '330px' : aspectRatio === '4:5' ? '440px' : '480px',
                aspectRatio: aspectRatio === '1:1' ? '1 / 1' : aspectRatio === '4:5' ? '4 / 5' : '9 / 16',
              }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain block"
              />
            </div>

            {/* Quick action bar below canvas */}
            <div className="w-full mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Template: <strong className="text-white capitalize">{templateStyle.replace(/_/g, ' ')}</strong>
                {' • '}
                Theme: <strong className="text-white capitalize">{theme.replace(/_/g, ' ')}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPNG}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md shadow-rose-600/20 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download High-Res PNG</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
