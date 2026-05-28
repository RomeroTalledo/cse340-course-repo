import express from "express";

import { showHomePage } from "./controllers/index.js";

import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
} from "./controllers/organizations.js";

import { showProjectsPage } from "./controllers/projects.js";

import {
  showCategoriesPage,
  showCategoryDetailsPage,
} from "./controllers/categories.js";

import { testErrorPage } from "./controllers/errors.js";

const router = express.Router();

// Home
router.get("/", showHomePage);

// Organizations
router.get("/organizations", showOrganizationsPage);
router.get("/organization/:id", showOrganizationDetailsPage);

// Projects
router.get("/projects", showProjectsPage);

// Categories
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);

// Error-handling routes
router.get("/test-error", testErrorPage);

export default router;
