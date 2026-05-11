import { randomUUID } from "node:crypto";
import path from "node:path";

import { ensureDir } from "../../shared/utils/fileHelper.js";
import { extractAudioTrack } from "../../shared/utils/ffmpegMedia.js";
import { resolveMediaInput } from "../../shared/utils/mediaInput.js";

/**
 * @param {{ input: string, format?: "mp3" | "aac" | "wav" }} body
 * @param {{ paths: { uploads: string, outputs: string } }} config
 */
export async function extractAudioFromVideo(body, config) {
  await ensureDir(config.paths.uploads);
  await ensureDir(config.paths.outputs);

  const format = body.format ?? "mp3";
  const ext = format === "aac" ? "m4a" : format;
  const input = resolveMediaInput(body.input, config.paths.uploads);
  const outName = `${randomUUID()}.${ext}`;
  const outputPath = path.join(config.paths.outputs, outName);

  await extractAudioTrack(input, outputPath, format);

  return { ok: true, output: outName, format };
}

/**
 * @param {string} featureKey
 */
export async function getModuleHealth(featureKey) {
  return { ok: true, feature: featureKey };
}
