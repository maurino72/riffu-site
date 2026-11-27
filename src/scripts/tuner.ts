/**
 * The tuner's browser code: the microphone, the pitch detector and the display. It is imported
 * only by the tuner component, so no other page loads it. Nothing is recorded or sent anywhere.
 */
import { detectPitch, FRAME, median } from '../lib/pitch';
import { noteLabel, reading, writtenNote, type Instrument } from '../lib/notes';
import type { tools } from '../i18n/tools';
import type { Locale } from '../i18n/ui';

type Ui = (typeof tools)['en']['tunerUi'];

const TICK_MS = 50;
/** How long a frame with no clear note keeps the last reading on screen. */
const HOLD_MS = 500;
/** Within this many cents the needle counts as in tune. */
const IN_TUNE = 5;

export function initTuner(root: HTMLElement): void {
  const { locale, ui } = JSON.parse(root.dataset.config ?? '{}') as { locale: Locale; ui: Ui };
  const $ = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const start = $<HTMLButtonElement>('[data-start]');
  const status = $('[data-status]');
  const display = $('[data-display]');
  const instrumentSelect = $<HTMLSelectElement>('[data-instrument]');
  const referenceSelect = $<HTMLSelectElement>('[data-reference]');
  const out = {
    written: $('[data-written]'),
    concert: $('[data-concert]'),
    verdict: $('[data-verdict]'),
    cents: $('[data-cents]'),
    needle: $('[data-needle]'),
  };

  const say = (text: string, kind: 'info' | 'error' = 'info') => {
    status.textContent = text;
    status.dataset.kind = kind;
    status.hidden = !text;
  };

  // Unsupported browsers and insecure pages get a clear message and a disabled button.
  const AudioCtx: typeof AudioContext | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!window.isSecureContext) {
    say(ui.insecure, 'error');
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia || !AudioCtx) {
    say(ui.unsupported, 'error');
    return;
  }
  start.disabled = false;

  let stopListening: (() => void) | null = null;
  let recent: number[] = [];
  let lastHeard = 0;

  const clear = () => {
    display.dataset.state = 'idle';
    out.written.textContent = '–';
    out.concert.textContent = '–';
    out.verdict.textContent = ui.nothing;
    out.cents.textContent = '';
    out.needle.style.left = '50%';
  };

  const show = (hz: number) => {
    const instrument = instrumentSelect.value as Instrument;
    const { concert, cents } = reading(hz, Number(referenceSelect.value));
    out.written.textContent = noteLabel(writtenNote(concert, instrument), locale);
    out.concert.textContent = noteLabel(concert, locale);
    const tuned = Math.abs(cents) <= IN_TUNE;
    display.dataset.state = tuned ? 'tuned' : 'live';
    out.verdict.textContent = tuned ? ui.inTune : cents > 0 ? ui.sharp : ui.flat;
    out.cents.textContent = `${cents > 0 ? '+' : ''}${Math.round(cents)} ${ui.cents}`;
    out.needle.style.left = `${50 + Math.max(-50, Math.min(50, cents))}%`;
  };

  async function begin(): Promise<void> {
    start.disabled = true;
    let media: MediaStream;
    try {
      // The browser asks for the microphone here, and only here: the visitor tapped Start.
      media = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
    } catch (e) {
      const name = (e as Error)?.name;
      say(
        name === 'NotAllowedError' || name === 'SecurityError'
          ? ui.denied
          : name === 'NotFoundError' || name === 'OverconstrainedError'
            ? ui.noMic
            : ui.error,
        'error',
      );
      start.disabled = false;
      return;
    }
    try {
      const ctx = new AudioCtx!();
      // Safari starts the context suspended until a tap; this runs inside the tap.
      await ctx.resume();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = FRAME;
      ctx.createMediaStreamSource(media).connect(analyser);
      const frame = new Float32Array(FRAME);
      const timer = setInterval(() => {
        analyser.getFloatTimeDomainData(frame);
        const d = detectPitch(frame, ctx.sampleRate);
        const now = performance.now();
        if (d) {
          recent = [...recent.slice(-4), d.hz];
          lastHeard = now;
          show(median(recent));
        } else if (now - lastHeard > HOLD_MS) {
          recent = [];
          clear();
        }
      }, TICK_MS);
      stopListening = () => {
        clearInterval(timer);
        media.getTracks().forEach((t) => t.stop());
        if (ctx.state !== 'closed') ctx.close().catch(() => {});
        stopListening = null;
        recent = [];
        clear();
        start.textContent = ui.start;
        say('');
      };
      start.textContent = ui.stop;
      say(ui.listening);
    } catch {
      media.getTracks().forEach((t) => t.stop());
      say(ui.error, 'error');
    }
    start.disabled = false;
  }

  start.addEventListener('click', () => (stopListening ? stopListening() : void begin()));
  // Let go of the microphone when the page is hidden: it saves battery and the recording light.
  document.addEventListener('visibilitychange', () => document.hidden && stopListening?.());
  window.addEventListener('pagehide', () => stopListening?.());
}
