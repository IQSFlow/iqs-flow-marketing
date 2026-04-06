"use client";

/**
 * DashboardPreview — Mock analytics dashboard section showing
 * quality scores, compliance metrics, and performance charts.
 * Renders as a stylized card on the marketing site.
 */
export default function DashboardPreview() {
  return (
    <section
      style={{
        padding: "96px 32px",
        background:
          "linear-gradient(180deg, #020617 0%, #0a1628 50%, #020617 100%)",
        borderTop: "1px solid rgba(59,130,246,0.08)",
        borderBottom: "1px solid rgba(59,130,246,0.08)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: 16,
              color: "#f1f5f9",
            }}
          >
            Your command center for quality
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: 17,
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Real-time dashboards, compliance scoring, and performance analytics
            — all in one place. No spreadsheets, no guesswork.
          </p>
        </div>

        {/* Mock Dashboard Card */}
        <div
          style={{
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(59,130,246,0.15)",
            borderRadius: 20,
            padding: "28px",
            backdropFilter: "blur(16px)",
            boxShadow:
              "0 0 60px rgba(59,130,246,0.08), 0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Dashboard header bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: "1px solid rgba(148,163,184,0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px rgba(34,197,94,0.5)",
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#e2e8f0",
                }}
              >
                Live Operations Dashboard
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: 8,
              }}
            >
              {["Today", "Week", "Month"].map((period) => (
                <span
                  key={period}
                  style={{
                    fontSize: 11,
                    padding: "4px 12px",
                    borderRadius: 6,
                    background:
                      period === "Today"
                        ? "rgba(59,130,246,0.2)"
                        : "transparent",
                    color:
                      period === "Today" ? "#60a5fa" : "#64748b",
                    border:
                      period === "Today"
                        ? "1px solid rgba(59,130,246,0.3)"
                        : "1px solid transparent",
                    fontWeight: 600,
                  }}
                >
                  {period}
                </span>
              ))}
            </div>
          </div>

          {/* Score cards row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {[
              {
                label: "Overall Quality Score",
                value: "94.2",
                unit: "%",
                trend: "+2.1%",
                trendUp: true,
                color: "#22c55e",
              },
              {
                label: "Compliance Rate",
                value: "97.8",
                unit: "%",
                trend: "+0.5%",
                trendUp: true,
                color: "#3b82f6",
              },
              {
                label: "Active Workers",
                value: "127",
                unit: "",
                trend: "across 3 sites",
                trendUp: true,
                color: "#8b5cf6",
              },
              {
                label: "Open Tickets",
                value: "12",
                unit: "",
                trend: "-4 from yesterday",
                trendUp: true,
                color: "#f59e0b",
              },
            ].map(({ label, value, unit, trend, trendUp, color }) => (
              <div
                key={label}
                style={{
                  background: "rgba(2,6,23,0.6)",
                  borderRadius: 14,
                  padding: "20px 18px",
                  border: "1px solid rgba(148,163,184,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    fontWeight: 600,
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {label}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 800,
                      color: "#f1f5f9",
                      letterSpacing: "-1px",
                    }}
                  >
                    {value}
                  </span>
                  <span style={{ fontSize: 16, color: "#94a3b8", fontWeight: 600 }}>
                    {unit}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: trendUp ? color : "#ef4444",
                    marginTop: 6,
                    fontWeight: 500,
                  }}
                >
                  {trend}
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {/* Quality trend chart (mock bar chart) */}
            <div
              style={{
                background: "rgba(2,6,23,0.6)",
                borderRadius: 14,
                padding: "20px 18px",
                border: "1px solid rgba(148,163,184,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: 16,
                }}
              >
                Quality Score by Site
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 8,
                  height: 120,
                }}
              >
                {[
                  { site: "ATL", score: 96, color: "#3b82f6" },
                  { site: "CLT", score: 91, color: "#60a5fa" },
                  { site: "DFW", score: 88, color: "#93c5fd" },
                  { site: "MIA", score: 94, color: "#3b82f6" },
                  { site: "ORD", score: 85, color: "#93c5fd" },
                  { site: "LAX", score: 92, color: "#60a5fa" },
                  { site: "JFK", score: 97, color: "#3b82f6" },
                ].map(({ site, score, color }) => (
                  <div
                    key={site}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${(score / 100) * 100}px`,
                        background: `linear-gradient(180deg, ${color}, ${color}80)`,
                        borderRadius: "6px 6px 2px 2px",
                        minHeight: 20,
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: -18,
                          left: "50%",
                          transform: "translateX(-50%)",
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#94a3b8",
                        }}
                      >
                        {score}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#64748b",
                        fontWeight: 600,
                      }}
                    >
                      {site}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance framework scores */}
            <div
              style={{
                background: "rgba(2,6,23,0.6)",
                borderRadius: 14,
                padding: "20px 18px",
                border: "1px solid rgba(148,163,184,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: 16,
                }}
              >
                Compliance Framework Scores
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {[
                  { name: "APPA Level 2", score: 94, color: "#22c55e" },
                  { name: "ISSA CIMS", score: 91, color: "#3b82f6" },
                  { name: "Skytrax 4-Star", score: 88, color: "#8b5cf6" },
                  { name: "Joint Commission", score: 96, color: "#22c55e" },
                ].map(({ name, score, color }) => (
                  <div key={name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          color: "#cbd5e1",
                          fontWeight: 500,
                        }}
                      >
                        {name}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          color,
                          fontWeight: 700,
                        }}
                      >
                        {score}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        background: "rgba(148,163,184,0.08)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${score}%`,
                          height: "100%",
                          background: `linear-gradient(90deg, ${color}80, ${color})`,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
