import { Worker } from "bullmq";

import { processConversionJob } from "../src/features/video-conversion/worker.js";
import { loadConfig } from "../src/shared/config/index.js";
import { createRedisConnection } from "../src/shared/utils/redisClient.js";

const config = loadConfig();

if (!config.redis.url) {
  console.error("conversion-worker requires REDIS_URL");
  process.exit(1);
}

const connection = createRedisConnection(config);

const worker = new Worker("video-convert", processConversionJob, {
  connection,
  concurrency: 2,
});

worker.on("failed", (job, err) => {
  console.error("job failed", job?.id, err);
});

worker.on("completed", (job) => {
  console.info("job completed", job.id);
});

const stop = async () => {
  await worker.close();
  connection.disconnect();
  process.exit(0);
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
