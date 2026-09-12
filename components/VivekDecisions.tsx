"use client";

import { useState } from "react";
import { TrendingUp, Users, Check, ShieldCheck, AlertTriangle, Circle, X } from "lucide-react";
import { LedgerRow, VerdictShell } from "./ui";

const decisionStates = [
  { k: "recommend", label: "Recommend" },
  { k: "assist", label: "Assist first" },
  { k: "suppress", label: "Suppress" },
  { k: "verify", label: "Verify" },
] as const;

type StateKey = (typeof decisionStates)[number]["k"];

export function VivekDecisions() {
  const [state, setState] = useState<StateKey>("recommend");
  const [sipExplored, setSipExplored] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [kycStarted, setKycStarted] = useState(false);
  const [transactionAnswer, setTransactionAnswer] = useState<"confirmed" | "blocked" | null>(null);
  const [emiRescheduled, setEmiRescheduled] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);

  return (
    <div className="px-5 py-4 flex flex-col gap-5">
      <div>
        <div className="text-ink text-[17px] font-bold">Vivek&apos;s decision</div>
        <div className="text-ink-faint text-[12.5px]">
          One of four gates, chosen for this moment — not a sales pitch.
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {decisionStates.map((s) => {
          const active = state === s.k;
          return (
            <button
              key={s.k}
              onClick={() => setState(s.k)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                active ? "border-navy bg-navy-soft text-navy" : "border-line text-ink-muted hover:border-navy/40"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {state === "recommend" && (
        <VerdictShell
          tone="emerald"
          icon={<TrendingUp size={15} className="text-emerald" />}
          eyebrow="Recommend · JeevanChakra"
          headline="A ₹3,000 Index SIP fits your surplus without touching your buffer."
        >
          <div className="text-ink-muted text-[13px] leading-relaxed">
            Your surplus has grown for two straight months and your emergency buffer is already
            covered. This suggestion uses about a fifth of that surplus — the rest stays free.
          </div>
          <div className="flex gap-4 mt-1">
            <div>
              <div className="text-ink-faint text-[11px]">Suggested</div>
              <div className="text-ink text-sm font-bold">₹3,000/mo</div>
            </div>
            <div>
              <div className="text-ink-faint text-[11px]">Left flexible</div>
              <div className="text-ink text-sm font-bold">₹12,120</div>
            </div>
          </div>
          <button
            onClick={() => setSipExplored(true)}
            className={`w-full text-[13.5px] font-bold py-2.5 rounded-lg transition-all ${
              sipExplored ? "bg-emerald text-white" : "bg-navy text-white hover:bg-navy-rich"
            }`}
          >
            {sipExplored ? "✓ SIP Details Sent to Mobile" : "Explore this SIP"}
          </button>
          <button
            onClick={() => setDismissed(true)}
            disabled={dismissed}
            className={`text-xs text-left transition-colors ${dismissed ? "text-ink-faint" : "text-ink-muted hover:text-vermilion"}`}
          >
            {dismissed ? "Dismissed for 14 days" : "Why this? · Dismiss for now"}
          </button>
        </VerdictShell>
      )}

      {state === "assist" && (
        <VerdictShell
          tone="amber"
          icon={<Users size={15} className="text-amber" />}
          eyebrow="Assist first · BhashaSahayak"
          headline="Let's get your KYC done — no product needed right now."
        >
          <div className="text-ink-muted text-[13px] leading-relaxed">
            Meena is a first-time digital user. Vivek holds back every product offer until
            onboarding friction is cleared, in her own language.
          </div>
          <div className="flex flex-col gap-2 mt-1">
            {["Aadhaar linked to mobile OTP", "PAN card shown clearly on camera", "Signature on plain paper"].map(
              (step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${kycStarted && i < 1 ? "bg-emerald" : "bg-amber-soft"}`}>
                    {kycStarted && i < 1
                      ? <Check size={12} className="text-white" />
                      : <Check size={12} className="text-amber" />
                    }
                  </div>
                  <span className="text-ink text-[13px]">{step}</span>
                </div>
              )
            )}
          </div>
          <button
            onClick={() => setKycStarted(true)}
            className={`w-full text-[13.5px] font-bold py-2.5 rounded-lg transition-all ${
              kycStarted ? "bg-emerald text-white" : "bg-navy text-white hover:bg-navy-rich"
            }`}
          >
            {kycStarted ? "✓ Video KYC Session Started" : "Start video KYC"}
          </button>
        </VerdictShell>
      )}

      {state === "suppress" && (
        <VerdictShell
          tone="navy"
          icon={<ShieldCheck size={15} className="text-navy" />}
          eyebrow="Suppress · Protective hold"
          headline="We're not offering new credit right now."
        >
          <div className="text-ink-muted text-[13px] leading-relaxed">
            Kamala&apos;s expenses and EMIs are running higher than usual. Taking on more debt
            today could add pressure her savings don&apos;t need — so Vivek holds the offer instead.
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <LedgerRow
              icon={<Circle size={14} />}
              title="Reschedule EMI dates"
              subtitle="Align to salary cycle, no fee"
              onClick={() => setEmiRescheduled(true)}
              trailing={
                emiRescheduled
                  ? <span className="text-[11px] font-bold text-emerald bg-emerald-soft px-2 py-0.5 rounded-full">Done</span>
                  : <span className="text-[11px] font-semibold text-azure">Reschedule</span>
              }
            />
            <LedgerRow
              icon={<Circle size={14} />}
              title="Talk to a counsellor"
              subtitle="Free callback, your language"
              onClick={() => setCallbackRequested(true)}
              trailing={
                callbackRequested
                  ? <span className="text-[11px] font-bold text-emerald bg-emerald-soft px-2 py-0.5 rounded-full">Requested</span>
                  : <span className="text-[11px] font-semibold text-azure">Request</span>
              }
            />
          </div>
          <div className="text-ink-faint text-[11.5px]">This has no effect on her credit bureau rating.</div>
        </VerdictShell>
      )}

      {state === "verify" && (
        <VerdictShell
          tone="azure"
          icon={<AlertTriangle size={15} className="text-azure" />}
          eyebrow="Verify · Kavach"
          headline="Confirm this transaction before we proceed."
        >
          <div className="text-ink-muted text-[13px] leading-relaxed">
            An unusual UPI payment doesn&apos;t match your normal spending pattern. Rather than
            freeze it silently, Vivek is asking you directly.
          </div>
          <div className="bg-azure-soft rounded-lg p-3 flex justify-between items-center">
            <div>
              <div className="text-ink text-[13.5px] font-bold">₹9,400 to unfamiliar UPI ID</div>
              <div className="text-ink-faint text-[11.5px]">Today, 11:42 AM</div>
            </div>
          </div>
          {transactionAnswer ? (
            <div className={`text-center py-2.5 rounded-lg text-[13px] font-bold ${
              transactionAnswer === "confirmed" ? "bg-emerald-soft text-emerald" : "bg-vermilion-soft text-vermilion"
            }`}>
              {transactionAnswer === "confirmed" ? "✓ Transaction confirmed — processing" : "✓ Transaction blocked — reported to Kavach"}
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setTransactionAnswer("confirmed")}
                className="flex-1 bg-navy text-white text-[13px] font-bold py-2 rounded-lg hover:bg-navy-rich transition-colors"
              >
                Yes, this was me
              </button>
              <button
                onClick={() => setTransactionAnswer("blocked")}
                className="flex-1 border border-line text-ink text-[13px] font-bold py-2 rounded-lg hover:bg-vermilion-soft hover:text-vermilion hover:border-vermilion transition-colors"
              >
                Block it
              </button>
            </div>
          )}
        </VerdictShell>
      )}
    </div>
  );
}
