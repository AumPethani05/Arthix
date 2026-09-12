import { NextRequest, NextResponse } from "next/server";
import { getNyayAuditTrail } from "@/lib/services/nyay";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const persona = searchParams.get("persona") || "rahul";
  const audit = getNyayAuditTrail(persona);

  return NextResponse.json({
    recommendationId: params.id,
    auditRecord: audit,
  });
}
