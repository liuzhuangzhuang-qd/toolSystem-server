import Fastify from "fastify";

import apiV2Routes from "./features/api-v2/index.js";
import audioExtractionFeature from "./features/audio-extraction/index.js";
import thumbnailGeneratorFeature from "./features/thumbnail-generator/index.js";
import userUploadFeature from "./features/user-upload/index.js";
import videoCompressionFeature from "./features/video-compression/index.js";
import videoConversionFeature from "./features/video-conversion/index.js";
import { loadConfig } from "./shared/config/index.js";
import authPlugin from "./shared/plugins/auth.js";
import corsPlugin from "./shared/plugins/cors.js";
import errorHandlerPlugin from "./shared/plugins/error-handler.js";
import loggerPlugin from "./shared/plugins/logger.js";
import rateLimitPlugin from "./shared/plugins/rate-limit.js";

/**
 * @param {{ logger?: boolean | Record<string, unknown>, config?: import("./shared/config/index.js").AppConfig }} [opts]
 */
export async function build(opts = {}) {
  const config = opts.config ?? loadConfig();

  const app = Fastify({
    logger: opts.logger ?? { level: config.logLevel },
  });

  app.decorate("config", config);

  await app.register(errorHandlerPlugin);
  await app.register(loggerPlugin);
  await app.register(corsPlugin);
  await app.register(authPlugin);
  await app.register(rateLimitPlugin);

  app.get("/health", async () => ({
    ok: true,
    service: "toolsystem-server",
    env: config.env,
  }));

  await app.register(videoConversionFeature, { prefix: "/v1" });
  await app.register(audioExtractionFeature, { prefix: "/v1/audio" });
  await app.register(thumbnailGeneratorFeature, { prefix: "/v1/thumbnails" });
  await app.register(videoCompressionFeature, { prefix: "/v1/compress" });
  await app.register(userUploadFeature, { prefix: "/v1/uploads" });
  await app.register(apiV2Routes, { prefix: "/v2" });

  return app;
}
