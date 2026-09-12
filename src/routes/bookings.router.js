import express from "express";

import {
    createBooking,
    getBookingById,
    addServiceToBooking
} from "../controllers/bookings.controller.js";

import { validate } from "../middlewares/validation.middleware.js";
import {
    createBookingSchema,
    bookingParamsSchema
} from "../validations/bookings.validation.js";

const router = express.Router();

router.post("/", validate(createBookingSchema), createBooking);
router.get("/:bid", getBookingById);
router.post(
    "/:bid/services/:sid",
    validate(bookingParamsSchema, "params"),
    addServiceToBooking
);

export default router;