import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export async function login(req, res) {
  const { username, password } = req.body;
  const [rows] = await pool.execute('SELECT * FROM admin_users WHERE username = ?', [username]);
  if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, rows[0].password_hash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: rows[0].id, username }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return res.json({ token });
}

export async function dashboard(req, res) {
  const [[total]] = await pool.query('SELECT COUNT(*) AS count FROM articles');
  const [[today]] = await pool.query('SELECT COUNT(*) AS count FROM articles WHERE DATE(created_at) = CURDATE()');
  return res.json({ total_articles: total.count, today_posts: today.count });
}
