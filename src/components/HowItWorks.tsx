const steps = [
  {
    step: "1",
    title: "Connect your sites",
    desc: "Add your locations, onboard your service vendors, and configure quality standards and SLA targets for each site.",
  },
  {
    step: "2",
    title: "Monitor in real time",
    desc: "GPS tracking, digital inspections, and automated scoring give you live visibility into every crew, every shift.",
  },
  {
    step: "3",
    title: "Drive continuous improvement",
    desc: "Trend reports, compliance dashboards, and performance analytics turn independent data into better vendor outcomes.",
  },
];

export default function HowItWorks() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 32,
        maxWidth: 900,
        margin: "48px auto 0",
      }}
    >
      {steps.map(({ step, title, desc }) => (
        <div key={step} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #1e40af, #2563eb)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              margin: "0 auto 20px",
              boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
            }}
          >
            {step}
          </div>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 10,
              letterSpacing: "-0.3px",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "#475569",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
}
