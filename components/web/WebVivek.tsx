"use client";

import { useState, useEffect } from "react";
import { Sparkles, ShieldCheck, Info, Check, RefreshCw, AlertCircle, ShieldAlert } from "lucide-react";
import type { Lang } from "@/components/TopBar";

export type DecisionAction = "RECOMMEND" | "ASSIST_FIRST" | "SUPPRESS" | "VERIFY";

interface WebVivekProps {
  lang: Lang;
  activePersona?: "rahul" | "kamala";
}

const canonicalStateData: Record<DecisionAction, {
  tag: string;
  headline: string;
  subline: string;
  confidence: string;
  auditRule: string;
  citation: string;
  badgeClass: string;
  metrics: Array<{ label: string; val: string; ok: boolean }>;
  explanation: Record<Lang, string>;
}> = {
  RECOMMEND: {
    tag: "RECOMMEND: Capital Expansion Approved",
    headline: "Approved: ₹3,000 Nifty 50 Index SIP Allocation",
    subline: "Algorithmic validation passed: 3.2 months liquidity secured; debt ratio < 20%",
    confidence: "98.4% Fiduciary Match",
    auditRule: "RULE_EXPANSION_STABLE_SURPLUS_V4",
    citation: "SEBI Master Circular (Investment Advisers) 2024 §6(A)",
    badgeClass: "bg-emerald-soft text-emerald",
    metrics: [
      { label: "Reserve Coverage", val: "3.2 Months", ok: true },
      { label: "Debt-to-Income", val: "16.3%", ok: true },
      { label: "Surplus Stability", val: "60 Days Continuous", ok: true },
      { label: "Commission Load", val: "0% (Direct Plan Only)", ok: true },
    ],
    explanation: {
      en: "Vivek verified that net disposable surplus expanded by +20% over 2 consecutive monthly payroll cycles. Liquid emergency reserves exceed the statutory 3.0-month threshold. No predatory or revolving high-interest loans are active. Capital deployment into a low-cost, direct index plan is approved.",
      hi: "विवेक ने सत्यापित किया कि शुद्ध अधिशेष में लगातार 2 चक्रों से +20% की वृद्धि है। 3.2 महीने की आपातकालीन नकदी सुरक्षित है। कोई जोखिम भरा ऋण नहीं है। प्रत्यक्ष इंडेक्स निवेश स्वीकृत।",
      gu: "વિવેકે ચકાસ્યું કે માસિક બચતમાં સતત ૨ મહિનાથી ૨૦% વૃદ્ધિ છે. ૩.૨ મહિનાનું ઇમરજન્સી ફંડ સુરક્ષિત છે. ડાયરેક્ટ પ્લાનમાં રોકાણ મંજૂર.",
    },
  },
  ASSIST_FIRST: {
    tag: "ASSIST_FIRST: Financial Relief Priority",
    headline: "Assistance Priority: Sahara Protective Debt Shield",
    subline: "Active EMIs consume 58% of inflow. Unlocking 60-Day Machinery Loan Moratorium.",
    confidence: "96.5% Fiduciary Guard",
    auditRule: "RULE_STRESS_ASSIST_FIRST_V1",
    citation: "RBI Financial Inclusion Fiduciary Standard §12 & Master Circular §8.2",
    badgeClass: "bg-azure-soft text-azure",
    metrics: [
      { label: "Reserve Coverage", val: "1.4 Months (Tight)", ok: false },
      { label: "Debt-to-Income", val: "58.0% Outflow", ok: false },
      { label: "Inflow Velocity", val: "Delayed Seasonal Receivables", ok: false },
      { label: "Protective Action", val: "60-Day EMI Pause Ready", ok: true },
    ],
    explanation: {
      en: "Customer is experiencing seasonal cashflow stress due to delayed handloom payments. Active EMIs consume 58% of monthly income. Vivek engages Sahara wellness assistance first and unlocks 1-tap moratorium relief with zero bureau penalties.",
      hi: "मौसमी भुगतानों में देरी के कारण ग्राहक पर वित्तीय दबाव है। सक्रिय ईएमआई 58% आय ले रही है। विवेक सहारा सुरक्षात्मक राहत प्रदान करता है।",
      gu: "કારીગરી વેચાણ ચુકવણીમાં વિલંબને કારણે ગ્રાહક પર આર્થિક દબાણ છે. વિવેક તાત્કાલિક દેવા રાહત અને મોરેટોરિયમ અનલૉક કરે છે.",
    },
  },
  SUPPRESS: {
    tag: "SUPPRESS: Intentional Debt Trap Shield",
    headline: "Suppressed: Predatory Loan & Credit Solicitations Blocked",
    subline: "Algorithmic shield engaged against high-cost credit solicitation during stress period",
    confidence: "99.9% Protective Interception",
    auditRule: "RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1",
    citation: "RBI Digital Lending Guidelines (DLG) 2022 §3(B)",
    badgeClass: "bg-vermilion-soft text-vermilion",
    metrics: [
      { label: "Commercial Offer", val: "₹50,000 'Instant' Credit", ok: false },
      { label: "Effective APR", val: "36.4% Hidden APR", ok: false },
      { label: "Existing Debt Burden", val: "58% Outflow Ratio", ok: false },
      { label: "Action Taken", val: "Solicitation Suppressed", ok: true },
    ],
    explanation: {
      en: "An external lending aggregator attempted to push an instant personal loan with high effective APR while the customer is under seasonal cashflow stress. Vivek's sovereign guardrail intentionally suppressed the notification. This suppression is a fiduciary protection guarantee, not a system failure.",
      hi: "वित्तीय तनाव के समय बाहरी ऋणदाता ने 36.4% ब्याज वाले लोन की पेशकश की। विवेक के सॉवरेन सुरक्षा घेरे ने इस प्रस्ताव को जानबूझकर दबा दिया। यह कोई त्रुटि नहीं बल्कि आपकी वित्तीय सुरक्षा है।",
      gu: "તણાવ દરમિયાન ઊંચા વ્યાજવાળી લોન પિચ કરવામાં આવી હતી. વિવેકે આ પ્રસ્તાવને જાણી જોઈને અટકાવ્યો છે. આ કોઈ ક્ષતિ નથી પરંતુ ગ્રાહક સુરક્ષા વચન છે.",
    },
  },
  VERIFY: {
    tag: "VERIFY: Customer Confirmation Required",
    headline: "Verify: Unusual Outflow Verification Pending",
    subline: "Deviation from historical pattern detected. Customer confirmation requested before proceeding.",
    confidence: "94.2% Anomaly Flag",
    auditRule: "RULE_ANOMALY_VERIFY_V1",
    citation: "RBI Master Direction on Digital Payment Security Controls §18",
    badgeClass: "bg-amber-soft text-amber",
    metrics: [
      { label: "Transaction Amount", val: "₹18,500 Outflow", ok: false },
      { label: "Payee Pattern", val: "New Unknown VPA", ok: false },
      { label: "Execution Hour", val: "02:14 AM (Unusual)", ok: false },
      { label: "Account Status", val: "Active (Never Auto-Frozen)", ok: true },
    ],
    explanation: {
      en: "Kavach detected an unusual debit transaction of ₹18,500 during early morning hours to a new UPI payee. Under ARTHIX constitutional principles, accounts are never silently frozen automatically; customer verification is requested.",
      hi: "कवच ने सुबह 2:14 बजे ₹18,500 के एक असामान्य यूपीआई लेनदेन का पता लगाया। खाते को स्वतः फ्रीज करने के बजाय ग्राहक सत्यापन का अनुरोध किया गया है।",
      gu: "કવચે વહેલી સવારે ₹૧૮,૫૦૦ ના અસામાન્ય વ્યવહારની નોંધ લીધી છે. ખાતું ફ્રીઝ કર્યા વિના ગ્રાહક ચકાસણીની વિનંતી કરવામાં આવી છે.",
    },
  },
};

