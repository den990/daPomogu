CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO "category" ("name") VALUES
    ('Помощь животным'),
    ('Помощь пожилым людям'),
    ('Уборка'),
    ('Помощь с организацией мероприятия')
ON CONFLICT ("name") DO NOTHING;