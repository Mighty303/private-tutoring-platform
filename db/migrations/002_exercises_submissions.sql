-- Python Playground: exercises & submissions tables
-- Run this against your Neon database

CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  starter_code TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  exercise_slug VARCHAR(100) NOT NULL,
  code TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_submissions_user_exercise 
  ON submissions(user_id, exercise_slug);

CREATE INDEX IF NOT EXISTS idx_submissions_created 
  ON submissions(created_at DESC);
