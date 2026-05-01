import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post('/api/setup-db', async (req, res) => {
  if ((req.headers['x-api-key'] || '') !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const sql = `
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  color VARCHAR(20) DEFAULT '#E65100'
);
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS articles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT NOT NULL,
  category_id INT NULL,
  source VARCHAR(255) NULL,
  apply_link VARCHAR(500) NULL,
  last_date DATE NULL,
  status ENUM('draft','published') DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_created_at (created_at),
  CONSTRAINT fk_article_category FOREIGN KEY (category_id) REFERENCES categories(id)
);
INSERT IGNORE INTO categories(name,slug,color) VALUES
('Sarkari Naukri','sarkari-naukri','#FF6600'),('Exam','exam','#1565C0'),('Admit Card','admit-card','#6A1B9A'),('Result','result','#2E7D32'),('Yojana','yojana','#00695C'),('Update','update','#C62828');
`;
  await pool.query(sql);
  res.json({ message: 'Database setup complete' });
});

export default app;
