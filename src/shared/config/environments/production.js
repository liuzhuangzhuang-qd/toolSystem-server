export default function production() {
  return {
    port: 3000,
    host: "0.0.0.0",
    logLevel: "warn",
    cors: { origin: false },
  };
}
