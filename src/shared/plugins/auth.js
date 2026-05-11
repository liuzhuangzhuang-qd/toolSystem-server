import fp from "fastify-plugin";

/**
 * Placeholder auth plugin — extend with real verification when needed.
 */
export default fp(
  async (app) => {
    app.decorate("auth", {
      /** @returns {Promise<void>} */
      async assertUser() {
        return undefined;
      },
    });
  },
  { name: "app-auth-placeholder" },
);
