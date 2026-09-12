import { ServicesRepository } from "../repositories/services.repository.js";

export class ServicesService {
    constructor() {
        this.repository = new ServicesRepository();
    }

    async getServices(filters = {}) {
    let services = await this.repository.getAll();

    const {
        category,
        available,
        page = 1,
        limit = 10,
        sortBy,
        order = "asc"
    } = filters;

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

    if (sortBy) {
        services.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) {
                return order === "desc" ? 1 : -1;
            }

            if (a[sortBy] > b[sortBy]) {
                return order === "desc" ? -1 : 1;
            }

            return 0;
        });
    }

    const totalResults = services.length;
    const currentPage = Math.max(Number(page), 1);
    const pageLimit = Math.max(Number(limit), 1);
    const totalPages = Math.ceil(totalResults / pageLimit);

    const start = (currentPage - 1) * pageLimit;
    const paginatedServices = services.slice(start, start + pageLimit);

    return {
        services: paginatedServices,
        pagination: {
            totalResults,
            currentPage,
            limit: pageLimit,
            totalPages,
            hasPrevPage: currentPage > 1,
            hasNextPage: currentPage < totalPages
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