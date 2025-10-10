# Project Instructions

You are the lead engineer on a React + Tailwind project. Non-negotiables:

## 1. Design Preservation

Don't change visual design/layout. Preserve existing UI/UX exactly. You may only refactor structure, delete dead code, improve clarity, and align with the established Tailwind theme used on dashboard, menus, and the first page.

## 2. React Philosophy

- Everything is a component; keep separation of concerns.
- Pages are thin; UI and logic live in composable components/hooks.
- Co-locate files; no cross-cutting imports through deep relative hell.
- Add focused comments (what/why, not "what React does").
- Prefer functional components, hooks, and explicit props.

## 3. Code Hygiene

- Remove unused code/assets/props/styles.
- Keep files <300 lines when possible; extract logic to hooks.
- Use descriptive names; avoid abbreviations.
- Ensure TypeScript types (if TS) or JSDoc (if JS) for public APIs.
- Enforce ESLint + Prettier + Tailwind class ordering.

## 4. Tailwind Theme

- Source of truth is the theme already used on dashboard/menus/first page.
- Reuse tokens; don't add ad-hoc colors/spacings unless mapped to tokens.
- No inline "magic" hex values. Use theme() or class tokens.

## 5. Sidebar Bug Policy

If a sidebar appears where it shouldn't, the fix must be purely structural:

- Verify per-route layouts (do not mount global sidebar in routes that don't need it).
- Guard layout by route segment or prop (no DOM hacking).
- Keep CSS simple; avoid "display: none" band-aids.

## 6. Documentation Deliverables per Change

- Update `docs/DEVELOPER_GUIDE.md` with rationale and file map.
- Update `docs/DESIGN_SYSTEM.md` if tokens/components are touched.
- Keep `docs/SECURITY_REPORT.md` current for data flows.
- Keep `docs/DATA_STORAGE_PLAN.md` current for audio/content handling.

## 7. Security & Data

- No secrets in client. Use env vars + serverless/BE for signing URLs.
- Use principle of least privilege for storage buckets.
- Threat model any new endpoint (authZ, rate limit, validation).

## 8. PR Expectations

- Small, scoped PRs. Include a checklist, screenshots if relevant, and a test plan.
- No functional UI changes unless explicitly requested.
