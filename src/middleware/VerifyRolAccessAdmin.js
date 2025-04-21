export const verifyRolAccessAdmin = (req, res, next) => {
  if (req.usuario.isAdmin) {
    return next();
  }

  return res.status(401).json({ message: "Contenido solo para administrador" });
};
