import { db } from "../db";
import { ArthBodhProfile } from "./arthbodh";

export interface ProductCandidate {
  id: string;
  name: string;
  family: string;
  provider: string;
  needScore: number;
  suitabilityScore: number;
  eligibilityScore: number;
  timingScore: number;
  compositeScore: number;
  eligibilityPassed: boolean;
  recommendedAmount: number;
  reasonTag: string;
  needHypothesis: string;
  timingRationale: string;
}

/**
 * JEEVANCHAKRA: Life-Stage Candidate Recommendation Engine
 * 
 * Converts the ArthBodh financial profile into candidate hypotheses.
 * Evaluates each product across 4 dimensions:
 *   - Need (weight 0.35)
 *   - Suitability (weight 0.25)
 *   - Eligibility (weight 0.20)
 *   - Timing (weight 0.20)
 * 
 * Invariant: JeevanChakra does NOT make the final decision.
 * The output is an ordered ranking of candidate hypotheses for the Vivek decision engine.
 */
export function evaluateJeevanChakraCandidates(profile: ArthBodhProfile): ProductCandidate[] {
  const products = db.prepare("SELECT * FROM products").all() as any[];

  const dti = profile.dtiRatio ?? (profile.incomeEst > 0 ? profile.emiLoad / profile.incomeEst : 0);
  const signals = profile.signals || [];
  const hasStepUp = signals.some((s) => s.signalType === "INCOME_STEP_UP");
  const hasStableSurplus = signals.some((s) => s.signalType === "SURPLUS_STABLE");
  const hasMissedEmi = signals.some((s) => s.signalType === "MISSED_EMI");
  const hasCreditLoad = signals.some((s) => s.signalType === "NEW_CREDIT_LOAD");
  const hasSurplusDecline = signals.some((s) => s.signalType === "SURPLUS_DECLINE");

  const candidates: ProductCandidate[] = products.map((p) => {
    let needScore = 0.5;
    let suitabilityScore = 0.5;
    let eligibilityScore = 1.0;
    let timingScore = 0.5;
    let recommendedAmount = 0;
    let reasonTag = "STANDARD_FIT";
    let needHypothesis = "Standard financial alignment";
    let timingRationale = "Routine monthly evaluation";

    if (p.family === "INVESTMENT") {
      // 1. Need for Long-Term Wealth / Equity / Gold
      if (profile.runwayMonths >= 3.0 && profile.surplus > 5000 && profile.stressBand === "LOW") {
        needScore = hasStepUp ? 0.95 : 0.85;
        needHypothesis = hasStepUp
          ? "Recent income step-up created surplus float suitable for wealth preservation before lifestyle inflation."
          : "Healthy uncommitted surplus and adequate reserves indicate readiness for disciplined long-term accumulation.";
      } else if (profile.runwayMonths < 3.0) {
        needScore = 0.25;
        needHypothesis = "Emergency liquid buffer is under 3.0 months; capital accumulation is subordinate to liquidity protection.";
      } else {
        needScore = 0.05;
        needHypothesis = "Cashflow tightness or high debt ratio precludes long-term capital commitment.";
      }

      // 2. Suitability
      if (profile.stressBand === "HIGH" || dti > 0.35 || profile.surplus < 0) {
        suitabilityScore = 0.05;
      } else if (profile.runwayMonths >= 3.0 && dti < 0.25) {
        suitabilityScore = 0.96; // Zero commission, transparent direct index plan
      } else {
        suitabilityScore = 0.50;
      }

      // 3. Eligibility
      const meetsSurplus = profile.surplus >= p.min_surplus;
      const meetsDti = dti <= p.max_dti;
      if (meetsSurplus && meetsDti && profile.stressBand !== "HIGH") {
        eligibilityScore = 1.0;
      } else if (meetsSurplus && dti <= 0.40) {
        eligibilityScore = 0.50;
      } else {
        eligibilityScore = 0.0;
      }

      // 4. Timing
      if (profile.salaryRegularity === "HIGHLY_REGULAR" && (hasStepUp || hasStableSurplus) && profile.surplusTrend !== "CONTRACTING") {
        timingScore = 0.94;
        timingRationale = "Optimal window: Punctual salary cycle and expanding surplus provide stable deployment window.";
      } else if (profile.surplusTrend === "CONTRACTING" || hasSurplusDecline) {
        timingScore = 0.20;
        timingRationale = "Sub-optimal: Surplus contracted recently; wait for next cycle stabilization.";
      } else {
        timingScore = 0.55;
        timingRationale = "Standard deployment cycle.";
      }

      // Recommended Amount
      if (p.id === "prod-nifty50") {
        recommendedAmount = eligibilityScore > 0 ? Math.min(5000, Math.max(1000, Math.floor(profile.surplus * 0.2 / 500) * 500)) : 0;
        reasonTag = suitabilityScore > 0.8 ? "SUITABLE_EQUITY_EXPANSION" : "EQUITY_BUFFER_GATE_TRIGGERED";
      } else {
        recommendedAmount = eligibilityScore > 0 ? 5000 : 0;
        reasonTag = "SOVEREIGN_HEDGE_ALLOCATION";
      }

    } else if (p.family === "SAVINGS") {
      // Emergency Buffer / Reserve Top-Up
      if (profile.runwayMonths < 2.0) {
        needScore = 0.98;
        needHypothesis = "Acute liquidity vulnerability: Runway is under 2.0 months of non-discretionary expenses.";
      } else if (profile.runwayMonths < 3.0) {
        needScore = 0.88;
        needHypothesis = "Sub-threshold emergency reserve: Top-up required to reach statutory 3.0 months baseline.";
      } else {
        needScore = 0.20;
        needHypothesis = "Emergency liquid cushion already meets or exceeds 3.0 months requirement.";
      }

      // Suitability: Capital preservation with instant liquidity is safe for everyone
      suitabilityScore = 0.92;

      // Eligibility: Accessible to anyone with modest surplus
      eligibilityScore = profile.surplus >= p.min_surplus ? 1.0 : 0.60;

      // Timing
      if (profile.runwayMonths < 3.0) {
        timingScore = 0.95;
        timingRationale = "Immediate priority: Build liquid cushion before commiting to market-linked assets.";
      } else {
        timingScore = 0.35;
        timingRationale = "Buffer sufficient; priority shifted to wealth stewardship.";
      }

      const neededToTarget = Math.max(500, Math.round((3.0 - profile.runwayMonths) * profile.essentialSpends));
      recommendedAmount = Math.min(neededToTarget, Math.max(500, profile.surplus > 0 ? profile.surplus : 1000));
      reasonTag = profile.runwayMonths < 3.0 ? "BUFFER_BUILDUP_RECOMMENDED" : "BUFFER_SUFFICIENT";

    } else if (p.family === "RELIEF") {
      // 60-Day Moratorium / Debt Restructuring
      if (profile.stressBand === "HIGH" || dti > 0.45 || profile.surplus < 0 || hasMissedEmi || hasSurplusDecline) {
        needScore = 0.99;
        needHypothesis = "High repayment stress detected: Debt commitments consume a critical portion of inflow.";
      } else if (dti > 0.35 || hasCreditLoad) {
        needScore = 0.65;
        needHypothesis = "Elevated debt servicing load approaching boundary limits.";
      } else {
        needScore = 0.05;
        needHypothesis = "No debt stress or default risk identified.";
      }

      // Suitability
      if (profile.stressBand === "HIGH" || dti > 0.40 || hasMissedEmi) {
        suitabilityScore = 0.99; // Fiduciary relief without credit bureau negative marks
      } else {
        suitabilityScore = 0.10;
      }

      // Eligibility: Customer must have active debt obligations
      eligibilityScore = profile.emiLoad > 0 ? 1.0 : 0.0;

      // Timing
      if (profile.stressBand === "HIGH" || hasMissedEmi || profile.surplus < 0) {
        timingScore = 0.98;
        timingRationale = "Critical timing: Interception needed before compounding default or penalty charges accrue.";
      } else {
        timingScore = 0.05;
        timingRationale = "No timing urgency for debt relief.";
      }

      recommendedAmount = Math.min(profile.emiLoad, 1200); // 1-tap moratorium relief unit
      reasonTag = needScore > 0.8 ? "HIGH_STRESS_RELIEF_REQUIRED" : "NO_STRESS_PRESENT";
    }

    // Exact Composite Score Ranking Formula:
    // 0.35 need + 0.25 suitability + 0.20 eligibility + 0.20 timing
    const compositeScore = Number(
      (0.35 * needScore + 0.25 * suitabilityScore + 0.20 * eligibilityScore + 0.20 * timingScore).toFixed(4)
    );

    const eligibilityPassed = eligibilityScore >= 0.70;

    return {
      id: p.id,
      name: p.name,
      family: p.family,
      provider: p.provider,
      needScore: Number(needScore.toFixed(3)),
      suitabilityScore: Number(suitabilityScore.toFixed(3)),
      eligibilityScore: Number(eligibilityScore.toFixed(3)),
      timingScore: Number(timingScore.toFixed(3)),
      compositeScore,
      eligibilityPassed,
      recommendedAmount,
      reasonTag,
      needHypothesis,
      timingRationale,
    };
  });

  // Sort candidates by compositeScore descending
  return candidates.sort((a, b) => b.compositeScore - a.compositeScore);
}

