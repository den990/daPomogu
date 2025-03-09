CREATE TABLE tasks (
                       id SERIAL PRIMARY KEY,
                       organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                       title VARCHAR(255) NOT NULL,
                       type task_type NOT NULL,
                       description TEXT NOT NULL,
                       location VARCHAR(255) NOT NULL,
                       task_date TIMESTAMP NOT NULL,
                       participants_count INTEGER CHECK (participants_count > 0),
                       max_score INTEGER CHECK (max_score >= 0),
                       status task_status DEFAULT 'В работе',
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_tasks_updated_at()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tasks_updated_at_trigger
    BEFORE UPDATE ON tasks
    FOR EACH ROW
EXECUTE FUNCTION update_tasks_updated_at();
