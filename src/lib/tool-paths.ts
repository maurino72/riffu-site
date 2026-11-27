/** The URL paths of the tool pages (without the locale prefix), and the static params for them. */
import { noteSlug, writtenNotes, INSTRUMENTS, type Instrument } from './notes';
import { keySlug, MODES, TONICS, type Mode } from './scales';

export const tunerPath = (i?: Instrument) => (i ? `/tuner/${i}` : '/tuner');
export const fingeringPath = (i?: Instrument, midi?: number) =>
  i ? (midi === undefined ? `/fingering/${i}` : `/fingering/${i}/${noteSlug(midi)}`) : '/fingering';
export const scalesPath = (i?: Instrument, tonic?: string, mode?: Mode) =>
  i ? (tonic && mode ? `/scales/${i}/${keySlug(tonic, mode)}` : `/scales/${i}`) : '/scales';

export const instrumentParams = () => INSTRUMENTS.map((instrument) => ({ params: { instrument } }));

export const noteParams = () =>
  INSTRUMENTS.flatMap((instrument) =>
    writtenNotes(instrument).map((midi) => ({
      params: { instrument, note: noteSlug(midi) },
      props: { midi },
    })),
  );

export const keyParams = () =>
  INSTRUMENTS.flatMap((instrument) =>
    MODES.flatMap((mode) =>
      TONICS[mode].map((tonic) => ({
        params: { instrument, key: keySlug(tonic, mode) },
        props: { tonic, mode },
      })),
    ),
  );
