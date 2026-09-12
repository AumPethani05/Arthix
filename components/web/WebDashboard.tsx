"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight,
  Compass,
  Download,
  PhoneCall,
  Scale,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

interface WebDashboardProps {
  lang: Lang;
  onNavigateTab: (tab: string) => void;
  onSelectPersona: (persona: "rahul" | "kamala") => void;
  activePersona: "rahul" | "kamala";
}

export function WebDashboard({ lang, onNavigateTab, onSelectPersona, activePersona }: WebDashboardProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [decisionData, setDecisionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setFetchError(null);

    Promise.all([
      fetch(`/api/v1/me/profile?persona=${activePersona}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      }),
      fetch(`/api/v1/recommendations?persona=${activePersona}`).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        return res.json();
      }),
    ])
      .then(([profile, decision]) => {
        setProfileData(profile);
        setDecisionData(decision);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setFetchError(err.message || "Failed to load real-time intelligence");
      })
      .finally(() => setLoading(false));
  }, [activePersona]);

  // Content localized based on lang
  const t = {
    en: {
      greeting: activePersona === "rahul" ? "Namaste, Rahul Sharma" : "Namaste, Kamala Devi",
      profileType: activePersona === "rahul" ? "Tier-2 Salaried Specialist" : "Artisan MSME Cluster",
      syncStatus: "Synchronized with SBI (•••• 4218) today at 09:41 AM IST via RBI Account Aggregator",
      pledge: '"The right product. The right moment. Or no product at all."',
      pledgeLabel: "Institutional Fiduciary Pledge:",
      liquidBalance: "Primary Liquid Balance",
      emiBurden: "Active EMI Debt Burden",
      netSurplus: "Net Monthly Surplus",
      heroBadge: "Vivek Sovereign Intelligence",
      zeroCommission: "Zero-Commission Certified • No Intermediary Bias",
      heroTitle:
        activePersona === "rahul"
          ? "Prudent Capital Expansion Unlocked for Tier-2 Salaried Profile"
          : "Protective Debt Relief Guard Active for Artisan MSME Profile",
      heroDesc:
        activePersona === "rahul"
          ? "Your disposable surplus sustained a +20% run rate for 2 consecutive monthly accounting cycles. 3.2 months of non-discretionary emergency liquidity verified. No predatory debt detected."
          : "Active EMIs consume 58% of monthly income due to delayed handloom payments. ARTHIX has locked all loan solicitations and unlocked a 1-tap moratorium relief.",
      heroPrimaryCta: activePersona === "rahul" ? "Review ₹3,000 Nifty 50 Index SIP" : "Apply 1-Tap EMI Pause",
      heroSecondaryCta: "Inspect Algorithmic Rationale (Why This?)",
      runwayTitle: "Cashflow & Liquidity Runway Envelopes",
      runwayMonths: activePersona === "rahul" ? "3.2 Months Runway Secured" : "1.4 Months Tight Reserve",
    },
    hi: {
      greeting: activePersona === "rahul" ? "नमस्ते, राहुल शर्मा" : "नमस्ते, कमला देवी",
      profileType: activePersona === "rahul" ? "वेतनभोगी विशेषज्ञ (Tier-2)" : "हस्तशिल्प कारीगर (MSME)",
      syncStatus: "भारतीय स्टेट बैंक (•••• 4218) से आज सुबह 09:41 बजे आरबीआई अकाउंट एग्रीगेटर द्वारा सत्यापित",
      pledge: '"सही उत्पाद। सही समय। या कोई उत्पाद नहीं।"',
      pledgeLabel: "संस्थागत विश्वास प्रतिज्ञा:",
      liquidBalance: "उपलब्ध बैंक बैलेंस",
      emiBurden: "सक्रिय ईएमआई कर्ज का बोझ",
      netSurplus: "शुद्ध मासिक बचत अधिशेष",
      heroBadge: "विवेक सॉवरेन इंटेलिजेंस",
      zeroCommission: "शून्य कमीशन प्रमाणित • निष्पक्ष सलाह",
      heroTitle:
        activePersona === "rahul"
          ? "सुरक्षित संपत्ति वृद्धि का मार्ग खुला"
          : "सुरक्षात्मक ईएमआई राहत सक्रिय",
      heroDesc:
        activePersona === "rahul"
          ? "आपकी शुद्ध बचत में पिछले 2 महीनों से +20% की सतत वृद्धि है। 3.2 महीने की आपातकालीन नकदी सुरक्षित है।"
          : "हस्तशिल्प भुगतान में देरी के कारण ईएमआई आय का 58% ले रही है। विवेक ने नए लोन रोक दिए हैं और ईएमआई राहत की सिफारिश की है।",
      heroPrimaryCta: activePersona === "rahul" ? "₹3,000 इंडेक्स एसआईपी देखें" : "1-क्लिक ईएमआई रोकें",
      heroSecondaryCta: "विवेक का कारण देखें (Why This?)",
      runwayTitle: "नकदी प्रवाह एवं सुरक्षा रनवे",
      runwayMonths: activePersona === "rahul" ? "3.2 माह का सुरक्षा कोष" : "1.4 माह का सीमित कोष",
    },
    gu: {
      greeting: activePersona === "rahul" ? "નમસ્તે, રાહુલ શર્મા" : "નમસ્તે, કમલા દેવી",
      profileType: activePersona === "rahul" ? "પગારદાર નિષ્ણાત" : "કારીગર એમએસએમઈ",
      syncStatus: "એસબીઆઈ ખાતા સાથે આરબીઆઈ એકાઉન્ટ એગ્રીગેટર મારફત સમન્વયિત",
      pledge: '"યોગ્ય ઉત્પાદન. યોગ્ય ક્ષણ. અથવા કંઈ જ નહીં."',
      pledgeLabel: "સંસ્થાકીય વચનબદ્ધતા:",
      liquidBalance: "પ્રાથમિક ઉપલબ્ધ બેલેન્સ",
      emiBurden: "ચાલુ ઇએમઆઈ દેવાનો બોજ",
      netSurplus: "ચોખ્ખી માસિક બચત",
      heroBadge: "વિવેક સોવરેન ઇન્ટેલિજન્સ",
      zeroCommission: "ઝીરો કમિશન પ્રમાણિત • કોઈ વચેટિયા નફો નહીં",
      heroTitle:
        activePersona === "rahul"
          ? "સુરક્ષિત રોકાણ વૃદ્ધિ વિકલ્પ ઉપલબ્ધ"
          : "સુરક્ષાત્મક દેવા રાહત સક્રિય",
      heroDesc:
        activePersona === "rahul"
          ? "તમારી માસિક બચતમાં 20% વૃદ્ધિ જોવા મળી છે. 3.2 મહિનાનું ઇમરજન્સી ફંડ ઉપલબ્ધ છે."
          : "કારીગરી પેમેન્ટ વિલંબિત હોવાથી ઇએમઆઈ 58% આવક વાપરી રહી છે. તમામ લોન વેચાણ પર રોક લગાવી છે.",
      heroPrimaryCta: activePersona === "rahul" ? "₹3,000 ઇન્ડેક્સ એસઆઈપી તપાસો" : "ઇએમઆઈ સ્થગિત કરો",
      heroSecondaryCta: "અલ્ગોરિધમિક કારણ તપાસો",
      runwayTitle: "કેશફ્લો અને સુરક્ષા રનવે",
      runwayMonths: activePersona === "rahul" ? "3.2 મહિનાનો રનવે સુરક્ષિત" : "1.4 મહિનાનું રિઝર્વ",
    },
  }[lang];

  const liquidBal = profileData?.accounts?.[0]?.balance ?? (activePersona === "rahul" ? 64820 : 18400);
  const inflow = profileData?.income ?? (activePersona === "rahul" ? 52000 : 24000);
  const emiAmount = profileData?.emiOutflow ?? (activePersona === "rahul" ? 8500 : 13920);
  const emiPct = Math.round((emiAmount / (inflow || 1)) * 100);
  const surplus = profileData?.surplus ?? (activePersona === "rahul" ? 15120 : -4120);
  const runway = profileData?.runwayMonths ?? (activePersona === "rahul" ? 3.2 : 1.4);
  const essentialSpends = profileData?.essentialSpends ?? (activePersona === "rahul" ? 28400 : 14200);

  const action = decisionData?.action || decisionData?.decision || (activePersona === "rahul" ? "RECOMMEND" : "ASSIST_FIRST");
  const ruleCode = decisionData?.ruleCode || (action === "SUPPRESS" ? "RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1" : action === "RECOMMEND" ? "RULE_EXPANSION_STABLE_SURPLUS_V4" : "RULE_STRESS_ASSIST_FIRST_V1");
  const headline = decisionData?.headline || t.heroTitle;
  const description = (lang === "hi" ? decisionData?.explanationHi : lang === "gu" ? decisionData?.explanationGu : decisionData?.explanationEn) || decisionData?.subline || t.heroDesc;

  const getDecisionBadge = () => {
    switch (action) {
      case "RECOMMEND":
        return {
          label: "RECOMMEND",
          sub: "Approved Fiduciary Expansion",
          color: "bg-emerald text-white",
          targetTab: "jeevanchakra",
          cta: activePersona === "rahul" ? t.heroPrimaryCta : "Review Recommendation",
        };
      case "ASSIST_FIRST":
        return {
          label: "ASSIST_FIRST",
          sub: "Priority Fiduciary Care",
          color: "bg-vermilion text-white",
          targetTab: "sahara",
          cta: lang === "hi" ? "1-क्लिक ईएमआई राहत" : lang === "gu" ? "૧-ટેપ ઇએમઆઈ રાહત" : "Apply 1-Tap Relief",
        };
      case "SUPPRESS":
        return {
          label: "SUPPRESS",
          sub: "Intentional Debt Shield Active",
          color: "bg-amber-600 text-white",
          targetTab: "sahara",
          cta: lang === "hi" ? "सुरक्षा विवरण देखें" : lang === "gu" ? "સુરક્ષા વિગતો જુઓ" : "Inspect Protective Shield",
        };
      case "VERIFY":
        return {
          label: "VERIFY",
          sub: "Verification Pending",
          color: "bg-azure text-white",
          targetTab: "consent",
          cta: "Verify with Kavach",
        };
      default:
        return {
          label: action,
          sub: "Sovereign Intelligence",
          color: "bg-azure text-white",
          targetTab: "vivek",
          cta: "Inspect Decision",
        };
    }
  };

  const decisionBadge = getDecisionBadge();

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto pb-16">
      {/* Top Banner & Institutional Context */}
      <div className="glass-card rounded-3xl p-7 sm:p-9 flex flex-col gap-6 shadow-sm border border-line">
        <div className="flex flex-wrap items-start sm:items-center justify-between gap-5 pb-5 border-b border-line">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-navy-deep">
                {t.greeting}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-soft text-emerald border border-emerald/20">
                <CheckCircle2 className="w-4 h-4" />
                KYC Verified • Aadhaar Linked
              </span>
            </div>
            <p className="text-sm text-ink-muted flex items-center gap-2 mt-1.5">
              <Calendar className="w-4 h-4 text-azure" />
              {t.syncStatus}
            </p>
          </div>

          <div className="bg-canvas px-5 py-2.5 rounded-2xl flex items-center gap-2.5 border border-line text-xs sm:text-sm">
            <Scale className="w-4 h-4 text-navy-rich" />
            <span className="font-extrabold text-navy-rich">{t.pledgeLabel}</span>
            <span className="text-ink-muted italic hidden md:inline">{t.pledge}</span>
          </div>
        </div>

        {/* 3 Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Metric 1 */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-line flex flex-col justify-between relative overflow-hidden group hover:border-azure transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink-muted">
                {t.liquidBalance}
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-ink-muted hover:text-ink transition-colors p-1.5 rounded-lg hover:bg-canvas"
                title="Toggle Balance Visibility"
              >
                {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
            <div className="my-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-navy-deep font-tabular">
                {showBalance ? `₹${liquidBal.toLocaleString("en-IN")}` : "••••••••"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm text-ink-muted pt-3 border-t border-line">
              <span className="flex items-center gap-1.5">
                Inflow: <strong className="text-ink font-tabular">₹{inflow.toLocaleString("en-IN")}</strong>
                <span className="text-emerald font-bold">{surplus >= 0 ? "(+20%)" : "(-18%)"}</span>
              </span>
              <span>
                Spends: <strong className="text-ink font-tabular">₹{essentialSpends.toLocaleString("en-IN")}</strong>
              </span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-line flex flex-col justify-between relative overflow-hidden group hover:border-azure transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink-muted">
                {t.emiBurden}
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full font-extrabold ${
                  emiPct <= 35
                    ? "bg-emerald-soft text-emerald"
                    : "bg-vermilion-soft text-vermilion"
                }`}
              >
                {emiPct <= 35 ? `Safe Zone (${emiPct}%)` : `High Stress (${emiPct}%)`}
              </span>
            </div>
            <div className="my-4">
              <span className="text-4xl sm:text-5xl font-extrabold text-navy-deep font-tabular">
                ₹{emiAmount.toLocaleString("en-IN")}
                <span className="text-base font-normal text-ink-muted">/mo</span>
              </span>
            </div>
            <div className="flex flex-col gap-2 pt-3 border-t border-line">
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    emiPct <= 35 ? "bg-emerald" : "bg-vermilion"
                  }`}
                  style={{ width: `${Math.min(100, emiPct)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-ink-muted font-medium">
                  {emiPct}% of Net Inflow
                </span>
                <button
                  onClick={() => onNavigateTab("sahara")}
                  className="text-azure font-bold hover:underline flex items-center gap-1"
                >
                  Manage Sahara <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-line flex flex-col justify-between relative overflow-hidden group hover:border-azure transition-all shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-ink-muted">
                {t.netSurplus}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-extrabold ${surplus >= 0 ? "bg-azure-soft text-azure" : "bg-vermilion-soft text-vermilion"}`}>
                {surplus >= 0 ? "Disciplined Float" : "Deficit Warning"}
              </span>
            </div>
            <div className="my-4">
              <span
                className={`text-4xl sm:text-5xl font-extrabold font-tabular ${
                  surplus >= 0 ? "text-emerald" : "text-vermilion"
                }`}
              >
                {surplus >= 0 ? `₹${surplus.toLocaleString("en-IN")}` : `-₹${Math.abs(surplus).toLocaleString("en-IN")}`}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm pt-3 border-t border-line">
              <span className="text-ink-muted flex items-center gap-1.5 font-medium">
                <CheckCircle2 className={`w-4 h-4 ${surplus >= 0 ? "text-emerald" : "text-vermilion"}`} />
                {surplus >= 0 ? "Buffer readiness: 100%" : "Buffer deficit"}
              </span>
              <button
                onClick={() => onNavigateTab(surplus >= 0 ? "jeevanchakra" : "sahara")}
                className="text-azure font-extrabold hover:underline"
              >
                {surplus >= 0 ? "Deploy in SIP" : "Request Moratorium"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vivek Intelligence Engine Banner (Desktop Hero Card) */}
      <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-navy-deep via-navy to-navy-rich text-white shadow-xl overflow-hidden">
        {/* Background glow meshes */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-azure/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`${decisionBadge.color} px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase flex items-center gap-2 shadow-sm`}>
                <Sparkles className="w-4 h-4" />
                {decisionBadge.label} • {decisionBadge.sub}
              </span>
              <span className="bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/95 flex items-center gap-2 border border-white/20">
                <ShieldCheck className="w-4 h-4 text-emerald-bright" />
                Rule: {ruleCode}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
              {headline}
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{description}</p>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <Lock className="w-4 h-4 text-emerald-bright" />
              <span>Algorithmic mandate: capital safety enforced before any investment.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
            <button
              onClick={() => onNavigateTab(decisionBadge.targetTab)}
              className="bg-white hover:bg-slate-50 text-navy-deep px-7 py-4 rounded-2xl font-extrabold text-sm sm:text-base shadow-xl transition-all flex items-center justify-center gap-2.5 hover:scale-[1.02]"
            >
              <span>{decisionBadge.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab("nyay")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 py-3.5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{t.heroSecondaryCta}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Grid: Cashflow Envelopes & Direct Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cashflow & Runway (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-7 sm:p-8 flex flex-col gap-6 shadow-sm border border-line">
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-ink-muted">
                Runway Security
              </span>
              <h3 className="text-xl font-bold text-navy-deep mt-0.5">{t.runwayTitle}</h3>
            </div>
            <div className="flex items-center gap-2 bg-canvas px-4 py-2 rounded-full border border-line text-xs font-bold text-navy-rich">
              <ShieldCheck className="w-4 h-4 text-emerald" />
              <span>{runway} Months {runway >= 3.0 ? "Runway Secured" : "Tight Reserve"}</span>
            </div>
          </div>

          {/* Runway visual bar */}
          <div className="bg-canvas p-5 rounded-2xl border border-line flex flex-col gap-3.5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-ink-muted font-medium">
                Threshold Requirement: <strong className="text-ink">3.0 Months (₹{(essentialSpends * 3).toLocaleString("en-IN")})</strong>
              </span>
              <span className={`font-bold font-tabular text-sm ${runway >= 3.0 ? "text-emerald" : "text-amber-600"}`}>
                {Math.round((runway / 3.0) * 100)}% Met
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3.5 overflow-hidden">
              <div
                className={`h-3.5 rounded-full transition-all duration-500 ${
                  runway >= 3.0 ? "bg-emerald" : "bg-amber"
                }`}
                style={{ width: `${Math.min(100, Math.round((runway / 3.0) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-ink-muted font-medium">
              <span>0 mo</span>
              <span>1 mo</span>
              <span>2 mo</span>
              <span className="text-emerald font-extrabold">3 mo (Safe Target)</span>
              <span>4+ mo</span>
            </div>
          </div>

          {/* Monthly Budget Envelopes */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="bg-canvas p-4 rounded-2xl border border-line text-center">
              <span className="text-xs text-ink-muted font-semibold block">Essential Living</span>
              <span className="text-lg sm:text-xl font-extrabold text-ink font-tabular mt-1 block">
                ₹{essentialSpends.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-ink-muted">Rent, Ration, Utilities</span>
            </div>
            <div className="bg-canvas p-4 rounded-2xl border border-line text-center">
              <span className="text-xs text-ink-muted font-semibold block">Committed EMIs</span>
              <span className="text-lg sm:text-xl font-extrabold text-ink font-tabular mt-1 block">
                ₹{emiAmount.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-ink-muted">Active Loan Dues</span>
            </div>
            <div className="bg-canvas p-4 rounded-2xl border border-line text-center">
              <span className="text-xs text-ink-muted font-semibold block">Investable Float</span>
              <span
                className={`text-lg sm:text-xl font-extrabold font-tabular mt-1 block ${
                  surplus >= 0 ? "text-emerald" : "text-vermilion"
                }`}
              >
                {surplus >= 0 ? `₹${surplus.toLocaleString("en-IN")}` : `-₹${Math.abs(surplus).toLocaleString("en-IN")}`}
              </span>
              <span className="text-xs text-ink-muted">Unrestricted Surplus</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Tools (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-7 sm:p-8 flex flex-col gap-5 shadow-sm border border-line">
            <h3 className="text-lg font-bold text-navy-deep pb-3 border-b border-line">
              Fiduciary Quick Tools
            </h3>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => onNavigateTab("sahara")}
                className="flex items-center justify-between p-4 rounded-2xl bg-canvas hover:bg-slate-100/90 transition-all border border-line text-left group shadow-sm hover:shadow"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-azure-soft text-azure flex items-center justify-center font-bold shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-ink block">Sahara Debt Shield</span>
                    <span className="text-xs text-ink-muted">
                      Protect against collection calls & predatory fees
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-ink-muted group-hover:text-navy-deep transition-colors" />
              </button>

              <button
                onClick={() => onNavigateTab("bhashasahayak")}
                className="flex items-center justify-between p-4 rounded-2xl bg-canvas hover:bg-slate-100/90 transition-all border border-line text-left group shadow-sm hover:shadow"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-soft text-emerald flex items-center justify-center font-bold shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-ink block">BhashaSahayak Voice</span>
                    <span className="text-xs text-ink-muted">
                      Speak in Hindi, Gujarati or 20 other languages
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-ink-muted group-hover:text-navy-deep transition-colors" />
              </button>

              <button
                onClick={() => onNavigateTab("consent")}
                className="flex items-center justify-between p-4 rounded-2xl bg-canvas hover:bg-slate-100/90 transition-all border border-line text-left group shadow-sm hover:shadow"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-terracotta-soft text-terracotta flex items-center justify-center font-bold shrink-0">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-ink block">Kavach AA Consent</span>
                    <span className="text-xs text-ink-muted">
                      Inspect & revoke data access with 1 click
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-ink-muted group-hover:text-navy-deep transition-colors" />
              </button>
            </div>
          </div>

          {/* 24x7 Counselor Helpline */}
          <div className="glass-card rounded-3xl p-6 border border-line flex items-center justify-between bg-gradient-to-r from-canvas to-azure-soft/40 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-navy-deep text-white flex items-center justify-center shadow-md">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-ink-muted block uppercase tracking-wider">
                  National Bharat Helpline
                </span>
                <span className="text-lg font-extrabold text-navy-deep">1800-ARTHIX (Toll Free)</span>
              </div>
            </div>
            <span className="text-xs font-extrabold bg-emerald-soft text-emerald px-3 py-1.5 rounded-full border border-emerald/20">
              Live 24x7
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
