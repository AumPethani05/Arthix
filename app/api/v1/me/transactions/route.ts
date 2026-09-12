import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getArthBodhProfile } from "@/lib/services/arthbodh";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get("persona") || "rahul";
  const profile = getArthBodhProfile(persona);

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const txs = db
    .prepare("SELECT * FROM transactions WHERE user_id = ? ORDER BY timestamp DESC")
    .all(profile.userId);

  return NextResponse.json({ transactions: txs });
}
