CREATE TABLE responses (
                           id SERIAL PRIMARY KEY,
                           task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                           user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                           status VARCHAR(50) DEFAULT 'Откликнулся',
                           UNIQUE (task_id, user_id)
);
