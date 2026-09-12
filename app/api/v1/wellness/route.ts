import { NextRequest, NextResponse } from "next/server";
import { getSaharaWellness } from "@/lib/services/sahara";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get("persona") || "kamala";

  try {
    const data = getSaharaWellness(persona);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