const tabs: Array<{ key: DecisionAction; label: string; border: string }> = [
  { key: "RECOMMEND", label: "1. RECOMMEND (स्वीकृत)", border: "border-emerald text-emerald" },
  { key: "ASSIST_FIRST", label: "2. ASSIST_FIRST (राहत)", border: "border-azure text-azure" },
  { key: "SUPPRESS", label: "3. SUPPRESS (रोक)", border: "border-vermilion text-vermilion" },
  { key: "VERIFY", label: "4. VERIFY (सत्यापन)", border: "border-amber text-amber" },
];

export function WebVivek({ lang, activePersona = "rahul" }: WebVivekProps) {
  const [activeState, setActiveState] = useState<DecisionAction>("RECOMMEND");
  const [liveDecision, setLiveDecision] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/v1/recommendations?persona=${activePersona}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load recommendation");
        return res.json();
      })
      .then((data) => {
        setLiveDecision(data);
        const action: DecisionAction = data.action || data.decision || (activePersona === "rahul" ? "RECOMMEND" : "ASSIST_FIRST");
        setActiveState(action);
      })
      .catch((err) => {
        console.error("Vivek error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [activePersona]);

  const ui = {
    en: {
      header: "Vivek Sovereign Algorithmic Intelligence",
      title: "Ethical Financial Decision State Machine",
      titleSub: "विवेक पारदर्शी निर्णय प्रणाली",
      badge: "100% Deterministic • Zero Black-Box ML",
      rationale: "Mathematical Rationale (निर्णय का कारण)",
      regulatory: "Regulatory Authority:",
      immutable: "Immutable Hash:",
      confidence: "Confidence Score",
      pass: "✓ Verified Pass",
      threshold: "⚠ Threshold Gate",
      liveActive: "LIVE ACTIVE DECISION",
    },
    hi: {
      header: "विवेक संप्रभु एल्गोरिदमिक इंटेलिजेंस",
      title: "नैतिक वित्तीय निर्णय स्टेट मशीन",
      titleSub: "विवेक पारदर्शी निर्णय प्रणाली",
      badge: "100% नियतात्मक • शून्य ब्लैक-बॉक्स ML",
      rationale: "गणितीय तर्क (निर्णय का कारण)",
      regulatory: "नियामक प्राधिकरण:",
      immutable: "अपरिवर्तनीय हैश:",
      confidence: "विश्वास स्कोर",
      pass: "✓ सत्यापित पास",
      threshold: "⚠ सीमा गेट",
      liveActive: "सक्रिय वास्तविक निर्णय",
    },
    gu: {
      header: "વિવેક સ્વાયત્ત અલ્ગોરિધમિક ઇન્ટેલિજન્સ",
      title: "નૈતિક નાણાકીય નિર્ણય સ્ટેટ મશીન",
      titleSub: "વિવેક પારદર્શક નિર્ણય પ્રણાલી",
      badge: "૧૦૦% સ્પષ્ટ • શૂન્ય બ્લેક-બોક્સ ML",
      rationale: "ગાણિતિક કારણ (નિર્ણયનો આધાર)",
      regulatory: "નિયમનકારી સત્તા:",
      immutable: "અપરિવર્તનીય હેશ:",
      confidence: "વિશ્વાસ સ્કોર",
      pass: "✓ ચકાસાયેલ પાસ",
      threshold: "⚠ મર્યાદા ગેટ",
      liveActive: "લાઈવ સક્રિય નિર્ણય",
    },
  }[lang] ?? {
    header: "Vivek Sovereign Algorithmic Intelligence",
    title: "Ethical Financial Decision State Machine",
    titleSub: "विवेक पारदर्शी निर्णय प्रणाली",
    badge: "100% Deterministic • Zero Black-Box ML",
    rationale: "Mathematical Rationale (निर्णय का कारण)",
    regulatory: "Regulatory Authority:",
    immutable: "Immutable Hash:",
    confidence: "Confidence Score",
    pass: "✓ Verified Pass",
    threshold: "⚠ Threshold Gate",
    liveActive: "LIVE ACTIVE DECISION",
  };

  const canonical = canonicalStateData[activeState];
  const isViewingLiveState = liveDecision && (liveDecision.action === activeState || liveDecision.decision === activeState);

  // Compute live fields or fallback to canonical
  const displayTag = isViewingLiveState
    ? (liveDecision.action === "SUPPRESS"
        ? "SUPPRESS: Intentional Debt Trap Shield"
        : liveDecision.action === "RECOMMEND"
        ? "RECOMMEND: Capital Expansion Approved"
        : liveDecision.action === "ASSIST_FIRST"
        ? "ASSIST_FIRST: Financial Relief Priority"
        : "VERIFY: Customer Confirmation Required")
    : canonical.tag;

  const displayHeadline = isViewingLiveState && liveDecision.headline ? liveDecision.headline : canonical.headline;
  const displaySubline = isViewingLiveState && liveDecision.subline ? liveDecision.subline : canonical.subline;
  const displayConfidence = isViewingLiveState && liveDecision.confidence
    ? `${(liveDecision.confidence * 100).toFixed(1)}% Fiduciary Match`
    : canonical.confidence;
  const displayRuleCode = isViewingLiveState && liveDecision.ruleCode ? liveDecision.ruleCode : canonical.auditRule;
  const displayCitation = isViewingLiveState && liveDecision.citation ? liveDecision.citation : canonical.citation;

  const displayExplanation = isViewingLiveState
    ? (lang === "hi" && liveDecision.explanationHi
        ? liveDecision.explanationHi
        : lang === "gu" && liveDecision.explanationGu
        ? liveDecision.explanationGu
        : liveDecision.explanationEn || canonical.explanation[lang])
    : canonical.explanation[lang];

  const displayMetrics = isViewingLiveState && liveDecision.metrics && liveDecision.metrics.length > 0
    ? liveDecision.metrics
    : canonical.metrics;

  const displayBadgeClass = canonical.badgeClass;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-azure text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-azure" />
              <span>{ui.header}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {ui.title}
              <span className="block text-azure text-xl sm:text-2xl font-semibold mt-1">
                {ui.titleSub}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-emerald-soft px-4 py-2 rounded-xl border border-emerald/20 text-xs font-bold text-emerald">
            <ShieldCheck className="w-4 h-4 text-emerald" />
            <span>{ui.badge}</span>
          </div>
        </div>

        {/* State Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {tabs.map((item) => {
            const isLive = liveDecision && (liveDecision.action === item.key || liveDecision.decision === item.key);
            return (
              <button
                key={item.key}
                onClick={() => setActiveState(item.key)}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between relative ${
                  activeState === item.key
                    ? `bg-white shadow-md ${item.border} border-2`
                    : "bg-canvas border-line text-ink-muted hover:bg-slate-100"
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span>{item.label}</span>
                  {isLive && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wide text-azure">
                      ● {ui.liveActive}
                    </span>
                  )}
                </div>
                {activeState === item.key && <Check className="w-4 h-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main State Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center z-20">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md border border-line text-xs font-bold text-azure">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Evaluating Vivek decision rules...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-vermilion-soft border border-vermilion/20 flex items-center justify-between text-xs text-vermilion">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Backend connection status: {error}. Using deterministic rule baseline.</span>
            </div>
          </div>
        )}

        {/* Special Banner if state is SUPPRESS */}
        {activeState === "SUPPRESS" && (
          <div className="p-4 rounded-xl bg-amber-soft border border-amber/30 flex items-start gap-3 text-xs text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block">
                Intentional Fiduciary State (Constitutional Policy §4-5)
              </span>
              <p className="mt-0.5 leading-relaxed">
                SUPPRESS is an intentional protective product state, not an error or missed opportunity. Under ARTHIX guidelines, loan recommendations are deliberately withheld to safeguard financially vulnerable households.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full w-fit ${displayBadgeClass}`}>
                {displayTag}
              </span>
              {isViewingLiveState && (
                <span className="text-[11px] font-bold bg-azure-soft text-azure px-2.5 py-0.5 rounded-full">
                  Live Engine Result
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">{displayHeadline}</h2>
            <p className="text-xs sm:text-sm text-ink-muted">{displaySubline}</p>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="text-xs font-semibold text-ink-muted">{ui.confidence}</span>
            <span className="text-lg font-bold text-navy-deep font-tabular">{displayConfidence}</span>
            <span className="text-[11px] font-bold text-azure font-tabular">Code: {displayRuleCode}</span>
          </div>
        </div>

        {/* 4 Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayMetrics.map((m: any, idx: number) => (
            <div key={idx} className="bg-canvas p-4 rounded-xl border border-line">
              <span className="text-xs text-ink-muted block">{m.label}</span>
              <span className="text-base font-bold text-ink font-tabular mt-1 block">{m.val}</span>
              <span className={`text-[11px] font-semibold mt-1 inline-flex items-center gap-1 ${m.ok ? "text-emerald" : "text-amber"}`}>
                {m.ok ? ui.pass : ui.threshold}
              </span>
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="p-5 rounded-xl bg-canvas border border-line flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-ink">
              <Info className="w-4 h-4 text-azure" />
              <span>{ui.rationale}</span>
            </div>
            <span className="text-[11px] font-extrabold text-ink-muted">
              Rule: {displayRuleCode}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">{displayExplanation}</p>
          <div className="pt-2 border-t border-line flex items-center justify-between text-[11px] text-ink-faint flex-wrap gap-2">
            <span>Regulatory: {displayCitation}</span>
            <span>Immutable Hash: {liveDecision?.auditId ? `sha256:${liveDecision.auditId.slice(0, 16)}` : "sha256:7f9a8824bc910a"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
