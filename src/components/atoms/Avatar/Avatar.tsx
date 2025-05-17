import React from 'react';

interface AvatarProps {
  /**
   * Source URL for the image
   */
  src?: string;
  /**
   * Alternative text for the image
   */
  alt?: string;
  /**
   * Fallback initials to show when image is not available
   */
  initials?: string;
  /**
   * Size of the avatar
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Background color for the avatar when showing initials
   */
  bgColor?: 'primary' | 'secondary' | 'gray' | 'indigo' | 'purple' | 'green' | 'yellow' | 'red';
  /**
   * Optional additional classes
   */
  className?: string;
  /**
   * Status icon to display (online, offline, busy, away)
   */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /**
   * Test ID for testing
   */
  testId?: string;
}

const Avatar = (props: AvatarProps) => {
  const {
    src,
    alt = 'Avatar',
    initials,
    size = 'md',
    bgColor = 'gray',
    className = '',
    status,
    testId = 'avatar',
  } = props;

  const getSizeClasses = (): string => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6 text-xs';
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'md':
        return 'w-10 h-10 text-base';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  const getBgColorClasses = (): string => {
    switch (bgColor) {
      case 'primary':
        return 'bg-indigo-600 text-white';
      case 'secondary':
        return 'bg-purple-600 text-white';
      case 'gray':
        return 'bg-gray-600 text-white';
      case 'indigo':
        return 'bg-indigo-500 text-white';
      case 'purple':
        return 'bg-purple-500 text-white';
      case 'green':
        return 'bg-green-500 text-white';
      case 'yellow':
        return 'bg-yellow-500 text-white';
      case 'red':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getStatusClasses = (): string => {
    if (!status) return '';
    
    const baseStatusClasses = 'absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 border-2 border-white rounded-full';
    const statusSizeClass = size === 'xs' || size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';

    switch (status) {
      case 'online':
        return `${baseStatusClasses} ${statusSizeClass} bg-green-500`;
      case 'offline':
        return `${baseStatusClasses} ${statusSizeClass} bg-gray-500`;
      case 'busy':
        return `${baseStatusClasses} ${statusSizeClass} bg-red-500`;
      case 'away':
        return `${baseStatusClasses} ${statusSizeClass} bg-yellow-500`;
      default:
        return '';
    }
  };

  const getInitials = (): string => {
    if (initials) return initials.substring(0, 2).toUpperCase();
    
    if (alt && alt !== 'Avatar') {
      const nameParts = alt.split(' ').filter(Boolean);
      if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
      if (nameParts.length > 1) {
        return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
      }
    }
    
    return '';
  };

  return (
    <div className="relative inline-flex" data-testid={testId}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${getSizeClasses()} rounded-full object-cover ${className}`}
          data-testid={`${testId}-image`}
        />
      ) : (
        <div
          className={`${getSizeClasses()} ${getBgColorClasses()} rounded-full flex items-center justify-center font-medium ${className}`}
          data-testid={`${testId}-initials`}
        >
          {getInitials()}
        </div>
      )}
      {status && <span className={getStatusClasses()} data-testid={`${testId}-status`}></span>}
    </div>
  );
};

export default Avatar; 