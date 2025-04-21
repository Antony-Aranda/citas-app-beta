import { Model, DataTypes } from "sequelize";
import db from "../config/database.js";

import Servicio from "./servicio.js";
import Cliente from "./cliente.js";
import Terapeuta from "./terapeuta.js";

class Reserva extends Model {
  // aquí podrías definir métodos de instancia o de clase
}

Reserva.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_servicio: {
      type: DataTypes.INTEGER,
      references: {
        model: "Servicio",
        key: "id",
      },
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: "Cliente",
        key: "id",
      },
    },
    id_terapeuta: {
      type: DataTypes.INTEGER,
      references: {
        model: "Terapeuta",
        key: "id",
      },
    },
    sede: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha_agendada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    monto: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize: db,
    modelName: "Reserva",
    tableName: "reservas",
    timestamps: true,
  }
);

Reserva.belongsTo(Cliente, {
  foreignKey: "id_cliente",
  as: "cliente",
});
Reserva.belongsTo(Servicio, {
  foreignKey: "id_servicio",
  as: "servicio",
});
Reserva.belongsTo(Terapeuta, {
  foreignKey: "id_terapeuta",
  as: "terapeuta",
});

Cliente.hasMany(Reserva, {
  foreignKey: "id_cliente",
  as: "reservas",
});
Servicio.hasMany(Reserva, {
  foreignKey: "id_servicio",
  as: "reservas",
});
Terapeuta.hasMany(Reserva, {
  foreignKey: "id_terapeuta",
  as: "reservas",
});

export default Reserva;
