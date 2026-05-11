export const convertBodySchema = {
  type: "object",
  required: ["input"],
  properties: {
    input: {
      type: "string",
      minLength: 1,
      description: "Source URL or stored file key",
    },
    outputFormat: {
      type: "string",
      enum: ["mp4", "webm"],
      default: "mp4",
    },
  },
  additionalProperties: false,
};

export const convertAcceptedSchema = {
  type: "object",
  properties: {
    jobId: { type: "string" },
    status: { type: "string" },
  },
  required: ["jobId", "status"],
};

export const statusParamsSchema = {
  type: "object",
  required: ["jobId"],
  properties: {
    jobId: { type: "string", minLength: 1 },
  },
};

export const statusResponseSchema = {
  type: "object",
  properties: {
    jobId: { type: "string" },
    state: { type: "string" },
    progress: { type: "number" },
    result: {},
    error: {},
  },
  required: ["jobId", "state", "progress"],
};
