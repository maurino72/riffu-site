/**
 * Fingerings for every written note, ported from the app (`src/fingering/`): one standard
 * fingering per note. The four saxophones finger a written note the same way, so the sax table
 * is keyed by written pitch (C4 = 60). Alternates (side Bb, forked F#, front F) are not listed.
 *
 * The clarinet table carries the app's open teacher check: a clarinettist still has to confirm
 * the fingerings and the key map before they are called final.
 */
import type { Locale } from '../i18n/ui';
import { FAMILY, type Family, type Instrument } from './notes.ts';

export const KEYS = [
  'octave',
  // Left hand: the three main keys, the small bis key between the first two, the palm keys and the little-finger table.
  'l1',
  'bis',
  'l2',
  'l3',
  'palmD',
  'palmEb',
  'palmF',
  'gSharp',
  'lowCSharp',
  'lowB',
  'lowBb',
  // Right hand: the three main keys, the side keys and the two little-finger keys.
  'r1',
  'r2',
  'r3',
  'sideE',
  'sideC',
  'sideBb',
  'eFlat',
  'lowC',
] as const;
export type Key = (typeof KEYS)[number];

const SIX: Key[] = ['l1', 'l2', 'l3', 'r1', 'r2', 'r3'];
const LEFT: Key[] = ['l1', 'l2', 'l3'];

/** The first octave, low Bb (58) to C#5 (73). From D5 the second octave repeats it with the octave key. */
const LOW: Record<number, Key[]> = {
  58: [...SIX, 'lowC', 'lowBb'],
  59: [...SIX, 'lowC', 'lowB'],
  60: [...SIX, 'lowC'],
  61: [...SIX, 'lowC', 'lowCSharp'],
  62: [...SIX],
  63: [...SIX, 'eFlat'],
  64: [...LEFT, 'r1', 'r2'],
  65: [...LEFT, 'r1'],
  66: [...LEFT, 'r2'],
  67: [...LEFT],
  68: [...LEFT, 'gSharp'],
  69: ['l1', 'l2'],
  70: ['l1', 'bis'],
  71: ['l1'],
  72: ['l2'],
  73: [],
};

/** The palm keys, high D (86) to F (89): no main keys, the octave key, and the keys add up as the note rises. */
const PALM: Record<number, Key[]> = {
  86: ['octave', 'palmD'],
  87: ['octave', 'palmD', 'palmEb'],
  88: ['octave', 'palmD', 'palmEb', 'sideE'],
  89: ['octave', 'palmD', 'palmEb', 'palmF', 'sideE'],
};

export const LOWEST = 58;
export const HIGHEST = 89;

/** The keys to press for a written note, or null outside low Bb to high F. */
export function fingeringFor(midi: number): Key[] | null {
  if (LOW[midi]) return LOW[midi];
  if (PALM[midi]) return PALM[midi];
  // D5 to C#6: the note an octave below, plus the octave key.
  if (midi >= 74 && midi <= 85 && LOW[midi - 12]) return ['octave', ...LOW[midi - 12]];
  return null;
}

const SAX_NAMES: Record<Key, { en: string; es: string }> = {
  octave: { en: 'octave key', es: 'llave de octava' },
  l1: { en: 'left first finger', es: 'primer dedo izquierdo' },
  bis: { en: 'bis key', es: 'llave de bis' },
  l2: { en: 'left second finger', es: 'segundo dedo izquierdo' },
  l3: { en: 'left third finger', es: 'tercer dedo izquierdo' },
  palmD: { en: 'D palm key', es: 'llave de palma de Re' },
  palmEb: { en: 'Eb palm key', es: 'llave de palma de Mib' },
  palmF: { en: 'F palm key', es: 'llave de palma de Fa' },
  gSharp: { en: 'G# key (left little finger)', es: 'llave de Sol# (meñique izquierdo)' },
  lowCSharp: {
    en: 'low C# key (left little finger)',
    es: 'llave de Do# grave (meñique izquierdo)',
  },
  lowB: { en: 'low B key (left little finger)', es: 'llave de Si grave (meñique izquierdo)' },
  lowBb: { en: 'low Bb key (left little finger)', es: 'llave de Sib grave (meñique izquierdo)' },
  r1: { en: 'right first finger', es: 'primer dedo derecho' },
  r2: { en: 'right second finger', es: 'segundo dedo derecho' },
  r3: { en: 'right third finger', es: 'tercer dedo derecho' },
  sideE: { en: 'high E side key (right hand)', es: 'llave lateral de Mi agudo (mano derecha)' },
  sideC: { en: 'side C key', es: 'llave lateral de Do' },
  sideBb: { en: 'side Bb key', es: 'llave lateral de Sib' },
  eFlat: { en: 'Eb key (right little finger)', es: 'llave de Mib (meñique derecho)' },
  lowC: { en: 'low C key (right little finger)', es: 'llave de Do grave (meñique derecho)' },
};

