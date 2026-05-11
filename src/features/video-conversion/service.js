import { ensureDir } from "../../shared/utils/fileHelper.js";
import { enqueueConvertJob, getConvertJobStatus } from "./queue.js";

/**
 * @param {{ input: string, outputFormat?: string }} body
 * @param {{ paths: { uploads: string, outputs: string } }} config
 */
export async function submitConvert(body, config) {
  await ensureDir(config.paths.uploads);
  await ensureDir(config.paths.outputs);

  return enqueueConvertJob({
    input: body.input,
    outputFormat: body.outputFormat ?? "mp4",
  });
}

/**
 * @param {string} jobId
 */
export async function getVideoTaskStatus(jobId) {
  return getConvertJobStatus(jobId);
}
