import path from "node:path";
import { fileURLToPath } from "node:url";

import development from "./environments/development.js";
import staging from "./environments/staging.js";
import production from "./environments/production.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..", "..", "..");

const factories = {
  development,
  staging,
  production,
};

/**
 * @typedef {object} AppConfig
 * @property {string} env
 * @property {number} port
 * @property {string} host
 * @property {string} logLevel
 * @property {{ origin?: boolean | string | string[] }} cors
 * @property {{ url: string | null }} redis
 * @property {{ root: string, uploads: string, outputs: string }} paths
 */

function buildBase(envName) {
  const factory = factories[envName] ?? development;
  return factory();
}

/**
 * @returns {AppConfig}
 */
export function loadConfig() {
  const env = process.env.NODE_ENV ?? "development";
  const base = buildBase(env);

  return {
    ...base,
    env,
    port: Number(process.env.PORT) || base.port,
    host: process.env.HOST || base.host,
    logLevel: process.env.LOG_LEVEL || base.logLevel,
    redis: {
      url: process.env.REDIS_URL?.trim() || null,
    },
    paths: {
      root: rootDir,
      uploads: path.join(rootDir, "uploads"),
      outputs: path.join(rootDir, "outputs"),
    },
  };
}
