import { db } from "../db";
import { calculateSaharaStress } from "./sahara";

export interface SpendingMix {
  essential: number;
  discretionary: number;
  emi: number;
  other: number;
  essentialRatio: number;
  discretionaryRatio: number;
  emiRatio: number;
  categories: Record<string, number>;
}

export interface ArthBodhProfile {
  userId: string;
  name: string;
  personaKey: string;
  locale: string;
  incomeEst: number;
  essentialSpends: number;
  emiLoad: number;
  surplus: number;
  runwayMonths: number;
  stressScore: number;
  stressBand: "LOW" | "MEDIUM" | "HIGH";
  segment: string;
  
  // ARTHBODH Calculated Metrics
  incomeCadence: "MONTHLY_REGULAR" | "BI_WEEKLY" | "IRREGULAR" | "SEASONAL" | "NO_INFLOW";
  spendingMix: SpendingMix;
  savingsResidual: number;
  savingsRate: number;
  surplusTrend: "EXPANDING" | "STABLE" | "CONTRACTING" | "VOLATILE";
  salaryRegularity: "HIGHLY_REGULAR" | "MODERATE" | "IRREGULAR" | "DELAYED";
  regularityScore: number;
  dtiRatio: number;

  signals: Array<{ signalType: string; confidence: number; evidence: string }>;
  accounts: Array<{ bankName: string; maskedNo: string; balance: number }>;
}

export interface TransactionRecord {
  id: string;
  account_id?: string;
  user_id?: string;
  timestamp: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  category: string;
  payee: string;
  channel?: string;
  is_unusual?: number;
}

const ESSENTIAL_CATEGORIES = new Set([
  "GROCERIES",
  "UTILITIES",
  "RENT",
  "HEALTHCARE",
  "EDUCATION",
  "BILLS",
  "FOOD_ESSENTIAL",
  "MEDICAL",
  "SUPPLIES",
  "ESSENTIAL",
]);

const DISCRETIONARY_CATEGORIES = new Set([
  "SHOPPING",
  "DINING",
  "ENTERTAINMENT",
  "TRAVEL",
  "LEISURE",
  "ELECTRONICS",
  "PERSONAL",
  "DISCRETIONARY",
]);

const EMI_CATEGORIES = new Set([
  "EMI",
  "LOAN_REPAYMENT",
  "MICROFINANCE",
  "DEBT_SERVICE",
]);

/**
 * Pure calculation logic for ArthBodh features and signals from transaction history.
 */
