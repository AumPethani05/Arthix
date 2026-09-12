"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  History,
  Key,
  Shield,
  Gavel,
  RefreshCw,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

interface WebKavachProps {
  lang: Lang;
}

export function WebKavach({ lang }: WebKavachProps) {
  const [consents, setConsents] = useState([
    { id: "sbi-tx", institution: "State Bank of India", purpose: "Cashflow & Runway Analysis", type: "Bank Statement Read", frequency: "Periodic / Daily Sync", expires: "12 Dec 2026", active: true },
    { id: "digilocker", institution: "DigiLocker / UIDAI", purpose: "Aadhaar Identity Verification (KYC)", type: "One-Time Document Pull", frequency: "One-Time Verified", expires: "Permanent Verified", active: true },
    { id: "treds", institution: "TReDS Handloom Clearing", purpose: "Trade Invoice Settlement Tracking", type: "Invoice State Read", frequency: "Monthly Sync", expires: "15 Oct 2026", active: true },
  ]);
  const [revokeAllDone, setRevokeAllDone] = useState(false);

  const kv = {
    en: {
      badge: "Sovereign Consent & Data Sovereignty Architecture",
      title: "Kavach RBI Account Aggregator Manager",
      titleSub: "कवच डेटा सहमति एवं गोपनीयता प्रबंधक",
      dpdp: "Digital Personal Data Protection Act 2023 Compliant",
      streamsLabel: "Active Consented Streams:",
      streamsOf: "of 3 active",
      revocable: "100% Granularly Revocable Anytime",
      authsTitle: "Active Financial Data Authorizations",
      aaProtocol: "AA Protocol §4",
      revokeAll: "Revoke All",
      allRevoked: "✓ All Revoked",
      authorized: "AUTHORIZED",
      revoked: "REVOKED",
      purposeLabel: "Purpose:",
      expiresLabel: "Expires:",
      revokeAccess: "Revoke Access",
      reauthorize: "Re-authorize",
      neverTitle: 'ARTHIX Absolute "Never-Do" Commitments',
      never1: "Never Scrapes Contacts or Gallery: ARTHIX uses zero device permissions. Only authenticated RBI AA streams.",
      never2: "Never Shares with Recovery Agents: Fiduciary firewall forbids disclosing customer numbers to third-party collection agencies.",
      never3: "Zero Advertising Monetization: Your financial data is strictly used for your protection and growth. Never sold to brokers.",
      activityLog: "Consent Activity Log",
    },
    hi: {
      badge: "संप्रभु सहमति और डेटा संप्रभुता वास्तुकला",
      title: "कवच आरबीआई अकाउंट एग्रीगेटर प्रबंधक",
      titleSub: "कवच डेटा सहमति एवं गोपनीयता प्रबंधक",
      dpdp: "डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 अनुपालक",
      streamsLabel: "सक्रिय सहमति स्ट्रीम:",
      streamsOf: "में से 3 सक्रिय",
      revocable: "100% किसी भी समय रद्द करने योग्य",
      authsTitle: "सक्रिय वित्तीय डेटा प्राधिकरण",
      aaProtocol: "एए प्रोटोकॉल §4",
      revokeAll: "सभी रद्द करें",
      allRevoked: "✓ सभी रद्द",
      authorized: "अधिकृत",
      revoked: "रद्द",
      purposeLabel: "उद्देश्य:",
      expiresLabel: "समाप्ति:",
      revokeAccess: "पहुंच रद्द करें",
      reauthorize: "पुनः अधिकृत करें",
      neverTitle: 'आर्थिक्स पूर्ण "कभी नहीं" प्रतिबद्धताएं',
      never1: "संपर्क या गैलरी कभी नहीं देखता: आर्थिक्स शून्य डिवाइस अनुमति उपयोग करता है।",
      never2: "वसूली एजेंट से कभी नहीं शेयर: फिड्युशियरी फ़ायरवॉल तीसरे पक्ष को नंबर देने से मना करता है।",
      never3: "शून्य विज्ञापन मुद्रीकरण: आपका वित्तीय डेटा केवल आपकी सुरक्षा के लिए।",
      activityLog: "सहमति गतिविधि लॉग",
    },
    gu: {
      badge: "સંપ્રભુ સંમતિ અને ડેટા સુરક્ષા વ્યવસ્થા",
      title: "કવચ આરબીઆઈ એકાઉન્ટ એગ્રીગેટર મેનેજર",
      titleSub: "કવચ ડેટા સંમતિ અને ગોપનીયતા વ્યવસ્થાપક",
      dpdp: "ડિજિટલ પર્સનલ ડેટા પ્રોટેક્શન એક્ટ ૨૦૨૩ સુસંગત",
      streamsLabel: "સક્રિય સંમત સ્ટ્રીમ્સ:",
      streamsOf: "માંથી ૩ સક્રિય",
      revocable: "૧૦૦% ગમે ત્યારે રદ કરી શકાય",
      authsTitle: "સક્રિય નાણાકીય ડેટા પ્રમાણીકરણ",
      aaProtocol: "એએ પ્રોટોકોલ કલમ ૪",
      revokeAll: "બધા રદ કરો",
      allRevoked: "✓ બધા રદ થયા",
      authorized: "અધિકૃત",
      revoked: "રદ કરેલ",
      purposeLabel: "હેતુ:",
      expiresLabel: "સમાપ્તિ:",
      revokeAccess: "એક્સેસ રદ કરો",
      reauthorize: "ફરી અધિકૃત કરો",
      neverTitle: 'આર્થિક્સ સંપૂર્ણ "ક્યારેય નહીં" વચનો',
      never1: "સંપર્ક કે ગેલેરી ક્યારેય તપાસતું નથી: આર્થિક્સ શૂન્ય ડિવાઇસ પરવાનગીઓ વાપરે છે.",
      never2: "રિકવરી એજન્ટો સાથે ક્યારેય શેર થતું નથી: ફિડ્યુશિયરી ફાયરવોલ વસૂલાત એજન્સીઓથી રક્ષણ આપે છે.",
      never3: "શૂન્ય જાહેરાત મુદ્રીકરણ: તમારો નાણાકીય ડેટા માત્ર તમારી સુરક્ષા માટે છે, ક્યારેય વેચવામાં આવતો નથી.",
      activityLog: "સંમતિ પ્રવૃત્તિ લૉગ",
    },
  }[lang] ?? {
    badge: "Sovereign Consent & Data Sovereignty Architecture",
    title: "Kavach RBI Account Aggregator Manager",
    titleSub: "कवच डेटा सहमति एवं गोपनीयता प्रबंधक",
    dpdp: "Digital Personal Data Protection Act 2023 Compliant",
    streamsLabel: "Active Consented Streams:",
    streamsOf: "of 3 active",
    revocable: "100% Granularly Revocable Anytime",
    authsTitle: "Active Financial Data Authorizations",
    aaProtocol: "AA Protocol §4",
    revokeAll: "Revoke All",
    allRevoked: "✓ All Revoked",
    authorized: "AUTHORIZED",
    revoked: "REVOKED",
    purposeLabel: "Purpose:",
    expiresLabel: "Expires:",
    revokeAccess: "Revoke Access",
    reauthorize: "Re-authorize",
    neverTitle: 'ARTHIX Absolute "Never-Do" Commitments',
    never1: "Never Scrapes Contacts or Gallery: ARTHIX uses zero device permissions.",
    never2: "Never Shares with Recovery Agents: Fiduciary firewall protects your data.",
    never3: "Zero Advertising Monetization: Your data is never sold to brokers.",
    activityLog: "Consent Activity Log",
  };

  const toggleConsent = (id: string) => {
    setConsents((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  const handleRevokeAll = () => {
    setConsents((prev) => prev.map((c) => ({ ...c, active: false })));
    setRevokeAllDone(true);
    setTimeout(() => setRevokeAllDone(false), 3000);
  };

  const activeCount = consents.filter((c) => c.active).length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-azure text-xs font-bold tracking-wider uppercase mb-1">
              <ShieldCheck className="w-4 h-4 text-azure" />
              <span>{kv.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {kv.title}
              <span className="block text-azure text-xl sm:text-2xl font-semibold mt-1">
                {kv.titleSub}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-emerald-soft px-4 py-2 rounded-xl border border-emerald/20 text-xs font-bold text-emerald">
            <Lock className="w-4 h-4 text-emerald" />
            <span>{kv.dpdp}</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-canvas rounded-xl border border-line text-xs">
          <span className="text-ink-muted">
            {kv.streamsLabel} <strong className="text-ink font-tabular">{activeCount} {kv.streamsOf}</strong>
          </span>
          <span className="text-emerald font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {kv.revocable}
          </span>
        </div>
      </div>

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Consents (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h3 className="text-base font-bold text-ink">{kv.authsTitle}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-muted">{kv.aaProtocol}</span>
              <button
                onClick={handleRevokeAll}
                disabled={activeCount === 0}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                  revokeAllDone
                    ? "bg-emerald-soft text-emerald"
                    : activeCount === 0
                    ? "text-ink-faint bg-canvas border border-line cursor-not-allowed"
                    : "bg-vermilion-soft text-vermilion hover:bg-vermilion hover:text-white border border-vermilion/20"
                }`}
              >
                {revokeAllDone ? kv.allRevoked : kv.revokeAll}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {consents.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-canvas border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-ink">{item.institution}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.active
                          ? "bg-emerald-soft text-emerald"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {item.active ? kv.authorized : kv.revoked}
                    </span>
                  </div>
                  <span className="text-xs text-ink-muted">{kv.purposeLabel} {item.purpose}</span>
                  <div className="flex items-center gap-3 text-[11px] text-ink-faint">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{kv.expiresLabel} {item.expires}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleConsent(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    item.active
                      ? "bg-white hover:bg-vermilion-soft text-vermilion border border-line"
                      : "bg-navy-deep text-white hover:bg-navy-rich"
                  }`}
                >
                  {item.active ? kv.revokeAccess : kv.reauthorize}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Institutional Guarantees (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-base font-bold text-ink pb-2 border-b border-line">
              {kv.neverTitle}
            </h3>
            <div className="flex flex-col gap-3 text-xs text-ink">
              <div className="flex items-start gap-2.5">
                <EyeOff className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                <span>{kv.never1}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <EyeOff className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                <span>{kv.never2}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <EyeOff className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                <span>{kv.never3}</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-base font-bold text-ink pb-2 border-b border-line flex items-center gap-2">
              <History className="w-4 h-4 text-azure" />
              {kv.activityLog}
            </h3>
            <div className="flex flex-col gap-2.5 text-xs">
              {[
                { action: "SBI bank statement sync", status: "Authorized", time: "Today 09:41 AM", color: "text-emerald" },
                { action: "Vivek guard blocked predatory loan offer", status: "Blocked", time: "Today 08:12 AM", color: "text-vermilion" },
                { action: "DigiLocker KYC verified", status: "Verified", time: "3 days ago", color: "text-azure" },
                { action: "TReDS invoice data pull", status: "Authorized", time: "5 days ago", color: "text-emerald" },
              ].map((entry, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                  <div>
                    <p className="font-semibold text-ink">{entry.action}</p>
                    <p className="text-ink-faint mt-0.5">{entry.time}</p>
                  </div>
                  <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] bg-canvas ${entry.color}`}>
                    {entry.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
