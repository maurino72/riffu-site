# Riffu landing — build plan

Written 2026-11-25. This file is the contract for the first build of this repository. A new
session reads it top to bottom, asks Bruno only the questions in **Inputs from Bruno** that are
still open, and builds phase by phase. Bruno does not touch code.

## Goal

One page whose only job is to get visitors to **download Riffu from the App Store**, plus the
three legal pages the App Store needs at public URLs: **Terms of Use**, **Privacy Policy** and
**Delete your account**.

## Not in scope

- **No web version of the app.** No sign-up, no log-in, no lessons in the browser. Every primary
  button goes to the App Store.
- **No Google Play badge** until the Android app is live. A badge that leads nowhere costs trust.
- **No blog, no CMS, no newsletter backend.** No analytics or tracking script: the privacy policy
  says Riffu collects nothing on the web, and that must stay true.
- **No invented social proof.** No testimonials, ratings, user counts or awards until they are
  real. Add them later.

## Rules that apply to every word and image

These come from the app repository (`docs/STORE-LISTING.md` and `brand/README.md` in
`maurino72/riffu`) and bind the landing as well:

- **Never name another app or company.** Not Duolingo, Yousician, Simply or anyone else, in copy,
  alt text, meta tags or file names. The page was *inspired* by how those sites are structured;
  it never mentions them.
- **Only Riffu's own look:** violet `#7B3FE4`, brass `#F2B441`, the font Nunito, and the mascot
  **Melo** (the living eighth note). No owls, no birds, no green.
- **Use the app's vocabulary:** "beats" (not hearts or lives), "Melo", "levels", "units".
- **Lead with what only Riffu does:** the app *listens* to your instrument. The tuner and the
  live feedback come before streaks and leagues.
- **Every artifact in English.** The page itself is bilingual (English and Spanish).

## What was studied

| Site | What it teaches |
|---|---|
| Duolingo (Mobbin, "Site") | The hero is the mascot, a short headline and one big button. It has a dedicated "download" section with store badges, then features, stats, about, footer. |
| Simply Piano / Simply Guitar | A warm, benefit-led headline. The same call to action repeats after each block. |
| Flowkey | A short imperative hero, a feature grid with one-line benefits, and a closing "start today" block. |
| Headspace | Offer-first hero, an FAQ near the end, and a footer with legal links and a language switcher. |

All three readable sites send their main button to a web sign-up. Riffu has no web app, so
**every primary button goes to the App Store**, and the App Store badge sits in the hero and at
the close, not only in the footer.

## Stack

- **[Astro](https://astro.build)**, static output, TypeScript, no client framework. Check the
  current major version and its docs before writing code; do not trust memory.
- **Plain CSS** with custom properties for the brand tokens. No UI library.
- **Fonts:** Nunito (600, 800, 900), self-hosted from `@fontsource/nunito`, so no request goes to
  Google Fonts. This also keeps the privacy policy true.
- **i18n:** Astro's built-in i18n routing. English at `/`, Spanish at `/es/`. The language is
  never guessed from the browser; a switcher in the header and the footer changes it.
- **Hosting:** Vercel (free tier), deployed from `main`. A pull request gets a preview URL.
- **Package manager:** npm. Node LTS.
- **Lint and checks:** `astro check`, Prettier, and a link checker in CI (GitHub Actions).

## Pages

| Path (EN) | Path (ES) | What it is |
|---|---|---|
| `/` | `/es/` | The landing |
| `/privacy` | `/es/privacy` | Privacy Policy |
| `/terms` | `/es/terms` | Terms of Use |
| `/delete-account` | `/es/delete-account` | How to delete your account and data |
| `/support` | `/es/support` | Support email and short FAQ |
| `404` | — | Melo looking down, a link home |

The App Store listing will point at `/privacy`, `/terms` and `/support`. The app's paywall
links to `/privacy` (`EXPO_PUBLIC_PRIVACY_URL`) and to Apple's standard licence agreement for
the terms. If the Terms of Use page is meant to replace Apple's licence, say so and the app
changes its link too.

## The landing, top to bottom

Every section has an English and a Spanish version. Copy below is direction, not final text;
write the final text in the app's voice (short, warm, second person, `tú` in Spanish, as the
app does).

1. **Header** (sticky, thin): the `riffu` wordmark (violet), the language switcher, and a small
   "Download" button to the App Store.
2. **Hero**
   - Headline about learning to play with an app that listens. Direction: "Learn the sax with
     an app that listens." Keep it under eight words.
   - One-line subhead: lessons of a few minutes, on the staff, with feedback on every note.
   - The official **Download on the App Store** badge (Apple's artwork, English or Spanish to
     match the page).
   - **On desktop only:** a QR code beside the badge, with "Scan to download on your iPhone".
     Generated at build time (no third-party service) and pointing to the App Store URL.
   - The visual: an iPhone frame showing the tuner screenshot, with Melo perched on its top
     edge, as in the store screenshots.
