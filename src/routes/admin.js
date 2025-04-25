import express from "express";
import { ClienteUsuarioController } from "../controllers/admin/ClienteUsuarioController.js";
import { verifyCookieAccess } from "../middleware/AuthCookieMiddleware.js";
import { verifyRolAccessAdmin } from "../middleware/VerifyRolAccessAdmin.js";
import { clienteUserValidationRules } from "../validation/admin/ClienteUserValidation.js";
const router = express.Router();

router.post(
  "/cliente-usuario/create",
  [verifyCookieAccess, verifyRolAccessAdmin, clienteUserValidationRules()],
  (req, res) => {
    ClienteUsuarioController.store(req, res);
  }
);

export default router;
