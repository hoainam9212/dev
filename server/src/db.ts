import Database from 'better-sqlite3';

export type DB = Database.Database;

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS progress (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  type TEXT NOT NULL,
  ease REAL NOT NULL,
  interval REAL NOT NULL,
  due TEXT NOT NULL,
  reps INTEGER NOT NULL,
  lapses INTEGER NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (user_id, item_id)
);
CREATE INDEX IF NOT EXISTS progress_user_updated ON progress(user_id, updated_at);
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id TEXT,
  started_at TEXT NOT NULL,
  kind TEXT NOT NULL,
  type TEXT NOT NULL,
  correct INTEGER NOT NULL,
  total INTEGER NOT NULL,
  xp INTEGER NOT NULL,
  UNIQUE (user_id, client_id)
);
CREATE TABLE IF NOT EXISTS stats (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  xp INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  last_study_day TEXT,
  updated_at TEXT NOT NULL
);
`;

export function openDb(path = ':memory:'): DB {
  const db = new Database(path);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(SCHEMA);
  return db;
}
