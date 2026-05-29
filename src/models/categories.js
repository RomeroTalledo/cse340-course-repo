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

export {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId
};