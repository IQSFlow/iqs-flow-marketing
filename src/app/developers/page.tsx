import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "Developers - IQS Flow API",
  description:
    "Integrate IQS Flow quality data into your existing tech stack. RESTful API with webhook support, Bearer token auth, and comprehensive endpoint coverage.",
  openGraph: {
    title: "IQS Flow Developer API",
    description:
      "Connect your systems to IQS Flow. Sites, inspections, reports - all available via a clean REST API.",
  },
};

// ── Token colors for simple inline syntax highlighting ──────────────────────
const T = {
  key: { color: "#93c5fd" } as React.CSSProperties,          // blue-300
  str: { color: "#86efac" } as React.CSSProperties,          // green-300
  num: { color: "#fcd34d" } as React.CSSProperties,          // amber-300
  op: { color: "#94a3b8" } as React.CSSProperties,           // slate-400
  kw: { color: "#c084fc" } as React.CSSProperties,           // purple-300
  comment: { color: "#475569", fontStyle: "italic" } as React.CSSProperties,
  method: { color: "#f472b6" } as React.CSSProperties,       // pink-300
  url: { color: "#67e8f9" } as React.CSSProperties,          // cyan-300
  plain: { color: "#e2e8f0" } as React.CSSProperties,
};

const codeBlockStyle: React.CSSProperties = {
  background: "#0f172a",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: "24px 28px",
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
  fontSize: 13,
  lineHeight: 1.8,
  overflowX: "auto",
  letterSpacing: "0.01em",
};

