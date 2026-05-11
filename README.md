# toolSystem-server

Fastify service scaffold aligned with the repository layout in `rule.md`.

## Scripts

- `npm run dev` — start with `node --watch`
- `npm start` — production-style start
- `npm test` — Node.js built-in test runner

## HTTP

- `GET /health` — liveness
- `POST /v1/convert` — enqueue conversion (`{ "input": string, "outputFormat"?: "mp4" | "webm" }`)
- `GET /v1/status/:jobId` — job status
- `GET /v2/ready` — placeholder for future versioning

## Configuration

Copy `.env.example` to `.env`. Without `REDIS_URL`, the queue uses an in-memory backend for local development. Set `REDIS_URL` to use BullMQ-backed jobs.

## Layout

Source lives under `src/features/` (domain modules), `src/shared/` (plugins, config, utils), plus `app.js` and `server.js`, as described in `rule.md`.
# toolSystem-server
