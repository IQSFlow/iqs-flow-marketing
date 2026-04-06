interface ComparisonSectionProps {
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
  leftIcon?: string;
  rightIcon?: string;
}

export default function ComparisonSection({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
  leftIcon,
  rightIcon,
}: ComparisonSectionProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      {/* Left card */}
      <div
        style={{
          flex: 1,
          minWidth: 280,
          background: "#ffffff",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          borderTop: "3px solid #fecaca",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {leftIcon && <span style={{ fontSize: 20 }}>{leftIcon}</span>}
          <span
            style={{
              color: "#ef4444",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {leftTitle}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {leftItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span
                style={{
                  color: "#ef4444",
                  fontSize: 16,
                  fontWeight: 700,
                  flexShrink: 0,
                  lineHeight: 1.4,
                }}
              >
                ✕
              </span>
              <span style={{ color: "#475569", fontSize: 15 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right card */}
      <div
        style={{
          flex: 1,
          minWidth: 280,
          background: "#ffffff",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          borderTop: "3px solid #86efac",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {rightIcon && <span style={{ fontSize: 20 }}>{rightIcon}</span>}
          <span
            style={{
              color: "#059669",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {rightTitle}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rightItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <span
                style={{
                  color: "#059669",
                  fontSize: 16,
                  fontWeight: 700,
                  flexShrink: 0,
                  lineHeight: 1.4,
                }}
              >
                ✓
              </span>
              <span style={{ color: "#475569", fontSize: 15 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
