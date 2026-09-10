import { MessagesDAO } from "../dao/messages.dao.js";

export class MessagesRepository {
    constructor() {
        this.dao = new MessagesDAO();
    }

    async getAll() {
        return this.dao.getAll();
    }

    async getById(id) {
        return this.dao.getById(id);
    }

    async create(message) {
        return this.dao.create(message);
    }

    async delete(id) {
        return this.dao.delete(id);
    }
}