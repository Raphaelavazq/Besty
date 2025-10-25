# Z-Index Hierarchy

To prevent overlapping issues, we maintain a strict z-index hierarchy across the application.

## Z-Index Layers (Low to High)

| Layer              | Z-Index          | Usage                                   | Components                                                                |
| ------------------ | ---------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| **Content**        | `z-0` to `z-10`  | Main page content, cards, images        | Default content layers                                                    |
| **Sticky Headers** | `z-10` to `z-20` | Sticky navigation bars, theme galleries | DialogueCatalogPage, BildBeschreibenDetail, DialogueTrainer, HoerenPlayer |
| **Overlays**       | `z-[80]`         | Modal overlays, sidebar backdrops       | Mobile menu overlays                                                      |
| **Sidebars**       | `z-[90]`         | Navigation sidebars (mobile)            | BareShell, DashboardShell, HoverSidebarShell                              |
| **Menu Button**    | `z-[100]`        | Hamburger menu button (mobile)          | All layout shells                                                         |

## Critical Rules

1. **Hamburger menu button**: ALWAYS `z-[100]` - highest priority
2. **Mobile sidebars**: ALWAYS `z-[90]` - second highest
3. **Overlay backdrops**: ALWAYS `z-[80]` - third highest
4. **Sticky elements**: MAX `z-20` - should never exceed this
5. **Regular content**: MAX `z-10` - keep content below UI chrome

## Components Updated (22 Oct 2025)

- ✅ `BareShell.jsx` - Hamburger `z-[100]`, Sidebar `z-[90]`, Overlay `z-[80]`
- ✅ `DashboardShell.jsx` - Hamburger `z-[100]`, Sidebar `z-[90]`, Overlay `z-[80]`
- ✅ `HoverSidebarShell.jsx` - Hamburger `z-[100]`, Sidebar `z-[90]`, Overlay `z-[80]`

## Why This Matters

Without proper z-index hierarchy, sticky page elements (headers, navigation) can overlap the hamburger menu button, making navigation impossible on mobile devices. By using `z-[100]` for the menu button, we ensure it's always clickable regardless of page scroll position or sticky elements.

## Testing Checklist

When adding new sticky/fixed elements:

- [ ] Does it use `z-20` or lower?
- [ ] Does it conflict with hamburger menu on mobile?
- [ ] Does it work correctly when scrolling?
- [ ] Does overlay backdrop cover it properly when sidebar is open?
