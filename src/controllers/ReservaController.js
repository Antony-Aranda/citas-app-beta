import reserva from "../models/reserva.js";
import { validationResult } from "express-validator";
import Cliente from "../models/cliente.js";
import Servicio from "../models/servicio.js";
import Terapeuta from "../models/terapeuta.js";
import { Sequelize } from "sequelize";

const ReservaController = {
  // Create a new user
  post: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      //capa negocio, por tiempo no se haran una capa servicios
      const sede = "Shiatsu Imoa - Masajes Terapéuticos en Chosica";
      let newReserva = null;
      if (req.usuario.isAdmin) {
        const {
          id_servicio,
          estado,
          id_cliente,
          id_terapeuta,
          fecha_agendada,
        } = req.body;

        //monto
        const servicio = await Servicio.findByPk(id_servicio);
        const monto = servicio.precio;

        newReserva = await reserva.create({
          id_servicio,
          id_cliente,
          id_terapeuta,
          sede,
          fecha_agendada,
          estado,
          monto,
        });
      } else {
        //cliente
        const { id_servicio, fecha_agendada } = req.body;

        //monto
        const servicio = await Servicio.findByPk(id_servicio);
        const monto = servicio.precio;
        const estado = 0;
        const cliente_user = await Cliente.findOne({
          where: { id_user: req.usuario.id },
        });
        //OBIAMENTE SE AGRAGARA UNA VALIDACION Igual con la fecha aqui
        const terapeuta_random = await Terapeuta.findOne({
          order: Sequelize.literal("RAND()"),
        });
        newReserva = await reserva.create({
          id_servicio,
          id_cliente: cliente_user.id,
          id_terapeuta: terapeuta_random.id,
          sede,
          fecha_agendada,
          estado,
          monto,
        });
      }

      res.status(201).json(newReserva);
    } catch (error) {
      console.error("Error al crear el reserva:", error);
      res.status(500).json({ message: "Error al reserva" });
    }
  },

  // Get all users
  get: async (req, res) => {
    try {
      let reservas = null;
      if (req.usuario.isAdmin) {
        reservas = await reserva.findAll({
          include: [
            {
              model: Cliente,
              as: "cliente",
              attributes: ["id", "nombre", "apellido", "dni"],
            },
            {
              model: Servicio,
              as: "servicio",
              attributes: ["id", "nombre", "precio", "duracion"],
            },
            {
              model: Terapeuta,
              as: "terapeuta",
              attributes: ["id", "nombre"],
            },
          ],
        });
      } else {
        //cliente
        const cliente = await Cliente.findOne({
          where: { id_user: req.usuario.id },
        });
        if (cliente == null) {
          return res
            .status(403)
            .json({ message: "Porfavor cree un cliente primero" });
        }
        reservas = await reserva.findAll({
          where: { id_cliente: cliente.id },
          include: [
            {
              model: Cliente,
              as: "cliente",
              attributes: ["id", "nombre", "apellido", "dni"],
            },
            {
              model: Servicio,
              as: "servicio",
              attributes: ["id", "nombre", "precio", "duracion"],
            },
            {
              model: Terapeuta,
              as: "terapeuta",
              attributes: ["id", "nombre"],
            },
          ],
        });
      }

      res.status(200).json(reservas);
    } catch (error) {
      console.error("reservas no obtenidos:", error);
      res.status(500).json({ message: "Error al obtener datos de la bd" });
    }
  },
  getById: async (req, res) => {
    try {
      const idReserva = req.params.id;
      let reservaGet = null;
      if (req.usuario.isAdmin) {
        reservaGet = await reserva.findByPk(idReserva, {
          include: [
            {
              model: Cliente,
              as: "cliente",
              attributes: ["id", "nombre", "apellido", "dni"],
            },
            {
              model: Servicio,
              as: "servicio",
              attributes: ["id", "nombre", "precio", "duracion"],
            },
            {
              model: Terapeuta,
              as: "terapeuta",
              attributes: ["id", "nombre"],
            },
          ],
        });
      } else {
        //cliente
        const cliente = await Cliente.findOne({
          where: { id_user: req.usuario.id },
        });
        reservaGet = await reserva.findOne({
          where: { id: idReserva, id_cliente: cliente.id },
          include: [
            {
              model: Cliente,
              as: "cliente",
              attributes: ["id", "nombre", "apellido", "dni"],
            },
            {
              model: Servicio,
              as: "servicio",
              attributes: ["id", "nombre", "precio", "duracion"],
            },
            {
              model: Terapeuta,
              as: "terapeuta",
              attributes: ["id", "nombre"],
            },
          ],
        });
      }

      if (!reservaGet) {
        return res.status(404).json({ message: "Reserva no encontrado" });
      }
      res.status(200).json(reservaGet);
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

      const checkReserva = await reserva.findByPk(id);

      if (!checkReserva) {
        return res.status(404).json({ message: "reserva no encontrado" });
      }
      if (req.usuario.isAdmin) {
        const {
          id_servicio,
          estado,
          id_cliente,
          id_terapeuta,
          fecha_agendada,
        } = req.body;

        const servicio = await Servicio.findByPk(id_servicio);
        const monto = servicio.precio;

        await reserva.update(
          {
            id_servicio,
            id_cliente,
            id_terapeuta,
            sede: checkReserva.sede,
            fecha_agendada,
            estado,
            monto,
          },
          { where: { id } }
        );
      } else {
        const { id_servicio, fecha_agendada } = req.body;

        const servicio = await Servicio.findByPk(id_servicio);
        const monto = servicio.precio;

        //OBIAMENTE SE AGRAGARA UNA VALIDACION Igual con la fecha aqui

        await reserva.update(
          {
            id_servicio,
            id_cliente: checkReserva.id_cliente,
            id_terapeuta: checkReserva.id_terapeuta,
            sede: checkReserva.sede,
            fecha_agendada,
            estado: checkReserva.estado,
            monto,
          },
          { where: { id } }
        );
      }

      res.status(200).json({ message: "reserva Actualizado con exito" });
    } catch (error) {
      console.error("Error al actualizar el reserva:", error);
      res.status(500).json({ message: "Error actualizando el reserva" });
    }
  },

  // Delete reserva
  delete: async (req, res) => {
    try {
      const reservaId = req.params.id;
      const checkReserva = await reserva.findByPk(reservaId);

      if (!checkReserva) {
        return res.status(404).json({ message: "reserva no encontrado" });
      }

      await checkReserva.destroy();

      res.status(200).json({ message: "reserva eliminado con exito" });
    } catch (error) {
      console.error("Error al elimnar el reserva:", error);
      res.status(500).json({ message: "Error elimando al reserva" });
    }
  },
};

export default ReservaController;
