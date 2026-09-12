"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Lock, History, LayoutGrid, Banknote, ShieldHalf, X, CheckCircle2 } from "lucide-react";
import { ConsentRow } from "@/components/ui";

export default function ConsentPage() {
  const [activeCount, setActiveCount] = useState(3);

  const handleToggle = (prevOn: boolean) => {
    setActiveCount((c) => (prevOn ? c - 1 : c + 1));
  };

  return (
    <div className="min-h-screen bg-canvas flex justify-center py-8 px-4">
      <div className="bg-white border border-line w-full max-w-[400px] rounded-2xl overflow-hidden shadow-sm">

        {/* ── Back-button header ──────────────────────────────────────── */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-line">
          <div className="flex items-center gap-2 min-w-0">
            <Link href="/onboarding" className="w-9 h-9 flex items-center justify-center rounded-full text-ink-muted hover:bg-canvas transition-colors shrink-0">
              <ArrowLeft size={18} />
            </Link>
            <Image src="/arthix-logo.svg" alt="Arthix" width={80} height={24} />
            <h1 className="text-ink text-[14px] font-semibold ml-1 truncate">
              Consent manager
            </h1>
          </div>
        </div>

        <div className="px-5 py-5 flex flex-col gap-5">

          {/* ── HERO: Intro framing card — the ONE boxed surface ────────── */}
          <div className="bg-canvas border border-line rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-1.5 text-azure text-[11px] font-semibold">
              <CheckCircle2 size={13} />
              RBI AA framework
            </div>
            <h2 className="text-ink text-[20px] font-bold leading-tight tracking-tight">
              Your data, your rules{" "}
              <span className="font-normal text-ink-muted">· आपकी अनुमति</span>
            </h2>
            <p className="text-ink-faint text-[13px] leading-relaxed">
              Arthix uses your consented financial footprint to protect you from debt and find
              genuine opportunities. You can pause, review, or revoke this at any time with zero
              penalty.
            </p>
          </div>

          {/* ── Trust indicators — 2-col plain grid, no boxed cards ─────── */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Lock size={15} />, title: "End-to-end encrypted", sub: "256-bit institutional" },
              { icon: <History size={15} />, title: "Revoke anytime", sub: "Instant data deletion" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-2.5 bg-canvas border border-line rounded-lg p-3">
                <div className="text-navy shrink-0">{item.icon}</div>
                <div className="min-w-0">
                  <div className="text-ink text-[12px] font-semibold truncate">{item.title}</div>
                  <div className="text-ink-faint text-[10.5px]">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Granular data permissions ──────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-ink text-[13.5px] font-semibold">Granular data permissions</div>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  activeCount > 0
                    ? "bg-emerald-soft text-emerald"
                    : "bg-canvas border border-line text-ink-faint"
                }`}
              >
                {activeCount} of 3 active
              </span>
            </div>

            <ConsentRow
              icon={<LayoutGrid size={16} />}
              title="Transaction categorisation & spends"
              body="To compute your monthly surplus and prevent unexpected fees or late charges across accounts."
              defaultOn={true}
              onToggle={(on) => handleToggle(!on)}
            />
            <ConsentRow
              icon={<Banknote size={16} />}
              title="Income & salary regularity"
              body="To check stability before suggesting long-term investments like SIPs or recurring deposits."
              defaultOn={true}
              onToggle={(on) => handleToggle(!on)}
            />
            <ConsentRow
              icon={<ShieldHalf size={16} />}
              title="Active EMI & credit load"
              body="To safeguard your credit score and deliberately suppress debt offers when financial stress is detected."
              defaultOn={true}
              onToggle={(on) => handleToggle(!on)}
            />
          </div>

          {/* ── What Arthix will never do — LedgerRow list ──────────────── */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Lock size={13} className="text-navy" />
              <div className="text-ink text-[13.5px] font-semibold">What Arthix will never do</div>
            </div>
            {[
              {
                title: "Sell or monetise your data",
                body: "Never sell your personal identity, contact number, or transaction ledger to third-party telemarketers.",
              },
              {
                title: "Recommend predatory loans",
                body: "Never recommend unneeded debt instruments when your financial stress or EMI load is high.",
              },
              {
                title: "Execute transfers without you",
                body: "Never execute money transfers, fund debits, or mandate changes without your explicit biometric authorisation.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 py-3 border-b border-line last:border-b-0">
                <X size={14} className="text-vermilion mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className="text-ink text-[13px] font-semibold">{item.title}</div>
                  <div className="text-ink-faint text-xs mt-0.5">{item.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Audit trail links — two stacked links, no separator dot ─── */}
          <div className="flex flex-col items-center gap-2 text-center">
            <button className="flex items-center gap-1 text-azure text-[12.5px] font-semibold">
              <CheckCircle2 size={13} />
              RBI AA terms
            </button>
            <button className="flex items-center gap-1 text-azure text-[12.5px] font-semibold">
              <History size={13} />
              Consent audit trail
            </button>
          </div>

          {/* ── CTAs ──────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-2">
            <Link
              href="/app"
              className="w-full h-12 rounded-lg bg-navy text-white text-[13.5px] font-bold flex items-center justify-center"
            >
              Allow personalisation (अनुमति दें)
            </Link>
            <Link
              href="/app"
              className="w-full h-12 rounded-lg border border-line text-ink-muted text-[13px] font-medium flex items-center justify-center"
            >
              Skip personalisation &amp; continue
            </Link>
            <p className="text-center text-ink-faint text-[11px]">
              You can change or reset these preferences anytime under Security settings.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
