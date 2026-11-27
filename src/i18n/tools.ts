/**
 * Every string on the free tools: the tuner, the fingering charts and the scales. English and
 * Spanish; the Spanish object must carry every English key. The app's voice: short, warm, second
 * person, `tú` in Spanish.
 */
import type { Instrument } from '../lib/notes';
import type { Locale } from './ui';

const en = {
  tools: 'Free tools',
  toolsNav: 'Free tools',
  tuner: 'Tuner',
  fingering: 'Fingering charts',
  scales: 'Scales',
  instrumentNames: {
    'alto-sax': 'Alto sax',
    'tenor-sax': 'Tenor sax',
    'soprano-sax': 'Soprano sax',
    'baritone-sax': 'Baritone sax',
    clarinet: 'B♭ clarinet',
  } as Record<Instrument, string>,
  written: 'Written',
  concert: 'Concert',
  writtenPitch: 'Written pitch',
  concertPitch: 'Concert pitch (what sounds)',

  banner: {
    heading: 'Practise with an app that listens',
    text: 'Riffu hears your sax or clarinet and tells you how many notes you got right. Short lessons, a tuner, a drone and a metronome, all in one app.',
  },

  tunerPage: {
    title: 'Free online tuner for sax and clarinet',
    description:
      'A free tuner that runs in your browser: no sign-up, no download. Pick alto, tenor, soprano or baritone sax or clarinet and see the written note you play.',
    heading: 'Free online tuner for sax and clarinet',
    intro:
      'Pick your instrument, tap Start and play a long note. The tuner shows the note you read on the page, how far it is from in tune, and the concert note that actually sounds.',
    instrumentTitle: (name: string) => `Free ${name} tuner online`,
    instrumentDescription: (name: string) =>
      `A free online tuner for ${name}. Play a note and see the written note you read, how many cents sharp or flat you are, and the concert pitch. No sign-up, no download.`,
    instrumentHeading: (name: string) => `Free ${name} tuner`,
    instrumentIntro: (name: string, shift: string) =>
      `This tuner is set for ${name}. It shows the written note you read and the concert note that sounds, ${shift}. Tap Start and play a long, steady note.`,
    shift: {
      'alto-sax': 'which is a major sixth lower',
      'tenor-sax': 'which is a major ninth lower',
      'soprano-sax': 'which is a whole step lower',
      'baritone-sax': 'which is an octave and a major sixth lower',
      clarinet: 'which is a whole step lower',
    } as Record<Instrument, string>,
    chooseHeading: 'Choose your instrument',
    howHeading: 'How it works',
    howItems: [
      'Tap Start. Your browser asks to use the microphone; allow it.',
      'Play one long, steady note, away from other sounds.',
      'The big note is the written note you read. The small one is the concert note that sounds.',
      'The needle shows how many cents you are from the note. Aim for the middle.',
    ],
    privacy:
      'The sound is analysed in your browser. It is never recorded and never leaves your device.',
    refHeading: 'Why written and concert pitch differ',
    refText:
      'A saxophone or clarinet is a transposing instrument: the note you read is not the note that sounds. An alto sax reading C sounds E♭, a tenor sax or a B♭ clarinet sounds a note lower by a step or more. A tuner for these instruments has to tell you both.',
  },

  tunerUi: {
    instrument: 'Instrument',
    reference: 'Reference A =',
    start: 'Start tuner',
    stop: 'Stop',
    listening: 'Listening. Play a long note.',
    nothing: 'Play a note',
    sharp: 'Sharp',
    flat: 'Flat',
    inTune: 'In tune',
    cents: 'cents',
    writtenLabel: 'You read',
    concertLabel: 'Sounds as',
    denied:
      'The microphone is blocked. Allow it in your browser settings for this site, then tap Start again.',
    noMic: 'No microphone was found. Connect one and tap Start again.',
    error: 'The microphone could not start. Close other apps that use it and try again.',
    unsupported:
      'This browser cannot use the microphone here. Try the latest Safari, Chrome, Edge or Firefox.',
    insecure: 'The microphone needs a secure (https) page.',
    noscript: 'The tuner needs JavaScript. Turn it on to use it.',
  },

  fingeringIndex: {
    title: 'Sax and clarinet fingering charts',
    description:
      'Free fingering charts for every note on alto, tenor, soprano and baritone sax and B-flat clarinet, with the written and concert pitch of each note.',
    heading: 'Fingering charts for sax and clarinet',
    intro: 'Choose your instrument, then the note you want to finger.',
  },
  fingeringInstrument: {
    title: (name: string) => `${name} fingering chart: every note`,
    description: (name: string, count: number) =>
      `Free fingering chart for ${name}: ${count} notes, each with a drawn chart, the keys in words and the concert pitch that sounds.`,
    heading: (name: string) => `${name} fingering chart`,
    intro: (name: string) =>
      `Every written note on ${name}. Pick a note to see which keys to press.`,
  },
  fingeringNote: {
    title: (name: string, note: string) => `${name} ${note} fingering`,
    description: (name: string, note: string, concert: string) =>
      `How to finger written ${note} on ${name}: a drawn key chart and the keys in words. It sounds as ${concert} in concert pitch.`,
    heading: (name: string, note: string) => `${name} ${note} fingering`,
    summary: (name: string, note: string, concert: string) =>
      `Written ${note} on ${name} sounds as ${concert}.`,
    keysHeading: 'Keys to press',
    chartCaption: 'Filled keys are pressed. Left hand above, right hand below.',
    neighboursHeading: 'Nearby notes',
    scalesHeading: 'Scales to practise it in',
    backToAll: (name: string) => `All ${name} notes`,
    tunerLink: (name: string) => `Tune your ${name}`,
    clarinetNote:
      'These are the standard fingerings taught in Riffu. Many notes have alternates; ask your teacher which they prefer.',
    saxNote:
      'One standard fingering per note. Many notes have alternates (side B♭, forked F♯, front F); ask your teacher which they prefer.',
    previous: 'Lower note',
    next: 'Higher note',
  },

  scalesIndex: {
    title: 'Sax and clarinet scales in every key',
    description:
      'Major and minor scales written for alto, tenor, soprano and baritone sax and B-flat clarinet, with the concert key and a fingering for every note.',
    heading: 'Scales for sax and clarinet',
    intro: 'Choose your instrument, then a key. Scales are written as you read them.',
  },
  scalesInstrument: {
    title: (name: string) => `${name} scales: major and minor in every key`,
    description: (name: string) =>
      `Major and minor scales for ${name}, written as you read them, with the concert key and a fingering for each note.`,
    heading: (name: string) => `${name} scales`,
    intro: (name: string) =>
      `Pick a written key. Each page shows the scale for ${name} with the fingering of every note and the concert key that sounds.`,
    majorHeading: 'Major scales',
    minorHeading: 'Natural minor scales',
  },
  scalePage: {
    title: (name: string, key: string) => `${name} ${key} scale`,
    description: (name: string, key: string, concert: string) =>
      `The ${key} scale for ${name}, written as you read it, with a fingering for each note. It sounds as ${concert} in concert pitch.`,
    heading: (name: string, key: string) => `${name} ${key} scale`,
    summary: (name: string, key: string, concert: string) =>
      `On ${name} you read ${key}, and it sounds as ${concert}.`,
    modeName: { major: 'major', minor: 'natural minor' } as Record<'major' | 'minor', string>,
    notesHeading: 'Notes and fingerings',
    notesIntro: 'Written pitch, one octave up from the tonic. Tap a note for its full page.',
    otherKeys: 'Other keys',
    backToAll: (name: string) => `All ${name} scales`,
  },
};

