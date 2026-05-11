import routes from "./routes.js";

/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function userUploadFeature(app) {
  await app.register(routes);
}
