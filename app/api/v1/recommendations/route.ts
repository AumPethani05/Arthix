import { NextRequest, NextResponse } from "next/server";
import { evaluateVivekDecision } from "@/lib/services/vivek";
import { getArthBodhProfile } from "@/lib/services/arthbodh";
import { evaluateJeevanChakraCandidates } from "@/lib/services/jeevanchakra";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get("persona") || "rahul";
  const profile = getArthBodhProfile(persona);

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const decision = evaluateVivekDecision(profile.userId);
  const candidates = evaluateJeevanChakraCandidates(profile);

  return NextResponse.json({
    action: decision.action,
    headline: decision.headline,
    subline: decision.subline,
    confidence: decision.confidence,
    ruleCode: decision.ruleCode,
    citation: decision.citation,
    metrics: decision.metrics,
    explanationEn: decision.explanationEn,
    explanationHi: decision.explanationHi,
    explanationGu: decision.explanationGu,
    candidates,
  });
}
