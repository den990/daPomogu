CREATE TABLE "user_organization" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "is_owner" BOOLEAN DEFAULT false,
    "is_coordinator" BOOLEAN DEFAULT false,
    "is_accepted" BOOLEAN DEFAULT false
);