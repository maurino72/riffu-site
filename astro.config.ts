import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/config';

// Static output only: no server, no adapter. Vercel serves the `dist/` folder.
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  // One URL per page, never with a trailing slash (`/es`, `/privacy`). vercel.json matches it.
  trailingSlash: 'never',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      // English lives at `/`, Spanish at `/es`. The language is never guessed from the browser.
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
    }),
  ],
});
