//importa la conexion
import db from "../database/db.js";
//importa sequalize
import { DataTypes } from "sequelize";

const facultadModel = db.define(
  "facultad",
  {
    id_facultad: { type: DataTypes.INTEGER, primaryKey: true },
    nombre_facultad: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false,
  }
);
export default facultadModel;
