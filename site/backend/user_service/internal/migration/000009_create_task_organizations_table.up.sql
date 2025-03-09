CREATE TABLE tasks_organizations (
                                     id SERIAL PRIMARY KEY,
                                     task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                                     organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                                     UNIQUE (task_id, organization_id)
);
