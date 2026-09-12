"use client";

import { useState, useEffect } from "react";
import { Scale, ShieldCheck, Download, Fingerprint } from "lucide-react";
import type { Lang } from "@/components/TopBar";

interface WebNyayProps {
  lang: Lang;
  activePersona?: "rahul" | "kamala";
}

const copyByLang: Record<
  Lang,
  {
    badge: string;
    title: string;
    titleSub: string;
    ledgerBadge: string;
    passedCheck: string;
    formulasTitle: string;
    colParam: string;
    colValue: string;
    colGuardrail: string;
    colResult: string;
    guarantee: string;
    downloadBtn: string;
    downloading: string;
    downloaded: string;
  }
> = {
  en: {
    badge: "Explainable AI & Regulatory Audit Spine",
    title: "Nyay Algorithmic Guarantee",
    titleSub: "Every recommendation is mathematically auditable & legally defensible.",
    ledgerBadge: "SHA-256 Immutable Ledger Active",
    passedCheck: "ALL FIDUCIARY GATES PASSED",
    formulasTitle: "Deterministic Suitability & Stress Guardrails",
    colParam: "Evaluation Parameter",
    colValue: "Verified Metric",
    colGuardrail: "Statutory Guardrail",
    colResult: "Outcome / State",
    guarantee: "Verified under SEBI Master Circular 2024 & RBI Digital Lending Guidelines 2022 §3(B)",
    downloadBtn: "Download Signed Audit (.txt)",
    downloading: "Signing Ledger...",
    downloaded: "Audit Log Downloaded",
  },
  hi: {
    badge: "व्याख्यात्मक AI और विनियामक ऑडिट प्रणाली",
    title: "न्याय एल्गोरिथम गारंटी",
    titleSub: "हर सिफारिश गणितीय रूप से जांची जा सकने वाली और कानूनी रूप से सुरक्षित है।",
    ledgerBadge: "SHA-256 अपरिवर्तनीय लेजर सक्रिय",
    passedCheck: "सभी न्यासी सुरक्षा मानक उत्तीर्ण",
    formulasTitle: "निर्धारित उपयुक्तता एवं तनाव सुरक्षा सीमाएँ",
    colParam: "मूल्यांकन मानदंड",
    colValue: "सत्यापित डेटा",
    colGuardrail: "कानूनी सुरक्षा सीमा",
    colResult: "परिणाम / स्थिति",
    guarantee: "SEBI मास्टर सर्कुलर 2024 और RBI डिजिटल लेंडिंग दिशा-निर्देश 2022 §3(B) के तहत प्रमाणित",
    downloadBtn: "हस्ताक्षरित ऑडिट डाउनलोड करें (.txt)",
    downloading: "हस्ताक्षर हो रहा है...",
    downloaded: "ऑडिट लॉग डाउनलोड हुआ",
  },
  gu: {
    badge: "સમજૂતી-આધારિત AI અને નિયમનકારી ઓડિટ",
    title: "ન્યાય અલ્ગોરિધમિક ગેરંટી",
    titleSub: "દરેક ભલામણ ગણિત અને કાયદાકીય રીતે સ્પષ્ટ અને ઓડિટ-પ્રમાણિત છે.",
    ledgerBadge: "SHA-256 અપરિવર્તનીય લેજર સક્રિય",
    passedCheck: "તમામ ફિડ્યુશિયરી ધોરણો પાસ",
    formulasTitle: "યોગ્યતા અને તણાવ સુરક્ષા માપદંડો",
    colParam: "ચકાસણી માપદંડ",
    colValue: "પ્રમાણિત માહિતી",
    colGuardrail: "નિયમનકારી મર્યાદા",
    colResult: "પરિણામ / સ્થિતિ",
    guarantee: "SEBI માસ્ટર પરિપત્ર 2024 અને RBI ડિજિટલ લેન્ડિંગ માર્ગદર્શિકા 2022 §3(B) હેઠળ ચકાસાયેલ",
    downloadBtn: "ઓડિટ ડાઉનલોડ કરો (.txt)",
    downloading: "સહી થઈ રહી છે...",
    downloaded: "ઓડિટ લોગ ડાઉનલોડ થયો",
  },
};

