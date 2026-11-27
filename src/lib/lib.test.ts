import assert from 'node:assert/strict';
import { test } from 'node:test';
import { fingeringFor, keysFor, wordsFor } from './fingering.ts';
import { INSTRUMENTS, noteLabel, noteSlug, reading, writtenNotes, writtenNote } from './notes.ts';
import { detectPitch, FRAME } from './pitch.ts';
import { keySlug, scaleNotes, spelledName, TONICS } from './scales.ts';

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
