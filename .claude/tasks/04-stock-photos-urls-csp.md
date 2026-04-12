# Task: Fix stock photo filenames, fake URLs, and CSP font blocking

**Branch:** claude/marketing-refresh (same branch)
Do NOT stop to ask questions.
When done, run /check-tasks.

## Actions

### 1. Rename Unsplash stock photos

```bash
rg -l "unsplash" src/ public/
find . -name "*unsplash*" -not -path "*/node_modules/*"
```

Rename files to descriptive names:
- `verne-ho-unsplash.jpg` -> `airport-terminal.jpg`
- `oskar-kadaksoo-unsplash.jpg` -> `airport-gate.jpg`
- etc.

Update ALL `<img>` src references to match new filenames.
Update any CSS `background-image: url()` references.

### 2. Fix or remove fake decorative URLs

Features page shows `app.iqsflow.com/work-orders` etc. as visual elements. If someone clicks/visits these, they'll 404.

For each fake URL:
- If the real route exists at `app.iqsflow.com`, make it a real link
- If not, remove the URL decoration entirely
- Replace with a descriptive label instead (e.g. "Work Order Management" not a URL)

### 3. Fix CSP blocking Google Material Symbols

Check the CSP configuration:
```bash
rg "Content-Security-Policy|style-src|font-src" src/
```

Look in `src/middleware.ts` or `next.config.*` for CSP headers.

**Option A:** Add Google Fonts to CSP:
- `style-src`: add `https://fonts.googleapis.com`
- `font-src`: add `https://fonts.gstatic.com`

**Option B:** If Material Symbols isn't actually used anywhere, remove the import:
```bash
rg "Material.Symbols|material-symbols" src/
```
If nothing uses it, remove the CSS import and skip the CSP change.

## Verify

1. `npm run build` - clean
2. No files with "unsplash" in the name: `find public/ -name "*unsplash*"` returns zero
3. No fake URLs in the source that would 404
4. No CSP warnings in browser console
