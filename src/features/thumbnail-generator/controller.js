import * as thumbnailService from "./service.js";

const FEATURE_KEY = "thumbnail-generator";

/**
 * @param {import("fastify").FastifyRequest<{ Body: { input: string, timeSec?: number, format?: string } }>} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function postScreenshot(request, reply) {
  const body = await thumbnailService.screenshotVideo(request.body, request.server.config);
  return reply.code(200).send(body);
}

/**
 * @param {import("fastify").FastifyReply} reply
 */
export async function getHealth(_request, reply) {
  const res = await thumbnailService.getModuleHealth(FEATURE_KEY);
  return reply.send(res);
}
