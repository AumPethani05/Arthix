import { NextRequest, NextResponse } from "next/server";
import { getKavachConsents, toggleKavachConsent } from "@/lib/services/kavach";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get("persona") || "rahul";

  const consents = getKavachConsents(persona);
  return NextResponse.json({ consents });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { persona, consentId, status } = body;

    const consents = toggleKavachConsent(persona || "rahul", consentId, status);
    return NextResponse.json({ consents });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
