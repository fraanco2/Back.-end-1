import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { ServiceManager } from "./ServiceManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class BookingManager {
    constructor(filePath = path.join(__dirname, "../data/bookings.json")) {
        this.path = filePath;
        this.serviceManager = new ServiceManager();
    }

    async readBookings() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.log("Error al leer bookings.json:", error.message);
            return [];
        }
    }

    async writeBookings(bookings) {
        await fs.writeFile(
            this.path,
            JSON.stringify(bookings, null, 2)
        );
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

        const bookings = await this.readBookings();

        const id = bookings.length > 0
            ? bookings[bookings.length - 1].id + 1
            : 1;

        const newBooking = {
            id,
            clientName,
            clientEmail,
            date,
            time,
            status,
            services
        };

        bookings.push(newBooking);

        await this.writeBookings(bookings);

        return newBooking;
    }

    async getBookingById(id) {
        const bookings = await this.readBookings();

        return bookings.find(
            (booking) => booking.id === Number(id)
        ) || null;
    }

    async addServiceToBooking(bookingId, serviceId) {
        const bookings = await this.readBookings();

        const booking = bookings.find(
            (booking) => booking.id === Number(bookingId)
        );

        if (!booking) {
            return null;
        }

        const service = await this.serviceManager.getServiceById(serviceId);

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

        await this.writeBookings(bookings);

        return booking;
    }
}