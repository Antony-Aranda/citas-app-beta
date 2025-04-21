import servicio from "../models/servicio.js";
import { validationResult } from "express-validator";

const ServicioController = {
  // Create a new user
  post: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { nombre, descripcion, precio, duracion } = req.body;

      const newServicio = await servicio.create({
        nombre,
        descripcion,
        precio,
        duracion,
      });

      res.status(201).json(newServicio);
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      res.status(500).json({ message: "Error al servicio" });
    }
  },

  // Get all users
  get: async (req, res) => {
    try {
      const servicios = await servicio.findAll();

      res.status(200).json(servicios);
    } catch (error) {
      console.error("servicios no obtenidos:", error);
      res.status(500).json({ message: "Error al obtener datos de la bd" });
    }
  },
  getById: async (req, res) => {
    try {
      const idServicio = req.params.id;
      const servicioGet = await servicio.findByPk(idServicio);
      if (!servicioGet) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }
      res.status(200).json(servicioGet);
    } catch (error) {
      console.log("Problemas del servidor: ", error);
      res.status(500).json({ message: "Problemas con la BD" });
    }
  },

  // Update user
  update: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const id = req.params.id;
      const { nombre, descripcion, precio, duracion } = req.body;

      const checkServicio = await servicio.findByPk(id);

      if (!checkServicio) {
        return res.status(404).json({ message: "servicio no encontrado" });
      }

      await servicio.update(
        { nombre, descripcion, precio, duracion },
        { where: { id } }
      );

      res.status(200).json({ message: "servicio Actualizado con exito" });
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      res.status(500).json({ message: "Error actualizando el servicio" });
    }
  },

  // Delete servicio
  delete: async (req, res) => {
    try {
      const servicioId = req.params.id;
      const checkServicio = await servicio.findByPk(servicioId);

      if (!checkServicio) {
        return res.status(404).json({ message: "servicio no encontrado" });
      }

      await checkServicio.destroy();

      res.status(200).json({ message: "servicio eliminado con exito" });
    } catch (error) {
      console.error("Error al elimnar el servicio:", error);
      res.status(500).json({ message: "Error elimando al servicio" });
    }
  },
};

export default ServicioController;
