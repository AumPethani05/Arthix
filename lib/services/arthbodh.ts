import { db } from "../db";

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
  signals: Array<{ signalType: string; confidence: number; evidence: string }>;
  accounts: Array<{ bankName: string; maskedNo: string; balance: number }>;
}

export function getArthBodhProfile(userIdOrPersona: string): ArthBodhProfile | null {
  // Find user by id or persona_key
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

  return {
    userId: user.id,
    name: user.name,
    personaKey: user.persona_key,
    locale: user.locale,
    incomeEst: profile.income_est,
    essentialSpends: profile.essential_spends,
    emiLoad: profile.emi_load,
    surplus: profile.surplus,
    runwayMonths: profile.runway_months,
    stressScore: profile.stress_score,
    stressBand: profile.stress_band,
    segment: profile.segment,
    signals,
    accounts,
  };
}

export function refreshArthBodhProfile(userId: string): ArthBodhProfile {
  // Calculate profile metrics dynamically from transactions
  const txs = db
    .prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC")
    .all(userId) as any[];

  const credits = txs.filter((t) => t.type === "CREDIT").reduce((acc, t) => acc + t.amount, 0);
  const emis = txs.filter((t) => t.category === "EMI").reduce((acc, t) => acc + t.amount, 0);
  const debits = txs.filter((t) => t.type === "DEBIT" && t.category !== "EMI").reduce((acc, t) => acc + t.amount, 0);

  const incomeEst = credits > 0 ? credits : 20000;
  const essentialSpends = debits > 0 ? debits : 10000;
  const emiLoad = emis;
  const surplus = incomeEst - essentialSpends - emiLoad;

  const account = db.prepare("SELECT SUM(balance) as total FROM accounts WHERE user_id = ?").get(userId) as any;
  const totalBalance = account?.total || 0;
  const runwayMonths = essentialSpends > 0 ? Number((totalBalance / essentialSpends).toFixed(1)) : 1.0;

  const emiRatio = emiLoad / incomeEst;
  let stressScore = 15;
  let stressBand: "LOW" | "MEDIUM" | "HIGH" = "LOW";

  if (emiRatio > 0.5 || surplus < 0) {
    stressScore = 82;
    stressBand = "HIGH";
  } else if (emiRatio > 0.35 || runwayMonths < 2.0) {
    stressScore = 55;
    stressBand = "MEDIUM";
  }

  const segment = surplus > 10000 ? "SALARIED_SURPLUS" : "CASHFLOW_TIGHT";

  db.prepare(
    `UPDATE financial_profiles 
     SET income_est = ?, essential_spends = ?, emi_load = ?, surplus = ?, runway_months = ?, stress_score = ?, stress_band = ?, segment = ?, updated_at = CURRENT_TIMESTAMP
     WHERE user_id = ?`
  ).run(incomeEst, essentialSpends, emiLoad, surplus, runwayMonths, stressScore, stressBand, segment, userId);

  return getArthBodhProfile(userId)!;
}
