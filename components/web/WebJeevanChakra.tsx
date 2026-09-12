"use client";

import { useState, useEffect } from "react";
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
  activePersona?: "rahul" | "kamala";
}

export function WebJeevanChakra({ lang, onOpenNyay, activePersona = "rahul" }: WebJeevanChakraProps) {
  const [expandedComparison, setExpandedComparison] = useState(true);
  const [decisionData, setDecisionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/recommendations?persona=${activePersona}`)
      .then((res) => res.json())
      .then((data) => setDecisionData(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [activePersona]);

  const handleStartSip = (productId: string = "prod-nifty50-sip") => {
    fetch(`/api/v1/recommendations/${productId}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ persona: activePersona, choice: "ACCEPTED" }),
    }).catch((err) => console.error(err));

    if (typeof window !== "undefined") {
      const el = document.getElementById("sip-confirm-toast");
      if (el) {
        el.classList.remove("opacity-0");
        setTimeout(() => el.classList.add("opacity-0"), 3000);
      }
    }
  };

  const c = {
    en: {
      badge: "Algorithmic Wealth Stewardship • Fiduciary Tier",
      title: "JeevanChakra Life-Stage Guidance",
      titleSub: "जीवन चक्र दीर्घकालिक वित्तीय मार्गदर्शन",
      sebi: "SEBI Direct Fiduciary", zero: "0% Commission Model",
      optimal: "OPTIMAL TRAJECTORY RECOMMENDATION",
      sipTitle: "Disciplined Long-Term Wealth: Direct Nifty 50 Index SIP",
      sipMatch: "98% Suitability Match",
      deployment: "Recommended Monthly Deployment",
      surplus: "of your current ₹15,120 net monthly surplus.",
      startSip: "Start Direct SIP (Zero Fees)",
      sipInitiated: "✓ SIP Initiated — Check your mobile",
      whyThis: "Why this? (Inspect Nyay Audit)",
      guardrails: "Key Suitability Guardrails:",
      g1: "Zero distributor kickback loading — 100% of your rupees work for you.",
      g2: "Liquid emergency buffer untouched (3.2 months remain secured in SBI savings).",
      g3: "Automated pause trigger if your monthly net inflow dips below ₹38,000.",
      transparency: "Transparency Audit",
      comparison: "Direct Index SIP vs Traditional Bank ULIP Policy",
      directLabel: "ARTHIX Direct Plan (SEBI Mandated)",
      ulipLabel: "Typical Bank Branch ULIP / Endowment",
      expenseRatio: "Expense Ratio:", commission: "Distributor Commission:", lockin: "Lock-in Period:",
      wealthTitle: "10-Year Projected Wealth", wealthBadge: "₹6.98L @ 11.5% CAGR",
      committed: "Capital Committed: ₹3.60 Lakhs", netGain: "Net Gain: +₹3.38 Lakhs",
      milestonesTitle: "Life-Stage Milestones (जीवन पथ)",
      m1: "1. 3-Month Emergency Liquidity Buffer", m1sub: "₹85,200 secured in SBI Savings. Safeguards your household against income shocks.",
      m2: "2. Wealth Preservation: Nifty 50 Index SIP", m2sub: "Deploying ₹3,000/mo unneeded surplus float into transparent direct equities.",
      m3: "3. Sovereign Gold Bonds (SGB) Reserve", m3sub: "RBI backed 2.5% semi-annual interest with sovereign capital guarantee.",
    },
    hi: {
      badge: "एल्गोरिदमिक धन प्रबंधन • फिड्युशियरी स्तर",
      title: "जीवन चक्र जीवन-चरण मार्गदर्शन",
      titleSub: "जीवन चक्र दीर्घकालिक वित्तीय मार्गदर्शन",
      sebi: "सेबी प्रत्यक्ष न्यासी", zero: "0% कमीशन मॉडल",
      optimal: "इष्टतम मार्ग सिफारिश",
      sipTitle: "अनुशासित दीर्घकालिक संपत्ति: प्रत्यक्ष Nifty 50 इंडेक्स SIP",
      sipMatch: "98% उपयुक्तता मिलान",
      deployment: "अनुशंसित मासिक तैनाती",
      surplus: "आपके ₹15,120 मासिक अधिशेष का।",
      startSip: "प्रत्यक्ष SIP शुरू करें (शून्य शुल्क)",
      sipInitiated: "✓ SIP शुरू — मोबाइल पर जांचें",
      whyThis: "यह क्यों? (न्याय ऑडिट देखें)",
      guardrails: "मुख्य उपयुक्तता सुरक्षा:",
      g1: "शून्य वितरक कमीशन — आपका हर रुपया आपके लिए काम करता है।",
      g2: "आपातकालीन बफर अछूता (एसबीआई में 3.2 माह सुरक्षित)।",
      g3: "आय ₹38,000 से कम होने पर SIP स्वचालित रूप से रुक जाएगी।",
      transparency: "पारदर्शिता ऑडिट",
      comparison: "प्रत्यक्ष इंडेक्स SIP बनाम पारंपरिक ULIP",
      directLabel: "आर्थिक्स प्रत्यक्ष योजना (सेबी अनिवार्य)",
      ulipLabel: "पारंपरिक बैंक शाखा ULIP / एंडोवमेंट",
      expenseRatio: "व्यय अनुपात:", commission: "वितरक कमीशन:", lockin: "लॉक-इन अवधि:",
      wealthTitle: "10-वर्षीय संपत्ति अनुमान", wealthBadge: "₹6.98 लाख @ 11.5% CAGR",
      committed: "निवेश: ₹3.60 लाख", netGain: "शुद्ध लाभ: +₹3.38 लाख",
      milestonesTitle: "जीवन-चरण मील के पत्थर",
      m1: "1. 3-माह आपातकालीन नकदी बफर", m1sub: "₹85,200 एसबीआई बचत में सुरक्षित। आय के झटकों से सुरक्षा।",
      m2: "2. संपत्ति संरक्षण: Nifty 50 इंडेक्स SIP", m2sub: "₹3,000/माह अधिशेष को पारदर्शी प्रत्यक्ष इक्विटी में लगाया।",
      m3: "3. संप्रभु स्वर्ण बांड (SGB) रिजर्व", m3sub: "आरबीआई समर्थित 2.5% अर्ध-वार्षिक ब्याज।",
    },
    gu: {
      badge: "અલ્ગોરિધમિક સંપત્તિ વ્યવસ્થાપન • ફિડ્યુશિયરી સ્તર",
      title: "જીવનચક્ર જીવન-તબક્કા માર્ગદર્શન",
      titleSub: "જીવનચક્ર દીર્ઘકાલીન નાણાકીય માર્ગદર્શન",
      sebi: "સેબી ડાયરેક્ટ ફિડ્યુશિયરી", zero: "0% કમિશન મોડલ",
      optimal: "શ્રેષ્ઠ માર્ગ ભલામણ",
      sipTitle: "શિસ્તબદ્ધ દીર્ઘકાલીન સંપત્તિ: ડાયરેક્ટ નિફ્ટી 50 ઇન્ડેક્સ SIP",
      sipMatch: "98% યોગ્યતા મેળ",
      deployment: "ભલામણ કરેલ માસિક રોકાણ",
      surplus: "તમારા ₹15,120 માસિક બચતમાંથી.",
      startSip: "ડાયરેક્ટ SIP શરૂ કરો (શૂન્ય શુલ્ક)",
      sipInitiated: "✓ SIP શરૂ થઈ — મોબાઇલ પર પુષ્ટિ તપાસો",
      whyThis: "આ કેમ? (ન્યાય ઑડિટ જુઓ)",
      guardrails: "મુખ્ય યોગ્યતા સુરક્ષાઓ:",
      g1: "શૂન્ય વિતરક કમિશન — તમારો દરેક રૂપિયો તમારા માટે કામ કરે છે.",
      g2: "ઇમરજન્સી બફર અકબંધ (એસબીઆઈમાં 3.2 મહિના સુરક્ષિત).",
      g3: "આવક ₹38,000 થી ઘટે તો SIP આપોઆપ સ્થગિત થઈ જશે.",
      transparency: "પારદર્શિતા ઑડિટ",
      comparison: "ડાયરેક્ટ ઇન્ડેક્સ SIP વિરુદ્ધ પરંપરાગત બેંક ULIP",
      directLabel: "આર્થિક્સ ડાયરેક્ટ પ્લાન (સેબી ફરજિયાત)",
      ulipLabel: "સામાન્ય બેંક શાખા ULIP / એન્ડોમેન્ટ",
      expenseRatio: "ખર્ચ ગુણોત્તર:", commission: "વિતરક કમિશન:", lockin: "લૉક-ઇન સમયગાળો:",
      wealthTitle: "10-વર્ષીય સંપત્તિ અંદાજ", wealthBadge: "₹6.98 લાખ @ 11.5% CAGR",
      committed: "રોકાણ કરેલ મૂડી: ₹3.60 લાખ", netGain: "ચોખ્ખો નફો: +₹3.38 લાખ",
      milestonesTitle: "જીવન-તબક્કાના લક્ષ્યો (જીવન પથ)",
      m1: "1. 3-મહિનાનો ઇમરજન્સી રોકડ બફર", m1sub: "₹85,200 એસબીઆઈ બચતમાં સુરક્ષિત. આવકના આંચકા સામે રક્ષણ.",
      m2: "2. સંપત્તિ નિર્માણ: નિફ્ટી 50 ઇન્ડેક્સ SIP", m2sub: "વધારાના ₹3,000/માસિક ફ્લોટને પારદર્શક ડાયરેક્ટ ઇક્વિટીમાં રોકો.",
      m3: "3. સોવરિન ગોલ્ડ બોન્ડ્સ (SGB) રિઝર્વ", m3sub: "આરબીઆઈ સમર્થિત 2.5% અર્ધવાર્ષિક વ્યાજ સાથે સરકારી મૂડી સુરક્ષા.",
    },
  }[lang] ?? {
    badge: "Algorithmic Wealth Stewardship • Fiduciary Tier",
    title: "JeevanChakra Life-Stage Guidance",
    titleSub: "जीवन चक्र दीर्घकालिक वित्तीय मार्गदर्शन",
    sebi: "SEBI Direct Fiduciary", zero: "0% Commission Model",
    optimal: "OPTIMAL TRAJECTORY RECOMMENDATION",
    sipTitle: "Disciplined Long-Term Wealth: Direct Nifty 50 Index SIP",
    sipMatch: "98% Suitability Match", deployment: "Recommended Monthly Deployment",
    surplus: "of your current ₹15,120 net monthly surplus.",
    startSip: "Start Direct SIP (Zero Fees)", sipInitiated: "✓ SIP Initiated — Check your mobile",
    whyThis: "Why this? (Inspect Nyay Audit)", guardrails: "Key Suitability Guardrails:",
    g1: "Zero distributor kickback loading.", g2: "Liquid emergency buffer untouched.",
    g3: "Automated pause trigger if inflow dips.", transparency: "Transparency Audit",
    comparison: "Direct Index SIP vs Traditional Bank ULIP Policy",
    directLabel: "ARTHIX Direct Plan (SEBI Mandated)", ulipLabel: "Typical Bank Branch ULIP / Endowment",
    expenseRatio: "Expense Ratio:", commission: "Distributor Commission:", lockin: "Lock-in Period:",
    wealthTitle: "10-Year Projected Wealth", wealthBadge: "₹6.98L @ 11.5% CAGR",
    committed: "Capital Committed: ₹3.60 Lakhs", netGain: "Net Gain: +₹3.38 Lakhs",
    milestonesTitle: "Life-Stage Milestones (जीवन पथ)",
    m1: "1. 3-Month Emergency Liquidity Buffer", m1sub: "₹85,200 secured in SBI Savings.",
    m2: "2. Wealth Preservation: Nifty 50 Index SIP", m2sub: "Deploying ₹3,000/mo surplus.",
    m3: "3. Sovereign Gold Bonds (SGB) Reserve", m3sub: "RBI backed 2.5% semi-annual interest.",
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* SIP Confirmation Toast */}
      <div
        id="sip-confirm-toast"
        className="fixed bottom-6 right-6 z-50 bg-emerald text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold opacity-0 transition-opacity duration-500 pointer-events-none"
      >
        {c.sipInitiated}
      </div>
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-azure text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-azure" />
              <span>{c.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {c.title}
              <span className="block text-azure text-xl sm:text-2xl font-semibold mt-1">
                {c.titleSub}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-soft text-emerald border border-emerald/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              {c.sebi}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-canvas text-ink-muted border border-line">
              {c.zero}
            </span>
          </div>
        </div>
      </div>

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Primary Recommendation & Trajectory (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Primary Recommendation Card: Respects Deterministic Decision State */}
          {(decisionData?.action === "SUPPRESS" || decisionData?.action === "ASSIST_FIRST") ? (
            <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-5 border-t-4 border-t-vermilion">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-extrabold text-vermilion tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    INTENTIONAL FIDUCIARY SUPPRESSION ACTIVE
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">
                    Credit Solicitations Suppressed Under Fiduciary Policy
                  </h2>
                </div>
                <span className="bg-vermilion-soft text-vermilion text-xs font-extrabold px-3 py-1 rounded-full shrink-0">
                  Code: {decisionData?.ruleCode || "RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1"}
                </span>
              </div>

              <div className="bg-canvas p-5 rounded-xl border border-line flex flex-col gap-3">
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {lang === "hi" && decisionData?.explanationHi
                    ? decisionData.explanationHi
                    : lang === "gu" && decisionData?.explanationGu
                    ? decisionData.explanationGu
                    : decisionData?.explanationEn || "Under ARTHIX constitutional fiduciary rules (§4-5), new credit recommendations are intentionally withheld when the customer is experiencing financial stress. In this state, priority shifts entirely to cashflow assistance and debt defense via Sahara."}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-line text-xs">
                  <span className="text-ink-muted">Mandate: RBI Digital Lending Guidelines 2022 §3(B)</span>
                  <button onClick={onOpenNyay} className="text-azure font-bold hover:underline flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    {c.whyThis}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 text-xs text-ink-muted">
                <span className="font-bold text-ink text-xs uppercase tracking-wide">Protective Guardrails Enforced:</span>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald shrink-0" /><span>Zero predatory credit marketing — no loans pushed during cashflow shortfall.</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald shrink-0" /><span>Capital preservation prioritized before wealth accumulation.</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald shrink-0" /><span>Sahara 1-tap debt relief active to halt EMIs without CIBIL impact.</span></div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-5 border-t-4 border-t-azure">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-extrabold text-azure tracking-wider">
                    {c.optimal}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">
                    {decisionData?.candidateProduct?.name ? `${c.sipTitle}: ${decisionData.candidateProduct.name}` : c.sipTitle}
                  </h2>
                </div>
                <span className="bg-emerald-soft text-emerald text-xs font-extrabold px-3 py-1 rounded-full shrink-0">
                  {decisionData?.confidence ? `${Math.round(decisionData.confidence * 100)}% Suitability Match` : c.sipMatch}
                </span>
              </div>

              {/* Quantitative Deployment Figure */}
              <div className="bg-canvas p-5 rounded-xl border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-ink-muted">{c.deployment}</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-navy-deep font-tabular">₹3,000</span>
                    <span className="text-xs text-ink-muted">/ month</span>
                  </div>
                  <p className="text-xs text-ink-muted mt-1">
                    Consumes <strong>19.8%</strong> {c.surplus}
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    className="bg-navy-deep hover:bg-navy-rich text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all"
                    onClick={() => handleStartSip(decisionData?.candidateProduct?.id || "prod-nifty50-sip")}
                  >
                    {c.startSip}
                  </button>
                  <button onClick={onOpenNyay} className="text-azure text-xs font-semibold hover:underline flex items-center justify-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    {c.whyThis}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 text-xs text-ink-muted">
                <span className="font-bold text-ink text-xs uppercase tracking-wide">{c.guardrails}</span>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald shrink-0" /><span>{c.g1}</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald shrink-0" /><span>{c.g2}</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald shrink-0" /><span>{c.g3}</span></div>
              </div>
            </div>
          )}

          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedComparison(!expandedComparison)}>
              <div>
                <span className="text-xs uppercase font-extrabold text-ink-muted">{c.transparency}</span>
                <h3 className="text-base font-bold text-ink">{c.comparison}</h3>
              </div>
              {expandedComparison ? <ChevronUp className="w-5 h-5 text-ink-muted" /> : <ChevronDown className="w-5 h-5 text-ink-muted" />}
            </div>
            {expandedComparison && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-soft/50 border border-emerald/30 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-emerald font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" /><span>{c.directLabel}</span>
                  </div>
                  <div className="text-xs flex flex-col gap-1.5 text-ink">
                    <div className="flex justify-between"><span className="text-ink-muted">{c.expenseRatio}</span><span className="font-bold">0.12% per year</span></div>
                    <div className="flex justify-between"><span className="text-ink-muted">{c.commission}</span><span className="font-bold text-emerald">₹0 (Zero)</span></div>
                    <div className="flex justify-between"><span className="text-ink-muted">{c.lockin}</span><span className="font-bold">None (Flexible Exit)</span></div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-vermilion-soft/40 border border-vermilion/20 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 text-vermilion font-bold text-xs">
                    <XCircle className="w-4 h-4" /><span>{c.ulipLabel}</span>
                  </div>
                  <div className="text-xs flex flex-col gap-1.5 text-ink">
                    <div className="flex justify-between"><span className="text-ink-muted">Front-load Fees:</span><span className="font-bold text-vermilion">Up to 6.5% of premium</span></div>
                    <div className="flex justify-between"><span className="text-ink-muted">Agent Commission:</span><span className="font-bold text-vermilion">₹18,000 over 5 yrs</span></div>
                    <div className="flex justify-between"><span className="text-ink-muted">{c.lockin}</span><span className="font-bold text-vermilion">5 Years Mandatory</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 border border-line">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy-deep">{c.wealthTitle}</h3>
              <span className="text-xs font-bold text-emerald bg-emerald-soft px-2.5 py-1 rounded-full">{c.wealthBadge}</span>
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
              <span>{c.committed}</span>
              <span className="text-emerald font-bold">{c.netGain}</span>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col gap-5">
            <h3 className="text-base font-bold text-ink pb-2 border-b border-line">
              {c.milestonesTitle}
            </h3>
            <div className="flex flex-col gap-4 relative">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm">✓</div>
                <div>
                  <span className="text-xs font-bold text-ink block">{c.m1}</span>
                  <span className="text-xs text-ink-muted">{c.m1sub}</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-azure text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-sm animate-pulse">2</div>
                <div>
                  <span className="text-xs font-bold text-azure block">{c.m2}</span>
                  <span className="text-xs text-ink-muted">{c.m2sub}</span>
                </div>
              </div>
              <div className="flex items-start gap-3.5 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                <div>
                  <span className="text-xs font-bold text-ink block">{c.m3}</span>
                  <span className="text-xs text-ink-muted">{c.m3sub}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
