const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.category_name 
        FROM category c
        JOIN project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};