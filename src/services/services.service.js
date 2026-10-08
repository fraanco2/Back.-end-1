import { ServicesRepository } from "../repositories/services.repository.js";

export class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
    }

    async getServices(filters = {}) {
        const result = await this.repository.getAll(filters);

        const totalPages = Math.ceil(
            result.totalResults / result.limit
        );

        return {
            services: result.services,
            pagination: {
                totalResults: result.totalResults,
                currentPage: result.currentPage,
                limit: result.limit,
                totalPages,
                hasPrevPage: result.currentPage > 1,
                hasNextPage: result.currentPage < totalPages
            }
        };
    }

    async getServiceById(id) {
        return this.repository.getById(id);
    }

    async createService(serviceData) {
        const {
            name,
            description,
            duration,
            price,
            category,
            available
        } = serviceData;

        if (
            !name ||
            !description ||
            !duration ||
            price === undefined ||
            !category ||
            available === undefined
        ) {
            throw new Error("Faltan campos obligatorios del servicio");
        }

        const newService = {
            name,
            description,
            duration,
            price,
            category,
            available
        };

        return this.repository.create(newService);
    }

    async updateService(id, updatedData) {
        const service = await this.repository.getById(id);

        if (!service) {
            return null;
        }

        const updatedService = {
            ...updatedData
        };

        return this.repository.update(id, updatedService);
    }

    async deleteService(id) {
        return this.repository.delete(id);
    }
}