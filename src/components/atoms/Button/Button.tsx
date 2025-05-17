import React from 'react';

interface ButtonProps {
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Optional additional classes
   */
  className?: string;
  /**
   * Is the button disabled?
   */
  disabled?: boolean;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right';
  /**
   * Test ID for testing
   */
  testId?: string;
}

const Button = (props: ButtonProps) => {
  const {
    variant = 'primary',
    children,
    onClick,
    className = '',
    disabled = false,
    type = 'button',
    icon,
    iconPosition = 'left',
    testId = 'button',
  } = props;

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-indigo-600 hover:bg-indigo-700 text-white';
      case 'secondary':
        return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'outline':
        return 'bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50';
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 text-white';
    }
  };

  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  const renderContent = () => {
    if (!icon) return children;
    
    return (
      <>
        {iconPosition === 'left' && icon && <span className="mr-2">{icon}</span>}
        {children}
        {iconPosition === 'right' && icon && <span className="ml-2">{icon}</span>}
      </>
    );
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${getVariantClasses()} ${disabledClasses} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      data-testid={testId}
    >
      {renderContent()}
    </button>
  );
};

export default Button; 