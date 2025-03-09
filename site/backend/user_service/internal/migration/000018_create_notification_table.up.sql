CREATE TABLE notifications (
                               id SERIAL PRIMARY KEY,
                               user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                               message TEXT NOT NULL,
                               is_read BOOLEAN DEFAULT FALSE,
                               created_at TIMESTAMP DEFAULT NOW()
);

