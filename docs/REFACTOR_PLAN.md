# Project Refactor Plan

## **🎯 Objectives**

- Fix sidebar appearing on wrong pages
- Delete dead code and unused assets
- Establish canonical Tailwind theme
- Improve component structure
- Maintain visual design exactly

## **📋 Issues Identified**

### 1. Sidebar Layout Problems

- **Problem**: Dashboard has embedded sidebar + Layout has separate sidebar
- **Root Cause**: Layout composition not properly segmented by route type
- **Impact**: Confusion about which sidebar shows where

### 2. Dead Code

- **Files to Delete**:
  - `src/pages/Dashboard_clean.jsx` ❌
  - `src/pages/Dashboard_compact.jsx` ❌
  - `src/pages/Dashboard_old.jsx` ❌
  - `src/components/MobileNavigation.jsx` ❌
  - `src/components/ProfileSidebar.jsx` ❌
  - `src/components/AudioPlayer.jsx.backup` ❌

### 3. Component Size Issues

- **Dashboard.jsx**: 300+ lines → Extract sidebar into separate component
- **Layout.jsx**: Mixed responsibilities → Split into layout shells

### 4. Theme Inconsistencies

- Hardcoded colors mixed with theme tokens
- No centralized theme source of truth

## **🔧 Refactor Plan**

### Phase 1: Layout Architecture Fix

```
Before:
App.jsx
├── Layout (wraps everything except HeroPage)
│   ├── Sidebar (for non-dashboard)
│   └── children
└── Dashboard (has its own sidebar)

After:
App.jsx
├── DashboardShell (dashboard only)
│   ├── DashboardSidebar
│   └── children
└── BareShell (all other pages)
    ├── MobileSidebar (hamburger menu)
    └── children
```

### Phase 2: Component Extraction

- Extract `DashboardSidebar` from `Dashboard.jsx`
- Create `DashboardShell.jsx` layout component
- Create `BareShell.jsx` for non-dashboard pages
- Split large Dashboard into smaller components

### Phase 3: Dead Code Removal

- Delete unused Dashboard variants
- Remove unused mobile navigation components
- Clean up backup files

### Phase 4: Theme Normalization

- Create canonical `tailwind.config.js` with proper tokens
- Replace hardcoded colors with theme tokens
- Document theme in design system

## **📁 Final Structure**

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── dashboard/    # Dashboard-specific components
│   └── layouts/      # Layout shells
├── pages/            # Route components (thin)
├── hooks/            # Custom hooks
└── config/           # Configuration files
```

## **✅ Success Criteria**

- Sidebar only appears on dashboard routes
- Visual design unchanged
- All dead code removed
- Theme uses canonical tokens only
- Components under 300 lines
- Clear separation of concerns
