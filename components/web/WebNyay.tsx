"use client";

import { useState } from "react";
import { Scale, ShieldCheck, Download, Fingerprint } from "lucide-react";
import type { Lang } from "@/components/TopBar";

interface WebNyayProps { lang: Lang; }

const copy = {
  en: {
    badge: "Nyay Algorithmic Transparency Engine • Fiduciary Audit",
    title: "Nyay Explainable AI Decision Trail",
    titleSub: "न्याय पारदर्शी ऑडिट एवं निर्णय व्याख्या",
    ledgerBadge: "Cryptographically Signed Ledger Entry",
    auditRecord: "AUDIT RECORD #BRT-AUD-2026-90412",
    auditTitle: "Deterministic Decision Log: Direct Equity Authorization",
    passedCheck: "PASSED STATUTORY INTEGRITY CHECK",
    formulasTitle: "Evaluated Mathematical Formulas",
    colParam: "Variable Parameter", colValue: "Evaluated Value",
    colGuardrail: "Statutory Guardrail", colResult: "Compliance Result",
    rows: [
      { param: "Emergency Runway Coverage", val: "3.2 Months (₹85,200)", guardrail: "≥ 3.0 Months essential living", result: "PASS (106.6%)", pass: true },
      { param: "Total Debt-to-Inflow (DTI)", val: "16.3% (₹8,500 EMI)", guardrail: "< 35% monthly net inflow", result: "PASS (Under threshold)", pass: true },
      { param: "Intermediary Commission Load", val: "0.00% (Direct Plan)", guardrail: "0.00% absolute zero kickback", result: "PASS (Zero Bias)", pass: true },
      { param: "High Interest Revolving Dues", val: "₹0 Active Balance", guardrail: "No >24% APR loans present", result: "PASS", pass: true },
    ],
    guarantee: "This decision contains zero proprietary neural network heuristics. Any banking ombudsman can independently reproduce this audit.",
    downloadBtn: "Download Signed Audit (.pdf)",
    downloading: "Generating...",
    downloaded: "✓ Downloaded",
  },
  hi: {
    badge: "न्याय एल्गोरिदमिक पारदर्शिता इंजन • फिड्युशियरी ऑडिट",
    title: "न्याय व्याख्यात्मक AI निर्णय ट्रेल",
    titleSub: "न्याय पारदर्शी ऑडिट एवं निर्णय व्याख्या",
    ledgerBadge: "क्रिप्टोग्राफिक रूप से हस्ताक्षरित लेजर",
    auditRecord: "ऑडिट रिकॉर्ड #BRT-AUD-2026-90412",
    auditTitle: "नियतात्मक निर्णय लॉग: प्रत्यक्ष इक्विटी प्राधिकरण",
    passedCheck: "वैधानिक अखंडता जांच उत्तीर्ण",
    formulasTitle: "मूल्यांकित गणितीय सूत्र",
    colParam: "परिवर्तनीय पैरामीटर", colValue: "मूल्यांकित मूल्य",
    colGuardrail: "वैधानिक सुरक्षा", colResult: "अनुपालन परिणाम",
    rows: [
      { param: "आपातकालीन नकदी कवरेज", val: "3.2 माह (₹85,200)", guardrail: "≥ 3.0 माह आवश्यक जीवन-यापन", result: "उत्तीर्ण (106.6%)", pass: true },
      { param: "कुल ऋण-से-आय अनुपात", val: "16.3% (₹8,500 ईएमआई)", guardrail: "< मासिक आय का 35%", result: "उत्तीर्ण (सीमा से कम)", pass: true },
      { param: "बिचौलिया कमीशन भार", val: "0.00% (प्रत्यक्ष योजना)", guardrail: "0.00% शून्य कमीशन", result: "उत्तीर्ण (शून्य पूर्वाग्रह)", pass: true },
      { param: "उच्च ब्याज रिवॉल्विंग बकाया", val: "₹0 सक्रिय शेष", guardrail: "24% APR से अधिक कोई लोन नहीं", result: "उत्तीर्ण", pass: true },
    ],
    guarantee: "इस निर्णय में शून्य मालिकाना न्यूरल नेटवर्क ह्यूरिस्टिक्स हैं। कोई भी बैंकिंग लोकपाल इस ऑडिट को स्वतंत्र रूप से पुनः प्रस्तुत कर सकता है।",
    downloadBtn: "हस्ताक्षरित ऑडिट डाउनलोड करें (.pdf)",
    downloading: "तैयार हो रहा है...",
    downloaded: "✓ डाउनलोड हो गया",
  },
  gu: {
    badge: "ન્યાય અલ્ગોરિધમિક પારદર્શિતા એન્જિન • ફિડ્યુશિયરી ઑડિટ",
    title: "ન્યાય સ્પષ્ટ AI નિર્ણય ટ્રેઇલ",
    titleSub: "ન્યાય ઑડિટ અને નિર્ણય સ્પષ્ટીકરણ",
    ledgerBadge: "ક્રિપ્ટોગ્રાફિકલી હસ્તાક્ષરિત લેજર",
    auditRecord: "ઑડિટ રેકોર્ડ #BRT-AUD-2026-90412",
    auditTitle: "સ્પષ્ટ નિર્ણય લૉગ: ડાયરેક્ટ ઇક્વિટી મંજૂરી",
    passedCheck: "કાયદાકીય અખંડિતતા ચકાસણી સફળ",
    formulasTitle: "મૂલ્યાંકન કરાયેલ ગાણિતિક સૂત્રો",
    colParam: "ચલ પરિમાણ", colValue: "મૂલ્યાંકિત કિંમત",
    colGuardrail: "કાયદાકીય મર્યાદા", colResult: "સુસંગતતા પરિણામ",
    rows: [
      { param: "ઇમરજન્સી રનવે કવરેજ", val: "3.2 મહિના (₹85,200)", guardrail: "≥ 3.0 મહિના ખર્ચ", result: "પાસ (106.6%)", pass: true },
      { param: "કુલ દેવા-આવક ગુણોત્તર", val: "16.3% (₹8,500 ઈએમઆઈ)", guardrail: "< ૩૫% માસિક આવક", result: "પાસ (મર્યાદા નીચે)", pass: true },
      { param: "વચેટિયા કમિશન ભાર", val: "0.00% (ડાયરેક્ટ પ્લાન)", guardrail: "0.00% શૂન્ય કિક-બૅક", result: "પાસ (શૂન્ય પક્ષપાત)", pass: true },
      { param: "ઊંચા વ્યાજના બાકી લેણાં", val: "₹0 સક્રિય બેલેન્સ", guardrail: "૨૪% થી વધુ કોઈ લોન નહીં", result: "પાસ", pass: true },
    ],
    guarantee: "આ નિર્ણયમાં કોઈ ખાનગી ન્યુરલ નેટવર્ક પૂર્વગ્રહ નથી. કોઈપણ બેંકિંગ લોકપાલ આ ઑડિટની સ્વતંત્ર રીતે ચકાસણી કરી શકે છે.",
    downloadBtn: "હસ્તાક્ષરિત ઑડિટ ડાઉનલોડ કરો (.pdf)",
    downloading: "તૈયાર થઈ રહ્યું છે...",
    downloaded: "✓ ડાઉનલોડ પૂર્ણ",
  },
};

export function WebNyay({ lang }: WebNyayProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const c = copy[lang] ?? copy.en;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 1200);
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
            <span className="text-xs uppercase font-extrabold text-ink-muted">{c.auditRecord}</span>
            <h3 className="text-xl font-bold text-ink mt-1">{c.auditTitle}</h3>
          </div>
          <span className="text-xs bg-emerald-soft text-emerald px-3 py-1 rounded-full font-bold">{c.passedCheck}</span>
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
                {c.rows.map((row, i) => (
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
