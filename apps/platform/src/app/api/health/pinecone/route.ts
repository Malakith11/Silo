export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";

export async function GET() {
  try {
    const apiKey = process.env.PINECONE_API_KEY;
    const targetIndex = process.env.PINECONE_INDEX; // optional
    if (!apiKey) return NextResponse.json({ ok: false, error: "PINECONE_API_KEY missing" }, { status: 500 });

    const pc = new Pinecone({ apiKey });
    const { indexes } = await pc.listIndexes();

    let indexOk = true;
    let note = "connected";
    if (targetIndex) {
      indexOk = indexes?.some(i => i.name === targetIndex) ?? false;
      if (!indexOk) note = `connected, but index "${targetIndex}" not found`;
    }

    return NextResponse.json({ ok: indexOk, indexes: indexes?.map(i => i.name) ?? [], note });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
