"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Ban,
  TrendingUp,
  Scale,
  FileCode,
  Layers,
  ChevronRight,
  Info,
  Check,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

type DecisionState = "approved" | "conditional" | "deferred" | "suppressed";

interface WebVivekProps {
  lang: Lang;
}

const t = {
  en: {
    header: "Vivek Sovereign Intelligence",
    subheader: "Ethical Financial Decision State Machine",
    subtitleHi: "विवेक पारदर्शी निर्णय प्रणाली",
    subtitleGu: "વિવેક પારદર્શી નિર્ણય મેકિને",
    badge: "100% Deterministic • Zero Black-Box ML",
    states: { approved: "1. Approved (स्वीकृत)", conditional: "2. Conditional (सशर्त)", deferred: "3. Deferred (स्थगित)", suppressed: "4. Suppressed (रोक)" },
    approved: { tag: "Approved: Capital Expansion", headline: "Approved: ₹3,000 Nifty 50 Index SIP Allocation", subline: "Algorithmic validation passed: 3.2 months of liquidity secured; debt ratio < 20%", confidence: "98.4% Fiduciary Match", rule: "RULE_EXPANSION_STABLE_SURPLUS_V4", citation: "SEBI Master Circular (Investment Advisers) 2024 §6(A)", metrics: { reserve: "Reserve Coverage", debt: "Debt-to-Income", surplus: "Surplus Stability", commission: "Commission Load" }, explanation: "Vivek verified that your net surplus expanded by +20% over 2 consecutive monthly payroll cycles.",
    },
  },
};

