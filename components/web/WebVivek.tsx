"use client";

import { useState } from "react";
import { Sparkles, ShieldCheck, Info, Check } from "lucide-react";
import type { Lang } from "@/components/TopBar";

type DecisionState = "approved" | "conditional" | "deferred" | "suppressed";
interface WebVivekProps { lang: Lang; }

const stateData = {
  approved: {
    tag: "Approved: Capital Expansion",
    headline: "Approved: ₹3,000 Nifty 50 Index SIP Allocation",
    subline: "Algorithmic validation passed: 3.2 months liquidity secured; debt ratio < 20%",
    confidence: "98.4% Fiduciary Match",
    auditRule: "RULE_EXPANSION_STABLE_SURPLUS_V4",
    citation: "SEBI Master Circular (Investment Advisers) 2024 §6(A)",
    badgeClass: "bg-emerald-soft text-emerald",
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
    headline: "Conditional: Add ₹4,800 to Liquid Reserve First",
    subline: "Direct investment unlocked once emergency buffer reaches 3.0 months",
    confidence: "87.1% Fiduciary Match",
    auditRule: "RULE_BUFFER_GATE_PREREQUISITE_V2",
    citation: "RBI Financial Inclusion Fiduciary Standard §12",
    badgeClass: "bg-azure-soft text-azure",
    metrics: [
      { label: "Reserve Coverage", val: "2.6 Months (Req: 3.0)", ok: false },
      { label: "Debt-to-Income", val: "22.1%", ok: true },
      { label: "Surplus Stability", val: "30 Days Continuous", ok: true },
      { label: "Required Buffer", val: "₹4,800 Top-up", ok: false },
    ],
    explanation:
      "Your surplus is healthy, but your liquid reserve currently sits at 2.6 months (₹74,000 vs ₹78,800 required). To protect you from premature equity liquidation during family emergencies, Vivek mandates topping up the emergency buffer before equity deployment.",
  },
  deferred: {
    tag: "Deferred: Pending Cashflow",
    headline: "Deferred: Awaiting Seasonal Invoice Settlement",
    subline: "Decision postponed 21 days until Gujarat State Khadi Board payment clears",
    confidence: "92.0% Fiduciary Guard",
    auditRule: "RULE_SEASONAL_INFLOW_VERIFICATION_V3",
    citation: "MSMED Act 2006 Delayed Payments Protocol §15",
    badgeClass: "bg-amber-soft text-amber",
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
    headline: "Suppressed: 36% APR Instant Loan Blocked",
    subline: "Algorithmic shield engaged against predatory fintech lending solicitation",
    confidence: "99.9% Protective Interception",
    auditRule: "RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1",
    citation: "RBI Digital Lending Guidelines (DLG) 2022 §3(B)",
    badgeClass: "bg-vermilion-soft text-vermilion",
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

const tabs = [
  { key: "approved" as const, label: "1. Approved (स्वीकृत)", border: "border-emerald text-emerald" },
  { key: "conditional" as const, label: "2. Conditional (सशर्त)", border: "border-azure text-azure" },
  { key: "deferred" as const, label: "3. Deferred (स्थगित)", border: "border-amber text-amber" },
  { key: "suppressed" as const, label: "4. Suppressed (रोक)", border: "border-vermilion text-vermilion" },
];

export function WebVivek({ lang }: WebVivekProps) {
  const [activeState, setActiveState] = useState<DecisionState>("approved");
  const current = stateData[activeState];

  const ui = {
    en: { header: "Vivek Sovereign Algorithmic Intelligence", title: "Ethical Financial Decision State Machine", titleSub: "विवेक पारदर्शी निर्णय प्रणाली", badge: "100% Deterministic • Zero Black-Box ML", rationale: "Mathematical Rationale (निर्णय का कारण)", regulatory: "Regulatory Authority:", immutable: "Immutable Hash:", confidence: "Confidence Score", pass: "✓ Verified Pass", threshold: "⚠ Threshold Gate" },
    hi: { header: "विवेक संप्रभु एल्गोरिदमिक इंटेलिजेंस", title: "नैतिक वित्तीय निर्णय स्टेट मशीन", titleSub: "विवेक पारदर्शी निर्णय प्रणाली", badge: "100% नियतात्मक • शून्य ब्लैक-बॉक्स ML", rationale: "गणितीय तर्क (निर्णय का कारण)", regulatory: "नियामक प्राधिकरण:", immutable: "अपरिवर्तनीय हैश:", confidence: "विश्वास स्कोर", pass: "✓ सत्यापित पास", threshold: "⚠ सीमा गेट" },
    gu: { header: "વિવેક સ્વાયત્ત અલ્ગોરિધમિક ઇન્ટેલિજન્સ", title: "નૈતિક નાણાકીય નિર્ણય સ્ટેટ મશીન", titleSub: "વિવેક પારદર્શક નિર્ણય પ્રણાલી", badge: "૧૦૦% સ્પષ્ટ • શૂન્ય બ્લેક-બોક્સ ML", rationale: "ગાણિતિક કારણ (નિર્ણયનો આધાર)", regulatory: "નિયમનકારી સત્તા:", immutable: "અપરિવર્તનીય હેશ:", confidence: "વિશ્વાસ સ્કોર", pass: "✓ ચકાસાયેલ પાસ", threshold: "⚠ મર્યાદા ગેટ", },
  }[lang] ?? { header: "Vivek Sovereign Algorithmic Intelligence", title: "Ethical Financial Decision State Machine", titleSub: "विवेक पारदर्शी निर्णय प्रणाली", badge: "100% Deterministic • Zero Black-Box ML", rationale: "Mathematical Rationale (निर्णय का कारण)", regulatory: "Regulatory Authority:", immutable: "Immutable Hash:", confidence: "Confidence Score", pass: "✓ Verified Pass", threshold: "⚠ Threshold Gate" };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-azure text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-azure" />
              <span>{ui.header}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {ui.title}
              <span className="block text-azure text-xl sm:text-2xl font-semibold mt-1">
                {ui.titleSub}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-emerald-soft px-4 py-2 rounded-xl border border-emerald/20 text-xs font-bold text-emerald">
            <ShieldCheck className="w-4 h-4 text-emerald" />
            <span>{ui.badge}</span>
          </div>
        </div>

        {/* State Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {tabs.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveState(item.key)}
              className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                activeState === item.key
                  ? `bg-white shadow-md ${item.border} border-2`
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
            <span className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full w-fit ${current.badgeClass}`}>
              {current.tag}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">{current.headline}</h2>
            <p className="text-xs sm:text-sm text-ink-muted">{current.subline}</p>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-xs font-semibold text-ink-muted">{ui.confidence}</span>
            <span className="text-lg font-bold text-navy-deep font-tabular">{current.confidence}</span>
            <span className="text-[11px] text-ink-faint">Code: {current.auditRule}</span>
          </div>
        </div>

        {/* 4 Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {current.metrics.map((m, idx) => (
            <div key={idx} className="bg-canvas p-4 rounded-xl border border-line">
              <span className="text-xs text-ink-muted block">{m.label}</span>
              <span className="text-base font-bold text-ink font-tabular mt-1 block">{m.val}</span>
              <span className={`text-[11px] font-semibold mt-1 inline-flex items-center gap-1 ${m.ok ? "text-emerald" : "text-amber"}`}>
                {m.ok ? ui.pass : ui.threshold}
              </span>
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="p-5 rounded-xl bg-canvas border border-line flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-ink">
            <Info className="w-4 h-4 text-azure" />
            <span>Mathematical Rationale (निर्णय का कारण)</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{current.explanation}</p>
          <div className="pt-2 border-t border-line flex items-center justify-between text-[11px] text-ink-faint flex-wrap gap-2">
            <span>Regulatory: {current.citation}</span>
            <span>Immutable Hash: sha256:7f9a88...c1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