/** The fingering in words, for a screen reader and under the chart. */
export function fingeringWords(midi: number, locale: Locale): string {
  const keys = fingeringFor(midi);
  if (!keys) return '';
  if (!keys.length) return locale === 'es' ? 'Ninguna llave: abierto.' : 'No keys: open.';
  // Bis Bb is one finger on two keys, not two fingers.
  const bis = keys.includes('bis') && keys.includes('l1');
  const both =
    locale === 'es'
      ? 'primer dedo izquierdo sobre la llave de Si y la de bis a la vez'
      : 'left first finger on the B key and the bis key together';
  const names = keys
    .filter((k) => !(bis && k === 'bis'))
    .map((k) => (bis && k === 'l1' ? both : SAX_NAMES[k][locale]));
  return `${names.join(', ')}.`.replace(/^./, (c) => c.toUpperCase());
}

export const CLARINET_KEYS = [
  // Left hand: the thumb hole and the register key behind, the A and throat G# keys above the first finger, the three rings.
  'thumb',
  'register',
  'aKey',
  'throatGSharp',
  'l1',
  'l2',
  'l3',
  // The left little finger: the C#/G# key, then E/B, F/C and F#/C#.
  'lCSharp',
  'lE',
  'lF',
  'lFSharp',
  // The right hand: the four side keys (top to bottom), the three rings.
  'side1',
  'side2',
  'side3',
  'side4',
  'r1',
  'r2',
  'r3',
  // The right little finger: E/B, F/C, F#/C# and G#/D# (Ab/Eb).
  'rE',
  'rF',
  'rFSharp',
  'rGSharp',
] as const;
export type ClarinetKey = (typeof CLARINET_KEYS)[number];

const CL_LEFT: ClarinetKey[] = ['thumb', 'l1', 'l2', 'l3'];
const CL_ALL: ClarinetKey[] = [...CL_LEFT, 'r1', 'r2', 'r3'];

/** The chalumeau register, low E (52) to throat Bb (70). */
const CHALUMEAU: Record<number, ClarinetKey[]> = {
  52: [...CL_ALL, 'lE'],
  53: [...CL_ALL, 'lF'],
  54: [...CL_ALL, 'rFSharp'],
  55: [...CL_ALL],
  56: [...CL_ALL, 'rGSharp'],
  57: [...CL_LEFT, 'r1', 'r2'],
  58: [...CL_LEFT, 'r1'],
  59: [...CL_LEFT, 'r2'],
  60: [...CL_LEFT],
  61: [...CL_LEFT, 'lCSharp'],
  62: ['thumb', 'l1', 'l2'],
  63: ['thumb', 'l1', 'l2', 'side4'],
  64: ['thumb', 'l1'],
  65: ['thumb'],
  66: ['l1'],
  67: [],
  68: ['throatGSharp'],
  69: ['aKey'],
  70: ['aKey', 'register'],
};

/** The altissimo, C#6 (85) to G6 (91): the thumb hole and the register key, the left first finger lifted. */
const ALTISSIMO: Record<number, ClarinetKey[]> = {
  85: ['thumb', 'register', 'l2', 'l3', 'r1', 'r2'],
  86: ['thumb', 'register', 'l2', 'l3', 'r1', 'rGSharp'],
  87: ['thumb', 'register', 'l2', 'l3', 'r2', 'rGSharp'],
  88: ['thumb', 'register', 'l2', 'l3', 'rGSharp'],
  89: ['thumb', 'register', 'l2', 'l3', 'lCSharp', 'rGSharp'],
  90: ['thumb', 'register', 'l2', 'rGSharp'],
  91: ['thumb', 'register', 'l2', 'r1', 'r2', 'rGSharp'],
};

