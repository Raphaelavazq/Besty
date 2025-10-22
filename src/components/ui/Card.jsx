/**
 * Card Component
 * Reusable card with glass-morphism design
 * Follows design system standards (#DESIGN_SYSTEM.md)
 *
 * Usage:
 *   <Card variant="glass" padding="md">Content here</Card>
 *   <Card variant="solid" hover={false}>Static content</Card>
 */

import { cn } from "../../utils/cn";

const variants = {
  glass: "bg-white/80 backdrop-blur-md border border-purple-100",
  solid: "bg-white border border-gray-200",
  gradient:
    "bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200",
  transparent: "bg-transparent border-0",
};

const paddings = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = ({
  variant = "glass",
  padding = "md",
  hover = true,
  rounded = "2xl",
  children,
  className,
  onClick,
  ...props
}) => {
  const roundedClasses = {
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
  };

  const isInteractive = onClick || hover;

  return (
    <div
      onClick={onClick}
      className={cn(
        // Base styles
        roundedClasses[rounded],
        "shadow-lg",
        // Variant & padding
        variants[variant],
        paddings[padding],
        // Interactive states
        isInteractive &&
          "hover:shadow-xl hover:-translate-y-1 transition-all duration-200",
        onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
