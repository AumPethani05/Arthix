import { NextRequest, NextResponse } from "next/server";
import { applySaharaRelief } from "@/lib/services/sahara";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { persona, actionId } = body;

    const data = applySaharaRelief(persona || "kamala", actionId || "action-moratorium-60d");
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
