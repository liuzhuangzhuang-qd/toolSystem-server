import { randomUUID } from "node:crypto";
import path from "node:path";

import { ensureDir } from "../../shared/utils/fileHelper.js";
import { compressWithH264 } from "../../shared/utils/ffmpegMedia.js";
import { resolveMediaInput } from "../../shared/utils/mediaInput.js";

/**
 * @param {{ input: string, crf?: number, preset?: string }} body
 * @param {{ paths: { uploads: string, outputs: string } }} config
 */
export async function compressVideo(body, config) {
  await ensureDir(config.paths.uploads);
  await ensureDir(config.paths.outputs);

  const input = resolveMediaInput(body.input, config.paths.uploads);
  const crf = body.crf ?? 23;
  const preset = body.preset ?? "medium";
  const outName = `${randomUUID()}.mp4`;
  const outputPath = path.join(config.paths.outputs, outName);

  await compressWithH264(input, outputPath, { crf, preset });

  return { ok: true, output: outName, crf, preset };
}

/**
 * @param {string} featureKey
 */
export async function getModuleHealth(featureKey) {
  return { ok: true, feature: featureKey };
}
