import { body } from "express-validator";

export const clienteValidationRules = () => {
  return [
    // Validate name
    body("id_user")
      .if((_, { req }) => req.usuario.isAdmin)
      .notEmpty()
      .withMessage("id_user es obligatorio para administradores"),

    // Validate address
    body("nombre")
      .notEmpty()
      .isLength({ min: 3, max: 150 })
      .withMessage("Maximo 150 caracteres"),

    // Validate age
    body("apellido")
      .notEmpty()
      .isLength({ min: 3, max: 150 })
      .withMessage("Maximo 150 caracteres"),

    body("telefono")
      .notEmpty()
      .isLength({ min: 9, max: 20 })
      .withMessage("Minimo 9 maximo 20"),

    body("dni")
      .notEmpty()
      .isLength({ min: 7, max: 10 })
      .withMessage("Minimo 7 maximo 10"),
  ];
};
