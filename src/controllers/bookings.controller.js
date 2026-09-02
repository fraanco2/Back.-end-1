import { BookingManager } from "../managers/BookingManager.js";
import { ServiceManager } from "../managers/ServiceManager.js";

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = async (req, res) => {
    try {
        const booking = await bookingManager.createBooking(req.body);

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
};

export const getBookingById = async (req, res) => {
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
};

export const addServiceToBooking = async (req, res) => {
    try {
        const service = await serviceManager.getServiceById(req.params.sid);

        if (!service) {
            return res.status(404).json({
                mensaje: "Servicio no encontrado"
            });
        }

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
        res.status(500).json({
            mensaje: "Error al agregar el servicio a la reserva"
        });
    }
};