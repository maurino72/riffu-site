# riffu-site

The website for Riffu: a landing page whose only job is App Store downloads, plus the Terms of
Use, Privacy Policy, Delete account and Support pages. Static [Astro](https://astro.build), in
English (`/`) and Spanish (`/es/`). The build contract is [PLAN.md](PLAN.md).

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Install the pinned dependencies |
| `npm run dev` | Local server at `http://localhost:4321` |
| `npm test` | Unit tests for the pitch detector, fingerings and scales (`src/lib/lib.test.ts`) |
| `npm run ci` | Every gate CI runs: `astro check`, tests, build, Prettier, internal link check |

The link check covers links inside the site only. App Store links are skipped on purpose: they
return 404 until Riffu is public.

## Free tools

`/tuner`, `/fingering` and `/scales` (and `/es/...`) are free, static tools: a browser tuner, a
fingering chart for every note and a major and minor scale in every key, for the four saxophones
and the B-flat clarinet. The pitch detector, fingering tables and scale spelling live in
`src/lib/` (ported from the app repository's `src/tuner`, `src/fingering` and `src/theory`); the
tuner script (`src/scripts/tuner.ts`) loads only on the tuner pages and asks for the microphone
only when the visitor taps Start. Strings are in `src/i18n/tools.ts`.

## Where things live

- `src/config.ts`: App Store id and URL, domain, support email, company. Nothing else
  hard-codes them.
- `src/i18n/ui.ts`: every shared string, in English and Spanish.
- `src/styles/global.css`: the brand tokens.
- `src/assets/`: brand files copied from the app repository's GitHub `main`.
