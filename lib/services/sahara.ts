import { db } from "../db";
import { getArthBodhProfile, ArthBodhProfile, TransactionRecord } from "./arthbodh";

export interface StressFactor {
  factor: "MISSED_EMI" | "EMI_DUE_VS_PAID" | "BOUNCE" | "SURPLUS_TREND" | "ESSENTIAL_SPEND_REDUCTION" | "CASH_OUT_SPIKE";
  name: string;
  score: number;
  maxScore: number;
  evidence: string;
  triggered: boolean;
}

export interface SaharaStressAssessment {
  score: number; // 0 to 100
  band: "LOW" | "MEDIUM" | "HIGH";
  factors: StressFactor[];
  cashFlowAudit: {
    monthlyInflow: number;
    essentialSpends: number;
    committedEmis: number;
    netDeficit: number;
  };
}

export interface SaharaWellnessData {
  userId: string;
  stressScore: number;
  stressBand: "LOW" | "MEDIUM" | "HIGH";
  protectiveHoldActive: boolean;
  factors: StressFactor[];
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

/**
 * Calculates Sahara Stress Score (0 to 100) from 6 deterministic dimensions:
 * 1. missed EMI
 * 2. EMI due vs paid
 * 3. bounce
 * 4. surplus trend
 * 5. essential spending reduction
 * 6. cash-out spike
 * 
 * Bands:
 * LOW: 0 - 35
 * MEDIUM: 36 - 65
 * HIGH: 66 - 100
 */
export function calculateSaharaStress(
  txs: TransactionRecord[],
  profileContext: {
    incomeEst: number;
    essentialSpends: number;
    emiLoad: number;
    surplus: number;
    surplusTrend?: string;
    signals?: Array<{ signalType: string; evidence?: string }>;
  },
  totalBalance = 0
): SaharaStressAssessment {
  const debits = txs.filter((t) => t.type === "DEBIT");
  const dti = profileContext.incomeEst > 0 ? profileContext.emiLoad / profileContext.incomeEst : 0;
  const signals = profileContext.signals || [];

  const factors: StressFactor[] = [];

  // 1. Missed EMI (Max 25 pts)
  const hasMissedSignal = signals.some((s) => s.signalType === "MISSED_EMI");
  const hasUnservicedDebt = profileContext.emiLoad > 0 && profileContext.surplus < -2000;
  let missedEmiScore = 0;
  let missedEmiEvidence = "No missed EMI payments or mandate execution failures detected.";

  if (hasMissedSignal) {
    missedEmiScore = 25;
    missedEmiEvidence = "Signal indicates loan installment missed or mandate returned unpaid.";
  } else if (hasUnservicedDebt) {
    missedEmiScore = 25;
    missedEmiEvidence = "Severe cashflow deficit creates imminent default or delayed repayment risk on active EMIs.";
  } else if (profileContext.emiLoad > 0 && profileContext.surplus < 0) {
    missedEmiScore = 15;
    missedEmiEvidence = "Negative net surplus poses repayment delay risk on committed EMIs.";
  }

  factors.push({
    factor: "MISSED_EMI",
    name: "Missed EMI / Repayment Default Risk",
    score: missedEmiScore,
    maxScore: 25,
    evidence: missedEmiEvidence,
    triggered: missedEmiScore > 0,
  });

  // 2. EMI Due vs Paid (Max 25 pts)
  let emiRatioScore = 0;
  let emiRatioEvidence = `Healthy Debt-to-Inflow ratio of ${(dti * 100).toFixed(1)}% (Threshold: < 35%).`;

  if (dti >= 0.50) {
    emiRatioScore = 25;
    emiRatioEvidence = `Critical debt overhang: Active EMIs consume ${(dti * 100).toFixed(1)}% of monthly inflow (₹${profileContext.emiLoad.toLocaleString("en-IN")}).`;
  } else if (dti >= 0.40) {
    emiRatioScore = 20;
    emiRatioEvidence = `Elevated debt burden: EMIs consume ${(dti * 100).toFixed(1)}% of inflow.`;
  } else if (dti >= 0.35) {
    emiRatioScore = 16;
    emiRatioEvidence = `Above-threshold debt burden: EMIs consume ${(dti * 100).toFixed(1)}% of inflow.`;
  } else if (dti >= 0.25) {
    emiRatioScore = 8;
    emiRatioEvidence = `Moderate debt burden: EMIs consume ${(dti * 100).toFixed(1)}% of inflow.`;
  }

  factors.push({
    factor: "EMI_DUE_VS_PAID",
    name: "EMI Due vs Monthly Inflow Burden",
    score: emiRatioScore,
    maxScore: 25,
    evidence: emiRatioEvidence,
    triggered: emiRatioScore > 0,
  });

  // 3. Bounce (Max 20 pts)
  const bounceTx = debits.find(
    (t) =>
      t.category === "EMI_BOUNCE" ||
      (t.category === "CHARGES" && t.payee?.toLowerCase().includes("bounce")) ||
      t.payee?.toLowerCase().includes("ecs return") ||
      t.payee?.toLowerCase().includes("mandate return")
  );

  let bounceScore = 0;
  let bounceEvidence = "Zero auto-debit bounces or mandate return charges in transaction history.";

  if (bounceTx) {
    bounceScore = 20;
    bounceEvidence = `Mandate return charge detected: ₹${bounceTx.amount} on ${bounceTx.timestamp} (${bounceTx.payee}).`;
  }

  factors.push({
    factor: "BOUNCE",
    name: "ECS/NACH Mandate Bounces",
    score: bounceScore,
    maxScore: 20,
    evidence: bounceEvidence,
    triggered: bounceScore > 0,
  });

  // 4. Surplus Trend (Max 20 pts)
  let surplusScore = 0;
  let surplusEvidence = `Positive surplus of ₹${profileContext.surplus.toLocaleString("en-IN")}/mo with stable/expanding trajectory.`;

  if (profileContext.surplus < -2000) {
    surplusScore = 20;
    surplusEvidence = `Acute cashflow deficit: Monthly net shortfall of -₹${Math.abs(profileContext.surplus).toLocaleString("en-IN")}.`;
  } else if (profileContext.surplus < 0) {
    surplusScore = 15;
    surplusEvidence = `Cashflow deficit: Monthly net shortfall of -₹${Math.abs(profileContext.surplus).toLocaleString("en-IN")}.`;
  } else if (profileContext.surplusTrend === "CONTRACTING" || signals.some((s) => s.signalType === "SURPLUS_DECLINE")) {
    surplusScore = 12;
    surplusEvidence = "Surplus trend is contracting sharply (>20% drop compared to previous accounting cycles).";
  } else if (profileContext.surplusTrend === "VOLATILE" || profileContext.surplus < 2500) {
    surplusScore = 10;
    surplusEvidence = "Thin free float with high cycle-to-cycle cashflow volatility.";
  }

  factors.push({
    factor: "SURPLUS_TREND",
    name: "Surplus Trend & Deficit Trajectory",
    score: surplusScore,
    maxScore: 20,
    evidence: surplusEvidence,
    triggered: surplusScore > 0,
  });

  // 5. Essential Spending Reduction (Max 15 pts)
  let essentialScore = 0;
  let essentialEvidence = `Essential spending intact at ₹${profileContext.essentialSpends.toLocaleString("en-IN")}.`;

  const essentialRatio = profileContext.incomeEst > 0 ? profileContext.essentialSpends / profileContext.incomeEst : 0;
  if (profileContext.surplus < 0 && dti > 0.35) {
    essentialScore = 15;
    essentialEvidence = `Essential cashflow squeeze: Inflow is insufficient to cover essentials and debt obligations (Shortfall: -₹${Math.abs(profileContext.surplus).toLocaleString("en-IN")}).`;
  } else if (profileContext.emiLoad > profileContext.essentialSpends && profileContext.essentialSpends < 15000 && dti > 0.45) {
    essentialScore = 10;
    essentialEvidence = "Essential living expenditures compressed to service outsized debt obligations.";
  } else if (essentialRatio < 0.25 && dti > 0.35) {
    essentialScore = 7;
    essentialEvidence = "Disproportionate reduction in living expenditures relative to debt load.";
  } else if (dti > 0.35 && profileContext.surplus < 2500) {
    essentialScore = 10;
    essentialEvidence = "Debt obligation severely constrains disposable cushion for essentials.";
  }

  factors.push({
    factor: "ESSENTIAL_SPEND_REDUCTION",
    name: "Essential Spend Compression",
    score: essentialScore,
    maxScore: 15,
    evidence: essentialEvidence,
    triggered: essentialScore > 0,
  });

  // 6. Cash-Out Spike (Max 15 pts)
  const unusualTx = debits.find((t) => t.is_unusual === 1);
  const largeDebit = debits.find((t) => profileContext.incomeEst > 0 && t.amount > profileContext.incomeEst * 0.6 && t.category !== "EMI");

  let cashOutScore = 0;
  let cashOutEvidence = "No abnormal cash-out spikes or unusual debit volumes detected.";

  if (unusualTx) {
    cashOutScore = 15;
    cashOutEvidence = `Unusual high-value debit flagged by Kavach: ₹${unusualTx.amount.toLocaleString("en-IN")} (${unusualTx.payee}).`;
  } else if (largeDebit) {
    cashOutScore = 10;
    cashOutEvidence = `Significant cash-out spike: Single debit of ₹${largeDebit.amount.toLocaleString("en-IN")} represents >60% of monthly income.`;
  }

  factors.push({
    factor: "CASH_OUT_SPIKE",
    name: "Abnormal Cash-Out Spike",
    score: cashOutScore,
    maxScore: 15,
    evidence: cashOutEvidence,
    triggered: cashOutScore > 0,
  });

  // Sum scores, clamp 0-100
  const rawScore = factors.reduce((sum, f) => sum + f.score, 0);
  const score = Math.min(100, Math.max(0, rawScore));

  // Determine stress band
  let band: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  if (score >= 66) {
    band = "HIGH";
  } else if (score >= 36) {
    band = "MEDIUM";
  } else {
    band = "LOW";
  }

  return {
    score,
    band,
    factors,
    cashFlowAudit: {
      monthlyInflow: profileContext.incomeEst,
      essentialSpends: profileContext.essentialSpends,
      committedEmis: profileContext.emiLoad,
      netDeficit: profileContext.surplus < 0 ? Math.abs(profileContext.surplus) : 0,
    },
  };
}

export function getSaharaWellness(userIdOrPersona: string): SaharaWellnessData {
  const profile = getArthBodhProfile(userIdOrPersona);

  if (!profile) {
    throw new Error("User not found");
  }

  const txs = db
    .prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC")
    .all(profile.userId) as TransactionRecord[];

  const assessment = calculateSaharaStress(txs, {
    incomeEst: profile.incomeEst,
    essentialSpends: profile.essentialSpends,
    emiLoad: profile.emiLoad,
    surplus: profile.surplus,
    surplusTrend: profile.surplusTrend,
    signals: profile.signals,
  });

  const isStress = assessment.band === "HIGH";

  // Check if relief was applied in alerts/audit table
  const reliefRecord = db
    .prepare("SELECT * FROM alerts WHERE user_id = ? AND headline LIKE '%Moratorium%'")
    .get(profile.userId) as any;

  const applied = !!reliefRecord;

  return {
    userId: profile.userId,
    stressScore: assessment.score,
    stressBand: assessment.band,
    protectiveHoldActive: isStress,
    factors: assessment.factors,
    cashFlowAudit: assessment.cashFlowAudit,
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

