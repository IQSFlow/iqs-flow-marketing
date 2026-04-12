# Task: Break the identical section cadence across all pages

**Branch:** claude/marketing-refresh (same branch)
Do NOT stop to ask questions.
When done, run /check-tasks.

## Problem

Every page follows: uppercase-small-blue-badge -> big-bold-headline -> gray-subtitle -> 3-column grid. This reads as template-generated.

## Actions

### 1. Audit every section

List sections per page and their current pattern:
- `src/app/page.tsx` / `src/app/HomepageSections.tsx`
- `src/app/features/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/industries/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`

### 2. Vary at least 3 sections per page

Use these alternatives to break the pattern:

**Full-width pull quote** (use Source Serif 4):
- 24-28px serif text, centered, quote marks or vertical line accent
- Good for founder quotes, value propositions

**2-column asymmetric (60/40 or 70/30):**
- One large content area + one narrow sidebar with stats or visual
- Good for feature deep-dives

**Horizontal timeline:**
- Connected steps with lines + node icons instead of numbered card grid
- Good for "How It Works"

**Large testimonial block:**
- Full-width, photo on one side, large serif quote on the other
- Venice Collier with her real photo from /about

**Inline stats (not cards):**
- "12 airports. 2,000+ inspections. 94% compliance."
- Plain text, large, no card wrapping each number

**Alternating left/right:**
- Image-left/text-right alternating with text-left/image-right

### 3. Keep these patterns as-is

- Hero section badge+headline (works for page tops)
- Tab-based industry selector on /industries
- Pricing tier cards (expected pattern)
- Contact form layout

### 4. Do NOT

- Add decorative SVG illustrations (reads as AI)
- Add gradient section backgrounds
- Add bounce/elastic animations
- Use emojis as section icons

## Verify

1. `npm run build` - clean
2. No two consecutive sections use the same layout pattern
3. At least one serif pull quote per page
4. No horizontal scroll on mobile
