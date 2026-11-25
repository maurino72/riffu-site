import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/config';

// Static output only: no server, no adapter. Vercel serves the `dist/` folder.
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      // English lives at `/`, Spanish at `/es/`. The language is never guessed from the browser.
      prefixDefaultLocale: false,
    },
  },
});
