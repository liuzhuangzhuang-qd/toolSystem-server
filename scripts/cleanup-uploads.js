import fs from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "../src/shared/config/index.js";

const maxAgeMs = Number(process.env.CLEANUP_MAX_AGE_MS) || 7 * 24 * 60 * 60 * 1000;
const dryRun = process.env.CLEANUP_DRY_RUN === "1";

/**
 * @param {string} dir
 * @param {number} now
 */
async function cleanupDir(dir, now) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (e) {
    if (e?.code === "ENOENT") return;
    throw e;
  }

  for (const ent of entries) {
    if (ent.name.startsWith(".")) continue;
    const full = path.join(dir, ent.name);
    const stat = await fs.stat(full);
    if (stat.isDirectory()) {
      await cleanupDir(full, now);
      continue;
    }
    if (now - stat.mtimeMs > maxAgeMs) {
      if (dryRun) {
        console.info("[dry-run] would delete", full);
      } else {
        await fs.unlink(full);
        console.info("deleted", full);
      }
    }
  }
}

const config = loadConfig();
const now = Date.now();
await cleanupDir(config.paths.uploads, now);
await cleanupDir(config.paths.outputs, now);
