CREATE TABLE tasks_users (
                             id SERIAL PRIMARY KEY,
                             task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                             user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                             UNIQUE (task_id, user_id)
);
