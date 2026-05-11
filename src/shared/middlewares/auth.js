/**
 * Optional per-route auth hook factory (not registered globally).
 * @param {import("fastify").FastifyRequest} _request
 * @param {import("fastify").FastifyReply} _reply
 */
export async function optionalAuth(_request, _reply) {
  return undefined;
}
