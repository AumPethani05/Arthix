import { db } from "../db";
import { getArthBodhProfile } from "./arthbodh";

export interface ConsentItem {
  id: string;
  institution: string;
  purpose: string;
  type: string;
  frequency: string;
  expires: string;
  active: boolean;
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

export function confirmKavachFraudEvent(userIdOrPersona: string, eventId: string, recognized: boolean) {
  const profile = getArthBodhProfile(userIdOrPersona);
  if (!profile) throw new Error("User not found");

  db.prepare("UPDATE fraud_events SET customer_response = ? WHERE id = ? AND user_id = ?").run(
    recognized ? "RECOGNIZED" : "FLAGGED_FRAUD",
    eventId,
    profile.userId
  );

  db.prepare(
    "INSERT INTO audit_logs (id, user_id, actor, action, rule_id, metadata) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    `aud-${Date.now()}`,
    profile.userId,
    "CUSTOMER_ACTION",
    recognized ? "VERIFIED_TRANSACTION_RECOGNIZED" : "FLAGGED_UNAUTHORIZED_TRANSACTION",
    "RULE_KAVACH_ISOLATION_FOREST_V2",
    JSON.stringify({ eventId, recognized })
  );

  return { success: true, recognized };
}
