/**
 * GradientHeading Component
 * Consistent gradient headings across the app
 * Follows design system standards (#DESIGN_SYSTEM.md)
 *
 * Usage:
 *   <GradientHeading level="h1">Welcome to B1 Bestie</GradientHeading>
 *   <GradientHeading level="h2" gradient="blue-to-purple">Subtitle</GradientHeading>
 */

import { cn } from "../../utils/cn";

const gradients = {
  "purple-to-indigo": "from-purple-600 to-indigo-600",
  "blue-to-purple": "from-blue-600 to-purple-600",
  "red-to-orange": "from-red-600 to-orange-600",
  "green-to-emerald": "from-green-600 to-emerald-600",
};

const sizes = {
  h1: "text-4xl md:text-5xl",
  h2: "text-3xl md:text-4xl",
  h3: "text-2xl md:text-3xl",
  h4: "text-xl md:text-2xl",
  h5: "text-lg md:text-xl",
  h6: "text-base md:text-lg",
};

const GradientHeading = ({
  level = "h1",
  children,
  className,
  gradient = "purple-to-indigo",
  ...props
}) => {
  const Tag = level;

  return (
    <Tag
      className={cn(
        // Base styles
        "font-black",
        "bg-gradient-to-r",
        "bg-clip-text text-transparent",
        // Gradient & size
        gradients[gradient],
        sizes[level],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default GradientHeading;
