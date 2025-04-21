import express from "express";
import ProjectAssignmentController from "../controller/ProjectAssignmentController.js";

// Initialize the Express router to define routes for project assignment-related API operations
export const router = express.Router();

/**
 * Route to get all project assignment entries.
 * Calls the getAllProjectAssignments methon in the ProjectAssignmentController.
 */
router.get("/project_assignments", ProjectAssignmentController.getAllProjectAssignments);

/**
 * Route to create a new Project Assignment entry.
 * Calls the createProjectAssignment method in the ProjectAssignmentController.
 */
router.post("/project_assignments", ProjectAssignmentController.createProjectAssignment);
