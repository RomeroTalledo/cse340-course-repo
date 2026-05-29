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

    const result =
        await db.query(query, queryParams);

    return result.rows;
};

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    getCategoriesByProjectId
};