import express from "express";
import { ServiceManager } from "../managers/ServiceManager.js";

const router = express.Router();
const serviceManager = new ServiceManager();

router.get("/", async (req, res) => {
  try {
    let services = await serviceManager.getServices();
    const { category, available } = req.query;

    if (category) {
      services = services.filter(
        (service) => service.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (available !== undefined) {
      services = services.filter(
        (service) => service.available === (available === "true")
      );
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los servicios",
    });
  }
});

router.get("/:sid", async (req, res) => {
  try {
    const service = await serviceManager.getServiceById(req.params.sid);

    if (!service) {
      return res.status(404).json({
        mensaje: "Servicio no encontrado",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el servicio",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const service = await serviceManager.addService(req.body);

    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({
      mensaje: error.message,
    });
  }
});

router.put("/:sid", async (req, res) => {
  try {
    const service = await serviceManager.updateService(
      req.params.sid,
      req.body
    );

    if (!service) {
      return res.status(404).json({
        mensaje: "Servicio no encontrado",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({
      mensaje: error.message,
    });
  }
});

router.delete("/:sid", async (req, res) => {
  try {
    const deletedService = await serviceManager.deleteService(req.params.sid);

    if (!deletedService) {
      return res.status(404).json({
        mensaje: "Servicio no encontrado",
      });
    }

    res.status(200).json(deletedService);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el servicio",
    });
  }
});

export default router;
