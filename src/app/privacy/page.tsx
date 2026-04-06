import type { Metadata } from "next";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | IQS Flow",
  description: "Privacy policy for IQS Flow by Integrity Quality Solutions.",
};

export default function PrivacyPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        color: "#111827",
        background: "#fff",
      }}
    >
      <MarketingNav />

      <section
        style={{
          padding: "80px 32px 60px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: "-1px",
            marginBottom: 16,
            color: "#0f172a",
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 32 }}>
          Last updated: March 2026
        </p>

        <div
          style={{
            fontSize: 15,
            color: "#475569",
            lineHeight: 1.8,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <p>
            Integrity Quality Solutions (&ldquo;IQS,&rdquo; &ldquo;we,&rdquo;
            &ldquo;our&rdquo;) operates the IQS Flow platform. This Privacy
            Policy describes how we collect, use, and protect your information
            when you use our services.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as your name,
            email address, company name, and any messages you send through our
            contact forms. When you use the IQS Flow platform, we also collect
            usage data including login activity, inspection records, and GPS
            location data from the worker mobile app (with permission).
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            How We Use Your Information
          </h2>
          <p>
            We use your information to provide and improve the IQS Flow
            platform, respond to your inquiries, and communicate with you about
            our services. We do not sell your personal information to third
            parties.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect your
            data, including encrypted sessions, role-based access controls, and
            audit logging. All data is stored securely and access is restricted
            to authorized personnel.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at <strong>info@iqsflow.com</strong>.
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
