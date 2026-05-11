import { getHealth, postExtract } from "./controller.js";
import {
  extractBodySchema,
  extractResponseSchema,
  healthResponseSchema,
} from "./schemas.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function audioExtractionRoutes(app) {
  app.get(
    "/health",
    {
      schema: {
        tags: ["audio-extraction"],
        response: { 200: healthResponseSchema },
      },
    },
    getHealth,
  );

  app.post(
    "/extract",
    {
      schema: {
        tags: ["audio-extraction"],
        body: extractBodySchema,
        response: { 200: extractResponseSchema },
      },
    },
    postExtract,
  );
}
