# riffu-site

The website for Riffu: a landing page whose only job is App Store downloads, plus the Terms of
Use, Privacy Policy, Delete account and Support pages. Static [Astro](https://astro.build), in
English (`/`) and Spanish (`/es/`). The build contract is [PLAN.md](PLAN.md).

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Install the pinned dependencies |
| `npm run dev` | Local server at `http://localhost:4321` |
| `npm run ci` | Every gate CI runs: `astro check`, build, Prettier, internal link check |

The link check covers links inside the site only. App Store links are skipped on purpose: they
return 404 until Riffu is public.

## Where things live

- `src/config.ts`: App Store id and URL, domain, support email, company. Nothing else
  hard-codes them.
- `src/i18n/ui.ts`: every shared string, in English and Spanish.
- `src/styles/global.css`: the brand tokens.
- `src/assets/`: brand files copied from the app repository's GitHub `main`.
