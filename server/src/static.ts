import path from 'node:path';
import type { FastifyInstance } from 'fastify';
import fastifyStatic from '@fastify/static';

const HAS_EXTENSION = /\/[^/]+\.[a-z0-9]+$/i;

/**
 * Serve the built client (SPA) from `dir`.
 *
 * - Files are looked up on disk per request (`wildcard: true`), so a rebuild with new hashed
 *   file names works without restarting the server.
 * - Missing files that look like assets (have an extension) get a 404, never index.html:
 *   serving HTML for a .js URL blanks the page ("Expected a JavaScript module script…").
 * - index.html and the service worker are never cached; hashed assets are cached for a year.
 */
export async function registerClient(app: FastifyInstance, dir: string): Promise<void> {
  await app.register(fastifyStatic, {
    root: dir,
    prefix: '/',
    wildcard: true,
    cacheControl: false,
    setHeaders(res, filePath) {
      const rel = path.relative(dir, filePath).replace(/\\/g, '/');
      if (rel.startsWith('assets/')) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      else res.setHeader('Cache-Control', 'no-cache');
    },
  });

  app.setNotFoundHandler(async (req, reply) => {
    const url = req.url.split('?')[0]!;
    if (url.startsWith('/api/')) return reply.code(404).send({ error: 'Không tìm thấy.' });
    if (req.method !== 'GET' && req.method !== 'HEAD') return reply.code(404).send({ error: 'Không tìm thấy.' });
    if (HAS_EXTENSION.test(url)) return reply.code(404).type('text/plain; charset=utf-8').send('Not found');
    return reply.sendFile('index.html');
  });
}
