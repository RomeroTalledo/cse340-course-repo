import db from './db.js';

// Get upcoming 5 projects (date >= today)
export async function getUpcomingProjects() {
    const result = await db.query(`
        SELECT p.*, o.name as organization_name 
        FROM project p
        JOIN organization o ON p.organization_id = o.id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT 5
    `);
    return result.rows;
}

// Get project details including organization name
export async function getProjectById(projectId) {
    const result = await db.query(`
        SELECT p.*, o.name as organization_name 
        FROM project p
        JOIN organization o ON p.organization_id = o.id
        WHERE p.id = $1
    `, [projectId]);
    return result.rows[0];
}