import mongoose from "mongoose";

// Define the schema for the 'Project' model in MongoDB
const projectSchema = new mongoose.Schema({
  project_code: { type: String, unique: true },     // Unique project code
  project_name: String,                             // Name of the project
  project_description: String,                      // Description of the project
});

// Create a Mongoose model using the project schema
const Projects = mongoose.model("projects", projectSchema);

// Export the Projects model to be used in other parts of the application
export default Projects;
