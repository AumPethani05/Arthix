import { NextRequest, NextResponse } from "next/server";
import { getKavachAlerts } from "@/lib/services/kavach";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get("persona") || "kamala";

  const alerts = getKavachAlerts(persona);
  return NextResponse.json({ alerts });
}
