// ═══════════════════════════════════════════════════════════════════════
// Design tokens — single source of truth for IQS Flow visual constants
// Shared across marketing site and web app portal
// Use inline React style objects with these values (no Tailwind/CSS modules)
// ═══════════════════════════════════════════════════════════════════════

import type React from "react";

// ─── 1. Colors ──────────────────────────────────────────────────────

export const colors = {
  // Brand (logo-derived)
  brand: "#0f2b4a",       // logo navy
  brandAccent: "#1d4ed8", // logo blue

  // Portal header/accent colors (one per role)
  portal: {
    admin: { bg: "#111", accent: "#1d4ed8" },       // violet
    dashboard: { bg: "#0f2b4a", accent: "#1d4ed8" }, // logo navy/blue
    worker: { bg: "#059669", accent: "#059669" },    // emerald
    client: { bg: "#0f2b4a", accent: "#0f2b4a" },    // logo navy
  },

  // Text hierarchy
  text: {
    primary: "#0f172a",
    secondary: "#374151",
    muted: "#64748b",
    placeholder: "#94a3b8",
    inverse: "#ffffff",
  },

  // Borders
  border: {
    light: "#e2e8f0",
    default: "#e5e7eb",
    dark: "#d1d5db",
    separator: "#f1f5f9",
  },

  // Backgrounds
  bg: {
    page: "#f8fafc",
    surface: "#ffffff",
    muted: "#f8f9fa",
    success: "#f0fdf4",
    subtle: "#f8f8f8",
    tableHeader: "#f8fafc",
  },

  // Status
  status: {
    open: { bg: "#fee2e2", color: "#b91c1c" },
    inProgress: { bg: "#dbeafe", color: "#1d4ed8" },
    blocked: { bg: "#fef3c7", color: "#b45309" },
    resolved: { bg: "#d1fae5", color: "#065f46" },
    closed: { bg: "#f3f4f6", color: "#374151" },
  },

  // Priority
  priority: {
    critical: { bg: "#fee2e2", color: "#b91c1c" },
    high: { bg: "#fef3c7", color: "#b45309" },
    medium: { bg: "#dbeafe", color: "#1d4ed8" },
    low: { bg: "#f3f4f6", color: "#374151" },
  },

  // Role badges
  role: {
    admin: { bg: "#eff6ff", color: "#1e40af" },
    manager: { bg: "#dbeafe", color: "#1d4ed8" },
    worker: { bg: "#d1fae5", color: "#065f46" },
    client: { bg: "#e0e7f0", color: "#0f2b4a" },
  },

  // Semantic
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
} as const;

// ─── 2. Unified tokens (portal-specific) ────────────────────────────

export const tokens = {
  colors: {
    sidebar: "#0f1729",
    brand: "#0f2b4a",       // logo navy -- the IQS Flow brand color
    brandAccent: "#1d4ed8", // logo blue -- lighter accent from logo swoosh
    accent: {
      admin: "#1d4ed8",   // violet -- system authority
      manager: "#1d4ed8", // logo blue -- leadership, oversight
      client: "#0f2b4a",  // logo navy -- executive, trust
      worker: "#059669",  // emerald -- action, field work
    },
    chart: {
      primary: "#0f2b4a",   // quality scores, primary trends
      secondary: "#0d9488", // compliance, secondary metrics
      tertiary: "#d97706",  // highlights, attention
      quaternary: "#64748b",// baselines
      positive: "#059669",  // improvements
      negative: "#e11d48",  // declines
    },
    surface: "#ffffff",
    surfaceMuted: "#f8fafc",
    border: "#e2e8f0",
    borderLight: "#f1f5f9",
    text: "#0f172a",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    success: "#059669",
    warning: "#d97706",
    error: "#dc2626",
    info: "#2563eb",
  },
  spacing: {
    page: 24,
    sectionGap: 24,
    cardPadding: 20,
    cardRadius: 12,
    chipRadius: 99,
  },
  typography: {
    pageTitle: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" } as const,
    sectionTitle: { fontSize: 16, fontWeight: 600 } as const,
    body: { fontSize: 14, lineHeight: 1.5 } as const,
    caption: { fontSize: 12, color: "#64748b" } as const,
    badge: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase" as const,
    } as const,
    metric: {
      fontSize: 36,
      fontWeight: 800,
      letterSpacing: "-1.5px",
      lineHeight: 1,
    } as const,
  },
  shadows: {
    card: "0 1px 3px rgba(0,0,0,0.06)",
    cardHover: "0 4px 12px rgba(0,0,0,0.08)",
    cardElevated: "0 8px 25px -5px rgba(0,0,0,0.1), 0 4px 10px -5px rgba(0,0,0,0.04)",
    dropdown: "0 4px 16px rgba(0,0,0,0.12)",
  },
} as const;

