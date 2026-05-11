import ffmpeg from "fluent-ffmpeg";

/**
 * @param {string} inputPathOrUrl
 * @param {string} outputPath
 * @param {{ format: string, onProgress?: (percent: number) => void }} opts
 */
export function convertToFormat(inputPathOrUrl, outputPath, opts) {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(inputPathOrUrl).toFormat(opts.format);
    if (opts.onProgress) {
      command.on("progress", (progress) => {
        const pct = typeof progress.percent === "number" ? progress.percent : 0;
        opts.onProgress(Math.min(100, Math.max(0, pct)));
      });
    }
    command.on("end", () => resolve()).on("error", reject).save(outputPath);
  });
}

/**
 * @param {string} inputPathOrUrl
 * @param {string} outputPath
 * @param {"mp3" | "aac" | "wav"} format
 */
export function extractAudioTrack(inputPathOrUrl, outputPath, format) {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(inputPathOrUrl).noVideo();
    if (format === "mp3") {
      command.audioCodec("libmp3lame").toFormat("mp3");
    } else if (format === "aac") {
      command.audioCodec("aac").toFormat("ipod");
    } else {
      command.audioCodec("pcm_s16le").toFormat("wav");
    }
    command.on("end", () => resolve()).on("error", reject).save(outputPath);
  });
}

/**
 * @param {string} inputPathOrUrl
 * @param {string} outputPath
 * @param {number} timeSec
 */
export function captureVideoFrame(inputPathOrUrl, outputPath, timeSec) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPathOrUrl)
      .seekInput(Math.max(0, timeSec))
      .outputOptions(["-frames:v", "1"])
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", reject)
      .run();
  });
}

/**
 * @param {string} inputPathOrUrl
 * @param {string} outputPath
 * @param {{ crf?: number, preset?: string }} opts
 */
export function compressWithH264(inputPathOrUrl, outputPath, opts) {
  const crf = opts.crf ?? 23;
  const preset = opts.preset ?? "medium";

  return new Promise((resolve, reject) => {
    ffmpeg(inputPathOrUrl)
      .outputOptions([
        "-map",
        "0:v:0",
        "-map",
        "0:a:0?",
        "-c:v",
        "libx264",
        "-crf",
        String(crf),
        "-preset",
        preset,
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-movflags",
        "+faststart",
      ])
      .output(outputPath)
      .on("end", () => resolve())
      .on("error", reject)
      .run();
  });
}
