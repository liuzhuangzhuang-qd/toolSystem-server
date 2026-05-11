import fp from "fastify-plugin";

import {
  HTTP_ERROR_BAD_REQUEST,
  HTTP_ERROR_INTERNAL,
} from "../constants/errorCodes.js";

export default fp(
  async (app) => {
    app.setErrorHandler((err, request, reply) => {
      if (err.validation) {
        return reply.status(400).send({
          error: HTTP_ERROR_BAD_REQUEST,
          details: err.validation,
        });
      }

      const statusCode = err.statusCode && err.statusCode < 600 ? err.statusCode : 500;
      if (statusCode >= 500) {
        request.log.error(err);
      }

      return reply.status(statusCode).send({
        error: statusCode >= 500 ? HTTP_ERROR_INTERNAL : err.message,
      });
    });
  },
  { name: "app-error-handler" },
);
