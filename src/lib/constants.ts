// Shared color constants used across all portals

export const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Open: { bg: "#fee2e2", color: "#b91c1c" },
  InProgress: { bg: "#dbeafe", color: "#1d4ed8" },
  Blocked: { bg: "#fef3c7", color: "#b45309" },
  Resolved: { bg: "#d1fae5", color: "#065f46" },
  Closed: { bg: "#f3f4f6", color: "#374151" },
};

export const PRIORITY_COLORS: Record<string, { bg: string; color: string }> = {
  Critical: { bg: "#fee2e2", color: "#b91c1c" },
  High: { bg: "#fef3c7", color: "#b45309" },
  Medium: { bg: "#dbeafe", color: "#1d4ed8" },
  Low: { bg: "#f3f4f6", color: "#374151" },
};

export const TASK_TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  TURN_CLEAN: { bg: "#dbeafe", color: "#1d4ed8" },
  DEEP_CLEAN: { bg: "#ede9fe", color: "#6d28d9" },
  SPILL_RESPONSE: { bg: "#fef3c7", color: "#b45309" },
  RESTOCK: { bg: "#d1fae5", color: "#065f46" },
};

export const TASK_STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  OPEN: { bg: "#fee2e2", color: "#b91c1c" },
  IN_PROGRESS: { bg: "#dbeafe", color: "#1d4ed8" },
  DONE: { bg: "#d1fae5", color: "#065f46" },
  CANCELLED: { bg: "#f3f4f6", color: "#374151" },
};

// Recharts-friendly color palette (colorblind-safe)
export const CHART_COLORS = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ef4444", // red
  "#06b6d4", // cyan
  "#ec4899", // pink
  "#84cc16", // lime
];

export const EVENT_LABELS: Record<string, string> = {
  CLOCK_IN: "Clocked in",
  CLOCK_OUT: "Clocked out",
  TASK_START: "Task started",
  TASK_COMPLETE: "Task completed",
  INSPECTION_SUBMIT: "Inspection submitted",
  TICKET_UPDATE: "Ticket updated",
};

export const EVENT_ICONS: Record<string, string> = {
  CLOCK_IN: "&#128994;",
  CLOCK_OUT: "&#128308;",
  TASK_START: "&#9654;",
  TASK_COMPLETE: "&#10003;",
  INSPECTION_SUBMIT: "&#128203;",
  TICKET_UPDATE: "&#128221;",
};
