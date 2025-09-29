export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Redis from "ioredis";

let redisSingleton: Redis | null = null;
function getRedis() {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  if (!redisSingleton) redisSingleton = new Redis(url);
  return redisSingleton;
}

export async function GET() {
  // Env presence
  const env = (k: string) => (process.env[k] ? "present" : "missing");

  // Redis quick check
  let redis = "skipped", redisRw = "skipped";
  try {
    const r = getRedis();
    if (r) {
      const pong = await r.ping();
      await r.set("silo:health:probe", "ok", "EX", 5);
      const val = await r.get("silo:health:probe");
      redis = pong;
      redisRw = val === "ok" ? "ok" : "fail";
    }
  } catch (e: any) {
    redis = `error: ${e?.message ?? "unknown"}`;
  }

  return NextResponse.json({
    ok:
      env("OPENAI_API_KEY") === "present" &&
      env("PINECONE_API_KEY") === "present" &&
      env("NEXT_PUBLIC_SUPABASE_URL") === "present" &&
      env("NEXT_PUBLIC_SUPABASE_ANON_KEY") === "present" &&
      env("REDIS_URL") === "present" &&
      redis === "PONG" &&
      redisRw === "ok",
    env: {
      openai: env("OPENAI_API_KEY"),
      pinecone: env("PINECONE_API_KEY"),
      supabaseUrl: env("NEXT_PUBLIC_SUPABASE_URL"),
      supabaseAnon: env("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
      redisUrl: env("REDIS_URL"),
      clerkPub: env("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
      clerkSec: env("CLERK_SECRET_KEY"),
    },
    redis: { ping: redis, readWrite: redisRw },
  });
}
