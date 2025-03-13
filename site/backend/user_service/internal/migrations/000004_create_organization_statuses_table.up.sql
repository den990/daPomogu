CREATE TABLE "organization_statuses" (
         "id" SERIAL PRIMARY KEY,
         "name" VARCHAR(20) UNIQUE NOT NULL
);

INSERT INTO "organization_statuses" ("name") VALUES
    ('На рассмотрении'),
    ('Принято'),
    ('Отказано');