// ─── 3. Marketing / landing page tokens ─────────────────────────────

export const marketing = {
  // Ink scale: navy-based neutrals used across all marketing pages
  ink: {
    900: "#0a0f1a",
    800: "#0f172a",
    700: "#1e293b",
    600: "#334155",
    500: "#475569",
    400: "#64748b",
    300: "#94a3b8",
    200: "#cbd5e1",
    100: "#e2e8f0",
    50: "#f1f5f9",
    25: "#f8fafc",
  },

  // Primary accent (logo-derived)
  accent: "#1d4ed8",      // logo blue
  accentDark: "#0f2b4a",  // logo navy
  accentLight: "#dbeafe",

  // Section-specific color pairings
  sections: {
    // "Trust" sections: blue accent + green checks
    trust: { accent: "#2563eb", check: "#059669" },
    // "Problem" sections: dark ink + red/amber warnings
    problem: { bg: "#0a0f1a", accent: "#ef4444", warning: "#f59e0b" },
    // "Solution" sections: white + blue + green
    solution: { bg: "#ffffff", accent: "#2563eb", success: "#059669" },
    // Dark CTA sections
    cta: { bg: "#0a0f1a", text: "#f8fafc", muted: "#64748b" },
  },

  // Hero gradient: subtle radial from white to light blue tint
  heroGradient: "radial-gradient(ellipse 80% 60% at 50% 0%, #f0f4ff 0%, #ffffff 70%)",

  colors: {
    heroBg: "#ffffff",
    sectionAlt: "#f8fafc",
    heading: "#0f172a",
    body: "#475569",
    muted: "#64748b",
    accent: "#2563eb",
    accentLight: "#60a5fa",
    checkGreen: "#059669",
    border: "#e2e8f0",
    badgeBg: "#dbeafe",
    badgeText: "#2563eb",
  },

  // Typography scale for marketing pages
  typography: {
    heroTitle: {
      fontSize: "clamp(36px, 4.5vw, 64px)",
      fontWeight: 800,
      letterSpacing: "-2px",
      lineHeight: 1.05,
    } as React.CSSProperties,
    sectionTitle: {
      fontSize: "clamp(28px, 3.5vw, 38px)",
      fontWeight: 800,
      letterSpacing: "-1px",
    } as React.CSSProperties,
    sectionSubtitle: {
      fontSize: 18,
      lineHeight: 1.7,
      fontWeight: 400,
    } as React.CSSProperties,
    cardTitle: {
      fontSize: 18,
      fontWeight: 700,
    } as React.CSSProperties,
    eyebrow: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase" as const,
    } as React.CSSProperties,
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: "28px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  } as React.CSSProperties,

  section: {
    paddingY: "96px 32px",
  },
} as const;

// ─── 4. Shared scales ───────────────────────────────────────────────

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 48,
  "5xl": 64,
  "6xl": 80,
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 99,
} as const;

export const fontSize = {
  xs: 10,
  sm: 12,
  base: 13,
  md: 14,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.05)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
  lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
  cardElevated: "0 8px 25px -5px rgba(0,0,0,0.1), 0 4px 10px -5px rgba(0,0,0,0.04)",
  glow: (color: string) => `0 0 20px ${color}22, 0 0 40px ${color}11`,
} as const;

export const layout = {
  headerHeight: 48,
  workerHeaderHeight: 52,
  sidebarWidth: 240,
} as const;

// ─── 5. Utilities ───────────────────────────────────────────────────

export const TRANSITION = "all 0.15s ease";

export const animations = {
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  slideIn: "slideIn 0.3s ease forwards",
  fadeIn: "fadeIn 0.2s ease forwards",
  scaleIn: "scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
} as const;

export function focusRing(color: string = tokens.colors.info): React.CSSProperties {
  return {
    outline: `2px solid ${color}`,
    outlineOffset: 2,
  };
}
