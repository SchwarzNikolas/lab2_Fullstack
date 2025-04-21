import { errorHandler } from "../middleware/errorHandler.js";
import Projects from "../model/Project.js";

/**
 * Controller for handling requests related to projects.
 * Provides methods for some CRUD operations (Create, Read).
 */
class ProjectController {

        /**
         * Retrieves all projects from the database.
         *
         * @param {object} req - The Express request object.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async getAllProjects(req, res, next){
                try {
                        // Fetch all projects from the database
                        const projects = await Projects.find();
                        res.json(projects); // Send the projects as a JSON response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }

        /**
         * Retrieve a project by its project_code from the database.
         *
         * @param {object} req - The Express request object, containing the project code in params.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async getProjectByCode(req, res, next){
                try {
                        const sameTitle = await Projects.find({project_code: req.params.code});
                        if (sameTitle.length < 1) {
                                errorHandler.notFound(req, res, next); // Handle 404 if the project doesn't exist
                                return;
                        }
                        res.json(sameTitle);
                } catch (err) {
                        next(err);
                }
        }

        /**
         * Creates a new project in the database.
         *
         * @param {object} req - The Express request object, containing the new project data in the body.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async createProject(req, res, next){
                try {
                        let project;
                        if (req.body.project_code && req.body.project_name && req.body.project_description){
                                const duplicateProject = await Projects.find({project_code: req.body.project_code});
                                if (duplicateProject.length > 0){
                                        errorHandler.duplicateProject(req, res, next);
                                        return;
                                }
                                project = new Projects({
                                        project_code: req.body.project_code,
                                        project_name: req.body.project_name,
                                        project_description: req.body.project_description
                                }) 
                        }
                        else {
                                errorHandler.missingProjectBody(req, res, next); // Call error handler for missing body part.
                                return;
                        }
                        // Create a new project from the request body
                        await project.save(); // Save the new project to the database
                        res.status(201).send(); // Send a 201 Created response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }
}

// Export an instance of the ProjectController to be used in other parts of the application
export default new ProjectController();
