/**
 * Button Component
 * Reusable button with multiple variants and sizes
 * Follows design system standards (#DESIGN_SYSTEM.md)
 *
 * Usage:
 *   <Button variant="primary" size="md" icon={Play}>Click Me</Button>
 *   <Button variant="secondary">Cancel</Button>
 *   <Button variant="ghost" icon={ArrowLeft} />
 */

import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white',
  secondary: 'bg-white text-purple-600 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50',
  ghost: 'bg-transparent text-purple-600 hover:bg-purple-50',
  danger: 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white',
  success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = forwardRef(({ 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center gap-2',
        'font-bold rounded-2xl',
        'shadow-lg hover:shadow-xl',
        'transform hover:-translate-y-1',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
        // Minimum touch target size (accessibility)
        'min-h-[44px]',
        // Variant & size
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
