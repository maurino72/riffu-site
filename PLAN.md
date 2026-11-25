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

The App Store listing will point at `/privacy`, `/terms` and `/support`.

**Decided 2026-11-25:** Riffu's own Terms of Use at `/terms` replace Apple's standard licence
agreement. Today the paywall links to Apple's standard EULA (`TERMS_URL` in `src/pro/legal.ts`)
and to `/privacy` through `EXPO_PUBLIC_PRIVACY_URL`; both live on the app branch
`feat/pro-purchases`, which was not merged into the app's `main` on 2026-11-25. The app switches
`TERMS_URL` to the live `/terms` in its own session (see **After phase 5**).

**Domains (decided 2026-11-25, changed the same day from `riffu.com`/`riffu.app`):**
`getriffu.com` is the primary domain and every canonical URL uses it. `getriffu.app` redirects
permanently (308) to the same path on `getriffu.com`. Both were bought by Bruno with the
registrar's professional email plan ("Pro Light", one year).

## The landing, top to bottom

Every section has an English and a Spanish version. Copy below is direction, not final text;
write the final text in the app's voice (short, warm, second person, `tú` in Spanish, as the
app does).

1. **Header** (sticky, thin): the `riffu` wordmark (violet), the language switcher, and a small
   "Download" button to the App Store.
2. **Hero**
   - Headline about learning to play with an app that listens. Built as "Learn sax or clarinet
     with an app that listens." (eight words), so clarinet learners are not left out.
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
   - Streaks, XP and badges to keep practising. (Changed 2026-11-25: the app has no leagues
     yet. Its Awards tab shows the week's XP and badges, and `src/leagues/Leagues.tsx` says
     leagues arrive once accounts exist. Say "leagues" only when they ship.)
   - Below the cards, a sideways-scrolling row of five app screens (lesson, course, songs,
     practice tools, profile), cropped from the store screenshots, each with its store caption.
5. **Instruments:** saxophone (alto, tenor, soprano, baritone) and B-flat clarinet. Checked
   2026-11-25 against `AVAILABLE` in the app's `src/tuner/notes.ts`; re-check before writing.
6. **Pro:** what Pro adds, in the paywall's own order (`paywall.features` in the app's
   `src/i18n.ts`): every lesson in the course, unlimited beats, detailed pitch and tone
   feedback, practise your mistakes, unlimited level tests, no ads. Then "Try Pro free for 7
   days" (`TRIAL_DAYS = 7` in `src/paywall/Paywall.tsx`, annual plan only). **No prices on the
   page:** the App Store sets them per country and they would drift. In Spanish the app calls
   beats **"pulsos"**; copy the app's Spanish strings rather than translating afresh.
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

Copy from the app repository's **GitHub `main`** into `public/` or `src/assets/`. Do not modify
the originals. The checkout on this Mac (`/Users/brunomaurino/projects/musicApp`) has a working
tree far behind GitHub (162 commits on 2026-11-25) with no `brand/` or `supabase/` folder, so
never copy from its working tree and never check anything out there. Read each file from the
remote ref instead:

```bash
git -C /Users/brunomaurino/projects/musicApp fetch origin main
git -C /Users/brunomaurino/projects/musicApp show origin/main:brand/melo/cheer.svg > src/assets/melo/cheer.svg
```

The same applies to every fact this plan checks in the app: read it from `origin/main`.

| Need | Source in the app repo |
|---|---|
| Wordmark and lockup | `brand/logo/wordmark-*.svg`, `brand/logo/lockup-*.svg` |
| Favicon and touch icon | `brand/icon/favicon-48.png`, `brand/icon/icon-1024.png` |
| Melo poses | `brand/melo/*.svg` (look-left, look-left-down, look-right, look-down, sing, cheer, note) |
| Phone screenshots | `brand/store/ios/en/*.png` and `brand/store/ios/es/*.png` (1290 × 2796, real captures) |
| Brand rules | `brand/README.md`, `docs/STORE-LISTING.md` |

