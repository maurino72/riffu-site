/**
 * Instruments, note names and the written-versus-concert maths shared by the tuner, the
 * fingering pages and the scale pages. Ported from the app's `src/tuner/notes.ts`.
 *
 * MIDI numbers are used throughout: A4 = 69, middle C = 60. A saxophone or clarinet player reads
 * written pitch, which is higher than the concert pitch that sounds.
 */
import type { Locale } from '../i18n/ui';

export const INSTRUMENTS = [
  'alto-sax',
  'tenor-sax',
  'soprano-sax',
  'baritone-sax',
  'clarinet',
] as const;
export type Instrument = (typeof INSTRUMENTS)[number];
export type Family = 'sax' | 'clarinet';

export const FAMILY: Record<Instrument, Family> = {
  'alto-sax': 'sax',
  'tenor-sax': 'sax',
  'soprano-sax': 'sax',
  'baritone-sax': 'sax',
  clarinet: 'clarinet',
};

/** Semitones from concert pitch up to written pitch (an alto in Eb reads a major sixth higher). */
export const TRANSPOSE: Record<Instrument, number> = {
  'alto-sax': 9,
  'tenor-sax': 14,
  'soprano-sax': 2,
  'baritone-sax': 21,
  clarinet: 2,
};

/** The lowest and highest written notes of each family (the app's fingering tables). */
export const RANGE: Record<Family, [number, number]> = { sax: [58, 89], clarinet: [52, 91] };

/** Saxophone players read flats for the black keys they meet most: Bb, Eb, Ab. */
const NAMES: Record<Locale, string[]> = {
  en: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
  es: ['Do', 'Do#', 'Re', 'Mib', 'Mi', 'Fa', 'Fa#', 'Sol', 'Lab', 'La', 'Sib', 'Si'],
};

export const mod12 = (n: number) => ((n % 12) + 12) % 12;

export function noteParts(midi: number, locale: Locale): { name: string; octave: number } {
  return { name: NAMES[locale][mod12(midi)], octave: Math.floor(midi / 12) - 1 };
}

/** A note as shown to people: `F#5`, `Fa#5`. */
export function noteLabel(midi: number, locale: Locale): string {
  const { name, octave } = noteParts(midi, locale);
  return `${name}${octave}`;
}

/** The note's name in URLs: `f-sharp-5`, `e-flat-4`. Always English, so both languages share it. */
export function noteSlug(midi: number): string {
  const { name, octave } = noteParts(midi, 'en');
  return `${slugOfName(name)}-${octave}`;
}

/** `F#` becomes `f-sharp`, `Eb` becomes `e-flat`, `D` becomes `d`. */
export function slugOfName(name: string): string {
  const letter = name[0].toLowerCase();
  if (name.endsWith('#')) return `${letter}-sharp`;
  if (name.endsWith('b')) return `${letter}-flat`;
  return letter;
}

export function writtenNote(concert: number, instrument: Instrument): number {
  return concert + TRANSPOSE[instrument];
}

export function concertNote(written: number, instrument: Instrument): number {
  return written - TRANSPOSE[instrument];
}

/** Nearest concert note and how many cents the sound is off it (-50 to +50). */
export function reading(hz: number, refA = 440): { concert: number; cents: number } {
  const exact = 69 + 12 * Math.log2(hz / refA);
  const concert = Math.round(exact);
  return { concert, cents: (exact - concert) * 100 };
}

/** Every written note an instrument can play, low to high. */
export function writtenNotes(instrument: Instrument): number[] {
  const [low, high] = RANGE[FAMILY[instrument]];
  return Array.from({ length: high - low + 1 }, (_, i) => low + i);
}
