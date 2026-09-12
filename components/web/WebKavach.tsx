"use client";

import { useState, useEffect } from "react";
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
    {
      id: "c-1",
      institution: "State Bank of India",
      purpose: "Cashflow & Runway Analysis",
      type: "Bank Statement Read",
      frequency: "Periodic / Daily Sync",
      expires: "12 Dec 2026",
      active: true,
    },
    {
      id: "c-2",
      institution: "DigiLocker / UIDAI",
      purpose: "Aadhaar Identity Verification (KYC)",
      type: "One-Time Document Pull",
      frequency: "One-Time Verified",
      expires: "Permanent Verified",
      active: true,
    },
    {
      id: "c-4",
      institution: "TReDS Handloom Clearing",
      purpose: "Trade Invoice Settlement Tracking",
      type: "Invoice State Read",
      frequency: "Monthly Sync",
      expires: "15 Oct 2026",
      active: true,
    },
  ]);

  useEffect(() => {
    fetch("/api/v1/consent?persona=rahul")
      .then((res) => res.json())
      .then((data) => {
        if (data.consents && data.consents.length > 0) {
          setConsents(data.consents);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleConsent = (id: string) => {
    const target = consents.find((c) => c.id === id);
    const newStatus = target && target.active ? "REVOKED" : "AUTHORIZED";

    setConsents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );

    fetch("/api/v1/consent", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ persona: "rahul", consentId: id, status: newStatus }),
    }).catch((err) => console.error(err));
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
              <span>Sovereign Consent & Data Sovereignty Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Kavach RBI Account Aggregator Manager
              <span className="block text-azure text-xl sm:text-2xl font-semibold mt-1">
                कवच डेटा सहमति एवं गोपनीयता प्रबंधक
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-emerald-soft px-4 py-2 rounded-xl border border-emerald/20 text-xs font-bold text-emerald">
            <Lock className="w-4 h-4 text-emerald" />
            <span>Digital Personal Data Protection Act 2023 Compliant</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-canvas rounded-xl border border-line text-xs">
          <span className="text-ink-muted">
            Active Consented Streams: <strong className="text-ink font-tabular">{activeCount} of 3 active</strong>
          </span>
          <span className="text-emerald font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% Granularly Revocable Anytime
          </span>
        </div>
      </div>

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Active Consents (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h3 className="text-base font-bold text-ink">Active Financial Data Authorizations</h3>
            <span className="text-xs text-ink-muted">Account Aggregator Protocol §4</span>
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
                      {item.active ? "AUTHORIZED" : "REVOKED"}
                    </span>
                  </div>
                  <span className="text-xs text-ink-muted">Purpose: {item.purpose}</span>
                  <div className="flex items-center gap-3 text-[11px] text-ink-faint">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>Expires: {item.expires}</span>
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
                  {item.active ? "Revoke Access" : "Re-authorize"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Institutional Guarantees (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-base font-bold text-ink pb-2 border-b border-line">
              ARTHIX Absolute "Never-Do" Commitments
            </h3>

            <div className="flex flex-col gap-3 text-xs text-ink">
              <div className="flex items-start gap-2.5">
                <EyeOff className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                <span>
                  <strong>Never Scrapes Contacts or Gallery:</strong> ARTHIX uses zero device permissions. Only authenticated RBI AA streams.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <EyeOff className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                <span>
                  <strong>Never Shares with Recovery Agents:</strong> Fiduciary firewall forbids disclosing customer numbers to third-party collection agencies.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <EyeOff className="w-4 h-4 text-vermilion shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Advertising Monetization:</strong> Your financial data is strictly used for your protection and growth. Never sold to brokers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
