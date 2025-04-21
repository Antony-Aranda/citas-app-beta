import { body } from "express-validator";

export const servicioValidationRules = () => {
  return [
    //nombre,descripcion,precio,duracion
    // Validate name
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),

    // Validate address
    body("descripcion").notEmpty().withMessage("La descripcion es obligatorio"),

    // Validate age
    body("precio")
      .notEmpty()
      .withMessage("El precio es obligatorio")
      .isNumeric()
      .withMessage("El precio debe ser un número"),

    body("duracion")
      .notEmpty()
      .withMessage("La duración es obligatoria")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage("La duración debe tener formato HH:MM (00–23:00–59)"),
  ];
};
