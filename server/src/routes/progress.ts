import type { FastifyInstance } from 'fastify';

export interface ProgressRow {
  itemId: string;
  type: string;
  ease: number;
  interval: number;
  due: string;
  reps: number;
  lapses: number;
  updatedAt: string;
}
interface DbProgressRow {
  item_id: string;
  type: string;
  ease: number;
  interval: number;
  due: string;
  reps: number;
  lapses: number;
  updated_at: string;
}
const toApi = (r: DbProgressRow): ProgressRow => ({
  itemId: r.item_id, type: r.type, ease: r.ease, interval: r.interval, due: r.due, reps: r.reps, lapses: r.lapses, updatedAt: r.updated_at,
});

const progressItemSchema = {
  type: 'object',
  required: ['itemId', 'type', 'ease', 'interval', 'due', 'reps', 'lapses', 'updatedAt'],
  properties: {
    itemId: { type: 'string', maxLength: 64 },
    type: { type: 'string', enum: ['vocab', 'kanji', 'grammar'] },
    ease: { type: 'number' },
    interval: { type: 'number' },
    due: { type: 'string' },
    reps: { type: 'integer' },
    lapses: { type: 'integer' },
    updatedAt: { type: 'string' },
  },
} as const;

export async function progressRoutes(app: FastifyInstance): Promise<void> {
  const auth = { preHandler: app.authenticate };

  app.get<{ Querystring: { since?: string } }>('/api/progress', auth, async (req) => {
    const since = req.query.since ?? '1970-01-01T00:00:00.000Z';
    const rows = app.db
      .prepare('SELECT * FROM progress WHERE user_id = ? AND updated_at > ? ORDER BY updated_at')
      .all(req.user.sub, since) as DbProgressRow[];
    return { items: rows.map(toApi), serverTime: new Date().toISOString() };
  });

  app.put<{ Body: { items: ProgressRow[] } }>(
    '/api/progress',
    {
      ...auth,
      schema: { body: { type: 'object', required: ['items'], properties: { items: { type: 'array', maxItems: 5000, items: progressItemSchema } } } },
    },
    async (req) => {
      const get = app.db.prepare('SELECT * FROM progress WHERE user_id = ? AND item_id = ?');
      const upsert = app.db.prepare(
        `INSERT INTO progress (user_id, item_id, type, ease, interval, due, reps, lapses, updated_at)
         VALUES (@user_id, @item_id, @type, @ease, @interval, @due, @reps, @lapses, @updated_at)
         ON CONFLICT(user_id, item_id) DO UPDATE SET
           type = excluded.type, ease = excluded.ease, interval = excluded.interval, due = excluded.due,
           reps = excluded.reps, lapses = excluded.lapses, updated_at = excluded.updated_at`,
      );
      const newer: ProgressRow[] = [];
      let accepted = 0;
      const tx = app.db.transaction((items: ProgressRow[]) => {
        for (const it of items) {
          const cur = get.get(req.user.sub, it.itemId) as DbProgressRow | undefined;
          if (cur && cur.updated_at >= it.updatedAt) {
            if (cur.updated_at > it.updatedAt) newer.push(toApi(cur));
            continue;
          }
          upsert.run({
            user_id: req.user.sub, item_id: it.itemId, type: it.type, ease: it.ease, interval: it.interval,
            due: it.due, reps: it.reps, lapses: it.lapses, updated_at: it.updatedAt,
          });
          accepted++;
        }
      });
      tx(req.body.items);
      return { accepted, newer, serverTime: new Date().toISOString() };
    },
  );

  app.post<{ Body: { sessions: { clientId?: string; startedAt: string; kind: string; type: string; correct: number; total: number; xp: number }[] } }>(
    '/api/sessions',
    {
      ...auth,
      schema: {
        body: {
          type: 'object',
          required: ['sessions'],
          properties: {
            sessions: {
              type: 'array',
              maxItems: 2000,
              items: {
                type: 'object',
                required: ['startedAt', 'kind', 'type', 'correct', 'total', 'xp'],
                properties: {
                  clientId: { type: 'string', maxLength: 64 },
                  startedAt: { type: 'string' }, kind: { type: 'string', maxLength: 32 }, type: { type: 'string', maxLength: 32 },
                  correct: { type: 'integer' }, total: { type: 'integer' }, xp: { type: 'integer' },
                },
              },
            },
          },
        },
      },
    },
    async (req) => {
      const ins = app.db.prepare(
        `INSERT OR IGNORE INTO sessions (user_id, client_id, started_at, kind, type, correct, total, xp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      );
      let inserted = 0;
      const tx = app.db.transaction(() => {
        for (const s of req.body.sessions) {
          const r = ins.run(req.user.sub, s.clientId ?? null, s.startedAt, s.kind, s.type, s.correct, s.total, s.xp);
          inserted += r.changes;
        }
      });
      tx();
      return { inserted };
    },
  );

  app.get('/api/stats', auth, async (req) => {
    const row = app.db.prepare('SELECT xp, streak, last_study_day, updated_at FROM stats WHERE user_id = ?').get(req.user.sub) as
      | { xp: number; streak: number; last_study_day: string | null; updated_at: string }
      | undefined;
    const counts = app.db.prepare('SELECT type, COUNT(*) AS n FROM progress WHERE user_id = ? GROUP BY type').all(req.user.sub) as { type: string; n: number }[];
    return {
      xp: row?.xp ?? 0,
      streak: row?.streak ?? 0,
      lastStudyDay: row?.last_study_day ?? null,
      updatedAt: row?.updated_at ?? null,
      progressCounts: Object.fromEntries(counts.map((c) => [c.type, c.n])),
    };
  });

  app.put<{ Body: { xp: number; streak: number; lastStudyDay: string | null } }>(
    '/api/stats',
    {
      ...auth,
      schema: {
        body: {
          type: 'object',
          required: ['xp', 'streak'],
          properties: { xp: { type: 'integer', minimum: 0 }, streak: { type: 'integer', minimum: 0 }, lastStudyDay: { type: ['string', 'null'] } },
        },
      },
    },
    async (req) => {
      const cur = app.db.prepare('SELECT xp, streak, last_study_day FROM stats WHERE user_id = ?').get(req.user.sub) as
        | { xp: number; streak: number; last_study_day: string | null }
        | undefined;
      // keep the maximum: XP only grows; streak/last day follow the most recent study day
      const xp = Math.max(cur?.xp ?? 0, req.body.xp);
      const newerDay = !cur?.last_study_day || (req.body.lastStudyDay ?? '') >= cur.last_study_day;
      const streak = newerDay ? req.body.streak : cur.streak;
      const lastStudyDay = newerDay ? req.body.lastStudyDay : cur.last_study_day;
      app.db
        .prepare(
          `INSERT INTO stats (user_id, xp, streak, last_study_day, updated_at) VALUES (?, ?, ?, ?, ?)
           ON CONFLICT(user_id) DO UPDATE SET xp = excluded.xp, streak = excluded.streak, last_study_day = excluded.last_study_day, updated_at = excluded.updated_at`,
        )
        .run(req.user.sub, xp, streak, lastStudyDay, new Date().toISOString());
      return { xp, streak, lastStudyDay };
    },
  );
}
