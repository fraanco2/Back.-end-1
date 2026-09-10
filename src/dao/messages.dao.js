import { MessageModel } from "./models/message.model.js";

export class MessagesDAO {
    async getAll() {
        return await MessageModel.find().lean();
    }

    async getById(id) {
        return await MessageModel.findById(id).lean();
    }

    async create(message) {
        const newMessage = await MessageModel.create(message);
        return newMessage.toObject();
    }

    async delete(id) {
        return await MessageModel.findByIdAndDelete(id).lean();
    }
}