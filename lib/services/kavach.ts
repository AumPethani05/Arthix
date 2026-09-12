import { db } from "../db";
import { getArthBodhProfile, TransactionRecord } from "./arthbodh";

export interface AnomalySignal {
  type: "NEW_PAYEE" | "UNUSUAL_AMOUNT" | "UNUSUAL_HOUR" | "TRANSACTION_VELOCITY";
  description: string;
  weight: number;
}

export interface KavachAnomalyDecision {
  transactionId: string;
  amount: number;
  payee: string;
  timestamp: string;
  decision: "NORMAL" | "VERIFY" | "ALERT";
  anomalyScore: number; // 0 to 100
  signals: AnomalySignal[];
  verifyPrompt?: string; // "Did you send ₹X to Y?"
  accountFrozen: boolean; // Must ALWAYS be false in accordance with ARTHIX Constitution
  eventId?: string;
  customerResponse?: "PENDING" | "RECOGNIZED" | "ESCALATED";
}

export interface ConsentItem {
  id: string;
  institution: string;
  purpose: string;
  type: string;
  frequency: string;
  expires: string;
  active: boolean;
}

/**
 * KAVACH Anomaly Detection Algorithm.
 * 
 * Inspects transaction records across 4 dimensions:
 * 1. new payee (unseen in prior history)
 * 2. unusual amount (spike relative to historical median/mean or balance)
 * 3. unusual hour (off-peak hours: 23:00 to 05:00)
 * 4. transaction velocity (burst transfers in short window)
 * 
 * Outputs: NORMAL | VERIFY | ALERT
 * Mandatory: Do NOT auto-freeze accounts.
 */
export function analyzeTransactionAnomaly(
  tx: TransactionRecord,
  historicalTxs: TransactionRecord[],
  currentBalance = 50000
): KavachAnomalyDecision {
  const signals: AnomalySignal[] = [];

  // Exclude current transaction from history
  const priorTxs = historicalTxs.filter((t) => t.id !== tx.id);
  const priorDebits = priorTxs.filter((t) => t.type === "DEBIT");

  // 1. Check New Payee
  const knownPayees = new Set(priorDebits.map((t) => (t.payee || "").trim().toLowerCase()));
  const currentPayee = (tx.payee || "").trim().toLowerCase();
  const isNewPayee = priorDebits.length > 0 && !knownPayees.has(currentPayee);

  if (isNewPayee) {
    signals.push({
      type: "NEW_PAYEE",
      description: `First-time transfer: Payee "${tx.payee}" has never appeared in transaction history.`,
      weight: 25,
    });
  }

  // 2. Check Unusual Amount
  let medianDebit = 2000;
  if (priorDebits.length > 0) {
    const sortedAmounts = priorDebits.map((t) => t.amount).sort((a, b) => a - b);
    medianDebit = sortedAmounts[Math.floor(sortedAmounts.length / 2)];
  }

  const isAmountUnusual =
    (priorDebits.length > 0 && tx.amount >= medianDebit * 3.5 && tx.amount >= 5000) ||
    (currentBalance > 0 && tx.amount >= currentBalance * 0.6) ||
    tx.is_unusual === 1;

  if (isAmountUnusual) {
    signals.push({
      type: "UNUSUAL_AMOUNT",
      description: `Out-of-pattern amount: ₹${tx.amount.toLocaleString("en-IN")} significantly exceeds median debit (₹${medianDebit.toLocaleString("en-IN")}).`,
      weight: 35,
    });
  }

  // 3. Check Unusual Hour (23:00 - 05:00)
  const txDate = new Date(tx.timestamp);
  const hour = isNaN(txDate.getHours()) ? 12 : txDate.getHours();
  const isUnusualHour = hour >= 23 || hour < 5;

  if (isUnusualHour) {
    signals.push({
      type: "UNUSUAL_HOUR",
      description: `Off-peak execution: Transaction initiated at unusual hour (${hour}:00 IST).`,
      weight: 20,
    });
  }

  // 4. Check Transaction Velocity
  // Count debits within 15 minutes of this transaction
  const txTimeMs = txDate.getTime();
  let velocitySpike = false;

  if (!isNaN(txTimeMs)) {
    const nearbyTxs = priorDebits.filter((t) => {
      const otherMs = new Date(t.timestamp).getTime();
      return !isNaN(otherMs) && Math.abs(txTimeMs - otherMs) <= 15 * 60 * 1000;
    });

    if (nearbyTxs.length >= 2) {
      velocitySpike = true;
      signals.push({
        type: "TRANSACTION_VELOCITY",
        description: `Rapid velocity: ${nearbyTxs.length + 1} debits detected within a 15-minute window.`,
        weight: 25,
      });
    }
  }

  // Calculate Anomaly Score
  let rawScore = signals.reduce((sum, s) => sum + s.weight, 0);
  if (tx.is_unusual === 1 && rawScore < 60) {
    rawScore = 75; // Honor explicitly flagged anomaly tag
  }
  const anomalyScore = Math.min(100, rawScore);

  // Decision Classification
  let decision: "NORMAL" | "VERIFY" | "ALERT" = "NORMAL";
  if (anomalyScore >= 80) {
    decision = "ALERT";
  } else if (anomalyScore >= 35 || isNewPayee || isAmountUnusual) {
    decision = "VERIFY";
  } else {
    decision = "NORMAL";
  }

  const verifyPrompt =
    decision !== "NORMAL"
      ? `Did you send ₹${tx.amount.toLocaleString("en-IN")} to ${tx.payee}?`
      : undefined;

  return {
    transactionId: tx.id,
    amount: tx.amount,
    payee: tx.payee,
    timestamp: tx.timestamp,
    decision,
    anomalyScore,
    signals,
    verifyPrompt,
    accountFrozen: false, // Fiduciary Guard: Never auto-freeze accounts
  };
}

