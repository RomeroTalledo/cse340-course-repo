import db from './db.js';

// Get all organizations
export async function getAllOrganizations() {
    const result = await db.query('SELECT * FROM organization ORDER BY name');
    return result.rows;
}

// Get organization by ID
export async function getOrganizationById(id) {
    const result = await db.query('SELECT * FROM organization WHERE id = $1', [id]);
    return result.rows[0];
}

// Get all projects of an organization
export async function getProjectsByOrganizationId(orgId) {
    const result = await db.query(`
        SELECT * FROM project 
        WHERE organization_id = $1 
        ORDER BY project_date
    `, [orgId]);
    return result.rows;
}