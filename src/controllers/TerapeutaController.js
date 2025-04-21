import terapeuta from "../models/terapeuta.js";
import { validationResult } from "express-validator";

const TerapeutaController = {
  // Create a new user
  post: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { nombre, dni } = req.body;

      const newTerapeuta = await terapeuta.create({
        nombre,
        dni,
      });

      res.status(201).json(newTerapeuta);
    } catch (error) {
      console.error("Error al crear el Terapeuta:", error);
      res.status(500).json({ message: "Error al Terapeuta" });
    }
  },

  // Get all users
  get: async (req, res) => {
    try {
      const terapeutas = await terapeuta.findAll();

      res.status(200).json(terapeutas);
    } catch (error) {
      console.error("Terapeuta no obtenidos:", error);
      res.status(500).json({ message: "Error al obtener datos de la bd" });
    }
  },
  getById: async (req, res) => {
    try {
      const idTerapeuta = req.params.id;
      const terapeutaGet = await terapeuta.findByPk(idTerapeuta);
      if (!terapeutaGet) {
        return res.status(404).json({ message: "Terapeuta no encontrado" });
      }
      res.status(200).json(terapeutaGet);
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
      const { nombre, dni } = req.body;

      const checkTerapeuta = await terapeuta.findByPk(id);

      if (!checkTerapeuta) {
        return res.status(404).json({ message: "Terapeuta no encontrado" });
      }

      await terapeuta.update({ nombre, dni }, { where: { id } });

      res.status(200).json({ message: "Terapeuta Actualizado con exito" });
    } catch (error) {
      console.error("Error al actualizar el Terapeuta:", error);
      res.status(500).json({ message: "Error actualizando el Terapeuta" });
    }
  },

  // Delete terapeuta
  delete: async (req, res) => {
    try {
      const terapeutaId = req.params.id;
      const checkTerapeuta = await cliente.findByPk(terapeutaId);

      if (!checkTerapeuta) {
        return res.status(404).json({ message: "Terapeuta no encontrado" });
      }

      await checkTerapeuta.destroy();

      res.status(200).json({ message: "Terapeuta eliminado con exito" });
    } catch (error) {
      console.error("Error al eliminar el terapeuta:", error);
      res.status(500).json({ message: "Error elimando al terapeuta" });
    }
  },
};

export default TerapeutaController;
