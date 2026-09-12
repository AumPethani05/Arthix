import { NextRequest, NextResponse } from "next/server";
import { logNyayEvent } from "@/lib/services/nyay";
import { getArthBodhProfile } from "@/lib/services/arthbodh";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { persona, choice } = body; // 'ACCEPTED' | 'DISMISSED'
    const profile = getArthBodhProfile(persona || "rahul");

    if (profile) {
      logNyayEvent(profile.userId, "CUSTOMER", "RECOMMENDATION_FEEDBACK", "RULE_FEEDBACK_AUDIT_V1", {
        recommendationId: params.id,
        choice,
      });
    }

    return NextResponse.json({ status: "OK", choice });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
