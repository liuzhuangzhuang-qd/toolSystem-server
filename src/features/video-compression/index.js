import routes from "./routes.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function videoCompressionFeature(app) {
  await app.register(routes);
}
