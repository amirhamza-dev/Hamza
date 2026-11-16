/**
 * Generates the background music used by the website.
 *
 * ---------------------------------------------------------------------------
 * LICENSE / ORIGIN
 * ---------------------------------------------------------------------------
 * This track ("A Little Story — Theme") is an original composition created
 * programmatically by this script (pure additive synthesis + a simple reverb).
 * It contains no samples, no third-party recordings and no copyrighted
 * material, so it can be used and distributed freely with this project.
 *
 * Run it with:  node scripts/generate-music.mjs
 * Output:       public/audio/a-little-story-theme.wav
 * ---------------------------------------------------------------------------
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SAMPLE_RATE = 22050; // mono 22.05 kHz keeps the asset small (≈2.4 MB)
const BPM = 68; // slow, relaxing tempo
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const CYCLES = 4; // 4 x 4 bars ≈ 56 s of music, then it loops

const midiToFreq = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

const chords = [
  { pad: [53, 57, 60, 64], bass: 41 }, // Fmaj7
  { pad: [50, 53, 57, 60], bass: 38 }, // Dm7
  { pad: [46, 50, 53, 57], bass: 34 }, // Bbmaj7
  { pad: [48, 52, 55, 62], bass: 36 }, // Cadd9
];

// Gentle singable line, one bar of the progression per group.
const melody = [
  { beat: 0, dur: 1, midi: 69 },
  { beat: 1, dur: 1, midi: 72 },
  { beat: 2, dur: 0.5, midi: 69 },
  { beat: 2.5, dur: 0.5, midi: 67 },
  { beat: 3, dur: 1, midi: 65 },
  { beat: 4, dur: 1.5, midi: 65 },
  { beat: 5.5, dur: 0.5, midi: 69 },
  { beat: 6, dur: 1, midi: 67 },
  { beat: 7, dur: 1, midi: 64 },
  { beat: 8, dur: 1, midi: 70 },
  { beat: 9, dur: 1, midi: 74 },
  { beat: 10, dur: 1, midi: 72 },
  { beat: 11, dur: 1, midi: 69 },
  { beat: 12, dur: 1.5, midi: 72 },
  { beat: 13.5, dur: 0.5, midi: 70 },
  { beat: 14, dur: 1, midi: 69 },
  { beat: 15, dur: 1, midi: 67 },
];

const totalSeconds = CYCLES * 4 * BAR + 2;
const buffer = new Float32Array(Math.ceil(totalSeconds * SAMPLE_RATE));

// ---------------------------------------------------------------------------
// Instruments
// ---------------------------------------------------------------------------

/** Soft felt-piano style tone: additive harmonics with individual decay. */
function piano(startTime, dur, midi, gain) {
  const freq = midiToFreq(midi);
  const start = Math.floor(startTime * SAMPLE_RATE);
  const release = 1.7;
  const length = Math.min(
    buffer.length - start,
    Math.ceil((dur + release) * SAMPLE_RATE),
  );
  const partials = [
    { ratio: 1, gain: 1, decay: 2.1 },
    { ratio: 2, gain: 0.42, decay: 1.3 },
    { ratio: 3, gain: 0.2, decay: 0.95 },
    { ratio: 4.02, gain: 0.1, decay: 0.7 },
    { ratio: 5.05, gain: 0.05, decay: 0.5 },
  ];
  const attack = 0.008;

  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const envelope =
      (t < attack ? t / attack : 1) * Math.exp(-t / 2.4) * 1;
    let sample = 0;
    for (let p = 0; p < partials.length; p += 1) {
      const partial = partials[p];
      sample +=
        Math.sin(2 * Math.PI * freq * partial.ratio * t) *
        partial.gain *
        Math.exp(-t / partial.decay);
    }
    buffer[start + i] += sample * envelope * gain * 0.32;
  }
}

/** Warm sustained pad, used to keep the harmony breathing underneath. */
function pad(startTime, dur, midi, gain) {
  const freq = midiToFreq(midi);
  const start = Math.floor(startTime * SAMPLE_RATE);
  const length = Math.min(
    buffer.length - start,
    Math.ceil((dur + 1.2) * SAMPLE_RATE),
  );
  const attack = 0.9;
  const release = 1.2;

  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const rise = t < attack ? t / attack : 1;
    const fall = t > dur ? Math.max(0, 1 - (t - dur) / release) : 1;
    const drift = 1 + 0.0016 * Math.sin(2 * Math.PI * 0.13 * t);
    const sample =
      Math.sin(2 * Math.PI * freq * drift * t) * 0.6 +
      Math.sin(2 * Math.PI * freq * 2 * t) * 0.12;
    buffer[start + i] += sample * rise * fall * gain;
  }
}

