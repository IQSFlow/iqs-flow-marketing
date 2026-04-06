import React from "react";

interface IndustryCardProps {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  details: string[];
}

export default function IndustryCard({
  icon,
  title,
  tagline,
  details,
}: IndustryCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: "28px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          marginBottom: 14,
          lineHeight: 1,
          color: "#0f172a",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#0f172a",
          marginBottom: 4,
          letterSpacing: "-0.3px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#2563eb",
          marginBottom: 16,
        }}
      >
        {tagline}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {details.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 8,
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.5,
            }}
          >
            <span style={{ color: "#059669", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>&#10003;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
