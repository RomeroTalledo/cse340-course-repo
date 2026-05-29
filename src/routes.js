// src/views/routes.js
import express from 'express';
const router = express.Router();

// Import controllers (adjust path if needed)
import { showOrganizations, showOrganizationDetails } from '../controllers/organizationController.js';
import { showUpcomingProjects, showProjectDetails } from '../controllers/projectController.js';
import { showCategories, showCategoryDetails } from '../controllers/categoryController.js';

// Organization routes
router.get('/organizations', showOrganizations);
router.get('/organization/:id', showOrganizationDetails);

// Project routes
router.get('/projects', showUpcomingProjects);
router.get('/project/:id', showProjectDetails);

// Category routes
router.get('/categories', showCategories);
router.get('/category/:id', showCategoryDetails);

export default router;