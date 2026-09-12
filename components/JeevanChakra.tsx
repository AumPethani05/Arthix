"use client";

import { useState } from "react";
import {
  TrendingUp,
  ShieldCheck,
  ThumbsUp,
  Scale,
  Gavel,
  X,
  CalendarDays,
  Landmark,
  Shield,
  EyeOff,
  Contact,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { LedgerRow, AuditRow } from "./ui";

// ─── WhyThisDrawer ─────────────────────────────────────────────────────────
// Nyay audit log embedded panel — content from arthix_why_this_explanation
function WhyThisDrawer({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-canvas border border-line rounded-xl p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-azure text-[11px] font-bold uppercase tracking-wider">
            Nyay algorithmic guarantee · Explainable intelligence
          </div>
          <div className="text-ink text-[14px] font-bold mt-0.5">Factual suitability audit</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-emerald bg-emerald-soft px-2 py-0.5 rounded-full">
            Audit #409
          </span>
          <button onClick={onClose} className="text-ink-faint">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Primary rationale */}
      <p className="text-ink-faint text-xs leading-relaxed">
        Your salary increased by{" "}
        <strong className="text-azure font-semibold">20% for 2 consecutive months</strong> (from
        ₹43,000 to ₹52,000) and your monthly free surplus has remained stable at{" "}
        <strong className="text-ink font-semibold">₹15,120</strong>.
      </p>

      {/* Recommended allocation strip */}
      <div className="flex items-center justify-between bg-white border border-line rounded-lg p-3">
        <div>
          <div className="text-ink-faint text-[10.5px]">Recommended SIP allocation</div>
          <div className="text-navy text-[15px] font-bold tabular">₹3,000 / month</div>
        </div>
        <div className="text-right">
          <div className="text-ink-faint text-[10.5px]">Surplus share</div>
          <div className="text-emerald text-[13px] font-bold">23.1% (safe)</div>
        </div>
      </div>

      {/* Signals ingested */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-ink text-[13px] font-semibold">Signals ingested (with consent)</div>
          <span className="text-[11px] font-semibold text-ink-muted bg-canvas border border-line px-2 py-0.5 rounded-full">
            3 signals
          </span>
        </div>
        <AuditRow
          icon={<CalendarDays size={15} />}
          title="Salary regularity"
          body="Credited punctually on the 1st of each month via direct banking integration."
          badge="Verified"
          badgeTone="emerald"
        />
        <AuditRow
          icon={<Landmark size={15} />}
          title="EMI-to-income ratio"
          body="Current EMI is ₹8,320. Well under the strict safety threshold of <35%."
          badge="16% safe"
          badgeTone="emerald"
        />
        <AuditRow
          icon={<Shield size={15} />}
          title="Liquid buffer cushion"
          body="3 months emergency liquid buffer already fully secured in primary savings."
          badge="3.2 months"
          badgeTone="emerald"
        />
      </div>

      {/* What we never look at */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-ink text-[13px] font-semibold">What we never look at</div>
          <span className="text-[11px] font-semibold text-vermilion bg-vermilion-soft px-2 py-0.5 rounded-full">
            Guaranteed privacy
          </span>
        </div>
        <AuditRow
          icon={<EyeOff size={15} />}
          title="Social media or browsing footprint"
          body="Zero behavioral profiling trackers."
          badge="Never collected"
          badgeTone="vermilion"
        />
        <AuditRow
          icon={<Contact size={15} />}
          title="Contacts, photos, or location history"
          body="No device storage permissions queried."
          badge="Never accessed"
          badgeTone="vermilion"
        />
        <AuditRow
          icon={<Tag size={15} />}
          title="Third-party advertiser scores"
          body="Independent of marketing or ad networks."
          badge="Never used"
          badgeTone="vermilion"
        />
      </div>

      {/* Nyay fairness audit log */}
      <div className="bg-white border border-line rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale size={15} className="text-azure" />
            <div className="text-ink text-[13px] font-bold">Nyay fairness audit log</div>
          </div>
          <span className="text-[11px] font-bold text-emerald bg-emerald-soft px-2 py-0.5 rounded-full">
            SEBI compliant
          </span>
        </div>
        <div className="flex flex-col gap-1.5 text-[11.5px]">
          <div className="flex justify-between">
            <span className="text-ink-faint">Decision rule identifier</span>
            <span className="text-azure font-semibold font-mono">RECOM-EQUITY-SIP-STABLE-SURPLUS</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-faint">Commission bias audit</span>
            <span className="text-emerald font-semibold">Passed (0% weighting)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-faint">Distributor kickback</span>
            <span className="text-ink font-semibold tabular">₹0.00 (pure direct growth)</span>
          </div>
        </div>

        {/* User controls */}
        <div className="border-t border-line pt-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Gavel size={13} className="text-navy" />
            <div className="text-ink text-[12.5px] font-semibold">Your inherent rights &amp; controls</div>
          </div>
          <p className="text-ink-faint text-xs mb-3">
            You are in full control of this algorithmic guidance. Adjust parameters, file an instant
            objection, or silence recommendations.
          </p>
          <div className="flex flex-col gap-2">
            <button className="w-full h-10 bg-navy text-white text-[12.5px] font-bold rounded-lg">
              Adjust cashflow preferences
            </button>
            <button className="w-full h-10 bg-canvas border border-line text-ink text-[12.5px] font-semibold rounded-lg">
              Contest this suggestion
            </button>
            <button className="w-full h-10 bg-canvas border border-line text-ink-faint text-[12.5px] font-semibold rounded-lg">
              Pause all recommendations
            </button>
          </div>
        </div>
      </div>

      <div className="text-ink-faint text-[10.5px] text-center">
        Audited continuously by JeevanChakra transparency engine
      </div>
    </div>
  );
}

// ─── JeevanChakra ─────────────────────────────────────────────────────────────
export function JeevanChakra() {
  const [whyOpen, setWhyOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="px-5 py-4 flex flex-col gap-5">
      {/* Screen header */}
      <div>
        <div className="text-ink text-[19px] font-bold">जीवन चक्र · JeevanChakra</div>
        <div className="text-ink-faint text-[12.5px]">Personalized life-stage guidance · Rahul Sharma</div>
      </div>

      {/* Cashflow health strip — two stat cells, no boxed card */}
      <div className="relative pl-4">
        <div className="absolute left-0 top-0.5 bottom-0.5 w-[3px] bg-emerald rounded" />
        <div className="text-ink-muted text-[11.5px] mb-2">Cashflow health verified</div>
        <div className="flex gap-6">
          <div>
            <div className="text-ink-faint text-[11px]">Surplus growth</div>
            <div className="text-ink text-sm font-semibold tabular">+20% · 2 months</div>
            <div className="text-emerald text-[10.5px] font-semibold">₹15,120/mo stable</div>
          </div>
          <div>
            <div className="text-ink-faint text-[11px]">EMI burden check</div>
            <div className="text-ink text-sm font-semibold tabular">Passed · 16%</div>
            <div className="text-ink-faint text-[10.5px]">Threshold: &lt;30% safe</div>
          </div>
        </div>
      </div>

      {/* ── HERO recommendation card — the ONE boxed surface on this screen ── */}
      <div
        className={`bg-white border border-line rounded-card p-4 flex flex-col gap-3 transition-opacity ${
          dismissed ? "opacity-50" : ""
        }`}
      >
        {/* Top meta badges */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald bg-emerald-soft px-2.5 py-1 rounded-full">
            <TrendingUp size={12} />
            AI suitability: 98%
          </span>
          <span className="text-azure text-[11px] font-medium">Zero commission</span>
        </div>

        {/* Editorial title — no ALL-CAPS eyebrow */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-ink text-[15px] font-bold leading-snug">
              Disciplined long-term wealth: Index SIP
            </div>
            <div className="text-ink-faint text-xs mt-0.5 leading-relaxed">
              Calculated conservatively on your 20% incremental surplus to protect rainy-day
              liquidity while building compounding security.
            </div>
          </div>
          <div className="w-12 h-12 bg-navy-soft rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp size={22} className="text-navy" />
          </div>
        </div>

        {/* Amount */}
        <div className="bg-canvas rounded-lg p-3 flex items-center justify-between">
          <div>
            <div className="text-ink-faint text-[10.5px]">Recommended allocation</div>
            <div className="text-navy text-[26px] font-bold tabular leading-none mt-0.5">
              ₹3,000
            </div>
            <div className="text-ink-faint text-[10.5px]">per month</div>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-semibold text-ink-muted bg-white border border-line px-2 py-0.5 rounded-full">
              19.8% of net surplus
            </span>
            <div className="text-ink-faint text-[10.5px] mt-1 tabular">₹12,120 left flexible</div>
          </div>
        </div>

        {/* Cashflow envelope bar */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10.5px] text-ink-faint">
            <span>Monthly cashflow envelope</span>
            <span className="tabular">Total surplus: ₹15,120</span>
          </div>
          <div className="w-full h-2.5 bg-line rounded-full overflow-hidden flex">
            <div className="bg-navy h-full rounded-l-full" style={{ width: "20%" }} />
            <div className="bg-emerald h-full" style={{ width: "50%" }} />
            <div className="bg-azure-soft h-full rounded-r-full" style={{ width: "30%" }} />
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1 text-navy font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-navy inline-block" />
              ₹3k Index SIP
            </span>
            <span className="flex items-center gap-1 text-emerald font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" />
              ₹7.5k emergency buffer
            </span>
            <span className="flex items-center gap-1 text-ink-faint">
              <span className="w-1.5 h-1.5 rounded-full bg-azure-soft inline-block" />
              ₹4.6k free float
            </span>
          </div>
        </div>

        {/* Why this fits — inline */}
        <div className="flex items-start gap-2 bg-emerald-soft rounded-lg p-2.5">
          <ShieldCheck size={15} className="text-emerald shrink-0 mt-0.5" />
          <span className="text-ink-faint text-[11.5px]">
            <strong className="text-ink font-semibold">Why this fits:</strong> Surplus stability
            verified · Low market-volatility allocation
          </span>
        </div>

        {/* CTAs */}
        <button className="w-full h-11 bg-navy text-white text-[13.5px] font-bold rounded-lg">
          Explore Index SIP (विस्तार से समझें)
        </button>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setWhyOpen((v) => !v)}
            className="flex items-center gap-1 text-azure text-[12px] font-semibold"
          >
            Why this? (यह सुझाव क्यों?)
            {whyOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-ink-faint text-[12px]"
            disabled={dismissed}
          >
            {dismissed ? "Snoozed for 14 days" : "Dismiss for now"}
          </button>
        </div>
      </div>

      {/* Why this? / Nyay audit drawer */}
      {whyOpen && <WhyThisDrawer onClose={() => setWhyOpen(false)} />}

      {/* No-debt guardrail — LedgerRow, not a boxed card */}
      <div>
        <div className="text-ink-faint text-[11.5px] font-semibold mb-0.5">
          Debt guardrail (Nyay protection)
        </div>
        <LedgerRow
          icon={<ThumbsUp size={17} />}
          title="No debt recommended"
          subtitle="Good standing · Your surplus means no emergency consumer credit needed right now."
          trailing={<span />}
        />
      </div>

      {/* Ananya's advisory note */}
      <div className="flex items-center gap-3 border-t border-line pt-4">
        <div className="w-10 h-10 rounded-full bg-navy-soft flex items-center justify-center shrink-0">
          <span className="text-[18px]">👩‍💼</span>
        </div>
        <div className="min-w-0">
          <div className="text-ink-faint text-[10.5px]">Ananya's advisory note (lead counselor)</div>
          <p className="text-ink text-[12.5px] italic leading-relaxed">
            "Badhotee ke waqt thoda bachaana sabse aasan hota hai. Congratulations on your salary
            jump, Rahul!"
          </p>
        </div>
      </div>

      {/* Nyay guardrail footer */}
      <div className="flex items-center justify-center gap-1.5 text-ink-faint text-[10.5px] text-center">
        <Gavel size={12} className="text-navy" />
        Products are never promoted based on bank commission or partner tie-ups. Every JeevanChakra
        recommendation is 100% suitability-driven.
      </div>
    </div>
  );
}
