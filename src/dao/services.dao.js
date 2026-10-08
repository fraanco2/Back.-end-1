import { ServiceModel } from "./models/service.model.js";

export class ServicesDAO {
    async getAll(filters = {}) {
        const {
            category,
            available,
            page = 1,
            limit = 10,
            sortBy,
            order = "asc"
        } = filters;

        const query = {};

        if (category) {
            query.category = {
                $regex: `^${category}$`,
                $options: "i"
            };
        }

        if (available !== undefined) {
            query.available = available === "true";
        }

        const currentPage = Math.max(Number(page), 1);
        const pageLimit = Math.max(Number(limit), 1);
        const skip = (currentPage - 1) * pageLimit;

        const sort = {};

        if (sortBy) {
            sort[sortBy] = order === "desc" ? -1 : 1;
        }

        const services = await ServiceModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(pageLimit)
            .lean();

        const totalResults = await ServiceModel.countDocuments(query);

        return {
            services,
            totalResults,
            currentPage,
            limit: pageLimit
        };
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