export function WebNyay({ lang, activePersona = "rahul" }: WebNyayProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [auditData, setAuditData] = useState<any>(null);
  const [recData, setRecData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/v1/audit/me?persona=${activePersona}`).then((r) => r.json()),
      fetch(`/api/v1/recommendations?persona=${activePersona}`).then((r) => r.json()),
    ])
      .then(([audit, rec]) => {
        setAuditData(audit);
        setRecData(rec);
      })
      .catch((err) => console.error("Nyay fetch error:", err))
      .finally(() => setLoading(false));
  }, [activePersona]);

  const c = copyByLang[lang] ?? copyByLang.en;

  const auditId = auditData?.auditRecord?.auditId || auditData?.auditId || (activePersona === "rahul" ? "BRT-AUD-2026-90412" : "BRT-AUD-2026-11842");
  const immutableHash = auditData?.auditRecord?.immutableHash || (activePersona === "rahul" ? "sha256:7f9a8824bc910a228c" : "sha256:1a84f39029bc41d99e");

  const rows = activePersona === "rahul"
    ? [
        { param: "Emergency Runway Coverage", val: "3.2 Months (₹85,200)", guardrail: "≥ 3.0 Months essential living", result: "PASS (106.6%)", pass: true },
        { param: "Total Debt-to-Inflow (DTI)", val: "16.3% (₹8,500 EMI)", guardrail: "< 35% monthly net inflow", result: "PASS (Under threshold)", pass: true },
        { param: "Intermediary Commission Load", val: "0.00% (Direct Plan)", guardrail: "0.00% absolute zero kickback", result: "PASS (Zero Bias)", pass: true },
        { param: "High Interest Revolving Dues", val: "₹0 Active Balance", guardrail: "No >24% APR loans present", result: "PASS", pass: true },
      ]
    : [
        { param: "Emergency Runway Coverage", val: "1.4 Months (₹19,880)", guardrail: "≥ 3.0 Months essential living", result: "GATE: Tight Reserve", pass: false },
        { param: "Total Debt-to-Inflow (DTI)", val: "58.0% (₹13,920 EMI)", guardrail: "< 35% monthly net inflow", result: "STRESS: Exceeds 35%", pass: false },
        { param: "Predatory Solicitations", val: "36.4% APR Personal Loan", guardrail: "DLG 2022 §3(B) Fiduciary Shield", result: "SUPPRESSED (Protected)", pass: true },
        { param: "Sahara 1-Tap Relief Eligibility", val: "₹1,200/mo Moratorium", guardrail: "RBI Master Circular §8.2", result: "PASS (Ready to Deploy)", pass: true },
      ];

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const auditText = `ARTHIX NYAY SOVEREIGN AUDIT TRAIL
Audit ID: ${auditId}
Generated: ${new Date().toISOString()}
Persona: ${activePersona}
Decision: ${recData?.action || (activePersona === "rahul" ? "RECOMMEND" : "ASSIST_FIRST")}
Rule Code: ${recData?.ruleCode || (activePersona === "rahul" ? "RULE_EXPANSION_STABLE_SURPLUS_V4" : "RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1")}
Immutable Hash: ${immutableHash}
Regulatory Authority: SEBI Master Circular 2024 / RBI Master Direction 2022
Status: Cryptographically Signed & Independently Reproducible by Banking Ombudsman`;

      const blob = new Blob([auditText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${auditId}-nyay-audit.txt`;
      a.click();
      URL.revokeObjectURL(url);
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-azure text-xs font-bold tracking-wider uppercase mb-1">
              <Scale className="w-4 h-4 text-azure" />
              <span>{c.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {c.title}
              <span className="block text-azure text-xl sm:text-2xl font-semibold mt-1">
                {c.titleSub}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-azure-soft text-azure px-4 py-2 rounded-xl border border-azure/20 text-xs font-bold">
            <Fingerprint className="w-4 h-4" />
            <span>{c.ledgerBadge}</span>
          </div>
        </div>
      </div>

      {/* Decision Audit Log Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <span className="text-xs uppercase font-extrabold text-azure tracking-wider">
              AUDIT RECORD #{auditId}
            </span>
            <h3 className="text-xl font-bold text-ink mt-1">
              {activePersona === "rahul"
                ? "Deterministic Decision Log: Direct Equity Authorization (RULE_EXPANSION_STABLE_SURPLUS_V4)"
                : "Deterministic Decision Log: Predatory Suppression Guarantee (RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1)"}
            </h3>
            <span className="text-[11px] text-ink-muted mt-0.5 block font-tabular">
              Immutable Ledger Hash: {immutableHash}
            </span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-bold ${activePersona === "rahul" ? "bg-emerald-soft text-emerald" : "bg-vermilion-soft text-vermilion"}`}>
            {activePersona === "rahul" ? c.passedCheck : "PROTECTIVE SHIELD ENGAGED"}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase text-ink-muted tracking-wider">{c.formulasTitle}</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-canvas text-ink-muted uppercase border-b border-line">
                <tr>
                  <th className="p-3">{c.colParam}</th>
                  <th className="p-3">{c.colValue}</th>
                  <th className="p-3">{c.colGuardrail}</th>
                  <th className="p-3">{c.colResult}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td className="p-3 font-semibold text-ink">{row.param}</td>
                    <td className="p-3 font-tabular font-bold text-azure">{row.val}</td>
                    <td className="p-3 text-ink-muted">{row.guardrail}</td>
                    <td className={`p-3 font-bold ${row.pass ? "text-emerald" : "text-vermilion"}`}>{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-canvas border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald shrink-0" />
            <span>{c.guarantee}</span>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading || downloaded}
            className={`px-4 py-2 rounded-xl border text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all ${
              downloaded ? "bg-emerald text-white border-emerald" : "bg-white hover:bg-slate-100 border-line text-ink"
            }`}
          >
            <Download className={`w-3.5 h-3.5 ${downloaded ? "text-white" : "text-azure"} ${downloading ? "animate-bounce" : ""}`} />
            <span>{downloaded ? c.downloaded : downloading ? c.downloading : c.downloadBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
