/**
 * RootAccess Motion Graphics 1080p Master Video Renderer
 *
 * Renders the 20-second GSAP Motion Graphics Composition directly to:
 * 1. public/videos/rootaccess-motion-1080p.mp4 (1920 x 1080 @ 30fps, H.264 High Profile, AAC 48kHz)
 * 2. video-project/output/rootaccess-motion-1080p.mp4
 * 3. public/videos/rootaccess-motion-cover.png (High-res 1080p poster frame)
 */

import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HTML_PATH = path.join(__dirname, '..', 'public', 'motion', 'index.html');
const AUDIO_PATH = path.join(__dirname, '..', 'public', 'motion', 'audio', 'soundtrack.wav');
const OUTPUT_DIR_WEB = path.join(__dirname, '..', 'public', 'videos');
const OUTPUT_DIR_LOCAL = path.join(__dirname, 'output');

const FINAL_WEB_MP4 = path.join(OUTPUT_DIR_WEB, 'rootaccess-motion-1080p.mp4');
const FINAL_LOCAL_MP4 = path.join(OUTPUT_DIR_LOCAL, 'rootaccess-motion-1080p.mp4');
const COVER_PNG = path.join(OUTPUT_DIR_WEB, 'rootaccess-motion-cover.png');

const FPS = 30;
const DURATION_SEC = 20.0;
const TOTAL_FRAMES = Math.floor(FPS * DURATION_SEC); // 600 frames
const WIDTH = 1920;
const HEIGHT = 1080;

async function main() {
  console.log('====================================================');
  console.log('   RootAccess Motion Graphics 1080p Video Renderer');
  console.log(`   Resolution: Full HD (${WIDTH} x ${HEIGHT})`);
  console.log(`   Duration: ${DURATION_SEC}s (${TOTAL_FRAMES} frames @ ${FPS} fps)`);
  console.log('====================================================\n');

  if (!fs.existsSync(OUTPUT_DIR_WEB)) fs.mkdirSync(OUTPUT_DIR_WEB, { recursive: true });
  if (!fs.existsSync(OUTPUT_DIR_LOCAL)) fs.mkdirSync(OUTPUT_DIR_LOCAL, { recursive: true });

  if (!fs.existsSync(AUDIO_PATH)) {
    console.log('[Renderer] Generating soundtrack first...');
    const { execSync } = await import('child_process');
    execSync(`node "${path.join(__dirname, 'synth-motion-audio.js')}"`, { stdio: 'inherit' });
  }

  console.log('[Renderer] Launching Headless Chromium with GPU rasterization...');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--enable-gpu-rasterization',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--hide-scrollbars'
    ]
  });

  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1
  });

  console.log(`[Renderer] Loading composition: file://${HTML_PATH}`);
  await page.goto('file://' + HTML_PATH, { waitUntil: 'load' });

  // Hide the player UI controls during rasterization so only the native 1920x1080 root is captured
  await page.evaluate(() => {
    const controls = document.getElementById('controls');
    if (controls) controls.style.display = 'none';
    const wrap = document.getElementById('player-wrap');
    if (wrap) wrap.style.padding = '0';
    const scaler = document.getElementById('stage-scaler');
    if (scaler) {
      scaler.style.transform = 'none';
      scaler.style.boxShadow = 'none';
    }
  });

  // 1. Capture High-Resolution Cover Frame at t = 18.2s (Outro Climax)
  console.log('[Renderer] Capturing high-resolution cover poster...');
  await page.evaluate(() => window.seekToTime(18.2));
  await page.screenshot({ path: COVER_PNG, type: 'png' });
  console.log(`✓ Cover poster saved: ${COVER_PNG}`);

  // 2. Setup FFmpeg encoding pipe
  console.log('[Renderer] Spawning FFmpeg encoder process...');
  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(FPS),
    '-i', '-',
    '-i', AUDIO_PATH,
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-colorspace', 'bt709',
    '-color_primaries', 'bt709',
    '-color_trc', 'bt709',
    '-c:a', 'aac',
    '-b:a', '256k',
    '-ar', '48000',
    '-shortest',
    FINAL_WEB_MP4
  ];

  const ffmpeg = spawn(ffmpegPath, ffmpegArgs);

  ffmpeg.stderr.on('data', (d) => {
    const s = d.toString();
    if (s.includes('Error') || s.includes('fatal')) {
      console.error('[FFmpeg Error]', s.trim());
    }
  });

  const ffmpegClosed = new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
    ffmpeg.on('error', reject);
  });

  console.log(`[Renderer] Beginning frame rasterization (600 frames @ 1080p)...`);
  const startTime = Date.now();

  for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
    const t = frame / FPS;
    await page.evaluate((time) => window.seekToTime(time), t);

    const buffer = await page.screenshot({ type: 'jpeg', quality: 95 });

    const ok = ffmpeg.stdin.write(buffer);
    if (!ok) {
      await new Promise((resolve) => ffmpeg.stdin.once('drain', resolve));
    }

    if (frame % 60 === 0 || frame === TOTAL_FRAMES - 1) {
      const pct = Math.round((frame / TOTAL_FRAMES) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`  -> Rendered frame ${frame}/${TOTAL_FRAMES} (${pct}%) in ${elapsed}s`);
    }
  }

  ffmpeg.stdin.end();
  await ffmpegClosed;
  await browser.close();

  // Copy to local output folder as well
  fs.copyFileSync(FINAL_WEB_MP4, FINAL_LOCAL_MP4);

  const stats = fs.statSync(FINAL_WEB_MP4);
  const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
  const totalSec = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n====================================================');
  console.log('   🎉 VIDEO RENDER COMPLETE!');
  console.log(`   Output: ${FINAL_WEB_MP4}`);
  console.log(`   Size: ${sizeMb} MB`);
  console.log(`   Render Time: ${totalSec}s`);
  console.log('====================================================\n');
}

main().catch((err) => {
  console.error('Fatal render error:', err);
  process.exit(1);
});
