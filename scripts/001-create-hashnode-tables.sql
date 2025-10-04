-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(255) PRIMARY KEY,
  title TEXT NOT NULL,
  brief TEXT,
  slug VARCHAR(255) NOT NULL,
  published_at TIMESTAMP NOT NULL,
  read_time_minutes INTEGER,
  cover_image_url TEXT,
  url TEXT NOT NULL,
  series_name VARCHAR(255),
  series_slug VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create article_tags table for many-to-many relationship
CREATE TABLE IF NOT EXISTS article_tags (
  id SERIAL PRIMARY KEY,
  article_id VARCHAR(255) REFERENCES articles(id) ON DELETE CASCADE,
  tag_name VARCHAR(255) NOT NULL,
  tag_slug VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create series table
CREATE TABLE IF NOT EXISTS series (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  total_posts INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_series_slug ON articles(series_slug);
CREATE INDEX IF NOT EXISTS idx_article_tags_article_id ON article_tags(article_id);
CREATE INDEX IF NOT EXISTS idx_article_tags_tag_name ON article_tags(tag_name);
CREATE INDEX IF NOT EXISTS idx_series_slug ON series(slug);
