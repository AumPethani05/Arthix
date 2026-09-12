import { NextRequest, NextResponse } from "next/server";
import { refreshArthBodhProfile, getArthBodhProfile } from "@/lib/services/arthbodh";
import { evaluateVivekDecision } from "@/lib/services/vivek";
import { logNyayEvent } from "@/lib/services/nyay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const persona = body.persona || "rahul";
    const profile = getArthBodhProfile(persona);

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const updatedProfile = refreshArthBodhProfile(profile.userId);
    const decision = evaluateVivekDecision(profile.userId);

    logNyayEvent(profile.userId, "SYSTEM", "REFRESH_INTELLIGENCE", "RULE_FEATURE_ENGINEERING_V1", {
      newSurplus: updatedProfile.surplus,
      newStressScore: updatedProfile.stressScore,
      newAction: decision.action,
    });

    return NextResponse.json({
      profile: updatedProfile,
      decision,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