Use Astro's image pipeline to serve the screenshots as responsive AVIF and WebP. Build an Open
Graph image (1200 × 630) per language from the lockup, Melo and one screenshot.

## Legal pages

Write them from what the app actually does. Everything below was checked in the app repository
on 2026-11-25 unless marked otherwise. Before publishing, re-check each claim against the code,
because the app keeps changing. Add a "Last updated" date to each page.

**Who:** Riffu is operated by **BOMAU LLC**, 1209 Mountain Road Place NE, Albuquerque, NM 87110,
United States. The address was confirmed by Bruno on 2026-11-25; it is not recorded in the app
repository. The seller is BOMAU LLC (the Apple developer account, verified in the app's
`docs/APPLE-SIGNIN-PLAN.md` on 2026-11-24). The app's older `docs/ACCOUNTS-PLAN.md` (open
question 1, 2026-11-21) still says a personal account; that line is stale.

**Contact:** `support@getriffu.com`, on every legal page and the Support page.

**Privacy Policy**

- **How learners sign in:** with a one-time code sent to their email, or with Sign in with Apple
  (`signInWithOtp` and `signInWithIdToken` in the app's `src/account/actions.ts`).
- **What the app stores on the server (Supabase), table by table** (`supabase/migrations/`):
  - the account email (Supabase's own auth table);
  - `profiles`: a display name, the instrument and the language;
  - `progress`: course progress;
  - `tuning_log`: per day, the note tuned and how many cents sharp or flat;
  - `practice_days`: per day and per phone, the minutes practised and the notes missed; each
    phone is identified by an app-generated device id;
  - `entitlements`: whether the learner has Pro and when it expires.
- **Sign in with Apple:** Apple's token is kept so Riffu can revoke its access when the account is
  deleted. Source: `apple_tokens`, `supabase/functions/apple-token`.
- **Purchases:** handled by Apple and RevenueCat. RevenueCat receives the account id and the
  purchase history. Riffu never sees card details. **Re-check before phase 3:** on 2026-11-25 the
  RevenueCat code (`react-native-purchases`) was only on the app branch `feat/pro-purchases`, not
  on the app's `main`.
- **Daily reminder:** a local notification scheduled on the phone
  (`scheduleNotificationAsync` in `src/reminders/notify.ts`); no push token is sent anywhere.
- **Microphone:** sound is analysed on the phone to detect pitch. It is never recorded to a file
  and never sent anywhere. No code in the app writes audio to a file or uploads it.
- **No analytics, no advertising SDK, no tracking.** The app's dependencies include none. The
  website has no cookies and no analytics. Free learners do see an ad *slot* after a lesson, but
  it is a placeholder with no ad network behind it (`src/lessons/Ad.tsx`). The day an ad network
  is added, this policy must change before that app version ships.
- **Without an account:** everything stays on the phone.
- **Deletion:** in the app (the Profile tab, account section, "Delete account") removes the account and every row,
  and revokes Apple's access. Link to `/delete-account`.
- **Processors:** Supabase (database and sign-in), Apple (Sign in with Apple, purchases),
  RevenueCat (subscriptions), Vercel (website hosting).
  - **Likely:** the Supabase project is in **East US (North Virginia), United States** (the
    app's `docs/PHASE-B-PLAN.md`, project `mabiewrwlaqqsikfokyn`). Confirm it in the Supabase
    dashboard before publishing.
- **Children:** see **Age** below.
- **Contact:** `support@getriffu.com`.

**Age** (see Inputs, item 3)

- Riffu is for people **13 and over**. It is not directed to children under 13 and does not
  knowingly collect their data. If BOMAU learns an account belongs to a child under 13, it deletes
  it; parents write to `support@getriffu.com`.
- Where local law sets a higher age for consenting to data processing (in the EU it ranges from
  13 to 16 by country; Spain sets 14), that age applies, and a younger learner needs a parent's or
  guardian's consent.
- Learners under 18 accept the Terms with a parent's or guardian's permission.
- In App Store Connect, Riffu is **not** placed in the Kids category. The age rating is about
  content and can stay low; it does not mean the app is aimed at children.

**Terms of Use**

- **The service:** Riffu, free with an optional Pro subscription.
- **Subscriptions:**
  - billed by Apple to the learner's Apple ID;
  - renew automatically unless cancelled at least 24 hours before the period ends;
  - the free trial converts to a paid subscription unless cancelled;
  - cancelled in the Apple ID settings;
  - refunds are handled by Apple.
- **Acceptable use, intellectual property, disclaimers, limitation of liability.**
- **Age:** 13 and over; under 18 with a parent's or guardian's permission.
- **The Apple terms Apple requires:** because these Terms replace Apple's standard licence
  agreement, they must include the minimum terms Apple sets for a custom licence agreement
  (Apple is not responsible for the app, is a third-party beneficiary, and so on). Check Apple's
  current App Store Review Guidelines and the developer agreement for the exact list.
- **Governing law:** New Mexico, United States.
- **Contact:** `support@getriffu.com`.
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
   - Bruno connects this repository to his Vercel account and adds `getriffu.com` and `getriffu.app`
     himself; the session writes down exactly which DNS records Vercel asks for.
   - **Keep the email working:** add Vercel's records (the apex record and the `www` CNAME) at
     the registrar and leave its nameservers and its `MX`, SPF and DKIM records alone. Moving
     the nameservers to Vercel would silently stop `support@getriffu.com` unless every mail
     record is copied first. After the change, send a test message to the support address.
   - `getriffu.app` set to redirect to `getriffu.com`.
   - HTTPS on both.
   - Every URL in **Done when** checked live.

**After phase 5**, in the app repository (`maurino72/riffu`):

- set `EXPO_PUBLIC_PRIVACY_URL` on EAS (production, preview and development) to
  `https://getriffu.com/privacy`;
- change `TERMS_URL` in `src/pro/legal.ts` to `https://getriffu.com/terms`;
- in App Store Connect: the privacy policy URL, the support URL, and the Terms as the custom
  licence agreement (or a link to `/terms` in the description, as Apple requires for
  subscriptions).

That is a separate change, in the app's own session.

## Done when

Every item is a check that passes or fails:

- [ ] `npm run build` and `astro check` exit 0. CI is green on `main`.
- [ ] Every page in the table above returns HTTP 200 on `https://getriffu.com`, in both languages
      (`curl -s -o /dev/null -w '%{http_code}'` for each).
- [ ] `https://getriffu.app/privacy` returns 308 with `Location: https://getriffu.com/privacy`.
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

Answered on 2026-11-25. Ask Bruno nothing more about these unless a fact changes.

1. **Domain:** `getriffu.com` (primary) and `getriffu.app` (redirects), bought by Bruno on
   2026-11-25; the session never makes a purchase.
2. **Support email:** `support@getriffu.com`, on the registrar's email plan. **Still open:** the
   mailbox must be created and receive a test message before phase 3 publishes it.
3. **Minimum age:** 13 and over, as written under **Age**. This also answers open question 3 in
   the app's `docs/ACCOUNTS-PLAN.md`.
4. **Vercel account:** Bruno has one and deploys himself at phase 5; the session never logs in on
   his behalf.
5. **Terms:** Riffu's own Terms of Use replace Apple's standard licence agreement.
6. **Company address:** confirmed as written under **Who**.

## Risks

- **The App Store link 404s until Riffu is public.** Do not announce the domain before the
  listing is live.
- **Legal text drifts from the app.** The app gains features (Android, Google sign-in, ads). Any
  change to what the app collects needs this site's Privacy Policy updated in the same week.
- **Trademark:** "Melo" and "Riffu" still need a trademark search before launch (from the app's
  brand notes).
- **Ads:** the free plan already reserves an ad slot. Adding an ad network changes the Privacy
  Policy, the "no tracking" line and possibly the age section; it must not ship before this
  site is updated.
