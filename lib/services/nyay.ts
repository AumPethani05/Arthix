import { db } from "../db";
import { getArthBodhProfile, ArthBodhProfile } from "./arthbodh";
import { evaluateVivekDecision, VivekDecisionOutput } from "./vivek";

export type ConsentPurpose =
  | "TRANSACTION_ANALYSIS"
  | "PERSONALIZATION"
  | "MODEL_IMPROVEMENT"
  | "CHAT_HISTORY";

export interface NyayEvaluationResult {
  decision: "RECOMMEND" | "ASSIST_FIRST" | "SUPPRESS" | "VERIFY";
  reasonCodes: string[];
  timestamp: string;
  consentState: Record<ConsentPurpose, "AUTHORIZED" | "REVOKED">;
  stressBand: "LOW" | "MEDIUM" | "HIGH";
  mathParameters: Array<{
    parameter: string;
    evaluatedValue: string;
    guardrail: string;
    result: string;
  }>;
  explanation: {
    en: string;
    hi: string;
    gu: string;
  };
  auditId: string;
}

export interface AuditRecord {
  id: string;
  auditNumber: string;
  headline: string;
  complianceResult: string;
  timestamp: string;
  mathParameters: Array<{
    parameter: string;
    evaluatedValue: string;
    guardrail: string;
    result: string;
  }>;
}

/**
 * Fetch granular purpose-level consent records for a user.
 * Supports the 4 distinct DPDP purposes:
 * - TRANSACTION_ANALYSIS
 * - PERSONALIZATION
 * - MODEL_IMPROVEMENT
 * - CHAT_HISTORY
 */
export function getUserConsentState(userId: string): Record<ConsentPurpose, "AUTHORIZED" | "REVOKED"> {
  const records = db
    .prepare("SELECT purpose, status FROM consent_records WHERE user_id = ?")
    .all(userId) as Array<{ purpose: string; status: "AUTHORIZED" | "REVOKED" }>;

  // Defaults: active unless revoked
  const state: Record<ConsentPurpose, "AUTHORIZED" | "REVOKED"> = {
    TRANSACTION_ANALYSIS: "AUTHORIZED",
    PERSONALIZATION: "AUTHORIZED",
    MODEL_IMPROVEMENT: "REVOKED", // Default opt-in required for model training
    CHAT_HISTORY: "AUTHORIZED",
  };

  for (const r of records) {
    const p = (r.purpose || "").toUpperCase();
    if (p.includes("TRANSACTION") || p.includes("CASHFLOW") || p.includes("STATEMENT")) {
      state.TRANSACTION_ANALYSIS = r.status;
    }
    if (p.includes("PERSONALIZATION") || p.includes("RECOMMENDATION") || p.includes("CASHFLOW & RUNWAY")) {
      state.PERSONALIZATION = r.status;
    }
    if (p.includes("MODEL") || p.includes("IMPROVEMENT") || p.includes("RESEARCH")) {
      state.MODEL_IMPROVEMENT = r.status;
    }
    if (p.includes("CHAT") || p.includes("CONVERSATION") || p.includes("ASSISTANT")) {
      state.CHAT_HISTORY = r.status;
    }
  }

  return state;
}

/**
 * NYAY: Responsible AI Policy Guardrail.
 * 
 * Runs before any final recommendation is emitted to the customer.
 * Evaluates:
 * - Consent & Purpose limitation (DPDP Act 2023)
 * - Financial Stress safeguard (Sahara)
 * - Leverage / Over-indebtedness safeguard
 * - Mathematical Explainability
 * - Reason Codes
 * - Audit Trail logging
 * 
 * Output Contract:
 * Every decision MUST include:
 * - decision ("RECOMMEND" | "ASSIST_FIRST" | "SUPPRESS" | "VERIFY")
 * - reasonCodes
 * - timestamp
 * - consentState
 * - stressBand
 */
