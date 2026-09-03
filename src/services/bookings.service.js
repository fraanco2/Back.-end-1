import { BookingsRepository } from "../repositories/bookings.repository.js";
import { ServicesRepository } from "../repositories/services.repository.js";

export class BookingsService {
    constructor() {
        this.repository = new BookingsRepository();
        this.servicesRepository = new ServicesRepository();
    }

    async createBooking(bookingData) {
        const {
            clientName,
            clientEmail,
            date,
            time,
            status,
            services = []
        } = bookingData;

        if (
            !clientName ||
            !clientEmail ||
            !date ||
            !time ||
            !status
        ) {
            throw new Error("Faltan campos obligatorios de la reserva");
        }

        const newBooking = {
            clientName,
            clientEmail,
            date,
            time,
            status,
            services
        };

        return this.repository.create(newBooking);
    }

    async getBookingById(id) {
        return this.repository.getById(id);
    }

    async addServiceToBooking(bookingId, serviceId) {
        const booking = await this.repository.getById(bookingId);

        if (!booking) {
            return null;
        }

        const service = await this.servicesRepository.getById(serviceId);

        if (!service) {
            throw new Error("Servicio no encontrado");
        }

        const existingService = booking.services.find(
            (item) => item.service === Number(serviceId)
        );

        if (existingService) {
            existingService.quantity += 1;
        } else {
            booking.services.push({
                service: Number(serviceId),
                quantity: 1
            });
        }

        return this.repository.update(bookingId, booking);
    }
}