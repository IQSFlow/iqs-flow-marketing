const PLANS = ["Starter", "Professional", "Enterprise"];

const ROWS: { feature: string; values: string[] }[] = [
  { feature: "Sites", values: ["1", "Up to 5", "Unlimited"] },
  { feature: "Workers", values: ["25", "100", "Unlimited"] },
  { feature: "Cleaning Vendors", values: ["1-2", "Multiple", "Unlimited"] },
  { feature: "GPS Tracking", values: ["Yes", "Yes", "Yes"] },
  {
    feature: "Inspections",
    values: ["Standard forms", "Custom forms", "Custom + API"],
  },
  { feature: "Vendor Onboarding", values: ["—", "Yes", "Unlimited"] },
  { feature: "Vendor Portal", values: ["—", "—", "Yes"] },
  { feature: "Compliance Scoring", values: ["—", "Yes", "Yes"] },
  { feature: "Client Portal", values: ["—", "Yes", "Yes"] },
  { feature: "SLA Tracking", values: ["—", "Yes", "Custom SLAs"] },
  { feature: "API Access", values: ["—", "—", "Yes"] },
  { feature: "SSO / SAML", values: ["—", "—", "Yes"] },
  { feature: "Support", values: ["Email", "Priority", "Dedicated AM"] },
];

function CellValue({ value, colIndex }: { value: string; colIndex: number }) {
  if (value === "Yes") {
    return (
      <span style={{ color: "#059669", fontSize: 16, fontWeight: 700 }}>
        ✓
      </span>
    );
  }
  if (value === "—") {
    return <span style={{ color: "#94a3b8", fontSize: 16 }}>—</span>;
  }
  return (
    <span
      style={{
        color: colIndex === 1 ? "#2563eb" : "#475569",
        fontSize: 14,
      }}
    >
      {value}
    </span>
  );
}

export default function FeatureCompareTable() {
  return (
    <div
      style={{
        overflowX: "auto",
        WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
        border: "1px solid #e2e8f0",
        borderRadius: 16,
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <thead>
          <tr style={{ background: "#f8fafc" }}>
            <th
              style={{
                textAlign: "left",
                padding: "16px 24px",
                color: "#0f172a",
                fontSize: 14,
                fontWeight: 600,
                borderBottom: "1px solid #e2e8f0",
                minWidth: 180,
              }}
            >
              Feature
            </th>
            {PLANS.map((plan, i) => (
              <th
                key={plan}
                style={{
                  textAlign: "center",
                  padding: "16px 24px",
                  color: i === 1 ? "#2563eb" : "#0f172a",
                  fontSize: 16,
                  fontWeight: 700,
                  borderBottom: "1px solid #e2e8f0",
                  minWidth: 140,
                }}
              >
                {plan}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, rowIndex) => (
            <tr
              key={row.feature}
              style={{ background: rowIndex % 2 === 0 ? "#ffffff" : "#f8fafc" }}
            >
              <td
                style={{
                  padding: "14px 24px",
                  color: "#0f172a",
                  fontSize: 14,
                  fontWeight: 600,
                  borderBottom:
                    rowIndex < ROWS.length - 1
                      ? "1px solid #e2e8f0"
                      : undefined,
                }}
              >
                {row.feature}
              </td>
              {row.values.map((value, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    padding: "14px 24px",
                    textAlign: "center",
                    borderBottom:
                      rowIndex < ROWS.length - 1
                        ? "1px solid #e2e8f0"
                        : undefined,
                  }}
                >
                  <CellValue value={value} colIndex={colIndex} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
