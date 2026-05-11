import { randomUUID } from "node:crypto";

import { createRedisConnection } from "../../shared/utils/redisClient.js";

/** @type {import("bullmq").Queue | null} */
let bullQueue = null;
/** @type {import("ioredis").default | null} */
let redisConnection = null;

/** @type {"memory" | "bullmq"} */
let mode = "memory";

const memoryJobs = new Map();

/**
 * @param {{ redis: { url: string | null } }} config
 */
export async function initQueueService(config) {
  await closeQueueService();

  if (!config.redis.url) {
    mode = "memory";
    return;
  }

  const { Queue } = await import("bullmq");

  redisConnection = createRedisConnection(config);

  bullQueue = new Queue("video-convert", { connection: redisConnection });
  mode = "bullmq";
}

export async function closeQueueService() {
  if (bullQueue) {
    await bullQueue.close();
    bullQueue = null;
  }
  if (redisConnection) {
    redisConnection.disconnect();
    redisConnection = null;
  }
  memoryJobs.clear();
  mode = "memory";
}

/**
 * @param {Record<string, unknown>} payload
 */
export async function enqueueConvertJob(payload) {
  if (mode === "bullmq" && bullQueue) {
    const job = await bullQueue.add("convert", payload, {
      removeOnComplete: 1000,
      removeOnFail: 5000,
    });
    return { jobId: String(job.id), status: "queued" };
  }

  const id = randomUUID();
  memoryJobs.set(id, {
    id,
    state: "queued",
    progress: 0,
    payload,
    result: null,
    error: null,
  });
  return { jobId: id, status: "queued" };
}

/**
 * @param {string} jobId
 */
export async function getConvertJobStatus(jobId) {
  if (mode === "bullmq" && bullQueue) {
    const job = await bullQueue.getJob(jobId);
    if (!job) return null;
    const state = await job.getState();
    return {
      id: String(job.id),
      state,
      progress: typeof job.progress === "number" ? job.progress : 0,
      result: job.returnvalue ?? null,
      error: job.failedReason ?? null,
    };
  }

  return memoryJobs.get(jobId) ?? null;
}
