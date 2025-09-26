import { NextResponse } from "next/server";
import Redis from "ioredis";

// Keep a single Redis instance in dev to avoid reconnect storms
// (Next dev hot-reloads modules, so we store it on globalThis)
declare global {
  // eslint-disable-next-line no-var
  var __redis: Redis | undefined;
}

function getRedis(): Redis {
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL is missing from environment");
  }
  if (!global.__redis) {
    global.__redis = new Redis(process.env.REDIS_URL);
  }
  return global.__redis;
}

export async function GET() {
  try {
    const redis = getRedis();

    // Basic connectivity
    const pong = await redis.ping();

    // Optional write/read smoke test (safe ephemeral key)
    const key = `silo:health:${Date.now()}`;
    await redis.set(key, "ok", "EX", 10);
    const val = await redis.get(key);

    const url = process.env.REDIS_URL!;
    const isCloud = url.startsWith("rediss://") || url.includes("upstash");

    return NextResponse.json(
      {
        ok: pong === "PONG" && val === "ok",
        ping: pong,
        readWriteOK: val === "ok",
        mode: isCloud ? "cloud" : "local/dev",
        host: url.replace(/^(rediss?:\/\/)([^@]+)@/, "$1*****@"), // redact password
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err?.message || "Unknown error",
        hint:
          "Check REDIS_URL in apps/web/.env.local and that your Redis server is reachable.",
      },
      { status: 500 }
    );
  }
}
