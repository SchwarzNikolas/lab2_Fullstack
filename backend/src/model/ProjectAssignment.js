import mongoose from "mongoose";

// Define the schema for the 'ProjectAssignment' model in MongoDB
const projectAssignmentSchema = new mongoose.Schema({
  employee_id: { type: String, ref: "employees" },   // Reference to the employee assigned
  project_code: { type: String, ref: "projects" },   // Reference to the assigned project
  start_date: Date,                                  // Date when the assignment starts
});

// Create a Mongoose model using the project assignment schema
const ProjectAssignments = mongoose.model("projectassignments", projectAssignmentSchema);

// Export the ProjectAssignments model to be used in other parts of the application
export default ProjectAssignments;
