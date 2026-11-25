/**
 * The landing's copy in both languages. Words the app already uses (the paywall's Pro list, the
 * store captions, "pulsos", "racha", "Calentamiento", "Insignias") are copied from the app's
 * `src/i18n.ts` and `brand/tools/compose.mjs` on GitHub `main`, not translated afresh.
 */
import type { Locale } from './ui';

export type ScreenId = '02-take' | '03-home' | '04-songs' | '05-practice' | '06-profile';

interface LandingCopy {
  title: string;
  description: string;
  hero: { heading: string; sub: string; imageAlt: string };
  badgeAlt: string;
  qrCaption: string;
  how: { heading: string; steps: { title: string; text: string }[] };
  features: {
    heading: string;
    cards: { title: string; text: string }[];
    screensLabel: string;
    screens: { id: ScreenId; caption: string; alt: string }[];
  };
  instruments: { heading: string; text: string; list: string[] };
  pro: { heading: string; intro: string; list: string[]; trial: string; prices: string };
  faq: { heading: string; items: { q: string; a: string }[] };
  closing: { heading: string; text: string };
}

const en: LandingCopy = {
  title: 'Riffu: learn sax or clarinet with an app that listens',
  description:
    'Lessons of a few minutes, notes on the staff and feedback on every note you play. Free on the App Store, with optional Pro.',
  hero: {
    heading: 'Learn sax or clarinet with an app that listens.',
    sub: 'Lessons of a few minutes, the notes on the staff, and feedback on every note you play.',
    imageAlt:
      'The Riffu tuner on an iPhone, showing the note A in tune, with Melo on top of the phone.',
  },
  badgeAlt: 'Download on the App Store',
  qrCaption: 'Scan to download on your iPhone',
  how: {
    heading: 'How it works',
    steps: [
      {
        title: 'Tune',
        text: 'Turn on the tuner and play a note. Riffu hears your instrument and shows how close you are.',
      },
      {
        title: 'Play',
        text: 'Each lesson shows the notes on the staff. Play them in time.',
      },
      {
        title: 'Hear back',
        text: 'Riffu marks every note you played: in tune, too high or too low.',
      },
    ],
  },
  features: {
    heading: 'Everything you need to practise',
    cards: [
      { title: 'Live feedback', text: 'Your pitch, checked from the microphone, note by note.' },
      {
        title: 'A course drawn as a melody',
        text: 'Level by level, unit by unit, from your first note.',
      },
      { title: 'A song in every unit', text: 'Hear it first, then play it with the click.' },
      { title: 'Drone, metronome and theory', text: 'Practice tools built for your instrument.' },
      {
        title: 'Warm-ups and a daily reminder',
        text: 'A few minutes to get ready, and a nudge to practise every day.',
      },
      {
        title: 'Streaks, XP and badges',
        text: 'Keep your streak going and watch your practice add up.',
      },
    ],
    screensLabel: 'Screens from the app',
    screens: [
      {
        id: '02-take',
        caption: 'Play it. Riffu listens.',
        alt: 'A lesson asking to play a melody in time, with the notes on the staff and a score of 17 of 17 notes right.',
      },
      {
        id: '03-home',
        caption: 'Your course is a melody',
        alt: 'The course path: units drawn as notes on a staff, with the next lesson ready to start.',
      },
      {
        id: '04-songs',
        caption: 'Unlock a song every unit',
        alt: 'The song list, with songs to hear first and play at slow or full tempo.',
      },
      {
        id: '05-practice',
        caption: 'Drone, metronome and theory',
        alt: 'The practice tools: a drone on C, practising your mistakes, and the metronome.',
      },
      {
        id: '06-profile',
        caption: 'Watch your practice add up',
        alt: 'The profile in dark mode: day streak, total XP, minutes today and a chart of practice this week.',
      },
    ],
  },
  instruments: {
    heading: 'Pick your instrument',
    text: 'The course, the tuner and the songs follow the instrument you choose.',
    list: ['Alto sax', 'Tenor sax', 'Soprano sax', 'Baritone sax', 'B♭ clarinet'],
  },
  pro: {
    heading: 'Go further with Pro',
    intro: 'Riffu is free. Pro adds:',
    list: [
      'Every lesson in the course',
      'Unlimited beats',
      'Detailed pitch & tone feedback',
      'Practice your mistakes',
      'Unlimited level tests',
      'No ads',
    ],
    trial: 'Try Pro free for 7 days on the yearly plan.',
    prices: 'The App Store shows the price for your country.',
  },
  faq: {
    heading: 'Questions',
    items: [
      {
        q: 'Which instruments can I learn?',
        a: 'Alto, tenor, soprano and baritone saxophone, and the B♭ clarinet.',
      },
      {
        q: 'I have never played. Can I start?',
        a: 'Yes. The course starts with the parts of your instrument, how to put it together and your first sound.',
      },
      {
        q: 'Do I need a teacher?',
        a: 'No. Riffu listens and tells you what to fix. If you have a teacher, Riffu is a good way to practise between lessons.',
      },
      {
        q: 'Is the microphone recording me?',
        a: 'No. Riffu listens on your phone only to find the pitch of each note. The sound is never recorded or sent anywhere.',
      },
      {
        q: 'Does it work offline?',
        a: 'Yes. Lessons, the tuner and the practice tools work without a connection. You need one to sign in, back up your progress and buy Pro.',
      },
      {
        q: 'How much does it cost?',
        a: 'Riffu is free. Pro is an optional subscription, with a 7-day free trial on the yearly plan. The App Store shows the price for your country.',
      },
      {
        q: 'Is there an Android version?',
        a: 'Not yet. Riffu runs on iPhone and iPad.',
      },
      {
        q: 'How do I cancel Pro?',
        a: 'On your iPhone, open Settings, tap your name, then Subscriptions. Deleting your Riffu account does not cancel Pro.',
      },
    ],
  },
  closing: {
    heading: 'Your first note is waiting.',
    text: 'Download Riffu and play along with Melo.',
  },
};

