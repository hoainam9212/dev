import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import rateLimit from '@fastify/rate-limit';
import type { DB } from './db.js';
import { authRoutes } from './routes/auth.js';
import { progressRoutes } from './routes/progress.js';

declare module 'fastify' {
  interface FastifyInstance {
    db: DB;
    authenticate: (req: import('fastify').FastifyRequest, reply: import('fastify').FastifyReply) => Promise<void>;
  }
}
declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: number; email: string };
    user: { sub: number; email: string };
  }
}

export interface AppOptions {
  db: DB;
  jwtSecret: string;
  logger?: boolean;
}

export async function buildApp({ db, jwtSecret, logger = false }: AppOptions): Promise<FastifyInstance> {
  const app = Fastify({ logger });
  app.decorate('db', db);
  await app.register(cors, { origin: true });
  await app.register(jwt, { secret: jwtSecret, sign: { expiresIn: '30d' } });
  await app.register(rateLimit, { global: false });
  app.decorate('authenticate', async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch {
      await reply.code(401).send({ error: 'Chưa đăng nhập hoặc phiên đã hết hạn.' });
    }
  });

  app.setErrorHandler((err, _req, reply) => {
    const e = err as { validation?: unknown; statusCode?: number; message: string };
    if (e.validation) return reply.code(400).send({ error: 'Dữ liệu không hợp lệ.', details: e.message });
    const code = e.statusCode ?? 500;
    if (code >= 500) app.log.error(err);
    return reply.code(code).send({ error: code >= 500 ? 'Lỗi máy chủ.' : e.message });
  });

  app.get('/api/health', async () => ({ ok: true }));
  await app.register(authRoutes);
  await app.register(progressRoutes);
  return app;
}
