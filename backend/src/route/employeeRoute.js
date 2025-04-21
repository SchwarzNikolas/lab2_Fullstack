import express from "express";
import EmployeeController from "../controller/EmployeeController.js";

// Initialize the Express router to define routes for dish-related API operations
export const router = express.Router();

/**
 * Route to get all Employee entries.
 * Calls the getAllEmployees methon in the EmployeeController.
 */
router.get("/employees", EmployeeController.getAllEmployees);

/**
 * Route to get specific Employee by id.
 * Calls the getEmployeeById methon in the EmployeeController.
 */
router.get("/employees/:id", EmployeeController.getEmployeeById);

/**
 * Route to create a new Employee entry.
 * Calls the createEmployee method in the EmployeeController.
 */
router.post("/employees", EmployeeController.createEmployee);
