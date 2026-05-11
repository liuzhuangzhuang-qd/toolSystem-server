import routes from "./routes.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function audioExtractionFeature(app) {
  await app.register(routes);
}
