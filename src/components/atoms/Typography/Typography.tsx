import React from 'react';

type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline';

type TypographyComponent = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6'
  | 'p' 
  | 'span' 
  | 'div'
  | 'label';

interface TypographyProps {
  /**
   * The variant to use
   */
  variant?: TypographyVariant;
  /**
   * The component to render as
   */
  component?: TypographyComponent;
  /**
   * Optional additional classes
   */
  className?: string;
  /**
   * The content to display
   */
  children: React.ReactNode;
  /**
   * Text color
   */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'white';
  /**
   * Is the text bold?
   */
  bold?: boolean;
  /**
   * Is the text italic?
   */
  italic?: boolean;
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * Test ID for testing
   */
  testId?: string;
}

const Typography = (props: TypographyProps) => {
  const {
    variant = 'body1',
    component,
    className = '',
    children,
    color = 'default',
    bold = false,
    italic = false,
    align = 'left',
    testId = 'typography',
  } = props;

  // Determine which element to render based on variant if component is not provided
  const getComponent = (): TypographyComponent => {
    if (component) return component;
    
    switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return variant;
      default:
        return 'p';
    }
  };

  const getVariantClasses = (): string => {
    switch (variant) {
      case 'h1':
        return 'text-4xl md:text-5xl';
      case 'h2':
        return 'text-3xl md:text-4xl';
      case 'h3':
        return 'text-2xl md:text-3xl';
      case 'h4':
        return 'text-xl md:text-2xl';
      case 'h5':
        return 'text-lg md:text-xl';
      case 'h6':
        return 'text-base md:text-lg';
      case 'body1':
        return 'text-base';
      case 'body2':
        return 'text-sm';
      case 'subtitle1':
        return 'text-base';
      case 'subtitle2':
        return 'text-sm';
      case 'caption':
        return 'text-xs';
      case 'overline':
        return 'text-xs uppercase tracking-wider';
      default:
        return 'text-base';
    }
  };

  const getColorClasses = (): string => {
    switch (color) {
      case 'primary':
        return 'text-indigo-600';
      case 'secondary':
        return 'text-purple-600';
      case 'error':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'white':
        return 'text-white';
      default:
        return 'text-gray-800';
    }
  };

  const getFontClasses = (): string => {
    let classes = '';
    if (bold) classes += ' font-bold';
    if (italic) classes += ' italic';
    return classes;
  };

  const getAlignmentClasses = (): string => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'justify':
        return 'text-justify';
      default:
        return 'text-left';
    }
  };

  const Element = getComponent();
  
  const classes = `${getVariantClasses()} ${getColorClasses()} ${getFontClasses()} ${getAlignmentClasses()} ${className}`;

  return (
    <Element className={classes} data-testid={testId}>
      {children}
    </Element>
  );
};

export default Typography; 