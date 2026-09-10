import { BookingsDAO } from "../dao/bookings.dao.js";

export class BookingsRepository {
    constructor() {
        this.dao = new BookingsDAO();
    }

    async getAll() {
        return this.dao.getAll();
    }

    async create(booking) {
        return this.dao.create(booking);
    }

    async getById(id) {
        return this.dao.getById(id);
    }

    async update(id, booking) {
        return this.dao.update(id, booking);
    }
}