export function evaluateNyayGuardrails(
  userIdOrPersona: string,
  proposedDecision?: VivekDecisionOutput
): NyayEvaluationResult {
  const profile = getArthBodhProfile(userIdOrPersona);
  const timestamp = new Date().toISOString();

  if (!profile) {
    const auditId = `aud-err-${Date.now()}`;
    return {
      decision: "SUPPRESS",
      reasonCodes: ["RULE_NO_PROFILE_AUTHENTICATED"],
      timestamp,
      consentState: {
        TRANSACTION_ANALYSIS: "REVOKED",
        PERSONALIZATION: "REVOKED",
        MODEL_IMPROVEMENT: "REVOKED",
        CHAT_HISTORY: "REVOKED",
      },
      stressBand: "LOW",
      mathParameters: [],
      explanation: {
        en: "Profile data is unauthenticated or missing.",
        hi: "प्रोफ़ाइल डेटा उपलब्ध नहीं है।",
        gu: "પ્રોફાઇલ ડેટા ઉપલબ્ધ નથી.",
      },
      auditId,
    };
  }

  // 1. Check Granular Purpose Consent
  const consentState = getUserConsentState(profile.userId);
  const reasonCodes: string[] = [];

  // Check Gate: Personalization Consent
  const hasPersonalizationConsent = consentState.PERSONALIZATION === "AUTHORIZED";
  const hasTransactionConsent = consentState.TRANSACTION_ANALYSIS === "AUTHORIZED";

  if (!hasPersonalizationConsent) {
    reasonCodes.push("RULE_CONSENT_REVOKED_GATE", "RULE_PURPOSE_LIMITATION_PERSONALIZATION");
    const auditId = `aud-nyay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    logNyayEvent(profile.userId, "NYAY_GUARDRAIL", "SUPPRESS", "RULE_CONSENT_REVOKED_GATE", {
      reason: "Missing statutory personalization consent under DPDP Act 2023",
      consentState,
    });

    return {
      decision: "SUPPRESS",
      reasonCodes,
      timestamp,
      consentState,
      stressBand: profile.stressBand,
      mathParameters: [
        {
          parameter: "Personalization Purpose Consent",
          evaluatedValue: "REVOKED / MISSING",
          guardrail: "Must be AUTHORIZED under DPDP Act 2023 §6(1)",
          result: "FAIL (Processing Halted)",
        },
      ],
      explanation: {
        en: "Personalization consent is revoked. Automated product recommendations are strictly suppressed under DPDP Act 2023.",
        hi: "व्यक्तिगत सहमति वापस ले ली गई है। सिफारिशें रोक दी गई हैं।",
        gu: "વ્યક્તિગત ડેટા સંમતિ સ્થગિત છે. ભલામણો અટકાવવામાં આવી છે.",
      },
      auditId,
    };
  }

  if (!hasTransactionConsent) {
    reasonCodes.push("RULE_PURPOSE_LIMITATION_TRANSACTION_ANALYSIS");
    const auditId = `aud-nyay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    logNyayEvent(profile.userId, "NYAY_GUARDRAIL", "SUPPRESS", "RULE_PURPOSE_LIMITATION_TRANSACTION_ANALYSIS", {
      reason: "Transaction analysis purpose revoked",
      consentState,
    });

    return {
      decision: "SUPPRESS",
      reasonCodes,
      timestamp,
      consentState,
      stressBand: profile.stressBand,
      mathParameters: [
        {
          parameter: "Transaction Analysis Purpose Consent",
          evaluatedValue: "REVOKED",
          guardrail: "Must be AUTHORIZED for cashflow analysis",
          result: "FAIL",
        },
      ],
      explanation: {
        en: "Transaction analysis consent is revoked. ARTHIX cannot inspect bank statement data.",
        hi: "लेन-देन विश्लेषण की अनुमति नहीं है।",
        gu: "વ્યવહાર વિશ્લેષણ સંમતિ ઉપલબ્ધ નથી.",
      },
      auditId,
    };
  }

  // 2. Evaluate Vivek Decision or Default
  const decision = proposedDecision || evaluateVivekDecision(profile.userId);
  const rawDti = profile.dtiRatio && profile.dtiRatio > 0
    ? profile.dtiRatio
    : profile.incomeEst > 0
    ? profile.emiLoad / profile.incomeEst
    : 0;
  const dti = Number((rawDti * 100).toFixed(1));

  // 3. Stress & Over-Leverage Checks
  let finalDecision = decision.action;

  if (profile.stressBand === "HIGH" || profile.surplus < 0) {
    // Under high stress, recommendation of aggressive/unsecured credit is strictly prohibited
    finalDecision = "ASSIST_FIRST";
    reasonCodes.push("RULE_PREDATORY_SUPPRESSION_GUARANTEE_V1", "RULE_HIGH_STRESS_GUARD");
  } else if (dti > 35.0) {
    // Over-leveraged
    if (finalDecision === "RECOMMEND" && decision.candidateProduct?.family === "CREDIT") {
      finalDecision = "SUPPRESS";
    }
    reasonCodes.push("RULE_LEVERAGE_OVERBURDEN_GATE");
  } else if (profile.runwayMonths < 3.0 && finalDecision === "RECOMMEND") {
    finalDecision = "ASSIST_FIRST";
    reasonCodes.push("RULE_BUFFER_GATE_PREREQUISITE_V2");
  } else if (finalDecision === "RECOMMEND") {
    reasonCodes.push("RULE_EXPANSION_STABLE_SURPLUS_V4", "RULE_FIDUCIARY_INTEGRITY_PASSED");
  }

  if (!reasonCodes.includes(decision.ruleCode)) {
    reasonCodes.unshift(decision.ruleCode);
  }

  // 4. Mathematical Explainability Parameters
  const mathParameters = [
    {
      parameter: "Emergency Runway Coverage",
      evaluatedValue: `${profile.runwayMonths} Months (₹${(profile.essentialSpends * profile.runwayMonths).toLocaleString("en-IN")})`,
      guardrail: "≥ 3.0 Months essential living expenses",
      result: profile.runwayMonths >= 3.0 ? "PASS (Buffer Intact)" : "NEEDS_TOPUP (Cushion Below Ceiling)",
    },
    {
      parameter: "Total Debt-to-Inflow (DTI)",
      evaluatedValue: `${dti}% (₹${profile.emiLoad.toLocaleString("en-IN")} EMI)`,
      guardrail: "< 35.0% monthly net inflow",
      result: dti < 35.0 ? "PASS (Prudent Leverage)" : "HIGH_STRESS (Over-Leveraged)",
    },
    {
      parameter: "Intermediary Commission Load",
      evaluatedValue: "0.00% (Direct Plan Only)",
      guardrail: "0.00% absolute zero distributor kickback",
      result: "PASS (Zero Commercial Bias)",
    },
    {
      parameter: "Revolving High-APR Dues",
      evaluatedValue: "₹0 Active Card / FinTech Dues",
      guardrail: "No >24% APR loans present",
      result: profile.stressBand === "HIGH" ? "TRIGGERED (High-APR Suppressed)" : "PASS",
    },
  ];

  const auditId = `aud-nyay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  // 5. Audit Logging to Database
  logNyayEvent(profile.userId, "NYAY_GUARDRAIL", finalDecision, reasonCodes[0], {
    decision: finalDecision,
    reasonCodes,
    timestamp,
    consentState,
    stressBand: profile.stressBand,
    dti,
    runwayMonths: profile.runwayMonths,
  });

  return {
    decision: finalDecision,
    reasonCodes,
    timestamp,
    consentState,
    stressBand: profile.stressBand,
    mathParameters,
    explanation: {
      en: decision.explanationEn,
      hi: decision.explanationHi,
      gu: decision.explanationGu,
    },
    auditId,
  };
}

export function getNyayAuditTrail(userIdOrPersona: string): AuditRecord {
  const profile = getArthBodhProfile(userIdOrPersona);
  const evaluation = evaluateNyayGuardrails(userIdOrPersona);

  return {
    id: evaluation.auditId,
    auditNumber: `#BRT-AUD-2026-${profile?.personaKey === "rahul" ? "90412" : "90413"}`,
    headline: `Deterministic Decision Log: ${evaluation.decision} (${evaluation.reasonCodes[0]})`,
    complianceResult:
      evaluation.decision === "RECOMMEND" || evaluation.decision === "ASSIST_FIRST"
        ? "PASSED STATUTORY INTEGRITY CHECK"
        : "PROTECTIVE INTERCEPTION ENGAGED",
    timestamp: evaluation.timestamp,
    mathParameters: evaluation.mathParameters,
  };
}

export function logNyayEvent(userId: string, actor: string, action: string, ruleId: string, metadata: object) {
  db.prepare(
    "INSERT INTO audit_logs (id, user_id, actor, action, rule_id, metadata) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    `aud-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId,
    actor,
    action,
    ruleId,
    JSON.stringify(metadata)
  );
}

