import React from 'react';
import { CompanyLogo, CompanyLogoProps } from './CompanyLogo';

export interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'symbol-only' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  stacked?: boolean;
}

/**
 * BrandLogo provides backwards-compatibility for existing call sites
 * while rendering the new official LDL Dhenze master logo assets.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showTagline = false,
  stacked = false,
}) => {
  let logoVariant: CompanyLogoProps['variant'] = 'compact';
  if (variant === 'symbol-only') {
    logoVariant = 'emblem';
  } else if (variant === 'full') {
    logoVariant = 'full';
  }

  const theme: CompanyLogoProps['theme'] = variant === 'light' ? 'light' : 'dark';

  return (
    <CompanyLogo
      variant={logoVariant}
      size={size}
      theme={theme}
      showTagline={showTagline}
      stacked={stacked}
      className={className}
    />
  );
};

export { CompanyLogo } from './CompanyLogo';
