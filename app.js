import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import router from "./src/routes/web.js";
import routerAuth from "./src/routes/auth.js";
import routerAdmin from "./src/routes/admin.js";

app.use(cookieParser());

//middleware
// estas dos líneas “sanean” import.meta.url a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Define la carpeta donde estarán tus vistas
app.set("views", path.join(__dirname, "./src/views/"));
//   (ajusta la ruta según desde dónde invocas __dirname)
// 2) Especifica el motor de plantillas que usarás
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors()); // Allow all origins (not recommended for production)
//EL CORS , es un mecanismo que solo funciona en el navegador, dentro de servidores no funciona
//restringe si el recurso puedes usar en un origen , el navegador pregunta , es verdad que este dominio que no es el tuyo , yo estoy en otro dominio , si este dominio que aloja este recuros , pues el navegador pueda soliccitar

//routes
app.use("/", [router, routerAdmin]);
app.use("/auth", routerAuth);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
