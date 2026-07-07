import { Router } from "express";

import { getResult } from "../controllers/resultController";
import { optionalAuthenticate } from "../middleware/optionalAuthenticate";

const router = Router();

router.get<{ id: string }>("/:id", optionalAuthenticate, getResult);

export default router;