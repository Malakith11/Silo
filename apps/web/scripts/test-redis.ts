// apps/web/scripts/test-redis.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import Redis from "ioredis";

async function main() {
  const url = process.env.REDIS_URL;
  if (!url) {
    console.error("REDIS_URL is missing. Add it to apps/web/.env.local");
    process.exit(1);
  }

  const redis = new Redis(url, {
    // BullMQ/ioredis-friendly defaults; harmless for a simple ping too
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    // Upstash uses TLS automatically with rediss://
    // tls: { rejectUnauthorized: false }, // uncomment only if you hit local TLS issues
  });

  try {
    const pong = await redis.ping();
    await redis.set("silo:redis:test", "ok", "EX", 10);
    const val = await redis.get("silo:redis:test");

    console.log(
      JSON.stringify({
        ok: pong === "PONG" && val === "ok",
        pong,
        readWriteOK: val === "ok",
      })
    );
  } catch (err: any) {
    console.error("Redis test failed:", err?.message ?? err);
    process.exit(1);
  } finally {
    redis.disconnect();
  }
}

main();
