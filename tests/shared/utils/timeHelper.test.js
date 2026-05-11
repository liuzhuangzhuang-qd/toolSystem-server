import assert from "node:assert";
import test from "node:test";

import { elapsedMs, nowMs } from "../../../src/shared/utils/timeHelper.js";

test("elapsedMs increases over time", async () => {
  const t0 = nowMs();
  await new Promise((r) => setTimeout(r, 5));
  assert.ok(elapsedMs(t0) >= 5);
});
