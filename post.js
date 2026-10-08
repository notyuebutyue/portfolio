import { db, init, rows, esc } from '../lib/db.js';

const SITE = 'https://yurida-zani.vercel.app';

const inline = (s) => s
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\*([^*]+)\*/g, '<em>$1</em>')
  .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g, '<a href="$2" rel="noopener nofollow">$1</a>');

function md(src) {
  const out = []; let list = null, para = [];
  const flush = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
  const close = () => { if (list) { out.push('</' + list + '>'); list = null; } };
  for (const ln of esc(src).split(/\r?\n/)) {
    let m;
    if (!ln.trim()) { flush(); close(); }
    else if ((m = ln.match(/^(#{1,3})\s+(.*)/))) { flush(); close(); const n = m[1].length + 1; out.push(`<h${n}>${inline(m[2])}</h${n}>`); }
    else if ((m = ln.match(/^[-*]\s+(.*)/))) { flush(); if (list !== 'ul') { close(); out.push('<ul>'); list = 'ul'; } out.push('<li>' + inline(m[1]) + '</li>'); }
    else if ((m = ln.match(/^\d+\.\s+(.*)/))) { flush(); if (list !== 'ol') { close(); out.push('<ol>'); list = 'ol'; } out.push('<li>' + inline(m[1]) + '</li>'); }
    else { close(); para.push(ln.trim()); }
  }
  flush(); close();
  return out.join('\n');
}

const NAV = `<div class="wrap"><div class="bar"><a href="/">Yurida Zani</a><nav aria-label="Main navigation"><a href="/#cases">Case studies</a><a href="/#skills">Skills</a><a href="/#experience">Experience</a><a href="/#projects">Web projects</a><a href="/writing.html">Writing</a><a href="/#contact">Contact</a></nav></div></div>`;
const FOOT = `<section class="contact" id="contact"><div class="wrap"><h2>Say hi.</h2><div class="row"><a class="mail" href="mailto:yuridazani.personal@gmail.com">yuridazani.personal@gmail.com</a></div><footer class="foot"><div><h3>Socials</h3><ul><li><a href="https://wa.me/6282338351245">WhatsApp</a></li><li><a href="https://linkedin.com/in/yurida-zani-b35321211/">LinkedIn</a></li><li><a href="https://github.com/yuridazani">GitHub</a></li><li><a href="https://medium.com/@yuridzn">Medium</a></li><li><a href="https://instagram.com/saturdayyuri">Instagram</a></li></ul></div><div><h3>Based in</h3><p>Pandaan, East Java, Indonesia</p></div><div><p>&copy; 2026 Yurida Zani. All Rights Reserved.</p></div></footer></div></section>`;

const page = (title, desc, canonical, main, extra = '') => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta name="theme-color" content="#FBD271">
${canonical ? `<link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}">` : '<meta name="robots" content="noindex">'}
<meta property="og:type" content="article"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta name="twitter:card" content="summary">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23FBD271'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
<style>.post-body{grid-column:1/-1;max-width:42em}.post-body h2,.post-body h3,.post-body h4{font-weight:800;font-variation-settings:"wdth" 85;line-height:1.1;margin:1.6em 0 .5em}.post-body h2{font-size:1.8rem}.post-body h3{font-size:1.4rem}.post-body p,.post-body ul,.post-body ol{margin-top:1em}.post-body ul,.post-body ol{margin-left:1.2em}.post-body a{font-weight:700}.post-body code{background:var(--honey);padding:1px 5px}</style>${extra}</head>
<body>${NAV}${main}${FOOT}</body></html>`;

export default async function handler(req, res) {
  try {
    await init();
    const slug = String(req.query.slug || '');
    const r = rows(await db.execute({ sql: "SELECT * FROM posts WHERE slug=? AND status='published' AND kind='own'", args: [slug] }));
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (!r.length) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(404).send(page('Not found | Yurida Zani', 'Post not found.', '', '<section class="lost"><div class="wrap"><h1 class="d-title">Not found</h1><p class="d-sum">This post does not exist (yet).</p><a class="back" href="/writing.html">All writing</a></div></section>'));
    }
    const p = r[0];
    const date = new Date(p.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const canonical = `${SITE}/writing/${encodeURIComponent(p.slug)}`;
    const ld = `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: p.title, datePublished: p.created_at, dateModified: p.updated_at, author: { '@type': 'Person', name: 'Yurida Zani' }, mainEntityOfPage: canonical }).replace(/</g, '\\u003c')}</script>`;
    const main = `<header class="hero"><div class="wrap"><a class="back" href="/writing.html">All writing</a><h1 class="d-title">${esc(p.title)}</h1><dl class="meta">${p.category ? `<div><dt>Category</dt><dd>${esc(p.category)}</dd></div>` : ''}<div><dt>Date</dt><dd>${date}</dd></div></dl></div></header><section class="d-sec"><div class="wrap grid"><div class="post-body">${md(p.body)}</div></div></section>`;
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).send(page(`${p.title} | Yurida Zani`, p.excerpt || p.title, canonical, main, ld));
  } catch (e) {
    console.error(e);
    res.status(500).send('Server error');
  }
}
