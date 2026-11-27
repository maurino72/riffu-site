import assert from 'node:assert/strict';
import { test } from 'node:test';
import { lowerFirst } from '../i18n/tools.ts';
import { fingeringFor, keysFor, wordsFor } from './fingering.ts';
import {
  concertLabel,
  INSTRUMENTS,
  noteLabel,
  noteSlug,
  reading,
  writtenNotes,
  writtenNote,
} from './notes.ts';
import { detectPitch, FRAME } from './pitch.ts';
import { concertTonic, keySlug, scaleNotes, spelledName, TONICS } from './scales.ts';

const tone = (hz: number, rate = 48000, harmonics = [1, 0.5, 0.25]) =>
  Float32Array.from(
    { length: FRAME },
    (_, i) =>
      harmonics.reduce((s, a, h) => s + a * Math.sin((2 * Math.PI * hz * (h + 1) * i) / rate), 0) *
      0.2,
  );

test('the detector finds the pitch of synthetic notes within a cent', () => {
  for (const hz of [110, 220, 233.08, 440, 880, 1174.66]) {
    for (const rate of [44100, 48000]) {
      const d = detectPitch(tone(hz, rate), rate);
      assert.ok(d, `${hz} Hz at ${rate}`);
      assert.ok(Math.abs(1200 * Math.log2(d.hz / hz)) < 1, `${hz} Hz read as ${d.hz}`);
    }
  }
});

test('silence and noise are not a note', () => {
  assert.equal(detectPitch(new Float32Array(FRAME), 48000), null);
  const noise = Float32Array.from({ length: FRAME }, () => (Math.random() - 0.5) * 0.4);
  assert.equal(detectPitch(noise, 48000), null);
});

test('an alto sax sounding concert C4 reads written A4', () => {
  const r = reading(261.63);
  assert.equal(r.concert, 60);
  assert.equal(noteLabel(writtenNote(r.concert, 'alto-sax'), 'en'), 'A4');
  assert.equal(noteLabel(writtenNote(r.concert, 'clarinet'), 'es'), 'Re4');
});

test('every note of every instrument has a fingering and a unique slug', () => {
  for (const instrument of INSTRUMENTS) {
    const notes = writtenNotes(instrument);
    for (const n of notes) {
      assert.ok(keysFor(n, instrument), `${instrument} ${n}`);
      assert.ok(wordsFor(n, instrument, 'es').length > 0);
    }
    assert.equal(new Set(notes.map(noteSlug)).size, notes.length);
  }
  assert.equal(fingeringFor(57), null);
});

