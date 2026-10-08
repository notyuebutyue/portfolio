import { db, init, rows, isAdmin } from '../lib/db.js';

const slugify = (t) => t.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'post';
const deny = async (res) => { await new Promise((r) => setTimeout(r, 600)); res.status(401).json({ error: 'Unauthorized' }); };

export default async function handler(req, res) {
  try {
    await init();
    const admin = isAdmin(req);
    res.setHeader('Cache-Control', 'no-store');

    if (req.method === 'GET') {
      const { id, all } = req.query;
      if (id || all) {
        if (!admin) return deny(res);
        if (id) {
          const r = rows(await db.execute({ sql: 'SELECT * FROM posts WHERE id=?', args: [id] }));
          return res.status(200).json(r[0] || null);
        }
        return res.status(200).json(rows(await db.execute('SELECT * FROM posts ORDER BY created_at DESC')));
      }
      const r = await db.execute("SELECT id,slug,kind,title,category,excerpt,url,source,created_at FROM posts WHERE status='published' ORDER BY created_at DESC");
      return res.status(200).json(rows(r));
    }

    if (!admin) return deny(res);

    if (req.method === 'POST') {
      const b = req.body || {};
      const title = String(b.title || '').trim().slice(0, 200);
      if (!title) return res.status(400).json({ error: 'Title is required' });
      const kind = b.kind === 'external' ? 'external' : 'own';
      const status = b.status === 'published' ? 'published' : 'draft';
      const category = String(b.category || '').trim().slice(0, 40);
      const url = String(b.url || '').trim().slice(0, 500);
      if (kind === 'external' && !/^https?:\/\//i.test(url)) return res.status(400).json({ error: 'A valid link (https://...) is required' });
      const body = String(b.body || '').slice(0, 60000);
      let excerpt = String(b.excerpt || '').trim().slice(0, 300);
      if (!excerpt && kind === 'own') excerpt = body.replace(/[#*_`>\[\]()-]/g, '').replace(/\s+/g, ' ').trim().slice(0, 160);
      const source = String(b.source || '').trim().slice(0, 40);
      const now = new Date().toISOString();

      if (b.id) {
        await db.execute({
          sql: 'UPDATE posts SET kind=?,title=?,category=?,excerpt=?,body=?,url=?,source=?,status=?,updated_at=? WHERE id=?',
          args: [kind, title, category, excerpt, body, url, source, status, now, b.id]
        });
        return res.status(200).json({ ok: true, id: b.id });
      }
      const base = slugify(title);
      let slug = base, n = 1;
      while ((await db.execute({ sql: 'SELECT 1 FROM posts WHERE slug=?', args: [slug] })).rows.length) slug = `${base}-${++n}`;
      const r = await db.execute({
        sql: 'INSERT INTO posts (slug,kind,title,category,excerpt,body,url,source,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        args: [slug, kind, title, category, excerpt, body, url, source, status, now, now]
      });
      return res.status(200).json({ ok: true, id: Number(r.lastInsertRowid) });
    }

    if (req.method === 'DELETE') {
      await db.execute({ sql: 'DELETE FROM posts WHERE id=?', args: [req.query.id] });
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
}
