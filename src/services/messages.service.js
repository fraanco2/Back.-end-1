import { MessagesRepository } from "../repositories/messages.repository.js";

export class MessagesService {
    constructor() {
        this.repository = new MessagesRepository();
    }

    async getMessages() {
        return this.repository.getAll();
    }

    async getMessageById(id) {
        return this.repository.getById(id);
    }

    async createMessage(messageData) {
        const { user, message } = messageData;

        if (!user || !message) {
            throw new Error("Faltan campos obligatorios del mensaje");
        }

        const newMessage = {
            user,
            message
        };

        return this.repository.create(newMessage);
    }

    async deleteMessage(id) {
        return this.repository.delete(id);
    }
}