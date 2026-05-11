import fp from "fastify-plugin";
import cors from "@fastify/cors";

export default fp(
  async (app) => {
    const cfg = app.config?.cors ?? { origin: true };
    await app.register(cors, cfg);
  },
  { name: "app-cors" },
);
