CREATE TABLE logs (
                      id SERIAL PRIMARY KEY,
                      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                      object_id INTEGER NOT NULL,
                      object_type VARCHAR(256) NOT NULL,
                      action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'CREATE')),
                      created_at TIMESTAMP DEFAULT NOW()
);