export function WebVivek({ lang }: WebVivekProps) {
  const [activeState, setActiveState] = useState<DecisionState>("approved");
  const [liveDecision, setLiveDecision] = useState<any>(null);

  useEffect(() => {
    fetch("/api/v1/recommendations?persona=rahul")
      .then((res) => res.json())
      .then((data) => setLiveDecision(data))
      .catch((err) => console.error(err));
  }, []);

  const stateData = {
    approved: {
      tag: "Approved: Capital Expansion",
      statusColor: "emerald",
      headline: "Approved: ₹3,000 Nifty 50 Index SIP Allocation",
      subline: "Algorithmic validation passed: 3.2 months of liquidity secured; debt ratio < 20%",
      confidence: "98.4% Fiduciary Match",
      auditRule: "RULE_EXPANSION_STABLE_SURPLUS_V4",
      citation: "SEBI Master Circular (Investment Advisers) 2024 §6(A)",
      metrics: [
        { label: "Reserve Coverage", val: "3.2 Months", ok: true },
        { label: "Debt-to-Income", val: "16.3%", ok: true },
        { label: "Surplus Stability", val: "60 Days Continuous", ok: true },
        { label: "Commission Load", val: "0% (Direct Plan Only)", ok: true },
      ],
      explanation:
        "Vivek verified that your net surplus expanded by +20% over 2 consecutive monthly payroll cycles. Liquid emergency reserves exceed the statutory 3.0-month threshold. No predatory or revolving high-interest loans are active. Capital deployment into a low-cost, direct index plan is approved.",
    },
    conditional: {
      tag: "Conditional Approval",
      statusColor: "azure",
      headline: "Conditional: Add ₹4,800 to Liquid Reserve First",
      subline: "Direct investment unlocked once emergency buffer reaches 3.0 months",
      confidence: "87.1% Fiduciary Match",
      auditRule: "RULE_BUFFER_GATE_PREREQUISITE_V2",
      citation: "RBI Financial Inclusion Fiduciary Standard §12",
      metrics: [
        { label: "Reserve Coverage", val: "2.6 Months (Req: 3.0)", ok: false },
        { label: "Debt-to-Income", val: "22.1%", ok: true },
        { label: "Surplus Stability", val: "30 Days Continuous", ok: true },
        { label: "Required Buffer", val: "₹4,800 Top-up", ok: false },
      ],
      explanation:
        "Your surplus is healthy, but your liquid reserve currently sits at 2.6 months of essential living expenses (₹74,000 vs ₹78,800 required). To protect you from premature equity liquidation during family emergencies, Vivek mandates topping up the emergency buffer before equity deployment.",
    },
    deferred: {
      tag: "Deferred: Pending Cashflow",
      statusColor: "amber",
      headline: "Deferred: Awaiting Seasonal Invoice Settlement",
      subline: "Decision postponed 21 days until Gujarat State Khadi Board payment clears",
      confidence: "92.0% Fiduciary Guard",
      auditRule: "RULE_SEASONAL_INFLOW_VERIFICATION_V3",
      citation: "MSMED Act 2006 Delayed Payments Protocol §15",
      metrics: [
        { label: "Pending Inflow", val: "₹38,000 (Invoice #4401)", ok: true },
        { label: "Verification Status", val: "Awaiting TReDS Settlement", ok: false },
        { label: "Next Review Date", val: "Oct 2, 2026", ok: true },
        { label: "Advisory Action", val: "Hold Capital Outlays", ok: true },
      ],
      explanation:
        "The applicant operates in a seasonal handloom cluster where bulk trade receivables clear quarterly. Because incoming payments are currently un-deposited, Vivek defers new commitments to prevent short-term overdraft penalties.",
    },
    suppressed: {
      tag: "Suppressed: Debt Trap Shield",
      statusColor: "vermilion",
      headline: "Suppressed: 36% APR Instant Loan Blocked",
      subline: "Algorithmic shield engaged against predatory fintech lending solicitation",
      confidence: "99.9% Protective Interception",
      auditRule: "RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1",
      citation: "RBI Digital Lending Guidelines (DLG) 2022 §3(B)",
      metrics: [
        { label: "Commercial Offer", val: "₹50,000 'Instant' Credit", ok: false },
        { label: "Effective APR", val: "36.4% Hidden APR", ok: false },
        { label: "Existing Debt Burden", val: "58% Outflow Ratio", ok: false },
        { label: "Action Taken", val: "Solicitation Suppressed", ok: true },
      ],
      explanation:
        "An external aggregator attempted to present a 'Pre-Approved Instant Personal Loan' with a 36.4% effective interest rate while active debt already consumes 58% of monthly income. Vivek's sovereign guardrail suppressed the notification and triggered Sahara protective relief instead.",
    },
  };

  const current = stateData[activeState];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-azure text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-azure" />
              <span>Vivek Sovereign Algorithmic Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Ethical Financial Decision State Machine
              <span className="block text-azure text-xl sm:text-2xl font-semibold mt-1">
                विवेक पारदर्शी निर्णय प्रणाली
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-emerald-soft px-4 py-2 rounded-xl border border-emerald/20 text-xs font-bold text-emerald">
            <ShieldCheck className="w-4 h-4 text-emerald" />
            <span>100% Deterministic • Zero Black-Box ML</span>
          </div>
        </div>

        {/* State Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {(
            [
              { key: "approved", label: "1. Approved (स्वीकृत)", color: "border-emerald text-emerald" },
              { key: "conditional", label: "2. Conditional (सशर्त)", color: "border-azure text-azure" },
              { key: "deferred", label: "3. Deferred (स्थगित)", color: "border-amber text-amber" },
              { key: "suppressed", label: "4. Suppressed (रोक)", color: "border-vermilion text-vermilion" },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveState(item.key)}
              className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                activeState === item.key
                  ? `bg-white shadow-md ${item.color} border-2`
                  : "bg-canvas border-line text-ink-muted hover:bg-slate-100"
              }`}
            >
              <span>{item.label}</span>
              {activeState === item.key && <Check className="w-4 h-4 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main State Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
          <div className="flex flex-col gap-1">
            <span
              className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full w-fit ${
                activeState === "approved"
                  ? "bg-emerald-soft text-emerald"
                  : activeState === "conditional"
                  ? "bg-azure-soft text-azure"
                  : activeState === "deferred"
                  ? "bg-amber-soft text-amber"
                  : "bg-vermilion-soft text-vermilion"
              }`}
            >
              {current.tag}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">{current.headline}</h2>
            <p className="text-xs sm:text-sm text-ink-muted">{current.subline}</p>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="text-xs font-semibold text-ink-muted">Confidence Score</span>
            <span className="text-lg font-bold text-navy-deep font-tabular">
              {current.confidence}
            </span>
            <span className="text-[11px] text-ink-faint">Code: {current.auditRule}</span>
          </div>
        </div>

        {/* 4 Quantitative Validation Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {current.metrics.map((m, idx) => (
            <div key={idx} className="bg-canvas p-4 rounded-xl border border-line">
              <span className="text-xs text-ink-muted block">{m.label}</span>
              <span className="text-base font-bold text-ink font-tabular mt-1 block">{m.val}</span>
              <span
                className={`text-[11px] font-semibold mt-1 inline-flex items-center gap-1 ${
                  m.ok ? "text-emerald" : "text-amber"
                }`}
              >
                {m.ok ? "✓ Verified Pass" : "⚠ Threshold Gate"}
              </span>
            </div>
          ))}
        </div>

        {/* Algorithmic Explanation & Citation Box */}
        <div className="p-5 rounded-xl bg-canvas border border-line flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-ink">
            <Info className="w-4 h-4 text-azure" />
            <span>Mathematical Rationale (निर्णय का कारण)</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{current.explanation}</p>
          <div className="pt-2 border-t border-line-faint flex items-center justify-between text-[11px] text-ink-faint">
            <span>Regulatory Authority: {current.citation}</span>
            <span>Immutable Hash: sha256:7f9a88...c1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
