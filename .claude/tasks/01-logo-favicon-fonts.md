# Task: Replace logo, add favicon, load custom fonts

**Branch:** claude/marketing-refresh
**Blocked by:** @iqsflow/shared must publish with `BRAND_FONTS`. Before starting:
1. `npx google-artifactregistry-auth` (refresh npm auth for private registry)
2. `npm update @iqsflow/shared` (pull latest version)
3. Verify: `node -e "const s=require('@iqsflow/shared'); console.log(s.BRAND_FONTS);"` should print `{ sans: 'DM Sans', ... }`
4. If BRAND_FONTS is undefined, write `.blocked.md` and stop.
Import `BRAND_FONTS` from `@iqsflow/shared` to reference font names.
Do NOT stop to ask questions.
When done, run /check-tasks.

## Context

Marketing site audit scored 4.8/10. The #1 issue is no typographic identity (system fonts everywhere) and missing favicon. Logo files are already in `public/`.

## Actions

### 1. Wire up the logo

Files already in place:
- `public/logo.png` - full IQS Flow logo with wordmark (1344x768)
- `public/favicon.png` - eye icon only (512x512)

In the site header/nav, replace any text-only "IQS Flow" or old logo reference with:
```html
<img src="/logo.png" alt="IQS Flow" height="36" />
```

Also update the footer logo if one exists.

### 2. Add favicon

In `src/app/layout.tsx`, add metadata:
```typescript
export const metadata = {
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};
```

If there's an existing `favicon.ico` reference, replace it. The PNG works as favicon in all modern browsers.

### 3. Load custom fonts

Add via `next/font/google` in `src/app/layout.tsx`:

```typescript
import { DM_Sans, Source_Serif_4 } from "next/font/google";

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"] 
});
const sourceSerif = Source_Serif_4({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["400", "600"] 
});
```

Apply to body: `className={`${dmSans.variable} ${sourceSerif.variable}`}`

Update `globals.css`:
```css
body { font-family: var(--font-sans), system-ui, sans-serif; }
```

Use serif font for:
- Founder/testimonial quotes
- Pull quotes in content sections
- The tagline on the about page

DM Sans is clean, geometric, professional - similar to the logo's typeface but not overused like Inter.

### 4. Remove system font fallback reliance

Search for any inline `fontFamily` declarations:
```bash
rg "system-ui|apple-system|Segoe UI" src/
```
Replace with `var(--font-sans)` or remove (they'll inherit from body).

## Verify

1. `npm run build` - clean
2. Favicon shows in browser tab
3. Logo renders in nav bar
4. DM Sans renders on all body text
5. Source Serif renders on quotes/testimonials
6. No more system-ui as primary font
