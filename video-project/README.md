# RootAccess — Premium Product Demo Video (Instagram Reel)

A cinematic, high-fidelity promotional video project engineered specifically for **RootAccess** in vertical 9:16 format (Instagram Reels, YouTube Shorts, TikTok).

---

## 1. Brand Identity & Creative Direction

- **Brand:** RootAccess
- **Tagline:** Learn by Doing.
- **Brand Positioning:** A practical learning platform that helps learners and QA professionals build technical skills through hands-on practice.
- **Website:** [https://rootaccess.co.in](https://rootaccess.co.in)
- **Visual Aesthetic:**
  - Premium technology startup design system (minimalist, modern, and confident).
  - Predominantly deep black (`#030712`) with carefully controlled red accents (`#DC2626` / `#EF4444`).
  - Smooth motion graphics with cubic-bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Authentic, verified product UI and execution footage.
  - Safe margins strictly maintained (180px top, 280px bottom, 80px sides) so zero text or controls are obscured by the mobile Instagram Reels interface.
  - No generic corporate stock footage or distracting visual distortion.

---

## 2. Creative Storyboard & Scene Breakdown

| Scene | Timestamp | Key Visuals & Motion Design | Audio Design |
|---|---|---|---|
| **Scene 1: The Hook** | `0.0s – 4.0s` | Pure black canvas with subtle radial red light sweep. Kinetic typography reveal: *“Learning tech skills shouldn’t be complicated.”* Dissolves into the official RootAccess brand mark (`logo-white.png`) with red laser beam. | Deep sub-bass cinematic impact (85Hz down to 32Hz) with stereo air whoosh and crystal logo chime. |
| **Scene 2: Meet RootAccess** | `4.0s – 10.0s` | Dynamic camera push-in into the real course catalog: Playwright Automation (JS + AI), Manual QA & Defect Life Cycle, SQL Fundamentals, and API Testing with Postman. Sequential supporting statements: *“Learn practical skills.”*, *“Practice as you learn.”*, *“Build real confidence.”* | Atmospheric electronic tech pad with warm 120 bpm pulse and tactile UI transition blips. |
| **Scene 3: Open the SQL Course** | `10.0s – 15.0s` | Direct zoom onto *SQL Fundamentals to Practical Database Testing* (Launch Price: ₹299). Four-step learner journey: 1. Course overview, 2. Day 1 lesson, 3. Relational concepts, 4. Practice sandbox. Header badge: *“SQL, made simple.”* | Smooth tech transition whoosh and Day 1 unlock chime. |
| **Scene 4: SQL Demonstration (Hero)** | `15.0s – 25.0s` | **Hero Sequence:** Compact customer dataset table (`Asha`, `Ravi`, `Neha`, `Arjun`). Syntax-highlighted editor typing `SELECT name, city FROM customers WHERE city = 'Bengaluru';`. The `WHERE` clause illuminates with laser glow. The matching Bengaluru rows pulse with emerald borders while other rows dim. Rows transition into the clean 2-row result table (`Asha`, `Neha`). Explanation badge: *“Filter data. Understand the result.”* | Synchronized mechanical keyboard keystrokes, laser sweep frequency ping, dual-tone row highlight, and resonant C-major confirmation chord. |
| **Scene 5: The Learning Experience** | `25.0s – 30.0s` | Multi-feature showcase of verified RootAccess capabilities: Instant Query Validation (`✓ Verification Passed!`), Daily Checkpoint Quiz with interactive selection and 80% passing indicator, and Day 1 Progress Tracker (100% complete). Heading: *“Learn by doing, not just watching.”* | Clean high-tech validation chime and quiz pass tone. |
| **Scene 6: Brand Ending** | `30.0s – 35.0s` | Deep obsidian background. Large RootAccess logo reveal with red breathing glow. Brand promise: *“RootAccess — Learn by Doing.”* Live platform URL: `rootaccess.co.in`. Call to action: *“Start learning today →”*. Holds for 3.5s for effortless reading. | Resonant D-major 9th brand chord with sparkling harmonic shimmer and gentle fade. |

---

## 3. Deliverables & Output Specifications

All master video and image outputs are located in `video-project/output/`:

1. **4K UHD Vertical Master MP4**
   - **File:** `video-project/output/RootAccess-Reel-4K-Master.mp4`
   - **Resolution:** `2160 × 3840 pixels` (Native 4K vertical, 9:16)
   - **Frame Rate:** `30.0 fps` (1050 frames total)
   - **Duration:** `35.0 seconds`
   - **Video Codec:** `H.264 (High Profile, level 5.2)`
   - **Pixel Format:** `yuv420p`
   - **Color Space:** `BT.709 (Rec. 709 SDR)`
   - **Audio Codec:** `AAC Stereo`
   - **Sample Rate:** `48,000 Hz`
   - **Audio Bitrate:** `256 kbps`

2. **Instagram-Ready 1080p Export**
   - **File:** `video-project/output/RootAccess-Reel-Instagram-1080p.mp4`
   - **Resolution:** `1080 × 1920 pixels` (9:16 vertical)
   - **Downsampling Filter:** `Lanczos (supersampled from 4K master for superior anti-aliasing)`
   - **Frame Rate:** `30.0 fps`
   - **Video Codec:** `H.264, yuv420p`
   - **Audio Codec:** `AAC Stereo, 48 kHz`

3. **Reel Cover / Thumbnail**
   - **File:** `video-project/output/RootAccess-Reel-Cover.png`
   - **Resolution:** `2160 × 3840 pixels`
   - **Format:** `Lossless PNG`
   - **Design:** Branded final hero frame featuring RootAccess logo, tagline, URL, and CTA.

4. **Master Soundtrack**
   - **File:** `video-project/output/soundtrack.wav`
   - **Format:** `WAV PCM 16-bit stereo, 48,000 Hz`

---

## 4. How to Rerender the Video

To rerender the entire video from scratch or after modifying the template:

```bash
# 1. Regenerate the synchronized audio soundtrack (if needed)
node video-project/audio-synth.js

# 2. Render both 4K Master and Instagram 1080p videos + Cover Image
node video-project/render-reel.js
```

The script will:
1. Launch headless Chromium with device scale factor 2x for native 4K rendering.
2. Evaluate `window.seekToFrame(i, 1050)` deterministically across all 1050 frames.
3. Stream frames directly into FFmpeg with stream backpressure handling.
4. Mux the 48 kHz stereo soundtrack.
5. Generate the Lanczos downsampled 1080p Instagram export.
6. Verify duration, resolution, codecs, and file integrity.
