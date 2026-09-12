import { NextRequest, NextResponse } from "next/server";
import { confirmKavachFraudEvent } from "@/lib/services/kavach";

export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const body = await req.json();
    const { persona, recognized } = body;

    const result = confirmKavachFraudEvent(persona || "kamala", params.eventId, !!recognized);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
