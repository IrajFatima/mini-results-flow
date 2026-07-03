import { Router } from "express";

import { generateAIRecommendations } from "../controllers/aiController";

const router = Router();

router.get("/recommendation/:id", generateAIRecommendations);

export default router;
