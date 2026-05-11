import * as audioExtractionService from "./service.js";

const FEATURE_KEY = "audio-extraction";

/**
 * @param {import("fastify").FastifyRequest<{ Body: { input: string, format?: string } }>} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function postExtract(request, reply) {
  const body = await audioExtractionService.extractAudioFromVideo(request.body, request.server.config);
  return reply.code(200).send(body);
}

/**
 * @param {import("fastify").FastifyReply} reply
 */
export async function getHealth(_request, reply) {
  const res = await audioExtractionService.getModuleHealth(FEATURE_KEY);
  return reply.send(res);
}
