/**
 * Reserved for video-compression queue — enable when BullMQ queue is added for that feature.
 */
console.error(
  "compression-worker: no compression queue is registered yet. Add a queue in src/features/video-compression/ and wire this worker.",
);
process.exit(1);
