import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./user.js";

class Cliente extends Model {
  // aquí podrías definir métodos de instancia o de clase
}

Cliente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: "User",
        key: "id",
      },
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: false,
    },
    dni: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize: db,
    modelName: "Cliente",
    tableName: "clientes",
    timestamps: true,
  }
);
// Cada Cliente pertenece a un User, usando la FK `id_user`
Cliente.belongsTo(User, {
  foreignKey: {
    name: "id_user",
    unique: true,
  },
  as: "usuario", // alias para hacer más legible el include
});
/*
// (Opcional) Si quieres la inversa
User.hasMany(Cliente, {
  foreignKey: "id_user",
  as: "clientes",
});*/
// user.js (inverso)
User.hasOne(Cliente, {
  foreignKey: "id_user",
  as: "cliente",
});

export default Cliente;
