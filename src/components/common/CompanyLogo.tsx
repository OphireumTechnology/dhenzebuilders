import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';

export type CompanyLogoVariant = 'full' | 'compact' | 'emblem';
export type CompanyLogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;

export interface CompanyLogoProps {
  variant?: CompanyLogoVariant;
  size?: CompanyLogoSize;
  className?: string;
  theme?: 'dark' | 'light';
  alt?: string;
  showTagline?: boolean;
  stacked?: boolean;
  onClick?: () => void;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  variant = 'compact',
  size = 'md',
  className = '',
  theme = 'dark',
  alt = BRAND_CONFIG.altText.compact,
  showTagline = false,
  stacked = false,
  onClick,
}) => {
  const isLight = theme === 'light';
  const navyTextColor = isLight ? '#081E38' : '#FFFFFF';
  const goldColor = BRAND_CONFIG.colors.goldPrimary;
  const subtitleColor = isLight ? '#334155' : '#CBD5E1';

  // Sizing calculation in pixels
  let pixelHeight = 44;
  let pixelWidth = 44;

  if (typeof size === 'number') {
    pixelHeight = size;
    pixelWidth = size;
  } else {
    switch (size) {
      case 'xs':
        pixelHeight = 24;
        pixelWidth = 24;
        break;
      case 'sm':
        pixelHeight = 34;
        pixelWidth = 34;
        break;
      case 'md':
        pixelHeight = 44;
        pixelWidth = 44;
        break;
      case 'lg':
        pixelHeight = 64;
        pixelWidth = 64;
        break;
      case 'xl':
        pixelHeight = 84;
        pixelWidth = 84;
        break;
      case '2xl':
        pixelHeight = 120;
        pixelWidth = 120;
        break;
    }
  }

  // VARIANT: FULL CIRCULAR MASTER CREST
  if (variant === 'full') {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center select-none ${className}`}
        id="ldl-dhenze-master-logo-full"
        onClick={onClick}
      >
        <img
          src={BRAND_CONFIG.logos.fullPng}
          alt={alt || BRAND_CONFIG.altText.full}
          style={{
            height: `${pixelHeight * 1.8}px`,
            width: `${pixelHeight * 1.8}px`,
            objectFit: 'contain',
          }}
          className="shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-md"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // VARIANT: EMBLEM ONLY (Icon for collapsed sidebars, tiny headers, favicons)
  if (variant === 'emblem') {
    return (
      <div
        className={`inline-flex items-center justify-center select-none ${className}`}
        id="ldl-dhenze-brand-emblem"
        onClick={onClick}
      >
        <img
          src={BRAND_CONFIG.logos.emblemPng}
          alt={alt || BRAND_CONFIG.altText.emblem}
          style={{
            height: `${pixelHeight}px`,
            width: `${pixelWidth}px`,
            objectFit: 'contain',
          }}
          className="shrink-0 transition-transform duration-300 hover:scale-105"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // VARIANT: COMPACT (Official Emblem + Refined Master Typography)
  return (
    <div
      className={`inline-flex ${
        stacked ? 'flex-col items-center text-center' : 'items-center gap-3'
      } select-none ${className}`}
      id="ldl-dhenze-brand-compact"
      onClick={onClick}
    >
      {/* Official Master Emblem */}
      <img
        src={BRAND_CONFIG.logos.emblemPng}
        alt={alt}
        style={{
          height: `${pixelHeight}px`,
          width: `${pixelWidth}px`,
          objectFit: 'contain',
        }}
        className="shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-sm"
        loading="eager"
        decoding="async"
      />

      {/* Official Typography */}
      <div className={`flex flex-col ${stacked ? 'items-center mt-2' : 'justify-center'}`}>
        {/* Primary Wordmark: LDL in Gold, DHENZE in Navy/White */}
        <div className="flex items-baseline tracking-[0.14em] font-black leading-none">
          <span
            style={{ color: goldColor }}
            className="text-base sm:text-lg lg:text-xl font-black font-['Montserrat',sans-serif] mr-1.5"
          >
            LDL
          </span>
          <span
            style={{ color: navyTextColor }}
            className="text-base sm:text-lg lg:text-xl font-black font-['Montserrat',sans-serif]"
          >
            DHENZE
          </span>
        </div>

        {/* Regulatory Classification Line */}
        <div className="flex items-center gap-1.5 mt-1 w-full justify-center">
          <span className="w-2.5 h-[1.5px] bg-[#CBA135] shrink-0" />
          <span
            style={{ color: subtitleColor }}
            className="text-[7.5px] sm:text-[9px] uppercase font-bold tracking-[0.20em] font-['Montserrat',sans-serif] whitespace-nowrap"
          >
            Residential Building Construction
          </span>
          <span className="w-2.5 h-[1.5px] bg-[#CBA135] shrink-0" />
        </div>

        {/* Official Tagline: BUILDING BETTER TOMORROWS */}
        {showTagline && (
          <div className="flex items-center justify-center gap-1.5 text-[7px] sm:text-[8px] text-[#CBA135] uppercase tracking-[0.22em] font-bold mt-1">
            <span>Building Better Tomorrows</span>
          </div>
        )}
      </div>
    </div>
  );
};
