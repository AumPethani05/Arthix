"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  TrendingUp,
  Mic,
  Scale,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lock,
  ChevronRight,
  Globe,
  Award,
  Users,
  Compass,
  PhoneCall,
  Flame,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [demoScenario, setDemoScenario] = useState<"stress" | "surplus">("stress");

  return (
    <div className="min-h-screen bg-canvas text-ink antialiased flex flex-col selection:bg-azure selection:text-white">
      {/* ─── Top Header Navigation ────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-line px-4 sm:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative flex items-center justify-center">
              <Image
                src="/arthix-logo.svg"
                alt="ARTHIX Logo"
                width={38}
                height={38}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-navy-deep">
                ARTHIX
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-azure -mt-1">
                Bharat Core AI
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-ink-muted">
            <a href="#pillars" className="hover:text-ink transition-colors">
              Pillars
            </a>
            <a href="#demo" className="hover:text-ink transition-colors">
              Fiduciary Difference
            </a>
            <a href="#governance" className="hover:text-ink transition-colors">
              Sovereign Trust
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-canvas p-1 rounded-xl border border-line">
            {(
              [
                { k: "en", label: "Eng" },
                { k: "hi", label: "हिंदी" },
                { k: "gu", label: "ગુજ" },
              ] as const
            ).map((item) => (
              <button
                key={item.k}
                onClick={() => setLang(item.k)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === item.k
                    ? "bg-navy-deep text-white shadow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Link
            href="/login"
            className="text-xs font-bold text-ink-muted hover:text-ink px-3 py-2 rounded-xl transition-colors"
          >
            Sign In
          </Link>

          <Link
            href="/app"
            className="bg-navy-deep hover:bg-navy-rich text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 hover:translate-y-[-1px]"
          >
            <span>Launch WebApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ─── Hero Section ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-8 border-b border-line bg-gradient-to-b from-canvas via-white to-canvas">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-azure/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 right-10 w-80 h-80 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
          {/* Sovereign Guarantee Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-soft text-emerald border border-emerald/20 text-xs font-extrabold shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>RBI ACCOUNT AGGREGATOR REGULATED • ZERO COMMISSION FIDUCIARY</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-navy-deep leading-tight max-w-4xl">
            Sovereign AI Banking for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-azure via-emerald to-terracotta">
              Bharat.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-ink-muted max-w-2xl leading-relaxed">
            Protecting 140 Crore citizens from predatory debt traps. No distributor kickbacks,
            automated loan moratoria during distress, and voice-first vernacular intelligence.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link
              href="/app"
              className="w-full sm:w-auto bg-navy-deep hover:bg-navy-rich text-white px-8 py-4 rounded-2xl text-sm font-extrabold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>Launch Full Web Application</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-navy-deep border border-line px-8 py-4 rounded-2xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-azure" />
              <span>Login as Demo Persona</span>
            </Link>
          </div>

          {/* Real-Time Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-10 border-t border-line w-full max-w-4xl mt-6">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-navy-deep font-tabular">
                ₹4,200 Cr+
              </span>
              <span className="text-xs text-ink-muted mt-0.5">Protected Float</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-navy-deep font-tabular">
                18.4 Lakh+
              </span>
              <span className="text-xs text-ink-muted mt-0.5">Artisans & Families</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald font-tabular">
                0%
              </span>
              <span className="text-xs text-ink-muted mt-0.5">Distributor Kickbacks</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-azure font-tabular">
                100%
              </span>
              <span className="text-xs text-ink-muted mt-0.5">Sovereign Data Privacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Comparison: Predatory Banking vs ARTHIX ─ */}
      <section id="demo" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <span className="text-xs uppercase font-extrabold tracking-wider text-azure">
            THE FIDUCIARY TEST
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep">
            What happens when your income is delayed?
          </h2>
          <p className="text-sm text-ink-muted max-w-xl">
            Toggle below to see how traditional banks exploit temporary distress versus how ARTHIX
            instantly shields your family.
          </p>

          <div className="flex items-center bg-white p-1 rounded-2xl border border-line shadow-sm mt-4">
            <button
              onClick={() => setDemoScenario("stress")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                demoScenario === "stress"
                  ? "bg-navy-deep text-white shadow-md"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Scenario A: Wholesale Invoice Delayed (Kamala Devi)
            </button>
            <button
              onClick={() => setDemoScenario("surplus")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                demoScenario === "surplus"
                  ? "bg-navy-deep text-white shadow-md"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Scenario B: Steady Surplus Cashflow (Rahul Sharma)
            </button>
          </div>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Commercial Bank */}
          <div className="p-7 rounded-2xl bg-white border border-vermilion/30 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-vermilion flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  Commercial Retail Banking
                </span>
                <span className="text-xs bg-vermilion-soft text-vermilion font-bold px-2.5 py-0.5 rounded-full">
                  Conflicted Profit Model
                </span>
              </div>

              <h3 className="text-xl font-bold text-ink">
                {demoScenario === "stress"
                  ? "Extract Penalties & Push High-APR Loans"
                  : "Push High-Commission ULIPs & Endowments"}
              </h3>

              <ul className="flex flex-col gap-3 text-xs text-ink-muted">
                {demoScenario === "stress" ? (
                  <>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> Auto-debit fails → ₹590 bounce fee charged immediately.
                    </li>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> External telecallers bombard the customer with recovery calls.
                    </li>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> Pushes 'pre-approved' 36% instant loan to pay off the bounced EMI.
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> Bank relationship manager pushes a 5-year locked ULIP with 6.5% commissions.
                    </li>
                    <li className="flex items-start gap-2 text-vermilion">
                      <span>✕</span> Customer loses ₹18,000 in front-loaded distributor charges.
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-line text-xs font-semibold text-vermilion">
              {demoScenario === "stress"
                ? "Compounding stress leading into debt traps."
                : "Wealth destroyed through hidden distributor incentives."}
            </div>
          </div>

          {/* ARTHIX Sovereign Fiduciary */}
          <div className="p-7 rounded-2xl bg-white border-2 border-emerald shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  ARTHIX Sovereign Fiduciary
                </span>
                <span className="text-xs bg-emerald-soft text-emerald font-bold px-2.5 py-0.5 rounded-full">
                  100% Client-Aligned
                </span>
              </div>

              <h3 className="text-xl font-bold text-ink">
                {demoScenario === "stress"
                  ? "Lock Solicitation & Engage 1-Tap Relief"
                  : "Deploy Clean Direct Low-Cost Index SIP"}
              </h3>

              <ul className="flex flex-col gap-3 text-xs text-ink-muted">
                {demoScenario === "stress" ? (
                  <>
                    <li className="flex items-start gap-2 text-emerald">
                      <span>✓</span> <strong>Protective Hold Active:</strong> All loan marketing is
                      instantly locked.
                    </li>
                    <li className="flex items-start gap-2 text-emerald">
                      <span>✓</span> <strong>1-Tap 60-Day Moratorium:</strong> Freezes ₹1,200 EMI under
                      RBI Circular with 0 bureau penalty.
                    </li>
                    <li className="flex items-start gap-2 text-emerald">
                      <span>✓</span> Zero spam, zero third-party collection agencies.
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2 text-emerald">
                      <span>✓</span> Direct Nifty 50 Index SIP with 0.12% expense ratio.
                    </li>
                    <li className="flex items-start gap-2 text-emerald">
                      <span>✓</span> ₹0 distributor kickback — 100% of capital compounds for the family.
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
              <span className="text-xs font-bold text-emerald">
                {demoScenario === "stress" ? "Family liquidity protected." : "Transparent wealth building."}
              </span>
              <Link
                href="/app"
                className="text-xs font-bold text-azure hover:underline flex items-center gap-1"
              >
                Inspect in WebApp <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5 Core Pillars Grid ───────────────────────────────── */}
      <section id="pillars" className="py-20 px-4 sm:px-8 bg-white border-y border-line">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="text-xs uppercase font-extrabold tracking-wider text-azure">
              SOVEREIGN ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep">
              Built on 5 Unbreakable Fiduciary Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-azure-soft text-azure flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">Vivek Decision Engine</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Deterministic state machine. Every approval, condition, deferral, or suppression is
                rooted in cashflow mathematics without proprietary black-box heuristics.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-soft text-emerald flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">Sahara Safety Net</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Active protective credit hold that engages automatically when debt burden exceeds
                35%, providing 1-tap moratorium relief.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-azure-soft text-azure flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">JeevanChakra Direct Wealth</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Direct SEBI index investments without commissions. Saves thousands of rupees in
                hidden intermediary kickbacks.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-terracotta-soft text-terracotta flex items-center justify-center">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">BhashaSahayak Voice AI</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Tier-3 Vernacular Voice assistant in Hindi, Gujarati, Tamil, Marathi, and 18 other
                languages with zero financial hallucinations.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">Nyay Explainable Audit</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Full transparency. Every recommendation provides an inspectable "Why this?" audit
                trail reproducible by any banking ombudsman.
              </p>
            </div>

            {/* Pillar 6 */}
            <div className="p-6 rounded-2xl bg-canvas border border-line flex flex-col gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-soft text-emerald flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink">Kavach AA Sovereignty</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Digital Personal Data Protection (DPDP) Act 2023 certified. 100% revocable data
                access with zero contact scraping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────── */}
      <footer id="governance" className="bg-navy-deep text-white py-14 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative flex items-center justify-center bg-white rounded-xl p-1">
                <Image
                  src="/arthix-logo.svg"
                  alt="ARTHIX Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white block">ARTHIX</span>
                <span className="text-xs text-slate-400">Sovereign Bharat Banking Core</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
              <Link href="/app" className="hover:text-white transition-colors">
                Launch WebApp
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/consent" className="hover:text-white transition-colors">
                Consent Framework
              </Link>
              <Link href="/onboarding" className="hover:text-white transition-colors">
                Onboarding Flow
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 ARTHIX Bharat Core. Regulated under RBI Account Aggregator Framework.</p>
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-azure-light" />
              <span>National Support Hotline: 1800-ARTHIX (Toll Free 24x7)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
