CREATE TABLE user_organization (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    organization_id INTEGER NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
    UNIQUE (user_id, organization_id)
);

CREATE INDEX idx_user_organization_user ON user_organization(user_id);
CREATE INDEX idx_user_organization_org ON user_organization(organization_id);
