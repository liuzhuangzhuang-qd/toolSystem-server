import { getHealth, postCompress } from "./controller.js";
import {
  compressBodySchema,
  compressResponseSchema,
  healthResponseSchema,
} from "./schemas.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function videoCompressionRoutes(app) {
  app.get(
    "/health",
    {
      schema: {
        tags: ["video-compression"],
        response: { 200: healthResponseSchema },
      },
    },
    getHealth,
  );

  app.post(
    "/",
    {
      schema: {
        tags: ["video-compression"],
        body: compressBodySchema,
        response: { 200: compressResponseSchema },
      },
    },
    postCompress,
  );
}
