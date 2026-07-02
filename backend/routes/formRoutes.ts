import { Router } from "express";

import {
    submitForm,
    getFormData,
    deleteFormData,
} from "../controllers/formController";

const router = Router();

router.post("/", submitForm);
router.get("/:id", getFormData);
router.delete("/:id", deleteFormData);

export default router;