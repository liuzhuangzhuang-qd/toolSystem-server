import routes from "./routes.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function thumbnailGeneratorFeature(app) {
  await app.register(routes);
}
