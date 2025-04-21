import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";

class Servicio extends Model {
  // aquí podrías definir métodos de instancia o de clase
}

Servicio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    precio: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
      unique: false,
    },
    duracion: {
      type: DataTypes.TIME,
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize: db,
    modelName: "Servicio",
    tableName: "servicios",
    timestamps: true,
  }
);

export default Servicio;
