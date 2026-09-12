"use client";

import { useState } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Target,
  BarChart3,
  Scale,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

interface WebJeevanChakraProps {
  lang: Lang;
  onOpenNyay: () => void;
}

export function WebJeevanChakra({ lang, onOpenNyay }: WebJeevanChakraProps) {
  const [expandedComparison, setExpandedComparison] = useState(true);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* SIP Confirmation Toast */}
      <div
        id="sip-confirm-toast"
        className="fixed bottom-6 right-6 z-50 bg-emerald text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold opacity-0 transition-opacity duration-500 pointer-events-none"
      >
        ✓ SIP mandate initiated — Confirmation sent to your registered mobile.
      </div>
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-azure text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-azure" />
              <span>Algorithmic Wealth Stewardship • Fiduciary Tier</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              JeevanChakra Life-Stage Guidance
              <span className="block text-azure text-xl sm:text-2xl font-semibold mt-1">
                जीवन चक्र दीर्घकालिक वित्तीय मार्गदर्शन
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-soft text-emerald border border-emerald/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              SEBI Direct Fiduciary
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-canvas text-ink-muted border border-line">
              0% Commission Model
            </span>
          </div>
        </div>
      </div>

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Primary Recommendation & Trajectory (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Primary Recommendation Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-5 border-t-4 border-t-azure">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-extrabold text-azure tracking-wider">
                  OPTIMAL TRAJECTORY RECOMMENDATION
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">
                  Disciplined Long-Term Wealth: Direct Nifty 50 Index SIP
                </h2>
              </div>
              <span className="bg-emerald-soft text-emerald text-xs font-extrabold px-3 py-1 rounded-full shrink-0">
                98% Suitability Match
              </span>
            </div>

            {/* Quantitative Deployment Figure */}
            <div className="bg-canvas p-5 rounded-xl border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-ink-muted">Recommended Monthly Deployment</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-navy-deep font-tabular">
                    ₹3,000
                  </span>
                  <span className="text-xs text-ink-muted">/ month</span>
                </div>
                <p className="text-xs text-ink-muted mt-1">
                  Consumes <strong>19.8%</strong> of your current ₹15,120 net monthly surplus.
                </p>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <button
                  className="bg-navy-deep hover:bg-navy-rich text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const el = document.getElementById("sip-confirm-toast");
                      if (el) {
                        el.classList.remove("opacity-0");
                        setTimeout(() => el.classList.add("opacity-0"), 3000);
                      }
                    }
                  }}
                >
                  Start Direct SIP (Zero Fees)
                </button>
                <button
                  onClick={onOpenNyay}
                  className="text-azure text-xs font-semibold hover:underline flex items-center justify-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Why this? (Inspect Nyay Audit)
                </button>
              </div>
            </div>

            {/* Why Vivek Selected This Plan */}
            <div className="flex flex-col gap-2.5 text-xs text-ink-muted">
              <span className="font-bold text-ink text-xs uppercase tracking-wide">
                Key Suitability Guardrails:
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                <span>Zero distributor kickback loading — 100% of your rupees work for you.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                <span>Liquid emergency buffer untouched (3.2 months remain secured in SBI savings).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                <span>Automated pause trigger if your monthly net inflow dips below ₹38,000.</span>
              </div>
            </div>
          </div>

          {/* Direct Fiduciary vs Predatory Product Comparison */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedComparison(!expandedComparison)}
            >
              <div>
                <span className="text-xs uppercase font-extrabold text-ink-muted">
                  Transparency Audit
                </span>
                <h3 className="text-base font-bold text-ink">
                  Direct Index SIP vs Traditional Bank ULIP Policy
                </h3>
              </div>
              {expandedComparison ? (
                <ChevronUp className="w-5 h-5 text-ink-muted" />
              ) : (
                <ChevronDown className="w-5 h-5 text-ink-muted" />
              )}
            </div>

            {expandedComparison && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Direct SIP (ARTHIX) */}
                <div className="p-4 rounded-xl bg-emerald-soft/50 border border-emerald/30 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-emerald font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ARTHIX Direct Plan (SEBI Mandated)</span>
                  </div>
                  <div className="text-xs flex flex-col gap-1.5 text-ink">
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Expense Ratio:</span>
                      <span className="font-bold">0.12% per year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Distributor Commission:</span>
                      <span className="font-bold text-emerald">₹0 (Zero)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Lock-in Period:</span>
                      <span className="font-bold">None (Flexible Exit)</span>
                    </div>
                  </div>
                </div>

                {/* Traditional ULIP / Endowment */}
                <div className="p-4 rounded-xl bg-vermilion-soft/40 border border-vermilion/20 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-vermilion font-bold text-xs">
                    <XCircle className="w-4 h-4" />
                    <span>Typical Bank Branch ULIP / Endowment</span>
                  </div>
                  <div className="text-xs flex flex-col gap-1.5 text-ink">
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Front-load Fees:</span>
                      <span className="font-bold text-vermilion">Up to 6.5% of premium</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Agent Commission:</span>
                      <span className="font-bold text-vermilion">₹18,000 over 5 yrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Lock-in Period:</span>
                      <span className="font-bold text-vermilion">5 Years Mandatory</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Goal Trajectory & Timeline (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* 10-Year Wealth Projection Chart */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-line">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy-deep">10-Year Projected Wealth</h3>
              <span className="text-xs font-bold text-emerald bg-emerald-soft px-2.5 py-1 rounded-full">
                ₹6.98L @ 11.5% CAGR
              </span>
            </div>
            <div className="w-full h-28 relative bg-canvas rounded-xl border border-line p-3">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 100">
                <defs>
                  <linearGradient id="wealthGrad2" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="0.5" x1="0" x2="600" y1="85" y2="85" />
                <line stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="0.5" x1="0" x2="600" y1="50" y2="50" />
                <path d="M 0,90 Q 300,78 600,58 L 600,100 L 0,100 Z" fill="#E2E8F0" fillOpacity="0.5" />
                <path d="M 0,90 Q 300,78 600,58" fill="none" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth="1.5" />
                <path d="M 0,90 Q 300,62 600,8 L 600,100 L 0,100 Z" fill="url(#wealthGrad2)" />
                <path d="M 0,90 Q 300,62 600,8" fill="none" stroke="#1D4ED8" strokeWidth="2.5" />
                <circle cx="0" cy="90" fill="#1D4ED8" r="4" />
                <circle cx="300" cy="60" fill="#0F766E" r="4" />
                <circle cx="600" cy="8" fill="#0F766E" r="5" />
                <text fill="#94A3B8" fontSize="9" x="6" y="86">Yr 0</text>
                <text fill="#1D4ED8" fontSize="9" fontWeight="bold" x="272" y="51">Yr 5 (₹2.6L)</text>
                <text fill="#0F766E" fontSize="9" fontWeight="bold" x="525" y="20">Yr 10 (₹6.98L)</text>
              </svg>
            </div>
            <div className="flex items-center justify-between text-xs text-ink-muted">
              <span>Capital Committed: ₹3.60 Lakhs</span>
              <span className="text-emerald font-bold">Net Gain: +₹3.38 Lakhs</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
            <h3 className="text-base font-bold text-ink pb-2 border-b border-line">
              Life-Stage Milestones (जीवन पथ)
            </h3>

            <div className="flex flex-col gap-4 relative">
              {/* Step 1: Done */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">
                  ✓
                </div>
                <div>
                  <span className="text-xs font-bold text-ink block">
                    1. 3-Month Emergency Liquidity Buffer
                  </span>
                  <span className="text-xs text-ink-muted">
                    ₹85,200 secured in SBI Savings. Safeguards your household against income shocks.
                  </span>
                </div>
              </div>

              {/* Step 2: Active */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-azure text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm animate-pulse">
                  2
                </div>
                <div>
                  <span className="text-xs font-bold text-azure block">
                    2. Wealth Preservation: Nifty 50 Index SIP
                  </span>
                  <span className="text-xs text-ink-muted">
                    Deploying ₹3,000/mo unneeded surplus float into transparent direct equities.
                  </span>
                </div>
              </div>

              {/* Step 3: Future */}
              <div className="flex items-start gap-3.5 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 text-xs font-bold">
                  3
                </div>
                <div>
                  <span className="text-xs font-bold text-ink block">
                    3. Sovereign Gold Bonds (SGB) Reserve
                  </span>
                  <span className="text-xs text-ink-muted">
                    RBI backed 2.5% semi-annual interest with sovereign capital guarantee.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
