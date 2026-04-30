import pool from '../config/db.js';

export async function addArticle(req, res) {
  const { title, content, category, source, apply_link, last_date, status = 'published' } = req.body;
  const [result] = await pool.execute(
    'INSERT INTO articles (title, content, category, source, apply_link, last_date, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
    [title, content, category, source, apply_link, last_date, status]
  );
  return res.status(201).json({ message: 'Article added', id: result.insertId });
}

export async function listArticles(req, res) {
  const [rows] = await pool.query('SELECT * FROM articles WHERE status = "published" ORDER BY created_at DESC');
  return res.json({ data: rows });
}

export async function getArticle(req, res) {
  const [rows] = await pool.execute('SELECT * FROM articles WHERE id = ?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Not found' });
  return res.json({ data: rows[0] });
}

export async function deleteArticle(req, res) {
  await pool.execute('DELETE FROM articles WHERE id = ?', [req.params.id]);
  return res.json({ message: 'Deleted' });
}
