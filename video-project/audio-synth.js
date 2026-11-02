/**
 * RootAccess Cinematic Sound Design & Music Synthesizer
 * Generates a pristine 48kHz 16-bit stereo WAV soundtrack with:
 * - Ambient technology musical bed (warm pads, subtle sub pulses)
 * - Synchronized sound effects (sub-bass impacts, UI transitions, keyboard typing, verification chimes)
 * - Cinematic closing brand chord
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAMPLE_RATE = 48000;
const DURATION_SEC = 35.0;
const TOTAL_SAMPLES = Math.floor(SAMPLE_RATE * DURATION_SEC);

// Stereo buffers
const leftChannel = new Float32Array(TOTAL_SAMPLES);
const rightChannel = new Float32Array(TOTAL_SAMPLES);

// --- HELPER DSP FUNCTIONS ---
function clamp(v, min = -1, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function addSound(startSec, durationSec, genFn) {
  const startSample = Math.floor(startSec * SAMPLE_RATE);
  const totalSoundSamples = Math.floor(durationSec * SAMPLE_RATE);
  const endSample = Math.min(TOTAL_SAMPLES, startSample + totalSoundSamples);

  for (let i = startSample; i < endSample; i++) {
    const localT = (i - startSample) / SAMPLE_RATE;
    const progress = localT / durationSec;
    const [l, r] = genFn(localT, progress);
    leftChannel[i] += l;
    rightChannel[i] += r;
  }
}

// 1. AMBIENT ELECTRONIC MUSIC BED (0 to 35s)
addSound(0, 35.0, (t, p) => {
  // Fade in first 1.5s, fade out last 2s
  let masterEnv = 1.0;
  if (t < 1.5) masterEnv = t / 1.5;
  if (t > 33.0) masterEnv = Math.max(0, (35.0 - t) / 2.0);

  // Warm layered electronic pad chords (F minor / Ab major vibe)
  // Low frequency foundation (F2 87.31Hz, C3 130.81Hz, Ab3 207.65Hz, Eb4 311.13Hz)
  const f1 = 87.31;
  const f2 = 130.81;
  const f3 = 207.65;
  const f4 = 311.13;
  const f5 = 466.16; // Bb4

  // Subtle slow LFO for filter sweep feeling (0.15 Hz)
  const lfo = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.15 * t);
  const detune = 0.5 * Math.sin(2 * Math.PI * 0.4 * t);

  const osc1 = Math.sin(2 * Math.PI * f1 * t) * 0.08;
  const osc2 = Math.sin(2 * Math.PI * (f2 + detune) * t) * 0.06;
  const osc3 = Math.sin(2 * Math.PI * f3 * t) * 0.05 * lfo;
  const osc4 = Math.sin(2 * Math.PI * (f4 - detune) * t) * 0.04;
  const osc5 = Math.sin(2 * Math.PI * f5 * t) * 0.03 * (1 - lfo * 0.5);

  const pad = (osc1 + osc2 + osc3 + osc4 + osc5) * masterEnv * 0.35;

  // Subtle rhythmic pulse (tempo: 120 bpm = 0.5s period)
  const beatProgress = (t % 0.5) / 0.5;
  const pulseEnv = Math.exp(-beatProgress * 8.0);
  const pulseOsc = Math.sin(2 * Math.PI * 65.41 * t) * pulseEnv * 0.08 * masterEnv;

  // Stereo widening via slight phase shift
  return [pad + pulseOsc, pad * 0.95 + pulseOsc];
});

// 2. SCENE 1 HOOK: Sub-bass impact and cinematic whoosh (t = 0.05s)
addSound(0.05, 3.2, (t) => {
  const env = Math.exp(-t * 2.2);
  const pitch = 85.0 * Math.exp(-t * 1.8) + 32.0; // drops from 117Hz down to 32Hz
  const sub = Math.sin(2 * Math.PI * pitch * t) * env * 0.65;

  // Soft atmospheric whoosh
  const noise = (Math.random() * 2 - 1) * Math.exp(-t * 3.5) * 0.12;
  return [sub + noise, sub + noise * 0.9];
});

// Logo reveal shimmer at t = 2.5s
addSound(2.5, 1.8, (t) => {
  const env = Math.exp(-t * 2.8);
  const c1 = Math.sin(2 * Math.PI * 1318.51 * t) * env * 0.12; // E6
  const c2 = Math.sin(2 * Math.PI * 1975.53 * t) * env * 0.08; // B6
  return [c1 * 0.8, c2 * 0.8];
});

// 3. SCENE 2 TRANSITION & SUPPORTING STATEMENTS
// Whoosh at t = 3.9s
addSound(3.9, 0.9, (t) => {
  const env = Math.sin(Math.PI * (t / 0.9));
  const noise = (Math.random() * 2 - 1) * env * 0.18;
  const pan = t / 0.9;
  return [noise * (1 - pan), noise * pan];
});

// Tactile UI blips for supporting statements
const statementTimes = [4.2, 6.2, 8.2];
const statementFreqs = [784, 988, 1175];
statementTimes.forEach((st, idx) => {
  addSound(st, 0.4, (t) => {
    const env = Math.exp(-t * 14.0);
    const tone = Math.sin(2 * Math.PI * statementFreqs[idx] * t) * env * 0.15;
    return [tone * 0.9, tone * 1.1];
  });
});

// 4. SCENE 3 TRANSITION: Open SQL Course (t = 9.9s)
addSound(9.9, 1.0, (t) => {
  const env = Math.sin(Math.PI * (t / 1.0));
  const noise = (Math.random() * 2 - 1) * env * 0.16;
  const tone = Math.sin(2 * Math.PI * 220 * t) * env * 0.12;
  return [noise * 0.8 + tone, noise + tone * 0.8];
});

// Day 1 unlock chime at t = 13.5s
addSound(13.5, 0.8, (t) => {
  const env = Math.exp(-t * 6.0);
  const tone = Math.sin(2 * Math.PI * 880 * t) * env * 0.14;
  return [tone, tone];
});

// 5. SCENE 4: SQL DEMONSTRATION (Hero Sequence)
// Transition into editor at t = 14.9s
addSound(14.9, 0.8, (t) => {
  const env = Math.sin(Math.PI * (t / 0.8));
  const noise = (Math.random() * 2 - 1) * env * 0.15;
  return [noise * 0.7, noise * 0.9];
});

// Keystroke clicks during typing (16.8s to 19.8s)
const keyTimes = [
  16.8, 17.0, 17.15, 17.32, 17.55, 17.75, 17.92,
  18.15, 18.35, 18.52, 18.72, 18.95, 19.15, 19.35, 19.55, 19.75
];
keyTimes.forEach((kt) => {
  addSound(kt, 0.06, (t) => {
    const env = Math.exp(-t * 90.0);
    // Transient click: high-frequency noise + 2800 Hz click resonance
    const click = ((Math.random() * 2 - 1) * 0.6 + Math.sin(2 * Math.PI * 2800 * t) * 0.4) * env * 0.22;
    return [click, click * 0.9];
  });
});

// WHERE clause laser highlight at t = 20.3s
addSound(20.3, 0.9, (t) => {
  const env = Math.exp(-t * 4.0);
  const sweepPitch = 1200 - t * 400;
  const sweep = Math.sin(2 * Math.PI * sweepPitch * t) * env * 0.16;
  return [sweep * 0.8, sweep * 1.1];
});

// Bengaluru matching rows highlight at t = 21.6s
addSound(21.6, 0.8, (t) => {
  const env = Math.exp(-t * 5.0);
  const t1 = Math.sin(2 * Math.PI * 659.25 * t) * env * 0.18; // E5
  const t2 = Math.sin(2 * Math.PI * 987.77 * t) * env * 0.14; // B5
  return [t1 + t2 * 0.5, t1 * 0.5 + t2];
});

// Matching query result confirmation chord at t = 23.3s
addSound(23.3, 1.8, (t) => {
  const env = Math.exp(-t * 2.5);
  const c1 = Math.sin(2 * Math.PI * 523.25 * t) * env * 0.22; // C5
  const c2 = Math.sin(2 * Math.PI * 659.25 * t) * env * 0.18; // E5
  const c3 = Math.sin(2 * Math.PI * 783.99 * t) * env * 0.16; // G5
  const c4 = Math.sin(2 * Math.PI * 1046.50 * t) * env * 0.12; // C6
  const chord = c1 + c2 + c3 + c4;
  return [chord * 0.9, chord * 1.1];
});

// 6. SCENE 5: SHOW THE LEARNING EXPERIENCE (t = 25.0s to 30.0s)
// Whoosh transition at t = 24.9s
addSound(24.9, 0.8, (t) => {
  const env = Math.sin(Math.PI * (t / 0.8));
  const noise = (Math.random() * 2 - 1) * env * 0.15;
  return [noise * 0.9, noise * 0.7];
});

// Verification Passed chime at t = 26.5s
addSound(26.5, 1.2, (t) => {
  const env = Math.exp(-t * 3.5);
  const bell = (Math.sin(2 * Math.PI * 1046.50 * t) + Math.sin(2 * Math.PI * 1318.51 * t) * 0.7) * env * 0.22;
  return [bell, bell * 1.05];
});

// Checkpoint Quiz passed chime at t = 28.2s
addSound(28.2, 1.2, (t) => {
  const env = Math.exp(-t * 4.0);
  const tone = (Math.sin(2 * Math.PI * 880 * t) + Math.sin(2 * Math.PI * 1174.66 * t) * 0.6) * env * 0.18;
  return [tone * 1.05, tone];
});

// 7. SCENE 6: BRAND ENDING (t = 30.0s to 35.0s)
// Deep cinematic impact at t = 29.9s
addSound(29.9, 3.5, (t) => {
  const env = Math.exp(-t * 1.6);
  const pitch = 90.0 * Math.exp(-t * 1.5) + 36.0;
  const sub = Math.sin(2 * Math.PI * pitch * t) * env * 0.7;
  const air = (Math.random() * 2 - 1) * Math.exp(-t * 2.8) * 0.12;
  return [sub + air, sub + air];
});

// Magnificent brand reveal chord at t = 31.0s (D major 9th with sparkling harmonics)
addSound(31.0, 3.8, (t) => {
  const env = Math.exp(-t * 1.1);
  const n1 = Math.sin(2 * Math.PI * 146.83 * t) * 0.25; // D3
  const n2 = Math.sin(2 * Math.PI * 220.00 * t) * 0.20; // A3
  const n3 = Math.sin(2 * Math.PI * 369.99 * t) * 0.18; // F#4
  const n4 = Math.sin(2 * Math.PI * 554.37 * t) * 0.14; // C#5
  const n5 = Math.sin(2 * Math.PI * 659.25 * t) * 0.12; // E5
  const n6 = Math.sin(2 * Math.PI * 1108.73 * t) * 0.08 * Math.exp(-t * 2.5); // C#6 shimmer
  const chord = (n1 + n2 + n3 + n4 + n5 + n6) * env * 0.45;
  return [chord * 0.95, chord * 1.05];
});

// Final red accent button pulse at t = 32.5s
addSound(32.5, 1.2, (t) => {
  const env = Math.exp(-t * 5.0);
  const ping = Math.sin(2 * Math.PI * 1318.51 * t) * env * 0.12;
  return [ping, ping];
});

// WRITE WAV FILE
function writeWav(outputPath) {
  const header = Buffer.alloc(44);
  const numChannels = 2;
  const bitsPerSample = 16;
  const byteRate = SAMPLE_RATE * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = TOTAL_SAMPLES * blockAlign;

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  const pcmData = Buffer.alloc(dataSize);
  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    const l = Math.floor(clamp(leftChannel[i]) * 32767);
    const r = Math.floor(clamp(rightChannel[i]) * 32767);
    pcmData.writeInt16LE(l, i * 4);
    pcmData.writeInt16LE(r, i * 4 + 2);
  }

  fs.writeFileSync(outputPath, Buffer.concat([header, pcmData]));
  console.log(`[AudioSynth] Generated 35.0s master WAV: ${outputPath} (${(dataSize / (1024 * 1024)).toFixed(2)} MB)`);
}

const outWav = path.join(__dirname, 'output', 'soundtrack.wav');
writeWav(outWav);
