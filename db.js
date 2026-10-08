import { createClient } from '@libsql/client';
import { createHash, timingSafeEqual } from 'node:crypto';

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

let ready;
export function init() {
  if (!ready) {
    ready = db.execute(`CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      kind TEXT NOT NULL DEFAULT 'own',
      title TEXT NOT NULL,
      category TEXT DEFAULT '',
      excerpt TEXT DEFAULT '',
      body TEXT DEFAULT '',
      url TEXT DEFAULT '',
      source TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`).catch((e) => { ready = undefined; throw e; });
  }
  return ready;
}

export const rows = (r) => r.rows.map((row) => Object.fromEntries(r.columns.map((c, i) => [c, row[i]])));

const hash = (s) => createHash('sha256').update(String(s)).digest();
export function isAdmin(req) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  return timingSafeEqual(hash(req.headers['x-admin-password'] || ''), hash(pw));
}

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
