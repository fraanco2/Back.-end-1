import { BookingsService } from "../services/bookings.service.js";

const bookingsService = new BookingsService();

export const createBooking = async (req, res) => {
    try {
        const booking = await bookingsService.createBooking(req.body);

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await bookingsService.getBookingById(req.params.bid);

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
};

export const addServiceToBooking = async (req, res) => {
    try {
        const booking = await bookingsService.addServiceToBooking(
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
};