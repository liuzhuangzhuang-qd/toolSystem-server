/**
 * Per-route logging preHandler hook factory.
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} _reply
 */
export async function logRequestStart(request, _reply) {
  request.log.debug({ url: request.url, method: request.method }, "request");
}
