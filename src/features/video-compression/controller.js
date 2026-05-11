import * as videoCompressionService from "./service.js";

const FEATURE_KEY = "video-compression";

/**
 * @param {import("fastify").FastifyRequest<{ Body: { input: string, crf?: number, preset?: string } }>} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function postCompress(request, reply) {
  const body = await videoCompressionService.compressVideo(request.body, request.server.config);
  return reply.code(200).send(body);
}

/**
 * @param {import("fastify").FastifyReply} reply
 */
export async function getHealth(_request, reply) {
  const res = await videoCompressionService.getModuleHealth(FEATURE_KEY);
  return reply.send(res);
}
