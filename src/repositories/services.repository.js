import { ServicesDAO } from "../dao/services.dao.js";

export class ServicesRepository {
    constructor() {
        this.dao = new ServicesDAO();
    }

    async getAll() {
        return this.dao.getAll();
    }

    async getById(id) {
        return this.dao.getById(id);
    }

    async create(service) {
        return this.dao.create(service);
    }

    async update(id, service) {
        return this.dao.update(id, service);
    }

    async delete(id) {
        return this.dao.delete(id);
    }
}