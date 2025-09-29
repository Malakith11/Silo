// apps/web/scripts/test-bullmq.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Queue, Worker, QueueEvents, JobsOptions } from "bullmq";
import IORedis from "ioredis";

if (!process.env.REDIS_URL) {
  console.error("REDIS_URL is missing. Add it to apps/web/.env.local");
  process.exit(1);
}

const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
  // tls: { rejectUnauthorized: false }, // uncomment only if needed
});

const queueName = "smoke";
const opts = { connection, prefix: "silo" as const };

(async () => {
  const queue = new Queue(queueName, opts);
  const events = new QueueEvents(queueName, opts);
  await events.waitUntilReady(); // ✅ ensure event stream is ready

  const worker = new Worker(
    queueName,
    async (job) => {
      return { echoed: job.data, at: new Date().toISOString() };
    },
    opts
  );
  await worker.waitUntilReady();

  // Keep the job around briefly so reads work (or omit and rely on waitUntilFinished)
  const jobOpts: JobsOptions = {
    removeOnComplete: { age: 30 },  // ✅ grace period (seconds)
    removeOnFail: { age: 3600 },
  };

  const job = await queue.add("echo", { hello: "world" }, jobOpts);

  // ✅ Get result before job removal (works even if removeOnComplete is true)
  const returnvalue = await job.waitUntilFinished(events, 8000);

  // You can still ask BullMQ for the current state (should be "completed")
  const state = await job.getState().catch(() => "unknown");

  console.log("BullMQ result:", { id: job.id, state, returnvalue });

  await worker.close();
  await events.close();
  await queue.close();
  await connection.quit();
})().catch((err) => {
  console.error("BullMQ smoke failed:", err);
  process.exit(1);
});
