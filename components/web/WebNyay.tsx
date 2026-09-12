"use client";

import { useState } from "react";
import {
  Scale,
  ShieldCheck,
  Download,
  Fingerprint,
} from "lucide-react";
import type { Lang } from "@/components/TopBar";

interface WebNyayProps {
  lang: Lang;
}

export function WebNyay({ lang }: WebNyayProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

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
              <span>Nyay Algorithmic Transparency Engine • Fiduciary Audit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Nyay Explainable AI Decision Trail
              <span className="block text-azure text-xl sm:text-2xl font-semibold mt-1">
                न्याय पारदर्शी ऑडिट एवं निर्णय व्याख्या
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-azure-soft text-azure px-4 py-2 rounded-xl border border-azure/20 text-xs font-bold">
            <Fingerprint className="w-4 h-4" />
            <span>Cryptographically Signed Ledger Entry</span>
          </div>
        </div>
      </div>

      {/* Decision Audit Log Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <span className="text-xs uppercase font-extrabold text-ink-muted">
              AUDIT RECORD #BRT-AUD-2026-90412
            </span>
            <h3 className="text-xl font-bold text-ink mt-1">
              Deterministic Decision Log: Direct Equity Authorization
            </h3>
          </div>
          <span className="text-xs bg-emerald-soft text-emerald px-3 py-1 rounded-full font-bold">
            PASSED STATUTORY INTEGRITY CHECK
          </span>
        </div>

        {/* Math Variables Table */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase text-ink-muted tracking-wider">
            Evaluated Mathematical Formulas
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-canvas text-ink-muted uppercase border-b border-line">
                <tr>
                  <th className="p-3">Variable Parameter</th>
                  <th className="p-3">Evaluated Value</th>
                  <th className="p-3">Statutory Guardrail</th>
                  <th className="p-3">Compliance Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <td className="p-3 font-semibold text-ink">Emergency Runway Coverage</td>
                  <td className="p-3 font-tabular font-bold text-azure">3.2 Months (₹85,200)</td>
                  <td className="p-3 text-ink-muted">≥ 3.0 Months essential living</td>
                  <td className="p-3 text-emerald font-bold">PASS (106.6%)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-ink">Total Debt-to-Inflow (DTI)</td>
                  <td className="p-3 font-tabular font-bold text-azure">16.3% (₹8,500 EMI)</td>
                  <td className="p-3 text-ink-muted">&lt; 35% monthly net inflow</td>
                  <td className="p-3 text-emerald font-bold">PASS (Under threshold)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-ink">Intermediary Commission Load</td>
                  <td className="p-3 font-tabular font-bold text-emerald">0.00% (Direct Plan)</td>
                  <td className="p-3 text-ink-muted">0.00% absolute zero kickback</td>
                  <td className="p-3 text-emerald font-bold">PASS (Zero Bias)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-ink">High Interest Revolving Dues</td>
                  <td className="p-3 font-tabular font-bold text-azure">₹0 Active Balance</td>
                  <td className="p-3 text-ink-muted">No &gt;24% APR loans present</td>
                  <td className="p-3 text-emerald font-bold">PASS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Guarantee */}
        <div className="p-4 rounded-xl bg-canvas border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-ink-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald shrink-0" />
            <span>
              This decision contains zero proprietary neural network heuristics. Any banking ombudsman
              can independently reproduce this audit.
            </span>
          </div>
          <button
            onClick={handleDownload}
            disabled={downloading || downloaded}
            className={`px-4 py-2 rounded-xl border text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all ${
              downloaded
                ? "bg-emerald text-white border-emerald"
                : "bg-white hover:bg-slate-100 border-line text-ink"
            }`}
          >
            <Download className={`w-3.5 h-3.5 ${downloaded ? "text-white" : "text-azure"} ${downloading ? "animate-bounce" : ""}`} />
            <span>{downloaded ? "✓ Downloaded" : downloading ? "Generating..." : "Download Signed Audit (.pdf)"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
