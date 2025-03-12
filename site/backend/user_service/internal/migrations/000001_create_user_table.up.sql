CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(150) UNIQUE NOT NULL,
    "phone" VARCHAR(18) NOT NULL,
    "surname" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "patronymic" VARCHAR(255),
    "date_of_birthday" DATE,
    "address" VARCHAR(255),
    "password_hash" TEXT NOT NULL,
    "is_admin" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

INSERT INTO "user" ("email", "phone", "surname", "name", "patronymic", "date_of_birthday", "address", "password_hash", "is_admin", "created_at", "updated_at")
VALUES ('admin@example.com', '+1234567890', 'Admin', 'Admin', 'Admin', NULL, NULL, '$2b$12$KDptV22sIJx4TFP3/wmj3OR6tEP0VE3jYKhQW2FvUuyS99Mo4U/fm', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
