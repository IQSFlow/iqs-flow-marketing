"use client";

import { useState, useMemo, useCallback } from "react";

interface TrailPoint {
  lat: number;
  lon: number;
  capturedAt: string;
}

interface WorkerData {
  userId: string;
  name: string | null;
  email: string;
  trail: TrailPoint[];
}

interface TimelineSliderProps {
  workers: WorkerData[];
  onTimeChange: (timestamp: number | null) => void;
}

export default function TimelineSlider({ workers, onTimeChange }: TimelineSliderProps) {
  const [value, setValue] = useState(100); // 0-100 percent through the day
  const [isPlaying, setIsPlaying] = useState(false);
  const [playTimer, setPlayTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  // Compute day bounds from all worker trail data
  const { dayStart, dayEnd, totalMinutes } = useMemo(() => {
    const allTimes = workers
      .flatMap((w) => w.trail.map((p) => new Date(p.capturedAt).getTime()))
      .filter((t) => !isNaN(t));

    if (allTimes.length === 0) {
      const now = new Date();
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      return { dayStart: start.getTime(), dayEnd: end.getTime(), totalMinutes: 1440 };
    }

    const min = Math.min(...allTimes);
    const max = Math.max(...allTimes);
    // Expand to at least +-30 min
    const padded = 30 * 60 * 1000;
    return {
      dayStart: min - padded,
      dayEnd: Math.max(max + padded, Date.now()),
      totalMinutes: Math.ceil((max - min + 2 * padded) / 60000),
    };
  }, [workers]);

  const currentTimestamp = useMemo(() => {
    return dayStart + (value / 100) * (dayEnd - dayStart);
  }, [value, dayStart, dayEnd]);

  const timeLabel = useMemo(() => {
    if (value === 100) return "Now (Live)";
    const d = new Date(currentTimestamp);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, [value, currentTimestamp]);

  // Count active workers at current time
  const activeCount = useMemo(() => {
    if (value === 100) return workers.length;
    return workers.filter((w) =>
      w.trail.some((p) => new Date(p.capturedAt).getTime() <= currentTimestamp)
    ).length;
  }, [workers, value, currentTimestamp]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      setValue(v);
      if (v === 100) {
        onTimeChange(null); // null means "live/current"
      } else {
        onTimeChange(dayStart + (v / 100) * (dayEnd - dayStart));
      }
    },
    [dayStart, dayEnd, onTimeChange]
  );

  const togglePlay = useCallback(() => {
    if (isPlaying && playTimer) {
      clearInterval(playTimer);
      setPlayTimer(null);
      setIsPlaying(false);
      return;
    }

    // Start playing from current position (or beginning if at end)
    let current = value === 100 ? 0 : value;
    setValue(current);
    setIsPlaying(true);

    const timer = setInterval(() => {
      current += 0.5;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setPlayTimer(null);
        setIsPlaying(false);
      }
      setValue(current);
      if (current === 100) {
        onTimeChange(null);
      } else {
        onTimeChange(dayStart + (current / 100) * (dayEnd - dayStart));
      }
    }, 100);

    setPlayTimer(timer);
  }, [isPlaying, playTimer, value, dayStart, dayEnd, onTimeChange]);

  // Generate hour markers
  const hourMarkers = useMemo(() => {
    const markers: { position: number; label: string }[] = [];
    const startHour = new Date(dayStart);
    startHour.setMinutes(0, 0, 0);
    let h = new Date(startHour.getTime() + 3600000); // next whole hour
    while (h.getTime() < dayEnd) {
      const pos = ((h.getTime() - dayStart) / (dayEnd - dayStart)) * 100;
      if (pos > 2 && pos < 98) {
        markers.push({
          position: pos,
          label: h.toLocaleTimeString([], { hour: "numeric" }),
        });
      }
      h = new Date(h.getTime() + 3600000);
    }
    return markers;
  }, [dayStart, dayEnd]);

  if (workers.length === 0) return null;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: "14px 18px",
        marginBottom: 14,
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={togglePlay}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: isPlaying ? "#ef4444" : "#3b82f6",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s",
            }}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#fff">
                <rect x="1" y="1" width="4" height="10" rx="1" />
                <rect x="7" y="1" width="4" height="10" rx="1" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#fff">
                <polygon points="2,0 12,6 2,12" />
              </svg>
            )}
          </button>
          <div>
            <div
              style={{
                fontSize: 11,
                color: "#64748b",
                fontWeight: 600,
                textTransform: "uppercase" as const,
                letterSpacing: "0.06em",
              }}
            >
              Worker Timeline
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>
              {timeLabel}
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: value === 100 ? "#22c55e" : "#94a3b8",
            }}
          />
          {activeCount} worker{activeCount !== 1 ? "s" : ""} visible
        </div>
      </div>

      {/* Slider */}
      <div style={{ position: "relative", paddingBottom: 18 }}>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={value}
          onChange={handleChange}
          style={{
            width: "100%",
            height: 6,
            appearance: "none",
            WebkitAppearance: "none",
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${value}%, #e2e8f0 ${value}%, #e2e8f0 100%)`,
            borderRadius: 3,
            outline: "none",
            cursor: "pointer",
          }}
        />
        {/* Hour markers */}
        <div style={{ position: "relative", height: 14 }}>
          {hourMarkers.map((m) => (
            <span
              key={m.label}
              style={{
                position: "absolute",
                left: `${m.position}%`,
                transform: "translateX(-50%)",
                fontSize: 9,
                color: "#94a3b8",
                top: 2,
              }}
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Jump buttons */}
      <div style={{ display: "flex", gap: 6 }}>
        {[
          { label: "6 AM", hour: 6 },
          { label: "9 AM", hour: 9 },
          { label: "12 PM", hour: 12 },
          { label: "3 PM", hour: 15 },
          { label: "6 PM", hour: 18 },
          { label: "Now", hour: -1 },
        ].map(({ label, hour }) => (
          <button
            key={label}
            onClick={() => {
              if (hour === -1) {
                setValue(100);
                onTimeChange(null);
              } else {
                const target = new Date(dayStart);
                target.setHours(hour, 0, 0, 0);
                const pos = ((target.getTime() - dayStart) / (dayEnd - dayStart)) * 100;
                const clamped = Math.max(0, Math.min(100, pos));
                setValue(clamped);
                onTimeChange(target.getTime());
              }
            }}
            style={{
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 500,
              borderRadius: 6,
              border: "1px solid #e2e8f0",
              background: label === "Now" && value === 100 ? "#3b82f6" : "#fff",
              color: label === "Now" && value === 100 ? "#fff" : "#64748b",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
