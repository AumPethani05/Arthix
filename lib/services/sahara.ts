import { db } from "../db";
import { getArthBodhProfile } from "./arthbodh";

export interface SaharaWellnessData {
  userId: string;
  stressScore: number;
  stressBand: "LOW" | "MEDIUM" | "HIGH";
  protectiveHoldActive: boolean;
  cashFlowAudit: {
    monthlyInflow: number;
    essentialSpends: number;
    committedEmis: number;
    netDeficit: number;
  };
  reliefActions: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
    canApply: boolean;
  }>;
}

export function getSaharaWellness(userIdOrPersona: string): SaharaWellnessData {
  const profile = getArthBodhProfile(userIdOrPersona);

  if (!profile) {
    throw new Error("User not found");
  }

  const isStress = profile.stressBand === "HIGH";

  // Check if relief was applied in alerts/audit table
  const reliefRecord = db
    .prepare("SELECT * FROM alerts WHERE user_id = ? AND headline LIKE '%Moratorium%'")
    .get(profile.userId) as any;

  const applied = !!reliefRecord;

  return {
    userId: profile.userId,
    stressScore: profile.stressScore,
    stressBand: profile.stressBand,
    protectiveHoldActive: isStress,
    cashFlowAudit: {
      monthlyInflow: profile.incomeEst,
      essentialSpends: profile.essentialSpends,
      committedEmis: profile.emiLoad,
      netDeficit: profile.surplus < 0 ? Math.abs(profile.surplus) : 0,
    },
    reliefActions: [
      {
        id: "action-moratorium-60d",
        title: "Apply 60-Day EMI Pause on Machinery Loan",
        description: "Temporarily freeze monthly ₹1,200 EMI due on 15th Sept without late fees or negative reporting to credit bureaus.",
        status: applied ? "MORATORIUM_ACTIVE" : "AVAILABLE",
        canApply: isStress && !applied,
      },
      {
        id: "action-shift-due-date",
        title: "Shift Due Date to 28th of Month",
        description: "Align repayment date with delayed Khadi Board trade payment clearance.",
        status: "AVAILABLE",
        canApply: isStress,
      },
      {
        id: "action-counselor-callback",
        title: "Request Dignified Empathetic Counselor Call",
        description: "Connect 1-on-1 with a certified RBI Sahayak financial counselor.",
        status: "AVAILABLE",
        canApply: true,
      },
    ],
  };
}

export function applySaharaRelief(userIdOrPersona: string, actionId: string) {
  const profile = getArthBodhProfile(userIdOrPersona);
  if (!profile) throw new Error("User not found");

  // Log alert and audit record
  const alertId = `alt-moratorium-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  db.prepare(
    "INSERT INTO alerts (id, user_id, kind, severity, headline, detail, status) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).run(
    alertId,
    profile.userId,
    "STRESS",
    "MEDIUM",
    "60-Day EMI Moratorium Active",
    "Machine loan ₹1,200/mo paused for 60 days. Zero late fees, zero CIBIL impact.",
    "RESOLVED"
  );

  db.prepare(
    "INSERT INTO audit_logs (id, user_id, actor, action, rule_id, metadata) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    `aud-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    profile.userId,
    "CUSTOMER_ACTION",
    "APPLIED_1TAP_MORATORIUM_RELIEF",
    "RULE_SAHARA_MORATORIUM_V1",
    JSON.stringify({ actionId, frozenEmiAmount: 1200, freezeDurationDays: 60 })
  );

  return getSaharaWellness(profile.userId);
}
