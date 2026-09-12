import { ArrowLeftRight, HeartHandshake, TrendingUp, MessageCircle, Sparkles } from "lucide-react";
import { LedgerRow } from "./ui";

export function Dashboard() {
  return (
    <div className="px-5 py-4 flex flex-col gap-5">
      <div>
        <div className="text-ink text-[19px] font-bold">Namaste, Rahul</div>
        <div className="text-ink-faint text-[12.5px]">State Bank account, ending 4218</div>
      </div>

      {/* Hero balance — ledger-tick rail instead of a boxed gradient card */}
      <div className="relative pl-4">
        <div className="absolute left-0 top-0.5 bottom-0.5 w-[3px] bg-azure rounded" />
        <div className="text-ink-muted text-[12.5px]">Available balance</div>
        <div className="text-ink text-[32px] font-bold tabular tracking-tight">₹64,820</div>
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

      {/* Vivek signal — quiet, text-led, one accent */}
      <div className="bg-azure-soft rounded-xl p-3.5 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-azure" />
          <span className="text-azure text-xs font-bold">Vivek&apos;s read</span>
        </div>
        <div className="text-ink text-[13.5px] leading-relaxed">
          Your surplus has held steady for two months and your EMI load is well within a safe
          range. There&apos;s room to put ₹3,000 to work without touching your buffer.
        </div>
        <button className="text-navy text-[13px] font-bold text-left">Review the suggestion</button>
      </div>

      <div>
        <div className="text-ink-faint text-[11.5px] font-semibold mb-0.5">Quick actions</div>
        <LedgerRow icon={<ArrowLeftRight size={17} />} title="Send money" subtitle="Instant UPI transfer" />
        <LedgerRow icon={<HeartHandshake size={17} />} title="Sahara health" subtitle="Resilience score: 78 / 100" />
        <LedgerRow icon={<TrendingUp size={17} />} title="JeevanChakra" subtitle="1 new milestone suggestion" />
        <LedgerRow icon={<MessageCircle size={17} />} title="BhashaSahayak" subtitle="Talk in Hindi, Gujarati, or English" />
      </div>
    </div>
  );
}
