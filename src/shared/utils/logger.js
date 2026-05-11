export function logInfo(obj, msg) {
  console.log(JSON.stringify({ level: "info", msg, ...obj }));
}

export function logError(obj, msg) {
  console.error(JSON.stringify({ level: "error", msg, ...obj }));
}
