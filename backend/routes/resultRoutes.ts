import { Router } from "express";

import { getResult } from "../controllers/resultController";

const router = Router();

router.get("/:id", getResult);

export default router;