/**
 * @returns {number}
 */
export function nowMs() {
  return Date.now();
}

/**
 * @param {number} startedAt
 * @returns {number}
 */
export function elapsedMs(startedAt) {
  return Date.now() - startedAt;
}
