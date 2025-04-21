import cliente from "../models/cliente.js";
import { validationResult } from "express-validator";
import User from "../models/user.js";

const ClienteController = {
  // Create a new user
  post: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      let newCliente = null;
      if (req.usuario.isAdmin) {
        const { id_user, nombre, apellido, telefono, dni } = req.body;

        newCliente = await cliente.create({
          id_user,
          nombre,
          apellido,
          telefono,
          dni,
        });
      } else {
        const { nombre, apellido, telefono, dni } = req.body;
        const idUserLog = req.usuario.id;
        newCliente = await cliente.create({
          id_user: idUserLog,
          nombre,
          apellido,
          telefono,
          dni,
        });
      }

      res.status(201).json(newCliente);
    } catch (error) {
      console.error("Error al crear el Cliente:", error);
      res.status(500).json({ message: "Error al Cliente" });
    }
  },

  // Get all users
  get: async (req, res) => {
    try {
      let clientes = null;
      if (req.usuario.isAdmin) {
        clientes = await cliente.findAll({
          include: {
            model: User,
            as: "usuario",
            attributes: ["id", "nombre", "email", "rol"],
          },
        });
      } else {
        clientes = await cliente.findOne({
          where: { id_user: req.usuario.id },
          include: {
            model: User,
            as: "usuario",
            attributes: ["id", "nombre", "email", "rol"],
          },
        });
      }

      res.status(200).json(clientes);
    } catch (error) {
      console.error("Clientes no obtenidos:", error);
      res.status(500).json({ message: "Error al obtener datos de la bd" });
    }
  },
  getById: async (req, res) => {
    try {
      const idCliente = req.params.id;
      const clienteGet = await cliente.findByPk(idCliente, {
        include: {
          model: User,
          as: "usuario",
          attributes: ["id", "nombre", "email", "rol"],
        },
      });
      if (!clienteGet) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }
      res.status(200).json(clienteGet);
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

      if (req.usuario.isAdmin) {
        const id = req.params.id;
        const checkCliente = await cliente.findByPk(id);

        if (!checkCliente) {
          return res.status(404).json({ message: "Cliente no encontrado" });
        }
        const { id_user, nombre, apellido, telefono, dni } = req.body;
        await cliente.update(
          { id_user, nombre, apellido, telefono, dni },
          { where: { id } }
        );
      } else {
        const checkCliente = await cliente.findOne({
          where: { id_user: req.usuario.id },
        });
        if (!checkCliente) {
          return res.status(404).json({ message: "Cliente no encontrado" });
        }
        const { nombre, apellido, telefono, dni } = req.body;
        await cliente.update(
          { id_user: checkCliente.id_user, nombre, apellido, telefono, dni },
          { where: { id: checkCliente.id } }
        );
      }

      res.status(200).json({ message: "Cliente Actualizado con exito" });
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      res.status(500).json({ message: "Error actualizando el cliente" });
    }
  },

  // Delete cliente
  delete: async (req, res) => {
    try {
      const clienteId = req.params.id;
      const checkCliente = await cliente.findByPk(clienteId);

      if (!checkCliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }

      await checkCliente.destroy();

      res.status(200).json({ message: "Cliente eliminado con exito" });
    } catch (error) {
      console.error("Error al elimnar el cliente:", error);
      res.status(500).json({ message: "Error elimando al cliente" });
    }
  },
};

export default ClienteController;
