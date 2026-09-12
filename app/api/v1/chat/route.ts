import { NextRequest, NextResponse } from "next/server";
import { processBhashaSahayakTurn } from "@/lib/services/bhashasahayak";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { persona, text, locale, sessionId } = body;

    const result = processBhashaSahayakTurn({
      userIdOrPersona: persona || "rahul",
      userText: text || "",
      locale: locale || "en",
      sessionId,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