3. **How it works:** three steps, each with an icon or a small screenshot.
   1. Tune: the tuner hears your instrument.
   2. Play: a lesson shows the notes on the staff.
   3. Hear back: Riffu marks each note you played as right, sharp or flat.
4. **Features** grid, six cards, one line each, in this order:
   - Live feedback on pitch from the microphone.
   - A course drawn as a melody on the staff, level by level.
   - A song to unlock in every unit.
   - Drone, metronome and theory tools.
   - Warm-ups and a daily practice reminder.
   - Streaks and leagues to keep practising.
5. **Instruments:** saxophone (alto, tenor, soprano, baritone) and clarinet. Confirm the list
   against the app's onboarding before writing it.
6. **Pro:** what Pro adds (every lesson, unlimited beats, detailed pitch and tone feedback,
   practising your mistakes, no ads) and "Try Pro free for 7 days". **No prices on the page:**
   the App Store sets them per country and they would drift.
7. **FAQ** (six to eight questions): which instruments, does it need a teacher, does it work
   offline, is the microphone recording me (no), how much does it cost (free, with optional Pro),
   when is Android coming, how do I cancel Pro.
8. **Closing call to action:** Melo cheering, one line, the App Store badge again (and the QR on
   desktop).
9. **Footer:** the lockup, Terms of Use, Privacy Policy, Delete your account, Support, the
   language switcher, "© 2026 BOMAU LLC", and "Apple and the Apple logo are trademarks of Apple
   Inc." (required next to the badge).

## Download links and the App Store

- **App Store URL:** `https://apps.apple.com/app/id6838997064` (Riffu's App Store Connect app
  id). It works only once the app is public; until then the button can point there anyway and
  the preview deployment is not announced.
- **Smart App Banner:** `<meta name="apple-itunes-app" content="app-id=6838997064">` on every
  page, so Safari on iPhone offers to open or install Riffu.
- **Badge artwork:** download Apple's official "Download on the App Store" badges (black, English
  and Spanish) from Apple's marketing resources and follow its usage rules (minimum size, clear
  space, unmodified). Do not draw your own.
- **One source of truth:** the URL and the app id live in one config file
  (`src/config.ts`), never hard-coded in pages.

## Assets

Copy from the app repository on this Mac (`/Users/brunomaurino/projects/musicApp`, branch `main`)
into `public/` or `src/assets/`. Do not modify the originals.

| Need | Source in the app repo |
|---|---|
| Wordmark and lockup | `brand/logo/wordmark-*.svg`, `brand/logo/lockup-*.svg` |
| Favicon and touch icon | `brand/icon/favicon-48.png`, `brand/icon/icon-1024.png` |
| Melo poses | `brand/melo/*.svg` (look-left, look-right, look-down, sing, cheer, note) |
| Phone screenshots | `brand/store/ios/en/*.png` and `brand/store/ios/es/*.png` (1290 × 2796, real captures) |
| Brand rules | `brand/README.md`, `docs/STORE-LISTING.md` |

Use Astro's image pipeline to serve the screenshots as responsive AVIF and WebP. Build an Open
Graph image (1200 × 630) per language from the lockup, Melo and one screenshot.

## Legal pages

Write them from what the app actually does. Everything below was checked in the app repository
on 2026-11-25 unless marked otherwise. Before publishing, re-check each claim against the code,
because the app keeps changing. Add a "Last updated" date to each page.

**Who:** Riffu is operated by **BOMAU LLC**, 1209 Mountain Road Place NE, Albuquerque, NM 87110,
United States.

**Privacy Policy**

- **What the app stores on the server (Supabase):**
  - the account email;
  - a display name, the instrument and the language;
  - course progress, the tuning log, and practice days;
  - whether the learner has Pro.

  Source: `supabase/migrations/`.
- **Sign in with Apple:** Apple's token is kept so Riffu can revoke its access when the account is
  deleted. Source: `apple_tokens`, `supabase/functions/apple-token`.
- **Purchases:** handled by Apple and RevenueCat. RevenueCat receives the account id and the
  purchase history. Riffu never sees card details.
- **Microphone:** sound is analysed on the phone to detect pitch. It is never recorded to a file
  and never sent anywhere. No code in the app writes audio to a file or uploads it.
- **No analytics, no advertising SDK, no tracking.** The app's dependencies include none. The
  website has no cookies and no analytics.
- **Without an account:** everything stays on the phone.
- **Deletion:** in the app (the Profile tab, account section, "Delete account") removes the account and every row,
  and revokes Apple's access. Link to `/delete-account`.
- **Processors:** Supabase (database and sign-in), Apple (Sign in with Apple, purchases),
  RevenueCat (subscriptions), Vercel (website hosting).
  - **Assumption:** the Supabase project's region. Read it from the Supabase dashboard and name
    the country.
- **Children:** depends on Bruno's age decision (see Inputs).
- **Contact:** the support email.

**Terms of Use**

