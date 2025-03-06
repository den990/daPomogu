CREATE TABLE tasks_file (
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    file_id INTEGER NOT NULL REFERENCES file(id) ON DELETE CASCADE,
    UNIQUE (task_id, file_id)
);
