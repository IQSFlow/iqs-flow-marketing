# Done: Premium Design Pass

**Branch:** `claude/premium-design`
**Status:** Complete, build passes

## What was done

### Homepage (`HomepageSections.tsx`)
- **Floating dots restored:** 8 animated circles with varying sizes (4-12px), opacity (0.04-0.08), and drift animations (15-30s durations) in hero and problem sections
- **Problem eyebrow:** Changed from "The Problem" to "The Trust Gap"
- **Hero right cards:** Wrapped in browser-frame mockup (traffic-light dots, URL bar showing app.iqsflow.com), cards have box shadows, staggered X offsets, left-border accent colors (blue/green/violet), hover lift
- **Problem cards:** Hover effect with translateY(-4px) and transition
- **Industry tabs:** Per-industry gradient overlays on stat blocks (blue/violet/amber/green/indigo tints at 3-5% opacity), crossfade animation on tab switch
- **StatsCTA:** Background changed to gradient (135deg, navy tones)

### Features Page (`features/page.tsx`)
- **Browser frame mockups:** Each feature image wrapped in a browser chrome container with traffic-light dots and feature-specific URL
- **AI section prominence:** Heading enlarged to clamp(32px, 4vw, 48px), cards have CSS hover lift effects
- **Section numbers:** Large faded background numbers (01-06) at 120px, opacity 0.03, alternating left/right positioning

### Pricing Page (`pricing/page.tsx`)
- **Professional plan highlight:** scale(1.03), elevated shadow with blue glow, 3px blue top border
- **Compare toggle:** Native details/summary element wrapping comparison table, rotating chevron
- **Pilot CTA:** Dark section with "Limited Availability" pill badge, gradient border button, radial gradient orbs
- **Card hover effects:** All cards lift on hover with differentiated effects for highlight card

### Industries Page (`industries/page.tsx`)
- **Per-industry color accents:** Subtle left borders and gradient backgrounds per industry
- **Prominent quotes:** Decorative quotation marks, larger font, clear attribution
- **Hover effects:** Card lift on hover via CSS
- **Cleanup:** Removed unused ClipboardCheck import

## Not done (noted for future)
- Real product screenshots (placeholders/mockups used instead)
- Stock photo integration (existing Unsplash photos retained)
- The formal /audit, /critique, /typeset skill passes were not run as separate steps; improvements were applied directly

## Verification
- `npm run build` succeeds (24 static pages)
- No TypeScript errors
- No em dashes in copy
- No fabricated claims
