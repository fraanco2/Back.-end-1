import express from "express";

import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
} from "../controllers/services.controller.js";

import { validate } from "../middlewares/validation.middleware.js";
import {
    createServiceSchema,
    updateServiceSchema
} from "../validations/services.validation.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:sid", getServiceById);
router.post("/", validate(createServiceSchema), createService);
router.put("/:sid", validate(updateServiceSchema), updateService);
router.delete("/:sid", deleteService);

export default router;