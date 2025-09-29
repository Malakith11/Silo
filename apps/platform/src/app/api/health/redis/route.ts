// apps/platform/src/app/api/health/redis/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Redis from "ioredis";

declare global { var __redis: Redis | undefined }

function getRedis(): Redis {
  if (!process.env.REDIS_URL) throw new Error("REDIS_URL is missing");
  if (!global.__redis) global.__redis = new Redis(process.env.REDIS_URL);
  return global.__redis;
}

export async function GET() {
  try {
    const redis = getRedis();
    const pong = await redis.ping();
    const key = `silo:health:${Date.now()}`;
    await redis.set(key, "ok", "EX", 10);
    const val = await redis.get(key);

    return NextResponse.json({
      ok: pong === "PONG" && val === "ok",
      ping: pong,
      readWriteOK: val === "ok",
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
