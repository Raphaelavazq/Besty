# Design System

## Design Principles

1. **Visual Consistency**: Maintain existing visual design exactly. No layout changes allowed.
2. **Component Reusability**: Extract reusable UI components with clear APIs.
3. **Accessibility**: WCAG AA compliance for color contrast and focus management.
4. **Mobile-First**: Responsive design prioritizing mobile experience.
5. **Performance**: Optimized animations and efficient rendering.

## Design Tokens

### Colors

```js
// Primary Brand Colors
brand: {
  50:  "#F5F2FF",   // Light backgrounds
  100: "#E9E1FF",   // Subtle highlights
  500: "#7A36E8",   // Primary actions
  600: "#6417E0",   // Hover states
  700: "#5413BF",   // Active states
}

// Accent Colors
accent: {
  100: "#D5EEF1",   // Light accent backgrounds
  600: "#17838E",   // Accent actions
}

// Semantic Colors
success: "#16A34A"      // Success states
warning: "#D97706"      // Warning states
error: "#DC2626"        // Error states
info: "#2563EB"         // Information states

// Text Colors
ink: "#0F172A"          // Primary text
text: "#1F2937"         // Secondary text
muted: "#64748B"        // Tertiary text

// Surface Colors
surface: "#FFFFFF"      // Card backgrounds
canvas: "#F8FAFC"       // Page backgrounds
line: "#E5E7EB"         // Borders
```

### Spacing Scale

```js
spacing: {
  1: "4px",    // Tight spacing
  2: "8px",    // Small spacing
  3: "12px",   // Medium spacing
  4: "16px",   // Standard spacing
  5: "20px",   // Large spacing
  6: "24px",   // Extra large spacing
  8: "32px",   // Section spacing
  10: "40px",  // Component spacing
}
```

### Typography

```js
fontSize: {
  xs: "12px",    // Captions, labels
  sm: "14px",    // Small text
  base: "16px",  // Body text
  lg: "20px",    // Large text
  xl: "24px",    // Headings
  "2xl": "32px", // Large headings
  "3xl": "40px", // Display text
  "4xl": "56px", // Hero text
}

fontFamily: {
  sans: ["Inter", "system-ui", "sans-serif"]
}
```

### Border Radius

```js
borderRadius: {
  xs: "6px",     // Small elements
  sm: "10px",    // Buttons, inputs
  md: "14px",    // Cards
  lg: "20px",    // Large components
  xl: "0.85rem", // Special cases
  "2xl": "1.25rem" // Large cards
}
```

## Component Library

### Button

**Primary Button**

```jsx
<button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200">
  Primary Action
</button>
```

**Secondary Button**

```jsx
<button className="bg-white/80 text-purple-700 px-4 py-2 rounded-xl font-medium border border-purple-100 hover:bg-purple-50 transition-all duration-200">
  Secondary Action
</button>
```

### Card

**Standard Card**

```jsx
<div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300">
  Card Content
</div>
```

**Interactive Card**

```jsx
<div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer group">
  Interactive Content
</div>
```

### Sidebar

**Navigation Item**

```jsx
<Link className="flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 text-white/80 hover:bg-white hover:text-purple-700 hover:shadow-md">
  <Icon size={18} className="mr-3" />
  Label
</Link>
```

**Active Navigation Item**

```jsx
<Link className="flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 bg-white/20 text-white shadow-lg backdrop-blur-sm">
  <Icon size={18} className="mr-3" />
  Active Label
</Link>
```

### Progress Bar

```jsx
<div className="w-full bg-purple-100 rounded-full h-2">
  <div
    className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
    style={{ width: "75%" }}
  />
</div>
```

## Layout Patterns

### Dashboard Shell

- Full sidebar on desktop (left-aligned)
- Mobile hamburger menu (right-side slide-out)
- Purple gradient sidebar background
- Bottom-aligned navigation with logo

### Bare Shell

- Mobile-only hamburger menu
- No persistent sidebar
- Clean content area
- Light gradient backgrounds

## Accessibility Standards

### Color Contrast

- Text on background: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio
- Interactive elements: minimum 3:1 ratio

### Focus States

```css
focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
```

### Interactive States

- Hover: Scale (1.05) + shadow enhancement
- Active: Scale (0.95) + color darkening
- Disabled: Opacity (0.5) + pointer-events-none

## Animation Guidelines

### Timing

```js
transitionDuration: {
  fast: "150ms",      // Micro-interactions
  normal: "200ms",    // Standard transitions
  slow: "300ms",      // Layout changes
  enter: "150ms",     // Entrance animations
  exit: "250ms",      // Exit animations
}
```

### Easing

```js
transitionTimingFunction: {
  enter: "cubic-bezier(0, 0, 0.2, 1)",     // Gentle entrance
  exit: "cubic-bezier(0.4, 0, 1, 1)",      // Quick exit
}
```

### Transform Patterns

- Hover: `hover:scale-105`
- Press: `active:scale-95`
- Float: `hover:-translate-y-2`
- Slide in: `translate-x-0` (from `translate-x-full`)

## Responsive Breakpoints

```js
screens: {
  sm: "640px",    // Small tablets
  md: "768px",    // Large tablets
  lg: "1024px",   // Desktop
  xl: "1280px",   // Large desktop
}
```

## Usage Examples

### Theme Section Card

```jsx
<div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg"></div>
  <h3 className="text-sm font-bold text-gray-900 mb-1">Theme Name</h3>
  <p className="text-purple-600 text-xs">12 Übungen</p>
</div>
```

### Main Action Card

```jsx
<Link className="group bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
    <Icon size={24} className="text-white" />
  </div>
  <h3 className="text-xl font-bold text-gray-900 mb-1">Action Title</h3>
  <p className="text-sm text-purple-600 mb-1">Subtitle</p>
  <p className="text-gray-600 text-sm">Description</p>
</Link>
```
