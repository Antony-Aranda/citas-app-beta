//const mysql = require("mysql2");
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const conn = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions:
      process.env.DB_SSL === "true"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false, // para certificados autofirmados :contentReference[oaicite:4]{index=4}
            },
          }
        : {},
    define: {
      timestamps: false,
    },
  }
);

export default conn;
