import { body } from "express-validator";

export const userValidationRules = () => {
  return [
    // Validate name
    body("nombre")
      .notEmpty()
      .withMessage("Coloque un nombre")
      .isLength({ min: 3, max: 100 })
      .withMessage("El nombre tiene que tener entre 3 a 100 caracteres"),

    // Validate address
    body("email")
      .notEmpty()
      .withMessage("Email vacio")
      .isEmail()
      .withMessage("Declare un email correcto"),

    // Validate age
    body("password").notEmpty().withMessage("contraseña vacia"),

    body("rol").notEmpty().withMessage("Seleccione un rol"),
  ];
};
