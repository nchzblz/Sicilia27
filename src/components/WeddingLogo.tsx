import React from 'react';
import logoImage from '../assets/images/regenerated_image_1788268500011.png';

export interface WeddingLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero' | 'badge';
  variant?: 'stacked' | 'badge' | 'compact';
  theme?: 'light' | 'dark';
}

export const WeddingLogo: React.FC<WeddingLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'stacked',
}) => {
  // If variant is badge / compact
  if (variant === 'badge' || size === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={logoImage}
          alt="Mariana & Lukas - Sicilia - Noto, 2027"
          className="h-9 w-auto object-contain"
        />
      </div>
    );
  }

  // Size mapping using the official logo image
  const heightClasses = {
    xs: 'h-8 sm:h-9',
    sm: 'h-10 sm:h-12',
    md: 'h-16 sm:h-20',
    lg: 'h-24 sm:h-28',
    hero: 'w-full max-w-[340px] sm:max-w-[440px] h-auto max-h-[190px]',
  }[size === 'badge' ? 'sm' : size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <img
        src={logoImage}
        alt="Mariana & Lukas - Sicilia - Noto, 2027"
        className={`${heightClasses} object-contain transition-all`}
      />
    </div>
  );
};
