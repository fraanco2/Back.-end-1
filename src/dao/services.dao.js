import { ServiceModel } from "./models/service.model.js";

export class ServicesDAO {
    async getAll() {
        return await ServiceModel.find().lean();
    }

    async getById(id) {
        return await ServiceModel.findById(id).lean();
    }

    async create(service) {
        const newService = await ServiceModel.create(service);
        return newService.toObject();
    }

    async update(id, updatedService) {
        return await ServiceModel.findByIdAndUpdate(
            id,
            updatedService,
            { new: true }
        ).lean();
    }

    async delete(id) {
        return await ServiceModel.findByIdAndDelete(id).lean();
    }
}