import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";

class Terapeuta extends Model {
  // aquí podrías definir métodos de instancia o de clase
}

Terapeuta.init(
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
    dni: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize: db,
    modelName: "Terapeuta",
    tableName: "terapeutas",
    timestamps: true,
  }
);

export default Terapeuta;
