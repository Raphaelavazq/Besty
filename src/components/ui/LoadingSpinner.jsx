/**
 * LoadingSpinner Component
 * Reusable loading indicator with optional text
 * Follows design system standards (#DESIGN_SYSTEM.md)
 *
 * Usage:
 *   <LoadingSpinner />
 *   <LoadingSpinner size="lg" text="Lädt..." />
 *   <LoadingSpinner color="white" />
 */

import { cn } from "../../utils/cn";

const sizes = {
  sm: "h-6 w-6 border-2",
  md: "h-12 w-12 border-4",
  lg: "h-16 w-16 border-4",
  xl: "h-20 w-20 border-4",
};

const colors = {
  purple: "border-purple-600 border-t-transparent",
  blue: "border-blue-600 border-t-transparent",
  white: "border-white border-t-transparent",
  indigo: "border-indigo-600 border-t-transparent",
};

const LoadingSpinner = ({
  size = "md",
  color = "purple",
  text,
  fullScreen = false,
  className,
}) => {
  const Wrapper = fullScreen ? "div" : "div";
  const wrapperClasses = fullScreen
    ? "min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50"
    : "";

  return (
    <Wrapper
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        wrapperClasses,
        className
      )}
    >
      <div
        className={cn("animate-spin rounded-full", sizes[size], colors[color])}
        role="status"
        aria-label={text || "Loading"}
      />
      {text && <p className="text-gray-600 font-medium text-center">{text}</p>}
    </Wrapper>
  );
};

export default LoadingSpinner;
