import bcrypt from "bcrypt";
import { errorHandler } from "../middleware/errorHandler.js";
import Employees from "../model/Employee.js";

/**
 * Controller for handling requests related to employees.
 * Provides methods for some CRUD operations (Create, Read).
 */
class EmployeeController {

        /**
         * Retrieves all employees from the database.
         *
         * @param {object} req - The Express request object.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async getAllEmployees(req, res, next){
                try {
                        // Fetch all employees from the database
                        const employees = await Employees.find();
                        res.json(employees); // Send the employees as a JSON response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }

        /**
         * Retrieve a employee by their employee_id from the database.
         *
         * @param {object} req - The Express request object, containing the employee ID in params.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async getEmployeeById(req, res, next){
                try {
                        const sameTitle = await Employees.find({employee_id: req.params.id});
                        if (sameTitle.length < 1) {
                                errorHandler.notFound(req, res, next); // Handle 404 if the employee doesn't exist
                                return;
                        }
                        res.json(sameTitle);
                } catch (err) {
                        next(err);
                }
        }

        /**
         * Creates a new employee in the database.
         *
         * @param {object} req - The Express request object, containing the new employee data in the body.
         * @param {object} res - The Express response object.
         * @param {Function} next - The next middleware function.
         */
        async createEmployee(req, res, next){
                try {
                        let employee;
                        if (req.body.full_name && req.body.email && req.body.password){
                                const latestEmployee = await Employees.findOne().sort({ employee_id: -1 });
                                let id = latestEmployee.employee_id ?? "-1";
                                id = String(parseInt(id) + 1)
                                employee = new Employees({
                                        employee_id: id,
                                        full_name: req.body.full_name,
                                        email: req.body.email,
                                        hashed_password: await bcrypt.hash(req.body.password, 10)
                                }) 
                        }
                        else {
                                errorHandler.missingEmployeeBody(req, res, next); // Call error handler for missing body part.
                                return;
                        }
                        // Create a new employee from the request body
                        await employee.save(); // Save the new employee to the database
                        res.status(201).send(); // Send a 201 Created response
                } catch (err) {
                        next(err); // Pass any errors to the error handler
                }
        }
}

// Export an instance of the EmployeeController to be used in other parts of the application
export default new EmployeeController();
