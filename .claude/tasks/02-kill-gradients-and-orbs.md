# Task: Kill gradients and purple, redesign background dots as worker movement

**Branch:** claude/marketing-refresh (same branch)
Do NOT stop to ask questions.
When done, run /check-tasks.

## Context

Kill AI aesthetic markers (purple, gradient text, gradient buttons). But KEEP the animated background dots on dark sections - redesign them to represent worker movement through facility corridors. The dots are intentional brand animation, not random decoration.

## Actions

### 1. Kill blue-to-purple gradient

```bash
rg "linear-gradient.*#2980b9.*#7c3aed|linear-gradient.*#7c3aed|#7c3aed" src/
```

Replace ALL with solid `#1d4ed8`.

### 2. Kill gradient text effects

```bash
rg "background-clip.*text|webkitBackgroundClip|WebkitBackgroundClip|-webkit-background-clip" src/
```

Replace with plain `color: #0f172a` or `color: #1d4ed8`. Remove `background`, `backgroundClip`, and `WebkitTextFillColor` properties.

### 3. Redesign background dots as worker movement

Find existing floating dot/orb animations:
```bash
rg "keyframes.*float|animate.*float|radial-gradient.*absolute" src/
rg "animation.*float|animation.*pulse|animation.*glow" src/
```

**Do NOT delete them.** Instead, redesign:

**Colors:** Replace any purple/indigo orbs with navy palette:
- Large dots: `rgba(29, 78, 216, 0.08)` (navy at 8% opacity)
- Medium dots: `rgba(59, 130, 246, 0.06)` (blue at 6%)
- Small dots: `rgba(96, 165, 250, 0.05)` (light blue at 5%)

**Motion:** Replace random float with purposeful horizontal movement (workers walking corridors):
- Primary direction: **left to right** (like workers moving through a terminal)
- Speed: slow and steady, 20-40 second cycles
- Easing: `ease-in-out` (not linear, not bounce)
- Some dots move at different speeds (parallax depth effect)
- A few dots move diagonally (workers crossing between zones)

**Pattern:**
```css
@keyframes workerPath {
  0% { transform: translateX(-100px) translateY(0); opacity: 0; }
  10% { opacity: 0.08; }
  90% { opacity: 0.08; }
  100% { transform: translateX(calc(100vw + 100px)) translateY(-20px); opacity: 0; }
}

@keyframes workerPathDiag {
  0% { transform: translate(-80px, 40px); opacity: 0; }
  10% { opacity: 0.06; }
  90% { opacity: 0.06; }
  100% { transform: translate(calc(100vw + 80px), -60px); opacity: 0; }
}
```

**Dot sizes:** Vary between 4px, 6px, 8px, 12px (workers at different distances). NOT the large 200-400px radial gradient blobs. Small, purposeful dots.

**Quantity:** 8-12 dots per section. Not overwhelming.

**Reduced motion:** Respect `prefers-reduced-motion: reduce` - stop all animation:
```css
@media (prefers-reduced-motion: reduce) {
  .worker-dot { animation: none; opacity: 0.04; }
}
```

### 4. Kill all remaining purple

```bash
rg "#7c3aed|#6d28d9|#8b5cf6|#a78bfa|#ede9fe" src/
```

Replace: `#7c3aed` -> `#1d4ed8`, `#6d28d9` -> `#1e40af`, `#8b5cf6` -> `#3b82f6`, `#a78bfa` -> `#60a5fa`, `#ede9fe` -> `#eff6ff`

### 5. Kill gradient buttons

Any button with `linear-gradient` -> solid `#1d4ed8` bg, `#1e40af` hover.

### 6. Fix the old blue primary

```bash
rg "#2980b9" src/
```
Replace with `#1d4ed8`.

## Verify

1. `npm run build` - clean
2. `rg "#7c3aed" src/` returns zero
3. `rg "#2980b9" src/` returns zero
4. `rg "background-clip.*text" src/` returns zero
5. Dark sections have small navy dots moving left-to-right (not large floating orbs)
6. Dots are subtle (opacity 0.05-0.08), not attention-grabbing
7. `prefers-reduced-motion` respected
8. No gradient buttons remain
