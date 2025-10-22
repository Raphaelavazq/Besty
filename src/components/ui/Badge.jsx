/**
 * Badge Component
 * Reusable status badges and labels
 * Follows design system standards (#DESIGN_SYSTEM.md)
 *
 * Usage:
 *   <Badge variant="success">Completed</Badge>
 *   <Badge variant="warning" icon={Clock}>In Progress</Badge>
 *   <Badge variant="info" size="lg">New</Badge>
 */

import { cn } from "../../utils/cn";

const variants = {
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  error: "bg-red-100 text-red-800 border-red-200",
  info: "bg-blue-100 text-blue-800 border-blue-200",
  purple: "bg-purple-100 text-purple-800 border-purple-200",
  neutral: "bg-gray-100 text-gray-800 border-gray-200",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  icon: Icon,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        // Base styles
        "inline-flex items-center gap-1.5",
        "font-semibold",
        "rounded-full",
        "border",
        "transition-all duration-150",
        // Variant & size
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
};

export default Badge;
