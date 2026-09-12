import { NextRequest, NextResponse } from "next/server";
import { getArthBodhProfile } from "@/lib/services/arthbodh";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get("persona") || "rahul";
  const profile = getArthBodhProfile(persona);

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}
