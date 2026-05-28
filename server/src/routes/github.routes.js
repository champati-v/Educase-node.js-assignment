import express from "express";
import { analyzeGitHubProfile } from "../controllers/github.controller.js";

const router = express.Router();

router.get("/analyze/:username", analyzeGitHubProfile);

export default router;