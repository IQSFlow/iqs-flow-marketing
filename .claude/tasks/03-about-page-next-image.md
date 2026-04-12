# Task: Swap raw img tag to next/image on about page

**Branch:** claude/about-next-image
Do NOT stop to ask questions.
When done, run /check-tasks.

## Context

`src/app/about/page.tsx` uses `<img src="/joshua-hinton.jpg">` with an eslint-disable comment. This should use `next/image` for automatic optimization, lazy loading, and better LCP.

## Actions

Replace:
```tsx
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/joshua-hinton.jpg" alt="Joshua Hinton" ... />
```

With:
```tsx
import Image from "next/image";

<Image
  src="/joshua-hinton.jpg"
  alt="Joshua Hinton, Founder and CEO of IQS Flow"
  width={200}
  height={200}
  style={{ borderRadius: "50%", objectFit: "cover" }}
/>
```

Adjust width/height to match the current rendered size. Remove the eslint-disable comment.

## Verify

- `npm run build` clean (no eslint warnings about img)
- Image renders correctly on `/about`

## Completion

- `.done.md` with file changed
