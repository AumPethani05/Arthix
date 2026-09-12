"use client";

import { useState } from "react";
import Image from "next/image";
import {
  HeartHandshake,
  AlertTriangle,
  Lock,
  CheckCircle2,
  X,
  ArrowRight,
  ShoppingBag,
  Wallet,
  Gavel,
  PhoneCall,
  Calendar,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

interface WebSaharaProps {
  lang: Lang;
  activePersona: "rahul" | "kamala";
}

export function WebSahara({ lang, activePersona }: WebSaharaProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [dueDateShifted, setDueDateShifted] = useState(false);

  const t = {
  en: {
    header: "ARTHIX Sahara Dignified Care",
    subtitle: "Sahara Financial Resilience & Relief Center",
    subtitleHi: "सहारा स्वास्थ्य एवं सुरक्षा केंद्र",
    protectiveHold: "PROTECTIVE HOLD ACTIVE",
    healthyBuffer: "HEALTHY BUFFER MAINTAINED",
    holdText: "कोई नया लोन नहीं",
    diagnosticIndex: "Diagnostic Index",
    resilienceIndex: "Resilience Index",
    highStress: "High Stress Flag",
    optimalHealth: "Optimal Health",
    cashFlowAudit: "CASH FLOW AUDIT (30 DAYS)",
    monthlyInflow: "Monthly Inflow",
    essentials: "Essentials (Food/Ration)",
    committedEmis: "Committed EMIs",
    monthlyDeficit: "Monthly Deficit",
    sovereignFramework: "Sovereign Protection Framework",
    reliefActions: "1-Tap Relief Actions",
    noPenalties: "No Penalties • No CIBIL Impact",
    recommended: "RECOMMENDED",
    emiPauseTitle: "Apply 60-Day EMI Pause on Machinery Loan",
    emiPauseDesc: "Temporarily freeze monthly ₹1,200 EMI due on 15th Sept without late fees or negative reporting to credit bureaus.",
    applyRelief: "Apply 1-Tap Relief",
    moratoriumActive: "Moratorium Active",
    reviewSchedule: "Review Schedule",
    shiftDueDate: "Shift Due Date",
    dateShifted: "✓ Date Shifted to 28th",
    counselorTitle: "Talk to a Dedicated Empathetic Counselor",
    requestCallback: "Request Dignified Callback",
    callbackScheduled: "✓ Callback Scheduled 4:30 PM",
    confirmRelief: "Confirm 60-Day EMI Relief",
    cancel: "Cancel",
    confirm1Tap: "Confirm 1-Tap Relief",
  },
  hi: {
    header: "आर्थिक्स सहारा सम्मानजनक देखभाल",
    subtitle: "सहारा वित्तीय लचीलापन और राहत केंद्र",
    subtitleHi: "सहारा स्वास्थ्य एवं सुरक्षा केंद्र",
    protectiveHold: "संरक्षण होल्ड सक्रिय",
    healthyBuffer: "स्वस्थ बफर बनाए रखा",
    holdText: "कोई नया लोन नहीं",
    diagnosticIndex: "निदान सूचकांक",
    resilienceIndex: "लचीलापन सूचकांक",
    highStress: "उच्च तनाव झंडा",
    optimalHealth: "संतुलित स्वास्थ्य",
    cashFlowAudit: "नकदी प्रवाह ऑडिट (30 दिन)",
    monthlyInflow: "मासिक आय",
    essentials: "आवश्यक व्यय (खाद्य/राशन)",
    committedEmis: "बंधक ईएमआई",
    monthlyDeficit: "मासिक घाटा",
    sovereignFramework: "संप्रभु संरक्षण ढाँचा",
    reliefActions: "1-टैप राहत कार्रवाई",
    noPenalties: "कोई जुर्माना नहीं • सीबीआईल कोई प्रभाव नहीं",
    recommended: "सिफारिश",
    emiPauseTitle: "मशीनरी लोन पर 60-दिवसीय ईएमआई विराम लागू करें",
    emiPauseDesc: "15 सितंबर की मासिक ₹1,200 ईएमआई को बिना देरी कस्तूयी या क्रेडिट ब्यूरो पर नकारात्मक रिपोर्टिंग के स्थगित करें।",
    applyRelief: "1-टैप राहत लागू करें",
    moratoriumActive: "मोरेटोरियम सक्रिय",
    reviewSchedule: "शेड्यूल समीक्षा",
    shiftDueDate: "दिनांक स्थानांतरित करें",
    dateShifted: "✓ दिनांक 28 तारीख स्थानांतरित",
    counselorTitle: "समर्पित सहानुभूतिपूर्ण परामर्शदाता से बात करें",
    requestCallback: "अतिथि भेजने का अनुरोध करें",
    callbackScheduled: "✓ 4:30 बजे कॉलशेड्यूल किया गया",
    confirmRelief: "60-दिवसीय ईएमआई राहत पुष्टि करें",
    cancel: "रद्द करें",
    confirm1Tap: "1-टैप राहत पुष्टि करें",
  },
  gu: {
    header: "આર્થિક્સ સહારા સભ્યમાન દેખરેખ",
    subtitle: "સહારા આર્થિક લોકસંકલ્પ અને રાહત કેન્દ્ર",
    subtitleHi: "સહારા સ્વાસ્થ્ય અને સુરક્ષા કેન્દ્ર",
    protectiveHold: "સંરક્ષણ હોલ્ડ સક્રિય",
    healthyBuffer: "સ્વસ્થ બફર સુરક્ષિત",
    holdText: "કોઈ નવો કરજ નથી",
    diagnosticIndex: "નોંધણી સૂચક",
    resilienceIndex: "લચીલાપણ સૂચક",
    highStress: "ઉચ્ચ તણાવ ઝંડો",
    optimalHealth: "સુદ્ધ સ્વાસ્થ્ય",
    cashFlowAudit: "નાખરો ઓડિટ (30 દિવસ)",
    monthlyInflow: "માસિક આવક",
    essentials: "આવશ્યક ખર્ચ (ખાદ્ય/રાશન)",
    committedEmis: "બંધિત ઈએમઆઈ",
    monthlyDeficit: "માસિક ઘાટો",
    sovereignFramework: "સંપ્રભુ સંરક્ષણ ઢાંચો",
    reliefActions: "1-ટેપ રાહત કાર્યો",
    noPenalties: "કોઈ જુર્માનો નથી • સીબીઆઈએ પ્રભાવ નથી",
    recommended: "સિફારિશ",
    emiPauseTitle: "મશીનરી લોન પર 60-દિવસીય ઈએમઆઈ થમેન લાગૂ કરો",
    emiPauseDesc: "15 સપ્ટેમ્બરની માસિક ₹1,200 ઈએમઆઈ ડેરી શુલ્ક કે ક્રેડિટ બ્યુરો પર નકારાત્મક રિપોર્ટિંગ વિના થમેન કરો.",
    applyRelief: "1-ટેપ રાહત લાગૂ કરો",
    moratoriumActive: "મોરેટોરિયમ સક્રિય",
    reviewSchedule: "શેડ્યુલ સમીક્ષા",
    shiftDueDate: "દિવસાંક સ્થાનાંતરિત કરો",
    dateShifted: "✓ દિવસાંક 28 ના સ્થાનાંતરિત",
    counselorTitle: "સમર્પણ સહાનુભૂતિપૂર્ણ કાઉન્સલર સાથે બાત કરો",
    requestCallback: "અતિથિ વિનંતી કરો",
    callbackScheduled: "✓ 4:30 વાગ્યે કૉલ શેડ્યુલ",
    confirmRelief: "60-દિવસીય ઈએમઆઈ રાહત પુષ્ટિ કરો",
    cancel: "રદ કરો",
    confirm1Tap: "1-ટેપ રાહત પુષ્ટિ કરો",
  }
};

  const isStress = activePersona === "kamala";

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-16">
      {/* Top Header Banner */}
      <div className="glass-card rounded-3xl p-7 sm:p-9 flex flex-col gap-6 shadow-sm border border-line">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-azure text-xs sm:text-sm font-extrabold tracking-wider uppercase mb-1">
              <HeartHandshake className="w-5 h-5 text-azure" />
              <span>{(lang === "hi" ? t.hi.header : t.en.header) + " • Sovereign Welfare Tier"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-deep">
              {(lang === "hi" ? t.hi.subtitle : t.en.subtitle)}
              <span className="block text-azure text-2xl sm:text-3xl font-bold mt-1">
                {lang === "hi" ? t.hi.subtitleHi : t.en.subtitleHi}
              </span>
            </h1>
          </div>

          {/* Profile Capsule */}
          <div className="flex items-center gap-3.5 bg-canvas p-3.5 pl-5 rounded-2xl border border-line shadow-sm">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald/20">
                <Image
                  src="/portrait-kamala.png"
                  alt="Profile Portrait"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              {isStress && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-vermilion flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  !
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-ink">
                  {isStress ? "Kamala Devi" : "Rahul Sharma"}
                </span>
                <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {isStress ? "Artisan MSME" : "Salaried Tier-2"}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-ink-muted block mt-0.5">
                {isStress ? "Reg ID: BRT-GJ-90214 • Surat Cluster" : "Reg ID: BRT-DL-44819 • Salaried"}
              </span>
            </div>
          </div>
        </div>

        {/* Protective Alert Banner */}
        <div
          className={`rounded-2xl p-6 border flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
            isStress
              ? "bg-vermilion-soft/70 border-vermilion/30"
              : "bg-emerald-soft/70 border-emerald/30"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 ${
                isStress ? "bg-vermilion text-white shadow-md" : "bg-emerald text-white shadow-md"
              }`}
            >
              {isStress ? <Lock className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
            </div>
            <div className="flex flex-col gap-1.5 max-w-3xl">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span
                  className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full ${
                    isStress
                      ? "bg-vermilion text-white tracking-wider"
                      : "bg-emerald text-white tracking-wider"
                  }`}
                >
                  {isStress ? "PROTECTIVE HOLD ACTIVE" : "HEALTHY BUFFER MAINTAINED"}
                </span>
                <span className="text-base font-bold text-ink">
                  {isStress
                    ? "(अभी कोई नया लोन या क्रेडिट कार्ड नहीं दिया जा रहा है)"
                    : "(ऋण सुरक्षा अनुपात सुरक्षित सीमा में है)"}
                </span>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed">
                {isStress ? (
                  <>
                    <strong>ARTHIX detected an outflow mismatch:</strong> Active monthly EMIs currently
                    consume <strong>58% of monthly inflow</strong> due to delayed seasonal craft
                    wholesale payments. We deliberately lock all loan solicitation, upsells, and
                    pre-approved marketing to shield your family from compounding interest stress.
                  </>
                ) : (
                  <>
                    <strong>Liquidity buffer verified:</strong> EMIs consume only 16% of monthly net
                    inflows. All borrowing is verified safe and in compliance with institutional
                    fiduciary standards.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold bg-white px-4 py-2.5 rounded-xl border border-line text-ink-muted shrink-0 shadow-sm">
            <Gavel className="w-4 h-4 text-navy-rich" />
            <span>Customer First Policy §14</span>
          </div>
        </div>
      </div>

      {/* Main 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Diagnostics (4 cols) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-7 sm:p-8 flex flex-col gap-6 shadow-sm border border-line">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-ink-muted">
                Diagnostic Index
              </span>
              <h3 className="text-xl font-bold text-navy-deep mt-0.5">Resilience Index</h3>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full font-extrabold flex items-center gap-2 ${
                isStress ? "bg-vermilion-soft text-vermilion" : "bg-emerald-soft text-emerald"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  isStress ? "bg-vermilion" : "bg-emerald"
                }`}
              />
              {isStress ? "सावधानी आवश्यक" : "सुरक्षित स्थिति"}
            </span>
          </div>

          {/* SVG Score Gauge */}
          <div className="flex flex-col items-center justify-center my-3 relative">
            <svg className="w-52 h-52 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                className="stroke-slate-100"
                cx="60"
                cy="60"
                fill="none"
                r="50"
                strokeWidth="10"
              />
              <circle
                className={isStress ? "stroke-vermilion" : "stroke-emerald"}
                cx="60"
                cy="60"
                fill="none"
                r="50"
                strokeWidth="10"
                strokeDasharray={`${isStress ? 131.9 : 232.5} 314.159`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-extrabold text-navy-deep font-tabular">
                {isStress ? "42" : "74"}
                <span className="text-base font-normal text-ink-muted">/100</span>
              </span>
              <span
                className={`text-xs font-extrabold uppercase tracking-wider mt-1 ${
                  isStress ? "text-vermilion" : "text-emerald"
                }`}
              >
                {isStress ? "High Stress Flag" : "Optimal Health"}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ink-muted text-center px-3 leading-relaxed">
            {isStress
              ? "Financial health score fell by 14 points following delayed invoice clearance from Gujarat State Khadi Board."
              : "Financial health score is stable with a healthy 3.2-month reserve."}
          </p>

          {/* Cashflow Breakdown Ledger */}
          <div className="bg-canvas p-5 rounded-2xl border border-line flex flex-col gap-3.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-ink-muted">
              CASH FLOW AUDIT (30 DAYS)
            </span>

            <div className="flex items-center justify-between text-xs sm:text-sm pt-1 border-b border-line-faint pb-2.5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald" />
                <span className="text-ink font-medium">Monthly Inflow</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-ink font-tabular text-sm sm:text-base">
                  {isStress ? "₹24,000" : "₹52,000"}
                </span>
                <span className="block text-xs text-vermilion font-medium">
                  {isStress ? "-18% delayed" : "+20% stable"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm pt-1 border-b border-line-faint pb-2.5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-ink-muted" />
                <span className="text-ink font-medium">Essentials (Food/Ration)</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-ink font-tabular text-sm sm:text-base">
                  {isStress ? "₹14,200" : "₹28,400"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm pt-1 border-b border-line-faint pb-2.5">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-vermilion" />
                <span className="text-ink font-medium">Committed EMIs</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-vermilion font-tabular text-sm sm:text-base">
                  {isStress ? "₹13,920" : "₹8,500"}
                </span>
                <span className="block text-xs text-vermilion font-semibold">
                  {isStress ? "58% Outflow (2 Loans)" : "16% Outflow"}
                </span>
              </div>
            </div>

            <div className="mt-2 p-3.5 rounded-xl bg-white border border-line flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-vermilion">
                <AlertTriangle className="w-4 h-4" />
                <span>Monthly Deficit</span>
              </div>
              <span className="text-base sm:text-lg font-extrabold text-vermilion font-tabular">
                {isStress ? "-₹4,120" : "+₹15,120"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Relief Actions (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-7 sm:p-8 flex flex-col gap-5 shadow-sm border border-line">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-ink-muted">
                  Sovereign Protection Framework
                </span>
                <h3 className="text-xl font-bold text-navy-deep mt-0.5">
                  1-Tap Relief Actions (RBI Master Circular §8.2)
                </h3>
              </div>
              <span className="text-xs bg-azure-soft text-azure px-3.5 py-1.5 rounded-full font-extrabold">
                No Penalties • No CIBIL Impact
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {/* Option 1: Handloom EMI Moratorium */}
              <div className="p-6 rounded-2xl border border-line bg-canvas hover:border-azure transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
                <div className="flex flex-col gap-1.5 max-w-xl">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-azure text-white text-xs font-extrabold px-2.5 py-0.5 rounded-md">
                      RECOMMENDED
                    </span>
                    <h4 className="text-base font-bold text-ink">
                      Apply 60-Day EMI Pause on Machinery Loan
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Temporarily freeze monthly ₹1,200 EMI due on 15th Sept without late fees or
                    negative reporting to credit bureaus. Backed by Gujarat Handloom Support Scheme.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-emerald font-bold mt-1">
                    <span>✓ Saves ₹2,400 immediate outflow</span>
                    <span>✓ 0 penalty guarantee</span>
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  disabled={applied}
                  className={`px-6 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm shrink-0 transition-all ${
                    applied
                      ? "bg-emerald text-white cursor-default"
                      : "bg-navy-deep hover:bg-navy-rich text-white shadow-md hover:scale-105"
                  }`}
                >
                  {applied ? "Moratorium Active" : "Apply 1-Tap Relief"}
                </button>
              </div>

              {/* Option 2: Restructure Credit Dues */}
              <div className="p-6 rounded-2xl border border-line bg-canvas hover:border-azure transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
                <div className="flex flex-col gap-1.5 max-w-xl">
                  <h4 className="text-base font-bold text-ink">
                    Consolidate ₹12,720 Card Debt into 0% 12-Month Fiduciary Plan
                  </h4>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Convert compounding credit dues into a transparent zero-interest schedule. Cuts
                    monthly payment from ₹13,920 to ₹6,500 immediately.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-ink-muted mt-1">
                    <span>• Institutional mediator: State Bank of India</span>
                    <span>• No processing fee</span>
                  </div>
                </div>

                <button
                  onClick={() => setModalOpen(true)}
                  className="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shrink-0 bg-white hover:bg-slate-100 text-ink border border-line transition-all shadow-sm"
                >
                  Review Schedule
                </button>
              </div>

              {/* Option 3: Shift Due Date */}
              <div className="p-6 rounded-2xl border border-line bg-canvas hover:border-azure transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
                <div className="flex flex-col gap-1.5 max-w-xl">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-azure-soft text-azure text-xs font-extrabold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      CROP & CRAFT ALIGNMENT
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-ink">
                    Realign EMI Due Date to Festive Inflow (28th)
                  </h4>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Shift debit from 5th to 28th, matching Diwali artisan market payouts. Prevents
                    ₹590 NACH bounce fee per cycle.
                  </p>
                </div>

                <button
                  onClick={() => setDueDateShifted(true)}
                  disabled={dueDateShifted}
                  className={`px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shrink-0 transition-all shadow-sm ${
                    dueDateShifted
                      ? "bg-emerald text-white cursor-default"
                      : "bg-white hover:bg-slate-100 text-ink border border-line"
                  }`}
                >
                  {dueDateShifted ? "✓ Date Shifted to 28th" : "Shift Due Date"}
                </button>
              </div>

              {/* Option 4: Request Dignified Callback */}
              <div className="p-6 rounded-2xl border border-line bg-canvas hover:border-azure transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
                <div className="flex flex-col gap-1.5 max-w-xl">
                  <h4 className="text-base font-bold text-ink flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-azure" />
                    Talk to a Dedicated Empathetic Counselor
                  </h4>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    Free confidential callback via sovereign encrypted line. Hindi • Gujarati • English.
                    No pressure, no upselling — ever.
                  </p>
                  <div className="text-xs text-emerald font-bold">✓ Free • Toll Free: 1800-ARTHIX-CARE</div>
                </div>

                <button
                  onClick={() => setCallbackRequested(true)}
                  disabled={callbackRequested}
                  className={`px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shrink-0 transition-all shadow-sm ${
                    callbackRequested
                      ? "bg-emerald text-white cursor-default"
                      : "bg-navy-deep hover:bg-navy-rich text-white shadow-md"
                  }`}
                >
                  {callbackRequested ? "✓ Callback Scheduled 4:30 PM" : "Request Dignified Callback"}
                </button>
              </div>

              {/* Option 5: Direct DBT Grant Assistance */}
              <div className="p-6 rounded-2xl border border-line bg-canvas flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
                <div className="flex flex-col gap-1.5 max-w-xl">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-emerald-soft text-emerald text-xs font-extrabold px-2.5 py-0.5 rounded-md">
                      GOVERNMENT DBT
                    </span>
                    <h4 className="text-base font-bold text-ink">
                      PM Vishwakarma Artisan Toolkit Incentive
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    ₹15,000 direct grant ready for disbursement to Kamala Devi's Aadhaar-linked SBI
                    account upon automated verification.
                  </p>
                </div>

                <a
                  href="https://pmvishwakarma.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shrink-0 bg-white hover:bg-slate-100 text-azure border border-line transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Verify Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 1-Tap Relief Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-line relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-ink-muted hover:text-ink p-1.5 rounded-xl hover:bg-canvas"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3.5 pb-5 border-b border-line">
              <div className="w-12 h-12 rounded-2xl bg-azure-soft text-azure flex items-center justify-center">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-navy-deep">Confirm 60-Day EMI Relief</h3>
                <span className="text-xs text-ink-muted">
                  Backed by RBI Fiduciary Directive • No Bureau Penalty
                </span>
              </div>
            </div>

            <div className="py-5 flex flex-col gap-4 text-xs sm:text-sm text-ink">
              <div className="p-4 rounded-2xl bg-canvas border border-line flex flex-col gap-2.5">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Account</span>
                  <span className="font-bold">SBI Micro Loan #•••• 9021</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Monthly Outflow Paused</span>
                  <span className="font-extrabold text-emerald font-tabular text-base">₹1,200 / month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Pause Duration</span>
                  <span className="font-semibold">Sept 15, 2026 – Nov 15, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Bureau Impact</span>
                  <span className="font-extrabold text-emerald">0 Impact (Protected Status)</span>
                </div>
              </div>

              <p className="text-ink-muted leading-relaxed text-xs sm:text-sm">
                By tapping confirm, ARTHIX transmits an automated moratorium instruction to State
                Bank of India via the Account Aggregator network. Your auto-debit will be held for 60
                days.
              </p>
            </div>

            <div className="pt-4 border-t border-line flex items-center justify-end gap-3.5">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-ink-muted hover:text-ink"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setApplied(true);
                  setModalOpen(false);
                }}
                className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-emerald hover:bg-emerald-deep text-white shadow-lg transition-all"
              >
                Confirm 1-Tap Relief
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
