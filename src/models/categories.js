import db from './db.js';

const getAllCategories = async () => {

    const query = `
        SELECT
            category_id,
            category_name,
            description
        FROM category;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryDetails = async (categoryId) => {

    const query = `
        SELECT
            category_id,
            category_name,
            description
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];

    const result =
        await db.query(query, queryParams);

    return result.rows[0];
};

const getProjectsByCategoryId = async (categoryId) => {

    const query = `
        SELECT
            project.project_id,
            project.project_name
        FROM project
        JOIN project_category
            ON project.project_id = project_category.project_id
        WHERE project_category.category_id = $1;
    `;

    const queryParams = [categoryId];

    const result =
        await db.query(query, queryParams);

    return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

const createCategory = async (categoryName, description) => {
    const query = `
        INSERT INTO category (category_name, description)
        VALUES ($1, $2)
        RETURNING category_id;
    `;

    const result = await db.query(query, [categoryName, description]);

    if (result.rows.length === 0) {
        throw new Error('Failed to create category');
    }

    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, categoryName) => {
    const query = `
        UPDATE category
        SET category_name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const result = await db.query(query, [categoryName, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    return result.rows[0].category_id;
};

export {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
};