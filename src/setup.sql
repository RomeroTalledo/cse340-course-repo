/* =========================================
   ORGANIZATION TABLE
========================================= */

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


/* =========================================
   CATEGORY TABLE
========================================= */

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);


/* =========================================
   PROJECT TABLE
========================================= */

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    project_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);


/* =========================================
   PROJECT CATEGORY TABLE (MANY TO MANY)
========================================= */

CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_pc_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id),

    CONSTRAINT fk_pc_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);


/* =========================================
   VOLUNTEER TABLE
========================================= */

CREATE TABLE volunteer (
    volunteer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(25)
);


/* =========================================
   VOLUNTEER ASSIGNMENT TABLE
========================================= */

CREATE TABLE volunteer_assignment (
    assignment_id SERIAL PRIMARY KEY,
    volunteer_id INT NOT NULL,
    project_id INT NOT NULL,
    assignment_date DATE NOT NULL,

    CONSTRAINT fk_assignment_volunteer
        FOREIGN KEY (volunteer_id)
        REFERENCES volunteer(volunteer_id),

    CONSTRAINT fk_assignment_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id)
);

/* =========================================
   USER VOLUNTEER TABLE (MANY TO MANY)
========================================= */

CREATE TABLE user_volunteer (
    user_volunteer_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_uv_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    CONSTRAINT fk_uv_project
        FOREIGN KEY (project_id)
        REFERENCES project(project_id),

    CONSTRAINT uq_user_project
        UNIQUE (user_id, project_id)
);


/* =========================================
   ROLES TABLE
========================================= */
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);


/* =========================================
   USERS TABLE
========================================= */
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================================
   INSERT DATA: USERS AND ROLES
========================================= */
INSERT INTO users (name, email, password_hash, role_id)
VALUES ('testuser', 'test@example.com', 'placeholder_hash', 1);

INSERT INTO roles (role_name, role_description) VALUES
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

/* =========================================
   DELETE DATA: USERS
========================================= */
DELETE FROM users WHERE email = 'test@example.com';


/* =========================================
   INSERT DATA: ORGANIZATIONS
========================================= */

INSERT INTO organization (
    name,
    description,
    contact_email,
    logo_filename
)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'Urban farming and sustainability projects.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'Volunteer coordination organization.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);


/* =========================================
   INSERT DATA: CATEGORIES
========================================= */

INSERT INTO category (
    category_name,
    description
)
VALUES
(
    'Construction',
    'Building and infrastructure projects.'
),
(
    'Agriculture',
    'Urban farming and sustainability.'
),
(
    'Community Service',
    'Volunteer and charity initiatives.'
);


/* =========================================
   INSERT DATA: PROJECTS
========================================= */

INSERT INTO project (
    organization_id,
    project_name,
    description,
    location,
    start_date
)
VALUES
(
    1,
    'Community Housing Project',
    'Building affordable housing.',
    'Boise, Idaho',
    '2026-06-01'
),
(
    2,
    'Urban Garden Initiative',
    'Creating sustainable gardens.',
    'Rexburg, Idaho',
    '2026-06-10'
),
(
    3,
    'Neighborhood Food Drive',
    'Food donations for families.',
    'Idaho Falls, Idaho',
    '2026-06-15'
),
(
    1,
    'School Renovation',
    'Renovating local schools.',
    'Boise, Idaho',
    '2026-06-20'
),
(
    1,
    'Bridge Repair Project',
    'Repairing damaged bridges.',
    'Boise, Idaho',
    '2026-06-25'
),
(
    1,
    'Community Playground',
    'Building a playground.',
    'Boise, Idaho',
    '2026-07-01'
),
(
    1,
    'Senior Housing Support',
    'Housing support for seniors.',
    'Boise, Idaho',
    '2026-07-05'
),
(
    2,
    'City Farm Expansion',
    'Expanding urban farms.',
    'Rexburg, Idaho',
    '2026-07-10'
),
(
    2,
    'Greenhouse Program',
    'Building greenhouses.',
    'Rexburg, Idaho',
    '2026-07-15'
),
(
    2,
    'Tree Planting Campaign',
    'Planting trees in parks.',
    'Rexburg, Idaho',
    '2026-07-20'
),
(
    2,
    'Community Composting',
    'Teaching composting.',
    'Rexburg, Idaho',
    '2026-07-25'
),
(
    3,
    'Winter Clothing Drive',
    'Collecting winter clothes.',
    'Idaho Falls, Idaho',
    '2026-08-01'
),
(
    3,
    'Community Health Fair',
    'Providing free health services.',
    'Idaho Falls, Idaho',
    '2026-08-20'
),
(
    2,
    'Farm Education Workshop',
    'Teaching sustainable farming.',
    'Rexburg, Idaho',
    '2026-08-25'
),
(
    1,
    'Public Park Renovation',
    'Improving local public parks.',
    'Boise, Idaho',
    '2026-08-30'
);


/* =========================================
   INSERT DATA: PROJECT CATEGORY RELATIONSHIPS
========================================= */

INSERT INTO project_category (
    project_id,
    category_id
)
VALUES
(1,1),
(1,3),
(2,2),
(3,3),
(4,1),
(5,1),
(6,3),
(7,3),
(8,2),
(9,2),
(10,2),
(11,3),
(12,3),
(13,3),
(14,2),
(15,1);


/* =========================================
   INSERT DATA: VOLUNTEERS
========================================= */

INSERT INTO volunteer (
    first_name,
    last_name,
    email,
    phone
)
VALUES
(
    'John',
    'Doe',
    'john.doe@email.com',
    '555-111-2222'
),
(
    'Jane',
    'Smith',
    'jane.smith@email.com',
    '555-333-4444'
),
(
    'Michael',
    'Brown',
    'michael.brown@email.com',
    '555-555-6666'
);


/* =========================================
   INSERT DATA: VOLUNTEER ASSIGNMENTS
========================================= */

INSERT INTO volunteer_assignment (
    volunteer_id,
    project_id,
    assignment_date
)
VALUES
(
    1,
    1,
    '2026-05-20'
),
(
    2,
    2,
    '2026-05-21'
),
(
    3,
    3,
    '2026-05-22'
);


/* =========================================
   VERIFY DATA
========================================= */

SELECT * FROM organization;
SELECT * FROM category;
SELECT * FROM project;
SELECT * FROM project_category;
SELECT * FROM volunteer;
SELECT * FROM volunteer_assignment;
SELECT * FROM user_volunteer;