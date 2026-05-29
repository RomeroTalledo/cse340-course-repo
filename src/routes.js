import express from 'express';
const router = express.Router();

// CORRECTED import paths (use './controllers/')
import { showOrganizations, showOrganizationDetails } from './controllers/organizationController.js';
import { showUpcomingProjects, showProjectDetails } from './controllers/projectController.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';

router.get('/organizations', showOrganizations);
router.get('/organization/:id', showOrganizationDetails);

router.get('/projects', showUpcomingProjects);
router.get('/project/:id', showProjectDetails);

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

export default router;