export const CLARINET_LOWEST = 52;
export const CLARINET_HIGHEST = 91;

/** The keys to press for a written note, or null outside low E to altissimo G. */
export function clarinetFingeringFor(midi: number): ClarinetKey[] | null {
  if (CHALUMEAU[midi] && midi <= 70) return CHALUMEAU[midi];
  // B4 (71) to F6 (84), the clarion: the note a twelfth below, plus the register key.
  if (midi >= 71 && midi <= 84) return ['register', ...CHALUMEAU[midi - 19]];
  return ALTISSIMO[midi] ?? null;
}

const CLARINET_NAMES: Record<ClarinetKey, { en: string; es: string }> = {
  thumb: { en: 'left thumb hole', es: 'agujero del pulgar izquierdo' },
  register: { en: 'register key (left thumb)', es: 'llave de registro (pulgar izquierdo)' },
  aKey: { en: 'A key (left first finger)', es: 'llave de La (primer dedo izquierdo)' },
  throatGSharp: {
    en: 'throat G# key (left first finger)',
    es: 'llave de Sol# de garganta (primer dedo izquierdo)',
  },
  l1: { en: 'left first finger', es: 'primer dedo izquierdo' },
  l2: { en: 'left second finger', es: 'segundo dedo izquierdo' },
  l3: { en: 'left third finger', es: 'tercer dedo izquierdo' },
  lCSharp: { en: 'C#/G# key (left little finger)', es: 'llave de Do#/Sol# (meñique izquierdo)' },
  lE: { en: 'E/B key (left little finger)', es: 'llave de Mi/Si (meñique izquierdo)' },
  lF: { en: 'F/C key (left little finger)', es: 'llave de Fa/Do (meñique izquierdo)' },
  lFSharp: { en: 'F#/C# key (left little finger)', es: 'llave de Fa#/Do# (meñique izquierdo)' },
  side1: { en: 'top side key (right hand)', es: 'llave lateral más alta (mano derecha)' },
  side2: { en: 'second side key (right hand)', es: 'segunda llave lateral (mano derecha)' },
  side3: { en: 'third side key (right hand)', es: 'tercera llave lateral (mano derecha)' },
  side4: {
    en: 'lowest side key (side of the right first finger)',
    es: 'llave lateral más baja (costado del primer dedo derecho)',
  },
  r1: { en: 'right first finger', es: 'primer dedo derecho' },
  r2: { en: 'right second finger', es: 'segundo dedo derecho' },
  r3: { en: 'right third finger', es: 'tercer dedo derecho' },
  rE: { en: 'E/B key (right little finger)', es: 'llave de Mi/Si (meñique derecho)' },
  rF: { en: 'F/C key (right little finger)', es: 'llave de Fa/Do (meñique derecho)' },
  rFSharp: { en: 'F#/C# key (right little finger)', es: 'llave de Fa#/Do# (meñique derecho)' },
  rGSharp: {
    en: 'G#/D# (Ab/Eb) key (right little finger)',
    es: 'llave de Sol#/Re# (Lab/Mib) (meñique derecho)',
  },
};

/** The fingering in words, for a screen reader and under the chart. */
export function clarinetFingeringWords(midi: number, locale: Locale): string {
  const keys = clarinetFingeringFor(midi);
  if (!keys) return '';
  if (!keys.length)
    return locale === 'es'
      ? 'Ningún dedo abajo y el pulgar fuera del agujero: Sol al aire.'
      : 'No fingers down and the thumb off its hole: open G.';
  return `${keys.map((k) => CLARINET_NAMES[k][locale]).join(', ')}.`.replace(/^./, (c) =>
    c.toUpperCase(),
  );
}

/** The keys to press for a written note on an instrument, or null outside its range. */
export function keysFor(midi: number, instrument: Instrument): string[] | null {
  return FAMILY[instrument] === 'clarinet' ? clarinetFingeringFor(midi) : fingeringFor(midi);
}

