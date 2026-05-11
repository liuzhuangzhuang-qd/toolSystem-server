/**
 * @param {import("fastify").FastifyInstance} app
 */
export default async function apiV2Routes(app) {
  app.get("/ready", async () => ({
    version: 2,
    message: "v2 reserved for future API versions",
  }));
}
