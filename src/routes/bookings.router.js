import express from "express";
import { BookingManager } from "../managers/BookingManager.js";

const router = express.Router();
const bookingManager = new BookingManager();

router.post("/", async (req, res) => {
    try {
        const booking = await bookingManager.createBooking(req.body);

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
});

router.get("/:bid", async (req, res) => {
    try {
        const booking = await bookingManager.getBookingById(req.params.bid);

        if (!booking) {
            return res.status(404).json({
                mensaje: "Reserva no encontrada"
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la reserva"
        });
    }
});

router.post("/:bid/services/:sid", async (req, res) => {
    try {
        const booking = await bookingManager.addServiceToBooking(
            req.params.bid,
            req.params.sid
        );

        if (!booking) {
            return res.status(404).json({
                mensaje: "Reserva no encontrada"
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        if (error.message === "Servicio no encontrado") {
            return res.status(404).json({
                mensaje: error.message
            });
        }

        res.status(500).json({
            mensaje: "Error al agregar el servicio a la reserva"
        });
    }
});

export default router;