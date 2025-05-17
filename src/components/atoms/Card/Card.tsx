import React from 'react';

interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Optional additional classes
   */
  className?: string;
  /**
   * Card elevation/shadow
   */
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Whether the card has a border
   */
  bordered?: boolean;
  /**
   * Whether the card has rounded corners
   */
  rounded?: boolean;
  /**
   * Background color
   */
  bgColor?: 'white' | 'gray' | 'primary' | 'secondary';
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Whether the card is clickable
   */
  clickable?: boolean;
  /**
   * Test ID for testing
   */
  testId?: string;
}

const Card = (props: CardProps) => {
  const {
    children,
    className = '',
    elevation = 'sm',
    bordered = false,
    rounded = true,
    bgColor = 'white',
    onClick,
    clickable = false,
    testId = 'card',
  } = props;

  const getElevationClasses = (): string => {
    switch (elevation) {
      case 'none':
        return '';
      case 'sm':
        return 'shadow-sm';
      case 'md':
        return 'shadow-md';
      case 'lg':
        return 'shadow-lg';
      default:
        return 'shadow-sm';
    }
  };

  const getBorderClasses = (): string => {
    return bordered ? 'border border-gray-200' : '';
  };

  const getRoundedClasses = (): string => {
    return rounded ? 'rounded-lg' : '';
  };

  const getBgColorClasses = (): string => {
    switch (bgColor) {
      case 'white':
        return 'bg-white';
      case 'gray':
        return 'bg-gray-50';
      case 'primary':
        return 'bg-indigo-50';
      case 'secondary':
        return 'bg-purple-50';
      default:
        return 'bg-white';
    }
  };

  const getClickableClasses = (): string => {
    return clickable ? 'cursor-pointer transition-transform hover:scale-[1.01] hover:shadow-md' : '';
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      className={`overflow-hidden ${getElevationClasses()} ${getBorderClasses()} ${getRoundedClasses()} ${getBgColorClasses()} ${getClickableClasses()} ${className}`}
      onClick={handleClick}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default Card; 