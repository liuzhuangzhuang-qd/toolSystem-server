import { getHealth } from "./controller.js";
import { healthResponseSchema } from "./schemas.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function userUploadRoutes(app) {
  app.get(
    "/health",
    {
      schema: {
        tags: ["user-upload"],
        response: { 200: healthResponseSchema },
      },
    },
    getHealth,
  );
}
