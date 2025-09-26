export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

async function probe(path: string) {
  try {
    const res = await fetch(`http://localhost:${process.env.PORT ?? 3000}${path}`, { cache: "no-store" });
    const json = await res.json().catch(() => ({}));
    return { path, status: res.status, ...json };
  } catch (e: any) {
    return { path, status: 500, ok: false, error: e?.message ?? "fetch failed" };
  }
}

export async function GET() {
  const [redis, openai, pinecone, supabase] = await Promise.all([
    probe("/api/health/redis"),
    probe("/api/health/openai"),
    probe("/api/health/pinecone"),
    probe("/api/health/supabase"),
  ]);
  const ok = [redis, openai, pinecone, supabase].every(s => s.ok);
  return NextResponse.json({ ok, redis, openai, pinecone, supabase });
}
