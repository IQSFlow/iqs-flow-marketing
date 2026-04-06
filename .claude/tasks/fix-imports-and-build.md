# Fix imports and get marketing site building

Work on main branch. Do NOT deploy.

If something is unclear, make the safe choice and note it in your commit message. Do NOT stop to ask questions.

The repo has been scaffolded with files copied from iqs-flow-web. Many files still have auth imports and portal dependencies that need to be removed.

## Step 1: Fix page.tsx (homepage)

Remove ALL auth imports and logic from `src/app/page.tsx`:
- Remove `import { getSession } from "@/lib/api-server"`
- Remove `import { redirect } from "next/navigation"`
- Remove the `getSession()` call and all role-based redirect logic
- Keep all the marketing content rendering
- Add a "Sign In" link pointing to `https://app.iqsflow.com/login`

## Step 2: Fix MarketingNav.tsx

In `src/components/MarketingNav.tsx`:
- Change any "Sign In" / "Dashboard" / "Login" link to point to `https://app.iqsflow.com/login`
- Remove any `getSession` or auth-related imports
- Remove any conditional rendering based on session state

## Step 3: Fix all other pages

Go through every file in `src/app/` and `src/components/`:
- Remove any `import` of `api-server`, `api-client`, `getSession`, `apiServer`, `apiClient`
- Remove any `import` of `permissions`, `i18n`, `locale-context`, `sse-context`, `auth`
- Remove any `import` of Sidebar, TenantSwitcher, NotificationBell, SearchBar, TranslatedSidebar
- If a component conditionally renders based on `session`, remove that logic and always render the public version

## Step 4: Fix lib files

Check `src/lib/constants.ts` and `src/lib/design-tokens.ts`:
- Remove any React import if it causes issues (design-tokens.ts uses `React.CSSProperties` - add `import type React from "react"` if needed)
- These files should have no server-side imports

## Step 5: Build

```bash
npm run build
```

Fix errors iteratively until clean build. Common issues:
- Missing type imports (add them)
- References to deleted components (remove the import and usage)
- `React` not defined (add import)

## Step 6: Commit

```bash
git add -A
git commit -m "fix: remove auth dependencies, clean build for standalone marketing site"
```

## When done

Write `.claude/tasks/fix-imports-and-build.done.md` with files changed and build result.
