# design-iteration-and-truthful-copy — Done

## Branch

`claude/design-iteration`

## Files changed

### Modified
- `src/app/HomepageSections.tsx` — removed all false stats, fake testimonials; replaced metrics panel with capability badges; imported colors from design-tokens
- `src/app/industries/page.tsx` — removed all fake stats (45%, 38%, 98%, 30%) and fabricated testimonials; replaced with founder quotes and capability labels
- `src/lib/design-tokens.ts` — added marketing.ink scale, marketing.typography, marketing.sections brand pairings, heroGradient; reorganized into 5 sections

## Part 1: False claims removed

| Location | Old (false) | New (honest) |
|---|---|---|
| Hero metrics panel | "500+ Facilities managed" | Capability badge: "Multi-vendor visibility" |
| Hero metrics panel | "98% Compliance pass rate" | Capability badge: "Real-time inspections" |
| Hero metrics panel | "30% Average cost reduction" | Capability badge: "Compliance automation" |
| Industry: Airlines | "400+ Gates tracked daily" | "Gate-level Tracking & verification" |
| Industry: Airports | "99% Inspection coverage" | "Zone-by-zone Inspections & scoring" |
| Industry: Corporate | "30% Average cost reduction" | "Scorecard Vendor analytics" |
| Industry: Healthcare | "99.2% Audit pass rate" | "JCAHO-ready Compliance tracking" |
| Bottom stats | "500+ / 98% / 30%" | "4 portals / 6 frameworks / 3 verticals" |
| Social proof | "Multi-Site" | "4 Portals" |
| Industries page | "45% Increase in On-Time Cleaning" | "Gate-level task tracking" |
| Industries page | "38% Reduction in Cleaning Complaints" | "Cross-vendor dashboards" |
| Industries page | "98% Audit Readiness Rate" | "JCAHO-ready compliance" |
| Industries page | "30% Reduction in Vendor Costs" | "Vendor scorecard analytics" |

All 8 fake testimonials (attributed to "VP Operations, Major US Airline", "Director of Operations, Major US Airport", "COO, Fortune 500 Real Estate Portfolio", "Director of Environmental Services, Regional Health System", etc.) replaced with Venice Collier (CEO & Founder) quotes.

## Part 2: Design system updates

### design-tokens.ts structure
1. `colors` — shared color values (portal, text, border, bg, status, priority, role, semantic)
2. `tokens` — portal-specific tokens (sidebar, accent per role, spacing, typography, shadows)
3. `marketing` — ink scale, accent colors, section pairings (trust/problem/solution/cta), heroGradient, typography (heroTitle, sectionTitle, sectionSubtitle, cardTitle, eyebrow), card style
4. `spacing`, `radius`, `fontSize`, `fontWeight`, `shadows` — shared scales
5. `TRANSITION`, `animations`, `focusRing()` — utilities

### HomepageSections changes
- Imports `marketing` from `@/lib/design-tokens` instead of defining local `ink`/`accent` constants
- Hero right panel: dark metrics box replaced with 3 icon+text capability badges (Users, Shield, Radio icons)

## Verification

```
npm run build — All 23 routes built cleanly (static + SSG)
No false stats, fake testimonials, or unverifiable claims remain
grep confirms zero matches for: "500+ Facilities", "98% Compliance", "Fortune 500", "Major US Airline", etc.
```