export function calculateArthBodhMetrics(
  txs: TransactionRecord[],
  totalBalance: number,
  baselineProfile?: { incomeEst?: number; emiLoad?: number; surplus?: number }
): {
  incomeEst: number;
  essentialSpends: number;
  emiLoad: number;
  surplus: number;
  runwayMonths: number;
  stressScore: number;
  stressBand: "LOW" | "MEDIUM" | "HIGH";
  segment: string;
  incomeCadence: "MONTHLY_REGULAR" | "BI_WEEKLY" | "IRREGULAR" | "SEASONAL" | "NO_INFLOW";
  spendingMix: SpendingMix;
  savingsResidual: number;
  savingsRate: number;
  surplusTrend: "EXPANDING" | "STABLE" | "CONTRACTING" | "VOLATILE";
  salaryRegularity: "HIGHLY_REGULAR" | "MODERATE" | "IRREGULAR" | "DELAYED";
  regularityScore: number;
  dtiRatio: number;
  detectedSignals: Array<{ signalType: string; confidence: number; evidence: string }>;
} {
  // 1. Separate Credits & Debits
  const credits = txs.filter((t) => t.type === "CREDIT");
  const debits = txs.filter((t) => t.type === "DEBIT");

  // Chronological sort
  const sortedCredits = [...credits].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Group primary income credits (Salary / Business Inflow / primary credits)
  const incomeCredits = sortedCredits.filter(
    (t) => t.category === "SALARY" || t.category === "BUSINESS_INFLOW" || t.amount >= 10000
  );

  // Monthly income estimate
  const totalInflow = credits.reduce((sum, t) => sum + t.amount, 0);
  let incomeEst = 0;
  if (incomeCredits.length > 0) {
    // If multiple credits, use latest cycle or normalized average
    const latestCredit = incomeCredits[incomeCredits.length - 1].amount;
    incomeEst = latestCredit;
  } else if (totalInflow > 0) {
    incomeEst = totalInflow;
  } else {
    incomeEst = baselineProfile?.incomeEst || 20000;
  }

  // 2. Spending Mix Breakdown
  let essentialSum = 0;
  let discretionarySum = 0;
  let emiSum = 0;
  let otherSum = 0;
  const categoryMap: Record<string, number> = {};

  for (const debit of debits) {
    const cat = (debit.category || "OTHER").toUpperCase();
    categoryMap[cat] = (categoryMap[cat] || 0) + debit.amount;

    if (EMI_CATEGORIES.has(cat)) {
      emiSum += debit.amount;
    } else if (ESSENTIAL_CATEGORIES.has(cat)) {
      essentialSum += debit.amount;
    } else if (DISCRETIONARY_CATEGORIES.has(cat)) {
      discretionarySum += debit.amount;
    } else {
      // Unspecified category: check keywords or categorize as essential if utility/grocery like
      if (cat.includes("GROCERY") || cat.includes("RENT") || cat.includes("BILL")) {
        essentialSum += debit.amount;
      } else if (cat.includes("SHOP") || cat.includes("FOOD") || cat.includes("CAFE")) {
        discretionarySum += debit.amount;
      } else {
        otherSum += debit.amount;
      }
    }
  }

  const totalDebits = debits.reduce((acc, t) => acc + t.amount, 0);
  const essentialSpends = essentialSum > 0 ? essentialSum : (baselineProfile ? Math.max(8000, incomeEst * 0.45) : 10000);
  const emiLoad = emiSum;
  const dtiRatio = incomeEst > 0 ? emiLoad / incomeEst : 0;

  const spendingMix: SpendingMix = {
    essential: essentialSum,
    discretionary: discretionarySum,
    emi: emiSum,
    other: otherSum,
    essentialRatio: totalDebits > 0 ? Number((essentialSum / totalDebits).toFixed(3)) : 0.6,
    discretionaryRatio: totalDebits > 0 ? Number((discretionarySum / totalDebits).toFixed(3)) : 0.2,
    emiRatio: totalDebits > 0 ? Number((emiSum / totalDebits).toFixed(3)) : 0.2,
    categories: categoryMap,
  };

  // 3. Savings Residual & Surplus
  const surplus = incomeEst - essentialSpends - emiLoad;
  const savingsResidual = surplus;
  const savingsRate = incomeEst > 0 ? Number((savingsResidual / incomeEst).toFixed(3)) : 0;

  // 4. Runway Months
  const runwayMonths = essentialSpends > 0 ? Number((totalBalance / essentialSpends).toFixed(1)) : 1.0;

  // 5. Income Cadence & Salary Regularity
  let incomeCadence: "MONTHLY_REGULAR" | "BI_WEEKLY" | "IRREGULAR" | "SEASONAL" | "NO_INFLOW" = "MONTHLY_REGULAR";
  let salaryRegularity: "HIGHLY_REGULAR" | "MODERATE" | "IRREGULAR" | "DELAYED" = "HIGHLY_REGULAR";
  let regularityScore = 0.95;

  if (incomeCredits.length >= 2) {
    const intervals: number[] = [];
    for (let i = 1; i < incomeCredits.length; i++) {
      const diffMs = new Date(incomeCredits[i].timestamp).getTime() - new Date(incomeCredits[i - 1].timestamp).getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      intervals.push(diffDays);
    }

    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const maxInterval = Math.max(...intervals);
    const minInterval = Math.min(...intervals);
    const spread = maxInterval - minInterval;

    if (avgInterval >= 25 && avgInterval <= 35 && spread <= 6) {
      incomeCadence = "MONTHLY_REGULAR";
      salaryRegularity = "HIGHLY_REGULAR";
      regularityScore = 0.96;
    } else if (avgInterval >= 12 && avgInterval <= 18) {
      incomeCadence = "BI_WEEKLY";
      salaryRegularity = "HIGHLY_REGULAR";
      regularityScore = 0.92;
    } else if (spread > 15 || avgInterval > 40) {
      incomeCadence = avgInterval > 60 ? "SEASONAL" : "IRREGULAR";
      salaryRegularity = "IRREGULAR";
      regularityScore = 0.45;
    }
  } else if (incomeCredits.length === 1) {
    const primary = incomeCredits[0];
    if (primary.category === "SALARY") {
      incomeCadence = "MONTHLY_REGULAR";
      salaryRegularity = "HIGHLY_REGULAR";
      regularityScore = 0.94;
    } else if (primary.category === "BUSINESS_INFLOW") {
      incomeCadence = "IRREGULAR";
      salaryRegularity = "DELAYED";
      regularityScore = 0.55;
    }
  } else {
    incomeCadence = "NO_INFLOW";
    salaryRegularity = "IRREGULAR";
    regularityScore = 0.1;
  }

  // Check for delayed salary/receivables (e.g. last credit was > 35 days ago or trade invoice delay)
  if (incomeCredits.length > 0) {
    const latestCreditDate = new Date(incomeCredits[incomeCredits.length - 1].timestamp);
    const now = new Date("2026-09-12T00:00:00Z"); // System anchor time
    const daysSinceLastCredit = Math.round((now.getTime() - latestCreditDate.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceLastCredit > 40 && incomeCadence !== "SEASONAL") {
      salaryRegularity = "DELAYED";
      regularityScore = Math.min(regularityScore, 0.4);
    }
  }

  // 6. Surplus Trend
  let surplusTrend: "EXPANDING" | "STABLE" | "CONTRACTING" | "VOLATILE" = "STABLE";
  if (baselineProfile && baselineProfile.surplus !== undefined) {
    const delta = surplus - baselineProfile.surplus;
    if (delta > 1500 && surplus > 0) {
      surplusTrend = "EXPANDING";
    } else if (delta < -2000 || surplus < 0) {
      surplusTrend = "CONTRACTING";
    } else if (Math.abs(delta) <= 1500 && surplus > 5000) {
      surplusTrend = "STABLE";
    } else {
      surplusTrend = "VOLATILE";
    }
  } else {
    if (surplus > 10000) {
      surplusTrend = "EXPANDING";
    } else if (surplus >= 3000) {
      surplusTrend = "STABLE";
    } else if (surplus < 0) {
      surplusTrend = "CONTRACTING";
    } else {
      surplusTrend = "VOLATILE";
    }
  }

  // 7. Stress Assessment (Sahara Engine)
  const saharaAssessment = calculateSaharaStress(
    txs,
    {
      incomeEst,
      essentialSpends,
      emiLoad,
      surplus,
      surplusTrend,
    },
    totalBalance
  );

  const stressScore = saharaAssessment.score;
  const stressBand = saharaAssessment.band;

  const segment = surplus > 10000 ? "SALARIED_SURPLUS" : (surplus < 0 ? "CASHFLOW_TIGHT" : "BUFFER_BUILDING");

  // 8. Signal Detection Logic
  const detectedSignals: Array<{ signalType: string; confidence: number; evidence: string }> = [];

  // Signal: INCOME_STEP_UP
  if (incomeCredits.length >= 2) {
    const prev = incomeCredits[incomeCredits.length - 2].amount;
    const curr = incomeCredits[incomeCredits.length - 1].amount;
    if (curr > prev && (curr - prev) / prev >= 0.15) {
      const stepPct = (((curr - prev) / prev) * 100).toFixed(1);
      detectedSignals.push({
        signalType: "INCOME_STEP_UP",
        confidence: 0.95,
        evidence: `Salary credit increased +${stepPct}% (₹${prev.toLocaleString("en-IN")} → ₹${curr.toLocaleString("en-IN")}) across consecutive payroll cycles.`,
      });
    }
  } else if (baselineProfile && baselineProfile.incomeEst && incomeEst > baselineProfile.incomeEst * 1.15) {
    const stepPct = (((incomeEst - baselineProfile.incomeEst) / baselineProfile.incomeEst) * 100).toFixed(1);
    detectedSignals.push({
      signalType: "INCOME_STEP_UP",
      confidence: 0.95,
      evidence: `Income baseline increased +${stepPct}% to ₹${incomeEst.toLocaleString("en-IN")}.`,
    });
  }

  // Signal: SURPLUS_STABLE
  if (surplus >= 10000 && surplusTrend !== "CONTRACTING" && stressBand === "LOW") {
    detectedSignals.push({
      signalType: "SURPLUS_STABLE",
      confidence: 0.92,
      evidence: `Net disposable surplus of ₹${surplus.toLocaleString("en-IN")}/mo sustained stably with ${(savingsRate * 100).toFixed(1)}% savings residual.`,
    });
  }

  // Signal: NEW_CREDIT_LOAD
  const emiTransactions = debits.filter((t) => EMI_CATEGORIES.has((t.category || "").toUpperCase()));
  const baselineEmi = baselineProfile?.emiLoad ?? 0;
  if (emiLoad > 0 && (emiLoad > baselineEmi * 1.25 || dtiRatio > 0.35 || emiTransactions.length >= 2)) {
    detectedSignals.push({
      signalType: "NEW_CREDIT_LOAD",
      confidence: 0.94,
      evidence: `Active debt commitments total ₹${emiLoad.toLocaleString("en-IN")}/mo consuming ${(dtiRatio * 100).toFixed(1)}% of monthly inflow (${emiTransactions.length} active repayment lines).`,
    });
  }

  // Signal: MISSED_EMI
  // Check if expected recurring loan payees have unpaid gaps, or explicitly bounced / failed debits
  const bouncedEmi = debits.find(
    (t) => t.category === "EMI_BOUNCE" || (t.category === "CHARGES" && t.payee?.toLowerCase().includes("ecs bounce"))
  );
  const hasMissedMandate = !!bouncedEmi || (dtiRatio > 0.5 && surplus < -3000 && txs.some((t) => t.is_unusual === 1));
  if (hasMissedMandate) {
    detectedSignals.push({
      signalType: "MISSED_EMI",
      confidence: 0.96,
      evidence: `Mandate execution stress: Cashflow deficit has caused an EMI payment default or acute repayment interruption risk.`,
    });
  }

  // Signal: SURPLUS_DECLINE
  if (surplus < 0 || (baselineProfile && baselineProfile.surplus && surplus < baselineProfile.surplus * 0.7)) {
    const declineDiff = baselineProfile?.surplus ? baselineProfile.surplus - surplus : Math.abs(surplus);
    detectedSignals.push({
      signalType: "SURPLUS_DECLINE",
      confidence: 0.91,
      evidence: `Net monthly surplus experienced a sharp contraction of ₹${Math.abs(declineDiff).toLocaleString("en-IN")}, driving free cashflow to ₹${surplus.toLocaleString("en-IN")}.`,
    });
  }

  return {
    incomeEst,
    essentialSpends,
    emiLoad,
    surplus,
    runwayMonths,
    stressScore,
    stressBand,
    segment,
    incomeCadence,
    spendingMix,
    savingsResidual,
    savingsRate,
    surplusTrend,
    salaryRegularity,
    regularityScore,
    dtiRatio,
    detectedSignals,
  };
}

export function getArthBodhProfile(userIdOrPersona: string): ArthBodhProfile | null {
  const user = db
    .prepare("SELECT * FROM users WHERE id = ? OR persona_key = ?")
    .get(userIdOrPersona, userIdOrPersona) as any;

  if (!user) return null;

  const profile = db
    .prepare("SELECT * FROM financial_profiles WHERE user_id = ?")
    .get(user.id) as any;

  const signals = db
    .prepare("SELECT signal_type as signalType, confidence, evidence FROM financial_signals WHERE user_id = ?")
    .all(user.id) as any;

  const accounts = db
    .prepare("SELECT bank_name as bankName, masked_no as maskedNo, balance FROM accounts WHERE user_id = ?")
    .all(user.id) as any;

  const txs = db
    .prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC")
    .all(user.id) as any[];

  const totalBalance = accounts.reduce((sum: number, a: any) => sum + (a.balance || 0), 0);

  // Compute rich metrics dynamically from transaction records
  const computed = calculateArthBodhMetrics(txs, totalBalance, {
    incomeEst: profile?.income_est,
    emiLoad: profile?.emi_load,
    surplus: profile?.surplus,
  });

  return {
    userId: user.id,
    name: user.name,
    personaKey: user.persona_key,
    locale: user.locale,
    incomeEst: profile?.income_est ?? computed.incomeEst,
    essentialSpends: profile?.essential_spends ?? computed.essentialSpends,
    emiLoad: profile?.emi_load ?? computed.emiLoad,
    surplus: profile?.surplus ?? computed.surplus,
    runwayMonths: profile?.runway_months ?? computed.runwayMonths,
    stressScore: profile?.stress_score ?? computed.stressScore,
    stressBand: profile?.stress_band ?? computed.stressBand,
    segment: profile?.segment ?? computed.segment,
    incomeCadence: computed.incomeCadence,
    spendingMix: computed.spendingMix,
    savingsResidual: computed.savingsResidual,
    savingsRate: computed.savingsRate,
    surplusTrend: computed.surplusTrend,
    salaryRegularity: computed.salaryRegularity,
    regularityScore: computed.regularityScore,
    dtiRatio: computed.dtiRatio,
    signals: signals.length > 0 ? signals : computed.detectedSignals,
    accounts,
  };
}

export function refreshArthBodhProfile(userId: string): ArthBodhProfile {
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId) as any;
  if (!user) throw new Error(`User not found: ${userId}`);

  const txs = db
    .prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC")
    .all(userId) as any[];

  const account = db.prepare("SELECT SUM(balance) as total FROM accounts WHERE user_id = ?").get(userId) as any;
  const totalBalance = account?.total || 0;

  const existingProfile = db.prepare("SELECT * FROM financial_profiles WHERE user_id = ?").get(userId) as any;

  const metrics = calculateArthBodhMetrics(txs, totalBalance, {
    incomeEst: existingProfile?.income_est,
    emiLoad: existingProfile?.emi_load,
    surplus: existingProfile?.surplus,
  });

  // Update financial_profiles
  db.prepare(
    `UPDATE financial_profiles 
     SET income_est = ?, essential_spends = ?, emi_load = ?, surplus = ?, runway_months = ?, stress_score = ?, stress_band = ?, segment = ?, updated_at = CURRENT_TIMESTAMP
     WHERE user_id = ?`
  ).run(
    metrics.incomeEst,
    metrics.essentialSpends,
    metrics.emiLoad,
    metrics.surplus,
    metrics.runwayMonths,
    metrics.stressScore,
    metrics.stressBand,
    metrics.segment,
    userId
  );

  // Sync detected signals into financial_signals
  // Keep persistent signals or merge with newly detected signals
  const upsertSignal = db.prepare(
    `INSERT INTO financial_signals (id, user_id, signal_type, confidence, evidence)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET confidence = excluded.confidence, evidence = excluded.evidence`
  );

  for (const sig of metrics.detectedSignals) {
    const existing = db
      .prepare("SELECT id FROM financial_signals WHERE user_id = ? AND signal_type = ?")
      .get(userId, sig.signalType) as any;

    const signalId = existing ? existing.id : `sig-${userId}-${sig.signalType.toLowerCase().replace(/_/g, "-")}`;
    upsertSignal.run(signalId, userId, sig.signalType, sig.confidence, sig.evidence);
  }

  return getArthBodhProfile(userId)!;
}

