//routes/admin.js
import express from "express";
import { adminLogin } from "../controllers/adminAuth.js";

const router = express.Router();

// Correct route
router.post("/login", adminLogin);

export default router;
