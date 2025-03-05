DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
CREATE TYPE task_status AS ENUM ('Выполнено', 'Не выполнено', 'В работе');
END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_type') THEN
CREATE TYPE task_type AS ENUM ('Закрытый', 'Открытый');
END IF;
END $$;

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

DO $$
BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
CREATE TYPE user_role AS ENUM ('user', 'organization', 'coordinator');
END IF;
END $$;

CREATE TABLE tasks_users (
                             id SERIAL PRIMARY KEY,
                             task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                             user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                             UNIQUE (task_id, user_id)
);

CREATE TABLE tasks_organizations (
                             id SERIAL PRIMARY KEY,
                             task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                             organization_id INTEGER NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
                             UNIQUE (task_id, organization_id)
);

CREATE TABLE categories (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(100) UNIQUE NOT NULL,
);

CREATE TABLE task_category (
                               id SERIAL PRIMARY KEY,
                               task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                               category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
                               PRIMARY KEY (task_id, category_id)
);

CREATE TABLE responses (
                           id SERIAL PRIMARY KEY,
                           task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                           user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                           status VARCHAR(50) DEFAULT 'Откликнулся',
                           UNIQUE (task_id, user_id)
);

CREATE TABLE photos (
                        id SERIAL PRIMARY KEY,
                        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                        photo_url TEXT NOT NULL,
                        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks_photos (
                              id SERIAL PRIMARY KEY,
                              task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                              photo_id INTEGER NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
                              UNIQUE (task_id, photo_id)
);

CREATE TABLE comments (
                          id SERIAL PRIMARY KEY,
                          task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                          comment TEXT NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

CREATE TABLE statistic (
                           id SERIAL PRIMARY KEY,
                           user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                           tasks_participated INTEGER NOT NULL DEFAULT 0,
                           points INTEGER NOT NULL DEFAULT 0,
);

CREATE TABLE logs (
                         id SERIAL PRIMARY KEY,
                         user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                         object_id INTEGER NOT NULL,
                         object_type VARCHAR(256) NOT NULL,
                         action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'CREATE')),
                         created_at TIMESTAMP DEFAULT NOW(),
);

CREATE TABLE notifications (
                               id SERIAL PRIMARY KEY,
                               user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                               message TEXT NOT NULL,
                               is_read BOOLEAN DEFAULT FALSE,
                               created_at TIMESTAMP DEFAULT NOW(),
);

CREATE TABLE chats (
                               id SERIAL PRIMARY KEY,
                               name STRING NOT NULL,
                               type VARCHAR(256) NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE', 'CREATE')),
                               updated_at TIMESTAMP DEFAULT NOW(),
                               created_at TIMESTAMP DEFAULT NOW(),
);

CREATE TABLE messages (
                  id SERIAL PRIMARY KEY,
                  chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
                  sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                  message TEXT NOT NULL,
                  is_read BOOLEAN DEFAULT FALSE,
                  created_at TIMESTAMP DEFAULT NOW(),
);

CREATE TABLE deleted_messages (
                          id SERIAL PRIMARY KEY,
                          message_id INTEGER NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
                          deleted_at TIMESTAMP DEFAULT NOW(),
);
