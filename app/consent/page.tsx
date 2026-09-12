"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Lock, History, LayoutGrid, Banknote, ShieldHalf,
  X, CheckCircle2, ExternalLink, ChevronDown, ChevronUp,
} from "lucide-react";
import { ConsentRow } from "@/components/ui";

export default function ConsentPage() {
  const [activeCount, setActiveCount] = useState(3);
  const [termsOpen, setTermsOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);

  const handleToggle = (prevOn: boolean) => {
    setActiveCount((c) => (prevOn ? c - 1 : c + 1));
  };

  const auditLog = [
    { ts: "12 Sep 2026, 09:41 AM", action: "Consent granted — Transaction categorisation", by: "User" },
    { ts: "12 Sep 2026, 09:41 AM", action: "Consent granted — Income & salary regularity", by: "User" },
    { ts: "12 Sep 2026, 09:41 AM", action: "Consent granted — Active EMI & credit load", by: "User" },
    { ts: "10 Sep 2026, 11:02 AM", action: "First SBI account linked via RBI AA", by: "System" },
  ];

  return (
    <div className="min-h-screen bg-canvas flex justify-center py-8 px-4">
      <div className="bg-white border border-line w-full max-w-[400px] rounded-2xl overflow-hidden shadow-sm">

        {/* Back-button header */}
        <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b border-line">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/onboarding"
              className="w-9 h-9 flex items-center justify-center rounded-full text-ink-muted hover:bg-canvas transition-colors shrink-0"
            >
              <ArrowLeft size={18} />
            </Link>
            <Image src="/arthix-logo.svg" alt="Arthix" width={80} height={24} />
            <h1 className="text-ink text-[14px] font-semibold ml-1 truncate">Consent manager</h1>
          </div>
        </div>

        <div className="px-5 py-5 flex flex-col gap-5">

          {/* HERO framing card */}
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
              genuine opportunities. Pause, review, or revoke at any time — zero penalty.
            </p>
          </div>

          {/* Trust indicators */}
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

          {/* Granular data permissions */}
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

          {/* What Arthix will never do */}
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Lock size={13} className="text-navy" />
              <div className="text-ink text-[13.5px] font-semibold">What Arthix will never do</div>
            </div>
            {[
              { title: "Sell or monetise your data", body: "Never sell your personal identity, contact number, or transaction ledger to third-party telemarketers." },
              { title: "Recommend predatory loans", body: "Never recommend unneeded debt instruments when your financial stress or EMI load is high." },
              { title: "Execute transfers without you", body: "Never execute money transfers, fund debits, or mandate changes without your explicit biometric authorisation." },
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

          {/* RBI AA Terms — expandable */}
          <div className="border border-line rounded-xl overflow-hidden">
            <button
              onClick={() => setTermsOpen((v) => !v)}
              className="w-full flex items-center justify-between p-3.5 text-azure text-[12.5px] font-semibold hover:bg-azure-soft/40 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                RBI AA Terms & Conditions
              </span>
              {termsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {termsOpen && (
              <div className="px-4 pb-4 text-[11px] text-ink-faint leading-relaxed border-t border-line pt-3 flex flex-col gap-2">
                <p>Under RBI's Account Aggregator framework (Master Direction 2021), you as a Financial Information User (FIU) can access your data from Financial Information Providers (FIPs) only with your explicit, time-bound consent.</p>
                <p>You may withdraw consent at any time. Arthix will delete all locally cached data within 24 hours of revocation.</p>
                <a
                  href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12159"
                  target="_blank"
                  rel="noreferrer"
                  className="text-azure font-semibold flex items-center gap-1 mt-1"
                >
                  View full RBI circular <ExternalLink size={11} />
                </a>
              </div>
            )}
          </div>

          {/* Consent audit trail — expandable */}
          <div className="border border-line rounded-xl overflow-hidden">
            <button
              onClick={() => setAuditOpen((v) => !v)}
              className="w-full flex items-center justify-between p-3.5 text-azure text-[12.5px] font-semibold hover:bg-azure-soft/40 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <History size={13} />
                Consent Audit Trail
              </span>
              {auditOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {auditOpen && (
              <div className="px-4 pb-4 border-t border-line pt-3 flex flex-col gap-2.5">
                {auditLog.map((entry, i) => (
                  <div key={i} className="flex flex-col gap-0.5">
                    <div className="text-[11px] text-ink font-semibold">{entry.action}</div>
                    <div className="flex items-center gap-2 text-[10.5px] text-ink-faint">
                      <span>{entry.ts}</span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${entry.by === "User" ? "bg-azure-soft text-azure" : "bg-canvas text-ink-muted"}`}>
                        {entry.by}
                      </span>
                    </div>
                    {i < auditLog.length - 1 && <div className="border-b border-line mt-2" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2">
            <Link
              href="/app"
              className="w-full h-12 rounded-lg bg-navy text-white text-[13.5px] font-bold flex items-center justify-center hover:bg-navy-rich transition-colors"
            >
              Allow personalisation (अनुमति दें)
            </Link>
            <Link
              href="/app"
              className="w-full h-12 rounded-lg border border-line text-ink-muted text-[13px] font-medium flex items-center justify-center hover:bg-canvas transition-colors"
            >
              Skip personalisation &amp; continue
            </Link>
            <p className="text-center text-ink-faint text-[11px]">
              Change or reset these preferences anytime under Security settings.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
