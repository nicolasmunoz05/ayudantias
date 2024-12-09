//importa la conexion
import db from "../database/db.js";
//importa sequalize
import { DataTypes } from "sequelize";

const periodoModel = db.define(
  "periodo",
  {
    id_periodo: { type: DataTypes.INTEGER, primaryKey: true },
    año_periodo: { type: DataTypes.INTEGER },
    semestre_periodo: {type: DataTypes.INTEGER},
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false,
  }
);
export default periodoModel;
