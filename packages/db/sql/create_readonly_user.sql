-- CREATE a group
CREATE ROLE read_only_access;

-- GRANT access to future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO read_only_access;

-- Create a final user with password