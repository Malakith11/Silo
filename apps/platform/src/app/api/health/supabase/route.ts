export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anon) return NextResponse.json({ ok: false, error: "Supabase env missing" }, { status: 500 });

    const sb = createClient(url, anon);
    const { error: insErr } = await sb.from("health_checks").insert({ note: "ok" }).select("id").limit(1).single();
    if (insErr) return NextResponse.json({ ok: false, error: "insert failed: " + insErr.message }, { status: 500 });

    const { data, error } = await sb.from("health_checks").select("id, note, created_at").order("id", { ascending: false }).limit(1);
    if (error) return NextResponse.json({ ok: false, error: "select failed: " + error.message }, { status: 500 });

    return NextResponse.json({ ok: true, latest: data?.[0] ?? null });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
