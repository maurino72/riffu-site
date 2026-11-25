/**
 * Every string the shared layout shows, in both languages. The app's voice: short, warm, second
 * person, and `tú` in Spanish.
 */
export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const LANGUAGE_NAMES: Record<Locale, string> = { en: 'English', es: 'Español' };

const en = {
  skipToContent: 'Skip to content',
  home: 'Riffu home',
  download: 'Download',
  downloadLabel: 'Download Riffu on the App Store',
  language: 'Language',
  rights: 'All rights reserved.',
  appleTrademark: 'Apple and the Apple logo are trademarks of Apple Inc.',
  notFoundTitle: 'Page not found',
  notFoundHeading: 'This page is off the staff.',
  notFoundText: 'Melo looked everywhere and could not find it.',
  notFoundBack: 'Back to the home page',
};

/** Spanish must carry every English key; the compiler refuses a missing one. */
const es: Record<keyof typeof en, string> = {
  skipToContent: 'Saltar al contenido',
  home: 'Inicio de Riffu',
  download: 'Descargar',
  downloadLabel: 'Descargar Riffu en el App Store',
  language: 'Idioma',
  rights: 'Todos los derechos reservados.',
  appleTrademark: 'Apple y el logotipo de Apple son marcas comerciales de Apple Inc.',
  notFoundTitle: 'Página no encontrada',
  notFoundHeading: 'Esta página se salió del pentagrama.',
  notFoundText: 'Melo buscó por todas partes y no la encontró.',
  notFoundBack: 'Volver al inicio',
};

export const ui: Record<Locale, Record<keyof typeof en, string>> = { en, es };

export const t = (locale: Locale) => ui[locale];
