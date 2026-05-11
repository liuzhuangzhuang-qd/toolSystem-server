import { build } from "./app.js";
import { closeQueueService, initQueueService } from "./features/video-conversion/queue.js";
import { loadConfig } from "./shared/config/index.js";
import { ensureDir } from "./shared/utils/fileHelper.js";

const config = loadConfig();

await initQueueService(config);
await ensureDir(config.paths.uploads);
await ensureDir(config.paths.outputs);

const app = await build({ config });

const close = async () => {
  try {
    await app.close();
    await closeQueueService();
    process.exit(0);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

process.on("SIGINT", close);
process.on("SIGTERM", close);

try {
  await app.listen({ port: config.port, host: config.host });
  app.log.info(`listening on http://${config.host}:${config.port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
