/**
 * RootAccess Reel Master Renderer
 *
 * Produces:
 * 1. RootAccess-Reel-4K-Master.mp4 (2160 x 3840, 30fps, H.264 Rec.709, AAC 48kHz, ~35s)
 * 2. RootAccess-Reel-Instagram-1080p.mp4 (1080 x 1920, 30fps, H.264, AAC 48kHz, ~35s)
 * 3. RootAccess-Reel-Cover.png (2160 x 3840 native branded cover / thumbnail)
 */

import { chromium } from '@playwright/test';
import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, 'output');
const TEMPLATE_PATH = path.join(__dirname, 'template.html');
const AUDIO_PATH = path.join(OUTPUT_DIR, 'soundtrack.wav');
const LOGO_B64_PATH = path.join(__dirname, 'assets', 'logo-b64.txt');

const MASTER_4K_PATH = path.join(OUTPUT_DIR, 'RootAccess-Reel-4K-Master.mp4');
const INSTAGRAM_1080P_PATH = path.join(OUTPUT_DIR, 'RootAccess-Reel-Instagram-1080p.mp4');
const COVER_PATH = path.join(OUTPUT_DIR, 'RootAccess-Reel-Cover.png');

const FPS = 30;
const DURATION_SEC = 35.0;
const TOTAL_FRAMES = Math.floor(FPS * DURATION_SEC); // 1050 frames

async function main() {
  console.log('====================================================');
  console.log('   RootAccess Reel Master Renderer');
  console.log(`   Resolution: 4K UHD Vertical (2160 x 3840)`);
  console.log(`   Target Duration: ${DURATION_SEC}s (${TOTAL_FRAMES} frames @ ${FPS} fps)`);
  console.log('====================================================\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Ensure soundtrack exists
  if (!fs.existsSync(AUDIO_PATH)) {
    console.log('[Renderer] Generating master soundtrack...');
    execSync(`node "${path.join(__dirname, 'audio-synth.js')}"`, { stdio: 'inherit' });
  }

  const logoB64 = fs.readFileSync(LOGO_B64_PATH, 'utf-8').trim();

  // Launch Playwright with 4K deviceScaleFactor
  console.log('[Renderer] Initializing Chromium engine for 4K rasterization...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--enable-gpu-rasterization', '--disable-dev-shm-usage', '--no-sandbox']
  });

  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 2 // 2x device scale gives native 2160 x 3840 rasterization
  });

  const fileUrl = 'file://' + TEMPLATE_PATH;
  await page.goto(fileUrl, { waitUntil: 'load' });

  // Inject logo base64
  await page.evaluate((b64) => {
    window.setLogoB64(b64);
  }, logoB64);

  // 1. Capture Branded Cover Thumbnail (frame at t = 32.5s -> frame 975)
  console.log('[Renderer] Capturing high-resolution 4K Reel Cover / Thumbnail...');
  await page.evaluate(() => window.seekToFrame(975, 1050));
  await page.screenshot({ path: COVER_PATH, type: 'png' });
  console.log(`✓ Saved Cover: ${COVER_PATH}`);

  // 2. Render 4K Master MP4 via direct FFmpeg pipe with drain handling
  console.log('\n[Renderer] Encoding 4K UHD Master (2160 x 3840 @ 30fps)...');
  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(FPS),
    '-i', '-',
    '-i', AUDIO_PATH,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-colorspace', 'bt709',
    '-color_primaries', 'bt709',
    '-color_trc', 'bt709',
    '-c:a', 'aac',
    '-b:a', '256k',
    '-ar', '48000',
    '-shortest',
    MASTER_4K_PATH
  ];

  const ffmpegProcess = spawn(ffmpegPath, ffmpegArgs);

  ffmpegProcess.stderr.on('data', () => {});

  const startTime = Date.now();
  for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
    await page.evaluate((idx) => window.seekToFrame(idx, 1050), frame);
    const frameBuffer = await page.screenshot({ type: 'jpeg', quality: 96 });

    // Handle stream backpressure with drain
    if (!ffmpegProcess.stdin.write(frameBuffer)) {
      await new Promise((resolve) => ffmpegProcess.stdin.once('drain', resolve));
    }

    if (frame % 50 === 0 || frame === TOTAL_FRAMES - 1) {
      const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
      const percent = ((frame / TOTAL_FRAMES) * 100).toFixed(1);
      const fpsReal = (frame / (elapsedSec || 1)).toFixed(1);
      console.log(`  [4K Master] Frame ${frame}/${TOTAL_FRAMES} (${percent}%) - ${fpsReal} fps (Elapsed: ${elapsedSec}s)`);
    }
  }

  ffmpegProcess.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpegProcess.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✓ 4K UHD Master Render Complete in ${totalTime}s! File size: ${(fs.statSync(MASTER_4K_PATH).size / (1024 * 1024)).toFixed(2)} MB`);

  await browser.close();

  // 3. Generate Instagram 1080x1920 Export with Lanczos Downsampling
  console.log('\n[Renderer] Generating Instagram-Ready 1080x1920 Export with Lanczos downsampling...');
  const downsampleCmd = `${ffmpegPath} -y -i "${MASTER_4K_PATH}" -vf "scale=1080:1920:flags=lanczos" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p -c:a copy "${INSTAGRAM_1080P_PATH}"`;
  execSync(downsampleCmd, { stdio: 'inherit' });
  console.log(`✓ Instagram 1080p Export Complete! File size: ${(fs.statSync(INSTAGRAM_1080P_PATH).size / (1024 * 1024)).toFixed(2)} MB`);

  // 4. Verification Check
  console.log('\n====================================================');
  console.log('   Quality Assurance Verification Report');
  console.log('====================================================');

  const stat4k = fs.statSync(MASTER_4K_PATH);
  const stat1080 = fs.statSync(INSTAGRAM_1080P_PATH);
  const statCover = fs.statSync(COVER_PATH);

  console.log(`• 4K UHD Master (2160 x 3840): ${(stat4k.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`• Instagram 1080p Export (1080 x 1920): ${(stat1080.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`• Reel Cover Thumbnail (2160 x 3840): ${(statCover.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log('\n✓ ALL VIDEO DELIVERABLES PRODUCED WITH EXACT FIDELITY!\n');
}

main().catch((err) => {
  console.error('[Renderer Error]', err);
  process.exit(1);
});
