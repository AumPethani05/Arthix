import { NextRequest, NextResponse } from "next/server";
import { getArthBodhProfile } from "@/lib/services/arthbodh";
import { logNyayEvent } from "@/lib/services/nyay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const persona = body.persona || body.personaId || "rahul";
    const profile = getArthBodhProfile(persona);

    if (!profile) {
      return NextResponse.json({ error: "Persona not found" }, { status: 404 });
    }

    const token = `token-${profile.personaKey}-${Date.now()}`;
    logNyayEvent(profile.userId, "USER", "LOGIN", "RULE_AUTH_FIDUCIARY_V1", { persona });

    return NextResponse.json({
      token,
      user: {
        id: profile.userId,
        name: profile.name,
        personaKey: profile.personaKey,
        locale: profile.locale,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
