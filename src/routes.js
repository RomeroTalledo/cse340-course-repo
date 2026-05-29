// src/routes.js
import express from 'express';
const router = express.Router();

// Import controllers from the correct relative path
import { showOrganizations, showOrganizationDetails } from './controllers/organizationController.js';
import { showUpcomingProjects, showProjectDetails } from './controllers/projectController.js';
import { showCategoriesPage, showCategoryDetailsPage } from './controllers/categories.js';

// Organization routes
router.get('/organizations', showOrganizations);
router.get('/organization/:id', showOrganizationDetails);

// Project routes
router.get('/projects', showUpcomingProjects);
router.get('/project/:id', showProjectDetails);

// Category routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

export default router;