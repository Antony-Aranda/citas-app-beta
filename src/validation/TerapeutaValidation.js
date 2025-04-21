import { body } from "express-validator";

export const terapeutaValidationRules = () => {
  return [
    // Validate name
    body("nombre").notEmpty().withMessage("Ingres un nombre"),

    // Validate address
    body("dni")
      .notEmpty()
      .withMessage("Ingrese un dni")
      .isLength({ min: 8, max: 10 })
      .withMessage("Maximo 10 minimo 8 caracteres"),
  ];
};
