import { BookingModel } from "./models/booking.model.js";

export class BookingsDAO {
    async getAll() {
        return await BookingModel.find()
            .populate("services.service")
            .lean();
    }

    async create(booking) {
        const newBooking = await BookingModel.create(booking);
        return newBooking.toObject();
    }

    async getById(id) {
        return await BookingModel.findById(id)
            .populate("services.service")
            .lean();
    }

    async update(id, updatedBooking) {
        return await BookingModel.findByIdAndUpdate(
            id,
            updatedBooking,
            { new: true }
        )
            .populate("services.service")
            .lean();
    }
}