import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyCookieAccess = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(401).json({ message: "Token No Proporcionado" });
  }
  req.usuario = null;
  try {
    const data = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.usuario = data;
    req.usuario.isAdmin = data.rol === "admin" ? true : false;
    next();
  } catch (error) {
    req.usuario = null;
    console.log("Problemas con el token jwt");
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
