/**
 * Pitch detection for the tuner. Pure functions over a frame of microphone samples, so the
 * whole detector is tested in node with synthetic tones.
 *
 * The method is McLeod's normalized square difference function (the notebook's
 * autocorrelation over 4,096 samples, normalized so loud and soft notes read the same), with
 * parabolic interpolation around the chosen peak: that interpolation is what takes the reading
 * from whole samples to a fraction of a cent.
 */

/** Samples per analysis frame, as in the notebook's detector. */
export const FRAME = 4096;

/** The lowest and highest fundamentals the tuner looks for, in Hz (concert pitch). */
export const MIN_HZ = 55; // below the baritone's low A (concert C2, about 65 Hz)
export const MAX_HZ = 2000; // above the soprano's palm-key F (concert Eb6, about 1245 Hz)

export type Detection = {
  /** Fundamental frequency in Hz. */
  hz: number;
  /** How periodic the frame is, 0 to 1; a clean saxophone note reads above 0.9. */
  clarity: number;
  /** Loudness of the frame (root mean square, samples from -1 to 1). */
  rms: number;
};

export function rms(frame: ArrayLike<number>): number {
  let s = 0;
  for (let i = 0; i < frame.length; i++) s += frame[i] * frame[i];
  return Math.sqrt(s / Math.max(1, frame.length));
}

/**
 * The fundamental of one frame, or null when the frame is silent or not a clear note.
 * `minRms` is the noise gate the sensitivity control sets.
 */
export function detectPitch(
  frame: ArrayLike<number>,
  sampleRate: number,
  minRms = 0.01,
  minClarity = 0.8,
): Detection | null {
  const n = frame.length;
  const level = rms(frame);
  if (level < minRms) return null;
  const minLag = Math.max(2, Math.floor(sampleRate / MAX_HZ));
  const maxLag = Math.min(n - 1, Math.ceil(sampleRate / MIN_HZ));

  // Normalized square difference: 2·r(τ) / m(τ), from -1 to 1, 1 at a perfect period.
  const nsdf = new Float64Array(maxLag + 2);
  // m(τ) shrinks by the squares of the samples that leave the window, so keep it running.
  let m = 0;
  for (let i = 0; i < n; i++) m += 2 * frame[i] * frame[i];
  for (let tau = 0; tau <= maxLag + 1; tau++) {
    let r = 0;
    for (let i = 0; i < n - tau; i++) r += frame[i] * frame[i + tau];
    nsdf[tau] = m > 0 ? (2 * r) / m : 0;
    m -= frame[tau] * frame[tau] + frame[n - 1 - tau] * frame[n - 1 - tau];
  }

  // The highest point between each pair of rising and falling zero crossings is a candidate.
  const peaks: number[] = [];
  let tau = 1;
  while (tau <= maxLag && nsdf[tau] > 0) tau++; // skip the lobe around lag 0
  while (tau <= maxLag) {
    while (tau <= maxLag && nsdf[tau] <= 0) tau++;
    let best = -1;
    while (tau <= maxLag && nsdf[tau] > 0) {
      if (tau >= minLag && (best < 0 || nsdf[tau] > nsdf[best])) best = tau;
      tau++;
    }
    if (best > 0) peaks.push(best);
  }
  if (!peaks.length) return null;

  // Take the first candidate close to the strongest one: the true period, not a multiple of it.
  const top = Math.max(...peaks.map((p) => nsdf[p]));
  const pick = peaks.find((p) => nsdf[p] >= 0.9 * top)!;
  const [lag, clarity] = parabola(nsdf[pick - 1], nsdf[pick], nsdf[pick + 1], pick);
  if (clarity < minClarity) return null;
  return { hz: sampleRate / lag, clarity: Math.min(1, clarity), rms: level };
}

/** Vertex of the parabola through three neighbouring points: [position, height]. */
function parabola(a: number, b: number, c: number, x: number): [number, number] {
  const d = a - 2 * b + c;
  if (d === 0) return [x, b];
  const shift = (a - c) / (2 * d);
  return [x + shift, b - ((a - c) * shift) / 4];
}

/** Median of a few readings, so one stray frame does not throw the needle. */
export function median(values: number[]): number {
  const s = [...values].sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}
