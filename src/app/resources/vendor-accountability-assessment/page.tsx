"use client";

import { useState } from "react";
import Link from "next/link";
import MarketingNav from "@/components/MarketingNav";
import MarketingFooter from "@/components/MarketingFooter";
import { CheckCircle, ChevronRight, ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { label: string; value: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How do you currently verify cleaning quality at your sites?",
    options: [
      { label: "Vendor provides reports", value: 1 },
      { label: "We do sporadic site visits", value: 2 },
      { label: "Scheduled manual audits", value: 3 },
      { label: "Digital inspection app", value: 4 },
      { label: "Real-time GPS-verified digital inspections", value: 5 },
    ],
  },
  {
    id: 2,
    text: "Can you compare performance across all your cleaning vendors in one view?",
    options: [
      { label: "No, each vendor is managed separately", value: 1 },
      { label: "Partially, with manual consolidation", value: 3 },
      { label: "Yes, in a unified dashboard", value: 5 },
    ],
  },
  {
    id: 3,
    text: "How quickly do you find out about a missed cleaning?",
    options: [
      { label: "Monthly report", value: 1 },
      { label: "Weekly summary", value: 2 },
      { label: "Next business day", value: 3 },
      { label: "Same day", value: 4 },
      { label: "Real-time alert", value: 5 },
    ],
  },
  {
    id: 4,
    text: "Do you have quality data that is independent from vendor self-reporting?",
    options: [
      { label: "No, we rely on vendor reports", value: 1 },
      { label: "Sometimes we verify independently", value: 3 },
      { label: "Yes, all quality data is independently collected", value: 5 },
    ],
  },
  {
    id: 5,
    text: "Can you prove a cleaning was completed with location and time evidence?",
    options: [
      { label: "No", value: 1 },
      { label: "Sometimes, if we happened to be there", value: 3 },
      { label: "Yes, GPS and timestamp for every task", value: 5 },
    ],
  },
  {
    id: 6,
    text: "How do you handle vendor disputes about service delivery?",
    options: [
      { label: "Based on memory and conversation", value: 1 },
      { label: "Some records but often unclear", value: 3 },
      { label: "GPS location data and photo evidence", value: 5 },
    ],
  },
  {
    id: 7,
    text: "Are your compliance scores calculated automatically?",
    options: [
      { label: "No, we calculate manually", value: 1 },
      { label: "Partially automated", value: 3 },
      { label: "Fully automated in real-time", value: 5 },
    ],
  },
  {
    id: 8,
    text: "Can your clients see quality data in real-time?",
    options: [
      { label: "No client visibility", value: 1 },
      { label: "We send reports on request", value: 3 },
      { label: "Clients have a self-serve portal", value: 5 },
    ],
  },
  {
    id: 9,
    text: "How many separate tools do you use to manage vendor oversight?",
    options: [
      { label: "4 or more", value: 1 },
      { label: "3 tools", value: 2 },
      { label: "2 tools", value: 3 },
      { label: "1 unified platform", value: 5 },
    ],
  },
  {
    id: 10,
    text: "Do you have trend data showing quality improvement or decline over time?",
    options: [
      { label: "No historical data", value: 1 },
      { label: "Basic records", value: 3 },
      { label: "Detailed trend analysis with benchmarks", value: 5 },
    ],
  },
];

interface ScoreCategory {
  label: string;
  color: string;
  bg: string;
  description: string;
}

function getCategory(score: number): ScoreCategory {
  if (score >= 40) {
    return {
      label: "Oversight Leader",
      color: "#059669",
      bg: "#dcfce7",
      description:
        "Your vendor oversight program is operating at a high level of maturity. You have independent verification, real-time visibility, and the data infrastructure to hold vendors accountable with evidence. The opportunity now is to deepen trend analysis and extend these capabilities to any remaining gaps.",
    };
  }
  if (score >= 25) {
    return {
      label: "Making Progress",
      color: "#d97706",
      bg: "#fef3c7",
      description:
        "You have meaningful oversight capabilities in place but there are significant gaps that create risk and limit your ability to resolve disputes quickly. Focused investment in the areas below will move you to Oversight Leader status and meaningfully reduce your exposure.",
    };
  }
  return {
    label: "Blind Spot Risk",
    color: "#dc2626",
    bg: "#fee2e2",
    description:
      "Your current oversight program relies heavily on vendor self-reporting, which creates substantial exposure to phantom completions, slow dispute resolution, and undetected quality decline. The recommendations below represent the highest-impact starting points for building an independent verification capability.",
  };
}

const RECOMMENDATIONS: Record<number, string> = {
  1: "Implement an independent inspection program where your operations team collects quality data directly, separate from vendor reports.",
  2: "Deploy a unified vendor management dashboard so you can compare performance across all vendors using consistent, standardized metrics.",
  3: "Set up real-time alerting on inspection scores so missed cleanings surface immediately rather than appearing in a delayed report.",
  4: "Establish an independent quality data collection process so your performance records are not derived from the party whose performance you are measuring.",
  5: "Add GPS and timestamp verification to your task completion records so you can prove service delivery with objective evidence.",
  6: "Build a GPS-verified inspection record system that provides location and time evidence to anchor vendor dispute resolution.",
  7: "Automate compliance score calculation so you have a current, real-time picture of performance rather than a manually assembled snapshot.",
  8: "Create a client-facing quality portal so your clients can access performance data directly rather than waiting for reports.",
  9: "Consolidate your vendor oversight tools into a single platform to reduce manual reconciliation and improve data consistency.",
  10: "Implement trend tracking with historical benchmarks so you can distinguish improving vendors from declining ones before issues escalate.",
};

