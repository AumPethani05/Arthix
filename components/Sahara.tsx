"use client";

import { useState } from "react";
import {
  HeartHandshake,
  TrendingDown,
  ShoppingBag,
  Wallet,
  AlertTriangle,
  Handshake,
  PhoneCall,
  CalendarDays,
  X,
} from "lucide-react";
import { LedgerRow, ScoreRing } from "./ui";

// ─── EMI Modal ────────────────────────────────────────────────────────────────
function EmiModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<"grace" | "extend">("grace");
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl w-full max-w-[400px] px-5 pt-5 pb-8 flex flex-col gap-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="text-ink text-[15px] font-bold">Custom EMI plan preview</div>
          <button onClick={onClose} className="text-ink-faint p-1">
            <X size={18} />
          </button>
        </div>
        <p className="text-ink-faint text-xs">
          Select an adjusted structure tailored to your expected cashflow return next quarter:
        </p>
        <div className="flex flex-col gap-2">
          {[
            {
              key: "grace" as const,
              title: "Grace & Step-Up",
              body: "Pay only ₹6,000 for 90 days",
              badge: "Saves ₹7,920/mo",
            },
            {
              key: "extend" as const,
              title: "Tenure extension",
              body: "Extend by 6 months, lowering ₹4,200/mo",
              badge: "",
            },
          ].map((opt) => (
            <label
              key={opt.key}
              className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                selected === opt.key ? "border-navy bg-navy-soft" : "border-line bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="plan"
                  checked={selected === opt.key}
                  onChange={() => setSelected(opt.key)}
                  className="accent-navy w-4 h-4"
                />
                <div>
                  <div className="text-ink text-[13.5px] font-semibold">{opt.title}</div>
                  <div className="text-ink-faint text-xs">{opt.body}</div>
                </div>
              </div>
              {opt.badge && (
                <span className="text-[11px] font-bold text-emerald bg-emerald-soft px-2 py-0.5 rounded-full">
                  {opt.badge}
                </span>
              )}
            </label>
          ))}
        </div>
        <button
          onClick={() => setConfirmed(true)}
          className="w-full h-12 bg-navy text-white text-[13.5px] font-bold rounded-lg"
        >
          {confirmed ? "Application initiated ✓" : "Apply without branch visit"}
        </button>
      </div>
    </div>
  );
}

// ─── Sahara ───────────────────────────────────────────────────────────────────
export function Sahara() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="px-5 py-4 flex flex-col gap-5">
      {/* Persona strip — no ALL-CAPS eyebrow */}
      <div>
        <div className="text-ink text-[19px] font-bold">Kamala Devi (कमला देवी)</div>
        <div className="text-ink-faint text-[12.5px]">Account #•••• 4108</div>
      </div>

      {/* ── HERO: Health score card — the ONE boxed surface on this screen ── */}
      <div className="bg-white border border-line rounded-card p-4 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-ink text-[15px] font-bold">Financial health assessment</div>
            <div className="text-ink-faint text-xs">Resilience index · इस माह की स्थिति</div>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-vermilion-soft text-vermilion text-[11px] font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-vermilion animate-pulse" />
            High stress (सावधानी आवश्यक)
          </span>
        </div>

        {/* Score + narrative */}
        <div className="flex items-center gap-4">
          <ScoreRing score={42} tone="vermilion" />
          <div className="flex-1 min-w-0">
            <div className="text-ink text-[13.5px] font-semibold leading-snug mb-1">
              Immediate relief plan active
            </div>
            <p className="text-ink-faint text-xs leading-relaxed">
              Kamala ji, your EMI commitments exceed{" "}
              <strong className="text-ink font-semibold">58% of your monthly inflows</strong> this
              month due to an irregular business receipt. We are here to help ease this pressure.
            </p>
          </div>
        </div>

        {/* Cashflow breakdown — 2×2 grid, NOT individual cards */}
        <div className="grid grid-cols-2 gap-px bg-line rounded-lg overflow-hidden">
          {[
            {
              icon: <TrendingDown size={13} />,
              label: "Monthly inflow",
              value: "₹24,000",
              note: "−18% vs avg",
              noteColor: "text-vermilion",
            },
            {
              icon: <ShoppingBag size={13} />,
              label: "Living expenses",
              value: "₹14,200",
              note: "Essential household",
              noteColor: "text-ink-faint",
            },
            {
              icon: <Wallet size={13} />,
              label: "Active EMIs (2 loans)",
              value: "₹13,920",
              note: "58% of earnings",
              noteColor: "text-vermilion font-semibold",
            },
            {
              icon: <AlertTriangle size={13} />,
              label: "Net deficit",
              value: "−₹4,120",
              note: "Immediate attention",
              noteColor: "text-vermilion",
            },
          ].map((cell) => (
            <div key={cell.label} className="bg-white p-3 flex flex-col gap-0.5">
              <div className="flex items-center gap-1 text-ink-faint">
                {cell.icon}
                <span className="text-[10.5px]">{cell.label}</span>
              </div>
              <div className="text-ink text-[15px] font-bold tabular">{cell.value}</div>
              <div className={`text-[10.5px] ${cell.noteColor}`}>{cell.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Vivek suppression banner — navy surface, functionally important ── */}
      <div className="bg-navy rounded-xl p-4 relative overflow-hidden">
        <div className="absolute -right-3 -bottom-3 opacity-10 pointer-events-none">
          <HeartHandshake size={72} className="text-white" />
        </div>
        <div className="relative z-10">
          <div className="text-white/70 text-[10.5px] font-semibold mb-1">
            Vivek &amp; Nyay guarantee
          </div>
          <div className="text-white text-[14px] font-bold leading-snug mb-1.5">
            Credit offerings suppressed (सुरक्षा कवच लागू)
          </div>
          <p className="text-white/80 text-xs leading-relaxed">
            Arthix has blocked new personal loan and credit card marketing to protect your household
            from debt escalation. We never push more debt when you need breathing room.
          </p>
        </div>
      </div>

      {/* ── Relief actions — LedgerRow list, not individual boxed cards ── */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-ink-faint text-[11.5px] font-semibold">
            Restructuring &amp; relief (सहायता विकल्प)
          </div>
          <span className="text-emerald text-[11px] font-semibold">Zero CIBIL impact</span>
        </div>

        <LedgerRow
          icon={<Handshake size={17} />}
          title="Restructure / get EMI help"
          subtitle="ईएमआई राहत सहायता योजना · Recommended"
          onClick={() => setModalOpen(true)}
          trailing={
            <button
              onClick={() => setModalOpen(true)}
              className="bg-navy text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shrink-0"
            >
              Explore safe relief plan
            </button>
          }
        />
        <LedgerRow
          icon={<PhoneCall size={17} />}
          title="Talk to a dedicated counselor"
          subtitle="बिना किसी शुल्क परामर्श · Free confidential call"
          trailing={
            <button className="text-azure text-[11px] font-bold px-2 py-1 rounded-lg border border-line shrink-0">
              Request call
            </button>
          }
        />
        <LedgerRow
          icon={<CalendarDays size={17} />}
          title="Upcoming due dates"
          subtitle="2 debits scheduled before 10th of next month"
        />
      </div>

      {/* Footer — plain text, no boxed surface */}
      <div className="text-ink-faint text-[10.5px] text-center">
        RBI Fair Practices Code compliant · Complete privacy
      </div>

      {modalOpen && <EmiModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
