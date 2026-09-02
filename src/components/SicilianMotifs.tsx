import React from 'react';

// Delicate botanical line-art illustration inspired by Mediterranean flora
export const BotanicalOliveBranch: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-16 h-20',
  color = '#5B6842',
}) => (
  <svg
    viewBox="0 0 100 130"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Central main curving stem */}
    <path
      d="M20 120 C 35 95, 55 60, 75 15"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    
    {/* Top leaf */}
    <path
      d="M75 15 C 80 5, 88 8, 86 20 C 84 28, 77 22, 75 15 Z"
      stroke={color}
      strokeWidth="1.2"
      fill={color}
      fillOpacity="0.04"
      strokeLinejoin="round"
    />
    <path d="M75 15 C 79 13, 83 15, 85 18" stroke={color} strokeWidth="0.8" strokeLinecap="round" />

    {/* Right upper leaf */}
    <path
      d="M66 34 C 82 28, 92 35, 88 46 C 82 54, 70 42, 66 34 Z"
      stroke={color}
      strokeWidth="1.2"
      fill={color}
      fillOpacity="0.04"
      strokeLinejoin="round"
    />
    <path d="M66 34 C 74 36, 80 40, 84 44" stroke={color} strokeWidth="0.8" strokeLinecap="round" />

    {/* Left upper leaf */}
    <path
      d="M58 46 C 42 38, 32 44, 34 56 C 38 66, 52 56, 58 46 Z"
      stroke={color}
      strokeWidth="1.2"
      fill={color}
      fillOpacity="0.04"
      strokeLinejoin="round"
    />
    <path d="M58 46 C 50 49, 44 52, 38 54" stroke={color} strokeWidth="0.8" strokeLinecap="round" />

    {/* Right mid leaf */}
    <path
      d="M48 65 C 66 60, 76 68, 72 80 C 66 88, 54 75, 48 65 Z"
      stroke={color}
      strokeWidth="1.2"
      fill={color}
      fillOpacity="0.04"
      strokeLinejoin="round"
    />
    <path d="M48 65 C 56 68, 62 72, 66 76" stroke={color} strokeWidth="0.8" strokeLinecap="round" />

    {/* Left mid leaf */}
    <path
      d="M38 80 C 20 74, 12 82, 14 94 C 18 104, 32 92, 38 80 Z"
      stroke={color}
      strokeWidth="1.2"
      fill={color}
      fillOpacity="0.04"
      strokeLinejoin="round"
    />
    <path d="M38 80 C 30 84, 24 88, 18 90" stroke={color} strokeWidth="0.8" strokeLinecap="round" />

    {/* Right lower leaf */}
    <path
      d="M30 98 C 46 94, 56 102, 52 114 C 46 122, 36 108, 30 98 Z"
      stroke={color}
      strokeWidth="1.2"
      fill={color}
      fillOpacity="0.04"
      strokeLinejoin="round"
    />
    <path d="M30 98 C 38 102, 44 106, 48 110" stroke={color} strokeWidth="0.8" strokeLinecap="round" />

    {/* Small olive fruit accents */}
    <ellipse cx="62" cy="52" rx="3" ry="4.5" transform="rotate(25 62 52)" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.15" />
    <ellipse cx="42" cy="74" rx="3" ry="4.5" transform="rotate(-30 42 74)" stroke={color} strokeWidth="1" fill={color} fillOpacity="0.15" />
  </svg>
);

export const OliveBranchIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#5E6C3B',
}) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M8 40C16 34 24 24 38 10"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M20 28C17 24 16 18 20 15C24 12 28 17 27 22"
      fill={color}
      fillOpacity="0.85"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M29 20C28 14 31 10 35 11C39 12 38 18 34 22"
      fill={color}
      fillOpacity="0.85"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M13 34C10 31 11 25 15 24C19 23 20 29 18 33"
      fill={color}
      fillOpacity="0.85"
      stroke={color}
      strokeWidth="1.5"
    />
    <ellipse cx="37" cy="18" rx="3.5" ry="5" transform="rotate(30 37 18)" fill="#3E4724" />
    <ellipse cx="25" cy="27" rx="3.5" ry="5" transform="rotate(-25 25 27)" fill="#3E4724" />
  </svg>
);

export const LemonIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M24 12C32 12 38 17 38 24C38 32 30 38 24 38C17 38 10 32 10 24C10 16 16 12 24 12Z"
      fill="#F0CD6D"
      stroke="#DDB146"
      strokeWidth="2"
    />
    <path
      d="M38 24C41 24 43 23 42 22C41 21 39 22 38 24Z"
      fill="#E5BE4A"
    />
    <path
      d="M10 24C7 24 5 25 6 26C7 27 9 26 10 24Z"
      fill="#E5BE4A"
    />
    <path
      d="M24 12C24 8 28 5 32 6C30 9 27 11 24 12Z"
      fill="#5E6C3B"
      stroke="#3E4724"
      strokeWidth="1.5"
    />
  </svg>
);

export const WaxSeal: React.FC<{ text?: string; className?: string }> = ({
  text = 'S•2027',
  className = 'w-16 h-16',
}) => (
  <div
    className={`relative inline-flex items-center justify-center rounded-full bg-[#BD5D38] text-[#F5EFEB] shadow-md border-2 border-[#A24A2A] ${className}`}
    style={{
      boxShadow: '0 4px 12px rgba(189, 93, 56, 0.35), inset 0 2px 4px rgba(255,255,255,0.2)',
    }}
  >
    <div className="absolute inset-1 rounded-full border border-dashed border-[#F5EFEB]/40 flex items-center justify-center">
      <span className="font-serif font-bold text-xs tracking-widest uppercase text-white/90">
        {text}
      </span>
    </div>
  </div>
);

export const SicilianTileBorder: React.FC<{ className?: string; color?: string }> = ({
  className = 'h-3 w-full',
  color = '#BD5D38',
}) => (
  <div className={`flex items-center justify-center space-x-1.5 overflow-hidden ${className}`}>
    {[...Array(24)].map((_, i) => (
      <div
        key={i}
        className="w-2 h-2 rotate-45 shrink-0"
        style={{
          backgroundColor: i % 3 === 0 ? '#BD5D38' : i % 3 === 1 ? '#5E6C3B' : '#7498A5',
          opacity: 0.65,
        }}
      />
    ))}
  </div>
);

export const CrestMonogram: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center mx-auto ${className}`}>
    <div className="absolute inset-0 flex items-center justify-center">
      <OliveBranchIcon className="w-14 h-14 -rotate-12 opacity-80" color="#5E6C3B" />
    </div>
    <span className="font-display font-semibold text-lg tracking-wider text-[#221C18] relative z-10">
      M&L
    </span>
  </div>
);

import { WeddingLogo } from './WeddingLogo';

export const MarianaLukasLogo: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
}> = ({ className = '', size = 'md', theme = 'light' }) => {
  return <WeddingLogo className={className} size={size} theme={theme} />;
};

