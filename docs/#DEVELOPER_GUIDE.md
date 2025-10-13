# Developer Guide

## Project Overview

B1 Bestie DTZ is a React + Tailwind CSS application for German language learning and DTZ exam preparation. The app features a clean, responsive interface with purple gradient themes and smooth animations.

## Architecture

### Layout System

The app uses a route-based layout system with two main shells:

1. **DashboardShell** - For dashboard routes only
   - Full purple sidebar with navigation
   - Mobile hamburger menu (right-side slide-out)
   - Logo and animations in sidebar

2. **BareShell** - For all other routes
   - Mobile-only hamburger menu
   - No persistent sidebar
   - Clean content-focused layout

### Project Structure

```
src/
├── components/
│   ├── layouts/           # Layout shells
│   │   ├── DashboardShell.jsx
│   │   └── BareShell.jsx
│   ├── dashboard/         # Dashboard-specific components
│   │   └── DashboardContent.jsx
│   ├── AudioPlayerNew.jsx # Audio player component
│   ├── HoerenTeilComplete.jsx
│   └── QuestionCard.jsx
├── pages/                 # Route components (thin)
│   ├── Dashboard.jsx      # Uses DashboardShell
│   ├── Tests.jsx         # Uses BareShell
│   ├── About.jsx         # Uses BareShell
│   └── ...
├── store/
│   └── useStore.js       # Global state management
└── main.jsx              # App entry point
```

### Routing Model

Using React Router with layout composition:

```jsx
// Dashboard gets its own shell
<Route path="/dashboard" element={<Dashboard />} />

// Other routes use BareShell
<Route path="/tests" element={
  <BareShell>
    <Tests />
  </BareShell>
} />
```

### Data Flow

- **Content Files**: Static JSON files in `/public/data/`
- **Audio Files**: MP3 files in `/public/audio/`
- **State Management**: Zustand store for global state
- **Props Flow**: Parent to child, minimal prop drilling

## Coding Standards

### Component Structure

```jsx
/**
 * ComponentName
 * Brief description of component purpose.
 * Notes about visual design preservation.
 */
import { useState } from "react";

export default function ComponentName({ prop1, prop2 }) {
  // 1. State hooks
  const [state, setState] = useState(defaultValue);

  // 2. Derived state
  const computedValue = useMemo(() => calculation, [dependencies]);

  // 3. Event handlers
  const handleClick = useCallback(() => {
    // Handler logic
  }, [dependencies]);

  // 4. Early returns
  if (!prop1) return null;

  // 5. Main render
  return <div className="component-container">{/* Component content */}</div>;
}
```

### File Organization

- **Co-locate related files**: Keep components with their specific logic
- **Max 300 lines per file**: Extract components or hooks when exceeded
- **Descriptive names**: No abbreviations, clear intent
- **Single responsibility**: Each file has one clear purpose

### Tailwind Usage

- **Use theme tokens**: Reference `tailwind.config.js` tokens
- **No hardcoded colors**: Use predefined color palette
- **Responsive patterns**: Mobile-first with `lg:` breakpoints
- **Animation classes**: Consistent timing and easing

Example:

```jsx
// ✅ Good
<div className="bg-white/80 rounded-2xl p-6 hover:scale-105 transition-all duration-200">

// ❌ Bad
<div className="bg-rgba(255,255,255,0.8)" style={{borderRadius: '16px', padding: '24px'}}>
```

## Development Workflow

### Setup

```bash
npm install
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
```

### Code Quality

```bash
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix linting issues
npm run format       # Prettier formatting
npm run typecheck    # TypeScript checking (if applicable)
```

### Testing Strategy

- **Visual testing**: Manual testing across routes
- **Layout testing**: Verify sidebar behavior on all routes
- **Responsive testing**: Test mobile/tablet/desktop breakpoints
- **Accessibility testing**: Focus management and screen readers

## Key Components

### DashboardShell

- **Purpose**: Layout wrapper for dashboard route
- **Features**: Purple sidebar, mobile hamburger, logo animation
- **Props**: `children` (React.ReactNode)

### BareShell

- **Purpose**: Layout wrapper for non-dashboard routes
- **Features**: Mobile-only hamburger menu, clean layout
- **Props**: `children` (React.ReactNode)

### DashboardContent

- **Purpose**: Main dashboard content area
- **Features**: Action cards, progress tracking, themes grid
- **Props**: None (self-contained)

## State Management

Using Zustand for global state:

```jsx
// store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
  // State
  user: null,
  progress: {},

  // Actions
  setUser: (user) => set({ user }),
  updateProgress: (progress) =>
    set((state) => ({
      progress: { ...state.progress, ...progress },
    })),
}));
```

## Performance Guidelines

### Bundle Optimization

- **Code splitting**: Route-based splitting with React.lazy
- **Tree shaking**: Import only needed exports
- **Asset optimization**: Compress images and audio files

### Animation Performance

- **Use transform**: Prefer `transform` over changing layout properties
- **GPU acceleration**: Use `transform3d` for smooth animations
- **Debounce**: Limit expensive operations on scroll/resize

### Loading Strategies

- **Lazy loading**: Load audio files on demand
- **Preloading**: Critical route components
- **Caching**: Static assets with proper cache headers

## Common Patterns

### Modal/Overlay Pattern

```jsx
{
  isOpen && (
    <>
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full">
          {/* Modal content */}
        </div>
      </div>
    </>
  );
}
```

### Loading State Pattern

```jsx
{
  isLoading ? (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>
  ) : (
    <div>{content}</div>
  );
}
```

### Error Boundary Pattern

```jsx
if (error) {
  return (
    <div className="text-center p-8">
      <p className="text-red-600">Something went wrong</p>
      <button
        onClick={retry}
        className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl"
      >
        Try Again
      </button>
    </div>
  );
}
```

## Deployment

### Build Process

```bash
npm run build        # Creates optimized production build
npm run preview      # Test production build locally
```

### Environment Variables

```env
VITE_API_URL=        # API endpoint (if needed)
VITE_CDN_URL=        # Asset CDN URL
```

### Vercel Deployment

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Troubleshooting

### Common Issues

1. **Sidebar appears on wrong routes**
   - Check route definition in App.jsx
   - Verify layout shell usage
   - Ensure no duplicate layout wrappers

2. **Styling inconsistencies**
   - Check Tailwind config matches design tokens
   - Verify no hardcoded styles override theme
   - Test across breakpoints

3. **Performance issues**
   - Check for unnecessary re-renders
   - Verify audio files aren't auto-loading
   - Use React DevTools Profiler

### Debug Tools

- React Developer Tools
- Tailwind CSS IntelliSense
- Browser DevTools (especially Network tab)
- Bundle analyzer: `npm run analyze`

## Contributing

### PR Checklist

- [ ] No visual design changes
- [ ] All linting passes
- [ ] Components under 300 lines
- [ ] Proper Tailwind token usage
- [ ] Mobile responsiveness tested
- [ ] Sidebar behavior verified
- [ ] Documentation updated

### Git Workflow

```bash
git checkout -b feature/component-name
# Make changes
npm run lint
npm run format
git add .
git commit -m "feat: descriptive commit message"
git push origin feature/component-name
# Create PR
```
