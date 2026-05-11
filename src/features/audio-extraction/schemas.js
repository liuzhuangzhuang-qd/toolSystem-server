export const healthResponseSchema = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    feature: { type: "string" },
  },
  required: ["ok", "feature"],
};

export const extractBodySchema = {
  type: "object",
  required: ["input"],
  properties: {
    input: {
      type: "string",
      minLength: 1,
      description: "Source URL or stored file key under uploads",
    },
    format: {
      type: "string",
      enum: ["mp3", "aac", "wav"],
      default: "mp3",
    },
  },
  additionalProperties: false,
};

export const extractResponseSchema = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    output: { type: "string", description: "Filename in outputs directory" },
    format: { type: "string" },
  },
  required: ["ok", "output", "format"],
};
