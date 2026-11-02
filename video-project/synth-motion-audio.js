/**
 * RootAccess Motion Graphics 20s Sound Designer & Synthesizer
 * Outputs: public/motion/audio/soundtrack.wav (48kHz 16-bit stereo)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SAMPLE_RATE = 48000;
const DURATION_SEC = 20.0;
const TOTAL_SAMPLES = Math.floor(SAMPLE_RATE * DURATION_SEC);

const leftChannel = new Float32Array(TOTAL_SAMPLES);
const rightChannel = new Float32Array(TOTAL_SAMPLES);

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

// 1. WARM HIGH-TECH AMBIENT PAD & SUB-BASS (0.0s - 20.0s)
addSound(0, 20.0, (t, p) => {
  let masterEnv = 1.0;
  if (t < 1.0) masterEnv = t / 1.0;
  if (t > 18.5) masterEnv = Math.max(0, (20.0 - t) / 1.5);

  // Modern cinematic minor chords (D minor / F / G / Bb progression)
  // Chord progression:
  // 0 - 5s: Dm (D2=73.42, A2=110.0, F3=174.61, D4=293.66)
  // 5 - 10s: Bb (Bb1=58.27, F2=87.31, D3=146.83, F3=174.61)
  // 10 - 15s: C (C2=65.41, G2=98.00, E3=164.81, G3=196.00)
  // 15 - 20s: Dm heroic resolution (D2=73.42, A2=110.0, F3=174.61, A3=220.0, E4=329.63)
  let fRoot = 73.42, fFifth = 110.0, fThird = 174.61;
  if (t >= 5 && t < 10) {
    fRoot = 58.27; fFifth = 87.31; fThird = 146.83;
  } else if (t >= 10 && t < 15) {
    fRoot = 65.41; fFifth = 98.00; fThird = 164.81;
  } else if (t >= 15) {
    fRoot = 73.42; fFifth = 110.0; fThird = 220.0;
  }

  const sub = Math.sin(2 * Math.PI * fRoot * t) * 0.28;
  const subHarmonic = Math.sin(2 * Math.PI * (fRoot * 2) * t) * 0.12;
  const pad1 = Math.sin(2 * Math.PI * fFifth * t) * 0.15;
  const pad2 = Math.sin(2 * Math.PI * fThird * t * 1.002) * 0.12;
  const pad3 = Math.sin(2 * Math.PI * (fRoot * 4) * t * 0.998) * 0.08;

  // Subtle stereo chorus motion
  const pan = Math.sin(2 * Math.PI * 0.2 * t) * 0.1;
  const sig = (sub + subHarmonic + pad1 + pad2 + pad3) * masterEnv;
  return [sig * (0.8 - pan), sig * (0.8 + pan)];
});

// 2. SUB-BASS IMPACT ON HOOK (0.3s)
addSound(0.3, 1.8, (t, p) => {
  const env = Math.exp(-p * 5.0);
  const freq = 120 * Math.exp(-p * 4.0) + 40;
  const sig = Math.sin(2 * Math.PI * freq * t) * env * 0.5;
  return [sig, sig];
});

// 3. WHOOSH REVEALS & RISERS
// Whoosh into Brand (3.7s - 4.4s)
addSound(3.7, 0.7, (t, p) => {
  const env = Math.sin(p * Math.PI);
  const noise = (Math.random() * 2 - 1) * env * 0.18;
  const sweep = Math.sin(2 * Math.PI * (150 + p * 600) * t) * env * 0.15;
  return [noise + sweep * (1 - p), noise + sweep * p];
});

// 4. TERMINAL TYPING SOUNDS (4.3s - 5.8s)
const typeTimes = [4.3, 4.45, 4.58, 4.7, 4.82, 4.95, 5.08, 5.2, 5.32, 5.48, 5.62, 5.75];
typeTimes.forEach((time, idx) => {
  addSound(time, 0.04, (t, p) => {
    const env = Math.exp(-p * 20.0);
    const click = (Math.random() * 2 - 1) * 0.14 * env;
    const tone = Math.sin(2 * Math.PI * (1800 + (idx % 4) * 220) * t) * 0.12 * env;
    const pan = (idx % 2 === 0 ? 0.3 : -0.3);
    return [(click + tone) * (0.5 - pan), (click + tone) * (0.5 + pan)];
  });
});

// 5. ENTER KEY CONFIRMATION CHIME & NEON EXPLOSION (5.9s)
addSound(5.9, 1.6, (t, p) => {
  const env = Math.exp(-p * 4.5);
  const sub = Math.sin(2 * Math.PI * 65 * t) * env * 0.45;
  const shimmer = Math.sin(2 * Math.PI * 880 * t) * env * 0.2 + Math.sin(2 * Math.PI * 1320 * t) * env * 0.15;
  return [sub + shimmer, sub + shimmer * 1.1];
});

// 6. 3D CARDS INTRO SWEEPS (7.6s, 8.2s, 8.8s, 9.4s)
[7.6, 8.2, 8.8, 9.4].forEach((time, idx) => {
  addSound(time, 0.45, (t, p) => {
    const env = Math.sin(p * Math.PI);
    const pan = (idx - 1.5) * 0.4;
    const freq = 300 + idx * 120 + p * 350;
    const tone = Math.sin(2 * Math.PI * freq * t) * env * 0.14;
    const air = (Math.random() * 2 - 1) * env * 0.08;
    return [(tone + air) * (0.5 - pan), (tone + air) * (0.5 + pan)];
  });
});

// 7. SIMULATOR CODE EXECUTION & GREEN TEST PASS PING (13.8s)
addSound(13.8, 1.4, (t, p) => {
  const env = Math.exp(-p * 3.5);
  // Crisp success chord (E6 1318.5Hz + B6 1975.5Hz)
  const ping1 = Math.sin(2 * Math.PI * 1318.5 * t) * env * 0.22;
  const ping2 = Math.sin(2 * Math.PI * 1975.5 * t) * env * 0.18;
  const ping3 = Math.sin(2 * Math.PI * 2637.0 * t) * env * 0.1;
  return [ping1 + ping2 * 0.8, ping2 + ping3 * 0.8];
});

// 8. GRAND CLIMAX RISER INTO OUTRO (15.5s - 16.5s)
addSound(15.5, 1.0, (t, p) => {
  const env = Math.pow(p, 2.5);
  const freq = 120 + Math.pow(p, 3) * 1400;
  const riser = Math.sin(2 * Math.PI * freq * t) * env * 0.3;
  const noise = (Math.random() * 2 - 1) * env * 0.22;
  return [riser + noise * (1 - p), riser + noise * p];
});

// 9. FINAL POWER IMPACT & RESOLUTION CHORD (16.5s - 20.0s)
addSound(16.5, 3.5, (t, p) => {
  const env = Math.exp(-p * 2.2);
  const sub = Math.sin(2 * Math.PI * 55 * t) * env * 0.45;
  // D Major triumphant chord (D4=293.66, F#4=369.99, A4=440.0, D5=587.33)
  const chord1 = Math.sin(2 * Math.PI * 293.66 * t) * env * 0.2;
  const chord2 = Math.sin(2 * Math.PI * 369.99 * t) * env * 0.16;
  const chord3 = Math.sin(2 * Math.PI * 440.00 * t) * env * 0.18;
  const chord4 = Math.sin(2 * Math.PI * 587.33 * t) * env * 0.12;
  const bell = Math.sin(2 * Math.PI * 1174.66 * t) * Math.exp(-p * 6.0) * 0.25;

  const left = (sub + chord1 + chord3 + bell);
  const right = (sub + chord2 + chord4 + bell);
  return [left, right];
});

// --- WAV ENCODING ---
function writeWavFile(filepath) {
  const numChannels = 2;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = SAMPLE_RATE * blockAlign;
  const dataSize = TOTAL_SAMPLES * blockAlign;

  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34); // bits per sample

  // data chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Normalize audio to avoid clipping
  let peak = 0;
  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    peak = Math.max(peak, Math.abs(leftChannel[i]), Math.abs(rightChannel[i]));
  }
  const gain = peak > 0.95 ? 0.95 / peak : 0.95;

  let offset = 44;
  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    const sL = clamp(leftChannel[i] * gain, -1, 1);
    const sR = clamp(rightChannel[i] * gain, -1, 1);

    const intL = sL < 0 ? Math.floor(sL * 32768) : Math.floor(sL * 32767);
    const intR = sR < 0 ? Math.floor(sR * 32768) : Math.floor(sR * 32767);

    buffer.writeInt16LE(intL, offset);
    buffer.writeInt16LE(intR, offset + 2);
    offset += 4;
  }

  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filepath, buffer);
  console.log(`✓ Generated synchronized soundtrack: ${filepath} (${(dataSize / (1024 * 1024)).toFixed(2)} MB)`);
}

const targetPath = path.join(__dirname, '..', 'public', 'motion', 'audio', 'soundtrack.wav');
writeWavFile(targetPath);
