import { ServicesService } from "../services/services.service.js";
import { BookingsService } from "../services/bookings.service.js";

const servicesService = new ServicesService();
const bookingsService = new BookingsService();

export const getServicesView = async (req, res) => {
    try {
        const services = await servicesService.getServices();

        res.render("services", {
            title: "Servicios",
            services
        });
    } catch (error) {
        res.status(500).send("Error al cargar los servicios");
    }
};

export const getAvailabilityView = async (req, res) => {
    try {
        const bookings = await bookingsService.getBookings();

        res.render("availability", {
            title: "Disponibilidad",
            bookings
        });
    } catch (error) {
        res.status(500).send("Error al cargar las reservas");
    }
};