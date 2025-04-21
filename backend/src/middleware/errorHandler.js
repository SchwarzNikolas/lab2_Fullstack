export const errorHandler = {};

/**
 * Handles 404 errors when a route is not found.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
errorHandler.notFound = (req, res, next) => {
        const err = new Error("not found");
        err.status = 404; // Set the status code for a 404 error
        next(err); // Pass the error to the global error handler
}

/**
 * Handles errors when the required employee fields are missing in the request body.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
errorHandler.missingEmployeeBody = (req, res, next) => {
        const err = new Error("Missing body part, make sure to include following fields: full_name, email and password");
        err.status = 400; // Set the status code for a 400 Bad Request error
        next(err); // Pass the error to the global error handler
}

/**
 * A generic error handler for all other errors.
 *
 * @param {object} err - The error object passed by previous middleware.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
errorHandler.defaultError = (err, req, res, next) => {
        const status = err.status || 500; // Default to 500 if no status code is set
        res.status(status).json({
                status: status,
                message: err.message // Send the error message in the response body
        })
}
