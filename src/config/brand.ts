/**
 * Centralized Brand Configuration for LDL Dhenze Residential Building Construction
 * Official Source of Truth for Brand Assets, Identity, and Domain Information
 */

export const BRAND_CONFIG = {
  companyName: 'LDL Dhenze Residential Building Construction',
  legalName: 'LDL Dhenze Residential Building Construction',
  shortName: 'LDL Dhenze',
  tagline: 'Building Better Tomorrows',
  fullMotto: 'Building Better Tomorrows',
  website: 'https://dhenzebuilder.com',
  domain: 'dhenzebuilder.com',
  officialEmail: 'dhenzebuilders@gmail.com',

  // Official Master Logos
  logos: {
    // Master high-res circular crest logo (Official master logo from attachment)
    fullPng: '/branding/ldl-dhenze-logo.png',
    fullSvg: '/branding/ldl-dhenze-logo.svg',
    // Compact architectural emblem for sidebars, compact headers, and mobile views
    emblemPng: '/branding/ldl-dhenze-emblem.png',
    emblemSvg: '/branding/ldl-dhenze-emblem.svg',
    // Favicons
    faviconIco: '/favicon.ico',
    favicon16: '/favicon-16x16.png',
    favicon32: '/favicon-32x32.png',
    appleTouchIcon: '/apple-touch-icon.png',
    androidChrome192: '/android-chrome-192x192.png',
    androidChrome512: '/android-chrome-512x512.png',
  },

  // Official Brand Color Tokens
  colors: {
    navyDark: '#081E38',
    navyMid: '#0E2E54',
    navyAccent: '#1E3A8A',
    goldPrimary: '#CBA135',
    goldLight: '#E2B755',
    goldDark: '#9E7314',
    white: '#FFFFFF',
  },

  // Accessibility Alt Texts
  altText: {
    full: 'LDL Dhenze Residential Building Construction - Official Master Logo',
    compact: 'LDL Dhenze Residential Building Construction',
    emblem: 'LDL Dhenze Emblem',
  },
} as const;
