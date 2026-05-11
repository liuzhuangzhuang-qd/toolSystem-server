export default function staging() {
  return {
    port: 3000,
    host: "0.0.0.0",
    logLevel: "info",
    cors: { origin: true },
  };
}
