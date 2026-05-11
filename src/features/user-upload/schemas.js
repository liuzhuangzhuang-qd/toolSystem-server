export const healthResponseSchema = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    feature: { type: "string" },
  },
  required: ["ok", "feature"],
};
