/**
 * The one source of truth for the facts every page shares. Pages and components import from
 * here; nothing hard-codes the App Store URL, the domain or the company.
 */

/** Riffu's App Store Connect app id (`ascAppId` in the app repository's `eas.json`). */
export const APP_STORE_ID = '6838997064';

/** Every download button, badge and QR code points here. It resolves once the app is public. */
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;

/** The primary domain. `getriffu.app` redirects to it (set in Vercel, not here). */
export const SITE_URL = 'https://getriffu.com';

export const SUPPORT_EMAIL = 'support@getriffu.com';

export const COMPANY = {
  name: 'BOMAU LLC',
  address: '1209 Mountain Road Place NE, Albuquerque, NM 87110, United States',
} as const;
