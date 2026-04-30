-- SarkariUpdate.in MySQL Schema
CREATE DATABASE IF NOT EXISTS sarkari_update CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sarkari_update;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL,
  color VARCHAR(20) DEFAULT '#0D47A1',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(280) UNIQUE,
  content LONGTEXT NOT NULL,
  excerpt TEXT,
  thumbnail VARCHAR(500),
  category_id INT,
  source VARCHAR(255),
  apply_link VARCHAR(500),
  last_date DATE,
  views INT DEFAULT 0,
  read_time_minutes INT DEFAULT 3,
  language ENUM('hi','en','both') DEFAULT 'both',
  status ENUM('draft','published','archived') DEFAULT 'published',
  published_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_articles_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('super_admin','editor') DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saved_articles (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  article_id BIGINT NOT NULL,
  device_id VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_saved (article_id, device_id),
  CONSTRAINT fk_saved_article FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS scraper_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  source_name VARCHAR(80) NOT NULL,
  source_url VARCHAR(500) NOT NULL,
  external_hash CHAR(64) NOT NULL,
  article_id BIGINT,
  status ENUM('new','duplicate','failed') NOT NULL,
  message VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_external_hash (external_hash),
  CONSTRAINT fk_scraper_article FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE SET NULL
);

INSERT INTO categories (name, slug, color) VALUES
('Sarkari Naukri', 'sarkari-naukri', '#FF6600'),
('Exam', 'exam', '#1565C0'),
('Admit Card', 'admit-card', '#6A1B9A'),
('Result', 'result', '#2E7D32'),
('Yojana', 'yojana', '#00695C'),
('Update', 'update', '#C62828')
ON DUPLICATE KEY UPDATE name=VALUES(name), color=VALUES(color);
