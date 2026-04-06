"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          {/* Question row */}
          <div
            onClick={() => handleToggle(index)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <span
              style={{
                color: "#0f172a",
                fontSize: 16,
                fontWeight: 600,
                flex: 1,
                paddingRight: 16,
              }}
            >
              {item.question}
            </span>
            <span
              style={{
                color: "#94a3b8",
                fontSize: 20,
                fontWeight: 400,
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              {openIndex === index ? "−" : "+"}
            </span>
          </div>

          {/* Answer */}
          <div
            style={{
              maxHeight: openIndex === index ? 200 : 0,
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            <div
              style={{
                color: "#475569",
                fontSize: 14,
                lineHeight: 1.6,
                paddingBottom: 20,
              }}
            >
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
