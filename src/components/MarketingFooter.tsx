"use client";

import Link from "next/link";
import { useState } from "react";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      style={{
        color: hovered ? "#f1f5f9" : "#94a3b8",
        textDecoration: "none",
        transition: "color 0.15s",
        fontSize: 14,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

const COLUMN_HEADING_STYLE: React.CSSProperties = {
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  fontSize: 12,
  fontWeight: 600,
  marginBottom: 2,
};

const COLUMN_STYLE: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

export default function MarketingFooter() {
  return (
    <footer
      style={{
        background: "#0f172a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "48px 32px 24px",
        color: "#94a3b8",
        fontSize: 13,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 40,
            marginBottom: 40,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                color: "#f1f5f9",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              IQS Flow
            </div>
            <p
              style={{
                marginTop: 8,
                fontSize: 13,
                color: "#64748b",
                maxWidth: 220,
                lineHeight: 1.6,
              }}
            >
              Quality intelligence for operations leaders.
            </p>
          </div>

          {/* Columns */}
          <div
            style={{
              display: "flex",
              gap: 48,
              flexWrap: "wrap",
            }}
          >
            {/* Product */}
            <div style={COLUMN_STYLE}>
              <span style={COLUMN_HEADING_STYLE}>Product</span>
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/developers">Developers (API)</FooterLink>
            </div>

            {/* Company */}
            <div style={COLUMN_STYLE}>
              <span style={COLUMN_HEADING_STYLE}>Company</span>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </div>

            {/* Legal */}
            <div style={COLUMN_STYLE}>
              <span style={COLUMN_HEADING_STYLE}>Legal</span>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
            </div>

            {/* Social */}
            <div style={COLUMN_STYLE}>
              <span style={COLUMN_HEADING_STYLE}>Connect</span>
              <FooterLink href="#">LinkedIn</FooterLink>
              <FooterLink href="#">X (Twitter)</FooterLink>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 20,
            color: "#64748b",
            fontSize: 13,
          }}
        >
          &copy; 2026 Integrity Quality Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
