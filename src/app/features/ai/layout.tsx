import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Powered Operations",
  description: "How IQS Flow uses AI for smart scheduling, anomaly detection, predictive maintenance, and automated reporting.",
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
