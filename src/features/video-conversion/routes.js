import { getTaskStatus, submitConvert } from "./controller.js";
import {
  convertAcceptedSchema,
  convertBodySchema,
  statusParamsSchema,
  statusResponseSchema,
} from "./schemas.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
async function convertRoutes(app) {
  app.post(
    "/",
    {
      schema: {
        tags: ["convert"],
        body: convertBodySchema,
        response: {
          202: convertAcceptedSchema,
        },
      },
    },
    submitConvert,
  );
}

/**
 * @param {import("fastify").FastifyInstance} app
 */
async function statusRoutes(app) {
  app.get(
    "/:jobId",
    {
      schema: {
        tags: ["status"],
        params: statusParamsSchema,
        response: {
          200: statusResponseSchema,
          404: {
            type: "object",
            properties: { error: { type: "string" } },
            required: ["error"],
          },
        },
      },
    },
    getTaskStatus,
  );
}

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function videoConversionRoutes(app) {
  await app.register(convertRoutes, { prefix: "/convert" });
  await app.register(statusRoutes, { prefix: "/status" });
}
