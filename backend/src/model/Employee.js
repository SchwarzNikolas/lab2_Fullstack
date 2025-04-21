import mongoose from "mongoose";

// Define the schema for the 'Employee' model in MongoDB
const employeeSchema = new mongoose.Schema({
  employee_id: { type: String, unique: true },      // Unique identifier for the employee
  full_name: String,                                // Full name of the employee
  email: { type: String, unique: true },            // Unique email address
  hashed_password: String,                          // Hashed password for authentication
});

// Create a Mongoose model using the employee schema
const Employees = mongoose.model("employees", employeeSchema);

// Export the Employees model to be used in other parts of the application
export default Employees;
