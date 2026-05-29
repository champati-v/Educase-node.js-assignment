import express from 'express';
import { getAnalyzedProfile } from '../controllers/profile.controller.js';

const router = express.Router();

router.get('/', getAnalyzedProfile);

export default router;