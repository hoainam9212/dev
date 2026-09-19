import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildApp } from './app.js';
import { openDb } from './db.js';
import { registerClient } from './static.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 8787);
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';
const DB_PATH = process.env.DB_PATH ?? path.resolve(here, '..', 'data.db');
const CLIENT_DIST = process.env.CLIENT_DIST ?? path.resolve(here, '..', '..', 'client', 'dist');

async function main() {
  if (JWT_SECRET === 'dev-secret-change-me' && process.env.NODE_ENV === 'production') {
    console.warn('WARNING: set JWT_SECRET in production');
  }
  const app = await buildApp({ db: openDb(DB_PATH), jwtSecret: JWT_SECRET, logger: true });

  if (fs.existsSync(CLIENT_DIST)) {
    await registerClient(app, CLIENT_DIST);
    app.log.info(`serving client from ${CLIENT_DIST}`);
  }

  await app.listen({ port: PORT, host: '0.0.0.0' });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
