import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import user from "../../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export class AuthController {
  static async create(req, res) {
    //manejar errores
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { nombre, email, password } = req.body;

      const userAviable = await user.findOne({ where: { email: email } });
      if (userAviable !== null) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      const passwordBcrypt = await bcrypt.hash(password, 10);
      const rol = "cliente";
      const userCreate = await user.create({
        nombre,
        email,
        password: passwordBcrypt,
        rol,
      });
      const token = jwt.sign(
        {
          id: userCreate.id,
          nombre: userCreate.nombre,
          email: userCreate.email,
          rol: userCreate.rol,
        },
        process.env.SECRET_JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      const plain = userCreate.get({ plain: true });
      delete plain.password;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .status(201)
        .json({ user: plain });
    } catch (error) {
      console.error("Error creando el usuario:", error);
      res.status(500).json({ message: "Creacion fallida" });
    }
    //
  }

  static async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      const { email, password } = req.body;
      const userAviable = await user.findOne({ where: { email: email } });
      if (userAviable === null) {
        return res.status(400).json({ message: "El usuario no existe" });
      }

      const verifyPassword = await bcrypt.compare(
        password,
        userAviable.password
      );
      if (!verifyPassword) {
        return res.status(400).json({ message: "Contraseña Invalida" });
      }
      //jwt
      const token = jwt.sign(
        {
          id: userAviable.id,
          nombre: userAviable.nombre,
          email: userAviable.email,
          rol: userAviable.rol,
        },
        process.env.SECRET_JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      const plain = userAviable.get({ plain: true });
      delete plain.password;
      res
        .cookie("access_token", token, {
          httpOnly: true, //la cookie solo se puede acceder desde el servidor
          secure: process.env.NODE_ENV === "production", //la cookie solo se puede acceder en https
          sameSite: "strict", //la cookie solo se puede acceders del mismo dominio
          maxAge: 1000 * 60 * 60, //la cokkie tiene valides por 1 hora
        })
        .status(200)
        .json({ user: plain, token: token });
    } catch (error) {
      console.log("Errorres :", error);
      res.status(500).json({ message: "Fallo en la Autenticacion" });
    }
  }

  static async getCliente(req, res) {
    try {
      const users = await user.findAll();

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Error fetching users from db" });
    }
  }
  static async logout(req, res) {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Session terminada" });
  }
}
