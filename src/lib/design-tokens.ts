// Design tokens — single source of truth for visual constants
// Use inline React style objects with these values (no Tailwind/CSS modules)

import type React from "react";

export const colors = {
  // Portal header/accent colors
  portal: {
    admin: { bg: "#111", accent: "#7c3aed" },
    dashboard: { bg: "#0f1729", accent: "#3b82f6" },
    worker: { bg: "#059669", accent: "#059669" },
    client: { bg: "#1a1a2e", accent: "#b45309" },
  },

  // Text
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

  // Role
  role: {
    admin: { bg: "#ede9fe", color: "#6d28d9" },
    manager: { bg: "#dbeafe", color: "#1d4ed8" },
    worker: { bg: "#d1fae5", color: "#065f46" },
    client: { bg: "#fef3c7", color: "#b45309" },
  },

  // Semantic
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
} as const;

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

// ─── Unified tokens object ───

export const tokens = {
  colors: {
    sidebar: "#0f1729",
    accent: {
      admin: "#7c3aed",
      manager: "#3b82f6",
      client: "#b45309",
      worker: "#059669",
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

export const TRANSITION = "all 0.15s ease";

export const animations = {
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  slideIn: "slideIn 0.3s ease forwards",
  fadeIn: "fadeIn 0.2s ease forwards",
  scaleIn: "scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
} as const;

// ─── Marketing / landing page tokens ───

export const marketing = {
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
    ctaGradient: "linear-gradient(165deg, #1e40af 0%, #2563eb 100%)",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    padding: "28px 24px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  } as React.CSSProperties,
  section: {
    paddingY: "96px 32px",
  },
  heading: {
    h2: {
      fontSize: "clamp(28px, 3.5vw, 38px)",
      fontWeight: 800,
      letterSpacing: "-1px",
      color: "#0f172a",
      marginBottom: 48,
      textAlign: "center",
    } as React.CSSProperties,
  },
} as const;

export function focusRing(color: string = tokens.colors.info): React.CSSProperties {
  return {
    outline: `2px solid ${color}`,
    outlineOffset: 2,
  };
}