export default function DevelopersPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        background: "#0f172a",
        color: "#e2e8f0",
      }}
    >
      <MarketingNav />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "100px 32px 80px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 600,
            background:
              "radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Accent label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              background: "rgba(37,99,235,0.15)",
              border: "1px solid rgba(37,99,235,0.35)",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 700,
              color: "#60a5fa",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
            IQS Flow API
          </div>

          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 54px)",
              fontWeight: 800,
              letterSpacing: "-1.5px",
              lineHeight: 1.08,
              marginBottom: 22,
              color: "#f8fafc",
            }}
          >
            Built for your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              existing tech stack.
            </span>
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "#94a3b8",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 40px",
            }}
          >
            Connect IQS Flow to your ERP, CMMS, or BI platform. Clean RESTful
            endpoints, webhook events, and Bearer token auth - production-ready
            from day one.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                background: "#2563eb",
                color: "#fff",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 0 0 1px rgba(37,99,235,0.5), 0 4px 20px rgba(37,99,235,0.3)",
              }}
            >
              Get API Keys
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                background: "rgba(255,255,255,0.06)",
                color: "#e2e8f0",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Authentication ────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 32px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.25)",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              color: "#34d399",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Authentication
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: 14,
              color: "#f1f5f9",
            }}
          >
            Bearer token, one line.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 560,
            }}
          >
            Every request authenticates with an{" "}
            <code
              style={{
                fontFamily: "monospace",
                background: "rgba(255,255,255,0.08)",
                padding: "2px 7px",
                borderRadius: 4,
                fontSize: 13,
                color: "#93c5fd",
              }}
            >
              Authorization: Bearer
            </code>{" "}
            header. Tokens are scoped per tenant and rotatable at any time from
            your admin panel.
          </p>

          <div style={codeBlockStyle}>
            <div style={T.comment}># Fetch all sites for your tenant</div>
            <br />
            <span style={T.method}>curl</span>
            <span style={T.plain}> -X </span>
            <span style={T.str}>&quot;GET&quot;</span>
            <span style={T.plain}> \</span>
            <br />
            <span style={T.plain}>  </span>
            <span style={T.url}>https://api.iqsflow.com/v1/sites</span>
            <span style={T.plain}> \</span>
            <br />
            <span style={T.plain}>  -H </span>
            <span style={T.str}>&quot;Authorization: Bearer <span style={{ color: "#fcd34d" }}>sk_live_••••••••••••••••</span>&quot;</span>
            <span style={T.plain}> \</span>
            <br />
            <span style={T.plain}>  -H </span>
            <span style={T.str}>&quot;Content-Type: application/json&quot;</span>
            <br />
            <br />
            <div style={T.comment}># Response: 200 OK</div>
            <span style={T.plain}>{"{"}</span>
            <br />
            <span style={T.plain}>  </span>
            <span style={T.key}>&quot;data&quot;</span>
            <span style={T.op}>: [</span>
            <br />
            <span style={T.plain}>    {"{"}</span>
            <br />
            <span style={T.plain}>      </span>
            <span style={T.key}>&quot;id&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;site_01J8X2K9M&quot;</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>      </span>
            <span style={T.key}>&quot;name&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;Terminal 3 - O&apos;Hare&quot;</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>      </span>
            <span style={T.key}>&quot;score&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.num}>94.2</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>      </span>
            <span style={T.key}>&quot;status&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;active&quot;</span>
            <br />
            <span style={T.plain}>    {"}"}</span>
            <br />
            <span style={T.plain}>  ]</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>  </span>
            <span style={T.key}>&quot;total&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.num}>12</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>  </span>
            <span style={T.key}>&quot;page&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.num}>1</span>
            <br />
            <span style={T.plain}>{"}"}</span>
          </div>
        </div>
      </section>

      {/* ─── Key Endpoints ─────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 32px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                background: "rgba(99,102,241,0.12)",
                border: "1px solid rgba(99,102,241,0.25)",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                color: "#a5b4fc",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              REST API
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3.5vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-1px",
                color: "#f1f5f9",
              }}
            >
              Key endpoints
            </h2>
            <p style={{ color: "#64748b", fontSize: 16, marginTop: 10 }}>
              Everything your integrations need, structured and versioned.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {/* Sites endpoint */}
            <div
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "28px 28px 24px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    padding: "4px 10px",
                    background: "rgba(16,185,129,0.15)",
                    color: "#34d399",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                  }}
                >
                  GET
                </span>
                <code
                  style={{
                    fontFamily: "monospace",
                    color: "#67e8f9",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  /v1/sites
                </code>
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#f1f5f9",
                  marginBottom: 8,
                }}
              >
                Sites
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                List and filter all sites in your portfolio. Includes live
                quality scores, status, GPS coordinates, and vendor assignments.
              </p>
              <div style={{ ...codeBlockStyle, padding: "16px 20px", fontSize: 12 }}>
                <span style={T.comment}># Filter by score threshold</span>
                <br />
                <span style={T.method}>GET</span>
                <span style={T.plain}> /v1/sites</span>
                <span style={T.op}>?</span>
                <span style={T.key}>score_lt</span>
                <span style={T.op}>=</span>
                <span style={T.num}>80</span>
                <span style={T.op}>&</span>
                <span style={T.key}>status</span>
                <span style={T.op}>=</span>
                <span style={T.str}>active</span>
              </div>
            </div>

            {/* Inspections endpoint */}
            <div
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "28px 28px 24px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    padding: "4px 10px",
                    background: "rgba(16,185,129,0.15)",
                    color: "#34d399",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                  }}
                >
                  GET
                </span>
                <code
                  style={{
                    fontFamily: "monospace",
                    color: "#67e8f9",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  /v1/inspections
                </code>
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#f1f5f9",
                  marginBottom: 8,
                }}
              >
                Inspections
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                Full inspection records with scores per checklist item, photo
                attachments, inspector metadata, and compliance flags.
              </p>
              <div style={{ ...codeBlockStyle, padding: "16px 20px", fontSize: 12 }}>
                <span style={T.comment}># By site, paginated</span>
                <br />
                <span style={T.method}>GET</span>
                <span style={T.plain}> /v1/inspections</span>
                <span style={T.op}>?</span>
                <span style={T.key}>site_id</span>
                <span style={T.op}>=</span>
                <span style={T.str}>site_01J8X2K9M</span>
                <span style={T.op}>&</span>
                <span style={T.key}>limit</span>
                <span style={T.op}>=</span>
                <span style={T.num}>50</span>
              </div>
            </div>

            {/* Reports endpoint */}
            <div
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "28px 28px 24px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    padding: "4px 10px",
                    background: "rgba(16,185,129,0.15)",
                    color: "#34d399",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                  }}
                >
                  GET
                </span>
                <code
                  style={{
                    fontFamily: "monospace",
                    color: "#67e8f9",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  /v1/reports
                </code>
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#f1f5f9",
                  marginBottom: 8,
                }}
              >
                Reports
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                Aggregate quality summaries by site, vendor, or time window.
                Use these to feed your BI dashboards or executive reporting
                pipelines.
              </p>
              <div style={{ ...codeBlockStyle, padding: "16px 20px", fontSize: 12 }}>
                <span style={T.comment}># Monthly summary</span>
                <br />
                <span style={T.method}>GET</span>
                <span style={T.plain}> /v1/reports</span>
                <span style={T.op}>?</span>
                <span style={T.key}>period</span>
                <span style={T.op}>=</span>
                <span style={T.str}>2026-03</span>
                <span style={T.op}>&</span>
                <span style={T.key}>group_by</span>
                <span style={T.op}>=</span>
                <span style={T.str}>vendor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Webhooks ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 32px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              background: "rgba(245,158,11,0.12)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              color: "#fbbf24",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Webhooks
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: 14,
              color: "#f1f5f9",
            }}
          >
            Real-time event delivery.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 600,
            }}
          >
            Subscribe to IQS Flow events and receive signed JSON payloads
            instantly to your endpoint. No polling required. Events include
            inspection completions, failing score alerts, ticket escalations,
            and compliance threshold breaches.
          </p>

          <div style={codeBlockStyle}>
            <div style={T.comment}># POST to your webhook endpoint - inspection.completed</div>
            <br />
            <span style={T.plain}>{"{"}</span>
            <br />
            <span style={T.plain}>  </span>
            <span style={T.key}>&quot;event&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;inspection.completed&quot;</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>  </span>
            <span style={T.key}>&quot;id&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;evt_01HXKP4B7Q&quot;</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>  </span>
            <span style={T.key}>&quot;created_at&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;2026-03-25T14:32:07Z&quot;</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>  </span>
            <span style={T.key}>&quot;data&quot;</span>
            <span style={T.op}>: {"{"}</span>
            <br />
            <span style={T.plain}>    </span>
            <span style={T.key}>&quot;inspection_id&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;insp_04MXYZ891&quot;</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>    </span>
            <span style={T.key}>&quot;site_id&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;site_01J8X2K9M&quot;</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>    </span>
            <span style={T.key}>&quot;site_name&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;Terminal 3 - O&apos;Hare&quot;</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>    </span>
            <span style={T.key}>&quot;score&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.num}>91.4</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>    </span>
            <span style={T.key}>&quot;passed&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.kw}>true</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>    </span>
            <span style={T.key}>&quot;inspector&quot;</span>
            <span style={T.op}>: {"{"}</span>
            <br />
            <span style={T.plain}>      </span>
            <span style={T.key}>&quot;id&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;user_09XAB&quot;</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>      </span>
            <span style={T.key}>&quot;name&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.str}>&quot;Maria Santos&quot;</span>
            <br />
            <span style={T.plain}>    {"}"}</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>    </span>
            <span style={T.key}>&quot;items_failed&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.num}>2</span>
            <span style={T.op}>,</span>
            <br />
            <span style={T.plain}>    </span>
            <span style={T.key}>&quot;photos_attached&quot;</span>
            <span style={T.op}>: </span>
            <span style={T.num}>7</span>
            <br />
            <span style={T.plain}>  {"}"}</span>
            <br />
            <span style={T.plain}>{"}"}</span>
          </div>

          <div
            style={{
              marginTop: 20,
              padding: "14px 20px",
              background: "rgba(37,99,235,0.08)",
              border: "1px solid rgba(37,99,235,0.2)",
              borderRadius: 10,
              fontSize: 13,
              color: "#94a3b8",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "#60a5fa", fontWeight: 600 }}>Signature verification:</span>{" "}
            Every webhook includes an{" "}
            <code
              style={{
                fontFamily: "monospace",
                background: "rgba(255,255,255,0.07)",
                padding: "2px 6px",
                borderRadius: 4,
                color: "#93c5fd",
              }}
            >
              X-IQS-Signature
            </code>{" "}
            header - a HMAC-SHA256 of the raw body signed with your webhook
            secret. Validate it before processing.
          </div>
        </div>
      </section>

      {/* ─── Rate Limits ───────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 32px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.22)",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              color: "#f87171",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Rate Limits
          </div>
          <h2
            style={{
              fontSize: "clamp(24px, 3.5vw, 34px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              marginBottom: 14,
              color: "#f1f5f9",
            }}
          >
            Generous limits at every tier.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 560,
            }}
          >
            Limits are enforced per API key with a rolling 60-second window.
            Headers on every response tell you exactly where you stand.
          </p>

          {/* Tier cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {[
              {
                tier: "Standard",
                rate: "100",
                unit: "req / min",
                color: "#34d399",
                bg: "rgba(16,185,129,0.1)",
                border: "rgba(16,185,129,0.2)",
              },
              {
                tier: "Professional",
                rate: "500",
                unit: "req / min",
                color: "#60a5fa",
                bg: "rgba(37,99,235,0.1)",
                border: "rgba(37,99,235,0.22)",
              },
              {
                tier: "Enterprise",
                rate: "Custom",
                unit: "SLA-backed",
                color: "#c084fc",
                bg: "rgba(124,58,237,0.1)",
                border: "rgba(124,58,237,0.22)",
              },
            ].map(({ tier, rate, unit, color, bg, border }) => (
              <div
                key={tier}
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: 14,
                  padding: "24px 22px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#94a3b8",
                    letterSpacing: "0.04em",
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  {tier}
                </div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color,
                    letterSpacing: "-1px",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {rate}
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{unit}</div>
              </div>
            ))}
          </div>

          {/* Best practices */}
          <div
            style={{
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "24px 28px",
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#e2e8f0",
                marginBottom: 16,
                letterSpacing: "-0.3px",
              }}
            >
              Best practices
            </h3>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[
                {
                  text: "Read the X-RateLimit-Remaining header and back off when it approaches zero.",
                  color: "#60a5fa",
                },
                {
                  text: "Use webhooks for near-real-time needs instead of polling the REST API.",
                  color: "#34d399",
                },
                {
                  text: "Cache site and user data client-side - these change infrequently.",
                  color: "#fbbf24",
                },
                {
                  text: "Contact us for Enterprise SLAs, dedicated rate pools, or IP whitelisting.",
                  color: "#c084fc",
                },
              ].map(({ text, color }, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    fontSize: 14,
                    color: "#94a3b8",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: color,
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 32px",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1.2px",
              color: "#f8fafc",
              marginBottom: 14,
            }}
          >
            Ready to integrate?
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            Talk to our team, get sandbox credentials, and push your first
            request within the hour.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                background: "#2563eb",
                color: "#fff",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 0 0 1px rgba(37,99,235,0.4), 0 4px 20px rgba(37,99,235,0.25)",
              }}
            >
              Get API Keys &rarr;
            </Link>
            <Link
              href="/pricing"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                background: "transparent",
                color: "#94a3b8",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
