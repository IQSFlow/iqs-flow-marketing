import Link from "next/link";

interface PricingCardProps {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  ctaHref: string;
}

export default function PricingCard({
  name,
  description,
  features,
  highlighted = false,
  cta,
  ctaHref,
}: PricingCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        borderTop: highlighted ? "3px solid #2563eb" : undefined,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {highlighted && (
        <div style={{ marginBottom: 16 }}>
          <span
            style={{
              background: "#2563eb",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 99,
              padding: "4px 12px",
            }}
          >
            Most Popular
          </span>
        </div>
      )}

      <div
        style={{
          color: "#0f172a",
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        {name}
      </div>

      <div
        style={{
          color: "#475569",
          fontSize: 14,
          marginTop: 4,
          marginBottom: 24,
        }}
      >
        {description}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 28,
          flex: 1,
        }}
      >
        {features.map((feature, i) => (
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
                fontSize: 15,
                fontWeight: 700,
                flexShrink: 0,
                lineHeight: 1.4,
              }}
            >
              ✓
            </span>
            <span style={{ color: "#475569", fontSize: 14 }}>{feature}</span>
          </div>
        ))}
      </div>

      <Link
        href={ctaHref}
        style={{
          display: "block",
          width: "100%",
          padding: "14px 0",
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          textAlign: "center",
          textDecoration: "none",
          background: highlighted ? "#2563eb" : "#ffffff",
          color: highlighted ? "#ffffff" : "#2563eb",
          border: highlighted ? "none" : "1px solid #2563eb",
          boxShadow: highlighted
            ? "0 2px 8px rgba(37,99,235,0.25)"
            : undefined,
          transition: "opacity 0.2s ease",
        }}
      >
        {cta}
      </Link>
    </div>
  );
}
