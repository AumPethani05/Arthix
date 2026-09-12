"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Handshake, Shield } from "lucide-react";
import { LedgerRow } from "@/components/ui";
import type { Lang } from "@/components/TopBar";

const langs: { k: Lang; primary: string; sub: string }[] = [
  { k: "en", primary: "English", sub: "Default" },
  { k: "hi", primary: "हिंदी", sub: "Hindi" },
  { k: "gu", primary: "ગુજરાતી", sub: "Gujarati" },
];

export default function OnboardingPage() {
  const [activeLang, setActiveLang] = useState<Lang>("en");

  return (
    <div className="min-h-screen bg-canvas flex justify-center py-8 px-4">
      <div className="bg-white border border-line w-full max-w-[400px] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-5 flex flex-col gap-5">

          {/* ── Brand header ─────────────────────────────────────────────── */}
          <div className="flex items-center justify-between">
            <Image
              src="/arthix-logo.svg"
              alt="Arthix"
              width={100}
              height={30}
              priority
            />
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-navy-soft text-navy text-[10.5px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              Verified AI Partner
            </span>
          </div>

          {/* ── HERO banner — the ONE boxed surface on this screen ─────── */}
          <div className="bg-canvas border border-line rounded-xl p-4 relative overflow-hidden">
            {/* Decorative blur */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-azure-soft opacity-60 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[10.5px] font-semibold text-azure bg-azure-soft px-2.5 py-1 rounded-full">
                Intelligent Banking Layer for Bharat
              </span>
            </div>

            <h1 className="text-ink text-[22px] font-bold leading-tight tracking-tight mb-1">
              Your money,{" "}
              <span className="text-azure">understood.</span>
            </h1>

<p className="text-ink-muted text-[14px] font-medium mb-3 leading-relaxed">
               आपकी ज़रूरतों के अनुसार सही बैंकिंग
             </p>

            <div className="bg-white rounded-lg px-3 py-2.5">
              <p className="text-ink text-[13px] font-semibold leading-snug">
                "The right product. The right moment.{" "}
                <span className="text-navy">Or no product at all.</span>"
              </p>
            </div>
          </div>

          {/* ── Language selector ─────────────────────────────────────── */}
          <div>
            <div className="text-ink-faint text-[11.5px] font-semibold mb-2">
              Preferred language
            </div>
            <div className="grid grid-cols-3 gap-2">
              {langs.map((l) => {
                const active = activeLang === l.k;
                return (
                  <button
                    key={l.k}
                    onClick={() => setActiveLang(l.k)}
                    className={`flex flex-col items-center py-2.5 rounded-lg border transition-colors ${
                      active
                        ? "border-navy bg-navy text-white"
                        : "border-line bg-white text-ink"
                    }`}
                  >
                    <span className="text-[13px] font-semibold">{l.primary}</span>
                    <span
                      className={`text-[10.5px] ${active ? "text-white/70" : "text-ink-faint"}`}
                    >
                      {l.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Our Bharat First Promise — LedgerRow list, not 3 boxed cards */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <ShieldCheck size={15} className="text-navy" />
              <div className="text-ink text-[13.5px] font-semibold">Our Bharat First Promise</div>
            </div>
            <LedgerRow
              icon={<ShieldCheck size={16} />}
              title="Recommend"
              subtitle="Only what genuinely fits your surplus, crop cycle, or business cashflow. Zero predatory upselling."
              trailing={
                <span className="text-[10.5px] font-semibold text-ink-faint bg-canvas px-2 py-0.5 rounded-full border border-line">
                  Fair match
                </span>
              }
            />
            <LedgerRow
              icon={<Handshake size={16} />}
              title="Assist first"
              subtitle="Guidance and emergency buffer support before any loan or credit line is ever offered."
              trailing={
                <span className="text-[10.5px] font-semibold text-ink-faint bg-canvas px-2 py-0.5 rounded-full border border-line">
                  Support
                </span>
              }
            />
            <LedgerRow
              icon={<Shield size={16} />}
              title="Suppress"
              subtitle="Algorithmic guardrails that pause offers when income dips, protecting your family from debt traps."
              trailing={
                <span className="text-[10.5px] font-semibold text-ink-faint bg-canvas px-2 py-0.5 rounded-full border border-line">
                  Protection
                </span>
              }
            />
          </div>

          {/* ── Testimonial strip — no box ─────────────────────────────── */}
          <div className="flex items-center gap-3 border-t border-line pt-4">
            <div className="w-11 h-11 rounded-lg bg-navy-soft flex items-center justify-center shrink-0 text-[22px]">
              🛒
            </div>
            <div className="min-w-0">
              <div className="text-emerald text-[10.5px] font-bold">Trusted by 2.4L+ citizens</div>
              <p className="text-ink-faint text-xs leading-relaxed">
                "ARTHIX stopped me from taking a high-interest app loan and helped me save ₹14,000
                instead."
              </p>
            </div>
          </div>

          {/* ── CTAs ──────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-2">
            <Link
              href="/consent"
              className="w-full h-12 rounded-lg bg-navy text-white text-[13.5px] font-bold flex items-center justify-center"
            >
              Get started with Arthix
            </Link>
            <Link
              href="/app"
              className="w-full py-2.5 text-center text-ink-faint text-[12.5px] font-medium"
            >
              Continue with basic banking (without AI personalisation)
            </Link>
          </div>

          {/* ── Trust footer — plain label ─────────────────────────────── */}
          <div className="flex items-center justify-center gap-1 text-ink-faint text-[10.5px] text-center">
            <ShieldCheck size={11} className="text-emerald" />
            Regulated Banking Partner · 256-bit encrypted · Consented data only
          </div>

        </div>
      </div>
    </div>
  );
}
