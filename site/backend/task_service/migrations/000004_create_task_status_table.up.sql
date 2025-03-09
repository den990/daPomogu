DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
CREATE TYPE task_status AS ENUM ('Выполнено', 'Не выполнено', 'В работе');
END IF;
END $$;
