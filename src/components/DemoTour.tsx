"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TOUR_STEPS, PORTAL_COLORS } from "@/lib/demo-tour-steps";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function DemoTour() {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<Rect | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [ready, setReady] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const step = TOUR_STEPS[stepIndex];
  const accentColor = step ? PORTAL_COLORS[step.portal] ?? "#1d4ed8" : "#1d4ed8";

  // Listen for tour start event + URL param
  useEffect(() => {
    const handler = () => {
      setStepIndex(0);
      setActive(true);
      setReady(false);
    };
    window.addEventListener("start-demo-tour", handler);
    if (new URLSearchParams(window.location.search).get("tour") === "true") {
      handler();
    }
    return () => window.removeEventListener("start-demo-tour", handler);
  }, []);

  const findTarget = useCallback(() => {
    if (!step) return;
    if (pollRef.current) clearInterval(pollRef.current);

    if (!step.selector) {
      setTargetRect(null);
      setReady(true);
      return;
    }

    let attempts = 0;
    pollRef.current = setInterval(() => {
      const el = document.querySelector(step.selector!);
      if (el) {
        clearInterval(pollRef.current);
        const rect = el.getBoundingClientRect();
        const pad = 8;
        setTargetRect({
          top: rect.top - pad + window.scrollY,
          left: rect.left - pad + window.scrollX,
          width: rect.width + pad * 2,
          height: rect.height + pad * 2,
        });
        setReady(true);
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      attempts++;
      if (attempts > 40) {
        clearInterval(pollRef.current);
        setTargetRect(null);
        setReady(true);
      }
    }, 100);
  }, [step]);

  // Navigate to step's page if needed
  useEffect(() => {
    if (!active || !step) return;
    if (pathname !== step.path) {
      setReady(false);
      setTargetRect(null);
      router.push(step.path);
    } else {
      findTarget();
    }
  }, [active, stepIndex, pathname, step, router, findTarget]);

  // Compute tooltip position
  useEffect(() => {
    if (!ready || !step) return;
    const tooltipW = 380;
    const tooltipH = 200;
    const gap = 16;

    if (!targetRect) {
      setTooltipPos({
        top: window.innerHeight / 2 - tooltipH / 2,
        left: window.innerWidth / 2 - tooltipW / 2,
      });
      return;
    }

    let top = 0;
    let left = 0;
    const pos = step.position;

    if (pos === "bottom") {
      top = targetRect.top + targetRect.height + gap;
      left = targetRect.left + targetRect.width / 2 - tooltipW / 2;
    } else if (pos === "top") {
      top = targetRect.top - tooltipH - gap;
      left = targetRect.left + targetRect.width / 2 - tooltipW / 2;
    } else if (pos === "right") {
      top = targetRect.top + targetRect.height / 2 - tooltipH / 2;
      left = targetRect.left + targetRect.width + gap;
    } else {
      top = targetRect.top + targetRect.height / 2 - tooltipH / 2;
      left = targetRect.left - tooltipW - gap;
    }

    // Clamp to viewport
    left = Math.max(16, Math.min(left, window.innerWidth - tooltipW - 16));
    top = Math.max(16, Math.min(top, window.innerHeight - tooltipH - 16));

    setTooltipPos({ top, left });
  }, [ready, targetRect, step]);

  const close = useCallback(() => {
    setActive(false);
    setReady(false);
    setTargetRect(null);
    if (pollRef.current) clearInterval(pollRef.current);
  }, []);

  const next = useCallback(() => {
    if (stepIndex < TOUR_STEPS.length - 1) {
      setReady(false);
      setStepIndex((i) => i + 1);
    } else {
      close();
    }
  }, [stepIndex, close]);

  const back = useCallback(() => {
    if (stepIndex > 0) {
      setReady(false);
      setStepIndex((i) => i - 1);
    }
  }, [stepIndex]);

  // Keyboard controls
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Enter") next();
      else if (e.key === "ArrowLeft") back();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, next, back, close]);

  if (!active || !step) return null;

  const isLast = stepIndex === TOUR_STEPS.length - 1;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 99999 }}>
      {/* Backdrop with cutout */}
      <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%" }} onClick={close}>
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && ready && (
              <rect
                x={targetRect.left}
                y={targetRect.top}
                width={targetRect.width}
                height={targetRect.height}
                rx={8}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#tour-mask)" />
      </svg>

      {/* Highlight border */}
      {targetRect && ready && (
        <div
          style={{
            position: "absolute",
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
            borderRadius: 8,
            border: `2px solid ${accentColor}`,
            boxShadow: `0 0 0 4px ${accentColor}33`,
            pointerEvents: "none",
            transition: "all 0.3s ease",
          }}
        />
      )}

      {/* Tooltip */}
      {ready && (
        <div
          style={{
            position: "fixed",
            top: tooltipPos.top,
            left: tooltipPos.left,
            width: 380,
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            overflow: "hidden",
            transition: "top 0.3s ease, left 0.3s ease",
          }}
        >
          <div style={{ height: 4, background: accentColor }} />
          <div style={{ padding: "20px 24px" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: accentColor,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {stepIndex + 1} of {TOUR_STEPS.length}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#0f172a",
                marginBottom: 8,
              }}
            >
              {step.title}
            </div>
            <p
              style={{
                fontSize: 14,
                color: "#475569",
                lineHeight: 1.6,
                margin: "0 0 20px",
              }}
            >
              {step.body}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={close}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  fontSize: 13,
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                Skip tour
              </button>
              <div style={{ display: "flex", gap: 8 }}>
                {stepIndex > 0 && (
                  <button
                    onClick={back}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "1px solid #e2e8f0",
                      background: "#fff",
                      color: "#334155",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={next}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 8,
                    border: "none",
                    background: accentColor,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {isLast ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
