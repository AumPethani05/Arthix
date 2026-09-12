import { db } from "../db";
import { getArthBodhProfile, ArthBodhProfile } from "./arthbodh";

export interface ProductCandidate {
  id: string;
  name: string;
  family: string;
  provider: string;
  suitabilityScore: number;
  eligibilityPassed: boolean;
  recommendedAmount: number;
  reasonTag: string;
}

export function evaluateJeevanChakraCandidates(profile: ArthBodhProfile): ProductCandidate[] {
  const products = db.prepare("SELECT * FROM products").all() as any[];

  return products.map((p) => {
    let suitabilityScore = 0.5;
    let eligibilityPassed = true;
    let recommendedAmount = 0;
    let reasonTag = "STANDARD_FIT";

    if (p.family === "INVESTMENT") {
      if (profile.surplus > p.min_surplus && profile.runwayMonths >= 3.0 && profile.stressBand === "LOW") {
        suitabilityScore = 0.98;
        eligibilityPassed = true;
        recommendedAmount = Math.min(3000, Math.floor(profile.surplus * 0.2));
        reasonTag = "SUITABLE_EQUITY_EXPANSION";
      } else {
        suitabilityScore = 0.30;
        eligibilityPassed = false;
        recommendedAmount = 0;
        reasonTag = "BUFFER_NOT_MET";
      }
    } else if (p.family === "RELIEF") {
      if (profile.stressBand === "HIGH" || profile.emiLoad / profile.incomeEst > 0.45) {
        suitabilityScore = 0.99;
        eligibilityPassed = true;
        recommendedAmount = 1200; // EMI Moratorium value
        reasonTag = "HIGH_STRESS_RELIEF_REQUIRED";
      } else {
        suitabilityScore = 0.10;
        eligibilityPassed = false;
        reasonTag = "NO_STRESS_PRESENT";
      }
    } else if (p.family === "SAVINGS") {
      if (profile.runwayMonths < 3.0) {
        suitabilityScore = 0.88;
        eligibilityPassed = true;
        recommendedAmount = 4800;
        reasonTag = "BUFFER_BUILDUP_RECOMMENDED";
      }
    }

    return {
      id: p.id,
      name: p.name,
      family: p.family,
      provider: p.provider,
      suitabilityScore,
      eligibilityPassed,
      recommendedAmount,
      reasonTag,
    };
  });
}
