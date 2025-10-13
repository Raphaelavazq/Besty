# Navigation Audit - October 13, 2025

## Current Navigation Structure

### Pages WITH Sidebar (DashboardShell)

These pages have the full purple sidebar visible on desktop, hamburger menu on mobile:

1. ✅ `/dashboard` - Dashboard (has DashboardShell built-in)
2. ✅ `/tests` - Test hub
3. ✅ `/tests/hoeren` - Hören hub
4. ✅ `/tests/hoeren/training` - Random training
5. ✅ `/tests/hoeren/uebung/:teil` - Practice with feedback
6. ✅ `/tests/hoeren/pruefung/:testId` - Timed test
7. ✅ `/tests/hoeren/pruefung` - Timed test
8. ✅ `/section/:sectionId` - Section view
9. ✅ `/theme/:themeId` - Theme view
10. ✅ `/content/:contentId` - Content detail
11. ✅ `/bookmarks` - Bookmarks

### Pages WITHOUT Sidebar (BareShell)

These pages only have a hamburger menu, no persistent sidebar:

1. ❌ `/tests/lesen` - Reading (coming soon)
2. ❌ `/tests/schreiben` - Writing (coming soon)
3. ❌ `/tests/sprechen` - Speaking (coming soon)
4. ❌ `/about` - About page
5. ❌ `/study` - Study mode (coming soon)
6. ❌ `/progress` - Progress tracking (coming soon)
7. ❌ `/achievements` - Achievements (coming soon)
8. ❌ `/profile` - Profile (coming soon)
9. ❌ `/settings` - Settings (coming soon)

### Pages WITHOUT ANY Layout

1. ⭕ `/` - Hero landing page

---

## User Request

> "I want the sidebar from the dashboard that also appears on mobile, on hover when from the side"

### Interpretation

User wants:

1. **Hover-activated sidebar** on ALL pages (except hero)
2. Sidebar should slide out from left edge on hover
3. Works on both desktop AND mobile
4. Same purple sidebar design from dashboard

---

## Recommended Solution

### Create new `HoverSidebarShell` component:

- Thin activation strip on left edge (10px width)
- On hover: sidebar slides out from left
- Same purple gradient design as DashboardShell
- Same navigation items
- Works on all screen sizes

### Apply to:

- ✅ All test execution pages (pruefung, training, uebung)
- ✅ All hub/navigation pages
- ✅ All content pages
- ❌ Hero page only (keep as-is)

---

## Current Navigation Patterns in Test Pages

### HoerenPruefung.jsx

```jsx
// Has back button with confirmation
const handleBackClick = () => {
  if (testStarted && !testComplete) {
    const confirmed = window.confirm(
      "Möchten Sie wirklich abbrechen? Ihr Fortschritt geht verloren."
    );
    if (confirmed) navigate("/tests/hoeren");
  } else {
    navigate("/tests/hoeren");
  }
};
```

### HoerenUebung.jsx

```jsx
// Simple back button
<button onClick={() => navigate("/tests/hoeren")}>
  <ArrowLeft className="w-5 h-5" />
  Zurück
</button>
```

### HoerenTraining.jsx

```jsx
// Simple back button
onClick={() => navigate('/tests/hoeren')}
```

---

## Implementation Plan

1. **Create `HoverSidebarShell.jsx`**
   - Hover activation strip (left edge)
   - Slide-out sidebar animation
   - Purple gradient design
   - Navigation items with active state

2. **Replace layouts in App.jsx**
   - All pages (except `/`) use `HoverSidebarShell`
   - Remove distinction between DashboardShell and BareShell

3. **Test on mobile**
   - Ensure hover works with touch (tap to open)
   - Verify slide animation is smooth
   - Check doesn't interfere with test interactions

---

## Design Specs

### Activation Strip

- Width: 10px
- Position: Fixed left edge
- Height: 100vh
- z-index: 40
- Invisible on desktop, subtle indicator on mobile

### Sidebar

- Width: 256px (w-64)
- Background: `from-purple-600 via-purple-700 to-indigo-700`
- Animation: `translate-x` transition 300ms
- Default: `translate-x-[-256px]`
- On hover: `translate-x-0`

### Navigation Items

Same as DashboardShell:

- Dashboard
- Tests
- Study
- Progress
- Bookmarks
- Achievements
- Profile
- About
- Settings

---

## Benefits

1. ✅ Consistent navigation everywhere
2. ✅ Non-intrusive (only shows on hover)
3. ✅ Quick access to dashboard from any page
4. ✅ Better UX for mobile users
5. ✅ Maintains focus on test content
