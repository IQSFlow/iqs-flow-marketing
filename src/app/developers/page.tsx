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

// ── Ink palette ─────────────────────────────────────────────────────────────
const ink = {
  900: "#0a0f1a",
  800: "#0f172a",
  500: "#475569",
  400: "#64748b",
  300: "#94a3b8",
  200: "#cbd5e1",
  100: "#e2e8f0",
  50:  "#f1f5f9",
  25:  "#f8fafc",
};
const accent = "#2563eb";

// ── Token colors ─────────────────────────────────────────────────────────────
const T = {
  key:     { color: "#93c5fd" } as React.CSSProperties,
  str:     { color: "#86efac" } as React.CSSProperties,
  num:     { color: "#fcd34d" } as React.CSSProperties,
  op:      { color: "#64748b" } as React.CSSProperties,
  kw:      { color: "#c084fc" } as React.CSSProperties,
  comment: { color: "#334155", fontStyle: "italic" } as React.CSSProperties,
  method:  { color: "#f472b6" } as React.CSSProperties,
  url:     { color: "#67e8f9" } as React.CSSProperties,
  plain:   { color: "#cbd5e1" } as React.CSSProperties,
};

const codeBlock: React.CSSProperties = {
  background: "#060d1a",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 10,
  padding: "22px 26px",
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
  fontSize: 13,
  lineHeight: 1.85,
  overflowX: "auto",
  letterSpacing: "0.01em",
};

const sectionLabel: React.CSSProperties = {
  display: "inline-block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: ink[300],
  marginBottom: 16,
};

