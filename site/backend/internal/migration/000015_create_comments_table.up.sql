CREATE TABLE comments (
                          id SERIAL PRIMARY KEY,
                          task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                          comment TEXT NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
