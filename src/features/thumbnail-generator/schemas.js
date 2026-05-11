export const healthResponseSchema = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    feature: { type: "string" },
  },
  required: ["ok", "feature"],
};

export const screenshotBodySchema = {
  type: "object",
  required: ["input"],
  properties: {
    input: {
      type: "string",
      minLength: 1,
      description: "Source URL or stored file key under uploads",
    },
    timeSec: {
      type: "number",
      minimum: 0,
      default: 0,
      description: "Seek position in seconds before capturing one frame",
    },
    format: {
      type: "string",
      enum: ["jpg", "png"],
      default: "jpg",
    },
  },
  additionalProperties: false,
};

export const screenshotResponseSchema = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    output: { type: "string" },
    timeSec: { type: "number" },
    format: { type: "string" },
  },
  required: ["ok", "output", "timeSec", "format"],
};
