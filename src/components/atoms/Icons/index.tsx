import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const ThumbsUpIcon: React.FC<IconProps> = ({ 
  className = '',
  size = 24,
  color = 'currentColor'
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`thumbs-up-icon ${className}`}
  >
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ 
  className = '',
  size = 24,
  color = 'currentColor'
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`trophy-icon ${className}`}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 22V8a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v14" />
    <path d="M6 12h12" />
  </svg>
);

export const FlowerIcon: React.FC<IconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor'
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`flower-icon ${className}`}
  >
    <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15" />
    <circle cx="12" cy="12" r="3" />
    <path d="m8 16 1.5-1.5" />
    <path d="M14.5 9.5 16 8" />
    <path d="m8 8 1.5 1.5" />
    <path d="M14.5 14.5 16 16" />
  </svg>
);

// Re-export any existing icons from this directory
export * from './SearchIcon'; 