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
    "is_blocked" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    "updated_at" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

INSERT INTO "user" ("email", "phone", "surname", "name", "patronymic", "date_of_birthday", "address", "password_hash", "is_admin", "created_at", "updated_at")
VALUES ('admin@example.com', '+1234567890', 'Admin', 'Admin', 'Admin', NULL, NULL, '$2a$10$G525BjR1Af0GV0yve/1jOu8LTZvCEQS/5p1K48Bv7MpUdBPdqLXl2', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