export function getKavachConsents(userIdOrPersona: string): ConsentItem[] {
  const profile = getArthBodhProfile(userIdOrPersona);
  if (!profile) return [];

  const rows = db
    .prepare("SELECT * FROM consent_records WHERE user_id = ?")
    .all(profile.userId) as any[];

  return rows.map((r) => ({
    id: r.id,
    institution: r.institution,
    purpose: r.purpose,
    type: "Bank Statement Read",
    frequency: "Periodic Sync",
    expires: r.expires_at,
    active: r.status === "AUTHORIZED",
  }));
}

export function toggleKavachConsent(userIdOrPersona: string, consentId: string, status: "AUTHORIZED" | "REVOKED") {
  const profile = getArthBodhProfile(userIdOrPersona);
  if (!profile) throw new Error("User not found");

  db.prepare("UPDATE consent_records SET status = ? WHERE id = ? AND user_id = ?").run(
    status,
    consentId,
    profile.userId
  );

  db.prepare(
    "INSERT INTO audit_logs (id, user_id, actor, action, rule_id, metadata) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    `aud-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    profile.userId,
    "CUSTOMER_ACTION",
    status === "REVOKED" ? "REVOKED_AA_CONSENT" : "AUTHORIZED_AA_CONSENT",
    "RULE_KAVACH_DPDP_CONSENT_V1",
    JSON.stringify({ consentId, newStatus: status })
  );

  return getKavachConsents(profile.userId);
}

export function getKavachAlerts(userIdOrPersona: string) {
  const profile = getArthBodhProfile(userIdOrPersona);
  if (!profile) return [];

  return db.prepare("SELECT * FROM alerts WHERE user_id = ? ORDER BY created_at DESC").all(profile.userId);
}

/**
 * Customer Verification Flow for Kavach Anomaly Events.
 * Prompt: "Did you send ₹X to Y?"
 * 
 * YES → recognized
 * NO → escalation (alert created, security dispatch, audit log)
 */
export function confirmKavachFraudEvent(userIdOrPersona: string, eventId: string, recognized: boolean) {
  const profile = getArthBodhProfile(userIdOrPersona);
  if (!profile) throw new Error("User not found");

  const status = recognized ? "RECOGNIZED" : "ESCALATED";

  // Check if record exists in fraud_events
  const existing = db
    .prepare("SELECT * FROM fraud_events WHERE id = ? AND user_id = ?")
    .get(eventId, profile.userId) as any;

  if (existing) {
    db.prepare("UPDATE fraud_events SET customer_response = ? WHERE id = ? AND user_id = ?").run(
      status,
      eventId,
      profile.userId
    );
  } else {
    // Insert if synthetic or newly created with a valid transaction reference
    const tx = db
      .prepare("SELECT id FROM transactions WHERE user_id = ? LIMIT 1")
      .get(profile.userId) as any;
    const txId = tx?.id || (profile.userId === "u-kamala" ? "tx-k1" : "tx-r1");

    db.prepare(
      "INSERT INTO fraud_events (id, user_id, transaction_id, score, decision, customer_response) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(eventId, profile.userId, txId, 0.85, "VERIFY", status);
  }

  // If NO (unrecognized / disputed), create high-severity alert for fraud team
  if (!recognized) {
    const alertId = `alt-fraud-escalate-${Date.now()}`;
    db.prepare(
      "INSERT INTO alerts (id, user_id, kind, severity, headline, detail, status) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).run(
      alertId,
      profile.userId,
      "FRAUD",
      "HIGH",
      "Security Escalation: Unauthorized Transfer Disputed",
      `Customer confirmed: Transaction ${eventId} was NOT authorized. Payment rail freeze requested.`,
      "OPEN"
    );
  }

  const action = recognized ? "VERIFIED_TRANSACTION_RECOGNIZED" : "ESCALATION_UNAUTHORIZED_TRANSACTION";
  const ruleId = recognized ? "RULE_KAVACH_CUSTOMER_VERIFIED_V1" : "RULE_KAVACH_FRAUD_ESCALATION_V1";

  // Store the event in audit logs
  db.prepare(
    "INSERT INTO audit_logs (id, user_id, actor, action, rule_id, metadata) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    `aud-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    profile.userId,
    "CUSTOMER",
    action,
    ruleId,
    JSON.stringify({
      eventId,
      recognized,
      status,
      timestamp: new Date().toISOString(),
      accountFrozen: false, // Never automatically frozen
    })
  );

  return {
    success: true,
    eventId,
    recognized,
    status,
    accountFrozen: false,
    message: recognized
      ? "Transaction confirmed as legitimate. Verification logged."
      : "Transaction escalated. Fraud operations notified; zero liability safeguard active.",
  };
}

