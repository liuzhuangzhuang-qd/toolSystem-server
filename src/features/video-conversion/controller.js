import { HTTP_ERROR_NOT_FOUND } from "../../shared/constants/errorCodes.js";
import * as videoConversionService from "./service.js";

/**
 * @param {import("fastify").FastifyRequest<{ Body: { input: string, outputFormat?: string } }>} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function submitConvert(request, reply) {
  const result = await videoConversionService.submitConvert(request.body, request.server.config);
  return reply.code(202).send(result);
}

/**
 * @param {import("fastify").FastifyRequest<{ Params: { jobId: string } }>} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function getTaskStatus(request, reply) {
  const { jobId } = request.params;
  const job = await videoConversionService.getVideoTaskStatus(jobId);

  if (!job) {
    return reply.code(404).send({ error: HTTP_ERROR_NOT_FOUND });
  }

  return reply.send({
    jobId: job.id,
    state: job.state,
    progress: job.progress,
    result: job.result,
    error: job.error,
  });
}
