import type { Metadata } from "next";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";

export const metadata: Metadata = {
  title: "Terms of Service | IQS Flow",
  description: "Terms of service for IQS Flow by Integrity Quality Solutions.",
};

export default function TermsPage() {
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
          Terms of Service
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
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the
            IQS Flow platform operated by Integrity Quality Solutions
            (&ldquo;IQS,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;). By
            accessing or using our services, you agree to be bound by these
            Terms.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Use of Services
          </h2>
          <p>
            IQS Flow is provided for use by authorized organizations and their
            employees for facility operations management. You agree to use the
            platform only for its intended purpose and in compliance with all
            applicable laws and regulations.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Account Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use
            of your account.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Intellectual Property
          </h2>
          <p>
            The IQS Flow platform, including its design, features, and content,
            is the property of Integrity Quality Solutions. You may not copy,
            modify, distribute, or reverse engineer any part of the platform
            without our prior written consent.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Limitation of Liability
          </h2>
          <p>
            IQS Flow is provided &ldquo;as is&rdquo; without warranties of any
            kind. To the fullest extent permitted by law, Integrity Quality
            Solutions shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of the platform.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Contact Us
          </h2>
          <p>
            If you have questions about these Terms, please contact us at{" "}
            <strong>info@iqsflow.com</strong>.
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
