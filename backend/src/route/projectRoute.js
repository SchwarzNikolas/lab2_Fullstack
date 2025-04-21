import express from "express";
import ProjectController from "../controller/ProjectController.js";

// Initialize the Express router to define routes for project-related API operations
export const router = express.Router();

/**
 * Route to get all project entries.
 * Calls the getAllProjects methon in the ProjectController.
 */
router.get("/projects", ProjectController.getAllProjects);

/**
 * Route to get specific project by the project code.
 * Calls the getProjectByCode methon in the ProjectController.
 */
router.get("/projects/:code", ProjectController.getProjectByCode);

/**
 * Route to create a new Project entry.
 * Calls the createProject method in the ProjectController.
 */
router.post("/projects", ProjectController.createProject);
