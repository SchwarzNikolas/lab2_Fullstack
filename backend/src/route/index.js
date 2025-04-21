import express from "express";
import { router as employeeRoute } from "./employeeRoute.js";

export const router = express.Router();

router.use("/api", employeeRoute);
