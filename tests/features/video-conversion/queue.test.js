import assert from "node:assert";
import test from "node:test";

import {
  closeQueueService,
  enqueueConvertJob,
  getConvertJobStatus,
  initQueueService,
} from "../../../src/features/video-conversion/queue.js";

test("memory queue stores and returns jobs", async (t) => {
  t.after(async () => {
    await closeQueueService();
  });

  await initQueueService({ redis: { url: null } });
  const { jobId } = await enqueueConvertJob({ input: "x" });
  const job = await getConvertJobStatus(jobId);
  assert.ok(job);
  assert.strictEqual(job?.state, "queued");
});
