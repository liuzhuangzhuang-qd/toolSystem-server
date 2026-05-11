import { getHealth, postScreenshot } from "./controller.js";
import {
  healthResponseSchema,
  screenshotBodySchema,
  screenshotResponseSchema,
} from "./schemas.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function thumbnailRoutes(app) {
  app.get(
    "/health",
    {
      schema: {
        tags: ["thumbnail-generator"],
        response: { 200: healthResponseSchema },
      },
    },
    getHealth,
  );

  app.post(
    "/screenshot",
    {
      schema: {
        tags: ["thumbnail-generator"],
        body: screenshotBodySchema,
        response: { 200: screenshotResponseSchema },
      },
    },
    postScreenshot,
  );
}