export function wordsFor(midi: number, instrument: Instrument, locale: Locale): string {
  return FAMILY[instrument] === 'clarinet'
    ? clarinetFingeringWords(midi, locale)
    : fingeringWords(midi, locale);
}

export type Shape = { key: string; x: number; y: number; label?: string } & (
  { r: number } | { w: number; h: number }
);

const SAX: Shape[] = [
  { key: 'octave', x: 22, y: 12, w: 30, h: 14, label: 'OCT' },
  { key: 'palmD', x: 14, y: 46, w: 24, h: 12, label: 'D' },
  { key: 'palmEb', x: 8, y: 62, w: 24, h: 12, label: 'Eb' },
  { key: 'palmF', x: 14, y: 78, w: 24, h: 12, label: 'F' },
  { key: 'l1', x: 70, y: 40, r: 14 },
  { key: 'bis', x: 70, y: 62, r: 6 },
  { key: 'l2', x: 70, y: 84, r: 14 },
  { key: 'l3', x: 70, y: 118, r: 14 },
  { key: 'gSharp', x: 12, y: 106, w: 30, h: 12, label: 'G#' },
  { key: 'lowCSharp', x: 12, y: 120, w: 30, h: 12, label: 'C#' },
  { key: 'lowB', x: 12, y: 134, w: 30, h: 12, label: 'B' },
  { key: 'lowBb', x: 12, y: 148, w: 30, h: 12, label: 'Bb' },
  { key: 'sideE', x: 100, y: 54, w: 26, h: 12, label: 'E' },
  { key: 'sideC', x: 100, y: 70, w: 26, h: 12, label: 'C' },
  { key: 'sideBb', x: 100, y: 86, w: 26, h: 12, label: 'Bb' },
  { key: 'r1', x: 70, y: 172, r: 14 },
  { key: 'r2', x: 70, y: 206, r: 14 },
  { key: 'r3', x: 70, y: 240, r: 14 },
  { key: 'eFlat', x: 100, y: 230, w: 26, h: 12, label: 'Eb' },
  { key: 'lowC', x: 100, y: 246, w: 26, h: 12, label: 'C' },
];

const CLARINET: Shape[] = [
  { key: 'register', x: 14, y: 12, w: 30, h: 14, label: 'R' },
  { key: 'thumb', x: 29, y: 46, r: 10, label: 'T' },
  { key: 'aKey', x: 60, y: 10, w: 20, h: 12, label: 'A' },
  { key: 'throatGSharp', x: 86, y: 18, w: 24, h: 12, label: 'G#' },
  { key: 'l1', x: 70, y: 46, r: 14 },
  { key: 'l2', x: 70, y: 80, r: 14 },
  { key: 'l3', x: 70, y: 114, r: 14 },
  { key: 'lCSharp', x: 6, y: 80, w: 30, h: 12, label: 'C#' },
  { key: 'lE', x: 6, y: 96, w: 30, h: 12, label: 'E' },
  { key: 'lF', x: 6, y: 112, w: 30, h: 12, label: 'F' },
  { key: 'lFSharp', x: 6, y: 128, w: 30, h: 12, label: 'F#' },
  { key: 'side1', x: 100, y: 52, w: 26, h: 10 },
  { key: 'side2', x: 100, y: 66, w: 26, h: 10 },
  { key: 'side3', x: 100, y: 80, w: 26, h: 10 },
  { key: 'side4', x: 100, y: 94, w: 26, h: 10 },
  { key: 'r1', x: 70, y: 172, r: 14 },
  { key: 'r2', x: 70, y: 206, r: 14 },
  { key: 'r3', x: 70, y: 240, r: 14 },
  { key: 'rE', x: 100, y: 196, w: 26, h: 12, label: 'E' },
  { key: 'rF', x: 100, y: 211, w: 26, h: 12, label: 'F' },
  { key: 'rFSharp', x: 100, y: 226, w: 26, h: 12, label: 'F#' },
  { key: 'rGSharp', x: 100, y: 241, w: 26, h: 12, label: 'G#' },
];

export const SHAPES: Record<Family, Shape[]> = { sax: SAX, clarinet: CLARINET };

export const CHART_WIDTH = 140;
export const CHART_HEIGHT = 264;
