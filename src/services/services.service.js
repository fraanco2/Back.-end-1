import { ServicesRepository } from "../repositories/services.repository.js";

export class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
    }

    async getServices(filters = {}) {
        let services = await this.repository.getAll();

        const { category, available } = filters;

        if (category) {
            services = services.filter(
                (service) =>
                    service.category?.toLowerCase() === category.toLowerCase()
            );
        }

        if (available !== undefined) {
            services = services.filter(
                (service) => service.available === (available === "true")
            );
        }

        return services;
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

        const services = await this.repository.getAll();

        const id = services.length > 0
            ? services[services.length - 1].id + 1
            : 1;

        const newService = {
            id,
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
            ...service,
            ...updatedData,
            id: service.id
        };

        return this.repository.update(id, updatedService);
    }

    async deleteService(id) {
        return this.repository.delete(id);
    }
}