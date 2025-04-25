import Usuario from "../../models/user.js";
import Cliente from "../../models/cliente.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export class ClienteUsuarioController {
  static async store(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const {
        nombre,
        apellido,
        telefono,
        dni,
        nombreUsuario,
        email,
        password,
        passwordConfirmation,
      } = req.body;
      const userAviable = await Usuario.findOne({ where: { email: email } });
      if (userAviable !== null) {
        return res.status(400).json({ message: "El email ya existe" });
      }

      const passwordBcrypt = await bcrypt.hash(password, 10);

      const user = await Usuario.create({
        nombre: nombreUsuario,
        email,
        password: passwordBcrypt,
        rol: "cliente",
      });
      const cliente = await Cliente.create({
        id_user: user.id,
        nombre,
        apellido,
        telefono,
        dni,
      });

      const clienteuser = await Cliente.findOne({
        where: { id: cliente.id },
        include: {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre", "email", "rol"],
        },
      });

      res.status(201).json(clienteuser);
    } catch (error) {
      console.log("Error store: " + error);
      res.status(500).json({ message: "Creacion fallida" });
    }
  }
}