const es: typeof en = {
  tools: 'Herramientas gratis',
  toolsNav: 'Herramientas gratis',
  tuner: 'Afinador',
  fingering: 'Digitaciones',
  scales: 'Escalas',
  instrumentNames: {
    'alto-sax': 'Saxo alto',
    'tenor-sax': 'Saxo tenor',
    'soprano-sax': 'Saxo soprano',
    'baritone-sax': 'Saxo barítono',
    clarinet: 'Clarinete en Si♭',
  },
  written: 'Escrita',
  concert: 'Real',
  writtenPitch: 'Nota escrita',
  concertPitch: 'Nota real (la que suena)',

  banner: {
    heading: 'Practica con una app que te escucha',
    text: 'Riffu escucha tu saxo o tu clarinete y te dice cuántas notas tocaste bien. Lecciones cortas, afinador, bordón y metrónomo, todo en una app.',
  },

  tunerPage: {
    title: 'Afinador online gratis para saxo y clarinete',
    description:
      'Un afinador gratis que funciona en tu navegador: sin registro y sin descargar nada. Elige saxo alto, tenor, soprano o barítono, o clarinete, y mira la nota escrita que tocas.',
    heading: 'Afinador online gratis para saxo y clarinete',
    intro:
      'Elige tu instrumento, toca Empezar y toca una nota larga. El afinador muestra la nota que lees en la partitura, cuánto te falta para afinar y la nota real que suena.',
    instrumentTitle: (name: string) => `Afinador online gratis para ${name}`,
    instrumentDescription: (name: string) =>
      `Un afinador online gratis para ${name}. Toca una nota y mira la nota escrita que lees, cuántos cents te pasas o te quedas corto y la nota real. Sin registro y sin descargar nada.`,
    instrumentHeading: (name: string) => `Afinador gratis para ${name}`,
    instrumentIntro: (name: string, shift: string) =>
      `Este afinador está ajustado para ${name}. Muestra la nota escrita que lees y la nota real que suena, ${shift}. Toca Empezar y toca una nota larga y firme.`,
    shift: {
      'alto-sax': 'una sexta mayor más grave',
      'tenor-sax': 'una novena mayor más grave',
      'soprano-sax': 'un tono más grave',
      'baritone-sax': 'una octava y una sexta mayor más grave',
      clarinet: 'un tono más grave',
    },
    chooseHeading: 'Elige tu instrumento',
    howHeading: 'Cómo funciona',
    howItems: [
      'Toca Empezar. Tu navegador te pedirá usar el micrófono; permítelo.',
      'Toca una nota larga y firme, lejos de otros sonidos.',
      'La nota grande es la nota escrita que lees. La pequeña es la nota real que suena.',
      'La aguja muestra a cuántos cents estás de la nota. Busca el centro.',
    ],
    privacy: 'El sonido se analiza en tu navegador. Nunca se graba y nunca sale de tu dispositivo.',
    refHeading: 'Por qué la nota escrita y la real son distintas',
    refText:
      'El saxo y el clarinete son instrumentos transpositores: la nota que lees no es la que suena. Un saxo alto que lee Do suena Mi♭; un saxo tenor o un clarinete en Si♭ suenan más graves. Un afinador para estos instrumentos tiene que decirte las dos.',
  },

  tunerUi: {
    instrument: 'Instrumento',
    reference: 'La de referencia =',
    start: 'Empezar',
    stop: 'Parar',
    listening: 'Escuchando. Toca una nota larga.',
    nothing: 'Toca una nota',
    sharp: 'Alta',
    flat: 'Baja',
    inTune: 'Afinada',
    cents: 'cents',
    writtenLabel: 'Lees',
    concertLabel: 'Suena',
    denied:
      'El micrófono está bloqueado. Permítelo en los ajustes de tu navegador para este sitio y toca Empezar otra vez.',
    noMic: 'No se encontró ningún micrófono. Conecta uno y toca Empezar otra vez.',
    error: 'No se pudo iniciar el micrófono. Cierra otras apps que lo usen e inténtalo otra vez.',
    unsupported:
      'Este navegador no puede usar el micrófono aquí. Prueba con la última versión de Safari, Chrome, Edge o Firefox.',
    insecure: 'El micrófono necesita una página segura (https).',
    noscript: 'El afinador necesita JavaScript. Actívalo para usarlo.',
  },

  fingeringIndex: {
    title: 'Digitaciones de saxo y clarinete',
    description:
      'Digitaciones gratis de cada nota para saxo alto, tenor, soprano y barítono, y clarinete en Si bemol, con la nota escrita y la nota real.',
    heading: 'Digitaciones de saxo y clarinete',
    intro: 'Elige tu instrumento y luego la nota que quieres digitar.',
  },
  fingeringInstrument: {
    title: (name: string) => `Digitación de ${name}: todas las notas`,
    description: (name: string, count: number) =>
      `Digitación gratis para ${name}: ${count} notas, cada una con un diagrama de las llaves, las llaves en palabras y la nota real que suena.`,
    heading: (name: string) => `Digitación de ${name}`,
    intro: (name: string) =>
      `Todas las notas escritas de ${name}. Elige una nota para ver qué llaves apretar.`,
  },
  fingeringNote: {
    title: (name: string, note: string) => `Digitación de ${name}: ${note}`,
    description: (name: string, note: string, concert: string) =>
      `Cómo digitar ${note} escrita en ${name}: un diagrama de las llaves y las llaves en palabras. Suena como ${concert} en nota real.`,
    heading: (name: string, note: string) => `Digitación de ${name}: ${note}`,
    summary: (name: string, note: string, concert: string) =>
      `${note} escrita en ${name} suena como ${concert}.`,
    keysHeading: 'Llaves que apretar',
    chartCaption: 'Las llaves rellenas están apretadas. Mano izquierda arriba, derecha abajo.',
    neighboursHeading: 'Notas cercanas',
    scalesHeading: 'Escalas para practicarla',
    backToAll: (name: string) => `Todas las notas de ${name}`,
    tunerLink: (name: string) => `Afina tu ${name}`,
    clarinetNote:
      'Son las digitaciones estándar que enseña Riffu. Muchas notas tienen alternativas; pregunta a tu profesor cuáles prefiere.',
    saxNote:
      'Una digitación estándar por nota. Muchas notas tienen alternativas (Si♭ lateral, Fa♯ en horquilla, Fa frontal); pregunta a tu profesor cuáles prefiere.',
    previous: 'Nota más grave',
    next: 'Nota más aguda',
  },

  scalesIndex: {
    title: 'Escalas de saxo y clarinete en todas las tonalidades',
    description:
      'Escalas mayores y menores escritas para saxo alto, tenor, soprano y barítono, y clarinete en Si bemol, con la tonalidad real y la digitación de cada nota.',
    heading: 'Escalas de saxo y clarinete',
    intro: 'Elige tu instrumento y luego una tonalidad. Las escalas están escritas como las lees.',
  },
  scalesInstrument: {
    title: (name: string) => `Escalas de ${name}: mayores y menores`,
    description: (name: string) =>
      `Escalas mayores y menores para ${name}, escritas como las lees, con la tonalidad real y la digitación de cada nota.`,
    heading: (name: string) => `Escalas de ${name}`,
    intro: (name: string) =>
      `Elige una tonalidad escrita. Cada página muestra la escala para ${name} con la digitación de cada nota y la tonalidad real que suena.`,
    majorHeading: 'Escalas mayores',
    minorHeading: 'Escalas menores naturales',
  },
  scalePage: {
    title: (name: string, key: string) => `Escala de ${key} para ${name}`,
    description: (name: string, key: string, concert: string) =>
      `La escala de ${key} para ${name}, escrita como la lees, con la digitación de cada nota. Suena como ${concert} en nota real.`,
    heading: (name: string, key: string) => `Escala de ${key} para ${name}`,
    summary: (name: string, key: string, concert: string) =>
      `En ${name} lees ${key}, y suena como ${concert}.`,
    modeName: { major: 'mayor', minor: 'menor natural' },
    notesHeading: 'Notas y digitaciones',
    notesIntro: 'Nota escrita, una octava desde la tónica. Toca una nota para ver su página.',
    otherKeys: 'Otras tonalidades',
    backToAll: (name: string) => `Todas las escalas de ${name}`,
  },
};

export const tools: Record<Locale, typeof en> = { en, es };

/** Mid-sentence use of an instrument name: `alto sax`, `saxo alto`. */
export const lowerFirst = (s: string) =>
  /^[A-G][♭♯#]/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);

export const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** An instrument's name for the middle of a sentence. Templates that start with it are upper-cased after. */
export const instrumentName = (locale: Locale, instrument: Instrument) =>
  lowerFirst(tools[locale].instrumentNames[instrument]);
