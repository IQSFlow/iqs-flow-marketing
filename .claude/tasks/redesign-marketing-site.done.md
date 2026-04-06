# redesign-marketing-site — Done

## Branch

`claude/redesign-marketing`

## Design System

**Aesthetic direction:** Refined editorial (Bloomberg/McKinsey tone, not generic SaaS template)

Key design decisions:
- **Left-aligned heroes** with eyebrow text replacing centered-everything layouts
- **Ink color palette** (navy tones from #0a0f1a to #f8fafc) replacing arbitrary grays
- **Single accent color** (#2563eb) used sparingly, no blue-purple gradients
- **Dark CTA sections** (#0a0f1a) replacing generic blue gradient CTAs
- **borderRadius: 10** max for cards (was 16-20)
- **Golden ratio (PHI = 1.618)** for vertical spacing relationships
- **Asymmetric layouts** (3:2, 1:2 splits) replacing centered-everything
- **Numbers-first** social proof (stat + label inline) replacing icon-centered cards
- **Lucide React icons** replacing all HTML entities and emoji icons
- **No em dashes** in copy, "operations" instead of "facilities" where appropriate

## Pages redesigned (13 total)

### 1. Homepage (/)
- Hero: left-aligned 3:2 grid with dark metrics panel
- Social proof: numbers-first strip
- Problem section: left-aligned header, dominant first card, numbered items
- Platform section: split header (headline left, description right)
- How it works: centered timeline with connecting line
- Industry solutions: underline tabs, 3:2 content split, border-left quotes
- CTA: white stats on dark, simplified buttons

### 2. About (/about)
- Asymmetric mission grid (1:2 split)
- Lucide icons replacing HTML entities
- Values as borderTop-divided items, not boxed cards
- Leadership as horizontal cards with inline photos

### 3. Features (/features)
- Clean left-aligned hero (removed dark gradient + DM Sans import)
- Alternating dark/light photo sections preserved
- Photo borderRadius: 10
- Dark CTA replacing blue gradient

### 4. Pricing (/pricing)
- Left-aligned hero
- Left-aligned "Most Popular" badge
- Consistent card styling, dark CTA

### 5. Industries (/industries)
- Left-aligned hero replacing dark blue gradient
- Emoji icons replaced with Lucide (MapPin, CheckSquare, BarChart3, etc.)
- Dark CTA section

### 6. Why IQS (/why-iqs)
- Left-aligned hero with eyebrow text
- Removed blue gradient background
- Dark CTA section

### 7. Contact (/contact)
- Left-aligned hero, no gradient text
- Numbered steps as inline flex items (01, 02, 03)
- 3:2 form-to-sidebar layout

### 8. Developers (/developers)
- Left-aligned hero
- Consistent ink palette
- Simplified card styling

### 9. Resources (/resources)
- Left-aligned hero
- Cleaner blog listing layout

### 10. Blog Post (/resources/[slug])
- Cleaner post template with consistent typography

### 11-13. Privacy, Terms, Security
- Left-aligned heroes
- Consistent styling throughout
- Dark CTA sections

## Screenshots

Before/after screenshots saved to `screenshots/` directory:
- `homepage-before.png` / `homepage-after.png`
- `about-before.png` / `about-after.png`
- `features-before.png` / `features-after.png`
- `pricing-before.png` / `pricing-after.png`
- `industries-before.png` / `industries-after.png`
- `why-iqs-before.png` / `why-iqs-after.png`
- `contact-before.png` / `contact-after.png`
- `developers-before.png` / `developers-after.png`
- `resources-before.png` / `resources-after.png`
- `privacy-before.png` / `privacy-after.png`
- `terms-before.png` / `terms-after.png`
- `security-before.png` / `security-after.png`

## Build result

```
All 23 routes built cleanly (static + SSG).
No TypeScript errors, no build warnings.
```
