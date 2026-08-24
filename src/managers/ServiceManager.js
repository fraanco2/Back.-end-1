import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ServiceManager {
    constructor(filePath = path.join(__dirname, "../data/services.json")) {
        this.path = filePath;
    }

    async readServices() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.log("Error al leer services.json:", error.message);
            return [];
        }
    }

    async writeServices(services) {
        await fs.writeFile(
            this.path,
            JSON.stringify(services, null, 2)
        );
    }

    async getServices() {
        return this.readServices();
    }

    async getServiceById(id) {
        const services = await this.readServices();

        return services.find(
            (service) => service.id === Number(id)
        ) || null;
    }

    async addService(serviceData) {
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

        const services = await this.readServices();

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

        services.push(newService);

        await this.writeServices(services);

        return newService;
    }

    async updateService(id, updatedData) {
        const services = await this.readServices();

        const index = services.findIndex(
            (service) => service.id === Number(id)
        );

        if (index === -1) {
            return null;
        }

        services[index] = {
            ...services[index],
            ...updatedData,
            id: services[index].id
        };

        await this.writeServices(services);

        return services[index];
    }

    async deleteService(id) {
        const services = await this.readServices();

        const filtered = services.filter(
            (service) => service.id !== Number(id)
        );

        if (filtered.length === services.length) {
            return false;
        }

        await this.writeServices(filtered);

        return true;
    }
}