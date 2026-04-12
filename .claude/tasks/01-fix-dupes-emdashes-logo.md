# Task: Fix duplicate quotes, em dashes, footer logo, nav logo size

**Branch:** main (direct commit, quick fixes)
Do NOT stop to ask questions.
When done, run /check-tasks.

## Actions

### 1. Deduplicate Venice Collier quotes

She appears 3 times on the homepage. Keep ONLY the large testimonial block with her circular photo. Delete:
- The dark section pull quote ("We built IQS Flow because we ran the programs ourselves...")
- The co-founders quote at the bottom

Replace the deleted co-founders section with a Joshua Hinton quote:
- "We built IQS Flow on multi-tenant isolation because every client's quality data is sensitive. Your vendors never see each other's scores."
- Attribution: "Joshua Hinton, COO & Co-Founder"
- No photo needed, text-only quote in serif font

### 2. Kill ALL em dashes

```bash
rg "—" src/
```

Replace every em dash with a regular dash or rewrite the sentence. Examples:
- "not a vendor's word for it — " -> "not a vendor's word for it - "
- "no per-vendor add-ons — no hidden fees" -> "no per-vendor add-ons, no hidden fees"

ZERO em dashes should remain anywhere in the codebase.

### 3. Fix footer logo

The logo PNG shows as a white square on the dark footer background. Fix by either:
- Adding `style={{ filter: 'brightness(0) invert(1)' }}` to make it white on dark
- Or using a separate white-on-transparent logo variant

Check BOTH footer instances (homepage footer and any other page footers).

### 4. Enlarge nav logo

Change nav logo from `height={36}` (or whatever it is) to `height={44}`. The current size is too small for brand presence.

### 5. Final quote count

After fixing #1, verify the homepage has maximum 2 quotes total:
- One Venice Collier (with photo)
- One Joshua Hinton (text only)

No other blockquotes or testimonial sections on the homepage.

## Verify

1. `rg "—" src/` returns zero results
2. Footer logo visible on dark background
3. Nav logo visibly larger
4. Homepage has exactly 2 quotes (Venice + Joshua)
5. `npm run build` - clean
