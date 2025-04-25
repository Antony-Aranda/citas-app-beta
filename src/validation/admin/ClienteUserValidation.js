import { body } from "express-validator";

export const clienteUserValidationRules = () => {
  return [
    // Validate name

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
    body("nombreUsuario")
      .notEmpty()
      .withMessage("Coloque un nombre")
      .isLength({ min: 3, max: 100 })
      .withMessage(
        "El nombre de usuario tiene que tener entre 3 a 100 caracteres"
      ),
    body("email")
      .notEmpty()
      .withMessage("Email vacio")
      .isEmail()
      .withMessage("Declare un email correcto"),

    body("password").notEmpty().withMessage("contraseña vacia"),
    body("passwordConfirmation")
      .notEmpty()
      .withMessage("La confirmación de contraseña es obligatoria")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Las contraseñas no coinciden");
        }
        return true; // indica que pasó la validación
      }),
  ];
};
