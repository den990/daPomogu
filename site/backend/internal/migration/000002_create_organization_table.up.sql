CREATE TABLE organizations (
                               id SERIAL PRIMARY KEY,
                               email VARCHAR(150) UNIQUE NOT NULL,
                               phone VARCHAR(18) NOT NULL,
                               name VARCHAR(255) NOT NULL,
                               inn VARCHAR(12) UNIQUE NOT NULL,
                               legal_address VARCHAR(255) NOT NULL,
                               actual_address VARCHAR(255) NOT NULL,
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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