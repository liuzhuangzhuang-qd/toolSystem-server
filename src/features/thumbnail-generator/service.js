import { randomUUID } from "node:crypto";
import path from "node:path";

import { ensureDir } from "../../shared/utils/fileHelper.js";
import { captureVideoFrame } from "../../shared/utils/ffmpegMedia.js";
import { resolveMediaInput } from "../../shared/utils/mediaInput.js";

/**
 * @param {{ input: string, timeSec?: number, format?: "jpg" | "png" }} body
 * @param {{ paths: { uploads: string, outputs: string } }} config
 */
export async function screenshotVideo(body, config) {
  await ensureDir(config.paths.uploads);
  await ensureDir(config.paths.outputs);

  const timeSec = body.timeSec ?? 0;
  const format = body.format ?? "jpg";
  const ext = format === "png" ? "png" : "jpg";
  const input = resolveMediaInput(body.input, config.paths.uploads);
  const outName = `${randomUUID()}.${ext}`;
  const outputPath = path.join(config.paths.outputs, outName);

  await captureVideoFrame(input, outputPath, timeSec);

  return { ok: true, output: outName, timeSec, format: ext === "png" ? "png" : "jpg" };
}

/**
 * @param {string} featureKey
 */
export async function getModuleHealth(featureKey) {
  return { ok: true, feature: featureKey };
}