test('scales are spelled by letter and every note can be fingered', () => {
  const g = scaleNotes('G', 'major').map((n) => spelledName(n.spelled, 'en'));
  assert.deepEqual(g, ['G', 'A', 'B', 'C', 'D', 'E', 'F♯', 'G']);
  const db = scaleNotes('Db', 'major').map((n) => spelledName(n.spelled, 'en'));
  assert.deepEqual(db, ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C', 'D♭']);
  const cs = scaleNotes('C#', 'minor').map((n) => spelledName(n.spelled, 'es'));
  assert.deepEqual(cs, ['Do♯', 'Re♯', 'Mi', 'Fa♯', 'Sol♯', 'La', 'Si', 'Do♯']);
  for (const mode of ['major', 'minor'] as const) {
    for (const tonic of TONICS[mode]) {
      for (const n of scaleNotes(tonic, mode)) {
        assert.ok(fingeringFor(n.midi), `${tonic} ${mode} ${n.midi}`);
      }
    }
  }
  assert.equal(keySlug('F#', 'minor'), 'f-sharp-minor');
});

test('concert keys and notes are spelled conventionally', () => {
  // Alto reads C and sounds Eb; baritone reads Bb3 and sounds Db2, not C#2.
  assert.equal(concertTonic('C', 'alto-sax', 'en', 'major'), 'E♭');
  assert.equal(concertTonic('Bb', 'baritone-sax', 'en', 'major'), 'D♭');
  assert.equal(concertTonic('Eb', 'tenor-sax', 'en', 'minor'), 'C♯');
  assert.equal(concertTonic('C', 'baritone-sax', 'en', 'minor'), 'E♭');
  assert.equal(concertTonic('B', 'alto-sax', 'en', 'minor'), 'D');
  assert.equal(concertTonic('G#', 'clarinet', 'es', 'minor'), 'Fa♯');
  assert.equal(concertLabel(58, 'baritone-sax', 'en'), 'Db2');
  assert.equal(concertLabel(58, 'baritone-sax', 'es'), 'Reb2');
  assert.equal(concertLabel(75, 'alto-sax', 'en'), 'Gb4');
  assert.equal(concertLabel(72, 'alto-sax', 'en'), 'Eb4');
});

test('instrument names that start with a note letter keep their capital', () => {
  assert.equal(lowerFirst('B♭ clarinet'), 'B♭ clarinet');
  assert.equal(lowerFirst('Alto sax'), 'alto sax');
  assert.equal(lowerFirst('Clarinete en Si♭'), 'clarinete en Si♭');
});

test('a hum below the range and a squeak above it are not notes', () => {
  for (const hz of [40, 50]) assert.equal(detectPitch(tone(hz, 48000, [1]), 48000), null);
  for (const hz of [2500, 3000, 4000]) assert.equal(detectPitch(tone(hz, 48000, [1]), 48000), null);
});

test('a weak fundamental still reads its own octave, and ordinary tones are unchanged', () => {
  const shapes = [
    [0.05, 1, 0, 0.5],
    [0.1, 1, 0, 0.5],
    [1],
    [1, 0.5, 0.25],
    [1, 0.5, 0.33, 0.25, 0.2],
  ];
  for (const harmonics of shapes) {
    for (const rate of [44100, 48000]) {
      for (const hz of [98, 147, 220, 330, 440, 660, 880]) {
        const d = detectPitch(tone(hz, rate, harmonics), rate);
        assert.ok(d, `${hz} Hz ${harmonics}`);
        assert.ok(Math.abs(1200 * Math.log2(d.hz / hz)) < 5, `${hz} Hz ${harmonics} read ${d.hz}`);
      }
    }
  }
});

// A regression suite for the detector: C2 to E6 in small steps, at both common sample rates,
// over six harmonic shapes and four conditions (clean, light noise, loud noise, vibrato). It
// counts notes read an octave or more too low or too high. Both must be zero.
test('the detector never reads an octave off, across shapes, noise and vibrato', () => {
  let seed = 12345;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  type Opt = { noise: number; vib: number; trem: number };
  const make = (hz: number, rate: number, h: number[], o: Opt) => {
    const phases = h.map(() => rnd() * 2 * Math.PI);
    let phase = 0;
    const out = new Float32Array(FRAME);
    for (let i = 0; i < FRAME; i++) {
      const t = i / rate;
      phase += (2 * Math.PI * hz * (1 + o.vib * Math.sin(2 * Math.PI * 5.5 * t))) / rate;
      const env = 1 + o.trem * Math.sin(2 * Math.PI * 6 * t + 1);
      let s = 0;
      for (let k = 0; k < h.length; k++) s += h[k] * Math.sin(phase * (k + 1) + phases[k]);
      out[i] = 0.15 * env * s + o.noise * (rnd() - 0.5);
    }
    return out;
  };
  const shapes: Record<string, number[]> = {
    sine: [1],
    std: [1, 0.5, 0.25],
    rich: [1, 0.8, 0.6, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1],
    clar: [1, 0.05, 0.7, 0.05, 0.5, 0.03, 0.3],
    even2: [0.6, 1, 0.3, 0.5, 0.2],
    weak: [0.2, 1, 0.5, 0.6, 0.3],
  };
  const conditions: Record<string, Opt> = {
    clean: { noise: 0, vib: 0, trem: 0 },
    noise: { noise: 0.03, vib: 0, trem: 0 },
    loudnoise: { noise: 0.1, vib: 0, trem: 0 },
    vib: { noise: 0.01, vib: 0.004, trem: 0.1 },
  };
  const wrong: string[] = [];
  for (const [cn, o] of Object.entries(conditions)) {
    for (const [sn, h] of Object.entries(shapes)) {
      for (const rate of [44100, 48000]) {
        for (let m = 36; m <= 88; m += 0.7) {
          const hz = 440 * 2 ** ((m - 69) / 12);
          const d = detectPitch(make(hz, rate, h, o), rate);
          if (d && Math.abs(1200 * Math.log2(d.hz / hz)) > 600)
            wrong.push(`${cn}/${sn} ${hz.toFixed(1)}@${rate} -> ${d.hz.toFixed(1)}`);
        }
      }
    }
  }
  assert.deepEqual(wrong, []);
});
