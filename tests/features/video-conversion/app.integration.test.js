import assert from "node:assert";
import test from "node:test";

import { build } from "../../../src/app.js";
import { closeQueueService, initQueueService } from "../../../src/features/video-conversion/queue.js";
import { loadConfig } from "../../../src/shared/config/index.js";

test("POST /v1/convert then GET /v1/status (memory queue)", async (t) => {
  delete process.env.REDIS_URL;
  const cfg = loadConfig();
  await initQueueService(cfg);

  const app = await build({ logger: false, config: cfg });
  t.after(async () => {
    await app.close().catch(() => {});
    await closeQueueService();
  });

  await app.ready();

  const post = await app.inject({
    method: "POST",
    url: "/v1/convert",
    payload: { input: "https://example.com/a.mp4" },
  });
  assert.strictEqual(post.statusCode, 202);
  const body = JSON.parse(post.body);
  assert.ok(body.jobId);

  const get = await app.inject({
    method: "GET",
    url: `/v1/status/${body.jobId}`,
  });
  assert.strictEqual(get.statusCode, 200);
  const st = JSON.parse(get.body);
  assert.strictEqual(st.state, "queued");
});
