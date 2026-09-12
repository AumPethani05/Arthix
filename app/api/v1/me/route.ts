import { NextRequest, NextResponse } from "next/server";
import { getArthBodhProfile } from "@/lib/services/arthbodh";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get("persona") || "rahul";
  const profile = getArthBodhProfile(persona);

  if (!profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const phone = profile.personaKey === "kamala" ? "+91 98765 43210" : "+91 98201 42180";
  const panMasked = profile.personaKey === "kamala" ? "ABCDE****F" : "BKRPK****D";
  const kycStatus = "VERIFIED";

  return NextResponse.json({
    id: profile.userId,
    name: profile.name,
    personaKey: profile.personaKey,
    locale: profile.locale,
    phone,
    panMasked,
    kycStatus,
    profile,
  });
}
