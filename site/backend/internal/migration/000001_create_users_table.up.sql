CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(150) UNIQUE NOT NULL,
                       phone VARCHAR(18) NOT NULL,
                       surname VARCHAR(255) NULL,
                       name VARCHAR(255) NOT NULL,
                       patronymic VARCHAR(255) NULL,
                       date_of_birthday DATE NULL,
                       address VARCHAR(255) NULL,
                       password_hash TEXT NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_users_updated_at()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at_trigger
    BEFORE UPDATE ON users
    FOR EACH ROW
EXECUTE FUNCTION update_users_updated_at();
