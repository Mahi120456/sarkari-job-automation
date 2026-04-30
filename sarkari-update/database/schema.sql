CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) UNIQUE NOT NULL,
  color VARCHAR(20) DEFAULT '#102542'
);

CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  source VARCHAR(255),
  apply_link VARCHAR(500),
  last_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('draft', 'published') DEFAULT 'published'
);

CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

INSERT INTO categories (name, slug, color) VALUES
('Sarkari Naukri', 'sarkari-naukri', '#c86b00'),
('Exam', 'exam', '#102542'),
('Admit Card', 'admit-card', '#1f4f82'),
('Result', 'result', '#b13f00'),
('Yojana', 'yojana', '#2d6a4f'),
('Update', 'update', '#6c757d');
