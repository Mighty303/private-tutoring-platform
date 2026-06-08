-- Homework assignments: admin assigns exercises to classrooms or individual students

CREATE TABLE IF NOT EXISTS homework_assignments (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  exercise_slug VARCHAR(100) NOT NULL,       -- one row per exercise per assignment
  due_date      DATE NOT NULL,
  classroom_id  INTEGER REFERENCES classrooms(id) ON DELETE CASCADE,  -- nullable = individual-only
  created_by    INTEGER REFERENCES users(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Additional per-student targeting (supplements classroom_id or used standalone)
CREATE TABLE IF NOT EXISTS homework_student_assignments (
  id            SERIAL PRIMARY KEY,
  assignment_id INTEGER NOT NULL REFERENCES homework_assignments(id) ON DELETE CASCADE,
  user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(assignment_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_hw_assignments_classroom
  ON homework_assignments(classroom_id);

CREATE INDEX IF NOT EXISTS idx_hw_student_assignments_user
  ON homework_student_assignments(user_id);
