# Task: Add metadata exports to contact, resources, and features/ai pages

**Branch:** claude/metadata-fixes
Do NOT stop to ask questions.
When done, run /check-tasks.

## Context

The site audit found 3 pages missing `metadata` exports (title + description for SEO). Every other page has them.

## Actions

Add `export const metadata` to each:

### `src/app/contact/page.tsx`
```typescript
export const metadata = {
  title: "Contact Us",
  description: "Get in touch with IQS Flow. Questions about operations intelligence, onboarding, or partnerships.",
};
```

### `src/app/resources/page.tsx`
```typescript
export const metadata = {
  title: "Resources",
  description: "Guides, assessments, and tools to improve your operations quality and vendor management.",
};
```

### `src/app/features/ai/page.tsx`
```typescript
export const metadata = {
  title: "AI-Powered Operations",
  description: "How IQS Flow uses AI for smart scheduling, anomaly detection, predictive maintenance, and automated reporting.",
};
```

Do NOT use em dashes in descriptions. Do NOT mention "facilities" -- use "operations" or "sites".

## Verify

- `npm run build` clean
- Each page's `<title>` renders in the browser tab

## Completion

- Branch `claude/metadata-fixes`
- `.done.md` listing the 3 files changed
