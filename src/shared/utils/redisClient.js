import IORedis from "ioredis";

/**
 * @param {{ redis: { url: string } }} config
 * @returns {import("ioredis").default}
 */
export function createRedisConnection(config) {
  if (!config.redis?.url) {
    throw new Error("redis.url is required");
  }
  return new IORedis(config.redis.url, {
    maxRetriesPerRequest: null,
  });
}
