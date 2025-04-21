import express from "express";
const router = express.Router();

import userController from "../controllers/UserController.js";
import ClienteController from "../controllers/ClienteController.js";
import ServicioController from "../controllers/ServicioController.js";
import TerapeutaController from "../controllers/TerapeutaController.js";
import ReservaController from "../controllers/ReservaController.js";

import { userValidationRules } from "../validation/UserValidation.js";
import { clienteValidationRules } from "../validation/ClienteValidation.js";
import { servicioValidationRules } from "../validation/ServicioValidation.js";
import { reservaValidationRules } from "../validation/ReservaValidation.js";
import { terapeutaValidationRules } from "../validation/TerapeutaValidation.js";

import { verifyCookieAccess } from "../middleware/AuthCookieMiddleware.js";
import { verifyRolAccessAdmin } from "../middleware/VerifyRolAccessAdmin.js";

//endopoitn user
router.get("/user", verifyCookieAccess, (req, res) => {
  userController.get(req, res);
});
router.get(
  "/user/:id",
  [verifyCookieAccess, verifyRolAccessAdmin],
  (req, res) => {
    userController.getById(req, res);
  }
);
router.post(
  "/user/create",
  [verifyCookieAccess, userValidationRules()],
  (req, res) => {
    userController.post(req, res);
  }
);
router.put(
  "/user/update/:id",
  [verifyCookieAccess, userValidationRules()],
  (req, res) => {
    userController.update(req, res);
  }
);
router.delete(
  "/user/delete/:id",
  [verifyCookieAccess, verifyRolAccessAdmin],
  (req, res) => {
    userController.delete(req, res);
  }
);

//endpoint clientes

router.get("/cliente", verifyCookieAccess, (req, res) => {
  ClienteController.get(req, res);
});
router.get(
  "/cliente/:id",
  [verifyCookieAccess, verifyRolAccessAdmin],
  (req, res) => {
    ClienteController.getById(req, res);
  }
);
router.post(
  "/cliente/create",
  [verifyCookieAccess, clienteValidationRules()],
  (req, res) => {
    ClienteController.post(req, res);
  }
);
router.put(
  "/cliente/update/:id",
  [verifyCookieAccess, clienteValidationRules()],
  (req, res) => {
    ClienteController.update(req, res);
  }
);
router.delete(
  "/cliente/delete/:id",
  [verifyCookieAccess, verifyRolAccessAdmin],
  (req, res) => {
    ClienteController.delete(req, res);
  }
);

//endpoint servicio

router.get("/servicio", verifyCookieAccess, (req, res) => {
  ServicioController.get(req, res);
});
router.get("/servicio/:id", verifyCookieAccess, (req, res) => {
  ServicioController.getById(req, res);
});
router.post(
  "/servicio/create",
  [verifyCookieAccess, verifyRolAccessAdmin, servicioValidationRules()],
  (req, res) => {
    ServicioController.post(req, res);
  }
);
router.put(
  "/servicio/update/:id",
  [verifyCookieAccess, verifyRolAccessAdmin, servicioValidationRules()],
  (req, res) => {
    ServicioController.update(req, res);
  }
);
router.delete(
  "/servicio/delete/:id",
  [verifyCookieAccess, verifyRolAccessAdmin],
  (req, res) => {
    ServicioController.delete(req, res);
  }
);

//endpoint terapeuta

router.get("/terapeuta", verifyCookieAccess, (req, res) => {
  TerapeutaController.get(req, res);
});
router.get("/terapeuta/:id", verifyCookieAccess, (req, res) => {
  TerapeutaController.getById(req, res);
});
router.post(
  "/terapeuta/create",
  [verifyCookieAccess, verifyRolAccessAdmin, terapeutaValidationRules()],
  (req, res) => {
    TerapeutaController.post(req, res);
  }
);
router.put(
  "/terapeuta/update/:id",
  [verifyCookieAccess, verifyRolAccessAdmin, terapeutaValidationRules()],
  (req, res) => {
    TerapeutaController.update(req, res);
  }
);
router.delete(
  "/terapeuta/delete/:id",
  [verifyCookieAccess, verifyRolAccessAdmin],
  (req, res) => {
    TerapeutaController.delete(req, res);
  }
);

//endpoint reserva

router.get("/reserva", verifyCookieAccess, (req, res) => {
  ReservaController.get(req, res);
});
router.get("/reserva/:id", verifyCookieAccess, (req, res) => {
  ReservaController.getById(req, res);
});
router.post(
  "/reserva/create",
  [verifyCookieAccess, reservaValidationRules()],
  (req, res) => {
    ReservaController.post(req, res);
  }
);
router.put(
  "/reserva/update/:id",
  [verifyCookieAccess, reservaValidationRules()],
  (req, res) => {
    ReservaController.update(req, res);
  }
);
router.delete("/reserva/delete/:id", verifyCookieAccess, (req, res) => {
  ReservaController.delete(req, res);
});

//pruebas
const movies = [
  {
    id: 1,
    name: "Muesrte del terror",
    fecha: "11/09/2023",
  },
  {
    id: 2,
    name: "One Pieces",
    fecha: "11/09/2023",
  },
  {
    id: 3,
    name: "Dragon ball",
    fecha: "11/09/2023",
  },
];
router.get("/movies", (req, res) => {
  res.status(200).json(movies);
});
router.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  const movie = movies.find((movi) => movi.id == id);
  if (!movie) {
    return res.status(404).json({ messague: "Pelicula no encontrada" });
  }
  res.status(200).json(movie);
});
router.get("/protected", verifyCookieAccess, (req, res) => {
  res.render("protected");
});

export default router;
