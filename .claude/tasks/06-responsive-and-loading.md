# Task: Fix responsive layout and add loading states

**Branch:** claude/marketing-refresh (same branch)
Do NOT stop to ask questions.
When done, run /check-tasks.

## Context

Final pass. Mobile was reported as broken. No loading states on dynamic content.

## Actions

### 1. Test every page at 375px, 390px, 768px, 1024px

Pages: `/`, `/features`, `/pricing`, `/industries`, `/about`, `/contact`, `/why-iqs`

Fix for each:
- No horizontal scroll
- Text doesn't overflow
- Images scale (max-width: 100%)
- Touch targets 44px+ on buttons/links
- Grids collapse to single column on mobile
- Nav accessible on mobile (hamburger or collapsible)
- Body font 16px+ (prevents iOS auto-zoom)
- Spacing adapts (no desktop padding on mobile)

### 2. Fix grid breakpoints

Any grid with 3+ columns needs mobile handling:
```bash
rg "gridTemplateColumns.*repeat\(3|gridTemplateColumns.*repeat\(4" src/
```

Use `auto-fill, minmax(300px, 1fr)` pattern or add media queries in `globals.css`.

### 3. Add loading states for forms

- Contact form: disable submit + spinner during send
- Assessment form: progress indicator
- Static pages don't need skeletons (SSR)

### 4. Verify hero/images scale on mobile

Ensure CSS mockup, feature images, founder photos all fit narrow screens.

## Verify

1. `npm run build` - clean
2. No horizontal scroll at 375px on any page
3. All touch targets 44px+
4. All grids collapse on mobile
5. Forms show loading state during submit
