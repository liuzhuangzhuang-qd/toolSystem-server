export const healthResponseSchema = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    feature: { type: "string" },
  },
  required: ["ok", "feature"],
};

export const compressBodySchema = {
  type: "object",
  required: ["input"],
  properties: {
    input: {
      type: "string",
      minLength: 1,
      description: "Source URL or stored file key under uploads",
    },
    crf: {
      type: "integer",
      minimum: 0,
      maximum: 51,
      default: 23,
      description: "libx264 CRF (lower = better quality, larger size)",
    },
    preset: {
      type: "string",
      enum: ["ultrafast", "superfast", "veryfast", "faster", "fast", "medium", "slow", "slower", "veryslow"],
      default: "medium",
    },
  },
  additionalProperties: false,
};

export const compressResponseSchema = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    output: { type: "string" },
    crf: { type: "number" },
    preset: { type: "string" },
  },
  required: ["ok", "output", "crf", "preset"],
};
