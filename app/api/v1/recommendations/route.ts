import { NextRequest, NextResponse } from "next/server";
import { evaluateVivekDecision } from "@/lib/services/vivek";
import { getArthBodhProfile } from "@/lib/services/arthbodh";
import { evaluateJeevanChakraCandidates } from "@/lib/services/jeevanchakra";
import { evaluateNyayGuardrails } from "@/lib/services/nyay";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get("persona") || "rahul";
  const profile = getArthBodhProfile(persona);

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const decision = evaluateVivekDecision(profile.userId);
  const candidates = evaluateJeevanChakraCandidates(profile);

  // Run Nyay guardrails before final recommendation output
  const nyay = evaluateNyayGuardrails(profile.userId, decision);

  return NextResponse.json({
    action: nyay.decision,
    decision: nyay.decision,
    reasonCodes: nyay.reasonCodes,
    timestamp: nyay.timestamp,
    consentState: nyay.consentState,
    stressBand: nyay.stressBand,
    headline: decision.headline,
    subline: decision.subline,
    confidence: decision.confidence,
    ruleCode: nyay.reasonCodes[0] || decision.ruleCode,
    citation: decision.citation,
    metrics: decision.metrics,
    mathParameters: nyay.mathParameters,
    explanationEn: decision.explanationEn,
    explanationHi: decision.explanationHi,
    explanationGu: decision.explanationGu,
    candidates,
    items: candidates,
    candidateProduct: decision.candidateProduct,
    auditId: nyay.auditId,
  });
}
