import { errorHandler } from "../middleware/errorHandler.js";
import Employees from "../model/Employee.js";
import Projects from "../model/Project.js";
import ProjectAssignment from "../model/ProjectAssignment.js";

/**
 * Controller for handling requests related to projects.
 * Provides methods for some CRUD operations (Create, Read).
 */
class ProjectAssignmentController {

        /**
         * Retrieves all projects from the database.
         *
         * @param {object} req - The Express request object.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async getAllProjectAssignments(req, res, next){
                try {
                        // Fetch all projects from the database
                        const projects = await ProjectAssignment.find();
                        res.json(projects); // Send the projects as a JSON response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }

        /**
         * Creates a new project in the database.
         *
         * @param {object} req - The Express request object, containing the new project data in the body.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async createProjectAssignment(req, res, next){
                try {
                        let projectAssignment;
                        if (req.body.project_code && req.body.employee_id && req.body.start_date){
                                const employee = await Employees.find({employee_id: req.body.employee_id});
                                const project = await Projects.find({project_code: req.body.project_code});
                                if (employee.length < 1 || project.length < 1){
                                        errorHandler.wrongProjectAssignmentBody(req, res, next);
                                        return;
                                }
                                projectAssignment = new ProjectAssignment({
                                        project_code: req.body.project_code,
                                        employee_id: req.body.employee_id,
                                        start_date: new Date(req.body.start_date)
                                }) 
                        }
                        else {
                                errorHandler.missingProjectAssignmentBody(req, res, next); // Call error handler for missing body part.
                                return;
                        }
                        // Create a new project from the request body
                        await projectAssignment.save(); // Save the new project to the database
                        res.status(201).send(); // Send a 201 Created response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }
}

// Export an instance of the ProjectAssignmentController to be used in other parts of the application
export default new ProjectAssignmentController();

