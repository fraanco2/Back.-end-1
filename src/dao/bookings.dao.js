import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readBookings = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log("Error al leer bookings.json:", error.message);
        return [];
    }
};

const writeBookings = async (filePath, bookings) => {
    await fs.writeFile(
        filePath,
        JSON.stringify(bookings, null, 2)
    );
};

export class BookingsDAO {
    constructor(filePath = path.join(__dirname, "../data/bookings.json")) {
        this.path = filePath;
    }

    async create(booking) {
        const bookings = await readBookings(this.path);

        const id = bookings.length > 0
            ? bookings[bookings.length - 1].id + 1
            : 1;

        const newBooking = {
            id,
            ...booking
        };

        bookings.push(newBooking);

        await writeBookings(this.path, bookings);

        return newBooking;
    }

    async getById(id) {
        const bookings = await readBookings(this.path);

        return bookings.find(
            (booking) => booking.id === Number(id)
        ) || null;
    }

    async update(id, updatedBooking) {
        const bookings = await readBookings(this.path);

        const index = bookings.findIndex(
            (booking) => booking.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        bookings[index] = updatedBooking;

        await writeBookings(this.path, bookings);

        return bookings[index];
    }
}