import express from "express";
import { router as employeeRoute } from "./employeeRoute.js";
import { router as projectRoute } from "./projectRoute.js";
import { router as projectAssingmentRoute } from "./projectAssignmentRoute.js";

export const router = express.Router();

router.use("/api", employeeRoute);
router.use("/api", projectRoute);
router.use("/api", projectAssingmentRoute);
