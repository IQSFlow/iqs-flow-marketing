"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/why-iqs", label: "Why IQS" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const RESOURCES_ITEMS = [
  { href: "/resources", label: "Blog" },
  { href: "/developers", label: "API Documentation" },
  { href: "/resources/vendor-accountability-assessment", label: "Vendor Accountability Score" },
];

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 14,
        color: hovered ? "#2563eb" : "#475569",
        textDecoration: "none",
        padding: "8px 14px",
        borderRadius: 6,
        fontWeight: 500,
        transition: "color 0.15s",
      }}
    >
      {label}
    </Link>
  );
}

function ResourcesDropdown() {
  const [open, setOpen] = useState(false);
  const [labelHovered, setLabelHovered] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onMouseEnter={() => setLabelHovered(true)}
        onMouseLeave={() => setLabelHovered(false)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 14,
          color: labelHovered || open ? "#2563eb" : "#475569",
          padding: "8px 14px",
          borderRadius: 6,
          fontWeight: 500,
          transition: "color 0.15s",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        Resources
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s",
          }}
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            paddingTop: 4,
            zIndex: 100,
          }}
        >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            minWidth: 210,
            padding: "6px 0",
          }}
        >
          {RESOURCES_ITEMS.map((item) => (
            <ResourcesDropdownItem key={item.href} href={item.href} label={item.label} />
          ))}
        </div>
        </div>
      )}
    </div>
  );
}

function ResourcesDropdownItem({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        padding: "9px 18px",
        fontSize: 14,
        color: hovered ? "#2563eb" : "#475569",
        textDecoration: "none",
        fontWeight: 500,
        transition: "color 0.15s",
        background: hovered ? "#f8fafc" : "transparent",
      }}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        fontSize: 15,
        color: hovered ? "#2563eb" : "#475569",
        textDecoration: "none",
        padding: "14px 32px",
        fontWeight: 500,
        transition: "color 0.15s",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      {label}
    </Link>
  );
}

export default function MarketingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInHovered, setSignInHovered] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid #e2e8f0",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Main nav bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 32px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <Image src="/logo.png" alt="IQS Flow" width={126} height={36} priority />
        </Link>

        {/* Desktop links: hidden below 768px via inline style trick */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          className="marketing-nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <ResourcesDropdown />
          <Link
            href="https://app.iqsflow.com/login"
            onMouseEnter={() => setSignInHovered(true)}
            onMouseLeave={() => setSignInHovered(false)}
            style={{
              padding: "10px 20px",
              background: signInHovered ? "#1d4ed8" : "#2563eb",
              color: "#fff",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              marginLeft: 12,
              transition: "background 0.15s",
              display: "inline-block",
            }}
          >
            Sign In
          </Link>
        </div>

        {/* Hamburger button: hidden above 768px */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="marketing-nav-hamburger"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <div
            style={{
              width: 22,
              height: 2,
              background: "#0f172a",
              borderRadius: 2,
              transition: "transform 0.2s, opacity 0.2s",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <div
            style={{
              width: 22,
              height: 2,
              background: "#0f172a",
              borderRadius: 2,
              transition: "opacity 0.2s",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <div
            style={{
              width: 22,
              height: 2,
              background: "#0f172a",
              borderRadius: 2,
              transition: "transform 0.2s, opacity 0.2s",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div
          className="marketing-nav-mobile-panel"
          style={{
            background: "#fff",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          {NAV_LINKS.map((link) => (
            <MobileNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={closeMenu}
            />
          ))}
          {RESOURCES_ITEMS.map((item) => (
            <MobileNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={closeMenu}
            />
          ))}
          <div style={{ padding: "14px 32px" }}>
            <Link
              href="https://app.iqsflow.com/login"
              onClick={closeMenu}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "#2563eb",
                color: "#fff",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}

      {/* Responsive style rules */}
      <style>{`
        .marketing-nav-desktop {
          display: flex;
        }
        .marketing-nav-hamburger {
          display: none;
        }
        .marketing-nav-mobile-panel {
          display: none;
        }
        @media (max-width: 767px) {
          .marketing-nav-desktop {
            display: none !important;
          }
          .marketing-nav-hamburger {
            display: flex !important;
          }
          .marketing-nav-mobile-panel {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
