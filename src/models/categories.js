import db from './db.js';

export async function getAllCategories() {
    const result = await db.query('SELECT * FROM category ORDER BY category_name');
    return result.rows;
}

export async function getCategoryById(id) {
    const result = await db.query('SELECT * FROM category WHERE category_id = $1', [id]);
    return result.rows[0];
}

export async function getProjectsByCategoryId(categoryId) {
    const result = await db.query(`
        SELECT p.* 
        FROM project p
        JOIN project_category pc ON p.id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_name
    `, [categoryId]);
    return result.rows;
}

export async function getCategoriesByProjectId(projectId) {
    const result = await db.query(`
        SELECT c.category_id, c.category_name 
        FROM category c
        JOIN project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
    `, [projectId]);
    return result.rows;
}   