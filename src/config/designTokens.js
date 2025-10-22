/**
 * Design System Tokens
 * Centralized design tokens for consistent styling
 * Based on #DESIGN_SYSTEM.md standards
 *
 * Usage:
 *   import { colors, shadows, transitions } from '@/config/designTokens'
 *   className={`${colors.gradient.primary} ${shadows.card}`}
 */

export const colors = {
  // Brand gradients
  gradient: {
    primary: "from-purple-600 to-indigo-600",
    secondary: "from-blue-600 to-purple-600",
    success: "from-green-600 to-emerald-600",
    danger: "from-red-600 to-orange-600",
  },

  // Glass-morphism backgrounds
  glass: {
    light: "bg-white/80 backdrop-blur-md",
    medium: "bg-white/90 backdrop-blur-lg",
    dark: "bg-white/70 backdrop-blur-sm",
  },

  // Border colors
  border: {
    light: "border-purple-100",
    medium: "border-purple-200",
    dark: "border-purple-300",
  },

  // Text colors
  text: {
    primary: "text-gray-900",
    secondary: "text-gray-600",
    muted: "text-gray-500",
  },
};

export const shadows = {
  card: "shadow-lg hover:shadow-xl",
  button: "shadow-md hover:shadow-lg",
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

export const transitions = {
  // Animation timing
  fast: "transition-all duration-150",
  normal: "transition-all duration-200",
  slow: "transition-all duration-300",

  // Common hover effects
  hover: {
    lift: "hover:-translate-y-1",
    scale: "hover:scale-105",
    scaleSm: "hover:scale-[1.02]",
  },

  // Active states
  active: {
    scale: "active:scale-95",
    scaleSm: "active:scale-[0.98]",
  },
};

export const rounded = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  full: "rounded-full",
};

export const spacing = {
  card: {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  },
  section: {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
  },
};

export const focus = {
  ring: "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
  ringInset:
    "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500",
};

export const accessibility = {
  // Minimum touch target (44x44px)
  minTouch: "min-h-[44px] min-w-[44px]",

  // Screen reader only
  srOnly: "sr-only",

  // Focus visible
  focusVisible: "focus-visible:ring-2 focus-visible:ring-purple-500",
};

// Composite utilities
export const composites = {
  // Standard glass card
  glassCard: [
    colors.glass.light,
    colors.border.light,
    "border",
    rounded.lg,
    shadows.card,
    transitions.normal,
  ].join(" "),

  // Primary button base
  primaryButton: [
    "bg-gradient-to-r",
    colors.gradient.primary,
    "text-white",
    "font-semibold",
    rounded.lg,
    shadows.button,
    transitions.normal,
    transitions.hover.lift,
    transitions.active.scale,
    focus.ring,
  ].join(" "),

  // Gradient heading
  gradientHeading: [
    "font-black",
    "bg-gradient-to-r",
    colors.gradient.primary,
    "bg-clip-text text-transparent",
  ].join(" "),
};

export default {
  colors,
  shadows,
  transitions,
  rounded,
  spacing,
  focus,
  accessibility,
  composites,
};