function getRecommendations(answers: Record<number, number>): { questionId: number; text: string }[] {
  const sorted = Object.entries(answers)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3);
  return sorted.map(([id]) => ({ questionId: Number(id), text: RECOMMENDATIONS[Number(id)] }));
}

export default function VendorAccountabilityAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + (selectedOption !== null ? 1 : 0)) / QUESTIONS.length) * 100;
  const total = Object.values(answers).reduce((sum, v) => sum + v, 0);

  function handleSelect(value: number) {
    setSelectedOption(value);
  }

  function handleNext() {
    if (selectedOption === null) return;
    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setCompleted(true);
    }
  }

  if (completed) {
    const finalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const category = getCategory(finalScore);
    const recommendations = getRecommendations(answers);

    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: 'var(--font-sans), sans-serif' }}>
        <MarketingNav />
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "64px 24px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: category.bg,
                marginBottom: 20,
              }}
            >
              <CheckCircle size={36} color={category.color} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Assessment Complete
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: category.color,
                lineHeight: 1,
                marginBottom: 8,
                letterSpacing: "-3px",
              }}
            >
              {finalScore}
            </div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16 }}>out of 50</div>
            <div
              style={{
                display: "inline-block",
                padding: "6px 18px",
                borderRadius: 999,
                background: category.bg,
                color: category.color,
                fontSize: 15,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              {category.label}
            </div>
            <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.7, maxWidth: 500, margin: "0 auto" }}>
              {category.description}
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "32px",
              border: "1px solid #e2e8f0",
              marginBottom: 32,
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
              Your Top 3 Recommendations
            </h3>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>
              Based on your lowest-scoring answers, these actions will have the highest impact.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {recommendations.map((rec, i) => (
                <div
                  key={rec.questionId}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "16px",
                    background: "#f8fafc",
                    borderRadius: 10,
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#2563eb",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.6, margin: 0 }}>{rec.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
              borderRadius: 16,
              padding: "32px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>See how IQS Flow addresses these gaps</h3>
            <p style={{ fontSize: 15, color: "#94a3b8", marginBottom: 24, lineHeight: 1.6 }}>
              Get a personalized walkthrough based on your assessment results.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                background: "#2563eb",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Request a Demo
            </Link>
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button
              onClick={() => {
                setAnswers({});
                setCurrentQuestion(0);
                setSelectedOption(null);
                setCompleted(false);
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: 14,
                color: "#64748b",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Retake the assessment
            </button>
          </div>
        </main>
        <MarketingFooter />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: 'var(--font-sans), sans-serif' }}>
      <MarketingNav />

      {/* Progress bar */}
      <div style={{ width: "100%", height: 4, background: "#e2e8f0", position: "sticky", top: 57, zIndex: 50 }}>
        <div
          style={{
            height: "100%",
            background: "#2563eb",
            width: `${progress}%`,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px 80px" }}>
        <Link
          href="/resources"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#2563eb", textDecoration: "none", marginBottom: 40 }}
        >
          <ArrowLeft size={14} /> Back to Resources
        </Link>

        {/* Header (shown only on first question) */}
        {currentQuestion === 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
              Free Assessment
            </div>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, color: "#0f172a", letterSpacing: "-1px", lineHeight: 1.2, marginBottom: 12 }}>
              Vendor Accountability Score
            </h1>
            <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.7 }}>
              Answer 10 questions to benchmark your vendor oversight maturity. Takes about 2 minutes.
            </p>
          </div>
        )}

        {/* Progress indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
          <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </span>
          <div style={{ flex: 1, height: 2, background: "#e2e8f0", borderRadius: 1 }}>
            <div
              style={{
                height: "100%",
                background: "#2563eb",
                borderRadius: 1,
                width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Question card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "32px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            marginBottom: 24,
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", lineHeight: 1.4, marginBottom: 24 }}>
            {question.text}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {question.options.map((option) => {
              const isSelected = selectedOption === option.value;
              const isHovered = hoveredOption === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHoveredOption(option.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 18px",
                    borderRadius: 10,
                    border: isSelected ? "2px solid #2563eb" : isHovered ? "2px solid #93c5fd" : "2px solid #e2e8f0",
                    background: isSelected ? "#eff6ff" : isHovered ? "#f8fafc" : "#fff",
                    cursor: "pointer",
                    fontSize: 15,
                    color: isSelected ? "#1d4ed8" : "#334155",
                    fontWeight: isSelected ? 600 : 400,
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <span>{option.label}</span>
                  {isSelected && <CheckCircle size={18} color="#2563eb" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          style={{
            width: "100%",
            padding: "14px 24px",
            background: selectedOption !== null ? "#2563eb" : "#cbd5e1",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            cursor: selectedOption !== null ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "background 0.15s ease",
          }}
        >
          {currentQuestion < QUESTIONS.length - 1 ? "Next Question" : "See My Results"}
          <ChevronRight size={18} />
        </button>

        {/* Running score hint */}
        {Object.keys(answers).length > 0 && (
          <p style={{ textAlign: "center", fontSize: 13, color: "#94a3b8", marginTop: 16 }}>
            {Object.keys(answers).length} of {QUESTIONS.length} answered
          </p>
        )}
      </main>
      <MarketingFooter />
    </div>
  );
}
