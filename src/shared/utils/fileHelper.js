import fs from "node:fs/promises";
import path from "node:path";

/**
 * @param {string} dir
 */
export async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

/**
 * @param {string} root
 * @param  {...string} segments
 */
export function joinSafe(root, ...segments) {
  const joined = path.join(root, ...segments);
  const resolved = path.resolve(joined);
  const rootResolved = path.resolve(root);
  if (!resolved.startsWith(rootResolved + path.sep) && resolved !== rootResolved) {
    throw new Error("path escapes root");
  }
  return resolved;
}
