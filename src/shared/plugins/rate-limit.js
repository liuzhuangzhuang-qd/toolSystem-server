import fp from "fastify-plugin";

/**
 * Placeholder rate limiting — wire @fastify/rate-limit or Redis limits here.
 */
export default fp(
  async () => {
    return undefined;
  },
  { name: "app-rate-limit-placeholder" },
);
