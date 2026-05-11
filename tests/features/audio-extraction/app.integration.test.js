import assert from "node:assert";
import test from "node:test";

import { build } from "../../../src/app.js";
import { closeQueueService, initQueueService } from "../../../src/features/video-conversion/queue.js";
import { loadConfig } from "../../../src/shared/config/index.js";

test("GET /v1/audio/health", async (t) => {
  delete process.env.REDIS_URL;
  const cfg = loadConfig();
  await initQueueService(cfg);

  const app = await build({ logger: false, config: cfg });
  t.after(async () => {
    await app.close().catch(() => {});
    await closeQueueService();
  });

  await app.ready();

  const res = await app.inject({ method: "GET", url: "/v1/audio/health" });
  assert.strictEqual(res.statusCode, 200);
  const body = JSON.parse(res.body);
  assert.strictEqual(body.ok, true);
  assert.strictEqual(body.feature, "audio-extraction");
});
