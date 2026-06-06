import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            project_id,
            organization_id,
            project_name,
            description,
            location,
            start_date
        FROM project;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            project_name,
            description,
            location,
            start_date
        FROM project
        WHERE organization_id = $1
        ORDER BY start_date;
    `;

    const queryParams = [organizationId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {

    const query = `
        SELECT
            p.project_id,
            p.project_name,
            p.description,
            p.start_date,
            p.location,
            o.organization_id,
            o.name AS organization_name
        FROM project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.start_date >= CURRENT_DATE
        ORDER BY p.start_date ASC
        LIMIT $1;
    `;

    const queryParams = [numberOfProjects];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (projectId) => {

    const query = `
        SELECT
            p.project_id,
            p.project_name,
            p.description,
            p.start_date,
            p.location,
            o.organization_id,
            o.name AS organization_name
        FROM project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {

    const query = `
        SELECT
            c.category_id,
            c.category_name
        FROM category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;

    const queryParams = [projectId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO project (project_name, description, location, start_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const query_params = [title, description, location, date, organizationId];
    const result = await db.query(query, query_params);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};

const updateProject = async (projectId, title, description, location, date, organizationId) => {
    const query = `
        UPDATE project
        SET project_name = $1,
            description = $2,
            location = $3,
            start_date = $4,
            organization_id = $5
        WHERE project_id = $6
        RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId, projectId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].project_id;
};

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    getCategoriesByProjectId,
    createProject,
    updateProject
};