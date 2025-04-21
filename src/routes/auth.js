import { AuthController } from "../controllers/auth/AuthController.js";
import {
  authValidationRules,
  authLoginValidationRules,
} from "../validation/AuthValidation.js";
import express from "express";

import { verifyCookieAccess } from "../middleware/AuthCookieMiddleware.js";

const router = express.Router();

//endopoitn user

router.get("/", (req, res) => {
  const data = res.render("index");
});
router.post("/register", authValidationRules(), (req, res) => {
  AuthController.create(req, res);
});
router.get("/prueba", authValidationRules(), (req, res) => {
  AuthController.getCliente(req, res);
});
router.post("/login", authLoginValidationRules(), (req, res) => {
  AuthController.login(req, res);
});
router.post("/logout", verifyCookieAccess, (req, res) => {
  AuthController.logout(req, res);
});

export default router;
