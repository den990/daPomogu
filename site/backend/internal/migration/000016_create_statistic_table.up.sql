CREATE TABLE statistic (
                           id SERIAL PRIMARY KEY,
                           user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                           tasks_participated INTEGER NOT NULL DEFAULT 0,
                           points INTEGER NOT NULL DEFAULT 0
);
