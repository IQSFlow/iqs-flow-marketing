import type { Metadata, Viewport } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iqsflow.com"),
  title: {
    default: "IQS Flow - Quality Oversight Across Every Site",
    template: "%s | IQS Flow",
  },
  description: "Real-time visibility into service quality, compliance, and workforce performance.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "IQS Flow - Quality Oversight Across Every Site",
    description: "Real-time visibility into service quality, compliance, and workforce performance.",
    url: "https://iqsflow.com",
    siteName: "IQS Flow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQS Flow - Quality Oversight Across Every Site",
    description: "Real-time visibility into service quality, compliance, and workforce performance.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${sourceSerif.variable}`}>{children}</body>
    </html>
  );
}
