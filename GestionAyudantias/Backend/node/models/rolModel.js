//importa la conexion
import db from "../database/db.js";
//importa sequalize
import { DataTypes } from "sequelize";

const rolModel = db.define(
  "rol",
  {
    id_rol: { type: DataTypes.INTEGER, primaryKey: true },
    nombre_rol: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false,
  }
);
export default rolModel;