/** Deep, very soft bass note that anchors each bar. */
function bass(startTime, midi) {
  const freq = midiToFreq(midi);
  const start = Math.floor(startTime * SAMPLE_RATE);
  const dur = BAR * 1.05;
  const length = Math.min(buffer.length - start, Math.ceil(dur * SAMPLE_RATE));

  for (let i = 0; i < length; i += 1) {
    const t = i / SAMPLE_RATE;
    const attack = t < 0.05 ? t / 0.05 : 1;
    const envelope = attack * Math.exp(-t / 1.6);
    const sample =
      Math.sin(2 * Math.PI * freq * t) * 0.8 +
      Math.sin(2 * Math.PI * freq * 2 * t) * 0.1;
    buffer[start + i] += sample * envelope * 0.22;
  }
}

// ---------------------------------------------------------------------------
// Arrangement
// ---------------------------------------------------------------------------

const cycleSeconds = 4 * BAR;

for (let cycle = 0; cycle < CYCLES; cycle += 1) {
  const cycleStart = cycle * cycleSeconds;
  const quieter = cycle === 2; // third pass drops an octave and softens down
  const melodicGain = quieter ? 0.34 : 0.46;

  chords.forEach((chord, barIndex) => {
    const barStart = cycleStart + barIndex * BAR;

    chord.pad.forEach((note) => pad(barStart, BAR * 0.96, note, 0.09));
    bass(barStart, chord.bass + (quieter ? 0 : 12));
  });

  melody.forEach((note) => {
    const midi = note.midi + (quieter ? -12 : 0);
    piano(cycleStart + note.beat * BEAT, note.dur * BEAT, midi, melodicGain);
  });

  if (cycle === CYCLES - 1) {
    // Closing note that gently resolves before the loop restarts.
    piano(cycleStart + 16 * BEAT, BEAT * 2, quieter ? 53 : 65, 0.5);
  }
}

// ---------------------------------------------------------------------------
// Space: a very light comb reverb + soft low-pass on the wet signal
// ---------------------------------------------------------------------------

const wet = new Float32Array(buffer.length);
const combs = [
  { delay: 0.087, feedback: 0.42, mix: 0.32 },
  { delay: 0.131, feedback: 0.36, mix: 0.26 },
];

combs.forEach(({ delay, feedback, mix }) => {
  const d = Math.round(delay * SAMPLE_RATE);
  for (let i = d; i < buffer.length; i += 1) {
    wet[i] += (buffer[i - d] + wet[i - d] * feedback) * mix;
  }
});

let previous = 0;
const smoothing = 0.32; // one-pole low-pass, keeps the reverb warm
for (let i = 0; i < wet.length; i += 1) {
  previous += smoothing * (wet[i] - previous);
  buffer[i] = buffer[i] * 0.86 + previous * 0.5;
}

// Fade in / fade out so the loop never clicks.
const fadeIn = Math.floor(1.6 * SAMPLE_RATE);
const fadeOut = Math.floor(2.4 * SAMPLE_RATE);
for (let i = 0; i < fadeIn; i += 1) {
  buffer[i] *= i / fadeIn;
}
for (let i = 0; i < fadeOut; i += 1) {
  buffer[buffer.length - 1 - i] *= i / fadeOut;
}

// Normalise to a comfortable listening level.
let peak = 0;
for (let i = 0; i < buffer.length; i += 1) {
  const value = Math.abs(buffer[i]);
  if (value > peak) peak = value;
}
const normalise = peak > 0 ? 0.86 / peak : 1;
for (let i = 0; i < buffer.length; i += 1) {
  buffer[i] = Math.max(-1, Math.min(1, buffer[i] * normalise));
}

// ---------------------------------------------------------------------------
// Write a 16-bit mono WAV file
// ---------------------------------------------------------------------------

const dataSize = buffer.length * 2;
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20); // PCM
header.writeUInt16LE(1, 22); // mono
header.writeUInt32LE(SAMPLE_RATE, 24);
header.writeUInt32LE(SAMPLE_RATE * 2, 28);
header.writeUInt16LE(2, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(dataSize, 40);

const pcm = Buffer.alloc(dataSize);
for (let i = 0; i < buffer.length; i += 1) {
  pcm.writeInt16LE(Math.round(buffer[i] * 32767), i * 2);
}

const outputDir = path.join(process.cwd(), "public", "audio");
await mkdir(outputDir, { recursive: true });

const outputFile = path.join(outputDir, "a-little-story-theme.wav");
await writeFile(outputFile, Buffer.concat([header, pcm]));

console.log(
  `Wrote ${outputFile} — ${(buffer.length / SAMPLE_RATE).toFixed(1)}s, ` +
    `${((dataSize + 44) / 1024 / 1024).toFixed(2)} MB`,
);
