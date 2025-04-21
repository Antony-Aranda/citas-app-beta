import user from "../models/user.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

const userController = {
  // Create a new user
  post: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      let newUser = null;
      if (!req.usuario.isAdmin) {
        const { nombre, email, password, rol } = req.body;

        const userAviable = await user.findOne({ where: { email: email } });
        if (userAviable !== null) {
          return res.status(400).json({ message: "El email ya existe" });
        }

        const passwordBcrypt = await bcrypt.hash(password, 10);

        newUser = await user.create({
          nombre,
          email,
          password: passwordBcrypt,
          rol,
        });
      }

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creando user:", error);
      res.status(500).json({ message: "Error en la creacion user" });
    }
  },

  // Get all users
  get: async (req, res) => {
    try {
      let users = null;
      if (req.usuario.isAdmin) {
        users = await user.findAll();
      } else {
        users = await user.findOne({ where: { id: req.usuario.id } });
      }

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users from db" });
    }
  },
  getById: async (req, res) => {
    try {
      const idUser = req.params.id;
      const userGet = await user.findByPk(idUser);
      if (!userGet) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(userGet);
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
        const { nombre, email, password, rol } = req.body;

        const checkUser = await user.findByPk(id);

        if (!checkUser) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const userAviable = await user.findOne({ where: { email: email } });
        if (userAviable !== null) {
          return res.status(400).json({ message: "El email ya existe" });
        }

        const passwordBcrypt = await bcrypt.hash(password, 10);

        await user.update(
          { nombre, email, password: passwordBcrypt, rol },
          { where: { id } }
        );
      } else {
        //podriamos agregar una verfiicacion de password , pero ...
        const { nombre, email, password } = req.body;

        const checkUser = await user.findByPk(req.usuario.id);

        if (!checkUser) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const userAviable = await user.findOne({ where: { email: email } });
        if (userAviable !== null) {
          return res.status(400).json({ message: "El email ya existe" });
        }

        const passwordBcrypt = await bcrypt.hash(password, 10);

        await user.update(
          { nombre, email, password: passwordBcrypt },
          { where: { id: req.usuario.id } }
        );
      }

      res.status(200).json({ message: "User Actualizado con exito" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user" });
    }
  },

  // Delete user
  delete: async (req, res) => {
    try {
      const userId = req.params.id;
      const checkUser = await user.findByPk(userId);

      if (!checkUser) {
        return res.status(404).json({ message: "User not found" });
      }

      await checkUser.destroy();

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
    }
  },
};

export default userController;
