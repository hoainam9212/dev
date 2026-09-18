import type { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';

interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  display_name: string;
  created_at: string;
}

const credentialsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email', maxLength: 200 },
    password: { type: 'string', minLength: 8, maxLength: 200 },
    displayName: { type: 'string', minLength: 1, maxLength: 60 },
  },
  additionalProperties: false,
} as const;

const publicUser = (u: UserRow) => ({ id: u.id, email: u.email, displayName: u.display_name, createdAt: u.created_at });

export async function authRoutes(app: FastifyInstance): Promise<void> {
  const limit = { config: { rateLimit: { max: 20, timeWindow: '1 minute' } } };

  app.post<{ Body: { email: string; password: string; displayName?: string } }>(
    '/api/auth/register',
    { schema: { body: credentialsSchema }, ...limit },
    async (req, reply) => {
      const email = req.body.email.trim().toLowerCase();
      const exists = app.db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      if (exists) return reply.code(409).send({ error: 'Email này đã được đăng ký.' });
      const hash = await bcrypt.hash(req.body.password, 10);
      const now = new Date().toISOString();
      const displayName = req.body.displayName?.trim() || email.split('@')[0]!;
      const info = app.db
        .prepare('INSERT INTO users (email, password_hash, display_name, created_at) VALUES (?, ?, ?, ?)')
        .run(email, hash, displayName, now);
      app.db.prepare('INSERT INTO stats (user_id, xp, streak, last_study_day, updated_at) VALUES (?, 0, 0, NULL, ?)').run(info.lastInsertRowid, now);
      const user = app.db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid) as UserRow;
      const token = app.jwt.sign({ sub: user.id, email: user.email });
      return reply.code(201).send({ token, user: publicUser(user) });
    },
  );

  app.post<{ Body: { email: string; password: string } }>('/api/auth/login', { schema: { body: credentialsSchema }, ...limit }, async (req, reply) => {
    const email = req.body.email.trim().toLowerCase();
    const user = app.db.prepare('SELECT * FROM users WHERE email = ?').get(email) as UserRow | undefined;
    if (!user || !(await bcrypt.compare(req.body.password, user.password_hash))) {
      return reply.code(401).send({ error: 'Email hoặc mật khẩu không đúng.' });
    }
    const token = app.jwt.sign({ sub: user.id, email: user.email });
    return { token, user: publicUser(user) };
  });

  app.get('/api/me', { preHandler: app.authenticate }, async (req) => {
    const user = app.db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.sub) as UserRow;
    return { user: publicUser(user) };
  });
}