- **The service:** Riffu, free with an optional Pro subscription.
- **Subscriptions:**
  - billed by Apple to the learner's Apple ID;
  - renew automatically unless cancelled at least 24 hours before the period ends;
  - the free trial converts to a paid subscription unless cancelled;
  - cancelled in the Apple ID settings;
  - refunds are handled by Apple.
- **Acceptable use, intellectual property, disclaimers, limitation of liability.**
- **Governing law:** New Mexico, United States.
- **Contact:** the support email.
- Have a lawyer read both before a paid launch campaign. This plan is not legal advice.

**Delete your account**

- Steps in the app, with a screenshot.
- What is deleted (everything listed above), and what is not: Apple and RevenueCat keep their own
  purchase records.
- Pro is not cancelled by deleting the account: cancel it in the Apple ID settings first.
- If the learner can no longer open the app, they write to the support email from the account's
  address.

## SEO and sharing

- Title and description per language. Canonical URLs, and `hreflang` between `/` and `/es/`.
- Open Graph and Twitter card tags with the per-language image.
- `sitemap.xml` (Astro's sitemap integration) and `robots.txt`.
- JSON-LD `MobileApplication`: name, operating system iOS, category EducationalApplication, the
  App Store URL. No rating data until it is real.

## Accessibility and performance

- Semantic HTML. One `h1` per page. Every image has alt text in the page's language. Decorative
  Melo images use empty alt text.
- Colour contrast AA or better. The app repo has a contrast test (`src/contrast.test.ts`) to
  borrow values from.
- `prefers-reduced-motion` turns off every animation.
- No JavaScript is needed for the page to work. The QR code and the language switcher work
  without it.

## Phases

Each phase ends with its checks green and a commit. Open one pull request per phase into `main`,
so Bruno gets a Vercel preview link for each.

1. **Scaffold**
   - Astro project, brand tokens, fonts, the base layout (header and footer), i18n routing,
     `src/config.ts`, and the 404 page.
   - CI: `astro check`, build, Prettier, and the link check.
2. **Landing**
   - Sections 1 to 9 in English, then Spanish.
   - Assets copied, screenshots optimised.
   - Badge and QR in place; desktop and phone layouts.
3. **Legal pages**
   - Privacy, Terms, Delete account and Support, in both languages, from the facts above.
   - Each claim re-checked against the app code, with the source noted in the PR description.
4. **SEO and polish**
   - Meta tags, Open Graph images, sitemap, robots and JSON-LD.
   - Smart App Banner.
   - Lighthouse pass.
5. **Deploy**
   - Vercel project and the custom domain.
   - HTTPS.
   - Every URL in **Done when** checked live.

After phase 5, in the app repository (`maurino72/riffu`):

- set `EXPO_PUBLIC_PRIVACY_URL` on EAS (production, preview and development) to the live
  `/privacy` URL;
- put the privacy, terms and support URLs in App Store Connect.

That is a separate change, in the app's own session.

## Done when

Every item is a check that passes or fails:

- [ ] `npm run build` and `astro check` exit 0. CI is green on `main`.
- [ ] Every page in the table above returns HTTP 200 on the custom domain, in both languages
      (`curl -s -o /dev/null -w '%{http_code}'` for each).
- [ ] Every App Store link and the QR code resolve to `apps.apple.com/app/id6838997064`.
- [ ] The `apple-itunes-app` meta tag is present on every page.
- [ ] Lighthouse (mobile) on `/` and `/es/`: Performance ≥ 95, Accessibility ≥ 95, Best
      Practices ≥ 95, SEO ≥ 95.
- [ ] The page works with JavaScript disabled.
- [ ] A search of the built output for third-party app or company names (Duolingo, Yousician,
      Simply, Flowkey, Headspace) finds nothing.
- [ ] No request leaves the domain on page load, so no fonts, analytics or CDNs (checked in the
      browser's network panel).
- [ ] An independent review (a separate agent, not the builder) has read the diff of each phase
      and its findings are fixed or explicitly deferred with a reason.

## Inputs from Bruno

Ask only these, one at a time, and only when the phase that needs them starts.

1. **Domain** (needed in phase 5). For example `riffu.app`. Bruno buys it; the session never
   makes a purchase. Then the DNS records Vercel asks for.
2. **Support email** (needed in phase 3). For example `support@<domain>`.
3. **Minimum age** (needed in phase 3). "13 and over" is the simpler start; under 13 brings COPPA
   and stricter rules. This is open question 3 in the app's `docs/ACCOUNTS-PLAN.md`.
4. **Vercel account** (needed in phase 5). Bruno connects this GitHub repository to Vercel
   himself; the session never logs in on his behalf.

## Risks

- **The App Store link 404s until Riffu is public.** Do not announce the domain before the
  listing is live.
- **Legal text drifts from the app.** The app gains features (Android, Google sign-in, ads). Any
  change to what the app collects needs this site's Privacy Policy updated in the same week.
- **Trademark:** "Melo" and "Riffu" still need a trademark search before launch (from the app's
  brand notes).
