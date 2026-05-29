import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

export const showCategoriesPage = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.render('categories', { title: 'All Categories', categories });
    } catch (error) {
        console.error(error);
        res.status(500).render('500');
    }
};

export const showCategoryDetailsPage = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await getCategoryById(categoryId);
        if (!category) return res.status(404).render('404');
        const projects = await getProjectsByCategoryId(categoryId);
        res.render('category', { title: category.category_name, category, projects });
    } catch (error) {
        console.error(error);
        res.status(500).render('500');
    }
};