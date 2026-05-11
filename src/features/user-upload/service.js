/**
 * @param {string} featureKey
 */
export async function getModuleHealth(featureKey) {
  return { ok: true, feature: featureKey };
}
