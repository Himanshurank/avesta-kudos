import React from 'react';

interface BadgeProps {
  /**
   * Badge variant/color
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'default' | 'info' | 'dark';
  /**
   * Badge content
   */
  children: React.ReactNode;
  /**
   * Optional additional classes
   */
  className?: string;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Badge size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether the badge is rounded
   */
  rounded?: boolean;
  /**
   * Whether to use outline style
   */
  outline?: boolean;
  /**
   * Whether to add a subtle glow effect
   */
  glow?: boolean;
  /**
   * Whether to add a subtle pulse animation
   */
  pulse?: boolean;
  /**
   * Whether to use the soft/pastel variant
   */
  soft?: boolean;
  /**
   * Test ID for testing
   */
  testId?: string;
  /**
   * Optional onClick handler
   */
  onClick?: () => void;
}

const Badge = (props: BadgeProps) => {
  const {
    variant = 'default',
    children,
    className = '',
    icon,
    size = 'medium',
    rounded = false,
    outline = false,
    glow = false,
    pulse = false,
    soft = false,
    testId = 'badge',
    onClick,
  } = props;

  const getVariantClasses = (): string => {
    // Soft/pastel style
    if (soft) {
      switch (variant) {
        case 'primary':
          return 'bg-indigo-50 text-indigo-700 border border-indigo-100';
        case 'secondary':
          return 'bg-violet-50 text-violet-700 border border-violet-100';
        case 'success':
          return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
        case 'warning':
          return 'bg-amber-50 text-amber-700 border border-amber-100';
        case 'error':
          return 'bg-rose-50 text-rose-700 border border-rose-100';
        case 'info':
          return 'bg-sky-50 text-sky-700 border border-sky-100';
        case 'dark':
          return 'bg-gray-800 text-gray-100 border border-gray-700';
        default:
          return 'bg-slate-50 text-slate-700 border border-slate-100';
      }
    }
    
    // Outline style
    if (outline) {
      switch (variant) {
        case 'primary':
          return 'bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50';
        case 'secondary':
          return 'bg-white text-violet-600 border border-violet-300 hover:bg-violet-50';
        case 'success':
          return 'bg-white text-emerald-600 border border-emerald-300 hover:bg-emerald-50';
        case 'warning':
          return 'bg-white text-amber-600 border border-amber-300 hover:bg-amber-50';
        case 'error':
          return 'bg-white text-rose-600 border border-rose-300 hover:bg-rose-50';
        case 'info':
          return 'bg-white text-sky-600 border border-sky-300 hover:bg-sky-50';
        case 'dark':
          return 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50';
        default:
          return 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50';
      }
    }
    
    // Default filled style with gradient
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border border-indigo-600';
      case 'secondary':
        return 'bg-gradient-to-r from-violet-500 to-violet-600 text-white border border-violet-600';
      case 'success':
        return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border border-emerald-600';
      case 'warning':
        return 'bg-gradient-to-r from-amber-400 to-amber-500 text-white border border-amber-500';
      case 'error':
        return 'bg-gradient-to-r from-rose-500 to-rose-600 text-white border border-rose-600';
      case 'info':
        return 'bg-gradient-to-r from-sky-500 to-sky-600 text-white border border-sky-600';
      case 'dark':
        return 'bg-gradient-to-r from-gray-700 to-gray-800 text-white border border-gray-800';
      default:
        return 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border border-slate-200';
    }
  };

  const getSizeClasses = (): string => {
    switch (size) {
      case 'small':
        return 'text-xs px-2 py-0.5 font-medium';
      case 'large':
        return 'text-sm px-4 py-1.5 font-semibold tracking-wide';
      default:
        return 'text-xs px-3 py-1 font-medium';
    }
  };

  const getRoundedClasses = (): string => {
    return rounded ? 'rounded-full' : 'rounded-md';
  };

  const getGlowClasses = (): string => {
    if (!glow) return '';
    
    switch (variant) {
      case 'primary':
        return 'shadow-md shadow-indigo-200';
      case 'secondary':
        return 'shadow-md shadow-violet-200';
      case 'success':
        return 'shadow-md shadow-emerald-200';
      case 'warning':
        return 'shadow-md shadow-amber-200';
      case 'error':
        return 'shadow-md shadow-rose-200';
      case 'info':
        return 'shadow-md shadow-sky-200';
      case 'dark':
        return 'shadow-md shadow-gray-500/20';
      default:
        return 'shadow-md shadow-slate-200';
    }
  };

  const getPulseClasses = (): string => {
    if (!pulse) return '';
    return 'animate-pulse';
  };

  const getInteractiveClasses = (): string => {
    if (!onClick) return '';
    return 'cursor-pointer hover:shadow-lg transform hover:-translate-y-px active:translate-y-0';
  };

  const baseClasses = 'inline-flex items-center transition-all duration-200';
  
  return (
    <span
      className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${getRoundedClasses()} ${getGlowClasses()} ${getPulseClasses()} ${getInteractiveClasses()} ${className}`}
      data-testid={testId}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <span className="mr-1.5 flex-shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
    </span>
  );
};

export default Badge; 