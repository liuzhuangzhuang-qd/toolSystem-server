import { joinSafe } from "./fileHelper.js";

/**
 * Resolve API `input`: HTTP(S) URL as-is, otherwise path under uploads (traversal-safe).
 * @param {string} input
 * @param {string} uploadsRoot
 * @returns {string}
 */
export function resolveMediaInput(input, uploadsRoot) {
  const trimmed = String(input).trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return joinSafe(uploadsRoot, trimmed);
}
