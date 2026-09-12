"use client";

import { useState } from "react";
import { ArrowLeftRight, HeartHandshake, TrendingUp, MessageCircle, Sparkles } from "lucide-react";
import { LedgerRow } from "./ui";

type Tab = "dashboard" | "sahara" | "jeevanchakra" | "bhashasahayak";

interface DashboardProps {
  onNavigate?: (tab: Tab) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [vivekExpanded, setVivekExpanded] = useState(false);

  return (
    <div className="px-5 py-4 flex flex-col gap-5">
      <div>
        <div className="text-ink text-[19px] font-bold">Namaste, Rahul</div>
        <div className="text-ink-faint text-[12.5px]">State Bank account, ending 4218</div>
      </div>

      {/* Hero balance */}
      <div className="relative pl-4">
        <div className="absolute left-0 top-0.5 bottom-0.5 w-[3px] bg-azure rounded" />
        <div className="flex items-center justify-between">
          <div className="text-ink-muted text-[12.5px]">Available balance</div>
          <button
            onClick={() => setShowBalance((v) => !v)}
            className="text-ink-faint text-[11px] font-medium hover:text-ink transition-colors"
          >
            {showBalance ? "Hide" : "Show"}
          </button>
        </div>
        <div className="text-ink text-[32px] font-bold tabular tracking-tight">
          {showBalance ? "₹64,820" : "••••••"}
        </div>
        <div className="flex gap-6 mt-2">
          <div>
            <div className="text-ink-faint text-[11.5px]">Salary inflow</div>
            <div className="text-ink text-sm font-semibold tabular">₹52,000</div>
          </div>
          <div>
            <div className="text-ink-faint text-[11.5px]">Spends &amp; EMIs</div>
            <div className="text-ink text-sm font-semibold tabular">₹36,900</div>
          </div>
          <div>
            <div className="text-ink-faint text-[11.5px]">Free surplus</div>
            <div className="text-emerald text-sm font-semibold tabular">₹15,120</div>
          </div>
        </div>
      </div>

      {/* Vivek signal */}
      <div className="bg-azure-soft rounded-xl p-3.5 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-azure" />
          <span className="text-azure text-xs font-bold">Vivek&apos;s read</span>
        </div>
        <div className="text-ink text-[13.5px] leading-relaxed">
          Your surplus has held steady for two months and your EMI load is well within a safe
          range. There&apos;s room to put ₹3,000 to work without touching your buffer.
        </div>
        {vivekExpanded && (
          <div className="bg-white rounded-lg p-3 text-[12px] text-ink-muted leading-relaxed mt-1">
            <strong className="text-ink">Why this?</strong> — Salary grew from ₹43,000 to ₹52,000 (2 consecutive months). 
            EMI burden is 16% (safe zone &lt;35%). Emergency fund covers 3.2 months. 
            ₹3,000/mo SIP = 19.8% of surplus, leaving ₹12,120 fully free.
          </div>
        )}
        <button
          onClick={() => setVivekExpanded((v) => !v)}
          className="text-navy text-[13px] font-bold text-left hover:text-azure transition-colors"
        >
          {vivekExpanded ? "Hide details" : "Review the suggestion →"}
        </button>
      </div>

      <div>
        <div className="text-ink-faint text-[11.5px] font-semibold mb-0.5">Quick actions</div>
        <LedgerRow
          icon={<ArrowLeftRight size={17} />}
          title="Send money"
          subtitle="Instant UPI transfer"
          onClick={() => alert("UPI transfer — open your bank app")}
        />
        <LedgerRow
          icon={<HeartHandshake size={17} />}
          title="Sahara health"
          subtitle="Resilience score: 78 / 100"
          onClick={() => onNavigate?.("sahara")}
        />
        <LedgerRow
          icon={<TrendingUp size={17} />}
          title="JeevanChakra"
          subtitle="1 new milestone suggestion"
          onClick={() => onNavigate?.("jeevanchakra")}
        />
        <LedgerRow
          icon={<MessageCircle size={17} />}
          title="BhashaSahayak"
          subtitle="Talk in Hindi, Gujarati, or English"
          onClick={() => onNavigate?.("bhashasahayak")}
        />
      </div>
    </div>
  );
}
