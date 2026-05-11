import * as userUploadService from "./service.js";

const FEATURE_KEY = "user-upload";

/**
 * @param {import("fastify").FastifyReply} reply
 */
export async function getHealth(_request, reply) {
  const body = await userUploadService.getModuleHealth(FEATURE_KEY);
  return reply.send(body);
}