const es: LandingCopy = {
  title: 'Riffu: aprende saxo o clarinete con una app que te escucha',
  description:
    'Lecciones de pocos minutos, las notas en el pentagrama y una corrección para cada nota que tocas. Gratis en el App Store, con Pro opcional.',
  hero: {
    heading: 'Aprende saxo o clarinete con una app que te escucha.',
    sub: 'Lecciones de pocos minutos, las notas en el pentagrama y una corrección para cada nota que tocas.',
    imageAlt: 'El afinador de Riffu en un iPhone, con la nota La afinada y Melo sobre el teléfono.',
  },
  badgeAlt: 'Descárgalo en el App Store',
  qrCaption: 'Escanea para descargar en tu iPhone',
  how: {
    heading: 'Cómo funciona',
    steps: [
      {
        title: 'Afina',
        text: 'Enciende el afinador y toca una nota. Riffu escucha tu instrumento y te muestra cuánto te falta.',
      },
      {
        title: 'Toca',
        text: 'Cada lección te muestra las notas en el pentagrama. Tócalas a tempo.',
      },
      {
        title: 'Escucha la corrección',
        text: 'Riffu marca cada nota que tocaste: afinada, muy alta o muy baja.',
      },
    ],
  },
  features: {
    heading: 'Todo lo que necesitas para practicar',
    cards: [
      {
        title: 'Corrección en vivo',
        text: 'Tu afinación, revisada desde el micrófono, nota por nota.',
      },
      {
        title: 'Un curso que es una melodía',
        text: 'Nivel por nivel, unidad por unidad, desde tu primera nota.',
      },
      { title: 'Una canción en cada unidad', text: 'Escúchala primero y tócala con el clic.' },
      {
        title: 'Bordón, metrónomo y teoría',
        text: 'Herramientas de práctica hechas para tu instrumento.',
      },
      {
        title: 'Calentamiento y recordatorio diario',
        text: 'Unos minutos para prepararte y un aviso para practicar cada día.',
      },
      {
        title: 'Rachas, XP e insignias',
        text: 'Mantén tu racha y mira cómo suma tu práctica.',
      },
    ],
    screensLabel: 'Pantallas de la app',
    screens: [
      {
        id: '02-take',
        caption: 'Tú tocas. Riffu escucha.',
        alt: 'Una lección que pide tocar una melodía a tempo, con las notas en el pentagrama y un resultado de 17 de 17 notas bien.',
      },
      {
        id: '03-home',
        caption: 'Tu curso es una melodía',
        alt: 'El camino del curso: las unidades dibujadas como notas en un pentagrama, con la próxima lección lista para empezar.',
      },
      {
        id: '04-songs',
        caption: 'Una canción nueva en cada unidad',
        alt: 'La lista de canciones, para escucharlas primero y tocarlas lento o a tempo.',
      },
      {
        id: '05-practice',
        caption: 'Bordón, metrónomo y teoría',
        alt: 'Las herramientas de práctica: un bordón en Do, practicar tus errores y el metrónomo.',
      },
      {
        id: '06-profile',
        caption: 'Mira cómo suma tu práctica',
        alt: 'El perfil en modo oscuro: racha, XP total, minutos de hoy y un gráfico de la práctica de la semana.',
      },
    ],
  },
  instruments: {
    heading: 'Elige tu instrumento',
    text: 'El curso, el afinador y las canciones siguen al instrumento que elijas.',
    list: ['Saxo alto', 'Saxo tenor', 'Saxo soprano', 'Saxo barítono', 'Clarinete en si♭'],
  },
  pro: {
    heading: 'Llega más lejos con Pro',
    intro: 'Riffu es gratis. Pro suma:',
    list: [
      'Todas las lecciones del curso',
      'Pulsos ilimitados',
      'Corrección detallada de afinación y sonido',
      'Practica tus errores',
      'Intentos ilimitados en los tests',
      'Sin anuncios',
    ],
    trial: 'Prueba Pro gratis 7 días con el plan anual.',
    prices: 'El App Store te muestra el precio de tu país.',
  },
  faq: {
    heading: 'Preguntas',
    items: [
      {
        q: '¿Qué instrumentos puedo aprender?',
        a: 'Saxofón alto, tenor, soprano y barítono, y el clarinete en si♭.',
      },
      {
        q: 'Nunca toqué. ¿Puedo empezar?',
        a: 'Sí. El curso empieza por las partes de tu instrumento, cómo armarlo y tu primer sonido.',
      },
      {
        q: '¿Necesito un profesor?',
        a: 'No. Riffu te escucha y te dice qué corregir. Si tienes profesor, Riffu es una buena forma de practicar entre clases.',
      },
      {
        q: '¿El micrófono me graba?',
        a: 'No. Riffu escucha en tu teléfono solo para encontrar la afinación de cada nota. El sonido nunca se graba ni se envía a ningún lado.',
      },
      {
        q: '¿Funciona sin conexión?',
        a: 'Sí. Las lecciones, el afinador y las herramientas de práctica funcionan sin conexión. La necesitas para iniciar sesión, guardar tu progreso en la nube y comprar Pro.',
      },
      {
        q: '¿Cuánto cuesta?',
        a: 'Riffu es gratis. Pro es una suscripción opcional, con 7 días de prueba gratis en el plan anual. El App Store te muestra el precio de tu país.',
      },
      {
        q: '¿Hay versión para Android?',
        a: 'Todavía no. Riffu funciona en iPhone y iPad.',
      },
      {
        q: '¿Cómo cancelo Pro?',
        a: 'En tu iPhone, abre Ajustes, toca tu nombre y luego Suscripciones. Borrar tu cuenta de Riffu no cancela Pro.',
      },
    ],
  },
  closing: {
    heading: 'Tu primera nota te espera.',
    text: 'Descarga Riffu y toca junto a Melo.',
  },
};

export const landing: Record<Locale, LandingCopy> = { en, es };
