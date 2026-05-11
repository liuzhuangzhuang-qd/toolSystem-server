import routes from "./routes.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function videoConversionFeature(app) {
  await app.register(routes);
}
