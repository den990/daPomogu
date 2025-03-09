CREATE TABLE organization_statuses (
                                       id SERIAL PRIMARY KEY,
                                       name VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO organization_statuses (name) VALUES ('Ожидание'), ('Принято'), ('Отказано');

CREATE TABLE organizations (
        id SERIAL PRIMARY KEY,
        email VARCHAR(150) UNIQUE NOT NULL,
        phone VARCHAR(18) NOT NULL,
        name VARCHAR(255) NOT NULL,
        inn VARCHAR(12) UNIQUE NOT NULL,
        legal_address VARCHAR(255) NOT NULL,
        actual_address VARCHAR(255) NOT NULL,
        status_id INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_status FOREIGN KEY (status_id) REFERENCES organization_statuses(id) ON DELETE RESTRICT
);

ALTER TABLE organizations
    ALTER COLUMN status_id SET DEFAULT 1;

CREATE OR REPLACE FUNCTION update_organizations_updated_at()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at_trigger
    BEFORE UPDATE ON organizations
    FOR EACH ROW
EXECUTE FUNCTION update_organizations_updated_at();