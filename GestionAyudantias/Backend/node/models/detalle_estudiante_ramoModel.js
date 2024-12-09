//importa la conexion
import db from "../database/db.js";
//importa sequalize
import { DataTypes } from "sequelize";

const detalle_estudiante_ramoModel = db.define(
  "detalle_estudiante_ramo",
  {
    id_detalle_estudiante_ramo: { type: DataTypes.INTEGER, primaryKey: true },
    rut_estudiante: { type: DataTypes.INTEGER },
    id_ramo: { type: DataTypes.INTEGER },
    nota_ramo: { type: DataTypes.INTEGER },
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false,
  }
);
export default detalle_estudiante_ramoModel;
