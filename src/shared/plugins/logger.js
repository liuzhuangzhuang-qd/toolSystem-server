import fp from "fastify-plugin";

export default fp(
  async (app) => {
    app.addHook("onResponse", async (request, reply) => {
      request.log.info(
        {
          method: request.method,
          url: request.url,
          statusCode: reply.statusCode,
          responseTime: reply.elapsedTime,
        },
        "request completed",
      );
    });
  },
  { name: "app-request-logger" },
);
