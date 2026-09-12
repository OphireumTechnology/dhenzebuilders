import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'symbol-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  stacked?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showTagline = false,
  stacked = false,
}) => {
  const isDarkCanvas = variant === 'dark';
  const navyColor = isDarkCanvas ? '#FFFFFF' : '#071A2F';
  const goldColor = '#C6922D';
  const subtitleColor = isDarkCanvas ? '#CBD5E1' : '#071A2F';

  // Dimension sizing
  let iconHeight = 44;
  let iconWidth = 55;
  if (size === 'sm') {
    iconHeight = 34;
    iconWidth = 42;
  } else if (size === 'lg') {
    iconHeight = 64;
    iconWidth = 80;
  } else if (size === 'xl') {
    iconHeight = 90;
    iconWidth = 112;
  }

  return (
    <div
      className={`inline-flex ${
        stacked ? 'flex-col items-center text-center' : 'items-center gap-3.5'
      } select-none ${className}`}
      id="ldl-dhenze-brand-logo"
    >
      {/* Official Geometric Tower & Interlocking LDL Monogram */}
      <svg
        height={iconHeight}
        width={iconWidth}
        viewBox="0 0 120 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Background Architectural Spire Cluster (Rising from within LDL) */}
        <g id="architectural-cluster">
          {/* Left Vertical Louvers / Columns (3 vertical bars) */}
          <rect x="42" y="36" width="3.5" height="24" rx="0.5" fill={isDarkCanvas ? '#38BDF8' : '#071A2F'} />
          <rect x="47.5" y="32" width="3.5" height="28" rx="0.5" fill={isDarkCanvas ? '#38BDF8' : '#071A2F'} />
          <rect x="53" y="27" width="3.5" height="33" rx="0.5" fill={isDarkCanvas ? '#38BDF8' : '#071A2F'} />

          {/* Center Main Skyscraper (Angled Roofline, Deep Navy) */}
          <path
            d="M58 20 L70 12 V60 H58 Z"
            fill={isDarkCanvas ? '#1E293B' : '#071A2F'}
            stroke={goldColor}
            strokeWidth="1"
          />
          {/* Window mullions on center skyscraper */}
          <line x1="62" y1="22" x2="62" y2="58" stroke={isDarkCanvas ? '#94A3B8' : '#FFFFFF'} strokeWidth="1" strokeDasharray="3 2" />
          <line x1="66" y1="18" x2="66" y2="58" stroke={isDarkCanvas ? '#94A3B8' : '#FFFFFF'} strokeWidth="1" strokeDasharray="3 2" />

          {/* Right Soaring Architectural Spire (Gold Outline with Chamfered Apex) */}
          <path
            d="M72 8 L84 15 V60 H72 Z"
            fill="none"
            stroke={goldColor}
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          <path
            d="M75 14 L81 18 V58 H75 Z"
            fill={goldColor}
            opacity="0.25"
          />
        </g>

        {/* Foreground Interlocking LDL Monogram */}
        <g id="ldl-letters">
          {/* Left 'L' Pillar (Navy / White) */}
          <path
            d="M16 34 H28 V59 H48 V69 H16 Z"
            fill={navyColor}
          />

          {/* Center 'D' Loop (Warm Gold, Interlocking) */}
          <path
            d="M44 42 H56 C68 42 76 48 76 56 C76 64 68 70 56 70 H44 Z M52 50 V62 H56 C62 62 67 59 67 56 C67 53 62 50 56 50 Z"
            fill={goldColor}
          />

          {/* Right 'L' Pillar (Navy / White) */}
          <path
            d="M80 34 H92 V59 H112 V69 H80 Z"
            fill={navyColor}
          />
        </g>
      </svg>

      {variant !== 'symbol-only' && (
        <div className={`flex flex-col ${stacked ? 'items-center mt-2' : 'justify-center'}`}>
          {/* Primary Wordmark: LDL DHENZE */}
          <div className="flex items-baseline tracking-[0.16em] font-extrabold leading-none">
            <span
              style={{ color: navyColor }}
              className="text-lg sm:text-xl font-black font-['Montserrat',sans-serif] mr-2"
            >
              LDL
            </span>
            <span
              style={{ color: goldColor }}
              className="text-lg sm:text-xl font-black font-['Montserrat',sans-serif]"
            >
              DHENZE
            </span>
          </div>

          {/* Regulatory Business Classification Subtitle */}
          <div className="flex items-center gap-1.5 mt-1.5 w-full justify-center">
            <span className="w-3 h-[1.5px] bg-[#C6922D]" />
            <span
              style={{ color: subtitleColor }}
              className="text-[8px] sm:text-[9.5px] uppercase font-bold tracking-[0.22em] font-['Montserrat',sans-serif] whitespace-nowrap"
            >
              Residential Building Construction
            </span>
            <span className="w-3 h-[1.5px] bg-[#C6922D]" />
          </div>

          {/* Official Positioning Slogan */}
          {showTagline && (
            <div className="flex items-center gap-1.5 text-[7.5px] text-[#C6922D] uppercase tracking-[0.16em] font-bold mt-1.5">
              <span>Building Today.</span>
              <span className="text-emerald-500 font-black">|</span>
              <span>Engineering Tomorrow.</span>
              <span className="text-emerald-500 font-black">|</span>
              <span>Powering the Future.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

