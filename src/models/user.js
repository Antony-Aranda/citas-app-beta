import { DataTypes } from "sequelize";
import db from "../config/database.js"; // Configure your database
//import Cliente from "./cliente.js";

const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    timestamps: true, // <- aquí
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    tableName: "users",
    modelName: "User", // Specify your custom table name here
  }
);
// user.js (inverso)

//belongsTo
// hasMany, hasOne o belongsToMany
export default User;
