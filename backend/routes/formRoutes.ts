import { Router } from "express";

import {
    submitForm,
    getFormData,
    deleteFormData,
    getAllFormDataForAdmin,
    getAllFormDataForUser

} from "../controllers/formController";
import { optionalAuthenticate } from "../middleware/optionalAuthenticate";
import { authorize } from "../middleware/authorize";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.post("/", optionalAuthenticate, submitForm);
router.get("/all/user",authenticate,authorize("user"),getAllFormDataForUser);
router.get("/all/admin",authenticate,authorize("admin"),getAllFormDataForAdmin);
router.get<{ id: string }>("/:id", optionalAuthenticate, getFormData);
router.delete<{ id: string }>("/:id", optionalAuthenticate, deleteFormData);

export default router;