# Task: Full marketing site audit using design skills and plugins

**Branch:** claude/marketing-audit
Do NOT stop to ask questions.
When done, run /check-tasks.

## Context

The marketing site at iqsflow.com has 15 pages. It just went through a refresh (DM Sans, navy palette, responsive fixes, em dash removal). This task runs a comprehensive audit using ALL available design skills, then fixes what it finds.

## REQUIRED: Use these skills in order

### Phase 1: Design Critique + UX Heuristics

Run `/critique` on the homepage first. Then run `/wl-ux-heuristics` to score against Nielsen's 10. These two give the baseline.

Pages to critique (run `/critique` on each, or batch the top 5):
1. `/` (homepage) -- most important
2. `/features`
3. `/pricing`
4. `/industries`
5. `/about`

Then run `/wl-refactoring-ui` on any page that scores below 3/4 on visual hierarchy.

### Phase 2: Typography Audit

Run `/typeset` across the site. Check:
- DM Sans is loaded and rendering (not system font fallback)
- Heading hierarchy is consistent (h1 > h2 > h3, no skips)
- Body text is 16-18px with 1.5-1.7 line height
- No em dashes anywhere (per memory rule -- use hyphens or rewrite)
- Letter spacing on headings is intentional (-0.02em to -0.04em)

Run `/wl-web-typography` if font pairing or type scale needs work.

### Phase 3: Layout + Spacing

Run `/arrange` on any page with layout issues found in Phase 1. Fix:
- Section rhythm (alternating backgrounds)
- Consistent spacing between sections
- Card grid alignment
- CTA placement and visual weight

### Phase 4: Visual Polish

Run `/polish` as a final pass on every page. This catches:
- Alignment issues (off-by-1px problems)
- Inconsistent border radius
- Shadow consistency
- Color consistency (all navy, no stray purples)
- Icon sizing consistency

### Phase 5: Accessibility

Run `/a11y` on the homepage and pricing page (the two most visited). Check:
- Color contrast (WCAG AA minimum)
- Alt text on images
- Keyboard navigation works
- Focus indicators visible
- Screen reader landmarks

### Phase 6: Performance

Run `/perf` or `/optimize` on the site. Check:
- Images use `next/image` (not raw `<img>`)
- No oversized images (check Network tab)
- Bundle size reasonable
- No layout shift (CLS)
- Fonts preloaded

### Phase 7: Copy Audit (Wisdom Library)

Run `/wl-storybrand-messaging` on the homepage hero and CTA sections. Check:
- Is the customer the hero (not IQS Flow)?
- Is there a clear problem statement?
- Is the CTA specific and action-oriented?

Run `/wl-obviously-awesome` on the `/features` page. Check:
- Is the positioning clear? (operations intelligence, not "facilities management")
- Are competitive alternatives acknowledged without naming competitors?
- Is the "only we do this" claim credible?

Run `/wl-made-to-stick` on key headlines. Are they:
- Simple (one core idea)?
- Unexpected (break a pattern)?
- Concrete (specific, not abstract)?
- Credible (evidence or authority)?

### Phase 8: Content Rules (from memory)

Check EVERY page for violations:
- [ ] No em dashes (feedback_no_em_dashes) -- search: `rg "—" src/`
- [ ] "Operations" not "facilities" (feedback_marketing_positioning)
- [ ] No pricing numbers on the site (feedback_marketing_positioning)
- [ ] No competitor names mentioned by name
- [ ] Joshua Hinton founder quote removed (was deleted in commit cb67b4b, verify gone)
- [ ] No placeholder text (Lorem ipsum, TBD, TODO)
- [ ] No duplicate sections

### Phase 9: Link + SEO Audit

```bash
# Find all links
rg 'href="[^"]*"' src/ --glob "*.tsx" -o -N | sort -u
```

Check:
- All internal links resolve to real pages
- All external links are live (not 404)
- `app.iqsflow.com` login/signup links work
- Every page has `<title>` and `<meta description>`
- Homepage has OG tags (og:title, og:description, og:image)
- Favicon loads correctly

### Phase 10: Mobile Responsive

Run `/adapt` on any page that has issues at 375px width. Check every page:
- No horizontal scroll at 375px
- Nav collapses to hamburger
- Text doesn't overflow
- CTAs are 44px+ touch targets
- Pricing cards stack vertically
- Images scale properly

### Phase 11: Microinteractions

Run `/wl-microinteractions` on interactive elements:
- Nav hover states
- CTA button feedback (hover, active, focus)
- FAQ accordion open/close
- Pricing toggle animation
- Scroll-triggered animations (if any)
- Loading states

### Phase 12: Final Visual Pass

Run `/distill` if any page feels cluttered after fixes.
Run `/bolder` if any page feels flat or generic.
Run `/quieter` if any section is visually aggressive.

The goal: every page should feel intentional, not template-y.

## Fix Priority

- **P0**: Fix immediately (broken links, missing pages, crashes)
- **P1**: Fix in this task (copy violations, em dashes, accessibility failures)
- **P2**: Fix if time permits (typography tweaks, microinteraction polish)
- **P3**: Log for later (new sections, major redesigns)

## Mandatory Post-Completion

1. `npm run build` to verify
2. Run `/sp-verification-before-completion` before committing
3. Run `/commit` to commit with clear message

## Verify

- `npm run build` clean
- Every page loads without console errors
- No em dashes in any text (`rg "—" src/` returns 0)
- All nav/footer links resolve
- Mobile 375px has no horizontal scroll
- Homepage passes WCAG AA contrast
- `/critique` score improved from baseline

## Completion

- Branch `claude/marketing-audit`
- `.done.md` with:
  - Skills used and findings from each
  - Nielsen heuristic scores (before/after if applicable)
  - StoryBrand assessment of homepage
  - Pages fixed vs pages still needing work
  - P0/P1 issues fixed, P2/P3 logged
  - Accessibility score
  - Performance metrics
