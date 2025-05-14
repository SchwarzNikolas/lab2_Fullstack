import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router } from "./route/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config("../.env");

// Initialize the Express application
export const app = express();

// For static files :)
app.use(express.static("public"));

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// enable cors
app.use(cors({
        origin: [`http://localhost:${process.env.PORT}`,
                `http://localhost:${process.env.FRONTENDPORT}`,
                "https://lab2-fullstack-1.onrender.com"],
        credentials: true
}))

// Use the API router for all routes starting from the root
app.use("/", router);

/**
 * Middleware to handle 404 errors when no matching route is found.
 *
 * This passes any 404 errors to the global error handler defined in errorHandler.notFound.
 */
app.use(errorHandler.notFound);

// Global error handler for other types of errors (e.g., 500 internal server errors)
app.use(errorHandler.defaultError);

