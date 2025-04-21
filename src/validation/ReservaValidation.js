import { body } from "express-validator";

export const reservaValidationRules = () => {
  return [
    //id_servicio,id_cliente,id_terapeuta,sede,fecha_agendada,estado,monto
    // Validate name
    body("id_servicio")
      .notEmpty()
      .withMessage("seleccione un servicio")
      .isNumeric()
      .withMessage("Error al no ser un numero"),
    body("id_cliente")
      .if((_, { req }) => req.usuario.isAdmin)
      .notEmpty()
      .withMessage("seleccione un cliente")
      .isNumeric()
      .withMessage("Error al no ser un numero"),
    body("id_terapeuta")
      .if((_, { req }) => req.usuario.isAdmin)
      .notEmpty()
      .withMessage("seleccione un terapeuta")
      .isNumeric()
      .withMessage("Error al no ser un numero"),

    // Validate address
    //no validacion para la sede
    // Validate age
    body("fecha_agendada")
      .notEmpty()
      .withMessage("La fecha agendada es obligatoria")
      .isISO8601()
      .withMessage("Formato de fecha inválido (debe ser ISO 8601)"),
    body("estado")
      .if((_, { req }) => req.usuario.isAdmin)
      .notEmpty()
      .withMessage("Agrega un estado")
      .isNumeric()
      .withMessage("El estado tiene que ser numero"),
  ];
};
