"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

// ─── LedgerRow ──────────────────────────────────────────────────────────────
// Hairline-divided list row. The default treatment for any list of items.
// Reserve a boxed surface only for the ONE hero element per screen.
export function LedgerRow({
  icon,
  title,
  subtitle,
  trailing,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3 text-left border-b border-line last:border-b-0"
    >
      <div className="text-navy">{icon}</div>
      <div className="flex-1">
        <div className="text-ink text-[13.5px] font-semibold">{title}</div>
        {subtitle && <div className="text-ink-faint text-xs leading-relaxed">{subtitle}</div>}
      </div>
      {trailing ?? <ChevronRight size={16} className="text-ink-faint" />}
    </button>
  );
}

// ─── AuditRow ────────────────────────────────────────────────────────────────
// Ledger row with a trailing badge instead of chevron.
// Used in the Nyay audit log (signals ingested / never used).
export function AuditRow({
  icon,
  title,
  body,
  badge,
  badgeTone = "emerald",
}: {
  icon: ReactNode;
  title: string;
  body?: string;
  badge: string;
  badgeTone?: "emerald" | "vermilion";
}) {
  const badgeClasses =
    badgeTone === "emerald"
      ? "bg-emerald-soft text-emerald"
      : "bg-vermilion-soft text-vermilion";
  return (
    <div className="flex items-start gap-3 py-3 border-b border-line last:border-b-0">
      <div className="text-navy mt-0.5 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-ink text-[13.5px] font-semibold">{title}</div>
        {body && <div className="text-ink-faint text-xs mt-0.5">{body}</div>}
      </div>
      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${badgeClasses}`}>
        {badge}
      </span>
    </div>
  );
}

// ─── ConsentRow ──────────────────────────────────────────────────────────────
// Toggle row for the consent manager. Fully accessible switch.
export function ConsentRow({
  icon,
  title,
  body,
  defaultOn = true,
  onToggle,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  defaultOn?: boolean;
  onToggle?: (on: boolean) => void;
}) {
  const [on, setOn] = useState(defaultOn);
  const toggle = () => {
    const next = !on;
    setOn(next);
    onToggle?.(next);
  };
  return (
    <div className="flex items-start gap-3 py-3 border-b border-line last:border-b-0">
      <div className="text-navy mt-0.5 shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-ink text-[13.5px] font-semibold">{title}</div>
        <div className="text-ink-faint text-xs mt-0.5">{body}</div>
        <div
          className={`flex items-center gap-1 mt-1.5 text-[11px] font-semibold ${
            on ? "text-emerald" : "text-ink-faint"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${on ? "bg-emerald" : "bg-ink-faint"}`} />
          {on ? "Active protection" : "Permission paused"}
        </div>
      </div>
      <button
        role="switch"
        aria-checked={on}
        onClick={toggle}
        className={`relative w-11 h-6 rounded-full shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-azure mt-0.5 ${
          on ? "bg-navy" : "bg-line"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

// ─── ScoreRing ───────────────────────────────────────────────────────────────
// Circular progress ring for Sahara financial health score.
// score: 0–100. tone: "emerald" | "amber" | "vermilion"
export function ScoreRing({
  score,
  tone = "emerald",
}: {
  score: number;
  tone?: "emerald" | "amber" | "vermilion";
}) {
  const r = 40;
  const circ = 2 * Math.PI * r; // ≈ 251.33
  const offset = circ - (score / 100) * circ;
  const color =
    tone === "emerald"
      ? "#0E7C5A"
      : tone === "amber"
      ? "#9A5B00"
      : "#B3261E";
  return (
    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#E5E7F0" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[22px] font-bold text-ink tabular leading-none">{score}</span>
        <span className="text-[10px] text-ink-faint font-medium">/ 100</span>
      </div>
    </div>
  );
}

// ─── VerdictShell ────────────────────────────────────────────────────────────
// Hero shell for Vivek's four decision states.
const tones = {
  emerald: { bg: "bg-emerald-soft", fg: "text-emerald" },
  azure: { bg: "bg-azure-soft", fg: "text-azure" },
  navy: { bg: "bg-navy-soft", fg: "text-navy" },
  amber: { bg: "bg-amber-soft", fg: "text-amber" },
} as const;

export function VerdictShell({
  tone,
  icon,
  eyebrow,
  headline,
  children,
}: {
  tone: keyof typeof tones;
  icon: ReactNode;
  eyebrow: string;
  headline: string;
  children?: ReactNode;
}) {
  const t = tones[tone];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className={`${t.bg} w-[30px] h-[30px] rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <span className={`${t.fg} text-xs font-bold`}>{eyebrow}</span>
      </div>
      <div className="text-ink text-[17px] font-bold leading-snug">{headline}</div>
      {children}
    </div>
  );
}
