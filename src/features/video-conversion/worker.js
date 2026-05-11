import { randomUUID } from "node:crypto";
import path from "node:path";

import { loadConfig } from "../../shared/config/index.js";
import { ensureDir } from "../../shared/utils/fileHelper.js";
import { convertToFormat } from "../../shared/utils/ffmpegMedia.js";
import { resolveMediaInput } from "../../shared/utils/mediaInput.js";

/**
 * BullMQ job processor: transcode video with ffmpeg.
 * @param {import("bullmq").Job} job
 */
export async function processConversionJob(job) {
  const config = loadConfig();
  await ensureDir(config.paths.outputs);

  const data = job.data;
  const input = resolveMediaInput(String(data.input), config.paths.uploads);
  const format = data.outputFormat ?? "mp4";
  const id = randomUUID();
  const outName = `${id}.${format}`;
  const outputPath = path.join(config.paths.outputs, outName);

  await job.updateProgress(5);

  await convertToFormat(input, outputPath, {
    format,
    onProgress: async (pct) => {
      const scaled = 5 + Math.round((pct / 100) * 90);
      await job.updateProgress(Math.min(99, Math.max(5, scaled)));
    },
  });

  await job.updateProgress(100);

  return {
    ok: true,
    output: outName,
    outputFormat: format,
    input: data.input,
  };
}
