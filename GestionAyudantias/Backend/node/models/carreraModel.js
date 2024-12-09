//importa la conexion
import db from "../database/db.js";
//importa sequalize
import { DataTypes } from "sequelize";

const carreraModel = db.define(
  "carrera",
  {
    id_carrera: { type: DataTypes.INTEGER, primaryKey: true },
    id_facultad: { type: DataTypes.INTEGER },
    nombre_carrera: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false,
  }
);
export default carreraModel;