export default function DevelopersPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
        background: ink[900],
        color: ink[200],
      }}
    >
      <MarketingNav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "88px 40px 72px", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ marginBottom: 20 }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "5px 14px",
              background: "rgba(37,99,235,0.12)",
              border: "1px solid rgba(37,99,235,0.28)",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              color: "#60a5fa",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#3b82f6", display: "inline-block" }} />
              IQS Flow API
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            color: ink[25],
            marginBottom: 22,
            maxWidth: 680,
          }}>
            Built for your existing tech stack.
          </h1>
          <p style={{
            fontSize: 18,
            color: ink[400],
            lineHeight: 1.7,
            maxWidth: 540,
            marginBottom: 40,
          }}>
            Connect IQS Flow to your ERP, CMMS, or BI platform. Clean RESTful
            endpoints, webhook events, and Bearer token auth - production-ready
            from day one.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                background: accent,
                color: "#fff",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.01em",
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
                padding: "13px 28px",
                background: "rgba(255,255,255,0.05)",
                color: ink[200],
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: `1px solid rgba(255,255,255,0.1)`,
              }}
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Authentication ──────────────────────────────────────────────── */}
      <section style={{ padding: "80px 40px", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={sectionLabel}>Authentication</div>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
            letterSpacing: "-0.8px",
            marginBottom: 14,
            color: ink[50],
          }}>
            Bearer token, one line.
          </h2>
          <p style={{
            fontSize: 16,
            color: ink[400],
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 540,
          }}>
            Every request authenticates with an{" "}
            <code style={{
              fontFamily: "monospace",
              background: "rgba(255,255,255,0.07)",
              padding: "2px 7px",
              borderRadius: 4,
              fontSize: 13,
              color: "#93c5fd",
            }}>
              Authorization: Bearer
            </code>{" "}
            header. Tokens are scoped per tenant and rotatable at any time from
            your admin panel.
          </p>
          <div style={codeBlock}>
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

      {/* ── Key Endpoints ───────────────────────────────────────────────── */}
      <section style={{ padding: "80px 40px", borderBottom: `1px solid rgba(255,255,255,0.06)`, background: "rgba(255,255,255,0.012)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <div style={sectionLabel}>REST API</div>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 700,
              letterSpacing: "-0.8px",
              color: ink[50],
              marginBottom: 10,
            }}>
              Key endpoints
            </h2>
            <p style={{ color: ink[400], fontSize: 16, maxWidth: 420 }}>
              Everything your integrations need, structured and versioned.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}>
            {[
              {
                method: "GET",
                path: "/v1/sites",
                title: "Sites",
                desc: "List and filter all sites in your portfolio. Includes live quality scores, status, GPS coordinates, and vendor assignments.",
                snippet: (
                  <>
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
                  </>
                ),
              },
              {
                method: "GET",
                path: "/v1/inspections",
                title: "Inspections",
                desc: "Full inspection records with scores per checklist item, photo attachments, inspector metadata, and compliance flags.",
                snippet: (
                  <>
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
                  </>
                ),
              },
              {
                method: "GET",
                path: "/v1/reports",
                title: "Reports",
                desc: "Aggregate quality summaries by site, vendor, or time window. Use these to feed your BI dashboards or executive reporting pipelines.",
                snippet: (
                  <>
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
                  </>
                ),
              },
            ].map(({ method, path, title, desc, snippet }) => (
              <div key={title} style={{
                background: "#070d1c",
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: 10,
                padding: "26px 26px 22px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{
                    padding: "3px 9px",
                    background: "rgba(16,185,129,0.14)",
                    color: "#34d399",
                    borderRadius: 5,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.07em",
                  }}>
                    {method}
                  </span>
                  <code style={{
                    fontFamily: "monospace",
                    color: "#67e8f9",
                    fontSize: 13,
                    fontWeight: 600,
                  }}>
                    {path}
                  </code>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: ink[50], marginBottom: 8 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: ink[400], lineHeight: 1.65, marginBottom: 18 }}>
                  {desc}
                </p>
                <div style={{ ...codeBlock, padding: "14px 18px", fontSize: 12 }}>
                  {snippet}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Webhooks ────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 40px", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={sectionLabel}>Webhooks</div>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
            letterSpacing: "-0.8px",
            marginBottom: 14,
            color: ink[50],
          }}>
            Real-time event delivery.
          </h2>
          <p style={{
            fontSize: 16,
            color: ink[400],
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 580,
          }}>
            Subscribe to IQS Flow events and receive signed JSON payloads
            instantly to your endpoint. No polling required. Events include
            inspection completions, failing score alerts, ticket escalations,
            and compliance threshold breaches.
          </p>
          <div style={codeBlock}>
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
          <div style={{
            marginTop: 16,
            padding: "14px 18px",
            background: "rgba(37,99,235,0.07)",
            border: "1px solid rgba(37,99,235,0.18)",
            borderRadius: 8,
            fontSize: 13,
            color: ink[300],
            lineHeight: 1.65,
          }}>
            <span style={{ color: "#60a5fa", fontWeight: 600 }}>Signature verification:</span>{" "}
            Every webhook includes an{" "}
            <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 4, color: "#93c5fd" }}>
              X-IQS-Signature
            </code>{" "}
            header - a HMAC-SHA256 of the raw body signed with your webhook
            secret. Validate it before processing.
          </div>
        </div>
      </section>

      {/* ── Rate Limits ─────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 40px", borderBottom: `1px solid rgba(255,255,255,0.06)`, background: "rgba(255,255,255,0.012)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={sectionLabel}>Rate Limits</div>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
            letterSpacing: "-0.8px",
            marginBottom: 14,
            color: ink[50],
          }}>
            Generous limits at every tier.
          </h2>
          <p style={{
            fontSize: 16,
            color: ink[400],
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 540,
          }}>
            Limits are enforced per API key with a rolling 60-second window.
            Headers on every response tell you exactly where you stand.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 14,
            marginBottom: 36,
          }}>
            {[
              { tier: "Standard",     rate: "100",    unit: "req / min",  color: "#34d399", border: "rgba(16,185,129,0.18)" },
              { tier: "Professional", rate: "500",    unit: "req / min",  color: "#60a5fa", border: "rgba(37,99,235,0.22)" },
              { tier: "Enterprise",   rate: "Custom", unit: "SLA-backed", color: "#c084fc", border: "rgba(124,58,237,0.22)" },
            ].map(({ tier, rate, unit, color, border }) => (
              <div key={tier} style={{
                border: `1px solid ${border}`,
                borderRadius: 10,
                padding: "22px 20px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: ink[400], letterSpacing: "0.06em", marginBottom: 10, textTransform: "uppercase" }}>
                  {tier}
                </div>
                <div style={{ fontSize: 34, fontWeight: 700, color, letterSpacing: "-1px", lineHeight: 1, marginBottom: 4 }}>
                  {rate}
                </div>
                <div style={{ fontSize: 12, color: ink[500] }}>{unit}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: "#070d1c",
            border: `1px solid rgba(255,255,255,0.06)`,
            borderRadius: 10,
            padding: "22px 26px",
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: ink[100], marginBottom: 14, letterSpacing: "-0.2px" }}>
              Best practices
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
              {[
                { text: "Read the X-RateLimit-Remaining header and back off when it approaches zero.", color: "#60a5fa" },
                { text: "Use webhooks for near-real-time needs instead of polling the REST API.", color: "#34d399" },
                { text: "Cache site and user data client-side - these change infrequently.", color: "#fbbf24" },
                { text: "Contact us for Enterprise SLAs, dedicated rate pools, or IP whitelisting.", color: "#c084fc" },
              ].map(({ text, color }, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 11, fontSize: 14, color: ink[300], lineHeight: 1.6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 8 }} />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ background: ink[900], padding: "80px 40px" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 64 }} />
          <h2 style={{
            fontSize: "clamp(24px, 3.5vw, 38px)",
            fontWeight: 700,
            letterSpacing: "-1px",
            color: ink[25],
            marginBottom: 14,
          }}>
            Ready to integrate?
          </h2>
          <p style={{
            fontSize: 17,
            color: ink[400],
            lineHeight: 1.7,
            marginBottom: 36,
          }}>
            Talk to our team, get sandbox credentials, and push your first
            request within the hour.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                background: accent,
                color: "#fff",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
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
                padding: "13px 26px",
                background: "transparent",
                color: ink[300],
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: `1px solid rgba(255,255,255,0.1)`,
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
