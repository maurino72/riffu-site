/**
 * Major and natural minor scales, spelled by letter (so G major has F#, never Gb) and written
 * for the player: the key a saxophonist or clarinettist reads, with the concert key beside it.
 */
import type { Locale } from '../i18n/ui';
import { mod12, slugOfName, TRANSPOSE, type Instrument } from './notes.ts';

export const MODES = ['major', 'minor'] as const;
export type Mode = (typeof MODES)[number];

/** The written keys offered, in circle-of-fifths order, as the app lists them. */
export const TONICS: Record<Mode, string[]> = {
  major: ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'],
  minor: ['A', 'E', 'B', 'F#', 'C#', 'G#', 'Eb', 'Bb', 'F', 'C', 'G', 'D'],
};

const STEPS: Record<Mode, number[]> = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
};

const LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const LETTER_PC = [0, 2, 4, 5, 7, 9, 11];
const SPANISH = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

export type ScaleNote = { spelled: { letter: number; alt: number }; midi: number };

const parse = (tonic: string) => ({
  letter: LETTERS.indexOf(tonic[0]),
  alt: tonic.endsWith('#') ? 1 : tonic.endsWith('b') ? -1 : 0,
});

/** A spelled name with real flat and sharp signs: `F♯`, `B♭`, `Fa♯`. */
export function spelledName(n: { letter: number; alt: number }, locale: Locale): string {
  const base = (locale === 'es' ? SPANISH : LETTERS)[n.letter];
  return base + (n.alt > 0 ? '♯'.repeat(n.alt) : '♭'.repeat(-n.alt));
}

/** The eight notes of the scale, written, from the tonic up an octave. Tonic lies in C4 to B4. */
export function scaleNotes(tonic: string, mode: Mode): ScaleNote[] {
  const t = parse(tonic);
  const tonicMidi = 60 + mod12(LETTER_PC[t.letter] + t.alt);
  const notes: ScaleNote[] = [];
  for (let i = 0; i < 8; i++) {
    const letter = (t.letter + i) % 7;
    const midi = tonicMidi + (i === 7 ? 12 : STEPS[mode][i]);
    let alt = mod12(midi - LETTER_PC[letter]);
    if (alt > 6) alt -= 12;
    notes.push({ spelled: { letter, alt }, midi });
  }
  return notes;
}

export const keySlug = (tonic: string, mode: Mode) => `${slugOfName(tonic)}-${mode}`;

/** `C#` becomes `C♯`, `Bb` becomes `B♭`, in the page's language. */
export function tonicLabel(tonic: string, locale: Locale): string {
  return spelledName(parse(tonic), locale);
}

/** The conventional name of each key, by pitch class: D♭ major (not C♯), G♯ minor (not A♭). */
const KEY_NAMES: Record<Mode, { letter: number; alt: number }[]> = {
  major: [
    [0, 0],
    [1, -1],
    [1, 0],
    [2, -1],
    [2, 0],
    [3, 0],
    [3, 1],
    [4, 0],
    [5, -1],
    [5, 0],
    [6, -1],
    [6, 0],
  ].map(([letter, alt]) => ({ letter, alt })),
  minor: [
    [0, 0],
    [0, 1],
    [1, 0],
    [2, -1],
    [2, 0],
    [3, 0],
    [3, 1],
    [4, 0],
    [4, 1],
    [5, 0],
    [6, -1],
    [6, 0],
  ].map(([letter, alt]) => ({ letter, alt })),
};

/** The key that sounds when the player reads `tonic`, for example `E♭` for an alto reading C. */
export function concertTonic(
  tonic: string,
  instrument: Instrument,
  locale: Locale,
  mode: Mode = 'major',
): string {
  const t = parse(tonic);
  const pc = mod12(LETTER_PC[t.letter] + t.alt - TRANSPOSE[instrument]);
  return spelledName(KEY_NAMES[mode][pc], locale);
}
